// ==================================================================
// BMG Crew Builder — сервер (Node.js >= 22.5, БЕЗ npm-зависимостей)
//
// Запуск:            node server.js          (порт из env PORT, по умолчанию 8080)
// Что делает:
//   1. Раздаёт статику проекта (index.html, data.js, img/ и т.д.)
//   2. API: регистрация/вход, сохранения отрядов (макс. 5 на пользователя),
//      игровые комнаты для обмена ростерами по короткому коду
// Хранилище:         data/bmg.db (SQLite, встроенный node:sqlite) — один
//                    компактный файл, ростеры хранятся в сжатом JSON-формате
// Пароли:            scrypt-хэш с индивидуальной солью, в открытом виде не хранятся
// ==================================================================

'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { DatabaseSync } = require('node:sqlite');

const PORT = parseInt(process.env.PORT, 10) || 8080;
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, 'data');

const MAX_SAVES = 5;                            // лимит сохранений на пользователя
const MAX_BODY = 32 * 1024;                     // лимит тела запроса
const MAX_SAVES_JSON = 20 * 1024;               // лимит суммарного размера сохранений
const GAME_TTL_MS = 24 * 3600 * 1000;           // игры живут сутки
const SESSION_TTL_MS = 30 * 24 * 3600 * 1000;   // сессии — 30 дней

// ======================== БАЗА ДАННЫХ ========================
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
const db = new DatabaseSync(path.join(DATA_DIR, 'bmg.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    name    TEXT PRIMARY KEY,
    salt    TEXT NOT NULL,
    hash    TEXT NOT NULL,
    created INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS saves (
    user TEXT PRIMARY KEY,
    data TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS sessions (
    token   TEXT PRIMARY KEY,
    user    TEXT NOT NULL,
    created INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS games (
    code         TEXT PRIMARY KEY,
    created      INTEGER NOT NULL,
    host_user    TEXT NOT NULL,
    host_roster  TEXT NOT NULL,
    guest_user   TEXT,
    guest_roster TEXT,
    conditions   TEXT
  );
`);

// Миграция для баз, созданных до появления условий игры (Event/Encounter)
try { db.exec('ALTER TABLE games ADD COLUMN conditions TEXT'); } catch (e) { /* колонка уже есть */ }

// Периодическая чистка протухших сессий и игр — база не разрастается
function cleanup() {
  const now = Date.now();
  db.prepare('DELETE FROM sessions WHERE created < ?').run(now - SESSION_TTL_MS);
  db.prepare('DELETE FROM games WHERE created < ?').run(now - GAME_TTL_MS);
}
cleanup();
setInterval(cleanup, 3600 * 1000).unref();

// ======================== ХЕЛПЕРЫ ========================
function hashPassword(salt, password) {
  return crypto.scryptSync(password, salt, 32).toString('hex');
}

function send(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', c => {
      size += c.length;
      if (size > MAX_BODY) { reject(new Error('too_large')); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => {
      try { resolve(chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {}); }
      catch (e) { reject(new Error('bad_json')); }
    });
    req.on('error', reject);
  });
}

// Пользователь по токену из Authorization: Bearer <token>
function authUser(req) {
  const m = /^Bearer\s+(.+)$/.exec(req.headers.authorization || '');
  if (!m) return null;
  const row = db.prepare('SELECT user, created FROM sessions WHERE token = ?').get(m[1]);
  if (!row || row.created < Date.now() - SESSION_TTL_MS) return null;
  return row.user;
}

function createSession(user) {
  const token = crypto.randomBytes(24).toString('base64url');
  db.prepare('INSERT INTO sessions (token, user, created) VALUES (?, ?, ?)').run(token, user, Date.now());
  return token;
}

const validName = n => typeof n === 'string' && /^[\w\-. А-Яа-яЁё]{3,20}$/.test(n);
const validPass = p => typeof p === 'string' && p.length >= 4 && p.length <= 64;

// Валидация ростера/сохранения (компактный формат из auth.js)
function validSave(s) {
  return s && typeof s === 'object'
    && typeof s.n === 'string' && s.n.length <= 60
    && typeof s.f === 'string' && s.f.length <= 40
    && Array.isArray(s.m) && s.m.length >= 1 && s.m.length <= 40
    && s.m.every(e => Array.isArray(e) && typeof e[0] === 'string' && e[0].length <= 80);
}
function validSavesArray(arr) {
  return Array.isArray(arr) && arr.length <= MAX_SAVES
    && JSON.stringify(arr).length <= MAX_SAVES_JSON
    && arr.every(validSave);
}

// Код игры: 6 символов без визуально похожих (0/O, 1/I/L)
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
function newGameCode() {
  for (let attempt = 0; attempt < 20; attempt++) {
    let code = '';
    const bytes = crypto.randomBytes(6);
    for (let i = 0; i < 6; i++) code += CODE_ALPHABET[bytes[i] % CODE_ALPHABET.length];
    if (!db.prepare('SELECT code FROM games WHERE code = ?').get(code)) return code;
  }
  return null;
}

function gameToJSON(g) {
  return {
    code: g.code,
    conditions: g.conditions ? JSON.parse(g.conditions) : null,
    host: { name: g.host_user, roster: JSON.parse(g.host_roster) },
    guest: g.guest_user ? { name: g.guest_user, roster: JSON.parse(g.guest_roster) } : null
  };
}

// Условия игры: { ev: "имя Event-карты", en: "имя Encounter-карты" }
function validConditions(c) {
  if (c == null) return true;
  return typeof c === 'object' && !Array.isArray(c)
    && Object.keys(c).every(k => ['ev', 'en'].includes(k))
    && ['ev', 'en'].every(k => c[k] == null || (typeof c[k] === 'string' && c[k].length <= 60));
}

// ======================== API ========================
async function handleApi(req, res, url) {
  const p = url.pathname;

  // --- Аутентификация ---
  if (p === '/api/register' && req.method === 'POST') {
    const { name, pass } = await readBody(req);
    if (!validName(name) || !validPass(pass)) return send(res, 400, { error: 'input' });
    if (db.prepare('SELECT name FROM users WHERE name = ?').get(name)) return send(res, 409, { error: 'exists' });
    const salt = crypto.randomBytes(8).toString('hex');
    db.prepare('INSERT INTO users (name, salt, hash, created) VALUES (?, ?, ?, ?)')
      .run(name, salt, hashPassword(salt, pass), Date.now());
    return send(res, 200, { token: createSession(name), name });
  }

  if (p === '/api/login' && req.method === 'POST') {
    const { name, pass } = await readBody(req);
    const row = validName(name) && validPass(pass)
      ? db.prepare('SELECT salt, hash FROM users WHERE name = ?').get(name) : null;
    if (!row) return send(res, 401, { error: 'badcred' });
    // timingSafeEqual — сравнение хэшей без утечки по времени ответа
    const given = Buffer.from(hashPassword(row.salt, pass), 'hex');
    const stored = Buffer.from(row.hash, 'hex');
    if (given.length !== stored.length || !crypto.timingSafeEqual(given, stored)) {
      return send(res, 401, { error: 'badcred' });
    }
    return send(res, 200, { token: createSession(name), name });
  }

  if (p === '/api/logout' && req.method === 'POST') {
    const m = /^Bearer\s+(.+)$/.exec(req.headers.authorization || '');
    if (m) db.prepare('DELETE FROM sessions WHERE token = ?').run(m[1]);
    return send(res, 200, { ok: true });
  }

  // --- Всё ниже требует входа ---
  const user = authUser(req);

  if (p === '/api/me' && req.method === 'GET') {
    return user ? send(res, 200, { name: user }) : send(res, 401, { error: 'auth' });
  }

  if (!user) return send(res, 401, { error: 'auth' });

  // --- Сохранения отрядов ---
  if (p === '/api/saves' && req.method === 'GET') {
    const row = db.prepare('SELECT data FROM saves WHERE user = ?').get(user);
    return send(res, 200, { saves: row ? JSON.parse(row.data) : [] });
  }

  if (p === '/api/saves' && req.method === 'PUT') {
    const { saves } = await readBody(req);
    if (!Array.isArray(saves)) return send(res, 400, { error: 'input' });
    if (saves.length > MAX_SAVES) return send(res, 400, { error: 'limit' });
    if (saves.length && !validSavesArray(saves)) return send(res, 400, { error: 'input' });
    db.prepare('INSERT INTO saves (user, data) VALUES (?, ?) ON CONFLICT(user) DO UPDATE SET data = excluded.data')
      .run(user, JSON.stringify(saves));
    return send(res, 200, { ok: true });
  }

  // --- Игровые комнаты ---
  if (p === '/api/games' && req.method === 'POST') {
    const { roster, conditions } = await readBody(req);
    if (!validSave(roster) || !validConditions(conditions)) return send(res, 400, { error: 'input' });
    const code = newGameCode();
    if (!code) return send(res, 500, { error: 'server' });
    db.prepare('INSERT INTO games (code, created, host_user, host_roster, conditions) VALUES (?, ?, ?, ?, ?)')
      .run(code, Date.now(), user, JSON.stringify(roster), conditions ? JSON.stringify(conditions) : null);
    return send(res, 200, { code });
  }

  if (p === '/api/games/join' && req.method === 'POST') {
    const { code, roster } = await readBody(req);
    if (typeof code !== 'string' || !validSave(roster)) return send(res, 400, { error: 'input' });
    const g = db.prepare('SELECT * FROM games WHERE code = ?').get(code.toUpperCase().trim());
    if (!g || g.created < Date.now() - GAME_TTL_MS) return send(res, 404, { error: 'notfound' });
    if (g.host_user === user) return send(res, 400, { error: 'own_game' });
    if (g.guest_user && g.guest_user !== user) return send(res, 409, { error: 'full' });
    db.prepare('UPDATE games SET guest_user = ?, guest_roster = ? WHERE code = ?')
      .run(user, JSON.stringify(roster), g.code);
    return send(res, 200, gameToJSON(db.prepare('SELECT * FROM games WHERE code = ?').get(g.code)));
  }

  const gameMatch = /^\/api\/games\/([A-Z0-9]{6})$/i.exec(p);
  if (gameMatch && req.method === 'GET') {
    const g = db.prepare('SELECT * FROM games WHERE code = ?').get(gameMatch[1].toUpperCase());
    if (!g || g.created < Date.now() - GAME_TTL_MS) return send(res, 404, { error: 'notfound' });
    // Ростеры видят только участники
    if (g.host_user !== user && g.guest_user !== user) return send(res, 403, { error: 'auth' });
    return send(res, 200, gameToJSON(g));
  }

  return send(res, 404, { error: 'notfound' });
}

// ======================== СТАТИКА ========================
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.md': 'text/markdown; charset=utf-8'
};

// Что не отдаём наружу никогда
const DENY = [/^\/data(\/|$)/i, /^\/server\.js$/i, /^\/\.git(\/|$)/i, /\.db(-|$)/i];

function serveStatic(req, res, url) {
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === '/') pathname = '/index.html';

  if (DENY.some(rx => rx.test(pathname))) { res.writeHead(404); return res.end('Not found'); }

  const filePath = path.normalize(path.join(ROOT, pathname));
  if (!filePath.startsWith(ROOT + path.sep) && filePath !== ROOT) { res.writeHead(403); return res.end('Forbidden'); }

  fs.stat(filePath, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404); return res.end('Not found'); }

    // 304 по If-Modified-Since — браузер не качает неизменившиеся файлы
    const ims = req.headers['if-modified-since'];
    const mtime = new Date(st.mtimeMs);
    mtime.setMilliseconds(0);
    if (ims && new Date(ims) >= mtime) { res.writeHead(304); return res.end(); }

    const ext = path.extname(filePath).toLowerCase();
    const isImage = MIME[ext] && MIME[ext].startsWith('image/');
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Content-Length': st.size,
      'Last-Modified': mtime.toUTCString(),
      // картинки меняются редко — кэшируем на неделю; код/данные всегда перепроверяются
      'Cache-Control': isImage ? 'public, max-age=604800' : 'no-cache'
    });
    fs.createReadStream(filePath).pipe(res);
  });
}

// ======================== СЕРВЕР ========================
const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname.startsWith('/api/')) {
      await handleApi(req, res, url);
    } else if (req.method === 'GET' || req.method === 'HEAD') {
      serveStatic(req, res, url);
    } else {
      res.writeHead(405);
      res.end();
    }
  } catch (e) {
    const code = e.message === 'too_large' ? 413 : e.message === 'bad_json' ? 400 : 500;
    try { send(res, code, { error: 'server' }); } catch (_) { /* соединение уже закрыто */ }
  }
});

server.listen(PORT, () => {
  console.log(`BMG Crew Builder: http://localhost:${PORT}`);
  console.log(`База данных: ${path.join(DATA_DIR, 'bmg.db')}`);
});
