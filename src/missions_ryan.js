// Campanha de Ryan Cole (independente). Segue o documento oficial.
// O conteúdo do primeiro contrato (caso aceito) ainda não foi definido pelo autor.
import { CHARACTERS } from './characters.js';
import { PLACES } from './places.js';

const R = 'Ryan';

export const RYAN_MISSIONS = [
  {
    id: 'r_contrato', title: 'O Contrato', auto: true, next: null, hint: 'Uma ligação oferece um contrato.',
    stages: [
      { name: 'ligacao', async run(S, G) {
        const H = G.city.ethanHouse;
        if (S.resumed || !G.campaign().pos) S.placePlayer(H.door[0], H.door[1] + 4, 0);
        await S.wait(1.5);
        G.sound('ring'); G.player.phone = true;
        await S.cutscene(async () => {
          S.over({ x: G.player.x + 1, z: G.player.z + 2, y: G.player.y }, G.player, 2);
          await S.say('Celular', '📱 Número privado está ligando...');
          await S.say('Número privado', 'Ryan Cole? Tenho um contrato pra você. O pagamento é bom.');
          await S.say('Número privado', 'Aceita?');
          const i = await S.choose([{ text: 'Aceitar o contrato' }, { text: 'Recusar o contrato' }], 'Ryan');
          const C = G.campaign();
          C.contracts.push({ id: 'c1', title: 'Contrato — número privado', status: i === 0 ? 'aceito' : 'recusado', text: i === 0 ? 'Aguardando instruções.' : 'Você recusou esta proposta.' });
          G.phone.addCall('Número privado', i === 0 ? 'Contrato aceito' : 'Contrato recusado');
          if (i === 0) {
            await S.say(R, 'Aceito. Me manda os detalhes.');
            await S.say('Número privado', 'Você vai receber as instruções.');
            C.flags.contrato1 = 'aceito';
          } else {
            await S.say(R, 'Não, obrigado.');
            C.flags.contrato1 = 'recusado';
          }
        });
        G.player.phone = false;
      } },
    ],
  },
  {
    id: 'r_fernando', title: 'A Casa das Câmeras', auto: true, requires: (C) => C.flags.contrato1 === 'recusado', next: null, hint: 'Outra pessoa oferece um trabalho diferente.',
    stages: [
      { name: 'proposta', async run(S, G) {
        await S.wait(2);
        G.sound('ring'); G.player.phone = true;
        await S.cutscene(async () => {
          S.over({ x: G.player.x + 1, z: G.player.z + 2, y: G.player.y }, G.player, 2);
          await S.say('Celular', '📱 Outro número está ligando...');
          await S.say('Desconhecido', 'Ryan. Tenho um trabalho diferente pra você.');
          await S.say('Desconhecido', 'Uma casa monitorada por câmeras. Nenhum segurança.');
          await S.say('Desconhecido', 'Vou te mandar um equipamento: o Pulso Eletrônico. Ele desliga as câmeras por alguns segundos.');
        });
        G.player.phone = false;
        const C = G.campaign(); C.tools.pulso = true;
        C.contracts.push({ id: 'c2', title: 'Trabalho — casa monitorada', status: 'aceito', text: 'Entrar na casa monitorada por câmeras.' });
        C.notes.push({ type: 'caso', title: 'Casa monitorada', text: 'Casa com câmeras, sem segurança física. Local marcado no mapa.' });
        G.toast('Ferramenta desbloqueada: Pulso Eletrônico (tecla Q)', 4);
        G.phone.addMessage('Desconhecido', 'O endereço está no seu mapa.');
        await S.goto(G.zones.spots.fernandoFront, 14, 'Vá até a casa monitorada');
      } },
      { name: 'casa', async run(S, G) {
        const Z = G.zones.spots;
        if (G.state.hour > 5 && G.state.hour < 19) { await S.fadeOut(0.6); G.setHour(1.5); await S.fadeIn(0.6); }
        if (S.resumed || S.retry) S.placePlayer(Z.fernandoFront[0], Z.fernandoFront[1] + 4, Math.PI);
        // Fernando dormindo na cama (cabeça na cabeceira)
        const [bx, bz] = Z.fernandoBed, [hx, hz] = Z.fernandoBedHead;
        const fer = S.npc('fernando', 'fernando', { x: bx + (bx - hx) * 1.1, z: bz + (bz - hz) * 1.1, role: 'story', interactable: false, behavior: 'sleep' });
        fer.heading = Math.atan2(bx - hx, bz - hz); fer.fixedY = true; fer.y = 0.15 + 0.6 - 0.55;
        fer.behavior = 'sleep'; fer.setLying(-Math.PI / 2, 0.67);
        for (const c of Z.fernandoCams) S.addCamera(c.p[0], c.y, c.p[1], c.yaw, c.sweep);
        S.startAlert({ rate: 85 });
        G.toast('Q: Pulso Eletrônico · C: agachar', 4);
        await S.goto([bx + (bx - hx) * 1.5 + 0.8, bz + (bz - hz) * 1.5], 2.2, 'Entre na casa sem ser visto pelas câmeras', { foot: true });
        S.stopAlert();
        let choice = -1;
        await S.cutscene(async () => {
          S.shot([bx + 1.6, 1.9, bz + 1.2], [bx, 0.8, bz]);
          await S.wait(1);
          await S.say(R, 'Fernando del Costa...');
          choice = await S.choose([{ text: 'Eliminar Fernando enquanto ele dorme' }, { text: 'Acordar Fernando e interrogá-lo' }], 'Ryan');
          const C = G.campaign();
          if (choice === 0) {
            await S.fadeOut(1);
            await S.card('Fernando del Costa foi eliminado.', '', 2.6);
            C.flags.fernando = 'eliminado'; S.despawn('fernando');
            await S.fadeIn(0.8);
          } else {
            fer.behavior = 'scripted'; fer.setLying(0, 0); fer.fixedY = false; fer.y = 0.15;
            fer.x = bx - 1.2; fer.z = bz; fer.faceTo = [G.player.x, G.player.z];
            S.frame(G.player, fer, 1, 2.5);
            await S.say(R, 'Acorda, Fernando.');
            await S.say(fer, 'Ryan?! O que você está fazendo aqui?!');
            await S.say(fer, 'SOCORRO! ALGUÉM ME AJUDA!');
            C.flags.fernando = 'interrogado';
          }
        });
        if (choice === 1) {
          // o alerta sobe e Ryan precisa escapar
          S.startAlert({ rate: 85 }); S.addAlert(40); S.alert.camFactor = 0.35;
          const fer2 = S.get('fernando'); if (fer2) { fer2.behavior = 'stand'; fer2.pose = null; }
          const [fx, fz] = Z.fernandoFront; const HX = PLACES.fernando.x, HZ = PLACES.fernando.z;
          S.objective('Fuja da casa antes que o alerta chegue a 100', [fx, fz + 45]);
          await S.until((dt) => { S.addAlert(3 * dt); return Math.hypot(G.player.x - HX, G.player.z - HZ) > 55; });
          S.stopAlert(); S.clearObjective();
        } else {
          await S.goto(Z.fernandoFront, 6, 'Saia da casa');
        }
        G.vibe('fernando');
      } },
    ],
  },
];
