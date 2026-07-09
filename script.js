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
  extraMinions: {}
};
let currentFaction = null; // Изменено: null по умолчанию (нет фракции)
let allCompendiumHTML = "";
let compendiumKeys = [];
let specialTraitNames = new Set(); // Кэш специальных трейтов

// Режимы просмотра
let currentMode = 'menu'; // menu, cards, builder, rules

// ======================== ФРАКЦИИ ========================
// Единый источник списка фракций и их иконок: используется и для генерации
// вкладок выбора фракции (cardsSection/builderSection), и для иконок на карточках моделей
const FACTION_ICON_MAP = {
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

function buildFactionCardsHTML() {
  const base = "https://veland55.github.io/btb/img/menu/";
  return Object.entries(FACTION_ICON_MAP).map(([faction, iconFile]) => {
    const bgFile = iconFile.replace(/\.png$/, ".jpg");
    return `
        <div class="faction-card" data-faction="${faction}" style="background-image: url('${base}${bgFile}');">
          <img class="faction-icon" src="${base}${iconFile}" alt="${faction}">
        </div>`;
  }).join("");
}

function renderFactionCards() {
  const html = buildFactionCardsHTML();
  document.querySelectorAll('.tabs-container .faction-cards').forEach(el => el.innerHTML = html);
}

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
    treacherous_cannot_be_boss: "Эта модель не может быть боссом отряда (Treacherous)",
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
    required_cannot_add: "Нельзя добавить: Required ({required})",
    requires_batman_who_laughs: "Требует The Batman Who Laughs в отряде",
    requires_idol: "Требует модель с Alias: Zur-En-Arrh Batman в отряде",
    requires_goliath: "Требует модель Damian Wayne в отряде",
    requires_goliath_not_owls: "Эта модель не может быть нанята во фракцию Court of Owls",
    leader_required_for_sidekick: "Требует, чтобы боссом отряда был Batman (Modern Age)",
    amazon_lineage: "Если босс отряда имеет Amazon Lineage, нанимать можно только моделей с трейтом Amazon",
    mercenary_requires_bane: "Эта модель может быть нанята в League of Shadows только если в отряде есть модель Bane",
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
    model_requires_other: "Модель {model} требует, чтобы в отряде была модель {required}",
    affinity_requires_model: "Модель {model} требует, чтобы в отряде была модель {target} (Affinity)",
    expendable_penguin_requires_trait: "Модель {model} может быть нанята только если в отряде есть модель с трейтом Penguin Caller или Hidden Penguins",
    william_cobb_restrict_free_agents: "Если William Cobb в отряде, Free Agent модели должны быть с аффилиацией Bane или Unknown",
    rank_label: "Ранг",
    leader_or_sidekick: "Leader или Sidekick",
    equipment_insufficient_funds: "Недостаточно Funding для этого equipment!"
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
    treacherous_cannot_be_boss: "This model cannot be the Boss of your crew (Treacherous)",
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
    required_cannot_add: "Cannot add: Required ({required})",
    requires_batman_who_laughs: "Requires The Batman Who Laughs model in the crew",
    requires_idol: "Requires a model with Alias: Zur-En-Arrh Batman in the crew",
    requires_goliath: "Requires Damian Wayne model in the crew",
    requires_goliath_not_owls: "This model cannot be recruited into a Court of Owls crew",
    leader_required_for_sidekick: "Requires Batman (Modern Age) to be the crew's Boss",
    amazon_lineage: "If the crew's Boss has Amazon Lineage, only models with the Amazon trait can be recruited",
    mercenary_requires_bane: "This model can only be recruited in a League of Shadows crew if Bane is also included",
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
    model_requires_other: "Model {model} requires {required} model in the crew",
    affinity_requires_model: "Model {model} requires {target} model in the crew (Affinity)",
    expendable_penguin_requires_trait: "Model {model} can only be recruited if the crew includes a model with Penguin Caller or Hidden Penguins trait",
    william_cobb_restrict_free_agents: "If William Cobb is in the crew, Free Agent models must have Bane or Unknown affiliation",
    rank_label: "Rank",
    leader_or_sidekick: "Leader or Sidekick",
    equipment_insufficient_funds: "Insufficient Funding for this equipment!"
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

// Lieutenant (X): "If the crew contain a model with Alias (X), this model reduces its funding cost to 0..."
function getEffectiveModelFunding(m) {
  const lieutenantTrait = m.traits && m.traits.find(tr => /^Lieutenant \(.+\)$/.test(tr));
  if (lieutenantTrait) {
    const requiredName = lieutenantTrait.slice("Lieutenant (".length, -1);
    if (crew.some(other => other !== m && modelMatchesCharacter(other, requiredName))) {
      return 0;
    }
  }
  return m.funding || 0;
}

// Суммарные Rep/Funding отряда (с учётом оборудования каждой модели)
const getCrewTotalRep = () => crew.reduce((a, m) => a + (m.rep || 0) + m.equipment.reduce((b, eq) => b + (eq.repCost || 0), 0), 0);
const getCrewUsedFunding = () => crew.reduce((a, m) => a + getEffectiveModelFunding(m) + m.equipment.reduce((b, eq) => b + (eq.fundingCost || 0), 0), 0);

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

// ======================== HELPER ФУНКЦИИ ДЛЯ ФИЛЬТРАЦИИ И ПРОВЕРОК ========================

// Получить список рангов модели
function getRanks(model) {
  if (!model.rank) return [];
  if (Array.isArray(model.rank)) return model.rank;
  if (typeof model.rank === 'string') {
    return model.rank.split('/').map(r => r.trim());
  }
  return [];
}

// Ранги, доступные модели именно при найме в билдере — расширяет getRanks()
// условными трейтами (например Contractor: "may treat its rank as Leader").
// Не используется для отображения официального ранга на карточке.
function getHireableRanks(model) {
  const ranks = getRanks(model);
  if (model.traits && model.traits.includes("Contractor") && !ranks.includes("Leader")) {
    return [...ranks, "Leader"];
  }
  return ranks;
}

// Получить список аффилиаций модели
function getFactions(model) {
  if (!model.faction) return ["Unknown"];
  
  let factions = [];
  if (Array.isArray(model.faction)) {
    factions = model.faction;
  } else if (typeof model.faction === "string") {
    factions = model.faction.replace(/ *& */gi, ",").replace(/ *\/ */g, ",").split(",").map(s => s.trim());
  }
  
  return factions.length > 0 ? factions : ["Unknown"];
}

// Получить список фракций-соперников (rivals) модели
function getRivals(model) {
  if (!model.rivals) return [];
  if (Array.isArray(model.rivals)) return model.rivals;
  if (typeof model.rivals === "string" && model.rivals.trim()) {
    return model.rivals.replace(/ *& */gi, ",").replace(/ *\/ */g, ",").split(",").map(s => s.trim());
  }
  return [];
}

// Проверить может ли модель быть нанята в текущую фракцию (для режима билдера)
function canHireInFaction(model, faction) {
  if (!faction) return false;

  // Модель не может быть нанята во фракцию, указанную у неё как rival
  if (getRivals(model).includes(faction)) return false;

  const modelFactions = getFactions(model);

  // Если модель "Unknown" - может быть нанята везде
  if (modelFactions.includes("Unknown")) return true;

  // Проверяем совпадение фракции
  return modelFactions.includes(faction);
}

// Проверить может ли модель быть просмотрена в текущей фракции (для режима карточек)
function canViewInFaction(model, faction) {
  if (!faction) return false;
  
  // Для просмотра используем более мягкие правила - показываем все модели которые могут быть наняты
  return canHireInFaction(model, faction);
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
    const requiredModels = dependency.requiredModels;
    if (requiredModels && Array.isArray(requiredModels)) {
      // Для сложных условий (or): нужна хотя бы одна из моделей
      if (!crew.some(m => requiredModels.includes(m.name))) {
        return false;
      }
    }
  }

  // Проверяем правила Aversion
  const aversionList = window.modelAversionRules?.[model.name];
  if (aversionList && Array.isArray(aversionList)) {
    // Если в отряде есть хотя бы одна модель из списка Aversion, эта модель не может быть добавлена.
    // Сопоставляем через modelMatchesCharacter, чтобы "Harley Quinn" покрывала все версии персонажа
    if (crew.some(m => aversionList.some(a => modelMatchesCharacter(m, a)))) {
      return false;
    }
  }

  // Проверяем трейты модели, которые могут иметь зависимости
  if (model.traits && Array.isArray(model.traits)) {
    // Проверяем Affinity (Model) - модель может присоединиться если есть указанная модель
    const affinityTraits = model.traits.filter(t => t.startsWith("Affinity (") && t.endsWith(")"));
    for (const trait of affinityTraits) {
      const targetModelName = trait.replace("Affinity (", "").replace(")", "");
      // Affinity позволяет нанять модель даже если она не подходит по аффилиации
      // Нам не нужно проверять наличие - это расширитель прав, не ограничение
      // Просто отмечаем что трейт обработан
    }

    // Проверяем Expendable Penguin X - требует Penguin Caller или Hidden Penguins
    const expendablePenguinMatch = model.traits.some(t => t.startsWith("Expendable Penguin"));
    if (expendablePenguinMatch) {
      const hasPenguinCaller = crew.some(m => m.traits && m.traits.some(t => 
        t.includes("Penguin Caller") || t.includes("Hidden Penguins")
      ));
      if (!hasPenguinCaller) {
        return false;
      }
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
  // (через modelMatchesCharacter — "Harley Quinn" покрывает все версии персонажа)
  for (const crewModel of crew) {
    const aversionList = window.modelAversionRules?.[crewModel.name];
    if (aversionList && Array.isArray(aversionList) && aversionList.some(a => modelMatchesCharacter(model, a))) {
      return true; // Эта модель должна быть скрыта
    }
  }
  return false;
}

// Трейты, помечающие модель как недоступную для прямого найма (только служебное появление
// в игре — например, замена формы или автодобавление другой моделью)
const UNRECRUITABLE_TRAITS = [
  "Swarm",
  "Kobra Swarm",
  "Shapeshifting Gorilla Progress",
  "Shapeshifting Hawk Progress",
  "Shapeshifting Tiger Progress"
];

function isUnrecruitable(model) {
  return model.traits && model.traits.some(t => UNRECRUITABLE_TRAITS.includes(t));
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
  const isMinionOrHorde = m.traits.some(t => t.startsWith("Minion") || t === "Horde");
  const factionRules = factionCrewRules[currentFaction] || {};

  if (!isMinionOrHorde && hasInCrew(m)) {
    removeFromCrew(m);
  } else {
    let ranks = getHireableRanks(m);

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
  // Treacherous: "This model cannot be the Boss of your crew."
  if (!BMG_BOSS && (chosenRank === "Leader" || chosenRank === "Sidekick") && model.traits.includes("Treacherous")) {
    alert(t("treacherous_cannot_be_boss"));
    return;
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
    // Contractor: "may treat its rank as Leader, but if it does so its Affiliation changes to Bane"
    BMG_AFFILIATIONS = (chosenRank === "Leader" && cloned.traits.includes("Contractor"))
      ? ["Bane"]
      : getFactions(cloned);
  }

  // Kobra Swarm: "is added automatically to the crew when you hire a model with the Void Priest trait"
  if (cloned.traits.includes("Void Priest")) {
    const swarmModel = models.find(m => m.traits && m.traits.includes("Kobra Swarm"));
    if (swarmModel) {
      crew.unshift({ ...swarmModel, rankUsed: "Henchman", uniqueId: Date.now() + Math.random(), equipment: [] });
    }
  }

  // Three Jokers: "When you recruit this model you must also recruit any other models that share this trait."
  // Автоматически добавляем остальных Джокеров (каждый оплачивается своей Reputation)
  if (cloned.traits.includes("Three Jokers")) {
    models.forEach(other => {
      if (other.traits && other.traits.includes("Three Jokers") &&
          other.name !== cloned.name && !crew.some(c => c.name === other.name)) {
        crew.push({ ...other, rankUsed: "Leader", uniqueId: Date.now() + Math.random(), equipment: [] });
      }
    });
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
        <span>${t('rank_label')}: <strong>${model.name}</strong></span>
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
    // Three Jokers: нанимаются только все вместе — при удалении одного удаляем остальных
    if (m.traits && m.traits.includes("Three Jokers")) {
      crew = crew.filter(x => !(x.traits && x.traits.includes("Three Jokers")));
    }
    // Босс удалён (напрямую или в составе Three Jokers) — отряд расформировывается
    if (BMG_BOSS && !crew.includes(BMG_BOSS)) {
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
  let totalRep = getCrewTotalRep();
  let usedFunding = getCrewUsedFunding();
  $("totalRep").textContent = totalRep;
  $("totalFunding").textContent = `${usedFunding} / ${bmgFundingLimit()}`;
  
  // Обновляем индикатор Charismatic — пересчитываем динамически по текущему составу отряда,
  // а не по флагу "уже потрачен" (иначе после удаления модели слот не освобождался — баг)
  const hasCharismatic = crew.some(m => m.traits && m.traits.includes("Charismatic"));
  const indicator = $("charismaticIndicator");
  const status = $("charismaticStatus");

  if (hasCharismatic) {
    indicator.style.display = "inline";
    const totalFaSlots = 1 + bmgExtraSlots() + (modifiers.extraFreeAgents || 0);
    const faSlotAvailable = bmgRankCount("Free Agent") < totalFaSlots;
    if (!faSlotAvailable) {
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
    extraMinions: {}
  };

  crew.forEach(m => {
    const isBoss = BMG_BOSS && m === BMG_BOSS;
    m.traits.forEach(t => {
      // Charismatic: "A crew that includes this model can recruit 1 additional model
      // with Rank Free Agent, ignoring the usual restrictions." — это просто доп. слот,
      // пересчитываемый каждый раз заново по текущему составу отряда.
      if (t === "Charismatic") mods.extraFreeAgents += 1;

      // Funding — по тексту компендиума:
      // "Business Agent": +$350, не требует Boss.
      if (t === "Business Agent") mods.extraFunding += 350;
      // "Lord of Business" / "Dirty Money" / "Unlimited Funds" (= Dirty Money): "If this model is the Boss..."
      if (t === "Lord of Business" && isBoss) mods.extraFunding += 500;
      if ((t === "Dirty Money" || t === "Unlimited Funds") && isBoss) mods.extraFunding += 300;
      // "Public Resources" / "Millionaire": не требуют Boss.
      if (t === "Public Resources") mods.extraFunding += 300;
      if (t === "Millionaire") mods.extraFunding += 400;

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
// Порядок сортировки по рангу (используется и в просмотре, и в билдере)
const RANK_ORDER = {
  "Leader": 1,
  "Sidekick": 2,
  "Henchman": 3,
  "Free Agent": 4,
  "Vehicle": 5
};

// Сортирует модели по старшему рангу, затем по имени
function sortModelsByRank(list) {
  return list.sort((a, b) => {
    const ranksA = getRanks(a);
    const ranksB = getRanks(b);
    const minA = ranksA.length > 0 ? Math.min(...ranksA.map(r => RANK_ORDER[r] || 999)) : 999;
    const minB = ranksB.length > 0 ? Math.min(...ranksB.map(r => RANK_ORDER[r] || 999)) : 999;
    if (minA !== minB) return minA - minB;
    return a.name.localeCompare(b.name);
  });
}

// HTML иконок рангов модели (используется в шапке полной карточки)
const renderRankIconsHTML = ranks => ranks.map(rank =>
  `<img src="https://veland55.github.io/btb/img/${rank}.png" alt="${rank}" class="rank-icon" onerror="this.src='https://veland55.github.io/btb/img/no.png'">`
).join('');

// Общая разметка мини-карточки для разделов "Карточки" и "Билдер":
// фото слева, справа построчно — имя, ранг текстом, Rep/Funding, купленное снаряжение.
// showButtons включает кнопку добавить/удалить в правом верхнем углу (только билдер).
function renderMiniCardHTML(item, showButtons) {
  const ranks = getRanks(item);
  const rankText = ranks.length ? ranks.join(' / ') : '—';

  let cornerHTML = '';
  if (showButtons) {
    const isMinionOrHorde = item.traits && item.traits.some(t => t.startsWith("Minion") || t === "Horde");
    if (isMinionOrHorde) {
      cornerHTML = `<button class="add-btn" onclick="event.stopPropagation();addToCrew(models[${item._id}])">+</button>`;
      if (item.count > 0) {
        cornerHTML += `
          <button class="remove-btn" onclick="event.stopPropagation();removeFromCrew(models[${item._id}])">−</button>
          <span class="count">x${item.count}</span>`;
      }
    } else {
      cornerHTML = `<button class="${item.inCrew ? "remove-btn" : "add-btn"}" onclick="event.stopPropagation();addToCrew(models[${item._id}])">${item.inCrew ? "−" : "+"}</button>`;
    }
  }

  const equipment = item.inCrew ? (item.instance.equipment || []) : [];
  const equipmentChipsHTML = equipment.map(eq => `
    <span class="mini-equipment-chip">
      ${eq.name}${eq.fundingCost ? ` <b>$${eq.fundingCost}</b>` : ''}${eq.repCost ? ` +${eq.repCost}Rep` : ''}
      <span class="mini-equipment-remove" onclick="event.stopPropagation(); removeEquipmentFromModel('${item.name}', '${eq.name.replace(/'/g, "\\'")}')">×</span>
    </span>
  `).join('');

  const equipmentRowHTML = item.inCrew ? `
    <div class="mini-equipment-row">
      ${equipmentChipsHTML}
      <span class="equipment-icon" onclick="event.stopPropagation(); openEquipmentMenu(models[${item._id}], this.closest('.mini-card'))">⚙️</span>
    </div>
  ` : '';

  return `
${showButtons ? `<div class="mini-card-corner">${cornerHTML}</div>` : ''}
<div class="mini-photo-wrap">
  <img src="${item.img}" onerror="this.src='https://veland55.github.io/btb/img/no.png'">
  ${item.inCrew && BMG_BOSS && BMG_BOSS.name === item.name ? '<span class="boss-crown">👑</span>' : ''}
</div>
<div class="mini-right-col">
  <div class="mini-name">${item.name}</div>
  <div class="mini-rank-text">${rankText}</div>
  <div class="mini-rep">${item.rep} Rep • $${item.inCrew ? getEffectiveModelFunding(item.instance) : (item.funding || 0)}</div>
  ${equipmentRowHTML}
</div>
`;
}

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
  let filteredModels = sortModelsByRank(models.filter(m => canViewInFaction(m, currentFaction)));

  const fragment = document.createDocumentFragment();

  filteredModels.forEach(model => {
    const div = document.createElement("div");
    div.className = `mini-card`;
    div.innerHTML = renderMiniCardHTML({ ...model, inCrew: false, count: 0 }, false);
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

  // Скрываем модели, которые нельзя нанять напрямую (Swarm, Kobra Swarm, Shapeshifting-формы и т.п.)
  filteredModels = filteredModels.filter(m => !isUnrecruitable(m));

  // Скрываем модели с невыполненными зависимостями
  filteredModels = filteredModels.filter(m => checkModelDependency(m));

  // Скрываем модели из-за правил Aversion (если в отряде есть модель, для которой эта модель в списке Aversion)
  filteredModels = filteredModels.filter(m => !checkAversionHidden(m));

  // Скрываем модели с Affinity, если требуемая модель отсутствует в отряде
  filteredModels = filteredModels.filter(m => {
    if (!m.traits || !Array.isArray(m.traits)) return true;
    const affinityTraits = m.traits.filter(t => t.startsWith("Affinity (") && t.endsWith(")"));
    for (const trait of affinityTraits) {
      const targetModelName = trait.replace("Affinity (", "").replace(")", "");
      // Модель должна быть скрыта если требуемой модели нет в отряде
      if (!crew.some(crewMember => crewMember.name === targetModelName)) {
        return false;
      }
    }
    return true;
  });

  // Обработка Batman Lives: если Boss имеет Batman Lives, показываем William Cobb даже если не совпадает аффилиация
  if (BMG_BOSS && BMG_BOSS.traits && BMG_BOSS.traits.includes("Batman Lives")) {
    // Добавляем William Cobb в доступные модели если его еще нет в отряде
    const williamCobb = models.find(m => m.name === "William Cobb");
    if (williamCobb && !hasInCrew(williamCobb) && !filteredModels.some(m => m.name === "William Cobb")) {
      filteredModels.push(williamCobb);
    }
  }

  // Скрываем модели, которые нельзя нанять из-за нехватки Rep и/или Funding —
  // в списке остаются только реально нанимаемые по бюджету модели
  {
    const currentRep = getCrewTotalRep();
    const currentFunding = getCrewUsedFunding();
    const repLimit = BMG_REP_LIMIT;
    const fundingLimit = bmgFundingLimit();
    filteredModels = filteredModels.filter(m => {
      const repIfAdded = currentRep + (m.rep || 0);
      const fundingIfAdded = currentFunding + getEffectiveModelFunding(m);
      return repIfAdded <= repLimit && fundingIfAdded <= fundingLimit;
    });
  }

  // Скрываем "чистых" Free Agent (единственный доступный ранг — Free Agent), если лимит слотов исчерпан
  {
    const faLimit = 1 + bmgExtraSlots() + (modifiers.extraFreeAgents || 0);
    const faCount = bmgRankCount("Free Agent");
    if (faCount >= faLimit) {
      filteredModels = filteredModels.filter(m => {
        const ranks = getRanks(m);
        const isFreeAgentOnly = ranks.length === 1 && ranks[0] === "Free Agent";
        return !isFreeAgentOnly;
      });
    }
  }

  // Сортировка: сначала по наивысшему (минимальному по номеру) рангу, затем по имени алфавитно
  sortModelsByRank(filteredModels);

  // Добавляем отфильтрованные модели в renderArray
  renderArray.push(...filteredModels.map(m => ({
    ...m,
    inCrew: false,
    count: 0
  })));

  const fragment = document.createDocumentFragment();

  renderArray.forEach(item => {
    const div = document.createElement("div");
    div.className = `mini-card ${item.inCrew ? "in-crew" : ""}`;
    div.innerHTML = renderMiniCardHTML(item, true);
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

    return `
      <div class="official-trait-item${isSpecial ? ' is-special' : ''}"
           onclick="event.stopPropagation(); showTraitDesc('${traitText.replace(/'/g, "\\'")}')">
        ${content}.
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
  if (!entry) return null;
  return (typeof entry === 'object' && entry.description) ? entry.description : entry;
}

// Панель-глоссарий (только для широких экранов): расшифровка трейтов модели и правил оружия
function renderGlossarySection(title, names) {
  const seen = new Set();
  const items = names.map(name => {
    const cleanName = getCleanName(name);
    if (!cleanName || seen.has(cleanName.toLowerCase())) return '';
    const desc = getTraitDescription(name);
    if (!desc) return '';
    seen.add(cleanName.toLowerCase());
    return `
      <div class="sidebar-entry">
        <div class="sidebar-entry-name">${replaceIcons(name)}</div>
        <div class="sidebar-entry-desc">${replaceIcons(desc).replace(/\n/g, '<br>')}</div>
      </div>`;
  }).join('');
  return items ? `<div class="sidebar-section"><div class="sidebar-title">${title}</div>${items}</div>` : '';
}

function renderFullCardSidebar(model) {
  const sidebarEl = $('fullCardSidebar');
  if (!sidebarEl) return;

  const traitNames = model.traits || [];
  const weaponTraitNames = [...new Set(
    (model.weapons || [])
      .filter(w => w && w.traits)
      .flatMap(w => w.traits.split('/').map(t => t.trim()).filter(Boolean))
  )];

  const html = renderGlossarySection('TRAITS', traitNames) + renderGlossarySection('WEAPON RULES', weaponTraitNames);
  sidebarEl.innerHTML = html || `<div class="sidebar-empty">${t("nothing_found")}</div>`;
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

  // --- Rivals ---
  const rivalFactions = getRivals(model);

  const rep = model.rep || 0;
  const funding = model.funding || 0;

  const renderIcons = arr => arr.length
    ? arr.map(f => {
        const file = FACTION_ICON_MAP[f] || "UNKNOWN.png";
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
          <span class="official-weapon-name">${(w.name || "Unnamed").toUpperCase()}</span>
          <span class="official-weapon-stats">
            ${w.damage ? `<span class="official-weapon-damage">${w.damage}</span>` : ""}
            ${w.rof && w.rof !== "-" ? `<span class="official-weapon-rof">${w.rof}<img src="https://veland55.github.io/btb/img/rof.png" class="stat-icon"></span>` : ""}
            ${w.ammo && w.ammo !== "-" ? `<span class="official-weapon-ammo">${w.ammo}<img src="https://veland55.github.io/btb/img/ammo.png" class="stat-icon"></span>` : ""}
          </span>
        </div>
        ${traits.length ? `<div class="official-weapon-traits-line">${traits.map(tr => `<span class="weapon-trait-text" onclick="event.stopPropagation(); showTraitDesc('${tr.replace(/'/g, "\\'")}')">${tr.toUpperCase()}</span>`).join(" / ")}</div>` : ""}
      </div>`;
  }).join("") : "";

  // Используем renderTraits для отображения трейтов плоским списком с маркером спецтрейтов
  const traitsHTML = model.traits?.length
    ? `<div class="official-section yellow"><div class="official-section-title">TRAITS</div><div class="official-traits-list">${renderTraits(model.traits)}</div></div>`
    : "";

  // Новый блок: equipment (только если есть в crewModel)
  const crewModel = crew.find(m => m.name === model.name); // Находим экземпляр в crew
  let equipmentHTML = '';
  if (crewModel && crewModel.equipment && crewModel.equipment.length > 0) {
    equipmentHTML = `
      <div class="official-section yellow">
        <div class="official-section-title">EQUIPMENT</div>
        <div class="official-traits-list">
          ${crewModel.equipment.map(eq => `
            <div class="official-trait-item equipment-item" onclick="showTraitPopup('${eq.name}', '${eq.effects.join('<br>')}')">
              ${eq.name} <small>($${eq.fundingCost || 0}${eq.repCost ? ` +${eq.repCost} Rep` : ''})</small>.
              <span class="remove-eq" onclick="event.stopPropagation(); removeEquipmentFromModel('${model.name}', '${eq.name}')">×</span>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  const rankIconsHTML = renderRankIconsHTML(getRanks(model));

  // --- Финальная сборка карточки ---
  $("fullCardContent").innerHTML = `
    <div class="official-card">
      <div class="official-header">
        <div class="official-header-text">
          <div class="official-name">${model.name.toUpperCase()}</div>
          <div class="official-subtitle">${realName} / ${base.toUpperCase()}</div>
        </div>
        <div class="official-header-rank">
          ${rankIconsHTML}
        </div>
      </div>

      <div class="official-main">
        <div class="official-img-wrapper">
          <img src="${model.img}" class="official-img" onerror="this.src='https://veland55.github.io/btb/img/no.png'">
        </div>
        <div class="official-info-col">
          <div class="official-aff-riv-row">
            <span class="aff-riv-label">AFF</span>
            <span class="aff-riv-icons">${factionIconsHTML}</span>
            <span class="aff-riv-divider"></span>
            <span class="aff-riv-label">RIV</span>
            <span class="aff-riv-icons">${rivalsIconsHTML}</span>
          </div>
          <div class="official-rep-funding">${rep} <span>REP</span> <span class="rep-funding-sep">•</span> $${funding}</div>
          <div class="official-stats-grid">
            <div class="stat-badge stat-big stat-yellow"><span class="stat-num">${model.stats.Willpower || "-"}</span><span class="stat-name">WILLPOWER</span></div>
            <div class="stat-badge stat-big stat-black"><span class="stat-num">${model.stats.Endurance || "-"}</span><span class="stat-name">ENDURANCE</span></div>
            <div class="stat-badge stat-small stat-yellow"><img class="stat-badge-icon" src="https://veland55.github.io/btb/img/Attack.png"><span class="stat-num">${model.stats.Attack || "-"}</span></div>
            <div class="stat-badge stat-small stat-black"><img class="stat-badge-icon" src="https://veland55.github.io/btb/img/Defense.png"><span class="stat-num">${model.stats.Defense || "-"}</span></div>
            <div class="stat-badge stat-small stat-yellow"><img class="stat-badge-icon" src="https://veland55.github.io/btb/img/Strength.png"><span class="stat-num">${model.stats.Strength || "-"}</span></div>
            <div class="stat-badge stat-small stat-black"><img class="stat-badge-icon" src="https://veland55.github.io/btb/img/Movement.png"><span class="stat-num">${model.stats.Movement || "-"}</span></div>
          </div>
        </div>
      </div>

      ${model.weapons?.length ? `<div class="official-section"><div class="official-section-title">WEAPONS</div>${weaponsHTML}</div>` : ""}
      ${traitsHTML}
      ${equipmentHTML}
    </div>`;

  renderFullCardSidebar(model);

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
      <div class="comp-title">
        ${m.name}<span style="float:right;color:#e94560">${m.rep} Rep</span>
      </div>
      <div class="comp-text">
        ${getRanks(m).join(" / ") || "—"} • ${Array.isArray(m.faction)?m.faction.join(" • "):m.faction||"—"}
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
  overlay.className = "trait-popup";
  overlay.innerHTML = `
    <div class="trait-popup-content">
      <div class="trait-popup-header">
        <strong>${processedName}</strong>
        <div class="trait-popup-close" onclick="this.closest('.trait-popup').remove()">×</div>
      </div>
      <div class="trait-popup-body">
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
      // Перерендерим полную карточку, только если она сейчас открыта
      // (иначе удаление equipment из списка билдера непреднамеренно открывало модалку)
      if ($("fullCard").classList.contains("active")) {
        showFullCard(models.find(m => m.name === modelName));
      }
    }
  }
}

// ======================== ВКЛАДКИ ========================
// Обработчик кликов по карточкам фракций, навешивается один раз через
// делегирование событий (иначе повторные вызовы initTabs() при каждом
// showCards()/showBuilder() накапливали дублирующиеся обработчики на картах)
let tabsInitialized = false;
function initTabs() {
  if (tabsInitialized) return;
  tabsInitialized = true;
  document.addEventListener('click', e => {
    const card = e.target.closest('.faction-card');
    if (!card) return;

    document.querySelectorAll('.faction-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    currentFaction = card.dataset.faction; // Устанавливаем фракцию

    if (card.closest('#cardsSection')) { // Для cardsSection
      // Скрываем вкладки фракций после выбора
      $('cardsTabsContainer').classList.add('hidden');
      renderMiniCardsView(); // Рендерим модели только после выбора
    } else if (card.closest('#factionSelect')) {
      selectFaction(card.dataset.faction);
    }
  });
}

// ======================== ИНИЦИАЛИЗАЦИЯ ========================
window.addEventListener("load", () => {
  // Генерируем карточки фракций (одинаковы для cardsSection и builderSection)
  renderFactionCards();

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
  let totalRep = getCrewTotalRep() + (model.rep || 0);
  let usedFunding = getCrewUsedFunding() + getEffectiveModelFunding(model);

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
      alert(t("leader_required", { rank: factionRules.mustHaveLeaderAsBoss ? "Leader" : t("leader_or_sidekick") }));
      return false;
    }
  }

  // Проверка аффилиации
  if (BMG_BOSS) {
    const modelFactions = getFactions(model);
    const bossFactions = BMG_AFFILIATIONS || [];
    const bossTraits = BMG_BOSS.traits || [];

    // Court of Owls Crew: "This crew can only hire models with the Affiliation: The Court of Owls."
    if (bossTraits.includes("Court of Owls Crew") && !modelFactions.includes("Court of Owls")) {
      alert(t("model_not_affiliation"));
      return false;
    }

    // Amazon Lineage: "If this model is your crew's Boss, you can only recruit models with the Amazon trait."
    if (bossTraits.includes("Amazon Lineage") && !model.traits.includes("Amazon")) {
      alert(t("amazon_lineage"));
      return false;
    }

    const hasRealAffiliationMatch = modelFactions.some(a => bossFactions.includes(a));
    const hasUnknownBypass = modelFactions.includes("Unknown");

    let passesAffiliation;
    let failMessageKey;
    if (factionRules.onlyAffiliationMembers) {
      // Для Batman Who Laughs: только члены аффилиации
      passesAffiliation = hasRealAffiliationMatch;
      failMessageKey = "model_not_affiliation";
    } else if (factionRules.onlyBossAffiliationOrNoAffiliation) {
      // Для Bat Family и Cults: только аффилиация Босса или без аффилиации
      passesAffiliation = hasRealAffiliationMatch || hasUnknownBypass;
      failMessageKey = "model_not_match_affiliation";
    } else {
      // Стандартная проверка
      passesAffiliation = hasRealAffiliationMatch || hasUnknownBypass;
      failMessageKey = "model_not_match";
    }

    // Incorruptible: "This model can only be included into a Crew with a Boss that have its
    // same affiliation" — для этой модели поблажка через Unknown-аффилиацию не действует
    if (passesAffiliation && !hasRealAffiliationMatch && model.traits.includes("Incorruptible")) {
      passesAffiliation = false;
    }

    if (!passesAffiliation) {
      // Специальные трейты, разрешающие найм вне аффилиации Босса (с лимитом по числу таких моделей)
      let hireException = null;
      if (rank === "Henchman" && bossTraits.includes("Possessed") &&
          !model.traits.includes("Bot") && !model.traits.includes("Cybernetic") &&
          crew.filter(m => m.hireException === "Possessed").length < 3) {
        hireException = "Possessed"; // до 3 Henchman любой аффилиации, если Босс — Possessed
      } else if (rank === "Henchman" &&
          crew.some(cm => cm.traits && cm.traits.includes("Corrupt")) &&
          model.traits.includes("Cop") &&
          crew.filter(m => m.hireException === "Corrupt").length < 3) {
        // Corrupt: "If this model is included your crew..." — носитель может быть любым членом отряда
        hireException = "Corrupt"; // до 3 Henchman с трейтом Cop
      } else if (rank === "Henchman" && bossTraits.includes("Absolute Power") &&
          model.traits.includes("Cop")) {
        // Absolute Power (Lex Luthor): "If this model is your crew's Boss, you can hire models
        // with Rank Henchman with the Cop trait, regardless of their Affiliation" — без лимита
        hireException = "Absolute Power";
      } else if (rank === "Henchman" &&
          crew.some(cm => cm.traits && cm.traits.includes("Criminal Bonds")) &&
          modelFactions.includes("Organized Crime") && model.traits.includes("Criminal") &&
          crew.filter(m => m.hireException === "Criminal Bonds").length < 3) {
        // Criminal Bonds: "If this model is included in your crew..." — носитель любой член отряда
        hireException = "Criminal Bonds"; // до 3 Henchman Organized Crime с трейтом Criminal
      } else if (model.traits.includes("Vocational") &&
          crew.every(m => m.traits.includes("Cop"))) {
        hireException = "Vocational"; // допустимо, если у всех в отряде есть трейт Cop
      }

      if (hireException) {
        model.hireException = hireException;
      } else {
        alert(t(failMessageKey));
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
      alert(t("fa_limit_exceeded"));
      return false;
    }
    if (rank === "Vehicle" && bmgRankCount("Vehicle") >= 1 + extras + (modifiers.extraVehicles || 0)) {
      alert(t("vehicle_limit_exceeded"));
      return false;
    }
    if (rank === "Henchman") {
      const isHorde = model.traits.includes("Horde");
      const isMinion = model.traits.some(t => t.startsWith("Minion"));
      if (isHorde) {
        // Horde: "This model can be recruited up to four times in a crew, regardless of its Name."
        const sameNameCount = crew.filter(x => x.name === model.name && x.rankUsed === "Henchman").length;
        if (sameNameCount >= 4) {
          alert(t("horde_limit_exceeded"));
          return false;
        }
      } else if (!isMinion) {
        const sameNameCount = crew.filter(x => x.name === model.name && x.rankUsed === "Henchman").length;
        if (sameNameCount >= 1 + (modifiers.extraDuplicates || 0)) {
          alert(t("henchman_limit_exceeded"));
          return false;
        }
      }
      // Проверка Elite, Veteran, Minion
      // ВАЖНО: параметр цикла не "t" — иначе он затеняет глобальную функцию перевода t()
      // и alert(t("...")) внутри падает с TypeError ("t is not a function")
      let eliteExceeded = false;
      model.traits.forEach(modelTrait => {
        const eliteMatch = modelTrait.match(/^Elite \((.+)\)$/);
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
      model.traits.forEach(modelTrait => {
        const veteranMatch = modelTrait.match(/^Veteran \((.+)\)$/);
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
      model.traits.forEach(modelTrait => {
        const minionMatch = modelTrait.match(/^Minion \((.+)\)$/);
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
  // ВАЖНО: параметр цикла не должен называться "t" — эта буква совпадает с именем
  // глобальной функции перевода t(), и раньше это её затеняло, из-за чего каждый
  // alert(t("...")) внутри цикла падал с TypeError ("t is not a function")
  let exceeded = false;
  model.traits.forEach(modelTrait => {
    // Elite (X): Проверяем с учётом Elite Boss
    const eliteMatch = modelTrait.match(/^Elite \((.+)\)$/);
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

    // Hates (X): Нельзя добавлять если X в отряде (X — фракция, имя или версия персонажа)
    const hatesMatch = modelTrait.match(/^Hates \((.+)\)$/);
    if (hatesMatch) {
      const hated = hatesMatch[1];
      if (crew.some(m => modelMatchesCharacter(m, hated) || getFactions(m).includes(hated))) {
        alert(t("hates_cannot_add", { hated }));
        exceeded = true;
      }
    }

    // Aversion (X): Нельзя добавлять если X в отряде (X — фракция, имя или версия персонажа)
    const aversionMatch = modelTrait.match(/^Aversion \((.+)\)$/);
    if (aversionMatch) {
      const averted = aversionMatch[1];
      if (crew.some(m => modelMatchesCharacter(m, averted) || getFactions(m).includes(averted))) {
        alert(t("avert_cannot_add", { averted }));
        exceeded = true;
      }
    }

    // Проверка правил modelAversionRules: если в отряде есть модель, для которой эта модель в списке Aversion
    const aversionList = window.modelAversionRules?.[model.name];
    if (aversionList && Array.isArray(aversionList)) {
      const conflictingModel = crew.find(m => aversionList.some(a => modelMatchesCharacter(m, a)));
      if (conflictingModel) {
        const aversionNames = aversionList.join(", ");
        alert(t("avert_cannot_add", { averted: aversionNames }));
        exceeded = true;
      }
    }

    // Обратная проверка: если эта модель в списке Aversion для какой-либо модели в отряде
    for (const crewModel of crew) {
      const crewAversionList = window.modelAversionRules?.[crewModel.name];
      if (crewAversionList && Array.isArray(crewAversionList) && crewAversionList.some(a => modelMatchesCharacter(model, a))) {
        alert(t("avert_cannot_add", { averted: crewModel.name }));
        exceeded = true;
        break;
      }
    }

    // Required (X): Требует X в отряде (поддержка нескольких имён через "or")
    const requiredMatch = modelTrait.match(/^Required \((.+)\)$/);
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

    // Mercenary: "You can only recruit this model in a League of Assassins crew
    // if a model with Name: Bane is also included in the crew."
    if (modelTrait === "Mercenary" && currentFaction === "League of Shadows" && !crew.some(m => m.name === "Bane")) {
      alert(t("mercenary_requires_bane"));
      exceeded = true;
    }

    // Freed / He Freed Me: "...only be recruited if the crew also includes The Batman Who Laughs model."
    if (modelTrait === "Freed" || modelTrait === "He Freed Me") {
      if (!crew.some(m => m.name === "The Batman Who Laughs")) {
        alert(t("requires_batman_who_laughs"));
        exceeded = true;
      }
    }

    // My Idol!: "...only be recruited if a model with the Alias: Zur-En-Arrh Batman is part of the crew."
    if (modelTrait === "My Idol!") {
      if (!crew.some(m => m.name.includes("Zur-En-Arrh") || (m.realname && m.realname.includes("Zur-En-Arrh")))) {
        alert(t("requires_idol"));
        exceeded = true;
      }
    }

    // Meet Goliath!: "...only be recruited in a crew containing a model (Name: Damian Wayne).
    // However, this model can never be recruited to a Court of Owls crew."
    if (modelTrait === "Meet Goliath!") {
      if (currentFaction === "Court of Owls") {
        alert(t("requires_goliath_not_owls"));
        exceeded = true;
      } else if (!crew.some(m => m.name === "Damian Wayne")) {
        alert(t("requires_goliath"));
        exceeded = true;
      }
    }

    // The Sidekick: "...only be hired if Batman (Modern Age) is leading the crew."
    if (modelTrait === "The Sidekick") {
      if (!BMG_BOSS || BMG_BOSS.rankUsed !== "Leader" || BMG_BOSS.name !== "Batman (Modern Age)") {
        alert(t("leader_required_for_sidekick"));
        exceeded = true;
      }
    }

    // Affinity (Model): Проверяем что модель может присоединиться
    const affinityMatch = modelTrait.match(/^Affinity \((.+)\)$/);
    if (affinityMatch) {
      const affinityTarget = affinityMatch[1];
      // Модель с Affinity может присоединиться только если в отряде есть целевая модель
      if (!crew.some(m => m.name === affinityTarget)) {
        alert(t("affinity_requires_model", { model: model.name, target: affinityTarget }));
        exceeded = true;
      }
    }

    // Expendable Penguin X: Требует Penguin Caller или Hidden Penguins
    if (modelTrait.startsWith("Expendable Penguin")) {
      const hasPenguinTrait = crew.some(m => m.traits && m.traits.some(trait =>
        trait.includes("Penguin Caller") || trait.includes("Hidden Penguins")
      ));
      if (!hasPenguinTrait) {
        alert(t("expendable_penguin_requires_trait", { model: model.name }));
        exceeded = true;
      }
    }

    // Batman Lives: Позволяет нанять William Cobb, но накладывает ограничения на Free Agent
    // Это проверяется в основной логике аффилиации выше
  });

  // Проверка Batman Lives после основных проверок трейтов
  if (BMG_BOSS && BMG_BOSS.traits && BMG_BOSS.traits.includes("Batman Lives")) {
    // Batman Lives позволяет нанять William Cobb без учета аффилиации
    // Но если William Cobb нанят, Free Agent модели должны быть с аффилиацией Bane
    const hasWilliamCobb = crew.some(m => m.name === "William Cobb");
    if (hasWilliamCobb && rank === "Free Agent") {
      const modelFactions = getFactions(model);
      if (!modelFactions.includes("Bane") && !modelFactions.includes("Unknown")) {
        alert(t("william_cobb_restrict_free_agents"));
        exceeded = true;
      }
    }
  }

  if (exceeded) return false;

  return true;
}

// ======================== EQUIPMENT: СОПОСТАВЛЕНИЕ ПЕРСОНАЖЕЙ ========================
// Многие условия в equipmentByFaction ссылаются на настоящее имя персонажа (например,
// "Bruce Wayne", "Jason Todd"), а не на печатное имя карты (например, "Batman Bushi").
// Раньше сопоставление шло только по точному model.name (и несуществующему полю model.alias),
// из-за чего почти все character-gated предметы были недоступны для покупки. Проверяем и имя
// карты (с поддержкой версий через префикс "Name " / "Name("), и realname.
function modelMatchesCharacter(model, characterName) {
  const norm = s => String(s || '').replace(/’/g, "'").trim();
  const name = norm(characterName);
  const modelName = norm(model.name);
  // realname иногда содержит служебный суффикс вида "Bruce Wayne / 40mm" — отбрасываем его
  const realname = norm(model.realname).split('/')[0].trim();
  if (modelName === name || realname === name) return true;
  if (modelName.startsWith(name + ' ') || modelName.startsWith(name + '(')) return true;
  // Имена с пропущенными средними именами/инициалами: "Harleen Quinzel" ⊆ "Dr. Harleen Frances Quinzel",
  // "Oswald C. Cobblepot" ⊆ "Oswald Chesterfield Cobblepot", "James Gordon" ⊆ "James W. Gordon".
  // Все слова искомого имени должны идти в realname в том же порядке (инициал с точкой = начало слова).
  const sought = name.split(/\s+/);
  if (sought.length >= 2 && realname) {
    const words = realname.split(/\s+/);
    let i = 0;
    let allFound = true;
    for (const sw of sought) {
      let found = false;
      while (i < words.length) {
        const rw = words[i++];
        if (rw === sw ||
            (sw.length > 1 && sw.endsWith('.') && rw.startsWith(sw.slice(0, -1))) ||
            (rw.length > 1 && rw.endsWith('.') && sw.startsWith(rw.slice(0, -1)))) {
          found = true;
          break;
        }
      }
      if (!found) { allFound = false; break; }
    }
    if (allFound) return true;
  }
  return false;
}

function crewHasCharacter(characterName) {
  return crew.some(m => modelMatchesCharacter(m, characterName));
}

// Условие открывает доступ ВСЕЙ банде (независимо от ранга покупателя), если оно ссылается
// на персонажа/трейт, который должен быть в отряде — а не является ограничением по
// рангу/трейту самой покупающей модели ("Only ...", "Model has ... trait", "... cannot buy/purchase")
function isCharacterOrTraitGated(eq) {
  return (eq.conditions || []).some(cond => {
    const c = cond.trim();
    if (c.startsWith('Only ') || c.startsWith('Model has ') || /cannot (buy|purchase)/i.test(c)) return false;
    return true;
  });
}

// Может ли эта модель (по рангу/имени) вообще претендовать на покупку данного предмета —
// без учёта прочих условий (трейты, необходимые персонажи и т.п.), которые проверяются отдельно
function isEquipmentRankEligible(eq, crewModel) {
  // Явное ограничение по рангу текстом условия, например "Only Henchman/Free Agents"
  const rankRestriction = (eq.conditions || []).find(c => /^Only (Henchman|Free Agent)/i.test(c.trim()));
  if (rankRestriction) {
    const allowedRanks = rankRestriction.replace(/^Only /i, '').split('/').map(r => r.trim());
    // Сравниваем в обе стороны из-за разночтений в числе ("Free Agent" / "Free Agents")
    return allowedRanks.some(r => crewModel.rankUsed && r.includes(crewModel.rankUsed));
  }

  // Явно указанный список допустимых покупателей (по рангу или персонажу) главнее общего
  // правила "только Henchman" — даже если предмет также завязан на присутствие персонажа
  // в отряде (например, "Watch Tower" открыт присутствием Barbara Gordon, но купить его
  // может только модель по имени Batgirl)
  if (eq.targetModels && eq.targetModels.length) {
    return eq.targetModels.includes(crewModel.rankUsed) || eq.targetModels.some(tm => modelMatchesCharacter(crewModel, tm));
  }

  // Открыто присутствием персонажа/трейта в отряде — не завязано на ранг покупателя
  if (isCharacterOrTraitGated(eq)) return true;

  // По умолчанию — только Henchman
  return crewModel.rankUsed === "Henchman";
}

// Smuggler: "When this model is recruited, its crew can buy Magazines and Radio
// equipment at half of the usual $ cost."
function getEquipmentCost(eq) {
  const base = eq.fundingCost || 0;
  const hasSmuggler = crew.some(m => m.traits && m.traits.includes("Smuggler"));
  if (hasSmuggler && (eq.name === "Magazine" || eq.name === "Radio")) {
    return Math.round(base / 2);
  }
  return base;
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

  // Трейты, ограничивающие модель 1 единицей оборудования:
  // Limited Equipment, Mentoring ("This model can only purchase one piece of Equipment"),
  // Extremely mutated ("This model cannot buy more than one item of Equipment")
  const oneEquipmentTraits = ["Limited Equipment", "Mentoring", "Extremely mutated"];
  if (crewModel.traits && crewModel.traits.some(tr => oneEquipmentTraits.some(lim => tr.includes(lim)))) {
    const currentEquipmentCount = (crewModel.equipment || []).length;
    if (currentEquipmentCount >= 1) {
      alert(t("limited_equipment_max_reached"));
      return;
    }
  }

  const faction = currentFaction;

  // Leader не может покупать equipment, если во фракции нет ни одного подходящего предмета
  if (crewModel.rankUsed === "Leader") {
    const hasLeaderPermission = (equipmentByFaction[faction] || []).some(eq => isEquipmentRankEligible(eq, crewModel));
    if (!hasLeaderPermission) {
      alert(currentLang === 'ru' ? "Leader не может покупать оборудование!" : "Leader cannot purchase equipment!");
      return;
    }
  }

  const availableEq = (equipmentByFaction[faction] || []).filter(eq => {
    // Проверка maxPerCrew (ограничение на количество предметов в отряде)
    const currentCount = crew.flatMap(m => m.equipment || []).filter(e => e.name === eq.name).length;
    if (currentCount >= (eq.maxPerCrew || Infinity)) return false;

    // Модель не может иметь одно и то же оборудование дважды
    if (crewModel.equipment && crewModel.equipment.some(e => e.name === eq.name)) {
      return false;
    }

    // Взаимоисключающие группы оборудования (например, "Iceberg Lounge": можно выбрать только 1 из группы)
    if (eq.group) {
      const groupItems = (equipmentByFaction[faction] || []).filter(other => other.group === eq.group).map(other => other.name);
      const groupAlreadyTaken = crew.some(m => (m.equipment || []).some(e => groupItems.includes(e.name)));
      if (groupAlreadyTaken) return false;
    }

    // Ранг/личность покупателя
    if (!isEquipmentRankEligible(eq, crewModel)) return false;

    // Остальные условия (наличие персонажа/трейта в банде, трейты самой модели и т.п.)
    const allConditionsMet = (eq.conditions || []).every(cond => {
      const trimmed = cond.trim();

      // "X in crew" (без Alias:) — трейт в банде, например "Vampire Queen in crew"
      if (trimmed.endsWith(' in crew') && !trimmed.startsWith('Alias:')) {
        const traitName = trimmed.replace(' in crew', '').trim();
        return crew.some(m => m.traits && m.traits.some(tr => tr.includes(traitName)));
      }

      // "Alias: X" / "Alias: X in crew" — персонаж в банде
      if (trimmed.startsWith('Alias:')) {
        const charName = trimmed.replace('Alias:', '').replace(' in crew', '').trim();
        return crewHasCharacter(charName);
      }

      // "X is Boss" — персонаж X должен быть боссом отряда
      const isBossMatch = trimmed.match(/^(.+?)\s+is Boss$/i);
      if (isBossMatch) {
        return !!BMG_BOSS && modelMatchesCharacter(BMG_BOSS, isBossMatch[1]);
      }

      // "Model has X trait cannot purchase" — запрещающий трейт у покупателя
      const cannotHaveMatch = trimmed.match(/^Model has (.+?) trait cannot purchase$/i);
      if (cannotHaveMatch) {
        const forbiddenTrait = cannotHaveMatch[1];
        return !(crewModel.traits && crewModel.traits.some(tr => tr === forbiddenTrait));
      }

      // "Model has X trait" — требуемый трейт у покупателя
      const hasTraitMatch = trimmed.match(/^Model has (.+?) trait$/i);
      if (hasTraitMatch) {
        const requiredTrait = hasTraitMatch[1];
        return crewModel.traits && crewModel.traits.some(tr => tr === requiredTrait);
      }

      // "Nightmares cannot buy" / "Plants cannot purchase" и т.п.
      if (/cannot (buy|purchase)/i.test(trimmed)) {
        const forbiddenGroupMatch = trimmed.match(/(Nightmares|Plants|Animals|Bots)/i);
        if (forbiddenGroupMatch) {
          const map = { Nightmares: 'Nightmare', Plants: 'Plant', Animals: 'Animal', Bots: 'Bot' };
          const forbiddenTrait = map[forbiddenGroupMatch[1]] || forbiddenGroupMatch[1];
          return !(crewModel.traits && crewModel.traits.some(tr => tr.includes(forbiddenTrait)));
        }
        return true;
      }

      // "Only Arkham Asylum Dr." — трейт с точкой в названии
      if (trimmed.startsWith('Only Arkham Asylum Dr')) {
        return crewModel.traits && crewModel.traits.some(tr => tr.startsWith('Arkham Asylum Dr'));
      }

      // "Only Henchman/Free Agents" — ранг уже проверен в isEquipmentRankEligible выше
      if (trimmed.startsWith('Only Henchman') || trimmed.startsWith('Only Free Agent')) {
        return true;
      }

      // "Only Plants", "Only Animals", "Only Nightmares" — требуется трейт покупателя
      if (trimmed.startsWith('Only ')) {
        const requiredTrait = trimmed.replace('Only ', '').trim();
        const traitsList = requiredTrait.split('/').map(tr => tr.trim());
        const normalizedTraits = traitsList.map(tr => {
          if (tr === 'Nightmares') return 'Nightmare';
          if (tr === 'Plants') return 'Plant';
          if (tr === 'Animals') return 'Animal';
          if (tr === 'Bots') return 'Bot';
          return tr;
        });
        return crewModel.traits && normalizedTraits.some(tr => crewModel.traits.some(trait => trait.includes(tr) || trait.startsWith(tr)));
      }

      // Составное условие "X or Y" — достаточно одного из персонажей в отряде
      // (например, "The Riddler (Arkham Knight) or The Riddler's Mech (Arkham Knight)")
      if (/\s+or\s+/.test(trimmed)) {
        return trimmed.split(/\s+or\s+/).map(s => s.trim()).some(opt => crewHasCharacter(opt));
      }

      // Простое имя персонажа — модель с таким именем/настоящим именем должна быть в банде
      return crewHasCharacter(trimmed);
    });

    if (!allConditionsMet) return false;

    // Проверка на дублирование трейтов от equipment (нельзя купить то, что уже даёт имеющийся трейт)
    if (eq.effects && eq.effects.length) {
      for (const effect of eq.effects) {
        const gainsMatch = effect.match(/Model gains (?:the )?([^(.]+?)(?: rule| trait|\.)$/i);
        if (gainsMatch) {
          const gainedTrait = gainsMatch[1].trim();
          if (crewModel.traits && crewModel.traits.some(tr => tr.includes(gainedTrait))) {
            return false;
          }
        }
      }
    }

    return true;
  });

  // Создаём модальное окно
  const overlay = document.createElement("div");
  overlay.className = "equipment-modal";

  // Считаем доступный бюджет
  const usedFunding = getCrewUsedFunding();
  const availableFunding = bmgFundingLimit() - usedFunding;

  const equipmentTitle = currentLang === 'ru' ? 'Equipment для' : 'Equipment for';

  overlay.innerHTML = `
    <div class="equipment-modal-content">
      <div class="equipment-modal-header">
        <span>${equipmentTitle} <strong>${model.name}</strong></span>
        <div class="equipment-modal-close" onclick="this.closest('.equipment-modal').remove()">×</div>
      </div>
      <div class="equipment-modal-funding">
        <span class="avail">${currentLang === 'ru' ? 'Доступно' : 'Available'}: $${availableFunding}</span>
        <span class="total">(${currentLang === 'ru' ? 'из' : 'of'} $${bmgFundingLimit()})</span>
      </div>
      <div class="equipment-modal-list">
        ${availableEq.length ? availableEq.map(eq => {
          const cost = getEquipmentCost(eq);
          const isDiscounted = cost !== (eq.fundingCost || 0);
          const canAfford = availableFunding >= cost;
          const insufficientFundsText = currentLang === 'ru' ? '⚠ Недостаточно средств' : '⚠ Insufficient funds';
          const isSpecial = isCharacterOrTraitGated(eq);
          const specialBadge = isSpecial ? '<span class="equipment-item-special">⭐ SPECIAL</span>' : '';

          const reqCond = isSpecial ? (eq.conditions || []).find(c => isCharacterOrTraitGated({ conditions: [c] })) : null;
          const reqText = reqCond
            ? `<span class="equipment-item-req">${currentLang === 'ru' ? 'Требует:' : 'Requires:'} ${reqCond.replace('Alias: ', '').replace(' in crew', '')}</span>`
            : '';
          const priceText = isDiscounted ? `<s style="opacity:.6;">$${eq.fundingCost || 0}</s> $${cost}` : `$${cost}`;

          return `
          <button class="equipment-item-btn" data-eq-name="${eq.name}" ${!canAfford ? 'disabled' : ''}>
            <span class="equipment-item-name">${eq.name}</span>
            <span class="equipment-item-price"> (${priceText}${eq.repCost ? ` +${eq.repCost} Rep` : ''})</span>${specialBadge}
            <small class="equipment-item-effects">${replaceIcons(eq.effects.join(" • "))}</small>
            ${!canAfford ? `<span class="equipment-item-warning">${insufficientFundsText}</span>` : ''}
            ${reqText}
          </button>
        `}).join("") : `<p class="equipment-modal-empty">${t("no_available_equipment")}</p>`}
      </div>
    </div>
  `;

  overlay.querySelectorAll(".equipment-item-btn").forEach(btn => {
    btn.onclick = () => {
      if (btn.disabled) return;
      
      const eqName = btn.dataset.eqName;
      const eq = availableEq.find(e => e.name === eqName);
      if (!eq) return;

      // Проверка бюджета (с учётом скидки Smuggler на Magazine/Radio)
      const cost = getEquipmentCost(eq);
      const usedFunding = getCrewUsedFunding();
      const availableFunding = bmgFundingLimit() - usedFunding;
      if (availableFunding < cost) {
        alert(t("equipment_insufficient_funds"));
        return;
      }

      // Добавляем equipment к модели (с фактически уплаченной стоимостью)
      if (!crewModel.equipment) crewModel.equipment = [];
      crewModel.equipment.push(cost !== (eq.fundingCost || 0) ? { ...eq, fundingCost: cost } : eq);

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
    extraMinions: {}
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
  
  const totalRep = getCrewTotalRep();
  const usedFunding = getCrewUsedFunding();

  crew.forEach(m => {
    exportText += `${m.name}`;

    // Добавляем стоимость модели если есть (с учётом скидки Lieutenant (X))
    const effectiveFunding = getEffectiveModelFunding(m);
    if (effectiveFunding > 0) {
      exportText += ` ($${effectiveFunding})`;
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