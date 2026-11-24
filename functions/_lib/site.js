// myuzcity.uz: every page is served from /portal/ and rewritten on the server for search engines.
// URLs: /  /uz/  /en/  (home) and /<service>  /uz/<service>  /en/<service>  (service pages).
// The server sets the language, title, description, keywords, canonical, hreflang, Open Graph and JSON-LD,
// translates the static texts, renders the services catalogue and the service page header,
// and adds a text block with links to every page above the footer. The browser scripts then take over as before.
import { T, S, SV, ORDER, TILE } from './i18n.gen.js';
import { SITE, APP_URL, LANGS, LOCALE, LANG_NAME, UI, PAGES } from './seo-content.js';

export const SITE_HOST = /^(www\.)?myuzcity\.uz$/i;
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pick = (o, l) => (o && (o[l] || o.ru)) || '';
const ic = n => `<svg><use href="/portal/assets/icons.svg#i-${n}"/></svg>`;
const ART = n => `/portal/art/${n}.webp?v=2`;

// path of a page: '' is home
export const path = (l, k) => (l === 'ru' ? '/' : `/${l}/`) + (k || '');
const abs = (l, k) => SITE + path(l, k);

// '/uz/transport' → { l: 'uz', k: 'transport' }; unknown → null
export function route(p) {
  const m = p.match(/^\/(?:(uz|en|ru)(?:\/|$))?([a-z]*)\/?$/);
  if (!m) return null;
  const l = m[1] || 'ru', k = m[2] || '';
  if (k && !SV[k]) return { l, k, bad: true };
  return { l, k };
}

// live numbers for the "Tashkent in the app" block (cached per worker for 10 minutes)
let NUMS = null, NUMS_AT = 0;
async function numbers(env, origin) {
  if (NUMS && Date.now() - NUMS_AT < 6e5) return NUMS;
  const j = u => env.ASSETS.fetch(new Request(origin + u)).then(r => (r.ok ? r.json() : null)).catch(() => null);
  const [poi, places, tr] = await Promise.all([j('/data/poi/index.json'), j('/data/places/index.json'), j('/data/transit/0.json')]);
  const n = (poi && poi.n) || {}, g = k => (n[k] && n[k]['0']) || 0;
  NUMS = { cafes: places && places.cities ? places.cities['0'] || 0 : 0, parking: g('parking'), med: g('med'), edu: g('edu'), gov: g('gov'), mosque: g('mosque'), speedcam: g('speedcam'),
    stops: tr && tr.bus ? tr.bus.stops.length + (tr.metro ? tr.metro.st.length : 0) : 0 };
  NUMS_AT = Date.now();
  return NUMS;
}
const fmt = (n, l) => Math.round(n).toLocaleString(l === 'en' ? 'en-US' : 'ru-RU').replace(/,/g, l === 'en' ? ',' : ' ').replace(/\u202F|\u00A0/g, ' ');

function head(l, k, notFound) {
  const pg = PAGES[l][k || 'home'], url = abs(l, k);
  const alt = LANGS.map(x => `<link rel="alternate" hreflang="${x}" href="${abs(x, k)}">`).join('') + `<link rel="alternate" hreflang="x-default" href="${abs('ru', k)}">`;
  const og = `${SITE}/portal/og/og-${l}.jpg`;
  const titles = Object.fromEntries(['', ...ORDER].map(x => [x, PAGES[l][x || 'home'].title]));
  const org = { '@type': 'Organization', '@id': SITE + '/#org', name: 'MyUzCity', url: SITE + '/', logo: SITE + '/icon-512.png', sameAs: ['https://t.me/MyUzCity_bot'] };
  const site = { '@type': 'WebSite', '@id': SITE + '/#website', url: SITE + '/', name: 'MyUzCity', alternateName: ['My Uz City', 'MyUzCity.uz'], inLanguage: LANGS, publisher: { '@id': SITE + '/#org' } };
  const page = { '@type': 'WebPage', '@id': url + '#webpage', url, name: pg.title, description: pg.desc, inLanguage: l, isPartOf: { '@id': SITE + '/#website' }, primaryImageOfPage: og };
  const graph = [org, site, page];
  if (!k) {
    const app = { '@type': ['WebApplication', 'MobileApplication'], '@id': SITE + '/#app', name: 'MyUzCity', url: APP_URL, description: pg.desc, operatingSystem: 'Android, iOS, Web',
      applicationCategory: 'LifestyleApplication', browserRequirements: 'Requires JavaScript', inLanguage: ['uz', 'ru', 'en', 'zh'], isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'UZS' }, areaServed: { '@type': 'Country', name: 'Uzbekistan' }, image: SITE + '/icon-512.png', screenshot: og,
      featureList: ORDER.map(x => PAGES[l][x].a), publisher: { '@id': SITE + '/#org' } };
    page.about = { '@id': SITE + '/#app' };
    graph.push(app, { '@type': 'FAQPage', '@id': url + '#faq', inLanguage: l, mainEntity: pg.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
  } else {
    page.breadcrumb = { '@id': url + '#bc' };
    graph.push({ '@type': 'BreadcrumbList', '@id': url + '#bc', itemListElement: [
      { '@type': 'ListItem', position: 1, name: UI[l].home, item: abs(l, '') },
      { '@type': 'ListItem', position: 2, name: pick(SV[k].t, l), item: url }] });
  }
  const ld = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  // home without a language prefix: people go to the language they chose before (or their phone's language); search engines stay here
  const hop = !k && l === 'ru' ? `<script>try{if(!/bot|crawl|spider|slurp|google|yandex|bing|lighthouse|headless/i.test(navigator.userAgent)){var s=localStorage.getItem('mz-portal-lang'),n=(navigator.language||'').slice(0,2),w=s||(n==='uz'||n==='en'?n:'ru');if(w==='uz'||w==='en')location.replace('/'+w+'/'+location.search+location.hash)}}catch(e){}</script>` : '';
  return hop
    + `<meta name="keywords" content="${esc(pg.kw)}">`
    + `<meta name="robots" content="${notFound ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}">`
    + `<link rel="canonical" href="${url}">${alt}`
    + `<meta property="og:type" content="website"><meta property="og:site_name" content="MyUzCity">`
    + `<meta property="og:title" content="${esc(pg.title)}"><meta property="og:description" content="${esc(pg.desc)}"><meta property="og:url" content="${url}">`
    + `<meta property="og:image" content="${og}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${esc(PAGES[l].home.h)}">`
    + `<meta property="og:locale" content="${LOCALE[l]}">` + LANGS.filter(x => x !== l).map(x => `<meta property="og:locale:alternate" content="${LOCALE[x]}">`).join('')
    + `<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(pg.title)}"><meta name="twitter:description" content="${esc(pg.desc)}"><meta name="twitter:image" content="${og}">`
    + `<meta name="application-name" content="MyUzCity"><meta name="geo.region" content="UZ-TK"><meta name="geo.placename" content="${l === 'en' ? 'Tashkent' : l === 'uz' ? 'Toshkent' : 'Ташкент'}">`
    + `<script type="application/ld+json">${ld}</script>`
    + `<script id="mz-seo" type="application/json">${JSON.stringify({ l, k, titles }).replace(/</g, '\\u003c')}</script>`;
}

const tile = (l, k, cls) => { const v = SV[k]; return `<a class="tile ${cls}" href="${path(l, k)}" data-sv="${k}" style="--g:${v.g}">`
  + (v.art ? `<img src="${ART(v.art)}" alt="" loading="lazy" decoding="async">` : '<div class="tile-ag"></div>')
  + `<span class="tile-ic">${ic(v.ic)}</span><span class="tile-tx"><b>${esc(pick(v.t, l))}</b><i>${esc(pick(v.sub, l))}</i></span><span class="tile-go">${ic('arrow-up-right')}</span></a>`; };

const appLink = (v, l) => `${APP_URL}?${v.app ? `open=${encodeURIComponent(v.app)}${v.p ? '&p=' + encodeURIComponent(v.p) : ''}&` : ''}lang=${l}`;

function shell(l, k) {
  const v = SV[k], s = S[l], others = ORDER.filter(x => x !== k && x !== 'ai').slice(0, 5);
  const lead = pick(v.lead, l) || pick(v.sub, l);
  return `<div class="sv" style="--g:${v.g}"><header class="sv-hero">${v.art ? `<img class="sv-art" src="${ART(v.art)}" alt="" decoding="async">` : ''}<div class="sv-hero-in">`
    + `<nav class="crumbs"><a href="${path(l, '')}" data-home>${esc(s.home)}</a><span>/</span><a href="${path(l, '')}#services" data-home="services">${esc(s.all)}</a><span>/</span><b>${esc(pick(v.t, l))}</b></nav>`
    + `<span class="sv-ic">${ic(v.ic)}</span><h1>${esc(pick(v.t, l))}</h1><p class="sv-lead">${esc(lead)}</p><div class="sv-kpis" id="svK"></div>`
    + `<div class="cta-row">${v.app ? `<a class="btn btn-acc btn-lg" href="${esc(appLink(v, l))}">${ic('device-mobile')}<span>${esc(s.open_app)}</span></a>` : ''}<a class="btn btn-ghost btn-lg install-app" href="${APP_URL}?lang=${l}">${ic('arrow-right')}<span>${esc(s.install)}</span></a></div></div></header>`
    + `<div class="sv-body"><div class="sv-main" id="svMain"><div class="pn wide"><div class="sk" style="height:220px"></div></div></div>`
    + `<aside class="sv-app"><div class="app-card"><div class="mini-phone"><div class="mp-screen">${v.art ? `<img src="${ART(v.art)}" alt="">` : ''}<span class="mp-ic">${ic(v.ic)}</span><b>${esc(pick(v.t, l))}</b></div></div>`
    + `<h3>${esc(s.app_t)}</h3><p>${esc(s.app_s)}</p><ul>${(s.app_b || []).map(x => `<li>${ic('check-circle')}<span>${esc(x)}</span></li>`).join('')}</ul>`
    + `${v.app ? `<a class="btn btn-acc" href="${esc(appLink(v, l))}">${esc(s.open_app)}</a>` : ''}</div></aside></div>`
    + `<section class="sv-next"><h2>${esc(s.next)}</h2><div class="next-row">${others.map(o => tile(l, o, 'sm')).join('')}</div></section></div>`;
}

// the visible text block above the footer: about this page, FAQ on home, links to every page and language
function seoBlock(l, k) {
  const pg = PAGES[l][k || 'home'], ui = UI[l];
  return `<div class="blk blk-light blk-seo" id="seo"><section class="seo" aria-labelledby="seoH">`
    + `<div class="seo-main"><h2 id="seoH">${esc(pg.h)}</h2>${pg.p.map(x => `<p>${esc(x)}</p>`).join('')}`
    + (pg.li ? `<ul class="seo-li">${pg.li.map(x => `<li>${ic('check-circle')}<span>${esc(x)}</span></li>`).join('')}</ul>` : '')
    + (pg.faq ? `<div class="seo-faq"><h3>${esc(ui.faq)}</h3>${pg.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>` : '')
    + `</div><nav class="seo-nav" aria-label="${esc(ui.svc)}"><h3>${esc(ui.svc)}</h3><ul>`
    + `<li><a href="${path(l, '')}"${!k ? ' aria-current="page"' : ''}>${esc(PAGES[l].home.h.split(' — ')[0])} — ${esc(ui.home)}</a></li>`
    + ORDER.map(x => `<li><a href="${path(l, x)}" data-sv="${x}"${x === k ? ' aria-current="page"' : ''}>${esc(PAGES[l][x].a)}</a></li>`).join('')
    + `<li><a href="${APP_URL}?lang=${l}">${esc(ui.app)} — app.myuzcity.uz</a></li></ul>`
    + `<p class="seo-langs"><span>${esc(ui.lang)}:</span>${LANGS.map(x => `<a href="${path(x, k)}" hreflang="${x}" lang="${x}"${x === l ? ' aria-current="true"' : ''}>${LANG_NAME[x]}</a>`).join('')}</p></nav>`
    + `</section></div>`;
}

export async function render(env, request, url, l, k, notFound) {
  const [r, nums] = await Promise.all([env.ASSETS.fetch(new Request(new URL('/portal/', url), request)), numbers(env, url.origin)]);
  const pg = PAGES[l][k || 'home'];
  const on = fn => ({ element: fn });
  const text = (v) => on(e => { if (typeof v === 'string') e.setInnerContent(v); });
  const out = new HTMLRewriter()
    .on('html', on(e => { e.setAttribute('lang', l); if (k) e.setAttribute('data-sv', k); }))
    .on('title', on(e => e.setInnerContent(pg.title)))
    .on('meta[name="description"]', on(e => e.setAttribute('content', pg.desc)))
    .on('meta[property^="og:"]', on(e => e.remove()))
    .on('link[rel="canonical"]', on(e => e.remove()))
    .on('head', on(e => e.append(head(l, k, notFound), { html: true })))
    .on('[data-i]', on(e => { if (l === 'ru') return; const v = T[l][e.getAttribute('data-i')]; if (typeof v === 'string') e.setInnerContent(v); }))
    .on('.langs button', on(e => { if (e.getAttribute('data-lang') === l) e.setAttribute('class', 'on'); }))
    .on('a[data-sv]', on(e => e.setAttribute('href', path(l, e.getAttribute('data-sv')))))
    .on('a.open-app', on(e => e.setAttribute('href', `${APP_URL}?lang=${l}`)))
    .on('a.install-app', on(e => e.setAttribute('href', `${APP_URL}?lang=${l}`)))
    .on('a[data-priv]', on(e => e.setAttribute('href', `/privacy.html?lang=${l}`)))
    .on('#svcT', text(S[l].svc_t)).on('#svcS', text(S[l].svc_s)).on('#hubT', text(S[l].hub_t)).on('#hubS', text(S[l].hub_s))
    .on('#svcGrid', on(e => e.setInnerContent(ORDER.map(x => tile(l, x, TILE[x] || '')).join(''), { html: true })))
    .on('[data-count]', on(e => { const v = nums[e.getAttribute('data-count')]; if (v) e.setInnerContent(fmt(v, l)); }))
    .on('footer.foot', on(e => e.before(seoBlock(l, k), { html: true })));
  if (k) out
    .on('body', on(e => e.setAttribute('class', 'on-sv')))
    .on('main#top', on(e => e.setAttribute('hidden', '')))
    .on('#svView', on(e => { e.removeAttribute('hidden'); e.setInnerContent(shell(l, k), { html: true }); }));
  const res = out.transform(r);
  const h = new Headers(res.headers);
  h.set('content-type', 'text/html; charset=utf-8');
  h.set('content-language', l);
  h.set('cache-control', 'public, max-age=300');
  h.set('x-content-type-options', 'nosniff');
  h.delete('content-length'); h.delete('etag'); h.delete('x-robots-tag');
  return new Response(res.body, { status: notFound ? 404 : r.status, headers: h });
}
