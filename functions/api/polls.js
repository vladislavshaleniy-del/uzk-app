// City and mahalla polls with real voting: one vote per signed-in user (the vote can be changed).
import { json, CORS, ready, ensureDb, readSession } from '../_lib/auth.js';
const SEED = [
  ['city', 'Что в вашем районе нужно улучшить в первую очередь?', ['Дороги и тротуары', 'Освещение', 'Парки и детские площадки', 'Парковки', 'Чистота и вывоз мусора']],
  ['city', 'Нужны ли в Ташкенте выделенные полосы для автобусов?', ['Да, нужны', 'Нет', 'Затрудняюсь ответить']],
  ['city', 'Как вы оцениваете общественный транспорт в городе?', ['Отлично', 'Хорошо', 'Удовлетворительно', 'Плохо']],
  ['mahalla', 'Нужен ли шлагбаум в нашей махалле?', ['За', 'Против']],
  ['mahalla', 'Выбор цвета для фасада гузара', ['Бежевый', 'Светло-жёлтый', 'Белый']],
];
async function seed(env) {
  const c = await env.DB.prepare('SELECT COUNT(*) AS n FROM polls').first();
  if (c && c.n) return;
  const now = Math.floor(Date.now() / 1000);
  for (const [scope, q, o] of SEED) await env.DB.prepare('INSERT INTO polls (scope, city, q, options, created, ends) VALUES (?1, 0, ?2, ?3, ?4, ?5)').bind(scope, q, JSON.stringify(o), now, now + 30 * 86400).run();
}
async function list(env, scope, uid) {
  const polls = ((await env.DB.prepare('SELECT * FROM polls WHERE scope = ?1 ORDER BY id LIMIT 30').bind(scope).all()).results) || [];
  const out = [];
  for (const p of polls) {
    const counts = ((await env.DB.prepare('SELECT opt, COUNT(*) AS n FROM votes WHERE poll_id = ?1 GROUP BY opt').bind(p.id).all()).results) || [];
    const opts = JSON.parse(p.options), c = opts.map((_, i) => (counts.find(x => x.opt === i) || {}).n || 0);
    const mine = uid ? await env.DB.prepare('SELECT opt FROM votes WHERE poll_id = ?1 AND user_id = ?2').bind(p.id, uid).first() : null;
    out.push({ id: p.id, q: p.q, options: opts, counts: c, total: c.reduce((a, b) => a + b, 0), ends: p.ends, mine: mine ? mine.opt : null });
  }
  return out;
}
export const onRequestOptions = () => new Response(null, { headers: CORS });
export async function onRequestGet({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  await ensureDb(env); await seed(env);
  const scope = new URL(request.url).searchParams.get('scope') === 'mahalla' ? 'mahalla' : 'city';
  const s = await readSession(env, request);
  return json({ ok: true, polls: await list(env, scope, s ? s.u : null) });
}
export async function onRequestPost({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  const s = await readSession(env, request); if (!s) return json({ ok: false, error: 'unauthorized' }, 401);
  await ensureDb(env);
  let b; try { b = await request.json(); } catch { return json({ ok: false }, 400); }
  const p = await env.DB.prepare('SELECT * FROM polls WHERE id = ?1').bind(+b.id).first();
  if (!p) return json({ ok: false, error: 'no poll' }, 404);
  const opts = JSON.parse(p.options); const opt = +b.opt;
  if (!(opt >= 0 && opt < opts.length)) return json({ ok: false, error: 'bad option' }, 400);
  if (p.ends && p.ends < Date.now() / 1000) return json({ ok: false, error: 'closed' }, 400);
  await env.DB.prepare('INSERT INTO votes (poll_id, user_id, opt, ts) VALUES (?1, ?2, ?3, ?4) ON CONFLICT(poll_id, user_id) DO UPDATE SET opt = excluded.opt, ts = excluded.ts').bind(p.id, s.u, opt, Math.floor(Date.now() / 1000)).run();
  return json({ ok: true, polls: await list(env, p.scope, s.u) });
}
