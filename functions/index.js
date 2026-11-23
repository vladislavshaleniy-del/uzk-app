// "/" serves the brand website on myuzcity.uz and the app everywhere else (app.myuzcity.uz, myuzcity.pages.dev).
// Only this exact route runs as a function; every other file is served as a static asset.
const SITE = /^(www\.)?myuzcity\.uz$/i;
export async function onRequest({ request, env }) {
  const url = new URL(request.url);
  if (!SITE.test(url.hostname)) return env.ASSETS.fetch(request);
  if (url.hostname.startsWith('www.')) { url.hostname = url.hostname.slice(4); return Response.redirect(url.toString(), 301); }
  const r = await env.ASSETS.fetch(new Request(new URL('/portal/' + url.search, url), request));
  const h = new Headers(r.headers); h.set('cache-control', 'public, max-age=300'); h.set('x-content-type-options', 'nosniff');
  return new Response(r.body, { status: r.status, headers: h });
}
