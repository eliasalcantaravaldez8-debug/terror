// Renderizador e pós-processamento (tone mapping ACES, sombras suaves, bloom, GTAO).
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { GTAOPass } from 'three/examples/jsm/postprocessing/GTAOPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';

export function createRenderer(container, settings = {}) {
  const r = settings.rendering || {};
  const quality = r.quality || 'high';
  const renderer = new THREE.WebGLRenderer({ antialias: quality === 'low' ? false : r.antialias !== false, powerPreference: 'high-performance', preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, { low: 0.75, medium: 1, high: 1.5, ultra: 2 }[quality] || 1.5));
  renderer.setSize(container.clientWidth || 800, container.clientHeight || 600);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;
  renderer.shadowMap.enabled = r.shadows?.enabled !== false && quality !== 'low';
  renderer.shadowMap.type = quality === 'ultra' ? THREE.VSMShadowMap : THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  return renderer;
}

export function createComposer(renderer, scene, camera, settings = {}) {
  const r = settings.rendering || {};
  const quality = r.quality || 'high';
  if (quality === 'low') return null;
  const size = renderer.getSize(new THREE.Vector2());
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  if (r.ssao?.enabled && (quality === 'high' || quality === 'ultra')) {
    const gtao = new GTAOPass(scene, camera, size.x, size.y);
    gtao.output = GTAOPass.OUTPUT.Default;
    composer.addPass(gtao);
  }
  if (r.bloom?.enabled !== false) {
    const bloom = new UnrealBloomPass(new THREE.Vector2(size.x, size.y), r.bloom?.strength ?? 0.35, r.bloom?.radius ?? 0.5, r.bloom?.threshold ?? 0.85);
    composer.addPass(bloom);
  }
  composer.addPass(new OutputPass());
  if (quality === 'ultra') composer.addPass(new SMAAPass(size.x * renderer.getPixelRatio(), size.y * renderer.getPixelRatio()));
  return composer;
}
