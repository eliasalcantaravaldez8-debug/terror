import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { useAuth } from '../auth.jsx';
import { useLoad, Loader, Modal, Field, ActionButton, Empty } from '../components/ui.jsx';
import { Icon } from '../components/icons.jsx';

export default function Studios() {
  const { user } = useAuth();
  const s = useLoad(() => api.get('/studios'), []);
  const [open, setOpen] = useState(false);
  const [v, setV] = useState({ name: '', description: '', accentColor: '#8b5cf6' });
  const nav = useNavigate();
  return (
    <div>
      <div className="row between"><h1>Estúdios</h1>{user && <button className="btn primary" onClick={() => setOpen(true)}><Icon name="plus" /> Criar estúdio</button>}</div>
      <Loader state={s}>{(d) => (d.studios.length ? <div className="grid cols-3">{d.studios.map((x) => (
        <Link key={x.id} to={`/estudios/${x.slug}`} className="card hover row"><div className="avatar" style={{ width: 54, height: 54, borderRadius: 14, background: x.accentColor }}>{x.logoUrl ? <img src={x.logoUrl} alt="" /> : x.name[0]}</div><div><b>{x.name}</b><div className="small muted">{x.description.slice(0, 80)}</div></div></Link>
      ))}</div> : <Empty icon="building" title="Nenhum estúdio ainda">Crie um estúdio para publicar jogos em equipe, dividir funções e divulgar atualizações.</Empty>)}</Loader>
      {open && (
        <Modal title="Criar estúdio" onClose={() => setOpen(false)}>
          <div className="stack">
            <Field label="Nome"><input className="input" value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} /></Field>
            <Field label="Descrição"><textarea className="input" value={v.description} onChange={(e) => setV({ ...v, description: e.target.value })} /></Field>
            <Field label="Cor de destaque"><input type="color" value={v.accentColor} onChange={(e) => setV({ ...v, accentColor: e.target.value })} /></Field>
            <ActionButton className="btn primary" onClick={async () => { const r = await api.post('/studios', v); nav(`/estudios/${r.studio.slug}`); }}>Criar</ActionButton>
          </div>
        </Modal>
      )}
    </div>
  );
}
