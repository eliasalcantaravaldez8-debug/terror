// Coordenadas dos locais da história (fora da grade da cidade) e o relevo dos arredores.
export const PLACES = {
  favela: { x: 0, z: 330, w: 80, d: 60, name: 'Favela (antigo esconderijo)' },
  hideout: { x: -6, z: 330 },           // casa do esconderijo
  crashWall: { x: 170, z: 352 },        // muro da batida no prólogo
  prison: { x: -350, z: 76, w: 80, d: 70, name: 'Penitenciária Estadual' },
  prisonGate: { x: -308, z: 76 },
  industrial: { x: 350, z: 0, w: 110, d: 150, name: 'Zona Industrial' },
  rivalTerritory: { x: 340, z: -45 },   // território do grupo rival (norte da zona industrial)
  bookTable: { x: 352, z: -52 },
  galpao: { x: 362, z: 48 },            // galpão abandonado (capítulo de Lucas)
  abandoned: { x: -80, z: -330, w: 40, d: 36, name: 'Casa abandonada' },
  mansion: { x: 152, z: -352, w: 76, d: 60, name: 'Mansão de Lucas' },
  hill: { x: 70, z: -330, r: 46, h: 11, name: 'Colina' },
  fernando: { x: -170, z: -312, w: 40, d: 34, name: 'Casa de Fernando' },
  blackwoodGate: { x: 432, z: 0 },
  investigatorRoom: { x: 0, y: -60, z: 0 },
  studio: { x: 60, y: -80, z: 0 },
};
// áreas onde não nascem árvores/colinas decorativas
export const KEEP_OUT = [
  [PLACES.favela.x - 50, PLACES.favela.z - 40, PLACES.favela.x + 190, PLACES.favela.z + 40],
  [PLACES.prison.x - 50, PLACES.prison.z - 45, -230, PLACES.prison.z + 45],
  [230, -85, 450, 85],
  [PLACES.abandoned.x - 30, -360, PLACES.abandoned.x + 30, -230],
  [PLACES.mansion.x - 50, -390, PLACES.mansion.x + 50, -230],
  [PLACES.hill.x - 55, PLACES.hill.z - 55, PLACES.hill.x + 55, PLACES.hill.z + 55],
  [PLACES.fernando.x - 30, -340, PLACES.fernando.x + 30, -230],
  [-8, 230, 8, 310],
];
export function inKeepOut(x, z, pad = 0) {
  return KEEP_OUT.some(([a, b, c, d]) => x > a - pad && x < c + pad && z > b - pad && z < d + pad);
}
// colina suave usada como mirante da mansão
export function hillHeight(x, z) {
  const H = PLACES.hill; const d2 = ((x - H.x) ** 2 + (z - H.z) ** 2) / (H.r * H.r);
  if (d2 >= 1) return 0;
  const t = 1 - d2; return H.h * t * t * (3 - 2 * t);
}

// ---------- BLACKWOOD (cidade menor a leste, depois do rio) ----------
export const BW = { x: 640, z: 0, n: 4, P: 76, ROAD: 12, BLOCK: 64 };
BW.half = (BW.n / 2) * BW.P + BW.ROAD / 2; // 158
export const bwRoad = (i) => BW.x + (i - BW.n / 2) * BW.P;   // x das ruas norte-sul
export const bwRoadZ = (i) => BW.z + (i - BW.n / 2) * BW.P;  // z das ruas leste-oeste
export const bwBlock = (j) => bwRoad(j) + BW.P / 2;
export const bwBlockZ = (k) => bwRoadZ(k) + BW.P / 2;
export const RIVER = { x0: 446, x1: 476 };
export function inBlackwood(x, z, pad = 0) { return Math.abs(x - BW.x) <= BW.half + pad && Math.abs(z - BW.z) <= BW.half + pad; }
export function bwOnRoad(x, z) {
  const onAxis = (v, c) => { const u = v - (c - BW.half); if (u < 0 || u > BW.n * BW.P + BW.ROAD) return false; return (u % BW.P) < BW.ROAD; };
  return onAxis(x, BW.x) || onAxis(z, BW.z);
}
