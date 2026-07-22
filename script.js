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
  const base = "img/menu/";
  return Object.entries(FACTION_ICON_MAP).map(([faction, iconFile]) => {
    const bgFile = iconFile.replace(/\.png$/, ".jpg");
    return `
        <div class="faction-card" data-faction="${faction}" style="background-image: url('${base}${bgFile}');">
          <img class="faction-icon" src="${base}${iconFile}" alt="${faction}" loading="lazy" decoding="async">
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

// Значки характеристик на полной карточке модели.
// ВАЖНО: вынесены отдельно от ICON_MAP и берутся из /img/ (а не /img/ico/),
// чтобы смена источника этих значков не задевала встраиваемые иконки текстов
// ({...}-токены в трейтах, компендиуме и попапах — они остаются на /img/ico/).
const STAT_ICONS = {
  Attack: "img/Attack.png",
  Defense: "img/Defense.png",
  Strength: "img/Strength.png",
  Movement: "img/Movement.png"
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
    subtitle: "Batman Miniature Game<br>Конструктор отрядов",
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
    popup_blocked: "Браузер заблокировал всплывающее окно — разрешите его для экспорта в PDF",
    charismatic_available: "ДОСТУПЕН",
    charismatic_used: "ИСПОЛЬЗОВАН",
    export_title: "Экспорт ростера в PDF",
    roster_preview: "ПРОСМОТР ОТРЯДА",
    upgrades_flap: "АПГРЕЙДЫ",
    obj_cards_title: "КАРТЫ ЦЕЛЕЙ",
    obj_deck: "Колода",
    obj_deck_general: "Общие",
    obj_deck_crew: "Банды",
    obj_deck_single: "Одиночные",
    obj_deck_rules: "Правила колоды",
    obj_deck_ok: "Колода собрана по правилам",
    obj_need_total: "В колоде должно быть ровно {count} карт",
    obj_need_crew: "Общих карт не больше, чем карт банды, и не больше {max}",
    obj_need_single: "Одиночных карт не больше {max}",
    obj_need_full_sets: "Комплекты карт добавляются целиком",
    obj_need_req: "Не выполнены требования карт",
    obj_req: "Требования",
    obj_req_model: "Модель",
    obj_req_rank: "Ранг",
    obj_req_trait: "Трейт",
    obj_req_ok: "Требование выполнено — нужная модель в отряде",
    obj_req_missing: "Нет требуемой модели/трейта в отряде",
    obj_card_full_deck: "В колоде нет места — лимит {count} карт",
    obj_single_limit: "Лимит одиночных карт: {max}",
    obj_general_limit: "Лимит общих карт: {max}",
    obj_mandatory: "Обязательные карты банды",
    obj_mandatory_hint: "Добавляются автоматически и не входят в размер колоды.",
    obj_mandatory_badge: "ОБЯЗАТЕЛЬНАЯ",
    obj_catalog: "Каталог карт",
    obj_rule_size: "Колода целей должна содержать ровно {count} карт.",
    obj_rule_general: "Общих карт (без значка Affiliation) не может быть больше, чем карт, уникальных для вашей банды, и не больше {max}.",
    obj_rule_single: "Одиночных карт может быть не больше {max}.",
    obj_rule_sets: "Карты с указанным числом копий добавляются только полным комплектом: ни больше, ни меньше.",
    obj_rule_mandatory: "Обязательные карты банды добавляются автоматически и не входят в размер колоды.",
    view_roster_title: "Просмотр отряда",
    crew_empty_preview: "Отряд пуст! Сначала добавьте модели.",
    no_available_equipment: "Нет доступного оборудования",
    henry_ducard_sidekick_requires_ras: "Henry Ducard может быть нанят как Sidekick только если лидером банды является Ra's al Ghul Decoy!",
    model_requires_other: "Модель {model} требует, чтобы в отряде была модель {required}",
    affinity_requires_model: "Модель {model} требует, чтобы в отряде была модель {target} (Affinity)",
    expendable_penguin_requires_trait: "Модель {model} может быть нанята только если в отряде есть модель с трейтом Penguin Caller или Hidden Penguins",
    william_cobb_restrict_free_agents: "Если William Cobb в отряде, Free Agent модели должны быть с аффилиацией Bane или Unknown",
    rank_label: "Ранг",
    leader_or_sidekick: "Leader или Sidekick",
    equipment_insufficient_funds: "Недостаточно Funding для этого equipment!",
    equipment_for: "Equipment для",
    equipment_available: "Доступно",
    equipment_of_total: "из",
    equipment_insufficient_short: "⚠ Недостаточно средств",
    equipment_requires: "Требует:",
    leader_no_equipment: "Leader не может покупать оборудование!",
    crew_building_rules: "Правила набора отряда",
    crew_rules_intro: "У выбранной фракции особые правила набора отряда.",
    rule_ignore_rank_requirements: "Фракция игнорирует стандартные требования к рангам.",
    rule_same_name_different_alias: "Можно включать персонажей с одинаковым именем (но разными псевдонимами).",
    rule_leader_as_boss: "Боссом отряда должен быть Leader.",
    rule_only_affiliation: "Нельзя нанимать персонажей вне аффилиации.",
    rule_boss_affiliation_or_none: "Можно нанимать только персонажей с аффилиацией Босса или без аффилиации.",
    rule_boss_affiliation_objectives: "В колоду можно добавлять только карты целей с аффилиацией Босса или без аффилиации.",
    rule_rivals_blocks_affiliation: "Наём персонажей с Rivals: {faction} запрещает наём персонажей с аффилиацией {faction} в этом отряде.",
    rule_affiliation_blocks_rivals: "Наём персонажей с аффилиацией {faction} запрещает наём персонажей с Rivals: {faction} в этом отряде.",
    rivals_exclusion_cannot_add: "Нельзя добавить: персонажи с Rivals: {faction} и персонажи с аффилиацией {faction} не могут быть в одном отряде",
    profile: "ПРОФИЛЬ",
    login: "ВОЙТИ",
    register: "РЕГИСТРАЦИЯ",
    logout: "ВЫЙТИ",
    username: "Имя пользователя",
    password: "Пароль",
    my_crews: "МОИ ОТРЯДЫ",
    models_word: "моделей",
    load: "Загрузить",
    save_crew: "Сохранить отряд",
    save_name_prompt: "Название сохранения:",
    save_done: "Отряд сохранён!",
    saves_limit: "Достигнут лимит сохранений (5). Удалите одно из существующих.",
    no_saves: "Пока нет сохранённых отрядов",
    empty_crew_save: "Отряд пуст — нечего сохранять",
    confirm_delete_save: "Удалить сохранение «{name}»?",
    models_skipped: "Часть моделей не найдена в базе и пропущена",
    auth_user_exists: "Пользователь с таким именем уже существует",
    auth_bad_credentials: "Неверное имя пользователя или пароль",
    auth_fill_fields: "Введите имя пользователя и пароль",
    auth_server_note: "Аккаунт хранится на сервере приложения: сохранения доступны с любого устройства после входа.",
    login_required: "Требуется вход в профиль",
    server_unreachable: "Сервер недоступен. Приложение должно быть открыто через свой сервер (node server.js).",
    server_error: "Ошибка сервера, попробуйте ещё раз",
    game: "ИГРА",
    game_login_note: "Для игры нужен профиль — войдите или зарегистрируйтесь.",
    create_game: "СОЗДАТЬ ИГРУ",
    create_game_hint: "Выберите ростер и получите код для оппонента.",
    join_game: "ПРИСОЕДИНИТЬСЯ",
    join_game_hint: "Введите код, полученный от оппонента, и выберите свой ростер.",
    game_code: "Код игры",
    game_code_placeholder: "КОД",
    current_crew: "Текущий отряд из билдера",
    no_rosters: "Нет доступных ростеров: соберите отряд в билдере или сохраните его в профиле.",
    share_code_hint: "Передайте этот код оппоненту — он вводит его в разделе ИГРА на своём устройстве.",
    waiting_opponent: "Ожидание оппонента...",
    leave_game: "ПОКИНУТЬ ИГРУ",
    your_roster: "ВАШ РОСТЕР",
    opponent_roster: "РОСТЕР ОППОНЕНТА",
    game_not_found: "Игра не найдена или срок её действия истёк",
    game_full: "В этой игре уже есть второй игрок",
    game_own: "Нельзя присоединиться к собственной игре",
    related_rules: "СВЯЗАННЫЕ ПРАВИЛА",
    game_conditions: "УСЛОВИЯ ИГРЫ",
    game_conditions_hint: "Событие и Столкновение выбраны случайно по правилам. Можно перебросить (🎲), выбрать вручную или прочитать условие (📖).",
    event_card: "Событие",
    encounter_card: "Столкновение",
    reroll_random: "Перебросить случайно",
    tap_to_read: "нажмите, чтобы прочитать",
    read_card: "Читать условие",
    stats: "СТАТИСТИКА",
    stats_loading: "Загрузка статистики...",
    stats_empty: "Пока нет данных — сохраните первый отряд в профиле!",
    stats_total_users: "Игроков",
    stats_total_rosters: "Сохранённых отрядов",
    stats_total_games: "Создано игр",
    stats_avg_crew: "Средний размер отряда",
    stats_top_factions: "САМЫЕ ПОПУЛЯРНЫЕ БАНДЫ",
    stats_top_models: "САМЫЕ ПОПУЛЯРНЫЕ МОДЕЛИ",
    stats_top_bosses: "САМЫЕ ПОПУЛЯРНЫЕ БОССЫ",
    stats_geography: "ГЕОГРАФИЯ ИГРОКОВ",
    stats_source_note: "По сохранённым ростерам всех игроков.",
    stats_bosses_note: "Кто чаще всего возглавляет отряды.",
    stats_geo_note: "Страна указывается в профиле.",
    your_country: "Ваша страна",
    country_not_set: "Не указана",
    country_stats_hint: "Страна учитывается в разделе СТАТИСТИКА — география игроков.",
    game_score: "СЧЁТ ПАРТИИ",
    game_score_hint: "Ведите очки побед (VP) по ходу партии — счётчики локальные на каждом устройстве.",
    game_finish_hint: "Партия окончена? Отметьте победителя — итог увидят оба игрока, а победа попадёт в рейтинг статистики.",
    game_result: "РЕЗУЛЬТАТ ПАРТИИ",
    confirm_winner: "Записать победу за {name}?",
    change_result: "Изменить результат",
    stats_total_results: "Сыграно партий",
    stats_total_tournaments: "Турниров",
    stats_win_rating: "РЕЙТИНГ ПОБЕД",
    stats_wins_note: "Лидеры по числу выигранных партий (итоги из раздела ИГРА).",
    stats_tournament_geo: "ГДЕ ИГРАЮТ ТУРНИРЫ",
    stats_tournament_geo_note: "Адреса мероприятий из раздела ТУРНИРЫ.",
    tournaments: "ТУРНИРЫ",
    tn_login_note: "Для турниров нужен профиль — войдите или зарегистрируйтесь.",
    tn_role_player: "УЧАСТНИК",
    tn_role_player_hint: "Регистрация на турнир и подача двух ростеров по правилам Batmatch.",
    tn_role_organizer: "ОРГАНИЗАТОР",
    tn_role_organizer_hint: "Создание мероприятия: адрес, даты, лимит участников и резерв.",
    tn_change_role: "Выбор роли",
    tn_create_title: "НОВЫЙ ТУРНИР",
    tn_create_hint: "Адрес мероприятия попадает в статистику «Где играют турниры».",
    tn_address_ph: "Адрес мероприятия (город, клуб, улица)",
    tn_date_start: "Начало",
    tn_date_end: "Конец (необязательно)",
    tn_max_players: "Участников",
    tn_reserve: "Резерв",
    tn_org_nick_ph: "Ник организатора",
    tn_info_ph: "Другая информация: формат, взнос, призы, контакты...",
    tn_create_btn: "СОЗДАТЬ ТУРНИР",
    tn_created: "Турнир создан!",
    tn_fill_fields: "Заполните адрес, дату начала и ник организатора",
    tn_my_tournaments: "МОИ ТУРНИРЫ",
    tn_no_own: "У вас пока нет созданных турниров",
    tn_confirm_delete: "Удалить турнир вместе со списком участников?",
    tn_delete: "Удалить",
    tn_no_tournaments: "Пока нет объявленных турниров",
    tn_slots: "Места",
    tn_you: "вы",
    tn_reserve_badge: "РЕЗЕРВ",
    tn_rosters_ok: "ростеры поданы",
    tn_rosters_wait: "нет ростеров",
    tn_rosters_missing: "не подан",
    tn_join: "ЗАРЕГИСТРИРОВАТЬСЯ",
    tn_full: "МЕСТ НЕТ",
    tn_leave: "Покинуть",
    tn_confirm_leave: "Отменить участие в турнире?",
    tn_submit_rosters: "Ростеры",
    tn_rosters_title: "ТУРНИРНЫЕ РОСТЕРЫ",
    tn_rules_hint: "Правила Batmatch: 2 листа одной банды, каждый до {rep} Rep / ${funding}; колода целей — {cards} карт; к каждому листу — {dep} деплоя и {ev} ивента (деплои и ивенты в билдере не хранятся — укажите их в заметках).",
    tn_list: "Лист",
    tn_cards_word: "карт",
    tn_rule_two_lists: "Два разных листа",
    tn_rule_same_faction: "Оба листа — одна банда",
    tn_no_saves: "Нет сохранённых ростеров — соберите отряды в билдере и сохраните их в профиле.",
    tn_pick_both: "Выберите оба листа",
    tn_confirm_illegal: "Ростеры не полностью соответствуют турнирным правилам (см. чек-лист). Подать всё равно?",
    tn_notes_ph: "Недостающее и примечания: деплои, ивенты, прокси и т.п.",
    tn_notes_label: "Заметки",
    tn_submit: "ПОДАТЬ РОСТЕРЫ",
    tn_submitted: "Ростеры поданы!",
    tn_already_joined: "Вы уже зарегистрированы на этот турнир",
    tn_full_msg: "Все места заняты (включая резервные)",
    tn_limit_msg: "Достигнут лимит открытых турниров у организатора (5)",
    tn_status_open: "РЕГИСТРАЦИЯ",
    tn_status_active: "ИДЁТ ТУР {round}",
    tn_status_finished: "ЗАВЕРШЁН",
    tn_start: "НАЧАТЬ ТУРНИР",
    tn_next_round: "СЛЕДУЮЩИЙ ТУР",
    tn_finish: "ЗАВЕРШИТЬ ТУРНИР",
    tn_confirm_start: "Начать турнир? Регистрация закроется, будут сформированы пары 1-го тура.",
    tn_confirm_next: "Сформировать пары следующего тура по текущей таблице?",
    tn_confirm_finish: "Завершить турнир? Победитель определится по таблице.",
    tn_round_pairs: "ПАРЫ ТУРА {round}",
    tn_bye: "пропуск тура (бай)",
    tn_standings: "ТАБЛИЦА ТУРНИРА",
    tn_your_result: "ВАШ РЕЗУЛЬТАТ ТУРА {round}",
    tn_report_hint: "Запишите итог своей партии: таблица и пары следующего тура строятся по этим результатам.",
    tn_result_win: "ПОБЕДА",
    tn_result_loss: "ПОРАЖЕНИЕ",
    tn_result_recorded: "Ваш результат: {res} • {vp} VP",
    tn_change: "Изменить",
    tn_vp_label: "Очки (VP)",
    tn_winner: "ПОБЕДИТЕЛЬ ТУРНИРА",
    tn_kick: "Убрать участника {name} из турнира?",
    tn_kick_title: "Убрать участника",
    tn_started_msg: "Турнир уже начался — регистрация и выход закрыты",
    tn_need_players: "Для старта нужно минимум 2 участника",
    tn_finished_title: "ЗАВЕРШЁННЫЕ ТУРНИРЫ",
    tn_lock_label: "Блок ростеров (дней)",
    tn_lock_help: "За сколько дней до начала турнира закрывается подача и изменение ростеров (0 — не закрывается до самого начала).",
    tn_lock_meta: "ростеры закрываются за {days} дн. до начала",
    tn_rosters_closed: "приём ростеров закрыт",
    tn_locked_msg: "Изменение ростеров закрыто — до начала турнира осталось меньше установленного организатором срока",
    footer_opensource: "Проект с открытым исходным кодом",
    forgot_password_link: "Забыли пароль?",
    forgot_request_hint: "Введите имя пользователя — на почту, привязанную к аккаунту, придёт код для сброса пароля.",
    forgot_send_code: "ОТПРАВИТЬ КОД",
    forgot_code_hint: "Код отправлен на почту аккаунта «{name}». Введите его и новый пароль.",
    forgot_code_placeholder: "Код из письма",
    forgot_new_password: "Новый пароль",
    forgot_reset_btn: "СБРОСИТЬ ПАРОЛЬ",
    forgot_code_sent: "Код отправлен на почту, привязанную к аккаунту.",
    forgot_reset_done: "Пароль изменён! Теперь можно войти с новым паролем.",
    email_placeholder: "Email (для восстановления пароля)",
    email_placeholder_optional: "Email (необязательно)",
    register_email_hint: "Email нужен только для восстановления забытого пароля и не обязателен — его можно указать позже в профиле.",
    email_save_btn: "Сохранить",
    email_hint: "Нужен только для восстановления забытого пароля. Не публикуется и не виден другим игрокам.",
    email_saved: "Email сохранён",
    change_password_title: "СМЕНА ПАРОЛЯ",
    current_password: "Текущий пароль",
    new_password: "Новый пароль",
    confirm_password: "Повторите новый пароль",
    change_password_btn: "ИЗМЕНИТЬ ПАРОЛЬ",
    password_mismatch: "Новые пароли не совпадают",
    password_changed: "Пароль изменён",
    reset_user_notfound: "Пользователь с таким именем не найден",
    reset_no_email: "У аккаунта не указан email — восстановление недоступно. Войдите и укажите email в профиле.",
    reset_rate_limited: "Код уже отправлен — подождите минуту перед повторной отправкой",
    reset_mail_failed: "Не удалось отправить письмо. Попробуйте позже или обратитесь к администратору",
    reset_code_expired: "Код истёк или не запрошен — запросите новый",
    reset_bad_code: "Неверный код",
    stats_top_players: "ЛУЧШИЕ ИГРОКИ",
    stats_top_players_note: "Победители турниров; флаг — страна игрока из профиля.",
    game_round: "РАУНД",
    game_next_round: "НОВЫЙ РАУНД",
    game_confirm_next_round: "Начать новый раунд? Отметки активации (ACT) и Audacity (AUD) будут сняты, пасс-маркеры сброшены, статусы «до конца раунда» удалены.",
    game_initiative: "Инициатива",
    game_pass_markers: "Пасс-маркеры",
    game_status_add: "статус",
    game_kd_title: "Knocked Down — модель сбита с ног",
    game_ko_title: "Knocked Out — модель без сознания",
    game_act_title: "Активирована в этом раунде",
    game_aud_title: "Audacity — три действия в этом раунде"
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
    subtitle: "Batman Miniature Game<br>Crew Builder",
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
    popup_blocked: "The browser blocked the pop-up window — allow it to export to PDF",
    charismatic_available: "AVAILABLE",
    charismatic_used: "USED",
    export_title: "Export roster to PDF",
    roster_preview: "ROSTER PREVIEW",
    upgrades_flap: "UPGRADES",
    obj_cards_title: "OBJECTIVE CARDS",
    obj_deck: "Deck",
    obj_deck_general: "General",
    obj_deck_crew: "Crew",
    obj_deck_single: "Single",
    obj_deck_rules: "Deck rules",
    obj_deck_ok: "Deck is legal",
    obj_need_total: "The deck must contain exactly {count} cards",
    obj_need_crew: "General cards cannot outnumber crew cards (max {max})",
    obj_need_single: "No more than {max} single cards",
    obj_need_full_sets: "Card sets must be complete",
    obj_need_req: "Card requirements are not met",
    obj_req: "Requirements",
    obj_req_model: "Model",
    obj_req_rank: "Rank",
    obj_req_trait: "Trait",
    obj_req_ok: "Requirement met — the model is in the crew",
    obj_req_missing: "Required model/trait is not in the crew",
    obj_card_full_deck: "No room in the deck — {count} cards limit",
    obj_single_limit: "Single cards limit: {max}",
    obj_general_limit: "General cards limit: {max}",
    obj_mandatory: "Mandatory crew cards",
    obj_mandatory_hint: "Added automatically; they do not count towards the deck size.",
    obj_mandatory_badge: "MANDATORY",
    obj_catalog: "Card catalog",
    obj_rule_size: "The Objective deck must contain exactly {count} cards.",
    obj_rule_general: "General cards (no Affiliation icon) cannot outnumber cards unique to your crew, and no more than {max}.",
    obj_rule_single: "No more than {max} cards can be single cards.",
    obj_rule_sets: "Cards with a printed number of copies must be included as that full set: no more and no less.",
    obj_rule_mandatory: "Mandatory crew cards are added automatically and do not count towards the deck size.",
    view_roster_title: "View roster",
    crew_empty_preview: "Crew is empty! Add models first.",
    no_available_equipment: "No available equipment",
    henry_ducard_sidekick_requires_ras: "Henry Ducard can only be recruited as Sidekick if Ra's al Ghul Decoy is the crew leader!",
    model_requires_other: "Model {model} requires {required} model in the crew",
    affinity_requires_model: "Model {model} requires {target} model in the crew (Affinity)",
    expendable_penguin_requires_trait: "Model {model} can only be recruited if the crew includes a model with Penguin Caller or Hidden Penguins trait",
    william_cobb_restrict_free_agents: "If William Cobb is in the crew, Free Agent models must have Bane or Unknown affiliation",
    rank_label: "Rank",
    leader_or_sidekick: "Leader or Sidekick",
    equipment_insufficient_funds: "Insufficient Funding for this equipment!",
    equipment_for: "Equipment for",
    equipment_available: "Available",
    equipment_of_total: "of",
    equipment_insufficient_short: "⚠ Insufficient funds",
    equipment_requires: "Requires:",
    leader_no_equipment: "Leader cannot purchase equipment!",
    crew_building_rules: "Crew Building Rules",
    crew_rules_intro: "Your selected affiliation has unique crew building rules.",
    rule_ignore_rank_requirements: "This affiliation ignores standard rank requirements.",
    rule_same_name_different_alias: "This affiliation can include characters with the same name (but different alias).",
    rule_leader_as_boss: "This affiliation must select a Leader as a Boss.",
    rule_only_affiliation: "This affiliation cannot hire characters that are not in the Affiliation.",
    rule_boss_affiliation_or_none: "This affiliation can only hire characters that share the chosen Boss Affiliation Keyword, or that have no Affiliation Keywords.",
    rule_boss_affiliation_objectives: "This affiliation can only add objective cards that share the chosen Boss Affiliation Keyword, or that have no Affiliation Keywords.",
    rule_rivals_blocks_affiliation: "When creating a crew with this affiliation, hiring characters with Rivals: {faction} will prevent hiring characters with Affiliation: {faction} in the same crew.",
    rule_affiliation_blocks_rivals: "When creating a crew with this affiliation, hiring characters with Affiliation: {faction} will prevent hiring characters with Rivals: {faction} in the same crew.",
    rivals_exclusion_cannot_add: "Cannot add: characters with Rivals: {faction} and characters with Affiliation: {faction} cannot be in the same crew",
    profile: "PROFILE",
    login: "LOG IN",
    register: "REGISTER",
    logout: "LOG OUT",
    username: "Username",
    password: "Password",
    my_crews: "MY CREWS",
    models_word: "models",
    load: "Load",
    save_crew: "Save crew",
    save_name_prompt: "Save name:",
    save_done: "Crew saved!",
    saves_limit: "Save limit reached (5). Delete an existing save first.",
    no_saves: "No saved crews yet",
    empty_crew_save: "Crew is empty — nothing to save",
    confirm_delete_save: "Delete save \"{name}\"?",
    models_skipped: "Some models were not found in the database and were skipped",
    auth_user_exists: "A user with this name already exists",
    auth_bad_credentials: "Wrong username or password",
    auth_fill_fields: "Enter username and password",
    auth_server_note: "Your account is stored on the app server: saves are available from any device after logging in.",
    login_required: "Login required",
    server_unreachable: "Server unreachable. The app must be opened through its own server (node server.js).",
    server_error: "Server error, please try again",
    game: "GAME",
    game_login_note: "A profile is required to play — log in or register.",
    create_game: "CREATE GAME",
    create_game_hint: "Choose a roster and get a code for your opponent.",
    join_game: "JOIN GAME",
    join_game_hint: "Enter the code from your opponent and choose your roster.",
    game_code: "Game code",
    game_code_placeholder: "CODE",
    current_crew: "Current crew from the builder",
    no_rosters: "No rosters available: build a crew in the builder or save one to your profile.",
    share_code_hint: "Share this code with your opponent — they enter it in the GAME section on their device.",
    waiting_opponent: "Waiting for opponent...",
    leave_game: "LEAVE GAME",
    your_roster: "YOUR ROSTER",
    opponent_roster: "OPPONENT'S ROSTER",
    game_not_found: "Game not found or expired",
    game_full: "This game already has a second player",
    game_own: "You can't join your own game",
    related_rules: "RELATED RULES",
    game_conditions: "GAME CONDITIONS",
    game_conditions_hint: "The Event and the Encounter are picked randomly as per the rules. You can reroll (🎲), pick manually, or read the card (📖).",
    event_card: "Event",
    encounter_card: "Encounter",
    reroll_random: "Reroll randomly",
    tap_to_read: "tap to read",
    read_card: "Read the card",
    stats: "STATISTICS",
    stats_loading: "Loading statistics...",
    stats_empty: "No data yet — save your first crew in the profile!",
    stats_total_users: "Players",
    stats_total_rosters: "Saved crews",
    stats_total_games: "Games created",
    stats_avg_crew: "Average crew size",
    stats_top_factions: "MOST POPULAR CREWS",
    stats_top_models: "MOST POPULAR MODELS",
    stats_top_bosses: "MOST POPULAR BOSSES",
    stats_geography: "PLAYER GEOGRAPHY",
    stats_source_note: "Based on all players' saved rosters.",
    stats_bosses_note: "Who leads crews most often.",
    stats_geo_note: "Set your country in the profile.",
    your_country: "Your country",
    country_not_set: "Not set",
    country_stats_hint: "Your country is counted in the STATISTICS section — player geography.",
    game_score: "GAME SCORE",
    game_score_hint: "Track victory points (VP) during the game — counters are local to each device.",
    game_finish_hint: "Game over? Mark the winner — both players will see the result, and the win goes to the statistics rating.",
    game_result: "GAME RESULT",
    confirm_winner: "Record the win for {name}?",
    change_result: "Change result",
    stats_total_results: "Games finished",
    stats_total_tournaments: "Tournaments",
    stats_win_rating: "WIN RATING",
    stats_wins_note: "Leaders by number of games won (results from the GAME section).",
    stats_tournament_geo: "WHERE TOURNAMENTS ARE PLAYED",
    stats_tournament_geo_note: "Event addresses from the TOURNAMENTS section.",
    tournaments: "TOURNAMENTS",
    tn_login_note: "A profile is required for tournaments — log in or register.",
    tn_role_player: "PLAYER",
    tn_role_player_hint: "Register for a tournament and submit two rosters per Batmatch rules.",
    tn_role_organizer: "ORGANIZER",
    tn_role_organizer_hint: "Create an event: address, dates, player limit and reserve slots.",
    tn_change_role: "Choose role",
    tn_create_title: "NEW TOURNAMENT",
    tn_create_hint: "The event address feeds the “Where tournaments are played” statistics.",
    tn_address_ph: "Event address (city, club, street)",
    tn_date_start: "Starts",
    tn_date_end: "Ends (optional)",
    tn_max_players: "Players",
    tn_reserve: "Reserve",
    tn_org_nick_ph: "Organizer nickname",
    tn_info_ph: "Other info: format, entry fee, prizes, contacts...",
    tn_create_btn: "CREATE TOURNAMENT",
    tn_created: "Tournament created!",
    tn_fill_fields: "Fill in the address, start date and organizer nickname",
    tn_my_tournaments: "MY TOURNAMENTS",
    tn_no_own: "You haven't created any tournaments yet",
    tn_confirm_delete: "Delete the tournament along with its player list?",
    tn_delete: "Delete",
    tn_no_tournaments: "No tournaments announced yet",
    tn_slots: "Slots",
    tn_you: "you",
    tn_reserve_badge: "RESERVE",
    tn_rosters_ok: "rosters submitted",
    tn_rosters_wait: "no rosters",
    tn_rosters_missing: "not submitted",
    tn_join: "REGISTER",
    tn_full: "NO SLOTS LEFT",
    tn_leave: "Leave",
    tn_confirm_leave: "Cancel your tournament registration?",
    tn_submit_rosters: "Rosters",
    tn_rosters_title: "TOURNAMENT ROSTERS",
    tn_rules_hint: "Batmatch rules: 2 lists of the same crew, each up to {rep} Rep / ${funding}; objective deck — {cards} cards; {dep} deployments and {ev} events per list (deployments and events are not stored in the builder — list them in the notes).",
    tn_list: "List",
    tn_cards_word: "cards",
    tn_rule_two_lists: "Two different lists",
    tn_rule_same_faction: "Both lists — same crew",
    tn_no_saves: "No saved rosters — build crews in the builder and save them to your profile.",
    tn_pick_both: "Pick both lists",
    tn_confirm_illegal: "The rosters don't fully match the tournament rules (see the checklist). Submit anyway?",
    tn_notes_ph: "Missing items and notes: deployments, events, proxies, etc.",
    tn_notes_label: "Notes",
    tn_submit: "SUBMIT ROSTERS",
    tn_submitted: "Rosters submitted!",
    tn_already_joined: "You are already registered for this tournament",
    tn_full_msg: "All slots are taken (including reserve)",
    tn_limit_msg: "Organizer's open tournament limit reached (5)",
    tn_status_open: "REGISTRATION",
    tn_status_active: "ROUND {round} IN PROGRESS",
    tn_status_finished: "FINISHED",
    tn_start: "START TOURNAMENT",
    tn_next_round: "NEXT ROUND",
    tn_finish: "FINISH TOURNAMENT",
    tn_confirm_start: "Start the tournament? Registration will close and round 1 pairings will be generated.",
    tn_confirm_next: "Generate next round pairings from the current standings?",
    tn_confirm_finish: "Finish the tournament? The winner is decided by the standings.",
    tn_round_pairs: "ROUND {round} PAIRINGS",
    tn_bye: "bye (skips the round)",
    tn_standings: "TOURNAMENT STANDINGS",
    tn_your_result: "YOUR ROUND {round} RESULT",
    tn_report_hint: "Record your game result: the standings and next round pairings are built from these reports.",
    tn_result_win: "VICTORY",
    tn_result_loss: "DEFEAT",
    tn_result_recorded: "Your result: {res} • {vp} VP",
    tn_change: "Change",
    tn_vp_label: "Victory points",
    tn_winner: "TOURNAMENT WINNER",
    tn_kick: "Remove player {name} from the tournament?",
    tn_kick_title: "Remove player",
    tn_started_msg: "The tournament has already started — registration and leaving are closed",
    tn_need_players: "At least 2 players are required to start",
    tn_finished_title: "FINISHED TOURNAMENTS",
    tn_lock_label: "Roster lock (days)",
    tn_lock_help: "How many days before the tournament start roster submission and changes are closed (0 — open until the start).",
    tn_lock_meta: "rosters lock {days} days before the start",
    tn_rosters_closed: "roster submission closed",
    tn_locked_msg: "Roster changes are closed — the organizer's deadline before the tournament has passed",
    footer_opensource: "Open source project",
    forgot_password_link: "Forgot password?",
    forgot_request_hint: "Enter your username — a reset code will be sent to the email on file for this account.",
    forgot_send_code: "SEND CODE",
    forgot_code_hint: "A code was sent to the email for account \"{name}\". Enter it along with a new password.",
    forgot_code_placeholder: "Code from the email",
    forgot_new_password: "New password",
    forgot_reset_btn: "RESET PASSWORD",
    forgot_code_sent: "The code was sent to the email on file for this account.",
    forgot_reset_done: "Password changed! You can now log in with the new password.",
    email_placeholder: "Email (for password recovery)",
    email_placeholder_optional: "Email (optional)",
    register_email_hint: "Email is only used to recover a forgotten password and is not required — you can add it later in your profile.",
    email_save_btn: "Save",
    email_hint: "Only used to recover a forgotten password. Not published or visible to other players.",
    email_saved: "Email saved",
    change_password_title: "CHANGE PASSWORD",
    current_password: "Current password",
    new_password: "New password",
    confirm_password: "Confirm new password",
    change_password_btn: "CHANGE PASSWORD",
    password_mismatch: "The new passwords don't match",
    password_changed: "Password changed",
    reset_user_notfound: "No user found with this name",
    reset_no_email: "No email on file for this account — recovery unavailable. Log in and add an email in your profile.",
    reset_rate_limited: "A code was already sent — wait a minute before requesting another",
    reset_mail_failed: "Failed to send the email. Try again later or contact the administrator",
    reset_code_expired: "The code expired or wasn't requested — request a new one",
    reset_bad_code: "Incorrect code",
    stats_top_players: "TOP PLAYERS",
    stats_top_players_note: "Tournament winners; the flag is the player's profile country.",
    game_round: "ROUND",
    game_next_round: "NEW ROUND",
    game_confirm_next_round: "Start a new round? Activated (ACT) and Audacity (AUD) marks will be cleared, Pass markers reset, and end-of-round statuses removed.",
    game_initiative: "Initiative",
    game_pass_markers: "Pass markers",
    game_status_add: "status",
    game_kd_title: "Knocked Down",
    game_ko_title: "Knocked Out",
    game_act_title: "Activated this round",
    game_aud_title: "Audacity — three actions this round"
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

  // Динамические разделы (профиль, игра) рендерятся из JS — перерисовываем их,
  // чтобы перевод применялся сразу, а не после закрытия/открытия
  if (typeof renderAuthModal === 'function') renderAuthModal();
  if (typeof renderGame === 'function' && currentMode === 'game') renderGame();
  if (typeof renderStats === 'function' && currentMode === 'stats') renderStats();
  if (typeof renderTournaments === 'function' && currentMode === 'tournaments') renderTournaments();
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
  if ($('gameSection')) $('gameSection').style.display = 'none';
  if ($('statsSection')) $('statsSection').style.display = 'none';
  if ($('tournamentsSection')) $('tournamentsSection').style.display = 'none';
  $('compendiumModal').classList.remove('active');

  // Сбрасываем фракцию и показываем вкладки
  currentFaction = null;
  $('modelsGridCards').innerHTML = '';
  $('cardsTabsContainer').classList.remove('hidden');
  if ($('cardsMissionsBtn')) $('cardsMissionsBtn').style.display = 'none'; // до выбора фракции
  if ($('cardsMissionsPage')) { $('cardsMissionsPage').style.display = 'none'; $('cardsMain').style.display = 'block'; }
  closeBuilderCardPanel();
  initTabs();
}

function showBuilder() {
  currentMode = 'builder';
  $('mainMenu').style.display = 'none';
  $('cardsSection').style.display = 'none';
  if ($('gameSection')) $('gameSection').style.display = 'none';
  if ($('statsSection')) $('statsSection').style.display = 'none';
  if ($('tournamentsSection')) $('tournamentsSection').style.display = 'none';
  $('builderSection').style.display = 'block';
  $('factionSelect').style.display = 'block';
  $('builderMain').style.display = 'none';
  if ($('builderCardsPage')) $('builderCardsPage').style.display = 'none';
  $('compendiumModal').classList.remove('active');
  $('builderFactionCards').classList.remove('hidden'); // Показываем вкладки фракций
  initTabs(); // Инициализация табов для выбора фракции
}

function showRules() {
  // Отдельная вики-страница с правилами игры (конспект рулбука)
  window.location.href = 'rules.html';
}

function backToMenu() {
  currentMode = 'menu';
  $('mainMenu').style.display = 'flex';
  $('cardsSection').style.display = 'none';
  $('builderSection').style.display = 'none';
  if ($('rosterPreviewSection')) $('rosterPreviewSection').style.display = 'none';
  if ($('gameSection')) $('gameSection').style.display = 'none';
  if ($('statsSection')) $('statsSection').style.display = 'none';
  if ($('tournamentsSection')) $('tournamentsSection').style.display = 'none';
  if (typeof stopGamePolling === 'function') stopGamePolling();
  if (typeof stopTnPolling === 'function') stopTnPolling();
  $('compendiumModal').classList.remove('active');
  $('modelSearchModal').classList.remove('active');
  closeBuilderCardPanel();
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
  if ($('builderCardsPage')) $('builderCardsPage').style.display = 'none';
  $('builderFactionCards').classList.remove('hidden'); // Показываем вкладки фракций
  closeBuilderCardPanel();
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
// Тексты особых правил набора отряда выбранной фракции (официальные Crew Building Rules)
function getFactionRulesLines(faction) {
  const rules = factionCrewRules[faction];
  if (!rules) return [];
  const lines = [];
  if (rules.ignoreStandardRankRequirements) lines.push(t("rule_ignore_rank_requirements"));
  if (rules.allowSameNameDifferentAlias) lines.push(t("rule_same_name_different_alias"));
  if (rules.mustHaveLeaderAsBoss) lines.push(t("rule_leader_as_boss"));
  if (rules.onlyAffiliationMembers) lines.push(t("rule_only_affiliation"));
  if (rules.onlyBossAffiliationOrNoAffiliation) lines.push(t("rule_boss_affiliation_or_none"));
  if (rules.onlyBossAffiliationObjectives) lines.push(t("rule_boss_affiliation_objectives"));
  if (rules.rivalsExclusion) {
    lines.push(t("rule_rivals_blocks_affiliation", { faction: rules.rivalsExclusion }));
    lines.push(t("rule_affiliation_blocks_rivals", { faction: rules.rivalsExclusion }));
  }
  return lines;
}

function showFactionRules() {
  const lines = getFactionRulesLines(currentFaction);
  if (!lines.length) return;
  const body = t("crew_rules_intro") + "<br><br>" + lines.map(l => "• " + l).join("<br><br>");
  showTraitPopup(t("crew_building_rules"), body);
}

function selectFaction(faction) {
  currentFaction = faction;
  $('factionSelect').style.display = 'none';
  $('builderFactionCards').classList.add('hidden'); // Скрываем вкладки фракций
  $('builderMain').style.display = 'block';
  // Кнопка с правилами набора — видна только если у фракции есть особые правила
  $('factionRulesBtn').style.display = getFactionRulesLines(faction).length ? 'flex' : 'none';
  renderMiniCardsBuilder();
  updateCrewBar();
  if (typeof updateDeckBadge === 'function') updateDeckBadge();
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
      // "Never Do It For Free" (Joker Dark Knight Rises): не требует Boss.
      if (t === "Never Do It For Free") mods.extraFunding += 400;

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
  `<img src="img/${rank}.png" alt="${rank}" class="rank-icon" onerror="this.src='img/no.png'">`
).join('');

// Общая разметка мини-карточки для разделов "Карточки" и "Билдер":
// фото слева, справа построчно — имя, ранг текстом, Rep/Funding, купленное снаряжение.
// showButtons включает кнопку добавить/удалить в правом верхнем углу (только билдер).
function renderMiniCardHTML(item, showButtons, showStats) {
  const ranks = getRanks(item);
  const rankText = ranks.length ? ranks.join(' / ') : '—';

  // Основные характеристики модели прямо в мини-карточке — только в просмотре
  // ростера (showStats), чтобы карточку можно было не открывать
  const s = item.stats;
  const statChip = key => `<span class="rp-stat"><img src="${STAT_ICONS[key]}" alt="${key}">${s[key] || '-'}</span>`;
  const statsHTML = showStats && s ? `
    <div class="rp-stats">
      ${statChip('Movement')}${statChip('Attack')}${statChip('Defense')}${statChip('Strength')}
      <span class="rp-stat rp-stat-wil">WIL ${s.Willpower || '-'}</span>
      <span class="rp-stat rp-stat-end">END ${s.Endurance || '-'}</span>
    </div>` : '';

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

  return `
${showButtons ? `<div class="mini-card-corner">${cornerHTML}</div>` : ''}
<div class="mini-photo-wrap">
  <img src="${item.img}" loading="lazy" decoding="async" onerror="this.src='img/no.png'">
  ${item.inCrew && BMG_BOSS && BMG_BOSS.name === item.name ? '<span class="boss-crown">👑</span>' : ''}
</div>
<div class="mini-right-col">
  <div class="mini-name">${item.name}</div>
  <div class="mini-rank-text">${rankText}</div>
  <div class="mini-rep">${item.rep} Rep • $${item.inCrew ? getEffectiveModelFunding(item.instance) : (item.funding || 0)}</div>
  ${statsHTML}
</div>
`;
}

// Жёлтая панель апгрейдов, «выглядывающая» из-под карточки модели: все
// купленные апгрейды и управление ими (просмотр, удаление, докупка).
// Панель есть у КАЖДОЙ модели отряда — и в билдере, и в просмотре ростера.
function renderUpgradeFlapHTML(item, equipment) {
  const safeName = item.name.replace(/'/g, "\\'");
  const chips = equipment.map(eq => {
    const safeEq = eq.name.replace(/'/g, "\\'");
    return `
    <span class="flap-chip" onclick="event.stopPropagation(); showEquipmentInfo('${safeName}', '${safeEq}')">
      <span class="flap-chip-name">${eq.name}</span>
      ${eq.fundingCost ? `<b>$${eq.fundingCost}</b>` : ''}${eq.repCost ? `<b>+${eq.repCost}R</b>` : ''}
      <span class="flap-chip-remove" onclick="event.stopPropagation(); removeEquipmentFromModel('${safeName}', '${safeEq}')">×</span>
    </span>`;
  }).join('');
  return `
    <span class="flap-title">${t('upgrades_flap')}</span>
    ${chips}
    <button class="flap-add" title="Equipment" onclick="event.stopPropagation(); openEquipmentMenu(models[${item._id}], this.closest('.mini-card-wrap'))">+</button>`;
}

// Обёртка «карточка + панель апгрейдов снизу» — общая для билдера и просмотра ростера
function wrapCardWithUpgrades(cardDiv, item) {
  const wrap = document.createElement("div");
  wrap.className = "mini-card-wrap";
  wrap.appendChild(cardDiv);
  const flap = document.createElement("div");
  flap.className = "mini-upgrades-flap";
  flap.innerHTML = renderUpgradeFlapHTML(item, (item.instance && item.instance.equipment) || []);
  wrap.appendChild(flap);
  return wrap;
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

  // Фракции с правилом "нельзя нанимать вне аффилиации" (Court of Owls, Suicide Squad,
  // Batman Who Laughs): скрываем модели, не входящие в саму фракцию (обход через Unknown не работает)
  {
    const factionRules = factionCrewRules[currentFaction] || {};
    if (factionRules.onlyAffiliationMembers) {
      filteredModels = filteredModels.filter(m => getFactions(m).includes(currentFaction));
    }

    // Взаимоисключение Rivals/Affiliation (Birds of Prey ↔ GCPD): скрываем модели,
    // конфликтующие с уже нанятыми по этому правилу
    if (factionRules.rivalsExclusion) {
      const rx = factionRules.rivalsExclusion;
      const crewHasRival = crew.some(m => getRivals(m).includes(rx));
      const crewHasAff = crew.some(m => getFactions(m).includes(rx));
      filteredModels = filteredModels.filter(m => {
        if (crewHasAff && getRivals(m).includes(rx)) return false;
        if (crewHasRival && getFactions(m).includes(rx)) return false;
        return true;
      });
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

  // Скрываем модели, у которых заполнены слоты ВСЕХ доступных им рангов —
  // как это делалось для Leader (см. hasFreeRankSlot)
  filteredModels = filteredModels.filter(hasFreeRankSlot);

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
    // У каждой модели отряда — жёлтая панель апгрейдов под карточкой
    fragment.appendChild(item.inCrew ? wrapCardWithUpgrades(div, item) : div);
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

// HTML глоссария (расшифровка трейтов модели и правил её оружия)
function buildGlossaryHTML(model) {
  const traitNames = model.traits || [];
  const weaponTraitNames = [...new Set(
    (model.weapons || [])
      .filter(w => w && w.traits)
      .flatMap(w => w.traits.split('/').map(t => t.trim()).filter(Boolean))
  )];
  return renderGlossarySection('TRAITS', traitNames) + renderGlossarySection('WEAPON RULES', weaponTraitNames);
}

function renderFullCardSidebar(model) {
  const sidebarEl = $('fullCardSidebar');
  if (!sidebarEl) return;
  const html = buildGlossaryHTML(model);
  sidebarEl.innerHTML = html || `<div class="sidebar-empty">${t("nothing_found")}</div>`;
}

// Сборка HTML полной карточки модели (общая для полноэкранного показа и боковой панели билдера)
const buildFullCardHTML = model => {
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
        return `<img src="img/menu/${file}" alt="${f}" class="faction-icon-small">`;
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
            ${w.rof && w.rof !== "-" ? `<span class="official-weapon-rof">${w.rof}<img src="img/rof.png" class="stat-icon"></span>` : ""}
            ${w.ammo && w.ammo !== "-" ? `<span class="official-weapon-ammo">${w.ammo}<img src="img/ammo.png" class="stat-icon"></span>` : ""}
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
  return `
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
          <img src="${model.img}" class="official-img" decoding="async" onerror="this.src='img/no.png'">
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
            <div class="stat-badge stat-small stat-yellow"><img class="stat-badge-icon" src="${STAT_ICONS.Attack}"><span class="stat-num">${model.stats.Attack || "-"}</span></div>
            <div class="stat-badge stat-small stat-black"><img class="stat-badge-icon" src="${STAT_ICONS.Defense}"><span class="stat-num">${model.stats.Defense || "-"}</span></div>
            <div class="stat-badge stat-small stat-yellow"><img class="stat-badge-icon" src="${STAT_ICONS.Strength}"><span class="stat-num">${model.stats.Strength || "-"}</span></div>
            <div class="stat-badge stat-small stat-black"><img class="stat-badge-icon" src="${STAT_ICONS.Movement}"><span class="stat-num">${model.stats.Movement || "-"}</span></div>
          </div>
        </div>
      </div>

      ${model.weapons?.length ? `<div class="official-section"><div class="official-section-title">WEAPONS</div>${weaponsHTML}</div>` : ""}
      ${traitsHTML}
      ${equipmentHTML}
    </div>`;
};

// ======================== ПОКАЗ КАРТОЧКИ ========================
// В билдере и в разделе "Карточки" на широких экранах (ПК/планшет) карточка
// открывается в боковой панели справа от списка моделей, а не на весь экран.
// Медиа-условие должно совпадать с @media для .builder-card-panel в style.css.
const BUILDER_PANEL_MEDIA = '(min-width: 768px)';
let sidePanelModel = null; // модель, открытая сейчас в боковой панели

// Панель текущего раздела или null, если нужен полноэкранный показ
function getActiveSidePanel() {
  if (!window.matchMedia(BUILDER_PANEL_MEDIA).matches) return null;
  // из полноэкранного поиска моделей карточка открывается поверх модалки, а не в панели
  if ($('modelSearchModal').classList.contains('active')) return null;
  if (currentMode === 'builder') return $('builderCardPanel');
  if (currentMode === 'cards') return $('cardsCardPanel');
  if (currentMode === 'rosterView') return $('rosterPreviewCardPanel');
  return null;
}

const showFullCard = model => {
  const cardHTML = buildFullCardHTML(model);
  const panel = getActiveSidePanel();

  if (panel) {
    sidePanelModel = model;
    const glossaryHTML = buildGlossaryHTML(model);
    // Карточка и глоссарий — колонками внутри .builder-panel-body:
    // на широких экранах (см. style.css) глоссарий встаёт справа от карточки
    // и скроллится независимо от неё, на узких планшетах — под ней
    panel.innerHTML = `
      <div class="close-full builder-panel-close" onclick="closeBuilderCardPanel()">X</div>
      <div class="builder-panel-body">
        <div class="builder-panel-card">${cardHTML}</div>
        ${glossaryHTML ? `<div class="builder-panel-glossary">${glossaryHTML}</div>` : ''}
      </div>`;
    panel.classList.toggle('has-glossary', !!glossaryHTML);
    panel.classList.add('active');
    // Сбрасываем прокрутку панели и обеих её колонок
    panel.scrollTop = 0;
    panel.querySelectorAll('.builder-panel-card, .builder-panel-glossary')
      .forEach(col => col.scrollTop = 0);
    return;
  }

  $("fullCardContent").innerHTML = cardHTML;
  renderFullCardSidebar(model);
  $("fullCard").classList.add("active");
};

const closeFullCard = () => $("fullCard").classList.remove("active");

// Закрывает боковые панели карточки (билдер, "Карточки" и "Просмотр отряда")
function closeBuilderCardPanel() {
  ['builderCardPanel', 'cardsCardPanel', 'rosterPreviewCardPanel'].forEach(id => {
    const panel = $(id);
    if (panel) {
      panel.classList.remove('active');
      panel.innerHTML = '';
    }
  });
  sidePanelModel = null;
}

// Перерисовать боковую панель, если в ней открыта модель с этим именем
function refreshBuilderCardPanel(modelName) {
  if (sidePanelModel && sidePanelModel.name === modelName && getActiveSidePanel()) {
    showFullCard(sidePanelModel);
  }
}

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
    <div class="comp-entry"><div class="comp-title">${replaceIcons(k)}</div><div class="comp-text">${replaceIcons((compendium[k]||"").replace(/\n/g,"<br>"))}</div></div>`).join("");
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

// ======================== СВЯЗАННЫЕ ПРАВИЛА В ПОПАПАХ ========================
// Ищет в тексте упоминания известных трейтов/правил из компендиума, чтобы показать
// их расшифровку прямо в попапе: клик по апгрейду "Model gains the X trait" сразу
// показывает и сам апгрейд, и что такое X.
let compendiumKeysByLength = null;

function findRelatedRules(text, excludeName) {
  if (!window.compendium || !text) return [];
  if (!compendiumKeysByLength) {
    compendiumKeysByLength = compendiumKeys
      .map(k => ({ key: k, clean: getCleanName(k).replace(/\s*\(.*\)\s*$/, '').trim() }))
      .filter(e => e.clean.length >= 4)
      // длинные имена раньше — чтобы "Acid Coating" находился прежде, чем "Acid"
      .sort((a, b) => b.clean.length - a.clean.length);
  }

  const plain = String(text).replace(/<[^>]*>/g, ' ').replace(/\{[^}]*\}/g, ' ');
  const exclude = getCleanName(excludeName || '').replace(/\s*\(.*\)\s*$/, '').trim().toLowerCase();
  const claimed = []; // занятые диапазоны текста — вложенные короткие имена не дублируются
  const found = [];

  for (const e of compendiumKeysByLength) {
    if (found.length >= 5) break;
    if (e.clean.toLowerCase() === exclude) continue;
    // Поиск с учётом регистра: названия правил в текстах пишутся с заглавных букв
    let idx = plain.indexOf(e.clean);
    while (idx !== -1) {
      const end = idx + e.clean.length;
      const before = plain[idx - 1] || ' ';
      const after = plain[end] || ' ';
      const isWholeWord = !/[A-Za-zА-Яа-я0-9]/.test(before) && !/[A-Za-zА-Яа-я0-9]/.test(after);
      const overlaps = claimed.some(r => idx < r[1] && end > r[0]);
      if (isWholeWord && !overlaps) {
        claimed.push([idx, end]);
        found.push(e.key);
        break;
      }
      idx = plain.indexOf(e.clean, idx + 1);
    }
  }
  return found;
}

function relatedRulesHTML(text, excludeName) {
  const names = findRelatedRules(text, excludeName);
  const items = names.map(name => {
    const desc = window.compendium[name] || getTraitDescription(name);
    if (!desc) return '';
    return `
      <div class="popup-related-entry">
        <div class="popup-related-name">${replaceIcons(name)}</div>
        <div class="popup-related-desc">${replaceIcons(desc).replace(/\n/g, '<br>')}</div>
      </div>`;
  }).join('');
  return items
    ? `<div class="popup-related"><div class="popup-related-title">${t('related_rules')}</div>${items}</div>`
    : '';
}

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
        ${relatedRulesHTML(rawText, traitName)}
      </div>
    </div>
  `;

  // Закрытие по клику на фон
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

  document.body.appendChild(overlay);
}

// Функция для показа попапа с описанием (для трейтов и equipment) - ИСПРАВЛЕННАЯ ВЕРСИЯ
// showRelated=false отключает блок "Связанные правила" (например, для попапов
// с картами Event/Encounter в разделе ИГРА — там он не к месту)
function showTraitPopup(name, desc, showRelated = true) {
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
        ${showRelated ? relatedRulesHTML(desc || '', name) : ''}
      </div>
    </div>
  `;

  // Клик вне окна — закрыть
  overlay.onclick = e => {
    if (e.target === overlay) overlay.remove();
  };

  document.body.appendChild(overlay);
}

// Инфо о купленном апгрейде по клику на чип в списке билдера:
// показывает эффекты и (через relatedRulesHTML) расшифровку упомянутых в них правил
function showEquipmentInfo(modelName, eqName) {
  const crewModel = crew.find(m => m.name === modelName);
  const eq = crewModel && (crewModel.equipment || []).find(e => e.name === eqName);
  if (!eq) return;
  const cost = `($${eq.fundingCost || 0}${eq.repCost ? ` +${eq.repCost} Rep` : ''})`;
  showTraitPopup(`${eq.name} ${cost}`, (eq.effects || []).join('<br>'));
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
      if (currentMode === 'rosterView') renderRosterPreview();
      // Перерендерим полную карточку, только если она сейчас открыта
      // (иначе удаление equipment из списка билдера непреднамеренно открывало модалку)
      if ($("fullCard").classList.contains("active")) {
        showFullCard(models.find(m => m.name === modelName));
      }
      // Обновляем боковую панель билдера, если в ней открыта эта модель
      refreshBuilderCardPanel(modelName);
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
      closeBuilderCardPanel(); // карточка предыдущей фракции в панели больше не актуальна
      if ($('cardsMissionsBtn')) $('cardsMissionsBtn').style.display = 'flex'; // карты миссий банды
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
        <div class="comp-title">${replaceIcons(k)}</div>
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

// Есть ли у модели хоть один свободный слот ранга — иначе она скрывается из
// списка найма. Лимиты те же, что при найме (см. bmgCanAddModel):
//   Leader — 1; Sidekick — 1 при живом Leader, иначе 2;
//   Free Agent / Vehicle — 1 + слоты за Rep-лимит + модификаторы.
// Henchman не ограничен общим слотом (его лимиты — по именам), поэтому модель
// с рангом Henchman видна всегда. Фракции с ignoreStandardRankRequirements
// (Batman Who Laughs) лимитов рангов не имеют — там всё видно.
function hasFreeRankSlot(model) {
  const factionRules = factionCrewRules[currentFaction] || {};
  if (factionRules.ignoreStandardRankRequirements) return true;
  const extras = bmgExtraSlots();
  const rankFull = {
    "Leader": bmgRankCount("Leader") >= 1,
    "Sidekick": bmgRankCount("Leader") >= 1
      ? bmgRankCount("Sidekick") >= 1
      : bmgRankCount("Sidekick") >= 2,
    "Free Agent": bmgRankCount("Free Agent") >= 1 + extras + (modifiers.extraFreeAgents || 0),
    "Vehicle": bmgRankCount("Vehicle") >= 1 + extras + (modifiers.extraVehicles || 0)
  };
  return getHireableRanks(model).some(r => !(r in rankFull) || !rankFull[r]);
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
  // Взаимоисключение Rivals/Affiliation (Birds of Prey: модели с Rivals: GCPD
  // и модели с аффилиацией GCPD не могут быть в одном отряде — в обе стороны)
  if (factionRules.rivalsExclusion) {
    const rx = factionRules.rivalsExclusion;
    const modelHasRival = getRivals(model).includes(rx);
    const modelHasAff = getFactions(model).includes(rx);
    const crewHasRival = crew.some(m => getRivals(m).includes(rx));
    const crewHasAff = crew.some(m => getFactions(m).includes(rx));
    if ((modelHasRival && crewHasAff) || (modelHasAff && crewHasRival)) {
      alert(t("rivals_exclusion_cannot_add", { faction: rx }));
      return false;
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
      // Проверка Veteran и Minion. Elite здесь не проверяется — общий цикл
      // трейтов ниже делает это для моделей ЛЮБОГО ранга (и любой фракции).
      // ВАЖНО: параметр цикла не "t" — иначе он затеняет глобальную функцию перевода t()
      // и alert(t("...")) внутри падает с TypeError ("t is not a function")
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

      // Minion (X): "This model can be hired up to X times in a crew, regardless
      // of its Name" — лимит X относится к ЭТОЙ конкретной модели (по имени), это
      // расширение обычного лимита "1 Henchman с одинаковым именем" (как у Horde
      // с фиксированным X=4), а не общий пул на несколько разных моделей с одним X
      // (в отличие от Elite (Type) / Veteran (Type), где лимит именно по типу).
      let minionExceeded = false;
      model.traits.forEach(modelTrait => {
        const minionMatch = modelTrait.match(/^Minion \((.+)\)$/);
        if (minionMatch) {
          const x = minionMatch[1].trim();
          const parsedX = parseInt(x, 10);
          const limit = isNaN(parsedX) ? 1 + (modifiers.extraMinions[x] || 0) : parsedX;
          const count = crew.filter(m => m.name === model.name && m.rankUsed === "Henchman").length;
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
      alert(t('leader_no_equipment'));
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

  const equipmentTitle = t('equipment_for');

  overlay.innerHTML = `
    <div class="equipment-modal-content">
      <div class="equipment-modal-header">
        <span>${equipmentTitle} <strong>${model.name}</strong></span>
        <div class="equipment-modal-close" onclick="this.closest('.equipment-modal').remove()">×</div>
      </div>
      <div class="equipment-modal-funding">
        <span class="avail">${t('equipment_available')}: $${availableFunding}</span>
        <span class="total">(${t('equipment_of_total')} $${bmgFundingLimit()})</span>
      </div>
      <div class="equipment-modal-list">
        ${availableEq.length ? availableEq.map(eq => {
          const cost = getEquipmentCost(eq);
          const isDiscounted = cost !== (eq.fundingCost || 0);
          const canAfford = availableFunding >= cost;
          const insufficientFundsText = t('equipment_insufficient_short');
          const isSpecial = isCharacterOrTraitGated(eq);
          const specialBadge = isSpecial ? '<span class="equipment-item-special">⭐ SPECIAL</span>' : '';

          const reqCond = isSpecial ? (eq.conditions || []).find(c => isCharacterOrTraitGated({ conditions: [c] })) : null;
          const reqText = reqCond
            ? `<span class="equipment-item-req">${t('equipment_requires')} ${reqCond.replace('Alias: ', '').replace(' in crew', '')}</span>`
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
      if (currentMode === 'rosterView') renderRosterPreview();
      refreshBuilderCardPanel(model.name);

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
  if (typeof resetObjectiveDeck === 'function') resetObjectiveDeck(); // колода карт целей
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

// ======================== ПРОСМОТР ОТРЯДА ========================
// Отдельный экран поверх билдера: удобный список набранной банды с апгрейдами.
// Сюда перенесены "Сохранить" и "Экспорт в PDF" — в самом билдере их больше нет.
function openRosterPreview() {
  if (!crew.length) { alert(t('crew_empty_preview')); return; }
  currentMode = 'rosterView';
  $('builderSection').style.display = 'none';
  $('rosterPreviewSection').style.display = 'block';
  renderRosterPreview();
}

function closeRosterPreview() {
  currentMode = 'builder';
  closeBuilderCardPanel(); // закрываем боковую панель карточки, если была открыта здесь
  $('rosterPreviewSection').style.display = 'none';
  $('builderSection').style.display = 'block';
}

// Колода карт целей в просмотре ростера — компактным списком названий;
// клик по названию открывает скан карты
function renderRosterPreviewCards() {
  const box = $('rosterPreviewCards');
  if (!box) return;
  if (typeof objDeckList !== 'function') { box.innerHTML = ''; return; }

  const deck = objDeckList();
  const mandatory = mandatoryCardsForFaction();
  if (!deck.length && !mandatory.length) { box.innerHTML = ''; return; }

  const total = deck.reduce((sum, e) => sum + e.count, 0);
  const chip = (card, count, isMandatory) => `
    <span class="roster-card-chip${isMandatory ? ' is-mandatory' : ''}"
          onclick="showObjectiveCardPreview('${card.id}', ${isMandatory})">
      ${card.name}${count > 1 ? ` <b>x${count}</b>` : ''}
    </span>`;
  box.innerHTML = `
    <div class="roster-cards-panel">
      <div class="obj-section-title">${t('obj_cards_title')} (${total}/${OBJECTIVE_DECK.size})</div>
      <div class="roster-cards-chips">
        ${mandatory.map(c => chip(c, 1, true)).join('')}
        ${deck.map(e => chip(e.card, e.count, false)).join('')}
      </div>
    </div>`;
}

function renderRosterPreview() {
  const grid = $('rosterPreviewList');
  if (!grid) return;

  renderRosterPreviewCards();

  const summary = $('rosterPreviewSummary');
  if (summary) {
    summary.innerHTML = `<span data-i18n="crew">${t('crew')}</span>: <span>${crew.length}</span> | <span data-i18n="rep">${t('rep')}</span>: <span>${getCrewTotalRep()} / ${BMG_REP_LIMIT}</span> | $<span>${getCrewUsedFunding()} / ${bmgFundingLimit()}</span>`;
  }

  // Сортировка по рангу — на копии массива, чтобы не менять порядок в самом crew
  // (от него зависят BMG_BOSS.indexOf и сериализация сохранений/экспорта)
  const sorted = sortModelsByRank(crew.slice());
  const fragment = document.createDocumentFragment();
  sorted.forEach(m => {
    const originalModel = models.find(model => model.name === m.name) || m;
    const item = { ...originalModel, inCrew: true, count: countInCrew(originalModel), instance: m };
    const div = document.createElement('div');
    div.className = 'mini-card';
    div.innerHTML = renderMiniCardHTML(item, false, true); // без +/- (просмотр, не найм), с характеристиками
    div.onclick = () => showFullCard(item);
    // Та же панель апгрейдов под карточкой, что и в билдере
    fragment.appendChild(wrapCardWithUpgrades(div, item));
  });
  grid.innerHTML = '';
  grid.appendChild(fragment);
}

// ======================== ЭКСПОРТ РОСТЕРА В PDF ========================
// Открывает печатную версию ростера, свёрстанную как официальные карточки:
// на каждую модель — лист A4 (альбомный): слева карточка, справа расшифровка
// её трейтов, правил оружия и купленного снаряжения в две колонки.
// Сохранение в PDF — системным диалогом печати браузера ("Сохранить как PDF").

// Секция снаряжения для правой колонки печати
function buildEquipmentGlossaryHTML(model) {
  const crewModel = crew.find(m => m.name === model.name);
  if (!crewModel || !(crewModel.equipment || []).length) return '';
  const items = crewModel.equipment.map(eq => `
    <div class="sidebar-entry">
      <div class="sidebar-entry-name">${eq.name} ($${eq.fundingCost || 0}${eq.repCost ? ` +${eq.repCost} Rep` : ''})</div>
      <div class="sidebar-entry-desc">${replaceIcons((eq.effects || []).join('<br>'))}</div>
    </div>`).join('');
  return `<div class="sidebar-section"><div class="sidebar-title">EQUIPMENT</div>${items}</div>`;
}

// Встроенные стили печатной версии (поверх style.css, который подключается там же)
const PRINT_CSS = `
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  html, body { background: #fff !important; color: #111; margin: 0; }
  @page { size: A4 landscape; margin: 8mm; }

  .print-page {
    display: flex; gap: 6mm; height: 193mm; overflow: hidden;
    page-break-after: always; break-after: page;
  }
  .print-page:last-child { page-break-after: auto; break-after: auto; }

  /* Левая колонка: карточка модели (как .official-card из style.css) */
  .print-card { width: 96mm; flex-shrink: 0; }
  .print-card .official-card { margin: 0; box-shadow: none; border-radius: 10px; }

  /* Правая колонка: правила, светлая тема для печати.
     column-fill: auto + фиксированная высота (ставится скриптом по высоте карточки):
     текст идёт ОДНОЙ колонкой и переходит во вторую только когда первая заполнена */
  .print-rules { flex: 1; min-width: 0; column-count: 2; column-gap: 6mm; column-fill: auto; font-size: 12px; align-self: flex-start; }
  .print-rules .sidebar-section { margin: 0 0 4mm; }
  .print-rules .sidebar-section + .sidebar-section { margin-top: 0; }
  .print-rules .sidebar-title {
    color: #000; border-bottom: 2px solid #e94560; font-size: 1.2em;
    font-weight: 700; letter-spacing: 2px; padding-bottom: 2px; margin-bottom: 2.4mm;
    break-after: avoid;
  }
  .print-rules .sidebar-entry { break-inside: avoid; margin-bottom: 2.6mm; }
  .print-rules .sidebar-entry-name { color: #000; font-weight: 700; font-size: 1em; text-transform: uppercase; letter-spacing: .4px; margin-bottom: .6mm; }
  .print-rules .sidebar-entry-desc { color: #222; font-size: .95em; line-height: 1.45; }
  .print-rules .inline-icon { height: 1.05em; background: #fff; border-radius: 50%; padding: 1px; box-sizing: content-box; }

  /* Сводная страница отряда */
  .print-summary { display: block; font-family: 'Oswald', sans-serif; }
  .print-summary-head { background: #ffd700; border-radius: 10px; padding: 6mm 8mm 5mm; margin-bottom: 6mm; }
  .print-summary-head h1 { margin: 0 0 2mm; font-size: 24px; letter-spacing: 2px; color: #000; }
  .print-summary-head .sub { font-size: 14px; font-weight: 700; color: #333; letter-spacing: 1px; }
  .print-summary table { width: 100%; border-collapse: collapse; font-size: 12px; }
  .print-summary th { background: #000; color: #ffd700; text-align: left; padding: 2.2mm 3mm; letter-spacing: 1px; }
  .print-summary td { border-bottom: 1px solid #ccc; padding: 2mm 3mm; color: #111; }
  .print-summary tr:nth-child(even) td { background: #f4f0e6; }

  /* Страницы карт целей: сканы в размере печатной карты (63×88мм), по 6 на лист */
  .print-cards {
    display: grid; grid-template-columns: repeat(3, 63mm); grid-auto-rows: 88mm;
    gap: 5mm; justify-content: center; align-content: start;
  }
  .print-cards img { width: 63mm; height: 88mm; object-fit: contain; border-radius: 3mm; }

  /* Просмотр на экране до печати */
  @media screen {
    body { background: #666 !important; padding: 12px; }
    .print-page { width: 281mm; margin: 0 auto 14px; background: #fff; box-shadow: 0 4px 16px rgba(0,0,0,.4); padding: 6mm; box-sizing: content-box; }
  }
`;

// Скрипт подгонки внутри печатного окна: текст и карточка не должны вылезать за лист
const PRINT_FIT_JS = `
  window.addEventListener('load', function () {
    document.querySelectorAll('.print-page:not(.print-summary)').forEach(function (page) {
      // Высота листа — берём у растянутой флекс-колонки карточки: она одинакова
      // и на экране, и в печати (page.clientHeight на экране больше из-за padding)
      var cardCol = page.querySelector('.print-card');
      var pageH = (cardCol ? cardCol.clientHeight : page.clientHeight) - 4;

      // 1) Карточка: если выше листа — масштабируем целиком
      var card = page.querySelector('.print-card > .official-card');
      var visualH = pageH;
      if (card) {
        if (card.offsetHeight > pageH) {
          var s = pageH / card.offsetHeight;
          card.style.transform = 'scale(' + s + ')';
          card.style.transformOrigin = 'top left';
          visualH = pageH;
        } else {
          visualH = card.offsetHeight;
        }
      }

      // 2) Правила: высота блока = высоте карточки, текст идёт одной колонкой
      //    и переходит во вторую только при переполнении первой (column-fill: auto)
      var rules = page.querySelector('.print-rules');
      if (!rules) return;
      rules.style.height = visualH + 'px';

      var overflows = function () {
        return rules.scrollWidth > rules.clientWidth + 1 || rules.scrollHeight > rules.clientHeight + 1;
      };
      // Не влезло в две колонки высотой с карточку — разрешаем высоту всего листа
      if (overflows() && visualH < pageH) rules.style.height = pageH + 'px';
      // Всё ещё не влезает — постепенно уменьшаем шрифт (минимум 7px)
      var fs = 12;
      while (overflows() && fs > 7) {
        fs -= 0.5;
        rules.style.fontSize = fs + 'px';
      }
    });
    // Автовызов диалога печати (в автоматизированных браузерах пропускается)
    if (!navigator.webdriver) setTimeout(function () { window.print(); }, 500);
  });
`;

function exportRoster() {
  if (crew.length === 0) {
    alert(t("export_empty_roster"));
    return;
  }

  const totalRep = getCrewTotalRep();
  const usedFunding = getCrewUsedFunding();

  // Сводная таблица отряда
  const summaryRows = crew.map(m => `
    <tr>
      <td>${m.name}</td>
      <td>${m.rankUsed || getRanks(m).join(' / ')}</td>
      <td>${m.rep || 0}</td>
      <td>$${getEffectiveModelFunding(m)}</td>
      <td>${(m.equipment || []).map(eq => `${eq.name} ($${eq.fundingCost || 0})`).join(', ') || '—'}</td>
    </tr>`).join('');

  // Страница на каждую модель: карточка + расшифровка правил
  const pages = crew.map(m => {
    const base = models.find(x => x.name === m.name) || m;
    const rulesHTML = buildGlossaryHTML(base) + buildEquipmentGlossaryHTML(base);
    return `
    <section class="print-page">
      <div class="print-card">${buildFullCardHTML(base)}</div>
      <div class="print-rules">${rulesHTML}</div>
    </section>`;
  }).join('');

  // Страницы карт целей: сканы в размере печатной карты, по 6 на лист
  // (обязательные карты банды + каждая копия карты из колоды)
  let cardPages = '';
  if (typeof objDeckList === 'function') {
    const cardImgs = [
      ...mandatoryCardsForFaction().map(c => c.img),
      ...objDeckList().flatMap(e => Array(e.count).fill(e.card.img))
    ];
    const perPage = 6;
    for (let i = 0; i < cardImgs.length; i += perPage) {
      cardPages += `
    <section class="print-page print-cards">
      ${cardImgs.slice(i, i + perPage).map(src => `<img src="${src}">`).join('')}
    </section>`;
    }
  }

  const doc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <base href="${document.baseURI}">
  <title>BMG Roster — ${currentFaction || 'Unknown'} — ${totalRep} Rep</title>
  <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <style>${PRINT_CSS}</style>
</head>
<body>
  <section class="print-page print-summary">
    <div class="print-summary-head">
      <h1>BMG CREW ROSTER — ${currentFaction || 'Unknown'}</h1>
      <div class="sub">REP: ${totalRep} / ${BMG_REP_LIMIT} &nbsp;•&nbsp; FUNDING: $${usedFunding} / ${bmgFundingLimit()} &nbsp;•&nbsp; MODELS: ${crew.length}</div>
    </div>
    <table>
      <tr><th>MODEL</th><th>RANK</th><th>REP</th><th>$</th><th>EQUIPMENT</th></tr>
      ${summaryRows}
    </table>
  </section>
  ${pages}
  ${cardPages}
  <script>${PRINT_FIT_JS}<\/script>
</body>
</html>`;

  const win = window.open('', '_blank');
  if (!win) {
    alert(t('popup_blocked'));
    return;
  }
  win.document.open();
  win.document.write(doc);
  win.document.close();
}