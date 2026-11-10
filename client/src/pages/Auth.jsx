import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../api.js';
import { useAuth } from '../auth.jsx';
import { Field } from '../components/ui.jsx';
import { Icon } from '../components/icons.jsx';

function Shell({ title, subtitle, children }) {
  return (
    <div style={{ maxWidth: 440, margin: '30px auto' }} className="card fade-in">
      <div className="center mb"><span className="brand-mark" style={{ margin: '0 auto 12px', width: 48, height: 48 }}><Icon name="gamepad" size={26} /></span><h1>{title}</h1>{subtitle && <p className="muted">{subtitle}</p>}</div>
      {children}
    </div>
  );
}

function useForm(initial) {
  const [v, setV] = useState(initial);
  return [v, (k) => (e) => setV((s) => ({ ...s, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))];
}

export function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [params] = useSearchParams();
  const [v, on] = useForm({ login: '', password: '' });
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);
  return (
    <Shell title="Entrar na NEXPLAY">
      <form className="stack" onSubmit={async (e) => { e.preventDefault(); setBusy(true); setErr(null); try { await login(v.login, v.password); nav(params.get('next') || '/'); } catch (x) { setErr(x.message); } finally { setBusy(false); } }}>
        {err && <div className="error-box">{err}</div>}
        <Field label="Usuário ou e-mail"><input className="input" value={v.login} onChange={on('login')} autoComplete="username" required /></Field>
        <Field label="Senha"><input className="input" type="password" value={v.password} onChange={on('password')} autoComplete="current-password" required /></Field>
        <button className="btn primary lg" disabled={busy}>{busy ? 'Entrando…' : 'Entrar'}</button>
        <div className="row between small"><Link to="/recuperar">Esqueci minha senha</Link><Link to="/cadastro">Criar conta</Link></div>
      </form>
    </Shell>
  );
}

export function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [v, on] = useForm({ username: '', displayName: '', email: '', password: '', acceptTerms: false, website: '' });
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);
  return (
    <Shell title="Criar conta" subtitle="Grátis. Jogue, publique e crie jogos.">
      <form className="stack" onSubmit={async (e) => { e.preventDefault(); setBusy(true); setErr(null); try { await register(v); nav('/'); } catch (x) { setErr(x.message); } finally { setBusy(false); } }}>
        {err && <div className="error-box">{err}</div>}
        <Field label="Nome de usuário" hint="3–24 caracteres: letras, números, ponto e sublinhado."><input className="input" value={v.username} onChange={on('username')} autoComplete="username" required /></Field>
        <Field label="Nome de exibição"><input className="input" value={v.displayName} onChange={on('displayName')} maxLength={40} /></Field>
        <Field label="E-mail"><input className="input" type="email" value={v.email} onChange={on('email')} autoComplete="email" required /></Field>
        <Field label="Senha" hint="Mínimo de 10 caracteres, com letras e números."><input className="input" type="password" value={v.password} onChange={on('password')} autoComplete="new-password" required /></Field>
        <input type="text" name="website" value={v.website} onChange={on('website')} tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: -9999 }} aria-hidden="true" />
        <label className="check"><input type="checkbox" checked={v.acceptTerms} onChange={on('acceptTerms')} /> <span>Li e aceito as <Link to="/termos" target="_blank">regras e termos de uso</Link>.</span></label>
        <button className="btn primary lg" disabled={busy}>{busy ? 'Criando…' : 'Criar conta'}</button>
        <div className="small center">Já tem conta? <Link to="/entrar">Entrar</Link></div>
      </form>
    </Shell>
  );
}

export function Forgot() {
  const [email, setEmail] = useState('');
  const [res, setRes] = useState(null);
  const [err, setErr] = useState(null);
  return (
    <Shell title="Recuperar conta" subtitle="Enviaremos um link para redefinir sua senha.">
      {res ? (
        <div className="info-box">{res.mailConfigured ? 'Se existir uma conta com este e-mail, você receberá o link em instantes.' : 'O envio de e-mails ainda não está configurado neste servidor. Peça ao administrador para configurar o SMTP (o link foi registrado no console do servidor).'}</div>
      ) : (
        <form className="stack" onSubmit={async (e) => { e.preventDefault(); try { setRes(await api.post('/auth/forgot-password', { email })); } catch (x) { setErr(x.message); } }}>
          {err && <div className="error-box">{err}</div>}
          <Field label="E-mail"><input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></Field>
          <button className="btn primary">Enviar link</button>
        </form>
      )}
    </Shell>
  );
}

export function Reset() {
  const [params] = useSearchParams();
  const nav = useNavigate();
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);
  const [ok, setOk] = useState(false);
  return (
    <Shell title="Nova senha">
      {ok ? <div className="info-box">Senha alterada. <Link to="/entrar">Entrar</Link></div> : (
        <form className="stack" onSubmit={async (e) => { e.preventDefault(); try { await api.post('/auth/reset-password', { token: params.get('token'), password }); setOk(true); setTimeout(() => nav('/entrar'), 1500); } catch (x) { setErr(x.message); } }}>
          {err && <div className="error-box">{err}</div>}
          <Field label="Nova senha" hint="Mínimo de 10 caracteres, com letras e números."><input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" required /></Field>
          <button className="btn primary">Salvar nova senha</button>
        </form>
      )}
    </Shell>
  );
}

export function VerifyEmail() {
  const [params] = useSearchParams();
  const { refresh } = useAuth();
  const [state, setState] = useState('loading');
  useEffect(() => {
    api.post('/auth/verify-email', { token: params.get('token') }).then(() => { setState('ok'); refresh(); }).catch((e) => setState(e.message));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return <Shell title="Confirmação de e-mail">{state === 'loading' ? <div className="spinner" /> : state === 'ok' ? <div className="info-box">E-mail confirmado! <Link to="/">Ir para o início</Link></div> : <div className="error-box">{state}</div>}</Shell>;
}
