// City marketplace (residents' own listings): GET ?city=&cat=&q=&mine=1 → list; POST {title, price, cat, descr, photos[], phone, city} → create;
// POST {action: 'remove'|'sold'|'report', id}. New listings and complaints go to the admins' Telegram with a «Снять» button.
import { json, CORS, ready, ensureDb, readSession, sessionUser, notifyAdmins, fmtPhone } from '../../_lib/auth.js';
export const CATS = ['tech', 'home', 'clothes', 'kids', 'auto', 'realty', 'services', 'free', 'other'];
export const onRequestOptions = () => new Response(null, { headers: CORS });
export async function onRequestGet({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  await ensureDb(env);
  const q = new URL(request.url).searchParams, s = await readSession(env, request);
  const mine = q.get('mine') === '1' && s;
  const city = Number.isInteger(+q.get('city')) ? +q.get('city') : 0, cat = CATS.includes(q.get('cat')) ? q.get('cat') : null, text = (q.get('q') || '').trim().toLowerCase().slice(0, 60);
  let sql = "SELECT m.*, u.first_name, u.username FROM market m LEFT JOIN users u ON u.id = m.user_id WHERE ", args = [];
  if (mine) { sql += 'm.user_id = ?1 AND m.status != ?2'; args = [s.u, 'removed']; }
  else { sql += "m.city = ?1 AND m.status = 'active'"; args = [city]; if (cat) { sql += ' AND m.cat = ?2'; args.push(cat); } }
  sql += ' ORDER BY m.id DESC LIMIT 120';
  let rows = (await env.DB.prepare(sql).bind(...args).all()).results || [];
  if (text) rows = rows.filter(r => (r.title + ' ' + (r.descr || '')).toLowerCase().includes(text));
  return json({ ok: true, list: rows.map(r => ({ id: r.id, cat: r.cat, title: r.title, price: r.price, descr: r.descr, photos: r.photos, status: r.status, created: r.created, seller: r.first_name || '', tg: r.username || '', own: !!(s && s.u === r.user_id), city: r.city })) });
}
export async function onRequestPost({ request, env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  const u = await sessionUser(env, request); if (!u) return json({ ok: false, error: 'unauthorized' }, 401);
  let b; try { b = await request.json(); } catch { return json({ ok: false }, 400); }
  const now = Math.floor(Date.now() / 1000), origin = new URL(request.url).origin;
  if (b.action) {
    const ad = await env.DB.prepare('SELECT * FROM market WHERE id = ?1').bind(+b.id).first(); if (!ad) return json({ ok: false, error: 'not found' }, 404);
    if (b.action === 'report') { await notifyAdmins(env, 'sendMessage', { text: `⚠️ Жалоба на объявление №${ad.id}: «${ad.title}»\n${(b.reason || '').slice(0, 300)}`, reply_markup: { inline_keyboard: [[{ text: '🗑 Снять объявление', callback_data: `md:${ad.id}:del` }]] } }); return json({ ok: true }); }
    if (ad.user_id !== u.id) return json({ ok: false, error: 'forbidden' }, 403);
    await env.DB.prepare('UPDATE market SET status = ?1 WHERE id = ?2').bind(b.action === 'sold' ? 'sold' : 'removed', ad.id).run();
    return json({ ok: true });
  }
  const title = String(b.title || '').trim().slice(0, 70), descr = String(b.descr || '').trim().slice(0, 1500);
  const price = Math.max(0, Math.min(1e12, Math.round(+b.price || 0))), cat = CATS.includes(b.cat) ? b.cat : 'other';
  if (title.length < 3) return json({ ok: false, error: 'title' }, 400);
  const day = await env.DB.prepare('SELECT COUNT(*) AS n FROM market WHERE user_id = ?1 AND created > ?2').bind(u.id, now - 86400).first();
  if (day && day.n >= 10) return json({ ok: false, error: 'limit' }, 429);
  const photos = (Array.isArray(b.photos) ? b.photos : []).slice(0, 4).map(p => typeof p === 'string' && p.match(/^data:image\/jpeg;base64,([A-Za-z0-9+/=]+)$/)).filter(m => m && m[1].length < 600000);
  const r = await env.DB.prepare("INSERT INTO market (user_id, city, cat, title, price, descr, photos, phone, status, created) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, 'active', ?9) RETURNING id")
    .bind(u.id, Number.isInteger(b.city) ? b.city : 0, cat, title, price, descr, photos.length, b.phone ? 1 : 0, now).first();
  for (let i = 0; i < photos.length; i++) await env.DB.prepare('INSERT INTO market_photos (ad_id, idx, data) VALUES (?1, ?2, ?3)').bind(r.id, i, Uint8Array.from(atob(photos[i][1]), c => c.charCodeAt(0))).run();
  const cap = `🛍 Новое объявление №${r.id}: ${title}\n${price ? price.toLocaleString('ru-RU') + ' сум' : 'Цена договорная'}\n${descr.slice(0, 300)}\n👤 ${u.first_name || ''} ${fmtPhone(u.phone)}`;
  const kb = { inline_keyboard: [[{ text: '🗑 Снять объявление', callback_data: `md:${r.id}:del` }]] };
  if (photos.length) await notifyAdmins(env, 'sendPhoto', { photo: `${origin}/api/market/photo?id=${r.id}&i=0`, caption: cap.slice(0, 1000), reply_markup: kb });
  else await notifyAdmins(env, 'sendMessage', { text: cap, reply_markup: kb });
  return json({ ok: true, id: r.id });
}
