import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';
import { useLoad, Loader, Avatar, ActionButton, Empty } from '../components/ui.jsx';

export default function Friends() {
  const s = useLoad(() => api.get('/users/me/friends'), []);
  const [q, setQ] = useState('');
  const search = useLoad(() => (q.length >= 2 ? api.get(`/users/search?q=${encodeURIComponent(q)}`) : Promise.resolve({ users: [] })), [q]);
  const Row = ({ u, children }) => <div className="row between card" style={{ padding: 10 }}><Link to={`/u/${u.username}`} className="row"><Avatar user={u} size={36} /><div><b>{u.displayName}</b><div className="tiny muted">@{u.username}{u.online !== undefined && (u.online ? ' · online' : '')}</div></div></Link><div className="row">{children}</div></div>;
  return (
    <div className="grid cols-2">
      <div className="stack">
        <h1>Amigos</h1>
        <Loader state={s}>{(d) => (
          <>
            {d.incoming.length > 0 && <><h3>Pedidos recebidos</h3>{d.incoming.map((u) => <Row key={u.id} u={u}><ActionButton className="btn sm primary" onClick={async () => { await api.post(`/users/${u.username}/friend`); s.reload(); }}>Aceitar</ActionButton><ActionButton className="btn sm" onClick={async () => { await api.del(`/users/${u.username}/friend`); s.reload(); }}>Recusar</ActionButton></Row>)}</>}
            {d.friends.length ? d.friends.map((u) => <Row key={u.id} u={u}><Link className="btn sm" to={`/mensagens/${u.username}`}>Mensagem</Link></Row>) : <Empty icon="users" title="Nenhum amigo ainda">Busque jogadores ao lado e envie pedidos de amizade.</Empty>}
            {d.outgoing.length > 0 && <><h3>Pedidos enviados</h3>{d.outgoing.map((u) => <Row key={u.id} u={u}><ActionButton className="btn sm" onClick={async () => { await api.del(`/users/${u.username}/friend`); s.reload(); }}>Cancelar</ActionButton></Row>)}</>}
          </>
        )}</Loader>
      </div>
      <div className="stack">
        <h2>Encontrar jogadores e criadores</h2>
        <input className="input" placeholder="Nome de usuário…" value={q} onChange={(e) => setQ(e.target.value)} />
        <Loader state={search}>{(d) => d.users.map((u) => <Row key={u.id} u={u}><ActionButton className="btn sm" ok="Pedido enviado!" onClick={() => api.post(`/users/${u.username}/friend`)}>Adicionar</ActionButton><ActionButton className="btn sm" ok="Seguindo!" onClick={() => api.post(`/users/${u.username}/follow`)}>Seguir</ActionButton></Row>)}</Loader>
      </div>
    </div>
  );
}
