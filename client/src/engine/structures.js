// Estruturas procedurais (estádio com torcida, gols, cabana, casas, estradas…), veículos e bola.
// Retornam { object, colliders?, update?, lights? }. Colliders: caixas AABB locais {min,max}.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { buildMaterial } from './textures.js';
import { rng } from './noise.js';
import { shared } from './nature.js';

const M = (preset, opts = {}, quality = 'high') => buildMaterial({ preset, ...opts }, { quality });
const box = (w, h, d, mat, x = 0, y = 0, z = 0) => {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true;
  return m;
};
const aabb = (x0, y0, z0, x1, y1, z1) => ({ min: [x0, y0, z0], max: [x1, y1, z1] });
function rotateAABB(b, rot) {
  const c = Math.cos(rot); const sn = Math.sin(rot);
  const xs = []; const zs = [];
  for (const x of [b.min[0], b.max[0]]) for (const z of [b.min[2], b.max[2]]) { xs.push(x * c + z * sn); zs.push(-x * sn + z * c); }
  return aabb(Math.min(...xs), b.min[1], Math.min(...zs), Math.max(...xs), b.max[1], Math.max(...zs));
}

// ───────── Marcações do campo de futebol (textura em canvas) ─────────
export function soccerMarkings(length = 105, width = 68) {
  const s = 20; // px por metro
  const c = document.createElement('canvas');
  c.width = Math.round(width * s); c.height = Math.round(length * s);
  const g = c.getContext('2d');
  g.strokeStyle = 'rgba(255,255,255,0.92)'; g.lineWidth = 0.12 * s;
  const X = (m) => m * s; const W = c.width; const H = c.height;
  g.strokeRect(X(0.5), X(0.5), W - X(1), H - X(1));
  g.beginPath(); g.moveTo(X(0.5), H / 2); g.lineTo(W - X(0.5), H / 2); g.stroke();
  g.beginPath(); g.arc(W / 2, H / 2, X(9.15), 0, Math.PI * 2); g.stroke();
  g.fillStyle = 'white'; g.beginPath(); g.arc(W / 2, H / 2, X(0.25), 0, Math.PI * 2); g.fill();
  for (const top of [true, false]) {
    const y = top ? X(0.5) : H - X(0.5); const dir = top ? 1 : -1;
    g.strokeRect(W / 2 - X(20.16), top ? y : y - X(16.5), X(40.32), X(16.5));
    g.strokeRect(W / 2 - X(9.16), top ? y : y - X(5.5), X(18.32), X(5.5));
    g.beginPath(); g.arc(W / 2, y + dir * X(11), X(0.25), 0, Math.PI * 2); g.fill();
    g.beginPath(); g.arc(W / 2, y + dir * X(11), X(9.15), top ? 0.2 * Math.PI : 1.2 * Math.PI, top ? 0.8 * Math.PI : 1.8 * Math.PI); g.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 8; tex.colorSpace = THREE.SRGBColorSpace;
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, length), new THREE.MeshStandardMaterial({ map: tex, transparent: true, roughness: 0.8, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }));
  mesh.rotation.x = -Math.PI / 2; mesh.position.y = 0.02; mesh.receiveShadow = true;
  return mesh;
}

// ───────── Torcida instanciada com animação no shader ─────────
function crowdMaterial() {
  const mat = new THREE.MeshStandardMaterial({ roughness: 0.85 });
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = shared.time;
    shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nuniform float uTime;')
      .replace('#include <begin_vertex>', `#include <begin_vertex>
        vec3 ipc = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
        float ph = fract(sin(dot(ipc.xz, vec2(12.9898, 78.233))) * 43758.5453);
        float excite = step(0.55, sin(uTime * 0.35 + ipc.x * 0.02));
        transformed.y += abs(sin(uTime * (3.0 + ph * 3.0) + ph * 6.28)) * (0.04 + excite * 0.22);
        if (position.y > 0.9) transformed.x += sin(uTime * 5.0 + ph * 10.0) * 0.06 * excite;`);
  };
  return mat;
}

function crowdGeometry() {
  const body = new THREE.CapsuleGeometry(0.2, 0.5, 2, 6).translate(0, 0.55, 0);
  const head = new THREE.SphereGeometry(0.13, 8, 6).translate(0, 1.08, 0);
  return mergeGeometries([body, head]);
}

export function buildStadium(e, quality) {
  const p = e.props;
  const L = p.length || 105; const W = p.width || 68;
  const tiers = p.tiers || 3;
  const g = new THREE.Group();
  const concrete = M('concrete', { textureScale: 6 }, quality);
  const seatColors = [p.homeColor || '#7c3aed', p.awayColor || '#06b6d4', '#334155'];
  const seatsMat = seatColors.map((c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.5, metalness: 0.1 }));
  const colliders = [];
  const crowd = [];
  const r = rng(42);
  const density = (p.crowd === false ? 0 : (p.crowdDensity ?? 0.8)) * ({ low: 0.15, medium: 0.45, high: 0.8, ultra: 1 }[quality] ?? 0.8);
  const margin = 8; const rowDepth = 0.85; const rowH = 0.42; const rowsPerTier = 14;
  const sides = [
    { len: W + margin * 2, off: L / 2 + margin, rot: 0 },
    { len: W + margin * 2, off: L / 2 + margin, rot: Math.PI },
    { len: L + margin * 2, off: W / 2 + margin, rot: Math.PI / 2 },
    { len: L + margin * 2, off: W / 2 + margin, rot: -Math.PI / 2 },
  ];
  // Grama de entorno e pista
  const apron = new THREE.Mesh(new THREE.PlaneGeometry(W + margin * 2, L + margin * 2), M('pitch', { textureScale: 1 }, quality));
  apron.rotation.x = -Math.PI / 2; apron.position.y = 0.005; apron.receiveShadow = true; g.add(apron);
  sides.forEach((s, si) => {
    const side = new THREE.Group();
    side.rotation.y = s.rot;
    // Tribuna em degraus: perfil extrudado
    for (let t = 0; t < tiers; t++) {
      const shape = new THREE.Shape();
      const baseD = t * (rowsPerTier * rowDepth + 3); const baseH = t * (rowsPerTier * rowH + 3.2);
      shape.moveTo(baseD, baseH);
      for (let i = 0; i < rowsPerTier; i++) { shape.lineTo(baseD + i * rowDepth, baseH + (i + 1) * rowH); shape.lineTo(baseD + (i + 1) * rowDepth, baseH + (i + 1) * rowH); }
      shape.lineTo(baseD + rowsPerTier * rowDepth, Math.max(0, baseH - 1)); shape.lineTo(baseD, Math.max(0, baseH - 1));
      const geo = new THREE.ExtrudeGeometry(shape, { depth: s.len - t * 4, bevelEnabled: false });
      geo.rotateY(-Math.PI / 2); geo.translate(-(s.len - t * 4) / 2, 0, 0);
      const mesh = new THREE.Mesh(geo, concrete); mesh.castShadow = true; mesh.receiveShadow = true;
      mesh.position.z = s.off; side.add(mesh);
      // Assentos (faixas coloridas) e torcida
      for (let i = 0; i < rowsPerTier; i++) {
        const seat = box(s.len - t * 4 - 2, 0.12, 0.35, seatsMat[(si + t) % 2 === 0 ? 0 : 1], 0, baseH + (i + 1) * rowH + 0.08, s.off + baseD + i * rowDepth + 0.45);
        seat.castShadow = false; side.add(seat);
        const per = Math.floor(((s.len - t * 4 - 2) / 0.6) * density);
        for (let j = 0; j < per; j++) crowd.push({ side, x: (r() - 0.5) * (s.len - t * 4 - 3), y: baseH + (i + 1) * rowH + 0.1, z: s.off + baseD + i * rowDepth + 0.4, team: r() < 0.62 ? 0 : 1 });
      }
    }
    const totalD = tiers * (rowsPerTier * rowDepth + 3); const totalH = tiers * (rowsPerTier * rowH + 3.2);
    // Parede de fundo e cobertura
    side.add(box(s.len, totalH + 4, 1, concrete, 0, (totalH + 4) / 2, s.off + totalD));
    if (p.roof !== false) {
      const roof = box(s.len + 2, 0.4, totalD * 0.75, M('metal', { color: '#cbd5e1' }, quality), 0, totalH + 6, s.off + totalD * 0.62);
      roof.rotation.x = -0.08; side.add(roof);
      for (let k = -s.len / 2 + 6; k < s.len / 2; k += 14) side.add(box(0.5, totalH + 6, 0.5, M('metal', {}, quality), k, (totalH + 6) / 2, s.off + totalD - 0.5));
    }
    // Painel de LED na borda do campo
    const led = new THREE.Mesh(new THREE.BoxGeometry(s.len - 6, 0.9, 0.15), new THREE.MeshStandardMaterial({ color: '#111', emissive: si % 2 ? '#06b6d4' : '#8b5cf6', emissiveIntensity: 1.6 }));
    led.position.set(0, 0.45, s.off - 2.5); side.add(led);
    g.add(side);
    // Colisor da tribuna: AABB local rotacionada para o espaço do estádio.
    colliders.push(rotateAABB(aabb(-s.len / 2, 0, s.off - 2.6, s.len / 2, totalH, s.off + totalD), s.rot));
  });
  if (crowd.length) {
    const mesh = new THREE.InstancedMesh(crowdGeometry(), crowdMaterial(), crowd.length);
    const d = new THREE.Object3D();
    const colors = [new THREE.Color(p.homeColor || '#7c3aed'), new THREE.Color(p.awayColor || '#06b6d4'), new THREE.Color('#e2e8f0'), new THREE.Color('#1f2937')];
    const tmp = new THREE.Vector3();
    crowd.forEach((c, i) => {
      tmp.set(c.x, c.y, c.z).applyAxisAngle(new THREE.Vector3(0, 1, 0), c.side.rotation.y);
      d.position.copy(tmp); d.rotation.set(0, c.side.rotation.y + Math.PI, 0);
      const s = 0.9 + r() * 0.25; d.scale.set(s, s, s); d.updateMatrix();
      mesh.setMatrixAt(i, d.matrix);
      mesh.setColorAt(i, r() < 0.78 ? colors[c.team] : colors[2 + Math.floor(r() * 2)]);
    });
    mesh.instanceMatrix.needsUpdate = true; mesh.computeBoundingSphere();
    mesh.castShadow = false; mesh.receiveShadow = true;
    g.add(mesh);
  }
  // Refletores
  const lights = [];
  const n = p.floodlights ?? 4;
  for (let i = 0; i < n; i++) {
    const ang = (i / n) * Math.PI * 2 + Math.PI / 4;
    const x = Math.cos(ang) * (W / 2 + 40); const z = Math.sin(ang) * (L / 2 + 40);
    const tower = box(1.2, 48, 1.2, M('metal', {}, quality), x, 24, z);
    const panel = new THREE.Mesh(new THREE.BoxGeometry(8, 4, 0.6), new THREE.MeshStandardMaterial({ color: '#fff', emissive: '#fffbe8', emissiveIntensity: 6 }));
    panel.position.set(x, 49, z); panel.lookAt(0, 0, 0);
    g.add(tower, panel);
    if (i < (quality === 'low' ? 1 : 2)) {
      const spot = new THREE.SpotLight('#fff6e0', 1800, 220, 0.7, 0.6, 1.6);
      spot.position.set(x, 49, z); spot.target.position.set(0, 0, 0);
      spot.castShadow = quality === 'ultra'; spot.shadow.mapSize.set(1024, 1024);
      g.add(spot, spot.target);
      lights.push(spot);
    }
  }
  // Iluminação geral dos refletores (simula o conjunto de torres sem o custo de muitas luzes).
  const flood = new THREE.DirectionalLight('#f4f7ff', 2.4);
  flood.position.set(W * 0.3, 90, L * 0.2);
  flood.castShadow = quality !== 'low';
  flood.shadow.mapSize.set(quality === 'ultra' ? 4096 : 2048, quality === 'ultra' ? 4096 : 2048);
  Object.assign(flood.shadow.camera, { left: -W / 2 - 20, right: W / 2 + 20, top: L / 2 + 20, bottom: -L / 2 - 20, near: 10, far: 250 });
  flood.shadow.bias = -0.0005; flood.shadow.normalBias = 0.03;
  flood.target.position.set(0, 0, 0);
  const fill = new THREE.HemisphereLight('#dfe8ff', '#1d3b1a', 0.9);
  g.add(flood, flood.target, fill);
  lights.push(flood, fill);
  return { object: g, colliders, lights, nightLights: true };
}

export function buildGoal(e, quality) {
  const w = e.props.width || 7.32; const h = e.props.height || 2.44; const depth = 2;
  const g = new THREE.Group();
  const white = new THREE.MeshStandardMaterial({ color: '#f8fafc', roughness: 0.3, metalness: 0.4 });
  const post = (x) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, h, 12), white); m.position.set(x, h / 2, 0); m.castShadow = true; return m; };
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, w + 0.12, 12), white); bar.rotation.z = Math.PI / 2; bar.position.y = h; bar.castShadow = true;
  g.add(post(-w / 2), post(w / 2), bar);
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const ctx = c.getContext('2d'); ctx.strokeStyle = 'rgba(255,255,255,0.9)'; ctx.lineWidth = 3;
  ctx.strokeRect(0, 0, 64, 64);
  const netTex = new THREE.CanvasTexture(c); netTex.wrapS = netTex.wrapT = THREE.RepeatWrapping; netTex.repeat.set(w * 5, h * 5);
  const net = new THREE.MeshStandardMaterial({ map: netTex, transparent: true, alphaTest: 0.3, side: THREE.DoubleSide, roughness: 1 });
  const back = new THREE.Mesh(new THREE.PlaneGeometry(w, h), net); back.position.set(0, h / 2, -depth); g.add(back);
  for (const s of [-1, 1]) { const side = new THREE.Mesh(new THREE.PlaneGeometry(depth, h), net); side.rotation.y = Math.PI / 2; side.position.set(s * w / 2, h / 2, -depth / 2); g.add(side); }
  const top = new THREE.Mesh(new THREE.PlaneGeometry(w, depth), net); top.rotation.x = Math.PI / 2; top.position.set(0, h, -depth / 2); g.add(top);
  void quality;
  return { object: g, colliders: [aabb(-w / 2 - 0.1, 0, -depth, -w / 2 + 0.1, h, 0), aabb(w / 2 - 0.1, 0, -depth, w / 2 + 0.1, h, 0)], goal: { width: w, height: h, depth } };
}

function gableRoof(w, d, h, mat) {
  const shape = new THREE.Shape();
  shape.moveTo(-w / 2 - 0.4, 0); shape.lineTo(0, h); shape.lineTo(w / 2 + 0.4, 0); shape.lineTo(-w / 2 - 0.4, 0);
  const geo = new THREE.ExtrudeGeometry(shape, { depth: d + 0.8, bevelEnabled: false });
  geo.translate(0, 0, -(d + 0.8) / 2);
  const m = new THREE.Mesh(geo, mat); m.castShadow = true; m.receiveShadow = true;
  return m;
}

export function buildCabin(e, quality) {
  const p = e.props; const w = p.width || 6; const d = p.depth || 5; const h = 2.8;
  const abandoned = p.style === 'abandoned';
  const g = new THREE.Group();
  const logMat = M('bark', { color: abandoned ? '#6b5a4a' : '#a0764a', textureScale: 2 }, quality);
  const r = rng(3);
  for (let y = 0.15; y < h; y += 0.3) {
    for (const [len, x, z, rot] of [[w, 0, d / 2, 0], [w, 0, -d / 2, 0], [d, w / 2, 0, Math.PI / 2], [d, -w / 2, 0, Math.PI / 2]]) {
      if (z === d / 2 && Math.abs(0) < 1 && y < 2.1 && rot === 0) {
        // vão da porta na frente
        const seg = (len - 1.1) / 2;
        for (const sx of [-1, 1]) { const log = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, seg + 0.3, 8), logMat); log.rotation.z = Math.PI / 2; log.position.set(sx * (0.55 + seg / 2), y, z); log.castShadow = true; log.receiveShadow = true; g.add(log); }
        continue;
      }
      const log = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, len + 0.3, 8), logMat);
      if (rot === 0) log.rotation.z = Math.PI / 2; else log.rotation.x = Math.PI / 2;
      log.position.set(x, y, z); log.castShadow = true; log.receiveShadow = true;
      if (abandoned && r() < 0.06) continue;
      g.add(log);
    }
  }
  const roof = gableRoof(w, d, 1.8, M('planks', { color: abandoned ? '#3a2e24' : '#5b3a22', textureScale: 2 }, quality));
  roof.rotation.y = Math.PI / 2; roof.position.y = h; g.add(roof);
  g.add(box(w, 0.1, d, M('planks', { textureScale: 2 }, quality), 0, 0.05, 0));
  const door = box(1.0, 2.0, 0.08, M('planks', { color: '#6b4226' }, quality), 0, 1.0, d / 2);
  if (p.doorOpen) { door.position.x = 0.5; door.rotation.y = -1.2; door.position.z = d / 2 + 0.45; }
  g.add(door);
  const lights = [];
  if (!abandoned) {
    const win = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.7), new THREE.MeshStandardMaterial({ color: '#ffd27a', emissive: '#ffb347', emissiveIntensity: 2.5 }));
    win.position.set(w / 2 + 0.17, 1.5, 0); win.rotation.y = Math.PI / 2; g.add(win);
    const lamp = new THREE.PointLight('#ffb35c', 8, 9, 2); lamp.position.set(0, 1.8, 0); g.add(lamp); lights.push(lamp);
  }
  const t = 0.3;
  return { object: g, colliders: [aabb(-w / 2 - t, 0, -d / 2 - t, w / 2 + t, h, -d / 2 + t), aabb(-w / 2 - t, 0, -d / 2, -w / 2 + t, h, d / 2), aabb(w / 2 - t, 0, -d / 2, w / 2 + t, h, d / 2), aabb(-w / 2, 0, d / 2 - t, -0.55, h, d / 2 + t), aabb(0.55, 0, d / 2 - t, w / 2, h, d / 2 + t)], lights };
}

export function buildHouse(e, quality) {
  const p = e.props; const floors = p.floors || 1; const w = 8; const d = 7; const fh = 3;
  const g = new THREE.Group();
  const wall = M('concrete', { color: p.color || '#e5e7eb', textureScale: 2 }, quality);
  const body = box(w, fh * floors, d, wall, 0, (fh * floors) / 2, 0); g.add(body);
  const roof = gableRoof(w, d, 2.4, M('brick', { color: '#9a3b2a', textureScale: 3 }, quality)); roof.position.y = fh * floors; g.add(roof);
  const glass = new THREE.MeshPhysicalMaterial({ color: '#9ec5e8', roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.7, emissive: '#ffcc80', emissiveIntensity: 0.15 });
  for (let f = 0; f < floors; f++) for (const x of [-2.4, 2.4]) { const wn = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.2), glass); wn.position.set(x, f * fh + 1.7, d / 2 + 0.01); g.add(wn); }
  g.add(box(1.2, 2.2, 0.1, M('wood', { color: '#5b3a22' }, quality), 0, 1.1, d / 2 + 0.05));
  return { object: g, colliders: [aabb(-w / 2, 0, -d / 2, w / 2, fh * floors + 2, d / 2)] };
}

export function buildRoad(e, quality) {
  const p = e.props; const width = p.width || 12;
  const pts = [];
  if (p.shape === 'straight') { const len = p.length || 200; for (let i = 0; i <= 40; i++) pts.push(new THREE.Vector3(0, 0, -len / 2 + (i / 40) * len)); }
  else { const rx = p.radiusX || 150; const rz = p.radiusZ || 90; for (let i = 0; i < 160; i++) { const a = (i / 160) * Math.PI * 2; const wob = 1 + Math.sin(a * 3) * 0.12; pts.push(new THREE.Vector3(Math.cos(a) * rx * wob, 0, Math.sin(a) * rz * wob)); } }
  const closed = p.shape !== 'straight';
  const curve = new THREE.CatmullRomCurve3(pts, closed);
  const segs = closed ? 600 : 200;
  const build = (offA, offB, y) => {
    const pos = []; const uv = []; const idx = [];
    for (let i = 0; i <= segs; i++) {
      const t = i / segs; const pt = curve.getPointAt(t % 1); const tan = curve.getTangentAt(t % 1);
      const nrm = new THREE.Vector3(-tan.z, 0, tan.x).normalize();
      const a = pt.clone().addScaledVector(nrm, offA); const b = pt.clone().addScaledVector(nrm, offB);
      pos.push(a.x, y, a.z, b.x, y, b.z); uv.push(0, t * curve.getLength() / 8, 1, t * curve.getLength() / 8);
      if (i < segs) { const k = i * 2; idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2); }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); geo.setIndex(idx); geo.computeVertexNormals();
    return geo;
  };
  const g = new THREE.Group();
  const asphalt = new THREE.Mesh(build(-width / 2, width / 2, 0.06), M('asphalt', { textureScale: 1 }, quality)); asphalt.receiveShadow = true; g.add(asphalt);
  const lineMat = new THREE.MeshStandardMaterial({ color: '#f8fafc', roughness: 0.6 });
  g.add(new THREE.Mesh(build(-0.15, 0.15, 0.07), lineMat));
  if (p.curbs !== false) {
    const c = document.createElement('canvas'); c.width = 2; c.height = 2; const cx = c.getContext('2d');
    cx.fillStyle = '#dc2626'; cx.fillRect(0, 0, 2, 1); cx.fillStyle = '#f8fafc'; cx.fillRect(0, 1, 2, 1);
    const t = new THREE.CanvasTexture(c); t.magFilter = THREE.NearestFilter; t.wrapT = THREE.RepeatWrapping; t.repeat.set(1, 2);
    const curbMat = new THREE.MeshStandardMaterial({ map: t, roughness: 0.6 });
    g.add(new THREE.Mesh(build(width / 2, width / 2 + 1, 0.08), curbMat), new THREE.Mesh(build(-width / 2 - 1, -width / 2, 0.08), curbMat));
  }
  const isOnRoad = (x, z) => {
    let best = Infinity;
    for (let i = 0; i < 200; i++) { const q = curve.getPointAt(i / 200); best = Math.min(best, (q.x - x) ** 2 + (q.z - z) ** 2); }
    return Math.sqrt(best) < width / 2 + 6;
  };
  return { object: g, curve, isOnRoad, road: true };
}

export function buildMisc(e, quality) {
  const k = e.props.kind;
  const g = new THREE.Group();
  const lights = [];
  let colliders = [];
  let update = null;
  switch (k) {
    case 'crate': g.add(box(1, 1, 1, M('planks', { textureScale: 1 }, quality), 0, 0.5, 0)); colliders = [aabb(-0.5, 0, -0.5, 0.5, 1, 0.5)]; break;
    case 'barrel': { const b = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 1.1, 18), M('rusty_metal', { color: '#3f6212' }, quality)); b.position.y = 0.55; b.castShadow = true; g.add(b); colliders = [aabb(-0.4, 0, -0.4, 0.4, 1.1, 0.4)]; break; }
    case 'wall': { const L = e.props.length || 10; g.add(box(L, 3, 0.5, M('stone', { textureScale: L / 4 }, quality), 0, 1.5, 0)); colliders = [aabb(-L / 2, 0, -0.25, L / 2, 3, 0.25)]; break; }
    case 'fence': { const L = e.props.length || 10; const wood = M('wood', {}, quality); for (let x = -L / 2; x <= L / 2; x += 2) g.add(box(0.12, 1.2, 0.12, wood, x, 0.6, 0)); g.add(box(L, 0.1, 0.06, wood, 0, 0.9, 0), box(L, 0.1, 0.06, wood, 0, 0.5, 0)); colliders = [aabb(-L / 2, 0, -0.1, L / 2, 1.2, 0.1)]; break; }
    case 'tower': { g.add(box(5, 14, 5, M('stone', { textureScale: 3 }, quality), 0, 7, 0)); const cone = new THREE.Mesh(new THREE.ConeGeometry(4, 4, 4), M('planks', { color: '#4b2e1a' }, quality)); cone.position.y = 16; cone.rotation.y = Math.PI / 4; cone.castShadow = true; g.add(cone); colliders = [aabb(-2.5, 0, -2.5, 2.5, 14, 2.5)]; break; }
    case 'bridge': { const L = e.props.length || 20; g.add(box(4, 0.4, L, M('planks', { textureScale: 4 }, quality), 0, 1, 0)); for (const s of [-1, 1]) g.add(box(0.15, 1, L, M('wood', {}, quality), s * 1.9, 1.7, 0)); colliders = [aabb(-2, 0.8, -L / 2, 2, 1.2, L / 2)]; break; }
    case 'ramp': { const geo = new THREE.BoxGeometry(4, 0.4, 8); const m = new THREE.Mesh(geo, M('concrete', {}, quality)); m.rotation.x = -0.35; m.position.y = 1.3; m.castShadow = true; m.receiveShadow = true; g.add(m); break; }
    case 'lamp_post': { g.add(box(0.15, 4.5, 0.15, M('metal', { color: '#1f2937' }, quality), 0, 2.25, 0)); const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 8), new THREE.MeshStandardMaterial({ emissive: '#ffd27a', emissiveIntensity: 4, color: '#fff' })); bulb.position.y = 4.6; g.add(bulb); const l = new THREE.PointLight('#ffc87a', 18, 18, 2); l.position.y = 4.4; g.add(l); lights.push(l); colliders = [aabb(-0.1, 0, -0.1, 0.1, 4.5, 0.1)]; break; }
    case 'bench': { const wood = M('wood', {}, quality); g.add(box(1.8, 0.08, 0.5, wood, 0, 0.45, 0), box(1.8, 0.4, 0.06, wood, 0, 0.75, -0.22)); for (const s of [-0.8, 0.8]) g.add(box(0.06, 0.45, 0.45, M('metal', {}, quality), s, 0.22, 0)); break; }
    case 'campfire': {
      for (let i = 0; i < 8; i++) { const st = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), M('rock', {}, quality)); const a = (i / 8) * Math.PI * 2; st.position.set(Math.cos(a) * 0.55, 0.1, Math.sin(a) * 0.55); g.add(st); }
      for (let i = 0; i < 4; i++) { const lg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.9, 6), M('bark', {}, quality)); lg.rotation.set(Math.PI / 2.4, (i / 4) * Math.PI, 0); lg.position.y = 0.2; g.add(lg); }
      const flame = new THREE.PointLight('#ff8a3d', 14, 14, 2); flame.position.y = 0.7; flame.castShadow = quality === 'ultra' || quality === 'high'; flame.shadow.mapSize.set(512, 512); g.add(flame); lights.push(flame);
      const fire = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.9, 8, 1, true), new THREE.MeshBasicMaterial({ color: '#ffb347', transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false }));
      fire.position.y = 0.5; g.add(fire);
      update = (dt, t) => { flame.intensity = 12 + Math.sin(t * 17) * 2 + Math.sin(t * 7.3) * 2; fire.scale.set(1 + Math.sin(t * 13) * 0.08, 1 + Math.sin(t * 9) * 0.15, 1); };
      break;
    }
    case 'tent': { const geo = new THREE.ConeGeometry(1.6, 2, 4, 1); const m = new THREE.Mesh(geo, M('fabric', { color: e.props.color || '#b45309', textureScale: 3 }, quality)); m.position.y = 1; m.rotation.y = Math.PI / 4; m.castShadow = true; g.add(m); colliders = [aabb(-1.1, 0, -1.1, 1.1, 2, 1.1)]; break; }
    case 'ruins': {
      const s = e.props.size || 12; const stone = M('stone', { textureScale: 1.5 }, quality); const r = rng(8);
      for (let i = 0; i < 10; i++) { const a = (i / 10) * Math.PI * 2; const hh = 1 + r() * 5; const col = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, hh, 12), stone); col.position.set(Math.cos(a) * s / 2, hh / 2, Math.sin(a) * s / 2); col.castShadow = true; col.receiveShadow = true; g.add(col); colliders.push(aabb(col.position.x - 0.6, 0, col.position.z - 0.6, col.position.x + 0.6, hh, col.position.z + 0.6)); }
      g.add(box(s * 0.8, 0.4, s * 0.8, stone, 0, 0.2, 0));
      for (let i = 0; i < 12; i++) { const rb = new THREE.Mesh(new THREE.DodecahedronGeometry(0.3 + r() * 0.4, 0), stone); rb.position.set((r() - 0.5) * s * 1.3, 0.2, (r() - 0.5) * s * 1.3); rb.castShadow = true; g.add(rb); }
      break;
    }
    case 'checkpoint': { const mat = new THREE.MeshStandardMaterial({ color: e.props.finish ? '#f8fafc' : '#8b5cf6', emissive: e.props.finish ? '#222' : '#5b21b6', emissiveIntensity: 0.8 }); g.add(box(0.5, 6, 0.5, mat, -8, 3, 0), box(0.5, 6, 0.5, mat, 8, 3, 0), box(16.5, 1.2, 0.5, mat, 0, 6, 0)); break; }
    case 'grandstand': {
      const L = e.props.length || 40; const seats = M('concrete', {}, quality);
      for (let i = 0; i < 10; i++) g.add(box(L, 0.45, 0.9, seats, 0, 0.22 + i * 0.45, i * 0.9));
      colliders = [aabb(-L / 2, 0, 0, L / 2, 4.5, 9)];
      if (e.props.crowd) {
        const r = rng(5); const n = Math.floor(L * 10 * ({ low: 0.2, medium: 0.5, high: 0.8, ultra: 1 }[quality] ?? 0.8));
        const mesh = new THREE.InstancedMesh(crowdGeometry(), crowdMaterial(), n); const d = new THREE.Object3D();
        for (let i = 0; i < n; i++) { const row = Math.floor(r() * 10); d.position.set((r() - 0.5) * (L - 1), 0.45 + row * 0.45, row * 0.9 + 0.3); d.rotation.y = Math.PI; d.updateMatrix(); mesh.setMatrixAt(i, d.matrix); mesh.setColorAt(i, new THREE.Color().setHSL(r(), 0.6, 0.5)); }
        mesh.computeBoundingSphere(); g.add(mesh);
      }
      break;
    }
    default: g.add(box(2, 2, 2, M('concrete', {}, quality), 0, 1, 0)); colliders = [aabb(-1, 0, -1, 1, 2, 1)];
  }
  return { object: g, colliders, lights, update };
}

// ───────── Veículos ─────────
export function buildVehicle(e, quality) {
  const p = e.props; const g = new THREE.Group();
  const paint = new THREE.MeshPhysicalMaterial({ color: p.color || '#7c3aed', metalness: 0.6, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.08 });
  const accent = new THREE.MeshStandardMaterial({ color: p.accent || '#111827', metalness: 0.5, roughness: 0.4 });
  const glass = new THREE.MeshPhysicalMaterial({ color: '#0b1220', metalness: 0.2, roughness: 0.05, transparent: true, opacity: 0.75 });
  const truck = p.kind === 'pickup_truck'; const kart = p.kind === 'kart';
  const L = kart ? 1.8 : truck ? 5 : 4.4; const W = kart ? 1.2 : 1.9; const H = kart ? 0.35 : truck ? 0.9 : 0.6;
  const body = box(W, H, L, paint, 0, H / 2 + 0.35, 0); g.add(body);
  if (!kart) {
    const cabin = box(W * 0.85, 0.55, truck ? 2 : 2.2, glass, 0, H + 0.62, truck ? 0.6 : -0.1); g.add(cabin);
    const stripe = box(0.3, 0.02, L * 0.98, accent, 0, H + 0.36, 0); g.add(stripe);
    for (const s of [-1, 1]) { const hl = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.15, 0.05), new THREE.MeshStandardMaterial({ emissive: '#fff8e1', emissiveIntensity: 3 })); hl.position.set(s * W * 0.32, H * 0.6 + 0.35, L / 2 + 0.01); g.add(hl); const tl = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.12, 0.05), new THREE.MeshStandardMaterial({ emissive: '#ff1e1e', emissiveIntensity: 2 })); tl.position.set(s * W * 0.32, H * 0.6 + 0.35, -L / 2 - 0.01); g.add(tl); }
  }
  const tire = M('rubber', {}, quality);
  const wheels = [];
  for (const [x, z] of [[-1, 1], [1, 1], [-1, -1], [1, -1]]) {
    const wh = new THREE.Group();
    const t = new THREE.Mesh(new THREE.CylinderGeometry(kart ? 0.22 : 0.36, kart ? 0.22 : 0.36, 0.28, 20), tire); t.rotation.z = Math.PI / 2; t.castShadow = true; wh.add(t);
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(kart ? 0.12 : 0.22, kart ? 0.12 : 0.22, 0.29, 12), new THREE.MeshStandardMaterial({ color: '#cbd5e1', metalness: 1, roughness: 0.25 })); rim.rotation.z = Math.PI / 2; wh.add(rim);
    wh.position.set(x * (W / 2 + 0.05), kart ? 0.22 : 0.36, z * L * 0.33); g.add(wh); wheels.push(wh);
  }
  return { object: g, wheels, half: [W / 2, 1, L / 2] };
}

export function buildBall(e, quality) {
  const r = e.props.radius || 0.11;
  const c = document.createElement('canvas'); c.width = 256; c.height = 128; const g = c.getContext('2d');
  g.fillStyle = '#f8fafc'; g.fillRect(0, 0, 256, 128); g.fillStyle = '#111827';
  for (let i = 0; i < 12; i++) { const x = (i % 6) * 44 + (Math.floor(i / 6) % 2) * 22; const y = Math.floor(i / 6) * 64 + 32; g.beginPath(); for (let k = 0; k < 5; k++) { const a = (k / 5) * Math.PI * 2; g.lineTo(x + Math.cos(a) * 12, y + Math.sin(a) * 12); } g.fill(); }
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, 24, 16), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.4 }));
  m.castShadow = true;
  void quality;
  return { object: m, radius: r };
}

export function buildPrimitive(e, materials, quality) {
  const p = e.props; const s = p.size || [1, 1, 1];
  let geo;
  switch (p.shape) {
    case 'sphere': geo = new THREE.SphereGeometry(s[0] / 2, 32, 20); break;
    case 'cylinder': geo = new THREE.CylinderGeometry(s[0] / 2, s[0] / 2, s[1], 28); break;
    case 'capsule': geo = new THREE.CapsuleGeometry(s[0] / 2, Math.max(0.01, s[1] - s[0]), 6, 16); break;
    case 'cone': geo = new THREE.ConeGeometry(s[0] / 2, s[1], 28); break;
    case 'plane': geo = new THREE.PlaneGeometry(s[0], s[1] ?? s[0]); break;
    case 'torus': geo = new THREE.TorusGeometry(s[0] / 2, (s[1] || 0.2) / 2, 16, 48); break;
    default: geo = new THREE.BoxGeometry(s[0], s[1], s[2]);
  }
  const def = materials[p.material] || { preset: p.preset || 'custom', color: p.color || '#a78bfa', roughness: p.roughness, metalness: p.metalness };
  const mat = buildMaterial(def, { quality });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = p.shape !== 'plane'; mesh.receiveShadow = true;
  const out = { object: mesh };
  if (p.markings === 'soccer') { const g = new THREE.Group(); g.add(mesh); const mk = soccerMarkings(s[1] ?? s[0], s[0]); mk.rotation.x = 0; mk.position.set(0, 0, 0.02); mesh.add(mk); out.object = g; }
  if (e.components?.physics?.body === 'static' && p.shape !== 'plane') {
    const hx = s[0] / 2; const hy = (p.shape === 'sphere' ? s[0] : s[1]) / 2; const hz = (s[2] ?? s[0]) / 2;
    out.colliders = [aabb(-hx, -hy, -hz, hx, hy, hz)];
  }
  return out;
}
