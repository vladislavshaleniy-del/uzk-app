// The app polls here while the user confirms the number in Telegram; returns a session once confirmed.
import { json, CORS, ensureDb, signSession, ready, publicUser, NONCE } from '../../_lib/auth.js';
export const onRequestOptions = () => new Response(null, { headers: CORS });
export async function onRequestGet({ request, env }) {
  if (!ready(env)) return json({ ok: false, status: 'off' }, 503);
  const n = new URL(request.url).searchParams.get('n') || '';
  if (!NONCE.test(n)) return json({ ok: false, status: 'bad' }, 400);
  await ensureDb(env);
  const row = await env.DB.prepare('SELECT * FROM logins WHERE nonce = ?1').bind(n).first();
  if (!row) return json({ ok: true, status: 'new' });
  if (row.status !== 'ok') return json({ ok: true, status: row.status });
  const user = await env.DB.prepare('SELECT * FROM users WHERE id = ?1').bind(row.user_id).first();
  await env.DB.prepare('DELETE FROM logins WHERE nonce = ?1').bind(n).run();
  return json({ ok: true, status: 'ok', token: await signSession(env, user.id), user: publicUser(user) });
}
