// Учёт для страницы /stats: визиты поисковых роботов и источники переходов (откуда пришёл посетитель).
// Пишется в фоне в ту же базу D1 (DB), таблицы st_*; ответ посетителю не задерживается.
// Просмотры со страной и городом пишет /api/hit (его вызывают сайт и приложение).
export const BOTS = [
  ['google', /Googlebot|Google-InspectionTool|GoogleOther|Storebot-Google|AdsBot-Google|Mediapartners-Google/i],
  ['yandex', /YandexBot|YandexMobileBot|YandexRenderResourcesBot|YandexAccessibilityBot|YandexImages|YandexWebmaster|YandexAdditional/i],
  ['bing', /bingbot|BingPreview|msnbot|adidxbot/i],
  ['baidu', /Baiduspider/i], ['duckduckgo', /DuckDuckBot/i], ['apple', /Applebot/i], ['petal', /PetalBot/i],
  ['seznam', /SeznamBot/i], ['naver', /Yeti\//i], ['yahoo', /Slurp/i], ['mailru', /Mail\.RU_Bot/i],
];
export const day = ms => new Date(ms + 5 * 3600e3).toISOString().slice(0, 10); // дни по Ташкенту (UTC+5)
const hostKey = h => (/^app\./i.test(h) ? 'app' : 'site');

const SRC = [
  [/(^|\.)instagram\.com$/, 'Instagram'],
  [/(^|\.)(t\.me|telegram\.org|telegram\.me)$/, 'Telegram'],
  [/(^|\.)(facebook\.com|fb\.com|fb\.me)$/, 'Facebook'],
  [/(^|\.)(youtube\.com|youtu\.be)$/, 'YouTube'],
  [/(^|\.)(linkedin\.com|lnkd\.in)$/, 'LinkedIn'],
  [/(^|\.)tiktok\.com$/, 'TikTok'],
  [/(^|\.)(wa\.me|whatsapp\.com)$/, 'WhatsApp'],
  [/(^|\.)(t\.co|twitter\.com|x\.com)$/, 'X (Twitter)'],
  [/(^|\.)google\./, 'Google'],
  [/(^|\.)(yandex\.|ya\.ru$)/, 'Яндекс'],
  [/(^|\.)bing\.com$/, 'Bing'],
  [/(^|\.)duckduckgo\.com$/, 'DuckDuckGo'],
  [/(^|\.)(mail\.ru|go\.mail\.ru)$/, 'Mail.ru'],
];
function chan(ref) {
  if (!ref) return 'Прямой заход';
  let h; try { h = new URL(ref).hostname.replace(/^www\./, '').toLowerCase(); } catch (e) { return 'Другие сайты'; }
  if (h === 'myuzcity.uz' || h.endsWith('.myuzcity.uz') || h.endsWith('.pages.dev')) return null; // переход внутри сайта
  for (const [re, name] of SRC) if (re.test(h)) return name;
  return h;
}

const run = (ctx, sql, args, create) => {
  const db = ctx.env.DB; if (!db) return;
  const add = () => db.prepare(sql).bind(...args).run();
  ctx.waitUntil(add().catch(async () => { await db.prepare(create).run(); await add(); }).catch(() => {}));
};

// вызывается для страниц сайта, приложения, robots.txt и sitemap.xml
export function track(ctx, res) {
  try {
    const req = ctx.request;
    if (req.method !== 'GET' && req.method !== 'HEAD') return;
    const u = new URL(req.url), p = u.pathname, ua = req.headers.get('user-agent') || '';
    if (!ua || !/(^|\.)myuzcity\.uz$/i.test(u.hostname)) return;
    const h = hostKey(u.hostname), now = Date.now(), ct = res.headers.get('content-type') || '';
    const b = BOTS.find(x => x[1].test(ua));
    if (b) {
      if (res.status >= 400 && !/^[a-z0-9\/-]+$/.test(p)) return; // сканеры под видом роботов (/.env, /wp-login.php…)
      if (!/text\/html/i.test(ct) && p !== '/robots.txt' && p !== '/sitemap.xml') return;
      run(ctx, 'INSERT INTO st_bots(d,host,bot,path,st,t) VALUES(?,?,?,?,?,?)', [day(now), h, b[0], p.slice(0, 200), res.status, now],
        'CREATE TABLE IF NOT EXISTS st_bots(d TEXT,host TEXT,bot TEXT,path TEXT,st INTEGER,t INTEGER)');
      return;
    }
    if (!/text\/html/i.test(ct) || res.status >= 400 || req.method !== 'GET') return;
    if (/bot|crawl|spider|slurp|preview|headless|lighthouse/i.test(ua)) return;
    const src = chan(req.headers.get('referer') || '');
    if (src == null) return;
    run(ctx, 'INSERT INTO st_visits(d,host,src,path,t) VALUES(?,?,?,?,?)', [day(now), h, src.slice(0, 60), p.slice(0, 200), now],
      'CREATE TABLE IF NOT EXISTS st_visits(d TEXT,host TEXT,src TEXT,path TEXT,t INTEGER)');
  } catch (e) {}
}

// доступ к /api/analytics и /api/seo: заголовок x-admin-key = кодовое слово STATS_KEY (секрет в Cloudflare)
const same = (a, b) => { a = String(a); b = String(b); if (a.length !== b.length) return false; let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i); return d === 0; };
const norm = s => String(s).normalize('NFC').trim().toLowerCase();
export const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex' } });
export function denied(request, env) {
  if (!env.STATS_KEY) return json({ error: 'no-key' }, 403);
  let got = request.headers.get('x-admin-key') || '';
  try { got = decodeURIComponent(got); } catch (e) {}
  return same(norm(got), norm(env.STATS_KEY)) ? null : json({ error: 'forbidden' }, 401);
}
