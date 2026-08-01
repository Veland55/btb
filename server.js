// ==================================================================
// BMG Crew Builder — сервер (Node.js >= 22.5, БЕЗ npm-зависимостей)
//
// Запуск:            node server.js          (порт из env PORT, по умолчанию 8080)
// Что делает:
//   1. Раздаёт статику проекта (index.html, data.js, img/ и т.д.)
//   2. API: регистрация/вход, сохранения отрядов (макс. 5 на пользователя),
//      игровые комнаты, результаты партий, турниры, статистика
// Хранилище:         data/bmg.db (SQLite, встроенный node:sqlite) — один
//                    компактный файл, ростеры хранятся в сжатом JSON-формате
// Пароли:            scrypt-хэш с индивидуальной солью, в открытом виде не хранятся
// ==================================================================

'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const zlib = require('zlib');
const net = require('net');
const tls = require('tls');
const { DatabaseSync } = require('node:sqlite');

const PORT = parseInt(process.env.PORT, 10) || 8080;
const ROOT = __dirname;
const DATA_DIR = process.env.BMG_DATA_DIR || path.join(ROOT, 'data');

const MAX_SAVES = 5;                            // лимит сохранений на пользователя
const MAX_BODY = 32 * 1024;                     // лимит тела запроса
const MAX_SAVES_JSON = 20 * 1024;               // лимит суммарного размера сохранений
const GAME_TTL_MS = 24 * 3600 * 1000;           // игры живут сутки
const SESSION_TTL_MS = 30 * 24 * 3600 * 1000;   // сессии — 30 дней
const RESET_CODE_TTL_MS = 15 * 60 * 1000;       // код восстановления пароля — 15 минут
const RESET_MAX_ATTEMPTS = 5;                   // попыток ввода кода, дальше нужен новый
const RESET_MIN_INTERVAL_MS = 60 * 1000;        // не чаще одного запроса кода в минуту
const STATS_TTL_MS = 60 * 1000;                 // публичная статистика кэшируется на минуту

let statsCache = { at: 0, body: null };

// ======================== БАЗА ДАННЫХ ========================
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
const db = new DatabaseSync(path.join(DATA_DIR, 'bmg.db'));
// WAL: читатели не блокируют писателя и наоборот — заметно ровнее под нагрузкой
db.exec('PRAGMA journal_mode = WAL');
db.exec('PRAGMA synchronous = NORMAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    name    TEXT PRIMARY KEY,
    salt    TEXT NOT NULL,
    hash    TEXT NOT NULL,
    created INTEGER NOT NULL,
    country TEXT,
    email   TEXT
  );
  CREATE TABLE IF NOT EXISTS password_resets (
    user     TEXT PRIMARY KEY,
    code_hash TEXT NOT NULL,
    created  INTEGER NOT NULL,
    attempts INTEGER NOT NULL DEFAULT 0
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
    conditions   TEXT,
    result       TEXT
  );
  CREATE TABLE IF NOT EXISTS counters (
    name  TEXT PRIMARY KEY,
    value INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS results (
    code           TEXT PRIMARY KEY,
    played         INTEGER NOT NULL,
    winner_user    TEXT NOT NULL,
    loser_user     TEXT NOT NULL,
    winner_boss    TEXT,
    loser_boss     TEXT,
    winner_faction TEXT,
    loser_faction  TEXT,
    winner_vp      INTEGER NOT NULL DEFAULT 0,
    loser_vp       INTEGER NOT NULL DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS tournaments (
    id          TEXT PRIMARY KEY,
    created     INTEGER NOT NULL,
    organizer   TEXT NOT NULL,
    org_nick    TEXT NOT NULL,
    address     TEXT NOT NULL,
    date_start  TEXT NOT NULL,
    date_end    TEXT,
    max_players INTEGER NOT NULL,
    reserve     INTEGER NOT NULL DEFAULT 0,
    info        TEXT,
    status      TEXT NOT NULL DEFAULT 'open',
    round       INTEGER NOT NULL DEFAULT 0,
    rounds      TEXT,
    winner      TEXT,
    roster_lock_days INTEGER NOT NULL DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS tournament_players (
    tid     TEXT NOT NULL,
    user    TEXT NOT NULL,
    joined  INTEGER NOT NULL,
    roster1 TEXT,
    roster2 TEXT,
    notes   TEXT,
    dropped INTEGER NOT NULL DEFAULT 0,
    seat    INTEGER,
    PRIMARY KEY (tid, user)
  );
  -- Индексы под горячие выборки: список турниров у организатора, лента по дате,
  -- рейтинг победителей в /api/stats и разбор результатов игр
  CREATE INDEX IF NOT EXISTS idx_tn_organizer ON tournaments (organizer);
  CREATE INDEX IF NOT EXISTS idx_tn_created   ON tournaments (created DESC);
  CREATE INDEX IF NOT EXISTS idx_tn_winner    ON tournaments (winner);
  CREATE INDEX IF NOT EXISTS idx_res_winner   ON results (winner_user);
  CREATE INDEX IF NOT EXISTS idx_res_wboss    ON results (winner_boss);
  CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions (user);
  CREATE INDEX IF NOT EXISTS idx_sessions_created ON sessions (created);
  CREATE INDEX IF NOT EXISTS idx_games_created    ON games (created);
  CREATE INDEX IF NOT EXISTS idx_resets_created   ON password_resets (created);
`);

// Миграции для баз, созданных старыми версиями (колонки, добавленные позже;
// в свежих базах они уже в CREATE TABLE — попытка добавить тихо провалится)
const MIGRATIONS = [
  'ALTER TABLE games ADD COLUMN conditions TEXT',
  'ALTER TABLE users ADD COLUMN country TEXT',
  'ALTER TABLE games ADD COLUMN result TEXT',
  "ALTER TABLE tournaments ADD COLUMN status TEXT NOT NULL DEFAULT 'open'",
  'ALTER TABLE tournaments ADD COLUMN round INTEGER NOT NULL DEFAULT 0',
  'ALTER TABLE tournaments ADD COLUMN rounds TEXT',
  'ALTER TABLE tournaments ADD COLUMN winner TEXT',
  'ALTER TABLE tournaments ADD COLUMN roster_lock_days INTEGER NOT NULL DEFAULT 0',
  'ALTER TABLE users ADD COLUMN email TEXT',
  // снятие с турнира после старта (не пришёл / снялся) — пары его больше не берут,
  // но уже сыгранные туры остаются в таблице
  'ALTER TABLE tournament_players ADD COLUMN dropped INTEGER NOT NULL DEFAULT 0',
  // место в основном составе, фиксируется на старте: резерв в пары не попадает
  'ALTER TABLE tournament_players ADD COLUMN seat INTEGER'
];
for (const stmt of MIGRATIONS) {
  try { db.exec(stmt); } catch (e) { /* колонка уже есть */ }
}

// Кэш подготовленных запросов: db.prepare() заново компилирует SQL при каждом
// вызове, а вызывается он в обработчиках ~60 раз за запрос. Текст запросов —
// литералы из этого файла, их конечное число, поэтому кэш не растёт бесконечно.
// Node однопоточный и все обращения к базе синхронные, так что переиспользовать
// один объект-statement безопасно.
const _rawPrepare = db.prepare.bind(db);
const _stmtCache = new Map();
db.prepare = sql => {
  let st = _stmtCache.get(sql);
  if (!st) { st = _rawPrepare(sql); _stmtCache.set(sql, st); }
  return st;
};

// Постоянные счётчики (игры живут в базе сутки, а статистике нужен итог за всё время)
function bumpCounter(name) {
  db.prepare('INSERT INTO counters (name, value) VALUES (?, 1) ON CONFLICT(name) DO UPDATE SET value = value + 1').run(name);
}
function getCounter(name) {
  const row = db.prepare('SELECT value FROM counters WHERE name = ?').get(name);
  return row ? row.value : 0;
}

// Запросы кода восстановления пароля: user -> время последнего запроса.
// В памяти (не в базе) — переживать перезапуск сервера не обязано, это просто
// анти-спам троттлинг, а не источник истины
const resetRequestTimes = new Map();

// Периодическая чистка протухших сессий, игр и кодов восстановления — база не разрастается
function cleanup() {
  const now = Date.now();
  db.prepare('DELETE FROM sessions WHERE created < ?').run(now - SESSION_TTL_MS);
  db.prepare('DELETE FROM games WHERE created < ?').run(now - GAME_TTL_MS);
  db.prepare('DELETE FROM password_resets WHERE created < ?').run(now - RESET_CODE_TTL_MS);
  for (const [name, ts] of resetRequestTimes) {
    if (now - ts > 3600 * 1000) resetRequestTimes.delete(name);
  }
}
cleanup();
setInterval(cleanup, 3600 * 1000).unref();

// ======================== ПОЧТА (SMTP, без npm-зависимостей) ========================
// Восстановление пароля отправляет код на email пользователя. Без настройки
// переменных окружения письма не уходят — код просто попадает в лог сервера,
// что удобно для локальной разработки без реального почтового ящика.
//   SMTP_HOST     — обязателен, чтобы отправка вообще была включена
//   SMTP_PORT     — 587 (STARTTLS) по умолчанию; 465 — неявный TLS
//   SMTP_SECURE   — "true" форсирует неявный TLS на нестандартном порту
//   SMTP_USER / SMTP_PASS — логин на SMTP-сервере (AUTH LOGIN); можно не указывать
//   SMTP_FROM     — обратный адрес письма (по умолчанию SMTP_USER)
function smtpConfig() {
  if (!process.env.SMTP_HOST) return null;
  const port = parseInt(process.env.SMTP_PORT, 10) || 587;
  return {
    host: process.env.SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE === 'true' || port === 465,
    user: process.env.SMTP_USER || null,
    pass: process.env.SMTP_PASS || null,
    from: process.env.SMTP_FROM || process.env.SMTP_USER || 'no-reply@localhost'
  };
}

// Ждёт одну (возможно многострочную) SMTP-реакцию сервера. Строки-продолжения
// многострочного ответа имеют дефис на 4-й позиции ("250-STARTTLS"),
// последняя строка ответа — пробел ("250 OK")
function smtpWait(socket) {
  return new Promise((resolve, reject) => {
    let buffer = '';
    const onData = chunk => {
      buffer += chunk.toString('utf8');
      const lines = buffer.split('\r\n').filter(Boolean);
      const last = lines[lines.length - 1];
      if (last && /^\d{3} /.test(last)) {
        cleanup();
        resolve({ code: parseInt(last.slice(0, 3), 10), text: buffer });
      }
    };
    const onError = e => { cleanup(); reject(e); };
    function cleanup() { socket.removeListener('data', onData); socket.removeListener('error', onError); }
    socket.on('data', onData);
    socket.on('error', onError);
  });
}

// Отправляет одну команду (или ждёт ответ, если line === null — приветствие
// сервера) и проверяет код ответа, если он ожидаем
async function smtpCmd(socket, line, expectCode) {
  const wait = smtpWait(socket);
  if (line != null) socket.write(line + '\r\n');
  const res = await wait;
  if (expectCode && res.code !== expectCode) {
    throw new Error(`SMTP: ожидали код ${expectCode}, получили ${res.code} (${res.text.trim()})`);
  }
  return res;
}

// Отправка письма (MAIL FROM/RCPT TO/DATA по протоколу SMTP напрямую через
// net/tls — без nodemailer). Возвращает true, если письмо ушло, false — если
// SMTP не настроен (тогда вызывающий код сам логирует код в консоль)
function sendMail({ to, subject, text }) {
  const cfg = smtpConfig();
  if (!cfg) return Promise.resolve(false);
  // SNI (servername) обязан быть доменным именем — Node отклоняет IP-адрес
  // в этом поле, поэтому опускаем его, если SMTP_HOST задан как IP
  const sni = net.isIP(cfg.host) ? {} : { servername: cfg.host };

  return new Promise((resolve, reject) => {
    let socket = cfg.secure
      ? tls.connect({ host: cfg.host, port: cfg.port, ...sni })
      : net.connect({ host: cfg.host, port: cfg.port });
    const timer = setTimeout(() => { socket.destroy(); reject(new Error('smtp_timeout')); }, 15000);
    socket.once('error', e => { clearTimeout(timer); reject(e); });

    (async () => {
      await smtpWait(socket); // приветствие сервера (220 ...)
      await smtpCmd(socket, `EHLO ${cfg.host}`, 250);
      if (!cfg.secure) {
        await smtpCmd(socket, 'STARTTLS', 220);
        const plainSocket = socket;
        socket = tls.connect({ socket: plainSocket, ...sni });
        socket.once('error', e => { clearTimeout(timer); reject(e); });
        await new Promise((res, rej) => { socket.once('secureConnect', res); socket.once('error', rej); });
        await smtpCmd(socket, `EHLO ${cfg.host}`, 250);
      }
      if (cfg.user) {
        await smtpCmd(socket, 'AUTH LOGIN', 334);
        await smtpCmd(socket, Buffer.from(cfg.user).toString('base64'), 334);
        await smtpCmd(socket, Buffer.from(cfg.pass || '').toString('base64'), 235);
      }
      await smtpCmd(socket, `MAIL FROM:<${cfg.from}>`, 250);
      await smtpCmd(socket, `RCPT TO:<${to}>`, 250);
      await smtpCmd(socket, 'DATA', 354);
      // Точка в начале строки экранируется удвоением — иначе SMTP считает её концом письма
      const message = [
        `From: BMG Crew Builder <${cfg.from}>`,
        `To: <${to}>`,
        `Subject: ${subject}`,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=utf-8',
        '',
        text.replace(/^\./gm, '..'),
        '.'
      ].join('\r\n');
      await smtpCmd(socket, message, 250);
      await smtpCmd(socket, 'QUIT').catch(() => {});
      clearTimeout(timer);
      socket.end();
      resolve(true);
    })().catch(e => { clearTimeout(timer); try { socket.destroy(); } catch (_) { /* уже закрыт */ } reject(e); });
  });
}

function generateResetCode() {
  return String(crypto.randomInt(0, 1000000)).padStart(6, '0');
}
function hashResetCode(code) {
  return crypto.createHash('sha256').update(code).digest('hex');
}
function resetRateLimited(name) {
  const last = resetRequestTimes.get(name);
  return !!last && Date.now() - last < RESET_MIN_INTERVAL_MS;
}

// ======================== ХЕЛПЕРЫ ========================
// scrypt намеренно дорогой (~40 мс). Синхронная версия на это время полностью
// останавливала цикл событий: 60 неудачных логинов подряд делали сайт
// неотзывчивым для всех остальных. Асинхронная считает в пуле потоков.
function hashPassword(salt, password) {
  return new Promise((resolve, reject) =>
    crypto.scrypt(password, salt, 32, (e, key) => e ? reject(e) : resolve(key.toString('hex'))));
}

// Ограничитель попыток входа/регистрации с одного адреса: без него подбор
// пароля не только опасен сам по себе, но и работает как DoS через scrypt
// (каждая проверка — ~40 мс работы). Считаем только НЕУДАЧНЫЕ попытки:
// целый клуб за одним NAT-адресом иначе упирался бы в лимит на ровном месте.
const AUTH_MAX_FAILS = 20;                         // неудач в минуту с одного адреса
const authHits = new Map();
const authIp = req => req.socket.remoteAddress || '?';

function authThrottled(req) {
  const e = authHits.get(authIp(req));
  return !!(e && Date.now() <= e.reset && e.n >= AUTH_MAX_FAILS);
}
function authFailed(req) {
  const ip = authIp(req), now = Date.now();
  if (authHits.size > 10000) authHits.clear();     // грубая защита от роста Map
  let e = authHits.get(ip);
  if (!e || now > e.reset) { e = { n: 0, reset: now + 60000 }; authHits.set(ip, e); }
  e.n++;
}
function authSucceeded(req) { authHits.delete(authIp(req)); }

// JSON-ответ. Крупные ответы (списки турниров, статистика) сжимаем: это
// экономит десятки процентов трафика при поллинге. res.req — сам запрос,
// его подставляет http-сервер, отдельный аргумент во все вызовы не нужен.
function send(res, code, obj) {
  const body = Buffer.from(JSON.stringify(obj), 'utf8');
  const head = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Vary': 'Accept-Encoding',
    'X-Content-Type-Options': 'nosniff'
  };
  const accept = (res.req && res.req.headers['accept-encoding']) || '';
  const enc = body.length < 1024 ? null
            : /\bbr\b/.test(accept) ? 'br'
            : /\bgzip\b/.test(accept) ? 'gzip' : null;
  if (!enc) {
    head['Content-Length'] = body.length;
    res.writeHead(code, head);
    return res.end(body);
  }
  const packed = enc === 'br'
    ? zlib.brotliCompressSync(body, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 5 } })
    : zlib.gzipSync(body, { level: 6 });
  head['Content-Encoding'] = enc;
  head['Content-Length'] = packed.length;
  res.writeHead(code, head);
  res.end(packed);
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
// Email профиля: простая проверка формата, длина как у большинства почтовых систем
const validEmail = e => typeof e === 'string' && e.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

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

// Код игры/турнира: 6 символов без визуально похожих (0/O, 1/I/L).
// Уникальность проверяется в ТОЙ таблице, куда код и пойдёт: игры чистятся через
// сутки, турниры живут вечно, поэтому общая проверка по games для турниров врала.
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
function newCode(table, col) {
  // table/col — только литералы из кода, не пользовательский ввод
  const check = db.prepare(`SELECT ${col} FROM ${table} WHERE ${col} = ?`);
  for (let attempt = 0; attempt < 20; attempt++) {
    let code = '';
    const bytes = crypto.randomBytes(6);
    for (let i = 0; i < 6; i++) code += CODE_ALPHABET[bytes[i] % CODE_ALPHABET.length];
    if (!check.get(code)) return code;
  }
  return null;
}
const newGameCode = () => newCode('games', 'code');

function gameToJSON(g) {
  return {
    code: g.code,
    conditions: g.conditions ? JSON.parse(g.conditions) : null,
    result: g.result ? JSON.parse(g.result) : null,
    host: { name: g.host_user, roster: JSON.parse(g.host_roster) },
    guest: g.guest_user ? { name: g.guest_user, roster: JSON.parse(g.guest_roster) } : null
  };
}

// Босс (лидер) компактного ростера: индекс b, иначе первый Leader/Sidekick
function rosterBoss(r) {
  if (!r || !Array.isArray(r.m) || !r.m.length) return null;
  const entry = (Number.isInteger(r.b) && r.m[r.b])
    || r.m.find(e => e[1] === 'L') || r.m.find(e => e[1] === 'S') || r.m[0];
  return entry ? entry[0] : null;
}

// Условия игры: { ev: "имя Event-карты", en: "имя Encounter-карты" }
function validConditions(c) {
  if (c == null) return true;
  return typeof c === 'object' && !Array.isArray(c)
    && Object.keys(c).every(k => ['ev', 'en'].includes(k))
    && ['ev', 'en'].every(k => c[k] == null || (typeof c[k] === 'string' && c[k].length <= 60));
}

// ======================== ТУРНИРЫ ========================
const MAX_TOURNAMENTS_PER_ORG = 5;   // открытых турниров у одного организатора
const validVp = v => Number.isInteger(v) && v >= 0 && v <= 200;
const reqStr = (s, max) => typeof s === 'string' && s.trim().length > 0 && s.length <= max;
const optStr = (s, max) => s == null || (typeof s === 'string' && s.length <= max);

// Даты турнира приходят из <input type="datetime-local"> в ISO-виде.
// Непарсящаяся дата раньше тихо отключала блокировку ростеров (Date.parse -> NaN).
const validDate = s => typeof s === 'string' && !isNaN(Date.parse(s));

function validTournament(tn) {
  return tn && typeof tn === 'object'
    && reqStr(tn.address, 120)
    && !/[<>]/.test(tn.address)                 // адрес попадает в публичную статистику
    && !/[<>]/.test(tn.orgNick || '')
    && reqStr(tn.dateStart, 40) && validDate(tn.dateStart)
    && optStr(tn.dateEnd, 40)
    && (tn.dateEnd == null || tn.dateEnd === '' ||
        (validDate(tn.dateEnd) && Date.parse(tn.dateEnd) >= Date.parse(tn.dateStart)))
    && Number.isInteger(tn.maxPlayers) && tn.maxPlayers >= 2 && tn.maxPlayers <= 128
    && Number.isInteger(tn.reserve) && tn.reserve >= 0 && tn.reserve <= 64
    && Number.isInteger(tn.rosterLockDays) && tn.rosterLockDays >= 0 && tn.rosterLockDays <= 60
    && reqStr(tn.orgNick, 30)
    && optStr(tn.info, 600);
}

// Блокировка ростеров: за roster_lock_days дней до начала турнира изменение
// поданных листов закрывается (0 — не закрывается до самого начала)
function rostersLocked(tn) {
  const days = tn.roster_lock_days || 0;
  if (!days) return false;
  const start = Date.parse(tn.date_start);
  if (isNaN(start)) return false;
  return Date.now() >= start - days * 86400000;
}

// ---- Ход турнира: туры, пары, таблица ----
// tn.rounds (JSON): [ { pairs: [["A","B"], ["C", null]],
//                       claims:  { "A": {win:1, vp:12}, ... },   — что заявил каждый игрок
//                       results: { "A": {win:1, vp:12}, ... },   — сведённый результат пары
//                       disputes: { "A|B": true } }, ... ]       — заявки не сошлись
// null в паре — «бай» (нечётное число игроков): автоматически победа с 0 VP.
// Результат пары засчитывается, только когда обе стороны заявили противоположный
// исход, либо когда организатор разрешил спор вручную (/api/tournaments/resolve).
function tnRounds(tn) {
  try { return tn.rounds ? JSON.parse(tn.rounds) : []; } catch (e) { return []; }
}

// Ключ пары не зависит от порядка имён
const pairKey = (a, b) => [a, b].sort().join('|');

// Сведение заявок одной пары в результат. Обе заявили победу (или обе поражение)
// — спор, результат не засчитывается, пока организатор не рассудит.
function reconcilePair(round, a, b) {
  const key = pairKey(a, b);
  const claims = round.claims || {};
  const ca = claims[a], cb = claims[b];
  round.results = round.results || {};
  round.disputes = round.disputes || {};
  if (round.results[a] && round.results[a].forced) return; // решение организатора не перебиваем
  delete round.results[a];
  delete round.results[b];
  delete round.disputes[key];
  if (!ca || !cb) return;                       // ждём вторую сторону
  if (ca.win === cb.win) { round.disputes[key] = true; return; }
  round.results[a] = { win: ca.win, vp: ca.vp };
  round.results[b] = { win: cb.win, vp: cb.vp };
}

// Все ли пары тура сведены (бай считается сыгранным)
function roundComplete(round) {
  return (round.pairs || []).every(([a, b]) => !b || ((round.results || {})[a] && (round.results || {})[b]));
}

// Таблица: победы, суммарные VP, сыграно туров.
// Тай-брейк: победы → Бухгольц (сумма побед всех соперников) → VP → имя.
function tournamentStandings(tn, playerNames) {
  const table = new Map(playerNames.map(n => [n, { name: n, wins: 0, vp: 0, played: 0, buchholz: 0 }]));
  const opponents = new Map(playerNames.map(n => [n, []]));
  const rounds = tnRounds(tn);
  for (const r of rounds) {
    for (const [name, res] of Object.entries(r.results || {})) {
      const row = table.get(name);
      if (!row || !res) continue;
      row.played++;
      row.wins += res.win ? 1 : 0;
      row.vp += res.vp || 0;
    }
    for (const [a, b] of (r.pairs || [])) {
      if (a && b) { (opponents.get(a) || []).push(b); (opponents.get(b) || []).push(a); }
    }
  }
  for (const row of table.values()) {
    row.buchholz = (opponents.get(row.name) || [])
      .reduce((sum, opp) => sum + ((table.get(opp) || {}).wins || 0), 0);
  }
  return [...table.values()].sort((a, b) =>
    b.wins - a.wins || b.buchholz - a.buchholz || b.vp - a.vp || a.name.localeCompare(b.name));
}

// Пары следующего тура (швейцарская система «лайт»): по текущей таблице,
// сосед сверху вниз, избегая повторных встреч; 1-й тур — случайный порядок
function makePairings(tn, playerNames) {
  const rounds = tnRounds(tn);
  let pool;
  if (!rounds.length) {
    pool = playerNames.slice();
    for (let i = pool.length - 1; i > 0; i--) { // перемешивание Фишера-Йейтса
      const j = crypto.randomInt(i + 1);
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
  } else {
    pool = tournamentStandings(tn, playerNames).map(s => s.name).filter(n => playerNames.includes(n));
  }
  const played = new Set();
  const byes = new Set();
  rounds.forEach(r => (r.pairs || []).forEach(([a, b]) => {
    if (a && b) { played.add(a + '|' + b); played.add(b + '|' + a); }
    else if (a) byes.add(a);                    // кому бай уже доставался
  }));

  // Бай отдаём заранее — и снизу таблицы, как требует швейцарская система,
  // пропуская тех, у кого он уже был. Раньше бай получал ЛУЧШИЙ из оставшихся
  // и мог получить его повторно, что позволяло выиграть турнир без единой игры.
  let byePlayer = null;
  if (pool.length % 2 === 1) {
    let bi = pool.length - 1;
    while (bi > 0 && byes.has(pool[bi])) bi--;
    byePlayer = pool.splice(bi, 1)[0];
  }

  const pairs = [];
  let fallback = 0;                             // ротация, чтобы реванши не повторялись один в один
  while (pool.length > 1) {
    const a = pool.shift();
    let idx = pool.findIndex(b => !played.has(a + '|' + b));
    if (idx === -1) idx = Math.min(fallback++, pool.length - 1); // со всеми уже сыграно
    pairs.push([a, pool.splice(idx, 1)[0]]);
  }
  if (pool.length) pairs.push([pool[0], null]); // подстраховка на нечётность
  if (byePlayer) pairs.push([byePlayer, null]);
  return pairs;
}

// Новый тур: пары + автоматическая победа за бай
function pushRound(tn, playerNames) {
  const rounds = tnRounds(tn);
  const pairs = makePairings(tn, playerNames);
  const results = {};
  pairs.forEach(([a, b]) => { if (!b) results[a] = { win: 1, vp: 0, bye: true }; });
  rounds.push({ pairs, results, claims: {}, disputes: {} });
  return rounds;
}

// Потолок числа туров для швейцарской системы: больше ceil(log2(N)) туров
// система развести не может и начинает выдавать те же пары повторно.
const maxRounds = n => Math.max(1, Math.ceil(Math.log2(Math.max(2, n))));

// Основной состав турнира (без резерва). До старта место определяется порядком
// регистрации, после старта — колонкой seat, зафиксированной на старте, чтобы
// поздние изменения состава не переставляли уже сыгранные пары.
//   dropped:false — кто играет дальше (для жеребьёвки)
//   dropped:true  — плюс снятые: их сыгранные туры остаются в таблице
function tournamentSeated(tid, maxPlayers, withDropped) {
  const rows = db.prepare('SELECT user, dropped, seat FROM tournament_players WHERE tid = ? ORDER BY joined').all(tid);
  const seated = rows.some(r => r.seat != null)
    ? rows.filter(r => r.seat != null).sort((a, b) => a.seat - b.seat)
    : rows.slice(0, maxPlayers);
  return seated.filter(r => withDropped || !r.dropped).map(r => r.user);
}
// Кого жеребьюем в следующем туре
const tournamentEntrants = (tid, maxPlayers) => tournamentSeated(tid, maxPlayers, false);
// Кого показываем в итоговой таблице
const tournamentTableNames = (tid, maxPlayers) => tournamentSeated(tid, maxPlayers, true);

// Турнир + участники; свои ростеры видит их владелец, все ростеры — организатор
function tournamentToJSON(tn, user, opts) {
  const players = db.prepare('SELECT * FROM tournament_players WHERE tid = ? ORDER BY joined').all(tn.id);
  const isOrganizer = tn.organizer === user;
  const names = tournamentEntrants(tn.id, tn.max_players);
  const tableNames = tournamentTableNames(tn.id, tn.max_players);
  // Списком турниров ростеры не отдаём: на каждый опрос это мегабайты чужого JSON
  const withRosters = !opts || opts.rosters !== false;
  return {
    id: tn.id,
    created: tn.created,
    organizer: tn.organizer,
    orgNick: tn.org_nick,
    address: tn.address,
    dateStart: tn.date_start,
    dateEnd: tn.date_end || null,
    maxPlayers: tn.max_players,
    reserve: tn.reserve,
    info: tn.info || null,
    status: tn.status || 'open',
    round: tn.round || 0,
    winner: tn.winner || null,
    rosterLockDays: tn.roster_lock_days || 0,
    rostersLocked: rostersLocked(tn),
    rounds: tnRounds(tn),
    standings: tn.status !== 'open' ? tournamentStandings(tn, tableNames) : [],
    isOrganizer,
    maxRounds: maxRounds(names.length),
    players: players.map((pl, i) => {
      const mine = pl.user === user;
      const row = {
        name: pl.user,
        isReserve: pl.seat != null ? false : i >= tn.max_players, // сверх лимита — резерв
        dropped: !!pl.dropped,
        hasRosters: !!(pl.roster1 && pl.roster2)
      };
      if ((mine || isOrganizer) && withRosters) {
        row.roster1 = pl.roster1 ? JSON.parse(pl.roster1) : null;
        row.roster2 = pl.roster2 ? JSON.parse(pl.roster2) : null;
        row.notes = pl.notes || null;
      }
      return row;
    })
  };
}

// ======================== API ========================
async function handleApi(req, res, url) {
  const p = url.pathname;

  // --- Аутентификация ---
  if (p === '/api/register' && req.method === 'POST') {
    if (authThrottled(req)) return send(res, 429, { error: 'rate' });
    const body = await readBody(req);
    const name = normName(body.name), pass = body.pass;
    if (!validName(name) || !validPass(pass)) return send(res, 400, { error: 'input' });
    // Email при регистрации необязателен (можно указать позже в профиле) —
    // но если прислан, должен быть валидного формата
    const email = body.email ? String(body.email).trim() : null;
    if (email != null && !validEmail(email)) return send(res, 400, { error: 'input' });
    if (userNameTaken(name)) { authFailed(req); return send(res, 409, { error: 'exists' }); }
    const salt = crypto.randomBytes(8).toString('hex');
    db.prepare('INSERT INTO users (name, salt, hash, created, email) VALUES (?, ?, ?, ?, ?)')
      .run(name, salt, await hashPassword(salt, pass), Date.now(), email);
    return send(res, 200, { token: createSession(name), name, country: null, email });
  }

  if (p === '/api/login' && req.method === 'POST') {
    if (authThrottled(req)) return send(res, 429, { error: 'rate' });
    const body = await readBody(req);
    const name = normName(body.name), pass = body.pass;
    const row = validName(name) && validPass(pass)
      ? db.prepare('SELECT salt, hash, country, email FROM users WHERE name = ?').get(name) : null;
    if (!row) { authFailed(req); return send(res, 401, { error: 'badcred' }); }
    // timingSafeEqual — сравнение хэшей без утечки по времени ответа
    const given = Buffer.from(await hashPassword(row.salt, pass), 'hex');
    const stored = Buffer.from(row.hash, 'hex');
    if (given.length !== stored.length || !crypto.timingSafeEqual(given, stored)) {
      authFailed(req);
      return send(res, 401, { error: 'badcred' });
    }
    authSucceeded(req);
    return send(res, 200, { token: createSession(name), name, country: row.country || null, email: row.email || null });
  }

  if (p === '/api/logout' && req.method === 'POST') {
    const m = /^Bearer\s+(.+)$/.exec(req.headers.authorization || '');
    if (m) db.prepare('DELETE FROM sessions WHERE token = ?').run(m[1]);
    return send(res, 200, { ok: true });
  }

  // --- Восстановление пароля по коду, отправленному на email аккаунта ---
  if (p === '/api/forgot-password' && req.method === 'POST') {
    const body = await readBody(req);
    const name = normName(body.name);
    if (!validName(name)) return send(res, 400, { error: 'input' });
    const row = db.prepare('SELECT email FROM users WHERE name = ?').get(name);
    if (!row) return send(res, 404, { error: 'reset_user_notfound' });
    if (!row.email) return send(res, 400, { error: 'reset_no_email' });
    if (resetRateLimited(name)) return send(res, 429, { error: 'reset_rate_limited' });
    resetRequestTimes.set(name, Date.now());

    const code = generateResetCode();
    db.prepare(`INSERT INTO password_resets (user, code_hash, created, attempts) VALUES (?, ?, ?, 0)
                ON CONFLICT(user) DO UPDATE SET code_hash = excluded.code_hash, created = excluded.created, attempts = 0`)
      .run(name, hashResetCode(code), Date.now());

    try {
      const sent = await sendMail({
        to: row.email,
        subject: 'BMG Crew Builder — код восстановления пароля',
        text: `Код для сброса пароля аккаунта "${name}": ${code}\n\n`
          + `Код действителен 15 минут. Если вы не запрашивали сброс пароля — просто проигнорируйте это письмо.`
      });
      if (!sent) console.log(`[mail] SMTP не настроен — код восстановления для "${name}" (${row.email}): ${code}`);
    } catch (e) {
      console.error('Ошибка отправки письма восстановления пароля:', e.message);
      return send(res, 500, { error: 'reset_mail_failed' });
    }
    return send(res, 200, { ok: true });
  }

  if (p === '/api/reset-password' && req.method === 'POST') {
    const body = await readBody(req);
    const name = normName(body.name);
    const code = body.code, newPass = body.newPass;
    if (!validName(name) || typeof code !== 'string' || !validPass(newPass)) {
      return send(res, 400, { error: 'input' });
    }
    const row = db.prepare('SELECT * FROM password_resets WHERE user = ?').get(name);
    if (!row || row.created < Date.now() - RESET_CODE_TTL_MS || row.attempts >= RESET_MAX_ATTEMPTS) {
      return send(res, 400, { error: 'reset_code_expired' });
    }
    const given = Buffer.from(hashResetCode(code), 'hex');
    const stored = Buffer.from(row.code_hash, 'hex');
    if (given.length !== stored.length || !crypto.timingSafeEqual(given, stored)) {
      db.prepare('UPDATE password_resets SET attempts = attempts + 1 WHERE user = ?').run(name);
      return send(res, 400, { error: 'reset_bad_code' });
    }
    const salt = crypto.randomBytes(8).toString('hex');
    db.prepare('UPDATE users SET salt = ?, hash = ? WHERE name = ?').run(salt, await hashPassword(salt, newPass), name);
    db.prepare('DELETE FROM password_resets WHERE user = ?').run(name);
    db.prepare('DELETE FROM sessions WHERE user = ?').run(name); // сброс пароля — разлогиниваем все устройства
    return send(res, 200, { ok: true });
  }

  // --- Публичная статистика (агрегаты без личных данных, см. stats.js) ---
  // Считается полным перебором всех сохранений — на тысячах пользователей это
  // сотни миллисекунд заблокированного цикла событий. Ответ одинаков для всех
  // и не обязан быть секундной свежести, поэтому держим минутный кэш.
  if (p === '/api/stats' && req.method === 'GET') {
    if (statsCache.body && Date.now() - statsCache.at < STATS_TTL_MS) {
      return send(res, 200, statsCache.body);
    }
    const usersTotal = db.prepare('SELECT COUNT(*) AS c FROM users').get().c;
    const countries = db.prepare(
      "SELECT country, COUNT(*) AS c FROM users WHERE country IS NOT NULL AND country != '' GROUP BY country ORDER BY c DESC, country LIMIT 10"
    ).all().map(r => [r.country, r.c]);

    // Агрегаты по всем сохранённым ростерам (имена пользователей не раскрываются)
    const factions = new Map(), modelNames = new Map(), bosses = new Map();
    let rosters = 0, modelsTotal = 0;
    for (const row of db.prepare('SELECT data FROM saves').all()) {
      let arr;
      try { arr = JSON.parse(row.data); } catch (e) { continue; }
      if (!Array.isArray(arr)) continue;
      for (const s of arr) {
        if (!s || !Array.isArray(s.m)) continue;
        rosters++;
        modelsTotal += s.m.length;
        if (s.f) factions.set(s.f, (factions.get(s.f) || 0) + 1);
        // Модель считается один раз на ростер: иначе хенчмены, которых можно
        // брать по несколько копий, всегда обгоняли бы одиночные модели
        const seen = new Set();
        for (const entry of s.m) {
          const n = entry && entry[0];
          if (n && !seen.has(n)) {
            seen.add(n);
            modelNames.set(n, (modelNames.get(n) || 0) + 1);
          }
        }
        const boss = s.m[s.b];
        if (boss && boss[0]) bosses.set(boss[0], (bosses.get(boss[0]) || 0) + 1);
      }
    }
    const top = (map, n) => [...map.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, n);

    // Рейтинг побед: лидеры (боссы) по числу выигранных партий (см. /api/games/:code/result)
    const winners = db.prepare(
      'SELECT winner_boss AS b, COUNT(*) AS c FROM results WHERE winner_boss IS NOT NULL GROUP BY winner_boss ORDER BY c DESC, b LIMIT 10'
    ).all().map(r => [r.b, r.c]);
    const resultsTotal = db.prepare('SELECT COUNT(*) AS c FROM results').get().c;

    // География турниров: где чаще всего проходят мероприятия
    const tournamentsTotal = db.prepare('SELECT COUNT(*) AS c FROM tournaments').get().c;
    const locations = db.prepare(
      'SELECT address, COUNT(*) AS c FROM tournaments GROUP BY address ORDER BY c DESC, address LIMIT 10'
    ).all().map(r => [r.address, r.c]);

    // Лучшие игроки: победители завершённых турниров (+ страна из профиля)
    const topPlayers = db.prepare(
      `SELECT t.winner AS name, COUNT(*) AS c, u.country AS country
       FROM tournaments t LEFT JOIN users u ON u.name = t.winner
       WHERE t.winner IS NOT NULL GROUP BY t.winner, u.country ORDER BY c DESC, t.winner LIMIT 10`
    ).all().map(r => [r.name, r.c, r.country || null]);

    const payload = {
      users: usersTotal,
      rosters,
      games: getCounter('games_created'),
      resultsTotal,
      tournamentsTotal,
      avgCrewSize: rosters ? Math.round(modelsTotal / rosters * 10) / 10 : 0,
      factions: top(factions, 10),
      models: top(modelNames, 10),
      bosses: top(bosses, 5),
      winners,
      topPlayers,
      locations,
      countries
    };
    statsCache = { at: Date.now(), body: payload };
    return send(res, 200, payload);
  }

  // --- Всё ниже требует входа ---
  const user = authUser(req);

  if (p === '/api/me' && req.method === 'GET') {
    if (!user) return send(res, 401, { error: 'auth' });
    const row = db.prepare('SELECT country, email FROM users WHERE name = ?').get(user);
    return send(res, 200, { name: user, country: (row && row.country) || null, email: (row && row.email) || null });
  }

  if (!user) return send(res, 401, { error: 'auth' });

  // --- Профиль: страна (для статистики) и email (для восстановления пароля).
  // Поля независимы — присылайте только то, что меняете
  if (p === '/api/profile' && req.method === 'PUT') {
    const body = await readBody(req);
    if ('country' in body) {
      if (!validCountry(body.country)) return send(res, 400, { error: 'input' });
      db.prepare('UPDATE users SET country = ? WHERE name = ?').run(body.country || null, user);
    }
    if ('email' in body) {
      const email = body.email ? String(body.email).trim() : null;
      if (email != null && !validEmail(email)) return send(res, 400, { error: 'input' });
      db.prepare('UPDATE users SET email = ? WHERE name = ?').run(email, user);
    }
    return send(res, 200, { ok: true });
  }

  // --- Смена пароля из профиля (пользователь знает текущий пароль) ---
  if (p === '/api/change-password' && req.method === 'POST') {
    const { oldPass, newPass } = await readBody(req);
    if (!validPass(oldPass) || !validPass(newPass)) return send(res, 400, { error: 'input' });
    const row = db.prepare('SELECT salt, hash FROM users WHERE name = ?').get(user);
    const given = Buffer.from(hashPassword(row.salt, oldPass), 'hex');
    const stored = Buffer.from(row.hash, 'hex');
    if (given.length !== stored.length || !crypto.timingSafeEqual(given, stored)) {
      return send(res, 401, { error: 'badcred' });
    }
    const salt = crypto.randomBytes(8).toString('hex');
    db.prepare('UPDATE users SET salt = ?, hash = ? WHERE name = ?').run(salt, hashPassword(salt, newPass), user);
    // Оставляем текущую сессию активной, но выходим из остальных устройств
    const m = /^Bearer\s+(.+)$/.exec(req.headers.authorization || '');
    const currentToken = m ? m[1] : null;
    if (currentToken) db.prepare('DELETE FROM sessions WHERE user = ? AND token != ?').run(user, currentToken);
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

  // --- Результат партии: победитель + очки побед (пишет любой из участников) ---
  // Комната живёт сутки, поэтому итог сразу копируется в постоянную таблицу
  // results — из неё статистика строит рейтинг побед по лидерам
  const resultMatch = /^\/api\/games\/([A-Z0-9]{6})\/result$/i.exec(p);
  if (resultMatch && req.method === 'POST') {
    const g = db.prepare('SELECT * FROM games WHERE code = ?').get(resultMatch[1].toUpperCase());
    if (!g || g.created < Date.now() - GAME_TTL_MS) return send(res, 404, { error: 'notfound' });
    if (g.host_user !== user && g.guest_user !== user) return send(res, 403, { error: 'auth' });
    if (!g.guest_user) return send(res, 400, { error: 'input' }); // оппонент ещё не присоединился

    const { winner, hostVp, guestVp } = await readBody(req);
    if (!['host', 'guest'].includes(winner) || !validVp(hostVp) || !validVp(guestVp)) {
      return send(res, 400, { error: 'input' });
    }

    const result = { winner, hostVp, guestVp, by: user };
    db.prepare('UPDATE games SET result = ? WHERE code = ?').run(JSON.stringify(result), g.code);

    const hostRoster = JSON.parse(g.host_roster), guestRoster = JSON.parse(g.guest_roster);
    const w = winner === 'host'
      ? { user: g.host_user, roster: hostRoster, vp: hostVp }
      : { user: g.guest_user, roster: guestRoster, vp: guestVp };
    const l = winner === 'host'
      ? { user: g.guest_user, roster: guestRoster, vp: guestVp }
      : { user: g.host_user, roster: hostRoster, vp: hostVp };
    // Повторная запись (исправление ошибки) перезаписывает итог той же партии
    db.prepare(`INSERT INTO results (code, played, winner_user, loser_user, winner_boss, loser_boss,
                  winner_faction, loser_faction, winner_vp, loser_vp)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(code) DO UPDATE SET played = excluded.played,
                  winner_user = excluded.winner_user, loser_user = excluded.loser_user,
                  winner_boss = excluded.winner_boss, loser_boss = excluded.loser_boss,
                  winner_faction = excluded.winner_faction, loser_faction = excluded.loser_faction,
                  winner_vp = excluded.winner_vp, loser_vp = excluded.loser_vp`)
      .run(g.code, Date.now(), w.user, l.user, rosterBoss(w.roster), rosterBoss(l.roster),
           w.roster.f || null, l.roster.f || null, w.vp, l.vp);

    return send(res, 200, { ok: true, result });
  }

  // --- Турниры ---
  // Лента турниров. ?scope=mine — все свои (организатор + участие), без лимита;
  // иначе страница общего списка. Ростеры в списке не отдаются — их тянет
  // /api/tournaments/:id при открытии карточки.
  if (p === '/api/tournaments' && req.method === 'GET') {
    const scope = url.searchParams.get('scope');
    const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit'), 10) || 50, 1), 100);
    const offset = Math.max(parseInt(url.searchParams.get('offset'), 10) || 0, 0);
    const rows = scope === 'mine'
      ? db.prepare(`SELECT * FROM tournaments WHERE organizer = ?
                      OR id IN (SELECT tid FROM tournament_players WHERE user = ?)
                    ORDER BY created DESC`).all(user, user)
      : db.prepare('SELECT * FROM tournaments ORDER BY created DESC LIMIT ? OFFSET ?').all(limit, offset);
    const total = db.prepare('SELECT COUNT(*) AS c FROM tournaments').get().c;
    return send(res, 200, {
      tournaments: rows.map(tn => tournamentToJSON(tn, user, { rosters: false })),
      total, offset, limit
    });
  }

  // Одна карточка целиком — включая ростеры (свои, а организатору — все)
  const tnGetMatch = /^\/api\/tournaments\/([A-Z0-9]{6})$/i.exec(p);
  if (tnGetMatch && req.method === 'GET') {
    const tn = db.prepare('SELECT * FROM tournaments WHERE id = ?').get(tnGetMatch[1].toUpperCase());
    if (!tn) return send(res, 404, { error: 'tn_notfound' });
    return send(res, 200, tournamentToJSON(tn, user));
  }

  if (p === '/api/tournaments' && req.method === 'POST') {
    const tn = await readBody(req);
    if (!validTournament(tn)) return send(res, 400, { error: 'input' });
    // лимит на НЕзавершённые: иначе организатор клуба навсегда упирается в потолок
    const mine = db.prepare("SELECT COUNT(*) AS c FROM tournaments WHERE organizer = ? AND status != 'finished'").get(user).c;
    if (mine >= MAX_TOURNAMENTS_PER_ORG) return send(res, 400, { error: 'tn_limit' });
    const id = newCode('tournaments', 'id');
    if (!id) return send(res, 500, { error: 'server' });
    db.prepare(`INSERT INTO tournaments (id, created, organizer, org_nick, address, date_start,
                  date_end, max_players, reserve, info, roster_lock_days) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .run(id, Date.now(), user, tn.orgNick.trim(), tn.address.trim(), tn.dateStart.trim(),
           tn.dateEnd ? tn.dateEnd.trim() : null, tn.maxPlayers, tn.reserve,
           tn.info ? tn.info.trim() : null, tn.rosterLockDays);
    return send(res, 200, { id });
  }

  if (p === '/api/tournaments/join' && req.method === 'POST') {
    const { id } = await readBody(req);
    const tn = typeof id === 'string' ? db.prepare('SELECT * FROM tournaments WHERE id = ?').get(id.toUpperCase()) : null;
    if (!tn) return send(res, 404, { error: 'notfound' });
    if (tn.status !== 'open') return send(res, 409, { error: 'tn_started' }); // регистрация закрыта
    if (db.prepare('SELECT user FROM tournament_players WHERE tid = ? AND user = ?').get(tn.id, user)) {
      return send(res, 409, { error: 'tn_joined' });
    }
    const count = db.prepare('SELECT COUNT(*) AS c FROM tournament_players WHERE tid = ?').get(tn.id).c;
    if (count >= tn.max_players + tn.reserve) return send(res, 409, { error: 'tn_full' });
    db.prepare('INSERT INTO tournament_players (tid, user, joined) VALUES (?, ?, ?)').run(tn.id, user, Date.now());
    return send(res, 200, tournamentToJSON(tn, user));
  }

  if (p === '/api/tournaments/leave' && req.method === 'POST') {
    const { id } = await readBody(req);
    const tn = typeof id === 'string' ? db.prepare('SELECT * FROM tournaments WHERE id = ?').get(id.toUpperCase()) : null;
    if (!tn) return send(res, 404, { error: 'notfound' });
    if (tn.status !== 'open') return send(res, 409, { error: 'tn_started' }); // после старта пары уже сформированы
    const gone = db.prepare('DELETE FROM tournament_players WHERE tid = ? AND user = ?').run(tn.id, user);
    if (!gone.changes) return send(res, 404, { error: 'tn_notfound' });      // не был записан
    return send(res, 200, { ok: true });
  }

  // Подача двух турнирных ростеров (Batmatch: 2 листа одной банды)
  if (p === '/api/tournaments/rosters' && req.method === 'PUT') {
    const { id, roster1, roster2, notes } = await readBody(req);
    const tn = typeof id === 'string' ? db.prepare('SELECT * FROM tournaments WHERE id = ?').get(id.toUpperCase()) : null;
    if (!tn) return send(res, 404, { error: 'notfound' });
    if (!db.prepare('SELECT user FROM tournament_players WHERE tid = ? AND user = ?').get(tn.id, user)) {
      return send(res, 403, { error: 'auth' });
    }
    // Листы подаются только до старта: иначе игрок менял бы банду между турами
    if (tn.status !== 'open') return send(res, 409, { error: 'tn_started' });
    if (rostersLocked(tn)) return send(res, 409, { error: 'tn_locked' }); // дедлайн организатора прошёл
    if (!validSave(roster1) || !validSave(roster2) || !optStr(notes, 400)) return send(res, 400, { error: 'input' });
    if (roster1.f !== roster2.f) return send(res, 400, { error: 'input' }); // одна банда для обоих листов
    db.prepare('UPDATE tournament_players SET roster1 = ?, roster2 = ?, notes = ? WHERE tid = ? AND user = ?')
      .run(JSON.stringify(roster1), JSON.stringify(roster2), notes ? notes.trim() : null, tn.id, user);
    return send(res, 200, { ok: true });
  }

  // --- Ход турнира (управляет организатор) ---
  // Хелпер: турнир по id из тела + список имён участников
  // names — только те, кто реально играет: основной состав, без резерва и снятых
  function tnByBody(body) {
    const tn = body && typeof body.id === 'string'
      ? db.prepare('SELECT * FROM tournaments WHERE id = ?').get(body.id.toUpperCase()) : null;
    if (!tn) return null;
    return { tn, names: tournamentEntrants(tn.id, tn.max_players) };
  }

  // Старт: регистрация закрывается, формируются пары 1-го тура — участники
  // видят это в разделе ТУРНИРЫ (список обновляется поллингом)
  if (p === '/api/tournaments/start' && req.method === 'POST') {
    const found = tnByBody(await readBody(req));
    if (!found) return send(res, 404, { error: 'notfound' });
    const { tn, names } = found;
    if (tn.organizer !== user) return send(res, 403, { error: 'auth' });
    if (tn.status !== 'open') return send(res, 400, { error: 'input' });
    if (names.length < 2) return send(res, 400, { error: 'tn_few' });
    // Фиксируем основной состав: с этого момента порядок регистрации ничего
    // не меняет, а резерв в пары не попадает
    const seatStmt = db.prepare('UPDATE tournament_players SET seat = ? WHERE tid = ? AND user = ?');
    names.forEach((n, i) => seatStmt.run(i, tn.id, n));
    const rounds = pushRound(tn, names);
    db.prepare("UPDATE tournaments SET status = 'active', round = 1, rounds = ? WHERE id = ?")
      .run(JSON.stringify(rounds), tn.id);
    return send(res, 200, tournamentToJSON(db.prepare('SELECT * FROM tournaments WHERE id = ?').get(tn.id), user));
  }

  // Следующий тур: пары строятся по текущей таблице (швейцарская система)
  if (p === '/api/tournaments/next' && req.method === 'POST') {
    const body = await readBody(req);
    const found = tnByBody(body);
    if (!found) return send(res, 404, { error: 'tn_notfound' });
    const { tn, names } = found;
    if (tn.organizer !== user) return send(res, 403, { error: 'auth' });
    if (tn.status !== 'active') return send(res, 400, { error: 'input' });
    const prev = tnRounds(tn);
    // Незакрытый тур нельзя молча потерять: либо все результаты сведены,
    // либо организатор явно подтверждает переход (force)
    if (prev.length && !roundComplete(prev[prev.length - 1]) && !body.force) {
      return send(res, 409, { error: 'tn_round_open' });
    }
    if (prev.length >= maxRounds(names.length)) return send(res, 409, { error: 'tn_max_rounds' });
    const rounds = pushRound(tn, names);
    db.prepare('UPDATE tournaments SET round = ?, rounds = ? WHERE id = ?')
      .run(rounds.length, JSON.stringify(rounds), tn.id);
    return send(res, 200, tournamentToJSON(db.prepare('SELECT * FROM tournaments WHERE id = ?').get(tn.id), user));
  }

  // Финиш: победитель — первый в таблице; турнир остаётся в базе как история
  // организатора и попадает в статистику («Лучшие игроки», география)
  if (p === '/api/tournaments/finish' && req.method === 'POST') {
    const body = await readBody(req);
    const found = tnByBody(body);
    if (!found) return send(res, 404, { error: 'tn_notfound' });
    const { tn, names } = found;
    if (tn.organizer !== user) return send(res, 403, { error: 'auth' });
    if (tn.status !== 'active') return send(res, 400, { error: 'input' });
    const rounds = tnRounds(tn);
    if (rounds.length && !roundComplete(rounds[rounds.length - 1]) && !body.force) {
      return send(res, 409, { error: 'tn_round_open' });
    }
    // В итоговой таблице учитываем и снятых: их сыгранные туры не пропадают
    const standings = tournamentStandings(tn, tournamentTableNames(tn.id, tn.max_players));
    // Победитель попадает в публичный рейтинг — засчитываем, только если
    // он действительно сыграл хотя бы один сведённый тур и не снят
    const champ = standings.find(s => s.played > 0 && names.includes(s.name));
    db.prepare("UPDATE tournaments SET status = 'finished', winner = ? WHERE id = ?")
      .run(champ ? champ.name : null, tn.id);
    return send(res, 200, tournamentToJSON(db.prepare('SELECT * FROM tournaments WHERE id = ?').get(tn.id), user));
  }

  // Участник заявляет результат своей пары в текущем туре.
  // Результат засчитывается только когда обе стороны заявили ПРОТИВОПОЛОЖНЫЙ
  // исход; совпавшие заявки («мы оба выиграли») уходят в спор к организатору.
  if (p === '/api/tournaments/report' && req.method === 'POST') {
    const body = await readBody(req);
    const found = tnByBody(body);
    if (!found) return send(res, 404, { error: 'tn_notfound' });
    const { tn } = found;
    if (tn.status !== 'active') return send(res, 400, { error: 'input' });
    if (body.win !== 0 && body.win !== 1) return send(res, 400, { error: 'input' });
    if (!validVp(body.vp)) return send(res, 400, { error: 'input' });
    const rounds = tnRounds(tn);
    const current = rounds[rounds.length - 1];
    if (!current) return send(res, 400, { error: 'input' });
    const myPair = (current.pairs || []).find(pr => pr[0] === user || pr[1] === user);
    if (!myPair) return send(res, 403, { error: 'auth' });       // не в парах тура
    if (!myPair[0] || !myPair[1]) return send(res, 400, { error: 'input' }); // бай записан автоматически
    current.claims = current.claims || {};
    current.claims[user] = { win: body.win, vp: body.vp };       // повторная запись — исправление
    reconcilePair(current, myPair[0], myPair[1]);
    db.prepare('UPDATE tournaments SET rounds = ? WHERE id = ?').run(JSON.stringify(rounds), tn.id);
    return send(res, 200, {
      ok: true,
      disputed: !!(current.disputes || {})[pairKey(myPair[0], myPair[1])],
      pending: !current.results[user]
    });
  }

  // Организатор рассуживает спор (обе стороны заявили победу) или правит
  // результат любой пары любого тура вручную
  if (p === '/api/tournaments/resolve' && req.method === 'POST') {
    const body = await readBody(req);
    const found = tnByBody(body);
    if (!found) return send(res, 404, { error: 'tn_notfound' });
    const { tn } = found;
    if (tn.organizer !== user) return send(res, 403, { error: 'auth' });
    if (tn.status !== 'active') return send(res, 400, { error: 'input' });
    if (typeof body.winner !== 'string' || !validVp(body.vpWinner) || !validVp(body.vpLoser)) {
      return send(res, 400, { error: 'input' });
    }
    const rounds = tnRounds(tn);
    const idx = Number.isInteger(body.round) ? body.round : rounds.length - 1;
    const round = rounds[idx];
    if (!round) return send(res, 400, { error: 'input' });
    const pr = (round.pairs || []).find(x => x[0] === body.winner || x[1] === body.winner);
    if (!pr || !pr[0] || !pr[1]) return send(res, 400, { error: 'input' });
    const loser = pr[0] === body.winner ? pr[1] : pr[0];
    round.results = round.results || {};
    round.disputes = round.disputes || {};
    round.results[body.winner] = { win: 1, vp: body.vpWinner, forced: true };
    round.results[loser] = { win: 0, vp: body.vpLoser, forced: true };
    delete round.disputes[pairKey(pr[0], pr[1])];
    db.prepare('UPDATE tournaments SET rounds = ? WHERE id = ?').run(JSON.stringify(rounds), tn.id);
    return send(res, 200, { ok: true });
  }

  // Организатор убирает участника. До старта — удаление из списка (резерв
  // поднимается сам), после старта — снятие: в новые пары не попадает,
  // сыгранные туры остаются в таблице.
  if (p === '/api/tournaments/kick' && req.method === 'POST') {
    const body = await readBody(req);
    const found = tnByBody(body);
    if (!found) return send(res, 404, { error: 'tn_notfound' });
    const { tn } = found;
    if (tn.organizer !== user) return send(res, 403, { error: 'auth' });
    if (tn.status === 'finished') return send(res, 400, { error: 'input' });
    if (typeof body.player !== 'string' || body.player.length > 30) return send(res, 400, { error: 'input' });
    const r = tn.status === 'open'
      ? db.prepare('DELETE FROM tournament_players WHERE tid = ? AND user = ?').run(tn.id, body.player)
      : db.prepare('UPDATE tournament_players SET dropped = 1 WHERE tid = ? AND user = ?').run(tn.id, body.player);
    if (!r.changes) return send(res, 404, { error: 'tn_notfound' }); // такого участника нет
    return send(res, 200, { ok: true });
  }

  const tnDeleteMatch = /^\/api\/tournaments\/([A-Z0-9]{6})$/i.exec(p);
  if (tnDeleteMatch && req.method === 'DELETE') {
    const tn = db.prepare('SELECT * FROM tournaments WHERE id = ?').get(tnDeleteMatch[1].toUpperCase());
    if (!tn) return send(res, 404, { error: 'notfound' });
    if (tn.organizer !== user) return send(res, 403, { error: 'auth' });
    db.prepare('DELETE FROM tournament_players WHERE tid = ?').run(tn.id);
    db.prepare('DELETE FROM tournaments WHERE id = ?').run(tn.id);
    return send(res, 200, { ok: true });
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
const DENY = [/^\/data(\/|$)/i, /^\/server\.js$/i, /^\/\.git(\/|$)/i, /\.db(-|$)/i, /^\/node_modules(\/|$)/i, /^\/\.env$/i];

function serveStatic(req, res, url) {
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); }
  catch (e) { res.writeHead(400); return res.end('Bad request'); }        // битый %-escape
  if (pathname.indexOf('\0') !== -1) { res.writeHead(400); return res.end('Bad request'); }
  if (pathname === '/') pathname = '/index.html';

  // ВАЖЕН ПОРЯДОК: сначала нормализуем путь, и только потом проверяем DENY.
  // new URL() не раскрывает %2F, поэтому запрос вида /a/..%2Fserver.js после
  // decodeURIComponent превращался в "/a/../server.js" — этот вид не совпадал
  // ни с одним якорным правилом DENY и отдавал исходники (включая .git).
  const filePath = path.normalize(path.join(ROOT, pathname));
  if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) { res.writeHead(403); return res.end('Forbidden'); }
  const rel = '/' + path.relative(ROOT, filePath).split(path.sep).join('/');
  if (DENY.some(rx => rx.test(rel))) { res.writeHead(404); return res.end('Not found'); }

  fs.stat(filePath, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404); return res.end('Not found'); }

    const mtime = new Date(st.mtimeMs);
    mtime.setMilliseconds(0);
    const etag = `W/"${st.size.toString(16)}-${Math.floor(st.mtimeMs).toString(16)}"`;

    // 304 по ETag / If-Modified-Since — браузер не качает неизменившиеся файлы
    if (req.headers['if-none-match'] === etag) { res.writeHead(304, { ETag: etag }); return res.end(); }
    const ims = req.headers['if-modified-since'];
    if (ims && new Date(ims) >= mtime) { res.writeHead(304, { ETag: etag }); return res.end(); }

    const ext = path.extname(filePath).toLowerCase();
    const mime = MIME[ext] || 'application/octet-stream';
    const isImage = mime.startsWith('image/');
    // Ссылки на код и стили в index.html versioned (?v=...), поэтому их можно
    // кэшировать намертво: смена версии сама ломает кэш. Без ?v — только ревалидация.
    const cache = isImage ? 'public, max-age=604800'
                : url.search ? 'public, max-age=31536000, immutable'
                : 'no-cache';

    // Сжимаем только текст: картинки уже сжаты, повторный проход — трата CPU.
    // Brotli на quality 5: почти как gzip по цене и заметно лучше по размеру.
    const accept = req.headers['accept-encoding'] || '';
    const enc = (isImage || st.size < 1024) ? null
              : /\bbr\b/.test(accept) ? 'br'
              : /\bgzip\b/.test(accept) ? 'gzip' : null;

    const head = {
      'Content-Type': mime,
      'Last-Modified': mtime.toUTCString(),
      'ETag': etag,
      'Cache-Control': cache,
      'Vary': 'Accept-Encoding',
      'X-Content-Type-Options': 'nosniff'
    };
    if (enc) head['Content-Encoding'] = enc; else head['Content-Length'] = st.size;
    res.writeHead(200, head);
    if (req.method === 'HEAD') return res.end();

    // .pipe() НЕ пробрасывает ошибки: без этого обработчика один нечитаемый файл
    // (или EMFILE под нагрузкой) роняет весь процесс
    const stream = fs.createReadStream(filePath);
    stream.on('error', () => { res.end(); });
    res.on('close', () => stream.destroy());
    if (!enc) return stream.pipe(res);
    const zc = enc === 'br'
      ? zlib.createBrotliCompress({ params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 5 } })
      : zlib.createGzip({ level: 6 });
    zc.on('error', () => res.end());
    stream.pipe(zc).pipe(res);
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

// Тайм-ауты: дефолтные 300 с на запрос — приглашение для slowloris,
// когда сотня полуоткрытых соединений держит сервер занятым
server.headersTimeout = 15000;
server.requestTimeout = 30000;
server.keepAliveTimeout = 10000;
server.maxRequestsPerSocket = 1000;

// Один необработанный сбой не должен уносить процесс вместе со всеми сессиями
server.on('clientError', (e, socket) => {
  if (socket.writable) socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
process.on('unhandledRejection', e => console.error('unhandledRejection:', e));
process.on('uncaughtException', e => console.error('uncaughtException:', e));

server.listen(PORT, () => {
  console.log(`BMG Crew Builder: http://localhost:${PORT}`);
  console.log(`База данных: ${path.join(DATA_DIR, 'bmg.db')}`);
});
