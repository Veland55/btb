// ==================================================================
// BMG — НАБОР КОЛОДЫ OBJECTIVE-КАРТ В БИЛДЕРЕ (каталог — data-cards.js)
// Отдельная страница билдера: с основной страницы на неё ведут свайп
// вправо и кнопка 🃏 в топ-баре, обратно — свайп влево и кнопка назад.
//
// Правила набора (официальные, как в showObjectiveDeckRules):
//   • колода — ровно OBJECTIVE_DECK.size карт;
//   • общих карт (без Affiliation) не больше, чем карт банды,
//     и не больше OBJECTIVE_DECK.maxGeneral;
//   • одиночных карт (max=1) не больше OBJECTIVE_DECK.maxSingle;
//   • комплекты (max>1) добавляются и убираются только целиком;
//   • персональные карты требуют модель (и ранг) в отряде;
//   • обязательные карты банды (MANDATORY_CARDS) добавляются автоматически
//     и в размер колоды не входят.
// ==================================================================

let crewCards = {}; // выбранные карты колоды: id -> число копий

// ======================== ДОСТУП К КАТАЛОГУ ========================
function objCardById(id) {
  return OBJECTIVE_CARDS.find(c => c.id === id) || null;
}

// Персональные карты показываем только если требуемую модель (или носителя
// требуемого трейта) вообще можно нанять в текущую банду — либо она уже в отряде
function objCardModelHireable(card) {
  const hireable = m => canHireInFaction(m, currentFaction) || crew.some(cm => cm.name === m.name);
  if (card.reqModel) {
    return models.some(m =>
      card.reqModel.some(rn => modelMatchesCardName(m, rn)) &&
      (!card.reqRank || getRanks(m).some(r => card.reqRank.some(rr => r.toLowerCase().includes(rr.toLowerCase())))) &&
      hireable(m)
    );
  }
  if (card.reqTrait) {
    return models.some(m =>
      (m.traits || []).some(tr => card.reqTrait.some(q => tr.includes(q))) && hireable(m)
    );
  }
  return true;
}

// Карты, доступные текущей фракции (общие, карты этой банды и персональные
// карты нанимаемых моделей)
function objCardVisible(card) {
  if (card.faction && !card.faction.includes(currentFaction)) return false;
  if (card.prevTrait && crewHasAnyTrait(card.prevTrait)) return false;
  if (!objCardModelHireable(card)) return false;
  return true;
}

function mandatoryCardsForFaction() {
  if (typeof MANDATORY_CARDS === 'undefined') return [];
  return MANDATORY_CARDS.filter(c => !c.faction || c.faction.includes(currentFaction));
}

// ======================== ТРЕБОВАНИЯ КАРТ ========================
function crewHasAnyTrait(traits) {
  return crew.some(m => (m.traits || []).some(tr => traits.some(req => tr.includes(req))));
}

function modelMatchesCardName(m, reqName) {
  const rq = reqName.toLowerCase();
  return [m.name, m.realname].filter(Boolean).some(n => {
    const nl = n.toLowerCase();
    return nl === rq || nl.includes(rq) || rq.includes(nl);
  });
}

// Персональная карта: в отряде есть модель с нужным именем/псевдонимом и рангом
function objCardRequirementMet(card) {
  if (card.reqTrait && !crewHasAnyTrait(card.reqTrait)) return false;
  if (!card.reqModel) return true;
  return crew.some(m =>
    card.reqModel.some(rn => modelMatchesCardName(m, rn)) &&
    (!card.reqRank || card.reqRank.some(rr => (m.rankUsed || '').toLowerCase().includes(rr.toLowerCase())))
  );
}

// Текст требования для подписи на карте
function objCardRequirementText(card) {
  const parts = [];
  if (card.reqModel) parts.push(card.reqModel.join(' / ') + (card.reqRank ? ` (${card.reqRank.join(' / ')})` : ''));
  if (card.reqTrait) parts.push(card.reqTrait.join(' / '));
  return parts.join(' • ');
}

// ======================== СОСТОЯНИЕ КОЛОДЫ ========================
function objDeckList() {
  return Object.entries(crewCards)
    .map(([id, count]) => ({ card: objCardById(id), count }))
    .filter(e => e.card && e.count > 0);
}

function objDeckStats() {
  const s = { total: 0, general: 0, crewSpec: 0, single: 0, reqIssues: [], setIssues: [] };
  objDeckList().forEach(({ card, count }) => {
    s.total += count;
    if (card.general) s.general += count; else s.crewSpec += count;
    if (card.max === 1) s.single += count;
    if (count !== card.max) s.setIssues.push(card.name); // неполный комплект (из старого сохранения)
    if (!objCardRequirementMet(card) || !objCardVisible(card)) s.reqIssues.push(card.name);
  });
  s.isLegal = s.total === OBJECTIVE_DECK.size
    && s.general <= s.crewSpec
    && s.general <= OBJECTIVE_DECK.maxGeneral
    && s.single <= OBJECTIVE_DECK.maxSingle
    && !s.reqIssues.length && !s.setIssues.length;
  return s;
}

function objDeckWarnings(s) {
  const w = [];
  if (s.total !== OBJECTIVE_DECK.size) w.push(t('obj_need_total', { count: OBJECTIVE_DECK.size }));
  if (s.general > s.crewSpec || s.general > OBJECTIVE_DECK.maxGeneral) w.push(t('obj_need_crew', { max: OBJECTIVE_DECK.maxGeneral }));
  if (s.single > OBJECTIVE_DECK.maxSingle) w.push(t('obj_need_single', { max: OBJECTIVE_DECK.maxSingle }));
  if (s.setIssues.length) w.push(t('obj_need_full_sets') + ': ' + s.setIssues.join(', '));
  if (s.reqIssues.length) w.push(t('obj_need_req') + ': ' + s.reqIssues.join(', '));
  return w;
}

// ======================== ДОБАВЛЕНИЕ / УДАЛЕНИЕ ========================
// Карты с max>1 добавляются только полным комплектом — так требуют правила
function addObjectiveCard(id) {
  const card = objCardById(id);
  if (!card || crewCards[id]) return;
  if (!objCardRequirementMet(card)) {
    alert(t('obj_req_missing') + ': ' + objCardRequirementText(card));
    return;
  }
  const s = objDeckStats();
  if (s.total + card.max > OBJECTIVE_DECK.size) { alert(t('obj_card_full_deck', { count: OBJECTIVE_DECK.size })); return; }
  if (card.max === 1 && s.single + 1 > OBJECTIVE_DECK.maxSingle) { alert(t('obj_single_limit', { max: OBJECTIVE_DECK.maxSingle })); return; }
  if (card.general && s.general + card.max > OBJECTIVE_DECK.maxGeneral) { alert(t('obj_general_limit', { max: OBJECTIVE_DECK.maxGeneral })); return; }
  crewCards[id] = card.max;
  renderObjectiveCardsPage();
  updateDeckBadge();
}

function removeObjectiveCard(id) {
  delete crewCards[id];
  renderObjectiveCardsPage();
  updateDeckBadge();
}

function resetObjectiveDeck() {
  crewCards = {};
  updateDeckBadge();
}

// ======================== НАВИГАЦИЯ (СТРАНИЦА КАРТ + СВАЙП) ========================
function showBuilderCards() {
  if (!currentFaction || $('builderMain').style.display === 'none') return;
  $('builderMain').style.display = 'none';
  $('builderCardsPage').style.display = 'block';
  closeBuilderCardPanel();
  renderObjectiveCardsPage();
  window.scrollTo(0, 0);
}

function closeBuilderCards() {
  $('builderCardsPage').style.display = 'none';
  $('builderMain').style.display = 'block';
  updateCrewBar();
}

// Счётчик набранной колоды на кнопке 🃏 в топ-баре билдера
function updateDeckBadge() {
  const badge = $('builderDeckBadge');
  if (badge) badge.textContent = objDeckStats().total;
}

// Свайпы: вправо — со страницы отряда на карты, влево — обратно.
// Игнорируем жесты при открытых модалках и вертикальные прокрутки.
(function initBuilderSwipe() {
  let x0 = null, y0 = null;
  document.addEventListener('touchstart', e => {
    x0 = e.touches[0].clientX;
    y0 = e.touches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchend', e => {
    if (x0 === null || currentMode !== 'builder') return;
    const dx = e.changedTouches[0].clientX - x0;
    const dy = e.changedTouches[0].clientY - y0;
    x0 = y0 = null;
    if (Math.abs(dx) < 70 || Math.abs(dy) > 60) return;
    if (document.querySelector('.equipment-modal, .rank-select-modal, .trait-popup') ||
        $('fullCard').classList.contains('active')) return;
    const onCards = $('builderCardsPage') && $('builderCardsPage').style.display !== 'none';
    if (dx > 0 && !onCards) showBuilderCards();
    else if (dx < 0 && onCards) closeBuilderCards();
  }, { passive: true });
})();

// ======================== РЕНДЕР ========================
// Просмотр карты в полный размер (по клику)
function showObjectiveCardPreview(id, mandatory) {
  const card = mandatory
    ? mandatoryCardsForFaction().find(c => c.id === id)
    : objCardById(id);
  if (!card) return;
  showTraitPopup(card.name, `
    <div class="game-cond-popup-img-wrap">
      <img src="${card.img}" alt="${card.name}" class="game-cond-popup-img" loading="lazy" onerror="this.src='img/no.png'">
    </div>`, false);
}

// Сводка колоды: счётчики и предупреждения — что ещё требуется добрать
function objDeckSummaryHTML() {
  const s = objDeckStats();
  const warnings = objDeckWarnings(s);
  const cls = ok => ok ? 'is-ok' : 'is-warn';
  return `
    <div class="obj-deck-summary ${s.isLegal ? 'is-ok' : ''}">
      <div class="obj-deck-counters">
        <span class="${cls(s.total === OBJECTIVE_DECK.size)}">${t('obj_deck')}: <b>${s.total}/${OBJECTIVE_DECK.size}</b></span>
        <span class="${cls(s.general <= s.crewSpec && s.general <= OBJECTIVE_DECK.maxGeneral)}">${t('obj_deck_general')}: <b>${s.general}</b> / ${t('obj_deck_crew')}: <b>${s.crewSpec}</b></span>
        <span class="${cls(s.single <= OBJECTIVE_DECK.maxSingle)}">${t('obj_deck_single')}: <b>${s.single}/${OBJECTIVE_DECK.maxSingle}</b></span>
        <button class="game-cond-btn" title="${t('obj_deck_rules')}" onclick="showObjectiveDeckRules()">📖</button>
      </div>
      ${s.isLegal
        ? `<div class="obj-deck-msg is-ok">✔ ${t('obj_deck_ok')}</div>`
        : warnings.map(w => `<div class="obj-deck-msg">• ${w}</div>`).join('')}
    </div>`;
}

function showObjectiveDeckRules() {
  const rules = [
    t('obj_rule_size', { count: OBJECTIVE_DECK.size }),
    t('obj_rule_general', { max: OBJECTIVE_DECK.maxGeneral }),
    t('obj_rule_single', { max: OBJECTIVE_DECK.maxSingle }),
    t('obj_rule_sets'),
    t('obj_rule_mandatory')
  ];
  showTraitPopup(t('obj_deck_rules'), rules.map(r => '• ' + r).join('<br><br>'), false);
}

// Список требований персональной карты — попап по клику на значок «!».
// В режиме просмотра (viewOnly) статус выполнения не показывается — отряда нет.
function showObjectiveCardRequirements(id, viewOnly) {
  const card = objCardById(id);
  if (!card) return;
  const lines = [];
  if (card.reqModel) lines.push(`${t('obj_req_model')}: ${card.reqModel.join(' / ')}`);
  if (card.reqRank) lines.push(`${t('obj_req_rank')}: ${card.reqRank.join(' / ')}`);
  if (card.reqTrait) lines.push(`${t('obj_req_trait')}: ${card.reqTrait.join(' / ')}`);
  const status = viewOnly ? '' : objCardRequirementMet(card)
    ? `<br><br><span style="color:#7ddf7d">✔ ${t('obj_req_ok')}</span>`
    : `<br><br><span style="color:#ff6b6b">✖ ${t('obj_req_missing')}</span>`;
  showTraitPopup(`${card.name} — ${t('obj_req')}`, lines.map(l => '• ' + l).join('<br>') + status, false);
}

// Одна карта каталога: скан + бейджи VP/копий, +/− в углу (как у моделей).
// Требования не расписаны под картой — только значок «!», клик открывает список.
// viewOnly (раздел "Карточки"): без кнопок набора и без статуса требований.
function objCardItemHTML(card, opts = {}) {
  const count = opts.viewOnly ? 0 : crewCards[card.id] || 0;
  const hasReq = !!(card.reqModel || card.reqTrait);
  const reqMet = opts.viewOnly || !hasReq || objCardRequirementMet(card);
  const btn = opts.mandatory || opts.viewOnly ? '' : count
    ? `<button class="remove-btn" onclick="event.stopPropagation(); removeObjectiveCard('${card.id}')">−</button>`
    : `<button class="add-btn" onclick="event.stopPropagation(); addObjectiveCard('${card.id}')">+</button>`;
  const reqBtn = hasReq ? `
    <span class="obj-card-req-btn${reqMet ? '' : ' is-missing'}" title="${t('obj_req')}"
          onclick="event.stopPropagation(); showObjectiveCardRequirements('${card.id}', ${!!opts.viewOnly})">!</span>` : '';
  return `
    <div class="obj-card${count ? ' in-crew' : ''}${opts.mandatory ? ' obj-card-mandatory' : ''}${reqMet ? '' : ' obj-card-req-missing'}"
         onclick="showObjectiveCardPreview('${card.id}', ${!!opts.mandatory})">
      <div class="mini-card-corner">${count > 1 ? `<span class="count">x${count}</span>` : ''}${btn}</div>
      <img src="${card.img}" loading="lazy" decoding="async" alt="${card.name}" onerror="this.src='img/no.png'">
      <div class="obj-card-footer">
        <span class="obj-card-name">${card.name}</span>
        <span class="obj-card-info-row">
          <span class="obj-card-info">${opts.mandatory ? t('obj_mandatory_badge') : `${card.vp} VP • x${card.max}`}</span>
          ${reqBtn}
        </span>
      </div>
    </div>`;
}

// ======================== ПРОСМОТР КАРТ МИССИЙ В РАЗДЕЛЕ "КАРТОЧКИ" ========================
// Каталог карт выбранной банды без набора колоды: кнопка 🃏 в топ-баре раздела
function showCardsMissions() {
  if (!currentFaction) return;
  $('cardsMain').style.display = 'none';
  $('cardsMissionsPage').style.display = 'block';
  renderCardsMissionsPage();
  window.scrollTo(0, 0);
}

function closeCardsMissions() {
  $('cardsMissionsPage').style.display = 'none';
  $('cardsMain').style.display = 'block';
}

function renderCardsMissionsPage() {
  const box = $('cardsMissionsContent');
  if (!box || typeof OBJECTIVE_CARDS === 'undefined') return;

  const mandatory = mandatoryCardsForFaction();
  const visible = OBJECTIVE_CARDS.filter(objCardVisible);
  const weight = c => c.faction ? 0 : c.general ? 2 : 1;
  visible.sort((a, b) => weight(a) - weight(b) || a.name.localeCompare(b.name));

  const summary = $('cardsMissionsSummary');
  if (summary) summary.innerHTML = `<span>${currentFaction}</span> | ${t('obj_catalog')}: <span>${visible.length}</span>${mandatory.length ? ` | ${t('obj_mandatory')}: <span>${mandatory.length}</span>` : ''}`;

  box.innerHTML = `
    ${mandatory.length ? `
      <div class="obj-section-title">${t('obj_mandatory')} (${mandatory.length})</div>
      <p class="game-note">${t('obj_mandatory_hint')}</p>
      <div class="obj-cards-grid">${mandatory.map(c => objCardItemHTML(c, { mandatory: true, viewOnly: true })).join('')}</div>` : ''}
    <div class="obj-section-title">${t('obj_catalog')} (${visible.length})</div>
    <div class="obj-cards-grid">${visible.map(c => objCardItemHTML(c, { viewOnly: true })).join('')}</div>`;
}

function renderObjectiveCardsPage() {
  const box = $('builderCardsContent');
  if (!box || typeof OBJECTIVE_CARDS === 'undefined') return;

  const mandatory = mandatoryCardsForFaction();
  const visible = OBJECTIVE_CARDS.filter(objCardVisible);
  // Порядок каталога: карты банды, затем персональные, затем общие; выбранные — первыми
  const weight = c => (crewCards[c.id] ? 0 : 4) + (c.faction ? 0 : c.general ? 2 : 1);
  visible.sort((a, b) => weight(a) - weight(b) || a.name.localeCompare(b.name));

  const summary = $('builderCardsSummary');
  if (summary) summary.innerHTML = objDeckSummaryHTML();

  box.innerHTML = `
    ${mandatory.length ? `
      <div class="obj-section-title">${t('obj_mandatory')} (${mandatory.length})</div>
      <p class="game-note">${t('obj_mandatory_hint')}</p>
      <div class="obj-cards-grid">${mandatory.map(c => objCardItemHTML(c, { mandatory: true })).join('')}</div>` : ''}
    <div class="obj-section-title">${t('obj_catalog')} (${visible.length})</div>
    <div class="obj-cards-grid">${visible.map(c => objCardItemHTML(c)).join('')}</div>`;
}
