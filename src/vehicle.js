// Veículos dirigíveis: modelo 3D procedural detalhado (carroceria, vidros, interior, rodas, luzes)
// e física arcade estável (aceleração, frenagem, ré, freio de mão, direção dependente da velocidade, colisões).
import * as THREE from 'three';
import { mergeGeometries, toCreasedNormals } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { colorize } from './geo.js';
import { envRT, mats, signMat } from './materials.js';

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
  besouro: { L: 4.08, W: 1.58, wheelBase: 2.4, wr: 0.33, belt: 0.86, roof: 1.5, ws: [0.78, 0.15], rw: [-0.95, -1.15], maxSpeed: 34, accel: 4.4, brake: 9.5, grip: 8.2, drift: 1.2, steer: 0.64, tank: 40, shape: 'besouro', chrome: true, rearEngine: true, sound: 'boxer', name: 'Besouro 1300 (clássico)' },
  furia: { L: 4.65, W: 2.02, wheelBase: 2.72, wr: 0.33, belt: 0.81, roof: 1.12, ws: [0.75, -0.15], rw: [-0.95, -2.0], maxSpeed: 94, accel: 16, brake: 19, grip: 12.5, drift: 1.1, steer: 0.58, tank: 90, shape: 'wedge', spoiler: true, twoDoor: true, sound: 'v12', name: 'Fúria V12 (superesportivo)' },
  moto_esportiva: { L: 2.05, W: 0.75, wheelBase: 1.42, wr: 0.31, belt: 0.9, roof: 1.2, ws: [0.6, 0.3], rw: [-0.5, -0.8], maxSpeed: 75, accel: 15, brake: 15, grip: 10, drift: 1, steer: 0.5, tank: 18, moto: true, style: 'esportiva', sound: 'moto', name: 'Moto Esportiva Raio 1000' },
  moto_custom: { L: 2.35, W: 0.85, wheelBase: 1.65, wr: 0.33, belt: 0.8, roof: 1.2, ws: [0.6, 0.3], rw: [-0.5, -0.8], maxSpeed: 52, accel: 9, brake: 11, grip: 9, drift: 1, steer: 0.45, tank: 20, moto: true, style: 'custom', sound: 'v8', name: 'Moto Custom Estrada' },
  moto_urbana: { L: 1.95, W: 0.75, wheelBase: 1.32, wr: 0.3, belt: 0.85, roof: 1.2, ws: [0.6, 0.3], rw: [-0.5, -0.8], maxSpeed: 42, accel: 8, brake: 12, grip: 9.5, drift: 1, steer: 0.55, tank: 14, moto: true, style: 'urbana', sound: 'small', name: 'Moto Urbana 160' },
  scooter: { L: 1.8, W: 0.7, wheelBase: 1.25, wr: 0.25, belt: 0.8, roof: 1.2, ws: [0.6, 0.3], rw: [-0.5, -0.8], maxSpeed: 30, accel: 6, brake: 11, grip: 9, drift: 1, steer: 0.6, tank: 8, moto: true, style: 'scooter', sound: 'small', name: 'Scooter 125' },
  ambulancia: { L: 5.8, W: 2.1, wheelBase: 3.5, wr: 0.38, belt: 1.15, roof: 2.75, ws: [1.9, 1.45], rw: [-2.6, -2.8], maxSpeed: 46, accel: 7, brake: 12, grip: 8.5, drift: 0.8, steer: 0.55, tank: 80, shape: 'van', siren: true, sirenZ: 1.2, sound: 'heavy', name: 'Ambulância' },
  bombeiros: { L: 8.2, W: 2.5, wheelBase: 4.6, wr: 0.52, belt: 1.45, roof: 3.1, ws: [3.6, 3.25], rw: [1.5, 1.4], maxSpeed: 38, accel: 5, brake: 10, grip: 8, drift: 0.7, steer: 0.5, tank: 200, shape: 'truck', siren: true, sirenZ: 2.6, sound: 'heavy', name: 'Caminhão de Bombeiros' },
  police: { L: 4.7, W: 1.85, wheelBase: 2.8, wr: 0.35, belt: 0.97, roof: 1.45, ws: [1.05, 0.25], rw: [-1.0, -1.8], maxSpeed: 54, accel: 9.5, brake: 15, grip: 10, drift: 1, steer: 0.6, tank: 60, police: true, sound: 'v8', name: 'Viatura' },
  taxi: { L: 4.6, W: 1.82, wheelBase: 2.75, wr: 0.34, belt: 0.95, roof: 1.43, ws: [1.05, 0.25], rw: [-1.0, -1.8], maxSpeed: 44, accel: 7.2, brake: 13, grip: 9, drift: 1, steer: 0.62, tank: 50, taxi: true, sound: 'normal', name: 'Táxi' },
};
export const CAR_COLORS = [0x8e1b1b, 0x1d3f72, 0xd9d9d9, 0x1a1a1a, 0x3f4a52, 0x6b6f73, 0x2e5a3a, 0x9c7a2c, 0xf2f2f2, 0x5a1f3d, 0x274b5e, 0xb25a1f, 0xd8c040, 0x3a7ab8, 0x6a8a3a];
export const MOTO_TYPES = ['moto_esportiva', 'moto_custom', 'moto_urbana', 'scooter'];
export const CAR_LIST = ['popular', 'hatch', 'sedan', 'suv', 'pickup', 'luxo', 'coupe', 'classico', 'besouro', 'furia', 'taxi', 'police', 'ambulancia', 'bombeiros'];
export const CIVIL_TYPES = ['sedan', 'hatch', 'popular', 'suv', 'pickup', 'luxo', 'coupe', 'classico', 'besouro', 'sedan', 'hatch', 'popular', 'taxi'];

// Rodas disponíveis na oficina
// motores da oficina: mudam o som e um pouco o desempenho
export const ENGINES = {
  quatro: { name: '4 cilindros', sound: 'small', accel: 0.92, top: 0.95 },
  v6: { name: 'V6', sound: 'normal', accel: 1.05, top: 1.03 },
  v8: { name: 'V8', sound: 'v8', accel: 1.15, top: 1.06 },
  boxer: { name: 'Boxer', sound: 'boxer', accel: 1.0, top: 1.0 },
  v12: { name: 'V12', sound: 'v12', accel: 1.25, top: 1.1 },
};
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
  return { color, wheel: T.whitewall ? 'classica' : type === 'furia' ? 'esportiva' : 'padrao', spoiler: T.spoiler ? 'gt' : false, skirts: false, tint: 0, neon: null, xenon: false, engine: 0, brakes: 0, susp: 0, turbo: false, suspLevel: 1, chassis: 'padrao', engineType: null };
}

const bodyMat = new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 90, specular: 0x666666, envMap: envRT.texture, combine: THREE.MixOperation, reflectivity: 0.42 });
const glassMat = new THREE.MeshPhongMaterial({ color: 0x121a22, transparent: true, opacity: 0.58, shininess: 140, specular: 0xbbbbbb, depthWrite: false, envMap: envRT.texture, combine: THREE.MixOperation, reflectivity: 0.75 });
// reflexo de Fresnel: de frente quase não reflete (dá para ver dentro), de lado reflete o céu forte (vidro e verniz de verdade)
function fresnel(mat, base, edgeAlpha = 0) {
  mat.onBeforeCompile = (sh) => {
    sh.fragmentShader = sh.fragmentShader.replace('#include <envmap_fragment>', `
      float fres = ${base.toFixed(2)} + ${(1 - base).toFixed(2)} * pow(1.0 - clamp(dot(normalize(vViewPosition), normal), 0.0, 1.0), 3.0);
      ` + THREE.ShaderChunk.envmap_fragment.replace(/reflectivity/g, '(reflectivity * fres)')
      + (edgeAlpha ? `\n      diffuseColor.a = mix(diffuseColor.a, 1.0, fres * ${edgeAlpha.toFixed(2)});` : ''));
  };
  mat.customProgramCacheKey = () => 'fres' + base + edgeAlpha;
}
fresnel(glassMat, 0.12, 0.5); fresnel(bodyMat, 0.3);
const wheelMat = new THREE.MeshLambertMaterial({ vertexColors: true });
const headMat = new THREE.MeshBasicMaterial({ color: 0xfff6d8 });
const xenonMat = new THREE.MeshBasicMaterial({ color: 0xcfe4ff });
const tailMat = new THREE.MeshBasicMaterial({ color: 0x6a0a0a });
const tailBrakeMat = new THREE.MeshBasicMaterial({ color: 0xff2020 });
export const sirenMats = [new THREE.MeshBasicMaterial({ color: 0x330000 }), new THREE.MeshBasicMaterial({ color: 0x000033 }), new THREE.MeshBasicMaterial({ color: 0x333333 })];

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
function wheelGeo(r, style = 'padrao', moto = false) {
  const key = r + style + moto; if (wheelGeoCache.has(key)) return wheelGeoCache.get(key);
  const S = WHEELS[style] || WHEELS.padrao; const parts = []; const w = moto ? 0.14 : S.chunky ? 0.3 : 0.24;
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

// tira a "tampa" de cima da carroceria numa faixa (cabine ou caçamba): assim dá para ver o interior pelas janelas
function cutTop(g, z0, z1, yMin, xHalf) {
  const pos = g.attributes.position, keep = [];
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), n = new THREE.Vector3(), e1 = new THREE.Vector3(), e2 = new THREE.Vector3();
  for (let i = 0; i < pos.count; i += 3) {
    a.fromBufferAttribute(pos, i); b.fromBufferAttribute(pos, i + 1); c.fromBufferAttribute(pos, i + 2);
    n.crossVectors(e1.subVectors(b, a), e2.subVectors(c, a)).normalize();
    const cy = (a.y + b.y + c.y) / 3, cz = (a.z + b.z + c.z) / 3, cx = (a.x + b.x + c.x) / 3;
    if (n.y > 0.45 && cy > yMin && cz > z0 && cz < z1 && Math.abs(cx) < xHalf) continue;
    keep.push(i);
  }
  const out = new THREE.BufferGeometry();
  for (const [name, attr] of Object.entries(g.attributes)) { const sz = attr.itemSize, arr = new attr.array.constructor(keep.length * 3 * sz); keep.forEach((v, k) => { for (let j = 0; j < 3 * sz; j++) arr[k * 3 * sz + j] = attr.array[v * sz + j]; }); out.setAttribute(name, new THREE.BufferAttribute(arr, sz)); }
  return out;
}
function extrudeProfile(points, width, bevel = 0.05, segs = 2) {
  const sh = new THREE.Shape();
  sh.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    const p = points[i];
    if (p.arc) sh.absarc(p.arc[0], p.arc[1], p.arc[2], Math.PI, 0, true);
    else sh.lineTo(p[0], p[1]);
  }
  const g = new THREE.ExtrudeGeometry(sh, { depth: width - bevel * 2, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelOffset: -bevel, bevelSegments: segs, curveSegments: 10 });
  g.rotateY(-Math.PI / 2);
  g.translate(width / 2 - bevel, 0, 0);
  return g;
}

// ---------- geometria dos veículos (compartilhada) ----------
const GEO_CACHE = new Map();
const TINT_MATS = [null, ...[0.75, 0.9].map((o) => { const g = glassMat.clone(); g.opacity = o; g.color.setHex(0x0a0e12); return g; })];
const holeMat = new THREE.MeshLambertMaterial({ color: 0x15151a });
const SIREN_GEO = new THREE.BoxGeometry(0.4, 0.1, 0.22);
const STEER_GEO = mergeGeometries([nonIdx(new THREE.TorusGeometry(0.17, 0.022, 6, 16), 0x111111), nonIdx(new THREE.BoxGeometry(0.3, 0.03, 0.02), 0x222222), nonIdx(new THREE.CylinderGeometry(0.045, 0.045, 0.03, 10), 0x333333, M(0, 0, 0, Math.PI / 2, 0, 0))]);
const ss = THREE.MathUtils.smoothstep;
// dá forma de carro de verdade a uma peça extrudada: frente/traseira afinam (vista de cima), laterais abauladas,
// capô com curvatura e cabine que estreita para cima (tumblehome)
function shapeCar(g, o) {
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i); let y = p.getY(i); const z = p.getZ(i);
    const t = ss(Math.abs(z), o.hl - o.taperLen, o.hl + 0.05);
    let k = 1 - o.taper * t * t;
    if (o.glass) k *= 1 - o.tumble * THREE.MathUtils.clamp((y - o.belt) / (o.roof - o.belt), 0, 1);
    else {
      const h = THREE.MathUtils.clamp((y - o.bottom) / (o.belt - o.bottom), 0, 1);
      k *= 0.955 + 0.045 * Math.sin(h * Math.PI);
      if (y > o.belt - 0.4) y += o.crown * (1 - Math.min(1, (x / (o.W / 2)) ** 2)) * ss(y, o.belt - 0.4, o.belt - 0.12);
    }
    p.setXYZ(i, x * k, y, z);
  }
  return toCreasedNormals(g, 0.75);
}
function buildGeo(T, m, color) {
  if (T.moto) return buildMoto(T, m, color);
  if (T.shape === 'van' || T.shape === 'truck') return buildService(T, m, color);
  const L = T.L, W = T.W, hl = L / 2;
  const wb = T.wheelBase / 2, wr = T.wr;
  const susp = m.suspLevel ?? 1; // 0 rebaixado, 1 médio, 2 alto
  const lift = (susp === 0 ? -0.05 : (susp - 1) * 0.07) + (m.chassis === 'offroad' ? 0.06 : 0);
  const Wb = W * (m.chassis === 'largo' ? 1.06 : 1);
  const bottom = wr * 0.75 - m.susp * 0.02, belt = T.belt;
  const darker = new THREE.Color(color).multiplyScalar(0.75).getHex();
  const chrome = 0xd8dade, trimC = T.chrome ? chrome : 0x202224;
  const parts = [];
  // caixa de roda centrada na roda (mesmo rebaixado/levantado) e com folga de 12 cm para a suspensão trabalhar
  const wy = wr - lift; // centro da roda nas coordenadas da carroceria (antes de subir/descer)
  // rebaixado: menos folga (suspensão mais dura); a caixa de roda nunca passa da linha do capô
  const ar = Math.max(wr + 0.075, Math.min(wr + 0.12 + Math.min(0, lift) * 0.6, belt - 0.12 - wy));
  const tw = (WHEELS[m.wheel] || WHEELS.padrao).chunky ? 0.3 : 0.24, wheelX = Wb / 2 - 0.14;
  // zonas das rodas: dentro delas, peças internas ficam afastadas do pneu (a da frente esterça e varre mais para dentro)
  const WZ = [{ z: wb, ext: wr + 0.16, wIn: wheelX - tw / 2 - 0.26 }, { z: -wb, ext: wr + 0.1, wIn: wheelX - tw / 2 - 0.06 }];
  const archTop = wy + ar;
  const travel = THREE.MathUtils.clamp((ar - wr - 0.035) / 0.085, 0.25, 1); // quanto a carroceria pode balançar (pouca folga = suspensão dura)
  const splitZ = (z0, z1, y0) => { // divide [z0,z1] nas partes fora/dentro das zonas das rodas => [a, b, limiteX]
    let segs = [[z0, z1, Infinity]];
    if (y0 >= archTop) return segs;
    for (const Z of WZ) { const a = Z.z - Z.ext, b = Z.z + Z.ext; const nx = [];
      for (const [s0, s1, lim] of segs) { if (s1 <= a || s0 >= b) { nx.push([s0, s1, lim]); continue; }
        if (s0 < a) nx.push([s0, a, lim]); nx.push([Math.max(s0, a), Math.min(s1, b), Math.min(lim, Z.wIn)]); if (s1 > b) nx.push([b, s1, lim]); }
      segs = nx; }
    return segs.filter(([a, b]) => b - a > 0.01);
  };
  const wideBox = (halfW, h, y0, z0, z1, col) => { for (const [a, b, lim] of splitZ(z0, z1, y0)) { const hw = Math.min(halfW, lim); if (hw > 0.05) parts.push(nonIdx(new THREE.BoxGeometry(hw * 2, h, b - a), col, M(0, y0 + h / 2, (a + b) / 2))); } };
  const sideWall = (x, th, y0, y1, z0, z1, col) => { for (const [a, b, lim] of splitZ(z0, z1, y0)) { const xx = Math.min(x, lim - th / 2); for (const sd of [-1, 1]) parts.push(nonIdx(new THREE.BoxGeometry(th, y1 - y0, b - a), col, M(sd * xx, (y0 + y1) / 2, (a + b) / 2))); } };
  const tubs = (zs, col) => { for (const Z of WZ) { if (!zs.some((zz) => Math.abs(zz - Z.z) < 0.01)) continue; const len = Wb / 2 - 0.06 - Z.wIn, R = ar + 0.005;
    for (const sd of [-1, 1]) { parts.push(nonIdx(new THREE.CylinderGeometry(R, R, len, 24, 1, true, 0, Math.PI).rotateZ(Math.PI / 2), col, M(sd * (Z.wIn + len / 2), wy, Z.z)));
      parts.push(nonIdx(new THREE.CircleGeometry(R, 24, 0, Math.PI).rotateY(sd > 0 ? -Math.PI / 2 : Math.PI / 2), col, M(sd * Z.wIn, wy, Z.z))); } } };
  // capô/tampa nunca encosta no pneu: sobe o perfil em cima das rodas (para-lama levemente abaulado)
  const fth = T.shape === 'wedge' ? 0.06 : 0.1; // espessura mínima acima da caixa de roda (esportivo: chanfro menor)
  const fender = (p) => { for (const q of p) { if (q.arc) continue; for (const az of [wb, -wb]) { const dz = Math.abs(q[0] - az); if (q[1] > wy + 0.1 && dz < ar + 0.3) q[1] = Math.max(q[1], wy + ar + fth - Math.max(0, dz - wr) * 0.35); } } return p; };
  const shp = { hl, W: Wb, belt, roof: T.roof, bottom, taper: T.shape === 'wedge' ? 0.06 : 0.12, taperLen: T.shape === 'besouro' ? 1.0 : 0.75, tumble: T.shape === 'wedge' ? 0.22 : 0.15, crown: T.shape === 'besouro' ? 0.0 : 0.035 };
  let glass, lowProfile = null;
  if (T.shape === 'besouro') {
    const p = [[-hl + 0.1, bottom + 0.1], [-wb - ar, bottom], { arc: [-wb, wy, ar] }, [wb - ar, bottom], { arc: [wb, wy, ar] }, [hl - 0.1, bottom + 0.05],
      [hl, bottom + 0.22], [hl - 0.04, 0.6], [hl - 0.25, 0.76], [hl - 0.6, 0.84], [T.ws[0] + 0.1, belt],
      [T.rw[1] - 0.05, belt], [-hl + 0.55, 0.82], [-hl + 0.22, 0.68], [-hl + 0.05, 0.5]];
    fender(p); parts.push(cutTop(nonIdx(shapeCar(extrudeProfile(p, Wb - 0.1, 0.1, 3), shp), color), T.rw[1] + 0.1, T.ws[0] - 0.03, belt - 0.15, (Wb - 0.1) / 2 - 0.1)); lowProfile = [p, Wb - 0.1];
    glass = shapeCar(extrudeProfile([[T.ws[0], belt - 0.01], [0.45, 1.28], [0.12, 1.44], [-0.45, 1.46], [-0.82, 1.3], [T.rw[1], belt - 0.01]], Wb - 0.24, 0), { ...shp, glass: true });
    parts.push(nonIdx(new THREE.SphereGeometry(1, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), color, M(0, 1.3, -0.18, 0, 0, 0, Wb / 2 - 0.2, 0.2, 0.62)));
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) { // para-lamas abaulados: casca aberta por baixo, larga o bastante para a roda esterçar dentro
      parts.push(nonIdx(new THREE.SphereGeometry(1, 18, 8, 0, Math.PI * 2, 0, Math.PI / 2), color, M(sx * (Wb / 2 - 0.16), wy + 0.02, sz * wb, 0, 0, 0, sz > 0 ? 0.48 : 0.36, ar + 0.06, ar + 0.08)));
    }
    for (const sx of [-1, 1]) parts.push(nonIdx(new THREE.BoxGeometry(0.12, 0.08, wb * 2 - 0.9), 0x1a1a1a, M(sx * (Wb / 2), bottom + 0.06, 0)));
  } else {
    let p;
    if (T.shape === 'wedge') p = [[-hl + 0.05, bottom + 0.08], [-wb - ar, bottom], { arc: [-wb, wy, ar] }, [wb - ar, bottom], { arc: [wb, wy, ar] }, [hl - 0.05, bottom],
      [hl + 0.05, bottom + 0.1], [hl - 0.05, 0.52], [hl - 0.42, 0.7], [wb, Math.max(belt - 0.03, wy + ar + 0.06)], [T.ws[0] + 0.1, belt], [T.rw[1] + 0.2, 0.86], [-hl + 0.25, 0.84], [-hl + 0.02, 0.7], [-hl, bottom + 0.15]];
    else {
      // perfil com capô inclinado, para-choque arredondado e traseira com tampa
      p = [[-hl + 0.05, bottom + 0.05], [-wb - ar, bottom], { arc: [-wb, wy, ar] }, [wb - ar, bottom], { arc: [wb, wy, ar] }, [hl - 0.12, bottom],
        [hl - 0.02, bottom + 0.08], [hl + 0.03, bottom + 0.25], [hl + 0.02, belt - 0.3], [hl - 0.05, belt - 0.2], [hl - 0.25, belt - 0.13], ...[wb + wr * 0.6, wb, wb - wr * 0.6].filter((z) => z > T.ws[0] + 0.14 && z < hl - 0.27).map((z) => [z, belt - 0.13 + 0.11 * (hl - 0.25 - z) / (hl - 0.35 - T.ws[0])]), [T.ws[0] + 0.1, belt - 0.02]];
      if (T.bed) p.push([T.rw[0] - 0.05, belt], [-hl + 0.02, belt], [-hl, bottom + 0.1]);
      else p.push([T.rw[1] - 0.05, belt], [-hl + 0.25, belt - 0.03], [-hl + 0.05, belt - 0.15], [-hl - 0.01, belt - 0.3], [-hl, bottom + 0.15]);
    }
    fender(p);
    { let bodyG = nonIdx(shapeCar(extrudeProfile(p, Wb, T.shape === 'wedge' ? 0.06 : 0.1, 3), shp), color);
      const rear = T.shape === 'wedge' ? T.rw[1] + 0.25 : T.bed ? T.rw[0] + 0.02 : T.rw[1] + 0.08;
      bodyG = cutTop(bodyG, rear, T.ws[0] - 0.03, T.shape === 'wedge' ? 0.6 : belt - 0.15, Wb / 2 - 0.1);
      if (T.bed) bodyG = cutTop(bodyG, -hl + 0.12, T.rw[0] - 0.12, belt - 0.15, Wb / 2 - 0.1); // caçamba aberta
      parts.push(bodyG); } lowProfile = [p, Wb];
    const gp = T.shape === 'wedge' ? [[T.ws[0], belt - 0.01], [T.ws[1], T.roof], [T.rw[0], T.roof - 0.02], [T.rw[1] + 0.2, 0.86]] : [[T.ws[0], belt - 0.01], [T.ws[1], T.roof], [T.rw[0], T.roof], [T.rw[1], belt - 0.01]];
    glass = shapeCar(extrudeProfile(gp, Wb - (T.shape === 'wedge' ? 0.42 : 0.16), 0.0), { ...shp, glass: true });
    // teto (acompanha o estreitamento da cabine) e colunas inclinadas
    const gw = Wb - (T.shape === 'wedge' ? 0.42 : 0.16), topW = gw * (1 - shp.tumble);
    const roofLen = T.ws[1] - T.rw[0];
    const roof = new THREE.BoxGeometry(topW + 0.06, 0.06, roofLen + 0.1, 1, 1, 1); 
    parts.push(nonIdx(toCreasedNormals(roof, 0.5), color, M(0, T.roof + 0.02, (T.ws[1] + T.rw[0]) / 2)));
    const pillar = (z1, y1, z2, y2) => {
      for (const s of [-1, 1]) {
        const a = new THREE.Vector3(s * (gw / 2 + 0.005), y1, z1), b = new THREE.Vector3(s * (topW / 2 + 0.01), y2, z2);
        const d = b.clone().sub(a); const len = d.length(); const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
        const mm = new THREE.Matrix4().compose(a.clone().add(b).multiplyScalar(0.5), q, new THREE.Vector3(1, 1, 1));
        parts.push(nonIdx(new THREE.BoxGeometry(0.07, len, 0.1), color, mm));
      }
    };
    pillar(T.ws[0], belt, T.ws[1], T.roof);
    pillar(T.shape === 'wedge' ? T.rw[1] + 0.2 : T.rw[1], T.shape === 'wedge' ? 0.86 : belt, T.rw[0], T.roof);
    if (!T.twoDoor) { const bz = (T.ws[1] + T.rw[0]) / 2 - 0.1; pillar(bz, belt, bz, T.roof); }
    if (T.shape === 'wedge') {
      for (const s of [-1, 1]) parts.push(nonIdx(new THREE.BoxGeometry(0.06, 0.26, 0.6), 0x0a0a0a, M(s * (Wb / 2 - 0.01), 0.58, -wb + ar + 0.36, 0, s * 0.15, 0))); // entradas de ar laterais, à frente da caixa de roda traseira
      parts.push(nonIdx(new THREE.BoxGeometry(Wb * 0.7, 0.12, 0.05), 0x0a0a0a, M(0, bottom + 0.2, hl + 0.03)));
      parts.push(nonIdx(new THREE.BoxGeometry(Wb * 0.85, 0.18, 0.05), 0x0a0a0a, M(0, bottom + 0.25, -hl + 0.02)));
    } else {
      // para-choques (arredondados), grade com moldura e limpadores
      for (const zz of [hl - 0.02, -hl + 0.04]) parts.push(nonIdx(new THREE.CapsuleGeometry(0.1, Wb * 0.86 - 0.2, 3, 8), trimC, M(0, bottom + 0.15, zz * 0.995, 0, 0, Math.PI / 2, 1, 1, 0.8)));
      const gW = Wb * (T.chrome ? 0.6 : 0.5), gy = belt - 0.32;
      parts.push(nonIdx(new THREE.BoxGeometry(gW, 0.16 + (T.chrome ? 0.06 : 0), 0.04), 0x0c0c0c, M(0, gy, hl + 0.02)));
      parts.push(nonIdx(new THREE.BoxGeometry(gW + 0.05, 0.03, 0.05), T.chrome ? chrome : 0x2a2a2a, M(0, gy + 0.1, hl + 0.025)));
      for (let i = 0; i < 4; i++) parts.push(nonIdx(new THREE.BoxGeometry(gW * 0.96, 0.012, 0.05), T.chrome ? 0x9a9a9a : 0x3a3a3a, M(0, gy - 0.05 + i * 0.035, hl + 0.03)));
      for (const s of [-1, 1]) parts.push(nonIdx(new THREE.BoxGeometry(0.5, 0.015, 0.02), 0x0a0a0a, M(s * 0.28, belt + 0.03, T.ws[0] - 0.06, -0.9, s * 0.2, 0)));
      if (T.fins) for (const s of [-1, 1]) parts.push(nonIdx(new THREE.BoxGeometry(0.06, 0.22, 1.1), color, M(s * (Wb / 2 - 0.06), belt + 0.08, -hl + 0.6, 0.12, 0, 0)));
    }
    // molduras das caixas de roda
    const flareC = T.shape === 'wedge' || T.sound === 'heavy' || m.chassis === 'offroad' ? 0x151515 : darker;
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      const tube = m.chassis === 'largo' || m.chassis === 'offroad' ? 0.06 : 0.035; const g = new THREE.TorusGeometry(ar + tube + 0.005, tube, 4, 16, Math.PI);
      parts.push(nonIdx(g, flareC, M(sx * (Wb / 2 * 0.975), wy, sz * wb, 0, Math.PI / 2, 0)));
    }
  }
  // frisos, linhas das portas, maçanetas e retrovisores
  const doorZ = T.twoDoor ? (T.ws[0] - 1.2) : (T.ws[1] + T.rw[0]) / 2 - 0.1;
  const sideX = Wb / 2;
  for (const s of [-1, 1]) {
    if (T.shape !== 'besouro') for (const [a, b] of [[-L * 0.31, Math.min(L * 0.31, -wb - ar - 0.02)], [-wb + ar + 0.02, wb - ar - 0.02], [Math.max(-L * 0.31, wb + ar + 0.02), L * 0.31]]) if (b - a > 0.05) parts.push(nonIdx(new THREE.BoxGeometry(0.03, 0.05, b - a), T.chrome ? chrome : darker, M(s * (sideX * 0.985), bottom + 0.22, (a + b) / 2))); // friso interrompido nas caixas de roda
    for (const dz of [T.ws[0] - 0.05, doorZ, ...(T.twoDoor || T.bed ? [] : [T.rw[1] + 0.05])]) { let y0 = bottom + 0.06; for (const az of [wb, -wb]) { const q = Math.abs(dz - az); if (q < ar + 0.02) y0 = Math.max(y0, wy + Math.sqrt(Math.max(0, (ar + 0.02) ** 2 - q * q)) + 0.02); } const y1 = belt - 0.06; if (y1 - y0 > 0.05) parts.push(nonIdx(new THREE.BoxGeometry(0.02, y1 - y0, 0.012), 0x111111, M(s * (sideX + 0.004), (y0 + y1) / 2, dz))); }
    parts.push(nonIdx(new THREE.BoxGeometry(0.03, 0.035, 0.15), T.chrome ? chrome : 0x2a2a2a, M(s * (sideX + 0.018), belt - 0.11, doorZ + 0.22)));
    parts.push(nonIdx(new THREE.BoxGeometry(0.18, 0.11, 0.1), color, M(s * (sideX + 0.07), belt + 0.06, T.ws[0] - 0.15)));
    parts.push(nonIdx(new THREE.BoxGeometry(0.02, 0.085, 0.07), 0xa8b8c8, M(s * (sideX + 0.07), belt + 0.06, T.ws[0] - 0.205)));
    if (m.skirts) parts.push(nonIdx(new THREE.BoxGeometry(0.08, 0.12, wb * 2 - ar * 2 - 0.06), darker, M(s * (sideX * 0.97 + 0.02), bottom + 0.02, 0)));
  }
  // placas (padrão Mercosul, com texto de verdade) e borrachas das janelas
  parts.push(nonIdx(new THREE.BoxGeometry(0.52, 0.15, 0.02), 0x1a1a1a, M(0, bottom + 0.3, -hl - 0.03)));
  parts.push(nonIdx(new THREE.BoxGeometry(0.52, 0.15, 0.02), 0x1a1a1a, M(0, bottom + 0.15, hl + 0.11)));
  const plate = PLATES[(T.L * 100 + color) % PLATES.length | 0];
  const signs = [signGeo(plate, PLATE_STYLE, 0.5, 0.13, M(0, bottom + 0.15, hl + 0.122)), signGeo(plate, PLATE_STYLE, 0.5, 0.13, M(0, bottom + 0.3, -hl - 0.042, 0, Math.PI, 0))];
  if (T.shape !== 'wedge' && T.shape !== 'besouro') {
    const gw = Wb - 0.16;
    for (const sd of [-1, 1]) parts.push(nonIdx(new THREE.BoxGeometry(0.035, 0.03, T.ws[0] - T.rw[1] - 0.05), 0x0a0a0a, M(sd * (gw / 2 + 0.01), belt + 0.005, (T.ws[0] + T.rw[1]) / 2)));
    parts.push(nonIdx(new THREE.BoxGeometry(gw - 0.05, 0.035, 0.16), 0x0e0e0e, M(0, belt - 0.005, T.ws[0] + 0.02))); // grade do para-brisa (cowl)
    parts.push(nonIdx(new THREE.BoxGeometry(gw * (1 - shp.tumble) + 0.02, 0.025, 0.03), 0x0a0a0a, M(0, T.roof - 0.005, T.ws[1] + 0.01))); // borracha do topo do para-brisa
  }
  // interior: bancos ajustados ao motorista, painel completo, console, forros e tapetes
  const seatC = T.chrome || T.shape === 'wedge' ? 0x5a2a1e : T.police ? 0x1e2430 : 0x2a2a2e, dashC = T.shape === 'wedge' ? 0x141414 : 0x1e1e20;
  const steerPos = [0.38, belt + 0.05 + lift, T.ws[0] - 0.55];
  const seatCfg = seatLayout({ x: 0.38, floor: bottom - 0.02 + lift, roof: T.roof + lift, steer: steerPos, ws0: T.ws[0], footMax: wb - wr - 0.3 });
  { // a carroceria inteira sobe com a suspensão depois: aqui as alturas vão sem o "lift"
    const g = { ...seatCfg, floor: seatCfg.floor - lift, cushTop: seatCfg.cushTop - lift, hipY: seatCfg.hipY - lift, footY: seatCfg.footY - lift, wheel: [steerPos[0], steerPos[1] - lift, steerPos[2]] };
    seatsGeo(parts, g, seatC, M);
    dashGeo(parts, g, { W: Wb, belt, ws0: T.ws[0], roof: T.roof, dashC, accent: T.shape === 'wedge' ? 0xd06a1a : 0x2a6aaa, floor: g.floor, wideBox, sideWall }, M); }
  { // paredes internas da cabine (por dentro da lataria aberta): laterais, fundo e assoalho contornando as rodas
    const fl = seatCfg.floor - lift, rearZ = T.shape === 'wedge' ? T.rw[1] + 0.3 : T.bed ? T.rw[0] + 0.05 : T.rw[1] + 0.12, frontZ = T.ws[0] - 0.05;
    const trimC = T.shape === 'wedge' ? 0x141414 : 0x26262a, topY = T.shape === 'wedge' ? 0.62 : belt - 0.02;
    sideWall(Wb / 2 - 0.08, 0.04, fl, topY, rearZ, frontZ, trimC);
    { let hw = Wb / 2 - 0.08; for (const Z of WZ) if (Math.abs(rearZ - Z.z) < Z.ext && fl < archTop) hw = Math.min(hw, Z.wIn); parts.push(nonIdx(new THREE.BoxGeometry(hw * 2, topY - fl, 0.04), trimC, M(0, (topY + fl) / 2, rearZ))); }
    wideBox(Wb / 2 - 0.08, 0.03, fl - 0.03, rearZ, frontZ, 0x161616);
    tubs(WZ.filter((Z) => Z.z + Z.ext > rearZ && Z.z - Z.ext < frontZ).map((Z) => Z.z), 0x161616);
    if (!T.bed && T.shape !== 'wedge') { const hw = belt - 0.03 < archTop + 0.06 && Math.abs(rearZ + 0.2 + wb) < WZ[1].ext + 0.2 ? WZ[1].wIn : Wb / 2 - 0.1; parts.push(nonIdx(new THREE.BoxGeometry(hw * 2, 0.025, 0.4), 0x1a1a1a, M(0, belt - 0.03, rearZ + 0.2))); } // tampão do porta-malas
    if (T.bed) { // caçamba: assoalho com frisos, paredes internas e caixas das rodas
      const bz0 = -hl + 0.12, bz1 = T.rw[0] - 0.12, by = bottom + 0.25;
      wideBox(Wb / 2 - 0.1, 0.03, by - 0.015, bz0, bz1, 0x222222);
      for (let i = -2; i <= 2; i++) parts.push(nonIdx(new THREE.BoxGeometry(0.04, 0.02, bz1 - bz0), 0x333333, M(i * (WZ[1].wIn - 0.05) / 2, by + 0.025, (bz0 + bz1) / 2)));
      sideWall(Wb / 2 - 0.08, 0.04, by, belt, bz0, bz1, darker);
      for (const zz of [bz0, bz1]) parts.push(nonIdx(new THREE.BoxGeometry(Wb - 0.16, belt - by, 0.04), darker, M(0, (belt + by) / 2, zz)));
      tubs([-wb], darker);
    }
  }
  if (!T.bed && !T.twoDoor && T.shape !== 'wedge' && T.rw[1] < -1.1) {
    const rz = Math.min(-0.95, seatCfg.hipZ - 1.0);
    const rsw = Math.min(Wb - 0.35, (rz - 0.4 < -wb + WZ[1].ext ? WZ[1].wIn : Wb / 2) * 2 - 0.04); // banco de trás entre as caixas de roda
    parts.push(nonIdx(new THREE.BoxGeometry(rsw, 0.14, 0.5), seatC, M(0, seatCfg.cushTop - lift - 0.07, rz)));
    parts.push(nonIdx(new THREE.BoxGeometry(rsw, 0.58, 0.12), seatC, M(0, seatCfg.cushTop - lift + 0.27, rz - 0.28, -0.2, 0, 0)));
    for (const k of [-0.42, 0, 0.42]) parts.push(nonIdx(new THREE.BoxGeometry(0.24, 0.15, 0.09), seatC, M(k, seatCfg.cushTop - lift + 0.62, rz - 0.36, -0.2, 0, 0)));
  }
  if (T.bed) {
    const bl = T.rw[0] + hl - 0.05;
    for (const s of [-1, 1]) parts.push(nonIdx(new THREE.BoxGeometry(0.06, 0.08, bl), color, M(s * (Wb / 2 - 0.05), belt + 0.02, -hl + bl / 2 + 0.05)));
  }
  if (T.police) {
    for (const s of [-1, 1]) {
      for (const [a, b] of [[-0.2 - T.L * 0.225, -0.2 + T.L * 0.225]].flatMap(([a, b]) => { const out = []; let c = a; for (const az of [-wb, wb]) { if (az - ar - 0.02 > c && az - ar - 0.02 < b) { out.push([c, az - ar - 0.02]); c = az + ar + 0.02; } else if (az + ar + 0.02 > c && az - ar - 0.02 <= c) c = Math.max(c, az + ar + 0.02); } if (b > c) out.push([c, b]); return out; })) {
        if (b - a < 0.05) continue; // faixa da viatura interrompida nas caixas de roda
        parts.push(nonIdx(new THREE.BoxGeometry(0.02, 0.3, b - a), 0x111a33, M(s * (sideX + 0.012), belt - 0.25, (a + b) / 2)));
        parts.push(nonIdx(new THREE.BoxGeometry(0.022, 0.08, b - a), 0xd4af37, M(s * (sideX + 0.014), belt - 0.07, (a + b) / 2)));
      }
    }
    parts.push(nonIdx(new THREE.BoxGeometry(0.9, 0.05, 0.25), 0x222222, M(0, T.roof + 0.07, -0.35)));
  }
  if (T.taxi) parts.push(nonIdx(new THREE.BoxGeometry(0.55, 0.16, 0.22), 0xf4f4f4, M(0, T.roof + 0.12, -0.4)));
  // aerofólio (3 estilos)
  if (m.spoiler) {
    const st = m.spoiler === true ? (T.shape === 'wedge' ? 'gt' : 'lip') : m.spoiler;
    const sz = -hl + 0.3;
    if (st === 'lip') parts.push(nonIdx(new THREE.BoxGeometry(Wb - 0.35, 0.05, 0.18), color, M(0, belt + 0.02, -hl + 0.15, -0.25, 0, 0)));
    else {
      const sy = st === 'gt' ? belt + 0.42 : belt + 0.26;
      parts.push(nonIdx(new THREE.BoxGeometry(Wb - (st === 'gt' ? 0.1 : 0.25), 0.04, st === 'gt' ? 0.4 : 0.3), st === 'gt' ? 0x111111 : color, M(0, sy, sz, -0.1, 0, 0)));
      if (st === 'gt') for (const s of [-1, 1]) parts.push(nonIdx(new THREE.BoxGeometry(0.03, 0.18, 0.42), 0x111111, M(s * (Wb / 2 - 0.05), sy + 0.02, sz)));
      for (const s of [-0.55, 0.55]) parts.push(nonIdx(new THREE.BoxGeometry(0.05, sy - belt + 0.1, 0.12), 0x111111, M(s * Wb / 2, (sy + belt - 0.1) / 2, sz + 0.05)));
    }
  }
  // escapamentos (1 ou 2; o turbo solta fogo por eles)
  const exhausts = [];
  const dual = T.sound === 'v8' || T.sound === 'v12' || m.turbo || m.engineType === 'v8' || m.engineType === 'v12';
  for (const ex of dual ? [-0.32, 0.32] : [-0.32]) {
    const pos = [ex * Wb, bottom + 0.1, -hl - 0.06];
    parts.push(nonIdx(new THREE.CylinderGeometry(0.045, 0.045, 0.28, 10), 0xbfc2c6, M(pos[0], pos[1], pos[2] + 0.1, Math.PI / 2, 0, 0)));
    parts.push(nonIdx(new THREE.CylinderGeometry(0.03, 0.03, 0.02, 10), 0x111111, M(pos[0], pos[1], pos[2] - 0.035, Math.PI / 2, 0, 0)));
    exhausts.push(pos);
  }
  const body = mergeGeometries(parts);
  // luzes (faróis com lente e lanternas)
  const hg = [];
  if (T.shape === 'besouro') { for (const s of [-1, 1]) hg.push(new THREE.SphereGeometry(0.11, 10, 8).translate(s * (Wb / 2 - 0.14), wr + 0.34, wb + 0.42)); }
  else if (T.shape === 'wedge') { for (const s of [-1, 1]) hg.push(new THREE.BoxGeometry(0.42, 0.06, 0.12).rotateX(0.5).translate(s * (Wb / 2 - 0.37), 0.6, hl - 0.38)); }
  else for (const s of [-1, 1]) { hg.push(new THREE.BoxGeometry(0.36, 0.11, 0.08).rotateY(s * 0.18).translate(s * (Wb / 2 - 0.3), belt - 0.25, hl - 0.02)); hg.push(new THREE.SphereGeometry(0.045, 8, 6).translate(s * (Wb / 2 - 0.32), bottom + 0.2, hl + 0.06)); }
  const tg = [];
  if (T.shape === 'wedge') tg.push(new THREE.BoxGeometry(Wb - 0.3, 0.05, 0.04).translate(0, 0.74, -hl + 0.01));
  else if (T.shape === 'besouro') { for (const s of [-1, 1]) tg.push(new THREE.BoxGeometry(0.12, 0.2, 0.06).translate(s * (Wb / 2 - 0.14), wr + 0.32, -wb - 0.42)); }
  else for (const s of [-1, 1]) tg.push(new THREE.BoxGeometry(0.38, 0.13, 0.08).rotateY(-s * 0.15).translate(s * (Wb / 2 - 0.27), T.bed ? belt - 0.15 : belt - 0.22, -hl + 0.0));
  const head = mergeGeometries(hg.map((g) => nonIdx(g, 0xffffff))), tail = mergeGeometries(tg.map((g) => nonIdx(g, 0xffffff)));
  // porta do motorista (lado +x) e o vão escuro que aparece quando ela abre
  const dz0 = T.ws[0] - 0.05, dLen = dz0 - doorZ, dH = belt - bottom - 0.12;
  const door = nonIdx(new THREE.BoxGeometry(0.06, dH, dLen), color, M(0.03, bottom + 0.06 + dH / 2, -dLen / 2));
  const doorGlass = new THREE.BoxGeometry(0.02, (T.roof - belt) * 0.85, dLen * 0.9).translate(0.02, belt + (T.roof - belt) * 0.42, -dLen / 2 - 0.02);
  const doorHole = new THREE.BoxGeometry(0.02, dH, dLen - 0.04).translate(sideX + 0.01, bottom + 0.06 + dH / 2, dz0 - dLen / 2);
  // LOD: tudo numa malha só (carros distantes)
  const wheelPos = []; for (const [sx, sz] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) wheelPos.push({ x: sx * (Wb / 2 - 0.14), z: sz * wb, sx });
  // versão de longe: carroceria sem chanfro, sem interior, rodas simples (poucos triângulos)
  const lowBody = nonIdx(shapeCar(extrudeProfile(lowProfile[0], lowProfile[1], 0), { ...shp }), color);
  const roofLow = T.shape === 'besouro' ? null : nonIdx(new THREE.BoxGeometry(Wb * (1 - shp.tumble) - 0.1, 0.06, T.ws[1] - T.rw[0] + 0.1), color, M(0, T.roof + 0.02, (T.ws[1] + T.rw[0]) / 2));
  const wLow = mergeGeometries([nonIdx(new THREE.CylinderGeometry(wr, wr, 0.24, 10), 0x161616, M(0, 0, 0, 0, 0, Math.PI / 2)), nonIdx(new THREE.CylinderGeometry(wr * 0.62, wr * 0.62, 0.26, 8), (WHEELS[m.wheel] || WHEELS.padrao).rim, M(0, 0, 0, 0, 0, Math.PI / 2))]);
  const lp = [lowBody, nonIdx(head.clone(), 0xfff0c0), nonIdx(glass.clone(), 0x1c2630), nonIdx(tail.clone(), 0x7a1010)];
  if (roofLow) lp.push(roofLow);
  for (const w of wheelPos) lp.push(wLow.clone().applyMatrix4(new THREE.Matrix4().makeTranslation(w.x, wr, w.z)));
  // a carroceria sobe/desce com a suspensão
  const up = new THREE.Matrix4().makeTranslation(0, lift, 0);
  for (const g of [body, glass, head, tail, doorHole]) g.applyMatrix4(up);
  for (let i = 0; i < 4; i++) lp[i].applyMatrix4(up); if (roofLow) roofLow.applyMatrix4(up);
  const lod = mergeGeometries(lp);
  return { body, glass, head, tail, door, doorGlass, doorHole, doorHinge: [sideX + 0.005, lift, dz0], lod, wheelPos, lift, exhausts: exhausts.map(([x, y, z]) => [x, y + lift, z]),
    travel, seat: [0.38, seatCfg.hipY - 0.56, seatCfg.hipZ], steerPos, seatCfg, signs: (() => { const g = mergeGeometries(signs); g.applyMatrix4(up); return g; })() };
}
// placa/letreiro (texto do atlas de placas) colado na lataria
const PLATES = ['LVS-4A21', 'BRA-2E19', 'LVS-7K03', 'RIO-5B88', 'LVS-1C47', 'SPX-9D12', 'LVS-3F65', 'MGA-6H30', 'LVS-8J94', 'BWD-2L57', 'LVS-0M76', 'CXA-4N08'];
const PLATE_STYLE = { bg: '#f4f4f4', fg: '#111111', border: false, w: 256, h: 64 };
function signGeo(text, opts, w, h, mtx, mirror = false) {
  const r = signMat(text, opts).region; const g = new THREE.PlaneGeometry(w, h); const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) { const u = mirror ? 1 - uv.getX(i) : uv.getX(i); uv.setXY(i, r.u0 + (r.u1 - r.u0) * u, r.v0 + (r.v1 - r.v0) * uv.getY(i)); }
  g.applyMatrix4(mtx); return g;
}
// ---------- posição do motorista e interior ----------
// calcula onde fica o quadril, a inclinação do encosto e os pedais para a cabeça não passar do teto
// e os pés ficarem no assoalho (tudo em coordenadas locais do carro)
export function seatLayout(o) {
  const floor = o.floor, headRoom = o.roof - 0.1;
  const cush = THREE.MathUtils.clamp((o.roof - floor - 0.9) * 0.5, 0.02, 0.32); // assento sobre o piso (esportivos: quase no chão)
  const hipY = floor + cush + 0.09; // osso do quadril (centro da bacia)
  // topo da cabeça = quadril + tronco (0,34 m) inclinado + pescoço/cabeça (0,57 m) que volta metade da inclinação
  const top = (t) => hipY + 0.34 * Math.cos(t) + 0.57 * Math.cos(t * 0.5);
  let recline = 0.14; while (recline < 1.15 && top(recline) > headRoom) recline += 0.02; // carros baixos: encosto mais deitado
  const hipZ = o.steer[2] - 0.42 + 0.52 * Math.sin(recline);
  const drop = hipY - 0.04 - (floor + 0.1);
  const reach = Math.sqrt(Math.max(0.04, 0.8 * 0.8 - drop * drop));
  const footZ = Math.min(hipZ + reach, o.ws0 - 0.12, o.footMax ?? 99);
  return { x: o.x, floor, cush, cushTop: hipY - 0.1, hipY, hipZ, recline, footY: floor + 0.1, footZ, wheel: o.steer.slice(), wheelTilt: 0.45 };
}
// bancos do motorista e do passageiro seguindo o layout (assento, encosto inclinado, apoio de cabeça, costura)
function seatsGeo(parts, cfg, seatC, M) {
  const stitch = new THREE.Color(seatC).multiplyScalar(1.6).getHex();
  for (const sx of [cfg.x, -cfg.x]) {
    const ct = cfg.cushTop, zc = cfg.hipZ - 0.02, th = cfg.recline;
    parts.push(nonIdx(new THREE.BoxGeometry(0.5, 0.13, 0.52), seatC, M(sx, ct - 0.065, zc + 0.04)));
    parts.push(nonIdx(new THREE.BoxGeometry(0.06, 0.08, 0.52), seatC, M(sx + 0.22, ct + 0.01, zc + 0.04))); // abas laterais
    parts.push(nonIdx(new THREE.BoxGeometry(0.06, 0.08, 0.52), seatC, M(sx - 0.22, ct + 0.01, zc + 0.04)));
    parts.push(nonIdx(new THREE.BoxGeometry(0.04, 0.005, 0.5), stitch, M(sx, ct + 0.002, zc + 0.04)));
    // encosto: gira em torno da base, atrás das costas
    const by = ct, bz = cfg.hipZ - 0.2, h = 0.66;
    const cy = by + Math.cos(th) * h / 2, cz = bz - Math.sin(th) * h / 2;
    parts.push(nonIdx(new THREE.BoxGeometry(0.5, h, 0.13), seatC, M(sx, cy, cz, -th, 0, 0)));
    parts.push(nonIdx(new THREE.BoxGeometry(0.04, h * 0.9, 0.005), stitch, M(sx, cy + Math.sin(th) * 0.0, cz + Math.cos(th) * 0.068, -th, 0, 0)));
    const hy = by + Math.cos(th) * (h + 0.1), hz = bz - Math.sin(th) * (h + 0.1);
    parts.push(nonIdx(new THREE.BoxGeometry(0.26, 0.17, 0.1), seatC, M(sx, hy, hz, -th, 0, 0)));
    for (const k of [-0.07, 0.07]) parts.push(nonIdx(new THREE.CylinderGeometry(0.01, 0.01, 0.08, 5), 0x8a8a8a, M(sx + k, by + Math.cos(th) * (h + 0.01), bz - Math.sin(th) * (h + 0.01), -th, 0, 0)));
    // trilho do banco
    parts.push(nonIdx(new THREE.BoxGeometry(0.4, Math.max(0.02, ct - 0.13 - cfg.floor), 0.4), 0x1a1a1a, M(sx, (ct - 0.13 + cfg.floor) / 2, zc + 0.04)));
  }
}
// painel completo: mostradores, saídas de ar, rádio, console com câmbio e freio de mão, forros das portas, retrovisor e para-sóis
function dashGeo(parts, cfg, o, M) {
  const { W, belt, ws0, roof, dashC, accent, floor } = o; const w = cfg.wheel; // o.wideBox/o.sideWall: contornam as rodas
  const dz = ws0 - 0.3;
  parts.push(nonIdx(new THREE.BoxGeometry(W - 0.22, 0.24, 0.46), dashC, M(0, belt - 0.06, dz)));
  parts.push(nonIdx(new THREE.BoxGeometry(W - 0.26, 0.04, 0.5), new THREE.Color(dashC).multiplyScalar(1.5).getHex(), M(0, belt + 0.07, dz - 0.02))); // topo do painel
  // cluster com 2 mostradores atrás do volante
  parts.push(nonIdx(new THREE.BoxGeometry(0.42, 0.14, 0.08), 0x0c0c0c, M(cfg.x, belt + 0.04, dz - 0.21)));
  for (const k of [-0.1, 0.1]) { parts.push(nonIdx(new THREE.CylinderGeometry(0.055, 0.055, 0.01, 16), 0xe8e8e0, M(cfg.x + k, belt + 0.04, dz - 0.255, Math.PI / 2, 0, 0))); parts.push(nonIdx(new THREE.BoxGeometry(0.004, 0.045, 0.004), 0xd01010, M(cfg.x + k + 0.012, belt + 0.05, dz - 0.262, 0, 0, -0.7))); }
  parts.push(nonIdx(new THREE.BoxGeometry(0.44, 0.03, 0.12), dashC, M(cfg.x, belt + 0.12, dz - 0.21))); // capuz do cluster
  // saídas de ar
  for (const vx of [-W / 2 + 0.25, -0.12, 0.12, W / 2 - 0.25]) { parts.push(nonIdx(new THREE.BoxGeometry(0.14, 0.06, 0.02), 0x0a0a0a, M(vx, belt + 0.0, dz - 0.235))); for (let i = 0; i < 3; i++) parts.push(nonIdx(new THREE.BoxGeometry(0.13, 0.006, 0.01), 0x3a3a3a, M(vx, belt - 0.02 + i * 0.02, dz - 0.247))); }
  // rádio/tela no centro
  parts.push(nonIdx(new THREE.BoxGeometry(0.24, 0.13, 0.02), 0x111111, M(0, belt - 0.1, dz - 0.235)));
  parts.push(nonIdx(new THREE.BoxGeometry(0.19, 0.08, 0.005), accent, M(0, belt - 0.09, dz - 0.247)));
  for (let i = 0; i < 4; i++) parts.push(nonIdx(new THREE.BoxGeometry(0.025, 0.012, 0.01), 0x8a8a8a, M(-0.075 + i * 0.05, belt - 0.15, dz - 0.247)));
  // console central, câmbio e freio de mão
  const cz0 = cfg.hipZ + 0.1, cz1 = dz - 0.2, cl = Math.max(0.3, cz1 - cz0);
  parts.push(nonIdx(new THREE.BoxGeometry(0.22, Math.max(0.1, belt - 0.2 - floor), 0.3), dashC, M(0, (belt - 0.2 + floor) / 2, dz - 0.3)));
  parts.push(nonIdx(new THREE.BoxGeometry(0.2, 0.16, cl), dashC, M(0, floor + 0.08, (cz0 + cz1) / 2)));
  parts.push(nonIdx(new THREE.CylinderGeometry(0.012, 0.014, 0.16, 6), 0x2a2a2a, M(0, floor + 0.24, (cz0 + cz1) / 2 + 0.05, -0.15, 0, 0)));
  parts.push(nonIdx(new THREE.SphereGeometry(0.03, 8, 6), 0x111111, M(0, floor + 0.33, (cz0 + cz1) / 2 + 0.06)));
  parts.push(nonIdx(new THREE.BoxGeometry(0.035, 0.03, 0.2), 0x1a1a1a, M(0, floor + 0.19, cz0 + 0.05, -0.35, 0, 0)));
  // assoalho e tapetes
  { const fl0 = Math.max(0.6, ws0 - cfg.hipZ + 1.2), fz = (ws0 + cfg.hipZ - 1.2) / 2 - 0.1;
    if (o.wideBox) o.wideBox(W / 2 - 0.08, 0.03, floor - 0.03, fz - fl0 / 2, fz + fl0 / 2, 0x161616); else parts.push(nonIdx(new THREE.BoxGeometry(W - 0.16, 0.03, fl0), 0x161616, M(0, floor - 0.015, fz))); }
  for (const sx of [cfg.x, -cfg.x]) parts.push(nonIdx(new THREE.BoxGeometry(0.42, 0.012, 0.5), 0x0c0c0c, M(sx, floor + 0.006, cfg.footZ - 0.15)));
  // pedais
  for (const [px, pz] of [[0.12, 0], [0.0, 0], [-0.1, 0.02]]) parts.push(nonIdx(new THREE.BoxGeometry(0.06, 0.09, 0.02), 0x2a2a2a, M(cfg.x + px - 0.02, cfg.footY + 0.02, cfg.footZ + 0.12 + pz, -0.5, 0, 0)));
  // forros das portas (lado de dentro) com apoio de braço e alto-falante
  for (const s of [-1, 1]) {
    const dx = s * (W / 2 - 0.09);
    { const ln = Math.max(0.8, ws0 - cfg.hipZ + 0.2), zc = (ws0 + cfg.hipZ) / 2 - 0.25;
      if (o.sideWall) { if (s > 0) o.sideWall(W / 2 - 0.09, 0.05, floor + 0.025, belt - 0.025, zc - ln / 2, zc + ln / 2, dashC); }
      else parts.push(nonIdx(new THREE.BoxGeometry(0.05, belt - floor - 0.05, ln), dashC, M(dx, (belt + floor) / 2, zc))); }
    parts.push(nonIdx(new THREE.BoxGeometry(0.08, 0.05, 0.5), new THREE.Color(dashC).multiplyScalar(1.6).getHex(), M(dx - s * 0.03, belt - 0.2, cfg.hipZ + 0.1)));
    parts.push(nonIdx(new THREE.CylinderGeometry(0.07, 0.07, 0.01, 12), 0x0a0a0a, M(dx - s * 0.03, floor + 0.2, cfg.hipZ + 0.45, 0, 0, Math.PI / 2)));
  }
  // retrovisor interno e para-sóis
  parts.push(nonIdx(new THREE.BoxGeometry(0.24, 0.07, 0.03), 0x111111, M(0, roof - 0.13, ws0 - 0.62)));
  parts.push(nonIdx(new THREE.BoxGeometry(0.22, 0.055, 0.005), 0xa8b8c8, M(0, roof - 0.13, ws0 - 0.637)));
  for (const s of [-1, 1]) parts.push(nonIdx(new THREE.BoxGeometry(0.38, 0.02, 0.17), 0xb0a898, M(s * 0.38, roof - 0.06, ws0 - 0.7)));
}
// ---------- ambulância (furgão) e caminhão de bombeiros ----------
function buildService(T, m, color) {
  const L = T.L, W = T.W, hl = L / 2, wb = T.wheelBase / 2, wr = T.wr, belt = T.belt, ar = wr + 0.1, bottom = wr * 0.8;
  const truck = T.shape === 'truck'; const P = []; const signs = [];
  const main = truck ? 0xb01010 : 0xf4f4f4, stripe = truck ? 0xe8e8e8 : 0xd01818;
  const cabTop = truck ? 2.75 : 2.2, boxTop = T.roof, cabBack = truck ? hl - 2.4 : T.ws[1] - 0.25;
  // perfil lateral: cabine com para-brisa inclinado + baú/carroceria
  const prof = [[-hl + 0.05, bottom + 0.05], [-wb - ar, bottom], { arc: [-wb, wr, ar] }, ...(truck ? [[-wb + 1.25 - ar, bottom], { arc: [-wb + 1.25, wr, ar] }] : []), [wb - ar, bottom], { arc: [wb, wr, ar] }, [hl - 0.1, bottom],
    [hl + 0.02, bottom + 0.25], [hl + 0.02, belt - 0.15], [hl - 0.2, belt + 0.05], [T.ws[1], cabTop], [cabBack, cabTop], [cabBack - 0.05, boxTop], [-hl + 0.05, boxTop], [-hl, boxTop - 0.1], [-hl, bottom + 0.15]];
  const shp = { hl, W, belt, roof: T.roof, bottom, taper: 0.04, taperLen: 0.5, tumble: 0, crown: 0 };
  const bodyG = shapeCar(extrudeProfile(prof, W, 0.08, 2), shp);
  { const g = nonIdx(bodyG, main); const pos = g.attributes.position, col = g.attributes.color; const cs = new THREE.Color(stripe);
    for (let i = 0; i < pos.count; i++) { const y = pos.getY(i); if (y > belt - 0.32 && y < belt - 0.05) col.setXYZ(i, cs.r, cs.g, cs.b); } P.push(g); }
  // para-choques, grade, molduras
  P.push(nonIdx(new THREE.BoxGeometry(W + 0.06, 0.3, 0.22), 0x2a2a2a, M(0, bottom + 0.18, hl + 0.02)));
  P.push(nonIdx(new THREE.BoxGeometry(W + 0.06, 0.3, 0.22), 0x2a2a2a, M(0, bottom + 0.18, -hl - 0.02)));
  P.push(nonIdx(new THREE.BoxGeometry(W * 0.55, 0.35, 0.04), truck ? 0xc8ccd2 : 0x1a1a1a, M(0, belt - 0.45, hl + 0.03)));
  for (const sx of [-1, 1]) for (const z of truck ? [wb, -wb, -wb + 1.25] : [wb, -wb]) P.push(nonIdx(new THREE.TorusGeometry(ar + 0.02, 0.05, 4, 12, Math.PI), 0x151515, M(sx * W / 2 * 0.99, wr, z, 0, Math.PI / 2, 0)));
  for (const s of [-1, 1]) { P.push(nonIdx(new THREE.BoxGeometry(0.2, 0.3, 0.1), 0x1a1a1a, M(s * (W / 2 + 0.12), belt + 0.3, T.ws[0] - 0.1))); }
  if (truck) {
    // compartimentos cromados e escada no teto
    for (const s of [-1, 1]) for (let i = 0; i < 3; i++) P.push(nonIdx(new THREE.BoxGeometry(0.03, 1.1, 1.3), 0xc8ccd2, M(s * (W / 2 + 0.01), bottom + 0.95, cabBack - 1.0 - i * 1.5)));
    for (const s of [-1, 1]) P.push(nonIdx(new THREE.BoxGeometry(0.08, 0.1, L - 1.2), 0xd8dade, M(s * 0.45, boxTop + 0.35, -0.3)));
    for (let i = 0; i < 14; i++) P.push(nonIdx(new THREE.BoxGeometry(0.9, 0.05, 0.05), 0xd8dade, M(0, boxTop + 0.35, -hl + 0.8 + i * 0.5)));
    for (const z of [-hl + 1, hl - 3]) P.push(nonIdx(new THREE.BoxGeometry(1.2, 0.3, 0.3), 0x2a2a2a, M(0, boxTop + 0.15, z)));
    P.push(nonIdx(new THREE.CylinderGeometry(0.12, 0.12, 1.6, 10), 0xc8ccd2, M(-W / 2 + 0.25, bottom + 0.55, -hl + 0.6, 0, 0, Math.PI / 2))); // carretel de mangueira
    signs.push(signGeo('BOMBEIROS', { bg: '#b01010', fg: '#ffffff', border: false, w: 512, h: 96 }, 2.6, 0.45, M(W / 2 + 0.02, belt + 0.45, -1.5, 0, Math.PI / 2, 0)));
    signs.push(signGeo('BOMBEIROS', { bg: '#b01010', fg: '#ffffff', border: false, w: 512, h: 96 }, 2.6, 0.45, M(-W / 2 - 0.02, belt + 0.45, -1.5, 0, -Math.PI / 2, 0)));
    signs.push(signGeo('193', { bg: '#b01010', fg: '#ffffff', border: false, w: 256, h: 96 }, 0.8, 0.35, M(0, cabTop - 0.2, hl + 0.05)));
  } else {
    // cruz vermelha e letreiro
    for (const s of [-1, 1]) { P.push(nonIdx(new THREE.BoxGeometry(0.02, 0.7, 0.22), 0xd01818, M(s * (W / 2 + 0.01), 1.85, -1.3))); P.push(nonIdx(new THREE.BoxGeometry(0.02, 0.22, 0.7), 0xd01818, M(s * (W / 2 + 0.01), 1.85, -1.3))); }
    P.push(nonIdx(new THREE.BoxGeometry(0.22, 0.7, 0.02), 0xd01818, M(0.5, 1.9, -hl - 0.01))); P.push(nonIdx(new THREE.BoxGeometry(0.7, 0.22, 0.02), 0xd01818, M(0.5, 1.9, -hl - 0.01)));
    P.push(nonIdx(new THREE.BoxGeometry(0.02, 1.7, 0.9), 0x8a8e94, M(0, bottom + 1.05, -hl - 0.01))); // portas traseiras
    signs.push(signGeo('AMBULÂNCIA', { bg: '#ffffff', fg: '#d01818', border: false, w: 512, h: 96 }, 2.2, 0.38, M(W / 2 + 0.02, belt + 0.25, -0.6, 0, Math.PI / 2, 0)));
    signs.push(signGeo('AMBULÂNCIA', { bg: '#ffffff', fg: '#d01818', border: false, w: 512, h: 96 }, 2.2, 0.38, M(-W / 2 - 0.02, belt + 0.25, -0.6, 0, -Math.PI / 2, 0)));
    signs.push(signGeo('AMBULÂNCIA', { bg: '#ffffff', fg: '#d01818', border: false, w: 512, h: 96 }, 1.3, 0.25, M(0, belt - 0.1, hl + 0.06), true)); // espelhado (lido no retrovisor)
    signs.push(signGeo('SAMU 192', { bg: '#ffffff', fg: '#d01818', border: false, w: 512, h: 96 }, 1.0, 0.25, M(-0.4, 2.2, -hl - 0.02, 0, Math.PI, 0)));
  }
  // interior simples (bancos e painel visíveis pelo para-brisa)
  const steerPos = [0.42, belt + 0.15, T.ws[0] - 0.6];
  const seatCfg = seatLayout({ x: 0.42, floor: Math.max(bottom + 0.3, wr * 2 + 0.16), roof: cabTop, steer: steerPos, ws0: T.ws[0] }); // cabine acima das rodas da frente
  seatsGeo(P, seatCfg, 0x2a2a2e, M);
  dashGeo(P, seatCfg, { W, belt: belt + 0.1, ws0: T.ws[0], roof: cabTop, dashC: 0x1e1e20, accent: 0x2a6aaa, floor: seatCfg.floor }, M);
  const exhausts = [[W * 0.3, bottom + 0.05, -hl - 0.05]];
  P.push(nonIdx(new THREE.CylinderGeometry(0.06, 0.06, 0.3, 10), 0xbfc2c6, M(W * 0.3, bottom + 0.05, -hl + 0.05, Math.PI / 2, 0, 0)));
  const body = mergeGeometries(P);
  // vidros: para-brisa e janelas laterais da cabine (por fora da lataria)
  const gl = [];
  const wsLen = Math.hypot(T.ws[1] - (hl - 0.2), cabTop - (belt + 0.05));
  gl.push(new THREE.BoxGeometry(W - 0.3, wsLen * 0.92, 0.03).rotateX(-Math.atan2(T.ws[1] - (hl - 0.2), cabTop - belt - 0.05)).translate(0, (belt + cabTop) / 2 + 0.05, (T.ws[1] + hl - 0.2) / 2 + 0.03));
  for (const s of [-1, 1]) gl.push(new THREE.BoxGeometry(0.03, (cabTop - belt) * 0.7, (hl - 0.4 - cabBack) * 0.75).translate(s * (W / 2 + 0.01), belt + (cabTop - belt) * 0.45, (hl - 0.4 + cabBack) / 2 - 0.1));
  if (!truck) for (const s of [-1, 1]) gl.push(new THREE.BoxGeometry(0.03, 0.45, 0.8).translate(s * (W / 2 + 0.01), 2.0, -0.3));
  const glass = mergeGeometries(gl.map((g) => g.toNonIndexed()));
  const hg = [], tg = [];
  for (const s of [-1, 1]) { hg.push(new THREE.BoxGeometry(0.4, 0.2, 0.06).translate(s * (W / 2 - 0.3), belt - 0.35, hl + 0.03)); tg.push(new THREE.BoxGeometry(0.22, 0.4, 0.06).translate(s * (W / 2 - 0.15), bottom + 0.6, -hl - 0.03)); }
  // luzes de emergência extras nas laterais do baú (vermelhas)
  const head = mergeGeometries(hg.map((g) => nonIdx(g, 0xffffff))), tail = mergeGeometries(tg.map((g) => nonIdx(g, 0xffffff)));
  const wheelPos = []; for (const z of truck ? [wb, -wb, -wb + 1.25] : [wb, -wb]) for (const sx of [1, -1]) wheelPos.push({ x: sx * (W / 2 - 0.2), z, sx });
  const lowBody = nonIdx(shapeCar(extrudeProfile(prof, W, 0), { ...shp }), main);
  const wLow = mergeGeometries([nonIdx(new THREE.CylinderGeometry(wr, wr, 0.3, 10), 0x161616, M(0, 0, 0, 0, 0, Math.PI / 2)), nonIdx(new THREE.CylinderGeometry(wr * 0.6, wr * 0.6, 0.32, 8), 0xa9adb2, M(0, 0, 0, 0, 0, Math.PI / 2))]);
  const lp = [lowBody, nonIdx(head.clone(), 0xfff0c0), nonIdx(glass.clone(), 0x1c2630), nonIdx(tail.clone(), 0x7a1010)];
  for (const w of wheelPos) lp.push(wLow.clone().applyMatrix4(new THREE.Matrix4().makeTranslation(w.x, wr, w.z)));
  return { body, glass, head, tail, door: null, lod: mergeGeometries(lp), wheelPos, lift: 0, exhausts, signs: signs.length ? mergeGeometries(signs) : null,
    seat: [0.42, seatCfg.hipY - 0.56, seatCfg.hipZ], steerPos, seatCfg };
}
// ---------- motos ----------
function buildMoto(T, m, color) {
  const wb = T.wheelBase / 2, wr = T.wr, P = [];
  const susp = m.suspLevel ?? 1; const lift = (susp - 1) * 0.04;
  const metal = 0x2a2c30, chromeC = 0xc8ccd2;
  const tube = (a, b, r, c) => { const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b); const d = B.clone().sub(A); const len = d.length();
    P.push(nonIdx(new THREE.CylinderGeometry(r, r, len, 8), c, new THREE.Matrix4().compose(A.clone().add(B).multiplyScalar(0.5), new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize()), new THREE.Vector3(1, 1, 1)))); };
  const chopper = T.style === 'custom', sport = T.style === 'esportiva', scooter = T.style === 'scooter';
  const head = [0, chopper ? 1.0 : 0.98, wb - (chopper ? 0.45 : 0.22)];
  // garfo dianteiro e quadro
  // garfo: peça separada que gira junto com a roda da frente (fica por fora do pneu)
  const FK = []; const ftube = (a, b, r, c) => { const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b); const d = B.clone().sub(A); FK.push(nonIdx(new THREE.CylinderGeometry(r, r, d.length(), 8), c, new THREE.Matrix4().compose(A.clone().add(B).multiplyScalar(0.5), new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize()), new THREE.Vector3(1, 1, 1)))); };
  for (const s of [-1, 1]) { ftube([s * 0.105, head[1] + 0.05 - wr, head[2] - wb], [s * 0.105, 0, 0], 0.025, chromeC); FK.push(nonIdx(new THREE.CylinderGeometry(0.03, 0.03, 0.05, 8), metal, M(s * 0.105, 0, 0, 0, 0, Math.PI / 2))); }
  FK.push(nonIdx(new THREE.BoxGeometry(0.24, 0.05, 0.06), metal, M(0, head[1] - 0.05 - wr, head[2] - wb))); // mesa do garfo
  tube(head, [0, 0.5, -0.15], 0.04, metal); tube(head, [0, 0.82, -0.2], 0.035, metal);
  for (const s of [-1, 1]) tube([s * 0.12, 0.45, -0.15], [s * 0.13, wr, -wb], 0.03, metal); // balança traseira com dois braços, por fora do pneu
  P.push(nonIdx(new THREE.CylinderGeometry(0.02, 0.02, 0.28, 8), metal, M(0, wr, -wb, 0, 0, Math.PI / 2))); // eixo (passa pelo cubo da roda)
  if (!scooter) P.push(nonIdx(new THREE.BoxGeometry(0.26, 0.3, 0.42), metal, M(0, 0.48, 0.02))); // motor
  if (!scooter) for (let i = 0; i < 4; i++) P.push(nonIdx(new THREE.BoxGeometry(0.3, 0.015, 0.36), 0x555a60, M(0, 0.38 + i * 0.07, 0.03)));
  // tanque, banco e rabeta
  if (scooter) { P.push(nonIdx(toCreasedNormals(new THREE.BoxGeometry(0.34, 0.5, 0.62, 2, 2, 2), 0.6), color, M(0, 0.55, 0.0))); P.push(nonIdx(toCreasedNormals(new THREE.BoxGeometry(0.3, 0.28, 0.5, 2, 2, 2), 0.6), color, M(0, 0.73, -wb + 0.05))); P.push(nonIdx(new THREE.BoxGeometry(0.3, 0.55, 0.16), color, M(0, 0.72, 0.3, -0.25, 0, 0))); }
  else P.push(nonIdx(new THREE.SphereGeometry(1, 14, 10), color, M(0, chopper ? 0.92 : 0.95, 0.22, chopper ? -0.15 : -0.12, 0, 0, 0.17, 0.13, 0.32)));
  P.push(nonIdx(new THREE.CapsuleGeometry(0.11, 0.42, 2, 8), 0x161616, M(0, chopper ? 0.74 : 0.9, chopper ? -0.25 : -0.32, Math.PI / 2 - (sport ? 0.15 : 0), 0, 0, 1.25, 1, 0.55)));
  if (!chopper && !scooter) { P.push(nonIdx(toCreasedNormals(new THREE.BoxGeometry(0.22, 0.14, 0.5, 2, 2, 2), 0.6), color, M(0, sport ? 0.88 : 0.84, -0.68, sport ? 0.18 : 0.05, 0, 0))); tube([0, 0.82, -0.2], [0, 0.82, -0.8], 0.03, metal); }
  // carenagem esportiva
  if (sport) { P.push(nonIdx(toCreasedNormals(new THREE.ConeGeometry(0.25, 0.5, 8, 1), 0.6), color, M(0, 0.98, 0.5, -Math.PI / 2 + 0.6, 0, 0, 1, 1, 0.75))); P.push(nonIdx(new THREE.BoxGeometry(0.36, 0.34, 0.5), color, M(0, 0.6, 0.08, 0.1, 0, 0))); }
  // para-lamas
  FK.push(nonIdx(new THREE.TorusGeometry(wr + 0.075, 0.035, 4, 12, Math.PI * 0.6), color, M(0, 0, 0, 0, Math.PI / 2, 0.4, 1, 1, 1.6))); // para-lama da frente (gira com a roda)
  P.push(nonIdx(new THREE.TorusGeometry(wr + 0.085, 0.035, 4, 12, Math.PI * 0.5), color, M(0, wr, -wb, 0, Math.PI / 2, Math.PI * 0.45, 1, 1, 1.6)));
  // escapamento
  const ex = [0.16, 0.42, -wb - 0.1]; tube([0.12, 0.35, 0.15], [0.16, 0.36, -0.3], 0.035, chromeC);
  P.push(nonIdx(new THREE.CylinderGeometry(0.06, 0.05, 0.5, 10), chromeC, M(0.16, 0.4, -wb + 0.15, Math.PI / 2 - 0.15, 0, 0)));
  // pedaleiras
  for (const s of [-1, 1]) P.push(nonIdx(new THREE.BoxGeometry(0.12, 0.03, 0.06), 0x111111, M(s * 0.18, 0.36, chopper ? 0.35 : -0.05)));
  const body = mergeGeometries(P);
  // guidão (gira com a direção)
  const bw = chopper ? 0.8 : sport ? 0.55 : 0.7, by = chopper ? 0.35 : sport ? 0.02 : 0.12;
  const bars = mergeGeometries([nonIdx(new THREE.CylinderGeometry(0.018, 0.018, bw, 8), 0x1a1a1a, M(0, by, 0, 0, 0, Math.PI / 2)), ...[-1, 1].map((s) => nonIdx(new THREE.CylinderGeometry(0.028, 0.028, 0.12, 8), 0x111111, M(s * bw / 2, by, 0, 0, 0, Math.PI / 2))),
    nonIdx(new THREE.CylinderGeometry(0.02, 0.02, Math.abs(by) + 0.05, 6), chromeC, M(0, by / 2, 0)), nonIdx(new THREE.SphereGeometry(0.08, 10, 8), 0x222222, M(0, -0.05, 0.14, 0, 0, 0, 1, 1, 0.7))]);
  const glass = sport ? new THREE.BoxGeometry(0.3, 0.22, 0.02).rotateX(-0.6).translate(0, 1.12, 0.62) : new THREE.BoxGeometry(0.01, 0.01, 0.01);
  const headG = nonIdx(new THREE.SphereGeometry(0.07, 10, 8).translate(0, head[1] - 0.05, head[2] + 0.18), 0xffffff);
  const tail = nonIdx(new THREE.BoxGeometry(0.12, 0.05, 0.03).translate(0, sport ? 0.92 : 0.86, -0.94), 0xffffff);
  const wheelPos = [{ x: 0, z: wb, sx: 1 }, { x: 0, z: -wb, sx: 1 }];
  const wg = wheelGeo(wr, m.wheel, true);
  const lp = [body.clone(), headG.clone(), tail.clone()];
  for (const w of wheelPos) lp.push(wg.clone().applyMatrix4(new THREE.Matrix4().makeTranslation(0, wr, w.z)));
  const up = new THREE.Matrix4().makeTranslation(0, lift, 0); for (const g of [body, glass, headG, tail]) g.applyMatrix4(up); for (let i = 0; i < 3; i++) lp[i].applyMatrix4(up);
  return { fork: mergeGeometries(FK), body, glass, head: headG, tail, door: null, lod: mergeGeometries(lp), wheelPos, lift, exhausts: [[ex[0], ex[1] + lift, ex[2]]], bars,
    seat: [0, (chopper ? 0.74 : 0.9) + lift - 0.86, chopper ? -0.28 : -0.34], steerPos: [0, head[1] + 0.08 + lift, head[2] - 0.05] };
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
    this.wreck = 0; // 0 inteiro, 1 quebrado (fumaça), 2 pegando fogo, 3 queimado
  }
  // ponto do motor (de onde sai a fumaça/fogo), em coordenadas locais
  get enginePos() { const T = this.T; return T.moto ? [0, 0.55, 0.1] : T.rearEngine ? [0, T.roof * 0.6, -T.L / 2 + 0.6] : [0, Math.max(0.75, T.roof * 0.62), T.L / 2 - 0.75]; }
  // depois da explosão: tudo preto/queimado (só esta instância), sem luzes
  char() {
    if (!Vehicle.charMat) { Vehicle.charMat = new THREE.MeshLambertMaterial({ color: 0x1b1916 }); Vehicle.charGlass = new THREE.MeshLambertMaterial({ color: 0x0a0a0a, transparent: true, opacity: 0.35 }); }
    const all = new Set([...this.built, ...(this.detail || []), ...(this.detailParts || [])]); all.add(this.group);
    for (const o of all) o.traverse((m) => { if (m.isMesh) m.material = Array.isArray(m.material) ? m.material.map((x) => (x.transparent ? Vehicle.charGlass : Vehicle.charMat)) : (m.material && m.material.transparent ? Vehicle.charGlass : Vehicle.charMat); if (m.isLight) m.visible = false; });
    if (this.lodMesh) this.lodMesh.material = Vehicle.charMat;
    this.charred = true;
  }
  // som do motor: o escolhido na oficina (ou o do modelo)
  get soundProfile() { return ENGINES[this.mods.engineType]?.sound || this.T.sound; }
  // características efetivas (tipo + melhorias da oficina)
  get stats() {
    const T = this.T, m = this.mods;
    return {
      accel: T.accel * (1 + 0.12 * m.engine + (m.turbo ? 0.32 : 0)) * (ENGINES[m.engineType]?.accel || 1), maxSpeed: T.maxSpeed * (1 + 0.05 * m.engine + (m.turbo ? 0.14 : 0)) * (ENGINES[m.engineType]?.top || 1),
      brake: (T.brake || 13) * (1 + 0.15 * m.brakes), grip: (T.grip || 9) * (1 + 0.07 * m.susp + (m.suspLevel === 0 ? 0.08 : m.suspLevel === 2 ? -0.08 : 0)), drift: T.drift || 1, steer: T.steer || 0.62,
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

  // monta o visual. A geometria é compartilhada entre carros iguais (mesmo modelo, cor e peças): menos memória e carregamento mais rápido
  build(color) {
    const T = this.T, m = this.mods;
    const key = this.type + '|' + color + '|' + JSON.stringify(m);
    let C = GEO_CACHE.get(key);
    if (!C) { C = buildGeo(T, m, color); GEO_CACHE.set(key, C); }
    this.geo = C;
    const bodyMesh = this._add(this.body, new THREE.Mesh(C.body, bodyMat));
    bodyMesh.castShadow = true; bodyMesh.receiveShadow = true;
    let gm = glassMat;
    if (m.tint) { gm = TINT_MATS[m.tint]; }
    const glassMesh = this._add(this.body, new THREE.Mesh(C.glass, gm)); glassMesh.renderOrder = 2;
    const head = this._add(this.body, new THREE.Mesh(C.head, m.xenon ? xenonMat : headMat));
    this.tail = this._add(this.body, new THREE.Mesh(C.tail, tailMat));
    if (T.police || T.siren) {
      const z = T.sirenZ ?? -0.35, svc = !!T.siren;
      this.sirenL = this._add(this.body, new THREE.Mesh(SIREN_GEO, sirenMats[0]));
      this.sirenR = this._add(this.body, new THREE.Mesh(SIREN_GEO, svc ? sirenMats[2] : sirenMats[1]));
      this.sirenL.position.set(0.3, T.roof + 0.1, z); this.sirenR.position.set(-0.3, T.roof + 0.1, z);
      if (svc) this.sirenL.scale.set(1.4, 1, 1), this.sirenR.scale.set(1.4, 1, 1);
    }
    if (C.signs) { this.signMesh = this._add(this.body, new THREE.Mesh(C.signs, mats().sign)); this.signMesh.castShadow = false; }
    if (m.neon != null) {
      const nm = new THREE.MeshBasicMaterial({ color: m.neon, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false });
      const neon = this._add(this.group, new THREE.Mesh(new THREE.PlaneGeometry(T.W + 0.8, T.L + 0.4).rotateX(-Math.PI / 2), nm));
      neon.position.y = 0.04;
    }
    // volante / guidão
    this.steeringWheel = this._add(this.body, new THREE.Group());
    this.steeringWheel.add(new THREE.Mesh(T.moto ? C.bars : STEER_GEO, T.moto ? bodyMat : wheelMat));
    this.steeringWheel.position.set(...C.steerPos);
    this.steeringWheel.rotation.x = T.moto ? 0 : -0.45;
    this.steeringWheel.rotation.order = 'YXZ';
    // rodas
    this.wheels = [];
    const wg = wheelGeo(T.wr, m.wheel, T.moto);
    for (const w of C.wheelPos) {
      const pivot = this._add(this.group, new THREE.Group());
      pivot.position.set(w.x, T.wr, w.z);
      const spin = new THREE.Mesh(wg, wheelMat); spin.castShadow = true;
      if (w.sx < 0) spin.rotation.y = Math.PI;
      const holder = new THREE.Group(); holder.add(spin); pivot.add(holder);
      this.wheels.push({ pivot, holder, front: w.z > 0, sx: w.sx, sz: Math.sign(w.z) });
      if (C.fork && w.z > 0) { const fk = new THREE.Mesh(C.fork, bodyMat); fk.castShadow = true; pivot.add(fk); }
    }
    // porta do motorista (aparece só quando abre: animação de entrar/roubar)
    this.door = null;
    if (C.door) {
      this.door = this._add(this.body, new THREE.Group()); this.door.position.set(...C.doorHinge);
      this.door.add(new THREE.Mesh(C.door, bodyMat)); const dg = new THREE.Mesh(C.doorGlass, gm); dg.renderOrder = 2; this.door.add(dg);
      this.doorHole = this._add(this.body, new THREE.Mesh(C.doorHole, holeMat));
      this.door.visible = false; this.doorHole.visible = false; this.doorOpen = 0;
    }
    this.lodMesh = this._add(this.group, new THREE.Mesh(C.lod, bodyMat));
    this.lodMesh.visible = false;
    this.detail = [bodyMesh, this.tail, this.steeringWheel, head, ...this.wheels.map((w) => w.pivot), ...(this.signMesh ? [this.signMesh] : [])];
    if (this.sirenL) this.detail.push(this.sirenL, this.sirenR);
    this.glassMesh = glassMesh;
    this.exhausts = C.exhausts;
    this.lod = false;
    this.seat = new THREE.Vector3(...C.seat); this.seatCfg = C.seatCfg || null; this.travel = C.travel ?? 1;
    this.detailParts = [glassMesh, ...(this.door ? [this.door, this.doorHole] : [])];
    // matrizes só são recalculadas quando o carro se move (muito menos trabalho por quadro)
    this.group.traverse((o) => { if (o.isHumanoidRoot) return; o.matrixAutoUpdate = false; o.updateMatrix(); });
  }
  // abre/fecha a porta do motorista (0 = fechada, 1 = aberta)
  setDoor(k) {
    if (!this.door) return;
    this.doorOpen = k; const vis = k > 0.01 && !this.lod;
    this.door.visible = vis; this.doorHole.visible = vis;
    this.door.rotation.y = -k * 1.15; this.door.updateMatrix();
  }
  // longe: tira as peças de detalhe da cena (fica só a malha única); perto: devolve
  setLOD(far) {
    if (far === this.lod) return;
    this.lod = far;
    const parts = [...this.detail, ...this.detailParts];
    if (far) { this._parents = parts.map((o) => o.parent); for (const o of parts) if (o.parent) o.parent.remove(o); }
    else if (this._parents) { parts.forEach((o, i) => { const par = this._parents[i]; if (par && !o.parent) par.add(o); }); }
    this.lodMesh.visible = far;
    if (far) { this.body.rotation.set(0, 0, 0); this.body.updateMatrix(); }
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
    const fwd = this.speed; const hb = inp.handbrake > 0 || this.wreck === 3;
    // motor / freio
    let acc = 0;
    let thr = inp.throttle || 0;
    if (this.driver === 'player') {
      this.fuel = Math.max(0, this.fuel - Math.abs(this.speed) * dt / (9000 * this.tank / 55));
      if (this.fuel <= 0) thr = Math.min(thr, 0.12);
    }
    // carro quebrado: anda devagar e falhando; pegando fogo/queimado: não anda mais
    if (this.wreck >= 2) thr = 0;
    else if (this.wreck === 1) thr *= Math.sin(performance.now() * 0.004) > -0.3 ? 0.5 : 0.05;
    const hp = 0.45 + 0.55 * this.health;
    const vmax = this.wreck === 1 ? Math.min(7, st.maxSpeed * 0.3) : st.maxSpeed * hp;
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
    const maxSteer = st.steer / (1 + Math.abs(this.speed) * 0.05);
    this.steer = damp(this.steer, (inp.steer || 0) * maxSteer, 9.5, dt);
    let targetYaw = this.speed * Math.tan(this.steer) / T.wheelBase;
    // limite de aderência lateral (depende do carro); com freio de mão a traseira solta um pouco
    const gripLimit = st.grip * (hb ? 1.55 : 1.72);
    const maxYaw = gripLimit / Math.max(4, Math.abs(this.speed));
    targetYaw = Math.max(-maxYaw, Math.min(maxYaw, targetYaw * (hb ? 1.15 : 1)));
    this.yawRate = damp(this.yawRate, targetYaw, hb ? 6 : 10.5, dt);
    this.heading += this.yawRate * dt;
    // derrapagem controlada: velocidade lateral limitada e que se recupera rápido ao soltar
    const slip = hb ? 0.05 * st.drift : 0.012;
    this.lat += -this.yawRate * this.speed * slip * dt * 10;
    const latMax = Math.abs(this.speed) * (hb ? 0.32 : 0.12);
    this.lat = Math.max(-latMax, Math.min(latMax, this.lat));
    this.lat = damp(this.lat, 0, hb ? st.grip * 0.55 : st.grip * 1.1, dt);
    this.pushVx = damp(this.pushVx, 0, 3, dt); this.pushVz = damp(this.pushVz, 0, 3, dt);
    this.x += this.velX * dt; this.z += this.velZ * dt;
    if (!this.cheap) this.resolveCollisions(others); // longe do jogador: sem colisão detalhada (economiza CPU)
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
      this.lastHit = impact; this.hitCar = null;
      // transfere impulso a outros carros próximos
      if (others) for (const o of others) {
        if (o === this) continue;
        const dx = o.x - this.x, dz = o.z - this.z;
        const d = Math.hypot(dx, dz);
        if (d < (T.L + o.T.L) / 2 + 0.3 && d > 0.01) {
          o.pushVx += (dx / d) * impact * 0.4; o.pushVz += (dz / d) * impact * 0.4;
          o.awake = true; this.hitCar = o;
        }
      }
    } else { this.lastHit = 0; this.hitCar = null; }
  }

  syncTransform(dt) {
    const T = this.T;
    const g = this.world.groundFn;
    const wb = T.wheelBase / 2, hw = T.W / 2 - 0.14;
    const [fx, fz] = this.local(0, wb), [bx, bz] = this.local(0, -wb);
    const [lx, lz] = this.local(hw, 0), [rx, rz] = this.local(-hw, 0);
    const hc = this.cheap ? g(this.x, this.z) : 0;
    const hf = this.cheap ? hc : g(fx, fz), hb = this.cheap ? hc : g(bx, bz), hlft = this.cheap ? hc : g(lx, lz), hr = this.cheap ? hc : g(rx, rz);
    const ty = (hf + hb + hlft + hr) / 4;
    const k = dt > 0 ? 1 - Math.exp(-12 * dt) : 1;
    this.y += (ty - this.y) * k;
    const tPitch = Math.atan2(hb - hf, T.wheelBase) - (dt > 0 ? THREE.MathUtils.clamp((this.speed - (this._lastSpeed ?? this.speed)) / dt * 0.003, -0.03, 0.03) * (this.travel ?? 1) : 0);
    const tRoll = Math.atan2(hlft - hr, T.W) + THREE.MathUtils.clamp(this.yawRate * this.speed * 0.005, -0.04, 0.04) * (this.travel ?? 1);
    this._lastSpeed = this.speed;
    this.pitch += (tPitch - this.pitch) * k; this.roll += (tRoll - this.roll) * k;
    this.group.position.set(this.x, this.y, this.z);
    this.group.rotation.set(0, this.heading, 0); this.group.updateMatrix();
    this.body.rotation.set(this.pitch, 0, this.roll);
    this.wheelSpin += this.speed / T.wr * dt;
    for (const w of this.wheels) {
      w.pivot.rotation.y = w.front ? this.steer : 0;
      w.holder.rotation.x = this.wheelSpin;
    }
    if (T.moto) { // moto inclina nas curvas; guidão gira
      this.lean = (this.lean || 0) + ((-THREE.MathUtils.clamp(this.yawRate * Math.abs(this.speed) * 0.09, -0.6, 0.6)) - (this.lean || 0)) * (dt > 0 ? 1 - Math.exp(-6 * dt) : 1);
      this.body.rotation.set(this.pitch, 0, this.lean); this.steeringWheel.rotation.y = this.steer * 0.8;
      for (const w of this.wheels) w.pivot.rotation.z = this.lean;
    } else this.steeringWheel.rotation.z = -this.steer * 3;
    this.tail.material = this.braking ? tailBrakeMat : tailMat;
    this.body.updateMatrix(); this.steeringWheel.updateMatrix();
    for (const w of this.wheels) { w.pivot.updateMatrix(); w.holder.updateMatrix(); }
  }
}

let sirenT = 0;
export function updateSirens(dt) {
  sirenT += dt;
  const a = Math.floor(sirenT * 4) % 2 === 0;
  sirenMats[0].color.setHex(a ? 0xff1a1a : 0x330000);
  sirenMats[1].color.setHex(a ? 0x000033 : 0x2244ff);
  sirenMats[2].color.setHex(a ? 0x333333 : 0xffffff); // ambulância/bombeiros: vermelho e branco
}
export function setHeadlights(on) { headMat.color.setHex(on ? 0xfff6d8 : 0xc8c8c0); tailMat.color.setHex(on ? 0x9a1010 : 0x5a0a0a); }

// ---- verificação: nenhuma peça da carroceria/interior pode entrar no volume dos pneus ----
// (inclui as rodas da frente esterçadas e o movimento da carroceria na suspensão). Usado pelos testes.
export function debugWheelClip(type, mods = {}) {
  const T = CAR_TYPES[type]; const m = { ...defaultMods(type, 0x777777), ...mods }; const C = buildGeo(T, m, 0x777777);
  const S = WHEELS[m.wheel] || WHEELS.padrao; const tw = T.moto ? 0.14 : S.chunky ? 0.3 : 0.24, r = T.wr;
  const out = []; const p = new THREE.Vector3(); const pos = C.body.attributes.position;
  const steerMax = T.steer || 0.62, margin = 0.025, travel = T.moto ? 0 : 0.05 * (C.travel ?? 1); // na moto a roda acompanha o quadro // folga mínima e curso da carroceria
  const tris = pos.count / 3;
  for (let t = 0; t < tris; t++) {
    const pts = [];
    for (let k = 0; k < 3; k++) pts.push(new THREE.Vector3().fromBufferAttribute(pos, t * 3 + k));
    pts.push(pts[0].clone().add(pts[1]).add(pts[2]).multiplyScalar(1 / 3), pts[0].clone().lerp(pts[1], 0.5), pts[1].clone().lerp(pts[2], 0.5), pts[0].clone().lerp(pts[2], 0.5));
    let bad = null;
    for (const w of C.wheelPos) for (const ang of (w.z > 0 && !T.moto ? [0, steerMax, -steerMax] : [0])) for (const dy of [0, -travel]) {
      for (const q of pts) {
        p.set(q.x - w.x, q.y + dy - r, q.z - w.z); // carroceria descendo "travel" sobre a roda
        const c = Math.cos(-ang), s = Math.sin(-ang); const lx = p.x * c + p.z * s, lz = -p.x * s + p.z * c;
        if (Math.abs(lx) < tw / 2 + margin && Math.hypot(p.y, lz) < r + margin && Math.hypot(p.y, lz) > r * 0.18) { const bb = new THREE.Box3().setFromPoints(pts.slice(0, 3)); const sz = bb.getSize(new THREE.Vector3()); bad = [+q.x.toFixed(2), +q.y.toFixed(2), +q.z.toFixed(2), w.z > 0 ? 'F' : 'T', ang ? 'esterço' : '', dy ? 'suspensão' : '', [+sz.x.toFixed(2), +sz.y.toFixed(2), +sz.z.toFixed(2)], [+bb.min.y.toFixed(2), +bb.max.y.toFixed(2), +bb.min.z.toFixed(2), +bb.max.z.toFixed(2)], C.body.attributes.color ? '#' + new THREE.Color().fromBufferAttribute(C.body.attributes.color, t * 3).getHexString() : '']; break; }
      }
      if (bad) break;
    }
    if (bad) out.push(bad);
  }
  return out;
}
