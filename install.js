/* Instalar el agente: instrucciones para copiar, fondo y checklist */
(() => {
'use strict';
const $ = s => document.querySelector(s);
const INST = [
  { name: 'Variados · flujo del agente', file: 'assets/instrucciones/1-flujo-del-agente.txt', step: 'i1' },
  { name: 'Variados · estudio', file: 'assets/instrucciones/2-estudio.txt', step: 'i2', bg: true },
  { name: 'Variados · realistas', file: 'assets/instrucciones/3-realistas.txt', step: 'i3' }
];
const KEY = 'variados-instalar-v2';
let done = new Set();
try { done = new Set(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify([...done])); } catch {} };
const steps = [...document.querySelectorAll('#isteps li')];
function paint() {
  steps.forEach(li => li.classList.toggle('done', done.has(li.dataset.s)));
  const n = done.size, tot = steps.length;
  $('#ringTxt').textContent = `${n}/${tot}`;
  $('#ringVal').style.strokeDashoffset = 314 - 314 * n / tot;
  $('#instDone').style.display = n === tot ? 'flex' : 'none';
}
const mark = s => { done.add(s); save(); paint(); };
steps.forEach(li => li.querySelector('.ck').addEventListener('click', () => { const s = li.dataset.s; done.has(s) ? done.delete(s) : done.add(s); save(); paint(); }));

async function copy(txt, btn, ok = '¡Copiado! ✓') {
  try { await navigator.clipboard.writeText(txt); }
  catch { const t = document.createElement('textarea'); t.value = txt; t.style.position = 'fixed'; t.style.opacity = 0; document.body.append(t); t.select(); document.execCommand('copy'); t.remove(); }
  const o = btn.textContent; btn.textContent = ok; btn.classList.remove('copied'); void btn.offsetWidth; btn.classList.add('copied');
  setTimeout(() => btn.textContent = o, 1700);
}

const texts = [];
const load = Promise.all(INST.map((x, i) => fetch(x.file, { cache: 'no-cache' }).then(r => { if (!r.ok) throw 0; return r.text(); }).then(t => texts[i] = t.replace(/\s+$/, ''))));
let cur = 0;
async function show(i) {
  cur = i; const x = INST[i];
  document.querySelectorAll('#itabs button').forEach((b, j) => { b.classList.toggle('on', j === i); b.setAttribute('aria-selected', j === i); });
  $('#iName').textContent = x.name;
  $('#bgCard').classList.toggle('show', !!x.bg);
  $('.itext').classList.remove('open'); $('#iExpand').textContent = 'Ver completa ▾';
  try { await load; $('#iText').textContent = texts[i]; $('#iChars').textContent = `${texts[i].length.toLocaleString('es-PE')} caracteres`; }
  catch { $('#iText').textContent = 'No se pudo cargar el texto. Abre la página desde su dirección web (Render) o con un servidor local.'; $('#iChars').textContent = ''; }
}
document.querySelector('#itabs').addEventListener('click', e => { const b = e.target.closest('[data-t]'); if (b) show(+b.dataset.t); });
$('#iExpand').addEventListener('click', () => { const w = $('.itext'); w.classList.toggle('open'); $('#iExpand').textContent = w.classList.contains('open') ? 'Ver menos ▴' : 'Ver completa ▾'; });
$('#copyName').addEventListener('click', e => copy(INST[cur].name, e.currentTarget));
$('#copyInst').addEventListener('click', async e => { try { await load; } catch { return; } copy(texts[cur], e.currentTarget, '¡Instrucción copiada! ✓'); mark(INST[cur].step); });
$('#copyBgName').addEventListener('click', e => copy('FONDO blanco', e.currentTarget));
$('#dlBg').addEventListener('click', () => mark('bg'));
$('#dlAll').addEventListener('click', async () => {
  try { await load; } catch { return; }
  const body = INST.map((x, i) => `===== INSTRUCCIÓN ${i + 1} — ${x.name} =====\n\n${texts[i]}\n`).join('\n') + '\n===== IMAGEN =====\nEn la instrucción 2, sube la imagen "FONDO blanco" (descárgala desde el taller).\n';
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([body], { type: 'text/plain;charset=utf-8' })); a.download = 'instrucciones-agente-variados.txt'; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
});
paint(); show(0);
})();
