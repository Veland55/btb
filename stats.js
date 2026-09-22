// ==================================================================
// BMG — РАЗДЕЛ "СТАТИСТИКА" (данные считает сервер, см. GET /api/stats)
// Агрегаты по всем пользователям: популярные фракции, модели и боссы
// из сохранённых ростеров, география игроков (страна из профиля),
// общие счётчики (игроки / ростеры / игры).
// ==================================================================

// Страны профиля: ISO 3166-1 alpha-2. Названия локализуются браузером
// (Intl.DisplayNames) — отдельные переводы списку не нужны.
const COUNTRY_CODES = [
  'AR','AM','AU','AT','AZ','BY','BE','BG','BR','CA','CH','CL','CN','CO','CZ',
  'DE','DK','EE','EG','ES','FI','FR','GB','GE','GR','HR','HU','ID','IE','IL',
  'IN','IS','IT','JP','KR','KZ','LT','LU','LV','MD','MX','MY','NL','NO','NZ',
  'PE','PH','PL','PT','RO','RS','RU','SE','SG','SI','SK','TH','TR','TW','UA',
  'US','UY','UZ','VN','ZA'
];

// Экранирование: в панели-рейтинги попадают строки, введённые пользователями
// (адрес турнира, название фракции и модели из сохранённых ростеров). Без этого
// любой посетитель раздела «Статистика» выполнил бы чужой скрипт в нашем origin.
const sEsc = escHtml;

// Флаг-эмодзи из кода страны (пара региональных индикаторов)
function countryFlag(code) {
  return String.fromCodePoint(...[...code.toUpperCase()].map(c => 0x1F1E6 + c.charCodeAt(0) - 65));
}

// Локализованное название страны на текущем языке интерфейса
function countryName(code) {
  try {
    return new Intl.DisplayNames([currentLang === 'ru' ? 'ru' : 'en'], { type: 'region' }).of(code) || code;
  } catch (e) {
    return code;
  }
}

// Список стран для селекта профиля — отсортирован по локализованному названию
function countryOptionsHTML(selected) {
  const items = COUNTRY_CODES
    .map(code => [code, countryName(code)])
    .sort((a, b) => a[1].localeCompare(b[1], currentLang === 'ru' ? 'ru' : 'en'));
  return [`<option value="">${t('country_not_set')}</option>`]
    .concat(items.map(([code, name]) =>
      `<option value="${code}" ${code === selected ? 'selected' : ''}>${countryFlag(code)} ${name}</option>`))
    .join('');
}

// ======================== НАВИГАЦИЯ ========================
function showStats() {
  currentMode = 'stats';
  showSection('statsSection');
  renderStats();
}

// ======================== РЕНДЕР ========================
async function renderStats() {
  const box = $('statsContent');
  if (!box) return;
  box.innerHTML = `<p class="stats-loading">${t('stats_loading')}</p>`;

  let data;
  try {
    data = await api('/api/stats');
  } catch (e) {
    box.innerHTML = `<div class="game-panel game-center"><p class="game-note">${apiErrorText(e)}</p></div>`;
    return;
  }
  box.innerHTML = statsHTML(data);
}

// Те же монохромные SVG-иконки, что и в главном меню (см. index.html) — раньше
// плитки статистики рисовались платформенными emoji (🎲/🏆/…), которые на
// разных ОС/в Telegram выглядят по-разному и выбивались из единого
// красно-золотого визуального языка остальных разделов.
const STATS_ICON_USERS = "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z";
const STATS_ICON_SAVE = "M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z";
const STATS_ICON_DICE = "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM8.5 15.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0-7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm3.5 3.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm3.5 3.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0-7a1.5 1.5 0 110-3 1.5 1.5 0 010 3z";
const STATS_ICON_TROPHY = "M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.95V18H8v2h8v-2h-3v-2.11c1.63-.32 2.98-1.45 3.61-2.95C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z";
const STATS_ICON_CALENDAR = "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z";
const STATS_ICON_GROUP = "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z";

function statsHTML(d) {
  const tiles = `
    <div class="stats-tiles">
      ${statTile(STATS_ICON_USERS, d.users, 'stats_total_users')}
      ${statTile(STATS_ICON_SAVE, d.rosters, 'stats_total_rosters')}
      ${statTile(STATS_ICON_DICE, d.games, 'stats_total_games')}
      ${statTile(STATS_ICON_TROPHY, d.resultsTotal || 0, 'stats_total_results')}
      ${statTile(STATS_ICON_CALENDAR, d.tournamentsTotal || 0, 'stats_total_tournaments')}
      ${statTile(STATS_ICON_GROUP, d.avgCrewSize || 0, 'stats_avg_crew')}
    </div>`;

  if (!d.rosters && !d.countries.length) {
    return tiles + `<div class="game-panel game-center"><p class="game-note">${t('stats_empty')}</p></div>`;
  }

  // Победители турниров: [имя, побед, странаISO] — флаг страны рядом с именем
  const playerCountry = new Map((d.topPlayers || []).map(e => [e[0], e[2]]));
  const playerFlagLeftHTML = name => {
    const c = playerCountry.get(name);
    return `<span class="stats-row-flag">${c ? countryFlag(c) : '👤'}</span>`;
  };

  return tiles
    + rankPanelHTML(t('stats_top_players'), t('stats_top_players_note'),
        (d.topPlayers || []).map(e => [e[0], e[1]]), playerFlagLeftHTML)
    + rankPanelHTML(t('stats_win_rating'), t('stats_wins_note'), d.winners || [], modelRowLeftHTML)
    + rankPanelHTML(t('stats_top_factions'), t('stats_source_note'), d.factions, factionRowLeftHTML)
    + rankPanelHTML(t('stats_top_models'), t('stats_source_note'), d.models, modelRowLeftHTML)
    + rankPanelHTML(t('stats_top_bosses'), t('stats_bosses_note'), d.bosses, modelRowLeftHTML)
    + rankPanelHTML(t('stats_tournament_geo'), t('stats_tournament_geo_note'), d.locations || [], locationRowLeftHTML)
    + rankPanelHTML(t('stats_geography'), t('stats_geo_note'), d.countries, countryRowLeftHTML, countryName);
}

function statTile(iconPath, value, labelKey) {
  return `
    <div class="stats-tile">
      <div class="stats-tile-icon"><svg viewBox="0 0 24 24"><path d="${iconPath}"/></svg></div>
      <div class="stats-tile-value">${value}</div>
      <div class="stats-tile-label">${t(labelKey)}</div>
    </div>`;
}

// Панель-рейтинг: строки с местом, картинкой/флагом, названием и полосой-баром.
// leftHTML(name) отдаёт картинку строки — иконку фракции, фото модели или флаг;
// nameFn превращает ключ в подпись (код страны → локализованное название).
function rankPanelHTML(title, note, entries, leftHTML, nameFn) {
  if (!entries || !entries.length) return '';
  const max = entries[0][1] || 1;
  const rows = entries.map(([name, count], i) => `
    <div class="stats-row ${i === 0 ? 'is-top' : ''}">
      <div class="stats-row-place">${i + 1}</div>
      ${leftHTML(name)}
      <div class="stats-row-main">
        <div class="stats-row-name">${sEsc(nameFn ? nameFn(name) : name)}</div>
        <div class="stats-row-bar"><div class="stats-row-fill" style="width:${Math.max(4, Math.round(count / max * 100))}%"></div></div>
      </div>
      <div class="stats-row-count">${count}</div>
    </div>`).join('');
  return `
    <div class="game-panel stats-panel">
      <div class="game-panel-title">${title}</div>
      <p class="game-note">${note}</p>
      <div class="stats-rows">${rows}</div>
    </div>`;
}

function factionRowLeftHTML(faction) {
  const icon = (typeof FACTION_ICON_MAP !== 'undefined' && FACTION_ICON_MAP[faction]) || 'UNKNOWN.webp';
  return `<img class="stats-row-img stats-row-faction" src="img/menu/${icon}" alt="" decoding="async">`;
}

function modelRowLeftHTML(name) {
  // имя приходит из агрегатов сервера — оно могло быть сохранено до переименования
  const model = (typeof findModelByStoredName === 'function') && findModelByStoredName(name);
  const src = (model && model.img) || 'img/no.webp';
  return `<img class="stats-row-img stats-row-photo" src="${sEsc(src)}" alt="" loading="lazy" decoding="async" onerror="this.src='img/no.webp'">`;
}

function countryRowLeftHTML(code) {
  return `<span class="stats-row-flag">${countryFlag(code)}</span>`;
}

function locationRowLeftHTML() {
  return `<span class="stats-row-flag">📍</span>`;
}
