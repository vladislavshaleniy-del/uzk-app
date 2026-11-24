// IndexNow: сообщить Яндексу и Bing, что страницы сайта и приложения изменились.
import { ORDER } from './i18n.gen.js';
import { path } from './site.js';

export const KEY = 'cf42d4233573b34ff5388fc537d06a13';
const ENGINES = ['https://yandex.com/indexnow', 'https://www.bing.com/indexnow'];
const ping = (host, urlList) => Promise.all(ENGINES.map(e => fetch(e, {
  method: 'POST', headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key: KEY, keyLocation: `https://${host}/${KEY}.txt`, urlList }),
}).then(r => r.status).catch(e => String(e)))).then(st => Object.fromEntries(ENGINES.map((e, i) => [new URL(e).hostname, st[i]])));

export const siteUrls = () => { const u = []; for (const k of ['', ...ORDER]) for (const l of ['ru', 'uz', 'en']) u.push('https://myuzcity.uz' + path(l, k)); return u; };

export async function pushAll() {
  const site = siteUrls();
  const [a, b] = await Promise.all([ping('myuzcity.uz', site), ping('app.myuzcity.uz', ['https://app.myuzcity.uz/'])]);
  const good = x => x === 200 || x === 202;
  return { ok: good(a['yandex.com']) || good(a['www.bing.com']), n: site.length + 1, site: a, app: b, t: new Date().toISOString() };
}
