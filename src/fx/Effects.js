import * as THREE from 'three';
import { ParticleSystem } from './ParticleSystem.js';
import { TextureFactory as TF } from '../render/TextureFactory.js';

const _v = new THREE.Vector3();
const _q = new THREE.Quaternion();
const Z = new THREE.Vector3(0, 0, 1);

/**
 * High-level visual effects: muzzle flashes, impacts, decals, tracers,
 * blood, explosions, fires, smoke columns, rotor wash, rain and casings.
 */
export class Effects {
  constructor(scene, pipeline, quality) {
    this.scene = scene;
    this.pipeline = pipeline;
    this.q = quality;
    const fog = scene.fog;
    const k = quality.particles;
    this.smoke = new ParticleSystem(scene, { max: Math.floor(1800 * k), texture: TF.smokeSprite(), fog, renderOrder: 11 });
    this.dust = new ParticleSystem(scene, { max: Math.floor(1200 * k), texture: TF.smokeSprite(), fog, tint: 0xd8cdb8, renderOrder: 12 });
    this.fire = new ParticleSystem(scene, { max: Math.floor(900 * k), texture: TF.smokeSprite(), additive: true, renderOrder: 13 });
    this.sparks = new ParticleSystem(scene, { max: 600, texture: TF.softDot(), additive: true, renderOrder: 14 });
    this.flashes = new ParticleSystem(scene, { max: 64, texture: TF.flash(), additive: true, renderOrder: 15 });
    this.blood = new ParticleSystem(scene, { max: 300, texture: TF.smokeSprite(), fog, renderOrder: 12 });

    // pooled lights (constant count -> no shader recompiles)
    this.lights = [];
    for (let i = 0; i < 4; i++) {
      const l = new THREE.PointLight(0xffa860, 0, 14, 2);
      l.userData.decay = 0;
      scene.add(l);
      this.lights.push(l);
    }
    this.lightIdx = 0;
    this.fireLights = [];
    // spare fire lights allocated up-front so runtime fires don't change the light count
    this.spareFireLights = [];
    for (let i = 0; i < 2; i++) {
      const l = new THREE.PointLight(0xff8a3a, 0, 12, 2);
      scene.add(l);
      this.spareFireLights.push(l);
    }

    // decals
    this.decalGeo = new THREE.PlaneGeometry(1, 1);
    this.holeMat = new THREE.MeshStandardMaterial({ map: TF.bulletHole(), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2, roughness: 1 });
    this.scorchMat = new THREE.MeshStandardMaterial({ map: TF.scorch(), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3, roughness: 1 });
    this.decals = [];
    this.maxDecals = 160;

    // tracers
    this.tracerMat = new THREE.MeshBasicMaterial({ color: 0xffd9a0, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false });
    this.tracerGeo = new THREE.BoxGeometry(0.025, 0.025, 1);
    this.tracerGeo.translate(0, 0, -0.5);
    this.tracers = [];
    for (let i = 0; i < 48; i++) {
      const m = new THREE.Mesh(this.tracerGeo, this.tracerMat);
      m.visible = false; m.frustumCulled = false;
      scene.add(m);
      this.tracers.push({ mesh: m, active: false });
    }

    // shell casings
    this.casingGeo = new THREE.CylinderGeometry(0.006, 0.006, 0.045, 6);
    this.casingMat = new THREE.MeshStandardMaterial({ color: 0xb8913f, metalness: 1, roughness: 0.3 });
    this.casings = [];
    for (let i = 0; i < 30; i++) {
      const m = new THREE.Mesh(this.casingGeo, this.casingMat);
      m.visible = false; scene.add(m);
      this.casings.push({ mesh: m, vel: new THREE.Vector3(), spin: new THREE.Vector3(), life: 0, active: false });
    }
    this.casingIdx = 0;

    this.emitters = []; // persistent: fires, smoke columns
    this.wind = new THREE.Vector3(1.2, 0, -0.6);
    this.time = 0;
    this.onCasingLand = null;
    this.initRain(quality.rain);
  }

  // ----------------------------------------------------------- lights
  flashLight(pos, intensity = 6, color = 0xffa860, decay = 18, range = 12) {
    const l = this.lights[this.lightIdx++ % this.lights.length];
    l.position.copy(pos);
    l.color.setHex(color);
    l.intensity = intensity;
    l.distance = range;
    l.userData.decay = decay;
  }

  // ----------------------------------------------------------- weapons
  muzzleFlash(pos, dir, scale = 1, light = true) {
    this.flashes.spawn({ x: pos.x, y: pos.y, z: pos.z, life: 0.05, size: 0.35 * scale, endSize: 0.5 * scale, color: [1, 0.85, 0.6], alpha: 1, fadeIn: 0 });
    this.flashes.spawn({ x: pos.x + dir.x * 0.15, y: pos.y + dir.y * 0.15, z: pos.z + dir.z * 0.15, life: 0.04, size: 0.25 * scale, endSize: 0.3 * scale, color: [1, 0.7, 0.4], alpha: 0.8, fadeIn: 0 });
    this.smoke.spawn({ x: pos.x, y: pos.y, z: pos.z, vx: dir.x * 1.5, vy: 0.4, vz: dir.z * 1.5, life: 0.9, size: 0.15 * scale, endSize: 0.7 * scale, color: [0.8, 0.8, 0.8], alpha: 0.18, drag: 2 });
    if (light) this.flashLight(pos, 4 * scale, 0xffb068, 40, 9);
  }

  tracer(from, to, speed = 380) {
    const t = this.tracers.find((x) => !x.active) || this.tracers[0];
    const len = from.distanceTo(to);
    if (len < 2) return;
    t.active = true;
    t.from = from.clone(); t.to = to.clone();
    t.dist = len; t.trav = Math.min(len * 0.1, 3); t.speed = speed;
    t.mesh.visible = true;
    t.mesh.position.copy(from);
    t.mesh.lookAt(to);
    t.mesh.rotateY(Math.PI); // geometry extends along -Z
  }

  impact(point, normal, surface = 'concrete', strength = 1) {
    const n = normal;
    const isMetal = surface === 'metal';
    const isDirt = surface === 'dirt' || surface === 'ground';
    // dust puff
    const col = isDirt ? [0.55, 0.48, 0.38] : isMetal ? [0.6, 0.6, 0.6] : [0.75, 0.72, 0.66];
    for (let i = 0; i < 3; i++) {
      this.dust.spawn({
        x: point.x + n.x * 0.05, y: point.y + n.y * 0.05, z: point.z + n.z * 0.05,
        vx: n.x * (1 + Math.random() * 2) + (Math.random() - 0.5), vy: n.y * 1.5 + Math.random() * 0.8, vz: n.z * (1 + Math.random() * 2) + (Math.random() - 0.5),
        life: 0.7 + Math.random() * 0.8, size: 0.12 * strength, endSize: (0.5 + Math.random() * 0.4) * strength, color: col, alpha: 0.55, drag: 3, gravity: 0.3,
      });
    }
    // sparks / chips
    const count = isMetal ? 8 : 4;
    for (let i = 0; i < count; i++) {
      const sp = 3 + Math.random() * 5;
      this.sparks.spawn({
        x: point.x, y: point.y, z: point.z,
        vx: (n.x + (Math.random() - 0.5) * 1.4) * sp, vy: (n.y + Math.random() * 0.8) * sp, vz: (n.z + (Math.random() - 0.5) * 1.4) * sp,
        life: 0.15 + Math.random() * 0.25, size: isMetal ? 0.05 : 0.03, endSize: 0.01,
        color: isMetal ? [1, 0.75, 0.35] : [0.9, 0.85, 0.75], alpha: isMetal ? 1 : 0.5, gravity: 9, fadeIn: 0,
      });
    }
    if (surface !== 'flesh') this.decal(point, n, 0.09 + Math.random() * 0.05, this.holeMat);
  }

  decal(point, normal, size, mat) {
    let d;
    if (this.decals.length < this.maxDecals) {
      d = new THREE.Mesh(this.decalGeo, mat);
      d.receiveShadow = true;
      this.scene.add(d);
      this.decals.push(d);
    } else {
      d = this.decals.shift();
      d.material = mat;
      this.decals.push(d);
    }
    _v.set(normal.x, normal.y, normal.z);
    _q.setFromUnitVectors(Z, _v);
    d.quaternion.copy(_q);
    d.rotateZ(Math.random() * 6.28);
    d.position.set(point.x + normal.x * 0.01, point.y + normal.y * 0.01, point.z + normal.z * 0.01);
    d.scale.setScalar(size);
  }

  bloodHit(point, dir) {
    for (let i = 0; i < 6; i++) {
      this.blood.spawn({
        x: point.x, y: point.y, z: point.z,
        vx: dir.x * (1 + Math.random() * 2) + (Math.random() - 0.5) * 1.5, vy: Math.random() * 1.5, vz: dir.z * (1 + Math.random() * 2) + (Math.random() - 0.5) * 1.5,
        life: 0.35 + Math.random() * 0.4, size: 0.08, endSize: 0.45, color: [0.35, 0.03, 0.03], alpha: 0.75, drag: 4, gravity: 2, fadeIn: 0,
      });
    }
  }

  casing(pos, vel) {
    const c = this.casings[this.casingIdx++ % this.casings.length];
    c.active = true; c.life = 0;
    c.mesh.visible = true;
    c.mesh.position.copy(pos);
    c.vel.copy(vel);
    c.spin.set(Math.random() * 20, Math.random() * 20, Math.random() * 20);
    c.bounced = false;
  }

  // ----------------------------------------------------------- explosions
  explosion(pos, scale = 1) {
    this.flashLight(pos.clone().add(new THREE.Vector3(0, 1, 0)), 60 * scale, 0xffa040, 6, 40);
    this.flashes.spawn({ x: pos.x, y: pos.y + 1, z: pos.z, life: 0.18, size: 3 * scale, endSize: 7 * scale, color: [1, 0.8, 0.5], alpha: 1, fadeIn: 0 });
    for (let i = 0; i < 40 * scale; i++) {
      const a = Math.random() * 6.28, e = Math.random() * 1.3, sp = 4 + Math.random() * 9;
      this.fire.spawn({
        x: pos.x, y: pos.y + 0.6, z: pos.z,
        vx: Math.cos(a) * Math.cos(e) * sp, vy: Math.sin(e) * sp * 0.9 + 2, vz: Math.sin(a) * Math.cos(e) * sp,
        life: 0.5 + Math.random() * 0.6, size: 1.0 * scale, endSize: 2.6 * scale, color: [1, 0.55 + Math.random() * 0.2, 0.2], alpha: 0.9, drag: 3.5, gravity: -1, fadeIn: 0.02,
      });
    }
    for (let i = 0; i < 46 * scale; i++) {
      const a = Math.random() * 6.28, sp = 2 + Math.random() * 6;
      this.smoke.spawn({
        x: pos.x + (Math.random() - 0.5), y: pos.y + 0.8 + Math.random(), z: pos.z + (Math.random() - 0.5),
        vx: Math.cos(a) * sp, vy: 1.5 + Math.random() * 4, vz: Math.sin(a) * sp,
        life: 4 + Math.random() * 5, size: 1.2 * scale, endSize: (6 + Math.random() * 4) * scale, color: [0.16, 0.15, 0.14], alpha: 0.85, drag: 1.2, gravity: -0.15, fadeIn: 0.05,
      });
    }
    for (let i = 0; i < 50; i++) {
      const sp = 8 + Math.random() * 18;
      this.sparks.spawn({
        x: pos.x, y: pos.y + 0.6, z: pos.z,
        vx: (Math.random() - 0.5) * sp, vy: Math.random() * sp, vz: (Math.random() - 0.5) * sp,
        life: 0.6 + Math.random() * 1.0, size: 0.08, endSize: 0.03, color: [1, 0.7, 0.3], alpha: 1, gravity: 9.8, fadeIn: 0, drag: 0.5,
      });
    }
    for (let i = 0; i < 25; i++) {
      const a = Math.random() * 6.28, sp = 3 + Math.random() * 6;
      this.dust.spawn({ x: pos.x, y: 0.3, z: pos.z, vx: Math.cos(a) * sp, vy: 0.5 + Math.random(), vz: Math.sin(a) * sp, life: 2.5 + Math.random() * 2, size: 1, endSize: 4 * scale, color: [0.55, 0.5, 0.42], alpha: 0.6, drag: 1.5 });
    }
    this.decal({ x: pos.x, y: 0.015, z: pos.z }, { x: 0, y: 1, z: 0 }, 5 * scale, this.scorchMat);
  }

  // ----------------------------------------------------------- persistent emitters
  addFire(pos, size = 1, withLight = true) {
    const e = { type: 'fire', pos: new THREE.Vector3(pos.x, pos.y, pos.z), size, acc: 0, light: null };
    if (withLight) {
      let l = this.spareFireLights.pop();
      if (!l) { l = new THREE.PointLight(0xff8a3a, 0, 12, 2); this.scene.add(l); }
      l.distance = 12 * size;
      l.position.copy(e.pos).add(new THREE.Vector3(0, 0.8, 0));
      e.light = l;
      this.fireLights.push(l);
    }
    this.emitters.push(e);
    return e;
  }
  addSmokeColumn(pos, size = 1, color = [0.18, 0.17, 0.16]) {
    const e = { type: 'column', pos: new THREE.Vector3(pos.x, pos.y || 0, pos.z), size, acc: 0, color };
    this.emitters.push(e);
    return e;
  }
  addColoredSmoke(pos, color) {
    const e = { type: 'signal', pos: new THREE.Vector3(pos.x, pos.y || 0.1, pos.z), size: 1, acc: 0, color, life: 0 };
    this.emitters.push(e);
    return e;
  }
  removeEmitter(e) {
    const i = this.emitters.indexOf(e);
    if (i >= 0) this.emitters.splice(i, 1);
    if (e.light) { e.light.intensity = 0; this.spareFireLights.push(e.light); e.light = null; }
  }

  /** Rotor downwash: ring of dust around a point on the ground. strength 0..1 */
  rotorWash(center, strength, dt) {
    if (strength <= 0.02) return;
    this._washAcc = (this._washAcc || 0) + dt * 60 * strength * this.q.particles;
    while (this._washAcc > 1) {
      this._washAcc -= 1;
      const a = Math.random() * 6.28, r = 2 + Math.random() * 6;
      const sp = 6 + Math.random() * 6;
      this.dust.spawn({
        x: center.x + Math.cos(a) * r, y: 0.2, z: center.z + Math.sin(a) * r,
        vx: Math.cos(a) * sp, vy: 0.4 + Math.random() * 1.2, vz: Math.sin(a) * sp,
        life: 1.2 + Math.random() * 1.2, size: 0.6, endSize: 3.2, color: [0.62, 0.57, 0.48], alpha: 0.35 * strength, drag: 1.6,
      });
    }
  }

  // ----------------------------------------------------------- rain
  initRain(count) {
    this.rainCount = count;
    const pos = new Float32Array(count * 6);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
    this.rainGeo = g;
    this.rain = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: 0x9aa4ad, transparent: true, opacity: 0.28, depthWrite: false }));
    this.rain.frustumCulled = false;
    this.scene.add(this.rain);
    this.rainDrops = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      this.rainDrops[i * 3] = (Math.random() - 0.5) * 40;
      this.rainDrops[i * 3 + 1] = Math.random() * 25;
      this.rainDrops[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    this.rainIntensity = 0.6;
  }

  updateRain(dt, cam, velocity) {
    const P = this.rainGeo.attributes.position.array;
    const fall = 14 * dt;
    const wx = this.wind.x * 0.08, wz = this.wind.z * 0.08;
    const n = Math.floor(this.rainCount * this.rainIntensity);
    for (let i = 0; i < this.rainCount; i++) {
      let x = this.rainDrops[i * 3], y = this.rainDrops[i * 3 + 1], z = this.rainDrops[i * 3 + 2];
      y -= fall;
      x += wx * fall; z += wz * fall;
      if (y < cam.y - 8 || y < -0.5) { y = cam.y + 14 + Math.random() * 6; x = cam.x + (Math.random() - 0.5) * 40; z = cam.z + (Math.random() - 0.5) * 40; }
      if (x - cam.x > 20) x -= 40; if (x - cam.x < -20) x += 40;
      if (z - cam.z > 20) z -= 40; if (z - cam.z < -20) z += 40;
      this.rainDrops[i * 3] = x; this.rainDrops[i * 3 + 1] = y; this.rainDrops[i * 3 + 2] = z;
      const o = i * 6;
      if (i < n) {
        P[o] = x; P[o + 1] = y; P[o + 2] = z;
        P[o + 3] = x - wx * 0.6 - (velocity ? velocity.x * 0.02 : 0); P[o + 4] = y + 0.55; P[o + 5] = z - wz * 0.6 - (velocity ? velocity.z * 0.02 : 0);
      } else {
        P[o] = P[o + 3] = x; P[o + 1] = P[o + 4] = -100; P[o + 2] = P[o + 5] = z;
      }
    }
    this.rainGeo.attributes.position.needsUpdate = true;
  }

  // ----------------------------------------------------------- update
  update(dt, camPos, camVel, colWorld) {
    this.time += dt;
    for (const l of this.lights) {
      if (l.intensity > 0) l.intensity = Math.max(0, l.intensity - l.userData.decay * dt * Math.max(1, l.intensity * 0.3));
    }
    for (const e of this.emitters) {
      e.acc += dt;
      if (e.type === 'fire') {
        const rate = 0.03 / e.size / this.q.particles;
        while (e.acc > rate) {
          e.acc -= rate;
          this.fire.spawn({ x: e.pos.x + (Math.random() - 0.5) * 0.9 * e.size, y: e.pos.y, z: e.pos.z + (Math.random() - 0.5) * 0.9 * e.size, vx: 0, vy: 1.5 + Math.random() * 1.5, vz: 0, life: 0.5 + Math.random() * 0.5, size: 0.5 * e.size, endSize: 0.15 * e.size, color: [1, 0.5 + Math.random() * 0.2, 0.15], alpha: 0.85, drag: 1, fadeIn: 0.15 });
          if (Math.random() < 0.35) this.smoke.spawn({ x: e.pos.x, y: e.pos.y + 1.0, z: e.pos.z, vx: 0, vy: 1.8 + Math.random(), vz: 0, life: 5 + Math.random() * 3, size: 0.6 * e.size, endSize: 4 * e.size, color: [0.12, 0.11, 0.1], alpha: 0.6, drag: 0.3, fadeIn: 0.1 });
        }
        if (e.light) e.light.intensity = (2.5 + Math.sin(this.time * 17 + e.pos.x) * 0.6 + Math.sin(this.time * 31) * 0.4) * e.size;
      } else if (e.type === 'column') {
        const rate = 0.35 / this.q.particles;
        while (e.acc > rate) {
          e.acc -= rate;
          this.smoke.spawn({ x: e.pos.x + (Math.random() - 0.5) * 6, y: e.pos.y + 2, z: e.pos.z + (Math.random() - 0.5) * 6, vx: 0, vy: 5 + Math.random() * 2, vz: 0, life: 18 + Math.random() * 6, size: 8 * e.size, endSize: 34 * e.size, color: e.color, alpha: 0.55, drag: 0.05, fadeIn: 0.05 });
        }
      } else if (e.type === 'signal') {
        e.life += dt;
        const rate = 0.05 / this.q.particles;
        while (e.acc > rate) {
          e.acc -= rate;
          this.smoke.spawn({ x: e.pos.x, y: e.pos.y, z: e.pos.z, vx: (Math.random() - 0.5) * 0.6, vy: 1.2 + Math.random() * 0.8, vz: (Math.random() - 0.5) * 0.6, life: 6 + Math.random() * 3, size: 0.3, endSize: 3.5, color: e.color, alpha: 0.7, drag: 0.4, fadeIn: 0.05 });
        }
      }
    }
    const wind = this.wind;
    this.smoke.update(dt, wind);
    this.dust.update(dt, wind);
    this.fire.update(dt, wind);
    this.sparks.update(dt);
    this.flashes.update(dt);
    this.blood.update(dt);

    for (const t of this.tracers) {
      if (!t.active) continue;
      t.trav += t.speed * dt;
      const head = Math.min(t.trav, t.dist);
      const tail = Math.max(0, t.trav - 7);
      if (tail >= t.dist) { t.active = false; t.mesh.visible = false; continue; }
      const dir = _v.subVectors(t.to, t.from).normalize();
      t.mesh.position.copy(t.from).addScaledVector(dir, head);
      t.mesh.scale.set(1, 1, Math.max(0.01, head - tail));
    }

    for (const c of this.casings) {
      if (!c.active) continue;
      c.life += dt;
      c.vel.y -= 9.8 * dt;
      c.mesh.position.addScaledVector(c.vel, dt);
      c.mesh.rotation.x += c.spin.x * dt; c.mesh.rotation.y += c.spin.y * dt; c.mesh.rotation.z += c.spin.z * dt;
      const ground = colWorld ? colWorld.groundHeight(c.mesh.position.x, c.mesh.position.z, 0.05, c.mesh.position.y + 0.05) : 0;
      if (c.mesh.position.y < ground + 0.01) {
        c.mesh.position.y = ground + 0.01;
        if (!c.bounced) { this.onCasingLand?.(c.mesh.position); c.bounced = true; }
        c.vel.multiplyScalar(0.3); c.vel.y = Math.abs(c.vel.y) * 0.3;
        c.spin.multiplyScalar(0.5);
      }
      if (c.life > 6) { c.active = false; c.mesh.visible = false; }
    }

    if (camPos) this.updateRain(dt, camPos, camVel);
  }

  reset() {
    for (const s of [this.smoke, this.dust, this.fire, this.sparks, this.flashes, this.blood]) s.clear();
    for (const d of this.decals) this.scene.remove(d);
    this.decals.length = 0;
    for (const t of this.tracers) { t.active = false; t.mesh.visible = false; }
    for (const c of this.casings) { c.active = false; c.mesh.visible = false; }
    for (const e of [...this.emitters]) if (e.type !== 'column' && !e.permanent) this.removeEmitter(e);
    for (const l of this.lights) l.intensity = 0;
  }
}
