let crew = JSON.parse(localStorage.getItem('bmg-crew') || '[]');
let currentFaction = 'all';

function render() {
  const search = (document.getElementById('search')?.value || '').toLowerCase();

  const filtered = models.filter(m => {
    // === ПОДДЕРЖКА МАССИВА factions ===
    const modelFactions = Array.isArray(m.factions) ? m.factions : 
                          (typeof m.faction === 'string' ? [m.faction] : []);

    const matchesFaction = currentFaction === 'all' ||
      modelFactions.includes(currentFaction) ||
      (currentFaction === 'Free Agent' && m.role?.includes('Free'));

    const matchesSearch = m.name.toLowerCase().includes(search);

    return matchesFaction && matchesSearch;
  });

  document.getElementById('models').innerHTML = filtered.map(m => `
    <div class="card ${crew.some(c => c.name === m.name) ? 'selected' : ''}" onclick="showDetails('${m.name}')">
      <img src="${m.img}" onerror="this.src='https://img.icons8.com/fluency/192/batman-new.png'">
      <div class="info">
        <div class="name">${m.name}</div>
        <div class="rep">${m.rep} Rep • $${m.funding}</div>
      </div>
    </div>
  `).join('');

  updateTotals();
  renderCrew();
}

function showDetails(name) {
  const m = models.find(x => x.name === name);
  if (!m) return;

  // === Показываем ВСЕ фракции в деталях ===
  const factionsArray = Array.isArray(m.factions) ? m.factions : 
                        (typeof m.faction === 'string' ? [m.faction] : ['—']);
  const factionsDisplay = factionsArray.join(' • ');

  document.getElementById('modal-body').innerHTML = `
    <div class="card-full">
      <img src="${m.img}" class="card-img" onerror="this.src='https://img.icons8.com/fluency/192/batman-new.png'">
      <h2>${m.name}</h2>
      <div class="role">${m.role} • ${factionsDisplay}</div>
      <div class="rep-fund">
        <span class="rep">Reputation: <strong>${m.rep}</strong></span>
        <span class="fund">$${m.funding}</span>
      </div>
      <div class="stats-grid">
        <div class="stat-icon clickable" onclick="showInfo('Movement','Количество дюймов движения')"><span>MV</span><strong>${m.stats.mv}</strong></div>
        <div class="stat-icon clickable" onclick="showInfo('Close Combat','Сила в ближнем бою')"><span>CC</span><strong>${m.stats.cc}</strong></div>
        <div class="stat-icon clickable" onclick="showInfo('Ranged Skill','Меткость при стрельбе')"><span>RS</span><strong>${m.stats.rs}</strong></div>
        <div class="stat-icon clickable" onclick="showInfo('Strength','Физическая сила')"><span>ST</span><strong>${m.stats.st}</strong></div>
        <div class="stat-icon clickable" onclick="showInfo('Willpower','Сила воли')"><span>WP</span><strong>${m.stats.wp}</strong></div>
        <div class="stat-icon clickable" onclick="showInfo('Endurance','Количество урона, которое выдержит модель')"><span>EN</span><strong>${m.stats.en}</strong></div>
      </div>
      <div class="section">
        <h3>Traits</h3>
        <div class="traits-list">
          ${m.traits.map(t => `<div class="trait-chip clickable" onclick="showInfo('${t}', 'Описание скоро будет добавлено')">${t}</div>`).join('')}
        </div>
      </div>
      <div class="section">
        <h3>Weapons</h3>
        <div class="weapons-list">
          ${m.weapons.map(w => `<div class="weapon-chip">${w}</div>`).join('')}
        </div>
      </div>
      <button class="add-btn" onclick="toggle('${m.name}'); closeModal(); render();">
        ${crew.some(c => c.name === m.name) ? 'Убрать из отряда' : 'Добавить в отряд'}
      </button>
    </div>
  `;
  document.getElementById('modal').style.display = 'block';
}

// Остальные функции без изменений
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

function toggle(name) {
  const m = models.find(x => x.name === name);
  const i = crew.findIndex(c => c.name === name);
  if (i === -1) crew.push(m);
  else crew.splice(i, 1);
  localStorage.setItem('bmg-crew', JSON.stringify(crew));
  render();
}

function updateTotals() {
  const rep = crew.reduce((a, c) => a + c.rep, 0);
  const fund = crew.reduce((a, c) => a + c.funding, 0);
  document.getElementById('rep').textContent = rep;
  document.getElementById('fund').textContent = fund;
}

function renderCrew() {
  document.getElementById('crew').innerHTML = crew.length === 0
    ? '<p style="text-align:center;color:#666">Отряд пуст</p>'
    : crew.map(m => `
      <div>
        <strong>${m.name}</strong> — ${m.rep} Rep
        <span style="float:right;color:#e94560;cursor:pointer;font-size:20px" onclick="toggle('${m.name}');render()">Remove</span>
      </div>
    `).join('');
}

function shareCrew() {
  const text = crew.map(m => `${m.name} (${m.rep} Rep)`).join('\n') +
               `\n\nВсего: ${crew.reduce((a,c)=>a+c.rep,0)} Rep | $${crew.reduce((a,c)=>a+c.funding,0)}`;
  navigator.clipboard.writeText(text);
  alert('Список скопирован в буфер!');
  document.getElementById('qrcode').innerHTML = '';
  new QRCode(document.getElementById('qrcode'), {
    text: JSON.stringify(crew), width: 256, height: 256,
    colorDark: "#e94560", colorLight: "#000"
  });
}

function showInfo(title, text) {
  document.getElementById('info-title').textContent = title;
  document.getElementById('info-text').textContent = text;
  document.getElementById('info-overlay').style.display = 'flex';
}

// Остальные функции (compendium, вкладки и т.д.) — без изменений
function openCompendium() {
  document.querySelector('.search').style.display = 'none';
  document.getElementById('modelsGrid').style.display = 'none';
  document.getElementById('compendiumScreen').style.display = 'block';
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  renderCompendium();
  document.getElementById('compendiumSearch').focus();
}

function clearCompendiumSearch() {
  document.getElementById("compendiumSearch").value = "";
  document.querySelector(".clear-search").style.display = "none";
  document.getElementById("compendiumList").innerHTML = allCompendiumHTML;
}

document.getElementById("compendiumSearch").oninput = function() {
  const hasText = this.value.length > 0;
  document.querySelector(".clear-search").style.display = hasText ? "flex" : "none";
  const q = this.value.toLowerCase();
  if (!q) {
    document.getElementById("compendiumList").innerHTML = allCompendiumHTML;
    return;
  }
  let html = "";
  compendiumKeys.forEach(key => {
    if (key.toLowerCase().includes(q)) {
      html += `
        <div class="comp-entry">
          <div class="comp-title">${key}</div>
          <div class="comp-text">
            ${(window.compendium[key] || "").replace(/\n/g, "<br>")}
          </div>
        </div>`;
    }
  });
  document.getElementById("compendiumList").innerHTML = html || "<div style='text-align:center;color:#777;padding:100px;font-size:18px;'>Ничего не найдено</div>";
};

document.querySelectorAll('.tab').forEach(tab => {
  const oldOnclick = tab.onclick || (() => {});
  tab.onclick = function() {
    document.getElementById('compendiumScreen').style.display = 'none';
    document.querySelector('.search').style.display = 'block';
    document.getElementById('modelsGrid').style.display = 'grid';
    document.getElementById('modelsGrid').innerHTML = '';
    const grid = document.getElementById('modelsGrid');
    grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(160px,1fr))';
    grid.style.gap = '15px';
    grid.style.padding = '15px';
    oldOnclick.call(this);
  };
});

document.querySelectorAll('.tab').forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentFaction = tab.dataset.faction;
    render();
  };
});

document.getElementById('search').oninput = render;

if (window.Telegram?.WebApp) {
  Telegram.WebApp.ready();
  Telegram.WebApp.expand();
}

render();