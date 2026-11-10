# Publicação em produção

## 1. Domínios

Use **dois domínios registráveis diferentes** (não apenas subdomínios do mesmo site):

- App: `https://nexplay.com` → porta `PORT` (3000)
- Jogos: `https://nexplay-games.net` → porta `SANDBOX_PORT` (3001)

Opcional e recomendado: `SANDBOX_GAME_SUBDOMAINS=1` com DNS e certificado curinga (`*.nexplay-games.net`) para que cada jogo tenha sua própria origem (armazenamento local isolado entre jogos).

```env
NODE_ENV=production
APP_ORIGIN=https://nexplay.com
SANDBOX_ORIGIN=https://nexplay-games.net
TRUST_PROXY=1
PLAY_TOKEN_SECRET=<64 caracteres aleatórios>
```

## 2. Proxy reverso (exemplo Nginx)

```nginx
server {
  server_name nexplay.com;
  client_max_body_size 220m;
  location / { proxy_pass http://127.0.0.1:3000; proxy_set_header Host $host; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header X-Forwarded-Proto $scheme; }
  location /ws/ { proxy_pass http://127.0.0.1:3000; proxy_http_version 1.1; proxy_set_header Upgrade $http_upgrade; proxy_set_header Connection "upgrade"; }
  location /api/ai/ { proxy_pass http://127.0.0.1:3000; proxy_buffering off; proxy_read_timeout 900s; }
}
server {
  server_name nexplay-games.net *.nexplay-games.net;
  location / { proxy_pass http://127.0.0.1:3001; proxy_set_header Host $host; }
}
```

## 3. Serviços externos

- **NEXPLAY AI**: crie uma chave na Anthropic e defina `ANTHROPIC_API_KEY`. Acompanhe custos: cada comando executa várias chamadas ao modelo; o Autopilot executa uma por etapa.
- **E-mail**: qualquer SMTP (SES, Postmark, Mailgun…) em `SMTP_*`.
- **Pagamentos (Stripe)**: crie produtos/preços recorrentes para PRO e DELUXE (`STRIPE_PRICE_*`), configure o webhook para `https://nexplay.com/api/payments/webhook` com os eventos `checkout.session.completed`, `invoice.paid`, `customer.subscription.deleted`, `charge.refunded` e defina `STRIPE_WEBHOOK_SECRET`. Repasses a criadores (Stripe Connect ou outro meio) ainda precisam ser definidos pela operação — a receita fica registrada em `creator_earnings`.

## 4. Dados e backup

Tudo fica em `DATA_DIR` (banco `nexplay.db` em modo WAL, uploads, builds e assets). Faça backup diário da pasta (para o banco, use `sqlite3 nexplay.db ".backup backup.db"`).

## 5. Escalar

Uma instância atende bem o início. Para crescer: Postgres no lugar do SQLite (`server/db`), Redis para limites e salas WebSocket entre instâncias, armazenamento de objetos (S3/R2) + CDN para builds e mídia, fila para o Autopilot e um scanner antivírus (ClamAV) no envio de builds.

## 6. Primeiro administrador

Crie a conta pelo site e rode no servidor: `npm run seed:admin -- <usuario>`.
