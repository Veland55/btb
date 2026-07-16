// ==================================================================
// BMG — РАЗДЕЛ "ИГРА": обмен ростерами между двумя устройствами
// Хост создаёт игру и получает короткий код; оппонент вводит код со
// своего устройства — после этого оба видят ростеры друг друга.
// Комнаты живут на сервере 24 часа (см. server.js), состояние хоста
// обновляется поллингом, пока оппонент не присоединится.
// ==================================================================

const GAME_CODE_KEY = 'bmg_game_code';
let gamePollTimer = null;
let activeGame = null; // последнее полученное состояние игры

// ======================== УСЛОВИЯ ИГРЫ (Event + Encounter) ========================
// По правилам обе карты выбираются случайно и независимо друг от друга.
// Хост задаёт их ДО подключения оппонента: при входе в настройку игры карты
// выбираются равновероятно, но их можно перебросить или выбрать вручную.
let gameConditions = null; // { ev: индекс в GAME_EVENTS, en: индекс в GAME_ENCOUNTERS }

function ensureGameConditions() {
  if (!gameConditions) {
    gameConditions = {
      ev: Math.floor(Math.random() * GAME_EVENTS.length),
      en: Math.floor(Math.random() * GAME_ENCOUNTERS.length)
    };
  }
}

function conditionPool(type) {
  return type === 'ev' ? GAME_EVENTS : GAME_ENCOUNTERS;
}

// Переброс: равновероятно, но не та же карта (иначе кажется, что кнопка не сработала)
function rerollGameCondition(type) {
  const pool = conditionPool(type);
  let idx = gameConditions[type];
  while (idx === gameConditions[type]) idx = Math.floor(Math.random() * pool.length);
  gameConditions[type] = idx;
  const sel = $(type === 'ev' ? 'gameCondEv' : 'gameCondEn');
  if (sel) sel.value = String(idx);
}

function setGameCondition(type, value) {
  gameConditions[type] = parseInt(value, 10) || 0;
}

// Папки со сканами печатных карт (см. img/GAME_EVENTS, img/GAME_ENCOUNTERS) —
// имена файлов совпадают с card.name (например "Heavy Rain.png")
function conditionImageSrc(type, name) {
  const folder = type === 'ev' ? 'GAME_EVENTS' : 'GAME_ENCOUNTERS';
  return `img/${folder}/${encodeURIComponent(name)}.png`;
}

// Текстовое описание условия (правило + расстановка + флейвор) — используется
// как запасной вариант, если скан карты не найден на диске
function conditionTextHTML(card) {
  let body = card.text;
  if (card.dz) body += `\n\n${card.dz}\n(Exact deployment map — see the printed card.)`;
  if (card.flavor) body += `\n\n<i>${card.flavor}</i>`;
  return body.replace(/\n/g, '<br>');
}

// Если скан карты отсутствует — заменяем картинку на текстовое описание
function conditionImgFallback(imgEl) {
  const wrap = imgEl.closest('.game-cond-popup-img-wrap');
  if (!wrap) return;
  const card = conditionPool(wrap.dataset.condType).find(c => c.name === wrap.dataset.condName);
  if (card) wrap.outerHTML = `<div class="game-cond-popup-text">${conditionTextHTML(card)}</div>`;
}

// Тело попапа с условием: скан печатной карты вместо текста. "Связанные правила"
// здесь намеренно не показываются (см. вызовы showTraitPopup(..., false) ниже) —
// в этом окне нужна только сама карта, без расшифровки посторонних трейтов.
function conditionPopupBody(type, card) {
  const src = conditionImageSrc(type, card.name);
  return `
    <div class="game-cond-popup-img-wrap" data-cond-type="${type}" data-cond-name="${card.name}">
      <img src="${src}" alt="${card.name}" class="game-cond-popup-img" loading="lazy" onerror="conditionImgFallback(this)">
    </div>`;
}

function conditionTitle(type, card) {
  return `${t(type === 'ev' ? 'event_card' : 'encounter_card')}: ${card.name}`;
}

// Просмотр карты, выбранной в настройке (по текущему индексу)
function showGameConditionByIndex(type) {
  const card = conditionPool(type)[gameConditions[type]];
  if (card) showTraitPopup(conditionTitle(type, card), conditionPopupBody(type, card), false);
}

// Просмотр карты по имени (из состояния игры — для обоих игроков)
function showGameCondition(type, name) {
  const card = typeof GAME_EVENTS !== 'undefined' ? conditionPool(type).find(c => c.name === name) : null;
  if (card) showTraitPopup(conditionTitle(type, card), conditionPopupBody(type, card), false);
  else showTraitPopup(name, '—', false); // карта не найдена в локальной базе (устаревший клиент)
}

// Ряд настройки: подпись, выбор карты, переброс, просмотр
function conditionRowHTML(type) {
  const pool = conditionPool(type);
  const selId = type === 'ev' ? 'gameCondEv' : 'gameCondEn';
  return `
    <div class="game-cond-row">
      <span class="game-cond-label">${t(type === 'ev' ? 'event_card' : 'encounter_card')}</span>
      <select id="${selId}" class="game-select game-cond-select" onchange="setGameCondition('${type}', this.value)">
        ${pool.map((c, i) => `<option value="${i}"${i === gameConditions[type] ? ' selected' : ''}>${c.name}</option>`).join('')}
      </select>
      <button class="game-cond-btn" title="${t('reroll_random')}" onclick="rerollGameCondition('${type}')">🎲</button>
      <button class="game-cond-btn" title="${t('read_card')}" onclick="showGameConditionByIndex('${type}')">📖</button>
    </div>`;
}

// Блок условий текущей игры (ожидание и экран игры). Условия хранятся на сервере
// вместе с игрой и приходят обоим игрокам — блок одинаково виден хосту и гостю.
// Клик по карточке открывает полный текст условия.
function conditionsBarHTML(conditions) {
  if (!conditions || (!conditions.ev && !conditions.en)) return '';
  const card = (type, name) => name ? `
    <div class="game-cond-card" onclick="showGameCondition('${type}', '${name.replace(/'/g, "\\'")}')">
      <div class="game-cond-card-label">${t(type === 'ev' ? 'event_card' : 'encounter_card')}</div>
      <div class="game-cond-card-name">${name}</div>
      <div class="game-cond-card-hint">📖 ${t('tap_to_read')}</div>
    </div>` : '';
  return `<div class="game-cond-bar">${card('ev', conditions.ev)}${card('en', conditions.en)}</div>`;
}

// ======================== НАВИГАЦИЯ ========================
function showGame() {
  currentMode = 'game';
  $('mainMenu').style.display = 'none';
  $('cardsSection').style.display = 'none';
  $('builderSection').style.display = 'none';
  if ($('statsSection')) $('statsSection').style.display = 'none';
  $('gameSection').style.display = 'block';
  $('compendiumModal').classList.remove('active');
  renderGame();
}

function stopGamePolling() {
  if (gamePollTimer) { clearInterval(gamePollTimer); gamePollTimer = null; }
}

// ======================== РЕНДЕР ========================
// Панель условий (Event + Encounter): доступна ВСЕГДА — и без входа в профиль,
// и без ростеров. Профиль нужен только для создания/подключения к игре.
function conditionsPanelHTML() {
  if (typeof GAME_EVENTS === 'undefined' || typeof GAME_ENCOUNTERS === 'undefined') return '';
  ensureGameConditions();
  return `
    <div class="game-panel game-cond-panel">
      <div class="game-panel-title">${t('game_conditions')}</div>
      <p class="game-note">${t('game_conditions_hint')}</p>
      ${conditionRowHTML('ev')}
      ${conditionRowHTML('en')}
    </div>`;
}

async function renderGame() {
  const box = $('gameContent');
  if (!box) return;
  stopGamePolling();

  // Без профиля: условия игры доступны, а для создания/входа в игру — кнопка входа
  if (!currentUser) {
    box.innerHTML = `
      ${conditionsPanelHTML()}
      <div class="game-panel game-center">
        <p class="game-note">${t('game_login_note')}</p>
        <button class="rank-select-btn" onclick="openAuthModal()">${t('profile')}</button>
      </div>`;
    return;
  }

  // Возобновление активной игры после перезагрузки страницы
  const savedCode = localStorage.getItem(GAME_CODE_KEY);
  if (savedCode) {
    try {
      activeGame = await api('/api/games/' + savedCode);
      renderGameState();
      return;
    } catch (e) {
      localStorage.removeItem(GAME_CODE_KEY); // игра истекла или недоступна
      activeGame = null;
    }
  }

  renderGameSetup();
}

// Доступные ростеры: сохранения + текущий отряд из билдера
function gameRosterOptions() {
  const opts = mySaves.map((s, i) => ({ label: `${s.n} (${s.f})`, value: 'save:' + i }));
  if (typeof crew !== 'undefined' && crew.length && currentFaction) {
    opts.unshift({ label: t('current_crew'), value: 'crew' });
  }
  return opts;
}

function gameRosterByValue(value) {
  if (value === 'crew') return serializeCrew(`${currentFaction} · ${getCrewTotalRep()} Rep`);
  const idx = parseInt(String(value).replace('save:', ''), 10);
  return mySaves[idx] || null;
}

function rosterSelectHTML(id) {
  const opts = gameRosterOptions();
  if (!opts.length) return '';
  return `<select id="${id}" class="game-select">
    ${opts.map(o => `<option value="${o.value}">${o.label}</option>`).join('')}
  </select>`;
}

function renderGameSetup() {
  const box = $('gameContent');
  const selects = gameRosterOptions().length;

  box.innerHTML = `
    ${conditionsPanelHTML()}
    ${!selects ? `<div class="game-panel game-center"><p class="game-note">${t('no_rosters')}</p></div>` : `
    <div class="game-setup">
      <div class="game-panel">
        <div class="game-panel-title">${t('create_game')}</div>
        <p class="game-note">${t('create_game_hint')}</p>
        ${rosterSelectHTML('gameCreateRoster')}
        <button class="rank-select-btn" onclick="createGame()">${t('create_game')}</button>
      </div>
      <div class="game-panel">
        <div class="game-panel-title">${t('join_game')}</div>
        <p class="game-note">${t('join_game_hint')}</p>
        <input type="text" id="gameJoinCode" class="game-code-input" maxlength="6"
               placeholder="${t('game_code_placeholder')}" autocomplete="off"
               oninput="this.value = this.value.toUpperCase()">
        ${rosterSelectHTML('gameJoinRoster')}
        <button class="rank-select-btn" onclick="joinGame()">${t('join_game')}</button>
      </div>
    </div>`}`;
}

function renderGameState() {
  if (!activeGame) { renderGameSetup(); return; }
  if (!activeGame.guest) renderGameWait();
  else renderGamePlay();
}

function renderGameWait() {
  const box = $('gameContent');
  box.innerHTML = `
    <div class="game-panel game-center">
      <p class="game-note">${t('share_code_hint')}</p>
      <div class="game-code-display">${activeGame.code}</div>
      ${conditionsBarHTML(activeGame.conditions)}
      <p class="game-note game-waiting">⏳ ${t('waiting_opponent')}</p>
      <button class="save-btn save-btn-del" onclick="leaveGame()">${t('leave_game')}</button>
    </div>`;

  // Поллинг: ждём присоединения оппонента
  gamePollTimer = setInterval(async () => {
    try {
      activeGame = await api('/api/games/' + activeGame.code);
      if (activeGame.guest) {
        stopGamePolling();
        renderGamePlay();
      }
    } catch (e) {
      if (e.status === 404) { // игра истекла
        stopGamePolling();
        leaveGame();
      }
    }
  }, 3000);
}

// ======================== ТРЕКИНГ СОСТОЯНИЯ МОДЕЛЕЙ В ИГРЕ ========================
// Счётчики WILLPOWER/ENDURANCE и статусы KD/KO у каждой модели на экране игры.
// Состояние хранится локально на устройстве игрока (localStorage, ключ на код игры)
// и переживает перезагрузку страницы; при выходе из игры — очищается.
const GAME_STATE_PREFIX = 'bmg_game_state_';
let gameTrack = {};

function loadGameTrack() {
  try {
    gameTrack = JSON.parse(localStorage.getItem(GAME_STATE_PREFIX + activeGame.code)) || {};
  } catch (e) { gameTrack = {}; }
}

function saveGameTrack() {
  if (activeGame) localStorage.setItem(GAME_STATE_PREFIX + activeGame.code, JSON.stringify(gameTrack));
}

// Запись трекинга модели; при первом обращении инициализируется значениями с карточки.
// Максимумы (wm/em) пересчитываются при каждом рендере — на случай состояния,
// сохранённого старой версией без максимумов.
function trackEntry(side, index, model) {
  const key = side + ':' + index;
  const wMax = model && model.stats ? parseInt(model.stats.Willpower, 10) || 0 : 0;
  const eMax = model && model.stats ? parseInt(model.stats.Endurance, 10) || 0 : 0;
  if (!gameTrack[key]) {
    gameTrack[key] = { w: wMax, e: eMax, kd: 0, ko: 0 };
  }
  gameTrack[key].wm = wMax;
  gameTrack[key].em = eMax;
  return gameTrack[key];
}

function gmAdjust(side, index, field, delta) {
  const st = gameTrack[side + ':' + index];
  if (!st) return;
  // WIL/END нельзя поднять выше значения с карточки модели
  const max = field === 'w' ? (st.wm || 99) : field === 'e' ? (st.em || 99) : 99;
  st[field] = Math.max(0, Math.min(max, (st[field] || 0) + delta));
  const el = $(`gm-${side}-${index}-${field}`);
  if (el) el.textContent = st[field];
  saveGameTrack();
}

function gmToggle(side, index, field) {
  const st = gameTrack[side + ':' + index];
  if (!st) return;
  st[field] = st[field] ? 0 : 1;
  const btn = $(`gm-${side}-${index}-${field}`);
  if (btn) btn.classList.toggle('on', !!st[field]);
  // KO дополнительно приглушает всю строку модели
  if (field === 'ko') {
    const row = $(`gm-row-${side}-${index}`);
    if (row) row.classList.toggle('game-model-ko', !!st[field]);
  }
  saveGameTrack();
}

// Панель счётчиков и статусов под строкой модели
function trackControlsHTML(side, index, model) {
  const st = trackEntry(side, index, model);
  const counter = (field, label) => `
    <span class="gm-counter">${label}
      <button onclick="gmAdjust('${side}',${index},'${field}',-1)">−</button>
      <b id="gm-${side}-${index}-${field}">${st[field]}</b>
      <button onclick="gmAdjust('${side}',${index},'${field}',1)">+</button>
    </span>`;
  const status = field => `
    <button class="gm-status${st[field] ? ' on' : ''}" id="gm-${side}-${index}-${field}"
            onclick="gmToggle('${side}',${index},'${field}')">${field.toUpperCase()}</button>`;
  return `
    <div class="game-model-track" onclick="event.stopPropagation()">
      ${counter('w', 'WIL')}
      ${counter('e', 'END')}
      ${status('kd')}
      ${status('ko')}
    </div>`;
}

// ======================== ЭКРАН ИГРЫ ========================
// Разворачивает компактный ростер в список с данными моделей из data.js
function resolveRoster(roster) {
  const eqPool = equipmentByFaction[roster.f] || [];
  let totalRep = 0;
  const rows = (roster.m || []).map(entry => {
    const model = models.find(mm => mm.name === entry[0]) || null;
    const eqNames = entry[2] || [];
    let rep = model ? (model.rep || 0) : 0;
    eqNames.forEach(en => {
      const eq = eqPool.find(e => e.name === en);
      if (eq && eq.repCost) rep += eq.repCost;
    });
    totalRep += rep;
    return { name: entry[0], rank: CODE_TO_RANK[entry[1]] || entry[1], model, eqNames, rep };
  });
  return { rows, totalRep };
}

function rosterColumnHTML(player, titleKey, side) {
  const { rows, totalRep } = resolveRoster(player.roster);
  return `
    <div class="game-roster">
      <div class="game-roster-head">
        <div class="game-roster-title">${t(titleKey)}</div>
        <div class="game-roster-sub">👤 ${player.name} • ${player.roster.f} • ${totalRep} Rep</div>
      </div>
      ${rows.map((r, i) => {
        const st = trackEntry(side, i, r.model);
        return `
        <div class="game-model-row${r.model ? '' : ' game-model-missing'}${st.ko ? ' game-model-ko' : ''}"
             id="gm-row-${side}-${i}"
             ${r.model ? `onclick="showFullCard(models[${r.model._id}])"` : ''}>
          <img src="${r.model ? r.model.img : 'img/no.png'}" loading="lazy" decoding="async"
               onerror="this.src='img/no.png'">
          <div class="game-model-info">
            <div class="game-model-name">${r.name}</div>
            <div class="game-model-meta">${r.rank} • ${r.rep} Rep${r.eqNames.length ? ` • ${r.eqNames.join(', ')}` : ''}</div>
            ${trackControlsHTML(side, i, r.model)}
          </div>
        </div>`;
      }).join('')}
    </div>`;
}

function renderGamePlay() {
  const box = $('gameContent');
  const meIsHost = activeGame.host.name === currentUser;
  const me = meIsHost ? activeGame.host : activeGame.guest;
  const opp = meIsHost ? activeGame.guest : activeGame.host;

  loadGameTrack(); // счётчики и статусы этой игры (пережили перезагрузку страницы)

  box.innerHTML = `
    <div class="game-play-bar">
      <span class="game-play-code">${t('game_code')}: <b>${activeGame.code}</b></span>
      <button class="save-btn save-btn-del" onclick="leaveGame()">${t('leave_game')}</button>
    </div>
    ${conditionsBarHTML(activeGame.conditions)}
    <div class="game-play">
      ${rosterColumnHTML(me, 'your_roster', meIsHost ? 'host' : 'guest')}
      ${rosterColumnHTML(opp, 'opponent_roster', meIsHost ? 'guest' : 'host')}
    </div>`;
  saveGameTrack(); // фиксируем инициализированные значения
}

// ======================== ДЕЙСТВИЯ ========================
async function createGame() {
  const sel = $('gameCreateRoster');
  const roster = sel ? gameRosterByValue(sel.value) : null;
  if (!roster) { alert(t('no_rosters')); return; }
  let conditions = null;
  if (typeof GAME_EVENTS !== 'undefined' && typeof GAME_ENCOUNTERS !== 'undefined') {
    ensureGameConditions();
    conditions = {
      ev: GAME_EVENTS[gameConditions.ev].name,
      en: GAME_ENCOUNTERS[gameConditions.en].name
    };
  }
  try {
    const { code } = await api('/api/games', 'POST', { roster, conditions });
    localStorage.setItem(GAME_CODE_KEY, code);
    activeGame = { code, conditions, host: { name: currentUser, roster }, guest: null };
    renderGameWait();
  } catch (e) {
    alert(apiErrorText(e));
  }
}

async function joinGame() {
  const code = ($('gameJoinCode').value || '').trim().toUpperCase();
  if (code.length !== 6) { alert(t('game_not_found')); return; }
  const sel = $('gameJoinRoster');
  const roster = sel ? gameRosterByValue(sel.value) : null;
  if (!roster) { alert(t('no_rosters')); return; }
  try {
    activeGame = await api('/api/games/join', 'POST', { code, roster });
    localStorage.setItem(GAME_CODE_KEY, code);
    renderGamePlay();
  } catch (e) {
    alert(apiErrorText(e));
  }
}

function leaveGame() {
  stopGamePolling();
  if (activeGame) localStorage.removeItem(GAME_STATE_PREFIX + activeGame.code); // счётчики этой игры
  localStorage.removeItem(GAME_CODE_KEY);
  activeGame = null;
  gameTrack = {};
  gameConditions = null; // при следующей настройке условия перебросятся заново
  renderGameSetup();
}
