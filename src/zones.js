// Locais da história fora da grade da cidade: favela/esconderijo, penitenciária, zona industrial e galpão,
// casa abandonada, mansão de Lucas e colina, casa de Fernando, sala do investigador, estúdio de fotos e portão de Blackwood.
import * as THREE from 'three';
import { Batcher, box, plane, cyl, gableRoof, mat } from './geo.js';
import { Frame, CURB } from './city.js';
import { mats, signMat, paint, prodMat } from './materials.js';
import { PLACES, hillHeight } from './places.js';
import { rand, rr, pick, setSeed } from './textures.js';
import * as TX from './textures.js';
const TX_ = TX;

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
    this.mansion(B); this.hill(); this.fernando(B); this.airport(B); this.investigator(); this.studio(); this.blackwood(B);
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
  // interior simples de barraco (decoração com sorteio próprio para não mudar o resto do mapa)
  shack(HO) {
    const M = this.M, { r, w, d, y, GF } = HO; const P = (c) => paint(M.flatIn, c); const R = Math.random, pk = (a) => a[Math.floor(R() * a.length)];
    r.add(plane(w, d, 2), P(pk([0x8a6a4a, 0x7a7a72, 0xa88a6a])), 0, y + 0.04, 0);
    // colchão/cama no fundo, mesinha com cadeiras, fogão e geladeira, TV num caixote, prateleira e cortina
    r.box(M.woodDark, -w / 2 + 1.0, y, -d / 2 + 1.0, 1.4, 0.3, 1.9, true, 1); r.box(P(pk([0xb03a3a, 0x3a5a9a, 0x4a8a5a, 0xd8c070])), -w / 2 + 1.0, y + 0.3, -d / 2 + 1.0, 1.35, 0.14, 1.85, false); r.box(P(0xf2f0e8), -w / 2 + 1.0, y + 0.44, -d / 2 + 0.3, 0.9, 0.1, 0.3, false);
    r.box(M.wood, w / 2 - 1.0, y + 0.72, 0.2, 0.9, 0.05, 0.7, false, 1); r.box(M.woodDark, w / 2 - 1.0, y, 0.2, 0.08, 0.72, 0.08, false); r.collide(w / 2 - 1.0, y, 0.2, 0.9, 0.78, 0.7);
    for (const s2 of [-0.55, 0.55]) { r.box(P(pk([0xd03a2a, 0x2a6ad0, 0xf2f2f2])), w / 2 - 1.0, y + 0.42, 0.2 + s2, 0.38, 0.04, 0.38, false); r.box(M.metalDark, w / 2 - 1.0, y, 0.2 + s2, 0.32, 0.42, 0.32, false); }
    r.box(M.white, w / 2 - 0.45, y, -d / 2 + 0.45, 0.55, 0.85, 0.55, true, 1); r.box(M.metalDark, w / 2 - 0.45, y + 0.86, -d / 2 + 0.45, 0.5, 0.02, 0.5, false); // fogão
    if (w > 4.2) { r.box(M.white, w / 2 - 1.15, y, -d / 2 + 0.4, 0.6, 1.55, 0.6, true, 1); r.box(M.metalLight, w / 2 - 0.86, y + 0.9, -d / 2 + 0.73, 0.02, 0.4, 0.04, false); }
    r.box(M.wood, -w / 2 + 0.5, y, d / 2 - 1.2, 0.6, 0.5, 0.5, true, 1); r.box(P(0x111111), -w / 2 + 0.5, y + 0.5, d / 2 - 1.2, 0.5, 0.36, 0.3, false); r.add(box(0.42, 0.28, 0.01), paint(M.glowVC, 0x3a5a8a), -w / 2 + 0.5, y + 0.68, d / 2 - 1.04);
    r.box(M.wood, 0, y + 1.6, -d / 2 + 0.15, Math.min(1.6, w - 1.5), 0.04, 0.25, false, 1); for (let k = 0; k < 4; k++) r.box(P(pk([0xd8a040, 0xc83a3a, 0x3a8ac8, 0xf2f2f2])), -0.5 + k * 0.32, y + 1.62, -d / 2 + 0.15, 0.12, 0.2, 0.12, false);
    r.add(plane(1.4, 1.0, 1.4, 1.0), P(pk([0xa8402a, 0x2a6a8a, 0x8a6a2a])), 0, y + 0.05, d / 2 - 1.5);
    r.add(new THREE.SphereGeometry(0.06, 6, 5), M.lamp, 0, y + GF - 0.25, 0);
  }
  favela(B) {
    const M = this.M; const P = PLACES.favela;
    B.add(plane(P.w, P.d, 4), M.dirt, mat(P.x, CURB + 0.01, P.z));
    const colors = [0xc9a27a, 0xb5654a, 0x7a9ab0, 0xd8c08a, 0x9a7aa8, 0xb8b8a8, 0xa86a5a, 0x8aa87a];
    const F = this.F(0, 0, 0, B);
    const favIB = new Batcher(), favRects = [];
    for (let i = 0; i < 40; i++) {
      const x = P.x + rr(-36, 36), z = P.z + rr(-26, 26);
      if (Math.abs(x - PLACES.hideout.x) < 12 && Math.abs(z - PLACES.hideout.z) < 10) continue;
      if (Math.abs(x) < 5 || Math.abs(z - 352) < 5) continue; // vielas
      const w = rr(3.5, 6), d = rr(3.5, 6), h = rr(2.6, 3.2) * (rand() < 0.3 ? 2 : 1);
      const c = pick(colors);
      // barraco que dá para entrar: térreo oco com porta na frente (+z); interiores de todos num grupo só
      const gf = Math.min(h, 2.9);
      const over = favRects.some(([a, b, c2, d2]) => x + w / 2 > a && x - w / 2 < c2 && z + d / 2 > b && z - d / 2 < d2); // encostado em outro: fica fechado
      if (over) F.box(M.wall(c), x, CURB, z, w, h, d, true, 3, 3);
      else { const HO = this.city.hollow(F, x, z, w, d, h, M.wall(c), 'n', gf, { door: 0.95, doorX: 0, IB: favIB, tu: 3, tv: 3, doorH: 2.0, wallMat: paint(M.flatIn, c) }); this.shack(HO); }
      favRects.push([x - w / 2 - 0.3, z - d / 2 - 0.3, x + w / 2 + 0.3, z + d / 2 + 0.3]);
      F.box(M.wall(0x7a7a78), x, CURB + h, z, w + 0.3, 0.15, d + 0.3, false);
      F.box(M.woodDark, x + 0.45, CURB, z + d / 2 + 0.4, 0.05, 2, 0.8, false, 1); // porta aberta
      F.box(M.winDark, x + w / 4, CURB + h - 1.4, z + d / 2 + 0.02, 0.8, 0.7, 0.05, false);
      F.ao(x, z, w, d, 1);
      if (rand() < 0.4) F.box(M.corr(0x5a7aa0), x, CURB + h + 0.15, z, 1.2, 1, 1.2, false, 2); // caixa d'água
    }
    { const grp = new THREE.Group(); grp.name = 'interior'; favIB.flush(grp, { castShadow: false }); grp.visible = false; this.city.root.add(grp); this.city.interiors.push({ group: grp, x: P.x, z: P.z, r: 75 }); }
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
    this.prisonBlock(f, -8, 0, 34, 26, 9.6);
    // garagem com viatura no pátio
    { const gx = w / 2 - 9, gz = d / 2 - 8, gw = 9, gd = 7, gh = 3.6;
      f.box(M.metal, gx, CURB, gz + gd / 2, gw, gh, 0.25, true, 2);
      for (const s2 of [-1, 1]) f.box(M.metal, gx + s2 * gw / 2, CURB, gz, 0.25, gh, gd, true, 2);
      f.box(M.metalDark, gx, CURB + gh, gz, gw + 0.6, 0.25, gd + 0.6, true, 2);
      f.add(plane(gw - 0.4, gd - 0.4, 2), M.tile, gx, CURB + 0.02, gz);
      f.add(box(gw * 0.6, 0.06, 0.4), M.ceilingLight, gx, CURB + gh - 0.08, gz);
      f.box(signMat('GARAGEM', { bg: '#1b2a4a', w: 256, h: 64 }), gx, CURB + gh - 0.5, gz - gd / 2 - 0.05, 2.2, 0.5, 0.05, false, 2.2, 0.5);
      this.spots.prisonGarageCar = f.pt(gx, gz); }
    f.box(signMat('PENITENCIÁRIA ESTADUAL', { bg: '#2a2a2a', fg: '#e0e0e0', glow: true, w: 1024, h: 128 }), w / 2 + 0.6, CURB + 5.5, 0, 0.1, 1, 10, false, 10, 1);
    f.add(plane(w - 2, d - 2, 3), M.concreteFlat, 0, CURB + 0.01, 0);
    this.spots.prisonGateIn = f.pt(w / 2 - 4, 0);
    this.spots.prisonGateOut = f.pt(w / 2 + 6, 0);
    this.spots.prisonPickup = f.pt(w / 2 + 14, 2);
  }
  // prédio principal da penitenciária: entra-se pela porta leste; corredor com 16 celas, mesa dos guardas e detector de metais
  prisonBlock(f0, cx, cz, W, D, H) {
    const M = this.M, y = CURB, t = 0.4; const f = this.F(...f0.pt(cx, cz), 0, f0.B);
    const wm = M.facade.concrete, inner = M.wall(0xb8bcb0), band = M.wall(0x5a6a5a);
    const CH = 4.2; // pé-direito do térreo
    const wall = (lx, lz, w, d, h = H, y0 = y) => { f.box(wm, lx, y0, lz, w, h, d, false, 24, 25.6); f.collide(lx, y0, lz, w, h, d); };
    wall(0, -D / 2 + t / 2, W, t); wall(0, D / 2 - t / 2, W, t); wall(-W / 2 + t / 2, 0, t, D);
    const door = 2.6; const seg = (D - door) / 2;
    wall(W / 2 - t / 2, -D / 2 + seg / 2, t, seg); wall(W / 2 - t / 2, D / 2 - seg / 2, t, seg);
    f.box(wm, W / 2 - t / 2, y + 3.2, 0, t, H - 3.2, door, false, 24, 25.6);
    for (const s2 of [-1, 1]) f.box(M.metal, W / 2 + 0.05, y, s2 * door / 2, 0.1, 3.2, 0.15, false); f.box(M.metal, W / 2 + 0.05, y + 3.1, 0, 0.12, 0.12, door + 0.2, false);
    f.box(M.concrete, 0, y + H, 0, W + 0.4, 0.4, D + 0.4, true, 2); f.ao(0, 0, W, D, 1.6);
    f.box(signMat('BLOCO A', { bg: '#2a2a2a', fg: '#e0e0e0', w: 256, h: 64 }), W / 2 + 0.06, y + 3.6, 0, 0.05, 0.5, 2, false, 2, 0.5);
    // piso, forro e luminárias
    f.add(plane(W - 0.8, D - 0.8, 3), M.concreteFlat, 0, y + 0.03, 0);
    f.add(plane(W - 0.8, D - 0.8, 4), M.ceiling, 0, y + CH, 0, 0, Math.PI);
    f.box(M.concrete, 0, y + CH, 0, W - 0.8, 0.2, D - 0.8, false, 2);
    for (let i = 0; i < 6; i++) f.add(box(0.4, 0.05, 2.2), M.ceilingLight, -W / 2 + 3 + i * 5.4, y + CH - 0.05, 0);
    // corredor (z de -3 a 3) com faixa pintada nas paredes das celas
    const cellD = 4.5, cz0 = 3, cell = 3.5, xs = -W / 2 + 1.0, n = 8;
    for (const side of [-1, 1]) {
      const back = side * (cz0 + cellD);
      f.box(inner, 0, y, back + side * 0.1, W - 0.8, CH, 0.2, true, 2); // fundo das celas
      for (let i = 0; i <= n; i++) f.box(inner, xs + i * cell, y, side * (cz0 + cellD / 2), 0.2, CH, cellD, true, 2); // paredes entre celas
      f.box(band, 0, y + CH - 0.6, side * cz0, W - 0.8, 0.6, 0.1, false, 2);
      for (let i = 0; i < n; i++) {
        const x0 = xs + i * cell + cell / 2, fz = side * cz0;
        // grades
        for (let b = -cell / 2 + 0.2; b < cell / 2 - 0.1; b += 0.16) f.add(cyl(0.022, 0.022, CH - 0.6, 6), M.metalDark, x0 + b, y + (CH - 0.6) / 2, fz);
        for (const by of [0.08, 1.1, CH - 0.65]) f.add(box(cell - 0.2, 0.06, 0.06), M.metalDark, x0, y + by, fz);
        f.collide(x0, y, fz, cell - 0.2, CH, 0.15);
        // beliche, vaso, pia
        const bz = side * (cz0 + cellD - 0.55);
        for (const lv of [0.45, 1.55]) { f.box(M.metalDark, x0 - 0.5, y + lv - 0.08, bz, 0.9, 0.06, 2.0, false); f.box(paint(M.flat, 0xd8d0c0), x0 - 0.5, y + lv - 0.02, bz, 0.85, 0.12, 1.9, false); f.box(paint(M.flat, 0xf0f0f0), x0 - 0.5, y + lv + 0.1, bz - side * 0.75, 0.6, 0.12, 0.35, false); }
        for (const [px, pz] of [[-0.95, -0.95], [-0.95, 0.95], [-0.05, -0.95], [-0.05, 0.95]]) f.box(M.metalDark, x0 - 0.5 + px * 0.45, y, bz + pz, 0.05, 1.7, 0.05, false);
        f.collide(x0 - 0.5, y, bz, 0.95, 1.8, 2.05);
        f.add(cyl(0.18, 0.15, 0.42, 10), paint(M.flat, 0xe8e8e8), x0 + 1.1, y + 0.21, side * (cz0 + cellD - 0.4));
        f.box(paint(M.flat, 0xe8e8e8), x0 + 1.1, y + 0.75, side * (cz0 + 1.2), 0.4, 0.12, 0.35, false);
        const [px, pz] = f.pt(x0 + 0.4, side * (cz0 + 1.6)); (this.spots.prisonCells = this.spots.prisonCells || []).push([px, pz, side > 0 ? Math.PI : 0]);
      }
    }
    // mesa dos guardas com monitores (fundo do corredor) e detector de metais na entrada
    f.box(M.woodDark, -W / 2 + 2.2, y, 0, 1.2, 0.9, 3.2, true, 1);
    for (const mz of [-0.9, 0, 0.9]) { f.box(M.metalDark, -W / 2 + 2.0, y + 0.9, mz, 0.1, 0.5, 0.7, false); f.add(box(0.02, 0.4, 0.6), M.ceilingLight, -W / 2 + 2.07, y + 1.15, mz); }
    for (const s2 of [-1, 1]) f.box(paint(M.flat, 0x9a9aa0), W / 2 - 2.5, y, s2 * 0.8, 0.3, 2.3, 0.3, true, 1);
    f.box(paint(M.flat, 0x9a9aa0), W / 2 - 2.5, y + 2.3, 0, 0.3, 0.25, 1.9, false);
    this.spots.prisonCorridor = f.pt(-4, 0); this.spots.prisonDesk = f.pt(-W / 2 + 3.4, 0); this.spots.prisonDoor = f.pt(W / 2 + 1.5, 0);
  }
  // ---------- AEROPORTO (pista norte-sul, terminal com interior, torre, hangar, escada de embarque) ----------
  airport(B) {
    const M = this.M, y = CURB; const f = this.F(0, 0, 0, B);
    const AX = -410, z0 = -440, z1 = -60, RW = 26, zc = (z0 + z1) / 2, len = z1 - z0;
    const white = paint(M.flat, 0xf0f0f0), yellow = paint(M.flat, 0xe8c21a);
    const flat = (mtl, x, z, w, d, yy = y + 0.02) => f.add(plane(w, d, w, d), mtl, x, yy, z);
    // pista com marcações
    f.add(plane(RW, len, 6), M.asphalt, AX, y + 0.01, zc);
    for (let z = z0 + 40; z < z1 - 40; z += 22) flat(white, AX, z, 0.7, 12);
    for (const s of [-1, 1]) flat(white, AX + s * (RW / 2 - 1), zc, 0.6, len - 4);
    for (const ze of [z0 + 12, z1 - 12]) for (let i = 0; i < 8; i++) flat(white, AX - RW / 2 + 2.5 + i * 3 + (i >= 4 ? 3 : 0), ze, 1.4, 16);
    for (const [ze, txt, rot] of [[z0 + 32, '18', 0], [z1 - 32, '36', Math.PI]]) f.add(plane(8, 5, 8, 5), signMat(txt, { bg: '#2a2a2a', fg: '#f0f0f0', border: false, w: 256, h: 160 }), AX, y + 0.025, ze, rot);
    for (let z = z0 + 5; z < z1; z += 30) for (const s of [-1, 1]) f.add(box(0.3, 0.25, 0.3), M.ceilingLight, AX + s * (RW / 2 + 1), y + 0.12, z);
    // pista de taxiamento e pátio
    const apX0 = -392, apX1 = -316, apZ0 = -300, apZ1 = -200;
    f.add(plane(apX0 - (AX + RW / 2) + 1, 20, 6), M.asphalt, (apX0 + AX + RW / 2) / 2, y + 0.012, -250);
    flat(yellow, (apX0 + AX + RW / 2) / 2, -250, apX0 - (AX + RW / 2), 0.4);
    f.add(plane(apX1 - apX0, apZ1 - apZ0, 4), M.concreteFlat, (apX0 + apX1) / 2, y + 0.014, (apZ0 + apZ1) / 2);
    flat(yellow, -362, -250, 30, 0.4, y + 0.022); flat(yellow, -362, -250, 0.4, 14, y + 0.022);
    // terminal (entrada a leste; portão de embarque com vidro a oeste)
    const TX = -300, TZ = -250, TW = 22, TD = 50, TH = 8, t = 0.4, door = 3.2;
    const wall = (x, z, w, d, h = TH, yy = y, mtl = M.facade.concrete) => { f.box(mtl, x, yy, z, w, h, d, false, 24, 25.6); f.collide(x, yy, z, w, h, d); };
    wall(TX, TZ - TD / 2 + t / 2, TW, t); wall(TX, TZ + TD / 2 - t / 2, TW, t);
    const segL = (TD - door) / 2;
    for (const s of [-1, 1]) {
      wall(TX + TW / 2 - t / 2, TZ + s * (door / 2 + segL / 2), t, segL); // leste
      // oeste: vidro do chão ao teto com montantes
      const gz = TZ + s * (door / 2 + segL / 2);
      f.add(box(0.06, TH - 0.6, segL), M.glass, TX - TW / 2 + 0.2, y + (TH - 0.6) / 2 + 0.3, gz); f.collide(TX - TW / 2 + 0.2, y, gz, 0.3, TH, segL);
      for (let k = 0; k <= 7; k++) f.box(M.metalDark, TX - TW / 2 + 0.2, y, TZ + s * (door / 2 + k * segL / 7), 0.12, TH, 0.12, false);
    }
    f.box(M.facade.concrete, TX + TW / 2 - t / 2, y + 3.4, TZ, t, TH - 3.4, door, false, 24, 25.6);
    f.box(M.metalDark, TX - TW / 2 + 0.2, y + 3.4, TZ, 0.15, TH - 3.4, door, false);
    f.box(M.concrete, TX, y + TH, TZ, TW + 1.2, 0.5, TD + 1.2, true, 2); f.ao(TX, TZ, TW, TD, 1.6);
    f.add(box(0.15, 1.4, 16, 0.15, 1.4), signMat('AEROPORTO DE LOS VALLES', { bg: '#0d2a4a', fg: '#ffffff', glow: true, w: 1024, h: 96 }), TX + TW / 2 + 0.4, y + TH + 1.1, TZ);
    f.box(M.metalDark, TX + TW / 2 + 2, y + 3.6, TZ, 4, 0.25, 8, false); // marquise
    // interior
    f.add(plane(TW - 0.8, TD - 0.8, 3), M.interiorFloor, TX, y + 0.03, TZ);
    f.add(plane(TW - 0.8, TD - 0.8, 4), M.ceiling, TX, y + TH - 0.05, TZ, 0, Math.PI);
    for (let i = 0; i < 4; i++) f.add(box(1.2, 0.06, TD - 4), M.ceilingLight, TX - TW / 2 + 3 + i * 5.3, y + TH - 0.1, TZ);
    // balcões de check-in (parede norte) com placas das companhias e esteiras
    const airlines = [['VALLES AIR', '#0d4a8a'], ['SOMBRA LINHAS AÉREAS', '#3a1a5a'], ['VALLES AIR', '#0d4a8a'], ['AZUL DO SUL', '#0a6a8a']];
    airlines.forEach(([nm, bg], i) => {
      const cx = TX + TW / 2 - 4 - i * 4.4, cz = TZ - TD / 2 + 2.6;
      f.box(paint(M.flat, 0xf0f0f0), cx, y, cz, 3.2, 1.05, 0.8, true, 1);
      f.box(paint(M.flat, 0x2a2a2e), cx, y + 1.05, cz, 3.3, 0.05, 0.9, false);
      f.box(M.metalDark, cx + 1.0, y, cz + 0.9, 0.8, 0.35, 0.8, false); // balança
      f.box(paint(M.flat, 0x1a1a1a), cx, y + 0.5, cz - 0.9, 3.2, 0.5, 0.7, false); // esteira
      f.add(box(3.2, 0.6, 0.06, 3.2, 0.6), signMat(nm, { bg, fg: '#fff', glow: true, w: 512, h: 96 }), cx, y + 2.8, cz - 1.0);
      for (let k = 0; k < 3; k++) { f.add(cyl(0.04, 0.04, 1, 6), M.metalLight, cx - 1.2 + k * 1.2, y + 0.5, cz + 2.4); }
    });
    // painel de partidas
    const depMat = new THREE.MeshLambertMaterial({ map: TX_.departuresTex(), emissiveMap: TX_.departuresTex(), emissive: 0xffffff, emissiveIntensity: 0.8 });
    f.add(box(0.1, 3, 6), M.metalDark, TX + 2, y + 5, TZ + 6);
    { const g = new THREE.PlaneGeometry(5.8, 2.8); g.rotateY(Math.PI / 2); f.add(g, depMat, TX + 2.06, y + 5, TZ + 6); }
    // raio-x e detector antes do portão
    f.box(paint(M.flat, 0xd8d8d8), TX - TW / 2 + 4.5, y, TZ - 5, 1.0, 1.2, 3.2, true, 1); f.box(M.metalDark, TX - TW / 2 + 4.5, y + 1.2, TZ - 5, 1.1, 0.7, 1.2, false);
    for (const s of [-1, 1]) f.box(paint(M.flat, 0xb8b8c0), TX - TW / 2 + 4.5, y, TZ - 1.5 + s * 0.75, 0.3, 2.2, 0.3, true, 1);
    f.box(paint(M.flat, 0xb8b8c0), TX - TW / 2 + 4.5, y + 2.2, TZ - 1.5, 0.3, 0.25, 1.8, false);
    // cadeiras de espera junto ao vidro (vista para o avião)
    for (let r = 0; r < 3; r++) for (let k = 0; k < 7; k++) {
      const sx = TX - TW / 2 + 2.2 + r * 1.6, sz = TZ + 5 + k * 0.62;
      f.box(paint(M.flat, 0x1a3a6a), sx, y + 0.42, sz, 0.55, 0.08, 0.52, false); f.box(paint(M.flat, 0x1a3a6a), sx - 0.25, y + 0.5, sz, 0.08, 0.5, 0.52, false);
    }
    for (let r = 0; r < 3; r++) { f.box(M.metalDark, TX - TW / 2 + 2.2 + r * 1.6, y, TZ + 6.9, 0.3, 0.42, 4.4, false); f.collide(TX - TW / 2 + 2.2 + r * 1.6, y, TZ + 6.9, 0.6, 0.9, 4.4); }
    // café
    { const kx = TX + TW / 2 - 4, kz = TZ + TD / 2 - 4;
      f.box(M.woodDark, kx, y, kz, 4, 1.05, 1.0, true, 1); f.box(M.metalLight, kx, y + 1.05, kz, 4.1, 0.05, 1.1, false);
      f.box(M.metalDark, kx + 1.2, y + 1.1, kz + 0.2, 0.5, 0.45, 0.4, false);
      f.add(box(3.4, 1.6, 0.06, 3.4, 1.6), prodMat('board_padaria', true), kx, y + 3, kz + 2.6);
      f.add(box(3, 0.5, 0.06, 3, 0.5), signMat('CAFÉ AEROPORTO', { bg: '#3a2010', fg: '#f2d08a', glow: true, w: 512, h: 96 }), kx, y + 4.2, kz + 2.6);
      const [kx2, kz2] = f.pt(kx, kz - 1.3); this.spots.airportCafe = [kx2, kz2]; }
    // esteira de bagagem
    f.add(cyl(1.4, 1.4, 0.5, 20), paint(M.flat, 0x2a2a2e), TX + 3, y + 0.25, TZ + TD / 2 - 6); f.add(cyl(1.6, 1.6, 0.45, 20), M.metalLight, TX + 3, y + 0.22, TZ + TD / 2 - 6);
    f.collide(TX + 3, y, TZ + TD / 2 - 6, 3.2, 0.6, 3.2);
    for (const [px, pz] of [[TX + TW / 2 - 1.5, TZ + 3], [TX + TW / 2 - 1.5, TZ - 3], [TX - TW / 2 + 1.2, TZ + TD / 2 - 1.5]]) { f.add(cyl(0.3, 0.25, 0.6, 10), paint(M.flat, 0xd8d8d8), px, y + 0.3, pz); f.add(new THREE.IcosahedronGeometry(0.55, 0), M.hedge, px, y + 1.1, pz); }
    // torre de controle
    f.add(cyl(2.4, 2.8, 24, 14), M.concrete, -332, y + 12, -335); f.collide(-332, y, -335, 5, 24, 5);
    f.add(cyl(4, 3.4, 3.2, 10), M.glass, -332, y + 25.6, -335); f.add(cyl(4.4, 4.4, 0.6, 10), M.metalDark, -332, y + 27.5, -335); f.add(cyl(3.6, 3.6, 0.5, 10), M.metalDark, -332, y + 24, -335);
    this.lamp(-332, y + 28.2, -335);
    // hangar em arco aberto para o pátio
    { const hx = -352, hz = -168, R = 16, L = 30;
      const hm = new THREE.MeshLambertMaterial({ map: TX_.corrugatedTex(), color: 0x9aa0a6, side: THREE.DoubleSide });
      const arch = new THREE.CylinderGeometry(R, R, L, 18, 1, true, Math.PI / 2, Math.PI); arch.rotateX(Math.PI / 2);
      f.add(arch, hm, hx, y, hz);
      const back = new THREE.CircleGeometry(R, 18, 0, Math.PI); f.add(back, hm, hx, y, hz + L / 2);
      for (const s of [-1, 1]) f.collide(hx + s * (R - 0.5), y, hz, 1, 6, L);
      f.collide(hx, y, hz + L / 2, R * 2, 8, 0.5);
      f.add(plane(R * 2 - 1, L, 4), M.concreteFlat, hx, y + 0.02, hz);
      f.add(box(0.15, 1.2, 10, 0.15, 1.2), signMat('HANGAR 1', { bg: '#2a2a2a', fg: '#e8c21a', w: 512, h: 96 }), hx, y + R - 3, hz - L / 2 - 0.1, Math.PI / 2);
      for (let i = 0; i < 3; i++) f.add(box(10, 0.1, 0.5), M.ceilingLight, hx, y + R - 1.5, hz - L / 2 + 6 + i * 9);
    }
    // escada de embarque (encostada na porta do avião estacionado)
    const PX = -362, PZ = -250, doorTop = [PX - 6.5, PZ + 1.65], stairLen = 4.6, sh = 2.25;
    for (let i = 0; i < 10; i++) { const k = (i + 0.5) / 10; f.box(M.metalLight, doorTop[0], y + k * sh - 0.05, doorTop[1] + 0.35 + (1 - k) * stairLen, 1.2, 0.08, stairLen / 10 + 0.05, false); }
    for (const s of [-1, 1]) { const g = new THREE.BoxGeometry(0.06, 0.06, Math.hypot(stairLen, sh)); f.add(g, M.metalDark, doorTop[0] + s * 0.62, y + sh / 2 + 0.95, doorTop[1] + 0.35 + stairLen / 2, 0, Math.atan2(sh, stairLen)); }
    f.box(paint(M.flat, 0xe8e8e8), doorTop[0], y, doorTop[1] + 0.35 + stairLen + 1.2, 2.2, 1.2, 2.8, true, 1); // caminhão da escada
    f.box(paint(M.flat, 0xe8c21a), doorTop[0], y + 1.2, doorTop[1] + 0.35 + stairLen + 2, 2.0, 0.9, 1.2, false);
    this.spots.planePark = [PX, PZ, -Math.PI / 2]; this.spots.stairTop = doorTop; this.spots.stairBase = [doorTop[0], doorTop[1] + 0.35 + stairLen + 0.2]; this.spots.stairH = sh;
    this.spots.runway = { x: AX, z0, z1, w: RW };
    // biruta
    f.add(cyl(0.08, 0.1, 7, 8), M.metalDark, AX + 22, y + 3.5, -120); f.add(new THREE.ConeGeometry(0.6, 3, 10, 1, true).rotateZ(Math.PI / 2), paint(M.flat, 0xff6a1a), AX + 20.5, y + 6.8, -120);
    // estrada até a cidade e estacionamento do terminal
    f.add(plane(42, 9, 6), M.asphalt, -255, y + 0.012, TZ, Math.PI / 2);
    f.add(plane(9, TD + 10, 6), M.asphalt, -282, y + 0.012, TZ);
    this.city.parkingLot(this.F(-264, TZ + 24, 0, B), 0, 0, 30, 14, 0);
    this.city.landmarks.push({ name: 'Aeroporto de Los Valles', x: TX + TW / 2 + 3, z: TZ, kind: 'airport' });
    this.spots.terminalDoor = [TX + TW / 2 + 2, TZ]; this.spots.terminalGate = [TX - TW / 2 - 1.5, TZ];
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
