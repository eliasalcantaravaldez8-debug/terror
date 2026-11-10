# Status do projeto NEXPLAY

Relatório honesto do que existe hoje. "Funciona" significa implementado de ponta a ponta e exercitado por testes automatizados e/ou verificado no navegador.

## Funciona (sem configuração externa)

| Área | O que está pronto |
|---|---|
| Contas | Cadastro, login, sessões seguras (cookie httpOnly, hash do token no banco), senhas com scrypt, bloqueio após tentativas, CSRF, limite de cadastros por IP, honeypot anti-bot, troca de senha, recuperação de conta por token (o envio do e-mail depende de SMTP). |
| Perfis e social | Foto, capa, biografia, privacidade (perfil/mensagens/atividade), amigos, seguidores, bloqueios, mensagens privadas só entre amigos, denúncias, notificações, feed de atividades, lista de desejos, favoritos, histórico, biblioteca, conquistas, medalhas e estatísticas. |
| NEXPLAY Arcade | Somente jogos publicados por usuários (nenhum jogo próprio, demonstrativo ou pré-instalado; os modelos do Studio nunca aparecem). Estado vazio "Ainda não temos jogos publicados." com "Criar meu jogo" e "Explorar o NEXPLAY Studio". Aba lateral: **Jogos do mês**, **Jogos da semana**, **Em alta**, **Novidades** e **Pesquisa** (nome/descrição/tag, gênero, PC/celular, 2D/3D, multiplayer). Rankings calculados no servidor com sessões de jogo reais (jogadores distintos com tempo ativo, sem contar o próprio criador). Em telas pequenas as abas viram uma faixa rolável. |
| Criar jogo (Studio) | "Criar jogo" (`/studio/novo`, também no Arcade, Início, Explorar e painel do criador) abre o formulário de **projeto novo**: nome, 2D/3D, gênero e modo. Cria sempre um registro novo em `projects` (id próprio, documento, histórico e assets separados), **em branco por padrão** (chão, luz e jogador); o modelo de exemplo do gênero só é usado se o criador escolher. Lista de projetos com Abrir, Renomear e Excluir (apaga histórico e assets do projeto; jogos já publicados continuam). |
| Enviar jogo pronto | `/enviar-jogo`: escolhe a ferramenta (Godot, Unity, Unreal, Construct, GameMaker, Phaser, Three.js, HTML5…) com instruções de exportação Web, envia **.zip** (com index.html) ou um único **.html**, nome, descrição, gênero, versão, PC/celular, controles, multiplayer, capa e imagens. O servidor verifica o pacote (extensões, assinaturas, zip-slip, links, bomba de descompressão, padrões maliciosos), recusa executáveis/pacotes nativos (.exe, .apk…), **detecta a ferramenta** e aponta incompatibilidades conhecidas (Godot com threads, Unreal moderno). O criador testa no player isolado e envia para análise; aprovado, entra no mesmo Arcade, com página e criador. O build roda só na origem isolada (sandbox), nunca no site principal. |
| Publicar pelo Studio | Botão **Publicar jogo** no editor: nome, resumo, descrição, capa (upload, imagem da cena ou captura feita no teste), imagens, gênero, 2D/3D (do projeto), PC/celular/ambos, solo/multiplayer, controles, versão, changelog, classificação e preço. O projeto é salvo e **executado no player isolado** com um teste automático do jogo inteiro (inicia como jogador, simula movimento, coleta erros de script/motor, verifica o personagem); o servidor recusa a publicação se o projeto tiver erros de validação ou o teste falhar. Aprovado → entra no Arcade na hora (configuração `publishing.auto_publish_studio`; desligada, vai à moderação). Atualizar = nova versão (número repetido é recusado; seguidores são notificados). **Retirar do Arcade** e **Publicar de novo** mantêm versões, avaliações e estatísticas. Tudo salvo no banco (games, game_versions, game_media, auditoria). |
| Catálogo (Explorar) | Começa vazio. Filtros por dispositivo, gênero, preço e modo; ordenação; jogos incompatíveis ocultados pelo filtro de dispositivo (detectado automaticamente) e sinalizados na página. |
| Publicação | Criação/edição do jogo, capa, imagens, vídeos (YouTube/Vimeo), upload de .zip com validação (extensões, assinatura, zip-slip, symlinks, bomba de descompressão, executáveis, padrões maliciosos), versões, changelog, download opcional, envio à moderação, aprovação/recusa, atualização de versões com revisão. |
| Execução isolada | Jogos servidos por outra origem com token assinado (HMAC, expira), CSP `sandbox`, `frame-ancestors`, sem cookies. Opção de subdomínio por jogo. |
| Multiplayer | Aba própria (só jogos com multiplayer declarado e >1 jogador), salas públicas (partida rápida), privadas com código, convites para amigos, relay WebSocket com limite de jogadores e proteção contra flood, NEXPLAY SDK. |
| Lançamentos | Estágios (anunciado, em desenvolvimento, acesso antecipado, beta), previsão, devlogs com comentários, seguir projeto, beta aberto/fechado com aprovação de testadores. |
| Picks / Curadoria | Escolha da NEXPLAY, Jogo do Dia, Destaques da Semana, destaques, coleções, recomendações; criador notificado (sem pagamento). |
| Rewards | Livro-razão imutável de NC, desafios semanais medidos no servidor (tempo ativo real com heartbeat, jogos distintos, avaliações e comentários), teto semanal, conquistas raras com NC, loja (molduras, avatares, temas, efeitos, emblemas, exclusivos), histórico, conversão em créditos pela tabela definida, regras antifraude (idade da conta, e-mail confirmado, tempo de jogo, cooldown, teto mensal, retenção para revisão por IP compartilhado/concessão recente), compra de jogos com créditos. |
| Comunidade e eventos | Avaliações (exige 5 min de jogo), comentários, votações, sugestões, rankings, eventos, Game Jams, competições, FESTIVAL (votação popular), AWARDS (categorias, indicados, votação, vencedores com medalha), recompensa de participação. |
| Estúdios | Identidade visual, integrantes com funções, jogos do estúdio, posts, estatísticas, permissões por função. |
| Painel do criador | Jogos, visualizações, jogadores, avaliações, receita (quando houver vendas), gráfico diário, estatísticas avançadas para PRO/DELUXE. |
| Planos | FREE/PRO/DELUXE com limites aplicados no servidor (IA/dia, IA/minuto, armazenamento, histórico de versões, projetos, jogos publicados). PRO sempre = 4× FREE (regra imposta no servidor). |
| Studio | Editor 3D (gizmos, hierarquia, inspetor, paleta visual, ambiente, missões, diálogos, assets .glb/texturas/áudio), editor 2D de mapas, modo avançado (scripts + JSON), pré-visualização isolada, desfazer/refazer, autosave, validação (IA Testadora estática), publicação como build. 8 modelos de gênero (futebol, ação, terror, sobrevivência, corrida, plataforma, mundo aberto, aventura) + vazio, em 2D e 3D. |
| Cloud | Projetos na nuvem, revisões com controle otimista (sem sobrescrever colaboradores), histórico com poda por plano, restauração, backup/importação, colaboradores (edição/leitura), limites de armazenamento. |
| Administração | Tudo verificado no servidor; auditoria de operações administrativas, de NC, de planos e de moderação. |

## NEXPLAY FORGE (linha de produção 2D/3D) — ver docs/FORGE.md

| Parte | Estado |
|---|---|
| Processamento glTF interno (inspeção, reparo, escala, texturas, LODs, colisão) | Funciona sempre; testado. |
| Blender headless (aprimoramento, low poly, rigging automático + animações) | Funciona quando `BLENDER_PATH`/`NEXPLAY_BPY_PYTHON` está configurado; testado com Blender 5.2 (módulo `bpy`). |
| Voxel (especificação da IA, `.vox` do MagicaVoxel, exportação `.vox`) | Funciona; testado. |
| Pixel art (editor, IA, imagens, Krita `.kra`/`.ora`) | Funciona; testado. |
| Estilo visual do projeto, classificação automática e alerta de inconsistência | Funciona. |
| Integração automática no projeto + teste no motor do jogo com correções | Funciona; testado no navegador. |
| IA Diretora de Arte, ferramentas de geração para IA e Autopilot aguardando assets | Implementado; testado com IA simulada. |
| Tripo AI / Meshy AI | Implementado, **não testado contra as APIs reais** (sem chaves/rede). Requer chaves. |

## Depende de configuração externa

| Recurso | O que configurar | Sem configuração |
|---|---|---|
| **NEXPLAY AI e AUTOPILOT** | `ANTHROPIC_API_KEY` (modelo padrão `claude-opus-5-5`, com fallback do servidor em recusas). | A interface informa que a IA não está configurada; nenhuma resposta é simulada. |
| **E-mail** (confirmação e recuperação) | `SMTP_*` | O link é escrito no console do servidor e a interface avisa que o e-mail não foi enviado. |
| **Pagamentos** (assinaturas, compra com cartão, doações) | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_PRO`, `STRIPE_PRICE_DELUXE` | Rotas respondem 503; nada é simulado. Créditos NEXPLAY funcionam (são internos). Planos podem ser concedidos pelo admin. |
| **Geração 3D por IA (FORGE)** | `TRIPO_API_KEY` e/ou `MESHY_API_KEY` | A geração é recusada com explicação; voxel, sprites, importação e Blender continuam funcionando. |
| **Blender** | `BLENDER_PATH` ou `NEXPLAY_BPY_PYTHON` | O otimizador interno é usado (sem rigging nem refino avançado), e isso aparece nas etapas do job. |
| **Hospedagem** | Dois domínios (app e jogos), TLS, proxy reverso com WebSocket — ver DEPLOY.md. | Funciona em localhost. |
| Comissão da plataforma | Painel admin → Configurações. | 0%. |
| Preços dos planos | Painel admin → Planos (valores atuais são sugestões). | R$ 24,90 / R$ 69,90. |

## Limitações conhecidas e próximos passos

- **Jogos enviados prontos** não são testados automaticamente como os do Studio (o conteúdo é arbitrário): a verificação é de arquivos/segurança + detecção de compatibilidade; o criador confirma que testou e a moderação analisa. Builds que exigem SharedArrayBuffer (threads) ou servidor próprio de multiplayer não rodam no player.
- **Prévia sem servidor (link do celular)**: "Criar jogo" cria projetos em branco salvos só no navegador do aparelho (testar e excluir); editar, salvar na nuvem, publicar e enviar jogos prontos exigem a plataforma com servidor.

- **Jogos pagos no Arcade**: o campo de preço só é liberado quando o Stripe estiver configurado (`STRIPE_SECRET_KEY`); até lá, publicações do Studio são gratuitas (o servidor também recusa preço > 0).
- **Teste antes de publicar** roda no aparelho do criador. Ele confirma que o jogo inicia, executa e não gera erros; não joga o jogo até o fim nem avalia se é divertido. FPS baixo gera aviso, não reprovação.
- **Prévia sem servidor (link do celular)**: não está ligada ao banco, então o Arcade aparece vazio e não é possível publicar por ela; os modelos do Studio podem ser testados lá, identificados como modelos.

- **Qualidade gráfica "AAA"**: o motor entrega PBR, sombras suaves, céu físico, neblina, clima, bloom, GTAO, água refletiva, vegetação densa e personagens animados de forma procedural. Personagens e cenários procedurais são estilizados; para realismo de produção é necessário importar modelos `.glb` profissionais (suportado, com animações). Iluminação global em tempo real, WebGPU e geração de texturas por IA estão listadas no DELUXE LAB como pesquisa.
- **A IA edita o projeto por ferramentas estruturadas** (entidades, materiais, ambiente, scripts, missões, diálogos, sistemas, UI). Ela não gera malhas 3D novas nem imagens; usa o catálogo de geradores procedurais e assets importados. Quando algo não é possível, registra a limitação ao usuário.
- **Física**: personagens com colisão contra AABBs e terreno, bola com quique e atrito, veículos arcade. Não há solver de corpos rígidos completo (ex.: pilhas de caixas tombando).
- **Multiplayer em jogos do Studio**: a infraestrutura de salas existe e jogos HTML5 a usam via SDK; a ponte da API de scripts do Studio para salas ainda não foi exposta.
- **Escala**: SQLite (WAL) e limitador em memória atendem uma instância. Para várias instâncias: Postgres, Redis (limites, salas WebSocket) e armazenamento de objetos (S3) — a camada de dados está isolada em `server/db` para facilitar a troca.
- **Moderação de imagens/vídeos**: denúncia e moderação manual; não há classificação automática de imagens.
- **Antivírus**: a verificação de builds é heurística; integrar um scanner (ex.: ClamAV) é recomendado em produção.
- Não há aplicativo nativo para celular (a interface é responsiva e os jogos rodam no navegador móvel).
