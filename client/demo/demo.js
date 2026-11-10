// NEXPLAY — prévia sem servidor (página única).
// Arcade: sem banco de dados aqui, então mostra o estado vazio real (nenhum jogo é inventado).
// Studio: os MODELOS de projeto podem ser testados no motor — eles não são jogos publicados.
import { Game } from '../src/engine/game.js';
import { Game2D } from '../src/engine/game2d.js';
import { createProject, validateProject, GAME_GENRES } from '../../shared/project.js';

const TEMPLATES = [
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
const list = document.getElementById('templates');
const picker = document.getElementById('app');
const stage = document.getElementById('stage');
const back = document.getElementById('back');
const qualitySel = document.getElementById('quality');
qualitySel.value = mobile ? 'low' : 'medium';
let game = null;

for (const g of TEMPLATES) {
  const b = document.createElement('button');
  b.className = 'tpl';
  b.innerHTML = `<span class="kind">MODELO ${g.dim.toUpperCase()}</span><strong></strong><span class="desc"></span><span class="tag"></span>`;
  b.querySelector('strong').textContent = g.name;
  b.querySelector('.desc').textContent = g.desc;
  b.querySelector('.tag').textContent = `Testar modelo · ${g.tag}`;
  b.addEventListener('click', () => start({ ...g, doc: createProject({ name: g.name, dimension: g.dim, template: g.id }) }));
  list.appendChild(b);
}

// Navegação Arcade ↔ Studio e abas do Arcade (todas vazias: não há jogos publicados nesta prévia).
const showView = (v) => {
  document.getElementById('view-arcade').hidden = v !== 'arcade';
  document.getElementById('view-studio').hidden = v !== 'studio';
  for (const b of document.querySelectorAll('.top-nav button')) { if (b.dataset.view === v) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); }
  window.scrollTo(0, 0);
};
for (const b of document.querySelectorAll('[data-view]')) b.addEventListener('click', () => { showView(b.dataset.view); if (b.dataset.focus) document.getElementById(b.dataset.focus)?.focus(); });
const TAB_TITLE = { month: 'Jogos do mês', week: 'Jogos da semana', trending: 'Em alta', new: 'Novidades', search: 'Pesquisa' };
for (const b of document.querySelectorAll('[data-tab]')) {
  b.addEventListener('click', () => {
    for (const x of document.querySelectorAll('[data-tab]')) x.setAttribute('aria-selected', String(x === b));
    document.getElementById('tab-title').textContent = TAB_TITLE[b.dataset.tab];
    document.getElementById('search').hidden = b.dataset.tab !== 'search';
  });
}

// ───── Projetos criados nesta prévia: novos, em branco, um id próprio cada, salvos só neste aparelho ─────
const GENRE_NAMES = { acao: 'Ação', aventura: 'Aventura', terror: 'Terror', sobrevivencia: 'Sobrevivência', corrida: 'Corrida', plataforma: 'Plataforma', mundo_aberto: 'Mundo aberto', futebol: 'Futebol', esportes: 'Esportes', rpg: 'RPG', estrategia: 'Estratégia', puzzle: 'Puzzle', simulacao: 'Simulação', tiro: 'Tiro', luta: 'Luta', casual: 'Casual', musical: 'Musical', educativo: 'Educativo', outro: 'Outro' };
const KEY = 'nexplay_preview_projects';
const loadProjects = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } };
const saveProjects = (list) => { try { localStorage.setItem(KEY, JSON.stringify(list)); return true; } catch { return false; } };
const genreSel = document.getElementById('np-genre');
for (const g of GAME_GENRES) { const o = document.createElement('option'); o.value = g; o.textContent = GENRE_NAMES[g] || g; genreSel.appendChild(o); }
function renderProjects() {
  const box = document.getElementById('my-projects'); box.innerHTML = '';
  const list = loadProjects();
  if (!list.length) { box.innerHTML = '<p class="sub" style="margin:0">Nenhum projeto ainda. Crie o primeiro acima.</p>'; return; }
  for (const p of list) {
    const row = document.createElement('div'); row.className = 'proj';
    row.innerHTML = '<div><strong></strong><div class="meta"></div></div><div style="display:flex;gap:6px"><button class="btn primary" data-a="test">Testar</button><button class="btn" data-a="del">Excluir</button></div>';
    row.querySelector('strong').textContent = p.name;
    row.querySelector('.meta').textContent = `${p.dimension.toUpperCase()} · ${GENRE_NAMES[p.genre] || p.genre} · id ${p.id.slice(0, 8)} · criado ${new Date(p.createdAt).toLocaleDateString('pt-BR')}`;
    row.querySelector('[data-a=test]').addEventListener('click', () => start({ name: p.name, dim: p.dimension, doc: structuredClone(p.doc) }));
    row.querySelector('[data-a=del]').addEventListener('click', () => { if (confirm(`Excluir "${p.name}" deste aparelho?`)) { saveProjects(loadProjects().filter((x) => x.id !== p.id)); renderProjects(); } });
    box.appendChild(row);
  }
}
document.getElementById('new-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const err = document.getElementById('np-err'); err.hidden = true;
  const name = document.getElementById('np-name').value.trim();
  const dimension = document.querySelector('input[name=np-dim]:checked').value;
  const genre = genreSel.value;
  if (!name || !genre) { err.textContent = 'Informe o nome e escolha o gênero.'; err.hidden = false; return; }
  const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const doc = createProject({ name, dimension, template: 'vazio', genre }); // SEMPRE em branco
  const list = loadProjects();
  list.unshift({ id, name, dimension, genre, createdAt: new Date().toISOString(), doc });
  if (!saveProjects(list)) { err.textContent = 'Este navegador não permite salvar dados (modo anônimo?). O projeto será aberto, mas não ficará salvo.'; err.hidden = false; }
  e.target.reset(); renderProjects();
  start({ name, dim: dimension, doc: structuredClone(doc) });
});
renderProjects();

async function start(g) {
  const doc = g.doc;
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
    p.textContent = `Este aparelho não conseguiu iniciar o 3D (${e.message}). Tente o modelo Plataforma 2D ou a qualidade Baixa.`;
    stage.appendChild(p);
  }
}

back.addEventListener('click', () => {
  try { game?.dispose(); } catch { /* já liberado */ }
  game = null; stage.innerHTML = ''; stage.hidden = true; back.hidden = true; picker.hidden = false;
});
