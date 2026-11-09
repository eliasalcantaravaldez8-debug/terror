import * as THREE from 'three';
import { solveTwoBone, aimBone } from './IK.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { makeWeaponModel } from '../weapons/WeaponModels.js';
import { clamp, lerp, damp, easeInOut } from '../utils/math.js';

/**
 * Procedurally modelled & animated soldier. Joint hierarchy with analytic IK
 * for arms (on the weapon) and legs (foot planting). Faces +Z in local space.
 * This is a PROVISIONAL character: the public interface (setPose params,
 * getMuzzle, hit spheres) is what a skinned glTF character would implement.
 */
const _v1 = new THREE.Vector3(), _v2 = new THREE.Vector3(), _v3 = new THREE.Vector3();
const _q1 = new THREE.Quaternion(), _q2 = new THREE.Quaternion();

function capsule(r, len, mat, y) {
  const g = new THREE.CapsuleGeometry(r, len, 4, 10);
  const m = new THREE.Mesh(g, mat);
  m.position.y = y;
  m.castShadow = true;
  return m;
}
const _rbCache = new Map();
function boxm(w, h, d, mat, x = 0, y = 0, z = 0) {
  // rounded edges read far better than hard boxes for soft gear (vests, pouches, boots)
  const key = `${w}|${h}|${d}`;
  let g = _rbCache.get(key);
  if (!g) { g = new RoundedBoxGeometry(w, h, d, 2, Math.min(w, h, d) * 0.28); _rbCache.set(key, g); }
  const m = new THREE.Mesh(g, mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  return m;
}

const hexStr = (n) => '#' + n.toString(16).padStart(6, '0');

export const APPEARANCE = {
  ally: (mats, opts = {}) => ({
    camo: mats.camoAlly(), vest: mats.webbing('#77704f'), pouch: mats.webbing('#6c6648'), helmet: mats.helmetAlly(),
    skin: mats.skinTex(hexStr(opts.skin ?? 0xc29a7b), !!opts.beard), glove: mats.glove(), boot: mats.boot(), team: 'ally',
    glasses: opts.glasses ?? true, backpack: opts.backpack ?? true, headset: true, beard: opts.beard ?? false, armband: null,
    face: 'bare', helmetType: 'ballistic',
  }),
  enemy: (mats, opts = {}) => ({
    camo: mats.camoEnemy(), vest: mats.webbing('#2a2b2c'), pouch: mats.webbing('#232425'), helmet: mats.webbing('#2f3032'),
    skin: mats.skinTex('#b48a6c'), glove: mats.glove(), boot: mats.polymer(0x1b1b1b), team: 'enemy', glasses: false,
    backpack: false, headset: false, armband: mats.armband(),
    face: opts.mask ? 'gasmask' : 'balaclava', helmetType: opts.cap ? 'cap' : opts.mask ? 'none' : 'ballistic',
  }),
  pilot: (mats) => ({
    camo: mats.polymer(0x4c5240), vest: mats.webbing('#5a5e48'), pouch: mats.webbing('#5a5e48'), helmet: mats.polymer(0x3b4033),
    skin: mats.skinTex('#b08468'), glove: mats.glove(), boot: mats.boot(), team: 'ally', glasses: false, backpack: false,
    headset: false, visor: true, armband: null, face: 'bare', helmetType: 'flight',
  }),
};

const L_THIGH = 0.44, L_SHIN = 0.43, L_UARM = 0.29, L_FARM = 0.27;

/** Tapered, slightly muscular limb along -Y from the joint (lathe). */
const _limbCache = new Map();
function limb(rTop, rBot, len, mat, bulge = 1.04) {
  const key = `${rTop}|${rBot}|${len}|${bulge}`;
  let g = _limbCache.get(key);
  if (!g) {
    const pts = [
      [0.001, 0.01], [rTop * 0.85, 0.0], [rTop, -len * 0.12], [rTop * bulge, -len * 0.32],
      [(rTop + rBot) * 0.5 * bulge, -len * 0.6], [rBot * 1.02, -len * 0.88], [rBot * 0.9, -len], [0.001, -len - 0.008],
    ].map(([r, y]) => new THREE.Vector2(r, y));
    g = new THREE.LatheGeometry(pts, 14);
    _limbCache.set(key, g);
  }
  const m = new THREE.Mesh(g, mat);
  m.castShadow = true;
  return m;
}
function sphere(r, mat, x = 0, y = 0, z = 0, sx = 1, sy = 1, sz = 1) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 12), mat);
  m.position.set(x, y, z); m.scale.set(sx, sy, sz); m.castShadow = true;
  return m;
}

/** Sculpted head: a sphere deformed into a human skull/face (nose, brows, sockets, cheekbones, jaw, chin). */
let _headGeo = null;
function headGeometry() {
  if (_headGeo) return _headGeo;
  const g = new THREE.SphereGeometry(0.1, 36, 28);
  const p = g.attributes.position;
  const gauss = (d, s) => Math.exp(-(d * d) / (2 * s * s));
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const n = v.clone().normalize();
    let x = v.x * 0.86, y = v.y * 1.12, z = v.z * 0.98;
    const down = Math.max(0, -n.y);
    x *= 1 - 0.3 * down * down; // jaw narrows
    if (n.z < 0) z *= 1.04; // fuller back of the skull
    const front = Math.max(0, n.z);
    const nose = gauss(n.x, 0.075) * gauss(n.y + 0.12, 0.17) * front;
    z += 0.026 * nose * (0.4 + Math.max(0, -n.y) * 1.6);
    z += 0.007 * gauss(n.y - 0.27, 0.07) * gauss(n.x, 0.45) * front; // brow ridge
    for (const sx of [-1, 1]) z -= 0.013 * gauss(Math.hypot(n.x - sx * 0.34, n.y - 0.12), 0.11) * front; // eye sockets
    for (const sx of [-1, 1]) { const c = gauss(Math.hypot(n.x - sx * 0.55, n.y + 0.08), 0.15); x += sx * 0.005 * c; z += 0.004 * c; }
    z -= 0.004 * gauss(n.y + 0.5, 0.05) * gauss(n.x, 0.2) * front; // mouth groove
    z += 0.008 * gauss(n.y + 0.78, 0.1) * gauss(n.x, 0.25) * front; // chin
    p.setXYZ(i, x, y, z);
  }
  g.computeVertexNormals();
  _headGeo = g;
  return g;
}

export class SoldierModel {
  constructor(mats, appearance, { weapon = 'rifle' } = {}) {
    this.mats = mats;
    const A = appearance;
    this.root = new THREE.Group();
    this.root.name = 'soldier';
    const root = this.root;
    const dark = mats.polymer(0x1a1a19);

    // ---------------- pelvis: belt, pouches, holster
    this.pelvis = new THREE.Group(); this.pelvis.position.y = 0.95; root.add(this.pelvis);
    this.pelvis.add(sphere(0.17, A.camo, 0, -0.01, 0, 1.0, 0.65, 0.72));
    this.pelvis.add(boxm(0.35, 0.055, 0.23, A.pouch, 0, 0.065, 0)); // battle belt
    this.pelvis.add(boxm(0.06, 0.03, 0.02, mats.metalPole(), 0, 0.065, 0.118)); // buckle
    this.pelvis.add(boxm(0.07, 0.09, 0.05, A.pouch, 0.15, 0.03, 0.08));
    this.pelvis.add(boxm(0.07, 0.09, 0.05, A.pouch, -0.15, 0.03, 0.08));
    this.pelvis.add(boxm(0.06, 0.14, 0.05, dark, -0.18, -0.04, 0.0)); // holster
    this.pelvis.add(boxm(0.12, 0.1, 0.06, A.pouch, 0.0, 0.03, -0.12)); // dump pouch

    // ---------------- torso
    this.spine = new THREE.Group(); this.spine.position.y = 0.08; this.pelvis.add(this.spine);
    this.chest = new THREE.Group(); this.chest.position.y = 0.26; this.spine.add(this.chest);
    this.spine.add(sphere(0.15, A.camo, 0, 0.1, 0, 1.08, 1.0, 0.72)); // abdomen
    this.chest.add(sphere(0.17, A.camo, 0, 0.02, 0, 1.12, 0.95, 0.72)); // ribcage
    // plate carrier: front/back plates, cummerbund, shoulder straps
    this.chest.add(boxm(0.3, 0.32, 0.07, A.vest, 0, -0.02, 0.105));
    this.chest.add(boxm(0.3, 0.34, 0.07, A.vest, 0, -0.01, -0.11));
    for (const sx of [-1, 1]) {
      this.chest.add(boxm(0.07, 0.2, 0.2, A.vest, sx * 0.165, -0.08, 0));
      this.chest.add(boxm(0.065, 0.03, 0.24, A.vest, sx * 0.1, 0.16, 0));
    }
    // triple magazine pouches with magazines poking out
    for (let i = -1; i <= 1; i++) {
      this.chest.add(boxm(0.075, 0.1, 0.045, A.pouch, i * 0.085, -0.115, 0.155));
      this.chest.add(boxm(0.03, 0.025, 0.06, dark, i * 0.085, -0.055, 0.155));
    }
    this.chest.add(boxm(0.12, 0.08, 0.035, A.pouch, 0, 0.045, 0.155)); // admin pouch
    this.chest.add(boxm(0.05, 0.13, 0.04, A.pouch, 0.12, 0.06, 0.13)); // radio
    this.chest.add(boxm(0.01, 0.16, 0.01, dark, 0.13, 0.2, 0.12)); // antenna
    if (A.backpack) this.chest.add(boxm(0.28, 0.34, 0.15, A.pouch, 0, -0.05, -0.215));
    else this.chest.add(boxm(0.2, 0.2, 0.06, A.pouch, 0, -0.05, -0.17)); // hydration carrier
    for (const sx of [-1, 1]) this.chest.add(sphere(0.075, A.camo, sx * 0.2, 0.08, 0, 1, 0.95, 1.05)); // deltoids

    // ---------------- neck & head
    this.neck = new THREE.Group(); this.neck.position.y = 0.2; this.chest.add(this.neck);
    this.head = new THREE.Group(); this.head.position.y = 0.11; this.neck.add(this.head);
    const neckMesh = limb(0.05, 0.055, 0.11, A.face === 'bare' ? A.skin : mats.balaclava(), 1.0);
    neckMesh.position.y = 0.07; this.neck.add(neckMesh);
    this.neck.add(sphere(0.075, A.camo, 0, -0.02, 0, 1.15, 0.5, 1.1)); // collar
    this._buildHead(mats, A);

    // ---------------- arms
    this.arms = {};
    for (const side of ['L', 'R']) {
      const sx = side === 'L' ? 1 : -1;
      const sh = new THREE.Group(); sh.position.set(sx * 0.2, 0.1, 0); this.chest.add(sh);
      const upper = new THREE.Group(); sh.add(upper);
      upper.add(limb(0.06, 0.047, L_UARM, A.camo, 1.08));
      if (A.armband && side === 'L') { const ab = limb(0.063, 0.06, 0.05, A.armband, 1.0); ab.position.y = -0.08; upper.add(ab); }
      upper.add(boxm(0.03, 0.06, 0.05, A.pouch, sx * 0.05, -0.07, 0)); // shoulder pocket
      const lower = new THREE.Group(); lower.position.y = -L_UARM; upper.add(lower);
      lower.add(sphere(0.05, A.camo, 0, 0, 0)); // elbow
      lower.add(limb(0.048, 0.038, L_FARM - 0.02, A.camo, 1.06));
      const cuff = limb(0.044, 0.042, 0.04, A.glove, 1.0); cuff.position.y = -L_FARM + 0.06; lower.add(cuff);
      const hand = new THREE.Group(); hand.position.y = -L_FARM; lower.add(hand);
      hand.add(boxm(0.06, 0.075, 0.03, A.glove, 0, -0.035, 0));
      for (let f = 0; f < 4; f++) { const fm = limb(0.009, 0.008, 0.05, A.glove, 1.0); fm.position.set(-0.022 + f * 0.015, -0.07, 0.01); fm.rotation.x = 0.5; hand.add(fm); }
      const th = limb(0.01, 0.009, 0.04, A.glove, 1.0); th.position.set(-sx * 0.03, -0.03, 0.015); th.rotation.z = -sx * 0.7; hand.add(th);
      this.arms[side] = { shoulder: sh, upper, lower, hand };
    }
    // ---------------- legs
    this.legs = {};
    for (const side of ['L', 'R']) {
      const sx = side === 'L' ? 1 : -1;
      const hip = new THREE.Group(); hip.position.set(sx * 0.1, -0.05, 0); this.pelvis.add(hip);
      const thigh = new THREE.Group(); hip.add(thigh);
      thigh.add(limb(0.098, 0.068, L_THIGH, A.camo, 1.05));
      thigh.add(boxm(0.05, 0.11, 0.09, A.camo, sx * 0.085, -0.2, 0.01)); // cargo pocket
      const shin = new THREE.Group(); shin.position.y = -L_THIGH; thigh.add(shin);
      shin.add(sphere(0.066, A.camo, 0, 0, 0));
      shin.add(limb(0.066, 0.05, L_SHIN, A.camo, 1.08));
      shin.add(boxm(0.1, 0.12, 0.045, A.pouch, 0, -0.03, 0.065)); // knee pad
      const ankle = new THREE.Group(); ankle.position.y = -L_SHIN; shin.add(ankle);
      ankle.add(boxm(0.105, 0.14, 0.12, A.boot, 0, 0.02, 0.0)); // boot shaft
      ankle.add(boxm(0.11, 0.08, 0.28, A.boot, 0, -0.035, 0.05)); // boot
      ankle.add(boxm(0.115, 0.025, 0.29, dark, 0, -0.07, 0.05)); // sole
      this.legs[side] = { hip, thigh, shin, ankle, sx };
    }

    // weapon
    this.weaponMount = new THREE.Group();
    this.chest.add(this.weaponMount);
    this.weapon = makeWeaponModel(weapon === 'rifle' ? 'vk7' : weapon === 'sniper' ? 'lr6' : weapon, mats, 'low');
    this.weaponMount.add(this.weapon);
    this.weaponDropped = false;

    // state
    this.phase = Math.random() * 6;
    this.pose = { crouch: 0, aim: 0, seated: 0, run: 0, lean: 0 };
    this.hitKick = 0;
    this.fireKick = 0;
    this.dead = false;
    this.deathT = 0;
    this.deathDir = -1;
    this.headLook = new THREE.Vector2();
    this.seatHeight = 0.45;
    this.hitSpheres = [
      { c: new THREE.Vector3(), r: 0.13, zone: 'head' },
      { c: new THREE.Vector3(), r: 0.24, zone: 'chest' },
      { c: new THREE.Vector3(), r: 0.2, zone: 'pelvis' },
      { c: new THREE.Vector3(), r: 0.14, zone: 'legs' },
      { c: new THREE.Vector3(), r: 0.14, zone: 'legs' },
    ];
    this._footL = new THREE.Vector3(); this._footR = new THREE.Vector3();
    this.root.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  }

  _buildHead(mats, A) {
    const head = this.head;
    const faceMat = A.face === 'bare' ? A.skin : mats.balaclava();
    const strap = mats.polymer(0x2c2a24);
    const skull = new THREE.Mesh(headGeometry(), faceMat);
    skull.castShadow = true;
    head.add(skull);
    for (const sx of [-1, 1]) head.add(sphere(0.024, faceMat, sx * 0.085, 0.0, -0.005, 0.45, 1.0, 0.75)); // ears
    const eyeWhite = mats.polymer(0xe6e0d6), iris = mats.polymer(0x3a2a1c);
    const eyes = () => {
      for (const sx of [-1, 1]) {
        head.add(sphere(0.012, eyeWhite, sx * 0.031, 0.013, 0.073));
        head.add(sphere(0.0062, iris, sx * 0.031, 0.013, 0.0835));
      }
    };
    if (A.face === 'bare') {
      eyes();
      const brow = mats.polymer(0x2a1f17);
      for (const sx of [-1, 1]) { const b = boxm(0.036, 0.008, 0.012, brow, sx * 0.032, 0.035, 0.083); b.rotation.z = -sx * 0.12; head.add(b); }
      head.add(boxm(0.036, 0.007, 0.008, mats.polymer(0x8a5a4c), 0, -0.05, 0.082)); // lips
      if (A.beard) head.add(sphere(0.088, mats.polymer(0x2a1f17), 0, -0.04, 0.012, 0.92, 0.6, 1.0));
    } else if (A.face === 'balaclava') {
      head.add(boxm(0.09, 0.03, 0.03, A.skin, 0, 0.013, 0.068)); // skin around the eyes
      eyes();
    } else if (A.face === 'gasmask') {
      head.add(sphere(0.07, mats.polymer(0x1c1d1b), 0, -0.02, 0.05, 1.05, 1.0, 0.9));
      for (const sx of [-1, 1]) {
        const lens = new THREE.Mesh(new THREE.CircleGeometry(0.02, 16), mats.lens());
        lens.position.set(sx * 0.032, 0.015, 0.105); lens.rotation.y = sx * 0.25; head.add(lens);
      }
      const can = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.05, 14), mats.polymer(0x30322c));
      can.rotation.x = Math.PI / 2 - 0.4; can.position.set(0.03, -0.055, 0.11); head.add(can);
    }
    if (A.helmetType === 'ballistic') {
      const shell = new THREE.Mesh(new THREE.SphereGeometry(0.128, 24, 14, 0, Math.PI * 2, 0, Math.PI * 0.5), A.helmet);
      shell.position.set(0, 0.025, -0.006); shell.scale.set(1.0, 1.0, 1.1); shell.castShadow = true; head.add(shell);
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.128, 0.008, 6, 28), A.helmet);
      rim.rotation.x = Math.PI / 2; rim.position.set(0, 0.027, -0.006); rim.scale.set(1, 1.1, 1); head.add(rim);
      head.add(boxm(0.045, 0.035, 0.03, mats.darkMetal(), 0, 0.085, 0.12)); // NVG shroud
      for (const sx of [-1, 1]) {
        head.add(boxm(0.016, 0.03, 0.11, mats.darkMetal(), sx * 0.124, 0.05, -0.005)); // rails
        const chin = boxm(0.008, 0.11, 0.012, strap, sx * 0.075, -0.035, 0.02); chin.rotation.z = sx * 0.15; head.add(chin);
      }
      head.add(boxm(0.07, 0.04, 0.03, A.pouch, 0, 0.06, -0.13)); // counterweight
    } else if (A.helmetType === 'cap') {
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.11, 18, 10, 0, Math.PI * 2, 0, Math.PI * 0.5), A.helmet);
      cap.position.y = 0.03; cap.scale.set(1, 0.9, 1.06); head.add(cap);
      head.add(boxm(0.15, 0.012, 0.08, A.helmet, 0, 0.035, 0.12));
    } else if (A.helmetType === 'flight') {
      const shell = new THREE.Mesh(new THREE.SphereGeometry(0.135, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.6), A.helmet);
      shell.position.y = 0.015; head.add(shell);
    }
    if (A.headset) for (const sx of [-1, 1]) head.add(sphere(0.04, mats.polymer(0x2e2f2a), sx * 0.1, 0.0, 0.0, 0.6, 1.0, 1.0));
    if (A.glasses) {
      for (const sx of [-1, 1]) head.add(boxm(0.042, 0.026, 0.008, mats.lens(), sx * 0.031, 0.014, 0.092));
      head.add(boxm(0.016, 0.006, 0.008, mats.lens(), 0, 0.02, 0.094));
      for (const sx of [-1, 1]) head.add(boxm(0.004, 0.006, 0.08, mats.lens(), sx * 0.054, 0.018, 0.05));
    }
    if (A.visor) head.add(boxm(0.17, 0.05, 0.02, mats.lens(), 0, 0.03, 0.1));
  }

  /**
   * Drive the procedural animation.
   * p: { speed, moveX, moveZ (local dir), crouch 0..1, aim 0..1, aimPitch, seated 0..1, talk 0..1, lookYaw, lookPitch }
   */
  update(dt, p) {
    const P = this.pose;
    if (this.dead) { this._updateDeath(dt); this._updateHitSpheres(); return; }
    P.crouch = damp(P.crouch, p.crouch || 0, 8, dt);
    P.aim = damp(P.aim, p.aim || 0, 10, dt);
    P.seated = damp(P.seated, p.seated || 0, 6, dt);
    const speed = p.speed || 0;
    P.run = damp(P.run, clamp((speed - 2.2) / 2.5, 0, 1), 6, dt);
    this.hitKick = damp(this.hitKick, 0, 6, dt);
    this.fireKick = damp(this.fireKick, 0, 18, dt);

    const stride = lerp(1.25, 2.3, P.run);
    if (speed > 0.05) this.phase += (dt * speed / stride) * Math.PI * 2;
    const moving = clamp(speed / 1.2, 0, 1);
    const sinp = Math.sin(this.phase), cosp = Math.cos(this.phase);

    // pelvis height & bob
    const standH = 0.94, crouchH = 0.6;
    let hipY = lerp(standH, crouchH, P.crouch) - Math.abs(sinp) * 0.035 * moving - P.run * 0.05;
    const seatedY = this.seatHeight + 0.1;
    hipY = lerp(hipY, seatedY, P.seated);
    this.pelvis.position.set(0, hipY, lerp(0, -0.05, P.seated));
    this.pelvis.rotation.set(0, sinp * 0.12 * moving * (1 - P.aim * 0.6), 0);

    // spine lean
    const lean = P.run * 0.28 + P.crouch * 0.22 + P.seated * 0.05 - this.hitKick * 0.4;
    this.spine.rotation.set(lean, -this.pelvis.rotation.y * 0.8, Math.sin(this.phase * 0.5) * 0.02 * moving);
    const pitch = (p.aimPitch || 0) * P.aim;
    this.chest.rotation.set(-pitch * 0.8 - this.fireKick * 0.05, (p.chestYaw || 0), 0);

    // head
    const talk = p.talk ? Math.sin(performance.now() * 0.009) * 0.04 * p.talk : 0;
    this.neck.rotation.set(-pitch * 0.2 + talk + (p.lookPitch || 0) * 0.5, (p.lookYaw || 0) * 0.6, 0);
    this.head.rotation.set(-lean * 0.6 + (p.lookPitch || 0) * 0.5, (p.lookYaw || 0) * 0.4, 0);

    // weapon pose (relative to chest)
    this._weaponPose(P);

    // update matrices before IK
    this.root.updateMatrixWorld(true);

    // legs IK (root-local foot targets -> world)
    for (const side of ['L', 'R']) {
      const leg = this.legs[side];
      const s = side === 'L' ? 1 : -1;
      const ph = side === 'L' ? 0 : Math.PI;
      const sw = Math.sin(this.phase + ph), cw = Math.cos(this.phase + ph);
      const amp = Math.min(0.42, speed * 0.13);
      let fx = leg.sx * 0.12, fz = 0, fy = 0.08;
      const mx = p.moveX || 0, mz = p.moveZ ?? 1;
      fx += mx * sw * amp; fz += mz * sw * amp;
      fy += Math.max(0, cw) * 0.14 * moving;
      // crouch: one knee forward, other back
      fz = lerp(fz, s > 0 ? 0.28 : -0.12, P.crouch * (1 - moving * 0.5));
      fx = lerp(fx, leg.sx * 0.16, P.crouch);
      // seated: feet forward
      fx = lerp(fx, leg.sx * 0.16, P.seated); fz = lerp(fz, 0.42, P.seated); fy = lerp(fy, 0.08, P.seated);
      _v1.set(fx, fy, fz);
      this.root.localToWorld(_v1);
      _v2.set(leg.sx * 0.1, hipY, 0.6); this.root.localToWorld(_v2); // knee pole forward
      solveTwoBone(leg.thigh, leg.shin, L_THIGH, L_SHIN, _v1, _v2);
      // keep boots flat & aligned with the body
      leg.shin.updateWorldMatrix(true, false);
      leg.shin.getWorldQuaternion(_q1).invert();
      this.root.getWorldQuaternion(_q2);
      leg.ankle.quaternion.copy(_q1.multiply(_q2));
    }

    // arms IK on the weapon grips
    this.chest.updateMatrixWorld(true);
    const anchors = this.weapon.userData.anchors;
    if (!this.weaponDropped) {
      _v1.copy(anchors.gripRear); this.weapon.localToWorld(_v1);
      _v2.set(-0.5, -0.5, -0.3); this.chest.localToWorld(_v2);
      solveTwoBone(this.arms.R.upper, this.arms.R.lower, L_UARM, L_FARM, _v1, _v2);
      _v1.copy(anchors.gripFront); this.weapon.localToWorld(_v1);
      _v2.set(0.6, -0.6, 0.1); this.chest.localToWorld(_v2);
      solveTwoBone(this.arms.L.upper, this.arms.L.lower, L_UARM, L_FARM, _v1, _v2);
    }
    this._updateHitSpheres();
  }

  _weaponPose(P) {
    const m = this.weaponMount;
    // aim: shouldered, sight under the eye
    const aimPos = _v1.set(-0.07, 0.22, 0.42);
    // low ready
    const lowPos = _v2.set(-0.05, 0.02, 0.3);
    const pos = new THREE.Vector3().lerpVectors(lowPos, aimPos, P.aim);
    // seated: vertical between knees
    const seatPos = _v3.set(0.0, -0.42, 0.42);
    pos.lerp(seatPos, P.seated);
    pos.z -= this.fireKick * 0.04;
    m.position.copy(pos);
    const qLow = _q1.setFromEuler(new THREE.Euler(0.55, -0.35, 0.1));
    const qAim = new THREE.Quaternion();
    const qSeat = new THREE.Quaternion().setFromEuler(new THREE.Euler(-1.25, 0.2, 0));
    const q = qLow.clone().slerp(qAim, P.aim).slerp(qSeat, P.seated);
    m.quaternion.copy(q);
  }

  _updateHitSpheres() {
    const hs = this.hitSpheres;
    this.head.getWorldPosition(hs[0].c);
    _v1.set(0, -0.02, 0.02); this.chest.localToWorld(hs[1].c.copy(_v1));
    this.pelvis.getWorldPosition(hs[2].c);
    this.legs.L.shin.getWorldPosition(hs[3].c);
    this.legs.R.shin.getWorldPosition(hs[4].c);
  }

  getMuzzle(out = new THREE.Vector3()) {
    out.copy(this.weapon.userData.anchors.muzzle);
    return this.weapon.localToWorld(out);
  }
  getEye(out = new THREE.Vector3()) { return this.head.getWorldPosition(out); }

  // ------------------------------------------------------------ death
  die(direction = -1, scene = null) {
    if (this.dead) return;
    this.dead = true;
    this.deathT = 0;
    this.deathDir = direction; // -1 backward, +1 forward
    this.deathTwist = (Math.random() - 0.5) * 0.8;
    this._startHip = this.pelvis.position.y;
    if (scene) this.dropWeapon(scene);
  }

  dropWeapon(scene) {
    if (this.weaponDropped) return;
    this.weapon.updateWorldMatrix(true, false);
    const wp = new THREE.Vector3(), wq = new THREE.Quaternion();
    this.weapon.getWorldPosition(wp); this.weapon.getWorldQuaternion(wq);
    scene.attach(this.weapon);
    this.weaponDropped = true;
    this.dropVel = new THREE.Vector3((Math.random() - 0.5) * 1.5, 1, (Math.random() - 0.5) * 1.5);
    this.dropping = true;
  }

  _updateDeath(dt) {
    this.deathT += dt;
    const t = this.deathT;
    const buckle = clamp(t / 0.35, 0, 1);
    const fall = easeInOut(clamp((t - 0.15) / 0.75, 0, 1));
    // knees buckle first, then topple
    this.pelvis.position.y = lerp(this._startHip ?? 0.94, 0.62, buckle);
    this.root.rotation.x = this.deathDir * fall * (Math.PI / 2 - 0.08);
    this.root.rotation.z = this.deathTwist * fall;
    this.root.position.y = this.baseY + fall * 0.12;
    this.spine.rotation.x = this.deathDir * 0.3 * fall;
    this.neck.rotation.x = -this.deathDir * 0.4 * fall;
    // limp arms (snap instantly for bodies placed at load time)
    const kA = t > 2 ? 1 : 1 - Math.exp(-6 * dt), kL = t > 2 ? 1 : 1 - Math.exp(-8 * dt);
    for (const side of ['L', 'R']) {
      const a = this.arms[side];
      const s = side === 'L' ? 1 : -1;
      a.upper.quaternion.slerp(_q1.setFromEuler(new THREE.Euler(-0.4 * this.deathDir, 0, s * (0.5 + fall * 0.9))), kA);
      a.lower.quaternion.slerp(_q2.setFromEuler(new THREE.Euler(-0.5, 0, 0)), kA);
      const l = this.legs[side];
      l.thigh.quaternion.slerp(_q1.setFromEuler(new THREE.Euler(-0.3 * buckle * (1 - fall) - 0.1, 0, s * 0.12)), kL);
      l.shin.quaternion.slerp(_q2.setFromEuler(new THREE.Euler(0.9 * buckle * (1 - fall * 0.7), 0, 0)), kL);
      l.ankle.quaternion.identity();
    }
    if (this.dropping && t > 2) this.dropVel.y = -50; // bodies placed at load time: settle the weapon immediately
    if (this.dropping) {
      this.dropVel.y -= 9.8 * dt;
      this.weapon.position.addScaledVector(this.dropVel, dt);
      this.weapon.rotation.z += dt * 3;
      if (this.weapon.position.y < 0.05 + (this.groundY || 0)) {
        this.weapon.position.y = 0.05 + (this.groundY || 0);
        this.weapon.rotation.set(0, this.weapon.rotation.y, Math.PI / 2);
        this.dropping = false;
      }
    }
  }
}
