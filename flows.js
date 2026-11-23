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
// own assistant (Cloudflare Pages Function, functions/api/assistant.js); the old endpoint stays as a fallback
const AI_OWN = /(^|\.)myuzcity\.(uz|pages\.dev)$/.test(location.hostname) ? '/api/assistant' : 'https://myuzcity.pages.dev/api/assistant';
async function aiFetch(body, signal) {
  try { const r = await fetch(AI_OWN, { method: 'POST', headers: { 'content-type': 'application/json' }, signal, body: JSON.stringify(body) }); const j = await r.json(); if (j) return j; } catch (e) { if (signal && signal.aborted) throw e; }
  return {};
}
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
  med: ['h:poi?med', 'Аптеки и клиники рядом', 'Yaqin dorixona va klinikalar', 'Pharmacies & clinics nearby', '附近药店和诊所'], parking_map: ['h:poi?parking', 'Карта парковок', 'Avtoturargohlar xaritasi', 'Parking map', '停车地图'],
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
  const go = []; s = String(s).replace(/\s*\[\[\s*(?:go\s*:\s*)?([a-z_]+)\s*\]\]/gi, (m, k) => { if (AI_GO[k] && !go.includes(k)) go.push(k); return ''; }).trim();
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
    const j = await aiFetch({ messages: AIS.msgs.filter(m => m.role === 'user' || m.role === 'assistant').slice(-14), lang: LANG, name: { ru: 'Владислав', uz: 'Vladislav', en: 'Vladislav', zh: 'Vladislav' }[LANG], city: cityName(), date: liveText('date'), screen: AIS.screen || '',
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
  if (id === '1:4858') return drawParking(layers);
  if (id === '1:3529') return drawMosques(layers);
  if (id === '1:5032') return drawHealth(layers);
  if (id === '1:996') return drawMahalla(layers);
  if (id === '1:2379') return drawTransit(layers);
  if (id === '1:140') return drawInvest(layers);
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
function poIndex() { return PO_INDEX ? Promise.resolve(PO_INDEX) : fetch('data/poi/index.json', { cache: 'no-cache' }).then(r => r.json()).then(j => (PO_INDEX = j)); }
function poLoad(k, ci) {
  if (PO_DATA[k][ci]) return Promise.resolve(PO_DATA[k][ci]);
  return poIndex().then(ix => (ix.n[k] || {})[ci] ? fetch(`data/poi/${k}/${ci}.json`).then(r => r.json()) : []).then(l => (PO_DATA[k][ci] = l));
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
  if (k === 'build') return '';
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
    const lab = c === 'all' ? t('cat_all') : t((k === 'parking' ? 'pkc_' : k === 'mosque' ? 'mqc_' : k === 'build' ? 'bdc_' : c === 'open' ? 'cat_' : 'mdc_') + c);
    const col = k === 'med' && PO_COL[c] ? PO_COL[c] : k === 'parking' ? { paid: '#1D4ED8', free: '#15803D', m: '#7C3AED', u: '#7C3AED' }[c] : k === 'mosque' && c === 'hist' ? '#B45309' : k === 'build' ? { c: '#D97706', r: '#2563EB', o: '#7C3AED' }[c] || '' : '';
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
  const tags = k === 'build' ? [t('bdk_' + p.s), p.k === 'o' ? t('bdk_o') : '', p.lv ? t('bd_lv_n', { n: p.lv }) : ''] : k === 'parking' ? [t('pkk_' + p.k), p.f === 1 ? t('pk_paid') : p.f === 0 ? t('pk_free') : '', p.cu ? t('pk_cust') : ''] : k === 'mosque' ? [t('mq_kind'), p.hi ? t('mq_hist') : ''] : [t('mdk_' + p.a), p.em ? t('md_em') : '', poH24(p) ? t('mdc_h24') : ''];
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
      ${k === 'build' && p.dv ? row(t('bd_dv'), esc(p.dv)) : ''}
      ${k === 'build' && p.lv ? row(t('bd_lv'), esc(String(p.lv))) : ''}
      ${k === 'build' && p.sd ? row(t('bd_sd'), esc(p.sd)) : ''}
      ${k === 'build' && p.ed ? row(t('bd_ed'), esc(p.ed)) : ''}
      ${k === 'med' && p.sp ? row(t('md_sp'), esc(p.sp.split(';').map(x => x.replace(/_/g, ' ')).join(', '))) : ''}
      ${p.h ? row(t('caf_hours'), ohPretty(esc(p.h))) : ''}
      ${p.ph ? row(t('caf_phone'), `<a href="tel:${esc(tel)}">${esc(p.ph)}</a>`) : ''}
      ${p.w ? row(t('caf_site'), `<a href="${esc(/^https?:/.test(p.w) ? p.w : 'https://' + p.w)}" target="_blank" rel="noopener">${esc(p.w.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''))}</a>`) : ''}
      ${wp ? row('Wikipedia', `<a href="https://${esc(wp[1])}.wikipedia.org/wiki/${esc(encodeURIComponent(wp[2]))}" target="_blank" rel="noopener">${esc(t('mq_wiki'))}</a>`) : ''}
    </div>
    ${tel ? `<a class="h-btn h-ghostd cf-callbtn" href="tel:${esc(tel)}">${esc(t('caf_call'))}</a>` : ''}
    ${k === 'parking' ? `<button class="h-btn h-ghostd cf-rtbtn" data-act="pkpay">${esc(t('pk_pay'))}</button>` : ''}
    ${k === 'build' && p.n ? `<a class="h-btn h-ghostd cf-callbtn cf-rtbtn" href="https://www.olx.uz/list/q-${esc(encodeURIComponent(p.n.replace(/[«»"]/g, '')))}/" target="_blank" rel="noopener">${esc(t('bd_olx'))}</a>` : ''}
    <button class="h-btn h-primary cf-rtbtn" data-act="poroute:${k}:${p.id}">${esc(t(k === 'parking' ? 'route' : 'rt_t'))}</button>
    <div class="cf-sec">${esc(t('caf_route'))}</div><div class="cf-sub">${esc(t('caf_route_s'))}</div>
    <div class="cf-routes">${navLinks(p, null, 'car').map(([n, u, c, l]) => `<a href="${esc(u)}" target="_blank" rel="noopener"><span style="background:${c}">${l}</span>${esc(n)}</a>`).join('')}</div>
    ${k === 'build' || k === 'mosque' ? `<a class="cf-ya" href="https://yandex.uz/maps/?text=${esc(encodeURIComponent(K.name(p) + ' ' + CITIES[poCity(k)][0]))}&ll=${p.lo},${p.la}&z=16" target="_blank" rel="noopener">${esc(t('caf_photos'))} ›</a>` : ''}
    <div class="h-muted small cam-note">${esc(t(k === 'build' ? 'bd_note' : 'po_src'))}</div>`, 'bs-caf');
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
function trLoad() { if (TR_DATA) return Promise.resolve(TR_DATA); return TR_P || (TR_P = fetch('data/transit/0.json', { cache: 'no-cache' }).then(r => r.json()).then(j => { j.metro.lines.forEach((l, i) => { const nc = { red: '#DA291C', blue: '#0057B8', green: '#009A44', yellow: '#F2A900', purple: '#7C3AED', orange: '#EA580C' }[String(l.c).toLowerCase()]; if (nc) l.c = nc; else if (!/^#?[0-9a-f]{3,6}$/i.test(l.c || '')) l.c = TR_MCOL[i % TR_MCOL.length]; else if (l.c[0] !== '#') l.c = '#' + l.c; l.n = String(l.n).split(':')[0].replace(/\s*линия\s.*$/i, ' линия').replace(/\s*-\s*/g, ' — ').trim(); }); return (TR_DATA = j); }).catch(e => { TR_P = null; throw e; })); }
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
