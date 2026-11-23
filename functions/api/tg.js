// Telegram webhook of @MyUzCity_bot. Sign-in: the user shares their own phone number once,
// the bot replies with a 6-digit code that is entered in the app (POST /api/auth/code).
// Registered users get a fresh code on /start without sharing the number again.
// GET /api/tg?setup=1 registers this URL as the bot's webhook (the token stays on the server).
import { json, CORS, ensureDb, hookSecret, ready, BOT, newCode, displayName } from '../_lib/auth.js';

const TXT = {
  ru: { hi: 'Здравствуйте! Это вход в приложение MyUzCity.\n\nНажмите кнопку «📱 Поделиться номером» внизу — подтвердим номер и пришлём код для входа.', btn: '📱 Поделиться номером',
    code: '✅ Номер {p} подтверждён.\n\nКод для входа в MyUzCity:\n\n<code>{c}</code>\n\nВведите его в приложении. Код действует 10 минут.',
    again: 'Код для входа в MyUzCity:\n\n<code>{c}</code>\n\nВведите его в приложении. Код действует 10 минут.',
    own: 'Пожалуйста, отправьте свой номер — кнопкой «📱 Поделиться номером».', help: 'Чтобы получить код для входа в MyUzCity, нажмите «📱 Поделиться номером».' },
  uz: { hi: "Assalomu alaykum! Bu MyUzCity ilovasiga kirish.\n\nPastdagi «📱 Raqamni yuborish» tugmasini bosing — raqamni tasdiqlab, kirish kodini yuboramiz.", btn: '📱 Raqamni yuborish',
    code: "✅ {p} raqami tasdiqlandi.\n\nMyUzCity'ga kirish kodi:\n\n<code>{c}</code>\n\nUni ilovaga kiriting. Kod 10 daqiqa amal qiladi.",
    again: "MyUzCity'ga kirish kodi:\n\n<code>{c}</code>\n\nUni ilovaga kiriting. Kod 10 daqiqa amal qiladi.",
    own: "Iltimos, o'z raqamingizni «📱 Raqamni yuborish» tugmasi orqali yuboring.", help: "MyUzCity'ga kirish kodini olish uchun «📱 Raqamni yuborish» tugmasini bosing." },
  en: { hi: 'Hello! This is the sign-in for the MyUzCity app.\n\nTap “📱 Share my number” below — we will confirm your number and send a sign-in code.', btn: '📱 Share my number',
    code: '✅ Number {p} confirmed.\n\nYour MyUzCity sign-in code:\n\n<code>{c}</code>\n\nEnter it in the app. The code is valid for 10 minutes.',
    again: 'Your MyUzCity sign-in code:\n\n<code>{c}</code>\n\nEnter it in the app. The code is valid for 10 minutes.',
    own: 'Please send your own number with the “📱 Share my number” button.', help: 'To get a MyUzCity sign-in code, tap “📱 Share my number”.' },
};
const L = code => TXT[(code || '').slice(0, 2)] || TXT.ru;
const fmtPhone = p => { const d = String(p).replace(/\D/g, ''); return d.length === 12 && d.startsWith('998') ? `+998 ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10)}` : '+' + d; };

async function tg(env, method, body) {
  const r = await fetch(`https://api.telegram.org/bot${env.TG_BOT_TOKEN}/${method}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  return r.json().catch(() => ({}));
}

export const onRequestOptions = () => new Response(null, { headers: CORS });

export async function onRequestGet({ request, env }) {
  if (!ready(env)) return json({ ok: false, error: 'setup: add TG_BOT_TOKEN secret and DB binding' }, 503);
  const url = new URL(request.url);
  if (url.searchParams.get('setup') !== '1') return json({ ok: true, bot: BOT });
  await ensureDb(env);
  const hook = `${url.origin}/api/tg`;
  const r = await tg(env, 'setWebhook', { url: hook, secret_token: await hookSecret(env), allowed_updates: ['message'], drop_pending_updates: true });
  await tg(env, 'setMyCommands', { commands: [{ command: 'start', description: 'Код для входа в MyUzCity' }] });
  return json({ ok: !!r.ok, webhook: hook, telegram: r.description || '' });
}

export async function onRequestPost({ request, env }) {
  if (!ready(env)) return new Response('not configured', { status: 503 });
  if (request.headers.get('x-telegram-bot-api-secret-token') !== await hookSecret(env)) return new Response('forbidden', { status: 403 });
  let u; try { u = await request.json(); } catch { return new Response('ok'); }
  const m = u.message; if (!m || !m.from || m.chat.type !== 'private') return new Response('ok');
  await ensureDb(env);
  const T = L(m.from.language_code), now = Math.floor(Date.now() / 1000), chat = m.chat.id;
  const askPhone = text => tg(env, 'sendMessage', { chat_id: chat, text, reply_markup: { keyboard: [[{ text: T.btn, request_contact: true }]], resize_keyboard: true, one_time_keyboard: true } });
  const giveCode = async (uid, phone, fresh) => {
    // the app may also be waiting for this login (it opened the bot with login_<nonce>) — finish it too
    const pend = await env.DB.prepare("SELECT nonce FROM logins WHERE chat_id = ?1 AND status = 'wait' AND created > ?2 ORDER BY created DESC LIMIT 1").bind(chat, now - 900).first();
    if (pend) await env.DB.prepare("UPDATE logins SET status = 'ok', user_id = ?1 WHERE nonce = ?2").bind(uid, pend.nonce).run();
    const c = await newCode(env, uid, pend ? pend.nonce : null);
    await tg(env, 'sendMessage', { chat_id: chat, parse_mode: 'HTML', text: (fresh ? T.code : T.again).replace('{p}', fmtPhone(phone)).replace('{c}', c), reply_markup: { remove_keyboard: true } });
  };

  if (m.contact) {
    if (m.contact.user_id !== m.from.id) { await askPhone(T.own); return new Response('ok'); }
    const phone = '+' + String(m.contact.phone_number).replace(/\D/g, '');
    const row = await env.DB.prepare(`INSERT INTO users (tg_id, phone, first_name, last_name, username, lang, created, last_login) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?7)
      ON CONFLICT(tg_id) DO UPDATE SET phone = excluded.phone, first_name = excluded.first_name, last_name = excluded.last_name, username = excluded.username, last_login = excluded.last_login RETURNING id`)
      .bind(m.from.id, phone, m.from.first_name || '', m.from.last_name || '', m.from.username || '', (m.from.language_code || '').slice(0, 2), now).first();
    await giveCode(row.id, phone, true);
    return new Response('ok');
  }
  const trust = (m.text || '').match(/^\/start\s+trust_([A-Za-z0-9_-]{8,40})/);
  if (trust) {
    const inv = await env.DB.prepare('SELECT * FROM invites WHERE code = ?1 AND created > ?2').bind(trust[1], now - 7 * 86400).first();
    const owner = inv && await env.DB.prepare('SELECT * FROM users WHERE id = ?1').bind(inv.owner).first();
    if (!owner) { await tg(env, 'sendMessage', { chat_id: chat, text: 'Ссылка устарела — попросите отправить новую.' }); return new Response('ok'); }
    if (owner.tg_id === m.from.id) { await tg(env, 'sendMessage', { chat_id: chat, text: 'Эту ссылку нужно отправить близкому человеку, а не открывать самому 🙂' }); return new Response('ok'); }
    const nm = [m.from.first_name, m.from.last_name].filter(Boolean).join(' ') || (m.from.username ? '@' + m.from.username : 'Контакт');
    await env.DB.prepare('INSERT INTO trusted (owner, tg_id, name, created) VALUES (?1, ?2, ?3, ?4) ON CONFLICT(owner, tg_id) DO UPDATE SET name = excluded.name').bind(owner.id, m.from.id, nm, now).run();
    await tg(env, 'sendMessage', { chat_id: chat, text: `✅ Вы — доверенный контакт: ${displayName(owner)}.\n\nЕсли он(а) нажмёт тревожную кнопку в MyUzCity, этот бот сразу пришлёт вам сообщение и геолокацию. Не блокируйте бота.` });
    if (owner.tg_id) await tg(env, 'sendMessage', { chat_id: owner.tg_id, text: `👥 ${nm} теперь ваш доверенный контакт для тревожной кнопки.` });
    return new Response('ok');
  }
  const start = (m.text || '').match(/^\/start(?:\s+login_([A-Za-z0-9_-]{24,48}))?/);
  if (start) {
    await env.DB.prepare('DELETE FROM logins WHERE created < ?1').bind(now - 3600).run();
    if (start[1]) await env.DB.prepare("INSERT INTO logins (nonce, chat_id, status, created) VALUES (?1, ?2, 'wait', ?3) ON CONFLICT(nonce) DO NOTHING").bind(start[1], chat, now).run();
  }
  const known = await env.DB.prepare('SELECT id, phone FROM users WHERE tg_id = ?1').bind(m.from.id).first();
  if (known && known.phone) { await giveCode(known.id, known.phone, false); return new Response('ok'); }
  await askPhone(start ? T.hi : T.help);
  return new Response('ok');
}
