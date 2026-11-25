// Вход по Face ID / отпечатку (passkeys, WebAuthn). Лицо и отпечаток проверяет сам телефон —
// к нам приходит только открытый ключ (при включении) и подпись (при входе). Биометрия на сервер не попадает.
// POST { action: 'reg-options' } → параметры для navigator.credentials.create (нужен вход)
// POST { action: 'register', id, clientDataJSON, publicKey, alg, name } → сохранить ключ (нужен вход)
// POST { action: 'login-options' } → параметры для navigator.credentials.get
// POST { action: 'login', id, clientDataJSON, authenticatorData, signature } → сессия как после входа через Telegram
// GET → ключи пользователя; POST { action: 'remove', id } → удалить ключ
import { json, CORS, ensureDb, readSession, signSession, ready, publicUser } from '../_lib/auth.js';
export const onRequestOptions = () => new Response(null, { headers: CORS });

const enc = new TextEncoder();
const b64u = buf => { const a = new Uint8Array(buf); let s = ''; for (let i = 0; i < a.length; i++) s += String.fromCharCode(a[i]); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); };
const unb64u = s => Uint8Array.from(atob(String(s).replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((String(s).length + 3) % 4)), c => c.charCodeAt(0));
const sha256 = async d => new Uint8Array(await crypto.subtle.digest('SHA-256', typeof d === 'string' ? enc.encode(d) : d));
const eq = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);
const ORIGIN_OK = /^https:\/\/((app\.)?myuzcity\.uz|[a-z0-9-]+\.myuzcity\.pages\.dev|myuzcity\.pages\.dev)$/;

function originOf(request, env) {
  const o = request.headers.get('origin') || '';
  if (ORIGIN_OK.test(o) || (env.PASSKEY_ORIGIN && o === env.PASSKEY_ORIGIN)) return o;
  const self = new URL(request.url).origin;   // локальная проверка (wrangler) — только тот же адрес
  return o && o === self ? o : null;
}
async function db(env) {
  await ensureDb(env);
  await env.DB.batch([
    env.DB.prepare('CREATE TABLE IF NOT EXISTS passkeys (id TEXT PRIMARY KEY, user_id INTEGER, pk TEXT, alg INTEGER, counter INTEGER DEFAULT 0, name TEXT, created INTEGER, used INTEGER)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS pk_challenges (ch TEXT PRIMARY KEY, user_id INTEGER, kind TEXT, created INTEGER)'),
  ]);
  await env.DB.prepare('DELETE FROM pk_challenges WHERE created < ?1').bind(Date.now() - 10 * 60e3).run();
}
async function challenge(env, uid, kind) {
  const ch = b64u(crypto.getRandomValues(new Uint8Array(32)));
  await env.DB.prepare('INSERT INTO pk_challenges (ch, user_id, kind, created) VALUES (?1, ?2, ?3, ?4)').bind(ch, uid, kind, Date.now()).run();
  return ch;
}
async function takeChallenge(env, ch, kind) {
  const row = await env.DB.prepare('SELECT user_id, kind, created FROM pk_challenges WHERE ch = ?1').bind(ch).first();
  if (!row || row.kind !== kind || Date.now() - row.created > 5 * 60e3) return null;
  await env.DB.prepare('DELETE FROM pk_challenges WHERE ch = ?1').bind(ch).run();
  return row;
}
// ECDSA-подпись WebAuthn приходит в DER — WebCrypto ждёт r||s по 32 байта
function derToRaw(der) {
  let i = 2; if (der[1] & 0x80) i += der[1] & 0x7f;
  const part = () => { if (der[i++] !== 0x02) throw new Error('der'); const len = der[i++]; let v = der.slice(i, i + len); i += len; while (v.length > 32 && v[0] === 0) v = v.slice(1); const out = new Uint8Array(32); out.set(v, 32 - v.length); return out; };
  const r = part(), s = part(); const raw = new Uint8Array(64); raw.set(r, 0); raw.set(s, 32); return raw;
}
async function verifySig(pkB64, alg, data, sig) {
  const spki = unb64u(pkB64);
  if (alg === -7) {
    const key = await crypto.subtle.importKey('spki', spki, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['verify']);
    return crypto.subtle.verify({ name: 'ECDSA', hash: 'SHA-256' }, key, derToRaw(sig), data);
  }
  if (alg === -257) {
    const key = await crypto.subtle.importKey('spki', spki, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
    return crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, sig, data);
  }
  return false;
}
const parseClient = s => { try { return JSON.parse(new TextDecoder().decode(unb64u(s))); } catch { return null; } };

export async function onRequestGet({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  const s = await readSession(env, request); if (!s) return json({ ok: false, error: 'unauthorized' }, 401);
  await db(env);
  const r = await env.DB.prepare('SELECT id, name, created, used FROM passkeys WHERE user_id = ?1 ORDER BY created DESC').bind(s.u).all();
  return json({ ok: true, keys: r.results || [] });
}

export async function onRequestPost({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  let b; try { b = await request.json(); } catch { return json({ ok: false }, 400); }
  const origin = originOf(request, env); if (!origin) return json({ ok: false, error: 'origin' }, 403);
  const rpId = new URL(origin).hostname;
  await db(env);

  if (b.action === 'login-options') {
    return json({ ok: true, challenge: await challenge(env, null, 'login'), rpId, timeout: 60000, userVerification: 'required' });
  }
  if (b.action === 'login') {
    const cd = parseClient(b.clientDataJSON);
    if (!cd || cd.type !== 'webauthn.get' || cd.origin !== origin) return json({ ok: false, error: 'client' }, 400);
    if (!await takeChallenge(env, cd.challenge, 'login')) return json({ ok: false, error: 'challenge' }, 400);
    const key = await env.DB.prepare('SELECT * FROM passkeys WHERE id = ?1').bind(String(b.id || '')).first();
    if (!key) return json({ ok: false, error: 'unknown_key' }, 404);
    const ad = unb64u(b.authenticatorData);
    if (ad.length < 37 || !eq(ad.slice(0, 32), await sha256(rpId))) return json({ ok: false, error: 'rp' }, 400);
    if (!(ad[32] & 0x01) || !(ad[32] & 0x04)) return json({ ok: false, error: 'uv' }, 400);   // человек подтвердил лицом/пальцем
    const signed = new Uint8Array(ad.length + 32); signed.set(ad, 0); signed.set(await sha256(unb64u(b.clientDataJSON)), ad.length);
    let ok = false; try { ok = await verifySig(key.pk, key.alg, signed, unb64u(b.signature)); } catch { ok = false; }
    if (!ok) return json({ ok: false, error: 'signature' }, 400);
    const counter = (ad[33] << 24 | ad[34] << 16 | ad[35] << 8 | ad[36]) >>> 0;
    if (counter && key.counter && counter <= key.counter) return json({ ok: false, error: 'counter' }, 400);
    await env.DB.prepare('UPDATE passkeys SET counter = ?1, used = ?2 WHERE id = ?3').bind(counter, Date.now(), key.id).run();
    const user = await env.DB.prepare('SELECT * FROM users WHERE id = ?1').bind(key.user_id).first();
    if (!user) return json({ ok: false, error: 'no_user' }, 404);
    return json({ ok: true, token: await signSession(env, user.id), user: publicUser(user) });
  }

  const s = await readSession(env, request); if (!s) return json({ ok: false, error: 'unauthorized' }, 401);
  const user = await env.DB.prepare('SELECT * FROM users WHERE id = ?1').bind(s.u).first(); if (!user) return json({ ok: false, error: 'unauthorized' }, 401);

  if (b.action === 'reg-options') {
    const have = await env.DB.prepare('SELECT id FROM passkeys WHERE user_id = ?1').bind(user.id).all();
    const name = user.name || [user.first_name, user.last_name].filter(Boolean).join(' ') || (user.phone ? '+' + user.phone : 'MyUzCity');
    return json({ ok: true, challenge: await challenge(env, user.id, 'reg'), rp: { id: rpId, name: 'MyUzCity' }, user: { id: b64u(enc.encode('u' + user.id)), name: user.phone ? '+' + user.phone : name, displayName: name },
      pubKeyCredParams: [{ type: 'public-key', alg: -7 }, { type: 'public-key', alg: -257 }], timeout: 60000, attestation: 'none',
      authenticatorSelection: { authenticatorAttachment: 'platform', residentKey: 'required', requireResidentKey: true, userVerification: 'required' },
      exclude: (have.results || []).map(r => r.id) });
  }
  if (b.action === 'register') {
    const cd = parseClient(b.clientDataJSON);
    if (!cd || cd.type !== 'webauthn.create' || cd.origin !== origin) return json({ ok: false, error: 'client' }, 400);
    const ch = await takeChallenge(env, cd.challenge, 'reg'); if (!ch || ch.user_id !== user.id) return json({ ok: false, error: 'challenge' }, 400);
    const alg = +b.alg; if (alg !== -7 && alg !== -257) return json({ ok: false, error: 'alg' }, 400);
    const id = String(b.id || ''); if (!/^[A-Za-z0-9_-]{16,1400}$/.test(id) || typeof b.publicKey !== 'string' || b.publicKey.length > 2000) return json({ ok: false, error: 'bad' }, 400);
    try { await crypto.subtle.importKey('spki', unb64u(b.publicKey), alg === -7 ? { name: 'ECDSA', namedCurve: 'P-256' } : { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']); } catch { return json({ ok: false, error: 'key' }, 400); }
    await env.DB.prepare('INSERT OR REPLACE INTO passkeys (id, user_id, pk, alg, counter, name, created) VALUES (?1, ?2, ?3, ?4, 0, ?5, ?6)').bind(id, user.id, b.publicKey, alg, String(b.name || '').slice(0, 60), Date.now()).run();
    return json({ ok: true });
  }
  if (b.action === 'remove') {
    await env.DB.prepare('DELETE FROM passkeys WHERE id = ?1 AND user_id = ?2').bind(String(b.id || ''), user.id).run();
    return json({ ok: true });
  }
  return json({ ok: false, error: 'action' }, 400);
}
