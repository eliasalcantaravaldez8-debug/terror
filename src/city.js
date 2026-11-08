// Geração da cidade de Los Valles.
// Grade de quarteirões com ruas de mão dupla, faixas de estacionamento, calçadas com meio-fio,
// casas, prédios, lojas (algumas com interior), delegacia, posto, estacionamentos e parques.
import * as THREE from 'three';
import { Batcher, box, plane, gableRoof, cyl, mat } from './geo.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import * as TX from './textures.js';
import { mats, signMat } from './materials.js';
import { rand, rr, pick, setSeed } from './textures.js';
import { inKeepOut, hillHeight, inBlackwood, bwOnRoad } from './places.js';

export const N = 6;            // quarteirões por lado
export const ROAD = 12;        // largura da rua
export const P = 76;           // período (quarteirão + rua)
export const BLOCK = P - ROAD; // 64
export const SW = 4;           // largura da calçada
export const CURB = 0.15;
export const HALF = (N / 2) * P + ROAD / 2; // limite externo das ruas
export const LANE = 1.75;      // deslocamento do centro da faixa
export const PARK_OFF = 4.75;  // faixa de estacionamento
export const roadC = (i) => (i - N / 2) * P;
export const blockC = (j) => roadC(j) + P / 2;

export const X_NAMES = ['Rua das Acácias', 'Av. Los Valles', 'Rua Hidalgo', 'Av. Central', 'Rua Esperança', 'Rua do Porto', 'Rua Velha'];
export const Z_NAMES = ['Rua Monroe', 'Av. Libertad', 'Rua das Palmeiras', 'Rua Cole', 'Rua Ramírez', 'Rua Ocidental', 'Rua Leste'];

// layout[k][j] (k = linha em z, j = coluna em x)
export const LAYOUT = [
  ['res', 'res', 'res', 'res', 'res', 'res'],
  ['res', 'park', 'mixed', 'gas', 'mixed', 'res'],
  ['res', 'shops', 'down', 'down', 'apart', 'res'],
  ['res', 'police', 'down', 'down', 'parking', 'res'],
  ['res', 'hospital', 'mixed', 'shops2', 'park', 'res'],
  ['res', 'res', 'res', 'res', 'res', 'res'],
];

export function onRoadAxis(v) {
  const u = v - roadC(0) + ROAD / 2;
  if (u < 0 || u > N * P + ROAD) return false;
  return (u % P) < ROAD;
}
export function groundHeight(x, z) {
  if (Math.abs(x) <= HALF && Math.abs(z) <= HALF) return (onRoadAxis(x) || onRoadAxis(z)) ? 0 : CURB;
  if (x > 470 && inBlackwood(x, z)) return bwOnRoad(x, z) ? 0 : CURB;
  return CURB + hillHeight(x, z);
}

// Quadro de referência local (rotação em múltiplos de 90°)
export class Frame {
  constructor(x, z, ry, B, world) { this.x = x; this.z = z; this.ry = ry; this.c = Math.cos(ry); this.s = Math.sin(ry); this.B = B; this.world = world; }
  pt(lx, lz) { return [this.x + lx * this.c + lz * this.s, this.z - lx * this.s + lz * this.c]; }
  m(lx, ly, lz, ry = 0, rx = 0, rz = 0, sx = 1, sy = 1, sz = 1) { const [x, z] = this.pt(lx, lz); return mat(x, ly, z, this.ry + ry, rx, rz, sx, sy, sz); }
  add(geo, material, lx, ly, lz, ry = 0, rx = 0, rz = 0) { this.B.add(geo, material, this.m(lx, ly, lz, ry, rx, rz)); }
  // caixa com base em y0 e colisor opcional
  box(material, lx, y0, lz, w, h, d, collide = true, tu = 2, tv = tu) {
    this.B.add(box(w, h, d, tu, tv), material, this.m(lx, y0 + h / 2, lz));
    if (collide) this.collide(lx, y0, lz, w, h, d);
  }
  // sombra de contato (oclusão ambiente falsa) na base de construções
  ao(lx, lz, w, d, W = 1.5) {
    const y = CURB + 0.022, M = mats();
    for (const [ox, oz, len, ry] of [[0, d / 2 + W / 2, w + W, 0], [0, -d / 2 - W / 2, w + W, Math.PI], [w / 2 + W / 2, 0, d + W, Math.PI / 2], [-w / 2 - W / 2, 0, d + W, -Math.PI / 2]])
      this.B.add(plane(len, W, len, W), M.ao, this.m(lx + ox, y, lz + oz, ry));
  }
  collide(lx, y0, lz, w, h, d) {
    const [x, z] = this.pt(lx, lz);
    const swap = Math.abs(this.s) > 0.5;
    const W = swap ? d : w, D = swap ? w : d;
    this.world.addBox(x - W / 2, y0, z - D / 2, x + W / 2, y0 + h, z + D / 2);
  }
}

export class City {
  constructor(scene, world) {
    this.scene = scene; this.world = world;
    this.root = new THREE.Group(); this.root.name = 'LosValles';
    scene.add(this.root);
    this.parkedCars = []; this.npcs = []; this.trees = []; this.shopkeepers = []; this.landmarks = [];
    this.pedLoops = []; this.lamps = [];
    world.groundFn = groundHeight;
    this.M = mats();
    this.chunks = new Map();
  }
  chunk(j, k) {
    const key = Math.floor(j / 2) + ',' + Math.floor(k / 2);
    if (!this.chunks.has(key)) this.chunks.set(key, new Batcher());
    return this.chunks.get(key);
  }

  build() {
    setSeed(20261108);
    this.buildRoads();
    for (let k = 0; k < N; k++) for (let j = 0; j < N; j++) this.buildBlock(j, k, LAYOUT[k][j]);
    this.buildOutskirts();
    // árvores são criadas depois dos locais da história (main.js)
    this.buildStreetParking();
    for (const B of this.chunks.values()) B.flush(this.root);
    this.chunks.clear();
  }

  // ---------------- RUAS ----------------
  buildRoads() {
    const M = this.M; const B = new Batcher();
    for (let a = 0; a <= N; a++) {
      for (let b = 0; b < N; b++) {
        const len = P - ROAD;
        const mid = blockC(b);
        // rua ao longo de Z (x = roadC(a))
        B.add(plane(ROAD, len, ROAD, 12), M.road, mat(roadC(a), 0, mid));
        // rua ao longo de X (z = roadC(a))
        B.add(plane(ROAD, len, ROAD, 12), M.road, mat(mid, 0, roadC(a), Math.PI / 2));
        // tampas de bueiro
        B.add(new THREE.CylinderGeometry(0.42, 0.42, 0.03, 14), M.metalDark, mat(roadC(a) + (rand() < 0.5 ? -1 : 1) * 1.7, 0.012, mid + rr(-20, 20)));
        B.add(new THREE.CylinderGeometry(0.42, 0.42, 0.03, 14), M.metalDark, mat(mid + rr(-20, 20), 0.012, roadC(a) + (rand() < 0.5 ? -1 : 1) * 1.7));
        // faixas de pedestres nas pontas
        for (const s of [-1, 1]) {
          B.add(plane(ROAD, 3, 9.6, 3), M.cross, mat(roadC(a), 0.01, mid + s * (len / 2 - 1.8)));
          B.add(plane(ROAD, 3, 9.6, 3), M.cross, mat(mid + s * (len / 2 - 1.8), 0.01, roadC(a), Math.PI / 2));
        }
      }
      for (let b = 0; b <= N; b++) B.add(plane(ROAD, ROAD, 6), M.asphalt, mat(roadC(a), 0, roadC(b)));
    }
    B.flush(this.root, { castShadow: false });
    // semáforos e placas de rua
    const T = new Batcher();
    for (let a = 0; a <= N; a++) for (let b = 0; b <= N; b++) this.buildIntersection(T, a, b);
    T.flush(this.root);
  }

  buildIntersection(B, a, b) {
    const M = this.M; const ix = roadC(a), iz = roadC(b);
    const dirs = [[0, 1, 'NS'], [0, -1, 'NS'], [1, 0, 'EW'], [-1, 0, 'EW']];
    for (const [fx, fz, grp] of dirs) {
      // veículo vindo de -f indo para +f; existe se o nó anterior existe
      const pa = a - fx, pb = b - fz;
      if (pa < 0 || pa > N || pb < 0 || pb > N) continue;
      const rx = -fz, rz = fx; // direita = (-cos h, sin h) ; para f=(fx,fz) => (-fz?..)
      // direita de f: f x up = (fx,0,fz)x(0,1,0) = (-fz, 0, fx)
      const px = ix - fx * 7.2 + (-fz) * 7.2, pz = iz - fz * 7.2 + fx * 7.2;
      void rx; void rz;
      const h = Math.atan2(-fx, -fz); // cabeça voltada para o motorista que chega
      B.add(cyl(0.09, 0.11, 5.4, 8), M.metalDark, mat(px, CURB + 2.7, pz));
      this.world.addCentered(px, 0, pz, 0.3, 5.6, 0.3);
      // braço sobre a rua
      const ax = px + fz * 5, az = pz - fx * 5;
      B.add(box(0.12, 0.12, 5), M.metalDark, mat((px + ax) / 2, CURB + 4.7, (pz + az) / 2, Math.atan2(fz, -fx)));
      for (const [hx, hz, hy] of [[ax, az, 4.1], [px, pz, 2.9]]) {
        B.add(box(0.36, 1.0, 0.28), M.tlBox, mat(hx, CURB + hy, hz, h));
        for (let i = 0; i < 3; i++) {
          const ox = Math.sin(h) * 0.15, oz = Math.cos(h) * 0.15;
          B.add(new THREE.CylinderGeometry(0.1, 0.1, 0.04, 10), M.tl[grp][i], mat(hx + ox, CURB + hy + 0.3 - i * 0.3, hz + oz, h, Math.PI / 2));
        }
      }
      // placas com nomes das ruas no poste da esquina nordeste
      if (px > ix && pz > iz) {
        if (b < N) B.add(box(1.8, 0.28, 0.03, 1.8, 0.28), signMat(X_NAMES[b], { bg: '#1f6b3a', w: 512, h: 80 }), mat(px - 0.95, CURB + 5.05, pz));
        if (a < N) B.add(box(1.8, 0.28, 0.03, 1.8, 0.28), signMat(Z_NAMES[a], { bg: '#1f6b3a', w: 512, h: 80 }), mat(px, CURB + 5.4, pz - 0.95, Math.PI / 2));
      }
    }
  }

  // ---------------- QUARTEIRÕES ----------------
  buildBlock(j, k, type, cx = blockC(j), cz = blockC(k), B = this.chunk(j, k)) {
    const M = this.M;
    const F = new Frame(cx, cz, 0, B, this.world);
    // base (calçada + meio-fio)
    B.add(box(BLOCK, CURB, BLOCK, 4), M.sidewalk, mat(cx, CURB / 2, cz));
    // meio-fio de pedra (faixa clara na borda)
    for (const [ox, oz, w, d] of [[0, BLOCK / 2 - 0.15, BLOCK, 0.3], [0, -BLOCK / 2 + 0.15, BLOCK, 0.3], [BLOCK / 2 - 0.15, 0, 0.3, BLOCK - 0.6], [-BLOCK / 2 + 0.15, 0, 0.3, BLOCK - 0.6]])
      B.add(box(w + 0.02, CURB + 0.01, d + 0.02, 2), M.concrete, mat(cx + ox, (CURB + 0.01) / 2, cz + oz));
    const inner = BLOCK - SW * 2;
    if (this.extraBuilders && this.extraBuilders[type]) {
      // tipos de quarteirão de outras cidades (Blackwood)
      const g2 = this.extraGround && this.extraGround[type];
      B.add(plane(inner, inner, 4), g2 || M.grass, mat(cx, CURB + 0.005, cz));
      if (!(this.noFurniture && this.noFurniture[type])) this.streetFurniture(F, j, k, type);
      this.extraBuilders[type](F, j, k);
      this.pedLoops.push({ cx, cz, half: BLOCK / 2 - 2.0, type });
      return;
    }
    const ground = { res: M.grass, park: M.grass, apart: M.grass, parking: M.parking, gas: M.concreteFlat }[type] || M.concreteFlat;
    if (type === 'parking') B.add(plane(inner, inner, 3, 5.5), M.parking, mat(cx, CURB + 0.005, cz, Math.PI / 2));
    else B.add(plane(inner, inner, type === 'res' || type === 'park' || type === 'apart' ? 4 : 3), ground, mat(cx, CURB + 0.005, cz));
    this.streetFurniture(F, j, k, type);
    const builders = {
      res: () => this.residential(F, j, k), down: () => this.downtown(F), mixed: () => this.mixed(F),
      shops: () => this.shopsBlock(F, ['Mercado Los Valles', 'Farmácia São Lucas', 'Lanchonete do Joe', 'Ferragens Ramírez']),
      shops2: () => this.shopsBlock(F, ['Loja de Roupas Vega', 'Padaria Aurora', 'Conveniência 24h', 'Eletrônicos Sombra']),
      police: () => this.policeBlock(F), gas: () => this.gasBlock(F), parking: () => this.parkingBlock(F),
      apart: () => this.apartBlock(F), park: () => this.parkBlock(F), hospital: () => this.hospitalBlock(F),
    };
    builders[type]();
    // calçada para pedestres
    const o = BLOCK / 2 - 2.0;
    this.pedLoops.push({ cx, cz, half: o, type });
  }

  streetFurniture(F, j, k, type) {
    const M = this.M; const h = BLOCK / 2;
    // postes de iluminação ao longo das 4 faces
    for (let side = 0; side < 4; side++) {
      const ry = side * Math.PI / 2;
      for (let i = 0; i < 3; i++) {
        const t = -18 + i * 18 + (side % 2 ? 9 : 0) * 0.0;
        const lf = new Frame(F.x, F.z, ry, F.B, this.world);
        // face +z do quarteirão rotacionada
        const lx = t, lz = h - 0.6;
        lf.add(cyl(0.07, 0.11, 6.5, 8), M.metalDark, lx, CURB + 3.25, lz);
        lf.add(box(0.08, 0.08, 1.8), M.metalDark, lx, CURB + 6.4, lz + 0.85);
        lf.add(box(0.45, 0.14, 0.7), M.metalDark, lx, CURB + 6.35, lz + 1.7);
        lf.add(box(0.36, 0.04, 0.55), M.lamp, lx, CURB + 6.27, lz + 1.7);
        { const [wx, wz] = lf.pt(lx, lz + 1.7); this.lamps.push([wx, CURB + 6.15, wz]); }
        lf.collide(lx, 0, lz, 0.3, 6.6, 0.3);
        // halo de luz no chão (aditivo, muito leve)
        F.B.add(plane(11, 11), M.pool, lf.m(lx, 0.03, lz + 2.2));
        // lixeiras, hidrantes, bancos
        if (i === 1 && rand() < 0.6) {
          lf.add(cyl(0.25, 0.22, 0.8, 10), M.green, lx + 2.5, CURB + 0.4, lz);
          lf.collide(lx + 2.5, 0, lz, 0.5, 0.8, 0.5);
        }
        if (i === 0 && rand() < 0.5) {
          lf.add(cyl(0.12, 0.14, 0.6, 8), M.red, lx + 4, CURB + 0.3, lz - 0.2);
          lf.add(new THREE.SphereGeometry(0.13, 8, 6), M.red, lx + 4, CURB + 0.62, lz - 0.2);
          lf.collide(lx + 4, 0, lz - 0.2, 0.35, 0.7, 0.35);
        }
      }
    }
    // ponto de ônibus em alguns quarteirões
    if ((j + k) % 3 === 0 && type !== 'res') {
      const bf = new Frame(F.x, F.z, Math.PI, F.B, this.world);
      const lz = h - 1.4;
      bf.box(M.metal, -1.4, CURB, lz, 0.08, 2.4, 0.08, false); bf.box(M.metal, 1.4, CURB, lz, 0.08, 2.4, 0.08, false);
      bf.box(M.metal, -1.4, CURB, lz - 1.2, 0.08, 2.4, 0.08, false); bf.box(M.metal, 1.4, CURB, lz - 1.2, 0.08, 2.4, 0.08, false);
      bf.box(M.metalLight, 0, CURB + 2.4, lz - 0.6, 3.2, 0.08, 1.6, false);
      bf.add(plane(2.8, 2.2), M.glass, 0, CURB + 1.3, lz - 1.22, 0, Math.PI / 2);
      bf.box(M.woodDark, 0, CURB + 0.45, lz - 1.0, 2.4, 0.08, 0.45, false);
      bf.collide(0, 0, lz - 0.6, 3.0, 2.5, 1.3);
      bf.box(signMat('ÔNIBUS', { bg: '#0b4f8a', w: 256, h: 80 }), 1.9, CURB + 2.2, lz, 0.5, 0.25, 0.03, false, 0.5, 0.25);
    }
  }

  // ---------- CASAS ----------
  house(F, lx, lz, ry, opts = {}) {
    const M = this.M;
    const f = new Frame(...F.pt(lx, lz), ry, F.B, this.world);
    const w = opts.w ?? rr(9, 12), d = opts.d ?? rr(7.5, 9), floors = opts.floors ?? (rand() < 0.45 ? 2 : 1);
    const fh = 2.9, wallH = floors * fh + 0.3;
    const sid = opts.siding ?? pick(M.siding), roofM = pick(M.roof);
    const y0 = CURB;
    // fundação
    f.box(M.concrete, 0, y0, 0, w + 0.3, 0.45, d + 0.3, false);
    f.ao(0, 0, w + 0.3, d + 0.3, 1.3);
    f.box(sid, 0, y0 + 0.45, 0, w, wallH, d, false, 3, 3);
    f.collide(0, 0, 0, w + 0.3, wallH + 2, d + 0.3);
    // rodapé e cantoneiras
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) f.box(M.trim, sx * (w / 2), y0 + 0.45, sz * (d / 2), 0.18, wallH, 0.18, false);
    f.box(M.trim, 0, y0 + 0.45 + wallH - 0.15, 0, w + 0.1, 0.18, d + 0.1, false);
    // telhado
    const rh = rr(1.6, 2.4);
    const roofAlongX = w >= d;
    const rg = roofAlongX ? gableRoof(w, d, rh, 0.5, 2) : gableRoof(d, w, rh, 0.5, 2);
    f.add(rg, roofM, 0, y0 + 0.45 + wallH, 0, roofAlongX ? 0 : Math.PI / 2);
    // chaminé
    if (rand() < 0.45) f.box(M.facade.brick, w * 0.3, y0 + wallH - 0.5, -d * 0.15, 0.7, rh + 1.6, 0.7, false, 3, 3);
    // porta, varanda
    const doorX = opts.doorX ?? rr(-w * 0.25, w * 0.25);
    f.box(M.woodDark, doorX, y0 + 0.45, d / 2 + 0.02, 1.0, 2.1, 0.08, false, 1);
    f.box(M.trim, doorX, y0 + 0.45 + 2.1, d / 2 + 0.03, 1.25, 0.12, 0.1, false);
    f.box(M.metalLight, doorX + 0.35, y0 + 1.45, d / 2 + 0.08, 0.06, 0.06, 0.06, false);
    f.box(M.concrete, doorX, y0, d / 2 + 0.9, 2.6, 0.3, 1.8, false);
    f.box(M.wood, doorX, y0 + 0.3, d / 2 + 0.9, 2.8, 0.1, 1.8, false, 2);
    f.box(M.trim, doorX, y0 + 2.9, d / 2 + 1.0, 3.0, 0.12, 2.0, false);
    for (const s of [-1, 1]) {
      f.box(M.trim, doorX + s * 1.3, y0 + 0.4, d / 2 + 1.7, 0.14, 2.5, 0.14, false);
      f.collide(doorX + s * 1.3, 0, d / 2 + 1.7, 0.25, 2.8, 0.25);
    }
    // janelas
    const winRow = (y, n, face) => {
      for (let i = 0; i < n; i++) {
        const along = face === 'front' || face === 'back' ? w : d;
        const t = -along / 2 + (i + 0.5) * (along / n);
        if (face === 'front' && y < 2 && Math.abs(t - doorX) < 1.6) continue;
        const lit = rand() < 0.5;
        const g = lit ? M.winLit : M.winDark;
        const place = (ax, az, rot) => {
          f.add(box(1.2, 1.3, 0.06), g, ax, y0 + y, az, rot);
          f.add(box(1.4, 0.1, 0.12), M.trim, ax, y0 + y + 0.7, az, rot);
          f.add(box(1.4, 0.12, 0.2), M.trim, ax, y0 + y - 0.7, az, rot);
          f.add(box(0.06, 1.3, 0.1), M.trim, ax, y0 + y, az, rot);
          f.add(box(1.2, 0.06, 0.1), M.trim, ax, y0 + y, az, rot);
          // persianas
          if (rand() < 0.5) for (const s of [-1, 1]) {
            const [ox, oz] = rot === 0 ? [s * 0.85, 0] : [0, s * 0.85];
            f.add(box(0.4, 1.35, 0.05), M.darkTrim, ax + ox, y0 + y, az + oz, rot);
          }
        };
        if (face === 'front') place(t, d / 2 + 0.03, 0);
        else if (face === 'back') place(t, -d / 2 - 0.03, 0);
        else if (face === 'left') place(-w / 2 - 0.03, t, Math.PI / 2);
        else place(w / 2 + 0.03, t, Math.PI / 2);
      }
    };
    for (let fl = 0; fl < floors; fl++) {
      const y = 0.45 + fl * fh + 1.55;
      winRow(y, Math.max(2, Math.round(w / 3)), 'front');
      winRow(y, Math.max(2, Math.round(w / 3.5)), 'back');
      winRow(y, Math.max(1, Math.round(d / 4)), 'left');
      winRow(y, Math.max(1, Math.round(d / 4)), 'right');
    }
    // caminho até a calçada
    const front = opts.front ?? 8;
    f.add(plane(1.4, front), M.concreteFlat, doorX, y0 + 0.012, d / 2 + 1.8 + front / 2);
    // garagem / entrada de carros
    const dx = doorX > 0 ? -w / 2 + 1.8 : w / 2 - 1.8;
    f.add(plane(3.2, front + 2), M.concreteFlat, dx, y0 + 0.012, d / 2 + front / 2 + 1);
    // caixa de correio
    f.box(M.metalDark, doorX + 1.2, y0, d / 2 + 1.8 + front - 0.6, 0.08, 1.0, 0.08, false);
    f.box(M.blue, doorX + 1.2, y0 + 1.0, d / 2 + 1.8 + front - 0.6, 0.25, 0.25, 0.45, false);
    // arbustos
    for (let i = 0; i < 4; i++) {
      const bx = -w / 2 + 0.8 + rand() * (w - 1.6);
      if (Math.abs(bx - doorX) < 1.6 || Math.abs(bx - dx) < 2) continue;
      f.add(new THREE.IcosahedronGeometry(rr(0.45, 0.7), 0), M.hedge, bx, y0 + 0.4, d / 2 + 0.6);
    }
    const [wx, wz] = f.pt(dx, d / 2 + front - 1.5);
    return { frame: f, driveway: [wx, wz], drivewayHeading: ry + Math.PI, w, d, doorX, front };
  }

  residential(F, j, k) {
    const M = this.M; const inner = (BLOCK - SW * 2) / 2; // 28
    const lots = 3, lw = (inner * 2) / lots;
    const f2 = new Frame(F.x, F.z, 0, F.B, this.world);
    for (const side of [1, -1]) {
      const ry = side > 0 ? 0 : Math.PI;
      for (let i = 0; i < lots; i++) {
        const lx = -inner + lw * (i + 0.5);
        const depth = 8.5, front = 8.5;
        const zc = side * (inner - front - depth / 2 - 1.8);
        const isEthan = j === 0 && k === 2 && side === 1 && i === 2;
        const h = this.house(F, lx, zc, ry, { d: depth, front, floors: isEthan ? 2 : undefined, siding: isEthan ? M.siding[1] : undefined, doorX: isEthan ? 1.5 : undefined });
        if (isEthan) {
          this.ethanHouse = { door: h.frame.pt(h.doorX, depth / 2 + 3.5), driveway: h.driveway, heading: h.drivewayHeading };
        } else if (rand() < 0.45) {
          this.parkedCars.push({ x: h.driveway[0], z: h.driveway[1], heading: ry + (rand() < 0.5 ? 0 : Math.PI), type: pick(['sedan', 'hatch', 'suv', 'pickup', 'popular', 'classico', 'besouro', 'luxo']) });
        }
        // cerca baixa da frente com aberturas no caminho e na entrada de carros
        const fz = side * (inner - 0.3);
        const doorW = h.frame.pt(h.doorX, 0)[0] - F.x;
        const driveW = h.driveway[0] - F.x;
        const gaps = [[doorW - 1.0, doorW + 1.0], [driveW - 1.9, driveW + 1.9]].sort((a, b) => a[0] - b[0]);
        let a = lx - lw / 2 + 0.2; const end = lx + lw / 2 - 0.2;
        const segs = [];
        for (const [g0, g1] of gaps) { if (g0 > a) segs.push([a, Math.min(g0, end)]); a = Math.max(a, g1); }
        if (end > a) segs.push([a, end]);
        for (const [s0, s1] of segs) {
          if (s1 - s0 < 0.4) continue;
          const mid = (s0 + s1) / 2, L = s1 - s0;
          f2.box(M.fence, mid, CURB + 0.75, fz, L, 0.08, 0.05, false);
          f2.box(M.fence, mid, CURB + 0.35, fz, L, 0.08, 0.05, false);
          for (let x = s0; x <= s1; x += 0.25) f2.add(box(0.07, 0.95, 0.03), M.fence, x, CURB + 0.47, fz);
          f2.collide(mid, 0, fz, L, 1.0, 0.15);
        }
        if (rand() < 0.8) this.trees.push([F.x + lx + rr(-5, 5), F.z + side * rr(2.5, 6), rr(0.9, 1.4)]);
      }
    }
    // cercas de madeira altas nos fundos e entre os lotes
    f2.box(M.fenceWood, 0, CURB, 0, inner * 2, 1.8, 0.08, true, 2);
    for (let i = 1; i < lots; i++) {
      const x = -inner + lw * i;
      for (const s of [1, -1]) f2.box(M.fenceWood, x, CURB, s * 5, 0.08, 1.8, 9, true, 2);
    }
  }

  // ---------- PRÉDIOS ----------
  building(F, lx, lz, w, d, floors, kind, opts = {}) {
    const M = this.M; const fh = 3.2;
    const y0 = CURB; const H = floors * fh;
    const fac = M.facade[kind];
    const f = new Frame(...F.pt(lx, lz), 0, F.B, this.world);
    f.box(fac, 0, y0, 0, w, H, d, true, 24, 25.6);
    f.ao(0, 0, w + (opts.storefronts?.length ? 0.6 : 0), d + (opts.storefronts?.length ? 0.6 : 0), 1.8);
    // cornija e platibanda
    f.box(M.concrete, 0, y0 + H, 0, w + 0.4, 0.3, d + 0.4, false);
    for (const [ax, az, aw, ad] of [[0, d / 2, w, 0.3], [0, -d / 2, w, 0.3], [w / 2, 0, 0.3, d], [-w / 2, 0, 0.3, d]])
      f.box(M.concrete, ax, y0 + H + 0.3, az, aw, 0.9, ad, false);
    f.box(M.metalDark, 0, y0 + H + 0.05, 0, w - 0.4, 0.05, d - 0.4, false);
    // equipamentos no telhado
    for (let i = 0; i < Math.floor(rr(1, 4)); i++) f.box(M.metalLight, rr(-w / 3, w / 3), y0 + H + 0.3, rr(-d / 3, d / 3), rr(1.2, 2.5), rr(0.8, 1.5), rr(1.2, 2.5), false);
    if (rand() < 0.4) {
      const tx = rr(-w / 4, w / 4), tz = rr(-d / 4, d / 4);
      f.add(cyl(1.3, 1.3, 2.4, 12), M.woodDark, tx, y0 + H + 3.0, tz);
      for (const s of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) f.box(M.metalDark, tx + s[0] * 0.9, y0 + H + 0.3, tz + s[1] * 0.9, 0.12, 1.6, 0.12, false);
    }
    // torre recuada
    if (opts.tower && floors > 8) {
      const tf = Math.floor(rr(3, 7));
      f.box(fac, 0, y0 + H + 0.3, 0, w * 0.6, tf * fh, d * 0.6, true, 24, 25.6);
      f.box(M.concrete, 0, y0 + H + 0.3 + tf * fh, 0, w * 0.6 + 0.3, 0.4, d * 0.6 + 0.3, false);
      if (rand() < 0.6) f.add(cyl(0.05, 0.08, 8, 6), M.metalDark, 0, y0 + H + tf * fh + 4.5, 0);
    }
    // lojas no térreo voltadas para a rua
    for (const face of opts.storefronts || []) this.storefront(f, w, d, face, opts.names);
    return f;
  }

  storefront(f, w, d, face, names) {
    const M = this.M; const y0 = CURB;
    const rot = { s: Math.PI, n: 0, e: Math.PI / 2, w: -Math.PI / 2 }[face];
    const along = face === 'n' || face === 's' ? w : d;
    const depth = face === 'n' || face === 's' ? d : w;
    const sf = new Frame(...f.pt(0, 0), rot, f.B, this.world);
    const n = Math.max(1, Math.floor(along / 9));
    const seg = along / n;
    sf.box(M.darkTrim, 0, y0, depth / 2 + 0.15, along, 3.8, 0.3, false, 2);
    for (let i = 0; i < n; i++) {
      const x = -along / 2 + seg * (i + 0.5);
      sf.add(box(seg - 1.4, 2.4, 0.05, seg - 1.4, 2.4), M.shopWin, x, y0 + 1.6, depth / 2 + 0.32);
      sf.add(box(1.0, 2.2, 0.05), M.glass, x + seg / 2 - 0.55, y0 + 1.1, depth / 2 + 0.33);
      // toldo
      sf.add(box(seg - 0.6, 0.08, 1.6), pick(M.awning), x, y0 + 3.3, depth / 2 + 1.0, 0, 0.3);
      // letreiro
      const name = names && names.length ? names.shift() : pick(['Café Noir', 'Barbearia Sombra', 'Livraria Lua', 'Ótica Visão', 'Pizzaria Napoli', 'Lavanderia', 'Joalheria Ouro', 'Banco Los Valles', 'Hotel Esperanza', 'Cinema Ritz', 'Tabacaria', 'Floricultura', 'Sapataria', 'Bar do Mário', 'Restaurante El Sol']);
      const sm = signMat(name, { bg: pick(['#1a1a1a', '#3b1414', '#14283b', '#2b2b10', '#102b1a']), fg: pick(['#ffd27a', '#ffffff', '#ffb0b0', '#b0e0ff']), glow: true, border: false, w: 512, h: 96 });
      sf.add(box(seg - 1.0, 0.75, 0.08, seg - 1.0, 0.75), sm, x, y0 + 4.2, depth / 2 + 0.36);
    }
  }

  downtown(F) {
    const inner = (BLOCK - SW * 2) / 2 - 0.5;
    const sx = rr(-6, 6), sz = rr(-6, 6), gap = 2;
    const rects = [
      [-inner, sx - gap / 2, -inner, sz - gap / 2, 's', 'w'],
      [sx + gap / 2, inner, -inner, sz - gap / 2, 's', 'e'],
      [-inner, sx - gap / 2, sz + gap / 2, inner, 'n', 'w'],
      [sx + gap / 2, inner, sz + gap / 2, inner, 'n', 'e'],
    ];
    for (const [x0, x1, z0, z1, f1, f2] of rects) {
      const w = x1 - x0, d = z1 - z0;
      this.building(F, (x0 + x1) / 2, (z0 + z1) / 2, w, d, Math.floor(rr(5, 15)), pick(['brick', 'concrete', 'office', 'office', 'apartment', 'plaster']), { storefronts: [f1, f2], tower: rand() < 0.5 });
    }
  }

  mixed(F) {
    const M = this.M; const inner = (BLOCK - SW * 2) / 2 - 0.5;
    // 3 prédios baixos ao sul, estacionamento ao norte
    const n = 3, w = (inner * 2 - 4) / n;
    for (let i = 0; i < n; i++) {
      const x = -inner + w / 2 + i * (w + 2);
      this.building(F, x, -inner + 7, w, 14, Math.floor(rr(2, 5)), pick(['brick', 'plaster', 'concrete', 'apartment']), { storefronts: ['s'] });
    }
    this.parkingLot(F, 0, 9, inner * 2 - 2, 18, 0);
    // pequeno jardim
    F.add(plane(inner * 2, 6, 4), M.grass, 0, CURB + 0.01, -inner + 17);
    for (let i = 0; i < 5; i++) this.trees.push([F.x - inner + 4 + i * 12, F.z - inner + 17, rr(0.8, 1.1)]);
  }

  parkingLot(F, lx, lz, w, d, ry) {
    const M = this.M;
    const f = new Frame(...F.pt(lx, lz), ry, F.B, this.world);
    f.add(plane(w, d, 3, 5.5), M.parking, 0, CURB + 0.008, 0, Math.PI / 2);
    // duas fileiras de vagas
    const cols = Math.floor(w / 3);
    for (const row of [-1, 1]) {
      for (let i = 0; i < cols; i++) {
        if (rand() < 0.62) continue;
        const x = -w / 2 + 1.5 + i * 3;
        const [wx, wz] = f.pt(x, row * (d / 2 - 2.9));
        this.parkedCars.push({ x: wx, z: wz, heading: ry + (row > 0 ? Math.PI : 0) + (rand() < 0.15 ? Math.PI : 0), type: pick(['sedan', 'hatch', 'suv', 'pickup', 'popular', 'luxo', 'coupe', 'taxi', 'besouro', 'classico', rand() < 0.15 ? 'furia' : 'sedan']) });
      }
    }
    // postes do estacionamento
    for (const s of [-1, 1]) {
      f.add(cyl(0.08, 0.1, 7, 8), M.metalDark, s * w / 4, CURB + 3.5, 0);
      f.add(box(1.6, 0.15, 0.4), M.metalDark, s * w / 4, CURB + 7, 0);
      f.add(box(1.4, 0.05, 0.3), M.lamp, s * w / 4, CURB + 6.92, 0);
      { const [wx, wz] = f.pt(s * w / 4, 0); this.lamps.push([wx, CURB + 6.8, wz]); }
      F.B.add(plane(14, 14), M.pool, f.m(s * w / 4, CURB + 0.03, 0));
      f.collide(s * w / 4, 0, 0, 0.3, 7, 0.3);
    }
  }

  // ---------- LOJAS COM INTERIOR ----------
  shopsBlock(F, names) {
    const M = this.M; const inner = (BLOCK - SW * 2) / 2;
    const n = names.length, sw = (inner * 2 - 2) / n, depth = 13, H = 4.2;
    for (let i = 0; i < n; i++) {
      const x = -inner + 1 + sw * (i + 0.5);
      this.shop(F, x, -inner + depth / 2 + 0.5, sw - 0.6, depth, H, names[i], Math.PI);
    }
    this.parkingLot(F, 0, 10, inner * 2 - 2, 18, 0);
    this.trees.push([F.x - inner + 2, F.z + inner - 2, 1], [F.x + inner - 2, F.z + inner - 2, 1.1]);
  }

  // loja com interior visitável. Frente voltada para o lado local +z do frame rotacionado
  shop(F, lx, lz, w, d, H, name, ry) {
    const M = this.M; const y0 = CURB; const t = 0.25;
    const f = new Frame(...F.pt(lx, lz), ry, F.B, this.world);
    const wallMat = pick([M.facade.plaster, M.facade.brick, M.facade.concrete]);
    // piso, teto
    f.add(plane(w, d, 2), M.interiorFloor, 0, y0 + 0.02, 0);
    f.box(M.concrete, 0, y0 + H, 0, w + 0.2, 0.4, d + 0.2, true, 2);
    f.ao(0, 0, w, d, 1.4);
    f.add(plane(w - 0.5, d - 0.5, 4), M.interior, 0, y0 + H - 0.01, 0, 0, Math.PI);
    // luminárias
    for (let i = -1; i <= 1; i += 2) f.add(box(w * 0.5, 0.05, 0.4), M.ceilingLight, 0, y0 + H - 0.05, i * d / 4);
    // paredes (externa = textura de fachada, interna = clara)
    f.box(wallMat, 0, y0, -d / 2 + t / 2, w, H, t, true, 24, 25.6);
    f.box(M.interior, 0, y0, -d / 2 + t + 0.01, w - 0.6, H - 0.1, 0.02, false);
    for (const s of [-1, 1]) {
      f.box(wallMat, s * (w / 2 - t / 2), y0, 0, t, H, d, true, 24, 25.6);
      f.box(M.interior, s * (w / 2 - t - 0.01), y0, 0, 0.02, H - 0.1, d - 0.6, false);
    }
    // frente: vidros + porta aberta no centro
    const door = 1.8; const side = (w - door) / 2;
    for (const s of [-1, 1]) {
      const cx = s * (door / 2 + side / 2);
      f.box(M.darkTrim, cx, y0, d / 2 - 0.1, side, 0.6, 0.2, false);
      f.add(box(side, H - 1.2, 0.04), M.glass, cx, y0 + 0.6 + (H - 1.2) / 2, d / 2 - 0.1);
      f.collide(cx, 0, d / 2 - 0.1, side, H, 0.3);
      f.box(M.darkTrim, s * (door / 2), y0, d / 2 - 0.1, 0.12, H, 0.22, false);
    }
    f.box(M.darkTrim, 0, y0 + H - 0.6, d / 2 - 0.1, w, 0.6, 0.22, false);
    // letreiro e toldo
    const sm = signMat(name, { bg: pick(['#7a1616', '#123a6a', '#1d4a26', '#3b2b12', '#222']), fg: '#fff', glow: true, w: 512, h: 96 });
    f.add(box(w - 0.6, 0.9, 0.1, w - 0.6, 0.9), sm, 0, y0 + H + 0.65, d / 2 + 0.05);
    f.add(box(w - 0.4, 0.08, 1.4), pick(M.awning), 0, y0 + H - 0.75, d / 2 + 0.7, 0, 0.25);
    // balcão
    f.box(M.woodDark, -w / 4, y0, -d / 2 + 3, w / 2, 1.05, 0.8, true, 1);
    f.box(M.metalLight, -w / 4, y0 + 1.05, -d / 2 + 3, w / 2 + 0.1, 0.05, 0.9, false);
    f.box(M.metalDark, -w / 4 - 0.6, y0 + 1.1, -d / 2 + 3, 0.4, 0.3, 0.3, false); // caixa registradora
    // prateleiras
    for (let i = 0; i < 2; i++) {
      const sx = w / 4 + 0.4, sz = -d / 2 + 4.5 + i * 3.2, sl = w / 2 - 1.8;
      f.box(M.wood, sx, y0, sz, sl, 1.8, 0.5, true, 1);
      for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++)
        f.add(box(0.25, 0.3, 0.25), pick([M.red, M.blue, M.green, M.yellow, M.white]), sx - sl / 2 + 0.3 + c * ((sl - 0.6) / 5), y0 + 0.35 + r * 0.6, sz + 0.26);
    }
    // prateleira na parede do fundo
    f.box(M.wood, 0, y0, -d / 2 + 0.55, w - 1, 2.2, 0.5, false, 1);
    // funcionário atrás do balcão
    const [kx, kz] = f.pt(-w / 4, -d / 2 + 1.9);
    this.shopkeepers.push({ x: kx, z: kz, heading: ry, shop: name });
    const [ex, ez] = f.pt(0, d / 2 + 1);
    const [ix, iz] = f.pt(0, 0);
    this.landmarks.push({ name, x: ex, z: ez, kind: 'shop', inside: [ix, iz] });
  }

  policeBlock(F) {
    const M = this.M; const inner = (BLOCK - SW * 2) / 2;
    const f = new Frame(F.x, F.z, 0, F.B, this.world);
    const w = 34, d = 16, H = 7.4;
    const bz = inner - d / 2 - 6; // de frente para +z (Rua)
    f.box(M.facade.concrete, 0, CURB, bz, w, H, d, true, 24, 25.6);
    f.ao(0, bz, w, d, 1.8);
    f.box(M.blue, 0, CURB + 3.2, bz + d / 2 + 0.02, w, 0.5, 0.05, false);
    f.box(M.concrete, 0, CURB + H, bz, w + 0.6, 0.5, d + 0.6, false);
    // entrada com colunas
    f.box(M.concrete, 0, CURB, bz + d / 2 + 2, 10, 0.3, 4, false);
    f.box(M.concrete, 0, CURB + 4.2, bz + d / 2 + 2, 10.4, 0.4, 4.2, false);
    for (const s of [-4.5, -1.6, 1.6, 4.5]) { f.box(M.white, s, CURB + 0.3, bz + d / 2 + 3.7, 0.5, 3.9, 0.5, true); }
    f.box(M.glass, 0, CURB + 0.3, bz + d / 2 + 0.05, 3, 2.8, 0.05, false);
    f.box(signMat('DELEGACIA DE POLÍCIA', { bg: '#0e2a5c', fg: '#fff', glow: true, w: 1024, h: 128 }), 0, CURB + 4.7, bz + d / 2 + 4.12, 9, 0.9, 0.08, false, 9, 0.9);
    f.box(signMat('LOS VALLES', { bg: '#0e2a5c', fg: '#ffd27a', glow: true, w: 512, h: 96 }), 0, CURB + 5.8, bz + d / 2 + 0.06, 6, 0.9, 0.08, false, 6, 0.9);
    // mastro com bandeira
    f.add(cyl(0.06, 0.08, 9, 8), M.metalLight, w / 2 + 3, CURB + 4.5, bz + d / 2 + 5);
    f.add(new THREE.PlaneGeometry(1.8, 1.1), M.flag, w / 2 + 3.95, CURB + 8.3, bz + d / 2 + 5);
    f.collide(w / 2 + 3, 0, bz + d / 2 + 5, 0.3, 9, 0.3);
    this.landmarks.push({ name: 'Delegacia de Los Valles', x: F.x, z: F.z + bz + d / 2 + 6, kind: 'police' });
    this.policeSpot = { x: F.x - 3, z: F.z + bz + d / 2 + 7 };
    // estacionamento de viaturas
    const before = this.parkedCars.length;
    this.parkingLot(F, 0, -10, inner * 2 - 2, 16, 0);
    // as primeiras vagas viram viaturas
    this.parkedCars.slice(before, before + 4).forEach((c) => { c.type = 'police'; });
    for (let i = 0; i < 4; i++) this.npcs.push({ kind: 'police', x: F.x + rr(-12, 12), z: F.z + bz + d / 2 + rr(5, 9) });
  }

  gasBlock(F) {
    const M = this.M; const inner = (BLOCK - SW * 2) / 2;
    const f = new Frame(F.x, F.z, 0, F.B, this.world);
    // cobertura
    const cz = -6;
    f.box(M.white, 0, CURB + 5, cz, 22, 0.8, 12, false);
    f.box(M.red, 0, CURB + 5.4, cz, 22.2, 0.3, 12.2, false);
    f.add(box(20, 0.05, 10), M.ceilingLight, 0, CURB + 4.98, cz);
    F.B.add(plane(24, 16), M.pool, f.m(0, CURB + 0.03, cz));
    for (const x of [-7, 0, 7]) {
      f.box(M.white, x, CURB, cz, 0.6, 5, 0.6, true);
      for (const s of [-1, 1]) {
        f.box(M.concrete, x, CURB, cz + s * 2.5, 1.2, 0.25, 3, false);
        f.box(M.red, x, CURB + 0.25, cz + s * 2.5, 0.8, 1.7, 0.5, true);
        f.box(M.darkTrim, x, CURB + 1.4, cz + s * 2.5 + s * 0.26, 0.5, 0.35, 0.02, false);
      }
    }
    // loja de conveniência
    this.shop(F, 0, 16, 18, 12, 4.2, 'Conveniência Posto Valles', Math.PI);
    // totem
    f.add(cyl(0.2, 0.25, 8, 8), M.metal, -inner + 3, CURB + 4, -inner + 3);
    f.box(signMat('POSTO VALLES', { bg: '#b02020', fg: '#fff', glow: true, w: 512, h: 128 }), -inner + 3, CURB + 7, -inner + 3, 3.2, 1.6, 0.4, false, 3.2, 1.6);
    f.box(signMat('GASOLINA  5,89', { bg: '#111', fg: '#ffcc33', glow: true, w: 512, h: 96 }), -inner + 3, CURB + 5.6, -inner + 3, 3.2, 0.9, 0.42, false, 3.2, 0.9);
    f.collide(-inner + 3, 0, -inner + 3, 0.5, 8, 0.5);
    this.parkedCars.push({ x: F.x + 3.5, z: F.z + cz + 2.5, heading: Math.PI / 2, type: 'hatch' });
    this.landmarks.push({ name: 'Posto Valles', x: F.x, z: F.z + cz, kind: 'gas' });
    for (let i = 0; i < 6; i++) this.trees.push([F.x + inner - 3, F.z - inner + 4 + i * 9, rr(0.8, 1.1)]);
  }

  parkingBlock(F) {
    const M = this.M; const inner = (BLOCK - SW * 2) / 2;
    this.parkingLot(F, 0, -13, inner * 2 - 2, 26, 0);
    this.parkingLot(F, 0, 14, inner * 2 - 2, 24, 0);
    const f = new Frame(F.x, F.z, 0, F.B, this.world);
    f.box(M.facade.plaster, inner - 3, CURB, 0, 3, 2.6, 2.5, true, 24, 25.6);
    f.box(M.red, inner - 3, CURB + 2.6, 0, 3.4, 0.2, 2.9, false);
    f.box(signMat('ESTACIONAMENTO', { bg: '#1b3d6e', glow: true }), inner - 3, CURB + 3.2, 1.3, 3, 0.6, 0.05, false, 3, 0.6);
    this.landmarks.push({ name: 'Estacionamento Central', x: F.x, z: F.z, kind: 'parking' });
    // LOS VALLES CUSTOM: oficina de customização (garagem aberta para leste)
    const gx = -inner + 7, gw = 14, gd = 13, gh = 5.2;
    f.box(M.metal, gx - gw / 2 + 0.15, CURB, 0, 0.3, gh, gd, true, 2);
    f.box(M.metal, gx, CURB, -gd / 2, gw, gh, 0.3, true, 2); f.box(M.metal, gx, CURB, gd / 2, gw, gh, 0.3, true, 2);
    f.box(M.metalDark, gx, CURB + gh, 0, gw + 0.6, 0.35, gd + 0.6, true, 2);
    f.box(M.darkTrim, gx + gw / 2, CURB + gh - 1, 0, 0.3, 1, gd, false);
    f.add(plane(gw - 0.6, gd - 0.6, 2), M.tile, gx, CURB + 0.02, 0);
    for (const z of [-3.5, 3.5]) f.add(box(gw * 0.7, 0.06, 0.5), M.ceilingLight, gx, CURB + gh - 0.08, z);
    f.box(M.yellow, gx, CURB + 0.03, 0, 6, 0.04, 3.2, false); f.box(M.darkTrim, gx, CURB + 0.05, 0, 5.6, 0.04, 2.8, false);
    for (let i = 0; i < 4; i++) f.box(M.red, gx - gw / 2 + 1, CURB, -gd / 2 + 1.2 + i * 1.1, 0.8, 1.1, 0.9, false);
    for (let i = 0; i < 3; i++) f.add(cyl(0.38, 0.38, 0.9, 12), M.metalDark, gx + 4.5, CURB + 0.45, gd / 2 - 1 - i * 0.9);
    f.box(signMat('LOS VALLES CUSTOM', { bg: '#14141a', fg: '#ff7a2a', glow: true, w: 1024, h: 128 }), gx + gw / 2 + 0.2, CURB + gh + 0.6, 0, 0.12, 1.1, 9, false, 9, 1.1);
    f.ao(gx, 0, gw, gd, 1.6);
    { const [lx, lz] = f.pt(gx, 0); this.lamps.push([lx, CURB + gh - 0.3, lz]); }
    { const [ox, oz] = f.pt(gx, 0); this.landmarks.push({ name: 'Los Valles Custom', x: ox, z: oz, kind: 'oficina' }); this.customBay = { x: ox, z: oz, outX: ox + gw / 2 + 6, outZ: oz }; }
    // tira carros estacionados de dentro da garagem
    { const [ox, oz] = f.pt(gx, 0); this.parkedCars = this.parkedCars.filter((pc) => Math.abs(pc.x - ox) > gw / 2 + 3 || Math.abs(pc.z - oz) > gd / 2 + 3); }
  }

  apartBlock(F) {
    const M = this.M; const inner = (BLOCK - SW * 2) / 2 - 1;
    this.building(F, -inner + 9, 0, 16, inner * 2 - 6, Math.floor(rr(5, 8)), 'apartment', { storefronts: ['w'] });
    this.building(F, inner - 9, -inner / 2 - 1, 16, inner - 4, Math.floor(rr(4, 7)), pick(['brick', 'plaster']), { storefronts: ['e', 's'] });
    this.building(F, inner - 9, inner / 2 + 1, 16, inner - 4, Math.floor(rr(4, 7)), pick(['brick', 'apartment']), { storefronts: ['e', 'n'] });
    // pátio
    const f = new Frame(F.x, F.z, 0, F.B, this.world);
    for (let i = 0; i < 3; i++) this.trees.push([F.x + 1, F.z - 16 + i * 16, rr(0.9, 1.2)]);
    for (let i = 0; i < 2; i++) this.bench(f, -2.5, -8 + i * 16, Math.PI / 2);
  }

  hospitalBlock(F) {
    const M = this.M; const inner = (BLOCK - SW * 2) / 2;
    const f = new Frame(F.x, F.z, 0, F.B, this.world);
    const w = 40, d = 22, H = 4 * 3.2, bz = -inner + d / 2 + 4;
    f.box(M.facade.plaster, 0, CURB, bz, w, H, d, true, 24, 25.6);
    f.ao(0, bz, w, d, 1.8);
    f.box(M.white, 0, CURB + H, bz, w + 0.6, 0.6, d + 0.6, false);
    // entrada com marquise (voltada para -z)
    f.box(M.white, 0, CURB + 3.4, bz - d / 2 - 2.5, 12, 0.35, 5, false);
    for (const s of [-5.5, 5.5]) f.box(M.white, s, CURB, bz - d / 2 - 4.6, 0.4, 3.4, 0.4, true);
    f.box(M.glass, 0, CURB, bz - d / 2 - 0.05, 5, 3, 0.06, false);
    f.box(signMat('HOSPITAL LOS VALLES', { bg: '#ffffff', fg: '#b01818', glow: true, w: 1024, h: 128 }), 0, CURB + H - 1.6, bz - d / 2 - 0.08, 14, 1.4, 0.08, false, 14, 1.4);
    // cruz vermelha
    f.box(M.red, 0, CURB + H + 1.2, bz - d / 2 + 0.3, 3, 0.8, 0.3, false); f.box(M.red, 0, CURB + H + 0.4, bz - d / 2 + 0.3, 0.8, 2.4, 0.3, false);
    // ambulância estacionada e área verde
    this.parkingLot(F, 0, 14, inner * 2 - 2, 20, 0);
    const [ex, ez] = f.pt(0, bz - d / 2 - 6);
    this.landmarks.push({ name: 'Hospital Los Valles', x: ex, z: ez, kind: 'hospital' });
    for (let i = 0; i < 4; i++) this.trees.push([F.x - inner + 4 + i * 16, F.z - 2, rr(0.8, 1.1)]);
  }

  bench(f, lx, lz, ry) {
    const M = this.M;
    const b = new Frame(...f.pt(lx, lz), ry, f.B, this.world);
    b.box(M.wood, 0, CURB + 0.42, 0, 1.8, 0.06, 0.45, false, 1);
    b.box(M.wood, 0, CURB + 0.65, -0.22, 1.8, 0.4, 0.05, false, 1);
    for (const s of [-0.8, 0.8]) b.box(M.metalDark, s, CURB, 0, 0.06, 0.45, 0.45, false);
    b.collide(0, 0, 0, 1.9, 0.9, 0.6);
  }

  parkBlock(F) {
    const M = this.M; const inner = (BLOCK - SW * 2) / 2;
    const f = new Frame(F.x, F.z, 0, F.B, this.world);
    // caminhos em cruz
    f.add(plane(3, inner * 2, 3), M.dirt, 0, CURB + 0.012, 0);
    f.add(plane(inner * 2, 3, 3), M.dirt, 0, CURB + 0.012, 0);
    // fonte central
    f.add(cyl(4, 4.2, 0.6, 24), M.concrete, 0, CURB + 0.3, 0);
    f.add(cyl(3.7, 3.7, 0.05, 24), M.water, 0, CURB + 0.52, 0);
    f.add(cyl(0.4, 0.6, 1.8, 10), M.concrete, 0, CURB + 0.9, 0);
    f.add(cyl(1.2, 0.8, 0.25, 14), M.concrete, 0, CURB + 1.8, 0);
    this.world.addCentered(F.x, 0, F.z, 8.2, 0.75, 8.2);
    for (const [x, z, r] of [[8, 4, 0], [-8, -4, Math.PI], [4, -8, -Math.PI / 2], [-4, 8, Math.PI / 2], [12, -4, 0], [-12, 4, Math.PI]]) this.bench(f, x, z, r);
    // árvores
    for (let i = 0; i < 26; i++) {
      const x = rr(-inner + 2, inner - 2), z = rr(-inner + 2, inner - 2);
      if (Math.abs(x) < 3.5 || Math.abs(z) < 3.5 || Math.hypot(x, z) < 7) continue;
      this.trees.push([F.x + x, F.z + z, rr(0.9, 1.6)]);
    }
    // sebes
    for (const s of [-1, 1]) {
      f.box(M.hedge, s * (inner - 0.6), CURB, -inner / 2 - 2, 0.9, 1.0, inner - 6, true, 1);
      f.box(M.hedge, s * (inner - 0.6), CURB, inner / 2 + 2, 0.9, 1.0, inner - 6, true, 1);
    }
    // postes do parque
    for (const [x, z] of [[2.5, 14], [-2.5, -14], [14, -2.5], [-14, 2.5]]) {
      f.add(cyl(0.06, 0.08, 3.8, 8), M.metalDark, x, CURB + 1.9, z);
      f.add(new THREE.SphereGeometry(0.28, 10, 8), M.lamp, x, CURB + 3.9, z);
      { const [wx, wz] = f.pt(x, z); this.lamps.push([wx, CURB + 3.9, wz]); }
      F.B.add(plane(7, 7), M.pool, f.m(x, CURB + 0.03, z));
      f.collide(x, 0, z, 0.25, 4, 0.25);
    }
    this.landmarks.push({ name: 'Praça', x: F.x, z: F.z, kind: 'park' });
  }

  // ---------- ESTACIONAMENTO NA RUA ----------
  buildStreetParking() {
    for (let a = 0; a <= N; a++) for (let b = 0; b < N; b++) {
      const mid = blockC(b);
      for (let i = -2; i <= 2; i++) {
        const t = mid + i * 9 + rr(-1, 1);
        for (const s of [-1, 1]) {
          if (rand() < 0.82) continue;
          // rua ao longo de Z: estacionado no lado direito do sentido de tráfego
          // sentido +z (h=0) tem direita em -x
          const hz = s < 0 ? 0 : Math.PI;
          if (a > 0 && a < N || (a === 0 && s > 0) || (a === N && s < 0)) this.parkedCars.push({ x: roadC(a) + s * PARK_OFF, z: t, heading: hz, type: pick(['sedan', 'hatch', 'suv', 'popular', 'pickup', 'taxi', 'besouro', 'classico', 'luxo', 'coupe']) });
        }
        for (const s of [-1, 1]) {
          if (rand() < 0.84) continue;
          const hx = s > 0 ? Math.PI / 2 : -Math.PI / 2; // sentido +x tem direita em +z
          if (a > 0 && a < N || (a === 0 && s > 0) || (a === N && s < 0)) this.parkedCars.push({ x: t, z: roadC(a) + s * PARK_OFF, heading: hx, type: pick(['sedan', 'hatch', 'suv', 'popular', 'pickup', 'besouro', 'coupe', 'luxo']) });
        }
      }
    }
  }

  // ---------- ARREDORES ----------
  buildOutskirts() {
    const M = this.M; const B = new Batcher();
    const E = HALF, R = 560;
    for (const [x, z, w, d] of [[0, (E + R) / 2, 2 * R, R - E], [0, -(E + R) / 2, 2 * R, R - E], [(E + R) / 2, 0, R - E, 2 * E], [-(E + R) / 2, 0, R - E, 2 * E]])
      B.add(plane(w, d, 4), M.grass, mat(x, CURB, z));
    B.add(plane(300, 1120, 4), M.grass, mat(R + 150, CURB, 0)); // terreno a leste (Blackwood)
    // colinas ao longe (baixo custo, sombreamento plano)
    const hillMat = new THREE.MeshLambertMaterial({ color: 0x3e5a2c, flatShading: true });
    hillMat.userData.castShadow = false;
    for (let i = 0; i < 26; i++) {
      const a = (i / 26) * Math.PI * 2 + rr(-0.1, 0.1), r = rr(470, 520);
      const g = new THREE.ConeGeometry(rr(60, 110), rr(40, 90), 7, 1);
      if (Math.cos(a) * r > 380 && Math.abs(Math.sin(a) * r) < 330) continue; // lado de Blackwood
      B.add(g, hillMat, mat(Math.cos(a) * r, 0, Math.sin(a) * r));
    }
    B.flush(this.root);
    // floresta ao redor da cidade
    for (let i = 0; i < 420; i++) {
      const a = rand() * Math.PI * 2, r = rr(E + 12, E + 200);
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      if (Math.abs(x) > 440 || Math.abs(z) > 440 || inKeepOut(x, z, 6)) continue;
      if (Math.abs(x) < HALF + 8 && Math.abs(z) < HALF + 8) continue; // nunca dentro da cidade/ruas
      // estradas de acesso aos locais
      if (Math.abs(x) < 10 || Math.abs(z) < 10 || Math.abs(z - 76) < 10 || Math.abs(x - 152) < 10 || Math.abs(x + 76) < 10 || Math.abs(x + 152) < 10) continue;
      this.trees.push([x, z, rr(1.0, 1.8), rand() < 0.45]);
    }
    // limites invisíveis
    const L = 448, LE = 836;
    this.world.addBox(-L - 2, 0, -L, -L, 50, L); this.world.addBox(LE, 0, -L, LE + 2, 50, L);
    this.world.addBox(-L, 0, -L - 2, LE, 50, -L); this.world.addBox(-L, 0, L, LE, 50, L + 2);
  }

  buildTrees() {
    // duas espécies: copa arredondada (folhas texturizadas) e pinheiro
    const round = this.trees.filter((t) => !t[3]), pines = this.trees.filter((t) => t[3]);
    const trunkG = new THREE.CylinderGeometry(0.12, 0.24, 3.2, 7); trunkG.translate(0, 1.6, 0);
    const trunk = new THREE.InstancedMesh(trunkG, this.M.bark, this.trees.length);
    const leafTex = TX.leavesTex();
    const leafMat = new THREE.MeshLambertMaterial({ map: leafTex, normalMap: TX.normalOf(leafTex, 3, 'leaves') });
    const leafG = new THREE.IcosahedronGeometry(1, 2);
    // deforma levemente para não parecer esfera perfeita
    const pa = leafG.attributes.position;
    for (let i = 0; i < pa.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(pa, i);
      const k = 1 + Math.sin(v.x * 5.1) * 0.07 + Math.cos(v.y * 4.3 + v.z * 3.7) * 0.07;
      pa.setXYZ(i, v.x * k, v.y * k, v.z * k);
    }
    leafG.computeVertexNormals();
    const leaves = new THREE.InstancedMesh(leafG, leafMat, Math.max(1, round.length * 3));
    const pineParts = [];
    for (let i = 0; i < 4; i++) { const g = new THREE.ConeGeometry(1.5 - i * 0.3, 2.2, 9); g.translate(0, 2.4 + i * 1.25, 0); pineParts.push(g); }
    const pineG = mergeGeometries(pineParts);
    const pine = new THREE.InstancedMesh(pineG, leafMat, Math.max(1, pines.length));
    const m = new THREE.Matrix4(); const c = new THREE.Color(); const q = new THREE.Quaternion();
    let li = 0, ti = 0, pi = 0;
    for (const [x, z, s, isPine] of this.trees) {
      const y = groundHeight(x, z);
      m.compose(new THREE.Vector3(x, y, z), q.identity(), new THREE.Vector3(s, s * rr(0.9, 1.3), s));
      trunk.setMatrixAt(ti++, m);
      if (isPine) {
        q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rand() * 6);
        m.compose(new THREE.Vector3(x, y, z), q, new THREE.Vector3(s, s * rr(1.0, 1.4), s));
        pine.setMatrixAt(pi, m);
        c.setHSL(rr(0.28, 0.36), rr(0.3, 0.45), rr(0.2, 0.28)); pine.setColorAt(pi++, c);
      } else {
        const hue = rr(0.2, 0.3);
        for (let b = 0; b < 3; b++) {
          const ox = rr(-0.8, 0.8) * s, oz = rr(-0.8, 0.8) * s, oy = (2.9 + b * 0.9 + rr(-0.3, 0.3)) * s;
          const ls = s * rr(1.3, 2.0) * (b === 2 ? 0.75 : 1);
          q.setFromEuler(new THREE.Euler(rand(), rand(), rand()));
          m.compose(new THREE.Vector3(x + ox, y + oy, z + oz), q, new THREE.Vector3(ls, ls * 0.85, ls));
          leaves.setMatrixAt(li, m);
          c.setHSL(hue + rr(-0.02, 0.02), rr(0.4, 0.6), rr(0.32, 0.45) - b * 0.03 * -1);
          leaves.setColorAt(li++, c);
        }
      }
      this.world.addCentered(x, 0, z, 0.5 * s, 3, 0.5 * s);
    }
    leaves.count = li; pine.count = pi;
    for (const o of [trunk, leaves, pine]) { o.castShadow = true; o.receiveShadow = true; this.scene.add(o); }
  }
}
