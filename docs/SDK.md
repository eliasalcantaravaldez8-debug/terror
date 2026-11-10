# NEXPLAY SDK (jogos HTML5)

Seu jogo roda isolado em `SANDBOX_ORIGIN`. Para conversar com a NEXPLAY, inclua:

```html
<script src="https://SEU_SANDBOX/runtime/sdk/nexplay-sdk.js"></script>
```

(Em desenvolvimento: `http://localhost:3001/runtime/sdk/nexplay-sdk.js`. Você também pode copiar o arquivo `client/runtime/public/sdk/nexplay-sdk.js` para dentro do seu .zip.)

## Básico

```js
NEXPLAY.ready();
NEXPLAY.getPlayer().then((p) => console.log(p.displayName)); // só dados públicos
NEXPLAY.unlockAchievement('primeira_vitoria');                // crie o código no painel do criador
```

Conquistas de jogos não concedem NEX COINS (prevenção de fraude).

## Multiplayer

O jogador escolhe a sala na página da NEXPLAY (partida rápida pública, sala privada com código ou convite de amigo). O jogo recebe e envia mensagens:

```js
NEXPLAY.multiplayer.on('welcome', ({ you, host, peers, room }) => {});
NEXPLAY.multiplayer.on('peer_joined', ({ peer, host }) => {});
NEXPLAY.multiplayer.on('peer_left', ({ peer, host }) => {});
NEXPLAY.multiplayer.on('state', ({ from, data }) => {});        // estado contínuo
NEXPLAY.multiplayer.on('event', ({ from, name, data }) => {});  // eventos pontuais
NEXPLAY.multiplayer.on('start', () => {});                      // anfitrião iniciou

NEXPLAY.multiplayer.send('state', { x, y });
NEXPLAY.multiplayer.send('event', { dano: 10 }, 'acerto');
NEXPLAY.multiplayer.start(); // somente o anfitrião
```

Limites: 16 KB por mensagem, ~60 mensagens/s por jogador, máximo de jogadores definido na página do jogo. O servidor é um **relay**: a lógica autoritativa (quem venceu, validação de jogadas) é responsabilidade do jogo — normalmente executada pelo anfitrião.

Declare na página do jogo apenas os modos que o jogo realmente implementa; jogos sem multiplayer declarado não aparecem na aba MULTIPLAYER.
