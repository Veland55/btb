// ======================== ГЛОБАЛЬНЫЕ ========================
let crew = [];
let currentFaction = "Bat Family";
let allCompendiumHTML = "";
let compendiumKeys = [];

const $ = id => document.getElementById(id);
const hasInCrew = m => crew.some(x => x._id === m._id);

// ======================== ОТРЯД ========================
const addToCrew = m => {
  crew = hasInCrew(m) ? crew.filter(x => x._id !== m._id) : [...crew, m];
  updateCrewBar();
  renderMiniCards();
};

const updateCrewBar = () => {
  $("crewCount").textContent = crew.length;
  $("totalRep").textContent = crew.reduce((a,m)=>a+(m.rep||0),0);
  $("totalFunding").textContent = crew.reduce((a,m)=>a+(m.funding||0),0);
};

// ======================== МИНИ-КАРТОЧКИ ========================
const renderMiniCards = (() => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const grid = $("modelsGrid");
      currentFaction = document.querySelector(".tab.active")?.dataset.faction || currentFaction;
      const fragment = document.createDocumentFragment();

      models.filter(m => {
        const factions = Array.isArray(m.faction)
          ? m.faction
          : typeof m.faction === "string"
            ? m.faction.replace(/ *& */gi,",").replace(/ *\/ */g,",").split(",").map(s=>s.trim())
            : [];
        return factions.includes(currentFaction);
      }).forEach(model => {
        const inCrew = hasInCrew(model);
        const div = document.createElement("div");
        div.className = `mini-card ${inCrew ? "in-crew" : ""}`;
        div.innerHTML = `
          <button class="${inCrew?"remove-btn":"add-btn"}" onclick="event.stopPropagation();addToCrew(models[${model._id}])">${inCrew?"−":"+"}</button>
          <img src="${model.img}" onerror="this.src='https://veland55.github.io/btb/img/no.png'">
          <div class="mini-info">
            <div class="mini-name">${model.name}</div>
            <div class="mini-rep">${model.rep} Rep • $${model.funding||0}</div>
          </div>`;
        div.onclick = () => showFullCard(model);
        fragment.appendChild(div);
      });
      grid.innerHTML = "";
      grid.appendChild(fragment);
    }, 10);
  };
})();

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
const closeCompendium = () => $("compendiumModal").classList.remove("active");

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

const closeModelSearch = () => $("modelSearchModal").classList.remove("active");

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

// ======================== ВКЛАДКИ ========================
document.querySelectorAll(".tab").forEach(tab => {
  tab.onclick = () => {
    if (crew.length && !confirm("Смена фракции очистит отряд. Продолжить?")) return;
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    crew = [];
    currentFaction = tab.dataset.faction;
    updateCrewBar();
    renderMiniCards();
    closeCompendium();
    closeModelSearch();
  };
});

// ======================== ИНИЦИАЛИЗАЦИЯ ========================
window.addEventListener("load", () => {
  if (window.compendium) {
    compendiumKeys = Object.keys(window.compendium).sort();
    allCompendiumHTML = compendiumKeys.map(k => `
      <div class="comp-entry"><div class="comp-title">${k}</div><div class="comp-text">${(compendium[k]||"").replace(/\n/g,"<br>")}</div></div>`).join("");
    $("compendiumList").innerHTML = allCompendiumHTML;
  }
  models.forEach((m,i) => m._id = i);
  renderMiniCards();
  updateCrewBar();
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
  return Math.ceil(BMG_REP_LIMIT / 150) * 500;
}

function bmgExtraSlots() {
  if (BMG_REP_LIMIT <= 350) return 0;
  return Math.ceil((BMG_REP_LIMIT - 350) / 150);
}

function bmgRankCount(rank) {
  return crew.filter(m => m.rankUsed === rank).length;
}

function bmgCanAddModel(model) {

  // REP
  if (totalRep + model.rep > BMG_REP_LIMIT) {
    alert("Превышен лимит Reputation");
    return false;
  }

  // FUNDING
  if ((totalFundingUsed || 0) + (model.funding || 0) > bmgFundingLimit()) {
    alert("Недостаточно Funding");
    return false;
  }

  // FIRST MODEL = BOSS
  if (!BMG_BOSS) {
    if (!model.ranks.includes("Leader") &&
        !model.ranks.includes("Sidekick")) {
      alert("Первой моделью должен быть Leader или Sidekick");
      return false;
    }
  }

  // AFFILIATION
  if (BMG_BOSS) {
    if (
      !model.affiliations.includes("Unknown") &&
      !model.affiliations.some(a => BMG_AFFILIATIONS.includes(a))
    ) {
      alert("Модель не совпадает по Affiliation с Боссом");
      return false;
    }
  }

  // RANK LIMITS
  const extras = bmgExtraSlots();

  if (model.ranks.includes("Leader") && bmgRankCount("Leader") >= 1) {
    return false;
  }

  if (model.ranks.includes("Sidekick")) {
    if (bmgRankCount("Leader") === 0 && bmgRankCount("Sidekick") >= 2) return false;
    if (bmgRankCount("Leader") === 1 && bmgRankCount("Sidekick") >= 1) return false;
  }

  if (model.ranks.includes("Free Agent") &&
      bmgRankCount("Free Agent") >= 1 + extras) return false;

  if (model.ranks.includes("Vehicle") &&
      bmgRankCount("Vehicle") >= 1 + extras) return false;

  if (model.ranks.includes("Henchman")) {
    if (crew.some(m => m.name === model.name)) {
      alert("Нельзя брать двух одинаковых Henchmen");
      return false;
    }
  }

  return true;
}
