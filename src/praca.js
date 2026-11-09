// PRAÇA DE WESTHAVEN: quadra de basquete com arremesso de verdade (física da bola, aro, tabela),
// parquinho, chafariz, bancos onde dá para sentar, postes, lixeiras e gente diferente em cada horário.
import * as THREE from 'three';
import { box, plane, cyl } from './geo.js';
import { Frame, CURB, SW, BLOCK } from './city.js';
import { mats, paint } from './materials.js';

const G_ACC = 9.8, BALL_R = 0.12, RIM_R = 0.23, RIM_T = 0.02, RIM_H = 3.05;
const CL = 26, CW = 14; // quadra (comprimento ao longo de z, largura em x)
const THREE_PT = 6.75;

function courtTexture() {
  const k = 40, W = CW * k + 80, H = CL * k + 80, c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
  g.fillStyle = '#2d5a84'; g.fillRect(0, 0, W, H); // faixa externa
  g.fillStyle = '#b8642e'; g.fillRect(40, 40, CW * k, CL * k); // piso da quadra
  for (let i = 0; i < 9000; i++) { g.fillStyle = `rgba(${Math.random() < 0.5 ? '0,0,0' : '255,255,255'},0.035)`; g.fillRect(Math.random() * W, Math.random() * H, 2, 2); }
  const X = (m) => 40 + (m + CW / 2) * k, Z = (m) => 40 + (m + CL / 2) * k;
  g.strokeStyle = '#f4f4f0'; g.lineWidth = 0.06 * k;
  g.strokeRect(X(-CW / 2), Z(-CL / 2), CW * k, CL * k);
  g.beginPath(); g.moveTo(X(-CW / 2), Z(0)); g.lineTo(X(CW / 2), Z(0)); g.stroke();
  g.beginPath(); g.arc(X(0), Z(0), 1.8 * k, 0, Math.PI * 2); g.stroke();
  for (const s of [-1, 1]) {
    const base = s * CL / 2, rim = s * (CL / 2 - 1.575);
    // garrafão pintado + linha de lance livre
    g.fillStyle = 'rgba(30,70,120,0.85)'; const kz0 = Z(base), kz1 = Z(base - s * 5.8); g.fillRect(X(-2.45), Math.min(kz0, kz1), 4.9 * k, Math.abs(kz1 - kz0));
    g.strokeRect(X(-2.45), Math.min(kz0, kz1), 4.9 * k, Math.abs(kz1 - kz0));
    g.beginPath(); g.arc(X(0), Z(base - s * 5.8), 1.8 * k, 0, Math.PI * 2); g.stroke();
    // linha de 3 pontos: retas laterais + arco
    const side = CW / 2 - 0.9, a = Math.asin(side / THREE_PT), zc = Math.cos(a) * THREE_PT;
    g.beginPath(); g.moveTo(X(-side), Z(base)); g.lineTo(X(-side), Z(rim - s * zc)); g.stroke();
    g.beginPath(); g.moveTo(X(side), Z(base)); g.lineTo(X(side), Z(rim - s * zc)); g.stroke();
    g.beginPath(); if (s > 0) g.arc(X(0), Z(rim), THREE_PT * k, Math.PI + (Math.PI / 2 - a), 2 * Math.PI - (Math.PI / 2 - a)); else g.arc(X(0), Z(rim), THREE_PT * k, Math.PI / 2 - a, Math.PI / 2 + a); g.stroke();
  }
  g.fillStyle = 'rgba(255,255,255,0.75)'; g.font = `bold ${1.1 * k}px sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.save(); g.translate(X(0), Z(0)); g.rotate(Math.PI / 2); g.fillText('WESTHAVEN', 0, 0); g.restore();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}
function ballTexture() {
  const c = document.createElement('canvas'); c.width = 256; c.height = 128; const g = c.getContext('2d');
  g.fillStyle = '#d4651e'; g.fillRect(0, 0, 256, 128);
  for (let i = 0; i < 3000; i++) { g.fillStyle = `rgba(0,0,0,${Math.random() * 0.12})`; g.fillRect(Math.random() * 256, Math.random() * 128, 1, 1); }
  g.strokeStyle = '#1a1008'; g.lineWidth = 3;
  for (const u of [0, 64, 128, 192]) { g.beginPath(); g.moveTo(u, 0); g.lineTo(u, 128); g.stroke(); }
  g.beginPath(); g.moveTo(0, 64); g.lineTo(256, 64); g.stroke();
  for (const u0 of [32, 160]) { g.beginPath(); for (let v = 0; v <= 128; v += 4) { const x = u0 + Math.sin(v / 128 * Math.PI) * 22; v ? g.lineTo(x, v) : g.moveTo(x, v); } g.stroke(); g.beginPath(); for (let v = 0; v <= 128; v += 4) { const x = u0 + 64 - Math.sin(v / 128 * Math.PI) * 22; v ? g.lineTo(x, v) : g.moveTo(x, v); } g.stroke(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
function netGeo() {
  // rede: cone aberto com malha em losango (linhas)
  const pts = [], N = 12, rows = 4;
  for (let i = 0; i < N; i++) for (let r = 0; r < rows; r++) {
    const a0 = (i + (r % 2) * 0.5) / N * Math.PI * 2, a1 = (i + 0.5 + (r % 2) * 0.5) / N * Math.PI * 2, a2 = (i - 0.5 + (r % 2) * 0.5) / N * Math.PI * 2;
    const r0 = RIM_R - r * 0.025, r1 = RIM_R - (r + 1) * 0.025, y0 = -r * 0.11, y1 = -(r + 1) * 0.11;
    pts.push(Math.cos(a0) * r0, y0, Math.sin(a0) * r0, Math.cos(a1) * r1, y1, Math.sin(a1) * r1);
    pts.push(Math.cos(a0) * r0, y0, Math.sin(a0) * r0, Math.cos(a2) * r1, y1, Math.sin(a2) * r1);
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3)); return g;
}
const gauss = () => { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };

export class Praca {
  constructor(scene, world, city) {
    this.scene = scene; this.world = world; this.city = city; this.M = mats();
    this.seats = []; this.hoops = []; this.seat = null; this.held = false; this.points = 0; this.made = 0; this.tries = 0; this.shot = null; this.anim = [];
  }
  // F: frame do quarteirão (centro, sem rotação)
  build(F) {
    const M = this.M, y = CURB, f = new Frame(F.x, F.z, 0, F.B, this.world), inner = (BLOCK - SW * 2) / 2; this.cx = F.x; this.cz = F.z;
    const paving = M.concreteFlat;
    // caminhos de piso
    f.add(plane(inner * 2, 3.2, 3), paving, 0, y + 0.012, 0); f.add(plane(3.2, inner * 2, 3), paving, 4, y + 0.012, 0);
    // QUADRA (lado oeste, ao longo de z)
    const qx = -13; this.court = { x: F.x + qx, z: F.z };
    const cm = new THREE.MeshLambertMaterial({ map: courtTexture() }); cm.userData.castShadow = false; cm.polygonOffset = true; cm.polygonOffsetFactor = -2;
    f.add(plane(CW + 2, CL + 2, CW + 2, CL + 2), cm, qx, y + 0.02, 0);
    // alambrado baixo com abertura no meio dos lados
    const fence = paint(M.flat, 0x3d4a3a);
    for (const s of [-1, 1]) {
      f.box(fence, qx, y, s * (CL / 2 + 1.6), CW + 3.2, 1.1, 0.06, true, 1);
      for (const t of [-1, 1]) f.box(fence, qx + s * (CW / 2 + 1.6), y, t * (CL / 4 + 2.5), 0.06, 1.1, CL / 2 - 5, true, 1);
    }
    // tabelas, aros e redes
    const white = paint(M.flat, 0xf2f2f2), steel = paint(M.flat, 0x4a5058), orange = new THREE.MeshLambertMaterial({ color: 0xe0581a });
    const boardM = new THREE.MeshPhongMaterial({ color: 0xffffff, transparent: true, opacity: 0.55, shininess: 80, depthWrite: false, side: THREE.DoubleSide }); boardM.userData.castShadow = false;
    for (const s of [-1, 1]) {
      const bz = s * (CL / 2 - 1.2), rz = s * (CL / 2 - 1.575), pz = s * (CL / 2 + 0.2);
      f.add(cyl(0.1, 0.12, 3.6, 10), steel, qx, y + 1.8, pz); f.collide(qx, y, pz, 0.24, 3.6, 0.24);
      f.add(new THREE.BoxGeometry(0.1, 0.1, Math.abs(pz - bz)), steel, qx, y + 3.45, (pz + bz) / 2);
      f.add(new THREE.BoxGeometry(1.8, 1.05, 0.04), boardM, qx, y + RIM_H + 0.375, bz);
      f.add(new THREE.BoxGeometry(1.84, 0.05, 0.05), white, qx, y + RIM_H - 0.15, bz); f.add(new THREE.BoxGeometry(1.84, 0.05, 0.05), white, qx, y + RIM_H + 0.9, bz);
      for (const t of [-1, 1]) f.add(new THREE.BoxGeometry(0.05, 1.05, 0.05), white, qx + t * 0.9, y + RIM_H + 0.375, bz);
      f.add(new THREE.BoxGeometry(0.59, 0.45, 0.045), paint(M.flat, 0xf8f8f8), qx, y + RIM_H + 0.28, bz - s * 0.005);
      f.add(new THREE.BoxGeometry(0.53, 0.39, 0.05), paint(M.flat, 0xb84a1a), qx, y + RIM_H + 0.28, bz - s * 0.007);
      f.add(new THREE.BoxGeometry(0.49, 0.35, 0.055), paint(M.flat, 0xf8f8f8), qx, y + RIM_H + 0.28, bz - s * 0.009);
      f.add(new THREE.TorusGeometry(RIM_R, RIM_T, 6, 24).rotateX(Math.PI / 2), orange, qx, y + RIM_H, rz);
      f.add(new THREE.BoxGeometry(0.06, 0.04, Math.abs(bz - rz)), orange, qx, y + RIM_H, (bz + rz) / 2);
      const [hx, hz] = f.pt(qx, rz), [, bzw] = f.pt(qx, bz), [, pzw] = f.pt(qx, pz);
      const net = new THREE.LineSegments(netGeo(), new THREE.LineBasicMaterial({ color: 0xf0f0f0 })); net.position.set(hx, y + RIM_H - 0.01, hz); this.scene.add(net);
      this.hoops.push({ x: hx, z: hz, y: y + RIM_H, s, bz: bzw, pz: pzw, net, wob: 0 });
    }
    // arquibancada pequena ao lado da quadra
    for (let r = 0; r < 3; r++) f.box(paint(M.flat, 0x8a8f96), qx - CW / 2 - 3.2 - r * 0.7, y, 0, 0.7, 0.4 + r * 0.4, 10, true, 1);
    // PARQUINHO (nordeste): piso emborrachado, balanços, escorregador, gangorra, trepa-trepa, caixa de areia
    const px = 15, pz = -14; const rub = new THREE.MeshLambertMaterial({ color: 0x9a3a2c }); rub.userData.castShadow = false; rub.polygonOffset = true; rub.polygonOffsetFactor = -2;
    f.add(plane(16, 13, 2), rub, px, y + 0.02, pz);
    const red = paint(M.flat, 0xc8302a), yel = paint(M.flat, 0xe8c020), blu = paint(M.flat, 0x2a6ac8), grn = paint(M.flat, 0x2a9a4a);
    // balanços (assentos animados)
    const sx = px - 4; for (const t of [-1, 1]) { f.add(cyl(0.06, 0.06, 2.6, 8).rotateX(t * 0.22), red, sx + t * 0, y + 1.25, pz - 3 + t * 0.29); }
    for (const t of [-1, 1]) f.add(cyl(0.06, 0.06, 2.6, 8).rotateX(t * 0.22), red, sx, y + 1.25, pz + 3 + t * 0.29);
    f.add(cyl(0.05, 0.05, 6.2, 8).rotateX(Math.PI / 2), red, sx, y + 2.5, pz);
    f.collide(sx, y, pz - 3, 0.3, 2.5, 0.8); f.collide(sx, y, pz + 3, 0.3, 2.5, 0.8);
    for (const t of [-1.3, 1.3]) {
      const sw = new THREE.Group(); const [wx, wz] = f.pt(sx, pz + t); sw.position.set(wx, y + 2.5, wz);
      const ch = new THREE.LineSegments(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute([0, 0, -0.22, 0, -1.95, -0.22, 0, 0, 0.22, 0, -1.95, 0.22], 3)), new THREE.LineBasicMaterial({ color: 0x777777 }));
      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.04, 0.5), new THREE.MeshLambertMaterial({ color: 0x222222 })); seat.position.y = -1.97; sw.add(ch, seat); this.scene.add(sw); this.anim.push({ o: sw, ph: Math.random() * 6, amp: 0.12 + Math.random() * 0.15 });
    }
    // escorregador
    const slx = px + 3, slz = pz - 3;
    f.box(yel, slx - 1.2, y, slz, 1.2, 1.6, 1.2, true, 1); f.add(new THREE.BoxGeometry(1.4, 0.08, 1.4), blu, slx - 1.2, y + 1.64, slz);
    for (let i = 0; i < 5; i++) f.add(new THREE.BoxGeometry(0.6, 0.05, 0.25), grn, slx - 2.1 - i * 0.18, y + 0.3 + i * 0.32, slz);
    const ang = Math.atan2(1.6, 3.0); f.add(new THREE.BoxGeometry(3.4, 0.06, 0.7).rotateZ(-ang), red, slx + 1.0, y + 0.85, slz);
    for (const t of [-1, 1]) f.add(new THREE.BoxGeometry(3.4, 0.2, 0.05).rotateZ(-ang), red, slx + 1.0, y + 0.95, slz + t * 0.36);
    // gangorra (animada)
    { const [gx, gz] = f.pt(px + 4, pz + 3); f.box(steel, px + 4, y, pz + 3, 0.3, 0.5, 0.3, true, 1);
      const sa = new THREE.Group(); sa.position.set(gx, y + 0.55, gz); const bar = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.08, 0.3), new THREE.MeshLambertMaterial({ color: 0x2a6ac8 })); sa.add(bar);
      for (const t of [-1, 1]) { const hdl = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.35, 0.3), new THREE.MeshLambertMaterial({ color: 0xe8c020 })); hdl.position.set(t * 1.5, 0.2, 0); sa.add(hdl); }
      this.scene.add(sa); this.anim.push({ o: sa, ph: 0, amp: 0.22, see: true }); }
    // trepa-trepa (cúpula de barras)
    { const dome = new THREE.Mesh(new THREE.SphereGeometry(1.4, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshLambertMaterial({ color: 0x2a9a4a, wireframe: true })); const [dx, dz] = f.pt(px - 4, pz + 4.5); dome.position.set(dx, y, dz); this.scene.add(dome); f.collide(px - 4, y, pz + 4.5, 2.4, 1.4, 2.4); }
    // caixa de areia
    f.box(paint(M.flat, 0x8a6a4a), px + 5.5, y, pz - 4.5, 3.2, 0.25, 0.12, true, 1); f.box(paint(M.flat, 0x8a6a4a), px + 5.5, y, pz - 2.9, 3.2, 0.25, 0.12, true, 1);
    f.add(plane(3, 1.5, 1), paint(M.flat, 0xd8c08a), px + 5.5, y + 0.15, pz - 3.7);
    // cerquinha do parquinho
    for (const s of [-1, 1]) f.box(paint(M.flat, 0xe8e8e8), px + s * 8.1, y, pz, 0.06, 0.8, 13, true, 1);
    f.box(paint(M.flat, 0xe8e8e8), px - 3, y, pz - 6.6, 10, 0.8, 0.06, true, 1);
    // CHAFARIZ (sudeste) com água animada
    const fx = 15, fz = 12;
    f.add(cyl(3.6, 3.8, 0.55, 28), M.concrete, fx, y + 0.27, fz); f.add(cyl(3.3, 3.3, 0.05, 28), M.water, fx, y + 0.5, fz);
    f.add(cyl(0.35, 0.5, 1.6, 12), M.concrete, fx, y + 0.8, fz); f.add(cyl(1.3, 0.7, 0.25, 18), M.concrete, fx, y + 1.65, fz); f.add(cyl(1.15, 1.15, 0.04, 18), M.water, fx, y + 1.78, fz);
    f.add(cyl(0.12, 0.18, 0.7, 10), M.concrete, fx, y + 2.1, fz);
    this.world.addCentered(F.x + fx, 0, F.z + fz, 7.4, 0.8, 7.4);
    { const wm = new THREE.MeshPhongMaterial({ color: 0xcfe8ff, transparent: true, opacity: 0.5, shininess: 120, depthWrite: false, side: THREE.DoubleSide });
      const jet = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.12, 1.0, 10, 1, true), wm); jet.position.set(F.x + fx, y + 2.9, F.z + fz); this.scene.add(jet);
      const fall = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.6, 1.3, 24, 1, true), wm); fall.position.set(F.x + fx, y + 1.15, F.z + fz); this.scene.add(fall);
      this.water = { jet, fall }; }
    // BANCOS (onde dá para sentar): em volta do chafariz, na quadra e no parquinho
    const benches = [[fx, fz - 5.4, Math.PI], [fx - 5.4, fz, -Math.PI / 2], [fx, fz + 5.4, 0], [fx + 5.4, fz, Math.PI / 2],
      [qx + CW / 2 + 3.4, -6, Math.PI / 2], [qx + CW / 2 + 3.4, 6, Math.PI / 2], [px - 4, pz + 8.6, 0], [px + 4, pz + 8.6, 0], [-8, -26, 0], [-8, 26, Math.PI]];
    // obs.: o banco senta virado para +z local; ry gira para olhar na direção certa
    for (const [bx, bz, br] of benches) {
      const ry = br + Math.PI; this.city.bench(f, bx, bz, ry);
      const c = Math.cos(ry), s = Math.sin(ry);
      for (const t of [-0.5, 0.5]) { const lx = bx + t * c + 0.05 * s, lz = bz - t * s + 0.05 * c; const [wx, wz] = f.pt(lx, lz); this.seats.push({ x: wx, z: wz, y, heading: ry }); }
    }
    // postes e lixeiras
    for (const [lx, lz] of [[2, -20], [2, 20], [10, 2], [24, 2], [-2, -8], [-2, 8], [qx - 8, -14], [qx - 8, 14], [22, -22], [22, 22]]) {
      f.add(cyl(0.06, 0.09, 4.2, 8), M.metalDark, lx, y + 2.1, lz); f.add(new THREE.SphereGeometry(0.3, 10, 8), M.lamp, lx, y + 4.3, lz); f.collide(lx, y, lz, 0.2, 4, 0.2);
      const [wx, wz] = f.pt(lx, lz); this.city.lamps.push([wx, y + 4.3, wz]);
    }
    const bin = paint(M.flat, 0x2d5a3a);
    for (const [lx, lz] of [[2, -5], [6, 6], [qx + CW / 2 + 3.4, 0], [px + 8.8, pz + 7], [fx - 4, fz + 4.8], [-6, 22]]) { f.add(cyl(0.28, 0.24, 0.85, 12), bin, lx, y + 0.43, lz); f.add(cyl(0.3, 0.3, 0.06, 12), M.metalDark, lx, y + 0.88, lz); f.collide(lx, y, lz, 0.55, 0.9, 0.55); }
    // árvores e canteiros
    for (const [lx, lz] of [[-26, -26], [-26, 26], [26, 26], [-2, -26], [-2, 26], [26, -2], [8, 24], [24, 8], [8, -26], [-27, 0]]) this.city.trees.push([F.x + lx, F.z + lz, 0.9 + Math.random() * 0.5]);
    // BOLA de basquete
    const ball = new THREE.Mesh(new THREE.SphereGeometry(BALL_R, 18, 12), new THREE.MeshLambertMaterial({ map: ballTexture() })); ball.castShadow = true; this.scene.add(ball);
    this.ball = { m: ball, x: this.court.x + 1, y: y + 0.02 + BALL_R, z: this.court.z, vx: 0, vy: 0, vz: 0, spin: 0 };
    ball.position.set(this.ball.x, this.ball.y, this.ball.z);
    this.groundY = y + 0.02;
    // gente na praça por horário (aparecem só de perto)
    this.people(F, qx, px, pz, fx, fz);
  }
  people(F, qx, px, pz, fx, fz) {
    const S = this.seats, y = CURB, W = (lx, lz) => [F.x + lx, F.z + lz];
    const sitter = (i, name, lines, kind = 'ped') => ({ kind, x: S[i].x, z: S[i].z, heading: S[i].heading, y, chair: true, name, lines });
    const loop = { cx: F.x, cz: F.z, half: (BLOCK - SW * 2) / 2 - 1.2 };
    // manhã: aposentados nos bancos do chafariz e gente correndo
    this.city.crowds.push({ x: F.x, z: F.z, r: 70, hours: [6, 11], people: [
      sitter(0, 'Seu Orlando', ['Bom dia! Eu venho aqui todo dia dar milho para os pombos.', 'Westhaven mudou muito desde a ponte nova.']),
      sitter(1, 'Dona Cida', ['Que manhã bonita, não?', 'Meu neto joga basquete aqui à tarde.']),
      sitter(4, 'Aposentado', ['Lendo o jornal...', 'O Westhaven FC joga hoje às 13h.']),
      { kind: 'ped', x: W(0, -25)[0], z: W(0, -25)[1], heading: 0, y, behavior: 'loop', loop, name: 'Corredora', lines: ['(correndo) Bom dia!', 'Mais duas voltas...'] },
      { kind: 'ped', x: W(25, 0)[0], z: W(25, 0)[1], heading: 0, y, behavior: 'loop', loop, name: 'Corredor', lines: ['Ufa... não posso parar agora!'] },
    ] });
    // dia: crianças no parquinho com os pais nos bancos
    this.city.crowds.push({ x: F.x + px, z: F.z + pz, r: 60, hours: [9, 18], people: [
      { kind: 'kid', ...this.at(F, px - 1, pz - 2), behavior: 'patrol', name: 'Criança', lines: ['Moço, olha eu no balanço!', 'Pega-pega! Tá com você!'] },
      { kind: 'kid', ...this.at(F, px + 2, pz + 1), behavior: 'patrol', name: 'Criança', lines: ['Hehe! Escorrega!', 'Minha mãe tá ali no banco.'] },
      { kind: 'kid', ...this.at(F, px + 5, pz - 3.6), name: 'Criança', lines: ['Estou fazendo um castelo de areia.'] },
      { kind: 'kid', ...this.at(F, px - 3, pz + 4), behavior: 'patrol', name: 'Criança', lines: ['Você não me pega!'] },
      sitter(12, 'Mãe', ['Cuidado no escorregador, filho!', 'Esse parquinho é o melhor do bairro.']),
      sitter(14, 'Pai', ['Só mais dez minutos e a gente vai pra casa.']),
    ] });
    // fim de tarde e noite: jogadores na quadra, jovens nos bancos, casal no chafariz
    this.city.crowds.push({ x: F.x + qx, z: F.z, r: 60, hours: [16, 23], people: [
      { kind: 'ped', ...this.at(F, qx + CW / 2 + 0.8, -3, -Math.PI / 2), name: 'Jogador de basquete', lines: ['Quer jogar? A bola tá ali, pode arremessar.', 'Da linha de três vale 3 pontos.'] },
      { kind: 'ped', ...this.at(F, qx + CW / 2 + 0.8, 4, -Math.PI / 2), name: 'Jogador de basquete', lines: ['Arremesso bom é com arco alto.', 'Aqui é a melhor quadra de Westhaven.'] },
      { kind: 'ped', ...this.at(F, qx - CW / 2 - 2.6, 1, Math.PI / 2), name: 'Torcedor', lines: ['Vai, acerta essa!'] },
      sitter(8, 'Jovem', ['E aí, beleza?', 'Hoje tem jogo no estádio, você vai?']),
      sitter(9, 'Jovem', ['Esse sábado tem campeonato de rua aqui.']),
    ] });
    this.city.crowds.push({ x: F.x + fx, z: F.z + fz, r: 60, hours: [19, 24], people: [
      sitter(2, 'Namorada', ['A luz do chafariz à noite é linda.']), sitter(3, 'Namorado', ['A gente vem aqui toda sexta.']),
    ] });
  }
  at(F, lx, lz, heading = Math.random() * 6.28) { return { x: F.x + lx, z: F.z + lz, heading, y: CURB }; }

  near(P, d = 80) { return this.court && Math.hypot(P.x - this.court.x, P.z - this.court.z) < d; }
  handPos(P) { const h = P.heading, mov = Math.hypot(P.vx || 0, P.vz || 0) > 0.6; this.dribT = (this.dribT || 0) + (mov ? 0.13 : 0.05);
    const by = mov ? P.y + BALL_R + Math.abs(Math.sin(this.dribT * 2.6)) * 0.85 : P.y + 1.05; return [P.x + Math.sin(h) * 0.42 + Math.cos(h) * 0.18, by, P.z + Math.cos(h) * 0.42 - Math.sin(h) * 0.18]; }
  nearestHoop(x, z) { let best = null, bd = 1e9; for (const h of this.hoops) { const d = Math.hypot(h.x - x, h.z - z); if (d < bd) { bd = d; best = h; } } return [best, bd]; }

  update(dt, G) {
    const P = G.player, t = G.story ? G.story.t : performance.now() / 1000;
    if (!this.near(P, 120)) return;
    // animações: balanços, gangorra, água
    for (const a of this.anim) { if (a.see) a.o.rotation.z = Math.sin(t * 1.1) * a.amp; else a.o.rotation.z = Math.sin(t * 1.9 + a.ph) * a.amp; }
    if (this.water) { const k = 1 + Math.sin(t * 7) * 0.05; this.water.jet.scale.set(k, 1 + Math.sin(t * 5.3) * 0.08, k); this.water.fall.rotation.y += dt * 0.6; }
    for (const h of this.hoops) { if (h.wob > 0) { h.wob = Math.max(0, h.wob - dt); h.net.scale.set(1 - h.wob * 0.25, 1 + h.wob * 0.6, 1 - h.wob * 0.25); } }
    // sentado no banco
    if (this.seat) { const s = this.seat; P.place(s.x, s.z, s.heading); P.y = s.y; P.pose = 'chair'; P.vx = P.vz = 0; }
    const b = this.ball;
    if (this.held) {
      if (P.mode !== 'foot' || this.seat) { this.held = false; }
      else { const [hx, hy, hz] = this.handPos(P); b.x = hx; b.y = hy; b.z = hz; b.vx = b.vy = b.vz = 0; b.m.position.set(hx, hy, hz); b.m.rotation.x += dt * 6; return; }
    }
    // física da bola em subpassos
    const n = 4, h = dt / n, gy = this.groundY + BALL_R;
    for (let i = 0; i < n; i++) {
      const py = b.y;
      b.vy -= G_ACC * h; b.x += b.vx * h; b.y += b.vy * h; b.z += b.vz * h;
      for (const H of this.hoops) {
        // tabela (plano em z = bz, voltada para a quadra)
        const s = H.s, front = H.bz - s * BALL_R;
        if (Math.abs(b.x - H.x) < 0.9 + BALL_R && b.y > H.y - 0.15 - BALL_R && b.y < H.y + 0.9 + BALL_R && (b.z - front) * s > 0 && (b.z - H.bz) * s < 0.15 && b.vz * s > 0) { b.z = front; b.vz *= -0.62; b.vx *= 0.9; this.bounceSnd(G, b.vz); }
        // aro: toro horizontal de raio RIM_R
        const dx = b.x - H.x, dz = b.z - H.z, hl = Math.hypot(dx, dz) || 1e-6;
        const qx = H.x + dx / hl * RIM_R, qz = H.z + dz / hl * RIM_R; const ex = b.x - qx, ey = b.y - H.y, ez = b.z - qz, ed = Math.hypot(ex, ey, ez);
        if (ed < BALL_R + RIM_T && ed > 1e-6) { const nx = ex / ed, ny = ey / ed, nz = ez / ed; b.x = qx + nx * (BALL_R + RIM_T); b.y = H.y + ny * (BALL_R + RIM_T); b.z = qz + nz * (BALL_R + RIM_T); const vn = b.vx * nx + b.vy * ny + b.vz * nz; if (vn < 0) { b.vx -= 1.55 * vn * nx; b.vy -= 1.55 * vn * ny; b.vz -= 1.55 * vn * nz; b.vx *= 0.9; b.vz *= 0.9; this.rimHit = true; if (-vn > 1) G.sound && G.sound('click'); } }
        // cesta: atravessou a altura do aro de cima para baixo por dentro
        if (py > H.y && b.y <= H.y && b.vy < 0 && Math.hypot(b.x - H.x, b.z - H.z) < RIM_R - BALL_R * 0.35) this.basket(G, H);
        // poste
        const pdx = b.x - H.x, pdz = b.z - H.pz, pd = Math.hypot(pdx, pdz); if (pd < BALL_R + 0.12 && b.y < H.y + 0.5) { b.x = H.x + pdx / pd * (BALL_R + 0.12); b.z = H.pz + pdz / pd * (BALL_R + 0.12); const vn = (b.vx * pdx + b.vz * pdz) / pd; if (vn < 0) { b.vx -= 1.6 * vn * pdx / pd; b.vz -= 1.6 * vn * pdz / pd; } }
      }
      // chão (dentro da quadra) ou terreno
      const gnd = Math.hypot(b.x - this.court.x, b.z - this.court.z) < 30 ? gy : (G.world.groundFn ? G.world.groundFn(b.x, b.z) : CURB) + BALL_R;
      if (b.y < gnd) { b.y = gnd; if (b.vy < -0.8) { b.vy = -b.vy * 0.74; this.bounceSnd(G, b.vy); } else b.vy = 0; b.vx *= 0.985; b.vz *= 0.985; }
      if (b.y <= gnd + 0.001) { const f = Math.max(0, 1 - h * 0.9); b.vx *= f; b.vz *= f; }
      // alambrado da quadra
      const lx = b.x - this.court.x, lz = b.z - this.court.z;
      if (Math.abs(lz) > CL / 2 + 1.5 && Math.abs(lz) < CL / 2 + 1.75 && Math.abs(lx) < CW / 2 + 1.6 && b.y < this.groundY + 1.1) { b.vz *= -0.5; b.z = this.court.z + Math.sign(lz) * (CL / 2 + (Math.abs(lz) < CL / 2 + 1.6 ? 1.45 : 1.8)); }
    }
    // jogada terminou (bola parada no chão): conta arremesso perdido
    if (this.shot && b.y <= gy + 0.01 && Math.hypot(b.vx, b.vz) < 3 && t - this.shot.t > 1.2) { if (!this.shot.done) { this.tries++; G.toast && G.toast(this.rimHit ? 'Bateu no aro e não entrou!' : 'Errou!', 1.6); } this.shot = null; }
    // longe demais ou caiu no mundo: volta para o meio da quadra
    if (Math.hypot(b.x - this.court.x, b.z - this.court.z) > 70 || b.y < -5) { b.x = this.court.x + 1; b.z = this.court.z; b.y = gy + 0.5; b.vx = b.vy = b.vz = 0; }
    b.m.position.set(b.x, b.y, b.z); const sp = Math.hypot(b.vx, b.vz); if (sp > 0.01) { b.m.rotation.x += b.vz / BALL_R * dt * 0.5; b.m.rotation.z -= b.vx / BALL_R * dt * 0.5; }
  }
  bounceSnd(G, v) { if (Math.abs(v) > 1.2 && G.sound) G.sound('bounce'); }
  basket(G, H) {
    if (!this.shot || this.shot.done) { H.wob = 0.6; return; }
    this.shot.done = true; this.tries++; this.made++; const pts = this.shot.three ? 3 : 2; this.points += pts; H.wob = 0.6;
    G.sound && G.sound('swish'); G.toast && G.toast(`${this.rimHit ? 'CESTA!' : 'CESTA LIMPA!'} +${pts} ${pts === 3 ? '(de três!)' : ''} — ${this.points} pontos · ${this.made}/${this.tries} arremessos`, 2.6);
  }
  shoot(G) {
    const P = G.player, b = this.ball; const [H, d0] = this.nearestHoop(P.x, P.z);
    const [hx, , hz] = this.handPos(P); const sy = P.y + 2.05; // soltura acima da cabeça
    // mira no centro do aro, um pouco para trás (lado da tabela)
    const tx = H.x, tz = H.z + H.s * 0.04, ty = H.y;
    const dx = tx - hx, dz = tz - hz, d = Math.hypot(dx, dz), dh = ty - sy;
    // arco: pico acima do aro (mais alto em arremessos longos); resolve subida + descida até o aro
    const apex = Math.max(0.2, dh) + 0.85 + 0.09 * d;
    const vy0 = Math.sqrt(2 * G_ACC * apex), tUp = vy0 / G_ACC, tDn = Math.sqrt(2 * (apex - dh) / G_ACC), vh0 = d / (tUp + tDn);
    // erro humano: cresce com a distância e se estiver correndo
    const run = Math.hypot(P.vx || 0, P.vz || 0) > 2.5 ? 1.8 : 1, sk = this.noise ?? 1;
    const sigV = (0.006 + 0.0012 * d) * run * sk, sigA = (0.01 + 0.001 * d) * run * sk;
    const kv = 1 + gauss() * sigV, yaw = Math.atan2(dx, dz) + gauss() * sigA, kh = 1 + gauss() * sigV * 0.6;
    b.x = hx; b.y = sy; b.z = hz; b.vx = Math.sin(yaw) * vh0 * kv * kh; b.vz = Math.cos(yaw) * vh0 * kv * kh; b.vy = vy0 * kv;
    this.held = false; this.rimHit = false; this.shot = { t: G.story ? G.story.t : performance.now() / 1000, three: d0 > THREE_PT + 0.05, done: false };
    P.heading = Math.atan2(dx, dz); if (P.model && P.model.throwIn) P.model.throwIn();
  }
  // texto do aviso (e ação ao apertar E). Retorna null se nada da praça estiver perto
  prompt(free, G) {
    const P = G.player; if (!this.near(P, 60)) return null;
    if (this.seat) { if (free && G.consumeInteract()) { const s = this.seat; this.seat = null; P.pose = null; P.place(s.x + Math.sin(s.heading) * 0.6, s.z + Math.cos(s.heading) * 0.6, s.heading); } return '[E] Levantar'; }
    if (P.mode !== 'foot') return null;
    if (this.held) {
      const [H, d] = this.nearestHoop(P.x, P.z);
      if (d > 11) { if (free && G.consumeInteract()) { this.held = false; this.ball.vy = 1; } return '[E] Soltar a bola (chegue perto da cesta para arremessar)'; }
      if (free && G.consumeInteract()) this.shoot(G);
      return `[E] Arremessar — ${d > THREE_PT + 0.05 ? '3 pontos' : '2 pontos'} (${d.toFixed(1)} m da cesta)`;
    }
    const b = this.ball; if (Math.hypot(b.x - P.x, b.z - P.z) < 1.3 && b.y < P.y + 1.4 && Math.hypot(b.vx, b.vy, b.vz) < 4) { if (free && G.consumeInteract()) { this.held = true; this.shot = null; } return '[E] Pegar a bola de basquete'; }
    let best = null, bd = 0.9; for (const s of this.seats) { const d = Math.hypot(s.x - P.x, s.z - P.z); if (d < bd) { bd = d; best = s; } }
    if (best) { if (free && G.consumeInteract()) this.seat = best; return '[E] Sentar no banco'; }
    return null;
  }
}
