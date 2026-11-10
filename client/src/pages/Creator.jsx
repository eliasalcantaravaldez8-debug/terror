import { Link } from 'react-router-dom';
import { api, brl } from '../api.js';
import { useLoad, Loader, Empty, Stars } from '../components/ui.jsx';
import { Icon } from '../components/icons.jsx';

const STATUS = { draft: ['Rascunho', ''], in_development: ['Em LANÇAMENTOS', 'cyan'], pending_review: ['Em revisão', 'gold'], published: ['Publicado', 'green'], rejected: ['Precisa de ajustes', 'red'], removed: ['Removido', 'red'] };

export default function Creator() {
  const s = useLoad(() => api.get('/games/mine'), []);
  const earnings = useLoad(() => api.get('/payments/earnings'), []);
  return (
    <div>
      <div className="row between"><h1>Painel do criador</h1><div className="row"><Link className="btn" to="/estudios"><Icon name="building" /> Estúdios</Link><Link className="btn primary" to="/criador/jogos/novo"><Icon name="plus" /> Novo jogo</Link></div></div>
      <Loader state={earnings}>{(e) => (
        <div className="grid cols-3 mb">
          <div className="card"><div className="small muted">Receita bruta</div><div className="kpi">{brl(e.totals.gross)}</div></div>
          <div className="card"><div className="small muted">Receita líquida</div><div className="kpi gradient-text">{brl(e.totals.net)}</div><div className="tiny muted">Comissão da plataforma: {(e.feeBps / 100).toFixed(1)}%</div></div>
          <div className="card"><div className="small muted">Origem</div>{e.byFunding.length ? e.byFunding.map((f) => <div key={f.funding} className="small">{f.funding === 'money' ? 'Pagamentos' : 'Créditos NEXPLAY'}: <b>{brl(f.net)}</b></div>) : <div className="small muted">Sem vendas ainda. A receita aparece aqui quando houver vendas integradas.</div>}</div>
        </div>
      )}</Loader>
      <Loader state={s}>{(d) => (d.games.length ? (
        <div className="card table-wrap"><table className="table"><thead><tr><th>Jogo</th><th>Status</th><th>Avaliação</th><th>Visualizações</th><th /></tr></thead>
          <tbody>{d.games.map((g) => <tr key={g.id}><td><b>{g.title}</b><div className="tiny muted">{g.studio ? `Estúdio ${g.studio.name}` : 'Pessoal'}</div>{g.moderationNotes && <div className="tiny" style={{ color: '#fecdd3' }}>Moderação: {g.moderationNotes}</div>}</td><td><span className={`pill ${STATUS[g.status][1]}`}>{STATUS[g.status][0]}</span></td><td><Stars value={g.rating.avg} /></td><td>{g.views}</td><td><Link className="btn sm" to={`/criador/jogos/${g.id}`}>Gerenciar</Link></td></tr>)}</tbody></table></div>
      ) : <Empty icon="upload" title="Você ainda não publicou jogos">Publique um build HTML5/WebGL (Godot, Unity WebGL, Phaser, Three.js…) ou crie um jogo no NEXPLAY STUDIO.<div className="row mt" style={{ justifyContent: 'center' }}><Link className="btn primary" to="/criador/jogos/novo">Publicar jogo</Link><Link className="btn" to="/studio">Abrir Studio</Link></div></Empty>)}</Loader>
    </div>
  );
}
