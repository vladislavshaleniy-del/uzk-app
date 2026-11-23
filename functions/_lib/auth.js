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
