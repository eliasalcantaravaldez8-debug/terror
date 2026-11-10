// App principal da NEXPLAY (React). Em desenvolvimento, encaminha /api, /media e /ws para o servidor.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const api = `http://localhost:${process.env.PORT || 3000}`;

export default defineConfig({
  root: here,
  plugins: [react()],
  server: {
    port: 5173,
    fs: { allow: [path.resolve(here, '..')] },
    proxy: { '/api': api, '/media': api, '/ws': { target: api.replace('http', 'ws'), ws: true } },
  },
  build: { outDir: path.resolve(here, '../dist/app'), emptyOutDir: true, chunkSizeWarningLimit: 1600 },
});
