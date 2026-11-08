# ENTRE SOMBRAS — Los Valles

Jogo 3D de mundo aberto em terceira pessoa feito com **Three.js (WebGL)**. Roda direto no navegador, sem instalar nada, e foi pensado para funcionar em PCs mais fracos.

## Como jogar (jeito mais fácil)

1. Baixe e extraia o arquivo **`EntreSombras.zip`**.
2. Abra a pasta **`dist`**.
3. Dê dois cliques em **`index.html`** (use Chrome, Edge ou Firefox atualizados).
4. Espere a cidade ser gerada e clique em **JOGAR**.

> Não precisa de internet, servidor nem instalação: tudo (modelos, texturas, sons) é gerado pelo próprio jogo.

## História (o que já dá para jogar)

Siga o documento oficial — veja **[HISTORIA.md](HISTORIA.md)** para o mapa completo do que foi implementado e do que ainda depende das suas decisões.

**Campanha de Ethan:** Prólogo (esconderijo, fuga, batida e prisão) → Sete Anos Depois (saída da penitenciária, carro blindado, reencontro com Ryan) → Os Nomes do Livro (casa abandonada, território rival, Blake se rende, Victor foge, livro recuperado) → O Primeiro Suspeito (Lucas, ligação misteriosa, fotografia) → O Irmão (binóculos na colina) → A Fotografia (12/08/2027) → A Mansão (furtividade com alerta 0–100, confronto, perseguição) → O Galpão (luta, interrogatório, disparo, pessoa misteriosa, Ryan desaparece) → Culpado?? (o investigador).

**Campanha de Ryan:** ligação com contrato (aceitar ou recusar) → A Casa das Câmeras (Pulso Eletrônico, Fernando del Costa: eliminar ou interrogar e fugir).

Missões com marcador azul começam quando você chega nele e aperta **E**. Missões em sequência começam sozinhas. Se falhar, a missão volta ao último checkpoint.

## Controles

| Ação | Tecla |
|---|---|
| Andar | W A S D (ou setas) |
| Correr | Shift |
| Pular | Espaço |
| Girar a câmera | Mouse |
| Aproximar/afastar a câmera | Roda do mouse |
| Entrar/sair do carro, falar, comprar, interagir | E |
| Golpear / nocautear por trás (em silêncio) | F |
| Agachar (furtividade) | C |
| Celular (mapa, mensagens, banco, VIBE...) | T |
| Pulso Eletrônico (Ryan) | Q |
| Abastecer no posto / consertar na oficina (dentro do carro) | G |
| Escolhas nos diálogos | 1, 2, 3 ou clique |
| Acelerar / frear / ré | W / S (segure S parado para dar ré) |
| Virar o carro | A / D |
| Freio de mão | Espaço |
| Avançar 3 horas (fora de missão) | N |
| Opções, salvar, carregar, trocar de personagem | Esc |
| Ajuda na tela | H |

## O que tem no jogo

- **Câmera em terceira pessoa corrigida**: só gira com o mouse (não gira sozinha), acompanha o Ethan suavemente, colide com paredes, casas, objetos e carros, distância ajustável (roda do mouse ou menu), sensibilidade ajustável e opção de inverter o eixo Y. No carro vira câmera de perseguição e, se você quiser, volta sozinha para trás do carro quando você para de mexer o mouse (dá para desligar no menu).
- **Movimentação do Ethan**: aceleração e desaceleração graduais, caminhada e corrida com animação ligada à velocidade (os pés não deslizam), animação de parado (respiração, olhar em volta), rotação suave, pulo com aterrissagem e transições suaves entre todas as animações.
- **Cidade de Los Valles** (6×6 quarteirões): ruas asfaltadas com faixas, faixas de pedestre, calçadas com meio-fio, casas com fachadas detalhadas (janelas, persianas, varandas, telhados, chaminés, cercas, caixas de correio), prédios de vários tamanhos, centro com lojas no térreo, lojas **com interior** onde dá para entrar e que têm funcionários, Delegacia de Polícia, posto de gasolina, estacionamentos, praças com fonte, postes de luz, semáforos funcionando, placas com nomes das ruas, ponto de ônibus, árvores, hidrantes, lixeiras e floresta e colinas em volta.
- **Carros dirigíveis**: 6 modelos (sedan, hatch, SUV, picape, táxi, viatura), com rodas que giram e esterçam, interior (bancos, painel, volante que gira), vidros, faróis e luz de freio. Aceleração, frenagem, ré, freio de mão (derrapagem), direção que fica mais firme em alta velocidade, suspensão que inclina, colisões com prédios, postes e outros carros, velocímetro e som de motor. **Todos os carros estacionados podem ser dirigidos.** O carro azul na garagem do Ethan é o seu.
- **Trânsito**: carros com IA andando na faixa da direita, fazendo curvas, respeitando os semáforos e parando para não bater.
- **Personagens**: Ethan, Ryan Cole, Delegado Morales, pedestres (roupas, cabelos e tons de pele variados), funcionários das lojas e policiais. Os pedestres saem da frente dos carros.
- **História inicial**: fale com Ryan Cole → vá até a delegacia → fale com o delegado. As falas ficam em `src/characters.js` e são fáceis de editar.
- **Minimapa** que gira com a câmera e mostra o objetivo (amarelo) e o seu carro (azul).

## Novidades: veículos, oficina, armas e desempenho

**Carros (todos dirigíveis, cada um com direção, aceleração, frenagem, aderência e som de motor próprios):**
Popular 1.0, Hatch Pulse, Sedan Aurora, SUV Montana, Picape Bravo, Imperial Luxo, Coupé GT Sombra, Clássico 1965, **Besouro 1300** (clássico inspirado no Fusca), **Fúria V12** (superesportivo inspirado em Lamborghini), Táxi e Viatura. Os nomes são fictícios porque as marcas reais são registradas. Um Fúria, um Besouro e um Coupé ficam estacionados na rua em frente à casa.

**Freio de mão:** trava as rodas traseiras, reduz a velocidade de forma firme e permite derrapagem controlada; ao soltar, o carro recupera a aderência.

**Los Valles Custom (oficina):** no Estacionamento Central. Entre com o carro e aperte **G**. Pintura (16 cores), 6 tipos de rodas, aerofólio, saias laterais, película, neon, faróis xenon, motor (3 níveis), freios (3), suspensão (3), turbo e reparo. O carro gira na tela enquanto você escolhe; as mudanças aparecem na hora e só são cobradas ao comprar. O carro customizado vira o **seu carro** e fica salvo.

**Armas:** pistola e escopeta (compre na Ferragens Ramírez; Ryan já começa com pistola). **1/2/3** troca, **botão direito** ou **V** mira, **botão esquerdo** atira, **R** recarrega. Quem é atingido cai, sem sangue. Atirar em público assusta as pessoas e dá estrelas; com 3 estrelas ou mais, policiais descem armados. Alguns inimigos das missões também atiram.

**Cutscenes:** **X** pula a cena; opção "Diálogos avançam sozinhos" no menu.

**Medidor de desempenho real (F3):** FPS e milissegundos por quadro medidos do intervalo real entre quadros, gráfico, memória JavaScript (no Chrome/Edge; em outros navegadores aparece "indisponível"), chamadas de desenho e triângulos. **F4** inicia/para uma medição e mostra FPS mínimo, médio, máximo e 1% mais baixo.

**Minimapa:** a seta e a rotação do mapa foram corrigidas (a seta aponta para onde você anda ou dirige).

**Trânsito:** a IA cede passagem nos cruzamentos, espera para virar à esquerda, prevê colisões e ultrapassa obstáculos parados.

## Sistemas do mundo

- **Relógio**: 1 segundo = 1 minuto do jogo; dia e noite contínuos.
- **Sobrevivência**: vida, fome, sede, sono e dor. Coma e beba nas lojas (fale com o atendente), durma na porta da casa (8 horas, salva o jogo), trate-se no Hospital Los Valles.
- **Carros**: combustível (cada modelo tem um tanque), danos por batida, abastecer no Posto Valles, consertar na Oficina Mecânica.
- **Procurado (até 6 estrelas)**: agredir pessoas, atropelar ou bater em viaturas com testemunhas por perto. A polícia persegue; fique longe das viaturas para despistar; se ficar parado perto delas a pé, é preso (multa). **2 estrelas desbloqueiam a estrada para Blackwood.**
- **Celular**: Mapa, Mensagens, Ligações, Banco, Câmera (tira fotos de verdade), Garagem (chamar o carro), Missões, Notícias, VIBE e Status. Ryan tem também Arquivos, Casos, Contratos, Ferramentas e Anotações.
- **VIBE**: rede social fictícia que reage aos acontecimentos (alguns posts são rumores não confirmados).
- **Salvamento**: automático a cada 5 minutos, ao concluir missões, em cada checkpoint e após compras importantes; 5 espaços manuais (Esc → Salvar). Ao morrer, volta ao último salvamento.
- **Duas campanhas** com dinheiro e progresso separados (Esc → Jogar como Ryan/Ethan).

## Gráficos

- Texturas em alta resolução com **relevo** (normal maps): asfalto com pedrinhas, rachaduras e marcas de pneu, calçada de placas, grama, tijolos, telhas, madeira e casca de árvore.
- **Reflexos**: janelas dos prédios, vitrines, vidros e pintura dos carros refletem o céu (o prédio de vidro reflete o pôr do sol).
- **Céu** com nuvens em movimento e brilho do sol. No dia, no entardecer e à noite as cores mudam.
- **À noite** os postes mais próximos iluminam de verdade a rua, os carros e as pessoas, com halo nas lâmpadas e janelas acesas.
- **Sombras** suaves, sombra de contato embaixo de carros e pessoas e escurecimento na base das casas e prédios.
- Árvores com folhagem texturizada e pinheiros, meio-fio de pedra, tampas de bueiro e vinheta de cinema.

## Desempenho (PC fraco)

**Recomendado para Intel UHD 630 (i5-8500):** qualidade **Média** com **Resolução automática** ligada (já vem assim). A resolução automática diminui um pouco a resolução quando o FPS cai abaixo de ~42 e volta a aumentar quando sobra desempenho. No menu (Esc) aparece o nome da sua placa de vídeo e a resolução atual.

No menu **Esc → Qualidade gráfica**:

- **Baixa**: sem sombras, resolução reduzida, menos pedestres e trânsito. Use se o jogo travar.
- **Média** (padrão): sombras leves.
- **Alta**: sombras melhores e antisserrilhamento.

Otimizações usadas: materiais leves (Lambert/Phong, sem PBR pesado), reflexos por mapa de ambiente gerado só quando o horário muda, poucas luzes reais (só os postes mais próximos), cidade agrupada em blocos (poucas chamadas de desenho), atlas único para as placas, árvores instanciadas, carros distantes com modelo simplificado, personagens com 1 malha cada, sem pós-processamento pesado e com neblina limitando a distância de desenho.

## Para quem quer mexer no código

Requisitos: Node.js 18+.

```
npm install
npm run build     # gera dist/game.js
npm run dev       # recompila automaticamente ao salvar
```

| Arquivo | Conteúdo |
|---|---|
| `src/main.js` | Junta tudo: laço do jogo, HUD, menus, carro, combate, polícia, sobrevivência, salvamento |
| `src/story.js` | Motor da história: etapas/checkpoints, cutscenes, diálogos, escolhas, alerta 0–100, binóculos, fotos |
| `src/missions_ethan.js` / `src/missions_ryan.js` | As missões das duas campanhas (diálogos editáveis aqui) |
| `src/zones.js` / `src/places.js` | Favela, penitenciária, zona industrial, galpão, mansão, colina, casa de Fernando, sala do investigador, portão de Blackwood |
| `src/drivers.js` | Motoristas com IA (fugas, polícia, escolta) |
| `src/phone.js` | Celular, VIBE, notícias, mensagens |
| `src/save.js` | Salvamento automático e manual |
| `src/custom.js` | Oficina Los Valles Custom |
| `src/weapons.js` | Armas |
| `src/perf.js` | Medidor de desempenho real |
| `src/camera.js` | Câmera em terceira pessoa |
| `src/player.js` | Movimentação do Ethan |
| `src/humanoid.js` | Modelo dos personagens (esqueleto) e animações |
| `src/characters.js` | Aparência e falas dos personagens da história |
| `src/npc.js` | Pedestres, lojistas, policiais |
| `src/vehicle.js` | Modelos e física dos carros |
| `src/traffic.js` | Trânsito com IA e semáforos |
| `src/city.js` | Geração da cidade de Los Valles |
| `src/textures.js` / `src/materials.js` | Texturas e materiais procedurais |
| `src/sky.js` | Céu, sol/lua, dia/entardecer/noite |
| `src/collision.js` | Colisões |

## Licenças

- Código do jogo: do autor do projeto.
- [Three.js](https://threejs.org) (motor 3D): licença MIT, embutido em `dist/game.js`.
- Modelos, texturas e sons: **gerados por código** dentro do projeto. Não há assets de terceiros, então não existe restrição de licença.
