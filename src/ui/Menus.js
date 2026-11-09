/**
 * Front-end menus (main, pause, settings, controls, death, mission complete).
 * Plain DOM, keyboard/mouse friendly.
 */
export class Menus {
  constructor(game) {
    this.game = game;
    this.root = document.getElementById('menus');
    this.current = null;
  }

  _show(html, cls = '') {
    this.root.innerHTML = `<div class="menu ${cls}">${html}</div>`;
    this.root.style.display = 'flex';
    this.root.querySelectorAll('button').forEach((b) => b.addEventListener('mouseenter', () => this.game.audio.uiClick()));
  }
  hide() { this.root.style.display = 'none'; this.root.innerHTML = ''; this.current = null; }
  _bind(id, fn) { const el = this.root.querySelector('#' + id); if (el) el.addEventListener('click', (e) => { e.stopPropagation(); this.game.audio.uiClick(); fn(); }); }

  main() {
    this.current = 'main';
    const hasSave = this.game.saves.hasSave();
    const save = this.game.saves.load();
    this._show(`
      <div class="logo">
        <div class="logo-top">OPERATION</div>
        <div class="logo-main">IRON SHADOW</div>
        <div class="logo-sub">Campanha · Missão 1: Primeiro Contato</div>
      </div>
      <div class="menu-buttons">
        ${hasSave ? `<button id="m-continue" class="primary">Continuar <small>${this.game.mission?.checkpointLabel(save.checkpoint) || ''}</small></button>` : ''}
        <button id="m-new" class="${hasSave ? '' : 'primary'}">Nova campanha</button>
        <button id="m-settings">Configurações</button>
        <button id="m-controls">Controles</button>
      </div>
      <div class="menu-foot">Versão de desenvolvimento 0.1 · Fatia vertical jogável · Recursos provisórios procedurais</div>
    `, 'main-menu');
    this._bind('m-new', () => this.game.startNewCampaign());
    this._bind('m-continue', () => this.game.continueCampaign());
    this._bind('m-settings', () => this.settings(() => this.main()));
    this._bind('m-controls', () => this.controls(() => this.main()));
  }

  pause() {
    this.current = 'pause';
    this._show(`
      <h2>PAUSADO</h2>
      <div class="menu-buttons">
        <button id="p-resume" class="primary">Retomar</button>
        <button id="p-checkpoint">Reiniciar do checkpoint</button>
        <button id="p-settings">Configurações</button>
        <button id="p-controls">Controles</button>
        <button id="p-quit">Sair para o menu</button>
      </div>`, 'pause-menu');
    this._bind('p-resume', () => this.game.resume());
    this._bind('p-checkpoint', () => this.game.restartFromCheckpoint());
    this._bind('p-settings', () => this.settings(() => this.pause()));
    this._bind('p-controls', () => this.controls(() => this.pause()));
    this._bind('p-quit', () => this.game.quitToMenu());
  }

  settings(back) {
    this.current = 'settings';
    const s = this.game.settings;
    const q = s.get('quality');
    this._show(`
      <h2>CONFIGURAÇÕES</h2>
      <div class="settings">
        <label>Qualidade gráfica
          <select id="s-quality">
            <option value="low" ${q === 'low' ? 'selected' : ''}>Baixa</option>
            <option value="medium" ${q === 'medium' ? 'selected' : ''}>Média</option>
            <option value="high" ${q === 'high' ? 'selected' : ''}>Alta</option>
          </select></label>
        <label>Sensibilidade do mouse <input id="s-sens" type="range" min="0.2" max="3" step="0.05" value="${s.get('sensitivity')}"><span id="s-sens-v">${s.get('sensitivity').toFixed(2)}</span></label>
        <label>Campo de visão <input id="s-fov" type="range" min="60" max="100" step="1" value="${s.get('fov')}"><span id="s-fov-v">${s.get('fov')}°</span></label>
        <label>Volume geral <input id="s-vol" type="range" min="0" max="1" step="0.05" value="${s.get('masterVolume')}"></label>
        <label>Volume da música <input id="s-mus" type="range" min="0" max="1" step="0.05" value="${s.get('musicVolume')}"></label>
        <label class="chk"><input id="s-inv" type="checkbox" ${s.get('invertY') ? 'checked' : ''}> Inverter eixo Y</label>
        <label class="chk"><input id="s-subs" type="checkbox" ${s.get('subtitles') ? 'checked' : ''}> Legendas</label>
        <label class="chk"><input id="s-voices" type="checkbox" ${s.get('voices') ? 'checked' : ''}> Vozes sintetizadas (provisório)</label>
        <label class="chk"><input id="s-fps" type="checkbox" ${s.get('showFps') ? 'checked' : ''}> Mostrar FPS</label>
      </div>
      <div class="menu-buttons"><button id="s-back" class="primary">Voltar</button></div>`, 'settings-menu');
    const r = this.root;
    r.querySelector('#s-quality').addEventListener('change', (e) => { s.set('quality', e.target.value); this.game.pipeline.applyQuality(e.target.value); });
    r.querySelector('#s-sens').addEventListener('input', (e) => { s.set('sensitivity', +e.target.value); r.querySelector('#s-sens-v').textContent = (+e.target.value).toFixed(2); });
    r.querySelector('#s-fov').addEventListener('input', (e) => { s.set('fov', +e.target.value); r.querySelector('#s-fov-v').textContent = e.target.value + '°'; });
    r.querySelector('#s-vol').addEventListener('input', (e) => s.set('masterVolume', +e.target.value));
    r.querySelector('#s-mus').addEventListener('input', (e) => s.set('musicVolume', +e.target.value));
    r.querySelector('#s-inv').addEventListener('change', (e) => s.set('invertY', e.target.checked));
    r.querySelector('#s-subs').addEventListener('change', (e) => s.set('subtitles', e.target.checked));
    r.querySelector('#s-voices').addEventListener('change', (e) => s.set('voices', e.target.checked));
    r.querySelector('#s-fps').addEventListener('change', (e) => s.set('showFps', e.target.checked));
    this._bind('s-back', back);
  }

  controls(back) {
    this.current = 'controls';
    const rows = [
      ['W A S D', 'Mover'], ['Shift', 'Correr'], ['C / Ctrl (segurar)', 'Agachar'], ['Espaço', 'Pular'],
      ['Botão esquerdo', 'Atirar'], ['Botão direito', 'Mirar (ADS)'], ['R', 'Recarregar'], ['G', 'Granada'],
      ['1 / 2 / Q / Roda', 'Trocar arma'], ['E', 'Interagir'], ['Esc / P', 'Pausar'],
    ];
    this._show(`
      <h2>CONTROLES</h2>
      <table class="controls">${rows.map(([k, v]) => `<tr><td class="k">${k}</td><td>${v}</td></tr>`).join('')}</table>
      <div class="menu-buttons"><button id="c-back" class="primary">Voltar</button></div>`, 'controls-menu');
    this._bind('c-back', back);
  }

  death(cause) {
    this.current = 'death';
    this._show(`
      <h2 class="red">VOCÊ FOI ABATIDO</h2>
      <p class="hint">${cause || 'Use cobertura e agache para reduzir a exposição. Sua vida se recupera fora do fogo inimigo.'}</p>
      <div class="menu-buttons">
        <button id="d-retry" class="primary">Tentar novamente do checkpoint</button>
        <button id="d-quit">Sair para o menu</button>
      </div>`, 'death-menu');
    this._bind('d-retry', () => this.game.restartFromCheckpoint());
    this._bind('d-quit', () => this.game.quitToMenu());
  }

  missionComplete(stats) {
    this.current = 'complete';
    const acc = stats.shots ? Math.min(100, Math.round((stats.hits / stats.shots) * 100)) : 0;
    this._show(`
      <div class="logo small"><div class="logo-top">MISSÃO 1 CONCLUÍDA</div><div class="logo-main">PRIMEIRO CONTATO</div></div>
      <p class="hint">Os códigos encontrados no Halden pertencem ao próprio Comando da Coalizão.<br>Alguém de dentro está ajudando o VÉRTICE — e a equipe Iron perdeu contato com Bastião.<br><b>Continua na Missão 2 — Sinal Morto.</b></p>
      <table class="controls stats">
        <tr><td class="k">Tempo</td><td>${stats.time}</td></tr>
        <tr><td class="k">Hostis abatidos</td><td>${stats.kills}</td></tr>
        <tr><td class="k">Tiros na cabeça</td><td>${stats.headshots}</td></tr>
        <tr><td class="k">Precisão</td><td>${acc}%</td></tr>
        <tr><td class="k">Mortes</td><td>${stats.deaths}</td></tr>
      </table>
      <div class="menu-buttons"><button id="e-menu" class="primary">Menu principal</button></div>`, 'complete-menu');
    this._bind('e-menu', () => this.game.quitToMenu());
  }
}
