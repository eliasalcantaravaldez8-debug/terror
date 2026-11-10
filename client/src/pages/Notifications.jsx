import { Link } from 'react-router-dom';
import { api, ago } from '../api.js';
import { useAuth } from '../auth.jsx';
import { useLoad, Loader, Empty } from '../components/ui.jsx';

export default function Notifications() {
  const { refresh } = useAuth();
  const s = useLoad(() => api.get('/notifications'), []);
  return (
    <div style={{ maxWidth: 760 }}>
      <div className="row between"><h1>Notificações</h1><button className="btn sm" onClick={async () => { await api.post('/notifications/read'); s.reload(); refresh(); }}>Marcar todas como lidas</button></div>
      <Loader state={s}>{(d) => (d.notifications.length ? <div className="stack">{d.notifications.map((n) => {
        const inner = <div className="card" style={{ padding: 12, borderColor: n.read_at ? undefined : 'var(--violet)' }}><div className="row between"><b>{n.title}</b><span className="tiny muted">{ago(n.created_at)}</span></div>{n.body && <div className="small muted">{n.body}</div>}</div>;
        return n.link ? <Link key={n.id} to={n.link} onClick={() => api.post('/notifications/read', { ids: [n.id] }).then(refresh)}>{inner}</Link> : <div key={n.id}>{inner}</div>;
      })}</div> : <Empty icon="bell" title="Nada por aqui">Você será avisado sobre amizades, avaliações, eventos, recompensas e atualizações de jogos que segue.</Empty>)}</Loader>
    </div>
  );
}
