// ==================================================================
// BMG — ПРОФИЛИ И СОХРАНЕНИЯ ОТРЯДОВ (клиент API, см. server.js)
// Аккаунты и сохранения хранятся на сервере (data/bmg.db), в браузере —
// только токен сессии. Лимит: MAX_SAVES сохранений на пользователя.
//
// Компактный формат сохранения (~200–400 байт на отряд):
//   { n:имя, f:фракция, r:лимитRep, d:дата(в днях), b:индекс босса,
//     m:[[имяМодели, кодРанга, [снаряжение...]?], ...] }
// Данные моделей не копируются — только имена-ссылки на data.js.
// ==================================================================

const MAX_SAVES = 5;
const AUTH_TOKEN_KEY = 'bmg_token';

// Короткие коды рангов — экономия места в сохранениях
const RANK_TO_CODE = { "Leader": "L", "Sidekick": "S", "Henchman": "H", "Free Agent": "F", "Vehicle": "V" };
const CODE_TO_RANK = { L: "Leader", S: "Sidekick", H: "Henchman", F: "Free Agent", V: "Vehicle" };

let currentUser = null;
let currentUserCountry = null; // ISO-код страны из профиля (для статистики)
let currentUserEmail = null;   // email из профиля (нужен для восстановления пароля)
let authToken = localStorage.getItem(AUTH_TOKEN_KEY) || null;
let mySaves = [];        // локальный кэш сохранений текущего пользователя

// Экран модалки для незалогиненного пользователя: обычный вход/регистрация
// или один из двух шагов восстановления пароля по коду с почты
let authView = 'login';   // 'login' | 'forgot-request' | 'forgot-code'
let authResetName = '';   // имя аккаунта, для которого запрошен код (шаг 2)

// ======================== API-КЛИЕНТ ========================
async function api(pathname, method = 'GET', body) {
  let res;
  try {
    res = await fetch(pathname, {
      method,
      headers: {
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(authToken ? { 'Authorization': 'Bearer ' + authToken } : {})
      },
      body: body ? JSON.stringify(body) : undefined
    });
  } catch (e) {
    throw { error: 'network' }; // сервер недоступен / открыто без сервера
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw { status: res.status, error: data.error || 'server' };
  return data;
}

// Человекочитаемое сообщение об ошибке API
function apiErrorText(e) {
  const map = {
    network: 'server_unreachable',
    exists: 'auth_user_exists',
    badcred: 'auth_bad_credentials',
    input: 'auth_fill_fields',
    limit: 'saves_limit',
    auth: 'login_required',
    notfound: 'game_not_found',
    full: 'game_full',
    own_game: 'game_own',
    tn_joined: 'tn_already_joined',
    tn_full: 'tn_full_msg',
    tn_limit: 'tn_limit_msg',
    tn_started: 'tn_started_msg',
    tn_few: 'tn_need_players',
    tn_locked: 'tn_locked_msg',
    reset_user_notfound: 'reset_user_notfound',
    reset_no_email: 'reset_no_email',
    reset_rate_limited: 'reset_rate_limited',
    reset_mail_failed: 'reset_mail_failed',
    reset_code_expired: 'reset_code_expired',
    reset_bad_code: 'reset_bad_code'
  };
  return t(map[e && e.error] || 'server_error');
}

// ======================== АУТЕНТИФИКАЦИЯ ========================
async function authRegister(name, pass, email) {
  const data = await api('/api/register', 'POST', { name, pass, email: email || null });
  authToken = data.token;
  currentUser = data.name;
  currentUserCountry = data.country || null;
  currentUserEmail = data.email || null;
  localStorage.setItem(AUTH_TOKEN_KEY, authToken);
  mySaves = [];
}

async function authLogin(name, pass) {
  const data = await api('/api/login', 'POST', { name, pass });
  authToken = data.token;
  currentUser = data.name;
  currentUserCountry = data.country || null;
  currentUserEmail = data.email || null;
  localStorage.setItem(AUTH_TOKEN_KEY, authToken);
  await refreshSaves();
}

function authLogout() {
  if (authToken) api('/api/logout', 'POST', {}).catch(() => {});
  authToken = null;
  currentUser = null;
  currentUserCountry = null;
  currentUserEmail = null;
  mySaves = [];
  localStorage.removeItem(AUTH_TOKEN_KEY);
  renderAuthModal();
}

// Email профиля: используется для восстановления пароля, нигде не публикуется
async function setUserEmail() {
  const input = document.getElementById('authEmailInput');
  const email = (input.value || '').trim();
  try {
    await api('/api/profile', 'PUT', { email: email || null });
    currentUserEmail = email || null;
    alert(t('email_saved'));
  } catch (e) {
    alert(apiErrorText(e));
  }
}

// ======================== ВОССТАНОВЛЕНИЕ И СМЕНА ПАРОЛЯ ========================
async function requestPasswordReset() {
  const name = (document.getElementById('resetName').value || '').trim();
  if (!name) { alert(t('auth_fill_fields')); return; }
  try {
    await api('/api/forgot-password', 'POST', { name });
    authResetName = name;
    authView = 'forgot-code';
    renderAuthModal();
    alert(t('forgot_code_sent'));
  } catch (e) {
    alert(apiErrorText(e));
  }
}

async function submitPasswordReset() {
  const code = (document.getElementById('resetCode').value || '').trim();
  const newPass = document.getElementById('resetNewPass').value;
  if (!code || !newPass) { alert(t('auth_fill_fields')); return; }
  try {
    await api('/api/reset-password', 'POST', { name: authResetName, code, newPass });
    alert(t('forgot_reset_done'));
    authView = 'login';
    renderAuthModal();
  } catch (e) {
    alert(apiErrorText(e));
  }
}

// Смена пароля из профиля (пользователь уже вошёл и знает текущий пароль)
async function submitChangePassword() {
  const oldPass = document.getElementById('cpOld').value;
  const newPass = document.getElementById('cpNew').value;
  const confirmPass = document.getElementById('cpConfirm').value;
  if (!oldPass || !newPass) { alert(t('auth_fill_fields')); return; }
  if (newPass !== confirmPass) { alert(t('password_mismatch')); return; }
  try {
    await api('/api/change-password', 'POST', { oldPass, newPass });
    alert(t('password_changed'));
    ['cpOld', 'cpNew', 'cpConfirm'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  } catch (e) {
    alert(apiErrorText(e));
  }
}

// Страна профиля: селект в модалке профиля, учитывается в разделе СТАТИСТИКА
async function setUserCountry(code) {
  const prev = currentUserCountry;
  currentUserCountry = code || null;
  try {
    await api('/api/profile', 'PUT', { country: currentUserCountry });
  } catch (e) {
    currentUserCountry = prev; // сервер отказал — откатываем
    alert(apiErrorText(e));
    renderAuthModal();
  }
}

async function refreshSaves() {
  if (!currentUser) { mySaves = []; return; }
  mySaves = (await api('/api/saves')).saves || [];
}

async function pushSaves() {
  await api('/api/saves', 'PUT', { saves: mySaves });
}

// ======================== СОХРАНЕНИЯ ========================
// Компактная сериализация текущего отряда билдера
// (o — колода карт целей: [[id, копий], ...], поле есть только если колода не пуста)
function serializeCrew(name) {
  const record = {
    n: name,
    f: currentFaction,
    r: BMG_REP_LIMIT,
    d: Math.floor(Date.now() / 86400000),
    b: crew.indexOf(BMG_BOSS),
    m: crew.map(m => {
      const entry = [m.name, RANK_TO_CODE[m.rankUsed] || m.rankUsed];
      const eq = (m.equipment || []).map(e => e.name);
      if (eq.length) entry.push(eq);
      return entry;
    })
  };
  if (typeof crewCards !== 'undefined' && Object.keys(crewCards).length) {
    record.o = Object.entries(crewCards).map(([id, count]) => [id, count]);
  }
  return record;
}

async function saveCurrentCrew() {
  if (!currentUser) { openAuthModal(); return; }
  if (!crew.length) { alert(t('empty_crew_save')); return; }

  const def = `${currentFaction} · ${getCrewTotalRep()} Rep`;
  const input = prompt(t('save_name_prompt'), def);
  if (input === null) return;
  const name = (input.trim() || def).slice(0, 40);

  const record = serializeCrew(name);
  const existing = mySaves.findIndex(s => s.n === name);
  const backup = mySaves.slice();
  if (existing !== -1) {
    mySaves[existing] = record; // то же имя — перезапись, слот не тратится
  } else if (mySaves.length >= MAX_SAVES) {
    alert(t('saves_limit'));
    openAuthModal();
    return;
  } else {
    mySaves.push(record);
  }

  try {
    await pushSaves();
    alert(t('save_done'));
  } catch (e) {
    mySaves = backup; // сервер отказал — откатываем кэш
    alert(apiErrorText(e));
  }
}

async function deleteSavedCrew(index) {
  const s = mySaves[index];
  if (!s || !confirm(t('confirm_delete_save', { name: s.n }))) return;
  const backup = mySaves.slice();
  mySaves.splice(index, 1);
  try {
    await pushSaves();
  } catch (e) {
    mySaves = backup;
    alert(apiErrorText(e));
  }
  renderAuthModal();
}

// Восстановление отряда из сохранения в билдер
function restoreCrewFromSave(s) {
  showBuilder();
  selectFaction(s.f);

  BMG_REP_LIMIT = s.r || 350;
  const repInput = document.getElementById('repLimit');
  if (repInput) repInput.value = BMG_REP_LIMIT;

  crew = [];
  BMG_BOSS = null;
  BMG_AFFILIATIONS = null;

  let skipped = 0;
  const eqPool = equipmentByFaction[s.f] || [];
  s.m.forEach((entry, i) => {
    const base = models.find(mm => mm.name === entry[0]);
    if (!base) { skipped++; return; } // модель могла исчезнуть из базы
    const cloned = {
      ...base,
      rankUsed: CODE_TO_RANK[entry[1]] || entry[1],
      uniqueId: Date.now() + Math.random(),
      equipment: (entry[2] || [])
        .map(en => { const eq = eqPool.find(e => e.name === en); return eq ? { ...eq } : null; })
        .filter(Boolean)
    };
    crew.push(cloned);
    if (i === s.b) BMG_BOSS = cloned;
  });

  if (!BMG_BOSS) {
    BMG_BOSS = crew.find(m => m.rankUsed === 'Leader' || m.rankUsed === 'Sidekick') || null;
  }
  if (BMG_BOSS) {
    // Та же логика, что при найме (Contractor меняет аффилиацию на Bane)
    BMG_AFFILIATIONS = (BMG_BOSS.rankUsed === 'Leader' && BMG_BOSS.traits.includes('Contractor'))
      ? ['Bane']
      : getFactions(BMG_BOSS);
  }

  // Колода карт целей (карты, исчезнувшие из каталога, тихо пропускаются)
  if (typeof crewCards !== 'undefined') {
    crewCards = {};
    (s.o || []).forEach(([id, count]) => {
      if (objCardById(id)) crewCards[id] = count;
    });
    updateDeckBadge();
  }

  updateCrewEquipmentCounts();
  modifiers = calculateModifiers();
  updateCrewBar();
  renderMiniCardsBuilder();

  if (skipped) alert(t('models_skipped'));
}

function loadSavedCrew(index) {
  const s = mySaves[index];
  if (!s) return;
  closeAuthModal();
  restoreCrewFromSave(s);
}

// ======================== МОДАЛКА ПРОФИЛЯ ========================
function openAuthModal() {
  renderAuthModal();
  document.getElementById('authModal').classList.add('active');
}
function closeAuthModal() {
  document.getElementById('authModal').classList.remove('active');
  // Следующее открытие модалки для незалогиненного — снова обычный вход,
  // а не середина прерванного восстановления пароля
  authView = 'login';
  // Если модалку открывали из раздела ИГРА — после входа перерисовываем его
  if (typeof renderGame === 'function' && currentMode === 'game') renderGame();
}

// Экранирование для вставки пользовательского текста в HTML-атрибуты/разметку
function authEsc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Форма для незалогиненного пользователя: вход/регистрация или один из двух
// шагов восстановления пароля (см. authView)
function renderAuthLoggedOutHTML() {
  if (authView === 'forgot-request') {
    return `
      <div class="auth-form">
        <p class="auth-note">${t('forgot_request_hint')}</p>
        <input type="text" id="resetName" maxlength="20" autocomplete="username" placeholder="${t('username')}">
        <div class="auth-buttons">
          <button class="rank-select-btn" onclick="requestPasswordReset()">${t('forgot_send_code')}</button>
          <button class="save-btn" onclick="authView='login';renderAuthModal()">${t('back')}</button>
        </div>
      </div>`;
  }
  if (authView === 'forgot-code') {
    return `
      <div class="auth-form">
        <p class="auth-note">${t('forgot_code_hint', { name: authResetName })}</p>
        <input type="text" id="resetCode" maxlength="6" inputmode="numeric" autocomplete="one-time-code"
               placeholder="${t('forgot_code_placeholder')}">
        <input type="password" id="resetNewPass" maxlength="64" autocomplete="new-password"
               placeholder="${t('forgot_new_password')}">
        <div class="auth-buttons">
          <button class="rank-select-btn" onclick="submitPasswordReset()">${t('forgot_reset_btn')}</button>
          <button class="save-btn" onclick="authView='forgot-request';renderAuthModal()">${t('back')}</button>
        </div>
      </div>`;
  }
  return `
    <div class="auth-form">
      <input type="text" id="authName" maxlength="20" autocomplete="username"
             placeholder="${t('username')}">
      <input type="password" id="authPass" maxlength="64" autocomplete="current-password"
             placeholder="${t('password')}">
      <input type="email" id="authEmail" maxlength="254" autocomplete="email"
             placeholder="${t('email_placeholder_optional')}">
      <p class="auth-note">${t('register_email_hint')}</p>
      <div class="auth-buttons">
        <button class="rank-select-btn" onclick="authSubmit(false)">${t('login')}</button>
        <button class="rank-select-btn" onclick="authSubmit(true)">${t('register')}</button>
      </div>
      <p class="auth-forgot-link" onclick="authView='forgot-request';renderAuthModal()">${t('forgot_password_link')}</p>
      <p class="auth-note">${t('auth_server_note')}</p>
    </div>`;
}

function renderAuthModal() {
  const box = document.getElementById('authModalBody');
  if (!box) return;

  if (!currentUser) {
    box.innerHTML = renderAuthLoggedOutHTML();
    return;
  }

  const rows = mySaves.map((s, i) => `
    <div class="save-row">
      <div class="save-info">
        <div class="save-name">${s.n}</div>
        <div class="save-meta">${s.f} • ${s.m.length} ${t('models_word')} • ${s.r} Rep • ${new Date((s.d || 0) * 86400000).toLocaleDateString()}</div>
      </div>
      <div class="save-actions">
        <button class="save-btn" onclick="loadSavedCrew(${i})">${t('load')}</button>
        <button class="save-btn save-btn-del" onclick="deleteSavedCrew(${i})">✕</button>
      </div>
    </div>`).join('');

  box.innerHTML = `
    <div class="auth-profile-head">
      <span class="auth-username">👤 ${currentUser}</span>
      <span class="auth-slots">${mySaves.length} / ${MAX_SAVES}</span>
      <button class="save-btn" onclick="authLogout()">${t('logout')}</button>
    </div>
    <div class="auth-country-row">
      <span class="auth-country-label">${t('your_country')}</span>
      <select class="game-select auth-country-select" onchange="setUserCountry(this.value)">
        ${countryOptionsHTML(currentUserCountry)}
      </select>
    </div>
    <p class="auth-note">${t('country_stats_hint')}</p>

    <div class="auth-email-row">
      <input type="email" id="authEmailInput" class="game-select" maxlength="254"
             placeholder="${t('email_placeholder')}" value="${authEsc(currentUserEmail)}">
      <button class="save-btn" onclick="setUserEmail()">${t('email_save_btn')}</button>
    </div>
    <p class="auth-note">${t('email_hint')}</p>

    <details class="auth-change-pass">
      <summary>${t('change_password_title')}</summary>
      <div class="auth-form">
        <input type="password" id="cpOld" maxlength="64" autocomplete="current-password" placeholder="${t('current_password')}">
        <input type="password" id="cpNew" maxlength="64" autocomplete="new-password" placeholder="${t('new_password')}">
        <input type="password" id="cpConfirm" maxlength="64" autocomplete="new-password" placeholder="${t('confirm_password')}">
        <button class="rank-select-btn" onclick="submitChangePassword()">${t('change_password_btn')}</button>
      </div>
    </details>

    <div class="saves-title">${t('my_crews')}</div>
    ${rows || `<p class="auth-note">${t('no_saves')}</p>`}`;
}

async function authSubmit(isRegister) {
  const name = document.getElementById('authName').value.trim();
  const pass = document.getElementById('authPass').value;
  if (!name || !pass) { alert(t('auth_fill_fields')); return; }
  try {
    if (isRegister) {
      // Email при регистрации необязателен — только для восстановления пароля
      const emailInput = document.getElementById('authEmail');
      const email = emailInput ? emailInput.value.trim() : '';
      await authRegister(name, pass, email || null);
    } else {
      await authLogin(name, pass);
    }
    renderAuthModal();
  } catch (e) {
    alert(apiErrorText(e));
  }
}

// Восстановление сессии при старте (токен проверяется на сервере)
document.addEventListener('DOMContentLoaded', async () => {
  const modal = document.getElementById('authModal');
  if (modal) modal.onclick = e => { if (e.target === modal) closeAuthModal(); };

  if (!authToken) return;
  try {
    const me = await api('/api/me');
    currentUser = me.name;
    currentUserCountry = me.country || null;
    currentUserEmail = me.email || null;
    await refreshSaves();
  } catch (e) {
    if (e.status === 401) { // токен протух
      authToken = null;
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
  }
});
