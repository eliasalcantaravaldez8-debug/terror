// Gera dist/standalone/nexplay.html: o app da NEXPLAY em uma página única (sem servidor), para o link do celular.
import fs from 'node:fs';
const js = fs.readFileSync('dist/standalone/app.js', 'utf8').replace(/<\/script/gi, '<\\/script');
const css = fs.existsSync('dist/standalone/app.css') ? fs.readFileSync('dist/standalone/app.css', 'utf8') : '';
const html = `<title>NEXPLAY</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap">
<style>${css.replace(/<\/style/gi, '<\\/style')}</style>
<div id="root"></div>
<script>
${js}
</script>
`;
fs.writeFileSync('dist/standalone/nexplay.html', html);
console.log(`dist/standalone/nexplay.html (${(html.length / 1e6).toFixed(2)} MB)`);
