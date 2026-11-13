import * as THREE from 'three';

/**
 * Allied squad coordination: shared anchor (advance positions set by the mission),
 * per-member offsets, combat state and voice "barks".
 */
const BARKS = {
  reload: ['Recarregando!', 'Trocando carregador!', 'Me cobre, recarregando!'],
  contact: ['Contato! Atirando!', 'Hostil à vista!', 'Engajando!', 'Fogo na janela!', 'Mantenham a pressão!'],
  kill: ['Abatido!', 'Hostil neutralizado!', 'Um a menos!', 'Derrubei um!'],
  playerKill: ['Bom tiro, capitão!', 'Belo disparo!', 'Esse não levanta mais.'],
  move: ['Avançando!', 'Movendo!', 'Comigo!'],
};

export class Squad {
  constructor(game) {
    this.game = game;
    this.members = [];
    this.anchor = { x: 0, z: 0, radius: 8, facing: Math.PI };
    this.anchorVersion = 0;
    this.combat = false;
    this.barkCooldown = 0;
  }

  add(soldier) { this.members.push(soldier); }
  clear() { this.members.length = 0; }
  get alive() { return this.members.filter((m) => m.alive); }
  byId(id) { return this.members.find((m) => m.id === id); }

  setAnchor(x, z, { radius = 8, facing = Math.PI, combat = this.combat } = {}) {
    this.anchor = { x, z, radius, facing };
    this.combat = combat;
    this.anchorVersion++;
  }
  setCombat(c) { if (this.combat !== c) { this.combat = c; this.anchorVersion++; } }

  anchorFor(s) {
    const i = this.members.indexOf(s);
    const a = this.anchor;
    // spread members laterally across the facing direction
    const side = ((i % 2) * 2 - 1) * (1 + Math.floor(i / 2) * 2.2);
    const rx = Math.cos(a.facing), rz = -Math.sin(a.facing);
    return { x: a.x + rx * side, z: a.z + rz * side, radius: a.radius, facing: a.facing };
  }

  lookPointFor(s) {
    const a = this.anchor;
    return new THREE.Vector3(s.pos.x + Math.sin(a.facing) * 20, 1.5, s.pos.z + Math.cos(a.facing) * 20);
  }

  bark(s, kind) {
    if (this.barkCooldown > 0 || !s.alive) return;
    const lines = BARKS[kind];
    if (!lines) return;
    this.barkCooldown = 3.5;
    this.game.dialogue.bark(s.name, lines[Math.floor(Math.random() * lines.length)], s);
  }

  update(dt) { this.barkCooldown -= dt; }
}
