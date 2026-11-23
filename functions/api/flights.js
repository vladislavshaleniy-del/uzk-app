// Live flight board of Uzbekistan's airports (source: the public online board of JSC "Uzbekistan Airports").
// GET /api/flights?ap=TAS&dir=dep|arr&lang=ru|uz|en → { ok, rows: [{ t, e, d, c, i, f, a, tm, ck, g, s, st }] }, cached 2 minutes.
import { json, CORS } from '../_lib/auth.js';
const AP = new Set(['TAS', 'SKD', 'BHK', 'UGC', 'NMA', 'FEG', 'AZN', 'KSQ', 'TMJ', 'NCU', 'NVI', 'OMN', 'OQN']);
const UA = 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36';
const LIMIT = 900000;   // the page repeats big detail blocks per flight: the first ~100 flights are enough
const ent = s => s.replace(/&#0?39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));
const clean = s => ent(String(s || '')).replace(/\s+/g, ' ').trim();
function stCode(s) {
  s = s.toLowerCase();
  if (/bekor|отмен|cancel/.test(s)) return 'cx';
  if (/kechik|задерж|delay/.test(s)) return 'dl';
  if (/uchib|вылет|depart|airborne/.test(s)) return 'dp';
  if (/yetib|qo.?ndi|прибы|приземл|land|arriv/.test(s)) return 'ld';
  if (/kutil|ожида|expect/.test(s)) return 'ex';
  if (/chiqish|посадк|board/.test(s)) return 'bd';
  if (/ro.?yxat|регистр|check/.test(s)) return 'ci';
  if (/jadval|распис|schedul|on time/.test(s)) return 'sc';
  return 'ot';
}
export const onRequestOptions = () => new Response(null, { headers: CORS });
export async function onRequestGet({ request, waitUntil }) {
  const u = new URL(request.url);
  const ap = AP.has(u.searchParams.get('ap')) ? u.searchParams.get('ap') : 'TAS';
  const dir = u.searchParams.get('dir') === 'arr' ? 'arrival' : 'departure';
  const lg = ['ru', 'uz', 'en'].includes(u.searchParams.get('lang')) ? u.searchParams.get('lang') : 'ru';
  const key = new Request(`https://cache.myuzcity.local/flights/${ap}/${dir}/${lg}`);
  const cache = caches.default;
  const hit = u.searchParams.get('debug') ? null : await cache.match(key);
  if (hit) return new Response(hit.body, { headers: { 'content-type': 'application/json; charset=utf-8', ...CORS } });
  let cookie = '';
  if (lg !== 'uz') {
    try {
      const r0 = await fetch(`https://uzairports.com/language/${lg}`, { redirect: 'manual', headers: { 'user-agent': UA } });
      const sc = typeof r0.headers.getSetCookie === 'function' ? r0.headers.getSetCookie() : [r0.headers.get('set-cookie')];
      cookie = sc.filter(Boolean).map(x => x.split(';')[0]).join('; ');
    } catch (e) { /* the board in Uzbek is fine too */ }
  }
  let r;
  try { r = await fetch(`https://uzairports.com/flights/${dir}?airport=${ap}`, { headers: { 'user-agent': UA, 'accept-language': lg, ...(cookie ? { cookie } : {}) } }); }
  catch (e) { return json({ ok: false, error: 'source unavailable' }, 502); }
  if (!r.ok || !r.body) return json({ ok: false, error: 'source ' + r.status }, 502);
  if (u.searchParams.get('debug') === '1') return json({ url: r.url, redirected: r.redirected, status: r.status, cookie: cookie ? cookie.split('; ').map(c => c.split('=')[0]) : [] });
  const rows = []; let cur = null;
  const add = k => ({ text(t) { if (cur) cur[k] = (cur[k] || '') + t.text; } });
  const rw = new HTMLRewriter()
    .on('div.flight-detail', { element() { cur = {}; rows.push(cur); } })
    .on('div.flight-detail div.flight-status span', add('s'))
    .on('div.flight-detail span.color-custom-1', add('t'))
    .on('div.flight-detail span.estimated-time', add('e'))
    .on('div.flight-detail div.flight-name', add('c'))
    .on('div.flight-detail div.flight-name span', add('i'))
    .on('div.flight-detail a.highlight', add('f'))
    .on('div.flight-detail span.desc', add('a'))
    .on('div.flight-detail div.terminal span', add('tm'))
    .on('div.flight-detail p.check-in span', add('ck'))
    .on('div.flight-detail p.gate span', add('g'));
  let n = 0;
  const cut = new TransformStream({ transform(chunk, ctl) { n += chunk.byteLength; ctl.enqueue(chunk); if (n >= LIMIT) ctl.terminate(); } });
  try { await rw.transform(new Response(r.body.pipeThrough(cut))).arrayBuffer(); } catch (e) { /* stream cut on purpose */ }
  // the board runs from "now" through the next day: a big drop in time means the next date
  let day = 0, last = -1;
  const out = [];
  for (const x of rows) {
    const t = clean(x.t).slice(0, 5); if (!/^\d\d:\d\d$/.test(t)) continue;
    const m = +t.slice(0, 2) * 60 + +t.slice(3);
    if (last >= 0 && m < last - 360) day++;
    if (m > last || last - m > 360) last = m;
    const iata = clean(x.i); const city = clean(x.c).replace(new RegExp(iata + '$'), '').trim();
    const s = clean(x.s);
    out.push({ t, e: clean(x.e).slice(0, 5), d: day, c: city, i: iata, f: clean(x.f), a: clean(x.a), tm: clean(x.tm), ck: clean(x.ck), g: clean(x.g), s, st: stCode(s) });
  }
  const body = JSON.stringify({ ok: true, ap, dir: dir === 'arrival' ? 'arr' : 'dep', at: Date.now(), rows: out });
  waitUntil(cache.put(key, new Response(body, { headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=120' } })));
  return new Response(body, { headers: { 'content-type': 'application/json; charset=utf-8', ...CORS } });
}
