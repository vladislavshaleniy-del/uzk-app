// POST /api/hit — просмотр страницы для /stats (без cookies и без хранения IP).
// Вызывают сайт (каждая страница и переход между разделами) и приложение (открытие).
// Тело: { p: путь, r: document.referrer (только при первом открытии), l: язык браузера }.
// Страна и город — из данных Cloudflare (request.cf); браузер, система и устройство — из user-agent;
// откуда пришёл — по адресу предыдущей страницы или по встроенному браузеру (Telegram, Instagram…).
// Посетитель за день — необратимый хеш.
import { day, chan, device, query } from '../_lib/track.js';
const BOT = /bot|crawl|spider|slurp|preview|headless|lighthouse|pagespeed|monitor|curl|wget|python|axios/i;
const COLS = ['src TEXT', 'br TEXT', 'os TEXT', 'dev TEXT', 'lang TEXT', 't INTEGER', 'q TEXT', 'model TEXT', 'scr TEXT', 'region TEXT', 'isp TEXT'];

export async function onRequestPost({ request, env }) {
  const ok = new Response(null, { status: 204, headers: { 'cache-control': 'no-store' } });
  try {
    const db = env.DB; if (!db) return ok;
    const ua = request.headers.get('user-agent') || ''; if (!ua || BOT.test(ua)) return ok;
    const host = new URL(request.url).hostname;
    if (!/(^|\.)myuzcity\.uz$/i.test(host)) return ok;
    let b = {}; try { b = JSON.parse(await request.text() || '{}'); } catch (e) {}
    const h = /^app\./i.test(host) ? 'app' : 'site';
    const path = String(b.p || '/').replace(/[?#].*$/, '').slice(0, 120);
    const cf = request.cf || {}, now = Date.now(), d = day(now), ip = request.headers.get('cf-connecting-ip') || '';
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip + '|' + ua + '|' + d + '|myuzcity'));
    const v = [...new Uint8Array(buf)].slice(0, 8).map(x => x.toString(16).padStart(2, '0')).join('');
    const dv = device(ua);
    // источник: только для первого открытия (при переходах внутри сайта r не передаётся)
    let src = '', q = '';
    if ('r' in b) { q = query(String(b.r || '')); const c = chan(String(b.r || '')); src = c == null ? '' : (c === 'Прямой заход' && dv.app ? dv.app : c); }
    const lang = String(b.l || '').slice(0, 2).toLowerCase();
    // модель телефона: из подсказок браузера (Android Chrome) или из user-agent (старые Android); у iPhone модель не передаётся
    let model = String(b.m || '').trim().slice(0, 40);
    if (!model) { const m = ua.match(/Android [\d.]+; (?:[a-z]{2}-[a-z]{2}; )?([^;)]+?)(?: Build\/[^;)]*)?\)/i); if (m && m[1] !== 'K') model = m[1].trim().slice(0, 40); }
    if (!model && /iPhone/.test(ua)) model = 'iPhone'; else if (!model && /iPad/.test(ua)) model = 'iPad';
    const scr = /^\d{3,5}x\d{3,5}$/.test(String(b.s || '')) ? String(b.s) : '';
    const ins = () => db.prepare('INSERT INTO st_hits(d,host,country,city,path,v,src,br,os,dev,lang,t,q,model,scr,region,isp) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)')
      .bind(d, h, String(cf.country || '').slice(0, 2), String(cf.city || '').slice(0, 60), path, v, src.slice(0, 60), dv.br, dv.os, dv.dev, lang, now,
        q, model, scr, String(cf.region || '').slice(0, 60), String(cf.asOrganization || '').slice(0, 80)).run();
    await ins().catch(async () => {
      await db.batch([db.prepare('CREATE TABLE IF NOT EXISTS st_hits(d TEXT,host TEXT,country TEXT,city TEXT,path TEXT,v TEXT)'),
        db.prepare('CREATE INDEX IF NOT EXISTS st_hits_d ON st_hits(d)')]);
      for (const c of COLS) await db.prepare('ALTER TABLE st_hits ADD COLUMN ' + c).run().catch(() => {}); // новые столбцы к старой таблице
      await ins();
    });
  } catch (e) {}
  return ok;
}
