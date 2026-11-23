// Small per-user lists (for now: utility accounts, type=util). GET ?type= → list; POST {type, data}; POST {action:'remove', type, id}.
import { json, CORS, ready, sessionUser } from '../_lib/auth.js';
const TYPES = { util: 20 };
export const onRequestOptions = () => new Response(null, { headers: CORS });
export async function onRequestGet({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  const u = await sessionUser(env, request); if (!u) return json({ ok: false, error: 'unauthorized' }, 401);
  const type = new URL(request.url).searchParams.get('type'); if (!TYPES[type]) return json({ ok: false, error: 'type' }, 400);
  const r = await env.DB.prepare('SELECT id, data FROM items WHERE user_id = ?1 AND type = ?2 ORDER BY id').bind(u.id, type).all();
  return json({ ok: true, list: (r.results || []).map(x => ({ id: x.id, data: JSON.parse(x.data) })) });
}
export async function onRequestPost({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  const u = await sessionUser(env, request); if (!u) return json({ ok: false, error: 'unauthorized' }, 401);
  let b; try { b = await request.json(); } catch { return json({ ok: false }, 400); }
  if (!TYPES[b.type]) return json({ ok: false, error: 'type' }, 400);
  if (b.action === 'remove') { await env.DB.prepare('DELETE FROM items WHERE user_id = ?1 AND type = ?2 AND id = ?3').bind(u.id, b.type, +b.id).run(); return json({ ok: true }); }
  const d = b.data || {}, data = { p: String(d.p || 'other').slice(0, 12), n: String(d.n || '').replace(/\s+/g, '').slice(0, 24), t: String(d.t || '').trim().slice(0, 30) };
  if (data.n.length < 4) return json({ ok: false, error: 'number' }, 400);
  const n = await env.DB.prepare('SELECT COUNT(*) AS n FROM items WHERE user_id = ?1 AND type = ?2').bind(u.id, b.type).first();
  if (n && n.n >= TYPES[b.type]) return json({ ok: false, error: 'limit' }, 429);
  const r = await env.DB.prepare('INSERT INTO items (user_id, type, data, created) VALUES (?1, ?2, ?3, ?4) RETURNING id').bind(u.id, b.type, JSON.stringify(data), Math.floor(Date.now() / 1000)).first();
  return json({ ok: true, id: r.id });
}
