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
const DATA_DIR = process.env.BMG_DATA_DIR || path.join(ROOT, 'data');

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
  CREATE TABLE IF NOT EXISTS counters (
    name  TEXT PRIMARY KEY,
    value INTEGER NOT NULL
  );
`);

// Миграция для баз, созданных до появления условий игры (Event/Encounter)
try { db.exec('ALTER TABLE games ADD COLUMN conditions TEXT'); } catch (e) { /* колонка уже есть */ }
// Миграция: страна пользователя (ISO 3166-1 alpha-2) — для раздела статистики
try { db.exec('ALTER TABLE users ADD COLUMN country TEXT'); } catch (e) { /* колонка уже есть */ }

// Постоянные счётчики (игры живут в базе сутки, а статистике нужен итог за всё время)
function bumpCounter(name) {
  db.prepare('INSERT INTO counters (name, value) VALUES (?, 1) ON CONFLICT(name) DO UPDATE SET value = value + 1').run(name);
}
function getCounter(name) {
  const row = db.prepare('SELECT value FROM counters WHERE name = ?').get(name);
  return row ? row.value : 0;
}

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

// Имя как его ввёл пользователь → каноничный вид для проверок:
// без пробелов по краям (визуально неотличимы) — храним и показываем как есть
const normName = n => typeof n === 'string' ? n.trim() : n;

// Занято ли имя БЕЗ учёта регистра: "TestUser"/"testuser"/"ТестЮзер"/"тестюзер" —
// один пользователь. Сравнение в JS, т.к. SQLite NOCASE/lower() не сворачивают
// регистр не-ASCII символов (кириллицы); таблица пользователей небольшая
function userNameTaken(name) {
  const lc = name.toLowerCase();
  return db.prepare('SELECT name FROM users').all().some(r => r.name.toLowerCase() === lc);
}
// Страна профиля: ISO 3166-1 alpha-2 либо null (не указана)
const validCountry = c => c == null || (typeof c === 'string' && /^[A-Z]{2}$/.test(c));

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
    const body = await readBody(req);
    const name = normName(body.name), pass = body.pass;
    if (!validName(name) || !validPass(pass)) return send(res, 400, { error: 'input' });
    if (userNameTaken(name)) return send(res, 409, { error: 'exists' });
    const salt = crypto.randomBytes(8).toString('hex');
    db.prepare('INSERT INTO users (name, salt, hash, created) VALUES (?, ?, ?, ?)')
      .run(name, salt, hashPassword(salt, pass), Date.now());
    return send(res, 200, { token: createSession(name), name, country: null });
  }

  if (p === '/api/login' && req.method === 'POST') {
    const body = await readBody(req);
    const name = normName(body.name), pass = body.pass;
    const row = validName(name) && validPass(pass)
      ? db.prepare('SELECT salt, hash, country FROM users WHERE name = ?').get(name) : null;
    if (!row) return send(res, 401, { error: 'badcred' });
    // timingSafeEqual — сравнение хэшей без утечки по времени ответа
    const given = Buffer.from(hashPassword(row.salt, pass), 'hex');
    const stored = Buffer.from(row.hash, 'hex');
    if (given.length !== stored.length || !crypto.timingSafeEqual(given, stored)) {
      return send(res, 401, { error: 'badcred' });
    }
    return send(res, 200, { token: createSession(name), name, country: row.country || null });
  }

  if (p === '/api/logout' && req.method === 'POST') {
    const m = /^Bearer\s+(.+)$/.exec(req.headers.authorization || '');
    if (m) db.prepare('DELETE FROM sessions WHERE token = ?').run(m[1]);
    return send(res, 200, { ok: true });
  }

  // --- Публичная статистика (агрегаты без личных данных, см. stats.js) ---
  if (p === '/api/stats' && req.method === 'GET') {
    const usersTotal = db.prepare('SELECT COUNT(*) AS c FROM users').get().c;
    const countries = db.prepare(
      "SELECT country, COUNT(*) AS c FROM users WHERE country IS NOT NULL AND country != '' GROUP BY country ORDER BY c DESC, country LIMIT 10"
    ).all().map(r => [r.country, r.c]);

    // Агрегаты по всем сохранённым ростерам (имена пользователей не раскрываются)
    const factions = new Map(), modelNames = new Map(), bosses = new Map();
    let rosters = 0, modelsTotal = 0, repSum = 0;
    for (const row of db.prepare('SELECT data FROM saves').all()) {
      let arr;
      try { arr = JSON.parse(row.data); } catch (e) { continue; }
      if (!Array.isArray(arr)) continue;
      for (const s of arr) {
        if (!s || !Array.isArray(s.m)) continue;
        rosters++;
        modelsTotal += s.m.length;
        repSum += s.r || 0;
        if (s.f) factions.set(s.f, (factions.get(s.f) || 0) + 1);
        for (const entry of s.m) {
          const n = entry && entry[0];
          if (n) modelNames.set(n, (modelNames.get(n) || 0) + 1);
        }
        const boss = s.m[s.b];
        if (boss && boss[0]) bosses.set(boss[0], (bosses.get(boss[0]) || 0) + 1);
      }
    }
    const top = (map, n) => [...map.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, n);

    return send(res, 200, {
      users: usersTotal,
      rosters,
      games: getCounter('games_created'),
      avgCrewSize: rosters ? Math.round(modelsTotal / rosters * 10) / 10 : 0,
      avgRepLimit: rosters ? Math.round(repSum / rosters) : 0,
      modelsUsed: modelNames.size,
      factions: top(factions, 10),
      models: top(modelNames, 10),
      bosses: top(bosses, 5),
      countries
    });
  }

  // --- Всё ниже требует входа ---
  const user = authUser(req);

  if (p === '/api/me' && req.method === 'GET') {
    if (!user) return send(res, 401, { error: 'auth' });
    const row = db.prepare('SELECT country FROM users WHERE name = ?').get(user);
    return send(res, 200, { name: user, country: (row && row.country) || null });
  }

  if (!user) return send(res, 401, { error: 'auth' });

  // --- Профиль: страна пользователя (для статистики географии) ---
  if (p === '/api/profile' && req.method === 'PUT') {
    const { country } = await readBody(req);
    if (!validCountry(country)) return send(res, 400, { error: 'input' });
    db.prepare('UPDATE users SET country = ? WHERE name = ?').run(country || null, user);
    return send(res, 200, { ok: true });
  }

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
    bumpCounter('games_created'); // игры чистятся через сутки, а статистике нужен итог за всё время
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
