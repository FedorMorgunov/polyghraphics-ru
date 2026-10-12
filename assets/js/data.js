/* Полиграфика — демо-данные для макетов: иконки, виды работ, города, исполнители, цены.
   В реальном продукте всё это приходит с бэкенда. */
(function () {
  'use strict';

  // Линейные иконки 24px, штрих 1.8, скруглённые концы (бренд-бук, раздел 05)
  const ICONS = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.7 12.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.5L21 8H6.2"/>',
    calc: '<rect x="5" y="2.5" width="14" height="19" rx="3"/><path d="M8.5 6.5h7"/><path d="M9 11h.01M12 11h.01M15 11h.01M9 14.5h.01M12 14.5h.01M15 14.5h.01M9 18h.01M12 18h.01M15 18h.01"/>',
    truck: '<path d="M3 6h11v10H3z"/><path d="M14 9h4l3 3.5V16h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    shield: '<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z"/><path d="m8.8 12 2.2 2.2 4.3-4.4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8 12.3 2.8 2.8L16.2 9.5"/>',
    chat: '<path d="M20 15a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 12.5h5"/>',
    upload: '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="m9 14.5 2 2 4-4"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    lock: '<rect x="4" y="10.5" width="16" height="10.5" rx="2.5"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.6-4.5L4 8"/><path d="M4 3.5V8h4.5"/><path d="M4 13a8 8 0 0 0 14.6 4.5L20 16"/><path d="M20 20.5V16h-4.5"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',
    building: '<path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/><path d="M16 9h2a2 2 0 0 1 2 2v10M2 21h20M8 7h4M8 11h4M8 15h4"/>',
    handshake: '<path d="m11 17 2 2a1.4 1.4 0 0 0 2-2"/><path d="m14 14 2.5 2.5a1.4 1.4 0 0 0 2-2l-3.9-3.9a2.8 2.8 0 0 0-4 0l-.9.9a1.4 1.4 0 0 1-2-2l2.8-2.8a3.9 3.9 0 0 1 4.7-.6l.5.3a3.9 3.9 0 0 0 2.6.5L21 6"/><path d="m21 3 1 11h-2M3 3 2 14l6.5 6.5a1.4 1.4 0 0 0 2-2M3 4h8"/>',
    phone: '<path d="M5 3h3.5l1.5 5-2.2 1.4a11 11 0 0 0 6.8 6.8L16 14l5 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
    sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>',
    wallet: '<path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"/><path d="M3 7h16a2 2 0 0 1 2 2v3h-4a2 2 0 0 0 0 4h4"/>',
    share: '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.5M8.2 13.2l7.6 4.5"/>',
    heart: '<path d="M12 20s-8-4.6-8-10.4A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 2.6C20 15.4 12 20 12 20z"/>',
    locate: '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.2a6.5 6.5 0 0 1 3.5 5.8"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',

    // Виды работ
    design: '<path d="m12 19 7-7 3 3-7 7z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18z"/><path d="m2 2 7.6 7.6"/><circle cx="11" cy="11" r="2"/>',
    card: '<rect x="2.5" y="5.5" width="19" height="13" rx="2.5"/><path d="M6.5 10h7M6.5 14h4"/>',
    flyer: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
    booklet: '<path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/>',
    catalog: '<path d="M2 5h6a4 4 0 0 1 4 4v11a3 3 0 0 0-3-3H2z"/><path d="M22 5h-6a4 4 0 0 0-4 4v11a3 3 0 0 1 3-3h7z"/>',
    poster: '<rect x="4" y="2.5" width="16" height="19" rx="2"/><circle cx="9.5" cy="8.5" r="2"/><path d="m20 15-4.5-4.5L5 21"/>',
    banner: '<rect x="2.5" y="5.5" width="19" height="12" rx="1.5"/><circle cx="5.5" cy="8.5" r=".8"/><circle cx="18.5" cy="8.5" r=".8"/><circle cx="5.5" cy="14.5" r=".8"/><circle cx="18.5" cy="14.5" r=".8"/>',
    sticker: '<path d="M21 12V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7z"/><path d="M12 21v-5a4 4 0 0 1 4-4h5"/>',
    box: '<path d="m21 7.5-9-5-9 5v9l9 5 9-5z"/><path d="m3 7.5 9 5 9-5M12 12.5v9"/>',
    envelope: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01"/>',
    shirt: '<path d="M20.4 3.5 16 2a4 4 0 0 1-8 0L3.6 3.5a2 2 0 0 0-1.3 2.2l.6 3.5a1 1 0 0 0 1 .8H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.2a1 1 0 0 0 1-.8l.6-3.5a2 2 0 0 0-1.4-2.2z"/>',
    printer: '<path d="M6 9V3h12v6"/><rect x="2.5" y="9" width="19" height="8" rx="2"/><path d="M6 14h12v7H6z"/>',
    billboard: '<rect x="2.5" y="3.5" width="19" height="11" rx="1.5"/><path d="M12 14.5V21M8 21h8M6.5 8h7M6.5 11h4"/>',
  };

  function icon(name, cls) {
    const body = ICONS[name] || ICONS.sparkle;
    return '<svg' + (cls ? ' class="' + cls + '"' : '') + ' viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + '</svg>';
  }

  // Виды работ: порядок = порядок плиток на главной
  const CATEGORIES = [
    { id: 'design',    name: 'Дизайн макета',          icon: 'design',    from: 990,  featured: true, tag: 'с нуля', keys: 'дизайн макет логотип фирменный стиль брендбук верстка дизайнер' },
    { id: 'cards',     name: 'Визитки',                icon: 'card',      from: 590,  keys: 'визитки визитка карточки 90x50 визитные' },
    { id: 'flyers',    name: 'Листовки и флаеры',      icon: 'flyer',     from: 1290, keys: 'листовки флаеры листовка флаер а5 а6 а4 промо' },
    { id: 'booklets',  name: 'Буклеты',                icon: 'booklet',   from: 2400, keys: 'буклеты буклет евробуклет фальц' },
    { id: 'catalogs',  name: 'Каталоги и брошюры',     icon: 'catalog',   from: 4900, keys: 'каталоги каталог брошюры брошюра меню журнал книга' },
    { id: 'posters',   name: 'Плакаты и постеры',      icon: 'poster',    from: 390,  keys: 'плакаты плакат постеры постер афиша' },
    { id: 'banners',   name: 'Баннеры и широкоформат', icon: 'banner',    from: 2400, keys: 'баннеры баннер широкоформат растяжка роллап пресс-волл' },
    { id: 'stickers',  name: 'Наклейки и этикетки',    icon: 'sticker',   from: 790,  keys: 'наклейки наклейка этикетки этикетка стикеры стикер' },
    { id: 'packaging', name: 'Упаковка',               icon: 'box',       from: 9900, keys: 'упаковка коробки коробка пакеты пакет крафт' },
    { id: 'blanks',    name: 'Бланки и конверты',      icon: 'envelope',  from: 990,  keys: 'бланки бланк конверты конверт фирменный бланк' },
    { id: 'calendars', name: 'Календари',              icon: 'calendar',  from: 1900, keys: 'календари календарь квартальный настольный' },
    { id: 'merch',     name: 'Сувениры и мерч',        icon: 'shirt',     from: 290,  keys: 'сувениры мерч футболки футболка кружки кружка ручки' },
    { id: 'docs',      name: 'Печать документов',      icon: 'printer',   from: 9,    keys: 'печать документов копирование ксерокопия распечатать чертежи диплом' },
    { id: 'outdoor',   name: 'Наружная реклама',       icon: 'billboard', from: 14900, keys: 'наружная реклама вывеска вывески билборд световой короб' },
  ];

  // Города: active — работают, остальные — в списке ожидания
  const CITIES = [
    { name: 'Москва', n: 128 }, { name: 'Санкт-Петербург', n: 64 }, { name: 'Новосибирск', n: 18 },
    { name: 'Екатеринбург', n: 21 }, { name: 'Казань', n: 17 }, { name: 'Нижний Новгород', n: 14 },
    { name: 'Челябинск', n: 11 }, { name: 'Самара', n: 12 }, { name: 'Ростов-на-Дону', n: 13 },
    { name: 'Уфа', n: 9 }, { name: 'Краснодар', n: 15 }, { name: 'Пермь', n: 8 },
    { name: 'Воронеж', n: 7 }, { name: 'Красноярск', n: 8 }, { name: 'Омск', n: 6 },
    { name: 'Волгоград', n: 0 }, { name: 'Тюмень', n: 0 }, { name: 'Саратов', n: 0 },
    { name: 'Тольятти', n: 0 }, { name: 'Ижевск', n: 0 }, { name: 'Барнаул', n: 0 },
  ];
  const CITY_EN = {
    'Moscow': 'Москва', 'Saint Petersburg': 'Санкт-Петербург', 'St Petersburg': 'Санкт-Петербург',
    'Novosibirsk': 'Новосибирск', 'Yekaterinburg': 'Екатеринбург', 'Kazan': 'Казань',
    'Nizhniy Novgorod': 'Нижний Новгород', 'Nizhny Novgorod': 'Нижний Новгород', 'Chelyabinsk': 'Челябинск',
    'Samara': 'Самара', 'Rostov-on-Don': 'Ростов-на-Дону', 'Ufa': 'Уфа', 'Krasnodar': 'Краснодар',
    'Perm': 'Пермь', 'Voronezh': 'Воронеж', 'Krasnoyarsk': 'Красноярск', 'Omsk': 'Омск',
    'Volgograd': 'Волгоград', 'Tyumen': 'Тюмень', 'Saratov': 'Саратов', 'Tolyatti': 'Тольятти',
    'Izhevsk': 'Ижевск', 'Barnaul': 'Барнаул',
  };

  // Исполнители (вымышленные). k — коэффициент цены, days — базовый срок производства
  const PRINTERS = [
    { id: 'printlab', name: 'ПринтЛаб',          color: '#007AFF', rating: 4.9, reviews: 312, k: 1.00, days: 1, dist: 2.4, tags: ['Проверено', 'ЭДО'] },
    { id: 'offset',   name: 'Офсет-Центр',       color: '#1C1C1E', rating: 4.8, reviews: 1204, k: 0.86, days: 3, dist: 7.1, tags: ['Офсет', 'Большие тиражи'] },
    { id: 'cifra24',  name: 'Цифра 24',          color: '#34C759', rating: 4.7, reviews: 588, k: 1.18, days: 0, dist: 1.2, tags: ['Круглосуточно', 'Срочно'] },
    { id: 'format',   name: 'Типография «Формат»', color: '#FF9500', rating: 4.9, reviews: 97, k: 0.94, days: 2, dist: 4.8, tags: ['Эко-бумага'] },
    { id: 'dvor',     name: 'Печатный двор',     color: '#5856D6', rating: 4.6, reviews: 241, k: 0.9, days: 2, dist: 11.3, tags: ['ЭДО'] },
  ];
  const DESIGNERS = [
    { id: 'studio',  name: 'Студия «Окно»',      color: '#007AFF', rating: 5.0, reviews: 86,  k: 1.25, days: 2, dist: 0, tags: ['Брендинг', 'Проверено'] },
    { id: 'anna',    name: 'Анна Соколова',      color: '#FF2D55', rating: 4.9, reviews: 143, k: 1.0,  days: 1, dist: 0, tags: ['Полиграфия'] },
    { id: 'quick',   name: 'Дизайн за сутки',    color: '#34C759', rating: 4.7, reviews: 402, k: 0.85, days: 1, dist: 0, tags: ['Быстро'] },
    { id: 'pro',     name: 'Иван Мельников',     color: '#1C1C1E', rating: 4.8, reviews: 59,  k: 1.1,  days: 3, dist: 0, tags: ['Упаковка', 'Наружка'] },
  ];

  /* Конфигурация калькулятора.
     k — множитель стоимости печати, mk — множитель материалов, fu — доплата отделки за штуку, fa — фиксированная доплата */
  const PRODUCTS = {
    cards: {
      name: 'Визитки', icon: 'card', unit: 0.55, setup: 150, ref: 1000, days: 0,
      qty: { min: 50, max: 10000, step: 50, def: 1000, presets: [100, 200, 500, 1000, 2000, 5000] },
      fields: [
        { id: 'format', label: 'Формат', opts: [{ l: '90×50', s: 'стандарт' }, { l: '85×55', s: 'евро' }, { l: '90×55', k: 1.05 }] },
        { id: 'paper', label: 'Бумага', opts: [{ l: 'Мелованная 300 г' }, { l: 'Картон 350 г', mk: 1.3 }, { l: 'Дизайнерская 300 г', mk: 2.2 }] },
        { id: 'color', label: 'Печать', opts: [{ l: '4+0', s: 'одна сторона' }, { l: '4+4', s: 'две стороны', k: 1.35 }] },
        { id: 'finish', label: 'Отделка', opts: [{ l: 'Без' }, { l: 'Ламинация глянец', fu: 0.35 }, { l: 'Ламинация мат', fu: 0.35 }, { l: 'Soft-touch', fu: 0.9 }] },
        { id: 'corners', label: 'Углы', opts: [{ l: 'Прямые' }, { l: 'Скруглённые', fu: 0.15, fa: 150 }] },
      ],
    },
    flyers: {
      name: 'Листовки и флаеры', icon: 'flyer', unit: 1.6, setup: 300, ref: 1000, days: 1,
      qty: { min: 100, max: 50000, step: 100, def: 1000, presets: [500, 1000, 2000, 5000, 10000] },
      fields: [
        { id: 'format', label: 'Формат', opts: [{ l: 'А6', s: '105×148', k: 0.6 }, { l: 'А5', s: '148×210' }, { l: 'А4', s: '210×297', k: 1.85 }, { l: 'Евро', s: '99×210', k: 0.85 }] },
        { id: 'paper', label: 'Бумага', opts: [{ l: 'Мелованная 130 г' }, { l: 'Мелованная 170 г', mk: 1.25 }, { l: 'Офсетная 80 г', mk: 0.7 }] },
        { id: 'color', label: 'Печать', opts: [{ l: '4+0', s: 'одна сторона' }, { l: '4+4', s: 'две стороны', k: 1.3 }] },
      ],
    },
    booklets: {
      name: 'Буклеты', icon: 'booklet', unit: 3.4, setup: 500, ref: 1000, days: 2,
      qty: { min: 100, max: 20000, step: 100, def: 1000, presets: [300, 500, 1000, 3000, 5000] },
      fields: [
        { id: 'format', label: 'Формат', opts: [{ l: 'А4 → евро', s: '2 фальца' }, { l: 'А4 → А5', s: '1 фальц', k: 0.95 }, { l: 'А3 → А4', s: '1 фальц', k: 1.8 }] },
        { id: 'paper', label: 'Бумага', opts: [{ l: 'Мелованная 150 г' }, { l: 'Мелованная 200 г', mk: 1.25 }] },
        { id: 'finish', label: 'Отделка', opts: [{ l: 'Без' }, { l: 'УФ-лак', fu: 0.8 }] },
      ],
    },
    catalogs: {
      name: 'Каталоги и брошюры', icon: 'catalog', unit: 38, setup: 1500, ref: 100, days: 3,
      qty: { min: 10, max: 5000, step: 10, def: 100, presets: [20, 50, 100, 300, 500, 1000] },
      fields: [
        { id: 'format', label: 'Формат', opts: [{ l: 'А5' }, { l: 'А4', k: 1.8 }, { l: '200×200', k: 1.5 }] },
        { id: 'pages', label: 'Страниц', opts: [{ l: '8', k: 0.5 }, { l: '16' }, { l: '24', k: 1.45 }, { l: '32', k: 1.9 }, { l: '48', k: 2.8 }] },
        { id: 'binding', label: 'Переплёт', opts: [{ l: 'Скоба' }, { l: 'Пружина', fu: 35 }, { l: 'Термоклей', fu: 45 }] },
        { id: 'cover', label: 'Обложка', opts: [{ l: 'Как блок' }, { l: 'Плотная 300 г', fu: 12 }, { l: 'Soft-touch', fu: 28 }] },
      ],
    },
    posters: {
      name: 'Плакаты и постеры', icon: 'poster', unit: 120, setup: 0, ref: 10, days: 0,
      qty: { min: 1, max: 500, step: 1, def: 10, presets: [1, 5, 10, 50, 100] },
      fields: [
        { id: 'format', label: 'Формат', opts: [{ l: 'А3' }, { l: 'А2', k: 1.9 }, { l: 'А1', k: 3.4 }, { l: 'А0', k: 6.2 }] },
        { id: 'paper', label: 'Материал', opts: [{ l: 'Бумага 150 г' }, { l: 'Фотобумага', mk: 1.6 }, { l: 'Холст', mk: 4 }] },
      ],
    },
    banners: {
      name: 'Баннеры и широкоформат', icon: 'banner', area: true, unit: 390, setup: 0, ref: 1, days: 1,
      qty: { min: 1, max: 50, step: 1, def: 1, presets: [1, 2, 3, 5, 10] },
      size: { w: 3, h: 1 },
      fields: [
        { id: 'material', label: 'Материал', opts: [{ l: 'Баннер 440 г', s: 'ламинированный' }, { l: 'Литой 510 г', s: 'долговечный', mk: 1.35 }, { l: 'Сетка', s: 'ветропроницаемая', mk: 1.25 }] },
        { id: 'quality', label: 'Разрешение', opts: [{ l: '360 dpi', s: 'для улицы' }, { l: '720 dpi', s: 'для помещения', k: 1.3 }] },
        { id: 'finish', label: 'Обработка', opts: [{ l: 'Проклейка + люверсы', s: 'шаг 30 см', fu: 120 }, { l: 'Без обработки' }, { l: 'Карманы', fu: 220 }] },
      ],
    },
    stickers: {
      name: 'Наклейки и этикетки', icon: 'sticker', unit: 1.9, setup: 400, ref: 500, days: 1,
      qty: { min: 50, max: 20000, step: 50, def: 500, presets: [100, 500, 1000, 3000, 5000] },
      fields: [
        { id: 'format', label: 'Размер', opts: [{ l: '50×50' }, { l: '70×70', k: 1.6 }, { l: '100×100', k: 2.6 }] },
        { id: 'paper', label: 'Материал', opts: [{ l: 'Бумага' }, { l: 'Винил белый', mk: 1.7 }, { l: 'Прозрачная', mk: 2 }] },
        { id: 'cut', label: 'Резка', opts: [{ l: 'Прямоугольная' }, { l: 'По контуру', fu: 0.6, fa: 500 }] },
      ],
    },
    blanks: {
      name: 'Бланки и конверты', icon: 'envelope', unit: 1.4, setup: 250, ref: 500, days: 1,
      qty: { min: 100, max: 20000, step: 100, def: 500, presets: [100, 500, 1000, 3000] },
      fields: [
        { id: 'type', label: 'Изделие', opts: [{ l: 'Бланк А4' }, { l: 'Конверт Е65', k: 1.6 }, { l: 'Конверт С4', k: 2.3 }] },
        { id: 'color', label: 'Печать', opts: [{ l: '4+0' }, { l: '1+0', s: 'одна краска', k: 0.6 }] },
      ],
    },
    calendars: {
      name: 'Календари', icon: 'calendar', unit: 160, setup: 900, ref: 100, days: 3,
      qty: { min: 10, max: 3000, step: 10, def: 100, presets: [30, 50, 100, 300, 500] },
      fields: [
        { id: 'type', label: 'Тип', opts: [{ l: 'Квартальный' }, { l: 'Настольный домик', k: 0.6 }, { l: 'Перекидной А3', k: 1.4 }, { l: 'Карманный', k: 0.08 }] },
      ],
    },
    design: {
      name: 'Дизайн макета', icon: 'design', isDesign: true, days: 1,
      fields: [
        { id: 'what', label: 'Что нужно', opts: [{ l: 'Визитка', p: 990 }, { l: 'Листовка', p: 1900 }, { l: 'Буклет', p: 3900 }, { l: 'Баннер', p: 2500 }, { l: 'Логотип', p: 6900, d: 2 }, { l: 'Фирменный стиль', p: 19900, d: 5 }] },
        { id: 'rev', label: 'Правки', opts: [{ l: '2 круга', s: 'включено' }, { l: 'Без ограничений', k: 1.4 }] },
        { id: 'variants', label: 'Варианты', opts: [{ l: '1 концепция' }, { l: '3 концепции', k: 1.8 }] },
      ],
    },
  };
  // Виды работ без собственного калькулятора → индивидуальная заявка
  const CUSTOM = { packaging: 1, merch: 1, docs: 1, outdoor: 1 };

  const SPEED = [
    { l: 'Обычно', s: 'по графику типографии', k: 1, dd: 0 },
    { l: 'Быстрее', s: '−1 день · +25%', k: 1.25, dd: -1 },
    { l: 'К вечеру', s: 'если успеваем · +60%', k: 1.6, dd: -9 },
  ];
  const DELIVERY = [
    { l: 'Курьер Полиграфики', s: 'в день готовности', p: 390 },
    { l: 'Пункт выдачи', s: 'на следующий день', p: 190, dd: 1 },
    { l: 'Самовывоз', s: 'из типографии', p: 0 },
  ];

  /* Расчёт базовой стоимости (до коэффициента конкретного исполнителя) */
  function baseCost(pid, st) {
    const P = PRODUCTS[pid];
    const pick = (f) => f.opts[st.opts[f.id] || 0];
    let k = 1, mk = 1, fu = 0, fa = 0, extraDays = 0;
    P.fields.forEach((f) => {
      const o = pick(f);
      k *= o.k || 1; mk *= o.mk || 1; fu += o.fu || 0; fa += o.fa || 0; extraDays += o.d || 0;
    });
    if (P.isDesign) {
      const base = pick(P.fields[0]).p * k;
      return { print: base, material: 0, finishing: 0, extraDays: extraDays };
    }
    const qty = Math.max(1, st.qty || P.qty.def);
    let units = qty, perUnit;
    if (P.area) {
      const area = Math.max(0.1, (st.w || P.size.w) * (st.h || P.size.h));
      units = area * qty;
      perUnit = P.unit * Math.pow(Math.max(units, 1), -0.08);
      fu *= Math.max(1, Math.round(((st.w || P.size.w) + (st.h || P.size.h)) * 2 * qty / 3)) / units; // обработка по периметру
    } else {
      perUnit = P.unit * Math.pow(qty / P.ref, -0.2);
    }
    const core = P.setup + perUnit * units * k;
    return {
      print: core * 0.62,
      material: core * 0.38 * mk,
      finishing: fu * units * Math.pow(units / (P.ref || 1), -0.08) + fa,
      extraDays: extraDays,
    };
  }

  function round10(x) { return Math.max(10, Math.round(x / 10) * 10); }

  /* Предложения всех исполнителей под текущие параметры */
  function offers(pid, st) {
    const P = PRODUCTS[pid];
    const b = baseCost(pid, st);
    const sp = SPEED[st.speed || 0];
    const dl = P.isDesign ? { p: 0, dd: 0 } : DELIVERY[st.delivery || 0];
    const list = (P.isDesign ? DESIGNERS : PRINTERS).map((pr) => {
      const m = pr.k * sp.k;
      const print = round10(b.print * m), material = round10(b.material * m);
      const finishing = b.finishing ? round10(b.finishing * m) : 0;
      const designAdd = st.needDesign && !P.isDesign ? 990 : 0;
      let days = Math.max(0, pr.days + (P.days || 0) + b.extraDays + sp.dd);
      if (sp.dd < -1 && pr.days + (P.days || 0) > 1) days = Math.max(1, pr.days + (P.days || 0) - 1);
      const total = print + material + finishing + dl.p + designAdd;
      return {
        printer: pr, print, material, finishing, delivery: dl.p, design: designAdd, urgent: sp.k > 1,
        total, days: days + (dl.dd || 0) + (designAdd ? 1 : 0),
      };
    });
    // Метки «лучшее по цене / сроку / оптимально»
    const minP = Math.min.apply(null, list.map((o) => o.total));
    const minD = Math.min.apply(null, list.map((o) => o.days));
    const maxP = Math.max.apply(null, list.map((o) => o.total));
    list.forEach((o) => {
      const pn = maxP === minP ? 0 : (o.total - minP) / (maxP - minP);
      o.score = pn * 0.5 + (o.days - minD) * 0.15 + (5 - o.printer.rating) * 0.8;
      o.cheapest = o.total === minP;
      o.fastest = o.days === minD;
    });
    const best = list.slice().sort((a, b2) => a.score - b2.score)[0];
    best.best = true;
    return list;
  }

  const MONTHS = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  const WD = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
  function readyText(days) {
    if (days <= 0) return 'Сегодня';
    if (days === 1) return 'Завтра';
    const d = new Date(); d.setDate(d.getDate() + days);
    return WD[d.getDay()] + ', ' + d.getDate() + ' ' + MONTHS[d.getMonth()];
  }
  function rub(x) { return Math.round(x).toLocaleString('ru-RU').replace(/,/g, ' ') + ' ₽'; }
  function initials(name) {
    return name.replace(/[«»"]/g, '').replace(/^Типография\s+/, '').split(/[\s-]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  }
  function plural(n, a, b, c) {
    const m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return a;
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return b;
    return c;
  }

  window.PG = {
    ICONS, icon, CATEGORIES, CITIES, CITY_EN, PRINTERS, DESIGNERS, PRODUCTS, CUSTOM, SPEED, DELIVERY,
    baseCost, offers, readyText, rub, initials, plural,
  };
})();
