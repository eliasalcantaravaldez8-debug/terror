// Personagens da história e tipos de NPC (aparência). Edite aqui para ajustar a história.
import { rand, pick, rr } from './textures.js';

export const CHARACTERS = {
  ethan: {
    name: 'Ethan', look: { skin: 0xd09a74, hair: 0x2a1c12, shirt: 0x4a5560, jacket: 0x4a4038, pants: 0x34425e, shoes: 0x3a2a1e, hairStyle: 'short', height: 1.0, build: 1.0 },
  },
  ryan: {
    name: 'Ryan Cole', look: { skin: 0xb07856, hair: 0x18120c, shirt: 0xe8e2d6, jacket: 0x5a3b26, pants: 0x1f2430, shoes: 0x141414, hairStyle: 'short', beard: true, height: 1.03, build: 1.08 },
    dialogue: [
      'Ethan! Até que enfim você apareceu.',
      'Depois do que aconteceu ontem à noite, a cidade não é mais a mesma. Tem alguém nos observando.',
      'Preciso que você vá até a Delegacia de Los Valles e descubra o que a polícia sabe.',
      'Pegue seu carro, está na garagem. E Ethan... tome cuidado. Nem todos aqui são o que parecem.',
    ],
  },
  delegado: {
    name: 'Delegado Morales', look: { skin: 0xa8714f, hair: 0x5a5a5a, shirt: 0x2a3d6a, pants: 0x1c2638, shoes: 0x111111, hat: 'police', badge: true, hairStyle: 'short', height: 1.0, build: 1.12, longSleeve: true },
    dialogue: [
      'Você é o Ethan, não é? O Ryan disse que você viria.',
      'Não posso falar muito aqui. As paredes têm ouvidos.',
      'Volte mais tarde. Por enquanto, conheça a cidade... e mantenha os olhos abertos.',
    ],
  },
};

const SKINS = [0xf1c6a5, 0xe0ac86, 0xc68a64, 0xa8714f, 0x8a5a3c, 0x5e3b26, 0xd9a582];
const HAIRS = [0x1a1410, 0x2b1d14, 0x4a3020, 0x7a5a30, 0xb08850, 0x606060, 0x1a1a1a];
const SHIRTS = [0xb83a3a, 0x3a6ab8, 0x3a8a5a, 0xe0e0e0, 0x2a2a2a, 0xd8a030, 0x7a4aa0, 0x4a8a9a, 0xc06a8a, 0x8a6a4a];
const PANTS = [0x2c3e50, 0x1c1c1c, 0x4a4030, 0x3a4a6a, 0x5a5a5a, 0x6a5040, 0x2a3a2a];

export function randomPedestrian() {
  const female = rand() < 0.5;
  return {
    skin: pick(SKINS), hair: pick(HAIRS), shirt: pick(SHIRTS), pants: pick(PANTS), shoes: pick([0x1a1a1a, 0x4a3020, 0xe0e0e0, 0x3a3a5a]),
    jacket: rand() < 0.3 ? pick([0x2a2a2a, 0x4a3a2a, 0x2a3a5a, 0x6a2a2a]) : null,
    hairStyle: female ? pick(['long', 'bun', 'long']) : pick(['short', 'short', 'bald']),
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
