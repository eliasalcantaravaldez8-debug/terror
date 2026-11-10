// "Publicar jogo": publica o projeto do Studio no NEXPLAY Arcade (ou atualiza / retira um jogo já publicado).
// Antes de enviar, o projeto é salvo e executado no player isolado com um teste automático do jogo inteiro.
// O servidor só aceita a publicação se o projeto for válido e o teste passar.
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, GENRE_LABEL, MODE_LABEL } from '../api.js';
import { Modal, Field, useToast, ActionButton } from '../components/ui.jsx';
import { Icon } from '../components/icons.jsx';
import Preview from './Preview.jsx';
import { STANDALONE } from '../standalone.js';

const GENRE_FROM_TEMPLATE = { futebol: 'futebol', terror: 'terror', corrida: 'corrida', aventura: 'aventura', plataforma: 'plataforma', mundo_aberto: 'mundo_aberto', sobrevivencia: 'sobrevivencia' };

/** Lê um arquivo de imagem e devolve um data URL JPEG reduzido (máx. 1600 px). */
function readImage(file, max = 1600) {
  return new Promise((resolve, reject) => {
    if (!/^image\/(png|jpeg|webp)$/.test(file.type)) return reject(new Error('Use PNG, JPG ou WEBP.'));
    const img = new Image();
    img.onload = () => {
      const k = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(img.src);
      resolve(c.toDataURL('image/jpeg', 0.85));
    };
    img.onerror = () => reject(new Error('Imagem inválida.'));
    img.src = URL.createObjectURL(file);
  });
}
const bump = (v) => { const m = /^(\d+)\.(\d+)\.(\d+)$/.exec(v || ''); return m ? `${m[1]}.${m[2]}.${Number(m[3]) + 1}` : '1.0.0'; };

export default function PublishModal(props) {
  if (STANDALONE) {
    return (
      <Modal title="Publicar jogo" onClose={props.onClose}>
        <p>Publicar no NEXPLAY Arcade precisa do <b>servidor da NEXPLAY</b> (banco de dados, página do jogo e jogadores). Esta é a versão para celular, sem servidor: o projeto fica salvo só neste aparelho.</p>
        <p className="small muted">Você pode baixar o projeto pelo botão <b>Backup</b> e importá-lo no NEXPLAY Studio da plataforma completa para publicar.</p>
        <button className="btn primary" onClick={props.onClose}>Entendi</button>
      </Modal>
    );
  }
  return <PublishModalServer {...props} />;
}

function PublishModalServer({ project, doc, save, onClose, sceneSnapshot }) {
  const toast = useToast();
  const [existing, setExisting] = useState(undefined);
  const [payments, setPayments] = useState(false);
  const [f, setF] = useState(null);
  const [cover, setCover] = useState(null);
  const [images, setImages] = useState([]);
  const [step, setStep] = useState('form'); // form | testing | result
  const [test, setTest] = useState(null);
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(null);

  useEffect(() => {
    Promise.all([api.get(`/games/by-project/${project.id}`), api.get('/health')]).then(([{ game }, h]) => {
      setExisting(game); setPayments(h.services?.payments === 'configured');
      const is3d = doc.meta.dimension === '3d';
      setF(game ? {
        title: game.title, shortDescription: game.shortDescription || '', description: game.description || '', genre: game.genre, tags: game.tags.join(', '),
        platforms: game.platforms, modes: game.modes, maxPlayers: game.maxPlayers, controls: game.controls || '', version: bump(game.lastVersion), changelog: '',
        priceCents: game.priceCents, ageRating: game.ageRating, rightsConfirmed: false,
      } : {
        title: doc.meta.name || project.name, shortDescription: '', description: doc.meta.description || '', genre: (project.genre && project.genre !== 'outro' ? project.genre : GENRE_FROM_TEMPLATE[project.template]) || 'outro', tags: '',
        platforms: 'both', modes: ['solo'], maxPlayers: 1,
        controls: is3d ? 'PC: WASD para mover, Shift corre, Espaço pula, E interage, Esc pausa. Celular: analógico na tela + botões AÇÃO e PULO.' : 'PC: setas/WASD para mover e Espaço para pular. Celular: analógico na tela + botão PULO.',
        version: '1.0.0', changelog: 'Primeira versão.', priceCents: 0, ageRating: 'L', rightsConfirmed: false,
      });
    }).catch((e) => setErr(e.message));
  }, [project.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  const multiplayer = f && f.modes.some((m) => m !== 'solo');

  const startTest = async () => {
    setErr(null);
    if (!f.rightsConfirmed) return setErr('Confirme que o jogo é seu e segue as regras.');
    if (!cover && !existing?.coverUrl && !sceneSnapshot) { /* a captura do teste pode virar capa */ }
    const saved = await save('manual', `Publicação ${f.version}`);
    if (!saved) return setErr('Não foi possível salvar o projeto antes do teste.');
    if (saved.validation?.errors?.length) return setErr(`O projeto tem ${saved.validation.errors.length} erro(s) de validação: ${saved.validation.errors.slice(0, 2).join('; ')}`);
    setTest(null); setStep('testing');
  };

  const publish = async (report) => {
    setBusy(true); setErr(null);
    try {
      const coverDataUrl = cover || (!existing?.coverUrl ? (report.screenshot || sceneSnapshot?.()) : null) || undefined;
      const body = {
        projectId: project.id, title: f.title, shortDescription: f.shortDescription, description: f.description, genre: f.genre,
        tags: f.tags.split(',').map((t) => t.trim()).filter(Boolean).slice(0, 10), ageRating: f.ageRating, platforms: f.platforms,
        modes: f.modes, maxPlayers: multiplayer ? Number(f.maxPlayers) : 1, controls: f.controls, version: f.version, changelog: f.changelog,
        priceCents: payments ? Number(f.priceCents) : 0, rightsConfirmed: true, coverDataUrl, images,
        testReport: { ok: report.ok, frames: report.frames, fps: report.fps, errors: report.errors || [], durationMs: report.durationMs, dimension: report.dimension },
      };
      const r = await api.post('/games/publish-studio', body);
      setDone(r); toast(r.status === 'published' ? 'Jogo publicado no Arcade!' : 'Enviado para revisão.');
    } catch (e) { setErr(e.message); setStep('form'); } finally { setBusy(false); }
  };

  const onTestResult = (r) => { setTest(r); setStep('result'); if (r.ok) publish(r); };

  if (err && !f) return <Modal title="Publicar jogo" onClose={onClose}><div className="error-box">{err}</div></Modal>;
  if (!f || existing === undefined) return <Modal title="Publicar jogo" onClose={onClose}><div className="spinner" /></Modal>;

  if (done) {
    return (
      <Modal title={done.status === 'published' ? 'Jogo publicado!' : 'Enviado'} onClose={onClose}>
        <div className="info-box">{done.status === 'published' ? `${done.game.title} já está no NEXPLAY Arcade. Qualquer pessoa pode abrir e jogar.` : 'A publicação automática está desativada pela administração: o jogo foi para a fila de moderação.'}</div>
        {done.warnings?.length > 0 && <div className="warn-box small mt">{done.warnings.slice(0, 4).join(' · ')}</div>}
        <div className="row mt"><Link className="btn primary" to={`/jogo/${done.game.slug}`}><Icon name="play" /> Ver página do jogo</Link><Link className="btn" to="/arcade">Abrir o Arcade</Link></div>
      </Modal>
    );
  }

  return (
    <Modal title={existing ? `Atualizar “${existing.title}”` : 'Publicar jogo'} onClose={onClose} wide>
      {existing && (
        <div className="info-box small mb row between">
          <span>Status: <b>{{ published: 'Publicado no Arcade', draft: 'Fora do Arcade', pending_review: 'Em revisão', rejected: 'Recusado', removed: 'Removido pela moderação' }[existing.status] || existing.status}</b>{existing.currentVersion && ` · versão ${existing.currentVersion}`}</span>
          <span className="row" style={{ gap: 6 }}>
            <Link className="btn sm" to={`/jogo/${existing.slug}`}>Página do jogo</Link>
            {existing.status === 'published' && <ActionButton className="btn sm danger" onClick={async () => { if (!confirm('Retirar o jogo do Arcade? Dados, avaliações e versões são mantidos.')) return; await api.post(`/games/${existing.id}/unpublish`); setExisting({ ...existing, status: 'draft' }); toast('Jogo retirado do Arcade.'); }}>Retirar do Arcade</ActionButton>}
            {existing.status === 'draft' && existing.currentVersion && <ActionButton className="btn sm" onClick={async () => { await api.post(`/games/${existing.id}/republish`); setExisting({ ...existing, status: 'published' }); toast('Jogo de volta ao Arcade.'); }}>Publicar de novo</ActionButton>}
          </span>
        </div>
      )}
      {step === 'form' && (
        <div className="stack">
          <div className="grid cols-2">
            <Field label="Nome do jogo"><input className="input" value={f.title} maxLength={80} onChange={set('title')} /></Field>
            <Field label="Versão" hint={existing ? `Última enviada: ${existing.lastVersion || '—'}` : 'Ex.: 1.0.0'}><input className="input" value={f.version} onChange={set('version')} /></Field>
          </div>
          <Field label="Resumo (aparece no card)"><input className="input" value={f.shortDescription} maxLength={200} onChange={set('shortDescription')} /></Field>
          <Field label="Descrição"><textarea className="input" rows={4} value={f.description} onChange={set('description')} placeholder="Conte do que se trata o jogo, objetivo, história…" /></Field>
          <div className="grid cols-3">
            <Field label="Categoria / gênero"><select className="input" value={f.genre} onChange={set('genre')}>{Object.entries(GENRE_LABEL).filter(([k]) => k !== 'vazio').map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></Field>
            <Field label="Tipo"><input className="input" value={doc.meta.dimension === '3d' ? '3D' : '2D'} disabled title="Definido pelo projeto" /></Field>
            <Field label="Roda em"><select className="input" value={f.platforms} onChange={set('platforms')}><option value="both">PC e celular</option><option value="pc">Só PC</option><option value="mobile">Só celular</option></select></Field>
          </div>
          <div className="grid cols-3">
            <Field label="Modo"><select className="input" value={multiplayer ? 'mp' : 'solo'} onChange={(e) => setF({ ...f, modes: e.target.value === 'solo' ? ['solo'] : ['public_mp', 'private_rooms'], maxPlayers: e.target.value === 'solo' ? 1 : Math.max(2, f.maxPlayers) })}><option value="solo">Solo</option><option value="mp">Multiplayer</option></select></Field>
            {multiplayer && <Field label="Máx. jogadores"><input className="input" type="number" min={2} max={256} value={f.maxPlayers} onChange={set('maxPlayers')} /></Field>}
            {multiplayer && <Field label="Tipos de multiplayer"><select className="input" multiple value={f.modes} onChange={(e) => setF({ ...f, modes: [...e.target.selectedOptions].map((o) => o.value) })} style={{ height: 76 }}>{Object.entries(MODE_LABEL).filter(([k]) => k !== 'solo').map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></Field>}
            <Field label="Classificação"><select className="input" value={f.ageRating} onChange={set('ageRating')}>{['L', '10', '12', '14', '16', '18'].map((a) => <option key={a} value={a}>{a === 'L' ? 'Livre' : `${a}+`}</option>)}</select></Field>
          </div>
          {multiplayer && <p className="tiny muted" style={{ marginTop: -6 }}>Multiplayer usa as salas e o relay do NEXPLAY SDK. Jogadores só verão o modo se o jogo realmente usar as salas.</p>}
          <Field label="Controles"><textarea className="input" rows={2} value={f.controls} onChange={set('controls')} /></Field>
          <Field label="Tags (separe por vírgula)"><input className="input" value={f.tags} onChange={set('tags')} placeholder="ex.: zumbis, cooperativo, noite" /></Field>
          <div className="grid cols-2">
            <Field label="Preço" hint={payments ? 'Valor em centavos; a venda usa o sistema de pagamentos configurado.' : 'Jogos pagos ficam disponíveis quando o sistema de pagamentos estiver configurado. Por enquanto, só gratuito.'}>
              {payments ? <input className="input" type="number" min={0} step={50} value={f.priceCents} onChange={set('priceCents')} /> : <input className="input" value="Gratuito" disabled />}
            </Field>
            {existing && <Field label="O que mudou nesta versão"><textarea className="input" rows={2} value={f.changelog} onChange={set('changelog')} /></Field>}
          </div>
          <div className="grid cols-2">
            <Field label="Capa" hint={cover ? 'Capa escolhida.' : existing?.coverUrl ? 'Mantém a capa atual se você não escolher outra.' : 'Se não escolher, usamos uma captura feita durante o teste do jogo.'}>
              <div className="row">
                <label className="btn sm"><Icon name="upload" /> Enviar imagem<input type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={async (e) => { try { setCover(await readImage(e.target.files[0])); } catch (x) { setErr(x.message); } }} /></label>
                {sceneSnapshot && <button className="btn sm" type="button" onClick={() => setCover(sceneSnapshot())}><Icon name="cube" /> Usar imagem da cena</button>}
              </div>
              {(cover || existing?.coverUrl) && <img src={cover || existing.coverUrl} alt="Capa" style={{ marginTop: 8, width: '100%', maxHeight: 160, objectFit: 'cover', borderRadius: 10 }} />}
            </Field>
            <Field label={`Imagens da página (${images.length}/6)`} hint={existing ? 'Se enviar novas, elas substituem as atuais.' : 'Opcional.'}>
              <label className="btn sm"><Icon name="upload" /> Adicionar imagens<input type="file" multiple accept="image/png,image/jpeg,image/webp" hidden onChange={async (e) => { try { const add = await Promise.all([...e.target.files].slice(0, 6 - images.length).map((x) => readImage(x))); setImages([...images, ...add]); } catch (x) { setErr(x.message); } }} /></label>
              {images.length > 0 && <div className="row" style={{ marginTop: 8, gap: 6 }}>{images.map((src, i) => <img key={i} src={src} alt="" onClick={() => setImages(images.filter((_, j) => j !== i))} title="Clique para remover" style={{ width: 70, height: 46, objectFit: 'cover', borderRadius: 6, cursor: 'pointer' }} />)}</div>}
            </Field>
          </div>
          <label className="row small"><input type="checkbox" checked={f.rightsConfirmed} onChange={set('rightsConfirmed')} /> Confirmo que o jogo é meu (ou tenho direitos sobre todo o conteúdo) e que segue as regras da NEXPLAY.</label>
          {err && <div className="error-box small">{err}</div>}
          <div className="row between">
            <span className="tiny muted">Ao continuar, o projeto é salvo e testado automaticamente no motor da NEXPLAY. Só publica se o teste passar.</span>
            <ActionButton className="btn primary" onClick={startTest}><Icon name="play" /> {existing ? 'Testar e atualizar' : 'Testar e publicar'}</ActionButton>
          </div>
        </div>
      )}
      {step !== 'form' && (
        <div className="stack">
          <div style={{ height: 300, borderRadius: 12, overflow: 'hidden', background: '#000', position: 'relative' }}>
            {step === 'testing' && <Preview doc={doc} projectId={project.id} test={{ full: true }} onTestResult={onTestResult} />}
            {step === 'result' && test?.screenshot && <img src={test.screenshot} alt="Captura do teste" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
            {step === 'testing' && <div className="pill cyan" style={{ position: 'absolute', top: 10, left: 10 }}>Testando o jogo…</div>}
          </div>
          {step === 'result' && test && (
            <div className={test.ok ? 'info-box small' : 'error-box small'}>
              {test.ok ? `Teste aprovado: ${test.frames} quadros em ${(test.durationMs / 1000).toFixed(1)} s (${test.fps} FPS), sem erros.` : (
                <>Teste reprovado. {test.frames < 10 && `O jogo quase não executou (${test.frames} quadros em ${((test.durationMs || 0) / 1000).toFixed(1)} s) — o aparelho pode estar sobrecarregado; feche outras abas e tente de novo. `}{test.errors?.length > 0 && <ul style={{ margin: '6px 0 0' }}>{test.errors.slice(0, 6).map((e) => <li key={e}>{e}</li>)}</ul>}</>
              )}
              {test.ok && test.fps < 20 && <div className="tiny">Aviso: o desempenho ficou baixo neste aparelho. Considere reduzir vegetação/efeitos.</div>}
            </div>
          )}
          {busy && <div className="spinner" />}
          {err && <div className="error-box small">{err}</div>}
          {step === 'result' && !busy && <div className="row"><button className="btn" onClick={() => setStep('form')}>Voltar ao formulário</button>{!test?.ok && <button className="btn primary" onClick={() => { setTest(null); setStep('testing'); }}>Testar de novo</button>}</div>}
        </div>
      )}
    </Modal>
  );
}
