// Listing photo: GET /api/market/photo?id=N&i=0
import { CORS, ready } from '../../_lib/auth.js';
export async function onRequestGet({ request, env }) {
  if (!ready(env)) return new Response('off', { status: 503 });
  const q = new URL(request.url).searchParams;
  const r = await env.DB.prepare("SELECT p.data FROM market_photos p JOIN market m ON m.id = p.ad_id WHERE p.ad_id = ?1 AND p.idx = ?2 AND m.status != 'removed'").bind(+q.get('id'), +q.get('i') || 0).first();
  if (!r || !r.data) return new Response('not found', { status: 404, headers: CORS });
  return new Response(new Uint8Array(r.data), { headers: { 'content-type': 'image/jpeg', 'cache-control': 'public, max-age=86400', ...CORS } });
}
