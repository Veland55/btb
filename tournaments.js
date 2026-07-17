// ==================================================================
// BMG — РАЗДЕЛ "ТУРНИРЫ" (серверная часть — server.js /api/tournaments*)
// Две роли:
//   • организатор — создаёт мероприятие: адрес (уходит в статистику
//     «география турниров»), даты и время, лимит участников + резервные
//     места сверх лимита, ник организатора и свободная информация;
//   • участник — регистрируется на турнир и подаёт два ростера по
//     правилам турнирного формата Batmatch (см. TOURNAMENT_RULES).
// ==================================================================

// Правила Batmatch: 2 листа ОДНОЙ банды, каждый не больше 350 Rep / $1500
// (подтверждено официальным документом Knight Models); размер колоды целей
// и число деплоев/ивентов на лист — из практики сообщества, при изменении
// официальных правил поправьте эти константы.
const TOURNAMENT_RULES = {
  repLimit: 350,
  fundingLimit: 1500,
  objectiveCards: 20,
  deployments: 3,
  events: 3
};

let tournamentRole = null;        // null (экран выбора) | 'player' | 'organizer'
let tournamentList = [];          // кэш списка турниров с сервера
let tnRostersOpenId = null;       // турнир с раскрытой формой подачи ростеров
let tnReportEditId = null;        // турнир, где игрок исправляет записанный результат тура
let tnPollTimer = null;           // поллинг: старт туров и чужие результаты видны без перезахода

function stopTnPolling() {
  if (tnPollTimer) { clearInterval(tnPollTimer); tnPollTimer = null; }
}

// Сигнатура «хода» турниров: перерисовываем список только при реальных изменениях
// (статус, тур, состав, число записанных результатов) — не сбрасывая формы зря
function tnListSignature(list) {
  return JSON.stringify(list.map(tn => [tn.id, tn.status, tn.round, tn.players.length,
    (tn.rounds || []).map(r => Object.keys(r.results || {}).length)]));
}

// Экранирование пользовательского текста (адрес, инфо, заметки — свободный ввод)
function tnEsc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// "2026-08-01T12:00" (datetime-local) → "2026-08-01 12:00"
function tnDate(s) {
  return tnEsc(String(s || '').replace('T', ' '));
}

// ======================== НАВИГАЦИЯ ========================
function showTournaments() {
  currentMode = 'tournaments';
  $('mainMenu').style.display = 'none';
  $('cardsSection').style.display = 'none';
  $('builderSection').style.display = 'none';
  if ($('gameSection')) $('gameSection').style.display = 'none';
  if ($('statsSection')) $('statsSection').style.display = 'none';
  $('tournamentsSection').style.display = 'block';
  $('compendiumModal').classList.remove('active');
  renderTournaments();
}

function chooseTournamentRole(role) {
  tournamentRole = role;
  renderTournaments();
}

function tournamentsBackToRoles() {
  tournamentRole = null;
  tnRostersOpenId = null;
  tnReportEditId = null;
  stopTnPolling();
  renderTournaments();
}

// ======================== РЕНДЕР ========================
async function renderTournaments() {
  const box = $('tournamentsContent');
  if (!box) return;

  if (!currentUser) {
    box.innerHTML = `
      <div class="game-panel game-center">
        <p class="game-note">${t('tn_login_note')}</p>
        <button class="rank-select-btn" onclick="openAuthModal()">${t('profile')}</button>
      </div>`;
    return;
  }

  // Экран выбора роли: участник или организатор
  if (!tournamentRole) {
    box.innerHTML = `
      <div class="tn-role-choice">
        <div class="game-panel game-center tn-role-card" onclick="chooseTournamentRole('player')">
          <div class="tn-role-icon">🎮</div>
          <div class="game-panel-title">${t('tn_role_player')}</div>
          <p class="game-note">${t('tn_role_player_hint')}</p>
        </div>
        <div class="game-panel game-center tn-role-card" onclick="chooseTournamentRole('organizer')">
          <div class="tn-role-icon">📋</div>
          <div class="game-panel-title">${t('tn_role_organizer')}</div>
          <p class="game-note">${t('tn_role_organizer_hint')}</p>
        </div>
      </div>`;
    return;
  }

  box.innerHTML = `<p class="stats-loading">${t('stats_loading')}</p>`;
  try {
    tournamentList = (await api('/api/tournaments')).tournaments || [];
  } catch (e) {
    box.innerHTML = `<div class="game-panel game-center"><p class="game-note">${apiErrorText(e)}</p></div>`;
    return;
  }

  renderTournamentsView();

  // Поллинг: участники видят старт турнира/тура и чужие результаты без перезахода
  stopTnPolling();
  tnPollTimer = setInterval(async () => {
    if (currentMode !== 'tournaments' || !tournamentRole) { stopTnPolling(); return; }
    try {
      const fresh = (await api('/api/tournaments')).tournaments || [];
      if (tnListSignature(fresh) !== tnListSignature(tournamentList)) {
        tournamentList = fresh;
        renderTournamentsView();
      }
    } catch (e) { /* сервер мог мигнуть — экран не трогаем */ }
  }, 8000);
}

// Перерисовка из кэша tournamentList (без запроса к серверу)
function renderTournamentsView() {
  const box = $('tournamentsContent');
  if (!box) return;
  const backBtn = `<button class="save-btn tn-roles-back" onclick="tournamentsBackToRoles()">← ${t('tn_change_role')}</button>`;
  box.innerHTML = backBtn + (tournamentRole === 'organizer' ? organizerViewHTML() : playerViewHTML());
}

// ======================== ВИД ОРГАНИЗАТОРА ========================
function organizerViewHTML() {
  const mine = tournamentList.filter(tn => tn.isOrganizer);
  return `
    <div class="game-panel">
      <div class="game-panel-title">${t('tn_create_title')}</div>
      <p class="game-note">${t('tn_create_hint')}</p>
      <input type="text" id="tnAddress" class="game-select" maxlength="120" placeholder="${t('tn_address_ph')}">
      <div class="tn-form-row">
        <label class="tn-form-label">${t('tn_date_start')}</label>
        <input type="datetime-local" id="tnDateStart" class="game-select">
      </div>
      <div class="tn-form-row">
        <label class="tn-form-label">${t('tn_date_end')}</label>
        <input type="datetime-local" id="tnDateEnd" class="game-select">
      </div>
      <div class="tn-form-row">
        <label class="tn-form-label">${t('tn_max_players')}</label>
        <input type="number" id="tnMaxPlayers" class="game-select tn-num" min="2" max="128" value="8">
        <label class="tn-form-label">${t('tn_reserve')}</label>
        <input type="number" id="tnReserve" class="game-select tn-num" min="0" max="64" value="2">
      </div>
      <input type="text" id="tnOrgNick" class="game-select" maxlength="30"
             placeholder="${t('tn_org_nick_ph')}" value="${tnEsc(currentUser)}">
      <textarea id="tnInfo" class="game-select tn-textarea" maxlength="600" rows="3"
                placeholder="${t('tn_info_ph')}"></textarea>
      <button class="rank-select-btn" onclick="createTournament()">${t('tn_create_btn')}</button>
    </div>
    <div class="saves-title tn-list-title">${t('tn_my_tournaments')}</div>
    ${mine.length ? mine.map(tn => tournamentCardHTML(tn)).join('') : `<p class="auth-note">${t('tn_no_own')}</p>`}`;
}

async function createTournament() {
  const body = {
    address: ($('tnAddress').value || '').trim(),
    dateStart: ($('tnDateStart').value || '').trim(),
    dateEnd: ($('tnDateEnd').value || '').trim() || null,
    maxPlayers: parseInt($('tnMaxPlayers').value, 10),
    reserve: parseInt($('tnReserve').value, 10) || 0,
    orgNick: ($('tnOrgNick').value || '').trim(),
    info: ($('tnInfo').value || '').trim() || null
  };
  if (!body.address || !body.dateStart || !body.orgNick || !Number.isInteger(body.maxPlayers)) {
    alert(t('tn_fill_fields'));
    return;
  }
  try {
    await api('/api/tournaments', 'POST', body);
    alert(t('tn_created'));
    renderTournaments();
  } catch (e) {
    alert(apiErrorText(e));
  }
}

async function deleteTournament(id) {
  if (!confirm(t('tn_confirm_delete'))) return;
  try {
    await api('/api/tournaments/' + id, 'DELETE');
    renderTournaments();
  } catch (e) {
    alert(apiErrorText(e));
  }
}

// Попап организатора: поданные ростеры и заметки участника
function showTournamentPlayerRosters(tnId, playerName) {
  const tn = tournamentList.find(x => x.id === tnId);
  const pl = tn && tn.players.find(x => x.name === playerName);
  if (!pl) return;
  const rosterBlock = (s, num) => {
    if (!s) return `<p>${t('tn_list')} ${num}: ${t('tn_rosters_missing')}</p>`;
    const st = tournamentRosterStats(s);
    const rows = s.m.map(e => `• ${tnEsc(e[0])} (${tnEsc(e[1])})${e[2] && e[2].length ? ' — ' + tnEsc(e[2].join(', ')) : ''}`).join('<br>');
    return `<p><b>${t('tn_list')} ${num}: ${tnEsc(s.n)}</b><br>
      ${tnEsc(s.f)} • ${st.rep} Rep • $${st.funding} • ${st.cards} ${t('tn_cards_word')}<br>${rows}</p>`;
  };
  showTraitPopup(`👤 ${tnEsc(pl.name)}`,
    rosterBlock(pl.roster1, 1) + rosterBlock(pl.roster2, 2)
    + (pl.notes ? `<p><b>${t('tn_notes_label')}:</b> ${tnEsc(pl.notes)}</p>` : ''));
}

// ======================== ВИД УЧАСТНИКА ========================
function playerViewHTML() {
  if (!tournamentList.length) {
    return `<div class="game-panel game-center"><p class="game-note">${t('tn_no_tournaments')}</p></div>`;
  }
  return tournamentList.map(tn => tournamentCardHTML(tn)).join('');
}

// ======================== ХОД ТУРНИРА (туры, таблица, результаты) ========================
function tnStatusBadge(tn) {
  if (tn.status === 'active') return `<span class="tn-badge tn-badge-live">▶ ${t('tn_status_active', { round: tn.round })}</span>`;
  if (tn.status === 'finished') return `<span class="tn-badge tn-badge-done">🏁 ${t('tn_status_finished')}</span>`;
  return `<span class="tn-badge tn-badge-open">${t('tn_status_open')}</span>`;
}

// Пары текущего тура с отметками записанных результатов
function tnRoundPairsHTML(tn) {
  if (tn.status !== 'active' || !tn.rounds.length) return '';
  const r = tn.rounds[tn.rounds.length - 1];
  const res = r.results || {};
  const mark = name => {
    const x = res[name];
    if (!x) return `<span class="tn-pair-pending">…</span>`;
    return `<span class="${x.win ? 'tn-pair-win' : 'tn-pair-loss'}">${x.win ? '🏆' : '✗'} ${x.vp} VP</span>`;
  };
  const rows = (r.pairs || []).map((pr, i) => pr[1] ? `
    <div class="tn-pair-row">
      <span class="tn-player-num">${i + 1}</span>
      <span class="tn-pair-side">${tnEsc(pr[0])} ${mark(pr[0])}</span>
      <span class="tn-pair-vs">vs</span>
      <span class="tn-pair-side">${tnEsc(pr[1])} ${mark(pr[1])}</span>
    </div>` : `
    <div class="tn-pair-row">
      <span class="tn-player-num">${i + 1}</span>
      <span class="tn-pair-side">${tnEsc(pr[0])} — <i>${t('tn_bye')}</i> 🏆</span>
    </div>`).join('');
  return `<div class="saves-title">${t('tn_round_pairs', { round: tn.round })}</div>
    <div class="tn-players">${rows}</div>`;
}

// Таблица турнира: место, игрок, победы, суммарные VP; у завершённого — победитель
function tnStandingsHTML(tn) {
  if (tn.status === 'open' || !(tn.standings || []).length) return '';
  const finished = tn.status === 'finished';
  const rows = tn.standings.map((s, i) => `
    <div class="tn-player-row tn-st-row${finished && i === 0 ? ' tn-st-winner' : ''}">
      <span class="tn-player-num">${i + 1}</span>
      <span class="tn-player-name">${tnEsc(s.name)}${s.name === currentUser ? ` <b>(${t('tn_you')})</b>` : ''}</span>
      <span class="tn-st-cell">🏆 ${s.wins}</span>
      <span class="tn-st-cell">${s.vp} VP</span>
    </div>`).join('');
  return `
    ${finished && tn.winner ? `<div class="tn-winner-banner">🏆 ${t('tn_winner')}: <b>${tnEsc(tn.winner)}</b></div>` : ''}
    <div class="saves-title">${t('tn_standings')}</div>
    <div class="tn-players">${rows}</div>`;
}

// Форма записи СВОЕГО результата тура (победа/поражение + VP)
function tnReportFormHTML(tn) {
  if (tn.status !== 'active' || !tn.rounds.length) return '';
  const r = tn.rounds[tn.rounds.length - 1];
  const myPair = (r.pairs || []).find(pr => pr[0] === currentUser || pr[1] === currentUser);
  if (!myPair || !myPair[0] || !myPair[1]) return ''; // не участвую или бай (записан автоматически)
  const my = (r.results || {})[currentUser];

  if (my && tnReportEditId !== tn.id) {
    return `
      <div class="tn-report-done">
        ✓ ${t('tn_result_recorded', { res: my.win ? t('tn_result_win') : t('tn_result_loss'), vp: my.vp })}
        <button class="save-btn" onclick="tnReportEditId='${tn.id}';renderTournamentsView()">${t('tn_change')}</button>
      </div>`;
  }

  const opp = myPair[0] === currentUser ? myPair[1] : myPair[0];
  return `
    <div class="tn-report-form">
      <div class="saves-title">${t('tn_your_result', { round: tn.round })} — vs ${tnEsc(opp)}</div>
      <p class="game-note">${t('tn_report_hint')}</p>
      <div class="tn-form-row">
        <label class="tn-form-label">${t('tn_vp_label')}</label>
        <input type="number" id="tnVp-${tn.id}" class="game-select tn-num" min="0" max="200" value="${my ? my.vp : 0}">
      </div>
      <div class="game-finish-row">
        <button class="rank-select-btn" onclick="reportTnResult('${tn.id}', 1)">🏆 ${t('tn_result_win')}</button>
        <button class="rank-select-btn" onclick="reportTnResult('${tn.id}', 0)">${t('tn_result_loss')}</button>
      </div>
    </div>`;
}

// Действия организатора и участника над ходом турнира
async function tnAction(pathname, body, confirmKey, confirmParams) {
  if (confirmKey && !confirm(t(confirmKey, confirmParams || {}))) return;
  try {
    await api(pathname, 'POST', body);
    renderTournaments();
  } catch (e) {
    alert(apiErrorText(e));
  }
}
function startTournament(id) { return tnAction('/api/tournaments/start', { id }, 'tn_confirm_start'); }
function nextTournamentRound(id) { return tnAction('/api/tournaments/next', { id }, 'tn_confirm_next'); }
function finishTournament(id) { return tnAction('/api/tournaments/finish', { id }, 'tn_confirm_finish'); }
function kickTournamentPlayer(id, name) { return tnAction('/api/tournaments/kick', { id, player: name }, 'tn_kick', { name }); }

async function reportTnResult(id, win) {
  const vp = parseInt(($(`tnVp-${id}`) || {}).value, 10) || 0;
  try {
    await api('/api/tournaments/report', 'POST', { id, win, vp });
    tnReportEditId = null;
    renderTournaments();
  } catch (e) {
    alert(apiErrorText(e));
  }
}

// Карточка турнира — общая для обеих ролей (у организатора добавляются
// управление ходом турнира и просмотр ростеров участников)
function tournamentCardHTML(tn) {
  const mainPlayers = tn.players.filter(p => !p.isReserve);
  const reservePlayers = tn.players.filter(p => p.isReserve);
  const me = tn.players.find(p => p.name === currentUser);
  const isFull = tn.players.length >= tn.maxPlayers + tn.reserve;
  const isOpen = tn.status === 'open';

  const playerRow = (p, num) => `
    <div class="tn-player-row${tn.isOrganizer ? ' tn-player-clickable' : ''}"
         ${tn.isOrganizer ? `onclick="showTournamentPlayerRosters('${tn.id}','${tnEsc(p.name)}')"` : ''}>
      <span class="tn-player-num">${num}</span>
      <span class="tn-player-name">${tnEsc(p.name)}${p.name === currentUser ? ` <b>(${t('tn_you')})</b>` : ''}</span>
      ${p.isReserve ? `<span class="tn-badge tn-badge-reserve">${t('tn_reserve_badge')}</span>` : ''}
      <span class="tn-badge ${p.hasRosters ? 'tn-badge-ok' : 'tn-badge-wait'}">${p.hasRosters ? '✓ ' + t('tn_rosters_ok') : '⏳ ' + t('tn_rosters_wait')}</span>
      ${tn.isOrganizer && isOpen ? `<span class="flap-chip-remove" title="${t('tn_kick_title')}"
        onclick="event.stopPropagation();kickTournamentPlayer('${tn.id}','${tnEsc(p.name)}')">×</span>` : ''}
    </div>`;

  return `
    <div class="game-panel tn-card">
      <div class="game-panel-title tn-card-title">📍 ${tnEsc(tn.address)}</div>
      <div class="tn-card-meta">
        ${tnStatusBadge(tn)} &nbsp; 📅 ${tnDate(tn.dateStart)}${tn.dateEnd ? ' — ' + tnDate(tn.dateEnd) : ''}
        &nbsp;•&nbsp; 👤 ${tnEsc(tn.orgNick)} &nbsp;•&nbsp; #${tn.id}
      </div>
      ${tn.info ? `<p class="game-note">${tnEsc(tn.info)}</p>` : ''}
      ${isOpen ? `
      <div class="tn-card-slots">
        ${t('tn_slots')}: <b>${mainPlayers.length} / ${tn.maxPlayers}</b>
        ${tn.reserve ? ` &nbsp;•&nbsp; ${t('tn_reserve')}: <b>${reservePlayers.length} / ${tn.reserve}</b>` : ''}
      </div>
      ${tn.players.length ? `<div class="tn-players">${tn.players.map((p, i) => playerRow(p, i + 1)).join('')}</div>` : ''}` : ''}
      ${tnRoundPairsHTML(tn)}
      ${me ? tnReportFormHTML(tn) : ''}
      ${tnStandingsHTML(tn)}
      <div class="tn-card-actions">
        ${isOpen && !me && !isFull ? `<button class="rank-select-btn" onclick="joinTournament('${tn.id}')">${t('tn_join')}</button>` : ''}
        ${isOpen && !me && isFull ? `<span class="tn-badge tn-badge-wait">${t('tn_full')}</span>` : ''}
        ${me && tn.status !== 'finished' ? `<button class="save-btn" onclick="toggleTnRosters('${tn.id}')">🃏 ${t('tn_submit_rosters')}</button>` : ''}
        ${isOpen && me ? `<button class="save-btn save-btn-del" onclick="leaveTournament('${tn.id}')">${t('tn_leave')}</button>` : ''}
        ${tn.isOrganizer && isOpen ? `<button class="rank-select-btn tn-org-btn" onclick="startTournament('${tn.id}')">▶ ${t('tn_start')}</button>` : ''}
        ${tn.isOrganizer && tn.status === 'active' ? `
          <button class="rank-select-btn tn-org-btn" onclick="nextTournamentRound('${tn.id}')">⏭ ${t('tn_next_round')}</button>
          <button class="rank-select-btn tn-org-btn" onclick="finishTournament('${tn.id}')">🏁 ${t('tn_finish')}</button>` : ''}
        ${tn.isOrganizer ? `<button class="save-btn save-btn-del" onclick="deleteTournament('${tn.id}')">✕ ${t('tn_delete')}</button>` : ''}
      </div>
      ${me && tn.status !== 'finished' && tnRostersOpenId === tn.id ? tnRostersFormHTML(tn, me) : ''}
    </div>`;
}

async function joinTournament(id) {
  try {
    await api('/api/tournaments/join', 'POST', { id });
    renderTournaments();
  } catch (e) {
    alert(apiErrorText(e));
  }
}

async function leaveTournament(id) {
  if (!confirm(t('tn_confirm_leave'))) return;
  try {
    await api('/api/tournaments/leave', 'POST', { id });
    if (tnRostersOpenId === id) tnRostersOpenId = null;
    renderTournaments();
  } catch (e) {
    alert(apiErrorText(e));
  }
}

function toggleTnRosters(id) {
  tnRostersOpenId = tnRostersOpenId === id ? null : id;
  renderTournamentsView();
}

// ======================== ПОДАЧА ТУРНИРНЫХ РОСТЕРОВ ========================
// Фактические Rep / Funding / размер колоды сохранённого ростера — по data.js
function tournamentRosterStats(save) {
  const eqPool = (typeof equipmentByFaction !== 'undefined' && equipmentByFaction[save.f]) || [];
  let rep = 0, funding = 0;
  (save.m || []).forEach(entry => {
    const model = models.find(m => m.name === entry[0]);
    if (model) { rep += model.rep || 0; funding += model.funding || 0; }
    (entry[2] || []).forEach(en => {
      const eq = eqPool.find(e => e.name === en);
      if (eq) { rep += eq.repCost || 0; funding += eq.fundingCost || 0; }
    });
  });
  const cards = (save.o || []).reduce((a, pair) => a + (pair[1] || 0), 0);
  return { rep, funding, cards };
}

// Чек-лист соответствия правилам турнира для выбранной пары сохранений
function tnChecklistHTML(s1, s2) {
  const R = TOURNAMENT_RULES;
  const checks = [];
  checks.push({ ok: !!(s1 && s2 && s1 !== s2), label: t('tn_rule_two_lists') });
  checks.push({ ok: !!(s1 && s2 && s1.f === s2.f), label: t('tn_rule_same_faction') });
  [[s1, 1], [s2, 2]].forEach(([s, num]) => {
    if (!s) return;
    const st = tournamentRosterStats(s);
    checks.push({ ok: st.rep <= R.repLimit, label: `${t('tn_list')} ${num}: ${st.rep} / ${R.repLimit} Rep` });
    checks.push({ ok: st.funding <= R.fundingLimit, label: `${t('tn_list')} ${num}: $${st.funding} / $${R.fundingLimit}` });
    checks.push({ ok: st.cards === R.objectiveCards, label: `${t('tn_list')} ${num}: ${st.cards} / ${R.objectiveCards} ${t('tn_cards_word')}` });
  });
  return checks.map(c => `<div class="tn-check ${c.ok ? 'is-ok' : 'is-bad'}">${c.ok ? '✓' : '✗'} ${c.label}</div>`).join('');
}

function tnSelectedSave(id, num) {
  const sel = $(`tnRoster${num}-${id}`);
  if (!sel || sel.value === '') return null;
  return mySaves[parseInt(sel.value, 10)] || null;
}

function updateTnChecklist(id) {
  const box = $('tnChecklist-' + id);
  if (box) box.innerHTML = tnChecklistHTML(tnSelectedSave(id, 1), tnSelectedSave(id, 2));
}

function tnRostersFormHTML(tn, me) {
  const R = TOURNAMENT_RULES;
  if (!mySaves.length) return `<p class="auth-note">${t('tn_no_saves')}</p>`;

  // Уже поданные листы — предвыбор в селектах по имени сохранения
  const findIdx = r => r ? mySaves.findIndex(s => s.n === r.n && s.f === r.f) : -1;
  const sel1 = findIdx(me.roster1), sel2 = findIdx(me.roster2);

  const options = selected => `<option value="">—</option>` + mySaves.map((s, i) =>
    `<option value="${i}" ${i === selected ? 'selected' : ''}>${tnEsc(s.n)} (${tnEsc(s.f)})</option>`).join('');

  return `
    <div class="tn-rosters-form">
      <div class="saves-title">${t('tn_rosters_title')}</div>
      <p class="game-note">${t('tn_rules_hint', {
        rep: R.repLimit, funding: R.fundingLimit, cards: R.objectiveCards,
        dep: R.deployments, ev: R.events
      })}</p>
      <div class="tn-form-row">
        <label class="tn-form-label">${t('tn_list')} 1</label>
        <select id="tnRoster1-${tn.id}" class="game-select" onchange="updateTnChecklist('${tn.id}')">${options(sel1)}</select>
      </div>
      <div class="tn-form-row">
        <label class="tn-form-label">${t('tn_list')} 2</label>
        <select id="tnRoster2-${tn.id}" class="game-select" onchange="updateTnChecklist('${tn.id}')">${options(sel2)}</select>
      </div>
      <div class="tn-checklist" id="tnChecklist-${tn.id}">${tnChecklistHTML(sel1 >= 0 ? mySaves[sel1] : null, sel2 >= 0 ? mySaves[sel2] : null)}</div>
      <textarea id="tnNotes-${tn.id}" class="game-select tn-textarea" maxlength="400" rows="2"
                placeholder="${t('tn_notes_ph')}">${tnEsc(me.notes || '')}</textarea>
      <button class="rank-select-btn" onclick="submitTournamentRosters('${tn.id}')">${t('tn_submit')}</button>
    </div>`;
}

async function submitTournamentRosters(id) {
  const s1 = tnSelectedSave(id, 1), s2 = tnSelectedSave(id, 2);
  if (!s1 || !s2) { alert(t('tn_pick_both')); return; }
  if (s1 === s2) { alert(t('tn_rule_two_lists')); return; }
  if (s1.f !== s2.f) { alert(t('tn_rule_same_faction')); return; }

  // Мягкая проверка остальных правил: недоборы (например, неполная колода)
  // можно описать в заметках — организатор увидит их и чек-лист
  const R = TOURNAMENT_RULES;
  const stats = [tournamentRosterStats(s1), tournamentRosterStats(s2)];
  const legal = stats.every(st => st.rep <= R.repLimit && st.funding <= R.fundingLimit && st.cards === R.objectiveCards);
  if (!legal && !confirm(t('tn_confirm_illegal'))) return;

  const notes = ($(`tnNotes-${id}`).value || '').trim() || null;
  try {
    await api('/api/tournaments/rosters', 'PUT', { id, roster1: s1, roster2: s2, notes });
    alert(t('tn_submitted'));
    tnRostersOpenId = null;
    renderTournaments();
  } catch (e) {
    alert(apiErrorText(e));
  }
}
