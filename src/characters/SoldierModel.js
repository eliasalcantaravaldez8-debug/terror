import * as THREE from 'three';
import { solveTwoBone, aimBone } from './IK.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { makeRifle, makeSniperRifle } from '../weapons/WeaponModels.js';
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

export const APPEARANCE = {
  ally: (mats, opts = {}) => ({
    camo: mats.camoAlly(), vest: mats.vestAlly(), helmet: mats.helmetAlly(), skin: mats.skin(opts.skin ?? 0xc29a7b),
    glove: mats.glove(), boot: mats.boot(), team: 'ally', glasses: opts.glasses ?? true, backpack: opts.backpack ?? true,
    headset: true, beard: opts.beard ?? false, armband: null,
  }),
  enemy: (mats, opts = {}) => ({
    camo: mats.camoEnemy(), vest: mats.vestEnemy(), helmet: mats.vestEnemy(), skin: mats.balaclava(),
    glove: mats.glove(), boot: mats.polymer(0x1b1b1b), team: 'enemy', glasses: false, backpack: false,
    headset: false, balaclava: true, armband: mats.armband(), cap: opts.cap ?? false,
  }),
  pilot: (mats) => ({
    camo: mats.polymer(0x4c5240), vest: mats.vestAlly(), helmet: mats.polymer(0x3b4033), skin: mats.skin(0xb08468),
    glove: mats.glove(), boot: mats.boot(), team: 'ally', glasses: false, backpack: false, headset: false, visor: true, armband: null,
  }),
};

const L_THIGH = 0.44, L_SHIN = 0.43, L_UARM = 0.29, L_FARM = 0.27;

export class SoldierModel {
  constructor(mats, appearance, { weapon = 'rifle' } = {}) {
    this.mats = mats;
    const A = appearance;
    this.root = new THREE.Group();
    this.root.name = 'soldier';
    const root = this.root;

    this.pelvis = new THREE.Group(); this.pelvis.position.y = 0.95; root.add(this.pelvis);
    this.pelvis.add(boxm(0.32, 0.18, 0.2, A.camo, 0, 0, 0));
    this.pelvis.add(boxm(0.34, 0.06, 0.22, A.vest, 0, 0.07, 0)); // belt
    this.pelvis.add(boxm(0.08, 0.1, 0.05, A.vest, 0.12, 0.02, 0.11)); // pouch

    this.spine = new THREE.Group(); this.spine.position.y = 0.08; this.pelvis.add(this.spine);
    this.chest = new THREE.Group(); this.chest.position.y = 0.26; this.spine.add(this.chest);
    const torso = capsule(0.15, 0.22, A.camo, 0.0); torso.scale.set(1.15, 1, 0.75); this.spine.add(torso); torso.position.y = 0.18;
    // plate carrier
    const vest = boxm(0.37, 0.34, 0.27, A.vest, 0, -0.03, 0.0); this.chest.add(vest);
    for (let i = -1; i <= 1; i++) this.chest.add(boxm(0.08, 0.11, 0.05, A.vest, i * 0.095, -0.12, 0.155));
    this.chest.add(boxm(0.1, 0.07, 0.04, A.vest, 0.09, 0.06, 0.15));
    if (A.backpack) this.chest.add(boxm(0.3, 0.36, 0.16, A.vest, 0, -0.05, -0.21));
    else this.chest.add(boxm(0.2, 0.22, 0.07, A.vest, 0, -0.06, -0.16));
    // shoulders
    for (const sx of [-1, 1]) this.chest.add(boxm(0.12, 0.1, 0.18, A.camo, sx * 0.19, 0.09, 0));

    this.neck = new THREE.Group(); this.neck.position.y = 0.2; this.chest.add(this.neck);
    this.head = new THREE.Group(); this.head.position.y = 0.1; this.neck.add(this.head);
    this.neck.add(capsule(0.05, 0.06, A.skin, 0.02));
    const face = new THREE.Mesh(new THREE.SphereGeometry(0.105, 14, 12), A.skin); face.scale.set(0.9, 1.08, 1.0); face.castShadow = true; this.head.add(face);
    if (A.beard) { const b = new THREE.Mesh(new THREE.SphereGeometry(0.095, 10, 8, 0, Math.PI * 2, Math.PI * 0.55, Math.PI * 0.45), mats.polymer(0x2a1f17)); b.position.set(0, -0.01, 0.012); this.head.add(b); }
    if (!A.balaclava) {
      // facial features: nose, brows, eyes, mouth, ears, jaw
      this.head.add(boxm(0.026, 0.045, 0.035, A.skin, 0, -0.01, 0.1));
      const dark = mats.polymer(0x1c1714);
      for (const sx of [-1, 1]) {
        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.011, 8, 6), mats.polymer(0xe8e2d8));
        eye.position.set(sx * 0.036, 0.022, 0.088); this.head.add(eye);
        const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.006, 6, 4), dark);
        pupil.position.set(sx * 0.036, 0.022, 0.098); this.head.add(pupil);
        this.head.add(boxm(0.038, 0.009, 0.012, dark, sx * 0.037, 0.045, 0.094));
        const ear = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 6), A.skin);
        ear.scale.set(0.5, 1, 0.8); ear.position.set(sx * 0.095, 0.0, 0.0); this.head.add(ear);
      }
      this.head.add(boxm(0.045, 0.008, 0.01, mats.polymer(0x6e4a3e), 0, -0.058, 0.093));
      const jaw = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 8), A.skin);
      jaw.scale.set(1, 0.7, 1); jaw.position.set(0, -0.055, 0.02); this.head.add(jaw);
    } else {
      // eye slit
      this.head.add(boxm(0.13, 0.03, 0.02, mats.skin(0x8c6a55), 0, 0.02, 0.095));
    }
    if (A.cap) {
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.115, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), A.helmet);
      cap.position.y = 0.03; this.head.add(cap);
      this.head.add(boxm(0.15, 0.015, 0.09, A.helmet, 0, 0.035, 0.12));
    } else {
      const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.135, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.55), A.helmet);
      helmet.position.y = 0.02; helmet.scale.set(1, 0.95, 1.08); helmet.castShadow = true; this.head.add(helmet);
      this.head.add(boxm(0.05, 0.04, 0.03, mats.darkMetal(), 0, 0.07, 0.13)); // NVG mount
      for (const sx of [-1, 1]) this.head.add(boxm(0.02, 0.06, 0.12, mats.darkMetal(), sx * 0.13, 0.04, 0)); // rails
    }
    if (A.headset) for (const sx of [-1, 1]) this.head.add(boxm(0.04, 0.07, 0.07, mats.polymer(0x2e2f2a), sx * 0.11, -0.01, 0));
    if (A.glasses) {
      for (const sx of [-1, 1]) this.head.add(boxm(0.055, 0.032, 0.012, mats.lens(), sx * 0.036, 0.022, 0.106));
      this.head.add(boxm(0.02, 0.008, 0.01, mats.lens(), 0, 0.03, 0.107));
    }
    if (A.visor) this.head.add(boxm(0.2, 0.06, 0.03, mats.lens(), 0, 0.03, 0.12));

    // arms
    this.arms = {};
    for (const side of ['L', 'R']) {
      const sx = side === 'L' ? 1 : -1;
      const sh = new THREE.Group(); sh.position.set(sx * 0.2, 0.1, 0); this.chest.add(sh);
      const upper = new THREE.Group(); sh.add(upper);
      upper.add(capsule(0.055, L_UARM - 0.08, A.camo, -L_UARM / 2));
      if (A.armband && side === 'L') { const ab = capsule(0.06, 0.04, A.armband, -0.1); upper.add(ab); }
      const lower = new THREE.Group(); lower.position.y = -L_UARM; upper.add(lower);
      lower.add(capsule(0.048, L_FARM - 0.08, A.camo, -L_FARM / 2));
      lower.add(capsule(0.052, 0.02, A.camo, -0.03));
      const hand = new THREE.Group(); hand.position.y = -L_FARM; lower.add(hand);
      hand.add(boxm(0.07, 0.09, 0.04, A.glove, 0, -0.04, 0));
      this.arms[side] = { shoulder: sh, upper, lower, hand };
    }
    // legs
    this.legs = {};
    for (const side of ['L', 'R']) {
      const sx = side === 'L' ? 1 : -1;
      const hip = new THREE.Group(); hip.position.set(sx * 0.1, -0.05, 0); this.pelvis.add(hip);
      const thigh = new THREE.Group(); hip.add(thigh);
      thigh.add(capsule(0.085, L_THIGH - 0.12, A.camo, -L_THIGH / 2));
      const shin = new THREE.Group(); shin.position.y = -L_THIGH; thigh.add(shin);
      shin.add(capsule(0.065, L_SHIN - 0.1, A.camo, -L_SHIN / 2));
      shin.add(boxm(0.1, 0.11, 0.05, A.vest, 0, -0.04, 0.06)); // knee pad
      const ankle = new THREE.Group(); ankle.position.y = -L_SHIN; shin.add(ankle);
      ankle.add(boxm(0.11, 0.1, 0.27, A.boot, 0, -0.03, 0.05));
      this.legs[side] = { hip, thigh, shin, ankle, sx };
    }

    // weapon
    this.weaponMount = new THREE.Group();
    this.chest.add(this.weaponMount);
    this.weapon = weapon === 'sniper' ? makeSniperRifle(mats) : makeRifle(mats, 'low');
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
