// Missões secundárias (repetíveis) — atividades e trabalhos temporários previstos no documento.
// Não alteram a história principal. Disponíveis para Ethan e Ryan (dinheiro separado).
import * as THREE from 'three';
import { RouteDriver } from './drivers.js';
import { BW, bwRoad, bwRoadZ } from './places.js';
import { rand, pick } from './textures.js';

// anel de checkpoint
function ring(G, x, z, color = 0xffc23a) {
  const g = new THREE.Group();
  const t = new THREE.Mesh(new THREE.TorusGeometry(4.2, 0.25, 6, 28), new THREE.MeshBasicMaterial({ color, fog: false }));
  t.position.y = 4.4; g.add(t);
  const b = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 0.1, 24), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.25, depthWrite: false }));
  b.position.y = 0.06; g.add(b);
  g.position.set(x, G.world.groundFn(x, z), z); G.scene.add(g);
  return g;
}

// volta pelas ruas de Blackwood (sentido horário pela faixa da direita)
function raceRoute() {
  const L = 1.75; const x0 = bwRoad(1), x1 = bwRoad(3), z0 = bwRoadZ(1), z1 = bwRoadZ(3);
  return [[x0 - L, z0 + 20], [x0 - L, z1 - 12], [x0 + 12, z1 + L], [x1 - 12, z1 + L], [x1 + L, z1 - 12], [x1 + L, z0 + 12], [x1 - 12, z0 - L], [x0 + 12, z0 - L], [x0 - L, z0 + 12]];
}

export const SIDE_MISSIONS = [
  {
    id: 'corrida_bw', side: true, title: 'Corrida de Rua de Blackwood', hint: 'Praça de Blackwood. 2 voltas contra 3 corredores. Prêmio: R$ 1.500 (1º), R$ 600 (2º), R$ 250 (3º).',
    requires: (C, G) => G.state.blackwood, start: (G) => G.blackwood.spots.raceStart,
    stages: [{ name: 'corrida', async run(S, G) {
      const route = raceRoute(); const laps = 2;
      const [sx, sz] = route[0];
      // carro do jogador: usa o atual ou empresta um Coupé
      let car = G.car;
      if (!car) { car = S.car('carroCorrida', 'coupe', 0xd01818, sx, sz - 6, 0); S.putInCar(car); }
      car.place(sx, sz - 4, 0); car.speed = 0;
      const rivals = [];
      for (let i = 0; i < 3; i++) {
        const [ox, oz] = [[3.4, -4], [0, -11], [3.4, -11]][i];
        const c = S.car('rival' + i, pick(['coupe', 'luxo', 'sedan', 'furia']), pick([0x1a1a1a, 0xe8e8e8, 0x2a5aa8, 0xd8a010]), sx + ox, sz + oz, 0);
        const full = []; for (let l = 0; l < laps; l++) full.push(...route.slice(1), route[0]);
        const d = new RouteDriver(c, full, { speed: 23 + i * 2.2, player: G.player }); d.paused = true;
        rivals.push({ car: c, drv: d }); c.fuel = 1;
      }
      G.aiDrivers.push(...rivals.map((r) => ({ update: (dt, ctx) => { if (r.drv.paused) { r.car.update(dt, { brake: 1 }, ctx.cars); return; } r.drv.update(dt, ctx); }, car: r.car })));
      // contagem regressiva
      G.inputLocked = true;
      for (const n of ['3', '2', '1']) { G.toast(n, 0.9); G.sound('ping'); await S.wait(1); }
      G.toast('VAI!', 1.2); G.sound('cash'); G.inputLocked = false; rivals.forEach((r) => { r.drv.paused = false; });
      // checkpoints
      const cps = []; for (let l = 0; l < laps; l++) cps.push(...route.slice(1), route[0]);
      let next = 0; let mk = ring(G, ...cps[0]);
      const t0 = S.t;
      S.objective(`Corrida: checkpoint 1/${cps.length}`, () => cps[next]);
      S.failChecks = [() => (S.t - t0 > 240 ? 'Tempo esgotado — CORRIDA ENCERRADA' : null), () => (!G.car ? 'Você saiu do carro — CORRIDA ENCERRADA' : null)];
      let place = 1;
      try {
        await S.until(() => {
          const c = G.car; if (!c) return false;
          if (Math.hypot(c.x - cps[next][0], c.z - cps[next][1]) < 9) {
            next++; G.sound('ping'); G.scene.remove(mk);
            if (next >= cps.length) return true;
            mk = ring(G, ...cps[next]); S.objective(`Corrida: checkpoint ${next + 1}/${cps.length}`, () => cps[next]);
          }
          return false;
        });
      } finally { G.scene.remove(mk); S.failChecks = null; }
      // colocação: rivais que já terminaram ou estão à frente
      for (const r of rivals) if (r.drv.done || r.drv.i > next + 0.5) place++;
      const prize = [1500, 600, 250, 0][place - 1];
      S.clearObjective();
      G.addMoney(prize);
      await S.card(place === 1 ? 'VOCÊ VENCEU!' : `${place}º LUGAR`, prize ? `Prêmio: R$ ${prize.toLocaleString('pt-BR')} · Tempo ${(S.t - t0).toFixed(1)} s` : `Tempo ${(S.t - t0).toFixed(1)} s`, 3);
      G.phone.addPost({ user: 'bw_rachas', tag: 'RUMOR', text: `Racha de madrugada nas ruas de Blackwood. Dizem que ${place === 1 ? 'um desconhecido levou a melhor' : 'teve gente nova correndo'}.`, notify: false });
    } }],
  },
  {
    id: 'entregas', side: true, title: 'Trabalho: Entregas da Lanchonete do Joe', hint: 'Lanchonete do Joe (Los Valles). Leve 3 pedidos dentro do tempo. R$ 120 por entrega + gorjeta.',
    requires: () => true, start: (G) => { const l = G.city.landmarks.find((x) => x.name === 'Lanchonete do Joe'); return [l.x, l.z]; },
    stages: [{ name: 'entregas', async run(S, G) {
      const loops = G.city.pedLoops.filter((l) => l.type === 'res' && l.cx < 300);
      await S.say('Joe', 'Precisa de trabalho? Tenho três pedidos saindo agora. Pega um carro e capricha no tempo.', { sub: true });
      let paid = 0;
      for (let i = 0; i < 3; i++) {
        const lp = pick(loops); const side = Math.floor(rand() * 4); const h = lp.half;
        const pts = [[lp.cx, lp.cz - h], [lp.cx + h, lp.cz], [lp.cx, lp.cz + h], [lp.cx - h, lp.cz]];
        const dest = pts[side];
        const dist = Math.hypot(dest[0] - G.player.x, dest[1] - G.player.z);
        const limit = Math.round(25 + dist / 9);
        const t0 = S.t;
        S.objective(`Entrega ${i + 1}/3 — ${limit}s`, dest);
        let late = false;
        await S.until(() => {
          const left = Math.max(0, limit - (S.t - t0));
          S.objText = `Entrega ${i + 1}/3 — ${Math.ceil(left)}s`; document.getElementById('objective').textContent = 'OBJETIVO: ' + S.objText;
          if (left <= 0) { late = true; return true; }
          return S.near(dest, G.player.mode === 'car' ? 7 : 3);
        });
        if (late) { G.toast('O tempo acabou — o cliente cancelou. Fim do turno.', 3); break; }
        const tip = Math.round(Math.max(0, limit - (S.t - t0)) * 3);
        G.addMoney(120 + tip); paid += 120 + tip;
        G.toast(`Entregue! R$ 120 + gorjeta R$ ${tip}`, 2.5);
      }
      S.clearObjective();
      await S.card('Turno encerrado', `Você ganhou R$ ${paid.toLocaleString('pt-BR')}`, 2.5);
    } }],
  },
];
