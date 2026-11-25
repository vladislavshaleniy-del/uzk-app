// GET /api/analytics — посещаемость для страницы /stats (только по кодовому слову, заголовок x-admin-key).
// Просмотры пишет /api/hit. Дни — по Ташкенту. Сводка кэшируется на 10 минут, чтобы не тратить лимит чтений D1;
// ?fresh=1 (кнопка «Обновить») пересчитывает сразу.
import { day, json, denied } from '../_lib/track.js';

export async function onRequestGet({ request, env }) {
  const no = denied(request, env); if (no) return no;
  const db = env.DB; if (!db) return json({ ready: false });
  const fresh = new URL(request.url).searchParams.get('fresh') === '1';
  try {
    await db.batch([
      db.prepare('CREATE TABLE IF NOT EXISTS st_hits(d TEXT,host TEXT,country TEXT,city TEXT,path TEXT,v TEXT)'),
      db.prepare('CREATE INDEX IF NOT EXISTS st_hits_d ON st_hits(d)'),
      db.prepare('CREATE TABLE IF NOT EXISTS st_kv(k TEXT PRIMARY KEY,v TEXT,t INTEGER)'),
    ]);
    if (!fresh) {
      const c = await db.prepare("SELECT v,t FROM st_kv WHERE k='an'").first();
      if (c && Date.now() - c.t < 6e5) return json(JSON.parse(c.v));
    }
    const cols = new Set(((await db.prepare('PRAGMA table_info(st_hits)').all()).results || []).map(r => r.name));
    for (const c of ['src TEXT', 'br TEXT', 'os TEXT', 'dev TEXT', 'lang TEXT', 't INTEGER', 'q TEXT', 'model TEXT', 'scr TEXT', 'region TEXT', 'isp TEXT']) if (!cols.has(c.split(' ')[0])) await db.prepare('ALTER TABLE st_hits ADD COLUMN ' + c).run().catch(() => {});
    const now = Date.now(), today = day(now), m0 = today.slice(0, 8) + '01', d30 = day(now - 29 * 864e5);
    const all = async (sql, ...a) => ((await db.prepare(sql).bind(...a).all()).results) || [];
    const first = async (sql, ...a) => (await db.prepare(sql).bind(...a).first()) || {};
    const out = { ready: true, updated: new Date(now).toISOString(), today, periods: {} };
    for (const [k, from] of [['day', today], ['month', m0], ['all', '0000-00-00']]) {
      const [tot, hosts, geo, pages, srcs, brs, oss, devs, qs, isps, models] = await Promise.all([
        first('SELECT COUNT(*) views, COUNT(DISTINCT d||v) visitors FROM st_hits WHERE d>=?', from),
        all('SELECT host, COUNT(*) views, COUNT(DISTINCT d||v) visitors FROM st_hits WHERE d>=? GROUP BY host', from),
        all('SELECT country c, city, COUNT(*) views, COUNT(DISTINCT d||v) visitors FROM st_hits WHERE d>=? GROUP BY country, city', from),
        all('SELECT host, path, COUNT(*) views FROM st_hits WHERE d>=? GROUP BY host, path ORDER BY views DESC LIMIT 15', from),
        all("SELECT src k, COUNT(*) n FROM st_hits WHERE d>=? AND src IS NOT NULL AND src<>'' GROUP BY src ORDER BY n DESC LIMIT 15", from),
        all('SELECT br k, COUNT(DISTINCT d||v) n FROM st_hits WHERE d>=? AND br IS NOT NULL GROUP BY br ORDER BY n DESC', from),
        all('SELECT os k, COUNT(DISTINCT d||v) n FROM st_hits WHERE d>=? AND os IS NOT NULL GROUP BY os ORDER BY n DESC', from),
        all('SELECT dev k, COUNT(DISTINCT d||v) n FROM st_hits WHERE d>=? AND dev IS NOT NULL GROUP BY dev ORDER BY n DESC', from),
        all("SELECT q k, MAX(src) src, COUNT(*) n FROM st_hits WHERE d>=? AND q IS NOT NULL AND q<>'' GROUP BY q ORDER BY n DESC LIMIT 20", from),
        all("SELECT isp k, COUNT(DISTINCT d||v) n FROM st_hits WHERE d>=? AND isp IS NOT NULL AND isp<>'' GROUP BY isp ORDER BY n DESC LIMIT 10", from),
        all("SELECT model k, COUNT(DISTINCT d||v) n FROM st_hits WHERE d>=? AND model IS NOT NULL AND model<>'' GROUP BY model ORDER BY n DESC LIMIT 10", from),
      ]);
      const map = new Map();
      for (const r of geo) {
        const c = r.c || '';
        if (!map.has(c)) map.set(c, { c, views: 0, visitors: 0, cities: [] });
        const e = map.get(c); e.views += r.views; e.visitors += r.visitors;
        e.cities.push({ city: r.city || '', views: r.views, visitors: r.visitors });
      }
      const countries = [...map.values()].sort((a, b) => b.views - a.views);
      for (const e of countries) e.cities.sort((a, b) => b.views - a.views);
      out.periods[k] = { from, views: tot.views || 0, visitors: tot.visitors || 0, hosts, countries, pages, srcs, brs, oss, devs, qs, isps, models };
    }
    out.days = await all('SELECT d, COUNT(*) views, COUNT(DISTINCT v) visitors FROM st_hits WHERE d>=? GROUP BY d ORDER BY d', d30);
    out.since = (await first('SELECT MIN(d) d FROM st_hits')).d || null;
    // последние посещения: каждое открытие сайта или приложения (переходы внутри сайта — одной строкой с числом страниц)
    out.recent = await all(`SELECT host, v, d, MIN(t) t, MAX(t) t2, COUNT(*) n, MAX(country) country, MAX(city) city, MAX(src) src, MAX(br) br, MAX(os) os, MAX(dev) dev, MAX(lang) lang, MAX(q) q, MAX(model) model, MAX(scr) scr, MAX(region) region, MAX(isp) isp,
      GROUP_CONCAT(path, ' ') paths FROM st_hits WHERE t IS NOT NULL GROUP BY host, v, d ORDER BY MAX(t) DESC LIMIT 60`);
    await db.prepare("INSERT INTO st_kv(k,v,t) VALUES('an',?,?) ON CONFLICT(k) DO UPDATE SET v=excluded.v,t=excluded.t").bind(JSON.stringify(out), now).run();
    return json(out);
  } catch (e) {
    return json({ ready: false, error: String(e && e.message || e).slice(0, 200) }, 500);
  }
}
