// Armas: pistola e escopeta. Mira (botão direito / V), tiro (botão esquerdo), recarga (R), troca (1/2/3).
// Quem é atingido cai (sem sangue). Disparos em público geram procurado (fora das missões).
import * as THREE from 'three';

export const WEAPONS = {
  mao: { name: 'Mãos' },
  pistola: { name: 'Pistola', dmg: 45, rate: 0.3, mag: 12, range: 70, spread: 0.012, pellets: 1, price: 800, ammoPrice: 60, ammoPack: 24, sound: 'shot', force: 3.2, reload: 1.1 },
  escopeta: { name: 'Escopeta', dmg: 20, rate: 0.95, mag: 6, range: 26, spread: 0.07, pellets: 7, price: 1500, ammoPrice: 80, ammoPack: 12, sound: 'shotgun', force: 5.5, reload: 1.6 },
  metralhadora: { name: 'Metralhadora', dmg: 22, rate: 0.075, mag: 32, range: 55, spread: 0.032, pellets: 1, price: 2200, ammoPrice: 90, ammoPack: 64, sound: 'smg', force: 1.8, reload: 1.4, auto: true },
  ak47: { name: 'AK-47', dmg: 38, rate: 0.11, mag: 30, range: 95, spread: 0.02, pellets: 1, price: 3500, ammoPrice: 120, ammoPack: 60, sound: 'rifle', force: 3.6, reload: 1.8, auto: true, rifle: true },
};
export const WEAPON_ORDER = ['mao', 'pistola', 'metralhadora', 'escopeta', 'ak47'];
export function defaultInventory(char) {
  const inv = { weapon: 'mao' };
  for (const id of WEAPON_ORDER.slice(1)) inv[id] = { owned: false, clip: 0, ammo: 0 };
  if (char === 'ryan') inv.pistola = { owned: true, clip: 12, ammo: 36 };
  return inv;
}
// ícone (silhueta lateral) para o menu de armas
const ICON = {};
export function weaponIcon(id) {
  if (ICON[id]) return ICON[id];
  const c = document.createElement('canvas'); c.width = 160; c.height = 80; const g = c.getContext('2d');
  const metal = g.createLinearGradient(0, 20, 0, 60); metal.addColorStop(0, '#9aa0aa'); metal.addColorStop(0.45, '#4a4e56'); metal.addColorStop(1, '#22252a');
  const woodG = g.createLinearGradient(0, 30, 0, 70); woodG.addColorStop(0, '#b8763a'); woodG.addColorStop(1, '#6a3a1a');
  g.fillStyle = id === 'mao' ? '#e8c8a0' : metal; g.strokeStyle = '#111'; g.lineJoin = 'round';
  const R = (x, y, w, h) => { g.fillRect(x, y, w, h); g.lineWidth = 1; g.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1); };
  const W = (fn) => { const f = g.fillStyle; g.fillStyle = woodG; fn(); g.fillStyle = f; };
  if (id === 'mao') { g.beginPath(); g.ellipse(80, 44, 22, 18, 0, 0, 7); g.fill(); for (let i = 0; i < 4; i++) { g.beginPath(); g.ellipse(64 + i * 11, 26, 5, 9, 0, 0, 7); g.fill(); } g.beginPath(); g.ellipse(56, 46, 6, 11, -0.6, 0, 7); g.fill(); }
  else if (id === 'pistola') { R(40, 28, 78, 14); R(48, 40, 18, 6); g.save(); g.translate(52, 42); g.rotate(0.22); g.fillStyle = '#2a2a2c'; R(0, 0, 18, 30); g.restore(); R(74, 42, 10, 3); g.fillStyle = 'rgba(255,255,255,0.35)'; g.fillRect(44, 30, 70, 2); }
  else if (id === 'escopeta') { R(14, 30, 112, 7); R(40, 37, 70, 7); W(() => { g.save(); g.translate(108, 34); g.rotate(0.15); R(0, 0, 40, 14); g.restore(); R(52, 37, 34, 9); }); }
  else if (id === 'metralhadora') { R(38, 28, 70, 18); R(108, 32, 26, 6); R(18, 30, 22, 5); R(62, 46, 12, 26); g.save(); g.translate(86, 46); g.rotate(0.2); R(0, 0, 12, 18); g.restore(); }
  else if (id === 'ak47') { R(40, 30, 64, 14); R(8, 32, 34, 5); R(10, 28, 4, 6); g.save(); g.translate(68, 44); g.rotate(0.35); R(0, 0, 12, 28); g.restore(); g.save(); g.translate(86, 44); g.rotate(0.25); R(0, 0, 10, 18); g.restore(); W(() => { g.beginPath(); g.moveTo(104, 32); g.lineTo(150, 36); g.lineTo(150, 54); g.lineTo(104, 44); g.closePath(); g.fill(); g.stroke(); R(20, 37, 22, 7); }); }
  ICON[id] = c.toDataURL(); return ICON[id];
}

const tracerMat = new THREE.LineBasicMaterial({ color: 0xffe0a0, transparent: true, opacity: 0.9 });
const flashMat = new THREE.SpriteMaterial({ color: 0xffd080, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
const puffMat = new THREE.SpriteMaterial({ color: 0xcfc8bb, transparent: true, opacity: 0.7, depthWrite: false });

export class Weapons {
  constructor(G) {
    this.G = G; this.cd = 0; this.reloadT = 0; this.fx = []; this.bloom = 0;
    // modelos das armas (ficam na mão direita)
    // materiais com textura: aço escovado (com brilho) e madeira
    const metalTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d'); g.fillStyle = '#3a3c40'; g.fillRect(0, 0, 128, 128);
      for (let i = 0; i < 900; i++) { const v = 40 + Math.random() * 40; g.fillStyle = `rgba(${v},${v + 2},${v + 6},0.35)`; g.fillRect(Math.random() * 128, Math.random() * 128, 1 + Math.random() * 10, 1); }
      for (let i = 0; i < 14; i++) { g.strokeStyle = 'rgba(160,165,175,0.25)'; g.beginPath(); const x = Math.random() * 128, y = Math.random() * 128; g.moveTo(x, y); g.lineTo(x + Math.random() * 30, y + Math.random() * 4); g.stroke(); }
      const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; return t; })();
    const woodTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d'); const gr = g.createLinearGradient(0, 0, 0, 128); gr.addColorStop(0, '#7a4a26'); gr.addColorStop(0.5, '#93592e'); gr.addColorStop(1, '#6a3c1e'); g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
      for (let i = 0; i < 40; i++) { g.strokeStyle = `rgba(50,25,10,${0.15 + Math.random() * 0.25})`; g.lineWidth = 1 + Math.random() * 2; g.beginPath(); const y = Math.random() * 128; g.moveTo(0, y); g.bezierCurveTo(40, y + Math.random() * 8 - 4, 90, y + Math.random() * 8 - 4, 128, y); g.stroke(); }
      const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; })();
    const dark = new THREE.MeshPhongMaterial({ color: 0x8a8e96, map: metalTex, specular: 0x777777, shininess: 70 });
    const wood = new THREE.MeshPhongMaterial({ color: 0xffffff, map: woodTex, specular: 0x332211, shininess: 25 });
    const metal = new THREE.MeshPhongMaterial({ color: 0xb0b4bc, map: metalTex, specular: 0x999999, shininess: 90 });
    const black = new THREE.MeshPhongMaterial({ color: 0x2a2a2c, specular: 0x333333, shininess: 30 });
    const box = (g, m, w, h, d, x, y, z, rx = 0) => { const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); o.position.set(x, y, z); o.rotation.x = rx; g.add(o); return o; };
    this.models = {
      pistola: (() => { const g = new THREE.Group(); box(g, metal, 0.034, 0.035, 0.19, 0, -0.05, 0.07); box(g, dark, 0.03, 0.025, 0.17, 0, -0.08, 0.065); box(g, black, 0.03, 0.1, 0.045, 0, -0.11, 0, 0.25); box(g, dark, 0.01, 0.012, 0.01, 0, -0.028, 0.15); box(g, dark, 0.005, 0.03, 0.035, 0, -0.1, 0.05); return g; })(),
      escopeta: (() => { const g = new THREE.Group(); box(g, metal, 0.03, 0.03, 0.75, 0, -0.045, 0.22); box(g, dark, 0.026, 0.026, 0.6, 0, -0.075, 0.2); box(g, wood, 0.05, 0.05, 0.22, 0, -0.08, 0.3); box(g, dark, 0.05, 0.07, 0.2, 0, -0.07, 0.02); box(g, wood, 0.05, 0.1, 0.32, 0, -0.1, -0.22, -0.1); return g; })(),
      metralhadora: (() => { const g = new THREE.Group(); box(g, dark, 0.045, 0.08, 0.3, 0, -0.06, 0.08); box(g, metal, 0.02, 0.02, 0.12, 0, -0.045, 0.28); box(g, dark, 0.03, 0.2, 0.04, 0, -0.17, 0.09, 0.08); box(g, dark, 0.03, 0.1, 0.04, 0, -0.12, -0.02, 0.3); box(g, metal, 0.015, 0.015, 0.16, 0, -0.03, -0.12); return g; })(),
      ak47: (() => { const g = new THREE.Group(); box(g, metal, 0.05, 0.07, 0.36, 0, -0.06, 0.12); box(g, dark, 0.022, 0.022, 0.32, 0, -0.045, 0.45); box(g, wood, 0.05, 0.05, 0.2, 0, -0.07, 0.36);
        box(g, dark, 0.035, 0.18, 0.06, 0, -0.16, 0.16, 0.4); box(g, wood, 0.035, 0.1, 0.045, 0, -0.12, -0.01, 0.3); box(g, wood, 0.045, 0.09, 0.3, 0, -0.08, -0.18, -0.12); box(g, dark, 0.01, 0.04, 0.01, 0, -0.01, 0.58); return g; })(),
    };
  }
  get inv() {
    const C = this.G.campaign(); if (!C.inv) C.inv = defaultInventory(C.char);
    const inv = C.inv; for (const id of WEAPON_ORDER.slice(1)) if (!inv[id]) inv[id] = { owned: false, clip: 0, ammo: 0 }; // saves antigos
    if (this.G.freeWeapons) for (const id of WEAPON_ORDER.slice(1)) { const s = inv[id], W = WEAPONS[id]; if (!s.owned) { s.owned = true; s.clip = W.mag; } if (s.ammo < W.mag * 3) s.ammo = W.mag * 3; }
    return inv;
  }
  get current() { return this.inv.weapon || 'mao'; }
  attach() {
    const hand = this.G.player.model.bones.handR;
    for (const [k, m] of Object.entries(this.models)) { if (m.parent) m.parent.remove(m); m.visible = k === this.current; hand.add(m); }
  }
  equip(id) {
    const inv = this.inv;
    if (id !== 'mao' && !inv[id].owned) { this.G.toast(`Você não tem ${WEAPONS[id].name} — compre na Ferragens Ramírez (ou ligue \"Todas as armas liberadas\" no menu Esc)`, 3); return false; }
    inv.weapon = id; this.attach(); this.reloadT = 0;
    this.G.toast(id === 'mao' ? 'Mãos' : `${WEAPONS[id].name} — botão direito mira, esquerdo atira, R recarrega`, 2.2);
    return true;
  }
  reload() {
    const id = this.current; if (id === 'mao') return; const s = this.inv[id], W = WEAPONS[id];
    if (s.clip >= W.mag || s.ammo <= 0 || this.reloadT > 0) return;
    this.reloadT = W.reload || 1.1; this.G.sound('reload');
  }
  update(dt, input) {
    const G = this.G, P = G.player; this.cd -= dt;
    if (this.reloadT > 0) {
      this.reloadT -= dt;
      if (this.reloadT <= 0) { const id = this.current, s = this.inv[id], W = WEAPONS[id]; const n = Math.min(W.mag - s.clip, s.ammo); s.clip += n; s.ammo -= n; }
    }
    const armed = this.current !== 'mao' && P.mode === 'foot';
    const aim = armed && input.aim;
    const m = this.models[this.current];
    if (m) { this.aimK = (this.aimK || 0) + ((aim || (armed && input.fire) ? 1 : 0) - (this.aimK || 0)) * Math.min(1, dt * 14); m.rotation.x = this.aimK * Math.PI / 2; m.position.set(0, -0.02 * this.aimK, 0.03 * this.aimK); }
    G.cam.aim = aim; P.aiming = aim;
    if (armed && (aim || input.fire)) {
      // vira o personagem para onde a câmera aponta
      const want = G.cam.yaw + Math.PI; let d = want - P.heading; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2;
      P.heading += d * Math.min(1, dt * 18); P.sync();
    }
    this.bloom = Math.max(0, (this.bloom || 0) - dt * (input.fire ? 1.2 : 2.8));
    if (armed && input.fire && this.cd <= 0 && this.reloadT <= 0) this.fire();
    { const ch = document.querySelector('.crosshair'); if (ch) { const sz = 18 + this.bloom * 22 + Math.min(1, (P.speed || 0) / 3) * 12; ch.style.width = ch.style.height = (aim ? sz : 4) + 'px'; ch.style.margin = (aim ? -sz / 2 : -2) + 'px'; } }
    for (const f of this.fx) { f.t -= dt; f.obj.material.opacity = Math.max(0, f.t / f.life) * (f.op || 1); if (f.t <= 0) { G.scene.remove(f.obj); f.dead = true; } }
    this.fx = this.fx.filter((f) => !f.dead);
  }
  // marcador de acerto no centro da mira (vermelho = abate ou tiro na cabeça)
  hitMark(kill) {
    let el = document.getElementById('hitmark');
    if (!el) { el = document.createElement('div'); el.id = 'hitmark'; el.textContent = '✕'; Object.assign(el.style, { position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%,-52%)', font: '700 26px sans-serif', pointerEvents: 'none', zIndex: 30, transition: 'opacity .18s' }); document.body.appendChild(el); }
    el.style.color = kill ? '#ff3a3a' : '#ffffff'; el.style.opacity = 1; clearTimeout(this._hm); this._hm = setTimeout(() => { el.style.opacity = 0; }, 140);
  }
  muzzle() { const v = new THREE.Vector3(); this.models[this.current].getWorldPosition(v); return v; }
  fire() {
    const G = this.G, P = G.player, id = this.current, W = WEAPONS[id], s = this.inv[id];
    if (s.clip <= 0) { if (s.ammo > 0) this.reload(); else { G.toast('Sem munição', 1.2); G.sound('click'); this.cd = 0.4; } return; }
    s.clip--; this.cd = W.rate; P.model.punchT = 0; G.sound(W.sound); if (G.noteShot) G.noteShot(P.x, P.z); G.shake(id === 'escopeta' ? 0.12 : W.auto ? 0.03 : 0.05);
    if (W.auto) { G.cam.pitch = Math.max(-0.6, G.cam.pitch - (W.rifle ? 0.012 : 0.007)); G.cam.yaw += (Math.random() - 0.5) * 0.008; } // recuo
    // dispersão: abre ao andar e ao atirar sem parar; fecha parado e agachado
    const moving = Math.min(1, (P.speed || 0) / 3);
    const spread = W.spread * (P.aiming ? 0.6 : 1.3) * (1 + this.bloom * 1.4 + moving * 0.9) * (P.crouch ? 0.7 : 1);
    this.bloom = Math.min(1, this.bloom + (W.auto ? 0.1 : 0.22) * (W.pellets > 1 ? 0.5 : 1));
    const cam = G.camera; const dir = new THREE.Vector3(); cam.getWorldDirection(dir);
    const from = this.muzzle(); this.flash(from);
    let anyHit = null;
    for (let k = 0; k < W.pellets; k++) {
      const d = dir.clone().add(new THREE.Vector3((Math.random() - 0.5) * spread * 2, (Math.random() - 0.5) * spread * 2, (Math.random() - 0.5) * spread * 2)).normalize();
      const hit = this.trace(cam.position, d, W.range, (n) => n !== P);
      this.tracer(from, hit.point);
      if (hit.npc) { const head = hit.point.y > hit.npc.y + 1.5; this.damageNPC(hit.npc, W.dmg * (head ? 2 : 1), d, hit.point, W.force || 2); anyHit = hit.npc; this.hitMark(head || !hit.npc.alive); if (k === 0) G.sound('impact'); }
      else if (hit.car) { if (G.damageCar) G.damageCar(hit.car, W.dmg / 700); else hit.car.health = Math.max(0, hit.car.health - W.dmg / 1500); if (G.police.some((u) => u.car === hit.car)) G.crime(2, 'viatura'); this.puff(hit.point); }
      else if (hit.dist < W.range) { this.puff(hit.point); if (k === 0 && Math.random() < 0.35) G.sound('ricochet'); if (G.fx && Math.random() < 0.5) for (let i = 0; i < 3; i++) G.fx.spark(hit.point.x, hit.point.y, hit.point.z); }
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
  damageNPC(n, dmg, dir = null, at = null, force = 2) {
    const G = this.G;
    if (n.team === 'ally' || (n.role === 'story' && n.team !== 'enemy')) return; // aliados e personagens da história não são atingidos
    n.hp -= dmg;
    // ragdoll: o corpo é empurrado na direção do tiro, a partir do ponto atingido
    const imp = dir ? { x: dir.x * force, y: 0.3 + Math.max(0, dir.y) * force, z: dir.z * force } : null;
    if (n.gang) { if (n.hp <= 0) n.knockDown(0, imp, at); G.provokeGang && G.provokeGang(n); G.crime(1, 'tiroteio', n); return; }
    if (n.team === 'enemy') {
      if (n.hp <= 0) n.knockDown(0, imp, at);
      else { if (n.behavior === 'guard') { n.behavior = 'hostile'; G.story.addAlert(40); } if (n.hitReact) n.hitReact(dir); }
      // os comparsas por perto ouvem e reagem
      for (const o of G.npcs) if (o !== n && o.team === 'enemy' && o.alive && (o.behavior === 'stand' || o.behavior === 'patrol') && Math.hypot(o.x - n.x, o.z - n.z) < 22) { o.behavior = 'hostile'; o.suppressedT = 2; }
      return;
    }
    // civis e polícia caem (sem sangue); conta como crime
    n.knockDown(0, imp, at); n.collidable = false;
    G.crime(n.role === 'police' ? 2 : 1, 'baleado', n);
  }
  // inimigo atira no alvo
  npcShoot(n, tgt) {
    const G = this.G; const from = new THREE.Vector3(n.x, n.y + 1.45, n.z);
    const to = new THREE.Vector3(tgt.x, (tgt.y || 0) + 1.2, tgt.z);
    const d = to.clone().sub(from); const L = d.length(); d.normalize();
    G.world.rayIgnore = null;
    if (G.world.raycast(from.x, from.y, from.z, d.x, d.y, d.z, L) < L - 0.5) return false; // parede no caminho
    G.sound('shot'); if (G.noteShot) G.noteShot(n.x, n.z);
    const P = G.player; let chance = 0.5 - L * 0.012 - (n.suppressedT > 0 ? 0.12 : 0) - (n.inCover ? 0.05 : 0);
    if (tgt === P) { if (P.crouch) chance -= 0.15; if (P.speed > 4) chance -= 0.12; else if (P.speed > 1.5) chance -= 0.05; if (G.car) chance -= 0.2; }
    const hit = Math.random() < Math.max(0.08, chance);
    const end = hit ? to : to.clone().add(new THREE.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5), (Math.random() - 0.5) * 2));
    this.flash(from); this.tracer(from, end);
    if (!hit && tgt === P && Math.random() < 0.6) G.sound('whiz'); // bala passando perto
    if (hit) {
      if (tgt === P && G.car && G.damageCar) { G.damageCar(G.car, 0.035); if (Math.random() < 0.45) G.damagePlayer((n.gunDmg || 6) * 0.6, n); } // dentro do carro: a lataria segura parte dos tiros
      else if (tgt === P) G.damagePlayer(n.gunDmg || 6, n);
      else if (tgt.team === 'ally') tgt.hp = Math.max(30, tgt.hp - 4);
      else if (tgt.alive) { tgt.hp -= (n.gunDmg || 6) * 3; if (tgt.hp <= 0) tgt.knockDown(0, { x: d.x * 3, y: 0.5, z: d.z * 3 }, to); } // NPC contra NPC (gangues)
    }
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
