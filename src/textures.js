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
  return [c, c.getContext('2d', { willReadFrequently: true })];
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

// ---------- relevo (normal map) gerado a partir da luminância ----------
export function normalOf(tex, strength = 2, key = null) {
  const k = 'n_' + (key || tex.uuid) + strength;
  return cached(k, () => {
    const src = tex.image; const w = src.width, h = src.height;
    const d = src.getContext('2d').getImageData(0, 0, w, h).data;
    const H = new Float32Array(w * h);
    for (let i = 0; i < w * h; i++) H[i] = (d[i * 4] * 0.299 + d[i * 4 + 1] * 0.587 + d[i * 4 + 2] * 0.114) / 255;
    const [c, g] = canvas(w, h);
    const img = g.createImageData(w, h); const o = img.data;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const l = H[y * w + ((x - 1 + w) % w)], r = H[y * w + ((x + 1) % w)];
      const t = H[((y - 1 + h) % h) * w + x], bt = H[((y + 1) % h) * w + x];
      let nx = -(r - l) * strength, ny = (bt - t) * strength, nz = 1;
      const len = Math.hypot(nx, ny, nz); nx /= len; ny /= len; nz /= len;
      const i = (y * w + x) * 4;
      o[i] = (nx * 0.5 + 0.5) * 255; o[i + 1] = (ny * 0.5 + 0.5) * 255; o[i + 2] = (nz * 0.5 + 0.5) * 255; o[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
    const t = toTex(c, true, false);
    t.wrapS = tex.wrapS; t.wrapT = tex.wrapT;
    return t;
  });
}

function crack(g, x, y, len, width = 1, col = 'rgba(15,15,16,0.6)') {
  g.strokeStyle = col; g.lineWidth = width; g.beginPath(); g.moveTo(x, y);
  let a = rand() * Math.PI * 2;
  for (let i = 0; i < len; i++) { a += rr(-0.6, 0.6); x += Math.cos(a) * 6; y += Math.sin(a) * 6; g.lineTo(x, y); }
  g.stroke();
}

export function asphaltTex() {
  return cached('asphalt', () => {
    const S = 512; const [c, g] = canvas(S, S);
    g.fillStyle = '#3b3c3e'; g.fillRect(0, 0, S, S);
    // manchas grandes de desgaste
    for (let i = 0; i < 40; i++) {
      const gr = g.createRadialGradient(0, 0, 0, 0, 0, 1);
      const v = rand() < 0.5 ? '255,255,255' : '0,0,0';
      gr.addColorStop(0, `rgba(${v},${rr(0.03, 0.07)})`); gr.addColorStop(1, `rgba(${v},0)`);
      g.save(); g.translate(rand() * S, rand() * S); g.scale(rr(30, 120), rr(30, 120)); g.fillStyle = gr; g.fillRect(-1, -1, 2, 2); g.restore();
    }
    // agregado (pedrinhas)
    speckle(g, S, S, 14000, ['#2a2b2d', '#4c4d50', '#333436', '#5a5a5c', '#262628', '#6a6a6c'], 1.6);
    noise(g, S, S, 26);
    for (let i = 0; i < 4; i++) crack(g, rand() * S, rand() * S, Math.floor(rr(5, 14)), rr(0.6, 1.2), 'rgba(15,15,16,0.4)');
    // manchas de óleo
    for (let i = 0; i < 5; i++) {
      g.fillStyle = `rgba(10,10,12,${rr(0.06, 0.14)})`;
      g.beginPath(); g.ellipse(rand() * S, rand() * S, rr(8, 30), rr(5, 18), rand() * 3, 0, 7); g.fill();
    }
    return toTex(c);
  });
}

// Rua com faixas: u = largura (12m), v = comprimento (repete a cada 12m)
export function roadTex() {
  return cached('road', () => {
    const S = 1024; const [c, g] = canvas(S, S);
    const a = asphaltTex().image;
    // copia o asfalto com giros diferentes para disfarçar a repetição
    for (const [x, y, r] of [[0, 0, 0], [512, 0, 1], [0, 512, 2], [512, 512, 3]]) {
      g.save(); g.translate(x + 256, y + 256); g.rotate(r * Math.PI / 2); g.drawImage(a, -256, -256); g.restore();
    }
    // remendo largo e suave (um só, parece reparo real)
    g.fillStyle = 'rgba(25,25,27,0.22)'; g.fillRect(rr(350, 600), rr(100, 700), rr(150, 260), rr(120, 260));
    const px = S / 12;
    // trilhas dos pneus mais escuras/polidas e sarjeta suja perto do meio-fio
    for (const cx of [3.6, 5.3, 6.7, 8.4]) {
      const gr = g.createLinearGradient((cx - 0.5) * px, 0, (cx + 0.5) * px, 0);
      gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(0.5, 'rgba(10,10,12,0.18)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = gr; g.fillRect((cx - 0.5) * px, 0, px, S);
    }
    for (const [x0, x1] of [[0, 0.6], [12, 11.4]]) {
      const gr = g.createLinearGradient(x0 * px, 0, x1 * px, 0);
      gr.addColorStop(0, 'rgba(20,18,15,0.55)'); gr.addColorStop(1, 'rgba(20,18,15,0)');
      g.fillStyle = gr; g.fillRect(Math.min(x0, x1) * px, 0, 0.6 * px, S);
    }
    const paint = (col, x, y, w, h) => {
      g.fillStyle = col; g.fillRect(x, y, w, h);
      // tinta gasta
      for (let i = 0; i < w * h / 30; i++) { g.fillStyle = 'rgba(50,50,52,0.6)'; g.fillRect(x + rand() * w, y + rand() * h, rr(1, 3), rr(1, 3)); }
    };
    for (let y = 0; y < S; y += px * 6) {
      paint('#d4b02e', S / 2 - px * 0.24, y, px * 0.12, px * 3);
      paint('#d4b02e', S / 2 + px * 0.12, y, px * 0.12, px * 3);
    }
    paint('rgba(226,226,222,0.92)', px * 2.5, 0, px * 0.12, S);
    paint('rgba(226,226,222,0.92)', S - px * 2.5 - px * 0.12, 0, px * 0.12, S);
    noise(g, S, S, 10);
    return toTex(c);
  });
}

export function crosswalkTex() {
  return cached('cross', () => {
    const [c, g] = canvas(512, 512);
    g.drawImage(asphaltTex().image, 0, 0);
    for (let x = 16; x < 512; x += 64) {
      g.fillStyle = 'rgba(232,232,228,0.92)'; g.fillRect(x, 0, 36, 512);
      for (let i = 0; i < 300; i++) { g.fillStyle = 'rgba(60,60,62,0.55)'; g.fillRect(x + rand() * 36, rand() * 512, rr(1, 4), rr(1, 4)); }
    }
    noise(g, 512, 512, 20);
    return toTex(c);
  });
}

export function sidewalkTex() {
  return cached('sidewalk', () => {
    const S = 512; const [c, g] = canvas(S, S);
    const T = 128; // placa de 1m (tile = 4m? => usar tile 4m no material)
    for (let y = 0; y < S; y += T) for (let x = 0; x < S; x += T) {
      const v = Math.floor(rr(140, 168));
      g.fillStyle = `rgb(${v},${v - 4},${v - 10})`; g.fillRect(x, y, T, T);
      for (let i = 0; i < 6; i++) {
        const gr = g.createRadialGradient(x + rand() * T, y + rand() * T, 0, x + T / 2, y + T / 2, T);
        gr.addColorStop(0, `rgba(0,0,0,${rr(0, 0.08)})`); gr.addColorStop(1, 'rgba(0,0,0,0)');
        g.fillStyle = gr; g.fillRect(x, y, T, T);
      }
    }
    speckle(g, S, S, 9000, ['#8a857c', '#b3ada2', '#7b776f', '#c2bdb2'], 1.5);
    noise(g, S, S, 22);
    // juntas
    g.fillStyle = 'rgba(55,52,48,0.85)';
    for (let i = 0; i <= S; i += T) { g.fillRect(i - 1.5, 0, 3, S); g.fillRect(0, i - 1.5, S, 3); }
    g.fillStyle = 'rgba(255,255,255,0.12)';
    for (let i = 0; i <= S; i += T) { g.fillRect(i + 1.5, 0, 1, S); g.fillRect(0, i + 1.5, S, 1); }
    for (let i = 0; i < 6; i++) crack(g, rand() * S, rand() * S, Math.floor(rr(3, 8)), 1, 'rgba(40,38,35,0.6)');
    // chicletes / manchas
    for (let i = 0; i < 30; i++) { g.fillStyle = `rgba(30,30,30,${rr(0.15, 0.35)})`; g.beginPath(); g.arc(rand() * S, rand() * S, rr(1.5, 4), 0, 7); g.fill(); }
    return toTex(c);
  });
}

export function grassTex() {
  return cached('grass', () => {
    const S = 512; const [c, g] = canvas(S, S);
    g.fillStyle = '#48682c'; g.fillRect(0, 0, S, S);
    for (let i = 0; i < 30; i++) {
      const gr = g.createRadialGradient(0, 0, 0, 0, 0, 1);
      const col = pick(['70,100,40', '60,85,30', '95,110,50', '50,70,28']);
      gr.addColorStop(0, `rgba(${col},0.5)`); gr.addColorStop(1, `rgba(${col},0)`);
      g.save(); g.translate(rand() * S, rand() * S); g.scale(rr(40, 110), rr(40, 110)); g.fillStyle = gr; g.fillRect(-1, -1, 2, 2); g.restore();
    }
    // folhas de grama
    for (let i = 0; i < 22000; i++) {
      const x = rand() * S, y = rand() * S, l = rr(3, 8), a = rr(-0.5, 0.5) - Math.PI / 2;
      g.strokeStyle = pick(['#3a5a22', '#5f8636', '#4d7230', '#6e9440', '#35501d', '#7a9a48']);
      g.lineWidth = rr(0.7, 1.4);
      g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke();
    }
    noise(g, S, S, 14);
    return toTex(c);
  });
}

export function dirtTex() {
  return cached('dirt', () => {
    const S = 512; const [c, g] = canvas(S, S);
    g.fillStyle = '#7d6649'; g.fillRect(0, 0, S, S);
    speckle(g, S, S, 9000, ['#6b563c', '#8f7858', '#5e4a33', '#9c8766', '#4f3e2a'], 2.2);
    for (let i = 0; i < 400; i++) { g.fillStyle = pick(['#a39478', '#6d6658', '#8a8070']); g.beginPath(); g.arc(rand() * S, rand() * S, rr(1.5, 4), 0, 7); g.fill(); }
    noise(g, S, S, 20);
    return toTex(c);
  });
}

export function concreteTex() {
  return cached('concrete', () => {
    const S = 512; const [c, g] = canvas(S, S);
    g.fillStyle = '#b1aca3'; g.fillRect(0, 0, S, S);
    for (let i = 0; i < 25; i++) {
      const gr = g.createRadialGradient(0, 0, 0, 0, 0, 1);
      gr.addColorStop(0, `rgba(80,75,70,${rr(0.04, 0.12)})`); gr.addColorStop(1, 'rgba(80,75,70,0)');
      g.save(); g.translate(rand() * S, rand() * S); g.scale(rr(30, 120), rr(30, 120)); g.fillStyle = gr; g.fillRect(-1, -1, 2, 2); g.restore();
    }
    noise(g, S, S, 30);
    speckle(g, S, S, 1600, ['#9d978d', '#c4bfb6', '#8a857c'], 2.5);
    // escorrimento de água
    for (let i = 0; i < 18; i++) { g.fillStyle = `rgba(70,66,60,${rr(0.04, 0.1)})`; g.fillRect(rand() * S, 0, rr(2, 8), S * rr(0.2, 1)); }
    return toTex(c);
  });
}

export function parkingTex() {
  return cached('parking', () => {
    const [c, g] = canvas(512, 512);
    g.drawImage(asphaltTex().image, 0, 0);
    g.fillStyle = 'rgba(235,235,230,0.9)';
    g.fillRect(0, 0, 512, 12);
    g.fillRect(0, 0, 12, 512 * 0.95);
    for (let i = 0; i < 400; i++) { g.fillStyle = 'rgba(60,60,62,0.5)'; g.fillRect(rand() * 512, rand() * 12, 2, 2); g.fillRect(rand() * 12, rand() * 490, 2, 2); }
    return toTex(c);
  });
}

// Fachada de prédio. tile = 8 janelas x 8 andares. Retorna {map, emissive, spec, normal}
const FACADES = {
  brick: { base: '#8a4a36', mortar: '#5f3326', frame: '#d8d0c0', glass: '#1d2633', sill: '#c8c0b0' },
  concrete: { base: '#a8a39a', mortar: '#8d877d', frame: '#5b5e62', glass: '#22303e', sill: '#bdb8ae' },
  office: { base: '#4d5a66', mortar: '#3b4650', frame: '#2a3138', glass: '#2c4258', sill: '#3b4650' },
  plaster: { base: '#c9b48e', mortar: '#a99572', frame: '#f1ece2', glass: '#1f2a35', sill: '#e8e0d0' },
  apartment: { base: '#b9a495', mortar: '#9a8577', frame: '#e8e0d6', glass: '#1d2733', sill: '#ddd4c8' },
};
export function facadeTex(kind) {
  return cached('facade_' + kind, () => {
    const f = FACADES[kind];
    const S = 1024, bay = S / 8;
    const [c, g] = canvas(S, S);
    const [ce, ge] = canvas(S, S);
    const [cs, gs] = canvas(S, S);
    const [ch, gh] = canvas(S, S); // altura para relevo
    g.fillStyle = f.base; g.fillRect(0, 0, S, S);
    ge.fillStyle = '#000'; ge.fillRect(0, 0, S, S);
    gs.fillStyle = '#0a0a0a'; gs.fillRect(0, 0, S, S);
    gh.fillStyle = '#808080'; gh.fillRect(0, 0, S, S);
    if (kind === 'brick') {
      for (let y = 0; y < S; y += 8) {
        for (let x = ((y / 8) % 2) * 8; x < S + 16; x += 16) {
          const v = rr(-14, 14);
          g.fillStyle = `rgb(${138 + v},${74 + v * 0.6},${54 + v * 0.5})`; g.fillRect(x - 16, y, 15, 7);
          gh.fillStyle = '#9a9a9a'; gh.fillRect(x - 16, y, 15, 7);
        }
        g.fillStyle = f.mortar; g.fillRect(0, y + 7, S, 1);
      }
    } else if (kind === 'concrete' || kind === 'plaster' || kind === 'apartment') {
      // painéis
      for (let y = 0; y < S; y += bay / 2) { g.fillStyle = 'rgba(0,0,0,0.06)'; g.fillRect(0, y, S, 1); gh.fillStyle = '#606060'; gh.fillRect(0, y, S, 2); }
    }
    noise(g, S, S, kind === 'office' ? 8 : 22);
    // sujeira escorrendo
    for (let i = 0; i < 40; i++) { g.fillStyle = `rgba(30,25,20,${rr(0.03, 0.08)})`; g.fillRect(rand() * S, rand() * S, rr(3, 10), rr(40, 200)); }
    for (let fy = 0; fy < 8; fy++) {
      g.fillStyle = f.mortar; g.fillRect(0, fy * bay, S, kind === 'office' ? 10 : 6);
      gh.fillStyle = '#b0b0b0'; gh.fillRect(0, fy * bay, S, kind === 'office' ? 10 : 6);
      for (let fx = 0; fx < 8; fx++) {
        const x0 = fx * bay, y0 = fy * bay;
        const ww = kind === 'office' ? bay - 12 : bay * 0.52;
        const wh = kind === 'office' ? bay - 20 : bay * 0.6;
        const wx = x0 + (bay - ww) / 2, wy = y0 + (bay - wh) / 2 + 4;
        // moldura, peitoril e verga
        g.fillStyle = f.frame; g.fillRect(wx - 6, wy - 6, ww + 12, wh + 12);
        g.fillStyle = f.sill; g.fillRect(wx - 10, wy + wh + 4, ww + 20, 7);
        if (kind !== 'office') { g.fillStyle = f.sill; g.fillRect(wx - 8, wy - 12, ww + 16, 6); }
        gh.fillStyle = '#c8c8c8'; gh.fillRect(wx - 6, wy - 6, ww + 12, wh + 12);
        gh.fillStyle = '#e0e0e0'; gh.fillRect(wx - 10, wy + wh + 4, ww + 20, 7);
        gh.fillStyle = '#303030'; gh.fillRect(wx, wy, ww, wh);
        const lit = rand() < 0.38;
        const grad = g.createLinearGradient(wx, wy, wx + ww * 0.6, wy + wh);
        grad.addColorStop(0, '#5a6e86'); grad.addColorStop(0.45, f.glass); grad.addColorStop(1, '#2a3646');
        g.fillStyle = grad; g.fillRect(wx, wy, ww, wh);
        // cortinas visíveis
        if (rand() < 0.5) { g.fillStyle = pick(['rgba(220,210,190,0.35)', 'rgba(160,60,50,0.3)', 'rgba(80,100,140,0.3)']); g.fillRect(wx, wy, ww * rr(0.15, 0.4), wh); }
        gs.fillStyle = '#ffffff'; gs.fillRect(wx, wy, ww, wh);
        if (kind !== 'office') {
          g.fillStyle = f.frame; g.fillRect(wx + ww / 2 - 2, wy, 4, wh); g.fillRect(wx, wy + wh * 0.38, ww, 3);
          gs.fillStyle = '#000'; gs.fillRect(wx + ww / 2 - 2, wy, 4, wh); gs.fillRect(wx, wy + wh * 0.38, ww, 3);
        } else { g.fillStyle = f.frame; g.fillRect(wx + ww / 2 - 1, wy, 2, wh); }
        if (lit) {
          const col = pick(['#ffd79a', '#ffe4b8', '#fff1d6', '#cfe3ff', '#ffc77a']);
          const gl = ge.createLinearGradient(wx, wy, wx, wy + wh);
          gl.addColorStop(0, col); gl.addColorStop(1, '#8a6a40');
          ge.fillStyle = gl; ge.globalAlpha = rr(0.55, 1); ge.fillRect(wx, wy, ww, wh); ge.globalAlpha = 1;
          if (rand() < 0.5) { ge.fillStyle = 'rgba(0,0,0,0.5)'; ge.fillRect(wx, wy, ww * rr(0.2, 0.5), wh); }
          if (kind !== 'office') { ge.fillStyle = '#000'; ge.fillRect(wx + ww / 2 - 2, wy, 4, wh); }
        }
        if (kind !== 'office' && rand() < 0.1) { g.fillStyle = '#d0d0cc'; g.fillRect(wx + ww * 0.2, wy + wh + 12, ww * 0.55, 14); g.fillStyle = '#888'; g.fillRect(wx + ww * 0.2, wy + wh + 24, ww * 0.55, 2); }
      }
    }
    const map = toTex(c), emissive = toTex(ce), spec = toTex(cs, true, false);
    const hTex = toTex(ch, true, false);
    const normal = normalOf(hTex, kind === 'brick' ? 3 : 2.2, 'facade_' + kind);
    return { map, emissive, spec, normal };
  });
}

// Revestimento de madeira (casas). Branco para colorir pela cor do vértice
export function sidingTex() {
  return cached('siding', () => {
    const [c, g] = canvas(512, 512);
    for (let y = 0; y < 512; y += 32) {
      const gr = g.createLinearGradient(0, y, 0, y + 32);
      gr.addColorStop(0, '#ffffff'); gr.addColorStop(0.8, '#e2e2e2'); gr.addColorStop(0.93, '#bdbdbd'); gr.addColorStop(1, '#8a8a8a');
      g.fillStyle = gr; g.fillRect(0, y, 512, 32);
      // emendas das tábuas
      for (let x = rand() * 200; x < 512; x += rr(180, 320)) { g.fillStyle = 'rgba(120,120,120,0.5)'; g.fillRect(x, y, 2, 30); }
    }
    for (let i = 0; i < 30; i++) { g.fillStyle = `rgba(90,85,75,${rr(0.03, 0.08)})`; g.fillRect(rand() * 512, rand() * 512, rr(2, 6), rr(30, 160)); }
    noise(g, 512, 512, 10);
    return toTex(c);
  });
}

export function roofTex() {
  return cached('roof', () => {
    const [c, g] = canvas(512, 512);
    g.fillStyle = '#3a2a24'; g.fillRect(0, 0, 512, 512);
    for (let y = 0; y < 512; y += 24) {
      for (let x = ((y / 24) % 2) * 24; x < 512 + 48; x += 48) {
        const v = rr(-12, 12);
        const gr = g.createLinearGradient(0, y, 0, y + 23);
        gr.addColorStop(0, `rgb(${92 + v},${66 + v},${57 + v})`); gr.addColorStop(1, `rgb(${70 + v},${50 + v},${43 + v})`);
        g.fillStyle = gr; g.fillRect(x - 48, y, 46, 23);
      }
    }
    speckle(g, 512, 512, 4000, ['#2a1e1a', '#7a6058', '#4a3a34'], 1.4);
    noise(g, 512, 512, 14);
    return toTex(c);
  });
}

export function leavesTex() {
  return cached('leaves', () => {
    const S = 256; const [c, g] = canvas(S, S);
    g.fillStyle = '#7a8a6a'; g.fillRect(0, 0, S, S);
    for (let i = 0; i < 2600; i++) {
      const x = rand() * S, y = rand() * S, r = rr(2, 6);
      const v = Math.floor(rr(120, 255));
      g.fillStyle = `rgb(${v * 0.85},${v},${v * 0.7})`;
      g.beginPath(); g.ellipse(x, y, r, r * 0.55, rand() * 3, 0, 7); g.fill();
    }
    for (let i = 0; i < 400; i++) { g.fillStyle = 'rgba(20,30,10,0.5)'; g.beginPath(); g.arc(rand() * S, rand() * S, rr(1, 4), 0, 7); g.fill(); }
    return toTex(c);
  });
}

export function aoTex() {
  return cached('ao', () => {
    const [c, g] = canvas(8, 64);
    const gr = g.createLinearGradient(0, 0, 0, 64);
    gr.addColorStop(0, 'rgba(0,0,0,0.75)'); gr.addColorStop(0.35, 'rgba(0,0,0,0.3)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 8, 64);
    return toTex(c, false);
  });
}

export function blobTex() {
  return cached('blob', () => {
    const [c, g] = canvas(64, 64);
    const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(0,0,0,0.75)'); gr.addColorStop(0.55, 'rgba(0,0,0,0.4)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
    return toTex(c, false);
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

export function corrugatedTex() {
  return cached('corrugated', () => {
    const [c, g] = canvas(256, 256);
    for (let x = 0; x < 256; x += 16) {
      const gr = g.createLinearGradient(x, 0, x + 16, 0);
      gr.addColorStop(0, '#9a9a9a'); gr.addColorStop(0.5, '#f2f2f2'); gr.addColorStop(1, '#9a9a9a');
      g.fillStyle = gr; g.fillRect(x, 0, 16, 256);
    }
    for (let i = 0; i < 40; i++) { g.fillStyle = `rgba(110,60,30,${rr(0.05, 0.2)})`; g.fillRect(rand() * 256, rand() * 256, rr(3, 14), rr(10, 80)); }
    noise(g, 256, 256, 16);
    return toTex(c);
  });
}
