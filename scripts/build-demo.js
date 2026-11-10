// Gera dist/demo/nexplay-arcade.html: página única e autocontida com o motor de jogo (sem servidor).
import fs from 'node:fs';
const js = fs.readFileSync('dist/demo/demo.js', 'utf8').replace(/<\/script/gi, '<\\/script');
const shell = fs.readFileSync('client/demo/shell.html', 'utf8');
fs.writeFileSync('dist/demo/nexplay-arcade.html', `${shell}\n<script>\n${js}\n</script>\n`);
console.log('dist/demo/nexplay-arcade.html');
