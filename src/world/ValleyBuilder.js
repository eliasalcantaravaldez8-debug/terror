import * as THREE from 'three';
import { mulberry32 } from '../utils/math.js';
import { VALLEY, roadZ, terrainHeight } from './valleyLayout.js';
import { TextureFactory as TF } from '../render/TextureFactory.js';

/**
 * Builds the Kessel valley (terrain, road, pines, rocks) and the VÉRTICE air base
 * at its end (fence, radar dome, bunkers, hangar, fuel tanks, runway, control bunker).
 */
export function buildValley(cb) {
  const m = cb.mats, W = cb.world, V = VALLEY;
  const rnd = mulberry32(4040);

  // ---------------- terrain mesh with slope/height based colouring
  const SX = V.x1 - V.x0, SZ = V.z1 - V.z0, N = 240;
  const g = new THREE.PlaneGeometry(SX, SZ, N, N);
  g.rotateX(-Math.PI / 2);
  g.translate((V.x0 + V.x1) / 2, 0, (V.z0 + V.z1) / 2);
  const pos = g.attributes.position;
  for (let i = 0; i < pos.count; i++) pos.setY(i, terrainHeight(pos.getX(i), pos.getZ(i)));
  g.computeVertexNormals();
  const nrm = g.attributes.normal;
  const col = new Float32Array(pos.count * 3);
  const grass = new THREE.Color(0x56603f), dryGrass = new THREE.Color(0x7a7552), rock = new THREE.Color(0x6b6a66), snow = new THREE.Color(0xe4e7ea), dirt = new THREE.Color(0x5e5240);
  const c = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i), ny = nrm.getY(i);
    const x = pos.getX(i), z = pos.getZ(i);
    c.copy(grass).lerp(dryGrass, Math.max(0, Math.sin(x * 0.013) * Math.cos(z * 0.017)) * 0.7);
    if (ny < 0.82) c.lerp(rock, Math.min(1, (0.82 - ny) * 4));
    if (y > 95) c.lerp(snow, Math.min(1, (y - 95) / 30) * (ny > 0.6 ? 1 : 0.4));
    const rd = Math.abs(z - roadZ(x));
    if (rd < 9 && x < V.road.x1) c.lerp(dirt, 0.7);
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  const detail = TF.concrete(71, '#ffffff').map.clone();
  detail.repeat.set(SX / 9, SZ / 9); detail.needsUpdate = true;
  const terrainMat = new THREE.MeshStandardMaterial({ vertexColors: true, map: detail, roughness: 0.95, metalness: 0 });
  const terrain = new THREE.Mesh(g, terrainMat);
  terrain.receiveShadow = true;
  terrain.castShadow = false;
  cb.root.add(terrain);
  cb.terrain = terrain;

  // ---------------- road ribbon
  const roadPts = [];
  for (let x = V.road.x0; x <= V.road.x1 + 120; x += 6) roadPts.push([x, roadZ(Math.min(x, V.road.x1))]);
  const rp = [], ruv = [];
  for (let i = 0; i < roadPts.length - 1; i++) {
    const [x0, z0] = roadPts[i], [x1, z1] = roadPts[i + 1];
    const dx = x1 - x0, dz = z1 - z0, l = Math.hypot(dx, dz), nx = -dz / l * 4.5, nz = dx / l * 4.5;
    const y0 = terrainHeight(x0, z0) + 0.12, y1 = terrainHeight(x1, z1) + 0.12;
    rp.push(x0 + nx, y0, z0 + nz, x0 - nx, y0, z0 - nz, x1 - nx, y1, z1 - nz, x0 + nx, y0, z0 + nz, x1 - nx, y1, z1 - nz, x1 + nx, y1, z1 + nz);
    const v0 = i * 0.6, v1 = (i + 1) * 0.6;
    ruv.push(0, v0, 1, v0, 1, v1, 0, v0, 1, v1, 0, v1);
  }
  const rg = new THREE.BufferGeometry();
  rg.setAttribute('position', new THREE.Float32BufferAttribute(rp, 3));
  rg.setAttribute('uv', new THREE.Float32BufferAttribute(ruv, 2));
  rg.computeVertexNormals();
  const road = new THREE.Mesh(rg, m.asphalt());
  road.receiveShadow = true;
  cb.root.add(road);

  // ---------------- pines and rocks (instanced)
  const trunkG = new THREE.CylinderGeometry(0.18, 0.28, 3, 6); trunkG.translate(0, 1.5, 0);
  const crownG = new THREE.ConeGeometry(2.4, 7.5, 8); crownG.translate(0, 6.2, 0);
  const crown2G = new THREE.ConeGeometry(1.8, 5, 8); crown2G.translate(0, 9.2, 0);
  const pineMat = new THREE.MeshStandardMaterial({ color: 0x2d3f2a, roughness: 0.95 });
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a3828, roughness: 1 });
  const COUNT = 2600;
  const trunks = new THREE.InstancedMesh(trunkG, trunkMat, COUNT), crowns = new THREE.InstancedMesh(crownG, pineMat, COUNT), crowns2 = new THREE.InstancedMesh(crown2G, pineMat, COUNT);
  let n = 0;
  const mtx = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), p = new THREE.Vector3();
  for (let tries = 0; tries < COUNT * 6 && n < COUNT; tries++) {
    const x = V.x0 + rnd() * SX, z = V.z0 + rnd() * SZ;
    const h = terrainHeight(x, z);
    if (h < 3 || h > 105) continue;
    if (Math.abs(z - roadZ(Math.min(x, V.road.x1))) < 16) continue;
    const s = 0.7 + rnd() * 0.8;
    p.set(x, h - 0.3, z); q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rnd() * 6.28); sc.set(s, s * (0.85 + rnd() * 0.4), s);
    mtx.compose(p, q, sc);
    trunks.setMatrixAt(n, mtx); crowns.setMatrixAt(n, mtx); crowns2.setMatrixAt(n, mtx);
    n++;
  }
  for (const im of [trunks, crowns, crowns2]) { im.count = n; im.castShadow = true; im.receiveShadow = true; im.computeBoundingSphere(); cb.root.add(im); }
  const rockG = new THREE.DodecahedronGeometry(1, 1);
  const rocks = new THREE.InstancedMesh(rockG, m.concrete('#77746d', 73), 500);
  let rn = 0;
  for (let tries = 0; tries < 3000 && rn < 500; tries++) {
    const x = V.x0 + rnd() * SX, z = V.z0 + rnd() * SZ, h = terrainHeight(x, z);
    if (h < 2 || Math.abs(z - roadZ(Math.min(x, V.road.x1))) < 10) continue;
    const s = 0.6 + rnd() * 3;
    mtx.compose(p.set(x, h - s * 0.3, z), q.setFromEuler(new THREE.Euler(rnd() * 3, rnd() * 3, rnd() * 3)), sc.set(s, s * 0.6, s * 0.9));
    rocks.setMatrixAt(rn++, mtx);
  }
  rocks.count = rn; rocks.castShadow = true; rocks.receiveShadow = true; rocks.computeBoundingSphere();
  cb.root.add(rocks);

  buildAirbase(cb);
}

function buildAirbase(cb) {
  const m = cb.mats, B = cb.near, W = cb.world, V = VALLEY, F = V.base.fence;
  const concrete = m.concrete('#6f6e69', 77), dark = m.darkMetal();
  // base slab and runway
  B.quad(concrete, [F.x0 - 30, 0.01, F.z1 + 30], [F.x1 + 30, 0.01, F.z1 + 30], [F.x1 + 30, 0.01, F.z0 - 10], [F.x0 - 30, 0.01, F.z0 - 10], [0, 1, 0],
    [F.x0 / 5, F.z1 / 5], [F.x1 / 5, F.z1 / 5], [F.x1 / 5, F.z0 / 5], [F.x0 / 5, F.z0 / 5]);
  const R = V.runway, asphalt = m.asphalt();
  B.quad(asphalt, [R.x0, 0.015, R.z1], [R.x1, 0.015, R.z1], [R.x1, 0.015, R.z0], [R.x0, 0.015, R.z0], [0, 1, 0], [R.x0 / 7, R.z1 / 7], [R.x1 / 7, R.z1 / 7], [R.x1 / 7, R.z0 / 7], [R.x0 / 7, R.z0 / 7]);
  const lm = m.lineMarking();
  for (let x = R.x0 + 10; x < R.x1 - 10; x += 30) B.quad(lm, [x, 0.02, -98.6], [x + 15, 0.02, -98.6], [x + 15, 0.02, -99.4], [x, 0.02, -99.4], [0, 1, 0], [0, 0], [0, 1], [3, 1], [3, 0]);
  // fence (walls) with a gap to the runway apron in the north
  const fenceMat = m.concrete('#7e7c76', 59);
  const wall = (x0, z0, x1, z1, h = 2.6) => { B.box(x0, 0, z0, x1, h, z1, { sides: fenceMat, top: fenceMat, tile: { w: 3, h: 3 } }); W.addBox(x0, 0, z0, x1, h, z1, { tag: 'building' }); };
  wall(F.x0 - 1, F.z0, F.x0, F.z1); wall(F.x1, F.z0, F.x1 + 1, F.z1); wall(F.x0, F.z1, F.x1, F.z1 + 1);
  wall(F.x0, F.z0 - 1, -1812, F.z0); wall(-1788, F.z0 - 1, F.x1, F.z0);
  W.addBox(-1812, 0, F.z0 - 2, -1788, 30, F.z0 - 1, { tag: 'bounds' });
  // bunkers (solid, cover at their corners)
  const bunkerMat = m.concrete('#7a7a70', 75);
  const bunker = (x0, z0, x1, z1, h) => {
    B.box(x0, 0, z0, x1, h, z1, { sides: bunkerMat, top: m.roof(), tile: { w: 4, h: 3 } });
    B.box(x0 - 0.4, h, z0 - 0.4, x1 + 0.4, h + 0.4, z1 + 0.4, { sides: bunkerMat, top: bunkerMat, bottom: bunkerMat, tile: { w: 3, h: 3 } });
    W.addBox(x0, 0, z0, x1, h, z1, { tag: 'building' });
  };
  bunker(-1860, 20, -1840, 34, 4.2); bunker(-1760, 8, -1738, 24, 4.2); bunker(-1830, -45, -1810, -30, 3.6);
  // control bunker with the terminal on its south face
  bunker(-1790, -62, -1764, -44, 5);
  cb.namedProps.controlTerminal = { x: -1777, y: 1.4, z: -43.4 };
  B.box(-1779, 0.7, -43.9, -1775, 2.1, -43.6, { sides: dark, top: dark, tile: { w: 1, h: 1 } });
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.6), m.emissive(0x48ff8a, 0.6));
  scr.position.set(-1777, 1.6, -43.55); cb.root.add(scr);
  cb.baseScreen = scr;
  cb.interactables.push({ id: 'baseTerminal', x: -1777, y: 1.5, z: -43.3, radius: 2.2, prompt: 'Acessar o centro de controle' });
  // radar dome on a tower + comm mast
  const domeBase = new THREE.CylinderGeometry(5, 5.5, 8, 16); domeBase.translate(-1740, 4, -40); B.addGeometry(bunkerMat, domeBase);
  W.addBox(-1745.5, 0, -45.5, -1734.5, 8, -34.5, { tag: 'building' });
  const dome = new THREE.Mesh(new THREE.SphereGeometry(6.5, 24, 14, 0, Math.PI * 2, 0, Math.PI * 0.6), m.paint('#e3e1da', 85));
  dome.position.set(-1740, 8, -40); dome.castShadow = true; cb.root.add(dome);
  for (let i = 0; i < 4; i++) { const leg = new THREE.CylinderGeometry(0.12, 0.2, 28, 5); leg.rotateZ((i % 2 ? 1 : -1) * 0.06); leg.translate(-1850 + (i < 2 ? -1.2 : 1.2), 14, -40 + (i % 2 ? 1.2 : -1.2)); B.addGeometry(dark, leg); }
  W.addBlock(-1850, 0, -40, 3, 4, 3, { tag: 'mast' });
  // hangar + fuel tanks + containers / sandbags for cover
  B.box(-1878, 0, -72, -1846, 9, -52, { sides: m.container('#6e7378', 561, 'VÉRTICE'), top: m.roof(), tile: { w: 12, h: 9 } });
  W.addBox(-1878, 0, -72, -1846, 9, -52, { tag: 'building', surface: 'metal' });
  for (const [x, z] of [[-1735, 50], [-1748, 56]]) {
    const t = new THREE.CylinderGeometry(4, 4, 7, 20); t.translate(x, 3.5, z); B.addGeometry(m.paint('#9aa09a', 87), t);
    W.addBlock(x, 0, z, 7.6, 7, 7.6, { tag: 'tank', surface: 'metal' });
  }
  cb.buildProps([
    { type: 'sandbags', x: -1808, z: 12, len: 6, rot: 0 }, { type: 'sandbags', x: -1786, z: -12, len: 6, rot: 0 },
    { type: 'sandbags', x: -1770, z: -30, len: 5, rot: Math.PI / 2 }, { type: 'barrier', x: -1822, z: -18, rot: 0 },
    { type: 'barrier', x: -1796, z: 2, rot: 0.2 }, { type: 'van', x: -1840, z: 0, rot: Math.PI / 2, color: 0x3a4232 },
    { type: 'van', x: -1760, z: 36, rot: 0.3, color: 0x2e2f30 }, { type: 'crates', x: -1812, z: 30, ammo: true },
    { type: 'crates', x: -1752, z: -18 }, { type: 'dumpster', x: -1828, z: 54, rot: 0 }, { type: 'barrier', x: -1752, z: 2, rot: Math.PI / 2 },
    { type: 'sandbags', x: -1806, z: -40, len: 5, rot: 0 },
  ]);
  for (const [x, z, r] of [[-1820, -60, 0], [-1800, 50, Math.PI / 2]]) {
    const geo = new THREE.BoxGeometry(12.2, 2.6, 2.44); geo.translate(0, 1.3, 0);
    const mesh = new THREE.Mesh(geo, m.container('#7a3a28', 563, 'VÉRTICE'));
    mesh.position.set(x, 0, z); mesh.rotation.y = r; mesh.castShadow = mesh.receiveShadow = true; cb.root.add(mesh);
    const lx = r ? 2.44 : 12.2, lz = r ? 12.2 : 2.44;
    cb.coverBoxes.push(W.addBox(x - lx / 2, 0, z - lz / 2, x + lx / 2, 2.6, z + lz / 2, { tag: 'container', cover: true, surface: 'metal' }));
  }
  // VÉRTICE command jet waiting at the runway threshold
  cb.namedProps.jet = makeJet(m);
  cb.namedProps.jet.position.set(R.x0 + 30, 0, -99); cb.namedProps.jet.rotation.y = Math.PI / 2;
  cb.root.add(cb.namedProps.jet);
}

function makeJet(m) {
  const g = new THREE.Group();
  const white = m.paint('#e1e2e0', 123), dark = m.darkMetal(), glass = m.glass();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.0, 18, 18), white); body.rotation.x = Math.PI / 2; body.position.y = 2.2; g.add(body);
  const nose = new THREE.Mesh(new THREE.ConeGeometry(1.2, 3.5, 18), white); nose.rotation.x = Math.PI / 2; nose.position.set(0, 2.2, 10.7); g.add(nose);
  const cockpit = new THREE.Mesh(new THREE.SphereGeometry(1.05, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), glass); cockpit.scale.set(0.9, 0.6, 1.6); cockpit.position.set(0, 2.9, 8.2); g.add(cockpit);
  const wing = new THREE.Mesh(new THREE.BoxGeometry(17, 0.3, 3.6), white); wing.position.set(0, 1.8, 0.5); g.add(wing);
  const tailV = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4, 2.6), white); tailV.position.set(0, 4.6, -7.8); tailV.rotation.x = -0.3; g.add(tailV);
  const tailH = new THREE.Mesh(new THREE.BoxGeometry(7, 0.25, 2), white); tailH.position.set(0, 6.4, -8.6); g.add(tailH);
  for (const s of [-1, 1]) { const eng = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.7, 4, 14), dark); eng.rotation.x = Math.PI / 2; eng.position.set(s * 1.9, 3.1, -5.5); g.add(eng); }
  for (const [x, z] of [[0, 7], [-2, -0.5], [2, -0.5]]) { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.3, 10), m.rubber()); w.rotation.z = Math.PI / 2; w.position.set(x, 0.4, z); g.add(w); }
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(2.45, 0.25, 15), m.paint('#8f1212', 125)); stripe.position.set(0, 2.2, 0); g.add(stripe);
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}
