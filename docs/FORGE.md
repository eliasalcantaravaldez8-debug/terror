# NEXPLAY FORGE — linha de produção de assets 2D e 3D

A FORGE coordena ferramentas de geração e produção para que o usuário não precise operar cinco programas diferentes. Ela é usada pelo Studio (aba **FORGE**), pela **IA Diretora de Arte**, pela IA 3D e pelo **AUTOPILOT**.

## Fluxos

**3D (IA):** Tripo AI ou Meshy AI → inspeção → reparo (duplicatas, solda, normais, primitivas vazias) → escala real por categoria e origem no centro da base → **Blender** (limpeza, normais, materiais, orçamento de polígonos, low poly/sombreamento) → **rigging automático + animações** para personagens (Tripo rig/retarget quando disponível; senão Blender) → texturas no tamanho do estilo → **LODs** (meshoptimizer) → colisão → NEXPLAY CLOUD → integração no projeto → **teste no motor do jogo** com correções automáticas.

**Voxel:** especificação (IA ou editor) ou `.vox` do MagicaVoxel → malha otimizada (greedy meshing, cores por vértice) → mesmo processamento → `.vox` disponível para editar no MagicaVoxel e reimportar.

**Importação:** `.glb` de qualquer ferramenta (Blender, Sketchfab, Tripo, Meshy) entra no mesmo fluxo de aprimoramento.

**2D:** editor de pixel art do Studio, especificação desenhada pela IA (`create_pixel_sprite`), imagens/folhas de sprites (`.png/.jpg/.webp`) ou arquivos do **Krita** (`.kra`) e OpenRaster (`.ora`) → folha de sprites com animações (idle/walk/jump) → integração no jogo 2D com filtragem "nearest" para pixel art → teste no motor 2D.

## Estilo visual (identidade consistente)

Cada projeto tem um estilo: `realistic`, `stylized`, `lowpoly`, `voxel`, `pixel` ou `illustrated`. Ele define ferramenta preferida, orçamento de polígonos, tamanho de textura, níveis de LOD e sombreamento. O pedido do usuário é classificado automaticamente (ex.: "estilo Minecraft" → voxel; "corrida realista" → realista) e a IA Diretora de Arte fixa o estilo com `set_art_style`. A validação do projeto avisa quando um asset quebra a identidade visual (ex.: modelo realista em jogo voxel).

| Estilo | Ferramentas preferidas | Triângulos (LOD0) | Textura máx. | LODs |
|---|---|---|---|---|
| Realista | Tripo (PBR) → Meshy | 60.000 | 2048 | 100% / 45% / 15% |
| Estilizado | Meshy → Tripo | 25.000 | 1024 | 100% / 50% / 20% |
| Low poly | Tripo/Meshy + dissolução planar no Blender | 3.000 | 512 | 100% / 60% |
| Voxel | gerador voxel / MagicaVoxel | 20.000 | — | único |
| Pixel art | editor de pixels / IA | — | 512 | — |
| 2D desenhado | Krita / imagens | — | 2048 | — |

## Motor

- Modelos com LOD (`THREE.LOD`), colisão da FORGE, animações do arquivo e **carregamento por distância** (modelos distantes só carregam quando o jogador se aproxima).
- Personagens e NPCs podem usar um modelo GLB (`props.model`); os clipes idle/walk/run/jump são acionados pelos mesmos controles e IA dos personagens procedurais.
- Estilos low poly e voxel aplicam sombreamento facetado em toda a cena.
- Menu **Gráficos** no jogo (Baixa/Média/Alta/Ultra, salvo por jogador) e aviso automático quando o FPS cai.
- **Teste no jogo:** o Studio abre o player isolado em modo de teste, carrega o projeto real, enquadra o asset e mede carregamento, triângulos, draw calls, FPS e se está apoiado no chão; o servidor corrige altura e antecipa LODs quando necessário.

## Configuração

| Variável | Para quê |
|---|---|
| `TRIPO_API_KEY` (`TRIPO_API_BASE`) | Geração 3D, imagem→3D, rigging e animações na Tripo AI. |
| `MESHY_API_KEY` (`MESHY_API_BASE`) | Geração 3D estilizada/realista e imagem→3D na Meshy AI. |
| `BLENDER_PATH` ou `NEXPLAY_BPY_PYTHON` | Blender headless (binário, ou Python com `pip install bpy`). |
| `FORGE_PARALLEL` | Jobs simultâneos por instância (padrão 2). |

Cotas diárias de gerações em provedores pagos por plano (FREE 3, PRO 12, DELUXE 60) ficam em `settings.pipeline_limits`. Operações locais (voxel, sprites, Blender, importação) não consomem essa cota.

## Licenças e custos

- **Tripo AI / Meshy AI:** cada geração consome créditos da conta configurada. Os direitos de uso dos modelos dependem do plano contratado (planos gratuitos podem exigir atribuição ou restringir uso comercial). Cada asset guarda sua origem e a nota de licença.
- **Blender:** GPL; o que você produz é seu.
- **MagicaVoxel:** gratuito; é um aplicativo de desktop sem API — a NEXPLAY lê e escreve o formato `.vox`.
- **Krita:** GPL; aplicativo de desktop — a NEXPLAY importa `.kra`/`.ora`.

## Limitações honestas

- Os adaptadores de Tripo e Meshy seguem a documentação pública conhecida, mas **não foram testados contra as APIs reais** neste ambiente (sem chaves e sem acesso de rede aos domínios). Qualquer resposta inesperada vira erro explícito no job; teste com uma chave antes de abrir para usuários.
- O rigging pelo Blender é heurístico (humanoides em T-pose ou A-pose); criaturas e poses incomuns podem precisar de ajuste manual. Quando a Tripo está configurada, o rigging dela é tentado primeiro.
- Não há geração de ilustrações 2D por IA de imagem: a arte 2D vem do editor de pixels, da IA desenhando pixel a pixel ou de arquivos enviados (Krita/imagens).
- Realismo fotográfico depende dos geradores externos e de bons prompts; sem eles, a FORGE oferece voxel, estruturas procedurais e importação.
