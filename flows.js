/* Digital Uzbekistan demo flows: native screens (multilingual) that complete the user journeys of the Figma prototype.
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
    p_qr: 'Оплата по QR', p_qr_to: 'Супермаркет «Baraka», Юнусабад', p_fine: 'Оплата штрафа', p_fine_to: 'Штраф: превышение скорости, 12 ноября 2026', p_util: 'Оплата ЖКХ', p_util_to: 'Электричество, вода, интернет',
    p_utilp: 'Оплата баллами', p_utilp_to: 'Электричество · лицевой номер 0399718', p_light: 'Оплата электричества', p_light_to: 'Электричество · лицевой номер 0399718', p_transit: 'Пополнение транспортной карты', p_transit_to: 'Цифровая карта •• 2847',
    p_tourist: 'Пополнение Tashkent Tourist Card', p_tourist_to: 'Tourist Card •• 5678', p_ticket: 'Билет на поезд', p_ticket_to: 'Afrosiyob · Ташкент → Самарканд', p_ipo: 'Покупка акций', p_donate: 'Пожертвование', p_event: 'Билет на мероприятие', p_event_to: 'Tashkent Book Fest · Uzexpocentre',
    ok_transit: 'Баланс карты пополнен', ok_ipo: 'Заявка на покупку акций принята', ok_donate: 'Спасибо за помощь!',
    welcome_t: 'Все госуслуги и городские сервисы Узбекистана — в одном приложении', welcome_s: 'Госуслуги, платежи, транспорт, здоровье и AI-помощник', lang: 'Язык', oneid: 'Войти через OneID', myid: 'Войти через MyID (Face ID)',
    oneid_t: 'Вход через OneID', oneid_req: 'Digital Uzbekistan запрашивает доступ к данным:', oneid_items: 'ФИО и фото|ПИНФЛ|Номер телефона|Адрес прописки', allow: 'Разрешить', checking: 'Проверяем данные…',
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
    ai_t: 'AI Агент', typing: 'печатает…', ai_light_q: 'Оплатить за свет', ai_light_a: 'Задолженность за электричество — 24 500 сум. Из-за холодов и отопления запаса хватит примерно на 36 часов. Оплатить сейчас?',
    ai_metro_q: 'Купить билет на метро', ai_metro_a: 'Пополню вашу транспортную карту на 20 000 сум — это 11 поездок на метро. Подтвердить?', ai_doc_q: 'Записаться к врачу', ai_doc_a: 'Ближайшее свободное время у терапевта — завтра в 10:00, Поликлиника №5. Записать вас?',
    ai_pay: 'Оплатить 24 500 сум', ai_top: 'Пополнить на 20 000 сум', ai_book: 'Да, записать', listening: 'Слушаю…', fine_found: 'Найден 1 неоплаченный штраф', data_oneid: 'Данные получены из OneID', settings_saved: 'Настройки сохранены',
  },
  uz: {
    demo: "Demo rejim: haqiqiy to'lovlar va arizalar bajarilmaydi", back: 'Orqaga', done: 'Tayyor', close: 'Yopish', cancel: 'Bekor qilish', confirm: 'Tasdiqlash',
    sum: "so'm", pay: "To'lash", paying: "To'lov amalga oshirilmoqda…", paid: "To'landi", recipient: 'Qabul qiluvchi', amount: 'Summa', method: "To'lov usuli", date: 'Sana va vaqt', txn: 'Tranzaksiya',
    cashback: '{n} keshbek bali hisoblandi', points: 'Keshbek ballari', pointsBal: '{n} mavjud', receipt: "Chek «Hujjatlarim»ga yuborildi", share: 'Chekni ulashish', shared: 'Chek nusxalandi',
    chooseAmount: 'Summani tanlang', commission: "Komissiya 0 so'm", checkout: "To'lov",
    p_qr: "QR orqali to'lov", p_qr_to: '«Baraka» supermarketi, Yunusobod', p_fine: "Jarima to'lovi", p_fine_to: 'Jarima: tezlikni oshirish, 12-noyabr 2026', p_util: "Kommunal to'lov", p_util_to: 'Elektr, suv, internet',
    p_utilp: "Ballar bilan to'lov", p_utilp_to: 'Elektr · shaxsiy raqam 0399718', p_light: "Elektr uchun to'lov", p_light_to: 'Elektr · shaxsiy raqam 0399718', p_transit: "Transport kartasini to'ldirish", p_transit_to: 'Raqamli karta •• 2847',
    p_tourist: "Tashkent Tourist Card to'ldirish", p_tourist_to: 'Tourist Card •• 5678', p_ticket: 'Poyezd chiptasi', p_ticket_to: 'Afrosiyob · Toshkent → Samarqand', p_ipo: 'Aksiya xaridi', p_donate: 'Xayriya', p_event: 'Tadbirga chipta', p_event_to: 'Tashkent Book Fest · Uzexpocentre',
    ok_transit: "Karta balansi to'ldirildi", ok_ipo: 'Aksiya xarid qilish arizasi qabul qilindi', ok_donate: 'Yordamingiz uchun rahmat!',
    welcome_t: "O'zbekistonning barcha davlat va shahar xizmatlari — bitta ilovada", welcome_s: "Davlat xizmatlari, to'lovlar, transport, sog'liq va AI yordamchi", lang: 'Til', oneid: 'OneID orqali kirish', myid: 'MyID orqali kirish (Face ID)',
    oneid_t: 'OneID orqali kirish', oneid_req: "Digital Uzbekistan quyidagi ma'lumotlarga ruxsat so'raydi:", oneid_items: 'F.I.Sh. va rasm|JShShIR|Telefon raqami|Ro\'yxatdagi manzil', allow: 'Ruxsat berish', checking: "Ma'lumotlar tekshirilmoqda…",
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
    ai_t: 'AI Agent', typing: 'yozmoqda…', ai_light_q: "Elektr uchun to'lash", ai_light_a: "Elektr qarzdorligi — 24 500 so'm. Sovuq va isitish tufayli zaxira taxminan 36 soatga yetadi. Hozir to'laysizmi?",
    ai_metro_q: 'Metro chiptasini olish', ai_metro_a: "Transport kartangizni 20 000 so'mga to'ldiraman — bu metroda 11 ta safar. Tasdiqlaysizmi?", ai_doc_q: 'Shifokor qabuliga yozilish', ai_doc_a: "Terapevtda eng yaqin bo'sh vaqt — ertaga soat 10:00, 5-son poliklinika. Yozib qo'yaymi?",
    ai_pay: "24 500 so'm to'lash", ai_top: "20 000 so'mga to'ldirish", ai_book: "Ha, yozib qo'ying", listening: 'Tinglayapman…', fine_found: '1 ta to\'lanmagan jarima topildi', data_oneid: "Ma'lumotlar OneID dan olingan", settings_saved: 'Sozlamalar saqlandi',
  },
  en: {
    demo: 'Demo mode: no real payments or requests are made', back: 'Back', done: 'Done', close: 'Close', cancel: 'Cancel', confirm: 'Confirm',
    sum: 'UZS', pay: 'Pay', paying: 'Processing payment…', paid: 'Paid', recipient: 'Recipient', amount: 'Amount', method: 'Payment method', date: 'Date & time', txn: 'Transaction',
    cashback: '{n} cashback points credited', points: 'Cashback points', pointsBal: '{n} available', receipt: 'Receipt saved to “My documents”', share: 'Share receipt', shared: 'Receipt copied',
    chooseAmount: 'Choose amount', commission: 'Fee 0 UZS', checkout: 'Payment',
    p_qr: 'QR payment', p_qr_to: '“Baraka” supermarket, Yunusabad', p_fine: 'Fine payment', p_fine_to: 'Fine: speeding, Nov 12, 2026', p_util: 'Utility payment', p_util_to: 'Electricity, water, internet',
    p_utilp: 'Pay with points', p_utilp_to: 'Electricity · account 0399718', p_light: 'Electricity payment', p_light_to: 'Electricity · account 0399718', p_transit: 'Transit card top-up', p_transit_to: 'Digital card •• 2847',
    p_tourist: 'Tashkent Tourist Card top-up', p_tourist_to: 'Tourist Card •• 5678', p_ticket: 'Train ticket', p_ticket_to: 'Afrosiyob · Tashkent → Samarkand', p_ipo: 'Share purchase', p_donate: 'Donation', p_event: 'Event ticket', p_event_to: 'Tashkent Book Fest · Uzexpocentre',
    ok_transit: 'Card balance topped up', ok_ipo: 'Share purchase order accepted', ok_donate: 'Thank you for your help!',
    welcome_t: 'All public and city services of Uzbekistan in one app', welcome_s: 'Public services, payments, transport, health and an AI assistant', lang: 'Language', oneid: 'Sign in with OneID', myid: 'Sign in with MyID (Face ID)',
    oneid_t: 'Sign in with OneID', oneid_req: 'Digital Uzbekistan requests access to:', oneid_items: 'Full name and photo|PINFL|Phone number|Registered address', allow: 'Allow', checking: 'Verifying your data…',
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
    ai_t: 'AI Agent', typing: 'typing…', ai_light_q: 'Pay for electricity', ai_light_a: 'Your electricity balance is 24,500 UZS due. With cold nights and heating it will last about 36 hours. Pay now?',
    ai_metro_q: 'Buy a metro ticket', ai_metro_a: "I'll top up your transit card with 20,000 UZS — that's 11 metro rides. Confirm?", ai_doc_q: 'Book a doctor', ai_doc_a: 'The next free slot with a GP is tomorrow at 10:00, Clinic No. 5. Shall I book it?',
    ai_pay: 'Pay 24,500 UZS', ai_top: 'Top up 20,000 UZS', ai_book: 'Yes, book it', listening: 'Listening…', fine_found: '1 unpaid fine found', data_oneid: 'Data received from OneID', settings_saved: 'Settings saved',
  },
  zh: {
    demo: '演示模式：不会进行真实支付或提交申请', back: '返回', done: '完成', close: '关闭', cancel: '取消', confirm: '确认',
    sum: '苏姆', pay: '支付', paying: '正在支付…', paid: '支付成功', recipient: '收款方', amount: '金额', method: '支付方式', date: '日期时间', txn: '交易号',
    cashback: '已返还 {n} 积分', points: '返现积分', pointsBal: '可用 {n}', receipt: '收据已保存至“我的证件”', share: '分享收据', shared: '收据已复制',
    chooseAmount: '选择金额', commission: '手续费 0 苏姆', checkout: '支付',
    p_qr: '扫码支付', p_qr_to: '“Baraka”超市，尤努斯阿巴德', p_fine: '缴纳罚款', p_fine_to: '罚款：超速，2026年11月12日', p_util: '缴纳水电费', p_util_to: '电费、水费、网费',
    p_utilp: '积分支付', p_utilp_to: '电费 · 户号 0399718', p_light: '缴纳电费', p_light_to: '电费 · 户号 0399718', p_transit: '交通卡充值', p_transit_to: '数字卡 •• 2847',
    p_tourist: 'Tashkent Tourist Card 充值', p_tourist_to: 'Tourist Card •• 5678', p_ticket: '火车票', p_ticket_to: 'Afrosiyob · 塔什干 → 撒马尔罕', p_ipo: '认购股票', p_donate: '捐款', p_event: '活动门票', p_event_to: 'Tashkent Book Fest · Uzexpocentre',
    ok_transit: '交通卡充值成功', ok_ipo: '股票认购申请已受理', ok_donate: '感谢您的帮助！',
    welcome_t: '乌兹别克斯坦全部政务与城市服务，一个应用搞定', welcome_s: '政务服务、支付、交通、医疗与 AI 助手', lang: '语言', oneid: '使用 OneID 登录', myid: '使用 MyID 登录（面容识别）',
    oneid_t: '使用 OneID 登录', oneid_req: 'Digital Uzbekistan 请求访问以下信息：', oneid_items: '姓名和照片|PINFL|手机号码|户籍地址', allow: '允许', checking: '正在核验信息…',
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
    ai_t: 'AI 助手', typing: '正在输入…', ai_light_q: '缴纳电费', ai_light_a: '您的电费欠费 24,500 苏姆。天气转冷、取暖用电增加，余额约可用36小时。现在缴费吗？',
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
  <div class="h-wtop"><img src="icon-192.png" alt="" class="h-wlogo"><div class="h-wname">Digital Uzbekistan</div><div class="h-wt">${esc(t('welcome_t'))}</div><div class="h-ws">${esc(t('welcome_s'))}</div></div>
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
HS.medbook = () => `${hdr(t('med_t'))}<div class="h-body"><div class="h-card np">${[['med1', '10.11.2026'], ['med2', '28.10.2026'], ['med3', '02.09.2026'], ['med4', '15.05.2026']].map(([k, d]) => row(`<span class="h-ico g">${IC.doc}</span>`, t(k), d + ' · ' + t('rx'), 'toast:soon')).join('')}</div>${demoNote()}</div>`;

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
    case 'toast': { const [k, m] = arg.split(':'); toast(t(k, { m })); break; }
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
    default: if (XACT[cmd]) XACT[cmd](arg);
  }
}

function renderH(id, p) {
  const name = id.slice(2); const f = HS[name] || HS.welcome;
  const app = document.getElementById('app');
  app.innerHTML = ''; app.style.background = name === 'welcome' ? '#143E20' : '#F9FAFB';
  const el = document.createElement('div'); el.className = 'hscreen ' + 'hs-' + name; el.style.zoom = U; el.style.height = (VH) + 'px';
  el.innerHTML = f(p);
  app.appendChild(el);
  if (name !== 'welcome' && !el.querySelector('.h-hdr')) document.documentElement.style.background = document.body.style.background = '#F9FAFB';
  el.addEventListener('click', e => { const b = e.target.closest('[data-act]'); if (!b || !b.dataset.act) return; e.preventDefault(); runAction(b.dataset.act); });
  if (f.mount) f.mount(el, p);
}

// ======================= Digital Uzbekistan additions =======================
const XI = {
  ru: { city_t: 'Выберите город', city_s: 'Поиск города', city_geo: 'Определить моё местоположение', city_geo_ok: 'Ваш город: {c}', city_geo_no: 'Нет доступа к геолокации — выберите город из списка', city_none: 'Ничего не найдено',
    wd: 'Вс|Пн|Вт|Ср|Чт|Пт|Сб', mo: 'января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря',
    realty: 'Подать объявление|Вторичный рынок|Новостройки|Земельные участки', r_type: 'Тип объекта', r_types: 'Квартира|Дом|Участок|Коммерция', r_rooms: 'Комнат', r_area: 'Площадь, м²', r_price: 'Цена, сум', r_addr: 'Адрес', r_addr_ph: 'Район, улица', r_photo: 'Фото: 5 загружено (демо)', r_publish: 'Опубликовать', r_view: 'Записаться на просмотр', r_ok: 'Объявление опубликовано', r_ok_s: 'Пройдёт модерацию в течение 1 часа', v_ok: 'Вы записаны на просмотр', v_ok_s: 'Риелтор свяжется с вами', r_room: '{n}-комн. квартира', r_floor: 'этаж {n}', r_complex: 'ЖК', r_ready: 'сдача {q}', r_land: 'Участок {n} соток', r_from: 'от',
    map_t: 'Карта', route: 'Маршрут', route_ok: 'Маршрут построен: {m} мин', detour: 'Объезд', detour_ok: 'Объезд построен: +{m} мин', map_cafe: 'Заведения рядом', map_mosque: 'Мечети рядом', map_roads: 'Ремонтные работы',
    notif_t: 'Уведомления', n1: 'Платежи и счета', n2: 'Госуслуги и заявки', n3: 'Новости города', n4: 'Подсказки AI-агента', n5: 'Экстренные оповещения', save: 'Сохранить', settings_saved: 'Настройки сохранены',
    faq_cats: 'Общие вопросы|Водителю|Административные|Городские сервисы|Туризм|Инвестиции',
    fq1: 'Как оплатить услугу?', fa1: 'Выберите услугу, нажмите «Оплатить» и подтвердите оплату картой Uzcard, Humo или через Payme / Click.',
    fq2: 'Безопасны ли мои данные?', fa2: 'Вход выполняется через OneID или MyID, данные передаются в зашифрованном виде.',
    fq3: 'Где мои заявки и чеки?', fa3: 'В разделе «Профиль» → «Услуги», чеки — в «Мои документы».',
    fq4: 'Как связаться с поддержкой?', fa4: 'Напишите в форму на экране «Помощь» или позвоните на номер 1000.',
    addcard_t: 'Новая транспортная карта', c_num: 'Номер карты', c_name: 'Название карты', c_name_ph: 'Например, «Для ребёнка»', add: 'Добавить', card_ok: 'Карта добавлена', card_ok_s: 'Можно пополнять и оплачивать проезд',
    addcar_t: 'Добавить автомобиль', car_plate: 'Госномер', car_brand: 'Марка и модель', car_brand_ph: 'Например, Chevrolet Cobalt', car_color: 'Цвет', car_colors: 'Белый|Чёрный|Серый|Синий', car_ok: 'Автомобиль добавлен', car_ok_s: 'Теперь можно оплачивать парковку и проверять штрафы',
    q_m0: 'Нужен ли нашей махалле шлагбаум?', q_m1: 'Выбор цвета для фасада гузара', c1: 'Бежевый', c2: 'Светло-жёлтый', c3: 'Белый', required: 'Заполните обязательные поля' },
  uz: { city_t: 'Shaharni tanlang', city_s: 'Shaharni qidirish', city_geo: 'Joylashuvimni aniqlash', city_geo_ok: 'Shahringiz: {c}', city_geo_no: "Geolokatsiyaga ruxsat yo'q — ro'yxatdan tanlang", city_none: 'Hech narsa topilmadi',
    wd: 'Ya|Du|Se|Ch|Pa|Ju|Sh', mo: 'yanvar|fevral|mart|aprel|may|iyun|iyul|avgust|sentabr|oktabr|noyabr|dekabr',
    realty: "E'lon berish|Ikkilamchi bozor|Yangi binolar|Yer uchastkalari", r_type: 'Obyekt turi', r_types: 'Kvartira|Uy|Uchastka|Tijorat', r_rooms: 'Xonalar', r_area: 'Maydon, m²', r_price: "Narx, so'm", r_addr: 'Manzil', r_addr_ph: "Tuman, ko'cha", r_photo: 'Rasm: 5 ta yuklandi (demo)', r_publish: "E'lon qilish", r_view: "Ko'rishga yozilish", r_ok: "E'lon joylandi", r_ok_s: '1 soat ichida moderatsiyadan o\'tadi', v_ok: "Ko'rishga yozildingiz", v_ok_s: "Rieltor siz bilan bog'lanadi", r_room: '{n} xonali kvartira', r_floor: '{n}-qavat', r_complex: 'TJM', r_ready: 'topshirish {q}', r_land: '{n} sotix uchastka', r_from: 'dan',
    map_t: 'Xarita', route: "Yo'nalish", route_ok: "Yo'nalish tuzildi: {m} daq", detour: 'Aylanib o\'tish', detour_ok: "Aylanma yo'l: +{m} daq", map_cafe: 'Yaqin atrofdagi joylar', map_mosque: 'Yaqin masjidlar', map_roads: "Ta'mirlash ishlari",
    notif_t: 'Bildirishnomalar', n1: "To'lovlar va hisoblar", n2: 'Davlat xizmatlari va arizalar', n3: 'Shahar yangiliklari', n4: 'AI agent maslahatlari', n5: 'Favqulodda ogohlantirishlar', save: 'Saqlash', settings_saved: 'Sozlamalar saqlandi',
    faq_cats: "Umumiy savollar|Haydovchilarga|Ma'muriy|Shahar xizmatlari|Turizm|Investitsiyalar",
    fq1: "Xizmat uchun qanday to'lash mumkin?", fa1: "Xizmatni tanlang, «To'lash»ni bosing va Uzcard, Humo yoki Payme / Click orqali tasdiqlang.",
    fq2: "Ma'lumotlarim xavfsizmi?", fa2: "Kirish OneID yoki MyID orqali amalga oshiriladi, ma'lumotlar shifrlangan holda uzatiladi.",
    fq3: 'Arizalarim va cheklarim qayerda?', fa3: '«Profil» → «Xizmatlar» bo\'limida, cheklar — «Mening hujjatlarim»da.',
    fq4: "Qo'llab-quvvatlash bilan qanday bog'lanish mumkin?", fa4: '«Yordam» ekranidagi shaklga yozing yoki 1000 raqamiga qo\'ng\'iroq qiling.',
    addcard_t: 'Yangi transport kartasi', c_num: 'Karta raqami', c_name: 'Karta nomi', c_name_ph: 'Masalan, «Bola uchun»', add: "Qo'shish", card_ok: "Karta qo'shildi", card_ok_s: "To'ldirish va yo'l haqini to'lash mumkin",
    addcar_t: "Avtomobil qo'shish", car_plate: 'Davlat raqami', car_brand: 'Marka va model', car_brand_ph: 'Masalan, Chevrolet Cobalt', car_color: 'Rangi', car_colors: 'Oq|Qora|Kulrang|Ko\'k', car_ok: "Avtomobil qo'shildi", car_ok_s: "Endi to'xtash joyi uchun to'lash va jarimalarni tekshirish mumkin",
    q_m0: 'Mahallamizga shlagbaum kerakmi?', q_m1: 'Guzar fasadi uchun rang tanlash', c1: 'Bej', c2: 'Och sariq', c3: 'Oq', required: "Majburiy maydonlarni to'ldiring" },
  en: { city_t: 'Choose a city', city_s: 'Search city', city_geo: 'Use my location', city_geo_ok: 'Your city: {c}', city_geo_no: 'No location access — pick a city from the list', city_none: 'Nothing found',
    wd: 'Sun|Mon|Tue|Wed|Thu|Fri|Sat', mo: 'Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec',
    realty: 'Post a listing|Resale market|New buildings|Land plots', r_type: 'Property type', r_types: 'Apartment|House|Land|Commercial', r_rooms: 'Rooms', r_area: 'Area, m²', r_price: 'Price, UZS', r_addr: 'Address', r_addr_ph: 'District, street', r_photo: 'Photos: 5 uploaded (demo)', r_publish: 'Publish', r_view: 'Book a viewing', r_ok: 'Listing published', r_ok_s: 'Moderation takes up to 1 hour', v_ok: 'Viewing booked', v_ok_s: 'The agent will contact you', r_room: '{n}-room apartment', r_floor: 'floor {n}', r_complex: 'Residential complex', r_ready: 'ready {q}', r_land: '{n} ares plot', r_from: 'from',
    map_t: 'Map', route: 'Route', route_ok: 'Route ready: {m} min', detour: 'Detour', detour_ok: 'Detour ready: +{m} min', map_cafe: 'Places nearby', map_mosque: 'Mosques nearby', map_roads: 'Roadworks',
    notif_t: 'Notifications', n1: 'Payments and bills', n2: 'Public services and requests', n3: 'City news', n4: 'AI agent tips', n5: 'Emergency alerts', save: 'Save', settings_saved: 'Settings saved',
    faq_cats: 'General questions|For drivers|Administrative|City services|Tourism|Investments',
    fq1: 'How do I pay for a service?', fa1: 'Choose a service, tap “Pay” and confirm with Uzcard, Humo, Payme or Click.',
    fq2: 'Is my data safe?', fa2: 'You sign in with OneID or MyID and your data is transmitted encrypted.',
    fq3: 'Where are my requests and receipts?', fa3: 'In Profile → Services; receipts are in My documents.',
    fq4: 'How do I contact support?', fa4: 'Use the form on the Help screen or call 1000.',
    addcard_t: 'New transit card', c_num: 'Card number', c_name: 'Card name', c_name_ph: 'E.g. “For my child”', add: 'Add', card_ok: 'Card added', card_ok_s: 'You can now top it up and pay fares',
    addcar_t: 'Add a car', car_plate: 'License plate', car_brand: 'Make and model', car_brand_ph: 'E.g. Chevrolet Cobalt', car_color: 'Color', car_colors: 'White|Black|Grey|Blue', car_ok: 'Car added', car_ok_s: 'You can now pay for parking and check fines',
    q_m0: 'Does our mahalla need a barrier gate?', q_m1: 'Choosing a color for the guzar facade', c1: 'Beige', c2: 'Light yellow', c3: 'White', required: 'Please fill in the required fields' },
  zh: { city_t: '选择城市', city_s: '搜索城市', city_geo: '使用我的位置', city_geo_ok: '您的城市：{c}', city_geo_no: '无法获取位置，请从列表中选择', city_none: '未找到结果',
    wd: '周日|周一|周二|周三|周四|周五|周六', mo: '1|2|3|4|5|6|7|8|9|10|11|12',
    realty: '发布房源|二手房市场|新楼盘|土地', r_type: '房产类型', r_types: '公寓|住宅|土地|商铺', r_rooms: '房间数', r_area: '面积，平方米', r_price: '价格，苏姆', r_addr: '地址', r_addr_ph: '区、街道', r_photo: '照片：已上传5张（演示）', r_publish: '发布', r_view: '预约看房', r_ok: '房源已发布', r_ok_s: '将在1小时内完成审核', v_ok: '已预约看房', v_ok_s: '经纪人将与您联系', r_room: '{n}室公寓', r_floor: '{n}层', r_complex: '住宅小区', r_ready: '交付 {q}', r_land: '{n}公亩地块', r_from: '起',
    map_t: '地图', route: '路线', route_ok: '路线已生成：{m}分钟', detour: '绕行', detour_ok: '绕行路线：+{m}分钟', map_cafe: '附近场所', map_mosque: '附近清真寺', map_roads: '道路施工',
    notif_t: '通知', n1: '支付与账单', n2: '政务服务与申请', n3: '城市新闻', n4: 'AI 助手提示', n5: '紧急警报', save: '保存', settings_saved: '设置已保存',
    faq_cats: '常见问题|驾驶员|行政事务|城市服务|旅游|投资',
    fq1: '如何支付服务费用？', fa1: '选择服务，点击“支付”，并通过 Uzcard、Humo、Payme 或 Click 确认。',
    fq2: '我的数据安全吗？', fa2: '通过 OneID 或 MyID 登录，数据加密传输。',
    fq3: '我的申请和收据在哪里？', fa3: '在“我的”→“服务”中查看，收据位于“我的证件”。',
    fq4: '如何联系客服？', fa4: '在“帮助”页面填写表单，或拨打 1000。',
    addcard_t: '新增交通卡', c_num: '卡号', c_name: '卡片名称', c_name_ph: '例如“孩子用”', add: '添加', card_ok: '交通卡已添加', card_ok_s: '现在可以充值并支付车费',
    addcar_t: '添加车辆', car_plate: '车牌号', car_brand: '品牌和型号', car_brand_ph: '例如 Chevrolet Cobalt', car_color: '颜色', car_colors: '白色|黑色|灰色|蓝色', car_ok: '车辆已添加', car_ok_s: '现在可以支付停车费并查询罚款',
    q_m0: '我们的社区需要安装道闸吗？', q_m1: '选择古扎尔外立面的颜色', c1: '米色', c2: '浅黄色', c3: '白色', required: '请填写必填项' },
};
for (const l in XI) Object.assign(I[l], XI[l]);

// ---------- cities of Uzbekistan ----------
const REGIONS = {
  ru: ['г. Ташкент', 'Ташкентская область', 'Андижанская область', 'Бухарская область', 'Джизакская область', 'Кашкадарьинская область', 'Навоийская область', 'Наманганская область', 'Самаркандская область', 'Сырдарьинская область', 'Сурхандарьинская область', 'Ферганская область', 'Хорезмская область', 'Республика Каракалпакстан'],
  uz: ['Toshkent shahri', 'Toshkent viloyati', 'Andijon viloyati', 'Buxoro viloyati', 'Jizzax viloyati', 'Qashqadaryo viloyati', 'Navoiy viloyati', 'Namangan viloyati', 'Samarqand viloyati', 'Sirdaryo viloyati', 'Surxondaryo viloyati', "Farg'ona viloyati", 'Xorazm viloyati', "Qoraqalpog'iston Respublikasi"],
  en: ['Tashkent City', 'Tashkent Region', 'Andijan Region', 'Bukhara Region', 'Jizzakh Region', 'Kashkadarya Region', 'Navoi Region', 'Namangan Region', 'Samarkand Region', 'Syrdarya Region', 'Surkhandarya Region', 'Fergana Region', 'Khorezm Region', 'Republic of Karakalpakstan'],
  zh: ['塔什干市', '塔什干州', '安集延州', '布哈拉州', '吉扎克州', '卡什卡达里亚州', '纳沃伊州', '纳曼干州', '撒马尔罕州', '锡尔河州', '苏尔汉河州', '费尔干纳州', '花拉子模州', '卡拉卡尔帕克斯坦共和国'],
};
// [ru, uz, en, zh, region, lat, lon, typical November temperature]
const CITIES = [
  ['Ташкент', 'Toshkent', 'Tashkent', '塔什干', 0, 41.31, 69.28, 12], ['Нурафшан', 'Nurafshon', 'Nurafshon', '努拉夫尚', 1, 41.04, 69.36, 11],
  ['Чирчик', 'Chirchiq', 'Chirchiq', '奇尔奇克', 1, 41.47, 69.58, 10], ['Алмалык', 'Olmaliq', 'Almalyk', '阿尔马雷克', 1, 40.85, 69.6, 11],
  ['Ангрен', 'Angren', 'Angren', '安格连', 1, 41.02, 70.14, 9], ['Бекабад', 'Bekobod', 'Bekabad', 'Bekabad', 1, 40.22, 69.27, 12],
  ['Янгиюль', "Yangiyo'l", 'Yangiyul', 'Yangiyul', 1, 41.11, 69.05, 12], ['Андижан', 'Andijon', 'Andijan', '安集延', 2, 40.78, 72.34, 11],
  ['Асака', 'Asaka', 'Asaka', 'Asaka', 2, 40.64, 72.24, 11], ['Ханабад', 'Xonobod', 'Khanabad', 'Khanabad', 2, 40.8, 73.0, 10],
  ['Бухара', 'Buxoro', 'Bukhara', '布哈拉', 3, 39.77, 64.42, 13], ['Каган', 'Kogon', 'Kagan', 'Kagan', 3, 39.72, 64.55, 13],
  ['Гиждуван', "G'ijduvon", 'Gijduvan', 'Gijduvan', 3, 40.1, 64.68, 12], ['Джизак', 'Jizzax', 'Jizzakh', '吉扎克', 4, 40.12, 67.84, 12],
  ['Карши', 'Qarshi', 'Karshi', '卡尔希', 5, 38.86, 65.79, 14], ['Шахрисабз', 'Shahrisabz', 'Shahrisabz', '沙赫里萨布兹', 5, 39.06, 66.83, 13],
  ['Китаб', 'Kitob', 'Kitab', 'Kitab', 5, 39.12, 66.88, 13], ['Навои', 'Navoiy', 'Navoi', '纳沃伊', 6, 40.1, 65.38, 12],
  ['Зарафшан', 'Zarafshon', 'Zarafshan', '扎拉夫尚', 6, 41.57, 64.2, 9], ['Учкудук', 'Uchquduq', 'Uchkuduk', 'Uchkuduk', 6, 42.15, 63.55, 8],
  ['Наманган', 'Namangan', 'Namangan', '纳曼干', 7, 41.0, 71.67, 11], ['Чуст', 'Chust', 'Chust', 'Chust', 7, 41.0, 71.24, 11],
  ['Касансай', 'Kosonsoy', 'Kasansay', 'Kasansay', 7, 41.25, 71.55, 10], ['Самарканд', 'Samarqand', 'Samarkand', '撒马尔罕', 8, 39.65, 66.96, 12],
  ['Каттакурган', "Kattaqo'rg'on", 'Kattakurgan', 'Kattakurgan', 8, 39.9, 66.26, 12], ['Ургут', 'Urgut', 'Urgut', 'Urgut', 8, 39.4, 67.24, 11],
  ['Гулистан', 'Guliston', 'Gulistan', '古利斯坦', 9, 40.49, 68.78, 12], ['Янгиер', 'Yangiyer', 'Yangiyer', 'Yangiyer', 9, 40.27, 68.82, 12],
  ['Ширин', 'Shirin', 'Shirin', 'Shirin', 9, 40.22, 69.13, 12], ['Термез', 'Termiz', 'Termez', '铁尔梅兹', 10, 37.22, 67.28, 17],
  ['Денау', 'Denov', 'Denau', 'Denau', 10, 38.27, 67.9, 15], ['Шерабад', 'Sherobod', 'Sherabad', 'Sherabad', 10, 37.67, 67.0, 16],
  ['Фергана', "Farg'ona", 'Fergana', '费尔干纳', 11, 40.38, 71.79, 11], ['Коканд', "Qo'qon", 'Kokand', '浩罕', 11, 40.53, 70.94, 11],
  ['Маргилан', "Marg'ilon", 'Margilan', '马尔吉兰', 11, 40.47, 71.72, 11], ['Кувасай', 'Quvasoy', 'Kuvasay', 'Kuvasay', 11, 40.3, 71.98, 10],
  ['Риштан', 'Rishton', 'Rishtan', 'Rishtan', 11, 40.36, 71.28, 11], ['Ургенч', 'Urganch', 'Urgench', '乌尔根奇', 12, 41.55, 60.63, 9],
  ['Хива', 'Xiva', 'Khiva', '希瓦', 12, 41.38, 60.36, 9], ['Ханка', 'Xonqa', 'Khanka', 'Khanka', 12, 41.47, 60.78, 9],
  ['Нукус', 'Nukus', 'Nukus', '努库斯', 13, 42.46, 59.6, 7], ['Ходжейли', "Xo'jayli", 'Khodjeyli', 'Khodjeyli', 13, 42.4, 59.45, 7],
  ['Турткуль', "To'rtko'l", 'Turtkul', 'Turtkul', 13, 41.55, 61.0, 8], ['Беруни', 'Beruniy', 'Beruniy', 'Beruniy', 13, 41.69, 60.75, 8],
  ['Кунград', "Qo'ng'irot", 'Kungrad', 'Kungrad', 13, 43.05, 58.84, 6], ['Муйнак', "Mo'ynoq", 'Muynak', '穆伊纳克', 13, 43.77, 59.03, 5],
  ['Чимбай', 'Chimboy', 'Chimbay', 'Chimbay', 13, 42.94, 59.78, 6],
];
const LI = { ru: 0, uz: 1, en: 2, zh: 3 };
function cityIdx() { let i = 0; try { i = +(localStorage.getItem('uzk-city') || 0); } catch (e) {} return CITIES[i] ? i : 0; }
function setCity(i) { try { localStorage.setItem('uzk-city', String(i)); } catch (e) {} }
function cityName(i = cityIdx()) { return CITIES[i][LI[LANG]]; }
const PIN = (s, c = '#fff') => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>`;
function cityHTML(icon, chev) { return `${PIN(icon)}<span>${esc(cityName())}</span><svg viewBox="0 0 24 24" width="${chev}" height="${chev}" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`; }
function fmtDay(d) { const mo = t('mo').split('|')[d.getMonth()];
  return LANG === 'zh' ? `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日` : LANG === 'en' ? `${mo} ${d.getDate()}, ${d.getFullYear()}` : LANG === 'uz' ? `${d.getDate()}-${mo} ${d.getFullYear()}` : `${d.getDate()} ${mo} ${d.getFullYear()}`; }
function liveText(k) {
  const d = new Date(), p = n => String(n).padStart(2, '0'), tm = `${p(d.getHours())}:${p(d.getMinutes())}`, wd = t('wd').split('|')[d.getDay()];
  if (k === 'temp') { const v = CITIES[cityIdx()][7]; return (v > 0 ? '+' : '') + v + '°C'; }
  if (k === 'mdate') return fmtDay(d);
  return LANG === 'zh' ? `${fmtDay(d)} ${wd} ${tm}` : `${wd}, ${fmtDay(d)}, ${tm}`;
}
HS.city = () => { const cur = cityIdx(); return `${hdr(t('city_t'))}<div class="h-body">
  <input class="h-search" id="citySearch" type="search" placeholder="${esc(t('city_s'))}" autocomplete="off">
  <div class="h-card np" style="margin-top:14px">${row(`<span class="h-ico">${PIN(22, '#7C5426')}</span>`, t('city_geo'), '', 'geo', '')}</div>
  <div class="h-card np" id="cityList">${CITIES.map((c, i) => `<button class="h-row h-cityrow ${i === cur ? 'on' : ''}" data-act="setcity:${i}" data-q="${esc((c[0] + ' ' + c[1] + ' ' + c[2] + ' ' + c[3]).toLowerCase())}"><span class="h-ico">${PIN(20, '#143C20')}</span><span class="h-rt"><b>${esc(c[LI[LANG]])}</b><i>${esc((REGIONS[LANG] || REGIONS.ru)[c[4]])}</i></span>${i === cur ? '<b style="color:#1F7A3A;font-size:20px">✓</b>' : ''}</button>`).join('')}</div>
  <div class="h-muted" id="cityNone" style="display:none;text-align:center">${esc(t('city_none'))}</div></div>`; };
HS.city.mount = el => { const inp = el.querySelector('#citySearch'); inp.addEventListener('input', () => { const q = inp.value.trim().toLowerCase(); let n = 0; el.querySelectorAll('.h-cityrow').forEach(r => { const ok = !q || r.dataset.q.includes(q); r.style.display = ok ? '' : 'none'; if (ok) n++; }); el.querySelector('#cityNone').style.display = n ? 'none' : 'block'; }); };

// ---------- real estate ----------
const DIST = { ru: ['Юнусабад', 'Мирзо-Улугбек', 'Чиланзар', 'Яккасарай', 'Мирабад', 'Сергели'], x: ['Yunusobod', "Mirzo Ulug'bek", 'Chilonzor', 'Yakkasaroy', 'Mirobod', 'Sergeli'] };
function dist(i) { return (LANG === 'ru' ? DIST.ru : DIST.x)[i]; }
HS.realty = (p) => {
  const k = +p || 0, ttl = t('realty').split('|')[k];
  if (k === 0) { const ty = window.__rtype || 0; return `${hdr(ttl)}<div class="h-body">
    <div class="h-sec">${esc(t('r_type'))}</div><div class="h-chips">${t('r_types').split('|').map((x, i) => `<button class="h-chip ${i === ty ? 'on' : ''}" data-act="rtype:${i}">${esc(x)}</button>`).join('')}</div>
    <div class="h-card" style="margin-top:12px">${field('r_rooms', '2', 'numeric')}${field('r_area', '58', 'numeric')}${field('r_price', '980 000 000', 'numeric')}${field('r_addr', t('r_addr_ph'), 'text', 'req')}
    <div class="h-muted small">📷 ${esc(t('r_photo'))}</div></div>
    ${btn(t('r_publish'), 'submit:realty', 'primary')}${demoNote()}</div>`; }
  const items = k === 1 ? [[t('r_room', { n: 2 }) + ', 58 м²', dist(0) + ' · ' + t('r_floor', { n: '4/9' }), 980e6], [t('r_room', { n: 3 }) + ', 76 м²', dist(1) + ' · ' + t('r_floor', { n: '6/9' }), 1350e6], [t('r_room', { n: 1 }) + ', 38 м²', dist(2) + ' · ' + t('r_floor', { n: '2/4' }), 620e6]]
    : k === 2 ? [[t('r_complex') + ' «Tashkent City Park»', dist(4) + ' · ' + t('r_ready', { q: 'IV-2027' }), 1100e6, 1], [t('r_complex') + ' «Mirabad Avenue»', dist(4) + ' · ' + t('r_ready', { q: 'II-2027' }), 890e6, 1], [t('r_complex') + ' «Yangi Hayot»', dist(5) + ' · ' + t('r_ready', { q: 'I-2027' }), 540e6, 1]]
    : [[t('r_land', { n: 6 }), 'Qibray', 450e6], [t('r_land', { n: 10 }), "Zangiota", 720e6], [t('r_land', { n: 15 }), 'Parkent', 380e6]];
  return `${hdr(ttl)}<div class="h-body">${items.map(([a, b, pr, from], i) => `<div class="h-card"><div class="h-lst"><span class="h-ico g">${IC.doc}</span><span class="h-rt"><b>${esc(a)}</b><i>${esc(b)}</i><div class="h-price">${from ? esc(t('r_from')) + ' ' : ''}${esc(money(pr))}</div></span></div>${btn(t('r_view'), 'go:h:done?view:' + k + i, 'primary sm')}</div>`).join('')}${demoNote()}</div>`;
};
function field(k, ph, type = 'text', req = '') { return `<label class="h-field"><span>${esc(t(k))}</span><input ${type === 'numeric' ? 'inputmode="numeric"' : ''} placeholder="${esc(ph)}" data-req="${req}"></label>`; }

// ---------- map ----------
HS.map = (p) => { const k = p || 'cafe';
  const L = k === 'cafe' ? RESTS.map((n, i) => [n, ['1.2', '0.5', '2.1', '3.5'][i] + ' km', [14, 6, 25, 9][i]]) : k === 'mosque' ? [['Minor masjidi', '1.4 km', 17], ['Hazrati Imom masjidi', '3.2 km', 12], ["Shayx Zaynuddin masjidi", '2.6 km', 9]] : [["Mustaqillik shoh ko'chasi", '1.2–1.8 km', 7], ["Bobur ko'chasi", 'Navoiy', 5], ['Amir Temur shoh ko\'chasi', 'Kosmonavtlar', 4]];
  const act = k === 'roads' ? 'detour' : 'route';
  return `${hdr(t('map_t'))}<div class="h-body"><img class="h-map" src="img/map-${k}.webp" alt=""><div class="h-sec">${esc(t('map_' + k))}</div><div class="h-card np">
  ${L.map(([n, d, m]) => `<div class="h-row"><span class="h-ico">${PIN(22, '#7C5426')}</span><span class="h-rt"><b>${esc(n)}</b><i>${esc(d)}</i></span><button class="h-chip" style="height:38px" data-act="toast:${act}_ok:${m}">${esc(t(act))}</button></div>`).join('')}</div>${demoNote()}</div>`; };

// ---------- notifications / FAQ / add card / add car ----------
HS.notif = () => { const st = window.__notif || { n1: 1, n2: 1, n3: 0, n4: 1, n5: 1 }; window.__notif = st;
  return `${hdr(t('notif_t'))}<div class="h-body"><div class="h-card np">${['n1', 'n2', 'n3', 'n4', 'n5'].map(k => `<button class="h-row ${st[k] ? 'on' : ''}" data-act="tog:${k}"><span class="h-rt"><b>${esc(t(k))}</b></span><span class="h-tog"></span></button>`).join('')}</div>
  ${btn(t('save'), 'saveback', 'primary')}${demoNote()}</div>`; };
HS.faq = (p) => `${hdr(t('faq_cats').split('|')[+p || 0])}<div class="h-body"><div class="h-card np">${[1, 2, 3, 4].map(i => `<details class="h-faq" ${i === 1 ? 'open' : ''}><summary>${esc(t('fq' + i))}</summary><p>${esc(t('fa' + i))}</p></details>`).join('')}</div>${demoNote()}</div>`;
HS.addcard = () => `${hdr(t('addcard_t'))}<div class="h-body"><div class="h-card">${field('c_num', '8600 •••• •••• ••••', 'numeric', 'req')}${field('c_name', t('c_name_ph'))}</div>${btn(t('add'), 'submit:card', 'primary')}${demoNote()}</div>`;
HS.addcar = () => { const c = window.__carColor || 0; return `${hdr(t('addcar_t'))}<div class="h-body"><div class="h-card">${field('car_plate', '01 A 123 BC', 'text', 'req')}${field('car_brand', t('car_brand_ph'))}
  <div class="h-field"><span>${esc(t('car_color'))}</span></div><div class="h-chips" style="margin-top:-6px">${t('car_colors').split('|').map((x, i) => `<button class="h-chip ${i === c ? 'on' : ''}" data-act="carcolor:${i}">${esc(x)}</button>`).join('')}</div></div>
  ${btn(t('add'), 'submit:car', 'primary')}${demoNote()}</div>`; };

// ---------- polls (city + mahalla) ----------
HS.poll = (p) => {
  const mah = { m0: [[t('p_yes'), 72], [t('p_no'), 28]], m1: [[t('c1'), 45], [t('c2'), 35], [t('c3'), 20]] }[p];
  const q = mah ? t('q_' + p) : t('q' + (p || 1)); const voted = window.__voted && window.__voted[p];
  const res = mah || [[t('p_yes'), 68], [t('p_no'), 24], [t('p_abs'), 8]];
  return `${hdr(t('poll_t'))}<div class="h-body"><div class="h-card"><div class="h-strong big">${esc(q)}</div>
    ${voted ? res.map(([n, v]) => `<div class="h-bar"><span>${esc(n)}</span><b>${v}%</b><i style="width:${v}%"></i></div>`).join('') + `<div class="h-okline">✓ ${esc(t('thanks'))}</div>`
    : res.map(([n], i) => `<button class="h-radio ${(window.__pollSel || 0) === i ? 'on' : ''}" data-act="pollsel:${i}"><span class="h-rt"><b>${esc(n)}</b></span><span class="h-dot"></span></button>`).join('')}</div>
    ${voted ? btn(t('done'), 'back', 'primary') : btn(t('vote'), 'vote:' + p, 'primary')}${demoNote()}</div>`;
};

// done screens for the new flows
const _done = HS.done;
HS.done = (p) => {
  const [kind, a1] = String(p).split(':');
  const extra = { realty: [t('r_ok'), t('r_ok_s'), [[t('num'), '№ ' + rnd(7)], [t('date'), nowStr()]]], view: [t('v_ok'), t('v_ok_s'), [[t('date'), fmtDay(new Date(Date.now() + 864e5)) + ', 11:00'], [t('num'), '№ ' + rnd(6)]]],
    card: [t('card_ok'), t('card_ok_s'), [[t('c_num'), '8600 •••• •••• ' + rnd(4)], [t('date'), nowStr()]]], car: [t('car_ok'), t('car_ok_s'), [[t('car_plate'), window.__plate || '01 A 123 BC'], [t('date'), nowStr()]]] }[kind];
  if (!extra) return _done(p);
  return `<div class="h-body h-center h-pt"><div class="h-okc">${IC.check}</div><div class="h-big">${esc(extra[0])}</div><div class="h-muted">${esc(extra[1])}</div>
    <div class="h-card h-kv">${extra[2].map(([k, v]) => kv(k, v)).join('')}</div>${btn(t('done'), 'finish', 'primary')}${demoNote()}</div>`;
};

const XACT = {
  setcity: (i) => { setCity(+i); goBack(); },
  geo: () => {
    const pick = (la, lo) => { let b = 0, bd = 1e9; CITIES.forEach((c, i) => { const d = (c[5] - la) ** 2 + (c[6] - lo) ** 2; if (d < bd) { bd = d; b = i; } }); setCity(b); toast(t('city_geo_ok', { c: cityName(b) })); setTimeout(goBack, 700); };
    if (!navigator.geolocation) return toast(t('city_geo_no'));
    navigator.geolocation.getCurrentPosition(p => pick(p.coords.latitude, p.coords.longitude), () => toast(t('city_geo_no')), { timeout: 8000, maximumAge: 600000 });
  },
  rtype: (i) => { window.__rtype = +i; render(current, currentP); },
  carcolor: (i) => { window.__carColor = +i; const v = [...document.querySelectorAll('.hscreen input')].map(x => x.value); render(current, currentP); document.querySelectorAll('.hscreen input').forEach((x, j) => { x.value = v[j] || ''; }); },
  tog: (k) => { window.__notif[k] = window.__notif[k] ? 0 : 1; render(current, currentP); },
  saveback: () => { toast(t('settings_saved')); setTimeout(goBack, 500); },
  submit: (kind) => {
    const req = [...document.querySelectorAll('.hscreen input[data-req="req"]')];
    if (req.some(x => !x.value.trim())) { req.forEach(x => { if (!x.value.trim()) x.style.borderColor = '#DC2626'; }); return toast(t('required')); }
    if (kind === 'car') window.__plate = req[0].value.trim().toUpperCase();
    go('h:done', kind);
  },
};

// ======================= «ИИ ассистент»: floating button + chat on every screen =======================
const AI_URL = 'https://www.ast-group.uz/api/assistant';
const AIX = {
  ru: { as_t: 'ИИ ассистент', as_s: 'Отвечу на любой вопрос', as_hi: 'Здравствуйте, Владислав! Я ИИ ассистент Digital Uzbekistan. Спросите о чём угодно — госуслуги, платежи, транспорт, здоровье или любой другой вопрос.', as_ph: 'Напишите вопрос…', as_err: 'Не удалось получить ответ. Проверьте интернет и попробуйте ещё раз.', as_retry: 'Повторить', as_new: 'Новый диалог',
    as_q: 'Как оформить загранпаспорт?|Сколько стоит проезд в метро?|Какие документы нужны для детского сада?|Что посмотреть в городе {c}?' },
  uz: { as_t: 'AI yordamchi', as_s: 'Har qanday savolga javob beraman', as_hi: "Assalomu alaykum, Vladislav! Men Digital Uzbekistan AI yordamchisiman. Istalgan savolni bering — davlat xizmatlari, to'lovlar, transport, sog'liq va boshqalar.", as_ph: 'Savolingizni yozing…', as_err: "Javob olinmadi. Internetni tekshirib, qayta urinib ko'ring.", as_retry: 'Qayta urinish', as_new: 'Yangi suhbat',
    as_q: 'Xorijga chiqish pasportini qanday olish mumkin?|Metroda yo\'l haqi qancha?|Bog\'cha uchun qanday hujjatlar kerak?|{c}da nimalarni ko\'rish mumkin?' },
  en: { as_t: 'AI assistant', as_s: 'Ask me anything', as_hi: 'Hello, Vladislav! I am the Digital Uzbekistan AI assistant. Ask me anything — public services, payments, transport, health or any other question.', as_ph: 'Type your question…', as_err: 'Could not get an answer. Check your connection and try again.', as_retry: 'Retry', as_new: 'New chat',
    as_q: 'How do I get an international passport?|How much is a metro ride?|What documents are needed for kindergarten?|What to see in {c}?' },
  zh: { as_t: 'AI 助手', as_s: '有问必答', as_hi: '您好，Vladislav！我是 Digital Uzbekistan 的 AI 助手。任何问题都可以问我：政务服务、支付、交通、医疗等。', as_ph: '输入您的问题…', as_err: '未能获取回答，请检查网络后重试。', as_retry: '重试', as_new: '新对话',
    as_q: '如何办理出国护照？|地铁票价是多少？|上幼儿园需要哪些材料？|{c}有什么值得参观的？' },
};
for (const l in AIX) Object.assign(I[l], AIX[l]);
// [[go:code]] → screen + button label
const AI_GO = {
  pay_light: ['h:pay?light', 'Оплатить свет', "Elektr uchun to'lash", 'Pay electricity', '缴纳电费'],
  pay_util: ['h:pay?util', 'Коммунальные платежи', "Kommunal to'lovlar", 'Utility payments', '水电燃气缴费'],
  transit: ['h:pay?transit', 'Пополнить транспортную карту', "Transport kartasini to'ldirish", 'Top up transit card', '交通卡充值'],
  fines: ['1:2649', 'Штрафы', 'Jarimalar', 'Fines', '罚款'], parking: ['1:4858', 'Парковка', 'Avtoturargoh', 'Parking', '停车'],
  ev: ['1:2468', 'Зарядка электромобилей', 'Elektromobil quvvatlash', 'EV charging', '电动车充电'],
  doctor: ['h:doctor', 'Запись к врачу', 'Shifokor qabuli', 'Book a doctor', '预约医生'], health: ['1:5032', 'Здоровье', "Sog'liq", 'Health', '医疗健康'],
  docs: ['1:19', 'Мои документы', 'Mening hujjatlarim', 'My documents', '我的证件'], queue: ['h:queue', 'Электронная очередь', 'Elektron navbat', 'E-queue', '电子排队'],
  gov: ['1:2573', 'Госуслуги', 'Davlat xizmatlari', 'Public services', '政务服务'], appeal: ['1:4597', 'Обращение к хокиму', 'Hokimga murojaat', 'Appeal to the Hokim', '向市长反映'],
  sos: ['1:4475', 'Тревожная кнопка', 'Xavf tugmasi', 'Panic button', '紧急按钮'], polls: ['1:4702', 'Опросы', "So'rovnomalar", 'Polls', '投票'],
  mahalla: ['1:996', 'Цифровая махалля', 'Raqamli mahalla', 'Digital Mahalla', '数字社区'], family: ['1:3042', 'Семья и образование', "Oila va ta'lim", 'Family and education', '家庭与教育'],
  tickets: ['h:tickets', 'Билеты', 'Chiptalar', 'Tickets', '车票'], cafes: ['1:729', 'Кафе и рестораны', 'Kafe va restoranlar', 'Cafes and restaurants', '餐厅'],
  sights: ['1:3249', 'Достопримечательности', 'Diqqatga sazovor joylar', 'Sights', '名胜古迹'], tourist: ['1:3757', 'Туристическая карта', 'Turistik karta', 'Tourist card', '旅游卡'],
  fairs: ['1:5424', 'Ярмарки и события', 'Yarmarka va tadbirlar', 'Fairs and events', '展会与活动'], realty: ['1:235', 'Недвижимость', "Ko'chmas mulk", 'Real estate', '房产'],
  ipo: ['1:332', 'Покупка акций IPO', 'IPO aksiyalari', 'Buy IPO shares', '购买 IPO 股票'], business: ['1:523', 'Для бизнеса', 'Biznes uchun', 'For business', '企业服务'],
  volunteer: ['1:4356', 'Волонтёрство', 'Volontyorlik', 'Volunteering', '志愿服务'], cashback: ['1:448', 'Национальный кешбэк', 'Milliy keshbek', 'National cashback', '国家返现'],
  roads: ['1:3863', 'Дороги и ремонт', "Yo'llar va ta'mirlash", 'Roads and repairs', '道路与维修'], clean: ['1:4063', 'Чистый город', 'Toza shahar', 'Clean city', '清洁城市'],
  mosques: ['1:3529', 'Карта мечетей', 'Masjidlar xaritasi', 'Mosque map', '清真寺地图'], marketplace: ['1:5149', 'Маркетплейс', 'Marketpleys', 'Marketplace', '商城'],
  home: ['1:5285', 'Электронный дом', 'Elektron uy', 'E-home', '智慧家庭'],
};
const SPARK = s => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none"><path d="M12 2.5l1.9 5.6 5.6 1.9-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9z" fill="#fff"/><path d="M18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" fill="#fff" opacity=".85"/></svg>`;
let AIS = { msgs: [], busy: false };
try { AIS.msgs = JSON.parse(localStorage.getItem('uzk-ai') || '[]'); } catch (e) {}
const aiSave = () => { try { localStorage.setItem('uzk-ai', JSON.stringify(AIS.msgs.slice(-30))); } catch (e) {} };
const AI_HIDE = new Set(['h:welcome', 'h:oneid', 'h:myid', 'h:loading', 'h:paying', 'h:ai', '1:2221']);

function screenTitle() {
  if (!current) return '';
  if (current.startsWith('h:')) { const h = document.querySelector('.hscreen .h-title'); return h ? h.textContent : current.slice(2); }
  return (DATA.screens[current] && DATA.screens[current].name) || current;
}
function aiFmt(s) {
  const go = []; s = String(s).replace(/\s*\[\[\s*(?:go\s*:\s*)?([a-z_]+)\s*\]\]/gi, (m, k) => { if (AI_GO[k] && !go.includes(k)) go.push(k); return ''; }).trim();
  let h = esc(s).replace(/^\s*[-*•]\s+/gm, '• ').replace(/\n/g, '<br>');
  if (go.length) h += `<div class="ai-go">${go.map(k => `<button data-go="${k}">${esc(AI_GO[k][LI[LANG] + 1])} →</button>`).join('')}</div>`;
  return h;
}
function aiRender() {
  const box = document.getElementById('aiMsgs'); if (!box) return;
  const hi = `<div class="ai-b l">${esc(t('as_hi'))}</div>`;
  const chips = AIS.msgs.length ? '' : `<div class="ai-chips">${t('as_q', { c: cityName() }).split('|').map(q => `<button data-q="${esc(q)}">${esc(q)}</button>`).join('')}</div>`;
  box.innerHTML = hi + chips + AIS.msgs.map(m => m.role === 'user' ? `<div class="ai-b r">${esc(m.content)}</div>` : m.role === 'error' ? `<div class="ai-b l err">${esc(t('as_err'))}<button data-retry="1">${esc(t('as_retry'))}</button></div>` : `<div class="ai-b l">${aiFmt(m.content)}</div>`).join('')
    + (AIS.busy ? '<div class="ai-b l typing"><i></i><i></i><i></i></div>' : '');
  box.scrollTop = box.scrollHeight;
}
async function aiAsk(q) {
  if (AIS.busy) return;
  if (q) AIS.msgs.push({ role: 'user', content: q.slice(0, 1500) });
  AIS.msgs = AIS.msgs.filter(m => m.role !== 'error');
  AIS.busy = true; aiRender(); aiSave();
  let reply = '', ok = false;
  try {
    const ctl = new AbortController(); const tm = setTimeout(() => ctl.abort(), 45000);
    const r = await fetch(AI_URL, { method: 'POST', headers: { 'content-type': 'application/json' }, signal: ctl.signal,
      body: JSON.stringify({ messages: AIS.msgs.filter(m => m.role === 'user' || m.role === 'assistant').slice(-14), lang: LANG, name: { ru: 'Владислав', uz: 'Vladislav', en: 'Vladislav', zh: 'Vladislav' }[LANG], city: cityName(), date: liveText('date'), screen: AIS.screen || '' }) });
    clearTimeout(tm);
    const j = await r.json().catch(() => ({})); reply = j.reply || ''; ok = !!j.ok && !!reply;
    if (!ok && j.error) { reply = j.error; ok = true; }
  } catch (e) {}
  AIS.busy = false;
  AIS.msgs.push(ok ? { role: 'assistant', content: reply } : { role: 'error', content: '' });
  aiSave(); aiRender();
}
function aiOpen() {
  if (document.getElementById('aiPanel')) return;
  AIS.screen = screenTitle();
  const p = document.createElement('div'); p.id = 'aiPanel';
  p.innerHTML = `<div class="ai-hd"><span class="ai-av">${SPARK(22)}</span><span class="ai-tt"><b>${esc(t('as_t'))}</b><i>${esc(t('as_s'))}</i></span>
    <button class="ai-ic" data-new="1" aria-label="${esc(t('as_new'))}"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4"/></svg></button>
    <button class="ai-ic" data-close="1" aria-label="${esc(t('close'))}"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
    <div class="ai-msgs ai-scroll" id="aiMsgs"></div>
    <form class="ai-in" id="aiForm"><textarea id="aiText" rows="1" placeholder="${esc(t('as_ph'))}" enterkeyhint="send"></textarea><button type="submit" aria-label="send"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></form>
    <div class="ai-demo">${esc(t('demo'))}</div>`;
  document.body.appendChild(p);
  const fit = () => { const v = window.visualViewport;
    p.style.top = (v ? v.offsetTop : 0) + 'px'; p.style.height = (v ? v.height : window.innerHeight) + 'px'; const b = document.getElementById('aiMsgs'); if (b) b.scrollTop = b.scrollHeight; };
  fit(); p._fit = fit; if (window.visualViewport) { window.visualViewport.addEventListener('resize', fit); window.visualViewport.addEventListener('scroll', fit); }
  requestAnimationFrame(() => p.classList.add('show'));
  aiRender(); updateFab();
  const ta = p.querySelector('#aiText');
  ta.addEventListener('input', () => { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 110) + 'px'; });
  ta.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); p.querySelector('#aiForm').requestSubmit(); } });
  p.querySelector('#aiForm').addEventListener('submit', e => { e.preventDefault(); const q = ta.value.trim(); if (!q) return; ta.value = ''; ta.style.height = 'auto'; aiAsk(q); });
  p.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.close) aiClose();
    else if (b.dataset.new) { AIS.msgs = []; aiSave(); aiRender(); }
    else if (b.dataset.q) aiAsk(b.dataset.q);
    else if (b.dataset.retry) aiAsk();
    else if (b.dataset.go) { const to = AI_GO[b.dataset.go][0]; aiClose(); setTimeout(() => to.startsWith('h:') ? go(to.split('?')[0], to.split('?')[1]) : go(to), 120); }
  });
}
function aiClose() {
  const p = document.getElementById('aiPanel'); if (!p) return;
  if (document.activeElement) document.activeElement.blur();
  if (window.visualViewport && p._fit) { window.visualViewport.removeEventListener('resize', p._fit); window.visualViewport.removeEventListener('scroll', p._fit); }
  p.classList.remove('show'); setTimeout(() => { p.remove(); updateFab(); }, 260);
}

// floating button: drag anywhere, snaps to the nearest side, tucks half-away when idle
let fab = null, fabT = 0;
function fabPos() { let s = null; try { s = JSON.parse(localStorage.getItem('uzk-fab') || 'null'); } catch (e) {} return s || { side: 'r', y: 0.62 }; }
function fabPlace(tuck) {
  const s = fabPos(), W = window.innerWidth, H = window.innerHeight, sz = 56;
  const y = Math.max(110, Math.min(H - 170, s.y * H));
  fab.style.top = y + 'px'; fab.style.left = (s.side === 'l' ? 10 : W - sz - 10) + 'px';
  fab.classList.toggle('tuck', !!tuck); fab.classList.toggle('left', s.side === 'l');
}
function fabIdle() { clearTimeout(fabT); fabT = setTimeout(() => fab && !fab._drag && fabPlace(true), 3500); }
function updateFab() {
  if (!fab) {
    fab = document.createElement('div'); fab.id = 'aiFab'; fab.setAttribute('role', 'button');
    fab.innerHTML = `<span class="ai-fab-in">${SPARK(26)}</span><span class="ai-fab-tip"></span>`;
    document.body.appendChild(fab);
    let sx = 0, sy = 0, ox = 0, oy = 0, moved = false;
    fab.addEventListener('pointerdown', e => { fab.setPointerCapture(e.pointerId); sx = e.clientX; sy = e.clientY; const r = fab.getBoundingClientRect(); ox = r.left; oy = r.top; moved = false; fab._drag = true; fab.classList.remove('tuck'); fab.classList.add('drag'); clearTimeout(fabT); });
    fab.addEventListener('pointermove', e => { if (!fab._drag) return; const dx = e.clientX - sx, dy = e.clientY - sy; if (!moved && Math.hypot(dx, dy) < 6) return; moved = true; fab.style.left = (ox + dx) + 'px'; fab.style.top = (oy + dy) + 'px'; });
    const up = e => { if (!fab._drag) return; fab._drag = false; fab.classList.remove('drag');
      if (moved) { const r = fab.getBoundingClientRect(); try { localStorage.setItem('uzk-fab', JSON.stringify({ side: r.left + r.width / 2 < window.innerWidth / 2 ? 'l' : 'r', y: r.top / window.innerHeight })); } catch (er) {} fabPlace(false); fabIdle(); }
      else { fabPlace(false); aiOpen(); } };
    fab.addEventListener('pointerup', up); fab.addEventListener('pointercancel', up);
    window.addEventListener('resize', () => fab && fabPlace(fab.classList.contains('tuck')));
    let seen = false; try { seen = localStorage.getItem('uzk-fab-tip') === '1'; } catch (e) {}
    if (!seen) { fab.classList.add('tipon'); setTimeout(() => { fab.classList.remove('tipon'); try { localStorage.setItem('uzk-fab-tip', '1'); } catch (e) {} }, 4500); }
  }
  fab.querySelector('.ai-fab-tip').textContent = t('as_t');
  const hide = AI_HIDE.has(current) || !!document.getElementById('aiPanel') || !current;
  fab.style.display = hide ? 'none' : 'flex';
  if (!hide && !fab._drag) { fabPlace(false); fabIdle(); }
}

// ======================= «Видеокамеры»: open live cameras of Uzbekistan =======================
// Only cameras whose owners opened them for public viewing. Each one was checked by hand (22.11.2026).
// To add a camera, append an entry to CAMS:
//   ipeye: device code from an IPEYE embed (…/iframe.php?…&dev=XXXX)  → live video + auto-refreshing preview
//   windy: webcam id from windy.com/webcams/ID                         → 24-hour timelapse (public Windy player)
//   region: index in REGIONS (0 Tashkent city, 1 Tashkent region, 8 Samarkand, …)
const CAM_OWNERS = { amirsoy: ['Amirsoy Resort', 'https://www.amirsoy.com/ru/webcams.html'] };
const CAM_PLACE = { amirsoy: ['Амирсой, Бостанлыкский район', "Amirsoy, Bo'stonliq tumani", 'Amirsoy, Bostanliq district', '阿米尔索伊，博斯坦雷克区'] };
const CAMS = [
  { id: 'amirsoy-prima', region: 1, place: 'amirsoy', owner: 'amirsoy', ipeye: '3d01802be4b544c8b4e64aea00e76e6e',
    name: ['Канатная дорога Prima', "Prima kanat yo'li", 'Prima cable car', 'Prima 缆车'],
    sub: ['Нижняя станция и вход на курорт', 'Quyi bekat va kurort kirishi', 'Base station and resort entrance', '缆车下站 · 度假村入口'] },
  { id: 'amirsoy-2290-west', region: 1, place: 'amirsoy', owner: 'amirsoy', ipeye: '7c8231e409fe4d5f9450384993720b5e', windy: '1611899491',
    name: ['Вершина 2290 м · запад', "Cho'qqi 2290 m · g'arb", 'Summit 2290 m · west', '2290 米山顶 · 西'],
    sub: ['Вид на долину и склоны', "Vodiy va yonbag'irlar manzarasi", 'View of the valley and slopes', '山谷与雪道景观'] },
  { id: 'amirsoy-2290-south', region: 1, place: 'amirsoy', owner: 'amirsoy', ipeye: 'b65cb31c58e44e308d6807c45db86520', windy: '1642432667',
    name: ['Вершина 2290 м · юг', "Cho'qqi 2290 m · janub", 'Summit 2290 m · south', '2290 米山顶 · 南'],
    sub: ['Площадка у верхней станции', 'Yuqori bekat maydoni', 'Terrace at the top station', '缆车上站平台'] },
];
const CAMI = {
  ru: { cams_t: 'Видеокамеры', cams_all: 'Все', cams_live: '{n} в эфире', cams_upd: 'Превью обновлено в {t}',
    cams_empty_t: 'Открытых камер пока нет', cams_empty_s: 'В регионе «{r}» нет камер, которые владельцы открыли для всех. Как только они появятся, они будут здесь.', cams_show_all: 'Показать все камеры',
    cams_note: 'Здесь собраны только камеры, которые их владельцы открыли для публичного просмотра. Городские камеры безопасности и дорожные камеры служебные — их трансляции закрыты.', cams_checked: 'Проверено 22 ноября 2026',
    cam_live: 'Прямой эфир', cam_tl: 'Таймлапс за сутки', cam_where: 'Место', cam_region: 'Регион', cam_owner: 'Камера', cam_src: 'Трансляция', cam_more: 'Другие камеры', cam_site: 'Все камеры на сайте владельца', live: 'LIVE' },
  uz: { cams_t: 'Videokameralar', cams_all: 'Barchasi', cams_live: '{n} ta efirda', cams_upd: 'Rasmlar {t} da yangilandi',
    cams_empty_t: "Hozircha ochiq kameralar yo'q", cams_empty_s: "«{r}» hududida egalari hamma uchun ochgan kameralar yo'q. Ular paydo bo'lishi bilan shu yerda ko'rinadi.", cams_show_all: "Barcha kameralarni ko'rsatish",
    cams_note: "Bu yerda faqat egalari ommaviy ko'rish uchun ochgan kameralar jamlangan. Shahar xavfsizlik va yo'l kameralari xizmat kameralari — ularning translyatsiyasi yopiq.", cams_checked: '2026-yil 22-noyabrda tekshirildi',
    cam_live: 'Jonli efir', cam_tl: 'Bir kunlik taymlaps', cam_where: 'Joy', cam_region: 'Hudud', cam_owner: 'Kamera', cam_src: 'Translyatsiya', cam_more: 'Boshqa kameralar', cam_site: 'Egasining saytidagi barcha kameralar', live: 'LIVE' },
  en: { cams_t: 'Live cameras', cams_all: 'All', cams_live: '{n} live now', cams_upd: 'Previews updated at {t}',
    cams_empty_t: 'No open cameras yet', cams_empty_s: 'There are no cameras in “{r}” that their owners have opened to the public. As soon as one appears, it will show up here.', cams_show_all: 'Show all cameras',
    cams_note: 'Only cameras whose owners opened them for public viewing are listed here. City security and traffic cameras are for official use and their feeds are closed.', cams_checked: 'Checked on November 22, 2026',
    cam_live: 'Live', cam_tl: '24-hour timelapse', cam_where: 'Location', cam_region: 'Region', cam_owner: 'Camera', cam_src: 'Stream', cam_more: 'Other cameras', cam_site: "All cameras on the owner's website", live: 'LIVE' },
  zh: { cams_t: '实时摄像头', cams_all: '全部', cams_live: '{n} 个直播中', cams_upd: '预览更新于 {t}',
    cams_empty_t: '暂无公开摄像头', cams_empty_s: '“{r}”目前没有向公众开放的摄像头。一旦出现，就会显示在这里。', cams_show_all: '显示全部摄像头',
    cams_note: '这里只收录所有者向公众开放的摄像头。城市安防和交通摄像头仅供公务使用，不公开直播。', cams_checked: '2026年11月22日核实',
    cam_live: '直播', cam_tl: '24小时延时', cam_where: '位置', cam_region: '地区', cam_owner: '摄像头', cam_src: '直播来源', cam_more: '其他摄像头', cam_site: '所有者网站上的全部摄像头', live: 'LIVE' },
};
for (const l in CAMI) Object.assign(I[l], CAMI[l]);
AI_HIDE.add('h:cam');

const CAM_IC = (s, c = '#fff') => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>`;
const PLAY_IC = '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M8 5.5v13l10.5-6.5z" fill="#fff"/></svg>';
function camL(arr) { return arr[LI[LANG]] || arr[0]; }
function camRegion(c) { return (REGIONS[LANG] || REGIONS.ru)[c.region]; }
function camRu(n) { const a = n % 10, b = n % 100; return n + ' ' + (a === 1 && b !== 11 ? 'камера' : a >= 2 && a <= 4 && (b < 12 || b > 14) ? 'камеры' : 'камер'); }
function camLiveText(n) { return LANG === 'ru' ? camRu(n) + ' в эфире' : t('cams_live', { n }); }
function camPoster(c) { return c.ipeye ? `https://api.ipeye.ru/v1/stream/poster/1/${c.ipeye}/img.jpeg?t=${Math.floor(Date.now() / 30000)}` : ''; }
function camSrc(c, view) {
  if (view === 'tl' && c.windy) return `https://webcams.windy.com/webcams/public/embed/player/${c.windy}/day`;
  if (c.ipeye) return `https://ipeye.ru/ipeye_service/api/iframe.php?iframe_player=1&dev=${c.ipeye}&autoplay=1`;
  return `https://webcams.windy.com/webcams/public/embed/player/${c.windy}/day`;
}
function camHM() { const d = new Date(), p = n => String(n).padStart(2, '0'); return `${p(d.getHours())}:${p(d.getMinutes())}`; }
function camCard(c) {
  return `<button class="cam-card" data-act="camopen:${c.id}"><span class="cam-thumb" data-cam="${c.id}" style="background-image:url('${camPoster(c)}')"><span class="cam-badge">${esc(t('live'))}</span><span class="cam-play">${PLAY_IC}</span></span>
    <span class="cam-meta"><b>${esc(camL(c.name))}</b><i>${esc(camL(CAM_PLACE[c.place]))} · ${esc(camL(c.sub))}</i></span></button>`;
}

HS.cams = () => {
  const sel = window.__camReg == null ? -1 : window.__camReg;
  const regs = REGIONS[LANG] || REGIONS.ru;
  const count = regs.map((_, i) => CAMS.filter(c => c.region === i).length);
  const order = regs.map((_, i) => i).sort((a, b) => (count[b] > 0) - (count[a] > 0) || a - b);
  const chips = `<div class="cam-chips"><button class="h-chip ${sel < 0 ? 'on' : ''}" data-act="camreg:-1">${esc(t('cams_all'))} <i>${CAMS.length}</i></button>${order.map(i => `<button class="h-chip ${sel === i ? 'on' : ''} ${count[i] ? '' : 'zero'}" data-act="camreg:${i}">${esc(regs[i])} <i>${count[i]}</i></button>`).join('')}</div>`;
  let list;
  if (sel < 0) list = order.filter(i => count[i]).map(i => `<div class="h-sec">${esc(regs[i])}</div>${CAMS.filter(c => c.region === i).map(camCard).join('')}`).join('');
  else if (count[sel]) list = CAMS.filter(c => c.region === sel).map(camCard).join('');
  else list = `<div class="h-card h-center cam-empty"><div class="h-badge">${CAM_IC(30, '#143C20')}</div><div class="h-strong big" style="margin-top:14px">${esc(t('cams_empty_t'))}</div><div class="h-muted">${esc(t('cams_empty_s', { r: regs[sel] }))}</div>${btn(t('cams_show_all'), 'camreg:-1', 'ghostd')}</div>`;
  return `${hdr(t('cams_t'))}<div class="h-body">
    <div class="cam-sum"><span class="cam-dot"></span><b>${esc(camLiveText(CAMS.length))}</b><span class="cam-upd" id="camUpd">${esc(t('cams_upd', { t: camHM() }))}</span></div>
    ${chips}${list}
    <div class="h-muted small cam-note">${esc(t('cams_note'))}<br>${esc(t('cams_checked'))}</div></div>`;
};
HS.cams.mount = el => {
  const chips = el.querySelector('.cam-chips'), on = chips && chips.querySelector('.on');
  if (on && window.__camChipX != null) chips.scrollLeft = window.__camChipX;
  if (chips) chips.addEventListener('scroll', () => { window.__camChipX = chips.scrollLeft; }, { passive: true });
  clearInterval(window.__camTimer);
  window.__camTimer = setInterval(() => {
    if (!document.body.contains(el)) return clearInterval(window.__camTimer);
    el.querySelectorAll('.cam-thumb[data-cam]').forEach(th => {
      const c = CAMS.find(x => x.id === th.dataset.cam); const url = c && camPoster(c); if (!url) return;
      const im = new Image(); im.onload = () => { th.style.backgroundImage = `url('${url}')`; const u = el.querySelector('#camUpd'); if (u) u.textContent = t('cams_upd', { t: camHM() }); }; im.src = url;
    });
  }, 30000);
};

HS.cam = (p) => {
  const c = CAMS.find(x => x.id === p) || CAMS[0];
  const view = c.windy && window.__camView === 'tl' ? 'tl' : 'live';
  const owner = CAM_OWNERS[c.owner];
  const others = CAMS.filter(x => x !== c);
  return `${hdr(camL(c.name))}<div class="h-body">
    <div class="cam-player"><iframe src="${esc(camSrc(c, view))}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="eager" referrerpolicy="strict-origin-when-cross-origin" title="${esc(camL(c.name))}"></iframe></div>
    ${c.windy && c.ipeye ? `<div class="cam-tabs"><button class="h-chip ${view === 'live' ? 'on' : ''}" data-act="camview:live"><span class="cam-rec"></span>${esc(t('cam_live'))}</button><button class="h-chip ${view === 'tl' ? 'on' : ''}" data-act="camview:tl">${esc(t('cam_tl'))}</button></div>` : ''}
    <div class="h-card h-kv">${kv(t('cam_where'), camL(CAM_PLACE[c.place]))}${kv(t('cam_region'), camRegion(c))}${kv(t('cam_owner'), owner[0])}${kv(t('cam_src'), view === 'tl' ? 'Windy Webcams' : 'IPEYE')}</div>
    ${btn(t('cam_site'), 'ext:' + owner[1], 'ghostd')}
    ${others.length ? `<div class="h-sec" style="margin-top:22px">${esc(t('cam_more'))}</div><div class="h-card np">${others.map(o => `<button class="h-row cam-orow" data-act="camgo:${o.id}"><span class="cam-mini" style="background-image:url('${camPoster(o)}')"></span><span class="h-rt"><b>${esc(camL(o.name))}</b><i>${esc(camL(o.sub))}</i></span>${IC.chev}</button>`).join('')}</div>` : ''}
    <div class="h-muted small cam-note">${esc(t('cams_note'))}</div></div>`;
};

Object.assign(XACT, {
  camopen: (id) => { window.__camView = 'live'; go('h:cam', id); },
  camreg: (i) => { window.__camReg = +i; render(current, currentP); },
  camview: (v) => { window.__camView = v; render(current, currentP); },
  camgo: (id) => { window.__camView = 'live'; history.replaceState(Object.assign({}, history.state, { p: id }), '', location.href); render('h:cam', id); },
  ext: (url) => { window.open(url, '_blank', 'noopener'); },
});
