/* Полиграфика — общие компоненты: шапка, футер, город, вход, поиск, тосты */
(function () {
  'use strict';
  const { icon, CATEGORIES, CITIES, CITY_EN, plural } = window.PG;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const page = document.body.dataset.page || '';

  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* приватный режим */ } },
  };

  /* ---------- Логотип ---------- */
  const SLOGAN = 'Все типографии — в одном окне';
  const logo = () => `
    <a class="logo" href="index.html" aria-label="Полиграфика — на главную">
      <img class="logo__mark" src="assets/img/logo-mark.svg" alt="">
      <span class="logo__text">
        <span class="logo__name">Полиграфика</span>
        <span class="logo__slogan">${SLOGAN}</span>
      </span>
    </a>`;

  /* ---------- Шапка ---------- */
  const nav = [
    ['index.html#cats', 'Каталог', 'home-cats'],
    ['calculator.html', 'Калькулятор', 'calc'],
    ['calculator.html?type=design', 'Дизайн', 'design'],
  ];
  const header = `
    <div class="topbar">
      <div class="container">
        <span>Доставка в день готовности · <a href="index.html#faq">Как это работает</a></span>
        <nav>
          <a href="#">Для бизнеса</a><a href="#">Доставка и оплата</a><a href="index.html#faq">Помощь</a>
          <a href="tel:88005553535"><b>8 800 555-35-35</b></a>
        </nav>
      </div>
    </div>
    <header class="header" id="header">
      <div class="container">
        ${logo()}
        <div class="city-wrap">
          <button class="city" type="button" data-open="city" aria-label="Выбрать город">
            ${icon('pin')}<span class="city__name" data-city-name>Определяем…</span>
          </button>
          <div class="city-confirm" id="cityConfirm" role="dialog" aria-label="Подтверждение города">
            <p>Ваш город — <span data-city-name></span>?</p>
            <small data-city-note>Покажем типографии и сроки доставки рядом с вами</small>
            <div class="row">
              <button class="btn btn--primary" type="button" data-city-yes>Да, верно</button>
              <button class="btn btn--soft" type="button" data-open="city">Выбрать другой</button>
            </div>
          </div>
        </div>
        <nav class="header__nav" aria-label="Основная навигация">
          ${nav.map(([h, t, id]) => `<a href="${h}"${id === page ? ' class="is-active"' : ''}>${t}</a>`).join('')}
        </nav>
        <div class="header__actions">
          <button class="icon-btn" type="button" data-search-jump aria-label="Поиск">${icon('search')}</button>
          <a class="icon-btn" href="#" aria-label="Корзина">${icon('cart')}<span class="badge">0</span></a>
          <a class="btn btn--soft" href="partner.html">${icon('handshake')}Стать партнёром</a>
          <button class="btn btn--ghost btn-login" type="button" data-open="login">${icon('user')}<span class="btn-login-text">Войти</span></button>
          <button class="icon-btn burger" type="button" data-open="drawer" aria-label="Меню">${icon('menu')}</button>
        </div>
      </div>
    </header>`;

  const footer = `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__about">
            ${logo()}
            <p>Маркетплейс полиграфии: сравниваем типографии по цене, сроку и рейтингу. Вы выбираете — мы доставляем.</p>
            <a href="tel:88005553535"><b>8 800 555-35-35</b></a><br>
            <span class="caption">Бесплатно по России, ежедневно 8:00–22:00</span>
          </div>
          <div>
            <h4>Заказчикам</h4>
            <ul>
              <li><a href="index.html#cats">Каталог услуг</a></li>
              <li><a href="calculator.html">Калькулятор</a></li>
              <li><a href="calculator.html?type=design">Заказать дизайн</a></li>
              <li><a href="#">Доставка и оплата</a></li>
              <li><a href="#">Для бизнеса и ЭДО</a></li>
            </ul>
          </div>
          <div>
            <h4>Партнёрам</h4>
            <ul>
              <li><a href="partner.html">Подключить типографию</a></li>
              <li><a href="partner.html#types">Стать дизайнером</a></li>
              <li><a href="partner.html#types">Курьерам</a></li>
              <li><a href="#">Кабинет партнёра</a></li>
            </ul>
          </div>
          <div>
            <h4>Компания</h4>
            <ul>
              <li><a href="index.html#why">О платформе</a></li>
              <li><a href="index.html#faq">Вопросы и ответы</a></li>
              <li><a href="#">Гарантии и возврат</a></li>
              <li><a href="#">Контакты</a></li>
            </ul>
          </div>
        </div>
        <div class="footer__bottom">
          <span>© 2026 Полиграфика. Макет интерфейса — данные демонстрационные.</span>
          <span><a href="#">Политика конфиденциальности</a> · <a href="#">Оферта</a></span>
        </div>
      </div>
    </footer>`;

  const modals = `
    <div class="modal" id="modal-city" role="dialog" aria-modal="true" aria-labelledby="cityTitle">
      <div class="modal__card modal__card--wide">
        <button class="icon-btn modal__close" type="button" data-close aria-label="Закрыть">${icon('x')}</button>
        <h2 id="cityTitle">Выберите город</h2>
        <p class="sub">Работаем в 15 городах и подключаем новые каждый месяц. Ваш город не в списке — оставьте заявку, сообщим о запуске.</p>
        <div class="search__box" style="height:48px">${icon('search')}<input id="cityFilter" type="text" placeholder="Найти город" autocomplete="off"></div>
        <div style="margin-top:12px"><button class="btn btn--soft" type="button" data-geo>${icon('locate')}Определить по геопозиции</button></div>
        <div class="city-list" id="cityList"></div>
      </div>
    </div>

    <div class="modal" id="modal-login" role="dialog" aria-modal="true" aria-labelledby="loginTitle">
      <div class="modal__card">
        <button class="icon-btn modal__close" type="button" data-close aria-label="Закрыть">${icon('x')}</button>
        <h2 id="loginTitle">Вход</h2>
        <p class="sub">Заказы, макеты и документы — в одном кабинете.</p>
        <div class="tabs tabs--block" role="tablist">
          <button type="button" class="is-active" data-role="client">Я заказчик</button>
          <button type="button" data-role="partner">Я исполнитель</button>
        </div>
        <form id="loginForm" novalidate>
          <div data-step="1">
            <label class="field"><span>Телефон</span><input class="input" id="loginPhone" type="tel" inputmode="tel" placeholder="+7 (900) 000-00-00" autocomplete="tel"></label>
            <button class="btn btn--primary btn--block btn--lg" type="submit">Получить код</button>
            <div class="or">или</div>
            <button class="btn btn--soft btn--block" type="button" data-fake-login>Войти по почте</button>
          </div>
          <div data-step="2" hidden>
            <label class="field"><span>Код из СМС — отправили на <b data-phone></b></span><input class="input" id="loginCode" type="text" inputmode="numeric" maxlength="4" placeholder="• • • •" style="letter-spacing:.5em;text-align:center;font-size:20px"></label>
            <button class="btn btn--primary btn--block btn--lg" type="submit">Войти</button>
            <button class="btn btn--ghost btn--block" type="button" data-back style="margin-top:8px">Изменить номер</button>
          </div>
        </form>
        <p class="fine">Нажимая «Получить код», вы соглашаетесь с условиями оферты и политикой конфиденциальности.</p>
      </div>
    </div>

    <div class="drawer" id="drawer">
      <div class="drawer__bg" data-close></div>
      <div class="drawer__panel">
        <button class="icon-btn" type="button" data-close aria-label="Закрыть" style="align-self:flex-end">${icon('x')}</button>
        ${nav.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}
        <a href="partner.html">Стать партнёром</a>
        <button class="btn btn--primary btn--block" type="button" data-open="login">Войти</button>
      </div>
    </div>
    <div class="toast" id="toast" role="status" aria-live="polite"></div>`;

  const hHost = $('[data-include="header"]');
  if (hHost) hHost.outerHTML = header;
  const fHost = $('[data-include="footer"]');
  if (fHost) fHost.outerHTML = footer;
  document.body.insertAdjacentHTML('beforeend', modals);

  /* Иконки: <i data-icon="name"></i> → svg */
  function hydrateIcons(root) {
    $$('[data-icon]', root).forEach((el) => {
      const tmp = document.createElement('div');
      tmp.innerHTML = icon(el.dataset.icon);
      const svg = tmp.firstChild;
      if (el.className) svg.setAttribute('class', el.className);
      el.replaceWith(svg);
    });
  }
  hydrateIcons();

  /* ---------- Тост ---------- */
  let toastT;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('is-shown');
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove('is-shown'), 2600);
  }

  /* ---------- Модалки ---------- */
  let lastFocus = null;
  function open(id) {
    if (id === 'drawer') { $('#drawer').classList.add('is-open'); return; }
    $$('.modal.is-open').forEach((m) => m.classList.remove('is-open'));
    $('#drawer').classList.remove('is-open');
    $('#cityConfirm').classList.remove('is-open');
    const m = $('#modal-' + id);
    if (!m) return;
    if (id === 'city') { $('#cityFilter').value = ''; renderCityList(''); }
    lastFocus = document.activeElement;
    m.classList.add('is-open');
    const f = m.querySelector('input, button:not(.modal__close)');
    if (f) setTimeout(() => f.focus(), 30);
  }
  function closeAll() {
    $$('.modal.is-open').forEach((m) => m.classList.remove('is-open'));
    $('#drawer').classList.remove('is-open');
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener('click', (e) => {
    const o = e.target.closest('[data-open]');
    if (o) { e.preventDefault(); open(o.dataset.open); return; }
    if (e.target.closest('[data-close]') || e.target.classList.contains('modal')) closeAll();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });

  /* ---------- Шапка: тень при скролле ---------- */
  const hdr = $('#header');
  const onScroll = () => hdr.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  $('[data-search-jump]').addEventListener('click', () => {
    const s = $('#search');
    if (s) { s.scrollIntoView({ behavior: 'smooth', block: 'center' }); setTimeout(() => s.focus(), 300); }
    else location.href = 'index.html#search';
  });

  /* ---------- Город ---------- */
  const CITY_KEY = 'pg_city';
  let city = null;

  function cityInfo(name) {
    const c = CITIES.find((x) => x.name === name);
    return { name, n: c ? c.n : 0, known: !!c };
  }
  function applyCity(name, confirmed) {
    city = cityInfo(name);
    $$('[data-city-name]').forEach((el) => { el.textContent = name; });
    $$('[data-city-count]').forEach((el) => {
      el.textContent = city.n ? city.n + ' ' + plural(city.n, 'типография', 'типографии', 'типографий') : 'скоро запуск';
    });
    const note = $('[data-city-note]');
    if (note) note.textContent = city.n
      ? 'Покажем ' + city.n + ' ' + plural(city.n, 'типографию', 'типографии', 'типографий') + ' и сроки доставки рядом с вами'
      : 'Мы ещё не запустились здесь — покажем ближайшие типографии с доставкой';
    if (confirmed) store.set(CITY_KEY, name);
    document.dispatchEvent(new CustomEvent('pg:city', { detail: city }));
  }

  function fetchJSON(url, ms) {
    const ctl = 'AbortController' in window ? new AbortController() : null;
    const t = setTimeout(() => ctl && ctl.abort(), ms || 3500);
    return fetch(url, ctl ? { signal: ctl.signal } : {}).then((r) => { clearTimeout(t); if (!r.ok) throw new Error(r.status); return r.json(); });
  }
  // Определение города по IP: два бесплатных сервиса, затем — Москва по умолчанию
  async function detectCity() {
    try {
      const r = await fetchJSON('https://ipwho.is/?lang=ru&fields=success,city,country_code');
      if (r.success && r.city) return r.city;
    } catch (e) { /* следующий сервис */ }
    try {
      const r = await fetchJSON('https://get.geojs.io/v1/ip/geo.json');
      if (r.city) return CITY_EN[r.city] || r.city;
    } catch (e) { /* по умолчанию */ }
    return null;
  }
  // Точное определение по геопозиции браузера (по кнопке), название — через OpenStreetMap
  function geoCity() {
    if (!navigator.geolocation) return toast('Браузер не поддерживает геолокацию');
    toast('Определяем местоположение…');
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const { latitude: la, longitude: lo } = pos.coords;
        const r = await fetchJSON('https://nominatim.openstreetmap.org/reverse?format=json&zoom=10&accept-language=ru&lat=' + la + '&lon=' + lo, 6000);
        const a = r.address || {};
        const name = a.city || a.town || a.village || a.state;
        if (!name) throw new Error('no city');
        applyCity(name, true); closeAll(); toast('Ваш город: ' + name);
      } catch (e) { toast('Не удалось определить город — выберите из списка'); }
    }, () => toast('Доступ к геопозиции запрещён — выберите город из списка'), { timeout: 8000 });
  }

  function renderCityList(q) {
    q = (q || '').trim().toLowerCase();
    const list = CITIES.filter((c) => !q || c.name.toLowerCase().includes(q));
    $('#cityList').innerHTML = list.length ? list.map((c) => `
      <button type="button" data-pick-city="${c.name}" class="${city && city.name === c.name ? 'is-current' : ''} ${c.n ? '' : 'soon'}">
        ${c.name}${c.n ? '' : '<small>скоро</small>'}
      </button>`).join('') : `<p class="caption" style="grid-column:1/-1;padding:8px 12px">Пока не работаем в «${q}». <a href="#" data-pick-city="${q.replace(/^./, (s) => s.toUpperCase())}">Оставить заявку на запуск</a></p>`;
  }
  $('#cityFilter').addEventListener('input', (e) => renderCityList(e.target.value));
  $('#cityList').addEventListener('click', (e) => {
    const b = e.target.closest('[data-pick-city]');
    if (!b) return;
    e.preventDefault();
    applyCity(b.dataset.pickCity, true);
    closeAll();
    toast('Город: ' + b.dataset.pickCity);
  });
  $('[data-geo]').addEventListener('click', geoCity);
  $('[data-city-yes]').addEventListener('click', () => {
    store.set(CITY_KEY, city.name);
    $('#cityConfirm').classList.remove('is-open');
  });

  (async function initCity() {
    const saved = store.get(CITY_KEY);
    if (saved) return applyCity(saved, false);
    applyCity('Москва', false);
    const found = await detectCity();
    applyCity(found || 'Москва', false);
    $('#cityConfirm').classList.add('is-open');
  })();

  /* ---------- Вход ---------- */
  const lf = $('#loginForm');
  const phone = $('#loginPhone');
  phone.addEventListener('input', () => {
    let d = phone.value.replace(/\D/g, '');
    if (d[0] === '8') d = '7' + d.slice(1);
    if (d && d[0] !== '7') d = '7' + d;
    d = d.slice(0, 11);
    const p = [d.slice(1, 4), d.slice(4, 7), d.slice(7, 9), d.slice(9, 11)];
    phone.value = d ? '+7' + (p[0] ? ' (' + p[0] : '') + (p[1] ? ') ' + p[1] : '') + (p[2] ? '-' + p[2] : '') + (p[3] ? '-' + p[3] : '') : '';
  });
  lf.addEventListener('submit', (e) => {
    e.preventDefault();
    const s1 = $('[data-step="1"]', lf), s2 = $('[data-step="2"]', lf);
    if (!s1.hidden) {
      if (phone.value.replace(/\D/g, '').length < 11) { phone.focus(); return toast('Введите номер полностью'); }
      $('[data-phone]', lf).textContent = phone.value;
      s1.hidden = true; s2.hidden = false; $('#loginCode').focus();
      toast('Демо: подойдёт любой код из 4 цифр');
    } else {
      if ($('#loginCode').value.length < 4) return toast('Введите 4 цифры');
      closeAll(); s1.hidden = false; s2.hidden = true;
      $$('.btn-login-text').forEach((el) => { el.textContent = 'Кабинет'; });
      toast('Вы вошли — добро пожаловать!');
    }
  });
  $('[data-back]', lf).addEventListener('click', () => { $('[data-step="1"]', lf).hidden = false; $('[data-step="2"]', lf).hidden = true; });
  $('[data-fake-login]').addEventListener('click', () => toast('Вход по почте — в следующей версии макета'));
  $$('#modal-login [data-role]').forEach((b) => b.addEventListener('click', () => {
    $$('#modal-login [data-role]').forEach((x) => x.classList.toggle('is-active', x === b));
    $('#modal-login .sub').textContent = b.dataset.role === 'partner'
      ? 'Заявки, загрузка мощностей и выплаты — в кабинете партнёра.'
      : 'Заказы, макеты и документы — в одном кабинете.';
  }));

  /* ---------- Поиск по видам работ ---------- */
  function catHref(c) { return 'calculator.html?type=' + c.id; }
  function searchCats(q) {
    const words = q.toLowerCase().replace(/ё/g, 'е').split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return CATEGORIES.filter((c) => {
      const hay = (c.name + ' ' + c.keys).toLowerCase().replace(/ё/g, 'е');
      return words.every((w) => hay.includes(w.slice(0, Math.max(3, w.length - 2))));
    });
  }
  function initSearch(input) {
    const box = input.closest('.search');
    const sug = box.querySelector('.search__suggest');
    let idx = -1;
    function render() {
      const q = input.value.trim();
      if (!q) { sug.classList.remove('is-open'); return; }
      const res = searchCats(q).slice(0, 6);
      idx = res.length ? 0 : -1;
      sug.innerHTML = res.length
        ? res.map((c, i) => `<a href="${catHref(c)}" class="${i === 0 ? 'is-active' : ''}">${icon(c.icon)}<span>${c.name}</span><em>от ${PG.rub(c.from)}</em></a>`).join('')
        : `<div class="empty">Ничего не нашли по «${q.replace(/</g, '&lt;')}». <a href="calculator.html?type=design" style="display:inline;padding:0">Опишите задачу менеджеру</a> — подберём исполнителя.</div>`;
      sug.classList.add('is-open');
    }
    input.addEventListener('input', render);
    input.addEventListener('focus', render);
    input.addEventListener('keydown', (e) => {
      const items = $$('a', sug);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        if (!items.length) return;
        e.preventDefault();
        idx = (idx + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
        items.forEach((a, i) => a.classList.toggle('is-active', i === idx));
      }
    });
    box.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      const items = $$('.search__suggest a', box);
      const a = items[idx] || items[0];
      if (a) location.href = a.getAttribute('href');
      else if (input.value.trim()) render();
      else input.focus();
    });
    document.addEventListener('click', (e) => { if (!box.contains(e.target)) sug.classList.remove('is-open'); });
  }
  $$('[data-search]').forEach(initSearch);

  window.PG.ui = { $, $$, toast, open, closeAll, hydrateIcons, store, getCity: () => city };
})();
