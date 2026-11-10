import { useState } from 'react';
import { api, brl, nc } from '../api.js';
import { useAuth } from '../auth.jsx';
import { useLoad, Loader, Tabs, ActionButton, PlanBadge } from '../components/ui.jsx';
import { Icon } from '../components/icons.jsx';

const REASON = { challenge: 'Desafio', achievement: 'Conquista', event: 'Evento', competition: 'Competição', community_goal: 'Meta da comunidade', admin_grant: 'Concessão da equipe', store_purchase: 'Loja de recompensas', conversion: 'Conversão em crédito', reversal: 'Estorno', nc_conversion: 'Conversão de NC', game_purchase: 'Compra de jogo', refund: 'Reembolso', admin_adjust: 'Ajuste' };

export default function Rewards() {
  const { refresh } = useAuth();
  const s = useLoad(() => api.get('/rewards'), []);
  const [tab, setTab] = useState('desafios');
  return (
    <Loader state={s}>{(d) => (
      <div>
        <h1>NEXPLAY REWARDS</h1>
        <div className="grid cols-3 mb">
          <div className="card"><div className="small muted">Saldo de NEX COINS</div><div className="kpi gradient-text">{nc(d.nc)}</div></div>
          <div className="card"><div className="small muted">Créditos NEXPLAY</div><div className="kpi">{brl(d.creditCents)}</div><div className="tiny muted">Uso exclusivo na plataforma. Não sacável nem transferível.</div></div>
          <div className="card"><div className="small muted">Teto semanal de ganhos automáticos</div><div className="kpi">{nc(d.rules.weekly_earn_cap_nc)}</div><div className="tiny muted">Recompensas exigem participação real.</div></div>
        </div>
        <Tabs value={tab} onChange={setTab} tabs={[['desafios', 'Desafios'], ['loja', 'Loja de recompensas'], ['converter', 'Converter em crédito'], ['historico', 'Histórico']]} />
        {tab === 'desafios' && (
          <div className="grid cols-2">{d.challenges.map((c) => (
            <div key={c.id} className="card stack">
              <div className="row between"><h3 style={{ margin: 0 }}>{c.title}</h3><span className="pill gold">+{c.reward} NC</span></div>
              <p className="small muted">{c.description}</p>
              <div className="progress"><i style={{ width: `${(c.progress / c.target) * 100}%` }} /></div>
              <div className="row between small"><span>{c.progress}/{c.target} · {c.period === 'weekly' ? 'renova toda segunda-feira' : 'evento'}</span>
                {c.claimed ? <span className="pill green">Resgatado</span> : <ActionButton className="btn sm primary" disabled={c.progress < c.target} ok="NC creditados!" onClick={async () => { await api.post(`/rewards/challenges/${c.id}/claim`); await refresh(); s.reload(); }}>Resgatar</ActionButton>}
              </div>
            </div>
          ))}
          <div className="info-box">Outras formas de ganhar NC: conquistas raras da plataforma, participação em eventos e Game Jams, competições e metas especiais da comunidade.</div>
          </div>
        )}
        {tab === 'loja' && <Store onChange={() => { refresh(); s.reload(); }} />}
        {tab === 'converter' && (
          <div className="stack">
            <div className="grid cols-3">{d.tiers.map((t) => (
              <div key={t.nc} className="card stack center">
                <div className="kpi">{nc(t.nc)}</div><div className="muted">=</div><div className="kpi gradient-text">{brl(t.credit_cents)}</div><div className="tiny muted">em crédito NEXPLAY</div>
                <ActionButton className="btn primary" disabled={d.nc < t.nc || d.redemptionBlockers.length > 0} ok="Resgate registrado!" onClick={async () => { const r = await api.post('/rewards/redeem', { tierNc: t.nc }); if (r.status === 'held') alert('Seu resgate foi enviado para verificação de segurança. Você será notificado.'); await refresh(); s.reload(); }}>Converter</ActionButton>
              </div>
            ))}</div>
            {d.redemptionBlockers.length > 0 && <div className="warn-box"><b>Requisitos para resgatar:</b><ul>{d.redemptionBlockers.map((b) => <li key={b}>{b}</li>)}</ul></div>}
            <div className="info-box small">Regras: créditos só podem ser usados dentro da NEXPLAY (incluindo jogos pagos participantes), não podem ser sacados, transferidos ou convertidos em dinheiro. Limite de {brl(d.rules.redemption_monthly_cap_cents)} por mês e um resgate a cada {d.rules.redemption_cooldown_days} dias. Resgates suspeitos passam por revisão manual.</div>
          </div>
        )}
        {tab === 'historico' && <History />}
      </div>
    )}</Loader>
  );
}

function Store({ onChange }) {
  const { user } = useAuth();
  const s = useLoad(() => api.get('/rewards/store'), []);
  const equip = async (i) => { await api.post('/users/me/equip', { kind: i.kind, code: i.code }); onChange(); };
  return (
    <Loader state={s}>{(d) => (
      <div className="games-grid">{d.items.map((i) => (
        <div key={i.id} className="card stack">
          <div style={{ height: 90, borderRadius: 12, display: 'grid', placeItems: 'center', fontSize: 36, background: i.data.from ? `linear-gradient(135deg, ${i.data.from}, ${i.data.to})` : i.data.colors ? `conic-gradient(${i.data.colors.join(',')}, ${i.data.colors[0]})` : i.data.bg || 'var(--panel-2)' }}>
            {i.data.emoji || i.data.icon || (i.kind === 'effect' ? '✨' : i.kind === 'exclusive' ? '💎' : '')}
          </div>
          <div className="row between"><b>{i.name}</b><PlanBadge plan={i.requiredPlan} /></div>
          <div className="small muted">{i.description}</div>
          <div className="row between"><span className="pill gold">{nc(i.priceNc)}</span>
            {i.owned ? <button className="btn sm" onClick={() => equip(i)}>Equipar</button>
              : <ActionButton className="btn sm primary" disabled={!user || user.nc < i.priceNc} ok="Item adquirido!" onClick={async () => { await api.post(`/rewards/store/${i.id}/buy`); s.reload(); onChange(); }}>Comprar</ActionButton>}
          </div>
        </div>
      ))}</div>
    )}</Loader>
  );
}

function History() {
  const s = useLoad(() => api.get('/rewards/history'), []);
  return (
    <Loader state={s}>{(d) => (
      <div className="grid cols-2">
        <div className="card table-wrap"><h3>NEX COINS</h3><table className="table"><tbody>{d.nc.map((r) => <tr key={r.id}><td>{new Date(r.created_at).toLocaleDateString('pt-BR')}</td><td>{REASON[r.reason] || r.reason}</td><td style={{ color: r.amount > 0 ? 'var(--ok)' : 'var(--danger)', textAlign: 'right' }}>{r.amount > 0 ? '+' : ''}{r.amount}</td></tr>)}</tbody></table>{!d.nc.length && <p className="muted small">Sem movimentações.</p>}</div>
        <div className="stack">
          <div className="card table-wrap"><h3>Créditos NEXPLAY</h3><table className="table"><tbody>{d.credits.map((r) => <tr key={r.id}><td>{new Date(r.created_at).toLocaleDateString('pt-BR')}</td><td>{REASON[r.reason] || r.reason}</td><td style={{ textAlign: 'right' }}>{brl(r.amount_cents)}</td></tr>)}</tbody></table>{!d.credits.length && <p className="muted small">Sem movimentações.</p>}</div>
          <div className="card table-wrap"><h3>Resgates</h3><table className="table"><tbody>{d.redemptions.map((r) => <tr key={r.id}><td>{new Date(r.created_at).toLocaleDateString('pt-BR')}</td><td>{nc(r.tier_nc)} → {brl(r.credit_cents)}</td><td>{{ completed: 'Concluído', held: 'Em verificação', rejected: 'Recusado', reversed: 'Estornado' }[r.status]}</td></tr>)}</tbody></table>{!d.redemptions.length && <p className="muted small">Nenhum resgate.</p>}</div>
        </div>
      </div>
    )}</Loader>
  );
}
