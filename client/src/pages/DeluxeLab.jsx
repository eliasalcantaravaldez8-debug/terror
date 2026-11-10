import { Link } from 'react-router-dom';
import { useAuth } from '../auth.jsx';
import { Icon } from '../components/icons.jsx';

const EXPERIMENTS = [
  ['NEXPLAY AI AUTOPILOT', 'Desenvolvimento automático em etapas com aprovação, testes após cada etapa e histórico para desfazer.', 'disponível', '/studio'],
  ['Equipe de especialistas', 'Programadora, 3D, Texturas, Animação, Gameplay e Testadora trabalhando em sequência no mesmo projeto.', 'disponível', '/studio'],
  ['Qualidade Ultra', 'Sombras VSM 4K, SMAA, GTAO e texturas procedurais em 1024 px no runtime 3D.', 'experimental', '/studio'],
  ['Importação de modelos .glb com animações', 'Use personagens e cenários profissionais (ex.: exportados do Blender) com AnimationMixer.', 'experimental', '/studio'],
  ['Renderização WebGPU', 'Avaliação do renderizador WebGPU do three.js para iluminação global em tempo real.', 'em pesquisa', null],
  ['Geração de texturas por IA', 'Texturas PBR geradas a partir de descrição de texto. Depende de um provedor de geração de imagens.', 'em pesquisa', null],
];

export default function DeluxeLab() {
  const { user, has } = useAuth();
  const allowed = has('deluxe_lab');
  return (
    <div>
      <div className="hero" style={{ minHeight: 220 }}>
        <div className="hero-orbs"><i style={{ width: 300, height: 300, background: '#f59e0b', left: '60%', top: -60 }} /><i style={{ width: 260, height: 260, background: '#8b5cf6', left: '80%', top: 80 }} /></div>
        <span className="badge-deluxe" style={{ alignSelf: 'flex-start' }}>DELUXE LAB</span>
        <h1 className="mt">Ferramentas experimentais da NEXPLAY</h1>
        <p className="muted">Acesso antecipado para assinantes DELUXE. Recursos experimentais podem mudar ou ser instáveis.</p>
      </div>
      {!allowed && <div className="warn-box mt">{user ? 'O DELUXE LAB é exclusivo do plano DELUXE.' : 'Entre com uma conta DELUXE para acessar.'} <Link to="/planos">Ver planos</Link></div>}
      <div className="grid cols-3 mt">{EXPERIMENTS.map(([t, d, st, to]) => (
        <div key={t} className="card stack" style={{ opacity: allowed ? 1 : 0.6 }}>
          <div className="row between"><h3 style={{ margin: 0 }}>{t}</h3><span className={`pill ${st === 'disponível' ? 'green' : st === 'experimental' ? 'gold' : ''}`}>{st}</span></div>
          <p className="small muted">{d}</p>
          {to && allowed && <Link className="btn sm" to={to}><Icon name="sparkles" /> Abrir</Link>}
        </div>
      ))}</div>
    </div>
  );
}
