// Controle do Ethan: aceleração/desaceleração, caminhada, corrida, pulo, rotação suave e colisões.
import { Humanoid } from './humanoid.js';

const damp = (a, b, k, dt) => a + (b - a) * (1 - Math.exp(-k * dt));
function angDamp(a, b, k, dt) {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return a + d * (1 - Math.exp(-k * dt));
}

export const PLAYER = {
  walkSpeed: 1.75, runSpeed: 6.2, accel: 9, runAccel: 7, decel: 11, airControl: 0.25,
  jumpVel: 5.0, gravity: 18, radius: 0.33, height: 1.8, turnSpeed: 10,
};

export class Player {
  constructor(scene, world, look) {
    this.world = world;
    this.model = new Humanoid(look);
    scene.add(this.model.root);
    this.x = 0; this.y = 0; this.z = 0; this.heading = 0;
    this.vx = 0; this.vz = 0; this.vy = 0;
    this.grounded = true; this.speed = 0; this.turn = 0; this.accel = 0;
    this.mode = 'foot'; // 'foot' | 'car'
    this.jumpBuffer = 0; this.coyote = 0;
    this.scene = scene; this.crouch = false; this.hp = 100; this.pose = null;
  }
  setLook(look) {
    const parent = this.model.root.parent;
    if (parent) parent.remove(this.model.root);
    this.model = new Humanoid(look);
    (parent || this.scene).add(this.model.root);
    this.sync();
  }
  place(x, z, heading = 0, y = null) {
    this.x = x; this.z = z; this.heading = heading;
    // procura o chão a partir do nível do terreno (não sobe em telhados ao entrar em construções)
    this.y = this.world.groundAt(x, z, PLAYER.radius, y ?? this.world.groundFn(x, z) + 0.3);
    this.vx = this.vz = this.vy = 0;
    this.sync();
  }
  // input: {x, z (−1..1, relativo à câmera), run, jump}, camYaw
  update(dt, input, camYaw) {
    const P = PLAYER;
    // direção desejada relativa à câmera (sem girar a câmera!)
    const fx = -Math.sin(camYaw), fz = -Math.cos(camYaw);
    const rx = Math.cos(camYaw), rz = -Math.sin(camYaw);
    let mx = fx * input.z + rx * input.x, mz = fz * input.z + rz * input.x;
    const ml = Math.hypot(mx, mz);
    if (ml > 1) { mx /= ml; mz /= ml; }
    const want = ml > 0.05;
    this.crouch = !!input.crouch && this.grounded;
    const top = this.crouch ? 1.3 : input.run ? P.runSpeed : P.walkSpeed;
    const tvx = mx * top, tvz = mz * top;
    const control = this.grounded ? 1 : P.airControl;
    const k = (want ? (input.run ? P.runAccel : P.accel) : P.decel) * control;
    const prevSpeed = Math.hypot(this.vx, this.vz);
    // aceleração em direção à velocidade alvo (curva natural, sem deslizar)
    const dvx = tvx - this.vx, dvz = tvz - this.vz;
    const dl = Math.hypot(dvx, dvz);
    const maxDv = k * dt * Math.max(1.2, dl);
    if (dl > 0) {
      const s = Math.min(1, maxDv / dl);
      this.vx += dvx * s; this.vz += dvz * s;
    }
    if (!want && this.grounded && Math.hypot(this.vx, this.vz) < 0.05) { this.vx = 0; this.vz = 0; }
    // rotação suave para a direção do movimento
    const prevHeading = this.heading;
    const sp = Math.hypot(this.vx, this.vz);
    if (want && sp > 0.15) this.heading = angDamp(this.heading, Math.atan2(mx, mz), P.turnSpeed * (this.grounded ? 1 : 0.3), dt);
    let dh = this.heading - prevHeading;
    while (dh > Math.PI) dh -= Math.PI * 2; while (dh < -Math.PI) dh += Math.PI * 2;
    this.turn = damp(this.turn, dt > 0 ? dh / dt * 0.3 : 0, 8, dt);
    this.accel = damp(this.accel, dt > 0 ? (sp - prevSpeed) / dt : 0, 6, dt);
    // pulo (com pequena tolerância)
    this.jumpBuffer = input.jump ? 0.15 : Math.max(0, this.jumpBuffer - dt);
    this.coyote = this.grounded ? 0.12 : Math.max(0, this.coyote - dt);
    if (this.jumpBuffer > 0 && this.coyote > 0) {
      this.vy = P.jumpVel; this.grounded = false; this.jumpBuffer = 0; this.coyote = 0;
    }
    this.vy -= P.gravity * dt;
    // movimento + colisão
    let nx = this.x + this.vx * dt, nz = this.z + this.vz * dt;
    const res = this.world.resolveCircle(nx, nz, P.radius, this.y, this.y + P.height, 0.4);
    if (res.hit) {
      // remove a componente da velocidade contra a parede (desliza ao longo dela)
      const vn = this.vx * res.nx + this.vz * res.nz;
      if (vn < 0) { this.vx -= vn * res.nx; this.vz -= vn * res.nz; }
    }
    this.x = res.x; this.z = res.z;
    let ny = this.y + this.vy * dt;
    const g = this.world.groundAt(this.x, this.z, P.radius * 0.7, this.y);
    const wasGrounded = this.grounded;
    if (ny <= g) {
      if (!wasGrounded && this.vy < -3) this.model.land((-this.vy - 3) / 6);
      ny = g; this.vy = 0; this.grounded = true;
    } else if (this.grounded && ny - g < 0.45 && this.vy <= 0) {
      // desce degraus/meio-fio sem "voar"
      ny = damp(ny, g, 25, dt); this.vy = 0;
      if (ny - g < 0.02) ny = g;
    } else this.grounded = false;
    this.y = ny;
    this.speed = Math.hypot(this.vx, this.vz);
    this.model.update(dt, { speed: this.speed, grounded: this.grounded, vy: this.vy, mode: this.pose || 'foot', turn: this.turn, accel: this.accel, crouch: this.crouch, phone: this.phone });
    this.sync();
  }
  sync() {
    this.model.root.position.set(this.x, this.y, this.z);
    this.model.root.rotation.set(this.lying || 0, this.heading, 0);
    if (this.lying) this.model.root.position.y += 0.15;
  }
}
