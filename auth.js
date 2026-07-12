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
let authToken = localStorage.getItem(AUTH_TOKEN_KEY) || null;
let mySaves = [];        // локальный кэш сохранений текущего пользователя

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
    own_game: 'game_own'
  };
  return t(map[e && e.error] || 'server_error');
}

// ======================== АУТЕНТИФИКАЦИЯ ========================
async function authRegister(name, pass) {
  const data = await api('/api/register', 'POST', { name, pass });
  authToken = data.token;
  currentUser = data.name;
  localStorage.setItem(AUTH_TOKEN_KEY, authToken);
  mySaves = [];
}

async function authLogin(name, pass) {
  const data = await api('/api/login', 'POST', { name, pass });
  authToken = data.token;
  currentUser = data.name;
  localStorage.setItem(AUTH_TOKEN_KEY, authToken);
  await refreshSaves();
}

function authLogout() {
  if (authToken) api('/api/logout', 'POST', {}).catch(() => {});
  authToken = null;
  currentUser = null;
  mySaves = [];
  localStorage.removeItem(AUTH_TOKEN_KEY);
  renderAuthModal();
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
function serializeCrew(name) {
  return {
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
  // Если модалку открывали из раздела ИГРА — после входа перерисовываем его
  if (typeof renderGame === 'function' && currentMode === 'game') renderGame();
}

function renderAuthModal() {
  const box = document.getElementById('authModalBody');
  if (!box) return;

  if (!currentUser) {
    box.innerHTML = `
      <div class="auth-form">
        <input type="text" id="authName" maxlength="20" autocomplete="username"
               placeholder="${t('username')}">
        <input type="password" id="authPass" maxlength="64" autocomplete="current-password"
               placeholder="${t('password')}">
        <div class="auth-buttons">
          <button class="rank-select-btn" onclick="authSubmit(false)">${t('login')}</button>
          <button class="rank-select-btn" onclick="authSubmit(true)">${t('register')}</button>
        </div>
        <p class="auth-note">${t('auth_server_note')}</p>
      </div>`;
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
    <div class="saves-title">${t('my_crews')}</div>
    ${rows || `<p class="auth-note">${t('no_saves')}</p>`}`;
}

async function authSubmit(isRegister) {
  const name = document.getElementById('authName').value.trim();
  const pass = document.getElementById('authPass').value;
  if (!name || !pass) { alert(t('auth_fill_fields')); return; }
  try {
    if (isRegister) await authRegister(name, pass);
    else await authLogin(name, pass);
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
    currentUser = (await api('/api/me')).name;
    await refreshSaves();
  } catch (e) {
    if (e.status === 401) { // токен протух
      authToken = null;
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
  }
});
