// Geração da cidade de Los Valles.
// Grade de quarteirões com ruas de mão dupla, faixas de estacionamento, calçadas com meio-fio,
// casas, prédios, lojas (algumas com interior), delegacia, posto, estacionamentos e parques.
import * as THREE from 'three';
import { Batcher, box, plane, gableRoof, cyl, mat } from './geo.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import * as TX from './textures.js';
import { mats, signMat, prodMat, homeMat, paint } from './materials.js';
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
  ['res', 'hospital', 'mixed', 'shops2', 'mall', 'res'],
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


// tipo de loja pelo nome (define o interior)
export function shopKind(name) {
  const n = name.toLowerCase();
  if (/cinema/.test(n)) return 'cinema';
  if (/academia/.test(n)) return 'academia';
  if (/café|bar do|restaurante/.test(n)) return 'lanche';
  if (/livraria/.test(n)) return 'livraria';
  if (/joalheria|ótica|sapataria/.test(n)) return 'boutique';
  if (/lavanderia/.test(n)) return 'lavanderia';
  if (/floricultura/.test(n)) return 'floricultura';
  if (/hotel|cinema|banco popular/.test(n)) return 'lobby';
  if (/tabacaria|mercadinho/.test(n)) return 'mercado';
  if (/farmácia/.test(n)) return 'farmacia';
  if (/lanchonete|pizzaria|restaurante/.test(n)) return 'lanche';
  if (/padaria/.test(n)) return 'padaria';
  if (/ferragens/.test(n)) return 'ferragens';
  if (/roupas/.test(n)) return 'roupas';
  if (/eletr/.test(n)) return 'eletronicos';
  if (/barbearia/.test(n)) return 'barbearia';
  if (/antiqu/.test(n)) return 'antiquario';
  if (/banco/.test(n)) return 'banco';
  return 'mercado';
}

export class City {
  constructor(scene, world) {
    this.scene = scene; this.world = world;
    this.root = new THREE.Group(); this.root.name = 'LosValles';
    scene.add(this.root);
    this.parkedCars = []; this.npcs = []; this.trees = []; this.shopkeepers = []; this.landmarks = [];
    this.pedLoops = []; this.lamps = []; this.interiors = []; this.grassRects = []; this.storeRooms = [];
    world.groundFn = groundHeight;
    this.M = mats();
    Batcher.soft.add(this.M.grass); Batcher.soft.add(this.M.ao);
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
      if (!g2 || g2 === M.grass) this.grassRects.push([cx, cz, inner / 2]);
      if (!(this.noFurniture && this.noFurniture[type])) this.streetFurniture(F, j, k, type);
      this.extraBuilders[type](F, j, k);
      this.pedLoops.push({ cx, cz, half: BLOCK / 2 - 2.0, type });
      return;
    }
    const ground = { res: M.grass, park: M.grass, apart: M.grass, parking: M.parking, gas: M.concreteFlat }[type] || M.concreteFlat;
    if (type === 'parking') B.add(plane(inner, inner, 3, 5.5), M.parking, mat(cx, CURB + 0.005, cz, Math.PI / 2));
    else B.add(plane(inner, inner, type === 'res' || type === 'park' || type === 'apart' ? 4 : 3), ground, mat(cx, CURB + 0.005, cz));
    if (ground === M.grass) this.grassRects.push([cx, cz, inner / 2]);
    this.streetFurniture(F, j, k, type);
    const builders = {
      res: () => this.residential(F, j, k), down: () => this.downtown(F), mixed: () => this.mixed(F),
      shops: () => this.shopsBlock(F, ['Mercado Los Valles', 'Farmácia São Lucas', 'Lanchonete do Joe', 'Ferragens Ramírez']),
      shops2: () => this.shopsBlock(F, ['Loja de Roupas Vega', 'Padaria Aurora', 'Conveniência 24h', 'Eletrônicos Sombra']),
      police: () => this.policeBlock(F), gas: () => this.gasBlock(F), parking: () => this.parkingBlock(F),
      apart: () => this.apartBlock(F), park: () => this.parkBlock(F), hospital: () => this.hospitalBlock(F), mall: () => this.mallBlock(F),
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
    const wy = y0 + 0.45, t = 0.2; // piso interno e espessura das paredes
    f.collide(0, 0, 0, w + 0.3, wy, d + 0.3); // piso (sobe-se pela varanda)
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
    // paredes ocas: dá para entrar pela porta da frente (aberta para dentro)
    const wallBox = (lx, lz, bw, bh, bd, by = wy) => { f.box(sid, lx, by, lz, bw, bh, bd, false, 3, 3); f.collide(lx, by === wy ? 0 : by, lz, bw, by === wy ? wy + bh : bh, bd); };
    wallBox(0, -d / 2 + t / 2, w, wallH, t);
    for (const sx of [-1, 1]) wallBox(sx * (w / 2 - t / 2), 0, t, wallH, d - 2 * t);
    const dl = doorX - 0.55 + w / 2, dr = w / 2 - doorX - 0.55;
    wallBox(-w / 2 + dl / 2, d / 2 - t / 2, dl, wallH, t);
    wallBox(w / 2 - dr / 2, d / 2 - t / 2, dr, wallH, t);
    wallBox(doorX, d / 2 - t / 2, 1.1, wallH - 2.2, t, wy + 2.2);
    f.box(M.woodDark, doorX - 0.5 + 0.04, wy, d / 2 - t - 0.5, 0.08, 2.1, 1.0, false, 1); // folha da porta aberta
    f.box(M.metalLight, doorX - 0.5 + 0.1, wy + 1.0, d / 2 - t - 0.9, 0.05, 0.05, 0.05, false);
    f.box(M.trim, doorX, wy + 2.2, d / 2 + 0.03, 1.4, 0.12, 0.1, false);
    for (const s2 of [-1, 1]) f.box(M.trim, doorX + s2 * 0.62, wy, d / 2 + 0.03, 0.1, 2.25, 0.1, false);
    f.box(M.concrete, doorX, y0, d / 2 + 2.0, 1.6, 0.2, 0.45, true); // degrau
    f.collide(doorX, 0, d / 2 + 0.9, 2.6, y0 + 0.4, 1.8); // varanda
    f.box(M.concrete, doorX, y0, d / 2 + 0.9, 2.6, 0.3, 1.8, false);
    f.box(M.wood, doorX, y0 + 0.3, d / 2 + 0.9, 2.8, 0.1, 1.8, false, 2);
    f.box(M.trim, doorX, y0 + 2.9, d / 2 + 1.0, 3.0, 0.12, 2.0, false);
    for (const s of [-1, 1]) {
      f.box(M.trim, doorX + s * 1.3, y0 + 0.4, d / 2 + 1.7, 0.14, 2.5, 0.14, false);
      f.collide(doorX + s * 1.3, 0, d / 2 + 1.7, 0.25, 2.8, 0.25);
    }
    // janelas
    const wins = [];
    const winRow = (y, n, face) => {
      for (let i = 0; i < n; i++) {
        const along = face === 'front' || face === 'back' ? w : d;
        const t = -along / 2 + (i + 0.5) * (along / n);
        if (face === 'front' && y < 2.5 && Math.abs(t - doorX) < 1.6) { rand(); rand(); continue; } // (mantém a sequência aleatória do mundo)
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
        if (y < 2.5) wins.push([face, t]);
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
    const bed = this.houseInterior(f, w, d, wy, fh, t, doorX, wins, opts.owner);
    return { frame: f, driveway: [wx, wz], drivewayHeading: ry + Math.PI, w, d, doorX, front, bed };
  }

  // ---------- INTERIOR DAS CASAS ----------
  // Térreo com sala de estar, cozinha, mesa de jantar, quarto e banheiro. Fica num grupo próprio
  // que só é desenhado quando o jogador está perto (não pesa no resto da cidade).
  // Usa um gerador aleatório próprio (semente pela posição) para não mudar o resto do mundo.
  houseInterior(f0, w, d, wy, fh, t, doorX, wins, owner) {
    const M = this.M; const IB = new Batcher();
    const g = new Frame(f0.x, f0.z, f0.ry, IB, this.world);
    let st = (Math.floor(Math.abs(f0.x * 73.1 + f0.z * 131.7)) % 2147483646) + 1;
    const R = () => (st = (st * 16807) % 2147483647) / 2147483647;
    const RP = (a) => a[Math.floor(R() * a.length)];
    const P = (c) => paint(M.flatIn, c);
    const sub = (lx, lz, ry) => new Frame(...g.pt(lx, lz), g.ry + ry, IB, this.world);
    const xa = -w / 2 + t, xb = w / 2 - t, za = -d / 2 + t, zb = d / 2 - t;
    const rs = doorX >= 0 ? -1 : 1; const RW = w >= 10.5 ? 3.6 : 3.2;
    const px = rs * (w / 2 - t - RW); const zBath = za + 2.2;
    const [mx0, mx1] = rs === 1 ? [xa, px - 0.06] : [px + 0.06, xb];
    const [sx0, sx1] = rs === 1 ? [px + 0.06, xb] : [xa, px - 0.06];
    const ox = rs === 1 ? xa : xb; // parede externa da área social
    const bOuter = rs === 1 ? xb : xa; // parede externa do quarto
    const wallC = RP([0xe8dcc4, 0xd8e4dc, 0xe8d4c8, 0xdcd8e8, 0xf0ead8, 0xc8d8e0]);
    const bedC = RP([0xc8d8e8, 0xe8d0d8, 0xd8e8c8, 0xe8e0c8]);
    const fabric = RP([0x5a6a7a, 0x8a3a2a, 0x3a5a4a, 0x7a6a5a, 0x2a3a5a, 0x9a8a6a]);
    const cab = RP([0xf0ece4, 0x5a7a8a, 0x8a6a4a, 0x3a4a3a]);
    const H = fh - 0.03, DOOR = 2.1;
    // ---- pisos, forro e luminárias ----
    const floor = (x0, x1, z0, z1, m) => g.add(plane(x1 - x0, z1 - z0, 2), m, (x0 + x1) / 2, wy + 0.012, (z0 + z1) / 2);
    floor(mx0, mx1, za, zb, M.interiorWood); floor(sx0, sx1, zBath + 0.06, zb, M.interiorWood); floor(sx0, sx1, za, zBath - 0.06, M.tile);
    g.add(plane(w - 2 * t, d - 2 * t, 4), M.ceiling, 0, wy + fh - 0.02, 0, 0, Math.PI);
    for (const [cx, cz] of [[(mx0 + mx1) / 2, za + 2.4], [(mx0 + mx1) / 2, zb - 2.2], [(sx0 + sx1) / 2, (zBath + zb) / 2], [(sx0 + sx1) / 2, (za + zBath) / 2]])
      g.add(cyl(0.22, 0.28, 0.07, 14), M.ceilingLight, cx, wy + fh - 0.06, cz);
    // ---- revestimento das paredes de cada cômodo (com vãos de porta) ----
    const lineRoom = (x0, x1, z0, z1, m, gaps) => {
      const side = (alongX, fixed, a0, a1, gs, inward) => {
        let cur = a0; const segs = [];
        for (const [ga, gb] of (gs || []).slice().sort((p, q) => p[0] - q[0])) { if (ga > cur) segs.push([cur, ga, 0, H]); segs.push([ga, gb, DOOR, H]); cur = gb; }
        if (a1 > cur) segs.push([cur, a1, 0, H]);
        for (const [p0, p1, h0, h1] of segs) {
          const L = p1 - p0, c = (p0 + p1) / 2; if (L < 0.02) continue;
          if (alongX) { g.box(m, c, wy + h0, fixed + inward * 0.011, L, h1 - h0, 0.02, false); if (!h0) g.box(M.trim, c, wy, fixed + inward * 0.025, L, 0.1, 0.03, false); }
          else { g.box(m, fixed + inward * 0.011, wy + h0, c, 0.02, h1 - h0, L, false); if (!h0) g.box(M.trim, fixed + inward * 0.025, wy, c, 0.03, 0.1, L, false); }
        }
      };
      side(true, z1, x0, x1, gaps.n, -1); side(true, z0, x0, x1, gaps.s, 1); side(false, x0, z0, z1, gaps.w, 1); side(false, x1, z0, z1, gaps.e, -1);
    };
    const bedDoor = [zb - 1.4, zb - 0.45]; const bathDoor = [Math.min(px + rs * 0.3, px + rs * 1.1), Math.max(px + rs * 0.3, px + rs * 1.1)];
    const mainG = { n: [[doorX - 0.55, doorX + 0.55]] }; mainG[rs === 1 ? 'e' : 'w'] = [bedDoor];
    lineRoom(mx0, mx1, za, zb, P(wallC), mainG);
    const bedG = { s: [bathDoor] }; bedG[rs === 1 ? 'w' : 'e'] = [bedDoor];
    lineRoom(sx0, sx1, zBath + 0.06, zb, P(bedC), bedG);
    lineRoom(sx0, sx1, za, zBath - 0.06, P(0xf2f4f4), { n: [bathDoor] });
    // ---- paredes internas (estrutura + colisão) ----
    const wallPiece = (lx, lz, bw, bd, h0 = 0, h1 = fh) => { g.box(P(0xf0ece4), lx, wy + h0, lz, bw, h1 - h0, bd, false); if (!h0) g.collide(lx, wy, lz, bw, h1, bd); };
    // divisória vertical (x = px), vão da porta do quarto
    const vz = [[za, bedDoor[0]], [bedDoor[1], zb]];
    for (const [a, b] of vz) wallPiece(px, (a + b) / 2, 0.12, b - a);
    wallPiece(px, (bedDoor[0] + bedDoor[1]) / 2, 0.12, bedDoor[1] - bedDoor[0], DOOR, fh);
    // divisória do banheiro (z = zBath)
    const bx0 = Math.min(sx0, sx1), bx1 = Math.max(sx0, sx1);
    for (const [a, b] of [[bx0, bathDoor[0]], [bathDoor[1], bx1]]) if (b - a > 0.05) wallPiece((a + b) / 2, zBath, b - a, 0.12);
    wallPiece((bathDoor[0] + bathDoor[1]) / 2, zBath, bathDoor[1] - bathDoor[0], 0.12, DOOR, fh);
    // ---- janelas por dentro: cortina iluminada, varão e cortinas laterais ----
    const curtainC = RP([0xe8e0c8, 0x8a3a2a, 0x3a5a7a, 0xd8c8a8, 0x6a7a5a]);
    for (const [face, tt] of wins) {
      const [lx, lz, ry] = face === 'front' ? [tt, zb - 0.03, 0] : face === 'back' ? [tt, za + 0.03, Math.PI] : face === 'left' ? [xa + 0.03, tt, -Math.PI / 2] : [xb - 0.03, tt, Math.PI / 2];
      const s = sub(lx, lz, ry);
      s.add(box(1.2, 1.3, 0.02, 1.2, 1.3), homeMat('curtain', true), 0, wy + 1.55, 0);
      s.box(M.trim, 0, wy + 0.86, -0.04, 1.4, 0.05, 0.12, false);
      s.box(M.metalDark, 0, wy + 2.32, -0.08, 1.9, 0.03, 0.03, false);
      for (const k of [-1, 1]) s.box(P(curtainC), k * 0.8, wy + 0.7, -0.07, 0.32, 1.62, 0.05, false);
    }
    // ---- móveis ----
    const sofa = (s) => {
      const c = P(fabric), cl = P(fabric + 0x101010);
      s.box(c, 0, wy, 0, 2.0, 0.42, 0.9, false); s.box(c, 0, wy, -0.35, 2.0, 0.88, 0.2, false);
      for (const k of [-1, 1]) { s.box(c, k * 0.92, wy, 0, 0.16, 0.62, 0.9, false); s.box(cl, k * 0.42, wy + 0.42, 0.07, 0.8, 0.12, 0.68, false); s.box(cl, k * 0.42, wy + 0.42, -0.2, 0.8, 0.42, 0.14, false); }
      s.box(P(RP([0xd8a01a, 0xc8c0b0, 0xb02a2a, 0x2a5a8a])), 0.62, wy + 0.54, -0.08, 0.32, 0.3, 0.1, false);
      s.collide(0, wy, 0, 2.0, 0.88, 0.9);
    };
    const tvSet = (s) => {
      s.box(M.woodDark, 0, wy, 0, 1.7, 0.5, 0.45, false, 1);
      s.box(M.metalDark, 0, wy + 0.5, -0.02, 0.3, 0.05, 0.2, false); s.box(M.metalDark, 0, wy + 0.55, -0.02, 0.05, 0.12, 0.05, false);
      s.box(M.metalDark, 0, wy + 0.65, -0.03, 1.32, 0.78, 0.05, false);
      s.add(box(1.24, 0.7, 0.01, 1.24, 0.7), homeMat('tvhome', true), 0, wy + 1.04, 0.0);
      s.box(M.metalDark, -0.6, wy + 0.5, 0.05, 0.25, 0.08, 0.2, false); // aparelho de som
      s.collide(0, wy, 0, 1.7, 1.45, 0.45);
    };
    const shelf = (s) => {
      s.box(M.woodDark, 0, wy, -0.15, 1.0, 1.9, 0.04, false, 1);
      for (const k of [-1, 1]) s.box(M.woodDark, k * 0.48, wy, 0, 0.04, 1.9, 0.34, false, 1);
      for (let r = 0; r < 5; r++) {
        s.box(M.woodDark, 0, wy + 0.02 + r * 0.44, 0, 0.92, 0.03, 0.32, false, 1);
        if (r < 4) s.add(box(0.9, 0.36, 0.22, 0.9, 0.36), homeMat('books'), 0, wy + 0.23 + r * 0.44, -0.03);
      }
      s.collide(0, wy, 0, 1.0, 1.9, 0.36);
    };
    const plant = (lx, lz) => { g.add(cyl(0.18, 0.13, 0.4, 10), P(0xa8582a), lx, wy + 0.2, lz); g.add(new THREE.IcosahedronGeometry(0.38, 0), M.hedge, lx, wy + 0.75, lz); g.add(new THREE.IcosahedronGeometry(0.26, 0), M.hedge, lx + 0.1, wy + 1.05, lz - 0.05); g.collide(lx, wy, lz, 0.4, 0.8, 0.4); };
    const lamp = (lx, lz) => { g.add(cyl(0.16, 0.16, 0.03, 12), M.metalDark, lx, wy + 0.02, lz); g.add(cyl(0.02, 0.02, 1.5, 6), M.metalDark, lx, wy + 0.77, lz); g.add(cyl(0.16, 0.24, 0.3, 12), homeMat('curtain', true), lx, wy + 1.6, lz); };
    const painting = (s, key, y = 1.7, pw = 0.8, ph = 0.6) => { s.box(M.woodDark, 0, wy + y - ph / 2 - 0.04, 0.0, pw + 0.08, ph + 0.08, 0.03, false); s.add(box(pw, ph, 0.01, pw, ph), homeMat(key), 0, wy + y, 0.02); };
    const rug = (lx, lz, rw, rd, key) => g.add(plane(rw, rd, rw, rd), homeMat(key), lx, wy + 0.016, lz);
    // ---- área social: cozinha (fundo), jantar e sala (frente) ----
    const mcx = (mx0 + mx1) / 2, MW = mx1 - mx0, kd = rs; // cozinha vai da parede externa para a divisória
    const KL = Math.min(MW - 0.6, 4.1);
    const kz = za + 0.32; let kp = 0;
    const kx = (wid) => ox + kd * (kp + wid / 2);
    const counterTop = P(RP([0x2a2a2c, 0x5a5048, 0xd8d4cc]));
    const counter = (wid, sink = false, micro = false) => {
      const x = kx(wid); g.box(P(cab), x, wy, kz, wid - 0.01, 0.86, 0.6, false);
      g.box(counterTop, x, wy + 0.86, kz + 0.01, wid, 0.04, 0.64, false);
      g.box(M.metalLight, x, wy + 0.72, kz + 0.31, 0.3, 0.03, 0.02, false);
      if (sink) { g.box(M.metalLight, x, wy + 0.895, kz + 0.04, 0.55, 0.02, 0.4, false); g.add(cyl(0.02, 0.02, 0.3, 6), M.metalLight, x, wy + 1.05, kz - 0.2); g.box(M.metalLight, x, wy + 1.18, kz - 0.12, 0.03, 0.03, 0.18, false); }
      if (micro) { g.box(M.metalDark, x, wy + 0.9, kz - 0.05, 0.5, 0.3, 0.36, false); g.add(box(0.3, 0.2, 0.01), P(0x1a1a1a), x - 0.05, wy + 1.05, kz + 0.135); }
      kp += wid;
    };
    { const x = kx(0.8); g.add(box(0.78, 1.85, 0.68, 0.78, 1.85), homeMat('fridge'), x, wy + 0.925, kz + 0.02); kp += 0.8; }
    counter(0.6, false, true);
    { const x = kx(0.75); g.add(box(0.74, 0.86, 0.6, 0.74, 0.86), homeMat('oven'), x, wy + 0.43, kz); g.add(box(0.74, 0.03, 0.6, 0.74, 0.6), homeMat('stove'), x, wy + 0.875, kz); g.box(M.metalDark, x, wy + 1.6, kz - 0.05, 0.7, 0.18, 0.45, false); kp += 0.75; }
    while (kp < KL - 0.55) counter(Math.min(0.9, KL - kp), kp > 1.9 && kp < 2.9);
    g.add(box(kp - 0.8, 0.55, 0.02, kp - 0.8, 0.55), homeMat('tiles'), ox + kd * (0.8 + (kp - 0.8) / 2), wy + 1.18, za + 0.012);
    g.collide(ox + kd * kp / 2, wy, kz, kp, 0.9, 0.66);
    // mesa de jantar com 4 cadeiras e fruteira
    { const tz = za + 2.45, tx = mcx; const tm = M.wood;
      g.box(tm, tx, wy + 0.72, tz, 1.4, 0.05, 0.85, false, 1);
      for (const [a, b] of [[-0.62, -0.35], [0.62, -0.35], [-0.62, 0.35], [0.62, 0.35]]) g.box(M.woodDark, tx + a, wy, tz + b, 0.06, 0.72, 0.06, false);
      for (const [a, side] of [[-0.35, -1], [0.35, -1], [-0.35, 1], [0.35, 1]]) {
        const cz = tz + side * 0.62; g.box(M.woodDark, tx + a, wy + 0.43, cz, 0.42, 0.04, 0.42, false, 1);
        g.box(M.woodDark, tx + a, wy + 0.47, cz + side * 0.19, 0.42, 0.5, 0.04, false, 1);
        for (const [la, lb] of [[-0.18, -0.18], [0.18, -0.18], [-0.18, 0.18], [0.18, 0.18]]) g.box(M.woodDark, tx + a + la, wy, cz + lb, 0.035, 0.43, 0.035, false);
      }
      g.add(cyl(0.16, 0.1, 0.08, 12), M.white, tx, wy + 0.79, tz);
      for (const [a, b, c] of [[0, 0, 0xc41a1a], [0.07, 0.04, 0xf2c21a], [-0.06, 0.05, 0x4ab02a], [0.02, -0.07, 0xf08a10]]) g.add(new THREE.SphereGeometry(0.05, 8, 6), P(c), tx + a, wy + 0.87, tz + b);
      g.collide(tx, wy, tz, 1.5, 0.78, 1.95);
      rug(tx, tz, 2.2, 2.4, 'rug' + Math.floor(R() * 4));
    }
    // sala: sofá na parede externa, TV na divisória, mesa de centro e tapete
    const sofaZ = 1.4;
    sofa(sub(ox + rs * 0.5, sofaZ, rs * Math.PI / 2));
    tvSet(sub(px - rs * 0.3, sofaZ, -rs * Math.PI / 2));
    { const cx = ox + rs * 1.6; g.box(M.wood, cx, wy + 0.38, sofaZ, 0.55, 0.05, 1.0, false, 1);
      for (const [a, b] of [[-0.22, -0.44], [0.22, -0.44], [-0.22, 0.44], [0.22, 0.44]]) g.box(M.woodDark, cx + a, wy, sofaZ + b, 0.05, 0.38, 0.05, false);
      g.box(homeMat('books'), cx, wy + 0.43, sofaZ - 0.2, 0.25, 0.04, 0.32, false, 0.25, 0.04);
      g.add(cyl(0.06, 0.05, 0.1, 10), P(0xf2f2f2), cx + 0.05, wy + 0.48, sofaZ + 0.25);
      g.collide(cx, wy, sofaZ, 0.6, 0.43, 1.05);
      rug(ox + rs * 1.7, sofaZ, 2.0, 2.8, 'rug' + Math.floor(R() * 4)); }
    lamp(ox + rs * 0.35, sofaZ + 1.35);
    plant(ox + rs * 0.4, zb - 0.45);
    shelf(sub(px - rs * 0.24, -0.4, -rs * Math.PI / 2));
    painting(sub(px - rs * 0.075, za + 2.45, -rs * Math.PI / 2), 'art' + Math.floor(R() * 8), 1.65, 1.0, 0.7);
    painting(sub(px - rs * 0.075, sofaZ, -rs * Math.PI / 2), 'photo', 1.95, 0.9, 0.42);
    // ---- quarto ----
    const bedZ = (zBath + zb) / 2 + 0.2;
    { const s = sub(bOuter - rs * 1.07, bedZ, -rs * Math.PI / 2); const wd = M.woodDark;
      s.box(wd, 0, wy, 0, 1.5, 0.35, 2.05, false, 1);
      s.box(P(0xf4f2ec), 0, wy + 0.35, 0.02, 1.42, 0.2, 1.95, false);
      s.add(box(1.5, 0.06, 1.4, 1.5, 1.4), homeMat('quilt' + Math.floor(R() * 4)), 0, wy + 0.58, 0.32);
      for (const k of [-1, 1]) s.box(P(0xffffff), k * 0.36, wy + 0.55, -0.72, 0.58, 0.14, 0.36, false);
      s.box(wd, 0, wy, -1.04, 1.6, 0.95, 0.08, false, 1);
      s.collide(0, wy, 0, 1.6, 0.62, 2.12);
      painting(sub(bOuter - rs * 0.025, bedZ - 0.35, -rs * Math.PI / 2), 'art' + Math.floor(R() * 8), 1.7, 0.9, 0.55);
      // criado-mudo com abajur e porta-retrato
      const nx = bOuter - rs * 0.28, nz = bedZ - 1.05;
      g.box(M.wood, nx, wy, nz, 0.45, 0.52, 0.42, true, 1);
      g.add(cyl(0.06, 0.08, 0.2, 10), P(0x3a3a3a), nx, wy + 0.62, nz); g.add(cyl(0.1, 0.16, 0.2, 12), homeMat('curtain', true), nx, wy + 0.8, nz);
      g.add(box(0.14, 0.1, 0.02, 0.14, 0.1), homeMat('photo'), nx + rs * 0.0, wy + 0.58, nz + 0.12);
      rug(bOuter - rs * 1.4, bedZ, 2.4, 2.2, 'rug' + Math.floor(R() * 4));
    }
    // guarda-roupa encostado na parede do banheiro
    { const s = sub(bOuter - rs * 0.8, zBath + 0.06 + 0.31, 0);
      s.box(M.woodDark, 0, wy, 0, 1.3, 2.05, 0.6, false, 1);
      s.box(P(0x1a1410), 0, wy + 0.05, 0.305, 0.015, 1.95, 0.01, false);
      for (const k of [-1, 1]) s.box(M.metalLight, k * 0.08, wy + 1.0, 0.31, 0.03, 0.25, 0.03, false);
      s.collide(0, wy, 0, 1.3, 2.05, 0.6); }
    // ---- banheiro ----
    { const tx = bOuter - rs * 0.42, tz = za + 0.42;
      g.add(cyl(0.17, 0.14, 0.4, 12), M.white, tx, wy + 0.2, tz + 0.05); g.add(cyl(0.2, 0.2, 0.04, 14), M.white, tx, wy + 0.42, tz + 0.05);
      g.box(M.white, tx, wy + 0.3, za + 0.12, 0.42, 0.42, 0.18, false); g.collide(tx, wy, tz, 0.5, 0.75, 0.75);
      const sx = (bOuter + px) / 2 + rs * 0.2;
      g.add(cyl(0.08, 0.1, 0.78, 10), M.white, sx, wy + 0.39, za + 0.28); g.box(M.white, sx, wy + 0.78, za + 0.25, 0.55, 0.12, 0.42, false);
      g.add(cyl(0.015, 0.015, 0.15, 6), M.metalLight, sx, wy + 0.95, za + 0.1);
      g.add(box(0.6, 0.8, 0.02, 0.6, 0.8), homeMat('mirror'), sx, wy + 1.55, za + 0.015);
      g.collide(sx, wy, za + 0.25, 0.6, 0.9, 0.45);
      // box do chuveiro no canto da divisória
      const shx = px + rs * 0.53;
      g.box(M.white, shx, wy, za + 0.47, 0.9, 0.06, 0.9, false);
      g.add(box(0.9, 1.9, 0.01, 0.9, 1.9), homeMat('bathtile'), shx, wy + 1.0, za + 0.015);
      g.add(box(0.9, 1.9, 0.02), M.glass, shx, wy + 1.0, za + 0.93);
      g.add(cyl(0.08, 0.08, 0.03, 10), M.metalLight, shx, wy + 2.0, za + 0.25);
      g.collide(shx, wy, za + 0.47, 0.92, 1.95, 0.94);
      g.box(P(RP([0x3a6aa8, 0xf2f2f2, 0xd88a3a])), tx + rs * 0.0, wy + 0.016, zBath - 0.5, 0.6, 0.01, 0.4, false); // tapetinho
    }
    const grp = new THREE.Group(); grp.name = 'interior';
    IB.flush(grp, { castShadow: false });
    grp.visible = false; this.root.add(grp);
    this.interiors.push({ group: grp, x: f0.x, z: f0.z, rooms: { quarto: g.pt((sx0 + sx1) / 2, (zBath + zb) / 2), banheiro: g.pt((sx0 + sx1) / 2, (za + zBath) / 2), sala: g.pt((mx0 + mx1) / 2, 1.4), cozinha: g.pt((mx0 + mx1) / 2, za + 2.4) } });
    return g.pt(bOuter - rs * 1.07, bedZ);
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
        const h = this.house(F, lx, zc, ry, { d: depth, front, floors: isEthan ? 2 : undefined, siding: isEthan ? M.siding[1] : undefined, doorX: isEthan ? 1.5 : undefined, owner: isEthan });
        if (isEthan) {
          this.ethanHouse = { door: h.frame.pt(h.doorX, depth / 2 + 3.5), driveway: h.driveway, heading: h.drivewayHeading, bed: h.bed };
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
    const sfs = opts.storefronts || []; const GF = sfs.length ? 4.0 : 0; let core = null;
    if (!GF) f.box(fac, 0, y0, 0, w, H, d, true, 24, 25.6);
    else {
      // andares de cima inteiros; no térreo, um núcleo sólido e lojas visitáveis junto às fachadas com vitrine
      f.box(fac, 0, y0 + GF, 0, w, H - GF, d, false, 24, 25.6); f.collide(0, y0 + GF, 0, w, H - GF, d);
      const sd = Math.max(4.5, Math.min(8, Math.min(w, d) / 2 - 1));
      let x0 = -w / 2, x1 = w / 2, z0 = -d / 2, z1 = d / 2;
      if (sfs.includes('w')) x0 += sd; if (sfs.includes('e')) x1 -= sd; if (sfs.includes('s')) z0 += sd; if (sfs.includes('n')) z1 -= sd;
      f.box(fac, (x0 + x1) / 2, y0, (z0 + z1) / 2, x1 - x0, GF, z1 - z0, true, 24, 25.6);
      core = { x0, x1, z0, z1, sd, GF, IB: new Batcher() };
    }
    f.ao(0, 0, w + (sfs.length ? 0.6 : 0), d + (sfs.length ? 0.6 : 0), 1.8);
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
    for (const face of sfs) this.storefront(f, w, d, face, opts.names, core);
    if (core) { const grp = new THREE.Group(); grp.name = 'interior'; core.IB.flush(grp, { castShadow: false }); grp.visible = false; this.root.add(grp); this.interiors.push({ group: grp, x: f.x, z: f.z }); }
    return f;
  }

  storefront(f, w, d, face, names, core = null) {
    const M = this.M; const y0 = CURB;
    const rot = { s: Math.PI, n: 0, e: Math.PI / 2, w: -Math.PI / 2 }[face];
    const along = face === 'n' || face === 's' ? w : d;
    const depth = face === 'n' || face === 's' ? d : w;
    const sf = new Frame(...f.pt(0, 0), rot, f.B, this.world);
    // faixa ao longo da fachada ocupada por lojas (nas fachadas leste/oeste, só entre o núcleo)
    let a0 = -along / 2, a1 = along / 2;
    if (core && (face === 'e' || face === 'w')) { const z0 = core.z0, z1 = core.z1; [a0, a1] = face === 'e' ? [-z1, -z0] : [z0, z1]; }
    const alongUse = a1 - a0;
    const n = Math.max(1, Math.floor(alongUse / 8.5));
    const seg = alongUse / n;
    if (!core) sf.box(M.darkTrim, 0, y0, depth / 2 + 0.15, along, 3.8, 0.3, false, 2);
    else sf.box(M.darkTrim, 0, y0 + 3.4, depth / 2 + 0.15, along, 0.6, 0.3, false, 2); // viga sobre as vitrines
    for (let i = 0; i < n; i++) {
      const x = a0 + seg * (i + 0.5);
      if (core) this.storeRoom(sf, x, depth / 2, seg, core, names, i);
      else {
        sf.add(box(seg - 1.4, 2.4, 0.05, seg - 1.4, 2.4), M.shopWin, x, y0 + 1.6, depth / 2 + 0.32);
        sf.add(box(1.0, 2.2, 0.05), M.glass, x + seg / 2 - 0.55, y0 + 1.1, depth / 2 + 0.33);
      }
      // toldo
      sf.add(box(seg - 0.6, 0.08, 1.6), pick(M.awning), x, y0 + 3.3, depth / 2 + 1.0, 0, 0.3);
      // letreiro
      const name = (core && core.lastName) || (names && names.length ? names.shift() : pick(['Café Noir', 'Barbearia Sombra', 'Livraria Lua', 'Ótica Visão', 'Pizzaria Napoli', 'Lavanderia', 'Joalheria Ouro', 'Banco Popular', 'Hotel Esperanza', 'Cinema Ritz', 'Tabacaria', 'Floricultura', 'Sapataria', 'Bar do Mário', 'Restaurante El Sol'])); if (core) core.lastName = null;
      const sm = signMat(name, { bg: pick(['#1a1a1a', '#3b1414', '#14283b', '#2b2b10', '#102b1a']), fg: pick(['#ffd27a', '#ffffff', '#ffb0b0', '#b0e0ff']), glow: true, border: false, w: 512, h: 96 });
      sf.add(box(seg - 1.0, 0.75, 0.08, seg - 1.0, 0.75), sm, x, y0 + 4.2, depth / 2 + 0.36);
    }
  }

  // LOJA DE RUA visitável no térreo: vidro, porta, divisórias e interior conforme o nome
  storeRoom(sf, x, faceZ, seg, core, names, idx) {
    const M = this.M, y0 = core.y0 ?? CURB, GF = core.GF, sd = core.sd;
    const name = names && names.length ? names.shift() : this.nextStoreName();
    core.lastName = name; const kind = shopKind(name);
    // fachada (no bloco da cidade): rodapé, vidros dos dois lados da porta, montantes e verga
    const door = 1.6, gw = (seg - door) / 2 - 0.25, fz = faceZ - 0.1;
    for (const s of [-1, 1]) {
      const cx = x + s * (door / 2 + gw / 2);
      sf.box(M.darkTrim, cx, y0, fz, gw, 0.5, 0.2, false);
      sf.add(box(gw, 2.6, 0.04), M.glass, cx, y0 + 0.5 + 1.3, fz); sf.collide(cx, y0, fz, gw, GF, 0.3);
      sf.box(M.darkTrim, x + s * (door / 2), y0, fz, 0.12, 3.4, 0.22, false);
      sf.box(M.darkTrim, x + s * (seg / 2 - 0.12), y0, fz, 0.25, 3.4, 0.3, true);
    }
    sf.box(M.darkTrim, x, y0 + 3.1, fz, seg, 0.3, 0.22, false);
    // divisórias entre as lojas e paredes laterais
    for (const s of [-1, 1]) { sf.box(M.facade.concrete, x + s * (seg / 2 - 0.06), y0, faceZ - sd / 2, 0.12, GF, sd - 0.2, true, 24, 25.6); }
    // interior (grupo separado: só desenhado de perto)
    const r = new Frame(...sf.pt(x, faceZ - sd / 2), sf.ry, core.IB, this.world);
    const w = seg - 0.4, d = sd - 0.3;
    r.add(plane(w, d, 2), ['boutique', 'livraria', 'lobby'].includes(kind) ? M.interiorWood : M.interiorFloor, 0, y0 + 0.03, 0);
    r.add(plane(w, d, 4), M.ceiling, 0, y0 + GF - 0.03, 0, 0, Math.PI);
    r.add(box(w * 0.5, 0.05, 0.35), M.ceilingLight, 0, y0 + GF - 0.06, 0);
    for (const sx of [-1, 1]) r.box(M.interior, sx * (w / 2 - 0.01), y0, 0, 0.02, GF - 0.1, d, false);
    r.box(M.interior, 0, y0, -d / 2 + 0.02, w, GF - 0.1, 0.02, false);
    const kp = this.storeInterior(r, kind, w, d, y0) || [-w / 4, -d / 2 + 0.75, 0];
    const [kx, kz] = r.pt(kp[0], kp[1]); const [ex, ez] = r.pt(0, d / 2 + 1);
    this.storeRooms.push({ x: kx, z: kz, y: core.y0 !== undefined ? y0 : undefined, heading: r.ry + kp[2], name, kind, door: [ex, ez] });
    this.landmarks.push({ name, x: ex, z: ez, kind: 'shop' });
  }
  // nomes das lojas de rua: lista embaralhada (sem repetir seguidos)
  nextStoreName() {
    if (!this.namePool || !this.namePool.length) {
      const base = ['Café Noir', 'Barbearia Sombra', 'Livraria Lua', 'Ótica Visão', 'Pizzaria Napoli', 'Lavanderia Bolha', 'Joalheria Ouro', 'Banco Popular', 'Hotel Esperanza', 'Cinema Ritz', 'Tabacaria Fumaça', 'Floricultura Jardim', 'Sapataria Passo', 'Bar do Mário', 'Restaurante El Sol', 'Café Central', 'Pizzaria Bella', 'Livraria Página', 'Ótica Foco', 'Joalheria Brilho', 'Sapataria Elegance', 'Hotel Plaza', 'Bar da Esquina', 'Restaurante Sabor', 'Barbearia Navalha', 'Lavanderia Limpinho', 'Floricultura Rosa', 'Café Aroma', 'Mercadinho do Bairro', 'Farmácia Bem-Estar'];
      this.namePool = base.slice(); for (let i = this.namePool.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [this.namePool[i], this.namePool[j]] = [this.namePool[j], this.namePool[i]]; }
    }
    return this.namePool.pop();
  }
  // interior compacto (lojas de rua são rasas): balcão no fundo à esquerda + móveis conforme o tipo
  storeInterior(r, kind, w, d, y0) {
    const M = this.M; const P = (c) => paint(M.flat, c);
    const backZ = -d / 2 + 0.32, rightX = w / 2 - 0.3;
    if (kind === 'cinema') {
      // sala pequena: tela iluminada no fundo, fileiras de poltronas vermelhas e bombonière perto da porta
      r.box(P(0x111111), 0, y0 + 0.5, backZ, w - 1.2, 2.6, 0.08, false);
      r.add(box(w - 1.6, 2.2, 0.03, w - 1.6, 2.2), homeMat('art' + Math.floor(rand() * 8)), 0, y0 + 1.8, backZ + 0.06);
      r.add(plane(w - 0.6, d - 3, 2.5, 2.5), homeMat('rug' + Math.floor(rand() * 4)), 0, y0 + 0.04, -0.6);
      for (let row = 0; row < 3; row++) for (let k = 0; k < 6; k++) { const sx = -w / 2 + 1.6 + k * ((w - 3.2) / 5), sz = -d / 2 + 2.6 + row * 1.25;
        r.box(P(0x8a1a1a), sx, y0 + 0.4, sz, 0.6, 0.12, 0.55, false); r.box(P(0x8a1a1a), sx, y0 + 0.4, sz + 0.25, 0.6, 0.65, 0.1, false); r.box(M.metalDark, sx, y0, sz, 0.08, 0.4, 0.3, false); }
      r.collide(0, y0, -d / 2 + 3.85, w - 2.6, 1.0, 3.2);
      r.box(P(0xc41a1a), -w / 2 + 1.4, y0, d / 2 - 1.8, 2.0, 1.05, 0.7, true, 1); r.box(M.metalLight, -w / 2 + 1.4, y0 + 1.05, d / 2 - 1.8, 2.1, 0.05, 0.8, false);
      r.add(box(1.8, 0.4, 0.05, 1.8, 0.4), signMat('PIPOCA', { bg: '#c41a1a', fg: '#ffe14a', glow: true, w: 512, h: 96 }), -w / 2 + 1.4, y0 + 2.6, d / 2 - 2.3);
      return [-w / 2 + 1.4, d / 2 - 2.5, 0];
    }
    if (kind === 'academia') {
      // esteiras de frente para o espelho, supino, suporte de halteres e tapete
      r.add(box(w - 1.0, 2.0, 0.02, w - 1.0, 2.0), M.glass, 0, y0 + 1.3, backZ + 0.02);
      for (let k = 0; k < 3; k++) { const tx = -w / 2 + 1.6 + k * 1.4, tz = -d / 2 + 1.6; r.box(P(0x1a1a1a), tx, y0, tz, 0.75, 0.2, 1.7, true, 1); r.box(P(0x2a2a2a), tx, y0 + 0.2, tz, 0.55, 0.02, 1.4, false);
        for (const sx of [-0.33, 0.33]) r.box(M.metalDark, tx + sx, y0 + 0.2, tz - 0.7, 0.05, 1.1, 0.05, false); r.box(M.metalDark, tx, y0 + 1.25, tz - 0.72, 0.7, 0.2, 0.15, false); }
      const bx = w / 4, bz = 0; r.box(P(0x1a1a1a), bx, y0 + 0.35, bz, 0.35, 0.12, 1.3, false); r.box(M.metalDark, bx, y0, bz, 0.25, 0.35, 0.25, false);
      for (const sx of [-0.55, 0.55]) r.box(M.metalDark, bx + sx, y0, bz - 0.5, 0.06, 1.2, 0.06, false);
      r.add(cyl(0.02, 0.02, 1.8, 6).rotateZ(Math.PI / 2), M.metalLight, bx, y0 + 1.15, bz - 0.5); for (const sx of [-0.8, 0.8]) r.add(cyl(0.22, 0.22, 0.06, 14).rotateZ(Math.PI / 2), P(0x1a1a1a), bx + sx, y0 + 1.15, bz - 0.5);
      r.collide(bx, y0, bz, 1.4, 1.2, 1.4);
      r.box(M.metalDark, rightX - 0.25, y0, 1.0, 0.5, 0.8, 2.4, true, 1); for (let k = 0; k < 6; k++) { const hz = 0 + k * 0.4; r.add(cyl(0.07, 0.07, 0.36, 8).rotateX(Math.PI / 2), P(0x1a1a1a), rightX - 0.25, y0 + 0.88, hz); }
      r.add(plane(2.4, 2.0, 2.4, 2.0), P(0x2a3a5a), -w / 6, y0 + 0.04, d / 2 - 1.8);
      r.box(M.woodDark, -w / 4, y0, d / 2 - 1.0, 1.6, 1.05, 0.6, true, 1);
      return [-w / 4, d / 2 - 1.6, 0];
    }
    // balcão com caixa
    if (kind !== 'lavanderia') { r.box(M.woodDark, -w / 4, y0, -d / 2 + 1.5, w / 2 - 0.6, 1.05, 0.7, true, 1); r.box(M.metalLight, -w / 4, y0 + 1.05, -d / 2 + 1.5, w / 2 - 0.5, 0.05, 0.8, false); r.box(M.metalDark, -w / 4 - 0.5, y0 + 1.1, -d / 2 + 1.5, 0.35, 0.22, 0.3, false); }
    const backShelf = (strips, o) => this.wallShelf(r, w / 4, backZ, 0, w / 2 - 0.8, strips, y0, o);
    const sideShelf = (strips, o) => this.wallShelf(r, rightX, d / 2 - 2.6 - (d - 4.5) / 2 + 1.0, -Math.PI / 2, Math.max(1.5, d - 4.2), strips, y0, o);
    if (kind === 'lanche' || kind === 'padaria') {
      this.displayCase(r, -w / 4, -d / 2 + 1.5, w / 2 - 1.0, kind === 'lanche' ? ['lanche'] : ['padaria1', 'padaria2'], y0, true);
      r.add(box(2.6, 1.3, 0.05, 2.6, 1.3), prodMat(kind === 'lanche' ? 'board_lanche' : 'board_padaria', true), -w / 4, y0 + 2.6, backZ - 0.05);
      this.fridge(r, w / 4, backZ + 0.18, 0, w / 2 - 1.2, y0);
      if (d > 5) this.tableSet(r, w / 6, d / 2 - 1.6, y0, pick([0xb02a2a, 0x1d3f8a, 0x2a2a2a]));
    } else if (kind === 'mercado' || kind === 'farmacia') {
      backShelf(kind === 'farmacia' ? ['farmacia1', 'farmacia2'] : ['mercado1', 'mercado2', 'mercado3'], kind === 'farmacia' ? { mat: M.white } : {});
      sideShelf(kind === 'farmacia' ? ['farmacia2'] : ['bebidas1', 'mercado3'], kind === 'farmacia' ? { mat: M.white } : {});
    } else if (kind === 'livraria' || kind === 'antiquario') {
      for (const [lx, lz, ry, len] of [[w / 4, backZ, 0, w / 2 - 0.8], [rightX, 0, -Math.PI / 2, d - 1.5]]) {
        const g = this.sub(r, lx, lz, ry); const H = 2.3, D = 0.4;
        g.box(M.woodDark, 0, y0, -D / 2 + 0.03, len, H, 0.06, false); for (const s of [-1, 1]) g.box(M.woodDark, s * (len / 2 - 0.03), y0, 0, 0.06, H, D, false);
        for (let k = 0; k < 5; k++) { g.box(M.woodDark, 0, y0 + 0.05 + k * 0.45, 0, len, 0.04, D, false); if (k < 5) g.add(box(len - 0.12, 0.36, 0.24, len - 0.12, 0.36), kind === 'livraria' ? homeMat('books') : prodMat('strip_antiquario'), 0, y0 + 0.27 + k * 0.45, -0.04); }
        g.collide(0, y0, 0, len, H, D);
      }
      r.box(M.wood, w / 6, y0 + 0.7, d / 2 - 1.8, 1.4, 0.06, 0.8, false); r.add(box(1.2, 0.08, 0.6, 1.2, 0.6), homeMat('books'), w / 6, y0 + 0.77, d / 2 - 1.8);
    } else if (kind === 'boutique') {
      for (let k = 0; k < 2; k++) { const vx = w / 6 + (k - 0.5) * 1.8; r.box(M.white, vx, y0, d / 2 - 2.2, 1.2, 0.9, 0.6, true, 1); r.add(box(1.2, 0.35, 0.6), M.glass, vx, y0 + 1.08, d / 2 - 2.2); r.add(box(1.0, 0.04, 0.4, 1.0, 0.4), prodMat(pick(['strip_eletronicos', 'strip_roupas'])), vx, y0 + 0.95, d / 2 - 2.2); }
      sideShelf(['roupas'], { mat: M.woodDark, levels: 3 }); r.add(box(1.0, 1.8, 0.03), M.glass, w / 4, y0 + 1.2, backZ);
    } else if (kind === 'lavanderia') {
      for (let k = 0; k < Math.floor((w - 1) / 0.85); k++) { const mx = -w / 2 + 0.7 + k * 0.85; r.box(M.white, mx, y0, backZ + 0.35, 0.75, 0.9, 0.7, true, 1); r.add(cyl(0.24, 0.24, 0.04, 16).rotateX(Math.PI / 2), M.glass, mx, y0 + 0.5, backZ + 0.72); r.add(cyl(0.27, 0.27, 0.03, 16).rotateX(Math.PI / 2), M.metalLight, mx, y0 + 0.5, backZ + 0.71); }
      r.box(P(0x1a3a6a), 0, y0 + 0.42, d / 2 - 1.6, w * 0.5, 0.08, 0.5, false); r.collide(0, y0, d / 2 - 1.6, w * 0.5, 0.5, 0.5);
    } else if (kind === 'floricultura') {
      for (let k = 0; k < 6; k++) { const px = -w / 2 + 0.8 + (k % 3) * (w / 3), pz = (k < 3 ? -0.3 : d / 2 - 1.5); r.add(cyl(0.22, 0.17, 0.4, 10), P(0xa8582a), px, y0 + 0.2, pz); r.add(new THREE.IcosahedronGeometry(0.4, 1), P(pick([0x3a8a3a, 0x4ab04a, 0x2a6a3a])), px, y0 + 0.75, pz); for (let f2 = 0; f2 < 4; f2++) r.add(new THREE.IcosahedronGeometry(0.08, 0), P(pick([0xe83a6a, 0xf2d21a, 0xf2f2f2, 0xb03ae8])), px + rr(-0.25, 0.25), y0 + 0.95 + rr(0, 0.2), pz + rr(-0.25, 0.25)); }
      r.box(M.wood, rightX - 0.3, y0, 0, 0.6, 0.8, d - 2.5, true, 1);
    } else if (kind === 'lobby') {
      r.add(box(2.2, 1.0, 0.05, 2.2, 1.0), homeMat('art' + Math.floor(rand() * 8)), w / 4, y0 + 2.0, backZ);
      for (const s of [-1, 1]) { const sz = d / 2 - 2.0; r.box(P(0x6a2a2a), w / 6 + s * 1.2, y0, sz, 1.0, 0.42, 0.85, true, 1); r.box(P(0x6a2a2a), w / 6 + s * 1.2, y0, sz - 0.38, 1.0, 0.85, 0.15, false); }
      r.add(plane(2.6, 1.8, 2.6, 1.8), homeMat('rug' + Math.floor(rand() * 4)), w / 6, y0 + 0.04, d / 2 - 2.0);
      r.add(cyl(0.25, 0.2, 0.5, 10), P(0xd8d8d8), rightX - 0.2, y0 + 0.25, d / 2 - 0.9); r.add(new THREE.IcosahedronGeometry(0.5, 0), M.hedge, rightX - 0.2, y0 + 1.0, d / 2 - 0.9);
    } else { // barbearia, eletrônicos, roupas, ferragens...
      backShelf(kind === 'eletronicos' ? ['eletronicos'] : kind === 'ferragens' ? ['ferragens'] : kind === 'barbearia' ? ['barbearia'] : ['roupas', 'mercado3'], { levels: 3 });
      sideShelf(kind === 'eletronicos' ? ['eletronicos'] : ['roupas'], { levels: 3 });
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
    const n = 3, gap = 3.6, w = (inner * 2 - 2 * gap) / n;
    for (let i = 0; i < n; i++) {
      const x = -inner + w / 2 + i * (w + gap);
      this.building(F, x, -inner + 7, w, 14, Math.floor(rr(2, 5)), pick(['brick', 'plaster', 'concrete', 'apartment']), { storefronts: ['s'] });
    }
    // becos entre os prédios
    for (let i = 0; i < n - 1; i++) this.alley(F, -inner + w * (i + 1) + gap * (i + 0.5), -inner, 14, gap);
    this.parkingLot(F, 0, 9, inner * 2 - 2, 18, 0);
    // pequeno jardim
    F.add(plane(inner * 2, 6, 4), M.grass, 0, CURB + 0.01, -inner + 17);
    for (let i = 0; i < 5; i++) this.trees.push([F.x - inner + 4 + i * 12, F.z - inner + 17, rr(0.8, 1.1)]);
  }

  // BECO: lixo, caçamba, caixas, poça, pichações nas paredes e luz fraca. Traficantes são colocados pelo main.js
  alley(F, ax, z0, len, gap) {
    const M = this.M, y = CURB; const P = (c) => paint(M.flat, c);
    const zc = z0 + len / 2;
    // caçamba de lixo
    const dz = zc + rr(-2, 2), dx = ax + (rand() < 0.5 ? -1 : 1) * (gap / 2 - 0.75);
    F.box(P(0x2a5a2a), dx, y, dz, 1.1, 1.15, 1.9, true, 1); F.box(P(0x1a3a1a), dx, y + 1.15, dz, 1.2, 0.08, 2.0, false);
    // sacos de lixo, caixas de papelão e pallet
    for (let k = 0; k < 6; k++) F.add(new THREE.IcosahedronGeometry(rr(0.25, 0.4), 0), P(rand() < 0.7 ? 0x141414 : 0x1a2a4a), ax + rr(-gap / 2 + 0.4, gap / 2 - 0.4), y + 0.22, z0 + rr(1, len - 1));
    for (let k = 0; k < 4; k++) { const bx2 = ax + (rand() < 0.5 ? -1 : 1) * (gap / 2 - 0.45); F.add(box(rr(0.4, 0.7), rr(0.3, 0.6), rr(0.4, 0.7)), P(0x9a7a4a), bx2, y + 0.25, z0 + rr(2, len - 2), rr(0, 1)); }
    F.add(box(1.2, 0.12, 1.0), P(0x7a5a3a), ax - gap / 2 + 0.7, y + 0.06, z0 + len - 2.5, 0.3);
    // poça d'água
    F.add(plane(rr(1, 1.8), rr(0.8, 1.4), 1), M.water, ax + rr(-0.5, 0.5), y + 0.012, z0 + rr(3, len - 3));
    // pichações nas duas paredes
    const R = M.graffitiRegions;
    for (const side of [-1, 1]) for (let k = 0; k < 2; k++) {
      const gz = z0 + 2.5 + k * (len - 5) / 1 * 0.55 + rr(-1, 1);
      F.add(plane(2.6, 2.6, 2.6, 2.6).rotateX(Math.PI / 2).rotateY(side * Math.PI / 2), { isSign: true, mat: M.graffiti, region: R[Math.floor(rand() * R.length)] }, ax - side * (gap / 2 - 0.02), y + 1.6, gz);
    }
    // luz fraca na parede
    F.box(P(0x222222), ax - gap / 2 + 0.05, y + 3.2, zc, 0.15, 0.2, 0.4, false); F.add(box(0.05, 0.12, 0.3), M.ceilingLight, ax - gap / 2 + 0.14, y + 3.15, zc);
    { const [lx, lz] = F.pt(ax - gap / 2 + 0.4, zc); this.lamps.push([lx, y + 3.0, lz]); }
    const [wx, wz] = F.pt(ax, z0 + len * 0.55), [mx, mz] = F.pt(ax, z0 + 0.8);
    this.alleys = this.alleys || []; this.alleys.push({ x: wx, z: wz, mouth: [mx, mz], heading: F.ry });
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


  // ---------- INTERIOR DAS LOJAS (produtos texturizados por tipo) ----------
  // sub-frame: posição local (lx,lz) do frame f, girado ry; a frente dos móveis aponta para +z local
  sub(f, lx, lz, ry) { return new Frame(...f.pt(lx, lz), f.ry + ry, f.B, this.world); }
  // estante encostada na parede: níveis de produtos (tiras do atlas)
  wallShelf(f, lx, lz, ry, len, strips, y0, o = {}) {
    const M = this.M; const g = this.sub(f, lx, lz, ry); const H = o.h || 2.0, D = 0.5, lv = o.levels || 4;
    const frame = o.mat || M.metalLight;
    g.box(frame, 0, y0, -D / 2 + 0.03, len, H, 0.06, false); // fundo
    for (const s of [-1, 1]) g.box(frame, s * (len / 2 - 0.03), y0, 0, 0.06, H, D, false);
    g.box(frame, 0, y0, 0, len, 0.1, D, false); g.box(frame, 0, y0 + H - 0.04, 0, len, 0.04, D, false);
    const lh = (H - 0.18) / lv; const nseg = Math.max(1, Math.round(len / 1.6)), sl = (len - 0.1) / nseg;
    for (let r = 0; r < lv; r++) {
      const ly = y0 + 0.12 + r * lh;
      g.box(frame, 0, ly - 0.03, 0.02, len - 0.1, 0.03, D - 0.06, false);
      for (let k = 0; k < nseg; k++) g.add(box(sl - 0.02, lh * 0.9, D * 0.6, sl - 0.02, lh * 0.9), prodMat('strip_' + pick(strips), o.glow), -len / 2 + 0.05 + sl * (k + 0.5), ly + lh * 0.45, -0.02);
    }
    g.collide(0, y0, 0, len, H, D);
  }
  // gôndola de dois lados no meio da loja
  gondola(f, lx, lz, len, strips, y0, o = {}) {
    const M = this.M; const g = this.sub(f, lx, lz, 0); const H = o.h || 1.65, D = 0.9, lv = o.levels || 4;
    g.box(M.metalLight, 0, y0, 0, len, 0.12, D, false);
    g.box(M.metalLight, 0, y0, 0, len, H, 0.05, false);
    for (const s of [-1, 1]) g.box(M.metalLight, s * (len / 2 - 0.02), y0, 0, 0.04, H, D, false);
    // placa de corredor no topo
    if (o.label) { g.add(box(Math.min(1.6, len * 0.6), 0.26, 0.04, Math.min(1.6, len * 0.6), 0.26), signMat(o.label, { bg: '#c41a1a', fg: '#fff', w: 512, h: 96 }), 0, y0 + 2.75, 0); g.box(M.metalLight, 0, y0 + 2.88, 0, 0.02, 1.2, 0.02, false); }
    const lh = (H - 0.16) / lv; const nseg = Math.max(1, Math.round(len / 1.6)), sl = (len - 0.08) / nseg;
    for (let r = 0; r < lv; r++) {
      const ly = y0 + 0.13 + r * lh;
      for (const side of [-1, 1]) {
        g.box(M.metalLight, 0, ly - 0.03, side * D / 4, len - 0.08, 0.03, D / 2 - 0.06, false);
        for (let k = 0; k < nseg; k++) g.add(box(sl - 0.02, lh * 0.9, D * 0.3, sl - 0.02, lh * 0.9), prodMat('strip_' + pick(strips)), -len / 2 + 0.04 + sl * (k + 0.5), ly + lh * 0.45, side * D * 0.2, side < 0 ? Math.PI : 0);
      }
    }
    g.collide(0, y0, 0, len, H, D);
  }
  // geladeira de bebidas com portas de vidro e interior iluminado
  fridge(f, lx, lz, ry, len, y0) {
    const M = this.M; const g = this.sub(f, lx, lz, ry); const H = 2.1, D = 0.75;
    g.box(M.white, 0, y0, 0, len, 0.16, D, false); g.box(M.white, 0, y0 + H - 0.3, 0, len, 0.3, D, false);
    g.box(M.white, 0, y0, -D / 2 + 0.04, len, H, 0.08, false);
    for (const s of [-1, 1]) g.box(M.white, s * (len / 2 - 0.04), y0, 0, 0.08, H, D, false);
    g.add(box(len - 0.2, 0.24, 0.03, len - 0.2, 0.24), signMat('BEBIDAS GELADAS', { bg: '#0a4a8a', fg: '#fff', glow: true, w: 512, h: 64 }), 0, y0 + H - 0.15, D / 2 + 0.01);
    const lv = 5, lh = (H - 0.5) / lv, nseg = Math.max(1, Math.round(len / 1.2)), sl = (len - 0.16) / nseg;
    for (let r = 0; r < lv; r++) {
      const ly = y0 + 0.18 + r * lh;
      g.box(M.metalLight, 0, ly - 0.02, 0, len - 0.16, 0.02, D - 0.2, false);
      for (let k = 0; k < nseg; k++) g.add(box(sl - 0.02, lh * 0.92, D * 0.5, sl - 0.02, lh * 0.92), prodMat('strip_' + pick(['bebidas1', 'bebidas2']), true), -len / 2 + 0.08 + sl * (k + 0.5), ly + lh * 0.46, -0.06);
    }
    // portas: vidro + batentes + puxadores
    const nd = Math.max(1, Math.round(len / 0.9)), dw = (len - 0.16) / nd;
    for (let k = 0; k < nd; k++) {
      const cx = -len / 2 + 0.08 + dw * (k + 0.5);
      g.add(box(dw - 0.06, H - 0.5, 0.02), M.glass, cx, y0 + 0.16 + (H - 0.5) / 2, D / 2 - 0.02);
      g.box(M.metalDark, cx - dw / 2 + 0.02, y0 + 0.16, D / 2 - 0.02, 0.04, H - 0.46, 0.04, false);
      g.box(M.metalLight, cx + dw / 2 - 0.12, y0 + 0.8, D / 2 + 0.02, 0.03, 0.6, 0.04, false);
    }
    g.collide(0, y0, 0, len, H, D);
  }
  // balcão-vitrine com produtos (padaria, lanchonete)
  displayCase(f, lx, lz, len, strips, y0, onCounter = false) {
    const M = this.M; const g = this.sub(f, lx, lz, 0);
    if (onCounter) y0 += 1.1 - 0.83; // vitrine sobre o balcão existente
    else { g.box(M.woodDark, 0, y0, 0, len, 0.8, 0.8, false, 1); g.box(M.metalLight, 0, y0 + 0.8, 0, len, 0.03, 0.8, false); }
    for (let r = 0; r < 2; r++) g.add(box(len - 0.1, 0.24, 0.5, len - 0.1, 0.24), prodMat('strip_' + pick(strips), true), 0, y0 + 0.96 + r * 0.28, -0.05);
    g.box(M.metalLight, 0, y0 + 1.07, -0.05, len - 0.1, 0.02, 0.55, false);
    g.add(box(len, 0.62, 0.02), M.glass, 0, y0 + 1.14, 0.38, 0, -0.18);
    g.add(box(len, 0.02, 0.6), M.glass, 0, y0 + 1.44, 0.05);
    if (!onCounter) g.collide(0, y0, 0, len, 1.45, 0.8);
  }
  // mesa com 2 bancos
  tableSet(f, lx, lz, y0, color = 0xb02a2a) {
    const M = this.M; const g = this.sub(f, lx, lz, 0);
    g.box(M.metalDark, 0, y0, 0, 0.08, 0.75, 0.08, false);
    g.add(cyl(0.45, 0.45, 0.04, 16), M.wood, 0, y0 + 0.77, 0);
    for (const s of [-1, 1]) { g.box(M.metalDark, s * 0.75, y0, 0, 0.06, 0.45, 0.06, false); g.add(cyl(0.2, 0.2, 0.08, 12), paint(M.flat, color), s * 0.75, y0 + 0.48, 0); }
    // lanche e refrigerante sobre a mesa
    g.add(cyl(0.035, 0.035, 0.12, 10), prodMat('can' + Math.floor(rand() * 5)), 0.15, y0 + 0.85, 0.1);
    g.add(cyl(0.12, 0.12, 0.015, 14), M.white, -0.12, y0 + 0.8, -0.05);
    g.add(cyl(0.06, 0.06, 0.05, 12), prodMat('bun'), -0.12, y0 + 0.835, -0.05);
    g.collide(0, y0, 0, 0.9, 0.8, 0.9);
  }
  shopInterior(f, kind, w, d, H, y0) {
    const M = this.M;
    const backZ = -d / 2 + 0.25 + 0.27, rightX = w / 2 - 0.25 - 0.27, leftX = -w / 2 + 0.25 + 0.27;
    const sideLen = d - 3.2, sideZ = -d / 2 + 1.25 + sideLen / 2 - 0.4;
    const gx = w / 4 - 0.3, glen = Math.max(1.6, w / 2 - 3.2);
    const backL = w / 2 - 0.6, backR = w / 2 - 1.1; // metade esquerda (atrás do balcão) / direita do fundo
    const impulse = () => { // produtos no balcão (chocolates e salgadinhos)
      f.add(box(0.7, 0.35, 0.3, 0.7, 0.35), prodMat('strip_mercado3'), -w / 4 + 0.6, y0 + 1.25, -d / 2 + 3.15);
    };
    // estante na parede esquerda, entre o balcão e a porta
    const lLen = d - 5.6, lZ = -d / 2 + 3.9 + lLen / 2;
    const left = (strips, o) => this.wallShelf(f, leftX, lZ, Math.PI / 2, lLen, strips, y0, o);
    // faixa colorida e rodapé nas paredes internas (cor da "marca" de cada tipo de loja)
    const band = paint(M.flat, { mercado: 0xc41a1a, farmacia: 0x1a8a4a, lanche: 0xd8701a, padaria: 0x8a5a2a, ferragens: 0xd8a01a, roupas: 0x2a2a3a, eletronicos: 0x1a4ab0, barbearia: 0x7a1414, antiquario: 0x4a3420 }[kind] || 0x555555);
    const iw = w - 0.56, idp = d - 0.56;
    for (const [bx, bz, bw, bd] of [[0, -d / 2 + 0.28, iw, 0.02], [-w / 2 + 0.28, 0, 0.02, idp], [w / 2 - 0.28, 0, 0.02, idp]]) {
      f.box(band, bx, y0 + 2.75, bz, bw, 0.32, bd, false);
      f.box(M.darkTrim, bx, y0 + 0.02, bz, bw + (bd > 1 ? 0.02 : 0), 0.12, bd + (bw > 1 ? 0.02 : 0), false);
    }
    const wood = kind === 'roupas' || kind === 'barbearia' || kind === 'antiquario';
    if (wood) f.add(plane(w - 0.5, d - 0.5, 2), M.interiorWood, 0, y0 + 0.03, 0);
    if (kind === 'mercado') {
      this.wallShelf(f, -w / 4, backZ, 0, backL, ['mercado2', 'mercado3'], y0);
      this.fridge(f, w / 4 - 0.25, -d / 2 + 0.25 + 0.38, 0, backR, y0);
      this.wallShelf(f, rightX, sideZ, -Math.PI / 2, sideLen, ['mercado1', 'mercado2', 'mercado3'], y0);
      this.gondola(f, gx, -d / 2 + 4.5, glen, ['mercado1', 'mercado2'], y0, { label: 'MERCEARIA' });
      this.gondola(f, gx, -d / 2 + 7.7, glen, ['mercado3', 'mercado1'], y0, { label: 'BISCOITOS' });
      left(['bebidas2', 'mercado3']);
      impulse();
    } else if (kind === 'farmacia') {
      this.wallShelf(f, -w / 4, backZ, 0, backL, ['farmacia1'], y0, { mat: M.white });
      this.wallShelf(f, w / 4 - 0.25, backZ, 0, backR, ['farmacia1', 'farmacia2'], y0, { mat: M.white });
      this.wallShelf(f, rightX, sideZ, -Math.PI / 2, sideLen, ['farmacia2', 'farmacia1'], y0, { mat: M.white });
      this.gondola(f, gx, -d / 2 + 4.5, glen, ['farmacia2'], y0, { label: 'HIGIENE' });
      this.gondola(f, gx, -d / 2 + 7.7, glen, ['farmacia1'], y0, { label: 'MEDICAMENTOS' });
      f.add(box(0.7, 0.32, 0.3, 0.7, 0.32), prodMat('strip_farmacia1'), -w / 4 + 0.6, y0 + 1.24, -d / 2 + 3.15);
      left(['farmacia2'], { mat: M.white });
    } else if (kind === 'lanche' || kind === 'padaria') {
      const lanche = kind === 'lanche';
      this.wallShelf(f, -w / 4, backZ, 0, backL, lanche ? ['bebidas2'] : ['padaria1'], y0, { h: 1.3, levels: 2, mat: M.woodDark });
      // cardápio iluminado acima da estante
      f.add(box(Math.min(3.4, backL - 0.4), 1.6, 0.06, Math.min(3.4, backL - 0.4), 1.6), prodMat(lanche ? 'board_lanche' : 'board_padaria', true), -w / 4, y0 + 2.45, -d / 2 + 0.32);
      this.fridge(f, w / 4 - 0.25, -d / 2 + 0.25 + 0.38, 0, backR, y0);
      const ds = lanche ? ['lanche'] : ['padaria1', 'padaria2'];
      const l1 = w / 4 - 1.3, l2 = w / 4 - 0.4;
      this.displayCase(f, -w / 2 + 0.3 + l1 / 2, -d / 2 + 3, l1, ds, y0, true);
      this.displayCase(f, -w / 4 + 0.2 + l2 / 2, -d / 2 + 3, l2, ds, y0, true);
      if (lanche) for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) this.tableSet(f, gx - 1 + i * 2.6, -d / 2 + 5.2 + j * 2.6, y0, pick([0xb02a2a, 0x1d3f8a, 0xd8b02a]));
      else {
        this.wallShelf(f, rightX, sideZ, -Math.PI / 2, sideLen, ['padaria1', 'padaria2', 'mercado1'], y0, { mat: M.woodDark });
        left(['padaria1', 'mercado1'], { mat: M.woodDark });
        this.tableSet(f, gx - 0.6, -d / 2 + 5.6, y0, 0x8a5a2a); this.tableSet(f, gx - 0.6, -d / 2 + 8.4, y0, 0x8a5a2a);
      }
    } else if (kind === 'ferragens') {
      this.wallShelf(f, -w / 4, backZ, 0, backL, ['ferragens'], y0, { mat: M.woodDark, levels: 3 });
      this.wallShelf(f, w / 4 - 0.25, backZ, 0, backR, ['ferragens'], y0, { mat: M.woodDark, levels: 3, h: 2.4 });
      this.wallShelf(f, rightX, sideZ, -Math.PI / 2, sideLen, ['ferragens'], y0, { mat: M.woodDark, levels: 3, h: 2.4 });
      this.gondola(f, gx, -d / 2 + 4.5, glen, ['ferragens'], y0, { levels: 3, label: 'FERRAMENTAS' });
      this.gondola(f, gx, -d / 2 + 7.7, glen, ['ferragens', 'mercado3'], y0, { levels: 3 });
      left(['ferragens'], { mat: M.woodDark, levels: 3, h: 2.4 });
    } else if (kind === 'eletronicos') {
      this.wallShelf(f, -w / 4, backZ, 0, backL, ['eletronicos'], y0, { levels: 3 });
      // parede de TVs ligadas
      const tg = this.sub(f, rightX + 0.15, sideZ, -Math.PI / 2);
      for (let i = 0; i < 3; i++) for (let r = 0; r < 2; r++) {
        const x = -sideLen / 2 + 1.2 + i * ((sideLen - 2.4) / 2);
        tg.box(M.metalDark, x, y0 + 1.0 + r * 1.2, -0.05, 1.6, 0.95, 0.08, false);
        tg.add(box(1.5, 0.85, 0.02, 1.5, 0.85), prodMat('tv', true), x, y0 + 1.475 + r * 1.2, 0.0);
      }
      for (let i = 0; i < 2; i++) { const tb = this.sub(f, gx, -d / 2 + 4.5 + i * 3.2, 0); tb.box(M.white, 0, y0, 0, glen, 0.85, 1.0, true, 1); tb.add(box(glen - 0.2, 0.3, 0.6, glen - 0.2, 0.3), prodMat('strip_eletronicos'), 0, y0 + 1.0, 0); }
      this.wallShelf(f, w / 4 - 0.25, backZ, 0, backR, ['eletronicos'], y0, { levels: 3 });
      left(['eletronicos'], { levels: 3 });
    } else if (kind === 'roupas') {
      for (let i = 0; i < 2; i++) { // araras com roupas penduradas
        const rg = this.sub(f, gx, -d / 2 + 4.5 + i * 3.2, 0);
        for (const s of [-1, 1]) rg.box(M.metalLight, s * glen / 2, y0, 0, 0.04, 1.6, 0.04, false);
        rg.box(M.metalLight, 0, y0 + 1.58, 0, glen, 0.03, 0.03, false);
        const n = Math.floor(glen / 0.14);
        for (let k = 0; k < n; k++) rg.add(box(0.04, 0.75, 0.48), paint(M.flat, pick([0x1a2a4a, 0xb02a2a, 0xf0f0f0, 0x2a2a2a, 0x5a7a3a, 0xc8a070, 0x3a6ab0, 0x8a3a6a])), -glen / 2 + 0.1 + k * 0.14, y0 + 1.18, 0, 0, 0, rr(-0.05, 0.05));
        rg.collide(0, y0, 0, glen, 1.6, 0.6);
      }
      this.wallShelf(f, -w / 4, backZ, 0, backL, ['roupas'], y0, { mat: M.woodDark, levels: 3 });
      this.wallShelf(f, rightX, sideZ, -Math.PI / 2, sideLen, ['roupas'], y0, { mat: M.woodDark, levels: 3 });
      f.add(box(1.2, 2.0, 0.03), M.glass, w / 4, y0 + 1.1, -d / 2 + 0.3); // espelho
      left(['roupas'], { mat: M.woodDark, levels: 3 });
    } else if (kind === 'barbearia') {
      this.wallShelf(f, -w / 4, backZ, 0, backL, ['barbearia'], y0, { mat: M.woodDark, levels: 3 });
      const mg = this.sub(f, rightX + 0.2, sideZ, -Math.PI / 2);
      mg.add(box(sideLen - 1, 1.2, 0.03), M.glass, 0, y0 + 1.7, 0);
      mg.box(M.woodDark, 0, y0, 0.15, sideLen - 1, 0.9, 0.4, true, 1);
      for (let i = 0; i < 3; i++) { // cadeiras de barbeiro
        const z = -sideLen / 2 + 1.5 + i * ((sideLen - 3) / 2);
        mg.box(M.metalLight, z, y0, 1.4, 0.4, 0.45, 0.4, false);
        mg.box(paint(M.flat, 0x7a1414), z, y0 + 0.45, 1.4, 0.65, 0.18, 0.6, false);
        mg.box(paint(M.flat, 0x7a1414), z, y0 + 0.6, 1.62, 0.65, 0.75, 0.15, false);
        mg.collide(z, y0, 1.4, 0.7, 1.2, 0.7);
      }
      this.tableSet(f, gx - 1.4, -d / 2 + 8, y0, 0x2a2a2a);
      left(['barbearia', 'antiquario'], { mat: M.woodDark, levels: 3, h: 1.8 });
    } else if (kind === 'banco') {
      f.add(plane(w - 0.5, d - 0.5, 2), M.interiorFloor, 0, y0 + 0.07, 0); // piso acima do asfalto do estacionamento
      // balcão dos caixas com vidro blindado; passagem à direita leva ao cofre
      f.box(M.woodDark, w / 4 - 2.2, y0, -d / 2 + 3, w / 2 - 4.4, 1.05, 0.8, true, 1);
      f.box(M.metalLight, w / 4 - 2.2, y0 + 1.05, -d / 2 + 3, w / 2 - 4.3, 0.05, 0.9, false);
      f.add(box(w - 4.6, 1.2, 0.03), M.glass, -2.3, y0 + 1.7, -d / 2 + 2.65);
      for (let i = 0; i < 5; i++) f.box(M.metalLight, -w / 2 + 0.3 + i * ((w - 4.6) / 4), y0 + 1.1, -d / 2 + 2.65, 0.05, 1.2, 0.05, false);
      f.add(box(8, 0.8, 0.06, 8, 0.8), signMat('BANCO LOS VALLES', { bg: '#0d2a4a', fg: '#e8c860', glow: true, w: 1024, h: 128 }), -w / 4, y0 + H - 1.2, -d / 2 + 0.3);
      // cofre: porta redonda de aço com volante
      const vx = w / 2 - 2.2, vz = -d / 2 + 0.32;
      f.add(new THREE.TorusGeometry(1.25, 0.12, 8, 24), M.metalDark, vx, y0 + 1.45, vz + 0.05);
      f.add(cyl(1.15, 1.15, 0.3, 24).rotateX(Math.PI / 2), M.metalLight, vx, y0 + 1.45, vz + 0.18);
      f.add(cyl(0.18, 0.18, 0.2, 12).rotateX(Math.PI / 2), M.metalDark, vx, y0 + 1.45, vz + 0.38);
      for (let i = 0; i < 3; i++) f.add(box(1.3, 0.06, 0.06), M.metalDark, vx, y0 + 1.45, vz + 0.45, 0, 0, i * Math.PI / 3);
      for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; f.add(cyl(0.07, 0.07, 0.12, 8).rotateX(Math.PI / 2), M.metalDark, vx + Math.cos(a) * 0.9, y0 + 1.45 + Math.sin(a) * 0.9, vz + 0.36); }
      // caixas eletrônicos, fila com cordões, cadeiras e plantas
      for (let i = 0; i < 3; i++) { const az = d / 2 - 2.5 - i * 1.4; f.box(M.metalDark, leftX + 0.1, y0, az, 0.6, 1.6, 0.9, true, 1); f.add(box(0.03, 0.4, 0.5), M.ceilingLight, leftX + 0.42, y0 + 1.25, az); }
      for (let i = 0; i < 4; i++) { const px = -w / 4 - 2 + i * 1.6; f.add(cyl(0.05, 0.05, 1.0, 8), M.metalLight, px, y0 + 0.5, -d / 2 + 5.4); f.add(cyl(0.18, 0.2, 0.05, 10), M.metalDark, px, y0 + 0.025, -d / 2 + 5.4); if (i < 3) f.add(box(1.6, 0.05, 0.05), paint(M.flat, 0x8a1a1a), px + 0.8, y0 + 0.9, -d / 2 + 5.4); }
      for (let i = 0; i < 5; i++) { const cx = 1 + i * 1.0; f.box(paint(M.flat, 0x1a3a6a), cx, y0 + 0.42, d / 2 - 2.2, 0.8, 0.08, 0.7, false); f.box(paint(M.flat, 0x1a3a6a), cx, y0 + 0.42, d / 2 - 1.85, 0.8, 0.6, 0.08, false); f.box(M.metalDark, cx, y0, d / 2 - 2.2, 0.08, 0.42, 0.08, false); }
      f.collide(3, y0, d / 2 - 2.0, 5, 0.9, 0.9);
      for (const [px, pz] of [[w / 2 - 1, d / 2 - 1.2], [-w / 2 + 1.2, -d / 2 + 4.5]]) { f.add(cyl(0.25, 0.2, 0.5, 10), paint(M.flat, 0xa8582a), px, y0 + 0.25, pz); f.add(new THREE.IcosahedronGeometry(0.45, 0), M.hedge, px, y0 + 0.9, pz); }
      { const [gx, gz] = f.pt(w / 2 - 3.5, d / 2 - 3); const [vx2, vz2] = f.pt(vx, vz + 1.6); const [tx, tz] = f.pt(-w / 4, -d / 2 + 1.9); this.bank = { guard: [gx, gz], vault: [vx2, vz2], teller: [tx, tz], heading: f.ry + Math.PI }; }
    } else { // antiquário
      this.wallShelf(f, -w / 4, backZ, 0, backL, ['antiquario'], y0, { mat: M.woodDark, levels: 3 });
      this.wallShelf(f, w / 4 - 0.25, backZ, 0, backR, ['antiquario'], y0, { mat: M.woodDark, levels: 3 });
      this.wallShelf(f, rightX, sideZ, -Math.PI / 2, sideLen, ['antiquario'], y0, { mat: M.woodDark, levels: 3, h: 2.3 });
      for (let i = 0; i < 2; i++) { const tb = this.sub(f, gx, -d / 2 + 4.5 + i * 3.2, 0); tb.box(M.woodDark, 0, y0, 0, glen, 0.8, 1.0, true, 1); tb.add(box(glen - 0.2, 0.45, 0.5, glen - 0.2, 0.45), prodMat('strip_antiquario'), 0, y0 + 1.03, 0); }
      left(['antiquario'], { mat: M.woodDark, levels: 3 });
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
    f.add(plane(w - 0.5, d - 0.5, 4), M.ceiling, 0, y0 + H - 0.01, 0, 0, Math.PI);
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
    // balcão com caixa registradora
    const kind = shopKind(name);
    f.box(M.woodDark, -w / 4, y0, -d / 2 + 3, w / 2, 1.05, 0.8, true, 1);
    f.box(M.metalLight, -w / 4, y0 + 1.05, -d / 2 + 3, w / 2 + 0.1, 0.05, 0.9, false);
    f.box(M.metalDark, -w / 4 - 0.6, y0 + 1.1, -d / 2 + 3, 0.4, 0.22, 0.32, false);
    f.box(M.metalDark, -w / 4 - 0.6, y0 + 1.32, -d / 2 + 2.9, 0.34, 0.2, 0.04, false);
    this.shopInterior(f, kind, w, d, H, y0);
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
    const HO = this.hollow(f, 0, bz, w, d, H, M.facade.concrete, 'n');
    this.policeInterior(HO);
    f.ao(0, bz, w, d, 1.8);
    f.box(M.blue, 0, CURB + 3.2, bz + d / 2 + 0.02, w, 0.5, 0.05, false);
    f.box(M.concrete, 0, CURB + H, bz, w + 0.6, 0.5, d + 0.6, false);
    // entrada com colunas
    f.box(M.concrete, 0, CURB, bz + d / 2 + 2, 10, 0.3, 4, false);
    f.box(M.concrete, 0, CURB + 4.2, bz + d / 2 + 2, 10.4, 0.4, 4.2, false);
    for (const s of [-4.5, -1.6, 1.6, 4.5]) { f.box(M.white, s, CURB + 0.3, bz + d / 2 + 3.7, 0.5, 3.9, 0.5, true); }
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
    // BANCO LOS VALLES (com interior, cofre e segurança) no lugar de parte do estacionamento sul
    this.parkingLot(F, -17, 14, 18, 24, 0);
    this.shop(F, 11, 15, 30, 18, 5.2, 'Banco Los Valles', 0);
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
    const HO = this.hollow(f, 0, bz, w, d, H, M.facade.plaster, 's');
    this.hospitalInterior(HO);
    f.ao(0, bz, w, d, 1.8);
    f.box(M.white, 0, CURB + H, bz, w + 0.6, 0.6, d + 0.6, false);
    // entrada com marquise (voltada para -z)
    f.box(M.white, 0, CURB + 3.4, bz - d / 2 - 2.5, 12, 0.35, 5, false);
    for (const s of [-5.5, 5.5]) f.box(M.white, s, CURB, bz - d / 2 - 4.6, 0.4, 3.4, 0.4, true);
    for (const sx of [-1, 1]) f.box(M.glass, sx * 2.3, CURB, bz - d / 2 - 0.05, 1.4, 3, 0.06, false);
    f.box(signMat('HOSPITAL LOS VALLES', { bg: '#ffffff', fg: '#b01818', glow: true, w: 1024, h: 128 }), 0, CURB + H - 1.6, bz - d / 2 - 0.08, 14, 1.4, 0.08, false, 14, 1.4);
    // cruz vermelha
    f.box(M.red, 0, CURB + H + 1.2, bz - d / 2 + 0.3, 3, 0.8, 0.3, false); f.box(M.red, 0, CURB + H + 0.4, bz - d / 2 + 0.3, 0.8, 2.4, 0.3, false);
    // ambulância estacionada e área verde
    this.parkingLot(F, 0, 14, inner * 2 - 2, 20, 0);
    const [ex, ez] = f.pt(0, bz - d / 2 - 6);
    this.landmarks.push({ name: 'Hospital Los Valles', x: ex, z: ez, kind: 'hospital' });
    for (let i = 0; i < 4; i++) this.trees.push([F.x - inner + 4 + i * 16, F.z - 2, rr(0.8, 1.1)]);
  }

  // prédio com térreo visitável: andares de cima fechados, paredes com porta na face indicada ('s' = -z, 'n' = +z)
  hollow(f, cx, cz, w, d, H, mat, face, GF = 4) {
    const M = this.M, y = CURB, t = 0.3, door = 3;
    f.box(mat, cx, y + GF, cz, w, H - GF, d, false, 24, 25.6); f.collide(cx, y + GF, cz, w, H - GF, d);
    const wall = (x, z, ww, dd) => f.box(mat, x, y, z, ww, GF, dd, true, 24, 25.6);
    const fz = face === 's' ? cz - d / 2 + t / 2 : cz + d / 2 - t / 2, bz = face === 's' ? cz + d / 2 - t / 2 : cz - d / 2 + t / 2;
    wall(cx, bz, w, t); wall(cx - w / 2 + t / 2, cz, t, d); wall(cx + w / 2 - t / 2, cz, t, d);
    const seg = (w - door) / 2; wall(cx - w / 2 + seg / 2, fz, seg, t); wall(cx + w / 2 - seg / 2, fz, seg, t);
    f.box(mat, cx, y + 3.2, fz, door, GF - 3.2, t, false, 24, 25.6);
    const IB = new Batcher(); const r = new Frame(...f.pt(cx, cz), f.ry + (face === 's' ? Math.PI : 0), IB, this.world);
    const iw = w - 0.7, id = d - 0.7;
    r.add(plane(iw, id, 2), M.interiorFloor, 0, y + 0.03, 0);
    r.add(plane(iw, id, 4), M.ceiling, 0, y + GF - 0.03, 0, 0, Math.PI);
    for (let i = 0; i < Math.floor(iw / 6); i++) r.add(box(0.4, 0.05, id * 0.7), M.ceilingLight, -iw / 2 + 3 + i * 6, y + GF - 0.06, 0);
    for (const sx of [-1, 1]) r.box(M.interior, sx * (iw / 2 - 0.01), y, 0, 0.02, GF - 0.1, id, false);
    r.box(M.interior, 0, y, -id / 2 + 0.01, iw, GF - 0.1, 0.02, false);
    for (const sx of [-1, 1]) r.box(M.interior, sx * (iw / 4 + door / 4), y, id / 2 - 0.01, iw / 2 - door / 2, GF - 0.1, 0.02, false);
    return { r, IB, w: iw, d: id, y, GF, cx, cz, f };
  }
  closeHollow(HO) { const grp = new THREE.Group(); grp.name = 'interior'; HO.IB.flush(grp, { castShadow: false }); grp.visible = false; this.root.add(grp); const [x, z] = HO.f.pt(HO.cx, HO.cz); this.interiors.push({ group: grp, x, z }); }
  hospitalInterior(HO) {
    const M = this.M, { r, w, d, y } = HO; const P = (c) => paint(M.flatIn, c);
    // recepção e espera (perto da porta, +z)
    r.box(P(0xf0f0f0), -w / 4, y, d / 2 - 4, 4, 1.05, 0.8, true, 1); r.box(P(0x1a8a6a), -w / 4, y + 1.05, d / 2 - 4, 4.1, 0.05, 0.9, false);
    r.box(M.metalDark, -w / 4 - 1, y + 1.1, d / 2 - 4.1, 0.5, 0.35, 0.05, false);
    r.add(box(3, 0.5, 0.05, 3, 0.5), signMat('RECEPÇÃO', { bg: '#1a8a6a', fg: '#fff', w: 512, h: 96 }), -w / 4, y + 2.9, d / 2 - 4.5);
    for (let row = 0; row < 2; row++) for (let k = 0; k < 6; k++) { const sx = w / 6 + k * 0.62, sz = d / 2 - 3 - row * 1.5; r.box(P(0x2a5a8a), sx, y + 0.42, sz, 0.55, 0.08, 0.5, false); r.box(P(0x2a5a8a), sx, y + 0.5, sz - 0.24, 0.55, 0.5, 0.06, false); }
    r.collide(w / 6 + 1.55, y, d / 2 - 3.75, 3.8, 0.9, 2.2);
    // leitos com cortinas, suporte de soro e monitor (fundo)
    const nb = Math.floor((w - 2) / 3.2);
    for (let k = 0; k < nb; k++) {
      const bx = -w / 2 + 1.8 + k * 3.2, bzz = -d / 2 + 1.5;
      r.box(M.metalLight, bx, y, bzz, 1.0, 0.55, 2.0, true, 1); r.box(P(0xf4f4f4), bx, y + 0.55, bzz, 0.95, 0.15, 1.9, false); r.box(P(0xa8c8e8), bx, y + 0.7, bzz + 0.3, 0.98, 0.04, 1.2, false); r.box(P(0xffffff), bx, y + 0.72, bzz - 0.7, 0.6, 0.12, 0.35, false);
      r.add(cyl(0.02, 0.02, 1.8, 6), M.metalLight, bx + 0.7, y + 0.9, bzz - 0.8); r.add(box(0.12, 0.2, 0.05), P(0xd8e8f8), bx + 0.7, y + 1.75, bzz - 0.8);
      r.box(M.metalDark, bx - 0.7, y + 1.3, bzz - 0.95, 0.4, 0.3, 0.1, false); r.add(box(0.3, 0.2, 0.01), M.ceilingLight, bx - 0.7, y + 1.45, bzz - 0.89);
      if (k < nb - 1) r.box(P(0x8ab8d8), bx + 1.6, y + 0.1, bzz, 0.04, 2.2, 2.2, false);
    }
    r.box(M.white, w / 2 - 0.4, y, -1, 0.6, 2.0, 2.5, true, 1); // armário de remédios
    r.add(box(0.02, 1.5, 2.0, 1.5, 2.0), prodMat('strip_farmacia1'), w / 2 - 0.71, y + 1.0, -1);
    for (const [px, pz] of [[-w / 2 + 0.6, d / 2 - 0.8], [w / 2 - 0.6, d / 2 - 0.8]]) { r.add(cyl(0.25, 0.2, 0.5, 10), P(0xd8d8d8), px, y + 0.25, pz); r.add(new THREE.IcosahedronGeometry(0.5, 0), M.hedge, px, y + 1.0, pz); }
    const [nx, nz] = r.pt(-w / 4, d / 2 - 5); this.hospitalNurse = [nx, nz, r.ry];
    const [hx, hz] = r.pt(-w / 4, d / 2 - 3); this.landmarks.push({ name: 'Recepção do Hospital', x: hx, z: hz, kind: 'hospital' });
    this.closeHollow(HO);
  }
  policeInterior(HO) {
    const M = this.M, { r, w, d, y } = HO; const P = (c) => paint(M.flatIn, c);
    // balcão de atendimento
    r.box(M.woodDark, 0, y, d / 2 - 3, 5, 1.1, 0.8, true, 1); r.box(P(0x1a2a5a), 0, y + 1.1, d / 2 - 3, 5.1, 0.05, 0.9, false);
    r.add(box(5, 1.0, 0.03), M.glass, 0, y + 1.6, d / 2 - 2.65);
    r.add(box(2.4, 0.45, 0.05, 2.4, 0.45), signMat('ATENDIMENTO', { bg: '#0e2a5c', fg: '#fff', w: 512, h: 96 }), 0, y + 2.9, d / 2 - 3.45);
    // mesas com computador
    for (let k = 0; k < 4; k++) { const tx = -w / 2 + 3 + k * 3.2, tz = -1; r.box(M.wood, tx, y + 0.74, tz, 1.6, 0.05, 0.8, false, 1); for (const sx of [-0.7, 0.7]) r.box(M.metalDark, tx + sx, y, tz, 0.05, 0.74, 0.7, false); r.box(M.metalDark, tx, y + 0.79, tz - 0.2, 0.5, 0.35, 0.05, false); r.add(box(0.44, 0.28, 0.01), M.ceilingLight, tx, y + 0.97, tz - 0.17); r.box(P(0x1a1a1a), tx, y + 0.45, tz + 0.7, 0.5, 0.08, 0.5, false); r.collide(tx, y, tz, 1.6, 0.8, 0.8); }
    // celas (fundo à direita) e armários
    const cx0 = w / 2 - 6, cw = 2.6;
    for (let k = 0; k < 2; k++) { const x0 = cx0 + k * cw + cw / 2; r.box(P(0xb8bcb0), x0 + cw / 2, y, -d / 2 + 1.5, 0.12, 3.4, 3, true, 1);
      for (let b = -cw / 2 + 0.2; b < cw / 2; b += 0.16) r.add(cyl(0.02, 0.02, 3.2, 6), M.metalDark, x0 + b, y + 1.6, -d / 2 + 3); r.collide(x0, y, -d / 2 + 3, cw, 3.4, 0.15);
      r.box(M.metalDark, x0, y + 0.4, -d / 2 + 0.8, 1.8, 0.08, 0.7, false); }
    r.box(P(0xb8bcb0), cx0, y, -d / 2 + 1.5, 0.12, 3.4, 3, true, 1);
    for (let k = 0; k < 5; k++) r.box(P(0x5a6a7a), -w / 2 + 0.5, y, -d / 2 + 1 + k * 0.62, 0.55, 1.9, 0.58, true, 1);
    // quadro de procurados
    r.box(M.woodDark, -w / 4, y + 1.2, -d / 2 + 0.05, 2.6, 1.4, 0.05, false); for (let k = 0; k < 4; k++) r.add(box(0.5, 0.6, 0.01, 0.5, 0.6), homeMat('photo'), -w / 4 - 0.9 + k * 0.6, y + 1.9, -d / 2 + 0.09);
    const [ox, oz] = r.pt(0, d / 2 - 4.1); this.policeDesk = [ox, oz, r.ry + Math.PI];
    this.closeHollow(HO);
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

  // SHOPPING LOS VALLES: prédio grande com átrio, chafariz, claraboia, 8 lojas no térreo, praça de alimentação
  // e mezanino de verdade (escadas que dá para subir). Interior num grupo separado, só desenhado de perto.
  mallBlock(F) {
    const M = this.M, y = CURB; const P = (c) => paint(M.flatIn, c);
    const f = new Frame(F.x, F.z, 0, F.B, this.world);
    const W = 50, D = 40, cz = 3, H = 11, t = 0.4, z0 = cz - D / 2, z1 = cz + D / 2; // z0 = -17 (frente), z1 = 23
    const fac = paint(M.flat, 0xd6cdbd), fin = paint(M.flat, 0x3a4250);
    // ---- casca externa ----
    f.box(fac, 0, y, z1 - t / 2, W, H, t, true, 24, 25.6);
    for (const s of [-1, 1]) f.box(fac, s * (W / 2 - t / 2), y, cz, t, H, D, true, 24, 25.6);
    for (const s of [-1, 1]) f.box(fac, s * (9 + (W / 2 - 9) / 2), y, z0 + t / 2, W / 2 - 9, H, t, true, 24, 25.6);
    f.box(fac, 0, y + 7, z0 + t / 2, 18, H - 7, t, false, 24, 25.6);
    // fachada de vidro com porta larga no meio
    for (const s of [-1, 1]) {
      f.add(box(6, 6.8, 0.06), M.glass, s * 6, y + 3.4, z0 + t / 2); f.collide(s * 6, y, z0 + t / 2, 6, 7, t);
      f.box(M.darkTrim, s * 3.05, y, z0 + t / 2, 0.16, 7, 0.5, false); f.box(M.darkTrim, s * 9, y, z0 + t / 2, 0.3, 7, 0.5, false);
      for (let k = 1; k < 3; k++) f.box(M.darkTrim, s * (3 + k * 2), y, z0 + t / 2, 0.08, 7, 0.12, false);
    }
    f.add(box(6, 3.4, 0.06), M.glass, 0, y + 5.3, z0 + t / 2);
    f.box(M.darkTrim, 0, y + 3.5, z0 + t / 2, 6.1, 0.18, 0.4, false); f.box(M.darkTrim, 0, y + 6.9, z0 + t / 2, 18.4, 0.25, 0.5, false);
    // faixas, cornija, telhado e equipamentos no teto
    for (const yy of [5, H - 0.6]) { f.box(M.white, 0, y + yy, z0 - 0.05, W + 0.2, 0.5, 0.3, false); f.box(M.white, 0, y + yy, z1 + 0.05, W + 0.2, 0.5, 0.3, false); for (const s of [-1, 1]) f.box(M.white, s * (W / 2 + 0.05), y + yy, cz, 0.3, 0.5, D + 0.2, false); }
    f.box(M.roof[1], 0, y + H, cz, W + 0.6, 0.5, D + 0.6, false); f.collide(0, y + H, cz, W, 0.5, D);
    f.box(M.metalLight, 0, y + H + 0.5, cz - 1, 11, 0.9, 31, false); f.add(box(10.4, 0.06, 30.4), M.glass, 0, y + H + 1.43, cz - 1);
    for (const [ax, az] of [[-18, 14], [-18, 6], [18, 14], [18, -8], [-18, -8]]) { f.box(M.metalLight, ax, y + H + 0.5, az, 3, 1.4, 2.2, false); f.add(cyl(0.6, 0.6, 0.1, 14), M.metalDark, ax, y + H + 1.95, az); }
    // aletas verticais escuras e painéis de cor na fachada (visual de centro comercial)
    for (const s of [-1, 1]) { for (let k = 0; k < 5; k++) f.box(fin, s * (11 + k * 3.4), y, z0 - 0.18, 0.6, H - 0.6, 0.36, false); for (let k = 0; k < 9; k++) f.box(fin, s * (W / 2 + 0.18), y, z0 + 3 + k * 4.4, 0.36, H - 0.6, 0.6, false); }
    for (let k = 0; k < 11; k++) f.box(fin, -W / 2 + 3 + k * 4.4, y, z1 + 0.18, 0.6, H - 0.6, 0.36, false);
    for (const s of [-1, 1]) f.box(signMat(s < 0 ? 'MODA • GASTRONOMIA' : 'CINEMA • LAZER', { bg: '#8a2a2a', fg: '#fff3dc', w: 1024, h: 300 }), s * 17.8, y + 5.6, z0 - 0.1, 12.4, 3.6, 0.2, false, 12.4, 3.6);
    f.ao(0, cz, W, D, 2.2);
    // letreiros
    f.box(signMat('SHOPPING LOS VALLES', { bg: '#14202e', fg: '#ffd27a', glow: true, w: 1024, h: 128 }), 0, y + 7.6, z0 - 0.12, 17, 2.1, 0.12, false, 17, 2.1);
    { const sw = this.sub(f, -W / 2 - 0.12, cz, -Math.PI / 2); sw.box(signMat('SHOPPING LOS VALLES', { bg: '#14202e', fg: '#ffd27a', glow: true, w: 1024, h: 128 }), 0, y + 7.2, 0, 18, 2.1, 0.12, false, 18, 2.1); }
    // marquise da entrada
    f.box(M.white, 0, y + 4.1, z0 - 2.6, 15, 0.4, 5.2, false); f.box(M.darkTrim, 0, y + 4.05, z0 - 5.15, 15, 0.12, 0.12, false);
    for (const s of [-1, 1]) f.box(M.metalDark, s * 7, y, z0 - 4.8, 0.35, 4.1, 0.35, true);
    // praça da frente: floreiras com árvores, bancos e bicicletário
    for (const s of [-1, 1]) for (const zz of [-21, -25]) { f.box(P(0x9a948a), s * 14, y, zz, 3, 0.55, 3, true, 1); f.add(plane(2.7, 2.7, 2), M.dirt, s * 14, y + 0.56, zz); this.trees.push([F.x + s * 14, F.z + zz, rr(0.7, 0.9)]); }
    for (const s of [-1, 1]) this.bench(f, s * 9.5, -23, 0);
    for (let k = 0; k < 5; k++) f.box(M.metalLight, -20 + k * 0.8, y, -18.6, 0.05, 0.75, 0.9, false);
    const [ex, ez] = f.pt(0, z0 - 6);
    this.landmarks.push({ name: 'Shopping Los Valles', x: ex, z: ez, kind: 'mall' });

    // ---- interior ----
    const IB = new Batcher(); const r = new Frame(F.x, F.z, 0, IB, this.world);
    const ix0 = -W / 2 + t, ix1 = W / 2 - t, iz0 = z0 + t, iz1 = z1 - t, iw = ix1 - ix0, id = iz1 - iz0;
    const wallC = P(0xf1ede5), cream = P(0xe6e0d4);
    r.add(plane(iw, id, 2.5), M.interiorFloor, 0, y + 0.03, cz);
    r.add(plane(12, 34, 1.5), M.interiorWood, 0, y + 0.035, cz - 1); // passarela central de madeira clara
    r.add(plane(iw, id, 4), M.ceiling, 0, y + H - 0.05, cz, 0, Math.PI);
    // claraboia (luz natural) com vigas
    r.add(box(10.4, 0.05, 30.4), M.ceilingLight, 0, y + H - 0.1, cz - 1);
    for (let k = 0; k < 11; k++) r.box(M.metalLight, 0, y + H - 0.45, cz - 16 + k * 3, 10.8, 0.3, 0.2, false);
    for (const s of [-1, 1]) r.box(M.metalLight, s * 5.3, y + H - 0.45, cz - 1, 0.2, 0.3, 31, false);
    // revestimento interno das paredes
    r.box(wallC, 0, y, iz1 - 0.02, iw, H - 0.1, 0.04, false); for (const s of [-1, 1]) r.box(wallC, s * (ix1 - 0.02), y, cz, 0.04, H - 0.1, id, false);
    for (const s of [-1, 1]) r.box(wallC, s * (9 + (ix1 - 9) / 2), y, iz0 + 0.02, ix1 - 9, H - 0.1, 0.04, false);
    r.box(wallC, 0, y + 7.05, iz0 + 0.02, 18, H - 7.15, 0.04, false);
    // ---- lojas do térreo (4 de cada lado) e praça de alimentação (3 no fundo) ----
    const SEG = 9, Z0S = -16, NSTORE = 4; // lojas de z = -16 a 20
    const left = ['Moda Vale Roupas', 'Mega Eletrônicos', 'Joalheria Diamante', 'Livraria Saber'];
    const right = ['Farmácia do Shopping', 'Ótica Olhar', 'Barbearia Estilo', 'Supermercado Express'];
    const mallStore = (sf, x, seg, core, name, bulkTop) => {
      const b = core.y0 ?? y;
      this.storeRoom(sf, x, 0, seg, core, [name]);
      sf.box(cream, x, b + 3.4, -0.12, seg, bulkTop - 3.4, 0.26, false);
      sf.add(box(seg - 1.6, 0.72, 0.06, seg - 1.6, 0.72), signMat(name.toUpperCase(), { bg: pick(['#1a1a1a', '#14283b', '#3b1414', '#102b1a', '#2b1a3b']), fg: pick(['#ffd27a', '#ffffff', '#b0e0ff']), glow: true, w: 512, h: 96 }), x, b + 4.0, 0.04);
    };
    const coreS = { GF: 5, sd: 9.5, IB };
    for (const s of [-1, 1]) {
      const sf = new Frame(...r.pt(s * 15, 0), s < 0 ? Math.PI / 2 : -Math.PI / 2, IB, this.world); // +z local aponta para o corredor
      const names = s < 0 ? left : right;
      for (let k = 0; k < NSTORE; k++) { const wz = Z0S + SEG / 2 + k * SEG; mallStore(sf, s < 0 ? -wz : wz, SEG, coreS, names[k], 4.75); }
    }
    { const sf = new Frame(...r.pt(0, 17), Math.PI, IB, this.world); const core = { GF: 5, sd: 5.6, IB };
      ['Lanchonete Grill', 'Pizzaria Forno', 'Padaria Doce Vale'].forEach((n, k) => mallStore(sf, -7 + k * 7, 7, core, n, 5.15));
      sf.add(box(8, 0.9, 0.06, 8, 0.9), signMat('PRAÇA DE ALIMENTAÇÃO', { bg: '#7a1a1a', fg: '#fff', glow: true, w: 1024, h: 128 }), 0, y + 7.2, -5.5); }
    for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) this.tableSet(r, -7.5 + i * 3, 13.8 + j * 2, y, pick([0xb02a2a, 0x1d3f8a, 0xd8a01a, 0x2a2a2a]));
    // ---- mezanino (andar de cima, com lojas "em breve") ----
    const up = [['Cinema Valles 3D', 'Academia Forma', 'Eletrônicos Games Zone', 'Livraria Gibis & Cia'], ['Roupas Esportes Pro', 'Mercadinho Brinquedos Alegria', 'Joalheria Perfumaria Essência', 'Sapataria Passo Certo']];
    const yM = y + 5; const STZ = [-11, -9]; // escadas chegam em z -11..-9
    for (const s of [-1, 1]) {
      r.box(cream, s * 13, yM - 0.4, 2, 4, 0.4, 36, true, 1);
      r.add(plane(4, 36, 2.5), M.interiorFloor, s * 13, yM + 0.01, 2);
      // guarda-corpo de vidro (com abertura na chegada da escada)
      for (const [za, zb] of [[-16, STZ[0]], [STZ[1], 20]]) { const L = zb - za, zc = (za + zb) / 2;
        r.add(box(0.05, 1.0, L), M.glass, s * 11.05, yM + 0.55, zc); r.box(M.metalLight, s * 11.05, yM + 1.05, zc, 0.08, 0.06, L, false); r.collide(s * 11.05, yM, zc, 0.2, 1.2, L); }
      for (const zz of [-16, 20]) { r.add(box(4, 1.0, 0.05), M.glass, s * 13, yM + 0.55, zz); r.collide(s * 13, yM, zz, 4, 1.2, 0.2); }
      // pilares
      for (let k = 0; k < 4; k++) r.box(cream, s * 11.3, y, -15 + k * 11.5, 0.45, 4.6, 0.45, true);
      // lojas do andar de cima (dá para entrar): piso sobre as lojas do térreo
      r.collide(s * 19.8, yM - 0.4, 2, 9.6, 0.4, 36);
      { const sf = new Frame(...r.pt(s * 15, 0), s < 0 ? Math.PI / 2 : -Math.PI / 2, IB, this.world); const core = { GF: 3.6, sd: 9.5, IB, y0: yM };
        for (let k = 0; k < NSTORE; k++) { const wz = Z0S + SEG / 2 + k * SEG; mallStore(sf, s < 0 ? -wz : wz, SEG, core, up[s < 0 ? 0 : 1][k], H - yM - 0.1); } }
      for (const ez3 of [-16.05, 20.05]) r.box(wallC, s * 19.8, y, ez3, 9.6, H - 0.1, 0.1, true);
      // escada de verdade: 20 degraus de 25 cm do térreo (|x| = 4) até o mezanino (|x| = 11)
      const run = 7 / 20, zc = (STZ[0] + STZ[1]) / 2, sw = STZ[1] - STZ[0];
      for (let k = 1; k <= 20; k++) { const sx = s * (4 + (k - 0.5) * run); r.box(k % 2 ? P(0xd8d4cc) : P(0xcfcac0), sx, y, zc, run + 0.01, 0.25 * k, sw, true, 1); r.box(M.metalDark, sx, y + 0.25 * k - 0.02, zc, run, 0.03, sw, false); }
      const ang = Math.atan2(5, 7), mid = s * 7.5;
      for (const ez2 of STZ) { r.add(box(8.6, 1.0, 0.05), M.glass, mid, y + 2.5 + 0.9, ez2, 0, 0, s < 0 ? -ang : ang); r.add(box(8.6, 0.07, 0.09), M.metalLight, mid, y + 2.5 + 1.42, ez2, 0, 0, s < 0 ? -ang : ang); }
    }
    // ---- chafariz central, bancos, floreiras e quiosque ----
    const fz = 3;
    r.add(cyl(3, 3.2, 0.55, 32), P(0xd8d4cc), 0, y + 0.28, fz); r.add(cyl(2.75, 2.75, 0.05, 32), M.water, 0, y + 0.5, fz);
    r.add(cyl(0.35, 0.5, 1.6, 12), P(0xd8d4cc), 0, y + 0.8, fz); r.add(cyl(1.2, 0.7, 0.22, 18), P(0xd8d4cc), 0, y + 1.7, fz); r.add(cyl(1.05, 1.05, 0.04, 18), M.water, 0, y + 1.82, fz);
    r.add(cyl(0.2, 0.3, 0.9, 10), P(0xd8d4cc), 0, y + 2.25, fz); r.add(cyl(0.05, 0.12, 1.2, 8), M.water, 0, y + 3.2, fz);
    this.world.addCentered(F.x, 0, F.z + fz, 6.2, 0.7, 6.2);
    for (const [bx, bz, br] of [[0, fz - 4.3, Math.PI], [0, fz + 4.3, 0], [-4.3, fz, -Math.PI / 2], [4.3, fz, Math.PI / 2]]) this.bench(r, bx, bz, br);
    for (const s of [-1, 1]) for (const pz of [-4, 10]) { r.box(P(0x8a6a4a), s * 7.5, y, pz, 1.2, 0.6, 1.2, true, 1); r.add(new THREE.IcosahedronGeometry(0.75, 1), M.hedge, s * 7.5, y + 1.15, pz); r.add(cyl(0.06, 0.08, 0.6, 6), M.woodDark, s * 7.5, y + 0.6, pz); }
    // quiosque de sorvete perto da entrada
    r.box(P(0xf2c6d8), 0, y, -11, 2.4, 1.05, 1.2, true, 1); r.box(M.white, 0, y + 1.05, -11, 2.5, 0.06, 1.3, false);
    for (const s of [-1, 1]) r.box(M.metalLight, s * 1.1, y + 1.1, -11, 0.06, 1.3, 0.06, false);
    r.box(P(0xe85a8a), 0, y + 2.4, -11, 2.7, 0.12, 1.5, false);
    r.add(box(2.2, 0.4, 0.05, 2.2, 0.4), signMat('SORVETES', { bg: '#e85a8a', fg: '#fff', w: 512, h: 96 }), 0, y + 2.75, -11.6);
    // painel de informações e lixeiras
    r.box(M.metalDark, 6, y, -13.5, 0.9, 2.0, 0.25, true, 1); r.add(box(0.8, 1.2, 0.02), M.ceilingLight, 6, y + 1.3, -13.36);
    for (const [lx, lz] of [[-9.6, 0], [9.6, 6], [-3, -14]]) r.add(cyl(0.22, 0.2, 0.75, 10), M.metalLight, lx, y + 0.38, lz);
    this.mallLoops = [{ cx: F.x, cz: F.z + fz, half: 6, type: 'mall' }, { cx: F.x, cz: F.z + fz, half: 9, type: 'mall' }];
    this.mallCenter = [F.x, F.z + fz];
    const grp = new THREE.Group(); grp.name = 'interior'; IB.flush(grp, { castShadow: false }); grp.visible = false; this.root.add(grp);
    this.interiors.push({ group: grp, x: F.x, z: F.z + cz });
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
    // duas espécies: copa arredondada (folhas texturizadas) e pinheiro.
    // Divididas em regiões de 300 m (o motor descarta as regiões fora da tela) e com versão simplificada para longe.
    const leafTex = TX.leavesTex();
    const leafMat = new THREE.MeshLambertMaterial({ map: leafTex, normalMap: TX.normalOf(leafTex, 3, 'leaves') });
    const blob = (detail) => {
      const g = new THREE.IcosahedronGeometry(1, detail); const pa = g.attributes.position;
      for (let i = 0; i < pa.count; i++) { // deforma levemente para não parecer esfera perfeita
        const v = new THREE.Vector3().fromBufferAttribute(pa, i);
        const k = 1 + Math.sin(v.x * 5.1) * 0.07 + Math.cos(v.y * 4.3 + v.z * 3.7) * 0.07;
        pa.setXYZ(i, v.x * k, v.y * k, v.z * k);
      }
      g.computeVertexNormals(); return g;
    };
    const pineGeo = (seg) => { const parts = []; for (let i = 0; i < 4; i++) { const g = new THREE.ConeGeometry(1.5 - i * 0.3, 2.2, seg); g.translate(0, 2.4 + i * 1.25, 0); parts.push(g); } return mergeGeometries(parts); };
    const trunkG = new THREE.CylinderGeometry(0.12, 0.24, 3.2, 7); trunkG.translate(0, 1.6, 0);
    const trunkFarG = new THREE.CylinderGeometry(0.12, 0.24, 3.2, 4); trunkFarG.translate(0, 1.6, 0);
    const G = { leaf: blob(2), leafFar: blob(1), pine: pineGeo(9), pineFar: pineGeo(5) };
    const CELL = 300; const cells = new Map();
    for (const t of this.trees) { const k = Math.floor(t[0] / CELL) + ',' + Math.floor(t[1] / CELL); if (!cells.has(k)) cells.set(k, []); cells.get(k).push(t); }
    this.treeCells = [];
    const m = new THREE.Matrix4(); const c = new THREE.Color(); const q = new THREE.Quaternion();
    for (const list of cells.values()) {
      const round = list.filter((t) => !t[3]).length, pines = list.length - round;
      const mk = (geo, mat, n, shadow) => { const o = new THREE.InstancedMesh(geo, mat, Math.max(1, n)); o.castShadow = shadow; o.receiveShadow = true; return o; };
      const near = { trunk: mk(trunkG, this.M.bark, list.length, true), leaves: mk(G.leaf, leafMat, round * 3, true), pine: mk(G.pine, leafMat, pines, true) };
      const far = { trunk: mk(trunkFarG, this.M.bark, list.length, false), leaves: mk(G.leafFar, leafMat, round * 3, false), pine: mk(G.pineFar, leafMat, pines, false) };
      let li = 0, ti = 0, pi = 0; let sx = 0, sz = 0;
      for (const [x, z, s, isPine] of list) {
        sx += x; sz += z;
        const y = groundHeight(x, z);
        m.compose(new THREE.Vector3(x, y, z), q.identity(), new THREE.Vector3(s, s * rr(0.9, 1.3), s));
        near.trunk.setMatrixAt(ti, m); far.trunk.setMatrixAt(ti++, m);
        if (isPine) {
          q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rand() * 6);
          m.compose(new THREE.Vector3(x, y, z), q, new THREE.Vector3(s, s * rr(1.0, 1.4), s));
          c.setHSL(rr(0.28, 0.36), rr(0.3, 0.45), rr(0.2, 0.28));
          for (const o of [near.pine, far.pine]) { o.setMatrixAt(pi, m); o.setColorAt(pi, c); } pi++;
        } else {
          const hue = rr(0.2, 0.3);
          for (let b = 0; b < 3; b++) {
            const ox = rr(-0.8, 0.8) * s, oz = rr(-0.8, 0.8) * s, oy = (2.9 + b * 0.9 + rr(-0.3, 0.3)) * s;
            const ls = s * rr(1.3, 2.0) * (b === 2 ? 0.75 : 1);
            q.setFromEuler(new THREE.Euler(rand(), rand(), rand()));
            m.compose(new THREE.Vector3(x + ox, y + oy, z + oz), q, new THREE.Vector3(ls, ls * 0.85, ls));
            c.setHSL(hue + rr(-0.02, 0.02), rr(0.4, 0.6), rr(0.32, 0.45) - b * 0.03 * -1);
            for (const o of [near.leaves, far.leaves]) { o.setMatrixAt(li, m); o.setColorAt(li, c); } li++;
          }
        }
        this.world.addCentered(x, 0, z, 0.5 * s, 3, 0.5 * s);
      }
      for (const set of [near, far]) {
        set.leaves.count = li; set.pine.count = pi;
        for (const o of Object.values(set)) { if (!o.count) { o.visible = false; o.empty = true; continue; } o.computeBoundingSphere(); this.scene.add(o); }
      }
      this.treeCells.push({ x: sx / list.length, z: sz / list.length, near, far, lod: null });
    }
    this.updateTrees(0, 0, true);
  }
  // perto da câmera: árvore detalhada; longe: versão simples (bem menos triângulos)
  updateTrees(cx, cz, force = false) {
    for (const cell of this.treeCells) {
      const d = Math.hypot(cell.x - cx, cell.z - cz); const lod = d > 300 * (this.lodMul || 1) ? 'far' : 'near';
      if (lod === cell.lod && !force) continue; cell.lod = lod;
      for (const o of Object.values(cell.near)) o.visible = lod === 'near' && !o.empty;
      for (const o of Object.values(cell.far)) o.visible = lod === 'far' && !o.empty;
    }
  }
}
