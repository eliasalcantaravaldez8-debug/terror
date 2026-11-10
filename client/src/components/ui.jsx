// Componentes de interface reutilizáveis.
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './icons.jsx';
import { api, brl, GENRE_LABEL, PLATFORM_LABEL, STAGE_LABEL } from '../api.js';

const ToastCtx = createContext(() => {});
export function ToastProvider({ children }) {
  const [list, setList] = useState([]);
  const push = useCallback((text, kind = 'info') => {
    const id = Math.random();
    setList((l) => [...l, { id, text, kind }]);
    setTimeout(() => setList((l) => l.filter((t) => t.id !== id)), 4500);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="toasts" role="status">{list.map((t) => <div key={t.id} className={`toast ${t.kind}`}>{t.text}</div>)}</div>
    </ToastCtx.Provider>
  );
}
export const useToast = () => useContext(ToastCtx);

/** Hook de carregamento de dados com estado de erro e recarga. */
export function useLoad(fn, deps = []) {
  const [state, setState] = useState({ loading: true, data: null, error: null });
  const load = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: null }));
    return fn().then((data) => setState({ loading: false, data, error: null })).catch((error) => setState({ loading: false, data: null, error }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  useEffect(() => { load(); }, [load]);
  return { ...state, reload: load, setData: (d) => setState((s) => ({ ...s, data: typeof d === 'function' ? d(s.data) : d })) };
}

export function Loader({ state, children }) {
  if (state.loading && !state.data) return <div className="spinner" />;
  if (state.error) return <div className="error-box">{state.error.message}</div>;
  return children(state.data);
}

export function Empty({ icon = 'info', title, children }) {
  return (
    <div className="empty fade-in">
      <Icon name={icon} />
      <h3>{title}</h3>
      <div className="muted">{children}</div>
    </div>
  );
}

export function Modal({ title, onClose, children, wide }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);
  return (
    <div className="modal-bg" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={wide ? { width: 'min(860px,100%)' } : undefined} role="dialog" aria-modal="true">
        <div className="row between mb"><h2 style={{ margin: 0 }}>{title}</h2><button className="icon-btn" onClick={onClose} aria-label="Fechar"><Icon name="x" /></button></div>
        {children}
      </div>
    </div>
  );
}

export function Field({ label, children, hint }) {
  return <div className="field"><label>{label}</label>{children}{hint && <span className="tiny muted">{hint}</span>}</div>;
}

export function Tabs({ tabs, value, onChange }) {
  return <div className="tabs">{tabs.map(([k, label]) => <button key={k} className={`tab ${value === k ? 'active' : ''}`} onClick={() => onChange(k)}>{label}</button>)}</div>;
}

const FRAME_COLORS = {
  frame_neon_violet: ['#8b5cf6', '#c084fc'], frame_cyan_circuit: ['#06b6d4', '#22d3ee'],
  frame_aurora: ['#8b5cf6', '#06b6d4', '#ec4899'], frame_deluxe_gold: ['#f59e0b', '#fde68a'],
};
const AVATAR_ITEMS = { avatar_pixel_knight: ['🛡️', '#312e81'], avatar_cyber_fox: ['🦊', '#0e7490'], avatar_void_mage: ['🔮', '#4c1d95'] };

export function Avatar({ user, size = 40 }) {
  const frame = user?.equipped?.frame && FRAME_COLORS[user.equipped.frame];
  const item = user?.avatarUrl?.startsWith('item:') && AVATAR_ITEMS[user.avatarUrl.slice(5)];
  const inner = (
    <div className="avatar" style={{ width: size, height: size, fontSize: size * 0.4, background: item ? item[1] : undefined }}>
      {item ? <span style={{ fontSize: size * 0.55 }}>{item[0]}</span>
        : user?.avatarUrl ? <img src={user.avatarUrl} alt="" loading="lazy" />
          : (user?.displayName || user?.username || '?').slice(0, 1).toUpperCase()}
    </div>
  );
  if (!frame) return inner;
  return <div className="avatar-wrap framed" style={{ '--f1': frame[0], '--f2': frame[1], '--f3': frame[2] }}>{inner}</div>;
}

export function PlanBadge({ plan }) {
  if (plan === 'deluxe') return <span className="badge-deluxe">DELUXE</span>;
  if (plan === 'pro') return <span className="badge-pro">PRO</span>;
  return null;
}

export function Stars({ value }) {
  if (value == null) return <span className="muted small">Sem avaliações</span>;
  const full = Math.round(value);
  return <span className="stars" title={`${value}/5`}>{'★'.repeat(full)}{'☆'.repeat(5 - full)}</span>;
}

export function GameCard({ game }) {
  const mp = game.maxPlayers > 1;
  return (
    <Link to={`/jogo/${game.slug}`} className="game-card fade-in">
      <div className="game-cover">
        {game.coverUrl ? <img src={game.coverUrl} alt="" loading="lazy" /> : <div style={{ display: 'grid', placeItems: 'center', height: '100%' }}><Icon name="gamepad" size={42} style={{ opacity: 0.4 }} /></div>}
        <div className="tags">
          {game.releaseStage && game.releaseStage !== 'released' && <span className="pill cyan">{STAGE_LABEL[game.releaseStage]}</span>}
          {mp && <span className="pill">Até {game.maxPlayers} jogadores</span>}
        </div>
        <span className="price">{game.priceCents ? brl(game.priceCents) : 'Grátis'}</span>
      </div>
      <div className="game-info">
        <div className="game-title">{game.title}</div>
        <div className="game-meta"><span>{game.studio?.name || game.creator?.displayName}</span><span>{GENRE_LABEL[game.genre]}</span></div>
        <div className="game-meta"><Stars value={game.rating?.avg} /><span title="Compatibilidade">{PLATFORM_LABEL[game.platforms]}</span></div>
      </div>
    </Link>
  );
}

export function GameRail({ games }) {
  return <div className="rail">{games.map((g) => <GameCard key={g.id} game={g} />)}</div>;
}

export function SectionHead({ icon, title, to, children }) {
  return (
    <div className="section-head">
      <h2>{icon && <Icon name={icon} />}{title}</h2>
      <div className="row">{children}{to && <Link to={to} className="btn sm ghost">Ver tudo</Link>}</div>
    </div>
  );
}

/** Botão que executa uma ação assíncrona com estado de carregamento e toast de erro. */
export function ActionButton({ onClick, children, className = 'btn', ok, ...rest }) {
  const [busy, setBusy] = useState(false);
  const toast = useToast();
  return (
    <button className={className} disabled={busy || rest.disabled} {...rest} onClick={async (e) => {
      setBusy(true);
      try { await onClick(e); if (ok) toast(ok, 'ok'); } catch (err) { toast(err.message, 'error'); } finally { setBusy(false); }
    }}>{busy ? '…' : children}</button>
  );
}

export function ReportButton({ type, id }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('spam');
  const [details, setDetails] = useState('');
  const toast = useToast();
  return (
    <>
      <button className="btn sm ghost" onClick={() => setOpen(true)} title="Denunciar"><Icon name="flag" /> Denunciar</button>
      {open && (
        <Modal title="Denunciar" onClose={() => setOpen(false)}>
          <div className="stack">
            <Field label="Motivo">
              <select className="input" value={reason} onChange={(e) => setReason(e.target.value)}>
                {[['spam', 'Spam'], ['harassment', 'Assédio'], ['hate', 'Discurso de ódio'], ['sexual', 'Conteúdo sexual'], ['violence', 'Violência'], ['malware', 'Código malicioso'], ['copyright', 'Direitos autorais'], ['cheating', 'Trapaça'], ['fraud', 'Fraude'], ['other', 'Outro']].map(([k, l]) => <option key={k} value={k}>{l}</option>)}
              </select>
            </Field>
            <Field label="Detalhes (opcional)"><textarea className="input" value={details} onChange={(e) => setDetails(e.target.value)} maxLength={2000} /></Field>
            <ActionButton className="btn primary" onClick={async () => { await api.post('/reports', { targetType: type, targetId: id, reason, details }); toast('Denúncia enviada. Obrigado!', 'ok'); setOpen(false); }}>Enviar denúncia</ActionButton>
          </div>
        </Modal>
      )}
    </>
  );
}
