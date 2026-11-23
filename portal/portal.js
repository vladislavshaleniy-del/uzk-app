// MyUzCity portal: live data, the real app inside the phone, map, AI and partner form.
(() => {
  'use strict';
  const H = location.hostname, LOCAL = /^(localhost|127\.0\.0\.1)$/.test(H);
  const APP = /(^|\.)myuzcity\.uz$/.test(H) && !/^app\./.test(H) ? 'https://app.myuzcity.uz/' : '/';
  const API = LOCAL ? 'https://myuzcity.pages.dev' : '';
  const DATA = LOCAL ? '/' : 'https://vladislavshaleniy-del.github.io/uzk-app/';
  const TAS = [41.3111, 69.2797];
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ic = n => `<svg><use href="/portal/assets/icons.svg#i-${n}"/></svg>`;
  const getJ = u => fetch(u, { cache: 'no-cache' }).then(r => r.ok ? r.json() : null).catch(() => null);

  // ---------------- texts ----------------
  const T = {
    ru: {
      n_feat: 'Сервисы', n_map: 'Город на карте', n_ai: 'ИИ-ассистент', n_biz: 'Бизнесу', n_part: 'Партнёрам', cta_open: 'Открыть приложение',
      h_eyebrow: 'Умный город для Узбекистана', h_t: 'Весь город в одном приложении', h_s: 'Транспорт, медицина, госуслуги, махалля и ИИ-помощник. Бесплатно, на трёх языках.', h_how: 'Как это работает',
      st1_t: 'Метро, автобусы, поезда и самолёты', st1_s: 'Станции и маршруты рядом с вами, расписание поездов и живое табло аэропортов Узбекистана.', f_metro: 'станций метро', f_bus: 'маршрутов автобусов', f_air: 'аэропортов на табло',
      st2_t: 'Аптеки и клиники, открытые сейчас', st2_s: 'Карта с часами работы, маршрут пешком или на такси и онлайн-запись к врачу через DMED.', f_med: 'аптек и клиник в Ташкенте', f_103: 'скорая в один тап',
      st3_t: 'Яма, мусор, не горит свет? Сообщите', st3_s: 'Фото и точка на карте. Сообщение видят соседи и ответственные службы, статус приходит вам в Telegram.',
      st4_t: 'Махалля онлайн', st4_s: 'Чат соседей, опросы махалли с честным подсчётом голосов и мечети рядом со временем намаза.',
      st5_t: 'Тревожная кнопка', st5_s: 'Одно нажатие, и близкие получают вашу геолокацию в Telegram. Плюс экстренные службы 101, 102, 103, 104.',
      st6_t: 'Документы под контролем', st6_s: 'Сроки паспорта, прав, страховки и техосмотра. Бот напомнит за 30, 7 и 1 день.',
      st7_t: 'Маркетплейс соседей', st7_s: 'Продайте ненужное или отдайте даром людям из вашего города. Связь через Telegram.',
      go_open: 'Открыть раздел', try: 'Нажмите, чтобы попробовать',
      stats_t: 'Ташкент в приложении уже сегодня', s_cafes: 'кафе и ресторанов', s_parking: 'парковок', s_med: 'аптек и клиник', s_edu: 'школ, детсадов и вузов', s_gov: 'госучреждений', s_mosque: 'мечетей', s_stops: 'остановок транспорта', s_cams: 'камер скорости',
      stats_src: 'Данные OpenStreetMap и открытых источников. Обновляются автоматически каждые 2 часа.',
      mo_t: 'Сервисы под ваши жизненные ситуации', mo_s: 'Не ищите нужную службу или приложение. Выберите ситуацию, всё нужное уже собрано.', mo_go: 'Открыть',
      pi_t: 'Три опоры умного города', pi1_t: 'Доверие', pi1_s: 'Вход через Telegram без паспортных данных. Ваши документы и машины видите только вы. Аккаунт удаляется в один тап.', pi1_l: 'Политика конфиденциальности', tv1: 'Паспортные данные не нужны', tv2: 'Документы видите только вы', tv3: 'Удалить аккаунт в один тап',
      pi2_t: 'Сообщество', pi2_s: 'Сообщения о проблемах, опросы и чат махалли. Голос каждого жителя виден и учтён.', pi2_polls: 'активных опросов', pi2_votes: 'голосов жителей',
      pi3_t: 'Рост', pi3_s: 'Маркетплейс соседей, программы для бизнеса, IPO госкомпаний и недвижимость.', pi4_t: 'Говорит на вашем языке',
      pi5_t: 'ИИ, который знает город', pi5_s: 'Подскажет ближайшую аптеку, время намаза и как оформить загранпаспорт. Голосом или текстом.', pi5_l: 'Спросить сейчас',
      map_t: 'Город на карте', map_s: 'Включайте слои и смотрите, что рядом. Это живые данные из приложения.', map_n: 'точек на карте',
      L_med: 'Аптеки и клиники', L_parking: 'Парковки', L_mosque: 'Мечети', L_edu: 'Школы и детсады', L_gov: 'Госучреждения', L_speedcam: 'Камеры скорости', L_cafes: 'Кафе', L_ev: 'Электрозарядки',
      ai_t: 'Спросите что угодно о городе', ai_s: 'Это настоящий ИИ-помощник MyUzCity. Отвечает на узбекском, русском и английском.', ai_ph: 'Например: где ближайшая аптека 24/7?', ai_hi: 'Здравствуйте! Я помощник MyUzCity. Спросите о транспорте, госуслугах, здоровье, ценах или о том, что посмотреть в городе.', ai_err: 'Не получилось ответить. Попробуйте ещё раз.',
      ai_q: ['Как оформить загранпаспорт?', 'Сколько стоит проезд в метро?', 'Какие документы нужны для детского сада?', 'Что посмотреть в Ташкенте за выходные?'],
      lv_t: 'Город прямо сейчас', w_wx: 'Погода в Ташкенте', w_feels: 'ощущается как', w_air: 'Воздух', w_fx: 'Курсы ЦБ', w_conv: 'сум', w_pr: 'Время намаза', w_next: 'Следующий', w_in: 'через', w_fl: 'Вылеты из Ташкента', w_nw: 'Новости', w_more: 'Все новости в приложении', w_board: 'Табло в приложении', w_none: 'Сейчас нет данных',
      aq: ['Хороший', 'Умеренный', 'Вредно для чувствительных', 'Вредный', 'Очень вредный', 'Опасный'], pr: ['Фаджр', 'Восход', 'Зухр', 'Аср', 'Магриб', 'Иша'], days: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'], min: 'мин', h: 'ч',
      fls: { sc: 'По расписанию', dl: 'Задерживается', cx: 'Отменён', bd: 'Посадка', dp: 'Вылетел', ld: 'Прибыл', ex: 'Ожидается', ci: 'Регистрация' },
      pt_t: 'Для города, бизнеса и инвесторов', pt_gov: 'Хокимиятам', pt_biz: 'Бизнесу', pt_inv: 'Инвесторам',
      pf_t: 'Обсудим сотрудничество', pf_name: 'Имя и организация', pf_contact: 'Телефон или Telegram', pf_msg: 'Чем можем быть полезны', pf_send: 'Отправить заявку', pf_ok: 'Спасибо! Заявка у команды, мы свяжемся с вами.', pf_err: 'Не отправилось. Напишите нам в Telegram: @MyUzCity_bot',
      g_t: 'Откройте MyUzCity', g_s: 'Работает в браузере на любом телефоне. Добавьте на главный экран, и приложение будет открываться с иконки.', g_bot: 'Бот в Telegram', g_inst: 'Установить на телефон', g_inst_s: 'Установить', g_ios: 'Safari → «Поделиться» → «На экран „Домой“»', g_and: 'Chrome → меню ⋮ → «Установить приложение»', g_scan: 'Отсканируйте QR камерой телефона: откроется установка', g_qr: 'Наведите камеру телефона',
      f_priv: 'Политика конфиденциальности', f_app: 'Приложение', f_src: 'Данные: OpenStreetMap, Open-Meteo, ЦБ Республики Узбекистан, Uzbekistan Airports, новостные издания Узбекистана.',
      title: 'MyUzCity · Весь город в одном приложении',
    },
    uz: {
      n_feat: 'Xizmatlar', n_map: 'Shahar xaritada', n_ai: 'AI-yordamchi', n_biz: 'Biznesga', n_part: 'Hamkorlarga', cta_open: 'Ilovani ochish',
      h_eyebrow: "O'zbekiston uchun aqlli shahar", h_t: 'Butun shahar bitta ilovada', h_s: "Transport, tibbiyot, davlat xizmatlari, mahalla va AI-yordamchi. Bepul, uch tilda.", h_how: 'Qanday ishlaydi',
      st1_t: 'Metro, avtobus, poyezd va samolyot', st1_s: "Yaqin bekat va yo'nalishlar, poyezdlar jadvali va O'zbekiston aeroportlarining jonli tablosi.", f_metro: 'metro bekati', f_bus: "avtobus yo'nalishi", f_air: 'aeroport tablosi',
      st2_t: 'Hozir ochiq dorixona va klinikalar', st2_s: "Ish vaqti ko'rsatilgan xarita, piyoda yoki taksida yo'l va DMED orqali shifokorga onlayn yozilish.", f_med: 'Toshkentdagi dorixona va klinika', f_103: 'tez yordam bir bosishda',
      st3_t: "Chuqur, axlat, chiroq yonmayaptimi? Xabar bering", st3_s: "Surat va xaritadagi nuqta. Xabarni qo'shnilar va mas'ul xizmatlar ko'radi, holati Telegramga keladi.",
      st4_t: 'Mahalla onlayn', st4_s: "Qo'shnilar chati, halol ovoz sanash bilan mahalla so'rovnomalari va namoz vaqti bilan yaqin masjidlar.",
      st5_t: 'Xavf tugmasi', st5_s: "Bir bosish va yaqinlaringiz Telegramda joylashuvingizni oladi. Shuningdek 101, 102, 103, 104 favqulodda xizmatlari.",
      st6_t: 'Hujjatlar nazoratda', st6_s: "Pasport, guvohnoma, sug'urta va texko'rik muddatlari. Bot 30, 7 va 1 kun oldin eslatadi.",
      st7_t: "Qo'shnilar marketpleysi", st7_s: "Keraksiz narsani soting yoki shahringiz odamlariga tekin bering. Aloqa Telegram orqali.",
      go_open: "Bo'limni ochish", try: "Sinab ko'rish uchun bosing",
      stats_t: 'Toshkent ilovada bugundanoq', s_cafes: 'kafe va restoran', s_parking: 'parkovka', s_med: 'dorixona va klinika', s_edu: "maktab, bog'cha va OTM", s_gov: 'davlat muassasasi', s_mosque: 'masjid', s_stops: 'transport bekati', s_cams: 'tezlik kamerasi',
      stats_src: "OpenStreetMap va ochiq manbalar ma'lumotlari. Har 2 soatda avtomatik yangilanadi.",
      mo_t: 'Hayotiy vaziyatlaringiz uchun xizmatlar', mo_s: "Kerakli xizmat yoki ilovani qidirmang. Vaziyatni tanlang, kerakli hammasi yig'ilgan.", mo_go: 'Ochish',
      pi_t: 'Aqlli shaharning uch tayanchi', pi1_t: 'Ishonch', pi1_s: "Pasport ma'lumotlarisiz Telegram orqali kirish. Hujjat va mashinalaringizni faqat siz ko'rasiz. Hisob bir bosishda o'chiriladi.", pi1_l: 'Maxfiylik siyosati', tv1: "Pasport ma'lumotlari kerak emas", tv2: "Hujjatlarni faqat siz ko'rasiz", tv3: "Hisobni bir bosishda o'chirish",
      pi2_t: 'Jamiyat', pi2_s: "Muammolar haqida xabarlar, so'rovnomalar va mahalla chati. Har bir aholining ovozi ko'rinadi va hisobga olinadi.", pi2_polls: "faol so'rovnoma", pi2_votes: 'aholi ovozi',
      pi3_t: "O'sish", pi3_s: "Qo'shnilar marketpleysi, biznes dasturlari, davlat kompaniyalari IPO va ko'chmas mulk.", pi4_t: 'Sizning tilingizda',
      pi5_t: 'Shaharni biladigan AI', pi5_s: "Eng yaqin dorixona, namoz vaqti va xorijga pasport olishni aytib beradi. Ovoz yoki matn bilan.", pi5_l: "Hozir so'rash",
      map_t: 'Shahar xaritada', map_s: "Qatlamlarni yoqing va yaqin atrofni ko'ring. Bu ilovadagi jonli ma'lumotlar.", map_n: 'nuqta xaritada',
      L_med: 'Dorixona va klinikalar', L_parking: 'Parkovkalar', L_mosque: 'Masjidlar', L_edu: "Maktab va bog'chalar", L_gov: 'Davlat muassasalari', L_speedcam: 'Tezlik kameralari', L_cafes: 'Kafelar', L_ev: 'Elektr zaryadlash',
      ai_t: "Shahar haqida istalgan narsani so'rang", ai_s: "Bu MyUzCity'ning haqiqiy AI-yordamchisi. O'zbek, rus va ingliz tillarida javob beradi.", ai_ph: "Masalan: eng yaqin 24/7 dorixona qayerda?", ai_hi: "Assalomu alaykum! Men MyUzCity yordamchisiman. Transport, davlat xizmatlari, sog'liq, narxlar yoki shaharda nimani ko'rish haqida so'rang.", ai_err: "Javob bera olmadim. Yana urinib ko'ring.",
      ai_q: ['Xorijga chiqish pasportini qanday olaman?', "Metroda yo'l haqi qancha?", "Bog'cha uchun qanday hujjatlar kerak?", "Dam olish kunlari Toshkentda nimani ko'rish mumkin?"],
      lv_t: 'Shahar hozir', w_wx: 'Toshkentda ob-havo', w_feels: 'his qilinadi', w_air: 'Havo', w_fx: 'MB kurslari', w_conv: "so'm", w_pr: 'Namoz vaqtlari', w_next: 'Keyingisi', w_in: 'qoldi', w_fl: 'Toshkentdan uchishlar', w_nw: 'Yangiliklar', w_more: 'Barcha yangiliklar ilovada', w_board: 'Tablo ilovada', w_none: "Hozircha ma'lumot yo'q",
      aq: ['Yaxshi', "O'rtacha", 'Sezgirlar uchun zararli', 'Zararli', 'Juda zararli', 'Xavfli'], pr: ['Bomdod', 'Quyosh', 'Peshin', 'Asr', 'Shom', 'Xufton'], days: ['Ya', 'Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh'], min: 'daq', h: 'soat',
      fls: { sc: "Jadval bo'yicha", dl: 'Kechikmoqda', cx: 'Bekor qilindi', bd: 'Chiqish', dp: 'Uchib ketdi', ld: 'Yetib keldi', ex: 'Kutilmoqda', ci: "Ro'yxatdan o'tish" },
      pt_t: 'Shahar, biznes va investorlar uchun', pt_gov: 'Hokimliklarga', pt_biz: 'Biznesga', pt_inv: 'Investorlarga',
      pf_t: 'Hamkorlikni muhokama qilamiz', pf_name: 'Ism va tashkilot', pf_contact: 'Telefon yoki Telegram', pf_msg: 'Qanday yordam bera olamiz', pf_send: 'Ariza yuborish', pf_ok: "Rahmat! Ariza jamoada, siz bilan bog'lanamiz.", pf_err: 'Yuborilmadi. Telegramda yozing: @MyUzCity_bot',
      g_t: "MyUzCity'ni oching", g_s: "Har qanday telefonda brauzerda ishlaydi. Bosh ekranga qo'shing, ilova belgidan ochiladi.", g_bot: 'Telegram bot', g_qr: 'Telefon kamerasini qarating', g_inst: "Telefonga o'rnatish", g_inst_s: "O'rnatish", g_ios: "Safari → «Ulashish» → «Bosh ekranga»", g_and: "Chrome → menyu ⋮ → «Ilovani o'rnatish»", g_scan: "QR-kodni telefon kamerasi bilan skanerlang: o'rnatish ochiladi",
      f_priv: 'Maxfiylik siyosati', f_app: 'Ilova', f_src: "Ma'lumotlar: OpenStreetMap, Open-Meteo, O'zbekiston Respublikasi Markaziy banki, Uzbekistan Airports, O'zbekiston nashrlari.",
      title: 'MyUzCity · Butun shahar bitta ilovada',
    },
    en: {
      n_feat: 'Services', n_map: 'City map', n_ai: 'AI assistant', n_biz: 'Business', n_part: 'Partners', cta_open: 'Open the app',
      h_eyebrow: 'A smart city for Uzbekistan', h_t: 'Your whole city in one app', h_s: 'Transport, healthcare, public services, mahalla and an AI assistant. Free, in three languages.', h_how: 'See how it works',
      st1_t: 'Metro, buses, trains and flights', st1_s: 'Stops and routes near you, train timetables and live departure boards of Uzbekistan’s airports.', f_metro: 'metro stations', f_bus: 'bus routes', f_air: 'airport boards',
      st2_t: 'Pharmacies and clinics open now', st2_s: 'A map with opening hours, walking or taxi routes and online doctor booking via DMED.', f_med: 'pharmacies and clinics in Tashkent', f_103: 'ambulance in one tap',
      st3_t: 'Pothole, litter, broken light? Report it', st3_s: 'A photo and a point on the map. Neighbours and city services see it, and the status comes to your Telegram.',
      st4_t: 'Mahalla online', st4_s: 'A neighbours’ chat, mahalla polls with honest vote counting and nearby mosques with prayer times.',
      st5_t: 'Panic button', st5_s: 'One tap and your loved ones get your location in Telegram. Plus emergency lines 101, 102, 103, 104.',
      st6_t: 'Documents under control', st6_s: 'Passport, licence, insurance and inspection expiry. The bot reminds you 30, 7 and 1 day before.',
      st7_t: 'Neighbours’ marketplace', st7_s: 'Sell what you no longer need or give it away to people in your city. Contact via Telegram.',
      go_open: 'Open this section', try: 'Tap to try it',
      stats_t: 'Tashkent in the app, today', s_cafes: 'cafes and restaurants', s_parking: 'parking areas', s_med: 'pharmacies and clinics', s_edu: 'schools, kindergartens, universities', s_gov: 'public offices', s_mosque: 'mosques', s_stops: 'transit stops', s_cams: 'speed cameras',
      stats_src: 'Data from OpenStreetMap and open sources. Refreshed automatically every 2 hours.',
      mo_t: 'Services for the moments of your life', mo_s: 'No need to hunt for the right office or app. Pick the situation, everything is already there.', mo_go: 'Open',
      pi_t: 'Three pillars of a smart city', pi1_t: 'Trust', pi1_s: 'Sign in with Telegram, no passport data. Only you see your documents and cars. Delete your account in one tap.', pi1_l: 'Privacy policy', tv1: 'No passport data needed', tv2: 'Only you see your documents', tv3: 'Delete your account in one tap',
      pi2_t: 'Community', pi2_s: 'Problem reports, polls and the mahalla chat. Every resident’s voice is seen and counted.', pi2_polls: 'active polls', pi2_votes: 'resident votes',
      pi3_t: 'Growth', pi3_s: 'A neighbours’ marketplace, business programmes, state company IPOs and real estate.', pi4_t: 'Speaks your language',
      pi5_t: 'An AI that knows the city', pi5_s: 'Finds the nearest pharmacy, prayer times and how to get a passport. By voice or text.', pi5_l: 'Ask now',
      map_t: 'The city on a map', map_s: 'Turn layers on and see what is around. These are the live data from the app.', map_n: 'points on the map',
      L_med: 'Pharmacies and clinics', L_parking: 'Parking', L_mosque: 'Mosques', L_edu: 'Schools', L_gov: 'Public offices', L_speedcam: 'Speed cameras', L_cafes: 'Cafes', L_ev: 'EV chargers',
      ai_t: 'Ask anything about the city', ai_s: 'This is the real MyUzCity assistant. It answers in Uzbek, Russian and English.', ai_ph: 'e.g. where is the nearest 24/7 pharmacy?', ai_hi: 'Hello! I am the MyUzCity assistant. Ask about transport, public services, health, prices or what to see in the city.', ai_err: 'Could not answer. Please try again.',
      ai_q: ['How do I get a passport for travel?', 'How much is the metro fare?', 'What documents does a kindergarten need?', 'What to see in Tashkent at the weekend?'],
      lv_t: 'The city right now', w_wx: 'Weather in Tashkent', w_feels: 'feels like', w_air: 'Air', w_fx: 'Central Bank rates', w_conv: 'UZS', w_pr: 'Prayer times', w_next: 'Next', w_in: 'in', w_fl: 'Departures from Tashkent', w_nw: 'News', w_more: 'All news in the app', w_board: 'Full board in the app', w_none: 'No data right now',
      aq: ['Good', 'Moderate', 'Unhealthy for sensitive', 'Unhealthy', 'Very unhealthy', 'Hazardous'], pr: ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'], days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], min: 'min', h: 'h',
      fls: { sc: 'Scheduled', dl: 'Delayed', cx: 'Cancelled', bd: 'Boarding', dp: 'Departed', ld: 'Landed', ex: 'Expected', ci: 'Check-in' },
      pt_t: 'For the city, business and investors', pt_gov: 'City halls', pt_biz: 'Business', pt_inv: 'Investors',
      pf_t: 'Let’s work together', pf_name: 'Name and organisation', pf_contact: 'Phone or Telegram', pf_msg: 'How can we help', pf_send: 'Send request', pf_ok: 'Thank you! The team has your request and will contact you.', pf_err: 'Not sent. Write to us on Telegram: @MyUzCity_bot',
      g_t: 'Open MyUzCity', g_s: 'Works in the browser on any phone. Add it to your home screen and it opens from an icon.', g_bot: 'Telegram bot', g_qr: 'Point your phone camera', g_inst: 'Install on your phone', g_inst_s: 'Install', g_ios: 'Safari → Share → Add to Home Screen', g_and: 'Chrome → menu ⋮ → Install app', g_scan: 'Scan the QR with your phone camera to install',
      f_priv: 'Privacy policy', f_app: 'App', f_src: 'Data: OpenStreetMap, Open-Meteo, Central Bank of Uzbekistan, Uzbekistan Airports, Uzbek news outlets.',
      title: 'MyUzCity · Your whole city in one app',
    },
  };
  const MOMENTS = [
    { ic: 'house-line', a: '#1A5530', b: '#0B2413', go: '1:996', sv: 'map', t: { ru: 'Переезжаю в новый район', uz: 'Yangi mahallaga ko‘chyapman', en: 'Moving to a new area' }, li: { ru: ['Поликлиники и аптеки рядом', 'Школы и детские сады', 'Махалля, соседи и чат'], uz: ['Yaqin poliklinika va dorixonalar', "Maktab va bog'chalar", "Mahalla, qo'shnilar va chat"], en: ['Clinics and pharmacies nearby', 'Schools and kindergartens', 'Mahalla, neighbours and chat'] } },
    { ic: 'graduation-cap', a: '#3B4A16', b: '#0B2413', go: '1:3042', sv: 'edu', t: { ru: 'Ребёнок идёт в школу или сад', uz: "Farzand maktab yoki bog'chaga", en: 'A child starts school' }, li: { ru: ['Электронный дневник eMaktab', 'Очередь в детский сад', 'Школы и детсады на карте'], uz: ['eMaktab elektron kundaligi', "Bog'chaga navbat", "Maktab va bog'chalar xaritada"], en: ['eMaktab e-diary', 'Kindergarten queue', 'Schools on the map'] } },
    { ic: 'car', a: '#14424A', b: '#0B2413', go: '1:4858', sv: 'transport', t: { ru: 'Купил машину', uz: 'Mashina oldim', en: 'I bought a car' }, li: { ru: ['Мои автомобили в профиле', 'Штрафы через Road24', 'Парковки, зарядки и камеры'], uz: ['Profilda mashinalarim', 'Road24 orqali jarimalar', 'Parkovka, zaryadlash va kameralar'], en: ['My cars in the profile', 'Fines via Road24', 'Parking, chargers and cameras'] } },
    { ic: 'heartbeat', a: '#4A1F1F', b: '#0B2413', go: '1:5032', sv: 'health', t: { ru: 'Заболел', uz: 'Kasal bo‘lib qoldim', en: 'I feel unwell' }, li: { ru: ['Аптеки, открытые сейчас', 'Запись к врачу через DMED', 'Скорая 103 в один тап'], uz: ['Hozir ochiq dorixonalar', 'DMED orqali shifokorga yozilish', 'Tez yordam 103 bir bosishda'], en: ['Pharmacies open now', 'Book a doctor via DMED', 'Ambulance 103 in one tap'] } },
    { ic: 'airplane-tilt', a: '#1A3A5A', b: '#0B2413', go: 'h:transport', sv: 'transport', t: { ru: 'Еду в другой город', uz: 'Boshqa shaharga boryapman', en: 'Travelling to another city' }, li: { ru: ['Поезда Afrosiyob и Sharq', 'Табло 11 аэропортов', 'Билеты на поезд, самолёт и автобус'], uz: ['Afrosiyob va Sharq poyezdlari', '11 aeroport tablosi', 'Poyezd, samolyot va avtobus chiptalari'], en: ['Afrosiyob and Sharq trains', 'Boards of 11 airports', 'Train, flight and bus tickets'] } },
    { ic: 'megaphone', a: '#4A3A12', b: '#0B2413', go: 'h:reports', p: 'road', sv: 'mahalla', t: { ru: 'Хочу улучшить свой двор', uz: 'Hovlimni yaxshilamoqchiman', en: 'I want a better neighbourhood' }, li: { ru: ['Сообщить о проблеме с фото', 'Опросы города и махалли', 'Обращение к хокиму'], uz: ['Suratli muammo xabari', "Shahar va mahalla so'rovnomalari", 'Hokimga murojaat'], en: ['Report a problem with a photo', 'City and mahalla polls', 'Appeal to the hokim'] } },
    { ic: 'moon-stars', a: '#143A33', b: '#0B2413', go: '1:3529', sv: 'faith', t: { ru: 'Время намаза', uz: 'Namoz vaqti', en: 'Prayer time' }, li: { ru: ['Точное время для вашего города', 'Мечети рядом на карте', 'Маршрут до мечети'], uz: ['Shahringiz uchun aniq vaqt', 'Yaqin masjidlar xaritada', "Masjidgacha yo'l"], en: ['Exact times for your city', 'Mosques nearby', 'Route to the mosque'] } },
    { ic: 'fork-knife', a: '#4A2A14', b: '#0B2413', go: 'h:cafes', sv: 'leisure', t: { ru: 'Свободный вечер', uz: "Bo'sh oqshom", en: 'A free evening' }, li: { ru: ['Кафе и рестораны с ИИ-гидом', 'Афиша событий', 'Достопримечательности'], uz: ['AI-gid bilan kafe va restoranlar', 'Tadbirlar afishasi', 'Diqqatga sazovor joylar'], en: ['Cafes with an AI guide', 'Events', 'Sights'] } },
  ];
  const TABS = {
    gov: [['map-pin', { ru: 'Обращения жителей на карте', uz: 'Aholi murojaatlari xaritada', en: 'Residents’ reports on a map' }, { ru: 'Фото, точное место и поддержка соседей. Статус «в работе» или «решено» в один тап, житель сразу получает уведомление.', uz: "Surat, aniq joy va qo'shnilar qo'llovi. «Ishda» yoki «hal qilindi» holati bir bosishda, aholi darhol xabar oladi.", en: 'Photo, exact place and neighbours’ support. Mark “in progress” or “solved” in one tap, the resident is notified at once.' }],
      ['chart-bar', { ru: 'Опросы города и махалли', uz: "Shahar va mahalla so'rovnomalari", en: 'City and mahalla polls' }, { ru: 'Один житель, один голос: вход через Telegram исключает накрутку.', uz: "Bir aholi, bir ovoz: Telegram orqali kirish soxta ovozlarni istisno qiladi.", en: 'One resident, one vote: Telegram sign-in prevents fake votes.' }],
      ['bell-ringing', { ru: 'Прямой канал к жителям', uz: "Aholiga to'g'ridan-to'g'ri kanal", en: 'A direct line to residents' }, { ru: 'Напоминания, предупреждения о качестве воздуха и новости района через Telegram-бот.', uz: "Eslatmalar, havo sifati ogohlantirishlari va tuman yangiliklari Telegram-bot orqali.", en: 'Reminders, air-quality alerts and district news via the Telegram bot.' }]],
    biz: [['storefront', { ru: 'Заведения на карте', uz: 'Muassasalar xaritada', en: 'Your venue on the map' }, { ru: 'Кафе, аптеки и магазины видны жителям рядом, с часами работы и маршрутом.', uz: "Kafe, dorixona va do'konlar yaqin aholiga ish vaqti va yo'li bilan ko'rinadi.", en: 'Cafes, pharmacies and shops are visible to nearby residents with hours and directions.' }],
      ['sparkle', { ru: 'Рекомендации ИИ', uz: 'AI tavsiyalari', en: 'AI recommendations' }, { ru: 'Помощник подсказывает жителям места под их запрос: «где поесть плов рядом».', uz: "Yordamchi aholiga so'roviga mos joylarni tavsiya qiladi: «yaqin atrofda osh qayerda».", en: 'The assistant suggests places for each request, such as “plov nearby”.' }],
      ['shopping-bag', { ru: 'Маркетплейс города', uz: 'Shahar marketpleysi', en: 'City marketplace' }, { ru: 'Объявления жителей и бизнеса вашего города с прямой связью через Telegram.', uz: "Shahringiz aholisi va biznesining e'lonlari, Telegram orqali to'g'ridan-to'g'ri aloqa.", en: 'Listings from residents and businesses with direct contact via Telegram.' }]],
    inv: [['device-mobile', { ru: 'Готовый продукт', uz: 'Tayyor mahsulot', en: 'A working product' }, { ru: 'Больше 30 городских сервисов, 4 языка, свой ИИ-помощник и бот в Telegram. Работает в браузере на любом телефоне.', uz: "30 dan ortiq shahar xizmati, 4 til, o'z AI-yordamchisi va Telegram bot. Har qanday telefonda brauzerda ishlaydi.", en: 'Over 30 city services, 4 languages, its own AI assistant and a Telegram bot. Runs in any phone browser.' }],
      ['stack', { ru: 'Живые данные', uz: "Jonli ma'lumotlar", en: 'Live data' }, { ru: 'Транспорт, медицина, погода, курсы и новости обновляются автоматически.', uz: "Transport, tibbiyot, ob-havo, kurslar va yangiliklar avtomatik yangilanadi.", en: 'Transport, healthcare, weather, rates and news update automatically.' }],
      ['chart-line-up', { ru: 'Модель роста', uz: "O'sish modeli", en: 'Growth model' }, { ru: 'Подписка для хокимиятов, продвижение бизнеса на карте и партнёрские комиссии за билеты и услуги.', uz: "Hokimliklar uchun obuna, xaritada biznesni targ'ib qilish va chipta va xizmatlar uchun hamkorlik komissiyalari.", en: 'Subscriptions for city halls, business promotion on the map and partner commissions on tickets and services.' }]],
  };
  const TICK = [
    ['train', '#EF4444', 'Метро', 'Metro', 'Metro'], ['bus', '#3B82F6', 'Автобусы и маршрутки', 'Avtobuslar', 'Buses'], ['airplane-tilt', '#8B5CF6', 'Табло аэропортов', 'Aeroport tablosi', 'Airport boards'],
    ['car', '#F59E0B', 'Такси', 'Taksi', 'Taxi'], ['pill', '#22C55E', 'Аптеки 24/7', 'Dorixonalar 24/7', 'Pharmacies 24/7'], ['stethoscope', '#14B8A6', 'Запись к врачу', 'Shifokorga yozilish', 'Doctor booking'],
    ['bank', '#F2B45A', 'Госуслуги', 'Davlat xizmatlari', 'Public services'], ['scales', '#F87171', 'Штрафы', 'Jarimalar', 'Fines'], ['map-pin', '#60A5FA', 'Парковки', 'Parkovkalar', 'Parking'],
    ['video-camera', '#F87171', 'Камеры', 'Kameralar', 'Cameras'], ['charging-station', '#FACC15', 'Электрозарядки', 'Elektr zaryadlash', 'EV chargers'], ['cloud-sun', '#38BDF8', 'Погода и воздух', 'Ob-havo va havo', 'Weather and air'],
    ['currency-dollar', '#4ADE80', 'Курсы валют', 'Valyuta kurslari', 'Exchange rates'], ['moon-stars', '#2DD4BF', 'Время намаза', 'Namoz vaqti', 'Prayer times'], ['mosque', '#2DD4BF', 'Мечети', 'Masjidlar', 'Mosques'],
    ['graduation-cap', '#A78BFA', 'Школы и детсады', "Maktab va bog'chalar", 'Schools'], ['ticket', '#FB923C', 'Афиша', 'Afisha', 'Events'], ['newspaper', '#94A3B8', 'Новости', 'Yangiliklar', 'News'],
    ['chart-bar', '#F2B45A', 'Опросы махалли', "Mahalla so'rovnomalari", 'Mahalla polls'], ['chat-circle-dots', '#14B8A6', 'Чат соседей', "Qo'shnilar chati", 'Neighbours chat'], ['storefront', '#FB923C', 'Маркетплейс', 'Marketpleys', 'Marketplace'],
    ['siren', '#EF4444', 'Тревожная кнопка', 'Xavf tugmasi', 'Panic button'], ['identification-card', '#A78BFA', 'Документы', 'Hujjatlar', 'Documents'], ['megaphone', '#F59E0B', 'Сообщить о проблеме', 'Muammo haqida xabar', 'Report a problem'],
    ['sparkle', '#F2B45A', 'ИИ-помощник', 'AI-yordamchi', 'AI assistant'], ['microphone', '#F2B45A', 'Голосовой ввод', 'Ovozli kiritish', 'Voice input'], ['compass', '#38BDF8', 'Достопримечательности', 'Diqqatga sazovor joylar', 'Sights'],
    ['fork-knife', '#FB923C', 'Кафе и рестораны', 'Kafe va restoranlar', 'Cafes'], ['recycle', '#4ADE80', 'Переработка', 'Qayta ishlash', 'Recycling'], ['briefcase', '#94A3B8', 'Бизнесу', 'Biznesga', 'For business'],
  ];
  function renderTicker() {
    const li = TICK.map(([i, c, ru, uz, en]) => `<span class="tk${i === 'sparkle' ? ' hot' : ''}" style="--c:${c}">${ic(i)}${esc(L === 'uz' ? uz : L === 'en' ? en : ru)}</span>`);
    const half = Math.ceil(li.length / 2), a = li.slice(0, half).join(''), b = li.slice(half).join('');
    $('#tk1').innerHTML = a + a; $('#tk2').innerHTML = b + b;
  }
  let L = 'ru';
  try { const q = new URLSearchParams(location.search).get('lang'); L = T[q] ? q : (localStorage.getItem('mz-portal-lang') || ((navigator.language || '').startsWith('uz') ? 'uz' : (navigator.language || '').startsWith('en') ? 'en' : 'ru')); if (!T[L]) L = 'ru'; } catch (e) {}
  const t = k => (T[L][k] != null ? T[L][k] : T.ru[k]);
  const fmt = n => Math.round(n).toLocaleString(L === 'en' ? 'en-US' : 'ru-RU').replace(/,/g, L === 'en' ? ',' : ' ');

  // ---------------- language ----------------
  function applyLang() {
    document.documentElement.lang = L; document.title = t('title');
    $$('[data-i]').forEach(e => { const v = t(e.dataset.i); if (typeof v === 'string') e.textContent = v; });
    $('#aiIn').placeholder = t('ai_ph');
    $$('.langs button').forEach(b => b.classList.toggle('on', b.dataset.lang === L));
    $$('.open-app').forEach(a => { a.href = APP + '?lang=' + L; });
    $$('[data-open]').forEach(a => { a.href = appLink(a.dataset.open, a.dataset.p); });
    $$('[data-priv]').forEach(a => { a.href = '/privacy.html?lang=' + L; });
    $$('.install-app').forEach(a => { a.href = APP + '?lang=' + L; });
    renderTicker(); renderMoments(); renderTabs(curTab); renderSug(); paintWidgets();
    document.dispatchEvent(new CustomEvent('mz:lang', { detail: L }));
    const f = $('#appFrame'); if (f && f.dataset.ready) try { f.contentWindow.postMessage({ mz: 'lang', l: L }, '*'); } catch (e) {}
  }
  const appLink = (id, p) => `${APP}?open=${encodeURIComponent(id)}${p ? '&p=' + encodeURIComponent(p) : ''}&lang=${L}`;
  $$('.langs button').forEach(b => b.addEventListener('click', () => { L = b.dataset.lang; try { localStorage.setItem('mz-portal-lang', L); } catch (e) {} applyLang(); }));

  // ---------------- nav state (sentinel, no scroll listener) ----------------
  const sent = document.createElement('div'); sent.style.cssText = 'position:absolute;top:80px;height:1px;width:1px'; document.body.prepend(sent);
  new IntersectionObserver(([e]) => $('#nav').classList.toggle('solid', !e.isIntersecting)).observe(sent);

  // ---------------- reveal on scroll ----------------
  const rv = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rv.unobserve(e.target); } }), { threshold: .14 });
  $$('.reveal').forEach((e, i) => { e.style.transitionDelay = (i % 4) * 70 + 'ms'; rv.observe(e); });

  // ---------------- the real app in the phone + the scroll story ----------------
  const frame = $('#appFrame'), phone = $('#phone'), story = $('#story');
  const send = msg => { try { frame.contentWindow.postMessage(msg, '*'); } catch (e) {} };
  const loadFrame = () => { if (frame.src) return; frame.src = `${APP}?embed=1&lang=${L}`; frame.addEventListener('load', () => { frame.dataset.ready = '1'; }, { once: true }); };
  const wide = matchMedia('(min-width: 961px)');
  if (wide.matches) loadFrame(); else new IntersectionObserver(([e], o) => { if (e.isIntersecting) { loadFrame(); o.disconnect(); } }, { rootMargin: '300px' }).observe(phone);
  $('#tryBtn').addEventListener('click', () => { phone.classList.add('live'); loadFrame(); });
  let stepT = 0, curStep = null;
  const steps = $$('.step');
  story.classList.add('at-hero');
  const so = new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting || curStep === e.target) return;
      curStep = e.target; steps.forEach(s => s.classList.toggle('on', s === e.target));
      story.classList.toggle('at-hero', e.target.classList.contains('hero'));
      const g = e.target.style.getPropertyValue('--g'); if (g) story.style.setProperty('--g', g);
      if (!wide.matches) return;
      phone.classList.remove('live');
      clearTimeout(stepT); stepT = setTimeout(() => send({ mz: 'go', id: e.target.dataset.go, p: e.target.dataset.p || null }), 220);
    });
  }, { rootMargin: '-45% 0px -45% 0px' });
  steps.forEach(s => so.observe(s));
  // gentle tilt of the device following the pointer (hero only)
  if (!RM) {
    let raf = 0; const wrap = $('#phoneWrap');
    wrap.addEventListener('pointermove', e => { if (!story.classList.contains('at-hero') || phone.classList.contains('live')) return; const r = wrap.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { phone.style.setProperty('--ry', (x * 14 - 4) + 'deg'); phone.style.setProperty('--rx', (-y * 10 + 2) + 'deg'); }); });
    wrap.addEventListener('pointerleave', () => { phone.style.removeProperty('--ry'); phone.style.removeProperty('--rx'); });
    wrap.addEventListener('pointermove', e => { const r = phone.getBoundingClientRect(); phone.style.setProperty('--gx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%'); });
  }

  // ---------------- data ----------------
  const D = { wx: null, aq: null, fx: null, fl: null, news: null, poi: null, transit: null, places: null };
  const WMO = c => c === 0 ? '☀️' : c <= 2 ? '🌤️' : c === 3 ? '☁️' : c <= 48 ? '🌫️' : c <= 67 ? '🌧️' : c <= 77 ? '🌨️' : c <= 82 ? '🌦️' : c <= 86 ? '🌨️' : '⛈️';
  const AQC = ['#4ADE80', '#FACC15', '#FB923C', '#F87171', '#C084FC', '#9F1239'];
  const aqLvl = v => v == null ? -1 : v <= 50 ? 0 : v <= 100 ? 1 : v <= 150 ? 2 : v <= 200 ? 3 : v <= 300 ? 4 : 5;
  function prayTimes(lat, lon) {
    const d = new Date(Date.now() + 5 * 3600e3), tz = 5, rad = Math.PI / 180;
    const jd = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) / 864e5 + 2440587.5, Dd = jd + 0.5 - tz / 24 - 2451545;
    const g = ((357.529 + 0.98560028 * Dd) % 360) * rad, q = (280.459 + 0.98564736 * Dd) % 360;
    const Ls = ((q + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)) % 360) * rad, e = (23.439 - 0.00000036 * Dd) * rad;
    const RA = Math.atan2(Math.cos(e) * Math.sin(Ls), Math.cos(Ls)) / rad / 15, dec = Math.asin(Math.sin(e) * Math.sin(Ls));
    let eq = q / 15 - (((RA % 24) + 24) % 24); if (eq > 12) eq -= 24; if (eq < -12) eq += 24;
    const noon = 12 + tz - lon / 15 - eq, phi = lat * rad;
    const ha = a => Math.acos(Math.max(-1, Math.min(1, (-Math.sin(a * rad) - Math.sin(phi) * Math.sin(dec)) / (Math.cos(phi) * Math.cos(dec))))) / rad / 15;
    const asrA = -Math.atan(1 / (2 + Math.tan(Math.abs(phi - dec)))) / rad;
    return [noon - ha(15.5), noon - ha(0.833), noon + 1 / 60, noon + ha(asrA), noon + ha(0.833) + 4 / 60, noon + ha(15.5)].map(h => Math.round(h * 60));
  }
  const hm = m => `${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;

  Promise.all([
    getJ(`https://api.open-meteo.com/v1/forecast?latitude=${TAS[0]}&longitude=${TAS[1]}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=4&timezone=Asia%2FTashkent&wind_speed_unit=ms`).then(j => (D.wx = j)),
    getJ(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${TAS[0]}&longitude=${TAS[1]}&current=us_aqi,pm2_5`).then(j => (D.aq = j)),
    getJ(DATA + 'data/rates.json').then(j => (D.fx = j)),
  ]).then(() => { D.wxDone = true; paintChips(); paintWidgets(); });
  getJ(DATA + 'data/news.json').then(j => { D.news = j || { cities: {}, all: [] }; paintWidgets(); });
  getJ(`${API}/api/flights?ap=TAS&dir=dep`).then(j => { D.fl = j; paintWidgets(); });
  Promise.all([getJ(DATA + 'data/poi/index.json'), getJ(DATA + 'data/transit/0.json'), getJ(DATA + 'data/places/index.json')]).then(([ix, tr, pl]) => { D.poi = ix; D.transit = tr; D.places = pl; paintCounts(); });
  getJ(`${API}/api/polls?scope=city`).then(j => {
    if (!j || !j.ok || !j.polls) return; const votes = j.polls.reduce((a, p) => a + p.total, 0);
    const el = $('#liveComm'); el.hidden = false; el.innerHTML = `<div><b>${fmt(j.polls.length)}</b><span data-i="pi2_polls">${esc(t('pi2_polls'))}</span></div>` + (votes ? `<div><b>${fmt(votes)}</b><span data-i="pi2_votes">${esc(t('pi2_votes'))}</span></div>` : '');
  });

  function paintChips() {
    const c = D.wx && D.wx.current, a = D.aq && D.aq.current, P = prayTimes(TAS[0], TAS[1]);
    const n = new Date(Date.now() + 5 * 3600e3), now = n.getUTCHours() * 60 + n.getUTCMinutes(); let nx = P.findIndex(m => m > now); if (nx < 0) nx = 0;
    if (c) { const e = $('#cWx'); e.hidden = false; e.innerHTML = `<span class="e">${WMO(c.weather_code)}</span><div>${esc(t('w_wx'))}<b>${c.temperature_2m > 0 ? '+' : ''}${Math.round(c.temperature_2m)}°C</b></div>`; }
    if (a && a.us_aqi != null) { const v = Math.round(a.us_aqi), lv = aqLvl(v), e = $('#cAq'); e.hidden = false; e.innerHTML = `<span class="dot" style="background:${AQC[lv]}"></span><div>${esc(t('w_air'))}<b>AQI ${v}</b></div>`; }
    const u = D.fx && D.fx.list && D.fx.list.find(x => x.c === 'USD'); if (u) { const e = $('#cFx'); e.hidden = false; e.innerHTML = `<span class="e">💵</span><div>USD<b>${fmt(u.r)}</b></div>`; }
    const e4 = $('#cPr'); e4.hidden = false; e4.innerHTML = `<span class="e">🕌</span><div>${esc(t('pr')[nx])}<b>${hm(P[nx])}</b></div>`;
  }

  // animated counters
  const counted = new WeakSet();
  const co = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { count(e.target); co.unobserve(e.target); } }), { threshold: .6 });
  function count(el) {
    const to = +el.dataset.to || 0; if (counted.has(el)) return; counted.add(el);
    if (RM) { el.textContent = fmt(to); return; }
    const t0 = performance.now(), dur = 1400; const tick = now => { const k = Math.min(1, (now - t0) / dur), v = to * (1 - Math.pow(1 - k, 3)); el.textContent = fmt(v); if (k < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick);
  }
  function paintCounts() {
    const n = (D.poi && D.poi.n) || {}, g = k => (n[k] && n[k]['0']) || 0;
    const v = { cafes: D.places && D.places.cities ? D.places.cities['0'] || 0 : 0, parking: g('parking'), med: g('med'), edu: g('edu'), gov: g('gov'), mosque: g('mosque'), speedcam: g('speedcam'), stops: D.transit && D.transit.bus ? D.transit.bus.stops.length + (D.transit.metro ? D.transit.metro.st.length : 0) : 0 };
    $$('[data-count]').forEach(el => { const x = v[el.dataset.count]; const box = el.closest('.stat'); if (!x) { box.hidden = true; return; } box.hidden = false; el.dataset.to = x; co.observe(el); });
    const fixN = { metro: D.transit && D.transit.metro ? D.transit.metro.st.length : 0, bus: D.transit && D.transit.bus ? Object.keys(D.transit.bus.routes).length : 0, med: g('med') };
    $$('[data-n]').forEach(el => { const x = fixN[el.dataset.n]; if (x) el.textContent = fmt(x); });
    document.dispatchEvent(new CustomEvent('mz:data'));
  }

  $('.stat-grid') && $('.stat-grid').addEventListener('pointermove', e => { const st = e.target.closest('.stat'); if (!st) return; const r = st.getBoundingClientRect(); st.style.setProperty('--mx', (e.clientX - r.left) + 'px'); st.style.setProperty('--my', (e.clientY - r.top) + 'px'); });

  // ---------------- life moments ----------------
  function renderMoments() {
    const tr = $('#moTrack');
    tr.innerHTML = MOMENTS.map(m => `<article class="mo" style="--a:${m.a};--b:${m.b}"><span class="ic">${ic(m.ic)}</span><h3>${esc(m.t[L] || m.t.ru)}</h3><ul>${(m.li[L] || m.li.ru).map(x => `<li>${ic('check-circle')}<span>${esc(x)}</span></li>`).join('')}</ul><a href="?s=${m.sv}" data-sv="${m.sv}">${esc(t('mo_go'))} ${ic('arrow-right')}</a></article>`).join('');
  }
  (function dragScroll() {
    const tr = $('#moTrack'); let x0 = 0, s0 = 0, down = false, moved = false;
    tr.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = false; x0 = e.clientX; s0 = tr.scrollLeft; });
    addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - x0; if (Math.abs(dx) > 4) { moved = true; tr.classList.add('drag'); } tr.scrollLeft = s0 - dx; });
    addEventListener('pointerup', () => { if (!down) return; down = false; tr.classList.remove('drag'); });
    tr.addEventListener('click', e => { if (moved) { e.preventDefault(); moved = false; } }, true);
  })();

  // ---------------- AI ----------------
  const msgs = [];
  function renderSug() { $('#aiSug').innerHTML = t('ai_q').map(q => `<button type="button">${esc(q)}</button>`).join(''); if (!$('#aiLog').children.length) addMsg('a', t('ai_hi')); }
  function addMsg(who, text) { const d = document.createElement('div'); d.className = 'msg ' + who; d.textContent = text; $('#aiLog').appendChild(d); $('#aiLog').scrollTop = 1e6; return d; }
  function ask(q) {
    q = q.trim(); if (!q) return; addMsg('u', q); msgs.push({ role: 'user', content: q });
    const w = addMsg('a', ''); w.innerHTML = '<span class="typing"><i></i><i></i><i></i></span>';
    const d = new Date(Date.now() + 5 * 3600e3);
    fetch(`${API}/api/assistant`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ messages: msgs.slice(-8), lang: L, name: '—', city: L === 'en' ? 'Tashkent' : L === 'uz' ? 'Toshkent' : 'Ташкент', date: d.toISOString().slice(0, 16).replace('T', ' '), ctx: { cityIdx: 0 } }) })
      .then(r => r.json()).then(j => { const raw = (j && j.reply) || ''; const tags = [...raw.matchAll(/\[\[\s*(?:go\s*:\s*)?([a-z_]+)\s*\]\]/gi)].map(m => m[1]); const a = raw.replace(/\s*\[\[[^\]]*\]\]/g, '').replace(/\*\*/g, '').trim(); if (!a) throw 0; msgs.push({ role: 'assistant', content: a }); w.textContent = a; document.dispatchEvent(new CustomEvent('mz:reply', { detail: { text: a, tags, el: w } })); })
      .catch(() => { w.textContent = t('ai_err'); msgs.pop(); });
  }
  $('#aiSug').addEventListener('click', e => { const b = e.target.closest('button'); if (b) ask(b.textContent); });
  $('#aiForm').addEventListener('submit', e => { e.preventDefault(); const i = $('#aiIn'); ask(i.value); i.value = ''; });

  // ---------------- live widgets ----------------
  function paintWidgets() {
    // weather + air
    const c = D.wx && D.wx.current, dl = D.wx && D.wx.daily, a = D.aq && D.aq.current;
    if (c) {
      const v = a && a.us_aqi != null ? Math.round(a.us_aqi) : null, lv = aqLvl(v);
      $('#wWx').innerHTML = `<h3>${ic('cloud-sun')}${esc(t('w_wx'))}</h3><div class="big">${WMO(c.weather_code)} ${c.temperature_2m > 0 ? '+' : ''}${Math.round(c.temperature_2m)}°</div><div class="sub">${esc(t('w_feels'))} ${Math.round(c.apparent_temperature)}° · ${Math.round(c.wind_speed_10m)} м/с</div>${lv >= 0 ? `<span class="aq"><i style="background:${AQC[lv]}"></i>${esc(t('w_air'))}: AQI ${v} · ${esc(t('aq')[lv])}</span>` : ''}
        ${dl ? `<div class="days">${dl.time.slice(1, 4).map((d, i) => `<div>${esc(t('days')[new Date(d + 'T12:00:00').getDay()])}<b>${WMO(dl.weather_code[i + 1])} ${Math.round(dl.temperature_2m_max[i + 1])}°</b>${Math.round(dl.temperature_2m_min[i + 1])}°</div>`).join('')}</div>` : ''}`;
    } else if (D.wxDone) { $('#wWx').innerHTML = `<h3>${ic('cloud-sun')}${esc(t('w_wx'))}</h3><p class="sub">${esc(t('w_none'))}</p>`; }
    // rates + converter
    const fx = D.fx && D.fx.list;
    if (!fx && D.wxDone) $('#wFx').innerHTML = `<h3>${ic('currency-dollar')}${esc(t('w_fx'))}</h3><p class="sub">${esc(t('w_none'))}</p>`;
    if (fx) {
      const pick = ['USD', 'EUR', 'RUB', 'KZT'].map(k => fx.find(x => x.c === k)).filter(Boolean);
      $('#wFx').innerHTML = `<h3>${ic('currency-dollar')}${esc(t('w_fx'))} · ${esc(D.fx.date || '')}</h3><div class="rates">${pick.map(x => `<div><span>${x.c}</span><b>${fmt(x.r)}<em class="${x.d >= 0 ? 'up' : 'dn'}">${x.d >= 0 ? '▲' : '▼'} ${Math.abs(x.d).toLocaleString('ru-RU')}</em></b></div>`).join('')}</div>
        <label class="conv"><input id="cvIn" inputmode="decimal" value="100" aria-label="USD"> USD = <b id="cvOut"></b></label>`;
      const usd = fx.find(x => x.c === 'USD'), inp = $('#cvIn'), out = $('#cvOut'); const upd = () => { out.textContent = fmt((+inp.value.replace(',', '.') || 0) * usd.r) + ' ' + t('w_conv'); }; inp.addEventListener('input', upd); upd();
    }
    // prayer
    const P = prayTimes(TAS[0], TAS[1]); const n = new Date(Date.now() + 5 * 3600e3), now = n.getUTCHours() * 60 + n.getUTCMinutes(); let nx = P.findIndex(m => m > now); const tm = nx < 0; if (tm) nx = 0;
    const left = (tm ? P[0] + 1440 : P[nx]) - now;
    $('#wPr').innerHTML = `<h3>${ic('moon-stars')}${esc(t('w_pr'))}</h3><div class="prs">${P.map((m, i) => `<div class="${i === nx ? 'on' : ''}">${esc(t('pr')[i])}<b>${hm(m)}</b></div>`).join('')}</div><p class="prn">${esc(t('w_next'))}: <b>${esc(t('pr')[nx])}</b> ${esc(t('w_in'))} ${left >= 60 ? Math.floor(left / 60) + ' ' + t('h') + ' ' : ''}${left % 60} ${esc(t('min'))}</p>`;
    // flights
    if (D.fl !== null) {
      const nowM = (() => { const n = new Date(Date.now() + 5 * 3600e3); return n.getUTCHours() * 60 + n.getUTCMinutes(); })(), mm = x => +x.slice(0, 2) * 60 + +x.slice(3, 5);
      const rows = ((D.fl && D.fl.rows) || []).filter(r => !(r.d === 0 && /^(dp|ld|cx)$/.test(r.st) && mm(r.e || r.t) < nowM - 40));
      $('#wFl').innerHTML = `<h3>${ic('airplane-takeoff')}${esc(t('w_fl'))}</h3>${rows.length ? `<div class="fl">${rows.slice(0, 5).map(r => `<div><b>${esc(r.e || r.t)}</b><span>${esc(r.c)} · ${esc(r.f)}</span><em class="${esc(r.st || '')}">${esc(t('fls')[r.st] || r.s || '')}</em></div>`).join('')}</div>` : `<p class="sub">${esc(t('w_none'))}</p>`}<a class="lnk more" href="${esc(appLink('h:flights'))}">${esc(t('w_board'))}</a>`;
    }
    // news
    if (D.news) {
      const items = ((D.news.cities && D.news.cities['0']) || D.news.all || []).slice(0, 3);
      $('#wNw').innerHTML = `<h3>${ic('newspaper')}${esc(t('w_nw'))}</h3>${items.length ? '' : `<p class="sub">${esc(t('w_none'))}</p>`}<div class="nw">${items.map(x => `<a href="${esc(x.u)}" target="_blank" rel="noopener">${x.i ? `<img src="${esc(x.i)}" alt="" loading="lazy" referrerpolicy="no-referrer">` : '<img alt="">'}<div><b>${esc(x.t)}</b><span>${esc(x.s)} · ${esc(String(x.d).slice(0, 10).split('-').reverse().join('.'))}</span></div></a>`).join('')}</div><a class="lnk more" href="${esc(appLink('h:news', 'all'))}">${esc(t('w_more'))}</a>`;
    }
    document.dispatchEvent(new CustomEvent('mz:data'));
  }

  // ---------------- partners ----------------
  let curTab = 'gov';
  function renderTabs(k) { curTab = k; $$('.tabs button').forEach(b => b.classList.toggle('on', b.dataset.tab === k)); $('#tabBody').innerHTML = TABS[k].map(([i, ti, s]) => `<div class="row"><span>${ic(i)}</span><div><b>${esc(ti[L] || ti.ru)}</b><p>${esc(s[L] || s.ru)}</p></div></div>`).join(''); }
  $$('.tabs button').forEach(b => b.addEventListener('click', () => renderTabs(b.dataset.tab)));
  $('#ptForm').addEventListener('submit', e => {
    e.preventDefault(); const m = $('#pfMsg'), btn = e.target.querySelector('button');
    const text = `[Партнёрство · ${({ gov: 'Хокимият', biz: 'Бизнес', inv: 'Инвестор' })[curTab]}] ${$('#pfN').value.trim()}\nКонтакт: ${$('#pfC').value.trim()}\n${$('#pfM').value.trim()}`;
    btn.disabled = true; m.className = 'form-msg'; m.textContent = '';
    fetch(`${API}/api/feedback`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text }) }).then(r => r.json()).then(j => { if (!j.ok) throw 0; m.className = 'form-msg ok'; m.textContent = t('pf_ok'); e.target.reset(); })
      .catch(() => { m.className = 'form-msg err'; m.textContent = t('pf_err'); }).finally(() => { btn.disabled = false; });
  });

  // ---------------- install on a phone ----------------
  // On a phone the app itself shows the install steps (Add to Home Screen). On a computer we point to the QR code.
  const PHONE = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.userAgent));
  document.addEventListener('click', e => {
    const a = e.target.closest('.install-app'); if (!a || PHONE) return;
    e.preventDefault(); const box = $('#qrBox'); box.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'center' });
    box.classList.remove('pulse'); void box.offsetWidth; box.classList.add('pulse');
    const p = box.querySelector('p'); p.textContent = t('g_scan'); setTimeout(() => { p.textContent = t('g_qr'); }, 6000);
  });

  // ---------------- QR to the app ----------------
  function drawQR() { if (!window.qrcode) return setTimeout(drawQR, 200); const url = APP === '/' ? location.origin + '/' : APP; const q = window.qrcode(0, 'M'); q.addData(url); q.make(); $('#qr').innerHTML = q.createSvgTag({ cellSize: 6, margin: 0, scalable: true }); const s = $('#qr svg'); if (s) { s.querySelectorAll('rect').forEach(r => { if (r.getAttribute('fill') === '#ffffff' || r.getAttribute('fill') === 'white') r.setAttribute('fill', 'transparent'); }); s.querySelectorAll('path').forEach(p => p.setAttribute('fill', '#0B2413')); } }
  drawQR();

  window.MZ = { t, lang: () => L, $, $$, esc, ic, getJ, fmt, DATA, API, APP, appLink, D, prayTimes, hm, WMO, aqLvl, AQC, ask: q => { $('#aiIn').value = ''; ask(q); }, PHONE: /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) };
  applyLang();
  document.dispatchEvent(new CustomEvent('mz:ready'));
})();
