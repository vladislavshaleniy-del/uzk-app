// /api/seo — раздел «Поиск и индексация» на /stats (то же кодовое слово, заголовок x-admin-key).
//   GET                       — страницы сайта, визиты роботов, источники переходов, состояние Google и Яндекса
//   POST {action:'indexnow'}  — отправить все страницы в Яндекс и Bing (IndexNow)
// Визиты роботов и источники пишет functions/_lib/track.js. Сводка кэшируется на 10 минут (?fresh=1 — сразу).
import { day, json, denied } from '../_lib/track.js';
import { pushAll, siteUrls } from '../_lib/indexnow.js';

// Снимок из кабинетов (подключены 24.11.2026). Обновляется вручную.
const SNAP = {
  google: { verified: '2026-11-24', sitemap: 'https://myuzcity.uz/sitemap.xml', submitted: '2026-11-24', requested: ['/'],
    console: 'https://search.google.com/search-console?resource_id=https%3A%2F%2Fmyuzcity.uz%2F',
    note: 'Сайт подтверждён, карта сайта отправлена, главная страница поставлена в очередь на индексацию. Отчёты по новому сайту Google собирает от нескольких дней до двух недель.' },
  yandex: { verified: '2026-11-24', indexnow: { t: '2026-11-24T09:35:00Z', n: 40, ok: true },
    console: 'https://webmaster.yandex.ru/site/https:myuzcity.uz:443/dashboard/',
    note: 'Сайт подтверждён, все 39 страниц и приложение переданы через IndexNow и приняты. Карта сайта указана в robots.txt.' },
};
const LANGS = { ru: 'Русский', uz: "O'zbekcha", en: 'English' };
const langOf = p => { const m = String(p).match(/^\/(uz|en)(\/|$)/); return m ? m[1] : 'ru'; };

async function ensure(db) {
  await db.batch([
    db.prepare('CREATE TABLE IF NOT EXISTS st_bots(d TEXT,host TEXT,bot TEXT,path TEXT,st INTEGER,t INTEGER)'),
    db.prepare('CREATE INDEX IF NOT EXISTS st_bots_d ON st_bots(d)'),
    db.prepare('CREATE TABLE IF NOT EXISTS st_visits(d TEXT,host TEXT,src TEXT,path TEXT,t INTEGER)'),
    db.prepare('CREATE INDEX IF NOT EXISTS st_visits_d ON st_visits(d)'),
    db.prepare('CREATE TABLE IF NOT EXISTS st_kv(k TEXT PRIMARY KEY,v TEXT,t INTEGER)'),
  ]);
}
const kvGet = async (db, k) => { const r = await db.prepare('SELECT v,t FROM st_kv WHERE k=?').bind(k).first(); return r ? { v: JSON.parse(r.v), t: r.t } : null; };
const kvSet = (db, k, v) => db.prepare('INSERT INTO st_kv(k,v,t) VALUES(?,?,?) ON CONFLICT(k) DO UPDATE SET v=excluded.v,t=excluded.t').bind(k, JSON.stringify(v), Date.now()).run();

export async function onRequestGet({ request, env }) {
  const no = denied(request, env); if (no) return no;
  const db = env.DB; if (!db) return json({ ready: false });
  try {
    await ensure(db);
    const fresh = new URL(request.url).searchParams.get('fresh') === '1';
    if (!fresh) { const c = await kvGet(db, 'seo'); if (c && Date.now() - c.t < 6e5) return json(c.v); }
    const now = Date.now(), d30 = day(now - 29 * 864e5);
    const all = async (sql, ...a) => ((await db.prepare(sql).bind(...a).all()).results) || [];
    const pages = siteUrls().map(u => new URL(u).pathname);
    const [perDay, crawled, feed, errors, traffic, inx] = await Promise.all([
      all('SELECT d, bot, COUNT(*) n FROM st_bots WHERE d>=? GROUP BY d, bot ORDER BY d', d30),
      all("SELECT bot, host, path, MAX(t) t, COUNT(*) n FROM st_bots WHERE d>=? AND st<400 AND bot IN ('google','yandex','bing') GROUP BY bot, host, path", d30),
      all('SELECT bot, host, path, st, t FROM st_bots ORDER BY t DESC LIMIT 40'),
      all('SELECT bot, host, path, st, MAX(t) t, COUNT(*) n FROM st_bots WHERE d>=? AND st>=400 GROUP BY bot, host, path, st ORDER BY t DESC LIMIT 20', d30),
      all('SELECT src, host, COUNT(*) n FROM st_visits WHERE d>=? GROUP BY src, host ORDER BY n DESC', d30),
      kvGet(db, 'inx'),
    ]);
    // по языкам: сколько страниц сайта и сколько из них уже обошли Google и Яндекс
    const seen = { google: new Set(), yandex: new Set(), bing: new Set() };
    const inSite = new Set(pages);
    for (const r of crawled) if (r.host === 'site' && inSite.has(r.path)) seen[r.bot].add(r.path);
    const langs = Object.keys(LANGS).map(l => {
      const ps = pages.filter(p => langOf(p) === l);
      return { l, name: LANGS[l], pages: ps.length, google: ps.filter(p => seen.google.has(p)).length, yandex: ps.filter(p => seen.yandex.has(p)).length };
    });
    const appSeen = b => crawled.some(r => r.host === 'app' && r.bot === b);
    const out = {
      ready: true, updated: new Date(now).toISOString(), total: pages.length,
      crawled: { google: seen.google.size, yandex: seen.yandex.size, bing: seen.bing.size, app: { google: appSeen('google'), yandex: appSeen('yandex') } },
      langs, perDay, feed, errors, traffic, snap: SNAP, indexnow: inx ? inx.v : SNAP.yandex.indexnow,
    };
    await kvSet(db, 'seo', out);
    return json(out);
  } catch (e) {
    return json({ ready: false, error: String(e && e.message || e).slice(0, 200) }, 500);
  }
}

export async function onRequestPost({ request, env }) {
  const no = denied(request, env); if (no) return no;
  let b = {}; try { b = await request.json(); } catch (e) {}
  if (b.action !== 'indexnow') return json({ error: 'action' }, 400);
  const db = env.DB;
  if (db) {
    await ensure(db);
    const last = await kvGet(db, 'inx');
    if (last && Date.now() - last.t < 3600e3) return json({ ok: false, error: 'Уже отправляли меньше часа назад — поисковики не любят частые повторы.', last: last.v });
  }
  const r = await pushAll();
  if (db && r.ok) { await kvSet(db, 'inx', { t: r.t, n: r.n, ok: true }); await db.prepare("DELETE FROM st_kv WHERE k='seo'").run(); }
  return json(r);
}
