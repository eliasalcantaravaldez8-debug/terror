# OPERATION: IRON SHADOW

FPS militar single-player em 3D — guerra moderna fictícia, 2029.
O Capitão **Daniel Mercer** e a Força-Tarefa Iron investigam a organização
**VÉRTICE**, responsável por ataques coordenados pelo mundo.

> **Estado atual: v0.2 — Missão 1 "Primeiro Contato" jogável do início ao fim.**
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
| 1, 2, Q, roda do mouse | Trocar arma |
| E | Interagir (caixas de munição, portas) |
| Esc / P | Pausar |

Configurações: qualidade gráfica (Baixa/Média/Alta), sensibilidade, FOV,
volumes, inverter Y, legendas, vozes provisórias, contador de FPS.

## O que está implementado (de verdade)

- **Mundo 3D real** com colisão: distrito urbano com ~25 prédios jogáveis,
  cidade de fundo procedural, ruas, calçadas, praça, carros, barricadas, entulho.
- **Jogador**: movimento fluido com aceleração, corrida, agachar, pulo,
  balanço de câmera, passos, recuo, tremor de câmera, vida com regeneração,
  indicadores de direção de dano, morte e reinício do checkpoint.
- **Cinco armas fictícias** com texturas PBR de desgaste: VK-7 (fuzil), MK-9
  (submetralhadora), BRK-12 (escopeta de bomba, 9 chumbos), LR-6 (fuzil de
  precisão com luneta) e P-11 (pistola). Armas de inimigos abatidos e de caixas
  no mapa podem ser recolhidas (E) para trocar a arma principal ou pegar munição.
  Tiro hitscan com dispersão,
  queda de dano por distância, tiro na cabeça, ADS, recarga tática/vazia,
  troca de arma, cápsulas ejetadas, clarão, rastros, decalques de impacto,
  granadas com quique e explosão.
- **Personagens** com rosto esculpido, membros com volume, colete com
  carregadores, capacete com trilhos e jugular; inimigos com balaclava ou máscara de gás.
- **Gráficos**: oclusão de ambiente (GTAO) no nível Alto, bloom no Médio e Alto.
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
npm run test:e2e  # jogatina automatizada completa no Chromium + capturas
```

## Documentação

- `docs/TECNICO.md` — motor escolhido, limitações, estrutura do código
- `docs/RECURSOS.md` — arte/animação/áudio provisórios e o que substituir
- `docs/ROADMAP.md` — próximas etapas da campanha
