import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';
import { useLoad, Loader, Tabs, Empty } from '../components/ui.jsx';
import { Icon } from '../components/icons.jsx';

export const KIND = { event: 'Evento', game_jam: 'Game Jam', competition: 'Competição', challenge: 'Desafio', festival: 'NEXPLAY FESTIVAL', awards: 'NEXPLAY AWARDS' };
export const STATUS = { scheduled: ['Em breve', 'cyan'], active: ['Acontecendo', 'green'], voting: ['Votação aberta', 'gold'], finished: ['Encerrado', ''], canceled: ['Cancelado', 'red'] };

export default function Events() {
  const [kind, setKind] = useState('');
  const s = useLoad(() => api.get(`/community/events${kind ? `?kind=${kind}` : ''}`), [kind]);
  return (
    <div>
      <h1>Eventos, Game Jams e Awards</h1>
      <Tabs value={kind} onChange={setKind} tabs={[['', 'Todos'], ['game_jam', 'Game Jams'], ['competition', 'Competições'], ['festival', 'NEXPLAY FESTIVAL'], ['awards', 'NEXPLAY AWARDS'], ['event', 'Eventos'], ['challenge', 'Desafios']]} />
      <Loader state={s}>{(d) => (d.events.length ? (
        <div className="grid cols-3">{d.events.map((e) => (
          <Link key={e.id} to={`/eventos/${e.slug}`} className="card hover stack">
            <div className="row between"><span className="pill">{KIND[e.kind]}</span><span className={`pill ${STATUS[e.status][1]}`}>{STATUS[e.status][0]}</span></div>
            <h3 style={{ margin: 0 }}>{e.title}</h3>
            {e.theme && <div className="small">Tema: <b>{e.theme}</b></div>}
            <div className="small muted"><Icon name="calendar" size={14} /> {new Date(e.startsAt).toLocaleDateString('pt-BR')} – {new Date(e.endsAt).toLocaleDateString('pt-BR')}</div>
            <div className="small muted">{e.participants} participantes · {e.entries} jogos{e.ncParticipation ? ` · ${e.ncParticipation} NC por participação` : ''}</div>
          </Link>
        ))}</div>
      ) : <Empty icon="trophy" title="Nenhum evento agendado">A equipe NEXPLAY anuncia Game Jams, competições, o NEXPLAY FESTIVAL e o NEXPLAY AWARDS aqui.</Empty>)}</Loader>
    </div>
  );
}
