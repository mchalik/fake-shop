// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import http from 'node:http';
import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Настройка __dirname для ESM

// @ts-expect-error TODO: разобраться почему ошибка
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DIST_PATH = path.join(__dirname, '../../dist');

// Таблица MIME-типов для правильной отдачи файлов
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const server = http.createServer((clientReq, clientRes) => {
  // === 1. ОБРАБОТКА API ЗАПРОСОВ (PROXY) ===
  if (clientReq.url === '/auth/login' && clientReq.method === 'POST') {

    // CORS заголовки (на случай, если вы обращаетесь с другого порта/домена)
    const origin = clientReq.headers.origin || '*';

    clientRes.setHeader('Access-Control-Allow-Origin', origin);
    clientRes.setHeader('Access-Control-Allow-Credentials', 'true');

    const body = [];

    clientReq
      .on('data', chunk => body.push(chunk))
      .on('end', () => {
        const bodyString = Buffer.concat(body).toString();

        const options = {
          hostname: 'dummyjson.com',
          port: 443,
          path: '/auth/login',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(bodyString)
          }
        };

        const proxyReq = https.request(options, (proxyRes) => {
          clientRes.writeHead(proxyRes.statusCode, proxyRes.headers);
          proxyRes.pipe(clientRes);
        });

        proxyReq.on('error', (e) => {
          console.error(`Proxy error: ${ e.message }`);
          clientRes.writeHead(500);
          clientRes.end('Proxy Error');
        });

        proxyReq.write(bodyString);
        proxyReq.end();
      });

    return;
  }

  // === 2. ОБРАБОТКА OPTIONS (PREFLIGHT) ===
  if (clientReq.method === 'OPTIONS') {
    const origin = clientReq.headers.origin || '*';

    clientRes.setHeader('Access-Control-Allow-Origin', origin);
    clientRes.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    clientRes.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    clientRes.setHeader('Access-Control-Allow-Credentials', 'true');
    clientRes.writeHead(204);
    clientRes.end();

    return;
  }

  // === 3. ОТДАЧА СТАТИКИ (DIST) ===
  // Если запрос не на API, ищем файл

  // Формируем путь к файлу. Если путь просто "/", отдаем index.html
  const filePath = clientReq.url === '/'
    ? path.join(DIST_PATH, 'index.html')
    : path.join(DIST_PATH, clientReq.url);

  // Безопасность: предотвращаем выход за пределы папки dist
  if (!filePath.startsWith(DIST_PATH)) {
    clientRes.writeHead(403);
    clientRes.end('Forbidden');
    return;
  }

  // Определяем расширение и MIME-тип
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  // Читаем и отдаем файл
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Если файл не найден (ENOENT), можно отдать index.html (для SPA)
      // или просто 404
      if (err.code === 'ENOENT') {
        // Вариант для SPA (React/Vue/Angular), если включено:
        // fs.readFile(path.join(DIST_PATH, 'index.html'), (err2, data2) => { ... })

        clientRes.writeHead(404, { 'Content-Type': 'text/plain' });
        clientRes.end('File Not Found');
      } else {
        clientRes.writeHead(500);
        clientRes.end('Server Error');
      }
    } else {
      clientRes.writeHead(200, { 'Content-Type': contentType });
      clientRes.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${ PORT }`);
  console.log(`- Статика из папки: ${ DIST_PATH }`);
  console.log(`- Прокси для логина: http://localhost:${ PORT }/auth/login`);
});