// The user's own cars (for parking and fines): GET → list; POST {plate, model, color}; POST {action:'remove', plate}.
import { json, CORS, ready, sessionUser } from '../_lib/auth.js';
export const onRequestOptions = () => new Response(null, { headers: CORS });
const norm = p => String(p || '').toUpperCase().replace(/[^0-9A-Z]/g, '').slice(0, 10);
export async function onRequestGet({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  const u = await sessionUser(env, request); if (!u) return json({ ok: false, error: 'unauthorized' }, 401);
  const r = await env.DB.prepare('SELECT plate, model, color FROM cars WHERE user_id = ?1 ORDER BY created').bind(u.id).all();
  return json({ ok: true, list: r.results || [] });
}
export async function onRequestPost({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  const u = await sessionUser(env, request); if (!u) return json({ ok: false, error: 'unauthorized' }, 401);
  let b; try { b = await request.json(); } catch { return json({ ok: false }, 400); }
  const plate = norm(b.plate);
  if (b.action === 'remove') { await env.DB.prepare('DELETE FROM cars WHERE user_id = ?1 AND plate = ?2').bind(u.id, plate).run(); return json({ ok: true }); }
  if (plate.length < 6) return json({ ok: false, error: 'plate' }, 400);
  const n = await env.DB.prepare('SELECT COUNT(*) AS n FROM cars WHERE user_id = ?1').bind(u.id).first();
  if (n && n.n >= 10) return json({ ok: false, error: 'limit' }, 429);
  await env.DB.prepare('INSERT INTO cars (user_id, plate, model, color, created) VALUES (?1, ?2, ?3, ?4, ?5) ON CONFLICT(user_id, plate) DO UPDATE SET model = excluded.model, color = excluded.color')
    .bind(u.id, plate, String(b.model || '').trim().slice(0, 40), String(b.color || '').trim().slice(0, 20), Math.floor(Date.now() / 1000)).run();
  return json({ ok: true });
}
