import * as THREE from 'three';
import { mulberry32 } from '../utils/math.js';
import { PORT } from './portLayout.js';

/**
 * Builds the port of Vareny (Mission 3) using the city builder's batcher,
 * materials, collision world and prop helpers.
 */
export function buildPort(cb) {
  const m = cb.mats, B = cb.near, W = cb.world, P = PORT;
  const rnd = mulberry32(777);
  const concrete = m.concrete('#8e8c86', 63);
  const quayMat = m.concrete('#7d7b75', 65);
  const steel = m.paint('#b8952c', 95); // crane yellow
  const dark = m.darkMetal();

  // ---------------- land, road and sea
  const L = P.land;
  B.quad(quayMat, [L.x0, 0.004, L.z1], [L.x1, 0.004, L.z1], [L.x1, 0.004, L.z0], [L.x0, 0.004, L.z0], [0, 1, 0],
    [L.x0 / 5, L.z1 / 5], [L.x1 / 5, L.z1 / 5], [L.x1 / 5, L.z0 / 5], [L.x0 / 5, L.z0 / 5]);
  const asphalt = m.asphalt();
  B.quad(asphalt, [P.road.x0, 0.01, P.road.z1], [P.road.x1, 0.01, P.road.z1], [P.road.x1, 0.01, 40], [P.road.x0, 0.01, 40], [0, 1, 0],
    [0, P.road.z1 / 6], [3, P.road.z1 / 6], [3, 40 / 6], [0, 40 / 6]);
  // quay wall down to the water
  B.quad(concrete, [L.x0, -3, L.z0], [L.x1, -3, L.z0], [L.x1, 0.004, L.z0], [L.x0, 0.004, L.z0], [0, 0, -1], [0, 0], [L.x1 / 4, 0], [L.x1 / 4, 1], [0, 1]);
  const sea = new THREE.Mesh(new THREE.PlaneGeometry(6000, 6000), m.water());
  sea.rotation.x = -Math.PI / 2; sea.position.set(885 + 3000, P.seaY, 0);
  sea.receiveShadow = true;
  cb.root.add(sea);
  cb.seaMesh = sea;
  // distant headland (silhouette across the bay)
  for (const [x, z, sx, sy, sz] of [[1450, -600, 900, 90, 200], [2100, 200, 300, 140, 900], [1300, -1300, 1200, 120, 300]]) {
    const hill = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 10), m.concrete('#4d5248', 67));
    hill.scale.set(sx, sy, sz); hill.position.set(x, -sy * 0.2, z); cb.root.add(hill);
  }

  // ---------------- perimeter (walls + invisible bounds)
  const wallMat = m.concrete('#8a8780', 59);
  const wall = (x0, z0, x1, z1, h = 2.6) => {
    B.box(x0, 0, z0, x1, h, z1, { sides: wallMat, top: wallMat, tile: { w: 3, h: 3 } });
    W.addBox(x0, 0, z0, x1, h, z1, { tag: 'building' });
  };
  const pl = P.play;
  wall(pl.x0 - 1, pl.z0, pl.x0, pl.z1); wall(pl.x1, pl.z0, pl.x1 + 1, pl.z1);
  wall(pl.x0 - 1, pl.z1, P.gate.x0, pl.z1 + 1); wall(P.gate.x1, pl.z1, pl.x1 + 1, pl.z1 + 1);
  const bounds = (x0, z0, x1, z1, h = 30) => W.addBox(x0, 0, z0, x1, h, z1, { tag: 'bounds' });
  bounds(P.road.x0 - 1, pl.z1, P.road.x0, P.road.z1); bounds(P.road.x1, pl.z1, P.road.x1 + 1, P.road.z1);
  bounds(P.road.x0, P.road.z1, P.road.x1, P.road.z1 + 1);
  bounds(pl.x0, P.quayEdge - 0.3, pl.x1, P.quayEdge, 3); // quay edge (the gangway passes above)
  // gatehouse, boom barrier, watchtower
  const gh = P.gatehouse;
  B.box(gh.x0, 0, gh.z0, gh.x1, 3.2, gh.z1, { sides: m.paint('#cfcac0', 97), top: m.roof(), tile: { w: 2, h: 2 } });
  W.addBox(gh.x0, 0, gh.z0, gh.x1, 3.2, gh.z1, { tag: 'building' });
  const boom = new THREE.BoxGeometry(7, 0.12, 0.12); boom.rotateZ(0.9); boom.translate(1005, 3.0, 88); B.addGeometry(m.paint('#c23b2b', 99), boom);
  const tw = P.tower;
  for (const [dx, dz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
    const g = new THREE.CylinderGeometry(0.12, 0.12, tw.h, 6); g.translate(tw.x + dx * 1.3, tw.h / 2, tw.z + dz * 1.3); B.addGeometry(dark, g);
    W.addBlock(tw.x + dx * 1.3, 0, tw.z + dz * 1.3, 0.3, tw.h - 0.2, 0.3, { tag: 'pole' });
  }
  B.box(tw.x - 1.6, tw.h - 0.15, tw.z - 1.6, tw.x + 1.6, tw.h, tw.z + 1.6, { sides: m.wood(), top: m.wood(), bottom: m.wood(), tile: { w: 2, h: 2 } });
  B.box(tw.x - 1.6, tw.h, tw.z + 1.5, tw.x + 1.6, tw.h + 1.0, tw.z + 1.6, { sides: m.wood(), top: m.wood(), tile: { w: 2, h: 2 } });
  B.box(tw.x - 1.7, tw.h + 2.4, tw.z - 1.7, tw.x + 1.7, tw.h + 2.55, tw.z + 1.7, { sides: dark, top: dark, bottom: dark, tile: { w: 2, h: 2 } });
  W.addBox(tw.x - 1.6, tw.h - 0.15, tw.z - 1.6, tw.x + 1.6, tw.h, tw.z + 1.6, { tag: 'platform' });
  W.addBox(tw.x - 1.6, tw.h, tw.z + 1.5, tw.x + 1.6, tw.h + 1.0, tw.z + 1.6, { tag: 'parapet' });

  // ---------------- container yard
  const palette = [['#7a3a28', 'VARENY LINES'], ['#2f5266', 'KESTREL'], ['#5d6b3a', ''], ['#8c8f92', 'NORDA CARGO'], ['#a0662c', ''], ['#334a7a', 'KESTREL']];
  const contMats = palette.map(([c, logo], i) => m.container(c, 501 + i, logo));
  const contGeo = new THREE.BoxGeometry(12.2, 2.6, 2.44); contGeo.translate(0, 1.3, 0);
  const lists = contMats.map((mat) => cb._inst('cont_' + mat.uuid, () => [{ geometry: contGeo, material: mat }]));
  const placeContainer = (x, y, z, rotY = 0) => {
    const l = lists[Math.floor(rnd() * lists.length)];
    l.transforms.push({ m: new THREE.Matrix4().makeRotationY(rotY).setPosition(x, y, z) });
  };
  const Y = P.yard;
  for (const rz of Y.rows) {
    for (let x = Y.x0; x + 12.2 <= Y.x1; x += 13) {
      if (x + 12.2 > Y.lane[0] && x < Y.lane[1]) continue; // central lane
      if (rnd() < 0.18) continue; // random crossing gaps
      const h = 1 + Math.floor(rnd() * 3);
      for (let k = 0; k < h; k++) for (const dz of [-1.25, 1.25]) placeContainer(x + 6.1, k * 2.6, rz + dz);
      const b = W.addBox(x, 0, rz - 2.5, x + 12.2, h * 2.6, rz + 2.5, { tag: 'container', cover: true, surface: 'metal' });
      cb.coverBoxes.push(b);
    }
  }
  // low cover in the lanes: pallets, crates, a forklift
  const crate = m.wood();
  for (const [x, z] of [[1000, 9], [1010, -5], [975, -5], [1030, 9], [1045, -19], [985, -19], [1000, -33], [1020, -33], [960, -33], [1070, 23], [955, 23], [1000, 23], [1088, -5]]) {
    B.box(x - 0.9, 0, z - 0.6, x + 0.9, 1.15, z + 0.6, { sides: crate, top: crate, tile: { w: 1, h: 1 } });
    cb.coverBoxes.push(W.addBox(x - 0.9, 0, z - 0.6, x + 0.9, 1.15, z + 0.6, { tag: 'crate', cover: true, surface: 'wood' }));
  }
  // rubber-tyred gantry crane over the yard
  const R = P.rtg;
  for (const [x, z] of [[R.x0, R.z0], [R.x1, R.z0], [R.x0, R.z1], [R.x1, R.z1]]) {
    B.box(x - 0.6, 0, z - 0.6, x + 0.6, R.h, z + 0.6, { sides: steel, top: steel, tile: { w: 2, h: 2 } });
    W.addBox(x - 0.6, 0, z - 0.6, x + 0.6, R.h, z + 0.6, { tag: 'pole', surface: 'metal' });
  }
  B.box(R.x0 - 0.6, R.h, R.z0 - 0.6, R.x0 + 0.6, R.h + 1.4, R.z1 + 0.6, { sides: steel, top: steel, bottom: steel, tile: { w: 2, h: 2 } });
  B.box(R.x1 - 0.6, R.h, R.z0 - 0.6, R.x1 + 0.6, R.h + 1.4, R.z1 + 0.6, { sides: steel, top: steel, bottom: steel, tile: { w: 2, h: 2 } });
  for (const z of [R.z0, R.z1]) B.box(R.x0, R.h, z - 0.6, R.x1, R.h + 1.4, z + 0.6, { sides: steel, top: steel, bottom: steel, tile: { w: 2, h: 2 } });
  B.box(R.x0 + 3, R.h - 2.4, 28.5, R.x0 + 7, R.h, 32, { sides: m.paint('#d8d6cf', 85), top: steel, bottom: steel, tile: { w: 2, h: 2 } });
  W.addBox(R.x0 + 2.5, R.h - 2.6, 27.8, R.x0 + 7.5, R.h - 2.4, 33, { tag: 'platform' });
  W.addBox(R.x0 + 2.5, R.h - 2.4, 32.9, R.x0 + 7.5, R.h - 1.4, 33.1, { tag: 'parapet' });
  // warehouse
  const wh = P.warehouse;
  const shed = m.container('#7f8584', 541, 'PORTO DE VARENY');
  B.box(wh.x0, 0, wh.z0, wh.x1, wh.h, wh.z1, { sides: shed, top: m.roof(), tile: { w: 12, h: wh.h } });
  W.addBox(wh.x0, 0, wh.z0, wh.x1, wh.h, wh.z1, { tag: 'building', surface: 'metal' });

  // ---------------- quay: ship-to-shore cranes, bollards, cover
  for (const c of P.sts) {
    for (const [dx, z] of [[-6, -60], [6, -60], [-6, -86], [6, -86]]) {
      B.box(c.x + dx - 0.7, 0, z - 0.7, c.x + dx + 0.7, 34, z + 0.7, { sides: steel, top: steel, tile: { w: 2, h: 2 } });
      W.addBox(c.x + dx - 0.7, 0, z - 0.7, c.x + dx + 0.7, 34, z + 0.7, { tag: 'pole', surface: 'metal' });
    }
    for (const dx of [-6, 6]) B.box(c.x + dx - 0.8, 34, -140, c.x + dx + 0.8, 36, -40, { sides: steel, top: steel, bottom: steel, tile: { w: 2, h: 2 } });
    B.box(c.x - 6, 36, -64, c.x + 6, 40, -56, { sides: m.paint('#d8d6cf', 85), top: steel, bottom: steel, tile: { w: 3, h: 3 } });
    B.box(c.x - 6.8, 24, -61, c.x + 6.8, 25.5, -59, { sides: steel, top: steel, bottom: steel, tile: { w: 2, h: 2 } });
    B.box(c.x - 6.8, 24, -87, c.x + 6.8, 25.5, -85, { sides: steel, top: steel, bottom: steel, tile: { w: 2, h: 2 } });
  }
  for (let x = 940; x < 1165; x += 14) {
    const g = new THREE.CylinderGeometry(0.28, 0.35, 0.7, 10); g.translate(x, 0.35, -89.2); B.addGeometry(dark, g);
  }
  cb.buildProps([
    { type: 'barrier', x: 998, z: -64, rot: 0 }, { type: 'barrier', x: 1022, z: -66, rot: 0.1 }, { type: 'barrier', x: 1048, z: -63, rot: -0.1 },
    { type: 'crates', x: 1012, z: -73 }, { type: 'crates', x: 978, z: -72 }, { type: 'crates', x: 1058, z: -78, ammo: true },
    { type: 'van', x: 1080, z: -70, rot: Math.PI / 2, color: 0xe2ded2 }, { type: 'sandbags', x: 1033, z: -80, len: 4, rot: 0 },
    { type: 'barrier', x: 994, z: 66, rot: 0 }, { type: 'barrier', x: 1006, z: 64, rot: 0.15 }, { type: 'van', x: 1024, z: 60, rot: 0.1, color: 0x34465a },
    { type: 'car', x: 984, z: 62, rot: Math.PI / 2 + 0.2, color: 0x6b6f72 }, { type: 'crates', x: 1000, z: 76, ammo: true },
    { type: 'sandbags', x: 998, z: 46, len: 5, rot: 0 }, { type: 'barrier', x: 1015, z: 48, rot: 0 },
  ]);
  // a few single containers near the gate and on the quay
  for (const [x, z, r] of [[968, 60, 0], [1040, 52, Math.PI / 2], [960, -66, 0], [1100, -64, 0]]) {
    placeContainer(x, 0, z, r);
    const lx = r ? 2.44 : 12.2, lz = r ? 12.2 : 2.44;
    cb.coverBoxes.push(W.addBox(x - lx / 2, 0, z - lz / 2, x + lx / 2, 2.6, z + lz / 2, { tag: 'container', cover: true, surface: 'metal' }));
  }

  buildShip(cb);
  cb.interactables.push({ id: 'shipTerminal', x: P.ship.terminal.x, y: P.ship.terminal.y, z: P.ship.terminal.z, radius: 2.2, prompt: 'Acessar o terminal do navio' });
}

function buildShip(cb) {
  const m = cb.mats, B = cb.near, W = cb.world, S = PORT.ship;
  const hullMat = m.paint('#2e3438', 111), lowerMat = m.paint('#6a2a22', 113), deckMat = m.paint('#4f5a46', 115);
  const white = m.paint('#d9d7d0', 117), dark = m.darkMetal();
  const D = S.deckY;
  // hull: extrude the outline vertically (shape uses (x, -z) so it maps back to world z)
  const shape = new THREE.Shape(S.outline.map(([x, z]) => new THREE.Vector2(x, -z)));
  const upper = new THREE.ExtrudeGeometry(shape, { depth: D - 1, bevelEnabled: false });
  upper.rotateX(-Math.PI / 2); upper.translate(0, 1, 0);
  B.addGeometry(hullMat, upper);
  const lower = new THREE.ExtrudeGeometry(shape, { depth: 1 - S.keelY, bevelEnabled: false });
  lower.rotateX(-Math.PI / 2); lower.translate(0, S.keelY, 0);
  B.addGeometry(lowerMat, lower);
  const deck = new THREE.ShapeGeometry(shape);
  deck.rotateX(-Math.PI / 2); deck.translate(0, D + 0.01, 0);
  const uv = deck.attributes.uv, pa = deck.attributes.position;
  for (let i = 0; i < pa.count; i++) uv.setXY(i, pa.getX(i) / 4, pa.getZ(i) / 4);
  B.addGeometry(deckMat, deck);
  // hull collider + bulwarks (with the gangway opening)
  W.addBox(955, S.keelY, -113, 1091, D, -93, { tag: 'ship', surface: 'metal' });
  const gw = S.gangway;
  const bul = (x0, z0, x1, z1) => {
    B.box(x0, D, z0, x1, D + 1.1, z1, { sides: hullMat, top: dark, tile: { w: 3, h: 1.1, yBase: D } });
    W.addBox(x0, D, z0, x1, D + 1.1, z1, { tag: 'parapet', surface: 'metal' });
  };
  bul(955, -93.3, gw.x0 - 0.5, -93); bul(gw.x1 + 0.5, -93.3, 1065, -93);
  bul(955, -113, 1065, -112.7); bul(955, -112.7, 955.3, -93.3);
  for (let i = 0; i < 5; i++) { // tapered bow, stepped
    const x0 = 1065 + i * 5, w = 10 - i * 2;
    bul(x0, -103 - w - 0.3, x0 + 5, -103 - w); bul(x0, -103 + w, x0 + 5, -103 + w + 0.3);
    W.addBox(x0, D, -113, x0 + 5, D + 30, -103 - w - 0.3, { tag: 'bounds' });
    W.addBox(x0, D, -103 + w + 0.3, x0 + 5, D + 30, -93, { tag: 'bounds' });
  }
  // deck cargo: container stacks and hatch covers (cover for the deck fight)
  const contGeo = new THREE.BoxGeometry(12.2, 2.6, 2.44); contGeo.translate(0, 1.3, 0);
  const cm = [m.container('#7a3a28', 551, 'KESTREL'), m.container('#2f5266', 553, 'VARENY LINES'), m.container('#5d6b3a', 555, '')];
  for (const [x, z, h, k] of [[990, -99.5, 2, 0], [1012, -106.5, 1, 1], [1028, -99.5, 1, 2], [1050, -107, 2, 0], [1000, -109.5, 1, 1]]) {
    const l = cb._inst('shipcont' + k, () => [{ geometry: contGeo, material: cm[k] }]);
    for (let j = 0; j < h; j++) for (const dz of [-1.25, 1.25]) l.transforms.push({ m: new THREE.Matrix4().setPosition(x, D + j * 2.6, z + dz) });
    cb.coverBoxes.push(W.addBox(x - 6.1, D, z - 2.5, x + 6.1, D + h * 2.6, z + 2.5, { tag: 'container', cover: true, surface: 'metal' }));
  }
  for (const [x, z] of [[1018, -97.5], [1040, -101], [985, -106]]) {
    B.box(x - 2.5, D, z - 1.2, x + 2.5, D + 1.05, z + 1.2, { sides: deckMat, top: dark, tile: { w: 2, h: 2 } });
    cb.coverBoxes.push(W.addBox(x - 2.5, D, z - 1.2, x + 2.5, D + 1.05, z + 1.2, { tag: 'hatch', cover: true, surface: 'metal' }));
  }
  // superstructure with bridge windows, funnel
  const ss = S.superstructure;
  const facade = m.facade({ wall: '#d4d2cb', frame: '#4a4d50', band: '#bdbbb4', seed: 41, damage: 0.15 });
  B.box(ss.x0, D, ss.z0, ss.x1, ss.top, ss.z1, { sides: facade, top: m.roof(), tile: { w: 12, h: 6, yBase: D } });
  W.addBox(ss.x0, D, ss.z0, ss.x1, ss.top, ss.z1, { tag: 'building' });
  B.box(ss.x0 + 2, ss.top - 3, ss.z0 - 3, ss.x1, ss.top - 2.6, ss.z1 + 3, { sides: white, top: white, bottom: white, tile: { w: 3, h: 3 } });
  B.box(961, ss.top, -106, 967, ss.top + 7, -100, { sides: m.paint('#7a1f1a', 119), top: dark, tile: { w: 3, h: 3 } });
  const mast = new THREE.CylinderGeometry(0.15, 0.2, 10, 8); mast.translate(966, ss.top + 5, -103); B.addGeometry(dark, mast);
  // command booth: three walls, roof, console with the terminal
  const bo = S.booth;
  B.box(bo.x0, D, bo.z0, bo.x1, D + 2.6, bo.z0 + 0.2, { sides: white, top: white, tile: { w: 2, h: 2 } });
  B.box(bo.x0, D, bo.z1 - 0.2, bo.x1, D + 2.6, bo.z1, { sides: white, top: white, tile: { w: 2, h: 2 } });
  B.box(bo.x0 - 0.2, D + 2.6, bo.z0, bo.x1 + 0.4, D + 2.8, bo.z1, { sides: white, top: dark, bottom: white, tile: { w: 2, h: 2 } });
  W.addBox(bo.x0, D, bo.z0, bo.x1, D + 2.6, bo.z0 + 0.2, { tag: 'building' });
  W.addBox(bo.x0, D, bo.z1 - 0.2, bo.x1, D + 2.6, bo.z1, { tag: 'building' });
  B.box(bo.x0 + 0.1, D, -104.2, bo.x0 + 1.1, D + 1.0, -101.8, { sides: dark, top: dark, tile: { w: 1, h: 1 } });
  W.addBox(bo.x0 + 0.1, D, -104.2, bo.x0 + 1.1, D + 1.0, -101.8, { tag: 'console' });
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.35), m.emissive(0x7fd0ff, 0.9));
  scr.position.set(bo.x0 + 1.0, D + 1.25, -103); scr.rotation.y = Math.PI / 2; scr.rotation.x = 0; cb.root.add(scr);
  cb.shipScreen = scr;
  // gangway: steps from the quay up to the deck, with a landing
  const steps = m.paint('#5a5f63', 121);
  const run = (gw.zBottom - gw.zTop) / gw.steps, rise = D / (gw.steps + 0.15);
  for (let i = 0; i < gw.steps; i++) {
    const z1 = gw.zBottom - i * run, z0 = z1 - run, top = (i + 1) * rise;
    B.box(gw.x0, top - 0.25, z0, gw.x1, top, z1, { sides: steps, top: steps, bottom: steps, tile: { w: 1, h: 1 } });
    W.addBox(gw.x0, 0, z0, gw.x1, top, z1, { tag: 'steps', surface: 'metal' });
  }
  B.box(gw.x0, D - 0.25, -93.1, gw.x1, D, gw.zTop, { sides: steps, top: steps, bottom: steps, tile: { w: 1, h: 1 } });
  W.addBox(gw.x0, 0, -93.1, gw.x1, D, gw.zTop, { tag: 'steps', surface: 'metal' });
  // handrails
  const rails = [];
  for (const x of [gw.x0, gw.x1]) {
    rails.push(new THREE.Vector3(x, 1.1, gw.zBottom), new THREE.Vector3(x, D + 1.1, gw.zTop));
    for (let i = 0; i <= gw.steps; i += 4) { const z = gw.zBottom - i * run; rails.push(new THREE.Vector3(x, i * rise, z), new THREE.Vector3(x, i * rise + 1.1, z)); }
  }
  cb.root.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(rails), new THREE.LineBasicMaterial({ color: 0x9a9fa2 })));
  // mooring lines
  const lines = [];
  for (const [qx, sx] of [[952, 958], [968, 966], [1080, 1072], [1096, 1084]]) lines.push(new THREE.Vector3(qx, 0.6, -89.2), new THREE.Vector3(sx, D + 0.5, -93.2));
  cb.root.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(lines), new THREE.LineBasicMaterial({ color: 0x2a2620 })));
}
