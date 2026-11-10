// NEXPLAY — demonstração jogável do motor (página única, sem servidor).
// Usa o mesmo motor e os mesmos modelos de projeto do NEXPLAY STUDIO.
import { Game } from '../src/engine/game.js';
import { Game2D } from '../src/engine/game2d.js';
import { createProject, validateProject } from '../../shared/project.js';

const GAMES = [
  { id: 'plataforma', dim: '2d', name: 'Plataforma 2D', tag: 'Leve · bom para celular', desc: 'Pule entre blocos, pegue moedas, desvie dos espinhos e alcance a bandeira.' },
  { id: 'futebol', dim: '3d', name: 'Futebol 3D', tag: 'Pesado', desc: 'Estádio com torcida, refletores, placar, cronômetro e IA dos dois times.' },
  { id: 'terror', dim: '3d', name: 'Terror', tag: 'Médio', desc: 'Floresta à noite, chuva, raios e lanterna. Ache 3 páginas e chegue à cabana.' },
  { id: 'aventura', dim: '3d', name: 'Aventura', tag: 'Médio', desc: 'Explore a floresta até o centro das ruínas antigas.' },
  { id: 'acao', dim: '3d', name: 'Ação', tag: 'Médio', desc: 'Derrote os guardas que patrulham as ruínas (botão AÇÃO ataca).' },
  { id: 'corrida', dim: '3d', name: 'Corrida', tag: 'Médio', desc: 'Circuito com zebras, arquibancada e rivais. Três voltas.' },
  { id: 'sobrevivencia', dim: '3d', name: 'Sobrevivência', tag: 'Pesado', desc: 'Lago, pinheiros e ciclo dia/noite. Junte 10 madeiras.' },
  { id: 'mundo_aberto', dim: '3d', name: 'Mundo aberto', tag: 'Pesado', desc: 'Vila, mar, carro e uma aldeã com missão para você.' },
];

const mobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && innerWidth < 1024);
const list = document.getElementById('games');
const picker = document.getElementById('picker');
const stage = document.getElementById('stage');
const back = document.getElementById('back');
const qualitySel = document.getElementById('quality');
qualitySel.value = mobile ? 'low' : 'medium';
let game = null;

for (const g of GAMES) {
  const b = document.createElement('button');
  b.className = 'game';
  b.innerHTML = `<span class="dim">${g.dim.toUpperCase()}</span><strong></strong><span class="desc"></span><span class="tag"></span>`;
  b.querySelector('strong').textContent = g.name;
  b.querySelector('.desc').textContent = g.desc;
  b.querySelector('.tag').textContent = g.tag;
  b.addEventListener('click', () => start(g));
  list.appendChild(b);
}

async function start(g) {
  const doc = createProject({ name: g.name, dimension: g.dim, template: g.id });
  if (doc.settings.rendering) doc.settings.rendering.quality = qualitySel.value;
  if (qualitySel.value === 'low' && doc.settings.rendering) { doc.settings.rendering.bloom.enabled = false; doc.settings.rendering.shadows.enabled = false; }
  const report = validateProject(doc);
  picker.hidden = true; stage.hidden = false; back.hidden = false;
  stage.innerHTML = '<div class="loading">Gerando o mundo…</div>';
  await new Promise((r) => setTimeout(r, 30));
  stage.innerHTML = '';
  // O motor usa position:relative no contêiner; um filho com 100% de tamanho preserva a tela cheia.
  const box = document.createElement('div');
  box.style.cssText = 'width:100%;height:100%';
  stage.appendChild(box);
  try {
    game = g.dim === '2d' ? new Game2D(box, doc, {}) : new Game(box, doc, {});
    await game.init();
    console.info('Validação do projeto:', report);
  } catch (e) {
    stage.innerHTML = '';
    const p = document.createElement('div'); p.className = 'loading';
    p.textContent = `Este aparelho não conseguiu iniciar o 3D (${e.message}). Tente a Plataforma 2D ou a qualidade Baixa.`;
    stage.appendChild(p);
  }
}

back.addEventListener('click', () => {
  try { game?.dispose(); } catch { /* já liberado */ }
  game = null; stage.innerHTML = ''; stage.hidden = true; back.hidden = true; picker.hidden = false;
});
