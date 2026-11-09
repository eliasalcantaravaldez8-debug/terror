// WESTHAVEN — terceira cidade (a oeste). Rodovia de 4 faixas saindo de Los Valles, ponte pênsil gigante sobre a baía,
// cidade grande em grade 8x8 (centro com arranha-céus, comércio, bairros, prédios, parques, zona industrial),
// estádio (2x2 quarteirões, ver stadium.js), praça pública, floresta e uma área afastada com poucas casas.
// Desbloqueia depois da missão de fuga (Prólogo).
import * as THREE from 'three';
import { Batcher, box, plane, cyl, mat } from './geo.js';
import { Frame, CURB } from './city.js';
import { mats, signMat, paint } from './materials.js';
import { WH, whRoad, whRoadZ, whBlock, whBlockZ, WH_STADIUM, BAY, HWY, BRIDGE, deckY, PINES } from './places.js';
import { rand, rr, pick, setSeed } from './textures.js';

// linhas = z (norte -> sul), colunas = x (oeste -> leste). 'ST' = estádio (2x2), 'wpraca' = praça pública
export const WH_LAYOUT = [
  ['res', 'res', 'res', 'apart', 'apart', 'res', 'res', 'res'],
  ['res', 'park', 'mixed', 'wshops', 'wshops', 'mixed', 'ST', 'ST'],
  ['res', 'mixed', 'wsky', 'wsky', 'down', 'mixed', 'ST', 'ST'],
  ['res', 'wshops', 'wsky', 'wsky', 'wsky', 'down', 'wpraca', 'wshops'],
  ['res', 'mixed', 'down', 'wsky', 'down', 'wshops', 'mixed', 'res'],
  ['apart', 'res', 'mixed', 'down', 'mixed', 'res', 'park', 'res'],
  ['wind', 'wind', 'res', 'res', 'apart', 'res', 'wind', 'wind'],
  ['wind', 'wind', 'wind', 'res', 'res', 'wind', 'wind', 'wind'],
];
const SHOP_SETS = [
  ['Mercado Westhaven', 'Farmácia Central', 'Lanchonete do Porto', 'Ferragens do Oeste'],
  ['Padaria Bela Vista', 'Loja de Roupas Atlântico', 'Eletrônicos Ponte', 'Conveniência 24h Oeste'],
  ['Café Westhaven', 'Livraria Maré', 'Barbearia do Porto', 'Mercadinho da Baía'],
  ['Pizzaria Farol', 'Ótica Horizonte', 'Joalheria Âncora', 'Farmácia Bem-Estar Oeste'],
];

export class Westhaven {
  constructor(scene, world, city) {
    this.scene = scene; this.world = world; this.city = city; this.M = mats();
    this.root = new THREE.Group(); this.root.name = 'Westhaven'; scene.add(this.root);
    this.landmarks = []; this.spots = {}; this.unlocked = false;
  }
  F(x, z, ry, B) { return new Frame(x, z, ry, B, this.world); }
  build() {
    setSeed(2727);
    const city = this.city, M = this.M; const B = new Batcher();
    this.ground(B); this.highway(B); this.bay(B); this.bridge(B); this.roads(B);
    // tipos de quarteirão de Westhaven (somam-se aos de Blackwood)
    let shopI = 0;
    Object.assign(city.extraBuilders = city.extraBuilders || {}, {
      wsky: (F) => this.skyscrapers(F), wshops: (F) => city.shopsBlock(F, SHOP_SETS[shopI++ % SHOP_SETS.length]), wind: (F) => this.industrial(F),
      wpraca: (F) => (this.onPraca ? this.onPraca(F) : null),
    });
    Object.assign(city.extraGround = city.extraGround || {}, { wsky: M.concreteFlat, wshops: M.concreteFlat, wind: M.concreteFlat, wpraca: M.grass });
    const chunks = new Map();
    for (let k = 0; k < WH.n; k++) for (let j = 0; j < WH.n; j++) {
      const type = WH_LAYOUT[k][j]; if (type === 'ST') continue;
      const key = Math.floor(j / 2) + ',' + Math.floor(k / 2); if (!chunks.has(key)) chunks.set(key, new Batcher());
      city.buildBlock(300 + j, 300 + k, type, whBlock(j), whBlockZ(k), chunks.get(key));
    }
    for (const C of chunks.values()) C.flush(this.root);
    this.forest(B); this.pines(B); this.limits();
    if (this.onStadium) this.onStadium(B);
    B.flush(this.root);
    this.landmarks.push({ name: 'Westhaven (centro)', x: whBlock(3), z: whRoadZ(4) + 3, kind: 'city' }, { name: 'Ponte de Westhaven', x: -670, z: 0, kind: 'bridge' }, { name: PINES.name, x: PINES.x + 20, z: PINES.z, kind: 'park' });
    city.landmarks.push(...this.landmarks);
  }
  // terreno: faixa entre Los Valles e a baía, e todo o oeste (cidade + floresta)
  ground(B) {
    const M = this.M;
    B.add(plane(BAY.x1 + 450, 1200, 4), M.grass, mat((-450 + BAY.x1) / 2, CURB - 0.01, 0));
    B.add(plane(1900 + BAY.x0, 1400, 4), M.grass, mat((BAY.x0 - 1900) / 2, CURB - 0.01, 0));
    const hillMat = new THREE.MeshLambertMaterial({ color: 0x4e6e38, emissive: 0x16200e, flatShading: true }); hillMat.userData.castShadow = false;
    for (let i = 0; i < 18; i++) { const z = rr(-680, 680), x = rr(-1960, -1880); B.add(new THREE.ConeGeometry(rr(60, 120), rr(50, 110), 7, 1), hillMat, mat(x, 0, z)); }
    for (const z of [-720, 720]) for (let i = 0; i < 14; i++) B.add(new THREE.ConeGeometry(rr(60, 110), rr(40, 90), 7, 1), hillMat, mat(rr(-1900, -800), 0, z + rr(-30, 30)));
  }
  // rodovia de 4 faixas com canteiro central, acostamento, defensas e placas
  highway(B) {
    const M = this.M, x0 = HWY.x0, x1 = HWY.x1, L = x1 - x0, cx = (x0 + x1) / 2;
    B.add(plane(L, HWY.w, L / 8, 2), M.asphalt, mat(cx, 0.02, 0));
    const white = paint(M.flat, 0xf2f2f2), yellow = paint(M.flat, 0xe8c21a);
    for (const s of [-1, 1]) { B.add(plane(L, 0.15, 1), white, mat(cx, 0.035, s * (HWY.w / 2 - 0.6))); for (let x = x0 + 2; x < x1; x += 9) B.add(plane(3.5, 0.13, 1), white, mat(x, 0.035, s * 4.3)); }
    B.add(box(L, 0.5, 0.6, 4, 1), M.concrete, mat(cx, 0.25, 0)); this.world.addBox(x0, 0, -0.3, x1 - 4, 0.9, 0.3); // canteiro central (mureta)
    B.add(plane(L, 0.12, 1), yellow, mat(cx, 0.036, 0.45)); B.add(plane(L, 0.12, 1), yellow, mat(cx, 0.036, -0.45));
    for (const s of [-1, 1]) { B.add(box(L, 0.6, 0.15, 4, 1), M.metalLight, mat(cx, 0.55, s * (HWY.w / 2 + 0.2))); for (let x = x0; x < x1; x += 4) B.add(box(0.12, 0.75, 0.12), M.metalDark, mat(x, 0.37, s * (HWY.w / 2 + 0.25))); this.world.addBox(x0, 0, s * (HWY.w / 2 + 0.2) - 0.15, x1 - 2, 1, s * (HWY.w / 2 + 0.2) + 0.15); }
    for (let x = x0 + 30; x < x1 - 10; x += 60) for (const s of [-1, 1]) { B.add(cyl(0.12, 0.15, 9, 8), M.metalDark, mat(x, 4.5, s * (HWY.w / 2 + 1))); B.add(box(0.3, 0.2, 3), M.metalDark, mat(x, 9, s * (HWY.w / 2 - 0.4))); B.add(box(0.5, 0.08, 1.2), M.lamp, mat(x, 8.88, s * (HWY.w / 2 - 1.6))); this.city.lamps.push([x, 8.8, s * (HWY.w / 2 - 1.6)]); }
    // placas verdes de rodovia
    for (const [x, s, txt] of [[-300, 1, 'WESTHAVEN  ←  12 km'], [-440, -1, 'LOS VALLES  →'], [-460, 1, 'PONTE DE WESTHAVEN']]) {
      B.add(cyl(0.15, 0.15, 7, 8), M.metalDark, mat(x, 3.5, s * (HWY.w / 2 + 2))); B.add(box(0.2, 0.2, HWY.w / 2 + 2), M.metalDark, mat(x, 7, s * (HWY.w / 4 + 1)));
      B.add(box(0.15, 1.6, 6.5, 6.5, 1.6), signMat(txt, { bg: '#0d5a2a', fg: '#ffffff', w: 1024, h: 160 }), mat(x, 6.2, s * HWY.w / 4, Math.PI / 2));
    }
  }
  // baía: água, margens de pedra e o fundo bloqueado (não dá para dirigir na água)
  bay(B) {
    const M = this.M, w = BAY.x1 - BAY.x0, cx = (BAY.x0 + BAY.x1) / 2;
    const water = new THREE.MeshPhongMaterial({ color: 0x14384e, specular: 0x9ab0c0, shininess: 110, envMap: M.water.envMap, combine: THREE.MixOperation, reflectivity: 0.35 });
    water.userData.castShadow = false;
    B.add(plane(w, 1400, 8), water, mat(cx, -0.8, 0));
    this.world.addBox(BAY.x0 + 1, -5, -700, BAY.x1 - 1, 3, 700);
    for (const x of [BAY.x0, BAY.x1]) { B.add(box(3, 2.4, 1400, 2, 100), M.concrete, mat(x, -0.9, 0)); }
  }
  // PONTE PÊNSIL: tabuleiro de 4 faixas a 12 m, duas torres de 75 m, cabos principais e pendurais
  bridge(B) {
    const M = this.M; const W = BRIDGE.w, x0 = BRIDGE.x0, x1 = BRIDGE.x1;
    const white = paint(M.flat, 0xf2f2f2), steel = paint(M.flat, 0xb8432a), dark = M.metalDark;
    const seg = 6;
    for (let x = x1; x > x0; x -= seg) {
      const xa = x, xb = x - seg, ya = deckY(xa), yb = deckY(xb), ang = Math.atan2(ya - yb, seg);
      const xm = (xa + xb) / 2, ym = (ya + yb) / 2, len = Math.hypot(seg, ya - yb) + 0.05;
      B.add(new THREE.BoxGeometry(len, 0.08, W - 1).rotateZ(ang), M.asphalt, mat(xm, ym + 0.01, 0));
      if (ym > 1) B.add(new THREE.BoxGeometry(len, 1.1, W + 1).rotateZ(ang), M.concrete, mat(xm, ym - 0.6, 0));
      for (const s of [-1, 1]) {
        B.add(new THREE.BoxGeometry(len, 0.9, 0.3).rotateZ(ang), M.concrete, mat(xm, ym + 0.45, s * (W / 2 + 0.1)));
        B.add(new THREE.BoxGeometry(len, 0.06, 0.08).rotateZ(ang), M.metalLight, mat(xm, ym + 1.25, s * (W / 2 + 0.1)));
        this.world.addBox(xb, Math.min(ya, yb) - 1, s * (W / 2 + 0.1) - 0.2, xa, Math.max(ya, yb) + 1.4, s * (W / 2 + 0.1) + 0.2);
        B.add(plane(len, 0.15, 1), white, mat(xm, ym + 0.06, s * (W / 2 - 1.1), 0, 0, ang));
      }
      B.add(new THREE.BoxGeometry(len, 0.5, 0.6).rotateZ(ang), M.concrete, mat(xm, ym + 0.25, 0));
    }
    // pilares sob as rampas
    for (let x = x1 - 15; x > x0; x -= 18) { const y = deckY(x); if (y > 2 && (x > BAY.x1 + 4 || x < BAY.x0 - 4)) B.add(box(1.6, y - 1, 6), M.concrete, mat(x, (y - 1) / 2, 0)); }
    // torres (H) dentro da água, perto das margens
    const TH = 76; const [ta, tb] = BRIDGE.towers;
    for (const tx of [ta, tb]) {
      for (const s of [-1, 1]) { B.add(box(3.2, TH + 2, 3.2, 2, 16), steel, mat(tx, TH / 2 - 1, s * (W / 2 + 2.4))); this.world.addCentered(tx, -2, s * (W / 2 + 2.4), 3.2, TH, 3.2); }
      for (const y of [deckY(tx) - 1.4, 34, 56, TH - 1]) B.add(box(2.2, 2.2, W + 6.8, 1, 4), steel, mat(tx, y, 0));
      B.add(box(6, 4, W + 10, 2, 2), M.concrete, mat(tx, -1, 0)); // base na água
      for (const s of [-1, 1]) { B.add(new THREE.SphereGeometry(0.35, 8, 6), M.lamp, mat(tx, TH + 1.6, s * (W / 2 + 2.4))); }
    }
    // cabos principais: parábola entre as torres e trechos até as ancoragens nas margens
    const cy = (x) => {
      if (x <= ta && x >= tb) { const t = (x - (ta + tb) / 2) / ((ta - tb) / 2); return deckY(x) + 3 + (TH - 2 - deckY(x) - 3) * t * t; }
      if (x > ta) { const t = (x - ta) / (x1 + 20 - ta); return TH - 2 - (TH - 2 - 2) * t; }
      const t = (tb - x) / (tb - (x0 - 20)); return TH - 2 - (TH - 2 - 2) * t;
    };
    const cableX = [];
    for (let x = x1 + 20; x >= x0 - 20; x -= 4) cableX.push(x);
    for (const s of [-1, 1]) {
      const z = s * (W / 2 + 2.4);
      for (let i = 0; i < cableX.length - 1; i++) {
        const xa = cableX[i], xb = cableX[i + 1], ya = cy(xa), yb = cy(xb); const len = Math.hypot(xa - xb, ya - yb);
        B.add(new THREE.CylinderGeometry(0.28, 0.28, len, 6).rotateZ(Math.PI / 2 + Math.atan2(ya - yb, xa - xb)), steel, mat((xa + xb) / 2, (ya + yb) / 2, z));
      }
      // pendurais (cabos verticais) a cada 8 m no vão e nos vãos laterais sobre a água
      for (let x = x1 - 4; x > x0 + 4; x -= 8) { const yd = deckY(x) + 1, yc = cy(x); if (yc - yd < 1.5) continue; B.add(cyl(0.05, 0.05, yc - yd, 4), dark, mat(x, (yc + yd) / 2, z)); }
      // ancoragens de concreto nas margens
      for (const ax of [x1 + 20, x0 - 20]) B.add(box(8, 5, 6, 2, 2), M.concrete, mat(ax, 2.5, z));
    }
    // postes no tabuleiro
    for (let x = x1 - 10; x > x0; x -= 30) for (const s of [-1, 1]) { const y = deckY(x); B.add(cyl(0.08, 0.1, 6, 6), dark, mat(x, y + 3, s * (W / 2 - 0.2))); B.add(box(0.4, 0.12, 1.6), M.lamp, mat(x, y + 6, s * (W / 2 - 1))); this.city.lamps.push([x, y + 5.9, s * (W / 2 - 1)]); }
    B.add(box(0.3, 2, 8, 8, 2), signMat('PONTE DE WESTHAVEN', { bg: '#20222a', fg: '#f0e0b0', glow: true, w: 1024, h: 160 }), mat(x1 - 6, CURB + 2.2, W / 2 + 4, Math.PI / 2));
    B.add(box(0.3, 2, 8, 8, 2), signMat('BEM-VINDO A WESTHAVEN', { bg: '#20222a', fg: '#f0e0b0', glow: true, w: 1024, h: 160 }), mat(x0 + 6, CURB + 2.2, -W / 2 - 4, -Math.PI / 2));
    for (const [x, z] of [[x1 - 6, W / 2 + 4], [x0 + 6, -W / 2 - 4]]) B.add(cyl(0.08, 0.08, 2.2, 6), dark, mat(x, CURB + 1.1, z));
    // bloqueio enquanto Westhaven não foi liberada
    this.gate = new THREE.Group();
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.2, W - 1), new THREE.MeshLambertMaterial({ color: 0xd8d8d8 })); bar.position.set(-486, 0.6, 0); this.gate.add(bar);
    for (let i = 0; i < 6; i++) { const st = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.25, (W - 1) / 12), new THREE.MeshLambertMaterial({ color: 0xc81818 })); st.position.set(-486, 0.9, -W / 2 + 0.5 + (i + 0.25) * (W - 1) / 6); this.gate.add(st); }
    this.root.add(this.gate);
    this.gateBox = this.world.addBox(-487, 0, -W / 2, -485, 3, W / 2);
    this.gateSign = { x: -478, z: 0 };
  }
  unlock() { if (this.unlocked) return; this.unlocked = true; this.gate.visible = false; this.world.disableBox(this.gateBox); }
  // ruas da grade (sem as internas do estádio)
  roads(B) {
    const M = this.M; const len = WH.P - WH.ROAD;
    const skipX = (a, b) => a === 7 && (b === 1 || b === 2); // rua norte-sul x=whRoad(7) entre os quarteirões do estádio
    const skipZ = (a, b) => a === 2 && (b === 6 || b === 7); // rua leste-oeste z=whRoadZ(2) entre os quarteirões do estádio
    for (let a = 0; a <= WH.n; a++) {
      for (let b = 0; b < WH.n; b++) {
        if (!skipX(a, b)) { B.add(plane(WH.ROAD, len, WH.ROAD, 12), M.road, mat(whRoad(a), 0, whBlockZ(b))); for (const s of [-1, 1]) B.add(plane(WH.ROAD, 3, 9.6, 3), M.cross, mat(whRoad(a), 0.01, whBlockZ(b) + s * (len / 2 - 1.8))); }
        if (!skipZ(a, b)) { B.add(plane(WH.ROAD, len, WH.ROAD, 12), M.road, mat(whBlock(b), 0, whRoadZ(a), Math.PI / 2)); for (const s of [-1, 1]) B.add(plane(WH.ROAD, 3, 9.6, 3), M.cross, mat(whBlock(b) + s * (len / 2 - 1.8), 0.01, whRoadZ(a), Math.PI / 2)); }
      }
      for (let b = 0; b <= WH.n; b++) {
        if (a === 7 && b === 2) continue; // centro do estádio
        B.add(plane(WH.ROAD, WH.ROAD, 6), M.asphalt, mat(whRoad(a), 0, whRoadZ(b)));
        // semáforo de poste simples em algumas esquinas do centro
        if (a >= 2 && a <= 6 && b >= 2 && b <= 6 && (a + b) % 2 === 0) for (const [sx, sz] of [[7, 7], [-7, -7]]) {
          const x = whRoad(a) + sx, z = whRoadZ(b) + sz; B.add(cyl(0.08, 0.1, 4.2, 6), M.metalDark, mat(x, CURB + 2.1, z)); B.add(box(0.35, 0.95, 0.3), M.tlBox || M.metalDark, mat(x, CURB + 4.0, z));
          for (let i = 0; i < 3; i++) B.add(new THREE.SphereGeometry(0.09, 8, 6), [M.tl ? M.tl[0] : M.red, M.yellow, M.green][i] || M.red, mat(x + (sx > 0 ? -0.16 : 0.16), CURB + 4.3 - i * 0.28, z));
          this.world.addCentered(x, 0, z, 0.25, 4.5, 0.25);
        }
      }
    }
    // ligação da ponte à grade (avenida leste) e estrada de terra até a área afastada
    B.add(plane(10, BRIDGE.w, 2), M.asphalt, mat(BRIDGE.x0 - 2, 0.01, 0));
  }
  // centro: 2 arranha-céus por quarteirão, com lojas no térreo e praça seca entre eles
  skyscrapers(F) {
    const city = this.city, M = this.M; const inner = (WH.BLOCK - 8) / 2;
    const kinds = ['office', 'office', 'concrete', 'office'];
    for (const s of [-1, 1]) {
      const floors = Math.floor(rr(18, 44));
      city.building(F, s * 14, -3, 24, inner * 2 - 12, floors, pick(kinds), { storefronts: [s < 0 ? 'w' : 'e', 'n'], tower: true });
    }
    const f = new Frame(F.x, F.z, 0, F.B, this.world);
    f.add(plane(5, inner * 2 - 12, 2), M.concrete, 0, CURB + 0.012, -3);
    for (let i = 0; i < 3; i++) this.city.trees.push([F.x, F.z - inner + 10 + i * 16, rr(0.7, 0.9)]);
    this.city.bench(f, 0, inner - 4, 0);
  }
  // zona industrial: galpões de zinco, contêineres empilhados, pátio e cerca
  industrial(F) {
    const M = this.M; const f = new Frame(F.x, F.z, 0, F.B, this.world); const inner = (WH.BLOCK - 8) / 2;
    const cols = [0x7a3a2a, 0x3a4a5a, 0x5a5a3a, 0x8a6a2a, 0x2a5a4a];
    const gw = 22, gd = 30, gh = rr(8, 11), gx = rr(-6, 6);
    f.box(M.corr(pick(cols)), gx - 8, CURB, -inner + gd / 2 + 2, gw, gh, gd, true, 4);
    f.box(M.metalDark, gx - 8, CURB + gh, -inner + gd / 2 + 2, gw + 0.6, 0.4, gd + 0.6, false);
    f.box(M.metal, gx - 8, CURB, -inner + gd + 2.05, 6, 5, 0.1, false); // portão de enrolar
    f.box(signMat(pick(['ARMAZÉNS OESTE', 'LOGÍSTICA BAÍA', 'METALÚRGICA WH', 'PORTO SECO']), { bg: '#2a2a2a', fg: '#e8c21a', w: 512, h: 96 }), gx - 8, CURB + gh - 1.2, -inner + gd + 2.1, 8, 1, 0.08, false, 8, 1);
    for (let i = 0; i < 8; i++) { const cx = inner - 4 - (i % 2) * 3, cz = -inner + 4 + Math.floor(i / 2) * 6.5; const lv = rand() < 0.5 ? 2 : 1;
      for (let l = 0; l < lv; l++) f.box(M.corr(pick(cols)), cx, CURB + l * 2.6, cz, 2.5, 2.6, 6.1, true, 2); }
    f.add(plane(inner * 2 - 4, 18, 4), M.concreteFlat, 0, CURB + 0.012, inner - 11);
    for (let i = 0; i < 3; i++) this.city.parkedCars.push({ x: F.x - 12 + i * 8, z: F.z + inner - 8, heading: 0, type: pick(['pickup', 'suv', 'pickup']) });
    for (const s of [-1, 1]) F.B.add(box(0.05, 2.2, inner * 2 - 2), M.metalLight, f.m(s * (inner - 0.3), CURB + 1.1, 0));
  }
  // floresta a oeste e ao norte/sul da cidade (árvores instanciadas, baratas)
  forest() {
    const T = this.city.trees;
    for (let i = 0; i < 900; i++) {
      const x = rr(-1880, -1470), z = rr(-660, 660);
      if (Math.hypot(x - PINES.x, z - PINES.z) < PINES.r + 6) continue;
      if (Math.abs(z - PINES.z) < 5 && x > PINES.x) continue; // estrada de terra
      T.push([x, z, rr(1.0, 1.9), rand() < 0.6]);
    }
    for (let i = 0; i < 500; i++) { const x = rr(-1470, -800), z = rand() < 0.5 ? rr(-680, -330) : rr(330, 680); T.push([x, z, rr(0.9, 1.7), rand() < 0.5]); }
    for (let i = 0; i < 120; i++) { const x = rr(BAY.x1 + 8, -460), z = rr(-560, 560); if (Math.abs(z) < 30) continue; T.push([x, z, rr(0.9, 1.6), rand() < 0.4]); }
  }
  // área afastada: poucas casas numa clareira, estrada de terra até a cidade (sem eventos de história)
  pines(B) {
    const M = this.M, city = this.city; const P = PINES;
    B.add(plane(-1460 - P.x, 5, 4), M.dirt, mat((P.x - 1460) / 2, CURB + 0.02, P.z));
    for (const [lx, lz] of [[-28, -14], [26, -18], [-30, 18], [24, 20]]) B.add(new THREE.CircleGeometry(7, 16).rotateX(-Math.PI / 2), M.dirt, mat(P.x + lx, CURB + 0.015, P.z + lz)); // quintais de terra
    B.add(plane(P.r * 2 - 10, 4, 4), M.dirt, mat(P.x, CURB + 0.016, P.z)); // caminho entre as casas
    this.city.grassRects.push([P.x, P.z, P.r * 0.6]);
    const f = new Frame(P.x, P.z, 0, B, this.world);
    const spots = [[-28, -22, 0], [26, -26, 0], [-30, 26, Math.PI], [24, 28, Math.PI]];
    for (const [lx, lz, ry] of spots) city.house(f, lx, lz, ry, { floors: 1 });
    for (let i = 0; i < 6; i++) city.bench && i < 2 && city.bench(f, -6 + i * 12, 0, Math.PI / 2);
    this.spots.pines = [P.x, P.z];
  }
  limits() {
    const W = this.world;
    W.addBox(-1902, 0, -700, -1900, 60, 700); W.addBox(-1900, 0, -702, BAY.x0, 60, -700); W.addBox(-1900, 0, 700, BAY.x0, 60, 702);
    W.addBox(BAY.x1, 0, -602, -450, 60, -600); W.addBox(BAY.x1, 0, 600, -450, 60, 602);
  }
}
