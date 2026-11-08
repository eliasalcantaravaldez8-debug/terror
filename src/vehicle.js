// Veículos dirigíveis: modelo 3D procedural detalhado (carroceria, vidros, interior, rodas, luzes)
// e física arcade estável (aceleração, frenagem, ré, freio de mão, direção dependente da velocidade, colisões).
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { colorize } from './geo.js';
import { envRT } from './materials.js';

const damp = (a, b, k, dt) => a + (b - a) * (1 - Math.exp(-k * dt));

export const CAR_TYPES = {
  sedan: { L: 4.6, W: 1.82, wheelBase: 2.75, wr: 0.34, belt: 0.95, roof: 1.43, ws: [1.05, 0.25], rw: [-1.0, -1.8], maxSpeed: 46, accel: 7.5, name: 'Sedan' },
  hatch: { L: 4.0, W: 1.75, wheelBase: 2.5, wr: 0.32, belt: 0.93, roof: 1.47, ws: [0.85, 0.05], rw: [-1.45, -1.85], maxSpeed: 42, accel: 7.0, name: 'Hatch' },
  suv: { L: 4.75, W: 1.95, wheelBase: 2.85, wr: 0.4, belt: 1.1, roof: 1.75, ws: [1.15, 0.35], rw: [-1.95, -2.2], maxSpeed: 40, accel: 6.5, name: 'SUV' },
  pickup: { L: 5.2, W: 1.95, wheelBase: 3.15, wr: 0.4, belt: 1.08, roof: 1.78, ws: [1.45, 0.75], rw: [-0.35, -0.45], maxSpeed: 39, accel: 6.2, bed: true, name: 'Picape' },
  police: { L: 4.7, W: 1.85, wheelBase: 2.8, wr: 0.35, belt: 0.97, roof: 1.45, ws: [1.05, 0.25], rw: [-1.0, -1.8], maxSpeed: 52, accel: 9, police: true, name: 'Viatura' },
  taxi: { L: 4.6, W: 1.82, wheelBase: 2.75, wr: 0.34, belt: 0.95, roof: 1.43, ws: [1.05, 0.25], rw: [-1.0, -1.8], maxSpeed: 44, accel: 7.2, taxi: true, name: 'Táxi' },
};

export const CAR_COLORS = [0x8e1b1b, 0x1d3f72, 0xd9d9d9, 0x1a1a1a, 0x3f4a52, 0x6b6f73, 0x2e5a3a, 0x9c7a2c, 0xf2f2f2, 0x5a1f3d, 0x274b5e, 0xb25a1f];

const bodyMat = new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 90, specular: 0x666666, envMap: envRT.texture, combine: THREE.MixOperation, reflectivity: 0.22 });
const glassMat = new THREE.MeshPhongMaterial({ color: 0x1a2530, transparent: true, opacity: 0.5, shininess: 120, specular: 0xaaaaaa, depthWrite: false, envMap: envRT.texture, combine: THREE.MixOperation, reflectivity: 0.45 });
const wheelMat = new THREE.MeshLambertMaterial({ vertexColors: true });
const headMat = new THREE.MeshBasicMaterial({ color: 0xfff6d8 });
const tailMat = new THREE.MeshBasicMaterial({ color: 0x6a0a0a });
const tailBrakeMat = new THREE.MeshBasicMaterial({ color: 0xff2020 });
export const sirenMats = [new THREE.MeshBasicMaterial({ color: 0x330000 }), new THREE.MeshBasicMaterial({ color: 0x000033 })];

function nonIdx(g, color, m) {
  let n = g.index ? g.toNonIndexed() : g;
  if (n === g) n = g.clone();
  for (const k of Object.keys(n.attributes)) if (!['position', 'normal'].includes(k)) n.deleteAttribute(k);
  if (!n.attributes.normal) n.computeVertexNormals();
  if (m) n.applyMatrix4(m);
  colorize(n, color);
  return n;
}
const M = (x, y, z, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) =>
  new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz, 'YXZ')), new THREE.Vector3(sx, sy, sz));

const wheelGeoCache = new Map();
function wheelGeo(r) {
  if (wheelGeoCache.has(r)) return wheelGeoCache.get(r);
  const parts = [];
  const w = 0.24;
  parts.push(nonIdx(new THREE.CylinderGeometry(r, r, w, 18), 0x161616, M(0, 0, 0, 0, 0, Math.PI / 2)));
  parts.push(nonIdx(new THREE.TorusGeometry(r * 0.86, r * 0.14, 4, 14), 0x1f1f1f, M(w / 2 - 0.02, 0, 0, 0, Math.PI / 2, 0)));
  parts.push(nonIdx(new THREE.CylinderGeometry(r * 0.62, r * 0.62, w + 0.02, 16), 0xa9adb2, M(0, 0, 0, 0, 0, Math.PI / 2)));
  parts.push(nonIdx(new THREE.CylinderGeometry(r * 0.15, r * 0.15, w + 0.05, 8), 0x6b6e72, M(0, 0, 0, 0, 0, Math.PI / 2)));
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    parts.push(nonIdx(new THREE.BoxGeometry(0.03, r * 0.95, 0.07), 0xd0d3d6, M(w / 2 + 0.012, 0, 0, a, 0, 0)));
  }
  const g = mergeGeometries(parts);
  wheelGeoCache.set(r, g);
  return g;
}

function extrudeProfile(points, width, bevel = 0.05) {
  const sh = new THREE.Shape();
  sh.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    const p = points[i];
    if (p.arc) sh.absarc(p.arc[0], p.arc[1], p.arc[2], Math.PI, 0, true);
    else sh.lineTo(p[0], p[1]);
  }
  const g = new THREE.ExtrudeGeometry(sh, { depth: width - bevel * 2, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 2, curveSegments: 8 });
  g.rotateY(-Math.PI / 2);
  g.translate(width / 2 - bevel, 0, 0);
  return g;
}

let carIdCounter = 0;

export class Vehicle {
  constructor(type = 'sedan', color = 0x8e1b1b, world) {
    this.id = carIdCounter++;
    this.type = type;
    const T = this.T = CAR_TYPES[type];
    this.world = world;
    if (T.police) color = 0xf4f4f4;
    if (T.taxi) color = 0xe8c21a;
    this.color = color;
    this.group = new THREE.Group();
    this.body = new THREE.Group(); // inclinação (pitch/roll) aplicada aqui
    this.group.add(this.body);
    this.build(color);
    // estado físico
    this.x = 0; this.z = 0; this.y = 0; this.heading = 0;
    this.speed = 0; this.lat = 0; this.steer = 0; this.yawRate = 0;
    this.pushVx = 0; this.pushVz = 0;
    this.pitch = 0; this.roll = 0; this.wheelSpin = 0;
    this.collidable = true; this.height = T.roof;
    this.driver = null; // 'player' | 'ai' | null
    this.braking = false; this.lastHit = 0;
    this.engineOn = false;
  }

  build(color) {
    const T = this.T; const L = T.L, W = T.W, hl = L / 2;
    const wb = T.wheelBase / 2, wr = T.wr;
    const bottom = wr * 0.75, belt = T.belt;
    const darker = new THREE.Color(color).multiplyScalar(0.75).getHex();
    const parts = [];
    // perfil lateral da carroceria inferior (z para frente, y para cima) com caixas de roda
    const ar = wr + 0.08;
    const front = [
      [-hl + 0.05, bottom + 0.05],
      [-wb - ar, bottom], { arc: [-wb, wr, ar] },
      [wb - ar, bottom], { arc: [wb, wr, ar] },
      [hl - 0.08, bottom],
      [hl, bottom + 0.15], [hl + 0.02, belt - 0.28], [hl - 0.12, belt - 0.16],
      [T.ws[0] + 0.1, belt],
    ];
    if (T.bed) {
      front.push([T.rw[0] - 0.05, belt], [-hl + 0.02, belt], [-hl, bottom + 0.1]);
    } else {
      front.push([T.rw[1] - 0.05, belt], [-hl + 0.18, belt - 0.05], [-hl + 0.02, belt - 0.2], [-hl, bottom + 0.15]);
    }
    parts.push(nonIdx(extrudeProfile(front, W, 0.06), color));
    // vidros (estufa)
    const gh = [[T.ws[0], belt - 0.01], [T.ws[1], T.roof], [T.rw[0], T.roof], [T.rw[1], belt - 0.01]];
    const glass = extrudeProfile(gh, W - 0.16, 0.0);
    // teto
    const roofLen = T.ws[1] - T.rw[0];
    parts.push(nonIdx(new THREE.BoxGeometry(W - 0.12, 0.06, roofLen + 0.08), color, M(0, T.roof + 0.02, (T.ws[1] + T.rw[0]) / 2)));
    // colunas A, B, C
    const pillar = (z1, y1, z2, y2, xs) => {
      const len = Math.hypot(z2 - z1, y2 - y1);
      const ang = Math.atan2(z2 - z1, y2 - y1);
      for (const s of [-1, 1]) parts.push(nonIdx(new THREE.BoxGeometry(0.07, len, 0.09), color, M(s * xs, (y1 + y2) / 2, (z1 + z2) / 2, ang, 0, 0)));
    };
    pillar(T.ws[0], belt, T.ws[1], T.roof, W / 2 - 0.1);
    pillar(T.rw[1], belt, T.rw[0], T.roof, W / 2 - 0.1);
    const bz = T.bed ? (T.ws[1] + T.rw[0]) / 2 - 0.1 : (T.ws[1] + T.rw[0]) / 2 - 0.1;
    pillar(bz, belt, bz, T.roof, W / 2 - 0.09);
    // para-choques, grade, frisos
    parts.push(nonIdx(new THREE.BoxGeometry(W + 0.04, 0.2, 0.16), 0x202224, M(0, bottom + 0.14, hl - 0.02)));
    parts.push(nonIdx(new THREE.BoxGeometry(W + 0.04, 0.2, 0.16), 0x202224, M(0, bottom + 0.14, -hl + 0.02)));
    parts.push(nonIdx(new THREE.BoxGeometry(W * 0.5, 0.14, 0.04), 0x101010, M(0, belt - 0.3, hl + 0.015)));
    for (let i = 0; i < 4; i++) parts.push(nonIdx(new THREE.BoxGeometry(W * 0.48, 0.012, 0.05), 0x777777, M(0, belt - 0.35 + i * 0.035, hl + 0.02)));
    for (const s of [-1, 1]) {
      parts.push(nonIdx(new THREE.BoxGeometry(0.03, 0.06, L * 0.78), darker, M(s * (W / 2 + 0.005), bottom + 0.2, 0)));
      // linhas das portas
      parts.push(nonIdx(new THREE.BoxGeometry(0.02, belt - bottom - 0.1, 0.015), 0x111111, M(s * (W / 2 + 0.008), (belt + bottom) / 2, T.ws[0] - 0.05)));
      parts.push(nonIdx(new THREE.BoxGeometry(0.02, belt - bottom - 0.1, 0.015), 0x111111, M(s * (W / 2 + 0.008), (belt + bottom) / 2, bz)));
      if (!T.bed && T.rw[1] < -1.5) parts.push(nonIdx(new THREE.BoxGeometry(0.02, belt - bottom - 0.12, 0.015), 0x111111, M(s * (W / 2 + 0.008), (belt + bottom) / 2, T.rw[1] + 0.15)));
      // maçanetas
      parts.push(nonIdx(new THREE.BoxGeometry(0.03, 0.03, 0.14), 0xbbbbbb, M(s * (W / 2 + 0.02), belt - 0.1, bz + 0.25)));
      parts.push(nonIdx(new THREE.BoxGeometry(0.03, 0.03, 0.14), 0xbbbbbb, M(s * (W / 2 + 0.02), belt - 0.1, bz - 0.65)));
      // retrovisores
      parts.push(nonIdx(new THREE.BoxGeometry(0.2, 0.12, 0.1), color, M(s * (W / 2 + 0.08), belt + 0.06, T.ws[0] - 0.15)));
      parts.push(nonIdx(new THREE.BoxGeometry(0.02, 0.09, 0.07), 0xa8b8c8, M(s * (W / 2 + 0.08), belt + 0.06, T.ws[0] - 0.205)));
    }
    // placas
    parts.push(nonIdx(new THREE.BoxGeometry(0.5, 0.13, 0.02), 0xeeeeee, M(0, bottom + 0.22, -hl - 0.07)));
    parts.push(nonIdx(new THREE.BoxGeometry(0.5, 0.13, 0.02), 0xeeeeee, M(0, bottom + 0.22, hl + 0.07)));
    // interior
    const seatC = 0x2a2a2e, dashC = 0x1e1e20;
    for (const sx of [0.38, -0.38]) {
      parts.push(nonIdx(new THREE.BoxGeometry(0.48, 0.14, 0.5), seatC, M(sx, bottom + 0.12, -0.12)));
      parts.push(nonIdx(new THREE.BoxGeometry(0.48, 0.62, 0.12), seatC, M(sx, bottom + 0.48, -0.42, -0.15, 0, 0)));
      parts.push(nonIdx(new THREE.BoxGeometry(0.26, 0.18, 0.1), seatC, M(sx, bottom + 0.88, -0.48, -0.1, 0, 0)));
    }
    if (!T.bed && T.rw[1] < -1.5) {
      parts.push(nonIdx(new THREE.BoxGeometry(W - 0.3, 0.16, 0.5), seatC, M(0, bottom + 0.14, -1.0)));
      parts.push(nonIdx(new THREE.BoxGeometry(W - 0.3, 0.55, 0.12), seatC, M(0, bottom + 0.45, -1.28, -0.15, 0, 0)));
    }
    parts.push(nonIdx(new THREE.BoxGeometry(W - 0.2, 0.22, 0.4), dashC, M(0, belt - 0.05, T.ws[0] - 0.28)));
    parts.push(nonIdx(new THREE.BoxGeometry(0.3, 0.1, 0.02), 0x3a6a9a, M(0.38, belt + 0.03, T.ws[0] - 0.49))); // painel
    parts.push(nonIdx(new THREE.BoxGeometry(0.2, 0.3, 0.5), dashC, M(0, bottom + 0.35, 0.25))); // console
    parts.push(nonIdx(new THREE.BoxGeometry(W - 0.1, 0.05, L * 0.6), 0x151515, M(0, bottom + 0.18, -0.1))); // assoalho
    if (T.bed) {
      // caçamba
      const bl = T.rw[0] + hl - 0.05;
      parts.push(nonIdx(new THREE.BoxGeometry(W - 0.1, 0.05, bl), 0x222222, M(0, belt - 0.35, -hl + bl / 2 + 0.05)));
      parts.push(nonIdx(new THREE.BoxGeometry(0.06, 0.08, bl), color, M(W / 2 - 0.05, belt + 0.02, -hl + bl / 2 + 0.05)));
      parts.push(nonIdx(new THREE.BoxGeometry(0.06, 0.08, bl), color, M(-W / 2 + 0.05, belt + 0.02, -hl + bl / 2 + 0.05)));
    }
    if (T.police) {
      for (const s of [-1, 1]) {
        parts.push(nonIdx(new THREE.BoxGeometry(0.02, 0.3, T.L * 0.45), 0x111a33, M(s * (W / 2 + 0.012), belt - 0.25, -0.2)));
        parts.push(nonIdx(new THREE.BoxGeometry(0.022, 0.08, T.L * 0.45), 0xd4af37, M(s * (W / 2 + 0.014), belt - 0.07, -0.2)));
      }
      parts.push(nonIdx(new THREE.BoxGeometry(0.9, 0.05, 0.25), 0x222222, M(0, T.roof + 0.07, -0.35)));
    }
    if (T.taxi) parts.push(nonIdx(new THREE.BoxGeometry(0.55, 0.16, 0.22), 0xf4f4f4, M(0, T.roof + 0.12, -0.4)));
    const bodyGeo = mergeGeometries(parts);
    this._lodParts = [bodyGeo];
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.castShadow = true; bodyMesh.receiveShadow = true;
    this.body.add(bodyMesh);
    const glassMesh = new THREE.Mesh(glass, glassMat);
    glassMesh.renderOrder = 2;
    this.body.add(glassMesh);
    // luzes
    const hg = [];
    for (const s of [-1, 1]) hg.push(new THREE.BoxGeometry(0.34, 0.12, 0.05).translate(s * (W / 2 - 0.28), belt - 0.24, hl + 0.005));
    this.body.add(new THREE.Mesh(mergeGeometries(hg), headMat));
    const tg = [];
    for (const s of [-1, 1]) tg.push(new THREE.BoxGeometry(0.36, 0.13, 0.05).translate(s * (W / 2 - 0.25), T.bed ? belt - 0.15 : belt - 0.2, -hl - 0.005));
    this.tail = new THREE.Mesh(mergeGeometries(tg), tailMat);
    this.body.add(this.tail);
    if (T.police) {
      this.sirenL = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.1, 0.22), sirenMats[0]);
      this.sirenR = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.1, 0.22), sirenMats[1]);
      this.sirenL.position.set(0.22, T.roof + 0.14, -0.35); this.sirenR.position.set(-0.22, T.roof + 0.14, -0.35);
      this.body.add(this.sirenL, this.sirenR);
    }
    // volante
    this.steeringWheel = new THREE.Group();
    this.steeringWheel.add(new THREE.Mesh(mergeGeometries([nonIdx(new THREE.TorusGeometry(0.17, 0.022, 6, 16), 0x111111), nonIdx(new THREE.BoxGeometry(0.3, 0.03, 0.02), 0x222222)]), wheelMat));
    this.steeringWheel.position.set(0.38, belt + 0.05, T.ws[0] - 0.55);
    this.steeringWheel.rotation.x = -0.45;
    this.steeringWheel.rotation.order = 'YXZ';
    this.body.add(this.steeringWheel);
    // rodas
    this.wheels = [];
    const wg = wheelGeo(wr);
    for (const [sx, sz] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) {
      const pivot = new THREE.Group();
      pivot.position.set(sx * (W / 2 - 0.14), wr, sz * wb);
      const spin = new THREE.Mesh(wg, wheelMat);
      spin.castShadow = true;
      if (sx < 0) spin.rotation.y = Math.PI; // aro virado para fora
      const holder = new THREE.Group(); holder.add(spin);
      pivot.add(holder);
      this.group.add(pivot);
      this.wheels.push({ pivot, holder, front: sz > 0, sx, sz });
    }
    // LOD: carroceria + rodas + luzes numa única malha (para carros distantes)
    const lp = [this._lodParts[0].clone()];
    for (const g of hg) lp.push(nonIdx(g, 0xfff0c0));
    lp.push(nonIdx(glass, 0x1c2630));
    for (const g of tg) lp.push(nonIdx(g, 0x7a1010));
    for (const w of this.wheels) {
      const m = new THREE.Matrix4().makeTranslation(w.pivot.position.x, w.pivot.position.y, w.pivot.position.z);
      if (w.sx < 0) m.multiply(new THREE.Matrix4().makeRotationY(Math.PI));
      lp.push(wg.clone().applyMatrix4(m));
    }
    this.lodMesh = new THREE.Mesh(mergeGeometries(lp), bodyMat);
    this.lodMesh.visible = false;
    this.group.add(this.lodMesh);
    this.detail = [bodyMesh, this.tail, this.steeringWheel, ...this.body.children.filter((c) => c.material === headMat), ...this.wheels.map((w) => w.pivot)];
    if (this.sirenL) this.detail.push(this.sirenL, this.sirenR);
    this.glassMesh = glassMesh;
    this.lod = false;
    this._lodParts = null;
    // seat do motorista (local)
    this.seat = new THREE.Vector3(0.38, bottom - 0.37, -0.1);
  }

  setLOD(far) {
    if (far === this.lod) return;
    this.lod = far;
    for (const o of this.detail) o.visible = !far;
    this.lodMesh.visible = far;
    this.glassMesh.visible = !far;
    if (far) { this.body.rotation.set(0, 0, 0); }
  }
  place(x, z, heading) {
    this.x = x; this.z = z; this.heading = heading;
    this.y = this.world.groundFn(x, z);
    this.syncTransform(0);
  }

  get forward() { return [Math.sin(this.heading), Math.cos(this.heading)]; }
  get right() { return [-Math.cos(this.heading), Math.sin(this.heading)]; }
  get velX() { return Math.sin(this.heading) * this.speed - Math.cos(this.heading) * this.lat + this.pushVx; }
  get velZ() { return Math.cos(this.heading) * this.speed + Math.sin(this.heading) * this.lat + this.pushVz; }
  get kmh() { return Math.abs(this.speed) * 3.6; }

  // posição mundial de um ponto local (x lateral, z frontal)
  local(lx, lz) {
    const s = Math.sin(this.heading), c = Math.cos(this.heading);
    return [this.x + lx * c + lz * s, this.z - lx * s + lz * c];
  }
  doorPos(side = 1) { return this.local(side * (this.T.W / 2 + 0.75), -0.1); }

  pushCircleOut(x, z, r, y0, y1) {
    if (y0 > this.y + this.height || y1 < this.y + 0.1) return null;
    const dx = x - this.x, dz = z - this.z;
    if (dx * dx + dz * dz > (this.T.L / 2 + r + 0.5) ** 2) return null;
    const s = Math.sin(this.heading), c = Math.cos(this.heading);
    // eixos locais: X do grupo (= -right), Z = forward
    const lx = dx * c - dz * s, lz = dx * s + dz * c;
    const hx = this.T.W / 2, hz = this.T.L / 2;
    const cx = Math.max(-hx, Math.min(lx, hx)), cz = Math.max(-hz, Math.min(lz, hz));
    let nx = lx - cx, nz = lz - cz;
    let d = Math.hypot(nx, nz);
    let px, pz;
    if (d > 1e-6) {
      if (d >= r) return null;
      nx /= d; nz /= d; px = cx + nx * r; pz = cz + nz * r;
    } else {
      const ex = hx - Math.abs(lx), ez = hz - Math.abs(lz);
      if (ex < ez) { nx = Math.sign(lx) || 1; nz = 0; px = nx * (hx + r); pz = lz; }
      else { nz = Math.sign(lz) || 1; nx = 0; px = lx; pz = nz * (hz + r); }
    }
    const wx = this.x + px * c + pz * s, wz = this.z - px * s + pz * c;
    const wnx = nx * c + nz * s, wnz = -nx * s + nz * c;
    return { x: wx, z: wz, nx: wnx, nz: wnz };
  }

  // raio contra a caixa do carro (para a câmera não atravessar carros)
  rayHit(ox, oy, oz, dx, dy, dz, maxDist) {
    const cx = ox - this.x, cz = oz - this.z;
    if (cx * cx + cz * cz > (maxDist + 4) ** 2) return Infinity;
    const s = Math.sin(this.heading), c = Math.cos(this.heading);
    const o = [cx * c - cz * s, oy - this.y, cx * s + cz * c];
    const d = [dx * c - dz * s, dy, dx * s + dz * c];
    const mn = [-this.T.W / 2, 0.1, -this.T.L / 2], mx = [this.T.W / 2, this.T.roof, this.T.L / 2];
    let t0 = 0, t1 = maxDist;
    for (let a = 0; a < 3; a++) {
      if (Math.abs(d[a]) < 1e-9) { if (o[a] < mn[a] || o[a] > mx[a]) return Infinity; continue; }
      let ta = (mn[a] - o[a]) / d[a], tb = (mx[a] - o[a]) / d[a];
      if (ta > tb) { const t = ta; ta = tb; tb = t; }
      t0 = Math.max(t0, ta); t1 = Math.min(t1, tb);
      if (t0 > t1) return Infinity;
    }
    return t0;
  }
  // input: {throttle, brake, steer, handbrake}
  update(dt, input, others) {
    const T = this.T;
    const inp = input || { throttle: 0, brake: 0, steer: 0, handbrake: 0 };
    const fwd = this.speed;
    // motor / freio
    let acc = 0;
    if (inp.throttle > 0) {
      if (fwd < -0.5) acc = 14 * inp.throttle; // freando da ré
      else acc = T.accel * inp.throttle * (1 - Math.min(1, Math.max(0, fwd) / T.maxSpeed) ** 2);
    }
    if (inp.brake > 0) {
      if (fwd > 0.5) acc -= 14 * inp.brake;
      else acc -= 4.5 * inp.brake * (fwd > -8 ? 1 : 0);
    }
    this.braking = inp.brake > 0 && fwd > 0.5 || inp.handbrake > 0;
    this.speed += acc * dt;
    // arrasto e resistência
    const drag = 0.0025 * this.speed * Math.abs(this.speed) + (inp.throttle || inp.brake ? 0.15 : 1.2) * Math.sign(this.speed);
    if (Math.abs(this.speed) < Math.abs(drag * dt) && !inp.throttle && !inp.brake) this.speed = 0;
    else this.speed -= drag * dt;
    if (inp.handbrake) this.speed = damp(this.speed, 0, 1.6, dt);
    // direção: limite diminui com a velocidade
    const maxSteer = 0.62 / (1 + Math.abs(this.speed) * 0.07);
    this.steer = damp(this.steer, (inp.steer || 0) * maxSteer, 7, dt);
    let targetYaw = this.speed * Math.tan(this.steer) / T.wheelBase;
    // limite de aderência lateral (~1.3 g): curvas realistas em alta velocidade
    const maxYaw = (inp.handbrake ? 20 : 13) / Math.max(4, Math.abs(this.speed));
    targetYaw = Math.max(-maxYaw, Math.min(maxYaw, targetYaw));
    // aderência lateral: freio de mão reduz e faz o carro derrapar
    const grip = inp.handbrake ? 2.2 : 9;
    this.yawRate = damp(this.yawRate, targetYaw * (inp.handbrake ? 1.25 : 1), grip, dt);
    this.heading += this.yawRate * dt;
    this.lat += (-this.yawRate * this.speed * (inp.handbrake ? 0.12 : 0.035)) * dt * 10;
    this.lat = damp(this.lat, 0, grip * 0.8, dt);
    // empurrão externo (batidas)
    this.pushVx = damp(this.pushVx, 0, 3, dt); this.pushVz = damp(this.pushVz, 0, 3, dt);
    this.x += this.velX * dt; this.z += this.velZ * dt;
    this.resolveCollisions(others);
    this.syncTransform(dt);
  }

  // integra apenas empurrões (carros estacionados que foram atingidos)
  updatePassive(dt) {
    if (Math.abs(this.pushVx) + Math.abs(this.pushVz) + Math.abs(this.speed) < 0.02) return false;
    this.speed = damp(this.speed, 0, 2, dt);
    this.pushVx = damp(this.pushVx, 0, 3, dt); this.pushVz = damp(this.pushVz, 0, 3, dt);
    this.x += this.velX * dt; this.z += this.velZ * dt;
    this.resolveCollisions(null);
    this.syncTransform(dt);
    return true;
  }

  resolveCollisions(others) {
    const T = this.T; const r = T.W / 2;
    let hitN = null;
    const n = Math.max(2, Math.round(T.L / T.W));
    for (let i = 0; i < n; i++) {
      const lz = -T.L / 2 + r + (i / (n - 1)) * (T.L - 2 * r);
      const [cx, cz] = this.local(0, lz);
      const res = this.world.resolveCircle(cx, cz, r, this.y + 0.3, this.y + 1.4, 0.0, this, true);
      if (res.hit) {
        this.x += res.x - cx; this.z += res.z - cz;
        hitN = [res.nx, res.nz];
      }
    }
    if (hitN) {
      const [f0, f1] = this.forward;
      const vx = this.velX, vz = this.velZ;
      const into = vx * hitN[0] + vz * hitN[1];
      const head = f0 * hitN[0] + f1 * hitN[1];
      const impact = Math.max(0, -into);
      // perde velocidade proporcional ao ângulo do impacto
      this.speed *= 1 - Math.min(0.85, Math.abs(head) * 0.9 + 0.05);
      if (Math.abs(head) > 0.6 && impact > 2) this.speed = -Math.sign(this.speed || 1) * impact * 0.15;
      this.lastHit = impact;
      // transfere impulso a outros carros próximos
      if (others) for (const o of others) {
        if (o === this) continue;
        const dx = o.x - this.x, dz = o.z - this.z;
        const d = Math.hypot(dx, dz);
        if (d < (T.L + o.T.L) / 2 + 0.3 && d > 0.01) {
          o.pushVx += (dx / d) * impact * 0.4; o.pushVz += (dz / d) * impact * 0.4;
          o.awake = true;
        }
      }
    } else this.lastHit = 0;
  }

  syncTransform(dt) {
    const T = this.T;
    const g = this.world.groundFn;
    const wb = T.wheelBase / 2, hw = T.W / 2 - 0.14;
    const [fx, fz] = this.local(0, wb), [bx, bz] = this.local(0, -wb);
    const [lx, lz] = this.local(hw, 0), [rx, rz] = this.local(-hw, 0);
    const hf = g(fx, fz), hb = g(bx, bz), hlft = g(lx, lz), hr = g(rx, rz);
    const ty = (hf + hb + hlft + hr) / 4;
    const k = dt > 0 ? 1 - Math.exp(-12 * dt) : 1;
    this.y += (ty - this.y) * k;
    const tPitch = Math.atan2(hb - hf, T.wheelBase) - (dt > 0 ? THREE.MathUtils.clamp((this.speed - (this._lastSpeed ?? this.speed)) / dt * 0.004, -0.04, 0.04) : 0);
    const tRoll = Math.atan2(hlft - hr, T.W) + THREE.MathUtils.clamp(this.yawRate * this.speed * 0.006, -0.06, 0.06);
    this._lastSpeed = this.speed;
    this.pitch += (tPitch - this.pitch) * k; this.roll += (tRoll - this.roll) * k;
    this.group.position.set(this.x, this.y, this.z);
    this.group.rotation.set(0, this.heading, 0);
    this.body.rotation.set(this.pitch, 0, this.roll);
    this.wheelSpin += this.speed / T.wr * dt;
    for (const w of this.wheels) {
      w.pivot.rotation.y = w.front ? this.steer : 0;
      w.holder.rotation.x = this.wheelSpin;
    }
    this.steeringWheel.rotation.z = -this.steer * 3;
    this.tail.material = this.braking ? tailBrakeMat : tailMat;
  }
}

let sirenT = 0;
export function updateSirens(dt) {
  sirenT += dt;
  const a = Math.floor(sirenT * 4) % 2 === 0;
  sirenMats[0].color.setHex(a ? 0xff1a1a : 0x330000);
  sirenMats[1].color.setHex(a ? 0x000033 : 0x2244ff);
}
export function setHeadlights(on) { headMat.color.setHex(on ? 0xfff6d8 : 0xc8c8c0); tailMat.color.setHex(on ? 0x9a1010 : 0x5a0a0a); }
