/* Taller del agente Variados — interacciones (sin dependencias) */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const wait = ms => new Promise(r => setTimeout(r, ms));

/* ================= ILUSTRACIONES (originales, SVG) ================= */
const C = { body: '#8B5CD6', dark: '#7A4CC4', cream: '#F3ECE3', creamL: '#E3D8CA', hub: '#F7F3EE' };
const ILL = {
  bike(o = {}) {
    const grips = o.grips || C.body, tire = o.tire || C.body;
    const shadow = o.longShadow
      ? '<ellipse cx="62" cy="206" rx="150" ry="11" fill="rgba(40,20,60,.34)" transform="rotate(5 62 206)"/>'
      : '<ellipse cx="152" cy="212" rx="118" ry="8" fill="rgba(40,20,60,.13)"/>';
    const wheel = x => `<circle cx="${x}" cy="176" r="34" fill="${tire}"/><circle cx="${x}" cy="176" r="17" fill="${C.hub}"/><rect x="${x - 8}" y="173" width="16" height="6" rx="3" fill="${C.body}"/>`;
    return `<svg class="ill" viewBox="0 0 300 220" style="overflow:visible">${shadow}
<rect x="198" y="58" width="28" height="80" rx="12" fill="${C.body}"/><rect x="100" y="104" width="20" height="40" rx="8" fill="${C.body}"/>
<path d="M62 168 Q66 132 108 128 L196 128 Q228 128 232 168 Z" fill="${C.cream}" stroke="${C.creamL}" stroke-width="2"/>
<ellipse cx="112" cy="102" rx="34" ry="11" fill="${C.cream}" stroke="${C.creamL}" stroke-width="2"/>
${wheel(80)}${wheel(222)}
<rect x="166" y="40" width="96" height="14" rx="7" fill="${C.dark}"/>
<rect x="164" y="39" width="20" height="16" rx="8" fill="${grips}" stroke="#D9D0E3" stroke-width="${o.grips ? 1.5 : 0}"/><rect x="244" y="39" width="20" height="16" rx="8" fill="${grips}" stroke="#D9D0E3" stroke-width="${o.grips ? 1.5 : 0}"/>
<circle cx="191" cy="20" r="11" fill="${C.body}"/><circle cx="235" cy="20" r="11" fill="${C.body}"/><circle cx="213" cy="44" r="30" fill="#9466DD"/>
<ellipse cx="213" cy="56" rx="18" ry="13" fill="#fff"/><circle cx="203" cy="38" r="3.4" fill="#1A1A1A"/><circle cx="223" cy="38" r="3.4" fill="#1A1A1A"/><ellipse cx="213" cy="52" rx="5" ry="3.6" fill="#1A1A1A"/></svg>`;
  },
  bikeBad() { return ILL.bike({ grips: '#FFFFFF', longShadow: true }); },
  diag() {
    return `<svg class="ill" viewBox="0 0 300 220" style="overflow:visible">
<ellipse cx="148" cy="196" rx="122" ry="15" fill="rgba(40,20,60,.13)"/>
<ellipse cx="96" cy="146" rx="18" ry="26" fill="#6E43B8"/><ellipse cx="218" cy="160" rx="20" ry="28" fill="#6E43B8"/>
<path d="M88 112 L222 128 L196 160 L60 142 Z" fill="#F7F1E8" stroke="#F7F1E8" stroke-width="22" stroke-linejoin="round"/>
<path d="M60 142 L196 160 L195 180 L60 162 Z" fill="#E6D9C8" stroke="#E6D9C8" stroke-width="14" stroke-linejoin="round"/>
<path d="M196 160 L222 128 L222 146 L195 180 Z" fill="#EDE2D3" stroke="#EDE2D3" stroke-width="10" stroke-linejoin="round"/>
<line x1="104" y1="128" x2="106" y2="100" stroke="${C.body}" stroke-width="16" stroke-linecap="round"/>
<ellipse cx="108" cy="96" rx="32" ry="12" fill="#E8DCCB"/><ellipse cx="108" cy="92" rx="32" ry="11" fill="#F7F1E8"/>
<ellipse cx="66" cy="168" rx="22" ry="31" fill="${C.body}"/><ellipse cx="66" cy="168" rx="10" ry="15" fill="${C.hub}"/>
<ellipse cx="188" cy="184" rx="24" ry="33" fill="${C.body}"/><ellipse cx="188" cy="184" rx="11" ry="16" fill="${C.hub}"/>
<line x1="206" y1="142" x2="214" y2="66" stroke="${C.body}" stroke-width="26" stroke-linecap="round"/>
<line x1="180" y1="80" x2="250" y2="34" stroke="${C.dark}" stroke-width="14" stroke-linecap="round"/>
<circle cx="197" cy="24" r="11" fill="${C.body}"/><circle cx="240" cy="22" r="11" fill="${C.body}"/><circle cx="217" cy="48" r="30" fill="#9466DD"/>
<ellipse cx="226" cy="60" rx="17" ry="12.5" fill="#fff"/><circle cx="212" cy="42" r="3.4" fill="#1A1A1A"/><circle cx="234" cy="41" r="3.4" fill="#1A1A1A"/><ellipse cx="230" cy="56" rx="5" ry="3.6" fill="#1A1A1A"/></svg>`;
  },
  charger() { return `<svg viewBox="0 0 100 78" width="100%" style="overflow:visible"><rect x="4" y="22" width="62" height="50" rx="10" fill="#2A2D31"/><rect x="13" y="31" width="44" height="7" rx="3.5" fill="#4A4F56"/><path d="M66 46 C90 46 86 14 98 10" stroke="#2A2D31" stroke-width="6" fill="none" stroke-linecap="round"/></svg>`; },
  box() { return `<svg viewBox="0 0 120 120" width="100%"><rect x="14" y="26" width="92" height="84" rx="8" fill="#E9DDF7"/><rect x="14" y="26" width="92" height="18" rx="8" fill="#C9B2EE"/><circle cx="60" cy="76" r="20" fill="${C.body}"/><circle cx="50" cy="60" r="6" fill="${C.body}"/><circle cx="70" cy="60" r="6" fill="${C.body}"/></svg>`; },
  manual() { return `<svg viewBox="0 0 80 100" width="100%"><rect x="4" y="4" width="72" height="92" rx="8" fill="#F4F0FA" stroke="#DCD2EA" stroke-width="2"/><rect x="14" y="16" width="52" height="8" rx="4" fill="${C.body}"/>${[34, 46, 58, 70, 82].map(y => `<rect x="14" y="${y}" width="${y === 82 ? 30 : 52}" height="5" rx="2.5" fill="#D6CDE3"/>`).join('')}</svg>`; },
  person(shirt) { return `<svg viewBox="0 0 60 150" width="100%"><ellipse cx="30" cy="146" rx="20" ry="4" fill="rgba(0,0,0,.12)"/><rect x="17" y="84" width="11" height="60" rx="5" fill="#33405E"/><rect x="32" y="84" width="11" height="60" rx="5" fill="#33405E"/><rect x="14" y="33" width="32" height="56" rx="14" fill="${shirt}"/><circle cx="30" cy="18" r="13" fill="#F0C29E"/><path d="M17 17 Q17 2 30 3 Q44 3 43 17 Q40 9 30 9 Q20 9 17 17Z" fill="#3B2A20"/></svg>`; }
};
const P = (l, t, w, inner, z = '') => `<div style="position:absolute;left:${l}%;top:${t}%;width:${w}%;${z}">${inner}</div>`;
const TILE = {
  main: () => P(8, 20, 84, ILL.bike()),
  diag: () => P(8, 18, 84, ILL.diag()),
  detail: () => P(-163, 0, 300, ILL.bike()),
  acc: () => `<div style="position:absolute;inset:0;background:#fff"></div>` + P(10, 30, 34, ILL.box()) + P(42, 34, 50, ILL.bike()) + P(70, 52, 20, ILL.manual()),
  sceneA: () => `<div style="position:absolute;inset:0;background:linear-gradient(#F1E2CC 0 60%,#C69665 60%)"></div><div style="position:absolute;left:66%;top:8%;width:24%;height:30%;border-radius:10px;background:#FFF6E6;box-shadow:inset 0 0 0 3px #E2CDAE"></div>` + P(5, 22, 22, ILL.person('#FFC93C')) + P(26, 42, 66, ILL.bike()),
  sceneB: () => `<div style="position:absolute;inset:0;background:linear-gradient(#CFE6F2 0 56%,#8DBB7A 56%)"></div><div style="position:absolute;left:10%;top:8%;width:20%;aspect-ratio:1;border-radius:50%;background:#FFE7A0"></div>` + P(4, 40, 60, ILL.diag()) + P(68, 26, 22, ILL.person('#3CCB7F'))
};
const tileHTML = (k, lbl) => `<div class="tileimg">${TILE[k]()}${lbl ? `<span class="lbl">${lbl}</span>` : ''}</div>`;
$$('[data-ill]').forEach(el => { el.innerHTML = ILL[el.dataset.ill](); });
$$('[data-tile]').forEach(el => el.insertAdjacentHTML('afterbegin', TILE[el.dataset.tile]()));

/* ================= TEXTO PALABRA POR PALABRA ================= */
$$('[data-words]').forEach(h => {
  let i = 0; const frag = document.createDocumentFragment();
  [...h.childNodes].forEach(n => {
    if (n.nodeType === 3) {
      n.textContent.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.append(' '); return; }
        const s = document.createElement('span'); s.className = 'w'; s.style.setProperty('--i', i++); s.textContent = part; frag.append(s);
      });
    } else {
      const s = document.createElement('span'); s.className = 'w'; s.style.setProperty('--i', i++); s.append(n.cloneNode(true)); frag.append(s);
    }
  });
  h.textContent = ''; h.append(frag);
});

/* ================= REVEAL + NAV ACTIVA ================= */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15, rootMargin: '0px 0px -6% 0px' });
$$('.reveal,[data-words]').forEach(el => io.observe(el));
const navLinks = $$('.bar nav a');
const secIO = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
$$('main section[id]').forEach(s => secIO.observe(s));

/* ================= PARALLAX (scroll + mouse) ================= */
const pxEls = $$('.px');
let mx = 0, my = 0, ticking = false;
function frame() {
  ticking = false;
  const vh = innerHeight, doc = document.documentElement;
  $('#progress').style.transform = `scaleX(${scrollY / Math.max(1, doc.scrollHeight - vh)})`;
  if (reduce) return;
  for (const el of pxEls) {
    const host = el.closest('section') || el;
    const r = host.getBoundingClientRect();
    if (r.bottom < -200 || r.top > vh + 200) continue;
    const d = parseFloat(el.dataset.depth || 0), m = parseFloat(el.dataset.mouse || 0);
    const off = (r.top + r.height / 2 - vh / 2);
    el.style.translate = `${(mx * m).toFixed(1)}px ${(off * d + my * m).toFixed(1)}px`;
  }
}
const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
addEventListener('scroll', req, { passive: true }); addEventListener('resize', req);
addEventListener('pointermove', e => { if (e.pointerType !== 'mouse') return; mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; req(); }, { passive: true });
frame();

/* ================= M1 · FLUJO 2 → 6 ================= */
(() => {
  const stage = $('#flowStage'), btn = $('#flowBtn'), cnt = $('#flowCount'), box = $('#flowTiles');
  const kinds = [['main', 'Principal'], ['diag', 'Diagonal'], ['detail', 'Detalle'], ['acc', 'Accesorios'], ['sceneA', 'Realista A'], ['sceneB', 'Realista B']];
  box.innerHTML = kinds.map(([k, l], i) => tileHTML(k, l).replace('class="tileimg"', `class="tileimg" style="--i:${i};--fx:${(1 - i % 3) * 130}px;--fy:${(i < 3 ? 70 : -70)}px;--fr:${(i % 2 ? 1 : -1) * 30}deg"`)).join('');
  let busy = false;
  btn.addEventListener('click', async () => {
    if (busy) return; busy = true;
    if (stage.classList.contains('done')) { stage.classList.remove('go', 'done'); cnt.textContent = ''; btn.textContent = 'Enviar al agente →'; await wait(500); busy = false; return; }
    stage.classList.add('go'); cnt.textContent = 'El agente lee tus fotos…';
    await wait(1200); stage.classList.add('done');
    for (let n = 1; n <= 6; n++) { cnt.textContent = `${n} ${n === 1 ? 'imagen' : 'imágenes'}`; await wait(110); }
    cnt.innerHTML = '6 imágenes · <span class="muted">cada una desde una foto real</span>';
    btn.textContent = '↻ Repetir'; busy = false;
  });
})();

/* ================= M2 · ¿SIRVE LA FOTO? ================= */
(() => {
  const deck = $('#deck'), fb = $('#sortFb'), q = $('#sortQ'), sc = $('#sortScore');
  const PH = [
    { lbl: 'Frontal, nítida', pic: P(6, 18, 88, ILL.bike()), ok: 1, why: 'Completa, nítida y con fondo simple: perfecta para la portada y para /medidas.' },
    { lbl: 'Diagonal, nítida', pic: P(6, 16, 88, ILL.diag()), ok: 1, why: 'Otro ángulo real = otra vista posible. Con esta foto puedes pedir /diagonal.' },
    { lbl: 'De internet, limpia', web: 1, pic: P(6, 18, 88, ILL.diag()) + '<span class="badge" style="right:8px;top:8px;background:#241433;color:#fff">web</span>', ok: 1, why: 'Las fotos de internet también sirven si muestran el producto limpio, sin textos encima.' },
    { lbl: 'De internet, con publicidad', web: 1, pic: P(6, 20, 88, ILL.bike()) + '<span class="badge" style="left:8px;top:10px;background:#E3342F;color:#fff;font-size:18px;transform:rotate(-8deg)">50% OFF</span><span class="badge" style="right:8px;bottom:8px;background:#111;color:#FFC93C">ENVÍO GRATIS</span>', ok: 0, why: 'Los textos y sellos tapan el producto: el agente tendría que inventar lo que hay debajo. Busca la versión limpia.' },
    { lbl: 'Muy lejos y borrosa', pic: P(36, 46, 28, ILL.bike(), 'filter:blur(2.5px)'), ok: 0, why: 'El producto es diminuto y borroso: el agente no puede leer formas ni colores, y los inventa.' },
    { lbl: 'En uso, con una persona', pic: TILE.sceneA(), ok: 1, why: 'Sirve, pero solo para /realista. Para las tomas de estudio usa fotos donde el producto esté solo.' }
  ];
  let idx = 0, right = 0, busy = false;
  function build() {
    idx = 0; right = 0;
    deck.innerHTML = PH.slice().reverse().map(p => `<div class="photo"><div class="pic${p.web ? ' web' : ''}">${p.pic}</div><div class="cap">${p.lbl}</div><div class="stamp"></div></div>`).join('');
    sc.innerHTML = PH.map(() => '<i></i>').join(''); fb.className = 'feedback'; fb.innerHTML = '';
    q.textContent = `Foto 1 de ${PH.length}`; $$('.sort-btns .btn').forEach(b => b.disabled = false);
  }
  async function answer(a) {
    if (busy || idx >= PH.length) return; busy = true;
    const p = PH[idx], card = deck.lastElementChild, st = $('.stamp', card), good = (a === p.ok);
    st.className = 'stamp ' + (p.ok ? 'ok' : 'no'); st.textContent = p.ok ? 'SÍ' : 'NO'; requestAnimationFrame(() => st.classList.add('show'));
    sc.children[idx].className = good ? 'g' : 'b'; if (good) right++;
    fb.className = 'feedback show ' + (good ? 'good' : 'bad');
    fb.innerHTML = `<span class="t">${good ? '¡Correcto!' : 'Ojo…'} ${p.ok ? 'Esta foto sirve.' : 'Esta foto no sirve.'}</span>${p.why}`;
    await wait(1500);
    card.classList.add(p.ok ? 'out-r' : 'out-l'); await wait(650); card.remove(); idx++;
    if (idx < PH.length) q.textContent = `Foto ${idx + 1} de ${PH.length}`;
    else {
      q.textContent = `Acertaste ${right} de ${PH.length}`;
      fb.className = 'feedback show good';
      fb.innerHTML = `<span class="t">${right >= 5 ? '¡Muy bien!' : 'Repásalo una vez más'}</span>Regla de oro: fotos reales, nítidas, sin textos encima. <button class="btn sm v" id="sortAgain" style="margin-top:12px">↻ Repetir</button>`;
      $('#sortAgain').onclick = build; $$('.sort-btns .btn').forEach(b => b.disabled = true);
    }
    busy = false;
  }
  $$('.sort-btns .btn').forEach(b => b.addEventListener('click', () => answer(+b.dataset.ans)));
  build();
})();

/* ================= M3 · CONSTRUCTOR DE PETICIÓN ================= */
(() => {
  const ANG = ['frontal', 'diagonal', 'lateral', 'de atrás', 'de internet', 'caja / empaque', 'accesorios', 'en uso (con persona)'];
  const CMDS = ['/set', '/principal', '/frontal', '/diagonal', '/vista', '/detalle', '/accesorios', '/realista', '/medidas', '/ayuda'];
  const st = { photos: ['frontal', 'diagonal'], cmds: ['/principal', '/diagonal', '/detalle'] };
  const rows = $('#photoRows'), pick = $('#cmdPick'), out = $('#reqOut'), warns = $('#warns');
  $('#detNote').value = 'manillar con cara de oso';
  let prevLines = [];
  function renderRows() {
    rows.innerHTML = st.photos.map((a, i) => `<div class="row"><span class="n">Foto ${i + 1}</span><select class="inp" data-i="${i}">${ANG.map(o => `<option${o === a ? ' selected' : ''}>${o}</option>`).join('')}</select><button class="x" data-del="${i}" aria-label="Quitar foto">✕</button></div>`).join('');
  }
  function renderPick() {
    pick.innerHTML = CMDS.map(c => `<button type="button" class="${st.cmds.includes(c) ? 'on' : ''}" data-c="${c}">${c}</button>`).join('');
    $('#exDetalle').classList.toggle('show', st.cmds.includes('/detalle'));
    $('#exMedidas').classList.toggle('show', st.cmds.includes('/medidas'));
  }
  const esc = s => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  function render() {
    const name = $('#pName').value.trim(), det = $('#detNote').value.trim(), col = $('#colores').value.trim();
    const w = $('#mW').value.trim(), h = $('#mH').value.trim(), d = $('#mD').value.trim();
    const L = [];
    if (name) L.push(['', esc(name)]);
    st.photos.forEach((a, i) => L.push(['f', `<span class="f">Foto ${i + 1}:</span> ${esc(a)}`]));
    if (col) L.push(['k', `<span class="k">Colores:</span> ${esc(col)}`]);
    st.cmds.forEach(c => {
      let t = c;
      if (c === '/detalle' && det) t += ' ' + det;
      if (c === '/medidas') t += ` ${w || '?'}*${h || '?'}${d ? '*' + d : ''} cm`;
      L.push(['c', `<span class="c">${esc(t)}</span>`]);
    });
    out.innerHTML = L.map(([, html]) => `<div class="${prevLines.includes(html) ? '' : 'newl'}">${html}</div>`).join('') || '<span class="muted">Escribe el nombre del producto…</span>';
    prevLines = L.map(x => x[1]);
    // avisos
    const W = [];
    if (!name) W.push('Escribe el nombre del producto.');
    if (!st.photos.length) W.push('Adjunta al menos una foto y di qué muestra.');
    if (!st.cmds.length) W.push(['ok', 'Sin comandos = set completo de 6 imágenes.']);
    if (st.cmds.includes('/set') && st.cmds.length > 1) W.push('/set ya trae las 6 imágenes: no hace falta sumar otros comandos.');
    if (st.cmds.includes('/detalle') && !det) W.push('Di qué parte quieres de cerca, después de /detalle.');
    if (st.cmds.includes('/medidas') && (!w || !h)) W.push('Faltan el ancho y el alto en centímetros.');
    [['/frontal', 'frontal'], ['/diagonal', 'diagonal']].forEach(([c, a]) => { if (st.cmds.includes(c) && !st.photos.includes(a)) W.push(`Pediste ${c}, pero ninguna foto es ${a}: el agente no inventa vistas.`); });
    if (st.cmds.includes('/vista') && st.photos.filter(a => !['de internet', 'caja / empaque', 'accesorios', 'en uso (con persona)'].includes(a)).length < 2) W.push('Para /vista necesitas otra foto del producto completo desde otro ángulo.');
    if (st.cmds.includes('/accesorios') && !st.photos.some(a => a === 'caja / empaque' || a === 'accesorios')) W.push('Para /accesorios adjunta una foto donde se vean los accesorios o el empaque.');
    if (!W.filter(x => typeof x === 'string').length) W.push(['ok', '✓ Lista para enviar. Recuerda: /ajuste se usa después, sobre una imagen seleccionada.']);
    warns.innerHTML = W.map(x => typeof x === 'string' ? `<li>⚠ ${x}</li>` : `<li class="okk">${x[1]}</li>`).join('');
  }
  rows.addEventListener('change', e => { if (e.target.matches('select')) { st.photos[+e.target.dataset.i] = e.target.value; render(); } });
  rows.addEventListener('click', e => { const b = e.target.closest('[data-del]'); if (b) { st.photos.splice(+b.dataset.del, 1); renderRows(); render(); } });
  $('#addPhoto').addEventListener('click', () => { if (st.photos.length >= 6) return; st.photos.push(ANG[Math.min(st.photos.length, ANG.length - 1)]); renderRows(); render(); });
  pick.addEventListener('click', e => { const b = e.target.closest('[data-c]'); if (!b) return; const c = b.dataset.c; const i = st.cmds.indexOf(c); i >= 0 ? st.cmds.splice(i, 1) : st.cmds.push(c); renderPick(); render(); });
  ['#pName', '#detNote', '#colores', '#mW', '#mH', '#mD'].forEach(s => $(s).addEventListener('input', render));
  $('#copyReq').addEventListener('click', async e => {
    const txt = [...out.children].map(d => d.textContent).join('\n');
    try { await navigator.clipboard.writeText(txt); } catch { const t = document.createElement('textarea'); t.value = txt; document.body.append(t); t.select(); document.execCommand('copy'); t.remove(); }
    const b = e.currentTarget, o = b.textContent; b.textContent = '¡Copiado! ✓'; setTimeout(() => b.textContent = o, 1600);
  });
  $('#resetReq').addEventListener('click', () => { st.photos = ['frontal', 'diagonal']; st.cmds = ['/principal', '/diagonal', '/detalle']; $('#pName').value = 'Bici osito de equilibrio morado'; $('#detNote').value = 'manillar con cara de oso'; ['#colores', '#mW', '#mH', '#mD'].forEach(s => $(s).value = ''); prevLines = []; renderRows(); renderPick(); render(); });
  renderRows(); renderPick(); render();
})();

/* ================= M4 · COMANDOS EN ACCIÓN ================= */
(() => {
  const center = inner => `<div style="position:absolute;inset:0;display:grid;place-items:center">${inner}</div>`;
  const D = [
    { c: '/set', s: 'las 6 imágenes', t: 'El set <em>completo</em>', d: 'Principal, otra vista, detalle, accesorios y dos realistas. Siempre 6, nunca más.', how: '/set   (o no escribas ningún comando)', r: 'Si escribes /set, no sumes otros comandos.',
      demo: () => `<div style="position:absolute;inset:0;display:grid;grid-template-columns:repeat(3,27%);gap:3%;justify-content:center;align-content:center">${['main', 'diag', 'detail', 'acc', 'sceneA', 'sceneB'].map((k, i) => `<div class="deal" style="--i:${i}">${tileHTML(k)}</div>`).join('')}</div>` },
    { c: '/principal', s: 'la portada', t: 'La <em>portada</em>', d: 'El producto completo, solo, sobre fondo blanco puro, con luz de estudio. Es la primera foto de la publicación.', how: '/principal', r: 'Usa la mejor foto del producto completo, sin personas.',
      demo: () => center(`<div class="pop" style="position:relative;width:min(64%,290px)">${tileHTML('main')}<div class="shine" style="position:absolute;inset:0;width:30%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.9),transparent);border-radius:20px"></div><span class="badge pop" style="--d:.9s;left:-10px;top:-12px;background:#6D3BF5;color:#fff">PORTADA</span></div>`) },
    { c: '/frontal /diagonal /vista', s: 'otra vista', t: 'Otra <em>vista</em>', d: 'El producto desde otro ángulo, re-fotografiado en el mismo estudio.', how: '/diagonal   (o /frontal, o /vista)', r: 'Solo vistas que estén en tus fotos: sin foto de atrás, no hay vista de atrás.',
      demo: () => center(`<div style="display:flex;gap:6%;align-items:center;width:92%;justify-content:center"><div style="position:relative;width:52%;aspect-ratio:1;perspective:900px"><div class="flipper" style="position:absolute;inset:0;transform-style:preserve-3d"><div class="face">${tileHTML('main', 'Frontal')}</div><div class="face back">${tileHTML('diag', 'Diagonal')}</div></div></div><div class="pop" style="--d:1s;position:relative;width:36%;aspect-ratio:1;border-radius:20px;border:4px dashed #B9A9CF;display:grid;place-items:center;text-align:center;font-weight:700;color:#8A7E96;font-size:14px"><div><div style="font-size:54px;line-height:1">?</div>De atrás</div><span class="pop" style="--d:1.6s;position:absolute;right:-12px;top:-12px;width:42px;height:42px;border-radius:50%;background:#F2453D;color:#fff;display:grid;place-items:center;font-weight:700">✕</span></div></div>`) },
    { c: '/detalle', s: 'una parte de cerca', t: 'Una parte <em>de cerca</em>', d: 'Un acercamiento a una parte que se vea clara y grande en tu foto. Escribe cuál después del comando.', how: '/detalle manillar con cara de oso', r: 'Partes diminutas o borrosas no sirven: el agente tendría que inventarlas.',
      demo: () => center(`<div class="pop" style="position:relative;width:min(68%,300px)"><div class="tileimg"><div class="zoomin" style="position:absolute;inset:0;transform-origin:67.6% 32.3%">${TILE.main()}</div></div><div class="lens" style="position:absolute;left:calc(67.6% - 40px);top:calc(32.3% - 40px);width:80px;height:80px;border-radius:50%;border:7px solid #241433;background:rgba(255,255,255,.15)"></div><span class="badge pop cbadge" style="--d:3s;bottom:12px;background:#6D3BF5;color:#fff;white-space:nowrap">manillar con cara de oso</span></div>`) },
    { c: '/accesorios', s: 'lo que viene con él', t: 'Lo que <em>viene con él</em>', d: 'Todo lo que trae el producto (caja, piezas, manual) ordenado en dos filas sobre fondo blanco.', how: '/accesorios', r: 'Solo lo que aparece en tus fotos. Adjunta una foto de los accesorios o del empaque.',
      demo: () => center(`<div class="tileimg pop" style="position:relative;width:min(80%,340px)"><div style="position:absolute;inset:0;background:#fff"></div><div class="flyin" style="--d:.4s;--fx:60px;--fy:-80px;position:absolute;left:8%;top:22%;width:36%">${ILL.box()}</div><div class="flyin" style="--d:.8s;--fx:-60px;--fy:-90px;position:absolute;left:38%;top:30%;width:54%">${ILL.bike()}</div><div class="flyin" style="--d:1.2s;--fx:-120px;--fy:-40px;position:absolute;left:68%;top:56%;width:22%">${ILL.manual()}</div></div>`) },
    { c: '/realista', s: 'escena real', t: 'Un lugar <em>real</em>', d: 'El producto en uso, en un lugar real y con una persona. Si lo pides otra vez, sale otra escena distinta.', how: '/realista', r: 'Primera vez: escena A. Segunda vez: otro lugar y otra persona.',
      demo: () => center(`<div style="position:relative;width:min(62%,280px);aspect-ratio:1"><div class="pop" style="position:absolute;inset:0;transform:rotate(-4deg)">${tileHTML('sceneA', '1ª vez')}</div><div class="slidein" style="position:absolute;inset:0;left:22%;top:12%">${tileHTML('sceneB', '2ª vez · otra escena')}</div></div>`) },
    { c: '/medidas', s: 'imagen de medidas', t: 'La imagen de <em>medidas</em>', d: 'Una foto de estudio con líneas de medida: ancho abajo, alto a la derecha. Es una imagen extra, aparte de las 6.', how: '/medidas 18*26 cm   (ancho × alto × prof.)', r: 'Siempre en centímetros y en ese orden: ancho, alto, profundidad.',
      demo: () => center(`<div class="pop" style="position:relative;width:min(70%,310px)">${tileHTML('main')}<svg viewBox="0 0 100 100" style="position:absolute;inset:0;width:100%;height:100%;overflow:visible"><g stroke="#6B5E78" stroke-width=".8" fill="none"><g class="gx"><line x1="8" y1="88" x2="92" y2="88" stroke-dasharray="2.5 1.8"/><line x1="8" y1="85" x2="8" y2="91"/><line x1="92" y1="85" x2="92" y2="91"/></g><g class="gy"><line x1="97" y1="14" x2="97" y2="82" stroke-dasharray="2.5 1.8"/><line x1="94" y1="14" x2="100" y2="14"/><line x1="94" y1="82" x2="100" y2="82"/></g></g></svg><span class="badge pop cbadge" style="--d:1.4s;bottom:-6px;color:#241433;font-size:16px">18 cm</span><span class="badge pop" style="--d:2.2s;right:-46px;top:44%;color:#241433;font-size:16px">26 cm</span></div>`) },
    { c: '/ajuste', s: 'corrige un detalle', t: 'Corrige <em>un detalle</em>', d: 'Sobre una imagen seleccionada: cambia solo eso y deja todo lo demás igual. También funciona /ajustar.', how: '/ajuste quita el cargador junto a la rueda', r: 'Verbo + qué + dónde. Máximo 2 por imagen; luego vuelve a pedir la toma con su comando.',
      demo: () => center(`<div style="width:min(70%,310px)"><div class="chip typing" style="display:block;text-align:center;margin-bottom:14px;font-size:13px;white-space:normal">/ajuste quita el cargador junto a la rueda</div><div class="pop" style="position:relative">${`<div class="tileimg">${TILE.main()}<div class="fadeout" style="position:absolute;left:70%;top:64%;width:24%">${ILL.charger()}</div></div>`}<div class="eraser" style="position:absolute;left:68%;top:40%;width:16%;aspect-ratio:3/5;border-radius:10px;background:linear-gradient(#FF9EB5 0 62%,#3B82F6 62%);box-shadow:0 10px 20px rgba(0,0,0,.25)"></div></div></div>`) },
    { c: '/ayuda', s: 'la lista', t: 'La <em>lista</em> de comandos', d: 'Si olvidas un comando, escribe /ayuda: el agente te muestra la lista completa, sin generar imágenes.', how: '/ayuda', r: 'No gasta generaciones: solo responde con texto.',
      demo: () => center(`<div class="card" style="width:min(82%,340px);padding:18px 20px;border-radius:22px"><div class="chip typing" style="margin-bottom:14px">/ayuda</div>${['/set · las 6', '/principal · portada', '/diagonal · otra vista', '/detalle · de cerca', '/accesorios · lo que trae', '/realista · escena real', '/medidas · medidas', '/ajuste · corrige'].map((x, i) => `<div class="rise" style="--d:${.7 + i * .12}s;font-family:DM;font-size:14px;padding:4px 0;border-bottom:1px solid #EEE7F5">${x}</div>`).join('')}</div>`) }
  ];
  const list = $('#cmdList'), demo = $('#demo'), inner = $('#demoIn'), info = $('#cmdInfo');
  list.innerHTML = D.map((x, i) => `<button type="button" data-i="${i}"><span><code>${x.c}</code><br><small>${x.s}</small></span><span>›</span></button>`).join('');
  let cur = 0;
  function show(i) {
    cur = i; const x = D[i];
    $$('button', list).forEach((b, j) => b.classList.toggle('on', j === i));
    demo.classList.remove('play'); inner.innerHTML = x.demo(); void demo.offsetWidth; demo.classList.add('play');
    info.innerHTML = `<span class="chip">${x.c}</span><h3>${x.t}</h3><p class="muted" style="font-size:17px;font-weight:600">${x.d}</p><div class="how">${x.how}</div><div class="rule"><span>📌</span><span>${x.r}</span></div>`;
  }
  list.addEventListener('click', e => { const b = e.target.closest('[data-i]'); if (b) show(+b.dataset.i); });
  $('#replay').addEventListener('click', () => show(cur));
  show(0);
  const o = new IntersectionObserver(es => { if (es[0].isIntersecting) { show(cur); o.disconnect(); } }, { threshold: .4 });
  o.observe(demo);
})();

/* ================= M5 · PLANTILLA ================= */
(() => {
  const tpl = $('#tpl'), fix = $('#fixLine'), hint = $('#tplHint');
  tpl.addEventListener('click', e => {
    const s = e.target.closest('.seg'); if (!s || tpl.dataset.done) return;
    if (s.dataset.ok === '0') {
      s.classList.add('found'); s.textContent = 'aro que toca el piso: blanco ✕ (es morado)';
      $$('.seg[data-ok="1"]', tpl).forEach(x => x.classList.add('okseg'));
      fix.classList.add('show'); hint.textContent = ''; tpl.dataset.done = 1;
    } else {
      s.classList.remove('miss'); void s.offsetWidth; s.classList.add('miss', 'okseg');
      hint.textContent = 'Ese color está bien leído. Sigue buscando: mira lo que toca el piso.';
    }
  });
})();

/* ================= M6 · ENCUENTRA LOS ERRORES ================= */
const ERR = [
  { k: 'extra', pts: [[82, 75]], lbl: 'inventado' },
  { k: 'color', pts: [[57.4, 35.4], [79.8, 35.4]], lbl: 'color cambiado', at: [68.6, 35.4] },
  { k: 'sombra', pts: [[22, 80], [34, 81]], lbl: 'sombra larga', at: [30, 80] }
];
(() => {
  const spot = $('#spot'), cnt = $('#foundCount'), found = new Set();
  spot.addEventListener('click', e => {
    const r = spot.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * 100, y = (e.clientY - r.top) / r.height * 100;
    const rp = document.createElement('span'); rp.className = 'ripple'; rp.style.left = x + '%'; rp.style.top = y + '%'; spot.append(rp); setTimeout(() => rp.remove(), 650);
    let best = null, bd = 1e9;
    ERR.forEach(er => er.pts.forEach(([px, py]) => { const d = Math.hypot(px - x, py - y); if (d < bd) { bd = d; best = er; } }));
    if (!best || bd > 13 || found.has(best.k)) return;
    found.add(best.k);
    const [hx, hy] = best.at || best.pts[0];
    const h = document.createElement('div'); h.className = 'hit'; h.style.left = hx + '%'; h.style.top = hy + '%';
    if (best.k === 'color') { h.style.width = '34%'; h.style.borderRadius = '40px'; h.style.aspectRatio = '2.4'; }
    h.innerHTML = `<span>${best.lbl}</span>`; spot.append(h); requestAnimationFrame(() => h.classList.add('show'));
    const li = $(`#checks li[data-k="${best.k}"]`); li.classList.add('no'); $('i', li).textContent = '✕';
    cnt.textContent = `Encontrados: ${found.size} / 3`;
    if (found.size === 3) cnt.innerHTML = '¡Los 3! <a href="#corrige" style="color:var(--violet)">Ahora corrígelos en el paso 5 →</a>';
  });
})();

/* ================= M7 · ARMA TU /AJUSTE ================= */
(() => {
  const V = ['quita', 'pinta de morado', 'acorta y centra'], Q = ['el cargador', 'las puntas del manillar', 'la sombra'], Dd = ['junto a la rueda', 'en los dos extremos', 'debajo del producto'];
  const G = { v: V, q: Q, d: Dd }, pick = { v: null, q: null, d: null };
  let fixed = new Set(), uses = 0, busy = false;
  const line = $('#fxLine'), msg = $('#fxMsg'), ill = $('#fixIll'), chg = $('#fixChg'), shot = $('#fixShot'), apply = $('#fxApply');
  $$('.opts').forEach(o => { const g = o.dataset.g; o.innerHTML = G[g].map((t, i) => `<button type="button" data-i="${i}">${t}</button>`).join(''); });
  function draw() {
    $$('.opts').forEach(o => $$('button', o).forEach((b, i) => b.classList.toggle('on', pick[o.dataset.g] === i)));
    const part = (g, cls, ph) => pick[g] == null ? `<span class="ph">${ph}</span>` : `<span class="p ${cls}">${G[g][pick[g]]}</span>`;
    line.innerHTML = `/ajuste ${part('v', 'v', 'verbo')} ${part('q', 'q', 'qué')} ${part('d', 'd', 'dónde')}`;
    $$('.uses i').forEach((u, i) => u.classList.toggle('u', i < uses));
    ill.innerHTML = ILL.bike({ grips: fixed.has(1) ? null : '#FFFFFF', longShadow: !fixed.has(2) });
  }
  const say = (t, c = '') => { msg.className = 'msg ' + c; msg.innerHTML = t; };
  $$('.opts').forEach(o => o.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; pick[o.dataset.g] = +b.dataset.i; draw(); }));
  apply.addEventListener('click', async () => {
    if (busy) return;
    if (pick.v == null || pick.q == null || pick.d == null) return say('Falta una pieza: elige verbo, qué y dónde.', 'bad');
    const q = pick.q;
    if (pick.v !== q || pick.d !== q) return say(`Esas piezas no encajan. Para <b>${Q[q]}</b> lo claro es: <code>/ajuste ${V[q]} ${Q[q]} ${Dd[q]}</code>`, 'bad');
    if (fixed.has(q)) return say('Eso ya lo corregiste. Elige otro error.', 'bad');
    if (uses >= 2) return;
    busy = true; uses++; fixed.add(q);
    if (q === 0) { const er = $('#eraser'); er.style.left = '72%'; er.style.top = '52%'; er.classList.remove('go'); void er.offsetWidth; er.classList.add('go'); await wait(500); chg.style.opacity = 0; chg.style.filter = 'blur(6px)'; chg.style.transform = 'scale(.6)'; await wait(900); }
    else { shot.animate([{ filter: 'brightness(1)' }, { filter: 'brightness(1.25)' }, { filter: 'brightness(1)' }], { duration: 700 }); await wait(250); }
    draw(); pick.v = pick.q = pick.d = null; draw();
    if (fixed.size === 3) say('¡Imagen corregida! Solo cambió lo que pediste; lo demás quedó igual.', 'good');
    else if (uses >= 2) {
      say('Ya usaste <b>2 ajustes</b> en esta imagen y aún falla algo. Selecciona tus <b>fotos de referencia</b> y vuelve a pedir la toma con su comando. <button class="btn sm y" id="fxRedo" style="margin-top:10px">Volver a pedir /principal</button>', 'bad');
      apply.disabled = true;
      $('#fxRedo').onclick = async () => { shot.animate([{ transform: 'rotateY(0)' }, { transform: 'rotateY(90deg)' }, { transform: 'rotateY(0)' }], { duration: 800 }); await wait(400); fixed = new Set([0, 1, 2]); chg.style.opacity = 0; draw(); say('Nueva imagen desde tu foto real: sin errores. ✓ Revísala igual antes de descargar.', 'good'); };
    } else say(`Ajuste aplicado: solo cambió <b>${Q[q]}</b>. Lo demás quedó igual. Te queda 1 ajuste en esta imagen.`, 'good');
    busy = false;
  });
  $('#fxReset').addEventListener('click', () => { fixed = new Set(); uses = 0; pick.v = pick.q = pick.d = null; apply.disabled = false; chg.style.cssText = ''; draw(); say('Elige una opción de cada fila.'); });
  draw();
})();

/* ================= M8 · DESCARGA ================= */
(() => {
  const menu = $('#menu'), sub = $('#mSub'), toast = $('#toast'), steps = $$('#dlSteps li'), shot = $('#dlShot');
  const on = n => steps.forEach((s, i) => s.classList.toggle('on', i <= n));
  const showToast = (t, bad) => { toast.textContent = t; toast.style.background = bad ? 'var(--red)' : 'var(--green)'; toast.classList.add('show'); clearTimeout(toast._t); toast._t = setTimeout(() => toast.classList.remove('show'), 2200); };
  $('#dots3').addEventListener('click', e => { e.stopPropagation(); menu.classList.toggle('open'); sub.classList.remove('open'); on(0); });
  $('#mDl').addEventListener('click', e => { e.stopPropagation(); sub.classList.add('open'); on(1); });
  sub.addEventListener('click', async e => {
    e.stopPropagation(); const b = e.target.closest('[data-q]'); if (!b) return;
    const qv = b.dataset.q;
    if (qv !== '2K') return showToast(qv === '1K' ? '1K es muy chica: elige 2K' : '4K pesa de más: elige 2K', true);
    menu.classList.remove('open'); on(2); showToast('✓ Descargada en 2K');
    shot.style.boxShadow = '0 0 0 6px #FFC93C, 0 30px 70px rgba(255,201,60,.35)'; await wait(900); on(3);
  });
  document.addEventListener('click', () => menu.classList.remove('open'));
})();

/* ================= M9 · QUIZ ================= */
(() => {
  const QZ = [
    { q: 'Encontraste en internet una foto del producto con un sello de “50% OFF”. ¿Qué haces?', o: ['La uso igual: el agente borra el sello', 'Busco una versión limpia de esa foto', 'Le pido /ajuste antes de enviarla'], a: 1, e: 'Lo que hay debajo del sello no existe en la foto: el agente tendría que inventarlo.' },
    { q: '¿Qué escribes para una imagen de cerca del manillar?', o: ['/principal manillar', '/detalle manillar con cara de oso', '/ajuste manillar'], a: 1, e: '/detalle + la parte. Solo si esa parte se ve grande y clara en tu foto.' },
    { q: 'La plantilla dice “empuñaduras blancas”, pero en tu foto son moradas. ¿Qué haces?', o: ['Nada, el generador lo corrige solo', 'Agrego “Colores: empuñaduras moradas” y vuelvo a pedir', 'Escribo /set otra vez igual'], a: 1, e: 'La línea “Colores:” reemplaza la lectura del agente. Si el color está mal en la plantilla, saldrá mal en la imagen.' },
    { q: 'Ya hiciste 2 /ajuste en una imagen y todavía falla algo. ¿Qué sigue?', o: ['Un tercer /ajuste', 'Selecciono mis fotos de referencia y vuelvo a pedir la toma con su comando', 'La descargo así'], a: 1, e: 'Máximo 2 ajustes. Después, la toma se pide de nuevo desde tus fotos reales.' },
    { q: 'El producto mide 18 cm de ancho y 26 cm de alto. ¿Cómo pides las medidas?', o: ['/medidas 26*18 cm', '/medidas 18*26 cm', '/medidas alto 26'], a: 1, e: 'Siempre ancho × alto (× profundidad), en centímetros.' },
    { q: 'Una foto muestra el producto en uso con un niño. ¿Para qué sirve?', o: ['Para la portada', 'Solo para /realista', 'Para /medidas'], a: 1, e: 'Las fotos con personas o en un lugar real solo sirven para las imágenes realistas.' }
  ];
  const box = $('#quizBox'); let i = 0, pts = 0;
  const shuffle = a => a.map(v => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(x => x[1]);
  function q() {
    const x = QZ[i], order = shuffle(x.o.map((t, j) => j));
    box.innerHTML = `<div class="qtop"><span>Pregunta ${i + 1} de ${QZ.length}</span><span>${pts} ✓</span></div><div class="qbar"><i style="width:${i / QZ.length * 100}%"></i></div><div class="qq">${x.q}</div><div class="qopts">${order.map(j => `<button type="button" data-j="${j}">${x.o[j]}</button>`).join('')}</div><div class="qexp"></div><div class="qnext"></div>`;
    $('.qopts', box).addEventListener('click', e => {
      const b = e.target.closest('[data-j]'); if (!b) return; const ops = $('.qopts', box); ops.classList.add('locked');
      const ok = +b.dataset.j === x.a; if (ok) pts++;
      b.classList.add(ok ? 'right' : 'wrong'); if (!ok) $(`[data-j="${x.a}"]`, ops).classList.add('right');
      $('.qexp', box).innerHTML = `<b style="color:${ok ? 'var(--green)' : 'var(--red)'}">${ok ? '¡Correcto!' : 'Casi.'}</b> ${x.e}`;
      $('.qnext', box).innerHTML = `<button class="btn v">${i < QZ.length - 1 ? 'Siguiente →' : 'Ver resultado'}</button>`;
      $('.qnext .btn', box).onclick = () => { i++; i < QZ.length ? q() : end(); };
    });
  }
  function end() {
    box.innerHTML = `<div class="qend"><div class="big">${pts}/${QZ.length}</div><p class="qq" style="margin:14px 0 6px">${pts === QZ.length ? '¡Perfecto! Ya puedes operar el agente.' : pts >= 4 ? '¡Muy bien! Repasa lo que fallaste.' : 'Repasa el taller y vuelve a intentarlo.'}</p><p class="muted">Ten a mano la chuleta de comandos.</p><div style="display:flex;gap:10px;justify-content:center;margin-top:20px;flex-wrap:wrap"><button class="btn v" id="qAgain">↻ Repetir quiz</button><a class="btn ghost" href="#chuleta">Ver la chuleta</a></div></div>`;
    $('#qAgain').onclick = () => { i = 0; pts = 0; q(); };
    if (pts >= 5 && !reduce) confetti();
  }
  function confetti() {
    const cols = ['#6D3BF5', '#FFC93C', '#2FB872', '#F2453D', '#9B74FF'];
    for (let n = 0; n < 70; n++) { const c = document.createElement('i'); c.className = 'confetti'; c.style.left = Math.random() * 100 + 'vw'; c.style.background = cols[n % 5]; c.style.animationDuration = 1.8 + Math.random() * 1.6 + 's'; c.style.animationDelay = Math.random() * .5 + 's'; document.body.append(c); setTimeout(() => c.remove(), 4200); }
  }
  q();
})();

/* ================= M10 · CHULETA ================= */
$('#sheet').innerHTML = [
  ['/set', 'o ningún comando', 'Las 6 imágenes: principal, otra vista, detalle, accesorios y 2 realistas.'],
  ['/principal', '', 'La portada: producto completo sobre fondo blanco.'],
  ['/frontal · /diagonal · /vista', '', 'Otra vista del producto. Solo si esa vista está en tus fotos.'],
  ['/detalle <parte>', 'ej. /detalle manillar', 'Una parte de cerca, que se vea grande y clara en la foto.'],
  ['/accesorios', '', 'Lo que trae el producto, ordenado. Adjunta foto de accesorios o empaque.'],
  ['/realista', 'pídelo otra vez = otra escena', 'El producto en uso, en un lugar real, con una persona.'],
  ['/medidas A*H*P cm', 'ej. /medidas 18*26 cm', 'Imagen extra con líneas de medida: ancho × alto × profundidad.'],
  ['/ajuste <verbo qué dónde>', 'también /ajustar · máx. 2', 'Sobre una imagen seleccionada: cambia solo eso.'],
  ['/ayuda', '', 'La lista de comandos, sin generar imágenes.'],
  ['Colores: …', 'línea opcional', 'Corrige un color mal leído en la plantilla. Reemplaza la lectura del agente.'],
  ['¿Rehacer una toma?', 'sin comando', 'Selecciona tus fotos de referencia y vuelve a pedir la toma con su comando.']
].map(([c, n, d]) => `<tr><td><code class="chip">${c.replace(/</g, '&lt;')}</code>${n ? `<div class="note" style="margin-top:6px">${n}</div>` : ''}</td><td>${d}</td></tr>`).join('');

})();
