// Runtime de jogo 3D do NEXPLAY STUDIO (modo jogar). Executado no player isolado.
import * as THREE from 'three';
import { World } from './world.js';
import { createRenderer, createComposer } from './renderer.js';
import { Input, PlayerController, BallPhysics, NPCBrain, Missions, SoccerMatch, RaceSystem, angleDiff } from './gameplay.js';
import { Hud } from './hud.js';
import { AudioSystem } from './audio.js';
import { ScriptHost } from './scripting.js';

const QUALITY_LABEL = { low: 'Baixa', medium: 'Média', high: 'Alta', ultra: 'Ultra' };
function cycleQuality(cur) {
  const order = ['low', 'medium', 'high', 'ultra'];
  const next = order[(order.indexOf(cur) + 1) % order.length];
  try { localStorage.setItem('nx_quality', next); } catch { /* armazenamento indisponível */ }
  location.reload();
}

export class Game {
  constructor(container, doc, { assetUrl, onEvent, onLog } = {}) {
    this.container = container;
    this.doc = doc;
    this.assetUrl = assetUrl;
    this.onEvent = onEvent || (() => {});
    this.onLog = onLog || (() => {});
    this.state = {};
    this.score = 0;
    this.running = false;
    this.paused = true;
    container.style.position = 'relative';
  }

  log(kind, msg) { this.onLog(kind, msg); if (kind === 'error') console.warn('[script]', msg); }

  async init() {
    const doc = this.doc;
    this.renderer = createRenderer(this.container, doc.settings);
    this.camera = new THREE.PerspectiveCamera(doc.player.controller === 'first_person' ? 75 : 60, this.container.clientWidth / this.container.clientHeight, 0.1, 6000);
    this.camera.position.set(0, 6, -12);
    const start = doc.entities.find((x) => x.id === doc.player.entityId)?.transform.position || [0, 0, 0];
    this.world = new World(this.renderer, doc, { assetUrl: this.assetUrl, stream: !this.testMode, streamCenter: new THREE.Vector3(...start) });
    await this.world.build();
    this.world.onThunder = () => setTimeout(() => this.audio.play('thunder'), 300 + Math.random() * 1200);
    this.composer = createComposer(this.renderer, this.world.scene, this.camera, doc.settings);
    this.input = new Input(this.renderer.domElement);
    this.hud = new Hud(this.container, doc.ui, this.input);
    this.audio = new AudioSystem((id) => { const a = (doc.assets || []).find((x) => x.id === id); return a && this.assetUrl?.(a); });
    this.audio.setAmbient(doc.audio?.ambient || (doc.settings.environment.weather?.rain?.enabled ? 'rain' : [...this.world.entities.values()].some((r) => r.e.props?.crowd) ? 'crowd' : null));
    this.player = new PlayerController(this);
    for (const rec of this.world.entities.values()) {
      if (rec.e.type === 'npc' || (rec.e.type === 'vehicle' && rec.e.components?.ai)) rec.npcBrain = new NPCBrain(this, rec);
      if (rec.e.type === 'ball') this.ball = new BallPhysics(this, rec);
      if (rec.attachToCamera) this.camera.add(rec.object);
    }
    this.world.scene.add(this.camera);
    this.missions = new Missions(this);
    if (doc.systems?.match && this.ball) this.match = new SoccerMatch(this, doc.systems.match);
    if (doc.systems?.race && this.world.roads.length) this.race = new RaceSystem(this, doc.systems.race);
    this.scripts = new ScriptHost(this);
    this.scripts.load();
    this.triggersInside = new Set();
    this.resize = () => {
      const w = this.container.clientWidth; const h = this.container.clientHeight;
      this.camera.aspect = w / h; this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h); this.composer?.setSize(w, h);
    };
    window.addEventListener('resize', this.resize);
    this.onKey = (e) => { if (e.code === 'Escape' && this.running && !this.paused) this.pauseMenu(); };
    window.addEventListener('keydown', this.onKey);
    this.renderer.domElement.addEventListener('click', () => { if (!this.paused && this.doc.player.controller !== 'vehicle') this.renderer.domElement.requestPointerLock?.(); });
    this.titleMenu();
    this.running = true;
    this.clock = new THREE.Clock();
    const loop = () => { if (!this.running) return; this.raf = requestAnimationFrame(loop); this.frame(); };
    loop();
  }

  titleMenu() {
    const main = (this.doc.ui.menus || []).find((m) => m.id === 'main');
    const graphics = { label: `Gráficos: ${QUALITY_LABEL[this.doc.settings.rendering.quality] || 'Alta'}`, onClick: () => cycleQuality(this.doc.settings.rendering.quality) };
    const start = () => { this.hud.menu({}); this.paused = false; this.audio.unlock(); if (!this.started) { this.started = true; this.scripts.call('start'); this.emit('start', {}); } };
    this.hud.menu({
      title: this.doc.ui.title || this.doc.meta.name,
      text: this.doc.meta.description || 'WASD para mover · Shift para correr · Espaço para pular · F/clique para ação · E para interagir · Esc para pausar',
      items: [...(main ? main.items.map((it) => ({ label: it.label, onClick: () => this.menuAction(it.action, start) })) : [{ label: 'Jogar', onClick: start }]), graphics],
    });
  }

  menuAction(action, start) {
    if (action === 'start' || action === 'resume') return start ? start() : this.resume();
    if (action?.startsWith('menu:')) return this.showMenu(action.slice(5));
    if (action?.startsWith('event:')) { this.emit(action.slice(6), {}); return start?.(); }
    if (action === 'restart') return location.reload();
  }

  showMenu(id) {
    const m = (this.doc.ui.menus || []).find((x) => x.id === id);
    if (!m) return;
    this.paused = true;
    this.hud.menu({ title: m.title, items: m.items.map((it) => ({ label: it.label, onClick: () => this.menuAction(it.action) })) });
  }

  pauseMenu() {
    this.paused = true;
    this.hud.menu({ title: 'Pausado', items: [{ label: 'Continuar', onClick: () => this.resume() }, { label: `Gráficos: ${QUALITY_LABEL[this.doc.settings.rendering.quality] || 'Alta'}`, onClick: () => cycleQuality(this.doc.settings.rendering.quality) }, { label: 'Reiniciar', onClick: () => location.reload() }] });
  }

  resume() { this.hud.menu({}); this.paused = false; }

  victory() {
    if (this.ended) return; this.ended = true;
    this.emit('victory', { score: this.score });
    setTimeout(() => { this.paused = true; this.hud.menu({ title: 'Vitória!', text: `Pontuação: ${this.score}`, items: [{ label: 'Jogar novamente', onClick: () => location.reload() }, { label: 'Continuar explorando', onClick: () => this.resume() }] }); }, 1500);
  }

  gameOver(text) {
    if (this.ended) return; this.ended = true;
    this.emit('game_over', { score: this.score });
    setTimeout(() => { this.paused = true; this.hud.menu({ title: 'Fim de jogo', text, items: [{ label: 'Tentar novamente', onClick: () => location.reload() }] }); }, 1200);
  }

  emit(name, data) { this.scripts?.dispatch(name, data); this.onEvent(name, data); }

  findEntity(ref) {
    if (!ref) return null;
    return this.world.entities.get(ref) || [...this.world.entities.values()].find((r) => r.e.name === ref) || null;
  }

  spawn(def) {
    const e = { id: def.id || `sp_${Math.random().toString(36).slice(2, 9)}`, name: def.name || def.type, type: def.type, parent: null, visible: true, tags: def.tags || [],
      transform: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1], ...(def.transform || {}) }, props: def.props || {}, components: def.components || {} };
    const rec = this.world.addEntity(e);
    if (e.type === 'npc') rec.npcBrain = new NPCBrain(this, rec);
    return rec;
  }

  destroyEntity(id) {
    const rec = this.world.entities.get(id);
    if (!rec) return;
    rec.object.parent?.remove(rec.object);
    this.world.entities.delete(id);
    this.world.colliders = this.world.colliders.filter((c) => c.entityId !== id);
  }

  raycast(origin, dir, max) {
    const rc = new THREE.Raycaster(new THREE.Vector3(origin.x, origin.y, origin.z), new THREE.Vector3(dir.x, dir.y, dir.z).normalize(), 0, max);
    const hits = rc.intersectObjects(this.world.scene.children, true).filter((h) => h.object.visible && !h.object.isPoints && !h.object.isLine && h.object.type !== 'Sky');
    const h = hits[0];
    return h ? { hit: true, point: h.point, entity: h.object.userData.entityId ? this.findEntity(h.object.userData.entityId) && { id: h.object.userData.entityId } : null } : { hit: false };
  }

  playerAction(kind) {
    const p = this.player.object; if (!p) return;
    const fwd = new THREE.Vector3(Math.sin(p.rotation.y), 0, Math.cos(p.rotation.y));
    if (this.ball && p.position.distanceTo(this.ball.rec.object.position) < 1.6) {
      const camDir = new THREE.Vector3(); this.camera.getWorldDirection(camDir); camDir.y = 0;
      const aim = camDir.lengthSq() > 0.01 ? camDir.normalize() : fwd;
      this.ball.kick(aim, kind === 'shoot' ? 24 : 12, kind === 'shoot' ? 0.28 : 0.06);
      this.emit('kick', { kind });
      return;
    }
    for (const rec of this.world.entities.values()) {
      if (!rec.npcBrain || rec.npcBrain.dead) continue;
      const to = rec.object.position.clone().sub(p.position); const d = to.length();
      if (d < 2.2 && Math.abs(angleDiff(p.rotation.y, Math.atan2(to.x, to.z))) < 1) { rec.npcBrain.hurt(25); this.audio.play('hit'); this.hud.flash('#ffffff'); }
    }
  }

  interact() {
    const p = this.player.object; if (!p) return;
    let best = null; let bd = 3.2;
    for (const rec of this.world.entities.values()) {
      const did = rec.e.components?.ai?.dialogueId || rec.e.props?.dialogueId;
      if (!did) continue;
      const d = rec.object.position.distanceTo(p.position);
      if (d < bd) { bd = d; best = { rec, did }; }
    }
    if (best) {
      best.rec.object.rotation.y = Math.atan2(p.position.x - best.rec.object.position.x, p.position.z - best.rec.object.position.z);
      this.startDialogue(best.did);
    }
    this.emit('interact', { target: best?.rec.e.id || null });
  }

  startDialogue(id) {
    const d = (this.doc.dialogues || []).find((x) => x.id === id);
    if (!d) return;
    this.paused = true;
    this.missions.progress(id, 1);
    const show = (lineId) => this.hud.dialog(d, lineId, (choice) => {
      this.emit('dialogue_choice', { dialogue: id, choice: choice.text });
      if (choice.startMission) this.missions.start(choice.startMission);
      if (choice.next) show(choice.next); else { this.hud.dialog(null); this.paused = false; }
    });
    show(d.lines?.[0]?.id);
  }

  frame() {
    const raw = this.clock.getDelta();
    const dt = Math.min(raw, 1 / 20);
    this.fpsSamples = (this.fpsSamples || []);
    this.fpsSamples.push(raw);
    if (this.fpsSamples.length > 120) this.fpsSamples.shift();
    if (this.started && !this.perfWarned && this.fpsSamples.length >= 120) {
      const fps = 120 / this.fpsSamples.reduce((a, b) => a + b, 0);
      if (fps < 28 && this.doc.settings.rendering.quality !== 'low') { this.perfWarned = true; this.hud.toast('Desempenho baixo: reduza a qualidade em Gráficos (Esc).', 5000); }
    }
    if (!this.paused) {
      this.player.update(dt);
      for (const rec of this.world.entities.values()) rec.npcBrain?.update(dt);
      this.ball?.update(dt);
      this.match?.update(dt);
      this.race?.update(dt);
      this.checkPickupsAndTriggers();
      this.scripts.call('update', dt);
      this.hud.setHud({ health: this.player.health, ...(this.match ? {} : { score: this.score }) });
      this.hud.minimap(this.world, this.player.object, [...this.world.entities.values()].filter((r) => r.npcBrain && !r.npcBrain.dead).map((r) => ({ x: r.object.position.x, z: r.object.position.z, color: r.e.components?.ai?.team === 0 ? '#a78bfa' : '#f87171' })).concat(this.ball ? [{ x: this.ball.rec.object.position.x, z: this.ball.rec.object.position.z, color: '#fff', r: 2 }] : []));
    } else if (!this.started && !this.testCamera) {
      // Câmera orbitando a cena na tela de título.
      const t = this.world.time * 0.05; const c = this.player.object?.position || new THREE.Vector3();
      this.camera.position.set(c.x + Math.sin(t) * 22, c.y + 9, c.z + Math.cos(t) * 22); this.camera.lookAt(c.x, c.y + 1, c.z);
    }
    for (const rec of this.world.entities.values()) rec.animator?.update(this.paused && this.started ? 0 : dt, rec.object);
    this.world.update(this.paused && this.started ? 0 : dt, this.camera);
    if (this.composer) this.composer.render(); else this.renderer.render(this.world.scene, this.camera);
    this.input.endFrame();
  }

  /** Teste automático de um asset dentro do motor real (usado pela NEXPLAY FORGE). */
  async runTest(entityId) {
    this.hud.menu({});
    this.started = true; this.paused = true;
    const rec = this.world.entities.get(entityId);
    if (!rec) return { loaded: false, error: 'Entidade não encontrada no projeto.' };
    if (rec.deferred) { const d = rec.deferred; rec.deferred = null; await d.load(); }
    const real = () => { let ok = false; rec.object.traverse((o) => { if (o.isMesh && !o.userData.placeholder) ok = true; }); return ok; };
    for (let i = 0; i < 100 && !real() && !rec.loadError; i++) await new Promise((r) => setTimeout(r, 200));
    if (!real()) return { loaded: false, error: rec.loadError || 'Modelo não carregou.' };
    const box = new THREE.Box3();
    rec.object.traverse((o) => { if (o.isMesh && !o.userData.placeholder) box.expandByObject(o); });
    const c = box.getCenter(new THREE.Vector3()); const size = box.getSize(new THREE.Vector3());
    const ground = this.world.groundAt(c.x, c.z, box.min.y + 0.5);
    const dist = Math.max(size.length() * 1.6, 3);
    this.camera.position.set(c.x + dist * 0.7, c.y + dist * 0.45, c.z + dist * 0.7);
    this.camera.lookAt(c);
    this.testCamera = true;
    const t0 = performance.now(); let frames = 0;
    await new Promise((resolve) => { const tick = () => { frames++; if (performance.now() - t0 < 2500) requestAnimationFrame(tick); else resolve(); }; requestAnimationFrame(tick); });
    const fps = (frames * 1000) / (performance.now() - t0);
    // Mede a cena em uma renderização direta (o pós-processamento distorceria a contagem).
    this.renderer.info.autoReset = false;
    this.renderer.info.reset();
    this.renderer.render(this.world.scene, this.camera);
    const info = { ...this.renderer.info.render };
    this.renderer.info.autoReset = true;
    return { loaded: true, triangles: info.triangles, drawCalls: info.calls, fps: Math.round(fps * 10) / 10, groundOffset: Math.round((box.min.y - ground) * 1000) / 1000, size: [size.x, size.y, size.z].map((v) => Math.round(v * 100) / 100) };
  }

  checkPickupsAndTriggers() {
    const p = this.player.object; if (!p) return;
    for (const rec of this.world.entities.values()) {
      if (rec.e.type === 'pickup' && rec.object.visible && rec.object.position.distanceTo(p.position) < 1.3) {
        rec.object.visible = false;
        this.score += Number(rec.e.props.value) || 1;
        this.audio.play('pickup');
        this.hud.toast(`+ ${rec.e.name}`, 1200);
        this.missions.progress(rec.e.props.item, Number(rec.e.props.value) || 1);
        this.emit('pickup', { item: rec.e.props.item, id: rec.e.id });
      }
      if (rec.e.type === 'trigger') {
        const s = rec.e.props.size || [2, 2, 2]; const o = rec.object.position;
        const inside = Math.abs(p.position.x - o.x) < s[0] / 2 && Math.abs(p.position.z - o.z) < s[2] / 2 && p.position.y < o.y + s[1] / 2 && p.position.y + 1.8 > o.y - s[1] / 2;
        if (inside && !this.triggersInside.has(rec.e.id)) {
          this.triggersInside.add(rec.e.id);
          const ev = rec.e.props.event || rec.e.name;
          this.missions.progress(ev, 1);
          this.scripts.call('onTrigger', ev, { id: rec.e.id, name: rec.e.name });
          this.emit('trigger', { event: ev });
        } else if (!inside) this.triggersInside.delete(rec.e.id);
      }
    }
  }

  dispose() {
    this.running = false;
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('keydown', this.onKey);
    this.input?.dispose(); this.hud?.dispose(); this.audio?.dispose(); this.world?.dispose();
    this.renderer?.dispose(); this.renderer?.domElement.remove();
  }
}
