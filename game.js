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

// ======================== НАВИГАЦИЯ ========================
function showGame() {
  currentMode = 'game';
  $('mainMenu').style.display = 'none';
  $('cardsSection').style.display = 'none';
  $('builderSection').style.display = 'none';
  $('gameSection').style.display = 'block';
  $('compendiumModal').classList.remove('active');
  renderGame();
}

function stopGamePolling() {
  if (gamePollTimer) { clearInterval(gamePollTimer); gamePollTimer = null; }
}

// ======================== РЕНДЕР ========================
async function renderGame() {
  const box = $('gameContent');
  if (!box) return;
  stopGamePolling();

  // Нужен профиль
  if (!currentUser) {
    box.innerHTML = `
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

function rosterColumnHTML(player, titleKey) {
  const { rows, totalRep } = resolveRoster(player.roster);
  return `
    <div class="game-roster">
      <div class="game-roster-head">
        <div class="game-roster-title">${t(titleKey)}</div>
        <div class="game-roster-sub">👤 ${player.name} • ${player.roster.f} • ${totalRep} Rep</div>
      </div>
      ${rows.map(r => `
        <div class="game-model-row${r.model ? '' : ' game-model-missing'}"
             ${r.model ? `onclick="showFullCard(models[${r.model._id}])"` : ''}>
          <img src="${r.model ? r.model.img : 'img/no.png'}" loading="lazy" decoding="async"
               onerror="this.src='img/no.png'">
          <div class="game-model-info">
            <div class="game-model-name">${r.name}</div>
            <div class="game-model-meta">${r.rank} • ${r.rep} Rep${r.eqNames.length ? ` • ${r.eqNames.join(', ')}` : ''}</div>
          </div>
        </div>`).join('')}
    </div>`;
}

function renderGamePlay() {
  const box = $('gameContent');
  const meIsHost = activeGame.host.name === currentUser;
  const me = meIsHost ? activeGame.host : activeGame.guest;
  const opp = meIsHost ? activeGame.guest : activeGame.host;

  box.innerHTML = `
    <div class="game-play-bar">
      <span class="game-play-code">${t('game_code')}: <b>${activeGame.code}</b></span>
      <button class="save-btn save-btn-del" onclick="leaveGame()">${t('leave_game')}</button>
    </div>
    <div class="game-play">
      ${rosterColumnHTML(me, 'your_roster')}
      ${rosterColumnHTML(opp, 'opponent_roster')}
    </div>`;
}

// ======================== ДЕЙСТВИЯ ========================
async function createGame() {
  const sel = $('gameCreateRoster');
  const roster = sel ? gameRosterByValue(sel.value) : null;
  if (!roster) { alert(t('no_rosters')); return; }
  try {
    const { code } = await api('/api/games', 'POST', { roster });
    localStorage.setItem(GAME_CODE_KEY, code);
    activeGame = { code, host: { name: currentUser, roster }, guest: null };
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
  localStorage.removeItem(GAME_CODE_KEY);
  activeGame = null;
  renderGameSetup();
}
