# Arquitetura

```
client/            React + Vite (app principal)
  src/pages/       páginas da plataforma
  src/studio/      NEXPLAY STUDIO (editor, painéis, IA, pré-visualização)
  src/engine/      motor de jogo (three.js): mundo, natureza, estruturas, personagens, gameplay, HUD, áudio, scripts, 2D
  runtime/         player isolado (servido SOMENTE pela origem sandbox) + NEXPLAY SDK
shared/project.js  formato de projeto, operações (applyOps), validação, modelos de gênero — usado por cliente, servidor e IA
server/
  index.js         servidor HTTP do app/API + servidor sandbox
  config.js        configuração por variáveis de ambiente
  db/              esquema SQLite, acesso, dados de sistema (planos, loja, desafios, conquistas)
  lib/             auth, segurança, validação, uploads, rewards, serviços, tokens de jogo, e-mail
  routes/          auth, users, social, games, projects (cloud), ai, rewards, payments, community, studios, multiplayer, admin
  ai/              especialistas, ferramentas, provedor (Claude), laço do agente, Autopilot
  sandbox/         origem isolada que serve builds e o player
tests/             testes de integração (node:test)
```

## Fluxos principais

**Execução de jogos.** `POST /api/games/:id/play` verifica acesso (grátis, comprado, beta, gerente) e gera um token HMAC (`versionId`, `userId`, expiração). A página `/jogo/:slug/jogar` carrega `SANDBOX_ORIGIN/p/<token>/index.html` (HTML5) ou `SANDBOX_ORIGIN/runtime/player.html#<token>` (Studio) em um `<iframe sandbox>`. A origem sandbox nunca recebe cookies do app e envia `Content-Security-Policy: sandbox …; frame-ancestors <app>`. A comunicação jogo ↔ plataforma é só por `postMessage`, com verificação de origem e de `event.source`.

**Tempo de jogo.** A página envia heartbeat a cada 30 s com o estado de visibilidade. O servidor conta no máximo 45 s por batida, só da sessão mais recente do usuário, com teto diário — base dos desafios de NC.

**Publicação.** Upload → extração validada → verificação heurística (`passed`/`flagged`/`failed`) → versão `pending` → envio do jogo → moderação aprova (define `current_version_id`). Atualizações de jogos publicados entram na fila de revisão sem derrubar a versão atual.

**NEXPLAY AI.** `POST /api/ai/projects/:id/command` (resposta NDJSON em streaming). O agente roda um laço modelo ↔ ferramentas sobre uma *cópia* do documento; cada ferramenta vira operações do `shared/project.js` validadas por zod. Ao final, se houve mudanças, grava **uma** revisão (fonte `ai`) com controle otimista. Cotas: FREE N/dia, PRO 4N/dia, DELUXE sem limite de comandos (limite por minuto e concorrência). Esforço e iterações crescem por plano. O **Autopilot** (DELUXE) planeja (ferramenta `submit_plan`), aguarda aprovação, executa etapas por especialista, roda a validação, chama a IA Testadora para corrigir erros, pausa diante de alterações destrutivas não previstas e grava cada etapa como revisão desfazível.

**REWARDS.** Saldo = soma do livro-razão (`nc_ledger`). Créditos em `credit_ledger` (centavos). Toda operação usa transação `BEGIN IMMEDIATE` e chaves de idempotência. Métricas de desafios são calculadas a partir de dados do servidor (nunca informadas pelo cliente) e excluem jogos do próprio usuário.

**Pagamentos.** Stripe Checkout via REST; confirmação **somente por webhook assinado** (HMAC, tolerância de 5 min, idempotência por ID do evento). Compras com créditos são internas e atômicas.

## Segurança

- Sessão: token aleatório de 256 bits no cookie httpOnly/SameSite=Lax/Secure (produção); no banco só o SHA-256.
- CSRF: cabeçalho `X-NX-Client` obrigatório + checagem de `Origin` em produção.
- Senhas: scrypt (N=16384) com sal; bloqueio temporário após 8 falhas; respostas sem enumeração de contas.
- Autorização sempre no servidor (`requireAuth`, `requireRole`, `requireFeature`, checagens de dono/estúdio/colaborador).
- Validação de entrada com zod em todas as rotas; SQL parametrizado; React escapa o conteúdo.
- Uploads: imagens por assinatura (sem SVG), assets por assinatura, builds com lista de extensões e bloqueios.
- CSP estrita no app (`script-src 'self'`, `frame-ancestors 'none'`), HSTS em produção, `nosniff`, `Referrer-Policy`, `Permissions-Policy`.
- Scripts de usuário do Studio só executam no player isolado; o servidor apenas compila (sintaxe) com `node:vm`, nunca executa.
- Limites de taxa por IP/usuário em autenticação, escrita, mensagens, IA, rewards e WebSocket.
- Auditoria (`audit_log`) de ações administrativas, moderação, concessões de planos/NC, resgates e compras.

## Modelo de dados

Ver `server/db/schema.sql` (comentado). Principais grupos: contas/sessões, social, estúdios, jogos/versões/mídia/updates/beta, avaliações/comentários, biblioteca/sessões de jogo, conquistas/medalhas, curadoria, rewards (NC, créditos, resgates, desafios, loja), planos/assinaturas/uso de IA, pagamentos, eventos/awards/votações/sugestões, Studio/Cloud (projetos, versões, membros, assets, conversas de IA, Autopilot), multiplayer (salas, convites), auditoria.
