// Shared helpers for MyUzCity sign-in via the Telegram bot (no secrets in code:
// the bot token lives only in the Cloudflare secret TG_BOT_TOKEN, users in the D1 database bound as DB).
export const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-methods': 'GET, POST, OPTIONS', 'access-control-allow-headers': 'content-type, authorization' };
export const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...CORS } });
export const BOT = 'MyUzCity_bot';
export const NONCE = /^[A-Za-z0-9_-]{24,48}$/;
const enc = new TextEncoder();
const b64u = buf => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const unb64u = s => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));
async function hmac(key, data) {
  const k = await crypto.subtle.importKey('raw', enc.encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return crypto.subtle.sign('HMAC', k, enc.encode(data));
}
// secret Telegram echoes back on every webhook call, derived from the bot token
export async function hookSecret(env) { return [...new Uint8Array(await hmac(env.TG_BOT_TOKEN, 'myuzcity-webhook'))].map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 48); }
// session token = payload.signature, signed with a key derived from the bot token
export async function signSession(env, uid) {
  const p = b64u(enc.encode(JSON.stringify({ u: uid, t: Math.floor(Date.now() / 1000) })));
  return p + '.' + b64u(await hmac(env.TG_BOT_TOKEN, 'myuzcity-session:' + p));
}
export async function readSession(env, request) {
  const m = (request.headers.get('authorization') || '').match(/^Bearer\s+([A-Za-z0-9_-]+)\.([A-Za-z0-9_-]+)$/);
  if (!m || !env.TG_BOT_TOKEN) return null;
  if (b64u(await hmac(env.TG_BOT_TOKEN, 'myuzcity-session:' + m[1])) !== m[2]) return null;
  try { return JSON.parse(new TextDecoder().decode(unb64u(m[1]))); } catch { return null; }
}
export async function ensureDb(env) {
  await env.DB.batch([
    env.DB.prepare('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, tg_id INTEGER UNIQUE, phone TEXT, first_name TEXT, last_name TEXT, username TEXT, name TEXT, city INTEGER, lang TEXT, created INTEGER, last_login INTEGER)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS logins (nonce TEXT PRIMARY KEY, chat_id INTEGER, user_id INTEGER, status TEXT, created INTEGER)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS codes (code TEXT PRIMARY KEY, user_id INTEGER, nonce TEXT, created INTEGER)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS fails (ip TEXT, ts INTEGER)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS invites (code TEXT PRIMARY KEY, owner INTEGER, created INTEGER)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS trusted (owner INTEGER, tg_id INTEGER, name TEXT, created INTEGER, PRIMARY KEY (owner, tg_id))'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS sos_log (owner INTEGER, ts INTEGER)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS polls (id INTEGER PRIMARY KEY AUTOINCREMENT, scope TEXT, city INTEGER, q TEXT, options TEXT, created INTEGER, ends INTEGER, author INTEGER)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS votes (poll_id INTEGER, user_id INTEGER, opt INTEGER, ts INTEGER, PRIMARY KEY (poll_id, user_id))'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS reports (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, kind TEXT, text TEXT, la REAL, lo REAL, city INTEGER, photo BLOB, status TEXT, ups INTEGER DEFAULT 0, created INTEGER)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS report_ups (report_id INTEGER, user_id INTEGER, PRIMARY KEY (report_id, user_id))'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS docs (user_id INTEGER, kind TEXT, title TEXT, expires TEXT, notified INTEGER DEFAULT 0, PRIMARY KEY (user_id, kind, title))'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS chat (id INTEGER PRIMARY KEY AUTOINCREMENT, room TEXT, user_id INTEGER, name TEXT, text TEXT, created INTEGER)'),
    env.DB.prepare('CREATE INDEX IF NOT EXISTS chat_room ON chat (room, id)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS feedback (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, text TEXT, created INTEGER)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS prefs (user_id INTEGER PRIMARY KEY, docs INTEGER DEFAULT 1, air INTEGER DEFAULT 0, reports INTEGER DEFAULT 1, mahalla TEXT)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS admins (tg_id INTEGER PRIMARY KEY, created INTEGER)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS flags (k TEXT PRIMARY KEY, v TEXT)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS cars (user_id INTEGER, plate TEXT, model TEXT, color TEXT, created INTEGER, PRIMARY KEY (user_id, plate))'),
  ]);
}
export const publicUser = u => u && ({ id: u.id, phone: u.phone, first_name: u.first_name || '', last_name: u.last_name || '', username: u.username || '', name: u.name || '', city: u.city, lang: u.lang || '', created: u.created });
export const ready = env => !!(env.DB && env.TG_BOT_TOKEN);
// 6-digit one-time code the bot sends; valid 10 minutes
export async function newCode(env, uid, nonce) {
  const now = Math.floor(Date.now() / 1000);
  await env.DB.prepare('DELETE FROM codes WHERE created < ?1 OR user_id = ?2').bind(now - 600, uid).run();
  for (let i = 0; i < 5; i++) {
    const a = new Uint32Array(1); crypto.getRandomValues(a); const code = String(a[0] % 1000000).padStart(6, '0');
    const r = await env.DB.prepare('INSERT INTO codes (code, user_id, nonce, created) VALUES (?1, ?2, ?3, ?4) ON CONFLICT(code) DO NOTHING').bind(code, uid, nonce || null, now).run();
    if (!r.meta || r.meta.changes !== 0) return code;
  }
  throw new Error('code');
}
// signed-in user for this request (or null)
export async function sessionUser(env, request) {
  const s = await readSession(env, request); if (!s) return null;
  await ensureDb(env);
  return env.DB.prepare('SELECT * FROM users WHERE id = ?1').bind(s.u).first();
}
export async function tgSend(env, method, body) {
  const r = await fetch(`https://api.telegram.org/bot${env.TG_BOT_TOKEN}/${method}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  return r.json().catch(() => ({}));
}
export const fmtPhone = p => { const d = String(p || '').replace(/\D/g, ''); return d.length === 12 && d.startsWith('998') ? `+998 ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10)}` : (d ? '+' + d : ''); };
export const displayName = u => (u.name || [u.first_name, u.last_name].filter(Boolean).join(' ') || fmtPhone(u.phone)).slice(0, 80);
// Messages for the people who run the service (they become admins with /admin in the bot)
export async function notifyAdmins(env, method, body) {
  const r = await env.DB.prepare('SELECT tg_id FROM admins').all();
  for (const a of r.results || []) await tgSend(env, method, { ...body, chat_id: a.tg_id });
  return (r.results || []).length;
}
export async function userPrefs(env, uid) {
  return (await env.DB.prepare('SELECT * FROM prefs WHERE user_id = ?1').bind(uid).first()) || { docs: 1, air: 0, reports: 1, mahalla: '' };
}
export const REPORT_KINDS = { road: '🕳 Дороги', light: '💡 Освещение', clean: '🗑 Мусор', water: '🚰 Вода/канализация', park: '🌳 Парки/дворы', transport: '🚌 Транспорт', other: '📌 Другое', appeal: '🏛 Обращение к хокиму' };
export const REPORT_ST = { new: 'Новое', work: 'В работе', done: 'Решено', rej: 'Отклонено' };
