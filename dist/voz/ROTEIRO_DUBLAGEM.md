# Roteiro de dublagem — Entre Sombras

Gerado automaticamente a partir do código do jogo (`node tools/vozes.mjs` ou `node build.mjs`).

**Situação:** 0 de 112 falas têm áudio gravado. Nenhuma voz é sintetizada: fala sem arquivo aparece só com legenda.

## Como entregar os áudios

- Grave cada fala com voz humana real e salve com o **nome de arquivo exato** da tabela, dentro de `dist/voz/` (ex.: `dist/voz/f1a2b3c4.ogg`).
- Formatos aceitos: `.ogg` (recomendado), `.mp3`, `.wav` ou `.m4a` — mesmo nome, só muda a extensão.
- Mono, 44,1 ou 48 kHz, sem música de fundo, sem silêncio longo no começo/fim, volume normalizado (≈ -16 LUFS).
- Depois rode `node build.mjs` (ou `node tools/vozes.mjs`) para o jogo reconhecer os arquivos.
- Falas marcadas como **telefone** recebem filtro de ligação automaticamente: grave com voz limpa.
- O nome do arquivo vem do texto da fala; se o texto mudar no jogo, o nome muda (rode o gerador de novo).
- Para a boca dos personagens acompanhar o volume do áudio, jogue por um servidor local (`npx serve dist` ou `python -m http.server -d dist`). Abrindo o `index.html` direto (file://) o áudio toca, mas a boca usa um movimento aproximado.

## Resumo por personagem

| Personagem | Falas | Gravadas |
|---|---|---|
| Aluno(a) | 2 | 0 |
| Bilheteria do Estádio | 2 | 0 |
| Blake Morrison | 2 | 0 |
| Corredor | 1 | 0 |
| Corredora | 2 | 0 |
| Criança | 6 | 0 |
| Desconhecido | 4 | 0 |
| Enfermeira | 2 | 0 |
| Ethan | 19 | 0 |
| Fernando del Costa | 2 | 0 |
| Fiel | 1 | 0 |
| Joe | 1 | 0 |
| Jogador de basquete | 4 | 0 |
| Lucas | 2 | 0 |
| Motorista | 4 | 0 |
| Número privado | 3 | 0 |
| Padre Anselmo | 3 | 0 |
| Pedestre (voz genérica) | 6 | 0 |
| Policial (voz genérica) | 3 | 0 |
| Policial de plantão | 4 | 0 |
| Preso (voz genérica) | 6 | 0 |
| Professor(a) | 3 | 0 |
| Ryan | 20 | 0 |
| Segurança do banco | 1 | 0 |
| Torcedor | 1 | 0 |
| Traficante | 4 | 0 |
| Victor | 1 | 0 |
| Vigia | 3 | 0 |

## Aluno(a)

| Arquivo | Fala | Tom sugerido | Onde / contexto | Status |
|---|---|---|---|---|
| `f090c1d64.ogg` | Que horas é o intervalo? | pergunta | NPC (conversa ao apertar E) — city.js:1678 | **falta** |
| `f2f9cd179.ogg` | Psiu, a professora tá olhando. | neutro | NPC (conversa ao apertar E) — city.js:1678 | **falta** |

## Bilheteria do Estádio

| Arquivo | Fala | Tom sugerido | Onde / contexto | Status |
|---|---|---|---|---|
| `f92f0a810.ogg` | Ingresso para o jogo de hoje: R$ 200. | neutro | NPC (conversa ao apertar E) — main.js:1229 | **falta** |
| `fc6b9b0ac.ogg` | Os portões abrem uma hora antes da partida. | neutro | NPC (conversa ao apertar E) — main.js:1229 | **falta** |

## Blake Morrison

| Arquivo | Fala | Tom sugerido | Onde / contexto | Status |
|---|---|---|---|---|
| `ff36fcbfa.ogg` | Para! Para! Eu me rendo! | enfático | Os Nomes do Livro — missions_ethan.js:297 | **falta** |
| `f63be76cf.ogg` | Eu falo! Eu conto tudo o que eu sei! | enfático | Os Nomes do Livro — missions_ethan.js:298 | **falta** |

## Corredor

| Arquivo | Fala | Tom sugerido | Onde / contexto | Status |
|---|---|---|---|---|
| `f29b0045c.ogg` | Ufa... não posso parar agora! | enfático | NPC (conversa ao apertar E) — praca.js:181 | **falta** |

## Corredora

| Arquivo | Fala | Tom sugerido | Onde / contexto | Status |
|---|---|---|---|---|
| `f0f706549.ogg` | (correndo) Bom dia! | enfático | NPC (conversa ao apertar E) — praca.js:180 | **falta** |
| `fcd3ec5dd.ogg` | Mais duas voltas... | hesitante / pensativo | NPC (conversa ao apertar E) — praca.js:180 | **falta** |

## Criança

| Arquivo | Fala | Tom sugerido | Onde / contexto | Status |
|---|---|---|---|---|
| `f98f26473.ogg` | Moço, olha eu no balanço! | enfático | NPC (conversa ao apertar E) — praca.js:185 | **falta** |
| `fa967c858.ogg` | Pega-pega! Tá com você! | enfático | NPC (conversa ao apertar E) — praca.js:185 | **falta** |
| `f891db518.ogg` | Hehe! Escorrega! | enfático | NPC (conversa ao apertar E) — praca.js:186 | **falta** |
| `f17e0ea58.ogg` | Minha mãe tá ali no banco. | neutro | NPC (conversa ao apertar E) — praca.js:186 | **falta** |
| `fd1f3c252.ogg` | Estou fazendo um castelo de areia. | neutro | NPC (conversa ao apertar E) — praca.js:187 | **falta** |
| `f6ea43655.ogg` | Você não me pega! | enfático | NPC (conversa ao apertar E) — praca.js:188 | **falta** |

## Desconhecido

| Arquivo | Fala | Tom sugerido | Onde / contexto | Status |
|---|---|---|---|---|
| `f089037f0.ogg` | Eu sei de tudo, sei quem te traiu e quem te trairá mais pra frente e eu tô te vendo agora... | hesitante / pensativo (telefone) | O Primeiro Suspeito — missions_ethan.js:376 | **falta** |
| `f3765086f.ogg` | Ryan. Tenho um trabalho diferente pra você. | neutro (telefone) | A Casa das Câmeras — missions_ryan.js:48 | **falta** |
| `f17276472.ogg` | Uma casa monitorada por câmeras. Nenhum segurança. | neutro (telefone) | A Casa das Câmeras — missions_ryan.js:49 | **falta** |
| `f254ec16d.ogg` | Vou te mandar um equipamento: o Pulso Eletrônico. Ele desliga as câmeras por alguns segundos. | neutro (telefone) | A Casa das Câmeras — missions_ryan.js:50 | **falta** |

## Enfermeira

| Arquivo | Fala | Tom sugerido | Onde / contexto | Status |
|---|---|---|---|---|
| `f59df2893.ogg` | Bem-vindo ao Hospital Los Valles. | neutro | NPC (conversa ao apertar E) — main.js:144 | **falta** |
| `f917424a4.ogg` | Atendimento médico custa R$ 150. | neutro | NPC (conversa ao apertar E) — main.js:144 | **falta** |

## Ethan

| Arquivo | Fala | Tom sugerido | Onde / contexto | Status |
|---|---|---|---|---|
| `fb63cff71.ogg` | Quem fez isso vai pagar. | neutro | Sete Anos Depois — missions_ethan.js:198 | **falta** |
| `f020be984.ogg` | Vamos com calma. Primeiro eu quero entender tudo. | neutro | Sete Anos Depois — missions_ethan.js:199 | **falta** |
| `f00069a5c.ogg` | Me passa esses nomes. Agora. | neutro | Sete Anos Depois — missions_ethan.js:200 | **falta** |
| `f40aa484b.ogg` | Eu vou descobrir quem está por trás de tudo isso. | neutro | Sete Anos Depois — missions_ethan.js:203 | **falta** |
| `f57755b00.ogg` | Então fala. | neutro | Os Nomes do Livro — missions_ethan.js:299 | **falta** |
| `f56645eaf.ogg` | Vamos ver o primeiro nome. | neutro | Os Nomes do Livro — missions_ethan.js:355 | **falta** |
| `fb4cac22e.ogg` | Lucas... Eu quero descobrir o que ele sabe sobre a traição. | hesitante / pensativo | O Primeiro Suspeito — missions_ethan.js:371 | **falta** |
| `fddfae1c8.ogg` | Aquele filho da puta... Eu vou matar ele... Por que logo você? | hesitante, pergunta | O Irmão — missions_ethan.js:423 | **falta** |
| `f14af89f4.ogg` | Eu conheço aquela pessoa há muito tempo. | neutro | O Irmão — missions_ethan.js:426 | **falta** |
| `fac7f3068.ogg` | É o meu irmão. Todo mundo achava que ele estava morto há dez anos. | neutro | O Irmão — missions_ethan.js:427 | **falta** |
| `f523fe642.ogg` | Meu irmão? Ele fez isso? Não acredito... | hesitante, pergunta | A Fotografia — missions_ethan.js:450 | **falta** |
| `f03930f2b.ogg` | Vamos invadir aquela mansão hoje à noite, eu, você e só 1 guarda. | neutro | A Fotografia — missions_ethan.js:452 | **falta** |
| `f2baa20e8.ogg` | Parece que você não esperava minha visita. | neutro | A Mansão — missions_ethan.js:505 | **falta** |
| `f303ec58e.ogg` | Vamos fugir. | neutro | Prólogo — A Traição — missions_ethan.js:57 | **falta** |
| `f709d4fa8.ogg` | O que você sabe? AGORA PORRA!!!!! | gritando, com raiva | O Galpão — missions_ethan.js:585 | **falta** |
| `fce1ffdda.ogg` | Você nos traiu. | neutro | O Galpão — missions_ethan.js:589 | **falta** |
| `fb7a59c7e.ogg` | Ah merda... Você me entregou... | hesitante / pensativo | O Galpão — missions_ethan.js:598 | **falta** |
| `fcee8e16f.ogg` | EI! VOCÊ! | enfático | O Galpão — missions_ethan.js:619 | **falta** |
| `f6db83f4f.ogg` | RYAN?! CADÊ VOCÊ?! | gritando, com raiva | O Galpão — missions_ethan.js:625 | **falta** |

## Fernando del Costa

| Arquivo | Fala | Tom sugerido | Onde / contexto | Status |
|---|---|---|---|---|
| `fd8e480fb.ogg` | Ryan?! O que você está fazendo aqui?! | exaltado / surpreso | Casa monitorada — missions_ryan.js:91 | **falta** |
| `f9a91239a.ogg` | SOCORRO! ALGUÉM ME AJUDA! | gritando, com raiva | Casa monitorada — missions_ryan.js:92 | **falta** |

## Fiel

| Arquivo | Fala | Tom sugerido | Onde / contexto | Status |
|---|---|---|---|---|
| `f3ebe3ec3.ogg` | Shh... estamos na igreja. | hesitante / pensativo | NPC (conversa ao apertar E) — city.js:1595 | **falta** |

## Joe

| Arquivo | Fala | Tom sugerido | Onde / contexto | Status |
|---|---|---|---|---|
| `fb371934c.ogg` | Precisa de trabalho? Tenho três pedidos saindo agora. Pega um carro e capricha no tempo. | pergunta | Trabalho: Entregas da Lanchonete do Joe — missions_side.js:98 | **falta** |

## Jogador de basquete

| Arquivo | Fala | Tom sugerido | Onde / contexto | Status |
|---|---|---|---|---|
| `f0a7a6d97.ogg` | Quer jogar? A bola tá ali, pode arremessar. | pergunta | NPC (conversa ao apertar E) — praca.js:194 | **falta** |
| `f51b01d4c.ogg` | Da linha de três vale 3 pontos. | neutro | NPC (conversa ao apertar E) — praca.js:194 | **falta** |
| `f5d42906f.ogg` | Arremesso bom é com arco alto. | neutro | NPC (conversa ao apertar E) — praca.js:195 | **falta** |
| `fe9494912.ogg` | Aqui é a melhor quadra de Westhaven. | neutro | NPC (conversa ao apertar E) — praca.js:195 | **falta** |

## Lucas

| Arquivo | Fala | Tom sugerido | Onde / contexto | Status |
|---|---|---|---|---|
| `f1c7a9da0.ogg` | Ethan Cross?! Que porra você está fazendo aqui?! | exaltado / surpreso | A Mansão — missions_ethan.js:503 | **falta** |
| `f3667d025.ogg` | Eu... eu... eu não sei de nada, o que você quer de mim? | hesitante, pergunta | O Galpão — missions_ethan.js:587 | **falta** |

## Motorista

| Arquivo | Fala | Tom sugerido | Onde / contexto | Status |
|---|---|---|---|---|
| `f4ea31cca.ogg` | Meu carro! | enfático | NPC (conversa ao apertar E) — main.js:884 | **falta** |
| `fb9ec9289.ogg` | Socorro! Roubaram meu carro! | enfático | NPC (conversa ao apertar E) — main.js:989 | **falta** |
| `f2e5bc33d.ogg` | Ladrão! | enfático | NPC (conversa ao apertar E) — main.js:989 | **falta** |
| `fd6543cbb.ogg` | Cole me mandou te buscar. | neutro | Sete Anos Depois — missions_ethan.js:173 | **falta** |

## Número privado

| Arquivo | Fala | Tom sugerido | Onde / contexto | Status |
|---|---|---|---|---|
| `f6921f312.ogg` | Ryan Cole? Tenho um contrato pra você. O pagamento é bom. | pergunta (telefone) | O Contrato — missions_ryan.js:20 | **falta** |
| `fc89b7fa9.ogg` | Aceita? | pergunta (telefone) | O Contrato — missions_ryan.js:21 | **falta** |
| `f50095706.ogg` | Você vai receber as instruções. | neutro (telefone) | Contrato — número privado — missions_ryan.js:28 | **falta** |

## Padre Anselmo

| Arquivo | Fala | Tom sugerido | Onde / contexto | Status |
|---|---|---|---|---|
| `fd51ba5aa.ogg` | Que a paz esteja com você, meu filho. | neutro | NPC (conversa ao apertar E) — city.js:1594 | **falta** |
| `f10de7a46.ogg` | A missa é às sete da noite. Todos são bem-vindos. | neutro | NPC (conversa ao apertar E) — city.js:1594 | **falta** |
| `fa3eba2ce.ogg` | Se precisar conversar, o confessionário fica ali no fundo. | neutro | NPC (conversa ao apertar E) — city.js:1594 | **falta** |

## Pedestre (voz genérica)

| Arquivo | Fala | Tom sugerido | Onde / contexto | Status |
|---|---|---|---|---|
| `f5b2122e6.ogg` | Boa noite. | neutro | fala aleatória ao conversar — characters.js:60 | **falta** |
| `f5e20c411.ogg` | Com licença. | neutro | fala aleatória ao conversar — characters.js:60 | **falta** |
| `f9c531983.ogg` | Hm? | pergunta | fala aleatória ao conversar — characters.js:60 | **falta** |
| `f6ae9de10.ogg` | Não tenho tempo agora. | neutro | fala aleatória ao conversar — characters.js:60 | **falta** |
| `f6f3d6b99.ogg` | Cuidado por onde anda. | neutro | fala aleatória ao conversar — characters.js:60 | **falta** |
| `fa30c1205.ogg` | Dizem que algo estranho acontece na praça à noite... | hesitante / pensativo | fala aleatória ao conversar — characters.js:60 | **falta** |

## Policial (voz genérica)

| Arquivo | Fala | Tom sugerido | Onde / contexto | Status |
|---|---|---|---|---|
| `f8f16e85a.ogg` | Circulando, cidadão. | neutro | fala aleatória ao conversar — characters.js:61 | **falta** |
| `fec433914.ogg` | Tudo certo por aqui? | pergunta | fala aleatória ao conversar — characters.js:61 | **falta** |
| `fcf39b016.ogg` | Não vá dirigir em alta velocidade, hein. | neutro | fala aleatória ao conversar — characters.js:61 | **falta** |

## Policial de plantão

| Arquivo | Fala | Tom sugerido | Onde / contexto | Status |
|---|---|---|---|---|
| `ffea82d1e.ogg` | Delegacia de Blackwood. Em que posso ajudar? | pergunta | NPC (conversa ao apertar E) — blackwood.js:156 | **falta** |
| `fb415cd94.ogg` | Boletim de ocorrência é ali no balcão. | neutro | NPC (conversa ao apertar E) — blackwood.js:156 | **falta** |
| `fb22edcc5.ogg` | Delegacia de Los Valles. Em que posso ajudar? | pergunta | NPC (conversa ao apertar E) — main.js:145 | **falta** |
| `f523a7b0e.ogg` | Se for fazer boletim, pegue uma senha. | neutro | NPC (conversa ao apertar E) — main.js:145 | **falta** |

## Preso (voz genérica)

| Arquivo | Fala | Tom sugerido | Onde / contexto | Status |
|---|---|---|---|---|
| `f87416b93.ogg` | Ei, você aí! Me tira daqui! | enfático | fala aleatória ao conversar — main.js:149 | **falta** |
| `f399a9ab7.ogg` | Sete anos... e ainda contando. | hesitante / pensativo | fala aleatória ao conversar — main.js:149 | **falta** |
| `f310b212d.ogg` | Não olha pra mim. | neutro | fala aleatória ao conversar — main.js:149 | **falta** |
| `f0a2feffb.ogg` | Aqui dentro o tempo não passa. | neutro | fala aleatória ao conversar — main.js:149 | **falta** |
| `f35726f39.ogg` | Tem cigarro? | pergunta | fala aleatória ao conversar — main.js:149 | **falta** |
| `fe6208c95.ogg` | Eu sou inocente, juro. | neutro | fala aleatória ao conversar — main.js:149 | **falta** |

## Professor(a)

| Arquivo | Fala | Tom sugerido | Onde / contexto | Status |
|---|---|---|---|---|
| `f75562c9a.ogg` | Silêncio, turma! Página 42. | enfático | NPC (conversa ao apertar E) — city.js:1677 | **falta** |
| `fccdc80bd.ogg` | Se veio buscar alguém, a secretaria fica no corredor. | neutro | NPC (conversa ao apertar E) — city.js:1677 | **falta** |
| `f0e3be180.ogg` | Amanhã tem prova, hein! | enfático | NPC (conversa ao apertar E) — city.js:1677 | **falta** |

## Ryan

| Arquivo | Fala | Tom sugerido | Onde / contexto | Status |
|---|---|---|---|---|
| `f2ebddd44.ogg` | Quando estiver pronto, a gente continua. | neutro | NPC (conversa ao apertar E) — main.js:472 | **falta** |
| `fb35bfaf3.ogg` | Cuidado lá fora, Ethan. | neutro | NPC (conversa ao apertar E) — main.js:472 | **falta** |
| `ff1b8f3df.ogg` | Ethan. Sete anos... | hesitante / pensativo | Sete Anos Depois — missions_ethan.js:190 | **falta** |
| `fbecde2a3.ogg` | O nosso antigo esconderijo já era. O grupo rival destruiu tudo. | neutro | Sete Anos Depois — missions_ethan.js:191 | **falta** |
| `f774eee94.ogg` | Pelo que eu sei, só sobramos nós dois. | neutro | Sete Anos Depois — missions_ethan.js:192 | **falta** |
| `fa11e13d1.ogg` | Esse tempo todo eu fiquei investigando quem traiu a gente. | neutro | Sete Anos Depois — missions_ethan.js:194 | **falta** |
| `f04c05262.ogg` | Consegui preservar três nomes de um livro. | neutro | Sete Anos Depois — missions_ethan.js:195 | **falta** |
| `f8a5595cd.ogg` | Chegou. Esses são os nossos homens. | neutro | Os Nomes do Livro — missions_ethan.js:251 | **falta** |
| `fe29e3d3b.ogg` | Primeiro a casa abandonada. Depois a gente vai até a área deles. | neutro | Os Nomes do Livro — missions_ethan.js:252 | **falta** |
| `f8664f114.ogg` | Não tem ninguém aqui. | neutro | Os Nomes do Livro — missions_ethan.js:259 | **falta** |
| `f695d2f05.ogg` | Eles estão no território deles, na Zona Industrial. | neutro | Os Nomes do Livro — missions_ethan.js:260 | **falta** |
| `f39c09d5d.ogg` | Finalmente. O livro. | neutro | Os Nomes do Livro — missions_ethan.js:354 | **falta** |
| `f21757c10.ogg` | Alguém está observando a gente. | neutro | O Primeiro Suspeito — missions_ethan.js:392 | **falta** |
| `f9c108e3b.ogg` | Quem é, Ethan? | pergunta | O Irmão — missions_ethan.js:424 | **falta** |
| `fa0b05fcc.ogg` | O quê?! Teu irmão?! | exaltado / surpreso | O Irmão — missions_ethan.js:429 | **falta** |
| `f1896ae31.ogg` | Chefe, a polícia tá invadindo! Tem algum espião ou traidor! E agora? | enfático | Prólogo — A Traição — missions_ethan.js:55 | **falta** |
| `f916db87f.ogg` | Aceito. Me manda os detalhes. | neutro | Contrato — número privado — missions_ryan.js:27 | **falta** |
| `f779217f8.ogg` | Não, obrigado. | neutro | Contrato — número privado — missions_ryan.js:31 | **falta** |
| `f0ab04483.ogg` | Fernando del Costa... | hesitante / pensativo | Casa monitorada — missions_ryan.js:78 | **falta** |
| `f72dfa98e.ogg` | Acorda, Fernando. | neutro | Casa monitorada — missions_ryan.js:90 | **falta** |

## Segurança do banco

| Arquivo | Fala | Tom sugerido | Onde / contexto | Status |
|---|---|---|---|---|
| `f955e6e8e.ogg` | Bom dia. Fila à esquerda, por favor. | neutro | NPC (conversa ao apertar E) — main.js:167 | **falta** |

## Torcedor

| Arquivo | Fala | Tom sugerido | Onde / contexto | Status |
|---|---|---|---|---|
| `fd4571d94.ogg` | Vai, acerta essa! | enfático | NPC (conversa ao apertar E) — praca.js:196 | **falta** |

## Traficante

| Arquivo | Fala | Tom sugerido | Onde / contexto | Status |
|---|---|---|---|---|
| `f82a797d6.ogg` | Psiu... tá procurando o quê? | hesitante, pergunta | NPC (conversa ao apertar E) — main.js:163 | **falta** |
| `fec5b0b1d.ogg` | Aqui é ponto, parceiro. Se não vai comprar, vaza. | neutro | NPC (conversa ao apertar E) — main.js:163 | **falta** |
| `f8e29f004.ogg` | Tá com cara de polícia, hein. | neutro | NPC (conversa ao apertar E) — main.js:163 | **falta** |
| `f0550fcc9.ogg` | Fala baixo. Tem olho em todo canto. | neutro | NPC (conversa ao apertar E) — main.js:163 | **falta** |

## Victor

| Arquivo | Fala | Tom sugerido | Onde / contexto | Status |
|---|---|---|---|---|
| `f1e4e1102.ogg` | Blake. Nem mais uma palavra. | neutro | Os Nomes do Livro — missions_ethan.js:309 | **falta** |

## Vigia

| Arquivo | Fala | Tom sugerido | Onde / contexto | Status |
|---|---|---|---|---|
| `f9a38d525.ogg` | Circulando, circulando. | neutro | NPC (conversa ao apertar E) — main.js:164 | **falta** |
| `f57b8cb0c.ogg` | Não vi nada, não sei de nada. | neutro | NPC (conversa ao apertar E) — main.js:164 | **falta** |
| `f151a860a.ogg` | Olha a viatura, hein... | hesitante / pensativo | NPC (conversa ao apertar E) — main.js:164 | **falta** |
