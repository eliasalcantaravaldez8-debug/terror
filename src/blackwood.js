// BLACKWOOD — cidade menor a leste, depois do rio. Bairros antigos, praça com torre do relógio,
// igreja, cemitério, fábrica abandonada, motel, delegacia e posto. Liberada com 2 estrelas de procurado.
import * as THREE from 'three';
import { Batcher, box, plane, cyl, gableRoof, mat } from './geo.js';
import { Frame, CURB } from './city.js';
import { mats, signMat, paint, homeMat } from './materials.js';
import { BW, bwRoad, bwRoadZ, bwBlock, bwBlockZ, RIVER } from './places.js';
import { rand, rr, pick, setSeed } from './textures.js';

// layout[k][j] (k = linha em z, j = coluna em x)
export const BW_LAYOUT = [
  ['bwres', 'cemetery', 'bwres', 'bwres'],
  ['bwshops', 'square', 'bwpolice', 'motel'],
  ['bwres', 'bwmixed', 'bwgas', 'factory'],
  ['bwres', 'bwforest', 'bwres', 'bwres'],
];

export class Blackwood {
  constructor(scene, world, city) {
    this.scene = scene; this.world = world; this.city = city; this.M = mats();
    this.root = new THREE.Group(); this.root.name = 'Blackwood'; scene.add(this.root);
    this.spots = {}; this.landmarks = [];
  }
  F(x, z, ry, B) { return new Frame(x, z, ry, B, this.world); }
  build() {
    setSeed(1313);
    const city = this.city, M = this.M;
    const B = new Batcher();
    this.roads(B);
    this.river(B);
    // tipos de quarteirão próprios de Blackwood
    city.extraBuilders = {
      bwshops: (F) => city.shopsBlock(F, ['Lanchonete 66', 'Armazém Blackwood', 'Barbearia Velha', 'Antiquário Corvo']),
      bwmixed: (F) => city.mixed(F),
      bwgas: (F) => this.gas(F),
      square: (F) => this.square(F), cemetery: (F) => this.cemetery(F), bwpolice: (F) => this.police(F),
      motel: (F) => this.motel(F), factory: (F) => this.factory(F), bwforest: (F) => this.forest(F),
    };
    city.extraGround = { bwshops: M.concreteFlat, bwmixed: M.concreteFlat, bwgas: M.concreteFlat, square: M.concreteFlat, bwpolice: M.concreteFlat, motel: M.parking, factory: M.dirt, cemetery: M.grass, bwforest: M.grass };
    city.noFurniture = { bwforest: false };
    const chunks = new Map();
    for (let k = 0; k < BW.n; k++) for (let j = 0; j < BW.n; j++) {
      const key = Math.floor(j / 2) + ',' + Math.floor(k / 2);
      if (!chunks.has(key)) chunks.set(key, new Batcher());
      const type = BW_LAYOUT[k][j];
      city.buildBlock(100 + j, 100 + k, type === 'bwres' ? 'res' : type, bwBlock(j), bwBlockZ(k), chunks.get(key));
    }
    for (const C of chunks.values()) C.flush(this.root);
    this.outskirts();
    this.streetParking();
    B.flush(this.root);
    // locais aparecem no mapa/celular
    city.landmarks.push(...this.landmarks);
  }
  roads(B) {
    const M = this.M; const len = BW.P - BW.ROAD;
    for (let a = 0; a <= BW.n; a++) {
      for (let b = 0; b < BW.n; b++) {
        B.add(plane(BW.ROAD, len, BW.ROAD, 12), M.road, mat(bwRoad(a), 0, bwBlockZ(b)));
        B.add(plane(BW.ROAD, len, BW.ROAD, 12), M.road, mat(bwBlock(b), 0, bwRoadZ(a), Math.PI / 2));
        for (const s of [-1, 1]) {
          B.add(plane(BW.ROAD, 3, 9.6, 3), M.cross, mat(bwRoad(a), 0.01, bwBlockZ(b) + s * (len / 2 - 1.8)));
          B.add(plane(BW.ROAD, 3, 9.6, 3), M.cross, mat(bwBlock(b) + s * (len / 2 - 1.8), 0.01, bwRoadZ(a), Math.PI / 2));
        }
      }
      for (let b = 0; b <= BW.n; b++) {
        const ix = bwRoad(a), iz = bwRoadZ(b);
        B.add(plane(BW.ROAD, BW.ROAD, 6), M.asphalt, mat(ix, 0, iz));
        // placa de PARE em duas esquinas
        for (const [sx, sz] of [[7.2, 7.2], [-7.2, -7.2]]) {
          const x = ix + sx, z = iz + sz; if (Math.abs(x - BW.x) > BW.half - 1 || Math.abs(z - BW.z) > BW.half - 1) continue;
          B.add(cyl(0.05, 0.05, 2.6, 6), M.metal, mat(x, CURB + 1.3, z));
          B.add(new THREE.CylinderGeometry(0.42, 0.42, 0.04, 8), signMat('PARE', { bg: '#b81818', fg: '#fff', w: 256, h: 256, size: 90 }), mat(x, CURB + 2.6, z, Math.atan2(sx, sz) + Math.PI, Math.PI / 2, 0));
          this.world.addCentered(x, 0, z, 0.2, 2.8, 0.2);
        }
      }
    }
    // estrada da ponte até Blackwood
    B.add(plane(10, 44, 6), M.asphalt, mat(462, CURB + 0.03, 0, Math.PI / 2));
    B.add(plane(10, 8, 6), M.asphalt, mat(482, CURB + 0.012, 0, Math.PI / 2));
  }
  river(B) {
    const M = this.M; const w = RIVER.x1 - RIVER.x0, cx = (RIVER.x0 + RIVER.x1) / 2;
    const water = new THREE.MeshPhongMaterial({ color: 0x163242, specular: 0x8899aa, shininess: 90, envMap: M.water.envMap, combine: THREE.MixOperation, reflectivity: 0.28 });
    water.userData.castShadow = false;
    for (const [z0, z1] of [[-448, -6], [6, 448]]) {
      B.add(plane(w, z1 - z0, 6), water, mat(cx, CURB + 0.02, (z0 + z1) / 2));
      this.world.addBox(RIVER.x0, 0, z0, RIVER.x1, 3, z1);
      // margens de pedra
      for (const x of [RIVER.x0, RIVER.x1]) B.add(box(1, 0.5, z1 - z0, 2), M.concrete, mat(x, CURB + 0.1, (z0 + z1) / 2));
    }
    // ponte com guarda-corpos
    B.add(box(w + 4, 0.6, 12, 2), M.concrete, mat(cx, CURB - 0.3, 0));
    for (const s of [-1, 1]) {
      B.add(box(w + 4, 1.1, 0.3, 2), M.concrete, mat(cx, CURB + 0.55, s * 6.1));
      for (let x = RIVER.x0 - 2; x <= RIVER.x1 + 2; x += 5) B.add(cyl(0.12, 0.12, 1.5, 6), M.metalDark, mat(x, CURB + 0.75, s * 6.1));
      this.world.addBox(RIVER.x0 - 2, 0, s * 6.1 - 0.2, RIVER.x1 + 2, 1.2, s * 6.1 + 0.2);
      this.city.lamps.push([cx + s * 8, CURB + 4.4, s * 6.1]);
      B.add(cyl(0.07, 0.09, 4.4, 6), M.metalDark, mat(cx + s * 8, CURB + 2.2, s * 6.1)); B.add(new THREE.SphereGeometry(0.25, 8, 6), M.lamp, mat(cx + s * 8, CURB + 4.4, s * 6.1));
    }
    B.add(box(0.3, 2.4, 5.5, 5.5, 2.4), signMat('BEM-VINDO A BLACKWOOD', { bg: '#20222a', fg: '#d8ccb0', glow: true, w: 1024, h: 160 }), mat(RIVER.x1 + 10, CURB + 2.4, -9.5, Math.PI / 2));
    B.add(cyl(0.08, 0.08, 2.4, 6), M.metalDark, mat(RIVER.x1 + 10, CURB + 1.2, -9.5));
  }
  // ---------- quarteirões especiais ----------
  square(F) {
    const M = this.M; const f = this.F(F.x, F.z, 0, F.B);
    // torre do relógio
    f.box(M.facade.brick, 0, CURB, 0, 4.5, 16, 4.5, true, 24, 25.6);
    f.box(M.concrete, 0, CURB + 16, 0, 5.2, 0.5, 5.2, false);
    for (let r = 0; r < 4; r++) f.add(new THREE.CylinderGeometry(1.25, 1.25, 0.1, 24), signMat('XII', { bg: '#f0ead8', fg: '#1a1a1a', w: 256, h: 256, size: 70 }), Math.sin(r * Math.PI / 2) * 2.3, CURB + 13.6, Math.cos(r * Math.PI / 2) * 2.3, r * Math.PI / 2, Math.PI / 2);
    f.add(new THREE.ConeGeometry(3.4, 5, 4), M.roof[1], 0, CURB + 18.9, 0, Math.PI / 4);
    // igreja (porta voltada para a praça)
    const cz = -17;
    f.box(M.wall(0xb8b0a0), 0, CURB, cz, 12, 8, 20, true, 3);
    f.add(gableRoof(20, 12, 5, 0.5), M.roof[2], 0, CURB + 8, cz, Math.PI / 2);
    f.box(M.wall(0xb8b0a0), 0, CURB, cz + 11, 5, 15, 5, true, 3);
    f.add(new THREE.ConeGeometry(3.2, 9, 4), M.roof[2], 0, CURB + 19.5, cz + 11, Math.PI / 4);
    f.box(M.woodDark, 0, CURB, cz + 13.55, 2, 3.4, 0.1, false, 1);
    for (const x of [-4.5, 4.5]) f.box(M.winLit, x, CURB + 3, cz + 10.05, 1.2, 3, 0.08, false);
    f.box(M.wood, 0, CURB + 16.5, cz + 11, 0.2, 2.2, 0.2, false); f.box(M.wood, 0, CURB + 17.1, cz + 11, 1.2, 0.2, 0.2, false); // cruz
    f.ao(0, cz, 12, 20, 1.5);
    // bancos, árvores, postes
    for (const [x, z, r] of [[8, 6, 0], [-8, 6, 0], [8, -4, Math.PI], [-8, -4, Math.PI], [14, 14, Math.PI / 2]]) this.city.bench(f, x, z, r);
    for (const [x, z] of [[-18, 10], [18, 10], [-18, 22], [18, 22], [-20, -6], [20, -6]]) this.city.trees.push([F.x + x, F.z + z, rr(1, 1.4), rand() < 0.5]);
    for (const [x, z] of [[6, 12], [-6, 12], [6, -6], [-6, -6]]) { f.add(cyl(0.06, 0.08, 3.6, 6), M.metalDark, x, CURB + 1.8, z); f.add(new THREE.SphereGeometry(0.25, 8, 6), M.lamp, x, CURB + 3.6, z); const [lx, lz] = f.pt(x, z); this.city.lamps.push([lx, CURB + 3.6, lz]); f.collide(x, 0, z, 0.25, 3.6, 0.25); }
    const [lx, lz] = f.pt(0, 8);
    this.landmarks.push({ name: 'Praça de Blackwood', x: lx, z: lz, kind: 'park' });
    this.spots.square = [lx, lz];
    this.spots.raceStart = [bwRoad(1) - 1.75, bwBlockZ(1) - 10];
  }
  cemetery(F) {
    const M = this.M; const f = this.F(F.x, F.z, 0, F.B); const h = 27;
    const stone = M.wall(0x7a7a72);
    f.box(stone, 0, CURB, -h, 2 * h, 1.4, 0.4, true, 3); f.box(stone, -h, CURB, 0, 0.4, 1.4, 2 * h, true, 3); f.box(stone, h, CURB, 0, 0.4, 1.4, 2 * h, true, 3);
    f.box(stone, -h / 2 - 2, CURB, h, h - 4, 1.4, 0.4, true, 3); f.box(stone, h / 2 + 2, CURB, h, h - 4, 1.4, 0.4, true, 3);
    for (const s of [-2.2, 2.2]) f.box(M.metalDark, s, CURB, h, 0.3, 2.6, 0.3, true);
    f.box(signMat('CEMITÉRIO DE BLACKWOOD', { bg: '#1a1a1a', fg: '#c8c0a8', w: 1024, h: 128 }), 0, CURB + 2.4, h + 0.25, 4.6, 0.5, 0.06, false, 4.6, 0.5);
    for (let i = 0; i < 70; i++) {
      const x = -22 + (i % 10) * 4.8 + rr(-0.4, 0.4), z = -20 + Math.floor(i / 10) * 5.5 + rr(-0.4, 0.4);
      if (Math.abs(x) < 3 && z > 10) continue;
      if (rand() < 0.25) { f.box(stone, x, CURB, z, 0.12, 1.2, 0.12, false); f.box(stone, x, CURB + 0.75, z, 0.6, 0.12, 0.12, false); }
      else { f.box(stone, x, CURB, z, 0.7, rr(0.6, 1.1), 0.18, false); }
      f.add(plane(0.9, 1.8, 1), M.dirt, x, CURB + 0.012, z + 1.1);
    }
    // mausoléu
    f.box(stone, 14, CURB, -14, 6, 4, 6, true, 3); f.add(gableRoof(6, 6, 1.6, 0.3), M.roof[1], 14, CURB + 4, -14);
    f.box(M.metalDark, 14, CURB, -10.95, 1.6, 2.6, 0.1, false);
    for (let i = 0; i < 8; i++) { const x = rr(-24, 24), z = rr(-24, 20); this.city.trees.push([F.x + x, F.z + z, rr(0.9, 1.3), true]); }
    const [lx, lz] = f.pt(0, h + 3);
    this.landmarks.push({ name: 'Cemitério de Blackwood', x: lx, z: lz, kind: 'park' });
  }
  police(F) {
    const M = this.M; const f = this.F(F.x, F.z, 0, F.B); const bz = 12;
    const HO = this.city.hollow(f, 0, bz, 24, 12, 6.4, M.facade.concrete, 's', 4); f.ao(0, bz, 24, 12, 1.6);
    const desk = this.city.policeInterior(HO);
    this.city.crowds.push({ x: F.x, z: F.z + bz, r: 40, hours: [0, 24], people: [{ kind: 'cop', x: desk[0], z: desk[1], heading: desk[2], y: CURB, name: 'Policial de plantão', lines: ['Delegacia de Blackwood. Em que posso ajudar?', 'Boletim de ocorrência é ali no balcão.'] }] });
    f.box(M.blue, 0, CURB + 2.8, bz - 6.02, 24, 0.45, 0.05, false);
    f.box(signMat('DELEGACIA DE BLACKWOOD', { bg: '#0e2a5c', fg: '#fff', glow: true, w: 1024, h: 128 }), 0, CURB + 4.6, bz - 6.1, 9, 0.9, 0.08, false, 9, 0.9);
    const before = this.city.parkedCars.length;
    this.city.parkingLot(F, 0, -12, 52, 16, 0);
    this.city.parkedCars.slice(before, before + 2).forEach((c) => { c.type = 'police'; });
    const [lx, lz] = f.pt(0, bz - 9);
    this.landmarks.push({ name: 'Delegacia de Blackwood', x: lx, z: lz, kind: 'police' });
  }
  motel(F) {
    const M = this.M; const f = this.F(F.x, F.z, 0, F.B); const bz = 18, w = 40, d = 9;
    f.box(M.wall(0x5a3a2a), 0, CURB + 3.2, bz, w + 1.6, 0.3, d + 3, false);
    // 9 quartos que dá para entrar (todos num grupo de interior só)
    const IB = new Batcher(); const rw = w / 9; let lastHO = null; const P = (c) => paint(M.flatIn, c);
    for (let i = 0; i < 9; i++) {
      const rx = -w / 2 + rw * (i + 0.5);
      const HO = this.city.hollow(f, rx, bz, rw, d, 3.2, M.wall(0x9a7a5a), 's', 3.2, { door: 1.0, doorX: -1.0, IB, tu: 3, tv: 3, doorH: 2.15 }); lastHO = HO;
      f.box(rand() < 0.4 ? M.winLit : M.winDark, rx + 0.8, CURB + 1.2, bz - d / 2 - 0.02, 1.2, 0.9, 0.06, false);
      f.box(signMat(String(i + 1), { bg: '#d8c8a0', fg: '#1a1a1a', w: 128, h: 128 }), rx - 1.0, CURB + 2.45, bz - d / 2 - 0.05, 0.25, 0.25, 0.03, false, 0.25, 0.25);
      f.box(M.woodDark, rx - 1.0 + 0.48, CURB, bz - d / 2 - 0.4, 0.05, 2.1, 0.9, false, 1); // porta aberta
      this.motelRoom(HO, P, i);
    }
    { const grp = new THREE.Group(); grp.name = 'interior'; IB.flush(grp, { castShadow: false }); grp.visible = false; this.city.root.add(grp); const [ix, iz] = f.pt(0, bz); this.city.interiors.push({ group: grp, x: ix, z: iz, r: 45 }); }
    for (let i = 0; i < 6; i++) f.box(M.white, -w / 2 + 3 + i * 7, CURB, bz - d / 2 - 1.6, 0.25, 3, 0.25, false);
    f.ao(0, bz, w, d, 1.4);
    f.add(cyl(0.2, 0.25, 9, 8), M.metal, -w / 2 - 3, CURB + 4.5, -6);
    f.box(signMat('MOTEL PINHEIROS', { bg: '#1a0a14', fg: '#ff4a8a', glow: true, w: 512, h: 160 }), -w / 2 - 3, CURB + 8, -6, 0.5, 1.8, 4.2, false, 4.2, 1.8);
    f.box(signMat('VAGAS', { bg: '#0a1a10', fg: '#4aff8a', glow: true, w: 256, h: 96 }), -w / 2 - 3, CURB + 6.6, -6, 0.5, 0.7, 2.4, false, 2.4, 0.7);
    f.collide(-w / 2 - 3, 0, -6, 0.5, 9, 0.5);
    for (let i = 0; i < 4; i++) { const [x, z] = f.pt(-w / 2 + 4 + i * 9, bz - d / 2 - 5); this.city.parkedCars.push({ x, z, heading: Math.PI, type: pick(['sedan', 'classico', 'pickup', 'popular', 'besouro']) }); }
    const [lx, lz] = f.pt(0, 0);
    this.landmarks.push({ name: 'Motel Pinheiros', x: lx, z: lz, kind: 'motel' });
  }
  // quarto de motel: cama de casal, criados-mudos com abajur, TV na cômoda, quadro, tapete e banheiro no fundo
  motelRoom(HO, P, i) {
    const M = this.M, { r, w, d, y } = HO; const bed = pick([0x8a1a2a, 0x2a3a6a, 0x5a2a5a, 0x2a5a4a]);
    const bz = -d / 2 + 2.6; // banheiro ocupa o fundo
    r.box(P(0xe8e0d0), -0.5, y, bz, w - 1.0, 2.6, 0.12, true, 1); r.box(P(0xe8e0d0), w / 2 - 0.5, y + 2.1, bz, 1.0, 0.5, 0.12, false); // parede do banheiro com vão de porta
    r.box(M.woodDark, w / 2 - 0.9, y, -d / 2 + 0.6, 0.5, 0.42, 0.65, true, 1); r.add(new THREE.CylinderGeometry(0.2, 0.17, 0.4, 12), M.white, w / 2 - 0.9, y + 0.62, -d / 2 + 0.9); // vaso
    r.box(M.white, -w / 2 + 0.7, y + 0.8, -d / 2 + 0.35, 0.6, 0.12, 0.45, false); r.box(M.metalLight, -w / 2 + 0.7, y + 1.4, -d / 2 + 0.15, 0.5, 0.6, 0.02, false); // pia e espelho
    r.box(P(0xd8e0e8), -w / 2 + 0.75, y, -d / 2 + 1.75, 1.3, 0.12, 1.3, false); // box do chuveiro
    // cama
    const cz = bz + 1.4;
    r.box(M.woodDark, 0, y, cz, 1.7, 0.4, 2.1, true, 1); r.box(P(0xf2f0ea), 0, y + 0.4, cz, 1.6, 0.18, 2.0, false); r.box(P(bed), 0, y + 0.58, cz + 0.25, 1.65, 0.05, 1.5, false);
    r.box(M.woodDark, 0, y, bz + 0.12, 1.8, 1.2, 0.08, false, 1); for (const s of [-0.4, 0.4]) r.box(P(0xf8f8f4), s, y + 0.6, cz - 0.75, 0.6, 0.14, 0.38, false);
    for (const s of [-1, 1]) { r.box(M.woodDark, s * 1.25, y, bz + 0.4, 0.5, 0.55, 0.45, true, 1); r.add(new THREE.CylinderGeometry(0.05, 0.08, 0.3, 8), P(0xd8c890), s * 1.25, y + 0.7, bz + 0.4); r.add(new THREE.CylinderGeometry(0.12, 0.17, 0.2, 10, 1, true), P(0xf0e0b0), s * 1.25, y + 0.95, bz + 0.4); }
    // cômoda com TV, quadro e tapete
    r.box(M.woodDark, 0, y, d / 2 - 0.5, 1.4, 0.75, 0.45, true, 1); r.box(P(0x111111), 0, y + 0.75, d / 2 - 0.5, 0.8, 0.5, 0.06, false); r.add(box(0.72, 0.42, 0.01), M.glowVC ? paint(M.glowVC, i % 2 ? 0x2a4a7a : 0x1a3a2a) : M.ceilingLight, 0, y + 1.0, d / 2 - 0.535);
    r.add(box(0.9, 0.6, 0.03, 0.9, 0.6), homeMat('art' + (i % 8)), 0, y + 1.7, bz + 0.1);
    r.add(plane(1.6, 1.1, 1.6, 1.1), homeMat('rug' + (i % 4)), 0, y + 0.04, cz + 1.6);
  }
  gas(F) {
    const M = this.M; const f = this.F(F.x, F.z, 0, F.B); const cz = -4;
    f.box(M.white, 0, CURB + 4.6, cz, 16, 0.6, 10, false); f.box(M.green, 0, CURB + 4.9, cz, 16.2, 0.25, 10.2, false);
    f.add(box(14, 0.05, 8), M.ceilingLight, 0, CURB + 4.58, cz);
    for (const x of [-5, 5]) { f.box(M.white, x, CURB, cz, 0.5, 4.6, 0.5, true); f.box(M.green, x, CURB + 0.25, cz + 2.4, 0.8, 1.7, 0.5, true); }
    f.box(signMat('POSTO BLACKWOOD', { bg: '#1a4a2a', fg: '#fff', glow: true, w: 512, h: 128 }), 0, CURB + 5.8, cz - 5.05, 6, 0.8, 0.08, false, 6, 0.8);
    this.city.shop(F, 0, 18, 16, 11, 4, 'Conveniência Blackwood', Math.PI);
    const [lx, lz] = f.pt(0, cz);
    this.landmarks.push({ name: 'Posto Blackwood', x: lx, z: lz, kind: 'gas' });
  }
  factory(F) {
    const M = this.M; const f = this.F(F.x, F.z, 0, F.B);
    const brick = M.wall(0x6a3a2a);
    const HO = this.city.hollow(f, 0, 4, 40, 26, 12, brick, 's', 12, { door: 4, doorX: 8, tu: 3, tv: 3, doorH: 4.5, wallMat: paint(M.flatIn, 0x5a4a40) }); f.ao(0, 4, 40, 26, 2.2);
    this.factoryInterior(HO);
    for (let i = 0; i < 4; i++) f.add(gableRoof(10, 26, 2.5, 0.2), M.roof[1], -15 + i * 10, CURB + 12, 4, Math.PI / 2);
    for (let i = 0; i < 9; i++) for (const y of [3, 8]) { const x = -18 + i * 4.5; f.box(rand() < 0.5 ? M.woodDark : M.winDark, x, CURB + y, 4 - 13.02, 2.2, 2.4, 0.06, false, 1); }
    for (const x of [-12, 12]) { f.add(cyl(1.3, 1.6, 26, 12), M.wall(0x5a2a1e), x, CURB + 13, 19.2); this.world.addCentered(F.x + x, 0, F.z + 19.2, 3, 26, 3); } // chaminés atrás do galpão
    f.box(signMat('FÁBRICA BLACKWOOD — FECHADA', { bg: '#2a1a14', fg: '#a89070', w: 1024, h: 128 }), 0, CURB + 10.4, 4 - 13.06, 14, 1.2, 0.08, false, 14, 1.2);
    for (let i = 0; i < 4; i++) f.box(M.corr(pick([0x7a3a2a, 0x3a4a5a, 0x5a5a3a])), -22 + i * 3, CURB, -20, 2.4, 2.6, 6, true, 2);
    // cerca
    for (const [x0, z0, x1, z1] of [[-29, -29, 29, -29], [-29, -29, -29, 29], [29, -29, 29, 29]]) {
      const len = Math.hypot(x1 - x0, z1 - z0); const ang = Math.atan2(x1 - x0, z1 - z0);
      F.B.add(box(0.06, 2.2, len), M.metalLight, f.m((x0 + x1) / 2, CURB + 1.1, (z0 + z1) / 2, ang));
    }
    const [lx, lz] = f.pt(0, -14);
    this.landmarks.push({ name: 'Fábrica abandonada', x: lx, z: lz, kind: 'factory' });
  }
  // fábrica fechada por dentro: máquinas velhas, esteira, caixas, tambores, pallets, luminárias e feixes de luz
  factoryInterior(HO) {
    const M = this.M, { r, w, d, y } = HO; const P = (c) => paint(M.flatIn, c);
    r.add(plane(w, d, 4), P(0x3a3632), 0, y + 0.035, 0); // piso de concreto manchado
    for (let k = 0; k < 4; k++) { const mx = -w / 2 + 6 + k * 8.5; // máquinas
      r.box(P(0x4a5a4a), mx, y, -3, 3.2, 1.6, 2.2, true, 1); r.box(P(0x3a4a3a), mx - 0.6, y + 1.6, -3, 1.4, 1.1, 1.6, false); r.add(new THREE.CylinderGeometry(0.45, 0.45, 2.3, 14).rotateX(Math.PI / 2), M.metalDark, mx + 0.8, y + 1.9, -3);
      r.box(P(0xc8a020), mx, y + 0.01, -3, 3.8, 0.01, 2.8, false); }
    r.box(M.metalDark, 0, y + 0.8, 4, w - 8, 0.08, 1.2, false); for (let k = 0; k < 10; k++) r.box(M.metalDark, -w / 2 + 5 + k * 3.3, y, 4, 0.1, 0.8, 1.1, false); r.collide(0, y, 4, w - 8, 0.9, 1.3); // esteira
    for (let k = 0; k < 14; k++) r.add(new THREE.CylinderGeometry(0.06, 0.06, 1.2, 8).rotateX(Math.PI / 2), M.metalLight, -w / 2 + 5 + k * 2.3, y + 0.82, 4);
    for (let k = 0; k < 9; k++) { const cx = w / 2 - 2 - (k % 3) * 1.3, cz = d / 2 - 2 - Math.floor(k / 3) * 1.3; const h = 1 + (k % 2) * 1.1; r.box(M.wood, cx, y, cz, 1.2, h, 1.2, true, 1); } // caixas
    for (let k = 0; k < 7; k++) { const tx = -w / 2 + 2 + (k % 4) * 0.8, tz = d / 2 - 2 - Math.floor(k / 4) * 0.9; r.add(new THREE.CylinderGeometry(0.3, 0.3, 0.9, 12), P(pick([0x8a2a1a, 0x2a4a7a, 0x4a5a2a])), tx, y + 0.45, tz); r.collide(tx, y, tz, 0.6, 0.9, 0.6); }
    for (let k = 0; k < 5; k++) r.box(M.wood, -4 + k * 1.4, y, -d / 2 + 1.5, 1.2, 0.14, 1.0, false, 1); // pallets
    for (let k = 0; k < 5; k++) { const lx = -w / 2 + 4 + k * 8; r.add(new THREE.CylinderGeometry(0.01, 0.01, 3, 4), M.metalDark, lx, y + 10.5, 0); r.add(new THREE.ConeGeometry(0.5, 0.35, 12, 1, true), M.metalDark, lx, y + 8.9, 0); r.add(new THREE.SphereGeometry(0.15, 8, 6), M.lamp, lx, y + 8.75, 0); }
    // feixes de luz entrando pelas janelas quebradas
    const beam = new THREE.MeshBasicMaterial({ color: 0xfff0c8, transparent: true, opacity: 0.08, depthWrite: false, blending: THREE.AdditiveBlending });
    for (let k = 0; k < 4; k++) { const g = new THREE.Mesh(new THREE.BoxGeometry(1.8, 9, 0.6), beam); const [bx2, bz2] = r.pt(-w / 2 + 6 + k * 9, -d / 2 + 3.5); g.position.set(bx2, y + 4.5, bz2); g.rotation.set(0.45, r.ry, 0); g.name = 'beam'; this.city.factoryBeams = (this.city.factoryBeams || []).concat(g); }
    this.city.closeHollow(HO, 45);
    const grp = this.city.interiors[this.city.interiors.length - 1].group; for (const g of this.city.factoryBeams) grp.add(g);
  }
  forest(F) {
    for (let i = 0; i < 40; i++) { const x = rr(-26, 26), z = rr(-26, 26); this.city.trees.push([F.x + x, F.z + z, rr(1.1, 1.9), rand() < 0.75]); }
    const [lx, lz] = [F.x, F.z];
    this.landmarks.push({ name: 'Bosque de Blackwood', x: lx, z: lz, kind: 'park' });
  }
  outskirts() {
    // pinheiros densos ao redor (clima sombrio)
    for (let i = 0; i < 260; i++) {
      const x = rr(482, 830), z = rr(-440, 440);
      if (Math.abs(x - BW.x) < BW.half + 6 && Math.abs(z - BW.z) < BW.half + 6) continue;
      if (Math.abs(z) < 8) continue;
      this.city.trees.push([x, z, rr(1.2, 2.2), rand() < 0.85]);
    }
  }
  streetParking() {
    for (let a = 1; a < BW.n; a++) for (let b = 0; b < BW.n; b++) for (let i = -1; i <= 1; i++) {
      if (rand() < 0.6) continue;
      const s = rand() < 0.5 ? -1 : 1;
      this.city.parkedCars.push({ x: bwRoad(a) + s * 4.75, z: bwBlockZ(b) + i * 10, heading: s < 0 ? 0 : Math.PI, type: pick(['classico', 'sedan', 'pickup', 'besouro', 'popular', 'suv']) });
    }
  }
}
