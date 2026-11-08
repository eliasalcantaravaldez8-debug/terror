// Locais da história fora da grade da cidade: favela/esconderijo, penitenciária, zona industrial e galpão,
// casa abandonada, mansão de Lucas e colina, casa de Fernando, sala do investigador, estúdio de fotos e portão de Blackwood.
import * as THREE from 'three';
import { Batcher, box, plane, cyl, gableRoof, mat } from './geo.js';
import { Frame, CURB } from './city.js';
import { mats, signMat } from './materials.js';
import { PLACES, hillHeight } from './places.js';
import { rand, rr, pick, setSeed } from './textures.js';
import * as TX from './textures.js';

export class Zones {
  constructor(scene, world, city) {
    this.scene = scene; this.world = world; this.city = city; this.M = mats();
    this.root = new THREE.Group(); this.root.name = 'zonas'; scene.add(this.root);
    this.spots = {}; // pontos nomeados usados pelas missões
  }
  F(x, z, ry, B) { return new Frame(x, z, ry, B, this.world); }
  lamp(x, y, z) { this.city.lamps.push([x, y, z]); }
  build() {
    setSeed(4242);
    const B = new Batcher();
    this.roads(B); this.favela(B); this.prison(B); this.industrial(B); this.abandoned(B);
    this.mansion(B); this.hill(); this.fernando(B); this.investigator(); this.studio(); this.blackwood(B);
    B.flush(this.root);
  }
  // ---------- estradas de acesso ----------
  roads(B) {
    const M = this.M; const y = CURB + 0.012;
    const road = (x0, z0, x1, z1, w = 8, material = M.asphalt) => {
      const len = Math.hypot(x1 - x0, z1 - z0), ang = Math.atan2(x1 - x0, z1 - z0);
      B.add(plane(w, len, 6), material, mat((x0 + x1) / 2, y, (z0 + z1) / 2, ang));
    };
    road(0, 234, 0, 302);                // cidade -> favela
    road(16, 352, 168, 352, 6, M.dirt);  // estrada de terra da fuga
    road(-234, 76, -306, 76);            // cidade -> penitenciária
    road(234, 0, 440, 0, 10);            // cidade -> zona industrial -> Blackwood
    road(330, -75, 330, 75, 9);          // ruas da zona industrial
    road(300, -20, 410, -20, 8); road(300, 22, 410, 22, 8);
    road(-76, -234, -76, -314);          // casa abandonada
    road(152, -234, 152, -320);          // mansão
    road(80, -300, 150, -300, 4, M.dirt);// trilha da colina
    road(-152, -234, -152, -296);        // casa de Fernando
  }
  // ---------- FAVELA / ESCONDERIJO ----------
  favela(B) {
    const M = this.M; const P = PLACES.favela;
    B.add(plane(P.w, P.d, 4), M.dirt, mat(P.x, CURB + 0.01, P.z));
    const colors = [0xc9a27a, 0xb5654a, 0x7a9ab0, 0xd8c08a, 0x9a7aa8, 0xb8b8a8, 0xa86a5a, 0x8aa87a];
    const F = this.F(0, 0, 0, B);
    for (let i = 0; i < 40; i++) {
      const x = P.x + rr(-36, 36), z = P.z + rr(-26, 26);
      if (Math.abs(x - PLACES.hideout.x) < 12 && Math.abs(z - PLACES.hideout.z) < 10) continue;
      if (Math.abs(x) < 5 || Math.abs(z - 352) < 5) continue; // vielas
      const w = rr(3.5, 6), d = rr(3.5, 6), h = rr(2.6, 3.2) * (rand() < 0.3 ? 2 : 1);
      const c = pick(colors);
      F.box(M.wall(c), x, CURB, z, w, h, d, true, 3, 3);
      F.box(M.wall(0x7a7a78), x, CURB + h, z, w + 0.3, 0.15, d + 0.3, false);
      F.box(M.woodDark, x, CURB, z + d / 2 + 0.02, 0.9, 2, 0.05, false, 1);
      F.box(M.winDark, x + w / 4, CURB + h - 1.4, z + d / 2 + 0.02, 0.8, 0.7, 0.05, false);
      F.ao(x, z, w, d, 1);
      if (rand() < 0.4) F.box(M.corr(0x5a7aa0), x, CURB + h + 0.15, z, 1.2, 1, 1.2, false, 2); // caixa d'água
    }
    // casa do esconderijo (interior visitável, porta voltada para +z)
    const H = PLACES.hideout, w = 9, d = 7, h = 3.2, t = 0.2;
    const f = this.F(H.x, H.z, 0, B);
    const wm = M.wall(0xb0a090);
    f.box(wm, 0, CURB, -d / 2, w, h, t, true, 3); f.box(wm, -w / 2, CURB, 0, t, h, d, true, 3); f.box(wm, w / 2, CURB, 0, t, h, d, true, 3);
    f.box(wm, -w / 4 - 0.6, CURB, d / 2, w / 2 - 1.2, h, t, true, 3); f.box(wm, w / 4 + 0.6, CURB, d / 2, w / 2 - 1.2, h, t, true, 3);
    f.box(wm, 0, CURB + 2.2, d / 2, 2.4, h - 2.2, t, false);
    f.box(M.wall(0x6a6a68), 0, CURB + h, 0, w + 0.4, 0.2, d + 0.4, true);
    f.add(plane(w - 0.4, d - 0.4, 2), M.tile, 0, CURB + 0.02, 0);
    f.add(plane(w - 0.6, d - 0.6, 3), M.interior, 0, CURB + h - 0.01, 0, 0, Math.PI);
    f.add(box(1.2, 0.05, 0.4), M.ceilingLight, 0, CURB + h - 0.05, 0);
    // mesa, cadeira, colchão, armário
    f.box(M.woodDark, -1.5, CURB, -1.2, 1.6, 0.78, 0.9, true, 1);
    f.box(M.metalDark, -1.5, CURB, -0.2, 0.5, 0.45, 0.5, false); // cadeira (assento)
    f.box(M.metalDark, -1.5, CURB + 0.45, 0.05, 0.5, 0.5, 0.06, false);
    f.box(M.wall(0x6a5a8a), 3, CURB, -2.2, 2.2, 0.3, 1.2, false);
    f.box(M.woodDark, 3.7, CURB, 1.6, 0.6, 1.9, 1.4, true, 1);
    f.box(M.red, -1.2, CURB + 0.78, -1.3, 0.3, 0.1, 0.2, false);
    this.spots.hideoutChair = f.pt(-1.5, -0.2);
    this.spots.hideoutDoorIn = f.pt(0, d / 2 - 1);
    this.spots.hideoutOut = f.pt(0, d / 2 + 3);
    this.spots.hideoutCar = f.pt(4, d / 2 + 6);
    { const [lx, lz] = f.pt(0, d / 2 + 0.6); this.lamp(lx, CURB + 2.6, lz); }
    { const [lx, lz] = f.pt(0, 0); this.lamp(lx, CURB + h - 0.3, lz); } // lâmpada dentro do esconderijo
    // postes da favela
    for (const [x, z] of [[-20, 312], [18, 318], [-28, 345], [10, 348], [30, 340], [60, 352], [100, 352], [140, 352]]) {
      B.add(cyl(0.06, 0.08, 4.5, 6), M.metalDark, mat(x, CURB + 2.25, z)); B.add(new THREE.SphereGeometry(0.22, 8, 6), M.lamp, mat(x, CURB + 4.5, z)); this.lamp(x, CURB + 4.4, z);
    }
    // muro da batida (fim da estrada de terra)
    const C = PLACES.crashWall;
    B.add(box(1.2, 2.6, 16, 3), M.facade.brick, mat(C.x, CURB + 1.3, C.z));
    this.world.addCentered(C.x, 0, C.z, 1.2, 2.6, 16);
  }
  // ---------- PENITENCIÁRIA ----------
  prison(B) {
    const M = this.M; const P = PLACES.prison; const w = P.w, d = P.d, h = 7;
    const f = this.F(P.x, P.z, 0, B);
    const wm = M.wall(0x9a968c);
    f.box(wm, 0, CURB, -d / 2, w, h, 1, true, 3); f.box(wm, 0, CURB, d / 2, w, h, 1, true, 3); f.box(wm, -w / 2, CURB, 0, 1, h, d, true, 3);
    f.box(wm, w / 2, CURB, -d / 4 - 2.5, 1, h, d / 2 - 5, true, 3); f.box(wm, w / 2, CURB, d / 4 + 2.5, 1, h, d / 2 - 5, true, 3);
    f.box(M.metalDark, w / 2 + 0.2, CURB, -4.4, 0.2, 5, 1.2, false); f.box(M.metalDark, w / 2 + 0.2, CURB, 4.4, 0.2, 5, 1.2, false);
    for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      f.box(wm, sx * w / 2, CURB, sz * d / 2, 3, 11, 3, true, 3);
      f.box(M.metalDark, sx * w / 2, CURB + 11, sz * d / 2, 3.6, 0.4, 3.6, false);
      const [lx, lz] = f.pt(sx * w / 2, sz * d / 2); this.lamp(lx, CURB + 11.5, lz);
    }
    f.box(M.facade.concrete, -8, CURB, 0, 34, 9.6, 26, true, 24, 25.6); f.ao(-8, 0, 34, 26, 1.6);
    f.box(signMat('PENITENCIÁRIA ESTADUAL', { bg: '#2a2a2a', fg: '#e0e0e0', glow: true, w: 1024, h: 128 }), w / 2 + 0.6, CURB + 5.5, 0, 0.1, 1, 10, false, 10, 1);
    f.add(plane(w - 2, d - 2, 3), M.concreteFlat, 0, CURB + 0.01, 0);
    this.spots.prisonGateIn = f.pt(w / 2 - 4, 0);
    this.spots.prisonGateOut = f.pt(w / 2 + 6, 0);
    this.spots.prisonPickup = f.pt(w / 2 + 14, 2);
  }
  // ---------- ZONA INDUSTRIAL ----------
  warehouse(B, x, z, w, d, h, color, opts = {}) {
    const M = this.M; const f = this.F(x, z, opts.ry || 0, B);
    const cm = M.corr(color), t = 0.3;
    if (opts.interior) {
      const door = opts.door || 8;
      f.box(cm, 0, CURB, -d / 2, w, h, t, true, 2); f.box(cm, 0, CURB, d / 2, w, h, t, true, 2);
      f.box(cm, w / 2, CURB, 0, t, h, d, true, 2);
      f.box(cm, -w / 2, CURB, -(d / 2 + door / 2) / 2 - door / 4, t, h, (d - door) / 2, true, 2);
      f.box(cm, -w / 2, CURB, (d / 2 + door / 2) / 2 + door / 4, t, h, (d - door) / 2, true, 2);
      f.box(cm, -w / 2, CURB + 5, 0, t, h - 5, door, false, 2);
      f.box(M.corr(0x6a6a6a), 0, CURB + h, 0, w + 0.6, 0.3, d + 0.6, true, 2);
      f.add(plane(w - 0.6, d - 0.6, 3), M.concreteFlat, 0, CURB + 0.02, 0);
      for (let i = -1; i <= 1; i++) f.add(box(2, 0.08, 0.6), M.ceilingLight, i * w / 3.2, CURB + h - 0.1, 0);
    } else {
      f.box(cm, 0, CURB, 0, w, h, d, true, 2);
      f.box(M.metalDark, -w / 2 - 0.02, CURB, 0, 0.05, 4.5, Math.min(6, d - 2), false);
      f.box(M.corr(0x6a6a6a), 0, CURB + h, 0, w + 0.6, 0.3, d + 0.6, false, 2);
    }
    f.ao(0, 0, w, d, 2);
    return f;
  }
  industrial(B) {
    const M = this.M; const I = PLACES.industrial;
    B.add(plane(I.w, I.d, 3), M.concrete, mat(I.x + 5, CURB + 0.004, I.z));
    // armazéns comuns
    this.warehouse(B, 305, -55, 18, 26, 9, 0x8a9aa8);
    this.warehouse(B, 305, 50, 18, 30, 10, 0xa8a090);
    this.warehouse(B, 395, -55, 22, 26, 10, 0x7a8a7a);
    this.warehouse(B, 398, 52, 20, 24, 9, 0x9a8a7a);
    this.warehouse(B, 365, -55, 18, 18, 7, 0x8a5a4a); // território rival
    // galpão abandonado (interior) - porta a oeste
    const G = PLACES.galpao;
    const gf = this.warehouse(B, G.x + 2, G.z, 30, 20, 9, 0x6a6058, { interior: true, door: 8 });
    // mesas com dinheiro e pacotes, caixas
    for (const [lx, lz] of [[4, -5], [4, 5], [10, 0]]) {
      gf.box(M.woodDark, lx, CURB, lz, 2.4, 0.8, 1.2, true, 1);
      for (let i = 0; i < 4; i++) gf.box(M.green, lx - 0.8 + i * 0.5, CURB + 0.8, lz - 0.2, 0.4, 0.12 + rand() * 0.2, 0.25, false);
      for (let i = 0; i < 3; i++) gf.box(M.white, lx - 0.6 + i * 0.6, CURB + 0.8, lz + 0.3, 0.45, 0.15, 0.3, false);
    }
    for (let i = 0; i < 10; i++) gf.box(M.wood, rr(-12, 12), CURB, pick([-8.5, 8.5]) + rr(-0.5, 0.5), 1.2, 1.2, 1.2, true, 1);
    for (const lx of [-9, 0, 9]) { const [x, z] = gf.pt(lx, 0); this.lamp(x, CURB + 8.4, z); }
    this.spots.galpaoDoor = gf.pt(-15 - 4, 0);
    this.spots.galpaoInside = gf.pt(-4, 0);
    this.spots.galpaoBack = gf.pt(12, -6);
    this.spots.galpaoCarSpot = gf.pt(-15 - 9, 6);
    // contêineres empilhados
    const cc = [0xa83a2a, 0x2a5a8a, 0x3a7a4a, 0xc89a2a, 0x6a6a6a];
    for (let i = 0; i < 14; i++) {
      const x = pick([318, 342, 375, 388]) + rr(-3, 3), z = rr(-10, 12) + (i % 2 ? -50 : 0) + (i % 3 ? 0 : 75);
      if (Math.abs(x - 330) < 8 || Math.abs(z + 20) < 7 || Math.abs(z - 22) < 7 || Math.abs(z) < 7) continue;
      if (x > 345 && x < 380 && z > 35 && z < 62) continue;
      const rot = rand() < 0.5 ? 0 : Math.PI / 2;
      const f = this.F(x, z, rot, B);
      const stack = 1 + Math.floor(rand() * 2);
      for (let s = 0; s < stack; s++) f.box(M.corr(pick(cc)), 0, CURB + s * 2.6, 0, 2.4, 2.6, 6, s === 0, 2);
      f.ao(0, 0, 2.4, 6, 1);
    }
    // cerca e postes
    for (const [x, z] of [[300, -75], [300, 75], [410, -75], [410, 75]]) { B.add(cyl(0.1, 0.12, 8, 6), M.metalDark, mat(x, CURB + 4, z)); this.lamp(x, CURB + 8, z); }
    for (const [x, z] of [[330, -40], [330, 40], [360, -20], [360, 22], [395, -20], [395, 22], [345, 30]]) { B.add(cyl(0.08, 0.1, 7, 6), M.metalDark, mat(x + 5, CURB + 3.5, z + 4)); this.lamp(x + 5, CURB + 7, z + 4); this.world.addCentered(x + 5, 0, z + 4, 0.3, 7, 0.3); }
    const fence = (x0, z0, x1, z1) => {
      const len = Math.hypot(x1 - x0, z1 - z0), ang = Math.atan2(x1 - x0, z1 - z0);
      B.add(box(0.06, 2.2, len), M.metalLight, mat((x0 + x1) / 2, CURB + 1.1, (z0 + z1) / 2, ang));
      this.world.addBox(Math.min(x0, x1) - 0.1, 0, Math.min(z0, z1) - 0.1, Math.max(x0, x1) + 0.1, 2.2, Math.max(z0, z1) + 0.1);
    };
    fence(296, -78, 296, -6); fence(296, 6, 296, 78); fence(296, 78, 414, 78); fence(296, -78, 414, -78);
    fence(414, -78, 414, -6); fence(414, 6, 414, 78);
    // território rival: escritório com mesa do livro
    const T = PLACES.bookTable;
    const tf = this.F(T.x, T.z, 0, B);
    tf.box(M.corr(0x3a3a3a), 0, CURB + 2.6, 0, 6, 0.15, 4, false);
    for (const [sx, sz] of [[-2.8, -1.8], [2.8, -1.8], [-2.8, 1.8], [2.8, 1.8]]) tf.box(M.metalDark, sx, CURB, sz, 0.12, 2.6, 0.12, false);
    tf.box(M.woodDark, 0, CURB, 0, 2, 0.8, 1, true, 1);
    tf.box(M.red, 0.3, CURB + 0.8, 0, 0.35, 0.08, 0.25, false); // o livro
    tf.box(signMat('PROPRIEDADE PRIVADA', { bg: '#7a1010', fg: '#fff' }), -6, CURB + 1.4, 3, 2.4, 0.5, 0.05, false, 2.4, 0.5);
    tf.box(M.metalDark, -6, CURB, 3, 0.08, 1.4, 0.08, false);
    this.spots.book = [T.x + 0.3, T.z];
    this.spots.rivalCenter = [PLACES.rivalTerritory.x, PLACES.rivalTerritory.z];
    this.spots.victorCar = [345, -30];
  }
  // ---------- CASA ABANDONADA ----------
  abandoned(B) {
    const M = this.M; const A = PLACES.abandoned; const w = 11, d = 9, h = 3.1, t = 0.22;
    B.add(plane(A.w, A.d, 4), M.dirt, mat(A.x, CURB + 0.008, A.z));
    const f = this.F(A.x, A.z, 0, B); // porta voltada para +z (estrada)
    const wm = M.siding[0].mat ? { isPaint: true, mat: M.siding[0].mat, color: 0x6a6458 } : M.wall(0x6a6458);
    f.box(wm, 0, CURB, -d / 2, w, h, t, true, 3); f.box(wm, -w / 2, CURB, 0, t, h, d, true, 3); f.box(wm, w / 2, CURB, 0, t, h, d, true, 3);
    f.box(wm, -w / 4 - 0.5, CURB, d / 2, w / 2 - 1, h, t, true, 3); f.box(wm, w / 4 + 0.5, CURB, d / 2, w / 2 - 1, h, t, true, 3);
    f.box(wm, 0, CURB + 2.2, d / 2, 2, h - 2.2, t, false);
    f.add(gableRoof(w, d, 1.8, 0.4), M.roof[1], 0, CURB + h, 0);
    f.box(M.woodDark, 0, CURB + h - 0.1, 0, w, 0.1, d, true, 1);
    for (const x of [-3.5, 3.5]) { f.box(M.woodDark, x, CURB + 1.2, d / 2 + 0.05, 1.3, 0.12, 0.05, false, 1); f.box(M.woodDark, x, CURB + 1.6, d / 2 + 0.05, 1.3, 0.12, 0.05, false, 1); }
    f.add(plane(w - 0.5, d - 0.5, 2), M.woodDark.mat ? M.dirt : M.dirt, 0, CURB + 0.015, 0);
    for (let i = 0; i < 6; i++) f.box(M.wood, rr(-4, 4), CURB, rr(-3, 3), rr(0.4, 1.6), 0.15, rr(0.2, 0.5), false, 1);
    f.ao(0, 0, w, d, 1.5);
    this.spots.abandonedInside = f.pt(0, 0);
    this.spots.abandonedFront = f.pt(0, d / 2 + 6);
    for (let i = 0; i < 8; i++) this.city.trees.push([A.x + rr(-18, 18), A.z + rr(-16, -8), rr(1, 1.6), rand() < 0.3]);
  }
  // ---------- MANSÃO DE LUCAS ----------
  mansion(B) {
    const M = this.M; const P = PLACES.mansion; const W = P.w, D = P.d;
    const f = this.F(P.x, P.z, 0, B);
    B.add(plane(W, D, 4), M.grass, mat(P.x, CURB + 0.008, P.z));
    // muro com portão ao sul (+z local = sul, voltado para a estrada)
    const wm = M.wall(0xe0d8c8), wh = 3;
    f.box(wm, 0, CURB, -D / 2, W, wh, 0.5, true, 3);
    f.box(wm, -W / 2, CURB, 0, 0.5, wh, D, true, 3); f.box(wm, W / 2, CURB, 0, 0.5, wh, D, true, 3);
    f.box(wm, -W / 4 - 2, CURB, D / 2, W / 2 - 4, wh, 0.5, true, 3); f.box(wm, W / 4 + 2, CURB, D / 2, W / 2 - 4, wh, 0.5, true, 3);
    for (const s of [-4.2, 4.2]) { f.box(wm, s, CURB, D / 2, 0.9, 3.6, 0.9, true, 3); const [lx, lz] = f.pt(s, D / 2 + 0.6); this.lamp(lx, CURB + 3.8, lz); }
    // casa principal (2 andares) com hall visitável no térreo, porta ao sul
    const hx = 0, hz = -8, w = 30, d = 16, fh = 3.6, t = 0.3;
    const fac = M.facade.plaster;
    const hf = this.F(P.x + hx, P.z + hz, 0, B);
    hf.box(fac, 0, CURB, -d / 2, w, fh * 2, t, true, 24, 25.6);
    hf.box(fac, w / 2, CURB, 0, t, fh * 2, d, true, 24, 25.6);
    // parede oeste: térreo inteiro, andar de cima com a janela do quarto (voltada para a colina)
    hf.box(fac, -w / 2, CURB, 0, t, fh, d, true, 24, 25.6);
    hf.box(fac, -w / 2, CURB + fh, -d / 4 - 1.5, t, fh, d / 2 - 3, true, 24, 25.6);
    hf.box(fac, -w / 2, CURB + fh, d / 4 + 1.5, t, fh, d / 2 - 3, true, 24, 25.6);
    hf.box(fac, -w / 2, CURB + fh, 0, t, 0.9, 3, false, 24, 25.6);
    hf.box(fac, -w / 2, CURB + fh + 2.9, 0, t, 0.7, 3, false, 24, 25.6);
    hf.add(box(0.04, 2, 3), M.glass, -w / 2, CURB + fh + 1.9, 0);
    // frente com porta de 3m
    hf.box(fac, -w / 4 - 0.75, CURB, d / 2, w / 2 - 1.5, fh * 2, t, true, 24, 25.6);
    hf.box(fac, w / 4 + 0.75, CURB, d / 2, w / 2 - 1.5, fh * 2, t, true, 24, 25.6);
    hf.box(fac, 0, CURB + 3, d / 2, 3, fh * 2 - 3, t, false, 24, 25.6);
    hf.box(M.concrete, 0, CURB + fh, 0, w, 0.3, d, true, 2); // laje do 2º andar
    hf.box(M.concrete, 0, CURB + fh * 2, 0, w + 1, 0.4, d + 1, true, 2);
    hf.box(M.white, 0, CURB + fh * 2 + 0.4, 0, w + 1.2, 0.6, d + 1.2, false);
    hf.add(plane(w - 0.6, d - 0.6, 2), M.tile, 0, CURB + 0.02, 0);
    hf.add(plane(w - 0.6, d - 0.6, 3), M.interior, 0, CURB + fh - 0.01, 0, 0, Math.PI);
    for (const x of [-8, 0, 8]) { hf.add(box(1.6, 0.06, 1.6), M.ceilingLight, x, CURB + fh - 0.06, 0); const [lx, lz] = hf.pt(x, 0); this.lamp(lx, CURB + fh - 0.3, lz); }
    // quarto iluminado do andar de cima (atrás da janela oeste)
    hf.box(M.ceilingLight, -w / 2 + 3.2, CURB + fh + 0.3, 0, 0.1, 3, 5, false);
    hf.add(plane(5, 5, 2), M.ceilingLight, -w / 2 + 3, CURB + fh * 2 - 0.05, 0, 0, Math.PI);
    hf.box(M.ceilingLight, -w / 2 + 3, CURB + fh + 0.3, -2.5, 5.4, 3, 0.1, false);
    hf.box(M.ceilingLight, -w / 2 + 3, CURB + fh + 0.3, 2.5, 5.4, 3, 0.1, false);
    // móveis do hall
    hf.box(M.woodDark, -6, CURB, -3, 3, 0.8, 1.4, true, 1);
    hf.box(M.wall(0x7a2a2a), 5, CURB, -4.5, 5, 0.8, 1.6, true, 3);
    hf.box(M.metalLight, 9, CURB, 3, 1.2, 1.2, 1.2, true, 1);
    // colunas e escada da entrada
    for (const s of [-2.6, 2.6]) hf.box(M.white, s, CURB, d / 2 + 2.4, 0.6, fh * 2, 0.6, true);
    hf.box(M.white, 0, CURB + fh * 2 - 0.5, d / 2 + 2.2, 7, 0.5, 4.6, false);
    hf.ao(0, 0, w, d, 2);
    // garagem a leste com abertura para o sul
    const gx = w / 2 + 6, gw = 10, gd = 12;
    hf.box(fac, gx, CURB, -gd / 2 + 2, gw, 3.6, t, true, 24, 25.6);
    hf.box(fac, gx + gw / 2, CURB, 2, t, 3.6, gd, true, 24, 25.6);
    hf.box(M.concrete, gx, CURB + 3.6, 2, gw + 0.4, 0.3, gd + 0.4, true, 2);
    this.spots.garageCar = hf.pt(gx, 2);
    // piscina e jardim
    f.box(M.white, -16, CURB, 16, 14, 0.25, 7, false); f.add(plane(13, 6), M.water, -16, CURB + 0.27, 16);
    { const [px, pz] = f.pt(-16, 16); this.world.addCentered(px, 0, pz, 14, 0.7, 7); }
    for (const [x, z] of [[-30, -24], [-30, 20], [30, 20], [-20, 4], [20, 18], [28, -26]]) this.city.trees.push([P.x + x, P.z + z, rr(1, 1.4), rand() < 0.5]);
    for (const [x, z] of [[-10, 22], [10, 22], [-30, 0], [30, 0], [0, 10]]) { f.add(cyl(0.06, 0.08, 3.4, 6), M.metalDark, x, CURB + 1.7, z); f.add(new THREE.SphereGeometry(0.25, 8, 6), M.lamp, x, CURB + 3.5, z); const [lx, lz] = f.pt(x, z); this.lamp(lx, CURB + 3.5, lz); }
    // pontos usados pela missão
    const S = this.spots;
    S.mansionGate = f.pt(0, D / 2 + 4);
    S.mansionApproach = f.pt(-8, D / 2 + 14);
    S.mansionDoor = hf.pt(0, d / 2 + 1);
    S.mansionHall = hf.pt(0, 2);
    S.lucasHall = hf.pt(0, -4);
    S.brotherWindow = [P.x + hx - w / 2 + 1.6, CURB + fh + 0.3, P.z + hz];
    S.mansionCarOut = f.pt(-6, D / 2 + 10);
    S.guardRoutes = [
      [f.pt(-30, 24), f.pt(-30, -24)], [f.pt(30, 24), f.pt(30, -24)], [f.pt(-20, 22), f.pt(20, 22)],
      [f.pt(-25, -26), f.pt(25, -26)], [f.pt(-6, 12), f.pt(6, 12)], [f.pt(-34, 0), f.pt(-20, 8)], [f.pt(31, 12), f.pt(34, -12)],
    ];
  }
  hill() {
    const H = PLACES.hill;
    const g = new THREE.PlaneGeometry(H.r * 2, H.r * 2, 36, 36); g.rotateX(-Math.PI / 2);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) { const x = p.getX(i) + H.x, z = p.getZ(i) + H.z; p.setY(i, CURB + hillHeight(x, z) + 0.02); }
    const uv = g.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * H.r / 2, uv.getY(i) * H.r / 2);
    g.computeVertexNormals();
    const m = new THREE.Mesh(g, this.M.grass); m.position.set(H.x, 0, H.z); m.receiveShadow = true;
    this.root.add(m);
    this.spots.hillTop = [H.x + 14, H.z - 2];
    for (let i = 0; i < 10; i++) { const a = rand() * 6.28, r = rr(18, 40); this.city.trees.push([H.x + Math.cos(a) * r, H.z + Math.sin(a) * r, rr(1, 1.5), rand() < 0.6]); }
  }
  // ---------- CASA DE FERNANDO ----------
  fernando(B) {
    const M = this.M; const P = PLACES.fernando; const w = 14, d = 10, h = 3, t = 0.2;
    B.add(plane(P.w, P.d, 4), M.grass, mat(P.x, CURB + 0.008, P.z));
    const f = this.F(P.x, P.z, 0, B); // frente +z
    const wm = M.siding[3];
    f.box(wm, 0, CURB, -d / 2, w, h, t, true, 3); f.box(wm, -w / 2, CURB, 0, t, h, d, true, 3); f.box(wm, w / 2, CURB, 0, t, h, d, true, 3);
    f.box(wm, -w / 4 - 0.6, CURB, d / 2, w / 2 - 1.2, h, t, true, 3); f.box(wm, w / 4 + 0.6, CURB, d / 2, w / 2 - 1.2, h, t, true, 3);
    f.box(wm, 0, CURB + 2.2, d / 2, 2.4, h - 2.2, t, false);
    // parede interna (sala | quarto) com porta
    f.box(M.interior, -1.5, CURB, -1, w / 2 - 2, h, 0.15, true, 2); f.box(M.interior, w / 2 - 2, CURB, -1, 4, h, 0.15, true, 2);
    f.add(gableRoof(w, d, 1.6, 0.4), M.roof[2], 0, CURB + h, 0);
    f.box(M.interior, 0, CURB + h - 0.05, 0, w, 0.1, d, true, 2);
    f.add(plane(w - 0.4, d - 0.4, 2), M.tile, 0, CURB + 0.02, 0);
    // quarto (fundos): cama
    f.box(M.woodDark, 3, CURB, -3.3, 2, 0.45, 2.4, true, 1);
    f.box(M.white, 3, CURB + 0.45, -3.3, 1.9, 0.15, 2.3, false);
    f.box(M.white, 3, CURB + 0.6, -4.2, 1.2, 0.15, 0.45, false);
    f.box(M.woodDark, 0.8, CURB, -4.4, 0.6, 0.6, 0.5, false, 1);
    // sala
    f.box(M.wall(0x5a4a3a), -3.5, CURB, 2.5, 3, 0.8, 1, true, 3);
    f.box(M.metalDark, -3.5, CURB, 4.3, 1.8, 0.9, 0.4, false);
    f.ao(0, 0, w, d, 1.5);
    const S = this.spots;
    S.fernandoBed = f.pt(3, -3.4); S.fernandoBedHead = f.pt(3, -4.3);
    S.fernandoFront = f.pt(0, d / 2 + 8); S.fernandoDoor = f.pt(0, d / 2 + 0.5);
    S.fernandoCams = [
      { p: f.pt(-w / 2 - 0.3, d / 2 + 0.3), y: CURB + 2.8, yaw: 0.6, sweep: 0.7 },
      { p: f.pt(w / 2 + 0.3, d / 2 + 0.3), y: CURB + 2.8, yaw: -0.6, sweep: 0.7 },
      { p: f.pt(w / 2 + 0.3, -d / 2 - 0.3), y: CURB + 2.8, yaw: -2.2, sweep: 0.6 },
      { p: f.pt(-w / 2 + 0.4, d / 2 - 0.4), y: CURB + 2.6, yaw: 2.4, sweep: 0.8, inside: true },
    ];
    this.city.trees.push([P.x - 14, P.z + 10, 1.2, false], [P.x + 15, P.z - 8, 1.3, true]);
  }
  // ---------- SALA DO INVESTIGADOR (subterrânea, só para cutscene) ----------
  investigator() {
    const M = this.M; const R = PLACES.investigatorRoom; const B = new Batcher();
    const w = 7, d = 6, h = 3;
    const inner = (x, y, z, sx, sy, sz, material) => B.add(box(sx, sy, sz, 2), material, mat(R.x + x, R.y + y, R.z + z));
    const wall = M.wall(0x4a5058);
    inner(0, -0.1, 0, w, 0.2, d, M.woodDark); inner(0, h, 0, w, 0.2, d, wall);
    inner(-w / 2, h / 2, 0, 0.2, h, d, wall); inner(w / 2, h / 2, 0, 0.2, h, d, wall); inner(0, h / 2, -d / 2, w, h, 0.2, wall); inner(0, h / 2, d / 2, w, h, 0.2, wall);
    inner(0, 0.38, -1, 2.4, 0.76, 1.2, M.woodDark);                 // mesa
    inner(0.9, 0.85, -1.2, 0.15, 0.2, 0.15, M.metalDark);            // abajur
    inner(0.9, 1.0, -1.2, 0.35, 0.18, 0.35, M.ceilingLight);
    inner(0, 1.6, -d / 2 + 0.12, 3.2, 1.6, 0.05, M.wood);            // quadro de cortiça
    B.flush(this.root);
    // fotos no quadro e a foto principal na mesa (texturas preenchidas pela história)
    const photoMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const desk = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.3).rotateX(-Math.PI / 2), photoMat);
    desk.position.set(R.x - 0.2, R.y + 0.77, R.z - 0.9); desk.rotation.y = 0.08;
    this.root.add(desk);
    this.investigatorPhoto = photoMat;
    const pins = new THREE.MeshBasicMaterial({ color: 0xd8d0c0 });
    for (let i = 0; i < 6; i++) { const m = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.3), pins); m.position.set(R.x - 1.2 + (i % 3) * 1.2, R.y + 1.25 + Math.floor(i / 3) * 0.6, R.z - d / 2 + 0.16); m.rotation.z = rr(-0.1, 0.1); this.root.add(m); }
    const lamp = new THREE.PointLight(0xffd8a0, 0, 7, 2); lamp.position.set(R.x + 0.9, R.y + 1.2, R.z - 1.1); this.root.add(lamp);
    this.investigatorLamp = lamp;
    this.spots.invChair = [R.x, R.y, R.z - 0.1];
    this.spots.invCam = [R.x + 1.6, R.y + 1.7, R.z + 1.8];
    this.spots.invLook = [R.x - 0.2, R.y + 0.8, R.z - 0.9];
  }
  // ---------- ESTÚDIO (gera as fotografias da história) ----------
  studio() {
    const S = PLACES.studio;
    const back = new THREE.Mesh(new THREE.PlaneGeometry(10, 6), new THREE.MeshLambertMaterial({ map: TX.facadeTex('brick').map, color: 0xb0a8a0 }));
    back.position.set(S.x, S.y + 2, S.z - 2); this.root.add(back);
    const fl = new THREE.Mesh(new THREE.PlaneGeometry(10, 8).rotateX(-Math.PI / 2), new THREE.MeshLambertMaterial({ map: TX.sidewalkTex() }));
    fl.position.set(S.x, S.y, S.z + 1); this.root.add(fl);
  }
  // ---------- PORTÃO DE BLACKWOOD ----------
  blackwood(B) {
    const M = this.M; const P = PLACES.blackwoodGate;
    B.add(box(1, 4, 0.3, 1, 4), signMat('BLACKWOOD', { bg: '#1a1a20', fg: '#c8c0a8', glow: true }), mat(P.x - 4, CURB + 4, -8));
    B.add(cyl(0.1, 0.1, 4, 6), M.metalDark, mat(P.x - 4, CURB + 2, -8));
    const bar = new THREE.Group();
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.2, 12), new THREE.MeshLambertMaterial({ color: 0xc8a020 }));
    stripe.position.set(P.x, CURB + 0.6, 0); bar.add(stripe);
    const sign = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.8, 4), new THREE.MeshLambertMaterial({ map: TX.signTex('ACESSO BLOQUEADO', { bg: '#8a1010', fg: '#fff', w: 512, h: 96 }) }));
    sign.position.set(P.x - 0.4, CURB + 1.8, 0); bar.add(sign);
    this.root.add(bar); this.blackwoodBarrier = bar;
    this.blackwoodBox = this.world.addCentered(P.x, 0, 0, 1, 4, 14);
    this.world.addBox(P.x - 0.5, 0, -40, P.x + 0.5, 6, -7); this.world.addBox(P.x - 0.5, 0, 7, P.x + 0.5, 6, 40);
  }
  unlockBlackwood() {
    if (!this.blackwoodBarrier.visible) return;
    this.blackwoodBarrier.visible = false; this.world.disableBox(this.blackwoodBox);
  }
}
