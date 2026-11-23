// MyUzCity AI assistant — Cloudflare Pages Function + Workers AI (binding "AI", see wrangler.toml).
// Knows the app's sections, reads the app's own live data (data/places, data/news) and answers with
// action tags the app turns into buttons: [[go:code]], [[place:id]], [[cafes:query]], [[poi:kind:id]].
const MODELS = ['@cf/openai/gpt-oss-120b', '@cf/meta/llama-3.3-70b-instruct-fp8-fast'];
const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-methods': 'POST, OPTIONS', 'access-control-allow-headers': 'content-type' };
const LANGS = { ru: 'русском', uz: 'узбекском (латиница)', en: 'английском', zh: 'китайском' };

const SERVICES = [
  ['cafes', 'Кафе и рестораны: карта, фильтры (плов, кальян, кофе…), карточки заведений, маршрут, цена такси Yandex Go'],
  ['news', 'Новости и афиша города: события, кино, ярмарки, акции (обновляется каждые 2 часа)'],
  ['cams', 'Видеокамеры: открытые живые камеры (сейчас — курорт Амирсой)'],
  ['med', 'Аптеки, больницы, клиники, стоматологии и лаборатории на карте: «открыто сейчас», круглосуточные, звонок, маршрут; номера 103 и 112'],
  ['mosques', 'Мечети и намаз: время намаза на сегодня по городу, ближайшие мечети'], ['mosque_map', 'Мечети на карте: поиск, исторические мечети, маршрут пешком/на авто'],
  ['parking', 'Парковка: мои авто, оплата по QR, карта парковок'], ['parking_map', 'Карта парковок (платные/бесплатные, паркинги) и инструкция, как оплатить парковку'],
  ['metro', 'Метро Ташкента: схема линий, станции, пересадки, как дойти до станции'], ['bus', 'Автобусы, троллейбусы и маршрутки: остановки рядом, какие маршруты идут, путь маршрута по остановкам, где автобус сейчас (через Яндекс Карты/2ГИС)'],
  ['transit', 'Транспортная карта: пополнить, добавить карту; вход в метро и автобусы'], ['fines', 'Штрафы'], ['ev', 'Зарядка электромобилей'],
  ['pay_light', 'Оплатить электричество'], ['pay_util', 'Коммунальные платежи'], ['doctor', 'Запись к врачу'], ['health', 'Здоровье и медицина: запись к врачу, медкнижка, аптеки и больницы рядом'],
  ['docs', 'Мои документы'], ['queue', 'Электронная очередь'], ['gov', 'Госуслуги'], ['appeal', 'Обращение к хокиму'], ['sos', 'Тревожная кнопка'],
  ['polls', 'Опросы'], ['mahalla', 'Цифровая махалля'], ['family', 'Семья и образование'], ['tickets', 'Билеты'], ['sights', 'Достопримечательности'],
  ['tourist', 'Туристическая карта'], ['fairs', 'Ярмарки и события'], ['realty', 'Недвижимость: объявления, вторичка, участки'], ['newbuild', 'Новостройки на карте: ЖК, стройки, высотки, застройщик, ссылки на квартиры в продаже'], ['ipo', 'Покупка акций IPO'], ['business', 'Для бизнеса'],
  ['volunteer', 'Волонтёрство'], ['cashback', 'Национальный кешбэк'], ['roads', 'Дороги и ремонт'], ['clean', 'Чистый город'],
  ['marketplace', 'Маркетплейс'], ['home', 'Электронный дом'],
];
const FOOD = [[/плов|palov|plov|\bosh\b/i, 'plov'], [/кальян|qalyan|hookah|shisha/i, 'hookah'], [/коф|qahva|coffee/i, 'coffee'], [/шашлык|кебаб|гриль|мяс|стейк|shashlik|kabob|kebab|grill|steak/i, 'grill'],
  [/суши|роллы|азиат|корей|китай|япон|рамен|вок|sushi|asian|korean|chinese|ramen|wok/i, 'asia'], [/пицц|итал|европ|паст|pizza|italian|pasta/i, 'europe'], [/бургер|фаст|перекус|burger|fast food|snack/i, 'fast'],
  [/\bбар\b|пиво|вино|коктейл|\bbar\b|beer|wine|cocktail/i, 'bar'], [/террас|летн|на улице|terrace|outdoor/i, 'terrace'], [/национ|узбек|чайхан|milliy|uzbek|national/i, 'national']];
const FOOD_ANY = /кафе|ресторан|поесть|покушать|пообедать|поужинать|позавтракать|еда|кухн|куда сходить|ovqat|kafe|restoran|eat|food|lunch|dinner|breakfast|restaurant|cafe|吃|餐/i;
const MED = [[/аптек|лекарств|dorixona|pharmac|药/i, 'pharmacy'], [/стомат|зуб|tish|dentist|tooth|牙/i, 'dentist'], [/больниц|госпитал|стационар|скор|shifoxona|hospital|医院/i, 'hospital'], [/анализ|лаборатор|tahlil|laborator|lab test|化验/i, 'lab'], [/клиник|поликлиник|врач|доктор|klinika|shifokor|clinic|doctor|诊所/i, 'clinic']];
const MOSQUE = /мечет|намаз|молитв|джума|masjid|namoz|juma|mosque|prayer|清真寺|礼拜/i;
const PARK = /парков|паркинг|avtoturargoh|parking|停车/i;
const NEWS_ANY = /новост|афиш|событ|куда пойти|выходн|концерт|кино|ярмарк|акци|скидк|yangilik|afisha|tadbir|news|event|weekend|concert|cinema|新闻|活动/i;

const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'content-type': 'application/json; charset=utf-8', ...CORS } });
async function getJSON(url) { try { const r = await fetch(url, { cf: { cacheTtl: 300 } }); return r.ok ? await r.json() : null; } catch { return null; } }
function dist(a, b) { const R = 6371, r = Math.PI / 180, dLa = (b[0] - a[0]) * r, dLo = (b[1] - a[1]) * r; const h = Math.sin(dLa / 2) ** 2 + Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.sin(dLo / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(h)); }

function shortlist(list, q, loc) {
  const cats = FOOD.filter(([re]) => re.test(q)).map(([, c]) => c);
  const words = q.toLowerCase().split(/[^a-zа-яё0-9']+/i).filter(w => w.length > 3);
  const sc = p => {
    let s = 0; for (const c of cats) if (p.c.includes(c)) s += 6;
    const hay = (p.n + ' ' + (p.n2 || '') + ' ' + (p.cu || '')).toLowerCase(); for (const w of words) if (hay.includes(w)) s += 3;
    s += (p.ph ? .6 : 0) + (p.h ? .8 : 0) + (p.ad ? .4 : 0);
    if (loc) s -= dist(loc, [p.la, p.lo]) * (/рядом|близко|недалеко|near|yaqin/i.test(q) ? 1.2 : .35);
    return s;
  };
  return list.filter(p => !cats.length || cats.some(c => p.c.includes(c))).map(p => [sc(p), p]).sort((a, b) => b[0] - a[0]).slice(0, 15).map(x => x[1]);
}

function nearList(list, loc, n) {
  const sc = p => (p.n ? 0 : 2) + (loc ? dist(loc, [p.la, p.lo]) : 0) - (p.ph ? .3 : 0) - (p.h ? .3 : 0) - (p.em ? .5 : 0) - (p.hi ? .3 : 0);
  return list.map(p => [sc(p), p]).sort((a, b) => a[0] - b[0]).slice(0, n).map(x => x[1]);
}
function system(b, places, news, extra = '') {
  const lang = LANGS[b.lang] || LANGS.ru;
  return `Ты — ИИ-ассистент городского приложения MyUzCity (Узбекистан). Пользователь: ${b.name && b.name !== '—' ? b.name : 'гость (имя неизвестно, не придумывай его)'}. Город: ${b.city || 'Ташкент'}. Сейчас: ${b.date || ''}. Открытый экран: ${b.screen || '—'}.
Отвечай на ${lang} языке, коротко и по делу (2–5 предложений), дружелюбно. Не выдумывай факты, цены, телефоны, адреса и рейтинги: используй только данные ниже и общеизвестное. Если данных нет — честно скажи и предложи нужный раздел приложения.
Разделы приложения (код — что внутри):
${SERVICES.map(([k, d]) => `${k} — ${d}`).join('\n')}
Кнопки: чтобы показать переход в раздел, добавь в конце ответа тег [[go:код]] (не больше двух тегов).
${places ? `Заведения из данных приложения (id | название | тип | кухня | часы работы | адрес | расстояние):\n${places}\nЕсли человек хочет поесть — выбери до 3 подходящих по запросу и времени суток, для каждого коротко объясни почему и добавь тег [[place:ID]]. В конце можешь добавить [[cafes:короткий запрос]], чтобы открыть подбор в разделе кафе.` : 'Если человек хочет поесть или выбрать кафе — предложи раздел [[go:cafes]] или тег [[cafes:короткий запрос]].'}
${news ? `Свежие новости и афиша города из приложения:\n${news}\nМожешь кратко пересказать подходящие и добавить [[go:news]].` : ''}
${extra}`.trim();
}

function extract(r) {
  if (!r) return ''; if (typeof r === 'string') return r;
  if (typeof r.response === 'string') return r.response;
  if (r.output_text) return r.output_text;
  if (r.choices && r.choices[0] && r.choices[0].message) return r.choices[0].message.content || '';
  if (Array.isArray(r.output)) return r.output.filter(o => o.type === 'message' || o.content).flatMap(o => o.content || []).map(c => c.text || '').join('').trim();
  if (r.result) return extract(r.result);
  return '';
}

export const onRequestOptions = () => new Response(null, { headers: CORS });
export async function onRequestPost({ request, env }) {
  let b; try { b = await request.json(); } catch { return json({ ok: false, error: 'bad request' }, 400); }
  const msgs = (b.messages || []).filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string').slice(-12).map(m => ({ role: m.role, content: m.content.slice(0, 2000) }));
  if (!msgs.length || !env.AI) return json({ ok: false, error: env.AI ? 'empty' : 'AI binding missing' }, env.AI ? 400 : 500);
  const last = [...msgs].reverse().find(m => m.role === 'user').content;
  const origin = new URL(request.url).origin;
  const ctx = b.ctx || {}; const ci = Number.isInteger(ctx.cityIdx) ? ctx.cityIdx : 0;
  const loc = Array.isArray(ctx.loc) && ctx.loc.length === 2 ? ctx.loc.map(Number) : null;
  let places = '', news = '';
  if (b.mode !== 'raw' && (FOOD_ANY.test(last) || FOOD.some(([re]) => re.test(last)))) {
    const list = (await getJSON(`${origin}/data/places/${ci}.json`)) || [];
    places = shortlist(list, last, loc).map(p => `${p.id} | ${p.n} | ${p.a} | ${p.cu || '—'} | ${p.h || 'нет данных'} | ${p.ad || '—'} | ${loc ? dist(loc, [p.la, p.lo]).toFixed(1) + ' км' : '—'}`).join('\n');
  }
  if (b.mode !== 'raw' && NEWS_ANY.test(last)) {
    const n = await getJSON(`${origin}/data/news.json`);
    const items = n ? ((n.cities && n.cities[ci]) || n.all || []) : [];
    news = items.slice(0, 8).map(x => `• ${x.t} (${x.s}, ${String(x.d).slice(0, 10)})`).join('\n');
  }
  let extra = '';
  if (b.mode !== 'raw') {
    const poi = async (k, filter, n, label) => {
      const list = ((await getJSON(`${origin}/data/poi/${k}/${ci}.json`)) || []).filter(filter);
      return nearList(list, loc, n).map(p => `${k}:${p.id} | ${p.n || label} | ${p.a || (p.k ? ({ m: 'многоуровневый', u: 'подземный', s: 'вдоль улицы', g: 'открытая' })[p.k] : '') || (p.hi ? 'историческая' : '')} | ${p.f === 1 ? 'платная' : p.f === 0 ? 'бесплатная' : ''} | ${p.h || ''} | ${p.ad || '—'} | ${p.ph || ''} | ${loc ? dist(loc, [p.la, p.lo]).toFixed(1) + ' км' : ''}`).join('\n');
    };
    const medK = MED.filter(([re]) => re.test(last)).map(([, k]) => k);
    if (medK.length) extra += `Медицина из данных приложения (тег | название | тип | часы | адрес | телефон | расстояние):\n${await poi('med', p => medK.includes(p.a) || (medK.includes('hospital') && p.em), 8, 'Аптека')}\nПредложи до 3 подходящих (учитывай часы работы и время сейчас), для каждого добавь тег [[poi:ТЕГ]], где ТЕГ — значение из первой колонки целиком (например [[poi:med:n123]]). При угрозе жизни — сразу скажи звонить 103. Можно добавить [[go:med]].\n`;
    if (MOSQUE.test(last)) {
      if (ctx.pray) extra += `Время намаза сегодня в городе пользователя (расчёт по методике Управления мусульман Узбекистана, ±2 мин): ${String(ctx.pray).slice(0, 200)}.\n`;
      extra += `Мечети из данных приложения (тег | название | тип | | часы | адрес):\n${await poi('mosque', p => p.n, 6, 'Мечеть')}\nМожешь предложить до 3 ближайших, для каждой тег [[poi:ТЕГ]], где ТЕГ — значение из первой колонки целиком (например [[poi:mosque:n123]]), и кнопку [[go:mosques]].\n`;
    }
    if (PARK.test(last)) extra += `Оплата парковки в Ташкенте: знак «P» и номер зоны; оплата в приложении Poytaxt Parking (QR на табличке), Payme, Click, Uzum Bank, терминалы Paynet; 5 000–12 000 сум/час, первые 5 минут бесплатно; штраф за неоплату 2 БРВ (880 000 сум); жителям — резидентское разрешение через my.gov.uz. Предложи [[go:parking_map]].\n${loc ? `Ближайшие парковки (тег | название | тип | оплата | часы | адрес):\n${await poi('parking', () => true, 5, 'Парковка')}\nМожно предложить до 2, для каждой тег [[poi:ТЕГ]] с полным значением из первой колонки (например [[poi:parking:w123]]).\n` : ''}`;
  }
  const sys = b.mode === 'raw' ? 'Ты — помощник приложения MyUzCity. Выполни задание пользователя строго в заданном формате, без лишнего текста.' : system(b, places, news, extra);
  for (const model of MODELS) {
    try {
      const r = await env.AI.run(model, { messages: [{ role: 'system', content: sys }, ...msgs], max_tokens: 900, temperature: 0.4 });
      const text = extract(r).replace(/<\|[^>]*\|>/g, '').trim();
      if (text) return json({ ok: true, reply: text, model });
    } catch (e) { /* try the next model */ }
  }
  return json({ ok: false, error: 'model unavailable' }, 502);
}
