// DUBLAGEM: toca a voz gravada (arquivo de áudio real) de cada fala, se existir em dist/voz/.
// Não existe voz sintetizada: sem arquivo, a fala continua só com legenda, como antes.
// - lista de arquivos disponíveis: dist/voz/disponiveis.js (gerado por `node build.mjs`)
// - volume próprio (Opções > Volume das vozes)
// - filtro de telefone/rádio para ligações
// - sincronia labial: a boca do personagem abre conforme o volume real do áudio (via AnalyserNode)
import { lineId, voicable, PHONE_VOICES } from './voiceid.mjs';

export class Voice {
  constructor(G) {
    this.G = G; this.cur = null; this.missing = new Set();
    this.avail = (typeof window !== 'undefined' && window.VOZ_DISPONIVEL) || null; // { id: 'ogg' }
    this.webaudio = typeof location === 'undefined' || location.protocol !== 'file:'; // file:// bloqueia análise do áudio
  }
  get count() { return this.avail ? Object.keys(this.avail).length : 0; }
  has(text) { const id = lineId(text); return this.avail ? !!this.avail[id] : !this.missing.has(id); }
  // começa a tocar a fala; devolve { ended, stop(), dur } ou null se não houver gravação
  play(name, text, speaker, opts = {}) {
    this.stop();
    if (!voicable(name, text)) return null;
    const id = lineId(text);
    let ext = this.avail ? this.avail[id] : 'ogg';
    if (!ext || this.missing.has(id)) return null;
    const G = this.G, vol = G.settings.voiceVol ?? 1;
    const el = new Audio(); el.preload = 'auto';
    const h = { id, el, ended: false, failed: false, speaker, level: 0, dur: 0, t: 0, phone: opts.phone ?? PHONE_VOICES.has(name), stop: () => { try { el.pause(); } catch (e) { /* */ } h.ended = true; } };
    const tryNext = () => { // sem lista: tenta outras extensões antes de desistir
      const order = ['ogg', 'mp3', 'wav', 'm4a']; const i = order.indexOf(ext);
      if (!this.avail && i >= 0 && i < order.length - 1) { ext = order[i + 1]; el.src = `voz/${id}.${ext}`; el.play().catch(() => {}); return; }
      this.missing.add(id); h.failed = true; h.ended = true;
    };
    el.onerror = tryNext; el.onended = () => { h.ended = true; };
    el.onloadedmetadata = () => { h.dur = el.duration || 0; };
    el.src = `voz/${id}.${ext}`;
    // cadeia WebAudio: (filtro de telefone) -> volume -> analisador -> saída
    const ctx = G.audio && G.audio.ctx;
    if (ctx && this.webaudio) {
      try {
        el.crossOrigin = 'anonymous';
        const src = ctx.createMediaElementSource(el); let node = src;
        if (h.phone) { const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 320; const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 3200; const sh = ctx.createWaveShaper(); const c = new Float32Array(256); for (let i = 0; i < 256; i++) { const x = i / 128 - 1; c[i] = Math.tanh(x * 2.2) / Math.tanh(2.2); } sh.curve = c; node.connect(hp); hp.connect(lp); lp.connect(sh); node = sh; }
        const g = ctx.createGain(); g.gain.value = vol; node.connect(g); const an = ctx.createAnalyser(); an.fftSize = 512; g.connect(an); an.connect(ctx.destination);
        h.gain = g; h.an = an; h.buf = new Uint8Array(an.fftSize);
      } catch (e) { h.an = null; el.volume = Math.min(1, vol); }
    } else el.volume = Math.min(1, vol);
    el.play().catch(() => { /* aguardando o erro de carregamento ou interação do usuário */ });
    this.cur = h; return h;
  }
  stop() { if (this.cur) { this.cur.stop(); this.mouth(this.cur.speaker, 0); this.cur = null; } }
  setVolume(v) { if (this.cur) { if (this.cur.gain) this.cur.gain.gain.value = v; else this.cur.el.volume = Math.min(1, v); } }
  mouth(sp, k) { const m = sp && sp.model; if (m && m.setMouth) m.setMouth(k); }
  // a cada quadro: mede o volume real e move a boca de quem está falando
  update(dt) {
    const h = this.cur; if (!h) return;
    if (h.ended) { this.mouth(h.speaker, 0); this.cur = null; return; }
    h.t += dt; let lv = 0;
    if (h.an) { h.an.getByteTimeDomainData(h.buf); let s = 0; for (let i = 0; i < h.buf.length; i++) { const v = (h.buf[i] - 128) / 128; s += v * v; } lv = Math.min(1, Math.sqrt(s / h.buf.length) * 5.5); }
    else if (!h.el.paused) lv = 0.35 + 0.35 * Math.abs(Math.sin(h.t * 11)) * Math.abs(Math.sin(h.t * 3.7)); // file://: sem acesso ao sinal, movimento aproximado enquanto toca
    h.level += (lv - h.level) * Math.min(1, dt * 18);
    this.mouth(h.speaker, h.level);
  }
}
