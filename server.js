const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };
const server = http.createServer((req, res) => {
  const requested = decodeURIComponent(req.url.split('?')[0]);
  const relativePath = requested === '/manus-routes.json' ? '/public/manus-routes.json' : (requested === '/' ? '/index.html' : requested);
  const filePath = path.join(root, relativePath);
  if (!filePath.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(filePath, (error, file) => {
    if (error) { res.writeHead(404, {'Content-Type': 'text/plain'}); return res.end('Not found'); }
    res.writeHead(200, {'Content-Type': mime[path.extname(filePath)] || 'application/octet-stream', 'Cache-Control': 'no-cache'});
    res.end(file);
  });
});
const port = Number(process.env.PORT || 3000);
server.listen(port, '0.0.0.0', () => console.log(`Ondine listening on http://0.0.0.0:${port}`));
