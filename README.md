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
- **Справочник (Compendium)** — поиск по трейтам, оружию и правилам
- **PDF документы** — быстрый доступ к Rulebook, FAQ и Batmatch
- **Адаптивный дизайн** — оптимизирован для мобильных устройств
- **Сохранение настроек** — выбранный язык сохраняется между сессиями

### 🇬🇧 English
- **Bilingual interface** — switch between Russian and English
- **Cards viewer** — catalog of all models with faction filtering
- **Crew builder** — create gangs with automatic rules checking
- **Compendium** — search traits, weapons, and rules
- **PDF documents** — quick access to Rulebook, FAQ, and Batmatch
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
├── index.html          # Приложение: карточки + билдер + игра / App: cards + builder + game
├── style.css           # Стили и адаптивный дизайн / Styles and responsive design
├── script.js           # Логика приложения / Application logic
├── auth.js             # Профили и сохранения (клиент API) / Profiles & saves (API client)
├── game.js             # Раздел ИГРА: обмен ростерами по коду / GAME section: roster sharing
├── data.js             # Модели, снаряжение, правила фракций / Models, equipment, faction rules
├── data-traits.js      # Единая база трейтов и правил — используется приложением
│                       #   и compendium.html / Shared traits DB (app + compendium page)
├── compendium.html     # Справочник (трейты рендерятся из data-traits.js)
├── rules.html          # Конспект правил игры / Rules wiki
├── img/                # Изображения моделей и иконки / Model images and icons
│   ├── ico/            # Иконки-токены текстов ({..._ICON}) / Inline text icons
│   └── menu/           # Иконки и фоны фракций / Faction icons & backgrounds
├── data/bmg.db         # База сервера: пользователи, сохранения, игры (создаётся сама)
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
- **Профили** — регистрация/вход (пароли хранятся как scrypt-хэши с солью);
- **Сохранения отрядов** — до 5 на пользователя, доступны с любого устройства;
- **Игровые комнаты** — обмен ростерами с оппонентом по 6-значному коду (живут 24 часа).

Все данные — в одном компактном файле `data/bmg.db` (SQLite, встроенный `node:sqlite`).
Ростеры хранятся в сжатом формате (имена-ссылки на базу моделей, ~200–400 байт на отряд).

**Деплой на свой сервер:** скопируйте папку проекта, запустите `node server.js`
(или `npm start`) под systemd/pm2; при необходимости поставьте впереди nginx с HTTPS.
Бэкапится один файл: `data/bmg.db`.

### 🇬🇧 English
The project only needs **Node.js 22.5+** — no npm dependencies, no build step.

```bash
node server.js
# Open http://localhost:8080  (override the port with the PORT env variable)
```

The server serves the app's static files and provides an API:
- **Profiles** — register/login (passwords stored as salted scrypt hashes);
- **Crew saves** — up to 5 per user, available from any device;
- **Game rooms** — share rosters with an opponent via a 6-character code (24h lifetime).

All data lives in a single compact `data/bmg.db` file (SQLite via built-in `node:sqlite`).
Rosters are stored in a compressed format (name references into the model DB, ~200–400 bytes per crew).

**Deploying to your own server:** copy the project folder, run `node server.js`
(or `npm start`) under systemd/pm2; optionally put nginx with HTTPS in front.
Back up a single file: `data/bmg.db`.

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

**v0.6** — Двуязычная поддержка, мобильная оптимизация, исправления ошибок

**v0.6** — Bilingual support, mobile optimization, bug fixes
