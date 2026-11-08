// Ragdoll: física de corpo mole (Verlet) para NPCs e jogador.
// Cada articulação vira uma partícula; ossos são restrições de distância (o tronco é rígido).
// Colide com o chão, pisos e paredes do mundo. Depois o esqueleto do Humanoid segue as partículas.
import * as THREE from 'three';

const J = ['thighL', 'thighR', 'shoulderL', 'shoulderR', 'neck', 'headTop', 'elbowL', 'elbowR', 'handL', 'handR', 'kneeL', 'kneeR', 'footL', 'footR', 'chest'];
const TORSO = ['thighL', 'thighR', 'shoulderL', 'shoulderR', 'neck', 'chest'];
const LINKS = [['shoulderL', 'elbowL'], ['elbowL', 'handL'], ['shoulderR', 'elbowR'], ['elbowR', 'handR'], ['thighL', 'kneeL'], ['kneeL', 'footL'], ['thighR', 'kneeR'], ['kneeR', 'footR'], ['neck', 'headTop']];
// distâncias mínimas: impedem dobrar braço/perna além do limite e a cabeça de entrar no peito
const MINS = [['shoulderL', 'handL', 0.62], ['shoulderR', 'handR', 0.62], ['thighL', 'footL', 0.66], ['thighR', 'footR', 0.66], ['headTop', 'chest', 0.95], ['headTop', 'thighL', 0.95], ['headTop', 'thighR', 0.95], ['handL', 'thighR', 0.25], ['handR', 'thighL', 0.25], ['footL', 'footR', 0.16], ['kneeL', 'kneeR', 0.14]];
const R = 0.07; // raio das partículas
const _v = new THREE.Vector3(), _a = new THREE.Vector3(), _b = new THREE.Vector3(), _q = new THREE.Quaternion(), _q2 = new THREE.Quaternion(), _m = new THREE.Matrix4();
const UP = new THREE.Vector3(0, 1, 0), DOWN = new THREE.Vector3(0, -1, 0);

export class Ragdoll {
  // impulse: velocidade inicial (m/s) aplicada ao corpo; at: ponto de impacto (opcional, gira o corpo)
  constructor(model, world, impulse = { x: 0, y: 0, z: 0 }, at = null) {
    this.model = model; this.world = world; this.t = 0; this.still = 0; this.asleep = false;
    const B = model.bones; model.root.updateMatrixWorld(true);
    const wp = (b, off) => { const v = new THREE.Vector3(); if (off) v.copy(off).applyMatrix4(b.matrixWorld); else v.setFromMatrixPosition(b.matrixWorld); return v; };
    this.p = {};
    const src = { headTop: [B.head, new THREE.Vector3(0, 0.24, 0)], handL: [B.handL, new THREE.Vector3(0, -0.1, 0)], handR: [B.handR, new THREE.Vector3(0, -0.1, 0)], footL: [B.footL, new THREE.Vector3(0, -0.04, 0.06)], footR: [B.footR, new THREE.Vector3(0, -0.04, 0.06)] };
    for (const k of J) { const s = src[k]; const pos = s ? wp(s[0], s[1]) : wp(B[k]); this.p[k] = { pos, old: pos.clone(), w: k === 'chest' || k === 'neck' ? 1.5 : 1 }; }
    // velocidade inicial: impulso + giro a partir do ponto de impacto (tiro no peito joga o tronco para trás)
    const hipY = (this.p.thighL.pos.y + this.p.thighR.pos.y) / 2;
    for (const k of J) {
      const q = this.p[k]; let s = 1;
      if (at) { const dy = q.pos.y - at.y; s = THREE.MathUtils.clamp(1 + dy * 0.9, 0.35, 1.8); }
      else s = THREE.MathUtils.clamp(0.6 + (q.pos.y - hipY) * 0.8, 0.4, 1.4);
      q.old.x -= impulse.x * s / 60; q.old.y -= (impulse.y || 0) * s / 60; q.old.z -= impulse.z * s / 60;
      q.old.x += (Math.random() - 0.5) * 0.004; q.old.z += (Math.random() - 0.5) * 0.004; // pequena variação
    }
    // restrições: tronco rígido (todas as distâncias entre os pontos do tronco) + membros
    this.c = [];
    for (let i = 0; i < TORSO.length; i++) for (let j = i + 1; j < TORSO.length; j++) this.link(TORSO[i], TORSO[j], 1);
    for (const [a, b] of LINKS) this.link(a, b, 1);
    for (const k of ['shoulderL', 'shoulderR', 'chest']) this.link('headTop', k, 0.6); // pescoço firme, mas não totalmente rígido
    this.mins = MINS.map(([a, b, f]) => [this.p[a], this.p[b], f * this.restLen(a, b)]);
    this.ground = {}; for (const k of J) this.ground[k] = -1e9;
    this.hips = new THREE.Vector3();
  }
  restLen(a, b) { return this.p[a].pos.distanceTo(this.p[b].pos); }
  link(a, b, stiff) { this.c.push([this.p[a], this.p[b], this.restLen(a, b), stiff]); }
  // centro do quadril (usado pela câmera e para levantar no lugar certo)
  center() { return this.hips.copy(this.p.thighL.pos).add(this.p.thighR.pos).multiplyScalar(0.5); }
  update(dt) {
    if (this.asleep) return;
    dt = Math.min(dt, 1 / 30); this.t += dt;
    const g = -9.8 * dt * dt, W = this.world;
    // chão sob cada partícula (terreno + pisos/caixas baixas), calculado uma vez por quadro
    for (const k of J) { const q = this.p[k].pos; this.ground[k] = W.groundAt(q.x, q.z, 0.05, q.y - R, 0.12) + R; }
    let energy = 0;
    for (const k of J) {
      const q = this.p[k]; const p = q.pos, o = q.old;
      const onG = p.y <= this.ground[k] + 0.01;
      const fr = onG ? 0.82 : 0.995; // atrito no chão / resistência do ar
      const vx = (p.x - o.x) * fr, vy = (p.y - o.y) * 0.995, vz = (p.z - o.z) * fr;
      o.copy(p); p.x += vx; p.y += vy + g; p.z += vz;
      energy += vx * vx + vy * vy + vz * vz;
    }
    for (let it = 0; it < 8; it++) {
      for (const [a, b, len, st] of this.c) {
        _v.subVectors(b.pos, a.pos); const d = _v.length() || 1e-6; const diff = ((d - len) / d) * st;
        const wa = a.w / (a.w + b.w), wb = 1 - wa; // partícula mais "pesada" se move menos
        a.pos.addScaledVector(_v, diff * wb); b.pos.addScaledVector(_v, -diff * wa);
      }
      for (const [a, b, mn] of this.mins) {
        _v.subVectors(b.pos, a.pos); const d = _v.length() || 1e-6; if (d >= mn) continue;
        const diff = (d - mn) / d * 0.5; a.pos.addScaledVector(_v, diff); b.pos.addScaledVector(_v, -diff);
      }
      for (const k of J) { // chão e paredes
        const q = this.p[k].pos; const gy = this.ground[k];
        if (q.y < gy) q.y = gy;
        if (it % 2 === 0) { const r = W.resolveCircle(q.x, q.z, R, q.y - R, q.y + R, 0.05, null, true); q.x = r.x; q.z = r.z; }
      }
    }
    // dorme quando quase parado (economiza CPU)
    if (energy < 2e-6 * J.length && this.t > 1.2) { this.still += dt; if (this.still > 0.6) this.asleep = true; } else this.still = 0;
    this.pose();
  }
  // aplica as partículas ao esqueleto
  pose() {
    const m = this.model, B = m.bones, P = this.p, root = m.root;
    const hip = this.center();
    // a raiz acompanha o corpo (para o recorte de visão e sombras)
    root.position.set(hip.x, Math.min(this.ground.thighL, this.ground.thighR) - R, hip.z);
    root.updateMatrixWorld(true);
    // base do tronco: x = lado esquerdo, y = para cima (quadril → pescoço), z = frente
    const x = _a.subVectors(P.thighL.pos, P.thighR.pos).add(_b.subVectors(P.shoulderL.pos, P.shoulderR.pos)).normalize();
    const y = new THREE.Vector3().subVectors(P.neck.pos, hip).normalize();
    x.addScaledVector(y, -x.dot(y)).normalize(); const z = new THREE.Vector3().crossVectors(x, y);
    _m.makeBasis(x, y, z); const worldQ = new THREE.Quaternion().setFromRotationMatrix(_m);
    // osso do quadril: posição e rotação em coordenadas do pai (malha)
    const parent = B.hips.parent; parent.updateMatrixWorld(true);
    const inv = new THREE.Matrix4().copy(parent.matrixWorld).invert();
    const hipWorld = hip.clone().addScaledVector(y, 0.04 * root.scale.y);
    B.hips.position.copy(hipWorld.applyMatrix4(inv));
    parent.getWorldQuaternion(_q); B.hips.quaternion.copy(_q.invert().multiply(worldQ));
    for (const k of ['spine', 'chest', 'neck']) B[k].quaternion.identity();
    for (const b of m.boneList) b.updateMatrix();
    B.hips.updateMatrixWorld(true);
    // membros: cada osso aponta para a próxima articulação
    const aim = (bone, target, rest) => {
      bone.parent.getWorldQuaternion(_q); bone.getWorldPosition(_b);
      _v.subVectors(target, _b).normalize().applyQuaternion(_q.invert());
      bone.quaternion.setFromUnitVectors(rest, _v); bone.updateMatrix(); bone.updateMatrixWorld(true);
    };
    aim(B.head, P.headTop.pos, UP);
    for (const s of ['L', 'R']) {
      aim(B['shoulder' + s], P['elbow' + s].pos, DOWN); aim(B['elbow' + s], P['hand' + s].pos, DOWN); B['hand' + s].quaternion.identity();
      aim(B['thigh' + s], P['knee' + s].pos, DOWN); aim(B['knee' + s], P['foot' + s].pos, DOWN); B['foot' + s].quaternion.identity();
      B['hand' + s].updateMatrix(); B['foot' + s].updateMatrix();
    }
  }
  // empurrão extra (tiros em quem já está caído, batidas de carro)
  push(imp, at = null) {
    this.asleep = false; this.still = 0; this.t = Math.min(this.t, 0.5);
    for (const k of J) { const q = this.p[k]; let s = 1; if (at) s = Math.max(0.2, 1.4 - q.pos.distanceTo(at) * 1.2); q.old.x -= imp.x * s / 60; q.old.y -= (imp.y || 0) * s / 60; q.old.z -= imp.z * s / 60; }
  }
}
// devolve o esqueleto ao controle da animação (Humanoid.update usa rotation; a posição do quadril é restaurada lá)
export function endRagdoll(model) {
  for (const b of Object.values(model.bones)) { b.rotation.set(0, 0, 0); b.updateMatrix(); }
  for (const k of Object.keys(model.cur)) model.cur[k].set(0, 0, 0);
}
