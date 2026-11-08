# Entre Sombras — como a história foi implementada

Este arquivo mostra, item por item do **Documento Oficial da História**, o que já está no jogo, onde está o código e o que ainda depende de decisão sua.

Regras seguidas: nenhum acontecimento foi alterado, nenhum personagem foi eliminado além do que o documento define (Lucas), e nenhum mistério foi revelado. Os diálogos marcados no documento aparecem **exatamente** como foram escritos.

## Campanha de Ethan (`src/missions_ethan.js`)

| Documento | No jogo | Tipo |
|---|---|---|
| 6. Prólogo — esconderijo | Ethan sentado; Ryan entra: *"Chefe, a polícia tá invadindo!..."* / *"Vamos fugir."* | Cutscene |
| 6. Fuga e batida | Você dirige fugindo de 3 viaturas; o carro bate no muro; Ethan é cercado, Ryan foge a pé | Jogável + cutscene |
| 6. Sete anos depois | Saída da penitenciária, carro blindado preto: *"Cole me mandou te buscar."* | Jogável + cutscene |
| 6. Reencontro | Ryan explica que o esconderijo foi destruído, que só restaram os dois e que preservou três nomes de um livro | Cutscene com escolha de personalidade |
| 7. Investigação / Victor | Pegar um carro e encontrar Ryan com 5 guardas → casa abandonada → território rival (luta) → Blake se rende → Victor aparece e impede Blake de falar → perseguição (Victor escapa) → livro recuperado → aviso: dois integrantes morreram | Jogável + cutscenes |
| 8. Primeiro suspeito | Página do livro (Lucas, 26, policial corrupto, mansão, sete guardas), ligação: *"Eu sei de tudo..."*, fotografia de Ethan e Ryan tirada de longe (gerada no momento) | Cutscene |
| 9. O irmão | À noite, com Ryan, na colina; binóculos jogáveis até achar a janela; falas exatas do documento | Jogável + cutscene |
| 12. A fotografia | Foto do irmão com um policial, datada **12/08/2027**; *"Meu irmão? Ele fez isso? Não acredito..."* / *"Vamos invadir aquela mansão hoje à noite, eu, você e só 1 guarda."*; você dirige até lá; tela escurece e volta à noite | Jogável + cutscene |
| 13. A mansão | 7 seguranças em ronda, alerta 0–100 com os 5 estados; 100 = *ALARME ATIVADO — MISSÃO FRACASSADA* e volta ao checkpoint; nocaute silencioso por trás; falas de Lucas e Ethan; confronto; Lucas foge de carro; perseguição | Jogável + cutscene |
| 14. Galpão e morte de Lucas | Galpão com capangas, policiais corruptos, dinheiro e pacotes; captura; interrogatório com as falas exatas; disparo interrompe Lucas | Jogável + cutscene |
| 15. Desaparecimento de Ryan | *"EI! VOCÊ!"* → Ryan sumiu: *"RYAN?! CADÊ VOCÊ?!"* → perseguição a pé pelas ruas industriais; a pessoa escapa | Jogável |
| 16. Investigação | Sala com investigador e a foto de Ethan com *"CULPADO??"* em vermelho; depois, mundo aberto | Cutscene |

## Campanha de Ryan (`src/missions_ryan.js`)

| Documento | No jogo |
|---|---|
| Ligação com contrato | Escolha **Aceitar** ou **Recusar** |
| Recusou → outra proposta | Casa com câmeras sem seguranças; Ryan recebe o **Pulso Eletrônico** (fica permanente, tecla Q) |
| Fernando del Costa | Dormindo; escolha: **eliminar enquanto dorme** (tela escurece, sem violência gráfica) ou **acordar e interrogar** (Fernando grita por socorro, o alerta sobe, Ryan foge) |

## Mistérios mantidos em aberto

- Quem atirou em Lucas (só o som e o clarão do disparo).
- O que aconteceu com Ryan (ele some de cena; nada é explicado).
- A identidade da pessoa misteriosa (capuz escuro, foge).
- Se o irmão sabe que Ethan está vivo.
- O papel de Fernando depois do interrogatório.
- A identidade do investigador da cena "Culpado??" (aparece só como "Investigador").

## Falas de ligação que eu escrevi (o documento só descrevia a cena)

Escrevi frases curtas que **só repetem o que o documento resume**. Você pode trocar qualquer uma delas no código:

- Reencontro: "Ethan. Sete anos...", "O nosso antigo esconderijo já era. O grupo rival destruiu tudo.", "Pelo que eu sei, só sobramos nós dois.", "Esse tempo todo eu fiquei investigando quem traiu a gente.", "Consegui preservar três nomes de um livro.", "Eu vou descobrir quem está por trás de tudo isso."
- Escolha de personalidade no reencontro (Frieza / Inteligência / Impulsividade): muda só a personalidade, não muda acontecimentos.
- Encontro com os guardas, casa abandonada ("Não tem ninguém aqui."), rendição de Blake ("Para! Para! Eu me rendo!", "Eu falo! Eu conto tudo o que eu sei!"), Ethan: "Então fala.", Victor: "Blake. Nem mais uma palavra.", livro ("Finalmente. O livro." / "Vamos ver o primeiro nome."), Ryan: "Alguém está observando a gente.", Ryan na colina ("Quem é, Ethan?", "O quê?! Teu irmão?!").
- Campanha de Ryan: textos das ligações e as falas de Fernando ("Ryan?! O que você está fazendo aqui?!", "SOCORRO! ALGUÉM ME AJUDA!").

## Decisões que ficaram para você

1. **Blake depois da interrupção de Victor**: no jogo ele só se cala e fica parado no local. O que acontece com ele?
2. **Contrato aceito por Ryan**: o documento não diz qual é. No jogo ele aparece como "aceito — aguardando instruções".
3. **Próximos capítulos** das duas campanhas.
4. **Conteúdo de Blackwood**: já é desbloqueada com 2 estrelas, mas a cidade em si ainda não foi construída.

## O que ainda NÃO foi feito (próximas etapas)

- A cidade de **Blackwood** (hoje existem o portão e o desbloqueio).
- **Comprar e decorar** casas, apartamentos, garagens e galpões.
- Casas noturnas, boliche, sinuca, fliperama, futebol de rua, corridas, eventos automotivos, shows, trabalhos temporários.
- Clima com chuva, acidentes aleatórios no trânsito e rotinas completas de NPCs (casa e trabalho).
- Concessionárias, academias, estúdios de tatuagem e hotéis com interior.
