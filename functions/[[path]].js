// Pages that run through this function are listed in /_routes.json; every other file is served as a static asset.
// myuzcity.uz (and www): the brand website, rendered per language and service for search engines (see _lib/site.js).
// app.myuzcity.uz and *.pages.dev: the app, served as is (pages.dev copies are hidden from search engines).
import { SITE_HOST, route, path, render } from './_lib/site.js';

const LANG = ['ru', 'uz', 'en'];
const go = (to, base) => Response.redirect(new URL(to, base).toString(), 301);

export async function onRequest({ request, env }) {
  const url = new URL(request.url);
  if (!SITE_HOST.test(url.hostname)) {
    const r = await env.ASSETS.fetch(request);
    if (!/\.pages\.dev$/i.test(url.hostname)) return r;
    const h = new Headers(r.headers); h.set('x-robots-tag', 'noindex');
    return new Response(r.body, { status: r.status, statusText: r.statusText, headers: h });
  }
  if (url.hostname.startsWith('www.')) { url.hostname = url.hostname.slice(4); return go(url.toString(), url); }

  const rt = route(url.pathname);
  if (!rt) return env.ASSETS.fetch(request);
  let { l, k } = rt;
  if (rt.bad) k = '';

  // old links ?s=transport&lang=uz → /uz/transport
  const qs = url.searchParams;
  if (qs.has('lang') || qs.has('s')) {
    const ql = qs.get('lang'), qk = qs.get('s');
    if (LANG.includes(ql)) l = ql;
    if (qk && route('/' + qk) && !route('/' + qk).bad) k = qk;
    qs.delete('lang'); qs.delete('s');
    const rest = qs.toString();
    return go(path(l, k) + (rest ? '?' + rest : '') + url.hash, url);
  }
  if (rt.bad) return render(env, request, url, l, '', true);
  const want = path(l, k);
  if (url.pathname !== want) return go(want + url.search, url);
  return render(env, request, url, l, k, false);
}
