// Voxel: leitura/escrita do formato .vox do MagicaVoxel, geração a partir de especificação (usada pela IA)
// e conversão em malha otimizada (greedy meshing) exportada como GLB com cores por vértice.
import { Document } from '@gltf-transform/core';
import { writeGlb } from './gltf.js';

const MAX = 256;

export class VoxelGrid {
  constructor(w, h, d, palette = defaultPalette()) {
    if ([w, h, d].some((n) => !Number.isInteger(n) || n < 1 || n > MAX)) throw new Error(`Dimensões voxel inválidas (máx. ${MAX}).`);
    this.w = w; this.h = h; this.d = d;
    this.data = new Uint8Array(w * h * d);
    this.palette = palette; // índice 1..255 → [r,g,b,a]
  }
  idx(x, y, z) { return x + this.w * (y + this.h * z); }
  inside(x, y, z) { return x >= 0 && y >= 0 && z >= 0 && x < this.w && y < this.h && z < this.d; }
  get(x, y, z) { return this.inside(x, y, z) ? this.data[this.idx(x, y, z)] : 0; }
  set(x, y, z, c) { if (this.inside(x, y, z)) this.data[this.idx(x, y, z)] = c; }
  count() { let n = 0; for (const v of this.data) if (v) n++; return n; }
}

export function defaultPalette() {
  const p = [[0, 0, 0, 0]];
  for (let i = 1; i < 256; i++) {
    const h = (i * 137.508) % 360; const l = 0.35 + ((i * 7) % 5) * 0.1;
    const c = (1 - Math.abs(2 * l - 1)) * 0.6; const x = c * (1 - Math.abs(((h / 60) % 2) - 1)); const m = l - c / 2;
    const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
    p.push([Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255), 255]);
  }
  return p;
}

const hexRgb = (h) => { const n = parseInt(String(h).replace('#', ''), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255, 255]; };

// ───────── Formato .vox (MagicaVoxel) ─────────
/** Lê .vox (versão 150/200). Modelos múltiplos são combinados lado a lado no eixo X. Converte Z-up → Y-up. */
export function parseVox(buf) {
  const b = Buffer.from(buf);
  if (b.toString('latin1', 0, 4) !== 'VOX ') throw new Error('Arquivo .vox inválido.');
  let off = 8;
  const models = []; let size = null; let palette = null;
  const readChunk = (o) => ({ id: b.toString('latin1', o, o + 4), content: b.readUInt32LE(o + 4), children: b.readUInt32LE(o + 8), start: o + 12 });
  const main = readChunk(off);
  if (main.id !== 'MAIN') throw new Error('Chunk MAIN ausente no .vox.');
  off = main.start + main.content;
  const end = main.start + main.content + main.children;
  while (off < end && off + 12 <= b.length) {
    const c = readChunk(off);
    if (c.id === 'SIZE') size = [b.readUInt32LE(c.start), b.readUInt32LE(c.start + 4), b.readUInt32LE(c.start + 8)];
    else if (c.id === 'XYZI') {
      const n = b.readUInt32LE(c.start); const vox = [];
      for (let i = 0; i < n; i++) { const p = c.start + 4 + i * 4; vox.push([b[p], b[p + 1], b[p + 2], b[p + 3]]); }
      models.push({ size, voxels: vox });
    } else if (c.id === 'RGBA') {
      palette = [[0, 0, 0, 0]];
      for (let i = 0; i < 255; i++) { const p = c.start + i * 4; palette.push([b[p], b[p + 1], b[p + 2], b[p + 3]]); }
    }
    off = c.start + c.content + c.children;
  }
  if (!models.length) throw new Error('O .vox não contém voxels.');
  const W = models.reduce((s, m) => s + m.size[0], 0) + models.length - 1;
  const H = Math.max(...models.map((m) => m.size[2])); const D = Math.max(...models.map((m) => m.size[1]));
  const grid = new VoxelGrid(Math.min(W, MAX), Math.min(H, MAX), Math.min(D, MAX), palette || defaultPalette());
  let ox = 0;
  for (const m of models) {
    for (const [x, y, z, c] of m.voxels) grid.set(ox + x, z, m.size[1] - 1 - y, c); // Z-up → Y-up
    ox += m.size[0] + 1;
  }
  return grid;
}

/** Exporta para .vox (abre no MagicaVoxel). Y-up → Z-up. */
export function writeVox(grid) {
  const vox = [];
  for (let z = 0; z < grid.d; z++) for (let y = 0; y < grid.h; y++) for (let x = 0; x < grid.w; x++) {
    const c = grid.get(x, y, z); if (c) vox.push([x, grid.d - 1 - z, y, c]);
  }
  const sizeChunk = Buffer.alloc(24); sizeChunk.write('SIZE', 0, 'latin1'); sizeChunk.writeUInt32LE(12, 4); sizeChunk.writeUInt32LE(0, 8);
  sizeChunk.writeUInt32LE(grid.w, 12); sizeChunk.writeUInt32LE(grid.d, 16); sizeChunk.writeUInt32LE(grid.h, 20);
  const xyzi = Buffer.alloc(16 + vox.length * 4); xyzi.write('XYZI', 0, 'latin1'); xyzi.writeUInt32LE(4 + vox.length * 4, 4); xyzi.writeUInt32LE(0, 8); xyzi.writeUInt32LE(vox.length, 12);
  vox.forEach(([x, y, z, c], i) => { xyzi[16 + i * 4] = x; xyzi[17 + i * 4] = y; xyzi[18 + i * 4] = z; xyzi[19 + i * 4] = c; });
  const rgba = Buffer.alloc(12 + 1024); rgba.write('RGBA', 0, 'latin1'); rgba.writeUInt32LE(1024, 4); rgba.writeUInt32LE(0, 8);
  for (let i = 1; i < 256; i++) { const c = grid.palette[i] || [0, 0, 0, 255]; rgba.set(c, 12 + (i - 1) * 4); }
  const children = Buffer.concat([sizeChunk, xyzi, rgba]);
  const head = Buffer.alloc(20); head.write('VOX ', 0, 'latin1'); head.writeUInt32LE(150, 4); head.write('MAIN', 8, 'latin1'); head.writeUInt32LE(0, 12); head.writeUInt32LE(children.length, 16);
  return Buffer.concat([head, children]);
}

// ───────── Especificação (gerada pela IA ou pelo editor) ─────────
/**
 * spec = { size:[w,h,d], palette:{ "a":"#hex", ... }, shapes:[ { type:'box'|'sphere'|'ellipsoid'|'cylinder'|'cone'|'pyramid'|'line'|'voxel',
 *          from:[x,y,z], to:[x,y,z], center:[x,y,z], radius, radii:[rx,ry,rz], height, color:'a', hollow:false, erase:false } ],
 *          layers?: [ { y, rows:[ "aa.b", ... ] } ]   // rows ao longo de z; caracteres = chaves da paleta; '.' vazio }
 */
export function gridFromSpec(spec) {
  const [w, h, d] = spec.size || [16, 16, 16];
  const keys = Object.keys(spec.palette || {});
  if (keys.length > 254) throw new Error('Paleta com mais de 254 cores.');
  const palette = [[0, 0, 0, 0]];
  const map = {};
  keys.forEach((k, i) => { palette.push(hexRgb(spec.palette[k])); map[k] = i + 1; });
  while (palette.length < 256) palette.push([0, 0, 0, 255]);
  const g = new VoxelGrid(w, h, d, palette);
  const colorOf = (s) => { const c = map[s.color]; if (!s.erase && !c) throw new Error(`Cor "${s.color}" não está na paleta.`); return s.erase ? 0 : c; };
  for (const layer of spec.layers || []) {
    layer.rows.forEach((row, z) => [...row].forEach((ch, x) => { if (ch !== '.' && ch !== ' ' && map[ch]) g.set(x, layer.y, z, map[ch]); }));
  }
  for (const s of spec.shapes || []) {
    const c = colorOf(s);
    const shell = (inside, x, y, z) => !s.hollow || !inside(x + 1, y, z) || !inside(x - 1, y, z) || !inside(x, y + 1, z) || !inside(x, y - 1, z) || !inside(x, y, z + 1) || !inside(x, y, z - 1);
    const fill = (inside, [x0, y0, z0], [x1, y1, z1]) => {
      for (let z = Math.max(0, Math.floor(z0)); z <= Math.min(d - 1, Math.ceil(z1)); z++)
        for (let y = Math.max(0, Math.floor(y0)); y <= Math.min(h - 1, Math.ceil(y1)); y++)
          for (let x = Math.max(0, Math.floor(x0)); x <= Math.min(w - 1, Math.ceil(x1)); x++)
            if (inside(x, y, z) && shell(inside, x, y, z)) g.set(x, y, z, c);
    };
    switch (s.type) {
      case 'voxel': g.set(...s.at, c); break;
      case 'box': {
        const [a, b] = [s.from, s.to].map((v) => v.map(Math.round));
        const lo = a.map((v, i) => Math.min(v, b[i])); const hi = a.map((v, i) => Math.max(v, b[i]));
        fill((x, y, z) => x >= lo[0] && x <= hi[0] && y >= lo[1] && y <= hi[1] && z >= lo[2] && z <= hi[2], lo, hi);
        break;
      }
      case 'sphere': case 'ellipsoid': {
        const r = s.radii || [s.radius, s.radius, s.radius]; const [cx, cy, cz] = s.center;
        fill((x, y, z) => ((x - cx) / r[0]) ** 2 + ((y - cy) / r[1]) ** 2 + ((z - cz) / r[2]) ** 2 <= 1, [cx - r[0], cy - r[1], cz - r[2]], [cx + r[0], cy + r[1], cz + r[2]]);
        break;
      }
      case 'cylinder': case 'cone': {
        const [cx, cy, cz] = s.center; const r = s.radius; const hh = s.height;
        fill((x, y, z) => { if (y < cy || y > cy + hh - 1) return false; const rr = s.type === 'cone' ? r * (1 - (y - cy) / hh) : r; return (x - cx) ** 2 + (z - cz) ** 2 <= rr * rr + 0.25; }, [cx - r, cy, cz - r], [cx + r, cy + hh, cz + r]);
        break;
      }
      case 'pyramid': {
        const [cx, cy, cz] = s.center; const r = s.radius; const hh = s.height;
        fill((x, y, z) => { if (y < cy || y > cy + hh - 1) return false; const rr = r * (1 - (y - cy) / hh); return Math.abs(x - cx) <= rr && Math.abs(z - cz) <= rr; }, [cx - r, cy, cz - r], [cx + r, cy + hh, cz + r]);
        break;
      }
      case 'line': {
        const [a, b] = [s.from, s.to]; const n = Math.ceil(Math.max(...a.map((v, i) => Math.abs(b[i] - v)))) || 1;
        for (let i = 0; i <= n; i++) g.set(...a.map((v, k) => Math.round(v + ((b[k] - v) * i) / n)), c);
        break;
      }
      default: throw new Error(`Forma voxel desconhecida: ${s.type}`);
    }
  }
  if (!g.count()) throw new Error('A especificação não gerou nenhum voxel.');
  return g;
}

// ───────── Greedy meshing → GLB ─────────
/** Gera malha mínima: faces visíveis fundidas em retângulos por cor. Unidades: voxelSize metros. */
export function meshGrid(grid, voxelSize = 0.1) {
  const dims = [grid.w, grid.h, grid.d];
  const pos = []; const nor = []; const col = []; const idx = [];
  const lin = (c) => { const v = c / 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  for (let d = 0; d < 3; d++) {
    const u = (d + 1) % 3; const v = (d + 2) % 3;
    const x = [0, 0, 0]; const q = [0, 0, 0]; q[d] = 1;
    const mask = new Int32Array(dims[u] * dims[v]);
    for (x[d] = -1; x[d] < dims[d];) {
      let n = 0;
      for (x[v] = 0; x[v] < dims[v]; x[v]++) {
        for (x[u] = 0; x[u] < dims[u]; x[u]++) {
          const a = x[d] >= 0 ? grid.get(x[0], x[1], x[2]) : 0;
          const b = x[d] < dims[d] - 1 ? grid.get(x[0] + q[0], x[1] + q[1], x[2] + q[2]) : 0;
          mask[n++] = (!!a === !!b) ? 0 : a ? a : -b; // positivo: face +d; negativo: face -d
        }
      }
      x[d]++;
      n = 0;
      for (let j = 0; j < dims[v]; j++) {
        for (let i = 0; i < dims[u];) {
          const c = mask[n];
          if (!c) { i++; n++; continue; }
          let wdt = 1; while (i + wdt < dims[u] && mask[n + wdt] === c) wdt++;
          let hgt = 1; let done = false;
          while (j + hgt < dims[v]) {
            for (let k = 0; k < wdt; k++) if (mask[n + k + hgt * dims[u]] !== c) { done = true; break; }
            if (done) break; hgt++;
          }
          x[u] = i; x[v] = j;
          const du = [0, 0, 0]; du[u] = wdt; const dv = [0, 0, 0]; dv[v] = hgt;
          const base = pos.length / 3;
          const corners = [[0, 0], [1, 0], [1, 1], [0, 1]].map(([a, b2]) => [0, 1, 2].map((k) => (x[k] + du[k] * a + dv[k] * b2) * voxelSize));
          for (const p of corners) pos.push(...p);
          const sign = c > 0 ? 1 : -1; const nrm = [0, 0, 0]; nrm[d] = sign;
          const rgba = grid.palette[Math.abs(c)] || [255, 0, 255, 255];
          for (let k = 0; k < 4; k++) { nor.push(...nrm); col.push(lin(rgba[0]), lin(rgba[1]), lin(rgba[2]), 1); }
          if (sign > 0) idx.push(base, base + 1, base + 2, base, base + 2, base + 3); else idx.push(base, base + 2, base + 1, base, base + 3, base + 2);
          for (let l = 0; l < hgt; l++) for (let k = 0; k < wdt; k++) mask[n + k + l * dims[u]] = 0;
          i += wdt; n += wdt;
        }
      }
    }
  }
  return { positions: new Float32Array(pos), normals: new Float32Array(nor), colors: new Float32Array(col), indices: new Uint32Array(idx) };
}

export async function gridToGlb(grid, { voxelSize = 0.1, name = 'voxel' } = {}) {
  const m = meshGrid(grid, voxelSize);
  const doc = new Document();
  const buffer = doc.createBuffer();
  const acc = (type, array) => doc.createAccessor().setType(type).setArray(array).setBuffer(buffer);
  const mat = doc.createMaterial('voxel').setBaseColorFactor([1, 1, 1, 1]).setRoughnessFactor(0.85).setMetallicFactor(0);
  const prim = doc.createPrimitive().setAttribute('POSITION', acc('VEC3', m.positions)).setAttribute('NORMAL', acc('VEC3', m.normals))
    .setAttribute('COLOR_0', acc('VEC4', m.colors)).setIndices(acc('SCALAR', m.indices)).setMaterial(mat);
  const mesh = doc.createMesh(name).addPrimitive(prim);
  const node = doc.createNode(name).setMesh(mesh).setTranslation([-(grid.w * voxelSize) / 2, 0, -(grid.d * voxelSize) / 2]);
  const scene = doc.createScene('cena').addChild(node);
  doc.getRoot().setDefaultScene(scene);
  return { buffer: await writeGlb(doc), triangles: m.indices.length / 3, voxels: grid.count() };
}
