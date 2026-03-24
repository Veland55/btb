// ======================== ГЛОБАЛЬНЫЕ ========================
let crew = [];
let crewEquipmentCounts = {}; // { "Magazine": count } for crew-wide limits
let modifiers = {
  extraFreeAgents: 0,
  extraVehicles: 0,
  extraFunding: 0,
  extraDuplicates: 0,
  extraElites: {},
  extraVeterans: {},
  extraMinions: {},
  extraTalons: 0,
  allowBetray: false,
  charismaticUsed: false // Был ли уже использован слот от Charismatic
};
let currentFaction = null; // Изменено: null по умолчанию (нет фракции)
let allCompendiumHTML = "";
let compendiumKeys = [];
let specialTraitNames = new Set(); // Кэш специальных трейтов

// Режимы просмотра
let currentMode = 'menu'; // menu, cards, builder, rules

// ======================== ИКОНКИ ========================
const ICON_MAP = {
  "{+ATT_ICON}": "img/ico/+ATT_ICON.png",
  "{+DEF_ICON}": "img/ico/+DEF_ICON.png",
  "{-ATT_ICON}": "img/ico/-ATT_ICON.png",
  "{-DEF_ICON}": "img/ico/-DEF_ICON.png",
  "{AFF_BANE_ICON}": "img/ico/AFF_BANE_ICON.png",
  "{AFF_BATMAN_ICON}": "img/ico/AFF_BATMAN_ICON.png",
  "{AFF_CULTS_ICON}": "img/ico/AFF_CULTS_ICON.png",
  "{AFF_CRIME_ICON}": "img/ico/AFF_CRIME_ICON.png",
  "{AFF_HARLEY_QUINN_FRIENDS_ICON}": "img/ico/AFF_HARLEY_QUINN_FRIENDS_ICON.png",
  "{AFF_JOKER_ICON}": "img/ico/AFF_JOKER_ICON.png",
  "{AFF_LAW_FORCES_ICON}": "img/ico/AFF_LAW_FORCES_ICON.png",
  "{AFF_LEAGUE_ICON}": "img/ico/AFF_LEAGUE_ICON.png",
  "{AFF_MRFREEZE_ICON}": "img/ico/AFF_MRFREEZE_ICON.png",
  "{AFF_OWLS_ICON}": "img/ico/AFF_OWLS_ICON.png",
  "{AFF_PENGUIN_ICON}": "img/ico/AFF_PENGUIN_ICON.png",
  "{AFF_RIDDLER_ICON}": "img/ico/AFF_RIDDLER_ICON.png",
  "{AFF_ROYAL_FLUSH_ICON}": "img/ico/AFF_ROYAL_FLUSH_ICON.png",
  "{AFF_SCARECROW_ICON}": "img/ico/AFF_SCARECROW_ICON.png",
  "{AFF_SUICIDE_SQUAD_ICON}": "img/ico/AFF_SUICIDE_SQUAD_ICON.png",
  "{BLOOD_ICON}": "img/ico/BLOOD_ICON.png",
  "{CROWN_ICON}": "img/ico/CROWN_ICON.png",
  "{EFF_BLIND_ICON}": "img/ico/EFF_BLIND_ICON.png",
  "{EFF_ENERV1_ICON}": "img/ico/EFF_ENERV1_ICON.png",
  "{EFF_FIRE_ICON}": "img/ico/EFF_FIRE_ICON.png",
  "{EFF_FREEZE_ICON}": "img/ico/EFF_FREEZE_ICON.png",
  "{EFF_PARALYZE_ICON}": "img/ico/EFF_PARALYZE_ICON.png",
  "{EFF_POISON1_ICON}": "img/ico/EFF_POISON1_ICON.png",
  "{EFF_SCARED_ICON}": "img/ico/EFF_SCARED_ICON.png",
  "{EFF_STUNNED_ICON}": "img/ico/EFF_STUNNED_ICON.png",
  "{KD_ICON}": "img/ico/KD_ICON.png",
  "{MOV+2_ICON}": "img/ico/MOV+2_ICON.png",
  "{MOV+4_ICON}": "img/ico/MOV+4_ICON.png",
  "{MOV-2_ICON}": "img/ico/MOV-2_ICON.png",
  "{OBJECTIVE_CROSS_ICON}": "img/ico/OBJECTIVE_CROSS_ICON.png",
  "{OT_CONTROL_ICON}": "img/ico/OT_CONTROL_ICON.png",
  "{OT_MENACE_ICON}": "img/ico/OT_MENACE_ICON.png",
  "{OT_PROTECTION_ICON}": "img/ico/OT_PROTECTION_ICON.png",
  "{OT_VIOLENCE_ICON}": "img/ico/OT_VIOLENCE_ICON.png",
  "{RANK_FREEAGENT_ICON}": "img/ico/RANK_FREEAGENT_ICON.png",
  "{RANK_HENCHMAN_ICON}": "img/ico/RANK_HENCHMAN_ICON.png",
  "{RANK_LEADER_ICON}": "img/ico/RANK_LEADER_ICON.png",
  "{RANK_SIDEKICK_ICON}": "img/ico/RANK_SIDEKICK_ICON.png",
  "{RANK_VEHICLE_ICON}": "img/ico/RANK_VEHICLE_ICON.png",
  "{SPECIAL_ICON}": "img/ico/SPECIAL_ICON.png",
  "{STUN_ICON}": "img/ico/STUN_ICON.png"
};

function replaceIcons(text) {
  if (!text) return "";
  let html = text;
  Object.keys(ICON_MAP).forEach(tag => {
    const iconFile = ICON_MAP[tag];
    const safeTag = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(safeTag, 'g');
    html = html.replace(regex, `<img src="${iconFile}" class="inline-icon" alt="icon">`);
  });
  return html;
}

// ======================== ЛОКАЛИЗАЦИЯ ========================
let currentLang = 'ru';

const translations = {
  ru: {
    cards: "КАРТОЧКИ",
    crews: "ОТРЯДЫ",
    rules: "ПРАВИЛА",
    select_faction: "ВЫБОР ФРАКЦИИ",
    crew: "ОТРЯД",
    rep: "REP",
    back: "НАЗАД",
    compendium: "СПРАВОЧНИК",
    rulebook: "Правила",
    faqs: "FAQ",
    batmatch: "Batmatch",
    model_search: "ПОИСК МОДЕЛЕЙ",
    compendium_search: "Поиск по трейтам, оружию, правилам...",
    model_search_placeholder: "Введите имя модели...",
    nothing_found: "Ничего не найдено",
    subtitle: "Batman: Gotham Chronicles<br>Конструктор отрядов",
    leader_first: "Первой моделью должен быть Leader для этой фракции!",
    leader_cults: "Для фракции Cults лидером может быть только Deacon Blackfire или Kobra",
    treacherous_warn: "Предупреждение: Treacherous модель может предать отряд!",
    boss_sidekick: "Если босс — Sidekick, модели с Leader/Sidekick можно добавить только как Sidekick",
    rank_not_found: "У модели не указан ранг!",
    min_limit_100: "Минимальный лимит — 100 Rep",
    rep_exceeds: "Внимание! Текущий отряд ({current} Rep) превышает новый лимит ({new} Rep).",
    rank_not_selected: "Ранг модели не выбран!",
    rep_exceeded: "Превышен лимит Reputation (учтено снаряжение)",
    funding_insufficient: "Недостаточно Funding (учтено снаряжение)",
    leader_required: "Первой моделью должен быть {rank}",
    model_not_affiliation: "Модель не входит в аффилиацию Босса",
    model_not_match_affiliation: "Модель не совпадает по Affiliation с Боссом или не имеет аффилиации Unknown",
    model_not_match: "Модель не совпадает по Affiliation с Боссом",
    leader_trait_required: "Для лидера {leader} разрешены только модели с трейтом \"{trait}\"",
    model_already_added: "Вы уже добавили модель с именем («{name}»)",
    only_one_leader: "Только один Leader",
    leader_already_added: "Нельзя добавить Leader, если Sidekick уже является лидером отряда",
    max_2_sidekick: "Максимум 2 Sidekick без Leader",
    max_1_sidekick_with_leader: "Максимум 1 Sidekick с Leader",
    fa_limit_exceeded: "Превышен лимит Free Agents",
    vehicle_limit_exceeded: "Превышен лимит Vehicles",
    henchman_limit_exceeded: "Нельзя брать больше Henchmen с одинаковым именем (учтены трейты)",
    elite_limit_exceeded: "Превышен лимит Elite ({type})",
    veteran_limit_exceeded: "Превышен лимит Veteran ({type})",
    minion_limit_exceeded: "Превышен лимит Minion ({type})",
    horde_limit_exceeded: "Превышен лимит для Horde",
    hates_cannot_add: "Нельзя добавить: Hates ({hated})",
    avert_cannot_add: "Нельзя добавить: Aversion ({averted})",
    required_cannot_add: "Требуется: Required ({required})",
    incorruptible_cannot_add: "Incorruptible: Нельзя в эту фракцию",
    requires_liberator: "Требует освободителя (He Freed Me)",
    requires_idol: "Требует кумира (My Idol!)",
    possessed_only_supernatural: "Possessed: Только в сверхъестественных фракциях",
    requires_goliath: "Требует Goliath",
    sidekick_limit_exceeded: "Превышен лимит Sidekick",
    leader_required_for_sidekick: "Требует Leader для Sidekick",
    amazon_lineage: "Amazon Lineage: Только в amazon фракциях",
    animal_no_equipment: "Модели с трейтом Animal не могут покупать оборудование!",
    fully_equipped_no_equipment: "Модель с трейтом Fully Equipped не может покупать оборудование!",
    limited_equipment_max_reached: "Модель с трейтом Limited Equipment уже достигла лимита в 1 единицу оборудования!",
    export_empty_roster: "Отряд пуст! Добавьте модели перед экспортом.",
    export_copied: "Ростер скопирован в буфер обмена!",
    export_copy_prompt: "Скопируйте текст ростера:",
    charismatic_available: "ДОСТУПЕН",
    charismatic_used: "ИСПОЛЬЗОВАН",
    export_title: "Экспорт ростера",
    no_available_equipment: "Нет доступного оборудования",
    henry_ducard_sidekick_requires_ras: "Henry Ducard может быть нанят как Sidekick только если лидером банды является Ra's al Ghul Decoy!",
    model_requires_other: "Модель {model} требует, чтобы в отряде была модель {required}"
  },
  en: {
    cards: "CARDS",
    crews: "CREWS",
    rules: "RULES",
    select_faction: "SELECT FACTION",
    crew: "CREW",
    rep: "REP",
    back: "BACK",
    compendium: "COMPENDIUM",
    rulebook: "Rulebook",
    faqs: "FAQs",
    batmatch: "Batmatch",
    model_search: "MODEL SEARCH",
    compendium_search: "Search traits, weapons, rules...",
    model_search_placeholder: "Enter model name...",
    nothing_found: "Nothing found",
    subtitle: "Batman: Gotham Chronicles<br>Crew Builder",
    leader_first: "Leader must be the first model for this faction!",
    leader_cults: "For Cults faction, only Deacon Blackfire or Kobra can be leader",
    treacherous_warn: "Warning: Treacherous model may betray the crew!",
    boss_sidekick: "If boss is Sidekick, models with Leader/Sidekick can only be added as Sidekick",
    rank_not_found: "Model rank not specified!",
    min_limit_100: "Minimum limit is 100 Rep",
    rep_exceeds: "Warning! Current crew ({current} Rep) exceeds new limit ({new} Rep).",
    rank_not_selected: "Model rank not selected!",
    rep_exceeded: "Reputation limit exceeded (equipment counted)",
    funding_insufficient: "Insufficient Funding (equipment counted)",
    leader_required: "{rank} must be the first model",
    model_not_affiliation: "Model is not in Boss's affiliation",
    model_not_match_affiliation: "Model doesn't match Boss's Affiliation or doesn't have Unknown affiliation",
    model_not_match: "Model doesn't match Boss's Affiliation",
    leader_trait_required: "For leader {leader}, only models with trait \"{trait}\" are allowed",
    model_already_added: "You've already added a model named \"{name}\"",
    only_one_leader: "Only one Leader",
    leader_already_added: "Cannot add Leader if Sidekick is already crew leader",
    max_2_sidekick: "Maximum 2 Sidekick without Leader",
    max_1_sidekick_with_leader: "Maximum 1 Sidekick with Leader",
    fa_limit_exceeded: "Free Agents limit exceeded",
    vehicle_limit_exceeded: "Vehicles limit exceeded",
    henchman_limit_exceeded: "Cannot add more Henchmen with the same name (traits counted)",
    elite_limit_exceeded: "Elite limit exceeded ({type})",
    veteran_limit_exceeded: "Veteran limit exceeded ({type})",
    minion_limit_exceeded: "Minion limit exceeded ({type})",
    horde_limit_exceeded: "Horde limit exceeded",
    hates_cannot_add: "Cannot add: Hates ({hated})",
    avert_cannot_add: "Cannot add: Aversion ({averted})",
    required_cannot_add: "Required: Required ({required})",
    incorruptible_cannot_add: "Incorruptible: Cannot join this faction",
    requires_liberator: "Requires liberator (He Freed Me)",
    requires_idol: "Requires idol (My Idol!)",
    possessed_only_supernatural: "Possessed: Only in supernatural factions",
    requires_goliath: "Requires Goliath",
    sidekick_limit_exceeded: "Sidekick limit exceeded",
    leader_required_for_sidekick: "Requires Leader for Sidekick",
    amazon_lineage: "Amazon Lineage: Only in amazon factions",
    animal_no_equipment: "Models with Animal trait cannot purchase equipment!",
    fully_equipped_no_equipment: "Model with Fully Equipped trait cannot purchase any equipment!",
    limited_equipment_max_reached: "Model with Limited Equipment trait has already reached the limit of 1 equipment!",
    export_empty_roster: "Crew is empty! Add models before exporting.",
    export_copied: "Roster copied to clipboard!",
    export_copy_prompt: "Copy the roster text:",
    charismatic_available: "AVAILABLE",
    charismatic_used: "USED",
    export_title: "Export Roster",
    no_available_equipment: "No available equipment",
    henry_ducard_sidekick_requires_ras: "Henry Ducard can only be recruited as Sidekick if Ra's al Ghul Decoy is the crew leader!",
    model_requires_other: "Model {model} requires {required} model in the crew"
  }
};

function t(key, params = {}) {
  const lang = translations[currentLang] || translations.ru;
  let text = lang[key] || translations.ru[key] || key;
  for (const [param, value] of Object.entries(params)) {
    text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), value);
  }
  return text;
}

function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;

  // Обновляем кнопки переключения
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Обновляем текстовые элементы (innerHTML для поддержки HTML тегов)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.innerHTML = t(key);
  });

  // Обновляем title атрибуты
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.dataset.i18nTitle;
    el.title = t(key);
  });

  // Обновляем placeholder'ы
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    el.placeholder = t(key);
  });

  // Сохраняем в localStorage
  localStorage.setItem('bmg_lang', lang);

  // Перерисовываем компендиум если открыт
  if (document.getElementById('compendiumModal').classList.contains('active')) {
    openCompendium();
  }
}

// Загрузка сохранённого языка при старте
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('bmg_lang') || 'ru';
  setLanguage(savedLang);
});

const $ = id => document.getElementById(id);
const hasInCrew = m => crew.some(x => x.name === m.name);
const countInCrew = m => crew.filter(x => x.name === m.name).length;

// ======================== ФУНКЦИИ МЕНЮ ========================
// Улучшенная функция очистки имени от иконок и лишних символов
function getCleanName(name) {
  if (!name) return "";
  // Удаляем всё, что в фигурных скобках {...} и обрезаем пробелы
  // Также заменяем специфические апострофы на стандартные
  return name.split('{')[0].trim().replace(/’/g, "'");
}

function findCompendiumEntry(searchTerm) {
  if (!window.compendium) return null;

  // 1. Очищаем поисковый запрос (например, "Fly {ICON}" -> "Fly")
  const cleanSearch = getCleanName(searchTerm);
  const lowerSearch = cleanSearch.toLowerCase();

  // 2. Пробуем найти точное совпадение (на случай, если ищем "Fast (2'')")
  if (window.compendium[searchTerm]) return window.compendium[searchTerm];
  if (window.compendium[cleanSearch]) return window.compendium[cleanSearch];

  const keys = Object.keys(window.compendium);

  // 3. Поиск с игнорированием регистра и иконок в ключах базы
  for (let key of keys) {
    const cleanKey = getCleanName(key).toLowerCase();
    if (cleanKey === lowerSearch) {
      return window.compendium[key];
    }
  }

  // 4. Логика для трейтов с параметрами в скобках, например "Fast (3)"
  // Если в карточке "Fast (2'')", а в базе "Fast" или "Fast {ICON}"
  if (cleanSearch.includes('(')) {
    const baseName = cleanSearch.split('(')[0].trim().toLowerCase();
    for (let key of keys) {
      const cleanKey = getCleanName(key).split('(')[0].trim().toLowerCase();
      if (cleanKey === baseName) {
        return window.compendium[key];
      }
    }
  }

  return null;
}

// ======================== ПРОВЕРКА ЗАВИСИМОСТЕЙ МОДЕЛЕЙ ========================
// Возвращает true, если зависимость модели выполнена (требуемая модель есть в отряде)
// Также проверяет правила Aversion — если в отряде есть модель из списка Aversion, возвращает false
function checkModelDependency(model) {
  // Проверяем зависимости (Required)
  const dependency = window.modelDependencyRules?.[model.name];
  if (dependency) {
    const requiredModel = dependency.requiredModel;
    if (requiredModel) {
      // Проверяем, есть ли требуемая модель в отряде
      if (!crew.some(m => m.name === requiredModel)) {
        return false;
      }
    }
  }

  // Проверяем правила Aversion
  const aversionList = window.modelAversionRules?.[model.name];
  if (aversionList && Array.isArray(aversionList)) {
    // Если в отряде есть хотя бы одна модель из списка Aversion, эта модель не может быть добавлена
    if (crew.some(m => aversionList.includes(m.name))) {
      return false;
    }
  }

  // Также проверяем обратную ситуацию: если эта модель в отряде,
  // то модели из её списка Aversion не могут быть добавлены
  // Это обрабатывается при фильтрации списка моделей

  return true;
}

// Возвращает имя требуемой модели или null, если зависимости нет или она выполнена
function getUnmetDependency(model) {
  const dependency = window.modelDependencyRules?.[model.name];
  if (!dependency) return null;

  const requiredModel = dependency.requiredModel;
  if (!requiredModel) return null;

  if (!crew.some(m => m.name === requiredModel)) {
    return requiredModel;
  }

  return null;
}

// Проверяет, должна ли модель быть скрыта из-за правил Aversion
// Возвращает true, если модель должна быть скрыта (в отряде есть модель, для которой эта модель в списке Aversion)
function checkAversionHidden(model) {
  // Проверяем каждую модель в отряде: есть ли текущая модель в её списке Aversion
  for (const crewModel of crew) {
    const aversionList = window.modelAversionRules?.[crewModel.name];
    if (aversionList && Array.isArray(aversionList) && aversionList.includes(model.name)) {
      return true; // Эта модель должна быть скрыта
    }
  }
  return false;
}

function showCards() {
  currentMode = 'cards';
  $('mainMenu').style.display = 'none';
  $('cardsSection').style.display = 'block';
  $('builderSection').style.display = 'none';
  $('compendiumModal').classList.remove('active');

  // Сбрасываем фракцию и показываем вкладки
  currentFaction = null;
  $('modelsGridCards').innerHTML = '';
  $('cardsTabsContainer').classList.remove('hidden');
  initTabs();
}

function showBuilder() {
  currentMode = 'builder';
  $('mainMenu').style.display = 'none';
  $('cardsSection').style.display = 'none';
  $('builderSection').style.display = 'block';
  $('factionSelect').style.display = 'block';
  $('builderMain').style.display = 'none';
  $('compendiumModal').classList.remove('active');
  $('builderFactionCards').classList.remove('hidden'); // Показываем вкладки фракций
  initTabs(); // Инициализация табов для выбора фракции
}

function showRules() {
  currentMode = 'rules';
  $('mainMenu').style.display = 'none';
  $('cardsSection').style.display = 'none';
  $('builderSection').style.display = 'none';
  openCompendium();
}

function backToMenu() {
  currentMode = 'menu';
  $('mainMenu').style.display = 'flex';
  $('cardsSection').style.display = 'none';
  $('builderSection').style.display = 'none';
  $('compendiumModal').classList.remove('active');
  $('modelSearchModal').classList.remove('active');
  resetCrew();

  // Восстанавливаем состояние для cardsSection при повторном входе
  currentFaction = null;
  if ($('cardsTabsContainer')) {
    $('cardsTabsContainer').classList.remove('hidden');
    $('modelsGridCards').innerHTML = '';
  }
}

function backToFactionSelect() {
  $('factionSelect').style.display = 'block';
  $('builderMain').style.display = 'none';
  $('builderFactionCards').classList.remove('hidden'); // Показываем вкладки фракций
  resetCrew();
}

// ПРАВКА: Добавляем недостающие функции закрытия модалов
function closeCompendium() {
  $('compendiumModal').classList.remove('active');
  if (currentMode === 'rules') backToMenu(); // ПРАВКА: Возврат в меню для "Правила"
}

function closeModelSearch() {
  $('modelSearchModal').classList.remove('active');
}

// ======================== ВЫБОР ФРАКЦИИ В БИЛДЕРЕ ========================
function selectFaction(faction) {
  currentFaction = faction;
  $('factionSelect').style.display = 'none';
  $('builderFactionCards').classList.add('hidden'); // Скрываем вкладки фракций
  $('builderMain').style.display = 'block';
  renderMiniCardsBuilder();
  updateCrewBar();
}

// ======================== ОТРЯД (ТОЛЬКО ДЛЯ БИЛДЕРА) ========================
const addToCrew = m => {
  // Проверка на Mercenary - автоматически считаем как Free Agent
  if (m.traits.includes("Mercenary")) {
    m.rankUsed = "Free Agent";
  }
  
  const isMinionOrHorde = m.traits.some(t => t.startsWith("Minion") || t === "Horde");
  const factionRules = factionCrewRules[currentFaction] || {};

  if (!isMinionOrHorde && hasInCrew(m)) {
    removeFromCrew(m);
  } else {
    let ranks = getRanks(m);

    if (!BMG_BOSS && factionRules.mustHaveLeaderAsBoss && !ranks.includes("Leader")) {
      alert(t("leader_first"));
      return;
    }

    // Если босс — Sidekick, и модель имеет оба ранга (Leader и Sidekick), автоматически выбираем Sidekick
    if (BMG_BOSS && BMG_BOSS.rankUsed === "Sidekick" && ranks.includes("Leader") && ranks.includes("Sidekick")) {
      ranks = ["Sidekick"];
    }

    if (ranks.length === 1) {
      addModelWithRank(m, ranks[0]);
    } else if (ranks.length > 1) {
      showRankSelectionModal(m, ranks);
    } else {
      alert(t("rank_not_found"));
    }
  }

  modifiers = calculateModifiers();
  updateCrewBar();
  renderMiniCardsBuilder();
};

function addModelWithRank(model, chosenRank) {
  // Проверка на Treacherous - предупреждение
  if (model.traits.includes("Treacherous")) {
    alert(t("treacherous_warn"));
  }

  const factionRules = factionCrewRules[currentFaction] || {};
  // Специальное правило для Cults: первым (Leader) может быть только Deacon Blackfire или Kobra
  if (currentFaction === "Cults" && !BMG_BOSS && chosenRank === "Leader") {
    if (!["Deacon Blackfire", "Kobra"].includes(model.name)) {
      alert(t("leader_cults"));
      return;
    }
  }
  if (!BMG_BOSS && factionRules.mustHaveLeaderAsBoss && chosenRank !== "Leader") {
    alert(t("leader_first"));
    return;
  }

  // Если босс — Sidekick, и модель имеет оба ранга (Leader и Sidekick), то можно добавить только как Sidekick
  if (BMG_BOSS && BMG_BOSS.rankUsed === "Sidekick") {
    const modelRanks = getRanks(model);
    if (modelRanks.includes("Leader") && modelRanks.includes("Sidekick") && chosenRank === "Leader") {
      alert(t("boss_sidekick"));
      return;
    }
  }

  // Специальное правило для Henry Ducard: может быть Sidekick только если лидером нанят Ra's al Ghul Decoy
  if (model.name === "Henry Ducard" && chosenRank === "Sidekick") {
    const hasRasGhulDecoyAsLeader = BMG_BOSS && BMG_BOSS.name === "Ra's al Ghul Decoy" && BMG_BOSS.rankUsed === "Leader";
    if (!hasRasGhulDecoyAsLeader) {
      alert(t("henry_ducard_sidekick_requires_ras"));
      return;
    }
  }

  const cloned = { ...model, rankUsed: chosenRank, uniqueId: Date.now() + Math.random(), equipment: [] };
  if (!bmgCanAddModel(cloned)) return;
  // ИЗМЕНЕНИЕ: используем unshift вместо push для добавления в начало массива
  crew.unshift(cloned);
  if (!BMG_BOSS && (chosenRank === "Leader" || chosenRank === "Sidekick")) {
    BMG_BOSS = cloned;
    BMG_AFFILIATIONS = getFactions(cloned);
  }
  updateCrewEquipmentCounts();
  modifiers = calculateModifiers();
  updateCrewBar();
  renderMiniCardsBuilder();
}

// Модальное окно выбора ранга
function showRankSelectionModal(model, ranks) {
  // Если босс — Sidekick, и модель имеет оба ранга (Leader и Sidekick), показываем только Sidekick
  let availableRanks = ranks;
  if (BMG_BOSS && BMG_BOSS.rankUsed === "Sidekick") {
    const modelRanks = getRanks(model);
    if (modelRanks.includes("Leader") && modelRanks.includes("Sidekick")) {
      availableRanks = ["Sidekick"];
    }
  }

  // Специальное правило для Henry Ducard: может быть Sidekick только если лидером нанят Ra's al Ghul Decoy
  if (model.name === "Henry Ducard" && availableRanks.includes("Sidekick")) {
    const hasRasGhulDecoyAsLeader = BMG_BOSS && BMG_BOSS.name === "Ra's al Ghul Decoy" && BMG_BOSS.rankUsed === "Leader";
    if (!hasRasGhulDecoyAsLeader) {
      // Если Ra's al Ghul Decoy не лидер, убираем Sidekick из доступных рангов
      availableRanks = availableRanks.filter(r => r !== "Sidekick");
    }
  }

  // Создаём overlay
  const overlay = document.createElement("div");
  overlay.className = "rank-select-modal";
  overlay.innerHTML = `
    <div class="rank-select-content">
      <div class="rank-select-header">
        Выберите ранг для <strong>${model.name}</strong>
        <div class="rank-select-close" onclick="this.closest('.rank-select-modal').remove()">×</div>
      </div>
      <div class="rank-select-buttons">
        ${availableRanks.map(rank => `
          <button class="rank-select-btn" data-rank="${rank}">
            ${rank}
          </button>
        `).join("")}
      </div>
    </div>
  `;

  // Обработчик выбора
  overlay.querySelectorAll(".rank-select-btn").forEach(btn => {
    btn.onclick = () => {
      const chosenRank = btn.dataset.rank;
      addModelWithRank(model, chosenRank);
      modifiers = calculateModifiers();
      updateCrewBar();
      renderMiniCardsBuilder();
      overlay.remove();
    };
  });

  // Клик вне окна — закрыть
  overlay.onclick = e => {
    if (e.target === overlay) overlay.remove();
  };

  document.body.appendChild(overlay);
};

const removeFromCrew = m => {
  const index = crew.findLastIndex(x => x.name === m.name);
  if (index !== -1) {
    crew.splice(index, 1);
    if (BMG_BOSS && BMG_BOSS.name === m.name) {
      BMG_BOSS = null;
      BMG_AFFILIATIONS = null;
      crew = [];  // Полностью очищаем отряд при удалении босса
    }
    updateCrewEquipmentCounts();
    modifiers = calculateModifiers();
    updateCrewBar();
    renderMiniCardsBuilder();
  }
};

// New: Recalculate crew-wide equipment counts
function updateCrewEquipmentCounts() {
  crewEquipmentCounts = {};
  crew.forEach(m => {
    m.equipment.forEach(eq => {
      crewEquipmentCounts[eq.name] = (crewEquipmentCounts[eq.name] || 0) + 1;
    });
  });
}

const updateCrewBar = () => {
  $("crewCount").textContent = crew.length;
  let totalRep = crew.reduce((a, m) => a + (m.rep || 0) + m.equipment.reduce((b, eq) => b + (eq.repCost || 0), 0), 0);
  let usedFunding = crew.reduce((a, m) => a + (m.funding || 0) + m.equipment.reduce((b, eq) => b + (eq.fundingCost || 0), 0), 0);
  $("totalRep").textContent = totalRep;
  $("totalFunding").textContent = `${usedFunding} / ${bmgFundingLimit()}`;
  
  // Обновляем индикатор Charismatic
  const hasCharismatic = crew.some(m => m.traits && m.traits.includes("Charismatic"));
  const indicator = $("charismaticIndicator");
  const status = $("charismaticStatus");
  
  if (hasCharismatic) {
    indicator.style.display = "inline";
    if (modifiers.charismaticUsed) {
      status.textContent = t("charismatic_used");
      status.style.color = "#ff4444";
    } else {
      status.textContent = t("charismatic_available");
      status.style.color = "#44ff44";
    }
  } else {
    indicator.style.display = "none";
  }
};

function calculateModifiers() {
  const mods = { 
    extraFreeAgents: 0, 
    extraVehicles: 0, 
    extraFunding: 0, 
    extraDuplicates: 0, 
    extraElites: {}, 
    extraVeterans: {}, 
    extraMinions: {},
    extraTalons: 0,
    allowBetray: false
  };

  crew.forEach(m => {
    m.traits.forEach(t => {
      // === Уже были ===
      if (t === "Business Agent") mods.extraFunding += 100;
      if (t === "Kaos Agent") mods.extraDuplicates += 1;

      const eliteBossMatch = t.match(/^Elite Boss \((.+)\)$/);
      if (eliteBossMatch) {
        const type = eliteBossMatch[1];
        mods.extraElites[type] = (mods.extraElites[type] || 0) + 1;
      }

      const veteranBossMatch = t.match(/^Veteran Boss \((.+)\)$/);
      if (veteranBossMatch) {
        const type = veteranBossMatch[1];
        mods.extraVeterans[type] = (mods.extraVeterans[type] || 0) + 1;
      }

      const minionBossMatch = t.match(/^Minion Boss \((.+)\)$/);
      if (minionBossMatch) {
        const type = minionBossMatch[1];
        mods.extraMinions[type] = (mods.extraMinions[type] || 0) + 1;
      }

      // === НОВЫЕ ТРЕЙТЫ, влияющие на набор банды ===

      // Funding
      if (t === "Black Market Connections") mods.extraFunding += 200;
      if (t === "Corporate Resources") mods.extraFunding += 300;
      if (t === "Politician") mods.extraFunding += 200;
      if (t === "Rich") mods.extraFunding += 200; // чаще всего 200, иногда 100 — можно уточнить по модели
      if (t === "Supply Cache") mods.extraFunding += 300;
      
      // Новые трейты для Funding
      if (t === "Corrupt") mods.extraFunding += 50; // +Funding для corrupt моделей
      if (t === "Vocational") mods.extraFunding += 200; // +Funding для vocational jobs

      // Free Agents
      if (t === "Undercover Agent") mods.extraFreeAgents += 1;
      if (t === "Politician") mods.extraFreeAgents += 1; // у большинства версий Politician даёт +1 FA
      if (t === "Mercenary") mods.extraFreeAgents += 1; // +1 Free Agent слот
      if (t === "Heir to the Cowl" && currentFaction === "Bat Family") mods.extraFreeAgents += 1; // +1 FA в Bat Family
      if (t === "Watchmen") mods.extraFreeAgents += 1; // +1 FA для Watchmen

      // Vehicles
      if (t === "Vehicle Boss" || t === "Large Vehicle Boss") mods.extraVehicles += 1;

      // Дополнительные Henchmen (дубликаты уникальных)
      if (t === "Recruiter") mods.extraDuplicates += 1;

      // Horde
      if (t === "Horde") mods.extraMinions["All"] = (mods.extraMinions["All"] || 0) + 3; // +3 миньона любого типа
      
      // Court of Owls
      if (t === "Court of Owls Crew") mods.extraTalons += 2; // +2 Talons для resurrection
      
      // Treacherous
      if (t === "Treacherous") mods.allowBetray = true; // Разрешает betray

      // Редкие/специфические случаи (на будущее, если встретятся модели)
      if (t === "Tactician") mods.extraFreeAgents += 1; // иногда даёт +1 FA
      if (t === "Strategist") mods.extraDuplicates += 1; // иногда +1 Henchman

      // Добавь здесь другие трейты, если в compendium появятся новые с бонусами к набору
    });
  });

  return mods;
}

// ПРАВКА: Добавляем debounce для render функций, чтобы избежать частых вызовов (мобильная оптимизация)
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

// ======================== МИНИ-КАРТОЧКИ ========================
// Версия для просмотра (без +/-)
const renderMiniCardsView = debounce(() => {
  if (!currentFaction) {
    // Если фракция не выбрана, не рендерим ничего
    $('modelsGridCards').innerHTML = '';
    return;
  }

  const grid = $("modelsGridCards");

  // === ИСПРАВЛЕНО: используем canViewInFaction для режима просмотра ===
  // В режиме просмотра НЕ применяем правила factionCrewRules и modelDependencyRules
  // Эти правила работают только в билдере
  let filteredModels = models.filter(m => canViewInFaction(m, currentFaction));

  const rankOrder = {
    "Leader": 1,
    "Sidekick": 2,
    "Henchman": 3,
    "Free Agent": 4,
    "Vehicle": 5
  };

  filteredModels.sort((a, b) => {
    const ranksA = getRanks(a);
    const ranksB = getRanks(b);
    const minA = ranksA.length > 0 ? Math.min(...ranksA.map(r => rankOrder[r] || 999)) : 999;
    const minB = ranksB.length > 0 ? Math.min(...ranksB.map(r => rankOrder[r] || 999)) : 999;
    if (minA !== minB) return minA - minB;
    return a.name.localeCompare(b.name);
  });

  const fragment = document.createDocumentFragment();

  filteredModels.forEach(model => {
    const ranks = getRanks(model);

    const div = document.createElement("div");
    div.className = `mini-card`;

    div.innerHTML = `
<img src="${model.img}" onerror="this.src='https://veland55.github.io/btb/img/no.png'">
<div class="mini-info">
  <div class="mini-name">${model.name}</div>
  <div class="mini-ranks">
    ${ranks.map(rank => `<img src="https://veland55.github.io/btb/img/${rank}.png" alt="${rank}" class="rank-icon" onerror="this.src='https://veland55.github.io/btb/img/no.png'">`).join('')}
  </div>
  <div class="mini-rep">${model.rep} Rep • $${model.funding || 0}</div>
</div>
`;

    div.onclick = () => showFullCard(model);
    fragment.appendChild(div);
  });

  grid.innerHTML = "";
  grid.appendChild(fragment);
}, 100);

// Версия для билдера (с +/-)
const renderMiniCardsBuilder = debounce(() => {
  const grid = $("modelsGridBuilder");
  
  // ИЗМЕНЕНИЕ: Создаем массив для рендеринга - сначала отряд, затем все остальные модели
  let renderArray = [];
  
  // Сначала добавляем все модели из отряда (в порядке как они есть в crew)
  renderArray.push(...crew.map(m => {
    const originalModel = models.find(model => model.name === m.name);
    return { 
      ...originalModel, 
      inCrew: true, 
      count: countInCrew(originalModel),
      instance: m // ссылка на экземпляр в отряде
    };
  }));
  
  // === ИСПРАВЛЕНО: используем canHireInFaction для режима билдера ===
  let filteredModels = models.filter(m => canHireInFaction(m, currentFaction) && !hasInCrew(m));

  // Скрываем модели с невыполненными зависимостями
  filteredModels = filteredModels.filter(m => checkModelDependency(m));

  // Скрываем модели из-за правил Aversion (если в отряде есть модель, для которой эта модель в списке Aversion)
  filteredModels = filteredModels.filter(m => !checkAversionHidden(m));

  // Определение порядка рангов
  const rankOrder = {
    "Leader": 1,
    "Sidekick": 2,
    "Henchman": 3,
    "Free Agent": 4,
    "Vehicle": 5
  };

  // Сортировка: сначала по наивысшему (минимальному по номеру) рангу, затем по имени алфавитно
  filteredModels.sort((a, b) => {
    const ranksA = getRanks(a);
    const ranksB = getRanks(b);
    const minA = ranksA.length > 0 ? Math.min(...ranksA.map(r => rankOrder[r] || 999)) : 999;
    const minB = ranksB.length > 0 ? Math.min(...ranksB.map(r => rankOrder[r] || 999)) : 999;
    if (minA !== minB) return minA - minB;
    return a.name.localeCompare(b.name);
  });

  // Добавляем отфильтрованные модели в renderArray
  renderArray.push(...filteredModels.map(m => ({
    ...m,
    inCrew: false,
    count: 0
  })));

  const fragment = document.createDocumentFragment();

  renderArray.forEach(item => {
    const isMinionOrHorde = item.traits && item.traits.some(t => t.startsWith("Minion") || t === "Horde");
    const ranks = getRanks(item);

    const div = document.createElement("div");
    div.className = `mini-card ${item.inCrew ? "in-crew" : ""}`;

    let buttons = '';
    if (isMinionOrHorde) {
      buttons = `<button class="add-btn" onclick="event.stopPropagation();addToCrew(models[${item._id}])">+</button>`;
      if (item.count > 0) {
        buttons += `
          <button class="remove-btn" onclick="event.stopPropagation();removeFromCrew(models[${item._id}])">−</button>
          <span class="count">x${item.count}</span>`;
      }
    } else {
      buttons = `<button class="${item.inCrew ? "remove-btn" : "add-btn"}" onclick="event.stopPropagation();addToCrew(models[${item._id}])">${item.inCrew ? "−" : "+"}</button>`;
    }

    div.innerHTML = `
${buttons}
${item.inCrew && BMG_BOSS && BMG_BOSS.name === item.name ? '<span class="boss-crown">👑</span>' : ''}
<img src="${item.img}" onerror="this.src='https://veland55.github.io/btb/img/no.png'">
<div class="mini-info">
  <div class="mini-name">${item.name}</div>
  <div class="mini-ranks">
    ${ranks.map(rank => `<img src="https://veland55.github.io/btb/img/${rank}.png" alt="${rank}" class="rank-icon" onerror="this.src='https://veland55.github.io/btb/img/no.png'">`).join('')}
  </div>
  <div class="mini-rep">${item.rep} Rep • $${item.funding || 0}</div>
</div>
${item.inCrew ? '<div class="equipment-icon" onclick="event.stopPropagation(); openEquipmentMenu(models[' + item._id + '], this.closest(\'.mini-card\'))">⚙️</div>' : ''}
`;

    div.onclick = () => showFullCard(item);
    fragment.appendChild(div);
  });

  grid.innerHTML = "";
  grid.appendChild(fragment);
}, 100);

// ======================== ПОЛНАЯ КАРТОЧКА ========================
function renderTraits(traits) {
  if (!traits || !traits.length) return '';

  const traitsArray = Array.isArray(traits) ? traits : [traits];

  return traitsArray.map(trait => {
    const traitText = String(trait);
    const isSpecial = isSpecialTrait(traitText);
    const content = replaceIcons(traitText);
    const highlightClass = isSpecial ? 'special-trait-highlight' : '';

    return `
      <div class="official-trait ${highlightClass}"
           onclick="event.stopPropagation(); showTraitDesc('${traitText.replace(/'/g, "\\'")}')">
        ${content}
      </div>
    `;
  }).join('');
}

// Вспомогательная функция для определения специальных трейтов
function isSpecialTrait(trait) {
  // Если трейт содержит {SPECIAL_ICON} или {S} — он специальный
  if (trait.includes("{SPECIAL_ICON}") || trait.includes("{S}")) {
    return true;
  }

  // Очищаем трейт от иконок и пробелов
  const cleanTrait = getCleanName(trait).trim();

  // Проверяем в кэше специальных трейтов
  return specialTraitNames.has(cleanTrait);
}

// Вспомогательная функция для получения описания трейта
function getTraitDescription(trait) {
  const entry = findCompendiumEntry(trait);
  return entry ? entry.description : "Описание отсутствует";
}

const showFullCard = model => {
  const realName = model.realname || "—";
  const base = model.base || "30mm";

  // --- Основные фракции (faction) ---
  const mainFactions = Array.isArray(model.faction)
    ? model.faction
    : typeof model.faction === "string" && model.faction.trim()
      ? model.faction.replace(/ *& */gi, ",").replace(/ *\/ */g, ",").split(",").map(s => s.trim())
      : [];

  // --- Rivals (новое поле) ---
  const rivalFactions = Array.isArray(model.rivals)
    ? model.rivals
    : typeof model.rivals === "string" && model.rivals.trim()
      ? model.rivals.replace(/ *& */gi, ",").replace(/ *\/ */g, ",").split(",").map(s => s.trim())
      : [];

  // --- Ранг ---
  const rank = Array.isArray(model.rank)
    ? model.rank.join(" / ")
    : model.rank || "Free Agent";

  const rep = model.rep || 0;
  const funding = model.funding || 0;

  // --- Маппинг иконок ---
  const factionIcons = {
    "Bat Family": "BATMAN.png",
    "GCPD": "GCPD.png",
    "Birds of Prey": "BIRDS_OF_PREY.png",
    "Joker": "JOKER.png",
    "Bane": "SOLDIERS.png",
    "League of Shadows": "LEAGUE.png",
    "Royal Flush": "RoyalFlush.png",
    "Penguin": "PENGUIN.png",
    "Mr. Freeze": "MR_FREEZE.png",
    "Scarecrow": "SCARECROW.png",
    "Two-Face": "TWO-FACE.png",
    "The Riddler": "RIDDLER.png",
    "Organized Crime": "OrganizedCrime.png",
    "Suicide Squad": "Suicide_Squad.png",
    "Court of Owls": "OWLS.png",
    "Watchmen": "Watchmen.png",
    "Batman Who Laughs": "BatmanWhoLaughs.png",
    "Cults": "CULTS.png",
    "Doom Patrol": "Doom_Patrol.png",
    "Unknown": "UNKNOWN.png"
  };

  const renderIcons = arr => arr.length
    ? arr.map(f => {
        const file = factionIcons[f] || "UNKNOWN.png";
        return `<img src="https://veland55.github.io/btb/img/${file}" alt="${f}" class="faction-icon-small">`;
      }).join(" ")
    : "—";

  const factionIconsHTML = renderIcons(mainFactions);
  const rivalsIconsHTML   = renderIcons(rivalFactions);

  // --- Оружие и трейты ---
const weaponsHTML = model.weapons?.length ? model.weapons.map(w => {
    if (!w || Object.keys(w).length === 0) return "";
    const traits = w.traits ? w.traits.split("/").map(t => t.trim()).filter(Boolean) : [];
    return `
      <div class="official-weapon">
        <div class="official-weapon-first-line">
          <span class="official-weapon-name">${w.name || "Unnamed"}</span>
          ${w.damage ? `<span class="official-weapon-damage">${w.damage}</span>` : ""}
          ${w.rof && w.rof !== "-" ? `<span class="official-weapon-rof">${w.rof}<img src="https://veland55.github.io/btb/img/rof.png" class="stat-icon"></span>` : ""}
          ${w.ammo && w.ammo !== "-" ? `<span class="official-weapon-ammo">${w.ammo}<img src="https://veland55.github.io/btb/img/ammo.png" class="stat-icon"></span>` : ""}
        </div>
        ${traits.length ? `<div class="official-weapon-traits-line">${traits.map(t => `<span class="weapon-trait-chip" onclick="event.stopPropagation(); showTraitDesc('${t.replace(/'/g, "\\'")}')">${t}</span>`).join("")}</div>` : ""}
      </div>`;
  }).join("") : "";

  // ИСПРАВЛЕНО: Используем новую функцию renderTraits для отображения трейтов с иконками и специальными стилями
  const traitsHTML = model.traits?.length
    ? `<div class="official-section yellow"><div class="official-section-title">TRAITS</div><div class="official-traits-grid">${renderTraits(model.traits)}</div></div>`
    : "";

  // Новый блок: equipment (только если есть в crewModel)
  const crewModel = crew.find(m => m.name === model.name); // Находим экземпляр в crew
  let equipmentHTML = '';
  if (crewModel && crewModel.equipment && crewModel.equipment.length > 0) {
    equipmentHTML = `
      <div class="official-section-title">EQUIPMENT</div>
      <div class="official-traits-grid">
        ${crewModel.equipment.map(eq => `
          <div style="position: relative;">
            <button 
              class="official-trait equipment-chip" 
              onclick="showTraitPopup('${eq.name}', '${eq.effects.join('<br>')}')">
              ${eq.name} 
              <small>($${eq.fundingCost || 0}${eq.repCost ? ` +${eq.repCost} Rep` : ''})</small>
            </button>
            <span 
              class="remove-eq" 
              onclick="event.stopPropagation(); removeEquipmentFromModel('${model.name}', '${eq.name}')">
              ×
            </span>
          </div>
        `).join("")}
      </div>
    `;
  }
  
  // --- Финальная сборка карточки ---
  $("fullCardContent").innerHTML = `
    <div class="official-card">
      <div class="official-header">
        <div class="official-name">${model.name.toUpperCase()}</div>
        <div class="official-subtitle">${realName} / ${base}</div>
        
        <div class="official-subtitle faction-rivals-line">
          <span class="label-f">F:</span> ${factionIconsHTML}
          <span class="label-r">R:</span> ${rivalsIconsHTML}
        </div>
        
        <div class="official-subtitle rank-rep-line">
          <span class="rank-badge">${rank}</span>
          <span class="rep-funding">${rep} REP • $${funding}</span>
        </div>
      </div>

      <div class="official-main">
        <div class="official-img-wrapper">
          <img src="${model.img}" class="official-img" onerror="this.src='https://veland55.github.io/btb/img/no.png'">
        </div>
        <div class="official-stats">
          <div class="official-stat vertical-stat"><span class="official-value">${model.stats.Willpower || "-"}</span><span class="official-label">Willpower</span></div>
          <div class="official-stat vertical-stat"><span class="official-value">${model.stats.Endurance || "-"}</span><span class="official-label">Endurance</span></div>
          <div class="official-stat"><span class="official-value">${model.stats.Attack || "-"}</span><span class="official-label"><img src="https://veland55.github.io/btb/img/Attack.png" class="stat-icon"></span></div>
          <div class="official-stat"><span class="official-value">${model.stats.Defense || "-"}</span><span class="official-label"><img src="https://veland55.github.io/btb/img/Defense.png" class="stat-icon"></span></div>
          <div class="official-stat"><span class="official-value">${model.stats.Strength || "-"}</span><span class="official-label"><img src="https://veland55.github.io/btb/img/Strength.png" class="stat-icon"></span></div>
          <div class="official-stat"><span class="official-value">${model.stats.Movement || "-"}</span><span class="official-label"><img src="https://veland55.github.io/btb/img/Movement.png" class="stat-icon"></span></div>
        </div>
      </div>

      ${model.weapons?.length ? `<div class="official-section"><div class="official-section-title">WEAPONS</div>${weaponsHTML}</div>` : ""}
      ${traitsHTML}
      ${equipmentHTML}
    </div>`;

  $("fullCard").classList.add("active");
};

const closeFullCard = () => $("fullCard").classList.remove("active");

// ======================== COMPENDIUM ========================
const openCompendium = () => {
  $("compendiumModal").classList.add("active");
  $("compendiumSearch").value = "";
  $("compendiumSearch").placeholder = t("compendium_search");
  $("compendiumList").innerHTML = allCompendiumHTML;
  setTimeout(() => $("compendiumSearch").focus(), 300);
};

const clearCompendiumSearch = () => {
  $("compendiumSearch").value = "";
  document.querySelector("#compendiumModal .clear-search").style.display = "none";
  $("compendiumList").innerHTML = allCompendiumHTML;
};

$("compendiumSearch").oninput = function() {
  const q = this.value.toLowerCase().trim();
  document.querySelector("#compendiumModal .clear-search").style.display = q ? "flex" : "none";
  if (!q) { $("compendiumList").innerHTML = allCompendiumHTML; return; }
  const html = compendiumKeys.filter(k => k.toLowerCase().includes(q)).map(k => `
    <div class="comp-entry"><div class="comp-title">${k}</div><div class="comp-text">${replaceIcons((compendium[k]||"").replace(/\n/g,"<br>"))}</div></div>`).join("");
  $("compendiumList").innerHTML = html || `<div style="text-align:center;color:#888;padding:80px;font-size:18px;">${t("nothing_found")}</div>`;
};

// ======================== ПОИСК МОДЕЛЕЙ ========================
const openModelSearch = () => {
  $("modelSearchModal").classList.add("active");
  setTimeout(() => $("modelSearchInput").focus(), 300);
  renderModelSearch();
};

const renderModelSearch = () => {
  const query = $("modelSearchInput").value.toLowerCase().trim();
  document.querySelector("#modelSearchModal .clear-search").style.display = query ? "flex" : "none";

  const results = models
    .filter(m => {
      const factions = Array.isArray(m.faction)
        ? m.faction
        : typeof m.faction === "string"
          ? m.faction.replace(/ *& */gi,",").replace(/ *\/ */g,",").split(",").map(s=>s.trim())
          : [];
      // Проверяем фракцию и поиск по имени
      if (!factions.includes(currentFaction) || !m.name.toLowerCase().includes(query)) {
        return false;
      }
      // Проверяем зависимости модели - скрываем если зависимость не выполнена
      if (!checkModelDependency(m)) {
        return false;
      }
      return true;
    })
    .sort((a,b) => a.name.localeCompare(b.name));

  const html = results.length ? results.map(m => `
    <div class="comp-entry" style="cursor:pointer" onclick="showFullCard(models[${m._id}])">
      <div class="comp-title" style="background:#222;padding:16px;font-size:18px">
        ${m.name}<span style="float:right;color:#e94560;font-weight:bold">${m.rep} Rep</span>
      </div>
      <div class="comp-text" style="padding:12px;font-size:14px;color:#aaa">
        ${m.rank||"Free Agent"} • ${Array.isArray(m.faction)?m.faction.join(" • "):m.faction||"—"}
      </div>
    </div>`).join("") : `<div style="text-align:center;color:#888;padding:100px;font-size:18px">${t("nothing_found")}</div>`;

  $("modelSearchResults").innerHTML = html;
};

$("modelSearchInput").oninput = renderModelSearch;

// ======================== ТРЕЙТЫ ========================
function showTraitDesc(traitName) {
  // 1. Твоя родная логика поиска 1 в 1
  const entry = findCompendiumEntry(traitName);
  
  // 2. Извлекаем текст (проверяем, объект это или строка)
  let rawText = "";
  if (entry) {
    rawText = (typeof entry === 'object' && entry.description) ? entry.description : entry;
  } else {
    rawText = "Description not found in Compendium.";
  }

  // 3. Создаем элементы
  const overlay = document.createElement("div");
  overlay.className = "trait-popup";

  // Обрабатываем иконки в заголовке и в самом тексте
  const formattedTitle = replaceIcons(traitName); 
  const formattedBody = replaceIcons(rawText).replace(/\n/g, "<br>");

  overlay.innerHTML = `
    <div class="trait-popup-content">
      <div class="trait-popup-header">
        <strong>${formattedTitle}</strong>
        <div class="trait-popup-close" onclick="this.closest('.trait-popup').remove()">×</div>
      </div>
      <div class="trait-popup-body">
        ${formattedBody}
      </div>
    </div>
  `;

  // Закрытие по клику на фон
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

  document.body.appendChild(overlay);
}

// Функция для показа попапа с описанием (для трейтов и equipment) - ИСПРАВЛЕННАЯ ВЕРСИЯ
function showTraitPopup(name, desc) {
  // Обрабатываем и название, и описание с заменой иконок
  const processedName = replaceIcons(name || '');
  const processedDesc = replaceIcons(desc || '');
  
  // Создаём overlay (как в showRankSelectionModal)
  const overlay = document.createElement("div");
  overlay.className = "rank-select-modal"; // Используем существующий класс для стиля
  overlay.innerHTML = `
    <div class="rank-select-content">
      <div class="rank-select-header">
        ${processedName}   <!-- ← теперь здесь обрабатывается {SPECIAL_ICON} -->
        <div class="rank-select-close" onclick="this.closest('.rank-select-modal').remove()">×</div>
      </div>
      <div class="rank-select-buttons" style="padding: 24px 20px; font-size: 16px; line-height: 1.8; color: #eee;">
        ${processedDesc}
      </div>
    </div>
  `;

  // Клик вне окна — закрыть
  overlay.onclick = e => {
    if (e.target === overlay) overlay.remove();
  };

  document.body.appendChild(overlay);
}

// Новая функция для показа effects equipment
function removeEquipmentFromModel(modelName, eqName) {
  const crewModel = crew.find(m => m.name === modelName);
  if (crewModel && crewModel.equipment) {
    const index = crewModel.equipment.findIndex(eq => eq.name === eqName);
    if (index !== -1) {
      crewModel.equipment.splice(index, 1);
      updateCrewEquipmentCounts();
      modifiers = calculateModifiers();
      updateCrewBar();
      renderMiniCardsBuilder();
      showFullCard(models.find(m => m.name === modelName)); // Перерендерим полную карточку
    }
  }
}

// ======================== ВКЛАДКИ ========================
// Инициализация табов (для всех режимов)
function initTabs() {
  document.querySelectorAll('.faction-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.faction-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      currentFaction = card.dataset.faction; // Устанавливаем фракцию

      if (card.closest('#cardsSection')) { // Для cardsSection
        // Скрываем вкладки фракций после выбора
        $('cardsTabsContainer').classList.add('hidden');
        renderMiniCardsView(); // Рендерим модели только после выбора
      } else if (card.closest('#factionSelect')) {
        const faction = card.dataset.faction;
        selectFaction(faction);
      } else {
        if (currentMode === 'cards') {
          renderMiniCardsView();
        } else if (currentMode === 'builder') {
          renderMiniCardsBuilder();
        }
      }
    });
  });
}

// ======================== ИНИЦИАЛИЗАЦИЯ ========================
window.addEventListener("load", () => {
  // Инициализация compendium (если он есть)
  if (window.compendium) {
    compendiumKeys = Object.keys(window.compendium).sort();
    allCompendiumHTML = compendiumKeys.map(k => `
      <div class="comp-entry">
        <div class="comp-title">${k}</div>
        <div class="comp-text">${replaceIcons((compendium[k]||"").replace(/\n/g,"<br>"))}</div>
      </div>`).join("");
    $("compendiumList").innerHTML = allCompendiumHTML;

    // Инициализация кэша специальных трейтов
    compendiumKeys.forEach(key => {
      if (key.includes("{SPECIAL_ICON}") || key.includes("{S}")) {
        const cleanKey = getCleanName(key).trim();
        specialTraitNames.add(cleanKey);
      }
    });
  }

  // Присваиваем уникальный _id каждой модели для корректного сравнения в отряде
  models.forEach((m, i) => m._id = i);

  // Обработчик изменения лимита Reputation
  const repLimitInput = document.getElementById('repLimit');
  if (repLimitInput) {
    repLimitInput.value = BMG_REP_LIMIT; // показываем текущий лимит
    repLimitInput.onchange = function() {
      const newLimit = parseInt(this.value) || 350;
      if (newLimit < 100) {
        alert(t("min_limit_100"));
        this.value = BMG_REP_LIMIT;
        return;
      }
      BMG_REP_LIMIT = newLimit;
      this.value = newLimit;

      // Пересчитываем модификаторы и обновляем интерфейс
      modifiers = calculateModifiers();
      updateCrewBar();
      if (currentMode === 'builder') {
        renderMiniCardsBuilder();
      }

      // Опционально: предупреждение, если текущий отряд превышает новый лимит
      const currentRep = crew.reduce((a, m) => a + (m.rep || 0), 0);
      if (currentRep > BMG_REP_LIMIT) {
        alert(t("rep_exceeds", { current: currentRep, new: BMG_REP_LIMIT }));
      }
    };
  }

  // Первичный рендер
  if (currentMode === 'cards') {
    renderMiniCardsView();
  } else if (currentMode === 'builder') {
    renderMiniCardsBuilder();
  }
  updateCrewBar();
  
  // Инициализация табов
  initTabs();
});

/*************************
 * BMG RULES STATE
 *************************/
let BMG_REP_LIMIT = 350;
let BMG_BOSS = null;
let BMG_AFFILIATIONS = null;

/*************************
 * BMG HELPERS
 *************************/
function bmgFundingLimit() {
  return Math.ceil(BMG_REP_LIMIT / 150) * 500 + (modifiers.extraFunding || 0);
}

function bmgExtraSlots() {
  return BMG_REP_LIMIT <= 350 ? 0 : Math.ceil((BMG_REP_LIMIT - 350) / 150);
}

function bmgRankCount(rank) {
  return crew.filter(m => m.rankUsed === rank).length;
}

function bmgCanAddModel(model) {
  // Рассчитываем общую Rep и Funding с учетом оборудования
  let totalRep = crew.reduce((a, m) => a + (m.rep || 0) + m.equipment.reduce((b, eq) => b + (eq.repCost || 0), 0), 0) + (model.rep || 0);
  let usedFunding = crew.reduce((a, m) => a + (m.funding || 0) + m.equipment.reduce((b, eq) => b + (eq.fundingCost || 0), 0), 0) + (model.funding || 0);

  const rank = model.rankUsed;
  if (!rank) {
    alert(t("rank_not_selected"));
    return false;
  }

  // Проверка зависимостей моделей (например, Robin Who Laughs требует The Batman Who Laughs)
  const unmetDependency = getUnmetDependency(model);
  if (unmetDependency) {
    alert(t("model_requires_other", { model: model.name, required: unmetDependency }));
    return false;
  }

  const factionRules = factionCrewRules[currentFaction] || {}; // Правила текущей фракции
  const baseExtras = bmgExtraSlots();
  let extras = baseExtras;

  // Проверка лимитов Rep и Funding
  if (totalRep > BMG_REP_LIMIT) {
    alert(t("rep_exceeded"));
    return false;
  }
  if (usedFunding > bmgFundingLimit()) {
    alert(t("funding_insufficient"));
    return false;
  }

  // Проверка первого Босса
  if (!BMG_BOSS) {
    const validBossRanks = factionRules.mustHaveLeaderAsBoss ? ["Leader"] : ["Leader", "Sidekick"];
    if (!getRanks(model).some(r => validBossRanks.includes(r))) {
      alert(t("leader_required", { rank: factionRules.mustHaveLeaderAsBoss ? "Leader" : "Leader или Sidekick" }));
      return false;
    }
  }

  // Проверка аффилиации
  if (BMG_BOSS) {
    const modelFactions = getFactions(model);
    const bossFactions = BMG_AFFILIATIONS || [];

    if (factionRules.onlyAffiliationMembers) {
      // Для Batman Who Laughs: только члены аффилиации
      if (!modelFactions.some(a => bossFactions.includes(a))) {
        alert(t("model_not_affiliation"));
        return false;
      }
    } else if (factionRules.onlyBossAffiliationOrNoAffiliation) {
      // Для Bat Family и Cults: только аффилиация Босса или без аффилиации
      if (!modelFactions.includes("Unknown") && !modelFactions.some(a => bossFactions.includes(a))) {
        alert(t("model_not_match_affiliation"));
        return false;
      }
    } else {
      // Стандартная проверка
      if (!modelFactions.includes("Unknown") && !modelFactions.some(a => bossFactions.includes(a))) {
        alert(t("model_not_match"));
        return false;
      }
    }
  }
    // Специальное правило для Cults: остальные модели должны иметь нужный культист-трейт
  if (currentFaction === "Cults" && BMG_BOSS && BMG_BOSS.name !== model.name) {
    let requiredTrait = null;
    if (BMG_BOSS.name === "Deacon Blackfire") {
      requiredTrait = "Blackfire Cultist";
    } else if (BMG_BOSS.name === "Kobra") {
      requiredTrait = "Kobra Cultist";
    }

    if (requiredTrait && !model.traits.includes(requiredTrait)) {
      alert(t("leader_trait_required", { leader: BMG_BOSS.name, trait: requiredTrait }));
      return false;
    }
  }

  // Проверка уникальности имени (realname)
  const realname = model.realname || "—";
  if (!factionRules.allowSameNameDifferentAlias && realname !== "Unknown" && realname !== "—") {
    const existingWithSameRealname = crew.find(m => (m.realname || "—") === realname);
    if (existingWithSameRealname) {
      alert(t("model_already_added", { name: realname }));
      return false;
    }
  }

  // Проверка лимитов рангов
  if (!factionRules.ignoreStandardRankRequirements) {
    // Проверяем, есть ли в отряде модель с Charismatic
    const hasCharismatic = crew.some(m => m.traits && m.traits.includes("Charismatic"));
    // Charismatic позволяет добавить одного дополнительного Free Agent
    const canUseCharismatic = hasCharismatic && !modifiers.charismaticUsed && rank === "Free Agent";
    
    // Стандартные проверки рангов
    if (rank === "Leader") {
      // Если уже есть Leader — нельзя добавить ещё одного
      if (bmgRankCount("Leader") >= 1) {
        alert(t("only_one_leader"));
        return false;
      }
      // Если босс — Sidekick, и у текущей модели есть только Leader (без Sidekick) — нельзя добавить
      if (BMG_BOSS && BMG_BOSS.rankUsed === "Sidekick" && !getRanks(model).includes("Sidekick")) {
        alert(t("leader_already_added"));
        return false;
      }
    }
    if (rank === "Sidekick") {
      if (bmgRankCount("Leader") === 0 && bmgRankCount("Sidekick") >= 2) {
        alert(t("max_2_sidekick"));
        return false;
      }
      if (bmgRankCount("Leader") >= 1 && bmgRankCount("Sidekick") >= 1) {
        alert(t("max_1_sidekick_with_leader"));
        return false;
      }
    }
    if (rank === "Free Agent" && bmgRankCount("Free Agent") >= 1 + extras + (modifiers.extraFreeAgents || 0)) {
      // Charismatic позволяет добавить одного дополнительного Free Agent
      if (canUseCharismatic) {
        modifiers.charismaticUsed = true;
      } else {
        alert(t("fa_limit_exceeded"));
        return false;
      }
    }
    if (rank === "Vehicle" && bmgRankCount("Vehicle") >= 1 + extras + (modifiers.extraVehicles || 0)) {
      alert(t("vehicle_limit_exceeded"));
      return false;
    }
    if (rank === "Henchman") {
      const hasMinionOrHorde = model.traits.some(t => t.startsWith("Minion") || t === "Horde");
      if (!hasMinionOrHorde) {
        const sameNameCount = crew.filter(x => x.name === model.name && x.rankUsed === "Henchman").length;
        if (sameNameCount >= 1 + (modifiers.extraDuplicates || 0)) {
          alert(t("henchman_limit_exceeded"));
          return false;
        }
      }
      // Проверка Elite, Veteran, Minion
      let eliteExceeded = false;
      model.traits.forEach(t => {
        const eliteMatch = t.match(/^Elite \((.+)\)$/);
        if (eliteMatch) {
          const type = eliteMatch[1];
          const count = crew.filter(m => m.traits.some(u => u.match(new RegExp(`^Elite \\(${type}\\)$`)))).length;
          // Проверяем, есть ли в отряде Elite Boss этого типа
          const hasEliteBoss = crew.some(m => m.traits.some(u => u === `Elite Boss (${type})`));
          const limit = hasEliteBoss ? 99 : 1 + (modifiers.extraElites[type] || 0);
          if (count >= limit) {
            alert(t("elite_limit_exceeded", { type }));
            eliteExceeded = true;
          }
        }
      });
      if (eliteExceeded) return false;

      let veteranExceeded = false;
      model.traits.forEach(t => {
        const veteranMatch = t.match(/^Veteran \((.+)\)$/);
        if (veteranMatch) {
          const type = veteranMatch[1];
          const count = crew.filter(m => m.traits.some(u => u.match(new RegExp(`^Veteran \\(${type}\\)$`)))).length;
          if (count >= 1 + (modifiers.extraVeterans[type] || 0)) {
            alert(t("veteran_limit_exceeded", { type }));
            veteranExceeded = true;
          }
        }
      });
      if (veteranExceeded) return false;

      let minionExceeded = false;
      model.traits.forEach(t => {
        const minionMatch = t.match(/^Minion \((.+)\)$/);
        if (minionMatch) {
          const x = minionMatch[1].trim();
          const parsedX = parseInt(x, 10);
          const limit = isNaN(parsedX) ? 1 + (modifiers.extraMinions[x] || 0) : parsedX;
          const count = crew.filter(m => m.traits.some(u => u.match(new RegExp(`^Minion \\(${x}\\)$`)))).length;
          if (count >= limit) {
            alert(t("minion_limit_exceeded", { type: x }));
            minionExceeded = true;
          }
        }
      });
      if (minionExceeded) return false;
    }
  }

  // НОВЫЕ ПРОВЕРКИ НА ТРЕЙТЫ
  let exceeded = false;
  model.traits.forEach(t => {
    // Elite (X): Проверяем с учётом Elite Boss
    const eliteMatch = t.match(/^Elite \((.+)\)$/);
    if (eliteMatch) {
      const type = eliteMatch[1];
      const count = crew.filter(m => m.traits.some(u => u.match(new RegExp(`^Elite \\(${type}\\)$`)))).length;
      // Проверяем, есть ли в отряде Elite Boss этого типа
      const hasEliteBoss = crew.some(m => m.traits.some(u => u === `Elite Boss (${type})`));
      const limit = hasEliteBoss ? 99 : 1 + (modifiers.extraElites[type] || 0);
      if (count >= limit) {
        alert(t("elite_limit_exceeded", { type }));
        exceeded = true;
      }
    }

    // Horde: Если модель имеет Horde, игнор лимита миньонов на +3
    if (t === "Horde" && bmgRankCount("Henchman") >= 5 + (modifiers.extraMinions["All"] || 0)) {
      alert(t("horde_limit_exceeded"));
      exceeded = true;
    }

    // Hates (X): Нельзя добавлять если X в отряде
    const hatesMatch = t.match(/^Hates \((.+)\)$/);
    if (hatesMatch) {
      const hated = hatesMatch[1];
      if (crew.some(m => m.name === hated || getFactions(m).includes(hated))) {
        alert(t("hates_cannot_add", { hated }));
        exceeded = true;
      }
    }

    // Aversion (X): Нельзя добавлять если X в отряде
    const aversionMatch = t.match(/^Aversion \((.+)\)$/);
    if (aversionMatch) {
      const averted = aversionMatch[1];
      if (crew.some(m => m.name === averted || getFactions(m).includes(averted))) {
        alert(t("avert_cannot_add", { averted }));
        exceeded = true;
      }
    }

    // Проверка правил modelAversionRules: если в отряде есть модель, для которой эта модель в списке Aversion
    const aversionList = window.modelAversionRules?.[model.name];
    if (aversionList && Array.isArray(aversionList)) {
      const conflictingModel = crew.find(m => aversionList.includes(m.name));
      if (conflictingModel) {
        const aversionNames = aversionList.join(", ");
        alert(t("avert_cannot_add", { averted: aversionNames }));
        exceeded = true;
      }
    }

    // Обратная проверка: если эта модель в списке Aversion для какой-либо модели в отряде
    for (const crewModel of crew) {
      const crewAversionList = window.modelAversionRules?.[crewModel.name];
      if (crewAversionList && Array.isArray(crewAversionList) && crewAversionList.includes(model.name)) {
        alert(t("avert_cannot_add", { averted: crewModel.name }));
        exceeded = true;
        break;
      }
    }

    // Required (X): Требует X в отряде (поддержка нескольких имён через "or")
    const requiredMatch = t.match(/^Required \((.+)\)$/);
    if (requiredMatch) {
      const required = requiredMatch[1];
      // Разбиваем на варианты по " or " (например: "Dr. Hugo Strange or SCARECROW")
      const requiredOptions = required.split(/\s+or\s+/).map(s => s.trim());
      // Проверяем, есть ли в отряде хотя бы один из требуемых вариантов
      const hasRequired = requiredOptions.some(req =>
        crew.some(m => m.name === req || m.name.includes(req) || getFactions(m).includes(req))
      );
      if (!hasRequired) {
        alert(t("required_cannot_add", { required }));
        exceeded = true;
      }
    }

    // Incorruptible: Нельзя в злые фракции (если фракция villain)
    if (t === "Incorruptible" && ["Joker", "Bane", "Penguin", "Mr. Freeze", "Scarecrow", "Two-Face", "The Riddler", "Organized Crime", "Suicide Squad", "Batman Who Laughs", "Cults"].includes(currentFaction)) {
      alert(t("incorruptible_cannot_add"));
      exceeded = true;
    }

    // Freed / He Freed Me: Требует liberator (например, Bane)
    if (t === "Freed" || t === "He Freed Me") {
      if (!crew.some(m => m.name === "Bane" || m.traits.includes("Liberator"))) {
        alert(t("requires_liberator"));
        exceeded = true;
      }
    }

    // My Idol!: Требует idol в отряде
    if (t === "My Idol!") {
      if (!BMG_BOSS || BMG_BOSS.name !== "Joker") {
        alert(t("requires_idol"));
        exceeded = true;
      }
    }

    // Possessed: Только в supernatural фракциях
    if (t === "Possessed" && !["Cults", "Batman Who Laughs"].includes(currentFaction)) {
      alert(t("possessed_only_supernatural"));
      exceeded = true;
    }

    // Meet Goliath!: Требует Goliath
    if (t === "Meet Goliath!") {
      if (!crew.some(m => m.name === "Goliath")) {
        alert(t("requires_goliath"));
        exceeded = true;
      }
    }

    // The Sidekick: Лимит 1, требует Leader
    if (t === "The Sidekick" && bmgRankCount("Sidekick") >= 1) {
      alert(t("sidekick_limit_exceeded"));
      exceeded = true;
    }
    if (t === "The Sidekick" && !BMG_BOSS) {
      alert(t("leader_required_for_sidekick"));
      exceeded = true;
    }

    // Amazon Lineage: Только в amazon фракциях
    if (t === "Amazon Lineage" && currentFaction !== "Birds of Prey") {
      alert(t("amazon_lineage"));
      exceeded = true;
    }
  });

  if (exceeded) return false;

  return true;
}


function openEquipmentMenu(model, cardElement) {
  event.stopPropagation();

  // Находим экземпляр модели в банде
  const crewModel = crew.find(m => m.name === model.name && m.rankUsed);
  if (!crewModel) return;

  // Модели с трейтом Animal не могут покупать оборудование
  if (crewModel.traits && crewModel.traits.some(t => t.includes("Animal"))) {
    alert(t("animal_no_equipment"));
    return;
  }

  // Модели с трейтом Fully Equipped не могут покупать оборудование
  if (crewModel.traits && crewModel.traits.some(t => t.includes("Fully Equipped"))) {
    alert(t("fully_equipped_no_equipment"));
    return;
  }

  // Модели с трейтом Limited Equipment могут купить только 1 единицу оборудования
  if (crewModel.traits && crewModel.traits.some(t => t.includes("Limited Equipment"))) {
    const currentEquipmentCount = (crewModel.equipment || []).length;
    if (currentEquipmentCount >= 1) {
      alert(t("limited_equipment_max_reached"));
      return;
    }
  }

  // ПРАВКА 1: Leader не может покупать equipment, если явно не разрешено в targetModels
  if (crewModel.rankUsed === "Leader") {
    // Проверяем, есть ли equipment с targetModels, разрешающим Leader
    const faction = currentFaction;
    const hasLeaderPermission = (equipmentByFaction[faction] || []).some(eq => 
      eq.targetModels && eq.targetModels.includes("Leader")
    );
    if (!hasLeaderPermission) {
      alert(currentLang === 'ru' ? "Leader не может покупать оборудование!" : "Leader cannot purchase equipment!");
      return;
    }
  }

  const faction = currentFaction;
  const availableEq = (equipmentByFaction[faction] || []).filter(eq => {
    // ПРАВКА 2: Проверка maxPerCrew (ограничение на количество предметов в отряде)
    const currentCount = crew.flatMap(m => m.equipment || []).filter(e => e.name === eq.name).length;
    if (currentCount >= (eq.maxPerCrew || Infinity)) return false;

    // ПРАВКА 3: Модель не может иметь одно и то же оборудование дважды
    if (crewModel.equipment && crewModel.equipment.some(e => e.name === eq.name)) {
      return false;
    }

    // ПРАВКА 4: Проверка targetModels (ограничение на какие модели можно купить)
    // По умолчанию только Henchman могут покупать equipment
    // Все остальные ранги (Leader, Sidekick, Free Agent) могут покупать только если явно разрешено

    // Проверяем, является ли это Equipment с условием на трейт в банде (например, "Vampire Queen in crew")
    // Такое оборудование доступно ВСЕМ моделям независимо от ранга, если требуемый трейт есть в банде
    const hasTraitInCrewCondition = eq.conditions && eq.conditions.some(cond =>
      cond.endsWith(' in crew') && !cond.startsWith('Alias:')
    );

    if (hasTraitInCrewCondition) {
      // Проверяем наличие требуемого трейта в банде
      const hasRequiredTrait = eq.conditions.some(cond => {
        if (cond.endsWith(' in crew') && !cond.startsWith('Alias:')) {
          const traitName = cond.replace(' in crew', '').trim();
          // Проверяем, есть ли в банде модель с таким трейтом
          return crew.some(m => m.traits && m.traits.some(t => t.includes(traitName)));
        }
        return false;
      });

      if (!hasRequiredTrait) {
        return false; // Требуемый трейт отсутствует в банде
      }
      // Если трейт есть в банде, оборудование доступно всем моделям — пропускаем проверку ранга
    } else {
      // Это не Equipment с условием на трейт в банде, применяем обычные правила
      // Сначала проверяем, является ли это Special Equipment (требует персонажа в отряде)
      const isSpecialEquipment = eq.conditions && eq.conditions.some(cond =>
        cond.startsWith('Alias:') || 
        (cond.endsWith(' in crew') && crew.some(m => m.name === cond.replace(' in crew', '').trim()))
      );

      if (isSpecialEquipment) {
        // Это Special Equipment — проверяем только наличие требуемого персонажа в отряде
        const hasRequiredCharacter = eq.conditions.some(cond => {
          let modelName = '';
          // Правильный порядок замен: сначала убираем "Alias: ", потом " in crew"
          modelName = cond.replace('Alias: ', '').replace(' in crew', '').trim();

          if (modelName) {
            // Проверяем точное совпадение или совпадение по базовому имени
            // Например, "Scarecrow" должен совпадать с "Scarecrow (The Worst Nightmare)"
            const foundModel = crew.find(m => {
              // Точное совпадение
              if (m.name === modelName || m.alias === modelName) return true;
              // Проверка: modelName является началом имени модели (например, "Scarecrow" -> "Scarecrow (The Worst Nightmare)")
              if (m.name.startsWith(modelName + ' ') || m.name.startsWith(modelName + '(')) return true;
              // Проверка по alias
              if (m.alias && (m.alias.startsWith(modelName + ' ') || m.alias.startsWith(modelName + '('))) return true;
              return false;
            });
            return foundModel;
          }
          return false;
        });

        if (!hasRequiredCharacter) {
          return false; // Требуемый персонаж отсутствует в отряде
        }
        // Если персонаж есть, Special Equipment доступно независимо от ранга — пропускаем дальше
      } else {
        // Это не Special Equipment, применяем обычные правила
        if (crewModel.rankUsed !== "Henchman") {
          // Модель не Henchman, проверяем есть ли разрешение в targetModels
          if (!eq.targetModels || !eq.targetModels.length) {
            return false; // Нет targetModels — не Henchman не могут покупать
          }

          const allowedByName = eq.targetModels.some(t => t === crewModel.name);
          const allowedByRank = eq.targetModels.some(t => t === crewModel.rankUsed);

          if (!allowedByName && !allowedByRank) {
            return false; // Модель не соответствует targetModels
          }
        }
      }
    }

    // ПРАВКА 5: Проверка условий (conditions)
    if (eq.conditions && eq.conditions.length) {
      const allConditionsMet = eq.conditions.every(cond => {
        const trimmed = cond.trim();

        // Проверка на наличие трейта в банде: "Vampire Queen in crew"
        if (trimmed.endsWith(' in crew')) {
          const traitName = trimmed.replace(' in crew', '').trim();
          // Проверяем, есть ли в банде модель с таким трейтом
          return crew.some(m => m.traits && m.traits.some(t => t.includes(traitName)));
        }

        // Пропускаем условия "Alias: X in crew", так как они уже были проверены в isSpecialEquipment
        if (trimmed.startsWith('Alias:')) {
          return true;
        }

        // Отрицательное условие: "Model has X trait cannot purchase"
        if (trimmed.match(/Model has \w+ trait cannot purchase/i)) {
          const traitMatch = trimmed.match(/Model has (\w+) trait cannot purchase/i);
          if (traitMatch) {
            const forbiddenTrait = traitMatch[1];
            // Если у модели есть запрещённый трейт — условие не выполнено
            if (crewModel.traits && crewModel.traits.some(t => t === forbiddenTrait)) {
              return false;
            }
            return true;
          }
        }

        // Положительное условие: "Model has X trait"
        if (trimmed.match(/Model has \w+ trait$/i)) {
          const traitMatch = trimmed.match(/Model has (\w+) trait$/i);
          if (traitMatch) {
            const requiredTrait = traitMatch[1];
            // Если у модели есть требуемый трейт — условие выполнено
            return crewModel.traits && crewModel.traits.some(t => t === requiredTrait);
          }
        }

        // Отрицательное условие: "Nightmares cannot buy" или "Plants cannot purchase"
        if (trimmed.match(/cannot (buy|purchase)/i)) {
          const forbiddenTrait = trimmed.replace(/.*?(Nightmares|Plants|Animals|Bots).*?/i, '$1').trim();
          // Нормализуем имена трейтов: "Nightmares" -> "Nightmare", "Plants" -> "Plant", etc.
          const normalizedForbiddenTrait = forbiddenTrait === 'Nightmares' ? 'Nightmare' :
                                           forbiddenTrait === 'Plants' ? 'Plant' :
                                           forbiddenTrait === 'Animals' ? 'Animal' :
                                           forbiddenTrait === 'Bots' ? 'Bot' : forbiddenTrait;
          // Если у модели есть запрещённый трейт — условие не выполнено
          if (crewModel.traits && crewModel.traits.some(t => t.includes(normalizedForbiddenTrait))) {
            return false;
          }
          return true;
        }

        // "Only Plants", "Only Animals", "Only Nightmares" — требуется трейт
        if (trimmed.startsWith('Only ')) {
          const requiredTrait = trimmed.replace('Only ', '').trim();
          // Поддержка множественных трейтов через "/"
          const traits = requiredTrait.split('/').map(t => t.trim());
          // Нормализуем имена трейтов: "Nightmares" -> "Nightmare", "Plants" -> "Plant", "Animals" -> "Animal", "Bots" -> "Bot"
          const normalizedTraits = traits.map(t => {
            if (t === 'Nightmares') return 'Nightmare';
            if (t === 'Plants') return 'Plant';
            if (t === 'Animals') return 'Animal';
            if (t === 'Bots') return 'Bot';
            return t;
          });
          return crewModel.traits && normalizedTraits.some(t => crewModel.traits.some(trait => trait.includes(t) || trait.startsWith(t)));
        }

        // "Only Arkham Asylum Dr." — проверка на трейт с точкой
        if (trimmed.startsWith('Only Arkham Asylum Dr')) {
          return crewModel.traits && crewModel.traits.some(t => t.startsWith('Arkham Asylum Dr'));
        }

        // "Only Henchman/Free Agents" — проверка по рангу
        if (trimmed.startsWith('Only Henchman') || trimmed.startsWith('Only Free Agent')) {
          const allowedRanks = trimmed.replace('Only ', '').split('/').map(r => r.trim());
          return allowedRanks.some(r => crewModel.rankUsed && crewModel.rankUsed.includes(r));
        }

        // "Model has Elite (SWAT) trait"
        if (trimmed.startsWith('Model has ') && trimmed.endsWith(' trait')) {
          const trait = trimmed.replace('Model has ', '').replace(' trait', '').trim();
          return crewModel.traits && crewModel.traits.some(t => t === trait);
        }

        // "Model has Bot trait"
        if (trimmed.startsWith('Model has ') && trimmed.endsWith(' trait')) {
          const trait = trimmed.replace('Model has ', '').replace(' trait', '').trim();
          return crewModel.traits && crewModel.traits.some(t => t.includes(trait));
        }

        // Простое имя модели — наличие в crew (SPECIAL EQUIPMENT)
        return crew.some(m => m.name === trimmed || m.alias === trimmed);
      });

      if (!allConditionsMet) return false;
    }

    // ПРАВКА 6: Проверка на дублирование трейтов от equipment
    // Если equipment даёт трейт, проверяем, нет ли уже такого трейта у модели
    if (eq.effects && eq.effects.length) {
      // Извлекаем названия трейтов из effects
      for (const effect of eq.effects) {
        // Паттерны для извлечения трейтов: "Model gains the X rule/trait"
        const gainsMatch = effect.match(/Model gains (?:the )?([^(.]+?)(?: rule| trait|\.)$/i);
        if (gainsMatch) {
          const gainedTrait = gainsMatch[1].trim();
          // Проверяем, есть ли уже такой трейт у модели
          if (crewModel.traits && crewModel.traits.some(t => t.includes(gainedTrait))) {
            return false; // Трейт уже есть, нельзя добавить ещё раз
          }
        }
        // Паттерн для "Model gains X rule/trait" (без "the")
        const gainsDirectMatch = effect.match(/Model gains ([^(]+?)(?: rule| trait|\.)$/i);
        if (gainsDirectMatch) {
          const gainedTrait = gainsDirectMatch[1].trim();
          if (crewModel.traits && crewModel.traits.some(t => t.includes(gainedTrait))) {
            return false;
          }
        }
      }
    }

    return true;
  });

  // Создаём модальное окно
  const overlay = document.createElement("div");
  overlay.className = "rank-select-modal";

  // Считаем доступный бюджет
  const usedFunding = crew.reduce((a, m) => a + (m.funding || 0) + m.equipment.reduce((b, eq) => b + (eq.fundingCost || 0), 0), 0);
  const availableFunding = bmgFundingLimit() - usedFunding;

  // Функция для определения Special Equipment
  function isSpecialEquipment(eq) {
    // Special Equipment имеет conditions с именем персонажа или "Alias: X in crew"
    // Equipment с условием на трейт (например, "Vampire Queen in crew") не считается Special Equipment
    if (eq.conditions && eq.conditions.length) {
      // Проверяем, есть ли условие на трейт в банде (не имя персонажа)
      const hasTraitCondition = eq.conditions.some(cond =>
        cond.endsWith(' in crew') && !cond.startsWith('Alias:') &&
        !crew.some(m => m.name === cond.replace(' in crew', '').trim())
      );
      
      if (hasTraitCondition) {
        return false; // Это equipment с условием на трейт, а не Special Equipment
      }
      
      return eq.conditions.some(cond =>
        cond.startsWith('Alias:') ||
        cond.endsWith(' in crew') ||
        crew.some(m => m.name === cond.trim() || m.alias === cond.trim())
      );
    }
    return false;
  }

  overlay.innerHTML = `
    <div class="rank-select-content">
      <div class="rank-select-header">
        Equipment для <strong>${model.name}</strong>
        <div class="rank-select-close" onclick="this.closest('.rank-select-modal').remove()">×</div>
      </div>
      <div style="background:#222; padding:10px; text-align:center; border-bottom:2px solid #e94560;">
        <span style="color:#ffd700; font-weight:bold;">Доступно: $${availableFunding}</span>
        <span style="color:#aaa; font-size:12px; margin-left:10px;">(из $${bmgFundingLimit()})</span>
      </div>
      <div class="rank-select-buttons" style="max-height: 50vh; overflow-y: auto;">
        ${availableEq.length ? availableEq.map(eq => {
          const canAfford = availableFunding >= (eq.fundingCost || 0);
          const insufficientFundsText = currentLang === 'ru' ? '⚠ Недостаточно средств' : '⚠ Insufficient funds';
          const isSpecial = isSpecialEquipment(eq);
          const specialBadge = isSpecial ? '<span style="color:#ffd700; font-size:11px; margin-left:6px;">⭐ SPECIAL</span>' : '';

          // Проверяем условие на трейт в банде (например, "Vampire Queen in crew")
          const reqTrait = eq.conditions ? eq.conditions.find(c => 
            c.endsWith(' in crew') && !c.startsWith('Alias:') &&
            !crew.some(m => m.name === c.replace(' in crew', '').trim())
          )?.replace(' in crew', '').trim() : null;
          
          // Проверяем условие по имени персонажа (Special Equipment)
          const reqCharacter = isSpecial && eq.conditions ? eq.conditions.find(c => 
            (c.endsWith(' in crew') && crew.some(m => m.traits && m.traits.some(t => t.includes(c.replace(' in crew', '').trim())))) || 
            crew.some(m => m.name === c.trim())
          )?.replace(' in crew', '').replace('Alias: ', '') : null;

          const reqText = reqTrait
            ? `<br><small style="color:#ffd700;">${currentLang === 'ru' ? 'Требует:' : 'Requires:'} ${reqTrait} ${currentLang === 'ru' ? 'в банде' : 'in crew'}</small>`
            : reqCharacter
              ? `<br><small style="color:#ffd700;">${currentLang === 'ru' ? 'Требует:' : 'Requires:'} ${reqCharacter}</small>`
              : '';

          return `
          <button class="rank-select-btn" data-eq-name="${eq.name}" ${!canAfford ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
            ${eq.name} ($${eq.fundingCost || 0}${eq.repCost ? ` +${eq.repCost} Rep` : ''})${specialBadge}
            <small style="display:block; opacity:0.8; font-size:12px;">${replaceIcons(eq.effects.join(" • "))}</small>
            ${!canAfford ? `<span style="color:#ff4444; font-size:11px;">${insufficientFundsText}</span>` : ''}
            ${reqText}
          </button>
        `}).join("") : `<p style='text-align:center; color:#aaa;'>${t("no_available_equipment")}</p>`}
      </div>
    </div>
  `;

  overlay.querySelectorAll(".rank-select-btn").forEach(btn => {
    btn.onclick = () => {
      if (btn.disabled) return;
      
      const eqName = btn.dataset.eqName;
      const eq = availableEq.find(e => e.name === eqName);
      if (!eq) return;

      // Проверка бюджета
      const usedFunding = crew.reduce((a, m) => a + (m.funding || 0) + m.equipment.reduce((b, eq) => b + (eq.fundingCost || 0), 0), 0);
      const availableFunding = bmgFundingLimit() - usedFunding;
      if (availableFunding < (eq.fundingCost || 0)) {
        alert("Недостаточно Funding для этого equipment!");
        return;
      }

      // Добавляем equipment к модели
      if (!crewModel.equipment) crewModel.equipment = [];
      crewModel.equipment.push(eq);

      // Обновляем счётчики и интерфейс
      updateCrewEquipmentCounts();
      modifiers = calculateModifiers();
      updateCrewBar();
      renderMiniCardsBuilder();

      // Закрываем и открываем заново для обновления списка
      overlay.remove();
      openEquipmentMenu(model, cardElement);
    };
  });

  overlay.onclick = e => e.target === overlay && overlay.remove();
  document.body.appendChild(overlay);
}

function resetCrew() {
  crew = [];
  BMG_BOSS = null;
  BMG_AFFILIATIONS = null;
  crewEquipmentCounts = {};
  modifiers = {
    extraFreeAgents: 0,
    extraVehicles: 0,
    extraFunding: 0,
    extraDuplicates: 0,
    extraElites: {},
    extraVeterans: {},
    extraMinions: {},
    extraTalons: 0,
    allowBetray: false,
    charismaticUsed: false
  };
  updateCrewBar();
  if (currentMode === 'builder') {
    renderMiniCardsBuilder();
  }
}

// ======================== ЭКСПОРТ РОСТЕРА ========================
function exportRoster() {
  if (crew.length === 0) {
    alert(t("export_empty_roster"));
    return;
  }

  const repLimit = document.getElementById('repLimit').value;
  const fundingLimit = bmgFundingLimit();
  
  // Формируем текст экспорта
  let exportText = `BMG CREW - ${currentFaction || "Unknown"}\n`;
  exportText += `Rep: ${repLimit} | Funding: $${fundingLimit}\n`;
  exportText += `════════════════════════════════════════\n\n`;
  
  const totalRep = crew.reduce((a, m) => a + (m.rep || 0) + m.equipment.reduce((b, eq) => b + (eq.repCost || 0), 0), 0);
  const usedFunding = crew.reduce((a, m) => a + (m.funding || 0) + m.equipment.reduce((b, eq) => b + (eq.fundingCost || 0), 0), 0);
  
  crew.forEach(m => {
    exportText += `${m.name}`;
    
    // Добавляем стоимость модели если есть
    if (m.funding && m.funding > 0) {
      exportText += ` ($${m.funding})`;
    }
    
    // Добавляем equipment
    if (m.equipment && m.equipment.length > 0) {
      const eqList = m.equipment.map(eq => `${eq.name}$${eq.fundingCost || 0}`).join(", ");
      exportText += ` + ${eqList}`;
    }
    
    exportText += `\n`;
  });
  
  exportText += `\n════════════════════════════════════════\n`;
  exportText += `Total: ${totalRep} Rep | $${usedFunding}\n`;
  
  // Копируем в буфер обмена
  navigator.clipboard.writeText(exportText).then(() => {
    alert(t("export_copied"));
  }).catch(err => {
    // Если буфер не доступен, показываем в prompt
    prompt(t("export_copy_prompt"), exportText);
  });
}