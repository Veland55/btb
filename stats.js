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
  $('mainMenu').style.display = 'none';
  $('cardsSection').style.display = 'none';
  $('builderSection').style.display = 'none';
  if ($('gameSection')) $('gameSection').style.display = 'none';
  if ($('tournamentsSection')) $('tournamentsSection').style.display = 'none';
  $('statsSection').style.display = 'block';
  $('compendiumModal').classList.remove('active');
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

function statsHTML(d) {
  const tiles = `
    <div class="stats-tiles">
      ${statTile('👤', d.users, 'stats_total_users')}
      ${statTile('💾', d.rosters, 'stats_total_rosters')}
      ${statTile('🎲', d.games, 'stats_total_games')}
      ${statTile('🏆', d.resultsTotal || 0, 'stats_total_results')}
      ${statTile('📅', d.tournamentsTotal || 0, 'stats_total_tournaments')}
      ${statTile('👥', d.avgCrewSize || 0, 'stats_avg_crew')}
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

function statTile(icon, value, labelKey) {
  return `
    <div class="stats-tile">
      <div class="stats-tile-icon">${icon}</div>
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
        <div class="stats-row-name">${nameFn ? nameFn(name) : name}</div>
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
  const icon = (typeof FACTION_ICON_MAP !== 'undefined' && FACTION_ICON_MAP[faction]) || 'UNKNOWN.png';
  return `<img class="stats-row-img stats-row-faction" src="img/menu/${icon}" alt="" decoding="async">`;
}

function modelRowLeftHTML(name) {
  const model = (typeof models !== 'undefined') && models.find(m => m.name === name);
  const src = (model && model.img) || 'img/no.png';
  return `<img class="stats-row-img stats-row-photo" src="${src}" alt="" decoding="async" onerror="this.src='img/no.png'">`;
}

function countryRowLeftHTML(code) {
  return `<span class="stats-row-flag">${countryFlag(code)}</span>`;
}

function locationRowLeftHTML() {
  return `<span class="stats-row-flag">📍</span>`;
}
