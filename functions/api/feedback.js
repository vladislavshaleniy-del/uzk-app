// "Write to us" from Help: stored and forwarded to the service admins in Telegram.
import { json, CORS, ready, ensureDb, readSession, notifyAdmins, fmtPhone } from '../_lib/auth.js';
export const onRequestOptions = () => new Response(null, { headers: CORS });
export async function onRequestPost({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  await ensureDb(env);
  let b; try { b = await request.json(); } catch { return json({ ok: false }, 400); }
  const text = String(b.text || '').trim().slice(0, 2000); if (text.length < 3) return json({ ok: false, error: 'empty' }, 400);
  const s = await readSession(env, request), now = Math.floor(Date.now() / 1000);
  const ip = request.headers.get('cf-connecting-ip') || '';
  const recent = await env.DB.prepare('SELECT COUNT(*) AS n FROM feedback WHERE created > ?1').bind(now - 60).first();
  if (recent && recent.n > 20) return json({ ok: false, error: 'limit' }, 429);
  const u = s ? await env.DB.prepare('SELECT * FROM users WHERE id = ?1').bind(s.u).first() : null;
  const r = await env.DB.prepare('INSERT INTO feedback (user_id, text, created) VALUES (?1, ?2, ?3) RETURNING id').bind(u ? u.id : null, text, now).first();
  const who = u ? `${[u.first_name, u.last_name].filter(Boolean).join(' ')} ${fmtPhone(u.phone)}${u.username ? ' @' + u.username : ''}` : 'гость' + (ip ? ' (' + ip + ')' : '');
  const sent = await notifyAdmins(env, 'sendMessage', { text: `${text.startsWith('[Партнёрство') ? '🤝 Заявка с сайта' : '✉️ Обращение в поддержку'} №${r.id}\n${who}\n\n${text}` });
  return json({ ok: true, id: r.id, delivered: sent > 0 });
}
