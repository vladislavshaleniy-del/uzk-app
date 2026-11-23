// MyUzCity portal: service pages (desktop layouts with live data), the services catalogue,
// the city map with every service on it and the digital assistant. Uses helpers from portal.js (window.MZ).
(() => {
  'use strict';
  const boot = () => { if (window.MZ) init(); else document.addEventListener('mz:ready', init, { once: true }); };
  boot();

  function init() {
    const { $, $$, esc, ic, getJ, fmt, DATA, API, D } = MZ;
    const t = k => MZ.t(k), L = () => MZ.lang();
    const pick = o => (o && (o[L()] || o.ru)) || '';
    const ART = n => `/portal/art/${n}.webp?v=2`;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---------------- texts of this module ----------------
    const S = {
      ru: { home: 'Главная', all: 'Все сервисы', open_app: 'Открыть в приложении', install: 'Установить на телефон', app_t: 'В приложении удобнее', app_s: 'Здесь вся информация, а в телефоне MyUzCity работает рядом с вами: по геолокации, с уведомлениями в Telegram и с иконки на главном экране.',
        app_b: ['Места рядом по геолокации', 'Напоминания и статусы в Telegram', 'Работает как приложение, с иконки'], scan: 'Наведите камеру телефона', next: 'Другие сервисы', back: 'Назад', live: 'Живые данные', ask: 'Спросить ИИ', more: 'Подробнее', less: 'Свернуть',
        svc_t: 'Все сервисы города', svc_s: 'Выберите раздел: всё собрано на одной странице с живыми данными, а в телефоне работает ещё удобнее.', none: 'Пока нет данных', loading: 'Загружаем…', route: 'Маршрут', service: 'Сервис', search: 'Найти место на карте…', found: 'найдено', layers: 'Слои карты',
        hub_t: 'Город и сервисы на карте', hub_s: 'Все сервисы MyUzCity на одной карте: включайте слои, ищите места, открывайте сервис в один клик.', points: 'точек на карте', open_now: 'Открыто сейчас', h24: 'Круглосуточно', phone: 'Телефон', hours: 'Часы', addr: 'Адрес',
        ag_name: 'Цифровой ассистент MyUzCity', ag_role: 'Знает город, госуслуги и цены. Отвечает на трёх языках.', ag_status: 'на связи', kb_note: 'Справка проверена: ', kb_ru: 'Справка дана на русском языке.' },
      uz: { home: 'Bosh sahifa', all: 'Barcha xizmatlar', open_app: 'Ilovada ochish', install: "Telefonga o'rnatish", app_t: 'Ilovada qulayroq', app_s: "Bu yerda barcha ma'lumot, telefonda esa MyUzCity yoningizda ishlaydi: joylashuv bo'yicha, Telegramdagi bildirishnomalar bilan va bosh ekrandagi belgidan.",
        app_b: ["Joylashuv bo'yicha yaqin joylar", 'Telegramda eslatma va holatlar', 'Belgidan ilova kabi ochiladi'], scan: 'Telefon kamerasini qarating', next: 'Boshqa xizmatlar', back: 'Orqaga', live: "Jonli ma'lumotlar", ask: "AI'dan so'rash", more: 'Batafsil', less: "Yig'ish",
        svc_t: 'Shaharning barcha xizmatlari', svc_s: "Bo'limni tanlang: hammasi jonli ma'lumotlar bilan bitta sahifada, telefonda esa yanada qulay.", none: "Hozircha ma'lumot yo'q", loading: 'Yuklanmoqda…', route: "Yo'nalish", service: 'Xizmat', search: 'Xaritadan joy qidirish…', found: 'topildi', layers: 'Xarita qatlamlari',
        hub_t: 'Shahar va xizmatlar xaritada', hub_s: "MyUzCity'ning barcha xizmatlari bitta xaritada: qatlamlarni yoqing, joylarni qidiring, xizmatni bir bosishda oching.", points: 'nuqta xaritada', open_now: 'Hozir ochiq', h24: 'Kecha-kunduz', phone: 'Telefon', hours: 'Ish vaqti', addr: 'Manzil',
        ag_name: 'MyUzCity raqamli yordamchisi', ag_role: 'Shahar, davlat xizmatlari va narxlarni biladi. Uch tilda javob beradi.', ag_status: 'aloqada', kb_note: "Ma'lumot tekshirilgan: ", kb_ru: "Ma'lumot rus tilida berilgan." },
      en: { home: 'Home', all: 'All services', open_app: 'Open in the app', install: 'Install on your phone', app_t: 'Even better in the app', app_s: 'Everything is here, and on your phone MyUzCity works around you: by location, with Telegram notifications and from a home-screen icon.',
        app_b: ['Places near you by location', 'Reminders and statuses in Telegram', 'Opens like an app from an icon'], scan: 'Point your phone camera', next: 'More services', back: 'Back', live: 'Live data', ask: 'Ask AI', more: 'More', less: 'Less',
        svc_t: 'Every city service', svc_s: 'Pick a section: everything is on one page with live data, and it is even easier on your phone.', none: 'No data yet', loading: 'Loading…', route: 'Directions', service: 'Service', search: 'Find a place on the map…', found: 'found', layers: 'Map layers',
        hub_t: 'The city and its services on a map', hub_s: 'All MyUzCity services on one map: turn layers on, search for places, open a service in one click.', points: 'points on the map', open_now: 'Open now', h24: 'Open 24/7', phone: 'Phone', hours: 'Hours', addr: 'Address',
        ag_name: 'MyUzCity digital assistant', ag_role: 'Knows the city, public services and prices. Answers in three languages.', ag_status: 'online', kb_note: 'Checked: ', kb_ru: 'The reference is in Russian.' },
    };
    const s = k => (S[L()] && S[L()][k] != null ? S[L()][k] : S.ru[k]);
    const tr3 = (ru, uz, en) => ({ ru, uz, en });

    // ---------------- services ----------------
    const SV = {
      transport: { art: 'transport', ic: 'bus', g: '#3B82F6', app: 'h:transport', size: 'xl', t: tr3('Транспорт', 'Transport', 'Transport'),
        sub: tr3('Метро, автобусы, поезда, самолёты и такси', 'Metro, avtobus, poyezd, samolyot va taksi', 'Metro, buses, trains, flights and taxis'),
        lead: tr3('Линии метро, 1 300+ остановок, живое табло вылетов и цены на проезд. Всё о том, как передвигаться по Ташкенту и стране.', "Metro liniyalari, 1 300+ bekat, uchishlarning jonli tablosi va yo'l haqi. Toshkent va mamlakat bo'ylab qanday yurish haqida hammasi.", 'Metro lines, 1,300+ stops, a live departures board and fares. Everything about getting around Tashkent and the country.') },
      health: { art: 'health', ic: 'first-aid-kit', g: '#22C55E', app: 'h:poi', p: 'med', size: 'wide', t: tr3('Здоровье', "Sog'liq", 'Health'),
        sub: tr3('Аптеки, клиники, запись к врачу', 'Dorixona, klinika, shifokorga yozilish', 'Pharmacies, clinics, doctor booking'),
        lead: tr3('Аптеки и клиники на карте с часами работы, круглосуточные аптеки, запись к врачу через DMED и экстренные номера.', "Ish vaqti ko'rsatilgan dorixona va klinikalar xaritasi, kecha-kunduz dorixonalar, DMED orqali shifokorga yozilish va favqulodda raqamlar.", 'Pharmacies and clinics on a map with opening hours, 24/7 pharmacies, doctor booking via DMED and emergency numbers.') },
      gov: { art: 'gov', ic: 'bank', g: '#F2B45A', app: '1:2573', size: '', t: tr3('Госуслуги', 'Davlat xizmatlari', 'Public services'),
        sub: tr3('Документы, справки, пошлины', "Hujjatlar, ma'lumotnomalar, bojlar", 'Documents, certificates, fees'),
        lead: tr3('Как оформить загранпаспорт, ID-карту, права, прописку, пособие или ИП: сроки, пошлины и куда обращаться. Проверено на ноябрь 2026.', "Xorijga pasport, ID-karta, guvohnoma, propiska, nafaqa yoki YaTT qanday rasmiylashtiriladi: muddat, boj va qayerga murojaat qilish.", 'How to get a passport, ID card, driving licence, residence registration, benefits or register a business: timelines, fees and where to go.') },
      edu: { art: 'edu', ic: 'graduation-cap', g: '#A78BFA', app: '1:3042', size: '', t: tr3('Образование', "Ta'lim", 'Education'),
        sub: tr3('Детсады, школы, 1 класс', "Bog'cha, maktab, 1-sinf", 'Kindergartens, schools, first grade'),
        lead: tr3('Школы и детские сады на карте, очередь в детсад, запись в первый класс и электронный дневник.', "Xaritada maktab va bog'chalar, bog'chaga navbat, birinchi sinfga yozilish va elektron kundalik.", 'Schools and kindergartens on a map, the kindergarten queue, first-grade enrolment and the e-diary.') },
      mahalla: { art: 'mahalla', ic: 'users-three', g: '#14B8A6', app: '1:996', size: 'wide', t: tr3('Махалля и город', 'Mahalla va shahar', 'Mahalla and city'),
        sub: tr3('Опросы, обращения, чат соседей', "So'rovnoma, murojaat, qo'shnilar chati", 'Polls, reports, neighbours chat'),
        lead: tr3('Сообщайте о проблемах с фото, голосуйте в опросах города и махалли, следите, как решаются обращения.', "Muammolar haqida suratli xabar bering, shahar va mahalla so'rovnomalarida ovoz bering, murojaatlar qanday hal bo'layotganini kuzating.", 'Report problems with a photo, vote in city and mahalla polls and follow how reports get resolved.') },
      faith: { art: 'faith', ic: 'moon-stars', g: '#2DD4BF', app: '1:3529', size: '', t: tr3('Намаз и мечети', 'Namoz va masjidlar', 'Prayer and mosques'),
        sub: tr3('Время намаза, мечети рядом', 'Namoz vaqti, yaqin masjidlar', 'Prayer times, mosques nearby'),
        lead: tr3('Точное время намаза на сегодня и все мечети города на карте, включая исторические.', "Bugungi aniq namoz vaqti va shahardagi barcha masjidlar xaritada, tarixiylari bilan.", 'Exact prayer times for today and every mosque in the city on a map, including historic ones.') },
      leisure: { art: 'leisure', ic: 'fork-knife', g: '#FB923C', app: 'h:cafes', size: '', t: tr3('Отдых', 'Dam olish', 'Leisure'),
        sub: tr3('Кафе, афиша, достопримечательности', 'Kafe, afisha, diqqatga sazovor joylar', 'Cafes, events, sights'),
        lead: tr3('Тысячи кафе и ресторанов с кухней и часами работы, афиша событий и главные места города.', "Oshxonasi va ish vaqti ko'rsatilgan minglab kafe va restoranlar, tadbirlar afishasi va shaharning asosiy joylari.", 'Thousands of cafes and restaurants with cuisine and hours, events and the city’s top sights.') },
      market: { art: 'market', ic: 'storefront', g: '#F59E0B', app: '1:5149', size: '', t: tr3('Маркетплейс', 'Marketpleys', 'Marketplace'),
        sub: tr3('Объявления жителей города', 'Shahar aholisi e’lonlari', 'Listings from residents'),
        lead: tr3('Продайте ненужное или отдайте даром соседям. Связь напрямую через Telegram, без посредников.', "Keraksiz narsani soting yoki qo'shnilarga tekin bering. To'g'ridan-to'g'ri Telegram orqali aloqa.", 'Sell what you no longer need or give it away to neighbours. Contact directly via Telegram.') },
      business: { art: 'business', ic: 'briefcase', g: '#F2B45A', app: '1:2573', size: '', t: tr3('Бизнесу', 'Biznesga', 'Business'),
        sub: tr3('Открыть ИП, налоги, реклама на карте', "YaTT ochish, soliqlar, xaritada reklama", 'Start a business, taxes, map placement'),
        lead: tr3('Как открыть ИП или стать самозанятым, какие налоги платить и как MyUzCity приводит жителей к вашему бизнесу.', "YaTT ochish yoki o'zini o'zi band qilish, qaysi soliqlarni to'lash va MyUzCity aholini biznesingizga qanday olib keladi.", 'How to register a business or become self-employed, which taxes apply and how MyUzCity brings residents to your business.') },
      safety: { art: 'city', ic: 'siren', g: '#EF4444', app: '1:4475', size: 'wide', t: tr3('Безопасность', 'Xavfsizlik', 'Safety'),
        sub: tr3('Тревожная кнопка, экстренные номера', 'Xavf tugmasi, favqulodda raqamlar', 'Panic button, emergency numbers'),
        lead: tr3('Все экстренные службы в один тап и тревожная кнопка: близкие сразу получают вашу геолокацию в Telegram.', "Barcha favqulodda xizmatlar bir bosishda va xavf tugmasi: yaqinlaringiz darhol Telegramda joylashuvingizni oladi.", 'Every emergency service in one tap and a panic button that sends your location to loved ones in Telegram.') },
      map: { art: 'city', ic: 'map-trifold', g: '#F2B45A', size: 'wide', t: tr3('Город на карте', 'Shahar xaritada', 'City map'),
        sub: tr3('Все сервисы на одной карте', 'Barcha xizmatlar bitta xaritada', 'Every service on one map'), lead: tr3('', '', '') },
      ai: { art: null, ic: 'sparkle', g: '#2DD4BF', size: 'wide', t: tr3('Цифровой ассистент', 'Raqamli yordamchi', 'Digital assistant'),
        sub: tr3('Спросите о городе и госуслугах', "Shahar va davlat xizmatlari haqida so'rang", 'Ask about the city and public services'), lead: tr3('', '', '') },
    };
    const ORDER = ['transport', 'health', 'gov', 'edu', 'mahalla', 'faith', 'leisure', 'map', 'market', 'business', 'safety', 'ai'];
    const TILE = { transport: 'xl', health: 'wide', mahalla: 'wide', map: 'wide', safety: 'wide', ai: 'wide' };

    // ---------------- shared bits ----------------
    let KBD = null;
    const kb = () => KBD ? Promise.resolve(KBD) : getJ(`${API}/api/kb`).then(j => (KBD = j && j.ok ? j : { list: [], base: '' }));
    const kbText = (id, short) => { const e = KBD && KBD.list.find(x => x.id === id); if (!e) return ''; const lines = e.t.split('\n'); return short ? lines[0] : e.t; };
    const para = txt => txt.split('\n').filter(Boolean).map(l => `<p>${esc(l)}</p>`).join('');
    const panel = (title, body, cls = '', icn = '') => `<article class="pn ${cls}"><h3>${icn ? ic(icn) : ''}${esc(title)}</h3>${body}</article>`;
    const kpi = (v, l) => `<div class="kp"><b>${v}</b><span>${esc(l)}</span></div>`;
    const P = { // per-language short labels used in panels
      ru: { metro: 'станций метро', routes: 'маршрутов автобусов', stops: 'остановок', fare: 'сум за поездку', lines: 'Линии метро', board: 'Вылеты из Ташкента', fares: 'Проезд', trains: 'Поезда и такси', metro_map: 'Метро на карте',
        med: 'аптек и клиник', pharm: 'аптек', h24c: 'круглосуточных', amb: 'скорая', medmap: 'Медицина на карте', h24t: 'Круглосуточные аптеки', book: 'Запись к врачу', emerg: 'Экстренные номера',
        catalog: 'Госуслуги по жизненным ситуациям', hot: 'Горячие линии', brv: 'сум — 1 БРВ', svc905: 'услуг на my.gov.uz', call: 'колл-центр my.gov.uz',
        schools: 'школ, детсадов и вузов', edumap: 'Образование на карте', kinder: 'Детский сад', grade1: 'Первый класс', grade1_d: '20 июня — старт приёма', ediary: 'Электронный дневник и школы',
        polls: 'Опросы города', reports: 'Обращения жителей', polls_n: 'активных опросов', votes: 'голосов', reports_n: 'обращений', solved: 'решено', how: 'Как это работает', obud: 'Открытый бюджет',
        how_s: ['Сфотографируйте проблему и поставьте точку на карте', 'Соседи поддерживают, сообщение получают ответственные службы', 'Статус «в работе» и «решено» приходит вам в Telegram'],
        prayer: 'Время намаза сегодня', mosques: 'Мечети на карте', mosques_n: 'мечетей', hist: 'Исторические мечети', next_pr: 'Следующий намаз',
        cafes: 'Кафе и рестораны', afisha: 'Афиша', sights: 'Достопримечательности', cafes_n: 'заведений',
        listings: 'Объявления', market_empty: 'Объявлений пока нет. Разместите первое в приложении: это бесплатно.', market_how: 'Как продать',
        market_s: ['Сфотографируйте вещь и укажите цену', 'Объявление видят жители вашего города', 'Покупатель пишет вам напрямую в Telegram'],
        biz_open: 'Открыть ИП', biz_self: 'Самозанятость', biz_my: 'MyUzCity для бизнеса', biz_my_s: ['Заведение на карте с часами, телефоном и маршрутом', 'ИИ-ассистент рекомендует ваше место по запросу жителя', 'Маркетплейс и реклама для жителей вашего района'], biz_tax: 'налог ИП с оборота', biz_free: 'регистрация самозанятого', biz_15: 'минут на открытие бизнеса',
        sos: 'Тревожная кнопка', sos_s: ['Добавьте близких в приложении', 'В опасной ситуации нажмите кнопку', 'Близкие получат вашу геолокацию в Telegram'], cams: 'Камеры скорости на карте', cams_n: 'камер скорости' },
      uz: { metro: 'metro bekati', routes: "avtobus yo'nalishi", stops: 'bekat', fare: "so'm bir safar", lines: 'Metro liniyalari', board: 'Toshkentdan uchishlar', fares: "Yo'l haqi", trains: 'Poyezd va taksi', metro_map: 'Metro xaritada',
        med: 'dorixona va klinika', pharm: 'dorixona', h24c: 'kecha-kunduz', amb: 'tez yordam', medmap: 'Tibbiyot xaritada', h24t: 'Kecha-kunduz dorixonalar', book: 'Shifokorga yozilish', emerg: 'Favqulodda raqamlar',
        catalog: "Hayotiy vaziyatlar bo'yicha davlat xizmatlari", hot: 'Ishonch telefonlari', brv: "so'm — 1 BHM", svc905: 'xizmat my.gov.uz da', call: 'my.gov.uz call-markazi',
        schools: "maktab, bog'cha va OTM", edumap: "Ta'lim xaritada", kinder: "Bog'cha", grade1: 'Birinchi sinf', grade1_d: '20 iyun — qabul boshlanadi', ediary: 'Elektron kundalik va maktablar',
        polls: "Shahar so'rovnomalari", reports: 'Aholi murojaatlari', polls_n: "faol so'rovnoma", votes: 'ovoz', reports_n: 'murojaat', solved: 'hal qilindi', how: 'Qanday ishlaydi', obud: 'Ochiq byudjet',
        how_s: ['Muammoni suratga oling va xaritada belgilang', "Qo'shnilar qo'llaydi, xabarni mas'ul xizmatlar oladi", "«Ishda» va «hal qilindi» holati Telegramga keladi"],
        prayer: 'Bugungi namoz vaqtlari', mosques: 'Masjidlar xaritada', mosques_n: 'masjid', hist: 'Tarixiy masjidlar', next_pr: 'Keyingi namoz',
        cafes: 'Kafe va restoranlar', afisha: 'Afisha', sights: 'Diqqatga sazovor joylar', cafes_n: 'muassasa',
        listings: "E'lonlar", market_empty: "Hozircha e'lon yo'q. Birinchisini ilovada joylang: bu bepul.", market_how: 'Qanday sotish',
        market_s: ['Buyumni suratga oling va narx qo‘ying', "E'lonni shahringiz aholisi ko'radi", 'Xaridor sizga Telegramda yozadi'],
        biz_open: 'YaTT ochish', biz_self: "O'zini o'zi band qilish", biz_my: 'Biznes uchun MyUzCity', biz_my_s: ["Xaritada ish vaqti, telefon va yo'l bilan muassasa", 'AI-yordamchi aholiga joyingizni tavsiya qiladi', 'Tumaningiz aholisi uchun marketpleys va reklama'], biz_tax: 'YaTT aylanmadan soliq', biz_free: "o'zini o'zi band qilish ro'yxati", biz_15: 'daqiqada biznes ochish',
        sos: 'Xavf tugmasi', sos_s: ["Ilovada yaqinlaringizni qo'shing", 'Xavfli vaziyatda tugmani bosing', 'Yaqinlaringiz Telegramda joylashuvingizni oladi'], cams: 'Tezlik kameralari xaritada', cams_n: 'tezlik kamerasi' },
      en: { metro: 'metro stations', routes: 'bus routes', stops: 'stops', fare: 'sum per ride', lines: 'Metro lines', board: 'Departures from Tashkent', fares: 'Fares', trains: 'Trains and taxis', metro_map: 'Metro on the map',
        med: 'pharmacies and clinics', pharm: 'pharmacies', h24c: 'open 24/7', amb: 'ambulance', medmap: 'Healthcare on the map', h24t: '24/7 pharmacies', book: 'Booking a doctor', emerg: 'Emergency numbers',
        catalog: 'Public services by life situation', hot: 'Hotlines', brv: 'sum = 1 BRV', svc905: 'services on my.gov.uz', call: 'my.gov.uz call centre',
        schools: 'schools, kindergartens, universities', edumap: 'Education on the map', kinder: 'Kindergarten', grade1: 'First grade', grade1_d: '20 June — enrolment opens', ediary: 'E-diary and schools',
        polls: 'City polls', reports: 'Residents’ reports', polls_n: 'active polls', votes: 'votes', reports_n: 'reports', solved: 'solved', how: 'How it works', obud: 'Open budget',
        how_s: ['Take a photo of the problem and drop a pin', 'Neighbours support it and the city services receive it', 'You get “in progress” and “solved” in Telegram'],
        prayer: 'Prayer times today', mosques: 'Mosques on the map', mosques_n: 'mosques', hist: 'Historic mosques', next_pr: 'Next prayer',
        cafes: 'Cafes and restaurants', afisha: 'Events', sights: 'Sights', cafes_n: 'venues',
        listings: 'Listings', market_empty: 'No listings yet. Post the first one in the app: it is free.', market_how: 'How to sell',
        market_s: ['Take a photo and set a price', 'Residents of your city see the listing', 'The buyer writes to you in Telegram'],
        biz_open: 'Register a business', biz_self: 'Self-employment', biz_my: 'MyUzCity for business', biz_my_s: ['Your venue on the map with hours, phone and directions', 'The AI assistant recommends your place to residents', 'Marketplace and ads for residents of your district'], biz_tax: 'turnover tax for sole traders', biz_free: 'self-employed registration', biz_15: 'minutes to start a business',
        sos: 'Panic button', sos_s: ['Add your loved ones in the app', 'Press the button in danger', 'They get your location in Telegram'], cams: 'Speed cameras on the map', cams_n: 'speed cameras' },
    };
    const p = k => (P[L()] && P[L()][k] != null ? P[L()][k] : P.ru[k]);
    const FREE = { ru: 'бесплатно', uz: 'bepul', en: 'free' };

    // ---------------- Leaflet ----------------
    const leaflet = () => window.L ? Promise.resolve() : new Promise((ok, no) => { const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = '/vendor/leaflet/leaflet.css'; document.head.appendChild(l); const sc = document.createElement('script'); sc.src = '/vendor/leaflet/leaflet.js'; sc.onload = ok; sc.onerror = no; document.head.appendChild(sc); });
    const maps = [];
    function makeMap(el, opt = {}) {
      const m = window.L.map(el, { zoomControl: false, scrollWheelZoom: false, preferCanvas: true }).setView(opt.c || [41.3111, 69.2797], opt.z || 12);
      window.L.control.zoom({ position: 'topright' }).addTo(m);
      window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '© OpenStreetMap' }).addTo(m); m.attributionControl.setPrefix(false);
      m.on('click', () => m.scrollWheelZoom.enable()); maps.push(m); return m;
    }
    const dots = (m, list, c, r = 4, onClick) => { const cv = window.L.canvas({ padding: .3 }); const g = window.L.layerGroup(list.filter(x => x.la && x.lo).map(x => { const mk = window.L.circleMarker([x.la, x.lo], { renderer: cv, radius: r, color: c, weight: 1, opacity: .95, fillColor: c, fillOpacity: .8 }); if (onClick) mk.on('click', () => onClick(x)); else mk.bindPopup(esc(x.n || '')); return mk; })); g.addTo(m); return g; };
    const cache = {};
    const layer = k => cache[k] || (cache[k] = (k === 'cafes' ? getJ(DATA + 'data/places/0.json') : k === 'metro' ? getJ(DATA + 'data/transit/0.json').then(j => j && j.metro ? j.metro.st : []) : k === 'reports' ? getJ(`${API}/api/reports`).then(j => j && j.ok ? j.list.filter(r => r.la && r.lo).map(r => ({ ...r, n: r.text })) : []) : getJ(`${DATA}data/poi/${k}/0.json`)).then(l => l || []));
    const isOpen = h => { if (!h) return null; if (/24\/7/.test(h)) return true; const n = new Date(Date.now() + 5 * 3600e3), d = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][n.getUTCDay()], now = n.getUTCHours() * 60 + n.getUTCMinutes();
      for (const part of h.split(';')) { const m = part.trim().match(/^(?:([A-Z][a-z](?:-[A-Z][a-z])?(?:,[A-Z][a-z](?:-[A-Z][a-z])?)*)\s+)?(\d\d):(\d\d)-(\d\d):(\d\d)$/); if (!m) continue; const days = m[1] ? m[1].split(',').some(r => { const [a, b] = r.split('-'); const D7 = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']; const ia = D7.indexOf(a), ib = D7.indexOf(b || a), id = D7.indexOf(d); return ia <= ib ? id >= ia && id <= ib : id >= ia || id <= ib; }) : true; if (!days) continue; const o = +m[2] * 60 + +m[3], c = +m[4] * 60 + +m[5]; if (c > o ? now >= o && now < c : now >= o || now < c) return true; } return false; };
    const MLC = { red: '#EF4444', blue: '#3B82F6', green: '#22C55E', yellow: '#FACC15', orange: '#FB923C', purple: '#A855F7' };

    // ---------------- QR for app links ----------------
    function qrSvg(url) { if (!window.qrcode) return ''; const q = window.qrcode(0, 'M'); q.addData(url); q.make(); return q.createSvgTag({ cellSize: 5, margin: 0, scalable: true }).replace(/fill="#ffffff"|fill="white"/g, 'fill="transparent"').replace(/<path /, '<path fill="#0B2413" '); }
    const abs = u => new URL(u, location.href).href;

    // ---------------- services catalogue on the home page ----------------
    function renderCatalog() {
      const box = $('#svcGrid'); if (!box) return;
      $('#svcT').textContent = s('svc_t'); $('#svcS').textContent = s('svc_s');
      box.innerHTML = ORDER.map(k => { const v = SV[k]; const sz = TILE[k] || ''; return `<a class="tile ${sz}" href="?s=${k}" data-sv="${k}" style="--g:${v.g}">
        ${v.art ? `<img src="${ART(v.art)}" alt="" loading="lazy" decoding="async">` : `<div class="tile-ag">${ROBOT('tile')}</div>`}
        <span class="tile-ic">${ic(v.ic)}</span><span class="tile-tx"><b>${esc(pick(v.t))}</b><i>${esc(pick(v.sub))}</i></span><span class="tile-go">${ic('arrow-up-right')}</span></a>`; }).join('');
    }

    // ---------------- service page ----------------
    const view = $('#svView'), home = $('#top');
    let cur = null;
    function shell(k) {
      const v = SV[k];
      const appUrl = v.app ? MZ.appLink(v.app, v.p) : MZ.APP;
      const others = ORDER.filter(x => x !== k && x !== 'ai').slice(0, 5);
      return `<div class="sv" style="--g:${v.g}">
        <header class="sv-hero">
          ${v.art ? `<img class="sv-art" src="${ART(v.art)}" alt="" decoding="async">` : ''}
          <div class="sv-hero-in">
            <nav class="crumbs"><a href="./" data-home>${esc(s('home'))}</a><span>/</span><a href="./#services" data-home="services">${esc(s('all'))}</a><span>/</span><b>${esc(pick(v.t))}</b></nav>
            <span class="sv-ic">${ic(v.ic)}</span>
            <h1>${esc(pick(v.t))}</h1>
            <p class="sv-lead">${esc(pick(v.lead))}</p>
            <div class="sv-kpis" id="svK"></div>
            <div class="cta-row">${v.app ? `<a class="btn btn-acc btn-lg" href="${esc(appUrl)}">${ic('device-mobile')}<span>${esc(s('open_app'))}</span></a>` : ''}<a class="btn btn-ghost btn-lg install-app" href="${esc(MZ.APP)}">${ic('arrow-right')}<span>${esc(s('install'))}</span></a></div>
          </div>
        </header>
        <div class="sv-body">
          <div class="sv-main" id="svMain"><div class="pn wide"><div class="sk" style="height:220px"></div></div></div>
          <aside class="sv-app">
            <div class="app-card">
              <div class="mini-phone"><div class="mp-screen">${v.art ? `<img src="${ART(v.art)}" alt="">` : ''}<span class="mp-ic">${ic(v.ic)}</span><b>${esc(pick(v.t))}</b></div></div>
              <h3>${esc(s('app_t'))}</h3><p>${esc(s('app_s'))}</p>
              <ul>${s('app_b').map(x => `<li>${ic('check-circle')}<span>${esc(x)}</span></li>`).join('')}</ul>
              <div class="app-qr"><div class="qr-s">${qrSvg(abs(appUrl))}</div><span>${esc(s('scan'))}</span></div>
              ${v.app ? `<a class="btn btn-acc" href="${esc(appUrl)}">${esc(s('open_app'))}</a>` : ''}
            </div>
          </aside>
        </div>
        <section class="sv-next"><h2>${esc(s('next'))}</h2><div class="next-row">${others.map(o => `<a class="tile sm" href="?s=${o}" data-sv="${o}" style="--g:${SV[o].g}">${SV[o].art ? `<img src="${ART(SV[o].art)}" alt="" loading="lazy">` : ''}<span class="tile-ic">${ic(SV[o].ic)}</span><span class="tile-tx"><b>${esc(pick(SV[o].t))}</b><i>${esc(pick(SV[o].sub))}</i></span><span class="tile-go">${ic('arrow-up-right')}</span></a>`).join('')}</div></section>
      </div>`;
    }

    const R = {}; // renderers: return { k: kpis html, m: main html, after(el) }
    R.transport = async () => {
      const tr = D.transit || await getJ(DATA + 'data/transit/0.json'); const lines = tr && tr.metro ? tr.metro.lines : [], st = tr && tr.metro ? tr.metro.st : [];
      const rows = ((D.fl && D.fl.rows) || []).slice(0, 7);
      return { k: kpi(fmt(st.length), p('metro')) + kpi(fmt(tr && tr.bus ? Object.keys(tr.bus.routes).length : 0), p('routes')) + kpi(fmt(tr && tr.bus ? tr.bus.stops.length : 0), p('stops')) + kpi('2 500', p('fare')),
        m: panel(p('lines'), `<div class="lines">${lines.map(l => { const ss = st.filter(x => x.l.includes(l.r)); return `<div class="ln" style="--lc:${MLC[l.c] || l.c}"><div class="ln-h"><i></i><b>${esc(l.n.split(':')[0])}</b><em>${ss.length}</em></div><div class="ln-st">${ss.map(x => `<span>${esc(L() === 'ru' ? x.n : (x.n2 || x.n))}</span>`).join('')}</div></div>`; }).join('')}</div>`, 'wide', 'train')
          + panel(p('metro_map'), '<div class="mm" id="mmTr"></div>', 'wide', 'map-trifold')
          + panel(p('board'), rows.length ? `<div class="board">${rows.map(r => `<div><b>${esc(r.e || r.t)}</b><span>${esc(r.c)}</span><i>${esc(r.f)}</i><em class="${esc(r.st)}">${esc((t('fls') || {})[r.st] || r.s || '')}</em></div>`).join('')}</div>` : `<p class="muted">${esc(s('loading'))}</p>`, '', 'airplane-takeoff')
          + panel(p('fares'), para(kbText('transport')), '', 'ticket')
          + panel(p('trains'), `<p>Afrosiyob, Sharq — <a href="https://eticket.railway.uz" target="_blank" rel="noopener">eticket.railway.uz</a></p><p>${esc(L() === 'en' ? 'Taxi with fare estimates and directions — in the app.' : L() === 'uz' ? 'Taksi narxi va yo‘nalish — ilovada.' : 'Такси с ценой поездки и маршрутом — в приложении.')}</p>`, '', 'car'),
        after: async () => { await leaflet(); const el = $('#mmTr'); if (!el) return; const m = makeMap(el, { z: 12 }); lines.forEach(l => (l.g || []).forEach(seg => window.L.polyline(seg, { color: MLC[l.c] || l.c, weight: 4, opacity: .9 }).addTo(m))); dots(m, st, '#F7F3E8', 4.5); } };
    };
    R.health = async () => {
      const list = await layer('med'); const cnt = a => list.filter(x => x.a === a).length; const h24 = list.filter(x => /24\/7/.test(x.h || '')); await kb();
      const tabs = ['pharmacy', 'clinic', 'hospital', 'dentist'];
      const TL = { ru: { pharmacy: 'Аптеки', clinic: 'Клиники', hospital: 'Больницы', dentist: 'Стоматологии' }, uz: { pharmacy: 'Dorixonalar', clinic: 'Klinikalar', hospital: 'Shifoxonalar', dentist: 'Stomatologiya' }, en: { pharmacy: 'Pharmacies', clinic: 'Clinics', hospital: 'Hospitals', dentist: 'Dentists' } }[L()];
      return { k: kpi(fmt(list.length), p('med')) + kpi(fmt(cnt('pharmacy')), p('pharm')) + kpi(fmt(h24.length), p('h24c')) + kpi('103', p('amb')),
        m: panel(p('medmap'), `<div class="chips" id="medTabs">${tabs.map((a, i) => `<button class="${i === 0 ? 'on' : ''}" data-a="${a}">${esc(TL[a])} <em>${fmt(cnt(a))}</em></button>`).join('')}</div><div class="mm" id="mmMed"></div>`, 'wide', 'map-pin')
          + panel(p('h24t'), h24.length ? `<ul class="plist">${h24.slice(0, 7).map(x => `<li><b>${esc(x.n || TL.pharmacy)}</b><span>${esc(x.ad || '')}</span>${x.ph ? `<a href="tel:${esc(x.ph.replace(/\s/g, ''))}">${esc(x.ph)}</a>` : ''}</li>`).join('')}</ul>` : `<p class="muted">${esc(s('none'))}</p>`, '', 'pill')
          + panel(p('book'), para(kbText('med')), '', 'stethoscope')
          + panel(p('emerg'), nums(['103', '112', '1003']), 'wide', 'phone'),
        after: async () => { await leaflet(); const el = $('#mmMed'); if (!el) return; const m = makeMap(el); let g = dots(m, list.filter(x => x.a === 'pharmacy'), '#4ADE80');
          $('#medTabs').addEventListener('click', e => { const b = e.target.closest('[data-a]'); if (!b) return; $$('#medTabs button').forEach(x => x.classList.toggle('on', x === b)); m.removeLayer(g); g = dots(m, list.filter(x => x.a === b.dataset.a), '#4ADE80'); }); } };
    };
    const NUMS = { '112': tr3('Единый экстренный номер', 'Yagona favqulodda raqam', 'Single emergency number'), '101': tr3('Пожарная служба', "Yong'in xizmati", 'Fire service'), '102': tr3('Полиция', 'Politsiya', 'Police'), '103': tr3('Скорая помощь', 'Tez yordam', 'Ambulance'), '104': tr3('Газовая авария', 'Gaz avariya xizmati', 'Gas emergency'), '1050': tr3('Спасатели МЧС', 'FVV qutqaruvchilari', 'Rescue service'), '1003': tr3('Колл-центр DMED', 'DMED call-markazi', 'DMED call centre'), '1242': tr3('Колл-центр my.gov.uz', 'my.gov.uz call-markazi', 'my.gov.uz call centre'), '1148': tr3('Жалобы на госуслуги', 'Davlat xizmatlari shikoyati', 'Complaints about public services'), '1000': tr3('Приёмная Президента', 'Prezident qabulxonasi', 'President’s reception'), '1104': tr3('Газ: вопросы', 'Gaz: savollar', 'Gas: questions'), '1154': tr3('Электричество', 'Elektr', 'Electricity'), '1097': tr3('Кадастр', 'Kadastr', 'Cadastre') };
    const nums = arr => `<div class="nums">${arr.map(n => `<a href="tel:${n}"><b>${n}</b><span>${esc(pick(NUMS[n]))}</span></a>`).join('')}</div>`;
    const GROUPS = [
      [tr3('Документы', 'Hujjatlar', 'Documents'), 'identification-card', ['zagran', 'id', 'propiska', 'sudimost', 'zags', 'eds']],
      [tr3('Авто и дороги', 'Avto va yo‘llar', 'Cars and roads'), 'car', ['prava', 'fines', 'car']],
      [tr3('Семья и дети', 'Oila va bolalar', 'Family and children'), 'baby', ['kinder', 'school', 'social']],
      [tr3('Работа, бизнес, пенсия', 'Ish, biznes, pensiya', 'Work, business, pension'), 'briefcase', ['selfemp', 'ip', 'pension']],
      [tr3('Дом и город', 'Uy va shahar', 'Home and city'), 'house-line', ['property', 'utility', 'med', 'transport', 'appeal', 'mahalla']],
    ];
    const KBT = { zagran: tr3('Загранпаспорт', 'Xorijga chiqish pasporti', 'Travel passport'), id: tr3('ID-карта', 'ID-karta', 'ID card'), propiska: tr3('Прописка', 'Propiska', 'Residence registration'), sudimost: tr3('Справка о несудимости', "Sudlanmaganlik ma'lumotnomasi", 'Criminal record certificate'), zags: tr3('ЗАГС: рождение, брак, развод', 'FHDYo: tug‘ilish, nikoh, ajrashish', 'Civil registry'), eds: tr3('OneID и ЭЦП', 'OneID va ERI', 'OneID and e-signature'),
      prava: tr3('Водительские права', 'Haydovchilik guvohnomasi', 'Driving licence'), fines: tr3('Штрафы ПДД', 'YHQ jarimalari', 'Traffic fines'), car: tr3('Покупка и регистрация авто', 'Avtomobil sotib olish va ro‘yxatdan o‘tkazish', 'Buying and registering a car'),
      kinder: tr3('Детский сад', "Bog'cha", 'Kindergarten'), school: tr3('Школа и 1 класс', 'Maktab va 1-sinf', 'School and first grade'), social: tr3('Детские пособия и помощь', 'Bolalar nafaqasi va yordam', 'Child benefits and aid'),
      selfemp: tr3('Самозанятость', "O'zini o'zi band qilish", 'Self-employment'), ip: tr3('ИП и регистрация бизнеса', 'YaTT va biznesni ro‘yxatdan o‘tkazish', 'Registering a business'), pension: tr3('Пенсия', 'Pensiya', 'Pension'),
      property: tr3('Недвижимость и налог', 'Ko‘chmas mulk va soliq', 'Property and tax'), utility: tr3('Коммунальные услуги', 'Kommunal xizmatlar', 'Utilities'), med: tr3('Поликлиника и врач', 'Poliklinika va shifokor', 'Clinic and doctor'), transport: tr3('Проезд', "Yo'l haqi", 'Public transport fares'), appeal: tr3('Обращения к власти', 'Hokimiyatga murojaat', 'Appeals to the authorities'), mahalla: tr3('Махалля', 'Mahalla', 'Mahalla') };
    const askQ = { zagran: 'Как оформить загранпаспорт?', id: 'Как получить ID-карту?', propiska: 'Как оформить прописку?', sudimost: 'Как получить справку о несудимости?', zags: 'Как получить свидетельство о рождении?', eds: 'Как получить ЭЦП?', prava: 'Как заменить водительские права?', fines: 'Как оплатить штраф со скидкой?', car: 'Как оформить покупку машины?', kinder: 'Как встать в очередь в детский сад?', school: 'Как записать ребёнка в первый класс?', social: 'Как оформить детское пособие?', selfemp: 'Как стать самозанятым?', ip: 'Как открыть ИП?', pension: 'Как оформить пенсию?', property: 'Как платить налог на квартиру?', utility: 'Куда звонить, если нет газа?', med: 'Как записаться к врачу?', transport: 'Сколько стоит проезд?', appeal: 'Как написать обращение?', mahalla: 'Что такое открытый бюджет?' };
    function kbCard(id) { const txt = kbText(id); if (!txt) return ''; const [first, ...rest] = txt.split('\n'); return `<details class="kb" data-k="${id}"><summary><b>${esc(pick(KBT[id]))}</b><span>${esc(first.replace(/^[^.:]{3,80}[.:]\s+/, '').slice(0, 140))}</span>${ic('caret-down')}</summary><div class="kb-b">${para(first)}${para(rest.join('\n'))}<button class="btn btn-ghost btn-sm" data-ask="${esc(askQ[id] || '')}">${ic('sparkle')}<span>${esc(s('ask'))}</span></button></div></details>`; }
    R.gov = async () => { await kb();
      return { k: kpi('905', p('svc905')) + kpi('440 000', p('brv')) + kpi('1242', p('call')) + kpi('112', NUMS['112'][L()] || NUMS['112'].ru),
        m: `<div class="pn wide gov-search"><input id="govQ" placeholder="${esc(L() === 'en' ? 'Search: passport, fines, kindergarten…' : L() === 'uz' ? 'Qidirish: pasport, jarima, bog‘cha…' : 'Поиск: загранпаспорт, штраф, детсад…')}"></div>`
          + GROUPS.map(([gt, gi, ids]) => panel(pick(gt), ids.map(kbCard).join(''), 'wide kbg', gi)).join('')
          + panel(p('hot'), nums(['1242', '1148', '1000', '1097']), 'wide', 'phone')
          + `<p class="muted kb-src">${esc(s('kb_note'))}${esc((KBD && KBD.checked) || '')}. ${L() !== 'ru' ? esc(s('kb_ru')) : ''} my.gov.uz · gov.uz · advice.uz</p>`,
        after: () => { const q = $('#govQ'); q && q.addEventListener('input', () => { const v = q.value.trim().toLowerCase(); $$('.kb').forEach(d => { const hit = !v || d.textContent.toLowerCase().includes(v); d.hidden = !hit; if (v && hit) d.open = true; }); $$('.kbg').forEach(g => { g.hidden = !g.querySelector('.kb:not([hidden])'); }); }); } };
    };
    R.edu = async () => { const list = await layer('edu'); await kb(); const c = a => list.filter(x => x.a === a).length;
      const n = (D.poi && D.poi.n && D.poi.n.edu && D.poi.n.edu['0']) || list.length;
      return { k: kpi(fmt(n), p('schools')) + kpi('7', L() === 'en' ? 'years old for first grade' : L() === 'uz' ? 'yoshda 1-sinfga' : 'лет — в первый класс') + kpi('3', L() === 'en' ? 'working days to review' : L() === 'uz' ? 'ish kunida ko‘rib chiqiladi' : 'рабочих дня рассмотрение') + kpi('my.gov.uz', L() === 'en' ? 'apply online' : L() === 'uz' ? 'onlayn ariza' : 'заявление онлайн'),
        m: panel(p('edumap'), '<div class="mm" id="mmEdu"></div>', 'wide', 'map-pin') + panel(p('kinder'), para(kbText('kinder')), '', 'baby') + panel(p('grade1'), `<div class="tl"><div><b>20.06 — 31.07</b><span>${esc(L() === 'en' ? 'By your microdistrict' : L() === 'uz' ? 'Biriktirilgan hudud bo‘yicha' : 'По месту прикрепления')}</span></div><div><b>01.08 — 31.08</b><span>${esc(L() === 'en' ? 'Outside your area' : L() === 'uz' ? 'Hududdan tashqari' : 'Вне закреплённой территории')}</span></div></div>${para(kbText('school'))}`, '', 'graduation-cap'),
        after: async () => { await leaflet(); const el = $('#mmEdu'); if (!el) return; const m = makeMap(el); const C = { school: '#A78BFA', kindergarten: '#F472B6', university: '#60A5FA', college: '#2DD4BF' }; Object.keys(C).forEach(a => dots(m, list.filter(x => x.a === a), C[a], 5)); } };
    };
    R.mahalla = async () => { const [pl, rp] = await Promise.all([getJ(`${API}/api/polls?scope=city`), getJ(`${API}/api/reports`)]); const polls = (pl && pl.polls) || [], reps = (rp && rp.list) || []; await kb();
      const votes = polls.reduce((a, x) => a + x.total, 0), solved = reps.filter(r => r.status === 'done' || r.status === 'solved').length;
      return { k: kpi(fmt(polls.length), p('polls_n')) + kpi(fmt(votes), p('votes')) + kpi(fmt(reps.length), p('reports_n')) + kpi(fmt(solved), p('solved')),
        m: panel(p('polls'), polls.length ? polls.slice(0, 4).map(x => `<div class="poll"><b>${esc(x.q)}</b>${x.options.map((o, i) => { const pc = x.total ? Math.round(x.counts[i] * 100 / x.total) : 0; return `<div class="bar"><span style="width:${pc}%"></span><i>${esc(o)}</i><em>${pc}%</em></div>`; }).join('')}<small>${fmt(x.total)} ${esc(p('votes'))}</small></div>`).join('') : `<p class="muted">${esc(s('none'))}</p>`, 'wide', 'chart-bar')
          + panel(p('reports'), reps.length ? `<div class="mm" id="mmRep"></div><ul class="plist">${reps.slice(0, 5).map(r => `<li><b>${esc(r.text || r.kind)}</b><span>${esc(r.status || '')} · ${fmt(r.ups || 0)} 👍</span></li>`).join('')}</ul>` : `<p class="muted">${esc(s('none'))}</p>`, '', 'megaphone')
          + panel(p('how'), `<ol class="steps3">${p('how_s').map(x => `<li>${esc(x)}</li>`).join('')}</ol>`, '', 'hand-tap')
          + panel(p('obud'), para(kbText('mahalla')) + `<p><a href="https://openbudget.uz" target="_blank" rel="noopener">openbudget.uz</a></p>`, 'wide', 'hand-heart'),
        after: async () => { const el = $('#mmRep'); if (!el) return; await leaflet(); const m = makeMap(el); dots(m, reps.filter(r => r.la), '#F59E0B', 6); } };
    };
    R.faith = async () => { const list = await layer('mosque'); const P6 = MZ.prayTimes(41.3111, 69.2797); const n = new Date(Date.now() + 5 * 3600e3), now = n.getUTCHours() * 60 + n.getUTCMinutes(); let nx = P6.findIndex(m => m > now); if (nx < 0) nx = 0; const names = t('pr');
      return { k: kpi(MZ.hm(P6[nx]), p('next_pr') + ': ' + names[nx]) + kpi(fmt(list.length), p('mosques_n')) + kpi(MZ.hm(P6[0]), names[0]) + kpi(MZ.hm(P6[5]), names[5]),
        m: panel(p('prayer'), `<div class="pray6">${P6.map((m, i) => `<div class="${i === nx ? 'on' : ''}"><span>${esc(names[i])}</span><b>${MZ.hm(m)}</b></div>`).join('')}</div>`, 'wide', 'moon-stars')
          + panel(p('mosques'), '<div class="mm" id="mmMos"></div>', 'wide', 'map-pin')
          + panel(p('hist'), `<ul class="plist">${list.filter(x => x.hi || /истор|hist/i.test(x.a || '')).slice(0, 8).map(x => `<li><b>${esc(x.n)}</b><span>${esc(x.n2 || '')}</span></li>`).join('') || list.slice(0, 8).map(x => `<li><b>${esc(x.n || '')}</b><span>${esc(x.n2 || '')}</span></li>`).join('')}</ul>`, 'wide', 'mosque'),
        after: async () => { await leaflet(); const el = $('#mmMos'); if (!el) return; const m = makeMap(el); dots(m, list, '#2DD4BF', 5); } };
    };
    R.leisure = async () => { const pl = await layer('cafes'); const sights = await layer('sight'); const news = D.news || await getJ(DATA + 'data/news.json'); const af = ((news && news.cities && news.cities['0']) || []).filter(x => x.k && x.k !== 'news').slice(0, 6);
      const CAT = { national: tr3('Национальная', 'Milliy', 'Uzbek'), plov: tr3('Плов', 'Osh', 'Plov'), coffee: tr3('Кофе', 'Qahva', 'Coffee'), grill: tr3('Гриль', 'Grill', 'Grill'), asia: tr3('Азия', 'Osiyo', 'Asian'), europe: tr3('Европа', 'Yevropa', 'European'), terrace: tr3('Терраса', 'Terrasa', 'Terrace') };
      const best = c => pl.filter(x => x.c && x.c.includes(c) && x.h).slice(0, 6);
      return { k: kpi(fmt(pl.length), p('cafes_n')) + kpi(fmt(pl.filter(x => x.c && x.c.includes('national')).length), pick(CAT.national)) + kpi(fmt(pl.filter(x => x.c && x.c.includes('coffee')).length), pick(CAT.coffee)) + kpi(fmt(sights.length), p('sights')),
        m: panel(p('cafes'), `<div class="chips" id="cafTabs">${Object.keys(CAT).map((c, i) => `<button class="${i === 0 ? 'on' : ''}" data-c="${c}">${esc(pick(CAT[c]))}</button>`).join('')}</div><div class="cafes" id="cafList">${cafeCards(best('national'))}</div>`, 'wide', 'fork-knife')
          + panel(p('afisha'), af.length ? `<div class="afisha">${af.map(x => `<a href="${esc(x.u)}" target="_blank" rel="noopener">${x.i ? `<img src="${esc(x.i)}" alt="" loading="lazy" referrerpolicy="no-referrer">` : ''}<b>${esc(x.t)}</b><span>${esc(x.s)}</span></a>`).join('')}</div>` : `<p class="muted">${esc(s('none'))}</p>`, 'wide', 'ticket')
          + panel(p('sights'), `<ul class="plist two">${sights.slice(0, 12).map(x => `<li><b>${esc(x.n)}</b></li>`).join('')}</ul>`, 'wide', 'compass'),
        after: () => { const tb = $('#cafTabs'); tb && tb.addEventListener('click', e => { const b = e.target.closest('[data-c]'); if (!b) return; $$('#cafTabs button').forEach(x => x.classList.toggle('on', x === b)); $('#cafList').innerHTML = cafeCards(best(b.dataset.c)); }); } };
    };
    const cafeCards = arr => arr.map(x => { const o = isOpen(x.h); return `<div class="cafe"><b>${esc(x.n)}</b><span>${esc(x.ad || x.cu || '')}</span><em class="${o ? 'op' : 'cl'}">${o === null ? '' : esc(o ? s('open_now') : x.h)}</em>${x.ph ? `<a href="tel:${esc(x.ph.replace(/\s/g, ''))}">${esc(x.ph)}</a>` : ''}</div>`; }).join('') || `<p class="muted">${esc(s('none'))}</p>`;
    R.market = async () => { const j = await getJ(`${API}/api/market?city=0`); const list = (j && j.list) || [];
      return { k: kpi(fmt(list.length), p('listings')) + kpi(esc(FREE[L()]), L() === 'en' ? 'to post' : L() === 'uz' ? 'joylash' : 'размещение') + kpi('Telegram', L() === 'en' ? 'direct contact' : L() === 'uz' ? "to'g'ridan-to'g'ri aloqa" : 'связь напрямую') + kpi('0%', L() === 'en' ? 'commission' : L() === 'uz' ? 'komissiya' : 'комиссия'),
        m: panel(p('listings'), list.length ? `<div class="ads">${list.slice(0, 9).map(x => `<div class="ad">${x.photos ? `<img src="${API}/api/market/photo?id=${x.id}&i=0" alt="" loading="lazy">` : '<div class="ad-ph"></div>'}<b>${esc(x.title)}</b><span>${x.price ? fmt(x.price) + ' сум' : esc(FREE[L()])}</span></div>`).join('')}</div>` : `<div class="empty">${ic('storefront')}<p>${esc(p('market_empty'))}</p></div>`, 'wide', 'shopping-bag')
          + panel(p('market_how'), `<ol class="steps3">${p('market_s').map(x => `<li>${esc(x)}</li>`).join('')}</ol>`, 'wide', 'hand-tap') };
    };
    R.business = async () => { await kb();
      return { k: kpi('1%', p('biz_tax')) + kpi(esc(FREE[L()]), p('biz_free')) + kpi('15', p('biz_15')) + kpi('1 БРВ', L() === 'en' ? 'fee, in person' : L() === 'uz' ? 'boj, shaxsan' : 'пошлина при личной подаче'),
        m: panel(p('biz_my'), `<ol class="steps3">${p('biz_my_s').map(x => `<li>${esc(x)}</li>`).join('')}</ol><a class="btn btn-acc" href="#ptBiz" data-scroll>${esc(t('pf_t'))}</a>`, 'wide', 'chart-line-up')
          + panel(p('biz_open'), para(kbText('ip')), '', 'briefcase') + panel(p('biz_self'), para(kbText('selfemp')), '', 'user-circle')
          + `<form class="pn wide pt-form2" id="ptBiz"><h3>${ic('handshake')}${esc(t('pf_t'))}</h3><div class="f2"><input id="bzN" required maxlength="80" placeholder="${esc(t('pf_name'))}"><input id="bzC" required maxlength="60" placeholder="${esc(t('pf_contact'))}"></div><textarea id="bzM" rows="3" maxlength="800" placeholder="${esc(t('pf_msg'))}"></textarea><button class="btn btn-acc" type="submit">${esc(t('pf_send'))}</button><p class="form-msg" id="bzMsg"></p></form>`,
        after: () => { const f = $('#ptBiz'); f && f.addEventListener('submit', e => { e.preventDefault(); const m = $('#bzMsg'); fetch(`${API}/api/feedback`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text: `[Партнёрство · Бизнес] ${$('#bzN').value.trim()}\nКонтакт: ${$('#bzC').value.trim()}\n${$('#bzM').value.trim()}` }) }).then(r => r.json()).then(j => { if (!j.ok) throw 0; m.className = 'form-msg ok'; m.textContent = t('pf_ok'); f.reset(); }).catch(() => { m.className = 'form-msg err'; m.textContent = t('pf_err'); }); }); } };
    };
    R.safety = async () => { const cams = await layer('speedcam');
      return { k: kpi('112', pick(NUMS['112'])) + kpi('103', pick(NUMS['103'])) + kpi('102', pick(NUMS['102'])) + kpi(fmt(cams.length), p('cams_n')),
        m: panel(p('emerg'), nums(['112', '101', '102', '103', '104', '1050']), 'wide', 'phone')
          + panel(p('sos'), `<ol class="steps3">${p('sos_s').map(x => `<li>${esc(x)}</li>`).join('')}</ol>`, '', 'siren')
          + panel(p('cams'), '<div class="mm sm" id="mmCam"></div>', '', 'video-camera'),
        after: async () => { await leaflet(); const el = $('#mmCam'); if (!el) return; const m = makeMap(el, { z: 11 }); dots(m, cams, '#F87171', 4); } };
    };

    // ---------------- map hub (home section + its own page) ----------------
    const HL = [
      ['med', '#4ADE80', 'first-aid-kit', 'health', 1], ['gov', '#F2B45A', 'bank', 'gov', 1], ['metro', '#EF4444', 'train', 'transport', 1], ['edu', '#A78BFA', 'graduation-cap', 'edu', 0],
      ['mosque', '#2DD4BF', 'mosque', 'faith', 0], ['cafes', '#FB923C', 'fork-knife', 'leisure', 0], ['sight', '#F472B6', 'compass', 'leisure', 0], ['parking', '#60A5FA', 'car', 'transport', 0],
      ['ev', '#FACC15', 'charging-station', 'transport', 0], ['reports', '#F59E0B', 'megaphone', 'mahalla', 0], ['speedcam', '#F87171', 'video-camera', 'safety', 0]];
    const HN = { med: tr3('Аптеки и клиники', 'Dorixona va klinikalar', 'Pharmacies and clinics'), gov: tr3('Госучреждения и ЦГУ', 'Davlat muassasalari', 'Public offices'), metro: tr3('Станции метро', 'Metro bekatlari', 'Metro stations'), edu: tr3('Школы и детсады', "Maktab va bog'chalar", 'Schools and kindergartens'), mosque: tr3('Мечети', 'Masjidlar', 'Mosques'), cafes: tr3('Кафе и рестораны', 'Kafe va restoranlar', 'Cafes and restaurants'), sight: tr3('Достопримечательности', 'Diqqatga sazovor joylar', 'Sights'), parking: tr3('Парковки', 'Parkovkalar', 'Parking'), ev: tr3('Электрозарядки', 'Elektr zaryadlash', 'EV chargers'), reports: tr3('Обращения жителей', 'Aholi murojaatlari', 'Residents’ reports'), speedcam: tr3('Камеры скорости', 'Tezlik kameralari', 'Speed cameras') };
    const hubOn = new Set(HL.filter(x => x[4]).map(x => x[0]));
    function hubHtml(big) {
      return `<div class="hub ${big ? 'big' : ''}"><aside class="hub-side"><label class="hub-q">${ic('compass')}<input class="hubQ" placeholder="${esc(s('search'))}"></label><div class="hub-res"></div><p class="hub-l">${esc(s('layers'))}</p><div class="hub-cats">${HL.map(([k, c, i, sv]) => `<div class="hc ${hubOn.has(k) ? 'on' : ''}" data-k="${k}" style="--c:${c}"><button class="hc-t" data-k="${k}"><span class="hc-ic">${ic(i)}</span><span class="hc-n">${esc(pick(HN[k]))}</span><em class="hc-c" data-c="${k}"></em><i class="sw"></i></button><a class="hc-sv" href="?s=${sv}" data-sv="${sv}" title="${esc(pick(SV[sv].t))}">${ic('arrow-up-right')}</a></div>`).join('')}</div></aside><div class="hub-map"></div><div class="hub-card" hidden></div><div class="hub-count"></div></div>`;
    }
    function hubInit(root) {
      const mapEl = root.querySelector('.hub-map'), card = root.querySelector('.hub-card'), G = {};
      let m = null, data = {};
      const counts = () => { const n = (D.poi && D.poi.n) || {}; root.querySelectorAll('[data-c]').forEach(e => { const k = e.dataset.c; const v = k === 'cafes' ? (D.places && D.places.cities ? D.places.cities['0'] : 0) : k === 'metro' ? (D.transit && D.transit.metro ? D.transit.metro.st.length : 0) : k === 'reports' ? (data.reports ? data.reports.length : '') : (n[k] && n[k]['0']); e.textContent = v ? fmt(v) : ''; }); };
      const show = (k, x) => { const c = HL.find(h => h[0] === k); const sv = c[3], o = isOpen(x.h);
        card.hidden = false; card.style.setProperty('--c', c[1]);
        card.innerHTML = `<button class="hcx" aria-label="close">${ic('x')}</button><span class="hk">${ic(c[2])}${esc(pick(HN[k]))}</span><b>${esc(x.n || x.text || pick(HN[k]))}</b>${x.n2 && x.n2 !== x.n ? `<i>${esc(x.n2)}</i>` : ''}
          ${x.ad ? `<p>${ic('map-pin')}${esc(x.ad)}</p>` : ''}${x.h ? `<p>${ic('calendar-check')}${esc(x.h)}${o !== null ? ` <em class="${o ? 'op' : 'cl'}">${esc(o ? s('open_now') : '')}</em>` : ''}</p>` : ''}${x.ph ? `<p>${ic('phone')}<a href="tel:${esc(x.ph.replace(/\s/g, ''))}">${esc(x.ph)}</a></p>` : ''}
          <div class="hc-b"><a class="btn btn-ghost btn-sm" href="https://yandex.uz/maps/?rtext=~${x.la},${x.lo}&rtt=auto" target="_blank" rel="noopener">${ic('road-horizon')}<span>${esc(s('route'))}</span></a><a class="btn btn-acc btn-sm" href="?s=${sv}" data-sv="${sv}">${esc(s('service'))}: ${esc(pick(SV[sv].t))}</a></div>`;
        card.querySelector('.hcx').onclick = () => { card.hidden = true; }; };
      const draw = async () => { if (!m) return; let total = 0;
        for (const [k, c] of HL) { if (G[k]) { m.removeLayer(G[k]); delete G[k]; } if (!hubOn.has(k)) continue; const list = data[k] || (data[k] = await layer(k)); total += list.length; G[k] = dots(m, list, c, k === 'metro' ? 6 : 4.2, x => show(k, x)); }
        root.querySelector('.hub-count').innerHTML = `<b>${fmt(total)}</b> ${esc(s('points'))}`; counts(); };
      root.querySelector('.hub-cats').addEventListener('click', e => { const b = e.target.closest('.hc-t'); if (!b) return; const k = b.dataset.k; hubOn.has(k) ? hubOn.delete(k) : hubOn.add(k); b.parentElement.classList.toggle('on', hubOn.has(k)); draw(); });
      const q = root.querySelector('.hubQ'), res = root.querySelector('.hub-res');
      q.addEventListener('input', async () => { const v = q.value.trim().toLowerCase(); if (v.length < 2) { res.innerHTML = ''; return; }
        const out = []; for (const [k] of HL) { const list = data[k] || (data[k] = await layer(k)); for (const x of list) { const nm = (x.n || '') + ' ' + (x.n2 || ''); if (nm.toLowerCase().includes(v)) { out.push([k, x]); if (out.length > 7) break; } } if (out.length > 7) break; }
        res.innerHTML = out.map(([k, x], i) => `<button data-i="${i}"><i style="background:${HL.find(h => h[0] === k)[1]}"></i><b>${esc(x.n || '')}</b><span>${esc(pick(HN[k]))}</span></button>`).join('') || `<p class="muted">${esc(s('none'))}</p>`;
        res.onclick = e => { const b = e.target.closest('[data-i]'); if (!b) return; const [k, x] = out[+b.dataset.i]; if (!hubOn.has(k)) { hubOn.add(k); root.querySelector(`.hc[data-k="${k}"]`).classList.add('on'); draw(); } m.flyTo([x.la, x.lo], 16, { duration: RM ? 0 : .8 }); show(k, x); }; });
      const start = () => leaflet().then(() => { m = makeMap(mapEl, { z: 12 }); draw(); });
      if (root.closest('.sv')) start(); else new IntersectionObserver(([e], o) => { if (e.isIntersecting) { o.disconnect(); start(); } }, { rootMargin: '300px' }).observe(mapEl);
      document.addEventListener('mz:data', counts);
    }
    R.map = async () => ({ k: '', m: `<div class="pn wide hub-wrap">${hubHtml(true)}</div>`, after: () => hubInit($('#svMain .hub')) });

    // ---------------- the digital assistant: a robot in a dark green suit; matrix code lives on its glass visor ----------------
    const BOT = { big: '/portal/art/robot.webp?v=1', mid: '/portal/art/robot.webp?v=1', tile: '/portal/art/robot-sm.webp?v=1', tiny: '/portal/art/robot-head.webp?v=1' };
    function ROBOT(cls = 'big') {
      const src = BOT[cls] || BOT.big;
      return `<div class="bot ${cls}" style="--src:url('${src}')"><div class="bot-in"><img class="bot-img" src="${src}" alt="" decoding="async"${cls === 'big' ? '' : ' loading="lazy"'}>
<div class="bot-visor"><canvas></canvas></div><i class="bot-mouth"></i><i class="bot-sheen"></i></div></div>`;
    }
    // falling code on every visor that is on screen
    const robots = new Set();
    const MGL = 'アイウエオカキクケコサシスセソタチツテト0123456789ABCDEF'.split('');
    function robotsTick() {
      robots.forEach(r => {
        if (!r.vis) return; const { cv, ctx } = r; const w = cv.clientWidth, h = cv.clientHeight; if (!w) return;
        const dpr = Math.min(2, devicePixelRatio || 1); if (cv.width !== Math.round(w * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); r.fs = Math.max(6, Math.round(w / 22)) * dpr; r.cols = Array(Math.ceil(cv.width / r.fs)).fill(0).map(() => Math.random() * cv.height / r.fs); }
        ctx.fillStyle = 'rgba(0, 0, 0, .22)'; ctx.globalCompositeOperation = 'destination-out'; ctx.fillRect(0, 0, cv.width, cv.height); ctx.globalCompositeOperation = 'source-over';
        ctx.font = `${r.fs}px monospace`;
        r.cols.forEach((y, i) => { const hot = Math.random() > .94; ctx.fillStyle = hot ? '#E6FFF4' : `rgba(52, 230, 150, ${.5 + Math.random() * .4})`; ctx.fillText(MGL[(Math.random() * MGL.length) | 0], i * r.fs, y * r.fs); r.cols[i] = y * r.fs > cv.height && Math.random() > .95 ? 0 : y + (r.talk ? 1.7 : 1); });
      });
    }
    if (!RM) { let last = 0; const loop = now => { requestAnimationFrame(loop); if (now - last > 66) { last = now; robotsTick(); } }; requestAnimationFrame(loop); }
    const vio = new IntersectionObserver(es => es.forEach(e => { const r = [...robots].find(x => x.el === e.target); if (r) r.vis = e.isIntersecting; }));
    function wireRobots(root = document) {
      root.querySelectorAll('.bot').forEach(el => { if (el.dataset.w) return; el.dataset.w = 1; const cv = el.querySelector('canvas'); const r = { el, cv, ctx: cv.getContext('2d'), vis: false, talk: false }; robots.add(r); vio.observe(el); });
    }
    // the big robots lean a little toward the pointer
    if (!RM && matchMedia('(pointer: fine)').matches) {
      let raf = 0; addEventListener('pointermove', e => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => {
        $$('.bot.big, .bot.mid').forEach(b => { const r = b.getBoundingClientRect(); if (!r.width || r.bottom < 0 || r.top > innerHeight) return;
          const x = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (innerWidth / 2))), y = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height * .3)) / (innerHeight / 2)));
          b.style.setProperty('--rx', (-y * 4).toFixed(2) + 'deg'); b.style.setProperty('--ry', (x * 7).toFixed(2) + 'deg'); }); }); }, { passive: true });
    }
    const setTalk = on => { robots.forEach(r => { r.talk = on; }); document.body.classList.toggle('rb-talking', on); };

    // ---------------- voice: speak replies, listen with the microphone, soft sounds ----------------
    let VOICE = true; try { VOICE = localStorage.getItem('mz-voice') !== '0'; } catch (e) {}
    let actx = null;
    const blip = (f1, f2, d = .12) => { if (!VOICE) return; try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); const o = actx.createOscillator(), gn = actx.createGain(); o.type = 'sine'; o.frequency.setValueAtTime(f1, actx.currentTime); o.frequency.exponentialRampToValueAtTime(f2, actx.currentTime + d); gn.gain.setValueAtTime(.0001, actx.currentTime); gn.gain.exponentialRampToValueAtTime(.06, actx.currentTime + .02); gn.gain.exponentialRampToValueAtTime(.0001, actx.currentTime + d + .05); o.connect(gn).connect(actx.destination); o.start(); o.stop(actx.currentTime + d + .08); } catch (e) {} };
    const LANGV = { ru: 'ru', uz: 'uz', en: 'en' };
    const pickVoice = () => { if (!window.speechSynthesis) return null; const vs = speechSynthesis.getVoices(); const want = LANGV[L()] || 'ru'; const fit = l => vs.filter(v => (v.lang || '').toLowerCase().startsWith(l));
      let c = fit(want); if (!c.length && want === 'uz') c = fit('ru'); if (!c.length) return null; return c.find(v => /natural|neural|online|google|premium|enhanced/i.test(v.name)) || c[0]; };
    function speak(text) {
      if (!VOICE || !window.speechSynthesis) return; const v = pickVoice(); if (!v) return;
      speechSynthesis.cancel(); const clean = String(text).replace(/[•*#]/g, ' ').replace(/https?:\/\/\S+/g, '').replace(/\s+/g, ' ').trim().slice(0, 900);
      const u = new SpeechSynthesisUtterance(clean); u.voice = v; u.lang = v.lang; u.rate = 1.02; u.pitch = .82;
      u.onstart = () => setTalk(true); u.onend = u.onerror = () => setTalk(false); speechSynthesis.speak(u);
    }
    if (window.speechSynthesis) speechSynthesis.onvoiceschanged = () => {};
    const SRC = window.SpeechRecognition || window.webkitSpeechRecognition;
    function listen(btn) {
      if (!SRC) return; const rec = new SRC(); rec.lang = { ru: 'ru-RU', uz: 'uz-UZ', en: 'en-US' }[L()] || 'ru-RU'; rec.interimResults = true; rec.maxAlternatives = 1;
      const inp = $('#aiIn'); btn.classList.add('rec'); blip(660, 990);
      rec.onresult = e => { const r = e.results[e.results.length - 1]; inp.value = r[0].transcript; if (r.isFinal) { btn.classList.remove('rec'); MZ.ask(inp.value); } };
      rec.onerror = rec.onend = () => btn.classList.remove('rec'); try { rec.start(); } catch (e) { btn.classList.remove('rec'); }
    }
    // the chat card gets a microphone, a sound switch and links into the portal's service pages
    const GO2SV = { transport: 'transport', metro: 'transport', bus: 'transport', trains: 'transport', flights: 'transport', transit: 'transport', parking: 'transport', parking_map: 'transport', ev: 'transport', tickets: 'transport',
      med: 'health', doctor: 'health', health: 'health', gov: 'gov', docs: 'gov', queue: 'gov', fines: 'gov', pay_util: 'gov', pay_light: 'gov', realty: 'gov', newbuild: 'gov', family: 'edu', mahalla: 'mahalla', polls: 'mahalla', appeal: 'mahalla', roads: 'mahalla', clean: 'mahalla',
      mosques: 'faith', mosque_map: 'faith', cafes: 'leisure', news: 'leisure', fairs: 'leisure', sights: 'leisure', tourist: 'leisure', marketplace: 'market', sos: 'safety' };
    function wireChat() {
      const card = $('.ai-card'); if (!card || card.dataset.w) return; card.dataset.w = 1;
      const form = $('#aiForm');
      if (SRC) { const mic = document.createElement('button'); mic.type = 'button'; mic.className = 'btn btn-ghost ai-mic'; mic.setAttribute('aria-label', 'mic'); mic.innerHTML = ic('microphone'); mic.onclick = () => listen(mic); form.insertBefore(mic, form.querySelector('.btn-acc')); }
      const top = card.querySelector('.ai-top'); const snd = document.createElement('button'); snd.type = 'button'; snd.className = 'ai-snd' + (VOICE ? ' on' : ''); snd.setAttribute('aria-label', 'sound');
      const paint = () => { snd.innerHTML = `<i class="eq"><b></b><b></b><b></b></i><span>${esc(VOICE ? (L() === 'en' ? 'Voice on' : L() === 'uz' ? 'Ovoz yoqilgan' : 'Голос включён') : (L() === 'en' ? 'Voice off' : L() === 'uz' ? "Ovoz o'chirilgan" : 'Голос выключен'))}</span>`; snd.classList.toggle('on', VOICE); };
      paint(); snd.onclick = () => { VOICE = !VOICE; try { localStorage.setItem('mz-voice', VOICE ? '1' : '0'); } catch (e) {} if (!VOICE && window.speechSynthesis) speechSynthesis.cancel(); paint(); };
      top.appendChild(snd); document.addEventListener('mz:lang', paint);
      form.addEventListener('submit', () => { blip(520, 780, .08); if (window.speechSynthesis) speechSynthesis.cancel(); });
    }
    document.addEventListener('mz:reply', e => { const { text, tags, el } = e.detail; blip(880, 1320, .1); speak(text);
      const svs = [...new Set((tags || []).map(k => GO2SV[k]).filter(Boolean))].slice(0, 2);
      if (svs.length && el) el.insertAdjacentHTML('beforeend', `<span class="msg-go">${svs.map(k => `<a href="?s=${k}" data-sv="${k}">${ic(SV[k].ic)}${esc(pick(SV[k].t))} →</a>`).join('')}</span>`); });

    // big robot beside the chat (home section and the assistant page)
    function agentInit() {
      const box = $('#agent'); if (!box) return;
      if (box.dataset.w) { const id = box.querySelector('.ag-id'); if (id) id.innerHTML = `<span class="dot"></span><b>${esc(s('ag_name'))}</b><i>${esc(s('ag_role'))}</i>`; return; }
      box.dataset.w = 1;
      box.innerHTML = `<canvas class="ag-rain"></canvas><div class="ag-ring"></div>${ROBOT('big')}<div class="ag-id"><span class="dot"></span><b>${esc(s('ag_name'))}</b><i>${esc(s('ag_role'))}</i></div>`;
      wireRobots(box); rain(box.querySelector('.ag-rain'), box);
    }
    function rain(cv, box) {
      if (RM || !cv) return; const ctx = cv.getContext('2d'); let cols = [], W = 0, H = 0, fs = 14, last = 0, vis = true;
      const size = () => { W = cv.width = box.clientWidth; H = cv.height = box.clientHeight; cols = Array(Math.ceil(W / fs)).fill(0).map(() => Math.random() * H / fs); };
      size(); addEventListener('resize', size); new IntersectionObserver(([e]) => { vis = e.isIntersecting; }).observe(box);
      const tick = now => { requestAnimationFrame(tick); if (!vis || now - last < 60) return; last = now; if (!W) size(); ctx.fillStyle = 'rgba(6, 22, 13, .18)'; ctx.fillRect(0, 0, W, H); ctx.font = fs + 'px monospace';
        cols.forEach((y, i) => { ctx.fillStyle = Math.random() > .96 ? '#CCFBF1' : 'rgba(45, 212, 191, .5)'; ctx.fillText(MGL[(Math.random() * MGL.length) | 0], i * fs, y * fs); cols[i] = y * fs > H && Math.random() > .975 ? 0 : y + 1; }); };
      requestAnimationFrame(tick);
    }

    // floating robot on every screen: opens the same chat beside it
    function dockInit() {
      if ($('#dock')) return;
      document.body.insertAdjacentHTML('beforeend', `<div class="dock" id="dock"><div class="dock-panel" id="dockPanel" hidden><button class="dock-x" aria-label="close">${ic('x')}</button><div class="dock-bot">${ROBOT('mid')}<div class="dock-name"><span class="dot"></span><b>${esc(s('ag_name'))}</b><i>${esc(s('ag_status'))}</i></div></div><div class="dock-chat" id="dockChat"></div></div>
        <button class="dock-btn" id="dockBtn" aria-label="assistant"><span class="dock-bub">${esc(L() === 'en' ? 'Ask me anything' : L() === 'uz' ? "Menga savol bering" : 'Спросите меня')}</span><span class="dock-av">${ROBOT('tiny')}</span></button></div>`);
      wireRobots($('#dock'));
      const btn = $('#dockBtn'), panel = $('#dockPanel'), host = $('#dockChat');
      let greeted = false;
      const open = () => { const card = $('.ai-card'); host.appendChild(card); panel.hidden = false; $('#dock').classList.add('open'); blip(440, 880, .16);
        if (!greeted) { greeted = true; speak(L() === 'en' ? 'Hello! I am the MyUzCity digital assistant. How can I help?' : L() === 'uz' ? "Assalomu alaykum! Men MyUzCity raqamli yordamchisiman. Sizga qanday yordam bera olaman?" : 'Здравствуйте! Я цифровой ассистент MyUzCity. Чем могу помочь?'); }
        setTimeout(() => $('#aiIn').focus(), 300); };
      const close = () => { panel.hidden = true; $('#dock').classList.remove('open'); const ai = $('#ai'); const card = $('.ai-card'); if (ai && card && card.parentElement === host) ai.appendChild(card); };
      btn.onclick = () => (panel.hidden ? open() : close()); panel.querySelector('.dock-x').onclick = close;
      // hide while the big assistant is on screen
      const ai = $('#ai'); if (ai) new IntersectionObserver(([e]) => { $('#dock').classList.toggle('away', e.isIntersecting && !ai.closest('#svView')); if (e.isIntersecting && !panel.hidden) close(); }, { threshold: .25 }).observe(ai);
      document.addEventListener('mz:lang', () => { $('.dock-bub').textContent = L() === 'en' ? 'Ask me anything' : L() === 'uz' ? 'Menga savol bering' : 'Спросите меня'; $('.dock-name b').textContent = s('ag_name'); $('.dock-name i').textContent = s('ag_status'); });
      window.MZdock = { close, open };
    }

    // ---------------- routing with smooth transitions ----------------
    async function openSv(k, push, fromEl) {
      if (!SV[k]) k = null;
      const go = async () => {
        maps.splice(0).forEach(m => { try { m.remove(); } catch (e) {} });
        if (!k) { $('#dock') && $('#dock').classList.remove('gone'); view.hidden = true; view.innerHTML = ''; home.hidden = false; document.body.classList.remove('on-sv'); cur = null; document.title = t('title'); return; }
        cur = k; home.hidden = true; view.hidden = false; document.body.classList.add('on-sv');
        if (window.MZdock) MZdock.close(); $('#dock') && $('#dock').classList.toggle('gone', k === 'ai');
        if (k === 'ai') { view.innerHTML = `<div class="sv sv-ai" style="--g:${SV.ai.g}"><div class="sv-ai-in" id="aiHost"></div></div>`; $('#aiHost').appendChild($('#ai')); $('#ai').classList.add('in-page'); }
        else { view.innerHTML = shell(k); }
        document.title = `${pick(SV[k].t)} · MyUzCity`;
        scrollTo(0, 0);
      };
      if (!k || k !== 'ai') { const a = $('#ai'); if (a && a.classList.contains('in-page')) { a.classList.remove('in-page'); $('#aiHome').appendChild(a); } }
      if (fromEl) { const img = fromEl.querySelector('img'); if (img) img.style.viewTransitionName = 'sv-art'; }
      if (document.startViewTransition && !RM) await document.startViewTransition(go).updateCallbackDone; else await go();
      if (fromEl) { const img = fromEl.querySelector('img'); if (img) img.style.viewTransitionName = ''; }
      if (push) history.pushState({ s: k }, '', k ? `?s=${k}${L() !== 'ru' ? '&lang=' + L() : ''}` : location.pathname + (L() !== 'ru' ? '?lang=' + L() : ''));
      if (k && k !== 'ai') fill(k);
    }
    async function fill(k) {
      const r = await (R[k] ? R[k]() : Promise.resolve({ k: '', m: '' }));
      if (cur !== k) return;
      const kp = $('#svK'); if (kp) kp.innerHTML = r.k || '';
      const mn = $('#svMain'); if (mn) mn.innerHTML = r.m || '';
      if (r.after) try { await r.after(); } catch (e) {}
    }
    document.addEventListener('click', e => {
      const a = e.target.closest('a[data-sv]'); if (a && !e.metaKey && !e.ctrlKey) { e.preventDefault(); openSv(a.dataset.sv, true, a.classList.contains('tile') ? a : null); return; }
      const h = e.target.closest('a[data-home]'); if (h) { e.preventDefault(); openSv(null, true).then(() => { const id = h.dataset.home; if (id) { const el = document.getElementById(id); el && el.scrollIntoView({ behavior: RM ? 'auto' : 'smooth' }); } }); return; }
      const ask = e.target.closest('[data-ask]'); if (ask) { e.preventDefault(); const q = ask.dataset.ask; if (window.MZdock) { MZdock.open(); setTimeout(() => MZ.ask(q), 250); } else openSv('ai', true).then(() => MZ.ask(q)); return; }
      const sc = e.target.closest('a[data-scroll]'); if (sc) { e.preventDefault(); const el = document.querySelector(sc.getAttribute('href')); el && el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      const nav = e.target.closest('.nav a[href^="#"]'); if (nav && cur) { e.preventDefault(); const id = nav.getAttribute('href').slice(1); openSv(null, true).then(() => { const el = document.getElementById(id); el && el.scrollIntoView(); }); }
    });
    addEventListener('popstate', () => openSv(new URLSearchParams(location.search).get('s'), false));
    document.addEventListener('mz:lang', () => { renderCatalog(); wireRobots($('#svcGrid')); agentInit(); if (cur) { const k = cur; cur = null; openSv(k, false); } });
    document.addEventListener('mz:data', () => { if (cur === 'transport' && !$('#svMain .board')) fill('transport'); });

    // story steps and nav links point to the service pages
    $$('.go-app[data-sv]').forEach(a => { a.href = `?s=${a.dataset.sv}`; });
    renderCatalog(); wireRobots($('#svcGrid')); agentInit(); wireChat(); dockInit();
    const hubHome = $('#hubHome'); if (hubHome) { hubHome.innerHTML = hubHtml(false); hubInit(hubHome.querySelector('.hub')); const hh = $('#hubT'); if (hh) { hh.textContent = s('hub_t'); $('#hubS').textContent = s('hub_s'); } }
    const s0 = new URLSearchParams(location.search).get('s'); if (s0) openSv(s0, false);
  }
})();
