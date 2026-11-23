// Refreshes the app's live data (run by .github/workflows/update-data.yml).
//   data/news.json          — city news + Tashkent afisha from public RSS feeds (every run)
//   data/places/<city>.json — cafes & restaurants from OpenStreetMap (weekly, or FORCE_PLACES=1)
//   data/poi/<kind>/<city>.json — parking, mosques, medicine (hospitals, clinics, pharmacies) from OpenStreetMap (weekly)
// City list, names and coordinates come from CITIES in flows.js (index = city id in the app).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';

const ROOT = new URL('..', import.meta.url).pathname;
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
];
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

async function news() {
  const all = [];
  for (const f of FEEDS) {
    try { const items = await readFeed(f); items.forEach(n => n.tashkentOnly = !!f.tashkentOnly); all.push(...items); console.log(`news ${f.id}: ${items.length}`); }
    catch (e) { console.log(`news ${f.id} failed: ${e.message}`); }
  }
  const seen = new Set(); const items = all.filter(n => !seen.has(n.u) && seen.add(n.u)).sort((a, b) => b.d.localeCompare(a.d));
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
  const need = [...pick].filter(n => !n.i);
  for (let k = 0; k < need.length; k += 5) await Promise.all(need.slice(k, k + 5).map(async n => { n.i = await ogImage(n.u); }));
  const clean = n => ({ t: n.t, u: n.u, i: n.i, x: n.x, d: n.d, s: n.s, k: n.k });
  for (const c in out.cities) out.cities[c] = out.cities[c].map(clean);
  out.all = out.all.map(clean);
  mkdirSync(ROOT + 'data', { recursive: true });
  const file = ROOT + 'data/news.json';
  const prev = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : null;
  if (prev && JSON.stringify({ ...prev, updated: 0 }) === JSON.stringify({ ...out, updated: 0 })) { console.log('news unchanged'); return; }
  writeFileSync(file, JSON.stringify(out));
  console.log(`news: ${Object.keys(out.cities).length} cities, tashkent ${(out.cities[0] || []).length}`);
}

// ---------------------------------------------------------------- places (OpenStreetMap)
const OVERPASS = ['https://maps.mail.ru/osm/tools/overpass/api/interpreter', 'https://overpass.kumi.systems/api/interpreter', 'https://overpass-api.de/api/interpreter'];
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
    try {
      const r = await fetch(base, { method: 'POST', headers: { 'user-agent': UA, accept: 'application/json,*/*;q=0.8', 'content-type': 'application/x-www-form-urlencoded' }, body: 'data=' + encodeURIComponent(q) });
      if (r.ok) return await r.json();
      console.log(`overpass ${base}: ${r.status}`);
    } catch (e) { console.log(`overpass ${base}: ${e.message}`); }
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
const POI = {
  parking: {
    r: [12000, 6000],
    q: (r, la, lo) => `nwr["amenity"="parking"]["access"!~"^(private|no|permit|employees)$"](around:${r},${la},${lo});`,
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
    q: (r, la, lo) => `nwr["amenity"="place_of_worship"]["religion"="muslim"](around:${r},${la},${lo});`,
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
    q: (r, la, lo) => `nwr["amenity"~"^(hospital|clinic|doctors|dentist|pharmacy)$"](around:${r},${la},${lo});nwr["healthcare"~"^(laboratory|centre|blood_donation|rehabilitation)$"](around:${r},${la},${lo});`,
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
};

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
    if (Date.now() - t0 > 11 * 60e3) { console.log('city data: time budget used, the rest next run'); break; }
    const [, , , , , lat, lon] = CITIES[i];
    try {
      if (kind === 'places') {
        const r = i === 0 ? 16000 : 6000;
        const j = await overpass(`[out:json][timeout:90];nwr["amenity"~"^(restaurant|cafe|fast_food|bar|pub|hookah_lounge|food_court|biergarten)$"]["name"](around:${r},${lat},${lon});out center tags;`);
        const items = j.elements.map(e => place(e, i)).filter(Boolean);
        const seen = new Set(); const list = items.filter(p => { const k = p.n.toLowerCase() + Math.round(p.la * 2000) + Math.round(p.lo * 2000); return !seen.has(k) && seen.add(k); });
        if (list.length) { writeFileSync(pdir + i + '.json', JSON.stringify(list)); index.cities[i] = list.length; }
        index.at[i] = new Date().toISOString();
        writeFileSync(pmark, JSON.stringify(index));
        console.log(`places ${CITIES[i][0]}: ${list.length}`);
      } else {
        const P = POI[kind], r = P.r[i === 0 ? 0 : 1];
        const j = await overpass(`[out:json][timeout:120];(${P.q(r, lat, lon)});out center tags;`);
        const seen = new Set();
        const list = j.elements.map(e => P.map(e)).filter(Boolean).filter(p => { const k = (p.n || '').toLowerCase() + Math.round(p.la * 3000) + Math.round(p.lo * 3000); return !seen.has(k) && seen.add(k); });
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

await news();
await cityData();
