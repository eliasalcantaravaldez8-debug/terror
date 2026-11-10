// Configuração central da NEXPLAY. Todos os valores vêm de variáveis de ambiente
// (veja .env.example). Nada aqui deve conter segredos fixos no código.
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(here, '..');

// Carregador mínimo de .env (sem dependência externa).
const envFile = path.join(ROOT, '.env');
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && process.env[m[1]] === undefined) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
}

const env = process.env;
const int = (v, d) => (v === undefined || v === '' ? d : Number.parseInt(v, 10));

const isProd = env.NODE_ENV === 'production';
const port = int(env.PORT, 3000);
const sandboxPort = int(env.SANDBOX_PORT, 3001);

export const config = {
  isProd,
  isTest: env.NODE_ENV === 'test',
  port,
  sandboxPort,
  // Origem pública do app principal e da origem isolada que executa jogos.
  // Em produção use domínios diferentes (ex.: nexplay.com e nexplay-games.net).
  appOrigin: env.APP_ORIGIN || `http://localhost:${isProd ? port : 5173}`,
  sandboxOrigin: env.SANDBOX_ORIGIN || `http://localhost:${sandboxPort}`,
  dataDir: path.resolve(ROOT, env.DATA_DIR || 'storage'),
  dbFile: env.DB_FILE || '',
  sessionDays: int(env.SESSION_DAYS, 30),
  trustProxy: env.TRUST_PROXY === '1',

  mail: {
    host: env.SMTP_HOST || '',
    port: int(env.SMTP_PORT, 587),
    user: env.SMTP_USER || '',
    pass: env.SMTP_PASS || '',
    from: env.MAIL_FROM || 'NEXPLAY <no-reply@nexplay.local>',
  },

  ai: {
    // Provedor: "anthropic" (real) ou "mock" (somente testes automatizados).
    provider: env.NEXPLAY_AI_PROVIDER || 'anthropic',
    model: env.NEXPLAY_AI_MODEL || 'claude-opus-5-5',
    enabled: Boolean(env.ANTHROPIC_API_KEY) || env.NEXPLAY_AI_PROVIDER === 'mock',
    maxToolIterations: int(env.NEXPLAY_AI_MAX_ITERATIONS, 24),
  },

  payments: {
    provider: env.STRIPE_SECRET_KEY ? 'stripe' : 'none',
    stripeSecret: env.STRIPE_SECRET_KEY || '',
    stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET || '',
    stripePricePro: env.STRIPE_PRICE_PRO || '',
    stripePriceDeluxe: env.STRIPE_PRICE_DELUXE || '',
    currency: 'brl',
  },

  limits: {
    gameUploadMB: int(env.MAX_GAME_UPLOAD_MB, 200),
    assetUploadMB: int(env.MAX_ASSET_UPLOAD_MB, 50),
    imageUploadMB: int(env.MAX_IMAGE_UPLOAD_MB, 8),
    maxZipEntries: int(env.MAX_ZIP_ENTRIES, 5000),
    maxSignupsPerIpPerDay: int(env.MAX_SIGNUPS_PER_IP_PER_DAY, 3),
  },
};

for (const dir of ['', 'uploads', 'games', 'assets', 'tmp']) {
  fs.mkdirSync(path.join(config.dataDir, dir), { recursive: true });
}
