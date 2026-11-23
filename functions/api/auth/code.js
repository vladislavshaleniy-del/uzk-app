// The app sends the 6-digit code from @MyUzCity_bot; returns a session. Limited to 8 wrong tries per IP per 10 minutes.
import { json, CORS, ensureDb, signSession, ready, publicUser } from '../../_lib/auth.js';
export const onRequestOptions = () => new Response(null, { headers: CORS });
export async function onRequestPost({ request, env }) {
  if (!ready(env)) return json({ ok: false, error: 'off' }, 503);
  let b; try { b = await request.json(); } catch { return json({ ok: false, error: 'bad' }, 400); }
  const code = String(b.code || '').replace(/\D/g, '');
  if (code.length !== 6) return json({ ok: false, error: 'bad' }, 400);
  await ensureDb(env);
  const now = Math.floor(Date.now() / 1000), ip = request.headers.get('cf-connecting-ip') || 'x';
  await env.DB.prepare('DELETE FROM fails WHERE ts < ?1').bind(now - 600).run();
  const f = await env.DB.prepare('SELECT COUNT(*) AS n FROM fails WHERE ip = ?1').bind(ip).first();
  if (f && f.n >= 8) return json({ ok: false, error: 'limit' }, 429);
  const row = await env.DB.prepare('SELECT * FROM codes WHERE code = ?1 AND created > ?2').bind(code, now - 600).first();
  if (!row) { await env.DB.prepare('INSERT INTO fails (ip, ts) VALUES (?1, ?2)').bind(ip, now).run(); return json({ ok: false, error: 'wrong' }, 400); }
  await env.DB.prepare('DELETE FROM codes WHERE code = ?1').bind(code).run();
  if (row.nonce) await env.DB.prepare('DELETE FROM logins WHERE nonce = ?1').bind(row.nonce).run();
  const user = await env.DB.prepare('SELECT * FROM users WHERE id = ?1').bind(row.user_id).first();
  if (!user) return json({ ok: false, error: 'wrong' }, 400);
  return json({ ok: true, token: await signSession(env, user.id), user: publicUser(user) });
}
