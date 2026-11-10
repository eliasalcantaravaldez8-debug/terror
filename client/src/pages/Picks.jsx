import { api } from '../api.js';
import { useLoad, Loader, GameRail, SectionHead, Empty, GameCard } from '../components/ui.jsx';
import { Link } from 'react-router-dom';

export default function Picks() {
  const state = useLoad(() => api.get('/community/picks'), []);
  return (
    <div>
      <h1>NEXPLAY PICKS</h1>
      <p className="muted">Curadoria da equipe NEXPLAY. Nenhum criador paga para ser escolhido.</p>
      <Loader state={state}>
        {(d) => {
          const empty = !d.gameOfDay && !d.weekly.length && !d.nexplayChoice.length && !d.featured.length && !d.collections.length;
          if (empty) return <Empty icon="star" title="A curadoria ainda não escolheu jogos">Assim que houver jogos publicados, a equipe NEXPLAY vai destacar o Jogo do Dia, os Destaques da Semana e coleções especiais.</Empty>;
          return (
            <>
              {d.gameOfDay && (
                <div className="card grid cols-2 mt" style={{ alignItems: 'center' }}>
                  <GameCard game={d.gameOfDay} />
                  <div><span className="pill gold">Jogo do Dia</span><h2 className="mt">{d.gameOfDay.headline || d.gameOfDay.title}</h2><p style={{ whiteSpace: 'pre-wrap' }}>{d.gameOfDay.recommendation}</p><Link className="btn primary" to={`/jogo/${d.gameOfDay.slug}`}>Ver jogo</Link></div>
                </div>
              )}
              {d.nexplayChoice.length > 0 && <><SectionHead icon="crown" title="Escolha da NEXPLAY" /><GameRail games={d.nexplayChoice} /></>}
              {d.weekly.length > 0 && <><SectionHead icon="star" title="Destaques da Semana" /><GameRail games={d.weekly} /></>}
              {d.featured.length > 0 && <><SectionHead icon="sparkles" title="Em destaque" /><GameRail games={d.featured} /></>}
              {d.collections.map((c) => <div key={c.id}><SectionHead icon="layers" title={c.title} /><p className="muted small">{c.description}</p><GameRail games={c.games} /></div>)}
            </>
          );
        }}
      </Loader>
    </div>
  );
}
