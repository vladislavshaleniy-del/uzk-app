// Trusted contacts for the panic button. GET → list; POST {action:'invite'} → bot link to send to a relative; POST {action:'remove', tg_id}.
import { json, CORS, ready, sessionUser, BOT } from '../_lib/auth.js';
export const onRequestOptions = () => new Response(null, { headers: CORS });
export async function onRequestGet({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  const u = await sessionUser(env, request); if (!u) return json({ ok: false, error: 'unauthorized' }, 401);
  const r = await env.DB.prepare('SELECT tg_id, name, created FROM trusted WHERE owner = ?1 ORDER BY created').bind(u.id).all();
  return json({ ok: true, list: r.results || [] });
}
export async function onRequestPost({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  const u = await sessionUser(env, request); if (!u) return json({ ok: false, error: 'unauthorized' }, 401);
  let b; try { b = await request.json(); } catch { return json({ ok: false }, 400); }
  if (b.action === 'invite') {
    const a = new Uint8Array(12); crypto.getRandomValues(a);
    const code = btoa(String.fromCharCode(...a)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    await env.DB.prepare('INSERT INTO invites (code, owner, created) VALUES (?1, ?2, ?3)').bind(code, u.id, Math.floor(Date.now() / 1000)).run();
    return json({ ok: true, link: `https://t.me/${BOT}?start=trust_${code}` });
  }
  if (b.action === 'remove' && Number.isFinite(+b.tg_id)) {
    await env.DB.prepare('DELETE FROM trusted WHERE owner = ?1 AND tg_id = ?2').bind(u.id, +b.tg_id).run();
    return json({ ok: true });
  }
  return json({ ok: false, error: 'bad' }, 400);
}
