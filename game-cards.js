// ==================================================================
// BMG — КОЛОДА ЦЕЛЕЙ ВО ВРЕМЯ ПАРТИИ (раздел ИГРА)
//
// Колода набирается в билдере (cards.js) и уезжает в игру внутри ростера
// (serializeCrew → record.o). Здесь она превращается в живую колоду партии:
// случайное перемешивание, рука из 4 карт, мулиган, розыгрыш карты как Цели
// или как Ресурса, сброс/удаление, счёт VP и фишки банды.
//
// Правила (rules.html, разделы "Using Objective Cards" и "Draw Objective Cards"):
//   • в начале партии колода тасуется, игрок берёт 4 карты и один раз может
//     сбросить любое их число и добрать до 4 (мулиган);
//   • рядом с колодой кладутся 3 Resource Point — ими платится стоимость
//     карты, разыгранной как Ресурс;
//   • Discard — карта уходит ПОД НИЗ колоды (отдельного сброса в игре нет),
//     Remove — карта выбывает из партии совсем;
//   • каждый раз, когда карта покидает руку, игрок добирает до 4 карт;
//   • за одну активацию модели можно сыграть максимум 1 Цель и 1 Ресурс
//     (вне фазы Execute the Plan ограничения нет — поэтому это мягкая проверка);
//   • нельзя одновременно разыграть две карты с одинаковым названием;
//   • в конце Recount можно сбросить карту, перетасовать колоду и добрать.
//
// Состояние живёт в gameTrack (localStorage на код игры, см. game.js), значит
// переживает перезагрузку страницы и стирается при выходе из игры. Рука — тайная
// информация (см. FAQ в rules.html), поэтому на сервер она не уходит.
// ==================================================================

const OBJ_HAND_SIZE = 4;   // размер руки по правилам
const OBJ_START_RP = 3;    // стартовые Resource Point

// Фишки и стопки, которые банда ведёт по своим правилам. Источник — трейты
// моделей (data-traits.js) и обязательные карты банд (MANDATORY_CARDS).
// Подписи — имена из правил, поэтому не переводятся.
//
// Счётчик показывается, если совпала фракция ростера ИЛИ если ключевое слово
// нашлось в трейтах отряда: носители этих правил бывают с аффилиацией Unknown
// и нанимаются в чужую банду (например модели Scarecrow с Terror pile).
// Black Market у Organized Crime здесь намеренно нет: ни один трейт в базе
// его не упоминает, а одноимённые обязательные карты описывают покупку
// снаряжения, а не жетоны.
const FACTION_TOKENS = {
  "Cults":         [{ key: "faith",  label: "Faith",             kw: "faith" }],
  "Penguin":       [{ key: "biz",    label: "Business",          kw: "business counter" }],
  "Court of Owls": [{ key: "owl",    label: "Owl markers",       kw: "owl marker" }],
  "Scarecrow":     [{ key: "terror", label: "Terror pile",       kw: "terror pile" },
                    { key: "fear",   label: "Fear pile",         kw: "fear pile" }],
  "Mr. Freeze":    [{ key: "ice",    label: "Ice Age pile",      kw: "ice age pile" }],
  "Suicide Squad": [{ key: "bomb",   label: "Cranial Bomb pile", kw: "cranial bomb" }]
};

// Трейты, которые как-то трогают карты целей, ищем в отряде по ключевым словам.
// Сравнение идёт в нижнем регистре: в данных встречаются и "Terror Pile", и
// "Terror pile", и даже опечатка "objecive deck". Список намеренно узкий —
// он должен ловить правила про колоду/руку/фишки, а не любое слово "card".
const OBJ_TRAIT_KEYWORDS = [
  "objective deck", "objecive deck", "objective card", "objective hand",
  "from your deck", "search on your deck", "from your hand",
  "terror pile", "fear pile", "ice age pile", "cranial bomb",
  "faith", "business counter", "owl marker", "resource"
];

// ======================== СОСТОЯНИЕ ========================
// gameTrack.deck = {
//   draw: [id...]    колода: верх — начало массива, низ — конец
//   hand: [id...]    рука (максимум OBJ_HAND_SIZE)
//   play: [id...]    разыграно как Цель и ждёт проверки требований
//   scored: [id...]  забитые цели (их VP идут в счёт)
//   removed: [id...] выбывшие из партии карты
//   rp: число Resource Point
//   mull: 0/1 — мулиган ещё доступен / уже сделан
//   act: { obj, res } — сыграно за текущую активацию
//   tok: { ключ фишки -> число }
// }
// Состояние достаём с нормализацией: колода лежит в localStorage сколько угодно
// долго, и сохранение, сделанное прошлой версией, не должно ронять экран игры
function gcState() {
  if (typeof gameTrack === 'undefined' || !gameTrack.deck) return null;
  const d = gameTrack.deck;
  ['draw', 'hand', 'play', 'scored', 'removed'].forEach(k => {
    if (!Array.isArray(d[k])) d[k] = [];
  });
  if (typeof d.rp !== 'number') d.rp = OBJ_START_RP;
  if (typeof d.mull !== 'number') d.mull = 0;
  if (!d.tok || typeof d.tok !== 'object') d.tok = {};
  return d;
}

// Колода из ростера: [[id, копий], ...] → плоский список id.
// Число копий подрезаем по каталогу: запись приходит с сервера, и битое
// значение раздуло бы колоду до отказа localStorage при сохранении
function gcDeckFromRoster(roster) {
  if (typeof objCardById !== 'function') return null; // не загрузился cards.js
  if (!roster || !Array.isArray(roster.o) || !roster.o.length) return null;
  const ids = [];
  roster.o.forEach(([id, count]) => {
    const card = objCardById(id);
    if (!card) return; // карта из более новой версии каталога
    const copies = Math.max(0, Math.min(parseInt(count, 10) || 0, card.max || 1));
    for (let i = 0; i < copies; i++) ids.push(id);
  });
  return ids.length ? ids : null;
}

function gcShuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Первичная раздача: тасуем колоду и берём руку. Мулиган остаётся доступен.
function gcStart(roster) {
  const ids = gcDeckFromRoster(roster);
  if (!ids) { alert(t('gc_no_deck')); return; }
  const legalSize = (typeof OBJECTIVE_DECK !== 'undefined' ? OBJECTIVE_DECK.size : 30);
  if (ids.length !== legalSize &&
      !confirm(t('gc_deck_size_warn', { count: ids.length, need: legalSize }))) return;
  gameTrack.deck = {
    draw: gcShuffle(ids.slice()),
    hand: [], play: [], scored: [], removed: [],
    rp: OBJ_START_RP, mull: 0, tok: {},
    // список трейтов-напоминаний считаем один раз: состав отряда за партию
    // не меняется, а разбор описаний трейтов на каждый тап заметно тормозит
    tr: gcRosterTraits(roster)
  };
  gcDrawUpTo(OBJ_HAND_SIZE);
  saveGameTrack();
  gcRender();
}

// Добор до n карт; если колода кончилась — берём сколько есть
function gcDrawUpTo(n) {
  const d = gcState();
  if (!d) return 0;
  let drawn = 0;
  while (d.hand.length < n && d.draw.length) { d.hand.push(d.draw.shift()); drawn++; }
  return drawn;
}

// Карта покинула руку — по правилам добираем до прежнего размера руки
function gcRefill() {
  gcDrawUpTo(OBJ_HAND_SIZE);
}

// ======================== ДЕЙСТВИЯ С РУКОЙ ========================
// Discard: карта уходит под низ колоды. До мулигана добор не делаем —
// игрок сначала отбирает все ненужные карты, потом жмёт «мулиган завершён».
function gcDiscard(handIdx) {
  const d = gcState();
  if (!d || !d.hand[handIdx]) return;
  d.draw.push(d.hand.splice(handIdx, 1)[0]);
  if (d.mull) gcRefill();
  saveGameTrack();
  gcRender();
}

// Мулиган завершён: добираем руку до 4 и запрещаем повторный мулиган
function gcMulliganDone() {
  const d = gcState();
  if (!d || d.mull) return;
  d.mull = 1;
  gcDrawUpTo(OBJ_HAND_SIZE);
  saveGameTrack();
  gcRender();
}

// Remove: карта выбывает из партии совсем (в отличие от Discard)
function gcRemove(handIdx) {
  const d = gcState();
  if (!d || !d.hand[handIdx]) return;
  const id = d.hand[handIdx];
  if (!confirm(t('gc_confirm_remove', { name: gcCardName(id) }))) return;
  d.removed.push(id);
  d.hand.splice(handIdx, 1);
  gcRefill();
  saveGameTrack();
  gcRender();
}

// Розыгрыш как Цели: карта ложится в зону «в игре», позже забивается или
// сбрасывается.
// Про одноимённые карты: правило запрещает разыгрывать две карты с одним
// названием ОДНОВРЕМЕННО (rules.html, «Using Objective Cards»), но держать
// несколько копий в игре законно — на этом прямо построены правила про вторую
// копию, нацеленную на ту же модель, и ответ FAQ про несколько Paying Tribute
// в игре. Поэтому здесь предупреждение, а не запрет.
function gcPlayObjective(handIdx) {
  const d = gcState();
  if (!d || !d.hand[handIdx]) return;
  const id = d.hand[handIdx];
  if (d.play.some(pid => gcCardName(pid) === gcCardName(id)) &&
      !confirm(t('gc_same_name', { name: gcCardName(id) }))) return;
  d.play.push(id);
  d.hand.splice(handIdx, 1);
  gcRefill();
  saveGameTrack();
  gcRender();
}

// Розыгрыш как Ресурса: стоимость печатается на карте, поэтому Resource Point
// списываются вручную кнопкой «−» — здесь только предупреждаем, если их нет.
function gcPlayResource(handIdx) {
  const d = gcState();
  if (!d || !d.hand[handIdx]) return;
  if (!d.rp && !confirm(t('gc_no_rp'))) return;
  // Ресурс после розыгрыша уходит под низ колоды
  d.draw.push(d.hand.splice(handIdx, 1)[0]);
  gcRefill();
  saveGameTrack();
  gcRender();
}

// ======================== ЗОНА «В ИГРЕ» ========================
// Требования выполнены — карта уходит в забитые, её VP идут в счёт.
// Шаг 3 фазы Recount: нельзя забить две одноимённые карты одновременно,
// поэтому при второй копии в игре переспрашиваем
function gcScore(playIdx) {
  const d = gcState();
  if (!d || !d.play[playIdx]) return;
  const name = gcCardName(d.play[playIdx]);
  if (d.play.some((pid, i) => i !== playIdx && gcCardName(pid) === name) &&
      !confirm(t('gc_score_same_name', { name }))) return;
  d.scored.push(d.play.splice(playIdx, 1)[0]);
  saveGameTrack();
  gcRender();
}

// Требования не выполнены — карта сбрасывается под низ колоды
function gcUnplay(playIdx) {
  const d = gcState();
  if (!d || !d.play[playIdx]) return;
  d.draw.push(d.play.splice(playIdx, 1)[0]);
  saveGameTrack();
  gcRender();
}

// Ошиблись при забитии — вернуть карту в зону «в игре»
function gcUnscore(scoredIdx) {
  const d = gcState();
  if (!d || !d.scored[scoredIdx]) return;
  d.play.push(d.scored.splice(scoredIdx, 1)[0]);
  saveGameTrack();
  gcRender();
}

// ======================== СЧЁТЧИКИ ========================
function gcRp(delta) {
  const d = gcState();
  if (!d) return;
  d.rp = Math.max(0, Math.min(20, (d.rp || 0) + delta));
  saveGameTrack();
  gcRender();
}

function gcToken(key, delta) {
  const d = gcState();
  if (!d) return;
  d.tok = d.tok || {};
  d.tok[key] = Math.max(0, Math.min(40, (d.tok[key] || 0) + delta));
  saveGameTrack();
  gcRender();
}

// Перетасовать колоду и добрать руку. Отдельная кнопка нужна и по ходу раунда:
// правила требуют тасовать колоду каждый раз, когда в ней что-то искали
function gcShuffleDeck() {
  const d = gcState();
  if (!d) return;
  gcShuffle(d.draw);
  gcDrawUpTo(OBJ_HAND_SIZE);
  saveGameTrack();
  gcRender();
}

// Конец фазы Recount (вызывается из gmNextRound в game.js):
//   • пул Resource Points возвращается к 3;
//   • колода тасуется ОБЯЗАТЕЛЬНО — по FAQ даже если карту не сбрасывали;
//   • рука добирается до 4.
// Необязательный сброс одной карты игрок делает кнопкой ♻ до перехода раунда.
function gcEndOfRound() {
  const d = gcState();
  if (!d) return;
  d.rp = OBJ_START_RP;
  gcShuffle(d.draw);
  gcDrawUpTo(OBJ_HAND_SIZE);
  saveGameTrack();
}

// Пересдача всей колоды (например, партию начали заново)
function gcReset(roster) {
  if (!confirm(t('gc_confirm_reset'))) return;
  gcStart(roster);
}

// Сумма VP забитых целей
function gcScoredVp() {
  const d = gcState();
  if (!d) return 0;
  return d.scored.reduce((sum, id) => {
    const c = objCardById(id);
    return sum + (c ? (c.vp || 0) : 0);
  }, 0);
}

// Перенос суммы VP забитых целей в счётчик партии. Счётчик именно
// ПЕРЕЗАПИСЫВАЕТСЯ, поэтому спрашиваем: очки, набитые вручную (например за цель,
// забитую прямо из колоды трейтом), иначе молча пропадут
function gcApplyVp(side) {
  const total = gcScoredVp();
  const current = (gameTrack['vp:' + side] && gameTrack['vp:' + side].v) || 0;
  if (current !== total && !confirm(t('gc_apply_vp_confirm', { from: current, to: total }))) return;
  if (!gameTrack['vp:' + side]) gameTrack['vp:' + side] = { v: 0 };
  gameTrack['vp:' + side].v = Math.min(200, total);
  saveGameTrack();
  // Перерисовываем только блок счёта — экран целиком трогать незачем
  if (typeof renderScorePanel === 'function') renderScorePanel(); else renderGamePlay();
}

// ======================== ВСПОМОГАТЕЛЬНОЕ ========================
// Экранирование для вставки в разметку: в каталоге есть имена вроде
// "SEARCH & DESTROY"
function gcEsc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function gcCardName(id) {
  const c = typeof objCardById === 'function' ? objCardById(id) : null;
  return c ? c.name : id;
}

function gcCardImg(id) {
  const c = typeof objCardById === 'function' ? objCardById(id) : null;
  return c ? c.img : 'img/no.png';
}

// Трейты отряда, которые взаимодействуют с картами целей и фишками —
// список-напоминание под колодой, тап открывает полный текст правила.
// Считается один раз при раздаче колоды (см. gcStart) и живёт в d.tr
function gcRosterTraits(roster) {
  if (typeof models === 'undefined' || typeof getTraitDescription !== 'function') return [];
  const found = new Map();
  (roster.m || []).forEach(entry => {
    const model = findModelByStoredName(entry[0]);
    if (!model) return;
    (model.traits || []).forEach(tr => {
      const desc = getTraitDescription(tr);
      if (!desc) return;
      const low = desc.toLowerCase();
      if (!OBJ_TRAIT_KEYWORDS.some(k => low.includes(k))) return;
      const clean = getCleanName(tr);
      if (!found.has(clean)) found.set(clean, tr);
    });
  });
  return [...found.values()];
}

// Обязательные карты банды: в 30 карт колоды они не входят и не тасуются,
// но во время партии по ним играют (Ice Age, монета Two-Face, правила Faith
// и т.д.) — показываем их отдельной справкой со сканами
function gcMandatoryCards(faction) {
  if (typeof MANDATORY_CARDS === 'undefined') return [];
  return MANDATORY_CARDS.filter(c => !c.faction || c.faction.includes(faction));
}

// ======================== РЕНДЕР ========================
function gcCardHTML(id, actions) {
  const name = gcEsc(gcCardName(id));
  return `
    <div class="gc-card" onclick="showObjectiveCardPreview('${id}', false)">
      <img src="${gcEsc(gcCardImg(id))}" loading="lazy" decoding="async" alt="${name}"
           onerror="this.src='img/no.png'">
      <div class="gc-card-name">${name}</div>
      <div class="gc-card-actions" onclick="event.stopPropagation()">${actions}</div>
    </div>`;
}

function gcHandHTML(d) {
  if (!d.hand.length) return `<p class="game-note">${t('gc_hand_empty')}</p>`;
  return `<div class="gc-cards">${d.hand.map((id, i) => gcCardHTML(id, d.mull ? `
      <button title="${t('gc_as_objective')}" onclick="gcPlayObjective(${i})">🎯</button>
      <button title="${t('gc_as_resource')}" onclick="gcPlayResource(${i})">⚡</button>
      <button title="${t('gc_discard')}" onclick="gcDiscard(${i})">♻</button>
      <button title="${t('gc_remove')}" onclick="gcRemove(${i})">✖</button>` : `
      <button title="${t('gc_mulligan_drop')}" onclick="gcDiscard(${i})">♻</button>`)).join('')}</div>`;
}

function gcPlayHTML(d) {
  if (!d.play.length) return `<p class="game-note">${t('gc_play_empty')}</p>`;
  return `<div class="gc-cards">${d.play.map((id, i) => gcCardHTML(id, `
      <button title="${t('gc_score')}" onclick="gcScore(${i})">✔</button>
      <button title="${t('gc_unplay')}" onclick="gcUnplay(${i})">♻</button>`)).join('')}</div>`;
}

function gcScoredHTML(d) {
  if (!d.scored.length) return `<p class="game-note">${t('gc_scored_empty')}</p>`;
  return `<div class="gc-cards">${d.scored.map((id, i) => gcCardHTML(id, `
      <span class="gc-vp">${(objCardById(id) || {}).vp || 0} VP</span>
      <button title="${t('gc_unscore')}" onclick="gcUnscore(${i})">↩</button>`)).join('')}</div>`;
}

// Какие фишки показать этому отряду: свои по фракции плюс те, чьи правила
// принесли нанятые модели (носители бывают с аффилиацией Unknown и уходят
// в чужую банду). Сверяемся с уже посчитанным списком трейтов d.tr
function gcTokensForRoster(faction, d) {
  const own = FACTION_TOKENS[faction] || [];
  const traitText = (d.tr || []).map(tr => {
    const desc = typeof getTraitDescription === 'function' ? getTraitDescription(tr) : '';
    return (tr + ' ' + (desc || '')).toLowerCase();
  }).join(' ');
  const extra = [];
  Object.entries(FACTION_TOKENS).forEach(([f, list]) => {
    if (f === faction) return;
    list.forEach(tk => { if (traitText.includes(tk.kw)) extra.push(tk); });
  });
  return own.concat(extra);
}

function gcTokensHTML(d, faction) {
  const counter = (label, value, minus, plus) => `
    <span class="gm-counter gc-token">${label}
      <button onclick="${minus}">−</button>
      <b>${value}</b>
      <button onclick="${plus}">+</button>
    </span>`;
  const rp = counter(t('gc_rp'), d.rp || 0, 'gcRp(-1)', 'gcRp(1)');
  const suspects = counter('Suspects', (d.tok || {}).susp || 0,
    "gcToken('susp',-1)", "gcToken('susp',1)");
  const factionTokens = gcTokensForRoster(faction, d).map(tk =>
    counter(tk.label, (d.tok || {})[tk.key] || 0,
      `gcToken('${tk.key}',-1)`, `gcToken('${tk.key}',1)`)).join('');
  const suspWarn = ((d.tok || {}).susp || 0) > 8 ? `<p class="game-note gc-warn">${t('gc_suspect_limit')}</p>` : '';
  return `<div class="gc-tokens">${rp}${suspects}${factionTokens}</div>${suspWarn}`;
}

// Список берём из состояния (посчитан при раздаче), а не пересчитываем на
// каждую перерисовку панели — разбор описаний трейтов ощутимо тормозит на телефоне
function gcTraitsHTML(d) {
  const traits = d.tr || [];
  if (!traits.length) return '';
  return `
    <div class="gc-block">
      <div class="gc-block-title">${t('gc_traits')}</div>
      <p class="game-note">${t('gc_traits_hint')}</p>
      <div class="gc-trait-chips">
        ${traits.map(tr => `
          <span class="gc-trait-chip" onclick="gmFxInfo('${tr.replace(/'/g, "\\'")}')">${replaceIcons(tr)}</span>`).join('')}
      </div>
    </div>`;
}

// Обязательные карты банды — справка со сканами (в колоду они не тасуются)
function gcMandatoryHTML(faction) {
  const cards = gcMandatoryCards(faction);
  if (!cards.length) return '';
  return `
    <div class="gc-block">
      <div class="gc-block-title">${t('gc_mandatory')}</div>
      <p class="game-note">${t('gc_mandatory_hint')}</p>
      <div class="gc-cards">
        ${cards.map(c => `
          <div class="gc-card" onclick="showObjectiveCardPreview('${c.id}', true)">
            <img src="${gcEsc(c.img)}" loading="lazy" decoding="async" alt="${gcEsc(c.name)}"
                 onerror="this.src='img/no.png'">
            <div class="gc-card-name">${gcEsc(c.name)}</div>
          </div>`).join('')}
      </div>
    </div>`;
}

// Панель колоды целей для своей стороны. Оппоненту она не показывается —
// рука по правилам скрыта от противника.
function gcPanelHTML(roster, side) {
  // Панель не должна ронять экран игры целиком: без каталога карт или без
  // функций из script.js просто не показываемся
  if (typeof OBJECTIVE_CARDS === 'undefined' || typeof objCardById !== 'function' ||
      typeof showObjectiveCardPreview !== 'function' || !roster) return '';
  const d = gcState();

  if (!d) {
    const has = !!gcDeckFromRoster(roster);
    return `
      <div class="game-panel gc-panel">
        <div class="game-panel-title">${t('gc_title')}</div>
        <p class="game-note">${has ? t('gc_start_hint') : t('gc_no_deck')}</p>
        ${has ? `<button class="rank-select-btn" onclick="gcStart(gcActiveRoster())">🎲 ${t('gc_start')}</button>` : ''}
      </div>`;
  }

  return `
    <div class="game-panel gc-panel">
      <div class="game-panel-title">${t('gc_title')}</div>

      <div class="gc-stats">
        <span class="gc-stat">${t('gc_deck')}: <b>${d.draw.length}</b></span>
        <span class="gc-stat">${t('gc_hand')}: <b>${d.hand.length}/${OBJ_HAND_SIZE}</b></span>
        <span class="gc-stat">${t('gc_scored')}: <b>${d.scored.length}</b> · <b>${gcScoredVp()} VP</b></span>
        <span class="gc-stat">${t('gc_removed')}: <b>${d.removed.length}</b></span>
      </div>

      ${gcTokensHTML(d, roster.f)}

      <div class="gc-actions-row">
        <button class="game-cond-btn" title="${t('gc_shuffle')}" onclick="gcShuffleDeck()">🔀</button>
        <button class="game-cond-btn" title="${t('gc_apply_vp')}" onclick="gcApplyVp('${side}')">🏆</button>
        <button class="game-cond-btn" title="${t('gc_reset')}" onclick="gcReset(gcActiveRoster())">🗑</button>
      </div>

      <div class="gc-block">
        <div class="gc-block-title">${t('gc_hand')}</div>
        ${d.mull ? '' : `
          <p class="game-note">${t('gc_mulligan_hint')}</p>
          <button class="rank-select-btn" onclick="gcMulliganDone()">${t('gc_mulligan_done')}</button>`}
        ${gcHandHTML(d)}
      </div>

      <div class="gc-block">
        <div class="gc-block-title">${t('gc_in_play')}</div>
        ${gcPlayHTML(d)}
      </div>

      <div class="gc-block">
        <div class="gc-block-title">${t('gc_scored')}</div>
        ${gcScoredHTML(d)}
      </div>

      ${gcTraitsHTML(d)}
      ${gcMandatoryHTML(roster.f)}
    </div>`;
}

// Ростер игрока в текущей игре (панель работает только на своей стороне)
function gcActiveRoster() {
  if (!activeGame) return null;
  const meIsHost = activeGame.host.name === currentUser;
  const me = meIsHost ? activeGame.host : activeGame.guest;
  return me ? me.roster : null;
}

function gcMySide() {
  if (!activeGame) return 'host';
  return activeGame.host.name === currentUser ? 'host' : 'guest';
}

// Перерисовка только панели колоды — экран игры целиком не трогаем,
// чтобы не сбрасывать прокрутку и не мигать ростерами
function gcRender() {
  const box = document.getElementById('gameCardsPanel');
  const roster = gcActiveRoster();
  if (!box || !roster) return;
  box.innerHTML = gcPanelHTML(roster, gcMySide());
}
