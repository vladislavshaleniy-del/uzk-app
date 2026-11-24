// POST /api/hit — просмотр страницы для /stats (без cookies и без хранения IP).
// Вызывают сайт (каждая страница и переход между разделами) и приложение (открытие).
// Страна и город — из данных Cloudflare (request.cf). Посетитель за день — необратимый хеш.
import { day } from '../_lib/track.js';
const BOT = /bot|crawl|spider|slurp|preview|headless|lighthouse|pagespeed|monitor|curl|wget|python|axios/i;

export async function onRequestPost({ request, env }) {
  const ok = new Response(null, { status: 204, headers: { 'cache-control': 'no-store' } });
  try {
    const db = env.DB; if (!db) return ok;
    const ua = request.headers.get('user-agent') || ''; if (!ua || BOT.test(ua)) return ok;
    const host = new URL(request.url).hostname;
    if (!/(^|\.)myuzcity\.uz$/i.test(host)) return ok;
    let b = {}; try { b = JSON.parse(await request.text() || '{}'); } catch (e) {}
    const h = /^app\./i.test(host) ? 'app' : 'site';
    const path = String(b.p || '/').replace(/[?#].*$/, '').slice(0, 120);
    const cf = request.cf || {}, d = day(Date.now()), ip = request.headers.get('cf-connecting-ip') || '';
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip + '|' + ua + '|' + d + '|myuzcity'));
    const v = [...new Uint8Array(buf)].slice(0, 8).map(x => x.toString(16).padStart(2, '0')).join('');
    const ins = () => db.prepare('INSERT INTO st_hits(d,host,country,city,path,v) VALUES(?,?,?,?,?,?)')
      .bind(d, h, String(cf.country || '').slice(0, 2), String(cf.city || '').slice(0, 60), path, v).run();
    await ins().catch(async () => {
      await db.batch([db.prepare('CREATE TABLE IF NOT EXISTS st_hits(d TEXT,host TEXT,country TEXT,city TEXT,path TEXT,v TEXT)'),
        db.prepare('CREATE INDEX IF NOT EXISTS st_hits_d ON st_hits(d)')]);
      await ins();
    });
  } catch (e) {}
  return ok;
}
