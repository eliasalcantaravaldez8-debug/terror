// Produtos das lojas: embalagens, comidas e bebidas desenhadas em canvas (marcas fictícias, sem arquivos externos).
// Tudo fica num único atlas 2048x2048 (uma textura → poucas chamadas de desenho, bom para GPU integrada).
import * as THREE from 'three';
import { rand, rr, pick } from './textures.js';

// ---------- utilidades de cor ----------
function hex(c) { const n = parseInt(c.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
function shade(c, k) { // k<0 escurece, k>0 clareia
  const [r, g, b] = hex(c); const t = k < 0 ? 0 : 255, a = Math.abs(k);
  return `rgb(${Math.round(r + (t - r) * a)},${Math.round(g + (t - g) * a)},${Math.round(b + (t - b) * a)})`;
}
// sombreamento cilíndrico (lata, garrafa): escuro nas bordas, brilho a 30%
function cylGrad(g, x, w, c, gloss = 0.35) {
  const gr = g.createLinearGradient(x, 0, x + w, 0);
  gr.addColorStop(0, shade(c, -0.55)); gr.addColorStop(0.18, shade(c, -0.1)); gr.addColorStop(0.3, shade(c, gloss));
  gr.addColorStop(0.42, c); gr.addColorStop(0.8, shade(c, -0.3)); gr.addColorStop(1, shade(c, -0.65));
  return gr;
}
// sombreamento de caixa (face frontal levemente iluminada de cima)
function boxGrad(g, y, h, c) {
  const gr = g.createLinearGradient(0, y, 0, y + h);
  gr.addColorStop(0, shade(c, 0.18)); gr.addColorStop(0.5, c); gr.addColorStop(1, shade(c, -0.25));
  return gr;
}
function rrect(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
function text(g, s, x, y, size, col, opts = {}) {
  g.save(); g.fillStyle = col; g.font = `${opts.w || 'bold'} ${size}px ${opts.f || 'Arial, Helvetica, sans-serif'}`;
  g.textAlign = opts.a || 'center'; g.textBaseline = 'middle';
  if (opts.max) { let sz = size; while (g.measureText(s).width > opts.max && sz > 4) { sz -= 1; g.font = `${opts.w || 'bold'} ${sz}px ${opts.f || 'Arial, Helvetica, sans-serif'}`; } }
  if (opts.stroke) { g.strokeStyle = opts.stroke; g.lineWidth = Math.max(1, size * 0.12); g.strokeText(s, x, y); }
  g.fillText(s, x, y); g.restore();
}
function gloss(g, x, y, w, h, a = 0.35) { // reflexo vertical
  const gr = g.createLinearGradient(x, 0, x + w, 0);
  gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(0.5, `rgba(255,255,255,${a})`); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(x, y, w, h);
}

// ---------- marcas fictícias ----------
const SODAS = [
  { n: 'KOLA SUL', c: '#c8141e', l: '#3a160c', t: '#fff' }, { n: 'LIMÃO VALE', c: '#2f9a2c', l: '#cfe98a', t: '#fff' },
  { n: 'LARANJINHA', c: '#f07a10', l: '#f7a21a', t: '#fff' }, { n: 'UVA+', c: '#6a2a8c', l: '#4a1260', t: '#fff' },
  { n: 'GUARANÁ ALTO', c: '#1f7a2e', l: '#7a2a10', t: '#ffd23a' }, { n: 'TÔNICA', c: '#e9e9e2', l: '#dfe8ea', t: '#1a4a8a' },
];
const BEERS = [{ n: 'OURO', c: '#d8a31c', b: '#5a3208' }, { n: 'NORTE', c: '#1a3a7a', b: '#2a4a18' }, { n: 'CORVO', c: '#1a1a1a', b: '#3a2008' }];
const CEREALS = [{ n: 'CROCKS', c: '#e8b21a', t: '#c41a1a' }, { n: 'FLOCOS', c: '#1a6ac4', t: '#fff' }, { n: 'CHOCO BOM', c: '#5a2a10', t: '#ffd23a' }, { n: 'AVEIA+', c: '#d9c9a0', t: '#4a7a2a' }];
const CHIPS = [{ n: 'BATATIX', c: '#e8c21a', t: '#c41a1a' }, { n: 'BATATIX', c: '#2a8a3a', t: '#fff' }, { n: 'MILHITOS', c: '#d8401a', t: '#ffe' }, { n: 'TORCIDA', c: '#1a4ab0', t: '#ffd23a' }];
const MEDS = [{ n: 'ANALGEX', c: '#1a5ac4' }, { n: 'GRIPAL', c: '#c41a3a' }, { n: 'VITA C', c: '#f08a10' }, { n: 'DIGEST', c: '#2a9a5a' }, { n: 'ALERGEX', c: '#7a3ab0' }, { n: 'ZINCO', c: '#5a6a7a' }];

// ---------- desenhos de produtos: (g, x, y, w, h) com a base em y+h ----------
export const DRAW = {
  can(g, x, y, w, h, b = pick(SODAS)) {
    g.fillStyle = cylGrad(g, x, w, b.c); g.fillRect(x, y + h * 0.07, w, h * 0.86);
    // tampa e fundo de alumínio
    for (const [yy, hh] of [[y, h * 0.08], [y + h * 0.92, h * 0.08]]) { g.fillStyle = cylGrad(g, x, w, '#b8bcc2', 0.5); rrect(g, x + w * 0.05, yy, w * 0.9, hh, hh * 0.4); g.fill(); }
    // faixa e onda
    g.fillStyle = b.l; g.beginPath(); g.moveTo(x, y + h * 0.62);
    for (let i = 0; i <= 8; i++) g.lineTo(x + (w * i) / 8, y + h * 0.62 + Math.sin(i * 0.9) * h * 0.04);
    g.lineTo(x + w, y + h * 0.72); g.lineTo(x, y + h * 0.72); g.fill();
    g.save(); g.translate(x + w / 2, y + h * 0.42); g.rotate(-Math.PI / 2); text(g, b.n, 0, 0, w * 0.42, b.t, { max: h * 0.5 }); g.restore();
    gloss(g, x + w * 0.18, y + h * 0.08, w * 0.18, h * 0.84, 0.4);
  },
  pet(g, x, y, w, h, b = pick(SODAS)) {
    const cx = x + w / 2;
    const path = () => { g.beginPath(); g.moveTo(cx - w * 0.14, y + h * 0.06); g.lineTo(cx - w * 0.14, y + h * 0.13);
      g.bezierCurveTo(cx - w * 0.5, y + h * 0.22, cx - w * 0.48, y + h * 0.3, cx - w * 0.48, y + h * 0.36);
      g.lineTo(cx - w * 0.48, y + h * 0.93); g.quadraticCurveTo(cx - w * 0.48, y + h, cx - w * 0.3, y + h);
      g.lineTo(cx + w * 0.3, y + h); g.quadraticCurveTo(cx + w * 0.48, y + h, cx + w * 0.48, y + h * 0.93);
      g.lineTo(cx + w * 0.48, y + h * 0.36); g.bezierCurveTo(cx + w * 0.48, y + h * 0.3, cx + w * 0.5, y + h * 0.22, cx + w * 0.14, y + h * 0.13);
      g.lineTo(cx + w * 0.14, y + h * 0.06); g.closePath(); };
    path(); g.fillStyle = cylGrad(g, x, w, b.l, 0.4); g.fill();
    g.save(); path(); g.clip();
    g.fillStyle = 'rgba(255,255,255,0.18)'; g.fillRect(x, y, w, h * 0.2); // ar no gargalo
    g.fillStyle = cylGrad(g, x, w, b.c, 0.3); g.fillRect(x, y + h * 0.42, w, h * 0.3); // rótulo
    g.fillStyle = 'rgba(255,255,255,0.85)'; g.fillRect(x, y + h * 0.44, w, h * 0.02); g.fillRect(x, y + h * 0.68, w, h * 0.02);
    gloss(g, x + w * 0.16, y + h * 0.15, w * 0.16, h * 0.8, 0.45);
    g.restore();
    text(g, b.n, cx, y + h * 0.57, w * 0.2, b.t, { max: w * 0.85 });
    g.fillStyle = cylGrad(g, cx - w * 0.17, w * 0.34, b.c === '#e9e9e2' ? '#1a4a8a' : b.c, 0.5); rrect(g, cx - w * 0.17, y, w * 0.34, h * 0.07, 2); g.fill(); // tampa
  },
  water(g, x, y, w, h) { DRAW.pet(g, x, y, w, h, { n: 'CRISTAL', c: '#1a6ad0', l: '#cfe6f5', t: '#fff' }); },
  beer(g, x, y, w, h, b = pick(BEERS)) {
    const cx = x + w / 2;
    g.beginPath(); g.moveTo(cx - w * 0.12, y + h * 0.04); g.lineTo(cx - w * 0.12, y + h * 0.3); g.quadraticCurveTo(cx - w * 0.46, y + h * 0.38, cx - w * 0.46, y + h * 0.48);
    g.lineTo(cx - w * 0.46, y + h); g.lineTo(cx + w * 0.46, y + h); g.lineTo(cx + w * 0.46, y + h * 0.48); g.quadraticCurveTo(cx + w * 0.46, y + h * 0.38, cx + w * 0.12, y + h * 0.3);
    g.lineTo(cx + w * 0.12, y + h * 0.04); g.closePath(); g.fillStyle = cylGrad(g, x, w, b.b, 0.45); g.fill();
    g.fillStyle = cylGrad(g, x, w, '#efe2b8', 0.3); g.fillRect(cx - w * 0.44, y + h * 0.58, w * 0.88, h * 0.26);
    g.fillStyle = b.c; g.fillRect(cx - w * 0.44, y + h * 0.6, w * 0.88, h * 0.06);
    text(g, b.n, cx, y + h * 0.75, w * 0.26, b.c, { max: w * 0.8 });
    g.fillStyle = cylGrad(g, cx - w * 0.14, w * 0.28, '#d8b040', 0.5); g.fillRect(cx - w * 0.14, y, w * 0.28, h * 0.05);
    g.fillStyle = b.c; g.fillRect(cx - w * 0.12, y + h * 0.16, w * 0.24, h * 0.06);
    gloss(g, cx - w * 0.3, y + h * 0.35, w * 0.12, h * 0.6, 0.35);
  },
  milk(g, x, y, w, h) {
    g.fillStyle = boxGrad(g, y, h, '#f4f4f0'); g.fillRect(x, y + h * 0.14, w, h * 0.86);
    g.fillStyle = '#d8d8d2'; g.beginPath(); g.moveTo(x, y + h * 0.14); g.lineTo(x + w * 0.5, y + h * 0.03); g.lineTo(x + w, y + h * 0.14); g.fill();
    g.fillStyle = '#1a5ab0'; g.fillRect(x, y + h * 0.55, w, h * 0.3);
    g.fillStyle = '#fff'; g.beginPath(); g.ellipse(x + w * 0.5, y + h * 0.55, w * 0.5, h * 0.06, 0, 0, Math.PI); g.fill();
    text(g, 'LEITE', x + w / 2, y + h * 0.36, w * 0.3, '#1a5ab0', { max: w * 0.9 }); text(g, 'SERRA', x + w / 2, y + h * 0.72, w * 0.22, '#fff', { max: w * 0.9 });
    g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(x + w - 2, y + h * 0.14, 2, h * 0.86);
  },
  juice(g, x, y, w, h) {
    const c = pick(['#f08a10', '#c41a3a', '#e8c21a', '#6a2a8c']);
    g.fillStyle = boxGrad(g, y, h, c); g.fillRect(x, y + h * 0.1, w, h * 0.9);
    g.fillStyle = shade(c, -0.3); g.fillRect(x, y + h * 0.06, w, h * 0.06);
    g.fillStyle = '#fff'; g.beginPath(); g.arc(x + w / 2, y + h * 0.5, w * 0.28, 0, 7); g.fill();
    g.fillStyle = c; g.beginPath(); g.arc(x + w / 2, y + h * 0.5, w * 0.22, 0, 7); g.fill();
    text(g, 'SUCO', x + w / 2, y + h * 0.82, w * 0.24, '#fff', { max: w * 0.9 });
  },
  cereal(g, x, y, w, h, b = pick(CEREALS)) {
    g.fillStyle = boxGrad(g, y, h, b.c); g.fillRect(x, y, w, h);
    g.fillStyle = 'rgba(255,255,255,0.18)'; g.fillRect(x, y, w, h * 0.05);
    text(g, b.n, x + w / 2, y + h * 0.18, w * 0.24, b.t, { max: w * 0.9, stroke: 'rgba(0,0,0,0.35)' });
    // tigela com flocos
    g.fillStyle = '#f2f2f2'; g.beginPath(); g.ellipse(x + w / 2, y + h * 0.68, w * 0.38, h * 0.08, 0, 0, 7); g.fill();
    g.fillStyle = '#fff'; g.beginPath(); g.ellipse(x + w / 2, y + h * 0.68, w * 0.38, h * 0.16, 0, 0, Math.PI); g.fill();
    for (let i = 0; i < 9; i++) { g.fillStyle = pick(['#e8a01a', '#d88a10', '#f2c040', '#b86a10']); g.beginPath(); g.ellipse(x + w * (0.22 + rand() * 0.56), y + h * (0.6 + rand() * 0.08), w * 0.06, h * 0.025, rand() * 3, 0, 7); g.fill(); }
    g.fillStyle = 'rgba(0,0,0,0.3)'; g.fillRect(x + w - Math.max(2, w * 0.06), y, Math.max(2, w * 0.06), h);
  },
  chips(g, x, y, w, h, b = pick(CHIPS)) {
    g.fillStyle = cylGrad(g, x, w, b.c, 0.45); g.beginPath(); g.moveTo(x + w * 0.04, y + h * 0.08); g.quadraticCurveTo(x - w * 0.04, y + h * 0.5, x + w * 0.02, y + h * 0.95);
    g.lineTo(x + w * 0.98, y + h * 0.95); g.quadraticCurveTo(x + w * 1.04, y + h * 0.5, x + w * 0.96, y + h * 0.08); g.closePath(); g.fill();
    g.fillStyle = shade(b.c, -0.25); for (const yy of [y + h * 0.04, y + h * 0.92]) for (let i = 0; i < 8; i++) g.fillRect(x + (w * i) / 8 + 1, yy, w / 8 - 2, h * 0.05);
    text(g, b.n, x + w / 2, y + h * 0.3, w * 0.2, b.t, { max: w * 0.85, stroke: 'rgba(0,0,0,0.4)' });
    g.fillStyle = '#f2c84a'; for (let i = 0; i < 3; i++) { g.beginPath(); g.ellipse(x + w * (0.32 + i * 0.18), y + h * (0.62 + (i % 2) * 0.06), w * 0.14, h * 0.09, i, 0, 7); g.fill(); g.strokeStyle = '#c8962a'; g.lineWidth = 1; g.stroke(); }
    gloss(g, x + w * 0.15, y + h * 0.1, w * 0.18, h * 0.8, 0.35);
  },
  rice(g, x, y, w, h) {
    g.fillStyle = boxGrad(g, y, h, '#f4efe2'); rrect(g, x, y, w, h, w * 0.08); g.fill();
    g.fillStyle = 'rgba(200,190,170,0.7)'; for (let i = 0; i < 40; i++) g.fillRect(x + rand() * w, y + h * 0.6 + rand() * h * 0.35, 2, 1);
    g.fillStyle = '#c41a1a'; g.fillRect(x, y + h * 0.18, w, h * 0.28);
    text(g, pick(['ARROZ', 'FEIJÃO', 'AÇÚCAR']), x + w / 2, y + h * 0.32, w * 0.24, '#fff', { max: w * 0.9 });
    text(g, '5kg', x + w / 2, y + h * 0.55, w * 0.16, '#5a3a1a');
  },
  coffee(g, x, y, w, h) {
    const c = pick(['#3a1a0a', '#7a1010', '#1a1a1a']);
    g.fillStyle = boxGrad(g, y, h, c); g.fillRect(x, y, w, h);
    g.fillStyle = '#d8a040'; g.fillRect(x, y + h * 0.62, w, h * 0.05);
    text(g, 'CAFÉ', x + w / 2, y + h * 0.3, w * 0.28, '#f2d08a', { max: w * 0.9 }); text(g, 'SOMBRA', x + w / 2, y + h * 0.48, w * 0.15, '#fff', { max: w * 0.9 });
    g.fillStyle = '#6a3a1a'; g.beginPath(); g.ellipse(x + w / 2, y + h * 0.82, w * 0.16, h * 0.08, 0.5, 0, 7); g.fill();
    g.strokeStyle = '#2a1206'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(x + w * 0.42, y + h * 0.76); g.quadraticCurveTo(x + w * 0.5, y + h * 0.82, x + w * 0.58, y + h * 0.88); g.stroke();
  },
  jar(g, x, y, w, h) { // lata de conserva
    const c = pick(['#c41a1a', '#2a8a3a', '#e8c21a', '#1a5ab0']);
    g.fillStyle = cylGrad(g, x, w, '#c8ccd2', 0.5); g.fillRect(x, y, w, h);
    g.fillStyle = cylGrad(g, x, w, c, 0.3); g.fillRect(x, y + h * 0.15, w, h * 0.7);
    g.fillStyle = '#fff'; g.beginPath(); g.ellipse(x + w / 2, y + h * 0.5, w * 0.3, h * 0.18, 0, 0, 7); g.fill();
    text(g, pick(['MILHO', 'ERVILHA', 'MOLHO', 'ATUM']), x + w / 2, y + h * 0.5, w * 0.17, c, { max: w * 0.55 });
  },
  choco(g, x, y, w, h) { // barras empilhadas
    const n = 4; for (let i = 0; i < n; i++) { const yy = y + h - (i + 1) * (h / n); const c = pick(['#5a2a10', '#8a1a1a', '#1a3a8a', '#e8e0d0']);
      g.fillStyle = boxGrad(g, yy, h / n, c); g.fillRect(x, yy + 1, w, h / n - 1); text(g, 'CHOCO', x + w / 2, yy + h / n / 2, h / n * 0.5, c === '#e8e0d0' ? '#5a2a10' : '#ffd23a', { max: w * 0.8 }); }
  },
  cleaner(g, x, y, w, h) {
    const c = pick(['#1a8ad0', '#f2d21a', '#2ab05a', '#e04a8a']); const cx = x + w / 2;
    g.fillStyle = cylGrad(g, x, w, c, 0.4); rrect(g, x, y + h * 0.18, w, h * 0.82, w * 0.2); g.fill();
    g.fillStyle = shade(c, -0.2); g.fillRect(cx - w * 0.15, y + h * 0.05, w * 0.3, h * 0.15);
    g.fillStyle = '#fff'; g.fillRect(cx - w * 0.2, y, w * 0.4, h * 0.07);
    g.fillStyle = 'rgba(255,255,255,0.9)'; rrect(g, x + w * 0.12, y + h * 0.42, w * 0.76, h * 0.3, 3); g.fill();
    text(g, pick(['LIMPA', 'BRILHO', 'LAVA']), cx, y + h * 0.57, w * 0.2, c, { max: w * 0.7 });
  },
  medbox(g, x, y, w, h, b = pick(MEDS)) {
    g.fillStyle = boxGrad(g, y, h, '#f8f8f6'); g.fillRect(x, y, w, h);
    g.fillStyle = b.c; g.fillRect(x, y + h * 0.62, w, h * 0.2); g.fillRect(x, y, w * 0.12, h);
    text(g, b.n, x + w * 0.56, y + h * 0.3, h * 0.2, b.c, { max: w * 0.8 });
    text(g, pick(['500 mg', '20 comp.', '10 cáps.', '1 g']), x + w * 0.56, y + h * 0.72, h * 0.13, '#fff', { max: w * 0.8 });
    g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(x + w - 2, y, 2, h);
  },
  syrup(g, x, y, w, h) {
    const cx = x + w / 2; g.fillStyle = cylGrad(g, x, w, '#7a3a08', 0.5); rrect(g, x, y + h * 0.22, w, h * 0.78, w * 0.15); g.fill();
    g.fillRect(cx - w * 0.2, y + h * 0.1, w * 0.4, h * 0.14);
    g.fillStyle = cylGrad(g, cx - w * 0.25, w * 0.5, '#f2f2f2', 0.3); g.fillRect(cx - w * 0.25, y, w * 0.5, h * 0.12);
    g.fillStyle = '#fff'; g.fillRect(x + w * 0.08, y + h * 0.45, w * 0.84, h * 0.32); g.fillStyle = '#c41a3a'; g.fillRect(x + w * 0.08, y + h * 0.45, w * 0.84, h * 0.08);
    text(g, 'XAROPE', cx, y + h * 0.65, w * 0.17, '#c41a3a', { max: w * 0.8 });
  },
  breadbag(g, x, y, w, h) { // pão de forma
    g.fillStyle = 'rgba(240,235,220,0.95)'; rrect(g, x, y + h * 0.05, w, h * 0.95, w * 0.12); g.fill();
    g.fillStyle = '#c88a3a'; rrect(g, x + w * 0.06, y + h * 0.15, w * 0.88, h * 0.8, w * 0.1); g.fill();
    g.fillStyle = '#f0dca8'; rrect(g, x + w * 0.14, y + h * 0.28, w * 0.72, h * 0.6, w * 0.06); g.fill();
    g.fillStyle = '#1a6ac4'; g.fillRect(x, y + h * 0.42, w, h * 0.22); text(g, 'PÃO', x + w / 2, y + h * 0.53, h * 0.14, '#fff', { max: w * 0.9 });
    g.fillStyle = '#e8c21a'; g.fillRect(x + w * 0.4, y, w * 0.2, h * 0.08);
  },
  roll(g, x, y, w, h) { // pão francês
    const gr = g.createRadialGradient(x + w * 0.45, y + h * 0.35, 1, x + w / 2, y + h / 2, w * 0.6);
    gr.addColorStop(0, '#f0c070'); gr.addColorStop(0.6, '#c8822a'); gr.addColorStop(1, '#8a4a12');
    g.fillStyle = gr; g.beginPath(); g.ellipse(x + w / 2, y + h * 0.55, w / 2, h * 0.45, 0, 0, 7); g.fill();
    g.strokeStyle = '#f5dca0'; g.lineWidth = Math.max(1.5, h * 0.12); g.beginPath(); g.moveTo(x + w * 0.28, y + h * 0.45); g.quadraticCurveTo(x + w * 0.5, y + h * 0.28, x + w * 0.72, y + h * 0.45); g.stroke();
  },
  croissant(g, x, y, w, h) {
    for (let i = -2; i <= 2; i++) { const gr = g.createRadialGradient(x + w / 2 + i * w * 0.16, y + h * 0.45, 1, x + w / 2 + i * w * 0.16, y + h * 0.55, w * 0.25);
      gr.addColorStop(0, '#f2c062'); gr.addColorStop(1, '#a8601a'); g.fillStyle = gr;
      g.beginPath(); g.ellipse(x + w / 2 + i * w * 0.16, y + h * (0.55 + Math.abs(i) * 0.08), w * (0.16 - Math.abs(i) * 0.02), h * (0.38 - Math.abs(i) * 0.08), i * 0.4, 0, 7); g.fill(); }
  },
  donut(g, x, y, w, h) {
    const cx = x + w / 2, cy = y + h * 0.55;
    g.fillStyle = '#c8822a'; g.beginPath(); g.ellipse(cx, cy, w / 2, h * 0.42, 0, 0, 7); g.fill();
    const ic = pick(['#f28ab0', '#5a2a10', '#f2f2f2', '#f2d21a']);
    g.fillStyle = ic; g.beginPath(); g.ellipse(cx, cy - h * 0.04, w * 0.44, h * 0.32, 0, 0, 7); g.fill();
    g.fillStyle = '#d8a060'; g.beginPath(); g.ellipse(cx, cy - h * 0.04, w * 0.12, h * 0.09, 0, 0, 7); g.fill();
    for (let i = 0; i < 10; i++) { g.fillStyle = pick(['#fff', '#2ab05a', '#1a8ad0', '#f2d21a', '#c41a1a']); const a = rand() * 7, r = rr(0.2, 0.38); g.fillRect(cx + Math.cos(a) * w * r, cy - h * 0.04 + Math.sin(a) * h * r * 0.7, 2, 1.2); }
    gloss(g, cx - w * 0.3, cy - h * 0.3, w * 0.2, h * 0.2, 0.25);
  },
  cake(g, x, y, w, h) {
    const c = pick(['#5a2a10', '#f2e2c0', '#f28ab0']);
    g.fillStyle = '#f8f0e0'; g.beginPath(); g.ellipse(x + w / 2, y + h * 0.95, w * 0.52, h * 0.06, 0, 0, 7); g.fill(); // prato
    g.fillStyle = boxGrad(g, y + h * 0.25, h * 0.68, c); g.fillRect(x + w * 0.04, y + h * 0.28, w * 0.92, h * 0.64);
    g.fillStyle = '#f2f2f2'; g.fillRect(x + w * 0.04, y + h * 0.55, w * 0.92, h * 0.06);
    g.fillStyle = shade(c, 0.25); g.beginPath(); g.ellipse(x + w / 2, y + h * 0.28, w * 0.46, h * 0.08, 0, 0, 7); g.fill();
    g.fillStyle = '#c41a1a'; for (let i = 0; i < 4; i++) { g.beginPath(); g.arc(x + w * (0.2 + i * 0.2), y + h * 0.24, w * 0.05, 0, 7); g.fill(); }
  },
  burger(g, x, y, w, h) {
    const cx = x + w / 2;
    const bun = (yy, hh, top) => { const gr = g.createLinearGradient(0, yy, 0, yy + hh); gr.addColorStop(0, top ? '#e8a040' : '#d8903a'); gr.addColorStop(1, top ? '#a8601a' : '#b8702a');
      g.fillStyle = gr; g.beginPath(); if (top) g.ellipse(cx, yy + hh, w * 0.48, hh, 0, Math.PI, 0); else rrect(g, cx - w * 0.46, yy, w * 0.92, hh, hh * 0.4); g.fill(); };
    bun(y + h * 0.78, h * 0.18, false);
    g.fillStyle = '#4a2410'; rrect(g, cx - w * 0.49, y + h * 0.6, w * 0.98, h * 0.18, h * 0.08); g.fill(); // carne
    g.fillStyle = '#f2c21a'; g.beginPath(); g.moveTo(cx - w * 0.47, y + h * 0.6); g.lineTo(cx + w * 0.47, y + h * 0.6); g.lineTo(cx + w * 0.3, y + h * 0.7); g.lineTo(cx - w * 0.1, y + h * 0.66); g.fill(); // queijo
    g.fillStyle = '#c41a1a'; g.fillRect(cx - w * 0.42, y + h * 0.53, w * 0.84, h * 0.07); // tomate
    g.fillStyle = '#4ab02a'; g.beginPath(); g.moveTo(cx - w * 0.5, y + h * 0.53);
    for (let i = 0; i <= 10; i++) g.lineTo(cx - w * 0.5 + (w * i) / 10, y + h * (0.5 + (i % 2) * 0.05)); g.lineTo(cx + w * 0.5, y + h * 0.53); g.fill(); // alface
    bun(y + h * 0.06, h * 0.44, true);
    g.fillStyle = '#f8ecc8'; for (let i = 0; i < 9; i++) g.fillRect(cx + rr(-0.32, 0.32) * w, y + h * rr(0.16, 0.4), 2.2, 1.2); // gergelim
    gloss(g, cx - w * 0.3, y + h * 0.12, w * 0.25, h * 0.15, 0.3);
  },
  fries(g, x, y, w, h) {
    const cx = x + w / 2;
    for (let i = 0; i < 9; i++) { g.fillStyle = pick(['#f2c84a', '#e8b030', '#f8d870']); g.save(); g.translate(cx + (i - 4) * w * 0.07, y + h * 0.45); g.rotate((i - 4) * 0.06); g.fillRect(-w * 0.03, -h * 0.42, w * 0.06, h * 0.5); g.restore(); }
    g.fillStyle = '#c41a1a'; g.beginPath(); g.moveTo(cx - w * 0.38, y + h * 0.35); g.lineTo(cx + w * 0.38, y + h * 0.35); g.lineTo(cx + w * 0.3, y + h); g.lineTo(cx - w * 0.3, y + h); g.fill();
    g.fillStyle = '#f2d21a'; g.beginPath(); g.arc(cx, y + h * 0.68, w * 0.12, 0, 7); g.fill();
  },
  plate(g, x, y, w, h) { // prato feito: arroz, feijão, bife, salada
    const cx = x + w / 2, cy = y + h * 0.6;
    g.fillStyle = '#d8d8d8'; g.beginPath(); g.ellipse(cx, cy + h * 0.04, w * 0.5, h * 0.32, 0, 0, 7); g.fill();
    g.fillStyle = '#f8f8f6'; g.beginPath(); g.ellipse(cx, cy, w * 0.5, h * 0.3, 0, 0, 7); g.fill();
    g.fillStyle = '#f2f0e4'; g.beginPath(); g.ellipse(cx - w * 0.2, cy - h * 0.04, w * 0.18, h * 0.13, 0, 0, 7); g.fill();
    g.fillStyle = '#3a1a0a'; g.beginPath(); g.ellipse(cx + w * 0.16, cy - h * 0.08, w * 0.17, h * 0.11, 0, 0, 7); g.fill();
    g.fillStyle = '#8a4a1a'; g.beginPath(); g.ellipse(cx + w * 0.02, cy + h * 0.12, w * 0.2, h * 0.09, 0.2, 0, 7); g.fill();
    g.fillStyle = '#4ab02a'; g.beginPath(); g.ellipse(cx + w * 0.3, cy + h * 0.08, w * 0.1, h * 0.07, 0, 0, 7); g.fill();
    g.fillStyle = '#c41a1a'; g.beginPath(); g.arc(cx + w * 0.33, cy + h * 0.03, w * 0.04, 0, 7); g.fill();
  },
  pizza(g, x, y, w, h) {
    const cx = x + w / 2; g.fillStyle = '#c8822a'; g.beginPath(); g.moveTo(cx, y + h); g.lineTo(x, y + h * 0.15); g.quadraticCurveTo(cx, y - h * 0.05, x + w, y + h * 0.15); g.fill();
    g.fillStyle = '#f2c84a'; g.beginPath(); g.moveTo(cx, y + h * 0.9); g.lineTo(x + w * 0.1, y + h * 0.24); g.quadraticCurveTo(cx, y + h * 0.08, x + w * 0.9, y + h * 0.24); g.fill();
    g.fillStyle = '#b8201a'; for (const [a, b] of [[0.4, 0.35], [0.6, 0.4], [0.5, 0.6], [0.35, 0.25]]) { g.beginPath(); g.arc(x + w * a, y + h * b, w * 0.07, 0, 7); g.fill(); }
  },
  cup(g, x, y, w, h) { // copo de café para viagem
    g.fillStyle = cylGrad(g, x, w, '#f4f0e8', 0.3); g.beginPath(); g.moveTo(x + w * 0.08, y + h * 0.12); g.lineTo(x + w * 0.92, y + h * 0.12); g.lineTo(x + w * 0.8, y + h); g.lineTo(x + w * 0.2, y + h); g.fill();
    g.fillStyle = cylGrad(g, x, w, '#8a5a2a', 0.2); g.beginPath(); g.moveTo(x + w * 0.12, y + h * 0.4); g.lineTo(x + w * 0.88, y + h * 0.4); g.lineTo(x + w * 0.84, y + h * 0.7); g.lineTo(x + w * 0.16, y + h * 0.7); g.fill();
    g.fillStyle = cylGrad(g, x, w, '#2a1a12', 0.4); rrect(g, x, y, w, h * 0.13, 3); g.fill();
    text(g, 'CAFÉ', x + w / 2, y + h * 0.55, w * 0.2, '#fff', { max: w * 0.6 });
  },
  hotdog(g, x, y, w, h) {
    g.fillStyle = '#d8903a'; rrect(g, x, y + h * 0.45, w, h * 0.5, h * 0.25); g.fill();
    g.fillStyle = '#a8401a'; rrect(g, x - w * 0.04, y + h * 0.3, w * 1.08, h * 0.26, h * 0.13); g.fill();
    g.strokeStyle = '#f2c21a'; g.lineWidth = 2; g.beginPath(); for (let i = 0; i <= 12; i++) g.lineTo(x + (w * i) / 12, y + h * (0.38 + (i % 2) * 0.06)); g.stroke();
  },
  // ---------- outras lojas ----------
  tool(g, x, y, w, h) { // ferramenta pendurada no painel
    g.fillStyle = '#f2f2f2'; g.beginPath(); g.arc(x + w / 2, y + h * 0.06, 3, 0, 7); g.fill();
    const k = Math.floor(rand() * 4); const cx = x + w / 2;
    if (k === 0) { g.fillStyle = '#c41a1a'; g.fillRect(cx - w * 0.08, y + h * 0.3, w * 0.16, h * 0.68); g.fillStyle = '#5a5e66'; g.fillRect(cx - w * 0.35, y + h * 0.12, w * 0.7, h * 0.2); } // martelo
    else if (k === 1) { g.fillStyle = '#9aa0a8'; g.fillRect(cx - w * 0.06, y + h * 0.2, w * 0.12, h * 0.6); g.beginPath(); g.arc(cx, y + h * 0.18, w * 0.2, 0, 7); g.fill(); g.fillStyle = '#5a4a3a'; g.beginPath(); g.arc(cx, y + h * 0.12, w * 0.1, 0, 7); g.fill(); g.fillStyle = '#9aa0a8'; g.beginPath(); g.arc(cx, y + h * 0.84, w * 0.16, 0, 7); g.fill(); } // chave
    else if (k === 2) { g.fillStyle = pick(['#e8c21a', '#1a5ab0', '#c41a1a']); rrect(g, cx - w * 0.14, y + h * 0.15, w * 0.28, h * 0.4, 4); g.fill(); g.fillStyle = '#b8bcc2'; g.fillRect(cx - 1.5, y + h * 0.55, 3, h * 0.42); } // chave de fenda
    else { g.fillStyle = '#e8701a'; rrect(g, x + w * 0.05, y + h * 0.2, w * 0.9, h * 0.45, 5); g.fill(); g.fillStyle = '#222'; g.fillRect(x + w * 0.3, y + h * 0.6, w * 0.3, h * 0.38); g.fillStyle = '#9aa0a8'; g.fillRect(x + w * 0.9, y + h * 0.36, w * 0.1, h * 0.06); } // furadeira
  },
  paint(g, x, y, w, h) { // lata de tinta
    const c = pick(['#c41a1a', '#1a5ab0', '#2ab05a', '#f2d21a', '#f2f2f2']);
    g.fillStyle = cylGrad(g, x, w, '#c8ccd2', 0.5); g.fillRect(x, y, w, h);
    g.fillStyle = cylGrad(g, x, w, c, 0.25); g.fillRect(x, y + h * 0.2, w, h * 0.55);
    text(g, 'TINTA', x + w / 2, y + h * 0.48, w * 0.2, c === '#f2f2f2' ? '#333' : '#fff', { max: w * 0.8 });
  },
  gadget(g, x, y, w, h) { // caixa de eletrônico com foto do aparelho
    g.fillStyle = boxGrad(g, y, h, pick(['#1a1a1e', '#f2f2f2', '#1a3a7a'])); g.fillRect(x, y, w, h);
    const k = Math.floor(rand() * 3);
    g.fillStyle = '#111'; if (k === 0) rrect(g, x + w * 0.32, y + h * 0.12, w * 0.36, h * 0.66, 4); else if (k === 1) g.fillRect(x + w * 0.12, y + h * 0.2, w * 0.76, h * 0.46); else { g.beginPath(); g.arc(x + w * 0.35, y + h * 0.45, w * 0.18, 0, 7); g.arc(x + w * 0.65, y + h * 0.45, w * 0.18, 0, 7); g.fill(); }
    g.fill(); const sg = g.createLinearGradient(x, y, x + w, y + h); sg.addColorStop(0, '#2a8ad0'); sg.addColorStop(1, '#8a2ad0'); g.fillStyle = sg;
    if (k === 0) g.fillRect(x + w * 0.35, y + h * 0.16, w * 0.3, h * 0.58); else if (k === 1) g.fillRect(x + w * 0.15, y + h * 0.23, w * 0.7, h * 0.4);
    text(g, pick(['SOMBRA', 'VOLT', 'NEXA']), x + w / 2, y + h * 0.88, h * 0.1, '#ccc', { max: w * 0.9 });
  },
  clothes(g, x, y, w, h) { // pilha de roupas dobradas
    const n = 5; for (let i = 0; i < n; i++) { const yy = y + h - (i + 1) * (h / n); const c = pick(['#1a2a4a', '#c41a1a', '#f2f2f2', '#2a2a2a', '#5a7a3a', '#c8a070', '#3a6ab0']);
      g.fillStyle = boxGrad(g, yy, h / n, c); rrect(g, x, yy + 1, w, h / n - 1, 3); g.fill(); g.fillStyle = 'rgba(0,0,0,0.2)'; g.fillRect(x + w * 0.1, yy + h / n * 0.5, w * 0.8, 1); }
  },
  shampoo(g, x, y, w, h) {
    const c = pick(['#1a8ad0', '#f28ab0', '#2ab05a', '#1a1a1a', '#f2f2f2']);
    g.fillStyle = cylGrad(g, x, w, c, 0.4); rrect(g, x, y + h * 0.15, w, h * 0.85, w * 0.35); g.fill();
    g.fillStyle = cylGrad(g, x + w * 0.25, w * 0.5, '#d8d8d8', 0.4); g.fillRect(x + w * 0.25, y, w * 0.5, h * 0.16);
    text(g, pick(['BARBA', 'GEL', 'TÔNICO']), x + w / 2, y + h * 0.55, w * 0.2, c === '#f2f2f2' ? '#1a1a1a' : '#fff', { max: w * 0.85 });
  },
  antique(g, x, y, w, h) {
    const k = Math.floor(rand() * 4); const cx = x + w / 2;
    if (k === 0) { g.fillStyle = cylGrad(g, x, w, pick(['#2a5a8a', '#8a3a1a', '#3a6a4a']), 0.4); g.beginPath(); g.moveTo(cx - w * 0.15, y); g.lineTo(cx + w * 0.15, y); g.quadraticCurveTo(cx + w * 0.1, y + h * 0.2, cx + w * 0.45, y + h * 0.6); g.quadraticCurveTo(cx + w * 0.45, y + h, cx, y + h); g.quadraticCurveTo(cx - w * 0.45, y + h, cx - w * 0.45, y + h * 0.6); g.quadraticCurveTo(cx - w * 0.1, y + h * 0.2, cx - w * 0.15, y); g.fill(); } // vaso
    else if (k === 1) { g.fillStyle = '#5a3a1a'; rrect(g, x + w * 0.1, y + h * 0.1, w * 0.8, h * 0.9, 6); g.fill(); g.fillStyle = '#f2ead0'; g.beginPath(); g.arc(cx, y + h * 0.4, w * 0.28, 0, 7); g.fill(); g.strokeStyle = '#222'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(cx, y + h * 0.4); g.lineTo(cx, y + h * 0.26); g.moveTo(cx, y + h * 0.4); g.lineTo(cx + w * 0.12, y + h * 0.44); g.stroke(); } // relógio
    else if (k === 2) { g.fillStyle = '#a8801a'; g.fillRect(cx - 2, y + h * 0.4, 4, h * 0.55); g.fillRect(cx - w * 0.2, y + h * 0.92, w * 0.4, h * 0.08); g.fillStyle = '#e8d8a8'; g.beginPath(); g.moveTo(cx - w * 0.2, y); g.lineTo(cx + w * 0.2, y); g.lineTo(cx + w * 0.42, y + h * 0.42); g.lineTo(cx - w * 0.42, y + h * 0.42); g.fill(); } // abajur
    else { g.fillStyle = '#8a6a3a'; g.fillRect(x, y + h * 0.05, w, h * 0.95); g.fillStyle = shade('#3a5a7a', rr(-0.2, 0.2)); g.fillRect(x + w * 0.1, y + h * 0.13, w * 0.8, h * 0.79); g.fillStyle = '#d8b040'; g.beginPath(); g.arc(cx, y + h * 0.4, w * 0.15, 0, 7); g.fill(); } // quadro
  },
};

// ---------- composição de prateleiras ----------
// fileira de produtos sobre a beirada da prateleira, com etiquetas de preço
const STRIPS = {
  mercado1: { items: [['cereal', 52, 92], ['cereal', 52, 92], ['milk', 34, 70], ['juice', 34, 62], ['coffee', 40, 56]] },
  mercado2: { items: [['rice', 50, 82], ['jar', 30, 38], ['jar', 30, 38], ['coffee', 40, 56], ['choco', 46, 40]] },
  mercado3: { items: [['chips', 50, 78], ['chips', 50, 78], ['choco', 46, 40], ['cleaner', 34, 80], ['breadbag', 54, 60]] },
  bebidas1: { fridge: true, items: [['pet', 34, 104], ['pet', 34, 104], ['can', 22, 42], ['water', 32, 100]] },
  bebidas2: { fridge: true, items: [['beer', 26, 92], ['can', 22, 42], ['juice', 34, 62], ['milk', 34, 70], ['water', 32, 100]] },
  farmacia1: { white: true, items: [['medbox', 50, 34], ['medbox', 44, 30], ['syrup', 28, 62], ['medbox', 56, 40]] },
  farmacia2: { white: true, items: [['shampoo', 30, 74], ['syrup', 28, 62], ['medbox', 50, 34], ['cleaner', 30, 70]] },
  padaria1: { warm: true, items: [['roll', 70, 46], ['roll', 70, 46], ['croissant', 96, 60], ['breadbag', 70, 90]] },
  padaria2: { warm: true, items: [['donut', 70, 52], ['cake', 96, 90], ['donut', 70, 52], ['croissant', 96, 60]] },
  lanche: { warm: true, items: [['burger', 110, 92], ['hotdog', 120, 60], ['pizza', 92, 92], ['fries', 72, 100]] },
  ferragens: { peg: true, items: [['tool', 40, 92], ['tool', 40, 92], ['paint', 44, 50]] },
  eletronicos: { items: [['gadget', 64, 70], ['gadget', 56, 90]] },
  roupas: { items: [['clothes', 62, 56], ['clothes', 62, 56]] },
  barbearia: { items: [['shampoo', 30, 74], ['shampoo', 26, 60], ['cleaner', 30, 70]] },
  antiquario: { items: [['antique', 54, 90], ['antique', 44, 70], ['antique', 60, 96]] },
};
function drawStrip(g, X, Y, W, H, def) {
  // fundo da prateleira
  const bg = g.createLinearGradient(0, Y, 0, Y + H);
  if (def.fridge) { bg.addColorStop(0, '#f4f8fb'); bg.addColorStop(1, '#bcd2de'); }
  else if (def.white) { bg.addColorStop(0, '#e8ecee'); bg.addColorStop(1, '#b8c0c4'); }
  else if (def.warm) { bg.addColorStop(0, '#d8c0a0'); bg.addColorStop(1, '#8a6a48'); }
  else if (def.peg) { bg.addColorStop(0, '#c8a070'); bg.addColorStop(1, '#9a7448'); }
  else { bg.addColorStop(0, '#5a5048'); bg.addColorStop(1, '#2a2622'); }
  g.fillStyle = bg; g.fillRect(X, Y, W, H);
  if (def.peg) { g.fillStyle = 'rgba(60,40,20,0.55)'; for (let yy = Y + 6; yy < Y + H; yy += 10) for (let xx = X + 6; xx < X + W; xx += 10) g.fillRect(xx, yy, 2, 2); }
  const lip = def.peg ? 0 : 14; const base = Y + H - lip;
  if (!def.peg) { // beirada da prateleira
    const lg = g.createLinearGradient(0, base, 0, Y + H);
    lg.addColorStop(0, def.fridge ? '#e8eef2' : '#b8bec4'); lg.addColorStop(1, def.fridge ? '#a8b4bc' : '#5a6066');
    g.fillStyle = lg; g.fillRect(X, base, W, lip);
  }
  g.save(); g.beginPath(); g.rect(X, Y, W, H); g.clip();
  let x = X + 4;
  while (x < X + W - 20) {
    const [k, iw, ih] = pick(def.items);
    const n = iw > 80 ? 1 + Math.floor(rand() * 2) : 2 + Math.floor(rand() * 4); // mesma marca em blocos (como no mercado de verdade)
    const s = rr(0.9, 1.08); const w = iw * s, h = Math.min(H - lip - 6, ih * s);
    const brand = k === 'can' || k === 'pet' ? pick(SODAS) : k === 'cereal' ? pick(CEREALS) : k === 'chips' ? pick(CHIPS) : k === 'medbox' ? pick(MEDS) : k === 'beer' ? pick(BEERS) : undefined;
    for (let i = 0; i < n && x + w < X + W - 2; i++) {
      // sombra de contato
      g.fillStyle = 'rgba(0,0,0,0.28)'; g.beginPath(); g.ellipse(x + w / 2, base - 1, w * 0.55, 3, 0, 0, 7); g.fill();
      if (def.peg) DRAW[k](g, x, Y + 6, w, h); else DRAW[k](g, x, base - h, w, h, brand);
      x += w + (def.peg ? 8 : 2);
    }
    if (!def.peg) { // etiqueta de preço
      const pr = `${Math.floor(rr(2, 30))},${pick(['99', '49', '90', '79'])}`;
      g.fillStyle = def.fridge ? '#fff' : '#f2d21a'; g.fillRect(x - 34, base + 2, 30, lip - 4);
      text(g, 'R$' + pr, x - 19, base + lip / 2, 8, '#111');
    }
    x += 6 + rand() * 6;
  }
  g.restore();
  // sombra da prateleira de cima
  const sg = g.createLinearGradient(0, Y, 0, Y + 22); sg.addColorStop(0, 'rgba(0,0,0,0.45)'); sg.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = sg; g.fillRect(X, Y, W, 22);
}

// ---------- quadros de cardápio ----------
const BOARDS = {
  lanche: { title: 'CARDÁPIO', items: [['burger', 'X-Burguer', '18,00'], ['plate', 'Prato feito', '35,00'], ['can', 'Refrigerante', '7,00'], ['cup', 'Café', '8,00']] },
  padaria: { title: 'PADARIA', items: [['roll', 'Pão na chapa', '10,00'], ['donut', 'Sonho', '9,00'], ['cup', 'Café com leite', '8,00'], ['water', 'Água', '5,00']] },
  mercado: { title: 'OFERTAS', items: [['burger', 'Sanduíche', '18,00'], ['plate', 'Marmita', '35,00'], ['water', 'Água', '5,00'], ['can', 'Refrigerante', '7,00']] },
};
function drawBoard(g, X, Y, W, H, def) {
  const bg = g.createLinearGradient(0, Y, 0, Y + H); bg.addColorStop(0, '#20262a'); bg.addColorStop(1, '#14181a');
  g.fillStyle = '#6a4a2a'; g.fillRect(X, Y, W, H); g.fillStyle = bg; g.fillRect(X + 12, Y + 12, W - 24, H - 24);
  for (let i = 0; i < 60; i++) { g.fillStyle = 'rgba(255,255,255,0.03)'; g.fillRect(X + 12 + rand() * (W - 40), Y + 12 + rand() * (H - 40), rr(10, 60), 2); }
  text(g, def.title, X + W / 2, Y + 60, 52, '#f2d060', { f: 'Georgia, serif' });
  g.strokeStyle = 'rgba(242,208,96,0.6)'; g.lineWidth = 2; g.beginPath(); g.moveTo(X + 120, Y + 98); g.lineTo(X + W - 120, Y + 98); g.stroke();
  def.items.forEach(([d, name, price], i) => {
    const col = i % 2, row = Math.floor(i / 2); const cx = X + 40 + col * (W / 2 - 20), cy = Y + 130 + row * 170;
    DRAW[d](g, cx, cy, d === 'can' ? 50 : d === 'water' ? 56 : 120, d === 'can' ? 100 : d === 'water' ? 130 : 110, d === 'can' ? SODAS[0] : undefined);
    text(g, name, cx + 300, cy + 40, 34, '#fff', { max: W / 2 - 200, f: 'Georgia, serif' });
    text(g, 'R$ ' + price, cx + 300, cy + 90, 40, '#f2d060');
  });
}

// ---------- atlas ----------
let ATLAS = null;
export function productAtlas() {
  if (ATLAS) return ATLAS;
  const W = 2048, H = 2048;
  const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
  g.fillStyle = '#888'; g.fillRect(0, 0, W, H);
  const regions = {};
  const reg = (k, x, y, w, h) => { regions[k] = { u0: (x + 1) / W, u1: (x + w - 1) / W, v0: 1 - (y + h - 1) / H, v1: 1 - (y + 1) / H }; };
  // 15 tiras 1024x128 (duas por linha) → 8 linhas (1024 px)
  Object.keys(STRIPS).forEach((k, i) => { const x = (i % 2) * 1024, y = Math.floor(i / 2) * 128; drawStrip(g, x, y, 1024, 128, STRIPS[k]); reg('strip_' + k, x, y, 1024, 128); });
  // 3 quadros 1024x512 a partir de y=1024
  Object.keys(BOARDS).forEach((k, i) => { const x = (i % 2) * 1024, y = 1024 + Math.floor(i / 2) * 512; drawBoard(g, x, y, 1024, 512, BOARDS[k]); reg('board_' + k, x, y, 1024, 512); });
  // rótulos de produtos 3D (128x256 = proporção de lata/garrafa) em x=1024..2048, y=1536..2048
  const labels = [];
  SODAS.slice(0, 5).forEach((b, i) => labels.push(['can' + i, (gg, x, y, w, h) => { // rótulo aberto da lata (vista contínua)
    gg.fillStyle = b.c; gg.fillRect(x, y, w, h); gg.fillStyle = '#c0c4ca'; gg.fillRect(x, y, w, h * 0.07); gg.fillRect(x, y + h * 0.93, w, h * 0.07);
    gg.fillStyle = b.l; gg.fillRect(x, y + h * 0.64, w, h * 0.1);
    gg.save(); gg.translate(x + w / 2, y + h * 0.4); gg.rotate(-Math.PI / 2); text(gg, b.n, 0, 0, w * 0.32, b.t, { max: h * 0.6 }); gg.restore();
  }]));
  labels.push(['pet0', (gg, x, y, w, h) => { gg.fillStyle = 'rgba(80,20,10,1)'; gg.fillRect(x, y, w, h); gg.fillStyle = '#c8141e'; gg.fillRect(x, y + h * 0.4, w, h * 0.3); text(gg, 'KOLA', x + w / 2, y + h * 0.55, w * 0.3, '#fff'); }]);
  labels.push(['water', (gg, x, y, w, h) => { gg.fillStyle = '#bfe0f2'; gg.fillRect(x, y, w, h); gg.fillStyle = '#1a6ad0'; gg.fillRect(x, y + h * 0.4, w, h * 0.3); text(gg, 'CRISTAL', x + w / 2, y + h * 0.55, w * 0.22, '#fff'); }]);
  labels.push(['beer', (gg, x, y, w, h) => { gg.fillStyle = '#5a3208'; gg.fillRect(x, y, w, h); gg.fillStyle = '#efe2b8'; gg.fillRect(x, y + h * 0.5, w, h * 0.3); text(gg, 'OURO', x + w / 2, y + h * 0.65, w * 0.28, '#b8801a'); }]);
  labels.push(['cup', (gg, x, y, w, h) => { gg.fillStyle = '#f4f0e8'; gg.fillRect(x, y, w, h); gg.fillStyle = '#8a5a2a'; gg.fillRect(x, y + h * 0.35, w, h * 0.35); text(gg, 'CAFÉ', x + w / 2, y + h * 0.52, w * 0.26, '#fff'); }]);
  labels.push(['tv', (gg, x, y, w, h) => { // tela de TV ligada (pôr do sol sobre a cidade)
    const s = gg.createLinearGradient(0, y, 0, y + h); s.addColorStop(0, '#1a2a6a'); s.addColorStop(0.55, '#e86a3a'); s.addColorStop(1, '#2a1a2a'); gg.fillStyle = s; gg.fillRect(x, y, w, h);
    gg.fillStyle = '#f2d060'; gg.beginPath(); gg.arc(x + w * 0.6, y + h * 0.55, w * 0.16, 0, 7); gg.fill();
    gg.fillStyle = '#120a18'; for (let i = 0; i < 10; i++) { const bw = rr(8, 16), bh = rr(20, 90); gg.fillRect(x + i * w / 10, y + h - bh, bw, bh); }
  }]);
  labels.push(['cereal', (gg, x, y, w, h) => DRAW.cereal(gg, x, y, w, h, CEREALS[0])]);
  labels.push(['med', (gg, x, y, w, h) => DRAW.medbox(gg, x, y, w, h, MEDS[0])]);
  labels.push(['milk', (gg, x, y, w, h) => DRAW.milk(gg, x, y, w, h)]);
  labels.push(['bread', (gg, x, y, w, h) => { const gr = gg.createLinearGradient(0, y, 0, y + h); gr.addColorStop(0, '#f0c070'); gr.addColorStop(0.5, '#c8822a'); gr.addColorStop(1, '#8a4a12'); gg.fillStyle = gr; gg.fillRect(x, y, w, h); for (let i = 0; i < 300; i++) { gg.fillStyle = `rgba(${rand() < 0.5 ? '255,230,180' : '90,40,10'},0.25)`; gg.fillRect(x + rand() * w, y + rand() * h, 2, 2); } }]);
  labels.push(['bun', (gg, x, y, w, h) => { const gr = gg.createLinearGradient(0, y, 0, y + h); gr.addColorStop(0, '#a8601a'); gr.addColorStop(0.6, '#e8a040'); gr.addColorStop(1, '#f2d090'); gg.fillStyle = gr; gg.fillRect(x, y, w, h); gg.fillStyle = '#f8ecc8'; for (let i = 0; i < 40; i++) gg.fillRect(x + rand() * w, y + rand() * h * 0.6, 3, 1.5); }]);
  labels.forEach(([k, fn], i) => { const x = 1024 + (i % 8) * 128, y = 1536 + Math.floor(i / 8) * 256; fn(g, x, y, 128, 256); reg(k, x, y, 128, 256); });
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  ATLAS = { texture: tex, regions, canvas: c };
  return ATLAS;
}

// ---------- ícones dos itens à venda (cartões 96x96) ----------
const ICONS = {};
export function itemIcon(kind) {
  if (ICONS[kind]) return ICONS[kind];
  const c = document.createElement('canvas'); c.width = c.height = 96; const g = c.getContext('2d');
  const bg = g.createRadialGradient(48, 40, 4, 48, 48, 64); bg.addColorStop(0, '#fff6e6'); bg.addColorStop(1, '#c8b08a');
  g.fillStyle = bg; rrect(g, 0, 0, 96, 96, 12); g.fill();
  g.fillStyle = 'rgba(0,0,0,0.18)'; g.beginPath(); g.ellipse(48, 84, 30, 6, 0, 0, 7); g.fill();
  const F = {
    burger: () => DRAW.burger(g, 14, 22, 68, 62), sanduiche: () => { g.fillStyle = '#f0d8a0'; g.beginPath(); g.moveTo(14, 82); g.lineTo(82, 82); g.lineTo(48, 26); g.fill(); g.fillStyle = '#4ab02a'; g.fillRect(20, 70, 56, 4); g.fillStyle = '#e8a0a0'; g.fillRect(24, 64, 48, 6); g.fillStyle = '#c8822a'; g.fillRect(14, 80, 68, 4); },
    prato: () => DRAW.plate(g, 6, 20, 84, 70), _prato: () => { g.fillStyle = '#f8f8f8'; g.beginPath(); g.ellipse(48, 60, 40, 20, 0, 0, 7); g.fill(); g.strokeStyle = '#ccc'; g.stroke(); g.fillStyle = '#f2f2ea'; g.beginPath(); g.ellipse(36, 56, 14, 8, 0, 0, 7); g.fill(); g.fillStyle = '#3a1a0a'; g.beginPath(); g.ellipse(58, 54, 12, 7, 0, 0, 7); g.fill(); g.fillStyle = '#8a4a1a'; g.beginPath(); g.ellipse(50, 66, 14, 6, 0.2, 0, 7); g.fill(); g.fillStyle = '#4ab02a'; g.beginPath(); g.ellipse(66, 64, 8, 5, 0, 0, 7); g.fill(); g.fillStyle = '#c41a1a'; g.beginPath(); g.arc(70, 60, 3, 0, 7); g.fill(); },
    marmita: () => { g.fillStyle = '#c8ccd2'; rrect(g, 14, 40, 68, 40, 6); g.fill(); g.fillStyle = '#f2f2ea'; g.fillRect(20, 44, 26, 30); g.fillStyle = '#3a1a0a'; g.fillRect(48, 44, 28, 14); g.fillStyle = '#8a4a1a'; g.fillRect(48, 60, 28, 14); g.fillStyle = 'rgba(255,255,255,0.4)'; g.fillRect(14, 40, 68, 4); },
    agua: () => DRAW.water(g, 32, 10, 32, 76), refri: () => DRAW.can(g, 34, 26, 28, 58, SODAS[0]),
    cafe: () => DRAW.cup(g, 28, 22, 40, 62), cafeleite: () => DRAW.cup(g, 28, 22, 40, 62),
    pao: () => { DRAW.roll(g, 14, 44, 44, 28); DRAW.roll(g, 40, 50, 44, 28); g.fillStyle = '#f2e060'; g.fillRect(30, 60, 30, 3); },
    sonho: () => { DRAW.roll(g, 16, 36, 64, 44); g.fillStyle = '#fff'; for (let i = 0; i < 40; i++) g.fillRect(20 + rand() * 56, 38 + rand() * 18, 2, 2); g.fillStyle = '#f2e0a0'; g.beginPath(); g.ellipse(48, 62, 22, 5, 0, 0, 7); g.fill(); },
    remedio: () => { DRAW.medbox(g, 14, 30, 68, 46, MEDS[0]); },
    pistola: () => { g.fillStyle = '#1c1c1e'; g.fillRect(16, 36, 62, 14); g.save(); g.translate(30, 48); g.rotate(0.25); g.fillRect(0, 0, 16, 32); g.restore(); },
    municao: () => { for (let i = 0; i < 5; i++) { g.fillStyle = cylGrad(g, 18 + i * 13, 10, '#c8962a', 0.5); g.fillRect(18 + i * 13, 44, 10, 34); g.fillStyle = cylGrad(g, 18 + i * 13, 10, '#9a6a3a', 0.4); g.beginPath(); g.moveTo(18 + i * 13, 44); g.quadraticCurveTo(23 + i * 13, 26, 28 + i * 13, 44); g.fill(); } },
    escopeta: () => { g.fillStyle = '#1c1c1e'; g.fillRect(8, 40, 64, 8); g.fillStyle = '#5a3a22'; g.fillRect(56, 44, 32, 14); },
  };
  (F[kind] || F.burger)();
  ICONS[kind] = c.toDataURL();
  return ICONS[kind];
}

// ---------- modelos 3D pequenos (item na mão, produtos sobre balcões) ----------
export function prodMaterial() {
  const A = productAtlas();
  if (!A.mat) A.mat = new THREE.MeshLambertMaterial({ map: A.texture, emissiveMap: A.texture, emissive: 0xffffff, emissiveIntensity: 0.12 });
  return A.mat;
}
function regionGeo(geo, key) {
  const r = productAtlas().regions[key]; const uv = geo.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, r.u0 + (r.u1 - r.u0) * Math.min(1, Math.max(0, uv.getX(i))), r.v0 + (r.v1 - r.v0) * Math.min(1, Math.max(0, uv.getY(i))));
  return geo;
}
export function handItem(kind) {
  const g = new THREE.Group(); const pm = prodMaterial();
  const metal = new THREE.MeshLambertMaterial({ color: 0xb8bcc2 });
  if (kind === 'refri') { g.add(new THREE.Mesh(regionGeo(new THREE.CylinderGeometry(0.033, 0.033, 0.12, 14, 1, true), 'can0'), pm)); const t = new THREE.Mesh(new THREE.CircleGeometry(0.031, 14), metal); t.rotation.x = -Math.PI / 2; t.position.y = 0.06; g.add(t); }
  else if (kind === 'agua') { g.add(new THREE.Mesh(regionGeo(new THREE.CylinderGeometry(0.032, 0.035, 0.2, 14, 1, true), 'water'), pm)); const t = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.02, 10), new THREE.MeshLambertMaterial({ color: 0x1a6ad0 })); t.position.y = 0.11; g.add(t); }
  else if (kind === 'cafe' || kind === 'cafeleite') { g.add(new THREE.Mesh(regionGeo(new THREE.CylinderGeometry(0.042, 0.032, 0.13, 14, 1, true), 'cup'), pm)); const t = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.012, 14), new THREE.MeshLambertMaterial({ color: 0x2a1a12 })); t.position.y = 0.068; g.add(t); }
  else if (kind === 'remedio') { g.add(new THREE.Mesh(regionGeo(new THREE.BoxGeometry(0.1, 0.06, 0.03), 'med'), pm)); }
  else if (kind === 'pao' || kind === 'sonho') { const m = new THREE.Mesh(regionGeo(new THREE.SphereGeometry(0.06, 12, 8), 'bread'), pm); m.scale.set(1.3, 0.7, 0.9); g.add(m); }
  else { // lanche / prato / sanduíche / marmita → hambúrguer
    const bun = (y, top) => { const m = new THREE.Mesh(regionGeo(new THREE.SphereGeometry(0.06, 14, 8, 0, Math.PI * 2, top ? 0 : Math.PI / 2, Math.PI / 2), 'bun'), pm); m.scale.set(1, top ? 0.6 : 0.3, 1); m.position.y = y; return m; };
    g.add(bun(0.02, true), bun(-0.015, false));
    const meat = new THREE.Mesh(new THREE.CylinderGeometry(0.062, 0.062, 0.018, 14), new THREE.MeshLambertMaterial({ color: 0x4a2410 })); meat.position.y = 0.005; g.add(meat);
    const ch = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.004, 0.1), new THREE.MeshLambertMaterial({ color: 0xf2c21a })); ch.position.y = 0.016; ch.rotation.y = 0.5; g.add(ch);
    const let_ = new THREE.Mesh(new THREE.CylinderGeometry(0.066, 0.066, 0.006, 10), new THREE.MeshLambertMaterial({ color: 0x4ab02a })); let_.position.y = 0.021; g.add(let_);
  }
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}
export { regionGeo };

// vitrine das lojas de rua (vista de fora): interior iluminado com prateleiras, balcão e reflexo
let WIN = null;
export function shopWindowCanvas() {
  if (WIN) return WIN;
  const c = document.createElement('canvas'); c.width = 512; c.height = 256; const g = c.getContext('2d');
  const bg = g.createLinearGradient(0, 0, 0, 256); bg.addColorStop(0, '#fff4dc'); bg.addColorStop(1, '#d8b888');
  g.fillStyle = bg; g.fillRect(0, 0, 512, 256);
  // luminárias do teto
  for (let i = 0; i < 3; i++) { const gl = g.createRadialGradient(90 + i * 165, 6, 2, 90 + i * 165, 6, 90); gl.addColorStop(0, 'rgba(255,255,240,0.9)'); gl.addColorStop(1, 'rgba(255,255,240,0)'); g.fillStyle = gl; g.fillRect(0, 0, 512, 120); g.fillStyle = '#fffef4'; g.fillRect(50 + i * 165, 2, 80, 5); }
  // prateleiras do fundo
  const keys = ['mercado1', 'bebidas1', 'mercado3', 'padaria1', 'mercado2'];
  for (let r = 0; r < 3; r++) drawStrip(g, 0, 26 + r * 64, 512, 64, STRIPS[keys[(r * 2) % keys.length]]);
  // balcão e cliente (silhuetas)
  const cg = g.createLinearGradient(0, 196, 0, 256); cg.addColorStop(0, '#5a3a22'); cg.addColorStop(1, '#2a1a10');
  g.fillStyle = cg; g.fillRect(20, 200, 220, 56); g.fillStyle = '#9aa0a6'; g.fillRect(16, 196, 228, 6);
  g.fillStyle = '#2a2a2e'; g.fillRect(60, 178, 34, 20);
  g.fillStyle = 'rgba(20,20,26,0.75)'; g.beginPath(); g.arc(380, 150, 13, 0, 7); g.fill(); rrect(g, 362, 164, 36, 92, 10); g.fill();
  // reflexo no vidro
  g.fillStyle = 'rgba(255,255,255,0.22)'; g.beginPath(); g.moveTo(40, 0); g.lineTo(130, 0); g.lineTo(60, 256); g.lineTo(-30, 256); g.fill();
  g.fillStyle = 'rgba(255,255,255,0.12)'; g.beginPath(); g.moveTo(300, 0); g.lineTo(330, 0); g.lineTo(260, 256); g.lineTo(230, 256); g.fill();
  WIN = c; return c;
}
