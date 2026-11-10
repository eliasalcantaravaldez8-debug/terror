# Status do projeto NEXPLAY

Relatório honesto do que existe hoje. "Funciona" significa implementado de ponta a ponta e exercitado por testes automatizados e/ou verificado no navegador.

## Funciona (sem configuração externa)

| Área | O que está pronto |
|---|---|
| Contas | Cadastro, login, sessões seguras (cookie httpOnly, hash do token no banco), senhas com scrypt, bloqueio após tentativas, CSRF, limite de cadastros por IP, honeypot anti-bot, troca de senha, recuperação de conta por token (o envio do e-mail depende de SMTP). |
| Perfis e social | Foto, capa, biografia, privacidade (perfil/mensagens/atividade), amigos, seguidores, bloqueios, mensagens privadas só entre amigos, denúncias, notificações, feed de atividades, lista de desejos, favoritos, histórico, biblioteca, conquistas, medalhas e estatísticas. |
| Catálogo | Começa vazio com convite aos desenvolvedores. Filtros por dispositivo, gênero, preço e modo; ordenação; jogos incompatíveis ocultados pelo filtro de dispositivo (detectado automaticamente) e sinalizados na página. |
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

- **Qualidade gráfica "AAA"**: o motor entrega PBR, sombras suaves, céu físico, neblina, clima, bloom, GTAO, água refletiva, vegetação densa e personagens animados de forma procedural. Personagens e cenários procedurais são estilizados; para realismo de produção é necessário importar modelos `.glb` profissionais (suportado, com animações). Iluminação global em tempo real, WebGPU e geração de texturas por IA estão listadas no DELUXE LAB como pesquisa.
- **A IA edita o projeto por ferramentas estruturadas** (entidades, materiais, ambiente, scripts, missões, diálogos, sistemas, UI). Ela não gera malhas 3D novas nem imagens; usa o catálogo de geradores procedurais e assets importados. Quando algo não é possível, registra a limitação ao usuário.
- **Física**: personagens com colisão contra AABBs e terreno, bola com quique e atrito, veículos arcade. Não há solver de corpos rígidos completo (ex.: pilhas de caixas tombando).
- **Multiplayer em jogos do Studio**: a infraestrutura de salas existe e jogos HTML5 a usam via SDK; a ponte da API de scripts do Studio para salas ainda não foi exposta.
- **Escala**: SQLite (WAL) e limitador em memória atendem uma instância. Para várias instâncias: Postgres, Redis (limites, salas WebSocket) e armazenamento de objetos (S3) — a camada de dados está isolada em `server/db` para facilitar a troca.
- **Moderação de imagens/vídeos**: denúncia e moderação manual; não há classificação automática de imagens.
- **Antivírus**: a verificação de builds é heurística; integrar um scanner (ex.: ClamAV) é recomendado em produção.
- Não há aplicativo nativo para celular (a interface é responsiva e os jogos rodam no navegador móvel).
