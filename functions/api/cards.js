// «Мои карты»: привязка банковской карты через Payme Subscribe API.
// Номер карты к нам не попадает: телефон отправляет его прямо в Payme (cards.create → SMS-код → cards.verify)
// и присылает сюда только токен. Сервер проверяет токен в Payme (cards.check) и хранит токен, маску и срок.
// Включается секретами Cloudflare: PAYME_ID (ID мерчанта), PAYME_KEY (ключ Subscribe API), PAYME_TEST=1 — тестовая среда.
// GET — настройки (вкл/выкл, ID мерчанта для телефона) и карты пользователя;
// POST { token } — сохранить карту, { remove: id } — удалить, { main: id } — сделать основной.
import { json, CORS, ensureDb, readSession, ready } from '../_lib/auth.js';
export const onRequestOptions = () => new Response(null, { headers: CORS });

const api = env => env.PAYME_API || (env.PAYME_TEST === '1' ? 'https://checkout.test.paycom.uz/api' : 'https://checkout.paycom.uz/api');
const on = env => !!(env.PAYME_ID && env.PAYME_KEY);
async function payme(env, method, params) {
  const r = await fetch(api(env), { method: 'POST', headers: { 'content-type': 'application/json', 'x-auth': `${env.PAYME_ID}:${env.PAYME_KEY}` }, body: JSON.stringify({ id: Date.now(), method, params }) });
  const j = await r.json().catch(() => ({}));
  if (j.error) throw Object.assign(new Error(j.error.message || 'payme'), { code: j.error.code });
  return j.result;
}
async function who(env, request) {
  const s = await readSession(env, request); if (!s) return null;
  await ensureDb(env);
  await env.DB.prepare('CREATE TABLE IF NOT EXISTS payme_cards (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, token TEXT UNIQUE, mask TEXT, exp TEXT, main INTEGER DEFAULT 0, created INTEGER)').run();
  return env.DB.prepare('SELECT id FROM users WHERE id = ?1').bind(s.u).first();
}
const list = async (env, uid) => ((await env.DB.prepare('SELECT id, mask, exp, main FROM payme_cards WHERE user_id = ?1 ORDER BY main DESC, id').bind(uid).all()).results || []);
const cfg = env => ({ enabled: on(env), merchant: on(env) ? env.PAYME_ID : null, test: env.PAYME_TEST === '1' });

export async function onRequestGet({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  const u = await who(env, request);
  return json({ ok: true, ...cfg(env), cards: u ? await list(env, u.id) : [], signed: !!u });
}

export async function onRequestPost({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  const u = await who(env, request); if (!u) return json({ ok: false, error: 'unauthorized' }, 401);
  let b; try { b = await request.json(); } catch { return json({ ok: false }, 400); }
  if (b.remove != null) {
    const row = await env.DB.prepare('SELECT token FROM payme_cards WHERE id = ?1 AND user_id = ?2').bind(+b.remove, u.id).first();
    if (row && on(env)) { try { await payme(env, 'cards.remove', { token: row.token }); } catch {} }
    await env.DB.prepare('DELETE FROM payme_cards WHERE id = ?1 AND user_id = ?2').bind(+b.remove, u.id).run();
    return json({ ok: true, cards: await list(env, u.id) });
  }
  if (b.main != null) {
    await env.DB.prepare('UPDATE payme_cards SET main = CASE WHEN id = ?1 THEN 1 ELSE 0 END WHERE user_id = ?2').bind(+b.main, u.id).run();
    return json({ ok: true, cards: await list(env, u.id) });
  }
  if (!on(env)) return json({ ok: false, error: 'not_configured' });
  const token = typeof b.token === 'string' ? b.token.trim() : '';
  if (!token || token.length > 2000) return json({ ok: false, error: 'bad_token' }, 400);
  let card; try { card = (await payme(env, 'cards.check', { token })).card; } catch (e) { return json({ ok: false, error: 'payme', code: e.code || 0 }); }
  if (!card || !card.verify) return json({ ok: false, error: 'not_verified' });
  const mask = String(card.number || '').replace(/[^\d*]/g, '').slice(0, 19), exp = String(card.expire || '').replace(/\D/g, '').slice(0, 4);
  const has = await env.DB.prepare('SELECT COUNT(*) AS n FROM payme_cards WHERE user_id = ?1').bind(u.id).first();
  if (has && has.n >= 5) return json({ ok: false, error: 'limit' });
  await env.DB.prepare('INSERT INTO payme_cards (user_id, token, mask, exp, main, created) VALUES (?1, ?2, ?3, ?4, ?5, ?6) ON CONFLICT(token) DO NOTHING').bind(u.id, token, mask, exp, has && has.n ? 0 : 1, Date.now()).run();
  return json({ ok: true, cards: await list(env, u.id) });
}
