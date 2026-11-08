// Pós-processamento da qualidade ULTRA (para placas de vídeo dedicadas, ex.: RX 580 / GTX 1060 ou melhor):
// cena em alta faixa dinâmica com MSAA 4x -> mesmo tone mapping/correção de cor do jogo -> brilho (bloom) -> nitidez + vinheta.
// O céu (marcado com alfa 0) passa direto, para ficar idêntico às outras qualidades.
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

const vs = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }';
const ToneShader = {
  uniforms: { tDiffuse: { value: null }, toneMappingExposure: { value: 1 } },
  vertexShader: vs,
  fragmentShader: `uniform sampler2D tDiffuse; varying vec2 vUv;
    ${THREE.ShaderChunk.tonemapping_pars_fragment}
    vec3 toSRGB(vec3 c){ c = clamp(c, 0.0, 1.0); return mix(c * 12.92, 1.055 * pow(c, vec3(0.41666)) - 0.055, step(vec3(0.0031308), c)); }
    void main(){
      vec4 s = texture2D(tDiffuse, vUv);
      vec3 lit = toSRGB(CustomToneMapping(s.rgb));
      gl_FragColor = vec4(mix(s.rgb, lit, clamp(s.a, 0.0, 1.0)), 1.0); // alfa 0 = céu (já em cores de tela)
    }`,
};
const FinalShader = {
  uniforms: { tDiffuse: { value: null }, vig: { value: 0.22 }, res: { value: new THREE.Vector2(1, 1) }, sharp: { value: 0.18 } },
  vertexShader: vs,
  fragmentShader: `uniform sampler2D tDiffuse; uniform float vig; uniform vec2 res; uniform float sharp; varying vec2 vUv;
    void main(){
      vec2 px = 1.0 / res;
      vec3 c = texture2D(tDiffuse, vUv).rgb;
      vec3 n = texture2D(tDiffuse, vUv + vec2(px.x, 0.0)).rgb + texture2D(tDiffuse, vUv - vec2(px.x, 0.0)).rgb + texture2D(tDiffuse, vUv + vec2(0.0, px.y)).rgb + texture2D(tDiffuse, vUv - vec2(0.0, px.y)).rgb;
      c = clamp(c + (c * 4.0 - n) * sharp * 0.25, 0.0, 1.0); // nitidez leve
      vec2 d = vUv - 0.5; c *= 1.0 - vig * dot(d, d) * 2.2; // vinheta
      gl_FragColor = vec4(c, 1.0);
    }`,
};

export class UltraPost {
  constructor(renderer, scene, camera) {
    this.renderer = renderer;
    const size = renderer.getDrawingBufferSize(new THREE.Vector2());
    const rt = new THREE.WebGLRenderTarget(size.x, size.y, { samples: 4, type: THREE.HalfFloatType });
    this.composer = new EffectComposer(renderer, rt);
    this.composer.addPass(new RenderPass(scene, camera));
    this.tone = new ShaderPass(ToneShader); this.composer.addPass(this.tone);
    this.bloom = new UnrealBloomPass(new THREE.Vector2(size.x / 2, size.y / 2), 0.3, 0.45, 0.82); this.composer.addPass(this.bloom);
    this.final = new ShaderPass(FinalShader); this.final.renderToScreen = true; this.composer.addPass(this.final);
    this.setSize();
  }
  // o céu escreve alfa 0 para não passar pelo tone mapping de novo
  attachSky(sky) { const m = sky.dome.material; m.blending = THREE.NoBlending; m.fragmentShader = m.fragmentShader.replace('gl_FragColor = vec4(c, 1.0);', 'gl_FragColor = vec4(c, 0.0);'); m.needsUpdate = true; }
  setSize() {
    const s = this.renderer.getDrawingBufferSize(new THREE.Vector2());
    this.composer.setPixelRatio(1); this.composer.setSize(s.x, s.y);
    this.final.uniforms.res.value.set(s.x, s.y);
  }
  // à noite o bloom fica mais forte (postes, faróis, janelas acesas)
  render(night = 0) {
    const r = this.renderer; const tm = r.toneMapping;
    this.tone.uniforms.toneMappingExposure.value = r.toneMappingExposure;
    this.bloom.strength = 0.26 + night * 0.4; this.bloom.threshold = 0.84 - night * 0.14;
    r.toneMapping = THREE.NoToneMapping; // a cena vai para a textura sem tone mapping (feito no passe próprio)
    this.composer.render();
    r.toneMapping = tm;
  }
}
