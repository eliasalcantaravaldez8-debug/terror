// Player isolado (runtime do NEXPLAY STUDIO) servido SOMENTE pela origem sandbox.
import { defineConfig } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: path.join(here, 'runtime'),
  base: '/runtime/',
  server: { fs: { allow: [path.resolve(here, '..')] } },
  build: {
    outDir: path.resolve(here, '../dist/runtime'),
    emptyOutDir: true,
    chunkSizeWarningLimit: 1600,
    rollupOptions: { input: { player: path.join(here, 'runtime/player.html') } },
  },
});
