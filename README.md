# BMG Crew Builder

**Batman Miniature Game Crew Builder** — это интерактивный веб-инструмент для создания и управления отрядами в настольной игре Batman Miniature Game от Knight Models.

**Batman Miniature Game Crew Builder** is an interactive web tool for creating and managing crews in the Batman Miniature Game tabletop game by Knight Models.

---

## 📋 Описание / Description

Этот проект помогает игрокам быстро собирать отряды, проверяя все правила найма моделей, лимиты рангов, аффилиации и специальные требования фракций.

This project helps players quickly build crews by checking all model hiring rules, rank limits, affiliations, and special faction requirements.

---

## 🚀 Особенности / Features

### 🇷🇺 Русский
- **Двуязычный интерфейс** — переключение между русским и английским языком
- **Просмотр карточек** — каталог всех моделей с фильтрацией по фракциям
- **Конструктор отрядов** — создание банды с автоматической проверкой правил
- **Колода карт целей** — набор Objective-колоды по официальным правилам
- **Раздел ИГРА** — обмен ростерами по коду, условия игры (Event/Encounter), счётчики WIL/END/KD/KO, очки побед (VP) и запись победителя партии
- **Турниры** — организация мероприятий (адрес, даты, лимит мест + резерв), регистрация участников, подача двух ростеров по правилам Batmatch, туры со швейцарскими парами, таблица и победитель
- **Статистика** — популярные банды, модели и боссы, рейтинг побед, лучшие игроки, география игроков и турниров
- **Профили** — сохранения отрядов (до 5), страна игрока, доступ с любого устройства
- **Справочник (Compendium)** — поиск по трейтам, оружию и правилам
- **PDF документы** — быстрый доступ к Rulebook, FAQ и Batmatch
- **Экспорт отряда в PDF** — печатный ростер из просмотра отряда
- **Адаптивный дизайн** — оптимизирован для мобильных устройств
- **Сохранение настроек** — выбранный язык сохраняется между сессиями

### 🇬🇧 English
- **Bilingual interface** — switch between Russian and English
- **Cards viewer** — catalog of all models with faction filtering
- **Crew builder** — create gangs with automatic rules checking
- **Objective deck builder** — build the Objective card deck by the official rules
- **GAME section** — share rosters via a code, game conditions (Event/Encounter), WIL/END/KD/KO trackers, victory points (VP) and recording the game winner
- **Tournaments** — organize events (address, dates, player limit + reserve slots), player registration, submitting two rosters per Batmatch rules, rounds with Swiss pairings, standings and a winner
- **Statistics** — popular crews, models and bosses, win rating, top players, player and tournament geography
- **Profiles** — crew saves (up to 5), player country, available from any device
- **Compendium** — search traits, weapons, and rules
- **PDF documents** — quick access to Rulebook, FAQ, and Batmatch
- **Roster PDF export** — printable roster from the crew preview
- **Responsive design** — optimized for mobile devices
- **Settings persistence** — selected language saved between sessions

---

## 🎮 Функционал конструктора / Builder Features

### 🇷🇺 Русский
- **Автоматическая проверка правил:**
  - Лимиты Reputation и Funding
  - Ограничения по рангам (Leader, Sidekick, Henchman, Free Agent, Vehicle)
  - Требования аффилиации между моделями
  - Уникальность имён (realname)
  - Специальные правила фракций (Bat Family, Cults, Batman Who Laughs)

- **Учёт трейтов:**
  - Elite, Veteran, Minion лимиты
  - Hates, Aversion, Required проверки
  - Treacherous предупреждения
  - Incorruptible, Possessed и другие специальные трейты

- **Снаряжение (Equipment):**
  - Добавление оборудования к моделям
  - Учёт стоимости в Rep и Funding
  - Проверка условий доступности

### 🇬🇧 English
- **Automatic rules checking:**
  - Reputation and Funding limits
  - Rank restrictions (Leader, Sidekick, Henchman, Free Agent, Vehicle)
  - Affiliation requirements between models
  - Name uniqueness (realname)
  - Special faction rules (Bat Family, Cults, Batman Who Laughs)

- **Trait tracking:**
  - Elite, Veteran, Minion limits
  - Hates, Aversion, Required checks
  - Treacherous warnings
  - Incorruptible, Possessed and other special traits

- **Equipment:**
  - Add equipment to models
  - Track Rep and Funding costs
  - Check availability conditions

---

## 📁 Структура проекта / Project Structure

```
btb-main/
├── server.js           # Сервер: статика + API (Node.js, без зависимостей)
│                       #   Server: static files + API (Node.js, zero-dependency)
├── index.html          # Приложение: все разделы / App: all sections
├── style.css           # Стили и адаптивный дизайн / Styles and responsive design
├── script.js           # Логика приложения и переводы / App logic and translations
├── auth.js             # Профили, сохранения, страна (клиент API) / Profiles, saves, country
├── game.js             # Раздел ИГРА: ростеры по коду, счёт и результат партии
│                       #   GAME section: roster sharing, score & game result
├── cards.js            # Набор колоды карт целей / Objective deck builder
├── stats.js            # Раздел СТАТИСТИКА / STATISTICS section
├── tournaments.js      # Раздел ТУРНИРЫ: организация, туры, таблица
│                       #   TOURNAMENTS: events, rounds, standings
├── data.js             # Модели, снаряжение, правила фракций / Models, equipment, faction rules
├── data-traits.js      # Единая база трейтов и правил — используется приложением
│                       #   и compendium.html / Shared traits DB (app + compendium page)
├── data-cards.js       # Каталог карт целей / Objective cards catalog
├── data-game.js        # Карты условий игры (Events/Encounters) / Game condition cards
├── compendium.html     # Справочник (трейты рендерятся из data-traits.js)
├── rules.html          # Конспект правил игры / Rules wiki
├── img/                # Изображения моделей и иконки / Model images and icons
│   ├── ico/            # Иконки-токены текстов ({..._ICON}) / Inline text icons
│   ├── cards/          # Сканы карт целей / Objective card scans
│   └── menu/           # Иконки и фоны фракций / Faction icons & backgrounds
├── data/bmg.db         # База сервера: пользователи, сохранения, игры, результаты,
│                       #   турниры (создаётся сама) / Server DB (auto-created)
└── README.md           # Этот файл / This file
```

**Примечания по структуре / Structure notes:**
- Трейты правятся только в `data-traits.js` — раздел The Traits в `compendium.html` и
  справочник внутри приложения строятся из него автоматически.
- Все пути к картинкам относительные (`img/...`) — приложение работает локально и на любом хостинге.
- Значки характеристик полной карточки (Attack/Defense/Strength/Movement) берутся из `img/`
  и вынесены в константу `STAT_ICONS` в `script.js` отдельно от иконок-токенов (`img/ico/`).

---

## 🛠 Технологии / Technologies

- **HTML5** — семантическая разметка
- **CSS3** — стили, анимации, медиа-запросы
- **JavaScript (ES6+)** — логика приложения без фреймворков
- **Node.js 22.5+** — сервер без npm-зависимостей / zero-dependency server
- **SQLite** (встроенный `node:sqlite`) — база пользователей, игр и турниров
- **Google Fonts** — шрифт Oswald
- **LocalStorage** — сохранение настроек языка

---

## 🎯 Фракции / Factions

### 🇷🇺 Русский
Проект поддерживает 20 фракций:
- Bat Family, GCPD, Birds of Prey
- Joker, Bane, League of Shadows
- Royal Flush, Penguin, Mr. Freeze
- Scarecrow, Two-Face, The Riddler
- Organized Crime, Suicide Squad
- Court of Owls, Watchmen
- Batman Who Laughs, Cults, Doom Patrol
- Unknown

### 🇬🇧 English
The project supports 20 factions:
- Bat Family, GCPD, Birds of Prey
- Joker, Bane, League of Shadows
- Royal Flush, Penguin, Mr. Freeze
- Scarecrow, Two-Face, The Riddler
- Organized Crime, Suicide Squad
- Court of Owls, Watchmen
- Batman Who Laughs, Cults, Doom Patrol
- Unknown

---

## 📱 Мобильная оптимизация / Mobile Optimization

### 🇷🇺 Русский
- Адаптивный интерфейс для экранов от 320px
- Сенсорное управление (touch-friendly)
- Оптимизированные шрифты и кнопки
- Сворачиваемые секции и вкладки

### 🇬🇧 English
- Responsive interface for screens from 320px
- Touch-friendly controls
- Optimized fonts and buttons
- Collapsible sections and tabs

---

## 🔧 Установка и запуск / Installation & Running

### 🇷🇺 Русский
Проекту нужен только **Node.js 22.5+** — никаких npm-зависимостей и сборки.

```bash
node server.js
# Откройте http://localhost:8080  (порт меняется через переменную окружения PORT)
```

Сервер раздаёт статику приложения и предоставляет API:
- **Профили** — регистрация/вход (пароли хранятся как scrypt-хэши с солью; имена
  уникальны без учёта регистра), страна игрока для статистики;
- **Сохранения отрядов** — до 5 на пользователя, доступны с любого устройства;
- **Игровые комнаты** — обмен ростерами с оппонентом по 6-значному коду (живут 24 часа);
  результат партии (победитель + VP) сохраняется в постоянную таблицу побед;
- **Турниры** — создание мероприятий, регистрация с резервными местами, туры со
  швейцарскими парами, самозапись результатов участниками, таблица и победитель;
- **Статистика** — публичные агрегаты без личных данных (`GET /api/stats`).

Все данные — в одном компактном файле `data/bmg.db` (SQLite, встроенный `node:sqlite`).
Ростеры хранятся в сжатом формате (имена-ссылки на базу моделей, ~200–400 байт на отряд).
Переменные окружения: `PORT` — порт сервера, `BMG_DATA_DIR` — каталог базы данных
(по умолчанию `data/` рядом с server.js). Как развернуть на боевом сервере —
см. раздел «Деплой на VPS» ниже.

### 🇬🇧 English
The project only needs **Node.js 22.5+** — no npm dependencies, no build step.

```bash
node server.js
# Open http://localhost:8080  (override the port with the PORT env variable)
```

The server serves the app's static files and provides an API:
- **Profiles** — register/login (passwords stored as salted scrypt hashes; names are
  unique case-insensitively), player country for statistics;
- **Crew saves** — up to 5 per user, available from any device;
- **Game rooms** — share rosters with an opponent via a 6-character code (24h lifetime);
  the game result (winner + VP) is saved into a permanent wins table;
- **Tournaments** — create events, registration with reserve slots, rounds with Swiss
  pairings, self-reported results, standings and a winner;
- **Statistics** — public aggregates with no personal data (`GET /api/stats`).

All data lives in a single compact `data/bmg.db` file (SQLite via built-in `node:sqlite`).
Rosters are stored in a compressed format (name references into the model DB, ~200–400 bytes per crew).
Environment variables: `PORT` — server port, `BMG_DATA_DIR` — database directory
(defaults to `data/` next to server.js). For production deployment see the
"VPS Deployment" section below.

---

## 🖥 Деплой на VPS / VPS Deployment (Ubuntu 24.04)

Полный путь от чистого сервера до работающего сайта с HTTPS. Команды одинаковы
для любого VPS-провайдера. / Full path from a clean server to a live site with
HTTPS; the commands work on any VPS provider.

### 1. Node.js 22

В Ubuntu 24.04 из коробки Node 18 — проекту нужен 22+ (встроенный `node:sqlite`).
/ Ubuntu 24.04 ships Node 18; the project needs 22+ (built-in `node:sqlite`).

```bash
ssh root@ВАШ_IP
apt update && apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs git
node -v   # должно быть v22.x / should print v22.x
```

### 2. Пользователь и файлы / User & files

```bash
adduser --system --group --home /opt/bmg bmg
# загрузите проект: git clone или scp с вашего компьютера
# upload the project: git clone or scp from your machine
git clone https://github.com/Veland55/btb.git /opt/bmg/app
chown -R bmg:bmg /opt/bmg
```

### 3. Служба systemd / systemd service

Авто-запуск при загрузке и перезапуск при сбоях. Создайте
`/etc/systemd/system/bmg.service`: / Auto-start on boot and restart on crashes.
Create `/etc/systemd/system/bmg.service`:

```ini
[Unit]
Description=BMG Crew Builder
After=network.target

[Service]
User=bmg
WorkingDirectory=/opt/bmg/app
ExecStart=/usr/bin/node server.js
Environment=PORT=8080
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
systemctl daemon-reload && systemctl enable --now bmg
systemctl status bmg            # проверка / check
journalctl -u bmg -f            # логи / logs
```

### 4. Nginx + HTTPS

Домен должен указывать A-записью на IP сервера. / The domain's A record must
point to the server IP.

```bash
apt install -y nginx certbot python3-certbot-nginx
cat > /etc/nginx/sites-available/bmg <<'EOF'
server {
    server_name your-domain.com;
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
EOF
ln -s /etc/nginx/sites-available/bmg /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
certbot --nginx -d your-domain.com   # сертификат + редирект на HTTPS
```

### 5. Файрвол и бэкап / Firewall & backup

```bash
apt install -y ufw && ufw allow OpenSSH && ufw allow "Nginx Full" && ufw enable
# ежедневный бэкап базы (один файл), хранится неделя по дням
# daily DB backup (a single file), one week of rotation
echo '0 3 * * * root cp /opt/bmg/app/data/bmg.db /opt/bmg/backup-$(date +\%u).db' > /etc/cron.d/bmg-backup
```

### Обновление / Updating

```bash
cd /opt/bmg/app && sudo -u bmg git pull && systemctl restart bmg
# база data/bmg.db при обновлении не затрагивается / data/bmg.db is untouched
```

---

## 📄 Официальные документы / Official Documents

- **Rulebook:** https://app.knightmodels.com/files//rule-document-rulebook-1701448204.pdf
- **FAQs:** https://app.knightmodels.com/files//rule-document-faqs-1701683889.pdf
- **Batmatch:** https://app.knightmodels.com/files//rule-document-batmatch-1700369985.pdf

---

## ⚠️ Отказ от ответственности / Disclaimer

### 🇷🇺 Русский
Этот проект является фанатским инструментом и не аффилирован с Knight Models или DC Comics. Все изображения и названия являются собственностью соответствующих владельцев.

### 🇬🇧 English
This project is a fan-made tool and is not affiliated with Knight Models or DC Comics. All images and names are property of their respective owners.

---

## 📬 Контакты / Contact

Проект создан для сообщества игроков Batman Miniature Game.

Created for the Batman Miniature Game player community.

---

## 📝 Версия / Version

**v0.8** — Турниры (организация, туры со швейцарскими парами, таблица), очки побед и
результаты партий в разделе ИГРА, рейтинг побед и лучшие игроки в статистике

**v0.8** — Tournaments (events, rounds with Swiss pairings, standings), victory points
and game results in the GAME section, win rating and top players in statistics

<details>
<summary>История версий / Version history</summary>

- **v0.7** — Раздел СТАТИСТИКА, страна в профиле, единые кнопки «назад» /
  STATISTICS section, profile country, unified back buttons
- **v0.6** — Двуязычная поддержка, мобильная оптимизация, исправления ошибок /
  Bilingual support, mobile optimization, bug fixes

</details>
