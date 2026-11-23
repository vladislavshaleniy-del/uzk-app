const CACHE = 'uzk-myuzcity-2311c';
const FILES = ["./", "index.html", "flows.js", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png", "inter-sub.woff", "img/f-1-95.webp", "img/f-1-103.webp", "img/r-1-19.webp", "img/f-1-190.webp", "img/f-1-198.webp", "img/r-1-140.webp", "img/f-1-295.webp", "img/r-1-235.webp", "img/f-1-403.webp", "img/f-1-411.webp", "img/r-1-332.webp", "img/f-1-486.webp", "img/r-1-448.webp", "img/f-1-684.webp", "img/f-1-692.webp", "img/r-1-523.webp", "img/f-1-951.webp", "img/f-1-959.webp", "img/r-1-729.webp", "img/f-1-1117.webp", "img/f-1-1125.webp", "img/r-1-996.webp", "img/f-1-1287.webp", "img/f-1-1324.webp", "img/r-1-1162.webp", "img/f-1-1388.webp", "img/f-1-1396.webp", "img/r-1-1332.webp", "img/f-1-1507.webp", "img/f-1-1515.webp", "img/r-1-1433.webp", "img/f-1-1632.webp", "img/f-1-1640.webp", "img/r-1-1552.webp", "img/f-1-1732.webp", "img/f-1-1740.webp", "img/r-1-1677.webp", "img/f-1-1864.webp", "img/f-1-1872.webp", "img/r-1-1777.webp", "img/f-1-1994.webp", "img/f-1-2017.webp", "img/r-1-1909.webp", "img/s-1-1910.webp", "img/s-1-1913.webp", "img/f-1-2161.webp", "img/f-1-2184.webp", "img/r-1-2054.webp", "img/s-1-2059.webp", "img/f-1-2246.webp", "img/f-1-2269.webp", "img/r-1-2221.webp", "img/r-1-2306.webp", "img/f-1-2413.webp", "img/f-1-2421.webp", "img/r-1-2379.webp", "img/f-1-2528.webp", "img/f-1-2536.webp", "img/r-1-2468.webp", "img/r-1-2573.webp", "img/f-1-2715.webp", "img/f-1-2723.webp", "img/r-1-2649.webp", "img/f-1-3001.webp", "img/f-1-3005.webp", "img/r-1-2763.webp", "img/f-1-3204.webp", "img/f-1-3212.webp", "img/r-1-3042.webp", "img/f-1-3484.webp", "img/f-1-3492.webp", "img/r-1-3249.webp", "img/f-1-3633.webp", "img/f-1-3641.webp", "img/r-1-3529.webp", "img/f-1-3712.webp", "img/f-1-3720.webp", "img/r-1-3678.webp", "img/f-1-3818.webp", "img/f-1-3826.webp", "img/r-1-3757.webp", "img/f-1-4018.webp", "img/f-1-4026.webp", "img/r-1-3863.webp", "img/f-1-4170.webp", "img/f-1-4179.webp", "img/r-1-4063.webp", "img/f-1-4310.webp", "img/f-1-4319.webp", "img/r-1-4216.webp", "img/f-1-4430.webp", "img/f-1-4438.webp", "img/r-1-4356.webp", "img/f-1-4552.webp", "img/f-1-4560.webp", "img/r-1-4475.webp", "img/f-1-4657.webp", "img/f-1-4665.webp", "img/r-1-4597.webp", "img/f-1-4813.webp", "img/f-1-4821.webp", "img/r-1-4702.webp", "img/f-1-4987.webp", "img/f-1-4995.webp", "img/r-1-4858.webp", "img/f-1-5104.webp", "img/f-1-5112.webp", "img/r-1-5032.webp", "img/f-1-5240.webp", "img/f-1-5248.webp", "img/r-1-5149.webp", "img/f-1-5334.webp", "img/f-1-5342.webp", "img/r-1-5285.webp", "img/f-1-5587.webp", "img/f-1-5595.webp", "img/r-1-5424.webp"];
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
