import { Link } from 'react-router-dom';
import { api } from '../api.js';
import { useLoad, Loader, GameCard, Empty } from '../components/ui.jsx';

export default function Launches() {
  const upcoming = useLoad(() => api.get('/games?stage=upcoming&sort=recent&limit=60'), []);
  const early = useLoad(() => api.get('/games?stage=early_access&limit=30'), []);
  return (
    <div>
      <h1>LANÇAMENTOS</h1>
      <p className="muted">Jogos em desenvolvimento, previsões de lançamento, devlogs e testes beta. Siga os projetos para receber novidades.</p>
      <h2 className="mt">Em desenvolvimento e anunciados</h2>
      <Loader state={upcoming}>{(d) => (d.games.length ? <div className="games-grid">{d.games.map((g) => <GameCard key={g.id} game={g} />)}</div>
        : <Empty icon="rocket" title="Nenhum projeto em desenvolvimento ainda">Desenvolvedores podem apresentar jogos que ainda estão criando, com imagens, vídeos, previsões e devlogs.<div className="mt"><Link className="btn primary" to="/criador/jogos/novo">Apresentar meu projeto</Link></div></Empty>)}</Loader>
      <h2 className="mt">Acesso antecipado</h2>
      <Loader state={early}>{(d) => (d.games.length ? <div className="games-grid">{d.games.map((g) => <GameCard key={g.id} game={g} />)}</div> : <p className="muted">Nenhum jogo em acesso antecipado no momento.</p>)}</Loader>
    </div>
  );
}
