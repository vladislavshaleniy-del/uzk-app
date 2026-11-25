// Фото профиля: GET — своё фото (если своего нет — один раз пробуем взять аватар из Telegram),
// POST { photo: 'data:image/jpeg;base64,…' } — сохранить своё, { tg: 1 } — взять из Telegram, { remove: 1 } — удалить.
// Фото видит только сам владелец (по токену сессии), наружу по ссылке не отдаётся.
import { json, CORS, ensureDb, readSession, ready } from '../_lib/auth.js';
export const onRequestOptions = () => new Response(null, { headers: CORS });

const MAX = 300 * 1024;
const toB64 = buf => { const a = new Uint8Array(buf); let s = ''; for (let i = 0; i < a.length; i += 0x8000) s += String.fromCharCode.apply(null, a.subarray(i, i + 0x8000)); return btoa(s); };
const asUrl = d => d ? 'data:image/jpeg;base64,' + toB64(d) : null;

async function who(env, request) {
  const s = await readSession(env, request); if (!s) return null;
  await ensureDb(env);
  await env.DB.prepare('CREATE TABLE IF NOT EXISTS avatars (user_id INTEGER PRIMARY KEY, data BLOB, src TEXT, updated INTEGER)').run();
  return env.DB.prepare('SELECT id, tg_id FROM users WHERE id = ?1').bind(s.u).first();
}
async function fromTelegram(env, tgId) {
  if (!tgId || !env.TG_BOT_TOKEN) return null;
  const api = m => `https://api.telegram.org/bot${env.TG_BOT_TOKEN}/${m}`;
  const p = await fetch(api('getUserProfilePhotos') + `?user_id=${tgId}&limit=1`).then(r => r.json()).catch(() => null);
  const sizes = p && p.ok && p.result && p.result.photos && p.result.photos[0];
  if (!sizes || !sizes.length) return null;
  const pick = sizes.find(s => s.width >= 320) || sizes[sizes.length - 1];
  const f = await fetch(api('getFile') + `?file_id=${encodeURIComponent(pick.file_id)}`).then(r => r.json()).catch(() => null);
  if (!f || !f.ok || !f.result || !f.result.file_path) return null;
  const img = await fetch(`https://api.telegram.org/file/bot${env.TG_BOT_TOKEN}/${f.result.file_path}`).catch(() => null);
  if (!img || !img.ok) return null;
  const buf = new Uint8Array(await img.arrayBuffer());
  return buf.byteLength && buf.byteLength <= MAX ? buf : null;
}
const save = (env, uid, data, src) => env.DB.prepare('INSERT INTO avatars (user_id, data, src, updated) VALUES (?1, ?2, ?3, ?4) ON CONFLICT(user_id) DO UPDATE SET data = excluded.data, src = excluded.src, updated = excluded.updated').bind(uid, data, src, Date.now()).run();

export async function onRequestGet({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  const u = await who(env, request); if (!u) return json({ ok: false, error: 'unauthorized' }, 401);
  let row = await env.DB.prepare('SELECT data, src FROM avatars WHERE user_id = ?1').bind(u.id).first();
  if (!row) { const d = await fromTelegram(env, u.tg_id); await save(env, u.id, d, d ? 'tg' : 'none'); row = { data: d }; }
  return json({ ok: true, photo: row.data ? asUrl(row.data) : null });
}

export async function onRequestPost({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  const u = await who(env, request); if (!u) return json({ ok: false, error: 'unauthorized' }, 401);
  let b; try { b = await request.json(); } catch { return json({ ok: false }, 400); }
  if (b.remove) { await save(env, u.id, null, 'removed'); return json({ ok: true, photo: null }); }
  if (b.tg) { const d = await fromTelegram(env, u.tg_id); if (!d) return json({ ok: false, error: 'no_tg_photo' }); await save(env, u.id, d, 'tg'); return json({ ok: true, photo: asUrl(d) }); }
  const m = typeof b.photo === 'string' && b.photo.match(/^data:image\/jpeg;base64,([A-Za-z0-9+/=]+)$/);
  if (!m) return json({ ok: false, error: 'bad_photo' }, 400);
  let bin; try { bin = Uint8Array.from(atob(m[1]), c => c.charCodeAt(0)); } catch { return json({ ok: false, error: 'bad_photo' }, 400); }
  if (bin.byteLength > MAX || bin[0] !== 0xFF || bin[1] !== 0xD8) return json({ ok: false, error: 'bad_photo' }, 400);
  await save(env, u.id, bin, 'own');
  return json({ ok: true });
}
