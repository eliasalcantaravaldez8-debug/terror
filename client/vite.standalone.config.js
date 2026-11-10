// Build "sem servidor" da NEXPLAY (link para celular): o mesmo app React com a API local
// (client/standalone/localApi.js) e a NEXPLAY AI pelo Claude da página. Gera um único IIFE + CSS.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const SA = path.join(here, 'standalone');
const REAL_API = path.join(here, 'src', 'api.js');
const swaps = {
  [path.resolve(here, '../server/ai/project.js')]: path.join(SA, 'project-browser.js'),
  [path.resolve(here, '../server/pipeline/voxel.js')]: path.join(SA, 'voxel-stub.js'),
};

const localApi = {
  name: 'nexplay-standalone-swaps',
  enforce: 'pre',
  async resolveId(source, importer, opts) {
    if (!importer) return null;
    const r = await this.resolve(source, importer, { ...opts, skipSelf: true });
    if (!r) return null;
    if (r.id === REAL_API && !importer.startsWith(SA)) return path.join(SA, 'api-standalone.js');
    if (swaps[r.id]) return swaps[r.id];
    return null;
  },
};

export default defineConfig({
  root: here,
  plugins: [localApi, react()],
  define: { 'import.meta.env.VITE_STANDALONE': JSON.stringify('1'), 'process.env.NODE_ENV': JSON.stringify('production') },
  build: {
    outDir: path.resolve(here, '../dist/standalone'), emptyOutDir: true, cssCodeSplit: false, minify: true,
    lib: { entry: path.join(SA, 'main.jsx'), formats: ['iife'], name: 'NexplayStandalone', fileName: () => 'app.js' },
    rollupOptions: { output: { inlineDynamicImports: true, assetFileNames: 'app[extname]' } },
  },
});
