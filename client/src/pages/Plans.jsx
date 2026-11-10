import { Link, useSearchParams } from 'react-router-dom';
import { api, brl } from '../api.js';
import { useAuth } from '../auth.jsx';
import { useLoad, Loader, ActionButton } from '../components/ui.jsx';

const FEATURE = {
  play: 'Jogar jogos publicados', profile: 'Perfil e amizades', friends: 'Amigos, mensagens e comunidade', publish_basic: 'Publicar jogos', studio_basic: 'NEXPLAY STUDIO (2D e 3D)', ai_basic: 'NEXPLAY AI', ads: 'Pode exibir anúncios',
  ai_advanced: 'IA com recursos avançados (mais raciocínio e etapas)', studio_extra_tools: 'Ferramentas extras do Studio e mais colaboradores', no_ads: 'Sem anúncios', pro_badge: 'Selo no perfil', advanced_stats: 'Estatísticas avançadas',
  profile_customization: 'Personalização de perfil', early_features: 'Acesso antecipado a novidades', ai_unlimited_commands: 'IA sem limite de comandos (com proteção contra abuso)', ai_deluxe: 'IA DELUXE: máximo raciocínio para sistemas complexos',
  autopilot: 'NEXPLAY AI AUTOPILOT', advanced_3d: 'Cenários 3D complexos', advanced_animation: 'Ferramentas avançadas de animação', automated_tests: 'Testes automatizados após cada etapa', deluxe_badge: 'Selo DELUXE dourado', exclusive_customization: 'Personalização exclusiva', deluxe_lab: 'DELUXE LAB',
};

export default function Plans() {
  const { user } = useAuth();
  const [params] = useSearchParams();
  const s = useLoad(() => api.get('/payments/plans'), [user?.id]);
  return (
    <Loader state={s}>{(d) => {
      const free = d.plans.find((p) => p.code === 'free');
      return (
        <div>
          <h1>Planos FREE, PRO e DELUXE</h1>
          {params.get('status') === 'sucesso' && <div className="info-box mb">Pagamento enviado ao provedor. Seu plano é ativado assim que a confirmação chegar.</div>}
          {!d.paymentsEnabled && <div className="warn-box mb">As assinaturas pagas ainda não estão habilitadas nesta instalação (provedor de pagamento não configurado). Os planos PRO e DELUXE podem ser concedidos pela administração.</div>}
          <div className="grid cols-3">
            {d.plans.map((p) => (
              <div key={p.code} className={`card plan-card ${p.code === 'pro' ? 'featured' : p.code === 'deluxe' ? 'deluxe' : ''}`}>
                <div className="row between"><h2 style={{ margin: 0 }} className={p.code === 'deluxe' ? 'effect-holo' : ''}>{p.name}</h2>{d.current?.plan === p.code && <span className="pill green">Seu plano</span>}</div>
                <div className="kpi">{p.price_cents ? `${brl(p.price_cents)}/mês` : 'Grátis'}</div>
                <div className="small">
                  <b>IA:</b> {p.ai_daily_commands == null ? 'comandos ilimitados (até ' + p.ai_per_minute + '/min por proteção)' : `${p.ai_daily_commands} comandos/dia`}
                  {p.code === 'pro' && free && <span className="pill cyan" style={{ marginLeft: 6 }}>4× o FREE</span>}<br />
                  <b>Armazenamento:</b> {p.storage_mb >= 1000 ? `${p.storage_mb / 1000} GB` : `${p.storage_mb} MB`} · <b>Histórico:</b> {p.version_history} versões<br />
                  <b>Projetos:</b> {p.max_projects} · <b>Jogos publicados:</b> {p.max_published_games}
                </div>
                <ul>{p.features.filter((f) => f !== 'ads' || p.code === 'free').map((f) => <li key={f}>{FEATURE[f] || f}</li>)}</ul>
                <div style={{ marginTop: 'auto' }}>
                  {p.code !== 'free' && d.current?.plan !== p.code && (user
                    ? <ActionButton className={`btn ${p.code === 'deluxe' ? 'primary' : ''}`} disabled={!d.paymentsEnabled} onClick={async () => { const r = await api.post('/payments/checkout/subscription', { plan: p.code }); window.location.href = r.url; }}>Assinar {p.name}</ActionButton>
                    : <Link className="btn" to="/cadastro">Criar conta</Link>)}
                </div>
              </div>
            ))}
          </div>
          <p className="small muted mt">DELUXE usa infraestrutura de IA dedicada com proteção contra abuso; a disponibilidade depende do provedor de IA e pode ter limites temporários por minuto em picos de uso.</p>
        </div>
      );
    }}</Loader>
  );
}
