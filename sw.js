const CACHE = 'uzk-myuzcity-2311u';
const FILES = ["./", "index.html", "flows.js", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png", "inter-sub.woff", "privacy.html", "img/r-1-5149.webp", "img/en/r-1-5149.webp", "img/uz/r-1-5149.webp", "img/zh/r-1-5149.webp", "img/f-1-5240.webp", "img/en/f-1-5240.webp", "img/uz/f-1-5240.webp", "img/zh/f-1-5240.webp", "img/f-1-5248.webp", "img/en/f-1-5248.webp", "img/uz/f-1-5248.webp", "img/zh/f-1-5248.webp"];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put('./', c)); return r; }).catch(() => caches.match('./')));
    return;
  }
  // live data and app code: network first (fresh news, no stale flows.js), cache as offline fallback
  if (url.pathname.includes('/data/') || url.pathname.endsWith('/flows.js')) {
    e.respondWith(fetch(e.request, { cache: 'no-cache' }).then(res => { if (res.ok) { const c = res.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); } return res; })
      .catch(() => caches.match(e.request, { ignoreSearch: true })));
    return;
  }
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request).then(res => { if (res.ok) { const c = res.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); } return res; })));
});
