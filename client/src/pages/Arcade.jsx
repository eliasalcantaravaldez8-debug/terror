// NEXPLAY Arcade: somente jogos criados e publicados pelos usuários da comunidade.
// Nada aqui é pré-instalado. Rankings vêm de sessões de jogo reais registradas pelo servidor.
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api, GENRE_LABEL } from '../api.js';
import { useAuth } from '../auth.jsx';
import { useLoad, Loader, GameCard } from '../components/ui.jsx';
import { Icon } from '../components/icons.jsx';

const TABS = [
  ['month', 'calendar', 'Jogos do mês'],
  ['week', 'star', 'Jogos da semana'],
  ['trending', 'flame', 'Em alta'],
  ['new', 'bolt', 'Novidades'],
  ['search', 'search', 'Pesquisa'],
];

function ArcadeEmpty({ user }) {
  return (
    <div className="arcade-empty fade-in">
      <div className="arcade-empty-icon"><Icon name="gamepad" size={40} /></div>
      <h2>Ainda não temos jogos publicados.</h2>
      <p className="muted">Seja um dos primeiros criadores da NEXPLAY!</p>
      <div className="row" style={{ justifyContent: 'center', marginTop: 18, flexWrap: 'wrap' }}>
        <Link className="btn primary lg" to={user ? '/studio' : '/cadastro'}><Icon name="plus" /> Criar meu jogo</Link>
        <Link className="btn lg" to="/studio"><Icon name="cube" /> Explorar o NEXPLAY Studio</Link>
      </div>
      <p className="tiny muted" style={{ marginTop: 18, maxWidth: 520 }}>Os modelos do Studio (futebol, terror, corrida, aventura…) são pontos de partida para criar o seu jogo — eles não aparecem aqui. Só entram no Arcade os jogos que criadores publicam.</p>
    </div>
  );
}

function SearchFilters({ f, setF }) {
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value || undefined });
  return (
    <div className="arcade-filters">
      <input className="input" autoFocus placeholder="Nome, descrição ou tag…" value={f.q || ''} onChange={set('q')} aria-label="Pesquisar jogos" />
      <select className="input" value={f.genre || ''} onChange={set('genre')}><option value="">Todos os gêneros</option>{Object.entries(GENRE_LABEL).filter(([k]) => k !== 'vazio').map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
      <select className="input" value={f.device || ''} onChange={set('device')}><option value="">PC e celular</option><option value="pc">Roda no PC</option><option value="mobile">Roda no celular</option></select>
      <select className="input" value={f.dimension || ''} onChange={set('dimension')}><option value="">2D e 3D</option><option value="2d">2D</option><option value="3d">3D</option></select>
      <select className="input" value={f.multiplayer || ''} onChange={set('multiplayer')}><option value="">Solo e multiplayer</option><option value="1">Só multiplayer</option></select>
    </div>
  );
}

export default function Arcade() {
  const { user } = useAuth();
  const [params, setParams] = useSearchParams();
  const tab = TABS.some(([k]) => k === params.get('aba')) ? params.get('aba') : 'new';
  const [f, setF] = useState({});
  const query = new URLSearchParams({ tab, ...(tab === 'search' ? Object.fromEntries(Object.entries(f).filter(([, v]) => v)) : {}) }).toString();
  const s = useLoad(() => api.get(`/games/arcade?${query}`), [query]);
  return (
    <div className="arcade">
      <aside className="arcade-side" aria-label="Seções do Arcade">
        <div className="arcade-side-title"><Icon name="gamepad" size={20} /> NEXPLAY Arcade</div>
        {TABS.map(([k, icon, label]) => (
          <button key={k} className={`arcade-tab ${tab === k ? 'active' : ''}`} onClick={() => setParams(k === 'new' ? {} : { aba: k })}>
            <Icon name={icon} size={16} /> {label}
          </button>
        ))}
        <Link className="btn primary sm arcade-side-cta" to={user ? '/studio' : '/cadastro'}><Icon name="plus" /> Publicar meu jogo</Link>
      </aside>
      <section className="arcade-main">
        <div className="row between" style={{ flexWrap: 'wrap', gap: 8 }}>
          <div>
            <h1 style={{ margin: 0 }}>{TABS.find(([k]) => k === tab)[2]}</h1>
            <p className="muted small" style={{ margin: '4px 0 0' }}>Jogos criados pela comunidade no NEXPLAY Studio.</p>
          </div>
        </div>
        {tab === 'search' && <SearchFilters f={f} setF={setF} />}
        <Loader state={s}>{(d) => {
          if (d.totalPublished === 0) return <ArcadeEmpty user={user} />;
          return (
            <>
              {d.note && <p className="tiny muted mt">{d.note}</p>}
              {d.games.length === 0 ? (
                <div className="empty mt"><Icon name="info" /><h3>{tab === 'search' ? 'Nenhum jogo encontrado com esses filtros.' : 'Nenhum jogo neste ranking ainda.'}</h3>
                  <p className="muted small">{tab === 'search' ? 'Tente outros termos.' : 'Os rankings só contam jogadores reais (sem contar o próprio criador). Assim que as pessoas jogarem, eles aparecem aqui.'}</p></div>
              ) : (
                <div className="games-grid mt">
                  {d.games.map((g, i) => (
                    <div key={g.id} className="arcade-item">
                      {(tab === 'month' || tab === 'week' || tab === 'trending') && <span className="arcade-rank">#{i + 1}</span>}
                      <GameCard game={g} />
                      <div className="tiny muted" style={{ padding: '4px 2px' }}>{g.stats.playersTotal} {g.stats.playersTotal === 1 ? 'jogador' : 'jogadores'}</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          );
        }}</Loader>
      </section>
    </div>
  );
}
