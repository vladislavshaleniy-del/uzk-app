// Tells Yandex, Bing and other IndexNow search engines that the pages of myuzcity.uz and the app changed.
// Open https://myuzcity.uz/api/indexnow?key=<key> once after publishing changes (the key is in /<key>.txt),
// or press «Отправить все страницы» on /stats.
import { KEY, pushAll } from '../_lib/indexnow.js';

export async function onRequestGet({ request }) {
  if (new URL(request.url).searchParams.get('key') !== KEY) return new Response('Not found', { status: 404 });
  return Response.json(await pushAll(), { headers: { 'cache-control': 'no-store' } });
}
