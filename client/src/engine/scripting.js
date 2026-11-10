// Execução de scripts do usuário (modo avançado). Roda SOMENTE dentro do player isolado
// (origem sandbox, iframe com sandbox). A API exposta é a documentada em server/ai/specialists.js.
import * as THREE from 'three';

const FORBIDDEN = /\b(fetch|XMLHttpRequest|WebSocket|eval|importScripts|document\.cookie|localStorage|sessionStorage|indexedDB|window\.open)\b|\bimport\s*\(|\bFunction\s*\(|\btop\.|\bparent\./;

export function makeHandle(game, rec) {
  if (!rec) return null;
  const o = rec.object;
  return {
    id: rec.e.id, name: rec.e.name, type: rec.e.type, object3d: o, position: o.position, rotation: o.rotation, props: rec.e.props,
    get visible() { return o.visible; }, set visible(v) { o.visible = v; },
    get health() { return rec.npcBrain?.health ?? (rec === game.player?.rec ? game.player.health : undefined); },
    set health(v) { if (rec.npcBrain) rec.npcBrain.health = v; else if (rec === game.player?.rec) { if (game.inGrace && v < game.player.health) return; game.player.health = v; if (v <= 0) game.player.damage(1); } },
    playAnimation: (clip, opts = {}) => { rec.animator?.play(clip, opts); if (rec.mixer && rec.clips) { const c = rec.clips.find((x) => x.name === clip); if (c) { rec.action?.fadeOut(0.2); rec.action = rec.mixer.clipAction(c).reset().fadeIn(0.2).play(); } } },
    distanceTo: (h) => o.position.distanceTo(h.position || h),
    lookAt: (v) => { o.rotation.y = Math.atan2(v.x - o.position.x, v.z - o.position.z); },
    moveTowards: (v, speed, dt) => { const d = new THREE.Vector3(v.x - o.position.x, 0, v.z - o.position.z); const len = d.length(); if (len > 0.01) o.position.addScaledVector(d.normalize(), Math.min(len, speed * dt)); return len; },
    damage: (n) => { if (rec.npcBrain) rec.npcBrain.hurt(n); else if (rec === game.player?.rec) game.player.damage(n); },
    destroy: () => game.destroyEntity(rec.e.id),
  };
}

export class ScriptHost {
  constructor(game) {
    this.g = game;
    this.instances = [];
    this.listeners = new Map();
  }

  api(self) {
    const g = this.g;
    return Object.freeze({
      THREE, scene: g.world.scene, camera: g.camera, project: g.doc,
      self: self ? makeHandle(g, self) : null,
      entity: (ref) => makeHandle(g, g.findEntity(ref)),
      entities: (filter) => [...g.world.entities.values()].filter((r) => !filter || r.e.type === filter || r.e.tags?.includes(filter)).map((r) => makeHandle(g, r)),
      get player() { return g.player?.rec ? makeHandle(g, g.player.rec) : null; },
      input: { isDown: (c) => g.input.isDown(c), pressed: (c) => g.input.pressed(c), axis: () => g.input.axis() },
      spawn: (def) => makeHandle(g, g.spawn(def)),
      ui: { toast: (t, ms) => g.hud.toast(String(t), ms), setHud: (o) => g.hud.setHud(o), dialog: (id) => g.startDialogue(id), showMenu: (id) => g.showMenu(id) },
      missions: { start: (id) => g.missions.start(id), progress: (t, n) => g.missions.progress(t, n), active: () => g.missions.active() },
      state: g.state,
      score: { add: (n) => { g.score += Number(n) || 0; }, get: () => g.score },
      audio: { play: (n, o) => g.audio.play(n, o) },
      physics: { raycast: (origin, dir, max = 100) => g.raycast(origin, dir, max) },
      emit: (name, data) => g.emit(name, data),
      on: (name, fn) => { if (!this.listeners.has(name)) this.listeners.set(name, []); this.listeners.get(name).push(fn); },
      time: { get elapsed() { return g.world.time; } },
      random: (seed) => { if (seed === undefined) return Math.random(); const x = Math.sin(seed) * 10000; return x - Math.floor(x); },
      log: (...a) => g.log('script', a.map((x) => (typeof x === 'object' ? JSON.stringify(x) : String(x))).join(' ')),
    });
  }

  load() {
    for (const [name, s] of Object.entries(this.g.doc.scripts || {})) {
      if (FORBIDDEN.test(s.source)) { this.g.log('error', `Script "${name}" bloqueado: usa APIs proibidas.`); continue; }
      try {
        const self = s.attachedTo ? this.g.world.entities.get(s.attachedTo) : null;
        // eslint-disable-next-line no-new-func
        const factory = new Function('api', `"use strict";\n${s.source}`);
        const hooks = factory(this.api(self)) || {};
        this.instances.push({ name, hooks });
      } catch (e) {
        this.g.log('error', `Erro ao carregar "${name}": ${e.message}`);
      }
    }
  }

  call(hook, ...args) {
    for (const inst of this.instances) {
      const fn = inst.hooks[hook];
      if (typeof fn !== 'function' || inst.failed) continue;
      try { fn.apply(inst.hooks, args); } catch (e) {
        inst.errors = (inst.errors || 0) + 1;
        this.g.log('error', `Erro em "${inst.name}".${hook}: ${e.message}`);
        if (inst.errors > 20) { inst.failed = true; this.g.log('error', `"${inst.name}" desativado após erros repetidos.`); }
      }
    }
  }

  dispatch(name, data) {
    this.call('onEvent', name, data);
    for (const fn of this.listeners.get(name) || []) { try { fn(data); } catch (e) { this.g.log('error', e.message); } }
  }
}
