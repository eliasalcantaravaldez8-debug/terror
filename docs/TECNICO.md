# OPERATION: IRON SHADOW — Decisões técnicas e limitações

## 1. Levantamento do ambiente de desenvolvimento

| Item | Situação no ambiente atual |
|---|---|
| Sistema | Linux (contêiner na nuvem), 4 CPUs, 15 GB RAM |
| GPU | **Nenhuma** (sem driver/placa de vídeo) |
| Unreal Engine 5 | **Não instalado e não instalável aqui** (exige conta Epic, ~100 GB, compilação de dias e GPU para rodar/testar) |
| Godot / Unity | Não instalados; download de binários externos bloqueado pela política do ambiente |
| Node.js 22 + npm | Disponível |
| Chromium + Playwright | Disponível (WebGL por software — SwiftShader) |

## 2. Escolha do motor

A preferência era **Unreal Engine 5**. Como o ambiente não suporta UE5 (nem
instalar, nem executar, nem testar), a alternativa escolhida foi:

**Three.js (WebGL 2) + Vite, JavaScript modular (ES modules)**

Motivos:
- É 3D real: geometria, câmera em perspectiva, colisão, física, iluminação PBR,
  sombras dinâmicas — nada de imagens de fundo fingindo profundidade.
- Pode ser **testado de verdade neste ambiente** (Chromium headless executa o
  jogo, avança a simulação e tira capturas de tela automaticamente).
- Roda em qualquer PC com navegador e pode ser empacotado como executável de
  desktop (Electron/Tauri/NW.js) para distribuição comercial (Steam etc.).
- A arquitetura (sistemas separados, dados de missão desacoplados) facilita uma
  eventual migração para UE5: o roteiro da missão, os dados de armas, o layout
  do distrito e a lógica de IA são portáveis conceitualmente.

### Se você quiser migrar para Unreal Engine 5
Seria necessário, na sua máquina: Windows 10/11 64-bit, GPU com DX12 (RTX 2070+
recomendado), 32 GB RAM, ~150 GB livres, Epic Games Launcher + UE 5.4+, Visual
Studio 2022 com C++. Eu posso preparar o projeto UE5 (C++/Blueprints) a partir
deste protótipo, mas não posso compilá-lo nem testá-lo dentro deste ambiente.

## 3. Limitações honestas da versão atual

- **Arte provisória procedural.** Todos os modelos (soldados, helicóptero,
  carros, prédios), texturas e sons são gerados por código. São funcionais e
  coerentes, mas **não têm qualidade AAA**. O código foi estruturado para trocar
  cada recurso por arquivos profissionais (glTF, texturas PBR, áudio gravado)
  sem reescrever a jogabilidade. Ver `docs/RECURSOS.md`.
- **Animação procedural** (IK de braços/pernas, ciclo de passo, queda) em vez de
  captura de movimento. Funciona, mas é menos natural que mocap.
- **Vozes** usam a síntese de voz do navegador (provisório, pode ser desligado
  em Configurações). Legendas estão sempre disponíveis.
- **Gráficos:** WebGL não tem Lumen/Nanite. Usamos PBR, sombras suaves,
  céu físico, neblina, mapa de ambiente, bloom e gradação de cor.
- **Teste de desempenho:** sem GPU aqui, só validamos que roda (por software).
  Os presets Baixa/Média/Alta precisam ser calibrados em PCs reais.

## 4. Estrutura do projeto

```
src/
  core/        Game (loop, estados), Input, Settings, SaveSystem, EventBus
  render/      RenderPipeline (renderer, pós-processamento, céu, qualidade),
               TextureFactory (texturas PBR procedurais), Materials
  physics/     CollisionWorld (caixas + hash espacial, raycast, cilindro)
  world/       districtLayout (dados do mapa), CityBuilder, PropModels,
               Helicopter (modelo + controlador de voo), GeometryBatcher
  characters/  SoldierModel (modelo + animação procedural), IK
  weapons/     WeaponData (armas fictícias, munição), WeaponModels
  player/      Player (movimento/câmera/vida), WeaponController (viewmodel,
               tiro, ADS, recarga, granada), Combat (dano, granadas, explosões)
  ai/          Soldier, Brains (IA inimiga/aliada, tokens de ataque),
               CoverSystem, NavGrid (A*), Squad
  fx/          ParticleSystem (instanciado), Effects (impactos, rastros,
               explosões, fogo, fumaça, chuva, cápsulas)
  audio/       AudioEngine (síntese procedural, áudio 3D, música adaptativa)
  ui/          HUD, Menus, Dialogue (legendas/vozes)
  missions/    Mission01 (roteiro, ondas, checkpoints)
tests/
  unit/        testes de colisão, navegação, armas, saves (node --test)
  e2e/         jogatina automatizada no Chromium com capturas de tela
```

## 5. Como executar

```bash
npm install
npm run dev        # abre em http://localhost:5173
npm run build      # gera dist/ (site estático)
npm test           # testes unitários
npm run test:e2e   # jogatina automatizada + capturas em test-output/
```
