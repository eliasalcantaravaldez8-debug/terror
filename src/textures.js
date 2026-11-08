// Texturas procedurais geradas em canvas (sem arquivos externos, sem licenças de terceiros).
import * as THREE from 'three';

const cache = new Map();
let rngSeed = 1337;
export function rand() {
  rngSeed = (rngSeed * 16807) % 2147483647;
  return (rngSeed - 1) / 2147483646;
}
export function setSeed(s) { rngSeed = s % 2147483647 || 1; }
export function rr(a, b) { return a + (b - a) * rand(); }
export function pick(arr) { return arr[Math.floor(rand() * arr.length)]; }

function canvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return [c, c.getContext('2d')];
}

function noise(ctx, w, h, amount, alpha = 1) {
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (rand() - 0.5) * amount;
    d[i] = Math.max(0, Math.min(255, d[i] + n));
    d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + n));
    d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + n));
    d[i + 3] = d[i + 3] * alpha;
  }
  ctx.putImageData(img, 0, 0);
}

function speckle(ctx, w, h, count, colors, size = 2) {
  for (let i = 0; i < count; i++) {
    ctx.fillStyle = pick(colors);
    const s = size * (0.5 + rand());
    ctx.fillRect(rand() * w, rand() * h, s, s);
  }
}

function toTex(c, repeat = true, srgb = true) {
  const t = new THREE.CanvasTexture(c);
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; }
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  t.generateMipmaps = true;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  return t;
}

function cached(key, fn) {
  if (!cache.has(key)) cache.set(key, fn());
  return cache.get(key);
}

export function asphaltTex() {
  return cached('asphalt', () => {
    const [c, g] = canvas(256, 256);
    g.fillStyle = '#3a3b3d'; g.fillRect(0, 0, 256, 256);
    speckle(g, 256, 256, 2500, ['#2c2d2f', '#4a4b4e', '#333436', '#555'], 1.5);
    noise(g, 256, 256, 22);
    // remendos e manchas
    for (let i = 0; i < 6; i++) {
      g.fillStyle = `rgba(20,20,22,${rr(0.08, 0.2)})`;
      g.beginPath(); g.ellipse(rand() * 256, rand() * 256, rr(10, 40), rr(6, 25), rand() * 3, 0, 7); g.fill();
    }
    return toTex(c);
  });
}

// Rua com faixas: u = largura (12m), v = comprimento (repete a cada 12m)
export function roadTex() {
  return cached('road', () => {
    const [c, g] = canvas(512, 512);
    g.drawImage(asphaltTex().image, 0, 0, 512, 512);
    g.drawImage(asphaltTex().image, 256, 0, 256, 256);
    const px = 512 / 12; // pixels por metro
    // faixa central dupla amarela tracejada
    g.fillStyle = '#d9b62c';
    for (let y = 0; y < 512; y += px * 6) {
      g.fillRect(256 - px * 0.25, y, px * 0.12, px * 3);
      g.fillRect(256 + px * 0.13, y, px * 0.12, px * 3);
    }
    // linhas brancas delimitando estacionamento
    g.fillStyle = 'rgba(225,225,225,0.85)';
    g.fillRect(px * 2.5, 0, px * 0.12, 512);
    g.fillRect(512 - px * 2.5 - px * 0.12, 0, px * 0.12, 512);
    noise(g, 512, 512, 14);
    return toTex(c);
  });
}

export function crosswalkTex() {
  return cached('cross', () => {
    const [c, g] = canvas(256, 256);
    g.drawImage(asphaltTex().image, 0, 0);
    g.fillStyle = 'rgba(230,230,230,0.9)';
    for (let x = 8; x < 256; x += 32) g.fillRect(x, 0, 18, 256);
    noise(g, 256, 256, 30);
    return toTex(c);
  });
}

export function sidewalkTex() {
  return cached('sidewalk', () => {
    const [c, g] = canvas(256, 256);
    g.fillStyle = '#9c9890'; g.fillRect(0, 0, 256, 256);
    noise(g, 256, 256, 26);
    g.strokeStyle = 'rgba(60,58,55,0.55)'; g.lineWidth = 2;
    for (let i = 0; i <= 256; i += 64) {
      g.beginPath(); g.moveTo(i, 0); g.lineTo(i, 256); g.stroke();
      g.beginPath(); g.moveTo(0, i); g.lineTo(256, i); g.stroke();
    }
    speckle(g, 256, 256, 400, ['#888', '#aaa59c', '#7d7a74'], 2);
    return toTex(c);
  });
}

export function grassTex() {
  return cached('grass', () => {
    const [c, g] = canvas(256, 256);
    g.fillStyle = '#4b6b2e'; g.fillRect(0, 0, 256, 256);
    speckle(g, 256, 256, 6000, ['#3f5e26', '#5a7d36', '#466628', '#6b8a3e', '#3a5220'], 2);
    noise(g, 256, 256, 18);
    return toTex(c);
  });
}

export function dirtTex() {
  return cached('dirt', () => {
    const [c, g] = canvas(256, 256);
    g.fillStyle = '#7a6448'; g.fillRect(0, 0, 256, 256);
    speckle(g, 256, 256, 3000, ['#6b563c', '#8a7354', '#5e4a33'], 2);
    noise(g, 256, 256, 20);
    return toTex(c);
  });
}

export function concreteTex() {
  return cached('concrete', () => {
    const [c, g] = canvas(256, 256);
    g.fillStyle = '#b3aea5'; g.fillRect(0, 0, 256, 256);
    noise(g, 256, 256, 30);
    speckle(g, 256, 256, 600, ['#9d978d', '#c4bfb6'], 3);
    return toTex(c);
  });
}

export function parkingTex() {
  return cached('parking', () => {
    const [c, g] = canvas(256, 256);
    g.drawImage(asphaltTex().image, 0, 0);
    // vagas: tile = 5.5m (u) x 3m (v)
    g.fillStyle = 'rgba(235,235,235,0.9)';
    g.fillRect(0, 0, 256, 6);
    g.fillRect(0, 0, 6, 256 * 0.95);
    return toTex(c);
  });
}

// Fachada de prédio. tile = 8 janelas x 8 andares. Retorna {map, emissive}
const FACADES = {
  brick: { base: '#8a4a36', mortar: '#6d3a2b', frame: '#d8d0c0', glass: '#1d2633' },
  concrete: { base: '#a8a39a', mortar: '#8d877d', frame: '#5b5e62', glass: '#22303e' },
  office: { base: '#4d5a66', mortar: '#3b4650', frame: '#2a3138', glass: '#2c4258' },
  plaster: { base: '#c9b48e', mortar: '#a99572', frame: '#f1ece2', glass: '#1f2a35' },
  apartment: { base: '#b9a495', mortar: '#9a8577', frame: '#e8e0d6', glass: '#1d2733' },
};
export function facadeTex(kind) {
  return cached('facade_' + kind, () => {
    const f = FACADES[kind];
    const S = 512, bay = S / 8;
    const [c, g] = canvas(S, S);
    const [ce, ge] = canvas(S, S);
    g.fillStyle = f.base; g.fillRect(0, 0, S, S);
    ge.fillStyle = '#000'; ge.fillRect(0, 0, S, S);
    if (kind === 'brick') {
      g.fillStyle = f.mortar;
      for (let y = 0; y < S; y += 6) {
        g.fillRect(0, y, S, 1);
        for (let x = ((y / 6) % 2) * 6; x < S; x += 12) g.fillRect(x, y, 1, 6);
      }
    }
    noise(g, S, S, kind === 'office' ? 10 : 24);
    for (let fy = 0; fy < 8; fy++) {
      // faixa entre andares
      g.fillStyle = f.mortar; g.fillRect(0, fy * bay, S, kind === 'office' ? 6 : 3);
      for (let fx = 0; fx < 8; fx++) {
        const x0 = fx * bay, y0 = fy * bay;
        const ww = kind === 'office' ? bay - 6 : bay * 0.55;
        const wh = kind === 'office' ? bay - 10 : bay * 0.6;
        const wx = x0 + (bay - ww) / 2, wy = y0 + (bay - wh) / 2 + 2;
        g.fillStyle = f.frame; g.fillRect(wx - 3, wy - 3, ww + 6, wh + 6);
        const lit = rand() < 0.38;
        const grad = g.createLinearGradient(wx, wy, wx + ww, wy + wh);
        grad.addColorStop(0, f.glass); grad.addColorStop(1, '#46566a');
        g.fillStyle = grad; g.fillRect(wx, wy, ww, wh);
        if (kind !== 'office') { g.fillStyle = f.frame; g.fillRect(wx + ww / 2 - 1, wy, 2, wh); }
        if (lit) {
          const col = pick(['#ffd79a', '#ffe4b8', '#fff1d6', '#cfe3ff', '#ffc77a']);
          ge.fillStyle = col; ge.globalAlpha = rr(0.55, 1);
          ge.fillRect(wx, wy, ww, wh);
          ge.globalAlpha = 1;
          // cortina
          if (rand() < 0.5) { ge.fillStyle = 'rgba(0,0,0,0.45)'; ge.fillRect(wx, wy, ww * rr(0.2, 0.5), wh); }
        }
        // ar-condicionado em alguns
        if (kind !== 'office' && rand() < 0.08) {
          g.fillStyle = '#ccc'; g.fillRect(wx + ww * 0.2, wy + wh + 4, ww * 0.5, 8);
        }
      }
    }
    return { map: toTex(c), emissive: toTex(ce) };
  });
}

// Revestimento de madeira (casas). Branco para colorir pelo material
export function sidingTex() {
  return cached('siding', () => {
    const [c, g] = canvas(256, 256);
    g.fillStyle = '#ededed'; g.fillRect(0, 0, 256, 256);
    for (let y = 0; y < 256; y += 16) {
      const gr = g.createLinearGradient(0, y, 0, y + 16);
      gr.addColorStop(0, '#ffffff'); gr.addColorStop(0.85, '#dedede'); gr.addColorStop(1, '#a9a9a9');
      g.fillStyle = gr; g.fillRect(0, y, 256, 16);
    }
    noise(g, 256, 256, 10);
    return toTex(c);
  });
}

export function roofTex() {
  return cached('roof', () => {
    const [c, g] = canvas(256, 256);
    g.fillStyle = '#5a4038'; g.fillRect(0, 0, 256, 256);
    for (let y = 0; y < 256; y += 16) {
      for (let x = (y / 16) % 2 * 16; x < 256 + 32; x += 32) {
        g.fillStyle = pick(['#4d362f', '#5f443a', '#553c33', '#634a40']);
        g.fillRect(x - 32, y, 31, 15);
      }
    }
    noise(g, 256, 256, 18);
    return toTex(c);
  });
}

export function woodTex() {
  return cached('wood', () => {
    const [c, g] = canvas(128, 128);
    g.fillStyle = '#7b5a3a'; g.fillRect(0, 0, 128, 128);
    for (let i = 0; i < 40; i++) {
      g.strokeStyle = `rgba(50,30,15,${rr(0.1, 0.35)})`;
      g.beginPath(); const y = rand() * 128; g.moveTo(0, y);
      g.bezierCurveTo(40, y + rr(-4, 4), 80, y + rr(-4, 4), 128, y); g.stroke();
    }
    noise(g, 128, 128, 14);
    return toTex(c);
  });
}

export function barkTex() {
  return cached('bark', () => {
    const [c, g] = canvas(64, 128);
    g.fillStyle = '#4a3726'; g.fillRect(0, 0, 64, 128);
    for (let i = 0; i < 30; i++) {
      g.fillStyle = `rgba(25,15,8,${rr(0.2, 0.5)})`;
      g.fillRect(rand() * 64, rand() * 128, rr(1, 3), rr(10, 40));
    }
    noise(g, 64, 128, 20);
    return toTex(c);
  });
}

export function lightPoolTex() {
  return cached('pool', () => {
    const [c, g] = canvas(128, 128);
    const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, 'rgba(255,200,120,0.55)');
    gr.addColorStop(0.4, 'rgba(255,170,90,0.22)');
    gr.addColorStop(1, 'rgba(255,150,70,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
    return toTex(c, false);
  });
}

export function glowTex() {
  return cached('glow', () => {
    const [c, g] = canvas(64, 64);
    const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,255,255,1)');
    gr.addColorStop(0.25, 'rgba(255,230,180,0.6)');
    gr.addColorStop(1, 'rgba(255,200,120,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
    return toTex(c, false);
  });
}

// Placa com texto
export function signTex(text, opts = {}) {
  const key = 'sign_' + text + JSON.stringify(opts);
  return cached(key, () => toTex(signCanvas(text, opts), false));
}
export function signCanvas(text, opts = {}) {
  {
    const w = opts.w || 512, h = opts.h || 128;
    const [c, g] = canvas(w, h);
    g.fillStyle = opts.bg || '#1b3d6e'; g.fillRect(0, 0, w, h);
    if (opts.border !== false) {
      g.strokeStyle = opts.borderColor || '#fff'; g.lineWidth = Math.max(4, h * 0.05);
      g.strokeRect(g.lineWidth, g.lineWidth, w - g.lineWidth * 2, h - g.lineWidth * 2);
    }
    g.fillStyle = opts.fg || '#fff';
    let size = opts.size || h * 0.5;
    g.font = `${opts.weight || 'bold'} ${size}px ${opts.font || 'Arial, Helvetica, sans-serif'}`;
    while (g.measureText(text).width > w * 0.9 && size > 8) {
      size -= 2; g.font = `${opts.weight || 'bold'} ${size}px ${opts.font || 'Arial, Helvetica, sans-serif'}`;
    }
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(text, w / 2, h / 2 + 2);
    return c;
  }
}

export function shopWindowTex() {
  return cached('shopwin', () => {
    const [c, g] = canvas(256, 128);
    const gr = g.createLinearGradient(0, 0, 0, 128);
    gr.addColorStop(0, '#fff3d4'); gr.addColorStop(1, '#e7c58a');
    g.fillStyle = gr; g.fillRect(0, 0, 256, 128);
    // prateleiras e produtos
    for (let y = 30; y < 128; y += 32) {
      g.fillStyle = '#7a5a3a'; g.fillRect(0, y, 256, 4);
      for (let x = 4; x < 252; x += rr(8, 16)) {
        g.fillStyle = pick(['#c0392b', '#2980b9', '#27ae60', '#f39c12', '#8e44ad', '#ecf0f1', '#d35400']);
        const hh = rr(10, 22); g.fillRect(x, y - hh, rr(5, 10), hh);
      }
    }
    g.fillStyle = 'rgba(255,255,255,0.25)';
    g.beginPath(); g.moveTo(20, 0); g.lineTo(70, 0); g.lineTo(30, 128); g.lineTo(-20, 128); g.fill();
    return toTex(c, false);
  });
}

export function tileFloorTex() {
  return cached('tilefloor', () => {
    const [c, g] = canvas(128, 128);
    for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) {
      g.fillStyle = (x + y) % 2 ? '#d8d4cc' : '#b9b3a8';
      g.fillRect(x * 32, y * 32, 32, 32);
    }
    noise(g, 128, 128, 10);
    return toTex(c);
  });
}

// Atlas de placas: 2048x1024, células de 341x64
export function signAtlas() {
  return cached('signAtlas', () => {
    const W = 2048, H = 1024, cw = 341, ch = 64, cols = 6, rows = 16;
    const [c, g] = canvas(W, H);
    g.fillStyle = '#222'; g.fillRect(0, 0, W, H);
    const tex = toTex(c, false);
    const slots = new Map(); let n = 0;
    return {
      texture: tex,
      region(text, opts) {
        const key = text + JSON.stringify(opts);
        if (slots.has(key)) return slots.get(key);
        if (n >= cols * rows) return slots.values().next().value;
        const col = n % cols, row = Math.floor(n / cols); n++;
        const sub = signCanvas(text, { ...opts, w: cw * 2, h: ch * 2 });
        g.drawImage(sub, col * cw + 1, row * ch + 1, cw - 2, ch - 2);
        tex.needsUpdate = true;
        // uv (flipY = true: v=1 no topo do canvas)
        const r = { u0: (col * cw + 2) / W, u1: ((col + 1) * cw - 2) / W, v0: 1 - ((row + 1) * ch - 2) / H, v1: 1 - (row * ch + 2) / H };
        slots.set(key, r);
        return r;
      },
    };
  });
}
