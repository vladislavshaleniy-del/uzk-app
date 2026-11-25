// Current user's profile: GET returns it, POST updates name/city/lang.
import { json, CORS, ensureDb, readSession, ready, publicUser } from '../_lib/auth.js';
export const onRequestOptions = () => new Response(null, { headers: CORS });
async function me(env, request) { const s = await readSession(env, request); if (!s) return null; await ensureDb(env); return env.DB.prepare('SELECT * FROM users WHERE id = ?1').bind(s.u).first(); }
export async function onRequestGet({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  const u = await me(env, request); if (!u) return json({ ok: false, error: 'unauthorized' }, 401);
  const n = async (sql) => ((await env.DB.prepare(sql).bind(u.id).first()) || {}).n || 0;
  const stats = { reports: await n('SELECT COUNT(*) AS n FROM reports WHERE user_id = ?1'), open: await n("SELECT COUNT(*) AS n FROM reports WHERE user_id = ?1 AND status IN ('new', 'work')"), votes: await n('SELECT COUNT(*) AS n FROM votes WHERE user_id = ?1'), docs: await n('SELECT COUNT(*) AS n FROM docs WHERE user_id = ?1'), trusted: await n('SELECT COUNT(*) AS n FROM trusted WHERE owner = ?1') };
  return json({ ok: true, user: publicUser(u), stats });
}
export async function onRequestPost({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  const u = await me(env, request); if (!u) return json({ ok: false, error: 'unauthorized' }, 401);
  let b; try { b = await request.json(); } catch { return json({ ok: false }, 400); }
  if (b.action === 'delete') {   // the user's right to erase: everything personal goes; public reports stay without the link to the person
    const del = (sql, ...v) => env.DB.prepare(sql).bind(u.id, ...v).run();
    await del('DELETE FROM market_photos WHERE ad_id IN (SELECT id FROM market WHERE user_id = ?1)'); await del('DELETE FROM market WHERE user_id = ?1');
    await del('DELETE FROM docs WHERE user_id = ?1'); await del('DELETE FROM cars WHERE user_id = ?1'); await del('DELETE FROM items WHERE user_id = ?1'); await del('DELETE FROM prefs WHERE user_id = ?1');
    await del('DELETE FROM trusted WHERE owner = ?1'); await del('DELETE FROM invites WHERE owner = ?1'); await del('DELETE FROM sos_log WHERE owner = ?1'); await del('DELETE FROM votes WHERE user_id = ?1');
    await del('DELETE FROM chat WHERE user_id = ?1'); await del('DELETE FROM report_ups WHERE user_id = ?1'); await del('UPDATE reports SET user_id = NULL WHERE user_id = ?1'); await del('UPDATE feedback SET user_id = NULL WHERE user_id = ?1');
    await del('DELETE FROM codes WHERE user_id = ?1'); await del('DELETE FROM logins WHERE user_id = ?1');
    if (u.tg_id) await env.DB.prepare('DELETE FROM trusted WHERE tg_id = ?1').bind(u.tg_id).run();
    try { await del('DELETE FROM avatars WHERE user_id = ?1'); } catch {}
    try { await del('DELETE FROM payme_cards WHERE user_id = ?1'); } catch {}
    try { await del('DELETE FROM passkeys WHERE user_id = ?1'); } catch {}
    await del('DELETE FROM users WHERE id = ?1');
    return json({ ok: true, deleted: true });
  }
  const name = typeof b.name === 'string' ? b.name.trim().slice(0, 80) : u.name;
  const city = Number.isInteger(b.city) && b.city >= 0 && b.city < 300 ? b.city : u.city;
  const lang = ['ru', 'uz', 'en', 'zh'].includes(b.lang) ? b.lang : u.lang;
  await env.DB.prepare('UPDATE users SET name = ?1, city = ?2, lang = ?3 WHERE id = ?4').bind(name, city, lang, u.id).run();
  return json({ ok: true, user: publicUser({ ...u, name, city, lang }) });
}
