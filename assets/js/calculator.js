/* Калькулятор: параметры → предложения исполнителей → честный итог */
(function () {
  'use strict';
  const { icon, CATEGORIES, PRODUCTS, CUSTOM, SPEED, DELIVERY, offers, rub, readyText, initials, plural } = window.PG;
  const { $, $$, toast, open, store } = window.PG.ui;

  const url = new URLSearchParams(location.search);
  let pid = url.get('type') || 'cards';
  if (!PRODUCTS[pid] && !CUSTOM[pid]) pid = 'cards';
  let sort = 'score';
  let st = initState(pid, url);

  function initState(id, q) {
    const P = PRODUCTS[id];
    const s = { qty: 0, opts: {}, speed: 0, delivery: 0, needDesign: false, printer: null };
    if (!P) return s;
    s.qty = P.qty ? clampQty(P, +(q && q.get('qty')) || P.qty.def) : 1;
    if (P.size) { s.w = +(q && q.get('w')) || P.size.w; s.h = +(q && q.get('h')) || P.size.h; }
    P.fields.forEach((f) => {
      const v = q ? +q.get(f.id) : 0;
      s.opts[f.id] = v >= 0 && v < f.opts.length ? v : 0;
    });
    if (q) {
      s.speed = Math.min(+q.get('speed') || 0, SPEED.length - 1);
      s.delivery = Math.min(+q.get('delivery') || 0, DELIVERY.length - 1);
      s.printer = q.get('printer');
    }
    return s;
  }
  function clampQty(P, n) { return Math.min(P.qty.max, Math.max(P.qty.min, Math.round(n))); }

  /* ---------- Вкладки продуктов ---------- */
  function renderTabs() {
    const ids = Object.keys(PRODUCTS);
    ids.unshift(ids.splice(ids.indexOf('design'), 1)[0]); // дизайн — первым, как на главной
    const extra = CATEGORIES.filter((c) => CUSTOM[c.id]);
    $('#productTabs').innerHTML = ids.map((id) => {
      const c = CATEGORIES.find((x) => x.id === id);
      return `<button type="button" role="tab" class="product-tab${id === pid ? ' is-active' : ''}" data-pid="${id}" aria-selected="${id === pid}">${icon(PRODUCTS[id].icon)}${c ? c.name : PRODUCTS[id].name}</button>`;
    }).join('') + extra.map((c) => `<button type="button" role="tab" class="product-tab${c.id === pid ? ' is-active' : ''}" data-pid="${c.id}" aria-selected="${c.id === pid}">${icon(c.icon)}${c.name}</button>`).join('');
    const active = $('.product-tab.is-active');
    if (active) active.scrollIntoView({ block: 'nearest', inline: 'center' });
  }
  $('#productTabs').addEventListener('click', (e) => {
    const b = e.target.closest('[data-pid]');
    if (!b || b.dataset.pid === pid) return;
    pid = b.dataset.pid;
    st = initState(pid, null);
    renderAll();
  });

  /* ---------- Параметры ---------- */
  function segHTML(name, opts, cur) {
    return opts.map((o, i) => `<button type="button" data-${name}="${i}" class="${i === cur ? 'is-active' : ''}" aria-pressed="${i === cur}">${o.l}${o.s ? `<small>${o.s}</small>` : ''}</button>`).join('');
  }
  function renderParams() {
    const P = PRODUCTS[pid];
    let html = P.fields.map((f) => `
      <div class="param param--full">
        <div class="lbl">${f.label}</div>
        <div class="seg" data-field="${f.id}">${segHTML('opt', f.opts, st.opts[f.id])}</div>
      </div>`).join('');
    if (P.size) {
      html += `
      <div class="param"><div class="lbl">Ширина <small>м</small></div><input class="input" type="number" min="0.3" max="20" step="0.1" id="sizeW" value="${st.w}"></div>
      <div class="param"><div class="lbl">Высота <small>м</small></div><input class="input" type="number" min="0.3" max="10" step="0.1" id="sizeH" value="${st.h}"></div>`;
    }
    if (P.qty) {
      html += `
      <div class="param param--full">
        <div class="lbl">Тираж <small>чем больше — тем дешевле штука</small></div>
        <div class="qty">
          <input type="range" id="qtyRange" min="0" max="1000" value="${toSlider(P, st.qty)}" aria-label="Тираж">
          <input class="input tnum" type="number" id="qtyInput" min="${P.qty.min}" max="${P.qty.max}" step="${P.qty.step}" value="${st.qty}" aria-label="Тираж, шт">
        </div>
        <div class="qty-presets">${P.qty.presets.map((n) => `<button type="button" data-qty="${n}" class="${n === st.qty ? 'is-active' : ''}">${n.toLocaleString('ru-RU')}</button>`).join('')}</div>
      </div>`;
    }
    $('#params').innerHTML = html;
    $('#paramsHint').textContent = P.isDesign ? 'цена дизайнеров фиксирована' : 'цены обновляются сразу';
  }
  // Логарифмический слайдер — удобно и для 50, и для 10 000 шт
  function toSlider(P, n) { const a = Math.log(P.qty.min), b = Math.log(P.qty.max); return Math.round((Math.log(n) - a) / (b - a) * 1000); }
  function fromSlider(P, v) {
    const a = Math.log(P.qty.min), b = Math.log(P.qty.max);
    const n = Math.exp(a + (b - a) * v / 1000);
    const step = n < 100 ? Math.min(P.qty.step, 10) : n < 1000 ? Math.max(P.qty.step, 50) : n < 10000 ? 500 : 1000;
    return clampQty(P, Math.round(n / step) * step || P.qty.min);
  }

  $('#params').addEventListener('click', (e) => {
    const o = e.target.closest('[data-opt]');
    if (o) {
      st.opts[o.closest('[data-field]').dataset.field] = +o.dataset.opt;
      renderParams(); update();
      return;
    }
    const q = e.target.closest('[data-qty]');
    if (q) { st.qty = +q.dataset.qty; renderParams(); update(); }
  });
  $('#params').addEventListener('input', (e) => {
    const P = PRODUCTS[pid];
    if (e.target.id === 'qtyRange') {
      st.qty = fromSlider(P, +e.target.value);
      $('#qtyInput').value = st.qty;
      $$('[data-qty]').forEach((b) => b.classList.toggle('is-active', +b.dataset.qty === st.qty));
      update();
    } else if (e.target.id === 'sizeW' || e.target.id === 'sizeH') {
      const v = parseFloat(e.target.value);
      if (v > 0) { st[e.target.id === 'sizeW' ? 'w' : 'h'] = Math.min(v, 20); update(); }
    }
  });
  $('#params').addEventListener('change', (e) => {
    if (e.target.id !== 'qtyInput') return;
    const P = PRODUCTS[pid];
    st.qty = clampQty(P, +e.target.value || P.qty.def);
    renderParams(); update();
  });

  /* ---------- Срок и доставка ---------- */
  function renderSpeed() {
    $('#speedSeg').innerHTML = segHTML('speed', SPEED, st.speed);
    $('#deliverySeg').innerHTML = DELIVERY.map((d, i) => `<button type="button" data-delivery="${i}" class="${i === st.delivery ? 'is-active' : ''}" aria-pressed="${i === st.delivery}">${d.l}<small>${d.s} · ${d.p ? rub(d.p) : 'бесплатно'}</small></button>`).join('');
  }
  $('#speedPanel').addEventListener('click', (e) => {
    const s = e.target.closest('[data-speed]'), d = e.target.closest('[data-delivery]');
    if (s) st.speed = +s.dataset.speed;
    if (d) st.delivery = +d.dataset.delivery;
    if (s || d) { renderSpeed(); update(); }
  });

  /* ---------- Макет ---------- */
  const up = $('#upload'), fileInput = $('#fileInput');
  function setFile(f) {
    if (!f) return;
    up.classList.add('is-done');
    $('#uploadTitle').textContent = f.name;
    $('#uploadSub').textContent = (f.size / 1048576).toFixed(1).replace('.', ',') + ' МБ · отправим на проверку после оформления';
    up.querySelector('.ic').innerHTML = icon('file');
    $('#needDesign').checked = false; st.needDesign = false; update();
  }
  fileInput.addEventListener('change', () => setFile(fileInput.files[0]));
  ['dragenter', 'dragover'].forEach((ev) => up.addEventListener(ev, (e) => { e.preventDefault(); up.classList.add('is-drag'); }));
  ['dragleave', 'drop'].forEach((ev) => up.addEventListener(ev, (e) => { e.preventDefault(); up.classList.remove('is-drag'); }));
  up.addEventListener('drop', (e) => setFile(e.dataTransfer.files[0]));
  $('#needDesign').addEventListener('change', (e) => { st.needDesign = e.target.checked; update(); });

  /* ---------- Предложения ---------- */
  $('#sortTabs').addEventListener('click', (e) => {
    const b = e.target.closest('[data-sort]');
    if (!b) return;
    sort = b.dataset.sort;
    $$('#sortTabs button').forEach((x) => x.classList.toggle('is-active', x === b));
    update();
  });
  $('#offers').addEventListener('click', (e) => {
    const o = e.target.closest('[data-printer]');
    if (!o) return;
    st.printer = o.dataset.printer;
    update();
  });
  $('#offers').addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.dataset.printer) { e.preventDefault(); e.target.click(); }
  });

  function sorted(list) {
    const by = {
      score: (a, b) => a.score - b.score,
      price: (a, b) => a.total - b.total,
      days: (a, b) => a.days - b.days || a.total - b.total,
      rating: (a, b) => b.printer.rating - a.printer.rating || b.printer.reviews - a.printer.reviews,
    }[sort];
    return list.slice().sort(by);
  }
  const fmtR = (r) => r.toFixed(1).replace('.', ',');

  function specText() {
    const P = PRODUCTS[pid];
    const parts = P.fields.map((f) => f.opts[st.opts[f.id]].l);
    if (P.size) parts.unshift(st.w + '×' + st.h + ' м');
    if (P.qty) parts.push(st.qty.toLocaleString('ru-RU') + ' шт');
    return parts.join(' · ');
  }

  function update() {
    const P = PRODUCTS[pid];
    const list = offers(pid, st);
    if (!st.printer || !list.some((o) => o.printer.id === st.printer)) st.printer = list.find((o) => o.best).printer.id;
    const sel = list.find((o) => o.printer.id === st.printer);
    const who = P.isDesign ? 'дизайнер' : 'типография';

    $('#offersCount').textContent = list.length + ' ' + (P.isDesign ? plural(list.length, 'дизайнер', 'дизайнера', 'дизайнеров') : plural(list.length, 'типография', 'типографии', 'типографий')) + ' готовы взяться';
    $('#offers').innerHTML = sorted(list).map((o) => {
      const p = o.printer, isSel = p.id === st.printer;
      const badges = [
        o.best ? '<span class="pill">Оптимально</span>' : '',
        o.cheapest && !o.best ? '<span class="pill pill--green">Дешевле всех</span>' : '',
        o.fastest && !o.best ? '<span class="pill pill--orange">Быстрее всех</span>' : '',
      ].join('');
      return `
      <div class="offer${isSel ? ' is-selected' : ''}" data-printer="${p.id}" role="radio" aria-checked="${isSel}" tabindex="0">
        <span class="radio"></span>
        <div class="info">
          <span class="ava" style="background:${p.color}">${initials(p.name)}</span>
          <div class="nm">
            <b>${p.name} ${badges}</b>
            <div class="meta">
              <span><span class="star">★</span> ${fmtR(p.rating)} · ${p.reviews} ${plural(p.reviews, 'отзыв', 'отзыва', 'отзывов')}</span>
              ${p.dist ? `<span>${icon('pin')}${String(p.dist).replace('.', ',')} км</span>` : `<span>${icon('chat')}онлайн</span>`}
            </div>
            <div class="tags">${p.tags.map((t) => `<span class="pill pill--gray">${t}</span>`).join('')}</div>
          </div>
        </div>
        <div class="when"><b>${readyText(o.days)}</b><small>${P.isDesign ? 'первый вариант' : 'получите заказ'}</small></div>
        <div class="cost"><b class="tnum">${rub(o.total)}</b><small>${P.qty && st.qty > 1 ? (o.total / st.qty).toFixed(2).replace('.', ',') + ' ₽/шт' : (P.isDesign ? 'фикс. цена' : '')}</small></div>
      </div>`;
    }).join('');

    // Итог
    const c = CATEGORIES.find((x) => x.id === pid);
    $('#sumIcon').innerHTML = icon(P.icon);
    $('#sumName').textContent = c ? c.name : P.name;
    $('#sumSpec').textContent = specText();
    $('#sumWho').innerHTML = `<span class="ava" style="background:${sel.printer.color}">${initials(sel.printer.name)}</span><span><small>${who === 'дизайнер' ? 'Исполнитель' : 'Типография'}</small>${sel.printer.name}</span><span class="caption">★ ${fmtR(sel.printer.rating)}</span>`;
    const rows = P.isDesign
      ? [['Работа дизайнера', sel.print + sel.material], ['Исходники и файлы для печати', 0, true], ['Срочность', 0, 0, true]]
      : [['Печать', sel.print], ['Бумага и материалы', sel.material], ['Отделка', sel.finishing, false, true], ['Дизайн макета', sel.design, false, true], ['Доставка', sel.delivery, sel.delivery === 0], ['Проверка макета', 0, true]];
    if (sel.urgent && !P.isDesign) rows.splice(2, 0, ['в т. ч. срочность', Math.round((sel.print + sel.material) * (1 - 1 / SPEED[st.speed].k)), false, false, true]);
    $('#breakdown').innerHTML = rows
      .filter((r) => !(r[3] && !r[1]))
      .map((r) => `<li class="${r[2] ? 'free' : ''}"${r[4] ? ' style="font-size:13px;padding-left:12px"' : ''}><span>${r[0]}</span><span>${r[2] ? 'бесплатно' : rub(r[1])}</span></li>`).join('')
      + '<li class="free"><span>Комиссия сервиса</span><span>0 ₽</span></li>';
    $('#sumTotal').textContent = rub(sel.total);
    $('#sumPer').textContent = P.qty && st.qty > 1 ? (sel.total / st.qty).toFixed(2).replace('.', ',') + ' ₽ за штуку' : '';
    const when = P.isDesign
      ? 'Первый вариант — ' + readyText(sel.days).toLowerCase()
      : (DELIVERY[st.delivery].p ? 'Доставим ' : 'Готово ') + readyText(sel.days).toLowerCase() + (sel.days === 0 ? ' до 21:00' : '');
    $('#sumWhen').textContent = when;
    $('#mbTotal').textContent = rub(sel.total);
    $('#mbWhen').textContent = when;

    // Состояние в URL — расчётом можно поделиться
    const q = new URLSearchParams({ type: pid });
    if (P.qty) q.set('qty', st.qty);
    if (P.size) { q.set('w', st.w); q.set('h', st.h); }
    Object.keys(st.opts).forEach((k) => { if (st.opts[k]) q.set(k, st.opts[k]); });
    if (st.speed) q.set('speed', st.speed);
    if (st.delivery) q.set('delivery', st.delivery);
    q.set('printer', st.printer);
    history.replaceState(null, '', '?' + q);
    lastSel = sel;
  }
  let lastSel = null;

  /* ---------- Действия ---------- */
  function order() {
    const P = PRODUCTS[pid];
    $('#orderText').innerHTML = `${$('#sumName').textContent}: ${specText()}.<br>Исполнитель — <b>${lastSel.printer.name}</b>, итого <b>${rub(lastSel.total)}</b>. ${P.isDesign ? '' : 'Макет проверим бесплатно до запуска в печать.'}`;
    open('order');
  }
  $('#orderBtn').addEventListener('click', order);
  $('#mbOrder').addEventListener('click', order);
  $('#saveBtn').addEventListener('click', () => {
    const saved = store.get('pg_saved') || [];
    saved.unshift({ url: location.href, name: $('#sumName').textContent, total: lastSel.total, at: Date.now() });
    store.set('pg_saved', saved.slice(0, 20));
    toast('Расчёт сохранён — найдёте его в кабинете');
  });
  $('#shareBtn').addEventListener('click', () => {
    const done = () => toast('Ссылка на расчёт скопирована');
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(location.href).then(done, () => toast(location.href));
    else toast('Скопируйте ссылку из адресной строки');
  });
  $('#customForm').addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.reset();
    toast('Заявка отправлена — предложения придут в течение 2 часов');
  });

  /* ---------- Отрисовка ---------- */
  function renderAll() {
    const custom = !!CUSTOM[pid];
    $('#calc').hidden = custom;
    $('#custom').hidden = !custom;
    $('#mobileBar').style.visibility = custom ? 'hidden' : '';
    const c = CATEGORIES.find((x) => x.id === pid);
    $('#calcTitle').textContent = custom ? c.name + ' — индивидуальный расчёт' : pid === 'design' ? 'Заказать дизайн макета' : 'Калькулятор: ' + c.name.toLowerCase();
    document.title = $('#calcTitle').textContent + ' — Полиграфика';
    renderTabs();
    if (custom) { history.replaceState(null, '', '?type=' + pid); return; }
    const P = PRODUCTS[pid];
    $('#layoutPanel').hidden = !!P.isDesign;
    $('#speedPanel').hidden = !!P.isDesign;
    $('#p4n').textContent = P.isDesign ? '2' : '4';
    $('#p4').textContent = P.isDesign ? 'Выберите дизайнера' : 'Выберите типографию';
    if (P.isDesign) st.needDesign = false;
    $('#needDesign').checked = st.needDesign;
    renderParams(); renderSpeed(); update();
  }
  renderAll();
})();
