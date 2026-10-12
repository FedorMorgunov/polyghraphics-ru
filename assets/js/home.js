/* Главная: плитки видов работ, быстрый калькулятор, пример сравнения */
(function () {
  'use strict';
  const { icon, CATEGORIES, PRODUCTS, offers, rub, readyText, initials } = window.PG;
  const { $, $$ } = window.PG.ui;

  /* Плитки */
  $('#catsGrid').innerHTML = CATEGORIES.map((c) => `
    <a class="cat${c.featured ? ' cat--featured' : ''}" href="calculator.html?type=${c.id}">
      ${c.tag ? `<span class="pill cat__tag">${c.tag}</span>` : ''}
      <span class="cat__icon">${icon(c.icon)}</span>
      <span class="cat__name">${c.name}</span>
      <span class="cat__price">от ${rub(c.from)}${c.id === 'docs' ? ' / лист' : ''}</span>
    </a>`).join('');

  /* Быстрый калькулятор */
  const type = $('#qcType'), qty = $('#qcQty');
  let sides = 0;
  function fillQty() {
    const P = PRODUCTS[type.value];
    qty.innerHTML = P.qty.presets.map((n) => `<option value="${n}"${n === P.qty.def ? ' selected' : ''}>${n.toLocaleString('ru-RU')} шт</option>`).join('');
    const colorField = P.fields.find((f) => f.id === 'color');
    $('#qcSides').style.display = colorField ? '' : 'none';
  }
  function state() {
    const P = PRODUCTS[type.value];
    const opts = {};
    if (type.value === 'flyers') opts.format = 1; // А5
    if (P.fields.some((f) => f.id === 'color')) opts.color = sides;
    return { qty: +qty.value, opts, speed: 0, delivery: 2 };
  }
  function avatar(p, cls) {
    return `<span class="${cls || 'ava'}" style="background:${p.color}">${initials(p.name)}</span>`;
  }
  function renderQuick() {
    const st = state();
    const list = offers(type.value, st).sort((a, b) => a.total - b.total);
    const best = list[0];
    $('#qcPrice').textContent = rub(best.total);
    $('#qcPer').innerHTML = `${(best.total / st.qty).toFixed(2).replace('.', ',')} ₽ за шт<br>${list.length} предложения`;
    $('#qcOffers').innerHTML = list.slice(0, 3).map((o) => `
      <div class="qc-offer">
        ${avatar(o.printer)}
        <span class="nm"><b>${o.printer.name}</b><small>★ ${o.printer.rating.toFixed(1).replace('.', ',')} · готово: ${readyText(o.days).toLowerCase()}</small></span>
        <span class="pr tnum">${rub(o.total)}</span>
      </div>`).join('');
    const q = new URLSearchParams({ type: type.value, qty: st.qty });
    if (st.opts.color) q.set('color', st.opts.color);
    if (st.opts.format) q.set('format', st.opts.format);
    $('#qcGo').href = 'calculator.html?' + q;
  }
  type.addEventListener('change', () => { fillQty(); renderQuick(); });
  qty.addEventListener('change', renderQuick);
  $$('#qcSides button').forEach((b) => b.addEventListener('click', () => {
    sides = +b.dataset.v;
    $$('#qcSides button').forEach((x) => x.classList.toggle('is-active', x === b));
    renderQuick();
  }));
  fillQty(); renderQuick();

  /* Пример сравнения: визитки 1000 шт */
  function renderCompare() {
    const list = offers('cards', { qty: 1000, opts: { finish: 2 }, speed: 0, delivery: 0 }).sort((a, b) => a.score - b.score).slice(0, 4);
    $('#compareTable').innerHTML = `
      <div class="compare-table__row compare-table__row--head"><span>Визитки · 1000 шт · мат. ламинация</span><span>Рейтинг</span><span>Готово</span><span style="text-align:right">Цена</span></div>
      ${list.map((o) => `
        <div class="compare-table__row${o.best ? ' is-best' : ''}">
          <span class="who">${avatar(o.printer)}<span style="min-width:0"><b>${o.printer.name}</b><small>${o.best ? '<span style="color:var(--brand-blue);font-weight:600">Оптимально по цене и сроку</span>' : o.printer.reviews + ' отзывов'}</small></span></span>
          <span>★ ${o.printer.rating.toFixed(1).replace('.', ',')}</span>
          <span>${readyText(o.days)}</span>
          <span class="price tnum">${rub(o.total)}</span>
        </div>`).join('')}`;
  }
  renderCompare();
})();
