// Telegram webhook of @MyUzCity_bot: "/start login_<nonce>" → asks to share the phone number →
// the contact (only the user's own) creates/updates the profile and confirms the waiting app login.
// GET /api/tg?setup=1 registers this URL as the bot's webhook (uses the secret token on the server only).
import { json, CORS, ensureDb, hookSecret, ready, BOT } from '../_lib/auth.js';

const TXT = {
  ru: { hi: 'Здравствуйте! Это вход в приложение MyUzCity.\n\nНажмите кнопку «📱 Поделиться номером» внизу — так мы подтвердим ваш номер телефона.', btn: '📱 Поделиться номером',
    ok: '✅ Готово! Номер {p} подтверждён, вы вошли в MyUzCity.\n\nВернитесь в приложение — вход завершится автоматически.', ok2: '✅ Номер {p} подтверждён. Откройте MyUzCity и нажмите «Войти через Telegram».',
    own: 'Пожалуйста, отправьте свой номер — кнопкой «📱 Поделиться номером».', open: 'Открыть MyUzCity', help: 'Чтобы войти в MyUzCity, откройте приложение и нажмите «Войти через Telegram».', old: 'Ссылка для входа устарела — нажмите «Войти через Telegram» в приложении ещё раз.' },
  uz: { hi: "Assalomu alaykum! Bu MyUzCity ilovasiga kirish.\n\nPastdagi «📱 Raqamni yuborish» tugmasini bosing — telefon raqamingizni tasdiqlaymiz.", btn: '📱 Raqamni yuborish',
    ok: "✅ Tayyor! {p} raqami tasdiqlandi, siz MyUzCity'ga kirdingiz.\n\nIlovaga qayting — kirish avtomatik yakunlanadi.", ok2: "✅ {p} raqami tasdiqlandi. MyUzCity'ni oching va «Telegram orqali kirish» tugmasini bosing.",
    own: "Iltimos, o'z raqamingizni «📱 Raqamni yuborish» tugmasi orqali yuboring.", open: 'MyUzCity’ni ochish', help: "MyUzCity'ga kirish uchun ilovani oching va «Telegram orqali kirish» tugmasini bosing.", old: "Kirish havolasi eskirgan — ilovada «Telegram orqali kirish» tugmasini yana bosing." },
  en: { hi: 'Hello! This is the sign-in for the MyUzCity app.\n\nTap “📱 Share my number” below so we can confirm your phone number.', btn: '📱 Share my number',
    ok: '✅ Done! Your number {p} is confirmed and you are signed in to MyUzCity.\n\nGo back to the app — sign-in will finish automatically.', ok2: '✅ Number {p} confirmed. Open MyUzCity and tap “Sign in with Telegram”.',
    own: 'Please send your own number with the “📱 Share my number” button.', open: 'Open MyUzCity', help: 'To sign in to MyUzCity, open the app and tap “Sign in with Telegram”.', old: 'This sign-in link has expired — tap “Sign in with Telegram” in the app again.' },
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
  await tg(env, 'setMyCommands', { commands: [{ command: 'start', description: 'Вход в MyUzCity' }] });
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

  if (m.contact) {
    if (m.contact.user_id !== m.from.id) { await askPhone(T.own); return new Response('ok'); }
    const phone = '+' + String(m.contact.phone_number).replace(/\D/g, '');
    const row = await env.DB.prepare(`INSERT INTO users (tg_id, phone, first_name, last_name, username, lang, created, last_login) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?7)
      ON CONFLICT(tg_id) DO UPDATE SET phone = excluded.phone, first_name = excluded.first_name, last_name = excluded.last_name, username = excluded.username, last_login = excluded.last_login RETURNING id`)
      .bind(m.from.id, phone, m.from.first_name || '', m.from.last_name || '', m.from.username || '', (m.from.language_code || '').slice(0, 2), now).first();
    const pend = await env.DB.prepare("SELECT nonce FROM logins WHERE chat_id = ?1 AND status = 'wait' AND created > ?2 ORDER BY created DESC LIMIT 1").bind(chat, now - 900).first();
    if (pend) await env.DB.prepare("UPDATE logins SET status = 'ok', user_id = ?1 WHERE nonce = ?2").bind(row.id, pend.nonce).run();
    await tg(env, 'sendMessage', { chat_id: chat, text: (pend ? T.ok : T.ok2).replace('{p}', fmtPhone(phone)), reply_markup: { remove_keyboard: true } });
    await tg(env, 'sendMessage', { chat_id: chat, text: '👇', reply_markup: { inline_keyboard: [[{ text: T.open, url: 'https://myuzcity.pages.dev/' }]] } });
    return new Response('ok');
  }
  const start = (m.text || '').match(/^\/start(?:\s+login_([A-Za-z0-9_-]{24,48}))?/);
  if (start) {
    await env.DB.prepare('DELETE FROM logins WHERE created < ?1').bind(now - 3600).run();
    if (start[1]) await env.DB.prepare("INSERT INTO logins (nonce, chat_id, status, created) VALUES (?1, ?2, 'wait', ?3) ON CONFLICT(nonce) DO NOTHING").bind(start[1], chat, now).run();
    await askPhone(T.hi);
    return new Response('ok');
  }
  await askPhone(T.help);
  return new Response('ok');
}
