// Campanha de Ethan Cross — segue o DOCUMENTO OFICIAL DA HISTÓRIA.
// Diálogos marcados no documento são usados exatamente como escritos.
// Mistérios mantidos em aberto: quem atirou em Lucas, o que aconteceu com Ryan,
// a identidade da pessoa misteriosa e se o irmão sabe que Ethan está vivo.
import { CHARACTERS, allyGuardLook, rivalLook, mansionGuardLook, policeLook } from './characters.js';
import { RouteDriver, ChaseDriver, FollowDriver } from './drivers.js';
import { PLACES } from './places.js';
import { blockC } from './city.js';

const E = 'Ethan', R = 'Ryan Cole';
const enemiesAlive = (G, tag) => G.npcs.filter((n) => n.team === 'enemy' && n.tag === tag && n.behavior !== 'down' && !n.removed);

// ---------------- auxiliares ----------------
function safehouse(G) { return G.city.ethanHouse; }
function ryanNPC(S, x, z, h = 0) { return S.npc('ryan', 'ryan', { x, z, heading: h, role: 'story', hp: 400, damage: 14, interactable: false }); }
function guards(S, n, x, z, prefix = 'g') {
  const out = [];
  for (let i = 0; i < n; i++) {
    const g = S.npc(prefix + i, allyGuardLook(), { x: x + (i % 3) * 1.2 - 1.2, z: z + Math.floor(i / 3) * 1.4 + 1.5, name: 'Guarda', role: 'story', hp: 260, damage: 12, interactable: false });
    out.push(g);
  }
  return out;
}
function hostile(S, key, look, x, z, tag, opts = {}) {
  const n = S.npc(key, look, { x, z, name: opts.name || 'Capanga', role: 'enemy', team: 'enemy', behavior: 'hostile', hp: opts.hp ?? 70, damage: opts.damage ?? 6, interactable: false, run: 4.2, ...opts });
  n.team = 'enemy'; n.tag = tag; return n;
}
function ensureCar(S, G, key, type, color, x, z, h) { return S.car(key, type, color, x, z, h); }
function bookPage(G) {
  return G.showDocument('O LIVRO', `<div class="book"><p><b>Nome:</b> Lucas</p><p><b>Idade:</b> 26 anos</p><p><b>Profissão:</b> policial corrupto</p><p><b>Residência:</b> mansão gigantesca</p><p><b>Segurança:</b> sete guardas</p></div>`);
}

export const ETHAN_MISSIONS = [
  // ======================= PRÓLOGO =======================
  {
    id: 'prologo', title: 'Prólogo — A Traição', auto: true, next: 'liberdade', hint: 'A operação policial no esconderijo.',
    stages: [
      { name: 'esconderijo', async run(S, G) {
        const Z = G.zones.spots;
        G.setHour(22.5); G.player.setLook(CHARACTERS.ethanYoung.look);
        await S.fadeOut(0.01);
        const [cx, cz] = Z.hideoutChair; S.placePlayer(cx, cz, Math.PI);
        G.player.pose = 'chair';
        const ryan = S.npc('ryan', 'ryanYoung', { x: Z.hideoutOut[0], z: Z.hideoutOut[1] + 2, heading: Math.PI, behavior: 'scripted', role: 'story', hp: 400, damage: 14 });
        ryan.goalSpeed = 5.5;
        await S.cutscene(async () => {
          S.shot([cx + 2.8, 2.25, cz + 2.6], [cx, 1.0, cz], 0, [cx + 2.4, 2.1, cz + 2.2], [cx, 1.05, cz]);
          await S.fadeIn(1.2);
          await S.card('LOS VALLES — 13 DE AGOSTO DE 2027', 'Esconderijo da gangue, na favela', 3.2);
          G.sound('siren', 4);
          ryan.goal = Z.hideoutDoorIn;
          await S.until(() => !ryan.goal);
          ryan.faceTo = [cx, cz];
          S.frame(G.player, ryan, 1, 2.8);
          await S.say(ryan, 'Chefe, a polícia tá invadindo! Tem algum espião ou traidor! E agora?');
          S.over(ryan, G.player, 1.8);
          await S.say(E, 'Vamos fugir.');
        });
        G.player.pose = null;
      } },
      { name: 'fuga', cp: 'hideout', async run(S, G) {
        const Z = G.zones.spots;
        if (S.resumed) { G.setHour(22.5); G.player.setLook(CHARACTERS.ethanYoung.look); S.placePlayer(...Z.hideoutOut, 0); }
        const ryan = S.npc('ryan', 'ryanYoung', { x: Z.hideoutOut[0] + 1, z: Z.hideoutOut[1], role: 'story', hp: 400 });
        S.follow(ryan);
        const car = ensureCar(S, G, 'fugaCar', 'sedan', 0x2a2a30, Z.hideoutCar[0], Z.hideoutCar[1], Math.PI / 2);
        await S.goto([car.x, car.z], 3, 'Corra até o carro e fuja (E para entrar)');
        await S.until(() => G.car === car);
        // a polícia chega pela estrada da cidade
        G.sound('siren', 6);
        for (let i = 0; i < 3; i++) {
          const pc = S.car('pol' + i, 'police', 0xffffff, -4 + i * 4, 290 - i * 9, Math.PI);
          G.aiDrivers.push(new ChaseDriver(pc, () => G.car || G.player, { speed: 24 }));
        }
        const C = PLACES.crashWall;
        S.objective('Fuja da polícia!', [C.x - 20, C.z]);
        const t0 = S.t;
        await S.until(() => (G.car && Math.hypot(G.car.x - (C.x - 20), G.car.z - C.z) < 25) || S.t - t0 > 70);
        S.clearObjective();
      } },
      { name: 'batida', async run(S, G) {
        const C = PLACES.crashWall;
        let car = S.get('fugaCar');
        if (!car || G.car !== car) { car = ensureCar(S, G, 'fugaCar', 'sedan', 0x2a2a30, C.x - 70, C.z, Math.PI / 2); S.putInCar(car); }
        const ryan = S.get('ryan') || S.npc('ryan', 'ryanYoung', { x: C.x - 70, z: C.z + 3 }); S.follow(ryan); S.onEnterCar(car);
        await S.cutscene(async () => {
          car.place(C.x - 55, C.z + 0.3, Math.PI / 2); car.speed = 24;
          G.forceCarInput = { throttle: 1, steer: 0.08 };
          S.shot([C.x - 8, 2.2, C.z + 12], [C.x - 30, 1, C.z], 2.3, [C.x - 6, 1.6, C.z + 9], [C.x - 2, 1, C.z]);
          const tc = S.t; await S.until(() => car.lastHit > 4 || car.x > C.x - 4.5 || S.t - tc > 5);
          G.forceCarInput = null; G.sound('crash'); G.shake(0.8);
          await S.wait(1.4);
          // a polícia cerca o carro; Ryan escapa a pé
          for (let i = 0; i < 3; i++) { const pc = S.get('pol' + i) || S.car('pol' + i, 'police', 0xffffff, C.x - 40, C.z, Math.PI / 2); pc.place(C.x - 18 - i * 7, C.z + (i - 1) * 4, Math.PI / 2 + (i - 1) * 0.4); pc.speed = 0; }
          G.aiDrivers = [];
          S.unfollow(ryan); ryan.behavior = 'flee'; ryan.route = [[C.x - 6, C.z + 10], [C.x - 2, C.z + 30], [C.x + 30, C.z + 50]]; ryan.routeI = 0; ryan.runSpeed = 6;
          G.forceExitCar(); G.player.pose = 'handsup';
          const cops = []; for (let i = 0; i < 4; i++) cops.push(S.npc('cop' + i, policeLook(), { x: G.player.x - 6 + i * 2.5, z: G.player.z + 5 - (i % 2) * 9, role: 'story', name: 'Policial', behavior: 'scripted' }));
          cops.forEach((c, i) => { c.goal = [G.player.x + Math.sin(i * 1.6) * 2.2, G.player.z + Math.cos(i * 1.6) * 2.2]; c.goalSpeed = 3; c.faceTo = [G.player.x, G.player.z]; });
          S.shot([G.player.x + 7, 3.5, G.player.z + 6], [G.player.x, 1.2, G.player.z], 3.5, [G.player.x + 4, 2.2, G.player.z + 3.5], [G.player.x, 1.3, G.player.z]);
          await S.wait(2.2);
          S.shot([C.x - 6, 2, C.z + 4], [C.x + 10, 1, C.z + 40], 2.5);
          await S.wait(2.2);
          await S.fadeOut(1.2);
          await S.card('Ethan foi capturado pela polícia.', 'Ryan conseguiu escapar.', 3.5);
          await S.card('SETE ANOS DEPOIS', '', 2.8);
        });
        G.player.pose = null;
        G.vibe('prologo');
      } },
    ],
  },
  // ======================= SETE ANOS DEPOIS =======================
  {
    id: 'liberdade', title: 'Sete Anos Depois', auto: true, next: null, hint: 'Ethan é libertado.',
    stages: [
      { name: 'saida', async run(S, G) {
        const Z = G.zones.spots;
        G.setHour(9.5); G.player.setLook(CHARACTERS.ethanPrison.look);
        S.placePlayer(...Z.prisonGateIn, Math.PI / 2);
        if (S.fade > 0) await S.fadeIn(1.2);
        await S.card('PENITENCIÁRIA ESTADUAL — 2034', 'Ethan Cross é libertado', 3);
        await S.goto(Z.prisonGateOut, 3, 'Saia da penitenciária');
      } },
      { name: 'carro-preto', async run(S, G) {
        const Z = G.zones.spots;
        if (S.resumed) { G.setHour(9.7); G.player.setLook(CHARACTERS.ethanPrison.look); S.placePlayer(...Z.prisonGateOut, Math.PI / 2); }
        const [px, pz] = Z.prisonPickup;
        const suv = S.car('blindado', 'suv', 0x0b0b0d, -238, 74.25, -Math.PI / 2);
        const driver = S.npc('motorista', 'driver', { x: -238, z: 74, role: 'story', interactable: false });
        S.seat(driver, suv, -1);
        const d = new RouteDriver(suv, [[-270, 74.3], [px + 4, pz]], { speed: 13, rubber: false });
        G.aiDrivers.push(d);
        S.objective('Espere na entrada', null);
        await S.until(() => d.done && Math.abs(suv.speed) < 0.5);
        await S.cutscene(async () => {
          S.frame(G.player, suv, -1, 4.5, 1.8);
          await S.wait(0.6);
          await S.say('Motorista', 'Cole me mandou te buscar.');
        });
        S.objective('Entre no carro preto', () => suv.doorPos(-1));
        await S.press(() => suv.doorPos(-1), 2.6, '[E] Entrar no carro preto');
        S.clearObjective();
        await S.fadeOut(1);
        S.despawn('blindado'); S.despawn('motorista');
      } },
      { name: 'reencontro', async run(S, G) {
        const H = safehouse(G);
        G.setHour(17.8); G.player.setLook(CHARACTERS.ethanPrison.look);
        S.placePlayer(H.door[0] + 1, H.door[1] + 5, Math.PI);
        const ryan = ryanNPC(S, H.door[0] - 0.5, H.door[1] + 1.5, 0);
        ryan.behavior = 'stand';
        await S.cutscene(async () => {
          S.frame(G.player, ryan, 1, 3.4);
          await S.fadeIn(1.2);
          await S.say(ryan, 'Ethan. Sete anos...');
          await S.say(ryan, 'O nosso antigo esconderijo já era. O grupo rival destruiu tudo.');
          await S.say(ryan, 'Pelo que eu sei, só sobramos nós dois.');
          S.over(G.player, ryan);
          await S.say(ryan, 'Esse tempo todo eu fiquei investigando quem traiu a gente.');
          await S.say(ryan, 'Consegui preservar três nomes de um livro.');
          S.over(ryan, G.player);
          await S.choose([
            { text: 'Quem fez isso vai pagar.', trait: 'frieza', line: 'Quem fez isso vai pagar.' },
            { text: 'Vamos com calma. Primeiro eu quero entender tudo.', trait: 'inteligencia', line: 'Vamos com calma. Primeiro eu quero entender tudo.' },
            { text: 'Me passa esses nomes. Agora.', trait: 'impulsividade', line: 'Me passa esses nomes. Agora.' },
          ]);
          S.frame(G.player, ryan, -1, 3);
          await S.say(E, 'Eu vou descobrir quem está por trás de tudo isso.');
        });
        G.player.setLook(CHARACTERS.ethan.look);
        G.vibe('liberdade');
        G.phone.addMessage('Ryan Cole', 'Descansa hoje. Amanhã a gente começa pelos nomes do livro. Me encontra quando estiver pronto.');
      } },
    ],
  },
  // ======================= OS NOMES DO LIVRO / VICTOR =======================
  {
    id: 'nomes', title: 'Os Nomes do Livro', start: (G) => [safehouse(G).door[0], safehouse(G).door[1] + 3], next: 'lucas', hint: 'Comece na casa de Ryan (marcador amarelo).',
    stages: [
      { name: 'encontrar-ryan', async run(S, G) {
        const H = safehouse(G);
        await S.fadeOut(0.8); G.setHour(9); S.placePlayer(H.door[0], H.door[1] + 4, 0);
        const eh = G.ethanCar; if (Math.hypot(eh.x - H.driveway[0], eh.z - H.driveway[1]) > 30 && !G.car) eh.place(H.driveway[0], H.driveway[1], H.heading + Math.PI);
        await S.fadeIn(0.8);
        await S.card('No dia seguinte', '', 2.2);
        const mx = blockC(4), mz = blockC(3) + 10;
        ryanNPC(S, mx, mz, Math.PI); guards(S, 5, mx + 3, mz - 2);
        S.car('carroGuardas', 'suv', 0x101010, mx - 6, mz + 4, 0);
        await S.goto([mx, mz], 10, 'Pegue um carro e encontre Ryan');
      } },
      { name: 'casa-abandonada', async run(S, G) {
        const mx = blockC(4), mz = blockC(3) + 10;
        if (S.resumed) { G.setHour(9.3); S.placePlayer(mx + 4, mz + 6, Math.PI); }
        const ryan = ryanNPC(S, mx, mz, Math.PI); const gs = guards(S, 5, mx + 3, mz - 2);
        const gcar = S.car('carroGuardas', 'suv', 0x101010, mx - 6, mz + 4, 0);
        await S.cutscene(async () => {
          S.frame(G.player, ryan, 1, 3.2);
          await S.say(ryan, 'Chegou. Esses são os nossos homens.');
          await S.say(ryan, 'Primeiro a casa abandonada. Depois a gente vai até a área deles.');
        });
        S.follow(ryan, true);
        gs.forEach((g) => { S.seat(g, gcar, gs.indexOf(g) === 0 ? -1 : gs.indexOf(g) - 1); });
        G.aiDrivers.push(new FollowDriver(gcar, () => G.car || G.player));
        await S.goto(G.zones.spots.abandonedFront, 14, 'Dirija até a casa abandonada (os guardas seguem você)');
        await S.goto(G.zones.spots.abandonedInside, 3, 'Verifique a casa abandonada', { foot: true });
        await S.say(ryan, 'Não tem ninguém aqui.', { sub: true });
        await S.say(ryan, 'Eles estão no território deles, na Zona Industrial.', { sub: true });
      } },
      { name: 'territorio', async run(S, G) {
        const T = G.zones.spots.rivalCenter;
        if (S.resumed) { S.placePlayer(285, 6, Math.PI / 2); }
        const ryan = ryanNPC(S, G.player.x + 2, G.player.z + 2); S.follow(ryan, true);
        const gcar = S.car('carroGuardas', 'suv', 0x101010, G.player.x - 10, G.player.z, Math.PI / 2);
        const gs = guards(S, 5, gcar.x, gcar.z);
        if (!G.aiDrivers.some((d) => d.car === gcar)) { gs.forEach((g, i) => S.seat(g, gcar, i === 0 ? -1 : i - 1)); G.aiDrivers.push(new FollowDriver(gcar, () => G.car || G.player)); }
        await S.goto(T, 45, 'Vá até o território do grupo rival');
        // guardas descem do carro
        G.aiDrivers = G.aiDrivers.filter((d) => d.car !== gcar);
        gs.forEach((g) => { if (g.inCar) S.unseat(g); S.follow(g, true); });
      } },
      { name: 'confronto', async run(S, G) {
        const T = G.zones.spots.rivalCenter;
        if (S.resumed) S.placePlayer(T[0] - 30, T[1] + 25, Math.PI * 0.75);
        const ryan = ryanNPC(S, G.player.x + 2, G.player.z + 1); S.follow(ryan, true);
        const gs = guards(S, 5, G.player.x - 3, G.player.z + 2); gs.forEach((g) => S.follow(g, true));
        for (let i = 0; i < 8; i++) hostile(S, 'rival' + i, rivalLook(), T[0] + (i % 4) * 4 - 6, T[1] - 4 + Math.floor(i / 4) * 6, 'rival', { hp: 60, damage: 5 });
        const blake = hostile(S, 'blake', 'blake', T[0] + 6, T[1] - 8, 'blake', { name: 'Blake Morrison', hp: 9999, damage: 7 });
        S.failChecks = [() => G.player.hp <= 0 ? 'Ethan foi derrotado' : null];
        S.objective('Enfrente o grupo rival (F para golpear)', T);
        await S.until(() => enemiesAlive(G, 'rival').length <= 1 || (blake.hp < 9930));
        S.failChecks = null; S.clearObjective();
        enemiesAlive(G, 'rival').forEach((n) => n.knockDown(0));
        // Blake se rende
        blake.behavior = 'scripted'; blake.team = 'neutral'; blake.pose = 'handsup'; blake.goal = null; blake.faceTo = [G.player.x, G.player.z];
        gs.forEach((g) => { g.behavior = 'stand'; });
        ryan.behavior = 'stand';
        // dois homens do grupo de Ethan caem durante o confronto
        gs[3].knockDown(0); gs[4].knockDown(0);
        await S.cutscene(async () => {
          S.placePlayer(blake.x - Math.sin(blake.heading) * -3, blake.z + 3.2, Math.PI);
          G.player.heading = Math.atan2(blake.x - G.player.x, blake.z - G.player.z); G.player.sync();
          blake.faceTo = [G.player.x, G.player.z];
          S.frame(G.player, blake, 1, 3);
          await S.say(blake, 'Para! Para! Eu me rendo!');
          await S.say(blake, 'Eu falo! Eu conto tudo o que eu sei!');
          await S.say(E, 'Então fala.');
          // Victor Kane aparece
          const vc = S.car('carroVictor', 'sedan', 0x0a0a0a, 328.25, 4, Math.PI);
          const victor = S.npc('victor', 'victor', { x: vc.x, z: vc.z, role: 'story', interactable: false }); S.seat(victor, vc, -1);
          G.aiDrivers.push(new RouteDriver(vc, [[328.25, -20], [blake.x + 5, blake.z + 4]], { speed: 12, rubber: false }));
          S.shot([blake.x - 4, 2.5, blake.z + 7], [vc.x, 1, vc.z], 3, [blake.x - 3, 2.2, blake.z + 6], [blake.x + 5, 1, blake.z + 4]);
          G.sound('screech');
          const tv = S.t; await S.until(() => (G.aiDrivers.every((d) => d.car !== vc || d.done) && Math.abs(vc.speed) < 0.6) || S.t - tv > 14);
          S.unseat(victor); victor.x = vc.x - 1.5; victor.z = vc.z + 1.5; victor.behavior = 'scripted'; victor.faceTo = [blake.x, blake.z];
          S.frame(victor, blake, -1, 3.4);
          await S.say(victor, 'Blake. Nem mais uma palavra.');
          blake.pose = null; blake.faceTo = [victor.x, victor.z];
          S.over(G.player, victor, 2.6);
          await S.wait(1.2);
          S.seat(victor, vc, -1);
          await S.wait(0.4);
        });
        G.vibe('victor');
      } },
      { name: 'perseguicao', async run(S, G) {
        const T = G.zones.spots.rivalCenter;
        if (S.resumed) S.placePlayer(T[0] - 6, T[1] + 6, 0);
        const ryan = ryanNPC(S, G.player.x + 2, G.player.z + 1); S.follow(ryan, true);
        const vc = S.car('carroVictor', 'sedan', 0x0a0a0a, T[0] + 10, T[1] - 2, Math.PI);
        const victor = S.npc('victor', 'victor', { x: vc.x, z: vc.z, role: 'story', interactable: false }); if (!victor.inCar) S.seat(victor, vc, -1);
        G.aiDrivers = G.aiDrivers.filter((d) => d.car !== vc);
        const route = [[330 - 1.75, -20], [328.25, -6], [300, -1.75], [234, -1.75], [153.75, -1.75], [153.75, -76], [153.75, -150], [153.75, -228], [153.75, -300]];
        const rd = new RouteDriver(vc, route, { speed: 30, player: G.player });
        G.aiDrivers.push(rd);
        const myCar = S.car('carroGrupo', 'sedan', 0x2a3a4a, G.player.x - 4, G.player.z + 2, Math.PI / 2);
        void myCar;
        S.objective('Persiga Victor Kane', () => [vc.x, vc.z]);
        const t0 = S.t;
        await S.until(() => rd.done || S.t - t0 > 70);
        await S.fadeOut(0.8);
        S.despawn('carroVictor'); S.despawn('victor');
        await S.card('Victor Kane conseguiu escapar.', '', 2.6);
        S.clearObjective();
        await S.fadeIn(0.8);
      } },
      { name: 'livro', async run(S, G) {
        const B = G.zones.spots.book;
        const ryan = ryanNPC(S, B[0] - 2, B[1] + 2); S.follow(ryan, true);
        const blake = S.get('blake'); if (blake) { blake.behavior = 'scripted'; blake.lines = ['...']; blake.interactable = true; }
        await S.goto(B, 2.2, 'Volte ao território e recupere o livro', { foot: false });
        await S.press(B, 2.4, '[E] Pegar o livro');
        G.sound('page');
        await S.cutscene(async () => {
          S.shot([B[0] + 1.2, 1.9, B[1] + 1.4], [B[0], 1, B[1]]);
          await S.fadeOut(0.6);
          await S.card('O livro foi recuperado.', 'Dois integrantes do grupo de Ethan morreram durante os acontecimentos.', 4);
          S.placePlayer(B[0] - 1, B[1] + 2.5, Math.PI * 0.8);
          ryan.x = B[0] - 2.6; ryan.z = B[1] + 1.2; ryan.behavior = 'stand';
          S.frame(G.player, ryan, 1, 2.8);
          await S.fadeIn(0.6);
          await S.say(ryan, 'Finalmente. O livro.');
          await S.say(E, 'Vamos ver o primeiro nome.');
        });
      } },
    ],
  },
  // ======================= O PRIMEIRO SUSPEITO =======================
  {
    id: 'lucas', title: 'O Primeiro Suspeito', auto: true, next: null, hint: 'O primeiro nome do livro.',
    stages: [
      { name: 'primeiro-nome', async run(S, G) {
        const B = G.zones.spots.book;
        if (S.resumed) S.placePlayer(B[0] - 1, B[1] + 2.5, Math.PI * 0.8);
        const ryan = ryanNPC(S, G.player.x - 1.6, G.player.z - 1.2); ryan.behavior = 'stand';
        await S.cutscene(async () => {
          S.frame(G.player, ryan, 1, 2.8);
          await bookPage(G);
          await S.say(E, 'Lucas... Eu quero descobrir o que ele sabe sobre a traição.');
          // ligação misteriosa
          G.sound('ring'); G.player.phone = true;
          S.over(ryan, G.player, 2);
          await S.say('Celular', '📱 Número desconhecido está ligando...', {});
          await S.say('Desconhecido', 'Eu sei de tudo, sei quem te traiu e quem te trairá mais pra frente e eu tô te vendo agora...');
          G.player.phone = false;
          G.phone.addCall('Número desconhecido', 'Ligação recebida — encerrada pelo outro lado');
          await S.say('Celular', 'A ligação foi encerrada.');
          // fotografia enviada por alguém que observa os dois
          const cam = G.camera.clone(); const P = G.player;
          const a = P.heading + Math.PI + 0.5;
          cam.position.set(P.x + Math.sin(a) * 34, P.y + 9, P.z + Math.cos(a) * 34); cam.fov = 14; cam.updateProjectionMatrix();
          cam.lookAt((P.x + ryan.x) / 2, P.y + 1.1, (P.z + ryan.z) / 2);
          const photo = S.capture(cam, 400, 260, (g, w, h) => { const d = g.getImageData(0, 0, w, h); for (let i = 0; i < d.data.length; i += 4) { const v = d.data[i] * 0.3 + d.data[i + 1] * 0.59 + d.data[i + 2] * 0.11 + (Math.random() - 0.5) * 30; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; } g.putImageData(d, 0, 0); });
          const src = photo.toDataURL('image/jpeg', 0.7);
          G.phone.addMessage('Número desconhecido', '', src);
          G.addPhoto(src, 'Foto recebida de número desconhecido');
          G.sound('ping');
          await G.showDocument('Nova mensagem — Número desconhecido', `<img src="${src}" style="width:100%;border-radius:6px" alt="Foto de Ethan e Ryan tirada de longe">`);
          S.frame(G.player, ryan, -1, 2.8);
          await S.say(ryan, 'Alguém está observando a gente.');
        });
        G.vibe('ligacao');
      } },
    ],
  },
  // ======================= O IRMÃO =======================
  {
    id: 'irmao', title: 'O Irmão', start: (G) => [safehouse(G).door[0], safehouse(G).door[1] + 3], after: 'lucas', next: null, hint: 'À noite, observar a mansão de Lucas.',
    stages: [
      { name: 'colina', async run(S, G) {
        const H = safehouse(G);
        if (G.state.hour > 5 && G.state.hour < 20) { await S.fadeOut(0.8); G.setHour(22); S.placePlayer(H.door[0], H.door[1] + 4, 0); await S.fadeIn(0.8); await S.card('Durante a noite', '', 2); }
        const ryan = ryanNPC(S, G.player.x + 1.5, G.player.z + 1); S.follow(ryan);
        await S.goto(G.zones.spots.hillTop, 6, 'Vá com Ryan até a colina de onde se vê a mansão de Lucas', { foot: false });
      } },
      { name: 'binoculos', async run(S, G) {
        const Z = G.zones.spots; const W = Z.brotherWindow;
        if (S.resumed || G.state.hour > 5 && G.state.hour < 19) G.setHour(22.3);
        if (S.resumed) S.placePlayer(Z.hillTop[0], Z.hillTop[1], Math.PI / 2);
        const ryan = ryanNPC(S, G.player.x - 1.5, G.player.z + 1); S.follow(ryan);
        const brother = S.npc('irmao', 'brother', { x: W[0], z: W[2], y: W[1], role: 'story', interactable: false, heading: -Math.PI / 2 });
        brother.behavior = 'stand'; brother.role = 'story-static'; brother.homeHeading = -Math.PI / 2; brother.fixedY = true; brother.y = W[1];
        await S.press(Z.hillTop, 5, '[E] Usar binóculos');
        S.clearObjective(); G.inputLocked = true;
        await S.binoculars([W[0], W[1] + 1.5, W[2]]);
        G.inputLocked = false;
        await S.cutscene(async () => {
          S.shot([W[0] - 6, W[1] + 1.8, W[2] + 1], [W[0], W[1] + 1.5, W[2]], 3, [W[0] - 3.5, W[1] + 1.7, W[2] + 0.4], [W[0], W[1] + 1.55, W[2]]);
          await S.wait(1.5);
          S.frame(G.player, ryan, 1, 2.6);
          await S.say(E, 'Aquele filho da puta... Eu vou matar ele... Por que logo você?');
          await S.say(ryan, 'Quem é, Ethan?');
          S.over(ryan, G.player, 1.8);
          await S.say(E, 'Eu conheço aquela pessoa há muito tempo.');
          await S.say(E, 'É o meu irmão. Todo mundo achava que ele estava morto há dez anos.');
          S.over(G.player, ryan, 1.8);
          await S.say(ryan, 'O quê?! Teu irmão?!');
        });
        S.despawn('irmao');
      } },
    ],
  },
  // ======================= A FOTOGRAFIA =======================
  {
    id: 'fotografia', title: 'A Fotografia', start: (G) => [safehouse(G).door[0], safehouse(G).door[1] + 3], after: 'irmao', next: 'mansao', hint: 'Examine o livro na casa de Ryan.',
    stages: [
      { name: 'foto', async run(S, G) {
        const H = safehouse(G);
        const ryan = ryanNPC(S, H.door[0] - 1.6, H.door[1] + 2.5, 0); ryan.behavior = 'stand';
        S.objective('Examine o livro com Ryan', [H.door[0], H.door[1] + 3]);
        await S.press([H.door[0], H.door[1] + 3], 3, '[E] Examinar o livro');
        S.clearObjective();
        await S.cutscene(async () => {
          S.frame(G.player, ryan, 1, 2.8);
          const src = G.storyPhoto('irmaoPolicial');
          await G.showDocument('Fotografia encontrada dentro do livro', `<img src="${src}" style="width:100%" alt="Fotografia do irmão de Ethan com um policial, datada de 12/08/2027"><p style="margin-top:10px">Data: <b>12/08/2027</b> — um dia antes da operação policial na favela que terminou com a prisão de Ethan.</p>`);
          G.addPhoto(src, 'Fotografia do livro — 12/08/2027');
          await S.say(E, 'Meu irmão? Ele fez isso? Não acredito...');
          S.over(ryan, G.player, 1.8);
          await S.say(E, 'Vamos invadir aquela mansão hoje à noite, eu, você e só 1 guarda.');
        });
      } },
      { name: 'viagem', async run(S, G) {
        const H = safehouse(G);
        if (S.resumed) S.placePlayer(H.door[0], H.door[1] + 4, 0);
        const ryan = ryanNPC(S, G.player.x + 1.5, G.player.z + 1); S.follow(ryan, true);
        const g = S.npc('guardaMansao', allyGuardLook(), { x: G.player.x - 1.5, z: G.player.z + 1, name: 'Guarda', hp: 260, damage: 12, interactable: false }); S.follow(g, true);
        await S.goto(G.zones.spots.mansionApproach, 16, 'Dirija até a mansão de Lucas (você controla a viagem)');
        await S.fadeOut(1.2); G.setHour(23.6);
        await S.card('Mais tarde, naquela noite', '', 2);
      } },
    ],
  },
  // ======================= A MANSÃO =======================
  {
    id: 'mansao', title: 'A Mansão', auto: true, next: 'galpao', hint: 'Invasão silenciosa.',
    stages: [
      { name: 'infiltracao', async run(S, G) {
        const Z = G.zones.spots;
        G.setHour(23.6);
        S.placePlayer(Z.mansionApproach[0], Z.mansionApproach[1], Math.PI);
        const ryan = ryanNPC(S, Z.mansionApproach[0] + 1.5, Z.mansionApproach[1] + 2); ryan.behavior = 'stand'; ryan.pose = null;
        const g = S.npc('guardaMansao', allyGuardLook(), { x: Z.mansionApproach[0] - 1.5, z: Z.mansionApproach[1] + 2, name: 'Guarda', hp: 260, damage: 12, interactable: false }); g.behavior = 'stand';
        S.follow(ryan, true); S.unfollow(ryan); S.follow(g, true); S.unfollow(g); ryan.behavior = 'stand'; g.behavior = 'stand'; ryan.team = g.team = 'ally';
        S.car('carroInvasao', 'suv', 0x101012, Z.mansionCarOut[0], Z.mansionCarOut[1] + 8, Math.PI);
        Z.guardRoutes.forEach((route, i) => {
          const n = S.npc('seg' + i, mansionGuardLook(), { x: route[0][0], z: route[0][1], name: 'Segurança', role: 'enemy', team: 'enemy', behavior: 'guard', route, hp: 60, damage: 8, interactable: false, walk: 1.3 });
          n.team = 'enemy'; n.tag = 'mansao';
        });
        if (S.fade > 0) await S.fadeIn(1);
        S.startAlert({ range: 15, fov: 0.8, rate: 75 });
        G.toast('C: agachar · F por trás: nocautear em silêncio', 4);
        await S.goto(Z.mansionDoor, 2.2, 'Entre na mansão sem ativar o alarme', { foot: true });
        S.stopAlert();
      } },
      { name: 'lucas', async run(S, G) {
        const Z = G.zones.spots;
        G.setHour(23.8);
        // limpa a ronda externa
        for (let i = 0; i < 7; i++) { const n = S.get('seg' + i); if (n && n.behavior !== 'down') { n.behavior = 'stand'; n.team = 'neutral'; n.x = n.homeX; n.z = n.homeZ; } }
        S.placePlayer(Z.mansionHall[0], Z.mansionHall[1] + 1, Math.PI);
        const ryan = ryanNPC(S, G.player.x + 1.4, G.player.z + 1.2); const g = S.npc('guardaMansao', allyGuardLook(), { x: G.player.x - 1.4, z: G.player.z + 1.2, name: 'Guarda', hp: 260, damage: 12 });
        S.follow(ryan, true); S.follow(g, true);
        const lucas = S.npc('lucas', 'lucas', { x: Z.lucasHall[0], z: Z.lucasHall[1] - 1, role: 'story', heading: 0, behavior: 'scripted', interactable: false });
        lucas.faceTo = [G.player.x, G.player.z];
        const hg = [];
        for (let i = 0; i < 3; i++) hg.push(hostile(S, 'hallSeg' + i, mansionGuardLook(), Z.lucasHall[0] - 4 + i * 4, Z.lucasHall[1] + 0.5, 'hall', { name: 'Segurança', hp: 70, damage: 7 }));
        hg.forEach((n) => { n.behavior = 'scripted'; n.faceTo = [G.player.x, G.player.z]; });
        await S.cutscene(async () => {
          S.frame(G.player, lucas, 1, 3.6, 1.7);
          await S.say(lucas, 'Ethan Cross?! Que porra você está fazendo aqui?!');
          S.over(lucas, G.player, 2);
          await S.say(E, 'Parece que você não esperava minha visita.');
        });
        hg.forEach((n) => { n.behavior = 'hostile'; });
        // Lucas foge para a garagem durante o confronto
        lucas.behavior = 'scripted'; lucas.goalSpeed = 5; lucas.goal = [Z.garageCar[0] - 3, Z.garageCar[1] + 5];
        const lcar = S.car('carroLucas', 'sedan', 0x0a0a0a, Z.garageCar[0], Z.garageCar[1], Math.PI);
        S.failChecks = [() => G.player.hp <= 0 ? 'Ethan foi derrotado' : null];
        S.objective('Enfrente os seguranças — Lucas está fugindo!', null);
        const t0 = S.t;
        await S.until(() => enemiesAlive(G, 'hall').length === 0 || S.t - t0 > 25);
        S.failChecks = null;
        enemiesAlive(G, 'hall').forEach((n) => n.knockDown(0));
        await S.cutscene(async () => {
          lucas.x = lcar.x - 2; lucas.z = lcar.z + 2; S.seat(lucas, lcar, -1);
          S.shot([Z.garageCar[0] - 8, 2.4, Z.garageCar[1] + 14], [lcar.x, 1, lcar.z]);
          G.sound('screech');
          G.aiDrivers.push(new RouteDriver(lcar, [[lcar.x, lcar.z + 12], [Z.mansionGate[0], Z.mansionGate[1] - 4], [150.25, -300]], { speed: 14, rubber: false }));
          await S.wait(2.6);
        });
        S.clearObjective();
      } },
      { name: 'perseguicao', async run(S, G) {
        const Z = G.zones.spots;
        G.setHour(23.9);
        const lcar = S.car('carroLucas', 'sedan', 0x0a0a0a, 150.25, -300, 0);
        const lucas = S.npc('lucas', 'lucas', { x: lcar.x, z: lcar.z, role: 'story', interactable: false }); if (!lucas.inCar) S.seat(lucas, lcar, -1);
        G.aiDrivers = G.aiDrivers.filter((d) => d.car !== lcar);
        const myCar = S.car('carroInvasao', 'suv', 0x101012, Z.mansionCarOut[0], Z.mansionCarOut[1] + 8, Math.PI);
        if (S.resumed || G.car !== myCar) { S.putInCar(myCar); myCar.place(150.25, -326 + 0, 0); }
        const ryan = ryanNPC(S, myCar.x, myCar.z); S.follow(ryan, true);
        const g = S.npc('guardaMansao', allyGuardLook(), { x: myCar.x, z: myCar.z, name: 'Guarda', hp: 260 }); S.follow(g, true);
        if (G.car) S.onEnterCar(G.car);
        const route = [[150.25, -240], [150.25, -150], [150.25, -76], [150.25, -3], [160, 1.75], [234, 1.75], [326, 1.75], [328.25, 14], [338, 23.75], [341, 40]];
        const rd = new RouteDriver(lcar, route, { speed: 27, player: G.player });
        G.aiDrivers.push(rd);
        let far = 0;
        S.failChecks = [() => { const d = Math.hypot(lcar.x - G.player.x, lcar.z - G.player.z); far = d > 210 ? far + 1 / 60 : 0; return far > 7 ? 'Lucas escapou — MISSÃO FRACASSADA' : null; }];
        S.objective('Persiga Lucas', () => [lcar.x, lcar.z]);
        await S.until(() => rd.done);
        S.failChecks = null; S.clearObjective();
        G.vibe('mansao');
      } },
    ],
  },
  // ======================= O GALPÃO =======================
  {
    id: 'galpao', title: 'O Galpão', auto: true, next: 'investigacao', hint: 'Lucas se esconde num galpão abandonado.',
    stages: [
      { name: 'confronto', async run(S, G) {
        const Z = G.zones.spots;
        G.setHour(0.2);
        if (S.resumed || !G.car) S.placePlayer(Z.galpaoCarSpot[0] - 6, Z.galpaoCarSpot[1], Math.PI / 2);
        const ryan = ryanNPC(S, G.player.x + 2, G.player.z + 1); S.follow(ryan, true);
        const g = S.npc('guardaMansao', allyGuardLook(), { x: G.player.x - 2, z: G.player.z + 1, name: 'Guarda', hp: 260, damage: 12 }); S.follow(g, true);
        const lcar = S.car('carroLucas', 'sedan', 0x0a0a0a, Z.galpaoCarSpot[0], Z.galpaoCarSpot[1], 0);
        const lucas = S.npc('lucas', 'lucas', { x: Z.galpaoBack[0], z: Z.galpaoBack[1], role: 'story', interactable: false }); if (lucas.inCar) S.unseat(lucas);
        lucas.x = Z.galpaoBack[0]; lucas.z = Z.galpaoBack[1]; lucas.behavior = 'scripted'; lucas.pose = null; lucas.faceTo = [Z.galpaoDoor[0], Z.galpaoDoor[1]];
        G.aiDrivers = G.aiDrivers.filter((d) => d.car !== lcar);
        const [ix, iz] = Z.galpaoInside;
        for (let i = 0; i < 6; i++) hostile(S, 'gs' + i, mansionGuardLook(), ix + (i % 3) * 3 - 1, iz + (Math.floor(i / 3) * 6 - 3), 'galpao', { name: 'Capanga', hp: 55, damage: 5 });
        for (let i = 0; i < 3; i++) hostile(S, 'cp' + i, policeLook(), ix + 8, iz - 3 + i * 3, 'galpao', { name: 'Policial corrupto', hp: 65, damage: 6 });
        S.failChecks = [() => G.player.hp <= 0 ? 'Ethan foi derrotado' : null];
        S.objective('Entre no galpão e enfrente o grupo (F para golpear)', Z.galpaoDoor);
        await S.until(() => enemiesAlive(G, 'galpao').length === 0);
        S.failChecks = null; S.clearObjective();
      } },
      { name: 'interrogatorio', async run(S, G) {
        const Z = G.zones.spots;
        G.setHour(0.4);
        if (S.resumed) S.placePlayer(Z.galpaoInside[0], Z.galpaoInside[1], Math.PI / 2);
        const ryan = ryanNPC(S, G.player.x + 2, G.player.z + 1); S.follow(ryan, true);
        const g = S.npc('guardaMansao', allyGuardLook(), { x: G.player.x - 2, z: G.player.z + 1, name: 'Guarda', hp: 260 }); S.follow(g, true);
        const lucas = S.npc('lucas', 'lucas', { x: Z.galpaoBack[0], z: Z.galpaoBack[1], role: 'story', interactable: false });
        lucas.behavior = 'scripted'; lucas.pose = 'handsup'; lucas.faceTo = [G.player.x, G.player.z];
        S.objective('Capture Lucas', () => [lucas.x, lucas.z]);
        await S.press(() => [lucas.x, lucas.z], 2.4, '[E] Capturar Lucas');
        S.clearObjective();
        await S.cutscene(async () => {
          lucas.faceTo = [G.player.x, G.player.z]; ryan.behavior = 'stand'; g.behavior = 'stand';
          S.frame(G.player, lucas, 1, 2.6, 1.6);
          await S.say(E, 'O que você sabe? AGORA PORRA!!!!!');
          S.over(G.player, lucas, 1.6);
          await S.say(lucas, 'Eu... eu... eu não sei de nada, o que você quer de mim?');
          S.over(lucas, G.player, 1.6);
          await S.say(E, 'Você nos traiu.');
          S.over(G.player, lucas, 1.4);
          S.showDialog('Lucas', 'Não fui eu, mas foi...', '');
          await S.wait(1.6);
          S.hideDialog();
          G.sound('shot'); G.flash(); G.shake(0.3);
          lucas.knockDown(0); lucas.setLying(-Math.PI / 2, 0.15);
          await S.wait(1.6);
          S.frame(G.player, lucas, -1, 3, 1.9);
          await S.say(E, 'Ah merda... Você me entregou...');
        });
        G.vibe('galpao');
      } },
      { name: 'misterio', async run(S, G) {
        const Z = G.zones.spots;
        G.setHour(0.5);
        if (S.resumed) S.placePlayer(Z.galpaoInside[0], Z.galpaoInside[1], -Math.PI / 2);
        const lucas = S.npc('lucas', 'lucas', { x: Z.galpaoBack[0], z: Z.galpaoBack[1], role: 'story', interactable: false }); if (lucas.behavior !== 'down') { lucas.knockDown(0); lucas.setLying(-Math.PI / 2, 0.15); }
        const ryan = ryanNPC(S, G.player.x + 2, G.player.z + 1); S.follow(ryan, true);
        const lcar = S.car('carroLucas', 'sedan', 0x0a0a0a, Z.galpaoCarSpot[0], Z.galpaoCarSpot[1], 0);
        await S.goto([Z.galpaoCarSpot[0] - 4, Z.galpaoCarSpot[1]], 4, 'Corra até o carro', { foot: true });
        const [mx, mz] = [Z.galpaoCarSpot[0] - 12, Z.galpaoCarSpot[1] - 8];
        const mystery = S.npc('misterio', 'mystery', { x: mx, z: mz, role: 'story', interactable: false, behavior: 'scripted' });
        mystery.faceTo = [G.player.x, G.player.z];
        // Ryan desaparece (o que aconteceu com ele não é revelado)
        S.despawn('ryan'); const gg = S.get('guardaMansao'); if (gg) { S.unfollow(gg); gg.behavior = 'stand'; }
        G.carsLocked = true;
        await S.cutscene(async () => {
          S.over(G.player, mystery, 2.4);
          await S.wait(0.6);
          await S.say(E, 'EI! VOCÊ!');
          mystery.behavior = 'flee'; mystery.runSpeed = 6.4;
          mystery.route = [[330, 40], [330, 4], [318, -20], [300, -20], [296, 0], [278, 4], [255, 9], [238, 30], [236, 70]];
          S.shot([G.player.x + 3, 2.4, G.player.z + 3], [mystery.x, 1.4, mystery.z], 1.5);
          await S.wait(1.2);
          S.frame(G.player, lcar, 1, 4);
          await S.say(E, 'RYAN?! CADÊ VOCÊ?!');
        });
        S.objective('Persiga a pessoa misteriosa (a pé)', () => [mystery.x, mystery.z]);
        await S.until(() => mystery.fled);
        await S.fadeOut(0.8);
        S.despawn('misterio'); G.carsLocked = false; S.clearObjective();
        await S.card('A pessoa conseguiu escapar.', 'Ryan desapareceu.', 3.2);
        G.campaign().flags.ryanDesaparecido = true;
      } },
    ],
  },
  // ======================= INVESTIGAÇÃO =======================
  {
    id: 'investigacao', title: 'Culpado??', auto: true, next: null, hint: 'Alguém está investigando Ethan.',
    stages: [
      { name: 'sala', async run(S, G) {
        const Z = G.zones.spots; const [rx, ry, rz] = Z.invChair;
        if (S.fade < 1) await S.fadeOut(0.6);
        G.zones.investigatorPhoto.map = G.storyPhotoTexture('culpado'); G.zones.investigatorPhoto.needsUpdate = true;
        G.zones.investigatorLamp.intensity = 6;
        const inv = S.npc('investigador', 'investigator', { x: rx, z: rz + 0.6, y: ry, role: 'story', interactable: false, heading: Math.PI });
        inv.fixedY = true; inv.y = ry; inv.behavior = 'chair';
        await S.cutscene(async () => {
          const [cx, cy, cz] = Z.invCam, [lx, ly, lz] = Z.invLook;
          S.shot([cx, cy, cz], [rx, ry + 1.2, rz], 4, [lx + 0.3, ly + 0.9, lz + 0.55], [lx, ly, lz]);
          await S.fadeIn(1.4);
          await S.wait(4.5);
          await S.fadeOut(1.2);
        });
        S.despawn('investigador'); G.zones.investigatorLamp.intensity = 0;
        S.placePlayer(Z.galpaoCarSpot[0] - 6, Z.galpaoCarSpot[1] - 10, Math.PI);
        await S.fadeIn(1);
        G.vibe('investigacao');
        G.phone.addNews('Morte em galpão segue sem explicação', 'Fontes dizem que um investigador acompanha o caso de perto.');
      } },
    ],
  },
];
