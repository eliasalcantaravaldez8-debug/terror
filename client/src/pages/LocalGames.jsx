// "Enviar jogo pronto" na versão SEM servidor (link do celular).
// O criador escolhe a exportação Web do jogo (.html ou .zip com index.html). Os arquivos são verificados,
// guardados no IndexedDB DESTE aparelho e executados num iframe isolado (origem opaca: o jogo não acessa
// os projetos, a conta nem o Claude da página). Publicar no Arcade para outras pessoas exige o servidor.
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { unzipSync } from 'three/examples/jsm/libs/fflate.module.js';
import { GENRE_LABEL } from '../api.js';
import { localStore } from '../localdb.js';
import { Field, useToast } from '../components/ui.jsx';
import { Icon } from '../components/icons.jsx';

const GENRES = ['acao', 'aventura', 'terror', 'sobrevivencia', 'corrida', 'plataforma', 'mundo_aberto', 'futebol', 'esportes', 'rpg', 'estrategia', 'puzzle', 'simulacao', 'tiro', 'luta', 'casual', 'musical', 'educativo', 'outro'];
const BLOCKED = /\.(exe|dll|bat|cmd|com|sh|ps1|vbs|msi|scr|jar|php|py|pl|cgi|asp|aspx|jsp|apk|aab|ipa|dmg|app|deb|rpm|x86_64)$/i;
const MAX_MB = 150;
const fmt = (b) => (b > 1e6 ? `${(b / 1e6).toFixed(1)} MB` : `${Math.ceil(b / 1e3)} KB`);

/** Lê o arquivo enviado e devolve { files: {caminho: ArrayBuffer}, entry, notes, engine }. */
async function readBuild(file) {
  if (BLOCKED.test(file.name)) throw new Error('Executáveis e pacotes de app (.exe, .apk…) não rodam no navegador. Exporte o jogo para Web/HTML5 e envie o .zip ou o .html.');
  if (file.size > MAX_MB * 1024 * 1024) throw new Error(`Arquivo maior que ${MAX_MB} MB.`);
  const buf = await file.arrayBuffer();
  if (/\.html?$/i.test(file.name)) return { files: { 'index.html': buf }, entry: 'index.html', notes: [], engine: 'html5' };
  if (!/\.zip$/i.test(file.name)) throw new Error('Envie um .html ou um .zip com a exportação Web do jogo (index.html dentro).');
  let raw;
  try { raw = unzipSync(new Uint8Array(buf)); } catch { throw new Error('Não consegui abrir o .zip (arquivo corrompido?).'); }
  const files = {};
  for (const [name, data] of Object.entries(raw)) {
    const n = name.replace(/\\/g, '/');
    if (n.endsWith('/') || n.startsWith('__MACOSX/') || n.endsWith('.DS_Store')) continue;
    if (n.split('/').some((p) => p === '..') || n.startsWith('/')) throw new Error(`Caminho inválido no .zip: ${n}`);
    if (BLOCKED.test(n)) throw new Error(`Arquivo proibido no pacote: ${n}`);
    files[n] = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  }
  const names = Object.keys(files);
  let entry = names.find((n) => n.toLowerCase() === 'index.html');
  if (!entry) { const c = names.filter((n) => /^[^/]+\/index\.html$/i.test(n)); if (c.length === 1) [entry] = c; }
  if (!entry) { const htmls = names.filter((n) => /\.html?$/i.test(n)); if (htmls.length === 1) [entry] = htmls; }
  if (!entry) throw new Error('Não achei o index.html dentro do .zip. Envie a pasta da exportação Web compactada.');
  // Ferramenta e problemas conhecidos (mesma lógica do servidor).
  const has = (re) => names.some((n) => re.test(n.toLowerCase()));
  const notes = []; let engine = 'html5';
  const html = new TextDecoder().decode(files[entry]).slice(0, 400000);
  if (has(/\.pck$/) && has(/\.wasm$/)) {
    engine = 'godot';
    if (/GODOT_THREADS_ENABLED\s*=\s*true/.test(html) || /"ensureCrossOriginIsolationHeaders"\s*:\s*true/.test(html)) notes.push('Este build do Godot foi exportado com "Thread Support" ligado e não roda no navegador sem isolamento especial. Exporte de novo com Thread Support desligado.');
  } else if (has(/(^|\/)build\/[^/]+\.loader\.js$/) || has(/\.unityweb$/)) {
    engine = 'unity';
    if (has(/\.(wasm|data|framework\.js)\.(br|gz)$/)) notes.push('Build do Unity com compressão Brotli/Gzip: aqui (sem servidor) ele só roda se foi exportado com "Decompression Fallback" ligado ou sem compressão.');
  } else if (has(/c3runtime\.js$/)) engine = 'construct';
  else if (has(/phaser(\.min)?\.js$/)) engine = 'phaser';
  return { files, entry, notes, engine };
}

function readCover(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => { const k = Math.min(1, 640 / Math.max(img.width, img.height)); const c = document.createElement('canvas'); c.width = img.width * k; c.height = img.height * k; c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(img.src); resolve(c.toDataURL('image/jpeg', 0.8)); };
    img.onerror = () => reject(new Error('Imagem inválida.'));
    img.src = URL.createObjectURL(file);
  });
}

// Documento inicial do iframe isolado: recebe os arquivos, cria URLs locais, instala os redirecionamentos
// (fetch, XHR, src/href, Audio, Worker) e então escreve o index.html do jogo.
const BOOT = `<!doctype html><meta charset="utf-8"><body style="margin:0;background:#000;color:#aaa;font:14px sans-serif"><p style="padding:16px">Carregando o jogo…</p><script>
(function(){
var MIME={html:'text/html',htm:'text/html',js:'text/javascript',mjs:'text/javascript',css:'text/css',json:'application/json',png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',gif:'image/gif',webp:'image/webp',svg:'image/svg+xml',mp3:'audio/mpeg',ogg:'audio/ogg',wav:'audio/wav',m4a:'audio/mp4',mp4:'video/mp4',webm:'video/webm',wasm:'application/wasm',woff:'font/woff',woff2:'font/woff2',ttf:'font/ttf',otf:'font/otf',glb:'model/gltf-binary',gltf:'model/gltf+json',txt:'text/plain',xml:'application/xml'};
addEventListener('message',function onm(ev){
  var m=ev.data; if(ev.source!==parent||!m||m.type!=='nx-load')return; removeEventListener('message',onm);
  var files=m.files,entry=m.entry,lower={},urls={};
  Object.keys(files).forEach(function(k){lower[k.toLowerCase()]=k;});
  var entryDir=entry.lastIndexOf('/')>=0?entry.slice(0,entry.lastIndexOf('/')+1):'';
  var baseRoot=String(document.baseURI).replace(/[?#].*$/,'').replace(/[^/]*$/,'');
  function norm(p){var o=[];p.split('/').forEach(function(s){if(!s||s==='.')return;if(s==='..')o.pop();else o.push(s);});return o.join('/');}
  function resolve(u,dir){
    if(typeof u!=='string'||!u)return null;
    if(baseRoot&&u.indexOf(baseRoot)===0)u=u.slice(baseRoot.length);
    if(/^(?:[a-z][a-z0-9+.-]*:|\\/\\/|#)/i.test(u))return null;
    var c=u.split('#')[0].split('?')[0];try{c=decodeURIComponent(c);}catch(e){}
    return c.charAt(0)==='/'?norm(c):norm((dir==null?entryDir:dir)+c);
  }
  function mime(k){var e=k.toLowerCase().replace(/\\.(br|gz)$/,'').split('.').pop();return MIME[e]||'application/octet-stream';}
  function rewriteCss(css,dir){return css.replace(/url\\(\\s*(['"]?)([^'")]+)\\1\\s*\\)/g,function(a,q,u){var b=blobFor(resolve(u,dir));return b?'url("'+b+'")':a;});}
  function blobFor(p){
    if(!p)return null; var k=(p in files)?p:lower[p.toLowerCase()]; if(!k)return null;
    if(!urls[k]){var d=files[k]; if(/\\.css$/i.test(k))d=rewriteCss(new TextDecoder().decode(d),k.slice(0,k.lastIndexOf('/')+1)); urls[k]=URL.createObjectURL(new Blob([d],{type:mime(k)}));}
    return urls[k];
  }
  function map(u){var b=blobFor(resolve(String(u)));return b||u;}
  window.__nxMap=map;
  // Jogos isolados não têm armazenamento do navegador: usa uma memória temporária para não travarem.
  ['localStorage','sessionStorage'].forEach(function(n){try{window[n].length;}catch(e){var d={};var s={getItem:function(k){return k in d?d[k]:null;},setItem:function(k,v){d[k]=String(v);},removeItem:function(k){delete d[k];},clear:function(){d={};},key:function(i){return Object.keys(d)[i]||null;}};Object.defineProperty(s,'length',{get:function(){return Object.keys(d).length;}});try{Object.defineProperty(window,n,{value:s,configurable:true});}catch(e2){}}});
  var of=window.fetch; if(of)window.fetch=function(i,o){if(typeof i==='string'||i instanceof URL)i=map(String(i));else if(i&&i.url){var b=map(i.url);if(b!==i.url)i=b;}return of.call(this,i,o);};
  var ox=XMLHttpRequest.prototype.open; XMLHttpRequest.prototype.open=function(){var a=[].slice.call(arguments);a[1]=map(a[1]);return ox.apply(this,a);};
  function patch(C,p){if(!C)return;var d=Object.getOwnPropertyDescriptor(C.prototype,p);if(!d||!d.set)return;Object.defineProperty(C.prototype,p,{get:d.get,set:function(v){d.set.call(this,map(v));},configurable:true});}
  patch(window.HTMLScriptElement,'src');patch(window.HTMLImageElement,'src');patch(window.HTMLMediaElement,'src');patch(window.HTMLSourceElement,'src');patch(window.HTMLLinkElement,'href');patch(window.HTMLIFrameElement,'src');patch(window.HTMLVideoElement,'poster');
  var sa=Element.prototype.setAttribute; Element.prototype.setAttribute=function(n,v){if(/^(src|href|poster|data)$/i.test(n))v=map(v);return sa.call(this,n,v);};
  var OA=window.Audio; if(OA){window.Audio=function(u){return u===undefined?new OA():new OA(map(u));};window.Audio.prototype=OA.prototype;}
  var OW=window.Worker; if(OW){window.Worker=function(u,o){return new OW(map(u),o);};window.Worker.prototype=OW.prototype;}
  var html=new TextDecoder().decode(files[entry]);
  html=html.replace(/(\\s(?:src|href|poster|data)\\s*=\\s*)(["'])([^"']*)\\2/gi,function(a,pre,q,u){var b=blobFor(resolve(u));return b?pre+q+b+q:a;});
  html=rewriteCss(html,entryDir);
  document.open();document.write(html);document.close();
  parent.postMessage({type:'nx-started'},'*');
});
parent.postMessage({type:'nx-boot'},'*');
})();
<\/script>`;

function LocalPlayer({ game, onClose }) {
  const frame = useRef(null);
  const [state, setState] = useState('loading');
  useEffect(() => {
    let files = null;
    const onMsg = async (ev) => {
      if (ev.source !== frame.current?.contentWindow) return;
      if (ev.data?.type === 'nx-boot') {
        if (!files) files = (await localStore.get('gamefiles', game.id))?.files;
        if (!files) { setState('missing'); return; }
        frame.current.contentWindow.postMessage({ type: 'nx-load', files, entry: game.entry }, '*');
      }
      if (ev.data?.type === 'nx-started') setState('running');
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [game]);
  return (
    <div className="aichat-test">
      <div className="aichat-test-bar">
        <button className="btn sm" onClick={onClose}>← Voltar</button>
        <span className="small muted" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{game.title}{state === 'loading' ? ' · carregando…' : ''}</span>
        <button className="btn sm ghost" style={{ marginLeft: 'auto' }} onClick={() => frame.current?.requestFullscreen?.()}>Tela cheia</button>
      </div>
      {state === 'missing' ? <div className="error-box" style={{ margin: 16 }}>Os arquivos deste jogo não estão mais neste aparelho.</div> : (
        <iframe ref={frame} title={game.title} srcDoc={BOOT} sandbox="allow-scripts allow-pointer-lock allow-forms allow-modals" allow="fullscreen; gamepad; autoplay" style={{ flex: 1, width: '100%', border: 0, background: '#000' }} />
      )}
    </div>
  );
}

export default function LocalGames() {
  const toast = useToast();
  const [games, setGames] = useState(null);
  const [f, setF] = useState({ title: '', description: '', genre: '', controls: '', platforms: 'both', multiplayer: false });
  const [build, setBuild] = useState(null);
  const [cover, setCover] = useState(null);
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);
  const [playing, setPlaying] = useState(null);
  const reload = () => localStore.all('games').then((g) => setGames(g.sort((a, b) => b.createdAt.localeCompare(a.createdAt)))).catch(() => setGames([]));
  useEffect(() => { reload(); }, []);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const pick = async (file) => {
    setErr(null); setBuild(null);
    if (!file) return;
    setBusy(true);
    try {
      const b = await readBuild(file);
      setBuild({ ...b, name: file.name, size: file.size, count: Object.keys(b.files).length });
      if (!f.title) setF((x) => ({ ...x, title: file.name.replace(/\.(zip|html?)$/i, '').replace(/[-_]+/g, ' ') }));
    } catch (e) { setErr(e.message); } finally { setBusy(false); }
  };

  const save = async () => {
    setErr(null);
    if (!build) return setErr('Escolha o arquivo do jogo.');
    if (f.title.trim().length < 2) return setErr('Dê um nome ao jogo.');
    if (!f.genre) return setErr('Escolha o gênero.');
    setBusy(true);
    try {
      const meta = { title: f.title.trim().slice(0, 80), description: f.description.slice(0, 4000), genre: f.genre, controls: f.controls.slice(0, 1000), platforms: f.platforms,
        multiplayer: f.multiplayer, entry: build.entry, engine: build.engine, notes: build.notes, sizeBytes: build.size, fileCount: build.count, cover, createdAt: new Date().toISOString() };
      const id = await localStore.put('games', meta);
      await localStore.put('gamefiles', { id, files: build.files });
      toast('Jogo salvo neste aparelho!', 'ok');
      setBuild(null); setCover(null); setF({ title: '', description: '', genre: '', controls: '', platforms: 'both', multiplayer: false });
      await reload();
      setPlaying({ ...meta, id });
    } catch (e) { setErr(`Não consegui salvar (${e.message}). O aparelho pode estar sem espaço.`); } finally { setBusy(false); }
  };

  const remove = async (g) => {
    if (!confirm(`Excluir "${g.title}" deste aparelho?`)) return;
    await localStore.del('gamefiles', g.id); await localStore.del('games', g.id); reload();
  };

  return (
    <div className="stack" style={{ maxWidth: 860, margin: '0 auto' }}>
      <div>
        <h1 style={{ marginBottom: 4 }}>Enviar jogo pronto</h1>
        <p className="muted small" style={{ margin: 0 }}>Coloque aqui um jogo que você já fez (Godot, Unity, Construct, Phaser, HTML5 ou feito com outra IA). Envie a <b>exportação Web</b>: um arquivo <b>.html</b> ou um <b>.zip</b> com o index.html dentro.</p>
      </div>
      <div className="info-box small">Neste link (sem servidor) o jogo fica salvo e roda <b>só neste aparelho</b>, num espaço isolado. Para publicar no NEXPLAY Arcade para outras pessoas, envie pela plataforma completa.</div>

      {games?.length > 0 && (
        <section className="card stack">
          <h3 style={{ margin: 0 }}>Meus jogos enviados</h3>
          {games.map((g) => (
            <div key={g.id} className="row" style={{ justifyContent: 'space-between', borderTop: '1px solid var(--line)', paddingTop: 10 }}>
              <div className="row" style={{ gap: 10, minWidth: 0, flexWrap: 'nowrap' }}>
                {g.cover ? <img src={g.cover} alt="" style={{ width: 64, height: 40, objectFit: 'cover', borderRadius: 6 }} /> : <div style={{ width: 64, height: 40, borderRadius: 6, background: 'var(--panel-2)', display: 'grid', placeItems: 'center' }}><Icon name="gamepad" size={18} /></div>}
                <div style={{ minWidth: 0 }}><b>{g.title}</b><div className="tiny muted">{GENRE_LABEL[g.genre]} · {fmt(g.sizeBytes)} · {g.engine}</div></div>
              </div>
              <div className="row" style={{ gap: 6 }}>
                <button className="btn sm primary" onClick={() => setPlaying(g)}><Icon name="play" /> Jogar</button>
                <button className="btn sm danger" onClick={() => remove(g)}>Excluir</button>
              </div>
              {g.notes?.length > 0 && <div className="warn-box tiny" style={{ width: '100%' }}>{g.notes.join(' ')}</div>}
            </div>
          ))}
        </section>
      )}

      <section className="card stack">
        <h3 style={{ margin: 0 }}>{games?.length ? 'Enviar outro jogo' : '1. Arquivo do jogo'}</h3>
        <label className="btn primary" style={{ alignSelf: 'flex-start' }}><Icon name="upload" /> Escolher arquivo (.html ou .zip)<input type="file" accept=".zip,.html,.htm,application/zip,text/html" hidden onChange={(e) => pick(e.target.files[0])} /></label>
        {busy && <div className="spinner" />}
        {build && <div className="info-box small">✓ <b>{build.name}</b> · {fmt(build.size)} · {build.count} arquivo(s) · início: {build.entry}{build.engine !== 'html5' ? ` · feito com ${build.engine}` : ''}</div>}
        {build?.notes?.map((n) => <div key={n} className="warn-box small">{n}</div>)}
        <Field label="Nome do jogo"><input className="input" value={f.title} maxLength={80} onChange={set('title')} placeholder="Ex.: Gol de Placa" /></Field>
        <div className="grid cols-2">
          <Field label="Gênero"><select className="input" value={f.genre} onChange={set('genre')}><option value="">Escolha…</option>{GENRES.map((g) => <option key={g} value={g}>{GENRE_LABEL[g]}</option>)}</select></Field>
          <Field label="Roda em"><select className="input" value={f.platforms} onChange={set('platforms')}><option value="both">PC e celular</option><option value="pc">Só PC</option><option value="mobile">Só celular</option></select></Field>
        </div>
        <Field label="Descrição (opcional)"><textarea className="input" rows={3} value={f.description} onChange={set('description')} /></Field>
        <Field label="Controles (opcional)"><input className="input" value={f.controls} onChange={set('controls')} placeholder="Ex.: toque para chutar" /></Field>
        <label className="row small"><input type="checkbox" checked={f.multiplayer} onChange={set('multiplayer')} /> Tem multiplayer</label>
        <label className="btn sm" style={{ alignSelf: 'flex-start' }}><Icon name="upload" /> Capa (opcional)<input type="file" accept="image/*" hidden onChange={async (e) => { try { setCover(await readCover(e.target.files[0])); } catch (x) { setErr(x.message); } }} /></label>
        {cover && <img src={cover} alt="Capa" style={{ maxWidth: 220, borderRadius: 8 }} />}
        {err && <div className="error-box small">{err}</div>}
        <button className="btn primary lg" disabled={busy} onClick={save}><Icon name="play" /> Salvar e jogar</button>
        <p className="tiny muted" style={{ margin: 0 }}>Bloqueamos executáveis e pacotes de app. Jogos que precisam de servidor próprio (multiplayer online, contas) não funcionam aqui.</p>
      </section>
      <p className="small muted">Quer criar um jogo do zero? <Link to="/criar-com-ia">Criar com IA</Link> ou <Link to="/studio/novo">Criar jogo no Studio</Link>.</p>
      {playing && <LocalPlayer game={playing} onClose={() => setPlaying(null)} />}
    </div>
  );
}
