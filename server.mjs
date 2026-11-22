import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4190);
const allowed = new Set(['index.html', 'styles.css', 'resume.css', 'identities.css', 'app.js', 'content.js', 'i18n.js', 'favicon.svg', 'assets/logos/corning.svg', 'assets/logos/innolux.png', 'assets/logos/soueast.png', 'assets/logos/zenghsing.png', 'assets/logos/pitt.png', 'assets/logos/nsysu.jpg', 'assets/logos/pknu.png', 'assets/logos/ncnu.png']);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg' };
const server = http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const relative = pathname.replace(/^\/PersonalResume(?=\/|$)/, '').replace(/^\//, '') || 'index.html';
    if (!allowed.has(relative)) { response.writeHead(404).end('Not found'); return; }
    const body = await readFile(path.join(root, relative));
    response.writeHead(200, { 'Content-Type': types[path.extname(relative)], 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    response.end(body);
  } catch { response.writeHead(400).end('Bad request'); }
});
server.listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}/PersonalResume/`));
