import { useState } from 'react';
import { api } from '../api.js';
import { useLoad, Loader, Tabs, GameCard, Empty } from '../components/ui.jsx';

export default function Library() {
  const [tab, setTab] = useState('biblioteca');
  const url = { biblioteca: '/users/me/library', historico: '/users/me/history', desejos: '/users/me/wishlist', favoritos: '/users/me/favorites' }[tab];
  const s = useLoad(() => api.get(url), [url]);
  return (
    <div>
      <h1>Biblioteca</h1>
      <Tabs value={tab} onChange={setTab} tabs={[['biblioteca', 'Meus jogos'], ['historico', 'Histórico'], ['desejos', 'Lista de desejos'], ['favoritos', 'Favoritos']]} />
      <Loader state={s}>{(d) => {
        const list = d.games || d.history;
        return list.length ? <div className="games-grid">{list.map((g) => <div key={g.id} className="stack"><GameCard game={g} />{g.playMinutes !== undefined && <span className="tiny muted">{g.playMinutes} min jogados</span>}</div>)}</div> : <Empty icon="bookmark" title="Nada aqui ainda">Jogos que você jogar, comprar, favoritar ou adicionar à lista de desejos aparecem aqui.</Empty>;
      }}</Loader>
    </div>
  );
}
