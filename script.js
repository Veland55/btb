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
  const factions = Array.isArray(model.faction) ? model.faction : [model.faction||"—"];
  const weaponsHTML = model.weapons?.length ? model.weapons.map(w => {
    const traits = w.traits ? w.traits.split("/").map(t=>t.trim()).filter(Boolean) : [];
    return `<div class="official-weapon"><div class="official-weapon-first-line">
      <span class="official-weapon-name">${w.name}</span>
      ${w.damage?`<span class="official-weapon-damage">${w.damage}</span>`:""}
      ${w.rof&&w.rof!=="-"?`<span class="official-weapon-rof">${w.rof}<img src="https://veland55.github.io/btb/img/rof.png" class="stat-icon"></span>`:""}
      ${w.ammo&&w.ammo!=="-"?`<span class="official-weapon-ammo">${w.ammo}<img src="https://veland55.github.io/btb/img/ammo.png" class="stat-icon"></span>`:""}
    </div>${traits.length?`<div class="official-weapon-traits-line">${traits.map(t=>`<span class="weapon-trait-chip" onclick="event.stopPropagation();showTraitDesc('${t.replace(/'/g,"\\'")}')">${t}</span>`).join("")}</div>`:""}</div>`;
  }).join("") : "";

  const traitsHTML = model.traits?.length ? `<div class="official-section yellow"><div class="official-section-title">TRAITS</div><div class="official-traits-grid">${model.traits.map(t=>`<div class="official-trait" onclick="showTraitDesc('${t.replace(/'/g,"\\'")}')">${t}</div>`).join("")}</div></div>` : "";

  $("fullCardContent").innerHTML = `<div class="official-card">
    <div class="official-header"><div class="official-name">${model.name.toUpperCase()}</div>
    <div class="official-subtitle">${model.rank||"Free Agent"} • ${factions.join(" • ")} • ${model.rep} REP • $${model.funding||0}</div></div>
    <div class="official-main">
      <div class="official-img-wrapper"><img src="${model.img}" class="official-img" onerror="this.src='https://veland55.github.io/btb/img/no.png'"></div>
      <div class="official-stats">
        <div class="official-stat vertical-stat"><span class="official-value">${model.stats.Willpower||"-"}</span><span class="official-label">Willpower</span></div>
        <div class="official-stat vertical-stat"><span class="official-value">${model.stats.Endurance||"-"}</span><span class="official-label">Endurance</span></div>
        <div class="official-stat"><span class="official-value">${model.stats.Attack||"-"}</span><span class="official-label"><img src="https://veland55.github.io/btb/img/Attack.png" class="stat-icon"></span></div>
        <div class="official-stat"><span class="official-value">${model.stats.Defense||"-"}</span><span class="official-label"><img src="https://veland55.github.io/btb/img/Defense.png" class="stat-icon"></span></div>
        <div class="official-stat"><span class="official-value">${model.stats.Strength||"-"}</span><span class="official-label"><img src="https://veland55.github.io/btb/img/Strength.png" class="stat-icon"></span></div>
        <div class="official-stat"><span class="official-value">${model.stats.Movement||"-"}</span><span class="official-label"><img src="https://veland55.github.io/btb/img/Movement.png" class="stat-icon"></span></div>
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
const showTraitDesc = keyword => {
  if (!window.compendium?.[keyword]) { alert("Нет описания: "+keyword); return; }
  const desc = (compendium[keyword]||"").replace(/\n/g,"<br>");
  const popup = document.createElement("div");
  popup.className = "trait-popup";
  popup.innerHTML = `<div class="trait-popup-content">
    <div class="trait-popup-header"><div>${keyword}</div>
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