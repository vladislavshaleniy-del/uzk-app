// Panic button: sends the user's location to all trusted contacts through @MyUzCity_bot.
import { json, CORS, ready, sessionUser, tgSend, fmtPhone, displayName } from '../_lib/auth.js';
export const onRequestOptions = () => new Response(null, { headers: CORS });
export async function onRequestPost({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  const u = await sessionUser(env, request); if (!u) return json({ ok: false, error: 'unauthorized' }, 401);
  let b; try { b = await request.json(); } catch { return json({ ok: false }, 400); }
  const la = +b.la, lo = +b.lo; if (!(Math.abs(la) <= 90 && Math.abs(lo) <= 180)) return json({ ok: false, error: 'location' }, 400);
  const now = Math.floor(Date.now() / 1000);
  const recent = await env.DB.prepare('SELECT COUNT(*) AS n FROM sos_log WHERE owner = ?1 AND ts > ?2').bind(u.id, now - 60).first();
  if (recent && recent.n >= 3) return json({ ok: false, error: 'limit' }, 429);
  await env.DB.prepare('INSERT INTO sos_log (owner, ts) VALUES (?1, ?2)').bind(u.id, now).run();
  const list = ((await env.DB.prepare('SELECT tg_id FROM trusted WHERE owner = ?1').bind(u.id).all()).results) || [];
  const who = displayName(u), phone = fmtPhone(u.phone);
  const acc = Number.isFinite(+b.acc) ? ` (точность ~${Math.round(+b.acc)} м)` : '';
  let sent = 0;
  for (const c of list) {
    const r = await tgSend(env, 'sendMessage', { chat_id: c.tg_id, text: `🚨 ТРЕВОГА\n\n${who} (${phone}) нажал(а) тревожную кнопку в MyUzCity.\nГеолокация ниже${acc}. Свяжитесь с ним(ней) или позвоните 112.`, reply_markup: { inline_keyboard: [[{ text: `📞 Позвонить ${phone}`, url: `https://myuzcity.pages.dev/call.html#${String(u.phone).replace(/\D/g, '')}` }]] } });
    if (r.ok) { sent++; await tgSend(env, 'sendLocation', { chat_id: c.tg_id, latitude: la, longitude: lo }); }
  }
  if (u.tg_id) await tgSend(env, 'sendMessage', { chat_id: u.tg_id, text: sent ? `✅ Тревога отправлена близким: ${sent}.` : '⚠️ У вас пока нет близких для тревожной кнопки. Добавьте их в приложении MyUzCity → Тревожная кнопка.' });
  return json({ ok: true, sent, total: list.length });
}
