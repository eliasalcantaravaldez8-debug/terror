import * as THREE from 'three';
import { mulberry32 } from '../utils/math.js';
import { VILLAGE, roadZ } from './valleyLayout.js';

/**
 * Dravik (Mission 6): a stone mountain village on the Kessel valley road. Gabled
 * houses, a church with a bell tower, a square with a well, low field walls, hay,
 * carts and the burning roadblock where VÉRTICE stops the convoy. Absolute coords.
 */
export const HOUSES = [
  // south of the road
  { x0: -2505, z0: -158, x1: -2493, z1: -148, h: 5.2 },
  { x0: -2480, z0: -166, x1: -2466, z1: -156, h: 6.0 },
  { x0: -2455, z0: -172, x1: -2443, z1: -162, h: 5.0 },
  { x0: -2425, z0: -172, x1: -2410, z1: -160, h: 5.6 },
  { x0: -2398, z0: -163, x1: -2386, z1: -153, h: 4.8 },
  // north of the road
  { x0: -2512, z0: -188, x1: -2498, z1: -179, h: 5.0 },
  { x0: -2445, z0: -207, x1: -2433, z1: -196, h: 5.4 },
  { x0: -2420, z0: -205, x1: -2405, z1: -197, h: 4.8 },
  { x0: -2395, z0: -200, x1: -2378, z1: -190, h: 6.2, barn: true },
  { x0: -2540, z0: -205, x1: -2526, z1: -194, h: 5.0 },
];
export const CHURCH = { x0: -2480, z0: -206, x1: -2462, z1: -192, h: 8, tower: { x0: -2486, z0: -204, x1: -2480, z1: -198, h: 11 } };

/** Gabled roof (ridge along the longer side). */
function gableRoof(x0, z0, x1, z1, y, rise, over = 0.4) {
  const alongX = x1 - x0 >= z1 - z0;
  const g = new THREE.BufferGeometry();
  const X0 = x0 - over, X1 = x1 + over, Z0 = z0 - over, Z1 = z1 + over;
  let v;
  if (alongX) {
    const zm = (z0 + z1) / 2;
    v = [X0, y, Z0, X1, y, Z0, X1, y + rise, zm, X0, y, Z0, X1, y + rise, zm, X0, y + rise, zm,
      X1, y, Z1, X0, y, Z1, X0, y + rise, zm, X1, y, Z1, X0, y + rise, zm, X1, y + rise, zm];
  } else {
    const xm = (x0 + x1) / 2;
    v = [X1, y, Z0, X1, y, Z1, xm, y + rise, Z1, X1, y, Z0, xm, y + rise, Z1, xm, y + rise, Z0,
      X0, y, Z1, X0, y, Z0, xm, y + rise, Z0, X0, y, Z1, xm, y + rise, Z0, xm, y + rise, Z1];
  }
  g.setAttribute('position', new THREE.Float32BufferAttribute(v, 3));
  const len = alongX ? X1 - X0 : Z1 - Z0;
  const sl = Math.hypot(rise, (alongX ? Z1 - Z0 : X1 - X0) / 2);
  g.setAttribute('uv', new THREE.Float32BufferAttribute([0, 0, len / 2, 0, len / 2, sl / 2, 0, 0, len / 2, sl / 2, 0, sl / 2, 0, 0, len / 2, 0, len / 2, sl / 2, 0, 0, len / 2, sl / 2, 0, sl / 2], 2));
  g.computeVertexNormals();
  return g;
}
/** Triangular gable walls closing the roof ends. */
function gableEnds(x0, z0, x1, z1, y, rise) {
  const alongX = x1 - x0 >= z1 - z0;
  const v = [];
  if (alongX) { const zm = (z0 + z1) / 2; v.push(x0, y, z1, x0, y, z0, x0, y + rise, zm, x1, y, z0, x1, y, z1, x1, y + rise, zm); }
  else { const xm = (x0 + x1) / 2; v.push(x0, y, z0, x1, y, z0, xm, y + rise, z0, x1, y, z1, x0, y, z1, xm, y + rise, z1); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(v, 3));
  const uv = [];
  for (let i = 0; i < v.length; i += 3) uv.push((v[i] + v[i + 2]) / 3, v[i + 1] / 3);
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.computeVertexNormals();
  return g;
}

export function buildVillage(cb) {
  const m = cb.mats, B = cb.near, W = cb.world, V = VILLAGE;
  const rnd = mulberry32(6060);
  const stone = m.concrete('#9a8f7c', 151), stoneDark = m.concrete('#7d7466', 153), plaster = m.concrete('#b9ad97', 155);
  const roofMat = m.paint('#6e3a2a', 157), wood = m.wood(), dark = m.darkMetal();
  const glass = m.emissive(0x2a2418, 0.15);
  const winLit = m.emissive(0xffc27a, 1.1);
  const addCover = (x0, y0, z0, x1, y1, z1, opts) => { const b = W.addBox(x0, y0, z0, x1, y1, z1, { cover: true, ...opts }); cb.coverBoxes.push(b); return b; };

  // packed dirt square around the well
  const dirt = m.concrete('#6b5f4a', 159);
  B.quad(dirt, [-2470, 0.02, -184], [-2440, 0.02, -184], [-2440, 0.02, -194], [-2470, 0.02, -194], [0, 1, 0], [0, 0], [6, 0], [6, 2], [0, 2]);

  // ---------------- houses
  const house = (hd, mat) => {
    const { x0, z0, x1, z1, h } = hd;
    B.box(x0, 0, z0, x1, h, z1, { sides: mat, top: stoneDark, tile: { w: 3, h: 3 } });
    B.box(x0 - 0.15, 0, z0 - 0.15, x1 + 0.15, 0.6, z1 + 0.15, { sides: stoneDark, top: stoneDark, tile: { w: 2, h: 1 } }); // plinth
    W.addBox(x0, 0, z0, x1, h, z1, { tag: 'building' });
    const rise = Math.min(x1 - x0, z1 - z0) * 0.38;
    B.addGeometry(roofMat, gableRoof(x0, z0, x1, z1, h, rise));
    B.addGeometry(mat, gableEnds(x0, z0, x1, z1, h, rise));
    // windows and a door on every face (dark, a few lit)
    const faces = [[x0, z0, x1, z0, 0, -1], [x1, z1, x0, z1, 0, 1], [x0, z1, x0, z0, -1, 0], [x1, z0, x1, z1, 1, 0]];
    for (const [ax, az, bx, bz, nx, nz] of faces) {
      const len = Math.hypot(bx - ax, bz - az), n = Math.max(1, Math.floor(len / 4));
      for (let i = 0; i < n; i++) {
        const t = (i + 0.5) / n, cx = ax + (bx - ax) * t + nx * 0.03, cz = az + (bz - az) * t + nz * 0.03;
        const door = i === Math.floor(n / 2) && nz !== 0 && rnd() < 0.7;
        const w = door ? 1.1 : 0.9, y0 = door ? 0 : 1.4, y1 = door ? 2.2 : 2.5;
        const dx = (bx - ax) / len * w / 2, dz = (bz - az) / len * w / 2;
        const lit = !door && rnd() < 0.25;
        B.quad(door ? wood : lit ? winLit : glass, [cx - dx, y0, cz - dz], [cx + dx, y0, cz + dz], [cx + dx, y1, cz + dz], [cx - dx, y1, cz - dz], [nx, 0, nz], [0, 0], [1, 0], [1, 1], [0, 1]);
        if (!door && h > 5.4) B.quad(glass, [cx - dx, 3.4, cz - dz], [cx + dx, 3.4, cz + dz], [cx + dx, 4.4, cz + dz], [cx - dx, 4.4, cz - dz], [nx, 0, nz], [0, 0], [1, 0], [1, 1], [0, 1]);
        // shutters
        if (!door) for (const s of [-1, 1]) B.quad(wood, [cx + dx * s * 1.05, y0, cz + dz * s * 1.05], [cx + dx * s * 1.7, y0, cz + dz * s * 1.7], [cx + dx * s * 1.7, y1, cz + dz * s * 1.7], [cx + dx * s * 1.05, y1, cz + dz * s * 1.05], [nx, 0, nz], [0, 0], [1, 0], [1, 1], [0, 1]);
      }
    }
    // chimney
    const cxm = x0 + (x1 - x0) * 0.75, czm = z0 + (z1 - z0) * 0.3;
    B.box(cxm - 0.4, h, czm - 0.4, cxm + 0.4, h + rise + 1.1, czm + 0.4, { sides: stoneDark, top: dark, tile: { w: 1, h: 1 } });
  };
  for (const hd of HOUSES) house(hd, hd.barn ? m.paint('#5d4632', 161) : rnd() < 0.5 ? stone : plaster);

  // ---------------- church + bell tower (an enemy marksman sits in the belfry)
  const C = CHURCH;
  house({ x0: C.x0, z0: C.z0, x1: C.x1, z1: C.z1, h: C.h }, plaster);
  const T = C.tower;
  B.box(T.x0, 0, T.z0, T.x1, T.h, T.z1, { sides: stone, top: stoneDark, tile: { w: 3, h: 3 } });
  W.addBox(T.x0, 0, T.z0, T.x1, T.h, T.z1, { tag: 'building' });
  for (const [x0, z0, x1, z1] of [[T.x0, T.z0, T.x1, T.z0 + 0.4], [T.x0, T.z1 - 0.4, T.x1, T.z1], [T.x0, T.z0, T.x0 + 0.4, T.z1], [T.x1 - 0.4, T.z0, T.x1, T.z1]]) {
    B.box(x0, T.h, z0, x1, T.h + 0.6, z1, { sides: stone, top: stone, tile: { w: 2, h: 1 } });
    W.addBox(x0, T.h, z0, x1, T.h + 0.6, z1, { tag: 'parapet', cover: true });
  }
  for (const [x, z] of [[T.x0 + 0.3, T.z0 + 0.3], [T.x1 - 0.3, T.z0 + 0.3], [T.x0 + 0.3, T.z1 - 0.3], [T.x1 - 0.3, T.z1 - 0.3]]) B.box(x - 0.25, T.h + 0.6, z - 0.25, x + 0.25, T.h + 3.4, z + 0.25, { sides: stone, top: stone, tile: { w: 1, h: 2 } });
  const spire = new THREE.ConeGeometry(4.6, 5, 4); spire.rotateY(Math.PI / 4); spire.translate((T.x0 + T.x1) / 2, T.h + 5.9, (T.z0 + T.z1) / 2);
  B.addGeometry(roofMat, spire);
  const cross = new THREE.BoxGeometry(0.15, 1.4, 0.15); cross.translate((T.x0 + T.x1) / 2, T.h + 9, (T.z0 + T.z1) / 2); B.addGeometry(dark, cross);
  const crossH = new THREE.BoxGeometry(0.7, 0.15, 0.15); crossH.translate((T.x0 + T.x1) / 2, T.h + 9.2, (T.z0 + T.z1) / 2); B.addGeometry(dark, crossH);

  // ---------------- well in the square
  const wellG = new THREE.CylinderGeometry(1.1, 1.2, 0.95, 14, 1, true); wellG.translate(-2455, 0.47, -189);
  B.addGeometry(stone, wellG);
  addCover(-2456.1, 0, -190.1, -2453.9, 0.95, -187.9, { tag: 'well' });
  for (const s of [-1, 1]) B.box(-2455 + s * 1.0 - 0.08, 0.9, -189.08, -2455 + s * 1.0 + 0.08, 2.6, -188.92, { sides: wood, top: wood, tile: { w: 1, h: 1 } });
  B.box(-2456.2, 2.5, -189.1, -2453.8, 2.7, -188.9, { sides: wood, top: wood, tile: { w: 1, h: 1 } });

  // ---------------- low dry-stone field walls (crouch cover)
  const walls = [
    [-2530, -170, -2516, -169.3], [-2490, -147, -2475, -146.3], [-2462, -150, -2458.7, -140], [-2432, -158, -2430.7, -146],
    [-2520, -198, -2514.7, -186], [-2452, -212, -2440, -211.3], [-2402, -212, -2390, -211.3], [-2412, -170, -2400, -169.3],
    [-2492, -215, -2480, -214.3],
  ];
  for (const [x0, z0, x1, z1] of walls) {
    B.box(x0, 0, z0, x1, 1.05, z1, { sides: stoneDark, top: stoneDark, tile: { w: 1.5, h: 1 } });
    addCover(x0, 0, z0, x1, 1.05, z1, { tag: 'wall' });
  }
  // hay bales, carts, firewood stacks
  const hay = m.concrete('#a8915a', 163);
  for (const [x, z] of [[-2388, -186], [-2384, -184.5], [-2470, -152], [-2520, -158], [-2405, -150], [-2500, -208]]) {
    const hg = new THREE.CylinderGeometry(0.75, 0.75, 1.2, 14); hg.rotateZ(Math.PI / 2); hg.translate(x, 0.75, z);
    B.addGeometry(hay, hg);
    addCover(x - 0.6, 0, z - 0.75, x + 0.6, 1.5, z + 0.75, { tag: 'hay', surface: 'dirt' });
  }
  for (const [x, z, r] of [[-2436, -189, 0.4], [-2512, -166, -0.3]]) {
    const cart = new THREE.Group();
    const bed = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.5, 2.6), wood); bed.position.y = 0.9; cart.add(bed);
    for (const s of [-1, 1]) { const wh = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.1, 14), wood); wh.rotation.z = Math.PI / 2; wh.position.set(s * 0.9, 0.55, 0.2); cart.add(wh); }
    const shaft = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 2.2), wood); shaft.position.set(0, 0.7, 2.2); cart.add(shaft);
    cart.position.set(x, 0, z); cart.rotation.y = r;
    cart.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    cb.root.add(cart);
    cb.footprintCollider(x, z, 1.8, 2.6, 1.2, r, { tag: 'cart', cover: true, surface: 'wood' });
  }
  // VÉRTICE positions: sandbags, barriers, a burned car and ammo
  cb.buildProps([
    { type: 'sandbags', x: -2446, z: -176, len: 5, rot: Math.PI / 2 }, { type: 'sandbags', x: -2420, z: -191, len: 5, rot: 0 },
    { type: 'sandbags', x: -2474, z: -188, len: 4, rot: 0.2 }, { type: 'burnedCar', x: -2492, z: -172, rot: 1.2 },
    { type: 'barrier', x: -2486, z: -186, rot: 0.1 }, { type: 'crates', x: -2516, z: -176, ammo: true }, { type: 'crates', x: -2416, z: -177 },
    { type: 'sandbags', x: -2400, z: -172, len: 4, rot: Math.PI / 2 },
  ]);

  // ---------------- roadblock: two burning trucks across the road (Mission 6 only)
  const RB = V.roadblock, rz = roadZ(RB.x);
  const rbGroup = new THREE.Group();
  for (const [dx, dz, r] of [[0, -2.4, 0.5], [2.2, 2.6, -0.6]]) {
    const t = new THREE.Group();
    const cab = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.2, 2.0), m.burned()); cab.position.set(0, 1.4, 2.4); t.add(cab);
    const bed = new THREE.Mesh(new THREE.BoxGeometry(2.5, 1.4, 4.6), m.burned()); bed.position.set(0, 1.2, -1.1); t.add(bed);
    for (const [wx, wz] of [[-1.1, 2.3], [1.1, 2.3], [-1.1, -2.2], [1.1, -2.2]]) { const wh = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.35, 12), m.rubber()); wh.rotation.z = Math.PI / 2; wh.position.set(wx, 0.5, wz); t.add(wh); }
    t.position.set(RB.x + dx, 0, rz + dz); t.rotation.y = Math.PI / 2 + r;
    t.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    rbGroup.add(t);
  }
  rbGroup.visible = false;
  cb.root.add(rbGroup);
  cb.namedProps.roadblock = { group: rbGroup, x: RB.x, z: rz, box: null };
  cb.interactables.push({ id: 'roadblockCharge', x: RB.x - 2.4, y: 1.0, z: rz, radius: 2.4, prompt: 'Plantar carga de demolição no bloqueio' });

  // street lamps / window glow (lit at dusk)
  for (const [x, z] of [[-2455, -184], [-2500, -176], [-2410, -190]]) {
    B.box(x - 0.08, 0, z - 0.08, x + 0.08, 4.2, z + 0.08, { sides: dark, top: dark, tile: { w: 1, h: 4 } });
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), m.emissive(0xffcf8a, 2)); lamp.position.set(x, 4.3, z); cb.root.add(lamp);
    (cb.lightDefs ||= []).push({ pos: new THREE.Vector3(x, 4.1, z), color: 0xffc98a, intensity: 6, distance: 15, decay: 1.6, permanent: true });
  }

  // ---------------- invisible bounds around the playable village (the road continues beyond)
  const b = V.bounds;
  for (const [x0, z0, x1, z1] of [[b.x0 - 2, b.z0, b.x0, b.z1], [b.x1, b.z0, b.x1 + 2, b.z1], [b.x0, b.z0 - 2, b.x1, b.z0], [b.x0, b.z1, b.x1, b.z1 + 2]]) W.addBox(x0, 0, z0, x1, 40, z1, { tag: 'bounds' });
}
