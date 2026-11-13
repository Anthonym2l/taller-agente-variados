/* Guía de publicación — interacciones */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const wait = ms => new Promise(r => setTimeout(r, ms));
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};
const G = 'assets/guia/';
$$('.steps li').forEach(li => { if (!li.querySelector(':scope > span.tx')) li.innerHTML = `<span class="tx">${li.innerHTML}</span>`; });
async function copy(txt, btn, ok = '¡Copiado! ✓') {
  try { await navigator.clipboard.writeText(txt); }
  catch { const t = document.createElement('textarea'); t.value = txt; t.style.position = 'fixed'; t.style.opacity = 0; document.body.append(t); t.select(); document.execCommand('copy'); t.remove(); }
  if (btn) { const o = btn.textContent; btn.textContent = ok; setTimeout(() => btn.textContent = o, 1600); }
}

/* ================= PASO 0 · SIMULADOR SEMANAL ================= */
(() => {
  const R = [
    { img: 'brillante.webp', name: 'Juego de carros de construcción', shop: ['Activo', 'S/ 29.90'], cat: ['Ya no aparece en el catálogo', 'red'], ans: 'off', why: 'Si ya no está en el catálogo, no lo pueden enviar: apágalo y desactívalo.' },
    { img: 'xioqui.webp', name: 'Taladro percutor + kit de limpieza', shop: ['Activo', 'S/ 119.90'], cat: ['Agotado', 'red'], ans: 'off', why: 'Agotado = apagar y desactivar, aunque vuelva luego. Lo reactivas cuando haya stock.' },
    { img: 'yilong-b.webp', name: 'Cámara digital para niños', shop: ['Activo', 'S/ 59.90'], cat: ['Precio: S/ 28.50 → S/ 32.00', 'amb'], ans: 'price', why: 'El costo subió: compara con la competencia y productos similares y decide si cambias el precio. Si dudas, consulta a Anthony o César.' },
    { img: 't-rosado.webp', name: 'Cubiertos de silicona · niña', shop: ['Activo', 'S/ 34.90'], cat: ['Disponible, mismo precio', 'grn'], ans: 'keep', why: 'Todo sigue igual: se mantiene.' }
  ];
  const L = { keep: 'Mantener', off: 'Apagar y desactivar', price: 'Revisar precio' };
  const box = $('#wkRows'), sc = $('#wkScore'); let ok = 0; const done = new Set();
  box.innerHTML = R.map((r, i) => `<div class="wk-r" data-i="${i}"><div class="wk-top"><img src="${G}${r.img}" alt="" loading="lazy"><div><b>${r.name}</b><div class="wk-st"><span>Tienda: ${r.shop[0]} · ${r.shop[1]}</span><span class="${r.cat[1]}">Catálogo: ${r.cat[0]}</span></div></div></div><div class="wk-act">${Object.entries(L).map(([k, t]) => `<button type="button" data-a="${k}">${t}</button>`).join('')}</div><div class="wk-fb"></div></div>`).join('');
  box.addEventListener('click', e => {
    const b = e.target.closest('[data-a]'); if (!b) return; const row = b.closest('.wk-r'), i = +row.dataset.i, r = R[i];
    if (done.has(i)) return;
    const good = b.dataset.a === r.ans;
    $$('button', row).forEach(x => x.classList.remove('wrong'));
    b.classList.add(good ? 'right' : 'wrong');
    const fb = $('.wk-fb', row); fb.classList.add('show');
    fb.innerHTML = good ? `✓ ${r.why}` : `Todavía no: piensa qué pasa si un cliente lo compra hoy.`;
    if (good) { done.add(i); ok++; sc.textContent = `${ok} / ${R.length}`; if (ok === R.length) sc.textContent = '¡Revisión completa! ✓'; }
  });
  // registro semanal
  const ring = $('#wkRing'), days = $('#wkDays'), lbl = $('#wkLbl');
  function paint() {
    const t = store.get('pub-revision', null);
    if (!t) { ring.style.strokeDashoffset = 314; days.textContent = '—'; lbl.textContent = 'sin revisión registrada'; return; }
    const d = Math.floor((Date.now() - t) / 864e5);
    ring.style.strokeDashoffset = 314 * Math.min(1, d / 7); ring.style.stroke = d >= 7 ? 'var(--red)' : '';
    days.textContent = d === 0 ? 'Hoy' : `${d} d`; lbl.textContent = d >= 7 ? '¡toca revisar!' : `próxima en ${7 - d} día${7 - d === 1 ? '' : 's'}`;
  }
  $('#wkMark').addEventListener('click', e => { store.set('pub-revision', Date.now()); paint(); const b = e.currentTarget, o = b.textContent; b.textContent = '¡Registrado! ✓'; setTimeout(() => b.textContent = o, 1500); });
  paint();
})();

/* ================= PASO 1 · INICIALES ================= */
const INI = [['Greysys', 'GREYS'], ['Danna', 'DANNA'], ['Patrick', 'PAT'], ['Smith', 'SMITH'], ['Isi', 'ISI']];
let myIni = store.get('pub-ini', 'ISI');
const iniSubs = [];
(() => {
  const box = $('#inis');
  const paint = () => { box.innerHTML = INI.map(([n, c]) => `<button type="button" class="${c === myIni ? 'on' : ''}" data-c="${c}"><b>${c}</b><span>${n}</span></button>`).join(''); };
  box.addEventListener('click', e => { const b = e.target.closest('[data-c]'); if (!b) return; myIni = b.dataset.c; store.set('pub-ini', myIni); paint(); iniSubs.forEach(f => f()); });
  paint();
})();

/* ================= PASO 1 · GÉNERO ================= */
(() => {
  const C = [['Rosado', '#F4A7BE'], ['Lila', '#C6A6E8'], ['Celeste', '#9CCBEB'], ['Verde', '#A8DCC5']];
  const st = {}; // color -> 'NIÑA'|'NIÑO'|undefined
  const pool = $('#gPool'), res = $('#gRes'), bins = $$('.gbin');
  const chip = (n, c, hint) => `<button type="button" class="gchip" data-n="${n}"><i style="background:${c}"></i>${n}${hint ? `<small>${hint}</small>` : ''}</button>`;
  function paint() {
    pool.innerHTML = C.filter(([n]) => !st[n]).map(([n, c]) => chip(n, c, 'tócame')).join('') || '<span class="muted" style="font-weight:600">Toca un color en un SKU para devolverlo.</span>';
    bins.forEach(b => { const g = b.dataset.g, items = C.filter(([n]) => st[n] === g); $('.gl', b).innerHTML = items.map(([n, c]) => chip(n, c)).join(''); b.classList.toggle('has', items.length > 0); });
    const na = C.filter(([n]) => st[n] === 'NIÑA').length, no = C.filter(([n]) => st[n] === 'NIÑO').length, left = C.length - na - no;
    if (left === C.length) res.innerHTML = 'Toca cada color: el primer toque lo manda a <b>niña</b>, el segundo a <b>niño</b>.';
    else if (left) res.innerHTML = `Faltan ${left} color${left > 1 ? 'es' : ''} por asignar.`;
    else if (na && no) res.innerHTML = '✓ <b>2 publicaciones:</b> un SKU de niña y otro de niño, cada uno con sus colores.';
    else res.innerHTML = `✓ <b>1 sola publicación:</b> solo hay colores de ${na ? 'niña' : 'niño'}, así que se publica solo ese SKU.`;
  }
  $('.gender').addEventListener('click', e => {
    const b = e.target.closest('.gchip'); if (!b) return; const n = b.dataset.n;
    st[n] = !st[n] ? 'NIÑA' : st[n] === 'NIÑA' ? 'NIÑO' : undefined; paint();
  });
  paint();
})();

/* ================= PASO 1 · CASOS DE SKU ================= */
(() => {
  const box = $('#caseBox'), tabs = $('#caseTabs');
  const hl = (k, l, t, w, h, tag) => `<button type="button" class="hl" data-k="${k}" style="left:${l}%;top:${t}%;width:${w}%;height:${h}%" aria-label="${tag}"><span class="tg">${tag}</span></button>`;
  const CASES = [
    { title: 'Producto con código en el catálogo', segs: [['cat', 'Catálogo'], ['code', 'Código'], ['ini', 'Iniciales']],
      fl: `<div class="flyer"><img src="${G}brillante.webp" alt="Catálogo Brillante: juego de carros de construcción, código RF-J-151-3P">${hl('cat', 4, 1, 35, 9, 'catálogo')}${hl('code', 76, 12, 22, 8.5, 'código')}</div>`,
      val: { cat: 'BRILLANTE', code: 'RF-J-151-3P' }, ex: 'Ejemplo del documento: Brillante-RF-J-151-3P-ISI', note: 'Toca el nombre del catálogo y el código del producto.' },
    { title: 'Producto sin código en el catálogo', segs: [['cat', 'Catálogo'], ['name', 'Nombre del producto'], ['ini', 'Iniciales']],
      fl: `<div class="flyer"><img src="${G}xioqui.webp" alt="Catálogo Xioqui de taladros sin código de producto">${hl('cat', 92, 0, 8, 6, 'catálogo')}${hl('name', 25, 12, 17, 8.5, 'nombre')}</div>`,
      val: { cat: 'XIOQUI', name: 'TALADROPERCUTORKITDELIMPIEZA' }, ex: 'Ejemplo del documento: XIOQUI-TALADROPERCUTORKITDELIMPIEZA-PAT', note: 'Sin código, el nombre corto del producto ocupa su lugar: todo junto, sin espacios ni símbolos.' },
    { title: 'Código repetido: dos productos con el mismo código', segs: [['cat', 'Catálogo'], ['code', 'Código repetido'], ['name', 'Producto + género + diferencial'], ['ini', 'Iniciales']],
      fl: `<div class="fl-in two" style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><div><div class="flyer"><img src="${G}yilong-b.webp" alt="Cámara digital simple, código ZXJ-1005">${hl('code', 9, 34.5, 15, 5, 'código')}${hl('simple', 30, 55, 60, 38, 'simple')}</div><div class="cap2">Producto 1</div></div><div><div class="flyer"><img src="${G}yilong-a.webp" alt="Cámara digital con diseño, el mismo código ZXJ-1005">${hl('code2', 7, 27, 17, 5, 'mismo código')}${hl('diseno', 52, 18, 46, 52, 'diseño')}</div><div class="cap2">Producto 2</div></div></div>`,
      val: { cat: 'YILONG', code: 'ZXJ-1005' }, gender: true, ex: 'Ejemplo del documento: YILONG-ZXJ-1005-CAMARADENIÑOSIMPLE-DANNA', note: 'Catálogo: YILONG. Los dos productos tienen el mismo código ZXJ-1005: toca el código, luego el producto que publicas y elige el género. El nombre siempre lleva el género.' },
    { title: 'Stock del almacén', wh: true }
  ];
  let ci = 0, st = {};
  const norm = s => s.toUpperCase();
  function sku() {
    const c = CASES[ci]; const parts = c.segs.map(([k]) => k === 'ini' ? myIni : st[k]);
    return { parts, done: parts.every(Boolean) };
  }
  function paintOut() {
    const c = CASES[ci]; if (c.wh) return;
    const { parts, done } = sku();
    $$('.formula .seg', box).forEach((s, i) => { s.classList.toggle('f', !!parts[i]); s.textContent = parts[i] || c.segs[i][1]; });
    $('.skuout', box).innerHTML = parts.map((p, i) => p ? `<span${done ? ' class="ok"' : ''}>${p}</span>` : `<span class="ph">${c.segs[i][1].toLowerCase()}</span>`).join('-');
    $('.cpy', box).disabled = !done;
    $('.done-msg', box).textContent = done ? '✓ SKU listo. Verifica que corresponda a este producto antes de subirlo.' : '';
  }
  function render() {
    st = {}; const c = CASES[ci];
    $$('button', tabs).forEach((b, i) => b.classList.toggle('on', i === ci));
    if (c.wh) return renderWh();
    box.innerHTML = `<div class="fl">${c.fl}</div><div class="bd"><b style="font-size:20px">${c.title}</b><p class="note">${c.note}</p>
      <div class="formula">${c.segs.map(() => '<span class="seg"></span>').join('<span class="dash">-</span>')}</div>
      ${c.gender ? '<div class="pick2" data-p="g"><button type="button" data-v="NIÑO">Niño</button><button type="button" data-v="NIÑA">Niña</button></div>' : ''}
      <div class="skuout"></div><div class="done-msg note" style="color:var(--green)"></div>
      <div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn sm y cpy" type="button">Copiar SKU</button><button class="btn sm ghost rst" type="button">Reiniciar</button></div>
      <p class="note">${c.ex}</p></div>`;
    paintOut();
  }
  let gsel = null, ysel = null;
  box.addEventListener('click', e => {
    const c = CASES[ci]; if (c.wh) return;
    const h = e.target.closest('.hl');
    if (h) {
      const k = h.dataset.k;
      if (k === 'cat') st.cat = c.val.cat;
      else if (k === 'code' || k === 'code2') { st.code = c.val.code; $$('.hl[data-k^="code"]', box).forEach(x => x.classList.add('done')); }
      else if (k === 'name') st.name = c.val.name;
      else if (k === 'simple' || k === 'diseno') { ysel = k === 'simple' ? 'SIMPLE' : 'DISEÑO'; $$('.hl[data-k="simple"],.hl[data-k="diseno"]', box).forEach(x => x.classList.toggle('done', x === h)); }
      if (!['simple', 'diseno', 'code', 'code2'].includes(k)) h.classList.add('done');
      if (!st.cat && c.gender && k !== 'cat') st.cat = c.val.cat; // en el caso repetido el catálogo es Yilong
      if (c.gender) st.name = ysel && gsel ? `CAMARADE${gsel}${ysel}` : null;
      paintOut(); return;
    }
    const g = e.target.closest('[data-p="g"] button');
    if (g) { gsel = g.dataset.v; $$('[data-p="g"] button', box).forEach(x => x.classList.toggle('on', x === g)); st.name = ysel && gsel ? `CAMARADE${gsel}${ysel}` : null; if (!st.cat) st.cat = c.val.cat; paintOut(); return; }
    if (e.target.closest('.cpy')) { const { parts } = sku(); copy(parts.join('-'), e.target.closest('.cpy')); return; }
    if (e.target.closest('.rst')) { gsel = ysel = null; render(); }
  });
  function renderWh() {
    box.innerHTML = `<div class="fl"><div class="wh"><span class="lab2">SKU en Upseller</span><div class="skubig" id="whSku">8809913833444</div>
      <ul class="whst" id="whSt"><li><i>1</i>Publica con el mismo SKU de Upseller</li><li><i>2</i>¿Falla la subida? Verifica en Falabella o en la plataforma donde lo subiste</li><li><i>3</i>Si aún no te deja, agrega un <b>1</b> al final</li></ul></div></div>
      <div class="bd"><b style="font-size:20px">Producto de stock del almacén</b><p class="note">Se publica con el <b>mismo SKU de Upseller</b>. Solo si la plataforma no lo acepta, después de verificar, se le agrega un 1 al final.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn sm v" id="whGo" type="button">⬆ Subir producto</button><button class="btn sm ghost" id="whRst" type="button">Reiniciar</button></div>
      <div class="msg" id="whMsg" style="background:#F4F0FA;color:var(--ink)">Toca “Subir producto”.</div>
      <p class="note">Precio: usa el costo de Upseller y el cuadro de ganancia (más abajo).</p></div>`;
    let stage = 0; const li = $$('#whSt li', box), msg = $('#whMsg', box), btn = $('#whGo', box), sk = $('#whSku', box);
    const set = n => li.forEach((l, i) => { l.classList.toggle('on', i < n); });
    btn.onclick = async () => {
      if (stage === 0) { set(1); msg.innerHTML = '✕ La plataforma dice: <b>“El SKU ya existe”</b>.'; li[0].classList.add('bad'); btn.textContent = '🔎 Verificar en Falabella'; stage = 1; }
      else if (stage === 1) { set(2); msg.innerHTML = 'Revisaste: no hay otra publicación tuya con ese producto, pero sigue sin dejarte subirlo.'; btn.textContent = '＋ Agregar 1 al final'; stage = 2; }
      else if (stage === 2) { set(3); sk.innerHTML = '8809913833444<span class="add">1</span>'; msg.innerHTML = '✓ Nuevo SKU: <b>88099138334441</b>. Súbelo de nuevo.'; btn.textContent = '✓ Listo'; btn.disabled = true; stage = 3; }
    };
    $('#whRst', box).onclick = renderWh;
  }
  tabs.addEventListener('click', e => { const b = e.target.closest('[data-c]'); if (!b) return; ci = +b.dataset.c; gsel = ysel = null; render(); });
  iniSubs.push(() => { if (!CASES[ci].wh) paintOut(); });
  render();
})();

/* ================= PASO 1 · ENLACE SKU ↔ PRODUCTO ================= */
(() => {
  const card = $('.link'), prod = $('#lkProd'), msg = $('#lkMsg');
  $('.lk-ctrl').addEventListener('click', e => {
    const b = e.target.closest('[data-lk]'); if (!b) return; const bad = b.dataset.lk === 'bad';
    card.classList.toggle('bad', bad);
    $$('.lk-ctrl .btn').forEach(x => { x.classList.toggle('v', x === b); x.classList.toggle('ghost', x !== b); });
    prod.innerHTML = bad ? `<img src="${G}xioqui.webp" alt=""><span>Taladro percutor (otro producto)</span>` : `<img src="${G}brillante.webp" alt=""><span>Juego de carros de construcción</span>`;
    msg.textContent = bad ? '✕ El SKU quedó enlazado a otro producto: las ventas de los carritos descuentan stock del taladro. Por eso siempre verifica antes de subir.' : 'El SKU queda enlazado a este producto: stock y ventas van juntos.';
  });
})();

/* ================= PASO 1 · CUADRO DE GANANCIA ================= */
(() => {
  // Cuadro del documento: costo → aumento (S/)
  const T = [['Menor a S/ 5', 10, c => c < 5], ['De S/ 5 a S/ 20', 15, c => c >= 5 && c <= 20], ['Mayor a S/ 20', 20, c => c > 20 && c <= 50], ['Mayor a S/ 50', 30, c => c > 50 && c <= 90], ['Mayor a S/ 90', 45, c => c > 90]];
  const tb = $('#pTable tbody'), inp = $('#cost');
  tb.innerHTML = T.map(([l, a]) => `<tr><td>${l}</td><td>+ S/ ${a}</td></tr>`).join('');
  const f = n => 'S/ ' + n.toFixed(2);
  function calc() {
    const c = parseFloat(inp.value); const rows = $$('tr', tb);
    if (!(c >= 0)) { $('#pAdd').textContent = '—'; $('#pBase').textContent = '—'; rows.forEach(r => r.classList.remove('on')); return; }
    const i = T.findIndex(t => t[2](c)); rows.forEach((r, j) => r.classList.toggle('on', j === i));
    $('#pAdd').textContent = `+ S/ ${T[i][1]}`; $('#pBase').textContent = f(c + T[i][1]);
  }
  inp.addEventListener('input', calc); calc();
})();

/* ================= PASO 1 · MERCADO LIBRE ================= */
(() => {
  const ml = $('.ml'), cur = $('#mlCur'), steps = $$('#mlSteps li');
  const on = n => steps.forEach((s, i) => s.classList.toggle('on', i <= n));
  let busy = false;
  async function play() {
    if (busy) return; busy = true; ml.classList.remove('go', 's3');
    cur.style.transition = 'none'; cur.style.left = '50%'; cur.style.top = '70%'; cur.style.opacity = 0; void cur.offsetWidth; cur.style.transition = '';
    on(0); await wait(500); cur.style.opacity = 1; await wait(100);
    cur.style.left = '93%'; cur.style.top = '11%'; on(1); await wait(950); ml.classList.add('go');
    await wait(500); cur.style.left = '86%'; cur.style.top = '78%'; await wait(950); ml.classList.add('s3'); on(2);
    await wait(900); on(3); cur.style.opacity = 0; busy = false;
  }
  $('#mlPlay').addEventListener('click', play);
  const o = new IntersectionObserver(es => { if (es[0].isIntersecting) { play(); o.disconnect(); } }, { threshold: .6 }); o.observe(ml);
})();

/* ================= PASO 2 · COLUMNAS DEL EXCEL ================= */
(() => {
  const C = [
    ['SKU', 'Obligatorio', 'Código único del producto (el que armaste en el paso 1).', 'BRILLANTE-RF-J-151-3P-ISI'],
    ['Nombre', 'Obligatorio', 'Título del producto.', 'Juego de carros de construcción mediano'],
    ['Marca', 'Obligatorio', 'Marca del producto; si no tiene, la que indique el equipo.', 'GENERICO'],
    ['Modelo', 'Opcional', 'Modelo o variante, si aplica.', 'RF-J-151-3P'],
    ['Precio', 'Obligatorio', 'Solo números, sin símbolos (sin “S/”).', '29.90'],
    ['Precio_Oferta', 'Opcional', 'Solo números.', '24.90'],
    ['Stock', 'Obligatorio', 'Solo números enteros.', '10'],
    ['Cat. Falabella', 'Según plataforma', 'Categoría de Falabella (su ID, de la pestaña Categorías).', 'ID de la categoría'],
    ['Cat. ML', 'Según plataforma', 'Categoría de Mercado Libre.', 'Juguetes > Vehículos'],
    ['Fecha_Inicio', 'Opcional', 'Formato AAAA-MM-DD.', '2026-01-01'],
    ['Fecha_Fin', 'Opcional', 'Formato AAAA-MM-DD.', '2030-01-01'],
    ['URL_Imagen', 'Opcional', 'URL(s) de imagen, separadas por coma.', 'https://…/1.jpg, https://…/2.jpg'],
    ['Características', 'Opcional', 'Texto libre / ficha del producto.', 'Material: plástico · Piezas móviles'],
    ['Cat. Shopify', 'Según plataforma', 'Categoría de Shopify; se sugiere o busca desde la grilla.', 'Juguetes']
  ];
  const RC = { Obligatorio: ['#FDE2E0', '#B3261E'], Opcional: ['#EEE7F7', '#5A4A6A'], 'Según plataforma': ['#FFF1BF', '#7A5600'] };
  const chips = $('#colChips'), info = $('#colInfo'), filt = $('#colFilter');
  chips.innerHTML = C.map((c, i) => `<button type="button" data-i="${i}" data-r="${c[1]}">${c[0]}</button>`).join('');
  function show(i) {
    const c = C[i]; $$('button', chips).forEach((b, j) => b.classList.toggle('on', j === i));
    info.innerHTML = `<span class="rq" style="background:${RC[c[1]][0]};color:${RC[c[1]][1]}">${c[1]}</span><h4>${c[0]}</h4><p class="muted" style="font-weight:600">${c[2]}</p><div class="ex">Ejemplo: ${c[3]}</div>`;
    info.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 300 });
  }
  chips.addEventListener('click', e => { const b = e.target.closest('[data-i]'); if (b) show(+b.dataset.i); });
  filt.addEventListener('click', e => { const b = e.target.closest('[data-f]'); if (!b) return; $$('button', filt).forEach(x => x.classList.toggle('on', x === b)); const f = b.dataset.f; $$('button', chips).forEach(x => x.classList.toggle('hide', f !== 'all' && x.dataset.r !== f)); });
  show(0);

  // fila llenada por la IA, con 4 errores
  const X = [
    ['SKU', 'BRILLANTE-RF-J-151-3P-ISI'], ['Nombre', 'Juego de carros de construcción mediano'],
    ['Marca', '', 'Obligatoria: no puede quedar vacía.', 'GENERICO'],
    ['Precio', 'S/ 29.90', 'Solo números: sin “S/”.', '29.90'],
    ['Stock', '10 und', 'Solo números enteros.', '10'],
    ['Fecha_Inicio', '01/01/2026', 'Formato AAAA-MM-DD.', '2026-01-01'],
    ['Fecha_Fin', '2030-01-01'], ['Cat. ML', 'Juguetes > Vehículos']
  ];
  const row = $('#xRow'), msg = $('#xMsg'), fix = $('#xFix'); const found = new Set();
  row.innerHTML = X.map((c, i) => `<div class="xc" data-i="${i}"><div class="xh">${c[0]}</div><div class="xv">${c[1] || '&nbsp;'}</div></div>`).join('');
  row.addEventListener('click', e => {
    const cell = e.target.closest('.xc'); if (!cell) return; const i = +cell.dataset.i, c = X[i];
    if (!c[2]) { cell.classList.remove('miss'); void cell.offsetWidth; cell.classList.add('miss'); return; }
    if (found.has(i)) return; found.add(i); cell.classList.add('found');
    $('.xv', cell).innerHTML = `${c[1] || '(vacío)'}<span class="why">✕ ${c[2]}</span>`;
    msg.textContent = `Encontrados: ${found.size} / 4`;
    if (found.size === 4) { msg.textContent = '¡Los 4! Ahora corrige la fila.'; fix.disabled = false; }
  });
  fix.addEventListener('click', async () => {
    fix.disabled = true;
    for (const i of found) { const cell = $(`.xc[data-i="${i}"]`, row); cell.classList.remove('found'); cell.classList.add('fixed'); $('.xv', cell).innerHTML = `${X[i][3]}<span class="why">✓ corregido</span>`; await wait(260); }
    msg.textContent = '✓ Fila revisada. Así se revisa todo lo que genera la IA antes de subir.';
  });
})();

/* ================= PASO 3 · GALERÍA DE EJEMPLOS ================= */
(() => {
  const tn = (n, l, t, g) => `<span class="tn${g ? ' g' : ''}" style="--i:${n};left:${l}%;top:${t}%">${n}</span>`;
  const thumbs = (l, tops, gi) => tops.map((t, i) => tn(i + 1, l, t, i + 1 === gi)).join('');
  const E = [
    { t: 'Foto 1', ok: 0, sq: 1, img: 'foto1-todos.webp', v: 'NO como<br>principal', b: 'Todos los colores en una sola imagen', p: 'Nunca como imagen principal. Esta foto sí puede ir como imagen 4 o 5.', extra: '' },
    { t: 'Foto 2', ok: 1, img: 'foto2-almohada.webp', v: 'Válido', b: 'La principal es un solo modelo', p: 'La imagen 1 muestra un color; las siguientes muestran los otros, uno por foto.', extra: thumbs(10, [14, 28.5, 43, 58, 72.5, 87], 0) },
    { t: 'Foto 3', ok: 1, img: 'foto3-ninas.webp', v: 'Válido', b: 'SKU niña: rosado en la 1', p: 'Un color del género en la principal, sus vistas después, todos juntos en la 5 y la foto en uso en la 6.', extra: thumbs(12.6, [18.3, 32.2, 45.7, 59.3, 73.2, 87.1], 5) },
    { t: 'Foto 4', ok: 1, img: 'foto4-ninos.webp', v: 'Válido', b: 'SKU niño: celeste en la 1', p: 'El mismo orden con los colores de niño. Lo ideal: foto 1 un color, foto 2 otro color, y así; todos juntos en la 4 o 5.', extra: thumbs(13.2, [15.3, 29.9, 44.8, 59.4, 74.3, 88.9], 5) }
  ];
  const tabs = $('#galTabs'), img = $('#galImg'), txt = $('#galTxt');
  tabs.innerHTML = E.map((e, i) => `<button type="button" data-i="${i}"><span>${e.t}</span><i style="background:${e.ok ? 'var(--green)' : 'var(--red)'}">${e.ok ? '✓' : '✕'}</i></button>`).join('');
  function show(i) {
    const e = E[i]; $$('button', tabs).forEach((b, j) => b.classList.toggle('on', j === i));
    img.classList.remove('play');
    img.innerHTML = `<div class="frame" style="max-width:${e.sq ? '440px' : '100%'}"><img src="${G}${e.img}" alt="${e.b}">${e.extra}<span class="vd ${e.ok ? 'ok' : 'no'}">${e.v}</span></div>`;
    txt.innerHTML = `<b>${e.b}</b><p>${e.p}</p>`;
    const go = () => requestAnimationFrame(() => img.classList.add('play'));
    const im = $('img', img); im.complete ? go() : im.addEventListener('load', go, { once: true });
  }
  tabs.addEventListener('click', e => { const b = e.target.closest('[data-i]'); if (b) show(+b.dataset.i); });
  show(0);
  const o = new IntersectionObserver(es => { if (es[0].isIntersecting) { show(0); o.disconnect(); } }, { threshold: .4 }); o.observe(img);
})();

/* ================= PASO 3 · JUEGO DE ORDEN ================= */
(() => {
  const T = [
    { k: 'rosado', l: 'Rosado', type: 'nina' }, { k: 'celeste', l: 'Celeste', type: 'nino' }, { k: 'todos', l: 'Todos juntos', type: 'all' },
    { k: 'morado', l: 'Morado', type: 'nina' }, { k: 'uso', l: 'En uso (IA)', type: 'gen' }, { k: 'gris', l: 'Gris', type: 'nino' }
  ];
  const N = 5; let slots = Array(N).fill(null);
  const sEl = $('#slots'), pEl = $('#pool'), rEl = $('#oRules');
  const RULES = [
    ['r1', 'La imagen 1 es un solo color de niña'],
    ['r2', 'Los colores de niño no van como foto suelta'],
    ['r3', '“Todos juntos” va en la 3, 4 o 5, nunca en la 1'],
    ['r4', 'Los colores de niña van antes de “Todos juntos”'],
    ['r5', 'La foto en uso (IA) va después de “Todos juntos”']
  ];
  function paint() {
    sEl.innerHTML = slots.map((s, i) => `<div class="slot${s ? ' full' : ''}" data-i="${i}"><span class="sn">${i + 1}</span>${s ? `<img src="${G}t-${s.k}.webp" alt=""><span class="sl">${s.l}</span>` : i + 1}</div>`).join('');
    pEl.innerHTML = T.map(t => `<button type="button" class="ptile${slots.includes(t) ? ' used' : ''}" data-k="${t.k}"><img src="${G}t-${t.k}.webp" alt=""><span>${t.l}</span></button>`).join('');
    rEl.innerHTML = RULES.map(([k, l]) => `<li data-k="${k}"><i>?</i>${l}</li>`).join('');
  }
  pEl.addEventListener('click', e => { const b = e.target.closest('[data-k]'); if (!b) return; const t = T.find(x => x.k === b.dataset.k); const i = slots.indexOf(null); if (i < 0) return; slots[i] = t; paint(); });
  sEl.addEventListener('click', e => { const s = e.target.closest('.slot'); if (!s) return; slots[+s.dataset.i] = null; paint(); });
  $('#oReset').addEventListener('click', () => { slots = Array(N).fill(null); paint(); });
  $('#oCheck').addEventListener('click', () => {
    const idx = k => slots.findIndex(s => s && s.k === k);
    const types = slots.map(s => s && s.type), all = idx('todos'), gen = idx('uso');
    const ninaIdx = slots.map((s, i) => s && s.type === 'nina' ? i : -1).filter(i => i >= 0);
    const res = {
      r1: types[0] === 'nina',
      r2: !types.includes('nino'),
      r3: all >= 2,
      r4: all >= 0 && ninaIdx.length === 2 && ninaIdx.every(i => i < all),
      r5: gen < 0 || (all >= 0 && gen > all)
    };
    let okAll = true;
    RULES.forEach(([k]) => { const li = $(`li[data-k="${k}"]`, rEl); li.classList.toggle('ok', res[k]); li.classList.toggle('no', !res[k]); $('i', li).textContent = res[k] ? '✓' : '✕'; if (!res[k]) okAll = false; });
    $$('.slot', sEl).forEach((s, i) => { s.classList.remove('bad', 'good'); const t = slots[i]; if (!t) return; let bad = t.type === 'nino' || (i === 0 && t.type !== 'nina') || (t.k === 'todos' && i < 2) || (t.k === 'uso' && (all < 0 || i < all)); s.classList.add(bad ? 'bad' : 'good'); });
    if (okAll && slots.every(Boolean)) rEl.insertAdjacentHTML('beforeend', '<li class="ok"><i>★</i><b>¡Orden perfecto! Así se publica.</b></li>');
  });
  paint();
})();

/* ================= PASO 3 · FALABELLA DESORDENA ================= */
(() => {
  const order = ['rosado', 'morado', 'todos', 'uso', 'celeste'];
  const show = ['rosado', 'morado', 'todos', 'uso'];
  const row = $('#shRow'), msg = $('#shMsg'), up = $('#shUp'), fix = $('#shFix');
  row.innerHTML = show.map((k, i) => `<div class="sh-t" data-k="${k}" style="left:${i * 25 + 1}%"><img src="${G}t-${k}.webp" alt=""><b>${i + 1}</b></div>`).join('');
  const tiles = $$('.sh-t', row);
  const place = arr => arr.forEach((k, i) => { const t = tiles.find(x => x.dataset.k === k); t.style.left = `${i * 25 + 1}%`; $('b', t).textContent = i + 1; t.classList.toggle('wrong', k !== show[i]); });
  up.addEventListener('click', async () => {
    up.disabled = true; msg.textContent = 'Subiendo…';
    tiles.forEach(t => t.style.transform = 'translateY(-14px) rotate(-4deg)'); await wait(400);
    place(['todos', 'uso', 'rosado', 'morado']); tiles.forEach(t => t.style.transform = '');
    await wait(700); msg.innerHTML = '✕ Falabella guardó otro orden: ¡“Todos juntos” quedó como principal!'; fix.disabled = false;
  });
  fix.addEventListener('click', async () => {
    fix.disabled = true; place(show); await wait(700); msg.innerHTML = '✓ Revisado y reordenado. Abre siempre la publicación para confirmarlo.'; up.disabled = false;
  });
  void order;
})();

/* ================= PASO 4 · DESCRIPCIÓN ================= */
(() => {
  const vEl = $('#dVar'), pEl = $('#dPos'), line = $('#dLine'), txt = $('#dTxt');
  const val = el => $('button.on', el).textContent;
  const sentence = () => `Cualquier ${val(vEl)} se enviará de manera aleatoria según el stock (Ver Foto ${val(pEl)}).`;
  function paint() {
    line.innerHTML = `Cualquier <mark>${val(vEl)}</mark> se enviará de manera aleatoria según el stock <mark>(Ver Foto ${val(pEl)})</mark>.`;
    const ins = $('.ins', txt); if (ins) ins.textContent = sentence();
  }
  [vEl, pEl].forEach(el => el.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; $$('button', el).forEach(x => x.classList.toggle('on', x === b)); paint(); }));
  $('#dIns').addEventListener('click', () => {
    let ins = $('.ins', txt);
    if (!ins) { ins = document.createElement('p'); ins.className = 'ins'; txt.prepend(ins); }
    else { ins.style.animation = 'none'; void ins.offsetWidth; ins.style.animation = ''; }
    ins.textContent = sentence();
  });
  $('#dCopy').addEventListener('click', e => { if (!$('.ins', txt)) $('#dIns').click(); copy([...txt.children].map(p => p.textContent).join('\n\n'), e.currentTarget); });
  paint();
})();

/* ================= CHECKLIST FINAL ================= */
(() => {
  const I = [
    'Revisé el catálogo esta semana: agotados apagados y precios al día',
    'Separé los colores por género (SKU niña / SKU niño)',
    'Armé el SKU con el formato de mi caso y mis iniciales',
    'Verifiqué que el SKU corresponde a este producto',
    'Almacén: precio con costo de Upseller + cuadro de ganancia + medidas de Falabella',
    'Revisé lo que generó la IA en el Excel (formatos y obligatorios)',
    'Imagen 1 = un color del género; “todos juntos” en la 3, 4 o 5',
    'Después de cargar, abrí la publicación y confirmé el orden de imágenes',
    'Agregué al inicio la línea de color aleatorio con su número de foto'
  ];
  let done = new Set(store.get('pub-check', []));
  const ul = $('#pChk'), ring = $('#pRing'), txt = $('#pTxt'), ok = $('#pDone');
  function paint() {
    ul.innerHTML = I.map((t, i) => `<li class="${done.has(i) ? 'done' : ''}" data-i="${i}"><span class="ck"></span>${t}</li>`).join('');
    txt.textContent = `${done.size}/${I.length}`; ring.style.strokeDashoffset = 314 - 314 * done.size / I.length;
    ok.style.display = done.size === I.length ? 'flex' : 'none';
  }
  ul.addEventListener('click', e => { const li = e.target.closest('li'); if (!li) return; const i = +li.dataset.i; done.has(i) ? done.delete(i) : done.add(i); store.set('pub-check', [...done]); paint(); });
  $('#pReset').addEventListener('click', () => { done = new Set(); store.set('pub-check', []); paint(); });
  paint();
})();
})();
