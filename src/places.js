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
  airport: { x: -340, z: -250, name: 'Aeroporto de Los Valles' }, // pista norte-sul em x = -410
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
  [-448, -450, -240, -40], // aeroporto
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

// ---------- WESTHAVEN (terceira cidade, a oeste, depois da baía e da ponte gigante) ----------
export const WH = { x: -1150, z: 0, n: 8, P: 76, ROAD: 12, BLOCK: 64 };
WH.half = (WH.n / 2) * WH.P + WH.ROAD / 2; // 310 => x de -1460 a -840
export const whRoad = (i) => WH.x + (i - WH.n / 2) * WH.P;
export const whRoadZ = (i) => WH.z + (i - WH.n / 2) * WH.P;
export const whBlock = (j) => whRoad(j) + WH.P / 2;
export const whBlockZ = (k) => whRoadZ(k) + WH.P / 2;
// estádio ocupa 2x2 quarteirões (colunas 6-7, linhas 1-2): as ruas internas não existem
export const WH_STADIUM = { j0: 6, k0: 1 };
export function inWHStadium(x, z) { return x > whRoad(6) + 6 && x < whRoad(8) - 6 && z > whRoadZ(1) + 6 && z < whRoadZ(3) - 6; }
export function inWesthaven(x, z, pad = 0) { return Math.abs(x - WH.x) <= WH.half + pad && Math.abs(z - WH.z) <= WH.half + pad; }
export function whOnRoad(x, z) {
  if (inWHStadium(x, z)) return false;
  const onAxis = (v, c) => { const u = v - (c - WH.half); if (u < 0 || u > WH.n * WH.P + WH.ROAD) return false; return (u % WH.P) < WH.ROAD; };
  return onAxis(x, WH.x) || onAxis(z, WH.z);
}
// baía e ponte: rodovia sai de Los Valles (x -234) pelo oeste, sobe a rampa, cruza a baía a 12 m e desce em Westhaven
export const BAY = { x0: -780, x1: -560 };
export const HWY = { x0: -480, x1: -234, w: 18 }; // rodovia de 4 faixas em z = 0
export const BRIDGE = { x0: -840, x1: -480, w: 18, towers: [-600, -740] };
export function deckY(x) {
  if (x >= -480 || x <= -840) return 0;
  const ss = (t) => t * t * (3 - 2 * t);
  if (x > -560) return 12 * ss((-480 - x) / 80);
  if (x < -780) return 12 * ss((x + 840) / 60);
  return 12 + 2.5 * Math.sin(Math.PI * (-560 - x) / 220); // vão central levemente arqueado
}
export const onBridge = (x, z) => x < -480 && x > -840 && Math.abs(z) < BRIDGE.w / 2;
export const onHighway = (x, z) => x <= -234 && x >= -480 && Math.abs(z) < HWY.w / 2;
// área afastada com poucas casas, no meio da floresta a oeste da cidade
export const PINES = { x: -1660, z: 150, r: 70, name: 'Vale dos Pinheiros (área afastada)' };
