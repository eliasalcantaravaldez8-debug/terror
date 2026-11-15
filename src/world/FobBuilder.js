import * as THREE from 'three';
import { mulberry32 } from '../utils/math.js';
import { TextureFactory as TF } from '../render/TextureFactory.js';

/**
 * FOB Bastião (Mission 7): a coalition forward operating base at night. HESCO
 * perimeter with guard towers, the command post (TOC) with a usable interior,
 * tents, an armory shed with weapon racks, motor pool, generator, comms mast and
 * the helipad. Absolute coordinates.
 */
export const FOB = {
  x0: 320, x1: 480, z0: 1320, z1: 1480,
  gate: { x0: 394, x1: 406 },
  start: { x: 400, z: 1474 },
  toc: { x0: 380, x1: 420, z0: 1338, z1: 1360, h: 3.4, door: { x0: 397.5, x1: 402.5 }, back: { x0: 409, x1: 413 } },
  desk: { x: 400, y: 1.1, z: 1343.2 },
  armory: { x0: 438, x1: 454, z0: 1376, z1: 1384 },
  helipad: { x: 350, z: 1345 },
  generator: { x: 372, z: 1372 },
  towers: [[327, 1327], [473, 1327], [327, 1473], [473, 1473]],
  floods: [[360, 1400], [440, 1400], [400, 1440], [400, 1370], [350, 1345], [460, 1450]],
};

/** HESCO barrier block: wire-mesh basket filled with earth. */
function hescoMaterial(m) {
  return m.get('hesco', () => {
    const c = document.createElement('canvas'); c.width = c.height = 256;
    const x = c.getContext('2d');
    x.fillStyle = '#8a7d62'; x.fillRect(0, 0, 256, 256);
    const rnd = mulberry32(77);
    for (let i = 0; i < 2500; i++) { x.fillStyle = `rgba(${90 + rnd() * 60},${80 + rnd() * 50},${55 + rnd() * 40},0.5)`; x.fillRect(rnd() * 256, rnd() * 256, 2 + rnd() * 4, 2 + rnd() * 4); }
    // geotextile bulges + wire mesh grid
    for (let i = 0; i < 4; i++) { const g = x.createLinearGradient(i * 64, 0, i * 64 + 64, 0); g.addColorStop(0, 'rgba(0,0,0,0.25)'); g.addColorStop(0.5, 'rgba(255,255,255,0.05)'); g.addColorStop(1, 'rgba(0,0,0,0.25)'); x.fillStyle = g; x.fillRect(i * 64, 0, 64, 256); }
    x.strokeStyle = 'rgba(60,60,58,0.9)'; x.lineWidth = 2;
    for (let i = 0; i <= 256; i += 16) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, 256); x.stroke(); x.beginPath(); x.moveTo(0, i); x.lineTo(256, i); x.stroke(); }
    const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = TF.anisotropy || 4;
    return new THREE.MeshStandardMaterial({ map: t, roughness: 0.95 });
  });
}

export function buildFob(cb) {
  const m = cb.mats, B = cb.near, W = cb.world, F = FOB;
  const rnd = mulberry32(7070);
  const hesco = hescoMaterial(m), gravel = m.concrete('#6d685e', 171), dark = m.darkMetal(), wood = m.wood();
  const tan = m.paint('#8f8468', 173), olive = m.paint('#4c5238', 175), tent = m.concrete('#6f6a52', 177);
  const addCover = (x0, y0, z0, x1, y1, z1, opts = {}) => { const b = W.addBox(x0, y0, z0, x1, y1, z1, { cover: true, ...opts }); cb.coverBoxes.push(b); return b; };
  cb.namedProps.fobLights = [];
  cb.namedProps.fobEmissive = [];

  // gravel pad inside the wire, dirt outside
  B.quad(gravel, [F.x0 - 40, 0.012, F.z1 + 40], [F.x1 + 40, 0.012, F.z1 + 40], [F.x1 + 40, 0.012, F.z0 - 40], [F.x0 - 40, 0.012, F.z0 - 40], [0, 1, 0],
    [0, 24], [24, 24], [24, 0], [0, 0]);

  // ---------------- HESCO perimeter (gate in the south wall, closed by the bounds)
  const H = 2.4, T = 1.2;
  const wall = (x0, z0, x1, z1) => { B.box(x0, 0, z0, x1, H, z1, { sides: hesco, top: m.concrete('#6b5f4a', 159), tile: { w: 1.2, h: 1.2 } }); W.addBox(x0, 0, z0, x1, H, z1, { tag: 'building', surface: 'dirt' }); };
  wall(F.x0, F.z0, F.x1, F.z0 + T); wall(F.x0, F.z0, F.x0 + T, F.z1); wall(F.x1 - T, F.z0, F.x1, F.z1);
  wall(F.x0, F.z1 - T, F.gate.x0, F.z1); wall(F.gate.x1, F.z1 - T, F.x1, F.z1);
  W.addBox(F.gate.x0, 0, F.z1 - 0.6, F.gate.x1, 30, F.z1 + 2, { tag: 'bounds' });
  for (const [x0, z0, x1, z1] of [[F.x0 - 3, F.z0 - 3, F.x1 + 3, F.z0], [F.x0 - 3, F.z0, F.x0, F.z1 + 3], [F.x1, F.z0, F.x1 + 3, F.z1 + 3], [F.x0, F.z1 + 2, F.x1, F.z1 + 3]]) W.addBox(x0, 2.4, z0, x1, 30, z1, { tag: 'bounds' });
  // gate bar + concertina wire on top of the walls
  const bar = new THREE.Mesh(new THREE.BoxGeometry(12, 0.12, 0.12), m.paint('#c8b22e', 179)); bar.position.set(400, 1.1, F.z1 - 0.3); cb.root.add(bar);
  const coil = new THREE.TorusGeometry(0.32, 0.015, 4, 10);
  const coils = new THREE.InstancedMesh(coil, dark, 900);
  let ci = 0;
  const mtx = new THREE.Matrix4(), q = new THREE.Quaternion(), one = new THREE.Vector3(1, 1, 1);
  const runWire = (x0, z0, x1, z1) => {
    const n = Math.floor(Math.hypot(x1 - x0, z1 - z0) / 0.7);
    q.setFromEuler(new THREE.Euler(0, Math.atan2(x1 - x0, z1 - z0), 0));
    for (let i = 0; i < n && ci < 900; i++) { mtx.compose(new THREE.Vector3(x0 + (x1 - x0) * i / n, H + 0.32, z0 + (z1 - z0) * i / n), q, one); coils.setMatrixAt(ci++, mtx); }
  };
  runWire(F.x0 + 0.6, F.z0 + 0.6, F.x1 - 0.6, F.z0 + 0.6); runWire(F.x0 + 0.6, F.z0, F.x0 + 0.6, F.z1); runWire(F.x1 - 0.6, F.z0, F.x1 - 0.6, F.z1);
  runWire(F.x0, F.z1 - 0.6, F.gate.x0, F.z1 - 0.6); runWire(F.gate.x1, F.z1 - 0.6, F.x1, F.z1 - 0.6);
  coils.count = ci; cb.root.add(coils);

  // ---------------- guard towers (platform at 5 m with a sandbag parapet)
  for (const [x, z] of F.towers) {
    for (const [dx, dz] of [[-1.6, -1.6], [1.6, -1.6], [-1.6, 1.6], [1.6, 1.6]]) {
      B.box(x + dx - 0.12, 0, z + dz - 0.12, x + dx + 0.12, 7.4, z + dz + 0.12, { sides: wood, top: wood, tile: { w: 1, h: 3 } });
      W.addBox(x + dx - 0.12, 0, z + dz - 0.12, x + dx + 0.12, 5, z + dz + 0.12, { tag: 'pole' });
    }
    B.box(x - 2, 4.8, z - 2, x + 2, 5.0, z + 2, { sides: wood, top: wood, bottom: wood, tile: { w: 2, h: 1 } });
    W.addBox(x - 2, 4.8, z - 2, x + 2, 5.0, z + 2, { tag: 'platform' });
    for (const [x0, z0, x1, z1] of [[x - 2, z - 2, x + 2, z - 1.7], [x - 2, z + 1.7, x + 2, z + 2], [x - 2, z - 2, x - 1.7, z + 2], [x + 1.7, z - 2, x + 2, z + 2]]) {
      B.box(x0, 5, z0, x1, 6.0, z1, { sides: m.sandbag(), top: m.sandbag(), tile: { w: 1, h: 1 } });
      addCover(x0, 5, z0, x1, 6.0, z1, { tag: 'sandbags', surface: 'dirt' });
    }
    B.box(x - 2.3, 7.4, z - 2.3, x + 2.3, 7.6, z + 2.3, { sides: olive, top: olive, bottom: olive, tile: { w: 2, h: 1 } });
  }

  // ---------------- TOC (command post) with an interior
  const C = F.toc, wt = 0.25, ch = C.h;
  const tocWall = m.concrete('#8c8778', 181), floor = m.concrete('#59564e', 183);
  const tw = (x0, z0, x1, z1) => { B.box(x0, 0, z0, x1, ch, z1, { sides: tocWall, top: tocWall, tile: { w: 2.5, h: 2.5 } }); W.addBox(x0, 0, z0, x1, ch, z1, { tag: 'building' }); };
  tw(C.x0, C.z0, C.back.x0, C.z0 + wt); tw(C.back.x1, C.z0, C.x1, C.z0 + wt); // north wall with the back door
  B.box(C.back.x0, 2.3, C.z0, C.back.x1, ch, C.z0 + wt, { sides: tocWall, top: tocWall, bottom: tocWall, tile: { w: 2, h: 2 } });
  W.addBox(C.back.x0, 2.3, C.z0, C.back.x1, ch, C.z0 + wt, { tag: 'building' });
  tw(C.x0, C.z0, C.x0 + wt, C.z1); tw(C.x1 - wt, C.z0, C.x1, C.z1);
  tw(C.x0, C.z1 - wt, C.door.x0, C.z1); tw(C.door.x1, C.z1 - wt, C.x1, C.z1);
  B.box(C.door.x0, 2.3, C.z1 - wt, C.door.x1, ch, C.z1, { sides: tocWall, top: tocWall, bottom: tocWall, tile: { w: 2, h: 2 } });
  W.addBox(C.door.x0, 2.3, C.z1 - wt, C.door.x1, ch, C.z1, { tag: 'building' });
  B.quad(floor, [C.x0, 0.03, C.z1], [C.x1, 0.03, C.z1], [C.x1, 0.03, C.z0], [C.x0, 0.03, C.z0], [0, 1, 0], [0, 4], [8, 4], [8, 0], [0, 0]);
  B.box(C.x0 - 0.3, ch, C.z0 - 0.3, C.x1 + 0.3, ch + 0.3, C.z1 + 0.3, { sides: olive, top: m.roof(), bottom: m.concrete('#3f3d38', 185), tile: { w: 3, h: 1 } });
  cb.namedProps.tocBackDoor = { x0: C.back.x0, x1: C.back.x1, z: C.z0 };
  // interior: map table, desks with screens, Hale's desk, server rack, lockers
  const desk = (x0, z0, x1, z1, h = 0.8) => { B.box(x0, 0, z0, x1, h, z1, { sides: m.paint('#3e3f3a', 187), top: m.paint('#2c2d2a', 189), tile: { w: 1, h: 1 } }); addCover(x0, 0, z0, x1, h, z1, { tag: 'desk', surface: 'wood' }); };
  desk(395, 1347, 405, 1351, 0.9); // central map table
  const mapTop = new THREE.Mesh(new THREE.PlaneGeometry(9.6, 3.6), m.emissive(0x2a5a8a, 0.55)); mapTop.rotation.x = -Math.PI / 2; mapTop.position.set(400, 0.92, 1349); cb.root.add(mapTop);
  cb.namedProps.fobEmissive.push(mapTop);
  desk(397, 1341.2, 403, 1342.6); // Hale's desk
  for (const [x0, x1, z] of [[382, 390, 1353], [382, 390, 1344], [410, 418, 1353], [410, 418, 1344]]) {
    desk(x0, z - 0.6, x1, z + 0.6);
    for (let i = 0; i < 3; i++) {
      const scr = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.6), m.emissive(i === 1 ? 0x3fa86a : 0x4a86d8, 0.9));
      scr.position.set(x0 + 1.3 + i * 2.6, 1.25, z - 0.62); scr.rotation.y = Math.PI; cb.root.add(scr);
      cb.namedProps.fobEmissive.push(scr);
    }
  }
  B.box(381, 0, 1338.4, 384, 2.2, 1339.4, { sides: dark, top: dark, tile: { w: 1, h: 1 } }); addCover(381, 0, 1338.4, 384, 2.2, 1339.4, { tag: 'rack', surface: 'metal' });
  for (let i = 0; i < 4; i++) { B.box(415 + i * 1.0, 0, 1338.4, 415.9 + i * 1.0, 2.0, 1339.2, { sides: olive, top: olive, tile: { w: 1, h: 2 } }); }
  W.addBox(415, 0, 1338.4, 419, 2.0, 1339.2, { tag: 'locker', surface: 'metal' });
  const wallScreen = new THREE.Mesh(new THREE.PlaneGeometry(6, 2.2), m.emissive(0x6aa0e0, 0.7)); wallScreen.position.set(400, 2.1, C.z0 + wt + 0.02); cb.root.add(wallScreen);
  cb.namedProps.fobEmissive.push(wallScreen);
  cb.namedProps.tocScreen = wallScreen;
  cb.interactables.push({ id: 'haleDesk', x: F.desk.x, y: F.desk.y, z: F.desk.z + 0.6, radius: 2.2, prompt: 'Entregar o disco com a gravação ao Major Hale' });
  (cb.indoorRects ||= []).push({ x0: C.x0, x1: C.x1, z0: C.z0, z1: C.z1 });
  for (const x of [388, 400, 412]) {
    const lamp = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.25), m.emissive(0xfff2dc, 1.6)); lamp.rotation.x = Math.PI / 2; lamp.position.set(x, ch - 0.02, 1349); cb.root.add(lamp);
    cb.namedProps.fobEmissive.push(lamp);
  }
  const tocLight = { pos: new THREE.Vector3(400, 3.0, 1349), color: 0xfff0d8, intensity: 9, distance: 24, decay: 1.6, permanent: true };
  (cb.lightDefs ||= []).push(tocLight); cb.namedProps.fobLights.push(tocLight);

  // ---------------- armory shed (open to the south) with weapon racks
  const A = F.armory;
  const shed = m.paint('#5a5e4a', 191);
  B.box(A.x0, 0, A.z0, A.x1, 3, A.z0 + 0.2, { sides: shed, top: shed, tile: { w: 2, h: 2 } }); W.addBox(A.x0, 0, A.z0, A.x1, 3, A.z0 + 0.2, { tag: 'building', surface: 'metal' });
  B.box(A.x0, 0, A.z0, A.x0 + 0.2, 3, A.z1, { sides: shed, top: shed, tile: { w: 2, h: 2 } }); W.addBox(A.x0, 0, A.z0, A.x0 + 0.2, 3, A.z1, { tag: 'building', surface: 'metal' });
  B.box(A.x1 - 0.2, 0, A.z0, A.x1, 3, A.z1, { sides: shed, top: shed, tile: { w: 2, h: 2 } }); W.addBox(A.x1 - 0.2, 0, A.z0, A.x1, 3, A.z1, { tag: 'building', surface: 'metal' });
  B.box(A.x0 - 0.3, 3, A.z0 - 0.3, A.x1 + 0.3, 3.2, A.z1 + 0.6, { sides: shed, top: m.roof(), bottom: shed, tile: { w: 3, h: 1 } });
  for (let i = 0; i < 4; i++) {
    const x = A.x0 + 2 + i * 3.6;
    B.box(x - 1.3, 0, A.z0 + 0.3, x + 1.3, 0.9, A.z0 + 1.1, { sides: wood, top: wood, tile: { w: 1, h: 1 } });
    B.box(x - 1.3, 0.9, A.z0 + 0.3, x + 1.3, 1.9, A.z0 + 0.45, { sides: wood, top: wood, tile: { w: 1, h: 1 } });
  }
  W.addBox(A.x0 + 0.5, 0, A.z0 + 0.3, A.x1 - 0.5, 0.9, A.z0 + 1.1, { tag: 'rack', surface: 'wood' });
  F.racks = [0, 1, 2, 3].map((i) => ({ x: A.x0 + 2 + i * 3.6, y: 1.05, z: A.z0 + 0.75 }));
  cb.buildProps([{ type: 'crates', x: (A.x0 + A.x1) / 2, z: A.z1 - 1.5, ammo: true }]);
  const armLight = { pos: new THREE.Vector3((A.x0 + A.x1) / 2, 2.7, (A.z0 + A.z1) / 2), color: 0xffe0b0, intensity: 5, distance: 12, decay: 1.6, permanent: true };
  cb.lightDefs.push(armLight); cb.namedProps.fobLights.push(armLight);

  // ---------------- tents (barracks)
  for (let i = 0; i < 4; i++) {
    const x = 334 + (i % 2) * 22, z = 1392 + Math.floor(i / 2) * 34;
    const g = new THREE.CylinderGeometry(3.4, 3.4, 14, 14, 1, false, Math.PI / 2, Math.PI);
    g.rotateX(Math.PI / 2); g.translate(x + 4, 0, z + 7);
    B.addGeometry(tent, g);
    W.addBox(x + 0.8, 0, z, x + 7.2, 2.6, z + 14, { tag: 'tent' });
    W.addBox(x + 1.6, 2.6, z, x + 6.4, 3.4, z + 14, { tag: 'tent' });
    const door = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 2), m.emissive(0xffd9a0, rnd() < 0.5 ? 0.5 : 0.1)); door.position.set(x + 4, 1.0, z + 14.02); cb.root.add(door);
    cb.namedProps.fobEmissive.push(door);
  }

  // ---------------- generator, fuel bladder, comms mast, helipad
  const G0 = F.generator;
  B.box(G0.x - 1.8, 0, G0.z - 1.1, G0.x + 1.8, 2.0, G0.z + 1.1, { sides: m.paint('#56603e', 193), top: m.paint('#56603e', 193), tile: { w: 2, h: 2 } });
  addCover(G0.x - 1.8, 0, G0.z - 1.1, G0.x + 1.8, 2.0, G0.z + 1.1, { tag: 'generator', surface: 'metal' });
  const ex = new THREE.CylinderGeometry(0.1, 0.1, 1.2, 8); ex.translate(G0.x + 1.2, 2.6, G0.z); B.addGeometry(dark, ex);
  const genLamp = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), m.emissive(0x5aff7a, 2)); genLamp.position.set(G0.x - 1.82, 1.6, G0.z); cb.root.add(genLamp);
  cb.namedProps.fobEmissive.push(genLamp);
  const bladder = new THREE.SphereGeometry(2.4, 18, 10); bladder.scale(1.6, 0.45, 1); bladder.translate(G0.x - 8, 0.8, G0.z + 2); B.addGeometry(m.rubber(), bladder);
  addCover(G0.x - 11.8, 0, G0.z - 0.4, G0.x - 4.2, 1.6, G0.z + 4.4, { tag: 'bladder', surface: 'dirt' });
  for (let i = 0; i < 3; i++) { const leg = new THREE.CylinderGeometry(0.08, 0.14, 24, 5); leg.translate(460 + (i - 1) * 0.6, 12, 1340 + (i === 1 ? 0.8 : -0.4)); B.addGeometry(dark, leg); }
  W.addBlock(460, 0, 1340, 2, 3, 2, { tag: 'mast' });
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 6), m.emissive(0xff2a1a, 3)); beacon.position.set(460, 24.2, 1340.1); cb.root.add(beacon);
  const P = F.helipad;
  const padMat = m.concrete('#55534c', 195);
  B.quad(padMat, [P.x - 12, 0.03, P.z + 12], [P.x + 12, 0.03, P.z + 12], [P.x + 12, 0.03, P.z - 12], [P.x - 12, 0.03, P.z - 12], [0, 1, 0], [0, 4], [4, 4], [4, 0], [0, 0]);
  const lm = m.lineMarking();
  for (const [x0, z0, x1, z1] of [[P.x - 3, P.z - 4, P.x - 2, P.z + 4], [P.x + 2, P.z - 4, P.x + 3, P.z + 4], [P.x - 2, P.z - 0.5, P.x + 2, P.z + 0.5]]) B.quad(lm, [x0, 0.04, z1], [x1, 0.04, z1], [x1, 0.04, z0], [x0, 0.04, z0], [0, 1, 0], [0, 0], [1, 0], [1, 1], [0, 1]);
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; const l = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 4), m.emissive(0x7ad1ff, 1.6)); l.position.set(P.x + Math.cos(a) * 11.5, 0.12, P.z + Math.sin(a) * 11.5); cb.root.add(l); cb.namedProps.fobEmissive.push(l); }

  // ---------------- floodlights on poles (switched off when the generator dies)
  for (const [x, z] of F.floods) {
    B.box(x - 0.1, 0, z - 0.1, x + 0.1, 7, z + 0.1, { sides: dark, top: dark, tile: { w: 1, h: 4 } });
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.5, 0.3), m.emissive(0xf2f6ff, 2.4)); head.position.set(x, 7.1, z); cb.root.add(head);
    cb.namedProps.fobEmissive.push(head);
    const l = { pos: new THREE.Vector3(x, 6.6, z), color: 0xe6eeff, intensity: 12, distance: 34, decay: 1.4, permanent: true };
    cb.lightDefs.push(l); cb.namedProps.fobLights.push(l);
  }

  // ---------------- motor pool, containers, sandbags, barriers (cover across the yard)
  cb.buildProps([
    { type: 'van', x: 436, z: 1446, rot: 0.1, color: 0x4b5236 }, { type: 'van', x: 446, z: 1446, rot: 0.05, color: 0x454b34 }, { type: 'van', x: 456, z: 1447, rot: -0.1, color: 0x50553b },
    { type: 'van', x: 466, z: 1430, rot: Math.PI / 2, color: 0x4b5236 },
    { type: 'sandbags', x: 400, z: 1466, len: 6, rot: 0 }, { type: 'sandbags', x: 380, z: 1420, len: 5, rot: 0.3 }, { type: 'sandbags', x: 420, z: 1405, len: 5, rot: -0.2 },
    { type: 'sandbags', x: 362, z: 1352, len: 5, rot: Math.PI / 2 }, { type: 'sandbags', x: 340, z: 1365, len: 5, rot: 0 },
    { type: 'barrier', x: 390, z: 1380, rot: 0 }, { type: 'barrier', x: 410, z: 1388, rot: 0.2 }, { type: 'barrier', x: 372, z: 1395, rot: Math.PI / 2 },
    { type: 'barrier', x: 428, z: 1365, rot: Math.PI / 2 }, { type: 'crates', x: 425, z: 1420 }, { type: 'crates', x: 366, z: 1440, ammo: true },
    { type: 'crates', x: 384, z: 1395 }, { type: 'barrier', x: 352, z: 1378, rot: 0.1 },
  ]);
  for (const [x, z, r, col] of [[412, 1420, 0, '#5f6a52'], [380, 1450, Math.PI / 2, '#7a6a48'], [445, 1405, Math.PI / 2, '#4f5a66']]) {
    const geo = new THREE.BoxGeometry(12.2, 2.6, 2.44); geo.translate(0, 1.3, 0);
    const mesh = new THREE.Mesh(geo, m.container(col, 565, 'COALIZÃO'));
    mesh.position.set(x, 0, z); mesh.rotation.y = r; mesh.castShadow = mesh.receiveShadow = true; cb.root.add(mesh);
    const lx = r ? 2.44 : 12.2, lz = r ? 12.2 : 2.44;
    cb.coverBoxes.push(W.addBox(x - lx / 2, 0, z - lz / 2, x + lx / 2, 2.6, z + lz / 2, { tag: 'container', cover: true, surface: 'metal' }));
  }
}
