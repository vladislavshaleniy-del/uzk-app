// Daily job (called by the GitHub Action): Telegram reminders 30, 7 and 1 day before a document expires.
// Safe to call repeatedly — each reminder is sent once.
import { json, ready, ensureDb, tgSend } from '../_lib/auth.js';
const NAMES = { appt: 'Приём у врача', passport: 'Паспорт', idcard: 'ID-карта', intl: 'Загранпаспорт', license: 'Водительское удостоверение', inspection: 'Техосмотр', insurance: 'Страховка ОСАГО', tinting: 'Разрешение на тонировку', gas: 'Газовый баллон (освидетельствование)', poa: 'Доверенность', other: 'Документ' };
export async function onRequestGet({ env }) {
  if (!ready(env)) return json({ ok: false }, 503);
  await ensureDb(env);
  const today = new Date(Date.now() + 5 * 3600e3); today.setUTCHours(0, 0, 0, 0);
  const rows = ((await env.DB.prepare('SELECT d.*, u.tg_id FROM docs d JOIN users u ON u.id = d.user_id LEFT JOIN prefs p ON p.user_id = d.user_id WHERE u.tg_id IS NOT NULL AND (p.docs IS NULL OR p.docs = 1)').all()).results) || [];
  let sent = 0;
  for (const d of rows) {
    const days = Math.round((Date.parse(d.expires + 'T00:00:00Z') - today.getTime()) / 864e5);
    const step = days <= 1 ? 4 : days <= 7 ? 2 : days <= 30 ? 1 : 0;   // bit flags: 1 = 30 days, 2 = 7 days, 4 = 1 day
    if (d.kind === 'appt' && (days > 1 || days < 0)) continue;   // a doctor's appointment: only the day before and on the day
    if (!step || days < -1 || (d.notified & step)) continue;
    const nm = NAMES[d.kind] + (d.title ? ` («${d.title}»)` : '');
    const when = days < 0 ? 'истёк' : days === 0 ? 'истекает сегодня' : days === 1 ? 'истекает завтра' : `истекает через ${days} дн.`;
    const text = d.kind === 'appt' ? `🩺 Напоминание MyUzCity\n\n${d.title || 'Приём у врача'} — ${days === 0 ? 'сегодня' : 'завтра'} (${d.expires.split('-').reverse().join('.')}).` : `⏰ Напоминание MyUzCity\n\n${nm}: срок ${when} (${d.expires.split('-').reverse().join('.')}).\nПродлить можно через my.gov.uz или в центре госуслуг.`;
    const r = await tgSend(env, 'sendMessage', { chat_id: d.tg_id, text });
    if (r.ok) { sent++; await env.DB.prepare('UPDATE docs SET notified = notified | ?1 | (CASE WHEN ?1 >= 2 THEN 1 ELSE 0 END) | (CASE WHEN ?1 >= 4 THEN 2 ELSE 0 END) WHERE user_id = ?2 AND kind = ?3 AND title = ?4').bind(step, d.user_id, d.kind, d.title).run(); }
  }
  // air-quality warning once a day for those who turned it on (US AQI ≥ 151 — unhealthy)
  let air = null;
  const day = new Date(Date.now() + 5 * 3600e3).toISOString().slice(0, 10), H = new Date(Date.now() + 5 * 3600e3).getUTCHours();
  const done = await env.DB.prepare('SELECT v FROM flags WHERE k = ?1').bind('air:' + day).first();
  if (!done && H >= 8) {
    try {
      const a = await (await fetch('https://air-quality-api.open-meteo.com/v1/air-quality?latitude=41.3111&longitude=69.2797&current=us_aqi,pm2_5')).json();
      air = a.current ? Math.round(a.current.us_aqi) : null;
      if (air >= 151) {
        const us = ((await env.DB.prepare('SELECT u.tg_id FROM prefs p JOIN users u ON u.id = p.user_id WHERE p.air = 1 AND u.tg_id IS NOT NULL').all()).results) || [];
        for (const x of us) await tgSend(env, 'sendMessage', { chat_id: x.tg_id, text: `😷 Воздух в Ташкенте сейчас вредный: AQI ${air} (PM2.5 ${Math.round(a.current.pm2_5)} мкг/м³).\n\nСократите время на улице, особенно детям и пожилым; проветривайте реже, при выходе — маска FFP2/KN95.` });
        await env.DB.prepare('INSERT INTO flags (k, v) VALUES (?1, ?2) ON CONFLICT(k) DO UPDATE SET v = excluded.v').bind('air:' + day, String(air)).run();
      }
    } catch (e) {}
  }
  return json({ ok: true, sent, air });
}
