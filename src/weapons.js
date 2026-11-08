// Armas: pistola e escopeta. Mira (botão direito / V), tiro (botão esquerdo), recarga (R), troca (1/2/3).
// Quem é atingido cai (sem sangue). Disparos em público geram procurado (fora das missões).
import * as THREE from 'three';

export const WEAPONS = {
  mao: { name: 'Mãos' },
  pistola: { name: 'Pistola', dmg: 45, rate: 0.3, mag: 12, range: 70, spread: 0.012, pellets: 1, price: 800, ammoPrice: 60, ammoPack: 24, sound: 'shot' },
  escopeta: { name: 'Escopeta', dmg: 20, rate: 0.95, mag: 6, range: 26, spread: 0.07, pellets: 7, price: 1500, ammoPrice: 80, ammoPack: 12, sound: 'shotgun' },
};
export function defaultInventory(char) {
  return char === 'ryan'
    ? { weapon: 'mao', pistola: { owned: true, clip: 12, ammo: 36 }, escopeta: { owned: false, clip: 0, ammo: 0 } }
    : { weapon: 'mao', pistola: { owned: false, clip: 0, ammo: 0 }, escopeta: { owned: false, clip: 0, ammo: 0 } };
}

const tracerMat = new THREE.LineBasicMaterial({ color: 0xffe0a0, transparent: true, opacity: 0.9 });
const flashMat = new THREE.SpriteMaterial({ color: 0xffd080, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
const puffMat = new THREE.SpriteMaterial({ color: 0xcfc8bb, transparent: true, opacity: 0.7, depthWrite: false });

export class Weapons {
  constructor(G) {
    this.G = G; this.cd = 0; this.reloadT = 0; this.fx = [];
    // modelos das armas (ficam na mão direita)
    const dark = new THREE.MeshLambertMaterial({ color: 0x1c1c1e }), wood = new THREE.MeshLambertMaterial({ color: 0x5a3a22 });
    this.models = {
      pistola: (() => { const g = new THREE.Group(); const a = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.05, 0.19), dark); a.position.set(0, -0.06, 0.07); const b = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.1, 0.045), dark); b.position.set(0, -0.1, 0.0); b.rotation.x = 0.25; g.add(a, b); return g; })(),
      escopeta: (() => { const g = new THREE.Group(); const a = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.06, 0.75), dark); a.position.set(0, -0.06, 0.2); const b = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.1, 0.32), wood); b.position.set(0, -0.09, -0.2); g.add(a, b); return g; })(),
    };
  }
  get inv() { const C = this.G.campaign(); if (!C.inv) C.inv = defaultInventory(C.char); return C.inv; }
  get current() { return this.inv.weapon || 'mao'; }
  attach() {
    const hand = this.G.player.model.bones.handR;
    for (const [k, m] of Object.entries(this.models)) { if (m.parent) m.parent.remove(m); m.visible = k === this.current; hand.add(m); }
  }
  equip(id) {
    const inv = this.inv;
    if (id !== 'mao' && !inv[id].owned) { this.G.toast(`Você não tem ${WEAPONS[id].name.toLowerCase()} — compre na Ferragens Ramírez`, 2.5); return; }
    inv.weapon = id; this.attach(); this.reloadT = 0;
    this.G.toast(id === 'mao' ? 'Mãos' : `${WEAPONS[id].name} — botão direito mira, esquerdo atira, R recarrega`, 2.2);
  }
  reload() {
    const id = this.current; if (id === 'mao') return; const s = this.inv[id], W = WEAPONS[id];
    if (s.clip >= W.mag || s.ammo <= 0 || this.reloadT > 0) return;
    this.reloadT = id === 'escopeta' ? 1.6 : 1.1; this.G.sound('page');
  }
  update(dt, input) {
    const G = this.G, P = G.player; this.cd -= dt;
    if (this.reloadT > 0) {
      this.reloadT -= dt;
      if (this.reloadT <= 0) { const id = this.current, s = this.inv[id], W = WEAPONS[id]; const n = Math.min(W.mag - s.clip, s.ammo); s.clip += n; s.ammo -= n; }
    }
    const armed = this.current !== 'mao' && P.mode === 'foot';
    const aim = armed && input.aim;
    G.cam.aim = aim; P.aiming = aim;
    if (armed && (aim || input.fire)) {
      // vira o personagem para onde a câmera aponta
      const want = G.cam.yaw + Math.PI; let d = want - P.heading; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2;
      P.heading += d * Math.min(1, dt * 18); P.sync();
    }
    if (armed && input.fire && this.cd <= 0 && this.reloadT <= 0) this.fire();
    for (const f of this.fx) { f.t -= dt; f.obj.material.opacity = Math.max(0, f.t / f.life) * (f.op || 1); if (f.t <= 0) { G.scene.remove(f.obj); f.dead = true; } }
    this.fx = this.fx.filter((f) => !f.dead);
  }
  muzzle() { const v = new THREE.Vector3(); this.models[this.current].getWorldPosition(v); return v; }
  fire() {
    const G = this.G, P = G.player, id = this.current, W = WEAPONS[id], s = this.inv[id];
    if (s.clip <= 0) { if (s.ammo > 0) this.reload(); else { G.toast('Sem munição', 1.2); this.cd = 0.4; } return; }
    s.clip--; this.cd = W.rate; P.model.punchT = 0; G.sound(W.sound); G.shake(id === 'escopeta' ? 0.12 : 0.05);
    const cam = G.camera; const dir = new THREE.Vector3(); cam.getWorldDirection(dir);
    const from = this.muzzle(); this.flash(from);
    let anyHit = null;
    for (let k = 0; k < W.pellets; k++) {
      const d = dir.clone().add(new THREE.Vector3((Math.random() - 0.5) * W.spread * 2, (Math.random() - 0.5) * W.spread * 2, (Math.random() - 0.5) * W.spread * 2)).normalize();
      const hit = this.trace(cam.position, d, W.range, (n) => n !== P);
      this.tracer(from, hit.point);
      if (hit.npc) { this.damageNPC(hit.npc, W.dmg); anyHit = hit.npc; }
      else if (hit.car) { hit.car.health = Math.max(0, hit.car.health - W.dmg / 1500); if (G.police.some((u) => u.car === hit.car)) G.crime(2, 'viatura'); this.puff(hit.point); }
      else if (hit.dist < W.range) this.puff(hit.point);
    }
    // disparo em público: pânico e procurado
    if (!G.mission) {
      for (const n of G.npcs) if (n.role === 'ped' && n.alive && Math.hypot(n.x - P.x, n.z - P.z) < 45) { n.behavior = 'panic'; n.panicFrom = [P.x, P.z]; n.panicT = 8; }
      G.crime(1, 'disparo', anyHit);
    }
  }
  // raio contra cenário, carros e pessoas (cilindros)
  trace(o, d, range, filter) {
    const G = this.G; G.world.rayIgnore = G.car || null;
    let best = G.world.raycast(o.x, o.y, o.z, d.x, d.y, d.z, range); let npc = null, car = null;
    for (const c of G.cars) { const t = c.rayHit ? c.rayHit(o.x, o.y, o.z, d.x, d.y, d.z, best) : Infinity; if (t < best) { best = t; car = c; } }
    if (car) npc = null;
    for (const n of G.npcs) {
      if (n.inCar || n.removed || !n.alive || !filter(n)) continue;
      const t = rayCylinder(o, d, n.x, n.z, 0.38, n.y, n.y + 1.8, best);
      if (t < best) { best = t; npc = n; car = null; }
    }
    return { dist: best, point: new THREE.Vector3(o.x + d.x * best, o.y + d.y * best, o.z + d.z * best), npc, car };
  }
  damageNPC(n, dmg) {
    const G = this.G;
    if (n.team === 'ally' || (n.role === 'story' && n.team !== 'enemy')) return; // aliados e personagens da história não são atingidos
    n.hp -= dmg;
    if (n.team === 'enemy') { if (n.hp <= 0) n.knockDown(0); else if (n.behavior === 'guard') { n.behavior = 'hostile'; G.story.addAlert(40); } return; }
    // civis e polícia caem (sem sangue); conta como crime
    n.knockDown(0); n.collidable = false;
    G.crime(n.role === 'police' ? 2 : 1, 'baleado', n);
  }
  // inimigo atira no alvo
  npcShoot(n, tgt) {
    const G = this.G; const from = new THREE.Vector3(n.x, n.y + 1.45, n.z);
    const to = new THREE.Vector3(tgt.x, (tgt.y || 0) + 1.2, tgt.z);
    const d = to.clone().sub(from); const L = d.length(); d.normalize();
    G.world.rayIgnore = null;
    if (G.world.raycast(from.x, from.y, from.z, d.x, d.y, d.z, L) < L - 0.5) return false; // parede no caminho
    G.sound('shot');
    const P = G.player; let chance = 0.5 - L * 0.012;
    if (tgt === P) { if (P.crouch) chance -= 0.15; if (P.speed > 4) chance -= 0.12; if (G.car) chance -= 0.2; }
    const hit = Math.random() < Math.max(0.08, chance);
    const end = hit ? to : to.clone().add(new THREE.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5), (Math.random() - 0.5) * 2));
    this.flash(from); this.tracer(from, end);
    if (hit) { if (tgt === P) G.damagePlayer(n.gunDmg || 6); else if (tgt.team === 'ally') tgt.hp = Math.max(30, tgt.hp - 4); }
    return true;
  }
  tracer(a, b) {
    const g = new THREE.BufferGeometry().setFromPoints([a, b]);
    const l = new THREE.Line(g, tracerMat.clone()); this.G.scene.add(l); this.fx.push({ obj: l, t: 0.07, life: 0.07 });
  }
  flash(p) { const s = new THREE.Sprite(flashMat.clone()); s.position.copy(p); s.scale.setScalar(0.45); this.G.scene.add(s); this.fx.push({ obj: s, t: 0.06, life: 0.06 }); }
  puff(p) { const s = new THREE.Sprite(puffMat.clone()); s.position.copy(p); s.scale.setScalar(0.35); this.G.scene.add(s); this.fx.push({ obj: s, t: 0.35, life: 0.35, op: 0.7 }); }
  hud() {
    const id = this.current; if (id === 'mao') return '';
    const s = this.inv[id]; return `${WEAPONS[id].name} ${s.clip}/${s.ammo}${this.reloadT > 0 ? ' · recarregando' : ''}`;
  }
}
function rayCylinder(o, d, cx, cz, r, y0, y1, maxT) {
  const ox = o.x - cx, oz = o.z - cz;
  const a = d.x * d.x + d.z * d.z; if (a < 1e-8) return Infinity;
  const b = 2 * (ox * d.x + oz * d.z), c = ox * ox + oz * oz - r * r;
  const disc = b * b - 4 * a * c; if (disc < 0) return Infinity;
  const sq = Math.sqrt(disc);
  for (const t of [(-b - sq) / (2 * a), (-b + sq) / (2 * a)]) {
    if (t < 0 || t > maxT) continue;
    const y = o.y + d.y * t; if (y >= y0 && y <= y1) return t;
  }
  return Infinity;
}
