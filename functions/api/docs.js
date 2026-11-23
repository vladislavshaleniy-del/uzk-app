// Document expiry reminders: GET → list; POST {kind, title, expires: 'YYYY-MM-DD'} → save; POST {action:'remove', kind, title}.
import { json, CORS, ready, sessionUser } from '../_lib/auth.js';
const KINDS = ['passport', 'idcard', 'intl', 'license', 'inspection', 'insurance', 'tinting', 'gas', 'poa', 'appt', 'other'];
export const onRequestOptions = () => new Response(null, { headers: CORS });
export async function onRequestGet({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  const u = await sessionUser(env, request); if (!u) return json({ ok: false, error: 'unauthorized' }, 401);
  const r = await env.DB.prepare('SELECT kind, title, expires FROM docs WHERE user_id = ?1 ORDER BY expires').bind(u.id).all();
  return json({ ok: true, list: r.results || [] });
}
export async function onRequestPost({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  const u = await sessionUser(env, request); if (!u) return json({ ok: false, error: 'unauthorized' }, 401);
  let b; try { b = await request.json(); } catch { return json({ ok: false }, 400); }
  const kind = KINDS.includes(b.kind) ? b.kind : 'other', title = String(b.title || '').trim().slice(0, 60);
  if (b.action === 'remove') { await env.DB.prepare('DELETE FROM docs WHERE user_id = ?1 AND kind = ?2 AND title = ?3').bind(u.id, kind, title).run(); return json({ ok: true }); }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(b.expires || '')) return json({ ok: false, error: 'date' }, 400);
  const n = await env.DB.prepare('SELECT COUNT(*) AS n FROM docs WHERE user_id = ?1').bind(u.id).first();
  if (n && n.n >= 30) return json({ ok: false, error: 'limit' }, 429);
  await env.DB.prepare('INSERT INTO docs (user_id, kind, title, expires, notified) VALUES (?1, ?2, ?3, ?4, 0) ON CONFLICT(user_id, kind, title) DO UPDATE SET expires = excluded.expires, notified = 0').bind(u.id, kind, title, b.expires).run();
  return json({ ok: true });
}
