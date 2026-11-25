// «Люди рядом» и личные чаты.
// Видны только те, кто сам включил «показывать меня» и вошёл через Telegram. Другим видно только имя, фото
// и примерное расстояние; координаты хранятся со сдвигом ~100–200 м, наружу не отдаются и забываются через час.
// GET  ?unread=1               → { n } — непрочитанные (для красной цифры на кнопке)
// GET  ?chats=1                → список чатов
// GET  ?thread=ID&after=MSG    → сообщения чата (и отметка «прочитано»)
// POST { action:'locate', lat, lon } → обновить своё место и получить людей рядом
// POST { action:'hide' }       → перестать показываться
// POST { action:'open', to }   → открыть (или создать) чат с человеком
// POST { action:'send', thread, text, photo } → отправить сообщение (photo — JPEG data URL)
// POST { action:'block', user } / { action:'report', user, thread, reason } → заблокировать / пожаловаться
import { json, CORS, ensureDb, sessionUser, ready } from '../_lib/auth.js';
export const onRequestOptions = () => new Response(null, { headers: CORS });

const RADIUS_KM = 10, FRESH_MS = 60 * 60e3, MAX_PHOTO = 400 * 1024;
const enc = new TextEncoder();
const hex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
async function sign(env, s) { const k = await crypto.subtle.importKey('raw', enc.encode(env.TG_BOT_TOKEN + ':nearimg'), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']); return hex(await crypto.subtle.sign('HMAC', k, enc.encode(s))).slice(0, 32); }
async function imgUrl(env, kind, id) { const e = Math.floor(Date.now() / 1000) + 3 * 3600; return `/api/nearimg?k=${kind}&id=${id}&e=${e}&s=${await sign(env, `${kind}:${id}:${e}`)}`; }
const firstName = u => String(u.first_name || u.name || '').trim().split(/\s+/)[0].slice(0, 30) || 'MyUzCity';
function km(a, b, c, d) { const R = 6371, x = (c - a) * Math.PI / 180, y = (d - b) * Math.PI / 180; const h = Math.sin(x / 2) ** 2 + Math.cos(a * Math.PI / 180) * Math.cos(c * Math.PI / 180) * Math.sin(y / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(h)); }
// примерное расстояние: до 1 км — шаг 100 м (не меньше 100), дальше — 0,5 км
const approx = d => d < 1 ? Math.max(100, Math.round(d * 10) * 100) : Math.round(d * 2) / 2 * 1000;

async function db(env) {
  await ensureDb(env);
  await env.DB.batch([
    env.DB.prepare('CREATE TABLE IF NOT EXISTS near_loc (user_id INTEGER PRIMARY KEY, lat REAL, lon REAL, updated INTEGER)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS dm_threads (id INTEGER PRIMARY KEY AUTOINCREMENT, a INTEGER, b INTEGER, read_a INTEGER DEFAULT 0, read_b INTEGER DEFAULT 0, last_id INTEGER DEFAULT 0, last_at INTEGER DEFAULT 0, last_text TEXT, UNIQUE(a, b))'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS dm_msgs (id INTEGER PRIMARY KEY AUTOINCREMENT, thread INTEGER, sender INTEGER, text TEXT, photo BLOB, created INTEGER)'),
    env.DB.prepare('CREATE INDEX IF NOT EXISTS dm_msgs_thread ON dm_msgs (thread, id)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS dm_blocks (user_id INTEGER, blocked INTEGER, created INTEGER, PRIMARY KEY (user_id, blocked))'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS dm_reports (id INTEGER PRIMARY KEY AUTOINCREMENT, reporter INTEGER, target INTEGER, thread INTEGER, reason TEXT, created INTEGER)'),
  ]);
}
const blocked = async (env, x, y) => !!(await env.DB.prepare('SELECT 1 FROM dm_blocks WHERE (user_id = ?1 AND blocked = ?2) OR (user_id = ?2 AND blocked = ?1)').bind(x, y).first());
async function person(env, id, me) {
  const u = await env.DB.prepare('SELECT id, first_name, name FROM users WHERE id = ?1').bind(id).first(); if (!u) return null;
  const av = await env.DB.prepare('SELECT 1 AS y FROM avatars WHERE user_id = ?1 AND data IS NOT NULL').bind(id).first().catch(() => null);
  const p = { id: u.id, name: firstName(u), photo: av ? await imgUrl(env, 'a', u.id) : null };
  if (me) { const [l1, l2] = await Promise.all([env.DB.prepare('SELECT lat, lon, updated FROM near_loc WHERE user_id = ?1').bind(me).first(), env.DB.prepare('SELECT lat, lon, updated FROM near_loc WHERE user_id = ?1').bind(id).first()]);
    if (l1 && l2 && Date.now() - l2.updated < 24 * 3600e3) p.dist = approx(km(l1.lat, l1.lon, l2.lat, l2.lon)); }
  return p;
}
async function thread(env, id, uid) { const t = await env.DB.prepare('SELECT * FROM dm_threads WHERE id = ?1').bind(+id).first(); return t && (t.a === uid || t.b === uid) ? t : null; }
async function unread(env, uid) {
  const r = await env.DB.prepare('SELECT COUNT(*) AS n FROM dm_msgs m JOIN dm_threads t ON t.id = m.thread WHERE (t.a = ?1 OR t.b = ?1) AND m.sender != ?1 AND m.id > (CASE WHEN t.a = ?1 THEN t.read_a ELSE t.read_b END)').bind(uid).first();
  return r ? r.n : 0;
}

export async function onRequestGet({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  const u = await sessionUser(env, request); if (!u) return json({ ok: false, error: 'unauthorized' }, 401);
  await db(env);
  const q = new URL(request.url).searchParams;
  if (q.get('unread')) return json({ ok: true, n: await unread(env, u.id) });
  if (q.get('chats')) {
    const r = await env.DB.prepare(`SELECT t.*, (SELECT COUNT(*) FROM dm_msgs m WHERE m.thread = t.id AND m.sender != ?1 AND m.id > (CASE WHEN t.a = ?1 THEN t.read_a ELSE t.read_b END)) AS unread
      FROM dm_threads t WHERE (t.a = ?1 OR t.b = ?1) AND t.last_id > 0 ORDER BY t.last_at DESC LIMIT 100`).bind(u.id).all();
    const list = [];
    for (const t of r.results || []) { const other = t.a === u.id ? t.b : t.a; if (await blocked(env, u.id, other)) continue; const p = await person(env, other, u.id); if (p) list.push({ id: t.id, who: p, last: t.last_text || '', at: t.last_at, unread: t.unread }); }
    return json({ ok: true, list, n: list.reduce((s, x) => s + x.unread, 0) });
  }
  if (q.get('thread')) {
    const t = await thread(env, q.get('thread'), u.id); if (!t) return json({ ok: false, error: 'not_found' }, 404);
    const after = +q.get('after') || 0, other = t.a === u.id ? t.b : t.a;
    const r = after ? await env.DB.prepare('SELECT id, sender, text, photo IS NOT NULL AS ph, created FROM dm_msgs WHERE thread = ?1 AND id > ?2 ORDER BY id LIMIT 100').bind(t.id, after).all()
      : await env.DB.prepare('SELECT * FROM (SELECT id, sender, text, photo IS NOT NULL AS ph, created FROM dm_msgs WHERE thread = ?1 ORDER BY id DESC LIMIT 80) ORDER BY id').bind(t.id).all();
    const msgs = [];
    for (const m of r.results || []) msgs.push({ id: m.id, mine: m.sender === u.id, text: m.text || '', photo: m.ph ? await imgUrl(env, 'm', m.id) : null, at: m.created });
    const lastId = msgs.length ? msgs[msgs.length - 1].id : 0;
    if (lastId) await env.DB.prepare(`UPDATE dm_threads SET ${t.a === u.id ? 'read_a' : 'read_b'} = MAX(${t.a === u.id ? 'read_a' : 'read_b'}, ?1) WHERE id = ?2`).bind(lastId, t.id).run();
    return json({ ok: true, who: after ? null : await person(env, other, u.id), list: msgs, blocked: await blocked(env, u.id, other) });
  }
  return json({ ok: false, error: 'query' }, 400);
}

export async function onRequestPost({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  const u = await sessionUser(env, request); if (!u) return json({ ok: false, error: 'unauthorized' }, 401);
  let b; try { b = await request.json(); } catch { return json({ ok: false }, 400); }
  await db(env);

  if (b.action === 'locate') {
    const lat = +b.lat, lon = +b.lon;
    if (!(Math.abs(lat) <= 90 && Math.abs(lon) <= 180) || (!lat && !lon)) return json({ ok: false, error: 'bad_location' }, 400);
    // сдвиг на 100–200 м в случайную сторону: по расстоянию нельзя вычислить точное место
    const ang = Math.random() * 2 * Math.PI, off = (0.1 + Math.random() * 0.1) / 111;
    const fl = lat + off * Math.cos(ang), fo = lon + off * Math.sin(ang) / Math.cos(lat * Math.PI / 180);
    await env.DB.prepare('INSERT INTO near_loc (user_id, lat, lon, updated) VALUES (?1, ?2, ?3, ?4) ON CONFLICT(user_id) DO UPDATE SET lat = excluded.lat, lon = excluded.lon, updated = excluded.updated').bind(u.id, fl, fo, Date.now()).run();
    const dLat = RADIUS_KM / 111, dLon = RADIUS_KM / (111 * Math.cos(lat * Math.PI / 180));
    const r = await env.DB.prepare('SELECT user_id, lat, lon FROM near_loc WHERE user_id != ?1 AND updated > ?2 AND lat BETWEEN ?3 AND ?4 AND lon BETWEEN ?5 AND ?6 LIMIT 400')
      .bind(u.id, Date.now() - FRESH_MS, lat - dLat, lat + dLat, lon - dLon, lon + dLon).all();
    const near = (r.results || []).map(x => ({ id: x.user_id, d: km(fl, fo, x.lat, x.lon) })).filter(x => x.d <= RADIUS_KM).sort((x, y) => x.d - y.d).slice(0, 60);
    const list = [];
    for (const x of near) { if (await blocked(env, u.id, x.id)) continue; const p = await person(env, x.id); if (p) list.push({ ...p, dist: approx(x.d) }); }
    return json({ ok: true, list, radius: RADIUS_KM });
  }
  if (b.action === 'hide') { await env.DB.prepare('DELETE FROM near_loc WHERE user_id = ?1').bind(u.id).run(); return json({ ok: true }); }

  if (b.action === 'open') {
    const to = +b.to; if (!to || to === u.id) return json({ ok: false, error: 'bad_user' }, 400);
    if (await blocked(env, u.id, to)) return json({ ok: false, error: 'blocked' }, 403);
    const [a, c] = u.id < to ? [u.id, to] : [to, u.id];
    let t = await env.DB.prepare('SELECT id FROM dm_threads WHERE a = ?1 AND b = ?2').bind(a, c).first();
    if (!t) {
      // новый чат — только с тем, кто сейчас показывается рядом
      const vis = await env.DB.prepare('SELECT 1 FROM near_loc WHERE user_id = ?1 AND updated > ?2').bind(to, Date.now() - FRESH_MS).first();
      if (!vis) return json({ ok: false, error: 'not_near' }, 403);
      t = await env.DB.prepare('INSERT INTO dm_threads (a, b) VALUES (?1, ?2) RETURNING id').bind(a, c).first();
    }
    return json({ ok: true, thread: t.id });
  }

  if (b.action === 'send') {
    const t = await thread(env, b.thread, u.id); if (!t) return json({ ok: false, error: 'not_found' }, 404);
    const other = t.a === u.id ? t.b : t.a;
    if (await blocked(env, u.id, other)) return json({ ok: false, error: 'blocked' }, 403);
    const text = String(b.text || '').replace(/\s+$/, '').slice(0, 1000);
    let photo = null;
    if (b.photo) {
      const m = typeof b.photo === 'string' && b.photo.match(/^data:image\/jpeg;base64,([A-Za-z0-9+/=]+)$/); if (!m) return json({ ok: false, error: 'bad_photo' }, 400);
      try { photo = Uint8Array.from(atob(m[1]), c => c.charCodeAt(0)); } catch { return json({ ok: false, error: 'bad_photo' }, 400); }
      if (photo.byteLength > MAX_PHOTO || photo[0] !== 0xFF || photo[1] !== 0xD8) return json({ ok: false, error: 'bad_photo' }, 400);
    }
    if (!text.trim() && !photo) return json({ ok: false, error: 'empty' }, 400);
    const recent = await env.DB.prepare('SELECT COUNT(*) AS n FROM dm_msgs WHERE sender = ?1 AND created > ?2').bind(u.id, Date.now() - 60e3).first();
    if (recent && recent.n >= 20) return json({ ok: false, error: 'limit' }, 429);
    const now = Date.now();
    const r = await env.DB.prepare('INSERT INTO dm_msgs (thread, sender, text, photo, created) VALUES (?1, ?2, ?3, ?4, ?5) RETURNING id').bind(t.id, u.id, text, photo, now).first();
    await env.DB.prepare(`UPDATE dm_threads SET last_id = ?1, last_at = ?2, last_text = ?3, ${t.a === u.id ? 'read_a' : 'read_b'} = ?1 WHERE id = ?4`).bind(r.id, now, text ? text.slice(0, 80) : '📷', t.id).run();
    return json({ ok: true, id: r.id });
  }

  if (b.action === 'block' || b.action === 'report') {
    const who = +b.user; if (!who || who === u.id) return json({ ok: false, error: 'bad_user' }, 400);
    await env.DB.prepare('INSERT OR IGNORE INTO dm_blocks (user_id, blocked, created) VALUES (?1, ?2, ?3)').bind(u.id, who, Date.now()).run();
    if (b.action === 'report') await env.DB.prepare('INSERT INTO dm_reports (reporter, target, thread, reason, created) VALUES (?1, ?2, ?3, ?4, ?5)').bind(u.id, who, +b.thread || null, String(b.reason || '').slice(0, 300), Date.now()).run();
    return json({ ok: true });
  }
  if (b.action === 'unblock') { await env.DB.prepare('DELETE FROM dm_blocks WHERE user_id = ?1 AND blocked = ?2').bind(u.id, +b.user).run(); return json({ ok: true }); }
  return json({ ok: false, error: 'action' }, 400);
}
