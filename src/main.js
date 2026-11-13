import './styles.css';
import { Game } from './core/Game.js';

const params = new URLSearchParams(location.search);
const testMode = params.has('test');
const loading = document.getElementById('loading');
const bar = document.getElementById('loading-bar');
const label = document.getElementById('loading-label');

const game = new Game({ testMode });
window.__IRON = { game };

game.init((p, text) => {
  bar.style.width = `${Math.round(p * 100)}%`;
  label.textContent = text;
}).then(() => {
  loading.classList.add('done');
  setTimeout(() => (loading.style.display = 'none'), 700);
  game.showMainMenu();
  if (params.get('quality')) { game.settings.set('quality', params.get('quality')); game.pipeline.applyQuality(params.get('quality')); }
}).catch((err) => {
  console.error(err);
  label.textContent = 'Erro ao iniciar: ' + err.message;
  window.__IRON.error = err;
});
