// Точки для живой карты на первом экране myuzcity.uz: реальные места Ташкента по категориям,
// в сжатом виде (координаты 0…1000 внутри рамки города). Источник — те же данные, что у приложения.
// Запуск: node scripts/build-dots.mjs (делает и workflow «Update live data» после обновления данных).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const read = p => (existsSync(root + p) ? JSON.parse(readFileSync(root + p, 'utf8')) : null);
const BOX = { lat0: 41.20, lat1: 41.42, lon0: 69.12, lon1: 69.42 }; // Ташкент
const q = (la, lo) => {
  if (!(la >= BOX.lat0 && la <= BOX.lat1 && lo >= BOX.lon0 && lo <= BOX.lon1)) return null;
  return [Math.round((lo - BOX.lon0) / (BOX.lon1 - BOX.lon0) * 1000), Math.round((BOX.lat1 - la) / (BOX.lat1 - BOX.lat0) * 1000)];
};
const out = { v: 1, updated: new Date().toISOString(), box: BOX, aspect: +(((BOX.lon1 - BOX.lon0) * Math.cos(41.31 * Math.PI / 180)) / (BOX.lat1 - BOX.lat0)).toFixed(3), c: {}, n: {} };
const add = (k, list) => {
  const flat = []; const seen = new Set();
  for (const x of list || []) { const p = q(x.la, x.lo); if (!p) continue; const key = p.join(','); if (seen.has(key)) continue; seen.add(key); flat.push(p[0], p[1]); }
  if (flat.length) { out.c[k] = flat; out.n[k] = flat.length / 2; }
};
for (const k of ['med', 'edu', 'gov', 'mosque', 'parking', 'ev', 'sight']) add(k, read(`data/poi/${k}/0.json`));
add('cafes', read('data/places/0.json'));
const tr = read('data/transit/0.json');
if (tr) { add('metro', tr.metro && tr.metro.st); add('bus', tr.bus && tr.bus.stops); }
const med = read('data/poi/med/0.json') || [];
out.n.med247 = med.filter(x => x.a === 'pharmacy' && x.h === '24/7').length;
writeFileSync(root + 'data/dots.json', JSON.stringify(out));
console.log('data/dots.json', Object.entries(out.n).map(([k, v]) => k + ' ' + v).join(', '));
