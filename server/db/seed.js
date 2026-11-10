// Dados de sistema obrigatórios (planos, itens da loja, desafios, conquistas da plataforma).
// IMPORTANTE: nenhum jogo é criado aqui. O catálogo começa vazio por definição.

export const FREE_AI_DAILY = 25;

export const DEFAULT_PLANS = [
  {
    code: 'free', name: 'FREE', price_cents: 0,
    ai_daily_commands: FREE_AI_DAILY, ai_per_minute: 4,
    storage_mb: 500, version_history: 15, max_projects: 5, max_published_games: 3,
    features: ['play', 'profile', 'friends', 'publish_basic', 'studio_basic', 'ai_basic', 'ads'],
  },
  {
    code: 'pro', name: 'PRO', price_cents: 2490,
    ai_daily_commands: FREE_AI_DAILY * 4, ai_per_minute: 10,
    storage_mb: 5000, version_history: 100, max_projects: 30, max_published_games: 20,
    features: ['play', 'profile', 'friends', 'publish_basic', 'studio_basic', 'ai_basic',
      'ai_advanced', 'studio_extra_tools', 'no_ads', 'pro_badge', 'advanced_stats',
      'profile_customization', 'early_features'],
  },
  {
    code: 'deluxe', name: 'DELUXE', price_cents: 6990,
    ai_daily_commands: null, ai_per_minute: 20,
    storage_mb: 25000, version_history: 500, max_projects: 200, max_published_games: 100,
    features: ['play', 'profile', 'friends', 'publish_basic', 'studio_basic', 'ai_basic',
      'ai_advanced', 'studio_extra_tools', 'no_ads', 'pro_badge', 'advanced_stats',
      'profile_customization', 'early_features', 'ai_unlimited_commands', 'ai_deluxe',
      'autopilot', 'advanced_3d', 'advanced_animation', 'automated_tests', 'deluxe_badge',
      'exclusive_customization', 'deluxe_lab'],
  },
];

const STORE_ITEMS = [
  ['frame_neon_violet', 'frame', 'Moldura Neon Violeta', 'Contorno roxo pulsante.', 400, { colors: ['#8b5cf6', '#c084fc'] }, null],
  ['frame_cyan_circuit', 'frame', 'Moldura Circuito Ciano', 'Linhas de circuito animadas.', 600, { colors: ['#06b6d4', '#22d3ee'] }, null],
  ['frame_aurora', 'frame', 'Moldura Aurora', 'Gradiente roxo→ciano em rotação.', 1200, { colors: ['#8b5cf6', '#06b6d4', '#ec4899'] }, null],
  ['frame_deluxe_gold', 'frame', 'Moldura Dourada DELUXE', 'Exclusiva para assinantes DELUXE.', 1500, { colors: ['#f59e0b', '#fde68a'] }, 'deluxe'],
  ['avatar_pixel_knight', 'avatar', 'Avatar Cavaleiro Pixel', 'Avatar ilustrado em pixel art.', 500, { emoji: '🛡️', bg: '#312e81' }, null],
  ['avatar_cyber_fox', 'avatar', 'Avatar Raposa Cyber', 'Raposa com visor neon.', 700, { emoji: '🦊', bg: '#0e7490' }, null],
  ['avatar_void_mage', 'avatar', 'Avatar Mago do Vazio', 'Para quem domina as sombras.', 900, { emoji: '🔮', bg: '#4c1d95' }, null],
  ['theme_midnight', 'theme', 'Tema Meia-noite', 'Perfil em azul profundo.', 800, { from: '#0f172a', to: '#1e1b4b' }, null],
  ['theme_synthwave', 'theme', 'Tema Synthwave', 'Pôr do sol retrô.', 1000, { from: '#4c1d95', to: '#be185d' }, null],
  ['theme_toxic', 'theme', 'Tema Tóxico', 'Verde radioativo.', 1000, { from: '#052e16', to: '#15803d' }, 'pro'],
  ['effect_sparkles', 'effect', 'Efeito Faíscas', 'Partículas cintilantes no perfil.', 1500, { particle: 'spark' }, null],
  ['effect_glitch', 'effect', 'Efeito Glitch', 'Nome com distorção digital.', 1800, { particle: 'glitch' }, 'pro'],
  ['badge_early_supporter', 'badge', 'Emblema Pioneiro', 'Para quem chegou cedo à NEXPLAY.', 300, { icon: '🚀' }, null],
  ['badge_critic', 'badge', 'Emblema Crítico', 'Mostre que você avalia jogos.', 500, { icon: '📝' }, null],
  ['badge_legend', 'badge', 'Emblema Lenda', 'Raro e caro de propósito.', 5000, { icon: '👑' }, null],
  ['exclusive_holo_name', 'exclusive', 'Nome Holográfico', 'Seu nome com brilho holográfico.', 4000, { style: 'holo' }, 'deluxe'],
];

// Desafios com métricas medidas pelo servidor. Valores baixos de propósito:
// acumular 3.000 NC exige várias semanas de participação real.
const CHALLENGES = [
  ['weekly_explorer', 'Explorador da Semana', 'Jogue 5 jogos diferentes por pelo menos 10 minutos cada.', 'weekly', 'distinct_games', 5, 120],
  ['weekly_marathon', 'Maratona', 'Acumule 300 minutos de jogo ativo na semana.', 'weekly', 'play_minutes', 300, 150],
  ['weekly_critic', 'Crítico Dedicado', 'Escreva 3 avaliações detalhadas (mínimo 80 caracteres).', 'weekly', 'reviews_written', 3, 100],
  ['weekly_community', 'Voz da Comunidade', 'Publique 10 comentários construtivos em jogos ou devlogs.', 'weekly', 'comments_written', 10, 60],
];

const ACHIEVEMENTS = [
  ['first_steps', 'Primeiros Passos', 'Jogue seu primeiro jogo na NEXPLAY.', 'gamepad', 'common', 0],
  ['first_review', 'Primeira Opinião', 'Publique sua primeira avaliação.', 'pen', 'common', 0],
  ['social_butterfly', 'Turma Formada', 'Tenha 10 amigos.', 'users', 'common', 0],
  ['creator_debut', 'Estreia de Criador', 'Tenha um jogo aprovado e publicado.', 'rocket', 'rare', 300],
  ['veteran_100h', 'Veterano', 'Acumule 100 horas de jogo ativo.', 'clock', 'legendary', 1000],
  ['critic_50', 'Pilar da Comunidade', 'Publique 50 avaliações detalhadas.', 'star', 'epic', 500],
  ['jam_finisher', 'Sobrevivente da Jam', 'Envie um jogo para uma Game Jam.', 'flame', 'epic', 500],
];

export function seed({ one, run, tx }) {
  tx(() => {
    for (const p of DEFAULT_PLANS) {
      if (!one('SELECT code FROM plans WHERE code = ?', p.code)) {
        run(`INSERT INTO plans(code,name,price_cents,ai_daily_commands,ai_per_minute,storage_mb,version_history,max_projects,max_published_games,features)
             VALUES (?,?,?,?,?,?,?,?,?,?)`,
        p.code, p.name, p.price_cents, p.ai_daily_commands, p.ai_per_minute, p.storage_mb,
        p.version_history, p.max_projects, p.max_published_games, JSON.stringify(p.features));
      }
    }
    for (const [code, kind, name, description, price, data, plan] of STORE_ITEMS) {
      run(`INSERT OR IGNORE INTO store_items(code,kind,name,description,price_nc,data,required_plan) VALUES (?,?,?,?,?,?,?)`,
        code, kind, name, description, price, JSON.stringify(data), plan);
    }
    for (const [code, title, description, period, metric, target, reward] of CHALLENGES) {
      run(`INSERT OR IGNORE INTO challenges(code,title,description,period,metric,target,nc_reward) VALUES (?,?,?,?,?,?,?)`,
        code, title, description, period, metric, target, reward);
    }
    for (const [code, name, description, icon, rarity, nc] of ACHIEVEMENTS) {
      run(`INSERT OR IGNORE INTO achievements(code,name,description,icon,rarity,nc_reward) VALUES (?,?,?,?,?,?)`,
        code, name, description, icon, rarity, nc);
    }
    const defaults = {
      // Comissão da plataforma em pontos-base (0 = ainda não definida; configurável pelo admin).
      platform_fee_bps: 0,
      // Regras antifraude do NEXPLAY REWARDS
      rewards: {
        weekly_earn_cap_nc: 1000,          // teto semanal de NC por fontes automáticas
        redemption_min_account_days: 14,
        redemption_cooldown_days: 7,
        redemption_monthly_cap_cents: 2000, // R$ 20 / mês
        require_verified_email: true,
        min_play_minutes_for_redemption: 120,
      },
      // Gerações em provedores externos pagos (Tripo/Meshy) por dia. Operações locais não entram aqui.
      pipeline_limits: { free: 3, pro: 12, deluxe: 60 },
      // Jogos feitos no NEXPLAY STUDIO rodam no motor isolado da plataforma: quando passam na validação e no
      // teste de execução, entram no Arcade na hora. Builds HTML5 enviados (.zip) continuam indo à moderação.
      publishing: { auto_publish_studio: true, require_runtime_test: true },
      conversion_tiers: [
        { nc: 3000, credit_cents: 300 },
        { nc: 5000, credit_cents: 500 },
        { nc: 20000, credit_cents: 1000 },
      ],
    };
    for (const [k, v] of Object.entries(defaults)) {
      run('INSERT OR IGNORE INTO settings(key, value) VALUES (?, ?)', k, JSON.stringify(v));
    }
  });
}
