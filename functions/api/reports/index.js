// Residents' reports about city problems (potholes, garbage, broken lights…) with a photo and a point on the map.
import { json, CORS, ready, ensureDb, readSession, sessionUser, tgSend, notifyAdmins, REPORT_KINDS } from '../../_lib/auth.js';
const KINDS = ['road', 'light', 'clean', 'water', 'park', 'transport', 'appeal', 'other'];
export const onRequestOptions = () => new Response(null, { headers: CORS });
export async function onRequestGet({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  await ensureDb(env);
  const u = new URL(request.url); const kind = u.searchParams.get('kind');
  const s = await readSession(env, request);
  const q = KINDS.includes(kind)
    ? env.DB.prepare('SELECT id, user_id, kind, text, la, lo, status, ups, created, photo IS NOT NULL AS ph FROM reports WHERE kind = ?1 ORDER BY id DESC LIMIT 300').bind(kind)
    : env.DB.prepare('SELECT id, user_id, kind, text, la, lo, status, ups, created, photo IS NOT NULL AS ph FROM reports ORDER BY id DESC LIMIT 300');
  const rows = ((await q.all()).results) || [];
  const mine = s ? new Set((((await env.DB.prepare('SELECT report_id FROM report_ups WHERE user_id = ?1').bind(s.u).all()).results) || []).map(r => r.report_id)) : new Set();
  return json({ ok: true, list: rows.map(r => ({ id: r.id, kind: r.kind, text: r.text, la: r.la, lo: r.lo, status: r.status, ups: r.ups, created: r.created, ph: !!r.ph, own: s ? r.user_id === s.u : false, up: mine.has(r.id) })) });
}
export async function onRequestPost({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  const u = await sessionUser(env, request); if (!u) return json({ ok: false, error: 'unauthorized' }, 401);
  let b; try { b = await request.json(); } catch { return json({ ok: false }, 400); }
  const now = Math.floor(Date.now() / 1000);
  if (b.action === 'up') {
    const r = await env.DB.prepare('INSERT INTO report_ups (report_id, user_id) VALUES (?1, ?2) ON CONFLICT DO NOTHING').bind(+b.id, u.id).run();
    if (r.meta && r.meta.changes) await env.DB.prepare('UPDATE reports SET ups = ups + 1 WHERE id = ?1').bind(+b.id).run();
    return json({ ok: true });
  }
  const kind = KINDS.includes(b.kind) ? b.kind : 'other';
  const text = String(b.text || '').trim().slice(0, 1000);
  const la = +b.la, lo = +b.lo;
  if (!text && !b.photo) return json({ ok: false, error: 'empty' }, 400);
  if (!(Math.abs(la) <= 90 && Math.abs(lo) <= 180)) return json({ ok: false, error: 'location' }, 400);
  const today = await env.DB.prepare('SELECT COUNT(*) AS n FROM reports WHERE user_id = ?1 AND created > ?2').bind(u.id, now - 86400).first();
  if (today && today.n >= 10) return json({ ok: false, error: 'limit' }, 429);
  let photo = null;
  const m = typeof b.photo === 'string' && b.photo.match(/^data:image\/jpeg;base64,([A-Za-z0-9+/=]+)$/);
  if (m && m[1].length < 700000) photo = Uint8Array.from(atob(m[1]), c => c.charCodeAt(0));
  const r = await env.DB.prepare("INSERT INTO reports (user_id, kind, text, la, lo, city, photo, status, created) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, 'new', ?8) RETURNING id")
    .bind(u.id, kind, text, la, lo, Number.isInteger(b.city) ? b.city : 0, photo, now).first();
  if (u.tg_id) await tgSend(env, 'sendMessage', { chat_id: u.tg_id, text: `📝 Ваше сообщение №${r.id} принято и уже видно на карте MyUzCity. Другие жители могут его поддержать.` });
  const cap = `${REPORT_KINDS[kind] || kind} · №${r.id}\n${text}\n\n📍 https://yandex.uz/maps/?pt=${lo},${la}&z=17&l=map\n👤 ${u.first_name || ''} ${u.phone || ''}`.slice(0, 1000);
  const kb = { inline_keyboard: [[{ text: '🛠 В работу', callback_data: `rs:${r.id}:work` }, { text: '✅ Решено', callback_data: `rs:${r.id}:done` }, { text: '✖️ Отклонить', callback_data: `rs:${r.id}:rej` }]] };
  if (photo) await notifyAdmins(env, 'sendPhoto', { photo: `${new URL(request.url).origin}/api/reports/photo?id=${r.id}`, caption: cap, reply_markup: kb });
  else await notifyAdmins(env, 'sendMessage', { text: cap, reply_markup: kb, disable_web_page_preview: true });
  return json({ ok: true, id: r.id });
}
