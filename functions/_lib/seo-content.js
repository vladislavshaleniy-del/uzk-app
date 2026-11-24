// SEO texts of myuzcity.uz: title, description and keywords of every page in every language,
// plus the visible text block (heading, paragraphs, list, FAQ) the server adds above the footer.
// Pages: home and every service of the portal (keys match SV in portal/pages.js).
// Keep titles under ~65 characters and descriptions under ~165.

export const SITE = 'https://myuzcity.uz';
export const APP_URL = 'https://app.myuzcity.uz/';
export const LANGS = ['ru', 'uz', 'en'];
export const LOCALE = { ru: 'ru_RU', uz: 'uz_UZ', en: 'en_US' };
export const LANG_NAME = { ru: 'Русский', uz: "O'zbekcha", en: 'English' };

export const UI = {
  ru: { faq: 'Частые вопросы', svc: 'Все сервисы MyUzCity', lang: 'Язык сайта', home: 'Главная', app: 'Приложение MyUzCity', cities: 'Города' },
  uz: { faq: "Ko'p beriladigan savollar", svc: 'MyUzCity barcha xizmatlari', lang: 'Sayt tili', home: 'Bosh sahifa', app: 'MyUzCity ilovasi', cities: 'Shaharlar' },
  en: { faq: 'Frequently asked questions', svc: 'All MyUzCity services', lang: 'Site language', home: 'Home', app: 'MyUzCity app', cities: 'Cities' },
};

export const PAGES = {
  // ======================================================================= RU
  ru: {
    home: {
      title: 'MyUzCity — Умный Ташкент: приложение умного города Узбекистана',
      desc: 'Умный город в телефоне: метро и автобусы, аптеки и клиники, госуслуги, детсады, время намаза, махалля, тревожная кнопка и ИИ-помощник. Бесплатно.',
      kw: 'умный Ташкент, умный город, умный Узбекистан, smart city Ташкент, приложение Ташкент, городские сервисы, цифровой Ташкент, MyUzCity, транспорт Ташкента, аптеки Ташкента, госуслуги Узбекистана, время намаза Ташкент, махалля онлайн',
      h: 'MyUzCity — умный Ташкент и умный Узбекистан в одном приложении',
      p: [
        'MyUzCity — бесплатное приложение умного города для жителей и гостей Ташкента и всего Узбекистана. В одном месте собраны городские сервисы, которые обычно разбросаны по десяткам сайтов, ботов и приложений: транспорт, медицина, госуслуги, образование, махалля, отдых и безопасность.',
        'Умный город начинается с простых вещей: узнать, где ближайшая открытая аптека и как доехать на метро, как оформить загранпаспорт или записать ребёнка в детский сад, сообщить о яме во дворе и увидеть, как её чинят. MyUzCity отвечает на эти вопросы за секунды на узбекском, русском и английском, а цифровой ИИ-помощник подскажет голосом или текстом.',
        'Больше всего данных — по Ташкенту. Аптеки, клиники, парковки, мечети и заведения также собраны для Самарканда, Бухары, Андижана, Намангана, Ферганы, Ургенча и Хивы. Приложение работает в браузере на любом телефоне, Android или iPhone: откройте app.myuzcity.uz и добавьте иконку на главный экран.',
      ],
      faq: [
        ['Что такое MyUzCity?', 'MyUzCity — приложение умного города: все городские сервисы Ташкента и Узбекистана в одном месте. Транспорт, аптеки и клиники, госуслуги, детсады и школы, махалля, время намаза, афиша, маркетплейс соседей, тревожная кнопка и ИИ-помощник.'],
        ['Сколько стоит MyUzCity?', 'Для жителей MyUzCity бесплатен. Вход через Telegram, паспортные данные не нужны.'],
        ['Как установить MyUzCity на телефон?', 'Откройте app.myuzcity.uz. На iPhone: Safari → «Поделиться» → «На экран „Домой“». На Android: Chrome → меню ⋮ → «Установить приложение». После этого MyUzCity открывается с иконки, как обычное приложение.'],
        ['В каких городах работает MyUzCity?', 'Полнее всего — в Ташкенте. Аптеки, клиники, парковки, мечети и заведения есть также для Самарканда, Бухары, Андижана, Намангана, Ферганы, Ургенча и Хивы.'],
        ['На каких языках работает приложение?', 'Сайт и ИИ-помощник работают на узбекском, русском и английском языках, в приложении есть ещё китайский.'],
        ['Как сообщить о яме, мусоре или неработающем освещении?', 'В разделе «Махалля и город» сфотографируйте проблему и поставьте точку на карте. Сообщение видят соседи и ответственные службы, а статусы «в работе» и «решено» приходят вам в Telegram.'],
        ['Кто видит мои данные?', 'Ваши документы и машины в профиле видите только вы. Аккаунт удаляется в один тап. Подробно — в политике конфиденциальности.'],
      ],
    },
    transport: {
      title: 'Транспорт Ташкента — метро, автобусы, поезда, рейсы | MyUzCity',
      desc: 'Схема и станции метро Ташкента, маршруты автобусов и остановки рядом, поезда Afrosiyob, живое табло вылетов аэропортов Узбекистана и цены на проезд.',
      kw: 'транспорт Ташкента, метро Ташкента, схема метро Ташкента, автобусы Ташкента, маршруты автобусов, остановки, расписание поездов, Afrosiyob, табло аэропорта Ташкент, вылеты, такси, парковки Ташкента, стоимость проезда, умный транспорт',
      a: 'Транспорт: метро, автобусы, поезда и рейсы',
      h: 'Умный транспорт Ташкента',
      p: [
        'Всё о том, как передвигаться по Ташкенту и Узбекистану, в одном разделе: линии и станции метро на карте, автобусные маршруты и более 1 300 остановок, поезда Afrosiyob и Sharq, живое табло вылетов аэропортов страны и цены на проезд.',
        'В приложении MyUzCity транспорт работает по геолокации: ближайшие станции и остановки, маршрут пешком или на такси, парковки и электрозарядки на карте.',
      ],
      li: ['Метро Ташкента: все линии и станции', 'Автобусы: маршруты и остановки рядом', 'Поезда: расписание и билеты на eticket.railway.uz', 'Аэропорты: живое табло вылетов', 'Такси, парковки и электрозарядки на карте'],
    },
    health: {
      title: 'Аптеки и клиники Ташкента рядом, круглосуточно | MyUzCity',
      desc: 'Аптеки и клиники Ташкента на карте с часами работы, круглосуточные аптеки рядом, онлайн-запись к врачу через DMED, скорая 103 и экстренные номера.',
      kw: 'аптеки Ташкента, аптека рядом, круглосуточная аптека, аптека 24/7 Ташкент, клиники Ташкента, поликлиника, запись к врачу, DMED, скорая помощь 103, медицина Узбекистана',
      a: 'Здоровье: аптеки, клиники, запись к врачу',
      h: 'Медицина умного города',
      p: [
        'Найдите аптеку или клинику, которая открыта прямо сейчас: на карте MyUzCity тысячи медицинских учреждений Ташкента и других городов Узбекистана с часами работы, телефонами и маршрутом.',
        'Здесь же запись к врачу через DMED, круглосуточные аптеки и все экстренные номера: скорая 103, единый номер 112 и колл-центр DMED 1003.',
      ],
      li: ['Аптеки и клиники рядом с вами', 'Круглосуточные аптеки 24/7', 'Онлайн-запись к врачу через DMED', 'Скорая помощь 103 в один тап'],
    },
    gov: {
      title: 'Госуслуги Узбекистана: загранпаспорт, ID-карта, права | MyUzCity',
      desc: 'Как оформить загранпаспорт, ID-карту, права, прописку, справку о несудимости, пособие или ИП в Узбекистане: сроки, пошлины и куда обращаться.',
      kw: 'госуслуги Узбекистана, my.gov.uz, загранпаспорт Узбекистан, ID-карта, водительские права, прописка Ташкент, справка о несудимости, ЗАГС, OneID, ЭЦП, штрафы ПДД, пенсия, детские пособия, ЦГУ, электронное правительство',
      a: 'Госуслуги: документы, справки, пошлины',
      h: 'Госуслуги по жизненным ситуациям',
      p: [
        'Пошаговые инструкции по главным госуслугам Узбекистана: загранпаспорт и ID-карта, водительские права и штрафы ПДД, прописка, справка о несудимости, ЗАГС, OneID и электронная подпись, пенсия, детские пособия, коммунальные услуги и регистрация бизнеса. Для каждой услуги указаны сроки, размер пошлины и куда обращаться: my.gov.uz или Центр госуслуг.',
        'В приложении MyUzCity можно хранить сроки своих документов: паспорта, прав, страховки и техосмотра. Бот в Telegram напомнит за 30, 7 и 1 день до окончания.',
      ],
      li: ['Загранпаспорт и ID-карта', 'Водительские права, покупка авто и штрафы', 'Прописка, ЗАГС и справки', 'Пенсия и детские пособия', 'Горячие линии госорганов', 'Напоминания о сроках документов'],
    },
    edu: {
      title: 'Детские сады и школы Ташкента: очередь, 1 класс | MyUzCity',
      desc: 'Школы, детские сады и вузы Ташкента на карте, очередь в детский сад, запись в первый класс и электронный дневник. Всё об образовании в Узбекистане.',
      kw: 'детские сады Ташкента, детсад рядом, очередь в детский сад, запись в детсад, школы Ташкента, запись в первый класс, первый класс, электронный дневник, Kundalik, вузы Ташкента, образование Узбекистан',
      a: 'Образование: детсады, школы, 1 класс',
      h: 'Образование в умном городе',
      p: [
        'Все школы, детские сады и вузы Ташкента на одной карте: адреса, маршрут и то, что находится рядом с домом. Плюс понятные инструкции, как встать в очередь в детский сад и записать ребёнка в первый класс: приём начинается 20 июня.',
        'Ссылки на электронный дневник и школьные сервисы собраны в одном разделе, чтобы родителям не приходилось искать их по разным сайтам.',
      ],
      li: ['Школы и детские сады на карте', 'Очередь в детский сад', 'Запись в первый класс', 'Электронный дневник'],
    },
    mahalla: {
      title: 'Махалля онлайн: обращения, опросы, чат соседей | MyUzCity',
      desc: 'Сообщите о яме, мусоре или неработающем освещении с фото и точкой на карте, голосуйте в опросах махалли и города. Статус обращения приходит в Telegram.',
      kw: 'махалля онлайн, махалля Ташкент, жалоба на яму, обращение в хокимият, вывоз мусора, освещение двора, опросы жителей, открытый бюджет, openbudget, чат соседей, гражданское участие, умный город',
      a: 'Махалля и город: обращения, опросы, соседи',
      h: 'Махалля онлайн: голос каждого жителя',
      p: [
        'Яма на дороге, переполненные мусорные баки, не горит фонарь во дворе? Сфотографируйте проблему и отметьте её на карте. Обращение видят соседи и ответственные службы, а статусы «в работе» и «решено» приходят вам в Telegram.',
        'Голосуйте в опросах города и махалли с честным подсчётом голосов, следите за инициативами «Открытого бюджета» и общайтесь с соседями в чате махалли.',
      ],
      li: ['Обращения с фото и точкой на карте', 'Статусы обращений в Telegram', 'Опросы города и махалли', 'Чат соседей'],
    },
    faith: {
      title: 'Время намаза в Ташкенте сегодня и мечети рядом | MyUzCity',
      desc: 'Точное время намаза в Ташкенте на сегодня: бомдод, пешин, аср, шом, хуфтон. Все мечети города на карте, включая исторические, и мечеть рядом с вами.',
      kw: 'время намаза Ташкент, намоз вақтлари, расписание намаза, время намаза сегодня, мечети Ташкента, мечеть рядом, пятничный намаз, исторические мечети, Рамадан, ифтар',
      a: 'Намаз и мечети: время намаза, мечети рядом',
      h: 'Время намаза и мечети Ташкента',
      p: [
        'MyUzCity показывает точное время пяти ежедневных намазов для Ташкента и вашего города — бомдод, пешин, аср, шом и хуфтон — и сколько осталось до следующего.',
        'На карте собраны все мечети города, включая исторические, с маршрутом от вашего местоположения. Удобно в Рамадан, в поездках и в незнакомом районе.',
      ],
      li: ['Время намаза на сегодня', 'Следующий намаз и обратный отсчёт', 'Мечети рядом на карте', 'Исторические мечети'],
    },
    leisure: {
      title: 'Кафе, рестораны и афиша Ташкента | MyUzCity',
      desc: 'Тысячи кафе и ресторанов Ташкента с кухней, часами работы и маршрутом, афиша событий и главные достопримечательности. Куда пойти сегодня.',
      kw: 'кафе Ташкента, рестораны Ташкента, где поесть в Ташкенте, афиша Ташкента, куда пойти в Ташкенте, концерты Ташкент, достопримечательности Ташкента, отдых в Ташкенте, туристу в Узбекистане',
      a: 'Отдых: кафе, рестораны, афиша',
      h: 'Куда пойти в Ташкенте',
      p: [
        'Места для отдыха в Ташкенте: тысячи кафе и ресторанов с кухней и часами работы, афиша концертов, спектаклей и событий и главные достопримечательности города.',
        'Туристам MyUzCity помогает сориентироваться в Ташкенте, Самарканде, Бухаре и Хиве на трёх языках, а жителям — найти новое место рядом с домом.',
      ],
      li: ['Кафе и рестораны с кухней и часами работы', 'Афиша событий', 'Достопримечательности', 'Маршрут до места'],
    },
    map: {
      title: 'Карта Ташкента: аптеки, парковки, школы, мечети | MyUzCity',
      desc: 'Карта Ташкента со всеми городскими сервисами: аптеки и клиники, школы и детсады, госучреждения, метро, парковки, электрозарядки, мечети и камеры скорости.',
      kw: 'карта Ташкента, интерактивная карта Ташкента, карта города, аптеки на карте, парковки Ташкента, электрозарядки Ташкент, камеры скорости Ташкент, школы на карте, мечети на карте, умная карта города',
      a: 'Город на карте: все сервисы на одной карте',
      h: 'Умная карта Ташкента',
      p: [
        'Все сервисы MyUzCity на одной карте: включайте слои, ищите места и открывайте нужный раздел в один клик. Аптеки и клиники, школы и детские сады, госучреждения и Центры госуслуг, станции метро, кафе, парковки, электрозарядки, мечети, камеры скорости и обращения жителей.',
        'Карта построена на данных OpenStreetMap и открытых источников и обновляется автоматически.',
      ],
    },
    market: {
      title: 'Объявления Ташкента: купить, продать, отдать даром | MyUzCity',
      desc: 'Маркетплейс соседей: продайте ненужное или отдайте даром людям из вашего города. Бесплатные объявления в Ташкенте, связь напрямую через Telegram.',
      kw: 'объявления Ташкент, бесплатные объявления, барахолка Ташкент, продать вещи, купить б/у, отдам даром, маркетплейс соседей, объявления Узбекистан',
      a: 'Маркетплейс: объявления жителей',
      h: 'Маркетплейс соседей',
      p: [
        'Продайте то, что больше не нужно, или отдайте даром соседям. Сфотографируйте вещь, укажите цену, и объявление увидят жители вашего города. Покупатель напишет вам напрямую в Telegram, без посредников.',
        'Размещать объявления можно бесплатно.',
      ],
    },
    business: {
      title: 'Открыть ИП в Узбекистане, налоги, самозанятость | MyUzCity',
      desc: 'Как открыть ИП или стать самозанятым в Узбекистане, какие налоги платить и как MyUzCity приводит жителей к вашему бизнесу: место на карте и реклама.',
      kw: 'открыть ИП Узбекистан, регистрация ИП, самозанятость Узбекистан, налоги ИП, налог с оборота, бизнес в Ташкенте, реклама на карте, продвижение бизнеса Ташкент',
      a: 'Бизнесу: ИП, налоги, реклама на карте',
      h: 'Бизнес в умном городе',
      p: [
        'Понятные инструкции для предпринимателей: как зарегистрировать ИП примерно за 15 минут, как бесплатно стать самозанятым и какие налоги платить.',
        'MyUzCity приводит жителей к вашему бизнесу: заведение на карте с часами работы, телефоном и маршрутом, рекомендации ИИ-помощника по запросам жителей и реклама для жителей вашего района. Для партнёрства оставьте заявку на главной странице.',
      ],
      li: ['Регистрация ИП', 'Самозанятость', 'Налоги для ИП', 'Ваше заведение на карте MyUzCity'],
    },
    safety: {
      title: 'Тревожная кнопка и экстренные номера Узбекистана | MyUzCity',
      desc: 'Тревожная кнопка: одно нажатие, и близкие получают вашу геолокацию в Telegram. Экстренные номера 101, 102, 103, 104, 112 и камеры скорости на карте.',
      kw: 'тревожная кнопка, экстренные номера Узбекистана, 101 102 103 104, 112 Узбекистан, полиция, скорая помощь, МЧС 1050, камеры скорости Ташкент, безопасный город',
      a: 'Безопасность: тревожная кнопка, экстренные номера',
      h: 'Безопасный город',
      p: [
        'Тревожная кнопка MyUzCity: добавьте близких в приложении, и в опасной ситуации одно нажатие отправит им вашу геолокацию в Telegram.',
        'Все экстренные службы в один тап: пожарная служба 101, полиция 102, скорая 103, газовая служба 104, единый номер 112 и спасатели МЧС 1050. На карте — камеры контроля скорости.',
      ],
      li: ['Тревожная кнопка с геолокацией', 'Экстренные номера в один тап', 'Камеры скорости на карте'],
    },
    ai: {
      title: 'ИИ-помощник по Ташкенту и госуслугам | MyUzCity',
      desc: 'Цифровой ассистент MyUzCity знает город, госуслуги и цены: ближайшая аптека, время намаза, как оформить загранпаспорт. На узбекском, русском и английском.',
      kw: 'ИИ-помощник, искусственный интеллект Ташкент, чат-бот госуслуги, цифровой ассистент, AI Узбекистан, умный помощник, вопросы о Ташкенте',
      a: 'Цифровой ассистент: спросите о городе',
      h: 'ИИ, который знает город',
      p: [
        'Цифровой ассистент MyUzCity отвечает на вопросы о Ташкенте и Узбекистане: где ближайшая аптека 24/7, когда следующий намаз, как оформить загранпаспорт или ID-карту, сколько стоит проезд. Спрашивайте голосом или текстом на узбекском, русском или английском.',
        'Ассистент бесплатный и работает прямо на сайте и в приложении.',
      ],
    },
  },

  // ======================================================================= UZ
  uz: {
    home: {
      title: "MyUzCity — Aqlli Toshkent: aqlli shahar ilovasi",
      desc: "Aqlli shahar telefoningizda: metro va avtobuslar, dorixona va klinikalar, davlat xizmatlari, bog'chalar, namoz vaqti, mahalla, xavf tugmasi va AI-yordamchi. Bepul.",
      kw: "Aqlli Toshkent, aqlli shahar, Aqlli O'zbekiston, smart city Toshkent, Toshkent ilovasi, shahar xizmatlari, raqamli Toshkent, MyUzCity, Toshkent transporti, Toshkent dorixonalari, davlat xizmatlari, namoz vaqti Toshkent, mahalla onlayn",
      h: "MyUzCity — Aqlli Toshkent va Aqlli O'zbekiston bitta ilovada",
      p: [
        "MyUzCity — Toshkent va butun O'zbekiston aholisi hamda mehmonlari uchun bepul aqlli shahar ilovasi. Odatda o'nlab sayt, bot va ilovalarga tarqalib ketgan shahar xizmatlari bir joyga yig'ilgan: transport, tibbiyot, davlat xizmatlari, ta'lim, mahalla, dam olish va xavfsizlik.",
        "Aqlli shahar oddiy narsalardan boshlanadi: eng yaqin ochiq dorixona qayerda va metroda qanday borish, xorijga chiqish pasportini qanday olish yoki bolani bog'chaga yozish, hovlidagi chuqur haqida xabar berish va uning qanday tuzatilayotganini ko'rish. MyUzCity bu savollarga o'zbek, rus va ingliz tillarida bir zumda javob beradi, raqamli AI-yordamchi esa ovoz yoki matn orqali yordam beradi.",
        "Eng ko'p ma'lumot Toshkent bo'yicha. Dorixona, klinika, parkovka, masjid va muassasalar Samarqand, Buxoro, Andijon, Namangan, Farg'ona, Urganch va Xiva uchun ham yig'ilgan. Ilova har qanday telefonda, Android yoki iPhone'da brauzerda ishlaydi: app.myuzcity.uz ni oching va belgini bosh ekranga qo'shing.",
      ],
      faq: [
        ["MyUzCity nima?", "MyUzCity — aqlli shahar ilovasi: Toshkent va O'zbekistonning barcha shahar xizmatlari bir joyda. Transport, dorixona va klinikalar, davlat xizmatlari, bog'cha va maktablar, mahalla, namoz vaqti, afisha, qo'shnilar marketpleysi, xavf tugmasi va AI-yordamchi."],
        ["MyUzCity qancha turadi?", "Aholi uchun MyUzCity bepul. Telegram orqali kirish, pasport ma'lumotlari kerak emas."],
        ["MyUzCity'ni telefonga qanday o'rnatish mumkin?", "app.myuzcity.uz ni oching. iPhone'da: Safari → «Ulashish» → «Bosh ekranga». Android'da: Chrome → menyu ⋮ → «Ilovani o'rnatish». Shundan so'ng MyUzCity oddiy ilova kabi belgidan ochiladi."],
        ["MyUzCity qaysi shaharlarda ishlaydi?", "Eng to'liq — Toshkentda. Dorixona, klinika, parkovka, masjid va muassasalar Samarqand, Buxoro, Andijon, Namangan, Farg'ona, Urganch va Xiva uchun ham bor."],
        ["Ilova qaysi tillarda ishlaydi?", "Sayt va AI-yordamchi o'zbek, rus va ingliz tillarida ishlaydi, ilovada xitoy tili ham bor."],
        ["Chuqur, chiqindi yoki yonmayotgan chiroq haqida qanday xabar beraman?", "«Mahalla va shahar» bo'limida muammoni suratga oling va xaritada belgilang. Xabarni qo'shnilar va mas'ul xizmatlar ko'radi, «ishda» va «hal qilindi» holatlari esa sizga Telegramda keladi."],
        ["Ma'lumotlarimni kim ko'radi?", "Profilingizdagi hujjat va mashinalarni faqat siz ko'rasiz. Akkaunt bir bosishda o'chiriladi. Batafsil — maxfiylik siyosatida."],
      ],
    },
    transport: {
      title: "Toshkent transporti — metro, avtobus, poyezd, reyslar | MyUzCity",
      desc: "Toshkent metrosi sxemasi va bekatlari, avtobus yo'nalishlari va yaqin bekatlar, Afrosiyob poyezdlari, aeroportlarning jonli tablosi va yo'l haqi.",
      kw: "Toshkent transporti, Toshkent metrosi, metro sxemasi, avtobus yo'nalishlari, bekatlar, poyezdlar jadvali, Afrosiyob, aeroport tablosi, reyslar, taksi, parkovka, yo'l haqi, aqlli transport",
      a: "Transport: metro, avtobus, poyezd va reyslar",
      h: "Toshkentning aqlli transporti",
      p: [
        "Toshkent va O'zbekiston bo'ylab qanday yurish haqida hammasi bitta bo'limda: xaritada metro liniyalari va bekatlari, avtobus yo'nalishlari va 1 300 dan ortiq bekat, Afrosiyob va Sharq poyezdlari, mamlakat aeroportlarining jonli uchish tablosi va yo'l haqi.",
        "MyUzCity ilovasida transport geolokatsiya bo'yicha ishlaydi: eng yaqin bekatlar, piyoda yoki taksida yo'nalish, xaritada parkovka va elektr zaryadlash shoxobchalari.",
      ],
      li: ["Toshkent metrosi: barcha liniya va bekatlar", "Avtobuslar: yo'nalishlar va yaqin bekatlar", "Poyezdlar: jadval va eticket.railway.uz da chiptalar", "Aeroportlar: jonli uchish tablosi", "Taksi, parkovka va elektr zaryadlash xaritada"],
    },
    health: {
      title: "Toshkentdagi dorixona va klinikalar, kecha-kunduz | MyUzCity",
      desc: "Toshkent dorixona va klinikalari ish vaqti bilan xaritada, yaqin kecha-kunduz dorixonalar, DMED orqali shifokorga yozilish, tez yordam 103.",
      kw: "Toshkent dorixonalari, yaqin dorixona, kecha-kunduz dorixona, dorixona 24/7, Toshkent klinikalari, poliklinika, shifokorga yozilish, DMED, tez yordam 103, tibbiyot",
      a: "Sog'liq: dorixona, klinika, shifokorga yozilish",
      h: "Aqlli shahar tibbiyoti",
      p: [
        "Hozir ochiq bo'lgan dorixona yoki klinikani toping: MyUzCity xaritasida Toshkent va O'zbekistonning boshqa shaharlaridagi minglab tibbiyot muassasalari ish vaqti, telefoni va yo'nalishi bilan.",
        "Shu yerda DMED orqali shifokorga yozilish, kecha-kunduz dorixonalar va barcha favqulodda raqamlar: tez yordam 103, yagona raqam 112 va DMED call-markazi 1003.",
      ],
      li: ["Yaqin dorixona va klinikalar", "Kecha-kunduz ishlaydigan dorixonalar", "DMED orqali shifokorga onlayn yozilish", "Tez yordam 103 bir bosishda"],
    },
    gov: {
      title: "Davlat xizmatlari: xorijga pasport, ID-karta | MyUzCity",
      desc: "Xorijga chiqish pasporti, ID-karta, guvohnoma, propiska, sudlanmaganlik ma'lumotnomasi, nafaqa yoki YaTT qanday rasmiylashtiriladi: muddat, boj, manzil.",
      kw: "davlat xizmatlari, my.gov.uz, xorijga chiqish pasporti, ID-karta, haydovchilik guvohnomasi, propiska, sudlanmaganlik ma'lumotnomasi, FHDYo, OneID, ERI, YHQ jarimalari, pensiya, bolalar nafaqasi, DXM, elektron hukumat",
      a: "Davlat xizmatlari: hujjatlar, ma'lumotnomalar, bojlar",
      h: "Hayotiy vaziyatlar bo'yicha davlat xizmatlari",
      p: [
        "O'zbekistonning asosiy davlat xizmatlari bo'yicha bosqichma-bosqich yo'riqnomalar: xorijga chiqish pasporti va ID-karta, haydovchilik guvohnomasi va YHQ jarimalari, propiska, sudlanmaganlik ma'lumotnomasi, FHDYo, OneID va elektron imzo, pensiya, bolalar nafaqasi, kommunal xizmatlar va biznesni ro'yxatdan o'tkazish. Har bir xizmat uchun muddat, boj miqdori va qayerga murojaat qilish ko'rsatilgan: my.gov.uz yoki Davlat xizmatlari markazi.",
        "MyUzCity ilovasida hujjatlaringiz muddatini saqlash mumkin: pasport, guvohnoma, sug'urta va texnik ko'rik. Telegram bot tugashidan 30, 7 va 1 kun oldin eslatadi.",
      ],
      li: ["Xorijga chiqish pasporti va ID-karta", "Haydovchilik guvohnomasi, avtomobil va jarimalar", "Propiska, FHDYo va ma'lumotnomalar", "Pensiya va bolalar nafaqasi", "Davlat idoralarining ishonch telefonlari", "Hujjatlar muddati haqida eslatmalar"],
    },
    edu: {
      title: "Toshkent bog'chalari va maktablari: navbat, 1-sinf | MyUzCity",
      desc: "Toshkent maktablari, bog'chalari va OTMlari xaritada, bog'chaga navbat, birinchi sinfga yozilish va elektron kundalik. O'zbekistonda ta'lim haqida hammasi.",
      kw: "Toshkent bog'chalari, yaqin bog'cha, bog'chaga navbat, bog'chaga yozilish, Toshkent maktablari, birinchi sinfga yozilish, 1-sinf, elektron kundalik, Kundalik, Toshkent OTMlari, ta'lim",
      a: "Ta'lim: bog'cha, maktab, 1-sinf",
      h: "Aqlli shaharda ta'lim",
      p: [
        "Toshkentning barcha maktab, bog'cha va oliy ta'lim muassasalari bitta xaritada: manzil, yo'nalish va uyingiz yaqinida nima borligi. Bog'chaga navbatga turish va bolani birinchi sinfga yozish bo'yicha tushunarli yo'riqnomalar: qabul 20 iyunda boshlanadi.",
        "Elektron kundalik va maktab xizmatlariga havolalar bitta bo'limda yig'ilgan, ota-onalar ularni turli saytlardan qidirmasligi uchun.",
      ],
      li: ["Xaritada maktab va bog'chalar", "Bog'chaga navbat", "Birinchi sinfga yozilish", "Elektron kundalik"],
    },
    mahalla: {
      title: "Mahalla onlayn: murojaatlar, so'rovnomalar | MyUzCity",
      desc: "Chuqur, chiqindi yoki yonmayotgan chiroq haqida surat va xaritadagi nuqta bilan xabar bering, mahalla va shahar so'rovnomalarida ovoz bering. Holati Telegramga keladi.",
      kw: "mahalla onlayn, Toshkent mahallalari, chuqur haqida shikoyat, hokimiyatga murojaat, chiqindi olib ketish, hovli yoritilishi, aholi so'rovnomalari, ochiq byudjet, openbudget, qo'shnilar chati, aqlli shahar",
      a: "Mahalla va shahar: murojaatlar, so'rovnomalar, qo'shnilar",
      h: "Mahalla onlayn: har bir aholining ovozi",
      p: [
        "Yo'ldagi chuqur, to'lib ketgan chiqindi qutilari, hovlida chiroq yonmayaptimi? Muammoni suratga oling va xaritada belgilang. Murojaatni qo'shnilar va mas'ul xizmatlar ko'radi, «ishda» va «hal qilindi» holatlari esa sizga Telegramda keladi.",
        "Shahar va mahalla so'rovnomalarida halol ovoz sanash bilan ovoz bering, «Ochiq byudjet» tashabbuslarini kuzating va mahalla chatida qo'shnilar bilan muloqot qiling.",
      ],
      li: ["Surat va xaritadagi nuqta bilan murojaat", "Murojaat holati Telegramda", "Shahar va mahalla so'rovnomalari", "Qo'shnilar chati"],
    },
    faith: {
      title: "Toshkentda bugungi namoz vaqti va yaqin masjidlar | MyUzCity",
      desc: "Toshkent uchun bugungi aniq namoz vaqtlari: bomdod, peshin, asr, shom, xufton. Shahardagi barcha masjidlar xaritada, tarixiylari bilan, va yaqin masjid.",
      kw: "namoz vaqti Toshkent, namoz vaqtlari, bugungi namoz vaqti, Toshkent masjidlari, yaqin masjid, juma namozi, tarixiy masjidlar, Ramazon, iftor vaqti",
      a: "Namoz va masjidlar: namoz vaqti, yaqin masjidlar",
      h: "Toshkentda namoz vaqti va masjidlar",
      p: [
        "MyUzCity Toshkent va sizning shahringiz uchun besh vaqt namozning aniq vaqtini ko'rsatadi — bomdod, peshin, asr, shom va xufton — va keyingisigacha qancha qolganini.",
        "Xaritada shahardagi barcha masjidlar, tarixiylari bilan, joylashuvingizdan yo'nalish bilan. Ramazonda, safarda va notanish mahallada qulay.",
      ],
      li: ["Bugungi namoz vaqtlari", "Keyingi namoz va teskari sanoq", "Yaqin masjidlar xaritada", "Tarixiy masjidlar"],
    },
    leisure: {
      title: "Toshkent kafe, restoranlari va afishasi | MyUzCity",
      desc: "Toshkentdagi minglab kafe va restoranlar oshxonasi, ish vaqti va yo'nalishi bilan, tadbirlar afishasi va diqqatga sazovor joylar. Bugun qayerga borish mumkin.",
      kw: "Toshkent kafelari, Toshkent restoranlari, Toshkentda qayerda ovqatlanish, Toshkent afishasi, Toshkentda qayerga borish, konsertlar, diqqatga sazovor joylar, dam olish, sayyohlar uchun",
      a: "Dam olish: kafe, restoran, afisha",
      h: "Toshkentda qayerga borish mumkin",
      p: [
        "Toshkentda dam olish joylari: oshxonasi va ish vaqti ko'rsatilgan minglab kafe va restoranlar, konsert, spektakl va tadbirlar afishasi hamda shaharning asosiy diqqatga sazovor joylari.",
        "Sayyohlarga MyUzCity Toshkent, Samarqand, Buxoro va Xivada uch tilda yo'l topishga yordam beradi, aholiga esa uy yaqinida yangi joy topishga.",
      ],
      li: ["Oshxonasi va ish vaqti bilan kafe va restoranlar", "Tadbirlar afishasi", "Diqqatga sazovor joylar", "Joygacha yo'nalish"],
    },
    map: {
      title: "Toshkent xaritasi: dorixona, parkovka, maktab, masjid | MyUzCity",
      desc: "Barcha shahar xizmatlari bilan Toshkent xaritasi: dorixona va klinikalar, maktab va bog'chalar, davlat idoralari, metro, parkovka, elektr zaryadlash, masjid va kameralar.",
      kw: "Toshkent xaritasi, interaktiv xarita, shahar xaritasi, xaritada dorixonalar, Toshkent parkovkalari, elektr zaryadlash, tezlik kameralari, xaritada maktablar, xaritada masjidlar, aqlli xarita",
      a: "Shahar xaritada: barcha xizmatlar bitta xaritada",
      h: "Toshkentning aqlli xaritasi",
      p: [
        "MyUzCity'ning barcha xizmatlari bitta xaritada: qatlamlarni yoqing, joylarni qidiring va kerakli bo'limni bir bosishda oching. Dorixona va klinikalar, maktab va bog'chalar, davlat idoralari va Davlat xizmatlari markazlari, metro bekatlari, kafelar, parkovkalar, elektr zaryadlash, masjidlar, tezlik kameralari va aholi murojaatlari.",
        "Xarita OpenStreetMap va ochiq manbalar ma'lumotlari asosida qurilgan va avtomatik yangilanadi.",
      ],
    },
    market: {
      title: "Toshkent e'lonlari: sotish, sotib olish, tekin | MyUzCity",
      desc: "Qo'shnilar marketpleysi: keraksiz narsani soting yoki shahringiz aholisiga tekin bering. Toshkentda bepul e'lonlar, Telegram orqali to'g'ridan-to'g'ri aloqa.",
      kw: "Toshkent e'lonlari, bepul e'lonlar, baraxolka Toshkent, narsa sotish, ishlatilgan buyumlar, tekin beraman, qo'shnilar marketpleysi, O'zbekiston e'lonlari",
      a: "Marketpleys: aholi e'lonlari",
      h: "Qo'shnilar marketpleysi",
      p: [
        "Endi kerak bo'lmagan narsani soting yoki qo'shnilarga tekin bering. Buyumni suratga oling, narx qo'ying va e'lonni shahringiz aholisi ko'radi. Xaridor sizga vositachilarsiz, to'g'ridan-to'g'ri Telegramda yozadi.",
        "E'lon joylashtirish bepul.",
      ],
    },
    business: {
      title: "O'zbekistonda YaTT ochish, soliqlar | MyUzCity",
      desc: "O'zbekistonda YaTT ochish yoki o'zini o'zi band qilish, qaysi soliqlarni to'lash va MyUzCity aholini biznesingizga qanday olib keladi: xaritada joy va reklama.",
      kw: "YaTT ochish, YaTT ro'yxatdan o'tkazish, o'zini o'zi band qilish, YaTT soliqlari, aylanmadan soliq, Toshkentda biznes, xaritada reklama, biznesni targ'ib qilish",
      a: "Biznesga: YaTT, soliqlar, xaritada reklama",
      h: "Aqlli shaharda biznes",
      p: [
        "Tadbirkorlar uchun tushunarli yo'riqnomalar: YaTTni taxminan 15 daqiqada qanday ro'yxatdan o'tkazish, qanday qilib bepul o'zini o'zi band qilgan shaxs bo'lish va qaysi soliqlarni to'lash.",
        "MyUzCity aholini biznesingizga olib keladi: xaritada ish vaqti, telefon va yo'nalish bilan muassasa, aholi so'roviga ko'ra AI-yordamchining tavsiyalari va tumaningiz aholisi uchun reklama. Hamkorlik uchun bosh sahifada ariza qoldiring.",
      ],
      li: ["YaTT ro'yxatdan o'tkazish", "O'zini o'zi band qilish", "YaTT soliqlari", "MyUzCity xaritasida muassasangiz"],
    },
    safety: {
      title: "Xavf tugmasi va O'zbekiston favqulodda raqamlari | MyUzCity",
      desc: "Xavf tugmasi: bir bosish va yaqinlaringiz Telegramda joylashuvingizni oladi. Favqulodda raqamlar 101, 102, 103, 104, 112 va xaritada tezlik kameralari.",
      kw: "xavf tugmasi, favqulodda raqamlar, 101 102 103 104, 112 O'zbekiston, politsiya, tez yordam, FVV 1050, tezlik kameralari Toshkent, xavfsiz shahar",
      a: "Xavfsizlik: xavf tugmasi, favqulodda raqamlar",
      h: "Xavfsiz shahar",
      p: [
        "MyUzCity xavf tugmasi: ilovada yaqinlaringizni qo'shing, xavfli vaziyatda esa bitta bosish ularga Telegramda joylashuvingizni yuboradi.",
        "Barcha favqulodda xizmatlar bir bosishda: yong'in xizmati 101, politsiya 102, tez yordam 103, gaz avariya xizmati 104, yagona raqam 112 va FVV qutqaruvchilari 1050. Xaritada tezlik nazorati kameralari.",
      ],
      li: ["Joylashuv bilan xavf tugmasi", "Favqulodda raqamlar bir bosishda", "Xaritada tezlik kameralari"],
    },
    ai: {
      title: "Toshkent va davlat xizmatlari bo'yicha AI-yordamchi | MyUzCity",
      desc: "MyUzCity raqamli yordamchisi shahar, davlat xizmatlari va narxlarni biladi: yaqin dorixona, namoz vaqti, xorijga pasport. O'zbek, rus va ingliz tillarida.",
      kw: "AI-yordamchi, sun'iy intellekt Toshkent, davlat xizmatlari chat-bot, raqamli yordamchi, AI O'zbekiston, aqlli yordamchi, Toshkent haqida savollar",
      a: "Raqamli yordamchi: shahar haqida so'rang",
      h: "Shaharni biladigan sun'iy intellekt",
      p: [
        "MyUzCity raqamli yordamchisi Toshkent va O'zbekiston haqidagi savollarga javob beradi: eng yaqin kecha-kunduz dorixona qayerda, keyingi namoz qachon, xorijga chiqish pasporti yoki ID-kartani qanday olish, yo'l haqi qancha. O'zbek, rus yoki ingliz tilida ovoz yoki matn orqali so'rang.",
        "Yordamchi bepul va to'g'ridan-to'g'ri saytda hamda ilovada ishlaydi.",
      ],
    },
  },

  // ======================================================================= EN
  en: {
    home: {
      title: 'MyUzCity — Smart Tashkent: the smart city app of Uzbekistan',
      desc: 'A smart city in your phone: metro and buses, pharmacies and clinics, public services, kindergartens, prayer times, mahalla, a panic button and an AI assistant. Free.',
      kw: 'Smart Tashkent, smart city, Smart Uzbekistan, smart city Tashkent, Tashkent app, city services, digital Tashkent, MyUzCity, Tashkent transport, Tashkent pharmacies, Uzbekistan public services, Tashkent prayer times, Uzbekistan travel app',
      h: 'MyUzCity — Smart Tashkent and Smart Uzbekistan in one app',
      p: [
        'MyUzCity is a free smart city app for residents and visitors of Tashkent and the whole of Uzbekistan. It brings together city services that are usually scattered across dozens of websites, bots and apps: transport, healthcare, public services, education, mahalla, leisure and safety.',
        'A smart city starts with simple things: finding the nearest open pharmacy and the right metro line, learning how to get a passport or enrol a child in kindergarten, reporting a pothole in your street and watching it get fixed. MyUzCity answers in seconds in Uzbek, Russian and English, and the AI assistant helps by voice or text.',
        'Tashkent has the most data. Pharmacies, clinics, parking, mosques and venues are also available for Samarkand, Bukhara, Andijan, Namangan, Fergana, Urgench and Khiva. The app runs in the browser of any phone, Android or iPhone: open app.myuzcity.uz and add the icon to your home screen.',
      ],
      faq: [
        ['What is MyUzCity?', 'MyUzCity is a smart city app: every city service of Tashkent and Uzbekistan in one place. Transport, pharmacies and clinics, public services, kindergartens and schools, mahalla, prayer times, events, a neighbours’ marketplace, a panic button and an AI assistant.'],
        ['How much does MyUzCity cost?', 'MyUzCity is free for residents. You sign in with Telegram; no passport details are needed.'],
        ['How do I install MyUzCity on my phone?', 'Open app.myuzcity.uz. On iPhone: Safari → Share → Add to Home Screen. On Android: Chrome → menu ⋮ → Install app. MyUzCity then opens from its icon like any other app.'],
        ['Which cities does MyUzCity cover?', 'Tashkent is covered most fully. Pharmacies, clinics, parking, mosques and venues are also available for Samarkand, Bukhara, Andijan, Namangan, Fergana, Urgench and Khiva.'],
        ['Which languages does it support?', 'The website and the AI assistant work in Uzbek, Russian and English; the app also has Chinese.'],
        ['How do I report a pothole, rubbish or a broken street light?', 'In Mahalla and city, take a photo of the problem and drop a pin on the map. Neighbours and the responsible services see the report, and you get “in progress” and “solved” updates in Telegram.'],
        ['Who can see my data?', 'Only you can see the documents and cars in your profile. You can delete your account in one tap. Details are in the privacy policy.'],
      ],
    },
    transport: {
      title: 'Tashkent transport — metro, buses, trains, flights | MyUzCity',
      desc: 'Tashkent metro map and stations, bus routes and stops near you, Afrosiyob trains, live departure boards of Uzbekistan’s airports and current fares.',
      kw: 'Tashkent transport, Tashkent metro, Tashkent metro map, Tashkent buses, bus routes, Uzbekistan train timetable, Afrosiyob, Tashkent airport departures, taxi, parking, fares, smart mobility',
      a: 'Transport: metro, buses, trains and flights',
      h: 'Smart transport in Tashkent',
      p: [
        'Everything about getting around Tashkent and Uzbekistan in one place: metro lines and stations on a map, bus routes and more than 1,300 stops, Afrosiyob and Sharq trains, live departure boards of the country’s airports and current fares.',
        'In the MyUzCity app, transport works from your location: the nearest stations and stops, walking or taxi directions, and parking and EV chargers on the map.',
      ],
      li: ['Tashkent metro: every line and station', 'Buses: routes and stops nearby', 'Trains: timetables and tickets on eticket.railway.uz', 'Airports: live departures', 'Taxis, parking and EV chargers on the map'],
    },
    health: {
      title: 'Pharmacies and clinics in Tashkent, open now | MyUzCity',
      desc: 'Pharmacies and clinics in Tashkent on a map with opening hours, 24/7 pharmacies near you, doctor booking via DMED, ambulance 103 and emergency numbers.',
      kw: 'Tashkent pharmacy, pharmacy near me, 24/7 pharmacy Tashkent, clinics in Tashkent, hospital Tashkent, doctor appointment, DMED, ambulance 103, healthcare Uzbekistan',
      a: 'Health: pharmacies, clinics, doctor booking',
      h: 'Healthcare in a smart city',
      p: [
        'Find a pharmacy or clinic that is open right now: the MyUzCity map shows thousands of medical facilities in Tashkent and other cities of Uzbekistan with opening hours, phone numbers and directions.',
        'Book a doctor through DMED, find 24/7 pharmacies and reach every emergency line: ambulance 103, the single number 112 and the DMED call centre 1003.',
      ],
      li: ['Pharmacies and clinics near you', '24/7 pharmacies', 'Online doctor booking via DMED', 'Ambulance 103 in one tap'],
    },
    gov: {
      title: 'Uzbekistan public services: passport, ID card | MyUzCity',
      desc: 'How to get a passport, ID card, driving licence, residence registration, criminal record certificate or benefits, or register a business in Uzbekistan.',
      kw: 'Uzbekistan public services, my.gov.uz, Uzbekistan passport, ID card Uzbekistan, driving licence Uzbekistan, residence registration Tashkent, criminal record certificate, OneID, e-signature, traffic fines, pension, child benefits, e-government',
      a: 'Public services: documents, certificates, fees',
      h: 'Public services by life situation',
      p: [
        'Step-by-step guides to Uzbekistan’s main public services: travel passport and ID card, driving licence and traffic fines, residence registration, criminal record certificate, civil registry, OneID and e-signature, pensions, child benefits, utilities and business registration. Each guide lists the timeline, the fee and where to go: my.gov.uz or a Public Services Centre.',
        'In the MyUzCity app you can keep the expiry dates of your passport, licence, insurance and vehicle inspection. The Telegram bot reminds you 30, 7 and 1 day before they expire.',
      ],
      li: ['Travel passport and ID card', 'Driving licence, buying a car and fines', 'Residence registration, civil registry and certificates', 'Pensions and child benefits', 'Government hotlines', 'Document expiry reminders'],
    },
    edu: {
      title: 'Kindergartens and schools in Tashkent | MyUzCity',
      desc: 'Schools, kindergartens and universities in Tashkent on a map, the kindergarten queue, first-grade enrolment and the e-diary. Education in Uzbekistan.',
      kw: 'Tashkent kindergartens, kindergarten near me, kindergarten queue, Tashkent schools, first grade enrolment, e-diary, Kundalik, universities in Tashkent, education Uzbekistan, international family Tashkent',
      a: 'Education: kindergartens, schools, first grade',
      h: 'Education in a smart city',
      p: [
        'Every school, kindergarten and university in Tashkent on one map: addresses, directions and what is close to home. Plus clear guides on joining the kindergarten queue and enrolling a child in first grade: enrolment opens on 20 June.',
        'Links to the e-diary and school services are gathered in one section, so parents don’t have to search for them across different websites.',
      ],
      li: ['Schools and kindergartens on the map', 'Kindergarten queue', 'First-grade enrolment', 'E-diary'],
    },
    mahalla: {
      title: 'Mahalla online: reports, polls, neighbours | MyUzCity',
      desc: 'Report a pothole, rubbish or a broken street light with a photo and a pin on the map, vote in mahalla and city polls. Get status updates in Telegram.',
      kw: 'mahalla online, Tashkent mahalla, report pothole, city complaint Tashkent, rubbish collection, street lighting, residents polls, open budget, openbudget, neighbours chat, civic participation, smart city',
      a: 'Mahalla and city: reports, polls, neighbours',
      h: 'Mahalla online: every resident has a voice',
      p: [
        'A pothole on the road, overflowing bins, a street light out in your yard? Take a photo of the problem and pin it on the map. Neighbours and the responsible services see the report, and “in progress” and “solved” updates come to you in Telegram.',
        'Vote in city and mahalla polls with an honest vote count, follow Open Budget initiatives and talk to neighbours in the mahalla chat.',
      ],
      li: ['Reports with a photo and a map pin', 'Report status in Telegram', 'City and mahalla polls', 'Neighbours chat'],
    },
    faith: {
      title: 'Prayer times in Tashkent today and mosques nearby | MyUzCity',
      desc: 'Exact prayer times in Tashkent for today: Fajr, Dhuhr, Asr, Maghrib and Isha. Every mosque in the city on a map, including historic ones, and the nearest mosque.',
      kw: 'Tashkent prayer times, namaz times Tashkent, prayer times today, mosques in Tashkent, mosque near me, Friday prayer, historic mosques, Ramadan Tashkent, iftar time',
      a: 'Prayer and mosques: prayer times, mosques nearby',
      h: 'Prayer times and mosques of Tashkent',
      p: [
        'MyUzCity shows the exact times of the five daily prayers for Tashkent and your city — Fajr (Bomdod), Dhuhr (Peshin), Asr, Maghrib (Shom) and Isha (Xufton) — and how long until the next one.',
        'Every mosque in the city, including historic ones, is on the map with directions from where you are. Handy during Ramadan, while travelling and in an unfamiliar district.',
      ],
      li: ['Prayer times for today', 'Next prayer countdown', 'Mosques nearby on the map', 'Historic mosques'],
    },
    leisure: {
      title: 'Cafes, restaurants and events in Tashkent | MyUzCity',
      desc: 'Thousands of cafes and restaurants in Tashkent with cuisine, hours and directions, upcoming events and the city’s top sights. Where to go today.',
      kw: 'Tashkent cafes, Tashkent restaurants, where to eat in Tashkent, Tashkent events, things to do in Tashkent, concerts Tashkent, Tashkent sights, Uzbekistan travel, tourist in Tashkent',
      a: 'Leisure: cafes, restaurants, events',
      h: 'Things to do in Tashkent',
      p: [
        'Places to go in Tashkent: thousands of cafes and restaurants with cuisine and opening hours, concerts, shows and events, and the city’s top sights.',
        'For visitors, MyUzCity makes it easy to find your way around Tashkent, Samarkand, Bukhara and Khiva in three languages; for residents, it helps discover new places near home.',
      ],
      li: ['Cafes and restaurants with cuisine and hours', 'Events', 'Sights', 'Directions to the place'],
    },
    map: {
      title: 'Tashkent map: pharmacies, parking, schools, mosques | MyUzCity',
      desc: 'A Tashkent map with every city service: pharmacies and clinics, schools and kindergartens, public offices, metro, parking, EV chargers, mosques and speed cameras.',
      kw: 'Tashkent map, interactive map of Tashkent, city map, pharmacies on the map, Tashkent parking, EV charging Tashkent, speed cameras Tashkent, schools map, mosques map, smart city map',
      a: 'City map: every service on one map',
      h: 'The smart map of Tashkent',
      p: [
        'Every MyUzCity service on one map: switch layers on, search for places and open a service in one click. Pharmacies and clinics, schools and kindergartens, public offices and Public Services Centres, metro stations, cafes, parking, EV chargers, mosques, speed cameras and residents’ reports.',
        'The map is built on OpenStreetMap and open data and updates automatically.',
      ],
    },
    market: {
      title: 'Tashkent classifieds: buy, sell, give away | MyUzCity',
      desc: 'A neighbours’ marketplace: sell what you don’t need or give it away to people in your city. Free listings in Tashkent, contact directly via Telegram.',
      kw: 'Tashkent classifieds, free listings Tashkent, flea market Tashkent, sell used items, buy second hand, give away for free, neighbours marketplace, Uzbekistan classifieds',
      a: 'Marketplace: listings from residents',
      h: 'The neighbours’ marketplace',
      p: [
        'Sell what you no longer need or give it away to neighbours. Take a photo, set a price, and residents of your city see the listing. The buyer writes to you directly in Telegram, with no middlemen.',
        'Posting listings is free.',
      ],
    },
    business: {
      title: 'Start a business in Uzbekistan: taxes, self-employment | MyUzCity',
      desc: 'How to register as a sole trader or become self-employed in Uzbekistan, which taxes apply and how MyUzCity brings residents to your business.',
      kw: 'start a business Uzbekistan, sole trader registration Uzbekistan, self-employed Uzbekistan, taxes Uzbekistan, turnover tax, business in Tashkent, map advertising, promote business Tashkent',
      a: 'Business: registration, taxes, map placement',
      h: 'Doing business in a smart city',
      p: [
        'Clear guides for entrepreneurs: how to register as a sole trader in about 15 minutes, how to become self-employed for free and which taxes to pay.',
        'MyUzCity brings residents to your business: your venue on the map with hours, phone and directions, recommendations from the AI assistant when residents ask, and ads for residents of your district. To partner with us, leave a request on the home page.',
      ],
      li: ['Sole trader registration', 'Self-employment', 'Taxes for sole traders', 'Your venue on the MyUzCity map'],
    },
    safety: {
      title: 'Panic button and Uzbekistan emergency numbers | MyUzCity',
      desc: 'A panic button: one tap and your loved ones get your location in Telegram. Emergency numbers 101, 102, 103, 104, 112 and speed cameras on the map.',
      kw: 'panic button app, Uzbekistan emergency numbers, 101 102 103 104, 112 Uzbekistan, police Uzbekistan, ambulance Tashkent, rescue 1050, speed cameras Tashkent, safe city',
      a: 'Safety: panic button, emergency numbers',
      h: 'A safe city',
      p: [
        'The MyUzCity panic button: add your loved ones in the app, and in danger one tap sends them your location in Telegram.',
        'Every emergency service in one tap: fire 101, police 102, ambulance 103, gas emergency 104, the single number 112 and rescue 1050. Speed cameras are on the map.',
      ],
      li: ['Panic button with your location', 'Emergency numbers in one tap', 'Speed cameras on the map'],
    },
    ai: {
      title: 'AI assistant for Tashkent and public services | MyUzCity',
      desc: 'The MyUzCity digital assistant knows the city, public services and prices: the nearest pharmacy, prayer times, how to get a passport. In Uzbek, Russian and English.',
      kw: 'AI assistant Tashkent, artificial intelligence Uzbekistan, public services chatbot, digital assistant, AI Uzbekistan, smart assistant, questions about Tashkent',
      a: 'Digital assistant: ask about the city',
      h: 'An AI that knows the city',
      p: [
        'The MyUzCity digital assistant answers questions about Tashkent and Uzbekistan: where the nearest 24/7 pharmacy is, when the next prayer is, how to get a passport or ID card, how much a ride costs. Ask by voice or text in Uzbek, Russian or English.',
        'The assistant is free and works right on the website and in the app.',
      ],
    },
  },
};
