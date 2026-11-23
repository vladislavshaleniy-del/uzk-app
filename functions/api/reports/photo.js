// Photo of a report: GET /api/reports/photo?id=N
import { CORS, ready } from '../../_lib/auth.js';
export async function onRequestGet({ request, env }) {
  if (!ready(env)) return new Response('off', { status: 503 });
  const id = +new URL(request.url).searchParams.get('id');
  const r = await env.DB.prepare('SELECT photo FROM reports WHERE id = ?1').bind(id).first();
  if (!r || !r.photo) return new Response('not found', { status: 404, headers: CORS });
  return new Response(new Uint8Array(r.photo), { headers: { 'content-type': 'image/jpeg', 'cache-control': 'public, max-age=86400', ...CORS } });
}
