import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { useAuth } from '../auth.jsx';
import Explore from './Explore.jsx';
import { useToast } from '../components/ui.jsx';
import { Icon } from '../components/icons.jsx';

export default function Multiplayer() {
  const { user } = useAuth();
  const nav = useNavigate();
  const toast = useToast();
  const [code, setCode] = useState('');
  return (
    <div>
      <div className="card row between mb" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,.25), rgba(6,182,212,.12))' }}>
        <div><h2 style={{ margin: 0 }}><Icon name="users" size={22} /> Entrar em sala privada</h2><p className="muted small" style={{ margin: 0 }}>Recebeu um código de um amigo? Digite aqui.</p></div>
        <form className="row" onSubmit={async (e) => { e.preventDefault(); if (!user) return nav('/entrar'); try { const d = await api.post('/multiplayer/rooms/join', { code }); nav(`/jogo/${d.gameSlug}/jogar?sala=${d.room.id}`); } catch (x) { toast(x.message, 'error'); } }}>
          <input className="input" style={{ width: 160, textTransform: 'uppercase' }} placeholder="CÓDIGO" value={code} onChange={(e) => setCode(e.target.value)} maxLength={6} />
          <button className="btn primary">Entrar</button>
        </form>
      </div>
      <Explore multiplayerOnly title="MULTIPLAYER" />
    </div>
  );
}
