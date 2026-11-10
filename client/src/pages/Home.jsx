import { Link } from 'react-router-dom';
import { api, STAGE_LABEL } from '../api.js';
import { useAuth } from '../auth.jsx';
import { useLoad, Loader, GameRail, SectionHead, Empty, Stars } from '../components/ui.jsx';
import { Icon } from '../components/icons.jsx';

function Hero({ data, user }) {
  const g = data.gameOfDay || data.featured[0];
  if (g) {
    return (
      <section className="hero fade-in">
        <div className="hero-bg" style={{ backgroundImage: g.coverUrl ? `url(${g.coverUrl})` : undefined }} />
        <div className="row"><span className="pill gold"><Icon name="star" size={14} /> {data.gameOfDay ? 'Jogo do Dia' : 'Destaque NEXPLAY'}</span>{g.releaseStage !== 'released' && <span className="pill cyan">{STAGE_LABEL[g.releaseStage]}</span>}</div>
        <h1 style={{ marginTop: 12 }}>{g.headline || g.title}</h1>
        <p className="muted" style={{ maxWidth: 640 }}>{g.recommendation || g.shortDescription}</p>
        <div className="row mt"><Link className="btn primary lg" to={`/jogo/${g.slug}`}><Icon name="play" /> Ver jogo</Link><Stars value={g.rating?.avg} /></div>
      </section>
    );
  }
  return (
    <section className="hero fade-in">
      <div className="hero-orbs"><i style={{ width: 360, height: 360, background: '#8b5cf6', left: '55%', top: -80 }} /><i style={{ width: 300, height: 300, background: '#06b6d4', left: '75%', top: 120, animationDelay: '-4s' }} /></div>
      <span className="pill cyan">Plataforma gamer + criação com IA</span>
      <h1 style={{ marginTop: 12 }}>Jogue, conecte-se e <span className="gradient-text">crie jogos</span> com a NEXPLAY AI.</h1>
      <p className="muted" style={{ maxWidth: 620 }}>Publique seus jogos, construa mundos 2D e 3D no NEXPLAY STUDIO e use especialistas de IA para programar, montar cenários, texturas, animações e testes.</p>
      <div className="row mt">
        <Link className="btn primary lg" to={user ? '/studio' : '/cadastro'}><Icon name="cube" /> {user ? 'Abrir o Studio' : 'Criar conta grátis'}</Link>
        <Link className="btn lg" to="/arcade"><Icon name="gamepad" /> NEXPLAY Arcade</Link>
      </div>
    </section>
  );
}

export default function Home() {
  const { user } = useAuth();
  const state = useLoad(() => api.get('/games/home'), [user?.id]);
  return (
    <Loader state={state}>
      {(data) => (
        <div>
          <Hero data={data} user={user} />
          {data.totalPublished === 0 ? (
            <div className="mt">
              <Empty icon="gamepad" title="Ainda não temos jogos publicados.">
                <p>Seja um dos primeiros criadores da NEXPLAY!</p>
                <div className="row" style={{ justifyContent: 'center', marginTop: 14 }}>
                  <Link className="btn primary" to={user ? '/studio' : '/cadastro'}><Icon name="plus" /> Criar meu jogo</Link>
                  <Link className="btn" to="/studio"><Icon name="cube" /> Explorar o NEXPLAY Studio</Link>
                </div>
              </Empty>
            </div>
          ) : null}
          {data.nexplayChoice.length > 0 && <><SectionHead icon="crown" title="Escolha da NEXPLAY" to="/picks" /><GameRail games={data.nexplayChoice} /></>}
          {data.weekly.length > 0 && <><SectionHead icon="star" title="Destaques da Semana" to="/picks" /><GameRail games={data.weekly} /></>}
          {data.recommended.length > 0 && <><SectionHead icon="sparkles" title={user ? 'Recomendados para você' : 'Recomendados'} to="/explorar?sort=rating" /><GameRail games={data.recommended} /></>}
          {data.popular.length > 0 && <><SectionHead icon="flame" title="Populares" to="/explorar?sort=popular" /><GameRail games={data.popular} /></>}
          {data.recent.length > 0 && <><SectionHead icon="bolt" title="Novidades" to="/explorar?sort=recent" /><GameRail games={data.recent} /></>}
          {data.upcoming.length > 0 && <><SectionHead icon="rocket" title="Lançamentos e acesso antecipado" to="/lancamentos" /><GameRail games={data.upcoming} /></>}
          <div className="grid cols-3 mt">
            <Link to="/studio" className="card hover"><Icon name="cube" size={26} /><h3 className="mt">NEXPLAY STUDIO</h3><p className="muted small">Editor 2D/3D com modo fácil e modo avançado com código.</p></Link>
            <Link to="/rewards" className="card hover"><Icon name="gift" size={26} /><h3 className="mt">NEXPLAY REWARDS</h3><p className="muted small">Ganhe NEX COINS com desafios semanais, eventos e conquistas raras.</p></Link>
            <Link to="/eventos" className="card hover"><Icon name="trophy" size={26} /><h3 className="mt">Game Jams, Festival e Awards</h3><p className="muted small">Participe, vote e concorra no NEXPLAY AWARDS.</p></Link>
          </div>
        </div>
      )}
    </Loader>
  );
}
