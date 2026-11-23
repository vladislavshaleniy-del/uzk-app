// Current user's profile: GET returns it, POST updates name/city/lang.
import { json, CORS, ensureDb, readSession, ready, publicUser } from '../_lib/auth.js';
export const onRequestOptions = () => new Response(null, { headers: CORS });
async function me(env, request) { const s = await readSession(env, request); if (!s) return null; await ensureDb(env); return env.DB.prepare('SELECT * FROM users WHERE id = ?1').bind(s.u).first(); }
export async function onRequestGet({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  const u = await me(env, request); return u ? json({ ok: true, user: publicUser(u) }) : json({ ok: false, error: 'unauthorized' }, 401);
}
export async function onRequestPost({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  const u = await me(env, request); if (!u) return json({ ok: false, error: 'unauthorized' }, 401);
  let b; try { b = await request.json(); } catch { return json({ ok: false }, 400); }
  const name = typeof b.name === 'string' ? b.name.trim().slice(0, 80) : u.name;
  const city = Number.isInteger(b.city) && b.city >= 0 && b.city < 300 ? b.city : u.city;
  const lang = ['ru', 'uz', 'en', 'zh'].includes(b.lang) ? b.lang : u.lang;
  await env.DB.prepare('UPDATE users SET name = ?1, city = ?2, lang = ?3 WHERE id = ?4').bind(name, city, lang, u.id).run();
  return json({ ok: true, user: publicUser({ ...u, name, city, lang }) });
}
