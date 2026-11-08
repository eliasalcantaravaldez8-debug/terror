# ENTRE SOMBRAS — Los Valles

Jogo 3D de mundo aberto em terceira pessoa feito com **Three.js (WebGL)**. Roda direto no navegador, sem instalar nada, e foi pensado para funcionar em PCs mais fracos.

## Como jogar (jeito mais fácil)

1. Baixe e extraia o arquivo **`EntreSombras.zip`**.
2. Abra a pasta **`dist`**.
3. Dê dois cliques em **`index.html`** (use Chrome, Edge ou Firefox atualizados).
4. Espere a cidade ser gerada e clique em **JOGAR**.

> Não precisa de internet, servidor nem instalação: tudo (modelos, texturas, sons) é gerado pelo próprio jogo.

## Controles

| Ação | Tecla |
|---|---|
| Andar | W A S D (ou setas) |
| Correr | Shift |
| Pular | Espaço |
| Girar a câmera | Mouse |
| Aproximar/afastar a câmera | Roda do mouse |
| Entrar/sair do carro, falar com pessoas | E |
| Acelerar / frear / ré | W / S (segure S parado para dar ré) |
| Virar o carro | A / D |
| Freio de mão | Espaço |
| Dia / Entardecer / Noite | N |
| Opções (sensibilidade, qualidade, etc.) | Esc |
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

## Desempenho (PC fraco)

No menu **Esc → Qualidade gráfica**:

- **Baixa**: sem sombras, resolução reduzida, menos pedestres e trânsito. Use se o jogo travar.
- **Média** (padrão): sombras leves.
- **Alta**: sombras melhores e antisserrilhamento.

Otimizações usadas: materiais leves (Lambert/Phong), cidade agrupada em blocos (poucas chamadas de desenho), atlas único para as placas, árvores instanciadas, carros distantes com modelo simplificado, personagens com 1 malha cada, sem pós-processamento pesado e com neblina limitando a distância de desenho.

## Para quem quer mexer no código

Requisitos: Node.js 18+.

```
npm install
npm run build     # gera dist/game.js
npm run dev       # recompila automaticamente ao salvar
```

| Arquivo | Conteúdo |
|---|---|
| `src/main.js` | Junta tudo: laço do jogo, HUD, menu, carro, diálogos, missões |
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
