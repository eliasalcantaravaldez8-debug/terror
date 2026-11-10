// Pacote único (IIFE) da demonstração jogável, para embutir numa página sem servidor.
import { defineConfig } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  build: {
    outDir: path.resolve(here, '../dist/demo'), emptyOutDir: true,
    lib: { entry: path.join(here, 'demo/demo.js'), formats: ['iife'], name: 'NexplayDemo', fileName: () => 'demo.js' },
    minify: true,
  },
});
