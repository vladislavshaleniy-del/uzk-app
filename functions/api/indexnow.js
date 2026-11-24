// Tells Yandex, Bing and other IndexNow search engines that the pages of myuzcity.uz and the app changed.
// Open https://myuzcity.uz/api/indexnow?key=<key> once after publishing changes (the key is in /<key>.txt).
import { ORDER } from '../_lib/i18n.gen.js';
import { path } from '../_lib/site.js';

const KEY = 'cf42d4233573b34ff5388fc537d06a13';
// sent straight to Yandex and Bing (the shared api.indexnow.org relay may answer 429 to new sites)
const ENGINES = ['https://yandex.com/indexnow', 'https://www.bing.com/indexnow'];
const ping = (host, urlList) => Promise.all(ENGINES.map(e => fetch(e, {
  method: 'POST', headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key: KEY, keyLocation: `https://${host}/${KEY}.txt`, urlList }),
}).then(r => r.status).catch(e => String(e)))).then(st => Object.fromEntries(ENGINES.map((e, i) => [new URL(e).hostname, st[i]])));

export async function onRequestGet({ request }) {
  if (new URL(request.url).searchParams.get('key') !== KEY) return new Response('Not found', { status: 404 });
  const site = [];
  for (const k of ['', ...ORDER]) for (const l of ['ru', 'uz', 'en']) site.push('https://myuzcity.uz' + path(l, k));
  const [a, b] = await Promise.all([ping('myuzcity.uz', site), ping('app.myuzcity.uz', ['https://app.myuzcity.uz/'])]);
  return Response.json({ ok: Object.values(a).some(x => x === 200 || x === 202), site: { urls: site.length, status: a }, app: { status: b } }, { headers: { 'cache-control': 'no-store' } });
}
