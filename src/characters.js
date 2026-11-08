// Personagens da história e tipos de NPC (aparência). Edite aqui para ajustar a história.
import { rand, pick, rr } from './textures.js';

// Elenco da história (aparência). Os diálogos ficam nas missões (missions_ethan.js / missions_ryan.js).
const ETHAN_SKIN = 0xd09a74, ETHAN_HAIR = 0x2a1c12;
export const CHARACTERS = {
  ethan: { name: 'Ethan Cross', look: { skin: ETHAN_SKIN, hair: ETHAN_HAIR, shirt: 0x4a5560, jacket: 0x4a4038, pants: 0x34425e, shoes: 0x3a2a1e, hairStyle: 'short', height: 1.0, build: 1.0 } },
  ethanPrison: { name: 'Ethan Cross', look: { skin: ETHAN_SKIN, hair: ETHAN_HAIR, shirt: 0xd8d8d0, pants: 0x5a5a58, shoes: 0x2a2a2a, hairStyle: 'short', beard: true, height: 1.0, build: 1.02 } },
  ethanYoung: { name: 'Ethan', look: { skin: ETHAN_SKIN, hair: ETHAN_HAIR, shirt: 0x8a2a2a, pants: 0x2a2f3a, shoes: 0xe0e0e0, hairStyle: 'short', hat: 'cap', hatColor: 0x1a1a1a, height: 1.0, build: 0.97 } },
  ryan: { name: 'Ryan Cole', look: { skin: 0xb07856, hair: 0x18120c, shirt: 0xe8e2d6, jacket: 0x5a3b26, pants: 0x1f2430, shoes: 0x141414, hairStyle: 'short', beard: true, height: 1.03, build: 1.08 } },
  ryanYoung: { name: 'Ryan', look: { skin: 0xb07856, hair: 0x18120c, shirt: 0x2a4a7a, pants: 0x2a2a2a, shoes: 0x141414, hairStyle: 'short', height: 1.03, build: 1.02 } },
  victor: { name: 'Victor Kane', look: { skin: 0xc8946c, hair: 0x101010, shirt: 0xf0f0f0, jacket: 0x1a1a1e, pants: 0x1a1a1e, shoes: 0x0a0a0a, tie: 0x6a1010, hairStyle: 'short', beard: true, height: 1.04, build: 1.1, longSleeve: true } },
  blake: { name: 'Blake Morrison', look: { skin: 0xe0b090, hair: 0x6a4a2a, shirt: 0x3a3a3a, jacket: 0x2a3a2a, pants: 0x2a2a2a, shoes: 0x1a1a1a, hairStyle: 'short', height: 1.0, build: 1.05 } },
  lucas: { name: 'Lucas', look: { skin: 0xe8c0a0, hair: 0x3a2a1a, shirt: 0x2a3d6a, pants: 0x1c2638, shoes: 0x111111, hairStyle: 'short', height: 0.99, build: 0.98, longSleeve: true, badge: true } },
  fernando: { name: 'Fernando del Costa', look: { skin: 0xd8a882, hair: 0x2a1a10, shirt: 0xe8e8e0, pants: 0x3a3a4a, shoes: 0x2a2a2a, hairStyle: 'short', beard: true, height: 1.0, build: 1.0 } },
  brother: { name: '???', look: { skin: ETHAN_SKIN, hair: ETHAN_HAIR, shirt: 0x2a2a2a, jacket: 0x101012, pants: 0x1a1a1a, shoes: 0x0a0a0a, hairStyle: 'short', height: 1.01, build: 1.0 } },
  reed: { name: 'Detective Marcus Reed', look: { skin: 0x8a5a3c, hair: 0x5a5a5a, shirt: 0xd8d4c8, jacket: 0x6a5a40, pants: 0x3a3428, shoes: 0x2a1a10, tie: 0x2a2a4a, hairStyle: 'short', beard: true, height: 1.02, build: 1.08, longSleeve: true } },
  investigator: { name: 'Investigador', look: { skin: 0x9a6a4a, hair: 0x2a2a2a, shirt: 0xd0ccc0, jacket: 0x3a3a3a, pants: 0x2a2a2a, shoes: 0x1a1a1a, hairStyle: 'short', height: 1.0, build: 1.05, longSleeve: true } },
  driver: { name: 'Motorista', look: { skin: 0x6a4a34, hair: 0x101010, shirt: 0xf0f0f0, jacket: 0x101010, pants: 0x101010, shoes: 0x050505, tie: 0x101010, hairStyle: 'bald', height: 1.02, build: 1.1, longSleeve: true } },
  mystery: { name: 'Pessoa misteriosa', look: { skin: 0x7a5a44, hair: 0x101010, shirt: 0x141416, pants: 0x121214, shoes: 0x0a0a0a, hat: 'hood', hatColor: 0x121214, hairStyle: 'bald', height: 0.98, build: 0.95, longSleeve: true } },
};
// grupos
export function allyGuardLook() { return { ...randomPedestrian(), female: false, skirt: null, shirt: 0x1a1a1a, jacket: 0x22252a, pants: 0x1a1a1a, shoes: 0x0a0a0a, hat: null, hairStyle: 'short', build: rr(1.05, 1.15), height: rr(1, 1.05), longSleeve: true }; }
export function rivalLook() { return { ...randomPedestrian(), female: false, skirt: null, shirt: pick([0x7a1a1a, 0x5a1010, 0x8a2a1a]), jacket: rand() < 0.5 ? 0x1a1a1a : null, pants: pick([0x1a1a1a, 0x2a2a3a]), hat: rand() < 0.4 ? 'cap' : null, hatColor: 0x7a1010, hairStyle: 'short', build: rr(1, 1.12) }; }
export function mansionGuardLook() { return { ...randomPedestrian(), female: false, skirt: null, shirt: 0xe8e8e8, jacket: 0x14161a, pants: 0x14161a, shoes: 0x050505, tie: 0x14161a, hairStyle: pick(['short', 'bald']), hat: null, build: rr(1.08, 1.18), height: rr(1, 1.06), longSleeve: true }; }
export function corruptCopLook() { return { ...policeLook() }; }

const SKINS = [0xf1c6a5, 0xe0ac86, 0xc68a64, 0xa8714f, 0x8a5a3c, 0x5e3b26, 0xd9a582];
const HAIRS = [0x1a1410, 0x2b1d14, 0x4a3020, 0x7a5a30, 0xb08850, 0x606060, 0x1a1a1a];
const SHIRTS = [0xb83a3a, 0x3a6ab8, 0x3a8a5a, 0xe0e0e0, 0x2a2a2a, 0xd8a030, 0x7a4aa0, 0x4a8a9a, 0xc06a8a, 0x8a6a4a];
const PANTS = [0x2c3e50, 0x1c1c1c, 0x4a4030, 0x3a4a6a, 0x5a5a5a, 0x6a5040, 0x2a3a2a];

export function randomPedestrian() {
  const female = rand() < 0.5;
  const skirt = female && rand() < 0.4 ? pick(['short', 'long']) : null;
  return {
    female, skirt, skirtColor: pick([0x2a2a3a, 0x8a2a3a, 0x3a5a8a, 0x1a1a1a, 0x6a4a7a, 0xc8a070]), lips: pick([0xa83a4a, 0x8a3a3a, 0xc85a6a, 0x9a4a40]), earrings: female && rand() < 0.5,
    eyes: pick([0x4a3020, 0x2a1a10, 0x3a6a8a, 0x4a6a3a, 0x6a4a2a]),
    skin: pick(SKINS), hair: pick(HAIRS), shirt: pick(SHIRTS), pants: pick(PANTS), shoes: pick([0x1a1a1a, 0x4a3020, 0xe0e0e0, 0x3a3a5a]),
    jacket: rand() < 0.3 ? pick([0x2a2a2a, 0x4a3a2a, 0x2a3a5a, 0x6a2a2a]) : null,
    hairStyle: female ? pick(['long', 'bun', 'long', 'ponytail', 'bob']) : pick(['short', 'short', 'bald']),
    beard: !female && rand() < 0.25, hat: rand() < 0.1 ? 'cap' : null, hatColor: pick([0xaa2222, 0x2244aa, 0x222222]),
    height: female ? rr(0.92, 0.99) : rr(0.97, 1.06), build: female ? rr(0.88, 0.95) : rr(0.95, 1.12), longSleeve: rand() < 0.4,
  };
}
export function shopkeeperLook() {
  return { ...randomPedestrian(), shirt: pick([0xc0392b, 0x2471a3, 0x1e8449, 0xd68910]), jacket: null, tie: rand() < 0.3 ? 0x222222 : null, longSleeve: true };
}
export function policeLook() {
  return { skin: pick(SKINS), hair: pick(HAIRS), shirt: 0x2a3d6a, pants: 0x1c2638, shoes: 0x111111, hat: 'police', badge: true, hairStyle: 'short', height: rr(0.98, 1.05), build: rr(1.0, 1.12), longSleeve: true };
}
export const SHOP_LINES = [
  'Bem-vindo! Posso ajudar em alguma coisa?',
  'Fique à vontade para dar uma olhada.',
  'Está tudo tão estranho na cidade ultimamente...',
  'Fechamos às dez. Depois disso, ninguém anda por aí.',
  'Você não é daqui do bairro, é?',
];
export const PED_LINES = ['Boa noite.', 'Com licença.', 'Hm?', 'Não tenho tempo agora.', 'Cuidado por onde anda.', 'Dizem que algo estranho acontece na praça à noite...'];
export const POLICE_LINES = ['Circulando, cidadão.', 'Tudo certo por aqui?', 'Não vá dirigir em alta velocidade, hein.'];
