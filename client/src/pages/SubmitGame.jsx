// "Enviar jogo pronto": para quem já fez o jogo no Godot, Unity, Unreal, Construct, Phaser, HTML5…
// Fluxo real: cria o jogo (rascunho) → envia capa/imagens → envia o build (.zip ou .html) → o servidor
// verifica arquivos e segurança → o criador testa no player isolado → envia para análise da moderação.
// O build NUNCA roda no site principal: é servido por uma origem isolada (sandbox) com token de acesso.
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, GENRE_LABEL, MODE_LABEL } from '../api.js';
import { Field, ActionButton, useToast, FilePick } from '../components/ui.jsx';
import { Icon } from '../components/icons.jsx';

const ENGINES = {
  godot: ['Godot', 'Projeto → Exportar → Web. No Godot 4, desligue "Thread Support" (a NEXPLAY não fornece isolamento entre origens). Compacte a pasta exportada (index.html, .wasm, .pck, .js) em um .zip.'],
  unity: ['Unity', 'File → Build Settings → WebGL → Build. Compacte a pasta gerada (index.html + pasta Build) em um .zip. Compressão Brotli ou Gzip funciona.'],
  unreal: ['Unreal Engine', 'O Unreal não exporta mais para navegador desde a versão 4.24. Só builds HTML5 antigos (UE 4.23 ou anterior) podem rodar aqui. Executáveis (.exe) não são aceitos.'],
  construct: ['Construct', 'Menu → Exportar → Web (HTML5). Envie o .zip gerado.'],
  gamemaker: ['GameMaker', 'Exporte para HTML5 (ou GX.games/Opera) e compacte a pasta com o index.html.'],
  phaser: ['Phaser', 'Compacte a pasta do jogo (index.html na raiz, scripts e assets).'],
  threejs: ['Three.js / Babylon.js', 'Compacte a pasta do build (ex.: dist/ do Vite) com o index.html na raiz.'],
  html5: ['HTML5 / JavaScript', 'Envie um .zip com index.html na raiz, ou um único arquivo .html se o jogo cabe nele.'],
  outro: ['Outra ferramenta', 'Qualquer ferramenta que exporte para Web (HTML5/WebAssembly) funciona. Envie o .zip com o index.html.'],
};
const GENRES = ['acao', 'aventura', 'terror', 'sobrevivencia', 'corrida', 'plataforma', 'mundo_aberto', 'futebol', 'esportes', 'rpg', 'estrategia', 'puzzle', 'simulacao', 'tiro', 'luta', 'casual', 'musical', 'educativo', 'outro'];
const NATIVE = /\.(exe|apk|aab|ipa|dmg|app|msi|deb|rpm|x86_64|pck)$/i;
const fmt = (b) => (b > 1e6 ? `${(b / 1e6).toFixed(1)} MB` : `${Math.ceil(b / 1e3)} KB`);

/** Envio com barra de progresso (fetch não informa progresso de upload). */
function uploadWithProgress(url, form, onProgress) {
  return new Promise((resolve, reject) => {
    const x = new XMLHttpRequest();
    x.open('POST', `/api${url}`); x.withCredentials = true; x.setRequestHeader('X-NX-Client', '1');
    x.upload.onprogress = (e) => e.lengthComputable && onProgress(e.loaded / e.total);
    x.onload = () => { let d = null; try { d = JSON.parse(x.responseText); } catch { /* */ } if (x.status < 300) resolve(d); else reject(new Error(d?.error?.message || `Erro ${x.status}`)); };
    x.onerror = () => reject(new Error('Falha de rede no envio.'));
    x.send(form);
  });
}

export default function SubmitGame() {
  const toast = useToast();
  const nav = useNavigate();
  const [maxMB, setMaxMB] = useState(200);
  const [f, setF] = useState({ engine: 'godot', title: '', shortDescription: '', description: '', genre: '', version: '1.0.0', platforms: 'both', controls: '', multiplayer: false, modes: ['public_mp'], maxPlayers: 4, ageRating: 'L', rights: false });
  const [build, setBuild] = useState(null);
  const [cover, setCover] = useState(null);
  const [images, setImages] = useState([]);
  const [game, setGame] = useState(null);
  const [scan, setScan] = useState(null);
  const [progress, setProgress] = useState(null);
  const [err, setErr] = useState(null);
  const [tested, setTested] = useState(false);
  const [sent, setSent] = useState(false);
  useEffect(() => { api.get('/health').then((h) => h.limits?.gameUploadMB && setMaxMB(h.limits.gameUploadMB)).catch(() => {}); }, []);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const pickBuild = (file) => {
    setErr(null);
    if (!file) return;
    if (NATIVE.test(file.name)) { setBuild(null); return setErr('Executáveis e pacotes nativos (.exe, .apk, .pck sozinho…) não podem rodar com segurança no navegador. Exporte o jogo para Web/HTML5 e envie o .zip da exportação.'); }
    if (!/\.(zip|html?)$/i.test(file.name)) { setBuild(null); return setErr('Envie um .zip (com index.html) ou um único .html.'); }
    if (file.size > maxMB * 1024 * 1024) { setBuild(null); return setErr(`Arquivo maior que o limite de ${maxMB} MB.`); }
    setBuild(file);
  };

  const missing = () => {
    const m = [];
    if (!build) m.push('o arquivo do jogo');
    if (f.title.trim().length < 2) m.push('o nome');
    if (f.description.trim().length < 50) m.push('uma descrição com pelo menos 50 caracteres');
    if (!f.genre) m.push('o gênero');
    if (!f.controls.trim()) m.push('os controles');
    if (!cover) m.push('a capa');
    if (!f.rights) m.push('a confirmação de direitos');
    return m;
  };

  const send = async () => {
    setErr(null);
    const m = missing();
    if (m.length) return setErr(`Falta: ${m.join(', ')}.`);
    try {
      const body = {
        sourceEngine: f.engine, title: f.title.trim(), shortDescription: f.shortDescription, description: f.description, genre: f.genre,
        ageRating: f.ageRating, platforms: f.platforms, controls: f.controls,
        modes: f.multiplayer ? f.modes : ['solo'], maxPlayers: f.multiplayer ? Number(f.maxPlayers) : 1, rightsConfirmed: true, releaseStage: 'released', betaMode: 'none',
      };
      let g = game;
      if (!g) { g = (await api.post('/games', body)).game; setGame(g); } else await api.patch(`/games/${g.id}`, body);
      const c = new FormData(); c.append('file', cover); await api.upload(`/games/${g.id}/cover`, c);
      if (images.length && !game) { const m2 = new FormData(); images.forEach((i) => m2.append('files', i)); await api.upload(`/games/${g.id}/media`, m2); }
      const v = new FormData(); v.append('file', build); v.append('version', f.version); v.append('changelog', 'Primeira versão enviada.');
      setProgress(0);
      const r = await uploadWithProgress(`/games/${g.id}/versions`, v, setProgress);
      setScan(r); setProgress(null);
    } catch (x) { setProgress(null); setErr(x.message); }
  };

  const blocking = scan?.scan?.compatibility?.some((n) => n.level === 'error');

  if (sent) {
    return (
      <div className="card stack" style={{ maxWidth: 720, margin: '0 auto' }}>
        <h1 style={{ margin: 0 }}>Enviado para análise</h1>
        <p><b>{game.title}</b> está na fila da moderação. Você recebe uma notificação quando for aprovado (aí ele aparece no NEXPLAY Arcade) ou se precisar de ajustes.</p>
        <div className="row"><Link className="btn primary" to={`/jogo/${game.slug}`}>Página do jogo</Link><Link className="btn" to="/criador">Painel do criador</Link></div>
      </div>
    );
  }

  return (
    <div className="stack" style={{ maxWidth: 920, margin: '0 auto' }}>
      <div>
        <h1 style={{ marginBottom: 4 }}>Enviar jogo pronto</h1>
        <p className="muted" style={{ margin: 0 }}>Já fez seu jogo no Godot, Unity, Construct, Phaser ou em HTML5? Envie a exportação Web aqui. Ele passa por verificação automática, você testa, e a moderação analisa antes de aparecer no Arcade. Quer criar do zero? <Link to="/studio/novo">Use o NEXPLAY Studio</Link>.</p>
      </div>

      <section className="card stack">
        <h3 style={{ margin: 0 }}>1. Arquivos do jogo</h3>
        <Field label="Feito com">
          <select className="input" value={f.engine} onChange={set('engine')} disabled={!!scan}>{Object.entries(ENGINES).map(([k, [l]]) => <option key={k} value={k}>{l}</option>)}</select>
        </Field>
        <div className="info-box small">{ENGINES[f.engine][1]}</div>
        <FilePick className="btn" disabled={!!scan} onFile={pickBuild}><Icon name="upload" /> Selecionar arquivo (.zip ou .html)</FilePick>
        {build && <div className="small">Selecionado: <b>{build.name}</b> ({fmt(build.size)})</div>}
        <p className="tiny muted" style={{ margin: 0 }}>Limite: {maxMB} MB. Aceitos dentro do .zip: HTML, JS, WebAssembly, imagens, áudio, vídeo, fontes, modelos 3D e dados (.pck, .data, .unityweb, .br, .gz…). Executáveis e scripts de servidor são bloqueados.</p>
      </section>

      <section className="card stack">
        <h3 style={{ margin: 0 }}>2. Informações</h3>
        <div className="grid cols-2">
          <Field label="Nome do jogo"><input className="input" value={f.title} maxLength={80} onChange={set('title')} /></Field>
          <Field label="Versão"><input className="input" value={f.version} onChange={set('version')} disabled={!!scan} /></Field>
        </div>
        <Field label="Resumo (card do Arcade)"><input className="input" value={f.shortDescription} maxLength={200} onChange={set('shortDescription')} /></Field>
        <Field label="Descrição" hint={`${f.description.trim().length}/50 caracteres mínimos`}><textarea className="input" rows={4} value={f.description} onChange={set('description')} /></Field>
        <div className="grid cols-3">
          <Field label="Gênero"><select className="input" value={f.genre} onChange={set('genre')}><option value="">Escolha…</option>{GENRES.map((g) => <option key={g} value={g}>{GENRE_LABEL[g]}</option>)}</select></Field>
          <Field label="Compatível com"><select className="input" value={f.platforms} onChange={set('platforms')}><option value="both">PC e celular</option><option value="pc">Só PC</option><option value="mobile">Só celular</option></select></Field>
          <Field label="Classificação"><select className="input" value={f.ageRating} onChange={set('ageRating')}>{['L', '10', '12', '14', '16', '18'].map((a) => <option key={a} value={a}>{a === 'L' ? 'Livre' : `${a}+`}</option>)}</select></Field>
        </div>
        <Field label="Controles"><textarea className="input" rows={2} value={f.controls} onChange={set('controls')} placeholder="Ex.: PC — WASD move, Espaço pula. Celular — toque na tela para pular." /></Field>
        <label className="row small"><input type="checkbox" checked={f.multiplayer} onChange={set('multiplayer')} /> O jogo tem multiplayer</label>
        {f.multiplayer && (
          <div className="grid cols-2">
            <Field label="Máx. jogadores"><input className="input" type="number" min={2} max={256} value={f.maxPlayers} onChange={set('maxPlayers')} /></Field>
            <Field label="Tipo de multiplayer" hint="Online usa as salas do NEXPLAY SDK (docs/SDK.md). Servidores próprios do jogo não são hospedados pela NEXPLAY."><select className="input" multiple style={{ height: 96 }} value={f.modes} onChange={(e) => setF({ ...f, modes: [...e.target.selectedOptions].map((o) => o.value) })}>{Object.entries(MODE_LABEL).filter(([k]) => k !== 'solo').map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></Field>
          </div>
        )}
        <Field label="Preço" hint="Jogos pagos ficam disponíveis quando o sistema de pagamentos estiver configurado."><input className="input" value="Gratuito" disabled /></Field>
      </section>

      <section className="card stack">
        <h3 style={{ margin: 0 }}>3. Capa e imagens</h3>
        <div className="row">
          <FilePick className="btn" accept="image/*" onFile={setCover}><Icon name="upload" /> Capa</FilePick>
          <FilePick className="btn" accept="image/*" multiple disabled={!!game} onFiles={(fs) => setImages([...images, ...fs].slice(0, 6))}><Icon name="upload" /> Imagens ({images.length}/6)</FilePick>
        </div>
        <div className="row" style={{ gap: 6 }}>
          {cover && <img src={URL.createObjectURL(cover)} alt="Capa" style={{ height: 90, borderRadius: 8 }} />}
          {images.map((im, i) => <img key={i} src={URL.createObjectURL(im)} alt="" title="Clique para remover" onClick={() => !game && setImages(images.filter((_, j) => j !== i))} style={{ height: 60, borderRadius: 6, cursor: 'pointer' }} />)}
        </div>
      </section>

      <section className="card stack">
        <h3 style={{ margin: 0 }}>4. Enviar e verificar</h3>
        <label className="row small"><input type="checkbox" checked={f.rights} onChange={set('rights')} /> Confirmo que criei o jogo (ou tenho autorização para distribuí-lo) e que ele segue as regras da NEXPLAY.</label>
        {err && <div className="error-box small">{err}</div>}
        {progress !== null && <div><div className="progress"><i style={{ width: `${Math.round(progress * 100)}%` }} /></div><div className="tiny muted">{progress < 1 ? `Enviando… ${Math.round(progress * 100)}%` : 'Verificando arquivos no servidor…'}</div></div>}
        {!scan && <ActionButton className="btn primary lg" onClick={send} disabled={progress !== null}><Icon name="upload" /> Enviar arquivos e verificar</ActionButton>}
        {scan && (
          <div className="stack">
            <div className={scan.scan.status === 'passed' ? 'info-box small' : 'warn-box small'}>
              Verificação automática: <b>{{ passed: 'aprovada', flagged: 'aprovada com alertas (a moderação vai olhar com atenção)' }[scan.scan.status] || scan.scan.status}</b> · {scan.fileCount} arquivos · {fmt(scan.sizeBytes || 0)} · ferramenta detectada: <b>{ENGINES[scan.scan.engine]?.[0] || 'HTML5'}</b>
              {scan.scan.findings?.length > 0 && <ul style={{ margin: '6px 0 0' }}>{scan.scan.findings.slice(0, 8).map((x, i) => <li key={i}>{x.file}: {x.rule}</li>)}</ul>}
            </div>
            {scan.scan.compatibility?.map((n, i) => <div key={i} className={n.level === 'error' ? 'error-box small' : n.level === 'warn' ? 'warn-box small' : 'info-box small'}>{n.text}</div>)}
            <h3 style={{ margin: '8px 0 0' }}>5. Testar e enviar para análise</h3>
            <p className="small muted" style={{ margin: 0 }}>Abra o jogo no player isolado da NEXPLAY (é exatamente onde os jogadores vão jogar) e confira se carrega e funciona.</p>
            <div className="row">
              <a className="btn" href={`/jogo/${game.slug}/jogar`} target="_blank" rel="noopener"><Icon name="play" /> Testar meu jogo</a>
              <label className="row small"><input type="checkbox" checked={tested} onChange={(e) => setTested(e.target.checked)} /> Testei e o jogo abriu e funcionou</label>
            </div>
            {blocking && <div className="error-box small">Há um problema de compatibilidade que impede o jogo de rodar no navegador. Corrija a exportação e envie de novo pelo <Link to={`/criador/jogos/${game.id}`}>painel do jogo</Link> (aba Builds) com uma nova versão.</div>}
            <div className="row">
              <ActionButton className="btn primary lg" disabled={!tested || blocking} onClick={async () => { try { await api.post(`/games/${game.id}/submit`); setSent(true); toast('Enviado para análise.'); } catch (x) { setErr(x.message); } }}>Enviar para análise</ActionButton>
              <button className="btn" onClick={() => nav(`/criador/jogos/${game.id}`)}>Continuar depois (fica como rascunho)</button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
