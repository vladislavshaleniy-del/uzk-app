// Neighbourhood chat: GET ?room=<key>&after=<id> → new messages; POST {room, text} (signed in).
// Rooms: "c<city>" — the whole city, "m<city>:<mahalla name>" — one mahalla.
import { json, CORS, ready, ensureDb, readSession, sessionUser, displayName } from '../_lib/auth.js';
const ROOM = /^(c\d{1,3}|m\d{1,3}:[^\n]{2,60})$/;
export const onRequestOptions = () => new Response(null, { headers: CORS });
export async function onRequestGet({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  await ensureDb(env);
  const q = new URL(request.url).searchParams, room = (q.get('room') || '').trim().toLowerCase(), after = +q.get('after') || 0;
  if (!ROOM.test(room)) return json({ ok: false, error: 'room' }, 400);
  const s = await readSession(env, request);
  const r = after
    ? await env.DB.prepare('SELECT id, user_id, name, text, created FROM chat WHERE room = ?1 AND id > ?2 ORDER BY id LIMIT 100').bind(room, after).all()
    : await env.DB.prepare('SELECT * FROM (SELECT id, user_id, name, text, created FROM chat WHERE room = ?1 ORDER BY id DESC LIMIT 60) ORDER BY id').bind(room).all();
  return json({ ok: true, list: (r.results || []).map(m => ({ id: m.id, name: m.name, text: m.text, created: m.created, mine: !!(s && s.u === m.user_id) })) });
}
export async function onRequestPost({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  const u = await sessionUser(env, request); if (!u) return json({ ok: false, error: 'unauthorized' }, 401);
  let b; try { b = await request.json(); } catch { return json({ ok: false }, 400); }
  const room = String(b.room || '').trim().toLowerCase(), text = String(b.text || '').replace(/\s+$/, '').slice(0, 800);
  if (!ROOM.test(room) || !text.trim()) return json({ ok: false, error: 'empty' }, 400);
  const now = Math.floor(Date.now() / 1000);
  const last = await env.DB.prepare('SELECT COUNT(*) AS n FROM chat WHERE user_id = ?1 AND created > ?2').bind(u.id, now - 60).first();
  if (last && last.n >= 8) return json({ ok: false, error: 'limit' }, 429);
  const r = await env.DB.prepare('INSERT INTO chat (room, user_id, name, text, created) VALUES (?1, ?2, ?3, ?4, ?5) RETURNING id').bind(room, u.id, displayName(u), text, now).first();
  return json({ ok: true, id: r.id });
}
