/* UZK demo flows: native screens (multilingual) that complete the user journeys of the Figma prototype.
   Nothing here talks to real services: every "payment", "appointment" or "appeal" is a demo. */
'use strict';
let LANG = 'ru';
try { LANG = localStorage.getItem('uzk-lang') || 'ru'; } catch (e) {}
const LANGS = { ru: 'Русский', uz: "O'zbekcha", en: 'English', zh: '中文' };

const I = {
  ru: {
    demo: 'Демо-режим: реальные платежи и заявки не выполняются', back: 'Назад', done: 'Готово', close: 'Закрыть', cancel: 'Отмена', confirm: 'Подтвердить',
    sum: 'сум', pay: 'Оплатить', paying: 'Проводим оплату…', paid: 'Оплачено', recipient: 'Получатель', amount: 'Сумма', method: 'Способ оплаты', date: 'Дата и время', txn: 'Транзакция',
    cashback: 'Начислено {n} баллов кешбэка', points: 'Баллы кешбэка', pointsBal: 'доступно {n}', receipt: 'Чек отправлен в «Мои документы»', share: 'Поделиться чеком', shared: 'Чек скопирован',
    chooseAmount: 'Выберите сумму', commission: 'Комиссия 0 сум', checkout: 'Оплата',
    p_qr: 'Оплата по QR', p_qr_to: 'Супермаркет «Baraka», Юнусабад', p_fine: 'Оплата штрафа', p_fine_to: 'Штраф: превышение скорости, 3 июня 2026', p_util: 'Оплата ЖКХ', p_util_to: 'Электричество, вода, интернет',
    p_utilp: 'Оплата баллами', p_utilp_to: 'Электричество · лицевой номер 0399718', p_light: 'Оплата электричества', p_light_to: 'Электричество · лицевой номер 0399718', p_transit: 'Пополнение транспортной карты', p_transit_to: 'Цифровая карта •• 2847',
    p_tourist: 'Пополнение Tashkent Tourist Card', p_tourist_to: 'Tourist Card •• 5678', p_ticket: 'Билет на поезд', p_ticket_to: 'Afrosiyob · Ташкент → Самарканд', p_ipo: 'Покупка акций', p_donate: 'Пожертвование', p_event: 'Билет на мероприятие', p_event_to: 'Tashkent Book Fest · Uzexpocentre',
    ok_transit: 'Баланс карты пополнен', ok_ipo: 'Заявка на покупку акций принята', ok_donate: 'Спасибо за помощь!',
    welcome_t: 'Все городские услуги Ташкента — в одном приложении', welcome_s: 'Госуслуги, платежи, транспорт, здоровье и AI-помощник', lang: 'Язык', oneid: 'Войти через OneID', myid: 'Войти через MyID (Face ID)',
    oneid_t: 'Вход через OneID', oneid_req: 'UZK запрашивает доступ к данным:', oneid_items: 'ФИО и фото|ПИНФЛ|Номер телефона|Адрес прописки', allow: 'Разрешить', checking: 'Проверяем данные…',
    myid_t: 'Вход через MyID', myid_s: 'Посмотрите в камеру', myid_ok: 'Личность подтверждена', logout_q: 'Выйти из аккаунта?', logout: 'Выйти',
    doc_t: 'Запись к врачу', spec: 'Выберите специалиста', s_ther: 'Терапевт', s_ped: 'Педиатр', s_dent: 'Стоматолог', s_card: 'Кардиолог', s_oph: 'Офтальмолог', s_neu: 'Невролог', near: 'ближайшее время: {t}',
    clinic: 'Поликлиника №5, ул. Бабура, 12', chooseDate: 'Дата', chooseTime: 'Время', book: 'Записаться', booked: 'Вы записаны к врачу', doctorName: 'Доктор Исламова М.А.', cancel_q: 'Отменить запись к врачу?', cancelled: 'Запись отменена',
    med_t: 'Электронная мед. книжка', med1: 'Терапевт · ОРВИ', med2: 'Анализ крови · норма', med3: 'Стоматолог · пломба', med4: 'Вакцинация · грипп', rx: 'Рецепт',
    appeal_ok: 'Обращение отправлено', appeal_s: 'Хоким района получит его сегодня', st1: 'Принято', st2: 'На рассмотрении', st3: 'Ответ — до 15 рабочих дней', num: 'Номер заявки',
    sos_ok: 'Сигнал тревоги отправлен', sos_s: 'Ваше местоположение передано дежурной службе', call_q: 'Позвонить {n}?', call_demo: 'Звонок в демо-режиме не выполняется', call: 'Позвонить', calling: 'Демо: вызов {n}',
    sent: 'Сообщение отправлено', voted: 'Ваш голос учтён', poll_t: 'Опрос', p_yes: 'За', p_no: 'Против', p_abs: 'Воздержусь', vote: 'Проголосовать', thanks: 'Спасибо! Ваш голос учтён',
    q1: 'Поддерживаете ли вы строительство велодорожки протяжённостью 3 км в парке Алишера Навои?', q2: 'Следует ли продлить работу метро до 01:00 по выходным?', q3: 'Нужна ли современная детская площадка в микрорайоне Юнусабад?',
    queue_t: 'Электронная очередь', queue_where: 'Центр госуслуг', q_c1: 'ЦГУ Юнусабадского района', q_c2: 'ЦГУ Мирабадского района', q_c3: 'ЦГУ Чиланзарского района', queue_ok: 'Вы записаны в очередь', ticket: 'Ваш талон', come: 'Приходите к {t}',
    tickets_t: 'Билеты: Ташкент → Самарканд', train: 'Поезд', choose: 'Выбрать', seats: 'мест: {n}', book_t: 'Бронирование столика', guests: 'Гостей', booking_ok: 'Столик забронирован', reserve: 'Забронировать',
    ipo_t: 'Покупка акций', price: 'Цена за акцию', qty: 'Количество', total: 'Итого', buy: 'Купить', doc_v: 'Документ', show_qr: 'Покажите QR-код для проверки документа', valid: 'Действителен до', issued: 'Выдан',
    org_t: 'Благотворительность', help_amt: 'Помочь фонду', volunteer: 'Стать волонтёром', vol_ok: 'Заявка волонтёра отправлена',
    prog_apply: 'Подать заявку', prog_ok: 'Заявка принята', prog_s: 'Менеджер свяжется с вами в течение 2 рабочих дней',
    diary_t: 'Электронный дневник', kinder_ok: 'Заявление в детский сад подано', soon: 'Раздел появится в полной версии', receipts_t: 'Квитанции', chat_t: 'Чат махалли «Бабур»',
    chat1: 'Ассаламу алайкум! Завтра субботник в 9:00 у гузара.', chat2: 'Отлично, приду с детьми 👍', chat3: 'Голосование за шлагбаум до пятницы — не забудьте!', msg: 'Сообщение…',
    ai_t: 'AI Агент', typing: 'печатает…', ai_light_q: 'Оплатить за свет', ai_light_a: 'Задолженность за электричество — 24 500 сум. Из-за жары +42°C запаса хватит примерно на 36 часов. Оплатить сейчас?',
    ai_metro_q: 'Купить билет на метро', ai_metro_a: 'Пополню вашу транспортную карту на 20 000 сум — это 11 поездок на метро. Подтвердить?', ai_doc_q: 'Записаться к врачу', ai_doc_a: 'Ближайшее свободное время у терапевта — завтра в 10:00, Поликлиника №5. Записать вас?',
    ai_pay: 'Оплатить 24 500 сум', ai_top: 'Пополнить на 20 000 сум', ai_book: 'Да, записать', listening: 'Слушаю…', fine_found: 'Найден 1 неоплаченный штраф', data_oneid: 'Данные получены из OneID', settings_saved: 'Настройки сохранены',
  },
  uz: {
    demo: "Demo rejim: haqiqiy to'lovlar va arizalar bajarilmaydi", back: 'Orqaga', done: 'Tayyor', close: 'Yopish', cancel: 'Bekor qilish', confirm: 'Tasdiqlash',
    sum: "so'm", pay: "To'lash", paying: "To'lov amalga oshirilmoqda…", paid: "To'landi", recipient: 'Qabul qiluvchi', amount: 'Summa', method: "To'lov usuli", date: 'Sana va vaqt', txn: 'Tranzaksiya',
    cashback: '{n} keshbek bali hisoblandi', points: 'Keshbek ballari', pointsBal: '{n} mavjud', receipt: "Chek «Hujjatlarim»ga yuborildi", share: 'Chekni ulashish', shared: 'Chek nusxalandi',
    chooseAmount: 'Summani tanlang', commission: "Komissiya 0 so'm", checkout: "To'lov",
    p_qr: "QR orqali to'lov", p_qr_to: '«Baraka» supermarketi, Yunusobod', p_fine: "Jarima to'lovi", p_fine_to: 'Jarima: tezlikni oshirish, 3-iyun 2026', p_util: "Kommunal to'lov", p_util_to: 'Elektr, suv, internet',
    p_utilp: "Ballar bilan to'lov", p_utilp_to: 'Elektr · shaxsiy raqam 0399718', p_light: "Elektr uchun to'lov", p_light_to: 'Elektr · shaxsiy raqam 0399718', p_transit: "Transport kartasini to'ldirish", p_transit_to: 'Raqamli karta •• 2847',
    p_tourist: "Tashkent Tourist Card to'ldirish", p_tourist_to: 'Tourist Card •• 5678', p_ticket: 'Poyezd chiptasi', p_ticket_to: 'Afrosiyob · Toshkent → Samarqand', p_ipo: 'Aksiya xaridi', p_donate: 'Xayriya', p_event: 'Tadbirga chipta', p_event_to: 'Tashkent Book Fest · Uzexpocentre',
    ok_transit: "Karta balansi to'ldirildi", ok_ipo: 'Aksiya xarid qilish arizasi qabul qilindi', ok_donate: 'Yordamingiz uchun rahmat!',
    welcome_t: 'Toshkentning barcha shahar xizmatlari — bitta ilovada', welcome_s: "Davlat xizmatlari, to'lovlar, transport, sog'liq va AI yordamchi", lang: 'Til', oneid: 'OneID orqali kirish', myid: 'MyID orqali kirish (Face ID)',
    oneid_t: 'OneID orqali kirish', oneid_req: "UZK quyidagi ma'lumotlarga ruxsat so'raydi:", oneid_items: 'F.I.Sh. va rasm|JShShIR|Telefon raqami|Ro\'yxatdagi manzil', allow: 'Ruxsat berish', checking: "Ma'lumotlar tekshirilmoqda…",
    myid_t: 'MyID orqali kirish', myid_s: 'Kameraga qarang', myid_ok: 'Shaxs tasdiqlandi', logout_q: 'Akkauntdan chiqasizmi?', logout: 'Chiqish',
    doc_t: 'Shifokor qabuli', spec: 'Mutaxassisni tanlang', s_ther: 'Terapevt', s_ped: 'Pediatr', s_dent: 'Stomatolog', s_card: 'Kardiolog', s_oph: 'Oftalmolog', s_neu: 'Nevrolog', near: 'eng yaqin vaqt: {t}',
    clinic: "5-son poliklinika, Bobur ko'chasi, 12", chooseDate: 'Sana', chooseTime: 'Vaqt', book: 'Yozilish', booked: 'Siz shifokor qabuliga yozildingiz', doctorName: 'Shifokor Islomova M.A.', cancel_q: 'Shifokor qabulini bekor qilasizmi?', cancelled: 'Qabul bekor qilindi',
    med_t: 'Elektron tibbiy karta', med1: 'Terapevt · O\'RVI', med2: 'Qon tahlili · me\'yorida', med3: 'Stomatolog · plomba', med4: 'Emlash · gripp', rx: 'Retsept',
    appeal_ok: 'Murojaat yuborildi', appeal_s: 'Tuman hokimi uni bugun oladi', st1: 'Qabul qilindi', st2: "Ko'rib chiqilmoqda", st3: 'Javob — 15 ish kunigacha', num: 'Ariza raqami',
    sos_ok: 'Xavf signali yuborildi', sos_s: 'Joylashuvingiz navbatchi xizmatga yuborildi', call_q: "{n} ga qo'ng'iroq qilasizmi?", call_demo: "Demo rejimda qo'ng'iroq amalga oshirilmaydi", call: "Qo'ng'iroq", calling: "Demo: {n} ga qo'ng'iroq",
    sent: 'Xabar yuborildi', voted: 'Ovozingiz qabul qilindi', poll_t: "So'rovnoma", p_yes: 'Ha', p_no: "Yo'q", p_abs: 'Betaraf', vote: 'Ovoz berish', thanks: 'Rahmat! Ovozingiz qabul qilindi',
    q1: "Alisher Navoiy bog'ida 3 km uzunlikdagi velo yo'lak qurilishini qo'llab-quvvatlaysizmi?", q2: 'Dam olish kunlari metro ishini 01:00 gacha uzaytirish kerakmi?', q3: 'Yunusobod mavzesida zamonaviy bolalar maydonchasi kerakmi?',
    queue_t: 'Elektron navbat', queue_where: 'Davlat xizmatlari markazi', q_c1: 'Yunusobod tumani DXM', q_c2: 'Mirobod tumani DXM', q_c3: 'Chilonzor tumani DXM', queue_ok: 'Siz navbatga yozildingiz', ticket: 'Taloningiz', come: '{t} da keling',
    tickets_t: 'Chiptalar: Toshkent → Samarqand', train: 'Poyezd', choose: 'Tanlash', seats: "o'rin: {n}", book_t: 'Stol bron qilish', guests: 'Mehmonlar', booking_ok: 'Stol bron qilindi', reserve: 'Bron qilish',
    ipo_t: 'Aksiya xaridi', price: 'Bir aksiya narxi', qty: 'Soni', total: 'Jami', buy: 'Sotib olish', doc_v: 'Hujjat', show_qr: "Hujjatni tekshirish uchun QR-kodni ko'rsating", valid: 'Amal qilish muddati', issued: 'Berilgan',
    org_t: 'Xayriya', help_amt: "Jamg'armaga yordam", volunteer: "Volontyor bo'lish", vol_ok: 'Volontyor arizasi yuborildi',
    prog_apply: 'Ariza topshirish', prog_ok: 'Ariza qabul qilindi', prog_s: "Menejer 2 ish kuni ichida siz bilan bog'lanadi",
    diary_t: 'Elektron kundalik', kinder_ok: "Bog'chaga ariza topshirildi", soon: "Bo'lim to'liq versiyada paydo bo'ladi", receipts_t: 'Kvitansiyalar', chat_t: '«Bobur» mahallasi chati',
    chat1: "Assalomu alaykum! Ertaga soat 9:00 da guzarda hashar.", chat2: 'Zo\'r, bolalar bilan kelaman 👍', chat3: "Shlagbaum uchun ovoz berish jumagacha — unutmang!", msg: 'Xabar…',
    ai_t: 'AI Agent', typing: 'yozmoqda…', ai_light_q: "Elektr uchun to'lash", ai_light_a: "Elektr qarzdorligi — 24 500 so'm. +42°C issiq tufayli zaxira taxminan 36 soatga yetadi. Hozir to'laysizmi?",
    ai_metro_q: 'Metro chiptasini olish', ai_metro_a: "Transport kartangizni 20 000 so'mga to'ldiraman — bu metroda 11 ta safar. Tasdiqlaysizmi?", ai_doc_q: 'Shifokor qabuliga yozilish', ai_doc_a: "Terapevtda eng yaqin bo'sh vaqt — ertaga soat 10:00, 5-son poliklinika. Yozib qo'yaymi?",
    ai_pay: "24 500 so'm to'lash", ai_top: "20 000 so'mga to'ldirish", ai_book: "Ha, yozib qo'ying", listening: 'Tinglayapman…', fine_found: '1 ta to\'lanmagan jarima topildi', data_oneid: "Ma'lumotlar OneID dan olingan", settings_saved: 'Sozlamalar saqlandi',
  },
  en: {
    demo: 'Demo mode: no real payments or requests are made', back: 'Back', done: 'Done', close: 'Close', cancel: 'Cancel', confirm: 'Confirm',
    sum: 'UZS', pay: 'Pay', paying: 'Processing payment…', paid: 'Paid', recipient: 'Recipient', amount: 'Amount', method: 'Payment method', date: 'Date & time', txn: 'Transaction',
    cashback: '{n} cashback points credited', points: 'Cashback points', pointsBal: '{n} available', receipt: 'Receipt saved to “My documents”', share: 'Share receipt', shared: 'Receipt copied',
    chooseAmount: 'Choose amount', commission: 'Fee 0 UZS', checkout: 'Payment',
    p_qr: 'QR payment', p_qr_to: '“Baraka” supermarket, Yunusabad', p_fine: 'Fine payment', p_fine_to: 'Fine: speeding, June 3, 2026', p_util: 'Utility payment', p_util_to: 'Electricity, water, internet',
    p_utilp: 'Pay with points', p_utilp_to: 'Electricity · account 0399718', p_light: 'Electricity payment', p_light_to: 'Electricity · account 0399718', p_transit: 'Transit card top-up', p_transit_to: 'Digital card •• 2847',
    p_tourist: 'Tashkent Tourist Card top-up', p_tourist_to: 'Tourist Card •• 5678', p_ticket: 'Train ticket', p_ticket_to: 'Afrosiyob · Tashkent → Samarkand', p_ipo: 'Share purchase', p_donate: 'Donation', p_event: 'Event ticket', p_event_to: 'Tashkent Book Fest · Uzexpocentre',
    ok_transit: 'Card balance topped up', ok_ipo: 'Share purchase order accepted', ok_donate: 'Thank you for your help!',
    welcome_t: 'All Tashkent city services in one app', welcome_s: 'Public services, payments, transport, health and an AI assistant', lang: 'Language', oneid: 'Sign in with OneID', myid: 'Sign in with MyID (Face ID)',
    oneid_t: 'Sign in with OneID', oneid_req: 'UZK requests access to:', oneid_items: 'Full name and photo|PINFL|Phone number|Registered address', allow: 'Allow', checking: 'Verifying your data…',
    myid_t: 'Sign in with MyID', myid_s: 'Look at the camera', myid_ok: 'Identity verified', logout_q: 'Log out of your account?', logout: 'Log out',
    doc_t: 'Doctor appointment', spec: 'Choose a specialist', s_ther: 'General practitioner', s_ped: 'Pediatrician', s_dent: 'Dentist', s_card: 'Cardiologist', s_oph: 'Ophthalmologist', s_neu: 'Neurologist', near: 'next available: {t}',
    clinic: 'Clinic No. 5, 12 Babur St.', chooseDate: 'Date', chooseTime: 'Time', book: 'Book', booked: 'Your appointment is booked', doctorName: 'Dr. Islamova M.A.', cancel_q: 'Cancel the doctor appointment?', cancelled: 'Appointment cancelled',
    med_t: 'E-medical record', med1: 'GP · common cold', med2: 'Blood test · normal', med3: 'Dentist · filling', med4: 'Vaccination · flu', rx: 'Prescription',
    appeal_ok: 'Appeal sent', appeal_s: 'The district Hokim will receive it today', st1: 'Received', st2: 'Under review', st3: 'Reply within 15 working days', num: 'Request number',
    sos_ok: 'Alarm signal sent', sos_s: 'Your location has been shared with the duty service', call_q: 'Call {n}?', call_demo: 'Calls are not made in demo mode', call: 'Call', calling: 'Demo: calling {n}',
    sent: 'Message sent', voted: 'Your vote has been counted', poll_t: 'Poll', p_yes: 'For', p_no: 'Against', p_abs: 'Abstain', vote: 'Vote', thanks: 'Thank you! Your vote has been counted',
    q1: 'Do you support building a 3 km bike lane in Alisher Navoi Park?', q2: 'Should the metro run until 01:00 on weekends?', q3: 'Does Yunusabad need a modern playground?',
    queue_t: 'E-queue', queue_where: 'Public service center', q_c1: 'Yunusabad district PSC', q_c2: 'Mirabad district PSC', q_c3: 'Chilanzar district PSC', queue_ok: 'You are in the queue', ticket: 'Your ticket', come: 'Come at {t}',
    tickets_t: 'Tickets: Tashkent → Samarkand', train: 'Train', choose: 'Select', seats: 'seats: {n}', book_t: 'Table booking', guests: 'Guests', booking_ok: 'Table booked', reserve: 'Book',
    ipo_t: 'Share purchase', price: 'Price per share', qty: 'Quantity', total: 'Total', buy: 'Buy', doc_v: 'Document', show_qr: 'Show this QR code to verify the document', valid: 'Valid until', issued: 'Issued',
    org_t: 'Charity', help_amt: 'Support the foundation', volunteer: 'Become a volunteer', vol_ok: 'Volunteer application sent',
    prog_apply: 'Apply', prog_ok: 'Application accepted', prog_s: 'A manager will contact you within 2 working days',
    diary_t: 'E-diary', kinder_ok: 'Kindergarten application submitted', soon: 'This section will be available in the full version', receipts_t: 'Receipts', chat_t: '“Babur” mahalla chat',
    chat1: 'Assalomu alaykum! Community clean-up tomorrow at 9:00 by the guzar.', chat2: "Great, I'll come with the kids 👍", chat3: "Barrier gate vote closes Friday — don't forget!", msg: 'Message…',
    ai_t: 'AI Agent', typing: 'typing…', ai_light_q: 'Pay for electricity', ai_light_a: 'Your electricity balance is 24,500 UZS due. With the +42°C heat it will last about 36 hours. Pay now?',
    ai_metro_q: 'Buy a metro ticket', ai_metro_a: "I'll top up your transit card with 20,000 UZS — that's 11 metro rides. Confirm?", ai_doc_q: 'Book a doctor', ai_doc_a: 'The next free slot with a GP is tomorrow at 10:00, Clinic No. 5. Shall I book it?',
    ai_pay: 'Pay 24,500 UZS', ai_top: 'Top up 20,000 UZS', ai_book: 'Yes, book it', listening: 'Listening…', fine_found: '1 unpaid fine found', data_oneid: 'Data received from OneID', settings_saved: 'Settings saved',
  },
  zh: {
    demo: '演示模式：不会进行真实支付或提交申请', back: '返回', done: '完成', close: '关闭', cancel: '取消', confirm: '确认',
    sum: '苏姆', pay: '支付', paying: '正在支付…', paid: '支付成功', recipient: '收款方', amount: '金额', method: '支付方式', date: '日期时间', txn: '交易号',
    cashback: '已返还 {n} 积分', points: '返现积分', pointsBal: '可用 {n}', receipt: '收据已保存至“我的证件”', share: '分享收据', shared: '收据已复制',
    chooseAmount: '选择金额', commission: '手续费 0 苏姆', checkout: '支付',
    p_qr: '扫码支付', p_qr_to: '“Baraka”超市，尤努斯阿巴德', p_fine: '缴纳罚款', p_fine_to: '罚款：超速，2026年6月3日', p_util: '缴纳水电费', p_util_to: '电费、水费、网费',
    p_utilp: '积分支付', p_utilp_to: '电费 · 户号 0399718', p_light: '缴纳电费', p_light_to: '电费 · 户号 0399718', p_transit: '交通卡充值', p_transit_to: '数字卡 •• 2847',
    p_tourist: 'Tashkent Tourist Card 充值', p_tourist_to: 'Tourist Card •• 5678', p_ticket: '火车票', p_ticket_to: 'Afrosiyob · 塔什干 → 撒马尔罕', p_ipo: '认购股票', p_donate: '捐款', p_event: '活动门票', p_event_to: 'Tashkent Book Fest · Uzexpocentre',
    ok_transit: '交通卡充值成功', ok_ipo: '股票认购申请已受理', ok_donate: '感谢您的帮助！',
    welcome_t: '塔什干全部城市服务，一个应用搞定', welcome_s: '政务服务、支付、交通、医疗与 AI 助手', lang: '语言', oneid: '使用 OneID 登录', myid: '使用 MyID 登录（面容识别）',
    oneid_t: '使用 OneID 登录', oneid_req: 'UZK 请求访问以下信息：', oneid_items: '姓名和照片|PINFL|手机号码|户籍地址', allow: '允许', checking: '正在核验信息…',
    myid_t: '使用 MyID 登录', myid_s: '请看向摄像头', myid_ok: '身份验证成功', logout_q: '确定退出登录吗？', logout: '退出',
    doc_t: '预约医生', spec: '选择科室', s_ther: '全科医生', s_ped: '儿科', s_dent: '牙科', s_card: '心内科', s_oph: '眼科', s_neu: '神经科', near: '最近可约：{t}',
    clinic: '第5诊所，巴布尔街12号', chooseDate: '日期', chooseTime: '时间', book: '预约', booked: '预约成功', doctorName: '伊斯拉莫娃医生', cancel_q: '确定取消预约吗？', cancelled: '预约已取消',
    med_t: '电子病历', med1: '全科 · 感冒', med2: '血常规 · 正常', med3: '牙科 · 补牙', med4: '疫苗 · 流感', rx: '处方',
    appeal_ok: '诉求已提交', appeal_s: '区长今天将收到您的诉求', st1: '已受理', st2: '处理中', st3: '15个工作日内答复', num: '申请编号',
    sos_ok: '报警信号已发送', sos_s: '您的位置已发送给值班部门', call_q: '拨打 {n}？', call_demo: '演示模式下不会真实拨号', call: '拨打', calling: '演示：拨打 {n}',
    sent: '消息已发送', voted: '您的投票已记录', poll_t: '投票', p_yes: '赞成', p_no: '反对', p_abs: '弃权', vote: '投票', thanks: '谢谢！您的投票已记录',
    q1: '您是否支持在纳沃伊公园修建3公里自行车道？', q2: '周末地铁是否应运营至01:00？', q3: '尤努斯阿巴德区是否需要现代化儿童游乐场？',
    queue_t: '电子排队', queue_where: '政务服务中心', q_c1: '尤努斯阿巴德区政务中心', q_c2: '米拉巴德区政务中心', q_c3: '奇兰扎尔区政务中心', queue_ok: '排队成功', ticket: '您的号码', come: '请于 {t} 前到达',
    tickets_t: '车票：塔什干 → 撒马尔罕', train: '列车', choose: '选择', seats: '余票：{n}', book_t: '预订餐位', guests: '人数', booking_ok: '预订成功', reserve: '预订',
    ipo_t: '认购股票', price: '每股价格', qty: '数量', total: '合计', buy: '购买', doc_v: '证件', show_qr: '出示二维码以核验证件', valid: '有效期至', issued: '签发日期',
    org_t: '慈善', help_amt: '支持基金会', volunteer: '成为志愿者', vol_ok: '志愿者申请已提交',
    prog_apply: '提交申请', prog_ok: '申请已受理', prog_s: '客户经理将在2个工作日内联系您',
    diary_t: '电子成绩册', kinder_ok: '幼儿园报名已提交', soon: '该功能将在完整版本中上线', receipts_t: '账单', chat_t: '“巴布尔”社区群聊',
    chat1: '大家好！明天9:00在街区广场集体大扫除。', chat2: '好的，我带孩子一起来 👍', chat3: '道闸投票周五截止，别忘了！', msg: '消息…',
    ai_t: 'AI 助手', typing: '正在输入…', ai_light_q: '缴纳电费', ai_light_a: '您的电费欠费 24,500 苏姆。受+42°C高温影响，余额约可用36小时。现在缴费吗？',
    ai_metro_q: '购买地铁票', ai_metro_a: '为您的交通卡充值 20,000 苏姆，可乘坐地铁11次。确认吗？', ai_doc_q: '预约医生', ai_doc_a: '全科医生最近的空闲时间是明天10:00，第5诊所。为您预约吗？',
    ai_pay: '支付 24,500 苏姆', ai_top: '充值 20,000 苏姆', ai_book: '好的，预约', listening: '正在聆听…', fine_found: '发现1笔未缴罚款', data_oneid: '信息来自 OneID', settings_saved: '设置已保存',
  },
};
function t(k, v) { let s = (I[LANG] && I[LANG][k]) || I.ru[k] || k; if (v) for (const n in v) s = s.replace('{' + n + '}', v[n]); return s; }
function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
function money(n) { const s = Math.round(n).toLocaleString('ru-RU').replace(/ /g, ' '); return LANG === 'en' ? s.replace(/ /g, ',') + ' UZS' : s + ' ' + t('sum'); }
function setLang(l) { if (!LANGS[l]) return; LANG = l; try { localStorage.setItem('uzk-lang', l); } catch (e) {} document.documentElement.lang = l; }

// ---------- icons ----------
const IC = {
  back: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>',
  close: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#6B7280" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  check: '<svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  chev: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"><path d="M9 6l6 6-6 6"/></svg>',
  card: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#D4A866" stroke-width="1.8"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/></svg>',
  wallet: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#D4A866" stroke-width="1.8"><path d="M4 7h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4z"/><path d="M4 7l11-3v3"/><circle cx="16" cy="13" r="1.3" fill="#D4A866"/></svg>',
  star: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#D4A866" stroke-width="1.8"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>',
  steth: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"><path d="M6 3v6a4 4 0 0 0 8 0V3"/><path d="M10 13v3a4 4 0 0 0 8 0v-2"/><circle cx="18" cy="12" r="2"/></svg>',
  doc: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" stroke-width="1.8"><path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4M9 12h6M9 16h6"/></svg>',
  shield: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#143C20" stroke-width="1.8" stroke-linejoin="round"><path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>',
  face: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><path d="M9 10v1M15 10v1M12 10v3h-1M9.5 15.5c1.4 1 3.6 1 5 0"/></svg>',
  mic: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
  spark: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/></svg>',
};

// ---------- data ----------
const PAY = {
  qr: { t: 'p_qr', to: 'p_qr_to', amount: 125000, cb: 1250 },
  fine: { t: 'p_fine', to: 'p_fine_to', amount: 75000 },
  util: { t: 'p_util', to: 'p_util_to', amount: 156800, cb: 1568 },
  utilp: { t: 'p_utilp', to: 'p_utilp_to', amount: 7112, points: true },
  light: { t: 'p_light', to: 'p_light_to', amount: 24500, cb: 245 },
  transit: { t: 'p_transit', to: 'p_transit_to', amount: 20000, chips: [10000, 20000, 50000], ok: 'ok_transit' },
  tourist: { t: 'p_tourist', to: 'p_tourist_to', amount: 100000, chips: [50000, 100000, 200000], ok: 'ok_transit' },
  ticket: { t: 'p_ticket', to: 'p_ticket_to', amount: 120000, cb: 1200 },
  event: { t: 'p_event', to: 'p_event_to', amount: 30000 },
};
const IPO = ['Navoiy Mining and Metallurgical Combine', 'Uzbekistan Airways', 'Almalyk Mining and Metallurgical Combine', 'National Electric Networks of Uzbekistan', 'Uzbekhydroenergo', 'Regional Electric Networks', 'Uztransgaz', 'Uzbekistan Airports', 'Hududgazta’minot', 'National Investment Fund of the Republic of Uzbekistan', 'Uzbektelecom'];
const IPO_PRICE = [18500, 9800, 15200, 7400, 6900, 5200, 8800, 11400, 4300, 10500, 6100];
const ORGS = ['Ezgu Amal', 'Makhalla Foundation', "SOS Children's Villages Uzbekistan", "Sog'lom Avlod Uchun", 'Mehr Nuri', 'In the Name of Life', 'Kelajak Ovozi'];
const DOCS = [['Паспорт', 'AB 1234567'], ['Водительские права', 'DL 9876543'], ['Диплом', 'ED 5551234'], ['Трудовая книжка', 'WR 3337788']];
const DOCS_T = { 'Паспорт': { uz: 'Pasport', en: 'Passport', zh: '护照' }, 'Водительские права': { uz: 'Haydovchilik guvohnomasi', en: "Driver's license", zh: '驾驶证' }, 'Диплом': { uz: 'Diplom', en: 'Diploma', zh: '毕业证书' }, 'Трудовая книжка': { uz: 'Mehnat daftarchasi', en: 'Employment record', zh: '劳动手册' } };
const RESTS = ['Afsona Restaurant', 'Coffee House', 'Bon Appetite', 'Osh Markazi'];
const PROGS = { ru: ['Инвестиционные программы', 'Поддержка предпринимателей', 'Государственные льготы', 'Бизнес-проекты'], uz: ['Investitsiya dasturlari', 'Tadbirkorlarni qo\'llab-quvvatlash', 'Davlat imtiyozlari', 'Biznes-loyihalar'], en: ['Investment programs', 'Entrepreneur support', 'State benefits', 'Business projects'], zh: ['投资项目', '创业扶持', '政府优惠', '商业项目'] };

// ---------- building blocks ----------
function hdr(title, opts = {}) {
  return `<div class="h-hdr"><button class="h-back" data-act="back">${opts.close ? IC.close.replace('#6B7280', '#fff') : IC.back}</button><div class="h-title">${esc(title)}</div></div>`;
}
function demoNote() { return `<div class="h-demo">${esc(t('demo'))}</div>`; }
function btn(label, act, kind = 'primary', extra = '') { return `<button class="h-btn h-${kind}" data-act="${esc(act)}" ${extra}>${esc(label)}</button>`; }
function row(icon, title, sub, act, right = IC.chev) {
  return `<button class="h-row" data-act="${esc(act)}"><span class="h-ico">${icon}</span><span class="h-rt"><b>${esc(title)}</b>${sub ? `<i>${esc(sub)}</i>` : ''}</span>${right}</button>`;
}
function nowStr() { const d = new Date(); const p = n => String(n).padStart(2, '0'); return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}, ${p(d.getHours())}:${p(d.getMinutes())}`; }
function rnd(n) { let s = ''; for (let i = 0; i < n; i++) s += Math.floor(Math.random() * 10); return s; }

// ---------- screens ----------
const HS = {};
HS.welcome = () => `<div class="h-welcome">
  <div class="h-wtop"><img src="icon-192.png" alt="" class="h-wlogo"><div class="h-wt">${esc(t('welcome_t'))}</div><div class="h-ws">${esc(t('welcome_s'))}</div></div>
  <div class="h-wlangs">${Object.keys(LANGS).map(l => `<button class="h-chip ${l === LANG ? 'on' : ''}" data-act="lang:${l}">${LANGS[l]}</button>`).join('')}</div>
  <div class="h-wbtns">${btn(t('oneid'), 'go:h:oneid', 'white')}${btn(t('myid'), 'go:h:myid', 'ghost')}</div>
  <div class="h-demo light">${esc(t('demo'))}</div></div>`;
HS.oneid = () => `${hdr(t('oneid_t'))}<div class="h-body">
  <div class="h-card h-center"><div class="h-badge">${IC.shield}</div><div class="h-big">OneID</div><div class="h-muted">${esc(t('oneid_req'))}</div>
  <ul class="h-list">${t('oneid_items').split('|').map(s => `<li>${esc(s)}</li>`).join('')}</ul></div>
  ${btn(t('allow'), 'login', 'primary')}${demoNote()}</div>`;
HS.myid = () => `${hdr(t('myid_t'))}<div class="h-body h-center"><div class="h-face" id="face">${IC.face}</div><div class="h-big" id="faceTxt">${esc(t('myid_s'))}</div>${demoNote()}</div>`;
HS.myid.mount = el => { setTimeout(() => { const f = el.querySelector('#face'); if (!f) return; f.classList.add('ok'); el.querySelector('#faceTxt').textContent = t('myid_ok'); setTimeout(() => doLogin(), 900); }, 2200); };
HS.loading = () => `<div class="h-body h-center h-full"><div class="h-spin"></div><div class="h-muted">${esc(t('checking'))}</div></div>`;

HS.pay = (p) => {
  const [key, extra] = String(p || 'qr').split(':');
  let c = Object.assign({}, PAY[key] || PAY.qr), title = t(c.t), to = c.to ? t(c.to) : '';
  if (key === 'ipo') { const i = +extra || 0; c = { amount: IPO_PRICE[i] * 10 }; title = t('p_ipo'); to = IPO[i] + ' · 10'; c.ok = 'ok_ipo'; }
  if (key === 'donate') { const i = +extra || 0; c = { amount: 50000, chips: [10000, 50000, 100000], ok: 'ok_donate' }; title = t('p_donate'); to = ORGS[i]; }
  const amt = (window.__payAmt && window.__payAmt.key === p) ? window.__payAmt.v : c.amount;
  const methods = [['uzcard', 'Uzcard •• 2847', IC.card], ['humo', 'Humo •• 5521', IC.card], ['payme', 'Payme', IC.wallet], ['click', 'Click', IC.wallet], ['points', t('points') + ' · ' + t('pointsBal', { n: '7 112' }), IC.star]];
  const sel = window.__payMethod || (c.points ? 'points' : 'uzcard');
  return `${hdr(title)}<div class="h-body">
    <div class="h-card"><div class="h-muted">${esc(t('recipient'))}</div><div class="h-strong">${esc(to)}</div>
      <div class="h-amount">${esc(money(amt))}</div><div class="h-muted small">${esc(t('commission'))}</div>
      ${c.chips ? `<div class="h-chips">${c.chips.map(v => `<button class="h-chip ${v === amt ? 'on' : ''}" data-act="amt:${p}:${v}">${esc(money(v))}</button>`).join('')}</div>` : ''}</div>
    <div class="h-sec">${esc(t('method'))}</div>
    <div class="h-card np">${methods.map(([k, n, ic]) => `<button class="h-radio ${k === sel ? 'on' : ''}" data-act="method:${k}"><span class="h-ico light">${ic}</span><span class="h-rt"><b>${esc(n)}</b></span><span class="h-dot"></span></button>`).join('')}</div>
    ${btn(t('pay') + ' ' + money(amt), 'dopay:' + p + ':' + amt, 'primary')}${demoNote()}</div>`;
};
HS.paying = () => `<div class="h-body h-center h-full"><div class="h-spin"></div><div class="h-muted">${esc(t('paying'))}</div></div>`;
HS.paid = (p) => {
  const [key, extra, amt] = String(p).split(':');
  const c = PAY[key] || {};
  let to = c.to ? t(c.to) : '', okT = c.ok ? t(c.ok) : t('paid');
  if (key === 'ipo') { to = IPO[+extra || 0]; okT = t('ok_ipo'); }
  if (key === 'donate') { to = ORGS[+extra || 0]; okT = t('ok_donate'); }
  const a = +amt || c.amount || 0; const cb = c.cb ? Math.round(a / 100) : 0;
  return `<div class="h-body h-center h-pt"><div class="h-okc">${IC.check}</div><div class="h-big">${esc(okT)}</div><div class="h-amount">${esc(money(a))}</div>
    ${cb ? `<div class="h-pill">+ ${esc(t('cashback', { n: cb.toLocaleString('ru-RU').replace(/ /g, ' ') }))}</div>` : ''}
    <div class="h-card h-kv">${kv(t('recipient'), to)}${kv(t('date'), nowStr())}${kv(t('txn'), '№ ' + rnd(10))}${kv(t('method'), window.__payMethod === 'points' || c.points ? t('points') : (window.__payMethod || 'uzcard').replace(/^\w/, m => m.toUpperCase()))}</div>
    <div class="h-muted small">${esc(t('receipt'))}</div>
    ${btn(t('done'), 'finish', 'primary')}${btn(t('share'), 'toast:shared', 'ghostd')}${demoNote()}</div>`;
};
function kv(k, v) { return `<div class="h-kvr"><span>${esc(k)}</span><b>${esc(v)}</b></div>`; }

HS.doctor = () => `${hdr(t('doc_t'))}<div class="h-body"><div class="h-sec">${esc(t('spec'))}</div><div class="h-card np">
  ${[['s_ther', '10:00'], ['s_ped', '11:30'], ['s_dent', '14:00'], ['s_card', '09:20'], ['s_oph', '15:40'], ['s_neu', '12:10']].map(([k, tm]) => row(`<span class="h-ico g">${IC.steth}</span>`, t(k), t('near', { t: tm }), 'go:h:slots?' + k, IC.chev)).join('')}</div>${demoNote()}</div>`;
HS.slots = (p) => {
  const days = []; const d0 = new Date(); for (let i = 1; i <= 5; i++) { const d = new Date(d0.getTime() + i * 864e5); days.push(d); }
  const loc = { ru: 'ru-RU', uz: 'uz-Latn-UZ', en: 'en-GB', zh: 'zh-CN' }[LANG];
  const sd = window.__slotDay || 0, st = window.__slotTime || '10:00';
  const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];
  const busy = new Set(['09:00', '11:00', '14:30', '16:00']);
  return `${hdr(t(p || 's_ther'))}<div class="h-body">
    <div class="h-card h-doc"><span class="h-ico g big">${IC.steth}</span><span class="h-rt"><b>${esc(t('doctorName'))}</b><i>${esc(t(p || 's_ther'))} · ${esc(t('clinic'))}</i></span></div>
    <div class="h-sec">${esc(t('chooseDate'))}</div><div class="h-chips">${days.map((d, i) => `<button class="h-chip day ${i === sd ? 'on' : ''}" data-act="slotday:${i}"><small>${esc(d.toLocaleDateString(loc, { weekday: 'short' }))}</small><b>${d.getDate()}</b></button>`).join('')}</div>
    <div class="h-sec">${esc(t('chooseTime'))}</div><div class="h-grid">${times.map(tm => `<button class="h-chip ${tm === st ? 'on' : ''} ${busy.has(tm) ? 'off' : ''}" data-act="${busy.has(tm) ? '' : 'slottime:' + tm}">${tm}</button>`).join('')}</div>
    ${btn(t('book'), 'go:h:done?doctor:' + sd + ':' + st, 'primary')}${demoNote()}</div>`;
};
HS.medbook = () => `${hdr(t('med_t'))}<div class="h-body"><div class="h-card np">${[['med1', '12.05.2026'], ['med2', '28.04.2026'], ['med3', '02.03.2026'], ['med4', '15.11.2025']].map(([k, d]) => row(`<span class="h-ico g">${IC.doc}</span>`, t(k), d + ' · ' + t('rx'), 'toast:soon')).join('')}</div>${demoNote()}</div>`;

HS.done = (p) => {
  const [kind, a1, a2] = String(p).split(':');
  const num = (kind === 'appeal' ? '2026-' : kind === 'sos' ? 'SOS-' : '') + rnd(6);
  const d = new Date(Date.now() + 864e5 * ((+a1 || 0) + 1));
  const map = {
    doctor: [t('booked'), `${t('doctorName')}`, [[t('date'), d.toLocaleDateString({ ru: 'ru-RU', uz: 'uz-Latn-UZ', en: 'en-GB', zh: 'zh-CN' }[LANG]) + ', ' + (a2 || '10:00')], [t('recipient'), t('clinic')]]],
    appeal: [t('appeal_ok'), t('appeal_s'), [[t('num'), '№ ' + num], [t('date'), nowStr()]], true],
    sos: [t('sos_ok'), t('sos_s'), [[t('num'), num], [t('date'), nowStr()]]],
    queue: [t('queue_ok'), t('q_c' + (a1 || '1')), [[t('ticket'), 'A-047'], [t('date'), t('come', { t: '15:30' })]]],
    booking: [t('booking_ok'), RESTS[+a1 || 0], [[t('date'), nowStr().split(',')[0] + ', 19:00'], [t('guests'), '2']]],
    vol: [t('vol_ok'), ORGS[+a1 || 0], [[t('date'), nowStr()]]],
    prog: [t('prog_ok'), t('prog_s'), [[t('num'), '№ ' + rnd(7)], [t('date'), nowStr()]]],
    kinder: [t('kinder_ok'), '', [[t('num'), '№ ' + rnd(7)], [t('date'), nowStr()]]],
  }[kind] || [t('done'), '', []];
  return `<div class="h-body h-center h-pt"><div class="h-okc">${IC.check}</div><div class="h-big">${esc(map[0])}</div>${map[1] ? `<div class="h-muted">${esc(map[1])}</div>` : ''}
    <div class="h-card h-kv">${map[2].map(([k, v]) => kv(k, v)).join('')}</div>
    ${map[3] ? `<div class="h-card h-steps"><div class="on">✓ ${esc(t('st1'))}</div><div class="cur">● ${esc(t('st2'))}</div><div>○ ${esc(t('st3'))}</div></div>` : ''}
    ${btn(t('done'), 'finish', 'primary')}${demoNote()}</div>`;
};
HS.poll = (p) => {
  const q = t('q' + (p || 1)); const voted = window.__voted && window.__voted[p];
  const res = [[t('p_yes'), 68], [t('p_no'), 24], [t('p_abs'), 8]];
  return `${hdr(t('poll_t'))}<div class="h-body"><div class="h-card"><div class="h-strong big">${esc(q)}</div>
    ${voted ? res.map(([n, v]) => `<div class="h-bar"><span>${esc(n)}</span><b>${v}%</b><i style="width:${v}%"></i></div>`).join('') + `<div class="h-okline">✓ ${esc(t('thanks'))}</div>`
    : res.map(([n], i) => `<button class="h-radio ${(window.__pollSel || 0) === i ? 'on' : ''}" data-act="pollsel:${i}"><span class="h-rt"><b>${esc(n)}</b></span><span class="h-dot"></span></button>`).join('')}</div>
    ${voted ? btn(t('done'), 'back', 'primary') : btn(t('vote'), 'vote:' + p, 'primary')}${demoNote()}</div>`;
};
HS.queue = () => `${hdr(t('queue_t'))}<div class="h-body"><div class="h-sec">${esc(t('queue_where'))}</div><div class="h-card np">
  ${[1, 2, 3].map(i => `<button class="h-radio ${(window.__qSel || 1) === i ? 'on' : ''}" data-act="qsel:${i}"><span class="h-rt"><b>${esc(t('q_c' + i))}</b><i>${esc(t('come', { t: ['15:30', '16:10', '16:45'][i - 1] }))}</i></span><span class="h-dot"></span></button>`).join('')}</div>
  ${btn(t('confirm'), 'go:h:done?queue:' + (window.__qSel || 1), 'primary')}${demoNote()}</div>`;
HS.tickets = () => `${hdr(t('tickets_t'))}<div class="h-body">${[['Afrosiyob 762', '07:28', '09:38', 120000, 34], ['Sharq 710', '08:30', '11:44', 85000, 112], ['Afrosiyob 766', '18:05', '20:15', 135000, 9]].map(([n, a, b, pr, s]) => `
  <div class="h-card h-ticket"><div class="h-tr"><b>${a}</b><span>— ${esc(t('train'))} ${esc(n)} —</span><b>${b}</b></div><div class="h-tr"><i>${esc(t('seats', { n: s }))}</i><b class="price">${esc(money(pr))}</b></div>${btn(t('choose'), 'go:h:pay?ticket', 'primary sm')}</div>`).join('')}${demoNote()}</div>`;
HS.booking = (p) => {
  const g = window.__guests || 2, tm = window.__bt || '19:00';
  return `${hdr(t('book_t'))}<div class="h-body"><div class="h-card"><div class="h-strong big">${esc(RESTS[+p || 0])}</div><div class="h-muted">${esc(nowStr().split(',')[0])}</div></div>
  <div class="h-sec">${esc(t('chooseTime'))}</div><div class="h-grid">${['12:00', '13:00', '18:00', '19:00', '20:00', '21:00'].map(x => `<button class="h-chip ${x === tm ? 'on' : ''}" data-act="bt:${x}">${x}</button>`).join('')}</div>
  <div class="h-sec">${esc(t('guests'))}</div><div class="h-stepper"><button class="h-chip" data-act="guests:-1">−</button><b>${g}</b><button class="h-chip" data-act="guests:1">+</button></div>
  ${btn(t('reserve'), 'go:h:done?booking:' + (p || 0), 'primary')}${demoNote()}</div>`;
};
HS.ipo = (p) => { const i = +p || 0; const q = window.__qty || 10; return `${hdr(t('ipo_t'))}<div class="h-body"><div class="h-card"><div class="h-strong big">${esc(IPO[i])}</div>
  ${kv(t('price'), money(IPO_PRICE[i]))}<div class="h-sec">${esc(t('qty'))}</div><div class="h-stepper"><button class="h-chip" data-act="qty:-5">−</button><b>${q}</b><button class="h-chip" data-act="qty:5">+</button></div>${kv(t('total'), money(IPO_PRICE[i] * q))}</div>
  ${btn(t('buy'), 'go:h:pay?ipo:' + i, 'primary')}${demoNote()}</div>`; };
HS.doc = (p) => { const [n, num] = DOCS[+p || 0]; const name = LANG === 'ru' ? n : DOCS_T[n][LANG]; return `${hdr(name)}<div class="h-body"><div class="h-card h-center"><div class="h-qr">${qrSvg(num)}</div><div class="h-muted">${esc(t('show_qr'))}</div></div>
  <div class="h-card h-kv">${kv(t('doc_v'), name)}${kv('№', num)}${kv(t('issued'), '08.05.2025')}${kv(t('valid'), '08.05.2035')}</div>${demoNote()}</div>`; };
HS.org = (p) => { const i = +p || 0; return `${hdr(t('org_t'))}<div class="h-body"><div class="h-card"><div class="h-strong big">${esc(ORGS[i])}</div></div>
  ${btn(t('help_amt'), 'go:h:pay?donate:' + i, 'primary')}${btn(t('volunteer'), 'go:h:done?vol:' + i, 'ghostd')}${demoNote()}</div>`; };
HS.prog = (p) => { const i = +p || 0; return `${hdr((PROGS[LANG] || PROGS.ru)[i])}<div class="h-body"><div class="h-card"><div class="h-strong big">${esc((PROGS[LANG] || PROGS.ru)[i])}</div><div class="h-muted">${esc(t('prog_s'))}</div></div>
  ${btn(t('prog_apply'), 'go:h:done?prog', 'primary')}${demoNote()}</div>`; };
HS.diary = () => `${hdr(t('diary_t'))}<div class="h-body"><div class="h-card h-kv">${[['Математика', 'Matematika', 'Math', '数学', '5 5 4 5'], ['Русский язык', 'Rus tili', 'Russian', '俄语', '4 4 5'], ['Английский', 'Ingliz tili', 'English', '英语', '5 5 5'], ['История', 'Tarix', 'History', '历史', '4 3 4'], ['Физика', 'Fizika', 'Physics', '物理', '5 4 5']].map(r => kv(r[{ ru: 0, uz: 1, en: 2, zh: 3 }[LANG]], r[4])).join('')}</div>${demoNote()}</div>`;
HS.receipts = () => `${hdr(t('receipts_t'))}<div class="h-body"><div class="h-card np">${[['SARKOR', '120 000'], ['ELEKTR', '24 500'], ['ICHIMLIK SUVI', '12 300']].map(([n, v]) => row(`<span class="h-ico g">${IC.doc}</span>`, n, v + ' · 05.2026', 'go:h:pay?util')).join('')}</div>${demoNote()}</div>`;
HS.chat = () => `${hdr(t('chat_t'))}<div class="h-body h-chat"><div class="b l"><i>Dilnoza</i>${esc(t('chat1'))}</div><div class="b l"><i>Rustam</i>${esc(t('chat2'))}</div><div class="b l"><i>Rais</i>${esc(t('chat3'))}</div>
  <div class="h-input"><span>${esc(t('msg'))}</span><button data-act="toast:sent">➤</button></div>${demoNote()}</div>`;
HS.ai = (p) => {
  const k = p || 'doc';
  const q = { light: 'ai_light_q', metro: 'ai_metro_q', doc: 'ai_doc_q' }[k], a = { light: 'ai_light_a', metro: 'ai_metro_a', doc: 'ai_doc_a' }[k];
  const act = { light: ['ai_pay', 'go:h:pay?light'], metro: ['ai_top', 'go:h:pay?transit'], doc: ['ai_book', 'go:h:done?doctor:0:10:00'] }[k];
  return `<div class="h-aihdr"><div class="h-aiic">${IC.spark}</div><b>${esc(t('ai_t'))}</b><button data-act="back" class="h-x">${IC.close}</button></div>
  <div class="h-body h-chat ai"><div class="b r">${esc(t(q))}</div><div class="b l ai" id="aiAns"><i>${esc(t('ai_t'))}</i><span class="typing">${esc(t('typing'))}</span></div><div id="aiAct" style="display:none">${btn(t(act[0]), act[1], 'primary')}</div>${demoNote()}</div>`;
};
HS.ai.mount = (el, p) => { const k = p || 'doc'; const a = { light: 'ai_light_a', metro: 'ai_metro_a', doc: 'ai_doc_a' }[k]; setTimeout(() => { const n = el.querySelector('#aiAns'); if (!n) return; n.innerHTML = `<i>${esc(t('ai_t'))}</i>${esc(t(a))}`; el.querySelector('#aiAct').style.display = 'block'; }, 1300); };

// tiny deterministic "QR" (visual only)
function qrSvg(seed) { let h = 0; for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0; const n = 25, s = 6; let r = ''; const fin = (x, y) => `<rect x="${x * s}" y="${y * s}" width="${7 * s}" height="${7 * s}" fill="#143C20"/><rect x="${(x + 1) * s}" y="${(y + 1) * s}" width="${5 * s}" height="${5 * s}" fill="#fff"/><rect x="${(x + 2) * s}" y="${(y + 2) * s}" width="${3 * s}" height="${3 * s}" fill="#143C20"/>`;
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { if ((x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9)) continue; h = (h * 1103515245 + 12345) >>> 0; if ((h >>> 16) & 1) r += `<rect x="${x * s}" y="${y * s}" width="${s}" height="${s}" fill="#143C20"/>`; }
  return `<svg viewBox="0 0 ${n * s} ${n * s}" width="190" height="190">${r}${fin(0, 0)}${fin(n - 7, 0)}${fin(0, n - 7)}</svg>`; }

// ---------- overlays ----------
function toast(msg) {
  const app = document.getElementById('app'); const old = document.querySelector('.h-toast'); if (old) old.remove();
  const d = document.createElement('div'); d.className = 'h-toast'; d.textContent = msg; d.style.zoom = U; app.appendChild(d);
  setTimeout(() => d.classList.add('show'), 10); setTimeout(() => { d.classList.remove('show'); setTimeout(() => d.remove(), 300); }, 2200);
}
function sheet(title, sub, actions) {
  const app = document.getElementById('app');
  const w = document.createElement('div'); w.className = 'h-sheetw'; w.innerHTML = `<div class="h-sheet" style="zoom:${U}"><div class="h-strong big">${esc(title)}</div>${sub ? `<div class="h-muted">${esc(sub)}</div>` : ''}<div class="h-sbtns">${actions.map(([l, k], i) => `<button class="h-btn ${i ? 'h-ghostd' : 'h-primary'}" data-i="${i}">${esc(l)}</button>`).join('')}</div></div>`;
  app.appendChild(w); setTimeout(() => w.classList.add('show'), 10);
  const closeS = () => { w.classList.remove('show'); setTimeout(() => w.remove(), 250); };
  w.addEventListener('click', e => { const b = e.target.closest('button[data-i]'); if (b) { closeS(); const f = actions[+b.dataset.i][1]; if (f) f(); } else if (e.target === w) closeS(); });
}
function langSheet() { sheet(t('lang'), '', Object.keys(LANGS).map(l => [LANGS[l] + (l === LANG ? '  ✓' : ''), () => { setLang(l); render(current, currentP); }]).concat([[t('cancel'), null]])); }
function doLogin() { try { localStorage.setItem('uzk-auth', '1'); } catch (e) {} history.replaceState({ id: 'h:loading', depth: 0 }, '', location.pathname); render('h:loading'); setTimeout(() => { history.replaceState({ id: START, depth: 0 }, '', location.pathname); render(START); }, 900); }

// ---------- action dispatcher (hotspots & native buttons) ----------
function runAction(a) {
  if (!a) return;
  const [cmd, ...rest] = a.split(':'); const arg = rest.join(':');
  switch (cmd) {
    case 'back': goBack(); break;
    case 'go': { const [id, p] = arg.split('?'); go(id, p); break; }
    case 'lang': setLang(arg); render(current, currentP); break;
    case 'langsheet': langSheet(); break;
    case 'login': render('h:loading'); setTimeout(doLogin, 600); break;
    case 'logout': sheet(t('logout_q'), '', [[t('logout'), () => { try { localStorage.removeItem('uzk-auth'); } catch (e) {} history.replaceState({ id: 'h:welcome', depth: 0 }, '', location.pathname); render('h:welcome'); }], [t('cancel'), null]]); break;
    case 'toast': toast(t(arg)); break;
    case 'call': sheet(t('call_q', { n: arg }), t('call_demo'), [[t('call'), () => toast(t('calling', { n: arg }))], [t('cancel'), null]]); break;
    case 'cancelappt': sheet(t('cancel_q'), '', [[t('confirm'), () => toast(t('cancelled'))], [t('cancel'), null]]); break;
    case 'amt': { window.__payAmt = { key: currentP, v: +arg.split(':').pop() }; render(current, currentP); break; }
    case 'method': window.__payMethod = arg; render(current, currentP); break;
    case 'dopay': { const parts = arg.split(':'); const amt = parts.pop(); const p = parts.join(':'); const k = p.split(':'); history.replaceState({ id: 'h:paying', depth: (history.state && history.state.depth) || 1 }, '', location.href); render('h:paying'); setTimeout(() => { const pp = k[0] + ':' + (k[1] || '') + ':' + amt; history.replaceState({ id: 'h:paid', p: pp, depth: (history.state && history.state.depth) || 1 }, '', location.href); render('h:paid', pp); window.__payAmt = null; }, 1400); break; }
    case 'finish': { window.__payMethod = null; const st = history.state || {}; const n = (st.depth || 0) - (st.flowBase == null ? (st.depth || 1) - 1 : st.flowBase); if (n > 0) history.go(-n); else goBack(); break; }
    case 'slotday': window.__slotDay = +arg; render(current, currentP); break;
    case 'slottime': window.__slotTime = arg; render(current, currentP); break;
    case 'pollsel': window.__pollSel = +arg; render(current, currentP); break;
    case 'vote': window.__voted = Object.assign(window.__voted || {}, { [arg]: 1 }); render(current, currentP); break;
    case 'qsel': window.__qSel = +arg; render(current, currentP); break;
    case 'bt': window.__bt = arg; render(current, currentP); break;
    case 'guests': window.__guests = Math.max(1, Math.min(12, (window.__guests || 2) + +arg)); render(current, currentP); break;
    case 'qty': window.__qty = Math.max(5, (window.__qty || 10) + +arg); render(current, currentP); break;
  }
}

function renderH(id, p) {
  const name = id.slice(2); const f = HS[name] || HS.welcome;
  const app = document.getElementById('app');
  app.innerHTML = ''; app.style.background = name === 'welcome' ? '#143E20' : '#F9FAFB';
  const el = document.createElement('div'); el.className = 'hscreen ' + 'hs-' + name; el.style.zoom = U; el.style.height = (VH) + 'px';
  el.innerHTML = f(p);
  app.appendChild(el);
  el.addEventListener('click', e => { const b = e.target.closest('[data-act]'); if (!b || !b.dataset.act) return; e.preventDefault(); runAction(b.dataset.act); });
  if (f.mount) f.mount(el, p);
}
