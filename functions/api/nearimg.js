// Фото для «Людей рядом» и личных чатов — только по подписанной ссылке на 3 часа,
// которую сервер выдаёт тем, кому это фото положено видеть (собеседнику или людям рядом).
import { CORS, ready } from '../_lib/auth.js';
const enc = new TextEncoder();
const hex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
async function sign(env, s) { const k = await crypto.subtle.importKey('raw', enc.encode(env.TG_BOT_TOKEN + ':nearimg'), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']); return hex(await crypto.subtle.sign('HMAC', k, enc.encode(s))).slice(0, 32); }
const nf = () => new Response('not found', { status: 404, headers: CORS });
export async function onRequestGet({ request, env }) {
  if (!ready(env) || !env.TG_BOT_TOKEN) return nf();
  const q = new URL(request.url).searchParams, k = q.get('k'), id = +q.get('id'), e = +q.get('e'), s = q.get('s') || '';
  if (!['a', 'm'].includes(k) || !id || !e || e < Date.now() / 1000 || s !== await sign(env, `${k}:${id}:${e}`)) return nf();
  const r = k === 'a' ? await env.DB.prepare('SELECT data AS d FROM avatars WHERE user_id = ?1').bind(id).first().catch(() => null)
    : await env.DB.prepare('SELECT photo AS d FROM dm_msgs WHERE id = ?1').bind(id).first().catch(() => null);
  if (!r || !r.d) return nf();
  return new Response(new Uint8Array(r.d), { headers: { 'content-type': 'image/jpeg', 'cache-control': 'private, max-age=10800', ...CORS } });
}
