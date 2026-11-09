// Materiais compartilhados (Lambert/Phong: leves e compatíveis com GPUs fracas / WebGL)
import * as THREE from 'three';
import * as TX from './textures.js';
import { productAtlas, shopWindowCanvas, homeAtlas } from './products.js';

export const nightMats = []; // materiais cujo brilho depende da noite: {mat, base, night}
// VARIAÇÃO EM LARGA ESCALA: manchas pela posição no mundo (quebra a repetição da textura) — poucas instruções no shader
const MACRO_GLSL = `
float mvHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float mvNoise(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mvHash(i), mvHash(i + vec2(1.0, 0.0)), f.x), mix(mvHash(i + vec2(0.0, 1.0)), mvHash(i + vec2(1.0, 1.0)), f.x), f.y); }`;
export function macroVariation(mat, kind) {
  // kind: grass (tons amarelados/escuros), asphalt (remendos e desgaste), paving (sujeira leve)
  const prev = mat.onBeforeCompile;
  mat.onBeforeCompile = (sh, r) => {
    if (prev) prev(sh, r);
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec2 vMacroXZ;').replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\n{ vec4 mw = modelMatrix * vec4(transformed, 1.0);\n#ifdef USE_INSTANCING\n mw = modelMatrix * instanceMatrix * vec4(transformed, 1.0);\n#endif\n vMacroXZ = mw.xz; }');
    let f;
    if (kind === 'grass') f = `{ float a = mvNoise(vMacroXZ * 0.035), b = mvNoise(vMacroXZ * 0.13 + 7.3), c = mvNoise(vMacroXZ * 0.6);
      vec3 dry = diffuseColor.rgb * vec3(1.18, 1.08, 0.72); vec3 lush = diffuseColor.rgb * vec3(0.78, 0.92, 0.80);
      diffuseColor.rgb = mix(lush, dry, smoothstep(0.35, 0.8, a) * 0.75); diffuseColor.rgb *= 0.86 + 0.22 * b + 0.06 * (c - 0.5);
      diffuseColor.rgb = mix(vec3(dot(diffuseColor.rgb, vec3(0.3, 0.59, 0.11))), diffuseColor.rgb, 0.82); }`;
    else if (kind === 'asphalt') f = `{ float a = mvNoise(vMacroXZ * 0.05), b = mvNoise(vMacroXZ * 0.21 + 3.1), c = mvNoise(vMacroXZ * 1.7);
      float patchK = smoothstep(0.62, 0.66, b) * 0.10; diffuseColor.rgb *= (0.9 + 0.16 * a) * (1.0 - patchK) * (0.97 + 0.06 * c); }`;
    else f = `{ float a = mvNoise(vMacroXZ * 0.07), b = mvNoise(vMacroXZ * 0.45 + 5.0); diffuseColor.rgb *= 0.9 + 0.12 * a + 0.05 * (b - 0.5); }`;
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec2 vMacroXZ;' + MACRO_GLSL).replace('#include <map_fragment>', '#include <map_fragment>\n' + f);
  };
  mat.customProgramCacheKey = () => 'macro-' + kind + (mat.polygonOffset ? 'po' : '');
  return mat;
}
function lam(opts, ud = {}) { const m = new THREE.MeshLambertMaterial(opts); Object.assign(m.userData, ud); return m; }
function night(mat, base, n) { nightMats.push({ mat, base, night: n }); return mat; }
// "tinta": material compartilhado com cor por vértice (reduz chamadas de desenho)
export const paint = (mat, color) => ({ isPaint: true, mat, color });
// mapa de ambiente (céu) usado para reflexos em janelas, vidros e pintura dos carros
export const envRT = new THREE.WebGLCubeRenderTarget(128, { generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter });
const N2 = (t, s, k) => ({ normalMap: TX.normalOf(t, s, k), normalScale: new THREE.Vector2(1, 1) });

let M = null;
export function mats() {
  if (M) return M;
  M = {};
  // asfalto levemente brilhante (reflete o céu/sol em ângulo rasante)
  const road = (map, k, extra = {}) => new THREE.MeshPhongMaterial({ map, ...N2(map, 2.2, k), shininess: 18, specular: 0x262626, ...extra });
  M.road = road(TX.roadTex(), 'road'); M.road.userData.castShadow = false;
  M.asphalt = road(TX.asphaltTex(), 'asphalt'); M.asphalt.userData.castShadow = false;
  macroVariation(M.road, 'asphalt'); macroVariation(M.asphalt, 'asphalt');
  M.cross = road(TX.crosswalkTex(), 'cross', { polygonOffset: true, polygonOffsetFactor: -2 }); M.cross.userData.castShadow = false;
  M.sidewalk = lam({ map: TX.sidewalkTex(), ...N2(TX.sidewalkTex(), 3, 'sidewalk') }, { castShadow: false });
  M.grass = lam({ map: TX.grassTex(), ...N2(TX.grassTex(), 2.5, 'grass') }, { castShadow: false });
  macroVariation(M.grass, 'grass');
  M.dirt = lam({ map: TX.dirtTex(), ...N2(TX.dirtTex(), 3, 'dirt') }, { castShadow: false });
  M.concrete = lam({ map: TX.concreteTex(), ...N2(TX.concreteTex(), 1.5, 'concrete') });
  M.concreteFlat = lam({ map: TX.concreteTex(), polygonOffset: true, polygonOffsetFactor: -1 }, { castShadow: false });
  macroVariation(M.sidewalk, 'paving'); macroVariation(M.concreteFlat, 'paving'); macroVariation(M.dirt, 'paving');
  M.parking = road(TX.parkingTex(), 'parking', { polygonOffset: true, polygonOffsetFactor: -1 }); M.parking.userData.castShadow = false;
  M.facade = {};
  for (const k of ['brick', 'concrete', 'office', 'plaster', 'apartment']) {
    const t = TX.facadeTex(k);
    // janelas refletem o céu (specularMap controla onde há reflexo)
    M.facade[k] = night(new THREE.MeshPhongMaterial({
      map: t.map, emissiveMap: t.emissive, emissive: 0xffffff, emissiveIntensity: 0, specularMap: t.spec, normalMap: t.normal,
      specular: 0x888888, shininess: 80, envMap: envRT.texture, combine: THREE.MixOperation, reflectivity: k === 'office' ? 0.75 : 0.55,
    }), 0.0, 1.0);
  }
  const sidingMat = lam({ map: TX.sidingTex(), ...N2(TX.sidingTex(), 2, 'siding'), vertexColors: true });
  M.siding = [0xf2efe6, 0xa9c2d4, 0xd8c7a3, 0xa8b89a, 0xc98f7a, 0xe0d6c2].map((c) => paint(sidingMat, c));
  const roofMat = lam({ map: TX.roofTex(), ...N2(TX.roofTex(), 4, 'roof'), vertexColors: true });
  M.roof = [0xffffff, 0x8a9aa8, 0xb08070].map((c) => paint(roofMat, c));
  const flat = lam({ vertexColors: true });
  const woodMat = lam({ map: TX.woodTex(), ...N2(TX.woodTex(), 2, 'wood'), vertexColors: true });
  M.trim = paint(flat, 0xf4f1ea);
  M.darkTrim = paint(flat, 0x3a3a3a);
  M.wood = paint(woodMat, 0xffffff);
  M.woodDark = paint(woodMat, 0x8a6a50);
  M.fence = paint(flat, 0xeeeeee);
  M.fenceWood = paint(woodMat, 0xc8a888);
  M.metal = paint(flat, 0x5c6166);
  M.metalDark = paint(flat, 0x2b2e31);
  M.metalLight = paint(flat, 0xa8adb2);
  M.red = paint(flat, 0xb02a2a);
  M.yellow = paint(flat, 0xd8b02a);
  M.green = paint(flat, 0x2e6b3a);
  M.blue = paint(flat, 0x1d3f8a);
  M.white = paint(flat, 0xf0f0f0);
  M.hedge = paint(flat, 0x35552a);
  M.water = new THREE.MeshPhongMaterial({ color: 0x3a6a8a, shininess: 100, transparent: true, opacity: 0.85, envMap: envRT.texture, combine: THREE.MixOperation, reflectivity: 0.6 });
  M.water.userData.castShadow = false;
  M.winDark = new THREE.MeshPhongMaterial({ color: 0x2a3440, specular: 0x999999, shininess: 90, envMap: envRT.texture, combine: THREE.MixOperation, reflectivity: 0.55 });
  M.ao = new THREE.MeshBasicMaterial({ map: TX.aoTex(), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -3 });
  M.ao.userData.castShadow = false; M.ao.userData.receiveShadow = false;
  M.winLit = night(new THREE.MeshPhongMaterial({ color: 0x3a3a30, emissive: 0xffd9a0, emissiveIntensity: 0, specular: 0x777777, shininess: 80, envMap: envRT.texture, combine: THREE.MixOperation, reflectivity: 0.35 }), 0.0, 1.0);
  M.lamp = night(lam({ color: 0xbbbbaa, emissive: 0xffe2b0, emissiveIntensity: 0.3 }, { castShadow: false }), 0.25, 1.4);
  M.pool = new THREE.MeshBasicMaterial({ map: TX.lightPoolTex(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 });
  M.pool.userData.castShadow = false; M.pool.userData.receiveShadow = false;
  nightMats.push({ mat: M.pool, opacity: true, base: 0, night: 1 });
  const swt = new THREE.CanvasTexture(shopWindowCanvas()); swt.colorSpace = THREE.SRGBColorSpace; swt.anisotropy = 4;
  M.shopWin = night(new THREE.MeshPhongMaterial({ map: swt, emissiveMap: swt, emissive: 0xffffff, emissiveIntensity: 0.08, color: 0xbbbbbb, specular: 0x888888, shininess: 90, envMap: envRT.texture, combine: THREE.MixOperation, reflectivity: 0.3 }), 0.08, 0.85);
  M.interior = lam({ color: 0xe8e0d0, emissive: 0x2a2620 });
  M.ceiling = lam({ color: 0xf2eee6, emissive: 0x9a968e }, { castShadow: false }); // forro (iluminado pelas luminárias)
  M.interiorFloor = new THREE.MeshPhongMaterial({ map: TX.tileFloorTex(), emissive: 0x1a1814, specular: 0x2a2826, shininess: 40 }); M.interiorFloor.userData.castShadow = false;
  M.interiorWood = lam({ map: TX.woodTex(), emissive: 0x1a140e }, { castShadow: false });
  M.ceilingLight = night(lam({ color: 0xffffff, emissive: 0xfff4e0, emissiveIntensity: 0.8 }, { castShadow: false }), 0.8, 1.2);
  M.glass = new THREE.MeshPhongMaterial({ color: 0x9ab8c8, transparent: true, opacity: 0.3, shininess: 120, depthWrite: false, envMap: envRT.texture, combine: THREE.MixOperation, reflectivity: 0.4 });
  M.glass.userData.castShadow = false;
  M.awning = [0xa83232, 0x2f6a3f, 0x2f4f8a, 0xb07a1e, 0x5a2f6a, 0x333333].map((c) => paint(flat, c));
  M.signMats = new Map();
  const corrMat = lam({ map: TX.corrugatedTex(), ...N2(TX.corrugatedTex(), 3, 'corrugated'), vertexColors: true });
  M.corr = (c) => paint(corrMat, c);
  const wallMat = lam({ map: TX.concreteTex(), ...N2(TX.concreteTex(), 1.5, 'concrete'), vertexColors: true });
  M.wall = (c) => paint(wallMat, c);
  M.tile = lam({ map: TX.tileFloorTex(), emissive: 0x141210 }, { castShadow: false });
  M.tl = { NS: [], EW: [] };
  for (const g of ['NS', 'EW']) {
    for (const c of [0xff2a1a, 0xffb21a, 0x2aff6a]) M.tl[g].push(new THREE.MeshBasicMaterial({ color: c }));
  }
  M.tlOff = [0x3a0a08, 0x3a2a08, 0x083a18];
  M.tlBox = paint(flat, 0x23262a);
  M.bark = lam({ map: TX.barkTex(), ...N2(TX.barkTex(), 3, 'bark') });
  M.flag = lam({ color: 0xffffff, side: THREE.DoubleSide });
  M.signAtlas = TX.signAtlas();
  const signPage = (A) => night(lam({ map: A.texture, emissiveMap: A.texture, emissive: 0xffffff, emissiveIntensity: 0.4 }, { castShadow: false }), 0.25, 0.9);
  M.sign = signPage(M.signAtlas);
  // páginas extras do atlas de placas, criadas sob demanda quando a anterior enche
  M.signPages = [{ atlas: M.signAtlas, mat: M.sign }];
  M.newSignPage = () => { const A = TX.signAtlas(M.signPages.length); const pg = { atlas: A, mat: signPage(A) }; M.signPages.push(pg); return pg; };
  M.flat = flat;
  const GA = TX.graffitiAtlas();
  M.graffiti = lam({ map: GA.texture, transparent: true, alphaTest: 0.25, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }, { castShadow: false });
  M.graffitiRegions = GA.regions;
  M.flatIn = lam({ vertexColors: true, emissive: 0x2a2622 }); // tinta das paredes internas e móveis (levemente iluminados)
  M.glowVC = new THREE.MeshBasicMaterial({ vertexColors: true }); M.glowVC.userData.castShadow = false; // vitrais, telas (cor por vértice, sem luz)
  const HA = homeAtlas();
  M.home = night(lam({ map: HA.texture, emissiveMap: HA.texture, emissive: 0xffffff, emissiveIntensity: 0.12 }), 0.12, 0.3);
  M.homeGlow = night(lam({ map: HA.texture, emissiveMap: HA.texture, emissive: 0xffffff, emissiveIntensity: 0.55 }, { castShadow: false }), 0.55, 0.8);
  const PA = productAtlas();
  M.prod = night(lam({ map: PA.texture, emissiveMap: PA.texture, emissive: 0xffffff, emissiveIntensity: 0.14 }), 0.14, 0.3);
  M.prodGlow = night(lam({ map: PA.texture, emissiveMap: PA.texture, emissive: 0xffffff, emissiveIntensity: 0.5 }, { castShadow: false }), 0.5, 0.85);
  return M;
}

// produto/cardápio: região do atlas de produtos (glow = iluminado, como geladeira e cardápio)
export function prodMat(key, glow = false) {
  const m = mats(); const r = productAtlas().regions[key];
  if (!r) console.warn('Produto sem região no atlas: ' + key);
  return { isSign: true, mat: glow ? m.prodGlow : m.prod, region: r };
}

// decoração das casas: região do atlas de casa
export function homeMat(key, glow = false) {
  const m = mats(); const r = homeAtlas().regions[key];
  if (!r) console.warn('Decoração sem região no atlas: ' + key);
  return { isSign: true, mat: glow ? m.homeGlow : m.home, region: r };
}

// placa: região do atlas (uma textura para todas as placas => 1 material)
export function signMat(text, opts = {}) {
  const m = mats();
  for (const pg of m.signPages) { const r = pg.atlas.region(text, opts); if (r) return { isSign: true, mat: pg.mat, region: r }; }
  const pg = m.newSignPage(); return { isSign: true, mat: pg.mat, region: pg.atlas.region(text, opts) };
}
