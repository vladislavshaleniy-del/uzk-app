// Notification settings: GET → {docs, air, reports, mahalla}; POST any of them.
import { json, CORS, ready, sessionUser, userPrefs } from '../_lib/auth.js';
export const onRequestOptions = () => new Response(null, { headers: CORS });
export async function onRequestGet({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  const u = await sessionUser(env, request); if (!u) return json({ ok: false, error: 'unauthorized' }, 401);
  const p = await userPrefs(env, u.id); return json({ ok: true, prefs: { docs: p.docs, air: p.air, reports: p.reports, mahalla: p.mahalla || '' } });
}
export async function onRequestPost({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  const u = await sessionUser(env, request); if (!u) return json({ ok: false, error: 'unauthorized' }, 401);
  let b; try { b = await request.json(); } catch { return json({ ok: false }, 400); }
  const p = await userPrefs(env, u.id), v = k => (k in b ? (b[k] ? 1 : 0) : p[k]);
  const mah = typeof b.mahalla === 'string' ? b.mahalla.trim().replace(/\s+/g, ' ').slice(0, 60) : (p.mahalla || '');
  const n = { docs: v('docs'), air: v('air'), reports: v('reports'), mahalla: mah };
  await env.DB.prepare('INSERT INTO prefs (user_id, docs, air, reports, mahalla) VALUES (?1, ?2, ?3, ?4, ?5) ON CONFLICT(user_id) DO UPDATE SET docs = excluded.docs, air = excluded.air, reports = excluded.reports, mahalla = excluded.mahalla').bind(u.id, n.docs, n.air, n.reports, n.mahalla).run();
  return json({ ok: true, prefs: n });
}
