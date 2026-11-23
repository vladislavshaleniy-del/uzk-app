/* MyUzCity demo flows: native screens (multilingual) that complete the user journeys of the Figma prototype.
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
    oneid_t: 'Вход через OneID', oneid_req: 'MyUzCity запрашивает доступ к данным:', oneid_items: 'ФИО и фото|ПИНФЛ|Номер телефона|Адрес прописки', allow: 'Разрешить', checking: 'Проверяем данные…',
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
    oneid_t: 'OneID orqali kirish', oneid_req: "MyUzCity quyidagi ma'lumotlarga ruxsat so'raydi:", oneid_items: 'F.I.Sh. va rasm|JShShIR|Telefon raqami|Ro\'yxatdagi manzil', allow: 'Ruxsat berish', checking: "Ma'lumotlar tekshirilmoqda…",
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
    oneid_t: 'Sign in with OneID', oneid_req: 'MyUzCity requests access to:', oneid_items: 'Full name and photo|PINFL|Phone number|Registered address', allow: 'Allow', checking: 'Verifying your data…',
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
    oneid_t: '使用 OneID 登录', oneid_req: 'MyUzCity 请求访问以下信息：', oneid_items: '姓名和照片|PINFL|手机号码|户籍地址', allow: '允许', checking: '正在核验信息…',
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
function demoNote() { return ''; }
function btn(label, act, kind = 'primary', extra = '') { return `<button class="h-btn h-${kind}" data-act="${esc(act)}" ${extra}>${esc(label)}</button>`; }
function row(icon, title, sub, act, right = IC.chev) {
  return `<button class="h-row" data-act="${esc(act)}"><span class="h-ico">${icon}</span><span class="h-rt"><b>${esc(title)}</b>${sub ? `<i>${esc(sub)}</i>` : ''}</span>${right}</button>`;
}
function nowStr() { const d = new Date(); const p = n => String(n).padStart(2, '0'); return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}, ${p(d.getHours())}:${p(d.getMinutes())}`; }
function rnd(n) { let s = ''; for (let i = 0; i < n; i++) s += Math.floor(Math.random() * 10); return s; }

// ---------- screens ----------
const HS = {};
HS.welcome = () => `<div class="h-welcome">
  <div class="h-wtop"><img src="icon-192.png" alt="" class="h-wlogo"><div class="h-wname">MyUzCity</div><div class="h-wt">${esc(t('welcome_t'))}</div><div class="h-ws">${esc(t('welcome_s'))}</div></div>
  <div class="h-wlangs">${Object.keys(LANGS).map(l => `<button class="h-chip ${l === LANG ? 'on' : ''}" data-act="lang:${l}">${LANGS[l]}</button>`).join('')}</div>
  <div class="h-wbtns"><button class="h-btn h-tgbtn" data-act="tglogin">${TG_SVG}<span>${esc(t('tg_login'))}</span></button>${btn(t('oneid'), 'go:h:oneid', 'white')}${btn(t('myid'), 'go:h:myid', 'ghost')}</div>
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
    case 'tglogin': tgLogin(); break;
    case 'logout': sheet(t('logout_q'), '', [[t('logout'), () => { try { localStorage.removeItem('uzk-auth'); localStorage.removeItem('uzk-user'); localStorage.removeItem('uzk-session'); } catch (e) {} history.replaceState({ id: 'h:welcome', depth: 0 }, '', location.pathname); render('h:welcome'); }], [t('cancel'), null]]); break;
    case 'toast': { const [k, m] = arg.split(':'); toast(t(k, { m })); break; }
    case 'call': sheet(t('call_q', { n: arg }), '', [[t('call'), () => { location.href = 'tel:' + arg; }], [t('cancel'), null]]); break;
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

// ======================= MyUzCity additions =======================
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
// own assistant (Cloudflare Pages Function, functions/api/assistant.js); the old endpoint stays as a fallback
// live data (news, places, maps) is always read from GitHub Pages, where the data Action publishes it
const DATA_BASE = /github\.io$/.test(location.hostname) || /^(localhost|127\.)/.test(location.hostname) ? '' : 'https://vladislavshaleniy-del.github.io/uzk-app/';
const AI_OWN = /(^|\.)myuzcity\.(uz|pages\.dev)$/.test(location.hostname) ? '/api/assistant' : 'https://myuzcity.pages.dev/api/assistant';
async function aiFetch(body, signal) {
  try { const r = await fetch(AI_OWN, { method: 'POST', headers: { 'content-type': 'application/json' }, signal, body: JSON.stringify(body) }); const j = await r.json(); if (j) return j; } catch (e) { if (signal && signal.aborted) throw e; }
  return {};
}
const AIX = {
  ru: { as_t: 'ИИ ассистент', as_s: 'Отвечу на любой вопрос', as_hi: 'Здравствуйте{n}! Я ИИ ассистент MyUzCity. Спросите о чём угодно — госуслуги, платежи, транспорт, здоровье или любой другой вопрос.', as_ph: 'Напишите вопрос…', as_err: 'Не удалось получить ответ. Проверьте интернет и попробуйте ещё раз.', as_retry: 'Повторить', as_new: 'Новый диалог',
    as_q: 'Как оформить загранпаспорт?|Сколько стоит проезд в метро?|Какие документы нужны для детского сада?|Что посмотреть в городе {c}?' },
  uz: { as_t: 'AI yordamchi', as_s: 'Har qanday savolga javob beraman', as_hi: "Assalomu alaykum{n}! Men MyUzCity AI yordamchisiman. Istalgan savolni bering — davlat xizmatlari, to'lovlar, transport, sog'liq va boshqalar.", as_ph: 'Savolingizni yozing…', as_err: "Javob olinmadi. Internetni tekshirib, qayta urinib ko'ring.", as_retry: 'Qayta urinish', as_new: 'Yangi suhbat',
    as_q: 'Xorijga chiqish pasportini qanday olish mumkin?|Metroda yo\'l haqi qancha?|Bog\'cha uchun qanday hujjatlar kerak?|{c}da nimalarni ko\'rish mumkin?' },
  en: { as_t: 'AI assistant', as_s: 'Ask me anything', as_hi: 'Hello{n}! I am the MyUzCity AI assistant. Ask me anything — public services, payments, transport, health or any other question.', as_ph: 'Type your question…', as_err: 'Could not get an answer. Check your connection and try again.', as_retry: 'Retry', as_new: 'New chat',
    as_q: 'How do I get an international passport?|How much is a metro ride?|What documents are needed for kindergarten?|What to see in {c}?' },
  zh: { as_t: 'AI 助手', as_s: '有问必答', as_hi: '您好{n}！我是 MyUzCity 的 AI 助手。任何问题都可以问我：政务服务、支付、交通、医疗等。', as_ph: '输入您的问题…', as_err: '未能获取回答，请检查网络后重试。', as_retry: '重试', as_new: '新对话',
    as_q: '如何办理出国护照？|地铁票价是多少？|上幼儿园需要哪些材料？|{c}有什么值得参观的？' },
};
for (const l in AIX) Object.assign(I[l], AIX[l]);
// [[go:code]] → screen + button label
const AI_GO = {
  pay_light: ['h:pay?light', 'Оплатить свет', "Elektr uchun to'lash", 'Pay electricity', '缴纳电费'],
  pay_util: ['h:pay?util', 'Коммунальные платежи', "Kommunal to'lovlar", 'Utility payments', '水电燃气缴费'],
  transit: ['h:pay?transit', 'Пополнить транспортную карту', "Transport kartasini to'ldirish", 'Top up transit card', '交通卡充值'],
  fines: ['1:2649', 'Штрафы', 'Jarimalar', 'Fines', '罚款'], parking: ['1:4858', 'Парковка', 'Avtoturargoh', 'Parking', '停车'],
  ev: ['h:poi?ev', 'Зарядка электромобилей', 'Elektromobil quvvatlash', 'EV charging', '电动车充电'],
  doctor: ['a:dmed:dm', 'Запись к врачу', 'Shifokor qabuli', 'Book a doctor', '预约医生'], health: ['1:5032', 'Здоровье', "Sog'liq", 'Health', '医疗健康'],
  docs: ['1:19', 'Мои документы', 'Mening hujjatlarim', 'My documents', '我的证件'], queue: ['a:cgu', 'Электронная очередь', 'Elektron navbat', 'E-queue', '电子排队'],
  gov: ['1:2573', 'Госуслуги', 'Davlat xizmatlari', 'Public services', '政务服务'], appeal: ['h:reports?appeal', 'Обращение к хокиму', 'Hokimga murojaat', 'Appeal to the Hokim', '向市长反映'],
  sos: ['1:4475', 'Тревожная кнопка', 'Xavf tugmasi', 'Panic button', '紧急按钮'], polls: ['h:polls?city', 'Опросы', "So'rovnomalar", 'Polls', '投票'],
  mahalla: ['1:996', 'Цифровая махалля', 'Raqamli mahalla', 'Digital Mahalla', '数字社区'], family: ['1:3042', 'Семья и образование', "Oila va ta'lim", 'Family and education', '家庭与教育'],
  tickets: ['h:tickets', 'Билеты', 'Chiptalar', 'Tickets', '车票'], cafes: ['h:cafes', 'Кафе и рестораны', 'Kafe va restoranlar', 'Cafes and restaurants', '餐厅'],
  sights: ['h:poi?sight', 'Достопримечательности', 'Diqqatga sazovor joylar', 'Sights', '名胜古迹'], tourist: ['h:poi?sight', 'Туристическая карта', 'Turistik karta', 'Tourist card', '旅游卡'],
  fairs: ['h:news?afisha', 'Ярмарки и события', 'Yarmarka va tadbirlar', 'Fairs and events', '展会与活动'], realty: ['1:235', 'Недвижимость', "Ko'chmas mulk", 'Real estate', '房产'],
  ipo: ['1:332', 'Покупка акций IPO', 'IPO aksiyalari', 'Buy IPO shares', '购买 IPO 股票'], business: ['1:523', 'Для бизнеса', 'Biznes uchun', 'For business', '企业服务'],
  volunteer: ['1:4356', 'Волонтёрство', 'Volontyorlik', 'Volunteering', '志愿服务'], cashback: ['1:448', 'Национальный кешбэк', 'Milliy keshbek', 'National cashback', '国家返现'],
  roads: ['h:reports?road', 'Дороги и ремонт', "Yo'llar va ta'mirlash", 'Roads and repairs', '道路与维修'], clean: ['h:eco', 'Чистый город', 'Toza shahar', 'Clean city', '清洁城市'],
  mosques: ['1:3529', 'Карта мечетей', 'Masjidlar xaritasi', 'Mosque map', '清真寺地图'], marketplace: ['1:5149', 'Маркетплейс', 'Marketpleys', 'Marketplace', '商城'],
  home: ['1:5285', 'Электронный дом', 'Elektron uy', 'E-home', '智慧家庭'],
  med: ['h:poi?med', 'Аптеки и клиники рядом', 'Yaqin dorixona va klinikalar', 'Pharmacies & clinics nearby', '附近药店和诊所'], parking_map: ['h:poi?parking', 'Карта парковок', 'Avtoturargohlar xaritasi', 'Parking map', '停车地图'],
  qr: ['h:qr', 'Сканер QR', 'QR skaner', 'QR scanner', '二维码扫描'], ev_map: ['h:poi?ev', 'Электрозарядки на карте', 'Elektr zaryadlash xaritada', 'EV chargers map', '充电桩地图'], speedcams: ['h:poi?speedcam', 'Камеры скорости', 'Tezlik kameralari', 'Speed cameras', '测速摄像头'],
  schools: ['h:poi?edu', 'Школы и детсады', "Maktab va bog'chalar", 'Schools & kindergartens', '学校和幼儿园'], govcenters: ['h:poi?gov:cgu', 'Центры госуслуг', 'Davlat xizmatlari markazlari', 'Public service centres', '政务中心'], sights_map: ['h:poi?sight', 'Достопримечательности на карте', 'Diqqatga sazovor joylar xaritada', 'Sights map', '景点地图'],
  reports: ['h:reports', 'Сообщить о проблеме', 'Muammo haqida xabar', 'Report a problem', '报告问题'], polls_live: ['h:polls?city', 'Опросы', "So'rovnomalar", 'Polls', '投票'],
  transport: ['h:transport', 'Транспорт', 'Transport', 'Transport', '交通'], trains: ['h:trains', 'Поезда и вокзалы', 'Poyezdlar va vokzallar', 'Trains & stations', '火车与车站'], flights: ['h:flights', 'Табло аэропортов', 'Aeroportlar tablosi', 'Airport boards', '机场航班'],
  metro: ['h:transit?metro', 'Схема метро', 'Metro sxemasi', 'Metro map', '地铁线路图'], bus: ['h:transit?bus', 'Автобусы и остановки', 'Avtobuslar va bekatlar', 'Buses & stops', '公交与车站'],
  newbuild: ['h:poi?build', 'Новостройки на карте', 'Yangi uylar xaritada', 'New buildings map', '新楼盘地图'],
  mosque_map: ['h:poi?mosque', 'Мечети на карте', 'Masjidlar xaritada', 'Mosques on the map', '清真寺地图'],
  cams: ['h:cams', 'Видеокамеры', 'Videokameralar', 'Live cameras', '实时摄像头'], news: ['h:news', 'Новости и афиша', 'Yangiliklar va afisha', 'News & events', '新闻与活动'],
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
  const pl = [], cq = [];
  s = String(s).replace(/\s*\[\[\s*place\s*:\s*([nwr]\d+)\s*\]\]/gi, (m, id) => { if (!pl.includes(id)) pl.push(id); return ''; })
    .replace(/\s*\[\[\s*cafes\s*:\s*([^\]]{1,80})\]\]/gi, (m, q) => { cq.push(q.trim()); return ''; });
  const pq = []; s = String(s).replace(/\s*\[\[\s*poi\s*:\s*(parking|mosque|med)\s*:\s*([nwr]\d+)\s*\]\]/gi, (m, k, id) => { if (!pq.some(x => x[1] === id)) pq.push([k, id]); return ''; });
  const go = []; s = String(s).replace(/\s*\[\[\s*(?:go\s*:\s*)?([a-z_]+)\s*\]\]/gi, (m, k) => { if (AI_GO[k] && !go.includes(k)) go.push(k); return ''; }).replace(/\s*\[\[[^\]]*\]\]/g, '').trim();
  const plist = CAF_DATA[cityIdx()] || CAF_DATA[0] || [];
  const extra = pl.map(id => { const p = plist.find(x => x.id === id); return `<button class="ai-place" data-place="${id}"><b>${esc(p ? p.n : t('caf_t'))}</b><i>${esc(p ? [cafKind(p), cafCuis(p)].filter(Boolean).join(' · ') : '')}</i><span>${esc(t('ai_open'))} ›</span></button>`; }).join('')
    + pq.slice(0, 4).map(([k, id]) => { const p = (PO_DATA[k][cityIdx()] || PO_DATA[k][0] || []).find(x => x.id === id); return `<button class="ai-place" data-poi="${k}:${id}"><b>${esc(p ? PO_K[k].name(p) : t(PO_K[k].title))}</b><i>${esc(p ? [PO_K[k].sub(p), p.ad].filter(Boolean).join(' · ') : '')}</i><span>${esc(t('ai_open'))} ›</span></button>`; }).join('')
    + cq.slice(0, 1).map(q => `<button class="ai-place cq" data-cafq="${esc(q)}"><b>${esc(t('ai_btn'))}</b><i>${esc(q)}</i><span>›</span></button>`).join('');
  let h = esc(s).replace(/^\s*[-*•]\s+/gm, '• ').replace(/\n/g, '<br>');
  if (extra) h += `<div class="ai-places">${extra}</div>`;
  if (go.length) h += `<div class="ai-go">${go.map(k => `<button data-go="${k}">${esc(AI_GO[k][LI[LANG] + 1])} →</button>`).join('')}</div>`;
  return h;
}
function aiRender() {
  const box = document.getElementById('aiMsgs'); if (!box) return;
  const hi = `<div class="ai-b l">${esc(t('as_hi', { n: userFirst() ? (LANG === 'zh' ? '，' : ', ') + userFirst() : '' }))}</div>`;
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
    const j = await aiFetch({ messages: AIS.msgs.filter(m => m.role === 'user' || m.role === 'assistant').slice(-14), lang: LANG, name: userFirst() || '—', city: cityName(), date: liveText('date'), screen: AIS.screen || '',
      ctx: { cityIdx: cityIdx(), loc: (window.__caf && window.__caf.loc) || null, pray: (() => { try { const P0 = prayNow(); return P0.tm.map((m, i) => I.ru['pr_' + i] + ' ' + hm(m)).join(', ') + '; следующий — ' + I.ru['pr_' + P0.next]; } catch (e) { return ''; } })() } }, ctl.signal).catch(() => ({}));
    clearTimeout(tm); reply = j.reply || ''; ok = !!j.ok && !!reply;
    if (!ok && j.error) { reply = j.error; ok = true; }
  } catch (e) {}
  AIS.busy = false;
  AIS.msgs.push(ok ? { role: 'assistant', content: reply } : { role: 'error', content: '' });
  aiSave(); aiRender();
}
function aiOpen() {
  if (document.getElementById('aiPanel')) return;
  try { cafLoad(cityIdx()); poIndex().then(() => { poLoad('med', poCity('med')); poLoad('mosque', poCity('mosque')); }).catch(() => {}); } catch (e) {}
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
    else if (b.dataset.place) { window.__cafOpenId = b.dataset.place; aiClose(); setTimeout(() => current === 'h:cafes' ? cafOpen(b.dataset.place) : go('h:cafes'), 120); }
    else if (b.dataset.poi) { const [k, id] = b.dataset.poi.split(':'); aiClose(); setTimeout(() => { if (current === 'h:poi' && window.__poK === k) poOpen(k, id); else { window.__poOpen = id; po(k).cat = 'all'; po(k).city = null; go('h:poi', k); } }, 120); }
    else if (b.dataset.cafq) { window.__cafAsk = b.dataset.cafq; aiClose(); setTimeout(() => { if (current === 'h:cafes') { const q = window.__cafAsk; window.__cafAsk = null; XACT.aiopen(); cgAsk(q); } else go('h:cafes'); }, 120); }
    else if (b.dataset.go) { const to = AI_GO[b.dataset.go][0]; aiClose(); setTimeout(() => to.startsWith('a:') ? runAction(to.slice(2)) : to.startsWith('h:') ? go(to.split('?')[0], to.split('?')[1]) : go(to), 120); }
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
//   hevc: true if the camera streams H.265 — phones can't decode it, so they get the Windy timelapse instead
//   windy: webcam id from windy.com/webcams/ID                         → 24-hour timelapse (public Windy player)
//   region: index in REGIONS (0 Tashkent city, 1 Tashkent region, 8 Samarkand, …)
const CAM_OWNERS = { amirsoy: ['Amirsoy Resort', 'https://www.amirsoy.com/ru/webcams.html'] };
const CAM_PLACE = { amirsoy: ['Амирсой, Бостанлыкский район', "Amirsoy, Bo'stonliq tumani", 'Amirsoy, Bostanliq district', '阿米尔索伊，博斯坦雷克区'] };
const CAMS = [
  { id: 'amirsoy-prima', region: 1, place: 'amirsoy', owner: 'amirsoy', ipeye: '3d01802be4b544c8b4e64aea00e76e6e',
    name: ['Канатная дорога Prima', "Prima kanat yo'li", 'Prima cable car', 'Prima 缆车'],
    sub: ['Нижняя станция и вход на курорт', 'Quyi bekat va kurort kirishi', 'Base station and resort entrance', '缆车下站 · 度假村入口'] },
  { id: 'amirsoy-2290-west', region: 1, place: 'amirsoy', owner: 'amirsoy', ipeye: '7c8231e409fe4d5f9450384993720b5e', hevc: true, windy: '1611899491',
    name: ['Вершина 2290 м · запад', "Cho'qqi 2290 m · g'arb", 'Summit 2290 m · west', '2290 米山顶 · 西'],
    sub: ['Вид на долину и склоны', "Vodiy va yonbag'irlar manzarasi", 'View of the valley and slopes', '山谷与雪道景观'] },
  { id: 'amirsoy-2290-south', region: 1, place: 'amirsoy', owner: 'amirsoy', ipeye: 'b65cb31c58e44e308d6807c45db86520', hevc: true, windy: '1642432667',
    name: ['Вершина 2290 м · юг', "Cho'qqi 2290 m · janub", 'Summit 2290 m · south', '2290 米山顶 · 南'],
    sub: ['Площадка у верхней станции', 'Yuqori bekat maydoni', 'Terrace at the top station', '缆车上站平台'] },
];
const CAMI = {
  ru: { cams_t: 'Видеокамеры', cams_all: 'Все', cams_live: '{n} в эфире', cams_upd: 'Превью обновлено в {t}',
    cams_empty_t: 'Открытых камер пока нет', cams_empty_s: 'В регионе «{r}» нет камер, которые владельцы открыли для всех. Как только они появятся, они будут здесь.', cams_show_all: 'Показать все камеры',
    cams_note: 'Здесь собраны только камеры, которые их владельцы открыли для публичного просмотра. Городские камеры безопасности и дорожные камеры служебные — их трансляции закрыты.', cams_checked: 'Проверено 22 ноября 2026',
    cam_tl_note: 'Эта камера передаёт видео в формате H.265, телефоны его не воспроизводят. Здесь кадры с камеры, они обновляются каждые 10 минут.', cam_live: 'Прямой эфир', cam_tl: 'Таймлапс за сутки', cam_where: 'Место', cam_region: 'Регион', cam_owner: 'Камера', cam_src: 'Трансляция', cam_more: 'Другие камеры', cam_site: 'Все камеры на сайте владельца', live: 'LIVE' },
  uz: { cams_t: 'Videokameralar', cams_all: 'Barchasi', cams_live: '{n} ta efirda', cams_upd: 'Rasmlar {t} da yangilandi',
    cams_empty_t: "Hozircha ochiq kameralar yo'q", cams_empty_s: "«{r}» hududida egalari hamma uchun ochgan kameralar yo'q. Ular paydo bo'lishi bilan shu yerda ko'rinadi.", cams_show_all: "Barcha kameralarni ko'rsatish",
    cams_note: "Bu yerda faqat egalari ommaviy ko'rish uchun ochgan kameralar jamlangan. Shahar xavfsizlik va yo'l kameralari xizmat kameralari — ularning translyatsiyasi yopiq.", cams_checked: '2026-yil 22-noyabrda tekshirildi',
    cam_tl_note: "Bu kamera videoni H.265 formatida uzatadi, telefonlar uni o'ynata olmaydi. Bu yerda kameradan olingan kadrlar, ular har 10 daqiqada yangilanadi.", cam_live: 'Jonli efir', cam_tl: 'Bir kunlik taymlaps', cam_where: 'Joy', cam_region: 'Hudud', cam_owner: 'Kamera', cam_src: 'Translyatsiya', cam_more: 'Boshqa kameralar', cam_site: 'Egasining saytidagi barcha kameralar', live: 'LIVE' },
  en: { cams_t: 'Live cameras', cams_all: 'All', cams_live: '{n} live now', cams_upd: 'Previews updated at {t}',
    cams_empty_t: 'No open cameras yet', cams_empty_s: 'There are no cameras in “{r}” that their owners have opened to the public. As soon as one appears, it will show up here.', cams_show_all: 'Show all cameras',
    cams_note: 'Only cameras whose owners opened them for public viewing are listed here. City security and traffic cameras are for official use and their feeds are closed.', cams_checked: 'Checked on November 22, 2026',
    cam_tl_note: "This camera streams H.265 video, which phones can't play. Here are frames from the camera, refreshed every 10 minutes.", cam_live: 'Live', cam_tl: '24-hour timelapse', cam_where: 'Location', cam_region: 'Region', cam_owner: 'Camera', cam_src: 'Stream', cam_more: 'Other cameras', cam_site: "All cameras on the owner's website", live: 'LIVE' },
  zh: { cams_t: '实时摄像头', cams_all: '全部', cams_live: '{n} 个直播中', cams_upd: '预览更新于 {t}',
    cams_empty_t: '暂无公开摄像头', cams_empty_s: '“{r}”目前没有向公众开放的摄像头。一旦出现，就会显示在这里。', cams_show_all: '显示全部摄像头',
    cams_note: '这里只收录所有者向公众开放的摄像头。城市安防和交通摄像头仅供公务使用，不公开直播。', cams_checked: '2026年11月22日核实',
    cam_tl_note: '该摄像头以 H.265 格式传输视频，手机无法播放。这里显示摄像头画面，每 10 分钟更新一次。', cam_live: '直播', cam_tl: '24小时延时', cam_where: '位置', cam_region: '地区', cam_owner: '摄像头', cam_src: '直播来源', cam_more: '其他摄像头', cam_site: '所有者网站上的全部摄像头', live: 'LIVE' },
};
for (const l in CAMI) Object.assign(I[l], CAMI[l]);
AI_HIDE.add('h:cam');

const CAM_IC = (s, c = '#fff') => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>`;
const PLAY_IC = '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M8 5.5v13l10.5-6.5z" fill="#fff"/></svg>';
const CAM_MOBILE = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
function camLiveOK(c) { return !!c.ipeye && !(c.hevc && CAM_MOBILE); }
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
  const liveOK = camLiveOK(c);
  const view = !liveOK || (c.windy && window.__camView === 'tl') ? 'tl' : 'live';
  const owner = CAM_OWNERS[c.owner];
  const others = CAMS.filter(x => x !== c);
  return `${hdr(camL(c.name))}<div class="h-body">
    <div class="cam-player"><iframe src="${esc(camSrc(c, view))}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="eager" referrerpolicy="strict-origin-when-cross-origin" title="${esc(camL(c.name))}"></iframe></div>
    ${!liveOK ? `<div class="h-muted small cam-tlnote">${esc(t('cam_tl_note'))}</div>` : ''}
    ${liveOK && c.windy ? `<div class="cam-tabs"><button class="h-chip ${view === 'live' ? 'on' : ''}" data-act="camview:live"><span class="cam-rec"></span>${esc(t('cam_live'))}</button><button class="h-chip ${view === 'tl' ? 'on' : ''}" data-act="camview:tl">${esc(t('cam_tl'))}</button></div>` : ''}
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

// ======================= Live data: city news on Home + «Кафе и рестораны» =======================
// data/news.json and data/places/*.json are refreshed by .github/workflows/update-data.yml
const LIVE_I = {
  ru: { news_h: 'Новости', news_all: 'Все', news_t: 'Новости и афиша', news_f_all: 'Все', news_f_afisha: 'Афиша', news_f_news: 'Новости', news_read: 'Читать полностью', news_upd: 'Обновлено {t}', news_country: 'Новостей по этому городу пока нет — показываем новости Узбекистана',
    nk_cinema: 'Кино', nk_city: 'Город', nk_sale: 'Акции', nk_food: 'Еда', nk_fashion: 'Мода', nk_concert: 'Концерты', nk_theatre: 'Театр', nk_kids: 'Детям', nk_art: 'Искусство', nk_sport: 'Спорт', nk_travel: 'Путешествия', nk_news: 'Новости',
    caf_t: 'Кафе и рестораны', caf_q: 'Название, кухня или улица', caf_n: '{n} заведений', caf_more: 'Показать ещё', caf_none: 'Ничего не нашлось — попробуйте другой фильтр', caf_load: 'Загружаем заведения…', caf_err: 'Не удалось загрузить заведения. Проверьте интернет.',
    caf_city_t: 'Выберите город', caf_open: 'Открыто', caf_closed: 'Закрыто', caf_until: 'Открыто до {t}', caf_h24: 'Круглосуточно', caf_hours: 'Часы работы', caf_addr: 'Адрес', caf_phone: 'Телефон', caf_call: 'Позвонить',
    caf_route: 'Построить маршрут', caf_route_s: 'Откроется в приложении, которое вы выберете', caf_photos: 'Фото и отзывы в Яндекс Картах', caf_site: 'Сайт', caf_dl: 'Доставка', caf_halal: 'Халяль', caf_nophoto: 'Фото заведения пока нет',
    caf_src: 'Данные о заведениях — OpenStreetMap, обновляются еженедельно', caf_me: 'Я здесь', caf_geo_err: 'Не удалось определить местоположение', caf_share: 'Поделиться', caf_cu: 'Кухня', caf_big: 'Развернуть карту', caf_small: 'Свернуть карту',
    cat_all: 'Все', cat_open: 'Открыто сейчас', cat_plov: 'Плов', cat_hookah: 'Кальян', cat_national: 'Национальная кухня', cat_grill: 'Шашлык и гриль', cat_coffee: 'Кофейни', cat_europe: 'Европейская', cat_asia: 'Азиатская', cat_fast: 'Фастфуд', cat_bar: 'Бары', cat_terrace: 'Терраса', cat_cafe: 'Кафе',
    am_restaurant: 'Ресторан', am_cafe: 'Кафе', am_fast_food: 'Фастфуд', am_bar: 'Бар', am_pub: 'Паб', am_hookah_lounge: 'Кальянная', am_food_court: 'Фудкорт', am_biergarten: 'Пивной сад' },
  uz: { news_h: 'Yangiliklar', news_all: 'Barchasi', news_t: 'Yangiliklar va afisha', news_f_all: 'Barchasi', news_f_afisha: 'Afisha', news_f_news: 'Yangiliklar', news_read: "To'liq o'qish", news_upd: '{t} da yangilandi', news_country: "Bu shahar bo'yicha yangiliklar hozircha yo'q — O'zbekiston yangiliklarini ko'rsatamiz",
    nk_cinema: 'Kino', nk_city: 'Shahar', nk_sale: 'Aksiyalar', nk_food: 'Taom', nk_fashion: 'Moda', nk_concert: 'Konsertlar', nk_theatre: 'Teatr', nk_kids: 'Bolalarga', nk_art: "San'at", nk_sport: 'Sport', nk_travel: 'Sayohat', nk_news: 'Yangiliklar',
    caf_t: 'Kafe va restoranlar', caf_q: "Nomi, oshxona yoki ko'cha", caf_n: '{n} ta joy', caf_more: "Yana ko'rsatish", caf_none: 'Hech narsa topilmadi — boshqa filtrni tanlang', caf_load: 'Joylar yuklanmoqda…', caf_err: "Joylarni yuklab bo'lmadi. Internetni tekshiring.",
    caf_city_t: 'Shaharni tanlang', caf_open: 'Ochiq', caf_closed: 'Yopiq', caf_until: '{t} gacha ochiq', caf_h24: 'Kecha-kunduz', caf_hours: 'Ish vaqti', caf_addr: 'Manzil', caf_phone: 'Telefon', caf_call: "Qo'ng'iroq qilish",
    caf_route: "Yo'nalish qurish", caf_route_s: "Siz tanlagan ilovada ochiladi", caf_photos: 'Yandex Kartalarda rasmlar va sharhlar', caf_site: 'Sayt', caf_dl: 'Yetkazib berish', caf_halal: 'Halol', caf_nophoto: "Hozircha joy rasmi yo'q",
    caf_src: "Joylar haqidagi ma'lumot — OpenStreetMap, har hafta yangilanadi", caf_me: 'Men shu yerda', caf_geo_err: "Joylashuvni aniqlab bo'lmadi", caf_share: 'Ulashish', caf_cu: 'Oshxona', caf_big: 'Xaritani kattalashtirish', caf_small: 'Xaritani kichraytirish',
    cat_all: 'Barchasi', cat_open: 'Hozir ochiq', cat_plov: 'Palov', cat_hookah: 'Qalyan', cat_national: 'Milliy taomlar', cat_grill: 'Shashlik va grill', cat_coffee: 'Qahvaxonalar', cat_europe: 'Yevropa', cat_asia: 'Osiyo', cat_fast: 'Fastfud', cat_bar: 'Barlar', cat_terrace: 'Terrasa', cat_cafe: 'Kafe',
    am_restaurant: 'Restoran', am_cafe: 'Kafe', am_fast_food: 'Fastfud', am_bar: 'Bar', am_pub: 'Pab', am_hookah_lounge: 'Qalyanxona', am_food_court: 'Fudkort', am_biergarten: "Pivo bog'i" },
  en: { news_h: 'News', news_all: 'All', news_t: 'News & events', news_f_all: 'All', news_f_afisha: 'Events', news_f_news: 'News', news_read: 'Read full story', news_upd: 'Updated {t}', news_country: 'No news for this city yet — showing news from Uzbekistan',
    nk_cinema: 'Cinema', nk_city: 'City', nk_sale: 'Deals', nk_food: 'Food', nk_fashion: 'Fashion', nk_concert: 'Concerts', nk_theatre: 'Theatre', nk_kids: 'Kids', nk_art: 'Art', nk_sport: 'Sport', nk_travel: 'Travel', nk_news: 'News',
    caf_t: 'Cafes & restaurants', caf_q: 'Name, cuisine or street', caf_n: '{n} places', caf_more: 'Show more', caf_none: 'Nothing found — try another filter', caf_load: 'Loading places…', caf_err: "Couldn't load places. Check your connection.",
    caf_city_t: 'Choose a city', caf_open: 'Open', caf_closed: 'Closed', caf_until: 'Open until {t}', caf_h24: 'Open 24/7', caf_hours: 'Opening hours', caf_addr: 'Address', caf_phone: 'Phone', caf_call: 'Call',
    caf_route: 'Get directions', caf_route_s: 'Opens in the app you choose', caf_photos: 'Photos & reviews on Yandex Maps', caf_site: 'Website', caf_dl: 'Delivery', caf_halal: 'Halal', caf_nophoto: 'No photo of this place yet',
    caf_src: 'Place data — OpenStreetMap, refreshed weekly', caf_me: "I'm here", caf_geo_err: "Couldn't get your location", caf_share: 'Share', caf_cu: 'Cuisine', caf_big: 'Expand map', caf_small: 'Collapse map',
    cat_all: 'All', cat_open: 'Open now', cat_plov: 'Plov', cat_hookah: 'Hookah', cat_national: 'Uzbek cuisine', cat_grill: 'Grill & kebab', cat_coffee: 'Coffee', cat_europe: 'European', cat_asia: 'Asian', cat_fast: 'Fast food', cat_bar: 'Bars', cat_terrace: 'Terrace', cat_cafe: 'Cafe',
    am_restaurant: 'Restaurant', am_cafe: 'Cafe', am_fast_food: 'Fast food', am_bar: 'Bar', am_pub: 'Pub', am_hookah_lounge: 'Hookah lounge', am_food_court: 'Food court', am_biergarten: 'Beer garden' },
  zh: { news_h: '新闻', news_all: '全部', news_t: '新闻与活动', news_f_all: '全部', news_f_afisha: '活动', news_f_news: '新闻', news_read: '阅读全文', news_upd: '更新于 {t}', news_country: '该城市暂无新闻 — 显示乌兹别克斯坦新闻',
    nk_cinema: '电影', nk_city: '城市', nk_sale: '优惠', nk_food: '美食', nk_fashion: '时尚', nk_concert: '音乐会', nk_theatre: '剧院', nk_kids: '儿童', nk_art: '艺术', nk_sport: '体育', nk_travel: '旅行', nk_news: '新闻',
    caf_t: '咖啡馆与餐厅', caf_q: '名称、菜系或街道', caf_n: '{n} 家', caf_more: '显示更多', caf_none: '未找到 — 请尝试其他筛选', caf_load: '正在加载…', caf_err: '无法加载，请检查网络。',
    caf_city_t: '选择城市', caf_open: '营业中', caf_closed: '已打烊', caf_until: '营业至 {t}', caf_h24: '24小时营业', caf_hours: '营业时间', caf_addr: '地址', caf_phone: '电话', caf_call: '拨打电话',
    caf_route: '导航路线', caf_route_s: '在您选择的应用中打开', caf_photos: 'Yandex 地图上的照片和评价', caf_site: '网站', caf_dl: '外卖', caf_halal: '清真', caf_nophoto: '暂无该地点照片',
    caf_src: '地点数据 — OpenStreetMap，每周更新', caf_me: '我的位置', caf_geo_err: '无法获取位置', caf_share: '分享', caf_cu: '菜系', caf_big: '展开地图', caf_small: '收起地图',
    cat_all: '全部', cat_open: '营业中', cat_plov: '抓饭', cat_hookah: '水烟', cat_national: '乌兹别克菜', cat_grill: '烧烤', cat_coffee: '咖啡', cat_europe: '西餐', cat_asia: '亚洲菜', cat_fast: '快餐', cat_bar: '酒吧', cat_terrace: '露台', cat_cafe: '咖啡馆',
    am_restaurant: '餐厅', am_cafe: '咖啡馆', am_fast_food: '快餐', am_bar: '酒吧', am_pub: '酒馆', am_hookah_lounge: '水烟馆', am_food_court: '美食广场', am_biergarten: '啤酒花园' },
};
for (const l in LIVE_I) Object.assign(I[l], LIVE_I[l]);
const LOCALE = { ru: 'ru-RU', uz: 'uz-Latn-UZ', en: 'en-GB', zh: 'zh-CN' };
function fmtDate(iso, withTime = true) {
  const d = new Date(iso); if (isNaN(d)) return '';
  try { return d.toLocaleString(LOCALE[LANG] || 'ru-RU', Object.assign({ day: 'numeric', month: 'long' }, withTime ? { hour: '2-digit', minute: '2-digit' } : {})); } catch (e) { return d.toISOString().slice(0, 10); }
}
// generic bottom sheet (rendered over the current screen, in design units like .hscreen)
function bsheet(html, cls = '') {
  bsheetClose(true);
  const app = document.getElementById('app');
  const w = document.createElement('div'); w.className = 'bs-wrap ' + cls; w.style.zoom = U; w.style.height = VH + 'px';
  w.innerHTML = `<div class="bs-bg"></div><div class="bs"><div class="bs-grab"></div><button class="bs-x" data-act="bsclose" aria-label="close">${IC.close}</button><div class="bs-body vs">${html}</div></div>`;
  app.appendChild(w);
  requestAnimationFrame(() => requestAnimationFrame(() => w.classList.add('on')));
  w.addEventListener('click', e => { if (e.target.classList.contains('bs-bg')) return bsheetClose(); const b = e.target.closest('[data-act]'); if (b) { e.preventDefault(); runAction(b.dataset.act); } });
  const s = w.querySelector('.bs'), body = w.querySelector('.bs-body'); let y0 = null, dy = 0;
  s.addEventListener('touchstart', e => { y0 = body.scrollTop <= 0 ? e.touches[0].clientY : null; dy = 0; }, { passive: true });
  s.addEventListener('touchmove', e => { if (y0 == null) return; dy = Math.max(0, e.touches[0].clientY - y0); if (dy > 0) s.style.transform = `translateY(${dy / U}px)`; }, { passive: true });
  s.addEventListener('touchend', () => { if (y0 == null) return; s.style.transform = ''; if (dy > 90) bsheetClose(); y0 = null; });
  return w;
}
function bsheetClose(now) { const w = document.querySelector('.bs-wrap'); if (!w) return; if (now === true) return w.remove(); w.classList.remove('on'); setTimeout(() => w.remove(), 260); }

// ---------------------------------------------------------------- news
let NEWS = null, NEWS_AT = 0, NEWS_P = null;
function loadNews() {
  if (NEWS_P && Date.now() - NEWS_AT < 15 * 60e3) return NEWS_P;
  NEWS_AT = Date.now();
  return (NEWS_P = fetch(DATA_BASE + 'data/news.json', { cache: 'no-cache' }).then(r => r.ok ? r.json() : null).then(j => { if (j && j.cities) NEWS = j; return NEWS; }).catch(() => NEWS));
}
function cityNews(i = cityIdx()) { if (!NEWS) return null; const l = NEWS.cities[i]; return l && l.length ? { items: l, own: true } : { items: NEWS.all || [], own: false }; }
const NEWS_GRAD = ['#1a4a28,#2f6b3d', '#3b2a5e,#6b4c9a', '#7c2d12,#c2410c', '#0f4c5c,#2a7f8f'];
function newsTag(n) { return t('nk_' + (n.k || 'news')); }
function newsCard(n, idx) {
  const bg = n.i ? `background-image:url('${esc(n.i)}')` : `background:linear-gradient(135deg,${NEWS_GRAD[idx % 4]})`;
  return `<button class="hn-card" data-nidx="${idx}"><span class="hn-img" style="${bg}"><span class="hn-tag">${esc(newsTag(n))}</span>${n.i ? '' : `<span class="hn-src">${esc(n.s)}</span>`}</span>
    <span class="hn-meta">${esc(fmtDate(n.d))} · ${esc(n.s)}</span><span class="hn-title">${esc(n.t)}</span></button>`;
}
function openNews(n) {
  bsheet(`${n.i ? `<div class="ns-img" style="background-image:url('${esc(n.i)}')"></div>` : ''}
    <div class="ns-meta"><span class="ns-tag">${esc(newsTag(n))}</span>${esc(n.s)} · ${esc(fmtDate(n.d))}</div>
    <div class="ns-title">${esc(n.t)}</div>${n.x ? `<div class="ns-text">${esc(n.x)}${n.x.length >= 255 ? '…' : ''}</div>` : ''}
    ${btn(t('news_read'), 'ext:' + n.u)}`, 'bs-news');
}
const HN_TOP = 258, HN_STEP = 252;
function drawHomeNews(inner) {
  const cn = cityNews(); if (!cn || !cn.items.length) return;
  const items = cn.items.slice(0, 6);
  inner.querySelectorAll('.hn-wrap').forEach(e => e.remove());
  const w = document.createElement('div'); w.className = 'hn-wrap';
  w.style.top = P(HN_TOP); w.style.width = P(430); w.style.height = P(Math.max(1329 - HN_TOP, 54 + items.length * HN_STEP + 24));
  w.innerHTML = `<div class="hn-z" style="zoom:${U}"><div class="hn-head"><b>${esc(t('news_h'))}</b><button data-hn="all">${esc(t('news_all'))} ›</button></div>${items.map(newsCard).join('')}</div>`;
  inner.appendChild(w);
  inner.style.height = P(HN_TOP + 54 + items.length * HN_STEP + 24);
  w.addEventListener('click', e => {
    const c = e.target.closest('[data-nidx],[data-hn]'); if (!c) return; e.preventDefault(); e.stopPropagation();
    if (c.dataset.hn) go('h:news'); else openNews(items[+c.dataset.nidx]);
  });
}
function afterRender(id, layers) {
  if (id === '1:19') return drawDocsPage(layers);
  if (id === '1:4475') return drawSos(layers, 1016);
  if (id === '1:2649') return drawFines(layers, 976);
  if (id === '1:3042') return drawFamilyPage(layers);
  if (id === '1:2573') return drawGov(layers, 650);
  if (id === '1:5285') return drawUtil(layers, 790);
  if (id === '1:1332') { drawProfile(layers); return drawStats(layers); }
  if (id === '1:1552') return drawSettings(layers);
  if (id === '1:1677') return drawHelp(layers);
  if (id === '1:4858') { drawParking(layers); return drawCars(layers); }
  if (id === '1:3529') return drawMosques(layers);
  if (id === '1:5032') { drawHealth(layers); return drawAppts(layers); }
  if (id === '1:996') { drawMahalla(layers); return drawMahallaTop(layers); }
  if (id === '1:2379') return drawTransit(layers);
  if (id === '1:140') return drawInvest(layers);
  if (id !== '1:1909') return;
  drawWeather(layers);
  const inner = layers['s:1:1910']; if (!inner) return;
  const draw = () => { if (current === '1:1909' && document.body.contains(inner)) drawHomeNews(inner); };
  if (NEWS) draw();
  loadNews().then(draw);
}
HS.news = (arg) => {
  if (arg === 'afisha' || arg === 'news' || arg === 'all') { window.__newsF = arg; currentP = null; }
  const cn = cityNews(); const f = window.__newsF || 'all';
  let list = cn ? cn.items : [];
  if (f === 'afisha') list = list.filter(n => n.k !== 'news'); else if (f === 'news') list = list.filter(n => n.k === 'news');
  window.__newsList = list;
  const chips = ['all', 'afisha', 'news'].map(k => `<button class="h-chip ${f === k ? 'on' : ''}" data-act="newsf:${k}">${esc(t('news_f_' + k))}</button>`).join('');
  return `${hdr(t('news_t') + ' · ' + cityName())}<div class="h-body">
    <div class="cam-chips">${chips}</div>
    ${cn && !cn.own ? `<div class="h-muted small" style="margin:0 2px 14px">${esc(t('news_country'))}</div>` : ''}
    ${cn ? list.map((n, i) => newsCard(n, i)).join('') : `<div class="h-muted" style="text-align:center;margin-top:40px">${esc(t('caf_load'))}</div>`}
    ${NEWS ? `<div class="h-muted small cam-note">${esc(t('news_upd', { t: fmtDate(NEWS.updated) }))} · Afisha.uz, Gazeta.uz, Kun.uz, Podrobno.uz</div>` : ''}</div>`;
};
HS.news.mount = el => {
  if (!NEWS) loadNews().then(() => { if (current === 'h:news') render(current, currentP); });
  el.addEventListener('click', e => { const c = e.target.closest('[data-nidx]'); if (!c) return; e.preventDefault(); openNews(window.__newsList[+c.dataset.nidx]); });
};

// ---------------------------------------------------------------- cafes & restaurants
const CAF_CATS = ['plov', 'hookah', 'national', 'grill', 'coffee', 'europe', 'asia', 'fast', 'bar', 'terrace'];
const CAF_COL = { plov: '#C2410C', hookah: '#7C3AED', national: '#15803D', grill: '#DC2626', coffee: '#92400E', europe: '#2563EB', asia: '#DB2777', fast: '#D97706', bar: '#0F766E', terrace: '#0891B2', cafe: '#6B7280' };
const CAF_PRI = ['plov', 'hookah', 'national', 'grill', 'asia', 'europe', 'coffee', 'bar', 'fast', 'terrace', 'cafe'];
const CUIS = { uzbek: ['узбекская', "o'zbek", 'Uzbek', '乌兹别克'], regional: ['местная', 'mahalliy', 'local', '本地'], central_asian: ['среднеазиатская', 'Markaziy Osiyo', 'Central Asian', '中亚'], uyghur: ['уйгурская', 'uyg‘ur', 'Uyghur', '维吾尔'],
  russian: ['русская', 'rus', 'Russian', '俄餐'], italian: ['итальянская', 'italyan', 'Italian', '意大利菜'], pizza: ['пицца', 'pitsa', 'pizza', '披萨'], european: ['европейская', 'yevropa', 'European', '西餐'], international: ['интернациональная', 'xalqaro', 'international', '国际'],
  georgian: ['грузинская', 'gruzin', 'Georgian', '格鲁吉亚菜'], turkish: ['турецкая', 'turk', 'Turkish', '土耳其菜'], japanese: ['японская', 'yapon', 'Japanese', '日料'], sushi: ['суши', 'sushi', 'sushi', '寿司'], korean: ['корейская', 'koreys', 'Korean', '韩餐'],
  chinese: ['китайская', 'xitoy', 'Chinese', '中餐'], asian: ['азиатская', 'osiyo', 'Asian', '亚洲菜'], indian: ['индийская', 'hind', 'Indian', '印度菜'], burger: ['бургеры', 'burger', 'burgers', '汉堡'], chicken: ['курица', 'tovuq', 'chicken', '炸鸡'],
  kebab: ['шашлык, кебаб', 'kabob', 'kebab', '烤肉'], shashlik: ['шашлык', 'shashlik', 'shashlik', '烤串'], steak_house: ['стейки', 'steyk', 'steak', '牛排'], barbecue: ['барбекю', 'barbekyu', 'BBQ', '烧烤'], coffee_shop: ['кофейня', 'qahvaxona', 'coffee', '咖啡'],
  dessert: ['десерты', 'shirinliklar', 'desserts', '甜点'], cake: ['торты', 'tort', 'cakes', '蛋糕'], ice_cream: ['мороженое', 'muzqaymoq', 'ice cream', '冰淇淋'], breakfast: ['завтраки', 'nonushta', 'breakfast', '早餐'], seafood: ['морепродукты', 'dengiz mahsulotlari', 'seafood', '海鲜'],
  french: ['французская', 'fransuz', 'French', '法餐'], american: ['американская', 'amerika', 'American', '美式'], shawarma: ['шаурма', 'shaurma', 'shawarma', '沙威玛'], doner: ['донер', 'donar', 'doner', '土耳其烤肉'], sandwich: ['сэндвичи', 'sendvich', 'sandwiches', '三明治'], plov: ['плов', 'palov', 'plov', '抓饭'] };
const CAF_IC = '<svg viewBox="0 0 24 24" width="{s}" height="{s}" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>';
const caf = () => (window.__caf = window.__caf || { city: null, cat: 'all', q: '', more: 0, loc: null, big: false });
let CAF_INDEX = null; const CAF_DATA = {};
function cafCity() { const s = caf(); if (s.city == null) { const c = cityIdx(); s.city = CAF_INDEX && !CAF_INDEX.cities[c] ? 0 : c; } return s.city; }
function cafLoad(i) {
  const idx = CAF_INDEX ? Promise.resolve(CAF_INDEX) : fetch(DATA_BASE + 'data/places/index.json', { cache: 'no-cache' }).then(r => r.ok ? r.json() : { cities: {} }).then(j => (CAF_INDEX = j));
  return idx.then(() => CAF_DATA[i] || (CAF_INDEX.cities[i] ? fetch(`${DATA_BASE}data/places/${i}.json`, { cache: 'no-cache' }).then(r => r.ok ? r.json() : []).then(j => (CAF_DATA[i] = j)) : (CAF_DATA[i] = [])));
}
function cafPri(p) { for (const c of CAF_PRI) if (p.c.includes(c)) return c; return 'cafe'; }
function cafCuis(p) { return (p.cu || '').split(';').map(c => { const k = c.trim().toLowerCase(); return CUIS[k] ? CUIS[k][LI[LANG]] : k.replace(/_/g, ' '); }).filter(Boolean).slice(0, 3).join(', '); }
function cafKind(p) { return t('am_' + p.a) || ''; }
const OH_D = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
function ohState(oh, now = new Date()) {
  if (!oh) return null; const s = oh.trim(); if (s === '24/7') return { open: true, h24: true };
  const rules = s.split(';').map(x => x.trim()).filter(Boolean); let parsed = false;
  const ranges = d => { let r = null; for (const rule of rules) {
    const m = rule.match(/^((?:(?:Mo|Tu|We|Th|Fr|Sa|Su)(?:-(?:Mo|Tu|We|Th|Fr|Sa|Su))?,?)+)?\s*(.*)$/); const dp = m[1], tp = (m[2] || '').trim();
    let ap = !dp; if (dp) for (const seg of dp.split(',').filter(Boolean)) { const [a, b] = seg.split('-'); let k = OH_D.indexOf(a); const e = b ? OH_D.indexOf(b) : k; for (let n = 0; n < 7; n++) { if (k === d) ap = true; if (k === e) break; k = (k + 1) % 7; } }
    if (!ap) continue; if (/^(off|closed)$/i.test(tp)) { r = []; parsed = true; continue; }
    const tr = [...tp.matchAll(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/g)].map(x => [+x[1] * 60 + +x[2], +x[3] * 60 + +x[4]]); if (tr.length) { r = tr; parsed = true; } } return r; };
  const d = now.getDay(), mn = now.getHours() * 60 + now.getMinutes(), td = ranges(d), yd = ranges((d + 6) % 7);
  if (!parsed) return null;
  if (yd) for (const [a, b] of yd) if (b < a && mn < b) return { open: true, until: b };
  if (td) for (const [a, b] of td) { const e = b <= a ? b + 1440 : b; if (mn >= a && mn < e) return { open: true, until: b % 1440 }; }
  return { open: false };
}
const hm = m => String(Math.floor(m / 60) % 24).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
function ohLabel(p) { const st = ohState(p.h); if (!st) return ''; if (!st.open) return `<em class="cf-st off">${esc(t('caf_closed'))}</em>`; return `<em class="cf-st on">${esc(st.h24 ? t('caf_h24') : st.until != null ? t('caf_until', { t: hm(st.until) }) : t('caf_open'))}</em>`; }
function ohPretty(oh) {
  const D = { ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'], uz: ['Ya', 'Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh'], en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], zh: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'] }[LANG] || [];
  if (oh.trim() === '24/7') return t('caf_h24');
  return oh.split(';').map(s => s.trim().replace(/\b(Mo|Tu|We|Th|Fr|Sa|Su)\b/g, m => D[OH_D.indexOf(m)] || m).replace(/-/g, '–').replace(/\boff\b/g, '—').replace(/\bPH\b/g, LANG === 'ru' ? 'праздники' : 'PH')).join('<br>');
}
function cafDist(p) { const l = caf().loc; if (!l) return null; const R = 6371, r = Math.PI / 180, dLa = (p.la - l[0]) * r, dLo = (p.lo - l[1]) * r; const a = Math.sin(dLa / 2) ** 2 + Math.cos(l[0] * r) * Math.cos(p.la * r) * Math.sin(dLo / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(a)); }
function fmtDist(k) { return k == null ? '' : k < 1 ? Math.round(k * 1000 / 10) * 10 + (LANG === 'ru' ? ' м' : ' m') : k.toFixed(k < 10 ? 1 : 0) + (LANG === 'ru' ? ' км' : ' km'); }
function cafFiltered() {
  const s = caf(), list = CAF_DATA[cafCity()] || [], q = s.q.trim().toLowerCase();
  let r = list.filter(p => (s.cat === 'all' || (s.cat === 'open' ? (ohState(p.h) || {}).open : p.c.includes(s.cat))) && (!q || (p.n + ' ' + (p.n2 || '') + ' ' + (p.cu || '') + ' ' + cafCuis(p) + ' ' + (p.ad || '')).toLowerCase().includes(q)));
  const score = p => (p.ph ? 2 : 0) + (p.h ? 2 : 0) + (p.ad ? 1 : 0) + (p.w || p.ig ? 1 : 0) + (p.im || p.wc ? 2 : 0);
  if (s.loc) r = r.map(p => [cafDist(p), p]).sort((a, b) => a[0] - b[0]).map(x => x[1]); else r = r.slice().sort((a, b) => score(b) - score(a) || a.n.localeCompare(b.n));
  return r;
}
function cafItem(p) {
  const col = CAF_COL[cafPri(p)], cu = cafCuis(p), dist = fmtDist(cafDist(p));
  return `<button class="cf-item" data-act="cfopen:${p.id}"><span class="cf-ic" style="background:${col}">${CAF_IC.replace(/\{s\}/g, 18)}</span>
    <span class="cf-it"><b>${esc(p.n)}</b><i>${esc([cafKind(p), cu].filter(Boolean).join(' · '))}</i>${p.ad ? `<i>${esc(p.ad)}</i>` : ''}${ohLabel(p)}</span>${dist ? `<span class="cf-dist">${esc(dist)}</span>` : ''}</button>`;
}
const CAF_MAP_TOP = 236;
function cafMapH() { return caf().big ? Math.max(260, VH - CAF_MAP_TOP) : Math.min(300, Math.max(200, Math.round(VH * .33))); }
HS.cafes = () => {
  const s = caf(), ci = cafCity(), list = CAF_DATA[ci];
  const counts = {}; if (list) for (const p of list) for (const c of p.c) counts[c] = (counts[c] || 0) + 1;
  const openN = list ? list.filter(p => (ohState(p.h) || {}).open).length : 0;
  const chips = ['all', 'open', ...CAF_CATS].filter(c => !list || c === 'all' || (c === 'open' ? openN : counts[c])).map(c =>
    `<button class="h-chip ${s.cat === c ? 'on' : ''}" data-act="cfcat:${c}">${c !== 'all' && c !== 'open' ? `<span class="cf-dot" style="background:${CAF_COL[c]}"></span>` : ''}${esc(t('cat_' + c))}${list ? ` <i>${c === 'all' ? list.length : c === 'open' ? openN : counts[c]}</i>` : ''}</button>`).join('');
  return `<div class="h-hdr"><button class="h-back" data-act="back">${IC.back}</button><div class="h-title">${esc(t('caf_t'))}</div><button class="cf-city" data-act="cfcity">${esc(cityName(ci))}<svg viewBox="0 0 20 20" width="16" height="16">${CHEV_DOWN}</svg></button></div>
    <div class="cf-bar"><label class="cf-search"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="cfQ" type="search" enterkeyhint="search" autocomplete="off" placeholder="${esc(t('caf_q'))}" value="${esc(s.q)}"></label></div>
    <div class="cf-chips hs" id="cfChips">${chips}</div>
    <div class="cf-mapph" style="height:${cafMapH()}px"></div>
    <div class="h-body cf-body" id="cfList">${list ? '' : `<div class="cf-empty">${esc(t('caf_load'))}</div>`}</div>
    <button class="cf-aibtn" data-act="aiopen">${SPARK(18)}<span>${esc(t('ai_btn'))}</span></button>`;
};
let CAF_MAP = null, CAF_LAYER = null, CAF_SEL = null, CAF_ME = null;
function leafletReady() {
  if (window.L) return Promise.resolve();
  if (!window.__lfP) window.__lfP = new Promise((ok, no) => {
    const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'vendor/leaflet/leaflet.css'; document.head.appendChild(l);
    const s = document.createElement('script'); s.src = 'vendor/leaflet/leaflet.js'; s.onload = ok; s.onerror = no; document.head.appendChild(s);
  });
  return window.__lfP;
}
HS.cafes.mount = el => {
  const s = caf(), ci = cafCity();
  const chips = el.querySelector('#cfChips'); if (window.__cfChipX) chips.scrollLeft = window.__cfChipX;
  chips.addEventListener('scroll', () => { window.__cfChipX = chips.scrollLeft; }, { passive: true });
  const q = el.querySelector('#cfQ'); let tm;
  q.addEventListener('input', () => { clearTimeout(tm); tm = setTimeout(() => { s.q = q.value; s.more = 0; cafRefresh(); }, 220); });
  q.addEventListener('keydown', e => { if (e.key === 'Enter') q.blur(); });
  // the map lives outside the zoomed screen so Leaflet works in real pixels
  const app = document.getElementById('app');
  const mw = document.createElement('div'); mw.className = 'cf-map'; mw.style.top = P(CAF_MAP_TOP); mw.style.height = P(cafMapH()); mw.style.width = P(430);
  mw.innerHTML = `<div id="cfMap"></div><div class="cf-mbtns" style="zoom:${U}"><button data-cf="me" aria-label="${esc(t('caf_me'))}"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#143C20" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3.2" fill="#143C20"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><circle cx="12" cy="12" r="7"/></svg></button><button data-cf="big" aria-label="${esc(t(s.big ? 'caf_small' : 'caf_big'))}"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#143C20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${s.big ? '<path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7"/>' : '<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>'}</svg></button></div>`;
  app.appendChild(mw);
  mw.addEventListener('click', e => { const b = e.target.closest('[data-cf]'); if (!b) return; e.preventDefault(); e.stopPropagation(); if (b.dataset.cf === 'big') { s.big = !s.big; render(current, currentP); } else cafLocate(); });
  const list = el.querySelector('#cfList');
  list.addEventListener('scroll', () => { window.__cfListY = list.scrollTop; }, { passive: true });
  Promise.all([leafletReady(), cafLoad(ci)]).then(() => {
    if (!document.body.contains(mw)) return;
    if (!CAF_INDEX.cities[ci] && ci !== 0) { caf().city = 0; return render(current, currentP); }
    if (!el.querySelector('.cf-chips .h-chip i')) return render(current, currentP);   // first load: redraw with counts
    CAF_SEL = null; CAF_ME = null;
    const c = CITIES[ci]; const v = window.__cfView && window.__cfView.city === ci ? window.__cfView : null;
    CAF_MAP = L.map(mw.querySelector('#cfMap'), { zoomControl: false, attributionControl: true, preferCanvas: true }).setView(v ? v.c : [c[5], c[6]], v ? v.z : (ci === 0 ? 12 : 13));
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>' }).addTo(CAF_MAP);
    CAF_MAP.attributionControl.setPrefix(false);
    CAF_MAP.on('moveend', () => { window.__cfView = { city: ci, c: CAF_MAP.getCenter(), z: CAF_MAP.getZoom() }; });
    CAF_LAYER = L.layerGroup().addTo(CAF_MAP);
    CAF_MAP.on('zoomend', () => { const r = cafR(); CAF_LAYER.eachLayer(m => m.setStyle({ radius: r, weight: r < 5 ? 1 : 1.6 })); });
    if (s.loc) cafMeMarker();
    cafRefresh(true);
    RT = null; RT_LINE = null;
    if (window.__cafOpenId) { const id = window.__cafOpenId; window.__cafOpenId = null; cafOpen(id); }
    else if (window.__cafAsk) { const q = window.__cafAsk; window.__cafAsk = null; XACT.aiopen(); cgAsk(q); }
    else aiTip(el);
  }).catch(() => { list.innerHTML = `<div class="cf-empty">${esc(t('caf_err'))}</div>`; });
};
function cafRefresh(keepScroll) {
  const r = cafFiltered(), s = caf(), list = document.getElementById('cfList'); if (!list) return;
  const shown = r.slice(0, 40 + s.more);
  list.innerHTML = `<div class="cf-count">${esc(t('caf_n', { n: r.length }))}</div>${shown.map(cafItem).join('') || `<div class="cf-empty">${esc(t('caf_none'))}</div>`}
    ${r.length > shown.length ? btn(t('caf_more'), 'cfmore', 'ghostd') : ''}<div class="h-muted small cam-note">${esc(t('caf_src'))}</div>`;
  if (keepScroll && window.__cfListY) list.scrollTop = window.__cfListY; else list.scrollTop = 0;
  if (!CAF_LAYER || !window.L) return;
  CAF_LAYER.clearLayers();
  for (const p of r) {
    const m = L.circleMarker([p.la, p.lo], { radius: cafR(), color: '#fff', weight: cafR() < 5 ? 1 : 1.6, fillColor: CAF_COL[cafPri(p)], fillOpacity: .95 });
    m.on('click', () => cafOpen(p.id, true)); m.addTo(CAF_LAYER);
  }
}
function cafR() { const z = CAF_MAP ? CAF_MAP.getZoom() : 13; return z <= 11 ? 3 : z === 12 ? 4 : z === 13 ? 5 : z === 14 ? 6 : 7; }
function cafMeMarker() {
  const l = caf().loc; if (!CAF_MAP || !l) return;
  if (CAF_ME) CAF_ME.remove();
  CAF_ME = L.circleMarker(l, { radius: 8, color: '#fff', weight: 3, fillColor: '#2563EB', fillOpacity: 1 }).addTo(CAF_MAP);
}
function cafLocate() {
  if (!navigator.geolocation) return toast(t('caf_geo_err'));
  navigator.geolocation.getCurrentPosition(pos => {
    caf().loc = [pos.coords.latitude, pos.coords.longitude]; cafMeMarker();
    if (CAF_MAP) CAF_MAP.flyTo(caf().loc, 15, { duration: .6 });
    cafRefresh();
  }, () => toast(t('caf_geo_err')), { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 });
}
function cafSelect(p) {
  if (!CAF_MAP) return;
  if (CAF_SEL) CAF_SEL.remove();
  CAF_SEL = L.circleMarker([p.la, p.lo], { radius: 11, color: '#fff', weight: 3, fillColor: CAF_COL[cafPri(p)], fillOpacity: 1 }).addTo(CAF_MAP);
  CAF_MAP.panTo([p.la, p.lo], { animate: true });
}
function cafOpen(id) {
  const p = (CAF_DATA[cafCity()] || []).find(x => x.id === id); if (!p) return;
  cafSelect(p);
  const col = CAF_COL[cafPri(p)], cu = cafCuis(p), st = ohState(p.h), city = cityName(cafCity());
  const photo = p.im || (p.wc ? `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(p.wc.replace(/^File:/, ''))}?width=900` : '');
  const yq = encodeURIComponent(p.n + ' ' + (CITIES[cafCity()][0]));
  const links = [
    ['Яндекс Карты', `https://yandex.uz/maps/?rtext=~${p.la},${p.lo}&rtt=auto`, '#FC3F1D', 'Я'],
    ['Google Maps', `https://www.google.com/maps/dir/?api=1&destination=${p.la},${p.lo}`, '#1A73E8', 'G'],
    ['2ГИС', `https://2gis.uz/directions/points/%7C${p.lo}%2C${p.la}`, '#29A746', '2'],
  ];
  const row = (k, v, extra = '') => `<div class="cf-row"><span>${esc(k)}</span><div>${v}</div>${extra}</div>`;
  bsheet(`<div class="cf-photo" style="${photo ? `background-image:url('${esc(photo)}')` : `background:linear-gradient(135deg,${col},${col}cc)`}">${photo ? '' : `<span class="cf-ph-ic">${CAF_IC.replace(/\{s\}/g, 44)}</span><span class="cf-ph-t">${esc(t('caf_nophoto'))}</span>`}</div>
    <div class="cf-name">${esc(p.n)}</div>${p.n2 ? `<div class="cf-n2">${esc(p.n2)}</div>` : ''}
    <div class="cf-tags"><span style="background:${col}1a;color:${col}">${esc(cafKind(p))}</span>${p.c.filter(c => c !== 'cafe').slice(0, 3).map(c => `<span>${esc(t('cat_' + c))}</span>`).join('')}${p.dl ? `<span>${esc(t('caf_dl'))}</span>` : ''}${p.hl ? `<span>${esc(t('caf_halal'))}</span>` : ''}</div>
    ${st ? `<div class="cf-open ${st.open ? 'on' : 'off'}">${esc(st.open ? (st.h24 ? t('caf_h24') : st.until != null ? t('caf_until', { t: hm(st.until) }) : t('caf_open')) : t('caf_closed'))}</div>` : ''}
    <div class="h-card cf-info">
      ${p.ad ? row(t('caf_addr'), esc(p.ad + ', ' + city)) : row(t('caf_addr'), esc(city))}
      ${cu ? row(t('caf_cu'), esc(cu)) : ''}
      ${p.h ? row(t('caf_hours'), ohPretty(esc(p.h))) : ''}
      ${p.ph ? row(t('caf_phone'), `<a href="tel:${esc(p.ph.replace(/[^\d+]/g, ''))}">${esc(p.ph)}</a>`) : ''}
      ${p.ig ? row('Instagram', `<a href="https://instagram.com/${esc(p.ig)}" target="_blank" rel="noopener">@${esc(p.ig)}</a>`) : ''}
      ${p.tg ? row('Telegram', `<a href="https://t.me/${esc(p.tg)}" target="_blank" rel="noopener">@${esc(p.tg)}</a>`) : ''}
      ${p.w ? row(t('caf_site'), `<a href="${esc(/^https?:/.test(p.w) ? p.w : 'https://' + p.w)}" target="_blank" rel="noopener">${esc(p.w.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''))}</a>`) : ''}
    </div>
    ${p.ph ? `<a class="h-btn h-ghostd cf-callbtn" href="tel:${esc(p.ph.replace(/[^\d+]/g, ''))}">${esc(t('caf_call'))}</a>` : ''}
    <button class="h-btn h-primary cf-rtbtn" data-act="cfroute:${p.id}">${esc(t('rt_t'))}</button>
    <div class="cf-sec">${esc(t('caf_route'))}</div><div class="cf-sub">${esc(t('caf_route_s'))}</div>
    <div class="cf-routes">${links.map(([n, u, c, l]) => `<a href="${esc(u)}" target="_blank" rel="noopener"><span style="background:${c}">${l}</span>${esc(n)}</a>`).join('')}</div>
    <a class="cf-ya" href="https://yandex.uz/maps/?text=${yq}&ll=${p.lo},${p.la}&z=17" target="_blank" rel="noopener">${esc(t('caf_photos'))} ›</a>
    <div class="h-muted small cam-note">${esc(t('caf_src'))}</div>`, 'bs-caf');
}
function cafCitySheet() {
  const ix = CAF_INDEX ? CAF_INDEX.cities : {};
  const ids = Object.keys(ix).map(Number).sort((a, b) => (a === 0 ? -1 : b === 0 ? 1 : ix[b] - ix[a]));
  bsheet(`<div class="cf-sec" style="margin-top:4px">${esc(t('caf_city_t'))}</div><div class="h-card np">${ids.map(i => `<button class="h-row cam-orow" data-act="cfsetcity:${i}"><span class="h-rt"><b>${esc(cityName(i))}</b><i>${esc(t('caf_n', { n: ix[i] }))}</i></span>${i === cafCity() ? '<span class="cf-chk">✓</span>' : IC.chev}</button>`).join('')}</div>`);
}
Object.assign(XACT, {
  bsclose: () => bsheetClose(),
  newsf: k => { window.__newsF = k; render(current, currentP); },
  cfcat: c => { const s = caf(); s.cat = c; s.more = 0; document.querySelectorAll('#cfChips .h-chip').forEach(b => b.classList.toggle('on', b.dataset.act === 'cfcat:' + c)); cafRefresh(); },
  cfmore: () => { caf().more += 40; const y = document.getElementById('cfList').scrollTop; cafRefresh(); document.getElementById('cfList').scrollTop = y; },
  cfopen: id => cafOpen(id),
  cfcity: () => { (CAF_INDEX ? Promise.resolve() : cafLoad(cafCity())).then(cafCitySheet); },
  cfsetcity: i => { const s = caf(); s.city = +i; s.cat = 'all'; s.q = ''; s.more = 0; window.__cfListY = 0; window.__cfChipX = 0; bsheetClose(true); render(current, currentP); },
});

// ---------------------------------------------------------------- cafes: route + taxi + AI guide
const RT_I = {
  ru: { rt_t: 'Маршрут и такси', rt_car: 'Авто', rt_foot: 'Пешком', rt_taxi: 'Вызвать такси', rt_taxi_s: 'Цена по тарифу Yandex Go без повышающего коэффициента, точная — в приложении', rt_open: 'Открыть маршрут в навигаторе', rt_geo: 'Чтобы построить маршрут, разрешите доступ к местоположению', rt_min: 'мин', rt_h: 'ч', rt_sum: 'сум', rt_start: 'Старт', rt_comfort: 'Комфорт', rt_from: 'от',
    ai_btn: 'Подобрать с ИИ', ai_t: 'ИИ-гид по кафе', ai_hi: 'Расскажите, что хочется — подберу место и построю маршрут. Например: «плов недалеко и чтобы было открыто» или «тихая кофейня с террасой».', ai_tip: 'Подсказать, где поесть? Что хочется?', ai_ph: 'Что хочется? Плов, кальян, кофе…', ai_think: 'Подбираю…', ai_none: 'Под такой запрос ничего не нашлось. Попробуйте сформулировать иначе.', ai_here: 'Вот что подходит:', ai_open: 'Открыть', ai_route: 'Маршрут',
    aq_plov: 'Плов', aq_coffee: 'Кофе', aq_hookah: 'Кальян', aq_grill: 'Шашлык', aq_terrace: 'С террасой', aq_near: 'Открыто рядом' },
  uz: { rt_t: "Yo'nalish va taksi", rt_car: 'Avto', rt_foot: 'Piyoda', rt_taxi: 'Taksi chaqirish', rt_taxi_s: "Yandex Go tarifi bo'yicha narx, oshiruvchi koeffitsientsiz; aniq narx — ilovada", rt_open: "Yo'nalishni navigatorda ochish", rt_geo: "Yo'nalish qurish uchun joylashuvga ruxsat bering", rt_min: 'daq', rt_h: 'soat', rt_sum: "so'm", rt_start: 'Start', rt_comfort: 'Komfort', rt_from: '',
    ai_btn: 'AI bilan tanlash', ai_t: 'Kafe bo‘yicha AI-gid', ai_hi: "Nima xohlayotganingizni yozing — joy topib, yo'nalish quraman. Masalan: «yaqin atrofda palov, hozir ochiq» yoki «terrasali tinch qahvaxona».", ai_tip: 'Qayerda ovqatlanishni maslahat beraymi?', ai_ph: 'Nima xohlaysiz? Palov, qalyan, qahva…', ai_think: 'Tanlayapman…', ai_none: "Bunday so'rov bo'yicha hech narsa topilmadi. Boshqacha yozib ko'ring.", ai_here: 'Mana mos joylar:', ai_open: 'Ochish', ai_route: "Yo'nalish",
    aq_plov: 'Palov', aq_coffee: 'Qahva', aq_hookah: 'Qalyan', aq_grill: 'Shashlik', aq_terrace: 'Terrasali', aq_near: 'Yaqinda ochiq' },
  en: { rt_t: 'Route & taxi', rt_car: 'Car', rt_foot: 'Walk', rt_taxi: 'Call a taxi', rt_taxi_s: 'Yandex Go tariff price without surge; the exact price is in the app', rt_open: 'Open the route in', rt_geo: 'Allow location access to build a route', rt_min: 'min', rt_h: 'h', rt_sum: 'UZS', rt_start: 'Start', rt_comfort: 'Comfort', rt_from: 'from',
    ai_btn: 'Pick with AI', ai_t: 'AI food guide', ai_hi: 'Tell me what you feel like — I’ll pick a place and build a route. For example: “plov nearby, open now” or “a quiet coffee shop with a terrace”.', ai_tip: 'Need a place to eat? What do you feel like?', ai_ph: 'What do you feel like? Plov, hookah, coffee…', ai_think: 'Picking…', ai_none: 'Nothing matches that. Try asking differently.', ai_here: 'Here’s what fits:', ai_open: 'Open', ai_route: 'Route',
    aq_plov: 'Plov', aq_coffee: 'Coffee', aq_hookah: 'Hookah', aq_grill: 'Kebab', aq_terrace: 'Terrace', aq_near: 'Open nearby' },
  zh: { rt_t: '路线与打车', rt_car: '驾车', rt_foot: '步行', rt_taxi: '叫车', rt_taxi_s: '按 Yandex Go 价目估算，不含加价系数；准确价格以应用为准', rt_open: '在导航中打开路线', rt_geo: '请允许定位以规划路线', rt_min: '分钟', rt_h: '小时', rt_sum: '苏姆', rt_start: 'Start', rt_comfort: '舒适', rt_from: '约',
    ai_btn: 'AI 推荐', ai_t: 'AI 美食向导', ai_hi: '告诉我您想吃什么，我来推荐地点并规划路线。例如：“附近的抓饭，现在营业”或“有露台的安静咖啡馆”。', ai_tip: '想找地方吃饭吗？想吃什么？', ai_ph: '想吃什么？抓饭、水烟、咖啡…', ai_think: '正在挑选…', ai_none: '没有找到合适的地点，请换个说法。', ai_here: '为您推荐：', ai_open: '打开', ai_route: '路线',
    aq_plov: '抓饭', aq_coffee: '咖啡', aq_hookah: '水烟', aq_grill: '烧烤', aq_terrace: '露台', aq_near: '附近营业' },
};
for (const l in RT_I) Object.assign(I[l], RT_I[l]);
AI_HIDE.add('h:cafes');
const SPARK_S = s => SPARK(s);
// Yandex Go Tashkent tariff caps (taxi.yandex.uz, valid to 24.11.2026): min fare incl. 1 km + 3 min, then per km / per min
const TAXI = { start: [4600, 1, 3, 1050, 500], comfort: [5400, 1, 3, 1400, 550] };
function taxiPrice(k, km, min) { const [b, ik, im, pk, pm] = TAXI[k]; const v = b + Math.max(0, km - ik) * pk + Math.max(0, min - im) * pm; return Math.round(v / 500) * 500; }
const fmtSum = v => v.toLocaleString('ru-RU').replace(/ /g, ' ');
const fmtDur = s => { const m = Math.max(1, Math.round(s / 60)); return m < 60 ? `${m} ${t('rt_min')}` : `${Math.floor(m / 60)} ${t('rt_h')} ${m % 60} ${t('rt_min')}`; };
const fmtKm = m => (m / 1000).toFixed(m < 10000 ? 1 : 0).replace('.', LANG === 'en' || LANG === 'zh' ? '.' : ',') + (LANG === 'ru' ? ' км' : ' km');
function geo() {
  const l = caf().loc; if (l) return Promise.resolve(l);
  return new Promise((ok, no) => { if (!navigator.geolocation) return no(); navigator.geolocation.getCurrentPosition(p => { caf().loc = [p.coords.latitude, p.coords.longitude]; cafMeMarker(); ok(caf().loc); }, no, { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }); });
}
async function osrm(prof, a, b) {
  const ctl = new AbortController(); const tm = setTimeout(() => ctl.abort(), 9000);
  try {
    const r = await fetch(`https://routing.openstreetmap.de/routed-${prof}/route/v1/driving/${a[1]},${a[0]};${b[1]},${b[0]}?overview=full&geometries=geojson`, { signal: ctl.signal });
    const j = await r.json(); const x = j.routes && j.routes[0]; if (!x) throw 0;
    return { d: x.distance, s: prof === 'car' ? x.duration * 1.35 + 120 : x.duration, g: x.geometry.coordinates.map(c => [c[1], c[0]]) };
  } catch (e) { const k = cafDistRaw(a, b) * (prof === 'car' ? 1.35 : 1.2); return { d: k * 1000, s: prof === 'car' ? k / 24 * 3600 + 120 : k / 4.8 * 3600, g: [a, b], est: 1 }; }
  finally { clearTimeout(tm); }
}
function cafDistRaw(a, b) { const R = 6371, r = Math.PI / 180, dLa = (b[0] - a[0]) * r, dLo = (b[1] - a[1]) * r; const h = Math.sin(dLa / 2) ** 2 + Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.sin(dLo / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(h)); }
let RT = null, RT_LINE = null;
function rtClear() { if (RT_LINE) { RT_LINE.remove(); RT_LINE = null; } const p = document.querySelector('.rt-panel'); if (p) p.remove(); RT = null; }
function navLinks(p, from, mode) {
  const a = from ? `${from[0]},${from[1]}` : '';
  return [
    ['Яндекс Карты', `https://yandex.uz/maps/?rtext=${a}~${p.la},${p.lo}&rtt=${mode === 'foot' ? 'pd' : 'auto'}`, '#FC3F1D', 'Я'],
    ['Google Maps', `https://www.google.com/maps/dir/?api=1${from ? `&origin=${a}` : ''}&destination=${p.la},${p.lo}&travelmode=${mode === 'foot' ? 'walking' : 'driving'}`, '#1A73E8', 'G'],
    ['2ГИС', `https://2gis.uz/directions/points/${from ? `${from[1]}%2C${from[0]}` : ''}%7C${p.lo}%2C${p.la}`, '#29A746', '2'],
  ];
}
function taxiLink(p, from) { return `https://3.redirect.appmetrica.yandex.com/route?${from ? `start-lat=${from[0]}&start-lon=${from[1]}&` : ''}end-lat=${p.la}&end-lon=${p.lo}&ref=myuzcity&appmetrica_tracking_id=1178268795219780156&lang=${LANG}`; }
async function cafRoute(id) {
  const p = (CAF_DATA[cafCity()] || []).find(x => x.id === id); if (!p) return;
  bsheetClose(true);
  let from; try { from = await geo(); } catch (e) { toast(t('rt_geo')); return; }
  rtClear(); cafSelect(p);
  RT = { p, from, mode: 'car', car: null, foot: null, map: CAF_MAP, col: CAF_COL[cafPri(p)], ic: CAF_IC.replace(/\{s\}/g, 16), open: () => cafOpen(p.id), taxi: true };
  rtPanel();
  const [car, foot] = await Promise.all([osrm('car', from, [p.la, p.lo]), osrm('foot', from, [p.la, p.lo])]);
  if (!RT || RT.p !== p) return;
  RT.car = car; RT.foot = foot; rtDraw(); rtPanel();
}
function rtDraw() {
  const M = RT && RT.map; if (!M) return; const r = RT[RT.mode]; if (!r) return;
  if (RT_LINE) RT_LINE.remove();
  RT_LINE = L.polyline(r.g, RT.mode === 'car' ? { color: '#143C20', weight: 5, opacity: .9 } : { color: '#2563EB', weight: 4, dashArray: '2 8', lineCap: 'round' }).addTo(M);
  M.fitBounds(RT_LINE.getBounds(), { padding: [36, 36] });
}
function rtPanel() {
  if (!RT) return; const { p, from, mode, car, foot } = RT;
  const app = document.getElementById('app'); let w = app.querySelector('.rt-panel');
  if (!w) { w = document.createElement('div'); w.className = 'rt-panel'; w.style.zoom = U; app.appendChild(w);
    w.addEventListener('click', e => { const b = e.target.closest('[data-rt]'); if (!b) return; e.preventDefault(); const a = b.dataset.rt; if (a === 'x') rtClear(); else if (a === 'car' || a === 'foot') { RT.mode = a; rtDraw(); rtPanel(); } else if (a === 'open' && RT.open) RT.open(); }); }
  const tab = (k, r) => `<button class="rt-tab ${mode === k ? 'on' : ''}" data-rt="${k}">${k === 'car' ? '🚗' : '🚶'} <b>${r ? fmtDur(r.s) : '…'}</b><i>${r ? (r.est ? '≈ ' : '') + fmtKm(r.d) : t(k === 'car' ? 'rt_car' : 'rt_foot')}</i></button>`;
  const km = car ? car.d / 1000 : null, mn = car ? car.s / 60 : null;
  w.innerHTML = `<div class="rt-head"><button class="rt-name" data-rt="open"><span class="rt-ic" style="background:${RT.col}">${RT.ic}</span><b>${esc(p.n)}</b></button><button class="rt-x" data-rt="x">${IC.close}</button></div>
    <div class="rt-tabs">${tab('car', car)}${tab('foot', foot)}</div>
    ${RT.taxi ? `<div class="rt-taxi"><span class="rt-go">Go</span><span class="rt-tt"><b>${car ? `≈ ${fmtSum(taxiPrice('start', km, mn))} ${t('rt_sum')}` : 'Yandex Go'}</b><i>${car ? `Yandex Go · ${t('rt_start')}; ${t('rt_comfort')} ≈ ${fmtSum(taxiPrice('comfort', km, mn))}` : '…'}</i></span><a class="rt-call" href="${esc(taxiLink(p, from))}" target="_blank" rel="noopener">${esc(t('rt_taxi'))}</a></div>
    <div class="rt-note">${esc(t('rt_taxi_s'))}</div>` : ''}
    <div class="rt-nav">${navLinks(p, from, mode).map(([n, u, c, l]) => `<a href="${esc(u)}" target="_blank" rel="noopener"><span style="background:${c}">${l}</span>${esc(n)}</a>`).join('')}</div>`;
}

// AI guide: rule-based shortlist from the open data, then the assistant picks and explains
const AI_KW = [[/плов|palov|plov|osh\b|抓饭/i, 'plov'], [/кальян|qalyan|hookah|shisha|水烟/i, 'hookah'], [/коф|qahva|coffee|кофейн|咖啡/i, 'coffee'], [/шашлык|кебаб|гриль|мяс|стейк|shashlik|kabob|kebab|grill|steak|烧烤|烤/i, 'grill'],
  [/суши|роллы|азиат|корей|китай|япон|рамен|вок|sushi|asian|korean|chinese|japan|ramen|wok|亚洲|寿司/i, 'asia'], [/пицц|итал|европ|паст|pizza|italian|europe|pasta|西餐|披萨/i, 'europe'], [/бургер|фаст|быстро|перекус|burger|fast|snack|快餐|汉堡/i, 'fast'],
  [/бар|пиво|вино|коктейл|bar|beer|wine|cocktail|酒/i, 'bar'], [/террас|летн|на улице|вид|terrace|outdoor|view|露台/i, 'terrace'], [/национ|узбек|чайхан|milliy|o'zbek|uzbek|national|乌兹别克/i, 'national']];
function aiIntent(q) {
  const cats = AI_KW.filter(([re]) => re.test(q)).map(([, c]) => c);
  return { cats, open: /открыт|сейчас|ochiq|hozir|open|now|营业/i.test(q), near: /рядом|близко|недалеко|поблизост|yaqin|near|close|附近/i.test(q),
    dl: /доставк|yetkaz|deliver|外卖/i.test(q), halal: /халял|halol|halal|清真/i.test(q), words: q.toLowerCase().split(/[^a-zа-яё0-9'ʻ]+/i).filter(w => w.length > 3) };
}
function aiShortlist(q) {
  const it = aiIntent(q), list = CAF_DATA[cafCity()] || [];
  const loc = caf().loc;
  const sc = p => {
    let s = 0; for (const c of it.cats) if (p.c.includes(c)) s += 6;
    const hay = (p.n + ' ' + (p.n2 || '') + ' ' + (p.cu || '') + ' ' + cafCuis(p)).toLowerCase();
    for (const w of it.words) if (hay.includes(w)) s += 3;
    const st = ohState(p.h); if (st && st.open) s += it.open ? 4 : 1.5; else if (st && !st.open && it.open) s -= 20;
    if (it.dl && p.dl) s += 3; if (it.halal && p.hl) s += 3;
    s += (p.ph ? .6 : 0) + (p.h ? .8 : 0) + (p.ad ? .4 : 0) + (p.w || p.ig ? .4 : 0);
    if (loc) s -= cafDistRaw(loc, [p.la, p.lo]) * (it.near ? 1.2 : .35);
    return s;
  };
  const need = it.cats.length || it.words.length;
  return list.map(p => [sc(p), p]).filter(([s, p]) => !it.cats.length || it.cats.some(c => p.c.includes(c)) || s > 6).sort((a, b) => b[0] - a[0]).slice(0, 14).map(x => x[1]).filter(() => need || true);
}
const AIC = () => (window.__aic = window.__aic || { msgs: [], busy: false });
function aiSheetHTML() {
  const S = AIC();
  const chips = ['plov', 'coffee', 'hookah', 'grill', 'terrace', 'near'].map(k => `<button class="cg-q" data-act="aiq:${k}">${esc(t('aq_' + k))}</button>`).join('');
  const msgs = S.msgs.map(m => m.role === 'user' ? `<div class="cg-m me">${esc(m.text)}</div>` : `<div class="cg-m bot">${esc(m.text)}</div>${(m.picks || []).map(([id, why]) => { const p = (CAF_DATA[cafCity()] || []).find(x => x.id === id); if (!p) return ''; const d = caf().loc ? fmtDist(cafDistRaw(caf().loc, [p.la, p.lo])) : '';
      return `<div class="cg-pick"><span class="cf-ic" style="background:${CAF_COL[cafPri(p)]}">${CAF_IC.replace(/\{s\}/g, 18)}</span><div class="cg-pt"><b>${esc(p.n)}</b><i>${esc([cafKind(p), cafCuis(p), d].filter(Boolean).join(' · '))}</i>${ohLabel(p)}${why ? `<p>${esc(why)}</p>` : ''}<div class="cg-pb"><button data-act="cfopen:${p.id}">${esc(t('ai_open'))}</button><button class="pr" data-act="cfroute:${p.id}">${esc(t('ai_route'))}</button></div></div></div>`; }).join('')}`).join('');
  return `<div class="cg-hd"><span class="cg-av">${SPARK_S(18)}</span><b>${esc(t('ai_t'))}</b></div>
    <div class="cg-m bot">${esc(t('ai_hi'))}</div><div class="cg-qs">${chips}</div>${msgs}${S.busy ? `<div class="cg-m bot typing">${esc(t('ai_think'))}</div>` : ''}
    <form class="cg-in" onsubmit="return false"><input id="aiCafQ" placeholder="${esc(t('ai_ph'))}" autocomplete="off" enterkeyhint="send"><button type="submit" data-act="aisend" aria-label="send"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></form>`;
}
function aiSheet() {
  const w = document.querySelector('.bs-wrap.bs-ai');
  if (w) { const b = w.querySelector('.bs-body'); const keep = b.querySelector('#aiCafQ') ? b.querySelector('#aiCafQ').value : ''; b.innerHTML = aiSheetHTML(); b.querySelector('#aiCafQ').value = keep; b.scrollTop = b.scrollHeight; aiBind(w); return; }
  const n = bsheet(aiSheetHTML(), 'bs-ai'); aiBind(n);
}
function aiBind(w) { const i = w.querySelector('#aiCafQ'); if (!i || i._b) return; i._b = 1; i.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); cgAsk(i.value); } }); }
async function cgAsk(q) {
  q = String(q || '').trim(); const S = AIC(); if (!q || S.busy) return;
  S.msgs.push({ role: 'user', text: q }); S.busy = true; aiSheet();
  const inp = document.getElementById('aiCafQ'); if (inp) inp.value = '';
  const it = aiIntent(q);
  if ((it.near || /рядом|near|yaqin/i.test(q)) && !caf().loc) { try { await geo(); } catch (e) {} }
  await cafLoad(cafCity());
  const list = aiShortlist(q);
  let text = '', picks = [];
  if (list.length) {
    const loc = caf().loc, now = new Date();
    const lines = list.map(p => { const st = ohState(p.h); return `${p.id} | ${p.n} | ${cafKind(p)} | ${cafCuis(p) || '—'} | ${st ? (st.open ? 'открыто' + (st.until != null ? ' до ' + hm(st.until) : '') : 'закрыто') : 'часы неизвестны'} | ${loc ? fmtDist(cafDistRaw(loc, [p.la, p.lo])) : '—'}`; }).join('\n');
    const lang = { ru: 'русском', uz: 'узбекском (латиница)', en: 'английском', zh: 'китайском' }[LANG];
    const prompt = `Ты — гид по кафе в приложении MyUzCity. Пользователь просит: «${q}». Город: ${CITIES[cafCity()][0]}. Сейчас ${hm(now.getHours() * 60 + now.getMinutes())}.\nПодходящие заведения из открытых данных (id | название | тип | кухня | часы | расстояние):\n${lines}\nВыбери до 3 лучших под запрос. Ответь на ${lang} языке. Формат строго:\nпервая строка — короткий ответ (до 15 слов);\nзатем по строке на заведение: ID | почему подходит (до 12 слов).\nНе придумывай заведения, цены, рейтинги и факты, которых нет в списке.`;
    try {
      const ctl = new AbortController(); const tm = setTimeout(() => ctl.abort(), 20000);
      const j = await aiFetch({ messages: [{ role: 'user', content: prompt }], lang: LANG, mode: 'raw' }, ctl.signal);
      clearTimeout(tm);
      const rep = String(j.reply || '').replace(/\[\[[^\]]*\]\]/g, '').trim();
      const ids = new Set(list.map(p => p.id));
      for (const raw of rep.split('\n')) {
        const ln = raw.replace(/[*_`]/g, '').trim(); if (!ln) continue;
        const id = (ln.match(/\b([nwr]\d{3,})\b/) || [])[1];
        if (id && ids.has(id)) { if (picks.length < 3 && !picks.some(x => x[0] === id)) picks.push([id, ln.slice(ln.indexOf(id) + id.length).replace(/^\s*[|:—–-]\s*/, '').trim()]); }
        else if (!picks.length && !text) text = ln.replace(/^\d+[.)]\s*/, '');
      }
    } catch (e) {}
    if (!picks.length) picks = list.slice(0, 3).map(p => [p.id, '']);
    if (!text) text = t('ai_here');
  } else text = t('ai_none');
  S.busy = false; S.msgs.push({ role: 'bot', text, picks }); aiSheet();
  if (CAF_MAP && picks.length) { const pts = picks.map(([id]) => (CAF_DATA[cafCity()] || []).find(x => x.id === id)).filter(Boolean).map(p => [p.la, p.lo]); if (pts.length) CAF_MAP.fitBounds(pts, { padding: [50, 50], maxZoom: 15 }); }
}
function aiTip(el) {
  try { if (sessionStorage.getItem('cf-ai-tip')) return; sessionStorage.setItem('cf-ai-tip', '1'); } catch (e) {}
  setTimeout(() => {
    if (current !== 'h:cafes' || document.querySelector('.bs-wrap')) return;
    const app = document.getElementById('app');
    const b = document.createElement('div'); b.className = 'cg-tip'; b.style.zoom = U; b.style.top = (CAF_MAP_TOP + cafMapH() - 128) + 'px';
    b.innerHTML = `<span class="cg-av">${SPARK_S(16)}</span><div><b>${esc(t('ai_tip'))}</b><div class="cg-tq">${['plov', 'coffee', 'hookah', 'near'].map(k => `<button data-tq="${k}">${esc(t('aq_' + k))}</button>`).join('')}</div></div><button class="cg-tx" data-tq="x">${IC.close}</button>`;
    app.appendChild(b); requestAnimationFrame(() => b.classList.add('on'));
    const kill = () => { b.classList.remove('on'); setTimeout(() => b.remove(), 250); };
    b.addEventListener('click', e => { const x = e.target.closest('[data-tq]'); if (!x) return; e.preventDefault(); kill(); if (x.dataset.tq !== 'x') XACT.aiq(x.dataset.tq); });
    setTimeout(kill, 12000);
  }, 1400);
}
Object.assign(XACT, {
  cfroute: id => cafRoute(id),
  aiopen: () => aiSheet(),
  aiq: k => { aiSheet(); cgAsk(t('aq_' + k) + (k === 'near' ? '' : (LANG === 'ru' ? ' рядом' : ''))); },
  aisend: () => { const i = document.getElementById('aiCafQ'); if (i) cgAsk(i.value); },
});

// ======================= City maps: parking, mosques, medicine (OpenStreetMap) =======================
const PO_I = {
  ru: { pk_t: 'Парковки', mq_t: 'Мечети', md_t: 'Медицина рядом', po_q_parking: 'Улица или название парковки', po_q_mosque: 'Название мечети или улица', po_q_med: 'Аптека, клиника, больница…',
    po_n: 'Найдено: {n}', po_load: 'Загружаем карту…', po_err: 'Не удалось загрузить данные. Проверьте интернет.', po_none: 'Ничего не нашлось — попробуйте другой фильтр', po_src: 'Данные — OpenStreetMap, обновляются еженедельно', po_soon: 'По этому городу данные скоро появятся — показываем Ташкент', po_open_map: 'Открыть карту', po_near: 'рядом', po_all_m: 'Все ›',
    pkc_paid: 'Платные', pkc_free: 'Бесплатные', pkc_m: 'Многоуровневые', pkc_u: 'Подземные', pkc_s: 'Вдоль улиц',
    pkk_g: 'Парковка', pkk_m: 'Многоуровневый паркинг', pkk_u: 'Подземный паркинг', pkk_s: 'Парковка вдоль улицы', pk_paid: 'Платная', pk_free: 'Бесплатная', pk_cap: 'Мест', pk_op: 'Оператор', pk_cust: 'Для клиентов', pk_dis: 'Места для людей с инвалидностью', pk_type: 'Тип',
    pk_pay: 'Как оплатить парковку', pk_pay_s: '5 000–12 000 сум/час · Poytaxt Parking, Payme, Click',
    pk_h: 'Как оплатить парковку', pk_h_s: 'Платные придорожные парковки Ташкента',
    pk_s1: 'Найдите знак «P» и номер зоны', pk_s1d: 'Платные места вдоль улиц отмечены знаками «P». На табличке — номер зоны и тариф. Первые 5 минут бесплатно.',
    pk_s2: 'Оплатите в Poytaxt Parking', pk_s2d: 'Введите госномер и номер зоны (или отсканируйте QR на табличке), выберите время. Карты Uzcard, Humo, Visa, Mastercard.',
    pk_s3: 'Или через Payme, Click, Uzum Bank, Paynet', pk_s3d: 'В разделе «Парковка» / Poytaxt Parking введите госномер и зону. Наличными — в терминалах Paynet.',
    pk_app: 'Скачать Poytaxt Parking', pk_tar: 'Тарифы и правила', pk_t1: 'Стоимость', pk_t1v: '5 000–12 000 сум в час, зависит от улицы; у сквера Амира Темура — 12 000',
    pk_t2: 'Штраф за неоплату', pk_t2v: '2 БРВ — 880 000 сум', pk_t3: 'Бесплатно', pk_t3v: 'Первые 5 минут; в праздники 31 декабря – 4 января',
    pk_t4: 'Жителям улиц', pk_t4v: 'Резидентское разрешение: ночью (20:00–8:00) бесплатно, днём — 1 БРВ в год, до 2 авто на семью', pk_res: 'Оформить разрешение на my.gov.uz', pk_sup: 'Поддержка Poytaxt Parking',
    pk_note: 'Тарифы могут меняться — точная цена для зоны показана в приложении Poytaxt Parking.',
    mqc_hist: 'Исторические', mq_kind: 'Мечеть', mq_hist: 'Памятник истории', mq_pt: 'Время намаза', mq_today: '{c}, сегодня', mq_next: 'Следующий — {p} в {t}', mq_in: 'через {d}', mq_calc: 'Время рассчитано по координатам города (±2 мин) по методике Управления мусульман Узбекистана.', mq_wiki: 'Статья в Википедии', mq_near: 'Мечети рядом', mq_open: 'Время намаза и карта',
    pr_0: 'Фаджр', pr_1: 'Восход', pr_2: 'Зухр', pr_3: 'Аср', pr_4: 'Магриб', pr_5: 'Иша',
    mdc_pharmacy: 'Аптеки', mdc_hospital: 'Больницы', mdc_clinic: 'Клиники', mdc_dentist: 'Стоматологии', mdc_lab: 'Анализы', mdc_h24: 'Круглосуточно',
    mdk_pharmacy: 'Аптека', mdk_hospital: 'Больница', mdk_clinic: 'Клиника', mdk_dentist: 'Стоматология', mdk_lab: 'Лаборатория', md_em: 'Приёмное отделение', md_sp: 'Направления', md_103: 'Скорая', md_112: 'Экстренная',
    md_near: 'Рядом с вами', md_n: '{n} на карте', md_open_of: 'открыто {o} из {n}', pk_pay_l: 'Как оплатить',
    bd_t: 'Новостройки', po_q_build: 'ЖК, застройщик или улица', bdc_c: 'Строятся', bdc_r: 'Жилые комплексы', bdc_hi: 'Высотки 12+', bdc_o: 'Бизнес-центры', bdk_c: 'Строится', bdk_r: 'Жилой комплекс', bdk_o: 'Коммерческая недвижимость', bd_lv_n: '{n} этажей', bd_dv: 'Застройщик', bd_lv: 'Этажей', bd_sd: 'Начало стройки', bd_ed: 'Сдача', bd_olx: 'Квартиры в продаже на OLX', bd_note: 'Данные OpenStreetMap: отмечены не все новостройки. Перед покупкой проверяйте документы застройщика.', bd_map: 'Новостройки на карте' },
  uz: { pk_t: 'Avtoturargohlar', mq_t: 'Masjidlar', md_t: 'Yaqin atrofdagi tibbiyot', po_q_parking: "Ko'cha yoki avtoturargoh nomi", po_q_mosque: "Masjid nomi yoki ko'cha", po_q_med: 'Dorixona, klinika, shifoxona…',
    po_n: 'Topildi: {n}', po_load: 'Xarita yuklanmoqda…', po_err: "Ma'lumotlarni yuklab bo'lmadi. Internetni tekshiring.", po_none: "Hech narsa topilmadi — boshqa filtrni sinab ko'ring", po_src: "Ma'lumotlar — OpenStreetMap, har hafta yangilanadi", po_soon: "Bu shahar bo'yicha ma'lumotlar tez orada — Toshkentni ko'rsatamiz", po_open_map: 'Xaritani ochish', po_near: 'yaqinda', po_all_m: 'Barchasi ›',
    pkc_paid: 'Pullik', pkc_free: 'Bepul', pkc_m: "Ko'p qavatli", pkc_u: 'Yer osti', pkc_s: "Ko'cha bo'yi",
    pkk_g: 'Avtoturargoh', pkk_m: "Ko'p qavatli avtoturargoh", pkk_u: 'Yer osti avtoturargohi', pkk_s: "Ko'cha bo'yidagi avtoturargoh", pk_paid: 'Pullik', pk_free: 'Bepul', pk_cap: "Joylar", pk_op: 'Operator', pk_cust: 'Mijozlar uchun', pk_dis: "Nogironligi bo'lganlar uchun joylar", pk_type: 'Turi',
    pk_pay: "Avtoturargoh uchun qanday to'lash", pk_pay_s: "Soatiga 5 000–12 000 so'm · Poytaxt Parking, Payme, Click",
    pk_h: "Avtoturargoh uchun qanday to'lash", pk_h_s: "Toshkentdagi pullik yo'l bo'yi avtoturargohlari",
    pk_s1: '«P» belgisi va zona raqamini toping', pk_s1d: "Pullik joylar «P» belgilari bilan belgilangan. Lavhada zona raqami va tarif bor. Dastlabki 5 daqiqa bepul.",
    pk_s2: "Poytaxt Parking'da to'lang", pk_s2d: "Davlat raqami va zona raqamini kiriting (yoki lavhadagi QR-kodni skanerlang), vaqtni tanlang. Uzcard, Humo, Visa, Mastercard.",
    pk_s3: 'Yoki Payme, Click, Uzum Bank, Paynet orqali', pk_s3d: "«Avtoturargoh» / Poytaxt Parking bo'limida davlat raqami va zonani kiriting. Naqd — Paynet terminallarida.",
    pk_app: 'Poytaxt Parking yuklab olish', pk_tar: 'Tariflar va qoidalar', pk_t1: 'Narxi', pk_t1v: "Soatiga 5 000–12 000 so'm, ko'chaga bog'liq; Amir Temur xiyoboni yonida — 12 000",
    pk_t2: "To'lamaganlik uchun jarima", pk_t2v: "2 BHM — 880 000 so'm", pk_t3: 'Bepul', pk_t3v: 'Dastlabki 5 daqiqa; bayramlarda 31-dekabr – 4-yanvar',
    pk_t4: 'Ko‘cha aholisi uchun', pk_t4v: 'Rezident ruxsatnomasi: kechasi (20:00–8:00) bepul, kunduzi — yiliga 1 BHM, oilaga 2 tagacha avto', pk_res: 'my.gov.uz orqali ruxsatnoma olish', pk_sup: "Poytaxt Parking qo'llab-quvvatlash",
    pk_note: "Tariflar o'zgarishi mumkin — zona uchun aniq narx Poytaxt Parking ilovasida.",
    mqc_hist: 'Tarixiy', mq_kind: 'Masjid', mq_hist: 'Tarixiy yodgorlik', mq_pt: 'Namoz vaqtlari', mq_today: '{c}, bugun', mq_next: 'Keyingisi — {p}, {t} da', mq_in: '{d} dan keyin', mq_calc: "Vaqt shahar koordinatalari bo'yicha hisoblangan (±2 daq), O'zbekiston musulmonlari idorasi uslubida.", mq_wiki: 'Vikipediyadagi maqola', mq_near: 'Yaqin masjidlar', mq_open: 'Namoz vaqtlari va xarita',
    pr_0: 'Bomdod', pr_1: 'Quyosh', pr_2: 'Peshin', pr_3: 'Asr', pr_4: 'Shom', pr_5: 'Xufton',
    mdc_pharmacy: 'Dorixonalar', mdc_hospital: 'Shifoxonalar', mdc_clinic: 'Klinikalar', mdc_dentist: 'Stomatologiya', mdc_lab: 'Tahlillar', mdc_h24: 'Kecha-kunduz',
    mdk_pharmacy: 'Dorixona', mdk_hospital: 'Shifoxona', mdk_clinic: 'Klinika', mdk_dentist: 'Stomatologiya', mdk_lab: 'Laboratoriya', md_em: "Qabul bo'limi", md_sp: "Yo'nalishlar", md_103: 'Tez yordam', md_112: 'Favqulodda',
    md_near: 'Yaqin atrofda', md_n: 'xaritada {n} ta', md_open_of: '{n} tadan {o} tasi ochiq', pk_pay_l: "Qanday to'lash",
    bd_t: 'Yangi uylar', po_q_build: "TJM, quruvchi yoki ko'cha", bdc_c: 'Qurilmoqda', bdc_r: 'Turar joy majmualari', bdc_hi: 'Baland 12+', bdc_o: 'Biznes markazlar', bdk_c: 'Qurilmoqda', bdk_r: 'Turar joy majmuasi', bdk_o: 'Tijorat ko‘chmas mulki', bd_lv_n: '{n} qavat', bd_dv: 'Quruvchi', bd_lv: 'Qavatlar', bd_sd: 'Qurilish boshlangan', bd_ed: 'Topshirish', bd_olx: 'OLX’da sotuvdagi kvartiralar', bd_note: "OpenStreetMap ma'lumotlari: barcha yangi uylar belgilanmagan. Sotib olishdan oldin quruvchi hujjatlarini tekshiring.", bd_map: 'Yangi uylar xaritada' },
  en: { pk_t: 'Parking', mq_t: 'Mosques', md_t: 'Medical care nearby', po_q_parking: 'Street or parking name', po_q_mosque: 'Mosque name or street', po_q_med: 'Pharmacy, clinic, hospital…',
    po_n: 'Found: {n}', po_load: 'Loading the map…', po_err: 'Could not load the data. Check your connection.', po_none: 'Nothing found — try another filter', po_src: 'Data — OpenStreetMap, updated weekly', po_soon: 'Data for this city is coming soon — showing Tashkent', po_open_map: 'Open map', po_near: 'nearby', po_all_m: 'All ›',
    pkc_paid: 'Paid', pkc_free: 'Free', pkc_m: 'Multi-storey', pkc_u: 'Underground', pkc_s: 'Street-side',
    pkk_g: 'Parking', pkk_m: 'Multi-storey car park', pkk_u: 'Underground car park', pkk_s: 'Street-side parking', pk_paid: 'Paid', pk_free: 'Free', pk_cap: 'Spaces', pk_op: 'Operator', pk_cust: 'Customers only', pk_dis: 'Accessible spaces', pk_type: 'Type',
    pk_pay: 'How to pay for parking', pk_pay_s: '5,000–12,000 sum/hour · Poytaxt Parking, Payme, Click',
    pk_h: 'How to pay for parking', pk_h_s: 'Paid street parking in Tashkent',
    pk_s1: 'Find the “P” sign and the zone number', pk_s1d: 'Paid street spaces are marked with “P” signs. The plate shows the zone number and the rate. The first 5 minutes are free.',
    pk_s2: 'Pay in Poytaxt Parking', pk_s2d: 'Enter your plate and the zone number (or scan the QR on the sign) and choose the time. Uzcard, Humo, Visa, Mastercard.',
    pk_s3: 'Or via Payme, Click, Uzum Bank, Paynet', pk_s3d: 'In the “Parking” / Poytaxt Parking section enter the plate and zone. Cash — at Paynet terminals.',
    pk_app: 'Get Poytaxt Parking', pk_tar: 'Rates and rules', pk_t1: 'Price', pk_t1v: '5,000–12,000 sum per hour depending on the street; at Amir Temur Square — 12,000',
    pk_t2: 'Fine for not paying', pk_t2v: '2 BCA — 880,000 sum', pk_t3: 'Free', pk_t3v: 'The first 5 minutes; holidays 31 December – 4 January',
    pk_t4: 'Residents', pk_t4v: 'Resident permit: free at night (20:00–8:00), daytime — 1 BCA a year, up to 2 cars per household', pk_res: 'Apply for a permit on my.gov.uz', pk_sup: 'Poytaxt Parking support',
    pk_note: 'Rates may change — the exact price for a zone is shown in the Poytaxt Parking app.',
    mqc_hist: 'Historic', mq_kind: 'Mosque', mq_hist: 'Historic monument', mq_pt: 'Prayer times', mq_today: '{c}, today', mq_next: 'Next — {p} at {t}', mq_in: 'in {d}', mq_calc: 'Calculated for the city’s coordinates (±2 min) using the Muslim Board of Uzbekistan method.', mq_wiki: 'Wikipedia article', mq_near: 'Mosques nearby', mq_open: 'Prayer times and map',
    pr_0: 'Fajr', pr_1: 'Sunrise', pr_2: 'Dhuhr', pr_3: 'Asr', pr_4: 'Maghrib', pr_5: 'Isha',
    mdc_pharmacy: 'Pharmacies', mdc_hospital: 'Hospitals', mdc_clinic: 'Clinics', mdc_dentist: 'Dentists', mdc_lab: 'Labs', mdc_h24: 'Open 24/7',
    mdk_pharmacy: 'Pharmacy', mdk_hospital: 'Hospital', mdk_clinic: 'Clinic', mdk_dentist: 'Dentist', mdk_lab: 'Laboratory', md_em: 'Emergency department', md_sp: 'Specialities', md_103: 'Ambulance', md_112: 'Emergency',
    md_near: 'Near you', md_n: '{n} on the map', md_open_of: '{o} of {n} open', pk_pay_l: 'How to pay',
    bd_t: 'New buildings', po_q_build: 'Complex, developer or street', bdc_c: 'Under construction', bdc_r: 'Residential complexes', bdc_hi: 'High-rise 12+', bdc_o: 'Business centres', bdk_c: 'Under construction', bdk_r: 'Residential complex', bdk_o: 'Commercial property', bd_lv_n: '{n} floors', bd_dv: 'Developer', bd_lv: 'Floors', bd_sd: 'Construction start', bd_ed: 'Completion', bd_olx: 'Flats for sale on OLX', bd_note: 'OpenStreetMap data: not every new building is mapped. Check the developer’s documents before buying.', bd_map: 'New buildings map' },
  zh: { pk_t: '停车场', mq_t: '清真寺', md_t: '附近医疗', po_q_parking: '街道或停车场名称', po_q_mosque: '清真寺名称或街道', po_q_med: '药店、诊所、医院…',
    po_n: '找到：{n}', po_load: '正在加载地图…', po_err: '无法加载数据，请检查网络。', po_none: '未找到，请换个筛选条件', po_src: '数据来自 OpenStreetMap，每周更新', po_soon: '该城市数据即将上线 — 现显示塔什干', po_open_map: '打开地图', po_near: '附近', po_all_m: '全部 ›',
    pkc_paid: '收费', pkc_free: '免费', pkc_m: '立体停车楼', pkc_u: '地下停车场', pkc_s: '路边',
    pkk_g: '停车场', pkk_m: '立体停车楼', pkk_u: '地下停车场', pkk_s: '路边停车', pk_paid: '收费', pk_free: '免费', pk_cap: '车位', pk_op: '运营方', pk_cust: '仅限顾客', pk_dis: '无障碍车位', pk_type: '类型',
    pk_pay: '如何支付停车费', pk_pay_s: '每小时 5 000–12 000 苏姆 · Poytaxt Parking、Payme、Click',
    pk_h: '如何支付停车费', pk_h_s: '塔什干路边收费停车',
    pk_s1: '找到“P”标志和区域编号', pk_s1d: '路边收费车位有“P”标志，牌上写有区域编号和价格。前 5 分钟免费。',
    pk_s2: '在 Poytaxt Parking 中支付', pk_s2d: '输入车牌和区域编号（或扫描牌上的二维码），选择时长。支持 Uzcard、Humo、Visa、Mastercard。',
    pk_s3: '或通过 Payme、Click、Uzum Bank、Paynet', pk_s3d: '在“停车”/Poytaxt Parking 栏目输入车牌和区域。现金可在 Paynet 终端支付。',
    pk_app: '下载 Poytaxt Parking', pk_tar: '价格与规则', pk_t1: '价格', pk_t1v: '每小时 5 000–12 000 苏姆，视街道而定；帖木儿广场附近 12 000',
    pk_t2: '未付费罚款', pk_t2v: '2 个基本计算单位 — 880 000 苏姆', pk_t3: '免费', pk_t3v: '前 5 分钟；节假日 12 月 31 日至 1 月 4 日',
    pk_t4: '本街居民', pk_t4v: '居民许可：夜间（20:00–8:00）免费，白天每年 1 个基本计算单位，每户最多 2 辆车', pk_res: '在 my.gov.uz 申请许可', pk_sup: 'Poytaxt Parking 客服',
    pk_note: '价格可能变动 — 各区域准确价格以 Poytaxt Parking 应用为准。',
    mqc_hist: '历史古迹', mq_kind: '清真寺', mq_hist: '历史古迹', mq_pt: '礼拜时间', mq_today: '{c}，今天', mq_next: '下一次 — {p} {t}', mq_in: '{d}后', mq_calc: '按城市坐标计算（±2 分钟），采用乌兹别克斯坦穆斯林管理局的方法。', mq_wiki: '维基百科条目', mq_near: '附近清真寺', mq_open: '礼拜时间和地图',
    pr_0: '晨礼', pr_1: '日出', pr_2: '晌礼', pr_3: '晡礼', pr_4: '昏礼', pr_5: '宵礼',
    mdc_pharmacy: '药店', mdc_hospital: '医院', mdc_clinic: '诊所', mdc_dentist: '牙科', mdc_lab: '化验', mdc_h24: '24 小时',
    mdk_pharmacy: '药店', mdk_hospital: '医院', mdk_clinic: '诊所', mdk_dentist: '牙科', mdk_lab: '化验室', md_em: '急诊', md_sp: '科室', md_103: '急救', md_112: '紧急',
    md_near: '您附近', md_n: '地图上 {n} 处', md_open_of: '{n} 处中 {o} 处营业', pk_pay_l: '如何支付',
    bd_t: '新楼盘', po_q_build: '楼盘、开发商或街道', bdc_c: '在建', bdc_r: '住宅小区', bdc_hi: '12 层以上', bdc_o: '商务中心', bdk_c: '在建', bdk_r: '住宅小区', bdk_o: '商业地产', bd_lv_n: '{n} 层', bd_dv: '开发商', bd_lv: '层数', bd_sd: '开工', bd_ed: '交付', bd_olx: 'OLX 在售房源', bd_note: 'OpenStreetMap 数据：并非所有新楼盘都已标注。购房前请核实开发商文件。', bd_map: '新楼盘地图' },
};
for (const l in PO_I) Object.assign(I[l], PO_I[l]);

// ---- prayer times (calibrated against the official Tashkent timetable: Fajr/Isha 15.5°, Hanafi Asr, Dhuhr +1, Maghrib +4)
function prayTimes(lat, lon, d = new Date(Date.now() + 5 * 3600e3)) {
  const tz = 5, rad = Math.PI / 180;
  const jd = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) / 864e5 + 2440587.5;
  const D = jd + 0.5 - tz / 24 - 2451545;
  const g = ((357.529 + 0.98560028 * D) % 360) * rad, q = (280.459 + 0.98564736 * D) % 360;
  const Ls = ((q + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)) % 360) * rad, e = (23.439 - 0.00000036 * D) * rad;
  const RA = Math.atan2(Math.cos(e) * Math.sin(Ls), Math.cos(Ls)) / rad / 15;
  const dec = Math.asin(Math.sin(e) * Math.sin(Ls));
  let eq = q / 15 - (((RA % 24) + 24) % 24); if (eq > 12) eq -= 24; if (eq < -12) eq += 24;
  const noon = 12 + tz - lon / 15 - eq, phi = lat * rad;
  const ha = a => Math.acos(Math.max(-1, Math.min(1, (-Math.sin(a * rad) - Math.sin(phi) * Math.sin(dec)) / (Math.cos(phi) * Math.cos(dec))))) / rad / 15;
  const asrA = -Math.atan(1 / (2 + Math.tan(Math.abs(phi - dec)))) / rad;
  return [noon - ha(15.5), noon - ha(0.833), noon + 1 / 60, noon + ha(asrA), noon + ha(0.833) + 4 / 60, noon + ha(15.5)].map(h => Math.round(h * 60));
}
function prayNow(ci = cityIdx()) {
  const c = CITIES[ci] || CITIES[0], tm = prayTimes(c[5], c[6]);
  const n = new Date(Date.now() + 5 * 3600e3), now = n.getUTCHours() * 60 + n.getUTCMinutes();
  let next = tm.findIndex(m => m > now); const tomorrow = next < 0; if (tomorrow) next = 0;
  const left = (tomorrow ? tm[0] + 1440 : tm[next]) - now;
  return { tm, next, left, now };
}
const fmtLeft = m => m < 60 ? `${m} ${t('rt_min')}` : `${Math.floor(m / 60)} ${t('rt_h')} ${m % 60} ${t('rt_min')}`;

// ---- data
const PO_COL = { pharmacy: '#16A34A', hospital: '#DC2626', clinic: '#2563EB', dentist: '#0891B2', lab: '#7C3AED' };
const PO_SVG = {
  parking: '<path d="M9 18V6h4.5a3.5 3.5 0 0 1 0 7H9" stroke-width="2.4"/>',
  mosque: '<path d="M12 3.5c-.6 1.7-3.5 2.6-3.5 5.5h7c0-2.9-2.9-3.8-3.5-5.5Z"/><path d="M5 20.5V12h14v8.5M3 20.5h18M10 20.5v-3.2a2 2 0 0 1 4 0v3.2"/>',
  pharmacy: '<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>',
  hospital: '<path d="M12 6v12M6 12h12" stroke-width="2.8"/>', clinic: '<path d="M12 6v12M6 12h12" stroke-width="2.8"/>',
  dentist: '<path d="M7.5 3.5c-2.2 0-4 1.6-4 4.3 0 1.9 1 3.3 1.4 5.2.5 2 .6 4.9 1.6 6.8.5 1 1.5 1 1.9 0 .6-1.6.6-4.1 2.1-5 .7-.4 1.3-.4 2 0 1.5.9 1.5 3.4 2.1 5 .4 1 1.4 1 1.9 0 1-1.9 1.1-4.8 1.6-6.8.4-1.9 1.4-3.3 1.4-5.2 0-2.7-1.8-4.3-4-4.3-2 0-2.8 1-4.5 1s-2.5-1-4.5-1Z"/>',
  lab: '<path d="M9 3h6M10 3v6.5L4.6 18.8A1.5 1.5 0 0 0 5.9 21h12.2a1.5 1.5 0 0 0 1.3-2.2L14 9.5V3"/><path d="M7 15h10"/>',
  build: '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2M10 6h4M10 10h4M10 14h4M10 18h4"/>',
};
const poIc = (k, s) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${PO_SVG[k] || PO_SVG.clinic}</svg>`;
const PO_K = {
  parking: {
    title: 'pk_t', cats: ['paid', 'free', 'm', 'u', 's'], extraH: 70, foot: false,
    has: (p, c) => c === 'paid' ? p.f === 1 : c === 'free' ? p.f === 0 : p.k === c,
    col: p => p.k === 'm' || p.k === 'u' ? '#7C3AED' : p.f === 1 ? '#1D4ED8' : p.f === 0 ? '#15803D' : '#64748B',
    ic: () => 'parking', name: p => p.n || t('pkk_' + p.k),
    sub: p => [p.n ? t('pkk_' + p.k) : '', p.f === 1 ? t('pk_paid') : p.f === 0 ? t('pk_free') : '', p.c ? `${p.c} ${t('pk_cap').toLowerCase()}` : ''].filter(Boolean).join(' · '),
    cat: p => p.f === 1 ? 'pkc_paid' : p.f === 0 ? 'pkc_free' : '',
  },
  mosque: {
    title: 'mq_t', cats: ['hist'], extraH: 76, foot: true,
    has: (p, c) => c === 'hist' ? p.hi : false,
    col: p => p.hi ? '#B45309' : '#0F766E', ic: () => 'mosque', name: p => p.n || t('mq_kind'),
    sub: p => [p.hi ? t('mq_hist') : t('mq_kind'), p.n2 || ''].filter(Boolean).join(' · '),
  },
  med: {
    title: 'md_t', cats: ['open', 'h24', 'pharmacy', 'hospital', 'clinic', 'dentist', 'lab'], extraH: 62, foot: true,
    has: (p, c) => c === 'open' ? (ohState(p.h) || {}).open : c === 'h24' ? poH24(p) : p.a === c,
    col: p => PO_COL[p.a] || '#2563EB', ic: p => p.a, name: p => p.n || t('mdk_' + p.a),
    sub: p => [t('mdk_' + p.a), p.em ? t('md_em') : ''].filter(Boolean).join(' · '),
  },
};
PO_K.build = {
  title: 'bd_t', cats: ['c', 'r', 'hi', 'o'], extraH: 0, foot: false,
  has: (p, c) => c === 'hi' ? p.lv >= 12 : c === 'o' ? p.k === 'o' : p.s === c,
  col: p => p.k === 'o' ? '#7C3AED' : p.s === 'c' ? '#D97706' : '#2563EB', ic: () => 'build', name: p => p.n || t('bdk_' + p.s),
  sub: p => [t(p.k === 'o' ? 'bdk_o' : 'bdk_' + p.s), p.lv ? t('bd_lv_n', { n: p.lv }) : '', p.dv || ''].filter(Boolean).join(' · '),
};
const poH24 = p => p.h === '24/7' || !!(ohState(p.h) || {}).h24;
let PO_INDEX = null; const PO_DATA = { parking: {}, mosque: {}, med: {}, build: {} };
function poIndex() { return PO_INDEX ? Promise.resolve(PO_INDEX) : fetch(DATA_BASE + 'data/poi/index.json', { cache: 'no-cache' }).then(r => r.json()).then(j => (PO_INDEX = j)); }
function poLoad(k, ci) {
  if (PO_DATA[k][ci]) return Promise.resolve(PO_DATA[k][ci]);
  return poIndex().then(ix => (ix.n[k] || {})[ci] ? fetch(`${DATA_BASE}data/poi/${k}/${ci}.json`).then(r => r.json()) : []).then(l => (PO_DATA[k][ci] = l));
}
const po = k => { window.__po = window.__po || {}; return (window.__po[k] = window.__po[k] || { city: null, cat: 'all', q: '', more: 0, big: false }); };
function poCity(k) { const s = po(k); if (s.city == null) { const c = cityIdx(); s.city = PO_INDEX && !(PO_INDEX.n[k] || {})[c] ? 0 : c; } return s.city; }
function poDist(p) { const l = caf().loc; return l ? cafDistRaw(l, [p.la, p.lo]) : null; }
function poFiltered(k) {
  const s = po(k), K = PO_K[k], list = PO_DATA[k][poCity(k)] || [], q = s.q.trim().toLowerCase();
  let r = list.filter(p => (s.cat === 'all' || K.has(p, s.cat)) && (!q || [K.name(p), p.n2, p.ad, p.op, p.sp].join(' ').toLowerCase().includes(q)));
  const score = p => (p.n ? 3 : 0) + (p.ph ? 1 : 0) + (p.h ? 1 : 0) + (p.ad ? 1 : 0) + (p.hi ? 2 : 0) + (p.c ? Math.min(2, p.c / 100) : 0) + (p.em ? 2 : 0);
  return caf().loc ? r.map(p => [poDist(p), p]).sort((a, b) => a[0] - b[0]).map(x => x[1]) : r.slice().sort((a, b) => score(b) - score(a));
}
function poItem(k, p) {
  const K = PO_K[k], d = fmtDist(poDist(p));
  return `<button class="cf-item" data-act="poopen:${k}:${p.id}"><span class="cf-ic" style="background:${K.col(p)}">${poIc(K.ic(p), 18)}</span>
    <span class="cf-it"><b>${esc(K.name(p))}</b><i>${esc(K.sub(p))}</i>${p.ad ? `<i>${esc(p.ad)}</i>` : ''}${p.h ? ohLabel(p) : ''}</span>${d ? `<span class="cf-dist">${esc(d)}</span>` : ''}</button>`;
}
function prayStrip(ci, cls = '') {
  const P = prayNow(ci);
  return `<div class="pr-strip ${cls}">${P.tm.map((m, i) => `<div class="${i === P.next ? 'on' : ''}"><i>${esc(t('pr_' + i))}</i><b>${hm(m)}</b></div>`).join('')}</div>`;
}
function poExtra(k, ci) {
  if (k === 'parking') return `<button class="po-x pk" data-act="pkpay"><span class="po-xi"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#B45309" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg></span><span class="po-xt"><b>${esc(t('pk_pay'))}</b><i>${esc(t('pk_pay_s'))}</i></span>${IC.chev}</button>`;
  if (k === 'mosque') return `<div class="po-x mq">${prayStrip(ci)}</div>`;
  if (k !== 'med') return '';
  return `<div class="po-x md"><a href="tel:103" class="md-sos"><b>103</b><span>${esc(t('md_103'))}</span></a><a href="tel:112" class="md-sos"><b>112</b><span>${esc(t('md_112'))}</span></a></div>`;
}
const PO_MAP_TOP = 236;
function poMapH(k) { const top = PO_MAP_TOP + PO_K[k].extraH; return po(k).big ? Math.max(260, VH - top) : Math.min(300, Math.max(200, Math.round(VH * .33))); }
HS.poi = (arg) => {
  const [k0, c0] = String(arg || 'parking').split(':'); const k = PO_K[k0] ? k0 : 'parking', s = po(k), K = PO_K[k];
  if (c0 && (c0 === 'all' || K.cats.includes(c0))) { s.cat = c0; s.more = 0; if (window.__poChipX) delete window.__poChipX[k]; }
  window.__poK = k; currentP = k;
  const ci = poCity(k), list = PO_DATA[k][ci];
  const counts = {}; if (list) for (const c of K.cats) counts[c] = list.filter(p => K.has(p, c)).length;
  const chips = ['all', ...K.cats].filter(c => !list || c === 'all' || counts[c]).map(c => {
    const lab = c === 'all' ? t('cat_all') : t((typeof P2_PREFIX !== 'undefined' && P2_PREFIX[k] ? P2_PREFIX[k] : k === 'parking' ? 'pkc_' : k === 'mosque' ? 'mqc_' : k === 'build' ? 'bdc_' : c === 'open' ? 'cat_' : 'mdc_') + c);
    const col = typeof P2_CHIPCOL !== 'undefined' && P2_CHIPCOL[k] ? P2_CHIPCOL[k][c] || '' : k === 'med' && PO_COL[c] ? PO_COL[c] : k === 'parking' ? { paid: '#1D4ED8', free: '#15803D', m: '#7C3AED', u: '#7C3AED' }[c] : k === 'mosque' && c === 'hist' ? '#B45309' : k === 'build' ? { c: '#D97706', r: '#2563EB', o: '#7C3AED' }[c] || '' : '';
    return `<button class="h-chip ${s.cat === c ? 'on' : ''}" data-act="pocat:${k}:${c}">${col ? `<span class="cf-dot" style="background:${col}"></span>` : ''}${esc(lab)}${list ? ` <i>${c === 'all' ? list.length : counts[c]}</i>` : ''}</button>`;
  }).join('');
  return `<div class="h-hdr"><button class="h-back" data-act="back">${IC.back}</button><div class="h-title">${esc(t(K.title))}</div><button class="cf-city" data-act="pocity:${k}">${esc(cityName(ci))}<svg viewBox="0 0 20 20" width="16" height="16">${CHEV_DOWN}</svg></button></div>
    <div class="cf-bar"><label class="cf-search"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="poQ" type="search" enterkeyhint="search" autocomplete="off" placeholder="${esc(t('po_q_' + k))}" value="${esc(s.q)}"></label></div>
    <div class="cf-chips hs" id="poChips">${chips}</div>
    ${poExtra(k, ci)}
    <div class="cf-mapph" style="height:${poMapH(k)}px"></div>
    <div class="h-body cf-body" id="poList">${list ? '' : `<div class="cf-empty">${esc(t('po_load'))}</div>`}</div>`;
};
let PO_MAP = null, PO_LAYER = null, PO_SEL = null, PO_ME = null;
function tiles(m) { L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>' }).addTo(m); m.attributionControl.setPrefix(false); return m; }
HS.poi.mount = (el) => {
  const k = window.__poK, s = po(k);
  const chips = el.querySelector('#poChips'); const cx = (window.__poChipX || {})[k]; if (cx) chips.scrollLeft = cx; else { const on = chips.querySelector('.on'); if (on && on.offsetLeft > 200) chips.scrollLeft = on.offsetLeft - 24; }
  chips.addEventListener('scroll', () => { (window.__poChipX = window.__poChipX || {})[k] = chips.scrollLeft; }, { passive: true });
  const q = el.querySelector('#poQ'); let tm;
  q.addEventListener('input', () => { clearTimeout(tm); tm = setTimeout(() => { s.q = q.value; s.more = 0; poRefresh(k); }, 220); });
  q.addEventListener('keydown', e => { if (e.key === 'Enter') q.blur(); });
  const app = document.getElementById('app'), ph = el.querySelector('.cf-mapph');
  const ar = app.getBoundingClientRect(), pr = ph.getBoundingClientRect();
  const mw = document.createElement('div'); mw.className = 'cf-map';
  mw.style.top = (pr.top - ar.top) + 'px'; mw.style.height = pr.height + 'px'; mw.style.width = P(430);
  mw.innerHTML = `<div id="cfMap"></div><div class="cf-mbtns" style="zoom:${U}"><button data-cf="me" aria-label="${esc(t('caf_me'))}"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#143C20" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3.2" fill="#143C20"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><circle cx="12" cy="12" r="7"/></svg></button><button data-cf="big" aria-label="${esc(t(s.big ? 'caf_small' : 'caf_big'))}"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#143C20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${s.big ? '<path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7"/>' : '<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>'}</svg></button></div>`;
  app.appendChild(mw);
  mw.addEventListener('click', e => { const b = e.target.closest('[data-cf]'); if (!b) return; e.preventDefault(); e.stopPropagation(); if (b.dataset.cf === 'big') { s.big = !s.big; render(current, currentP); } else poLocate(k); });
  const list = el.querySelector('#poList');
  list.addEventListener('scroll', () => { (window.__poListY = window.__poListY || {})[k] = list.scrollTop; }, { passive: true });
  if (k === 'mosque') { clearInterval(window.__prT); window.__prT = setInterval(() => { const x = el.querySelector('.po-x.mq'); if (!document.body.contains(el)) return clearInterval(window.__prT); if (x) x.innerHTML = prayStrip(poCity(k)); }, 30000); }
  Promise.all([leafletReady(), poIndex()]).then(() => poLoad(k, poCity(k))).then(() => {
    if (!document.body.contains(mw)) return;
    const ci = poCity(k);
    if (!(PO_INDEX.n[k] || {})[ci] && ci !== 0) { s.city = 0; toast(t('po_soon')); return render(current, currentP); }
    if (!el.querySelector('.cf-chips .h-chip i')) return render(current, currentP);
    PO_SEL = null; PO_ME = null;
    const c = CITIES[ci]; const v = (window.__poView || {})[k]; const vv = v && v.city === ci ? v : null;
    PO_MAP = tiles(L.map(mw.querySelector('#cfMap'), { zoomControl: false, attributionControl: true, preferCanvas: true }).setView(vv ? vv.c : [c[5], c[6]], vv ? vv.z : (ci === 0 ? 12 : 13)));
    PO_MAP.on('moveend', () => { (window.__poView = window.__poView || {})[k] = { city: ci, c: PO_MAP.getCenter(), z: PO_MAP.getZoom() }; });
    PO_LAYER = L.layerGroup().addTo(PO_MAP);
    PO_MAP.on('zoomend', () => { const r = poR(); PO_LAYER.eachLayer(m => m.setStyle({ radius: r, weight: r < 5 ? 1 : 1.6 })); });
    if (caf().loc) poMe();
    poRefresh(k, true);
    RT = null; RT_LINE = null;
    if (window.__poOpen) { const id = window.__poOpen; window.__poOpen = null; poOpen(k, id); }
  }).catch(() => { list.innerHTML = `<div class="cf-empty">${esc(t('po_err'))}</div>`; });
};
function poR() { const z = PO_MAP ? PO_MAP.getZoom() : 13; return z <= 11 ? 3.5 : z === 12 ? 4.5 : z === 13 ? 5.5 : z === 14 ? 6.5 : 7.5; }
function poRefresh(k, keep) {
  const r = poFiltered(k), s = po(k), list = document.getElementById('poList'); if (!list) return;
  const shown = r.slice(0, 40 + s.more);
  list.innerHTML = `<div class="cf-count">${esc(t('po_n', { n: r.length }))}</div>${shown.map(p => poItem(k, p)).join('') || `<div class="cf-empty">${esc(t('po_none'))}</div>`}
    ${r.length > shown.length ? btn(t('caf_more'), 'pomore:' + k, 'ghostd') : ''}<div class="h-muted small cam-note">${esc(t('po_src'))}</div>`;
  const y = (window.__poListY || {})[k]; list.scrollTop = keep && y ? y : 0;
  if (!PO_LAYER || !window.L) return;
  PO_LAYER.clearLayers(); const K = PO_K[k];
  for (const p of r) { const m = L.circleMarker([p.la, p.lo], { radius: poR(), color: '#fff', weight: poR() < 5 ? 1 : 1.6, fillColor: K.col(p), fillOpacity: .95 }); m.on('click', () => poOpen(k, p.id)); m.addTo(PO_LAYER); }
}
function poMe() { const l = caf().loc; if (!PO_MAP || !l) return; if (PO_ME) PO_ME.remove(); PO_ME = L.circleMarker(l, { radius: 8, color: '#fff', weight: 3, fillColor: '#2563EB', fillOpacity: 1 }).addTo(PO_MAP); }
function poLocate(k) {
  if (!navigator.geolocation) return toast(t('caf_geo_err'));
  navigator.geolocation.getCurrentPosition(pos => {
    caf().loc = [pos.coords.latitude, pos.coords.longitude]; poMe();
    if (PO_MAP) PO_MAP.flyTo(caf().loc, 15, { duration: .6 });
    poRefresh(k);
  }, () => toast(t('caf_geo_err')), { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 });
}
function poSelect(k, p) {
  if (!PO_MAP) return; if (PO_SEL) PO_SEL.remove();
  PO_SEL = L.circleMarker([p.la, p.lo], { radius: 11, color: '#fff', weight: 3, fillColor: PO_K[k].col(p), fillOpacity: 1 }).addTo(PO_MAP);
  PO_MAP.panTo([p.la, p.lo], { animate: true });
}
function poFind(k, id) { return (PO_DATA[k][poCity(k)] || []).find(x => x.id === id); }
function poOpen(k, id) {
  const p = poFind(k, id); if (!p) return; const K = PO_K[k]; poSelect(k, p);
  const col = K.col(p), city = cityName(poCity(k)), st = p.h ? ohState(p.h) : null;
  const photo = p.im || (p.wc ? `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(p.wc.replace(/^File:/, ''))}?width=900` : '');
  const row = (a, v) => `<div class="cf-row"><span>${esc(a)}</span><div>${v}</div></div>`;
  const tel = p.ph ? p.ph.replace(/[^\d+]/g, '') : '';
  const tags = typeof P2_PREFIX !== 'undefined' && P2_PREFIX[k] ? [K.sub(p).split(' · ')[0], p.f === 0 && k === 'ev' ? t('evc_free') : ''] : k === 'build' ? [t('bdk_' + p.s), p.k === 'o' ? t('bdk_o') : '', p.lv ? t('bd_lv_n', { n: p.lv }) : ''] : k === 'parking' ? [t('pkk_' + p.k), p.f === 1 ? t('pk_paid') : p.f === 0 ? t('pk_free') : '', p.cu ? t('pk_cust') : ''] : k === 'mosque' ? [t('mq_kind'), p.hi ? t('mq_hist') : ''] : [t('mdk_' + p.a), p.em ? t('md_em') : '', poH24(p) ? t('mdc_h24') : ''];
  const wp = p.wp ? p.wp.match(/^([a-z-]+):(.+)$/) : null;
  bsheet(`<div class="cf-photo${photo ? '' : ' po-ph'}" style="${photo ? `background-image:url('${esc(photo)}')` : `background:linear-gradient(135deg,${col},${col}c4)`}">${photo ? '' : `<span class="cf-ph-ic">${poIc(K.ic(p), 46)}</span>`}</div>
    <div class="cf-name">${esc(K.name(p))}</div>${p.n2 ? `<div class="cf-n2">${esc(p.n2)}</div>` : ''}
    <div class="cf-tags">${tags.filter(Boolean).map((x, i) => `<span${i ? '' : ` style="background:${col}1a;color:${col}"`}>${esc(x)}</span>`).join('')}</div>
    ${st ? `<div class="cf-open ${st.open ? 'on' : 'off'}">${esc(st.open ? (st.h24 ? t('caf_h24') : st.until != null ? t('caf_until', { t: hm(st.until) }) : t('caf_open')) : t('caf_closed'))}</div>` : ''}
    ${k === 'mosque' ? `<div class="cf-sec">${esc(t('mq_pt'))}</div>${prayStrip(poCity(k), 'in')}` : ''}
    <div class="h-card cf-info">
      ${row(t('caf_addr'), esc(p.ad ? p.ad + ', ' + city : city))}
      ${k === 'parking' && p.c ? row(t('pk_cap'), esc(String(p.c)) + (p.ds ? ` · ${esc(t('pk_dis'))}` : '')) : ''}
      ${k === 'parking' && p.op ? row(t('pk_op'), esc(p.op)) : ''}
      ${k === 'ev' && p.so ? row(t('ev_so'), esc(p.so.replace(/_/g, ' ').replace(/,/g, ', '))) : ''}
      ${k === 'ev' && p.kw ? row(t('ev_kw'), esc(p.kw)) : ''}
      ${k === 'ev' && p.c ? row(t('ev_cap'), esc(String(p.c))) : ''}
      ${(k === 'ev' || k === 'edu') && p.op ? row(t('pk_op'), esc(p.op)) : ''}
      ${k === 'speedcam' && p.ms ? row(t('sc_ms'), esc(p.ms + ' км/ч')) : ''}
      ${k === 'sight' ? '<div id="sgW"></div>' : ''}
      ${k === 'build' && p.dv ? row(t('bd_dv'), esc(p.dv)) : ''}
      ${k === 'build' && p.lv ? row(t('bd_lv'), esc(String(p.lv))) : ''}
      ${k === 'build' && p.sd ? row(t('bd_sd'), esc(p.sd)) : ''}
      ${k === 'build' && p.ed ? row(t('bd_ed'), esc(p.ed)) : ''}
      ${k === 'med' && p.sp ? row(t('md_sp'), esc(p.sp.split(';').map(x => x.replace(/_/g, ' ')).join(', '))) : ''}
      ${p.h ? row(t('caf_hours'), ohPretty(esc(p.h))) : ''}
      ${p.ph ? row(t('caf_phone'), `<a href="tel:${esc(tel)}">${esc(p.ph)}</a>`) : ''}
      ${p.w ? row(t('caf_site'), `<a href="${esc(/^https?:/.test(p.w) ? p.w : 'https://' + p.w)}" target="_blank" rel="noopener">${esc(p.w.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''))}</a>`) : ''}
      ${wp && k !== 'sight' ? row('Wikipedia', `<a href="https://${esc(wp[1])}.wikipedia.org/wiki/${esc(encodeURIComponent(wp[2]))}" target="_blank" rel="noopener">${esc(t('mq_wiki'))}</a>`) : ''}
    </div>
    ${tel ? `<a class="h-btn h-ghostd cf-callbtn" href="tel:${esc(tel)}">${esc(t('caf_call'))}</a>` : ''}
    ${k === 'parking' ? `<button class="h-btn h-ghostd cf-rtbtn" data-act="pkpay">${esc(t('pk_pay'))}</button>` : ''}
    ${k === 'build' && p.n ? `<a class="h-btn h-ghostd cf-callbtn cf-rtbtn" href="https://www.olx.uz/list/q-${esc(encodeURIComponent(p.n.replace(/[«»"]/g, '')))}/" target="_blank" rel="noopener">${esc(t('bd_olx'))}</a>` : ''}
    <button class="h-btn h-primary cf-rtbtn" data-act="poroute:${k}:${p.id}">${esc(t(k === 'parking' ? 'route' : 'rt_t'))}</button>
    <div class="cf-sec">${esc(t('caf_route'))}</div><div class="cf-sub">${esc(t('caf_route_s'))}</div>
    <div class="cf-routes">${navLinks(p, null, 'car').map(([n, u, c, l]) => `<a href="${esc(u)}" target="_blank" rel="noopener"><span style="background:${c}">${l}</span>${esc(n)}</a>`).join('')}</div>
    ${k === 'sight' ? `<button class="h-btn h-ghostd cf-rtbtn" data-act="sgai:${p.id}">✨ ${esc(t('sg_ai'))}</button>` : ''}
    ${k === 'build' || k === 'mosque' || k === 'sight' || k === 'gov' ? `<a class="cf-ya" href="https://yandex.uz/maps/?text=${esc(encodeURIComponent(K.name(p) + ' ' + CITIES[poCity(k)][0]))}&ll=${p.lo},${p.la}&z=16" target="_blank" rel="noopener">${esc(t('caf_photos'))} ›</a>` : ''}
    <div class="h-muted small cam-note">${esc(t(k === 'build' ? 'bd_note' : 'po_src'))}</div>`, 'bs-caf');
  if (k === 'sight' && p.wp) sgWiki(p).then(w => {
    const box = document.getElementById('sgW'); if (!w || !box) return;
    if (w.extract) box.innerHTML = `<div class="cf-row"><span>Wikipedia</span><div>${esc(w.extract.slice(0, 600))}${w.extract.length > 600 ? '…' : ''}<br><a href="${esc((w.content_urls && w.content_urls.mobile && w.content_urls.mobile.page) || '#')}" target="_blank" rel="noopener">${esc(t('sg_wiki'))} ›</a></div></div>`;
    const ph = document.querySelector('.bs-caf .cf-photo.po-ph'); const img = w.originalimage || w.thumbnail;
    if (ph && img && img.source) { ph.classList.remove('po-ph'); ph.style.background = ''; ph.style.backgroundImage = `url('${img.source.replace(/'/g, '')}')`; ph.innerHTML = ''; }
  });
}
async function poRoute(k, id) {
  const p = poFind(k, id); if (!p) return; const K = PO_K[k];
  bsheetClose(true);
  let from; try { from = await geo(); } catch (e) { toast(t('rt_geo')); return; }
  rtClear(); poSelect(k, p);
  const near = cafDistRaw(from, [p.la, p.lo]) < 1.3;
  RT = { p: Object.assign({}, p, { n: K.name(p) }), from, mode: K.foot && near ? 'foot' : 'car', car: null, foot: null, map: PO_MAP, col: K.col(p), ic: poIc(K.ic(p), 16), open: () => poOpen(k, id), taxi: k !== 'parking' };
  rtPanel();
  const [car, foot] = await Promise.all([osrm('car', from, [p.la, p.lo]), osrm('foot', from, [p.la, p.lo])]);
  if (!RT || RT.p.id !== p.id) return;
  RT.car = car; RT.foot = foot; rtDraw(); rtPanel();
}
function pkPay() {
  const ios = /iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const app = ios ? 'https://apps.apple.com/uz/app/poytaxt-parking/id6448937713' : 'https://play.google.com/store/search?q=Poytaxt%20Parking&c=apps';
  const step = (n, a, b) => `<div class="pk-step"><span>${n}</span><div><b>${esc(t(a))}</b><p>${esc(t(b))}</p></div></div>`;
  const row = (a, b) => `<div class="cf-row"><span>${esc(t(a))}</span><div>${esc(t(b))}</div></div>`;
  bsheet(`<div class="pk-hero"><span>P</span><div><b>${esc(t('pk_h'))}</b><i>${esc(t('pk_h_s'))}</i></div></div>
    ${step(1, 'pk_s1', 'pk_s1d')}${step(2, 'pk_s2', 'pk_s2d')}${step(3, 'pk_s3', 'pk_s3d')}
    <a class="h-btn h-primary cf-callbtn" href="${esc(app)}" target="_blank" rel="noopener">${esc(t('pk_app'))}</a>
    <div class="cf-sec">${esc(t('pk_tar'))}</div>
    <div class="h-card cf-info">${row('pk_t1', 'pk_t1v')}${row('pk_t3', 'pk_t3v')}${row('pk_t2', 'pk_t2v')}${row('pk_t4', 'pk_t4v')}</div>
    <a class="h-btn h-ghostd cf-callbtn" style="margin-top:12px" href="https://oldmy.gov.uz/${LANG === 'uz' ? 'uz' : LANG === 'en' ? 'en' : 'ru'}/service/1286" target="_blank" rel="noopener">${esc(t('pk_res'))}</a>
    <a class="cf-ya" href="tel:+998781136700">${esc(t('pk_sup'))}: +998 78 113 67 00</a>
    <div class="h-muted small cam-note">${esc(t('pk_note'))}</div>`, 'bs-caf');
}
function poCitySheet(k) {
  const ix = (PO_INDEX && PO_INDEX.n[k]) || {};
  const ids = Object.keys(ix).map(Number).sort((a, b) => (a === 0 ? -1 : b === 0 ? 1 : ix[b] - ix[a]));
  bsheet(`<div class="cf-sec" style="margin-top:4px">${esc(t('caf_city_t'))}</div><div class="h-card np">${ids.map(i => `<button class="h-row cam-orow" data-act="posetcity:${k}:${i}"><span class="h-rt"><b>${esc(cityName(i))}</b><i>${esc(t('po_n', { n: ix[i] }))}</i></span>${i === poCity(k) ? '<span class="cf-chk">✓</span>' : IC.chev}</button>`).join('')}</div>`);
}
Object.assign(XACT, {
  pocat: a => { const [k, c] = a.split(':'); const s = po(k); s.cat = s.cat === c && c !== 'all' ? 'all' : c; s.more = 0; rtClear(); render(current, k); },
  pomore: k => { po(k).more += 60; poRefresh(k, true); },
  poopen: a => { const [k, id] = a.split(':'); poOpen(k, id); },
  poroute: a => { const [k, id] = a.split(':'); poRoute(k, id); },
  pocity: k => poIndex().then(() => poCitySheet(k)),
  posetcity: a => { const [k, i] = a.split(':'); bsheetClose(true); const s = po(k); s.city = +i; s.more = 0; rtClear(); if (window.__poView) delete window.__poView[k]; render(current, k); },
  pkpay: () => { bsheetClose(true); setTimeout(pkPay, 30); },
});
AI_HIDE.add('h:poi');

// ---- live overlays on the designed screens: parking, mosques (prayer times), health, mahalla
function miniMap(layer, box, k, onOpen) {
  const [x, y, w, h] = box;
  const d = document.createElement('div'); d.className = 'mini-map';
  d.style.left = P(x); d.style.top = P(y); d.style.width = P(w); d.style.height = P(h); d.style.borderRadius = P(20);
  d.innerHTML = `<div class="mm-in"></div><button class="mm-btn" style="zoom:${U}"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#143C20" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11 21 3l-8 18-2-8z"/></svg>${esc(t('po_open_map'))}</button>`;
  layer.appendChild(d);
  d.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); onOpen(); });
  Promise.all([leafletReady(), poIndex()]).then(() => poLoad(k, poCity(k))).then(list => {
    if (!document.body.contains(d)) return;
    const c = CITIES[poCity(k)];
    const m = tiles(L.map(d.querySelector('.mm-in'), { zoomControl: false, attributionControl: true, dragging: false, touchZoom: false, scrollWheelZoom: false, doubleClickZoom: false, boxZoom: false, keyboard: false, tap: false, preferCanvas: true }).setView([c[5], c[6]], poCity(k) === 0 ? 12 : 13));
    const K = PO_K[k];
    for (const p of list) L.circleMarker([p.la, p.lo], { radius: 3.5, color: '#fff', weight: 1, fillColor: K.col(p), fillOpacity: .95, interactive: false }).addTo(m);
  }).catch(() => {});
  return d;
}
function hoverlay(layer, x, y, w, h, html, cls = '') {
  const d = document.createElement('div'); d.className = 'hov ' + cls;
  d.style.left = P(x); d.style.top = P(y); d.style.width = P(w); if (h) d.style.height = P(h);
  d.innerHTML = `<div class="hov-z" style="zoom:${U};width:${w}px">${html}</div>`; layer.appendChild(d); return d;
}
function drawParking(layers) {
  const r = layers.r; if (!r) return;
  miniMap(r, [24, 652, 382, 349.5], 'parking', () => go('h:poi', 'parking'));
  const a = hoverlay(r, 236, 606, 170, 32, `<button class="hov-link">${esc(t('pk_pay_l'))} ›</button>`);
  a.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); pkPay(); });
}
function drawMosques(layers) {
  const r = layers.r; if (!r) return;
  const ci = cityIdx(), P0 = prayNow(ci);
  [[95, 300], [211, 300], [327, 300], [95, 426], [211, 426], [327, 426]].forEach(([cx, y], i) =>
    hoverlay(r, cx - 52, y, 104, 24, `<div class="pr-t${i === P0.next ? ' on' : ''}">${hm(P0.tm[i])}</div>`));
  hoverlay(r, 24, 482, 382, 22, `<div class="pr-next">${esc(t('mq_next', { p: t('pr_' + P0.next), t: hm(P0.tm[P0.next]) }))} · ${esc(t('mq_in', { d: fmtLeft(P0.left) }))}</div>`);
  miniMap(r, [24, 512, 382, 261], 'mosque', () => go('h:poi', 'mosque'));
}
const HEALTH_Y = 716, MAH_Y = 918;
function drawHealth(layers) {
  const r = layers.r; if (!r) return;
  const tiles4 = ['pharmacy', 'hospital', 'clinic', 'dentist'];
  const w = hoverlay(r, 24, HEALTH_Y, 382, 284, `<div class="hv-h">${esc(t('md_near'))}</div>
    <div class="hv-grid">${tiles4.map(c => `<button data-md="${c}"><span class="hv-ic" style="background:${PO_COL[c]}">${poIc(c, 22)}</span><b>${esc(t('mdc_' + c))}</b><i data-mdn="${c}">${esc(t('po_load'))}</i></button>`).join('')}</div>
    <div class="hv-sos"><a href="tel:103"><b>103</b>${esc(t('md_103'))}</a><a href="tel:112"><b>112</b>${esc(t('md_112'))}</a></div>`);
  w.addEventListener('click', e => { const b = e.target.closest('[data-md]'); if (!b) return; e.preventDefault(); e.stopPropagation(); go('h:poi', 'med:' + b.dataset.md); });
  poIndex().then(() => poLoad('med', poCity('med'))).then(list => {
    for (const c of tiles4) { const n = list.filter(p => p.a === c), o = n.filter(p => (ohState(p.h) || {}).open).length; const e = w.querySelector(`[data-mdn="${c}"]`); if (e) e.textContent = n.length ? (o ? t('md_open_of', { o, n: n.length }) : t('md_n', { n: n.length })) : '—'; }
  }).catch(() => {});
}
function drawMahalla(layers) {
  const r = layers.r; if (!r) return;
  const ci = cityIdx(), P0 = prayNow(ci);
  const w = hoverlay(r, 24, MAH_Y, 382, 360, `<div class="hv-h">${esc(t('mq_near'))}<button data-mq="map">${esc(t('po_all_m'))}</button></div>
    <div class="hv-card"><button class="hv-pr" data-mq="pt"><span class="hv-ic" style="background:#0F766E">${poIc('mosque', 22)}</span><span><b>${esc(t('mq_next', { p: t('pr_' + P0.next), t: hm(P0.tm[P0.next]) }))}</b><i>${esc(t('mq_in', { d: fmtLeft(P0.left) }))} · ${esc(cityName(ci))}</i></span>${IC.chev}</button>
    <div class="hv-list">${[0, 1, 2].map(() => '<div class="hv-sk"></div>').join('')}</div>
    <button class="hv-btn" data-mq="pt">${esc(t('mq_open'))}</button></div>`);
  w.addEventListener('click', e => { const b = e.target.closest('[data-mq],[data-mid]'); if (!b) return; e.preventDefault(); e.stopPropagation(); if (b.dataset.mid) { window.__poOpen = b.dataset.mid; go('h:poi', 'mosque'); } else if (b.dataset.mq === 'map') go('h:poi', 'mosque'); else go('1:3529'); });
  const draw = list => {
    const l = caf().loc, c = CITIES[poCity('mosque')]; const from = l || [c[5], c[6]];
    const near = list.filter(p => p.n).map(p => [cafDistRaw(from, [p.la, p.lo]), p]).sort((a, b) => a[0] - b[0]).slice(0, 3);
    const box = w.querySelector('.hv-list'); if (!box) return;
    box.innerHTML = near.map(([d, p]) => `<button class="hv-mq" data-mid="${p.id}"><span class="hv-dot" style="background:${PO_K.mosque.col(p)}"></span><span><b>${esc(p.n)}</b><i>${esc([p.ad, l ? fmtDist(d) : ''].filter(Boolean).join(' · ') || t(p.hi ? 'mq_hist' : 'mq_kind'))}</i></span>${IC.chev}</button>`).join('') || `<div class="cf-empty">${esc(t('po_none'))}</div>`;
  };
  poIndex().then(() => poLoad('mosque', poCity('mosque'))).then(draw).catch(() => {});
}

// ======================= Public transport: Tashkent metro + buses (OpenStreetMap) =======================
const TR_I = {
  ru: { tr_t: 'Метро и автобусы', tr_metro: 'Метро', tr_bus: 'Автобусы', tr_q_metro: 'Станция метро', tr_q_bus: 'Номер маршрута или остановка', tr_st: '{n} станций', tr_stops: '{n} остановок',
    tr_live: 'Где автобус сейчас', tr_live_s: 'Движение автобусов в реальном времени — в Яндекс Картах и 2ГИС', tr_ya: 'Яндекс Карты', tr_2gis: '2ГИС', tr_routes: 'Маршруты', tr_near: 'Остановки рядом', tr_pop: 'Крупные остановки',
    tr_found_r: 'Маршруты: {n}', tr_found_s: 'Остановки: {n}', tr_b: 'Автобус', tr_tb: 'Троллейбус', tr_mb: 'Маршрутка', tr_tr: 'Трамвай', tr_line: 'Линия', tr_transfer: 'Пересадка', tr_walk: 'Как дойти', tr_map_ya: 'Схема метро в Яндексе',
    tr_route_stops: 'Остановки маршрута', tr_reset: 'Показать все', tr_only_tash: 'Схема метро и маршруты пока есть только для Ташкента', tr_src: 'Данные о маршрутах — OpenStreetMap; время прибытия — в Яндекс Картах и 2ГИС',
    tr_sec: 'Метро и автобусы', tr_m_s: 'Схема, станции, пересадки', tr_b_s: 'Остановки и маршруты', tr_arr: 'Прибытие на остановку' },
  uz: { tr_t: 'Metro va avtobuslar', tr_metro: 'Metro', tr_bus: 'Avtobuslar', tr_q_metro: 'Metro bekati', tr_q_bus: "Yo'nalish raqami yoki bekat", tr_st: '{n} ta bekat', tr_stops: '{n} ta bekat',
    tr_live: 'Avtobus hozir qayerda', tr_live_s: "Avtobuslar harakati real vaqtda — Yandex Xaritalar va 2GIS'da", tr_ya: 'Yandex Xaritalar', tr_2gis: '2GIS', tr_routes: "Yo'nalishlar", tr_near: 'Yaqin bekatlar', tr_pop: 'Yirik bekatlar',
    tr_found_r: "Yo'nalishlar: {n}", tr_found_s: 'Bekatlar: {n}', tr_b: 'Avtobus', tr_tb: 'Trolleybus', tr_mb: 'Marshrutka', tr_tr: 'Tramvay', tr_line: 'Liniya', tr_transfer: "O'tish", tr_walk: 'Qanday borish', tr_map_ya: 'Yandex metro sxemasi',
    tr_route_stops: "Yo'nalish bekatlari", tr_reset: "Hammasini ko'rsatish", tr_only_tash: "Metro sxemasi va yo'nalishlar hozircha faqat Toshkent uchun", tr_src: "Yo'nalishlar — OpenStreetMap; kelish vaqti — Yandex Xaritalar va 2GIS'da",
    tr_sec: 'Metro va avtobuslar', tr_m_s: "Sxema, bekatlar, o'tishlar", tr_b_s: "Bekatlar va yo'nalishlar", tr_arr: 'Bekatga kelishi' },
  en: { tr_t: 'Metro & buses', tr_metro: 'Metro', tr_bus: 'Buses', tr_q_metro: 'Metro station', tr_q_bus: 'Route number or stop', tr_st: '{n} stations', tr_stops: '{n} stops',
    tr_live: 'Where is my bus', tr_live_s: 'Live bus positions — in Yandex Maps and 2GIS', tr_ya: 'Yandex Maps', tr_2gis: '2GIS', tr_routes: 'Routes', tr_near: 'Stops nearby', tr_pop: 'Major stops',
    tr_found_r: 'Routes: {n}', tr_found_s: 'Stops: {n}', tr_b: 'Bus', tr_tb: 'Trolleybus', tr_mb: 'Minibus', tr_tr: 'Tram', tr_line: 'Line', tr_transfer: 'Transfer', tr_walk: 'Walk there', tr_map_ya: 'Metro map in Yandex',
    tr_route_stops: 'Route stops', tr_reset: 'Show all', tr_only_tash: 'The metro map and routes are available for Tashkent only for now', tr_src: 'Routes — OpenStreetMap; arrival times — in Yandex Maps and 2GIS',
    tr_sec: 'Metro & buses', tr_m_s: 'Map, stations, transfers', tr_b_s: 'Stops and routes', tr_arr: 'Arrivals at the stop' },
  zh: { tr_t: '地铁与公交', tr_metro: '地铁', tr_bus: '公交', tr_q_metro: '地铁站', tr_q_bus: '线路号或车站', tr_st: '{n} 个站', tr_stops: '{n} 个站',
    tr_live: '公交实时位置', tr_live_s: '在 Yandex 地图和 2GIS 中查看公交实时位置', tr_ya: 'Yandex 地图', tr_2gis: '2GIS', tr_routes: '线路', tr_near: '附近车站', tr_pop: '主要车站',
    tr_found_r: '线路：{n}', tr_found_s: '车站：{n}', tr_b: '公交车', tr_tb: '无轨电车', tr_mb: '小巴', tr_tr: '有轨电车', tr_line: '线路', tr_transfer: '换乘', tr_walk: '步行前往', tr_map_ya: 'Yandex 地铁图',
    tr_route_stops: '线路车站', tr_reset: '显示全部', tr_only_tash: '地铁图和线路目前仅支持塔什干', tr_src: '线路数据来自 OpenStreetMap；到站时间见 Yandex 地图和 2GIS',
    tr_sec: '地铁与公交', tr_m_s: '线路图、车站、换乘', tr_b_s: '车站与线路', tr_arr: '到站信息' },
};
for (const l in TR_I) Object.assign(I[l], TR_I[l]);
const TR_TC = { b: '#2563EB', t: '#0891B2', m: '#D97706', tr: '#DC2626' };
const TR_TN = { b: 'tr_b', t: 'tr_tb', m: 'tr_mb', tr: 'tr_tr' };
const TR_MCOL = ['#DA291C', '#0057B8', '#009A44', '#F2A900', '#7C3AED'];
let TR_DATA = null, TR_P = null;
function trLoad() { if (TR_DATA) return Promise.resolve(TR_DATA); return TR_P || (TR_P = fetch(DATA_BASE + 'data/transit/0.json', { cache: 'no-cache' }).then(r => r.json()).then(j => { j.metro.lines.forEach((l, i) => { const nc = { red: '#DA291C', blue: '#0057B8', green: '#009A44', yellow: '#F2A900', purple: '#7C3AED', orange: '#EA580C' }[String(l.c).toLowerCase()]; if (nc) l.c = nc; else if (!/^#?[0-9a-f]{3,6}$/i.test(l.c || '')) l.c = TR_MCOL[i % TR_MCOL.length]; else if (l.c[0] !== '#') l.c = '#' + l.c; l.n = String(l.n).split(':')[0].replace(/\s*линия\s.*$/i, ' линия').replace(/\s*-\s*/g, ' — ').trim(); }); return (TR_DATA = j); }).catch(e => { TR_P = null; throw e; })); }
const tr = () => (window.__tr = window.__tr || { tab: 'metro', q: '', route: null, more: 0, big: false });
const TR_IC = {
  metro: '<svg viewBox="0 0 24 24" width="{s}" height="{s}" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18 8 6l4 8 4-8 4 12"/></svg>',
  bus: '<svg viewBox="0 0 24 24" width="{s}" height="{s}" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6v6M16 6v6M2 12h19.6M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/></svg>',
};
const trIc = (k, s) => TR_IC[k].replace(/\{s\}/g, s);
function trLineOf(ref) { return TR_DATA ? TR_DATA.metro.lines.find(l => l.r === ref) : null; }
function trShort(l) { return l.n.replace(/\s*линия$/i, '').trim() || l.r; }
function trBadge(ref) { const l = trLineOf(ref); return `<span class="tr-lb" style="background:${l ? l.c : '#6B7280'}">${esc(l ? trShort(l) : ref)}</span>`; }
function trRb(key) { const R = TR_DATA && TR_DATA.bus.routes[key]; const ty = R ? R.t : key.replace(/\d.*/, '') || 'b'; return `<span class="tr-rb" style="background:${TR_TC[ty] || '#2563EB'}">${esc(R ? R.r : key.replace(/^\D+/, ''))}</span>`; }
function trFilter() {
  const s = tr(), q = s.q.trim().toLowerCase(), D = TR_DATA; if (!D) return { routes: [], stops: [], st: [] };
  if (s.tab === 'metro') return { st: D.metro.st.filter(x => !q || (x.n + ' ' + (x.n2 || '')).toLowerCase().includes(q)) };
  const routes = q ? Object.entries(D.bus.routes).filter(([k, R]) => R.r.toLowerCase() === q || R.r.toLowerCase().startsWith(q) && /^\d/.test(q) || (!/^\d/.test(q) && (R.f + ' ' + R.to + ' ' + R.n).toLowerCase().includes(q))).sort((a, b) => (parseInt(a[1].r) || 999) - (parseInt(b[1].r) || 999)).slice(0, 30) : [];
  let stops = D.bus.stops.map((x, i) => Object.assign({ i }, x)).filter(x => x.r.length && (!q || x.n.toLowerCase().includes(q) || x.r.some(k => D.bus.routes[k] && D.bus.routes[k].r.toLowerCase() === q)));
  const l = caf().loc;
  stops = l ? stops.map(x => [cafDistRaw(l, [x.la, x.lo]), x]).sort((a, b) => a[0] - b[0]).map(x => x[1]) : stops.sort((a, b) => b.r.length - a.r.length);
  return { routes, stops };
}
const TR_TOP = 236;
function trMapH() { return tr().big ? Math.max(260, VH - TR_TOP - 60) : Math.min(290, Math.max(200, Math.round(VH * .32))); }
HS.transit = (arg) => {
  const s = tr(); if (arg === 'metro' || arg === 'bus') { if (s.tab !== arg) { s.tab = arg; s.q = ''; s.route = null; } currentP = null; }
  const tab = k => `<button class="tr-tab ${s.tab === k ? 'on' : ''}" data-act="trtab:${k}"><span style="background:${k === 'metro' ? '#DA291C' : '#2563EB'}">${trIc(k, 16)}</span>${esc(t('tr_' + k))}</button>`;
  return `<div class="h-hdr"><button class="h-back" data-act="back">${IC.back}</button><div class="h-title">${esc(t('tr_t'))}</div></div>
    <div class="tr-tabs">${tab('metro')}${tab('bus')}</div>
    <div class="cf-bar"><label class="cf-search"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="trQ" type="search" enterkeyhint="search" autocomplete="off" placeholder="${esc(t('tr_q_' + s.tab))}" value="${esc(s.q)}"></label></div>
    ${s.tab === 'bus' ? `<button class="po-x pk tr-live" data-act="trlive"><span class="po-xi" style="background:#DBEAFE">${trIc('bus', 20).replace('#fff', '#2563EB')}</span><span class="po-xt"><b>${esc(t('tr_live'))}</b><i>${esc(t('tr_live_s'))}</i></span>${IC.chev}</button>` : ''}
    <div class="cf-mapph" style="height:${trMapH()}px"></div>
    <div class="h-body cf-body" id="trList">${TR_DATA ? '' : `<div class="cf-empty">${esc(t('po_load'))}</div>`}</div>`;
};
let TR_MAP = null, TR_L = null, TR_SEL = null, TR_ME = null;
HS.transit.mount = el => {
  const s = tr();
  const q = el.querySelector('#trQ'); let tm;
  q.addEventListener('input', () => { clearTimeout(tm); tm = setTimeout(() => { s.q = q.value; s.more = 0; s.route = null; trRefresh(); }, 220); });
  q.addEventListener('keydown', e => { if (e.key === 'Enter') q.blur(); });
  const app = document.getElementById('app'), ph = el.querySelector('.cf-mapph');
  const ar = app.getBoundingClientRect(), pr = ph.getBoundingClientRect();
  const mw = document.createElement('div'); mw.className = 'cf-map';
  mw.style.top = (pr.top - ar.top) + 'px'; mw.style.height = pr.height + 'px'; mw.style.width = P(430);
  mw.innerHTML = `<div id="cfMap"></div><div class="cf-mbtns" style="zoom:${U}"><button data-cf="me"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#143C20" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3.2" fill="#143C20"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><circle cx="12" cy="12" r="7"/></svg></button><button data-cf="big"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#143C20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${s.big ? '<path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7"/>' : '<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>'}</svg></button></div>`;
  app.appendChild(mw);
  mw.addEventListener('click', e => { const b = e.target.closest('[data-cf]'); if (!b) return; e.preventDefault(); e.stopPropagation(); if (b.dataset.cf === 'big') { s.big = !s.big; render(current, currentP); } else trLocate(); });
  const list = el.querySelector('#trList');
  Promise.all([leafletReady(), trLoad()]).then(() => {
    if (!document.body.contains(mw)) return;
    if (list.querySelector('.cf-empty') && !list.querySelector('.cf-item')) list.innerHTML = '';
    const c = CITIES[0], v = window.__trView;
    TR_MAP = tiles(L.map(mw.querySelector('#cfMap'), { zoomControl: false, attributionControl: true, preferCanvas: true }).setView(v ? v.c : [c[5], c[6]], v ? v.z : 12));
    TR_MAP.on('moveend', () => { window.__trView = { c: TR_MAP.getCenter(), z: TR_MAP.getZoom() }; });
    TR_L = L.layerGroup().addTo(TR_MAP); TR_SEL = null; TR_ME = null; RT = null; RT_LINE = null;
    TR_MAP.on('zoomend', () => { if (tr().tab === 'bus' && !tr().route) trDraw(); });
    if (caf().loc) trMe();
    trRefresh(true);
    if (cityIdx() !== 0 && !window.__trWarn) { window.__trWarn = 1; toast(t('tr_only_tash')); }
  }).catch(() => { list.innerHTML = `<div class="cf-empty">${esc(t('po_err'))}</div>`; });
};
function trMe() { const l = caf().loc; if (!TR_MAP || !l) return; if (TR_ME) TR_ME.remove(); TR_ME = L.circleMarker(l, { radius: 8, color: '#fff', weight: 3, fillColor: '#2563EB', fillOpacity: 1 }).addTo(TR_MAP); }
function trLocate() {
  if (!navigator.geolocation) return toast(t('caf_geo_err'));
  navigator.geolocation.getCurrentPosition(pos => { caf().loc = [pos.coords.latitude, pos.coords.longitude]; trMe(); if (TR_MAP) TR_MAP.flyTo(caf().loc, 15, { duration: .6 }); trRefresh(); }, () => toast(t('caf_geo_err')), { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 });
}
function trDraw() {
  if (!TR_L || !TR_DATA) return; TR_L.clearLayers(); const s = tr(), D = TR_DATA;
  if (s.tab === 'metro') {
    for (const l of D.metro.lines) for (const g of l.g) L.polyline(g, { color: l.c, weight: 5, opacity: .9, interactive: false }).addTo(TR_L);
    for (const x of D.metro.st) { const l = trLineOf(x.l[0]); const m = L.circleMarker([x.la, x.lo], { radius: 6, color: l ? l.c : '#111', weight: 3, fillColor: '#fff', fillOpacity: 1 }); m.on('click', () => trStation(x.id)); m.addTo(TR_L); }
    return;
  }
  if (s.route) {
    const R = D.bus.routes[s.route]; if (!R) return; const col = TR_TC[R.t] || '#2563EB';
    const pts = R.s.map(i => [D.bus.stops[i].la, D.bus.stops[i].lo]);
    const pl = L.polyline(pts, { color: col, weight: 4, opacity: .85, interactive: false }).addTo(TR_L);
    R.s.forEach(i => { const x = D.bus.stops[i]; const m = L.circleMarker([x.la, x.lo], { radius: 5, color: '#fff', weight: 2, fillColor: col, fillOpacity: 1 }); m.on('click', () => trStop(i)); m.addTo(TR_L); });
    TR_MAP.fitBounds(pl.getBounds(), { padding: [30, 30] });
    return;
  }
  const z = TR_MAP.getZoom(); if (z < 12) return;   // too many stops at country zoom
  const b = TR_MAP.getBounds().pad(.3);
  D.bus.stops.forEach((x, i) => { if (!x.r.length || !b.contains([x.la, x.lo])) return; const m = L.circleMarker([x.la, x.lo], { radius: z >= 15 ? 6 : z >= 13 ? 4.5 : 3, color: '#fff', weight: 1.5, fillColor: '#2563EB', fillOpacity: .95 }); m.on('click', () => trStop(i)); m.addTo(TR_L); });
}
function trRefresh(keep) {
  const s = tr(), list = document.getElementById('trList'); if (!list || !TR_DATA) return;
  const D = TR_DATA, f = trFilter(); let h = '';
  if (s.tab === 'metro') {
    const q = s.q.trim();
    if (q) h = `<div class="cf-count">${esc(t('po_n', { n: f.st.length }))}</div>` + f.st.map(trStItem).join('');
    else h = D.metro.lines.map(l => { const st = D.metro.st.filter(x => x.l.includes(l.r)); return `<div class="tr-lh"><span style="background:${l.c}"></span><b>${esc(l.n)}</b><i>${esc(t('tr_st', { n: st.length }))}</i></div>` + st.map(trStItem).join(''); }).join('');
  } else if (s.route) {
    const R = D.bus.routes[s.route];
    h = `<div class="tr-rh">${trRb(s.route)}<span><b>${esc(t(TR_TN[R.t]) + ' ' + R.r)}</b><i>${esc([R.f, R.to].filter(Boolean).join(' → ') || R.n)}</i></span><button class="h-chip" data-act="trroute:">${esc(t('tr_reset'))}</button></div>
      <div class="cf-count">${esc(t('tr_route_stops'))} · ${R.s.length}</div>` + R.s.map(i => trStopItem(Object.assign({ i }, D.bus.stops[i]), true)).join('');
  } else {
    const shown = f.stops.slice(0, 40 + s.more);
    h = (f.routes.length ? `<div class="cf-count">${esc(t('tr_found_r', { n: f.routes.length }))}</div>` + f.routes.map(([k, R]) => `<button class="cf-item" data-act="trroute:${k}">${trRb(k)}<span class="cf-it"><b>${esc(t(TR_TN[R.t]) + ' ' + R.r)}</b><i>${esc([R.f, R.to].filter(Boolean).join(' → ') || R.n || t('tr_stops', { n: R.s.length }))}</i></span></button>`).join('') : '')
      + `<div class="cf-count">${esc(s.q ? t('tr_found_s', { n: f.stops.length }) : caf().loc ? t('tr_near') : t('tr_pop'))}</div>` + shown.map(x => trStopItem(x)).join('')
      + (f.stops.length > shown.length ? btn(t('caf_more'), 'trmore', 'ghostd') : '');
  }
  list.innerHTML = (h || `<div class="cf-empty">${esc(t('po_none'))}</div>`) + `<div class="h-muted small cam-note">${esc(t('tr_src'))}</div>`;
  if (!keep) list.scrollTop = 0;
  trDraw();
}
function trStItem(x) { const d = fmtDist(caf().loc ? cafDistRaw(caf().loc, [x.la, x.lo]) : null); return `<button class="cf-item" data-act="trst:${x.id}"><span class="cf-ic" style="background:${(trLineOf(x.l[0]) || {}).c || '#DA291C'}">${trIc('metro', 18)}</span><span class="cf-it"><b>${esc(x.n)}</b>${x.l.length > 1 ? `<i class="tr-x">${esc(t('tr_transfer'))}: ${x.l.map(trBadge).join(' ')}</i>` : x.n2 ? `<i>${esc(x.n2)}</i>` : ''}</span>${d ? `<span class="cf-dist">${esc(d)}</span>` : ''}</button>`; }
function trStopItem(x, inRoute) { const d = fmtDist(caf().loc ? cafDistRaw(caf().loc, [x.la, x.lo]) : null); return `<button class="cf-item" data-act="trstop:${x.i}"><span class="cf-ic" style="background:#2563EB">${trIc('bus', 18)}</span><span class="cf-it"><b>${esc(x.n)}</b><i class="tr-rbs">${x.r.slice(0, inRoute ? 10 : 8).map(trRb).join('')}${x.r.length > (inRoute ? 10 : 8) ? `<em>+${x.r.length - (inRoute ? 10 : 8)}</em>` : ''}</i></span>${d ? `<span class="cf-dist">${esc(d)}</span>` : ''}</button>`; }
function trSelect(la, lo, col) { if (!TR_MAP) return; if (TR_SEL) TR_SEL.remove(); TR_SEL = L.circleMarker([la, lo], { radius: 11, color: '#fff', weight: 3, fillColor: col, fillOpacity: 1 }).addTo(TR_MAP); TR_MAP.panTo([la, lo], { animate: true }); }
function trLinks(la, lo) {
  return [['Яндекс Карты', `https://yandex.uz/maps/10335/tashkent/?ll=${lo},${la}&z=17&l=masstransit`, '#FC3F1D', 'Я'], ['2ГИС', `https://2gis.uz/tashkent?m=${lo}%2C${la}%2F17`, '#29A746', '2'], ['Google Maps', `https://www.google.com/maps/search/?api=1&query=${la},${lo}`, '#1A73E8', 'G']];
}
function trSheet(title, sub, col, ic, la, lo, extra, walkAct) {
  bsheet(`<div class="tr-hero"><span style="background:${col}">${ic}</span><div><b>${esc(title)}</b>${sub}</div></div>
    ${extra}
    <button class="h-btn h-primary cf-rtbtn" data-act="${walkAct}">${esc(t('tr_walk'))}</button>
    <div class="cf-sec">${esc(t('tr_arr'))}</div><div class="cf-sub">${esc(t('tr_live_s'))}</div>
    <div class="cf-routes">${trLinks(la, lo).map(([n, u, c, l]) => `<a href="${esc(u)}" target="_blank" rel="noopener"><span style="background:${c}">${l}</span>${esc(n)}</a>`).join('')}</div>
    <div class="h-muted small cam-note">${esc(t('tr_src'))}</div>`, 'bs-caf');
}
function trStation(id) {
  const x = TR_DATA.metro.st.find(s => s.id === id); if (!x) return; const l = trLineOf(x.l[0]);
  trSelect(x.la, x.lo, l ? l.c : '#DA291C');
  trSheet(x.n, `<i>${esc(x.n2 || '')}</i><div class="tr-lbs">${x.l.map(trBadge).join('')}</div>`, l ? l.c : '#DA291C', trIc('metro', 26), x.la, x.lo,
    `<a class="cf-ya" href="https://yandex.uz/metro/tashkent" target="_blank" rel="noopener">${esc(t('tr_map_ya'))} ›</a>`, 'trwalk:m:' + id);
}
function trStop(i) {
  const x = TR_DATA.bus.stops[i]; if (!x) return; trSelect(x.la, x.lo, '#2563EB');
  trSheet(x.n, `<i>${esc(t('tr_found_r', { n: x.r.length }))}</i>`, '#2563EB', trIc('bus', 26), x.la, x.lo,
    `<div class="cf-sec">${esc(t('tr_routes'))}</div><div class="tr-rgrid">${x.r.map(k => `<button data-act="trroute:${k}">${trRb(k)}<i>${esc(t(TR_TN[(TR_DATA.bus.routes[k] || {}).t || 'b']))}</i></button>`).join('')}</div>`, 'trwalk:b:' + i);
}
async function trWalk(kind, id) {
  const x = kind === 'm' ? TR_DATA.metro.st.find(s => s.id === id) : TR_DATA.bus.stops[+id]; if (!x) return;
  bsheetClose(true);
  let from; try { from = await geo(); } catch (e) { toast(t('rt_geo')); return; }
  rtClear();
  const col = kind === 'm' ? ((trLineOf(x.l[0]) || {}).c || '#DA291C') : '#2563EB';
  const p = { id: kind + id, n: x.n, la: x.la, lo: x.lo };
  RT = { p, from, mode: 'foot', car: null, foot: null, map: TR_MAP, col, ic: trIc(kind === 'm' ? 'metro' : 'bus', 16), open: () => kind === 'm' ? trStation(id) : trStop(+id), taxi: true };
  rtPanel();
  const [car, foot] = await Promise.all([osrm('car', from, [x.la, x.lo]), osrm('foot', from, [x.la, x.lo])]);
  if (!RT || RT.p.id !== p.id) return; RT.car = car; RT.foot = foot; rtDraw(); rtPanel();
}
function trLive() {
  const l = caf().loc, c = l || [CITIES[0][5], CITIES[0][6]];
  bsheet(`<div class="tr-hero"><span style="background:#2563EB">${trIc('bus', 26)}</span><div><b>${esc(t('tr_live'))}</b><i>${esc(t('tr_live_s'))}</i></div></div>
    <div class="cf-routes" style="grid-template-columns:1fr 1fr;margin-top:14px">${trLinks(c[0], c[1]).slice(0, 2).map(([n, u, cc, ll]) => `<a href="${esc(u.replace('z=17', 'z=' + (l ? 16 : 12)).replace('%2F17', '%2F' + (l ? 16 : 12)))}" target="_blank" rel="noopener"><span style="background:${cc}">${ll}</span>${esc(n)}</a>`).join('')}</div>
    <div class="h-muted small cam-note">${esc(t('tr_src'))}</div>`, 'bs-caf');
}
Object.assign(XACT, {
  trtab: k => { const s = tr(); if (s.tab === k) return; s.tab = k; s.q = ''; s.route = null; s.more = 0; rtClear(); render(current, null); },
  trst: id => trStation(id), trstop: i => trStop(+i), trmore: () => { tr().more += 60; trRefresh(true); },
  trroute: k => { bsheetClose(true); const s = tr(); s.route = k || null; if (s.tab !== 'bus') { s.tab = 'bus'; return render(current, null); } rtClear(); trRefresh(); },
  trwalk: a => { const [k, ...id] = a.split(':'); trWalk(k, id.join(':')); }, trlive: () => trLive(),
});
AI_HIDE.add('h:transit');
function drawTransit(layers) {
  const r = layers.r; if (!r) return;
  const w = hoverlay(r, 24, 540, 382, 190, `<div class="hv-h">${esc(t('tr_sec'))}</div>
    <div class="hv-grid"><button data-tr="metro"><span class="hv-ic" style="background:#DA291C">${trIc('metro', 22)}</span><b>${esc(t('tr_metro'))}</b><i>${esc(t('tr_m_s'))}</i></button>
    <button data-tr="bus"><span class="hv-ic" style="background:#2563EB">${trIc('bus', 22)}</span><b>${esc(t('tr_bus'))}</b><i>${esc(t('tr_b_s'))}</i></button></div>
    <button class="hv-btn tr-livebtn" data-tr="live">${trIc('bus', 18)} ${esc(t('tr_live'))}</button>`);
  w.addEventListener('click', e => { const b = e.target.closest('[data-tr]'); if (!b) return; e.preventDefault(); e.stopPropagation(); if (b.dataset.tr === 'live') trLive(); else go('h:transit', b.dataset.tr); });
}
function drawInvest(layers) {
  const r = layers.r; if (!r) return;
  const h = hoverlay(r, 24, 562, 382, 28, `<div class="hv-h" style="margin:0">${esc(t('bd_map'))}<button>${esc(t('po_all_m'))}</button></div>`);
  h.addEventListener('click', e => { if (!e.target.closest('button')) return; e.preventDefault(); e.stopPropagation(); go('h:poi', 'build'); });
  miniMap(r, [24, 604, 382, 220], 'build', () => go('h:poi', 'build'));
}

// ======================= Sign-in via Telegram (@MyUzCity_bot) =======================
const AUTH_I = {
  ru: { tg_login: 'Войти через Telegram', tg_wait_t: 'Подтвердите номер в Telegram', tg_s1: 'Откройте бота @MyUzCity_bot и нажмите «Start»', tg_s2: 'Нажмите «📱 Поделиться номером» — бот пришлёт код', tg_s3: 'Введите код из Telegram здесь', tg_code: 'Код из Telegram', tg_go: 'Войти', tg_wrong: 'Неверный или устаревший код', tg_limit: 'Слишком много попыток — подождите 10 минут', tg_open: 'Открыть Telegram', tg_waiting: 'Ждём подтверждения…', tg_ok: 'Вы вошли: {n}', tg_err: 'Вход через Telegram пока недоступен — попробуйте позже', tg_exp: 'Время ожидания истекло — попробуйте ещё раз', tg_guest: 'Гость', tg_guest_s: 'Войдите, чтобы у вас был свой профиль', tg_phone: 'Телефон' },
  uz: { tg_login: 'Telegram orqali kirish', tg_wait_t: 'Raqamni Telegramda tasdiqlang', tg_s1: '@MyUzCity_bot ni oching va «Start» tugmasini bosing', tg_s2: '«📱 Raqamni yuborish» tugmasini bosing — bot kod yuboradi', tg_s3: 'Telegramdagi kodni shu yerga kiriting', tg_code: 'Telegramdagi kod', tg_go: 'Kirish', tg_wrong: 'Kod noto‘g‘ri yoki eskirgan', tg_limit: 'Urinishlar juda ko‘p — 10 daqiqa kuting', tg_open: 'Telegramni ochish', tg_waiting: 'Tasdiqlash kutilmoqda…', tg_ok: 'Siz kirdingiz: {n}', tg_err: "Telegram orqali kirish hozircha ishlamayapti — keyinroq urinib ko'ring", tg_exp: "Kutish vaqti tugadi — qayta urinib ko'ring", tg_guest: 'Mehmon', tg_guest_s: "O'z profilingiz bo'lishi uchun kiring", tg_phone: 'Telefon' },
  en: { tg_login: 'Sign in with Telegram', tg_wait_t: 'Confirm your number in Telegram', tg_s1: 'Open @MyUzCity_bot and tap “Start”', tg_s2: 'Tap “📱 Share my number” — the bot sends a code', tg_s3: 'Enter the code from Telegram here', tg_code: 'Code from Telegram', tg_go: 'Sign in', tg_wrong: 'Wrong or expired code', tg_limit: 'Too many attempts — wait 10 minutes', tg_open: 'Open Telegram', tg_waiting: 'Waiting for confirmation…', tg_ok: 'Signed in: {n}', tg_err: 'Telegram sign-in is not available yet — please try later', tg_exp: 'Timed out — please try again', tg_guest: 'Guest', tg_guest_s: 'Sign in to get your own profile', tg_phone: 'Phone' },
  zh: { tg_login: '通过 Telegram 登录', tg_wait_t: '在 Telegram 中确认号码', tg_s1: '打开 @MyUzCity_bot 并点击“开始”', tg_s2: '点击“📱 分享号码”— 机器人会发送验证码', tg_s3: '在此输入 Telegram 中的验证码', tg_code: 'Telegram 验证码', tg_go: '登录', tg_wrong: '验证码错误或已过期', tg_limit: '尝试次数过多，请等待 10 分钟', tg_open: '打开 Telegram', tg_waiting: '等待确认…', tg_ok: '已登录：{n}', tg_err: '暂时无法通过 Telegram 登录，请稍后再试', tg_exp: '已超时，请重试', tg_guest: '访客', tg_guest_s: '登录以拥有个人资料', tg_phone: '电话' },
};
for (const l in AUTH_I) Object.assign(I[l], AUTH_I[l]);
const TG_SVG = '<svg viewBox="0 0 24 24" width="22" height="22" fill="#fff"><path d="M21.4 4.2 2.9 11.3c-1.3.5-1.2 1.2-.2 1.5l4.7 1.5 1.8 5.6c.2.6.4.8.8.8.4 0 .6-.2.9-.5l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.3-1.5Zm-3.3 3.6-8.6 7.8-.3 3.6-1.6-5.1 10.1-6.4c.5-.3.8 0 .4.1Z"/></svg>';
const AUTH_API = AI_OWN.replace(/\/api\/assistant$/, '');
function authUser() { try { return JSON.parse(localStorage.getItem('uzk-user') || 'null'); } catch (e) { return null; } }
function userFirst() { const u = authUser(); return u ? (u.name || u.first_name || '').split(' ')[0] : ''; }
function userName() { const u = authUser(); return u ? (u.name || [u.first_name, u.last_name].filter(Boolean).join(' ') || u.phone) : ''; }
function fmtPhone(p) { const d = String(p || '').replace(/\D/g, ''); return d.length === 12 && d.startsWith('998') ? `+998 ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10)}` : (d ? '+' + d : ''); }
let TG_POLL = null;
function tgNonce() { const a = new Uint8Array(24); crypto.getRandomValues(a); return btoa(String.fromCharCode(...a)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
function tgLink(n) { return `https://t.me/MyUzCity_bot?start=login_${n}`; }
function tgSheet(n) {
  bsheet(`<div class="tr-hero"><span style="background:#229ED9">${TG_SVG.replace(/22/g, '28')}</span><div><b>${esc(t('tg_wait_t'))}</b><i>@MyUzCity_bot</i></div></div>
    <div class="pk-step"><span>1</span><div><b>${esc(t('tg_s1'))}</b></div></div><div class="pk-step"><span>2</span><div><b>${esc(t('tg_s2'))}</b></div></div><div class="pk-step"><span>3</span><div><b>${esc(t('tg_s3'))}</b></div></div>
    <a class="h-btn h-tgbtn cf-callbtn" href="${esc(tgLink(n))}" target="_blank" rel="noopener">${TG_SVG}<span>${esc(t('tg_open'))}</span></a>
    <div class="tg-code"><input id="tgCode" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="${esc(t('tg_code'))}"><button class="h-btn h-primary" id="tgGo">${esc(t('tg_go'))}</button></div>
    <div class="tg-err" id="tgErr"></div>`, 'bs-caf bs-tg');
  const inp = document.getElementById('tgCode'), go = document.getElementById('tgGo'), err = document.getElementById('tgErr');
  const send = async () => {
    const c = inp.value.replace(/\D/g, ''); if (c.length !== 6) { inp.focus(); return; }
    go.disabled = true; err.textContent = '';
    try {
      const r = await fetch(`${AUTH_API}/api/auth/code`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ code: c }) });
      const j = await r.json().catch(() => ({}));
      if (j.ok && j.token) return tgDone(j);
      err.textContent = t(r.status === 429 ? 'tg_limit' : r.status === 503 ? 'tg_err' : 'tg_wrong');
    } catch (e) { err.textContent = t('tg_err'); }
    go.disabled = false;
  };
  go.addEventListener('click', e => { e.preventDefault(); send(); });
  inp.addEventListener('input', () => { inp.value = inp.value.replace(/\D/g, '').slice(0, 6); if (inp.value.length === 6) send(); });
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });
}
function tgDone(j) {
  clearInterval(TG_POLL);
  try { localStorage.setItem('uzk-session', j.token); localStorage.setItem('uzk-user', JSON.stringify(j.user)); sessionStorage.removeItem('uzk-tg-n'); } catch (e) {}
  bsheetClose(true); toast(t('tg_ok', { n: userName() }));
  let authed = false; try { authed = localStorage.getItem('uzk-auth') === '1'; } catch (e) {}
  if (!authed || current === 'h:welcome') doLogin(); else render(current, currentP);
}
function tgLogin() {
  const n = tgNonce();
  try { sessionStorage.setItem('uzk-tg-n', JSON.stringify({ n, at: Date.now() })); } catch (e) {}
  tgSheet(n);   // Telegram opens from the button in the sheet (a real link tap) — the app page itself never navigates away
  tgPoll(n, Date.now());
}
function tgPoll(n, at) {
  clearInterval(TG_POLL); let busy = false;
  const tick = async () => {
    if (busy) return; if (Date.now() - at > 10 * 60e3) { clearInterval(TG_POLL); try { sessionStorage.removeItem('uzk-tg-n'); } catch (e) {} if (document.querySelector('.bs-tg')) { bsheetClose(); toast(t('tg_exp')); } return; }
    busy = true;
    try {
      const r = await fetch(`${AUTH_API}/api/auth/poll?n=${encodeURIComponent(n)}`, { cache: 'no-store' });
      if (r.status === 503) { clearInterval(TG_POLL); return; }
      const j = await r.json();
      if (j.status === 'ok' && j.token) tgDone(j);
    } catch (e) {} finally { busy = false; }
  };
  TG_POLL = setInterval(tick, 2500); tick();
  window.__tgTick = tick;
  if (!window.__tgVis) { window.__tgVis = 1; document.addEventListener('visibilitychange', () => { if (!document.hidden && window.__tgTick && sessionStorage.getItem('uzk-tg-n')) window.__tgTick(); }); }
}
(function tgResume() {
  try { const p = JSON.parse(sessionStorage.getItem('uzk-tg-n') || 'null'); if (p && Date.now() - p.at < 10 * 60e3) setTimeout(() => { if (!authUser()) { tgSheet(p.n); tgPoll(p.n, p.at); } }, 1200); } catch (e) {}
  let tok = null; try { tok = localStorage.getItem('uzk-session'); } catch (e) {}
  if (tok) fetch(`${AUTH_API}/api/me`, { headers: { authorization: 'Bearer ' + tok }, cache: 'no-store' }).then(r => r.status === 401 ? null : r.json()).then(j => {
    try { if (j === null) { localStorage.removeItem('uzk-session'); localStorage.removeItem('uzk-user'); } else if (j && j.ok) localStorage.setItem('uzk-user', JSON.stringify(j.user)); } catch (e) {}
  }).catch(() => {});
})();
function drawProfile(layers) {
  const h = layers['f:1:1388']; if (!h) return;
  const u = authUser();
  const ini = u ? (userName().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase() || '🙂') : '';
  const av = document.createElement('div'); av.className = 'pf-av'; av.style.left = P(22); av.style.top = P(70); av.style.width = P(78); av.style.height = P(78);
  av.innerHTML = `<div style="zoom:${U}">${u ? esc(ini) : TG_SVG.replace(/22/g, '34')}</div>`; if (!u) av.classList.add('tg');
  h.appendChild(av);
  const tx = document.createElement('div'); tx.className = 'pf-tx'; tx.style.left = P(108); tx.style.top = P(78); tx.style.width = P(300); tx.style.height = P(72);
  tx.innerHTML = `<div class="pf-z" style="zoom:${U}">${u ? `<b>${esc(userName())}</b><i>${esc(fmtPhone(u.phone))}${u.username ? ' · @' + esc(u.username) : ''}</i>` : `<b>${esc(t('tg_guest'))}</b><button class="pf-tg">${esc(t('tg_login'))}</button>`}</div>`;
  h.appendChild(tx);
  if (!u) [av, tx].forEach(e => e.addEventListener('click', ev => { ev.preventDefault(); ev.stopPropagation(); tgLogin(); }));
}

// ======================= On-screen keyboard: keep the field being typed in visible =======================
// Phones shrink only the *visual* viewport when the keyboard opens; bottom sheets (code entry, search)
// are moved into the visible part so the keyboard never covers what is being typed.
(function kbFit() {
  const vv = window.visualViewport; if (!vv) return;
  let raf = 0;
  const fit = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const kb = window.innerHeight - vv.height > 80;
      document.documentElement.classList.toggle('kb-open', kb);
      const w = document.querySelector('.bs-wrap'); if (!w) return;
      if (!kb) { w.style.top = '0px'; w.style.height = VH + 'px'; return; }
      const ar = document.getElementById('app').getBoundingClientRect();
      w.style.top = ((vv.offsetTop - ar.top) / U) + 'px'; w.style.height = (vv.height / U) + 'px';
      const a = document.activeElement; if (a && w.contains(a)) a.scrollIntoView({ block: 'center' });
    });
  };
  vv.addEventListener('resize', fit); vv.addEventListener('scroll', fit);
  document.addEventListener('focusin', e => { if (/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) { [120, 350, 700].forEach(ms => setTimeout(() => { fit(); const p = document.getElementById('aiPanel'); if (p && p._fit) p._fit(); }, ms)); } });
  document.addEventListener('focusout', () => setTimeout(fit, 150));
  window.__kbFit = fit;
})();

// ======================= Transport hub: metro, buses, trains, flights, taxi, transport card =======================
const TP_I = {
  ru: { tp_t: 'Транспорт', tp_metro_s: 'Схема, станции, пересадки', tp_bus: 'Автобусы и маршрутки', tp_bus_s: 'Остановки и маршруты', tp_train: 'Поезда', tp_train_s: 'Вокзалы и билеты', tp_air: 'Самолёты', tp_air_s: 'Онлайн-табло аэропортов', tp_taxi: 'Такси', tp_taxi_s: 'Yandex Go', tp_card: 'Транспортная карта', tp_card_s: 'Пополнить, поездки',
    tr_st_t: 'Вокзалы и станции', tr_q: 'Город или станция', tr_buy: 'Купить билет на поезд', tr_buy_s: 'Официальная продажа — АО «Узбекистон темир йуллари»', tr_info: 'Скоростные Afrosiyob: Ташкент — Самарканд — Бухара, Карши. Скоростной поезд Ташкент — Хива. Ночные и пригородные поезда — по всей стране.', tr_main: 'Вокзал', tr_stn: 'Станция', tr_to: 'Как добраться',
    fl_t: 'Самолёты', fl_dep: 'Вылет', fl_arr: 'Прилёт', fl_load: 'Загружаем табло…', fl_err: 'Табло сейчас недоступно — откройте его на сайте аэропортов', fl_none: 'Рейсов нет', fl_upd: 'Обновлено в {t}', fl_tom: 'завтра', fl_term: 'Терминал', fl_ck: 'Регистрация', fl_gate: 'Выход', fl_taxi: 'Такси до аэропорта', fl_buy: 'Купить авиабилет', fl_site: 'Табло на сайте Uzbekistan Airports', fl_src: 'Онлайн-табло АО «Uzbekistan Airports», обновляется каждые 2 минуты', fl_q: 'Город или номер рейса',
    fs_sc: 'По расписанию', fs_dl: 'Задерживается', fs_dp: 'Вылетел', fs_ld: 'Прибыл', fs_cx: 'Отменён', fs_ex: 'Ожидается', fs_ci: 'Регистрация', fs_bd: 'Посадка', fs_ot: '',
    tx_t: 'Такси', tx_s: 'Вызовите Yandex Go — адрес и цену укажете в приложении. Цену поездки до кафе, вокзала или аэропорта мы показываем прямо в их карточках.', tx_go: 'Открыть Yandex Go' },
  uz: { tp_t: 'Transport', tp_metro_s: 'Sxema, bekatlar, o‘tishlar', tp_bus: 'Avtobus va marshrutkalar', tp_bus_s: "Bekatlar va yo'nalishlar", tp_train: 'Poyezdlar', tp_train_s: 'Vokzallar va chiptalar', tp_air: 'Samolyotlar', tp_air_s: 'Aeroportlar onlayn tablosi', tp_taxi: 'Taksi', tp_taxi_s: 'Yandex Go', tp_card: 'Transport kartasi', tp_card_s: "To'ldirish, safarlar",
    tr_st_t: 'Vokzal va bekatlar', tr_q: 'Shahar yoki bekat', tr_buy: 'Poyezd chiptasini sotib olish', tr_buy_s: "Rasmiy sotuv — «O'zbekiston temir yo'llari» AJ", tr_info: "Tezyurar Afrosiyob: Toshkent — Samarqand — Buxoro, Qarshi. Toshkent — Xiva tezyurar poyezdi. Tungi va shahar atrofi poyezdlari — butun mamlakat bo'ylab.", tr_main: 'Vokzal', tr_stn: 'Bekat', tr_to: 'Qanday borish',
    fl_t: 'Samolyotlar', fl_dep: 'Uchish', fl_arr: 'Qo‘nish', fl_load: 'Tablo yuklanmoqda…', fl_err: 'Tablo hozir mavjud emas — aeroportlar saytida oching', fl_none: "Reyslar yo'q", fl_upd: '{t} da yangilandi', fl_tom: 'ertaga', fl_term: 'Terminal', fl_ck: "Ro'yxatdan o'tish", fl_gate: "Yo'lak", fl_taxi: 'Aeroportgacha taksi', fl_buy: 'Aviachipta sotib olish', fl_site: 'Uzbekistan Airports saytidagi tablo', fl_src: '«Uzbekistan Airports» AJ onlayn tablosi, har 2 daqiqada yangilanadi', fl_q: 'Shahar yoki reys raqami',
    fs_sc: "Jadval bo'yicha", fs_dl: 'Kechikmoqda', fs_dp: 'Uchib ketdi', fs_ld: 'Yetib keldi', fs_cx: 'Bekor qilindi', fs_ex: 'Kutilmoqda', fs_ci: "Ro'yxatdan o'tish", fs_bd: 'Chiqish', fs_ot: '',
    tx_t: 'Taksi', tx_s: "Yandex Go'ni chaqiring — manzil va narxni ilovada ko'rsatasiz. Kafe, vokzal yoki aeroportgacha narxni ularning kartochkasida ko'rsatamiz.", tx_go: "Yandex Go'ni ochish" },
  en: { tp_t: 'Transport', tp_metro_s: 'Map, stations, transfers', tp_bus: 'Buses & minibuses', tp_bus_s: 'Stops and routes', tp_train: 'Trains', tp_train_s: 'Stations and tickets', tp_air: 'Flights', tp_air_s: 'Live airport boards', tp_taxi: 'Taxi', tp_taxi_s: 'Yandex Go', tp_card: 'Transport card', tp_card_s: 'Top up, trips',
    tr_st_t: 'Railway stations', tr_q: 'City or station', tr_buy: 'Buy a train ticket', tr_buy_s: 'Official sales — Uzbekistan Railways', tr_info: 'High-speed Afrosiyob: Tashkent — Samarkand — Bukhara, Karshi. High-speed train Tashkent — Khiva. Night and suburban trains across the country.', tr_main: 'Station', tr_stn: 'Stop', tr_to: 'Getting there',
    fl_t: 'Flights', fl_dep: 'Departures', fl_arr: 'Arrivals', fl_load: 'Loading the board…', fl_err: 'The board is unavailable now — open it on the airports website', fl_none: 'No flights', fl_upd: 'Updated at {t}', fl_tom: 'tomorrow', fl_term: 'Terminal', fl_ck: 'Check-in', fl_gate: 'Gate', fl_taxi: 'Taxi to the airport', fl_buy: 'Buy a plane ticket', fl_site: 'Board on the Uzbekistan Airports website', fl_src: 'Live board of JSC Uzbekistan Airports, refreshed every 2 minutes', fl_q: 'City or flight number',
    fs_sc: 'Scheduled', fs_dl: 'Delayed', fs_dp: 'Departed', fs_ld: 'Landed', fs_cx: 'Cancelled', fs_ex: 'Expected', fs_ci: 'Check-in', fs_bd: 'Boarding', fs_ot: '',
    tx_t: 'Taxi', tx_s: 'Call Yandex Go — set the address and see the price in its app. Prices to a cafe, station or airport are shown right in their cards.', tx_go: 'Open Yandex Go' },
  zh: { tp_t: '交通', tp_metro_s: '线路图、车站、换乘', tp_bus: '公交与小巴', tp_bus_s: '车站与线路', tp_train: '火车', tp_train_s: '车站与车票', tp_air: '航班', tp_air_s: '机场实时航班', tp_taxi: '出租车', tp_taxi_s: 'Yandex Go', tp_card: '交通卡', tp_card_s: '充值、行程',
    tr_st_t: '火车站', tr_q: '城市或车站', tr_buy: '购买火车票', tr_buy_s: '官方售票 — 乌兹别克斯坦铁路公司', tr_info: 'Afrosiyob 高速列车：塔什干 — 撒马尔罕 — 布哈拉、卡尔希。塔什干 — 希瓦高速列车。全国都有夜车和市郊列车。', tr_main: '火车站', tr_stn: '车站', tr_to: '如何前往',
    fl_t: '航班', fl_dep: '出发', fl_arr: '到达', fl_load: '正在加载航班…', fl_err: '航班信息暂不可用，请在机场网站查看', fl_none: '没有航班', fl_upd: '更新于 {t}', fl_tom: '明天', fl_term: '航站楼', fl_ck: '值机柜台', fl_gate: '登机口', fl_taxi: '打车去机场', fl_buy: '购买机票', fl_site: 'Uzbekistan Airports 网站航班信息', fl_src: 'Uzbekistan Airports 实时航班信息，每 2 分钟更新', fl_q: '城市或航班号',
    fs_sc: '按计划', fs_dl: '延误', fs_dp: '已起飞', fs_ld: '已到达', fs_cx: '已取消', fs_ex: '预计', fs_ci: '值机', fs_bd: '登机', fs_ot: '',
    tx_t: '出租车', tx_s: '打开 Yandex Go 设置地址并查看价格。去餐厅、车站或机场的价格会直接显示在其卡片中。', tx_go: '打开 Yandex Go' },
};
for (const l in TP_I) Object.assign(I[l], TP_I[l]);
const TP_SVG = {
  train: '<svg viewBox="0 0 24 24" width="{s}" height="{s}" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 10h14M9 21l-2-4M15 21l2-4"/><circle cx="9" cy="13.5" r=".8" fill="#fff"/><circle cx="15" cy="13.5" r=".8" fill="#fff"/></svg>',
  air: '<svg viewBox="0 0 24 24" width="{s}" height="{s}" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>',
  taxi: '<svg viewBox="0 0 24 24" width="{s}" height="{s}" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2h4M8 6l1.5-3h5L16 6M5 17h14v-5l-2-6H7l-2 6z"/><circle cx="8" cy="14.5" r=".9" fill="#fff"/><circle cx="16" cy="14.5" r=".9" fill="#fff"/><path d="M6 17v2M18 17v2"/></svg>',
  card: '<svg viewBox="0 0 24 24" width="{s}" height="{s}" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>',
};
const tpIc = (k, s) => (TP_SVG[k] || TR_IC[k]).replace(/\{s\}/g, s);
HS.transport = () => {
  const tile = (k, ic, col, title, sub, act) => `<button class="tp-tile" data-act="${act}"><span class="tp-ic" style="background:${col}">${tpIc(ic, 26)}</span><b>${esc(t(title))}</b><i>${esc(t(sub))}</i></button>`;
  return `${hdr(t('tp_t'))}<div class="h-body tp-body">
    <div class="tp-grid">
      ${tile('m', 'metro', '#DA291C', 'tr_metro', 'tp_metro_s', 'go:h:transit?metro')}
      ${tile('b', 'bus', '#2563EB', 'tp_bus', 'tp_bus_s', 'go:h:transit?bus')}
      ${tile('t', 'train', '#0F766E', 'tp_train', 'tp_train_s', 'go:h:trains')}
      ${tile('a', 'air', '#7C3AED', 'tp_air', 'tp_air_s', 'go:h:flights')}
      ${tile('x', 'taxi', '#EAB308', 'tp_taxi', 'tp_taxi_s', 'tptaxi')}
      ${tile('c', 'card', '#8B5E34', 'tp_card', 'tp_card_s', 'go:1:2379')}
    </div>
    <button class="hv-btn tr-livebtn" data-act="trlive">${trIc('bus', 18)} ${esc(t('tr_live'))}</button>
  </div>`;
};
function tpTaxi() {
  const link = `https://3.redirect.appmetrica.yandex.com/route?ref=myuzcity&appmetrica_tracking_id=1178268795219780156&lang=${LANG}`;
  bsheet(`<div class="tr-hero"><span style="background:#FCE000">${tpIc('taxi', 26).replace(/#fff/g, '#111')}</span><div><b>${esc(t('tx_t'))}</b><i>Yandex Go</i></div></div>
    <p class="tp-p">${esc(t('tx_s'))}</p><a class="h-btn h-primary cf-callbtn" href="${esc(link)}" target="_blank" rel="noopener">${esc(t('tx_go'))}</a>`, 'bs-caf');
}

// ---- trains: stations from OpenStreetMap, tickets on eticket.railway.uz
let UZT = null, UZT_P = null;
const AIRPORTS = [['TAS', 'Ташкент', 'Toshkent', 'Tashkent', '塔什干', 41.2579, 69.2812], ['SKD', 'Самарканд', 'Samarqand', 'Samarkand', '撒马尔罕', 39.7005, 66.9838], ['BHK', 'Бухара', 'Buxoro', 'Bukhara', '布哈拉', 39.775, 64.4833],
  ['UGC', 'Ургенч', 'Urganch', 'Urgench', '乌尔根奇', 41.5843, 60.6417], ['NCU', 'Нукус', 'Nukus', 'Nukus', '努库斯', 42.4884, 59.6233], ['NMA', 'Наманган', 'Namangan', 'Namangan', '纳曼干', 40.9846, 71.5567], ['FEG', 'Фергана', "Farg'ona", 'Fergana', '费尔干纳', 40.3588, 71.745],
  ['AZN', 'Андижан', 'Andijon', 'Andijan', '安集延', 40.7277, 72.294], ['KSQ', 'Карши', 'Qarshi', 'Karshi', '卡尔希', 38.8336, 65.9215], ['TMJ', 'Термез', 'Termiz', 'Termez', '铁尔梅兹', 37.2867, 67.31], ['NVI', 'Навои', 'Navoiy', 'Navoi', '纳沃伊', 40.1172, 65.1708]];
function uztLoad() {
  if (UZT) return Promise.resolve(UZT);
  return UZT_P || (UZT_P = fetch(DATA_BASE + 'data/transit/uz.json', { cache: 'no-cache' }).then(r => r.ok ? r.json() : { air: [], rail: [] }).catch(() => ({ air: [], rail: [] })).then(j => {
    for (const a of j.air || []) { const x = AIRPORTS.find(y => y[0] === a.iata); if (x) { x[5] = a.la; x[6] = a.lo; } }
    return (UZT = j);
  }));
}
const trs = () => (window.__trs = window.__trs || { q: '', big: false });
HS.trains = () => {
  const s = trs();
  return `<div class="h-hdr"><button class="h-back" data-act="back">${IC.back}</button><div class="h-title">${esc(t('tp_train'))}</div></div>
    <div class="cf-bar"><label class="cf-search"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="tsQ" type="search" enterkeyhint="search" autocomplete="off" placeholder="${esc(t('tr_q'))}" value="${esc(s.q)}"></label></div>
    <a class="po-x pk tr-live" href="https://eticket.railway.uz/${LANG === 'uz' ? 'uz' : LANG === 'en' ? 'en' : 'ru'}/home" target="_blank" rel="noopener"><span class="po-xi" style="background:#CCFBF1">${tpIc('train', 20).replace(/#fff/g, '#0F766E')}</span><span class="po-xt"><b>${esc(t('tr_buy'))}</b><i>${esc(t('tr_buy_s'))}</i></span>${IC.chev}</a>
    <div class="cf-mapph" style="height:${s.big ? Math.max(260, VH - 300) : Math.min(280, Math.max(200, Math.round(VH * .3)))}px"></div>
    <div class="h-body cf-body" id="tsList"><div class="cf-empty">${esc(t('po_load'))}</div></div>`;
};
let TS_MAP = null, TS_SEL = null;
function mapAt(el, ph, onBig) {
  const app = document.getElementById('app'), ar = app.getBoundingClientRect(), pr = ph.getBoundingClientRect();
  const mw = document.createElement('div'); mw.className = 'cf-map';
  mw.style.top = (pr.top - ar.top) + 'px'; mw.style.height = pr.height + 'px'; mw.style.width = P(430);
  mw.innerHTML = `<div id="cfMap"></div><div class="cf-mbtns" style="zoom:${U}"><button data-cf="me"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#143C20" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3.2" fill="#143C20"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><circle cx="12" cy="12" r="7"/></svg></button><button data-cf="big"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#143C20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg></button></div>`;
  app.appendChild(mw);
  return mw;
}
HS.trains.mount = el => {
  const s = trs();
  const q = el.querySelector('#tsQ'); let tm;
  q.addEventListener('input', () => { clearTimeout(tm); tm = setTimeout(() => { s.q = q.value; tsRefresh(); }, 220); });
  const mw = mapAt(el, el.querySelector('.cf-mapph'));
  mw.addEventListener('click', e => { const b = e.target.closest('[data-cf]'); if (!b) return; e.preventDefault(); e.stopPropagation(); if (b.dataset.cf === 'big') { s.big = !s.big; render(current, currentP); } else geo().then(l => { caf().loc = l; if (TS_MAP) TS_MAP.flyTo(l, 12); tsRefresh(); }).catch(() => toast(t('caf_geo_err'))); });
  Promise.all([leafletReady(), uztLoad()]).then(() => {
    if (!document.body.contains(mw)) return;
    const c = CITIES[cityIdx()];
    TS_MAP = tiles(L.map(mw.querySelector('#cfMap'), { zoomControl: false, preferCanvas: true }).setView([c[5], c[6]], 11));
    TS_SEL = null; RT = null; RT_LINE = null;
    tsRefresh();
  });
};
function tsList() {
  const q = trs().q.trim().toLowerCase(), l = caf().loc, c = CITIES[cityIdx()], from = l || [c[5], c[6]];
  return (UZT ? UZT.rail : []).filter(x => !q || (x.n + ' ' + x.n2).toLowerCase().includes(q)).map(x => [cafDistRaw(from, [x.la, x.lo]) - (x.m ? 3 : 0), x]).sort((a, b) => a[0] - b[0]).map(y => y[1]);
}
function tsRefresh() {
  const list = document.getElementById('tsList'); if (!list) return;
  const r = tsList(), l = caf().loc;
  list.innerHTML = `<div class="tp-info">${esc(t('tr_info'))}</div><div class="cf-count">${esc(t('tr_st_t'))} · ${r.length}</div>` + r.slice(0, 60).map((x, i) => `<button class="cf-item" data-act="tsopen:${x.id}"><span class="cf-ic" style="background:${x.m ? '#0F766E' : '#5EAAA0'}">${tpIc('train', 18)}</span><span class="cf-it"><b>${esc(x.n)}</b><i>${esc(x.m ? t('tr_main') : t('tr_stn'))}${x.n2 && x.n2 !== x.n ? ' · ' + esc(x.n2) : ''}</i></span>${l ? `<span class="cf-dist">${esc(fmtDist(cafDistRaw(l, [x.la, x.lo])))}</span>` : ''}</button>`).join('') + `<div class="h-muted small cam-note">${esc(t('po_src'))}</div>`;
  if (!TS_MAP) return;
  if (TS_MAP.__lay) TS_MAP.__lay.remove();
  TS_MAP.__lay = L.layerGroup(r.map(x => { const m = L.circleMarker([x.la, x.lo], { radius: x.m ? 7 : 5, color: '#fff', weight: 2, fillColor: x.m ? '#0F766E' : '#5EAAA0', fillOpacity: 1 }); m.on('click', () => tsOpen(x.id)); return m; })).addTo(TS_MAP);
}
function tsOpen(id) {
  const x = UZT && UZT.rail.find(s => s.id === id); if (!x) return;
  if (TS_MAP) { if (TS_SEL) TS_SEL.remove(); TS_SEL = L.circleMarker([x.la, x.lo], { radius: 11, color: '#fff', weight: 3, fillColor: '#0F766E', fillOpacity: 1 }).addTo(TS_MAP); TS_MAP.panTo([x.la, x.lo]); }
  bsheet(`<div class="tr-hero"><span style="background:#0F766E">${tpIc('train', 26)}</span><div><b>${esc(x.n)}</b><i>${esc(x.m ? t('tr_main') : t('tr_stn'))}${x.n2 && x.n2 !== x.n ? ' · ' + esc(x.n2) : ''}</i></div></div>
    <a class="h-btn h-primary cf-callbtn" href="https://eticket.railway.uz/${LANG === 'uz' ? 'uz' : LANG === 'en' ? 'en' : 'ru'}/home" target="_blank" rel="noopener">${esc(t('tr_buy'))}</a>
    <button class="h-btn h-ghostd cf-rtbtn" data-act="tsroute:${x.id}">${esc(t('rt_t'))}</button>
    <div class="cf-sec">${esc(t('caf_route'))}</div><div class="cf-sub">${esc(t('caf_route_s'))}</div>
    <div class="cf-routes">${navLinks({ la: x.la, lo: x.lo }, null, 'car').map(([n, u, c, l]) => `<a href="${esc(u)}" target="_blank" rel="noopener"><span style="background:${c}">${l}</span>${esc(n)}</a>`).join('')}</div>
    <div class="h-muted small cam-note">${esc(t('po_src'))}</div>`, 'bs-caf');
}
async function routeGeneric(p, map, col, ic, open) {
  bsheetClose(true);
  let from; try { from = await geo(); } catch (e) { toast(t('rt_geo')); return; }
  rtClear();
  RT = { p, from, mode: 'car', car: null, foot: null, map, col, ic, open, taxi: true };
  rtPanel();
  const [car, foot] = await Promise.all([osrm('car', from, [p.la, p.lo]), osrm('foot', from, [p.la, p.lo])]);
  if (!RT || RT.p.id !== p.id) return; RT.car = car; RT.foot = foot; rtDraw(); rtPanel();
}

// ---- flights: live board through /api/flights
const fls = () => (window.__fls = window.__fls || { ap: null, dir: 'dep', q: '' });
const FL_API = AI_OWN.replace(/\/api\/assistant$/, '') + '/api/flights';
const FL_COL = { sc: '#15803D', dl: '#D97706', dp: '#6B7280', ld: '#6B7280', cx: '#DC2626', ex: '#2563EB', ci: '#2563EB', bd: '#7C3AED', ot: '#6B7280' };
function flAp() { const s = fls(); if (!s.ap) { const c = CITIES[cityIdx()]; s.ap = AIRPORTS.map(a => [cafDistRaw([c[5], c[6]], [a[5], a[6]]), a[0]]).sort((a, b) => a[0] - b[0])[0][1]; } return s.ap; }
const apName = code => { const a = AIRPORTS.find(x => x[0] === code); return a ? a[LI[LANG] + 1] : code; };
HS.flights = () => {
  const s = fls(), ap = flAp();
  return `<div class="h-hdr"><button class="h-back" data-act="back">${IC.back}</button><div class="h-title">${esc(t('fl_t'))}</div></div>
    <div class="cf-chips hs fl-aps" id="flAps">${AIRPORTS.map(a => `<button class="h-chip ${a[0] === ap ? 'on' : ''}" data-act="flap:${a[0]}">${esc(a[LI[LANG] + 1])} <i>${a[0]}</i></button>`).join('')}</div>
    <div class="tr-tabs fl-tabs"><button class="tr-tab ${s.dir === 'dep' ? 'on' : ''}" data-act="fldir:dep">🛫 ${esc(t('fl_dep'))}</button><button class="tr-tab ${s.dir === 'arr' ? 'on' : ''}" data-act="fldir:arr">🛬 ${esc(t('fl_arr'))}</button></div>
    <div class="cf-bar"><label class="cf-search"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="flQ" type="search" enterkeyhint="search" autocomplete="off" placeholder="${esc(t('fl_q'))}" value="${esc(s.q)}"></label></div>
    <div class="h-body cf-body fl-body" id="flList"><div class="cf-empty">${esc(t('fl_load'))}</div></div>`;
};
let FL_DATA = {}, FL_T = 0;
HS.flights.mount = el => {
  const s = fls();
  const chips = el.querySelector('#flAps'); const on = chips.querySelector('.on'); if (on && on.offsetLeft > 200) chips.scrollLeft = on.offsetLeft - 24;
  const q = el.querySelector('#flQ'); let tm;
  q.addEventListener('input', () => { clearTimeout(tm); tm = setTimeout(() => { s.q = q.value; flRender(); }, 200); });
  clearInterval(FL_T); FL_T = setInterval(() => { if (current !== 'h:flights') return clearInterval(FL_T); flLoad(true); }, 120000);
  uztLoad(); flLoad();
};
function flKey() { const s = fls(); return flAp() + ':' + s.dir; }
function flLoad(quiet) {
  const s = fls(), k = flKey(), lg = LANG === 'uz' ? 'uz' : LANG === 'en' || LANG === 'zh' ? 'en' : 'ru';
  if (FL_DATA[k] && !quiet) flRender();
  fetch(`${FL_API}?ap=${flAp()}&dir=${s.dir}&lang=${lg}`).then(r => r.json()).then(j => { if (!j.ok) throw 0; FL_DATA[k] = j; if (flKey() === k) flRender(); })
    .catch(() => { if (!FL_DATA[k] && flKey() === k) { const l = document.getElementById('flList'); if (l) l.innerHTML = flErr(); } });
}
function flErr() { return `<div class="cf-empty">${esc(t('fl_err'))}</div>${flActions()}`; }
function flActions() {
  const ap = flAp(), a = AIRPORTS.find(x => x[0] === ap);
  return `<div class="fl-acts"><button class="h-btn h-primary" data-act="fltaxi:${ap}">${tpIc('taxi', 18)} ${esc(t('fl_taxi'))}</button>
    <a class="h-btn h-ghostd cf-callbtn" href="https://www.uzairways.com/${LANG === 'uz' ? 'uz' : LANG === 'en' ? 'en' : 'ru'}" target="_blank" rel="noopener">${esc(t('fl_buy'))}</a></div>
    <a class="cf-ya" href="https://uzairports.com/flights/${fls().dir === 'arr' ? 'arrival' : 'departure'}?airport=${ap}" target="_blank" rel="noopener">${esc(t('fl_site'))} ›</a>
    <div class="h-muted small cam-note">${esc(t('fl_src'))}</div>`;
}
function flRender() {
  const list = document.getElementById('flList'); if (!list) return;
  const j = FL_DATA[flKey()]; if (!j) return;
  const q = fls().q.trim().toLowerCase();
  // hide flights that left or landed more than 40 minutes ago
  const nz = new Date(Date.now() + 5 * 3600e3), now = nz.getUTCHours() * 60 + nz.getUTCMinutes();
  const mins = h => +h.slice(0, 2) * 60 + +h.slice(3, 5);
  const rows = j.rows.filter(r => !(r.d === 0 && (r.st === 'dp' || r.st === 'ld' || r.st === 'cx') && mins(r.e || r.t) < now - 40)).filter(r => !q || (r.c + ' ' + r.i + ' ' + r.f + ' ' + r.a).toLowerCase().includes(q));
  const at = new Date(j.at), hhmm = String(at.getHours()).padStart(2, '0') + ':' + String(at.getMinutes()).padStart(2, '0');
  list.innerHTML = `<div class="cf-count">${esc(apName(j.ap))} · ${esc(t(j.dir === 'arr' ? 'fl_arr' : 'fl_dep'))} · ${esc(t('fl_upd', { t: hhmm }))}</div>`
    + (rows.length ? rows.slice(0, 120).map(r => {
      const late = r.e && r.e !== r.t;
      return `<div class="fl-row"><div class="fl-time"><b class="${late ? 'old' : ''}">${esc(r.t)}</b>${late ? `<b class="new">${esc(r.e)}</b>` : ''}${r.d ? `<i>${esc(t('fl_tom'))}</i>` : ''}</div>
        <div class="fl-mid"><b>${esc(r.c)} <em>${esc(r.i)}</em></b><i>${esc(r.f)} · ${esc(r.a)}</i>${r.tm || r.g || r.ck ? `<i>${[r.tm ? t('fl_term') + ' ' + r.tm : '', r.ck ? t('fl_ck') + ' ' + r.ck : '', r.g ? t('fl_gate') + ' ' + r.g : ''].filter(Boolean).map(esc).join(' · ')}</i>` : ''}</div>
        <span class="fl-st" style="color:${FL_COL[r.st]};background:${FL_COL[r.st]}14">${esc(t('fs_' + r.st) || r.s)}</span></div>`;
    }).join('') : `<div class="cf-empty">${esc(t('fl_none'))}</div>`) + flActions();
}
async function flTaxi(code) {
  const a = AIRPORTS.find(x => x[0] === code); if (!a) return;
  const p = { id: 'ap' + code, n: (LANG === 'ru' ? 'Аэропорт ' : '') + a[LI[LANG] + 1] + (LANG === 'ru' ? '' : ' airport'), la: a[5], lo: a[6] };
  let from; try { from = await geo(); } catch (e) { toast(t('rt_geo')); return; }
  bsheet(`<div class="tr-hero"><span style="background:#7C3AED">${tpIc('air', 26)}</span><div><b>${esc(p.n)}</b><i>${esc(code)}</i></div></div><div class="tg-wait"><span class="h-spin"></span>…</div>`, 'bs-caf');
  const car = await osrm('car', from, [p.la, p.lo]);
  const km = car ? car.d / 1000 : null, mn = car ? car.s / 60 : null;
  bsheet(`<div class="tr-hero"><span style="background:#7C3AED">${tpIc('air', 26)}</span><div><b>${esc(p.n)}</b><i>${car ? esc(fmtDur(car.s) + ' · ' + fmtKm(car.d)) : esc(code)}</i></div></div>
    <div class="rt-taxi"><span class="rt-go">Go</span><span class="rt-tt"><b>${car ? `≈ ${fmtSum(taxiPrice('start', km, mn))} ${t('rt_sum')}` : 'Yandex Go'}</b><i>${car ? `Yandex Go · ${t('rt_start')}; ${t('rt_comfort')} ≈ ${fmtSum(taxiPrice('comfort', km, mn))}` : ''}</i></span><a class="rt-call" href="${esc(taxiLink(p, from))}" target="_blank" rel="noopener">${esc(t('rt_taxi'))}</a></div>
    <div class="rt-note">${esc(t('rt_taxi_s'))}</div>
    <div class="cf-sec">${esc(t('caf_route'))}</div>
    <div class="cf-routes">${navLinks(p, from, 'car').map(([n, u, c, l]) => `<a href="${esc(u)}" target="_blank" rel="noopener"><span style="background:${c}">${l}</span>${esc(n)}</a>`).join('')}</div>`, 'bs-caf');
}
Object.assign(XACT, {
  tptaxi: () => tpTaxi(),
  tsopen: id => tsOpen(id),
  tsroute: id => { const x = UZT && UZT.rail.find(s => s.id === id); if (x) routeGeneric({ id: x.id, n: x.n, la: x.la, lo: x.lo }, TS_MAP, '#0F766E', tpIc('train', 16), () => tsOpen(id)); },
  flap: code => { fls().ap = code; render(current, currentP); },
  fldir: d => { fls().dir = d; render(current, currentP); },
  fltaxi: code => flTaxi(code),
});
AI_HIDE.add('h:trains'); AI_HIDE.add('h:flights');

// ======================= Weather, air quality, exchange rates (home header) =======================
const WX_I = {
  ru: { wx_t: 'Погода', wx_feels: 'Ощущается как {t}', wx_hum: 'Влажность', wx_wind: 'Ветер', wx_ms: 'м/с', wx_hours: 'По часам', wx_days: 'На неделю', wx_rain: 'Осадки', wx_air: 'Качество воздуха', wx_src: 'Данные Open-Meteo', wx_now: 'Сейчас', wx_today: 'Сегодня',
    aq_0: 'Хорошее', aq_1: 'Умеренное', aq_2: 'Вредно для чувствительных', aq_3: 'Вредно', aq_4: 'Очень вредно', aq_5: 'Опасно',
    aqa_0: 'Можно гулять и проветривать.', aqa_1: 'Чувствительным людям лучше сократить долгие прогулки.', aqa_2: 'Детям, пожилым и астматикам — меньше быть на улице; проветривайте реже.', aqa_3: 'Наденьте маску FFP2 на улице, закройте окна, включите очиститель воздуха.', aqa_4: 'Оставайтесь дома, если можно. На улице — маска FFP2.', aqa_5: 'Опасный уровень: не выходите без необходимости.',
    fx_t: 'Курсы валют ЦБ', fx_date: 'Официальный курс на {d}', fx_conv: 'Конвертер', fx_sum: 'сум', fx_src: 'Центральный банк Республики Узбекистан' },
  uz: { wx_t: 'Ob-havo', wx_feels: '{t} kabi seziladi', wx_hum: 'Namlik', wx_wind: 'Shamol', wx_ms: 'm/s', wx_hours: "Soatbay", wx_days: 'Hafta', wx_rain: 'Yog‘ingarchilik', wx_air: 'Havo sifati', wx_src: "Open-Meteo ma'lumotlari", wx_now: 'Hozir', wx_today: 'Bugun',
    aq_0: 'Yaxshi', aq_1: "O'rtacha", aq_2: 'Sezgirlar uchun zararli', aq_3: 'Zararli', aq_4: 'Juda zararli', aq_5: 'Xavfli',
    aqa_0: 'Sayr qilish va xonani shamollatish mumkin.', aqa_1: "Sezgir odamlar uzoq sayrlarni qisqartirgani ma'qul.", aqa_2: "Bolalar, keksalar va astmatiklar ko'chada kamroq bo'lsin.", aqa_3: "Ko'chada FFP2 niqob taqing, derazalarni yoping.", aqa_4: 'Iloji bo‘lsa uyda qoling. Ko‘chada — FFP2 niqob.', aqa_5: 'Xavfli daraja: zarurat bo‘lmasa chiqmang.',
    fx_t: 'MB valyuta kurslari', fx_date: '{d} holatiga rasmiy kurs', fx_conv: 'Konvertor', fx_sum: "so'm", fx_src: "O'zbekiston Respublikasi Markaziy banki" },
  en: { wx_t: 'Weather', wx_feels: 'Feels like {t}', wx_hum: 'Humidity', wx_wind: 'Wind', wx_ms: 'm/s', wx_hours: 'Hourly', wx_days: 'This week', wx_rain: 'Rain', wx_air: 'Air quality', wx_src: 'Data: Open-Meteo', wx_now: 'Now', wx_today: 'Today',
    aq_0: 'Good', aq_1: 'Moderate', aq_2: 'Unhealthy for sensitive groups', aq_3: 'Unhealthy', aq_4: 'Very unhealthy', aq_5: 'Hazardous',
    aqa_0: 'Fine for walks and airing the room.', aqa_1: 'Sensitive people should limit long walks.', aqa_2: 'Children, elderly and asthmatics should stay outside less.', aqa_3: 'Wear an FFP2 mask outside, keep windows closed, use an air purifier.', aqa_4: 'Stay home if you can; FFP2 mask outside.', aqa_5: 'Hazardous: avoid going out.',
    fx_t: 'Central Bank rates', fx_date: 'Official rate for {d}', fx_conv: 'Converter', fx_sum: 'sum', fx_src: 'Central Bank of the Republic of Uzbekistan' },
  zh: { wx_t: '天气', wx_feels: '体感 {t}', wx_hum: '湿度', wx_wind: '风速', wx_ms: '米/秒', wx_hours: '逐小时', wx_days: '本周', wx_rain: '降水', wx_air: '空气质量', wx_src: '数据：Open-Meteo', wx_now: '现在', wx_today: '今天',
    aq_0: '良好', aq_1: '中等', aq_2: '对敏感人群不健康', aq_3: '不健康', aq_4: '非常不健康', aq_5: '危险',
    aqa_0: '适合散步和开窗通风。', aqa_1: '敏感人群应减少长时间户外活动。', aqa_2: '儿童、老人和哮喘患者应减少外出。', aqa_3: '外出佩戴 FFP2 口罩，关闭门窗。', aqa_4: '尽量待在室内，外出戴 FFP2 口罩。', aqa_5: '危险：非必要不外出。',
    fx_t: '央行汇率', fx_date: '{d} 官方汇率', fx_conv: '换算', fx_sum: '苏姆', fx_src: '乌兹别克斯坦共和国中央银行' },
};
for (const l in WX_I) Object.assign(I[l], WX_I[l]);
const WX = {}; const WX_P = {};
function wxIcon(code, night) {
  if (code === 0) return night ? '🌙' : '☀️'; if (code <= 2) return night ? '🌙' : '🌤️'; if (code === 3) return '☁️'; if (code === 45 || code === 48) return '🌫️';
  if (code >= 51 && code <= 57) return '🌦️'; if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return '🌧️'; if ((code >= 71 && code <= 77) || code === 85 || code === 86) return '🌨️'; if (code >= 95) return '⛈️'; return '🌤️';
}
const AQ_COL = ['#22C55E', '#EAB308', '#F97316', '#EF4444', '#A855F7', '#7F1D1D'];
const aqLvl = v => v == null ? -1 : v <= 50 ? 0 : v <= 100 ? 1 : v <= 150 ? 2 : v <= 200 ? 3 : v <= 300 ? 4 : 5;
function wxLoad(ci = cityIdx()) {
  if (WX[ci] && Date.now() - WX[ci].at < 15 * 60e3) return Promise.resolve(WX[ci]);
  if (WX_P[ci]) return WX_P[ci];
  const c = CITIES[ci], q = `latitude=${c[5]}&longitude=${c[6]}&timezone=Asia%2FTashkent`;
  return (WX_P[ci] = Promise.all([
    fetch(`https://api.open-meteo.com/v1/forecast?${q}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,is_day&hourly=temperature_2m,weather_code,precipitation_probability,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=7&wind_speed_unit=ms`).then(r => r.json()),
    fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?${q}&current=us_aqi,pm2_5,pm10&hourly=us_aqi&forecast_days=2`).then(r => r.json()).catch(() => null),
  ]).then(([w, a]) => { WX_P[ci] = null; return (WX[ci] = { at: Date.now(), w, a }); }).catch(e => { WX_P[ci] = null; throw e; }));
}
let FX = null, FX_P = null;
function fxLoad() { if (FX) return Promise.resolve(FX); return FX_P || (FX_P = fetch(DATA_BASE + 'data/rates.json', { cache: 'no-cache' }).then(r => r.ok ? r.json() : null).then(j => (FX = j)).catch(() => null)); }
const fmtRate = v => v.toLocaleString('ru-RU', { maximumFractionDigits: v < 100 ? 2 : 0 }).replace(/ /g, ' ');
function drawWeather(layers) {
  const h = layers['f:1:1994']; if (!h) return;
  h.querySelectorAll('.wx-pill').forEach(e => e.remove());
  const mk = (x, w, cls) => { const d = document.createElement('div'); d.className = 'wx-pill ' + cls; d.style.left = P(x); d.style.top = P(52); d.style.width = P(w); d.style.height = P(36); d.style.borderRadius = P(18); h.appendChild(d); return d; };
  const wxp = mk(24, 102, 'wx-w'), aqp = mk(132, 92, 'wx-a'), fxp = mk(230, 112, 'wx-f');
  const z = html => `<div style="zoom:${U}">${html}</div>`;
  const ci = cityIdx();
  const paint = () => {
    const W = WX[ci];
    if (W && W.w && W.w.current) { const c = W.w.current; wxp.innerHTML = z(`<span class="wx-ic">${wxIcon(c.weather_code, !c.is_day)}</span><b>${c.temperature_2m > 0 ? '+' : ''}${Math.round(c.temperature_2m)}°C</b>`); }
    else wxp.innerHTML = z(`<span class="wx-ic">🌤️</span><b>${esc(liveText('temp'))}</b>`);
    const aq = W && W.a && W.a.current ? Math.round(W.a.current.us_aqi) : null, lv = aqLvl(aq);
    if (lv >= 0) aqp.innerHTML = z(`<span class="wx-dot" style="background:${AQ_COL[lv]}"></span><b>AQI ${aq}</b>`); else aqp.style.display = 'none';
    if (FX && FX.list) { const u = FX.list.find(x => x.c === 'USD'); if (u) fxp.innerHTML = z(`<b>$ ${fmtRate(u.r)}</b><i class="${u.d >= 0 ? 'up' : 'dn'}">${u.d >= 0 ? '▲' : '▼'}</i>`); } else fxp.style.display = 'none';
  };
  paint();
  wxLoad(ci).then(() => { if (document.body.contains(wxp)) { aqp.style.display = ''; paint(); } }).catch(() => {});
  fxLoad().then(() => { if (document.body.contains(fxp)) { fxp.style.display = ''; paint(); } });
  [wxp, aqp].forEach(e => e.addEventListener('click', ev => { ev.preventDefault(); ev.stopPropagation(); wxSheet(); }));
  fxp.addEventListener('click', ev => { ev.preventDefault(); ev.stopPropagation(); fxSheet(); });
}
function wxSheet() {
  const ci = cityIdx();
  const draw = () => {
    const W = WX[ci]; if (!W || !W.w || !W.w.current) return bsheet(`<div class="cf-empty">${esc(t('po_load'))}</div>`, 'bs-caf bs-wx');
    const c = W.w.current, hr = W.w.hourly, dy = W.w.daily;
    const nowI = Math.max(0, hr.time.findIndex(x => x >= String(c.time || hr.time[0]).slice(0, 13)));
    const hours = hr.time.slice(nowI, nowI + 24).map((tm, i) => `<div><i>${i ? tm.slice(11, 16) : esc(t('wx_now'))}</i><span>${wxIcon(hr.weather_code[nowI + i], !hr.is_day[nowI + i])}</span><b>${Math.round(hr.temperature_2m[nowI + i])}°</b>${hr.precipitation_probability[nowI + i] >= 30 ? `<em>${hr.precipitation_probability[nowI + i]}%</em>` : ''}</div>`).join('');
    const wd = t('wd').split('|');
    const days = dy.time.map((d, i) => `<div class="wx-day"><b>${i ? esc(wd[new Date(d + 'T12:00:00').getDay()]) : esc(t('wx_today'))}</b><span>${wxIcon(dy.weather_code[i])}</span><i>${dy.precipitation_probability_max[i] >= 30 ? '💧' + dy.precipitation_probability_max[i] + '%' : ''}</i><em>${Math.round(dy.temperature_2m_min[i])}°</em><strong>${Math.round(dy.temperature_2m_max[i])}°</strong></div>`).join('');
    const a = W.a && W.a.current, aq = a ? Math.round(a.us_aqi) : null, lv = aqLvl(aq);
    bsheet(`<div class="wx-top"><span>${wxIcon(c.weather_code, !c.is_day)}</span><div><b>${c.temperature_2m > 0 ? '+' : ''}${Math.round(c.temperature_2m)}°</b><i>${esc(cityName(ci))} · ${esc(t('wx_feels', { t: Math.round(c.apparent_temperature) + '°' }))}</i><i>${esc(t('wx_hum'))} ${c.relative_humidity_2m}% · ${esc(t('wx_wind'))} ${Math.round(c.wind_speed_10m)} ${esc(t('wx_ms'))}</i></div></div>
      ${lv >= 0 ? `<div class="wx-aq" style="border-color:${AQ_COL[lv]}55;background:${AQ_COL[lv]}12"><div class="wx-aqh"><span style="background:${AQ_COL[lv]}">${aq}</span><div><b>${esc(t('wx_air'))}: ${esc(t('aq_' + lv))}</b><i>PM2.5 ${Math.round(a.pm2_5)} · PM10 ${Math.round(a.pm10)} мкг/м³</i></div></div><p>${esc(t('aqa_' + lv))}</p></div>` : ''}
      <div class="cf-sec">${esc(t('wx_hours'))}</div><div class="wx-hours hs">${hours}</div>
      <div class="cf-sec">${esc(t('wx_days'))}</div><div class="h-card wx-days">${days}</div>
      <div class="h-muted small cam-note">${esc(t('wx_src'))}</div>`, 'bs-caf bs-wx');
  };
  if (WX[ci]) draw(); else { bsheet(`<div class="tg-wait"><span class="h-spin"></span>${esc(t('po_load'))}</div>`, 'bs-caf'); wxLoad(ci).then(draw).catch(() => { bsheetClose(); toast(t('po_err')); }); }
}
function fxSheet() {
  fxLoad().then(F => {
    if (!F) return toast(t('po_err'));
    const cur = F.list.filter(x => ['USD', 'EUR', 'RUB', 'KZT', 'CNY', 'GBP', 'TRY', 'AED', 'KRW'].includes(x.c));
    const nm = x => x[LANG === 'uz' ? 'uz' : LANG === 'en' || LANG === 'zh' ? 'en' : 'ru'];
    bsheet(`<div class="tr-hero"><span style="background:#15803D;color:#fff;font-weight:800;font-size:22px">$</span><div><b>${esc(t('fx_t'))}</b><i>${esc(t('fx_date', { d: F.date }))}</i></div></div>
      <div class="h-card fx-list">${cur.map(x => `<div class="fx-row"><b>${esc(x.c)}</b><i>${esc(x.n > 1 ? x.n + ' ' : '')}${esc(nm(x))}</i><span>${fmtRate(x.r)}</span><em class="${x.d >= 0 ? 'up' : 'dn'}">${x.d >= 0 ? '+' : ''}${fmtRate(x.d)}</em></div>`).join('')}</div>
      <div class="cf-sec">${esc(t('fx_conv'))}</div>
      <div class="fx-conv"><input id="fxA" inputmode="decimal" value="100"><select id="fxC">${cur.map(x => `<option value="${x.c}">${x.c}</option>`).join('')}</select></div>
      <div class="fx-out" id="fxO"></div>
      <div class="h-muted small cam-note">${esc(t('fx_src'))}</div>`, 'bs-caf');
    const A = document.getElementById('fxA'), C = document.getElementById('fxC'), O = document.getElementById('fxO');
    const upd = () => { const x = cur.find(y => y.c === C.value); const v = parseFloat(A.value.replace(',', '.').replace(/\s/g, '')) || 0; O.textContent = `= ${fmtRate(Math.round(v * x.r / x.n))} ${t('fx_sum')}`; };
    A.addEventListener('input', upd); C.addEventListener('change', upd); upd();
  });
}

// ======================= QR scanner (camera) =======================
const QR_I = {
  ru: { qr_t: 'Сканер QR', qr_hint: 'Наведите камеру на QR-код', qr_gal: 'Из галереи', qr_noc: 'Нет доступа к камере. Разрешите камеру в настройках браузера или выберите фото из галереи.', qr_none: 'QR-код на фото не найден', qr_link: 'Ссылка', qr_pay: 'Оплата', qr_open: 'Открыть', qr_copy: 'Скопировать', qr_copied: 'Скопировано', qr_again: 'Сканировать ещё', qr_text: 'Текст', qr_wifi: 'Wi-Fi', qr_net: 'Сеть', qr_pass: 'Пароль', qr_call: 'Позвонить', qr_safe: 'Открывайте ссылки только из надёжных источников.' },
  uz: { qr_t: 'QR skaner', qr_hint: 'Kamerani QR-kodga qarating', qr_gal: 'Galereyadan', qr_noc: "Kameraga ruxsat yo'q. Brauzer sozlamalarida kamerani yoqing yoki galereyadan rasm tanlang.", qr_none: 'Rasmda QR-kod topilmadi', qr_link: 'Havola', qr_pay: "To'lov", qr_open: 'Ochish', qr_copy: 'Nusxalash', qr_copied: 'Nusxalandi', qr_again: 'Yana skanerlash', qr_text: 'Matn', qr_wifi: 'Wi-Fi', qr_net: 'Tarmoq', qr_pass: 'Parol', qr_call: "Qo'ng'iroq", qr_safe: 'Havolalarni faqat ishonchli manbalardan oching.' },
  en: { qr_t: 'QR scanner', qr_hint: 'Point the camera at a QR code', qr_gal: 'From gallery', qr_noc: 'No camera access. Allow the camera in browser settings or pick a photo from the gallery.', qr_none: 'No QR code found in the photo', qr_link: 'Link', qr_pay: 'Payment', qr_open: 'Open', qr_copy: 'Copy', qr_copied: 'Copied', qr_again: 'Scan again', qr_text: 'Text', qr_wifi: 'Wi-Fi', qr_net: 'Network', qr_pass: 'Password', qr_call: 'Call', qr_safe: 'Open links only from sources you trust.' },
  zh: { qr_t: '二维码扫描', qr_hint: '将摄像头对准二维码', qr_gal: '从相册选择', qr_noc: '无法使用摄像头。请在浏览器设置中允许摄像头，或从相册选择照片。', qr_none: '照片中未找到二维码', qr_link: '链接', qr_pay: '支付', qr_open: '打开', qr_copy: '复制', qr_copied: '已复制', qr_again: '再次扫描', qr_text: '文本', qr_wifi: 'Wi-Fi', qr_net: '网络', qr_pass: '密码', qr_call: '拨打', qr_safe: '只打开可信来源的链接。' },
};
for (const l in QR_I) Object.assign(I[l], QR_I[l]);
let QR_STREAM = null, QR_LOOP = 0, QR_DET = null;
function qrLib() { if (window.jsQR) return Promise.resolve(); if (!window.__qrP) window.__qrP = new Promise((ok, no) => { const s = document.createElement('script'); s.src = 'vendor/jsqr/jsQR.min.js'; s.onload = ok; s.onerror = no; document.head.appendChild(s); }); return window.__qrP; }
function qrStop() { cancelAnimationFrame(QR_LOOP); if (QR_STREAM) { QR_STREAM.getTracks().forEach(t => t.stop()); QR_STREAM = null; } }
HS.qr = () => `<div class="h-hdr"><button class="h-back" data-act="back">${IC.back}</button><div class="h-title">${esc(t('qr_t'))}</div></div>
  <div class="qr-cam"><video id="qrV" playsinline muted autoplay></video><div class="qr-frame"><i></i><i></i><i></i><i></i></div><div class="qr-hint" id="qrH">${esc(t('qr_hint'))}</div></div>
  <div class="qr-bar"><label class="h-btn h-ghostd qr-gal">${esc(t('qr_gal'))}<input type="file" accept="image/*" id="qrF" hidden></label></div>`;
HS.qr.mount = el => {
  qrStop();
  const v = el.querySelector('#qrV'), hint = el.querySelector('#qrH'), cv = document.createElement('canvas'), cx = cv.getContext('2d', { willReadFrequently: true });
  if ('BarcodeDetector' in window) { try { QR_DET = new BarcodeDetector({ formats: ['qr_code'] }); } catch (e) { QR_DET = null; } }
  if (!QR_DET) qrLib().catch(() => {});
  const decode = async src => {
    const w = src.videoWidth || src.naturalWidth || src.width, h = src.videoHeight || src.naturalHeight || src.height; if (!w || !h) return null;
    if (QR_DET) { try { const r = await QR_DET.detect(src); if (r && r[0]) return r[0].rawValue; } catch (e) {} }
    if (!window.jsQR) return null;
    const k = Math.min(1, 640 / Math.max(w, h)); cv.width = Math.round(w * k); cv.height = Math.round(h * k);
    cx.drawImage(src, 0, 0, cv.width, cv.height);
    const d = cx.getImageData(0, 0, cv.width, cv.height); const r = window.jsQR(d.data, d.width, d.height, { inversionAttempts: 'attemptBoth' });
    return r ? r.data : null;
  };
  let last = 0, busy = false;
  const tick = async ts => {
    if (!document.body.contains(v)) return qrStop();
    QR_LOOP = requestAnimationFrame(tick);
    if (busy || ts - last < 180 || v.readyState < 2) return; last = ts; busy = true;
    const val = await decode(v); busy = false;
    if (val) { qrStop(); if (navigator.vibrate) navigator.vibrate(60); qrResult(val); }
  };
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 } }, audio: false }).then(s => {
      if (!document.body.contains(v)) { s.getTracks().forEach(t => t.stop()); return; }
      QR_STREAM = s; v.srcObject = s; v.play().catch(() => {}); QR_LOOP = requestAnimationFrame(tick);
    }).catch(() => { hint.textContent = t('qr_noc'); hint.classList.add('err'); });
  } else { hint.textContent = t('qr_noc'); hint.classList.add('err'); }
  el.querySelector('#qrF').addEventListener('change', e => {
    const f = e.target.files && e.target.files[0]; if (!f) return;
    const img = new Image(); img.onload = async () => { await qrLib().catch(() => {}); const val = await decode(img); URL.revokeObjectURL(img.src); if (val) { qrStop(); qrResult(val); } else toast(t('qr_none')); };
    img.src = URL.createObjectURL(f);
  });
};
function qrResult(val) {
  const s = String(val).trim(); let body = '';
  const copyBtn = txt => `<button class="h-btn h-ghostd" data-qrcopy="${esc(txt)}">${esc(t('qr_copy'))}</button>`;
  if (/^https?:\/\//i.test(s)) {
    let host = ''; try { host = new URL(s).hostname.replace(/^www\./, ''); } catch (e) {}
    const pay = /(^|\.)(payme\.uz|click\.uz|uzum\.uz|paynet\.uz|apelsin\.uz|paylov\.uz|my\.click\.uz|checkout\.paycom\.uz)$/.test(host) || /soliq\.uz$/.test(host);
    body = `<div class="tr-hero"><span style="background:${pay ? '#15803D' : '#2563EB'};color:#fff;font-size:24px">${pay ? '₊' : '🔗'}</span><div><b>${esc(pay ? t('qr_pay') : t('qr_link'))}</b><i>${esc(host)}</i></div></div>
      <div class="qr-val">${esc(s)}</div><a class="h-btn h-primary cf-callbtn" href="${esc(s)}" target="_blank" rel="noopener noreferrer">${esc(t('qr_open'))}</a>${copyBtn(s)}<div class="h-muted small cam-note">${esc(t('qr_safe'))}</div>`;
  } else if (/^WIFI:/i.test(s)) {
    const g = k => (s.match(new RegExp('[:;]' + k + ':((?:\\\\.|[^;])*)', 'i')) || [])[1] || '';
    const ssid = g('S').replace(/\\(.)/g, '$1'), pass = g('P').replace(/\\(.)/g, '$1');
    body = `<div class="tr-hero"><span style="background:#0891B2;color:#fff;font-size:22px">📶</span><div><b>${esc(t('qr_wifi'))}</b><i>${esc(ssid)}</i></div></div>
      <div class="h-card cf-info"><div class="cf-row"><span>${esc(t('qr_net'))}</span><div>${esc(ssid)}</div></div>${pass ? `<div class="cf-row"><span>${esc(t('qr_pass'))}</span><div>${esc(pass)}</div></div>` : ''}</div>${pass ? copyBtn(pass) : ''}`;
  } else if (/^tel:/i.test(s)) {
    body = `<div class="tr-hero"><span style="background:#15803D;color:#fff;font-size:22px">📞</span><div><b>${esc(s.slice(4))}</b></div></div><a class="h-btn h-primary cf-callbtn" href="${esc(s)}">${esc(t('qr_call'))}</a>`;
  } else {
    body = `<div class="tr-hero"><span style="background:#6B7280;color:#fff;font-size:22px">≡</span><div><b>${esc(t('qr_text'))}</b></div></div><div class="qr-val">${esc(s)}</div>${copyBtn(s)}`;
  }
  const w = bsheet(body + `<button class="h-btn h-ghostd qr-again" data-act="qragain">${esc(t('qr_again'))}</button>`, 'bs-caf');
  w.addEventListener('click', e => { const b = e.target.closest('[data-qrcopy]'); if (!b) return; e.preventDefault(); e.stopPropagation(); const txt = b.dataset.qrcopy; (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => toast(t('qr_copied'))).catch(() => {}); });
}
Object.assign(XACT, { qragain: () => { bsheetClose(true); if (current === 'h:qr') render('h:qr'); else go('h:qr'); } });
AI_HIDE.add('h:qr');

// ======================= More city maps: EV chargers, speed cameras, schools, public offices, sights =======================
const P2_I = {
  ru: { ev_t: 'Электрозарядки', po_q_ev: 'Название или оператор', evc_fast: 'Быстрые (CCS/CHAdeMO)', evc_type2: 'Type 2', evc_gbt: 'GB/T', evc_free: 'Бесплатные', ev_kind: 'Зарядная станция', ev_so: 'Разъёмы', ev_kw: 'Мощность', ev_cap: 'Мест',
    sc_t: 'Камеры скорости', po_q_speedcam: 'Улица', sc_kind: 'Камера контроля скорости', sc_ms: 'Ограничение', scc_60: 'до 60 км/ч', scc_80: '70–80 км/ч', scc_100: '90+ км/ч',
    ed_t: 'Школы и детсады', po_q_edu: 'Название или номер школы', edc_school: 'Школы', edc_kindergarten: 'Детсады', edc_college: 'Колледжи', edc_university: 'Вузы', edc_pr: 'Частные', edk_school: 'Школа', edk_kindergarten: 'Детский сад', edk_college: 'Колледж', edk_university: 'Университет', ed_pr: 'Частное',
    gv_t: 'Госучреждения', po_q_gov: 'Центр госуслуг, хокимият…', gvc_cgu: 'Центры госуслуг', gvc_hokim: 'Хокимияты', gvc_pq: 'Народные приёмные', gvc_gov: 'Другие', gvk_cgu: 'Центр госуслуг', gvk_hokim: 'Хокимият', gvk_pq: 'Народная приёмная', gvk_gov: 'Госучреждение',
    sg_t: 'Достопримечательности', po_q_sight: 'Название места', sgc_hist: 'История', sgc_museum: 'Музеи', sgc_view: 'Виды', sgc_park: 'Парки и зоо', sgc_attr: 'Интересное', sgc_art: 'Искусство', sgk_hist: 'Памятник истории', sgk_museum: 'Музей', sgk_view: 'Смотровая площадка', sgk_park: 'Парк', sgk_attr: 'Достопримечательность', sgk_art: 'Арт-объект', sg_free: 'Вход свободный', sg_paid: 'Вход платный', sg_wiki: 'Читать в Википедии', sg_ai: 'Рассказать подробнее (ИИ)' },
  uz: { ev_t: 'Elektr zaryadlash', po_q_ev: 'Nomi yoki operator', evc_fast: 'Tezkor (CCS/CHAdeMO)', evc_type2: 'Type 2', evc_gbt: 'GB/T', evc_free: 'Bepul', ev_kind: 'Zaryadlash stansiyasi', ev_so: 'Ulagichlar', ev_kw: 'Quvvat', ev_cap: 'Joylar',
    sc_t: 'Tezlik kameralari', po_q_speedcam: "Ko'cha", sc_kind: 'Tezlikni nazorat qilish kamerasi', sc_ms: 'Cheklov', scc_60: '60 km/s gacha', scc_80: '70–80 km/s', scc_100: '90+ km/s',
    ed_t: "Maktab va bog'chalar", po_q_edu: 'Nomi yoki maktab raqami', edc_school: 'Maktablar', edc_kindergarten: "Bog'chalar", edc_college: 'Kollejlar', edc_university: 'OTMlar', edc_pr: 'Xususiy', edk_school: 'Maktab', edk_kindergarten: "Bolalar bog'chasi", edk_college: 'Kollej', edk_university: 'Universitet', ed_pr: 'Xususiy',
    gv_t: 'Davlat idoralari', po_q_gov: 'Davlat xizmatlari markazi, hokimiyat…', gvc_cgu: 'Davlat xizmatlari markazlari', gvc_hokim: 'Hokimiyatlar', gvc_pq: 'Xalq qabulxonalari', gvc_gov: 'Boshqalar', gvk_cgu: 'Davlat xizmatlari markazi', gvk_hokim: 'Hokimiyat', gvk_pq: 'Xalq qabulxonasi', gvk_gov: 'Davlat idorasi',
    sg_t: 'Diqqatga sazovor joylar', po_q_sight: 'Joy nomi', sgc_hist: 'Tarix', sgc_museum: 'Muzeylar', sgc_view: "Manzaralar", sgc_park: "Park va hayvonot bog'i", sgc_attr: 'Qiziqarli', sgc_art: "San'at", sgk_hist: 'Tarixiy yodgorlik', sgk_museum: 'Muzey', sgk_view: 'Kuzatuv maydoni', sgk_park: 'Park', sgk_attr: 'Diqqatga sazovor joy', sgk_art: "San'at obyekti", sg_free: 'Kirish bepul', sg_paid: 'Kirish pullik', sg_wiki: "Vikipediyada o'qish", sg_ai: "Batafsil aytib ber (AI)" },
  en: { ev_t: 'EV charging', po_q_ev: 'Name or operator', evc_fast: 'Fast (CCS/CHAdeMO)', evc_type2: 'Type 2', evc_gbt: 'GB/T', evc_free: 'Free', ev_kind: 'Charging station', ev_so: 'Connectors', ev_kw: 'Power', ev_cap: 'Spaces',
    sc_t: 'Speed cameras', po_q_speedcam: 'Street', sc_kind: 'Speed camera', sc_ms: 'Limit', scc_60: 'up to 60 km/h', scc_80: '70–80 km/h', scc_100: '90+ km/h',
    ed_t: 'Schools & kindergartens', po_q_edu: 'Name or school number', edc_school: 'Schools', edc_kindergarten: 'Kindergartens', edc_college: 'Colleges', edc_university: 'Universities', edc_pr: 'Private', edk_school: 'School', edk_kindergarten: 'Kindergarten', edk_college: 'College', edk_university: 'University', ed_pr: 'Private',
    gv_t: 'Public offices', po_q_gov: 'Public service centre, hokimiyat…', gvc_cgu: 'Public service centres', gvc_hokim: 'Hokimiyats', gvc_pq: "People's reception offices", gvc_gov: 'Other', gvk_cgu: 'Public service centre', gvk_hokim: 'Hokimiyat', gvk_pq: "People's reception", gvk_gov: 'Public office',
    sg_t: 'Sights', po_q_sight: 'Place name', sgc_hist: 'History', sgc_museum: 'Museums', sgc_view: 'Viewpoints', sgc_park: 'Parks & zoo', sgc_attr: 'Attractions', sgc_art: 'Art', sgk_hist: 'Historic monument', sgk_museum: 'Museum', sgk_view: 'Viewpoint', sgk_park: 'Park', sgk_attr: 'Attraction', sgk_art: 'Artwork', sg_free: 'Free entry', sg_paid: 'Paid entry', sg_wiki: 'Read on Wikipedia', sg_ai: 'Tell me more (AI)' },
};
P2_I.zh = P2_I.en;
for (const l in P2_I) Object.assign(I[l], P2_I[l]);
Object.assign(PO_SVG, {
  ev: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  speedcam: '<path d="M3 8h12v8H3zM15 10l6-3v10l-6-3"/><circle cx="9" cy="12" r="2"/>',
  school: '<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>', kindergarten: '<circle cx="12" cy="6" r="3"/><path d="M12 9v7M8 21l4-5 4 5M7 12h10"/>', college: '<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>', university: '<path d="M3 21h18M4 10h16M12 3 3 8h18zM6 10v8M10 10v8M14 10v8M18 10v8"/>',
  gov: '<path d="M3 21h18M4 10h16M12 3 3 8h18zM6 10v8M10 10v8M14 10v8M18 10v8"/>',
  sight: '<path d="M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 16.8 5.8 20.3l1.6-6.8L2.2 8.9l6.9-.6z"/>',
});
PO_DATA.ev = {}; PO_DATA.speedcam = {}; PO_DATA.edu = {}; PO_DATA.gov = {}; PO_DATA.sight = {};
const ED_COL = { school: '#2563EB', kindergarten: '#EC4899', college: '#0891B2', university: '#7C3AED' };
const GV_COL = { cgu: '#15803D', hokim: '#1D4ED8', pq: '#B45309', gov: '#64748B' };
const SG_COL = { hist: '#B45309', museum: '#7C3AED', view: '#0891B2', park: '#16A34A', attr: '#DB2777', art: '#EA580C' };
const msOf = p => p.ms || 0;
Object.assign(PO_K, {
  ev: { title: 'ev_t', cats: ['fast', 'type2', 'gbt', 'free'], extraH: 0, foot: false,
    has: (p, c) => c === 'free' ? p.f === 0 : c === 'fast' ? /combo|ccs|chademo/i.test(p.so || '') : c === 'type2' ? /type2(?!_combo)/i.test(p.so || '') : /gb_?t/i.test(p.so || ''),
    col: p => /combo|ccs|chademo/i.test(p.so || '') ? '#7C3AED' : '#0EA5E9', ic: () => 'ev', name: p => p.n || p.op || t('ev_kind'),
    sub: p => [p.op && p.n ? p.op : '', (p.so || '').replace(/_/g, ' ').replace(/,/g, ', '), p.kw ? p.kw : ''].filter(Boolean).join(' · ') || t('ev_kind') },
  speedcam: { title: 'sc_t', cats: ['60', '80', '100'], extraH: 0, foot: false,
    has: (p, c) => c === '60' ? msOf(p) && msOf(p) <= 60 : c === '80' ? msOf(p) > 60 && msOf(p) <= 80 : msOf(p) > 80,
    col: p => !msOf(p) ? '#DC2626' : msOf(p) <= 60 ? '#DC2626' : msOf(p) <= 80 ? '#EA580C' : '#CA8A04', ic: () => 'speedcam', name: p => p.n || (msOf(p) ? `${t('sc_kind')} · ${msOf(p)} км/ч` : t('sc_kind')), sub: p => [msOf(p) ? `${t('sc_ms')}: ${msOf(p)} км/ч` : '', p.ad || ''].filter(Boolean).join(' · ') || t('sc_kind') },
  edu: { title: 'ed_t', cats: ['school', 'kindergarten', 'college', 'university', 'pr'], extraH: 0, foot: true,
    has: (p, c) => c === 'pr' ? p.pr : p.a === c, col: p => ED_COL[p.a] || '#2563EB', ic: p => p.a, name: p => p.n, sub: p => [t('edk_' + p.a), p.pr ? t('ed_pr') : ''].filter(Boolean).join(' · ') },
  gov: { title: 'gv_t', cats: ['cgu', 'hokim', 'pq', 'gov'], extraH: 0, foot: true,
    has: (p, c) => p.a === c, col: p => GV_COL[p.a] || '#64748B', ic: () => 'gov', name: p => p.n, sub: p => t('gvk_' + p.a) },
  sight: { title: 'sg_t', cats: ['hist', 'museum', 'park', 'view', 'attr', 'art'], extraH: 0, foot: true,
    has: (p, c) => p.a === c, col: p => SG_COL[p.a] || '#DB2777', ic: () => 'sight', name: p => p.n, sub: p => [t('sgk_' + p.a), p.f === 0 ? t('sg_free') : ''].filter(Boolean).join(' · ') },
});
// chip labels for the new kinds
const P2_PREFIX = { ev: 'evc_', speedcam: 'scc_', edu: 'edc_', gov: 'gvc_', sight: 'sgc_' };
const P2_CHIPCOL = { ev: { fast: '#7C3AED', type2: '#0EA5E9', gbt: '#0EA5E9', free: '#16A34A' }, speedcam: { 60: '#DC2626', 80: '#EA580C', 100: '#CA8A04' }, edu: ED_COL, gov: GV_COL, sight: SG_COL };
// Wikipedia summary for sights (photo + short description)
function sgWiki(p) {
  if (!p.wp) return Promise.resolve(null);
  const m = p.wp.match(/^([a-z-]+):(.+)$/); if (!m) return Promise.resolve(null);
  return fetch(`https://${m[1]}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(m[2].replace(/ /g, '_'))}`).then(r => r.ok ? r.json() : null).catch(() => null);
}

// ======================= Community: polls, problem reports, document reminders, panic button =======================
const CM_I = {
  ru: { need_login: 'Нужно войти', need_login_s: 'Чтобы голосовать, отправлять сообщения и получать напоминания, войдите через Telegram — это займёт минуту.',
    pl_t: 'Опросы', pl_t_m: 'Опросы махалли', pl_votes: 'Голосов: {n}', pl_left: 'осталось {n} дн.', pl_closed: 'Опрос завершён', pl_yours: 'Ваш голос', pl_change: 'Голос можно изменить', pl_thx: 'Голос учтён', pl_src: 'Один голос на одного жителя (вход через Telegram)',
    rp_t: 'Проблемы в городе', rp_t_road: 'Дороги и ремонт', rp_t_clean: 'Чистый город', rp_t_appeal: 'Обращения жителей', rp_add: 'Сообщить о проблеме', rp_none: 'Пока нет сообщений — будьте первым', rp_kind: 'Что случилось?', rp_text: 'Опишите проблему', rp_text_ph: 'Например: глубокая яма у остановки, опасно для машин', rp_photo: 'Добавить фото', rp_photo2: 'Заменить фото', rp_where: 'Место', rp_here: 'Моё местоположение', rp_pick: 'Нажмите на карту, чтобы указать место', rp_send: 'Отправить', rp_ok: 'Сообщение №{n} отправлено', rp_up: 'У меня тоже', rp_upped: 'Вы поддержали', rp_ups: 'Поддержали: {n}', rp_err: 'Не удалось отправить', rp_need: 'Добавьте описание или фото',
    rk_road: 'Яма / дорога', rk_light: 'Не горит свет', rk_clean: 'Мусор / свалка', rk_water: 'Вода / канализация', rk_park: 'Парк / двор', rk_transport: 'Транспорт / остановка', rk_other: 'Другое',
    rs_new: 'Новое', rs_work: 'В работе', rs_done: 'Решено', rp_src: 'Сообщения жителей видны всем. Не публикуйте лица и номера машин крупным планом.',
    dc_t: 'Сроки документов', dc_s: 'Бот в Telegram напомнит за 30, 7 и 1 день до окончания', dc_add: 'Добавить документ', dc_kind: 'Документ', dc_title: 'Подпись (необязательно)', dc_date: 'Действует до', dc_save: 'Сохранить', dc_none: 'Добавьте паспорт, права, страховку — напомним заранее', dc_left: 'осталось {n} дн.', dc_exp: 'просрочен', dc_today: 'истекает сегодня',
    dk_passport: 'Паспорт', dk_idcard: 'ID-карта', dk_intl: 'Загранпаспорт', dk_license: 'Водительские права', dk_inspection: 'Техосмотр', dk_insurance: 'Страховка ОСАГО', dk_tinting: 'Разрешение на тонировку', dk_gas: 'Газовый баллон', dk_poa: 'Доверенность', dk_other: 'Другое',
    sos_t: 'SOS близким', sos_s: 'Отправит вашу геолокацию всем близким в Telegram', sos_btn: 'Отправить SOS', sos_q: 'Отправить тревогу близким?', sos_q_s: 'Они получат сообщение и вашу геолокацию в Telegram.', sos_ok: 'Тревога отправлена: {n}', sos_none: 'Сначала добавьте близких', sos_err: 'Не удалось отправить — позвоните 112',
    tc_t: 'Мои близкие', tc_add: 'Добавить близкого', tc_add_s: 'Отправьте ссылку близкому человеку — он откроет бота и станет вашим доверенным контактом', tc_share: 'Отправить ссылку', tc_copy: 'Скопировать ссылку', tc_none: 'Пока никого нет', tc_rm: 'Удалить', call_go: 'Позвонить' },
  uz: { need_login: 'Kirish kerak', need_login_s: "Ovoz berish, xabar yuborish va eslatmalar olish uchun Telegram orqali kiring — bir daqiqa vaqt oladi.",
    pl_t: "So'rovnomalar", pl_t_m: "Mahalla so'rovnomalari", pl_votes: '{n} ovoz', pl_left: '{n} kun qoldi', pl_closed: "So'rovnoma yakunlandi", pl_yours: 'Sizning ovozingiz', pl_change: "Ovozni o'zgartirish mumkin", pl_thx: 'Ovoz qabul qilindi', pl_src: 'Har bir aholiga bitta ovoz (Telegram orqali kirish)',
    rp_t: 'Shahardagi muammolar', rp_t_road: "Yo'llar va ta'mirlash", rp_t_clean: 'Toza shahar', rp_t_appeal: 'Aholi murojaatlari', rp_add: 'Muammo haqida xabar berish', rp_none: "Hozircha xabarlar yo'q — birinchi bo'ling", rp_kind: 'Nima bo‘ldi?', rp_text: 'Muammoni yozing', rp_text_ph: "Masalan: bekat yonida chuqur o'ra", rp_photo: "Rasm qo'shish", rp_photo2: 'Rasmni almashtirish', rp_where: 'Joy', rp_here: 'Mening joylashuvim', rp_pick: "Joyni ko'rsatish uchun xaritani bosing", rp_send: 'Yuborish', rp_ok: '№{n} xabar yuborildi', rp_up: 'Menda ham', rp_upped: "Qo'llab-quvvatladingiz", rp_ups: "Qo'llab-quvvatladi: {n}", rp_err: "Yuborib bo'lmadi", rp_need: "Tavsif yoki rasm qo'shing",
    rk_road: "O'ra / yo'l", rk_light: 'Chiroq yonmayapti', rk_clean: 'Axlat', rk_water: 'Suv / kanalizatsiya', rk_park: 'Park / hovli', rk_transport: 'Transport / bekat', rk_other: 'Boshqa',
    rs_new: 'Yangi', rs_work: 'Ishda', rs_done: 'Hal qilindi', rp_src: "Aholi xabarlari hammaga ko'rinadi. Yuzlar va avtomobil raqamlarini yaqindan joylamang.",
    dc_t: 'Hujjatlar muddati', dc_s: 'Telegram bot muddat tugashidan 30, 7 va 1 kun oldin eslatadi', dc_add: "Hujjat qo'shish", dc_kind: 'Hujjat', dc_title: 'Izoh (ixtiyoriy)', dc_date: 'Amal qiladi', dc_save: 'Saqlash', dc_none: "Pasport, guvohnoma, sug'urtani qo'shing — oldindan eslatamiz", dc_left: '{n} kun qoldi', dc_exp: "muddati o'tgan", dc_today: 'bugun tugaydi',
    dk_passport: 'Pasport', dk_idcard: 'ID-karta', dk_intl: 'Xorijiy pasport', dk_license: 'Haydovchilik guvohnomasi', dk_inspection: "Texnik ko'rik", dk_insurance: "OSAGO sug'urtasi", dk_tinting: 'Tonirovka ruxsatnomasi', dk_gas: 'Gaz ballon', dk_poa: 'Ishonchnoma', dk_other: 'Boshqa',
    sos_t: 'Yaqinlarga SOS', sos_s: 'Joylashuvingizni Telegramda barcha yaqinlaringizga yuboradi', sos_btn: 'SOS yuborish', sos_q: 'Yaqinlarga signal yuborilsinmi?', sos_q_s: 'Ular Telegramda xabar va joylashuvingizni oladi.', sos_ok: 'Signal yuborildi: {n}', sos_none: "Avval yaqinlaringizni qo'shing", sos_err: "Yuborib bo'lmadi — 112 ga qo'ng'iroq qiling",
    tc_t: 'Yaqinlarim', tc_add: "Yaqin odam qo'shish", tc_add_s: "Havolani yaqin odamga yuboring — u botni ochib, ishonchli kontaktingiz bo'ladi", tc_share: 'Havolani yuborish', tc_copy: 'Havolani nusxalash', tc_none: "Hozircha hech kim yo'q", tc_rm: "O'chirish", call_go: "Qo'ng'iroq qilish" },
  en: { need_login: 'Sign in required', need_login_s: 'Sign in with Telegram to vote, send reports and get reminders — it takes a minute.',
    pl_t: 'Polls', pl_t_m: 'Mahalla polls', pl_votes: '{n} votes', pl_left: '{n} days left', pl_closed: 'Poll closed', pl_yours: 'Your vote', pl_change: 'You can change your vote', pl_thx: 'Vote counted', pl_src: 'One vote per resident (sign in with Telegram)',
    rp_t: 'City problems', rp_t_road: 'Roads and repairs', rp_t_clean: 'Clean city', rp_t_appeal: 'Residents’ reports', rp_add: 'Report a problem', rp_none: 'No reports yet — be the first', rp_kind: 'What happened?', rp_text: 'Describe the problem', rp_text_ph: 'E.g. a deep pothole near the bus stop', rp_photo: 'Add a photo', rp_photo2: 'Replace photo', rp_where: 'Place', rp_here: 'My location', rp_pick: 'Tap the map to set the place', rp_send: 'Send', rp_ok: 'Report #{n} sent', rp_up: 'Me too', rp_upped: 'You supported it', rp_ups: 'Supported: {n}', rp_err: 'Could not send', rp_need: 'Add a description or a photo',
    rk_road: 'Pothole / road', rk_light: 'Street light out', rk_clean: 'Garbage / dump', rk_water: 'Water / sewage', rk_park: 'Park / yard', rk_transport: 'Transport / stop', rk_other: 'Other',
    rs_new: 'New', rs_work: 'In progress', rs_done: 'Solved', rp_src: 'Residents’ reports are public. Avoid close-ups of faces and licence plates.',
    dc_t: 'Document expiry', dc_s: 'The Telegram bot reminds you 30, 7 and 1 day before', dc_add: 'Add a document', dc_kind: 'Document', dc_title: 'Note (optional)', dc_date: 'Valid until', dc_save: 'Save', dc_none: 'Add your passport, licence, insurance — we will remind you in time', dc_left: '{n} days left', dc_exp: 'expired', dc_today: 'expires today',
    dk_passport: 'Passport', dk_idcard: 'ID card', dk_intl: 'International passport', dk_license: 'Driving licence', dk_inspection: 'Vehicle inspection', dk_insurance: 'OSAGO insurance', dk_tinting: 'Tinting permit', dk_gas: 'Gas cylinder', dk_poa: 'Power of attorney', dk_other: 'Other',
    sos_t: 'SOS to family', sos_s: 'Sends your location to all your trusted contacts in Telegram', sos_btn: 'Send SOS', sos_q: 'Send an alert to your contacts?', sos_q_s: 'They will get a message and your location in Telegram.', sos_ok: 'Alert sent: {n}', sos_none: 'Add trusted contacts first', sos_err: 'Could not send — call 112',
    tc_t: 'My trusted contacts', tc_add: 'Add a contact', tc_add_s: 'Send the link to a relative — they open the bot and become your trusted contact', tc_share: 'Send the link', tc_copy: 'Copy link', tc_none: 'Nobody yet', tc_rm: 'Remove', call_go: 'Call' },
};
I.zh && Object.assign(CM_I, { zh: CM_I.en });
for (const l in CM_I) Object.assign(I[l], Object.assign({}, CM_I.en, CM_I[l]));
const API = AI_OWN.replace(/\/api\/assistant$/, '');
function authTok() { try { return localStorage.getItem('uzk-session'); } catch (e) { return null; } }
function api(path, body) {
  const h = { 'content-type': 'application/json' }; const tk = authTok(); if (tk) h.authorization = 'Bearer ' + tk;
  return fetch(API + path, body ? { method: 'POST', headers: h, body: JSON.stringify(body) } : { headers: h, cache: 'no-store' }).then(async r => { const j = await r.json().catch(() => ({})); if (r.status === 401) { try { localStorage.removeItem('uzk-session'); localStorage.removeItem('uzk-user'); } catch (e) {} } j._status = r.status; return j; });
}
function needLogin() {
  if (authUser() && authTok()) return false;
  bsheet(`<div class="tr-hero"><span style="background:#229ED9">${TG_SVG.replace(/22/g, '28')}</span><div><b>${esc(t('need_login'))}</b><i>@MyUzCity_bot</i></div></div><p class="tp-p">${esc(t('need_login_s'))}</p><button class="h-btn h-tgbtn" data-act="tglogin">${TG_SVG}<span>${esc(t('tg_login'))}</span></button>`, 'bs-caf');
  return true;
}
const SHEET_ACT = {};

// ---- polls
let PL = {};
HS.polls = (scope) => {
  const sc = scope === 'mahalla' ? 'mahalla' : 'city'; window.__plScope = sc;
  return `${hdr(t(sc === 'mahalla' ? 'pl_t_m' : 'pl_t'))}<div class="h-body pl-body" id="plList"><div class="cf-empty">${esc(t('po_load'))}</div></div>`;
};
HS.polls.mount = () => { const sc = window.__plScope; if (PL[sc]) plRender(); api('/api/polls?scope=' + sc).then(j => { if (j.ok) { PL[sc] = j.polls; plRender(); } else if (!PL[sc]) { const l = document.getElementById('plList'); if (l) l.innerHTML = `<div class="cf-empty">${esc(t('po_err'))}</div>`; } }); };
function plRender() {
  const l = document.getElementById('plList'); if (!l) return; const list = PL[window.__plScope] || [];
  const now = Date.now() / 1000;
  l.innerHTML = list.map(p => {
    const closed = p.ends && p.ends < now, max = Math.max(1, p.total);
    return `<div class="pl-card"><b class="pl-q">${esc(p.q)}</b><div class="pl-meta">👥 ${esc(t('pl_votes', { n: p.total }))} · ${esc(closed ? t('pl_closed') : t('pl_left', { n: Math.max(1, Math.ceil((p.ends - now) / 86400)) }))}</div>
      ${p.options.map((o, i) => { const pc = Math.round(p.counts[i] * 100 / max); return `<button class="pl-opt ${p.mine === i ? 'on' : ''}" data-act="plvote:${p.id}:${i}" ${closed ? 'disabled' : ''}><span class="pl-bar" style="width:${p.mine != null || closed ? pc : 0}%"></span><span class="pl-tx">${p.mine === i ? '✓ ' : ''}${esc(o)}</span>${p.mine != null || closed ? `<b>${pc}%</b>` : ''}</button>`; }).join('')}
      ${p.mine != null ? `<div class="pl-note">${esc(t('pl_change'))}</div>` : ''}</div>`;
  }).join('') + `<div class="h-muted small cam-note">${esc(t('pl_src'))}</div>`;
}
SHEET_ACT.plvote = a => { if (needLogin()) return; const [id, opt] = a.split(':').map(Number); api('/api/polls', { id, opt }).then(j => { if (j.ok) { PL[window.__plScope] = j.polls; plRender(); toast(t('pl_thx')); } else toast(t('po_err')); }); };

// ---- problem reports
const RP_KINDS = ['road', 'light', 'clean', 'water', 'park', 'transport', 'other'];
const RP_COL = { new: '#DC2626', work: '#D97706', done: '#16A34A' };
const RP_IC = { road: '🕳️', light: '💡', clean: '🗑️', water: '💧', park: '🌳', transport: '🚌', other: '📌' };
const rps = () => (window.__rps = window.__rps || { kind: 'all', list: null, form: null });
HS.reports = (k) => {
  const s = rps(); s.view = k || 'all';
  const title = k === 'road' ? 'rp_t_road' : k === 'clean' ? 'rp_t_clean' : k === 'appeal' ? 'rp_t_appeal' : 'rp_t';
  return `${hdr(t(title))}<div class="cf-mapph" style="height:${Math.min(300, Math.max(210, Math.round(VH * .34)))}px"></div>
    <div class="h-body cf-body" id="rpList"><div class="cf-empty">${esc(t('po_load'))}</div></div>
    <button class="cf-aibtn rp-add" data-act="rpnew">＋ <span>${esc(t('rp_add'))}</span></button>`;
};
let RP_MAP = null, RP_LAY = null;
HS.reports.mount = el => {
  const mw = mapAt(el, el.querySelector('.cf-mapph'));
  mw.addEventListener('click', e => { const b = e.target.closest('[data-cf]'); if (!b) return; e.preventDefault(); e.stopPropagation(); if (b.dataset.cf === 'me') geo().then(l => { caf().loc = l; if (RP_MAP) RP_MAP.flyTo(l, 15); }).catch(() => toast(t('caf_geo_err'))); });
  leafletReady().then(() => {
    if (!document.body.contains(mw)) return;
    const c = CITIES[cityIdx()];
    RP_MAP = tiles(L.map(mw.querySelector('#cfMap'), { zoomControl: false, preferCanvas: true }).setView(caf().loc || [c[5], c[6]], caf().loc ? 14 : 12));
    RP_LAY = L.layerGroup().addTo(RP_MAP);
    rpLoad();
  });
};
function rpKinds() { const v = rps().view; return v === 'road' ? ['road', 'light', 'transport'] : v === 'clean' ? ['clean', 'park', 'water'] : RP_KINDS; }
function rpLoad() { api('/api/reports').then(j => { if (j.ok) { rps().list = j.list; rpRender(); } else { const l = document.getElementById('rpList'); if (l) l.innerHTML = `<div class="cf-empty">${esc(t('po_err'))}</div>`; } }); }
function rpRender() {
  const l = document.getElementById('rpList'); if (!l) return; const ks = rpKinds();
  const list = (rps().list || []).filter(r => ks.includes(r.kind));
  l.innerHTML = (list.length ? list.map(r => `<button class="cf-item" data-act="rpopen:${r.id}"><span class="cf-ic" style="background:${RP_COL[r.status] || '#6B7280'}1f;font-size:20px">${RP_IC[r.kind] || '📌'}</span><span class="cf-it"><b>${esc(t('rk_' + r.kind))}</b><i>${esc(r.text || '')}</i><i>${esc(fmtDate(new Date(r.created * 1000).toISOString(), false))} · ${esc(t('rp_ups', { n: r.ups }))}</i></span><span class="rp-st" style="color:${RP_COL[r.status]};background:${RP_COL[r.status]}14">${esc(t('rs_' + r.status))}</span></button>`).join('') : `<div class="cf-empty">${esc(t('rp_none'))}</div>`) + `<div class="h-muted small cam-note">${esc(t('rp_src'))}</div>`;
  if (RP_LAY) { RP_LAY.clearLayers(); list.forEach(r => { const m = L.circleMarker([r.la, r.lo], { radius: 8, color: '#fff', weight: 2, fillColor: RP_COL[r.status] || '#6B7280', fillOpacity: 1 }); m.on('click', () => rpOpen(r.id)); m.addTo(RP_LAY); }); }
}
function rpOpen(id) {
  const r = (rps().list || []).find(x => x.id === id); if (!r) return;
  if (RP_MAP) RP_MAP.panTo([r.la, r.lo]);
  bsheet(`${r.ph ? `<div class="cf-photo" style="background-image:url('${API}/api/reports/photo?id=${r.id}')"></div>` : ''}
    <div class="cf-name">${RP_IC[r.kind] || ''} ${esc(t('rk_' + r.kind))}</div>
    <div class="cf-tags"><span style="background:${RP_COL[r.status]}1a;color:${RP_COL[r.status]}">${esc(t('rs_' + r.status))}</span><span>№${r.id}</span><span>${esc(fmtDate(new Date(r.created * 1000).toISOString()))}</span></div>
    ${r.text ? `<p class="tp-p">${esc(r.text)}</p>` : ''}
    <button class="h-btn ${r.up ? 'h-ghostd' : 'h-primary'}" data-act="rpup:${r.id}" ${r.up || r.own ? 'disabled' : ''}>👍 ${esc(r.up ? t('rp_upped') : t('rp_up'))} · ${r.ups}</button>
    <div class="cf-routes" style="margin-top:12px">${navLinks({ la: r.la, lo: r.lo }, null, 'foot').map(([n, u, c, l]) => `<a href="${esc(u)}" target="_blank" rel="noopener"><span style="background:${c}">${l}</span>${esc(n)}</a>`).join('')}</div>`, 'bs-caf');
}
SHEET_ACT.rpopen = id => rpOpen(+id);
SHEET_ACT.rpup = id => { if (needLogin()) return; api('/api/reports', { action: 'up', id: +id }).then(j => { if (j.ok) { const r = rps().list.find(x => x.id === +id); if (r) { r.up = true; r.ups++; } bsheetClose(true); rpRender(); toast(t('rp_upped')); } }); };
SHEET_ACT.rpnew = () => {
  if (needLogin()) return;
  const s = rps(); const ks = rpKinds();
  s.form = { kind: ks[0], text: '', photo: null, loc: caf().loc || null };
  const draw = () => {
    const f = s.form;
    const w = bsheet(`<div class="cf-sec" style="margin-top:4px">${esc(t('rp_kind'))}</div><div class="rp-kinds">${ks.map(k => `<button class="h-chip ${f.kind === k ? 'on' : ''}" data-rk="${k}">${RP_IC[k]} ${esc(t('rk_' + k))}</button>`).join('')}</div>
      <div class="cf-sec">${esc(t('rp_text'))}</div><textarea id="rpT" rows="3" class="rp-ta" placeholder="${esc(t('rp_text_ph'))}">${esc(f.text)}</textarea>
      <label class="h-btn h-ghostd rp-ph">${f.photo ? `<img src="${f.photo}" alt="">` : ''}📷 ${esc(t(f.photo ? 'rp_photo2' : 'rp_photo'))}<input type="file" accept="image/*" capture="environment" id="rpF" hidden></label>
      <div class="cf-sec">${esc(t('rp_where'))}</div><div class="rp-where">${f.loc ? `📍 ${f.loc[0].toFixed(5)}, ${f.loc[1].toFixed(5)}` : `<i>${esc(t('rp_pick'))}</i>`}</div>
      <button class="h-btn h-ghostd" data-rk="geo">📍 ${esc(t('rp_here'))}</button>
      <button class="h-btn h-primary" id="rpSend" style="margin-top:14px">${esc(t('rp_send'))}</button>`, 'bs-caf bs-rp');
    w.querySelector('#rpT').addEventListener('input', e => { f.text = e.target.value; });
    w.addEventListener('click', e => { const b = e.target.closest('[data-rk]'); if (!b) return; e.preventDefault(); e.stopPropagation(); if (b.dataset.rk === 'geo') geo().then(l => { f.loc = l; draw(); }).catch(() => toast(t('caf_geo_err'))); else { f.kind = b.dataset.rk; draw(); } });
    w.querySelector('#rpF').addEventListener('change', e => { const file = e.target.files && e.target.files[0]; if (!file) return; const img = new Image(); img.onload = () => { const k = Math.min(1, 1000 / Math.max(img.width, img.height)); const c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k); c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); f.photo = c.toDataURL('image/jpeg', .72); URL.revokeObjectURL(img.src); draw(); }; img.src = URL.createObjectURL(file); });
    w.querySelector('#rpSend').addEventListener('click', e => {
      e.preventDefault(); if (!f.text.trim() && !f.photo) return toast(t('rp_need'));
      const go2 = loc => { e.target.disabled = true; api('/api/reports', { kind: f.kind, text: f.text, la: loc[0], lo: loc[1], photo: f.photo, city: cityIdx() }).then(j => { if (j.ok) { bsheetClose(true); toast(t('rp_ok', { n: j.id })); rpLoad(); } else { e.target.disabled = false; toast(t('rp_err')); } }); };
      if (f.loc) go2(f.loc); else geo().then(l => { f.loc = l; go2(l); }).catch(() => toast(t('rp_pick')));
    });
  };
  draw();
  if (RP_MAP && !RP_MAP.__pick) { RP_MAP.__pick = 1; RP_MAP.on('click', ev => { const f = rps().form; if (!f || !document.querySelector('.bs-rp')) return; f.loc = [ev.latlng.lat, ev.latlng.lng]; const el = document.querySelector('.bs-rp .rp-where'); if (el) el.textContent = `📍 ${f.loc[0].toFixed(5)}, ${f.loc[1].toFixed(5)}`; }); }
};

// ---- document reminders (block on «Мои документы»)
const DC_KINDS = ['passport', 'idcard', 'intl', 'license', 'inspection', 'insurance', 'tinting', 'gas', 'poa', 'other'];
let DC = null;
function dcLeft(d) { const nz = new Date(Date.now() + 5 * 3600e3); nz.setUTCHours(0, 0, 0, 0); return Math.round((Date.parse(d + 'T00:00:00Z') - nz.getTime()) / 864e5); }
function drawDocs(layers, y) {
  const r = layers.r; if (!r) return;
  const w = hoverlay(r, 24, y, 382, 0, `<div class="hv-h">${esc(t('dc_t'))}<button data-dc="add">＋ ${esc(t('dc_add'))}</button></div><div class="hv-card dc-card" id="dcBox"><div class="hv-sk"></div></div><div class="dc-sub">🔔 ${esc(t('dc_s'))}</div>`);
  w.addEventListener('click', e => { const b = e.target.closest('[data-dc]'); if (!b) return; e.preventDefault(); e.stopPropagation(); if (b.dataset.dc === 'add') dcForm(); else if (b.dataset.dc === 'login') tgLogin(); else { const [k, ...tt] = b.dataset.dc.split('|'); dcForm(k, tt.join('|')); } });
  const box = w.querySelector('#dcBox');
  const paint = () => {
    if (!authUser()) { box.innerHTML = `<p class="dc-empty">${esc(t('need_login_s'))}</p><button class="h-btn h-tgbtn" data-dc="login">${TG_SVG}<span>${esc(t('tg_login'))}</span></button>`; return; }
    if (!DC || !DC.length) { box.innerHTML = `<p class="dc-empty">${esc(t('dc_none'))}</p>`; return; }
    box.innerHTML = DC.map(d => { const n = dcLeft(d.expires); const col = n < 0 ? '#DC2626' : n <= 30 ? '#D97706' : '#15803D'; return `<button class="hv-mq" data-dc="${esc(d.kind + '|' + d.title)}"><span class="hv-dot" style="background:${col}"></span><span><b>${esc(t('dk_' + d.kind))}${d.title ? ' · ' + esc(d.title) : ''}</b><i>${esc(d.expires.split('-').reverse().join('.'))} · <em style="color:${col};font-style:normal">${esc(n < 0 ? t('dc_exp') : n === 0 ? t('dc_today') : t('dc_left', { n }))}</em></i></span>${IC.chev}</button>`; }).join('');
  };
  paint();
  if (authUser()) api('/api/docs').then(j => { if (j.ok) { DC = j.list.filter(d => d.kind !== 'appt'); if (document.body.contains(box)) paint(); } });
}
function dcForm(kind, title) {
  if (needLogin()) return;
  const cur = DC && kind ? DC.find(d => d.kind === kind && d.title === (title || '')) : null;
  const w = bsheet(`<div class="cf-sec" style="margin-top:4px">${esc(t('dc_kind'))}</div><select id="dcK" class="dc-in">${DC_KINDS.map(k => `<option value="${k}" ${(cur ? cur.kind : 'passport') === k ? 'selected' : ''}>${esc(t('dk_' + k))}</option>`).join('')}</select>
    <div class="cf-sec">${esc(t('dc_title'))}</div><input id="dcT" class="dc-in" maxlength="60" value="${esc(cur ? cur.title : '')}">
    <div class="cf-sec">${esc(t('dc_date'))}</div><input id="dcD" class="dc-in" type="date" value="${esc(cur ? cur.expires : '')}">
    <button class="h-btn h-primary" id="dcS" style="margin-top:16px">${esc(t('dc_save'))}</button>${cur ? `<button class="h-btn h-ghostd" id="dcR" style="margin-top:10px">${esc(t('tc_rm'))}</button>` : ''}`, 'bs-caf');
  const done = () => { bsheetClose(true); api('/api/docs').then(j => { if (j.ok) DC = j.list.filter(d => d.kind !== 'appt'); render(current, currentP); }); };
  w.querySelector('#dcS').addEventListener('click', e => { e.preventDefault(); const d = w.querySelector('#dcD').value; if (!d) return w.querySelector('#dcD').focus(); const body = { kind: w.querySelector('#dcK').value, title: w.querySelector('#dcT').value.trim(), expires: d }; const old = cur && (cur.kind !== body.kind || cur.title !== body.title) ? api('/api/docs', { action: 'remove', kind: cur.kind, title: cur.title }) : Promise.resolve(); old.then(() => api('/api/docs', body)).then(j => j.ok ? done() : toast(t('po_err'))); });
  const rm = w.querySelector('#dcR'); if (rm) rm.addEventListener('click', e => { e.preventDefault(); api('/api/docs', { action: 'remove', kind: cur.kind, title: cur.title }).then(done); });
}

// ---- panic button: real calls + SOS with location to trusted contacts
let TC = null;
function drawSos(layers, y) {
  const r = layers.r; if (!r) return;
  const w = hoverlay(r, 24, y, 382, 0, `<button class="sos-big" data-sos="go"><b>🚨 ${esc(t('sos_btn'))}</b><i>${esc(t('sos_s'))}</i></button>
    <div class="hv-h" style="margin-top:22px">${esc(t('tc_t'))}<button data-sos="add">＋ ${esc(t('tc_add'))}</button></div><div class="hv-card" id="tcBox"><div class="hv-sk"></div></div>`);
  w.addEventListener('click', e => { const b = e.target.closest('[data-sos]'); if (!b) return; e.preventDefault(); e.stopPropagation(); const a = b.dataset.sos; if (a === 'go') sosGo(); else if (a === 'add') tcInvite(); else if (a === 'login') tgLogin(); else if (a.startsWith('rm:')) api('/api/trust', { action: 'remove', tg_id: +a.slice(3) }).then(() => { TC = null; render(current, currentP); }); });
  const box = w.querySelector('#tcBox');
  const paint = () => {
    if (!authUser()) { box.innerHTML = `<p class="dc-empty">${esc(t('need_login_s'))}</p><button class="h-btn h-tgbtn" data-sos="login">${TG_SVG}<span>${esc(t('tg_login'))}</span></button>`; return; }
    box.innerHTML = TC && TC.length ? TC.map(c => `<div class="hv-mq"><span class="hv-dot" style="background:#229ED9"></span><span><b>${esc(c.name)}</b><i>Telegram</i></span><button class="tc-rm" data-sos="rm:${c.tg_id}">${esc(t('tc_rm'))}</button></div>`).join('') : `<p class="dc-empty">${esc(t('tc_none'))}. ${esc(t('tc_add_s'))}</p>`;
  };
  paint();
  if (authUser()) api('/api/trust').then(j => { if (j.ok) { TC = j.list; if (document.body.contains(box)) paint(); } });
}
function tcInvite() {
  if (needLogin()) return;
  api('/api/trust', { action: 'invite' }).then(j => {
    if (!j.ok) return toast(t('po_err'));
    const txt = `${userFirst() || 'Я'} добавляет вас в близкие в приложении MyUzCity: если нажмёт тревожную кнопку, вы сразу получите сообщение и геолокацию. Откройте ссылку: ${j.link}`;
    bsheet(`<div class="tr-hero"><span style="background:#229ED9">${TG_SVG.replace(/22/g, '28')}</span><div><b>${esc(t('tc_add'))}</b><i>@MyUzCity_bot</i></div></div><p class="tp-p">${esc(t('tc_add_s'))}</p>
      <a class="h-btn h-tgbtn cf-callbtn" href="https://t.me/share/url?url=${encodeURIComponent(j.link)}&text=${encodeURIComponent(txt.replace(': ' + j.link, ''))}" target="_blank" rel="noopener">${TG_SVG}<span>${esc(t('tc_share'))}</span></a>
      <button class="h-btn h-ghostd" id="tcC" style="margin-top:10px">${esc(t('tc_copy'))}</button>`, 'bs-caf');
    document.getElementById('tcC').addEventListener('click', e => { e.preventDefault(); (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => toast(t('qr_copied'))).catch(() => {}); });
  });
}
function sosGo() {
  if (needLogin()) return;
  sheet(t('sos_q'), t('sos_q_s'), [[t('sos_btn'), () => {
    const send = (la, lo, acc) => api('/api/sos', { la, lo, acc }).then(j => { if (j.ok && j.sent) toast(t('sos_ok', { n: j.sent })); else if (j.ok) { toast(t('sos_none')); tcInvite(); } else toast(t('sos_err')); });
    if (!navigator.geolocation) return toast(t('caf_geo_err'));
    navigator.geolocation.getCurrentPosition(p => send(p.coords.latitude, p.coords.longitude, p.coords.accuracy), () => { const l = caf().loc; if (l) send(l[0], l[1]); else toast(t('caf_geo_err')); }, { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 });
  }], [t('cancel'), null]]);
}
Object.assign(XACT, SHEET_ACT);
AI_HIDE.add('h:reports');

// ======================= Live blocks on designed screens: fines, family, public services, utilities =======================
const BK_I = {
  ru: { fn_t: 'Штрафы — официально', fn_road24: 'Проверить и оплатить штрафы — Road24', fn_road24_s: 'Официальное приложение проверки штрафов ГУБДД, по госномеру и техпаспорту', fn_points: 'Штрафные баллы — my.gov.uz', fn_appeal: 'Обжаловать штраф — my.gov.uz', fn_cams: 'Камеры скорости на карте',
    ed_near: 'Школы и детсады рядом', gv_near: 'Центры госуслуг рядом', gv_cat: 'Популярные услуги', gv_all: 'Все услуги на my.gov.uz', gv_res: 'Резидентское разрешение на парковку', gv_pts: 'Штрафные баллы водителя', gv_app: 'Обжалование штрафа за нарушение ПДД', gv_call: 'Колл-центр my.gov.uz — 1242 (круглосуточно)',
    ut_t: 'Калькулятор коммуналки', ut_el: 'Электроэнергия, кВт·ч за месяц', ut_stove: 'Дом с электроплитами', ut_gas: 'Газ (по счётчику), м³ за месяц', ut_heat: 'Отопительный сезон', ut_sum: 'Итого к оплате ≈', ut_el_s: 'Свет', ut_gas_s: 'Газ', ut_note: 'Тарифы для населения с 1 июня 2026 (ПКМ №243). Считаем по ступеням: каждая часть потребления — по своей цене. Точная сумма — в квитанции.', tk_t: 'Купить билеты на iTicket.uz' },
  uz: { fn_t: 'Jarimalar — rasmiy', fn_road24: 'Jarimalarni tekshirish va to‘lash — Road24', fn_road24_s: "YHXB jarimalarini davlat raqami va texpasport bo'yicha tekshirish ilovasi", fn_points: 'Jarima ballari — my.gov.uz', fn_appeal: 'Jarimani shikoyat qilish — my.gov.uz', fn_cams: 'Tezlik kameralari xaritada',
    ed_near: "Yaqin maktab va bog'chalar", gv_near: 'Yaqin davlat xizmatlari markazlari', gv_cat: 'Ommabop xizmatlar', gv_all: "my.gov.uz dagi barcha xizmatlar", gv_res: 'Avtoturargoh uchun rezident ruxsatnomasi', gv_pts: 'Haydovchining jarima ballari', gv_app: "YHQ buzilishi uchun jarimani shikoyat qilish", gv_call: 'my.gov.uz call-markazi — 1242 (kecha-kunduz)',
    ut_t: 'Kommunal kalkulyator', ut_el: 'Elektr energiyasi, oyiga kVt·soat', ut_stove: 'Elektr plitali uy', ut_gas: "Gaz (hisoblagich bo'yicha), oyiga m³", ut_heat: 'Isitish mavsumi', ut_sum: "Jami to'lov ≈", ut_el_s: 'Elektr', ut_gas_s: 'Gaz', ut_note: "Aholi uchun tariflar 2026-yil 1-iyundan (VMQ №243). Bosqichma-bosqich hisoblaymiz. Aniq summa — kvitansiyada.", tk_t: 'iTicket.uz da chipta sotib olish' },
  en: { fn_t: 'Fines — official', fn_road24: 'Check and pay fines — Road24', fn_road24_s: 'Official traffic police fines app, by plate and registration', fn_points: 'Penalty points — my.gov.uz', fn_appeal: 'Appeal a fine — my.gov.uz', fn_cams: 'Speed cameras on the map',
    ed_near: 'Schools & kindergartens nearby', gv_near: 'Public service centres nearby', gv_cat: 'Popular services', gv_all: 'All services on my.gov.uz', gv_res: 'Resident parking permit', gv_pts: 'Driver penalty points', gv_app: 'Appeal a traffic fine', gv_call: 'my.gov.uz call centre — 1242 (24/7)',
    ut_t: 'Utility bill calculator', ut_el: 'Electricity, kWh per month', ut_stove: 'Building with electric stoves', ut_gas: 'Gas (metered), m³ per month', ut_heat: 'Heating season', ut_sum: 'Total ≈', ut_el_s: 'Electricity', ut_gas_s: 'Gas', ut_note: 'Household tariffs from 1 June 2026 (Resolution No. 243). Calculated by blocks: each part of consumption at its own price. The exact amount is on your bill.', tk_t: 'Buy tickets on iTicket.uz' },
};
BK_I.zh = BK_I.en;
for (const l in BK_I) Object.assign(I[l], BK_I[l]);
const lk = (href, title, sub, ic, col) => `<a class="bk-link" href="${esc(href)}" target="_blank" rel="noopener"><span class="hv-ic" style="background:${col}">${ic}</span><span><b>${esc(title)}</b>${sub ? `<i>${esc(sub)}</i>` : ''}</span>${IC.chev}</a>`;
const GLYPH = s => `<span style="font-size:20px;line-height:1">${s}</span>`;
const MYGOV = LANG => `https://oldmy.gov.uz/${LANG === 'uz' ? 'uz' : LANG === 'en' ? 'en' : 'ru'}`;
function drawFines(layers, y) {
  const r = layers.r; if (!r) return;
  hoverlay(r, 24, y, 382, 0, `<div class="hv-h">${esc(t('fn_t'))}</div><div class="hv-card bk-card">
    ${lk('https://road24.uz', t('fn_road24'), t('fn_road24_s'), GLYPH('🚓'), '#1D4ED8')}
    ${lk(MYGOV(LANG) + '/service/1238', t('fn_points'), '', GLYPH('📋'), '#0F766E')}
    ${lk(MYGOV(LANG) + '/service/1054', t('fn_appeal'), '', GLYPH('⚖️'), '#B45309')}</div>
    <div class="hv-h" style="margin-top:20px">${esc(t('fn_cams'))}</div>`);
  miniMap(r, [24, y + 300, 382, 220], 'speedcam', () => go('h:poi', 'speedcam'));
}
function drawFamily(layers, y) {
  const r = layers.r; if (!r) return;
  const c4 = ['school', 'kindergarten', 'college', 'university'];
  const w = hoverlay(r, 24, y, 382, 222, `<div class="hv-h">${esc(t('ed_near'))}</div>
    <div class="hv-grid">${c4.map(c => `<button data-ed="${c}"><span class="hv-ic" style="background:${ED_COL[c]}">${poIc(c, 22)}</span><b>${esc(t('edc_' + c))}</b><i data-edn="${c}">${esc(t('po_load'))}</i></button>`).join('')}</div>`);
  w.addEventListener('click', e => { const b = e.target.closest('[data-ed]'); if (!b) return; e.preventDefault(); e.stopPropagation(); go('h:poi', 'edu:' + b.dataset.ed); });
  poIndex().then(() => poLoad('edu', poCity('edu'))).then(list => { for (const c of c4) { const e = w.querySelector(`[data-edn="${c}"]`); const n = list.filter(p => p.a === c).length; if (e) e.textContent = n ? t('md_n', { n }) : '—'; } }).catch(() => {});
}
function drawGov(layers, y) {
  const r = layers.r; if (!r) return;
  hoverlay(r, 0, y - 20, 430, 320, '').style.background = '#fff'; // hides the tab bar baked into the screen picture
  hoverlay(r, 24, y, 382, 28, `<div class="hv-h" style="margin:0">${esc(t('gv_near'))}</div>`);
  miniMap(r, [24, y + 40, 382, 210], 'gov', () => go('h:poi', 'gov:cgu'));
  hoverlay(r, 24, y + 270, 382, 0, `<div class="hv-h">${esc(t('gv_cat'))}</div><div class="hv-card bk-card">
    ${lk(MYGOV(LANG) + '/service/1286', t('gv_res'), '', GLYPH('🅿️'), '#1D4ED8')}
    ${lk(MYGOV(LANG) + '/service/1238', t('gv_pts'), '', GLYPH('📋'), '#0F766E')}
    ${lk(MYGOV(LANG) + '/service/1054', t('gv_app'), '', GLYPH('⚖️'), '#B45309')}
    ${lk('https://my.gov.uz', t('gv_all'), t('gv_call'), GLYPH('🏛️'), '#143C20')}</div>`);
}
// household tariffs from 1 June 2026, by blocks (each part of the monthly volume at its own price)
const UT_EL = { stove: [[200, 325], [500, 450], [1000, 550], [5000, 800], [10000, 950], [Infinity, 1100]], other: [[200, 650], [500, 900], [1000, 1100], [5000, 1600], [10000, 1900], [Infinity, 2200]] };
const UT_GAS = { heat: [[500, 1100], [2500, 2000], [5000, 2300], [10000, 2700], [Infinity, 3300]], other: [[100, 1100], [2500, 2000], [5000, 2300], [10000, 2700], [Infinity, 3300]] };
function blocks(v, tiers) { let sum = 0, prev = 0; for (const [lim, price] of tiers) { if (v <= prev) break; const part = Math.min(v, lim) - prev; sum += part * price; prev = lim; } return sum; }
function drawUtil(layers, y) {
  const r = layers.r; if (!r) return;
  const mo = new Date(Date.now() + 5 * 3600e3).getUTCMonth(); const heat = mo >= 10 || mo <= 2;
  const w = hoverlay(r, 24, y, 382, 0, `<div class="hv-h">${esc(t('ut_t'))}</div><div class="hv-card ut-card">
    <label>${esc(t('ut_el'))}<input id="utE" inputmode="numeric" value="250"></label>
    <label class="ut-chk"><input type="checkbox" id="utS"> ${esc(t('ut_stove'))}</label>
    <label>${esc(t('ut_gas'))}<input id="utG" inputmode="numeric" value="${heat ? 300 : 60}"></label>
    <label class="ut-chk"><input type="checkbox" id="utH" ${heat ? 'checked' : ''}> ${esc(t('ut_heat'))}</label>
    <div class="ut-res" id="utR"></div><p class="ut-note">${esc(t('ut_note'))}</p></div>`);
  const $ = id => w.querySelector('#' + id);
  const upd = () => {
    const e = Math.max(0, parseFloat($('utE').value) || 0), g = Math.max(0, parseFloat($('utG').value) || 0);
    const se = Math.round(blocks(e, UT_EL[$('utS').checked ? 'stove' : 'other'])), sg = Math.round(blocks(g, UT_GAS[$('utH').checked ? 'heat' : 'other']));
    $('utR').innerHTML = `<div><span>${esc(t('ut_el_s'))}</span><b>${fmtSum(se)} ${esc(t('rt_sum'))}</b></div><div><span>${esc(t('ut_gas_s'))}</span><b>${fmtSum(sg)} ${esc(t('rt_sum'))}</b></div><div class="tot"><span>${esc(t('ut_sum'))}</span><b>${fmtSum(se + sg)} ${esc(t('rt_sum'))}</b></div>`;
  };
  ['utE', 'utG', 'utS', 'utH'].forEach(id => $(id).addEventListener('input', upd)); ['utS', 'utH'].forEach(id => $(id).addEventListener('change', upd));
  w.addEventListener('click', e => e.stopPropagation()); upd();
}
Object.assign(XACT, {
  sgai: id => { const p = poFind('sight', id); if (!p) return; bsheetClose(true); aiOpen(); setTimeout(() => aiAsk(`Расскажи о достопримечательности «${p.n}» (${CITIES[poCity('sight')][0]}): история, что посмотреть, советы посетителю.`), 350); },
  fines: () => bsheet(`<div class="tr-hero"><span style="background:#1D4ED8;color:#fff;font-size:24px">🚓</span><div><b>${esc(t('fn_t'))}</b></div></div><div class="h-card bk-card">${lk('https://road24.uz', t('fn_road24'), t('fn_road24_s'), GLYPH('🚓'), '#1D4ED8')}${lk(MYGOV(LANG) + '/service/1238', t('fn_points'), '', GLYPH('📋'), '#0F766E')}${lk(MYGOV(LANG) + '/service/1054', t('fn_appeal'), '', GLYPH('⚖️'), '#B45309')}</div>`, 'bs-caf'),
  tickets: () => { window.open('https://iticket.uz', '_blank', 'noopener'); },
});

// ======================= Real services instead of the design's sample screens =======================
// Every user sees only their own data (Telegram profile, documents, cars, appointments, reports).
// Payments, tickets and state services open the official apps and sites — MyUzCity never takes money.
const RL_I = {
  ru: {
    pay_t: 'Оплата', pay_s: 'MyUzCity не принимает деньги: оплата проходит в официальном приложении вашего банка или платёжной системы.', pay_apps: 'Оплатить через приложение',
    pay_h_util: 'В приложении выберите «Коммунальные услуги» → электроэнергия, газ, вода или вывоз мусора. Понадобится лицевой счёт из квитанции.',
    pay_h_fine: 'Штрафы проверяются по госномеру и техпаспорту. Официальная проверка и оплата — в приложении Road24.',
    pay_h_transit: 'Проезд в метро и автобусах — картой ATTO, банковской картой с NFC или QR в приложениях ATTO и Click. Пополнение без комиссии — в приложении ATTO.',
    pay_h_event: 'Билеты на концерты, выставки и ярмарки продаются на iTicket.uz.', pay_h_qr: 'Наведите камеру на QR-код продавца — оплата откроется в вашем банковском приложении.',
    pay_h_other: 'Выберите приложение, которым вы пользуетесь.', pay_scan: 'Сканировать QR', pay_atto: 'Приложение ATTO', pay_road24: 'Проверить штрафы в Road24', pay_iticket: 'Билеты на iTicket.uz', pay_calc: 'Рассчитать сумму',
    car_t: 'Мои автомобили', car_add: 'Добавить', car_none: 'Добавьте свой автомобиль — номер пригодится для парковки и проверки штрафов.', car_ok: 'Автомобиль сохранён', car_bad: 'Проверьте госномер, например 01 A 123 BC', car_rm_q: 'Удалить {p}?', car_rm: 'Удалить', car_fines: 'Штрафы', car_all: 'Все автомобили ({n})', car_model: 'Марка и модель', car_color_l: 'Цвет',
    st_rep: 'Сообщений', st_votes: 'Голосов', st_docs: 'Документов', st_guest: 'Войдите через Telegram — здесь будут ваши обращения, голоса и документы',
    my_t: 'Мои заявки и данные', my_rep: 'Мои сообщения о проблемах', my_rep_none: 'Вы ещё не сообщали о проблемах в городе', my_rep_new: 'Сообщить о проблеме', my_docs: 'Документы и записи', my_docs_none: 'Документы не добавлены', my_cars: 'Автомобили', my_trust: 'Доверенные контакты для SOS: {n}',
    set_t: 'Личные данные', set_name: 'Имя', set_phone: 'Телефон · подтверждён в Telegram', set_tg: 'Telegram', set_city: 'Город', set_mah: 'Махалля', set_none: 'Не указано', set_save: 'Сохранить', set_saved: 'Сохранено', set_name_t: 'Как к вам обращаться', set_mah_t: 'Ваша махалля', set_mah_ph: 'Например: Бабур',
    nf_t: 'Уведомления в Telegram', nf_s: 'Сообщения присылает бот @MyUzCity_bot', nf_docs: 'Сроки документов и записи к врачу', nf_reports: 'Статусы моих сообщений о проблемах', nf_air: 'Предупреждать, когда воздух вредный',
    fb_t: 'Остались вопросы? Напишите нам', fb_ph: 'Опишите вопрос или предложение…', fb_send: 'Отправить', fb_ok: 'Спасибо! Сообщение №{n} передано команде MyUzCity', fb_short: 'Напишите хотя бы пару слов',
    dy_t: 'Электронный дневник eMaktab', dy_s: 'Оценки, домашние задания и расписание вашего ребёнка — в официальной системе eMaktab Министерства образования. Логин и пароль выдаёт классный руководитель.', dy_open: 'Открыть eMaktab',
    kg_t: 'Очередь в детский сад', kg_s: 'Заявление подаётся бесплатно на my.gov.uz: можно выбрать до трёх государственных садов. После подачи придёт код заявления, направление — когда подойдёт очередь.', kg_open: 'Подать заявление на my.gov.uz', kg_map: 'Детские сады на карте',
    dm_t: 'Запись к врачу', dm_s: 'Онлайн-запись к семейному врачу и специалистам — через официальную систему DMED Минздрава (вход по ПИНФЛ) или на my.gov.uz.', dm_open: 'Открыть DMED', dm_gov: 'Записаться через my.gov.uz', dm_near: 'Поликлиники рядом',
    mb_t: 'Электронная мед. книжка', mb_s: 'Ваши приёмы, назначения, анализы и электронные рецепты хранятся в DMED — единой медицинской системе Минздрава.',
    ap_t: 'Мои записи к врачу', ap_none: 'Записались к врачу? Добавьте приём — бот напомнит накануне и в день приёма.', ap_add: 'Добавить приём', ap_doc: 'Врач или специальность', ap_doc_ph: 'Терапевт', ap_place: 'Где', ap_place_ph: 'Поликлиника №5, каб. 203', ap_date: 'Дата', ap_time: 'Время', ap_rm: 'Удалить', ap_ok: 'Приём сохранён — напомним в Telegram', ap_today: 'сегодня', ap_tomorrow: 'завтра',
    mh_t: 'Моя махалля', mh_set: 'Укажите вашу махаллю', mh_set_s: 'Чтобы общаться с соседями и голосовать в опросах махалли', mh_chat: 'Чат соседей', mh_polls: 'Опросы махалли', mh_vote: 'Голосовать', mh_votes: 'Голосов: {n}', mh_none: 'Опросов пока нет',
    ch_t: 'Чат соседей', ch_city: 'Весь город', ch_mah: 'Махалля', ch_ph: 'Сообщение…', ch_none: 'Пока тихо — напишите первым', ch_rules: 'Будьте вежливы, не публикуйте чужие личные данные.', ch_limit: 'Слишком часто — подождите минуту',
    tk_t: 'Билеты', tk_air: 'Авиа', tk_rail: 'Поезда', tk_bus: 'Автобусы', tk_from: 'Откуда', tk_to: 'Куда', tk_date: 'Дата', tk_find: 'Найти билеты',
    tk_air_s: 'Поиск по всем авиакомпаниям — на Aviasales; билеты Uzbekistan Airways — на uzairways.com.', tk_rail_s: 'Билеты на Afrosiyob, Sharq и другие поезда продаёт «Узбекистон темир йуллари» — на eticket.railway.uz и в приложении UTY.', tk_bus_s: 'Междугородние автобусы с автовокзала «Ташкент» — на avtoticket.uz и в приложении UzBus.',
    tk_uzair: 'Uzbekistan Airways', tk_sched: 'Расписание поездов', tk_board: 'Табло аэропорта', tk_same: 'Выберите разные города',
    ec_t: 'Чистый город', ec_air: 'Воздух', ec_rec: 'Пункты приёма', ec_rep: 'Сообщить о мусоре', ec_cities: 'Воздух в городах Узбекистана', ec_src: 'Open-Meteo (модель CAMS), обновляется каждый час', ec_hours: 'Прогноз на сутки', ec_alert: 'Предупреждать в Telegram о вредном воздухе', ec_rec_s: 'Пункты приёма вторсырья', ec_rec_open: 'Открыть карту', ec_rep_s: 'Свалка, переполненные баки, мусор во дворе — сфотографируйте и отметьте на карте',
    og_web: 'Сайт фонда', og_find: 'Найти сайт и контакты', og_donate: 'Пожертвования принимаются через Click, Payme, Paynet и на сайте фонда.',
    pg_go: 'Подробнее', ip_s: 'Купить акции на Ташкентской фондовой бирже можно через лицензированного брокера. Следите за новостями о размещении.', ip_news: 'Новости о размещении', ip_uzse: 'Ташкентская фондовая биржа', ip_uznif: 'IPO прошло в мае 2026 года: акции торгуются на Ташкентской и Лондонской биржах.',
    rt_post: 'Разместите объявление о продаже или аренде на крупнейших площадках:', rt_buy: 'Квартиры, дома и коммерческая недвижимость:', rt_land: 'Земельные участки продаются на государственной электронной площадке E-auksion.',
    cg_t: 'Центр госуслуг', cg_s: 'Большинство услуг можно получить онлайн на my.gov.uz без очереди. В центр госуслуг возьмите паспорт или ID-карту. Справки: 1242.', cg_map: 'Центры госуслуг на карте', cg_call: 'Позвонить 1242', cg_online: 'Открыть my.gov.uz',
    rs_rej: 'Отклонено', login_first: 'Войдите через Telegram',
  },
  uz: {
    pay_t: "To'lov", pay_s: "MyUzCity pul qabul qilmaydi: to'lov bankingiz yoki to'lov tizimining rasmiy ilovasida amalga oshiriladi.", pay_apps: "Ilova orqali to'lash",
    pay_h_util: "Ilovada «Kommunal xizmatlar» → elektr, gaz, suv yoki chiqindi bo'limini tanlang. Kvitansiyadagi shaxsiy hisob raqami kerak bo'ladi.",
    pay_h_fine: "Jarimalar davlat raqami va texpasport bo'yicha tekshiriladi. Rasmiy tekshiruv va to'lov — Road24 ilovasida.",
    pay_h_transit: "Metro va avtobusda — ATTO kartasi, NFC bank kartasi yoki ATTO va Click ilovalaridagi QR bilan. Komissiyasiz to'ldirish — ATTO ilovasida.",
    pay_h_event: "Konsert, ko'rgazma va yarmarkalarga chiptalar — iTicket.uz saytida.", pay_h_qr: "Kamerani sotuvchining QR-kodiga qarating — to'lov bank ilovangizda ochiladi.",
    pay_h_other: "O'zingiz foydalanadigan ilovani tanlang.", pay_scan: 'QR skanerlash', pay_atto: 'ATTO ilovasi', pay_road24: "Road24'da jarimalarni tekshirish", pay_iticket: 'iTicket.uz chiptalari', pay_calc: "Summani hisoblash",
    car_t: 'Mening avtomobillarim', car_add: "Qo'shish", car_none: "Avtomobilingizni qo'shing — raqam parkovka va jarimalarni tekshirish uchun kerak bo'ladi.", car_ok: 'Avtomobil saqlandi', car_bad: "Davlat raqamini tekshiring, masalan 01 A 123 BC", car_rm_q: "{p} o'chirilsinmi?", car_rm: "O'chirish", car_fines: 'Jarimalar', car_all: 'Barcha avtomobillar ({n})', car_model: 'Marka va model', car_color_l: 'Rangi',
    st_rep: 'Xabarlar', st_votes: 'Ovozlar', st_docs: 'Hujjatlar', st_guest: "Telegram orqali kiring — bu yerda murojaatlaringiz, ovozlaringiz va hujjatlaringiz bo'ladi",
    my_t: "Mening arizalarim va ma'lumotlarim", my_rep: 'Muammolar haqidagi xabarlarim', my_rep_none: "Siz hali shahardagi muammolar haqida xabar bermagansiz", my_rep_new: 'Muammo haqida xabar berish', my_docs: 'Hujjatlar va qabullar', my_docs_none: "Hujjatlar qo'shilmagan", my_cars: 'Avtomobillar', my_trust: 'SOS uchun ishonchli kontaktlar: {n}',
    set_t: "Shaxsiy ma'lumotlar", set_name: 'Ism', set_phone: 'Telefon · Telegramda tasdiqlangan', set_tg: 'Telegram', set_city: 'Shahar', set_mah: 'Mahalla', set_none: "Ko'rsatilmagan", set_save: 'Saqlash', set_saved: 'Saqlandi', set_name_t: 'Sizga qanday murojaat qilaylik', set_mah_t: 'Mahallangiz', set_mah_ph: 'Masalan: Bobur',
    nf_t: 'Telegramdagi bildirishnomalar', nf_s: '@MyUzCity_bot boti yuboradi', nf_docs: 'Hujjat muddatlari va shifokor qabullari', nf_reports: 'Muammo xabarlarim holati', nf_air: "Havo zararli bo'lganda ogohlantirish",
    fb_t: 'Savollar qoldimi? Bizga yozing', fb_ph: 'Savol yoki taklifingizni yozing…', fb_send: 'Yuborish', fb_ok: 'Rahmat! №{n} xabar MyUzCity jamoasiga yetkazildi', fb_short: "Kamida bir-ikki so'z yozing",
    dy_t: 'eMaktab elektron kundaligi', dy_s: "Farzandingizning baholari, uy vazifalari va dars jadvali — Ta'lim vazirligining rasmiy eMaktab tizimida. Login va parolni sinf rahbari beradi.", dy_open: 'eMaktabni ochish',
    kg_t: "Bog'chaga navbat", kg_s: "Ariza my.gov.uz orqali bepul topshiriladi: uchtagacha davlat bog'chasini tanlash mumkin. Arizadan so'ng kod keladi, navbat kelganda yo'llanma beriladi.", kg_open: "my.gov.uz'da ariza berish", kg_map: "Bog'chalar xaritada",
    dm_t: 'Shifokor qabuliga yozilish', dm_s: "Oilaviy shifokor va mutaxassislarga onlayn yozilish — Sog'liqni saqlash vazirligining rasmiy DMED tizimi (JShShIR bilan kirish) yoki my.gov.uz orqali.", dm_open: 'DMEDni ochish', dm_gov: "my.gov.uz orqali yozilish", dm_near: 'Yaqin poliklinikalar',
    mb_t: 'Elektron tibbiy daftarcha', mb_s: "Qabullar, tayinlovlar, tahlillar va elektron retseptlar DMED — vazirlikning yagona tibbiy tizimida saqlanadi.",
    ap_t: 'Shifokor qabullarim', ap_none: "Shifokorga yozildingizmi? Qabulni qo'shing — bot bir kun oldin va qabul kuni eslatadi.", ap_add: "Qabul qo'shish", ap_doc: 'Shifokor yoki mutaxassislik', ap_doc_ph: 'Terapevt', ap_place: 'Qayerda', ap_place_ph: '5-poliklinika, 203-xona', ap_date: 'Sana', ap_time: 'Vaqt', ap_rm: "O'chirish", ap_ok: 'Qabul saqlandi — Telegramda eslatamiz', ap_today: 'bugun', ap_tomorrow: 'ertaga',
    mh_t: 'Mening mahallam', mh_set: "Mahallangizni ko'rsating", mh_set_s: "Qo'shnilar bilan muloqot va mahalla so'rovnomalari uchun", mh_chat: "Qo'shnilar chati", mh_polls: "Mahalla so'rovnomalari", mh_vote: 'Ovoz berish', mh_votes: 'Ovozlar: {n}', mh_none: "Hozircha so'rovnomalar yo'q",
    ch_t: "Qo'shnilar chati", ch_city: 'Butun shahar', ch_mah: 'Mahalla', ch_ph: 'Xabar…', ch_none: 'Hozircha jim — birinchi bo‘lib yozing', ch_rules: "Odobli bo'ling, boshqalarning shaxsiy ma'lumotlarini joylamang.", ch_limit: 'Juda tez — bir daqiqa kuting',
    tk_t: 'Chiptalar', tk_air: 'Avia', tk_rail: 'Poyezdlar', tk_bus: 'Avtobuslar', tk_from: 'Qayerdan', tk_to: 'Qayerga', tk_date: 'Sana', tk_find: 'Chipta qidirish',
    tk_air_s: "Barcha aviakompaniyalar bo'yicha qidiruv — Aviasales; Uzbekistan Airways chiptalari — uzairways.com.", tk_rail_s: "Afrosiyob, Sharq va boshqa poyezdlarga chiptalar — «O'zbekiston temir yo'llari»: eticket.railway.uz va UTY ilovasi.", tk_bus_s: "«Toshkent» avtovokzalidan shaharlararo avtobuslar — avtoticket.uz va UzBus ilovasi.",
    tk_uzair: 'Uzbekistan Airways', tk_sched: 'Poyezdlar jadvali', tk_board: 'Aeroport tablosi', tk_same: 'Turli shaharlarni tanlang',
    ec_t: 'Toza shahar', ec_air: 'Havo', ec_rec: 'Qabul punktlari', ec_rep: 'Chiqindi haqida xabar', ec_cities: "O'zbekiston shaharlarida havo", ec_src: 'Open-Meteo (CAMS modeli), har soatda yangilanadi', ec_hours: 'Bir kunlik prognoz', ec_alert: 'Havo zararli bo‘lsa Telegramda ogohlantirish', ec_rec_s: 'Ikkilamchi xomashyo qabul punktlari', ec_rec_open: 'Xaritani ochish', ec_rep_s: "Axlatxona, to'lib ketgan konteynerlar, hovlidagi chiqindi — suratga oling va xaritada belgilang",
    og_web: 'Fond sayti', og_find: 'Sayt va kontaktlarni topish', og_donate: "Xayriyalar Click, Payme, Paynet va fond sayti orqali qabul qilinadi.",
    pg_go: 'Batafsil', ip_s: "Toshkent fond birjasida aksiyalarni litsenziyali broker orqali sotib olish mumkin. Joylashtirish yangiliklarini kuzatib boring.", ip_news: 'Joylashtirish yangiliklari', ip_uzse: 'Toshkent fond birjasi', ip_uznif: "IPO 2026-yil may oyida o'tdi: aksiyalar Toshkent va London birjalarida savdoda.",
    rt_post: "Sotish yoki ijara e'lonini eng katta maydonchalarda joylashtiring:", rt_buy: "Kvartira, uy va tijorat ko'chmas mulki:", rt_land: 'Yer uchastkalari davlat E-auksion elektron maydonchasida sotiladi.',
    cg_t: 'Davlat xizmatlari markazi', cg_s: "Ko'p xizmatlarni my.gov.uz orqali navbatsiz onlayn olish mumkin. Markazga pasport yoki ID-karta bilan boring. Ma'lumot: 1242.", cg_map: 'Markazlar xaritada', cg_call: "1242 ga qo'ng'iroq", cg_online: "my.gov.uz'ni ochish",
    rs_rej: 'Rad etildi', login_first: 'Telegram orqali kiring',
  },
  en: {
    pay_t: 'Payment', pay_s: 'MyUzCity never takes money: you pay in the official app of your bank or payment service.', pay_apps: 'Pay with an app',
    pay_h_util: 'In the app choose “Utilities” → electricity, gas, water or waste. You will need the account number from your bill.',
    pay_h_fine: 'Fines are checked by plate number and registration certificate. Official check and payment — in the Road24 app.',
    pay_h_transit: 'Metro and buses: ATTO card, an NFC bank card or a QR code in the ATTO and Click apps. Top up without fees in the ATTO app.',
    pay_h_event: 'Tickets for concerts, exhibitions and fairs are sold on iTicket.uz.', pay_h_qr: 'Point the camera at the seller’s QR code — payment opens in your banking app.',
    pay_h_other: 'Choose the app you use.', pay_scan: 'Scan a QR code', pay_atto: 'ATTO app', pay_road24: 'Check fines in Road24', pay_iticket: 'Tickets on iTicket.uz', pay_calc: 'Estimate the amount',
    car_t: 'My cars', car_add: 'Add', car_none: 'Add your car — the plate is handy for parking and checking fines.', car_ok: 'Car saved', car_bad: 'Check the plate, e.g. 01 A 123 BC', car_rm_q: 'Remove {p}?', car_rm: 'Remove', car_fines: 'Fines', car_all: 'All cars ({n})', car_model: 'Make and model', car_color_l: 'Colour',
    st_rep: 'Reports', st_votes: 'Votes', st_docs: 'Documents', st_guest: 'Sign in with Telegram — your reports, votes and documents will appear here',
    my_t: 'My requests and data', my_rep: 'My problem reports', my_rep_none: 'You have not reported any city problems yet', my_rep_new: 'Report a problem', my_docs: 'Documents and appointments', my_docs_none: 'No documents yet', my_cars: 'Cars', my_trust: 'Trusted SOS contacts: {n}',
    set_t: 'Personal data', set_name: 'Name', set_phone: 'Phone · confirmed in Telegram', set_tg: 'Telegram', set_city: 'City', set_mah: 'Mahalla', set_none: 'Not set', set_save: 'Save', set_saved: 'Saved', set_name_t: 'How should we call you', set_mah_t: 'Your mahalla', set_mah_ph: 'e.g. Bobur',
    nf_t: 'Telegram notifications', nf_s: 'Sent by the @MyUzCity_bot bot', nf_docs: 'Document expiry and doctor appointments', nf_reports: 'Status of my problem reports', nf_air: 'Warn me when the air is unhealthy',
    fb_t: 'Still have questions? Write to us', fb_ph: 'Describe your question or idea…', fb_send: 'Send', fb_ok: 'Thank you! Message #{n} has been passed to the MyUzCity team', fb_short: 'Write at least a few words',
    dy_t: 'eMaktab e-diary', dy_s: 'Your child’s grades, homework and timetable are in eMaktab, the Ministry of Education’s official system. The class teacher gives the login and password.', dy_open: 'Open eMaktab',
    kg_t: 'Kindergarten queue', kg_s: 'Apply for free on my.gov.uz: you can choose up to three state kindergartens. You get an application code, and a referral when your turn comes.', kg_open: 'Apply on my.gov.uz', kg_map: 'Kindergartens on the map',
    dm_t: 'Doctor’s appointment', dm_s: 'Book a family doctor or specialist online in DMED, the Ministry of Health’s official system (sign in with your PINFL), or on my.gov.uz.', dm_open: 'Open DMED', dm_gov: 'Book on my.gov.uz', dm_near: 'Clinics nearby',
    mb_t: 'Electronic medical record', mb_s: 'Your visits, prescriptions, test results and e-prescriptions are kept in DMED, the Ministry of Health’s unified system.',
    ap_t: 'My doctor’s appointments', ap_none: 'Booked a doctor? Add the appointment — the bot will remind you the day before and on the day.', ap_add: 'Add appointment', ap_doc: 'Doctor or speciality', ap_doc_ph: 'Therapist', ap_place: 'Where', ap_place_ph: 'Clinic No. 5, room 203', ap_date: 'Date', ap_time: 'Time', ap_rm: 'Remove', ap_ok: 'Saved — we will remind you in Telegram', ap_today: 'today', ap_tomorrow: 'tomorrow',
    mh_t: 'My mahalla', mh_set: 'Set your mahalla', mh_set_s: 'To chat with neighbours and vote in mahalla polls', mh_chat: 'Neighbours’ chat', mh_polls: 'Mahalla polls', mh_vote: 'Vote', mh_votes: 'Votes: {n}', mh_none: 'No polls yet',
    ch_t: 'Neighbours’ chat', ch_city: 'Whole city', ch_mah: 'Mahalla', ch_ph: 'Message…', ch_none: 'Quiet so far — write first', ch_rules: 'Be polite and don’t post other people’s personal data.', ch_limit: 'Too fast — wait a minute',
    tk_t: 'Tickets', tk_air: 'Flights', tk_rail: 'Trains', tk_bus: 'Buses', tk_from: 'From', tk_to: 'To', tk_date: 'Date', tk_find: 'Find tickets',
    tk_air_s: 'Search all airlines on Aviasales; Uzbekistan Airways tickets — on uzairways.com.', tk_rail_s: 'Afrosiyob, Sharq and other trains: tickets from Uzbekistan Railways on eticket.railway.uz and in the UTY app.', tk_bus_s: 'Intercity buses from Tashkent bus station — avtoticket.uz and the UzBus app.',
    tk_uzair: 'Uzbekistan Airways', tk_sched: 'Train timetable', tk_board: 'Airport board', tk_same: 'Choose two different cities',
    ec_t: 'Clean city', ec_air: 'Air', ec_rec: 'Recycling', ec_rep: 'Report litter', ec_cities: 'Air in the cities of Uzbekistan', ec_src: 'Open-Meteo (CAMS model), updated hourly', ec_hours: 'Next 24 hours', ec_alert: 'Warn me in Telegram when the air is unhealthy', ec_rec_s: 'Recycling points', ec_rec_open: 'Open the map', ec_rep_s: 'Dumps, overflowing bins, litter in the yard — take a photo and mark it on the map',
    og_web: 'Foundation website', og_find: 'Find website and contacts', og_donate: 'Donations are accepted via Click, Payme, Paynet and on the foundation’s website.',
    pg_go: 'Learn more', ip_s: 'Shares on the Tashkent Stock Exchange are bought through a licensed broker. Follow the news about the offering.', ip_news: 'News about the offering', ip_uzse: 'Tashkent Stock Exchange', ip_uznif: 'The IPO took place in May 2026: the shares trade in Tashkent and London.',
    rt_post: 'Post a sale or rental listing on the largest sites:', rt_buy: 'Flats, houses and commercial property:', rt_land: 'Land plots are sold on E-auksion, the state electronic auction.',
    cg_t: 'Public service centre', cg_s: 'Most services are available online on my.gov.uz without a queue. Bring your passport or ID card to the centre. Help line: 1242.', cg_map: 'Centres on the map', cg_call: 'Call 1242', cg_online: 'Open my.gov.uz',
    rs_rej: 'Rejected', login_first: 'Sign in with Telegram',
  },
};
RL_I.zh = RL_I.en;
for (const l in RL_I) Object.assign(I[l] || (I[l] = {}), RL_I[l]);
RP_COL.rej = '#6B7280';

const PAGE_BG = '#F9FBFC';
const ext = (href, title, sub, ic, col) => lk(href, title, sub, ic, col);
function bindActs(w) { w.addEventListener('click', e => { const b = e.target.closest('[data-act]'); if (!b || !w.contains(b)) return; e.preventDefault(); e.stopPropagation(); runAction(b.dataset.act); }); return w; }
// opaque block over a part of a design screen (hides its sample data) with live content on top
function cover(layer, y, h, html) { const d = hoverlay(layer, 0, y, 430, h, `<div class="cv-in">${html}</div>`); d.style.background = PAGE_BG; d.classList.add('cv'); return bindActs(d); }
const loginBtn = () => `<button class="h-btn h-tgbtn" data-act="tglogin">${TG_SVG}<span>${esc(t('tg_login'))}</span></button>`;
XACT.tglogin = () => tgLogin();
XACT.ext = url => window.open(url, '_blank', 'noopener');
XACT.aiopen = () => aiOpen();
const yaMyGov = id => `${MYGOV(LANG)}/service/${id}`;

// ---------- payments: open the real apps ----------
const PAY_APPS = [['Click', 'click.uz', 'https://click.uz', '#0F6CF2'], ['Payme', 'payme.uz', 'https://payme.uz', '#00B9C5'], ['Uzum Bank', 'uzumbank.uz', 'https://uzumbank.uz', '#7000FF'], ['Paynet', 'paynet.uz', 'https://paynet.uz', '#16A34A']];
HS.pay = (p) => {
  const key = String(p || 'other').split(':')[0];
  const kind = /^util/.test(key) || key === 'light' ? 'util' : key === 'fine' ? 'fine' : key === 'transit' ? 'transit' : key === 'event' || key === 'tourist' ? 'event' : key === 'qr' ? 'qr' : 'other';
  const first = { fine: ext('https://road24.uz', t('pay_road24'), 'road24.uz', GLYPH('🚓'), '#1D4ED8'), transit: ext('https://atto.uz', t('pay_atto'), 'atto.uz', GLYPH('🚇'), '#0EA5E9'), event: ext('https://iticket.uz', t('pay_iticket'), 'iticket.uz', GLYPH('🎟️'), '#DB2777') }[kind] || '';
  return `${hdr(t('pay_t'))}<div class="h-body">
    <div class="h-card"><div class="h-muted">${esc(t('pay_h_' + kind))}</div></div>
    ${kind === 'qr' ? btn(t('pay_scan'), 'go:h:qr', 'primary') : ''}${kind === 'util' ? btn(t('pay_calc'), 'go:1:5285', 'ghostd') : ''}
    ${first ? `<div class="hv-card bk-card" style="margin-top:12px">${first}</div>` : ''}
    <div class="h-sec">${esc(t('pay_apps'))}</div>
    <div class="hv-card bk-card">${PAY_APPS.map(([n, d, u, c]) => ext(u, n, d, `<b style="color:#fff;font-size:15px">${n[0]}</b>`, c)).join('')}</div>
    <div class="h-muted small" style="margin-top:12px">${esc(t('pay_s'))}</div></div>`;
};
HS.receipts = () => HS.pay('util');
HS.addcard = () => HS.pay('transit');

// ---------- cars (per user, in the account) ----------
let CARS = null;
function carsLoad() { return authUser() ? api('/api/cars').then(j => (CARS = j.ok ? j.list : CARS || [])) : Promise.resolve(CARS = []); }
const fmtPlate = p => { const m = String(p).match(/^(\d{2})([A-Z])(\d{3})([A-Z]{2})$/) || String(p).match(/^(\d{2})(\d{3})([A-Z]{3})$/); return m ? m.slice(1).join(' ') : p; };
const carRow = c => `<div class="car-row"><span class="hv-ic" style="background:#7C5426">${GLYPH('🚗')}</span><span class="car-tx"><b>${esc(c.model || t('car_t'))}</b><i>${esc(fmtPlate(c.plate))}${c.color ? ' · ' + esc(c.color) : ''}</i></span><a class="car-b" href="https://road24.uz" target="_blank" rel="noopener">${esc(t('car_fines'))}</a><button class="car-x" data-act="carrm:${esc(c.plate)}" aria-label="remove">✕</button></div>`;
function drawCars(layers) {
  const r = layers.r; if (!r) return;
  const w = cover(r, 352, 236, `<div class="hv-h">${esc(t('car_t'))}<button data-act="go:h:addcar">＋ ${esc(t('car_add'))}</button></div><div class="hv-card cars-box" id="carBox"><div class="hv-sk"></div></div>`);
  const box = w.querySelector('#carBox');
  const paint = () => {
    if (!authUser()) { box.innerHTML = `<p class="dc-empty">${esc(t('car_none'))}</p>${loginBtn()}`; return; }
    const l = CARS || []; if (!l.length) { box.innerHTML = `<p class="dc-empty">${esc(t('car_none'))}</p><button class="h-btn h-ghostd" data-act="go:h:addcar">＋ ${esc(t('car_add'))}</button>`; return; }
    box.innerHTML = l.slice(0, 2).map(carRow).join('') + (l.length > 2 ? `<button class="hov-link" data-act="carsall">${esc(t('car_all', { n: l.length }))} ›</button>` : '');
  };
  paint(); carsLoad().then(() => { if (document.body.contains(box)) paint(); });
}
XACT.carsall = () => bsheet(`<div class="hv-h" style="margin:0 0 10px">${esc(t('car_t'))}</div><div class="hv-card cars-box">${(CARS || []).map(carRow).join('')}</div>`, 'bs-caf');
XACT.carrm = plate => sheet(t('car_rm_q', { p: fmtPlate(plate) }), '', [[t('car_rm'), () => api('/api/cars', { action: 'remove', plate }).then(() => carsLoad()).then(() => { bsheetClose(true); render(current, currentP); })], [t('cancel'), null]]);
HS.addcar = () => {
  if (!authUser()) return `${hdr(t('addcar_t'))}<div class="h-body"><div class="h-card"><div class="h-muted">${esc(t('car_none'))}</div></div>${loginBtn()}</div>`;
  const cols = t('car_colors').split('|'), c = window.__carColor == null ? -1 : window.__carColor;
  return `${hdr(t('addcar_t'))}<div class="h-body"><div class="h-card">
    <label class="h-field"><span>${esc(t('car_plate'))}</span><input id="carP" placeholder="01 A 123 BC" autocapitalize="characters" autocomplete="off"></label>
    <label class="h-field"><span>${esc(t('car_model'))}</span><input id="carM" placeholder="Chevrolet Cobalt" autocomplete="off"></label>
    <div class="h-field"><span>${esc(t('car_color_l'))}</span></div><div class="h-chips" style="margin-top:-6px">${cols.map((x, i) => `<button class="h-chip ${i === c ? 'on' : ''}" data-act="carcolor:${i}">${esc(x)}</button>`).join('')}</div></div>
    ${btn(t('set_save'), 'carsave', 'primary')}</div>`;
};
XACT.carcolor = i => { window.__carColor = +i; document.querySelectorAll('.hscreen .h-chip').forEach((b, j) => b.classList.toggle('on', j === +i)); };
XACT.carsave = () => {
  const P = document.getElementById('carP'), plate = (P.value || '').toUpperCase().replace(/[^0-9A-Z]/g, '');
  if (!/^\d{2}([A-Z]\d{3}[A-Z]{2}|\d{3}[A-Z]{3})$/.test(plate)) { toast(t('car_bad')); return P.focus(); }
  const cols = t('car_colors').split('|');
  api('/api/cars', { plate, model: document.getElementById('carM').value, color: window.__carColor >= 0 ? cols[window.__carColor] : '' }).then(j => { if (j.ok) { window.__carColor = null; toast(t('car_ok')); carsLoad().then(() => goBack('1:4858')); } else toast(t('po_err')); });
};

// ---------- profile: real counters, my requests, personal data, notifications ----------
let ME = null;
function meLoad() { return authUser() ? api('/api/me').then(j => { if (j.ok) { ME = j; try { localStorage.setItem('uzk-user', JSON.stringify(j.user)); } catch (e) {} } return ME; }) : Promise.resolve(null); }
function drawStats(layers) {
  const r = layers.r; if (!r) return;
  const w = hoverlay(r, 24, 206, 382, 104, '<div class="ps-card" id="psBox"></div>'); bindActs(w);
  const box = w.querySelector('#psBox');
  const paint = () => {
    if (!authUser()) { box.innerHTML = `<button class="ps-guest" data-act="tglogin">${esc(t('st_guest'))}</button>`; return; }
    const s = (ME && ME.stats) || {};
    box.innerHTML = [['reports', 'st_rep'], ['votes', 'st_votes'], ['docs', 'st_docs']].map(([k, l]) => `<button data-act="go:h:myact"><b>${s[k] == null ? '…' : s[k]}</b><i>${esc(t(l))}</i></button>`).join('');
  };
  paint(); meLoad().then(() => { if (document.body.contains(box)) paint(); });
}
HS.myact = () => `${hdr(t('my_t'))}<div class="h-body" id="myBody"><div class="hv-sk"></div></div>`;
HS.myact.mount = el => {
  const b = el.querySelector('#myBody');
  if (!authUser()) { b.innerHTML = `<div class="h-card"><div class="h-muted">${esc(t('st_guest'))}</div></div>${loginBtn()}`; return; }
  Promise.all([api('/api/reports'), api('/api/docs'), carsLoad(), meLoad()]).then(([rp, dc]) => {
    const mine = (rp.list || []).filter(x => x.own), docs = dc.list || [], s = (ME && ME.stats) || {};
    const st = x => `<span class="rp-st" style="background:${RP_COL[x.status] || '#6B7280'}1a;color:${RP_COL[x.status] || '#6B7280'}">${esc(t('rs_' + x.status))}</span>`;
    b.innerHTML = `<div class="h-sec">${esc(t('my_rep'))}</div>
      <div class="hv-card bk-card">${mine.length ? mine.map(x => `<button class="bk-link" data-act="rpgo:${x.id}"><span class="hv-ic" style="background:${RP_COL[x.status] || '#6B7280'}1f">${RP_IC[x.kind] || '📌'}</span><span><b>№${x.id} · ${esc(t('rk_' + x.kind))}</b><i>${esc((x.text || '').slice(0, 80))}</i></span>${st(x)}</button>`).join('') : `<p class="dc-empty">${esc(t('my_rep_none'))}</p>`}</div>
      ${btn(t('my_rep_new'), 'go:h:reports?road', 'ghostd')}
      <div class="h-sec">${esc(t('my_docs'))}</div>
      <div class="hv-card bk-card">${docs.length ? docs.map(d => `<button class="bk-link" data-act="${d.kind === 'appt' ? 'go:1:5032' : 'go:1:19'}"><span class="hv-ic" style="background:${d.kind === 'appt' ? '#0EA5E9' : '#15803D'}">${GLYPH(d.kind === 'appt' ? '🩺' : '📄')}</span><span><b>${esc(d.kind === 'appt' ? (d.title || t('ap_t')) : t('dk_' + d.kind) + (d.title ? ' · ' + d.title : ''))}</b><i>${esc(d.expires.split('-').reverse().join('.'))}</i></span>${IC.chev}</button>`).join('') : `<p class="dc-empty">${esc(t('my_docs_none'))}</p>`}</div>
      <div class="h-sec">${esc(t('my_cars'))}</div>
      <div class="hv-card cars-box">${(CARS || []).length ? CARS.map(carRow).join('') : `<p class="dc-empty">${esc(t('car_none'))}</p>`}</div>
      <div class="h-muted small" style="margin-top:12px">🆘 ${esc(t('my_trust', { n: s.trusted || 0 }))}</div>`;
    bindActs(b);
  });
};
XACT.rpgo = id => { go('h:reports', 'road'); setTimeout(() => { try { rpOpen(+id); } catch (e) {} }, 900); };
function drawSettings(layers) {
  const r = layers.r; if (!r) return;
  const w = cover(r, 150, 400, `<div class="hv-h" style="margin-top:8px">${esc(t('set_t'))}</div><div class="hv-card bk-card" id="setBox"></div>`);
  const box = w.querySelector('#setBox');
  const u = authUser();
  if (!u) { box.innerHTML = `<p class="dc-empty">${esc(t('st_guest'))}</p>${loginBtn()}`; return; }
  const rowS = (ic, l, v, act) => `<button class="bk-link" ${act ? `data-act="${act}"` : 'disabled'}><span class="hv-ic" style="background:#F3F4F6">${GLYPH(ic)}</span><span><i>${esc(l)}</i><b>${esc(v || t('set_none'))}</b></span>${act ? IC.chev : ''}</button>`;
  const paint = mah => { box.innerHTML = rowS('👤', t('set_name'), userName(), 'setname') + rowS('📱', t('set_phone'), fmtPhone(u.phone), '') + (u.username ? rowS('✈️', t('set_tg'), '@' + u.username, '') : '') + rowS('🏙️', t('set_city'), cityName(cityIdx()), 'go:h:city') + rowS('🏘️', t('set_mah'), mah, 'setmah'); };
  paint(PREFS && PREFS.mahalla); prefsLoad().then(p => { if (document.body.contains(box)) paint(p && p.mahalla); });
}
let PREFS = null;
function prefsLoad() { return authUser() ? api('/api/prefs').then(j => (PREFS = j.ok ? j.prefs : PREFS)) : Promise.resolve(null); }
function prefsSave(ch) { return api('/api/prefs', ch).then(j => { if (j.ok) PREFS = j.prefs; return j; }); }
function askText(title, val, ph, onSave) {
  const w = bsheet(`<div class="hv-h" style="margin:0 0 12px">${esc(title)}</div><input class="dc-in" id="askIn" value="${esc(val || '')}" placeholder="${esc(ph || '')}" maxlength="60" autocomplete="off"><button class="h-btn h-primary" id="askOk" style="margin-top:14px">${esc(t('set_save'))}</button>`, 'bs-caf');
  const i = w.querySelector('#askIn'); setTimeout(() => i.focus(), 300);
  const ok = () => { const v = i.value.trim(); onSave(v).then(() => { bsheetClose(true); toast(t('set_saved')); render(current, currentP); }); };
  w.querySelector('#askOk').addEventListener('click', e => { e.preventDefault(); ok(); });
  i.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); ok(); } });
}
XACT.setname = () => askText(t('set_name_t'), userName(), '', v => api('/api/me', { name: v }).then(j => { if (j.ok) try { localStorage.setItem('uzk-user', JSON.stringify(j.user)); } catch (e) {} }));
XACT.setmah = () => { if (needLogin()) return; askText(t('set_mah_t'), (PREFS && PREFS.mahalla) || '', t('set_mah_ph'), v => prefsSave({ mahalla: v })); };
HS.notif = () => `${hdr(t('nf_t'))}<div class="h-body" id="nfBody"><div class="hv-sk"></div></div>`;
HS.notif.mount = el => {
  const b = el.querySelector('#nfBody');
  if (!authUser()) { b.innerHTML = `<div class="h-card"><div class="h-muted">${esc(t('st_guest'))}</div></div>${loginBtn()}`; bindActs(b); return; }
  prefsLoad().then(p => {
    p = p || { docs: 1, reports: 1, air: 0 };
    b.innerHTML = `<div class="h-card np">${[['docs', '📄'], ['reports', '📝'], ['air', '😷']].map(([k, ic]) => `<label class="nf-row"><span>${ic}</span><b>${esc(t('nf_' + k))}</b><input type="checkbox" data-nf="${k}" ${p[k] ? 'checked' : ''}></label>`).join('')}</div><div class="h-muted small" style="margin-top:10px">🔔 ${esc(t('nf_s'))}</div>`;
    b.querySelectorAll('[data-nf]').forEach(c => c.addEventListener('change', () => prefsSave({ [c.dataset.nf]: c.checked }).then(j => toast(j.ok ? t('set_saved') : t('po_err')))));
  });
};

// ---------- help: real feedback + FAQ about this app ----------
function drawHelp(layers) {
  const r = layers.r; if (!r) return;
  const w = cover(r, 600, 220, `<div class="hv-h">${esc(t('fb_t'))}</div><textarea class="rp-ta" id="fbT" maxlength="2000" placeholder="${esc(t('fb_ph'))}"></textarea><button class="h-btn h-primary" id="fbS" style="margin-top:10px">${esc(t('fb_send'))}</button>`);
  w.querySelector('#fbS').addEventListener('click', e => {
    e.preventDefault(); e.stopPropagation(); const ta = w.querySelector('#fbT'), v = ta.value.trim();
    if (v.length < 3) { toast(t('fb_short')); return ta.focus(); }
    e.target.disabled = true; api('/api/feedback', { text: v }).then(j => { e.target.disabled = false; if (j.ok) { ta.value = ''; toast(t('fb_ok', { n: j.id })); } else toast(t('po_err')); });
  });
}
const FAQ = {
  ru: [
    [['Что такое MyUzCity?', 'Городские сервисы в одном приложении: карты поликлиник, мечетей, парковок и зарядок, транспорт и табло аэропортов, сообщения о проблемах, опросы, напоминания о документах и ИИ-ассистент. Бесплатно.'], ['Как войти?', 'Нажмите «Войти через Telegram», в боте @MyUzCity_bot поделитесь номером — бот пришлёт 6-значный код, введите его в приложении.'], ['Где мои данные?', 'Имя и телефон берутся из Telegram. Документы, машины и записи видите только вы.']],
    [['Как проверить штрафы?', 'Раздел «Штрафы» открывает официальное приложение Road24 и услуги my.gov.uz: штрафные баллы и обжалование.'], ['Где камеры скорости?', 'Все известные камеры — на карте в разделе «Штрафы» и «Камеры скорости».'], ['Как оплатить парковку?', 'В разделе «Парковка» — карта парковок и ссылки на официальные способы оплаты.']],
    [['Как получить госуслугу?', 'Раздел «Госуслуги»: популярные услуги my.gov.uz и ближайшие центры госуслуг. Колл-центр — 1242.'], ['Как работают напоминания о документах?', 'Добавьте документ и срок — бот напомнит за 30, 7 и 1 день.'], ['Как пожаловаться хокиму?', '«Обращение к хокиму» или «Сообщить о проблеме»: фото, место на карте, статус приходит в Telegram.']],
    [['Как сообщить о яме или мусоре?', 'Нажмите «Сообщить о проблеме», добавьте фото и точку на карте. Сообщение видно всем, жители могут его поддержать.'], ['Что делает тревожная кнопка?', 'Отправляет вашу геолокацию доверенным людям в Telegram. Добавьте близких в разделе «Тревожная кнопка».'], ['Откуда погода и воздух?', 'Open-Meteo — обновляется каждый час.']],
    [['Как найти достопримечательности?', 'Раздел «Достопримечательности» — карта, описания из Википедии и ИИ-гид.'], ['Где купить билеты?', '«Транспорт» и «Билеты»: поезда, самолёты и автобусы — с переходом на официальные сайты продажи.']],
    [['Можно ли купить акции в приложении?', 'Нет. Мы показываем информацию и ведём на Ташкентскую фондовую биржу; покупка — через лицензированного брокера.'], ['Где земля и новостройки?', 'Раздел «Недвижимость»: новостройки на карте, объявления на OLX и Uybor, участки на E-auksion.']],
  ],
  uz: [
    [['MyUzCity nima?', "Shahar xizmatlari bitta ilovada: poliklinika, masjid, parkovka va zaryadlash xaritalari, transport, aeroport tablosi, muammolar haqida xabar, so'rovnomalar, hujjat eslatmalari va AI-yordamchi. Bepul."], ['Qanday kiraman?', "«Telegram orqali kirish»ni bosing, @MyUzCity_bot botida raqamingizni yuboring — bot 6 xonali kod yuboradi, uni ilovaga kiriting."], ["Ma'lumotlarim qayerda?", "Ism va telefon Telegramdan olinadi. Hujjatlar, mashinalar va qabullarni faqat siz ko'rasiz."]],
    [['Jarimalarni qanday tekshiraman?', "«Jarimalar» bo'limi rasmiy Road24 ilovasi va my.gov.uz xizmatlarini ochadi."], ['Tezlik kameralari qayerda?', "Barcha ma'lum kameralar xaritada."], ["Parkovkaga qanday to'layman?", "«Parkovka» bo'limida — xarita va rasmiy to'lov usullari."]],
    [['Davlat xizmatini qanday olaman?', "«Davlat xizmatlari»: my.gov.uz xizmatlari va yaqin markazlar. Call-markaz — 1242."], ['Hujjat eslatmalari qanday ishlaydi?', "Hujjat va muddatni qo'shing — bot 30, 7 va 1 kun oldin eslatadi."], ['Hokimga qanday murojaat qilaman?', "«Hokimga murojaat» yoki «Muammo haqida xabar»: surat, xaritadagi joy, holat Telegramga keladi."]],
    [['Chuqur yoki chiqindi haqida qanday xabar beraman?', "«Muammo haqida xabar»ni bosing, surat va joyni qo'shing. Xabarni hamma ko'radi va qo'llab-quvvatlay oladi."], ['Xavf tugmasi nima qiladi?', "Joylashuvingizni ishonchli odamlarga Telegramda yuboradi."], ['Ob-havo va havo sifati qayerdan?', 'Open-Meteo — har soatda yangilanadi.']],
    [["Diqqatga sazovor joylarni qanday topaman?", "«Diqqatga sazovor joylar» — xarita, Vikipediya tavsiflari va AI-gid."], ['Chiptalarni qayerdan olaman?', "«Transport» va «Chiptalar»: poyezd, samolyot va avtobus — rasmiy saytlarga o'tish bilan."]],
    [["Ilovada aksiya sotib olsa bo'ladimi?", "Yo'q. Biz ma'lumot beramiz va Toshkent fond birjasiga yo'naltiramiz; xarid — litsenziyali broker orqali."], ['Yer va yangi uylar qayerda?', "«Ko'chmas mulk»: yangi uylar xaritada, OLX va Uybor e'lonlari, E-auksion uchastkalari."]],
  ],
  en: [
    [['What is MyUzCity?', 'City services in one app: maps of clinics, mosques, parking and EV chargers, transport and airport boards, problem reports, polls, document reminders and an AI assistant. Free.'], ['How do I sign in?', 'Tap “Sign in with Telegram”, share your number in @MyUzCity_bot — it sends a 6-digit code to enter in the app.'], ['Where is my data?', 'Name and phone come from Telegram. Only you see your documents, cars and appointments.']],
    [['How do I check fines?', '“Fines” opens the official Road24 app and my.gov.uz services: penalty points and appeals.'], ['Where are speed cameras?', 'All known cameras are on the map.'], ['How do I pay for parking?', '“Parking” has the parking map and official payment options.']],
    [['How do I get a public service?', '“Public services”: popular my.gov.uz services and the nearest centres. Call centre — 1242.'], ['How do document reminders work?', 'Add a document and its expiry — the bot reminds you 30, 7 and 1 day before.'], ['How do I appeal to the hokim?', 'Use “Appeal to the Hokim” or “Report a problem”: photo, place on the map, status updates in Telegram.']],
    [['How do I report a pothole or litter?', 'Tap “Report a problem”, add a photo and a point on the map. Reports are public and residents can support them.'], ['What does the panic button do?', 'It sends your location to trusted people in Telegram.'], ['Where do weather and air data come from?', 'Open-Meteo, updated hourly.']],
    [['How do I find sights?', '“Sights”: map, Wikipedia descriptions and an AI guide.'], ['Where can I buy tickets?', '“Transport” and “Tickets”: trains, flights and buses via the official sales sites.']],
    [['Can I buy shares in the app?', 'No. We show information and link to the Tashkent Stock Exchange; you buy through a licensed broker.'], ['Where are land plots and new buildings?', '“Real estate”: new buildings on the map, OLX and Uybor listings, plots on E-auksion.']],
  ],
};
FAQ.zh = FAQ.en;
HS.faq = (p) => { const i = Math.min(5, +p || 0), list = (FAQ[LANG] || FAQ.ru)[i] || []; return `${hdr(t('faq_cats').split('|')[i])}<div class="h-body"><div class="h-card np">${list.map(([q, a], j) => `<details class="h-faq" ${j ? '' : 'open'}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div></div>`; };

// ---------- documents / family / health: own data only ----------
function drawDocsPage(layers) { const r = layers.r; if (!r) return; cover(r, 140, 750, ''); drawDocs(layers, 156); }
XACT.diary = () => bsheet(`<div class="hv-h" style="margin:0 0 8px">${esc(t('dy_t'))}</div><p class="bs-p">${esc(t('dy_s'))}</p><div class="hv-card bk-card">${ext('https://emaktab.uz', t('dy_open'), 'emaktab.uz', GLYPH('📘'), '#143C20')}</div>`, 'bs-caf');
XACT.kinder = () => bsheet(`<div class="hv-h" style="margin:0 0 8px">${esc(t('kg_t'))}</div><p class="bs-p">${esc(t('kg_s'))}</p><div class="hv-card bk-card">${ext(yaMyGov(285), t('kg_open'), 'my.gov.uz', GLYPH('🏛️'), '#143C20')}<button class="bk-link" data-act="go:h:poi?edu:kindergarten"><span class="hv-ic" style="background:#DB2777">${GLYPH('🧸')}</span><span><b>${esc(t('kg_map'))}</b></span>${IC.chev}</button></div>`, 'bs-caf');
function drawFamilyPage(layers) { const r = layers.r; if (!r) return; cover(r, 372, 560, ''); drawFamily(layers, 384); }
const DMED = 'https://dmed.uz';
XACT.dmed = k => bsheet(`<div class="hv-h" style="margin:0 0 8px">${esc(t(k === 'mb' ? 'mb_t' : 'dm_t'))}</div><p class="bs-p">${esc(t(k === 'mb' ? 'mb_s' : 'dm_s'))}</p><div class="hv-card bk-card">${ext(DMED, t('dm_open'), 'dmed.uz', GLYPH('🩺'), '#0EA5E9')}${k === 'mb' ? '' : ext(MYGOV(LANG), t('dm_gov'), 'my.gov.uz', GLYPH('🏛️'), '#143C20')}<button class="bk-link" data-act="go:h:poi?med:clinic"><span class="hv-ic" style="background:#2563EB">${GLYPH('🏥')}</span><span><b>${esc(t('dm_near'))}</b></span>${IC.chev}</button></div>`, 'bs-caf');
HS.doctor = () => { setTimeout(() => { goBack('1:5032'); XACT.dmed('dm'); }, 0); return ''; };
HS.medbook = () => { setTimeout(() => { goBack('1:5032'); XACT.dmed('mb'); }, 0); return ''; };
HS.slots = HS.doctor;
HS.diary = () => { setTimeout(() => { goBack('1:3042'); XACT.diary(); }, 0); return ''; };
const apDays = d => Math.round((Date.parse(d + 'T00:00:00Z') - Date.parse(new Date(Date.now() + 5 * 3600e3).toISOString().slice(0, 10) + 'T00:00:00Z')) / 864e5);
function drawAppts(layers) {
  const r = layers.r; if (!r) return;
  const w = cover(r, 376, 330, `<div class="hv-h">${esc(t('ap_t'))}<button data-act="apadd">＋ ${esc(t('ap_add'))}</button></div><div class="hv-card dc-card" id="apBox"><div class="hv-sk"></div></div>`);
  const box = w.querySelector('#apBox');
  const paint = list => {
    if (!authUser()) { box.innerHTML = `<p class="dc-empty">${esc(t('ap_none'))}</p>${loginBtn()}`; return; }
    const l = (list || []).filter(d => d.kind === 'appt' && apDays(d.expires) >= 0).slice(0, 3);
    box.innerHTML = l.length ? l.map(d => { const n = apDays(d.expires); return `<button class="hv-mq" data-act="aprm:${esc(d.title)}"><span class="hv-dot" style="background:${n <= 1 ? '#D97706' : '#0EA5E9'}"></span><span><b>${esc(d.title)}</b><i>${esc(d.expires.split('-').reverse().join('.'))}${n === 0 ? ' · ' + t('ap_today') : n === 1 ? ' · ' + t('ap_tomorrow') : ''}</i></span></button>`; }).join('') : `<p class="dc-empty">${esc(t('ap_none'))}</p>`;
  };
  paint(null); if (authUser()) api('/api/docs').then(j => { if (document.body.contains(box)) paint(j.list); });
}
XACT.apadd = () => {
  if (needLogin()) return;
  const d0 = new Date(Date.now() + 5 * 3600e3 + 864e5).toISOString().slice(0, 10);
  const w = bsheet(`<div class="hv-h" style="margin:0 0 12px">${esc(t('ap_add'))}</div>
    <label class="h-field"><span>${esc(t('ap_doc'))}</span><input class="dc-in" id="apD" placeholder="${esc(t('ap_doc_ph'))}" maxlength="24"></label>
    <label class="h-field"><span>${esc(t('ap_place'))}</span><input class="dc-in" id="apP" placeholder="${esc(t('ap_place_ph'))}" maxlength="24"></label>
    <div style="display:flex;gap:10px"><label class="h-field" style="flex:1"><span>${esc(t('ap_date'))}</span><input class="dc-in" id="apDt" type="date" value="${d0}"></label><label class="h-field" style="flex:1"><span>${esc(t('ap_time'))}</span><input class="dc-in" id="apTm" type="time" value="10:00"></label></div>
    <button class="h-btn h-primary" id="apS" style="margin-top:12px">${esc(t('set_save'))}</button>`, 'bs-caf');
  w.querySelector('#apS').addEventListener('click', e => {
    e.preventDefault(); const doc = w.querySelector('#apD').value.trim() || t('ap_doc_ph'), pl = w.querySelector('#apP').value.trim(), dt = w.querySelector('#apDt').value, tm = w.querySelector('#apTm').value;
    if (!dt) return w.querySelector('#apDt').focus();
    const title = [doc, tm, pl].filter(Boolean).join(' · ').slice(0, 60);
    api('/api/docs', { kind: 'appt', title, expires: dt }).then(j => { if (j.ok) { bsheetClose(true); toast(t('ap_ok')); render(current, currentP); } else toast(t('po_err')); });
  });
};
XACT.aprm = title => sheet(title, '', [[t('ap_rm'), () => api('/api/docs', { action: 'remove', kind: 'appt', title }).then(() => render(current, currentP))], [t('cancel'), null]]);

// ---------- mahalla: own mahalla, real chat, live polls ----------
function drawMahallaTop(layers) {
  const r = layers.r; if (!r) return;
  const w = cover(r, 140, 770, `<div class="mh-head" id="mhHead"></div><button class="h-btn h-primary" data-act="go:h:chat" style="margin:4px 0 22px">💬 ${esc(t('mh_chat'))}</button><div class="hv-h">${esc(t('mh_polls'))}<button data-act="go:h:polls?mahalla">${esc(t('po_all_m') || '')} ›</button></div><div id="mhPolls"><div class="hv-sk"></div></div>`);
  const head = w.querySelector('#mhHead');
  const paintHead = mah => { head.innerHTML = mah ? `<b>${esc(t('mh_t'))} «${esc(mah)}»</b><button data-act="setmah" aria-label="edit">✎</button><i>${esc(cityName(cityIdx()))}</i>` : `<button class="mh-set" data-act="setmah"><b>＋ ${esc(t('mh_set'))}</b><i>${esc(t('mh_set_s'))}</i></button>`; };
  paintHead(PREFS && PREFS.mahalla); prefsLoad().then(p => { if (document.body.contains(head)) paintHead(p && p.mahalla); });
  api('/api/polls?scope=mahalla').then(j => {
    const box = w.querySelector('#mhPolls'); if (!box) return;
    const l = (j.ok ? j.polls : []).slice(0, 3);
    box.innerHTML = l.length ? l.map(p => { const top = p.counts.indexOf(Math.max(...p.counts)); return `<button class="pl-card mh-poll" data-act="go:h:polls?mahalla"><span class="pl-q">${esc(p.q)}</span><span class="pl-meta">👥 ${esc(t('mh_votes', { n: p.total }))}${p.total ? ' · ' + esc(p.options[top]) + ' ' + Math.round(p.counts[top] * 100 / p.total) + '%' : ''}</span><span class="mh-vote">${esc(p.mine != null ? '✓ ' + p.options[p.mine] : t('mh_vote'))}</span></button>`; }).join('') : `<div class="cf-empty">${esc(t('mh_none'))}</div>`;
  });
}
const chs = () => (window.__chat = window.__chat || { room: null, list: [], last: 0, timer: 0 });
function chatRoom(kind) { const ci = cityIdx(), m = PREFS && PREFS.mahalla; return kind === 'm' && m ? `m${ci}:${m.toLowerCase()}` : `c${ci}`; }
HS.chat = () => {
  const s = chs(), m = PREFS && PREFS.mahalla, k = s.kind || (m ? 'm' : 'c');
  return `${hdr(t('ch_t'))}<div class="ch-tabs"><button class="h-chip ${k === 'm' ? 'on' : ''}" data-act="chroom:m">🏘️ ${esc(m ? m : t('ch_mah'))}</button><button class="h-chip ${k === 'c' ? 'on' : ''}" data-act="chroom:c">🏙️ ${esc(cityName(cityIdx()))}</button></div>
    <div class="ch-list vs" id="chList"><div class="hv-sk"></div></div>
    <div class="ch-bar">${authUser() ? `<textarea id="chIn" rows="1" maxlength="800" placeholder="${esc(t('ch_ph'))}"></textarea><button id="chSend" aria-label="send">➤</button>` : loginBtn()}</div>`;
};
HS.chat.mount = el => {
  const s = chs(); clearInterval(s.timer);
  if (!s.kind) s.kind = PREFS && PREFS.mahalla ? 'm' : 'c';
  if (s.kind === 'm' && !(PREFS && PREFS.mahalla)) { prefsLoad().then(p => { if (p && p.mahalla) render(current, currentP); }); }
  const room = chatRoom(s.kind); if (room !== s.room) { s.room = room; s.list = []; s.last = 0; }
  const box = el.querySelector('#chList');
  const fmtT = ts => { const d = new Date(ts * 1000); return d.toLocaleTimeString(LANG === 'en' ? 'en-GB' : 'ru-RU', { hour: '2-digit', minute: '2-digit' }); };
  const paint = () => { if (!document.body.contains(box)) return clearInterval(s.timer); box.innerHTML = (s.list.length ? s.list.map(m => `<div class="ch-m ${m.mine ? 'me' : ''}">${m.mine ? '' : `<i>${esc(m.name)}</i>`}${esc(m.text)}<em>${fmtT(m.created)}</em></div>`).join('') : `<div class="cf-empty">${esc(t('ch_none'))}</div>`) + `<div class="ch-rules">${esc(t('ch_rules'))}</div>`; box.scrollTop = box.scrollHeight; };
  const pull = () => api(`/api/chat?room=${encodeURIComponent(s.room)}&after=${s.last}`).then(j => { if (!j.ok) return; if (j.list.length) { s.list = s.list.concat(j.list).slice(-200); s.last = s.list[s.list.length - 1].id; } paint(); });
  if (s.list.length) paint(); pull(); s.timer = setInterval(pull, 4000);
  const inp = el.querySelector('#chIn'), send = el.querySelector('#chSend');
  if (inp) {
    inp.addEventListener('input', () => { inp.style.height = 'auto'; inp.style.height = Math.min(120, inp.scrollHeight) + 'px'; });
    const go2 = () => { const v = inp.value.trim(); if (!v) return; send.disabled = true; api('/api/chat', { room: s.room, text: v }).then(j => { send.disabled = false; if (j.ok) { inp.value = ''; inp.style.height = 'auto'; pull(); } else toast(j._status === 429 ? t('ch_limit') : t('po_err')); }); };
    send.addEventListener('click', e => { e.preventDefault(); go2(); });
    inp.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); go2(); } });
  }
};
XACT.chroom = k => { const s = chs(); if (k === 'm' && !(PREFS && PREFS.mahalla)) { if (needLogin()) return; return XACT.setmah(); } s.kind = k; render(current, currentP); };

// ---------- tickets: flights, trains, buses on the official sites ----------
const TK_CITIES = [['TAS', 'Ташкент', 'Toshkent', 'Tashkent'], ['SKD', 'Самарканд', 'Samarqand', 'Samarkand'], ['BHK', 'Бухара', 'Buxoro', 'Bukhara'], ['UGC', 'Ургенч', 'Urganch', 'Urgench'], ['NCU', 'Нукус', 'Nukus', 'Nukus'], ['NMA', 'Наманган', 'Namangan', 'Namangan'], ['AZN', 'Андижан', 'Andijon', 'Andijan'], ['FEG', 'Фергана', "Farg'ona", 'Fergana'], ['KSQ', 'Карши', 'Qarshi', 'Karshi'], ['TMJ', 'Термез', 'Termiz', 'Termez'], ['NVI', 'Навои', 'Navoiy', 'Navoi'],
  ['MOW', 'Москва', 'Moskva', 'Moscow'], ['LED', 'Санкт-Петербург', 'Sankt-Peterburg', 'St Petersburg'], ['IST', 'Стамбул', 'Istanbul', 'Istanbul'], ['DXB', 'Дубай', 'Dubay', 'Dubai'], ['ALA', 'Алматы', 'Olmaota', 'Almaty'], ['ICN', 'Сеул', 'Seul', 'Seoul']];
const tkName = code => { const x = TK_CITIES.find(y => y[0] === code); return x ? x[LANG === 'ru' ? 1 : LANG === 'uz' ? 2 : 3] : code; };
HS.tickets = () => {
  const s = (window.__tk = window.__tk || { m: 'air', from: 'TAS', to: 'SKD', date: new Date(Date.now() + 5 * 3600e3 + 864e5).toISOString().slice(0, 10) });
  const opts = (sel, list) => list.map(c => `<option value="${c}" ${c === sel ? 'selected' : ''}>${esc(tkName(c))}</option>`).join('');
  const all = TK_CITIES.map(c => c[0]);
  const links = {
    air: ext('https://www.uzairways.com', t('tk_uzair'), 'uzairways.com', GLYPH('✈️'), '#1D4ED8') + `<button class="bk-link" data-act="go:h:flights"><span class="hv-ic" style="background:#0EA5E9">${GLYPH('🛫')}</span><span><b>${esc(t('tk_board'))}</b></span>${IC.chev}</button>`,
    rail: ext('https://eticket.railway.uz', 'eticket.railway.uz', '', GLYPH('🚄'), '#B45309') + `<button class="bk-link" data-act="go:h:trains"><span class="hv-ic" style="background:#7C5426">${GLYPH('🕒')}</span><span><b>${esc(t('tk_sched'))}</b></span>${IC.chev}</button>`,
    bus: ext('https://avtoticket.uz', 'avtoticket.uz', '', GLYPH('🚌'), '#15803D'),
  }[s.m];
  return `${hdr(t('tk_t'))}<div class="h-body">
    <div class="h-chips">${[['air', '✈️'], ['rail', '🚄'], ['bus', '🚌']].map(([k, ic]) => `<button class="h-chip ${s.m === k ? 'on' : ''}" data-act="tkmode:${k}">${ic} ${esc(t('tk_' + k))}</button>`).join('')}</div>
    <div class="h-card" style="margin-top:12px">
      ${s.m === 'air' ? `<label class="h-field"><span>${esc(t('tk_from'))}</span><select class="dc-in" id="tkF">${opts(s.from, all)}</select></label><label class="h-field"><span>${esc(t('tk_to'))}</span><select class="dc-in" id="tkT">${opts(s.to, all)}</select></label><label class="h-field"><span>${esc(t('tk_date'))}</span><input class="dc-in" type="date" id="tkD" value="${s.date}"></label>` : ''}
      <div class="h-muted">${esc(t('tk_' + s.m + '_s'))}</div></div>
    ${s.m === 'air' ? btn(t('tk_find'), 'tkfind', 'primary') : ''}
    <div class="hv-card bk-card" style="margin-top:12px">${links}</div></div>`;
};
XACT.tkmode = m => { window.__tk.m = m; render(current, currentP); };
XACT.tkfind = () => {
  const s = window.__tk, f = document.getElementById('tkF').value, to = document.getElementById('tkT').value, d = document.getElementById('tkD').value || s.date;
  Object.assign(s, { from: f, to, date: d }); if (f === to) return toast(t('tk_same'));
  const [y, mo, da] = d.split('-'); window.open(`https://www.aviasales.uz/search/${f}${da}${mo}${to}1`, '_blank', 'noopener');
};

// ---------- clean city: real air quality + recycling points ----------
HS.eco = (arg) => {
  const tab = arg === 'rec' ? 'rec' : 'air';
  return `${hdr(t('ec_t'))}<div class="h-body">
    <div class="h-chips">${[['air', '🌫️'], ['rec', '♻️']].map(([k, ic]) => `<button class="h-chip ${tab === k ? 'on' : ''}" data-act="go:h:eco?${k}">${ic} ${esc(t('ec_' + k))}</button>`).join('')}<button class="h-chip" data-act="go:h:reports?clean">🗑️ ${esc(t('ec_rep'))}</button></div>
    <div id="ecBody" style="margin-top:12px"><div class="hv-sk"></div></div></div>`;
};
HS.eco.mount = (el, arg) => {
  const b = el.querySelector('#ecBody');
  if (arg === 'rec') {
    b.innerHTML = `<div class="hv-h">${esc(t('ec_rec_s'))}</div><div id="ecMap" class="ec-map"></div><button class="h-btn h-primary" data-act="go:h:poi?recycle" style="margin-top:12px">${esc(t('ec_rec_open'))}</button>
      <div class="h-card" style="margin-top:14px"><div class="h-muted">${esc(t('ec_rep_s'))}</div></div>${btn(t('ec_rep'), 'go:h:reports?clean', 'ghostd')}`;
    bindActs(b); const m = b.querySelector('#ecMap'); if (typeof PO_K !== 'undefined' && PO_K.recycle) poMiniInto(m, 'recycle'); return;
  }
  const ci = cityIdx(), caps = []; const seen = new Set(); CITIES.forEach((c, i) => { if (!seen.has(c[4])) { seen.add(c[4]); caps.push(i); } });
  const q = `latitude=${caps.map(i => CITIES[i][5]).join(',')}&longitude=${caps.map(i => CITIES[i][6]).join(',')}&current=us_aqi,pm2_5`;
  Promise.all([wxLoad(ci).catch(() => null), fetch('https://air-quality-api.open-meteo.com/v1/air-quality?' + q).then(r => r.json()).catch(() => null)]).then(([, multi]) => {
    if (!document.body.contains(b)) return;
    const W = WX[ci] || {}, a = W.a && W.a.current, aq = a ? Math.round(a.us_aqi) : null, lv = aqLvl(aq);
    const hr = W.a && W.a.hourly, now = new Date(Date.now() + 5 * 3600e3).toISOString().slice(0, 13);
    const hi = hr && hr.time ? Math.max(0, hr.time.findIndex(x => x >= now)) : 0;
    const hours = hr && hr.us_aqi ? hr.time.slice(hi, hi + 24).filter((_, i) => i % 3 === 0).map((tm, k) => { const v = Math.round(hr.us_aqi[hi + k * 3]); const l2 = aqLvl(v); return `<div><i>${tm.slice(11, 16)}</i><b style="color:${AQ_COL[l2] || '#111'}">${isNaN(v) ? '—' : v}</b></div>`; }).join('') : '';
    const arr = Array.isArray(multi) ? multi : multi ? [multi] : [];
    const rows = caps.map((i, k) => [i, arr[k] && arr[k].current ? Math.round(arr[k].current.us_aqi) : null]).filter(x => x[1] != null).sort((x, y) => x[1] - y[1]);
    b.innerHTML = `${lv >= 0 ? `<div class="wx-aq" style="border-color:${AQ_COL[lv]}55;background:${AQ_COL[lv]}12"><div class="wx-aqh"><span style="background:${AQ_COL[lv]}">${aq}</span><div><b>${esc(cityName(ci))}: ${esc(t('aq_' + lv))}</b><i>PM2.5 ${Math.round(a.pm2_5)} · PM10 ${Math.round(a.pm10)} мкг/м³</i></div></div><p>${esc(t('aqa_' + lv))}</p></div>` : `<div class="cf-empty">${esc(t('po_err'))}</div>`}
      ${hours ? `<div class="h-sec">${esc(t('ec_hours'))}</div><div class="wx-hours ec-h">${hours}</div>` : ''}
      ${authUser() ? `<label class="nf-row h-card" style="margin-top:12px"><span>😷</span><b>${esc(t('ec_alert'))}</b><input type="checkbox" id="ecAl" ${PREFS && PREFS.air ? 'checked' : ''}></label>` : ''}
      ${rows.length ? `<div class="h-sec">${esc(t('ec_cities'))}</div><div class="h-card np fx-list">${rows.map(([i, v]) => { const l2 = aqLvl(v); return `<div class="fx-row"><b style="width:auto;flex:1">${esc(cityName(i))}</b><i style="flex:0 0 auto">${esc(t('aq_' + l2))}</i><span style="color:${AQ_COL[l2]};min-width:40px;text-align:right">${v}</span></div>`; }).join('')}</div>` : ''}
      <div class="h-muted small" style="margin-top:10px">${esc(t('ec_src'))}</div>`;
    const al = b.querySelector('#ecAl'); if (al) { prefsLoad().then(p => { if (p) al.checked = !!p.air; }); al.addEventListener('change', () => prefsSave({ air: al.checked }).then(j => toast(j.ok ? t('set_saved') : t('po_err')))); }
  });
};
function poMiniInto(el, k) {
  Promise.all([leafletReady(), poIndex()]).then(() => poLoad(k, poCity(k))).then(list => {
    const c = CITIES[poCity(k)], map = L.map(el, { zoomControl: false, attributionControl: true }).setView([c[5], c[6]], c[7] || 12); tiles(map);
    list.forEach(p => L.circleMarker([p.la, p.lo], { radius: 6, color: '#fff', weight: 2, fillColor: PO_K[k].col(p), fillOpacity: 1 }).addTo(map));
    if (!list.length) el.insertAdjacentHTML('beforeend', `<div class="ec-none">${esc(t('rc_none'))}</div>`);
  }).catch(() => {});
}

// ---------- volunteering, business, IPO, real estate, public service centres ----------
const ORG_WEB = { 0: 'https://ezguamal.org' };
XACT.org = i => { i = +i || 0; const n = ORGS[i]; bsheet(`<div class="hv-h" style="margin:0 0 8px">${esc(n)}</div><p class="bs-p">${esc(t('og_donate'))}</p><div class="hv-card bk-card">${ORG_WEB[i] ? ext(ORG_WEB[i], t('og_web'), ORG_WEB[i].replace('https://', ''), GLYPH('🌐'), '#143C20') : ''}${ext('https://www.google.com/search?q=' + encodeURIComponent(n + ' Uzbekistan'), t('og_find'), '', GLYPH('🔎'), '#6B7280')}</div>`, 'bs-caf'); };
HS.org = (p) => { setTimeout(() => { goBack('1:4356'); XACT.org(p); }, 0); return ''; };
const PROG_LINKS = [['https://invest.gov.uz', 'invest.gov.uz'], ['https://my.gov.uz', 'my.gov.uz'], ['https://lex.uz', 'lex.uz'], ['https://invest.gov.uz', 'invest.gov.uz']];
XACT.prog = i => { i = +i || 0; const n = (PROGS[LANG] || PROGS.ru)[i], [u, d] = PROG_LINKS[i]; bsheet(`<div class="hv-h" style="margin:0 0 10px">${esc(n)}</div><div class="hv-card bk-card">${ext(u, t('pg_go'), d, GLYPH('🏛️'), '#143C20')}</div>`, 'bs-caf'); };
HS.prog = (p) => { setTimeout(() => { goBack('1:523'); XACT.prog(p); }, 0); return ''; };
XACT.ipo = i => { i = +i || 0; const n = IPO[i], uznif = /National Investment Fund/i.test(n); bsheet(`<div class="hv-h" style="margin:0 0 8px">${esc(n)}</div><p class="bs-p">${esc(uznif ? t('ip_uznif') + ' ' : '')}${esc(t('ip_s'))}</p><div class="hv-card bk-card">${ext('https://uzse.uz', t('ip_uzse'), 'uzse.uz', GLYPH('📈'), '#143C20')}${ext('https://news.google.com/search?q=' + encodeURIComponent(n.replace(/\s*\(.*\)/, '') + ' IPO'), t('ip_news'), 'Google News', GLYPH('📰'), '#6B7280')}</div>`, 'bs-caf'); };
HS.ipo = (p) => { setTimeout(() => { goBack('1:332'); XACT.ipo(p); }, 0); return ''; };
XACT.realty = k => {
  k = +k || 0; const ttl = t('realty').split('|')[k] || '';
  const body = k === 3 ? `<p class="bs-p">${esc(t('rt_land'))}</p><div class="hv-card bk-card">${ext('https://e-auksion.uz', 'E-auksion', 'e-auksion.uz', GLYPH('🗺️'), '#143C20')}</div>`
    : `<p class="bs-p">${esc(t(k === 0 ? 'rt_post' : 'rt_buy'))}</p><div class="hv-card bk-card">${ext('https://www.olx.uz/nedvizhimost/', 'OLX — ' + ttl, 'olx.uz', GLYPH('🏠'), '#0F766E')}${ext('https://uybor.uz', 'Uybor', 'uybor.uz', GLYPH('🏢'), '#7C3AED')}</div>`;
  bsheet(`<div class="hv-h" style="margin:0 0 8px">${esc(ttl)}</div>${body}`, 'bs-caf');
};
HS.realty = (p) => { setTimeout(() => { goBack('1:235'); XACT.realty(p); }, 0); return ''; };
XACT.cgu = () => bsheet(`<div class="hv-h" style="margin:0 0 8px">${esc(t('cg_t'))}</div><p class="bs-p">${esc(t('cg_s'))}</p><div class="hv-card bk-card">${ext(MYGOV(LANG), t('cg_online'), 'my.gov.uz', GLYPH('🏛️'), '#143C20')}<button class="bk-link" data-act="go:h:poi?gov:cgu"><span class="hv-ic" style="background:#15803D">${GLYPH('📍')}</span><span><b>${esc(t('cg_map'))}</b></span>${IC.chev}</button><a class="bk-link" href="tel:1242"><span class="hv-ic" style="background:#0EA5E9">${GLYPH('📞')}</span><span><b>${esc(t('cg_call'))}</b></span>${IC.chev}</a></div>`, 'bs-caf');
HS.queue = () => { setTimeout(() => { goBack('1:2573'); XACT.cgu(); }, 0); return ''; };
HS.doc = () => { setTimeout(() => go('1:19'), 0); return ''; };
HS.booking = () => { setTimeout(() => go('h:cafes'), 0); return ''; };
HS.tourist = () => { setTimeout(() => go('h:poi', 'sight'), 0); return ''; };
HS.ai = (p) => { setTimeout(() => { goBack('1:1909'); aiOpen(); setTimeout(() => { try { aiAsk(t({ light: 'ai_light_q', metro: 'ai_metro_q', doc: 'ai_doc_q' }[p] || 'ai_doc_q')); } catch (e) {} }, 400); }, 0); return ''; };
AI_HIDE.add('h:chat'); AI_HIDE.add('h:tickets'); AI_HIDE.add('h:eco');

// ---------- recycling points (OpenStreetMap amenity=recycling) ----------
Object.assign(PO_SVG, { recycle: '<path d="M7 19H4.8a1.8 1.8 0 0 1-1.6-2.7L7 9.7M11 19h8.2a1.8 1.8 0 0 0 1.6-2.7l-1.2-2.2M14 16l-3 3 3 3M8.3 13.6 7 9.7l-4 1M9.3 5.6l1.2-2.1a1.8 1.8 0 0 1 3.1 0l3.9 6.7M13.4 9.6l3.8-.8 1 3.9"/>' });
PO_DATA.recycle = {};
const RC_I = {
  ru: { rc_t: 'Пункты приёма вторсырья', rc_kind: 'Пункт приёма', rc_s: 'Название или адрес', rcc_plastic: 'Пластик', rcc_paper: 'Бумага', rcc_glass: 'Стекло', rcc_metal: 'Металл', rcc_batteries: 'Батарейки', rcc_clothes: 'Одежда', rcc_centre: 'Пункт приёма', rc_takes: 'Принимают', rc_none: 'В этом городе на карте пока нет пунктов приёма' },
  uz: { rc_t: 'Ikkilamchi xomashyo qabul punktlari', rc_kind: 'Qabul punkti', rc_s: 'Nomi yoki manzili', rcc_plastic: 'Plastik', rcc_paper: "Qog'oz", rcc_glass: 'Shisha', rcc_metal: 'Metall', rcc_batteries: 'Batareyalar', rcc_clothes: 'Kiyim', rcc_centre: 'Qabul punkti', rc_takes: 'Qabul qilinadi', rc_none: "Bu shaharda xaritada hozircha qabul punktlari yo'q" },
  en: { rc_t: 'Recycling points', rc_kind: 'Recycling point', rc_s: 'Name or address', rcc_plastic: 'Plastic', rcc_paper: 'Paper', rcc_glass: 'Glass', rcc_metal: 'Metal', rcc_batteries: 'Batteries', rcc_clothes: 'Clothes', rcc_centre: 'Collection point', rc_takes: 'Accepts', rc_none: 'No recycling points on the map in this city yet' },
};
RC_I.zh = RC_I.en; for (const l in RC_I) Object.assign(I[l] || (I[l] = {}), RC_I[l]);
const RC_COL = { plastic: '#0EA5E9', paper: '#B45309', glass: '#16A34A', metal: '#64748B', batteries: '#DC2626', clothes: '#7C3AED', centre: '#15803D' };
const rcTypes = p => String(p.rt || '').split(',').filter(Boolean);
PO_K.recycle = { title: 'rc_t', cats: ['plastic', 'paper', 'glass', 'metal', 'batteries', 'clothes'], extraH: 0, foot: true,
  has: (p, c) => rcTypes(p).includes(c), col: p => RC_COL[rcTypes(p)[0]] || '#15803D', ic: () => 'recycle', name: p => p.n || t('rc_kind'),
  sub: p => [t('rc_kind'), rcTypes(p).map(x => t('rcc_' + x)).join(', ')].filter(Boolean).join(' · ') };
P2_PREFIX.recycle = 'rcc_'; P2_CHIPCOL.recycle = RC_COL;

// ---------- welcome: Telegram sign-in or browse as a guest (no imitation of OneID / MyID) ----------
const WL_I = { ru: { wl_guest: 'Продолжить без входа', wl_note: 'Имя и телефон берём из Telegram — паспортные данные не нужны.' }, uz: { wl_guest: 'Kirmasdan davom etish', wl_note: "Ism va telefon Telegramdan olinadi — pasport ma'lumotlari kerak emas." }, en: { wl_guest: 'Continue without signing in', wl_note: 'Your name and phone come from Telegram — no passport data needed.' } };
WL_I.zh = WL_I.en; for (const l in WL_I) Object.assign(I[l] || (I[l] = {}), WL_I[l]);
HS.welcome = () => `<div class="h-welcome">
  <div class="h-wtop"><img src="icon-192.png" alt="" class="h-wlogo"><div class="h-wname">MyUzCity</div><div class="h-wt">${esc(t('welcome_t'))}</div><div class="h-ws">${esc(t('welcome_s'))}</div></div>
  <div class="h-wlangs">${Object.keys(LANGS).map(l => `<button class="h-chip ${l === LANG ? 'on' : ''}" data-act="lang:${l}">${LANGS[l]}</button>`).join('')}</div>
  <div class="h-wbtns"><button class="h-btn h-tgbtn" data-act="tglogin">${TG_SVG}<span>${esc(t('tg_login'))}</span></button>${btn(t('wl_guest'), 'login', 'ghost')}</div>
  <div class="h-demo light">${esc(t('wl_note'))}</div></div>`;
