import * as THREE from 'three';
import { WEAPONS } from '../weapons/WeaponData.js';
import { makeWeaponModel } from '../weapons/WeaponModels.js';
import { mergeStatic } from '../render/mergeUtil.js';

const _p = new THREE.Vector3(), _d = new THREE.Vector3();

/**
 * Weapons lying in the world (dropped by killed soldiers or placed by the level).
 * The player can swap their primary weapon for one, or take its ammo when it is the same model.
 */
export class Pickups {
  constructor(game) {
    this.game = game;
    this.items = [];
  }

  /** opts: { weaponId, mesh?, position?, mag?, reserve?, placed? } */
  add(o) {
    const def = WEAPONS[o.weaponId];
    if (!def) return null;
    let mesh = o.mesh;
    if (!mesh) {
      mesh = mergeStatic(makeWeaponModel(o.weaponId, this.game.mats, 'low'), { deep: true });
      mesh.position.copy(o.position);
      mesh.rotation.set(0, o.yaw ?? Math.random() * 6.28, Math.PI / 2);
      this.game.scene.add(mesh);
    }
    const it = {
      weaponId: o.weaponId, def, mesh, ownsMesh: !o.mesh,
      mag: o.mag ?? def.magSize, reserve: o.reserve ?? def.magSize * 2,
    };
    this.items.push(it);
    return it;
  }

  remove(it) {
    const i = this.items.indexOf(it);
    if (i >= 0) this.items.splice(i, 1);
    this.game.scene.remove(it.mesh);
  }

  clear() {
    for (const it of this.items) if (it.ownsMesh) this.game.scene.remove(it.mesh);
    this.items.length = 0;
  }

  /** Nearest pickup the player is looking at, within reach. */
  nearest(eye, forward, feet) {
    let best = null, bestD = Infinity;
    for (const it of this.items) {
      it.mesh.getWorldPosition(_p);
      const d = Math.hypot(_p.x - feet.x, _p.z - feet.z);
      if (d > 1.9 || Math.abs(_p.y - feet.y) > 2) continue;
      _d.subVectors(_p, eye).normalize();
      if (_d.dot(forward) < 0.55 && d > 0.9) continue;
      if (d < bestD) { bestD = d; best = it; }
    }
    return best;
  }

  promptFor(it) {
    const w = this.game.weapons;
    if (it.weaponId === w.slots[0].def.id || it.weaponId === w.slots[1].def.id) return `Pegar munição de ${it.def.name}`;
    if (it.def.slot === 'secondary') return `Pegar munição de ${it.def.name}`;
    return `Pegar ${it.def.name} (trocar ${w.slots[0].def.name})`;
  }

  take(it) {
    const g = this.game, w = g.weapons;
    const same = w.slots.find((s) => s.def.id === it.weaponId);
    if (same || it.def.slot === 'secondary') {
      const target = same || w.slots[1];
      const room = target.def.reserveMax - target.reserve;
      const amount = Math.min(room, it.mag + it.reserve);
      target.reserve += amount;
      g.audio.playFoley('ammo');
      g.hud.toast(amount > 0 ? `+${amount} munição ${target.def.name}` : 'Munição cheia');
      if (amount > 0) this.remove(it);
      return;
    }
    const old = w.swapPrimary(it.weaponId, it.mag, it.reserve);
    this.remove(it);
    const p = g.player;
    const pos = new THREE.Vector3(p.pos.x - Math.sin(p.yaw) * 0.8, p.pos.y + 0.05, p.pos.z - Math.cos(p.yaw) * 0.8);
    this.add({ weaponId: old.def.id, position: pos, mag: old.mag, reserve: old.reserve });
    g.audio.playFoley('draw');
    g.hud.toast(`${it.def.name} equipada`);
  }
}
