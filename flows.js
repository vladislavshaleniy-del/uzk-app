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
  <div class="h-wtop"><img src="icon-192.png" alt="" class="h-wlogo"><div class="h-wname">MyUzCity</div><div class="h-wt">${esc(t('welcome_t'))}</div><div class="h-ws">${esc(t('welcome_s'))}</div></div>
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
const AI_URL = 'https://www.ast-group.uz/api/assistant';
const AIX = {
  ru: { as_t: 'ИИ ассистент', as_s: 'Отвечу на любой вопрос', as_hi: 'Здравствуйте, Владислав! Я ИИ ассистент MyUzCity. Спросите о чём угодно — госуслуги, платежи, транспорт, здоровье или любой другой вопрос.', as_ph: 'Напишите вопрос…', as_err: 'Не удалось получить ответ. Проверьте интернет и попробуйте ещё раз.', as_retry: 'Повторить', as_new: 'Новый диалог',
    as_q: 'Как оформить загранпаспорт?|Сколько стоит проезд в метро?|Какие документы нужны для детского сада?|Что посмотреть в городе {c}?' },
  uz: { as_t: 'AI yordamchi', as_s: 'Har qanday savolga javob beraman', as_hi: "Assalomu alaykum, Vladislav! Men MyUzCity AI yordamchisiman. Istalgan savolni bering — davlat xizmatlari, to'lovlar, transport, sog'liq va boshqalar.", as_ph: 'Savolingizni yozing…', as_err: "Javob olinmadi. Internetni tekshirib, qayta urinib ko'ring.", as_retry: 'Qayta urinish', as_new: 'Yangi suhbat',
    as_q: 'Xorijga chiqish pasportini qanday olish mumkin?|Metroda yo\'l haqi qancha?|Bog\'cha uchun qanday hujjatlar kerak?|{c}da nimalarni ko\'rish mumkin?' },
  en: { as_t: 'AI assistant', as_s: 'Ask me anything', as_hi: 'Hello, Vladislav! I am the MyUzCity AI assistant. Ask me anything — public services, payments, transport, health or any other question.', as_ph: 'Type your question…', as_err: 'Could not get an answer. Check your connection and try again.', as_retry: 'Retry', as_new: 'New chat',
    as_q: 'How do I get an international passport?|How much is a metro ride?|What documents are needed for kindergarten?|What to see in {c}?' },
  zh: { as_t: 'AI 助手', as_s: '有问必答', as_hi: '您好，Vladislav！我是 MyUzCity 的 AI 助手。任何问题都可以问我：政务服务、支付、交通、医疗等。', as_ph: '输入您的问题…', as_err: '未能获取回答，请检查网络后重试。', as_retry: '重试', as_new: '新对话',
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
  tickets: ['h:tickets', 'Билеты', 'Chiptalar', 'Tickets', '车票'], cafes: ['h:cafes', 'Кафе и рестораны', 'Kafe va restoranlar', 'Cafes and restaurants', '餐厅'],
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
  return (NEWS_P = fetch('data/news.json', { cache: 'no-cache' }).then(r => r.ok ? r.json() : null).then(j => { if (j && j.cities) NEWS = j; return NEWS; }).catch(() => NEWS));
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
  if (id !== '1:1909') return;
  const inner = layers['s:1:1910']; if (!inner) return;
  const draw = () => { if (current === '1:1909' && document.body.contains(inner)) drawHomeNews(inner); };
  if (NEWS) draw();
  loadNews().then(draw);
}
HS.news = () => {
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
  const idx = CAF_INDEX ? Promise.resolve(CAF_INDEX) : fetch('data/places/index.json', { cache: 'no-cache' }).then(r => r.ok ? r.json() : { cities: {} }).then(j => (CAF_INDEX = j));
  return idx.then(() => CAF_DATA[i] || (CAF_INDEX.cities[i] ? fetch(`data/places/${i}.json`, { cache: 'no-cache' }).then(r => r.ok ? r.json() : []).then(j => (CAF_DATA[i] = j)) : (CAF_DATA[i] = [])));
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
    <div class="h-body cf-body" id="cfList">${list ? '' : `<div class="cf-empty">${esc(t('caf_load'))}</div>`}</div>`;
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
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { maxZoom: 19, subdomains: 'abcd', attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> © <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>' }).addTo(CAF_MAP);
    CAF_MAP.attributionControl.setPrefix(false);
    CAF_MAP.on('moveend', () => { window.__cfView = { city: ci, c: CAF_MAP.getCenter(), z: CAF_MAP.getZoom() }; });
    CAF_LAYER = L.layerGroup().addTo(CAF_MAP);
    CAF_MAP.on('zoomend', () => { const r = cafR(); CAF_LAYER.eachLayer(m => m.setStyle({ radius: r, weight: r < 5 ? 1 : 1.6 })); });
    if (s.loc) cafMeMarker();
    cafRefresh(true);
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
    ${p.ph ? `<a class="h-btn h-primary cf-callbtn" href="tel:${esc(p.ph.replace(/[^\d+]/g, ''))}">${esc(t('caf_call'))}</a>` : ''}
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
