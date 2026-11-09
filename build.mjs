// Gera dist/game.js (um único arquivo, funciona abrindo dist/index.html direto, sem servidor)
import * as esbuild from 'esbuild';
import { copyFileSync, mkdirSync } from 'node:fs';
mkdirSync('dist', { recursive: true });
copyFileSync('src/index.html', 'dist/index.html');
const opts = { entryPoints: ['src/main.js'], bundle: true, format: 'iife', outfile: 'dist/game.js', minify: true, target: ['es2019'], legalComments: 'eof', logLevel: 'info' };
if (process.argv.includes('--watch')) { const ctx = await esbuild.context(opts); await ctx.watch(); }
else await esbuild.build(opts);
// roteiro de dublagem + lista de áudios de voz presentes em dist/voz/
await import('./tools/vozes.mjs');
