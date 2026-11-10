// Página de um jogo publicado DENTRO do link sem servidor (arquivos publicados junto com a página).
// O jogo roda no mesmo player isolado de "Enviar jogo pronto" (iframe de origem opaca).
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GENRE_LABEL, PLATFORM_LABEL } from '../api.js';
import { bundledGames } from '../bundledGames.js';
import { LocalPlayer } from './LocalGames.jsx';
import { Icon } from '../components/icons.jsx';

export default function BundledGame() {
  const { slug } = useParams();
  const [game, setGame] = useState(undefined);
  const [playing, setPlaying] = useState(false);
  useEffect(() => { bundledGames().then((gs) => setGame(gs.find((g) => g.slug === slug) || null)); }, [slug]);
  if (game === undefined) return <div className="spinner" />;
  if (!game) return <div className="empty"><h3>Jogo não encontrado</h3><Link className="btn" to="/arcade">Voltar ao Arcade</Link></div>;
  const base = `nexplay-games/${game.slug}/`;
  const loadFiles = async () => {
    const out = {};
    await Promise.all(game.files.map(async (f) => { const r = await fetch(base + f.split('/').map(encodeURIComponent).join('/')); if (!r.ok) throw new Error(f); out[f] = await r.arrayBuffer(); }));
    return out;
  };
  return (
    <div className="stack" style={{ maxWidth: 900, margin: '0 auto' }}>
      {game.cover && <img src={base + game.cover} alt="" style={{ width: '100%', maxHeight: 340, objectFit: 'cover', borderRadius: 16 }} />}
      <div className="card stack">
        <div className="row"><span className="pill">{GENRE_LABEL[game.genre] || 'Jogo'}</span><span className="pill">{PLATFORM_LABEL[game.platforms || 'both']}</span></div>
        <h1 style={{ margin: 0 }}>{game.title}</h1>
        <div className="small muted">por <b>{game.creator || 'Criador'}</b>{game.publishedAt ? ` · publicado em ${new Date(game.publishedAt).toLocaleDateString('pt-BR')}` : ''}</div>
        {game.description && <p style={{ whiteSpace: 'pre-wrap' }}>{game.description}</p>}
        {game.controls && <p className="small"><b>Controles:</b> {game.controls}</p>}
        <button className="btn primary lg" onClick={() => setPlaying(true)}><Icon name="play" /> Jogar</button>
        <p className="tiny muted" style={{ margin: 0 }}>O jogo roda num espaço isolado: não tem acesso aos seus projetos nem à sua conta.</p>
      </div>
      <Link className="small" to="/arcade">← Voltar ao Arcade</Link>
      {playing && <LocalPlayer game={{ title: game.title, entry: game.entry }} loadFiles={loadFiles} onClose={() => setPlaying(false)} />}
    </div>
  );
}
