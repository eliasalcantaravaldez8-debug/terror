// Viewport 3D do editor: câmera orbital, seleção por clique, gizmos de mover/girar/escalar
// e reconstrução incremental da cena quando o documento muda. NÃO executa scripts do usuário.
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { World } from '../engine/world.js';
import { createRenderer } from '../engine/renderer.js';

const DEG = 180 / Math.PI;
const round = (n) => Math.round(n * 1000) / 1000;

export class EditorViewport {
  constructor(container, doc, { onSelect, onTransform, assetUrl }) {
    this.container = container;
    this.onSelect = onSelect;
    this.onTransform = onTransform;
    this.assetUrl = assetUrl;
    this.doc = doc;
    this.renderer = createRenderer(container, { rendering: { ...doc.settings.rendering, quality: this.editorQuality(doc) } });
    this.camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 8000);
    this.camera.position.set(28, 22, 34);
    this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbit.enableDamping = true;
    this.orbit.target.set(0, 1, 0);
    this.gizmo = new TransformControls(this.camera, this.renderer.domElement);
    this.gizmo.addEventListener('dragging-changed', (e) => {
      this.orbit.enabled = !e.value;
      if (!e.value && this.selected) this.emitTransform();
    });
    this.grid = new THREE.GridHelper(400, 200, 0x6d28d9, 0x1e1b4b);
    this.grid.material.transparent = true; this.grid.material.opacity = 0.35;
    this.signatures = new Map();
    this.down = null;
    this.renderer.domElement.addEventListener('pointerdown', (e) => { this.down = [e.clientX, e.clientY]; });
    this.renderer.domElement.addEventListener('pointerup', (e) => {
      if (!this.down || Math.hypot(e.clientX - this.down[0], e.clientY - this.down[1]) > 4 || this.gizmo.dragging) return;
      this.pick(e);
    });
    this.resize = () => {
      const w = container.clientWidth; const h = container.clientHeight;
      if (!w || !h) return;
      this.camera.aspect = w / h; this.camera.updateProjectionMatrix(); this.renderer.setSize(w, h);
    };
    this.ro = new ResizeObserver(this.resize); this.ro.observe(container);
    this.clock = new THREE.Clock();
    this.rebuild(doc).then(() => this.loop());
  }

  editorQuality(doc) {
    // O editor usa no máximo "high" para manter a edição fluida; a pré-visualização usa a qualidade real.
    const q = doc.settings.rendering?.quality || 'high';
    return q === 'ultra' ? 'high' : q;
  }

  async rebuild(doc) {
    this.doc = doc;
    this.gizmo.detach();
    this.world?.dispose();
    this.world = new World(this.renderer, { ...doc, settings: { ...doc.settings, rendering: { ...doc.settings.rendering, quality: this.editorQuality(doc) } } }, { assetUrl: this.assetUrl });
    await this.world.build();
    this.world.scene.add(this.grid, this.gizmo.getHelper());
    this.signatures = new Map(doc.entities.map((e) => [e.id, JSON.stringify(e)]));
    this.envSig = JSON.stringify([doc.settings, doc.materials, doc.assets]);
    if (this.selectedId) this.select(this.selectedId, false);
  }

  /** Aplica mudanças do documento de forma incremental quando possível. */
  async setDoc(doc) {
    const envSig = JSON.stringify([doc.settings, doc.materials, doc.assets]);
    const terrainChanged = doc.entities.filter((e) => e.type === 'terrain').some((e) => this.signatures.get(e.id) !== JSON.stringify(e))
      || [...this.signatures.keys()].some((id) => !doc.entities.find((e) => e.id === id) && this.world.entities.get(id)?.e.type === 'terrain');
    if (envSig !== this.envSig || terrainChanged || !this.world) return this.rebuild(doc);
    this.doc = doc;
    this.world.doc = doc;
    const ids = new Set(doc.entities.map((e) => e.id));
    for (const id of [...this.signatures.keys()]) if (!ids.has(id)) { this.world.removeEntity(id); this.signatures.delete(id); }
    for (const e of doc.entities) {
      const sig = JSON.stringify(e);
      if (this.signatures.get(e.id) === sig) continue;
      this.world.removeEntity(e.id);
      if (e.type === 'model' || ((e.type === 'character' || e.type === 'npc') && e.props?.model)) await this.world.addModel(e); else this.world.addEntity(e);
      this.signatures.set(e.id, sig);
    }
    if (this.selectedId) this.select(this.selectedId, false);
  }

  pick(ev) {
    const r = this.renderer.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
    const rc = new THREE.Raycaster(); rc.setFromCamera(ndc, this.camera);
    const hits = rc.intersectObjects(this.world.scene.children, true).filter((h) => h.object.userData.entityId && h.object.visible && !h.object.isPoints && !h.object.isLine);
    // Prefere objetos que não sejam terreno/vegetação ao clicar.
    const typeOf = (h) => this.world.entities.get(h.object.userData.entityId)?.e.type;
    const best = hits.find((h) => !['terrain', 'vegetation'].includes(typeOf(h))) || hits[0];
    this.select(best?.object.userData.entityId || null);
  }

  select(id, notify = true) {
    this.selectedId = id;
    const rec = id && this.world.entities.get(id);
    this.selected = rec || null;
    if (rec && rec.e.type !== 'vegetation' && rec.e.type !== 'terrain') this.gizmo.attach(rec.object); else this.gizmo.detach();
    if (notify) this.onSelect?.(id);
  }

  setMode(mode) { this.gizmo.setMode(mode); }

  focus(id) {
    const rec = this.world.entities.get(id);
    if (!rec) return;
    const box = new THREE.Box3().setFromObject(rec.object);
    const c = box.getCenter(new THREE.Vector3());
    const size = Math.min(Math.max(box.getSize(new THREE.Vector3()).length(), 4), 300);
    this.orbit.target.copy(c);
    this.camera.position.copy(c).add(new THREE.Vector3(size * 0.8, size * 0.6, size * 0.8));
  }

  emitTransform() {
    const o = this.selected.object;
    this.onTransform?.(this.selectedId, {
      position: [round(o.position.x), round(o.position.y), round(o.position.z)],
      rotation: [round(o.rotation.x * DEG), round(o.rotation.y * DEG), round(o.rotation.z * DEG)],
      scale: [round(o.scale.x), round(o.scale.y), round(o.scale.z)],
    });
  }

  /** Ponto no chão sob o centro da tela (para posicionar novos objetos). */
  dropPoint() {
    const t = this.orbit.target;
    return [round(t.x), round(this.world.groundAt(t.x, t.z)), round(t.z)];
  }

  snapshot(width = 480) {
    this.renderer.render(this.world.scene, this.camera);
    const src = this.renderer.domElement;
    const c = document.createElement('canvas');
    c.width = width; c.height = Math.round((src.height / src.width) * width);
    c.getContext('2d').drawImage(src, 0, 0, c.width, c.height);
    return c.toDataURL('image/jpeg', 0.7);
  }

  loop() {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(() => this.loop());
    const dt = Math.min(this.clock.getDelta(), 0.05);
    this.orbit.update();
    for (const rec of this.world.entities.values()) rec.animator?.update(dt, rec.object);
    this.world.update(dt, this.camera);
    this.renderer.render(this.world.scene, this.camera);
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.ro.disconnect();
    this.gizmo.dispose(); this.orbit.dispose();
    this.world?.dispose();
    this.renderer.dispose(); this.renderer.domElement.remove();
  }
}
