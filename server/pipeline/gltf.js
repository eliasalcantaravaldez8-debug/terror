// Processamento de modelos glTF/GLB no servidor (sem dependência do Blender):
// inspeção, reparo, normalização de escala/origem, estilo de sombreamento, texturas, LODs e colisão.
import { NodeIO, Document, getBounds } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { dedup, weld, prune, normals, simplify, textureCompress, unweld, resample, cloneDocument } from '@gltf-transform/functions';
import { MeshoptSimplifier, MeshoptDecoder, MeshoptEncoder } from 'meshoptimizer';
import sharp from 'sharp';

let ioPromise = null;
export async function io() {
  if (!ioPromise) {
    ioPromise = (async () => {
      await Promise.all([MeshoptDecoder.ready, MeshoptEncoder.ready, MeshoptSimplifier.ready]);
      return new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.decoder': MeshoptDecoder, 'meshopt.encoder': MeshoptEncoder });
    })();
  }
  return ioPromise;
}

export async function readGlb(buffer) { return (await io()).readBinary(new Uint8Array(buffer)); }
export async function writeGlb(doc) { return Buffer.from(await (await io()).writeBinary(doc)); }

function triangleCount(prim) {
  const idx = prim.getIndices();
  const pos = prim.getAttribute('POSITION');
  const mode = prim.getMode();
  if (mode !== 4) return 0; // apenas TRIANGLES
  return Math.floor((idx ? idx.getCount() : pos ? pos.getCount() : 0) / 3);
}

/** Estatísticas e problemas encontrados no modelo. */
export async function inspect(doc) {
  const root = doc.getRoot();
  const scene = root.getDefaultScene() || root.listScenes()[0];
  let triangles = 0; let vertices = 0; let primitives = 0; let missingNormals = 0; let missingUV = 0; let nonTriangle = 0; let nan = 0;
  for (const mesh of root.listMeshes()) {
    for (const prim of mesh.listPrimitives()) {
      primitives++;
      triangles += triangleCount(prim);
      const pos = prim.getAttribute('POSITION');
      if (pos) {
        vertices += pos.getCount();
        const arr = pos.getArray();
        for (let i = 0; i < arr.length; i += 97) if (!Number.isFinite(arr[i])) { nan++; break; }
      }
      if (!prim.getAttribute('NORMAL')) missingNormals++;
      if (!prim.getAttribute('TEXCOORD_0') && prim.getMaterial()?.getBaseColorTexture()) missingUV++;
      if (prim.getMode() !== 4) nonTriangle++;
    }
  }
  const textures = await Promise.all(root.listTextures().map(async (t) => {
    const img = t.getImage();
    let size = null;
    if (img) { try { const m = await sharp(Buffer.from(img)).metadata(); size = [m.width, m.height]; } catch { /* formato não suportado pelo sharp */ } }
    return { name: t.getName(), mime: t.getMimeType(), bytes: img?.byteLength || 0, size };
  }));
  const bounds = scene ? getBounds(scene) : { min: [0, 0, 0], max: [0, 0, 0] };
  const dims = [0, 1, 2].map((i) => bounds.max[i] - bounds.min[i]);
  const issues = [];
  if (!primitives) issues.push({ code: 'empty', severity: 'error', message: 'O modelo não contém malhas.' });
  if (nan) issues.push({ code: 'nan', severity: 'error', message: 'Vértices com coordenadas inválidas (NaN).' });
  if (missingNormals) issues.push({ code: 'normals', severity: 'warn', message: `${missingNormals} primitiva(s) sem normais.` });
  if (missingUV) issues.push({ code: 'uv', severity: 'warn', message: `${missingUV} primitiva(s) com textura mas sem UV.` });
  if (nonTriangle) issues.push({ code: 'mode', severity: 'warn', message: `${nonTriangle} primitiva(s) não triangulares (linhas/pontos).` });
  if (Math.max(...dims) > 2000 || Math.max(...dims) < 0.001) issues.push({ code: 'scale', severity: 'warn', message: `Escala fora do comum (${dims.map((d) => d.toFixed(3)).join(' × ')}).` });
  const big = textures.filter((t) => t.size && Math.max(...t.size) > 2048);
  if (big.length) issues.push({ code: 'texture_size', severity: 'info', message: `${big.length} textura(s) acima de 2048 px.` });
  return {
    triangles, vertices, primitives,
    meshes: root.listMeshes().length, materials: root.listMaterials().length, textures,
    textureBytes: textures.reduce((s, t) => s + t.bytes, 0),
    animations: root.listAnimations().map((a) => a.getName() || 'animação'),
    skins: root.listSkins().length,
    bounds: { min: bounds.min, max: bounds.max, size: dims },
    issues,
  };
}

/** Reparo seguro: remove duplicatas, solda vértices, recalcula normais ausentes, limpa sobras. */
export async function repair(doc) {
  await doc.transform(dedup(), weld(), normals({ overwrite: false }), resample(), prune());
  // Remove primitivas vazias/degeneradas.
  for (const mesh of doc.getRoot().listMeshes()) {
    for (const prim of mesh.listPrimitives()) {
      if (!prim.getAttribute('POSITION') || triangleCount(prim) === 0 && prim.getMode() === 4) { mesh.removePrimitive(prim); prim.dispose(); }
    }
  }
  await doc.transform(prune());
  return doc;
}

/** Escala para a altura-alvo e coloca a origem no centro da base (pés no chão). */
export function normalize(doc, { targetHeight = 1, keepScale = false } = {}) {
  const root = doc.getRoot();
  const scene = root.getDefaultScene() || root.listScenes()[0];
  const b = getBounds(scene);
  const height = b.max[1] - b.min[1];
  const largest = Math.max(b.max[0] - b.min[0], height, b.max[2] - b.min[2]);
  const s = keepScale ? 1 : targetHeight / (height > largest * 0.15 ? height : largest || 1);
  const pivot = doc.createNode('nexplay_root');
  for (const child of scene.listChildren()) { scene.removeChild(child); pivot.addChild(child); }
  scene.addChild(pivot);
  pivot.setScale([s, s, s]);
  pivot.setTranslation([-(b.min[0] + b.max[0]) / 2 * s, -b.min[1] * s, -(b.min[2] + b.max[2]) / 2 * s]);
  return { scale: s, originalSize: [b.max[0] - b.min[0], height, b.max[2] - b.min[2]] };
}

/** Sombreamento facetado (low poly / voxel): separa vértices e recalcula normais por face. */
export async function flatShade(doc) {
  await doc.transform(unweld(), normals({ overwrite: true }));
}

/** Reduz texturas ao máximo do estilo (mantém formato). */
export async function limitTextures(doc, maxSize) {
  await doc.transform(textureCompress({ encoder: sharp, resize: [maxSize, maxSize] }));
}

/** Simplifica para atingir um orçamento de triângulos (sem perder a silhueta além do limite de erro). */
export async function fitBudget(doc, budget) {
  const { triangles } = await inspect(doc);
  if (triangles <= budget) return { simplified: false, triangles };
  const ratio = Math.max(0.02, budget / triangles);
  await doc.transform(weld(), simplify({ simplifier: MeshoptSimplifier, ratio, error: 0.02 }), prune());
  return { simplified: true, triangles: (await inspect(doc)).triangles };
}

/** Gera níveis de detalhe. Retorna [{ ratio, buffer, triangles }] (o primeiro é o LOD0 completo). */
export async function buildLods(doc, ratios = [1, 0.5, 0.2]) {
  const out = [];
  for (const ratio of ratios) {
    const copy = ratio === 1 ? doc : cloneDocument(doc);
    if (ratio < 1) await copy.transform(weld(), simplify({ simplifier: MeshoptSimplifier, ratio, error: 0.05, lockBorder: false }), prune());
    out.push({ ratio, buffer: await writeGlb(copy), triangles: (await inspect(copy)).triangles });
  }
  return out;
}

/** Colisão simples a partir dos limites (caixa local, já normalizada). */
export function collisionFromBounds(bounds, kind = 'box') {
  return { type: kind, min: bounds.min.map((v) => Math.round(v * 1000) / 1000), max: bounds.max.map((v) => Math.round(v * 1000) / 1000) };
}

export { Document, getBounds };
