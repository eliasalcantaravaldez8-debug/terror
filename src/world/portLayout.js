/**
 * Port of Vareny (Mission 3). Absolute world coordinates; the port lies east of
 * Teresk across the bay. Land is y=0, the sea surface sits just below the quay.
 */
export const PORT = {
  land: { x0: 885, x1: 1320, z0: -90, z1: 260 },
  play: { x0: 930, x1: 1170, z0: -90, z1: 90 },
  gate: { x0: 992, x1: 1008, z: 90 },
  road: { x0: 990, x1: 1010, z1: 150 },
  quayEdge: -90,
  seaY: -0.7,
  gatehouse: { x0: 1010, x1: 1016, z0: 78, z1: 84 },
  tower: { x: 1013, z: 70, h: 6 },
  yard: { x0: 942, x1: 1108, rows: [30, 16, 2, -12, -26, -40], lane: [993, 1007] },
  rtg: { x0: 1046, x1: 1064, z0: -47, z1: 37, h: 18 },
  warehouse: { x0: 1115, x1: 1165, z0: -45, z1: 30, h: 12 },
  sts: [{ x: 990 }, { x: 1065 }],
  ship: {
    // hull outline (x, z), bow to the east
    outline: [[955, -93], [1065, -93], [1091, -103], [1065, -113], [955, -113]],
    deckY: 7, keelY: -4,
    gangway: { x0: 1037.5, x1: 1042.5, zTop: -92.4, zBottom: -78, steps: 24 },
    superstructure: { x0: 957, x1: 972, z0: -111, z1: -95, top: 24 },
    booth: { x0: 973, x1: 977.5, z0: -106, z1: -100 },
    terminal: { x: 974.6, y: 8.4, z: -103 },
  },
  start: { x: 1000, z: 128 },
};
