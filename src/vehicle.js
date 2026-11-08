// Veículos dirigíveis: modelo 3D procedural detalhado (carroceria, vidros, interior, rodas, luzes)
// e física arcade estável (aceleração, frenagem, ré, freio de mão, direção dependente da velocidade, colisões).
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { colorize } from './geo.js';
import { envRT } from './materials.js';

const damp = (a, b, k, dt) => a + (b - a) * (1 - Math.exp(-k * dt));

// Tipos de veículo. Direção: grip (aderência lateral), brake (frenagem m/s²), drift (escorregada no freio de mão),
// steer (ângulo máximo de direção). Modelos com nomes fictícios.
export const CAR_TYPES = {
  sedan: { L: 4.6, W: 1.82, wheelBase: 2.75, wr: 0.34, belt: 0.95, roof: 1.43, ws: [1.05, 0.25], rw: [-1.0, -1.8], maxSpeed: 46, accel: 7.5, brake: 13, grip: 9, drift: 1, steer: 0.62, tank: 50, sound: 'normal', name: 'Sedan Aurora' },
  hatch: { L: 4.0, W: 1.75, wheelBase: 2.5, wr: 0.32, belt: 0.93, roof: 1.47, ws: [0.85, 0.05], rw: [-1.45, -1.85], maxSpeed: 42, accel: 7.0, brake: 13, grip: 9.5, drift: 1.1, steer: 0.66, tank: 45, sound: 'normal', name: 'Hatch Pulse' },
  popular: { L: 3.7, W: 1.66, wheelBase: 2.38, wr: 0.3, belt: 0.92, roof: 1.48, ws: [0.75, 0.0], rw: [-1.25, -1.55], maxSpeed: 39, accel: 5.6, brake: 12, grip: 9, drift: 1.1, steer: 0.68, tank: 40, sound: 'small', name: 'Popular 1.0' },
  suv: { L: 4.75, W: 1.95, wheelBase: 2.85, wr: 0.4, belt: 1.1, roof: 1.75, ws: [1.15, 0.35], rw: [-1.95, -2.2], maxSpeed: 40, accel: 6.5, brake: 12, grip: 8.2, drift: 0.8, steer: 0.58, tank: 70, sound: 'heavy', name: 'SUV Montana' },
  pickup: { L: 5.2, W: 1.95, wheelBase: 3.15, wr: 0.4, belt: 1.08, roof: 1.78, ws: [1.45, 0.75], rw: [-0.35, -0.45], maxSpeed: 39, accel: 6.2, brake: 11, grip: 8, drift: 0.9, steer: 0.56, tank: 80, bed: true, sound: 'heavy', name: 'Picape Bravo' },
  luxo: { L: 5.15, W: 1.92, wheelBase: 3.1, wr: 0.36, belt: 0.98, roof: 1.47, ws: [1.25, 0.35], rw: [-1.2, -2.0], maxSpeed: 60, accel: 9, brake: 15, grip: 9.5, drift: 0.8, steer: 0.58, tank: 80, chrome: true, sound: 'v8', name: 'Imperial Luxo' },
  coupe: { L: 4.45, W: 1.9, wheelBase: 2.65, wr: 0.35, belt: 0.84, roof: 1.27, ws: [0.95, 0.05], rw: [-0.85, -1.85], maxSpeed: 68, accel: 11.5, brake: 16, grip: 10.8, drift: 1.2, steer: 0.6, tank: 60, twoDoor: true, sound: 'v8', name: 'Coupé GT Sombra' },
  classico: { L: 5.05, W: 1.95, wheelBase: 3.0, wr: 0.36, belt: 0.92, roof: 1.4, ws: [1.05, 0.3], rw: [-1.15, -1.75], maxSpeed: 42, accel: 6, brake: 9, grip: 7.2, drift: 1.3, steer: 0.55, tank: 70, chrome: true, fins: true, whitewall: true, sound: 'v8', name: 'Clássico 1965' },
  besouro: { L: 4.08, W: 1.58, wheelBase: 2.4, wr: 0.33, belt: 0.86, roof: 1.5, ws: [0.78, 0.15], rw: [-0.95, -1.15], maxSpeed: 34, accel: 4.4, brake: 9.5, grip: 8.2, drift: 1.2, steer: 0.64, tank: 40, shape: 'besouro', chrome: true, sound: 'boxer', name: 'Besouro 1300 (clássico)' },
  furia: { L: 4.65, W: 2.02, wheelBase: 2.72, wr: 0.36, belt: 0.78, roof: 1.12, ws: [0.75, -0.15], rw: [-0.95, -2.0], maxSpeed: 94, accel: 16, brake: 19, grip: 12.5, drift: 1.1, steer: 0.58, tank: 90, shape: 'wedge', spoiler: true, twoDoor: true, sound: 'v12', name: 'Fúria V12 (superesportivo)' },
  police: { L: 4.7, W: 1.85, wheelBase: 2.8, wr: 0.35, belt: 0.97, roof: 1.45, ws: [1.05, 0.25], rw: [-1.0, -1.8], maxSpeed: 54, accel: 9.5, brake: 15, grip: 10, drift: 1, steer: 0.6, tank: 60, police: true, sound: 'v8', name: 'Viatura' },
  taxi: { L: 4.6, W: 1.82, wheelBase: 2.75, wr: 0.34, belt: 0.95, roof: 1.43, ws: [1.05, 0.25], rw: [-1.0, -1.8], maxSpeed: 44, accel: 7.2, brake: 13, grip: 9, drift: 1, steer: 0.62, tank: 50, taxi: true, sound: 'normal', name: 'Táxi' },
};
export const CAR_COLORS = [0x8e1b1b, 0x1d3f72, 0xd9d9d9, 0x1a1a1a, 0x3f4a52, 0x6b6f73, 0x2e5a3a, 0x9c7a2c, 0xf2f2f2, 0x5a1f3d, 0x274b5e, 0xb25a1f, 0xd8c040, 0x3a7ab8, 0x6a8a3a];
export const CIVIL_TYPES = ['sedan', 'hatch', 'popular', 'suv', 'pickup', 'luxo', 'coupe', 'classico', 'besouro', 'sedan', 'hatch', 'popular', 'taxi'];

// Rodas disponíveis na oficina
export const WHEELS = {
  padrao: { name: 'Padrão (5 raios)', spokes: 5, rim: 0xa9adb2, spoke: 0xd0d3d6 },
  esportiva: { name: 'Esportiva (10 raios)', spokes: 10, rim: 0x1a1a1a, spoke: 0x2a2a2a },
  cromada: { name: 'Cromada', spokes: 6, rim: 0xe8e8ec, spoke: 0xffffff },
  dourada: { name: 'Dourada', spokes: 8, rim: 0xc8a040, spoke: 0xe0c060 },
  classica: { name: 'Clássica (calota)', spokes: 0, rim: 0xd8d8d8, spoke: 0xffffff, whitewall: true },
  offroad: { name: 'Off-road', spokes: 6, rim: 0x2a2a2a, spoke: 0x444444, chunky: true },
};
export function defaultMods(type, color) {
  const T = CAR_TYPES[type];
  return { color, wheel: T.whitewall ? 'classica' : type === 'furia' ? 'esportiva' : 'padrao', spoiler: !!T.spoiler, skirts: false, tint: 0, neon: null, xenon: false, engine: 0, brakes: 0, susp: 0, turbo: false };
}

const bodyMat = new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 90, specular: 0x666666, envMap: envRT.texture, combine: THREE.MixOperation, reflectivity: 0.22 });
const glassMat = new THREE.MeshPhongMaterial({ color: 0x1a2530, transparent: true, opacity: 0.5, shininess: 120, specular: 0xaaaaaa, depthWrite: false, envMap: envRT.texture, combine: THREE.MixOperation, reflectivity: 0.45 });
const wheelMat = new THREE.MeshLambertMaterial({ vertexColors: true });
const headMat = new THREE.MeshBasicMaterial({ color: 0xfff6d8 });
const xenonMat = new THREE.MeshBasicMaterial({ color: 0xcfe4ff });
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
function wheelGeo(r, style = 'padrao') {
  const key = r + style; if (wheelGeoCache.has(key)) return wheelGeoCache.get(key);
  const S = WHEELS[style] || WHEELS.padrao; const parts = []; const w = S.chunky ? 0.3 : 0.24;
  parts.push(nonIdx(new THREE.CylinderGeometry(r, r, w, 18), 0x161616, M(0, 0, 0, 0, 0, Math.PI / 2)));
  parts.push(nonIdx(new THREE.TorusGeometry(r * 0.86, r * 0.14, 4, 14), 0x1f1f1f, M(w / 2 - 0.02, 0, 0, 0, Math.PI / 2, 0)));
  if (S.whitewall) parts.push(nonIdx(new THREE.TorusGeometry(r * 0.76, r * 0.08, 4, 18), 0xf0f0f0, M(w / 2, 0, 0, 0, Math.PI / 2, 0)));
  parts.push(nonIdx(new THREE.CylinderGeometry(r * 0.62, r * 0.62, w + 0.02, 16), S.rim, M(0, 0, 0, 0, 0, Math.PI / 2)));
  parts.push(nonIdx(new THREE.CylinderGeometry(r * 0.15, r * 0.15, w + 0.05, 8), 0x6b6e72, M(0, 0, 0, 0, 0, Math.PI / 2)));
  if (!S.spokes) parts.push(nonIdx(new THREE.SphereGeometry(r * 0.5, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2), S.spoke, M(w / 2 - 0.02, 0, 0, 0, 0, -Math.PI / 2, 1, 0.35, 1)));
  for (let i = 0; i < S.spokes; i++) {
    const a = (i / S.spokes) * Math.PI * 2;
    parts.push(nonIdx(new THREE.BoxGeometry(0.03, r * 0.95, S.spokes > 8 ? 0.04 : 0.07), S.spoke, M(w / 2 + 0.012, 0, 0, a, 0, 0)));
  }
  const g = mergeGeometries(parts);
  wheelGeoCache.set(key, g);
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
  constructor(type = 'sedan', color = 0x8e1b1b, world, mods = null) {
    this.id = carIdCounter++;
    this.type = type;
    const T = this.T = CAR_TYPES[type] || CAR_TYPES.sedan;
    this.world = world;
    if (T.police) color = 0xf4f4f4;
    if (T.taxi) color = 0xe8c21a;
    this.color = color;
    this.mods = { ...defaultMods(type, color), ...(mods || {}) };
    this.group = new THREE.Group();
    this.body = new THREE.Group(); // inclinação (pitch/roll) aplicada aqui
    this.group.add(this.body);
    this.built = [];
    this.build(this.mods.color);
    // estado físico
    this.x = 0; this.z = 0; this.y = 0; this.heading = 0;
    this.speed = 0; this.lat = 0; this.steer = 0; this.yawRate = 0;
    this.pushVx = 0; this.pushVz = 0;
    this.pitch = 0; this.roll = 0; this.wheelSpin = 0;
    this.collidable = true; this.height = T.roof;
    this.driver = null; // 'player' | 'ai' | null
    this.braking = false; this.lastHit = 0;
    this.engineOn = false;
    this.tank = T.tank || 50;
    this.fuel = 0.35 + Math.random() * 0.65; this.health = 1;
  }
  // características efetivas (tipo + melhorias da oficina)
  get stats() {
    const T = this.T, m = this.mods;
    return {
      accel: T.accel * (1 + 0.12 * m.engine + (m.turbo ? 0.15 : 0)), maxSpeed: T.maxSpeed * (1 + 0.05 * m.engine + (m.turbo ? 0.06 : 0)),
      brake: (T.brake || 13) * (1 + 0.15 * m.brakes), grip: (T.grip || 9) * (1 + 0.07 * m.susp), drift: T.drift || 1, steer: T.steer || 0.62,
    };
  }
  // reconstrói o visual (pintura, rodas, peças) mantendo física e ocupantes
  rebuild() {
    for (const o of this.built) { if (o.parent) o.parent.remove(o); }
    this.built = [];
    this.build(this.mods.color);
    this.lod = false;
    this.syncTransform(0);
  }
  _add(parent, obj) { parent.add(obj); this.built.push(obj); return obj; }

  build(color) {
    const T = this.T, m = this.mods; const L = T.L, W = T.W, hl = L / 2;
    const wb = T.wheelBase / 2, wr = T.wr;
    const bottom = wr * 0.75 - m.susp * 0.03, belt = T.belt;
    const darker = new THREE.Color(color).multiplyScalar(0.75).getHex();
    const chrome = 0xd8dade, trimC = T.chrome ? chrome : 0x202224;
    const parts = [];
    const ar = wr + 0.08;
    let glass;
    if (T.shape === 'besouro') {
      // carroceria arredondada estilo clássico dos anos 60
      const p = [[-hl + 0.1, bottom + 0.1], [-wb - ar, bottom], { arc: [-wb, wr, ar] }, [wb - ar, bottom], { arc: [wb, wr, ar] }, [hl - 0.1, bottom + 0.05],
        [hl, bottom + 0.22], [hl - 0.04, 0.6], [hl - 0.25, 0.76], [hl - 0.6, 0.84], [T.ws[0] + 0.1, belt],
        [T.rw[1] - 0.05, belt], [-hl + 0.55, 0.82], [-hl + 0.22, 0.68], [-hl + 0.05, 0.5]];
      parts.push(nonIdx(extrudeProfile(p, W - 0.1, 0.08), color));
      glass = extrudeProfile([[T.ws[0], belt - 0.01], [0.45, 1.28], [0.12, 1.44], [-0.45, 1.46], [-0.82, 1.3], [T.rw[1], belt - 0.01]], W - 0.24, 0);
      // teto arredondado
      parts.push(nonIdx(new THREE.SphereGeometry(1, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), color, M(0, 1.3, -0.18, 0, 0, 0, W / 2 - 0.1, 0.2, 0.62)));
      // para-lamas salientes
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) parts.push(nonIdx(new THREE.SphereGeometry(1, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), color, M(sx * (W / 2 - 0.08), wr + 0.04, sz * wb, 0, 0, 0, 0.26, 0.44, 0.58)));
      for (const sx of [-1, 1]) parts.push(nonIdx(new THREE.BoxGeometry(0.12, 0.08, wb * 2 - 0.9), 0x1a1a1a, M(sx * (W / 2 + 0.04), bottom + 0.06, 0))); // estribo
    } else if (T.shape === 'wedge') {
      // superesportivo em cunha, muito baixo
      const p = [[-hl + 0.05, bottom + 0.08], [-wb - ar, bottom], { arc: [-wb, wr, ar] }, [wb - ar, bottom], { arc: [wb, wr, ar] }, [hl - 0.05, bottom],
        [hl + 0.05, bottom + 0.1], [hl - 0.05, 0.5], [hl - 0.55, 0.64], [T.ws[0] + 0.1, belt],
        [T.rw[1] + 0.2, 0.86], [-hl + 0.25, 0.84], [-hl + 0.02, 0.7], [-hl, bottom + 0.15]];
      parts.push(nonIdx(extrudeProfile(p, W, 0.06), color));
      glass = extrudeProfile([[T.ws[0], belt - 0.01], [T.ws[1], T.roof], [T.rw[0], T.roof - 0.02], [T.rw[1] + 0.2, 0.86]], W - 0.42, 0);
      parts.push(nonIdx(new THREE.BoxGeometry(W - 0.4, 0.05, T.ws[1] - T.rw[0] + 0.06), color, M(0, T.roof + 0.01, (T.ws[1] + T.rw[0]) / 2)));
      for (const s of [-1, 1]) {
        parts.push(nonIdx(new THREE.BoxGeometry(0.06, 0.26, 0.7), 0x0a0a0a, M(s * (W / 2 + 0.005), 0.58, -0.7, 0, s * 0.15, 0))); // entradas de ar
        parts.push(nonIdx(new THREE.BoxGeometry(0.05, 0.5, 0.06), color, M(s * (W / 2 - 0.2), (belt + T.roof) / 2, T.ws[0] - 0.4, -0.9, 0, 0)));
      }
      parts.push(nonIdx(new THREE.BoxGeometry(W * 0.7, 0.12, 0.05), 0x0a0a0a, M(0, bottom + 0.2, hl + 0.06)));
      parts.push(nonIdx(new THREE.BoxGeometry(W * 0.9, 0.18, 0.05), 0x0a0a0a, M(0, bottom + 0.25, -hl - 0.01)));
    } else {
      const front = [
        [-hl + 0.05, bottom + 0.05],
        [-wb - ar, bottom], { arc: [-wb, wr, ar] },
        [wb - ar, bottom], { arc: [wb, wr, ar] },
        [hl - 0.08, bottom],
        [hl, bottom + 0.15], [hl + 0.02, belt - 0.28], [hl - 0.12, belt - 0.16],
        [T.ws[0] + 0.1, belt],
      ];
      if (T.bed) front.push([T.rw[0] - 0.05, belt], [-hl + 0.02, belt], [-hl, bottom + 0.1]);
      else front.push([T.rw[1] - 0.05, belt], [-hl + 0.18, belt - 0.05], [-hl + 0.02, belt - 0.2], [-hl, bottom + 0.15]);
      parts.push(nonIdx(extrudeProfile(front, W, 0.06), color));
      glass = extrudeProfile([[T.ws[0], belt - 0.01], [T.ws[1], T.roof], [T.rw[0], T.roof], [T.rw[1], belt - 0.01]], W - 0.16, 0.0);
      const roofLen = T.ws[1] - T.rw[0];
      parts.push(nonIdx(new THREE.BoxGeometry(W - 0.12, 0.06, roofLen + 0.08), color, M(0, T.roof + 0.02, (T.ws[1] + T.rw[0]) / 2)));
      const pillar = (z1, y1, z2, y2, xs) => {
        const len = Math.hypot(z2 - z1, y2 - y1), ang = Math.atan2(z2 - z1, y2 - y1);
        for (const s of [-1, 1]) parts.push(nonIdx(new THREE.BoxGeometry(0.07, len, 0.09), color, M(s * xs, (y1 + y2) / 2, (z1 + z2) / 2, ang, 0, 0)));
      };
      pillar(T.ws[0], belt, T.ws[1], T.roof, W / 2 - 0.1);
      pillar(T.rw[1], belt, T.rw[0], T.roof, W / 2 - 0.1);
      if (!T.twoDoor) { const bz = (T.ws[1] + T.rw[0]) / 2 - 0.1; pillar(bz, belt, bz, T.roof, W / 2 - 0.09); }
      // para-choques e grade
      parts.push(nonIdx(new THREE.BoxGeometry(W + 0.04, 0.2, 0.16), trimC, M(0, bottom + 0.14, hl - 0.02)));
      parts.push(nonIdx(new THREE.BoxGeometry(W + 0.04, 0.2, 0.16), trimC, M(0, bottom + 0.14, -hl + 0.02)));
      parts.push(nonIdx(new THREE.BoxGeometry(W * (T.chrome ? 0.62 : 0.5), 0.14 + (T.chrome ? 0.06 : 0), 0.04), T.chrome ? 0xbfc2c6 : 0x101010, M(0, belt - 0.3, hl + 0.015)));
      for (let i = 0; i < 4; i++) parts.push(nonIdx(new THREE.BoxGeometry(W * 0.48, 0.012, 0.05), T.chrome ? 0x777777 : 0x777777, M(0, belt - 0.35 + i * 0.035, hl + 0.02)));
      if (T.fins) for (const s of [-1, 1]) parts.push(nonIdx(new THREE.BoxGeometry(0.06, 0.22, 1.1), color, M(s * (W / 2 - 0.05), belt + 0.08, -hl + 0.6, 0.12, 0, 0)));
    }
    // frisos, portas, retrovisores
    const doorZ = T.twoDoor ? (T.ws[0] - 1.2) : (T.ws[1] + T.rw[0]) / 2 - 0.1;
    for (const s of [-1, 1]) {
      if (T.shape !== 'besouro') parts.push(nonIdx(new THREE.BoxGeometry(0.03, 0.06, L * 0.78), T.chrome ? chrome : darker, M(s * (W / 2 + 0.005), bottom + 0.2, 0)));
      parts.push(nonIdx(new THREE.BoxGeometry(0.02, belt - bottom - 0.1, 0.015), 0x111111, M(s * (W / 2 + 0.008), (belt + bottom) / 2, T.ws[0] - 0.05)));
      parts.push(nonIdx(new THREE.BoxGeometry(0.02, belt - bottom - 0.1, 0.015), 0x111111, M(s * (W / 2 + 0.008), (belt + bottom) / 2, doorZ)));
      parts.push(nonIdx(new THREE.BoxGeometry(0.03, 0.03, 0.14), 0xbbbbbb, M(s * (W / 2 + 0.02), belt - 0.1, doorZ + 0.25)));
      parts.push(nonIdx(new THREE.BoxGeometry(0.2, 0.12, 0.1), color, M(s * (W / 2 + 0.08), belt + 0.06, T.ws[0] - 0.15)));
      parts.push(nonIdx(new THREE.BoxGeometry(0.02, 0.09, 0.07), 0xa8b8c8, M(s * (W / 2 + 0.08), belt + 0.06, T.ws[0] - 0.205)));
      if (m.skirts) parts.push(nonIdx(new THREE.BoxGeometry(0.08, 0.12, wb * 2 - 0.85), darker, M(s * (W / 2 + 0.02), bottom + 0.02, 0)));
    }
    parts.push(nonIdx(new THREE.BoxGeometry(0.5, 0.13, 0.02), 0xeeeeee, M(0, bottom + 0.22, -hl - 0.07)));
    parts.push(nonIdx(new THREE.BoxGeometry(0.5, 0.13, 0.02), 0xeeeeee, M(0, bottom + 0.22, hl + 0.07)));
    // interior
    const seatC = T.chrome || T.shape === 'wedge' ? 0x5a2a1e : 0x2a2a2e, dashC = 0x1e1e20;
    for (const sx of [0.38, -0.38]) {
      parts.push(nonIdx(new THREE.BoxGeometry(0.48, 0.14, 0.5), seatC, M(sx, bottom + 0.12, -0.12)));
      parts.push(nonIdx(new THREE.BoxGeometry(0.48, 0.62, 0.12), seatC, M(sx, bottom + 0.48, -0.42, -0.15, 0, 0)));
      parts.push(nonIdx(new THREE.BoxGeometry(0.26, 0.18, 0.1), seatC, M(sx, bottom + 0.88, -0.48, -0.1, 0, 0)));
    }
    if (!T.bed && !T.twoDoor && T.shape !== 'wedge' && T.rw[1] < -1.1) {
      parts.push(nonIdx(new THREE.BoxGeometry(W - 0.35, 0.16, 0.5), seatC, M(0, bottom + 0.14, -1.0)));
      parts.push(nonIdx(new THREE.BoxGeometry(W - 0.35, 0.55, 0.12), seatC, M(0, bottom + 0.45, -1.28, -0.15, 0, 0)));
    }
    parts.push(nonIdx(new THREE.BoxGeometry(W - 0.2, 0.22, 0.4), dashC, M(0, belt - 0.05, T.ws[0] - 0.28)));
    parts.push(nonIdx(new THREE.BoxGeometry(0.3, 0.1, 0.02), T.shape === 'wedge' ? 0xd06a1a : 0x3a6a9a, M(0.38, belt + 0.03, T.ws[0] - 0.49)));
    parts.push(nonIdx(new THREE.BoxGeometry(0.2, 0.3, 0.5), dashC, M(0, bottom + 0.35, 0.25)));
    parts.push(nonIdx(new THREE.BoxGeometry(W - 0.15, 0.05, L * 0.6), 0x151515, M(0, bottom + 0.18, -0.1)));
    if (T.bed) {
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
    // aerofólio
    if (m.spoiler) {
      const sy = T.shape === 'wedge' ? 1.08 : belt + 0.32, sz = -hl + 0.28;
      parts.push(nonIdx(new THREE.BoxGeometry(W - 0.2, 0.04, 0.34), T.shape === 'wedge' ? 0x111111 : color, M(0, sy, sz, -0.08, 0, 0)));
      for (const s of [-0.55, 0.55]) parts.push(nonIdx(new THREE.BoxGeometry(0.05, sy - belt + 0.1, 0.12), 0x111111, M(s * W / 2, (sy + belt - 0.1) / 2, sz + 0.05)));
    }
    const bodyGeo = mergeGeometries(parts);
    const bodyMesh = this._add(this.body, new THREE.Mesh(bodyGeo, bodyMat));
    bodyMesh.castShadow = true; bodyMesh.receiveShadow = true;
    // vidros (película escurece)
    let gm = glassMat;
    if (m.tint) { gm = glassMat.clone(); gm.opacity = [0.5, 0.75, 0.9][m.tint]; gm.color.setHex(0x0a0e12); }
    const glassMesh = this._add(this.body, new THREE.Mesh(glass, gm));
    glassMesh.renderOrder = 2;
    // luzes
    const hg = [];
    if (T.shape === 'besouro') { for (const s of [-1, 1]) hg.push(new THREE.SphereGeometry(0.11, 10, 8).translate(s * (W / 2 - 0.12), wr + 0.34, wb + 0.42)); }
    else if (T.shape === 'wedge') { for (const s of [-1, 1]) hg.push(new THREE.BoxGeometry(0.42, 0.06, 0.12).rotateX(0.5).translate(s * (W / 2 - 0.35), 0.6, hl - 0.38)); }
    else for (const s of [-1, 1]) hg.push(new THREE.BoxGeometry(0.34, 0.12, 0.05).translate(s * (W / 2 - 0.28), belt - 0.24, hl + 0.005));
    this._add(this.body, new THREE.Mesh(mergeGeometries(hg), m.xenon ? xenonMat : headMat));
    const tg = [];
    if (T.shape === 'wedge') tg.push(new THREE.BoxGeometry(W - 0.3, 0.05, 0.04).translate(0, 0.74, -hl - 0.01));
    else if (T.shape === 'besouro') { for (const s of [-1, 1]) tg.push(new THREE.BoxGeometry(0.12, 0.2, 0.06).translate(s * (W / 2 - 0.12), wr + 0.32, -wb - 0.42)); }
    else for (const s of [-1, 1]) tg.push(new THREE.BoxGeometry(0.36, 0.13, 0.05).translate(s * (W / 2 - 0.25), T.bed ? belt - 0.15 : belt - 0.2, -hl - 0.005));
    this.tail = this._add(this.body, new THREE.Mesh(mergeGeometries(tg), tailMat));
    if (T.police) {
      this.sirenL = this._add(this.body, new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.1, 0.22), sirenMats[0]));
      this.sirenR = this._add(this.body, new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.1, 0.22), sirenMats[1]));
      this.sirenL.position.set(0.22, T.roof + 0.14, -0.35); this.sirenR.position.set(-0.22, T.roof + 0.14, -0.35);
    }
    // neon embaixo do carro
    if (m.neon != null) {
      const nm = new THREE.MeshBasicMaterial({ color: m.neon, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false });
      const neon = this._add(this.group, new THREE.Mesh(new THREE.PlaneGeometry(W + 0.8, L + 0.4).rotateX(-Math.PI / 2), nm));
      neon.position.y = 0.04;
    }
    // volante
    this.steeringWheel = this._add(this.body, new THREE.Group());
    this.steeringWheel.add(new THREE.Mesh(mergeGeometries([nonIdx(new THREE.TorusGeometry(0.17, 0.022, 6, 16), 0x111111), nonIdx(new THREE.BoxGeometry(0.3, 0.03, 0.02), 0x222222)]), wheelMat));
    this.steeringWheel.position.set(0.38, belt + 0.05, T.ws[0] - 0.55);
    this.steeringWheel.rotation.x = -0.45;
    this.steeringWheel.rotation.order = 'YXZ';
    // rodas
    this.wheels = [];
    const wg = wheelGeo(wr, m.wheel);
    for (const [sx, sz] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) {
      const pivot = this._add(this.group, new THREE.Group());
      pivot.position.set(sx * (W / 2 - 0.14), wr, sz * wb);
      const spin = new THREE.Mesh(wg, wheelMat);
      spin.castShadow = true;
      if (sx < 0) spin.rotation.y = Math.PI;
      const holder = new THREE.Group(); holder.add(spin);
      pivot.add(holder);
      this.wheels.push({ pivot, holder, front: sz > 0, sx, sz });
    }
    // LOD: tudo numa malha só (carros distantes)
    const lp = [bodyGeo.clone()];
    for (const g of hg) lp.push(nonIdx(g, 0xfff0c0));
    lp.push(nonIdx(glass, 0x1c2630));
    for (const g of tg) lp.push(nonIdx(g, 0x7a1010));
    for (const w of this.wheels) {
      const mm = new THREE.Matrix4().makeTranslation(w.pivot.position.x, w.pivot.position.y, w.pivot.position.z);
      if (w.sx < 0) mm.multiply(new THREE.Matrix4().makeRotationY(Math.PI));
      lp.push(wg.clone().applyMatrix4(mm));
    }
    this.lodMesh = this._add(this.group, new THREE.Mesh(mergeGeometries(lp), bodyMat));
    this.lodMesh.visible = false;
    this.detail = [bodyMesh, this.tail, this.steeringWheel, ...this.body.children.filter((c) => c.material === headMat || c.material === xenonMat), ...this.wheels.map((w) => w.pivot)];
    if (this.sirenL) this.detail.push(this.sirenL, this.sirenR);
    this.glassMesh = glassMesh;
    this.lod = false;
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
    const T = this.T; const st = this.stats;
    const inp = input || { throttle: 0, brake: 0, steer: 0, handbrake: 0 };
    const fwd = this.speed; const hb = inp.handbrake > 0;
    // motor / freio
    let acc = 0;
    let thr = inp.throttle || 0;
    if (this.driver === 'player') {
      this.fuel = Math.max(0, this.fuel - Math.abs(this.speed) * dt / (9000 * this.tank / 55));
      if (this.fuel <= 0) thr = Math.min(thr, 0.12);
    }
    const hp = 0.45 + 0.55 * this.health;
    const vmax = st.maxSpeed * hp;
    if (thr > 0) {
      if (fwd < -0.5) acc = st.brake * thr;
      else acc = st.accel * hp * thr * (1 - Math.min(1, Math.max(0, fwd) / vmax) ** 2);
    }
    if (inp.brake > 0) {
      if (fwd > 0.5) acc -= st.brake * inp.brake;
      else acc -= 4.5 * inp.brake * (fwd > -8 ? 1 : 0);
    }
    this.braking = inp.brake > 0 && fwd > 0.5 || hb;
    this.speed += acc * dt;
    const drag = 0.0025 * this.speed * Math.abs(this.speed) * (40 / Math.max(30, st.maxSpeed)) + (inp.throttle || inp.brake ? 0.15 : 1.2) * Math.sign(this.speed);
    if (Math.abs(this.speed) < Math.abs(drag * dt) && !inp.throttle && !inp.brake) this.speed = 0;
    else this.speed -= drag * dt;
    // freio de mão: trava as rodas traseiras => desaceleração firme e constante (não desliza sem fim)
    if (hb) { const d = Math.min(Math.abs(this.speed), 6.5 * dt); this.speed -= Math.sign(this.speed) * d; }
    // direção: ângulo máximo diminui com a velocidade
    const maxSteer = st.steer / (1 + Math.abs(this.speed) * 0.07);
    this.steer = damp(this.steer, (inp.steer || 0) * maxSteer, 7, dt);
    let targetYaw = this.speed * Math.tan(this.steer) / T.wheelBase;
    // limite de aderência lateral (depende do carro); com freio de mão a traseira solta um pouco
    const gripLimit = st.grip * (hb ? 1.35 : 1.4);
    const maxYaw = gripLimit / Math.max(4, Math.abs(this.speed));
    targetYaw = Math.max(-maxYaw, Math.min(maxYaw, targetYaw * (hb ? 1.15 : 1)));
    this.yawRate = damp(this.yawRate, targetYaw, hb ? 5.5 : 9, dt);
    this.heading += this.yawRate * dt;
    // derrapagem controlada: velocidade lateral limitada e que se recupera rápido ao soltar
    const slip = hb ? 0.05 * st.drift : 0.012;
    this.lat += -this.yawRate * this.speed * slip * dt * 10;
    const latMax = Math.abs(this.speed) * (hb ? 0.32 : 0.12);
    this.lat = Math.max(-latMax, Math.min(latMax, this.lat));
    this.lat = damp(this.lat, 0, hb ? st.grip * 0.55 : st.grip * 1.1, dt);
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
