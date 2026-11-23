// Temporary hand-off for generated portal artwork: the browser uploads each picture once,
// a GitHub Action copies them into portal/art/ and this endpoint is then removed.
// Write-once, fixed names, WebP only, size-capped.
import { json, CORS, ready } from '../_lib/auth.js';
const NAMES = ['face1', 'face2', 'face3', 'face4', 'me1', 'me2'];
const ok = n => NAMES.includes(n);
const b64 = u8 => { let s = ''; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return btoa(s); };
async function table(env) { await env.DB.prepare('CREATE TABLE IF NOT EXISTS art (name TEXT PRIMARY KEY, data TEXT NOT NULL, created INTEGER NOT NULL)').run(); }
export const onRequestOptions = () => new Response(null, { headers: CORS });
export async function onRequestGet({ request, env }) {
  const n = new URL(request.url).searchParams.get('n') || '';
  if (!ready(env)) return json({ ok: false }, 503);
  await table(env);
  if (!n) { const r = await env.DB.prepare('SELECT name, length(data) AS l FROM art').all(); return json({ ok: true, list: r.results || [] }); }
  if (!ok(n)) return json({ ok: false }, 404);
  const r = await env.DB.prepare('SELECT data FROM art WHERE name = ?1').bind(n).first();
  if (!r) return json({ ok: false }, 404);
  const bin = Uint8Array.from(atob(r.data), c => c.charCodeAt(0));
  return new Response(bin, { headers: { 'content-type': 'image/webp', 'cache-control': 'no-store', ...CORS } });
}
export async function onRequestPost({ request, env }) {
  const n = new URL(request.url).searchParams.get('n') || '';
  if (!ready(env) || !ok(n)) return json({ ok: false }, 400);
  const u8 = new Uint8Array(await request.arrayBuffer());
  const magic = String.fromCharCode(...u8.slice(0, 4)) + String.fromCharCode(...u8.slice(8, 12));
  if (u8.length < 1000 || u8.length > 700000 || magic !== 'RIFFWEBP') return json({ ok: false, error: 'webp only, up to 700 KB' }, 400);
  await table(env);
  const r = await env.DB.prepare('INSERT OR IGNORE INTO art (name, data, created) VALUES (?1, ?2, ?3)').bind(n, b64(u8), Math.floor(Date.now() / 1000)).run();
  return json({ ok: true, stored: !!(r.meta && r.meta.changes), size: u8.length });
}
