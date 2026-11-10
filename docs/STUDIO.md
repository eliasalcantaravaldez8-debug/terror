# NEXPLAY STUDIO

## Formato de projeto (`nexplay-project` v1)

Definido em `shared/project.js`. Resumo:

```jsonc
{
  "format": "nexplay-project", "version": 1,
  "meta": { "name": "...", "genre": "futebol", "dimension": "3d" },
  "settings": {
    "environment": { "timeOfDay": 14, "dayNightCycle": { "enabled": false, "minutesPerDay": 20 },
      "fog": { "enabled": true, "color": "#b7cde0", "density": 0.0022 },
      "weather": { "rain": { "enabled": false, "intensity": 0.6 }, "snow": {}, "wind": 0.3, "lightning": false },
      "sky": { "turbidity": 2.5, "rayleigh": 1.1 }, "ambientIntensity": 0.35, "exposure": 0.9 },
    "rendering": { "quality": "high", "shadows": { "enabled": true }, "bloom": { "enabled": true }, "ssao": { "enabled": false } },
    "physics": { "gravity": -9.81 }
  },
  "player": { "entityId": "...", "controller": "third_person", "speed": 5, "jumpForce": 6, "health": 100 },
  "entities": [ { "id": "...", "name": "...", "type": "structure", "transform": { "position": [0,0,0], "rotation": [0,0,0], "scale": [1,1,1] }, "props": { "kind": "cabin" }, "components": {} } ],
  "materials": { "madeira": { "preset": "planks", "textureScale": 2 } },
  "scripts": { "placar.js": { "source": "...", "attachedTo": null } },
  "missions": [], "dialogues": [], "ui": { "hud": {}, "menus": [] }, "systems": {}, "assets": [], "audio": {}
}
```

Tipos de entidade: `primitive, model, terrain, water, light, character, npc, vegetation, structure, particles, spawn, trigger, pickup, vehicle, ball, audio_source, sprite, tilemap, platform2d`.

Toda alteração (editor, IA, Autopilot, API `/api/projects/:id/ops`) usa as operações de `applyOps`: `add_entity, update_entity, remove_entity, set_settings, set_player, set_material, write_script, delete_script, upsert_mission, remove_mission, upsert_dialogue, remove_dialogue, set_system, set_ui, set_meta, set_audio`.

## Motor (runtime)

- Renderização: three.js WebGL2, ACES, sombras PCF/VSM, bloom, GTAO, SMAA (ultra), mapa de ambiente do céu (PMREM).
- Ambiente: céu físico (Sky), sol pela hora do dia, lua, estrelas, ciclo dia/noite, neblina, chuva, neve, raios com trovão.
- Materiais PBR procedurais (albedo, normal e ORM gerados por ruído tileável): grama, gramado, terra, areia, rocha, pedra, concreto, asfalto, tijolo, madeira, casca, tábuas, metal, metal enferrujado, ouro, plástico, borracha, tecido, couro, vidro, mármore, neve, gelo, lava, pele, água. Texturas importadas também.
- Natureza: terreno por fBm com área plana, variação macro e tinta por inclinação; água com reflexo; vegetação instanciada com vento no shader (grama, árvores, pinheiros, árvores secas, arbustos, flores, pedras, cogumelos).
- Estruturas procedurais: estádio com arquibancadas, torcida animada, cobertura, LED e refletores; gols com rede; cabana; casa; torre; muro; cerca; ponte; rampa; postes; fogueira; barraca; ruínas; estrada/circuito com zebras; arquibancada; checkpoint.
- Personagens: humanoide hierárquico com 20+ animações procedurais (andar, correr, sprint, pular, chutar, passar, driblar, comemorar, acenar, atacar, morrer, sentar, dirigir, nadar, escalar, defesa do goleiro…) com transições suaves e cadência pela velocidade. Modelos `.glb` usam AnimationMixer.
- Gameplay: controles terceira pessoa, primeira pessoa, veículo, futebol, plataforma 2D e visão de cima 2D; colisões; bola; IA de NPCs (vagar, patrulhar, perseguir, seguir, fugir, guardar, jogador de futebol, goleiro); missões e objetivos; diálogos com escolhas; partida de futebol com placar e relógio; corrida com voltas; HUD, minimapa, menus e controles de toque.

## API de scripts (modo avançado)

Um script é o corpo de uma função que recebe `api` e retorna ganchos:

```js
let t = 0;
return {
  start() { api.ui.toast('Começou!'); },
  update(dt) { t += dt; },
  onTrigger(event, entity) { if (event === 'porta') api.missions.progress('porta'); },
  onEvent(name, data) { if (name === 'goal') api.audio.play('goal'); },
};
```

`api`: `THREE, scene, camera, project, self, entity(ref), entities(filtro), player, input.{isDown, pressed, axis}, spawn(def), ui.{toast, setHud, dialog, showMenu}, missions.{start, progress, active}, state, score.{add, get}, audio.play, physics.raycast, emit, on, time.elapsed, random, log`.

Bloqueado: rede (`fetch`, `WebSocket`, `XMLHttpRequest`), `eval`/`Function`/`import()`, armazenamento do navegador, cookies e acesso a `top`/`parent`. Scripts só rodam no player isolado.

## NEXPLAY AI

Especialidades (`server/ai/specialists.js`): Programadora, 3D, Texturas, Animação, Gameplay e Testadora. Cada uma tem instruções e um conjunto de ferramentas (`server/ai/tools.js`). Pedidos são executados como ferramentas sobre o projeto — não como texto. Toda execução com mudanças vira uma revisão desfazível no histórico. A IA registra com `report_limitation` o que não conseguiu fazer.

| Plano | Comandos/dia | Esforço do modelo | Iterações de ferramentas | Equipe (+Testadora) | Autopilot |
|---|---|---|---|---|---|
| FREE | N (padrão 25) | medium | 12 | — | — |
| PRO | 4 × N | high | 24 | sim | — |
| DELUXE | sem limite (proteção por minuto) | xhigh | 40 | sim | sim |
