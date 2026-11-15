# OPERATION: IRON SHADOW

FPS militar single-player em 3D — guerra moderna fictícia, 2029.
O Capitão **Daniel Mercer** e a Força-Tarefa Iron investigam a organização
**VÉRTICE**, responsável por ataques coordenados pelo mundo.

> **Estado atual: v0.6 — Missões 1 a 5 jogáveis do início ao fim.**
>
> **Missão 5 — "Infiltração Noturna"** (noite): entre pela grade do esgoto na mansão
> do Serrat, evite guardas com lanternas (cone de visão, luz, postura, ruído, corpos
> encontrados), baixe a lista de convidados na guarita, grave a reunião com o microfone
> laser e fuja até o Falcon. Se o alarme disparar, chegam reforços. Visão noturna (N).
>
> **Missão 4 — "Céu Cinzento"** (céu nublado): na metralhadora da porta do helicóptero
> Falcon 2-1, destrua três baterias antiaéreas e um comboio ao longo do vale de Kessel;
> depois, pouso e assalto à base de radar do VÉRTICE — e o Serrat foge de jato.
>
> **Missão 3 — "Porto de Vareny"** (amanhecer): portão, pátio de contêineres com
> atirador no guindaste, tiroteio no cais, abordagem do cargueiro Kestrel Star pela
> prancha, combate no convés, a revelação de quem está por trás do VÉRTICE e a fuga
> antes do navio explodir.
>
> **Missão 2 — "Sinal Morto"** (entardecer): sem rádio, a equipe sai do Halden,
> enfrenta uma patrulha na avenida, rompe um bloqueio na rua transversal, toma
> a estação de TV de Teresk e defende o transmissor — mas quem responde não é a coalizão.
>
> **Missão 1 — "Primeiro Contato"**:
> Abertura no helicóptero → pouso no distrito de Teresk → emboscada do atirador →
> combate em três ondas pela Avenida Verkhov → arrombamento do Edifício Halden →
> combate no saguão → download dos servidores sob contra-ataque → reviravolta.

## Como jogar

```bash
npm install
npm run dev
```
Abra `http://localhost:5173` no Chrome/Edge/Firefox (PC com placa de vídeo).
Clique em **Nova campanha**. O mouse é capturado ao clicar na tela.

| Tecla | Ação |
|---|---|
| W A S D | Mover |
| Shift | Correr |
| C (alternar) / Ctrl (segurar) | Agachar |
| Espaço | Pular |
| Botão esquerdo / direito | Atirar / Mirar |
| R | Recarregar |
| G | Granada |
| V ou F | Golpe corpo a corpo |
| 1, 2, Q, roda do mouse | Trocar arma |
| E | Interagir (caixas de munição, portas) |
| I | Inspecionar a arma |
| Shift (mirando com luneta) | Prender a respiração (reduz o balanço) |
| N | Visão noturna (Missão 5) |
| Esc / P | Pausar |

Configurações: qualidade gráfica (Baixa/Média/Alta), sensibilidade, FOV,
volumes, inverter Y, legendas, vozes provisórias, contador de FPS.

## O que está implementado (de verdade)

- **Mundo 3D real** com colisão: distrito urbano com ~25 prédios jogáveis,
  cidade de fundo procedural, ruas, calçadas, praça, carros, barricadas, entulho.
- **Jogador**: movimento fluido com aceleração, corrida, agachar, pulo,
  balanço de câmera, passos, recuo, tremor de câmera, vida com regeneração,
  indicadores de direção de dano, morte e reinício do checkpoint.
- **Seis armas fictícias** com texturas PBR de desgaste: VK-7 (fuzil), MK-9
  (submetralhadora), BRK-12 (escopeta de bomba, 9 chumbos), LR-6 (fuzil de
  precisão com luneta), P-11 (pistola) e P-11S (pistola com silenciador). Armas de inimigos abatidos e de caixas
  no mapa podem ser recolhidas (E) para trocar a arma principal ou pegar munição.
  Tiro hitscan com dispersão,
  queda de dano por distância, tiro na cabeça, ADS, recarga tática/vazia,
  troca de arma, cápsulas ejetadas, clarão, rastros, decalques de impacto,
  granadas com quique e explosão.
- **Armas mais realistas**: ferrolho/ferrolho da pistola que se movem a cada tiro (pistola trava
  aberta quando vazia), miras mecânicas, módulo de lanterna/laser, recarga coreografada (a mão
  busca o carregador no colete, o vazio cai e fica no chão), puxar o ferrolho na recarga vazia,
  escopeta carregada cartucho a cartucho, inspeção (I), arma recua ao encostar na parede,
  fumaça no cano após rajadas, balanço da luneta com respiração, som próprio para
  silenciador, escopeta e fuzil de precisão.
- **Personagens** com rosto esculpido, membros com volume, colete com
  carregadores, capacete com trilhos e jugular; inimigos com balaclava ou máscara de gás.
- **Céu e atmosfera**: nuvens volumétricas animadas, raios de sol (Alto/Ultra), reflexo de lente,
  correção de cor própria para manhã, nublado, entardecer e amanhecer.
- **Gráficos**: níveis Baixo/Médio/Alto/Ultra, oclusão de ambiente (GTAO), bloom,
  aberração cromática e nitidez, janelas acesas à noite; **resolução dinâmica** mantém o FPS estável.
- **Desempenho**: soldados como malha única com esqueleto (skinning na GPU), animação reduzida para
  soldados distantes/inativos, shaders pré-compilados no carregamento (sem travadas no combate).
- **Vozes sincronizadas** com as legendas (cada fala espera a voz terminar).
- **Golpe corpo a corpo** (V/F) e **câmera lenta** ao abater o último inimigo de cada área;
  parceiros abatem inimigos e aparecem no feed de abates.
- **IA aliada** (Kane, Ruiz, Okafor): avança por pontos de cobertura,
  engaja inimigos, fala durante o combate.
- **IA inimiga** (VÉRTICE): procura cobertura real (teste de linha de visada),
  espia e atira em rajadas, muda de posição, reage a supressão, avança quando
  restam poucos; atirador de elite com reflexo da luneta, RPG roteirizado,
  metralhadora, inimigos em telhados e varandas; sistema de "tokens" para
  controlar quantos atiram com precisão no jogador ao mesmo tempo.
- **Missão 1 completa** roteirizada com diálogos, objetivos com marcador, câmera lenta
  no momento do disparo, arrombamento com carga explosiva, interior do Edifício
  Halden (saguão, corredor, sala dos servidores), defesa durante o download com
  barra de progresso e a primeira reviravolta da história. Checkpoints automáticos.
- **Efeitos**: chuva, neblina, fumaça, fogo com luz, explosões, poeira do rotor,
  céu físico, sombras suaves, pós-processamento (bloom, vinheta, gradação).
- **Áudio 3D procedural**: helicóptero (dentro/fora), tiros com eco urbano,
  zunido de balas próximas, explosões, ensurdecimento, batalha distante,
  música adaptativa.

## Testes

```bash
npm test          # unitários: colisão, navegação A*, armas, saves
npm run test:e2e  # jogatina automatizada das missões 1 a 4 no Chromium + capturas
```

## Documentação

- `docs/TECNICO.md` — motor escolhido, limitações, estrutura do código
- `docs/RECURSOS.md` — arte/animação/áudio provisórios e o que substituir
- `docs/ROADMAP.md` — próximas etapas da campanha
