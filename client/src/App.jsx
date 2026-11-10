import { lazy, Suspense, useEffect, useState } from 'react';
import { Link, NavLink, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './auth.jsx';
import { Icon } from './components/icons.jsx';
import { Avatar, PlanBadge } from './components/ui.jsx';
import { nc } from './api.js';
import { STANDALONE } from './standalone.js';
import Home from './pages/Home.jsx';
import Explore from './pages/Explore.jsx';
import GameDetail from './pages/GameDetail.jsx';
import { Login, Register, Forgot, Reset, VerifyEmail } from './pages/Auth.jsx';

const Play = lazy(() => import('./pages/Play.jsx'));
const Arcade = lazy(() => import('./pages/Arcade.jsx'));
const Multiplayer = lazy(() => import('./pages/Multiplayer.jsx'));
const Launches = lazy(() => import('./pages/Launches.jsx'));
const Picks = lazy(() => import('./pages/Picks.jsx'));
const Community = lazy(() => import('./pages/Community.jsx'));
const Events = lazy(() => import('./pages/Events.jsx'));
const EventDetail = lazy(() => import('./pages/EventDetail.jsx'));
const Rewards = lazy(() => import('./pages/Rewards.jsx'));
const Plans = lazy(() => import('./pages/Plans.jsx'));
const Profile = lazy(() => import('./pages/Profile.jsx'));
const Settings = lazy(() => import('./pages/Settings.jsx'));
const Friends = lazy(() => import('./pages/Friends.jsx'));
const Messages = lazy(() => import('./pages/Messages.jsx'));
const Notifications = lazy(() => import('./pages/Notifications.jsx'));
const Library = lazy(() => import('./pages/Library.jsx'));
const Creator = lazy(() => import('./pages/Creator.jsx'));
const GameEditor = lazy(() => import('./pages/GameEditor.jsx'));
const Studios = lazy(() => import('./pages/Studios.jsx'));
const StudioPage = lazy(() => import('./pages/StudioPage.jsx'));
const StudioHome = lazy(() => import('./pages/StudioHome.jsx'));
const SubmitGame = lazy(() => import('./pages/SubmitGame.jsx'));
const AIChat = lazy(() => import('./pages/AIChat.jsx'));
const LocalGames = lazy(() => import('./pages/LocalGames.jsx'));
const BundledGame = import.meta.env.VITE_STANDALONE === '1' ? lazy(() => import('./pages/BundledGame.jsx')) : null;
const StudioEditor = lazy(() => import('./studio/StudioEditor.jsx'));
const DeluxeLab = lazy(() => import('./pages/DeluxeLab.jsx'));
const Admin = lazy(() => import('./pages/admin/Admin.jsx'));
const Terms = lazy(() => import('./pages/Terms.jsx'));

const NAV = [
  ['Descobrir', [['/', 'home', 'Início'], ['/arcade', 'gamepad', 'NEXPLAY Arcade'], ['/explorar', 'compass', 'Explorar'], ['/multiplayer', 'users', 'MULTIPLAYER'], ['/lancamentos', 'rocket', 'LANÇAMENTOS'], ['/picks', 'star', 'NEXPLAY PICKS']]],
  ['Comunidade', [['/comunidade', 'globe', 'Comunidade'], ['/eventos', 'trophy', 'Eventos e Awards'], ['/estudios', 'building', 'Estúdios']]],
  ['Criar', [['/criar-com-ia', 'sparkles', 'Criar com IA'], ['/studio/novo', 'plus', 'Criar jogo'], ['/enviar-jogo', 'upload', 'Enviar jogo pronto'], ['/studio', 'cube', 'NEXPLAY STUDIO'], ['/criador', 'chart', 'Painel do criador'], ['/deluxe-lab', 'sparkles', 'DELUXE LAB']]],
  ['Conta', [['/rewards', 'gift', 'NEXPLAY REWARDS'], ['/planos', 'crown', 'Planos'], ['/biblioteca', 'bookmark', 'Biblioteca']]],
];

function Sidebar({ open, onClose }) {
  const { user, isStaff } = useAuth();
  return (
    <>
      {open && <div className="scrim" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'open' : ''}`} onClick={(e) => e.target.closest('a') && onClose()}>
        <Link to="/" className="brand"><span className="brand-mark"><Icon name="gamepad" size={20} /></span><span>NEX<b>PLAY</b></span></Link>
        {NAV.map(([section, items]) => (
          <div key={section}>
            <div className="nav-section">{section}</div>
            {items.map(([to, icon, label]) => (
              <NavLink key={to} to={to} end={to === '/' || to === '/studio'} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <Icon name={icon} />{label}
                {to === '/deluxe-lab' && <span className="nav-badge">LAB</span>}
              </NavLink>
            ))}
          </div>
        ))}
        {isStaff && (
          <>
            <div className="nav-section">Administração</div>
            <NavLink to="/admin" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><Icon name="shield" />Painel admin</NavLink>
          </>
        )}
        <div style={{ marginTop: 'auto', padding: '16px 8px 4px' }} className="tiny muted">
          {user && <div className="row" style={{ marginBottom: 8 }}><Icon name="coin" size={16} /> {nc(user.nc)}</div>}
          <Link to="/termos">Regras e termos</Link> · © {new Date().getFullYear()} NEXPLAY
        </div>
      </aside>
    </>
  );
}

function Topbar({ onMenu }) {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [q, setQ] = useState('');
  const [menu, setMenu] = useState(false);
  return (
    <header className="topbar">
      <button className="icon-btn hamburger" onClick={onMenu} aria-label="Abrir menu"><Icon name="menu" /></button>
      <form className="search" onSubmit={(e) => { e.preventDefault(); nav(`/explorar?q=${encodeURIComponent(q)}`); }}>
        <Icon name="search" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar jogos, gêneros, tags…" aria-label="Buscar" />
      </form>
      <div className="top-actions">
        {user ? (
          <>
            <Link to="/mensagens" className="icon-btn hide-mobile" aria-label="Mensagens"><Icon name="chat" />{user.unreadMessages > 0 && <span className="dot">{user.unreadMessages}</span>}</Link>
            <Link to="/notificacoes" className="icon-btn" aria-label="Notificações"><Icon name="bell" />{user.unreadNotifications > 0 && <span className="dot">{user.unreadNotifications}</span>}</Link>
            <div style={{ position: 'relative' }}>
              <button className="row" style={{ background: 'none', border: 0, cursor: 'pointer', gap: 8 }} onClick={() => setMenu((m) => !m)} aria-label="Menu do perfil">
                <Avatar user={user} size={38} />
                <span className="hide-mobile" style={{ textAlign: 'left', lineHeight: 1.2 }}>
                  <b style={{ fontSize: 14 }}>{user.displayName}</b><br /><PlanBadge plan={user.plan.code} />{user.plan.code === 'free' && <span className="tiny muted">FREE</span>}
                </span>
              </button>
              {menu && (
                <div className="card stack" style={{ position: 'absolute', right: 0, top: 50, width: 230, padding: 10, gap: 2, zIndex: 30 }} onClick={() => setMenu(false)}>
                  <Link className="nav-link" to={`/u/${user.username}`}><Icon name="users" />Meu perfil</Link>
                  <Link className="nav-link" to="/amigos"><Icon name="heart" />Amigos</Link>
                  <Link className="nav-link" to="/mensagens"><Icon name="chat" />Mensagens</Link>
                  <Link className="nav-link" to="/configuracoes"><Icon name="settings" />Configurações</Link>
                  <button className="nav-link" style={{ border: 0, background: 'none', cursor: 'pointer', width: '100%' }} onClick={async () => { await logout(); nav('/'); }}><Icon name="logout" />Sair</button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/entrar" className="btn ghost">Entrar</Link>
            <Link to="/cadastro" className="btn primary">Criar conta</Link>
          </>
        )}
      </div>
    </header>
  );
}

function MobileNav() {
  const items = [['/', 'home', 'Início'], ['/arcade', 'gamepad', 'Arcade'], ['/criar-com-ia', 'sparkles', 'Criar com IA'], ['/studio', 'cube', 'Studio'], ['/comunidade', 'globe', 'Social']];
  return <nav className="mobile-nav">{items.map(([to, icon, label]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}><Icon name={icon} />{label}</NavLink>)}</nav>;
}

export function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const loc = useLocation();
  if (loading) return <div className="spinner" />;
  if (!user) return <Navigate to={`/entrar?next=${encodeURIComponent(loc.pathname + loc.search)}`} replace />;
  return children;
}

// Versão sem servidor: só o que roda no aparelho (Início, Arcade, Studio com editor e NEXPLAY AI).
const LOCAL_OK = /^\/($|arcade$|studio($|\/)|criar-com-ia($|\/)|enviar-jogo$|jogo\/[^/]+$|termos$)/;
function ServerOnly() {
  return (
    <div className="empty fade-in">
      <Icon name="cloud" />
      <h3>Esta área precisa do servidor da NEXPLAY</h3>
      <div className="muted" style={{ maxWidth: 560 }}>Você está na versão para celular, sem servidor. Aqui funcionam o <b>NEXPLAY Studio</b> (criar, editar, testar e salvar projetos neste aparelho) e a <b>NEXPLAY AI</b>. Contas, comunidade, Arcade com jogos publicados e publicação funcionam na plataforma completa.</div>
      <div className="row mt" style={{ justifyContent: 'center' }}><Link className="btn primary" to="/studio">Abrir o NEXPLAY Studio</Link><Link className="btn" to="/studio/novo">Criar jogo</Link></div>
    </div>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [loc.pathname]);
  const fullBleed = /^\/studio\/\d+/.test(loc.pathname);
  return (
    <div className="app">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="main">
        <Topbar onMenu={() => setOpen(true)} />
        <main className={fullBleed ? '' : 'content'}>
          {STANDALONE && !fullBleed && !loc.pathname.startsWith('/criar-com-ia') && <div className="tiny muted" style={{ marginBottom: 12, padding: '8px 12px', border: '1px solid var(--line)', borderRadius: 10 }}>Versão para celular, sem servidor: seus projetos ficam salvos <b>neste aparelho</b>. Publicar no Arcade para outras pessoas só na plataforma completa.</div>}
          <Suspense fallback={<div className="spinner" />}>
            {STANDALONE && !LOCAL_OK.test(loc.pathname) ? <ServerOnly /> : (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/arcade" element={<Arcade />} />
              <Route path="/explorar" element={<Explore />} />
              <Route path="/jogo/:slug" element={STANDALONE ? <BundledGame /> : <GameDetail />} />
              <Route path="/jogo/:slug/jogar" element={<RequireAuth><Play /></RequireAuth>} />
              <Route path="/multiplayer" element={<Multiplayer />} />
              <Route path="/lancamentos" element={<Launches />} />
              <Route path="/picks" element={<Picks />} />
              <Route path="/comunidade" element={<Community />} />
              <Route path="/eventos" element={<Events />} />
              <Route path="/eventos/:slug" element={<EventDetail />} />
              <Route path="/rewards" element={<RequireAuth><Rewards /></RequireAuth>} />
              <Route path="/planos" element={<Plans />} />
              <Route path="/u/:username" element={<Profile />} />
              <Route path="/configuracoes" element={<RequireAuth><Settings /></RequireAuth>} />
              <Route path="/amigos" element={<RequireAuth><Friends /></RequireAuth>} />
              <Route path="/mensagens" element={<RequireAuth><Messages /></RequireAuth>} />
              <Route path="/mensagens/:username" element={<RequireAuth><Messages /></RequireAuth>} />
              <Route path="/notificacoes" element={<RequireAuth><Notifications /></RequireAuth>} />
              <Route path="/biblioteca" element={<RequireAuth><Library /></RequireAuth>} />
              <Route path="/criador" element={<RequireAuth><Creator /></RequireAuth>} />
              <Route path="/criador/jogos/novo" element={<RequireAuth><GameEditor /></RequireAuth>} />
              <Route path="/criador/jogos/:id" element={<RequireAuth><GameEditor /></RequireAuth>} />
              <Route path="/estudios" element={<Studios />} />
              <Route path="/estudios/:slug" element={<StudioPage />} />
              <Route path="/studio" element={<RequireAuth><StudioHome /></RequireAuth>} />
              <Route path="/criar-com-ia" element={<RequireAuth><AIChat /></RequireAuth>} />
              <Route path="/criar-com-ia/:id" element={<RequireAuth><AIChat /></RequireAuth>} />
              <Route path="/studio/novo" element={<RequireAuth><StudioHome /></RequireAuth>} />
              <Route path="/studio/:id" element={<RequireAuth><StudioEditor /></RequireAuth>} />
              <Route path="/enviar-jogo" element={<RequireAuth>{STANDALONE ? <LocalGames /> : <SubmitGame />}</RequireAuth>} />
              <Route path="/deluxe-lab" element={<DeluxeLab />} />
              <Route path="/admin/*" element={<RequireAuth><Admin /></RequireAuth>} />
              <Route path="/termos" element={<Terms />} />
              <Route path="/entrar" element={<Login />} />
              <Route path="/cadastro" element={<Register />} />
              <Route path="/recuperar" element={<Forgot />} />
              <Route path="/redefinir-senha" element={<Reset />} />
              <Route path="/verificar-email" element={<VerifyEmail />} />
              <Route path="*" element={<div className="empty"><h2>Página não encontrada</h2><Link className="btn primary" to="/">Voltar ao início</Link></div>} />
            </Routes>
            )}
          </Suspense>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
