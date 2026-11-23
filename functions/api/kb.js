// Public-services knowledge for the website's catalogue (the same text the assistant answers from).
import { BASE, KB, KB_CHECKED } from '../_lib/kb.js';
const H = { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=3600', 'access-control-allow-origin': '*' };
export const onRequestGet = () => new Response(JSON.stringify({ ok: true, checked: KB_CHECKED, base: BASE, list: KB.map(e => ({ id: e.id, go: e.go, t: e.t })) }), { headers: H });
