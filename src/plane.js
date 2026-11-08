// Avião regional pilotável (bimotor a jato) com física de voo simples (estilo arcade).
// Modelo: fuselagem torneada (Lathe), asas enflechadas com perfil, motores sob as asas, cauda em T baixa,
// janelas, cabine, trem de pouso retrátil, luzes de navegação e pintura da companhia.
import * as THREE from 'three';
import { mergeGeometries, toCreasedNormals } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { colorize } from './geo.js';
import { envRT } from './materials.js';

const bodyMat = new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 80, specular: 0x777777, envMap: envRT.texture, combine: THREE.MixOperation, reflectivity: 0.18 });
const glassMat = new THREE.MeshPhongMaterial({ color: 0x0c141c, shininess: 120, specular: 0xaaaaaa, envMap: envRT.texture, combine: THREE.MixOperation, reflectivity: 0.5 });
const navR = new THREE.MeshBasicMaterial({ color: 0xff2020 }), navG = new THREE.MeshBasicMaterial({ color: 0x20ff40 }), navW = new THREE.MeshBasicMaterial({ color: 0xffffff });
function C(g, color, m) { let n = g.index ? g.toNonIndexed() : g.clone(); for (const k of Object.keys(n.attributes)) if (!['position', 'normal'].includes(k)) n.deleteAttribute(k); if (!n.attributes.normal) n.computeVertexNormals(); if (m) n.applyMatrix4(m); colorize(n, color); return n; }
const MX = (x, y, z, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) => new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)), new THREE.Vector3(sx, sy, sz));
// asa/estabilizador: trapézio com perfil (mais grosso no meio da corda)
function wing(span, rootChord, tipChord, sweep, thick, side) {
  const sh = new THREE.Shape(); sh.moveTo(0, 0); sh.lineTo(span, -sweep); sh.lineTo(span, -sweep - tipChord); sh.lineTo(0, -rootChord); sh.closePath();
  const g = new THREE.ExtrudeGeometry(sh, { depth: thick, bevelEnabled: true, bevelThickness: thick * 0.5, bevelSize: thick * 0.4, bevelSegments: 2, curveSegments: 1 });
  g.translate(0, 0, -thick / 2); g.rotateX(Math.PI / 2); // plano XZ: x = envergadura, z = corda (para trás = -z)
  if (side < 0) g.scale(-1, 1, 1);
  return g;
}
export class Airplane {
  constructor(world, livery = { body: 0xf4f4f4, stripe: 0x0d4a8a, tail: 0x0d4a8a, belly: 0xb8bcc2 }) {
    this.world = world; this.group = new THREE.Group(); this.group.name = 'aviao';
    const L = 24, R = 1.55, H0 = 2.75; // comprimento, raio da fuselagem, altura do centro da fuselagem no solo
    this.dims = { L, R, H0, span: 26 };
    const P = [];
    // fuselagem: perfil girado (nariz arredondado, cone de cauda)
    const prof = []; const N = 26;
    for (let i = 0; i <= N; i++) {
      const t = i / N; const z = -L / 2 + t * L;
      let r = R;
      if (t > 0.86) r = R * Math.sqrt(Math.max(0, 1 - ((t - 0.86) / 0.14) ** 2)) * 0.98 + 0.02; // nariz
      if (t < 0.26) r = R * (0.25 + 0.75 * Math.pow(t / 0.26, 0.6)); // cone de cauda
      prof.push(new THREE.Vector2(Math.max(0.02, r), z));
    }
    const fus = new THREE.LatheGeometry(prof, 22); fus.rotateX(Math.PI / 2); fus.rotateZ(Math.PI / 2);
    // cone da cauda sobe um pouco (como nos aviões de verdade)
    { const p = fus.attributes.position; for (let i = 0; i < p.count; i++) { const z = p.getZ(i); if (z < -L / 2 + 6) p.setY(i, p.getY(i) + (1 - (z + L / 2) / 6) * 0.9); } }
    const fusN = toCreasedNormals(fus, 1.2);
    // pintura: barriga cinza, faixa da companhia
    { const g = C(fusN, livery.body); const pos = g.attributes.position, col = g.attributes.color; const c1 = new THREE.Color(livery.belly), c2 = new THREE.Color(livery.stripe);
      for (let i = 0; i < pos.count; i++) { const yy = pos.getY(i); if (yy < -R * 0.55) col.setXYZ(i, c1.r, c1.g, c1.b); else if (yy > -0.55 && yy < -0.2) col.setXYZ(i, c2.r, c2.g, c2.b); }
      g.translate(0, H0, 0); P.push(g); }
    // asas, raiz levemente atrás do centro
    for (const s of [-1, 1]) {
      P.push(C(wing(12.5, 4.2, 1.5, 3.2, 0.35, s), livery.body, MX(s * 0.9, H0 - 0.9, 1.8, 0, 0, s * 0.06)));
      P.push(C(new THREE.BoxGeometry(0.1, 0.6, 0.8), livery.tail, MX(s * 13.4, H0 - 0.35, -2.2, 0, 0, s * -0.1))); // winglet
      // motor sob a asa
      const ex = s * 4.6, ey = H0 - 1.75, ez = 1.6;
      P.push(C(new THREE.CylinderGeometry(0.72, 0.6, 3.4, 18, 1, false), 0xe8e8e8, MX(ex, ey, ez, Math.PI / 2)));
      P.push(C(new THREE.CylinderGeometry(0.62, 0.62, 0.1, 18), 0x1a1a1e, MX(ex, ey, ez + 1.72, Math.PI / 2))); // entrada de ar
      P.push(C(new THREE.CylinderGeometry(0.25, 0.25, 0.16, 12), 0x8a8e94, MX(ex, ey, ez + 1.74, Math.PI / 2)));
      P.push(C(new THREE.CylinderGeometry(0.42, 0.36, 0.6, 14), 0x5a5e64, MX(ex, ey, ez - 1.95, Math.PI / 2))); // escape
      P.push(C(new THREE.BoxGeometry(0.25, 0.9, 2.2), 0xd8d8d8, MX(ex, ey + 0.8, ez - 0.2))); // pilone
      P.push(C(new THREE.CylinderGeometry(0.73, 0.73, 0.4, 18), livery.stripe, MX(ex, ey, ez + 1.0, Math.PI / 2))); // faixa
      // estabilizador horizontal
      P.push(C(wing(5.2, 2.6, 1.1, 2.0, 0.22, s), livery.body, MX(s * 0.3, H0 + 0.75, -L / 2 + 3.4, 0, 0, s * 0.08)));
    }
    // deriva (estabilizador vertical) com a cor da companhia
    { const sh = new THREE.Shape(); sh.moveTo(0, 0); sh.lineTo(4.8, 0); sh.lineTo(6.6, 5.4); sh.lineTo(4.6, 5.4); sh.closePath();
      const g = new THREE.ExtrudeGeometry(sh, { depth: 0.28, bevelEnabled: true, bevelThickness: 0.12, bevelSize: 0.1, bevelSegments: 2 });
      g.translate(0, 0, -0.14); g.rotateY(-Math.PI / 2); P.push(C(g, livery.tail, MX(0, H0 + 0.9, -L / 2 + 6.4))); }
    P.push(C(new THREE.BoxGeometry(0.6, 0.12, 3.5), livery.belly, MX(0, H0 - R + 0.05, 1.8))); // carenagem asa-fuselagem
    // portas (contorno)
    for (const [dz, s] of [[8.0, 1], [-8.5, 1], [8.0, -1]]) { const g = new THREE.BoxGeometry(0.02, 1.8, 0.9); P.push(C(g, 0xb0b4b8, MX(s * (R + 0.005), H0 - 0.05, dz))); }
    this.body = new THREE.Mesh(mergeGeometries(P), bodyMat); this.body.castShadow = true;
    this.group.add(this.body);
    // janelas: fileira dos dois lados + cabine
    const W = [];
    for (const s of [-1, 1]) for (let i = 0; i < 16; i++) { const z = -6.5 + i * 0.85; if (Math.abs(z - 8) < 0.7 || Math.abs(z + 8.5) < 0.7) continue; W.push(new THREE.BoxGeometry(0.04, 0.32, 0.24).translate(s * (R - 0.0), H0 + 0.25, z)); }
    for (const s of [-1, 1]) W.push(new THREE.BoxGeometry(0.5, 0.42, 0.6).rotateY(s * 0.5).rotateX(-0.25).translate(s * 0.62, H0 + 0.62, L / 2 - 1.15));
    W.push(new THREE.BoxGeometry(0.85, 0.4, 0.3).rotateX(-0.6).translate(0, H0 + 0.68, L / 2 - 0.95));
    const glass = new THREE.Mesh(mergeGeometries(W), glassMat); this.group.add(glass);
    // trem de pouso (some no ar)
    const G = [];
    const leg = (x, z, h) => { G.push(C(new THREE.CylinderGeometry(0.08, 0.08, h, 8), 0xb8bcc2, MX(x, h / 2 + 0.35, z))); for (const s of [-0.18, 0.18]) G.push(C(new THREE.CylinderGeometry(0.36, 0.36, 0.26, 14), 0x161616, MX(x + s, 0.36, z, 0, 0, Math.PI / 2))); };
    leg(0, L / 2 - 3.2, H0 - R - 0.25); for (const s of [-1, 1]) leg(s * 2.4, 0.6, H0 - R + 0.2);
    this.gear = new THREE.Mesh(mergeGeometries(G), bodyMat); this.gear.castShadow = true; this.group.add(this.gear);
    // luzes de navegação
    const lr = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), navR); lr.position.set(13.5, H0 - 0.4, -2.6);
    const lg = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), navG); lg.position.set(-13.5, H0 - 0.4, -2.6);
    this.strobe = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 6), navW); this.strobe.position.set(0, H0 + 6.4, -L / 2 + 1.5);
    this.group.add(lr, lg, this.strobe);
    // estado físico
    this.x = 0; this.y = 0; this.z = 0; this.heading = 0; this.pitch = 0; this.roll = 0; this.speed = 0; this.throttle = 0;
    this.onGround = true; this.crashed = false; this.collidable = true; this.t = 0;
    this.T = { W: 3.4, L: L, roof: H0 + R }; // usado na colisão com o jogador
  }
  place(x, z, heading) { this.x = x; this.z = z; this.heading = heading; this.y = this.world.groundFn(x, z); this.pitch = 0; this.roll = 0; this.speed = 0; this.throttle = 0; this.onGround = true; this.crashed = false; this.sync(); }
  get forward() { return [Math.sin(this.heading), Math.cos(this.heading)]; }
  get kmh() { return Math.abs(this.speed) * 3.6; }
  get altitude() { return this.y - this.world.groundFn(this.x, this.z); }
  local(lx, lz) { const s = Math.sin(this.heading), c = Math.cos(this.heading); return [this.x + lx * c + lz * s, this.z - lx * s + lz * c]; }
  // input: { throttle: -1..1 (W/S), steer: -1..1 (A/D), pitch: -1..1 (Espaço/Shift) }
  update(dt, inp) {
    if (this.crashed) return null;
    this.t += dt; dt = Math.min(dt, 1 / 20);
    this.throttle = THREE.MathUtils.clamp(this.throttle + (inp.throttle || 0) * dt * 0.6, 0, 1);
    const g = this.world.groundFn(this.x, this.z), gear = 0.0;
    const drag = 0.00055 * this.speed * this.speed;
    if (this.onGround) {
      // rolagem no chão: freio com S quando o motor está em marcha lenta
      const brake = (inp.throttle < 0 && this.throttle < 0.05) ? 6 : 0.35;
      this.speed += (this.throttle * 9.5 - drag - Math.sign(this.speed) * brake) * dt;
      if (this.speed < 0) this.speed = 0;
      this.heading += (inp.steer || 0) * Math.min(this.speed, 14) * 0.035 * dt; // A = esquerda
      // decolagem: puxe o nariz (Espaço) acima de 140 km/h
      const rot = this.speed > 39 ? Math.max(0, inp.pitch || 0) * 0.16 : 0;
      this.pitch += (rot - this.pitch) * Math.min(1, dt * 2.5);
      this.roll += (0 - this.roll) * Math.min(1, dt * 4);
      if (this.pitch > 0.08 && this.speed > 41) { this.onGround = false; }
      this.y = g + gear;
    } else {
      this.speed += (this.throttle * 9.5 - drag - Math.sin(this.pitch) * 9.8) * dt;
      // inclina para virar; o nariz sobe/desce com Espaço/Shift
      const rollT = (inp.steer || 0) * -0.85;
      this.roll += (rollT - this.roll) * Math.min(1, dt * 2.2);
      this.heading -= Math.sin(this.roll) * 9.8 / Math.max(25, this.speed) * dt * 1.4; // asa esquerda baixa = curva à esquerda
      this.pitch += (inp.pitch || 0) * 0.6 * dt;
      this.pitch += (0 - this.pitch) * dt * 0.15; // tende a nivelar
      // estol: devagar demais, o nariz cai
      if (this.speed < 32) { this.pitch -= (32 - this.speed) * 0.02 * dt; }
      this.pitch = THREE.MathUtils.clamp(this.pitch, -0.9, 0.7);
    }
    this.speed = THREE.MathUtils.clamp(this.speed, 0, 95);
    const cp = Math.cos(this.pitch);
    this.x += Math.sin(this.heading) * cp * this.speed * dt; this.z += Math.cos(this.heading) * cp * this.speed * dt;
    let event = null;
    if (!this.onGround) {
      let vy = Math.sin(this.pitch) * this.speed;
      if (this.speed < 30) vy -= (30 - this.speed) * 0.4; // perde sustentação
      this.y += vy * dt;
      const gNow = this.world.groundFn(this.x, this.z);
      if (this.y <= gNow) { // tocou o chão: pouso ou queda
        if (vy < -7 || Math.abs(this.roll) > 0.45 || this.pitch < -0.2) { this.crashed = true; event = 'crash'; }
        else { this.onGround = true; this.y = gNow; this.pitch = Math.max(0, this.pitch); event = 'land'; }
      }
      if (this.altitude > 320) { this.y = this.world.groundFn(this.x, this.z) + 320; this.pitch = Math.min(this.pitch, 0); } // teto de voo
      // bateu em prédio/obstáculo
      if (!this.crashed) for (const b of this.world.query(this.x - 2, this.z - 2, this.x + 2, this.z + 2)) if (this.y + 1 < b.maxY && this.y + 3 > b.minY && this.x > b.minX - 1 && this.x < b.maxX + 1 && this.z > b.minZ - 1 && this.z < b.maxZ + 1) { this.crashed = true; event = 'crash'; break; }
    } else {
      // no chão também bate em obstáculos (correndo rápido)
      if (this.speed > 12) for (const b of this.world.query(this.x - 2, this.z - 2, this.x + 2, this.z + 2)) if (b.maxY > g + 1.5 && this.x > b.minX - 1.2 && this.x < b.maxX + 1.2 && this.z > b.minZ - 1.2 && this.z < b.maxZ + 1.2) { this.crashed = true; event = 'crash'; break; }
    }
    // limite do mapa: perto da borda o avião faz a curva sozinho de volta para a cidade
    const Bd = this.bounds || { x0: -440, x1: 840, z0: -440, z1: 440 }, m = 70;
    if (!this.onGround && (this.x < Bd.x0 + m || this.x > Bd.x1 - m || this.z < Bd.z0 + m || this.z > Bd.z1 - m)) {
      const back = Math.atan2(200 - this.x, 0 - this.z); let d = back - this.heading; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2;
      this.heading += THREE.MathUtils.clamp(d, -1, 1) * dt * 0.9; this.roll += (THREE.MathUtils.clamp(-d, -0.6, 0.6) - this.roll) * dt * 2; this.atEdge = true;
    } else this.atEdge = false;
    this.x = THREE.MathUtils.clamp(this.x, Bd.x0, Bd.x1); this.z = THREE.MathUtils.clamp(this.z, Bd.z0, Bd.z1);
    this.sync();
    return event;
  }
  sync() {
    this.group.position.set(this.x, this.y, this.z);
    this.group.rotation.set(0, 0, 0); this.group.rotation.order = 'YXZ';
    this.group.rotation.y = this.heading; this.group.rotation.x = -this.pitch; this.group.rotation.z = this.roll;
    this.gear.visible = this.onGround || this.altitude < 25;
    this.strobe.visible = Math.floor(this.t * 1.5) % 2 === 0;
  }
  // colisão do jogador a pé com a fuselagem (caixa simples)
  pushCircleOut(x, z, r, y0, y1) {
    if (!this.onGround || y0 > this.y + 4.5) return null;
    const s = Math.sin(this.heading), c = Math.cos(this.heading); const dx = x - this.x, dz = z - this.z;
    const lx = dx * c - dz * s, lz = dx * s + dz * c; const hx = 1.6, hz = this.dims.L / 2;
    if (Math.abs(lx) > hx + r || Math.abs(lz) > hz + r) return null;
    const ex = hx + r - Math.abs(lx), ez = hz + r - Math.abs(lz);
    let px = lx, pz = lz, nx = 0, nz = 0;
    if (ex < ez) { nx = Math.sign(lx) || 1; px = nx * (hx + r); } else { nz = Math.sign(lz) || 1; pz = nz * (hz + r); }
    return { x: this.x + px * c + pz * s, z: this.z - px * s + pz * c, nx: nx * c + nz * s, nz: -nx * s + nz * c };
  }
}
