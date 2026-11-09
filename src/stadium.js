// ESTÁDIO DE WESTHAVEN (casa do Westhaven FC): construção explorável.
// Gramado com textura própria (faixas de corte, tons variados, desgaste), marcação oficial em peças separadas,
// arquibancadas em degraus que dá para subir, assentos, cobertura, túneis para os setores, saguão com bilheteria,
// catracas, sala de troféus com troféus 3D em vitrines, túnel dos jogadores com vestiário, refletores e telão.
import * as THREE from 'three';
import { box, plane, cyl, mat } from './geo.js';
import { Frame, CURB } from './city.js';
import { mats, signMat, paint, homeMat } from './materials.js';
import { whRoad, whRoadZ } from './places.js';

export const ST = { x: (whRoad(6) + whRoad(8)) / 2, z: (whRoadZ(1) + whRoadZ(3)) / 2, FL: 90, FW: 58, ROWS: 18, RISE: 0.38, TREAD: 0.85 };
ST.side0 = ST.FW / 2 + 5; ST.end0 = ST.FL / 2 + 5; // primeira fileira (lados / fundos)
ST.depth = ST.ROWS * ST.TREAD;
ST.wallX = 68; ST.wallZ = 66;
// troféus do clube (objetos 3D na sala de troféus; ficam registrados aqui)
export const TROPHIES = [
  { name: 'Campeonato Estadual', year: 2029, club: 'Westhaven FC', shape: 'cup', color: 0xd8b040 },
  { name: 'Copa da Baía', year: 2031, club: 'Westhaven FC', shape: 'tall', color: 0xc8ccd2 },
  { name: 'Supercopa do Oeste', year: 2026, club: 'Westhaven FC', shape: 'plate', color: 0xd8b040 },
  { name: 'Campeonato Estadual', year: 2032, club: 'Westhaven FC', shape: 'cup', color: 0xd8b040 },
  { name: 'Copa Regional', year: 2024, club: 'Westhaven FC', shape: 'ball', color: 0xc8ccd2 },
  { name: 'Taça Westhaven (base)', year: 2033, club: 'Westhaven FC — Sub-20', shape: 'star', color: 0xd8b040 },
];

// textura do gramado: faixas de corte em xadrez suave, lâminas de grama, variação e desgaste nas áreas
function pitchTexture() {
  const W = 2048, H = 1366, c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
  const sx = W / (ST.FL + 10), sz = H / (ST.FW + 10); // px por metro
  g.fillStyle = '#3f7d2c'; g.fillRect(0, 0, W, H);
  const stripes = 18; // faixas ao longo do comprimento
  for (let i = 0; i < stripes; i++) { g.fillStyle = i % 2 ? 'rgba(255,255,255,0.055)' : 'rgba(0,0,0,0.05)'; g.fillRect(i * W / stripes, 0, W / stripes + 1, H); }
  for (let i = 0; i < 10; i++) { g.fillStyle = i % 2 ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'; g.fillRect(0, i * H / 10, W, H / 10 + 1); }
  // manchas de tom
  for (let i = 0; i < 260; i++) { const x = Math.random() * W, y = Math.random() * H, r = 20 + Math.random() * 90; const gr = g.createRadialGradient(x, y, 0, x, y, r); const k = Math.random() < 0.5; gr.addColorStop(0, k ? 'rgba(90,140,40,0.10)' : 'rgba(30,70,25,0.10)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2); }
  // lâminas
  for (let i = 0; i < 90000; i++) { const x = Math.random() * W, y = Math.random() * H; const v = Math.random(); g.fillStyle = v < 0.5 ? `rgba(${30 + v * 40 | 0},${80 + v * 60 | 0},${25 + v * 20 | 0},0.5)` : `rgba(${110 + v * 40 | 0},${150 + v * 40 | 0},${70 + v * 20 | 0},0.35)`; g.fillRect(x, y, 1, 2 + Math.random() * 3); }
  // desgaste: pequena área do goleiro e círculo central
  const wear = (mx, mz, r) => { const x = (mx + ST.FL / 2 + 5) * sx, y = (mz + ST.FW / 2 + 5) * sz; const gr = g.createRadialGradient(x, y, 0, x, y, r * sx); gr.addColorStop(0, 'rgba(120,95,55,0.35)'); gr.addColorStop(1, 'rgba(120,95,55,0)'); g.fillStyle = gr; g.fillRect(x - r * sx, y - r * sx, r * sx * 2, r * sx * 2); };
  wear(-ST.FL / 2 + 2.5, 0, 4); wear(ST.FL / 2 - 2.5, 0, 4); wear(-ST.FL / 2 + 11, 0, 2); wear(ST.FL / 2 - 11, 0, 2); wear(0, 0, 3);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; t.generateMipmaps = true; t.minFilter = THREE.LinearMipmapLinearFilter;
  return t;
}
// fileira de assentos: textura com cadeiras individuais (repetida ao longo da fileira)
function seatTexture(color) {
  const c = document.createElement('canvas'); c.width = 64; c.height = 32; const g = c.getContext('2d');
  g.fillStyle = '#2a2a2e'; g.fillRect(0, 0, 64, 32);
  const col = '#' + new THREE.Color(color).getHexString(); g.fillStyle = col; g.fillRect(4, 3, 56, 26);
  g.fillStyle = 'rgba(255,255,255,0.18)'; g.fillRect(4, 3, 56, 5); g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(4, 24, 56, 5);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = THREE.RepeatWrapping; return t;
}
function netTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d'); g.clearRect(0, 0, 128, 128);
  g.strokeStyle = 'rgba(255,255,255,0.85)'; g.lineWidth = 2; for (let i = 0; i <= 128; i += 16) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, 128); g.stroke(); g.beginPath(); g.moveTo(0, i); g.lineTo(128, i); g.stroke(); }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
}
// troféu 3D por torno (LatheGeometry) conforme o formato
function trophyGeo(shape) {
  const P = (pts) => new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), 28);
  const parts = [];
  if (shape === 'cup') { parts.push(P([[0.16, 0], [0.16, 0.06], [0.07, 0.08], [0.05, 0.22], [0.04, 0.3], [0.09, 0.34], [0.2, 0.45], [0.24, 0.6], [0.23, 0.62], [0.2, 0.62], [0.17, 0.48], [0.0, 0.36]]));
    for (const s of [-1, 1]) parts.push(new THREE.TorusGeometry(0.09, 0.015, 8, 16, Math.PI).rotateZ(s > 0 ? -Math.PI / 2 : Math.PI / 2).translate(s * 0.24, 0.5, 0)); }
  else if (shape === 'tall') parts.push(P([[0.13, 0], [0.13, 0.05], [0.05, 0.08], [0.04, 0.4], [0.1, 0.48], [0.14, 0.62], [0.12, 0.8], [0.06, 0.86], [0.07, 0.9], [0.0, 0.92]]));
  else if (shape === 'plate') { parts.push(P([[0.1, 0], [0.1, 0.05], [0.03, 0.07], [0.03, 0.18], [0.0, 0.18]])); parts.push(new THREE.CylinderGeometry(0.28, 0.28, 0.03, 32).rotateX(Math.PI / 2).translate(0, 0.42, 0)); parts.push(new THREE.TorusGeometry(0.27, 0.015, 6, 32).translate(0, 0.42, 0.016)); }
  else if (shape === 'ball') { parts.push(P([[0.14, 0], [0.14, 0.06], [0.05, 0.09], [0.04, 0.3], [0.0, 0.3]])); parts.push(new THREE.SphereGeometry(0.15, 20, 14).translate(0, 0.44, 0)); for (const s of [-1, 1]) parts.push(new THREE.TorusGeometry(0.12, 0.012, 6, 14, Math.PI).rotateZ(s * Math.PI / 2).translate(0, 0.4, 0)); }
  else { parts.push(P([[0.13, 0], [0.13, 0.05], [0.04, 0.08], [0.03, 0.35], [0.0, 0.35]])); const st = new THREE.Shape(); for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2 - Math.PI / 2, r = i % 2 ? 0.09 : 0.2; i ? st.lineTo(Math.cos(a) * r, -Math.sin(a) * r) : st.moveTo(Math.cos(a) * r, -Math.sin(a) * r); }
    parts.push(new THREE.ExtrudeGeometry(st, { depth: 0.04, bevelEnabled: true, bevelSize: 0.01, bevelThickness: 0.01 }).translate(0, 0.55, -0.02)); }
  return parts;
}

export class Stadium {
  constructor(scene, world, city) { this.scene = scene; this.world = world; this.city = city; this.M = mats(); this.seatRows = []; this.turnstiles = []; this.trophySpots = []; this.spots = {}; }
  build(B) {
    const M = this.M, y = CURB; const f = new Frame(ST.x, ST.z, 0, B, this.world); this.f = f;
    const white = paint(M.flat, 0xf4f4f4), blue = paint(M.flat, 0x1a4aa8), conc = M.concrete, dark = M.metalDark;
    // piso de concreto da área toda e gramado
    { const iw = ST.FL + 16, id = ST.FW + 16; // concreto só em volta do gramado/pista (sem sobrepor o campo)
      for (const s of [-1, 1]) { f.add(plane(140, (140 - id) / 2, 6), M.concreteFlat, 0, y + 0.004, s * (id / 2 + (140 - id) / 4)); f.add(plane((140 - iw) / 2, id, 6), M.concreteFlat, s * (iw / 2 + (140 - iw) / 4), y + 0.004, 0); } }
    const pitchM = new THREE.MeshLambertMaterial({ map: pitchTexture() }); pitchM.userData.castShadow = false;
    f.add(plane(ST.FL + 10, ST.FW + 10, ST.FL + 10, ST.FW + 10), pitchM, 0, y + 0.01, 0);
    // pista em volta do gramado (tartan) e placas de publicidade
    const track = paint(M.flat, 0x8a3a2a);
    for (const s of [-1, 1]) { f.add(plane(ST.FL + 10, 3, 4), track, 0, y + 0.009, s * (ST.FW / 2 + 6.5)); f.add(plane(3, ST.FW + 16, 4), track, s * (ST.FL / 2 + 6.5), y + 0.009, 0); }
    const ads = ['WESTHAVEN FC', 'BANCO POPULAR', 'MERCADO WESTHAVEN', 'PONTE TV', 'LOS VALLES CUSTOM', 'FARMÁCIA CENTRAL', 'CAFÉ WESTHAVEN', 'RÁDIO BAÍA FM'];
    let ai = 0;
    for (const s of [-1, 1]) for (let x = -ST.FL / 2 + 2; x < ST.FL / 2 - 4; x += 8) { if (Math.abs(x) < 6 && s > 0) continue; f.box(signMat(ads[ai++ % ads.length], { bg: pick2(ai), fg: '#ffffff', glow: true, w: 512, h: 96 }), x + 3.8, y, s * (ST.FW / 2 + 4.2), 7.6, 0.9, 0.12, true, 7.6, 0.9); }
    for (const s of [-1, 1]) for (const z of [-20, -10, 10, 20]) f.box(signMat(ads[ai++ % ads.length], { bg: pick2(ai), fg: '#ffffff', glow: true, w: 512, h: 96 }), s * (ST.FL / 2 + 4.2), y, z, 0.12, 0.9, 9.6, true, 0.9, 9.6);
    this.lines(f, y); this.goals(f, y);
    // arquibancadas: lados (norte/sul) e fundos (leste/oeste), com túneis
    const homeSeat = new THREE.MeshLambertMaterial({ map: seatTexture(0x1a4aa8) }), whiteSeat = new THREE.MeshLambertMaterial({ map: seatTexture(0xe8e8e8) }), awaySeat = new THREE.MeshLambertMaterial({ map: seatTexture(0xb01a1a) });
    for (const m of [homeSeat, whiteSeat, awaySeat]) m.userData.castShadow = false;
    const tunnels = { n: [-30, 0, 30], s: [-30, 0, 30], e: [0], w: [0] };
    for (const side of ['n', 's', 'e', 'w']) this.stand(f, side, tunnels[side], side === 'e' ? awaySeat : null, homeSeat, whiteSeat);
    // cobertura sobre os lados (balanço com treliças)
    const roofM = paint(M.flat, 0xe8eaee);
    for (const s of [-1, 1]) {
      const zb = s * (ST.side0 + ST.depth + 0.5), zf = s * (ST.FW / 2 + 1);
      const len = ST.FL + 14, d = Math.abs(zb - zf), ang = Math.atan2(1.2, d);
      f.add(new THREE.BoxGeometry(len, 0.35, d + 1).rotateX(s * ang), roofM, 0, y + 16.4, (zb + zf) / 2);
      for (let x = -len / 2 + 4; x <= len / 2 - 4; x += 12) {
        f.box(white, x, y, zb + s * 0.8, 0.6, 17.2, 0.6, true);
        f.add(new THREE.BoxGeometry(0.25, 0.25, d).rotateX(s * (ang - 0.06)), dark, x, y + 15.9, (zb + zf) / 2);
      }
    }
    // fachada externa: muro com aletas, faixa azul, letreiro e portão principal (norte)
    const facade = paint(M.flat, 0xe6e6e8), WX = ST.wallX, WZ = ST.wallZ, H = 18;
    const gateW = 8;
    for (const s of [-1, 1]) {
      f.box(facade, s * WX, y, 0, 0.6, H, WZ * 2, true, 4);
      if (s > 0) f.box(facade, 0, y, WZ, WX * 2, H, 0.6, true, 4);
      else { const seg = WX - gateW / 2; f.box(facade, -WX + seg / 2, y, -WZ, seg, H, 0.6, true, 4); f.box(facade, WX - seg / 2, y, -WZ, seg, H, 0.6, true, 4); f.box(facade, 0, y + 6, -WZ, gateW, H - 6, 0.6, false, 4); }
    }
    for (let x = -WX + 4; x < WX; x += 6) for (const s of [-1, 1]) { if (s < 0 && Math.abs(x) < gateW / 2 + 1) continue; f.box(blue, x, y, s * (WZ + 0.45), 0.9, H - 2, 0.4, false); }
    for (let z = -WZ + 4; z < WZ; z += 6) for (const s of [-1, 1]) f.box(blue, s * (WX + 0.45), y, z, 0.4, H - 2, 0.9, false);
    for (const s of [-1, 1]) { f.box(blue, 0, y + H - 3, s * (WZ + 0.35), WX * 2 + 1, 1.2, 0.3, false); f.box(blue, s * (WX + 0.35), y + H - 3, 0, 0.3, 1.2, WZ * 2 + 1, false); }
    f.box(signMat('ESTÁDIO WESTHAVEN', { bg: '#0e2a6a', fg: '#ffffff', glow: true, w: 1024, h: 128 }), 0, y + H - 8.5, -WZ - 0.7, 34, 3.6, 0.2, false, 34, 3.6);
    f.box(signMat('WESTHAVEN FC', { bg: '#ffffff', fg: '#0e2a6a', glow: true, w: 512, h: 128 }), 0, y + 7, -WZ - 0.7, 10, 2.2, 0.2, false, 10, 2.2);
    f.box(signMat('ESTÁDIO WESTHAVEN', { bg: '#0e2a6a', fg: '#ffffff', glow: true, w: 1024, h: 128 }), WX + 0.7, y + H - 8.5, 0, 0.2, 3.6, 34, false, 34, 3.6);
    // escudo do clube sobre o portão
    f.add(new THREE.CylinderGeometry(2.2, 2.2, 0.3, 6).rotateX(Math.PI / 2), blue, 0, y + 12.3, -WZ - 0.75); f.add(new THREE.CylinderGeometry(1.7, 1.7, 0.32, 6).rotateX(Math.PI / 2), white, 0, y + 12.3, -WZ - 0.78);
    f.add(new THREE.TorusGeometry(0.9, 0.18, 6, 24).rotateX(Math.PI / 2).rotateX(Math.PI / 2), blue, 0, y + 12.3, -WZ - 0.95);
    // marquise e postes de luz da entrada, bilheterias do lado de fora e área externa
    f.box(white, 0, y + 5, -WZ - 3, gateW + 6, 0.35, 6, false); for (const s of [-1, 1]) f.box(dark, s * (gateW / 2 + 2.6), y, -WZ - 5.5, 0.3, 5, 0.3, true);
    // refletores nos cantos
    for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      const lx = sx * (ST.FL / 2 + 13), lz = sz * (ST.FW / 2 + 12);
      f.add(cyl(0.45, 0.8, 38, 8), paint(M.flat, 0x9aa0a8), lx, y + 19, lz);
      f.add(new THREE.BoxGeometry(6, 3.5, 0.5).rotateY(Math.atan2(-lx, -lz)), dark, lx, y + 38.5, lz);
      f.add(new THREE.BoxGeometry(5.4, 3, 0.1).rotateY(Math.atan2(-lx, -lz)).translate(-Math.sin(Math.atan2(-lx, -lz)) * -0.3, 0, -Math.cos(Math.atan2(-lx, -lz)) * -0.3), M.lamp, lx, y + 38.5, lz);
      const [wx, wz] = f.pt(lx * 0.92, lz * 0.92); this.city.lamps.push([wx, y + 36, wz]);
      this.world.addCentered(...[f.pt(lx, lz)].map(([a, b]) => [a, 0, b]).flat(), 1.6, 40, 1.6);
    }
    // telão no fundo leste (textura atualizada pela partida)
    const sc = document.createElement('canvas'); sc.width = 1024; sc.height = 384; this.scoreCanvas = sc; this.scoreTex = new THREE.CanvasTexture(sc); this.scoreTex.colorSpace = THREE.SRGBColorSpace;
    const scoreM = new THREE.MeshBasicMaterial({ map: this.scoreTex }); this.drawScore('WESTHAVEN FC', '—', 0, 0, 'ESTÁDIO WESTHAVEN', '');
    const scr = new THREE.Mesh(new THREE.PlaneGeometry(16, 6), scoreM); const [sx2, sz2] = f.pt(ST.end0 + ST.depth - 1, 0); scr.position.set(sx2 - 0.4, y + 13.5, sz2); scr.rotation.y = -Math.PI / 2; this.scene.add(scr); this.screen = scr;
    f.box(dark, ST.end0 + ST.depth - 0.6, y + 10, 0, 0.6, 7, 17, false); f.box(dark, ST.end0 + ST.depth - 0.4, y, 0, 0.8, 10, 1, true);
    // bancos de reservas (sul, perto do meio)
    for (const s of [-1, 1]) { f.box(paint(M.flat, 0x1a1a1a), s * 9, y, ST.FW / 2 + 3.2, 7, 0.45, 0.6, true, 1); f.add(new THREE.BoxGeometry(7.4, 2.1, 1.4), new THREE.MeshPhongMaterial({ color: 0x9ab8c8, transparent: true, opacity: 0.35, depthWrite: false }), f.pt(0, 0)[0] - ST.x + s * 9, y + 1.05, ST.FW / 2 + 3.4); }
    this.lobby(f, y); this.lockerRoom(f, y);
    // marcos
    const [lx, lz] = f.pt(0, -WZ - 8); this.city.landmarks.push({ name: 'Estádio de Westhaven', x: lx, z: lz, kind: 'stadium' });
    this.spots.gate = [lx, lz]; this.spots.center = [ST.x, ST.z];
  }
  drawScore(home, away, gh, ga, top, clock) {
    const g = this.scoreCanvas.getContext('2d'); const W = 1024, H = 384;
    g.fillStyle = '#05070c'; g.fillRect(0, 0, W, H); g.fillStyle = '#0e2a6a'; g.fillRect(0, 0, W, 70);
    g.fillStyle = '#ffffff'; g.font = 'bold 44px Arial'; g.textAlign = 'center'; g.fillText(top, W / 2, 50);
    g.font = 'bold 54px Arial'; g.fillStyle = '#e8eef8'; g.fillText(home, W * 0.27, 170); g.fillText(away, W * 0.73, 170);
    g.font = 'bold 130px Arial'; g.fillStyle = '#ffd040'; g.fillText(`${gh}  x  ${ga}`, W / 2, 300);
    g.font = 'bold 50px Arial'; g.fillStyle = '#7fe08a'; g.fillText(clock, W / 2, 365);
    if (this.scoreTex) this.scoreTex.needsUpdate = true;
  }
  // marcação oficial do campo (linhas de 12 cm em peças separadas = nítidas de perto e de longe)
  lines(f, y) {
    const L = paint(this.M.flat, 0xf6f6f2), hy = y + 0.018, w = 0.12, FL = ST.FL, FW = ST.FW;
    const seg = (x0, z0, x1, z1) => { const len = Math.hypot(x1 - x0, z1 - z0); f.add(plane(len + w, w, 1).rotateY(-Math.atan2(z1 - z0, x1 - x0)), L, (x0 + x1) / 2, hy, (z0 + z1) / 2); };
    const ring = (cx, cz, r, a0 = 0, a1 = Math.PI * 2) => f.add(new THREE.RingGeometry(r - w / 2, r + w / 2, 64, 1, a0, a1 - a0).rotateX(-Math.PI / 2), L, cx, hy, cz);
    seg(-FL / 2, -FW / 2, FL / 2, -FW / 2); seg(-FL / 2, FW / 2, FL / 2, FW / 2); seg(-FL / 2, -FW / 2, -FL / 2, FW / 2); seg(FL / 2, -FW / 2, FL / 2, FW / 2); seg(0, -FW / 2, 0, FW / 2);
    ring(0, 0, 9.15); f.add(new THREE.CircleGeometry(0.15, 16).rotateX(-Math.PI / 2), L, 0, hy, 0);
    for (const s of [-1, 1]) {
      const gx = s * FL / 2;
      seg(gx, -20.16, gx - s * 16.5, -20.16); seg(gx, 20.16, gx - s * 16.5, 20.16); seg(gx - s * 16.5, -20.16, gx - s * 16.5, 20.16);
      seg(gx, -9.16, gx - s * 5.5, -9.16); seg(gx, 9.16, gx - s * 5.5, 9.16); seg(gx - s * 5.5, -9.16, gx - s * 5.5, 9.16);
      f.add(new THREE.CircleGeometry(0.15, 16).rotateX(-Math.PI / 2), L, gx - s * 11, hy, 0);
      const a = Math.acos(5.5 / 9.15); // meia-lua da grande área
      if (s > 0) ring(gx - 11, 0, 9.15, Math.PI - a, Math.PI + a); else ring(gx + 11, 0, 9.15, -a, a);
      for (const t of [-1, 1]) { const cz = t * FW / 2; const base = Math.atan2(t, -s); ring(gx, cz, 1, base - Math.PI / 4, base + Math.PI / 4); // arco de escanteio (para dentro do campo)
        f.add(cyl(0.02, 0.02, 1.5, 6), paint(this.M.flat, 0xe8e8e8), gx, y + 0.75, cz); f.add(new THREE.PlaneGeometry(0.4, 0.3).translate(0.2, 0, 0), new THREE.MeshLambertMaterial({ color: 0xff9a1a, side: THREE.DoubleSide }), gx, y + 1.35, cz); }
    }
  }
  goals(f, y) {
    const W = 7.32, H = 2.44, D = 2.2; const post = paint(this.M.flat, 0xffffff);
    const net = new THREE.MeshBasicMaterial({ map: netTexture(), transparent: true, side: THREE.DoubleSide, depthWrite: false, alphaTest: 0.05 }); net.userData.castShadow = false;
    for (const s of [-1, 1]) {
      const gx = s * ST.FL / 2;
      for (const t of [-1, 1]) { f.add(cyl(0.06, 0.06, H, 10), post, gx, y + H / 2, t * W / 2); this.world.addCentered(...f.pt(gx, t * W / 2).flatMap((v, i) => (i ? [v] : [v, 0])), 0.14, H, 0.14); }
      f.add(new THREE.CylinderGeometry(0.06, 0.06, W + 0.12, 10).rotateX(Math.PI / 2), post, gx, y + H, 0);
      const n1 = new THREE.PlaneGeometry(W, H); n1.attributes.uv.array.forEach((v, i, a) => { a[i] = v * (i % 2 ? 6 : 18); });
      f.add(n1.rotateY(Math.PI / 2), net, gx + s * D, y + H / 2 - 0.1, 0);
      const n2 = new THREE.PlaneGeometry(D, W); n2.attributes.uv.array.forEach((v, i, a) => { a[i] = v * (i % 2 ? 18 : 6); });
      f.add(n2.rotateX(-Math.PI / 2), net, gx + s * D / 2, y + H, 0);
      for (const t of [-1, 1]) { const n3 = new THREE.PlaneGeometry(D, H); n3.attributes.uv.array.forEach((v, i, a) => { a[i] = v * 6; }); f.add(n3, net, gx + s * D / 2, y + H / 2, t * W / 2); }
      for (const t of [-1, 1]) f.add(new THREE.CylinderGeometry(0.03, 0.03, D, 6).rotateZ(Math.PI / 2), post, gx + s * D / 2, y + 0.03, t * W / 2);
    }
  }
  // um lado da arquibancada: fileiras em degraus (sólidas, dá para subir), assentos e túneis para os setores
  stand(f, side, tunnelsAt, seatOverride, homeSeat, whiteSeat) {
    const M = this.M, y = CURB; const isSide = side === 'n' || side === 's';
    const sgn = side === 'n' || side === 'w' ? -1 : 1;
    const len = isSide ? ST.FL + 10 : ST.FW + 10, r0 = isSide ? ST.side0 : ST.end0;
    const conc = paint(M.flat, 0xb8b8b4), conc2 = paint(M.flat, 0xa4a4a0);
    const tw = 3.4; const segs = []; let a = -len / 2;
    for (const t of tunnelsAt.slice().sort((p, q) => p - q)) { segs.push([a, t - tw / 2, false]); segs.push([t - tw / 2, t + tw / 2, true]); a = t + tw / 2; }
    segs.push([a, len / 2, false]);
    const P = (u, d) => (isSide ? [u, sgn * d] : [sgn * d, u]); // u = ao longo da arquibancada, d = distância do centro
    for (let r = 0; r < ST.ROWS; r++) {
      const d = r0 + r * ST.TREAD + ST.TREAD / 2, top = y + (r + 1) * ST.RISE;
      const seatM = seatOverride || (r % 6 < 3 ? homeSeat : whiteSeat);
      for (const [u0, u1, tun] of segs) {
        const L = u1 - u0; if (L < 0.2) continue; const uc = (u0 + u1) / 2; const [cx, cz] = P(uc, d);
        const w = isSide ? L : ST.TREAD, dd = isSide ? ST.TREAD : L;
        if (tun) { if (top - y > 3.0) f.box(r % 2 ? conc : conc2, cx, y + 2.9, cz, w, top - y - 2.9, dd, true, 2); continue; }
        f.box(r % 2 ? conc : conc2, cx, y, cz, w, top - y, dd, true, 2);
        // assento: bloco com textura de cadeiras + encosto
        const [sx, sz] = P(uc, d + sgn * 0 + 0.12);
        const sg = new THREE.BoxGeometry(isSide ? L : 0.42, 0.4, isSide ? 0.42 : L); const uv = sg.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setX(i, uv.getX(i) * L / 0.55);
        f.add(sg, seatM, sx, top + 0.2, sz);
        const [bx, bz] = P(uc, d + 0.36);
        const bg = new THREE.BoxGeometry(isSide ? L : 0.06, 0.42, isSide ? 0.06 : L); const uv2 = bg.attributes.uv; for (let i = 0; i < uv2.count; i++) uv2.setX(i, uv2.getX(i) * L / 0.55);
        f.add(bg, seatM, bx, top + 0.6, bz);
        this.seatRows.push({ side, isSide, sgn, r, u0, u1, d: d + 0.05, top, world: (u) => f.pt(...P(u, d + 0.05)) });
      }
    }
    // parede de trás (fechamento até 9 m) com acabamento
    const dBack = r0 + ST.depth + 0.25; const [bx, bz] = P(0, dBack);
    f.box(paint(M.flat, 0xd8d8d6), bx, y, bz, isSide ? len : 0.5, 9.5, isSide ? 0.5 : len, true, 2);
    for (const t of tunnelsAt) { const [tx, tz] = P(t, dBack); f.box(paint(M.flat, 0x0e2a6a), tx, y + 3, tz + (isSide ? sgn * 0.3 : 0), isSide ? tw + 0.6 : 0.1, 0.5, isSide ? 0.1 : tw + 0.6, false); }
    // corrimão na frente e placa do setor
    const [fx, fz] = P(0, r0 - 0.05); f.box(paint(M.flat, 0x2a2a2e), fx, y, fz, isSide ? len : 0.08, 1.0, isSide ? 0.08 : len, false);
    const setor = { n: 'SETOR NORTE', s: 'SETOR SUL', e: 'SETOR VISITANTE', w: 'SETOR OESTE' }[side];
    for (const t of tunnelsAt) { const [tx, tz] = P(t, dBack + 0.3); f.box(signMat(setor, { bg: '#0e2a6a', fg: '#fff', w: 512, h: 96 }), tx, y + 3.6, tz, isSide ? 3.2 : 0.08, 0.6, isSide ? 0.08 : 3.2, false, 3.2, 0.6); }
    if (side === 's') this.spots.playerTunnel = f.pt(...P(0, r0 - 1)), this.spots.tunnelIn = f.pt(...P(0, dBack + 4));
  }
  // saguão (entre o muro norte e a arquibancada norte): bilheteria, catracas e sala de troféus
  lobby(f, y) {
    const M = this.M; const zIn = -(ST.side0 + ST.depth + 0.5), zOut = -ST.wallZ + 0.3;
    f.add(plane(ST.wallX * 2 - 1, zIn - zOut, 4), M.interiorFloor || M.concreteFlat, 0, y + 0.012, (zIn + zOut) / 2);
    // bilheteria (cabines com vidro) do lado de dentro do portão, à direita
    const bx = 14, bz = zOut + 3.5;
    f.box(paint(M.flat, 0x0e2a6a), bx, y, bz - 1.2, 9, 3.2, 0.3, true, 2); for (const s of [-1, 1]) f.box(paint(M.flat, 0x0e2a6a), bx + s * 4.5, y, bz, 0.3, 3.2, 2.6, true, 2);
    f.box(paint(M.flat, 0xe8e8e8), bx, y, bz + 1.15, 9, 1.1, 0.3, true, 2); f.add(box(9, 1.6, 0.04), M.glass, bx, y + 1.9, bz + 1.15); f.box(paint(M.flat, 0x0e2a6a), bx, y + 2.7, bz + 1.15, 9.3, 0.5, 0.35, false);
    f.box(signMat('BILHETERIA — INGRESSO R$ 200', { bg: '#0e2a6a', fg: '#ffd040', glow: true, w: 1024, h: 128 }), bx, y + 3.3, bz + 1.4, 8, 0.8, 0.08, false, 8, 0.8);
    this.spots.ticket = f.pt(bx, bz + 2.4); this.spots.ticketClerk = f.pt(bx, bz - 0.2);
    // catracas: nas duas pontas do saguão e nos 3 túneis da arquibancada norte
    const tsMat = paint(M.flat, 0x9aa0a8);
    const turn = (lx, lz, wAlong, alongX) => {
      const n = Math.max(1, Math.floor(wAlong / 1.2)); const g = new THREE.Group();
      for (let i = 0; i < n; i++) { const o = -wAlong / 2 + (i + 0.5) * wAlong / n; const [px, pz] = alongX ? [lx + o, lz] : [lx, lz + o];
        f.box(tsMat, alongX ? px - 0.35 : px, y, alongX ? pz : pz - 0.35, alongX ? 0.2 : 0.5, 1.0, alongX ? 0.5 : 0.2, false); }
      const [wx, wz] = f.pt(lx, lz); const col = this.world.addCentered(wx, 0, wz, alongX ? wAlong : 0.3, 2.2, alongX ? 0.3 : wAlong);
      const saved = { minY: col.minY, maxY: col.maxY };
      const arms = []; for (let i = 0; i < n; i++) { const o = -wAlong / 2 + (i + 0.5) * wAlong / n; const m = new THREE.Mesh(new THREE.BoxGeometry(alongX ? 0.7 : 0.05, 0.05, alongX ? 0.05 : 0.7), new THREE.MeshLambertMaterial({ color: 0xd8dade })); const [px, pz] = f.pt(alongX ? lx + o : lx, alongX ? lz : lz + o); m.position.set(px, y + 0.95, pz); this.scene.add(m); arms.push(m); }
      this.turnstiles.push({ col, saved, arms, open: false, set(open) { if (open === this.open) return; this.open = open; if (open) { this.col.minY = -101; this.col.maxY = -100; } else { this.col.minY = this.saved.minY; this.col.maxY = this.saved.maxY; } for (const a of this.arms) a.rotation.y = open ? Math.PI / 2 : 0; } });
      this.turnstiles[this.turnstiles.length - 1].set(true);
    };
    for (const s of [-1, 1]) turn(s * (ST.wallX - 2.2), (zIn + zOut) / 2, zIn - zOut - 0.6, false);
    for (const t of [-30, 0, 30]) turn(t, zIn - 0.2, 3.2, true);
    // sala de troféus (à esquerda do portão): vitrines de vidro, troféus 3D, fotos, telão e placas
    const HO = this.city.hollow(f, -32, zOut + 6.5, 22, 12.4, 4.6, paint(M.flat, 0xe6e6e8), 'n', 4.6, { door: 2.4, tu: 4, tv: 4 });
    this.trophyRoom(HO, y);
    f.box(signMat('SALA DE TROFÉUS', { bg: '#0e2a6a', fg: '#ffd040', glow: true, w: 512, h: 96 }), -32, y + 3.3, zOut + 12.8, 4.8, 0.7, 0.08, false, 4.8, 0.7);
    this.spots.trophyDoor = f.pt(-32, zOut + 14);
  }
  trophyRoom(HO, y) {
    const M = this.M, { r, w, d } = HO;
    r.add(plane(w, d, 2), paint(M.flatIn, 0x1a1e2a), 0, y + 0.035, 0); // carpete escuro
    const glass = new THREE.MeshPhongMaterial({ color: 0xcfe4ff, transparent: true, opacity: 0.16, shininess: 150, specular: 0xffffff, depthWrite: false }); glass.userData.castShadow = false;
    const gold = new THREE.MeshPhongMaterial({ color: 0xd8b040, shininess: 120, specular: 0xfff0b0, emissive: 0x2a1a00 }), silver = new THREE.MeshPhongMaterial({ color: 0xd0d4da, shininess: 140, specular: 0xffffff, emissive: 0x151515 });
    TROPHIES.forEach((T, i) => {
      const row = i < 3 ? 0 : 1, k = i % 3; const lx = -w / 2 + 3.4 + k * ((w - 6.8) / 2), lz = row ? d / 2 - 3.6 : -d / 2 + 2.2;
      r.box(paint(M.flatIn, 0x0e1a3a), lx, y, lz, 1.2, 1.0, 1.2, true, 1); // pedestal
      r.add(box(1.0, 0.04, 1.0), M.ceilingLight, lx, y + 1.02, lz); // base iluminada
      r.add(box(1.16, 1.3, 1.16), glass, lx, y + 1.0 + 0.65, lz); // vitrine
      const [wx, wz] = r.pt(lx, lz);
      const g = new THREE.Group(); for (const part of trophyGeo(T.shape)) g.add(new THREE.Mesh(part, T.color === 0xd8b040 ? gold : silver)); g.position.set(wx, y + 1.06, wz); g.scale.setScalar(1.15); this.scene.add(g); g.visible = false;
      this.trophyMeshes = (this.trophyMeshes || []).concat(g);
      r.add(box(0.9, 0.22, 0.02, 0.9, 0.22), signMat(`${T.name} ${T.year}`, { bg: '#0e1a3a', fg: '#ffd040', w: 512, h: 96 }), lx, y + 0.7, lz + (row ? -0.62 : 0.62), row ? Math.PI : 0);
      this.trophySpots.push({ i, x: wx, z: wz, y: y + 1.6, face: r.ry + (row ? Math.PI : 0) });
    });
    // fotos das equipes campeãs e telão
    for (let k = 0; k < 4; k++) r.add(box(0.03, 0.9, 1.3, 1.3, 0.9), homeMat('photo'), (k < 2 ? -1 : 1) * (w / 2 - 0.05), y + 2.0, -1.8 + (k % 2) * 3.4, Math.PI / 2);
    r.add(box(4.2, 1.6, 0.06, 4.2, 1.6), signMat('WESTHAVEN FC — 6 TÍTULOS', { bg: '#0e2a6a', fg: '#ffffff', glow: true, w: 1024, h: 256 }), 0, y + 3.0, -d / 2 + 0.06);
    for (let i = 0; i < 3; i++) { r.add(cyl(0.12, 0.2, 0.25, 12), M.metalDark, -4 + i * 4, y + 4.45, 0); r.add(new THREE.SphereGeometry(0.1, 8, 6), M.lamp, -4 + i * 4, y + 4.3, 0); }
    const [cx, cz] = HO.f.pt(HO.cx, HO.cz); this.city.lamps.push([cx, y + 4, cz]);
    this.city.closeHollow(HO);
    this.trophyRoomAt = [cx, cz];
  }
  // vestiário no fim do túnel dos jogadores (sul)
  lockerRoom(f, y) {
    const M = this.M; const zIn = ST.side0 + ST.depth + 0.5;
    const HO = this.city.hollow(f, 0, zIn + 7.5, 18, 12, 4, paint(M.flat, 0xe6e6e8), 's', 4, { door: 3, tu: 4, tv: 4 });
    const { r, w, d } = HO;
    for (const s of [-1, 1]) { r.box(paint(M.flatIn, 0x1a4aa8), s * (w / 2 - 0.5), y, 0, 0.8, 0.45, d - 2, true, 1); for (let k = 0; k < 8; k++) r.box(paint(M.flatIn, 0x0e2a6a), s * (w / 2 - 0.25), y + 0.45, -d / 2 + 1.2 + k * ((d - 2.4) / 7), 0.4, 1.9, 0.9, false, 1); }
    r.add(box(3, 1.2, 0.05, 3, 1.2), signMat('VESTIÁRIO — WESTHAVEN FC', { bg: '#0e2a6a', fg: '#fff', w: 512, h: 128 }), 0, y + 2.6, -d / 2 + 0.06);
    this.city.closeHollow(HO);
    this.spots.locker = HO.f.pt(HO.cx, HO.cz);
  }
  // TORCIDA: uma malha instanciada (1 chamada de desenho). Cada torcedor tem cor, tamanho, fase e se está em pé;
  // o shader faz balançar, pular quando a torcida empolga e comemorar gols (cada lado reage ao seu time)
  buildCrowd(max = 3200) {
    const spots = [];
    for (const R of this.seatRows) { if (R.r % 1) continue; for (let u = R.u0 + 0.3; u < R.u1 - 0.3; u += 0.55) spots.push([R, u]); }
    for (let i = spots.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [spots[i], spots[j]] = [spots[j], spots[i]]; }
    const n = Math.min(max, Math.floor(spots.length * 0.72));
    const torso = new THREE.CylinderGeometry(0.15, 0.19, 0.58, 6, 1).translate(0, 0.62, 0), head = new THREE.IcosahedronGeometry(0.115, 1).translate(0, 1.04, 0), legs = new THREE.BoxGeometry(0.3, 0.12, 0.42).translate(0, 0.44, 0.1);
    const arms = new THREE.BoxGeometry(0.5, 0.1, 0.1).translate(0, 0.8, 0);
    const parts = [torso, head, legs, arms].map((g) => g.index ? g.toNonIndexed() : g);
    const isHead = [], isArm = [];
    parts.forEach((g, k) => { for (let i = 0; i < g.attributes.position.count; i++) { isHead.push(k === 1 ? 1 : 0); isArm.push(k === 3 ? 1 : 0); } });
    const pos = [], nor = []; for (const g of parts) { pos.push(...g.attributes.position.array); nor.push(...g.attributes.normal.array); }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
    geo.setAttribute('aHead', new THREE.Float32BufferAttribute(isHead, 1)); geo.setAttribute('aArm', new THREE.Float32BufferAttribute(isArm, 1));
    const seed = new Float32Array(n), stand = new Float32Array(n), side = new Float32Array(n);
    const mat2 = new THREE.MeshLambertMaterial({ color: 0xffffff });
    this.crowdU = { uTime: { value: 0 }, uExcite: { value: 0.3 }, uCheer: { value: 0 }, uGoal: { value: 0 } };
    mat2.onBeforeCompile = (sh) => {
      Object.assign(sh.uniforms, this.crowdU);
      sh.vertexShader = 'attribute float aSeed; attribute float aStand; attribute float aSide; attribute float aHead; attribute float aArm;\nuniform float uTime; uniform float uExcite; uniform float uCheer; uniform float uGoal;\nvarying float vHead;\n' + sh.vertexShader
        .replace('#include <begin_vertex>', `#include <begin_vertex>
          vHead = aHead;
          float mine = (aSide * uCheer > 0.5) ? 1.0 : 0.0;
          float ex = clamp(uExcite + mine * uGoal, 0.0, 1.6);
          float up = aStand * 0.28 + step(0.75, ex) * 0.28 * (1.0 - aStand);
          float jump = max(0.0, sin(uTime * (7.0 + aSeed * 3.0) + aSeed * 40.0)) * 0.24 * smoothstep(0.55, 1.1, ex);
          transformed.y += up + jump;
          transformed.x += sin(uTime * 1.3 + aSeed * 21.0) * 0.035 * (1.0 - aArm);
          // braços para cima na comemoração
          if (aArm > 0.5) { float lift = smoothstep(0.6, 1.0, ex) * (0.6 + 0.4 * sin(uTime * 8.0 + aSeed * 30.0)); transformed.y += lift * 0.42; transformed.x *= 1.0 - lift * 0.45; }`);
      sh.fragmentShader = 'varying float vHead;\n' + sh.fragmentShader.replace('#include <color_fragment>', '#include <color_fragment>\n diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.78, 0.58, 0.44) * (0.8 + 0.3 * fract(diffuseColor.r * 13.0)), vHead);');
    };
    mat2.customProgramCacheKey = () => 'torcida';
    const im = new THREE.InstancedMesh(geo, mat2, n); im.castShadow = false; im.receiveShadow = false; im.frustumCulled = false;
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), v = new THREE.Vector3(), col = new THREE.Color();
    const homeCols = [0x1a4aa8, 0x1a4aa8, 0xf2f2f2, 0x123a88, 0x2a5ac8], awayCols = [0xb01a1a, 0x8a1010, 0x1a1a1a, 0xd83a2a], misc = [0x2a2a2a, 0x6a6a6a, 0xd8c8a8, 0x3a6a3a, 0x8a5a3a, 0xe8e8e8];
    this.crowdSpots = [];
    for (let i = 0; i < n; i++) {
      const [R, u] = spots[i]; const [x, z] = R.world(u); const head = R.isSide ? (R.sgn < 0 ? 0 : Math.PI) : (R.sgn < 0 ? Math.PI / 2 : -Math.PI / 2);
      const away = R.side === 'e'; seed[i] = Math.random(); stand[i] = Math.random() < (away ? 0.45 : 0.18) ? 1 : 0; side[i] = away ? -1 : 1;
      q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), head); const s2 = 0.9 + Math.random() * 0.2; sc.set(s2, 0.92 + Math.random() * 0.16, s2);
      m4.compose(v.set(x, R.top + 0.02, z), q, sc); im.setMatrixAt(i, m4);
      const pal = away ? awayCols : Math.random() < 0.72 ? homeCols : misc; col.setHex(pal[Math.floor(Math.random() * pal.length)]).multiplyScalar(0.85 + Math.random() * 0.25); im.setColorAt(i, col);
      this.crowdSpots.push([x, z]);
    }
    geo.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seed, 1)); geo.setAttribute('aStand', new THREE.InstancedBufferAttribute(stand, 1)); geo.setAttribute('aSide', new THREE.InstancedBufferAttribute(side, 1));
    im.visible = false; this.scene.add(im); this.crowd = im;
    // bandeiras tremulando (mastro + pano), dos dois times
    const nf = 36; const flagGeo = new THREE.PlaneGeometry(1.1, 0.7, 6, 1).translate(0.55, 2.0, 0); const fm = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide });
    fm.onBeforeCompile = (sh) => { sh.uniforms.uTime = this.crowdU.uTime; sh.vertexShader = 'uniform float uTime;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\n float ph = float(gl_InstanceID) * 1.7; transformed.z += sin(uTime * 5.0 + transformed.x * 4.0 + ph) * 0.15 * (transformed.x / 1.1); transformed.x += sin(uTime * 2.0 + ph) * 0.15 * (transformed.y - 1.6);'); };
    fm.customProgramCacheKey = () => 'bandeira';
    const flags = new THREE.InstancedMesh(flagGeo, fm, nf); const poles = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.015, 0.015, 2.4, 4).translate(0, 1.2, 0), new THREE.MeshLambertMaterial({ color: 0x888888 }), nf);
    for (let i = 0; i < nf; i++) { const [R, u] = spots[(i * 37) % n]; const [x, z] = R.world(u); m4.compose(v.set(x + 0.2, R.top, z), q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.random() * 6.28), sc.set(1, 1, 1)); flags.setMatrixAt(i, m4); poles.setMatrixAt(i, m4); flags.setColorAt(i, col.setHex(R.side === 'e' ? 0xc01a1a : (i % 3 ? 0x1a4aa8 : 0xf4f4f4))); }
    flags.visible = poles.visible = false; flags.frustumCulled = poles.frustumCulled = false; this.scene.add(flags, poles); this.flags = [flags, poles];
  }
  setCrowd(on) { if (!this.crowd) return; this.crowd.visible = on; for (const f of this.flags) f.visible = on; }
  // assento mais perto de um ponto (para sentar); devolve posição, altura e direção do campo
  nearestSeat(x, z, maxD = 1.6) {
    let best = null, bd = maxD;
    for (const R of this.seatRows) {
      // projeta o ponto na fileira
      const [ax, az] = R.world(R.u0), [bx2, bz2] = R.world(R.u1); const vx = bx2 - ax, vz = bz2 - az, L2 = vx * vx + vz * vz;
      const t = Math.max(0, Math.min(1, ((x - ax) * vx + (z - az) * vz) / L2)); const px = ax + vx * t, pz = az + vz * t; const dd = Math.hypot(x - px, z - pz);
      if (dd < bd) { bd = dd; const u = R.u0 + (R.u1 - R.u0) * t; const us = Math.round(u / 0.55) * 0.55; const [sx, sz] = R.world(Math.max(R.u0 + 0.3, Math.min(R.u1 - 0.3, us))); best = { x: sx, z: sz, y: R.top, heading: R.isSide ? (R.sgn < 0 ? 0 : Math.PI) : (R.sgn < 0 ? Math.PI / 2 : -Math.PI / 2) }; }
    }
    return best;
  }
}
function pick2(i) { return ['#0e2a6a', '#b01a1a', '#1a6a2a', '#1a1a1a', '#d06a1a', '#2a2a6a'][i % 6]; }
