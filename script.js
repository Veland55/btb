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
  allowBetray: false
};
let currentFaction = null; // Изменено: null по умолчанию (нет фракции)
let allCompendiumHTML = "";
let compendiumKeys = [];

// Режимы просмотра
let currentMode = 'menu'; // menu, cards, builder, rules

const $ = id => document.getElementById(id);
const hasInCrew = m => crew.some(x => x.name === m.name);
const countInCrew = m => crew.filter(x => x.name === m.name).length;

// ======================== ФУНКЦИИ МЕНЮ ========================
function showCards() {
  currentMode = 'cards';
  $('mainMenu').style.display = 'none';
  $('cardsSection').style.display = 'block';
  $('builderSection').style.display = 'none';
  $('compendiumModal').classList.remove('active');
  
  // Скрываем модели, показываем placeholder и tabs
  currentFaction = null; // Сбрасываем фракцию
  $('modelsGridCards').innerHTML = ''; // Очищаем модели
  $('factionPlaceholder').style.display = 'block'; // Показываем placeholder
  $('cardsTabsContainer').style.display = 'block'; // Показываем вкладки фракций
  initTabs(); // Инициализация табов для карточек
}

function showBuilder() {
  currentMode = 'builder';
  $('mainMenu').style.display = 'none';
  $('cardsSection').style.display = 'none';
  $('builderSection').style.display = 'block';
  $('factionSelect').style.display = 'block';
  $('builderMain').style.display = 'none';
  $('compendiumModal').classList.remove('active');
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
  $('modelSearchModal').classList.remove('active'); // ПРАВКА: Закрываем все модалы
  resetCrew();

  // Восстанавливаем состояние для cardsSection при повторном входе
  currentFaction = null;
  if ($('cardsTabsContainer')) {
    $('cardsTabsContainer').style.display = 'block';
    $('factionPlaceholder').style.display = 'block';
    $('modelsGridCards').innerHTML = '';
  }
}

function backToFactionSelect() {
  $('factionSelect').style.display = 'block';
  $('builderMain').style.display = 'none';
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
  $('builderMain').style.display = 'block';
  // Установить таб фракции в builderTabs
  $('builderTabs').innerHTML = `
    <div class="tabs">
      <button class="tab active" data-faction="${faction}"><img src="https://veland55.github.io/btb/img/${faction.toUpperCase().replace(/\s/g, '_')}.png" alt="${faction}"></button> <!-- ПРАВКА: toUpperCase() для совпадения с именами файлов (e.g., BIRDS_OF_PREY) -->
    </div>
  `;
  initTabs(); // Переинициализация табов
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
    const ranks = getRanks(m);

    if (!BMG_BOSS && factionRules.mustHaveLeaderAsBoss && !ranks.includes("Leader")) {
      alert("Первой моделью должен быть Leader для этой фракции!");
      return;
    }

    if (ranks.length === 1) {
      addModelWithRank(m, ranks[0]);
    } else if (ranks.length > 1) {
      showRankSelectionModal(m, ranks);
    } else {
      alert("У модели не указан ранг!");
    }
  }

  modifiers = calculateModifiers();
  updateCrewBar();
  renderMiniCardsBuilder();
};

function addModelWithRank(model, chosenRank) {
  // Проверка на Treacherous - предупреждение
  if (model.traits.includes("Treacherous")) {
    alert("Предупреждение: Treacherous модель может betray отряд!");
  }
  
  const factionRules = factionCrewRules[currentFaction] || {};
  // Специальное правило для Cults: первым (Leader) может быть только Deacon Blackfire или Kobra
  if (currentFaction === "Cults" && !BMG_BOSS && chosenRank === "Leader") {
    if (!["Deacon Blackfire", "Kobra"].includes(model.name)) {
      alert("Для фракции Cults лидером может быть только Deacon Blackfire или Kobra");
      return;
    }
  }
  if (!BMG_BOSS && factionRules.mustHaveLeaderAsBoss && chosenRank !== "Leader") {
    alert("Первой моделью должен быть Leader для этой фракции!");
    return;
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
        ${ranks.map(rank => `
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
      if (t === "Charismatic") mods.extraFunding += 100; // +100 Funding
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
  
  let filteredModels = models.filter(m => {
    const factions = getFactions(m);
    return factions.includes(currentFaction);
  });
  
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
  
  // Затем добавляем все остальные модели текущей фракции, которых нет в отряде
  let filteredModels = models.filter(m => {
    const factions = getFactions(m);
    return factions.includes(currentFaction) && !hasInCrew(m);
  });
  
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

  // --- Маппинг иконок (добавь сюда все нужные, если будут новые) ---
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

  // --- Оружие и трейты (без изменений) ---
  const weaponsHTML = model.weapons?.length ? model.weapons.map(w => {
    if (!w || Object.keys(w).length === 0) return "";
    const traits = w.traits ? w.traits.split("/").map(t => t.trim()).filter(Boolean) : [];
    return `<div class="official-weapon"><div class="official-weapon-first-line">
      <span class="official-weapon-name">${w.name || "Unnamed"}</span>
      ${w.damage ? `<span class="official-weapon-damage">${w.damage}</span>` : ""}
      ${w.rof && w.rof !== "-" ? `<span class="official-weapon-rof">${w.rof}<img src="https://veland55.github.io/btb/img/rof.png" class="stat-icon"></span>` : ""}
      ${w.ammo && w.ammo !== "-" ? `<span class="official-weapon-ammo">${w.ammo}<img src="https://veland55.github.io/btb/img/ammo.png" class="stat-icon"></span>` : ""}
    </div>${traits.length ? `<div class="official-weapon-traits-line">${traits.map(t => `<span class="weapon-trait-chip" onclick="event.stopPropagation();showTraitDesc('${t.replace(/'/g, "\\'")}')">${t}</span>`).join("")}</div>` : ""}</div>`;
  }).join("") : "";

const traitsHTML = model.traits?.length
  ? `<div class="official-section yellow"><div class="official-section-title">TRAITS</div><div class="official-traits-grid">${model.traits.map(t => {
      // Нормализуем имя трейта модели (удаляем параметры в скобках, заменяем curly apostrophe на прямой)
      const baseT = t.replace(/\s*\(.*?\)\s*$/, '').trim().replace(/’/g, "'");
      // Проверяем, есть ли в compendium ключ с 🦇, чья база совпадает с baseT
      const hasBatInCompendium = window.compendium && Object.keys(window.compendium).some(key => {
        if (!key.endsWith('🦇')) return false;
        const baseKey = key.replace(/\s*🦇$/, '').replace(/\s*\(.*?\)\s*$/, '').trim().replace(/’/g, "'");
        return baseKey === baseT;
      });
      return `<div class="official-trait${hasBatInCompendium ? ' special' : ''}" onclick="showTraitDesc('${t.replace(/'/g, "\\'")}')">${t}</div>`;
    }).join("")}</div></div>`
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
    <div class="comp-entry"><div class="comp-title">${k}</div><div class="comp-text">${(compendium[k]||"").replace(/\n/g,"<br>")}</div></div>`).join("");
  $("compendiumList").innerHTML = html || `<div style="text-align:center;color:#888;padding:80px;font-size:18px;">Ничего не найдено</div>`;
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
      return factions.includes(currentFaction) && m.name.toLowerCase().includes(query);
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
    </div>`).join("") : `<div style="text-align:center;color:#888;padding:100px;font-size:18px">Ничего не найдено</div>`;

  $("modelSearchResults").innerHTML = html;
};

$("modelSearchInput").oninput = renderModelSearch;

// ======================== ТРЕЙТЫ ========================
const showTraitDesc = (rawKeyword) => {
  const keyword = rawKeyword.trim();
  let title = keyword;
  let description = "";

  // Вспомогательная функция нормализации
  const normalize = str => str.toLowerCase()
    .replace(/:/g, '')
    .replace(/[^\w\s\(\)]/g, '')
    .trim();

  // 1. Точное совпадение
  if (window.compendium[keyword]) {
    description = window.compendium[keyword].replace(/\n/g, "<br>");
    // Показываем попап сразу, если нашли
    showPopup(title, description);
    return;
  }

  // 2. Совпадение по нормализованному ключу
  const foundKey = Object.keys(window.compendium).find(k => normalize(k) === normalize(keyword));
  if (foundKey) {
    description = window.compendium[foundKey].replace(/\n/g, "<br>");
    showPopup(title, description);
    return;
  }

  // 3. Трейты с параметром в скобках: CRT (Stunned), Teamwork (HAWK), Elite (Plants), Enervating (3)
  const match = keyword.match(/^(.*?)\s*\(\s*([^()]+)\s*\)$/);
  if (match) {
    let baseName = match[1].trim();      // e.g. "Teamwork"
    const param = match[2].trim();       // e.g. "HAWK"

    // Возможные варианты названий в compendium
    const candidates = [
      `${baseName} (X)`,
      `${baseName} X`,
      baseName
    ];

    let baseDesc = candidates.reduce((desc, c) => desc || window.compendium[c] || 
      Object.keys(window.compendium).find(k => normalize(k) === normalize(c)) ? 
      window.compendium[Object.keys(window.compendium).find(k => normalize(k) === normalize(c))] : null, null);

    if (baseDesc) {
      description = baseDesc.replace(/X/g, param).replace(/\(X\)/g, `(${param})`).replace(/\n/g, "<br>");

      // Если параметр — это другой эффект (не число и не имя модели вроде HAWK), добавляем его описание
      if (isNaN(param) && window.compendium[param]) {  // Проверяем, существует ли как ключ (игнорируем имена моделей)
        description += `<br><br><strong>${param}:</strong><br>${window.compendium[param].replace(/\n/g, "<br>")}`;
      }
    }
  }

  // 4. Трейты с двоеточием: True Love: Batman, Teamwork: Robin
  if (!description && keyword.includes(":")) {
    const main = keyword.split(":")[0].trim();
    const candidates = [main, "True Love", "Teamwork", "Elite"];
    description = candidates.reduce((desc, c) => desc || window.compendium[c] || 
      (Object.keys(window.compendium).find(k => normalize(k) === normalize(c)) ? 
      window.compendium[Object.keys(window.compendium).find(k => normalize(k) === normalize(c))].replace(/\n/g, "<br>") : null), null);
  }

  // 5. Последний резерв — поиск по вхождению подстроки (если ничего не нашли)
  if (!description) {
    const loose = Object.keys(window.compendium).find(k => 
      k.toLowerCase().includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(k.toLowerCase().replace(/\(x\)/g, '').trim())
    );
    if (loose) {
      description = window.compendium[loose].replace(/\n/g, "<br>");
      title += ` → ${loose}`;
    }
  }

  // Если ничего не нашли
  if (!description) {
    alert("Нет описания: " + keyword);
    return;
  }

  // Показываем попап
  showPopup(title, description);
};

// Вспомогательная функция для попапа (чтобы не дублировать)
const showPopup = (title, desc) => {
  const popup = document.createElement("div");
  popup.className = "trait-popup";
  popup.innerHTML = `
    <div class="trait-popup-content">
      <div class="trait-popup-header">
        <div>${title}</div>
        <div class="trait-popup-close" onclick="this.closest('.trait-popup').remove()">×</div>
      </div>
      <div class="trait-popup-text">${desc}</div>
    </div>`;
  popup.onclick = e => e.target === popup && popup.remove();
  document.body.appendChild(popup);
};

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
        $('cardsTabsContainer').style.display = 'none';
        $('factionPlaceholder').style.display = 'none';
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
        <div class="comp-text">${(compendium[k]||"").replace(/\n/g,"<br>")}</div>
      </div>`).join("");
    $("compendiumList").innerHTML = allCompendiumHTML;
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
        alert("Минимальный лимит — 100 Rep");
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
        alert(`Внимание! Текущий отряд (${currentRep} Rep) превышает новый лимит (${BMG_REP_LIMIT} Rep).`);
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
    alert("Ранг модели не выбран!");
    return false;
  }

  const factionRules = factionCrewRules[currentFaction] || {}; // Правила текущей фракции
  const baseExtras = bmgExtraSlots();
  let extras = baseExtras;

  // Проверка лимитов Rep и Funding
  if (totalRep > BMG_REP_LIMIT) {
    alert("Превышен лимит Reputation (учтены equipment)");
    return false;
  }
  if (usedFunding > bmgFundingLimit()) {
    alert("Недостаточно Funding (учтены equipment)");
    return false;
  }

  // Проверка первого Босса
  if (!BMG_BOSS) {
    const validBossRanks = factionRules.mustHaveLeaderAsBoss ? ["Leader"] : ["Leader", "Sidekick"];
    if (!getRanks(model).some(r => validBossRanks.includes(r))) {
      alert(`Первой моделью должен быть ${factionRules.mustHaveLeaderAsBoss ? "Leader" : "Leader или Sidekick"}`);
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
        alert("Модель не входит в аффилиацию Босса");
        return false;
      }
    } else if (factionRules.onlyBossAffiliationOrNoAffiliation) {
      // Для Bat Family и Cults: только аффилиация Босса или без аффилиации
      if (!modelFactions.includes("Unknown") && !modelFactions.some(a => bossFactions.includes(a))) {
        alert("Модель не совпадает по Affiliation с Боссом или не имеет аффилиации Unknown");
        return false;
      }
    } else {
      // Стандартная проверка
      if (!modelFactions.includes("Unknown") && !modelFactions.some(a => bossFactions.includes(a))) {
        alert("Модель не совпадает по Affiliation с Боссом");
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
      alert(`Для лидера ${BMG_BOSS.name} разрешены только модели с трейтом "${requiredTrait}"`);
      return false;
    }
  }

  // Проверка уникальности имени (realname)
  const realname = model.realname || "—";
  if (!factionRules.allowSameNameDifferentAlias && realname !== "Unknown" && realname !== "—") {
    const existingWithSameRealname = crew.find(m => (m.realname || "—") === realname);
    if (existingWithSameRealname) {
      alert(`Вы уже добавили модель с именем («${realname}»)`);
      return false;
    }
  }

  // Проверка лимитов рангов
  if (!factionRules.ignoreStandardRankRequirements) {
    // Стандартные проверки рангов
    if (rank === "Leader" && bmgRankCount("Leader") >= 1) {
      alert("Только один Leader");
      return false;
    }
    if (rank === "Sidekick") {
      if (bmgRankCount("Leader") === 0 && bmgRankCount("Sidekick") >= 2) {
        alert("Максимум 2 Sidekick без Leader");
        return false;
      }
      if (bmgRankCount("Leader") >= 1 && bmgRankCount("Sidekick") >= 1) {
        alert("Максимум 1 Sidekick с Leader");
        return false;
      }
    }
    if (rank === "Free Agent" && bmgRankCount("Free Agent") >= 1 + extras + (modifiers.extraFreeAgents || 0)) {
      alert("Превышен лимит Free Agents");
      return false;
    }
    if (rank === "Vehicle" && bmgRankCount("Vehicle") >= 1 + extras + (modifiers.extraVehicles || 0)) {
      alert("Превышен лимит Vehicles");
      return false;
    }
    if (rank === "Henchman") {
      const hasMinionOrHorde = model.traits.some(t => t.startsWith("Minion") || t === "Horde");
      if (!hasMinionOrHorde) {
        const sameNameCount = crew.filter(x => x.name === model.name && x.rankUsed === "Henchman").length;
        if (sameNameCount >= 1 + (modifiers.extraDuplicates || 0)) {
          alert("Нельзя брать больше Henchmen с одинаковым именем (учтены трейты)");
          return false;
        }
      }
      // Проверка Elite, Veteran, Minion (без изменений)
      let eliteExceeded = false;
      model.traits.forEach(t => {
        const eliteMatch = t.match(/^Elite \((.+)\)$/);
        if (eliteMatch) {
          const type = eliteMatch[1];
          const count = crew.filter(m => m.traits.some(u => u.match(new RegExp(`^Elite \\(${type}\\)$`)))).length;
          if (count >= 1 + (modifiers.extraElites[type] || 0)) {
            alert(`Превышен лимит Elite (${type})`);
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
            alert(`Превышен лимит Veteran (${type})`);
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
            alert(`Превышен лимит Minion (${x})`);
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
    // Elite (X): Уже частично есть, но уточним
    const eliteMatch = t.match(/^Elite \((.+)\)$/);
    if (eliteMatch) {
      const type = eliteMatch[1];
      const count = crew.filter(m => m.traits.some(u => u.match(new RegExp(`^Elite \\(${type}\\)$`)))).length;
      if (count >= 1 + (modifiers.extraElites[type] || 0)) {
        alert(`Превышен лимит Elite (${type})`);
        exceeded = true;
      }
    }

    // Horde: Если модель имеет Horde, игнор лимита миньонов на +3
    if (t === "Horde" && bmgRankCount("Henchman") >= 5 + (modifiers.extraMinions["All"] || 0)) {
      alert("Превышен лимит для Horde");
      exceeded = true;
    }

    // Hates (X): Нельзя добавлять если X в отряде
    const hatesMatch = t.match(/^Hates \((.+)\)$/);
    if (hatesMatch) {
      const hated = hatesMatch[1];
      if (crew.some(m => m.name === hated || getFactions(m).includes(hated))) {
        alert(`Нельзя добавить: Hates (${hated})`);
        exceeded = true;
      }
    }
    
    // Aversion (X): Нельзя добавлять если X в отряде
    const aversionMatch = t.match(/^Aversion \((.+)\)$/);
    if (aversionMatch) {
      const averted = aversionMatch[1];
      if (crew.some(m => m.name === averted || getFactions(m).includes(averted))) {
        alert(`Нельзя добавить: Aversion (${averted})`);
        exceeded = true;
      }
    }

    // Required (X): Требует X в отряде
    const requiredMatch = t.match(/^Required \((.+)\)$/);
    if (requiredMatch) {
      const required = requiredMatch[1];
      if (!crew.some(m => m.name === required || m.traits.includes(required))) {
        alert(`Требуется: Required (${required})`);
        exceeded = true;
      }
    }

    // Incorruptible: Нельзя в злые фракции (если фракция villain)
    if (t === "Incorruptible" && ["Joker", "Bane", "Penguin", "Mr. Freeze", "Scarecrow", "Two-Face", "The Riddler", "Organized Crime", "Suicide Squad", "Batman Who Laughs", "Cults"].includes(currentFaction)) {
      alert("Incorruptible: Нельзя в эту фракцию");
      exceeded = true;
    }

    // Freed / He Freed Me: Требует liberator (например, Bane)
    if (t === "Freed" || t === "He Freed Me") {
      if (!crew.some(m => m.name === "Bane" || m.traits.includes("Liberator"))) {
        alert("Требует liberator (He Freed Me)");
        exceeded = true;
      }
    }

    // My Idol!: Требует idol в отряде
    if (t === "My Idol!") {
      if (!BMG_BOSS || BMG_BOSS.name !== "Joker") {
        alert("Требует idol (My Idol!)");
        exceeded = true;
      }
    }

    // Possessed: Только в supernatural фракциях
    if (t === "Possessed" && !["Cults", "Batman Who Laughs"].includes(currentFaction)) {
      alert("Possessed: Только в supernatural фракциях");
      exceeded = true;
    }

    // Meet Goliath!: Требует Goliath
    if (t === "Meet Goliath!") {
      if (!crew.some(m => m.name === "Goliath")) {
        alert("Требует Goliath");
        exceeded = true;
      }
    }

    // The Sidekick: Лимит 1, требует Leader
    if (t === "The Sidekick" && bmgRankCount("Sidekick") >= 1) {
      alert("Превышен лимит Sidekick");
      exceeded = true;
    }
    if (t === "The Sidekick" && !BMG_BOSS) {
      alert("Требует Leader для Sidekick");
      exceeded = true;
    }

    // Amazon Lineage: Только в amazon фракциях
    if (t === "Amazon Lineage" && currentFaction !== "Birds of Prey") {
      alert("Amazon Lineage: Только в amazon фракциях");
      exceeded = true;
    }
  });

  if (exceeded) return false;

  return true;
}


function openEquipmentMenu(model, cardElement) {
  event.stopPropagation();

  // Находим экземпляр модели в банде по uniqueId (но так как у нас может быть несколько одинаковых имён — ищем первый в банде с этим именем)
  const crewModel = crew.find(m => m.name === model.name && m.rankUsed);
  if (!crewModel) return;

  const faction = currentFaction; // текущая фракция
const availableEq = (equipmentByFaction[faction] || []).filter(eq => {
  // Проверка maxPerCrew (остаётся без изменений)
  const currentCount = crew.flatMap(m => m.equipment || []).filter(e => e.name === eq.name).length;
  if (currentCount >= (eq.maxPerCrew || Infinity)) return false;

  // Улучшенная проверка conditions (все должны выполняться)
  if (eq.conditions && eq.conditions.length) {
    const allConditionsMet = eq.conditions.every(cond => {
      const trimmed = cond.trim();

      // "Only Plants" или "Only Animals" — trait у текущей модели
      if (trimmed.startsWith('Only ')) {
        const requiredTrait = trimmed.replace('Only ', '').trim();
        return crewModel.traits && crewModel.traits.some(t => t === requiredTrait);
      }

      // "Model has Elite (SWAT) trait"
      if (trimmed.startsWith('Model has ') && trimmed.endsWith(' trait')) {
        const trait = trimmed.replace('Model has ', '').replace(' trait', '').trim();
        return crewModel.traits && crewModel.traits.some(t => t === trait);
      }

      // "Bruce Wayne in crew" или "Alias: Poison Ivy in crew"
      if (trimmed.endsWith(' in crew')) {
        let modelName = trimmed.replace(' in crew', '').trim();
        if (modelName.startsWith('Alias: ')) {
          modelName = modelName.replace('Alias: ', '').trim();
        }
        return crew.some(m => modelName === m.name);  // Точное совпадение имени
      }

      // Простое имя модели — наличие в crew
      return crew.some(m => m.name === trimmed);
    });

    if (!allConditionsMet) return false;
  }

  // Проверка targetModels (с защитой на undefined)
  if (eq.targetModels && eq.targetModels.length) {
    const allowedByName = eq.targetModels.some(t => t === crewModel.name);
    const allowedByRank = eq.targetModels.some(t => t === crewModel.rankUsed);
    if (!allowedByName && !allowedByRank) return false;
  }

  return true;
});

  // Создаём модальное окно
  const overlay = document.createElement("div");
  overlay.className = "rank-select-modal"; // используем тот же стиль, что и для рангов
  overlay.innerHTML = `
    <div class="rank-select-content">
      <div class="rank-select-header">
        Equipment для <strong>${model.name}</strong>
        <div class="rank-select-close" onclick="this.closest('.rank-select-modal').remove()">×</div>
      </div>
      <div class="rank-select-buttons" style="max-height: 60vh; overflow-y: auto;">
        ${availableEq.length ? availableEq.map(eq => `
          <button class="rank-select-btn" data-eq-name="${eq.name}">
            ${eq.name} ($${eq.fundingCost || 0}${eq.repCost ? ` +${eq.repCost} Rep` : ''})
            <small style="display:block; opacity:0.8; font-size:12px;">${eq.effects.join(" • ")}</small>
          </button>
        `).join("") : "<p style='text-align:center; color:#aaa;'>Нет доступного equipment</p>"}
      </div>
    </div>
  `;

  overlay.querySelectorAll(".rank-select-btn").forEach(btn => {
    btn.onclick = () => {
  const eqName = btn.dataset.eqName;
  const eq = availableEq.find(e => e.name === eqName);
  if (!eq) return;

  // Добавляем equipment к модели
  if (!crewModel.equipment) crewModel.equipment = [];
  crewModel.equipment.push(eq);

  // Обновляем счётчики и интерфейс
  updateCrewEquipmentCounts();
  modifiers = calculateModifiers();
  updateCrewBar();
  renderMiniCardsBuilder();
  
  // Удалите эту строку: overlay.remove();
  
  // Добавьте это для обновления списка (переоткрываем меню с новыми availableEq)
  overlay.remove(); // Сначала закрываем старое
  openEquipmentMenu(model, cardElement); // Открываем заново с обновлённым списком
};
  });

  overlay.onclick = e => e.target === overlay && overlay.remove();
  document.body.appendChild(overlay);
}


// Функция для показа попапа с описанием (для трейтов и equipment)
function showTraitPopup(name, desc) {
  // Создаём overlay (как в showRankSelectionModal)
  const overlay = document.createElement("div");
  overlay.className = "rank-select-modal"; // Используем существующий класс для стиля
  overlay.innerHTML = `
    <div class="rank-select-content">
      <div class="rank-select-header">
        ${name}
        <div class="rank-select-close" onclick="this.closest('.rank-select-modal').remove()">×</div>
      </div>
      <div class="rank-select-buttons" style="padding: 20px; font-size: 16px; line-height: 1.5; color: #ccc;">
        ${desc}  <!-- Здесь effects с <br> станут переносами строк -->
      </div>
    </div>
  `;

  // Клик вне окна — закрыть
  overlay.onclick = e => {
    if (e.target === overlay) overlay.remove();
  };

  document.body.appendChild(overlay);
}

// script.js
function renderObjectiveSelection() {
  const factionRules = factionCrewRules[currentFaction] || {};
  if (!BMG_BOSS) {
    alert("Сначала выберите Босса!");
    return;
  }

  const allowedAffiliations = factionRules.onlyBossAffiliationObjectives ? [...BMG_AFFILIATIONS, ""] : null;
  const availableObjectives = allowedAffiliations
    ? objectives.filter(obj => obj.affiliation.length === 0 || obj.affiliation.some(a => allowedAffiliations.includes(a)))
    : objectives;

  // Пример рендеринга в модальном окне
  const modal = document.createElement("div");
  modal.className = "rank-select-modal";
  modal.innerHTML = `
    <div class="rank-select-content">
      <div class="rank-select-header">
        Выберите объективы
        <div class="rank-select-close" onclick="this.closest('.rank-select-modal').remove()">×</div>
      </div>
      <div class="rank-select-buttons">
        ${availableObjectives.map(obj => `
          <button class="rank-select-btn" data-objective="${obj.name}">
            ${obj.name}
            <small style="display:block; opacity:0.8; font-size:12px;">${obj.description}</small>
          </button>
        `).join("")}
      </div>
    </div>
  `;
  document.body.appendChild(modal);
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
    allowBetray: false
  };
  updateCrewBar();
  if (currentMode === 'builder') {
    renderMiniCardsBuilder();
  }
}

let isDesktop = window.innerWidth > 768 && !/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isDesktop) {
  const tabs = document.querySelector('.tabs');
  if (tabs) {
    let isDown = false;
    let startX;
    let scrollLeft;

    // Зажали мышку
    tabs.addEventListener('mousedown', (e) => {
      isDown = true;
      tabs.classList.add('grabbing');
      startX = e.pageX - tabs.offsetLeft;
      scrollLeft = tabs.scrollLeft;
      e.preventDefault(); // чтобы не выделялся текст
    });

    // Отпустили мышку (где угодно)
    tabs.addEventListener('mouseleave', () => {
      isDown = false;
      tabs.classList.remove('grabbing');
    });
    tabs.addEventListener('mouseup', () => {
      isDown = false;
      tabs.classList.remove('grabbing');
    });

    // Тянем
    tabs.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - tabs.offsetLeft;
      const walk = (x - startX) * 2; // скорость прокрутки (можно поменять 2 на 1.5 или 3)
      tabs.scrollLeft = scrollLeft - walk;
    });

    // Колёсико мыши → горизонтальная прокрутка
    tabs.addEventListener('wheel', (e) => {
      e.preventDefault();
      tabs.scrollLeft += e.deltaY * 1.5; // скорость можно настроить
    });
  }
}