import { useState } from 'react';
import { api } from '../api.js';
import { useAuth } from '../auth.jsx';
import { Field, ActionButton, useLoad, Loader, Avatar, Tabs } from '../components/ui.jsx';

export default function Settings() {
  const { user, setUser, refresh } = useAuth();
  const [tab, setTab] = useState('perfil');
  const [v, setV] = useState({ displayName: user.displayName, bio: user.bio || '', privacy: { ...user.privacy } });
  const [pw, setPw] = useState({ current: '', password: '' });
  const blocks = useLoad(() => api.get('/users/me/blocks'), []);
  const upload = async (kind, file) => { const f = new FormData(); f.append('file', file); await api.upload(`/users/me/avatar?kind=${kind}`, f); refresh(); };
  return (
    <div style={{ maxWidth: 760 }}>
      <h1>Configurações</h1>
      <Tabs value={tab} onChange={setTab} tabs={[['perfil', 'Perfil'], ['privacidade', 'Privacidade'], ['seguranca', 'Segurança'], ['bloqueios', 'Bloqueios']]} />
      {tab === 'perfil' && (
        <div className="card stack">
          <div className="row"><Avatar user={user} size={72} />
            <label className="btn sm">Trocar foto<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden onChange={(e) => e.target.files[0] && upload('avatar', e.target.files[0])} /></label>
            <label className="btn sm">Trocar capa do perfil<input type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={(e) => e.target.files[0] && upload('banner', e.target.files[0])} /></label>
          </div>
          <Field label="Nome de exibição"><input className="input" value={v.displayName} maxLength={40} onChange={(e) => setV({ ...v, displayName: e.target.value })} /></Field>
          <Field label="Biografia"><textarea className="input" value={v.bio} maxLength={500} onChange={(e) => setV({ ...v, bio: e.target.value })} /></Field>
          <div><ActionButton className="btn primary" ok="Perfil salvo!" onClick={async () => { const d = await api.patch('/users/me/profile', { displayName: v.displayName, bio: v.bio }); setUser(d.user); }}>Salvar</ActionButton></div>
          <p className="small muted">Molduras, temas, efeitos e emblemas são adquiridos na loja do NEXPLAY REWARDS e equipados por lá.</p>
        </div>
      )}
      {tab === 'privacidade' && (
        <div className="card stack">
          <Field label="Quem pode ver meu perfil"><select className="input" value={v.privacy.profile} onChange={(e) => setV({ ...v, privacy: { ...v.privacy, profile: e.target.value } })}><option value="public">Todos</option><option value="friends">Somente amigos</option><option value="private">Somente eu</option></select></Field>
          <Field label="Quem pode me enviar mensagens"><select className="input" value={v.privacy.messages} onChange={(e) => setV({ ...v, privacy: { ...v.privacy, messages: e.target.value } })}><option value="friends">Somente amigos</option><option value="nobody">Ninguém</option></select></Field>
          <Field label="Quem vê minha atividade"><select className="input" value={v.privacy.activity} onChange={(e) => setV({ ...v, privacy: { ...v.privacy, activity: e.target.value } })}><option value="public">Todos</option><option value="friends">Somente amigos</option><option value="private">Somente eu</option></select></Field>
          <div><ActionButton className="btn primary" ok="Privacidade atualizada!" onClick={async () => { const d = await api.patch('/users/me/profile', { privacy: v.privacy }); setUser(d.user); }}>Salvar</ActionButton></div>
        </div>
      )}
      {tab === 'seguranca' && (
        <div className="card stack">
          <div className="row between"><div>E-mail: <b>{user.email}</b> {user.emailVerified ? <span className="pill green">confirmado</span> : <span className="pill red">não confirmado</span>}</div>
            {!user.emailVerified && <ActionButton className="btn sm" onClick={async () => { const r = await api.post('/auth/resend-verification'); alert(r.emailSent ? 'Link enviado para seu e-mail.' : 'O envio de e-mails ainda não está configurado neste servidor.'); }}>Reenviar confirmação</ActionButton>}</div>
          <h3>Alterar senha</h3>
          <Field label="Senha atual"><input className="input" type="password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} autoComplete="current-password" /></Field>
          <Field label="Nova senha" hint="Mínimo de 10 caracteres, com letras e números. Outras sessões serão encerradas."><input className="input" type="password" value={pw.password} onChange={(e) => setPw({ ...pw, password: e.target.value })} autoComplete="new-password" /></Field>
          <div><ActionButton className="btn primary" ok="Senha alterada!" onClick={async () => { await api.post('/auth/change-password', pw); setPw({ current: '', password: '' }); }}>Alterar senha</ActionButton></div>
        </div>
      )}
      {tab === 'bloqueios' && <Loader state={blocks}>{(d) => <div className="card stack">{d.users.length ? d.users.map((u) => <div key={u.id} className="row between"><span className="row"><Avatar user={u} size={30} />{u.displayName}</span><ActionButton className="btn sm" onClick={async () => { await api.del(`/users/${u.username}/block`); blocks.reload(); }}>Desbloquear</ActionButton></div>) : <p className="muted">Você não bloqueou ninguém.</p>}</div>}</Loader>}
    </div>
  );
}
