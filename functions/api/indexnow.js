// Tells Yandex, Bing and other IndexNow search engines that the pages of myuzcity.uz and the app changed.
// Open https://myuzcity.uz/api/indexnow?key=<key> once after publishing changes (the key is in /<key>.txt).
import { ORDER } from '../_lib/i18n.gen.js';
import { path } from '../_lib/site.js';

const KEY = 'cf42d4233573b34ff5388fc537d06a13';
const ping = (host, urlList) => fetch('https://api.indexnow.org/indexnow', {
  method: 'POST', headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key: KEY, keyLocation: `https://${host}/${KEY}.txt`, urlList }),
}).then(r => r.status).catch(e => String(e));

export async function onRequestGet({ request }) {
  if (new URL(request.url).searchParams.get('key') !== KEY) return new Response('Not found', { status: 404 });
  const site = [];
  for (const k of ['', ...ORDER]) for (const l of ['ru', 'uz', 'en']) site.push('https://myuzcity.uz' + path(l, k));
  const [a, b] = await Promise.all([ping('myuzcity.uz', site), ping('app.myuzcity.uz', ['https://app.myuzcity.uz/'])]);
  return Response.json({ ok: a === 200 || a === 202, site: { urls: site.length, status: a }, app: { status: b } }, { headers: { 'cache-control': 'no-store' } });
}
