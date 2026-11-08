import * as THREE from 'three';
import { mulberry32, clamp } from '../utils/math.js';

/**
 * Procedural PBR texture generator (albedo / normal / roughness) using canvas.
 * These are PROVISIONAL production assets: every function returns textures in the
 * same layout a scanned/authored asset would use, so they can be swapped later
 * for real texture files without touching gameplay code.
 */

class TileNoise {
  constructor(seed) {
    const r = mulberry32(seed);
    const p = Array.from({ length: 256 }, (_, i) => i);
    for (let i = 255; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; }
    this.p = new Uint8Array(512);
    for (let i = 0; i < 512; i++) this.p[i] = p[i & 255];
    this.v = new Float32Array(256);
    for (let i = 0; i < 256; i++) this.v[i] = r();
  }
  hash(x, y) { return this.v[this.p[(this.p[x & 255] + y) & 255]]; }
  noise(x, y, period) {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = x - xi, yf = y - yi;
    const x0 = ((xi % period) + period) % period, y0 = ((yi % period) + period) % period;
    const x1 = (x0 + 1) % period, y1 = (y0 + 1) % period;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    const a = this.hash(x0, y0), b = this.hash(x1, y0), c = this.hash(x0, y1), d = this.hash(x1, y1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }
  fbm(x, y, period, oct = 5, gain = 0.5) {
    let s = 0, amp = 0.5, f = 1, n = 0;
    for (let i = 0; i < oct; i++) { s += amp * this.noise(x * f, y * f, period * f); n += amp; amp *= gain; f *= 2; }
    return s / n;
  }
}

function canvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
}

function hexToRgb(hex) {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Fill canvas with base color modulated by fBm; returns noise field for reuse. */
function noiseFill(ctx, w, h, color, { seed = 1, period = 8, amount = 0.18, oct = 5, speckle = 0.0, large = 0.0 } = {}) {
  const n = new TileNoise(seed);
  const n2 = new TileNoise(seed + 77);
  const img = ctx.createImageData(w, h);
  const [r, g, b] = hexToRgb(color);
  const field = new Float32Array(w * h);
  const rnd = mulberry32(seed + 5);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = (x / w) * period, v = (y / h) * period * (h / w);
      let f = n.fbm(u, v, period, oct);
      if (large > 0) f = f * (1 - large) + large * n2.fbm(x / w * 2, y / h * 2 * (h / w), 2, 3);
      let k = 1 + (f - 0.5) * 2 * amount;
      if (speckle > 0 && rnd() < speckle) k *= 0.6 + rnd() * 0.9;
      const i = (y * w + x) * 4;
      img.data[i] = clamp(r * k, 0, 255);
      img.data[i + 1] = clamp(g * k, 0, 255);
      img.data[i + 2] = clamp(b * k, 0, 255);
      img.data[i + 3] = 255;
      field[y * w + x] = f;
    }
  }
  ctx.putImageData(img, 0, 0);
  return field;
}

/** Build a tangent space normal map from a height canvas (+ optional extra float field). */
function normalFromHeight(hctx, w, h, strength = 2.0, extra = null, extraAmt = 0) {
  const src = hctx.getImageData(0, 0, w, h).data;
  const H = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) H[i] = src[i * 4] / 255 + (extra ? extra[i] * extraAmt : 0);
  const out = canvas(w, h);
  const octx = out.getContext('2d');
  const img = octx.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const l = H[y * w + ((x - 1 + w) % w)], r = H[y * w + ((x + 1) % w)];
      const u = H[((y - 1 + h) % h) * w + x], d = H[((y + 1) % h) * w + x];
      let nx = (l - r) * strength, ny = (d - u) * strength, nz = 1;
      const len = Math.hypot(nx, ny, nz);
      nx /= len; ny /= len; nz /= len;
      const i = (y * w + x) * 4;
      img.data[i] = (nx * 0.5 + 0.5) * 255;
      img.data[i + 1] = (ny * 0.5 + 0.5) * 255;
      img.data[i + 2] = (nz * 0.5 + 0.5) * 255;
      img.data[i + 3] = 255;
    }
  }
  octx.putImageData(img, 0, 0);
  return out;
}

function tex(c, srgb = true, repeat = true) {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; }
  t.anisotropy = TextureFactory.anisotropy;
  t.needsUpdate = true;
  return t;
}

function grayCanvas(w, h, level) {
  const c = canvas(w, h);
  const x = c.getContext('2d');
  x.fillStyle = `rgb(${level},${level},${level})`;
  x.fillRect(0, 0, w, h);
  return [c, x];
}
const gray = (v) => { const k = Math.round(clamp(v, 0, 1) * 255); return `rgb(${k},${k},${k})`; };

export const TextureFactory = {
  anisotropy: 8,
  cache: new Map(),

  get(key, fn) {
    if (!this.cache.has(key)) this.cache.set(key, fn());
    return this.cache.get(key);
  },

  // ------------------------------------------------------------- ground
  asphalt(seed = 11) {
    return this.get('asphalt' + seed, () => {
      const W = 512;
      const c = canvas(W, W), ctx = c.getContext('2d');
      const field = noiseFill(ctx, W, W, '#4a4a4c', { seed, period: 16, amount: 0.22, speckle: 0.25, large: 0.35 });
      const [hc, hx] = grayCanvas(W, W, 128);
      const [rc, rx] = grayCanvas(W, W, 225);
      const rnd = mulberry32(seed);
      const pn = new TileNoise(seed + 3);
      // puddles (wet, dark, smooth)
      const rimg = rx.getImageData(0, 0, W, W);
      const cimg = ctx.getImageData(0, 0, W, W);
      for (let y = 0; y < W; y++) for (let x = 0; x < W; x++) {
        const p = pn.fbm(x / W * 3, y / W * 3, 3, 4);
        const i = (y * W + x) * 4;
        const wet = clamp((p - 0.56) * 9, 0, 1);
        const rough = 0.88 - wet * 0.8 - (field[y * W + x] - 0.5) * 0.1;
        rimg.data[i] = rimg.data[i + 1] = rimg.data[i + 2] = clamp(rough, 0.05, 1) * 255;
        const dk = 1 - wet * 0.35;
        cimg.data[i] *= dk; cimg.data[i + 1] *= dk; cimg.data[i + 2] *= dk;
      }
      rx.putImageData(rimg, 0, 0);
      ctx.putImageData(cimg, 0, 0);
      // patches
      for (let i = 0; i < 4; i++) {
        const x = rnd() * W, y = rnd() * W, w = 40 + rnd() * 120, h = 30 + rnd() * 90;
        ctx.fillStyle = `rgba(${30 + rnd() * 30},${30 + rnd() * 30},${32 + rnd() * 30},0.35)`;
        ctx.fillRect(x, y, w, h);
        hx.strokeStyle = gray(0.45); hx.lineWidth = 2; hx.strokeRect(x, y, w, h);
      }
      // cracks
      for (let i = 0; i < 14; i++) {
        let x = rnd() * W, y = rnd() * W, a = rnd() * Math.PI * 2;
        ctx.strokeStyle = 'rgba(15,15,15,0.7)'; hx.strokeStyle = gray(0.2);
        ctx.lineWidth = hx.lineWidth = 1 + rnd() * 1.5;
        ctx.beginPath(); hx.beginPath(); ctx.moveTo(x, y); hx.moveTo(x, y);
        for (let s = 0; s < 30; s++) {
          a += (rnd() - 0.5) * 0.9; x += Math.cos(a) * 5; y += Math.sin(a) * 5;
          ctx.lineTo(x, y); hx.lineTo(x, y);
        }
        ctx.stroke(); hx.stroke();
      }
      // oil stains
      for (let i = 0; i < 5; i++) {
        const x = rnd() * W, y = rnd() * W, r = 10 + rnd() * 30;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, 'rgba(10,10,12,0.45)'); g.addColorStop(1, 'rgba(10,10,12,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
      }
      const n = normalFromHeight(hx, W, W, 3.0, field, 1.2);
      return { map: tex(c), normalMap: tex(n, false), roughnessMap: tex(rc, false) };
    });
  },

  pavers(seed = 21, color = '#8a8478', tile = 32) {
    return this.get('pavers' + seed + color, () => {
      const W = 512;
      const c = canvas(W, W), ctx = c.getContext('2d');
      const field = noiseFill(ctx, W, W, color, { seed, period: 16, amount: 0.12, speckle: 0.1 });
      const [hc, hx] = grayCanvas(W, W, 150);
      const [rc, rx] = grayCanvas(W, W, 200);
      const rnd = mulberry32(seed);
      for (let y = 0; y < W; y += tile) {
        const off = ((y / tile) % 2) * tile / 2;
        for (let x = -tile; x < W + tile; x += tile) {
          const k = 0.85 + rnd() * 0.25;
          ctx.fillStyle = `rgba(${k > 1 ? 255 : 0},${k > 1 ? 255 : 0},${k > 1 ? 255 : 0},${Math.abs(k - 1) * 0.6})`;
          ctx.fillRect(x + off + 1, y + 1, tile - 2, tile - 2);
          hx.fillStyle = gray(0.55 + rnd() * 0.08);
          hx.fillRect(x + off + 2, y + 2, tile - 4, tile - 4);
        }
        ctx.fillStyle = 'rgba(40,38,34,0.85)';
        ctx.fillRect(0, y, W, 2);
        for (let x = -tile; x < W + tile; x += tile) ctx.fillRect(x + off, y, 2, tile);
        hx.fillStyle = gray(0.25);
        hx.fillRect(0, y, W, 2);
        for (let x = -tile; x < W + tile; x += tile) hx.fillRect(x + off, y, 2, tile);
      }
      rx.fillStyle = 'rgba(40,40,40,0.0)';
      const n = normalFromHeight(hx, W, W, 2.5, field, 0.6);
      return { map: tex(c), normalMap: tex(n, false), roughnessMap: tex(rc, false) };
    });
  },

  concrete(seed = 31, color = '#9a978f', opts = {}) {
    return this.get('concrete' + seed + color + JSON.stringify(opts), () => {
      const W = 512;
      const c = canvas(W, W), ctx = c.getContext('2d');
      const field = noiseFill(ctx, W, W, color, { seed, period: 8, amount: 0.16, speckle: 0.12, large: 0.4 });
      const [hc, hx] = grayCanvas(W, W, 128);
      const rnd = mulberry32(seed);
      if (opts.panels) {
        ctx.strokeStyle = 'rgba(30,30,30,0.5)'; hx.strokeStyle = gray(0.3);
        ctx.lineWidth = hx.lineWidth = 3;
        for (let i = 0; i <= 2; i++) {
          ctx.beginPath(); ctx.moveTo(0, i * W / 2); ctx.lineTo(W, i * W / 2); ctx.stroke();
          hx.beginPath(); hx.moveTo(0, i * W / 2); hx.lineTo(W, i * W / 2); hx.stroke();
        }
      }
      // water stains streaks
      for (let i = 0; i < 18; i++) {
        const x = rnd() * W, w = 4 + rnd() * 20, h = 60 + rnd() * 250, y = rnd() * W * 0.3;
        const g = ctx.createLinearGradient(0, y, 0, y + h);
        g.addColorStop(0, 'rgba(40,38,32,0.25)'); g.addColorStop(1, 'rgba(40,38,32,0)');
        ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
      }
      // chips
      for (let i = 0; i < 30; i++) {
        const x = rnd() * W, y = rnd() * W, r = 1 + rnd() * 5;
        ctx.fillStyle = 'rgba(70,68,62,0.6)'; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
        hx.fillStyle = gray(0.3); hx.beginPath(); hx.arc(x, y, r, 0, 7); hx.fill();
      }
      const n = normalFromHeight(hx, W, W, 2.5, field, 2.0);
      return { map: tex(c), normalMap: tex(n, false) };
    });
  },

  roof(seed = 41) {
    return this.get('roof' + seed, () => {
      const W = 256;
      const c = canvas(W, W), ctx = c.getContext('2d');
      const field = noiseFill(ctx, W, W, '#4b4844', { seed, period: 16, amount: 0.3, speckle: 0.4 });
      const [hc, hx] = grayCanvas(W, W, 128);
      const n = normalFromHeight(hx, W, W, 2, field, 3);
      return { map: tex(c), normalMap: tex(n, false) };
    });
  },

  // ------------------------------------------------------------- facades
  /**
   * Residential facade: 4 bays (3 m) x 2 floors (3 m) = 12 m x 6 m.
   */
  facade(style) {
    const key = 'facade' + JSON.stringify(style);
    return this.get(key, () => {
      const W = 1024, Hh = 512, PPM = W / 12;
      const s = Object.assign({ wall: '#b8ab92', frame: '#d9d4c8', seed: 1, brick: false, damage: 0.3, band: '#a39780', shutters: false }, style);
      const c = canvas(W, Hh), ctx = c.getContext('2d');
      const [hc, hx] = grayCanvas(W, Hh, 150);
      const [rc, rx] = grayCanvas(W, Hh, 235);
      const rnd = mulberry32(s.seed);
      const field = noiseFill(ctx, W, Hh, s.wall, { seed: s.seed, period: 12, amount: s.brick ? 0.1 : 0.14, speckle: 0.05, large: 0.45 });
      if (s.brick) {
        const bw = 0.25 * PPM, bh = 0.075 * PPM;
        for (let y = 0, row = 0; y < Hh; y += bh, row++) {
          const off = (row % 2) * bw / 2;
          for (let x = -bw; x < W + bw; x += bw) {
            const k = 0.8 + rnd() * 0.35;
            ctx.fillStyle = `rgba(${120 * k},${60 * k},${45 * k},0.5)`;
            ctx.fillRect(x + off, y, bw - 2, bh - 2);
          }
          ctx.fillStyle = 'rgba(170,160,145,0.55)'; ctx.fillRect(0, y + bh - 2, W, 2);
          hx.fillStyle = gray(0.48); hx.fillRect(0, y + bh - 2, W, 2);
          for (let x = -bw; x < W + bw; x += bw) { ctx.fillRect(x + off + bw - 2, y, 2, bh); hx.fillRect(x + off + bw - 2, y, 2, bh); }
        }
      }
      const floorPx = 3 * PPM, bayPx = 3 * PPM;
      for (let f = 0; f < 2; f++) {
        const yTop = f * floorPx;
        // floor band / cornice at bottom of the floor slab
        ctx.fillStyle = s.band; ctx.fillRect(0, yTop + floorPx - 0.22 * PPM, W, 0.22 * PPM);
        ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(0, yTop + floorPx - 0.02 * PPM, W, 0.06 * PPM);
        hx.fillStyle = gray(0.78); hx.fillRect(0, yTop + floorPx - 0.22 * PPM, W, 0.22 * PPM);
        for (let b = 0; b < 4; b++) {
          const ww = 1.25 * PPM, wh = 1.55 * PPM;
          const wx = b * bayPx + (bayPx - ww) / 2;
          const wy = yTop + floorPx - 0.22 * PPM - 0.85 * PPM - wh;
          // grime under sill
          const g = ctx.createLinearGradient(0, wy + wh, 0, wy + wh + 1.2 * PPM);
          g.addColorStop(0, 'rgba(35,30,25,0.35)'); g.addColorStop(1, 'rgba(35,30,25,0)');
          ctx.fillStyle = g; ctx.fillRect(wx + 6, wy + wh, ww - 12, 1.2 * PPM);
          // surround
          ctx.fillStyle = s.band; ctx.fillRect(wx - 10, wy - 10, ww + 20, wh + 20);
          hx.fillStyle = gray(0.72); hx.fillRect(wx - 10, wy - 10, ww + 20, wh + 20);
          // recess shadow
          ctx.fillStyle = '#1a1a1c'; ctx.fillRect(wx, wy, ww, wh);
          hx.fillStyle = gray(0.25); hx.fillRect(wx, wy, ww, wh);
          const kind = rnd();
          const inset = 7;
          if (kind < 0.12 && s.damage > 0.1) {
            // boarded
            for (let p = 0; p < 5; p++) {
              const k = 0.7 + rnd() * 0.4;
              ctx.fillStyle = `rgb(${120 * k},${92 * k},${62 * k})`;
              const py = wy + inset + p * (wh - inset * 2) / 5;
              ctx.save(); ctx.translate(wx + ww / 2, py + 8); ctx.rotate((rnd() - 0.5) * 0.12);
              ctx.fillRect(-ww / 2 + 2, -8, ww - 4, (wh - inset * 2) / 5 - 3); ctx.restore();
            }
            hx.fillStyle = gray(0.5); hx.fillRect(wx + 2, wy + 2, ww - 4, wh - 4);
            rx.fillStyle = gray(0.9); rx.fillRect(wx, wy, ww, wh);
          } else {
            const broken = kind < 0.3 && s.damage > 0.2;
            const gg = ctx.createLinearGradient(wx, wy, wx + ww * 0.6, wy + wh);
            if (broken) { gg.addColorStop(0, '#0d0d0f'); gg.addColorStop(1, '#151518'); }
            else if (kind < 0.42) { gg.addColorStop(0, '#6b5f55'); gg.addColorStop(1, '#3a332e'); } // curtains
            else { gg.addColorStop(0, '#5f6d7d'); gg.addColorStop(0.45, '#2c3440'); gg.addColorStop(1, '#3a4452'); }
            ctx.fillStyle = gg; ctx.fillRect(wx + inset, wy + inset, ww - inset * 2, wh - inset * 2);
            rx.fillStyle = gray(broken ? 0.9 : 0.08); rx.fillRect(wx + inset, wy + inset, ww - inset * 2, wh - inset * 2);
            if (broken) {
              ctx.strokeStyle = 'rgba(160,170,180,0.6)'; ctx.lineWidth = 1.5;
              for (let k = 0; k < 6; k++) {
                ctx.beginPath(); ctx.moveTo(wx + inset + rnd() * (ww - 2 * inset), wy + inset);
                ctx.lineTo(wx + ww / 2 + (rnd() - 0.5) * 30, wy + wh / 2 + (rnd() - 0.5) * 30); ctx.stroke();
              }
            }
            // frame + mullions
            ctx.fillStyle = s.frame;
            ctx.fillRect(wx + inset - 4, wy + inset - 4, ww - inset * 2 + 8, 5);
            ctx.fillRect(wx + inset - 4, wy + wh - inset - 1, ww - inset * 2 + 8, 5);
            ctx.fillRect(wx + inset - 4, wy + inset - 4, 5, wh - inset * 2 + 8);
            ctx.fillRect(wx + ww - inset - 1, wy + inset - 4, 5, wh - inset * 2 + 8);
            ctx.fillRect(wx + ww / 2 - 2, wy + inset, 5, wh - inset * 2);
            ctx.fillRect(wx + inset, wy + wh * 0.32, ww - inset * 2, 4);
            hx.fillStyle = gray(0.4);
            hx.fillRect(wx + ww / 2 - 2, wy + inset, 5, wh - inset * 2);
            hx.fillRect(wx + inset, wy + wh * 0.32, ww - inset * 2, 4);
            rx.fillStyle = gray(0.5);
            rx.fillRect(wx + ww / 2 - 2, wy + inset, 5, wh - inset * 2);
            if (s.shutters && rnd() < 0.6) {
              const sh = s.shutterColor || '#4d5b4a';
              for (const side of [-1, 1]) {
                const sx = side < 0 ? wx - 0.45 * PPM - 10 : wx + ww + 10;
                ctx.fillStyle = sh; ctx.fillRect(sx, wy - 4, 0.45 * PPM, wh + 8);
                ctx.fillStyle = 'rgba(0,0,0,0.25)';
                for (let l = 0; l < 14; l++) ctx.fillRect(sx, wy + l * wh / 14, 0.45 * PPM, 2);
                hx.fillStyle = gray(0.68); hx.fillRect(sx, wy - 4, 0.45 * PPM, wh + 8);
              }
            }
          }
          // sill
          ctx.fillStyle = s.frame; ctx.fillRect(wx - 14, wy + wh + 4, ww + 28, 10);
          ctx.fillStyle = 'rgba(0,0,0,0.4)'; ctx.fillRect(wx - 14, wy + wh + 14, ww + 28, 5);
          hx.fillStyle = gray(0.9); hx.fillRect(wx - 14, wy + wh + 4, ww + 28, 10);
        }
      }
      // battle damage: bullet pocks & scorch marks
      const pocks = Math.floor(s.damage * 140);
      for (let i = 0; i < pocks; i++) {
        const x = rnd() * W, y = rnd() * Hh, r = 2 + rnd() * 5;
        ctx.fillStyle = 'rgba(200,190,175,0.5)'; ctx.beginPath(); ctx.arc(x, y, r * 1.8, 0, 7); ctx.fill();
        ctx.fillStyle = 'rgba(30,26,22,0.85)'; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
        hx.fillStyle = gray(0.1); hx.beginPath(); hx.arc(x, y, r, 0, 7); hx.fill();
      }
      const burns = Math.floor(s.damage * 4);
      for (let i = 0; i < burns; i++) {
        const x = rnd() * W, y = rnd() * Hh, r = 50 + rnd() * 120;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, 'rgba(10,8,6,0.65)'); g.addColorStop(0.6, 'rgba(20,16,12,0.3)'); g.addColorStop(1, 'rgba(20,16,12,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
      }
      const n = normalFromHeight(hx, W, Hh, 4.0, field, 1.5);
      return { map: tex(c), normalMap: tex(n, false), roughnessMap: tex(rc, false) };
    });
  },

  /** Ground-floor shops: 4 bays x 4.5 m = 12 m x 4.5 m. */
  shopfront(style) {
    const key = 'shop' + JSON.stringify(style);
    return this.get(key, () => {
      const W = 1024, Hh = 384, PPM = W / 12;
      const s = Object.assign({ wall: '#7d776c', seed: 7, damage: 0.4 }, style);
      const c = canvas(W, Hh), ctx = c.getContext('2d');
      const [hc, hx] = grayCanvas(W, Hh, 150);
      const [rc, rx] = grayCanvas(W, Hh, 230);
      const rnd = mulberry32(s.seed);
      const field = noiseFill(ctx, W, Hh, s.wall, { seed: s.seed, period: 12, amount: 0.16, large: 0.4 });
      const SIGNS = ['KAFE NORA', 'APTEKA 24', 'TABAK', 'MAGAZIN', 'HOTEL VESNA', 'BANKA TERESK', 'PEKARA', 'OPTIKA', 'KNIGI', 'ELEKTRO'];
      const SIGNC = ['#7a1f1f', '#1f4f7a', '#2f5d33', '#6a5a20', '#3c2f5e', '#1d1d1d'];
      for (let b = 0; b < 4; b++) {
        const x0 = b * 3 * PPM;
        const kind = rnd();
        const ox = x0 + 0.25 * PPM, ow = 2.5 * PPM, oy = 1.15 * PPM, oh = Hh - oy - 0.1 * PPM;
        // sign band
        if (rnd() < 0.7) {
          ctx.fillStyle = SIGNC[Math.floor(rnd() * SIGNC.length)];
          ctx.fillRect(x0 + 0.1 * PPM, 0.35 * PPM, 2.8 * PPM, 0.6 * PPM);
          ctx.fillStyle = '#e8e2d0';
          ctx.font = `bold ${Math.floor(0.36 * PPM)}px Arial, sans-serif`;
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(SIGNS[Math.floor(rnd() * SIGNS.length)], x0 + 1.5 * PPM, 0.66 * PPM);
          hx.fillStyle = gray(0.75); hx.fillRect(x0 + 0.1 * PPM, 0.35 * PPM, 2.8 * PPM, 0.6 * PPM);
          rx.fillStyle = gray(0.5); rx.fillRect(x0 + 0.1 * PPM, 0.35 * PPM, 2.8 * PPM, 0.6 * PPM);
        }
        ctx.fillStyle = '#26282a'; ctx.fillRect(ox - 6, oy - 6, ow + 12, oh + 6);
        hx.fillStyle = gray(0.3); hx.fillRect(ox, oy, ow, oh);
        if (kind < 0.45) {
          // roll shutter
          for (let y = oy; y < oy + oh; y += 6) {
            const k = 0.75 + rnd() * 0.1;
            ctx.fillStyle = `rgb(${130 * k},${132 * k},${128 * k})`; ctx.fillRect(ox, y, ow, 4);
            ctx.fillStyle = 'rgba(0,0,0,0.4)'; ctx.fillRect(ox, y + 4, ow, 2);
            hx.fillStyle = gray(0.55); hx.fillRect(ox, y, ow, 4);
          }
          rx.fillStyle = gray(0.55); rx.fillRect(ox, oy, ow, oh);
          // rust & graffiti
          for (let i = 0; i < 6; i++) {
            ctx.fillStyle = `rgba(${110 + rnd() * 40},${60 + rnd() * 20},30,0.25)`;
            ctx.fillRect(ox + rnd() * ow, oy + rnd() * oh, 10 + rnd() * 40, 10 + rnd() * 60);
          }
          if (rnd() < 0.6) {
            ctx.save(); ctx.strokeStyle = ['#c22', '#ddd', '#2a6', '#fc3'][Math.floor(rnd() * 4)]; ctx.lineWidth = 5;
            ctx.beginPath();
            let gx = ox + 20, gy = oy + oh * 0.5;
            ctx.moveTo(gx, gy);
            for (let k = 0; k < 12; k++) { gx += rnd() * 18; gy += (rnd() - 0.5) * 40; ctx.lineTo(gx, gy); }
            ctx.stroke(); ctx.restore();
          }
        } else {
          // shop window with door
          const broken = rnd() < s.damage;
          const gg = ctx.createLinearGradient(ox, oy, ox + ow, oy + oh);
          gg.addColorStop(0, broken ? '#0c0c0d' : '#4a5664'); gg.addColorStop(0.5, '#1d232b'); gg.addColorStop(1, broken ? '#111' : '#38424e');
          ctx.fillStyle = gg; ctx.fillRect(ox, oy, ow, oh);
          rx.fillStyle = gray(broken ? 0.9 : 0.06); rx.fillRect(ox, oy, ow, oh);
          ctx.fillStyle = '#2b2d30';
          ctx.fillRect(ox + ow * 0.62, oy, 6, oh);
          ctx.fillRect(ox, oy + oh * 0.12, ow, 5);
          hx.fillStyle = gray(0.4); hx.fillRect(ox + ow * 0.62, oy, 6, oh);
          if (broken) {
            ctx.strokeStyle = 'rgba(170,180,190,0.5)'; ctx.lineWidth = 1.5;
            for (let k = 0; k < 9; k++) {
              ctx.beginPath(); ctx.moveTo(ox + ow * 0.3, oy + oh * 0.5);
              ctx.lineTo(ox + rnd() * ow * 0.6, oy + rnd() * oh); ctx.stroke();
            }
          }
        }
        // pilaster between bays
        ctx.fillStyle = 'rgba(0,0,0,0.15)'; ctx.fillRect(x0, 0, 0.12 * PPM, Hh);
        hx.fillStyle = gray(0.7); hx.fillRect(x0, 0, 0.18 * PPM, Hh);
      }
      // cornice above ground floor
      ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fillRect(0, 0, W, 0.12 * PPM);
      hx.fillStyle = gray(0.85); hx.fillRect(0, 0, W, 0.22 * PPM);
      // grime at the base
      const g = ctx.createLinearGradient(0, Hh - 0.8 * PPM, 0, Hh);
      g.addColorStop(0, 'rgba(25,22,18,0)'); g.addColorStop(1, 'rgba(25,22,18,0.6)');
      ctx.fillStyle = g; ctx.fillRect(0, Hh - 0.8 * PPM, W, 0.8 * PPM);
      for (let i = 0; i < 80 * s.damage; i++) {
        const x = rnd() * W, y = rnd() * Hh, r = 2 + rnd() * 4;
        ctx.fillStyle = 'rgba(25,22,20,0.85)'; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
        hx.fillStyle = gray(0.1); hx.beginPath(); hx.arc(x, y, r, 0, 7); hx.fill();
      }
      const n = normalFromHeight(hx, W, Hh, 4.0, field, 1.5);
      return { map: tex(c), normalMap: tex(n, false), roughnessMap: tex(rc, false) };
    });
  },

  // ------------------------------------------------------------- surfaces
  paintedMetal(color = '#4d5340', seed = 51, panel = true) {
    return this.get('metal' + color + seed + panel, () => {
      const W = 512;
      const c = canvas(W, W), ctx = c.getContext('2d');
      const field = noiseFill(ctx, W, W, color, { seed, period: 8, amount: 0.1, large: 0.5 });
      const [hc, hx] = grayCanvas(W, W, 140);
      const [rc, rx] = grayCanvas(W, W, 150);
      const rnd = mulberry32(seed);
      if (panel) {
        ctx.strokeStyle = 'rgba(0,0,0,0.45)'; hx.strokeStyle = gray(0.3); ctx.lineWidth = hx.lineWidth = 2;
        for (let i = 0; i < 6; i++) {
          const x = rnd() * W, y = rnd() * W, w = 60 + rnd() * 200, h = 40 + rnd() * 160;
          ctx.strokeRect(x, y, w, h); hx.strokeRect(x, y, w, h);
          for (let r = 0; r < w; r += 14) {
            ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fillRect(x + r, y + 4, 2, 2);
            hx.fillStyle = gray(0.7); hx.fillRect(x + r, y + 4, 2, 2);
          }
        }
      }
      // scratches & wear
      for (let i = 0; i < 60; i++) {
        const x = rnd() * W, y = rnd() * W, a = rnd() * Math.PI, l = 5 + rnd() * 30;
        ctx.strokeStyle = 'rgba(190,190,180,0.25)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); ctx.stroke();
        rx.strokeStyle = gray(0.35); rx.beginPath(); rx.moveTo(x, y); rx.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); rx.stroke();
      }
      // dirt at bottom
      const g = ctx.createLinearGradient(0, W * 0.6, 0, W);
      g.addColorStop(0, 'rgba(80,65,45,0)'); g.addColorStop(1, 'rgba(80,65,45,0.35)');
      ctx.fillStyle = g; ctx.fillRect(0, W * 0.6, W, W * 0.4);
      const n = normalFromHeight(hx, W, W, 2.0, field, 0.4);
      return { map: tex(c), normalMap: tex(n, false), roughnessMap: tex(rc, false) };
    });
  },

  burned(seed = 61) {
    return this.get('burned' + seed, () => {
      const W = 512;
      const c = canvas(W, W), ctx = c.getContext('2d');
      const n = new TileNoise(seed);
      const img = ctx.createImageData(W, W);
      const field = new Float32Array(W * W);
      for (let y = 0; y < W; y++) for (let x = 0; x < W; x++) {
        const f = n.fbm(x / W * 8, y / W * 8, 8, 5);
        const rust = clamp((f - 0.52) * 2.2, 0, 1) * 0.55;
        const soot = 18 + f * 30;
        const i = (y * W + x) * 4;
        img.data[i] = soot + rust * 70; img.data[i + 1] = soot * 0.95 + rust * 32; img.data[i + 2] = soot * 0.9 + rust * 12; img.data[i + 3] = 255;
        field[y * W + x] = f;
      }
      ctx.putImageData(img, 0, 0);
      const [hc, hx] = grayCanvas(W, W, 128);
      const nm = normalFromHeight(hx, W, W, 2, field, 3);
      return { map: tex(c), normalMap: tex(nm, false) };
    });
  },

  wood(seed = 71) {
    return this.get('wood' + seed, () => {
      const W = 256;
      const c = canvas(W, W), ctx = c.getContext('2d');
      const n = new TileNoise(seed);
      const img = ctx.createImageData(W, W);
      for (let y = 0; y < W; y++) for (let x = 0; x < W; x++) {
        const f = n.fbm(x / W * 2, y / W * 24, 2, 4);
        const ring = 0.5 + 0.5 * Math.sin(f * 30);
        const i = (y * W + x) * 4;
        img.data[i] = 105 + ring * 40; img.data[i + 1] = 78 + ring * 28; img.data[i + 2] = 50 + ring * 18; img.data[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      ctx.fillStyle = 'rgba(30,20,10,0.6)';
      for (let x = 0; x < W; x += 64) ctx.fillRect(x, 0, 3, W);
      return { map: tex(c) };
    });
  },

  fabric(seed = 81, colors = ['#6b6a4f', '#857c5a', '#4b4a36', '#a29a78'], scale = 6) {
    return this.get('fabric' + seed + colors.join(), () => {
      const W = 256;
      const c = canvas(W, W), ctx = c.getContext('2d');
      const ns = colors.map((_, i) => new TileNoise(seed + i * 13));
      const img = ctx.createImageData(W, W);
      const rgbs = colors.map(hexToRgb);
      for (let y = 0; y < W; y++) for (let x = 0; x < W; x++) {
        let col = rgbs[0];
        for (let k = 1; k < rgbs.length; k++) {
          const f = ns[k].fbm(x / W * scale, y / W * scale, scale, 3);
          if (f > 0.56) col = rgbs[k];
        }
        const weave = ((x + y) % 4 < 2 ? 1.04 : 0.96) * (0.95 + Math.random() * 0.08);
        const i = (y * W + x) * 4;
        img.data[i] = clamp(col[0] * weave, 0, 255); img.data[i + 1] = clamp(col[1] * weave, 0, 255); img.data[i + 2] = clamp(col[2] * weave, 0, 255); img.data[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      const [hc, hx] = grayCanvas(W, W, 128);
      for (let y = 0; y < W; y += 2) { hx.fillStyle = gray(y % 4 === 0 ? 0.55 : 0.45); hx.fillRect(0, y, W, 1); }
      for (let x = 0; x < W; x += 2) { hx.fillStyle = 'rgba(255,255,255,0.08)'; hx.fillRect(x, 0, 1, W); }
      const nm = normalFromHeight(hx, W, W, 1.5);
      return { map: tex(c), normalMap: tex(nm, false) };
    });
  },

  sandbag(seed = 91) {
    return this.get('sandbag' + seed, () => {
      const W = 256;
      const c = canvas(W, W), ctx = c.getContext('2d');
      const field = noiseFill(ctx, W, W, '#8b7d5c', { seed, period: 16, amount: 0.25, speckle: 0.3 });
      const [hc, hx] = grayCanvas(W, W, 128);
      for (let y = 0; y < W; y += 3) { hx.fillStyle = gray(0.4 + (y % 6) * 0.05); hx.fillRect(0, y, W, 1); }
      const nm = normalFromHeight(hx, W, W, 1.2, field, 2);
      return { map: tex(c), normalMap: tex(nm, false) };
    });
  },

  // ------------------------------------------------------------- particles / decals
  smokeSprite() {
    return this.get('smokeSprite', () => {
      const W = 128;
      const c = canvas(W, W), ctx = c.getContext('2d');
      const n = new TileNoise(5);
      const img = ctx.createImageData(W, W);
      for (let y = 0; y < W; y++) for (let x = 0; x < W; x++) {
        const dx = (x - W / 2) / (W / 2), dy = (y - W / 2) / (W / 2);
        const r = Math.hypot(dx, dy);
        const f = n.fbm(x / W * 4, y / W * 4, 4, 4);
        const a = clamp((1 - r) * 1.4, 0, 1) ** 1.6 * clamp(f * 1.6 - 0.2, 0, 1);
        const i = (y * W + x) * 4;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = 200 + f * 55;
        img.data[i + 3] = a * 255;
      }
      ctx.putImageData(img, 0, 0);
      return tex(c, true, false);
    });
  },

  softDot() {
    return this.get('softDot', () => {
      const W = 64;
      const c = canvas(W, W), ctx = c.getContext('2d');
      const g = ctx.createRadialGradient(W / 2, W / 2, 0, W / 2, W / 2, W / 2);
      g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.3, 'rgba(255,255,255,0.6)'); g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, W);
      return tex(c, true, false);
    });
  },

  flash() {
    return this.get('flash', () => {
      const W = 128;
      const c = canvas(W, W), ctx = c.getContext('2d');
      ctx.translate(W / 2, W / 2);
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, W / 2);
      g.addColorStop(0, 'rgba(255,250,230,1)'); g.addColorStop(0.2, 'rgba(255,200,110,0.9)'); g.addColorStop(0.6, 'rgba(255,120,30,0.25)'); g.addColorStop(1, 'rgba(255,80,0,0)');
      ctx.fillStyle = g;
      for (let i = 0; i < 6; i++) {
        ctx.rotate(Math.PI / 3);
        ctx.beginPath(); ctx.moveTo(0, -6); ctx.lineTo(W / 2, 0); ctx.lineTo(0, 6); ctx.fill();
      }
      ctx.beginPath(); ctx.arc(0, 0, W / 5, 0, 7); ctx.fill();
      return tex(c, true, false);
    });
  },

  bulletHole() {
    return this.get('bulletHole', () => {
      const W = 64;
      const c = canvas(W, W), ctx = c.getContext('2d');
      const g = ctx.createRadialGradient(W / 2, W / 2, 0, W / 2, W / 2, W / 2);
      g.addColorStop(0, 'rgba(5,5,5,1)'); g.addColorStop(0.18, 'rgba(15,12,10,0.95)'); g.addColorStop(0.35, 'rgba(60,55,50,0.6)'); g.addColorStop(1, 'rgba(60,55,50,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, W);
      ctx.strokeStyle = 'rgba(20,18,16,0.6)';
      const rnd = mulberry32(9);
      for (let i = 0; i < 7; i++) {
        const a = rnd() * 7;
        ctx.beginPath(); ctx.moveTo(W / 2, W / 2); ctx.lineTo(W / 2 + Math.cos(a) * W * 0.4, W / 2 + Math.sin(a) * W * 0.4); ctx.stroke();
      }
      return tex(c, true, false);
    });
  },

  scorch() {
    return this.get('scorch', () => {
      const W = 256;
      const c = canvas(W, W), ctx = c.getContext('2d');
      const n = new TileNoise(17);
      const img = ctx.createImageData(W, W);
      for (let y = 0; y < W; y++) for (let x = 0; x < W; x++) {
        const r = Math.hypot(x - W / 2, y - W / 2) / (W / 2);
        const f = n.fbm(x / W * 6, y / W * 6, 6, 4);
        const a = clamp((1 - r) * 1.5 * (0.5 + f), 0, 0.95);
        const i = (y * W + x) * 4;
        img.data[i] = 12; img.data[i + 1] = 10; img.data[i + 2] = 8; img.data[i + 3] = a * 255;
      }
      ctx.putImageData(img, 0, 0);
      return tex(c, true, false);
    });
  },

  lineMarking() {
    return this.get('lineMarking', () => {
      const W = 256, H = 32;
      const c = canvas(W, H), ctx = c.getContext('2d');
      const n = new TileNoise(3);
      const img = ctx.createImageData(W, H);
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        const f = n.fbm(x / W * 16, y / H * 2, 16, 4);
        const i = (y * W + x) * 4;
        img.data[i] = 220; img.data[i + 1] = 215; img.data[i + 2] = 200;
        img.data[i + 3] = clamp((f - 0.3) * 2.2, 0, 0.85) * 255;
      }
      ctx.putImageData(img, 0, 0);
      return tex(c, true, true);
    });
  },
};
