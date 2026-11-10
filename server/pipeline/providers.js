// Provedores externos de geração 3D: Tripo AI e Meshy AI (APIs REST, chave por variável de ambiente).
//
// ATENÇÃO: os contratos abaixo seguem a documentação pública conhecida destes serviços, mas NÃO puderam ser
// testados contra as APIs reais neste ambiente (sem chaves e sem acesso de rede aos domínios). As URLs base
// são configuráveis (TRIPO_API_BASE / MESHY_API_BASE) e as respostas são validadas defensivamente: qualquer
// formato inesperado vira erro explícito no job, nunca um "sucesso" falso.
import { HttpError } from '../lib/security.js';

const MAX_MODEL_BYTES = 150 * 1024 * 1024;
const sleep = (ms, signal) => new Promise((resolve, reject) => {
  const t = setTimeout(resolve, ms);
  signal?.addEventListener('abort', () => { clearTimeout(t); reject(new Error('Cancelado.')); }, { once: true });
});

async function http(url, { method = 'GET', headers = {}, body, signal } = {}) {
  const res = await fetch(url, { method, headers, body, signal });
  const text = await res.text();
  let json = null;
  try { json = JSON.parse(text); } catch { /* não-JSON */ }
  if (!res.ok) {
    const msg = json?.message || json?.error?.message || json?.detail || text.slice(0, 200);
    const err = new Error(`${new URL(url).host} respondeu ${res.status}: ${msg}`);
    err.status = res.status;
    throw err;
  }
  return json ?? text;
}

export async function download(url, signal) {
  if (!/^https:\/\//.test(url)) throw new Error('URL de download do provedor não é HTTPS.');
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Falha ao baixar o modelo (${res.status}).`);
  const len = Number(res.headers.get('content-length') || 0);
  if (len > MAX_MODEL_BYTES) throw new Error('Modelo grande demais.');
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length > MAX_MODEL_BYTES) throw new Error('Modelo grande demais.');
  if (buf.subarray(0, 4).toString('latin1') !== 'glTF') throw new Error('O arquivo recebido não é um GLB válido.');
  return buf;
}

async function poll(fn, { onProgress, signal, timeoutMs = 20 * 60_000 }) {
  const start = Date.now();
  let delay = 3000;
  for (;;) {
    const st = await fn();
    onProgress?.(st);
    if (st.done) return st;
    if (Date.now() - start > timeoutMs) throw new Error('O provedor não concluiu dentro do tempo limite.');
    await sleep(delay, signal);
    delay = Math.min(delay * 1.4, 15000);
  }
}

// ───────── Tripo AI ─────────
export const tripo = {
  id: 'tripo',
  name: 'Tripo AI',
  configured: () => Boolean(process.env.TRIPO_API_KEY),
  base: () => process.env.TRIPO_API_BASE || 'https://api.tripo3d.ai/v2/openapi',
  headers: () => ({ Authorization: `Bearer ${process.env.TRIPO_API_KEY}` }),
  capabilities: ['text_to_model', 'image_to_model', 'rigging', 'animation'],
  license: 'Uso e direitos dos modelos seguem o plano contratado na Tripo AI (planos gratuitos podem restringir uso comercial). Confira os termos antes de vender jogos.',

  async createTask(body, signal) {
    const r = await http(`${this.base()}/task`, { method: 'POST', headers: { ...this.headers(), 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal });
    const id = r?.data?.task_id;
    if (!id) throw new Error(`Resposta inesperada da Tripo AI ao criar tarefa: ${JSON.stringify(r).slice(0, 200)}`);
    return id;
  },

  async uploadImage(buffer, mime, signal) {
    const form = new FormData();
    form.append('file', new Blob([buffer], { type: mime }), mime === 'image/png' ? 'ref.png' : 'ref.jpg');
    const r = await http(`${this.base()}/upload`, { method: 'POST', headers: this.headers(), body: form, signal });
    const token = r?.data?.image_token || r?.data?.file_token;
    if (!token) throw new Error('A Tripo AI não retornou o token da imagem enviada.');
    return token;
  },

  async waitTask(id, { onProgress, signal }) {
    const st = await poll(async () => {
      const r = await http(`${this.base()}/task/${encodeURIComponent(id)}`, { headers: this.headers(), signal });
      const d = r?.data || {};
      if (['failed', 'cancelled', 'banned', 'expired', 'unknown'].includes(d.status)) throw new Error(`Tripo AI: tarefa ${d.status}.`);
      return { done: d.status === 'success', progress: d.progress ?? 0, output: d.output || {} };
    }, { onProgress, signal });
    const url = st.output.pbr_model || st.output.model || st.output.base_model;
    if (!url) throw new Error('Tripo AI concluiu sem URL de modelo.');
    return url;
  },

  /** Gera um modelo. Retorna { buffer, externalId }. */
  async generate({ prompt, image, style, faceLimit }, { onProgress, signal }) {
    const body = image
      ? { type: 'image_to_model', file: { type: image.mime === 'image/png' ? 'png' : 'jpg', file_token: await this.uploadImage(image.buffer, image.mime, signal) } }
      : { type: 'text_to_model', prompt: prompt.slice(0, 1000) };
    body.texture = style !== 'lowpoly';
    body.pbr = style === 'realistic';
    if (faceLimit) body.face_limit = faceLimit;
    const id = await this.createTask(body, signal);
    const url = await this.waitTask(id, { onProgress, signal });
    return { buffer: await download(url, signal), externalId: id };
  },

  /** Rigging + animações da própria Tripo (melhor que o rigging heurístico quando disponível). */
  async rigAndAnimate(modelTaskId, animations, { onProgress, signal }) {
    const rigId = await this.createTask({ type: 'animate_rig', original_model_task_id: modelTaskId, out_format: 'glb' }, signal);
    await this.waitTask(rigId, { onProgress, signal });
    const results = {};
    for (const name of animations) {
      const id = await this.createTask({ type: 'animate_retarget', original_model_task_id: rigId, animation: `preset:${name}`, out_format: 'glb' }, signal);
      results[name] = await download(await this.waitTask(id, { onProgress, signal }), signal);
    }
    return results;
  },
};

// ───────── Meshy AI ─────────
export const meshy = {
  id: 'meshy',
  name: 'Meshy AI',
  configured: () => Boolean(process.env.MESHY_API_KEY),
  base: () => process.env.MESHY_API_BASE || 'https://api.meshy.ai/openapi',
  headers: () => ({ Authorization: `Bearer ${process.env.MESHY_API_KEY}`, 'Content-Type': 'application/json' }),
  capabilities: ['text_to_model', 'image_to_model', 'textures'],
  license: 'Uso e direitos dos modelos seguem o plano contratado na Meshy AI (planos gratuitos podem exigir atribuição/limitar uso comercial). Confira os termos antes de vender jogos.',

  async wait(kind, id, { onProgress, signal }) {
    const st = await poll(async () => {
      const r = await http(`${this.base()}/${kind}/${encodeURIComponent(id)}`, { headers: this.headers(), signal });
      if (['FAILED', 'CANCELED', 'EXPIRED'].includes(r?.status)) throw new Error(`Meshy AI: tarefa ${r.status}${r.task_error?.message ? ` — ${r.task_error.message}` : ''}.`);
      return { done: r?.status === 'SUCCEEDED', progress: r?.progress ?? 0, output: r };
    }, { onProgress, signal });
    const url = st.output?.model_urls?.glb;
    if (!url) throw new Error('Meshy AI concluiu sem URL GLB.');
    return url;
  },

  async generate({ prompt, image, style, faceLimit }, { onProgress, signal }) {
    const artStyle = style === 'realistic' ? 'realistic' : 'sculpture';
    if (image) {
      const r = await http(`${this.base()}/v1/image-to-3d`, { method: 'POST', headers: this.headers(), signal,
        body: JSON.stringify({ image_url: `data:${image.mime};base64,${image.buffer.toString('base64')}`, enable_pbr: style === 'realistic', should_remesh: true, target_polycount: faceLimit || undefined }) });
      if (!r?.result) throw new Error('Meshy AI não retornou o ID da tarefa.');
      const url = await this.wait('v1/image-to-3d', r.result, { onProgress, signal });
      return { buffer: await download(url, signal), externalId: r.result };
    }
    const preview = await http(`${this.base()}/v2/text-to-3d`, { method: 'POST', headers: this.headers(), signal,
      body: JSON.stringify({ mode: 'preview', prompt: prompt.slice(0, 600), art_style: artStyle, should_remesh: true, topology: 'triangle', target_polycount: faceLimit || undefined }) });
    if (!preview?.result) throw new Error('Meshy AI não retornou o ID da prévia.');
    await this.wait('v2/text-to-3d', preview.result, { onProgress: (s) => onProgress?.({ ...s, progress: (s.progress || 0) / 2 }), signal });
    const refine = await http(`${this.base()}/v2/text-to-3d`, { method: 'POST', headers: this.headers(), signal,
      body: JSON.stringify({ mode: 'refine', preview_task_id: preview.result, enable_pbr: style === 'realistic' }) });
    if (!refine?.result) throw new Error('Meshy AI não retornou o ID do refinamento.');
    const url = await this.wait('v2/text-to-3d', refine.result, { onProgress: (s) => onProgress?.({ ...s, progress: 50 + (s.progress || 0) / 2 }), signal });
    return { buffer: await download(url, signal), externalId: refine.result };
  },
};

export const PROVIDERS = { tripo, meshy };

export function assertProvider(id) {
  const p = PROVIDERS[id];
  if (!p) throw new HttpError(400, 'Provedor desconhecido.');
  if (!p.configured()) throw new HttpError(503, `${p.name} não está configurado neste servidor.`, 'provider_not_configured');
  return p;
}
