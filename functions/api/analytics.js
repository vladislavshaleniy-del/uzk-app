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
    const now = Date.now(), today = day(now), m0 = today.slice(0, 8) + '01', d30 = day(now - 29 * 864e5);
    const all = async (sql, ...a) => ((await db.prepare(sql).bind(...a).all()).results) || [];
    const first = async (sql, ...a) => (await db.prepare(sql).bind(...a).first()) || {};
    const out = { ready: true, updated: new Date(now).toISOString(), today, periods: {} };
    for (const [k, from] of [['day', today], ['month', m0], ['all', '0000-00-00']]) {
      const [tot, hosts, geo, pages] = await Promise.all([
        first('SELECT COUNT(*) views, COUNT(DISTINCT d||v) visitors FROM st_hits WHERE d>=?', from),
        all('SELECT host, COUNT(*) views, COUNT(DISTINCT d||v) visitors FROM st_hits WHERE d>=? GROUP BY host', from),
        all('SELECT country c, city, COUNT(*) views, COUNT(DISTINCT d||v) visitors FROM st_hits WHERE d>=? GROUP BY country, city', from),
        all('SELECT host, path, COUNT(*) views FROM st_hits WHERE d>=? GROUP BY host, path ORDER BY views DESC LIMIT 15', from),
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
      out.periods[k] = { from, views: tot.views || 0, visitors: tot.visitors || 0, hosts, countries, pages };
    }
    out.days = await all('SELECT d, COUNT(*) views, COUNT(DISTINCT v) visitors FROM st_hits WHERE d>=? GROUP BY d ORDER BY d', d30);
    out.since = (await first('SELECT MIN(d) d FROM st_hits')).d || null;
    await db.prepare("INSERT INTO st_kv(k,v,t) VALUES('an',?,?) ON CONFLICT(k) DO UPDATE SET v=excluded.v,t=excluded.t").bind(JSON.stringify(out), now).run();
    return json(out);
  } catch (e) {
    return json({ ready: false, error: String(e && e.message || e).slice(0, 200) }, 500);
  }
}
