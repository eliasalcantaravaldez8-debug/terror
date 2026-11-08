// Câmera em terceira pessoa estável.
// - Rotação SOMENTE pelo mouse a pé (nada de girar sozinha).
// - Acompanhamento suave do alvo, colisão com paredes/objetos, distância ajustável (roda do mouse).
// - No carro: câmera de perseguição; volta para trás do carro depois de alguns segundos sem mexer o mouse (opcional).
import * as THREE from 'three';

const damp = (a, b, k, dt) => a + (b - a) * (1 - Math.exp(-k * dt));
function wrap(a) { while (a > Math.PI) a -= Math.PI * 2; while (a < -Math.PI) a += Math.PI * 2; return a; }

export class ThirdPersonCamera {
  constructor(camera, world, settings) {
    this.cam = camera; this.world = world; this.settings = settings;
    this.yaw = Math.PI; this.pitch = 0.25;
    this.carYawOffset = 0; this.carPitch = 0.22;
    this.target = new THREE.Vector3();
    this.smoothTarget = new THREE.Vector3();
    this.curDist = 4; this.footDist = 4.2; this.carDist = 7.5;
    this.idleMouse = 10; this.mode = 'foot';
    this.fovBase = 68;
    this.initialized = false;
  }
  onMouse(dx, dy) {
    const s = this.settings.sensitivity * 0.0022;
    const inv = this.settings.invertY ? -1 : 1;
    if (this.mode === 'car') {
      this.carYawOffset = wrap(this.carYawOffset - dx * s);
      this.carPitch = THREE.MathUtils.clamp(this.carPitch + dy * s * inv, -0.15, 1.0);
    } else {
      this.yaw = wrap(this.yaw - dx * s);
      this.pitch = THREE.MathUtils.clamp(this.pitch + dy * s * inv, -0.75, 1.25);
    }
    if (Math.abs(dx) + Math.abs(dy) > 0.5) this.idleMouse = 0;
  }
  onWheel(d) {
    if (this.mode === 'car') this.carDist = THREE.MathUtils.clamp(this.carDist + d * 0.006, 4.5, 14);
    else this.footDist = THREE.MathUtils.clamp(this.footDist + d * 0.004, 1.6, 9);
  }
  setMode(mode, carHeading = 0) {
    if (mode === this.mode) return;
    if (mode === 'car') {
      // começa onde a câmera está e gira suavemente para trás do carro
      this.carYawOffset = 0; this.carPitch = 0.22;
      this.smoothCarHeading = this.yaw - Math.PI; this.smoothReverse = 0;
    }
    else { this.yaw = wrap(this.yaw); }
    this.mode = mode;
    this.idleMouse = 0;
  }
  // target: posição de foco (cabeça/teto do carro)
  update(dt, target, car) {
    if (!this.initialized) { this.smoothTarget.copy(target); this.initialized = true; }
    this.idleMouse += dt;
    let yaw, pitch, dist;
    if (this.mode === 'car') {
      // a câmera fica atrás do carro; o mouse aplica um deslocamento que volta ao centro se "auto seguir" estiver ligado
      if (this.settings.autoFollow && this.idleMouse > 1.6 && Math.abs(car.speed) > 1.5) {
        this.carYawOffset = damp(this.carYawOffset, 0, 2.2, dt);
        this.carPitch = damp(this.carPitch, 0.22, 2.2, dt);
      }
      // olhar para trás ao dar ré
      const reverse = car.speed < -2 ? Math.PI : 0;
      this.smoothCarHeading = this.smoothCarHeading === undefined ? car.heading : this.smoothCarHeading + wrap(car.heading - this.smoothCarHeading) * (1 - Math.exp(-6 * dt));
      this.smoothReverse = damp(this.smoothReverse || 0, reverse, 3, dt);
      yaw = this.smoothCarHeading + Math.PI + this.carYawOffset + this.smoothReverse;
      this.yaw = yaw; // mantém coerência ao sair do carro
      pitch = this.carPitch; dist = this.carDist;
      this.smoothTarget.x = damp(this.smoothTarget.x, target.x, 18, dt);
      this.smoothTarget.z = damp(this.smoothTarget.z, target.z, 18, dt);
      this.smoothTarget.y = damp(this.smoothTarget.y, target.y, 8, dt);
      const fov = this.fovBase + Math.min(14, Math.abs(car.speed) * 0.35);
      if (Math.abs(this.cam.fov - fov) > 0.05) { this.cam.fov = damp(this.cam.fov, fov, 3, dt); this.cam.updateProjectionMatrix(); }
    } else {
      yaw = this.yaw; pitch = this.pitch; dist = this.aim ? 1.9 : this.footDist;
      // acompanha em XZ de forma firme e em Y mais suave (amortece pulos e degraus)
      this.smoothTarget.x = damp(this.smoothTarget.x, target.x, 16, dt);
      this.smoothTarget.z = damp(this.smoothTarget.z, target.z, 16, dt);
      this.smoothTarget.y = damp(this.smoothTarget.y, target.y, 9, dt);
      const tf = this.aim ? this.fovBase - 14 : this.fovBase;
      if (Math.abs(this.cam.fov - tf) > 0.05) { this.cam.fov = damp(this.cam.fov, tf, 8, dt); this.cam.updateProjectionMatrix(); }
    }
    const cp = Math.cos(pitch), sp = Math.sin(pitch);
    let dx = Math.sin(yaw) * cp, dy = sp, dz = Math.cos(yaw) * cp;
    // deslocamento lateral leve (ombro) só a pé
    const t = this.smoothTarget;
    this.shoulderS = (this.shoulderS ?? 0.35) + ((this.aim && this.mode === 'foot' ? 0.6 : 0.35) - (this.shoulderS ?? 0.35)) * Math.min(1, 0.15);
    let shoulder = this.mode === 'foot' ? this.shoulderS * Math.min(1, Math.max(this.curDist, 1.9) / 3) : 0;
    if (shoulder > 0) {
      this.world.rayIgnore = null;
      const hs = this.world.raycast(t.x, t.y, t.z, Math.cos(yaw), 0, -Math.sin(yaw), shoulder + 0.25);
      shoulder = Math.max(0, Math.min(shoulder, hs - 0.25));
    }
    const ox = Math.cos(yaw) * shoulder, oz = -Math.sin(yaw) * shoulder;
    const px = t.x + ox, py = t.y, pz = t.z + oz;
    // colisão: raio do alvo até a câmera desejada
    this.world.rayIgnore = car || null;
    const hit = this.world.raycast(px, py, pz, dx, dy, dz, dist + 0.3);
    const allowed = Math.max(0.5, hit - 0.3);
    const want = Math.min(dist, allowed);
    // aproxima instantaneamente quando bate, afasta suavemente
    this.curDist = want < this.curDist ? want : damp(this.curDist, want, 4, dt);
    let cx = px + dx * this.curDist, cy = py + dy * this.curDist, cz = pz + dz * this.curDist;
    const g = this.world.groundFn(cx, cz) + 0.25;
    if (cy < g) cy = g;
    this.cam.position.set(cx, cy, cz);
    this.cam.lookAt(px, py + (this.mode === 'car' ? 0.4 : 0.05), pz);
  }
  // direção "para frente" da câmera no plano (para mover o personagem)
  get moveYaw() { return this.yaw; }
}
