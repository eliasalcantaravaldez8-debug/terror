import * as THREE from 'three';
import { clamp } from '../utils/math.js';

const _v = new THREE.Vector3();

/** DOM-based HUD: ammo, health, objective + marker, compass, crosshair, hitmarkers, damage, subtitles, prompts. */
export class HUD {
  constructor(game) {
    this.game = game;
    const root = document.getElementById('hud');
    this.root = root;
    root.innerHTML = `
      <div id="vignette-damage"></div>
      <div id="dmg-indicators"></div>
      <div id="compass"><div id="compass-strip"></div><div id="compass-needle"></div></div>
      <div id="objective"><div class="obj-label">OBJETIVO</div><div id="obj-text"></div></div>
      <div id="obj-marker"><div class="diamond"></div><div id="obj-dist"></div></div>
      <div id="crosshair"><i class="t"></i><i class="b"></i><i class="l"></i><i class="r"></i><b></b></div>
      <div id="hitmarker"><i></i><i></i><i></i><i></i></div>
      <div id="prompt"></div>
      <div id="subtitles"><span class="speaker"></span><span class="line"></span></div>
      <div id="ammo">
        <div id="weapon-name"></div>
        <div class="ammo-row"><span id="ammo-mag">30</span><span class="sep">/</span><span id="ammo-res">120</span></div>
        <div id="grenades"></div>
        <div id="reload-hint">[R] RECARREGAR</div>
      </div>
      <div id="health"><div id="health-fill"></div></div>
      <div id="toast"></div>
      <div id="titlecard"></div>
      <div id="nametags"></div>
      <div id="fps"></div>
      <div id="killfeed"></div>
    `;
    this.el = (id) => root.querySelector('#' + id);
    this.cross = this.el('crosshair');
    this.hit = this.el('hitmarker');
    this.dmgInd = this.el('dmg-indicators');
    this.vignette = this.el('vignette-damage');
    this.subs = this.el('subtitles');
    this.prompt = this.el('prompt');
    this.objText = this.el('obj-text');
    this.objMarker = this.el('obj-marker');
    this.objDist = this.el('obj-dist');
    this.toastEl = this.el('toast');
    this.title = this.el('titlecard');
    this.nameTags = this.el('nametags');
    this.fpsEl = this.el('fps');
    this.killfeed = this.el('killfeed');
    this.compassStrip = this.el('compass-strip');
    this._buildCompass();
    this.hitT = 0;
    this.indicators = [];
    this.tags = new Map();
    this.objective = null; // {text, target: Vector3|null}
    this.visible = false;
    this.combatHud = false;
    this.fpsAcc = 0; this.fpsFrames = 0;

    const ev = game.events;
    ev.on('hitmarker', (e) => { this.hitT = 1; this.hit.classList.toggle('kill', !!e.kill); if (e.kill) this.feed(e.head ? 'ABATIDO · TIRO NA CABEÇA' : 'ABATIDO'); });
    ev.on('playerDamaged', (e) => this.addIndicator(e.angle));
    ev.on('subtitle', (s) => this.setSubtitle(s));
  }

  _buildCompass() {
    const dirs = ['N', 'NE', 'L', 'SE', 'S', 'SO', 'O', 'NO'];
    let html = '';
    for (let rep = 0; rep < 3; rep++) {
      for (let i = 0; i < 8; i++) {
        html += `<span class="cd ${i % 2 ? 'minor' : ''}" style="left:${(rep * 8 + i) * 60}px">${dirs[i]}</span>`;
        html += `<span class="tick" style="left:${(rep * 8 + i) * 60 + 30}px"></span>`;
      }
    }
    this.compassStrip.innerHTML = html;
  }

  show(v) { this.visible = v; this.root.style.display = v ? 'block' : 'none'; }
  setCombatHud(v) { this.combatHud = v; this.root.classList.toggle('combat', v); }

  setObjective(text, target = null) {
    this.objective = text ? { text, target } : null;
    this.objText.textContent = text || '';
    this.el('objective').classList.toggle('visible', !!text);
    if (text) { this.el('objective').classList.remove('flash'); void this.el('objective').offsetWidth; this.el('objective').classList.add('flash'); }
  }

  toast(text, ms = 2600) {
    this.toastEl.textContent = text;
    this.toastEl.classList.add('visible');
    clearTimeout(this._toastT);
    this._toastT = setTimeout(() => this.toastEl.classList.remove('visible'), ms);
  }

  feed(text) {
    const d = document.createElement('div');
    d.textContent = text;
    this.killfeed.appendChild(d);
    setTimeout(() => d.remove(), 2200);
    while (this.killfeed.children.length > 4) this.killfeed.firstChild.remove();
  }

  titleCard(lines, ms = 6500) {
    this.title.innerHTML = lines.map((l, i) => `<div class="tl tl${i}">${l}</div>`).join('');
    this.title.classList.add('visible');
    clearTimeout(this._titleT);
    this._titleT = setTimeout(() => this.title.classList.remove('visible'), ms);
  }

  setSubtitle(s) {
    if (!s || !this.game.settings.get('subtitles')) { this.subs.classList.remove('visible'); return; }
    this.subs.querySelector('.speaker').textContent = s.speaker + (s.radio ? ' [RÁDIO]' : '') + ':';
    this.subs.querySelector('.line').textContent = ' ' + s.text;
    this.subs.classList.toggle('radio', !!s.radio);
    this.subs.classList.add('visible');
  }

  setPrompt(text) {
    if (text) { this.prompt.innerHTML = `<span class="key">E</span> ${text}`; this.prompt.classList.add('visible'); }
    else this.prompt.classList.remove('visible');
  }

  addIndicator(worldAngle) {
    const d = document.createElement('div');
    d.className = 'dmg-ind';
    this.dmgInd.appendChild(d);
    this.indicators.push({ el: d, angle: worldAngle, t: 1.6 });
    if (this.indicators.length > 6) { const o = this.indicators.shift(); o.el.remove(); }
  }

  update(dt) {
    if (!this.visible) return;
    const g = this.game, p = g.player, w = g.weapons;
    const cam = g.pipeline.camera;
    // FPS
    this.fpsAcc += dt; this.fpsFrames++;
    if (this.fpsAcc > 0.5) {
      this.fpsEl.textContent = g.settings.get('showFps') ? `${Math.round(this.fpsFrames / this.fpsAcc)} FPS` : '';
      this.fpsAcc = 0; this.fpsFrames = 0;
    }
    // ammo
    const cur = w.current;
    this.el('weapon-name').textContent = cur.def.name;
    this.el('ammo-mag').textContent = cur.mag;
    this.el('ammo-mag').classList.toggle('low', cur.mag <= cur.def.magSize * 0.2);
    this.el('ammo-res').textContent = cur.reserve;
    this.el('grenades').innerHTML = '<span class="gr"></span>'.repeat(w.grenades);
    this.el('reload-hint').classList.toggle('visible', cur.mag <= cur.def.magSize * 0.2 && cur.reloading <= 0 && cur.reserve > 0);
    this.el('ammo').classList.toggle('hidden', w.wantLowered);
    // health
    const hp = p.health / p.maxHealth;
    this.el('health-fill').style.width = `${hp * 100}%`;
    this.el('health').classList.toggle('low', hp < 0.35);
    const dmgAmt = clamp(1 - hp, 0, 1);
    this.vignette.style.opacity = (dmgAmt * dmgAmt * 1.2).toFixed(3);
    // crosshair
    const showCross = !w.wantLowered && w.adsT < 0.6 && !p.sprinting && w.state !== 'reload';
    this.cross.style.opacity = showCross ? (1 - w.adsT) : 0;
    const gap = 6 + w.spreadNow * 7;
    this.cross.style.setProperty('--gap', gap + 'px');
    // hitmarker
    this.hitT = Math.max(0, this.hitT - dt * 4);
    this.hit.style.opacity = this.hitT;
    // compass (yaw 0 = facing -Z = north)
    const f = p.forward;
    const heading = ((Math.atan2(f.x, -f.z) * 180 / Math.PI) % 360 + 360) % 360;
    this.compassStrip.style.transform = `translateX(${-(heading / 45) * 60 - 480 + 150}px)`;
    // damage indicators
    for (let i = this.indicators.length - 1; i >= 0; i--) {
      const ind = this.indicators[i];
      ind.t -= dt;
      if (ind.t <= 0) { ind.el.remove(); this.indicators.splice(i, 1); continue; }
      const camYaw = Math.atan2(f.x, f.z);
      const rel = ind.angle - camYaw; // angle to attacker relative to view
      ind.el.style.transform = `translate(-50%,-50%) rotate(${-rel}rad) translateY(-130px)`;
      ind.el.style.opacity = Math.min(1, ind.t);
    }
    // objective marker
    if (this.objective?.target) {
      const t = this.objective.target;
      _v.copy(t).project(cam);
      const behind = _v.z > 1;
      let x = (_v.x * 0.5 + 0.5) * window.innerWidth, y = (-_v.y * 0.5 + 0.5) * window.innerHeight;
      if (behind) { x = window.innerWidth - x; y = window.innerHeight - 40; }
      x = clamp(x, 40, window.innerWidth - 40); y = clamp(y, 60, window.innerHeight - 60);
      this.objMarker.style.transform = `translate(${x}px, ${y}px)`;
      const dist = p.pos.distanceTo(t);
      this.objDist.textContent = `${Math.round(dist)} m`;
      this.objMarker.style.display = dist > 3 ? 'block' : 'none';
    } else this.objMarker.style.display = 'none';
    // ally name tags
    for (const s of g.squad.members) {
      let tag = this.tags.get(s);
      if (!tag) { tag = document.createElement('div'); tag.className = 'nametag'; tag.textContent = s.name; this.nameTags.appendChild(tag); this.tags.set(s, tag); }
      _v.copy(s.pos); _v.y += 2.05;
      const d = _v.distanceTo(cam.position);
      _v.project(cam);
      const vis = s.alive && _v.z < 1 && d < 40 && d > 2 && !p.mount;
      tag.style.display = vis ? 'block' : 'none';
      if (vis) tag.style.transform = `translate(${(_v.x * 0.5 + 0.5) * window.innerWidth}px, ${(-_v.y * 0.5 + 0.5) * window.innerHeight}px) translate(-50%,-100%)`;
    }
    for (const [s, tag] of this.tags) if (!g.squad.members.includes(s)) { tag.remove(); this.tags.delete(s); }
  }

  reset() {
    for (const i of this.indicators) i.el.remove();
    this.indicators.length = 0;
    this.setSubtitle(null);
    this.setPrompt(null);
  }
}
