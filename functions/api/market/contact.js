// Seller's phone — only for signed-in users and only if the seller chose to show it: GET ?id=N
import { json, CORS, ready, sessionUser } from '../../_lib/auth.js';
export const onRequestOptions = () => new Response(null, { headers: CORS });
export async function onRequestGet({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  const u = await sessionUser(env, request); if (!u) return json({ ok: false, error: 'unauthorized' }, 401);
  const r = await env.DB.prepare("SELECT m.phone AS show, u.phone, u.username FROM market m JOIN users u ON u.id = m.user_id WHERE m.id = ?1 AND m.status = 'active'").bind(+new URL(request.url).searchParams.get('id')).first();
  if (!r) return json({ ok: false, error: 'not found' }, 404);
  return json({ ok: true, phone: r.show ? r.phone : '', tg: r.username || '' });
}
