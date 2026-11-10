import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api, GENRE_LABEL, MODE_LABEL, isMobileDevice } from '../api.js';
import { useLoad, Loader, GameCard, Empty } from '../components/ui.jsx';

const GENRES = Object.keys(GENRE_LABEL).filter((g) => g !== 'vazio');

export default function Explore({ multiplayerOnly = false, title = 'Explorar jogos' }) {
  const [params, setParams] = useSearchParams();
  const [device, setDevice] = useState(params.get('device') ?? (isMobileDevice() ? 'mobile' : ''));
  useEffect(() => { if (!params.has('device') && device) setParams((p) => { p.set('device', device); return p; }, { replace: true }); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const qs = new URLSearchParams(params);
  if (multiplayerOnly) qs.set('multiplayer', '1');
  const state = useLoad(() => api.get(`/games?${qs.toString()}`), [qs.toString()]);
  const set = (k, v) => setParams((p) => { if (v) p.set(k, v); else p.delete(k); p.delete('offset'); return p; });
  return (
    <div>
      <h1>{title}</h1>
      <div className="card row mb" style={{ gap: 10 }}>
        <input className="input" style={{ flex: '1 1 200px' }} placeholder="Buscar…" defaultValue={params.get('q') || ''} onKeyDown={(e) => e.key === 'Enter' && set('q', e.currentTarget.value)} />
        <select className="input" style={{ width: 'auto' }} value={params.get('genre') || ''} onChange={(e) => set('genre', e.target.value)} aria-label="Gênero">
          <option value="">Todos os gêneros</option>{GENRES.map((g) => <option key={g} value={g}>{GENRE_LABEL[g]}</option>)}
        </select>
        <select className="input" style={{ width: 'auto' }} value={device} onChange={(e) => { setDevice(e.target.value); set('device', e.target.value); }} aria-label="Dispositivo">
          <option value="">Qualquer dispositivo</option><option value="pc">Compatível com PC</option><option value="mobile">Compatível com celular</option>
        </select>
        <select className="input" style={{ width: 'auto' }} value={params.get('price') || ''} onChange={(e) => set('price', e.target.value)} aria-label="Preço">
          <option value="">Qualquer preço</option><option value="free">Grátis</option><option value="paid">Pagos</option>
        </select>
        <select className="input" style={{ width: 'auto' }} value={params.get('mode') || ''} onChange={(e) => set('mode', e.target.value)} aria-label="Modo de jogo">
          <option value="">Todos os modos</option>{Object.entries(MODE_LABEL).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
        </select>
        <select className="input" style={{ width: 'auto' }} value={params.get('sort') || 'recent'} onChange={(e) => set('sort', e.target.value)} aria-label="Ordenar">
          <option value="recent">Mais recentes</option><option value="popular">Populares</option><option value="rating">Melhor avaliados</option><option value="title">A–Z</option>
        </select>
      </div>
      {device && <p className="small muted">Mostrando apenas jogos compatíveis com {device === 'mobile' ? 'celular' : 'PC'}. Jogos incompatíveis com seu dispositivo ficam ocultos — altere o filtro para ver todos.</p>}
      <Loader state={state}>
        {(d) => (d.games.length ? (
          <>
            <p className="small muted">{d.total} jogo(s)</p>
            <div className="games-grid">{d.games.map((g) => <GameCard key={g.id} game={g} />)}</div>
            {d.total > d.games.length + Number(params.get('offset') || 0) && <div className="center mt"><button className="btn" onClick={() => set('offset', String(Number(params.get('offset') || 0) + 24))}>Próxima página</button></div>}
          </>
        ) : (
          <Empty icon={multiplayerOnly ? 'users' : 'compass'} title={multiplayerOnly ? 'Nenhum jogo multiplayer encontrado' : 'Nenhum jogo encontrado'}>
            {multiplayerOnly ? 'Aqui aparecem apenas jogos cujos criadores declararam suporte real a multiplayer.' : 'Tente outros filtros. O catálogo cresce conforme desenvolvedores publicam seus jogos.'}
            <div className="mt"><Link to="/criador/jogos/novo" className="btn primary">Publicar um jogo</Link></div>
          </Empty>
        ))}
      </Loader>
    </div>
  );
}
