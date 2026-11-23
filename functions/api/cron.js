// Daily job (called by the GitHub Action): Telegram reminders 30, 7 and 1 day before a document expires.
// Safe to call repeatedly — each reminder is sent once.
import { json, ready, ensureDb, tgSend } from '../_lib/auth.js';
const NAMES = { passport: 'Паспорт', idcard: 'ID-карта', intl: 'Загранпаспорт', license: 'Водительское удостоверение', inspection: 'Техосмотр', insurance: 'Страховка ОСАГО', tinting: 'Разрешение на тонировку', gas: 'Газовый баллон (освидетельствование)', poa: 'Доверенность', other: 'Документ' };
export async function onRequestGet({ env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  await ensureDb(env);
  const today = new Date(Date.now() + 5 * 3600e3); today.setUTCHours(0, 0, 0, 0);
  const rows = ((await env.DB.prepare('SELECT d.*, u.tg_id FROM docs d JOIN users u ON u.id = d.user_id WHERE u.tg_id IS NOT NULL').all()).results) || [];
  let sent = 0;
  for (const d of rows) {
    const days = Math.round((Date.parse(d.expires + 'T00:00:00Z') - today.getTime()) / 864e5);
    const step = days <= 1 ? 4 : days <= 7 ? 2 : days <= 30 ? 1 : 0;   // bit flags: 1 = 30 days, 2 = 7 days, 4 = 1 day
    if (!step || days < -1 || (d.notified & step)) continue;
    const nm = NAMES[d.kind] + (d.title ? ` («${d.title}»)` : '');
    const when = days < 0 ? 'истёк' : days === 0 ? 'истекает сегодня' : days === 1 ? 'истекает завтра' : `истекает через ${days} дн.`;
    const r = await tgSend(env, 'sendMessage', { chat_id: d.tg_id, text: `⏰ Напоминание MyUzCity\n\n${nm}: срок ${when} (${d.expires.split('-').reverse().join('.')}).\nПродлить можно через my.gov.uz или в центре госуслуг.` });
    if (r.ok) { sent++; await env.DB.prepare('UPDATE docs SET notified = notified | ?1 | (CASE WHEN ?1 >= 2 THEN 1 ELSE 0 END) | (CASE WHEN ?1 >= 4 THEN 2 ELSE 0 END) WHERE user_id = ?2 AND kind = ?3 AND title = ?4').bind(step, d.user_id, d.kind, d.title).run(); }
  }
  return json({ ok: true, sent });
}
