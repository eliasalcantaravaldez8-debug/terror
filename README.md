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

**Campanha de Ryan** (desbloqueada ao terminar o Prólogo; troque com **Z** a qualquer momento fora de missão): ligação com contrato (aceitar ou recusar) → A Casa das Câmeras (Pulso Eletrônico, Fernando del Costa: eliminar ou interrogar e fugir).

Missões com marcador azul começam quando você chega nele e aperta **E**. Missões em sequência começam sozinhas. Se falhar, a missão volta ao último checkpoint.

## Controles

| Ação | Tecla |
|---|---|
| Andar | W A S D (ou setas) |
| Correr | Shift |
| Pular | Espaço |
| Girar a câmera | Mouse |
| Aproximar/afastar a câmera | Roda do mouse |
| Entrar/sair do carro, roubar carro, falar, comprar, interagir | E |
| Golpear / nocautear por trás (em silêncio) | F |
| Agachar (furtividade) | C |
| Celular (mapa, mensagens, banco, VIBE...) | T |
| Pulso Eletrônico (Ryan) | Q |
| Avião: motor / curva / nariz para cima / para baixo | W-S / A-D / Espaço / Shift |
| **Menu de armas** (roda) | **Tab** (mouse ou 1–5 escolhe; clique ou Tab confirma) |
| Trocar de arma direto | 1 mãos · 2 pistola · 3 metralhadora · 4 escopeta · 5 AK-47 |
| Mirar / atirar / recarregar | botão direito (ou V) / botão esquerdo (segure nas automáticas) / R |
| **Trocar de personagem** (Ethan ↔ Ryan) | **Z** (depois do Prólogo) |
| Abastecer no posto / consertar na oficina (dentro do carro) | G |
| Escolhas nos diálogos | 1, 2, 3 ou clique |
| Acelerar / frear / ré | W / S (segure S parado para dar ré) |
| Virar o carro | A / D |
| Freio de mão | Espaço |
| Avançar 3 horas (fora de missão) | N |
| Opções, salvar, carregar | Esc |
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

## GRANDE ATUALIZAÇÃO: Westhaven, estádio, praça, dublagem e mais

> Observação: o projeto é feito em **Three.js (navegador)**, não em Godot. O ZIP traz o jogo pronto (`dist/`) e o código-fonte (`src/`).

### Westhaven (terceira cidade)
- Liberada depois da missão de fuga (prólogo). Siga a **rodovia oeste** (4 faixas) e atravesse a **ponte pênsil gigante** sobre a baía.
- Cidade grande: arranha-céus, centro, comércio, prédios residenciais, casas, zona industrial, parques, floresta e uma **região afastada com poucas casas** (Pinheiros), com casas entráveis.
- Trânsito e pedestres próprios; aparece no mapa e no minimapa.

### Estádio de Westhaven
- Explorável por fora e por dentro: fachada, estacionamento, **bilheteria**, **catracas**, arquibancadas, túnel dos jogadores, vestiário e **Sala de Troféus** (6 troféus 3D; aperte E para ver nome, ano e clube).
- **Ingresso: R$ 200** (sem saldo negativo: sem dinheiro, não compra). Jogos às **13h** e **20h**; as catracas exigem ingresso a partir de 1 h antes.
- **Partida simulada por IA**: 22 jogadores (goleiro, zagueiros, meias, atacantes), árbitro, saída de bola, laterais, escanteios, tiros de meta, faltas e pênaltis, placar no telão.
- Tempo real: **1º tempo 2 min → intervalo 10 s (jogadores vão para o túnel) → 2º tempo 2 min**.
- Gramado com faixas de corte e marcações oficiais; torcida variada com bandeiras, reações a lances e gols, e som de torcida.
- Dá para **sentar e levantar** em qualquer cadeira e sair a qualquer momento: a partida continua.

### Praça de Westhaven
- **Quadra de basquete jogável**: [E] pega a bola, [E] arremessa. A bola tem física (quica, bate no aro e na tabela); cesta vale 2 ou 3 pontos (linha de três). O erro aumenta com a distância e correndo.
- Parquinho (balanços e gangorra animados, escorregador, trepa-trepa, caixa de areia), chafariz animado, **bancos para sentar**, postes que acendem à noite, lixeiras e árvores.
- Gente diferente por horário: aposentados e corredores de manhã, crianças e pais durante o dia, jogadores e jovens no fim de tarde/noite, casais no chafariz à noite.

### Primeira missão (refeita)
- Cutscene na cela com a **porta abrindo animada**, Ethan de **uniforme laranja**, saída da prisão, volta para casa e **troca de roupa**.
- Na fuga do prólogo, **3 policiais** aparecem antes do carro: é preciso derrubá-los.

### Combate
- Inimigos buscam cobertura, espiam, agacham, atiram em rajadas, recarregam e reagem quando são atingidos; avisam os companheiros por perto.
- Dispersão que aumenta com tiros seguidos, tiro na cabeça (dano dobrado), marcador de acerto, faíscas, ricochete e som de bala passando perto.

### Veículos
- Corrigidas as **rodas atravessando a carroceria** em todos os carros (14 tipos × rebaixado/suspensão/rodas grandes) e nas 4 motos.

### Dublagem (vozes reais)
- O jogo toca a **gravação real** de cada fala quando o arquivo existe em `dist/voz/`. **Não há voz sintetizada**: sem arquivo, a fala continua só com legenda.
- **Os áudios das vozes ainda não foram fornecidos.** A lista completa do que gravar (112 falas, por personagem, com tom sugerido e nome do arquivo) está em **`dist/voz/ROTEIRO_DUBLAGEM.md`**.
- Volume próprio em **Opções → Volume das vozes**; filtro de telefone nas ligações; a boca do personagem abre conforme o volume do áudio (sincronia labial).
- Para a boca seguir o áudio exato, jogue por um servidor local (`npx serve dist` ou `python -m http.server -d dist`). Abrindo o `index.html` direto, a voz toca normalmente, mas a boca usa um movimento aproximado.
- Depois de colocar os arquivos, rode `node build.mjs` (ou `node tools/vozes.mjs`) para o jogo reconhecê-los.

### Gráficos
- Variação em larga escala na grama (áreas secas e viçosas), no asfalto (remendos e desgaste) e nas calçadas, quebrando a repetição das texturas sem custo perceptível.

## Blackwood (a segunda cidade)

Fica a leste, depois do rio (siga a estrada leste depois da Zona Industrial e atravesse a ponte). A entrada é liberada quando você alcança **2 estrelas de procurado**.

Cidade pequena e antiga, mais enevoada, com: Praça com torre do relógio e igreja, Cemitério, Fábrica abandonada, Motel Pinheiros, Lanchonete 66 e lojas (Armazém, Barbearia Velha, Antiquário Corvo), Delegacia de Blackwood, Posto Blackwood (com conveniência), bairros residenciais antigos e um bosque de pinheiros. Tem pedestres, lojistas, carros estacionados (todos dirigíveis) e postes que acendem à noite.

## Missões secundárias (marcador verde, repetíveis)

- **Corrida de Rua de Blackwood** (Praça de Blackwood): 2 voltas contra 3 corredores, com checkpoints. Prêmio R$ 1.500 / R$ 600 / R$ 250.
- **Trabalho: Entregas da Lanchonete do Joe** (Los Valles): 3 entregas com tempo; R$ 120 por entrega + gorjeta pela rapidez.

Ethan e Ryan podem fazer as duas, cada um com o próprio dinheiro.

## Novidades: veículos, oficina, armas e desempenho

**Carros (todos dirigíveis, cada um com direção, aceleração, frenagem, aderência e som de motor próprios):**
Popular 1.0, Hatch Pulse, Sedan Aurora, SUV Montana, Picape Bravo, Imperial Luxo, Coupé GT Sombra, Clássico 1965, **Besouro 1300** (clássico inspirado no Fusca), **Fúria V12** (superesportivo inspirado em Lamborghini), Táxi e Viatura. Os nomes são fictícios porque as marcas reais são registradas. Um Fúria, um Besouro e um Coupé ficam estacionados na rua em frente à casa.

**Direção:** mais leve que antes (vira de 20% a 30% mais rápido), mas os carros ainda têm peso e perdem aderência em alta velocidade.

**Freio de mão:** trava as rodas traseiras, reduz a velocidade de forma firme e permite derrapagem controlada; ao soltar, o carro recupera a aderência.

**Los Valles Custom (oficina):** no Estacionamento Central. Entre com o carro e aperte **G**. Pintura (16 cores), 6 tipos de rodas, aerofólio, saias laterais, película, neon, faróis xenon, motor (3 níveis), freios (3), suspensão (3), turbo e reparo. O carro gira na tela enquanto você escolhe; as mudanças aparecem na hora e só são cobradas ao comprar. O carro customizado vira o **seu carro** e fica salvo.

**Armas:** pistola, metralhadora, escopeta e **AK-47**.
- **Tab** abre o **menu de armas** (roda): o jogo fica em câmera lenta. Escolha com o mouse ou com 1–5 e confirme com clique ou soltando o Tab. O menu mostra a munição de cada arma.
- **Botão direito** (ou V) mira, **botão esquerdo** atira, **R** recarrega.
- A AK-47 e a metralhadora são automáticas: segure o botão. Elas têm recuo (a mira sobe) e espalham menos quando você mira.
- A opção **"Todas as armas liberadas"** (menu Esc) vem ligada: todas as armas ficam disponíveis com munição de reserva. Desligue para ter de comprar armas e munição na Ferragens Ramírez (Ryan já começa com pistola).
- Quem é atingido cai, sem sangue. Atirar em público assusta as pessoas e dá estrelas; com 3 estrelas ou mais, policiais descem armados. Alguns inimigos das missões também atiram.

**Ragdoll (corpo mole):** NPCs e o jogador caem com física de verdade.
- O corpo é empurrado na direção do tiro, do soco ou do carro. Braços e pernas caem soltos, com limite nos joelhos e cotovelos. O corpo bate nas paredes e para no chão.
- Atropelar alguém lança a pessoa. Se **você** for atropelado, cai e levanta depois de alguns segundos.
- Quando o personagem morre, o corpo cai antes de voltar ao último salvamento.
- Corpos parados "dormem" (deixam de calcular física) para não pesar no PC.

**Troca de personagem estilo GTA:** com **Z**, a câmera sobe até o céu, troca e desce no outro personagem. Cada um continua de onde parou, com dinheiro, armas, carro e missões próprios. O Ryan Cole só fica disponível depois da primeira missão (Prólogo). Não dá para trocar durante uma missão nem procurado pela polícia.

**Cutscenes:** **X** pula a cena; opção "Diálogos avançam sozinhos" no menu.

**Medidor de desempenho real (F3):** FPS e milissegundos por quadro medidos do intervalo real entre quadros, gráfico, memória JavaScript (no Chrome/Edge; em outros navegadores aparece "indisponível"), chamadas de desenho e triângulos. **F4** inicia/para uma medição e mostra FPS mínimo, médio, máximo e 1% mais baixo.

**Minimapa:** a seta e a rotação do mapa foram corrigidas (a seta aponta para onde você anda ou dirige).

**Cidade mais viva:** mais pedestres e carros (qualidade Média: 70 pedestres e 18 carros com IA; Baixa: 40 e 11; Alta: 95 e 24). As colisões entre carros foram otimizadas: o jogo gasta menos CPU que antes, mesmo com mais gente.

**Trânsito:** a IA cede passagem nos cruzamentos, espera para virar à esquerda, prevê colisões e ultrapassa obstáculos parados.

## Sistemas do mundo

- **Relógio**: 1 segundo = 1 minuto do jogo; dia e noite contínuos.
- **Sobrevivência**: vida, fome, sede, sono e dor. Coma e beba nas lojas (fale com o atendente), durma na porta da casa (8 horas, salva o jogo), trate-se no Hospital Los Valles.
- **Carros**: combustível (cada modelo tem um tanque), danos por batida, abastecer no Posto Valles, consertar na Oficina Mecânica.
- **Procurado (até 6 estrelas)**: agredir pessoas, atropelar ou bater em viaturas com testemunhas por perto. A polícia persegue; fique longe das viaturas para despistar; se ficar parado perto delas a pé, é preso (multa). **2 estrelas desbloqueiam a estrada para Blackwood.**
- **Celular**: Mapa, Mensagens, Ligações, Banco, Câmera (tira fotos de verdade), Garagem (chamar o carro), Missões, Notícias, VIBE e Status. Ryan tem também Arquivos, Casos, Contratos, Ferramentas e Anotações.
- **VIBE**: rede social fictícia que reage aos acontecimentos (alguns posts são rumores não confirmados).
- **Salvamento**: automático a cada 5 minutos, ao concluir missões, em cada checkpoint e após compras importantes; 5 espaços manuais (Esc → Salvar). Ao morrer, volta ao último salvamento.
- **Duas campanhas** com dinheiro e progresso separados. Troque com **Z** (ou Esc → Trocar personagem) depois do Prólogo.

## Gráficos

- Texturas em alta resolução com **relevo** (normal maps): asfalto com pedrinhas, rachaduras e marcas de pneu, calçada de placas, grama, tijolos, telhas, madeira e casca de árvore.
- **Reflexos**: janelas dos prédios, vitrines, vidros e pintura dos carros refletem o céu (o prédio de vidro reflete o pôr do sol).
- **Céu** com nuvens em movimento e brilho do sol. No dia, no entardecer e à noite as cores mudam.
- **À noite** os postes mais próximos iluminam de verdade a rua, os carros e as pessoas, com halo nas lâmpadas e janelas acesas.
- **Sombras** suaves, sombra de contato embaixo de carros e pessoas e escurecimento na base das casas e prédios.
- Árvores com folhagem texturizada e pinheiros, meio-fio de pedra, tampas de bueiro e vinheta de cinema.

## Casas com interior

- **Todas as 162 casas** de Los Valles e de Blackwood podem ser visitadas: a porta da frente fica aberta, é só subir a varanda e entrar.
- O térreo de cada casa tem:
  - **sala**: sofá, almofadas, mesa de centro, tapete, TV ligada com rack e som, estante de livros, abajur de chão, planta, quadro e foto de família;
  - **cozinha**: geladeira com ímãs e bilhetes, armários, bancada, pia com torneira, fogão de 4 bocas com forno, coifa, micro-ondas e azulejos;
  - **jantar**: mesa com 4 cadeiras e fruteira;
  - **quarto**: cama de casal com colcha, travesseiros e cabeceira, criado-mudo com abajur e porta-retrato, guarda-roupa, tapete e quadro;
  - **banheiro**: vaso sanitário, pia com espelho, box com vidro e tapetinho.
- Janelas com cortinas iluminadas pela luz de fora. Piso de madeira (porcelanato no banheiro), rodapé, forro com luminárias.
- Cada casa tem cores próprias nas paredes, nos tecidos e nos armários, e um tapete, quadros e colcha próprios.
- Na casa do Ryan dá para **dormir na cama** ([E] Dormir) além da porta.
- Desempenho: o interior de cada casa só é desenhado quando você está a menos de 40 m dela. Na rua, perto das casas, a diferença medida foi de cerca de 10 chamadas de desenho. O carregamento ficou 1 a 2 segundos mais lento.

## Lojas, comidas e bebidas

- **Produtos desenhados**: cada loja tem prateleiras com embalagens de verdade (marcas fictícias): cereais, leite, sucos, café, arroz, feijão, latas de conserva, salgadinhos, chocolates, produtos de limpeza, refrigerantes em lata e garrafa PET, água, cerveja, remédios, xaropes, shampoos, pães, sonhos, bolos, croissants, hambúrgueres, cachorro-quente, pizza, batata frita, ferramentas, latas de tinta, eletrônicos, roupas dobradas e antiguidades.
- **Cada tipo de loja tem o seu interior**:
  - **Mercado, Armazém e Conveniência**: gôndolas com placas de corredor, geladeira de bebidas iluminada com portas de vidro e produtos no caixa.
  - **Lanchonete**: vitrine com lanches sobre o balcão, quadro de cardápio iluminado com preços, geladeira e mesas com banquinhos.
  - **Padaria**: vitrine de pães e doces, cardápio, prateleiras de pães e mesinhas.
  - **Farmácia**: estantes brancas de remédios e de higiene.
  - **Ferragens**: painéis de ferramentas e latas de tinta.
  - **Eletrônicos**: parede de TVs ligadas e bancadas com produtos.
  - **Loja de roupas**: araras com roupas penduradas, prateleiras e espelho.
  - **Barbearia**: cadeiras de barbeiro, espelho e produtos.
  - **Antiquário**: estantes e mesas com vasos, relógios, abajures e quadros.
- Piso de porcelanato com brilho (ou piso de madeira nas lojas mais antigas), forro iluminado e faixa colorida nas paredes internas. As vitrines das lojas de rua também mostram prateleiras com produtos.
- **Menu de compra com cartões**: ao falar com o atendente aparece a foto de cada item, o preço e o efeito (Fome +40, Sede +30...). Escolha com o número (1 a 9) ou com o clique.
- **Cardápios por loja**: na lanchonete há X-Burguer, Prato feito, Refrigerante e Café; na padaria, Pão na chapa, Sonho, Café com leite e Água; no mercado, Sanduíche, Marmita, Água, Refrigerante e Café; na farmácia, Analgésico e Água. Os preços batem com o quadro de cardápio dentro da loja.
- **Comer e beber de verdade**: depois da compra, o personagem segura o item (hambúrguer, lata, copo de café, garrafa de água, pão ou caixa de remédio) e leva à boca por alguns segundos.
- Tudo fica em **uma única textura** (atlas 2048×2048), por isso o desempenho continua igual: medi as mesmas chamadas de desenho e triângulos de antes.

## Novidades: carros que explodem, polícia a pé, animais, igreja, escola e racha

- **Carro destruído:** quando o *Estado* do carro chega a 0%, ele **quebra**: solta fumaça cinza do motor e ainda anda um pouco (devagar e falhando, no máximo ~25 km/h).
  - **Fogo:** se o carro quebrado bater de novo (ou levar tiros), ele **pega fogo**, com chamas, fumaça preta, faíscas e som de fogo, e o jogo avisa para sair (E).
  - **Explosão:** uns 5 segundos depois ele **explode**, com clarão, bola de fogo, fumaça preta, estrondo e tremor na tela. A explosão joga longe e fere quem estiver perto, empurra e danifica outros carros (pode virar reação em cadeia) e deixa a carcaça queimada e preta, que continua queimando por um tempo.
  - **Tiros:** atirar em carros também tira o Estado.
  - **Motorista da IA:** desce e foge quando o carro quebra.
  - **Seu carro:** se ele explodir, é guinchado e consertado na garagem de casa quando você se afastar. Durante missões, os carros da história só quebram, não explodem.
- **Polícia a pé:** as viaturas agora andam pelas ruas (cruzamento por cruzamento) e chegam rápido. Quando a viatura para perto de você, **os policiais descem do carro com a arma na mão**.
  - **1 estrela:** se você estiver a pé e desarmado, eles apontam e vêm te prender ("Mãos para o alto!"). Se você sacar uma arma ou estiver num carro, eles atiram.
  - **2 estrelas ou mais:** atiram assim que te veem e contornam o carro para ter linha de tiro.
  - **Fuga:** se você fugir de carro, eles voltam para a viatura e continuam a perseguição. Os tiros nos carros também estragam o seu carro.
- **Personagem sentado certinho:** cada carro calcula a altura do banco, a inclinação do encosto e a posição dos pedais e do volante.
  - **Cabeça:** nunca passa do teto (nos esportivos baixos o motorista vai mais deitado).
  - **Pés:** ficam no assoalho, nos pedais.
  - **Mãos:** ficam no aro do volante e giram com a direção.
  - **Passageiros:** ficam com as mãos no colo, e quem vai no banco de trás senta no banco de trás.
- **Interior dos carros:** a cabine agora é aberta por dentro, então dá para ver o interior pelas janelas.
  - **Bancos:** com costura, abas laterais, encosto inclinado e apoio de cabeça.
  - **Painel:** com 2 mostradores, saídas de ar e rádio com tela.
  - **Console:** com câmbio e freio de mão.
  - **Resto da cabine:** forros de porta com apoio de braço e alto-falante, tapetes, pedais, retrovisor interno e para-sóis. A caçamba da picape também é aberta.
- **Carros mais realistas:** vidros com reflexo de Fresnel (de frente dá para ver dentro, de lado refletem o céu) e pintura com efeito de verniz. Também ganharam borrachas das janelas, grade do para-brisa e **placas com letras de verdade** (padrão Mercosul).
- **Cachorros e gatos:** andam pelas calçadas, quintais e praças.
  - **Modelo:** cada animal é uma malha lisa e orgânica (peito, cintura, ancas, joelhos, focinho, olhos com brilho) com pelagem de verdade por raça:
    - **Cachorros:** vira-lata caramelo, labrador preto e dourado, pastor-alemão com a "sela" preta e beagle tricolor.
    - **Gatos:** laranja rajado, preto, cinza rajado, frajola e siamês com olhos azuis.
  - **Animação:** andam (trote), correm (galope), sentam, deitam, respiram, abanam o rabo, ofegam e mexem as orelhas.
  - **Comportamento:** cachorros latem, olham para você e às vezes te seguem um pouco; gatos miam e levantam o rabo. Os dois fogem de carros e de tiros.
  - **Carinho:** aperte **E** perto de um animal para fazer carinho. O cachorro senta e abana o rabo, o gato ronrona e deita.
- **Igreja São José** (Los Valles, quarteirão de cima, de frente para a cidade): torre do sino com cruz, rosácea colorida, vitrais, telhado de duas águas e estacionamento.
  - **Por dentro:** nave com 20 bancos, tapete vermelho no corredor, colunas, lustres, altar com toalha, cruz grande, castiçais e flores, ambão, confessionário, pias de água benta e quadros.
  - **Pessoas:** o Padre Anselmo fica no altar e há fiéis rezando sentados nos bancos (das 6h às 21h).
- **Escola Estadual Los Valles** (quarteirão de baixo):
  - **Corredor:** armários, mural, bebedouro e 3 salas de aula.
  - **Salas:** lousa verde, mesa do professor, 16 carteiras, relógio, cartazes e estante.
  - **Fora:** quadra poliesportiva com traves, cestas e alambrado, parquinho com escorregador e balanços, e mastro com bandeira.
  - **Pessoas:** professores e alunos sentados nas carteiras das 7h às 17h.
- **Mais lugares que dá para entrar:**
  - **Shopping:** as 8 lojas do mezanino (inclui cinema com sala e academia com esteiras).
  - **Blackwood:** a **delegacia** (com policial de plantão), os **9 quartos do Motel Pinheiros** (cama de casal, criados-mudos, TV, banheiro) e a **fábrica abandonada** (máquinas velhas, esteira, caixas, tambores, feixes de luz).
  - **Favela:** os **barracos** (cama, mesa, fogão, geladeira, TV, prateleira).
- **Assalto ao banco paga na hora:** o caixa entrega o dinheiro da gaveta (R$ 1.500–3.000) assim que você anuncia o assalto, e o dinheiro do cofre (R$ 8.000–15.000) vai para o bolso quando ele abre. Se for preso, a polícia toma de volta o que foi roubado.
- **Racha de Los Valles** (missão secundária que aparece às vezes): só **à noite (18h–3h)** e **uma vez por dia**. Quando abre, chega um aviso no celular e um marcador verde aparece na avenida oeste, com curiosos esperando na largada.
  - **Corrida:** 2 voltas pelas avenidas contra 3 corredores.
  - **Prêmio:** **R$ 2.000 (1º), R$ 1.000 (2º) e R$ 500 (3º)**.

## Novidades: qualidade Ultra, emergências, prédios visitáveis e shopping

- **Qualidade Ultra** (Esc → Qualidade gráfica): veja a seção *Desempenho* abaixo.
- **Viaturas, ambulâncias e caminhões de bombeiro** passam pelas ruas de Los Valles de vez em quando (a cada 40–100 segundos, no máximo 2 ao mesmo tempo), com sirene e luzes piscando. Eles atravessam o cruzamento perto de você e seguem viagem. Não aparecem durante missões nem enquanto você pilota o avião.
- **Lojas de rua visitáveis**: as lojas no térreo dos prédios do centro, das quadras mistas e das ruas comerciais agora têm porta e interior de verdade (87 lojas em Los Valles, além das de Blackwood). Cada uma é decorada conforme o nome: café/bar/restaurante com vitrine e mesas, livraria com estantes, joalheria/ótica/sapataria com vitrines de vidro, lavanderia com máquinas, floricultura com vasos, hotel/cinema com saguão, mercadinho com prateleiras. Cada loja tem um atendente que aparece quando você chega perto.
- **Hospital e delegacia visitáveis**: o Hospital Los Valles tem recepção com enfermeira (o atendimento médico de R$ 150 é feito no balcão), sala de espera e leitos com cortinas, soro e monitores. A delegacia tem balcão de atendimento com policial de plantão, mesas com computador, celas e quadro de procurados.
- **Shopping Los Valles** (entrada pela Rua Ramírez, no quarteirão vizinho ao da Loja de Roupas Vega e da Padaria Aurora, onde antes ficava a segunda praça; no minimapa o quarteirão tem cor bege própria): prédio grande com fachada de vidro e letreiro iluminado.
  - **Térreo:** 8 lojas que dá para entrar, 4 de cada lado (roupas, eletrônicos, joalheria, livraria, farmácia, ótica, barbearia e supermercado). A farmácia e o supermercado vendem itens, como as outras lojas.
  - **Praça de alimentação** com lanchonete, pizzaria e padaria (dá para comprar comida) e 12 mesas.
  - **Centro:** chafariz, bancos, floreiras, quiosque de sorvete e clientes passeando.
  - **Mezanino (andar de cima):** escadas de verdade que dá para subir, guarda-corpo de vidro e mais 8 lojas que dá para entrar: **cinema** (sala com tela, poltronas vermelhas e bombonière que vende refrigerante, água e café), **academia** (esteiras, supino, halteres e espelho; vende água e café), games/eletrônicos, gibis, artigos esportivos, brinquedos, perfumaria e calçados, todas com atendente.
  - **Teto:** claraboia grande com vigas metálicas.

## Novidades: aeroporto, avião, prisão, eventos e Moeda Infinita

- **Aeroporto de Los Valles** (oeste da cidade, siga a estrada do terminal):
  - pista com marcações e luzes, pista de taxiamento, pátio, torre de controle, hangar, biruta e estacionamento;
  - **terminal com interior**: balcões de check-in das companhias, painel de partidas iluminado, raio-x, cadeiras de embarque com vista para o avião, café e esteira de bagagem.
- **Avião pilotável** (bimotor a jato com fuselagem, asas, motores, cauda, janelas, trem de pouso e luzes):
  - chegue na escada ao lado do avião e aperte **E**: o personagem sobe a escada degrau por degrau e entra pela porta;
  - controles: **W/S** motor, **A/D** curva (inclina as asas), **Espaço** sobe o nariz, **Shift** desce o nariz, **E** sai (parado no chão);
  - decolagem: acelere até cerca de 150 km/h e puxe o nariz. Dá para pousar na pista ou em qualquer lugar plano. Bater ou cair rápido demais destrói o avião, e um novo aparece no aeroporto;
  - lá de cima dá para ver toda a cidade e o mar em volta. Perto da borda do mapa o avião volta sozinho.
- **Penitenciária com interior**: entre pela porta do Bloco A. Corredor com 16 celas gradeadas (beliche, vaso e pia), presos de uniforme laranja, guardas fazendo ronda no corredor e no pátio, mesa dos guardas com monitores, detector de metais e uma **garagem com viatura**.
- **Eventos aleatórios** (a cada 2 a 4 minutos, fora das missões):
  - **tiroteio entre gangues** (Vermelhos contra Azuis, com armas e socos; se você atacar, eles vêm atrás de você);
  - **perseguição policial** (um carro fugindo com viaturas atrás);
  - **assalto a pedestre** (derrube o assaltante e a vítima te dá R$ 100).
- **Código MOEDAINFINITA** (app Códigos): +R$ 20.000 na hora e +R$ 50 a cada missão concluída daí em diante.
- **Otimização**:
  - carros do trânsito longe do jogador usam física simplificada (sem colisão detalhada);
  - a IA do trânsito ignora os carros estacionados no meio-fio;
  - resultado medido: o processamento por quadro caiu de cerca de 5,0 ms para 2,8–3,1 ms, mesmo com aeroporto, prisão, avião e eventos.

## Novidades: carros, motos, roubo, oficina, códigos, banco e becos

- **Carros com formato de carro de verdade:** a carroceria afina na frente e na traseira, as laterais são abauladas, o capô tem curvatura e a cabine estreita para cima. Reflexos suaves, grade com moldura, faróis de neblina, para-choques arredondados, molduras nas caixas de roda, limpadores, escapamento e interior (bancos, painel com mostradores, console, volante).
- **Personagem sentado certinho:** costas no encosto, mãos no volante e pés nos pedais. Na moto, pernas nas pedaleiras e corpo inclinado (mais deitado na esportiva).
- **Motoristas visíveis:** os carros do trânsito próximos têm um motorista dentro.
- **Roubar carro:** chegue perto de um carro com motorista e aperte **E**. O personagem vai até a porta, abre, puxa o motorista para fora (ele cai e depois foge), entra e fecha a porta. Ao entrar ou sair de qualquer carro, a porta abre e fecha. Se alguém vir o roubo, você ganha estrela.
- **Motos:** Esportiva Raio 1000, Custom Estrada, Urbana 160 e Scooter 125. Elas inclinam nas curvas e o piloto acompanha. Há motos estacionadas pela cidade e três na rua da casa.
- **Códigos no celular** (app **Códigos**, tecla T):
  - **TODOSCARROS**: menu para escolher qualquer carro, que aparece na sua frente;
  - **TODASMOTOS**: o mesmo para as motos;
  - **SEMFOME**: enche a barra de fome, que continua descendo normalmente;
  - extras: **VIDACHEIA** e **SEMPOLICIA**.
- **Oficina Los Valles Custom:**
  - **Cor:** qualquer cor no seletor livre, ou as cores de fábrica.
  - **Turbo:** deixa o carro bem mais rápido e solta fogo pelo escapamento ao acelerar forte, com estalos ao tirar o pé.
  - **Motor:** 4 cilindros, V6, V8, Boxer ou V12. Cada um tem som e desempenho próprios, e você ouve o ronco ao escolher.
  - **Aerofólio:** lábio, esportivo ou GT.
  - **Suspensão:** rebaixado, médio ou alto (a altura muda de verdade) e suspensão esportiva.
  - **Chassi:** original, wide body (mais largo, com para-lamas alargados) ou off-road (mais alto, com proteções).
- **Personagens mais reais:** homens com ombros largos, maxilar e sobrancelhas marcadas. Mulheres com cintura, quadril, busto, lábios coloridos, cílios, brincos, cabelo longo, rabo de cavalo ou chanel, e saia ou vestido. Todos com olhos de íris colorida, pálpebras, nariz e lábios.
- **Armas:** texturas de metal escovado e madeira, ícones coloridos no menu, e a arma agora aponta para a frente ao mirar (antes ficava em pé, com o cano para cima).
- **Banco Los Valles** (no Estacionamento Central): interior com caixas atrás de vidro blindado, porta de cofre redonda, caixas eletrônicos, fila e segurança armado.
  - Com uma arma na mão, fale com o atendente e escolha **Anunciar o assalto**. Todos levantam as mãos, o segurança reage e a polícia vem.
  - Fique perto do cofre até abrir (12 s) e depois **despiste a polícia** para ficar com o dinheiro (R$ 8.000 a 15.000).
  - Se for preso ou morrer, perde o dinheiro. Dá para assaltar de novo depois de 2 dias no jogo.
- **Becos:** entre os prédios dos quarteirões mistos (8 becos), com pichações, caçamba, sacos de lixo, caixas, poças e luz fraca. Cada beco tem um traficante e um vigia de capuz. Eles fogem quando a polícia chega perto ou quando você aponta uma arma para eles.
- **Otimização:**
  - Carros iguais compartilham a mesma geometria.
  - Carros parados longe usam um modelo bem simples (cerca de 740 triângulos, contra mais de 6 mil antes).
  - As peças de detalhe dos carros longe saem da cena.
  - A posição das peças só é recalculada quando algo se move.
  - Os ossos dos personagens só são atualizados quando a animação roda.
  - Resultado medido: de 34% a 59% menos triângulos, os objetos atualizados por quadro caíram de 12 mil para 5,8 mil, e o tempo de atualização das matrizes de 5–10 ms para cerca de 2 ms.

## Visual e otimização

- **Correção de cor:** cores mais vivas, contraste suave, sombras levemente frias e luzes quentes. É feita dentro do tone mapping de cada material, sem passe extra, então não custa FPS.
- **Grama 3D:** tufos de grama balançando com o vento nos gramados perto da câmera. Ela evita ruas, calçadas, caminhos, garagens e casas, e some suavemente na distância. Não aparece na qualidade Baixa; na Alta é mais densa e vai mais longe.
- **Luz do dia** mais nítida (sol mais forte, menos luz ambiente "lavada") e **pôr do sol** menos saturado.
- **Árvores otimizadas:** antes todas as árvores do mapa eram desenhadas o tempo todo. Agora ficam divididas em regiões de 300 m: o motor descarta as que estão fora da tela, e as distantes usam uma versão simplificada (4 vezes menos polígonos).
- **Personagens** com menos polígonos na qualidade Média (cerca de 40% menos) e Baixa. A Alta mantém o detalhe máximo. Pedestres a mais de 150 m não são desenhados.
- **Sombras** recalculadas em quadros alternados na qualidade Média (o sol quase não se move).
- **Resultado medido:** de 25% a 42% menos triângulos por quadro, conforme o lugar (no centro, de 611 mil para 435 mil), com cerca de 20 chamadas de desenho a mais (regiões de árvores e grama).

## Desempenho (PC fraco)

**Recomendado para Intel UHD 630 (i5-8500):** qualidade **Média** com **Resolução automática** ligada (já vem assim). A resolução automática diminui um pouco a resolução quando o FPS cai abaixo de ~42 e volta a aumentar quando sobra desempenho. No menu (Esc) aparece o nome da sua placa de vídeo e a resolução atual.

No menu **Esc → Qualidade gráfica**:

- **Baixa**: sem sombras, resolução reduzida, menos pedestres e trânsito. Use se o jogo travar.
- **Média** (padrão): sombras leves.
- **Alta**: sombras melhores e antisserrilhamento.
- **Ultra** (placa de vídeo dedicada, ex.: RX 580 / GTX 1060 ou melhor): sombras 4096 em área maior com borda suave, pós-processamento de verdade (cena em alta faixa dinâmica com MSAA 4x, brilho/bloom que fica mais forte à noite nos postes, faróis e janelas, nitidez e vinheta leves), filtragem anisotrópica máxima nas texturas, mais pedestres (115) e carros (30), grama mais densa, mais postes com luz real e distância de visão maior (objetos e interiores aparecem de mais longe). Se a placa não aguentar, volte para Alta.

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
| `src/blackwood.js` | Cidade de Blackwood |
| `src/missions_side.js` | Missões secundárias (corrida, entregas) |
| `src/custom.js` | Oficina Los Valles Custom |
| `src/weapons.js` | Armas e menu de armas (ícones) |
| `src/plane.js` | Avião pilotável (modelo e física de voo) |
| `src/ragdoll.js` | Física de corpo mole (ragdoll) |
| `src/grass.js` | Grama 3D com vento |
| `src/grade.js` | Correção de cor no tone mapping |
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
| `src/products.js` | Produtos, comidas e bebidas das lojas (atlas), ícones do menu e item na mão |
| `src/sky.js` | Céu, sol/lua, dia/entardecer/noite |
| `src/collision.js` | Colisões |
| `src/westhaven.js` | Cidade de Westhaven, rodovia, baía e ponte |
| `src/stadium.js` / `src/football.js` | Estádio, torcida, troféus e partida de futebol com IA |
| `src/praca.js` | Praça de Westhaven: basquete, parquinho, chafariz, bancos |
| `src/voice.js` / `src/voiceid.mjs` | Dublagem: tocar vozes gravadas, volume, filtro, sincronia labial |
| `tools/vozes.mjs` | Gera o roteiro de dublagem e a lista de áudios presentes |

## Licenças

- Código do jogo: do autor do projeto.
- [Three.js](https://threejs.org) (motor 3D): licença MIT, embutido em `dist/game.js`.
- Modelos, texturas e sons: **gerados por código** dentro do projeto. Não há assets de terceiros, então não existe restrição de licença.
