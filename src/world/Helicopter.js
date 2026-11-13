import * as THREE from 'three';
import { sampleKeys, clamp } from '../utils/math.js';

/**
 * Original utility transport helicopter ("UH-9 Kestrel", fictional): full exterior
 * + walkable cabin interior. Local +Z = nose. Cabin floor at y = 0.65.
 */
export const CABIN = { floorY: 0.65, ceilY: 2.15, x0: -1.25, x1: 1.25, z0: -1.7, z1: 1.4, doorZ0: -1.5, doorZ1: 0.9 };

/** Seats (local) — rear bench faces forward, front bench faces aft. */
export const SEATS = {
  player: { x: -0.78, z: -1.32, yaw: 0 },
  briggs: { x: 0.0, z: -1.32, yaw: 0 },
  okafor: { x: 0.78, z: -1.32, yaw: 0 },
  kane: { x: -0.62, z: 1.05, yaw: Math.PI },
  ruiz: { x: 0.62, z: 1.05, yaw: Math.PI },
};

function mesh(geo, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = true; m.receiveShadow = true;
  return m;
}

export function buildHelicopter(mats, { interior = true } = {}) {
  const root = new THREE.Group();
  root.name = 'helicopter';
  const body = new THREE.Group(); root.add(body);
  const paint = mats.heliPaint(), inner = mats.heliInterior(), dark = mats.darkMetal();
  const glass = new THREE.MeshStandardMaterial({ color: 0x223038, roughness: 0.05, metalness: 0.6, transparent: true, opacity: 0.35, envMapIntensity: 1.5, side: THREE.DoubleSide });
  const floorMat = mats.polymer(0x2a2c2a);
  const C = CABIN;
  // Box with outside paint & inside interior faces: material order [+x,-x,+y,-y,+z,-z]
  const wall = (w, h, d, x, y, z, outer) => mesh(new THREE.BoxGeometry(w, h, d), outer, x, y, z);

  // floor & belly
  body.add(wall(2.6, 0.2, 3.2, 0, 0.55, -0.15, [paint, paint, floorMat, paint, paint, paint]));
  body.add(wall(2.45, 0.35, 3.0, 0, 0.32, -0.15, paint));
  // roof
  body.add(wall(2.6, 0.16, 3.2, 0, 2.23, -0.15, [paint, paint, paint, inner, paint, paint]));
  // rear wall
  body.add(wall(2.6, 1.6, 0.1, 0, 1.43, -1.75, [paint, paint, paint, paint, inner, paint]));
  // side walls (fore and aft of the door openings)
  for (const sx of [-1, 1]) {
    const outFace = sx > 0 ? [paint, inner, paint, paint, paint, paint] : [inner, paint, paint, paint, paint, paint];
    body.add(wall(0.08, 1.5, C.doorZ0 - C.z0, sx * 1.29, 1.4, (C.z0 + C.doorZ0) / 2, outFace));
    body.add(wall(0.08, 1.5, C.z1 - C.doorZ1 + 0.15, sx * 1.29, 1.4, (C.doorZ1 + C.z1 + 0.15) / 2, outFace));
    // door rails
    body.add(mesh(new THREE.BoxGeometry(0.06, 0.05, 2.8), dark, sx * 1.33, 2.12, -0.6));
    // slid-back doors
    const door = wall(0.05, 1.45, 1.7, sx * 1.36, 1.4, -2.55, paint);
    body.add(door);
    const win = mesh(new THREE.BoxGeometry(0.02, 0.4, 0.5), glass, sx * 1.39, 1.65, -2.45);
    body.add(win);
    // skids
    const skid = mesh(new THREE.CylinderGeometry(0.05, 0.05, 4.2, 8), dark, sx * 1.15, 0.06, 0.15);
    skid.rotation.x = Math.PI / 2; body.add(skid);
    for (const z of [-1.2, 1.3]) {
      const strut = mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.5, 6), dark, sx * 1.05, 0.3, z);
      strut.rotation.z = sx * 0.35; body.add(strut);
    }
    // gun mount stub & steps
    body.add(mesh(new THREE.BoxGeometry(0.25, 0.04, 0.5), dark, sx * 1.42, 0.5, -0.1));
  }
  // cockpit bulkhead with opening
  body.add(wall(0.8, 1.5, 0.08, -0.9, 1.4, 1.45, inner));
  body.add(wall(0.8, 1.5, 0.08, 0.9, 1.4, 1.45, inner));
  body.add(wall(1.0, 0.3, 0.08, 0, 2.0, 1.45, inner));
  // cockpit shell
  const nose = mesh(new THREE.SphereGeometry(1.3, 20, 14, 0, Math.PI * 2, 0, Math.PI * 0.62), paint, 0, 1.05, 2.0);
  nose.scale.set(1.0, 0.95, 1.55); nose.rotation.x = Math.PI / 2 + 0.1; body.add(nose);
  const canopy = new THREE.Mesh(new THREE.SphereGeometry(1.25, 20, 12, Math.PI * 0.12, Math.PI * 0.76, 0.1, Math.PI * 0.42), glass);
  canopy.scale.set(1.0, 0.95, 1.5); canopy.position.set(0, 1.25, 2.05); canopy.rotation.y = -Math.PI / 2 + Math.PI / 2; canopy.rotation.x = -0.15;
  body.add(canopy);
  body.add(wall(2.4, 0.9, 1.6, 0, 0.95, 2.25, paint)); // cockpit lower
  body.add(wall(2.4, 0.08, 1.4, 0, 2.15, 2.1, paint)); // cockpit roof
  // instrument panel
  const panel = mesh(new THREE.BoxGeometry(2.0, 0.4, 0.3), mats.polymer(0x1c1d1c), 0, 1.45, 3.0);
  panel.rotation.x = -0.4; body.add(panel);
  for (let i = 0; i < 4; i++) {
    const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.22), mats.emissive(i % 2 ? 0x2f7a3c : 0x5c8a3a, 0.9));
    scr.position.set(-0.75 + i * 0.5, 1.5, 2.83); scr.rotation.x = -0.4; scr.rotation.y = Math.PI;
    body.add(scr);
  }
  // pilot seats
  for (const sx of [-1, 1]) {
    body.add(mesh(new THREE.BoxGeometry(0.55, 0.12, 0.55), mats.canvasSeat(), sx * 0.55, 1.05, 2.15));
    body.add(mesh(new THREE.BoxGeometry(0.55, 0.85, 0.12), dark, sx * 0.55, 1.5, 1.85));
  }
  // engine housing & tail boom
  body.add(wall(1.5, 0.75, 3.6, 0, 2.62, -0.6, paint));
  const intake = mesh(new THREE.CylinderGeometry(0.28, 0.32, 0.4, 12), dark, 0.55, 2.7, 1.05); intake.rotation.x = Math.PI / 2; body.add(intake);
  const intake2 = intake.clone(); intake2.position.x = -0.55; body.add(intake2);
  const exhaust = mesh(new THREE.CylinderGeometry(0.22, 0.25, 0.5, 10), dark, 0, 2.7, -2.45); exhaust.rotation.x = Math.PI / 2; body.add(exhaust);
  const boom = mesh(new THREE.CylinderGeometry(0.22, 0.55, 7.6, 14), paint, 0, 1.85, -5.5);
  boom.rotation.x = Math.PI / 2; body.add(boom);
  const fin = mesh(new THREE.BoxGeometry(0.12, 2.0, 1.1), paint, 0, 2.7, -9.2); fin.rotation.x = -0.35; body.add(fin);
  const stab = mesh(new THREE.BoxGeometry(2.2, 0.08, 0.6), paint, 0, 1.8, -8.4); body.add(stab);
  // tail rotor
  const tailRotor = new THREE.Group(); tailRotor.position.set(0.18, 3.0, -9.5); body.add(tailRotor);
  for (let i = 0; i < 4; i++) {
    const b = mesh(new THREE.BoxGeometry(0.03, 1.3, 0.12), dark);
    b.rotation.x = (i * Math.PI) / 2; tailRotor.add(b);
  }
  // main rotor
  const mast = mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.5, 10), dark, 0, 3.2, 0.1); body.add(mast);
  const rotor = new THREE.Group(); rotor.position.set(0, 3.45, 0.1); body.add(rotor);
  rotor.add(mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.16, 12), dark));
  const bladeMat = mats.polymer(0x1f2220);
  for (let i = 0; i < 4; i++) {
    const b = mesh(new THREE.BoxGeometry(0.42, 0.04, 7.8), bladeMat, 0, 0, 0);
    b.geometry.translate(0, 0, 3.95);
    b.rotation.y = (i * Math.PI) / 2;
    rotor.add(b);
  }
  // blur disc (visible when spinning fast)
  const discTex = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 256;
    const x = c.getContext('2d');
    const g = x.createRadialGradient(128, 128, 10, 128, 128, 128);
    g.addColorStop(0, 'rgba(20,20,20,0.0)'); g.addColorStop(0.15, 'rgba(20,20,20,0.25)'); g.addColorStop(0.9, 'rgba(20,20,20,0.18)'); g.addColorStop(1, 'rgba(20,20,20,0)');
    x.fillStyle = g; x.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  })();
  const disc = new THREE.Mesh(new THREE.CircleGeometry(8, 48), new THREE.MeshBasicMaterial({ map: discTex, transparent: true, depthWrite: false, side: THREE.DoubleSide }));
  disc.rotation.x = -Math.PI / 2; disc.position.set(0, 3.45, 0.1);
  body.add(disc);
  const tailDisc = new THREE.Mesh(new THREE.CircleGeometry(0.7, 24), disc.material);
  tailDisc.rotation.y = Math.PI / 2; tailDisc.position.copy(tailRotor.position); body.add(tailDisc);

  // markings
  const markC = document.createElement('canvas'); markC.width = 256; markC.height = 64;
  const mx = markC.getContext('2d'); mx.fillStyle = 'rgba(0,0,0,0)'; mx.fillRect(0, 0, 256, 64);
  mx.font = 'bold 40px Arial'; mx.fillStyle = '#1b1e18'; mx.fillText('FALCON 21', 8, 46);
  const markT = new THREE.CanvasTexture(markC); markT.colorSpace = THREE.SRGBColorSpace;
  for (const sx of [-1, 1]) {
    const mk = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.4), new THREE.MeshStandardMaterial({ map: markT, transparent: true, roughness: 0.8 }));
    mk.position.set(sx * 0.4, 1.95, -4.3); mk.rotation.y = sx * Math.PI / 2; body.add(mk);
  }

  if (interior) {
    // troop benches
    for (const z of [-1.42, 1.18]) {
      body.add(mesh(new THREE.BoxGeometry(2.3, 0.06, 0.5), mats.canvasSeat(), 0, 1.08, z));
      body.add(mesh(new THREE.BoxGeometry(2.3, 0.6, 0.05), mats.canvasSeat(), 0, 1.45, z + (z < 0 ? -0.24 : 0.24)));
      for (const x of [-1.0, 0, 1.0]) body.add(mesh(new THREE.BoxGeometry(0.04, 0.4, 0.04), dark, x, 0.85, z));
    }
    // ceiling pipes, straps, lights
    for (const x of [-0.6, 0.6]) {
      const pipe = mesh(new THREE.CylinderGeometry(0.03, 0.03, 3.0, 8), dark, x, 2.08, -0.15); pipe.rotation.x = Math.PI / 2; body.add(pipe);
    }
    for (let i = 0; i < 6; i++) {
      const strap = mesh(new THREE.BoxGeometry(0.04, 0.35, 0.015), mats.polymer(0x3d3a2c), -0.6 + (i % 2) * 1.2, 1.88, -1.1 + Math.floor(i / 2) * 0.9);
      strap.rotation.z = 0.15; body.add(strap);
    }
    const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.04, 0.12), mats.emissive(0xff2a1a, 2.5));
    lamp.position.set(0, 2.13, -0.2); body.add(lamp);
    const ext = mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.45, 10), mats.paint('#8a1c14', 73), 1.15, 1.0, -1.6); body.add(ext);
    body.add(mesh(new THREE.BoxGeometry(0.4, 0.3, 0.25), mats.paint('#4a5139', 69), -1.0, 0.8, 0.9)); // ammo can
    body.add(mesh(new THREE.BoxGeometry(0.5, 0.25, 0.35), mats.vestAlly(), 0.9, 0.78, -0.5)); // kit bag
  }

  root.traverse((o) => { if (o.isMesh) { o.castShadow = o.material !== glass && o.material !== disc.material; } });
  disc.castShadow = false;
  return { root, body, rotor, tailRotor, disc, tailDisc };
}

/**
 * Drives a helicopter along keyframes [{t, x,y,z, yaw,pitch,roll}] with
 * turbulence, rotor spin and helpers to create landing colliders.
 */
export class HelicopterController {
  constructor(parts, keys) {
    Object.assign(this, parts);
    this.keys = keys;
    this.t = 0;
    this.rpm = 1;
    this.turbulence = 1;
    this.playing = false;
    this.colliders = [];
    this.position = new THREE.Vector3();
    this.lastPos = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
  }

  setKeys(keys, t = 0) { this.keys = keys; this.t = t; this.playing = true; }
  get duration() { return this.keys[this.keys.length - 1].t; }
  get done() { return this.t >= this.duration; }

  update(dt, time) {
    if (this.playing) this.t = Math.min(this.t + dt, this.duration);
    const k = sampleKeys(this.keys, this.t, ['x', 'y', 'z', 'yaw', 'pitch', 'roll']);
    const turb = this.turbulence;
    const tx = Math.sin(time * 1.3) * 0.08 * turb + Math.sin(time * 3.1) * 0.03 * turb;
    const ty = Math.sin(time * 1.7) * 0.12 * turb + Math.sin(time * 4.3) * 0.02 * turb;
    this.lastPos.copy(this.position);
    this.position.set(k.x + tx, k.y + ty, k.z);
    if (dt > 0) this.velocity.subVectors(this.position, this.lastPos).divideScalar(dt);
    this.root.position.copy(this.position);
    this.root.rotation.set(0, 0, 0);
    this.root.rotation.order = 'YXZ';
    this.root.rotation.y = k.yaw;
    this.root.rotation.x = k.pitch + Math.sin(time * 2.1) * 0.01 * turb;
    this.root.rotation.z = k.roll + Math.sin(time * 1.9) * 0.012 * turb;
    // rotor
    const spin = 27 * this.rpm;
    this.rotor.rotation.y += spin * dt * 0.35;
    this.tailRotor.rotation.x += spin * dt * 1.2;
    this.disc.material.opacity = clamp(this.rpm * 1.1, 0, 1);
    this.disc.visible = this.rpm > 0.15;
  }

  /** Static colliders for the landed helicopter (yaw must be a multiple of PI/2). */
  addLandedColliders(world) {
    this.removeColliders(world);
    this.root.updateMatrixWorld(true);
    const add = (lx0, ly0, lz0, lx1, ly1, lz1, tag = 'heli') => {
      const a = new THREE.Vector3(lx0, ly0, lz0).applyMatrix4(this.root.matrixWorld);
      const b = new THREE.Vector3(lx1, ly1, lz1).applyMatrix4(this.root.matrixWorld);
      this.colliders.push(world.addBox(a.x, a.y, a.z, b.x, b.y, b.z, { tag, surface: 'metal', cover: false }));
    };
    const C = CABIN;
    add(-1.3, 0, -1.8, 1.3, C.floorY, 1.45, 'heliFloor'); // floor (walkable top)
    add(-1.3, C.ceilY, -1.8, 1.3, 2.9, 1.45); // roof / engine
    add(-1.3, C.floorY, -1.85, 1.3, C.ceilY, -1.7); // rear wall
    add(-1.3, C.floorY, 1.4, -0.45, C.ceilY, 1.5); // bulkhead left
    add(0.45, C.floorY, 1.4, 1.3, C.ceilY, 1.5); // bulkhead right
    add(-1.3, 0, 1.45, 1.3, 2.2, 3.4); // cockpit (not enterable)
    for (const sx of [-1, 1]) {
      add(sx * 1.25, C.floorY, C.z0, sx * 1.4, C.ceilY, C.doorZ0);
      add(sx * 1.25, C.floorY, C.doorZ1, sx * 1.4, C.ceilY, C.z1);
    }
    add(-0.45, 1.3, -9.8, 0.45, 2.4, -1.8); // tail boom
    // benches
    add(-1.2, C.floorY, -1.68, 1.2, 1.1, -1.17, 'heliSeat');
    add(-1.2, C.floorY, 0.93, 1.2, 1.1, 1.4, 'heliSeat');
  }

  removeColliders(world) {
    for (const c of this.colliders) world.removeBox(c);
    this.colliders.length = 0;
  }

  localToWorld(x, y, z) {
    this.root.updateMatrixWorld(true);
    return new THREE.Vector3(x, y, z).applyMatrix4(this.root.matrixWorld);
  }
}
