// Refreshes the app's live data (run by .github/workflows/update-data.yml).
//   data/rates.json         — Central Bank exchange rates (every run)
//   data/news.json          — city news + Tashkent afisha from public RSS feeds (every run)
//   data/places/<city>.json — cafes & restaurants from OpenStreetMap (weekly, or FORCE_PLACES=1)
//   data/transit/0.json — Tashkent metro lines/stations and bus, trolleybus, minibus stops with routes (weekly)
//   data/poi/<kind>/<city>.json — parking, mosques, medicine, new buildings, EV chargers, speed cameras, schools, public offices, sights (OpenStreetMap, weekly)
// City list, names and coordinates come from CITIES in flows.js (index = city id in the app).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';

const ROOT = new URL('..', import.meta.url).pathname;
// the workflow step is stopped after 16 minutes: new OpenStreetMap requests are not started after 12, so the run always ends normally
// (busy public Overpass servers used to keep one request waiting for up to 8 minutes and push the run past the limit)
const DEADLINE = Date.now() + 12 * 60e3;
const timeLeft = () => DEADLINE - Date.now();
const UA = 'Mozilla/5.0 (compatible; DigitalUzbekistanBot/1.0; +https://vladislavshaleniy-del.github.io/uzk-app/)';

const flows = readFileSync(ROOT + 'flows.js', 'utf8');
const ci = flows.indexOf('const CITIES = [');
const CITIES = new Function('return ' + flows.slice(ci + 'const CITIES = '.length, flows.indexOf('];', ci) + 1))();

async function get(url, ms = 15000) {
  const ctl = new AbortController(); const tm = setTimeout(() => ctl.abort(), ms);
  try {
    const r = await fetch(url, { headers: { 'user-agent': UA, 'accept-language': 'ru' }, signal: ctl.signal, redirect: 'follow' });
    if (!r.ok) throw new Error(r.status + ' ' + url);
    return await r.text();
  } finally { clearTimeout(tm); }
}
const decode = s => s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, ' ').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16))).replace(/&([a-z]+);/gi, (m, k) => ENT[k.toLowerCase()] ?? m);
const ENT = { laquo: '«', raquo: '»', mdash: '—', ndash: '–', hellip: '…', lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”', bdquo: '„', shy: '', times: '×', copy: '©', deg: '°', euro: '€', minus: '−', middot: '·', bull: '•', laquo2: '«' };
const strip = s => decode(decode(s || '')).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const tag = (it, t) => { const m = it.match(new RegExp(`<${t}[^>]*>([\\s\\S]*?)</${t}>`)); return m ? m[1] : ''; };

// ---------------------------------------------------------------- news
const FEEDS = [
  { id: 'afisha', name: 'Afisha.uz', url: 'https://www.afisha.uz/ru/rss', tashkentOnly: true },
  { id: 'gazeta', name: 'Gazeta.uz', url: 'https://www.gazeta.uz/ru/rss/' },
  { id: 'kun', name: 'Kun.uz', url: 'https://kun.uz/ru/news/rss' },
  { id: 'podrobno', name: 'Podrobno.uz', url: 'https://podrobno.uz/rss/' },
  // на узбекском (латиница) — для приложения и сайта на узбекском языке; кириллические заголовки отбрасываются
  { id: 'kun_uz', name: 'Kun.uz', url: 'https://kun.uz/news/rss', lang: 'uz' },
  { id: 'gazeta_uz', name: 'Gazeta.uz', url: 'https://www.gazeta.uz/oz/rss/', lang: 'uz' },
  { id: 'daryo', name: 'Daryo.uz', url: 'https://daryo.uz/feed/', lang: 'uz' },
];
// новости кино, сериалов и игр со всего мира — не про город, в ленту не берём
const OFFTOPIC = /(трейлер|тизер|сериал|\bсезон|кинопрем|кассов|бокс-офис|box office|GTA|видеоигр|игровой индустр|Marvel|Мстител|Netflix|Голливуд|Оскар|Disney|treyler|serial|o'yin industr)/i;
const LATIN = s => { const c = (s.match(/[А-Яа-яЁёЎўҚқҒғҲҳ]/g) || []).length, l = (s.match(/[A-Za-z]/g) || []).length; return l > c * 3; };
// afisha.uz URL section -> tag shown on the card
const AFISHA_TAG = { cinema: 'cinema', gorod: 'city', shops: 'sale', food: 'food', restaurants: 'food', fashion: 'fashion', concerts: 'concert', music: 'concert', theatre: 'theatre', kids: 'kids', art: 'art', sport: 'sport', travel: 'travel' };

function cityRe(i) {
  const ru = CITIES[i][0];
  const stem = ru.length > 4 ? ru.replace(/[аяйьы]$/, '') : ru;
  return new RegExp(`(?<![А-Яа-яЁё])${stem}` + (i === 0 ? '|(?<![А-Яа-яЁё])столиц' : ''));
}

async function readFeed(f) {
  const xml = await get(f.url);
  return xml.split(/<item[\s>]/).slice(1).map(it => {
    const link = strip(tag(it, 'link')) || strip(tag(it, 'guid'));
    const enc = (it.match(/<enclosure[^>]*url="([^"]+)"/) || it.match(/<media:content[^>]*url="([^"]+)"/) || [])[1] || '';
    const desc = strip(tag(it, 'description')) || strip(tag(it, 'content:encoded'));
    const d = new Date(strip(tag(it, 'pubDate')));
    const sec = f.id === 'afisha' ? (link.match(/afisha\.uz\/(?:ru\/)?([a-z]+)\//) || [])[1] : '';
    return { t: strip(tag(it, 'title')), u: link, i: enc ? decode(enc) : '', x: desc.slice(0, 260), d: isNaN(d) ? null : d.toISOString(), s: f.name, src: f.id, k: AFISHA_TAG[sec] || (f.id === 'afisha' ? 'city' : 'news') };
  }).filter(n => n.t && n.u && n.d);
}

async function ogImage(url) {
  try {
    const h = await get(url, 10000);
    const m = h.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)/i) || h.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image/i);
    return m ? decode(m[1]) : '';
  } catch { return ''; }
}

// Аварии, гибель людей, криминал и суды на сайт и в приложение «умного города» не берём:
// это лента о жизни города, а не криминальная хроника.
export const GLOOM = /(погиб|гибел|смерт|скончал|умер(?:ла|ли)?\b|убий|убит|труп|тело\s|ДТП|авари|катастроф|столкнов|сбил[аио]?\b|задерж|арест|наркот|наркос|мошенн|краж|украл|похищ|изнасил|насили|суицид|самоубий|взрыв|теракт|стрельб|ножев|избил|ранен|пострадав|преступ|криминал|уголовн|приговор|осужд|колони|тюрьм|взятк|коррупц|онколог|тяжело заболел|halok|vafot|o'ldi|o‘ldi|avariya|YTH|hibs|giyohvand|firibgar|o'g'ri|jinoyat|qamoq|pora|tushib ket|yiqil|jarohat|yong[''‘’ʻ`]?in|\bo[''‘’ʻ`]?lim\b|\bo[''‘’ʻ`]?ldir|qotil|o[''‘’ʻ`]?g[''‘’ʻ`]?irla|zo[''‘’ʻ`]?rla|portla|otishma|qurbon|bedarak|g[''‘’ʻ`]?oyib|joniga qasd|onkolog|saraton|sud qaror|killed|death|dead\b|crash|arrest|drug|murder|fraud|police)/i;

async function news() {
  const all = [];
  for (const f of FEEDS) {
    try { const items = (await readFeed(f)).filter(n => !f.lang || LATIN(n.t)); items.forEach(n => { n.tashkentOnly = !!f.tashkentOnly; n.lang = f.lang || 'ru'; }); all.push(...items); console.log(`news ${f.id}: ${items.length}`); }
    catch (e) { console.log(`news ${f.id} failed: ${e.message}`); }
  }
  const seen = new Set(); const fresh = all.filter(n => !seen.has(n.u) && seen.add(n.u) && !GLOOM.test(n.t + ' ' + n.x) && n.k !== 'cinema' && !OFFTOPIC.test(n.t)).sort((a, b) => b.d.localeCompare(a.d));
  const items = fresh.filter(n => n.lang !== 'uz'), uzItems = fresh.filter(n => n.lang === 'uz');
  const out = { updated: new Date().toISOString(), cities: {}, all: [] };
  const pick = new Set();
  CITIES.forEach((_, i) => {
    const re = cityRe(i);
    const list = items.filter(n => (i === 0 && n.tashkentOnly) || (!n.tashkentOnly && re.test(n.t + ' ' + n.x)));
    // Tashkent: keep a mix — afisha (city life & events) first, then city news
    const top = i === 0 ? [...list.filter(n => n.tashkentOnly).slice(0, 12), ...list.filter(n => !n.tashkentOnly).slice(0, 8)].sort((a, b) => b.d.localeCompare(a.d)) : list.slice(0, 12);
    if (top.length) { out.cities[i] = top; top.forEach(n => pick.add(n)); }
  });
  out.all = items.filter(n => !n.tashkentOnly).slice(0, 15); out.all.forEach(n => pick.add(n));
  // на узбекском: города по узбекским названиям (Toshkent, Samarqand…), для Ташкента ещё «poytaxt»
  if (uzItems.length) {
    out.uz = { cities: {}, all: uzItems.slice(0, 15) };
    CITIES.forEach((c, i) => {
      const name = String(c[1] || '').replace(/[‘’ʻ`']/g, "['‘’ʻ`]");
      const re = new RegExp(`(?<![A-Za-z])${name}` + (i === 0 ? '|(?<![A-Za-z])poytaxt' : ''), 'i');
      const list = uzItems.filter(n => re.test(n.t + ' ' + n.x)).slice(0, 12);
      if (list.length) { out.uz.cities[i] = list; list.forEach(n => pick.add(n)); }
    });
    out.uz.all.forEach(n => pick.add(n));
  }
  const need = [...pick].filter(n => !n.i);
  for (let k = 0; k < need.length; k += 5) await Promise.all(need.slice(k, k + 5).map(async n => { n.i = await ogImage(n.u); }));
  const clean = n => ({ t: n.t, u: n.u, i: n.i, x: n.x, d: n.d, s: n.s, k: n.k });
  for (const c in out.cities) out.cities[c] = out.cities[c].map(clean);
  out.all = out.all.map(clean);
  if (out.uz) { for (const c in out.uz.cities) out.uz.cities[c] = out.uz.cities[c].map(clean); out.uz.all = out.uz.all.map(clean); }
  mkdirSync(ROOT + 'data', { recursive: true });
  const file = ROOT + 'data/news.json';
  const prev = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : null;
  if (prev && JSON.stringify({ ...prev, updated: 0 }) === JSON.stringify({ ...out, updated: 0 })) { console.log('news unchanged'); return; }
  writeFileSync(file, JSON.stringify(out));
  console.log(`news: ${Object.keys(out.cities).length} cities, tashkent ${(out.cities[0] || []).length}`);
}

// ---------------------------------------------------------------- places (OpenStreetMap)
const OVERPASS = ['https://overpass-api.de/api/interpreter', 'https://maps.mail.ru/osm/tools/overpass/api/interpreter', 'https://overpass.private.coffee/api/interpreter', 'https://overpass.kumi.systems/api/interpreter'];
// bounding box "s,w,n,e" around a point (bbox queries are much lighter for Overpass than around:)
// the same area as 4 smaller boxes — big cities are fetched piece by piece so the public servers don't time out
const bb4 = (r, la, lo) => { const dl = r / 111320, dn = r / (111320 * Math.cos(la * Math.PI / 180)); const f = v => v.toFixed(4);
  return [[la - dl, lo - dn, la, lo], [la - dl, lo, la, lo + dn], [la, lo - dn, la + dl, lo], [la, lo, la + dl, lo + dn]].map(b => b.map(f).join(',')); };
const bb = (r, la, lo) => { const dl = r / 111320, dn = r / (111320 * Math.cos(la * Math.PI / 180)); return [la - dl, lo - dn, la + dl, lo + dn].map(v => v.toFixed(4)).join(','); };
const has = (s, re) => re.test(s || '');
function cats(t) {
  const name = [t.name, t['name:ru'], t['name:uz'], t['name:en']].join(' ');
  const cu = (t.cuisine || '').toLowerCase();
  const c = [];
  if (has(cu, /plov|pilaf|pilav/) || has(name, /плов|plov|osh markaz|беш.?коз|besh.?qozon|ош маркази|oshxona|ошхона/i)) c.push('plov');
  if (t.amenity === 'hookah_lounge' || t.shisha === 'yes' || t.hookah === 'yes' || has(name, /кальян|hookah|shisha|lounge|лаунж/i)) c.push('hookah');
  if (has(cu, /uzbek|central_asian|uyghur|uighur|tajik|kazakh|regional|national/) || has(name, /чайхан|choyxona|национал|milliy/i)) c.push('national');
  if (t.amenity === 'cafe' && (has(cu, /coffee/) || has(name, /coffee|кофе|kofe|espresso/i))) c.push('coffee');
  if (has(cu, /kebab|shashlik|shashlyk|barbecue|grill|steak/) || has(name, /шашлык|shashlik|кебаб|kebab|гриль|grill|steak|стейк/i)) c.push('grill');
  if (t.amenity === 'fast_food' || has(cu, /burger|pizza|chicken|sandwich|hot_dog|shawarma|doner/)) c.push('fast');
  if (has(cu, /italian|european|french|georgian|pizza|mediterranean|international|russian|turkish|american/) || has(name, /pizza|пицц|trattoria/i)) c.push('europe');
  if (has(cu, /japanese|sushi|korean|chinese|asian|thai|vietnamese|indian|pan_asian|ramen|noodle/) || has(name, /sushi|суши|wok|вок|ramen|рамен|корейск|china/i)) c.push('asia');
  if (t.amenity === 'bar' || t.amenity === 'pub' || has(name, /\bbar\b|бар\b|pub|паб/i)) c.push('bar');
  if (t.outdoor_seating === 'yes' || has(name, /террас|terrace|rooftop|руфтоп/i)) c.push('terrace');
  if (t.amenity === 'cafe' && !c.length) c.push('cafe');
  return c;
}
function place(e, ci) {
  const t = e.tags || {};
  const lat = e.lat ?? e.center?.lat, lon = e.lon ?? e.center?.lon;
  const name = t['name:ru'] || t.name;
  if (!name || lat == null) return null;
  const street = t['addr:street'] ? t['addr:street'] + (t['addr:housenumber'] ? ', ' + t['addr:housenumber'] : '') : (t['addr:full'] || '');
  const ig = (t['contact:instagram'] || t.instagram || '').replace(/^https?:\/\/(www\.)?instagram\.com\//, '').replace(/[/?].*$/, '').replace(/^@/, '');
  let im = t.image && /^https:\/\/upload\.wikimedia\.org\//.test(t.image) ? t.image : '';
  const wc = t.wikimedia_commons && /^File:/.test(t.wikimedia_commons) ? t.wikimedia_commons : '';
  const p = { id: e.type[0] + e.id, n: name, la: +lat.toFixed(6), lo: +lon.toFixed(6), a: t.amenity, c: cats(t) };
  if (t.name && t.name !== name) p.n2 = t.name;
  if (t.cuisine) p.cu = t.cuisine.split(';').slice(0, 4).join(';');
  if (street) p.ad = street;
  const ph = t.phone || t['contact:phone']; if (ph) p.ph = ph.split(';')[0].trim();
  if (t.opening_hours) p.h = t.opening_hours;
  const w = t.website || t['contact:website']; if (w) p.w = w;
  if (ig) p.ig = ig;
  const tg = t['contact:telegram']; if (tg) p.tg = tg.replace(/^https?:\/\/t\.me\//, '').replace(/^@/, '');
  if (im) p.im = im; else if (wc) p.wc = wc;
  if (t.delivery === 'yes') p.dl = 1;
  if (t['diet:halal'] === 'yes' || t['diet:halal'] === 'only') p.hl = 1;
  return p;
}
async function overpass(q) {
  for (const base of OVERPASS) {
    if (timeLeft() < 20e3) throw new Error('time budget used');
    const ctl = new AbortController(); const tm = setTimeout(() => ctl.abort(), Math.min(90e3, timeLeft()));
    try {
      const r = await fetch(base, { method: 'POST', signal: ctl.signal, headers: { 'user-agent': 'MyUzCity-data/1.0 (+https://github.com/vladislavshaleniy-del/uzk-app)', accept: '*/*', 'content-type': 'application/x-www-form-urlencoded' }, body: 'data=' + encodeURIComponent(q) });
      if (r.ok) return await r.json();
      console.log(`overpass ${base}: ${r.status}`);
    } catch (e) { console.log(`overpass ${base}: ${e.message}`); }
    finally { clearTimeout(tm); }
    await new Promise(r => setTimeout(r, 1500));
  }
  throw new Error('all overpass servers failed');
}
// ---------------------------------------------------------------- city maps: parking, mosques, medicine (OpenStreetMap)
const yes = v => v === 'yes' || v === 'only';
const addr = t => t['addr:street'] ? t['addr:street'] + (t['addr:housenumber'] ? ', ' + t['addr:housenumber'] : '') : (t['addr:full'] || '');
function base(e) {
  const t = e.tags || {}; const lat = e.lat ?? e.center?.lat, lon = e.lon ?? e.center?.lon;
  if (lat == null) return null;
  const p = { id: e.type[0] + e.id, la: +lat.toFixed(6), lo: +lon.toFixed(6) };
  const n = t['name:ru'] || t.name; if (n) p.n = n; if (t.name && t.name !== n) p.n2 = t.name;
  const a = addr(t); if (a) p.ad = a;
  const ph = t.phone || t['contact:phone']; if (ph) p.ph = ph.split(';')[0].trim();
  if (t.opening_hours) p.h = t.opening_hours;
  const w = t.website || t['contact:website']; if (w) p.w = w;
  return p;
}
// гостиницы: Telegram/WhatsApp из тегов или с сайта гостиницы, фото — картинка-обложка сайта (og:image)
const hoTg = v => { const m = String(v).trim().match(/^(?:https?:\/\/)?(?:t(?:elegram)?\.me\/)?@?([A-Za-z][A-Za-z0-9_]{3,31})\/?$/); return m && !/^(share|joinchat|addstickers|proxy|s|c|iv)$/i.test(m[1]) ? m[1] : ''; };
const hoWa = v => { const d = String(v).replace(/\D/g, ''); return d.length >= 11 && d.length <= 15 ? d : ''; };
async function hoEnrich(list, prev) {
  const old = new Map((prev || []).map(p => [p.id, p]));
  for (const p of list) { const o = old.get(p.id); if (o) for (const k of ['og', 'tg', 'wa', 'ig', 'ph']) if (o[k] && !p[k]) p[k] = o[k]; }
  const todo = list.filter(p => p.w && /^https?:\/\/|^www\./i.test(p.w)).slice(0, 220);
  let i = 0, got = 0;
  const one = async p => {
    const url = /^https?:/i.test(p.w) ? p.w : 'https://' + p.w;
    let html; try { html = await get(url, 9000); } catch { return; }
    html = html.slice(0, 600000);
    const meta = (prop) => { const m = html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${prop}["'][^>]*content=["']([^"']+)["']`, 'i')) || html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]*(?:property|name)=["']${prop}["']`, 'i')); return m ? decode(m[1]).trim() : ''; };
    let og = meta('og:image') || meta('twitter:image');
    if (og) { try { og = new URL(og, url).href; } catch { og = ''; } }
    if (og && /^https:\/\//.test(og) && !/\.svg(\?|$)|logo|favicon|icon/i.test(og)) { p.og = og; got++; }
    if (!p.tg) { const m = html.match(/https?:\/\/(?:t|telegram)\.me\/([A-Za-z][A-Za-z0-9_]{3,31})(?=["'\/?#\s<])/); const tg = m && hoTg(m[1]); if (tg) p.tg = tg; }
    if (!p.wa) { const m = html.match(/(?:wa\.me\/|api\.whatsapp\.com\/send\/?\?phone=|whatsapp:\/\/send\?phone=)\+?(\d{11,15})/); const wa = m && hoWa(m[1]); if (wa) p.wa = wa; }
    if (!p.ig) { const m = html.match(/instagram\.com\/([A-Za-z0-9_.]{2,30})(?=["'\/?#\s<])/); if (m && !/^(p|reel|explore|accounts|stories)$/i.test(m[1])) p.ig = m[1]; }
    if (!p.ph) { const m = html.match(/href=["']tel:([+\d][\d\s()-]{8,20})["']/); if (m) p.ph = m[1].trim(); }
  };
  const workers = Array.from({ length: 6 }, async () => { while (i < todo.length) { const p = todo[i++]; await one(p).catch(() => {}); } });
  await Promise.all(workers);
  console.log(`hotels: ${todo.length} sites checked, ${got} photos, tg ${list.filter(p => p.tg).length}, wa ${list.filter(p => p.wa).length}`);
}
const POI = {
  parking: {
    r: [12000, 6000],
    q: b => `nw["amenity"="parking"]["access"!~"^(private|no|permit|employees)$"](${b});`,
    map(e) {
      const t = e.tags || {}; const p = base(e); if (!p) return null;
      const k = { 'multi-storey': 'm', underground: 'u', rooftop: 'm', street_side: 's', lane: 's', on_street: 's' }[t.parking] || 'g';
      p.k = k;
      if (yes(t.fee)) p.f = 1; else if (t.fee === 'no') p.f = 0;
      const c = parseInt(t.capacity, 10); if (c > 0 && c < 20000) p.c = c;
      if (t.operator) p.op = t.operator;
      if (t.access === 'customers') p.cu = 1;
      if (/^(yes|designated|\d+)$/.test(t['capacity:disabled'] || '')) p.ds = 1;
      // skip anonymous tiny surface lots: no name, no fee info, no capacity
      if (!p.n && p.f == null && !p.c && k === 'g' && e.type === 'n') return null;
      return p;
    },
  },
  mosque: {
    r: [16000, 8000],
    q: b => `nwr["amenity"="place_of_worship"]["religion"="muslim"](${b});`,
    map(e) {
      const t = e.tags || {}; const p = base(e); if (!p) return null;
      if (t.historic || t.heritage || t['heritage:operator'] || t.wikipedia || t.wikidata && t.tourism) p.hi = 1;
      if (t.image && /^https:\/\/upload\.wikimedia\.org\//.test(t.image)) p.im = t.image;
      else if (t.wikimedia_commons && /^File:/.test(t.wikimedia_commons)) p.wc = t.wikimedia_commons;
      if (t.wikipedia) p.wp = t.wikipedia;
      if (yes(t['female'])) p.fe = 1;
      return p;
    },
  },
  med: {
    r: [16000, 8000],
    q: b => `nw["amenity"~"^(hospital|clinic|doctors|dentist|pharmacy)$"](${b});nw["healthcare"="laboratory"](${b});`,
    map(e) {
      const t = e.tags || {}; const p = base(e); if (!p) return null;
      const hc = t.healthcare || '';
      p.a = t.amenity === 'pharmacy' || hc === 'pharmacy' ? 'pharmacy' : t.amenity === 'hospital' || hc === 'hospital' ? 'hospital'
        : t.amenity === 'dentist' || hc === 'dentist' ? 'dentist' : hc === 'laboratory' || hc === 'blood_donation' ? 'lab' : 'clinic';
      if (!p.n && p.a !== 'pharmacy') return null;
      if (yes(t.emergency)) p.em = 1;
      const sp = t['healthcare:speciality']; if (sp) p.sp = sp.split(';').slice(0, 4).join(';');
      if (yes(t.dispensing)) p.ds = 1;
      return p;
    },
  },
  ev: {
    r: [16000, 10000],
    q: b => `nw["amenity"="charging_station"](${b});`,
    map(e) {
      const t = e.tags || {}; const p = base(e); if (!p) return null;
      const so = Object.keys(t).filter(k => /^socket:[a-z0-9_]+$/.test(k) && t[k] !== 'no').map(k => k.slice(7) + (/^\d+$/.test(t[k]) ? '×' + t[k] : ''));
      if (so.length) p.so = so.slice(0, 6).join(',');
      const c = parseInt(t.capacity, 10); if (c > 0 && c < 500) p.c = c;
      if (t.operator || t.brand || t.network) p.op = t.operator || t.brand || t.network;
      if (yes(t.fee)) p.f = 1; else if (t.fee === 'no') p.f = 0;
      const kw = t['socket:type2_combo:output'] || t['socket:chademo:output'] || t['charging_station:output'] || t.output; if (kw) p.kw = String(kw).slice(0, 20);
      return p;
    },
  },
  speedcam: {
    r: [16000, 10000],
    q: b => `node["highway"="speed_camera"](${b});node["enforcement"="maxspeed"](${b});`,
    map(e) {
      const t = e.tags || {}; const p = base(e); if (!p) return null;
      const ms = parseInt(t.maxspeed, 10); if (ms > 0 && ms < 200) p.ms = ms;
      if (t.direction) p.dir = String(t.direction).slice(0, 10);
      return p;
    },
  },
  edu: {
    r: [14000, 8000],
    q: b => `nw["amenity"="school"](${b});nw["amenity"="kindergarten"](${b});nw["amenity"="university"](${b});nw["amenity"="college"](${b});`,
    map(e) {
      const t = e.tags || {}; const p = base(e); if (!p || !p.n) return null;
      p.a = t.amenity;
      if (t['isced:level']) p.lv = String(t['isced:level']).slice(0, 10);
      if (t.operator) p.op = t.operator;
      if (t['operator:type'] === 'private' || t.fee === 'yes') p.pr = 1;
      return p;
    },
  },
  gov: {
    r: [14000, 8000],
    q: b => `nw["office"="government"](${b});nw["amenity"="townhall"](${b});`,
    map(e) {
      const t = e.tags || {}; const p = base(e); if (!p || !p.n) return null;
      const nm = [t.name, t['name:ru'], t['name:uz']].join(' ');
      p.a = /davlat xizmat|государственных услуг|госуслуг|ЦГУ|DXM|давлат хизмат/i.test(nm) ? 'cgu' : /hokim|хоким/i.test(nm) ? 'hokim' : /xalq qabul|народн.{0,4}при[её]мн|народная/i.test(nm) ? 'pq' : 'gov';
      return p;
    },
  },
  sight: {
    r: [16000, 9000],
    q: b => `nwr["tourism"~"^(attraction|museum|gallery|viewpoint|theme_park|zoo|artwork)$"]["name"](${b});nwr["historic"~"^(monument|memorial|castle|archaeological_site|building|mausoleum|fort|city_gate|ruins)$"]["name"](${b});`,
    map(e) {
      const t = e.tags || {}; const p = base(e); if (!p || !p.n) return null;
      p.a = t.tourism === 'museum' || t.tourism === 'gallery' ? 'museum' : t.tourism === 'viewpoint' ? 'view' : t.tourism === 'theme_park' || t.tourism === 'zoo' ? 'park' : t.historic ? 'hist' : t.tourism === 'artwork' ? 'art' : 'attr';
      if (t.tourism === 'artwork' && !t.wikipedia && !t.wikidata) return null;
      if (t.wikipedia) p.wp = t.wikipedia; if (t.wikidata) p.wd = t.wikidata;
      if (t.image && /^https:\/\/upload\.wikimedia\.org\//.test(t.image)) p.im = t.image;
      else if (t.wikimedia_commons && /^File:/.test(t.wikimedia_commons)) p.wc = t.wikimedia_commons;
      if (t.fee === 'no') p.f = 0; else if (yes(t.fee)) p.f = 1;
      return p;
    },
  },
  hotel: {
    r: [16000, 9000],
    q: b => `nwr["tourism"~"^(hotel|hostel|guest_house|apartment|motel)$"](${b});`,
    map(e) {
      const t = e.tags || {}; const p = base(e); if (!p || !p.n) return null;
      p.a = t.tourism === 'motel' ? 'hotel' : t.tourism;
      const st = parseInt(t.stars, 10); if (st > 0 && st <= 5) p.st = st;
      const tg = hoTg(t['contact:telegram'] || t.telegram || ''); if (tg) p.tg = tg;
      const wa = hoWa(t['contact:whatsapp'] || t.whatsapp || ''); if (wa) p.wa = wa;
      const ig = (t['contact:instagram'] || t.instagram || '').replace(/^https?:\/\/(www\.)?instagram\.com\//, '').replace(/[/?].*$/, '').replace(/^@/, ''); if (ig) p.ig = ig;
      const em = t.email || t['contact:email']; if (em) p.em = em.split(';')[0].trim();
      const rm = parseInt(t.rooms, 10); if (rm > 0 && rm < 3000) p.rm = rm;
      if (t.image && /^https:\/\/upload\.wikimedia\.org\//.test(t.image)) p.im = t.image;
      else if (t.wikimedia_commons && /^File:/.test(t.wikimedia_commons)) p.wc = t.wikimedia_commons;
      if (t.wikidata) p.wd = t.wikidata;
      return p;
    },
  },
  recycle: {
    r: [16000, 10000],
    q: b => `nw["amenity"="recycling"](${b});`,
    map(e) {
      const t = e.tags || {}; const p = base(e); if (!p) return null;
      const rt = ['plastic', 'paper', 'glass', 'metal', 'batteries', 'clothes'].filter(k => yes(t['recycling:' + k]) || (k === 'plastic' && (yes(t['recycling:plastic_bottles']) || yes(t['recycling:plastic_packaging']))) || (k === 'metal' && (yes(t['recycling:scrap_metal']) || yes(t['recycling:cans']))) || (k === 'paper' && yes(t['recycling:cardboard'])));
      if (rt.length) p.rt = rt.join(',');
      if (t.recycling_type === 'centre') p.ce = 1;
      if (t.operator) p.op = t.operator;
      return p;
    },
  },
  build: {
    r: [14000, 7000],
    // equality filters only (regex on names is too slow for the public servers); names are checked below
    q: b => `nwr["landuse"="construction"](${b});nw["building"="construction"]["name"](${b});nw["construction"~"^(apartments|residential|commercial|office|mixed)$"](${b});wr["landuse"="residential"]["name"](${b});`,
    map(e) {
      const t = e.tags || {}; const p = base(e); if (!p) return null;
      const con = t.landuse === 'construction' || t.building === 'construction' || !!t.construction;
      if (!p.n && !(con && /apartments|residential|commercial|office|mixed/.test(t.construction || ''))) return null;
      if (!con && !/^(ЖК|Жилой комплекс|ЖМ|TJM)[\s«"]|^(Residence|Residential)\b|turar.?joy|жилой комплекс|residen|complex|tower|city\b|сити|резиденц|комплекс/i.test(p.n || '')) return null;
      p.s = con ? 'c' : 'r';
      const kind = t.construction || t.building || '';
      p.k = /commercial|office|retail/.test(kind) ? 'o' : 'h';
      const lv = parseInt(t['building:levels'] || t['construction:building:levels'], 10); if (lv > 0 && lv < 120) p.lv = lv;
      const dv = t.developer || t['construction:developer'] || t.operator || t.brand; if (dv) p.dv = dv;
      const sd = t.start_date || t['construction:start_date']; if (sd) p.sd = sd.slice(0, 10);
      const ed = t.opening_date || t['construction:end_date'] || t.end_date; if (ed) p.ed = ed.slice(0, 10);
      return p;
    },
  },
};

// ---------------------------------------------------------------- public transport: metro + bus/trolleybus/minibus stops (OpenStreetMap)
function thin(pts, m = 25) {
  const out = []; let last = null, li = -1;
  pts.forEach(([la, lo], i) => {
    if (last) { const dy = (la - last[0]) * 111320, dx = (lo - last[1]) * 111320 * Math.cos(la * Math.PI / 180); if (dx * dx + dy * dy < m * m) return; }
    last = [la, lo]; li = i; out.push([+la.toFixed(5), +lo.toFixed(5)]);
  });
  if (pts.length > 1 && li !== pts.length - 1) { const z = pts[pts.length - 1]; out.push([+z[0].toFixed(5), +z[1].toFixed(5)]); }
  return out;
}
const mdist = (a, b) => { const dy = (a[0] - b[0]) * 111320, dx = (a[1] - b[1]) * 111320 * Math.cos(a[0] * Math.PI / 180); return Math.sqrt(dx * dx + dy * dy); };
async function transit() {
  const dir = ROOT + 'data/transit/'; mkdirSync(dir, { recursive: true });
  const f = dir + '0.json';
  const prev = existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : null;
  if (!process.env.FORCE_PLACES && prev && prev.bus.stops.length && Date.now() - Date.parse(prev.at || 0) < 6 * 864e5) return;
  const [, , , , , lat, lon] = CITIES[0];
  const out = { at: new Date().toISOString(), metro: { lines: [], st: [] }, bus: { routes: {}, stops: [] } };
  try {
    const j = await overpass(`[out:json][timeout:150];(relation["route"="subway"](${bb(30000, lat, lon)});node["railway"="station"]["station"="subway"](${bb(30000, lat, lon)});node["public_transport"="station"]["subway"="yes"](${bb(30000, lat, lon)}););out geom;`);
    const rels = j.elements.filter(e => e.type === 'relation'), stn = j.elements.filter(e => e.type === 'node' && e.tags && e.tags.name);
    const byRef = {};
    for (const r of rels) {
      const t = r.tags || {}; const ref = t.ref || t.name || String(r.id);
      const segs = r.members.filter(m => m.type === 'way' && m.geometry && !/platform/.test(m.role || '')).map(m => m.geometry.map(g => [g.lat, g.lon]));
      const stops = r.members.filter(m => m.type === 'node' && /stop/.test(m.role || '') && m.lat != null).map(m => [m.lat, m.lon]);
      if (!byRef[ref] || segs.length > byRef[ref].segs.length) byRef[ref] = { ref, n: t['name:ru'] || t.name || ref, c: t.colour || t.color || '', segs, stops };
    }
    const seenSt = [];
    for (const s of stn) { const p = [s.lat, s.lon]; if (seenSt.some(x => x.n === (s.tags['name:ru'] || s.tags.name) && mdist([x.la, x.lo], p) < 400)) continue; seenSt.push({ id: 'n' + s.id, n: s.tags['name:ru'] || s.tags.name, n2: s.tags['name:uz'] || s.tags['name:en'] || '', la: +s.lat.toFixed(6), lo: +s.lon.toFixed(6), l: [] }); }
    for (const L of Object.values(byRef)) {
      out.metro.lines.push({ r: L.ref, n: L.n, c: L.c, g: L.segs.map(g => thin(g, 20)).filter(g => g.length > 1) });
      for (const sp of L.stops) { let best = null, bd = 450; for (const s of seenSt) { const d = mdist([s.la, s.lo], sp); if (d < bd) { bd = d; best = s; } } if (best && !best.l.includes(L.ref)) best.l.push(L.ref); }
    }
    out.metro.st = seenSt.filter(s => s.l.length);
    console.log(`metro: ${out.metro.lines.length} lines, ${out.metro.st.length} stations`);
  } catch (e) { console.log('metro failed: ' + e.message); }
  await new Promise(r => setTimeout(r, 1500));
  try {
    const nodes = new Map(), relm = new Map();
    for (const box of bb4(18000, lat, lon)) {
      const j = await overpass(`[out:json][timeout:90];(node["highway"="bus_stop"](${box});node["public_transport"~"^(platform|stop_position)$"](${box}););out body;rel(bn)["type"="route"]["route"~"^(bus|trolleybus|minibus|share_taxi|tram)$"];out body;`);
      for (const e of j.elements) { if (e.type === 'node') nodes.set(e.id, e); else if (e.type === 'relation') relm.set(e.id, e); }
      await new Promise(r => setTimeout(r, 1500));
    }
    const rels = [...relm.values()];
    const stops = []; const stopOf = new Map();
    const getStop = (n) => {
      if (stopOf.has(n.id)) return stopOf.get(n.id);
      const t = n.tags || {}; const name = t['name:ru'] || t.name; if (!name) return null;
      const p = [n.lat, n.lon];
      let s = stops.find(x => x.n === name && mdist([x.la, x.lo], p) < 90);
      if (!s) { s = { i: stops.length, n: name, la: +n.lat.toFixed(6), lo: +n.lon.toFixed(6), r: [] }; stops.push(s); }
      stopOf.set(n.id, s); return s;
    };
    const TYPE = { bus: 'b', trolleybus: 't', minibus: 'm', share_taxi: 'm', tram: 'tr' };
    for (const r of rels) {
      const t = r.tags || {}; const ref = (t.ref || '').trim(); if (!ref) continue;
      const key = (TYPE[t.route] || 'b') + ref;
      const seq = [];
      for (const m of r.members) { if (m.type !== 'node' || !/^(platform|stop)/.test(m.role || '')) continue; const n = nodes.get(m.ref); if (!n) continue; const s = getStop(n); if (s && seq[seq.length - 1] !== s.i) seq.push(s.i); }
      if (!seq.length) continue;
      for (const i of seq) if (!stops[i].r.includes(key)) stops[i].r.push(key);
      const R = out.bus.routes[key];
      if (!R || seq.length > R.s.length) out.bus.routes[key] = { r: ref, t: TYPE[t.route] || 'b', f: t.from || '', to: t.to || '', n: t['name:ru'] || t.name || '', s: seq };
    }
    out.bus.stops = stops.map(s => ({ n: s.n, la: s.la, lo: s.lo, r: s.r.sort((a, b) => parseInt(a.replace(/\D+/g, '')) - parseInt(b.replace(/\D+/g, '')) || a.localeCompare(b)) }));
    console.log(`bus: ${Object.keys(out.bus.routes).length} routes, ${out.bus.stops.length} stops`);
  } catch (e) { console.log('bus failed: ' + e.message); }
  if (prev && !out.metro.lines.length) out.metro = prev.metro;
  if (prev && !out.bus.stops.length) { out.bus = prev.bus; out.at = prev.at; }
  if (out.metro.lines.length || out.bus.stops.length) writeFileSync(f, JSON.stringify(out));
}

// airports (with IATA codes) and railway stations of the whole country, weekly
async function uzTransport() {
  const f = ROOT + 'data/transit/uz.json';
  const prev = existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : null;
  if (!process.env.FORCE_PLACES && prev && prev.rail.length && Date.now() - Date.parse(prev.at || 0) < 6 * 864e5) return;
  try {
    const j = await overpass('[out:json][timeout:120];area["ISO3166-1"="UZ"][admin_level=2]->.uz;(nwr["aeroway"="aerodrome"]["iata"](area.uz);node["railway"="station"]["name"](area.uz););out center tags;');
    const air = [], rail = [];
    for (const e of j.elements) {
      const t = e.tags || {}; const la = e.lat ?? e.center?.lat, lo = e.lon ?? e.center?.lon; if (la == null) continue;
      if (t.aeroway === 'aerodrome') air.push({ iata: t.iata, n: t['name:ru'] || t.name, n2: t['name:uz'] || t['name:en'] || '', la: +la.toFixed(5), lo: +lo.toFixed(5) });
      else if (t.station !== 'subway' && t.subway !== 'yes' && t.station !== 'light_rail') rail.push({ id: 'n' + e.id, n: t['name:ru'] || t.name, n2: t['name:uz'] || t.name || '', la: +la.toFixed(5), lo: +lo.toFixed(5), ...(t.usage === 'main' || /вокзал|vokzal|пассажир/i.test(t.name || '') ? { m: 1 } : {}) });
    }
    if (rail.length || air.length) writeFileSync(f, JSON.stringify({ at: new Date().toISOString(), air, rail }));
    console.log(`uz transport: ${air.length} airports, ${rail.length} stations`);
  } catch (e) { console.log('uz transport failed: ' + e.message); }
}

async function cityData() {
  // each run refreshes the oldest data (older than 6 days) within a time budget, Tashkent first
  const pdir = ROOT + 'data/places/'; mkdirSync(pdir, { recursive: true });
  const pmark = pdir + 'index.json';
  const prev = existsSync(pmark) ? JSON.parse(readFileSync(pmark, 'utf8')) : {};
  const index = { v: 3, updated: new Date().toISOString(), cities: prev.cities || {}, at: prev.at || {} };
  const qdir = ROOT + 'data/poi/'; mkdirSync(qdir, { recursive: true });
  const qmark = qdir + 'index.json';
  const qprev = existsSync(qmark) ? JSON.parse(readFileSync(qmark, 'utf8')) : {};
  const qindex = { v: 1, updated: new Date().toISOString(), n: qprev.n || {}, at: qprev.at || {} };
  for (const k of Object.keys(POI)) { qindex.n[k] = qindex.n[k] || {}; qindex.at[k] = qindex.at[k] || {}; mkdirSync(qdir + k, { recursive: true }); }

  const BIG = ['Ташкент', 'Самарканд', 'Бухара', 'Хива', 'Ургенч', 'Наманган', 'Андижан', 'Фергана', 'Коканд', 'Маргилан', 'Нукус', 'Карши', 'Шахрисабз', 'Термез', 'Джизак', 'Навои', 'Гулистан', 'Чирчик'];
  const order = CITIES.map((c, i) => i).filter(i => BIG.includes(CITIES[i][0])).sort((a, b) => BIG.indexOf(CITIES[a][0]) - BIG.indexOf(CITIES[b][0]));
  const old = iso => process.env.FORCE_PLACES || !iso || Date.now() - Date.parse(iso) > 6 * 864e5;
  const jobs = [];
  for (const i of order) {
    if (old(index.at[i])) jobs.push(['places', i]);
    for (const k of Object.keys(POI)) if (old(qindex.at[k][i])) jobs.push([k, i]);
  }
  const t0 = Date.now();
  for (const [kind, i] of jobs) {
    if (Date.now() - t0 > 11 * 60e3 || timeLeft() < 60e3) { console.log('city data: time budget used, the rest next run'); break; }
    const [, , , , , lat, lon] = CITIES[i];
    try {
      if (kind === 'places') {
        const r = i === 0 ? 16000 : 6000;
        const j = await overpass(`[out:json][timeout:90];nwr["amenity"~"^(restaurant|cafe|fast_food|bar|pub|hookah_lounge|food_court|biergarten)$"]["name"](${bb(r, lat, lon)});out center tags;`);
        const items = j.elements.map(e => place(e, i)).filter(Boolean);
        const seen = new Set(); const list = items.filter(p => { const k = p.n.toLowerCase() + Math.round(p.la * 2000) + Math.round(p.lo * 2000); return !seen.has(k) && seen.add(k); });
        if (list.length) { writeFileSync(pdir + i + '.json', JSON.stringify(list)); index.cities[i] = list.length; }
        index.at[i] = new Date().toISOString();
        writeFileSync(pmark, JSON.stringify(index));
        console.log(`places ${CITIES[i][0]}: ${list.length}`);
      } else {
        const P = POI[kind], r = P.r[i === 0 ? 0 : 1];
        const els = new Map();
        for (const box of (i === 0 ? bb4(r, lat, lon) : [bb(r, lat, lon)])) {
          const j = await overpass(`[out:json][timeout:90];(${P.q(box)});out center tags;`);
          for (const e of j.elements) els.set(e.type + e.id, e);
        }
        const seen = new Set();
        const list = [...els.values()].map(e => P.map(e)).filter(Boolean).filter(p => { const k = (p.n || '').toLowerCase() + Math.round(p.la * 3000) + Math.round(p.lo * 3000); return !seen.has(k) && seen.add(k); });
        if (kind === 'hotel') { const f = qdir + 'hotel/' + i + '.json'; await hoEnrich(list, existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : []); }
        if (list.length) { writeFileSync(qdir + kind + '/' + i + '.json', JSON.stringify(list)); qindex.n[kind][i] = list.length; }
        qindex.at[kind][i] = new Date().toISOString();
        writeFileSync(qmark, JSON.stringify(qindex));
        console.log(`${kind} ${CITIES[i][0]}: ${list.length}`);
      }
    } catch (e) { console.log(`${kind} ${CITIES[i][0]} failed: ${e.message}`); }
    await new Promise(r => setTimeout(r, 1500));
  }
  writeFileSync(pmark, JSON.stringify(index)); writeFileSync(qmark, JSON.stringify(qindex));
}

// ---------------------------------------------------------------- vacancies: Oson Ish (job portal of the Ministry of Employment), by region, twice a day
// index in JOB_REG = region index in the app (REGIONS): 0 Tashkent city, 1 Tashkent region, 2 Andijan, …
const JOB_REG = ['toshkent', 'toshkent-viloyati', 'andijon', 'buxoro', 'jizzax', 'qashqadaryo', 'navoiy', 'namangan', 'samarqand', 'sirdaryo', 'surxondaryo', 'fargona', 'xorazm', 'qoraqalpogiston'];
function nuxtData(html) {
  const m = html.match(/<script[^>]+id="__NUXT_DATA__"[^>]*>([\s\S]*?)<\/script>/); if (!m) return null;
  const A = JSON.parse(m[1]); const memo = new Map();
  const R = i => {
    if (typeof i !== 'number') return i; if (memo.has(i)) return memo.get(i);
    const v = A[i]; let out;
    if (Array.isArray(v)) {
      if (typeof v[0] === 'string') out = /^(Shallow)?(Reactive|Ref)$/.test(v[0]) ? R(v[1]) : v[0] === 'Date' ? v[1] : null;
      else { out = []; memo.set(i, out); for (const x of v) out.push(R(x)); }
    } else if (v && typeof v === 'object') { out = {}; memo.set(i, out); for (const k in v) out[k] = R(v[k]); } else out = v;
    memo.set(i, out); return out;
  };
  return R(0);
}
const cleanCo = s => String(s || '').replace(/MAS['’`ʻ‘]?ULIYATI CHEKLANGAN JAMIYATI?/i, 'MCHJ').replace(/AKSIYADORLIK JAMIYATI/i, 'AJ').replace(/XUSUSIY KORXONA(SI)?/i, 'XK').replace(/OILAVIY KORXONA(SI)?/i, 'OK').replace(/["“”«»]/g, '').replace(/\s+/g, ' ').trim();
const jobDate = s => { const d = new Date(Date.now() + 5 * 3600e3); if (/^bugun|^сегодня|^today/i.test(s || '')) return d.toISOString().slice(0, 10); if (/^kecha|^вчера|^yesterday/i.test(s || '')) return new Date(d - 864e5).toISOString().slice(0, 10); const m = String(s || '').match(/^(\d{2})\.(\d{2})\.(\d{4})$/); return m ? `${m[3]}-${m[2]}-${m[1]}` : ''; };
async function jobs() {
  const dir = ROOT + 'data/jobs/'; mkdirSync(dir, { recursive: true });
  const f = dir + 'index.json'; const prev = existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : null;
  if (prev && !process.env.FORCE_JOBS && Date.now() - Date.parse(prev.at) < 11 * 3600e3) { console.log('jobs: fresh'); return; }
  const index = { at: new Date().toISOString(), src: 'https://osonish.uz', r: {} };
  for (let ri = 0; ri < JOB_REG.length; ri++) {
    const slug = JOB_REG[ri], pages = ri === 0 ? 25 : ri === 1 ? 8 : 6; const items = []; let total = 0;
    for (let pg = 1; pg <= pages; pg++) {
      try {
        const html = await get(`https://osonish.uz/vacancies/by-region/${slug}${pg > 1 ? '?page=' + pg : ''}`, 20000);
        const root = nuxtData(html); const d = root && root.data && Object.values(root.data).find(x => x && Array.isArray(x.items));
        if (!d) { console.log(`jobs ${slug} p${pg}: no data`); break; }
        total = d.total || total;
        for (const x of d.items) if (x && x.id && x.title) items.push({ id: x.id, t: String(x.title).trim(), c: cleanCo(x.company), s1: x.salary_min || 0, s2: x.salary_max || 0, ds: String(x.city_name || '').trim(), ad: String(x.address_text || '').trim().slice(0, 90), d: jobDate(x.posted_date), so: x.isSocialCategory ? 1 : 0 });
        if (pg >= (d.lastPage || 1)) break;
      } catch (e) { console.log(`jobs ${slug} p${pg}: ${e.message}`); break; }
      await new Promise(r => setTimeout(r, 900));
    }
    const seen = new Set(); const list = items.filter(x => !seen.has(x.id) && seen.add(x.id));
    if (list.length) { writeFileSync(dir + ri + '.json', JSON.stringify(list)); index.r[ri] = { n: list.length, total }; }
    else if (prev && prev.r && prev.r[ri]) index.r[ri] = prev.r[ri];
    console.log(`jobs ${slug}: ${list.length}/${total}`);
  }
  if (Object.keys(index.r).length) writeFileSync(f, JSON.stringify(index));
}

// official exchange rates of the Central Bank of Uzbekistan
async function rates() {
  try {
    const j = JSON.parse(await get('https://cbu.uz/ru/arkhiv-kursov-valyut/json/'));
    const want = ['USD', 'EUR', 'RUB', 'KZT', 'CNY', 'GBP', 'TRY', 'KRW', 'AED', 'JPY', 'CHF', 'KGS', 'TJS'];
    const list = j.filter(x => want.includes(x.Ccy)).map(x => ({ c: x.Ccy, r: +x.Rate, d: +x.Diff, n: +x.Nominal || 1, ru: x.CcyNm_RU, uz: x.CcyNm_UZ, en: x.CcyNm_EN, date: x.Date }))
      .sort((a, b) => want.indexOf(a.c) - want.indexOf(b.c));
    if (list.length) { writeFileSync(ROOT + 'data/rates.json', JSON.stringify({ at: new Date().toISOString(), date: list[0].date, list })); console.log('rates: ' + list.length); }
  } catch (e) { console.log('rates failed: ' + e.message); }
}

await news();
await rates();
try { await jobs(); } catch (e) { console.log('jobs failed: ' + e.message); }
await uzTransport();
await transit();
await cityData();
