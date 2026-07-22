const factionCrewRules = {
  "Batman Who Laughs": {
    ignoreStandardRankRequirements: true, // Игнорирует стандартные требования к рангам
    allowSameNameDifferentAlias: true, // Разрешает одинаковые имена с разными псевдонимами
    mustHaveLeaderAsBoss: true, // Должен быть Leader как Босс
    onlyAffiliationMembers: true // Только персонажи из аффилиации
  },
  "Bat Family": {
    onlyBossAffiliationOrNoAffiliation: true, // Только персонажи с аффилиацией Босса или без аффилиации
    onlyBossAffiliationObjectives: true // Только объективы с аффилиацией Босса или без аффилиации
  },
  "Cults": {
    onlyBossAffiliationOrNoAffiliation: true, // Только персонажи с аффилиацией Босса или без аффилиации
    onlyBossAffiliationObjectives: true, // Только объективы с аффилиацией Босса или без аффилиации
    mustHaveLeaderAsBoss: true // Должен быть Leader как Босс
  },
  "Court of Owls": {
    onlyAffiliationMembers: true // Нельзя нанимать персонажей вне аффилиации (официальное Crew Building Rules)
  },
  "Suicide Squad": {
    onlyAffiliationMembers: true // Нельзя нанимать персонажей вне аффилиации (официальное Crew Building Rules)
  },
  "Birds of Prey": {
    // Официальное Crew Building Rules: модели с Rivals: GCPD и модели с аффилиацией GCPD
    // взаимоисключаются в одном отряде (в обе стороны)
    rivalsExclusion: "GCPD"
  }
  // Другие фракции могут иметь стандартные правила (пустой объект или null)
};

// Экспортируем для использования в script.js
window.factionCrewRules = factionCrewRules;

// ======================== ПРАВИЛА ЗАВИСИМОСТЕЙ МОДЕЛЕЙ ========================
// Структура: { "Модель": { requiredModel: "Требуемая модель", trait: "Требуемый трейт (опционально)" } }
// Модель будет скрыта в поиске и не может быть добавлена, пока не выполнена зависимость
// Для сложных условий (or) можно указать requiredModels — массив требуемых моделей (нужна хотя бы одна)
const modelDependencyRules = {
  // Batman Who Laughs
  "Robin Who Laughs": { requiredModel: "The Batman Who Laughs" },
  
  // Dark Knight Rises
  "Gordon Infiltrate": { requiredModel: "Batman Dark Knight Rises" },
  "Catwoman Dark Knight Rises": { requiredModel: ["Batman Dark Knight Rises", "Bane Dark Knight Rises"] },
  
  // Adam West 1966
  "Robin Burt Ward": { requiredModel: "Batman Adam West" },
  
  // Batman Beyond (Terry McGinnis)
  "Mr. Wayne Beyond": { requiredModel: "Batman Beyond" },
  "Robin Beyond": { requiredModel: "Batman Beyond" },
  
  // The Animated Series
  "Harley Quinn The Animated Series": { requiredModel: "Batman The Animated Series" },
  
  // GCPD / Two-Face
  "Gilda Dent": { requiredModel: "Two-Face" },
  
  // Batman Forever: киношный Two-Face (Tommy Lee Jones) нанимается только с Риддлером Джима Керри.
  // Ключ не должен называться просто "Two-Face" — иначе правило блокировало бы и лидера фракции Two-Face
  "Two-Face Batman Forever": { requiredModel: "The Riddler Jim Carrey" },
  
  // Batman Michael Keaton
  "Catwoman Michelle Pfeiffer": { requiredModel: "Batman Michael Keaton" },
  
  // Suicide Squad
  "Ratcatcher": { requiredModel: "Ratcatcher 2 The Suicide Squad" },
  "Eagly": { requiredModel: "Peacemaker John Cena" },
  
  // League of Shadows / Batman Begins
  "Bruce Batman Begins": { requiredModel: "Henry Ducard" },
  
  // Joker Cesar Romero (Batman 1966)
  "The Riddler (Frank Gorshin)": { requiredModel: "Joker (Cesar Romero)" },
  "The Penguin (Burgess Meredith)": { requiredModel: "Joker (Cesar Romero)" },
  
  // Arkham Assistants (требуется Dr. Hugo Strange или Scarecrow The Worst Nightmare)
  "Arkham Assistant 1": { requiredModels: ["Dr. Hugo Strange", "Scarecrow (The Worst Nightmare)"] },
  "Arkham Assistant 2": { requiredModels: ["Dr. Hugo Strange", "Scarecrow (The Worst Nightmare)"] }
  // Добавляйте новые правила здесь по мере необходимости
};

// Экспортируем для использования в script.js
window.modelDependencyRules = modelDependencyRules;

// ======================== ПРАВИЛА AVERSION ========================
// Структура: { "Модель": ["Список моделей, с которыми не может быть в одной банде"] }
// Модель скрывается в билдере, если в отряде есть модель из списка Aversion
// И наоборот: если эта модель в отряде, модели из списка не могут быть наняты
const modelAversionRules = {
  // League of Shadows / Nyssa al Ghul
  "Nyssa al Ghul (Arkham Knight)": ["Ra's al Ghul", "Talia Rebirth"],

  // GCPD / Aaron Cash
  "Aaron Cash": ["Killer Croc"],

  // Falcone / The Roman
  "The Roman": ["Catwoman"],

  // Holiday / The Holiday Killer
  "The Holiday Killer": ["Sal Maroni"],

  // Joker Gang / Gaggy variants and Punchline
  "Gaggy Rebirth": ["Harley Quinn"],
  "Gaggy": ["Harley Quinn"],
  "Punchline": ["Harley Quinn"]

  // Добавляйте новые правила здесь по мере необходимости
};

// Экспортируем для использования в script.js
window.modelAversionRules = modelAversionRules;

const equipmentByFaction = {
  "GCPD": [
    { name: "Magazine", fundingCost: 200, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["+1 to Ammunition for one weapon."] },
    { name: "Flashlight", fundingCost: 50, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["Model gains the Lantern rule."] },
    { name: "Handcuffs", fundingCost: 100, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["Model gains the Arrest rule."] },
    { name: "Whistle", fundingCost: 150, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["Model gains the Halt/Stop rule."] },
    { name: "Street Patrol", fundingCost: 50, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Street Guy rule."] },
    { name: "Intensive training", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Teamwork (1) (All) rule."] },
    { name: "Radio", fundingCost: 200, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["This model is always treated as though it were within range of it's Boss's Inspire trait."] },
    { name: "Antidote", fundingCost: 50, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model is immune to the Poison Status."] },
    { name: "Grapple-gun", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Batclaw/Grapple-gun rule."] },
    { name: "Helmet", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Hardened rule."] },
    { name: "Patrol Training", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Undercover rule."] },
    { name: "Gas Mask", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Gas Mask rule."] },
    { name: "Riot Gear", fundingCost: 150, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["The models gains the Football Gear rule."] },
    { name: "Medic", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Medic rule."] },
    { name: "SWAT Special Training", fundingCost: 100, repCost: 0, maxPerCrew: 2, conditions: ["Model has Elite (SWAT) trait"], effects: ["Choose: Tracking or Precise Aim rule."] },
    { name: "Upgraded Batsuit", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Bruce Wayne"], targetModels: ["Bruce Wayne"], effects: ["+1 to Endurance."] },
    { name: "Kevlar Cowl", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Bruce Wayne"], targetModels: ["Bruce Wayne"], effects: ["Immunity to CRT."] },
    { name: "EMP", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: ["Bruce Wayne"], effects: ["Model Gains the EMP rule."] },
    { name: "Martial Arts Training", fundingCost: 100, repCost: 2, maxPerCrew: 1, conditions: ["Bruce Wayne"], effects: ["Model gains the Martial Artist rule."], targetModels: ["Sidekick", "Free Agent"] }, // Note: targetModels uses ranks here; adjust if needed
    { name: "Mentor", fundingCost: 100, repCost: 3, maxPerCrew: 1, conditions: ["Bruce Wayne"], effects: ["Model gains the Hidden Boss rule."], targetModels: ["Sidekick", "Free Agent"] },
    { name: "Hidden Magazine", fundingCost: 300, repCost: 0, maxPerCrew: 1, conditions: ["Bruce Wayne"], effects: ["+1 to Ammunition for one weapon."], targetModels: ["Leader", "Sidekick"] },
    { name: "Morality", fundingCost: 50, repCost: 0, maxPerCrew: 1, conditions: ["Bruce Wayne"], targetModels: ["Batman"], effects: ["Model gains Moral Compass and Demotivate rules."] },
    { name: "Circus Training", fundingCost: 200, repCost: 5, maxPerCrew: 1, conditions: ["Dick Grayson"], effects: ["Model gains the Acrobat rule."] },
    { name: "Runner", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: ["Dick Grayson"], effects: ["Model gains the Tireless rule."] },
    { name: "Command Center Support", fundingCost: 250, repCost: 0, maxPerCrew: 1, conditions: ["Oliver Queen"], effects: ["Model gains the Scheming (2) rule."] },
    { name: "Tactical Gloves", fundingCost: 50, repCost: 0, maxPerCrew: 1, conditions: ["Oliver Queen"], targetModels: ["Oliver Queen"], effects: ["Gains Reinforced Gloves rule."] },
    { name: "Hi-Tech Ammo", fundingCost: 150, repCost: 2, maxPerCrew: 1, conditions: ["Roy Harper"], effects: ["One ranged weapon gains Bleed (2)."] },
    { name: "Officer training", fundingCost: 100, repCost: 2, maxPerCrew: 1, conditions: ["Kathy Kane"], effects: ["Model gains the Follow Me! rule."] },
    { name: "Inspiring Presence", fundingCost: 250, repCost: 0, maxPerCrew: 1, conditions: ["Tim Drake"], targetModels: ["Tim Drake"], effects: ["Model gains Leadership rule."] },
    { name: "Watch Tower", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Barbara Gordon"], targetModels: ["Batgirl"], effects: ["Model gains Exhaustive Planner rule."] },
    { name: "Deadly Weapons", fundingCost: 150, repCost: 2, maxPerCrew: 1, conditions: ["Red Hood (Arkham Knight)"], targetModels: ["Red Hood Arkham Knight"], effects: ["Weapons gain the Silencer rule."] },
    { name: "Heliport", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: ["James Gordon"], targetModels: ["James Gordon"], effects: ["Enhances Air Support (details in desc)."], isUnaffectedByBroken: true },
    { name: "Sergeant Training", fundingCost: 50, repCost: 0, maxPerCrew: 2, conditions: ["James Gordon"], effects: ["Model gains the Order rule."], isUnaffectedByBroken: true },
    { name: "Feline Stalk", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Selina Kyle"], targetModels: ["Selina Kyle"], effects: ["Model gains Tracking rule."], isUnaffectedByBroken: true },
    // Vampire Queen (Batgirl Vampire Queen — faction Bat Family/GCPD): "When recruiting this model,
    // you can purchase The Turning equipment piece to other models in this crew."
    { name: "The Turning", fundingCost: 200, repCost: 10, maxPerCrew: 4, conditions: ["Vampire Queen in crew"], effects: ["Model gains the Vampire rule."] },
    // Lucius's Inventions (трейт Upgrades у Lucius Fox): в компендиуме нет цены для этих 4 предметов —
    // указано $0 как временная заглушка, подставьте реальную стоимость, когда она будет известна.
    // Только один из группы может быть куплен/активен одновременно (см. group).
    { name: "Improved Batclaw", fundingCost: 0, repCost: 0, maxPerCrew: 1, conditions: ["Lucius Fox"], group: "Lucius's Inventions", effects: ["Only purchasable by models with the Batclaw/Grapple Gun trait. Batclaw/Grapple Gun range increases from 6\" to 8\"."] },
    { name: "Improved Batlings", fundingCost: 0, repCost: 0, maxPerCrew: 1, conditions: ["Lucius Fox"], group: "Lucius's Inventions", effects: ["Only purchasable by models with a weapon with the Throwing trait. Ranged Attacks with that weapon gain +1 to Hit and always hit the Strength die on a 3+, ignoring the wielder's Strength."] },
    { name: "Improved Bat-Armor", fundingCost: 0, repCost: 0, maxPerCrew: 1, conditions: ["Lucius Fox", "Model has Bat-Armor MK II trait"], group: "Lucius's Inventions", effects: ["Model gains +1 to Defense rolls while it also benefits from the Bat-Armor MK II trait."] },
    { name: "Improved Reinforced Gloves", fundingCost: 0, repCost: 0, maxPerCrew: 1, conditions: ["Lucius Fox", "Model has Reinforced Gloves trait"], group: "Lucius's Inventions", effects: ["When this model attacks unarmed using the Reinforced Gloves trait, it also imposes a -1 to the target to Block."] }
  ],
  "Bat Family": [
    { name: "The Turning", fundingCost: 200, repCost: 10, maxPerCrew: 4, conditions: ["Vampire Queen in crew"], effects: ["Model gains the Vampire rule."] },
    // Lucius's Inventions (трейт Upgrades у Lucius Fox): см. комментарий в списке GCPD выше про цену $0
    { name: "Improved Batclaw", fundingCost: 0, repCost: 0, maxPerCrew: 1, conditions: ["Lucius Fox"], group: "Lucius's Inventions", effects: ["Only purchasable by models with the Batclaw/Grapple Gun trait. Batclaw/Grapple Gun range increases from 6\" to 8\"."] },
    { name: "Improved Batlings", fundingCost: 0, repCost: 0, maxPerCrew: 1, conditions: ["Lucius Fox"], group: "Lucius's Inventions", effects: ["Only purchasable by models with a weapon with the Throwing trait. Ranged Attacks with that weapon gain +1 to Hit and always hit the Strength die on a 3+, ignoring the wielder's Strength."] },
    { name: "Improved Bat-Armor", fundingCost: 0, repCost: 0, maxPerCrew: 1, conditions: ["Lucius Fox", "Model has Bat-Armor MK II trait"], group: "Lucius's Inventions", effects: ["Model gains +1 to Defense rolls while it also benefits from the Bat-Armor MK II trait."] },
    { name: "Improved Reinforced Gloves", fundingCost: 0, repCost: 0, maxPerCrew: 1, conditions: ["Lucius Fox", "Model has Reinforced Gloves trait"], group: "Lucius's Inventions", effects: ["When this model attacks unarmed using the Reinforced Gloves trait, it also imposes a -1 to the target to Block."] }
  ],
  "Joker": [
    { name: "Magazine", fundingCost: 200, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["+1 to Ammunition for one weapon."] },
    { name: "Grapple-gun", fundingCost: 300, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["Model gains the Batclaw/Grapple-gun rule."] },
    { name: "Clown Paint", fundingCost: 150, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["Model gains the Distract rule."] },
    { name: "Flare", fundingCost: 300, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["Model gains the Flare rule."] },
    { name: "Neurotoxic Drugs", fundingCost: 250, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["Model gains +2 Movement and Dodge trait."] },
    { name: "Improvised Armor", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Hockey Gear rule."] },
    { name: "Gas Mask", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Gas Mask rule."] },
    { name: "Antidote", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model is immune to the Poison Status."] },
    { name: "Poison Training", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Poison Master trait."] },
    { name: "Mental Torture", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Aggressive Schizophrenia trait."] },
    { name: "Joker's Gas", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Joker's Gas trait."] },
    { name: "Nerve Gas", fundingCost: 150, repCost: 0, maxPerCrew: 2, conditions: ["Joker"], effects: ["Model gains the Sturdy rule."] },
    { name: "Sexy Costume", fundingCost: 300, repCost: 5, maxPerCrew: 1, conditions: ["Harleen Quinzel"], effects: ["Model gains the Disarray rule."] },
    { name: "Pole Dancer", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: ["Harleen Quinzel"], effects: ["Model gains Escape Artist rule."] },
    { name: "Enhanced Gas", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Gaggy"], targetModels: ["Leader", "Sidekick"], effects: ["Enhances Nerve effect within 8\"."] },
    { name: "Rusty Tools", fundingCost: 200, repCost: 2, maxPerCrew: 1, conditions: ["Duela Dent"], effects: ["Model gains the Cruel rule."] },
    { name: "Brutal Training", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: ["Mr. Hammer"], effects: ["Model gains the Savage Fighter rule."] }
  ],
  "Penguin": [
    { name: "Magazine", fundingCost: 200, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["+1 to Ammunition for one weapon."] },
    { name: "Grapple-gun", fundingCost: 200, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["Model gains the Batclaw/Grapple-gun rule."] },
    { name: "Laser Sight", fundingCost: 150, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["Model gains the Laser Sight rule."] },
    { name: "Camo Vest", fundingCost: 150, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["Model gains the Stealth rule."] },
    { name: "C4", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Explosive Gel trait."] },
    { name: "Radio", fundingCost: 200, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["Always within Boss's Inspire range."] },
    { name: "Backpack", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Backpack rule."] },
    { name: "Biker Jacket", fundingCost: 100, repCost: 0, maxPerCrew: 3, conditions: [], effects: ["Model gains the Hockey Gear trait."] },
    { name: "Helmet", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Hardened trait."] },
    { name: "Raised on the Streets", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Plead trait."] },
    { name: "Ostentatious Clothes", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Oswald C. Cobblepot"], effects: ["Model gains the Goad rule."] },
    { name: "Trained Mobsters", fundingCost: 250, repCost: 2, maxPerCrew: 2, conditions: ["Emperor Penguin"], effects: ["+2 Endurance."] },
    // Iceberg Lounge Equipment Options: можно выбрать только 1 из группы (group вместо несуществующего condition)
    { name: "Neurotoxic Drugs", fundingCost: 500, repCost: 0, maxPerCrew: 1, conditions: [], group: "Iceberg Lounge", effects: ["+2 Movement and Dodge trait."] },
    { name: "Silencer", fundingCost: 400, repCost: 0, maxPerCrew: 1, conditions: [], group: "Iceberg Lounge", effects: ["One ranged weapon gains Silencer trait."] },
    { name: "Weird Ammo", fundingCost: 300, repCost: 0, maxPerCrew: 1, conditions: [], group: "Iceberg Lounge", effects: ["Ranged attacks gain Enervating 2 or Anti-tank."] },
    { name: "Mutation Serum", fundingCost: 500, repCost: 0, maxPerCrew: 1, conditions: [], group: "Iceberg Lounge", effects: ["Model gains Tough Skin and Desensitized trait."] },
    { name: "Fear Gas Dispenser", fundingCost: 600, repCost: 0, maxPerCrew: 1, conditions: [], group: "Iceberg Lounge", effects: ["Model gains the Inspire Fear trait."] },
    { name: "Titan Dose", fundingCost: 300, repCost: 0, maxPerCrew: 1, conditions: [], group: "Iceberg Lounge", effects: ["Model gains one Titan Dose."] },
    { name: "Prototype Freeze Ray", fundingCost: 500, repCost: 0, maxPerCrew: 1, conditions: [], group: "Iceberg Lounge", effects: ["Model gains the Ice Flash trait."] }
  ],
  "Bane": [
    { name: "Magazine", fundingCost: 200, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["+1 to Ammunition for one weapon."] },
    { name: "Grapple-gun", fundingCost: 300, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["Model gains the Batclaw/Grapple-gun rule."] },
    { name: "Titan Dose", fundingCost: 100, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["Model gains one Titan Dose."] },
    { name: "Night Vision Goggles", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Night Vision rule."] },
    { name: "Venom Dose", fundingCost: 100, repCost: 0, maxPerCrew: 3, conditions: [], effects: ["Model gains one Venom Dose."] },
    { name: "Backpack", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Backpack rule."] },
    { name: "Antidote", fundingCost: 50, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model is immune to Poison Status."] },
    { name: "Neurotoxic Drugs", fundingCost: 250, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["+2 Movement and Dodge trait."] },
    { name: "Camo Vest", fundingCost: 200, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["Model gains the Stealth rule."] },
    { name: "Gas Mask", fundingCost: 150, repCost: 0, maxPerCrew: 3, conditions: [], effects: ["Model gains the Gas Mask rule."] },
    { name: "War Hardened", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Cruel trait."] },
    { name: "Handcuffs", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: ["Bane"], effects: ["Model gains the Arrest rule."] },
    { name: "Venom Laboratory", fundingCost: 100, repCost: 5, maxPerCrew: 1, conditions: ["Bane"], targetModels: ["Leader", "Sidekick"], effects: ["All models can use >1 Titan Dose; Venom Dose cost $50; model removed from play."], isUnaffectedByBroken: true },
    { name: "Venom Applicator", fundingCost: 0, repCost: 2, maxPerCrew: 2, conditions: ["Bane"], effects: ["Can use Titan/Venom on friendly model in contact."] },
    { name: "Military Progress", fundingCost: 150, repCost: 0, maxPerCrew: 2, conditions: ["Bird"], effects: ["Model gains Veteran rule."] },
    { name: "Dual Handguns", fundingCost: 300, repCost: 7, maxPerCrew: 1, conditions: ["Thomas Wayne"], targetModels: ["Thomas Wayne"], effects: ["Gains Rapid Fire and Dual Handguns weapon."], isUnaffectedByBroken: true },
    { name: "Surgeon Training", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Thomas Wayne"], effects: ["Model gains the Medic trait."] },
    { name: "Fear Gas Dispenser", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: ["Scarecrow (Arkham Knight)"], effects: ["Model gains the Inspire Fear rule."] },
    { name: "Secret Laboratory", fundingCost: 100, repCost: 2, maxPerCrew: 1, conditions: ["Scarecrow (Arkham Knight)"], targetModels: ["Scarecrow"], effects: ["Enhances Inspire Fear for 2 henchmen."], isUnaffectedByBroken: true },
    { name: "Radio", fundingCost: 150, repCost: 0, maxPerCrew: 2, conditions: ["Jason Todd"], effects: ["Always within Inspire range."] },
    { name: "Hidden Magazines", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Jason Todd"], targetModels: ["Jason Todd"], effects: ["+1 Magazines to one weapon."] },
    { name: "Cybernetic Arms", fundingCost: 50, repCost: 0, maxPerCrew: 1, conditions: ["Jason Todd"], targetModels: ["Jason Todd"], effects: ["Gains Reinforced Gloves rule."] },
    { name: "Arkham Knight Secret Armour", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: ["Jason Todd"], effects: ["One ranged weapon gains Acid rule."] },
    { name: "Hook Pistol", fundingCost: 400, repCost: 0, maxPerCrew: 1, conditions: ["Jason Todd", "Jason Todd is Boss"], targetModels: ["Jason Todd"], effects: ["Gains Grapple Gun and Electric Hook weapon."] },
    { name: "Martial Training", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: ["Slade Wilson"], effects: ["Model gains Martial Artist and Master Fighter rules."] },
    { name: "Contract", fundingCost: 0, repCost: 0, maxPerCrew: 1, conditions: ["Slade Wilson"], targetModels: ["Slade Wilson"], effects: ["Gains rank Sidekick with Affiliation Bane."], isUnaffectedByBroken: true }
  ],
  "Court of Owls": [
    { name: "Magazine", fundingCost: 100, repCost: 0, maxPerCrew: 2, conditions: ["Only Henchman/Free Agents"], effects: ["+1 to Ammunition for one weapon."] },
    { name: "Climbing Claws", fundingCost: 100, repCost: 0, maxPerCrew: 2, conditions: ["Only Henchman/Free Agents"], effects: ["Model gains the Climbing Claws rule."] },
    { name: "Antidote", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: ["Only Henchman/Free Agents"], effects: ["Model is immune to the Poison effect."] },
    { name: "Camo Vest", fundingCost: 100, repCost: 0, maxPerCrew: 2, conditions: ["Only Henchman/Free Agents"], effects: ["Model gains the Stealth rule."] },
    { name: "C4", fundingCost: 300, repCost: 0, maxPerCrew: 1, conditions: ["Only Henchman/Free Agents"], effects: ["Model gains the Explosive Gel rule."] },
    { name: "Gas Mask", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: ["Only Henchman/Free Agents"], effects: ["Model gains the Gas Mask rule."] },
    { name: "Grapple-gun", fundingCost: 400, repCost: 0, maxPerCrew: 1, conditions: ["Only Henchman/Free Agents"], effects: ["Model gains the Grapple-gun rule."] },
    { name: "Ancient Weapon", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Only Henchman/Free Agents"], effects: ["Close Combat attacks gain Bleed(1)."] },
    { name: "Genetic Alteration", fundingCost: 100, repCost: 0, maxPerCrew: 3, conditions: ["Only Henchman/Free Agents"], effects: ["+2 Movement."] },
    { name: "Hunter Training", fundingCost: 150, repCost: 0, maxPerCrew: 2, conditions: ["Only Henchman/Free Agents"], effects: ["Model gains the Sneaking rule."] },
    { name: "Ancient Training", fundingCost: 150, repCost: 0, maxPerCrew: 2, conditions: ["Only Henchman/Free Agents"], effects: ["Model gains Master Fighter rule."] },
    { name: "Circus Grooming", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: ["Only Henchman/Free Agents"], effects: ["Model gains Combat Flip rule."] },
    { name: "Lords of Gotham", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["The Court"], targetModels: ["The Court"], effects: ["Generates 1 extra Sewer marker."] },
    { name: "Talon Serum Infusion", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Lincoln March"], targetModels: ["Lincoln March"], effects: ["Enhances Reanimated Owl models (details in desc)."] }
  ],
  "The Riddler": [
    { name: "Magazine", fundingCost: 200, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["+1 to Ammunition for one weapon."] },
    { name: "Grapple-gun", fundingCost: 300, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["Model gains the Grapple-gun rule."] },
    { name: "Mirror Games", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Magic Tricks trait."] },
    { name: "Enigma Data-Pack", fundingCost: 100, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["Model gains the Bluff traits."] },
    { name: "Broken Equipment Pack", fundingCost: 250, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Disables one enemy equipment pre-game."] },
    { name: "Gas Mask", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Gas Mask rule."] },
    { name: "Another One!", fundingCost: 150, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["Model gains the Drop a Riddle trait."] },
    { name: "Level Up", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: ["The Riddler"], targetModels: ["The Riddler"], effects: ["Place up to 2 extra Suspect markers in first 2 turns."] },
    { name: "It's a Dud", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: ["Quelle"], effects: ["Remove 1 Riddle marker at activation start."] },
    { name: "Inspiration", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: ["Echo"], effects: ["Search Objective deck when playing a card."] },
    { name: "Weird Ammo", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: ["Query"], effects: ["Ranged weapons gain Enervating (2) or Anti-Tank."] },
    { name: "Battle Bot", fundingCost: 250, repCost: 3, maxPerCrew: 1, conditions: ["Model has Bot trait"], effects: ["Model gains the Claws rule."] },
    { name: "Shock Droid", fundingCost: 50, repCost: 0, maxPerCrew: 1, conditions: ["Model has Bot trait"], effects: ["Model gains the CRT: Stunned rule."] },
    { name: "Improved Chassis MK", fundingCost: 50, repCost: 0, maxPerCrew: 1, conditions: ["Model has Bot trait"], effects: ["The model gains Tireless rule."] },
    { name: "Improved Armor", fundingCost: 250, repCost: 2, maxPerCrew: 1, conditions: ["The Riddler (Arkham Knight) or The Riddler's Mech (Arkham Knight)"], targetModels: ["The Riddler"], effects: ["Bots gain Light Armor Trait."], isUnaffectedByBroken: true },
    { name: "Enhanced Servo-engines", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: ["The Riddler (Arkham Knight) or The Riddler's Mech (Arkham Knight)"], targetModels: ["Riddler's Mech"], effects: ["+1 Movement and Combo: Mechanic Claw."], isUnaffectedByBroken: true }
  ],
  "Mr. Freeze": [
    { name: "Magazine", fundingCost: 200, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["+1 to Ammunition for one weapon."] },
    { name: "Grapple-gun", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Grapple-gun rule."] },
    { name: "Cryo-Grenade", fundingCost: 100, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["Model gains the Cryo-Grenade rule."] },
    { name: "Med-pack", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Once per game remove 2 Damage markers from a model in contact."] },
    { name: "Scope", fundingCost: 300, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["One ranged weapon gains the Scope rule."] },
    { name: "Gas Mask", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Gas Mask rule."] },
    { name: "Cool Generator", fundingCost: 300, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Stop! rule."] },
    { name: "Freeze Generator", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: ["Victor Fries"], effects: ["Model gains Shockwave rule."] },
    { name: "Engineer Training", fundingCost: 150, repCost: 0, maxPerCrew: 2, conditions: ["Victor Fries"], effects: ["Model gains the Handyman rule."] },
    { name: "Queen's Chosen", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Killer Frost"], effects: ["Model gains the Bodyguard rule."] },
    { name: "Ivy's Snow Coat", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Poison Ivy 1997"], targetModels: ["Poison Ivy"], effects: ["Model gains the Cold Acclimation trait."] }
  ],
  "League of Shadows": [
    { name: "Magazine", fundingCost: 200, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["+1 to Ammunition for one weapon."] },
    { name: "Loyalty Tattoo", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Bodyguard rule."] },
    { name: "Climbing Claws", fundingCost: 100, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["Model gains the Climbing Claws rule."] },
    { name: "Trained in the Shadows", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Hidden rule."] },
    { name: "Gas Mask", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Gas Mask rule."] },
    { name: "Grapple-gun", fundingCost: 400, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Grapple-gun rule."] },
    { name: "Combat Bracers", fundingCost: 150, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["Close combat weapons gain Defensive."] },
    { name: "Venom Dose", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains one Venom Dose."] },
    { name: "Precise Orders", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains Chain of Command."] },
    { name: "Pure Lazarus", fundingCost: 300, repCost: 0, maxPerCrew: 1, conditions: [], targetModels: ["Leader", "Sidekick"], effects: ["Model gains the Regeneration trait."] },
    { name: "Ancient Weapon", fundingCost: 150, repCost: 0, maxPerCrew: 2, conditions: ["Ra's al Ghul"], effects: ["Close combat attacks gain Bleed(1)."] },
    { name: "Shadow Training", fundingCost: 150, repCost: 0, maxPerCrew: 2, conditions: ["Talia al Ghul"], effects: ["Model gains the Undercover trait."] },
    { name: "Unarmed Combat Training", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: ["Lady Shiva"], effects: ["Model gains the Close Combat Master trait."] },
    { name: "Poison Training", fundingCost: 50, repCost: 0, maxPerCrew: 1, conditions: ["Cheshire"], effects: ["Model gains the Poison Master trait."] },
    { name: "Military Progress", fundingCost: 150, repCost: 0, maxPerCrew: 2, conditions: ["Bane"], effects: ["Model gains the Veteran trait."] },
    { name: "Bow Training", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: ["Nyssa al Ghul"], effects: ["Model gains the Shooter rule."] }
  ],
  "Birds of Prey": [
    { name: "Spray Can", fundingCost: 150, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["Model gains 1 Spray Can."] },
    { name: "Grapple-gun", fundingCost: 300, repCost: 0, maxPerCrew: 1, conditions: ["Model has Plant trait cannot purchase"], effects: ["Model gains the Grapple-gun rule."] },
    { name: "Camo Vest", fundingCost: 300, repCost: 0, maxPerCrew: 1, conditions: ["Model has Plant trait cannot purchase"], effects: ["Model gains the Stealth rule."] },
    { name: "Adaptive Planning", fundingCost: 150, repCost: 2, maxPerCrew: 2, conditions: ["Model has Plant trait cannot purchase"], effects: ["Model gains the Adaptable trait."] },
    { name: "Titanic Mutation", fundingCost: 150, repCost: 0, maxPerCrew: 2, conditions: ["Model has Plant trait cannot purchase"], effects: ["Model gains one Titan Dose."] },
    { name: "Sense Mutation", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: ["Only Plants"], effects: ["Model gains the Night Vision rule."] },
    { name: "Extra Spores", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: ["Only Plants"], effects: ["+1 to Ammunition for one weapon."] },
    { name: "Spikes Mutation", fundingCost: 200, repCost: 0, maxPerCrew: 2, conditions: ["Only Plants"], effects: ["Model gains the Claws rule."] },
    { name: "Luminescent Mutation", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: ["Only Plants"], effects: ["Model gains the Lantern rule."] },
    { name: "Large Roots", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Only Plants"], effects: ["Models within action radius suffer Impaired Movement."] },
    { name: "Smash 'n Grab", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Dr. Harleen Quinzel"], effects: ["Close Combat attacks gain the Steal trait."] },
    { name: "Corrosive Blood", fundingCost: 50, repCost: 0, maxPerCrew: 3, conditions: ["Dr. Pamela Lillian Isley"], effects: ["On casualty, contact models take 🩸 if fail Endurance."] },
    { name: "Mutation Serum", fundingCost: 200, repCost: 3, maxPerCrew: 1, conditions: ["Dr. Pamela Lillian Isley", "Model has Plant trait cannot purchase"], effects: ["Model gains Tough Skin and Desensitized traits."] },
    { name: "Modified Pheromones", fundingCost: 150, repCost: 5, maxPerCrew: 1, conditions: ["Dr. Pamela Lillian Isley", "Model has Plant trait cannot purchase"], targetModels: ["Leader", "Sidekick", "Free Agent"], effects: ["Control Pheromones targets 2 enemies."] },
    { name: "Ancient Plants", fundingCost: 200, repCost: 40, maxPerCrew: 1, conditions: ["Dr. Pamela Lillian Isley", "Only Plants"], effects: ["Invulnerability (1), Tough Skin, +1 skills (except Endurance), +3 Endurance, 6\" action radius."], isUnaffectedByBroken: true },
    { name: "Watch Tower", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Barbara Gordon"], targetModels: ["Barbara Gordon"], effects: ["Model gains Exhaustive Planner rule."] },
    { name: "Radio", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Barbara Gordon"], effects: ["Always within Boss's Inspire range."] },
    { name: "Pitch Perfect Vocals", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Dinah Lance"], targetModels: ["Dinah Lance"], effects: ["Model gains the Mixed Combat Style trait."] },
    { name: "Passage", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Alec Holland"], effects: ["Model gains the Undercover rule."] }
  ],
  "Organized Crime": [
    { name: "Magazine", fundingCost: 150, repCost: 0, maxPerCrew: 3, conditions: [], effects: ["+1 to Ammunition for one weapon."] },
    { name: "Bribe", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Informer trait."] },
    { name: "Kevlar Vest", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Kevlar Vest trait."] },
    { name: "Grapple-gun", fundingCost: 250, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Grapple-gun trait."] },
    { name: "C4", fundingCost: 250, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Explosive Gel trait."] },
    { name: "Gas Mask", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Gas Mask trait."] },
    { name: "Silencer", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["One ranged weapon gains the Silencer trait."] },
    { name: "Brass Knuckles", fundingCost: 100, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["Model gains the Reinforced Gloves trait."] },
    { name: "The Cleaner", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Draw 1 Objective card on revealing enemy Suspect."] },
    { name: "Backpack", fundingCost: 100, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["Model gains the Backpack trait."] },
    { name: "Family", fundingCost: 150, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["Model gains the Mobster trait."] },
    { name: "Rusty Tools", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Cruel trait."] },
    { name: "Planted Evidence", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Model has Cop trait"], effects: ["Model gains the Evidence Tampering trait."] },
    { name: "Abuse the Badge", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: ["Model has Cop trait"], effects: ["Model gains the Interrogation trait."] },
    { name: "Psychotic", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: ["Roman Sionis"], targetModels: ["Black Mask"], effects: ["Gain Protect Me! rule."] },
    { name: "Mob Payroll", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Carmine Falcone"], targetModels: ["Carmine Falcone"], effects: ["Model gains the Corrupt trait."] },
    { name: "Long Guns", fundingCost: 0, repCost: 0, maxPerCrew: 1, conditions: ["Salvatore Maroni"], effects: ["Up to 3 Henchmen weapons get Medium Range."] },
    { name: "Mafia", fundingCost: 100, repCost: 0, maxPerCrew: 2, conditions: ["Arnold Wesker"], effects: ["Model gains the Criminal trait."] },
    { name: "Broken Equipment", fundingCost: 250, repCost: 0, maxPerCrew: 1, conditions: ["Jervis Tetch"], effects: ["Disables one enemy equipment pre-game."] },
    { name: "Weird Device", fundingCost: 200, repCost: 0, maxPerCrew: 2, conditions: ["Jervis Tetch"], effects: ["Model gains the Goad trait."] },
    { name: "Trained Mind", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: ["Jervis Tetch"], effects: ["Model gains Desensitized rule."] },
    { name: "Rhyme with Me", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Jervis Tetch"], effects: ["Model gains Disarray rule."] },
    { name: "Masks of Wonderland", fundingCost: 200, repCost: 0, maxPerCrew: 3, conditions: ["Jervis Tetch"], effects: ["Choose one mask: Queen of Hearts (Assassin 1, Order), White Rabbit (Fast, Tireless), Cheshire Cat (Stealth, Climbing Claws)."] },
    { name: "Advanced Weaponry", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Alexander Joseph Luthor"], effects: ["One ranged weapon gains Accurate trait."] }
  ],
  "Scarecrow": [
    { name: "Magazine", fundingCost: 200, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["+1 to Ammunition for one weapon."] },
    { name: "Apparition", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Model has Nightmare trait cannot purchase"], effects: ["Model gains the Apparition trait."] },
    { name: "Handcuffs", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: ["Model has Nightmare trait cannot purchase"], effects: ["Model gains the Arrest trait."] },
    { name: "Neurotoxic Drugs", fundingCost: 300, repCost: 0, maxPerCrew: 1, conditions: ["Model has Nightmare trait cannot purchase"], effects: ["+2 Movement and Dodge traits."] },
    { name: "Fear Advantage", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Only Arkham Asylum Dr."], effects: ["This model may use the Protect Me! Trait on a friendly model with the Nightmare trait without the need of performing an Effort."] },
    { name: "Intensive Treatment", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: ["Only Arkham Asylum Dr."], effects: ["Model gains the Intensive Treatment trait."] },
    { name: "Disposable Nightmare", fundingCost: 150, repCost: 0, maxPerCrew: 2, conditions: ["Model has Nightmare trait"], effects: ["Model gains the Disposable Nightmare trait. When this model is removed, Discard a card from your deck."] },
    { name: "Terror Invigoration", fundingCost: 200, repCost: 0, maxPerCrew: 2, conditions: ["Model has Nightmare trait"], effects: ["Model gains the Terror Invigoration trait. This model may throw X additional dice when taking Attack and Defense rolls (X is the number of cards in your Terror Pile)."] },
    { name: "Fear Dampening", fundingCost: 300, repCost: 0, maxPerCrew: 1, conditions: ["Model has Nightmare trait"], effects: ["Model gains the Fear Dampening trait."] },
    { name: "Terrible Visage", fundingCost: 200, repCost: 0, maxPerCrew: 2, conditions: ["Model has Nightmare trait"], effects: ["Model gains the Terrible Visage trait."] },
    { name: "Intense Fear", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Alias: Scarecrow in crew"], effects: ["Model gains the Intense Fear trait."] },
    { name: "Working in Advance", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Alias: Dr. Friitawa in crew"], effects: ["Model gains the Working in Advance trait."] }
  ],
  "Royal Flush": [
    { name: "Magazine", fundingCost: 200, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["+1 to Ammunition for one weapon."] },
    { name: "Halt!", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Stop! trait."] },
    { name: "Comrades", fundingCost: 150, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["Model gains Teamwork (1) (Spades, Clubs, Diamonds, Hearts)."] },
    { name: "Royal Communication Device", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Radio trait."] },
    { name: "Grapple Gun", fundingCost: 250, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Grapple Gun trait."] },
    { name: "Royal Medic", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Medic trait."] },
    { name: "Familiar with the Subject", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["When placing Suspect within 4\" of enemy, search for same Suit card."] },
    { name: "Levy's Work", fundingCost: 150, repCost: 0, maxPerCrew: 2, conditions: ["Model has For My Lords! trait"], effects: ["Activate 2nd time, then suffer 🩸🩸."] },
    { name: "The Good King", fundingCost: 400, repCost: 0, maxPerCrew: 1, conditions: [], targetModels: ["Leader"], effects: ["Model gains the Leadership trait."] },
    { name: "King's Call", fundingCost: 300, repCost: 0, maxPerCrew: 1, conditions: [], targetModels: ["Leader"], effects: ["Place removed For My Lords! model; opponent gains Pass."] },
    { name: "Last Service", fundingCost: 300, repCost: 0, maxPerCrew: 1, conditions: [], targetModels: ["Sidekick"], effects: ["On friendly casualty within 8\"/LoS, search Objective deck."] },
    { name: "Punchline's Toys", fundingCost: 100, repCost: 0, maxPerCrew: 2, conditions: ["Punchline"], effects: ["Model gains the Poison Device trait."] },
    { name: "Poison Training", fundingCost: 250, repCost: 0, maxPerCrew: 1, conditions: ["Punchline"], targetModels: ["Punchline"], effects: ["Model gains the Poison Master trait."] }
  ],
  "Suicide Squad": [
    { name: "Airborne Deployment", fundingCost: 300, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["Reserve one model; deploy round 2+ on board edge."] },
    { name: "Aerial Locator System", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Once per game, illuminate target model as Lantern."] },
    { name: "Magazine", fundingCost: 300, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["+1 to Ammunition for one weapon."] },
    { name: "Back on Track", fundingCost: 150, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["Reset Task counter with Cranial Bomb."] },
    { name: "Right Motivation", fundingCost: 200, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["Free Manipulate action if no Task counter."] },
    { name: "Modified Pheromone", fundingCost: 100, repCost: 0, maxPerCrew: 2, conditions: ["Poison Ivy", "Model has Control Pheromones trait"], effects: ["Enhances Control Pheromones (details in desc)."] },
    { name: "Father Teamwork", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: ["Deathstroke Vanguard Team"], targetModels: ["Deathstroke Vanguard Team"], effects: ["Teamwork (1) (Ravager (Vanguard Team))."] },
    { name: "Daughter Teamwork", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: ["Ravager Vanguard Team"], targetModels: ["Ravager Vanguard Team"], effects: ["Teamwork (1) (Deathstroke (Vanguard Team))."] }
   ]

};

const models = [
  {
    "name": "Batman Bushi",
    "realname": "Bruce Wayne",
    "base": "40mm",
    "rep": 105,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["GCPD"],
    "img": "img/BatmanBushi.png",
    "stats": {
      "Attack": 5,
      "Defense": 5,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": [
      "Always on the Move",
      "Battle Meditation",
      "Bushido Bat-Armor",
      "Challenge",
      "Detective",
      "Feint",
      "Honor",
      "Reinforced Gloves",
      "Sturdy"
    ],
    "weapons": [
      {
        "name": "Katana",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Sharp"
      }
    ]
  },

//New Models 18.05

  {
    "name": "The Penguin Crime Lord Rising",
    "realname": "Oswald Chesterfield Cobblepot",
    "base": "40mm",
    "rep": 74,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Penguin"],
    "img": "img/ThePenguinCrimeLordRising.png",
    "stats": {
      "Attack": "3",
      "Defense": "3",
      "Strength": "5+",
      "Movement": "8",
      "Willpower": "7",
      "Endurance": "7"
    },
    "traits": [
      "Business Agent",
      "Criminal Bonds",
      "Drop It!",
      "Empire of Lies",
      "Handyman",
      "Manipulative",
      "Tough Guy",
      "Underworld King",
      "Protect Me!"
    ],
    "weapons": [
      {
        "name": "SMG",
        "damage": "🩸🩸",
        "rof": "4",
        "ammo": "2",
        "traits": "Firearm / S. Range"
      },
      {
        "name": "Torture Tools",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Steal"
      }
    ]
  },

//New Models 20.04

  {
    "name": "Harley Quinn Arkham Knight",
    "realname": "Dr. Harleen Frances Quinzel",
    "base": "40mm",
    "rep": 80,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Joker"],
    "img": "img/HarleyQuinnArkhamKnight.png",
    "stats": {
      "Attack": "4",
      "Defense": "4",
      "Strength": "5+",
      "Movement": "13",
      "Willpower": "7",
      "Endurance": "7"
    },
    "traits": [
      "Acrobat",
      "Coordination",
      "Escape Artist",
      "Harley's Revenge",
      "Mobster",
      "Play Nice!",
      "Protect Me!",
      "Unpredictable"
    ],
    "weapons": [
      {
        "name": "SMG",
        "damage": "🩸🩸",
        "rof": "4",
        "ammo": "2",
        "traits": "Firearm / S. Range"
      },
      {
        "name": "Reinforced Bat",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Heavy"
      }
    ]
  },
  
  
  {
    "name": "Warden Sharp",
    "realname": "Quincy Ulysses Sharp",
    "base": "30mm",
    "rep": 50,
    "funding": 0,
    "rank": ["Leader", "Sidekick"],
    "faction": ["League of Shadows", "GCPD"],
    "img": "img/WardenSharp.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 8,
      "Endurance": 6
    },
    "traits": [
      "Arkham Asylum's Warden",
      "Protect Me!",
      "Business Agent",
      "Corrupt",
      "Crucial Information",
      "Informer",
      "Lieutenant (Ra's Al Ghul)"
    ],
    "weapons": []
  },
  {
    "name": "Damien Darhk",
    "realname": "Damien Darhk",
    "base": "30mm",
    "rep": 85,
    "funding": 200,
    "rank": ["Free Agent"],
    "faction": ["Unknown"],
    "rivals": ["Bat Family", "GCPD"],
    "img": "img/DamienDarhk.png",
    "stats": {
      "Attack": 4,
      "Defense": 5,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Aversion (Ra's Al Ghul)",
      "Hidden Boss",
      "Immortal",
      "Khushu Idol",
      "Life-Force Absorption (Spell)",
      "Magical Power (4)",
      "Magical Telekinesis (Spell)",
      "Self-Discipline",
      "Telepathy (Spell)"
    ],
    "weapons": [
      {
        "name": "Cardistry",
        "damage": "🩸",
        "rof": "2",
        "ammo": "2",
        "traits": "Bleed (2) / S. Range / Sharp / Throwing"
      },
      {
        "name": "Magical Strength",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Devastating / Magic"
      }
    ]
  },
 
  {
    "name": "Jokermobile Arkham Knight",
    "realname": "Unknown",
    "base": "90mm",
    "rep": 130,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Joker"],
    "img": "img/JokermobileArkhamKnight.png",
    "stats": {
      "Attack": 4,
      "Defense": 3,
      "Strength": "3+",
      "Movement": 12,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": [
      "Combat Mode",
      "Ejection System",
      "Heavy Armor",
      "Huge",
      "Kaos Agent",
      "Lantern",
      "Shock Armor",
      "Vehicle"
    ],
    "weapons": [
      {
        "name": "Gomm Cannon",
        "damage": "🩸🩸🩸🩸",
        "rof": 1,
        "ammo": 2,
        "traits": "Anti-Tank / Bleed (2) / Firearm"
      },
      {
        "name": "Missile Barrage",
        "damage": "🩸🩸",
        "rof": 2,
        "ammo": 1,
        "traits": "Firearm / Imprecise / M. Range"
      }
    ]
  },

  {
    "name": "Harley Quinn Gatling Brute",
    "realname": "Unknown",
    "base": "40mm",
    "rep": 49,
    "funding": 850,
    "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/HarleyQuinnGatlingBrute.png",
    "stats": {
      "Attack": "3",
      "Defense": "3",
      "Strength": "4+",
      "Movement": "8",
      "Willpower": "5",
      "Endurance": "7"
    },
    "traits": [
      "Ferocious",
      "Hardened",
      "Harley's Revenge",
      "Large",
      "Lieutenant (Harley Quinn Arkham Knight)",
      "Street Guy",
      "Tireless"
    ],
    "weapons": [
      {
        "name": "Vulcan M61",
        "damage": "🩸🩸🩸",
        "rof": "4",
        "ammo": "2",
        "traits": "Anti-Tank / Firearm / Imprecise / M. Range"
      },
      {
        "name": "Elbow Smash",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Overwhelming"
      }
    ]
  },
  {
    "name": "Nightwing Arkham Knight",
    "realname": "Dick Grayson",
    "base": "40mm",
    "rep": 95,
    "funding": 0,
    "rank": ["Sidekick"],
    "faction": ["Bat Family"],
    "img": "img/NightwingArkhamKnight.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 13,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Acrobat",
      "Bat Family",
      "Batclaw",
      "Charismatic",
      "Combo (Electric Baton)",
      "Electric Storm",
      "Reflexes",
      "Sneak Attack",
      "Sneak Attack Takedown",
      "Teamwork (2) (ALL)"
    ],
    "weapons": [
      {
        "name": "Wingdings",
        "damage": "★★",
        "rof": "2",
        "ammo": "3",
        "traits": "Light / S. Range / Throwing"
      },
      {
        "name": "Electric Baton",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Electric / Handy / Mechanical"
      }
    ]
  },
  

  {
    "name": "Poison Ivy Arkham City",
    "realname": "Dr. Pamela Lillian Isley",
    "base": "30mm",
    "rep": 101,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Birds of Prey"],
    "img": "img/PoisonIvyArkhamCity.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "5+",
      "Movement": 11,
      "Willpower": 8,
      "Endurance": 7
    },
    "traits": [
      "Acrobat",
      "Chlorokinesis",
      "Control Pheromones",
      "Elite Boss (Plants)",
      "Mortal Kiss",
      "Poison Immunity",
      "Possessed",
      "Scientific"
    ]
  },
  {
    "name": "Batman Dark Knight Rises",
    "realname": "Bruce Wayne",
    "base": "30mm",
    "rep": 120,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["GCPD"],
    "img": "img/BatmanDarkKnightRises.png",
    "stats": {
      "Attack": 4,
      "Defense": 5,
      "Strength": "3+",
      "Movement": 12,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": [
      "Arrest",
      "Bat Cape",
      "Bat-Armor MK II",
      "Batclaw/Grapple Gun",
      "Combo (Unarmed)",
      "Dark Knight",
      "Detective",
      "Master of Stealth",
      "Reinforced Gloves",
      "Shadows Agent",
      "Sneak Attack"
    ],
    "weapons": [
    {
        "name": "Batlings",
        "damage": "★★",
        "rof": "2",
        "ammo": "2",
        "traits": "Light / S. Range / Throwing"
      }
    ]
  },
  
  
  {
    "name": "Harley Thug 1",
    "realname": "Punker",
    "base": "30mm",
    "rep": 28,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/HarleyThug1.png",
    "stats": {
      "Attack": "3",
      "Defense": "2",
      "Strength": "5+",
      "Movement": "8",
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Goad",
      "Hardened",
      "Harley's Revenge",
      "Street Guy"
    ],
    "weapons": [
      {
        "name": "Chainsaw",
        "damage": "🩸🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Mechanical / Sharp"
      }
    ]
  },
    {
    "name": "Harley Thug 2",
    "realname": "Bragg",
    "base": "30mm",
    "rep": 19,
    "funding": 200,
    "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/HarleyThug2.png",
    "stats": {
      "Attack": "3",
      "Defense": "2",
      "Strength": "5+",
      "Movement": "8",
      "Willpower": 4,
      "Endurance": 5
    },
    "traits": [
      "Harley's Revenge",
      "Street Guy"
    ],
    "weapons": [
      {
        "name": "Sawed Off Shotgun",
        "damage": "🩸★",
        "rof": "1",
        "ammo": "2",
        "traits": "Expansive / Firearm"
      }
    ]
  },
  
    {
    "name": "Harley Thug 3",
    "realname": "Worker",
    "base": "30mm",
    "rep": 19,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/HarleyThug3.png",
    "stats": {
      "Attack": "3",
      "Defense": "2",
      "Strength": "5+",
      "Movement": "8",
      "Willpower": 4,
      "Endurance": 5
    },
    "traits": [
      "Harley's Revenge",
      "Street Guy"
    ],
    "weapons": [
      {
        "name": "Jackhammer",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Enervating (2) / Mechanical"
      }
    ]
  },
  
    {
    "name": "Harley Thug 4",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 14,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/HarleyThug4.png",
    "stats": {
      "Attack": "3",
      "Defense": "2",
      "Strength": "5+",
      "Movement": "8",
      "Willpower": 4,
      "Endurance": 5
    },
    "traits": [
      "Harley's Revenge",
      "Street Guy"
    ],
    "weapons": [
      {
        "name": "Train Wrench",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Heavy"
      }
    ]
  },
  
  {
    "name": "Harley Thug 5",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 20,
    "funding": 250,
    "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/HarleyThug5.png",
    "stats": {
      "Attack": 3,
      "Defense": 2,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": "5"
    },
    "traits": [
      "Harley's Revenge",
      "Street Guy"
    ],
    "weapons": [
      {
        "name": "RPG",
        "damage": "🩸🩸🩸",
        "rof": "1",
        "ammo": "2",
        "traits": "Anti-Tank / Firearm / Imprecise / Reload"
      }
    ]
  },
    {
    "name": "Harley Thug 6",
    "realname": "Chencho",
    "base": "30mm",
    "rep": 23,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/HarleyThug6.png",
    "stats": {
      "Attack": "3",
      "Defense": "2",
      "Strength": "5+",
      "Movement": "8",
      "Willpower": "5",
      "Endurance": "7"
    },
    "traits": [
      "Adaptable",
      "Combo (Bat)",
      "Harley's Revenge",
      "Street Guy"
    ],
    "weapons": [
      {
        "name": "Bat",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Heavy"
      }
    ]
  },
  {
    "name": "Harley Thug 7",
    "realname": "Lumberjack",
    "base": "30mm",
    "rep": 18,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/HarleyThug7.png",
    "stats": {
      "Attack": 3,
      "Defense": 2,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": "4",
      "Endurance": "5"
    },
    "traits": [
      "Harley's Revenge",
      "Street Guy"
    ],
    "weapons": [
      {
        "name": "Axe",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Heavy"
      }
    ]
  },
  
  {
    "name": "Batmobile Arkham Knight",
    "realname": "Bruce Wayne",
    "base": "90mm",
    "rep": 160,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Bat Family", "GCPD"],
    "img": "img/BatmobileArkhamKnight.png",
    "stats": {
      "Attack": "4",
      "Defense": "3",
      "Strength": "3+",
      "Movement": "12",
      "Willpower": "8",
      "Endurance": "8"
    },
    "traits": [
      "Combat Mode",
      "Ejection System",
      "Heavy Armor",
      "Huge",
      "Lantern",
      "Non-Lethal Ammo",
      "Shock Armor",
      "Vehicle"
    ],
    "weapons": [
      {
        "name": "Gomm Cannon",
        "damage": "🩸🩸🩸🩸",
        "rof": "1",
        "ammo": "2",
        "traits": "Anti-Tank / Bleed (2) / Firearm"
      },
      {
        "name": "Missile Barrage",
        "damage": "🩸🩸",
        "rof": "2",
        "ammo": "1",
        "traits": "Firearm / Imprecise / M. Range"
      }
    ]
  },
  
  {
    "name": "Catwoman Dark Knight Rises",
    "realname": "Selina Kyle",
    "base": "30mm",
    "rep": 64,
    "funding": 300,
    "rank": ["Free Agent"],
    "faction": ["GCPD", "Unknown"],
    "rivals": ["Bat Family"],
    "img": "img/CatwomanDarkKnightRises.png",
    "stats": {
      "Attack": "4",
      "Defense": "5",
      "Strength": "5+",
      "Movement": "13",
      "Willpower": "6",
      "Endurance": "6"
    },
    "traits": [
      "Acrobat",
      "Climbing Claws",
      "Night Vision",
      "Pickpocket",
      "Required (Batman Dark Knight Rises or Bane Dark Knight Rises)",
      "Sneak Attack",
      "Undercover",
      "Drop It!"
    ],
    "weapons": [
      {
        "name": "Automatic Gun",
        "damage": "🩸★",
        "rof": "3",
        "ammo": "2",
        "traits": "Firearm / Light / S. Range"
      },
      {
        "name": "Heels",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      }
    ]
  },
  {
    "name": "Batman Arkham Knight",
    "realname": "Bruce Wayne",
    "base": "40mm",
    "rep": 150,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Bat Family", "GCPD"],
    "img": "img/BatmanArkhamKnight.png",
    "stats": {
      "Attack": 5,
      "Defense": 5,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": [
      "Bat-Armor MK III",
      "Bat Cape",
      "Bat Family",
      "Batclaw",
      "Detective",
      "Detective Mode",
      "Disruptor",
      "Explosive Gel",
      "Sneak Attack",
      "Sneak Attack Takedown",
      "Teamwork (2)(ALL)",
      "Total Vision"
    ],
    "weapons": [
      {
        "name": "Batarang",
        "damage": "★★",
        "rof": "2",
        "ammo": "2",
        "traits": "M. Range / Remote Controlled / Throwing"
      },
      {
        "name": "Bat-Armor Gauntlets",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Accurate / Red Dot"
      }
    ]
  },
  {
    "name": "Batman Arkham City",
    "realname": "Bruce Wayne",
    "base": "60mm",
    "rep": 125,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Bat Family", "GCPD"],
    "img": "img/BatmanArkhamCity.png",
    "stats": {
      "Attack": 5,
      "Defense": 5,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": [
      "Bat Cape",
      "Bat Family",
      "Bat-Armor MKI",
      "Batclaw",
      "Counter Attack",
      "Detective",
      "Detective Mode",
      "Explosive Gel",
      "Mixed Combat Style",
      "Reinforced Gloves",
      "Sneak Attack",
      "Total Vision"
    ],
    "weapons": [
      {
        "name": "Batarang",
        "damage": "★★",
        "rof": "2",
        "ammo": "2",
        "traits": "M. Range / Remote Controlled / Throwing"
      },
      {
        "name": "Smoke Pellets",
        "damage": "-",
        "rof": "1",
        "ammo": "1",
        "traits": "Grenade / S. Range / Smoke"
      }
    ]
  },
  {
    "name": "Miranda Tate",
    "realname": "Tala Al Ghul",
    "base": "30mm",
    "rep": 50,
    "funding": 0,
    "rank": ["Sidekick"],
    "faction": ["Bane"],
    "img": "img/MirandaTate.png",
    "stats": {
      "Attack": "4",
      "Defense": "4",
      "Strength": "4+",
      "Movement": "10",
      "Willpower": "7",
      "Endurance": "6"
    },
    "traits": [
      "Charm",
      "Disguised Sneak Attack",
      "Millionaire",
      "Scheming (3)",
      "Shady Dealings",
      "True Love (Bane)",
      "Undercover"
    ],
    "weapons": [
      {
        "name": "Knife",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      }
    ]
  },
  
  {
    "name": "Green Arrow (Arrow)",
    "realname": "Oliver Queen",
    "base": "30mm",
    "rep": 120,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["GCPD"],
    "img": "img/GreenArrowArrow.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "3+",
      "Movement": 12,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": [
      "Acrobat",
      "Counter Attack",
      "Dirty Fighter",
      "Good Aim",
      "Grapple Gun",
      "Master Marksman",
      "Rapid Fire",
      "Shadowed Nightmare",
      "Stealth",
      "You Have Failed This City"
    ],
    "weapons": [
      {
        "name": "Bow Standard Arrows",
        "damage": "🩸🩸",
        "rof": 1,
        "ammo": 3,
        "traits": "Acceleration / Aim / Mechanical"
      },
      {
        "name": "Bow Multi Arrows",
        "damage": "🩸🩸",
        "rof": 3,
        "ammo": 1,
        "traits": "Acceleration / Aim / Mechanical / One Use"
      }
    ]
  },

  {
    "name": "Arkham Knight",
    "realname": "Jason Todd",
    "base": "40mm",
    "rep": 105,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Bane"],
    "img": "img/ArkhamKnight.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 13,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Acrobat",
      "Agile",
      "Gotham's Finished",
      "Kevlar Vest",
      "Martial Artist",
      "Rapid Fire",
      "Undercover",
      "Vanish",
      "Veteran"
    ],
    "weapons": [
      {
        "name": "Combined Sniper Guns MKII",
        "damage": "🩸🩸🩸",
        "rof": "2",
        "ammo": "2",
        "traits": "Aim / Firearm / M. Range / Scope"
      },
      {
        "name": "EM Smoke Grenades",
        "damage": "★",
        "rof": "1",
        "ammo": "2",
        "traits": "Electric / Explosive / Grenade / Light / Mechanical / S. Range / Smoke"
      }
    ]
  },
  {
    "name": "Mad Hatter Arkham Knight",
    "realname": "Jervis Tech",
    "base": "30mm",
    "rep": 70,
    "funding": 200,
    "rank": ["Free Agent"],
    "faction": ["Unknown"],
    "rivals": ["Bat Family", "GCPD"],
    "img": "img/MadHatterArkhamKnight.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 7,
      "Endurance": 6
    },
    "traits": [
      "Be My Alice",
      "Charm",
      "Handyman",
      "Mastermind",
      "Mind Control Device",
      "Small",
      "Wonderland"
    ],
    "weapons": [
      {
        "name": "Cal 0.60 Gun",
        "damage": "🩸🩸🩸",
        "rof": "1",
        "ammo": "2",
        "traits": "Firearm / Push (2) / S. Range"
      }
    ]
  },

//New Models

{
  "name": "Rebel Armored Assassin",
  "realname": "Unknown",
  "base": "30mm",
  "rep": 35,
  "funding": 200,
  "rank": ["Henchman"],
  "faction": ["League of Shadows"],
  "img": "img/RebelArmoredAssassin.png",
  "stats": {
    "Attack": 3,
    "Defense": 4,
    "Strength": "5+",
    "Movement": 10,
    "Willpower": 5,
    "Endurance": 5
  },
  "traits": [
    "Assassin (2)",
    "Elite (Rebel)",
    "Light Armor",
    "Martial Artist",
    "Shadowed Nightmare",
    "Tireless"
  ],
  "weapons": [
    {
      "name": "Katana",
      "damage": "🩸🩸",
      "rof": "-",
      "ammo": "-",
      "traits": "Handy / Sharp"
    },
    {
      "name": "Kunai",
      "damage": "🩸",
      "rof": 3,
      "ammo": 2,
      "traits": "S. Range / Sharp / Throwing"
    }
  ]
},
{
  "name": "Rebel Masked Assassin 2",
  "realname": "Unknown",
  "base": "30mm",
  "rep": 28,
  "funding": 0,
  "rank": ["Henchman"],
  "faction": ["League of Shadows"],
  "img": "img/RebelMaskedAssassin2.png",
  "stats": {
    "Attack": 3,
    "Defense": 4,
    "Strength": "5+",
    "Movement": 10,
    "Willpower": 5,
    "Endurance": 5
  },
  "traits": [
    "Assassin (2)",
    "Demon Mask (Inspire Fear)",
    "Elite (Rebel)",
    "Martial Artist",
    "Shadowed Nightmare"
  ],
  "weapons": [
    {
      "name": "Nunchaku",
      "damage": "★",
      "rof": "-",
      "ammo": "-",
      "traits": "Defensive / Handy / Heavy"
    }
  ]
},
{
  "name": "Rebel Monk",
  "realname": "Unknown",
  "base": "40mm",
  "rep": 35,
  "funding": 0,
  "rank": ["Henchman"],
  "faction": ["League of Shadows"],
  "img": "img/RebelMonk.png",
  "stats": {
    "Attack": 3,
    "Defense": 3,
    "Strength": "4+",
    "Movement": 8,
    "Willpower": 4,
    "Endurance": 5
  },
  "traits": [
    "Adaptable",
    "Demon Mask (Inspire Fear)",
    "Desensitized",
    "Elite (Rebel)",
    "Martial Artist",
    "Self-Discipline"
  ],
  "weapons": [
    {
      "name": "Finesse",
      "damage": "★★",
      "rof": "-",
      "ammo": "-",
      "traits": "Handy"
    }
  ]
},
{
  "name": "Rebel Masked Assassin 1",
  "realname": "Unknown",
  "base": "30mm",
  "rep": 35,
  "funding": 150,
  "rank": ["Henchman"],
  "faction": ["League of Shadows"],
  "img": "img/RebelMaskedAssassin1.png",
  "stats": {
    "Attack": 3,
    "Defense": 4,
    "Strength": "5+",
    "Movement": 10,
    "Willpower": 5,
    "Endurance": 5
  },
  "traits": [
    "Assassin (2)",
    "Demon Mask (Inspire Fear)",
    "Elite (Rebel)",
    "Martial Artist",
    "Shadowed Nightmare"
  ],
  "weapons": [
    {
      "name": "Katana",
      "damage": "🩸🩸",
      "rof": "-",
      "ammo": "-",
      "traits": "Handy / Sharp"
    },
    {
      "name": "Kunai",
      "damage": "🩸",
      "rof": 3,
      "ammo": 2,
      "traits": "S. Range / Sharp / Throwing"
    }
  ]
},
{
  "name": "Shadow Armored Assassin",
  "realname": "Unknown",
  "base": "30mm",
  "rep": 32,
  "funding": 0,
  "rank": ["Henchman"],
  "faction": ["League of Shadows"],
  "img": "img/ShadowArmoredAssassin.png",
  "stats": {
    "Attack": 3,
    "Defense": 3,
    "Strength": "5+",
    "Movement": 12,
    "Willpower": 4,
    "Endurance": 5
  },
  "traits": [
    "Agile",
    "Assassin (3)",
    "Concealment",
    "Light Armor",
    "Martial Artist",
    "Shadowed Nightmare"
  ],
  "weapons": [
    {
      "name": "Katana",
      "damage": "🩸🩸",
      "rof": "-",
      "ammo": "-",
      "traits": "Handy / Sharp"
    }
  ]
},
{
  "name": "Armored Assassin",
  "realname": "Unknown",
  "base": "30mm",
  "rep": 29,
  "funding": 200,
  "rank": ["Henchman"],
  "faction": ["League of Shadows"],
  "img": "img/ArmoredAssassin.png",
  "stats": {
    "Attack": 3,
    "Defense": 3,
    "Strength": "5+",
    "Movement": 10,
    "Willpower": 4,
    "Endurance": 5
  },
  "traits": [
    "Assassin (2)",
    "Light Armor",
    "Martial Artist",
    "Obstinate",
    "Shadowed Nightmare"
  ],
  "weapons": [
    {
      "name": "Katana",
      "damage": "🩸🩸",
      "rof": "-",
      "ammo": "-",
      "traits": "Handy / Sharp"
    },
    {
      "name": "Kunai",
      "damage": "🩸",
      "rof": 3,
      "ammo": 2,
      "traits": "S. Range / Sharp / Throwing"
    }
  ]
},
{
  "name": "Guardian Monk",
  "realname": "Unknown",
  "base": "40mm",
  "rep": 52,
  "funding": 0,
  "rank": ["Henchman"],
  "faction": ["League of Shadows"],
  "img": "img/GuardianMonk.png",
  "stats": {
    "Attack": 3,
    "Defense": 3,
    "Strength": "4+",
    "Movement": 8,
    "Willpower": 6,
    "Endurance": 7
  },
  "traits": [
    "Adaptable",
    "Desensitized",
    "Large",
    "Martial Artist",
    "Precise Blow",
    "Protect the Shadows",
    "Self-Discipline"
  ],
  "weapons": [
    {
      "name": "Finesse",
      "damage": "★★",
      "rof": "-",
      "ammo": "-",
      "traits": "Handy"
    }
  ]
},
{
  "name": "Nyssa al Ghul (Arkham Knight)",
  "realname": "Nyssa Raatko",
  "base": "40mm",
  "rep": 100,
  "funding": 0,
  "rank": ["Leader"],
  "faction": ["League of Shadows"],
  "img": "img/NyssaAlGhulArkhamKnight.png",
  "stats": {
    "Attack": 4,
    "Defense": 4,
    "Strength": "4+",
    "Movement": 10,
    "Willpower": 8,
    "Endurance": 7
  },
  "traits": [
    "Acrobat",
    "Aversion (Ra's al Ghul, Talia al Ghul)",
    "Brawler",
    "Counter Attack",
    "Elite Boss (Rebel)",
    "Leading from the Shadows",
    "Light Armor",
    "Martial Artist",
    "Provoke",
    "Shadowed Nightmare"
  ],
  "weapons": [
    {
      "name": "Mastercrafted Katana",
      "damage": "🩸🩸",
      "rof": "-",
      "ammo": "-",
      "traits": "Devastating / Handy / Sharp"
    },
    {
      "name": "Kunai",
      "damage": "🩸★",
      "rof": 3,
      "ammo": 2,
      "traits": "S. Range / Sharp / Throwing"
    }
  ]
},

  {
    "name": "Henry Ducard",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 108,
    "funding": 0,
    "rank": ["Leader", "Sidekick"],
    "faction": ["League of Shadows"],
    "img": "img/HenryDucard.png",
    "stats": {
      "Attack": 5,
      "Defense": 5,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": [
      "Elite Boss (Ninja)",
      "Grand Strategist",
      "Hidden Boss",
      "Immortal",
      "Martial Artist",
      "Mastermind",
      "Persuasive",
      "Pulling the Strings",
      "Purging Fire",
      "Stealth"
    ],
    "weapons": [
      {
        "name": "Katana & Bracers",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Defensive / Handy / Sharp"
      }
    ],
    "specialRules": {
      "sidekickRequiresRasGhulDecoy": true
    }
  },

    {
    "name": "Raven Trigon's Daughter",
    "realname": "Rachel Roth",
    "base": "60mm",
    "rep": 70,
    "funding": 200,
    "rank": ["Henchman"],
    "faction": ["Bat Family"],
    "img": "img/RavenTrigonDaughter.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 6
    },
    "traits": [
      "Darkness Manipulation (Spell)",
      "Demon",
      "Magical Power (5)",
      "Natural Immunities",
      "Painful Empathy",
      "Regeneration",
      "Soul-Self (Spell)",
      "Teen Titans"
    ],
    "weapons": [
      {
        "name": "Soul's Touch",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Magic / Suggest / Terror"
      },
      {
        "name": "Dark Blast",
        "damage": "🩸",
        "rof": 2,
        "ammo": 3,
        "traits": "Devastating / Magic / Ranged / Terror / Throwing"
      }
    ]
  },
  
   {
    "name": "Ra's al Ghul Decoy",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 46,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["League of Shadows"],
    "img": "img/RasalGhulDecoy.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Distract",
      "Expendable",
      "Final Trial",
      "Martial Artist",
      "No Mercy!!!",
      "Order"
    ],
    "weapons": [
      {
        "name": "Katana",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Sharp"
      }
    ]
  },

  {
  "name": "League of Shadows Ninja 1",
  "realname": "Unknown",
  "base": "30mm",
  "rep": 40,
  "funding": 100,
  "rank": ["Henchman"],
  "faction": ["League of Shadows"],
  "img": "img/LeagueOfShadowsNinja1.png",
  "stats": {
    "Attack": 4,
    "Defense": 4,
    "Strength": "5+",
    "Movement": 10,
    "Willpower": 6,
    "Endurance": 5
  },
  "traits": [
    "Elite (Ninja)",
    "Instinctive Shooting",
    "Martial Artist",
    "Stealth"
  ],
  "weapons": [
    {
      "name": "Katana",
      "damage": "🩸🩸",
      "rof": "-",
      "ammo": "-",
      "traits": "Handy / Sharp"
    },
    {
      "name": "Shuriken",
      "damage": "★★",
      "rof": 2,
      "ammo": 2,
      "traits": "Light / S. Range / Throwing"
    }
  ]
},
{
  "name": "League of Shadows Ninja 3",
  "realname": "Unknown",
  "base": "30mm",
  "rep": 26,
  "funding": 300,
  "rank": ["Henchman"],
  "faction": ["League of Shadows"],
  "img": "img/LeagueOfShadowsNinja3.png",
  "stats": {
    "Attack": 3,
    "Defense": 4,
    "Strength": "5+",
    "Movement": 10,
    "Willpower": 4,
    "Endurance": 5
  },
  "traits": [
    "Elite (Ninja)",
    "Martial Artist",
    "Stealth",
    "Timely Arrival",
    "Tracking"
  ],
  "weapons": [
    {
      "name": "Bow",
      "damage": "🩸🩸",
      "rof": 1,
      "ammo": 3,
      "traits": "Acceleration / Aim"
    },
    {
      "name": "Smoke Arrow",
      "damage": "-",
      "rof": 1,
      "ammo": 1,
      "traits": "Grenade / Smoke"
    }
  ]
},
{
  "name": "Bruce Batman Begins",
  "realname": "Bruce Wayne",
  "base": "30mm",
  "rep": 52,
  "funding": 0,
  "rank": ["Henchman"],
  "faction": ["League of Shadows"],
  "img": "img/BruceBatmanBegins.png",
  "stats": {
    "Attack": 4,
    "Defense": 5,
    "Strength": "3+",
    "Movement": 10,
    "Willpower": 7,
    "Endurance": 9
  },
  "traits": [
    "Elite (Ninja)",
    "Required (Henry Ducard)",
    "Stealth",
    "Deception",
    "The Code"
  ],
  "weapons": [
    {
      "name": "Katana & Bracers",
      "damage": "🩸🩸",
      "rof": "-",
      "ammo": "-",
      "traits": "Defensive / Handy / Sharp"
    }
  ],
  "specialRules": {
    "requiredHenryDucard": true
  }
},
{
  "name": "Gordon Infiltrate",
  "realname": "James W. Gordon",
  "base": "30mm",
  "rep": 40,
  "funding": 300,
  "rank": ["Sidekick"],
  "faction": ["GCPD"],
  "img": "img/GordonInfiltrate.png",
  "stats": {
    "Attack": 3,
    "Defense": 3,
    "Strength": "5+",
    "Movement": 8,
    "Willpower": 6,
    "Endurance": 6
  },
  "traits": [
    "Bulletproof Vest",
    "Cop",
    "Detective",
    "Elite Boss (SWAT)",
    "Groundwork",
    "One of the Boys",
    "Required (Batman Dark Knight Rises)",
    "Timely Arrival",
    "Veteran"
  ],
  "weapons": [
    {
      "name": "Shotgun",
      "damage": "🩸🩸★",
      "rof": 2,
      "ammo": 3,
      "traits": "Assault / Firearm / M. Range"
    }
  ],
  "specialRules": {
    "requiredBatmanDarkKnightRises": true
  }
},
{
  "name": "League of Shadows Ninja 2",
  "realname": "Unknown",
  "base": "30mm",
  "rep": 28,
  "funding": 0,
  "rank": ["Henchman"],
  "faction": ["League of Shadows"],
  "img": "img/LeagueOfShadowsNinja2.png",
  "stats": {
    "Attack": 4,
    "Defense": 4,
    "Strength": "5+",
    "Movement": 10,
    "Willpower": 5,
    "Endurance": 5
  },
  "traits": [
    "Elite (Ninja)",
    "Martial Artist",
    "Protect the Shadows",
    "Stealth",
    "360° Strike"
  ],
  "weapons": [
    {
      "name": "Bo",
      "damage": "★",
      "rof": "-",
      "ammo": "-",
      "traits": "Handy / Reach (2)"
    }
  ]
},


  //---------------------------------------------------------------------------//

  {
    "name": "The Drifter Robert Pattinson",
    "realname": "Bruce Wayne",
    "base": "40mm",
    "rep": 112,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["GCPD"],
    "img": "img/TheDrifterRobertPattinson.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 9
    },
    "traits": [
      "Detective",
      "Disguised Sneak Attack",
      "Investigator",
      "Observation",
      "Reveal the Bat",
      "Shadows Agent",
      "Shady Dealings",
      "Sneaking",
      "Undercover",
      "Vigilante's Work"
    ],
    "weapons": []
  },
  {
    "name": "Batman Year One",
    "realname": "Bruce Wayne",
    "base": "40mm",
    "rep": 121,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["GCPD"],
    "img": "img/BatmanYearOne.png",
    "stats": {
      "Attack": 4,
      "Defense": 5,
      "Strength": "3+",
      "Movement": 12,
      "Willpower": 7,
      "Endurance": 9
    },
    "traits": [
      "Bat Beacon",
      "Bat Cape",
      "Detective",
      "Hidden",
      "Master of Stealth",
      "Reinforced Gloves",
      "Shadows Agent",
      "Sneak Attack",
      "Sturdy",
      "Vigilante's Work"
    ],
    "weapons": [
      {
        "name": "Batlings",
        "damage": "★ ★",
        "rof": 2,
        "ammo": 1,
        "traits": "Short Range / Light / Throwing"
      },
      {
        "name": "Blowgun",
        "damage": "-",
        "rof": 1,
        "ammo": 2,
        "traits": "Short Range / Mechanical / Paralyze / Silencer"
      }
    ]
  },
  {
    "name": "Batman Robert Pattinson",
    "realname": "Bruce Wayne",
    "base": "40mm",
    "rep": 112,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["GCPD"],
    "img": "img/BatmanRobertPattinson.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 9
    },
    "traits": [
      "Ballistic Bat-Armor",
      "Batclaw",
      "Brutal",
      "Detective",
      "I'm Vengeance",
      "Investigator",
      "Reinforced Gloves",
      "Serum Injection (2)",
      "Shadows Agent",
      "Vigilante's Work"
    ],
    "weapons": [
      {
        "name": "Drag Shot",
        "damage": "★",
        "rof": 1,
        "ammo": 1,
        "traits": "Short Range / Mechanical / Pull (4)"
      },
      {
        "name": "Shock Gauntlet",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "CRT (Stunned) / One Use"
      }
    ]
  },
  {
    "name": "Batman on Bike Robert Pattinson",
    "realname": "Bruce Wayne",
    "base": "42x75mm",
    "rep": 112,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["GCPD"],
    "img": "img/BatmanOnBikeRobertPattinson.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "3+",
      "Movement": 12,
      "Willpower": 7,
      "Endurance": 9
    },
    "traits": [
      "Always on the Move",
      "Ballistic Bat-Armor",
      "Detective",
      "Drop It!",
      "Fast (3)",
      "Investigator",
      "Mechanical Mount",
      "Reinforced Gloves",
      "Reveal the Bat",
      "Shadows Agent",
      "Vigilante's Work"
    ],
    "weapons": [
      {
        "name": "Shock Gauntlet",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "CRT (Stunned) / One Use"
      }
    ]
  },
  {
    "name": "Batman 1997",
    "realname": "Bruce Wayne",
    "base": "40mm",
    "rep": 105,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["GCPD"],
    "img": "img/Batman1997.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Arrest",
      "Bat Cape",
      "Bat Credit Card",
      "Bat-Armor MK II",
      "Batclaw/Grapple Gun",
      "Detective",
      "Flying Kick",
      "Sneak Attack",
      "Teamwork (1) (Robin 1997)"
    ],
    "weapons": [
      {
        "name": "Batlings",
        "damage": "★★",
        "rof": 2,
        "ammo": 2,
        "traits": "Light / Short Range / Throwing"
      },
      {
        "name": "Reinforced Attack",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp / Boosted (1)"
      }
    ]
  },
  {
    "name": "Batman Michael Keaton",
    "realname": "Bruce Wayne",
    "base": "40mm",
    "rep": 125,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["GCPD"],
    "img": "img/BatmanMichaelKeaton.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": [
      "360° Strike",
      "Bat Cape",
      "Bat-Armor MK I",
      "Batclaw",
      "Detective",
      "Enhanced Batlings",
      "Hidden",
      "I'm Batman",
      "Martial Artist",
      "Shadows Agent"
    ],
    "weapons": [
      {
        "name": "Batlings",
        "damage": "★★",
        "rof": 2,
        "ammo": 3,
        "traits": "Light / Short Range / Throwing"
      },
      {
        "name": "Expeditious Fighter",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Devastating / Overwhelming"
      }
    ]
  },
  {
    "name": "Batman Red Rain",
    "realname": "Bruce Wayne",
    "base": "40mm",
    "rep": 150,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["GCPD"],
    "img": "img/BatmanRedRain.png",
    "stats": {
      "Attack": 5,
      "Defense": 5,
      "Strength": "2+",
      "Movement": 12,
      "Willpower": 7,
      "Endurance": 9
    },
    "traits": [
      "Bat Cape",
      "Bat-Armor MK I",
      "Claws",
      "Detective",
      "Fly",
      "Leading From The Shadows",
      "Master of Stealth",
      "Shadowed Nightmare",
      "Sneak Attack",
      "Vampire",
      "Vampire Reign"
    ],
    "weapons": [
      {
        "name": "Batlings",
        "damage": "★★",
        "rof": 2,
        "ammo": 2,
        "traits": "Light / Short Range / Throwing"
      }
    ]
  },
  {
    "name": "Batman Adam West",
    "realname": "Bruce Wayne",
    "base": "30mm",
    "rep": 75,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["GCPD"],
    "img": "img/BatmanAdamWest.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 7
    },
    "traits": [
      "Arrest",
      "Batclaw",
      "Detective",
      "Kapow!!!",
      "Millionaire",
      "Reinforced Gloves",
      "Teamwork (2) (Robin Burt Ward)",
      "Veteran"
    ],
    "weapons": [
      {
        "name": "Batlings",
        "damage": "★★",
        "rof": 2,
        "ammo": 2,
        "traits": "Short Range / Throwing"
      },
      {
        "name": "Shark Repellant Bat-Spray",
        "damage": "-",
        "rof": 1,
        "ammo": 1,
        "traits": "Expansive / Enervating (1)"
      }
    ]
  },
  {
    "name": "The White Knight",
    "realname": "Harvey Dent",
    "base": "30mm",
    "rep": 50,
    "funding": 0,
    "rank": ["Sidekick"],
    "faction": ["GCPD"],
    "img": "img/TheWhiteKnight.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 7
    },
    "traits": [
      "Charismatic",
      "Disarray",
      "Disturb",
      "Inspire",
      "Public Resources",
      "Scheming (2)"
    ],
    "weapons": []
  },
  {
    "name": "Aaron Cash",
    "realname": "Aaron Cash",
    "base": "30mm",
    "rep": 58,
    "funding": 150,
    "rank": ["Sidekick"],
    "faction": ["GCPD"],
    "img": "img/AaronCash.png",
    "stats": {
      "Attack": 4,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Aversion (Killer Croc)",
      "Bulletproof Vest",
      "Coordination",
      "Cop",
      "Elite Boss (SWAT)",
      "Hardened",
      "Lantern",
      "Unstoppable"
    ],
    "weapons": [
      {
        "name": "Shotgun",
        "damage": "🩸🩸★",
        "rof": 1,
        "ammo": 3,
        "traits": "Firearm / Medium Range / Assault"
      },
      {
        "name": "Hook",
        "stars": 1,
        "rof": "-",
        "ammo": "-",
        "traits": "Reach (1) / Sharp"
      }
    ]
  },
  {
    "name": "Green Arrow Rebirth",
    "realname": "Oliver Queen",
    "base": "40mm",
    "rep": 95,
    "funding": 300,
    "rank": ["Sidekick"],
    "faction": ["GCPD"],
    "img": "img/GreenArrowRebirth.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 13,
      "Willpower": 7,
      "Endurance": 8
    },
    "traits": [
      "Acrobat",
      "Good Aim",
      "Hardened",
      "Hunter",
      "Master Marksman",
      "Rapid Fire",
      "Teamwork (1) (Black Canary)",
      "The Quiver"
    ],
    "weapons": [
      {
        "name": "Bow (Standard Arrow)",
        "damage": "🩸🩸",
        "rof": 1,
        "ammo": 4,
        "traits": "Mechanical / Aim / Acceleration"
      }
    ]
  },
  {
    "name": "Batman Gaslight",
    "realname": "Bruce Wayne",
    "base": "40mm",
    "rep": 92,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["GCPD"],
    "img": "img/BatmanGaslight.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": [
      "Bat Cape",
      "Batclaw/Grapple Gun",
      "Bonebreaker",
      "Brutal",
      "Detective",
      "Master Fighter",
      "Reinforced Gloves",
      "Scheming (2)",
      "Stealth",
      "Strategist",
      "Truth-Seeker"
    ],
    "weapons": [
      {
        "name": "Throwing Knives",
        "damage": "🩸",
        "rof": 2,
        "ammo": 3,
        "traits": "Light / Sharp / Short Range / Throwing"
      }
    ]
  },

  {
    "name": "Commissioner Gordon",
    "realname": "James W. Gordon",
    "base": "40mm / 60mm",
    "rep": 70,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["GCPD"],
    "img": "img/CommissionerGordon.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Affinity (Batman)",
      "Air Support",
      "Arrest",
      "Bat-Signal",
      "Bulletproof Vest",
      "Commissioner",
      "Cop",
      "Detective",
      "Elite Boss (SWAT)",
      "Take Cover!",
      "Veteran"
    ],
    "weapons": [
      {
        "name": "Automatic Gun",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 2,
        "traits": "Short Range / Firearm / Light"
      }
    ]
  },
  {
    "name": "Robin Burt Ward",
    "realname": "Dick Grayson",
    "base": "30mm",
    "rep": 38,
    "funding": 100,
    "rank": ["Sidekick"],
    "faction": ["GCPD"],
    "img": "img/RobinBurtWard.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 4
    },
    "traits": [
      "Batclaw",
      "Boy Wonder",
      "Detective",
      "It's Mine",
      "One of the Boys",
      "Radio",
      "Required (Batman Adam West)",
      "Teamwork (2) (Batman Adam West)"
    ],
    "weapons": [
      {
        "name": "Batlings",
        "damage": "★★",
        "rof": 2,
        "ammo": 2,
        "traits": "Short Range / Throwing"
      }
    ]
  },

  {
    "name": "Batman Dark Knight Rises Batpod",
    "realname": "Bruce Wayne",
    "base": "42x75mm",
    "rep": 120,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["GCPD"],
    "img": "img/BatmanDarkKnightRisesBatpod.png",
    "stats": {
      "Attack": 3,
      "Defense": 5,
      "Strength": "3+",
      "Movement": 12,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": [
      "Bat-Armor MK II",
      "Batman's Batpod",
      "Detective",
      "Disruptor",
      "ECM",
      "Fast (4)",
      "Master of Stealth",
      "Mechanical Mount",
      "Reinforced Gloves"
    ],
    "weapons": [
      {
        "name": "Machine Guns",
        "damage": "★★",
        "rof": 3,
        "ammo": 2,
        "traits": "Anti-Tank / Firearm / Medium Range / Assault"
      },
      {
        "name": "Rocket Launcher",
        "damage": "★★",
        "rof": 2,
        "ammo": 2,
        "traits": "Explosive / Firearm / Medium Range / Reload"
      }
    ]
  },
  {
    "name": "Chief Mackenzie",
    "realname": "Mackenzie Bock",
    "base": "30mm",
    "rep": 40,
    "funding": 200,
    "rank": ["Sidekick"],
    "faction": ["GCPD"],
    "img": "img/ChiefMackenzie.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Arrest",
      "Cop",
      "Crucial Information",
      "Detective",
      "Public Resources"
    ],
    "weapons": [
      {
        "name": "Automatic Gun",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 3,
        "traits": "Short Range / Firearm / Light"
      }
    ]
  },
  {
    "name": "Robin 1997",
    "realname": "Dick Grayson",
    "base": "40mm",
    "rep": 45,
    "funding": 0,
    "rank": ["Sidekick"],
    "faction": ["GCPD"],
    "img": "img/Robin1997.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 12,
      "Willpower": 6,
      "Endurance": 5
    },
    "traits": [
      "Acrobat",
      "Batclaw/Grapple Gun",
      "Kowabunga!",
      "Light Armor",
      "One of the Boys",
      "Protected Lips",
      "Radio",
      "Reinforced Gloves",
      "Stay in Formation",
      "Teamwork (2) (Batman 1997)"
    ],
    "weapons": [
      {
        "name": "Batlings",
        "damage": "★★",
        "rof": 2,
        "ammo": 2,
        "traits": "Light / Short Range / Throwing"
      }
    ]
  },
 
  {
    "name": "Batman Multiverse",
    "realname": "Bruce Wayne",
    "base": "60mm",
    "rep": 150,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Bat Family", "GCPD"],
    "img": "img/BatmanMultiverse.png",
    "stats": {
      "Attack": 5,
      "Defense": 5,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": [
      "Bat Cape",
      "Bat-Armor MK I",
      "Close Combat Master",
      "Martial Artist",
      "Sneak Attack",
      "Bat Family",
      "Batclaw/Grapple Gun",
      "Detective",
      "Reinforced Gloves"
    ],
    "weapons": [
      {
        "name": "Batlings",
        "damage": "★ ★",
        "rof": 2,
        "ammo": 2,
        "traits": "Light / S. Range / Throwing"
      }
    ]
  },
  {
    "name": "Batman Viking",
    "realname": "Bruce Wayne",
    "base": "40mm",
    "rep": 100,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Bat Family"],
    "img": "img/BatmanViking.png",
    "stats": {
      "Attack": 5,
      "Defense": 5,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 8,
      "Endurance": 9
    },
    "traits": [
      "Bat Cape",
      "Detective",
      "Provoke",
      "Savage Fighter",
      "War Scream",
      "Bat Family",
      "Medium Armor",
      "Reinforced Gloves",
      "Sturdy"
    ],
    "weapons": [
      {
        "name": "Bat-Axes",
        "damage": "🩸 🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Heavy / Enervating (1) / Overwhelming"
      }
    ]
  },
  {
    "name": "Batman Frank Miller on Power Armor",
    "realname": "Bruce Wayne",
    "base": "40mm",
    "rep": 109,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Bat Family", "GCPD"],
    "img": "img/BatmanFrankMillerOnPowerArmor.png",
    "stats": {
      "Attack": 4,
      "Defense": 2,
      "Strength": "2+",
      "Movement": 6,
      "Willpower": 8,
      "Endurance": 9
    },
    "traits": [
      "Bat Family",
      "Obstinate",
      "Power Supply",
      "Street Fighter",
      "Veteran",
      "Welcome to Hell",
      "Detective",
      "Power Armor",
      "Reinforced Gloves",
      "The Dark Knight Returns",
      "War Goes On"
    ],
    "weapons": [
      {
        "name": "Sonic Blaster",
        "damage": "★ ★",
        "rof": 1,
        "ammo": 3,
        "traits": "Expansive / Mechanical / Sonic / CRT (Stunned)"
      }
    ]
  },
  {
    "name": "Batman The Animated Series",
    "realname": "Bruce Wayne",
    "base": "30mm",
    "rep": 80,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Bat Family"],
    "img": "img/BatmanTheAnimatedSeries.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "3+",
      "Movement": 12,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Bat Cape",
      "Batclaw",
      "Detective",
      "Frightening Reputation",
      "Bat Family",
      "Combat Flip",
      "Dodge",
      "Vigilante's Work"
    ],
    "weapons": [
      {
        "name": "Fast Throw",
        "damage": "★ ★",
        "rof": 2,
        "ammo": 2,
        "traits": "S. Range / Throwing / Motion (2) / Light"
      },
      {
        "name": "Bat-Gloves",
        "damage": "★ ★",
        "rof": "-",
        "ammo": "-",
        "traits": "Red Dot / Motion (4)"
      }
    ]
  },
  {
    "name": "Batman",
    "realname": "Bruce Wayne",
    "base": "40mm",
    "rep": 146,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Bat Family", "GCPD"],
    "img": "img/Batman.png",
    "stats": {
      "Attack": 5,
      "Defense": 5,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 9,
      "Endurance": 8
    },
    "traits": [
      "Bat Cape",
      "Bat-Armor MK I",
      "Detective",
      "Martial Artist",
      "Reinforced Gloves",
      "Sneaking",
      "Bat Family",
      "Batclaw",
      "Informer",
      "Master of Stealth",
      "Sneak Attack",
      "The World’s Greatest Detective"
    ],
    "weapons": [
      {
        "name": "Batlings",
        "damage": "★ ★",
        "rof": 2,
        "ammo": 2,
        "traits": "Light / S. Range / Throwing"
      }
    ]
  },
  {
    "name": "Robin Teen Titans",
    "realname": "Dick Grayson",
    "base": "30mm",
    "rep": 50,
    "funding": 0,
    "rank": ["Sidekick", "Free Agent"],
    "faction": ["Bat Family"],
    "img": "img/RobinTeenTitans.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 12,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Acrobat",
      "Charismatic",
      "Detective",
      "Stay in Formation",
      "True Love (Starfire)",
      "Batclaw",
      "Coordination",
      "Leadership",
      "Teen Titans"
    ],
    "weapons": [
      {
        "name": "Batlings",
        "damage": "★ ★",
        "rof": 2,
        "ammo": 3,
        "traits": "Light / S. Range / Throwing"
      },
      {
        "name": "Robin's Bo",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Devastating / Handy / Reach (2)"
      }
    ]
  },
  {
    "name": "Batman The Gotham City Knight",
    "realname": "Bruce Wayne",
    "base": "40mm",
    "rep": 130,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Bat Family", "GCPD"],
    "img": "img/BatmanTheGothamCityKnight.png",
    "stats": {
      "Attack": 5,
      "Defense": 5,
      "Strength": "3+",
      "Movement": 12,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": [
      "Bat Cape",
      "Bat-Armor MK III",
      "Detective",
      "I'm Batman",
      "Reinforced Gloves",
      "Bat Family",
      "Batclaw",
      "Flying Kick",
      "Master of Stealth",
      "Vigilante's Work"
    ],
    "weapons": [
      {
        "name": "Batlings",
        "damage": "★ ★",
        "rof": 2,
        "ammo": 2,
        "traits": "Light / S. Range / Throwing"
      }
    ]
  },
  {
    "name": "Batman Death Metal",
    "realname": "Bruce Wayne",
    "base": "40mm",
    "rep": 150,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Bat Family"],
    "img": "img/BatmanDeathMetal.png",
    "stats": {
      "Attack": 5,
      "Defense": 5,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": [
      "Bat Family",
      "Changing the Tempo",
      "Detective",
      "Legendary Solo",
      "Power Supply",
      "Shockwave",
      "Bat-Armor MK I",
      "Charismatic",
      "Dirty Fighter",
      "One of the Boys",
      "Reinforced Gloves",
      "Undead"
    ],
    "weapons": [
      {
        "name": "Electric Guitar",
        "damage": "★ ★",
        "rof": "-",
        "ammo": "-",
        "traits": "Heavy / Overwhelming"
      },
      {
        "name": "Devastating Riff",
        "damage": "★ ★",
        "rof": 1,
        "ammo": 2,
        "traits": "Expansive / Mechanical / Sonic / Devastating"
      }
    ]
  },
  {
    "name": "Batman Frank Miller on Horse",
    "realname": "Bruce Wayne",
    "base": "60mm",
    "rep": 109,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Bat Family", "GCPD"],
    "img": "img/BatmanFrankMillerOnHorse.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "3+",
      "Movement": 14,
      "Willpower": 8,
      "Endurance": 9
    },
    "traits": [
      "Always on the Move",
      "Bat Family",
      "Detective",
      "Obstinate",
      "The Dark Knight Returns",
      "War Goes On",
      "Animal",
      "Bat-Armor MK I",
      "Let's Ride",
      "Reinforced Gloves",
      "Veteran",
      "Welcome to Hell"
    ],
    "weapons": [
      {
        "name": "Batlings",
        "damage": "★ ★",
        "rof": 2,
        "ammo": 2,
        "traits": "Light / S. Range / Throwing"
      }
    ]
  },
  {
    "name": "Batman Beyond",
    "realname": "Terry McGinnis",
    "base": "40mm",
    "rep": 140,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Bat Family", "GCPD"],
    "img": "img/BatmanBeyond.png",
    "stats": {
      "Attack": 5,
      "Defense": 5,
      "Strength": "3+",
      "Movement": 12,
      "Willpower": 8,
      "Endurance": 7
    },
    "traits": [
      "Acrobat",
      "Bat Family",
      "Detective",
      "Feint",
      "Night Vision",
      "The Tomorrow Knight",
      "Bat Cape",
      "Bat-Armor MK III",
      "Fast (3)",
      "Fly",
      "Street Fighter"
    ],
    "weapons": [
      {
        "name": "Batarang",
        "damage": "★ ★",
        "rof": 2,
        "ammo": 3,
        "traits": "M. Range / Remote Controlled / Throwing"
      },
      {
        "name": "Batsuit's Strength",
        "damage": "★ ★",
        "rof": "-",
        "ammo": "-",
        "traits": "Devastating"
      }
    ]
  },
  {
    "name": "Batman Classic",
    "realname": "Bruce Wayne",
    "base": "40mm",
    "rep": 125,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Bat Family", "GCPD"],
    "img": "img/BatmanClassic.png",
    "stats": {
      "Attack": 5,
      "Defense": 5,
      "Strength": "3+",
      "Movement": 12,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": [
      "Bat Cape",
      "Bat-Armor MK II",
      "Detective",
      "Master Fighter",
      "Reinforced Gloves",
      "Stealth",
      "Bat Family",
      "Batclaw",
      "Groundwork",
      "Obstinate",
      "Sneak Attack",
      "Vigilante's Work"
    ],
    "weapons": [
      {
        "name": "Batlings",
        "damage": "★ ★",
        "rof": 2,
        "ammo": 2,
        "traits": "Light / S. Range / Throwing"
      }
    ]
  },
  {
    "name": "Green Arrow DKR",
    "realname": "Oliver Queen",
    "base": "30mm",
    "rep": 75,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Bat Family", "GCPD"],
    "img": "img/GreenArrowDKR.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 9,
      "Willpower": 7,
      "Endurance": 8
    },
    "traits": [
      "Acrobat",
      "Bat Family",
      "Expert Marksman",
      "Grapple Gun",
      "The Dark Knight Returns",
      "Affinity (Batman)",
      "Desensitized",
      "Good Aim",
      "One-Armed",
      "Veteran"
    ],
    "weapons": [
      {
        "name": "Bow (Standard Arrow)",
        "damage": "🩸🩸🩸",
        "rof": 1,
        "ammo": 3,
        "traits": "Aim / Mechanical / Acceleration"
      },
      {
        "name": "Bow (Kryptonite Arrow)",
        "damage": "🩸🩸🩸🩸",
        "rof": 4,
        "ammo": 1,
        "traits": "Aim / Kryptonite / Mechanical / Acceleration"
      }
    ]
  },
  {
    "name": "Batman Frank Miller",
    "realname": "Bruce Wayne",
    "base": "40mm",
    "rep": 109,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Bat Family", "GCPD"],
    "img": "img/BatmanFrankMiller.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "3+",
      "Movement": 8,
      "Willpower": 8,
      "Endurance": 9
    },
    "traits": [
      "Bat Cape",
      "Bat-Armor MK I",
      "Combo (Unarmed)",
      "Obstinate",
      "Sneak Attack",
      "Veteran",
      "Bat Family",
      "Batclaw",
      "Detective",
      "Reinforced Gloves",
      "The Dark Knight Returns",
      "Welcome to Hell"
    ],
    "weapons": [
      {
        "name": "Batlings",
        "damage": "★ ★",
        "rof": 2,
        "ammo": 2,
        "traits": "Light / S. Range / Throwing"
      }
    ]
  },
  {
    "name": "Batwoman",
    "realname": "Kathy Kane",
    "base": "40mm",
    "rep": 111,
    "funding": 0,
    "rank": ["Sidekick", "Leader"],
    "faction": ["Bat Family", "GCPD"],
    "img": "img/Batwoman.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 8,
      "Endurance": 7
    },
    "traits": [
      "Air Combat",
      "Bat Cape",
      "Bat-Armor MK I",
      "Criminology",
      "Military Teamwork",
      "Searcher",
      "Arrest",
      "Bat Family",
      "Batclaw/Grapple Gun",
      "Interrogation",
      "Night Vision",
      "Stealth"
    ],
    "weapons": [
      {
        "name": "Batarang",
        "damage": "★ ★",
        "rof": 2,
        "ammo": 2,
        "traits": "M. Range / Remote Controlled / Throwing"
      },
      {
        "name": "Shock Gloves",
        "damage": "★ ★",
        "rof": "-",
        "ammo": "-",
        "traits": "CRT (Stunned)"
      }
    ]
  },
  
  {
    "name": "Catwoman",
    "realname": "Selina Kyle",
    "base": "40mm",
    "rep": 72,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["Bat Family", "Unknown"],
    "rivals": ["GCPD", "Joker"],
    "img": "img/Catwoman.png",
    "stats": {
      "Attack": 4,
      "Defense": 5,
      "Strength": "5+",
      "Movement": 13,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Acrobat",
      "Backpack",
      "Bat Family",
      "Bluff",
      "Climbing Claws",
      "Meow",
      "Sneaking",
      "Stealthy Cats"
    ],
    "weapons": [
      {
        "name": "Whip",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Reach (2)"
      }
    ]
  },
  {
    "name": "Red Hood Rebirth",
    "realname": "Jason Todd",
    "base": "40mm",
    "rep": 80,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["Bat Family", "GCPD"],
    "img": "img/RedHoodRebirth.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 13,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Acrobat",
      "Bat Family",
      "Brutal",
      "Hardened",
      "Kevlar Vest",
      "Martial Artist",
      "One Shot Gun",
      "Searcher"
    ],
    "weapons": [
      {
        "name": "Katana",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Sharp"
      },
      {
        "name": "The Crowbar",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Blunt 2 / Devastating / Handy / Heavy"
      }
    ]
  },
  {
    "name": "Robin Classic",
    "realname": "Dick Grayson",
    "base": "40mm",
    "rep": 50,
    "funding": 100,
    "rank": ["Sidekick"],
    "faction": ["Bat Family", "GCPD"],
    "img": "img/RobinClassic.png",
    "stats": {
      "Attack": 3,
      "Defense": 5,
      "Strength": "5+",
      "Movement": 12,
      "Willpower": 6,
      "Endurance": 4
    },
    "traits": [
      "Acrobat",
      "Agile",
      "Bat Family",
      "Boy Wonder",
      "Fast (3)",
      "One of the Boys",
      "Radio",
      "Small",
      "Support (Batman)",
      "Teen Titans"
    ],
    "weapons": [
      {
        "name": "Batlings",
        "damage": "★★",
        "rof": 2,
        "ammo": 2,
        "traits": "Light / S. Range / Throwing"
      }
    ]
  },
  {
    "name": "Robin [Jason Todd]",
    "realname": "Jason Todd",
    "base": "30mm",
    "rep": 40,
    "funding": 0,
    "rank": ["Sidekick"],
    "faction": ["Bat Family", "GCPD"],
    "img": "img/RobinJasonTodd.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Batclaw",
      "Brutal",
      "Goad",
      "Handyman",
      "Impetuous",
      "Street Guy"
    ],
    "weapons": [
      {
        "name": "Batlings",
        "damage": "★★",
        "rof": 2,
        "ammo": 2,
        "traits": "Light / S. Range / Throwing"
      },
      {
        "name": "Robin's Bo",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Devastating / Handy / Reach (2)"
      }
    ]
  },
  {
    "name": "Wonder Girl",
    "realname": "Donna Troy",
    "base": "30mm",
    "rep": 120,
    "funding": 0,
    "rank": ["Sidekick"],
    "faction": ["Bat Family"],
    "img": "img/WonderGirl.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "3+",
      "Movement": 13,
      "Willpower": 7,
      "Endurance": 8
    },
    "traits": [
      "Acrobat",
      "Amazon",
      "Bracelets of Submission",
      "Lasso of Persuasion",
      "Martial Artist",
      "Regeneration",
      "Reinforced Gloves",
      "Super Jump",
      "Teen Titans",
      "Weapon Master"
    ],
    "weapons": [
      {
        "name": "Shield",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Devastating / Protective"
      },
      {
        "name": "Amazon's Sword",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Shield Breaker / Sharp"
      }
    ]
  },
  {
    "name": "Mr. Wayne Beyond",
    "realname": "Bruce Wayne",
    "base": "40mm",
    "rep": 50,
    "funding": 0,
    "rank": ["Sidekick"],
    "faction": ["Bat Family", "GCPD"],
    "img": "img/MrWayneBeyond.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Bat Family",
      "Block It Out",
      "Detective",
      "Intel Support (5)",
      "Pulling the Strings",
      "Required (Terry McGinnis)",
      "Resourceful Vigilante"
    ],
    "weapons": [
      {
        "name": "Informatic Assault",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Steal / Limited Attack"
      }
    ]
  },
  {
    "name": "Clayface",
    "realname": "Basil Karlo",
    "base": "60mm",
    "rep": 100,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["Bat Family", "Unknown"],
    "rivals": ["GCPD"],
    "img": "img/Clayface.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Adaptable",
      "Bat Family",
      "Bodyguard",
      "Clay Body",
      "Clay Slide",
      "Huge",
      "Reform",
      "Regeneration",
      "Sturdy",
      "Undercover"
    ],
    "weapons": [
      {
        "name": "Metamorphic Weapon (Solid)",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Reach (2) / Devastating"
      },
      {
        "name": "Metamorphic Weapon (Mud)",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Reach (6) / Slow (6)"
      }
    ]
  },
  {
    "name": "Robin [Carrie Kelley]",
    "realname": "Carrie Kelley",
    "base": "30mm",
    "rep": 54,
    "funding": 100,
    "rank": ["Sidekick"],
    "faction": ["Bat Family", "GCPD"],
    "img": "img/RobinCarrieKelley.png",
    "stats": {
      "Attack": 3,
      "Defense": 5,
      "Strength": "5+",
      "Movement": 13,
      "Willpower": 6,
      "Endurance": 5
    },
    "traits": [
      "Acrobat",
      "Agile",
      "Bat Family",
      "Boy Wonder",
      "Concealment",
      "Handyman",
      "The Dark Knight Returns"
    ],
    "weapons": [
      {
        "name": "Slingshot",
        "damage": "🩸",
        "rof": 2,
        "ammo": 3,
        "traits": "Handy / S. Range / Throwing"
      }
    ]
  },
  {
    "name": "Red Hood The Outlaw",
    "realname": "Jason Todd",
    "base": "40mm",
    "rep": 80,
    "funding": 400,
    "rank": ["Sidekick"],
    "faction": ["Bat Family", "GCPD"],
    "img": "img/RedHoodTheOutlaw.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Acrobat",
      "Bat Family",
      "Handyman",
      "Instinctive Shooting",
      "Martial Artist",
      "Red Hood Armor",
      "Reinforced Gloves",
      "Shooter",
      "Teen Titans",
      "Troublemaker",
      "Vengeance"
    ],
    "weapons": [
      {
        "name": "Red Hood's Guns",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 4,
        "traits": "S. Range / Firearm / Accurate / Light"
      },
      {
        "name": "Anti-Tank Rounds",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 2,
        "traits": "S. Range / Firearm / Anti-Tank / Light"
      }
    ]
  },
  {
    "name": "Starfire Teen Titans",
    "realname": "Koriand'r",
    "base": "30mm",
    "rep": 70,
    "funding": 300,
    "rank": ["Free Agent"],
    "faction": ["Bat Family"],
    "img": "img/StarfireTeenTitans.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "2+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 9
    },
    "traits": [
      "Berserker Fury",
      "Desensitized",
      "Fly",
      "Invulnerability (1)",
      "Princess of Tamaran",
      "Teen Titans",
      "True Love (Dick Grayson)"
    ],
    "weapons": [
      {
        "name": "Starbolts",
        "damage": "🩸★",
        "rof": 2,
        "ammo": 10,
        "traits": "Beam / S. Range / Fire / Throwing / Motion (4)"
      },
      {
        "name": "Starfire's Hands",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Motion (3) / Push (4) / Devastating / Fire"
      }
    ]
  },
  {
    "name": "Nightwing Rebirth",
    "realname": "Dick Grayson",
    "base": "40mm",
    "rep": 94,
    "funding": 0,
    "rank": ["Sidekick"],
    "faction": ["Bat Family", "GCPD"],
    "img": "img/NightwingRebirth.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 13,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Acrobat",
      "Always on the Move",
      "Bat Family",
      "Batclaw",
      "Charismatic",
      "Combo: Sticks",
      "Martial Artist",
      "Searcher",
      "Shadowed Nightmare",
      "Teen Titans",
      "Vigilante's Work"
    ],
    "weapons": [
      {
        "name": "Sticks",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Electric / Handy / Mechanical"
      },
      {
        "name": "Batlings",
        "damage": "★★",
        "rof": 2,
        "ammo": 1,
        "traits": "Light / S. Range / Throwing"
      }
    ]
  },
  {
    "name": "Green Arrow The Animated Series",
    "realname": "Oliver Queen",
    "base": "30mm",
    "rep": 55,
    "funding": 300,
    "rank": ["Sidekick"],
    "faction": ["Bat Family"],
    "img": "img/GreenArrowAnimated.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Acrobat",
      "Bat Family",
      "Instinctive Shooting",
      "Put More Effort",
      "Sharpshooter",
      "Teamwork (2) (Black Canary)"
    ],
    "weapons": [
      {
        "name": "Bow (Punch Arrow)",
        "damage": "★★★",
        "rof": 1,
        "ammo": 1,
        "traits": "Aim / Mechanical / Acceleration"
      },
      {
        "name": "Bow (Trick Arrow)",
        "damage": "★★",
        "rof": 1,
        "ammo": 5,
        "traits": "Mechanical / Aim / Acceleration"
      }
    ]
  },
  {
    "name": "Son of Batman 3",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 39,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Bat Family"],
    "img": "img/SonOfBatman3.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Bat Family",
      "Bluff",
      "Counter Attack",
      "Hardened",
      "Minion (3)",
      "Reinforced Gloves",
      "The Dark Knight Returns"
    ],
    "weapons": []
  },
  {
    "name": "Ace",
    "realname": "Ace",
    "base": "30mm",
    "rep": 28,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Bat Family"],
    "img": "img/Ace.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Animal",
      "Bat Cape",
      "Bat Family",
      "Detective Best Friend",
      "True Love (Robin)"
    ],
    "weapons": [
      {
        "name": "Ace's Teeth",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Slow (4)"
      },
      {
        "name": "Bat-Bark",
        "damage": "-",
        "rof": 1,
        "ammo": "-",
        "traits": "Expansive / Enervating (2)"
      }
    ]
  },
  {
    "name": "Alfred Pennyworth",
    "realname": "Alfred Pennyworth",
    "base": "40mm",
    "rep": 40,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Bat Family"],
    "img": "img/AlfredPennyworth.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Bat Family",
      "Batcave Support",
      "Business Agent",
      "Informer",
      "Intel Support (4)",
      "Radio",
      "The Dark Knight Returns",
      "Veteran"
    ],
    "weapons": [
      {
        "name": "Informatic Assault",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Steal / Limited Attack"
      }
    ]
  },
  {
    "name": "Huntress Classic",
    "realname": "Helena Bertinelli",
    "base": "40mm",
    "rep": 70,
    "funding": 300,
    "rank": ["Free Agent"],
    "faction": ["Bat Family"],
    "img": "img/HuntressClassic.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "360° Strike",
      "Acrobat",
      "Bat Family",
      "Good Aim",
      "Martial Artist",
      "Stealth",
      "Undercover",
      "Vendetta"
    ],
    "weapons": [
      {
        "name": "Bo",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Reach (2)"
      },
      {
        "name": "Huntress's Crossbow",
        "damage": "🩸🩸🩸",
        "rof": 1,
        "ammo": 3,
        "traits": "M. Range / Mechanical / Assault"
      }
    ]
  },
  {
    "name": "Raven",
    "realname": "Rachel Roth",
    "base": "30mm",
    "rep": 70,
    "funding": 200,
    "rank": ["Henchman"],
    "faction": ["Bat Family"],
    "img": "img/Raven.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 6
    },
    "traits": [
      "Dark Intimidation (Spell)",
      "Demon",
      "Magical Power (3)",
      "Natural Immunities",
      "Painful Empathy",
      "Regeneration",
      "Soul-Self (Spell)",
      "Teen Titans"
    ],
    "weapons": [
      {
        "name": "Dark Blast",
        "damage": "🩸",
        "rof": 2,
        "ammo": 3,
        "traits": "Magic / S. Range / Throwing / Terror / Devastating"
      },
      {
        "name": "Soul's Touch",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Magic / Suggest / Terror"
      }
    ]
  },
  {
    "name": "Son of Batman 2",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 22,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["Bat Family"],
    "img": "img/SonOfBatman2.png",
    "stats": {
      "Attack": 3,
      "Defense": 2,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 5
    },
    "traits": [
      "Bat Family",
      "Dirty Fighter",
      "Hardened",
      "Minion (3)",
      "Street Guy",
      "The Dark Knight Returns"
    ],
    "weapons": [
      {
        "name": "Gun",
        "damage": "🩸★",
        "rof": 2,
        "ammo": 2,
        "traits": "Firearm / Light / S. Range"
      },
      {
        "name": "Sawed Off Shotgun",
        "damage": "🩸★",
        "rof": 1,
        "ammo": 2,
        "traits": "Expansive / Firearm"
      }
    ]
  },
  {
    "name": "Clownhunter",
    "realname": "Bao Pham",
    "base": "40mm",
    "rep": 23,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Bat Family"],
    "img": "img/Clownhunter.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Antagonist (2-Trickster)",
      "Bat Family",
      "Devastating Blow",
      "Goad",
      "Hunter",
      "Undercover"
    ],
    "weapons": [
      {
        "name": "Bat-Bat",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Heavy / Bleed (2)"
      }
    ]
  },
  {
    "name": "Red Robin",
    "realname": "Tim Drake",
    "base": "40mm",
    "rep": 70,
    "funding": 200,
    "rank": ["Free Agent"],
    "faction": ["Bat Family", "GCPD"],
    "img": "img/RedRobin.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "360° Strike",
      "Bat Family",
      "Batclaw",
      "Detective",
      "Hacking",
      "Martial Artist",
      "Order",
      "Scientific",
      "Searcher",
      "Teen Titans"
    ],
    "weapons": [
      {
        "name": "Bo",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Reach (2)"
      },
      {
        "name": "EM Chain Bolas",
        "damage": "★",
        "rof": 1,
        "ammo": 3,
        "traits": "Electric / S. Range / Throwing / Slow (6)"
      }
    ]
  },
  {
    "name": "Son of Batman 1",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 14,
    "funding": 100,
    "rank": ["Henchman"],
    "faction": ["Bat Family"],
    "img": "img/SonOfBatman1.png",
    "stats": {
      "Attack": 3,
      "Defense": 2,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 5
    },
    "traits": [
      "Bat Family",
      "Brutal",
      "Hardened",
      "Minion (3)",
      "The Dark Knight Returns"
    ],
    "weapons": [
      {
        "name": "Batlings",
        "damage": "★★",
        "rof": 2,
        "ammo": 2,
        "traits": "Light / S. Range / Throwing"
      },
      {
        "name": "Shiv",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy"
      }
    ]
  },
  {
    "name": "Azrael God's Punishment",
    "realname": "Michael Washington's Lane",
    "base": "40mm",
    "rep": 85,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["Bat Family", "GCPD"],
    "img": "img/AzraelGodsPunishment.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "3+",
      "Movement": 12,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Acrobat",
      "Always on the Move",
      "Anger Management (Mental Disorder)",
      "Bat Family",
      "Flaming Wave",
      "God's Banner",
      "God's Work",
      "Night Vision",
      "Saint Dumas Zealot",
      "Suit of Sorrows"
    ],
    "weapons": [
      {
        "name": "Sword of Sin",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp / Enervating (3) / Blind"
      },
      {
        "name": "Sword of Salvation",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp / Fire"
      }
    ]
  },
  {
    "name": "Robin [Tim Drake]",
    "realname": "Tim Drake",
    "base": "40mm",
    "rep": 50,
    "funding": 200,
    "rank": ["Free Agent"],
    "faction": ["Bat Family", "GCPD"],
    "img": "img/RobinTimDrake.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 5
    },
    "traits": [
      "Bat Family",
      "Batclaw",
      "Detective",
      "Hacking",
      "Tactical Approach",
      "Teen Titans"
    ],
    "weapons": [
      {
        "name": "Smoke Pellets",
        "damage": "-",
        "rof": 1,
        "ammo": 1,
        "traits": "S. Range / Grenade / Smoke"
      },
      {
        "name": "Bo (Defensive Style)",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Defensive / Reach (2)"
      }
    ]
  },
  {
    "name": "Lucius Fox",
    "realname": "Lucius Fox",
    "base": "40mm",
    "rep": 60,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["Bat Family", "GCPD"],
    "img": "img/LuciusFox.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 8,
      "Endurance": 4
    },
    "traits": [
      "Bat Family",
      "Countermeasures",
      "Development",
      "Intel Support (3)",
      "Upgrades"
    ],
    "weapons": []
  },

  {
    "name": "Catwoman The Animated Series",
    "realname": "Selina Kyle",
    "base": "30mm",
    "rep": 35,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Bat Family"],
    "img": "img/CatwomanAnimated.png",
    "stats": {
      "Attack": 3,
      "Defense": 5,
      "Strength": "5+",
      "Movement": 12,
      "Willpower": 5,
      "Endurance": 4
    },
    "traits": [
      "Acrobat",
      "Bat Family",
      "Climbing Claws",
      "Pickpocket",
      "Pleasant Surprise"
    ],
    "weapons": [
      {
        "name": "Whip",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Reach (2)"
      }
    ]
  },
  {
    "name": "Batgirl The Animated Series",
    "realname": "Barbara Gordon",
    "base": "30mm",
    "rep": 35,
    "funding": 100,
    "rank": ["Henchman"],
    "faction": ["Bat Family"],
    "img": "img/BatgirlAnimated.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Affinity (Commissioner Gordon)",
      "Bat Cape",
      "Bat Family",
      "Batclaw",
      "Combo (Unarmed)",
      "I've Caught You",
      "Street Fighter"
    ],
    "weapons": [
      {
        "name": "Batlings",
        "damage": "★★",
        "rof": 2,
        "ammo": 2,
        "traits": "Light / S. Range / Throwing"
      },
      {
        "name": "Smoke Grenades",
        "damage": "-",
        "rof": 1,
        "ammo": 1,
        "traits": "Grenade / S. Range / Smoke"
      }
    ]
  },
  {
    "name": "Harley Quinn The Animated Series",
    "realname": "Dr. Harleen Frances Quinzel",
    "base": "30mm",
    "rep": 30,
    "funding": 100,
    "rank": ["Henchman"],
    "faction": ["Bat Family"],
    "img": "img/HarleyQuinnAnimated.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 4
    },
    "traits": [
      "Acrobat",
      "Bat Family",
      "Distract",
      "Harlequinade",
      "No More Joker",
      "Required (Batman The Animated Series)"
    ],
    "weapons": [
      {
        "name": "Harley's Little Helper",
        "damage": "★★",
        "rof": 1,
        "ammo": 2,
        "traits": "S. Range / Firearm / Enervating (3)"
      }
    ]
  },
  {
    "name": "Robin Beyond",
    "realname": "Matt McGinnis",
    "base": "40mm",
    "rep": 50,
    "funding": 100,
    "rank": ["Henchman"],
    "faction": ["Bat Family", "GCPD"],
    "img": "img/RobinBeyond.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Bat Cape",
      "Bat Family",
      "Bat-Armor MK III",
      "Fly",
      "Multi-Purpose Pills",
      "Night Vision",
      "Required (Terry McGinnis)"
    ],
    "weapons": [
      {
        "name": "Batarang",
        "damage": "★★",
        "rof": 2,
        "ammo": 3,
        "traits": "M. Range / Remote Controlled / Throwing"
      },
      {
        "name": "Batsuit's Strength",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Devastating"
      }
    ]
  },
  {
    "name": "Ravager Vanguard Team",
    "realname": "Rose Wilson",
    "base": "30mm",
    "rep": 36,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Bat Family", "Suicide Squad"],
    "img": "img/RavagerVanguardTeam.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Martial Artist",
      "Power Dampening",
      "Precognition",
      "Self-Discipline",
      "Teen Titans"
    ],
    "weapons": [
      {
        "name": "Ravager's Swords",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp / Overwhelming / Accurate"
      }
    ]
  },
  {
    "name": "Black Canary The Animated Series",
    "realname": "Dinah Lance",
    "base": "30mm",
    "rep": 45,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Bat Family"],
    "img": "img/BlackCanaryAnimated.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "5+",
      "Movement": 12,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Acrobat",
      "Bat Family",
      "Canary Cry",
      "Martial Artist",
      "Team Player",
      "Teamwork (2) (Green Arrow)"
    ],
    "weapons": [
      {
        "name": "Martial Prowess",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Overwhelming / CRT (Paralyze)"
      }
    ]
  },

//---------------------------------------------------------------------------------------------------------------------------------
//GCPD
//-----------------------------------------------------------------------------------------------------------------------------------

  {
    "name": "Renée Montoya",
    "realname": "Renée Maria Montoya",
    "base": "30mm",
    "rep": 40,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["GCPD"],
    "img": "img/ReneeMontoya.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 6
    },
    "traits": [
      "Bulletproof Vest",
      "Cop",
      "Crucial Information",
      "Detective",
      "Enough Evidence",
      "Incorruptible"
    ],
    "weapons": [
      {
        "name": "Automatic Gun",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 2,
        "traits": "S. Range / Firearm / Light"
      },
      {
        "name": "Martial Prowess",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Overwhelming / CRT (Paralyze)"
      }
    ]
  },
  {
    "name": "Homicide Detective",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 30,
    "funding": 200,
    "rank": ["Henchman"],
    "faction": ["GCPD"],
    "img": "img/HomicideDetective.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 5
    },
    "traits": [
      "Bulletproof Vest",
      "Cop",
      "Detective",
      "Groundwork",
      "Investigator"
    ],
    "weapons": [
      {
        "name": "Concealed Automatic Gun",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 2,
        "traits": "S. Range / Firearm / Light / Concealed"
      }
    ]
  },
  {
    "name": "GCPD Mounted Cop",
    "realname": "Unknown",
    "base": "42x75mm",
    "rep": 38,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["GCPD"],
    "img": "img/GCPDMountedCop.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 14,
      "Willpower": 6,
      "Endurance": 7
    },
    "traits": [
      "Always On The Move",
      "Animal",
      "Arrest",
      "Cop",
      "Savage Fighter"
    ],
    "weapons": [
      {
        "name": "Extendable Baton",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Heavy / Reach (1)"
      }
    ]
  },
  {
    "name": "SWAT QRT 3",
    "realname": "QRT 3",
    "base": "30mm",
    "rep": 35,
    "funding": 400,
    "rank": ["Henchman"],
    "faction": ["GCPD"],
    "img": "img/SWATQRT3.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Bulletproof Vest",
      "Cop",
      "Elite (SWAT)",
      "Radio",
      "Sapper"
    ],
    "weapons": [
      {
        "name": "Extendable Baton",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Heavy / Reach (1)"
      },
      {
        "name": "Special Sniper Rifle",
        "damage": "🩸🩸★",
        "rof": 1,
        "ammo": 2,
        "traits": "Firearm / Devastating / Scope / Aim / Reload"
      }
    ]
  },
  {
    "name": "Officer Martinez",
    "realname": "Martinez",
    "base": "30mm",
    "rep": 22,
    "funding": 200,
    "rank": ["Henchman"],
    "faction": ["GCPD"],
    "img": "img/OfficerMartinez.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Arrest",
      "Cop",
      "Detective",
      "Lantern"
    ],
    "weapons": [
      {
        "name": "Gun",
        "damage": "🩸★",
        "rof": 2,
        "ammo": 3,
        "traits": "Firearm / S. Range"
      }
    ]
  },
  {
    "name": "SWAT QRT 2",
    "realname": "QRT 2",
    "base": "30mm",
    "rep": 33,
    "funding": 350,
    "rank": ["Henchman"],
    "faction": ["GCPD"],
    "img": "img/SWATQRT2.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Bulletproof Vest",
      "Cop",
      "Elite (SWAT)",
      "Radio",
      "Tracking"
    ],
    "weapons": [
      {
        "name": "Extendable Baton",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Heavy / Reach (1)"
      },
      {
        "name": "Carbine",
        "damage": "🩸",
        "rof": 5,
        "ammo": 2,
        "traits": "Assault / Firearm / M. Range"
      }
    ]
  },
  {
    "name": "Reinforcement Cop",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 20,
    "funding": 150,
    "rank": ["Henchman"],
    "faction": ["GCPD"],
    "img": "img/ReinforcementCop.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Bulletproof Vest",
      "Cop",
      "Radio",
      "Sealed Off"
    ],
    "weapons": [
      {
        "name": "Gun",
        "damage": "🩸★",
        "rof": 2,
        "ammo": 2,
        "traits": "Firearm / S. Range"
      }
    ]
  },
  {
    "name": "GCPD Officer 1",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 18,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["GCPD"],
    "img": "img/GCPDOfficer1.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 4
    },
    "traits": [
      "Arrest",
      "Cop",
      "Lantern",
      "Scout"
    ],
    "weapons": [
      {
        "name": "Baton",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Heavy"
      }
    ]
  },
  {
    "name": "Gilda Dent",
    "realname": "Gilda Dent",
    "base": "40mm",
    "rep": 25,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["GCPD"],
    "img": "img/GildaDent.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "6+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Artist",
      "Holiday",
      "Intel Support (5)",
      "Required (Harvey Dent)"
    ],
    "weapons": []
  },
  {
    "name": "SWAT QRT 1",
    "realname": "QRT 1",
    "base": "30mm",
    "rep": 27,
    "funding": 100,
    "rank": ["Henchman"],
    "faction": ["GCPD"],
    "img": "img/SWATQRT1.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Arrest",
      "Bulletproof Vest",
      "Cop",
      "Elite (SWAT)"
    ],
    "weapons": [
      {
        "name": "Extendable Baton",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Heavy / Reach (1)"
      },
      {
        "name": "Riot Gun",
        "damage": "★★",
        "rof": 2,
        "ammo": 3,
        "traits": "Blunt (2) / Mechanical / M. Range"
      }
    ]
  },
  {
    "name": "GCPD Officer 2",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 15,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["GCPD"],
    "img": "img/GCPDOfficer2.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 5
    },
    "traits": [
      "Arrest",
      "Cop",
      "Stop!"
    ],
    "weapons": []
  },
  {
    "name": "Beat Cop",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 35,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["GCPD"],
    "img": "img/BeatCop.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "3+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 7
    },
    "traits": [
      "Cop",
      "Desensitized",
      "Large",
      "Obstinate",
      "Unstoppable"
    ],
    "weapons": [
      {
        "name": "Brass Knuckles",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": ""
      }
    ]
  },
  {
    "name": "Sgt. Harvey Bullock",
    "realname": "Harvey Bullock",
    "base": "30mm",
    "rep": 41,
    "funding": 200,
    "rank": ["Henchman"],
    "faction": ["GCPD"],
    "img": "img/SgtHarveyBullock.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Arrest",
      "Cop",
      "Detective",
      "Evidence Tampering",
      "Hidden",
      "Order"
    ],
    "weapons": [
      {
        "name": "Gun",
        "damage": "🩸★",
        "rof": 2,
        "ammo": 3,
        "traits": "Firearm / Light / S. Range"
      }
    ]
  },
  {
    "name": "GCPD Detective",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 26,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["GCPD"],
    "img": "img/GCPDDetective.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 4,
      "Endurance": 5
    },
    "traits": [
      "Arrest",
      "Cop",
      "Detective",
      "Hidden"
    ],
    "weapons": [
      {
        "name": "Automatic Gun",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 2,
        "traits": "S. Range / Firearm / Light"
      }
    ]
  },
  {
    "name": "Sierra",
    "realname": "Sierra",
    "base": "30mm",
    "rep": 30,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["GCPD"],
    "img": "img/Sierra.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Bulletproof Vest",
      "Cop",
      "Elite (SWAT)",
      "Hardened",
      "Veteran"
    ],
    "weapons": [
      {
        "name": "Taser",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Mechanical / Reach (3) / CRT (Stunned)"
      }
    ]
  },
  {
    "name": "GCPD Cop 1",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 16,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["GCPD"],
    "img": "img/GCPDCop1.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 5
    },
    "traits": [
      "Arrest",
      "Cop",
      "Lantern"
    ],
    "weapons": [
      {
        "name": "Tonfa",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Defensive / Handy"
      }
    ]
  },
  {
    "name": "Lieutenant Gordon Year One",
    "realname": "James W. Gordon",
    "base": "30mm",
    "rep": 46,
    "funding": 200,
    "rank": ["Henchman"],
    "faction": ["GCPD"],
    "img": "img/LtGordonYearOne.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Arrest",
      "Bulletproof Vest",
      "Coordination",
      "Cop",
      "Detective",
      "Incorruptible",
      "Observation"
    ],
    "weapons": [
      {
        "name": "Gun",
        "damage": "🩸★",
        "rof": 2,
        "ammo": 2,
        "traits": "Firearm / S. Range"
      },
      {
        "name": "Martial Prowess",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Overwhelming / CRT (Paralyze)"
      }
    ]
  },
  {
    "name": "GCPD Cop 2",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 23,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["GCPD"],
    "img": "img/GCPDCop2.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 4
    },
    "traits": [
      "Arrest",
      "Cop"
    ],
    "weapons": [
      {
        "name": "Taser",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Mechanical / Reach (3) / CRT (Stunned)"
      }
    ]
  },
  {
    "name": "Lt. Gordon Jeffrey Wright",
    "realname": "James W. Gordon",
    "base": "40mm",
    "rep": 50,
    "funding": 200,
    "rank": ["Henchman"],
    "faction": ["GCPD"],
    "img": "img/LtGordonJeffreyWright.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Arrest",
      "Cop",
      "Detective",
      "Incorruptible",
      "Lantern",
      "Lieutenant (Chief Mackenzie)",
      "Order",
      "Support (Batman Robert Pattinson)"
    ],
    "weapons": [
      {
        "name": "Gun",
        "damage": "🩸★",
        "rof": 2,
        "ammo": 3,
        "traits": "Firearm / S. Range"
      }
    ]
  },
  {
    "name": "Agent 1",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 26,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["GCPD"],
    "img": "img/Agent1.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Arrest",
      "Cop",
      "Undercover"
    ],
    "weapons": [
      {
        "name": "Baton",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Heavy"
      },
      {
        "name": "Automatic Gun",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 2,
        "traits": "S. Range / Firearm / Light"
      }
    ]
  },
  {
    "name": "Officer Merkel",
    "realname": "Stanley Merkel",
    "base": "30mm",
    "rep": 28,
    "funding": 100,
    "rank": ["Henchman"],
    "faction": ["GCPD"],
    "img": "img/OfficerMerkel.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Arrest",
      "Bodyguard",
      "Cop"
    ],
    "weapons": [
      {
        "name": "Riot Gun",
        "damage": "★★",
        "rof": 2,
        "ammo": 3,
        "traits": "Blunt (2) / Mechanical / M. Range"
      }
    ]
  },
  {
    "name": "Agent 2",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 15,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["GCPD"],
    "img": "img/Agent2.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Arrest",
      "Cop"
    ],
    "weapons": [
      {
        "name": "Baton",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Heavy"
      },
      {
        "name": "Pepper Spray",
        "damage": "-",
        "rof": 1,
        "ammo": 2,
        "traits": "Beam / Reload / S. Range / Blind"
      }
    ]
  },
  {
    "name": "Agent 3",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 25,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["GCPD"],
    "img": "img/Agent3.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Arrest",
      "Bulletproof Vest",
      "Cop"
    ],
    "weapons": [
      {
        "name": "Extendable Baton",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Heavy / Reach (1)"
      }
    ]
  },
  {
    "name": "Detective Flass Year One",
    "realname": "Arnold Flass",
    "base": "30mm",
    "rep": 41,
    "funding": 200,
	  "rank": ["Henchman"],
    "faction": ["GCPD", "Organized Crime"],
    "img": "img/DetectiveFlassYearOne.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Arrest",
      "Bulletproof Vest",
      "Cop",
      "Corrupt",
      "Detective",
      "Evidence Tampering"
    ],
    "weapons": [
      {
        "name": "Bat",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Heavy"
      },
      {
        "name": "Gun",
        "damage": "🩸★",
        "rof": 2,
        "ammo": 2,
        "traits": "Firearm / S. Range"
      }
    ]
  },
  {
    "name": "Lerida",
    "realname": "Lerida",
    "base": "30mm",
    "rep": 36,
    "funding": 450,
    "rank": ["Henchman"],
    "faction": ["GCPD"],
    "img": "img/Lerida.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Bulletproof Vest",
      "Cop",
      "Elite (SWAT)",
      "Expert Marksman"
    ],
    "weapons": [
      {
        "name": "Custom SMG",
        "damage": "🩸🩸",
        "rof": 3,
        "ammo": 2,
        "traits": "Assault / Firearm / M. Range / Red Dot"
      }
    ]
  },
  {
    "name": "Foxtrot",
    "realname": "Foxtrot",
    "base": "30mm",
    "rep": 32,
    "funding": 200,
    "rank": ["Henchman"],
    "faction": ["GCPD"],
    "img": "img/Foxtrot.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Bulletproof Vest",
      "Charge",
      "Cop",
      "Elite (SWAT)",
      "Street Guy",
      "Veteran"
    ],
    "weapons": [
      {
        "name": "Shield",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Protective"
      },
      {
        "name": "Flash Grenades",
        "damage": "★",
        "rof": 1,
        "ammo": 2,
        "traits": "Explosive / Grenade / Mechanical / S. Range / Blind"
      }
    ]
  },
  {
    "name": "Attorney Harvey Dent",
    "realname": "Harvey Dent",
    "base": "40mm",
    "rep": 50,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["GCPD"],
    "img": "img/AttorneyHarveyDent.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 6,
      "Willpower": 6,
      "Endurance": 5
    },
    "traits": [
      "Charismatic",
      "Crucial Information",
      "Intel Support (5)",
      "Law Interpretation",
      "Objection!",
      "Scheming (2)",
      "Trial"
    ],
    "weapons": [
      {
        "name": "Influence",
        "damage": "-",
        "rof": "-",
        "ammo": "-",
        "traits": "Reach (6) / Push (4)"
      }
    ]
  },

//-------------------------------------------------------------------------------------------------------------------------------------
//Organized Crime
//-------------------------------------------------------------------------------------------------------------------------------------
  {
    "name": "Bouncer 1",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 19,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Organized Crime"],
    "img": "img/Bouncer1.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 6
    },
    "traits": [
      "Criminal",
      "Inside Man",
      "Mobster"
    ],
    "weapons": [
      {
        "name": "Brass Knuckles",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": ""
      }
    ]
  },
  {
    "name": "Bouncer 2",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 19,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Organized Crime"],
    "img": "img/Bouncer2.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 6
    },
    "traits": [
      "Criminal",
      "Mobster",
      "Tough Guy"
    ],
    "weapons": [
      {
        "name": "Reinforced Bat",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Heavy"
      }
    ]
  },
  {
    "name": "Bouncer 3",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 22,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["Organized Crime"],
    "img": "img/Bouncer3.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 6
    },
    "traits": [
      "Criminal",
      "Mobster",
      "Rapid Fire"
    ],
    "weapons": [
      {
        "name": "Automatic Gun",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 2,
        "traits": "S. Range / Firearm / Light"
      }
    ]
  },
  {
    "name": "Black Mask Thug 6",
    "realname": "Vladimir Sokolov",
    "base": "30mm",
    "rep": 20,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Organized Crime"],
    "img": "img/BlackMaskThug6.png",
    "stats": {
      "Attack": 3,
      "Defense": 2,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 4,
      "Endurance": 6
    },
    "traits": [
      "Criminal",
      "360° Strike",
      "Mobster"
    ],
    "weapons": [
      {
        "name": "Chained Fists",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Devastating / Heavy / Overwhelming"
      },
      {
        "name": "Unleashed Chains",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Heavy / Reach (3)"
      }
    ]
  },
  {
    "name": "The Twin 1",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 26,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Organized Crime"],
    "img": "img/TheTwin1.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Competitive",
      "Criminal",
      "It's Mine",
      "Mobster",
      "Widespread Corruption"
    ],
    "weapons": [
      {
        "name": "Brass Knuckles",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": ""
      }
    ]
  },
  {
    "name": "The Twin 2",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 26,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Organized Crime"],
    "img": "img/TheTwin2.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Competitive",
      "Criminal",
      "It's Mine",
      "Mobster",
      "Showing The Ropes"
    ],
    "weapons": [
      {
        "name": "Brass Knuckles",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": ""
      }
    ]
  },
  {
    "name": "Killer Croc Thug",
    "realname": "Waylon Jones",
    "base": "40mm",
    "rep": 50,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Organized Crime"],
    "img": "img/KillerCrocThug.png",
    "stats": {
      "Attack": 4,
      "Defense": 3,
      "Strength": "3+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 7
    },
    "traits": [
      "Amphibious",
      "Criminal",
      "Large",
      "Made Man",
      "Mobster",
      "Raised In The Sewers",
      "Tough Skin"
    ],
    "weapons": [
      {
        "name": "Expeditious Fighter",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Devastating / Overwhelming"
      }
    ]
  },
  {
    "name": "Detective Kenzie",
    "realname": "William Kenzie",
    "base": "30mm",
    "rep": 45,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["Organized Crime"],
    "img": "img/DetectiveKenzie.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Criminal",
      "Detective",
      "Evidence Tampering",
      "Hidden",
      "Protect The Shadows",
      "Shady Dealings"
    ],
    "weapons": [
      {
        "name": "Automatic Gun",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 2,
        "traits": "S. Range / Firearm / Light"
      },
      {
        "name": "Brass Knuckles",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": ""
      }
    ]
  },
  {
    "name": "The Fixer",
    "realname": "Yelena Vólkov",
    "base": "30mm",
    "rep": 38,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Organized Crime"],
    "img": "img/TheFixer.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Criminal",
      "Demotivate",
      "Evidence Tampering",
      "Interrogation",
      "Master Torturer",
      "Protect Me!"
    ],
    "weapons": [
      {
        "name": "Bones Cutter",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp / Bleed (3)"
      },
      {
        "name": "Siringe",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Enervating (3) / Poison / Steal"
      }
    ]
  },
  {
    "name": "Black Mask Thug 7",
    "realname": "Yuri Ivanov",
    "base": "30mm",
    "rep": 24,
    "funding": 400,
    "rank": ["Henchman"],
    "faction": ["Organized Crime"],
    "img": "img/BlackMaskThug7.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Criminal",
      "Mobster",
      "Shooter"
    ],
    "weapons": [
      {
        "name": "Custom Assault Gun",
        "damage": "🩸🩸",
        "rof": 3,
        "ammo": 2,
        "traits": "M. Range / Firearm / Assault / Red Dot"
      }
    ]
  },
  {
    "name": "Mafia Thug",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 23,
    "funding": 350,
    "rank": ["Henchman"],
    "faction": ["Organized Crime"],
    "img": "img/MafiaThug.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 6
    },
    "traits": [
      "Backpack",
      "Criminal",
      "Hardened",
      "Hitman",
      "Undercover"
    ],
    "weapons": [
      {
        "name": "Shotgun",
        "damage": "🩸🩸★",
        "rof": 1,
        "ammo": 3,
        "traits": "Firearm / M. Range / Assault"
      },
      {
        "name": "Brass Knuckles",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": ""
      }
    ]
  },
  {
    "name": "Black Mask Thug 4",
    "realname": "Koulikov Khrushchev",
    "base": "30mm",
    "rep": 21,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Organized Crime"],
    "img": "img/BlackMaskThug4.png",
    "stats": {
      "Attack": 3,
      "Defense": 2,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 4,
      "Endurance": 6
    },
    "traits": [
      "Criminal",
      "Power Strike",
      "Mobster"
    ],
    "weapons": [
      {
        "name": "Maul",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Heavy"
      }
    ]
  },
  {
    "name": "Black Mask Thug 2",
    "realname": "Vassili Danilov",
    "base": "30mm",
    "rep": 21,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["Organized Crime"],
    "img": "img/BlackMaskThug2.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Criminal",
      "Hold Breath",
      "Mobster"
    ],
    "weapons": [
      {
        "name": "Long Rifle",
        "damage": "🩸🩸🩸",
        "rof": 1,
        "ammo": 2,
        "traits": "Firearm / Scope / Reload / Bleed (2)"
      }
    ]
  },
  {
    "name": "The Tailor",
    "realname": "Alan Il'Gordo",
    "base": "30mm",
    "rep": 24,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Organized Crime"],
    "img": "img/TheTailor.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Bodyguard",
      "Bulletproof Vest",
      "Criminal",
      "Desensitized",
      "Reinforced Gloves"
    ],
    "weapons": []
  },
  {
    "name": "Black Mask Thug 1",
    "realname": "Vigo Stoniskov",
    "base": "30mm",
    "rep": 25,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Organized Crime"],
    "img": "img/BlackMaskThug1.png",
    "stats": {
      "Attack": 4,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Criminal",
      "Mobster",
      "Street Fighter",
      "Swift"
    ],
    "weapons": [
      {
        "name": "Fighter Claw",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Accurate / Sharp"
      }
    ]
  },
  {
    "name": "Malatesta",
    "realname": "Hugo Testa",
    "base": "30mm",
    "rep": 24,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Organized Crime"],
    "img": "img/Malatesta.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Criminal",
      "Fast (2)",
      "Ferocious"
    ],
    "weapons": [
      {
        "name": "Brass Knuckles",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": ""
      },
      {
        "name": "Broken Glass",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "One Use / Sharp"
      }
    ]
  },
  {
    "name": "Troy Sins",
    "realname": "Troy Santino",
    "base": "30mm",
    "rep": 16,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Organized Crime"],
    "img": "img/TroySins.png",
    "stats": {
      "Attack": 3,
      "Defense": 2,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Criminal",
      "Tireless"
    ],
    "weapons": [
      {
        "name": "Baseball Bat",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Heavy"
      }
    ]
  },
  {
    "name": "Black Mask Thug 5",
    "realname": "Volodya Smirnov",
    "base": "30mm",
    "rep": 20,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Organized Crime"],
    "img": "img/BlackMaskThug5.png",
    "stats": {
      "Attack": 3,
      "Defense": 2,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Computer Intrusion",
      "Criminal",
      "Handyman",
      "Mobster"
    ],
    "weapons": [
      {
        "name": "Bolt Cutter",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Devastating / Heavy"
      }
    ]
  },
  {
    "name": "Black Mask Thug 3",
    "realname": "Nikita Filipov",
    "base": "30mm",
    "rep": 23,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["Organized Crime"],
    "img": "img/BlackMaskThug3.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Criminal",
      "Discharge",
      "Mobster"
    ],
    "weapons": [
      {
        "name": "Automatic Gun",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 2,
        "traits": "S. Range / Firearm / Light"
      }
    ]
  },
  {
    "name": "The Bull",
    "realname": "Luigi Lombardo",
    "base": "30mm",
    "rep": 22,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Organized Crime"],
    "img": "img/TheBull.png",
    "stats": {
      "Attack": 3,
      "Defense": 2,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Close Combat Master",
      "Criminal",
      "Reinforced Gloves"
    ],
    "weapons": []
  },
  {
    "name": "Showtime",
    "realname": "Tony Gianni",
    "base": "30mm",
    "rep": 27,
    "funding": 350,
    "rank": ["Henchman"],
    "faction": ["Organized Crime"],
    "img": "img/Showtime.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Criminal",
      "Elite (Gangster)",
      "Multifire"
    ],
    "weapons": [
      {
        "name": "Automatic Gun",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 2,
        "traits": "S. Range / Firearm / Light"
      }
    ]
  },
  {
    "name": "Vipera",
    "realname": "Samuel Hill",
    "base": "30mm",
    "rep": 27,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["Organized Crime"],
    "img": "img/Vipera.png",
    "stats": {
      "Attack": 3,
      "Defense": 2,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Criminal",
      "Elite (Gangster)",
      "Undercover"
    ],
    "weapons": [
      {
        "name": "Modified Gun (Silenced)",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 2,
        "traits": "Firearm / S. Range / Silencer"
      }
    ]
  },
  {
    "name": "Black Mask",
    "realname": "Roman Sionis",
    "base": "40mm/60mm",
    "rep": 80,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Organized Crime"],
    "img": "img/BlackMask.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 7,
      "Endurance": 8
    },
    "traits": [
      "Brutal",
      "Cruel",
      "Criminal",
      "Interrogation",
      "Mob",
      "No Mercy!!!",
      "Order",
      "Strategist"
    ],
    "weapons": [
      {
        "name": "Black Mask's Gun",
        "damage": "🩸🩸",
        "rof": 3,
        "ammo": 2,
        "traits": "M. Range / Firearm / Accurate"
      },
      {
        "name": "Torture Tools",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Steal"
      }
    ]
  },
  {
    "name": "Lex Luthor",
    "realname": "Alexander Joseph Luthor",
    "base": "30mm",
    "rep": 120,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Organized Crime"],
    "img": "img/LexLuthor.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": [
      "Absolute Power",
      "Exhaustive Planner",
      "Goad",
      "Grand Strategist",
      "Intel Support (8)",
      "Leadership",
      "Lord of Business",
      "Mastermind",
      "Persuasive",
      "Scientific"
    ],
    "weapons": [
      {
        "name": "Influence",
        "damage": "-",
        "rof": "-",
        "ammo": "-",
        "traits": "Reach (6) / Push (4)"
      }
    ]
  },
  {
    "name": "Alexandra Kosov",
    "realname": "Alexandra Kosov",
    "base": "40mm",
    "rep": 74,
    "funding": 400,
    "rank": ["Sidekick"],
    "faction": ["Organized Crime"],
    "img": "img/AlexandraKosov.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Bionic Eye",
      "Criminal",
      "Dirty Money",
      "Expert Marksman",
      "Leadership",
      "Lieutenant (Black Mask)",
      "Smuggler"
    ],
    "weapons": [
      {
        "name": "Rocket Launcher",
        "damage": "🩸🩸🩸",
        "rof": 1,
        "ammo": 2,
        "traits": "Firearm / M. Range / Explosive / Aim / Anti-Tank"
      },
      {
        "name": "Submachine Gun",
        "damage": "🩸🩸",
        "rof": 3,
        "ammo": 2,
        "traits": "S. Range / Firearm / Assault"
      }
    ]
  },
  {
    "name": "Sal Maroni",
    "realname": "Salvatore Maroni",
    "base": "30mm",
    "rep": 73,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Organized Crime"],
    "img": "img/SalMaroni.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Dirty Money",
      "Elite Boss (Gangster)",
      "Hidden Sniper",
      "Intimidate",
      "Long Guns",
      "Menace",
      "The Boss"
    ],
    "weapons": [
      {
        "name": "Acid Bottle",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Acid / Caustic / Reach (1)"
      }
    ]
  },
  {
    "name": "Fat Johnny",
    "realname": "John D'Amico",
    "base": "30mm",
    "rep": 22,
    "funding": 150,
    "rank": ["Henchman"],
    "faction": ["Organized Crime"],
    "img": "img/FatJohnny.png",
    "stats": {
      "Attack": 4,
      "Defense": 2,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Criminal",
      "Repairman",
      "Sturdy"
    ],
    "weapons": [
      {
        "name": "Gun",
        "damage": "🩸★",
        "rof": 2,
        "ammo": 2,
        "traits": "Firearm / S. Range"
      },
      {
        "name": "Crowbar",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Heavy"
      }
    ]
  },
  {
    "name": "Battista",
    "realname": "Andrea D'Amico",
    "base": "30mm",
    "rep": 29,
    "funding": 250,
    "rank": ["Henchman"],
    "faction": ["Organized Crime"],
    "img": "img/Battista.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Criminal",
      "Elite (Gangster)",
      "Take Cover!"
    ],
    "weapons": [
      {
        "name": "Shotgun",
        "damage": "🩸🩸★",
        "rof": 1,
        "ammo": 3,
        "traits": "Firearm / M. Range / Assault"
      }
    ]
  },
  {
    "name": "The Roman",
    "realname": "Carmine Falcone",
    "base": "30mm",
    "rep": 75,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Organized Crime"],
    "img": "img/TheRoman.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 8,
      "Endurance": 7
    },
    "traits": [
      "Aversion (Catwoman)",
      "Bluff",
      "Demotivate",
      "Elite Boss (Gangster)",
      "Grand Strategist",
      "Invaluable",
      "Lord of Business",
      "Revenge",
      "Runaway",
      "Taunt",
      "The Untouchable"
    ],
    "weapons": []
  },
  {
    "name": "The Ventriloquist",
    "realname": "Arnold Wesker",
    "base": "30mm",
    "rep": 73,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Organized Crime"],
    "img": "img/TheVentriloquist.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 8,
      "Endurance": 6
    },
    "traits": [
      "Elite Boss (Gangster)",
      "Elusive",
      "Goad",
      "Hard Guys",
      "Leadership",
      "Master Criminal",
      "Tough Skin",
      "Weak"
    ],
    "weapons": [
      {
        "name": "Thompson",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 3,
        "traits": "Firearm / M. Range"
      }
    ]
  },
  {
    "name": "The Holiday Killer",
    "realname": "Alberto Falcone",
    "base": "30mm",
    "rep": 60,
    "funding": 350,
    "rank": ["Sidekick"],
    "faction": ["Organized Crime"],
    "img": "img/TheHolidayKiller.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Assassin (3)",
      "Aversion (Maroni)",
      "Cruel",
      "Hidden",
      "Stealth",
      "Strategist",
      "The Holiday Killer"
    ],
    "weapons": [
      {
        "name": "Hidden Weapon",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 3,
        "traits": "Assault / Firearm / S. Range / Silencer"
      }
    ]
  },
  {
    "name": "Carmine Falcone (John Turturro)",
    "realname": "Carmine Falcone",
    "base": "60mm",
    "rep": 100,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Organized Crime"],
    "img": "img/CarmineFalconeTurturro.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 8,
      "Endurance": 6
    },
    "traits": [
      "Coordination",
      "Corrupt",
      "Criminal",
      "Intel Support (6)",
      "Lord of Business",
      "Pulling the Strings",
      "Strategist",
      "This is My City"
    ],
    "weapons": [
      {
        "name": "Influence",
        "damage": "-",
        "rof": "-",
        "ammo": "-",
        "traits": "Reach (6) / Push (4)"
      }
    ]
  },
  {
    "name": "Fright",
    "realname": "Linda Friitawa",
    "base": "40mm",
    "rep": 70,
    "funding": 300,
    "rank": ["Sidekick"],
    "faction": ["Organized Crime"],
    "img": "img/Fright.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "3+",
      "Movement": 12,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Discourage",
      "Inspire Fear",
      "Lieutenant (Black Mask)",
      "Psycho",
      "Reflexes",
      "Reinforced Gloves",
      "Scientific",
      "Superior Sense of Smell",
      "True Love (Black Mask)"
    ],
    "weapons": [
      {
        "name": "Automatic Gun",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 2,
        "traits": "Firearm / S. Range"
      }
    ]
  },
  {
    "name": "The Penguin (Colin Farrell)",
    "realname": "Oswald Chesterfield Cobblepot",
    "base": "40mm",
    "rep": 70,
    "funding": 300,
    "rank": ["Sidekick"],
    "faction": ["Organized Crime"],
    "img": "img/ThePenguinFarrell.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Business Agent",
      "Drop It!",
      "Handyman",
      "Lieutenant (Carmine Falcone)",
      "Order",
      "Protect Me!"
    ],
    "weapons": [
      {
        "name": "SMG",
        "damage": "🩸🩸",
        "rof": 4,
        "ammo": 2,
        "traits": "Firearm / S. Range"
      }
    ]
  },

//----------------------------------------------------------------------------------------------------------------------------------
//DOOM PATROL
//----------------------------------------------------------------------------------------------------------------------------------
  {
    "name": "Beast Boy - Tiger Teen Titans",
    "realname": "Unknown",
    "base": "40mm",
    "rep": 0,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Bat Family"],
    "img": "img/BeastBoyTiger.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 12,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Always on the Move",
      "Master of Stealth",
      "Shapeshifting Tiger Progress",
      "Shapeshifting",
      "Sneak Attack",
      "Teen Titans"
    ],
    "weapons": [
      {
        "name": "Tiger Claws",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp / Terror"
      }
    ]
  },
  {
    "name": "Beast Boy - Gorilla Teen Titans",
    "realname": "Unknown",
    "base": "40mm",
    "rep": 0,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Bat Family"],
    "img": "img/BeastBoyGorrila.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Acrobat",
      "Large",
      "Obstinate",
      "Shapeshifting Gorilla Progress",
      "Shapeshifting",
      "Teen Titans",
      "Tough Skin"
    ],
    "weapons": [
      {
        "name": "Gorilla Fists",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Devastating / Protective"
      }
    ]
  },
  {
    "name": "Beast Boy - Hawk Teen Titans",
    "realname": "Unknown",
    "base": "40mm",
    "rep": 0,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Bat Family"],
    "img": "img/BeastBoyHawk.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 15,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Claws",
      "Dodge",
      "Elusive",
      "Fly",
      "Shapeshifting Hawk Progress",
      "Shapeshifting",
      "Teen Titans"
    ],
    "weapons": []
  },

{
    "name": "Beast Boy - Human (Teen Titans)",
    "rep": 50,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Bat Family"],
    "img": "img/BeastBoy_Human.png",
    "stats": {
      "Attack": 3,
      "Defense": 5,
      "Strength": 5,
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Acrobat",
      "Shapeshifting",
      "Shapeshifting Human Progress",
      "Teen Titans",
      "Vigilante's Work"
    ],
    "weapons": [
    {}
  ]
  },
  {
    "name": "The Chief",
    "rep": 70,
    "funding": 200,
    "rank": ["Leader"],
    "faction": ["Doom Patrol", "GCPD"],
    "img": "img/The_Chief.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": 4,
      "Movement": 6,
      "Willpower": 8,
      "Endurance": 6
    },
    "traits": [
      "Genius",
      "Leadership",
      "Medic",
      "Mastermind",
      "Protect Me!",
      "Psycho",
      "Scientific",
      "Strategist",
      "Wheelchair"
    ],
    "weapons": [
    {
      "name": "Hidden Gun",
      "damage": "🩸★", 
      "rof": 2,
      "ammo": 2,
      "traits": "Firearm / S. Range"
    }
  ]
  },
  {
    "name": "Elasti-Girl",
    "rep": 61,
    "funding": 0,
    "rank": ["Sidekick"],
    "faction": ["Doom Patrol", "GCPD"],
    "img": "img/ElastiGirl.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Extended Limbs",
      "Performance",
      "Regeneration",
      "Resident",
      "Stretching",
      "True Love (Beast Boy)",
      "Undercover"
    ],
    "weapons": [
    {}
    ]
  },
  {
    "name": "Crazy Jane",
    "rep": 55,
    "funding": 0,
    "rank": ["Sidekick"],
    "faction": ["Doom Patrol", "GCPD"],
    "img": "img/Crazy_Jane.png",
    "stats": {
      "Attack": 3,
      "Defense": 5,
      "Strength": 5,
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Bipolar (Mental Disorder)",
      "Personality",
      "Self-Discipline",
      "Sturdy"
    ],
    "weapons": [
    {
      "name": "Lightning",
      "damage": "🩸★", 
      "rof": 3,
      "ammo": "-",
      "traits": "Beam / Electric / M. Range / Throwing"
    },
    {
      "name": "Flame Bilts",
      "damage": "•★", 
      "rof": 2,
      "ammo": "-",
      "traits": "Beam / Fire (2) / S. Range / Throwing"
    }
  ]
  },
  {
    "name": "Negative Man",
    "rep": 79,
    "funding": 0,
    "rank": ["Sidekick"],
    "faction": ["Doom Patrol", "GCPD"],
    "img": "img/Negative_Man.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": 4,
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 6
    },
    "traits": [
      "Bluff",
      "Disappearing",
      "Fly",
      "Obstinate",
      "Radioactive Soul-Self"
    ],
    "weapons": [
    {
      "name": "Minor Explosions",
      "damage": "🩸★", 
      "rof": 2,
      "ammo": 3,
      "traits": "Beam / S. Range / Explosive"
    }
    ]
  },
  {
    "name": "Robotman",
    "rep": 85,
    "funding": 0,
    "rank": ["Sidekick"],
    "faction": ["Doom Patrol", "GCPD"],
    "img": "img/Robotman.png",
    "stats": {
      "Attack": 4,
      "Defense": 3,
      "Strength": 8,
      "Movement": 8,
      "Willpower": 7,
      "Endurance": 9
    },
    "traits": [
      "Cybernetic",
      "Desensitized",
      "Medium Armor",
      "Order",
      "Steel Hands",
      "True Love (Crazy Jane)",
      "Unstoppable"
    ],
    "weapons": []
  },

//---------------------------------------------------------------------------------------------------------------------------------------------
//Bane 
//---------------------------------------------------------------------------------------------------------------------------------------------

  {
    "name": "Bane Unleashed",
    "realname": "Unknown",
    "base": "60mm",
    "rep": 161,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Bane"],
    "img": "img/BaneUnleashed.png",
    "stats": {
      "Attack": 6,
      "Defense": 2,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 9,
      "Endurance": 14
    },
    "traits": [
      "Accelerated Venom",
      "Breaking the Bat",
      "Desensitized",
      "Elite Boss (Soldier of Fortune)",
      "Grudge Match",
      "Huge",
      "Like Flies to Me",
      "Tough Guy",
      "Venom Dose (4)",
      "Venom Enrage",
      "Veteran"
    ],
    "weapons": [
      {
        "name": "Unleashed Strength",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Bleed (2)"
      }
    ]
  },
  {
    "name": "Batman",
    "realname": "Thomas Wayne",
    "base": "40mm",
    "rep": 133,
    "funding": 0,
    "rank": ["Sidekick"],
    "faction": ["Bane"],
    "img": "img/BatmanSword.png",
    "stats": {
      "Attack": 5,
      "Defense": 4,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 8,
      "Endurance": 10
    },
    "traits": [
      "Bat Cape",
      "Bat-Armor MK II",
      "Batclaw",
      "Detective",
      "Grand Strategist",
      "Mastermind",
      "Medic",
      "Paramedic",
      "Precise Blow",
      "Reinforced Gloves",
      "Vigilante's Work"
    ],
    "weapons": [
      {
        "name": "Amazon's Sword",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Shield Breaker / Sharp"
      }
    ]
  },

  {
    "name": "Bane Titan",
    "realname": "Unknown",
    "base": "60mm",
    "rep": 140,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Bane"],
    "img": "img/BaneTitan.png",
    "stats": {
      "Attack": 5,
      "Defense": 2,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 9,
      "Endurance": 14
    },
    "traits": [
      "Charge",
      "Huge",
      "Recover the Titan",
      "Titan Addict",
      "Tough Guy",
      "Veteran",
      "Desensitized",
      "Like Flies to Me",
      "Savage Throw",
      "Unstoppable"
    ],
    "weapons": [
      {
        "name": "Unleashed Strength",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Bleed (2)"
      }
    ]
  },
  {
    "name": "Medic OP",
    "realname": "Dillon",
    "base": "30mm",
    "rep": 21,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Bane"],
    "img": "img/MedicOP.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Medic",
      "Paramedic",
      "Veteran"
    ],
    "weapons": [
      {
        "name": "Surgical Knife",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Sharp"
      }
    ]
  },
  {
    "name": "Bird Classic",
    "realname": "Angel Vallelunga",
    "base": "40mm",
    "rep": 58,
    "funding": 300,
    "rank": ["Sidekick"],
    "faction": ["Bane"],
    "img": "img/BirdClassic.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 7
    },
    "traits": [
      "Elite Boss (Soldier of Fortune)",
      "Falconry",
      "Go My Little Birds",
      "Lieutenant (Bane)",
      "Self-Discipline",
      "Veteran"
    ],
    "weapons": [
      {
        "name": "Talon's Ranged Attack",
        "damage": "🩸🩸★",
        "rof": 1,
        "ammo": 4,
        "traits": "M. Range / Mechanical / Sharp"
      },
      {
        "name": "Combined Attack",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp / Reach (6)"
      }
    ]
  },
  {
    "name": "Bird",
    "realname": "Angel Vallelunga",
    "base": "30mm",
    "rep": 60,
    "funding": 100,
    "rank": ["Sidekick"],
    "faction": ["Bane"],
    "img": "img/Bird.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 7
    },
    "traits": [
      "Bat Cape",
      "Bulletproof Vest",
      "Elite Boss (Soldier of Fortune)",
      "Military Tradition",
      "One of the Boys",
      "Self-Discipline",
      "Veteran",
      "Weapon Master"
    ],
    "weapons": [
      {
        "name": "Combat Machete",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      },
      {
        "name": "Smoke Grenades",
        "damage": "-",
        "rof": 1,
        "ammo": 1,
        "traits": "Grenade / S. Range / Smoke"
      }
    ]
  },
  {
    "name": "Bane Rebirth",
    "realname": "Unknown",
    "base": "40mm",
    "rep": 161,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Bane"],
    "img": "img/BaneRebirth.png",
    "stats": {
      "Attack": 6,
      "Defense": 3,
      "Strength": "3+",
      "Movement": 8,
      "Willpower": 9,
      "Endurance": 10
    },
    "traits": [
      "Cool Under Fire",
      "Desensitized",
      "I Will Break You",
      "Mastermind",
      "Tough Guy",
      "Veteran",
      "Coordination",
      "Elite Boss (Soldier of Fortune)",
      "Large",
      "Reinforced Gloves",
      "Venom Dose (2)",
      "Venom Enrage"
    ],
    "weapons": []
  },
  {
    "name": "Vengeance",
    "realname": "Unknown",
    "base": "40mm",
    "rep": 105,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Bane"],
    "img": "img/Vengeance.png",
    "stats": {
      "Attack": 5,
      "Defense": 4,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 10
    },
    "traits": [
      "Close Combat Master",
      "Desensitized",
      "Large",
      "Mastermind",
      "Raised with Venom",
      "Reinforced Gloves",
      "Unstoppable",
      "Vengeance",
      "Venom Dose (4)",
      "Venom Enrage",
      "Veteran"
    ],
    "weapons": []
  },
  {
    "name": "Bane The Bat",
    "realname": "Unknown",
    "base": "60mm",
    "rep": 170,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Bane"],
    "img": "img/BaneTheBat.png",
    "stats": {
      "Attack": 6,
      "Defense": 3,
      "Strength": "3+",
      "Movement": 8,
      "Willpower": 9,
      "Endurance": 10
    },
    "traits": [
      "Bat Cape",
      "Desensitized",
      "Large",
      "Master Fighter",
      "Mastermind",
      "Reinforced Gloves",
      "Venom Dose (1)",
      "Venom Enrage",
      "Veteran",
      "Batman Lives",
      "I Will Break You",
      "Light Armor"
    ],
    "weapons": [
      {
        "name": "Bat-Signal",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "One Use / Sharp"
      }
    ]
  },
  {
    "name": "Dreadnought OP",
    "realname": "Billy",
    "base": "30mm",
    "rep": 44,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Bane"],
    "img": "img/DreadnoughtOP.png",
    "stats": {
      "Attack": 4,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 7
    },
    "traits": [
      "Devastating Blow",
      "Elite (Soldier of Fortune)",
      "Light Armor",
      "Veteran"
    ],
    "weapons": [
      {
        "name": "Tomahawk",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Devastating / Handy"
      }
    ]
  },
  {
    "name": "Elite OP",
    "realname": "Duke",
    "base": "30mm",
    "rep": 30,
    "funding": 600,
    "rank": ["Henchman"],
    "faction": ["Bane"],
    "img": "img/EliteOP.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Elite (Soldier of Fortune)",
      "Light Armor",
      "Rain of Bullets",
      "Shooter",
      "Veteran"
    ],
    "weapons": [
      {
        "name": "Assault Rifle",
        "damage": "🩸🩸🩸",
        "rof": 3,
        "ammo": 2,
        "traits": "Firearm"
      }
    ]
  },
  {
    "name": "Bane Commander",
    "realname": "Unknown",
    "base": "40mm",
    "rep": 95,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Bane"],
    "img": "img/BaneCommander.png",
    "stats": {
      "Attack": 5,
      "Defense": 3,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 10
    },
    "traits": [
      "Desensitized",
      "Elite Boss (Soldier of Fortune)",
      "Large",
      "Master Fighter",
      "Order",
      "Reinforced Gloves",
      "Savage Fighter",
      "Scheming (2)",
      "Sturdy",
      "Tough Guy",
      "Venom Dose (2)",
      "Veteran"
    ],
    "weapons": []
  },
  {
    "name": "Lieutenant OP",
    "realname": "Ross",
    "base": "30mm",
    "rep": 35,
    "funding": 100,
    "rank": ["Henchman"],
    "faction": ["Bane"],
    "img": "img/LieutenantOP.png",
    "stats": {
      "Attack": 4,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Follow Me!",
      "Lantern",
      "Radio",
      "Veteran"
    ],
    "weapons": [
      {
        "name": "Frag Grenade",
        "damage": "🩸★",
        "rof": 1,
        "ammo": 1,
        "traits": "Explosive / Firearm / Grenade / S. Range / Bleed (1)"
      },
      {
        "name": "Electric Baton",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Electric / Handy / Mechanical"
      }
    ]
  },
  {
    "name": "Cuchillo",
    "realname": "Diaz",
    "base": "30mm",
    "rep": 24,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Bane"],
    "img": "img/Cuchillo.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Bulletproof Vest",
      "Sneak Attack",
      "Stealth",
      "Tough Guy",
      "Veteran"
    ],
    "weapons": [
      {
        "name": "Knife",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      }
    ]
  },
  {
    "name": "Stealth OP",
    "realname": "Kabuto",
    "base": "30mm",
    "rep": 32,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Bane"],
    "img": "img/StealthOP.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Bulletproof Vest",
      "Elite (Soldier of Fortune)",
      "Stealth",
      "Tough Guy",
      "Undercover",
      "Veteran"
    ],
    "weapons": [
      {
        "name": "Katana",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Sharp"
      }
    ]
  },
  {
    "name": "Infiltrate OP",
    "realname": "Claire",
    "base": "30mm",
    "rep": 46,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["Bane"],
    "img": "img/InfiltrateOP.png",
    "stats": {
      "Attack": 3,
      "Defense": 5,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Hacking",
      "Hidden",
      "Master of Stealth",
      "Radio",
      "Veteran"
    ],
    "weapons": [
      {
        "name": "Light Assault Carbine",
        "damage": "🩸",
        "rof": 4,
        "ammo": 3,
        "traits": "Assault / Firearm / M. Range / Red Dot"
      }
    ]
  },
  {
    "name": "Macgregor",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 26,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Bane"],
    "img": "img/Macgregor.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Bulletproof Vest",
      "Coordination",
      "Veteran",
      "Weapon Master"
    ],
    "weapons": [
      {
        "name": "Combat Machete",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      }
    ]
  },
  {
    "name": "Clover",
    "realname": "Sullivan",
    "base": "30mm",
    "rep": 30,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["Bane"],
    "img": "img/Clover.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Bulletproof Vest",
      "Rain of Bullets",
      "Veteran"
    ],
    "weapons": [
      {
        "name": "Automatic Gun",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 2,
        "traits": "S. Range / Firearm / Light"
      }
    ]
  },
  {
    "name": "Sharp Shooter",
    "realname": "Kyle Kurt",
    "base": "30mm",
    "rep": 33,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["Bane"],
    "img": "img/SharpShooter.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Elite (Soldier of Fortune)",
      "Hold Breath",
      "Undercover",
      "Veteran"
    ],
    "weapons": [
      {
        "name": "Sniper Rifle",
        "damage": "🩸🩸🩸🩸",
        "rof": 1,
        "ammo": 2,
        "traits": "Aim / Anti-Tank / Bleed (3) / Firearm / Reload / Scope"
      }
    ]
  },
  {
    "name": "Malicia",
    "realname": "Malicia",
    "base": "30mm",
    "rep": 54,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Bane"],
    "img": "img/Malicia.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 7
    },
    "traits": [
      "Medium Armor",
      "Reinforced Armor",
      "Reinforced Gloves",
      "Tough Guy",
      "Veteran",
      "Raised with Venom",
      "Super Jump",
      "Venom Dose (2)"
    ],
    "weapons": []
  },
  {
    "name": "The Builder",
    "realname": "Adam Schnauzer",
    "base": "40mm",
    "rep": 35,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Bane"],
    "img": "img/TheBuilder.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 10
    },
    "traits": [
      "Grudge Match",
      "Large",
      "Moment of Glory",
      "Protein's Shaker (Dose)",
      "Teamwork (1) (Wrestler)",
      "Wrestler"
    ],
    "weapons": [
      {
        "name": "Elbow Smash",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Overwhelming"
      }
    ]
  },
  {
    "name": "Smash",
    "realname": "Unknown",
    "base": "40mm",
    "rep": 42,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Bane"],
    "img": "img/Smash.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 8
    },
    "traits": [
      "Bulletproof Vest",
      "Grudge Match",
      "Large",
      "Tough Guy",
      "Veteran"
    ],
    "weapons": [
      {
        "name": "Knife",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      },
      {
        "name": "Wrecking Hammer",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Heavy / Handy / Devastating"
      }
    ]
  },
  {
    "name": "Ted Hunter",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 32,
    "funding": 250,
    "rank": ["Henchman"],
    "faction": ["Bane"],
    "img": "img/TedHunter.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Bulletproof Vest",
      "Good Aim",
      "Hunter",
      "Tracking",
      "Veteran"
    ],
    "weapons": [
      {
        "name": "Shotgun",
        "damage": "🩸🩸★",
        "rof": 1,
        "ammo": 3,
        "traits": "Firearm / M. Range / Assault"
      },
      {
        "name": "Knife",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      }
    ]
  },
 
  {
    "name": "Schoolboy",
    "realname": "Ike",
    "base": "30mm",
    "rep": 30,
    "funding": 400,
    "rank": ["Henchman"],
    "faction": ["Bane"],
    "img": "img/Schoolboy.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Elite (Soldier of Fortune)",
      "Gas Mask",
      "Veteran"
    ],
    "weapons": [
      {
        "name": "Rocket Launcher",
        "damage": "🩸🩸🩸",
        "rof": 1,
        "ammo": 2,
        "traits": "Firearm / M. Range / Explosive / Aim / Anti-Tank"
      }
    ]
  },
  {
    "name": "Support OP",
    "realname": "Dolph Wolf",
    "base": "30mm",
    "rep": 32,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["Bane"],
    "img": "img/SupportOP.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Bulletproof Vest",
      "Elite (Soldier of Fortune)",
      "Hardened",
      "Veteran"
    ],
    "weapons": [
      {
        "name": "Grenade Launcher",
        "damage": "🩸★",
        "rof": 1,
        "ammo": 2,
        "traits": "Explosive / Firearm / Grenade / M. Range"
      },
      {
        "name": "Grenade Launcher (Smoke)",
        "damage": "-",
        "rof": 1,
        "ammo": 2,
        "traits": "Grenade / M. Range / Smoke"
      }
    ]
  },
  
  {
    "name": "Red Bastard",
    "realname": "Ernesto Machado",
    "base": "40mm",
    "rep": 35,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Bane"],
    "img": "img/RedBastard.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 10
    },
    "traits": [
      "Bonebreaker",
      "Large",
      "Moment of Glory",
      "Teamwork (1) (Wrestler)",
      "The Dude",
      "Wrestler"
    ],
    "weapons": [
      {
        "name": "Elbow Smash",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Overwhelming"
      }
    ]
  },

//---------------------------------------------------------------------------------------------------------// 
//Joker
//---------------------------------------------------------------------------------------------------------// 

  {
    "name": "Grumpy",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 24,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/Grumpy.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Backpack",
      "Bank Robber",
      "Drop It!",
      "Expendable",
      "Paranoid (Mental Disorder)"
    ],
    "weapons": [
      {
        "name": "Automatic Gun",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 2,
        "traits": "S. Range / Firearm / Light"
      }
    ]
  },
  {
    "name": "Happy",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 26,
    "funding": 0,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/Happy.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Anger Management (Mental)",
      "Bank Robber",
      "Expendable",
      "Grapple Gun"
    ],
    "weapons": [
      {
        "name": "Grapple Gun",
        "damage": "🩸★★",
        "rof": 1,
        "ammo": 2,
        "traits": "Mechanical / S. Range / Pull (4)"
      }
    ]
  },
  {
    "name": "Gaggy Rebirth",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 16,
    "funding": 0,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/GaggyRebirth.png",
    "stats": {
      "Attack": 3,
      "Defense": 2,
      "Strength": "6+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 4
    },
    "traits": [
      "Aggressive Schizophrenia",
      "Aversion (Harley Quinn)",
      "Demotivate",
      "Provoke",
      "Psycho",
      "Small",
      "True Love (Joker The Clown)"
    ],
    "weapons": [
      {
        "name": "Electric Baton",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Electric / Handy / Mechanical"
      }
    ]
  },
  {
    "name": "Joker's Biker 2",
    "realname": "Unknown",
    "base": "42x75mm",
    "rep": 28,
    "funding": 0,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/JokersBiker2.png",
    "stats": {
      "Attack": 4,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Always on the Move",
      "Anxiety (Mental Disorder)",
      "Death Pack",
      "Fast (3)",
      "Mechanical Mount"
    ],
    "weapons": [
      {
        "name": "Spiked-Hockey Stick",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Reach (1)"
      }
    ]
  },
  {
    "name": "Joker's Bus Driver",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 25,
    "funding": 150,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/JokersBusDriver.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Bank Robber",
      "Bodyguard",
      "Expendable",
      "Pyromania (Mental Disorder)",
      "Timely Arrival"
    ],
    "weapons": [
      {
        "name": "Shotgun",
        "damage": "🩸🩸★",
        "rof": 1,
        "ammo": 3,
        "traits": "Firearm / M. Range / Assault"
      }
    ]
  },
  {
    "name": "Joker's Para-Military 2",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 28,
    "funding": 500,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/JokersParaMilitary2.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Anger Management (Mental Disorder)",
      "Bloodlust",
      "Bulletproof Vest",
      "Street Guy",
      "Undercover"
    ],
    "weapons": [
      {
        "name": "Knife",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      },
      {
        "name": "Custom Assault Gun",
        "damage": "🩸🩸",
        "rof": 3,
        "ammo": 2,
        "traits": "M. Range / Firearm / Assault / Red Dot"
      }
    ]
  },
  {
    "name": "Joker's Para-Military 3",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 28,
    "funding": 400,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/JokersParaMilitary3.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Bloodlust",
      "Bulletproof Vest",
      "Paranoid (Mental Disorder)",
      "Street Guy",
      "Undercover"
    ],
    "weapons": [
      {
        "name": "Rocket Launcher",
        "damage": "🩸🩸🩸",
        "rof": 1,
        "ammo": 2,
        "traits": "Firearm / M. Range / Explosive / Aim / Anti-Tank"
      },
      {
        "name": "Gas Rocket",
        "damage": "-",
        "rof": 1,
        "ammo": 1,
        "traits": "M. Range / Explosive / Poison / Enervating (2) / Gas"
      }
    ]
  },
  {
    "name": "Joker's Para-Military 1",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 23,
    "funding": 0,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/JokersParaMilitary1.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Bloodlust",
      "Bloodthirsty (Mental Disorder)",
      "Hardened",
      "Street Guy",
      "Undercover"
    ],
    "weapons": [
      {
        "name": "Kukri",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Sharp / Heavy"
      }
    ]
  },
  {
    "name": "Chuckcles",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 23,
    "funding": 200,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/Chuckcles.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Backpack",
      "Bank Robber",
      "Bipolar (Mental Disorder)",
      "Expendable"
    ],
    "weapons": [
      {
        "name": "SMG",
        "damage": "🩸🩸",
        "rof": 4,
        "ammo": 1,
        "traits": "Firearm / S. Range"
      }
    ]
  },
  {
    "name": "Blunderbuss Clown",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 16,
    "funding": 200,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/BlunderbussClown.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Explosive Teeth",
      "Paranoid (Mental Disorder)"
    ],
    "weapons": [
      {
        "name": "Explosive Teeth Blunderbuss",
        "damage": "🩸★",
        "rof": 1,
        "ammo": 1,
        "traits": "S. Range / Mechanical / Explosive / Handy"
      }
    ]
  },
  {
    "name": "Joker's Victim 1",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 5,
    "funding": 0,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/JokersVictim1.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "6+",
      "Movement": 8,
      "Willpower": 3,
      "Endurance": 3
    },
    "traits": [
      "Death Pack",
      "Faint",
      "Horde",
      "Mindless Monster",
      "Stupid"
    ],
    "weapons": [
      {
        "name": "Grab",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Enervating (1)"
      }
    ]
  },
  {
    "name": "Joker's Victim 2",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 5,
    "funding": 0,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/JokersVictim2.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "6+",
      "Movement": 8,
      "Willpower": 3,
      "Endurance": 3
    },
    "traits": [
      "Death Pack",
      "Faint",
      "Horde",
      "Mindless Monster",
      "Stupid"
    ],
    "weapons": [
      {
        "name": "Tube",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Heavy"
      }
    ]
  },
  {
    "name": "Street Jester 2",
    "realname": "Unknown Jester",
    "base": "30mm",
    "rep": 20,
    "funding": 0,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/StreetJester2.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 5
    },
    "traits": [
      "Feint",
      "OCD (Mental Disorder)",
      "Street Fighter"
    ],
    "weapons": [
      {
        "name": "Paired Katanas",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Overwhelming / Sharp"
      }
    ]
  },
  {
    "name": "Street Jester 3",
    "realname": "Unknown Jester",
    "base": "30mm",
    "rep": 24,
    "funding": 200,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/StreetJester3.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Joker's Gas",
      "Luck",
      "Paranoid (Mental Disorder)"
    ],
    "weapons": [
      {
        "name": "Expansive Gas",
        "damage": "🩸",
        "rof": 1,
        "ammo": 4,
        "traits": "Expansive / Mechanical / Throwing / Poison / Bleed (2)"
      }
    ]
  },
  {
    "name": "Axe Clown",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 17,
    "funding": 100,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/AxeClown.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Aggressive Schizophrenia",
      "Electric Storm"
    ],
    "weapons": [
      {
        "name": "Electrified Axe",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Heavy / CRT (Stunned)"
      }
    ]
  },
  {
    "name": "Barrel Clown",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 20,
    "funding": 100,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/BarrelClown.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Anger Management (Mental Disorder)",
      "Bio-Chemical Barrel",
      "Bio-Chemical Recharge"
    ],
    "weapons": [
      {
        "name": "Ace Chemical Barrel",
        "damage": "★",
        "rof": 1,
        "ammo": 2,
        "traits": "S. Range / Mechanical / Explosive / Poison / Enervating (1)"
      }
    ]
  },
  {
    "name": "Street Jester 4",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 18,
    "funding": 0,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/StreetJester4.png",
    "stats": {
      "Attack": 3,
      "Defense": 2,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 5
    },
    "traits": [
      "360° Strike",
      "Impetuous",
      "Sneaking",
      "The Voices (Mental Disorder)"
    ],
    "weapons": [
      {
        "name": "Funny-Hammer",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Blunt (3) / Motion (2) / Reach (1)"
      }
    ]
  },
  {
    "name": "Chainsaw Clown",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 18,
    "funding": 350,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/ChainsawClown.png",
    "stats": {
      "Attack": 3,
      "Defense": 2,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Bipolar (Mental Disorder)",
      "Street Guy"
    ],
    "weapons": [
      {
        "name": "Tri-Chainsaw",
        "damage": "🩸🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Mechanical / Imprecise / Sharp / Bleed (3)"
      }
    ]
  },
  {
    "name": "Street Jester 1",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 28,
    "funding": 200,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/StreetJester1.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 7
    },
    "traits": [
      "Boom!",
      "Desensitized",
      "Dispersion",
      "Flare",
      "Hardened",
      "Pyromania (Mental Disorder)"
    ],
    "weapons": [
      {
        "name": "Fireworks",
        "damage": "🩸🩸★",
        "rof": 1,
        "ammo": 2,
        "traits": "M. Range / Explosive / Mechanical / Fire / Imprecise"
      }
    ]
  },
  {
    "name": "Thorgon",
    "realname": "Unknown",
    "base": "40mm",
    "rep": 45,
    "funding": 0,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/Thorgon.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "3+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 8
    },
    "traits": [
      "Bio-Chemical Barrel",
      "Bio-Chemical Recharge",
      "Charge",
      "Desensitized",
      "Large",
      "OCD (Mental Disorder)",
      "Sturdy",
      "Teamwork (1) (Borgon)"
    ],
    "weapons": [
      {
        "name": "Unworthy",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Devastating / Heavy / Reach (2)"
      }
    ]
  },
  {
    "name": "Joker's Victim 3",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 5,
    "funding": 0,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/JokersVictim3.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "6+",
      "Movement": 8,
      "Willpower": 3,
      "Endurance": 3
    },
    "traits": [
      "Death Pack",
      "Faint",
      "Horde",
      "Mindless Monster",
      "Stupid"
    ],
    "weapons": [
      {
        "name": "Knife",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      }
    ]
  },
  {
    "name": "Dynamite",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 22,
    "funding": 0,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/Dynamite.png",
    "stats": {
      "Attack": 3,
      "Defense": 2,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 5
    },
    "traits": [
      "Bloodthirsty (Mental Disorder)",
      "Boom!",
      "Taunt"
    ],
    "weapons": [
      {
        "name": "Axe",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Heavy"
      }
    ]
  },
  {
    "name": "Gas Puppet 3",
    "realname": "Unknown Puppet",
    "base": "30mm",
    "rep": 5,
    "funding": 0,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/GasPuppet3.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "6+",
      "Movement": 8,
      "Willpower": 3,
      "Endurance": 3
    },
    "traits": [
      "Anxiety (Mental Disorder)",
      "Death Pack",
      "Faint",
      "Mindless Gas Attack",
      "Minion (3)",
      "Stupid"
    ],
    "weapons": [
      {
        "name": "Scare Gas",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Gas / Scared / Reach (4)"
      }
    ]
  },
  {
    "name": "Gas Puppet 1",
    "realname": "Unknown Puppet",
    "base": "30mm",
    "rep": 5,
    "funding": 0,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/GasPuppet1.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "6+",
      "Movement": 8,
      "Willpower": 3,
      "Endurance": 3
    },
    "traits": [
      "Anxiety (Mental Disorder)",
      "Death Pack",
      "Faint",
      "Mindless Gas Attack",
      "Minion (3)",
      "Stupid"
    ],
    "weapons": [
      {
        "name": "Enervating Gas",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Gas / Enervating (2) / Reach (2)"
      }
    ]
  },
  {
    "name": "Joker's Biker 1",
    "realname": "Unknown",
    "base": "42x75mm",
    "rep": 33,
    "funding": 350,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/JokersBiker1.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Always on the Move",
      "Bipolar (Mental Disorder)",
      "Death Marks",
      "Fast (3)",
      "Mechanical Mount"
    ],
    "weapons": [
      {
        "name": "Custom SMG",
        "damage": "🩸🩸",
        "rof": 4,
        "ammo": 2,
        "traits": "Assault / Firearm / S. Range"
      }
    ]
  },
  {
    "name": "Bouffon",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 22,
    "funding": 200,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/Bouffon.png",
    "stats": {
      "Attack": 3,
      "Defense": 2,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "OCD (Mental Disorder)",
      "Undercover"
    ],
    "weapons": [
      {
        "name": "Nail Gun",
        "damage": "🩸",
        "rof": 5,
        "ammo": 2,
        "traits": "Assault / Mechanical / S. Range"
      }
    ]
  },
  {
    "name": "White-Face",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 24,
    "funding": 200,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/WhiteFace.png",
    "stats": {
      "Attack": 3,
      "Defense": 2,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Cruel",
      "Paranoid (Mental Disorder)"
    ],
    "weapons": [
      {
        "name": "Blunderbuss",
        "damage": "🩸🩸★",
        "rof": 1,
        "ammo": 2,
        "traits": "Firearm / Imprecise / Expansive / Reload / Assault"
      },
      {
        "name": "Bayonet",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      }
    ]
  },
  {
    "name": "Gas Puppet 2",
    "realname": "Unknown Puppet",
    "base": "30mm",
    "rep": 5,
    "funding": 0,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/GasPuppet2.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "6+",
      "Movement": 8,
      "Willpower": 3,
      "Endurance": 3
    },
    "traits": [
      "Anxiety (Mental Disorder)",
      "Death Pack",
      "Faint",
      "Mindless Gas Attack",
      "Minion (3)",
      "Stupid"
    ],
    "weapons": [
      {
        "name": "Poisonous Gas",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Gas / Poison / Reach (3)"
      }
    ]
  },
  {
    "name": "Rastaclow",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 21,
    "funding": 600,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/Rastaclow.png",
    "stats": {
      "Attack": 3,
      "Defense": 2,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Bloodthirsty (Mental Disorder)",
      "Handyman"
    ],
    "weapons": [
      {
        "name": "Custom Rifle",
        "damage": "🩸🩸🩸",
        "rof": 3,
        "ammo": 2,
        "traits": "Accurate / Firearm"
      }
    ]
  },
  {
    "name": "Borgon the Cursed",
    "realname": "Unknown",
    "base": "40mm",
    "rep": 53,
    "funding": 0,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/BorgonTheCursed.png",
    "stats": {
      "Attack": 4,
      "Defense": 2,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 10
    },
    "traits": [
      "Bloodlust",
      "Desensitized",
      "Large",
      "Mindless Monster",
      "Obsessive (Mental Disorder)",
      "Stupid",
      "Sturdy"
    ],
    "weapons": [
      {
        "name": "Borgon's Axe",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Heavy / Reach (2) / Devastating"
      }
    ]
  },
  {
    "name": "Hobo Clown",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 14,
    "funding": 0,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/HoboClown.png",
    "stats": {
      "Attack": 3,
      "Defense": 2,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Aggressive Schizophrenia",
      "Criminal"
    ],
    "weapons": [
      {
        "name": "Meat Knife",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Heavy / Sharp"
      }
    ]
  },
  {
    "name": "Ace of Spades",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 26,
    "funding": 0,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/AceOfSpades.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Joker's Gas",
      "Paranoid (Mental Disorder)",
      "Resilient"
    ],
    "weapons": [
      {
        "name": "Joker's Gas Grenades",
        "damage": "🩸",
        "rof": 1,
        "ammo": 2,
        "traits": "Explosive / Gas / Grenade / S. Range / Enervating (1) / Poison"
      }
    ]
  },
  {
    "name": "Slingy Clown",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 16,
    "funding": 200,
	  "rank": ["Henchman"],
    "faction": ["Joker"],
    "img": "img/SlingyClown.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Anxiety (Mental Disorder)",
      "Tracking"
    ],
    "weapons": [
      {
        "name": "Poisoned Sling",
        "damage": "🩸",
        "rof": 2,
        "ammo": 2,
        "traits": "S. Range / Throwing / Poison / Handy"
      }
    ]
  },

  {
    "name": "Joker (Arkham Asylum)",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 105,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Joker"],
    "img": "img/JokerArkhamAsylum.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": ["Electric Handshake", "Joker's Gas", "Kaos Agent", "Luck", "One Shot Gun", "Protect Me!", "Total Vision", "Trickster"],
    "weapons": [
      {
        "name": "Explosive Teeth",
        "damage": "🩸★",
        "rof": "1",
        "ammo": "2",
        "traits": "Explosive / Firearm / M. Range / Remote Controlled"
      },
      {
        "name": "Poisoned Knife",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp / Crt(Poison)"
      }
    ]
  },
  {
    "name": "Joker (Dark Knight Rises)",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 82,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Joker"],
    "img": "img/JokerDarkKnightRises.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": ["Detonate", "Goad", "Henchman Bomb", "If You're Good at Something", "Kaos Agent", "Never Do It For Free", "Protect Me!", "Trickster", "True Psychopath", "Undercover"],
    "weapons": [
      {
        "name": "Joker's Automatic Gun",
        "damage": "🩸★",
        "rof": "4",
        "ammo": "3",
        "traits": "Firearm / Light / S. Range"
      },
      {
        "name": "Knife",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      }
    ]
  },
  {
    "name": "Joker (Red Hood)",
    "realname": "Unknown",
    "base": "40mm",
    "rep": 92,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Joker"],
    "img": "img/JokerRedHood.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": ["Demotivate", "Detonate", "Intimidate", "Kaos Agent", "Kill Them!", "Psycho", "Scheming (1)", "To Prove A Point", "Trickster"],
    "weapons": [
      {
        "name": "Poisoned Knife",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp / Poison"
      }
    ]
  },
  {
    "name": "Joker",
    "realname": "Unknown",
    "base": "40mm / 60mm",
    "rep": 92,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Joker"],
    "img": "img/JokerClassic.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": ["Demotivate", "Intimidate", "Kaos Agent", "Kill Them!", "Psycho", "Scheming (1)", "To Prove A Point", "Trickster"],
    "weapons": [
      {
        "name": "Joker's Gun",
        "damage": "🩸🩸🩸",
        "rof": "2",
        "ammo": "2",
        "traits": "Firearm / S. Range / Crt (Paralyze)"
      },
      {
        "name": "Poisoned Knife",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp / Poison"
      }
    ]
  },
  {
    "name": "Joker (Cesar Romero)",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 60,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Joker"],
    "img": "img/JokerCesarRomero.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 8,
      "Endurance": 7
    },
    "traits": ["Charm", "Distract", "Electric Handshake", "Kaos Agent", "Psycho", "Scheming (1)", "Trickster"],
    "weapons": [
      {
        "name": "Knife",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      }
    ]
  },
  {
    "name": "Joker (The Criminal)",
    "realname": "Unknown",
    "base": "40mm",
    "rep": 65,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Joker"],
    "img": "img/JokerTheCriminal.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": ["Detonate", "Find The Better Joker", "Good Aim", "Kaos Agent", "Luck", "Psycho", "Three Jokers", "Trickster"],
    "weapons": [
      {
        "name": "Thompson",
        "damage": "🩸🩸★",
        "rof": "3",
        "ammo": "3",
        "traits": "Firearm / M. Range / Reload / High Caliber"
      },
      {
        "name": "Knife",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      }
    ]
  },
  {
    "name": "Joker (The Clown)",
    "realname": "Unknown",
    "base": "40mm",
    "rep": 65,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Joker"],
    "img": "img/JokerTheClown.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": ["Explosive Teeth", "Kaos Agent", "Luck", "Poisoned Fish", "Psycho", "Three Jokers", "Trickster", "True Psychopath"],
    "weapons": [
      {
        "name": "Acid Flower",
        "damage": "🩸🩸",
        "rof": "1",
        "ammo": "2",
        "traits": "Acid / Light / Mechanical / S. Range"
      },
      {
        "name": "Sharp Cards",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Reach (3) / Sharp / Handy"
      }
    ]
  },
  {
    "name": "Joker (The Comedian)",
    "realname": "Unknown",
    "base": "40mm",
    "rep": 65,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Joker"],
    "img": "img/JokerTheComedian.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": ["Hidden Boss", "I Am Chaos", "Kaos Agent", "Manipulative", "One Shot Gun", "Psycho", "Three Jokers", "To Prove A Point", "Trickster"],
    "weapons": [
      {
        "name": "Camera",
        "damage": "-",
        "rof": "1",
        "ammo": "24",
        "traits": "Accurate / Light / S. Range / Blind"
      },
      {
        "name": "The Crowbar",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Blunt 2 / Devastating / Handy / Heavy"
      }
    ]
  },
  {
    "name": "Joker (Titan)",
    "realname": "Unknown",
    "base": "60mm",
    "rep": 115,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Joker"],
    "img": "img/JokerTitan.png",
    "stats": {
      "Attack": 4,
      "Defense": 3,
      "Strength": "2+",
      "Movement": 10,
      "Willpower": 8,
      "Endurance": 10
    },
    "traits": ["Bloodlust", "Juggernaut", "Kaos Agent", "Like Flies To Me", "Luck", "Lunatic Laugh", "Mindless Monster", "Really Huge", "Sturdy", "Super Jump", "The One And Only Joker"],
    "weapons": [
      {
        "name": "Massive Claws",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Crushing / Devastating / Reach (2) / Bleed (2)"
      }
    ]
  },
  {
    "name": "Joker (Christmas)",
    "realname": "Unknown",
    "base": "40mm",
    "rep": 85,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Joker"],
    "img": "img/JokerChristmas.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": ["Bat Cape", "Bloody Christmas", "Explosive Teeth", "Kaos Agent", "Luck", "Psycho", "Trickster", "Undercover"],
    "weapons": [
      {
        "name": "Candy Cane",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Crushing / Devastating / One Use"
      },
            {
        "name": "Candy Cane",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Crushing / Devastating / One Use"
      }
    ]
  },
  {
    "name": "Joker (Having Fun)",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 75,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Joker"],
    "img": "img/JokerHavingFun.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": ["Aware Of What He Did", "Catwoman's Target", "Kaos Agent", "Luck", "Pulling The Strings", "Trickster", "You're Fun"],
    "weapons": [
      {
        "name": "Thompson",
        "damage": "🩸🩸★",
        "rof": "3",
        "ammo": "3",
        "traits": "Firearm / M. Range / Reload / High Caliber"
      },
      {
        "name": "Automatic Knife",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp / Steal"
      }
    ]
  },
  {
    "name": "Joker (Explosive Arrival)",
    "realname": "Unknown",
    "base": "40mm",
    "rep": 77,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Joker"],
    "img": "img/JokerExplosiveArrival.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": ["Explosive Arrival", "Explosive Personality", "Explosive Teeths", "Kaos Agent", "Leading From Shadows", "Luck", "Psycho", "Trickster"],
    "weapons": [
      {
        "name": "Bam!",
        "damage": "🩸🩸",
        "rof": "1",
        "ammo": "2",
        "traits": "Firearm / S. Range / Assault"
      },
      {
        "name": "Cane",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Reach (1)"
      }
    ]
  },
  {
    "name": "Joker (Bat-Armor)",
    "realname": "Unknown",
    "base": "40mm",
    "rep": 85,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Joker"],
    "img": "img/JokerBatArmor.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": ["Bat Cape", "Bat-Armor MK II", "Batclaw", "I Am Chaos", "Kaos Agent", "Luck", "Psycho", "Reinforced Gloves", "Trickster"],
    "weapons": [
      {
        "name": "Bam!",
        "damage": "🩸🩸",
        "rof": "1",
        "ammo": "2",
        "traits": "Firearm / S. Range / Assault"
      },
      {
        "name": "Batarang",
        "damage": "★★",
        "rof": "2",
        "ammo": "3",
        "traits": "M. Range / Remote Controlled / Throwing"
      }
    ]
  },
  {
    "name": "Gaggy",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 63,
    "funding": 0,
    "rank": ["Sidekick"],
    "faction": ["Joker"],
    "img": "img/Gaggy.png",
    "stats": {
      "Attack": 4,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": ["360 Strike", "Aversion (Harley Quinn)", "Combat Flip", "Demotivate", "Gas Jumper", "Kapow!!!", "Large", "Psycho", "True Love (Joker)"],
    "weapons": [
      {
        "name": "Gas Dispencer",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Caustic / Reach (4)"
      }
    ]
  },
  
    {
    "name": "Archie",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 35,
    "funding": 0,
    "rank": ["Sidekick"],
    "faction": ["Joker"],
    "img": "img/Archie.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "6+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 5
    },
    "traits": ["Luck", "Sad Life", "Small", "Trully Immortal"],
    "weapons": []
  },
  {
    "name": "Harley Quinn (BTG)",
    "realname": "Dr. Harleen Frances Quinzel",
    "base": "40mm",
    "rep": 70,
    "funding": 0,
    "rank": ["Sidekick"],
    "faction": ["Joker"],
    "img": "img/HarleyQuinnBTG.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "5+",
      "Movement": 13,
      "Willpower": 6,
      "Endurance": 7
    },
    "traits": ["360 Strike", "Acrobat", "Affinity (Poison Ivy)", "Discourage", "Distract", "Fast (2)", "True Love (Joker)"],
    "weapons": [
      {
        "name": "Mallet",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Devastating / Heavy / Reach (1) / Push (3)"
      }
    ]
  },
  {
    "name": "Punchline",
    "realname": "Alexis Kaye",
    "base": "40mm",
    "rep": 66,
    "funding": 100,
    "rank": ["Sidekick"],
    "faction": ["Joker"],
    "img": "img/Punchline.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 13,
      "Willpower": 6,
      "Endurance": 7
    },
    "traits": ["Acrobat", "Aversion (Harley Quinn)", "Disguised Sneak Attack", "Fast (3)", "Psycho", "Toxicologist", "True Love (Joker)", "True Psychopath"],
    "weapons": [
      {
        "name": "Throwing Poisoned Knives",
        "damage": "🩸",
        "rof": "2",
        "ammo": "2",
        "traits": "S. Range / Throwing / Sharp / Poison"
      },
      {
        "name": "Poisoned Knives",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp / Poison"
      }
    ]
  },
  {
    "name": "Harley Quinn (Arkham Asylum)",
    "realname": "Dr. Harleen Frances Quinzel",
    "base": "30mm",
    "rep": 55,
    "funding": 0,
    "rank": ["Sidekick"],
    "faction": ["Joker"],
    "img": "img/HarleyQuinnArkhamAsylum.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "5+",
      "Movement": 12,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": ["Acrobat", "Brainwash", "Fast (2)", "Follow Me!", "Lieutenant (Joker (Titan))", "Psychiatrist", "True Love (Joker)"],
    "weapons": [
      {
        "name": "Reinforced Bat",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Heavy"
      }
    ]
  },
  {
    "name": "Harley Quinn (& The Boys)",
    "realname": "Dr. Harleen Frances Quinzel",
    "base": "40mm",
    "rep": 80,
    "funding": 200,
    "rank": ["Sidekick"],
    "faction": ["Joker"],
    "img": "img/HarleyQuinnAndTheBoys.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "5+",
      "Movement": 12,
      "Willpower": 6,
      "Endurance": 7
    },
    "traits": ["Affinity (Poison Ivy)", "Always On The Move", "Death Pack", "Distract", "Dodge", "Fast (3)", "Release The Boys!", "True Love (Joker)"],
    "weapons": [
      {
        "name": "Stupidly Big Kabum!",
        "damage": "🩸🩸",
        "rof": "1",
        "ammo": "2",
        "traits": "Assault / Devastating / Firearm / High Caliber / S. Range"
      },
      {
        "name": "Boy's Attack",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Boosted (3) / Handy / Protective"
      }
    ]
  },
  {
    "name": "Two-Face (Dark Knight)",
    "realname": "Harvey Dent",
    "base": "30mm",
    "rep": 58,
    "funding": 250,
    "rank": ["Free Agent"],
    "faction": ["Joker"],
    "img": "img/TwoFaceDarkKnight.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 7
    },
    "traits": ["Bipolar (Mental Disorder)", "Desensitized", "Dirty Fighter", "Embrace The Chaos", "Hardened", "He Was The Best Of Us", "Hidden", "Judgment", "Rapid Fire"],
    "weapons": [
      {
        "name": "Chance",
        "damage": "🩸🩸",
        "rof": "2",
        "ammo": "3",
        "traits": "Firearm / High Caliber / S. Range"
      }
    ]
  },
  {
    "name": "The Riddler (Frank Gorshin)",
    "realname": "Edward Nigma",
    "base": "30mm",
    "rep": 40,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["Joker"],
    "img": "img/RiddlerFrankGorshin.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "6+",
      "Movement": 8,
      "Willpower": 7,
      "Endurance": 4
    },
    "traits": ["Charismatic", "Confusion", "Mastermind", "Puzzle Master", "Required (Joker (Cesar Romero))", "Trap Master", "Trickster"],
    "weapons": [
      {
        "name": "Fake Gun",
        "damage": "-",
        "rof": "3",
        "ammo": "1",
        "traits": "One Use / Scared / S. Range"
      },
      {
        "name": "Cane",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Reach (1)"
      }
    ]
  },
  {
    "name": "The Penguin (Burgess Meredith)",
    "realname": "Oswald Chesterfield Cobblepot",
    "base": "30mm",
    "rep": 40,
    "funding": 100,
    "rank": ["Free Agent"],
    "faction": ["Joker"],
    "img": "img/PenguinBurgessMeredith.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 6,
      "Willpower": 6,
      "Endurance": 5
    },
    "traits": ["Charismatic", "Handyman", "One Of The Boys", "Radio", "Required (Joker (Cesar Romero))", "Umbrella's Knout Gas", "Wah! Wah! Wah!"],
    "weapons": [
      {
        "name": "Umbrella Cannon",
        "damage": "🩸🩸🩸",
        "rof": "1",
        "ammo": "2",
        "traits": "Firearm / Protective / S. Range"
      },
      {
        "name": "Umbrella's Boxing Glove",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Devastating / One Use / Mechanical"
      }
    ]
  },



//---------------------------------------------------------------------------------------------------------// 
//Mr. Freeze
//---------------------------------------------------------------------------------------------------------// 

  {
    "name": "Mr. Freeze 1997",
    "realname": "Victor Fries",
    "base": "40mm",
    "rep": 90,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Mr. Freeze"],
    "img": "img/MrFreeze1997.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "3+",
      "Movement": 8,
      "Willpower": 8,
      "Endurance": 7
    },
    "traits": [
      "Cold Acclimation",
      "Desensitized",
      "Good Aim",
      "Ice Flash",
      "Scientific",
      "Vulnerability to Fire",
      "Cryo-Armor (2)",
      "Freeze Well",
      "Ice Age",
      "Large",
      "True Love (Nora Fries)"
    ],
    "weapons": [
      {
        "name": "Frozen Gloves",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Cold / Push (4) / Cryo-Weapon"
      },
      {
        "name": "Cryo-Laser",
        "damage": "🩸",
        "rof": 3,
        "ammo": 3,
        "traits": "M. Range / High Caliber / Beam / Brutal / Crit. Freeze / Cold"
      }
    ]
  },
  {
    "name": "Freeze Thug 1",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 33,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["Mr. Freeze"],
    "img": "img/FreezeThug1.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Cold Acclimation",
      "Hacking",
      "Cryo-Armor (1)",
      "Radio"
    ],
    "weapons": [
      {
        "name": "Cryo-Launcher",
        "damage": "🩸🩸★",
        "rof": 3,
        "ammo": 2,
        "traits": "M. Range / Mechanical / Cold / Cryo-Weapon / Exposure"
      }
    ]
  },
  {
    "name": "Freeze Thug 2",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 33,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["Mr. Freeze"],
    "img": "img/FreezeThug2.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Cold Acclimation",
      "Force Field",
      "Cryo-Armor (1)",
      "Minion (3)"
    ],
    "weapons": [
      {
        "name": "Cryo-Light Cannons",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 2,
        "traits": "S. Range / Mechanical / Cold / Cryo-Weapon / Exposure"
      }
    ]
  },
  {
    "name": "Freeze Engineer",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 33,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Mr. Freeze"],
    "img": "img/FreezeEngineer.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "6+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Cold Acclimation",
      "Cryo-Grenade",
      "Engineer",
      "Cryo-Armor (1)",
      "Cryo-Reinforcement",
      "Handyman"
    ],
    "weapons": [
      {
        "name": "Torque Wrench",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Heavy / Handy / Overwhelming"
      }
    ]
  },
  {
    "name": "Freeze Thug 5",
    "realname": "Seamus O'Farrell",
    "base": "40mm",
    "rep": 63,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Mr. Freeze"],
    "img": "img/FreezeThug5.png",
    "stats": {
      "Attack": 4,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 8
    },
    "traits": [
      "Brawler",
      "Cryo-Armor (1)",
      "Desensitized",
      "Large",
      "Snow Storm",
      "Cold Acclimation",
      "Cryo-Charge",
      "Fight Me!",
      "Obstinate",
      "Tough Guy"
    ],
    "weapons": [
      {
        "name": "Cryo-GigaAxe",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Devastating / Cold / Reach (1)"
      }
    ]
  },
  {
    "name": "Combat Polar Bear",
    "realname": "Unknown",
    "base": "60mm",
    "rep": 63,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Mr. Freeze"],
    "img": "img/CombatPolarBear.png",
    "stats": {
      "Attack": 4,
      "Defense": 3,
      "Strength": "2+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 10
    },
    "traits": [
      "Animal",
      "Claws",
      "Cryo-Armor (1)",
      "Drag",
      "Tough Skin",
      "Charge",
      "Cold Acclimation",
      "Desensitized",
      "Huge",
      "Unstoppable"
    ],
    "weapons": [
      {
        "name": "Cryo-Claws",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Cold / Overwhelming"
      }
    ]
  },

  {
    "name": "Freeze Thug 4",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 32,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Mr. Freeze"],
    "img": "img/FreezeThug4.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Cold Acclimation",
      "Cryo-Charge",
      "Order",
      "Cryo-Armor (1)",
      "Minion (3)"
    ],
    "weapons": [
      {
        "name": "Cryo-Sword",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Cold / Devastating / Sharp"
      }
    ]
  },
  {
    "name": "Freeze Thug 3",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 32,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Mr. Freeze"],
    "img": "img/FreezeThug3.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 7
    },
    "traits": [
      "Cold Acclimation",
      "Cryo-Charge",
      "Cryo-Armor (1)",
      "Drop It!"
    ],
    "weapons": [
      {
        "name": "Cryo-Fist",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Cold / Crushing / Heavy"
      }
    ]
  },
  {
    "name": "Mr. Freeze Cryo-Armor",
    "realname": "Victor Fries",
    "base": "40mm/60mm",
    "rep": 90,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Mr. Freeze"],
    "img": "img/MrFreezeCryoArmor.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "3+",
      "Movement": 8,
      "Willpower": 8,
      "Endurance": 7
    },
    "traits": [
      "Cold Acclimation",
      "Cryo-Grenade",
      "Ice Flash",
      "Reinforced Gloves",
      "Scientific",
      "Vulnerability to Fire",
      "Cryo-Armor (2)",
      "Desensitized",
      "Large",
      "Scheming (2)",
      "True Love (Nora Fries)"
    ],
    "weapons": [
      {
        "name": "Cryo-Gun",
        "damage": "🩸",
        "rof": 4,
        "ammo": 3,
        "traits": "M. Range / Mechanical / Cold / Exposure / Cryo-Weapon / Accurate"
      }
    ]
  },
  {
    "name": "Mrs. Freeze",
    "realname": "Nora Fries",
    "base": "40mm",
    "rep": 65,
    "funding": 200,
    "rank": ["Sidekick"],
    "faction": ["Mr. Freeze"],
    "img": "img/MrsFreeze.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 6
    },
    "traits": [
      "A Lot Colder",
      "Cruel",
      "Desensitized",
      "Ice Flash",
      "Cold Acclimation",
      "Cryo-Armor (1)",
      "Escape Artist"
    ],
    "weapons": [
      {
        "name": "Cryo-Fist",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Cold / Crushing / Heavy"
      },
      {
        "name": "Cryo-Light Gun",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 3,
        "traits": "S. Range / Mechanical / Exposure / Cryo-Weapon / Cold"
      }
    ]
  },
  {
    "name": "Ranged Polar Bear",
    "realname": "Unknown",
    "base": "60mm",
    "rep": 66,
    "funding": 400,
    "rank": ["Henchman"],
    "faction": ["Mr. Freeze"],
    "img": "img/RangedPolarBear.png",
    "stats": {
      "Attack": 4,
      "Defense": 3,
      "Strength": "2+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 10
    },
    "traits": [
      "Animal",
      "Charge",
      "Cold Acclimation",
      "Desensitized",
      "Tough Skin",
      "Barrage",
      "Claws",
      "Cryo-Armor (1)",
      "Huge"
    ],
    "weapons": [
      {
        "name": "Cryo-Heavy Cannon",
        "damage": "🩸🩸★★",
        "rof": 2,
        "ammo": 2,
        "traits": "M. Range / Mechanical / Cold / Devastating / Cryo-Weapon / Exposure"
      }
    ]
  },
  
{
    "name": "Killer Frost Rebirth",
    "realname": "Caitlin Snow",
    "base": "40mm",
    "rep": 90,
    "funding": 0,
    "rank": ["Sidekick"],
    "faction": ["Mr. Freeze"],
	"img": "img/KillerFrost_Rebirth.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 11,
      "Willpower": 7,
      "Endurance": 6
    },
    "traits": [
      "Acrobat",
      "Boss’s Orders",
      "Cold Acclimation",
      "Ice Flash",
      "Runaway",
      "Adaptable",
      "Chill Touch",
      "Coordination",
      "Ice Queen"
    ],
    "weapons": [
      {
        "name": "Ice Daggers",
        "damage": "🩸★",
        "rof": 2,
        "ammo": "-",
        "traits": "M. Range / Throwing / Cold / Exposure"
      }
    ]
  },

//---------------------------------------------------------------------------------------------------------// 
//The Riddler
//---------------------------------------------------------------------------------------------------------// 
  
  {
    "name": "Quiz 5",
    "realname": "Francoise Moreau",
    "base": "30mm",
    "rep": 20,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["The Riddler"],
    "img": "img/Quiz5.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Backpack",
      "Pickpocket",
      "Drop a Riddle",
      "Stealth"
    ],
    "weapons": [
      {
        "name": "?Knuckles",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy"
      }
    ]
  },
  {
    "name": "Quiz 7",
    "realname": "Alex Orange",
    "base": "30mm",
    "rep": 29,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["The Riddler"],
    "img": "img/Quiz7.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Combo (Bat)",
      "The Crew",
      "Street Guy"
    ],
    "weapons": [
      {
        "name": "Bat",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Heavy"
      }
    ]
  },
  {
    "name": "Echo",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 45,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["The Riddler"],
    "img": "img/Echo.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 11,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Acrobat",
      "Defensive Stance",
      "Reinforced Gloves",
      "Sustained Defense",
      "Competitive",
      "It's Mine",
      "Riddles Addict"
    ],
    "weapons": []
  },
  {
    "name": "Quiz 8",
    "realname": "Finn O'Farrell",
    "base": "40mm",
    "rep": 47,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["The Riddler"],
    "img": "img/Quiz8.png",
    "stats": {
      "Attack": 4,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 8
    },
    "traits": [
      "Always on the Move",
      "Drop a Riddle",
      "Large",
      "Mechanical Mount",
      "Desensitized",
      "Electric Storm",
      "Luck",
      "Reinforced Gloves"
    ],
    "weapons": []
  },
  {
    "name": "The Riddler Paul Dano",
    "realname": "Paul Dano Edward Nigma",
    "base": "40mm",
    "rep": 64,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["The Riddler"],
    "img": "img/TheRiddlerPaulDano.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 6
    },
    "traits": [
      "A Challenge for You",
      "Confusion",
      "No More Lies",
      "Puzzle Master",
      "Stalker",
      "A Real Change",
      "Detonate",
      "Not Him",
      "Riddler Followers",
      "Unmask the Truth"
    ],
    "weapons": [
      {
        "name": "Carpet Tool",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Bleed (2)"
      }
    ]
  },
  {
    "name": "The Riddler",
    "realname": "Edward Nigma",
    "base": "60mm",
    "rep": 80,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["The Riddler"],
    "img": "img/TheRiddler.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 8,
      "Endurance": 5
    },
    "traits": [
      "A Challenge for You",
      "Feedback Protection",
      "Intel Support (5)",
      "Puzzle Master",
      "Wizard of Quiz",
      "Conundrum Champion",
      "Hacking",
      "Mastermind",
      "Quiz Master"
    ],
    "weapons": [
      {
        "name": "Informatic Assault",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Steal / Limited Attack"
      }
    ]
  },
  {
    "name": "The Riddler's Follower 1",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 18,
    "funding": 350,
    "rank": ["Henchman"],
    "faction": ["The Riddler"],
    "img": "img/RiddlerFollower1.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 5
    },
    "traits": [
      "Not Him",
      "Sapper",
      "Riddler Followers"
    ],
    "weapons": [
      {
        "name": "Hidden Rifle",
        "damage": "🩸🩸★",
        "rof": 3,
        "ammo": 1,
        "traits": "Firearm / One Use"
      }
    ]
  },
  {
    "name": "Quiz 4",
    "realname": "Finn O'Farrell",
    "base": "40mm",
    "rep": 47,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["The Riddler"],
    "img": "img/Quiz4.png",
    "stats": {
      "Attack": 4,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 8
    },
    "traits": [
      "Bodyguard",
      "Electric Storm",
      "Luck",
      "Self-Discipline",
      "Desensitized",
      "Large",
      "Obstinate"
    ],
    "weapons": [
      {
        "name": "?Heavy",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Electric / Handy / Heavy"
      }
    ]
  },
  {
    "name": "Query",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 45,
    "funding": 400,
    "rank": ["Henchman"],
    "faction": ["The Riddler"],
    "img": "img/Query.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 9,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Acrobat",
      "Persuasive",
      "Strategist",
      "Competitive",
      "Riddles Addict"
    ],
    "weapons": [
      {
        "name": "LMG",
        "damage": "🩸🩸",
        "rof": 2,
        "ammo": 2,
        "traits": "Explosive / Firearm / M. Range"
      }
    ]
  },
  {
    "name": "Quiz 2",
    "realname": "Igor",
    "base": "30mm",
    "rep": 15,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["The Riddler"],
    "img": "img/Quiz2.png",
    "stats": {
      "Attack": 3,
      "Defense": 2,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Combat Flip",
      "Small",
      "Combo (?Knuckles)"
    ],
    "weapons": [
      {
        "name": "?Knuckles",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy"
      }
    ]
  },
  {
    "name": "The Riddler Modern Age",
    "realname": "Edward Nigma",
    "base": "30mm",
    "rep": 80,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["The Riddler"],
    "img": "img/TheRiddlerModernAge.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 8,
      "Endurance": 7
    },
    "traits": [
      "A Challenge for You",
      "GOAD",
      "Mind Trick",
      "Quiz Master",
      "Confusion",
      "Mastermind",
      "Puzzle Master",
      "Wizard of Quiz"
    ],
    "weapons": [
      {
        "name": "Cane-Sword",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      }
    ]
  },
  {
    "name": "Quiz 6",
    "realname": "Charlie C.",
    "base": "30mm",
    "rep": 28,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["The Riddler"],
    "img": "img/Quiz6.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 4
    },
    "traits": [
      "Combo (?Heavy)",
      "Electric Storm"
    ],
    "weapons": [
      {
        "name": "?Heavy",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Electric / Handy / Heavy"
      }
    ]
  },
  {
    "name": "The Riddler's Follower 2",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 15,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["The Riddler"],
    "img": "img/RiddlerFollower2.png",
    "stats": {
      "Attack": 3,
      "Defense": 2,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 5
    },
    "traits": [
      "Grapple Gun",
      "Not Him",
      "Riddler Followers"
    ],
    "weapons": [
      {
        "name": "Rope",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Slow (4)"
      }
    ]
  },
  {
    "name": "Two-Face Batman Forever",
    "realname": "Tommy Lee Jones Harvey Dent",
    "base": "40mm",
    "rep": 80,
    "funding": 300,
    "rank": ["Free Agent"],
    "faction": ["The Riddler"],
    "img": "img/TwoFaceTommyLeeJones.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 7,
      "Endurance": 9
    },
    "traits": [
      "Bank Robber",
      "Expert Marksman",
      "Reinforced Gloves",
      "Sturdy",
      "Vengeance",
      "Bipolar (Mental Disorder)",
      "Judgment",
      "Required (The Riddler (Jim Carrey)",
      "Support (The Riddler)"
    ],
    "weapons": [
      {
        "name": "Twin-Revolvers",
        "damage": "🩸🩸",
        "rof": 3,
        "ammo": 3,
        "traits": "M. Range / Firearm / High Caliber / Reload"
      }
    ]
  },
  {
    "name": "Quiz 3",
    "realname": "John Carrie",
    "base": "30mm",
    "rep": 20,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["The Riddler"],
    "img": "img/Quiz3.png",
    "stats": {
      "Attack": 3,
      "Defense": 2,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Combo (Short Sickle)",
      "Distract"
    ],
    "weapons": [
      {
        "name": "Short Sickle",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      }
    ]
  },
  {
    "name": "The Riddler Jim Carrey",
    "realname": "Jim Carrey Edward Nigma",
    "base": "40mm",
    "rep": 60,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["The Riddler"],
    "img": "img/TheRiddlerJimCarrey.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 8,
      "Endurance": 6
    },
    "traits": [
      "A Challenge for You",
      "Detonate",
      "Hacking",
      "Showmanship",
      "As Blind as a Bat",
      "Drop a Riddle",
      "Knowledge is Power",
      "Wizard of Quiz"
    ],
    "weapons": [
      {
        "name": "Cane",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Reach (1)"
      }
    ]
  },
  {
    "name": "Quelle",
    "realname": "Josette",
    "base": "30mm",
    "rep": 45,
    "funding": 200,
    "rank": ["Sidekick"],
    "faction": ["The Riddler"],
    "img": "img/Quelle.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 5
    },
    "traits": [
      "Bipolar (Mental Disorder)",
      "Disarray",
      "Treacherous",
      "Undercover",
      "Demotivate",
      "Lieutenant (The Riddler)",
      "Trickster",
      "Wizard of Quiz"
    ],
    "weapons": [
      {
        "name": "Precision Gun",
        "damage": "🩸🩸",
        "rof": 2,
        "ammo": 2,
        "traits": "Accurate / Firearm / Handy / S. Range"
      }
    ]
  },
  {
    "name": "Quiz 1",
    "realname": "Alexander",
    "base": "30mm",
    "rep": 33,
    "funding": 350,
    "rank": ["Henchman"],
    "faction": ["The Riddler"],
    "img": "img/Quiz1.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Hardened",
      "Rapid Fire"
    ],
    "weapons": [
      {
        "name": "Custom SMG",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 1,
        "traits": "Assault / Firearm / S. Range"
      },
      {
        "name": "Custom SMG",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 1,
        "traits": "Assault / Firearm / S. Range"
      }
    ]
  },
  {
    "name": "The Riddler's Follower 3",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 22,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["The Riddler"],
    "img": "img/RiddlerFollower3.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 5
    },
    "traits": [
      "Hold Breath",
      "Not Him",
      "Riddler Followers"
    ],
    "weapons": [
      {
        "name": "Sniper Rifle",
        "damage": "🩸🩸🩸🩸",
        "rof": 1,
        "ammo": 2,
        "traits": "Aim / Anti-Tank / Bleed (3) / Firearm / Reload / Scope"
      }
    ]
  },


//---------------------------------------------------------------------------------------------------------// 
//Penguin
//---------------------------------------------------------------------------------------------------------// 

  {
    "name": "Catwoman Michelle Pfeiffer",
    "realname": "Selina Kyle",
    "base": "40mm",
    "rep": 50,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["GCPD", "Penguin"],
    "rivals": "Bat Family",
    "img": "img/CatwomanMichellePfeiffer.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "5+",
      "Movement": 12,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Acrobat",
      "Fast (2)",
      "Required (Batman Michael Keaton)",
      "Survivor",
      "Vengeance",
      "Combo (Whip)",
      "Hear Me Roar",
      "Sneak Attack",
      "Undercover"
    ],
    "weapons": [
      {
        "name": "Whip",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Reach (2)"
      },
      {
        "name": "Catwoman's Claws",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      }
    ]
  },
  {
    "name": "Penguin Thug 1",
    "realname": "Shane",
    "base": "30mm",
    "rep": 16,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Penguin"],
    "img": "img/PenguinThug1.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 5
    },
    "traits": [
      "Laser Sight",
      "Repairman",
      "Mobster"
    ],
    "weapons": [
      {
        "name": "Machete",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Heavy / Sharp"
      }
    ]
  },
  {
    "name": "The Penguin Danny DeVito",
    "realname": "Oswald Chesterfield Cobblepot",
    "base": "40mm",
    "rep": 74,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Penguin"],
    "img": "img/ThePenguinDannyDeVito.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Amphibious",
      "Handyman",
      "Mayor Cobblepot",
      "Strategist",
      "Charismatic",
      "Hidden Penguins",
      "Small",
      "Underworld King"
    ],
    "weapons": [
      {
        "name": "Umbrella Flamethrower",
        "damage": "🩸★",
        "rof": 1,
        "ammo": 2,
        "traits": "Fire / Mechanical / Expansive / Protective"
      },
      {
        "name": "Umbrella SMG",
        "damage": "🩸🩸",
        "rof": 3,
        "ammo": 2,
        "traits": "Assault / Firearm / M. Range / Red Dot"
      }
    ]
  },
  {
    "name": "The Penguin New 52",
    "realname": "Oswald Chesterfield Cobblepot",
    "base": "30mm",
    "rep": 74,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Penguin"],
    "img": "img/ThePenguinNew52.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Charismatic",
      "Handyman",
      "Lord of Business",
      "Penguin Caller",
      "Underworld King",
      "Dealer",
      "Iceberg Lounge",
      "Mob",
      "Small"
    ],
    "weapons": [
      {
        "name": "Umbrella Blade",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      },
      {
        "name": "Umbrella Cannon",
        "damage": "🩸🩸🩸",
        "rof": 1,
        "ammo": 2,
        "traits": "Firearm / Protective / S. Range"
      }
    ]
  },
  {
    "name": "Lark",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 40,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["Penguin"],
    "img": "img/Lark.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Bodyguard",
      "Reinforced Gloves",
      "Technique",
      "Cruel",
      "Security Chief"
    ],
    "weapons": [
      {
        "name": "Automatic Gun",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 2,
        "traits": "S. Range / Firearm / Light"
      }
    ]
  },
  {
    "name": "The Penguin Arkham City",
    "realname": "Oswald Chesterfield Cobblepot",
    "base": "30mm",
    "rep": 74,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Penguin"],
    "img": "img/ThePenguinArkhamCity.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Bulletproof Vest",
      "Handyman",
      "Iceberg Lounge",
      "Mob",
      "Underworld King",
      "Charismatic",
      "I Bought This Place",
      "Lord of Business"
    ],
    "weapons": [
      {
        "name": "Umbrella Cannon",
        "damage": "🩸🩸🩸",
        "rof": 1,
        "ammo": 2,
        "traits": "Firearm / Protective / S. Range"
      },
      {
        "name": "Cryo-Launcher",
        "damage": "🩸🩸★",
        "rof": 3,
        "ammo": 2,
        "traits": "M. Range / Mechanical / Cold / Cryo-Weapon / Exposure"
      }
    ]
  },
  {
    "name": "Rocket Launcher Penguin",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 8,
    "funding": 50,
    "rank": ["Henchman"],
    "faction": ["Penguin"],
    "img": "img/RocketLauncherPenguin.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 3,
      "Endurance": 4
    },
    "traits": [
      "Amphibious",
      "Expendable Penguin 2",
      "Animal",
      "Minion (3)"
    ],
    "weapons": [
      {
        "name": "Custom Rocket Launcher",
        "damage": "🩸🩸",
        "rof": 1,
        "ammo": 1,
        "traits": "Anti-Tank / Explosive / Firearm / Imprecise / M. Range"
      }
    ]
  },
  {
    "name": "Street Demonz Biker 1",
    "realname": "Joe \"Viking\" Thompson",
    "base": "42x75mm",
    "rep": 33,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Penguin"],
    "img": "img/StreetDemonzBiker1.png",
    "stats": {
      "Attack": 4,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Always On The Move",
      "Cruel",
      "Greed",
      "Mobster",
      "Biker Jacket",
      "Fast (3)",
      "Mechanical Mount"
    ],
    "weapons": [
      {
        "name": "Spikes Bat",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Heavy"
      }
    ]
  },
  {
    "name": "Loose Lips",
    "realname": "Ricky LeBlanc",
    "base": "30mm",
    "rep": 50,
    "funding": 200,
    "rank": ["Sidekick"],
    "faction": ["Penguin"],
    "img": "img/LooseLips.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 7
    },
    "traits": [
      "Criminal",
      "Lieutenant (The Penguin)",
      "One of The Boys",
      "Smuggler",
      "Informer",
      "Mobster",
      "Order"
    ],
    "weapons": [
      {
        "name": "Shotgun",
        "damage": "🩸🩸★",
        "rof": 1,
        "ammo": 3,
        "traits": "Firearm / M. Range / Assault"
      },
      {
        "name": "Knife",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      }
    ]
  },
  {
    "name": "Emperor Penguin Unchained",
    "realname": "Ignatius Ogilvy",
    "base": "40mm",
    "rep": 120,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Penguin"],
    "img": "img/EmperorPenguinUnchained.png",
    "stats": {
      "Attack": 5,
      "Defense": 4,
      "Strength": "3+",
      "Movement": 12,
      "Willpower": 7,
      "Endurance": 9
    },
    "traits": [
      "Brawler",
      "Dirty Money",
      "Master Fighter",
      "Regeneration",
      "Tough Skin",
      "Claws",
      "Fight Me!",
      "Provoke",
      "Scheming (2)",
      "Underworld King"
    ],
    "weapons": [
      {
        "name": "Chain",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Heavy / Reach (3)"
      }
    ]
  },
  {
    "name": "Penguin Elite Thug",
    "realname": "Mason",
    "base": "30mm",
    "rep": 35,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Penguin"],
    "img": "img/PenguinEliteThug.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Follow Me!",
      "Hardened",
      "Football Gear",
      "Mobster"
    ],
    "weapons": [
      {
        "name": "Electric Baton",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Electric / Handy / Mechanical"
      }
    ]
  },
  {
    "name": "Minigun Penguin",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 7,
    "funding": 50,
    "rank": ["Henchman"],
    "faction": ["Penguin"],
    "img": "img/MinigunPenguin.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 3,
      "Endurance": 3
    },
    "traits": [
      "Amphibious",
      "Expendable Penguin 2",
      "Small",
      "Animal",
      "Minion (3)"
    ],
    "weapons": [
      {
        "name": "Custom Minigun",
        "damage": "🩸🩸",
        "rof": 3,
        "ammo": "-",
        "traits": "Firearm / Imprecise / M. Range"
      }
    ]
  },
  {
    "name": "Explosive Penguin",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 4,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Penguin"],
    "img": "img/ExplosivePenguin.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "6+",
      "Movement": 8,
      "Willpower": 3,
      "Endurance": 3
    },
    "traits": [
      "Amphibious",
      "Expendable Penguin 1",
      "Self-Destruction",
      "Animal",
      "Minion (3)",
      "Small"
    ],
    "weapons": []
  },
  {
    "name": "Penguin Lieutenant",
    "realname": "Big A",
    "base": "40mm",
    "rep": 41,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Penguin"],
    "img": "img/PenguinLieutenant.png",
    "stats": {
      "Attack": 4,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 7
    },
    "traits": [
      "Biker Jacket",
      "Mobster",
      "Take Cover!",
      "Tough Guy",
      "Large",
      "Reinforced Gloves",
      "Taunt"
    ],
    "weapons": []
  },
  {
    "name": "Mr. Toxic",
    "realname": "Hugh Marder",
    "base": "30mm",
    "rep": 50,
    "funding": 200,
    "rank": ["Free Agent"],
    "faction": ["Penguin"],
    "img": "img/MrToxic.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 7
    },
    "traits": [
      "Criminal",
      "Electric Storm",
      "Reinforced Gloves",
      "Deadly Strike",
      "Energy Absorption"
    ],
    "weapons": [
      {
        "name": "Radio Wave",
        "damage": "🩸🩸",
        "rof": 1,
        "ammo": 2,
        "traits": "Expansive / Beam / Gas / Acid / Caustic"
      }
    ]
  },
  {
    "name": "Penguin Thug 2",
    "realname": "Tanner",
    "base": "30mm",
    "rep": 24,
    "funding": 600,
    "rank": ["Henchman"],
    "faction": ["Penguin"],
    "img": "img/PenguinThug2.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 5
    },
    "traits": [
      "Brutal",
      "Street Guy",
      "Mobster"
    ],
    "weapons": [
      {
        "name": "Assault Rifle",
        "damage": "🩸🩸🩸",
        "rof": 3,
        "ammo": 2,
        "traits": "Firearm"
      }
    ]
  },
  {
    "name": "The Penguin Penguin's Duck",
    "realname": "Oswald Chesterfield Cobblepot",
    "base": "60mm",
    "rep": 74,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Penguin"],
    "img": "img/ThePenguinPenguinsDuck.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Amphibious",
      "Dealer",
      "Huge",
      "Medium Armor",
      "Penguin Feeder",
      "Charismatic",
      "Handyman",
      "Lord of Business",
      "Penguin Caller",
      "Underworld King"
    ],
    "weapons": [
      {
        "name": "Umbrella Blade",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      },
      {
        "name": "Umbrella Cannon",
        "damage": "🩸🩸🩸",
        "rof": 1,
        "ammo": 2,
        "traits": "Firearm / Protective / S. Range"
      }
    ]
  },
  {
    "name": "The Penguin Arkham Knight",
    "realname": "Oswald Chesterfield Cobblepot",
    "base": "30mm",
    "rep": 77,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Penguin"],
    "img": "img/ThePenguinArkhamKnight.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 8,
      "Endurance": 7
    },
    "traits": [
      "Criminal Empire",
      "Lord of Business",
      "Order",
      "Primary Target",
      "Small",
      "In The End",
      "Mob",
      "Pickpocket",
      "Protect Me!",
      "Underworld King"
    ],
    "weapons": [
      {
        "name": "Brass Knuckles",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": ""
      },
      {
        "name": "Lighter and Cigar",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Crt (Fire)"
      }
    ]
  },

  {
    "name": "Street Demonz 4",
    "realname": "Aaron \"Durum Killer\" Taylor",
    "base": "40mm",
    "rep": 29,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Penguin"],
    "img": "img/StreetDemonz4.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Biker Jacket",
      "Hardened",
      "Tough Guy",
      "Bluff",
      "Mobster"
    ],
    "weapons": [
      {
        "name": "Shield",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Protective"
      },
      {
        "name": "Axe",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Heavy"
      }
    ]
  },
  {
    "name": "Mr. Combustible",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 26,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Penguin"],
    "img": "img/MrCombustible.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Always Illuminated",
      "Explosive Sense",
      "Criminal",
      "Take Cover!"
    ],
    "weapons": [
      {
        "name": "Cane-Sword",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      }
    ]
  },
  {
    "name": "Hypnotic",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 30,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Penguin"],
    "img": "img/Hypnotic.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Confusion",
      "Hypnotic Radio Waves",
      "Criminal",
      "It's Mine"
    ],
    "weapons": []
  },
  {
    "name": "Street Demonz 1",
    "realname": "Grumble",
    "base": "30mm",
    "rep": 27,
    "funding": 150,
    "rank": ["Henchman"],
    "faction": ["Penguin"],
    "img": "img/StreetDemonz1.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Biker Jacket",
      "Mobster",
      "Mine"
    ],
    "weapons": [
      {
        "name": "Shiv",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy"
      },
      {
        "name": "Petrol Bomb",
        "damage": "🩸",
        "rof": 1,
        "ammo": 2,
        "traits": "Mechanical / S. Range / Fire"
      }
    ]
  },
  {
    "name": "Street Demonz Biker 2",
    "realname": "Jackson \"Fat\" Smith",
    "base": "42x75mm",
    "rep": 34,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["Penguin"],
    "img": "img/StreetDemonzBiker2.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 7
    },
    "traits": [
      "Always On The Move",
      "Fast (3)",
      "Handyman",
      "Mobster",
      "Biker Jacket",
      "Greed",
      "Mechanical Mount"
    ],
    "weapons": [
      {
        "name": "Short Shotgun",
        "damage": "🩸★",
        "rof": 1,
        "ammo": 2,
        "traits": "Expansive / Firearm"
      }
    ]
  },
  {
    "name": "Street Demonz Biker 3",
    "realname": "Serge \"Darky\" Powers",
    "base": "42x75mm",
    "rep": 32,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["Penguin"],
    "img": "img/StreetDemonzBiker3.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Always On The Move",
      "Fast (3)",
      "Instinctive Shooting",
      "Mobster",
      "Biker Jacket",
      "Greed",
      "Mechanical Mount"
    ],
    "weapons": [
      {
        "name": "Custom Automatic Gun",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 2,
        "traits": "S. Range / Firearm / Light / Red Dot"
      }
    ]
  },
  {
    "name": "Street Demonz 3",
    "realname": "Reaver",
    "base": "30mm",
    "rep": 19,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Penguin"],
    "img": "img/StreetDemonz3.png",
    "stats": {
      "Attack": 3,
      "Defense": 2,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 5
    },
    "traits": [
      "Biker Jacket",
      "Tireless",
      "Mobster"
    ],
    "weapons": [
      {
        "name": "Maul",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Heavy"
      }
    ]
  },
  {
    "name": "Street Demonz 2",
    "realname": "Simmons",
    "base": "30mm",
    "rep": 21,
    "funding": 200,
    "rank": ["Henchman"],
    "faction": ["Penguin"],
    "img": "img/StreetDemonz2.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 6
    },
    "traits": [
      "Biker Jacket",
      "Mobster",
      "Hold 'Em Still",
      "Shooter"
    ],
    "weapons": [
      {
        "name": "Crossbow",
        "damage": "🩸🩸🩸",
        "rof": 1,
        "ammo": 3,
        "traits": "Mechanical / Reload"
      }
    ]
  },
  {
    "name": "Imperceptible Man",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 30,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Penguin"],
    "img": "img/ImperceptibleMan.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Concealment",
      "Don't Mind Me",
      "Thief",
      "Criminal",
      "Sneak Attack"
    ],
    "weapons": []
  },

 
//---------------------------------------------------------------------------------------------------------// 
//League of Assassins
//---------------------------------------------------------------------------------------------------------// 

  {
    "name": "League Acolyte 1",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 27,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["League of Shadows"],
    "img": "img/LeagueAcolyte1.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Assassin (1)",
      "Sneak Attack",
      "Martial Expert"
    ],
    "weapons": [
      {
        "name": "Scimitar",
        "damage": "🩸 🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Bleed (1) / Sharp"
      }
    ]
  },
  {
    "name": "Mercenary 1",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 28,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["League of Shadows", "Bane"],
    "img": "img/Mercenary1.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Bulletproof Vest",
      "Veteran",
      "Mercenary"
    ],
    "weapons": [
      {
        "name": "Axe",
        "damage": "🩸 🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Heavy"
      }
    ]
  },
  {
    "name": "Mercenary 2",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 32,
    "funding": 250,
    "rank": ["Henchman"],
    "faction": ["League of Shadows", "Bane"],
    "img": "img/Mercenary2.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Bulletproof Vest",
      "Reinforced Gloves",
      "Veteran",
      "Mercenary",
      "Tough Guy"
    ],
    "weapons": [
      {
        "name": "Automatic Gun",
        "damage": "🩸 ★",
        "rof": 3,
        "ammo": 2,
        "traits": "S. Range / Firearm / Light"
      }
    ]
  },
  {
    "name": "League Acolyte 2",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 26,
    "funding": 100,
    "rank": ["Henchman"],
    "faction": ["League of Shadows"],
    "img": "img/LeagueAcolyte2.png",
    "stats": {
      "Attack": 4,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Assassin (1)",
      "Martial Expert",
      "Combo (Knives)"
    ],
    "weapons": [
      {
        "name": "Throwing Knives",
        "damage": "🩸",
        "rof": 2,
        "ammo": 2,
        "traits": "Sharp / S. Range / Throwing"
      },
      {
        "name": "Knives",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      }
    ]
  },
  {
    "name": "Ubu",
    "realname": "Unknown",
    "base": "40mm",
    "rep": 66,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["League of Shadows"],
    "img": "img/Ubu.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 8
    },
    "traits": [
      "Bodyguard",
      "Large",
      "Martial Artist",
      "Inspire Fear",
      "Lieutenant (Ra's al Ghul)",
      "Sturdy"
    ],
    "weapons": [
      {
        "name": "Huge Scimitar",
        "damage": "🩸 🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Bleed (1) / Reach (1) / Sharp"
      }
    ]
  },
  {
    "name": "Hassassin 4",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 22,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["League of Shadows"],
    "img": "img/Hassassin4.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 4,
      "Endurance": 5
    },
    "traits": [
      "Assassin (1)",
      "Scout",
      "Martial Expert"
    ],
    "weapons": [
      {
        "name": "Bhuj",
        "damage": "🩸 🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Heavy / Reach (2) / Sharp"
      },
      {
        "name": "Hidden Blade",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Sharp"
      }
    ]
  },

  {
    "name": "Goliath",
    "realname": "Goliath",
    "base": "60mm",
    "rep": 60,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Bat Family", "GCPD", "League of Shadows"],
    "img": "img/Goliath.png",
    "stats": {
      "Attack": 4,
      "Defense": 2,
      "Strength": "2+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 10
    },
    "traits": [
      "Animal",
      "Bodyguard",
      "Fly",
      "Meet Goliath!",
      "Tough Skin",
      "Bat Family",
      "Carry",
      "Huge",
      "Teen Titans",
      "True Love (Damian Wayne)"
    ],
    "weapons": [
      {
        "name": "Claws & Teeth",
        "damage": "🩸 ★",
        "rof": "-",
        "ammo": "-",
        "traits": "Devastating"
      }
    ]
  },
  {
    "name": "Hassassin 1",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 20,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["League of Shadows"],
    "img": "img/Hassassin1.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 4,
      "Endurance": 6
    },
    "traits": [
      "Assassin (1)",
      "Martial Expert"
    ],
    "weapons": [
      {
        "name": "Poisoned Scimitar",
        "damage": "🩸 🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Bleed (1) / Sharp / Poison"
      }
    ]
  },
  {
    "name": "Talia Rebirth",
    "realname": "Talia al Ghul",
    "base": "40mm",
    "rep": 100,
    "funding": 0,
    "rank": ["Leader", "Sidekick"],
    "faction": ["League of Shadows"],
    "img": "img/TaliaRebirth.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "5+",
      "Movement": 11,
      "Willpower": 8,
      "Endurance": 7
    },
    "traits": [
      "Acrobat",
      "Manipulative",
      "Mind Control Substance",
      "Scheming (3)",
      "True Love (Damian Wayne)",
      "Business Agent",
      "Martial Artist",
      "Order",
      "Strategist",
      "Weapon Master"
    ],
    "weapons": [
      {
        "name": "Twin Scimitars",
        "damage": "🩸 🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Bleed (1) / Overwhelming / Sharp"
      }
    ]
  },
  {
    "name": "The Heretic",
    "realname": "Damian Wayne Clone",
    "base": "40mm",
    "rep": 89,
    "funding": 0,
    "rank": ["Sidekick"],
    "faction": ["League of Shadows"],
    "img": "img/TheHeretic.png",
    "stats": {
      "Attack": 4,
      "Defense": 3,
      "Strength": "2+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 9
    },
    "traits": [
      "Desensitized",
      "Juggernaut",
      "Light Armor",
      "Reinforced Gloves",
      "Devastating Blow",
      "Large",
      "Master Fighter",
      "Unstoppable"
    ],
    "weapons": [
      {
        "name": "Great Sword",
        "damage": "🩸 🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Reach (1) / Sharp"
      }
    ]
  },
  {
    "name": "League Acolyte 3",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 26,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["League of Shadows"],
    "img": "img/LeagueAcolyte3.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Assassin (1)",
      "Martial Expert",
      "Falconry"
    ],
    "weapons": [
      {
        "name": "Bow",
        "damage": "🩸 🩸",
        "rof": 1,
        "ammo": 2,
        "traits": "Aim / Mechanical / Acceleration"
      },
      {
        "name": "Poisoned Arrow",
        "damage": "🩸 🩸",
        "rof": 1,
        "ammo": 1,
        "traits": "Aim / Caustic / Mechanical / Poison / Acceleration"
      }
    ]
  },
  {
    "name": "League Acolyte 4",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 25,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["League of Shadows"],
    "img": "img/LeagueAcolyte4.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Assassin (1)",
      "Martial Expert",
      "Good Aim"
    ],
    "weapons": [
      {
        "name": "Bow",
        "damage": "🩸 🩸",
        "rof": 1,
        "ammo": 2,
        "traits": "Aim / Mechanical / Acceleration"
      },
      {
        "name": "Enervating Arrow",
        "damage": "🩸 🩸",
        "rof": 1,
        "ammo": 1,
        "traits": "Aim / Explosive / Gas / Mechanical / Enervating (2) / Acceleration"
      }
    ]
  },
  {
    "name": "Hassassin 3",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 20,
    "funding": 100,
    "rank": ["Henchman"],
    "faction": ["League of Shadows"],
    "img": "img/Hassassin3.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 4,
      "Endurance": 6
    },
    "traits": [
      "Assassin (1)",
      "Martial Expert"
    ],
    "weapons": [
      {
        "name": "Scimitar",
        "damage": "🩸 🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Bleed (1) / Sharp"
      },
      {
        "name": "Throwing Knives",
        "damage": "🩸",
        "rof": 2,
        "ammo": 2,
        "traits": "Sharp / S. Range / Throwing"
      }
    ]
  },
  {
    "name": "Cheshire",
    "realname": "Jade Nguyen",
    "base": "30mm",
    "rep": 75,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["League of Shadows"],
    "img": "img/Cheshire.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "5+",
      "Movement": 13,
      "Willpower": 7,
      "Endurance": 6
    },
    "traits": [
      "Acrobat",
      "Combo (Poisoned Sai)",
      "Poison Master",
      "Toxicologist",
      "Agile",
      "Poison Catalyst",
      "Reflexes"
    ],
    "weapons": [
      {
        "name": "Poisoned Sword",
        "damage": "🩸 🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp / Poison"
      },
      {
        "name": "Poisoned Sai",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Defensive / Handy / Poison"
      }
    ]
  },
  {
    "name": "Hassassin 2",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 24,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["League of Shadows"],
    "img": "img/Hassassin2.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 4,
      "Endurance": 6
    },
    "traits": [
      "Assassin (1)",
      "Tension",
      "Martial Expert"
    ],
    "weapons": [
      {
        "name": "Scimitar",
        "damage": "🩸 🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Bleed (1) / Sharp"
      }
    ]
  },
  {
    "name": "Bane Dark Knight Rises",
    "realname": "Bane",
    "base": "30mm",
    "rep": 97,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["League of Shadows", "Bane"],
    "img": "img/BaneDKR.png",
    "stats": {
      "Attack": 5,
      "Defense": 4,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": [
      "Born in the Darkness",
      "Combo (Unarmed)",
      "Kill Them!",
      "Runaway",
      "True Love (Talia)",
      "Close Combat Master",
      "Desensitized",
      "Reinforced Gloves",
      "Strategist"
    ],
    "weapons": []
  },
  {
    "name": "Ra's al Ghul",
    "realname": "Ra's al Ghul",
    "base": "40mm / 60mm",
    "rep": 120,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["League of Shadows"],
    "img": "img/RasAlGhul.png",
    "stats": {
      "Attack": 5,
      "Defense": 5,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 8,
      "Endurance": 9
    },
    "traits": [
      "Arrogant",
      "Elite Boss (Ninja)",
      "Immortal",
      "Martial Artist",
      "Shadows Command",
      "Veteran",
      "Deadly Strike",
      "Exhaustive Planner",
      "Lazarus Pit Owner",
      "Mastermind",
      "Strategist",
      "Weapon Master"
    ],
    "weapons": [
      {
        "name": "Ancient Sword",
        "damage": "🩸 🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Reach (2) / Sharp"
      }
    ]
  },
  {
    "name": "Barsad",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 38,
    "funding": 600,
    "rank": ["Henchman"],
    "faction": ["League of Shadows", "Bane"],
    "img": "img/Barsad.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Bulletproof Vest",
      "Precise Aim",
      "Mercenary",
      "Veteran"
    ],
    "weapons": [
      {
        "name": "Assault Rifle",
        "damage": "🩸 🩸 🩸",
        "rof": 3,
        "ammo": 2,
        "traits": "Firearm"
      }
    ]
  },

//---------------------------------------------------------------------------------------------------------// 
//Two-Face
//---------------------------------------------------------------------------------------------------------// 

  {
    "name": "Gangster 1",
    "realname": "Tommy",
    "base": "30mm",
    "rep": 39,
    "funding": 450,
    "rank": ["Henchman"],
    "faction": ["Two-Face"],
    "img": "img/Gangster1.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Assassin (1)",
      "Gangsters",
      "Shooter",
      "Criminal",
      "Hardened"
    ],
    "weapons": [
      {
        "name": "Thompson",
        "damage": "🩸 🩸 ★",
        "rof": 3,
        "ammo": 3,
        "traits": "Firearm / M. Range / Reload / High Caliber"
      }
    ]
  },
  {
    "name": "Gangster 3",
    "realname": "Wallace",
    "base": "30mm",
    "rep": 36,
    "funding": 350,
    "rank": ["Henchman"],
    "faction": ["Two-Face"],
    "img": "img/Gangster3.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Assassin (1)",
      "Follow Me!",
      "Hardened",
      "Criminal",
      "Gangsters",
      "Precise Aim"
    ],
    "weapons": [
      {
        "name": "Winchester",
        "damage": "🩸 🩸 🩸",
        "rof": 2,
        "ammo": 2,
        "traits": "Firearm / Reload / High Caliber"
      }
    ]
  },
  {
    "name": "Sugar",
    "realname": "Unknown",
    "base": "40mm",
    "rep": 51,
    "funding": 0,
    "rank": ["Sidekick"],
    "faction": ["Two-Face"],
    "img": "img/Sugar.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 6
    },
    "traits": [
      "Bluff",
      "Distract",
      "One of the Boys",
      "Protect Me!",
      "True Love (Harvey Dent)",
      "Charm",
      "Duo (Spice)",
      "Order",
      "Teamwork (2) (Spice)"
    ],
    "weapons": [
      {
        "name": "Derringer",
        "damage": "🩸 🩸",
        "rof": 3,
        "ammo": 2,
        "traits": "Firearm / Reload / S. Range / Small Caliber"
      }
    ]
  },
  {
    "name": "Two-Face Tommy Lee Jones",
    "realname": "Harvey Dent",
    "base": "40mm",
    "rep": 82,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Two-Face"],
    "img": "img/TwoFaceTommyLeeJones.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 7,
      "Endurance": 9
    },
    "traits": [
      "Bank Robber",
      "Coin Flip",
      "Judgment",
      "Sturdy",
      "Vengeance",
      "Bipolar Mental Disorder",
      "Expert Marksman",
      "Reinforced Gloves",
      "Teamwork (1) (Sugar & Spice)"
    ],
    "weapons": [
      {
        "name": "Twin-Revolvers",
        "damage": "🩸 🩸",
        "rof": 3,
        "ammo": 3,
        "traits": "M. Range / Firearm / High Caliber / Reload"
      }
    ]
  },
  {
    "name": "Gangster 5",
    "realname": "Stone",
    "base": "30mm",
    "rep": 29,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Two-Face"],
    "img": "img/Gangster5.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Assassin (1)",
      "Gangsters",
      "Hardened",
      "Criminal",
      "Goad",
      "Weapon Master"
    ],
    "weapons": [
      {
        "name": "Automatic Knife",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp / Steal"
      }
    ]
  },
  {
    "name": "Two-Face",
    "realname": "Harvey Dent",
    "base": "40mm / 60mm",
    "rep": 101,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Two-Face"],
    "img": "img/TwoFace.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 7,
      "Endurance": 9
    },
    "traits": [
      "Attorney's Allegation",
      "Counter Argument",
      "Expert Marksman",
      "Gangsters",
      "Rapid Reload",
      "Runaway",
      "Bipolar (Mental Disorder)",
      "Evidence Tampering",
      "Gang Lord",
      "Judgment",
      "Reinforced Gloves",
      "Sturdy"
    ],
    "weapons": [
      {
        "name": "Thompson",
        "damage": "🩸🩸★",
        "rof": 3,
        "ammo": 3,
        "traits": "Firearm / M. Range / Reload / High Caliber"
      }
    ]
  },
  {
    "name": "Spice",
    "realname": "Unknown",
    "base": "40mm",
    "rep": 51,
    "funding": 0,
    "rank": ["Sidekick"],
    "faction": ["Two-Face"],
    "img": "img/Spice.png",
    "stats": {
      "Attack": 4,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 6
    },
    "traits": [
      "360° Strike",
      "Cruel",
      "One of the Boys",
      "Protect Me!",
      "True Love (Harvey Dent)",
      "Charm",
      "Duo (Sugar)",
      "Order",
      "Teamwork (2) (Sugar)"
    ],
    "weapons": [
      {
        "name": "Whip",
        "damage": "🩸 ★",
        "rof": "-",
        "ammo": "-",
        "traits": "Reach (2)"
      },
      {
        "name": "Derringer",
        "damage": "🩸 🩸",
        "rof": 3,
        "ammo": 2,
        "traits": "Firearm / Reload / S. Range / Small Caliber"
      }
    ]
  },
  {
    "name": "The Hitman",
    "realname": "Maguire",
    "base": "30mm",
    "rep": 34,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Two-Face"],
    "img": "img/TheHitman.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Assassin (2)",
      "Concealment",
      "Frightening Reputation",
      "Cleaning the Scene",
      "Criminal",
      "Gangsters"
    ],
    "weapons": [
      {
        "name": "Torture Tools",
        "damage": "🩸 ★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Steal"
      },
      {
        "name": "Concealed Revolver",
        "damage": "🩸 🩸",
        "rof": 2,
        "ammo": 2,
        "traits": "Short Range / Firearm / High Caliber / Reload / Concealed"
      }
    ]
  },
  {
    "name": "Gangster 7",
    "realname": "Sergio",
    "base": "30mm",
    "rep": 30,
    "funding": 200,
    "rank": ["Henchman"],
    "faction": ["Two-Face"],
    "img": "img/Gangster7.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Assassin (1)",
      "Gangsters",
      "Hardened",
      "Criminal",
      "Good Aim"
    ],
    "weapons": [
      {
        "name": "Bolt Action Rifle",
        "damage": "🩸 🩸 🩸",
        "rof": 1,
        "ammo": 2,
        "traits": "Accurate / Aim / Firearm / Reload / High Caliber"
      }
    ]
  },
  {
    "name": "Gangster 6",
    "realname": "Luigi",
    "base": "30mm",
    "rep": 33,
    "funding": 450,
    "rank": ["Henchman"],
    "faction": ["Two-Face"],
    "img": "img/Gangster6.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Assassin (1)",
      "Gangsters",
      "Rapid Reload",
      "Criminal",
      "Hardened"
    ],
    "weapons": [
      {
        "name": "Thompson",
        "damage": "🩸 🩸 ★",
        "rof": 3,
        "ammo": 3,
        "traits": "Firearm / M. Range / Reload / High Caliber"
      }
    ]
  },
  {
    "name": "Gangster 2",
    "realname": "Malone",
    "base": "30mm",
    "rep": 30,
    "funding": 200,
    "rank": ["Henchman"],
    "faction": ["Two-Face"],
    "img": "img/Gangster2.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Assassin (1)",
      "Gangsters",
      "Instinctive Shooting",
      "Criminal",
      "Hardened"
    ],
    "weapons": [
      {
        "name": "Manual Shotgun",
        "damage": "🩸 🩸",
        "rof": 1,
        "ammo": 2,
        "traits": "Expansive / Firearm / Reload"
      }
    ]
  },
  {
    "name": "Gangster 4",
    "realname": "Giuseppe",
    "base": "30mm",
    "rep": 29,
    "funding": 150,
    "rank": ["Henchman"],
    "faction": ["Two-Face"],
    "img": "img/Gangster4.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Assassin (1)",
      "Gangsters",
      "Rapid Reload",
      "Criminal",
      "Hardened"
    ],
    "weapons": [
      {
        "name": "Revolver",
        "damage": "🩸 🩸",
        "rof": 2,
        "ammo": 2,
        "traits": "Firearm / Reload / S. Range / High Caliber"
      }
    ]
  },
  {
    "name": "Two-Face Arkham City",
    "realname": "Harvey Dent",
    "base": "30mm",
    "rep": 99,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Two-Face"],
    "img": "img/TwoFaceArkhamCity.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 7,
      "Endurance": 9
    },
    "traits": [
      "Attorney's Allegation",
      "Coin Flip",
      "Judgment",
      "Order in the Court",
      "Sturdy",
      "Bipolar (Mental Disorder)",
      "Expert Marksman",
      "Listen to the Coin",
      "Reinforced Gloves"
    ],
    "weapons": [
      {
        "name": "Thompson",
        "damage": "🩸🩸★",
        "rof": 3,
        "ammo": 3,
        "traits": "Firearm / M. Range / Reload / High Caliber"
      }
    ]
  },
  {
    "name": "Killer Croc Thug",
    "realname": "Waylon Jones",
    "base": "40mm",
    "rep": 50,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Two-Face"],
    "img": "img/KillerCrocThug.png",
    "stats": {
      "Attack": 4,
      "Defense": 3,
      "Strength": "3+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 7
    },
    "traits": [
      "Amphibious",
      "Gambling Time",
      "Large",
      "Tough Skin",
      "Criminal",
      "Gangsters",
      "Raised in the Sewers"
    ],
    "weapons": [
      {
        "name": "Expeditious Fighter",
        "damage": "★ ★",
        "rof": "-",
        "ammo": "-",
        "traits": "Devastating / Overwhelming"
      }
    ]
  },
  {
    "name": "Big John",
    "realname": "Jonathan Miers",
    "base": "30mm",
    "rep": 32,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Two-Face"],
    "img": "img/BigJohn.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "3+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 7
    },
    "traits": [
      "Assassin (1)",
      "Gangsters",
      "Large",
      "Criminal",
      "Hardened",
      "Unstoppable"
    ],
    "weapons": [
      {
        "name": "Mining Pick",
        "damage": "🩸 ★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Overwhelming"
      }
    ]
  },

//---------------------------------------------------------------------------------------------------------// 
//Birds of Prey
//---------------------------------------------------------------------------------------------------------// 

{
  "name": "Poison Ivy 1997",
  "realname": "Dr. Pamela Lillian Isley",
  "base": "40mm",
  "rep": 66,
  "funding": 0,
  "rank": ["Leader"],
  "faction": ["Birds of Prey"],
  "img": "img/PoisonIvy_1997.png",
  "stats": {
    "Attack": 3,
    "Defense": 3,
    "Strength": "5+",
    "Movement": 8,
    "Willpower": 7,
    "Endurance": 6
  },
  "traits": [
    "Affinity (Mr. Freeze (1997))",
    "Elite Boss (Plants)",
    "Mortal Kiss",
    "Poison Immunity",
    "Scientific",
    "Control Pheromones",
    "Let's Cool It For Now",
    "Nature's Arm",
    "Protect Me!"
  ],
  "weapons": [
    {
      "name": "Sprinkling Spores",
      "damage": "",
      "rof": 1,
      "ammo": "-",
      "traits": "Expansive / Poison / Toxic (1)"
    },
    {
      "name": "Plants",
      "damage": "🩸★",
      "rof": "-",
      "ammo": "-",
      "traits": "Mechanical / Protective / Reach (2)"
    }
  ]
},

{
  "name": "Harley Quinn Roller Derby",
  "realname": "Dr. Harleen Frances Quinzel",
  "base": "40mm",
  "rep": 84,
  "funding": 0,
  "rank": ["Sidekick", "Leader"],
  "faction": ["Birds of Prey"],
  "img": "img/HarleyQuinn_RollerDerby.png",
  "stats": {
    "Attack": 4,
    "Defense": 4,
    "Strength": "4+",
    "Movement": 12,
    "Willpower": 8,
    "Endurance": 7
  },
  "traits": [
    "Acrobat",
    "Charismatic",
    "Goad",
    "Harlequin Show",
    "Adaptable",
    "Fast (2)",
    "Harlequin",
    "True Love (Poison Ivy)"
  ],
  "weapons": [
    {
      "name": "Reinforced Bat",
      "damage": "★★",
      "rof": "-",
      "ammo": "-",
      "traits": "Handy / Heavy"
    }
  ]
},

{
  "name": "Harley Quinn KaBoom!",
  "realname": "Dr. Harleen Frances Quinzel",
  "base": "60mm",
  "rep": 84,
  "funding": 0,
  "rank": ["Sidekick"],
  "faction": ["Birds of Prey"],
  "img": "img/HarleyQuinn_Kaboom.png",
  "stats": {
    "Attack": 4,
    "Defense": 4,
    "Strength": "4+",
    "Movement": 12,
    "Willpower": 8,
    "Endurance": 7
  },
  "traits": [
    "Acrobat",
    "Adaptable",
    "Charismatic",
    "Coordination",
    "Harlequin",
    "KaBoom!",
    "More Explosives!",
    "True Love (Poison Ivy)"
  ],
  "weapons": [
    {
      "name": "Mallet",
      "damage": "★★",
      "rof": "-",
      "ammo": "-",
      "traits": "Reach (1) / Heavy"
    }
  ]
},

{
  "name": "Poison Ivy",
  "realname": "Dr. Pamela Lillian Isley",
  "base": "40mm / 60mm",
  "rep": 93,
  "funding": 0,
  "rank": ["Sidekick", "Leader"],
  "faction": ["Birds of Prey"],
  "img": "img/PoisonIvy.png",
  "stats": {
    "Attack": 3,
    "Defense": 3,
    "Strength": "5+",
    "Movement": 8,
    "Willpower": 8,
    "Endurance": 7
  },
  "traits": [
    "Adaptable",
    "Control Pheromones",
    "Green Web",
    "Poison Immunity",
    "Protect Me!",
    "Chlorokinesis",
    "Elite Boss (Plants)",
    "Mortal Kiss",
    "Pollination",
    "Scientific"
  ],
  "weapons": [
    {
      "name": "Plants",
      "damage": "🩸★",
      "rof": "-",
      "ammo": "-",
      "traits": "Mechanical / Protective / Reach (2)"
    },
    {
      "name": "Spores",
      "damage": "🩸",
      "rof": 1,
      "ammo": 3,
      "traits": "Acid / Explosive / Mechanical / S. Range / Poison"
    }
  ]
},

{
  "name": "Black Canary (Rebirth)",
  "realname": "Dinah Lance",
  "base": "40mm",
  "rep": 80,
  "funding": 0,
  "rank": ["Free Agent"],
  "faction": ["GCPD", "Birds of Prey"],
  "img": "img/BlackCanary_Rebirth.png",
  "stats": {
    "Attack": 4,
    "Defense": 4,
    "Strength": "4+",
    "Movement": 13,
    "Willpower": 7,
    "Endurance": 7
  },
  "traits": [
    "Acrobat",
    "Hidden",
    "Shockwave",
    "Street Fighter",
    "Teamwork (1) Green Arrow",
    "Canary Cry",
    "Reverberation",
    "Stealth",
    "Street Guy"
  ],
  "weapons": [
    {
      "name": "Martial Prowess",
      "damage": "★",
      "rof": "-",
      "ammo": "-",
      "traits": "Overwhelming / CRT (Paralyze)"
    }
  ]
},

{
  "name": "Harley Quinn",
  "realname": "Dr. Harleen Frances Quinzel",
  "base": "30mm",
  "rep": 98,
  "funding": 0,
  "rank": ["Free Agent"],
  "faction": ["Birds of Prey", "Suicide Squad"],
  "img": "img/HarleyQuinn.png",
  "stats": {
    "Attack": 4,
    "Defense": 4,
    "Strength": "4+",
    "Movement": 13,
    "Willpower": 8,
    "Endurance": 7
  },
  "traits": [
    "Acrobat",
    "Charismatic",
    "Confusion",
    "The Voices (Mental Disorder)",
    "Adaptable",
    "Combat Flip",
    "Goad"
  ],
  "weapons": [
    {
      "name": "Mallet",
      "damage": "★★",
      "rof": "-",
      "ammo": "-",
      "traits": "Heavy / Reach (1)"
    }
  ]
},

{
  "name": "Katana (Rebirth)",
  "realname": "Tatsu Yamashiro",
  "base": "40mm",
  "rep": 75,
  "funding": 100,
  "rank": ["Free Agent"],
  "faction": ["GCPD", "Suicide Squad", "Birds of Prey"],
  "img": "img/Katana_Rebirth.png",
  "stats": {
    "Attack": 4,
    "Defense": 4,
    "Strength": "5+",
    "Movement": 11,
    "Willpower": 7,
    "Endurance": 6
  },
  "traits": [
    "Acrobat",
    "Feint",
    "Precise Blow",
    "Stealth",
    "Adaptable",
    "Martial Artist",
    "Soul Voices"
  ],
  "weapons": [
    {
      "name": "Shurikens",
      "damage": "★★",
      "rof": 2,
      "ammo": 2,
      "traits": "Light / S. Range / Throwing"
    },
    {
      "name": "Soultaker",
      "damage": "🩸🩸",
      "rof": "-",
      "ammo": "-",
      "traits": "Handy / Sharp / Steal"
    }
  ]
},

{
  "name": "Black Canary",
  "realname": "Dinah Lance",
  "base": "30mm",
  "rep": 78,
  "funding": 0,
  "rank": ["Sidekick"],
  "faction": ["Birds of Prey"],
  "img": "img/BlackCanary.png",
  "stats": {
    "Attack": 4,
    "Defense": 4,
    "Strength": "4+",
    "Movement": 11,
    "Willpower": 7,
    "Endurance": 7
  },
  "traits": [
    "Acrobat",
    "Shockwave",
    "Street Guy",
    "Persuasive",
    "Street Fighter",
    "Undercover"
  ],
  "weapons": [
    {
      "name": "Good Night Bat",
      "damage": "★★",
      "rof": "-",
      "ammo": "-",
      "traits": "Handy / Heavy"
    },
    {
      "name": "Canary Cry",
      "damage": "🩸",
      "rof": 1,
      "ammo": "-",
      "traits": "Beam / Expansive / Sonic / Throwing / CRT (Stunned) / Push (2)"
    }
  ]
},

{
  "name": "Lady Shiva",
  "realname": "Sandra Wu-San",
  "base": "40mm",
  "rep": 80,
  "funding": 0,
  "rank": ["Sidekick"],
  "faction": ["League of Shadows", "Birds of Prey"],
  "img": "img/LadyShiva.png",
  "stats": {
    "Attack": 4,
    "Defense": 4,
    "Strength": "4+",
    "Movement": 11,
    "Willpower": 8,
    "Endurance": 7
  },
  "traits": [
    "Acrobat",
    "Arrogant",
    "Martial Artist",
    "Moral Compass",
    "Reinforced Gloves",
    "Adaptable",
    "Combo (Unarmed)",
    "Master Fighter",
    "Precise Blow",
    "Stealth"
  ],
  "weapons": []
},

{
  "name": "Oracle",
  "realname": "Barbara Gordon",
  "base": "40mm",
  "rep": 50,
  "funding": 0,
  "rank": ["Sidekick", "Free Agent"],
  "faction": ["Bat Family", "GCPD", "Birds of Prey"],
  "img": "img/Oracle.png",
  "stats": {
    "Attack": 3,
    "Defense": 3,
    "Strength": "5+",
    "Movement": 8,
    "Willpower": 7,
    "Endurance": 4
  },
  "traits": [
    "Bat Family",
    "Informer",
    "Scheming (3)",
    "Hacking",
    "Intel Support (4)"
  ],
  "weapons": [
    {
      "name": "Informatic Assault",
      "damage": "★",
      "rof": "-",
      "ammo": "-",
      "traits": "Steal / Limited Attack"
    }
  ]
},

{
  "name": "Floronic Man",
  "realname": "Jason Woodrue",
  "base": "40mm",
  "rep": 65,
  "funding": 0,
  "rank": ["Sidekick"],
  "faction": ["Birds of Prey"],
  "img": "img/FloronicMan.png",
  "stats": {
    "Attack": 3,
    "Defense": 3,
    "Strength": "4+",
    "Movement": 8,
    "Willpower": 6,
    "Endurance": 6
  },
  "traits": [
    "Chlorokinesis",
    "Green Web",
    "Parliament of Flowers",
    "Pollination",
    "Elite Boss (Plants)",
    "Life Growth",
    "Plant",
    "Walking Plant"
  ],
  "weapons": [
    {
      "name": "Tendrils",
      "damage": "🩸★",
      "rof": "-",
      "ammo": "-",
      "traits": "Reach (4)"
    }
  ]
},

{
  "name": "Killer Frost (Rebirth)",
  "realname": "Caitlin Snow",
  "base": "40mm",
  "rep": 60,
  "funding": 100,
  "rank": ["Henchman"],
  "faction": ["Suicide Squad", "Birds of Prey"],
  "img": "img/KillerFrost_Rebirth.png",
  "stats": {
    "Attack": 3,
    "Defense": 4,
    "Strength": "4+",
    "Movement": 10,
    "Willpower": 6,
    "Endurance": 6
  },
  "traits": [
    "Acrobat",
    "Chill Touch",
    "It's Mine",
    "Adaptable",
    "Ice Flash",
    "Snow Storm"
  ],
  "weapons": [
    {
      "name": "Ice Daggers",
      "damage": "🩸★",
      "rof": 2,
      "ammo": "-",
      "traits": "M. Range / Throwing / Cold / Exposure"
    }
  ]
},
{
  "name": "Rabid Plant 1",
  "realname": "Unknown",
  "base": "40mm",
  "rep": 24,
  "funding": 0,
  "rank": ["Henchman"],
  "faction": ["Birds of Prey"],
  "img": "img/RabidPlant1.png",
  "stats": {
    "Attack": 3,
    "Defense": 2,
    "Strength": "4+",
    "Movement": 10,
    "Willpower": 5,
    "Endurance": 5
  },
  "traits": [
    "Charge",
    "Elite (Plants)",
    "Walking Plant",
    "Death Pack",
    "Plant"
  ],
  "weapons": [
    {
      "name": "Claws & Teeth",
      "damage": "🩸★",
      "rof": "-",
      "ammo": "-",
      "traits": "Enervating (1)"
    }
  ]
},
{
  "name": "Roller Derby Thug 4",
  "realname": "Unknown",
  "base": "30mm",
  "rep": 24,
  "funding": 0,
  "rank": ["Henchman"],
  "faction": ["Birds of Prey"],
  "rivals": "GCPD",
  "img": "img/RollerDerbyThug4.png",
  "stats": {
    "Attack": 3,
    "Defense": 3,
    "Strength": "3+",
    "Movement": 10,
    "Willpower": 5,
    "Endurance": 5
  },
  "traits": [
    "Charge",
    "Harlequin",
    "Fast (2)"
  ],
  "weapons": [
    {
      "name": "Hockey Stick",
      "damage": "★★",
      "rof": "-",
      "ammo": "-",
      "traits": "Handy / Reach (1)"
    }
  ]
},

{
  "name": "Roller Derby Thug 1",
  "realname": "Unknown",
  "base": "40mm",
  "rep": 44,
  "funding": 0,
  "rank": ["Henchman"],
  "faction": ["Birds of Prey"],
  "rivals": "GCPD",
  "img": "img/RollerDerbyThug1.png",
  "stats": {
    "Attack": 3,
    "Defense": 3,
    "Strength": "3+",
    "Movement": 10,
    "Willpower": 5,
    "Endurance": 8
  },
  "traits": [
    "360° Strike",
    "Desensitized",
    "Fully Equipped",
    "Juggernaut",
    "Tough Guy",
    "Charge",
    "Large",
    "Fast (2)",
    "Harlequin"
  ],
  "weapons": [
    {
      "name": "Chained Hook",
      "damage": "🩸★",
      "rof": "-",
      "ammo": "-",
      "traits": "Sharp / Reach (3)"
    }
  ]
},

{
  "name": "Roller Derby Thug 2",
  "realname": "Unknown",
  "base": "30mm",
  "rep": 26,
  "funding": 150,
  "rank": ["Henchman"],
  "faction": ["Birds of Prey"],
  "rivals": "GCPD",
  "img": "img/RollerDerbyThug2.png",
  "stats": {
    "Attack": 2,
    "Defense": 3,
    "Strength": "5+",
    "Movement": 10,
    "Willpower": 5,
    "Endurance": 4
  },
  "traits": [
    "Charge",
    "Flaming Wave",
    "Fast (2)",
    "Harlequin"
  ],
  "weapons": [
    {
      "name": "Custom Flamethrower",
      "damage": "🩸★",
      "rof": 1,
      "ammo": 2,
      "traits": "Expansive / Mechanical / Fire / Motion (3)"
    }
  ]
},
{
  "name": "Rabid Plant 2",
  "realname": "Unknown",
  "base": "40mm",
  "rep": 24,
  "funding": 0,
  "rank": ["Henchman"],
  "faction": ["Birds of Prey"],
  "img": "img/RabidPlant2.png",
  "stats": {
    "Attack": 3,
    "Defense": 2,
    "Strength": "4+",
    "Movement": 10,
    "Willpower": 5,
    "Endurance": 5
  },
  "traits": [
    "Death Pack",
    "Growling Hound",
    "Walking Plant",
    "Elite (Plants)",
    "Plant"
  ],
  "weapons": [
    {
      "name": "Claws & Teeth",
      "damage": "🩸★",
      "rof": "-",
      "ammo": "-",
      "traits": "Enervating (1)"
    }
  ]
},
{
  "name": "Huntress",
  "realname": "Helena Bertinelli",
  "base": "30mm",
  "rep": 76,
  "funding": 400,
  "rank": ["Henchman"],
  "faction": ["Birds of Prey"],
  "img": "img/Huntress.png",
  "stats": {
    "Attack": 4,
    "Defense": 4,
    "Strength": "4+",
    "Movement": 11,
    "Willpower": 7,
    "Endurance": 7
  },
  "traits": [
    "Acrobat",
    "Martial Artist",
    "Stealth",
    "Informer",
    "Master Marksman",
    "The Time Has Come"
  ],
  "weapons": [
    {
      "name": "Repeater Crossbow",
      "damage": "🩸🩸",
      "rof": 3,
      "ammo": 3,
      "traits": "Assault / Mechanical / S. Range"
    }
  ]
},
{
  "name": "Roller Derby Thug 3",
  "realname": "Unknown",
  "base": "30mm",
  "rep": 25,
  "funding": 200,
  "rank": ["Henchman"],
  "faction": ["Birds of Prey"],
  "rivals": "GCPD",
  "img": "img/RollerDerbyThug3.png",
  "stats": {
    "Attack": 2,
    "Defense": 2,
    "Strength": "5+",
    "Movement": 10,
    "Willpower": 4,
    "Endurance": 5
  },
  "traits": [
    "Charge",
    "Fast (2)",
    "Dispersion",
    "Harlequin"
  ],
  "weapons": [
    {
      "name": "Improvised Launcher",
      "damage": "🩸★",
      "rof": 1,
      "ammo": 2,
      "traits": "M. Range / Explosive / Firearm / Grenade / Recoil (3)"
    },
    {
      "name": "Improvised Gas Launcher",
      "damage": "★",
      "rof": 1,
      "ammo": 2,
      "traits": "M. Range / Explosive / Mechanical / Grenade / Gas / Enervating (2) / Recoil (3)"
    }
  ]
},

  {
    "name": "Hawk",
    "realname": "Hank Hall",
    "base": "30mm",
    "rep": 30,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Bat Family", "Birds of Prey"],
    "rivals": "",
    "img": "img/Hawk.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Agent of Chaos",
      "Reinforced Gloves",
      "Teamwork (1) (Dove)",
      "True Love (Dove)",
      "Hardened",
      "Sturdy",
      "Teen Titans"
    ],
    "weapons": [
      {
        "name": "Hawk's Gloves",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Motion (3)"
      }
    ]
  },

  {
    "name": "Dove",
    "realname": "Dawn Granger",
    "base": "30mm",
    "rep": 30,
    "funding": 200,
    "rank": ["Henchman"],
    "faction": ["Bat Family", "Birds of Prey"],
    "rivals": "",
    "img": "img/Dove.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 4
    },
    "traits": [
      "Agent of Order",
      "Light Radiance",
      "Teamwork (2) (Hawk)",
      "Agile",
      "Medic",
      "Teen Titans"
    ],
    "weapons": [
      {
        "name": "Light Projection",
        "damage": "★",
        "rof": 1,
        "ammo": 3,
        "traits": "Beam / S. Range / Throwing / Healing Radiance"
      }
    ]
  },

  {
    "name": "Bruce the Hyena",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 28,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Birds of Prey"],
    "rivals": "",
    "img": "img/BruceTheHyena.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 12,
      "Willpower": 5,
      "Endurance": 4
    },
    "traits": [
      "Animal",
      "Death Pack",
      "Mobster",
      "Claws",
      "Harley's Best Friends",
      "Sneak Attack"
    ],
    "weapons": []
  },

  {
    "name": "Mutated Plant 2",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 16,
    "funding": 250,
    "rank": ["Henchman"],
    "faction": ["Birds of Prey"],
    "rivals": "",
    "img": "img/MutatedPlant2.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 0,
      "Willpower": 4,
      "Endurance": 5
    },
    "traits": [
      "Elite (Plants)",
      "Power Dampening",
      "Plant"
    ],
    "weapons": [
      {
        "name": "Venomous Spit",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 2,
        "traits": "Caustic / Mechanical / M. Range"
      }
    ]
  },
  
  {
    "name": "Unknown",
    "realname": "Cassandra Cain",
    "base": "30mm",
    "rep": 30,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Birds of Prey"],
    "rivals": "",
    "img": "img/CassandraCain.png",
    "stats": {
      "Attack": 3,
      "Defense": 5,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Escape Artist",
      "Pickpocket",
      "Handyman",
      "Small"
    ],
    "weapons": []
  },

  {
    "name": "Batgirl Rebirth",
    "realname": "Barbara Gordon",
    "base": "30mm",
    "rep": 45,
    "funding": 100,
    "rank": ["Henchman"],
    "faction": ["Bat Family", "GCPD", "Birds of Prey"],
    "rivals": "",
    "img": "img/BatgirlRebirth.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Arrest",
      "Batclaw/Grapple Gun",
      "Limited Equipment",
      "True Love (James W. Gordon)",
      "Bat Family",
      "Combo (Unarmed)",
      "Reinforced Gloves"
    ],
    "weapons": [
      {
        "name": "Batlings",
        "damage": "★★",
        "rof": 2,
        "ammo": 2,
        "traits": "Light / S. Range / Throwing"
      }
    ]
  },

  {
    "name": "Batgirl Vampire Queen",
    "realname": "Barbara Gordon",
    "base": "40mm",
    "rep": 130,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Bat Family", "GCPD"],
    "rivals": "",
    "img": "img/BatgirlVampireQueen.png",
    "stats": {
      "Attack": 4,
      "Defense": 5,
      "Strength": "2+",
      "Movement": 12,
      "Willpower": 7,
      "Endurance": 9
    },
    "traits": [
      "Bat Family",
      "Bat Form",
      "Batcape",
      "Queens Command",
      "Detective",
      "Master of Stealth",
      "Protect Me!",
      "Sneak Attack",
      "Vampire",
      "Vampire Queen",
      "Teen Titans"
    ],
    "weapons": [
      {
        "name": "Batlings",
        "damage": "★★",
        "rof": 2,
        "ammo": 2,
        "traits": "Light / S. Range / Throwing"
      },
      {
        "name": "Claws & Teeth",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Devastating"
      }
    ]
  },

  {
    "name": "Mutated Plant 1",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 17,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Birds of Prey"],
    "rivals": "",
    "img": "img/MutatedPlant1.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 0,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Elite (Plants)",
      "Shockwave",
      "Plant"
    ],
    "weapons": [
      {
        "name": "Venomous Bite",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Poison"
      }
    ]
  },

  {
    "name": "Frank the Plant",
    "realname": "Frank",
    "base": "60mm",
    "rep": 32,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Birds of Prey"],
    "rivals": "",
    "img": "img/FrankThePlant.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 0,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Biting",
      "Plant",
      "Suspicious Plant",
      "Elite (Plants)",
      "Slow Digestion"
    ],
    "weapons": [
      {
        "name": "Devour",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy"
      }
    ]
  },

  {
    "name": "Detective Montoya",
    "realname": "Renée Maria Montoya",
    "base": "30mm",
    "rep": 40,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["Birds of Prey"],
    "rivals": "",
    "img": "img/DetectiveMontoya.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 5
    },
    "traits": [
      "Cop",
      "Truth-Seeker",
      "Vocational",
      "Detective",
      "Undercover"
    ],
    "weapons": [
      {
        "name": "Brass Knuckles",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": ""
      },
      {
        "name": "Automatic Gun",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 3,
        "traits": "S. Range / Firearm / Light"
      }
    ]
  },

  {
    "name": "Batgirl Classic Costume",
    "realname": "Barbara Gordon",
    "base": "40mm",
    "rep": 71,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["Bat Family", "GCPD", "Birds of Prey"],
    "rivals": "",
    "img": "img/BatgirlClassic.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 12,
      "Willpower": 7,
      "Endurance": 6
    },
    "traits": [
      "Arrest",
      "Bat Family",
      "Combo (Unarmed)",
      "One of the Boys",
      "Reinforced Gloves",
      "Teen Titans",
      "Bat Cape",
      "Batclaw",
      "Informer",
      "Radio",
      "Scout"
    ],
    "weapons": [
      {
        "name": "Batlings",
        "damage": "★★",
        "rof": 2,
        "ammo": 2,
        "traits": "Light / S. Range / Throwing"
      }
    ]
  },

  {
    "name": "Strix",
    "realname": "Mary Turner",
    "base": "30mm",
    "rep": 60,
    "funding": 100,
    "rank": ["Henchman"],
    "faction": ["Court of Owls", "Birds of Prey"],
    "rivals": "",
    "img": "img/Strix.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 11,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Acrobat",
      "Rapid Fire",
      "Stealth",
      "Climbing Claws",
      "Reanimated Owl",
      "Weakness to Cold"
    ],
    "weapons": [
      {
        "name": "Throwing Knives",
        "damage": "🩸",
        "rof": 2,
        "ammo": 2,
        "traits": "Sharp / S. Range / Throwing"
      },
      {
        "name": "Paired Katanas",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Overwhelming / Sharp"
      }
    ]
  },

  {
    "name": "Mutated Plant 3",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 14,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Birds of Prey"],
    "rivals": "",
    "img": "img/MutatedPlant3.png",
    "stats": {
      "Attack": 3,
      "Defense": 2,
      "Strength": "4+",
      "Movement": 0,
      "Willpower": 4,
      "Endurance": 5
    },
    "traits": [
      "Disruptor",
      "Plant",
      "Elite (Plants)"
    ],
    "weapons": [
      {
        "name": "Bite",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Crt (Paralyze)"
      }
    ]
  },
  
//---------------------------------------------------------------------------------------------------------// 
//Scarecrow
//---------------------------------------------------------------------------------------------------------// 
{
  "name": "Scarecrow (The Worst Nightmare)",
  "realname": "Jonathan Crane",
  "base": "60mm",
  "rep": 85,
  "funding": 0,
  "rank": ["Leader"],
  "faction": ["Scarecrow"],
  "img": "img/ScarecrowTheWorstNightmare.png",
  "stats": {
    "Attack": 3,
    "Defense": 4,
    "Strength": "4+",
    "Movement": 12,
    "Willpower": 8,
    "Endurance": 6
  },
  "traits": ["Animal", "Charm", "Casting Fears", "Control Through Fear", "Induction", "Inspire Fear", "Psychologist", "Scientific", "The Fear Master", "Undercover"],
  "weapons": [
    {
      "name": "TERRORIFIC SCYTHE",
      "damage": "🩸🩸",
      "rof": "-",
      "ammo": "-",
      "traits": "Bleed (2) / Reach (1) / Sharp / Terror"
    },
    {
      "name": "TRUE FEAR SPRAY",
      "damage": "🩸",
      "rof": 1,
      "ammo": 3,
      "traits": "Expansive / Gas / Mechanical / True Fear"
    }
  ]
},
{
  "name": "Dr. Friitawa",
  "realname": "Linda Friitawa",
  "base": "40mm",
  "rep": 60,
  "funding": 0,
  "rank": ["Sidekick"],
  "faction": ["Scarecrow"],
  "img": "img/DrFriitawa.png",
  "stats": {
    "Attack": 2,
    "Defense": 2,
    "Strength": "5+",
    "Movement": 8,
    "Willpower": 7,
    "Endurance": 5
  },
  "traits": ["Casting Fears", "Inspire Fear", "Lieutenant (Scarecrow)", "Scientific", "Induction", "Intel Support (5)", "Poison Catalyst", "Shady Dealings"],
  "weapons": [
    {
      "name": "LURE",
      "damage": "-",
      "rof": "-",
      "ammo": "-",
      "traits": "Pull (4) / Boosted (3) / Reach (8)"
    }
  ]
},
{
  "name": "Nightmare of Fear",
  "realname": "Unknown",
  "base": "30mm",
  "rep": 22,
  "funding": 0,
  "rank": ["Henchman"],
  "faction": ["Scarecrow"],
  "img": "img/NightmareOfFear.png",
  "stats": {
    "Attack": 2,
    "Defense": 2,
    "Strength": "4+",
    "Movement": 0,
    "Willpower": 2,
    "Endurance": 2
  },
  "traits": ["Insidious", "Inspire Fear", "Limited Equipment", "Nightmare", "Paranoid (Mental Disorder)", "Tangible Fear"],
  "weapons": [
    {
      "name": "FEARSOME PRESENCE",
      "damage": "🩸",
      "rof": "-",
      "ammo": "-",
      "traits": "Devastating / Crt (Terror) / True Fear"
    }
  ]
},
{
  "name": "Nightmare of Demotivation",
  "realname": "Unknown",
  "base": "30mm",
  "rep": 20,
  "funding": 0,
  "rank": ["Henchman"],
  "faction": ["Scarecrow"],
  "img": "img/NightmareOfDemotivation.png",
  "stats": {
    "Attack": 2,
    "Defense": 2,
    "Strength": "4+",
    "Movement": 0,
    "Willpower": 2,
    "Endurance": 2
  },
  "traits": ["Demotivate", "Insidious", "Limited Equipment", "Nightmare", "OCD (Mental Disorder)", "Tangible Fear"],
  "weapons": [
    {
      "name": "DEMOTIVATING PRESENCE",
      "damage": "★",
      "rof": "-",
      "ammo": "-",
      "traits": "Devastating / Crt (True Fear) / Poison"
    }
  ]
},
{
  "name": "Nightmare of Anger",
  "realname": "Unknown",
  "base": "30mm",
  "rep": 21,
  "funding": 0,
  "rank": ["Henchman"],
  "faction": ["Scarecrow"],
  "img": "img/NightmareOfAnger.png",
  "stats": {
    "Attack": 2,
    "Defense": 2,
    "Strength": "4+",
    "Movement": 0,
    "Willpower": 2,
    "Endurance": 2
  },
  "traits": ["Anger Management (Mental Disorder)", "Insidious", "Limited Equipment", "Nightmare", "Poison Catalyst", "Tangible Fear"],
  "weapons": [
    {
      "name": "ANGERING PRESENCE",
      "damage": "🩸",
      "rof": "-",
      "ammo": "-",
      "traits": "Devastating / Crt (True Fear) / Terror"
    }
  ]
},
{
  "name": "Nightmare of Insignificance",
  "realname": "Unknown",
  "base": "30mm",
  "rep": 20,
  "funding": 0,
  "rank": ["Henchman"],
  "faction": ["Scarecrow"],
  "img": "img/NightmareOfInsignificance.png",
  "stats": {
    "Attack": 2,
    "Defense": 2,
    "Strength": "4+",
    "Movement": 0,
    "Willpower": 2,
    "Endurance": 2
  },
  "traits": ["Bluff", "Insidious", "Limited Equipment", "Nightmare", "Obsessive (Mental Disorder)", "Tangible Fear"],
  "weapons": [
    {
      "name": "INSIGNIFICANT PRESENCE",
      "damage": "★",
      "rof": 3,
      "ammo": "-",
      "traits": "M. Range / Crt (True Fear) / Mechanical / High Caliber / Scared"
    }
  ]
},
{
  "name": "Fearbeast Nightmare",
  "realname": "Unknown",
  "base": "60mm",
  "rep": 54,
  "funding": 0,
  "rank": ["Henchman"],
  "faction": ["Scarecrow"],
  "img": "img/FearbeastNightmare.png",
  "stats": {
    "Attack": 3,
    "Defense": 2,
    "Strength": "3+",
    "Movement": 0,
    "Willpower": 6,
    "Endurance": 6
  },
  "traits": ["Bloodthirsty (Mental Disorder)", "Bodyguard", "Huge", "Insidious", "Inspire Fear", "Limited Equipment", "Nightmare", "Tangible Fear"],
  "weapons": [
    {
      "name": "TERRORIFIC CLAWS",
      "damage": "🩸★",
      "rof": "-",
      "ammo": "-",
      "traits": "Terror / True Fear"
    }
  ]
},
{
  "name": "Little Nightmare",
  "realname": "Unknown",
  "base": "30mm",
  "rep": 20,
  "funding": 100,
  "rank": ["Henchman"],
  "faction": ["Scarecrow"],
  "img": "img/LittleNightmare.png",
  "stats": {
    "Attack": 2,
    "Defense": 2,
    "Strength": "5+",
    "Movement": 0,
    "Willpower": 2,
    "Endurance": 2
  },
  "traits": ["Horde", "Insidious", "Nightmare", "Paranoid (Mental Disorder)", "Small Nightmare", "Tangible Fear"],
  "weapons": [
    {
      "name": "LESS THAN INSIGNIFICANT",
      "damage": "★",
      "rof": 1,
      "ammo": "-",
      "traits": "S. Range / Mechanical / Scared / Crt (True Fear)"
    }
  ]
},

//--------------------------------------------------------------------------------------------------------------------
//Court of Owls
//--------------------------------------------------------------------------------------------------------------------
  {
    "name": "The Court",
    "realname": "Unknown",
    "base": "60mm",
    "rep": 50,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Court of Owls"],
    "img": "img/TheCourt.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "6+",
      "Movement": 0,
      "Willpower": 6,
      "Endurance": 5
    },
    "traits": [
      "Boss's Orders",
      "Demotivate",
      "Goad",
      "Intel Support (5)",
      "Court of Owls Crew",
      "Enemies of the Court",
      "Hidden",
      "Shadowed Perch"
    ],
    "weapons": [
      {
        "name": "Influence",
        "damage": "-",
        "rof": "-",
        "ammo": "-",
        "traits": "Reach (6) / Push (4)"
      }
    ]
  },
  {
    "name": "1890's Talon",
    "realname": "Xiao Loong",
    "base": "30mm",
    "rep": 42,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Court of Owls"],
    "img": "img/1890sTalon.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Climbing Claws",
      "Reanimated Owl",
      "Weakness to Cold",
      "Martial Artist",
      "Stealth"
    ],
    "weapons": [
      {
        "name": "Owl Knife",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Crushing / Handy / Sharp"
      },
      {
        "name": "Tanto",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Bleed (2) / Defensive / Sharp"
      }
    ]
  },
  {
    "name": "The Talon",
    "realname": "William Cobb",
    "base": "30mm",
    "rep": 65,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Suicide Squad", "Court of Owls"],
    "img": "img/TheTalon.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Combo (Owl Knife)",
      "Martial Artist",
      "Reanimated Owl",
      "Weakness to Cold",
      "Exhaustive Planner",
      "Precise Blow",
      "Undercover"
    ],
    "weapons": [
      {
        "name": "Owl Knife",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Crushing / Handy / Sharp"
      },
      {
        "name": "Throwing Knives",
        "damage": "🩸",
        "rof": 2,
        "ammo": 2,
        "traits": "Sharp / S. Range / Throwing"
      }
    ]
  },
  {
    "name": "Gotham Butcher",
    "realname": "Felix Harmon",
    "base": "60mm",
    "rep": 81,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["Court of Owls"],
    "img": "img/GothamButcher.png",
    "stats": {
      "Attack": 5,
      "Defense": 3,
      "Strength": "2+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 9
    },
    "traits": [
      "Brutal",
      "Desensitized",
      "Reanimated Owl",
      "Tough Skin",
      "Claws",
      "Huge",
      "The Murderer",
      "Weakness to Cold"
    ],
    "weapons": []
  },
  {
    "name": "Lincoln March",
    "realname": "Lincoln March",
    "base": "30mm",
    "rep": 102,
    "funding": 0,
    "rank": ["Leader", "Henchman"],
    "faction": ["Court of Owls"],
    "img": "img/LincolnMarch.png",
    "stats": {
      "Attack": 5,
      "Defense": 4,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": [
      "Combo (Unarmed)",
      "Fly",
      "Martial Artist",
      "Reanimated Owl",
      "Strategist",
      "Court of Owls Crew",
      "Joy for the Victory",
      "Power Armor",
      "Retractable Claws",
      "Weakness to Cold"
    ],
    "weapons": [
      {
        "name": "Owl Knife",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Crushing / Handy / Sharp"
      }
    ]
  },
  {
    "name": "O'Malley's Grandfather",
    "realname": "James O'Malley",
    "base": "30mm",
    "rep": 33,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Court of Owls"],
    "img": "img/OMalleysGrandfather.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Bodyguard",
      "Protect the Shadows",
      "Weakness to Cold",
      "Martial Artist",
      "Reanimated Owl"
    ],
    "weapons": [
      {
        "name": "Owl Knife",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Crushing / Handy / Sharp"
      },
      {
        "name": "Katar",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Bleed (2) / Sharp"
      }
    ]
  },
  {
    "name": "Talon",
    "realname": "Calvin Rose",
    "base": "40mm",
    "rep": 60,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["Court of Owls", "Bat Family"],
    "img": "img/Talon.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 11,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Acrobat",
      "Escape Artist",
      "Reinforced Gloves",
      "Scout",
      "Weakness to Cold",
      "Bat Family",
      "Reanimated Owl",
      "Runaway",
      "Stealth"
    ],
    "weapons": [
      {
        "name": "Talon Knife",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Crushing / Handy / Sharp"
      }
    ]
  },
  {
    "name": "O'Malley's Father",
    "realname": "Brandon O'Malley",
    "base": "30mm",
    "rep": 51,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Court of Owls"],
    "img": "img/OMalleysFather.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Assassin (2)",
      "Reanimated Owl",
      "Weakness to Cold",
      "Brutal",
      "Stealth",
      "Weapon Master"
    ],
    "weapons": [
      {
        "name": "Owl Knife",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Crushing / Handy / Sharp"
      },
      {
        "name": "Katar",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Bleed (2) / Sharp"
      }
    ]
  },
  {
    "name": "Dementor",
    "realname": "Unknown",
    "base": "40mm",
    "rep": 60,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Court of Owls"],
    "img": "img/Dementor.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 8
    },
    "traits": [
      "Inspire Fear",
      "Obstinate",
      "Sneak Attack",
      "Unstoppable Monster",
      "Light Armor",
      "Reanimated Owl",
      "Stealth",
      "Weakness to Cold"
    ],
    "weapons": [
      {
        "name": "Dementor's Sickle",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Reach (1) / Sharp / Poison"
      },
      {
        "name": "Dementor's Claw",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Bleed (2) / Sharp"
      }
    ]
  },
  {
    "name": "Raptor",
    "realname": "Richard",
    "base": "40mm",
    "rep": 60,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["Court of Owls", "Cults"],
    "img": "img/Raptor.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 7
    },
    "traits": [
      "Batclaw",
      "Kobra Cultist",
      "Street Fighter",
      "Thief",
      "Desensitized",
      "Stealth",
      "Sturdy"
    ],
    "weapons": [
      {
        "name": "Raptor's Claw",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp / Enervating (1)"
      },
      {
        "name": "Raptor's Gas",
        "damage": "★",
        "rof": 1,
        "ammo": 2,
        "traits": "Beam / Expansive / Gas / Enervating (2)"
      }
    ]
  },
  {
    "name": "1880's Talon",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 50,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Court of Owls"],
    "img": "img/1880sTalon.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 11,
      "Willpower": 6,
      "Endurance": 5
    },
    "traits": [
      "Acrobat",
      "Martial Artist",
      "Weakness to Cold",
      "Fast (3)",
      "Reanimated Owl"
    ],
    "weapons": [
      {
        "name": "Gladius",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Overwhelming / Sharp"
      }
    ]
  },
    {
    "name": "Robin",
    "realname": "Damian Wayne",
    "base": "30mm",
    "rep": 50,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["League of Shadows", "Court of Owls"],
    "img": "img/RobinDamian.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 11,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Acrobat",
      "Combo (Paired Katanas)",
      "Martial Artist",
      "True Love (Talia al Ghul)",
      "Batclaw",
      "Detective",
      "Small"
    ],
    "weapons": [
      {
        "name": "Batlngs",
        "damage": "★★",
        "rof": 2,
        "ammo": 2,
        "traits": "Light / S. Range / Throwing"
      },
      {
        "name": "Paired Katanas",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Overwhelming / Sharp"
      }
    ]
  },
  {
    "name": "Robin [Damian Wayne]",
    "realname": "Damian Wayne",
    "base": "30mm",
    "rep": 50,
    "funding": 0,
    "rank": ["Sidekick", "Henchman"],
    "faction": ["Bat Family", "GCPD"],
    "img": "img/RobinDamian.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 11,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Acrobat",
      "Bat Family",
      "Batclaw",
      "Combo (Damian's Attack)",
      "Detective",
      "Martial Artist",
      "Mentoring",
      "Small",
      "Teen Titans"
    ],
    "weapons": [
      {
        "name": "Batlngs",
        "damage": "★★",
        "rof": 2,
        "ammo": 2,
        "traits": "Light / S. Range / Throwing"
      },
      {
        "name": "Damian's Attack",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Boosted (2)"
      }
    ]
  },
  {
    "name": "O'Malley's Son",
    "realname": "Nathaniel O'Malley",
    "base": "30mm",
    "rep": 30,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Court of Owls"],
    "img": "img/OMalleysSon.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Distract",
      "Reanimated Owl",
      "Martial Artist",
      "Weakness to Cold"
    ],
    "weapons": [
      {
        "name": "Owl Knife",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Crushing / Handy / Sharp"
      },
      {
        "name": "Katar",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Bleed (2) / Sharp"
      }
    ]
  },
  {
    "name": "Ephraim Newhouse",
    "realname": "Ephraim Newhouse",
    "base": "30mm",
    "rep": 62,
    "funding": 100,
    "rank": ["Henchman"],
    "faction": ["Court of Owls"],
    "img": "img/EphraimNewhouse.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 11,
      "Willpower": 6,
      "Endurance": 7
    },
    "traits": [
      "Acrobat",
      "Primary Target",
      "Weakness to Cold",
      "Martial Artist",
      "Reanimated Owl",
      "Weapon Master"
    ],
    "weapons": [
      {
        "name": "Scimitar",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Bleed (1) / Sharp"
      },
      {
        "name": "Throwing Knives",
        "damage": "🩸",
        "rof": 2,
        "ammo": 2,
        "traits": "Sharp / S. Range / Throwing"
      }
    ]
  },

//--------------------------------------------------------------------------------------------------------------------
//Royal Flush
//--------------------------------------------------------------------------------------------------------------------
  
  {
    "name": "King of Spades",
    "realname": "Joe Carny",
    "base": "40mm",
    "rep": 90,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Royal Flush"],
    "img": "img/KingOfSpades.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": [
      "Card Fly",
      "King of Spades",
      "Protect Me!",
      "Cheat",
      "Leadership",
      "Spades"
    ],
    "weapons": [
      {
        "name": "King of Spades's Sword",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp / Fire / Boosted (1)"
      }
    ]
  },
  {
    "name": "10 of Spades",
    "realname": "Wanda Wayland",
    "base": "40mm",
    "rep": 44,
    "funding": 100,
    "rank": ["Henchman"],
    "faction": ["Royal Flush"],
    "img": "img/10OfSpades.png",
    "stats": {
      "Attack": 3,
      "Defense": 5,
      "Strength": "5+",
      "Movement": 12,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Acrobat",
      "Scout",
      "Fast (3)",
      "Spades"
    ],
    "weapons": [
      {
        "name": "Sharp Cards",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Reach (3) / Sharp / Handy"
      },
      {
        "name": "Spades Throw",
        "damage": "🩸",
        "rof": 4,
        "ammo": 2,
        "traits": "S. Range / Throwing / Mechanical / Fire"
      }
    ]
  },
  {
    "name": "Jack of Spades",
    "realname": "Unknown",
    "base": "40mm",
    "rep": 60,
    "funding": 400,
    "rank": ["Free Agent"],
    "faction": ["Royal Flush"],
    "img": "img/JackOfSpades.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Herald of Spades",
      "Jack of Spades",
      "Spades",
      "Instinctive Shooting",
      "One of the Boys"
    ],
    "weapons": [
      {
        "name": "Spades Laser Beam",
        "damage": "🩸 ★",
        "rof": 4,
        "ammo": 4,
        "traits": "S. Range / Beam / Fire"
      },
      {
        "name": "Spades Sword",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp / Boosted (1)"
      }
    ]
  },
  {
    "name": "Ace of Spades",
    "realname": "Derek Reston",
    "base": "40mm",
    "rep": 40,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Royal Flush"],
    "img": "img/AceOfSpades.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 12
    },
    "traits": [
      "Desensitized",
      "Spades",
      "Tough Guy",
      "Savage Throw",
      "Sturdy"
    ],
    "weapons": [
      {
        "name": "Spades Punches",
        "damage": "★ ★",
        "rof": "-",
        "ammo": "-",
        "traits": "Overwhelming / Boosted (2)"
      }
    ]
  },
  {
    "name": "Queen of Spades",
    "realname": "Mona Taylor",
    "base": "40mm",
    "rep": 70,
    "funding": 200,
    "rank": ["Sidekick"],
    "faction": ["Royal Flush"],
    "img": "img/QueenOfSpades.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 8,
      "Endurance": 7
    },
    "traits": [
      "Cheat",
      "Queen of Spades",
      "Spades",
      "Protect Me!",
      "Realistic Illusions"
    ],
    "weapons": [
      {
        "name": "Spades Spear",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Reach (2) / Sharp / Fire / Boosted (1)"
      },
      {
        "name": "Spades Beam",
        "damage": "🩸🩸★",
        "rof": 1,
        "ammo": 2,
        "traits": "S. Range / Beam / Fire"
      }
    ]
  },
  {
    "name": "5 of Spades",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 15,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Royal Flush"],
    "img": "img/5OfSpades.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "6+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "For My Lords!",
      "Spades",
      "Minion (3)"
    ],
    "weapons": [
      {
        "name": "Shield",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Protective"
      },
      {
        "name": "Spades Pike",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Reach (3) / Sharp / Boosted (1)"
      }
    ]
  },

//--------------------------------------------------------------------------------------------------------------------
//Suicide Squad
//--------------------------------------------------------------------------------------------------------------------

  {
    "name": "Slipknot Suicide Squad",
    "realname": "Christopher Weiss",
    "base": "30mm",
    "rep": 30,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Suicide Squad"],
    "rivals": ["Bat Family", "GCPD", "League of Shadows"],
    "img": "img/SlipknotSuicideSquad.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 12,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Arrest",
      "Bulletproof Vest",
      "First to Fall",
      "Batclaw/Grapple Gun",
      "Expendable"
    ],
    "weapons": [
      {
        "name": "Knife",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      }
    ]
  },
  {
    "name": "Polka-Dot Man The Suicide Squad",
    "realname": "Abner Krill",
    "base": "30mm",
    "rep": 38,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["Suicide Squad"],
    "img": "img/PolkaDotManTheSuicideSquad.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Autorepair (3)",
      "Interdimensional Virus",
      "Releasing the Dots",
      "Criminal",
      "Obstinate"
    ],
    "weapons": [
      {
        "name": "Emptying Dots",
        "damage": "🩸",
        "rof": 4,
        "ammo": 2,
        "traits": "S. Range / Mechanical / Throwing / Bleed (2) / Exposure"
      }
    ]
  },
  {
    "name": "Weasel The Suicide Squad",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 30,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Suicide Squad"],
    "img": "img/WeaselTheSuicideSquad.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Animal",
      "Claws",
      "Really Tenacious",
      "Sneak Attack",
      "Cannibal",
      "Feral",
      "Small",
      "Stealth"
    ],
    "weapons": []
  },
  {
    "name": "Killer Moth",
    "realname": "Drury Walker",
    "base": "40mm",
    "rep": 44,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["Suicide Squad", "Unknown"],
    "rivals": ["Bat Family", "GCPD"],
    "img": "img/KillerMoth.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Bat Cape",
      "Criminal",
      "Radio",
      "Batclaw",
      "Echolocation"
    ],
    "weapons": [
      {
        "name": "Cacoon Gun",
        "damage": "★",
        "rof": 2,
        "ammo": 2,
        "traits": "Beam / S. Range / Slow (6)"
      },
      {
        "name": "Cacoon Gun (Solid)",
        "damage": "🩸 ★",
        "rof": 3,
        "ammo": 2,
        "traits": "Firearm / Light / S. Range"
      }
    ]
  },
  {
    "name": "John Economos",
    "realname": "John Economos",
    "base": "30mm",
    "rep": 18,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Suicide Squad"],
    "img": "img/JohnEconomos.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Hacking",
      "Volunteer",
      "Intel Support (3)"
    ],
    "weapons": [
      {
        "name": "Informatic Assault",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Steal / Limited Attack"
      }
    ]
  },
  {
    "name": "Emilia Harcourt",
    "realname": "Emilia Harcourt",
    "base": "30mm",
    "rep": 27,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["Suicide Squad"],
    "img": "img/EmiliaHarcourt.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Radio",
      "Volunteer",
      "Tracking Device"
    ],
    "weapons": [
      {
        "name": "Automatic Gun",
        "damage": "🩸 ★",
        "rof": 3,
        "ammo": 2,
        "traits": "S. Range / Firearm / Light"
      },
      {
        "name": "Martial Prowess",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Overwhelming / CRT (Paralyze)"
      }
    ]
  },
  {
    "name": "Killer Croc Suicide Squad",
    "realname": "Waylon Jones",
    "base": "30mm",
    "rep": 40,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Suicide Squad"],
    "rivals": ["Bat Family", "GCPD"],
    "img": "img/KillerCrocSuicideSquad.png",
    "stats": {
      "Attack": 4,
      "Defense": 3,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 7
    },
    "traits": [
      "Amphibious",
      "Ferocious",
      "Tough Skin",
      "Claws",
      "Raised in the Sewers"
    ],
    "weapons": []
  },
  {
    "name": "Polka-Dot Man",
    "realname": "Abner Krill",
    "base": "40mm",
    "rep": 44,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["Suicide Squad", "Unknown"],
    "rivals": ["Bat Family", "GCPD"],
    "img": "img/PolkaDotMan.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 5
    },
    "traits": [
      "Autorepair (3)",
      "Dots Suit",
      "Power Armor",
      "Criminal",
      "Obstinate"
    ],
    "weapons": [
      {
        "name": "Throwing Discs",
        "damage": "🩸",
        "rof": 4,
        "ammo": 2,
        "traits": "Mechanical / Sharp / S. Range / Throwing"
      }
    ]
  },
  {
    "name": "Thinker The Suicide Squad",
    "realname": "Gaius Grieves",
    "base": "30mm",
    "rep": 30,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Suicide Squad"],
    "img": "img/ThinkerTheSuicideSquad.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "6+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 4
    },
    "traits": [
      "Brain Enhancers",
      "Persuasive",
      "Scientific",
      "Computer Intrusion",
      "Protect Me!"
    ],
    "weapons": []
  },
  {
    "name": "Diablo Suicide Squad",
    "realname": "Chato Santana",
    "base": "30mm",
    "rep": 35,
    "funding": 200,
    "rank": ["Henchman"],
    "faction": ["Suicide Squad"],
    "img": "img/DiabloSuicideSquad.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 7
    },
    "traits": [
      "Criminal",
      "Flaming Wave",
      "Magic Tattoos",
      "Self-Discipline",
      "Dirty Fighter",
      "Lantern",
      "Regrets",
      "Supernatural"
    ],
    "weapons": [
      {
        "name": "Flaming Hands",
        "damage": "🩸 ★",
        "rof": 1,
        "ammo": 1,
        "traits": "Beam / Expansive / One Use / Fire"
      },
      {
        "name": "Flaming Tattoos",
        "damage": "🩸",
        "rof": 2,
        "ammo": "-",
        "traits": "Mechanical / S. Range / Throwing / Fire"
      }
    ]
  },
  {
    "name": "Katana Suicide Squad",
    "realname": "Tatsu Yamashiro",
    "base": "30mm",
    "rep": 50,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Suicide Squad"],
    "img": "img/KatanaSuicideSquad.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 11,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Acrobat",
      "Martial Artist",
      "Volunteer",
      "Bodyguard Mission",
      "Security Chief",
      "Weapon Master"
    ],
    "weapons": [
      {
        "name": "Tanto",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Bleed (2) / Defensive / Sharp"
      },
      {
        "name": "Soultaker Katana",
        "damage": "🩸 🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Sharp / Enervating (1)"
      }
    ]
  },
  {
    "name": "Sebastian the Rat The Suicide Squad",
    "realname": "Sebastian",
    "base": "30mm",
    "rep": 10,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Suicide Squad", "Unknown"],
    "rivals": ["Bat Family", "GCPD"],
    "img": "img/SebastianTheRatTheSuicideSquad.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "6+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 3
    },
    "traits": [
      "Amphibious",
      "Charismatic Rat",
      "Required (Ratcatcher 2)",
      "Stealth",
      "Animal",
      "Poison Immunity",
      "Small",
      "Street Guy"
    ],
    "weapons": [
      {
        "name": "Poisoned Touch",
        "damage": "-",
        "rof": "-",
        "ammo": "-",
        "traits": "Poison"
      }
    ]
  },
  {
    "name": "Eagly",
    "realname": "Eagly",
    "base": "40mm",
    "rep": 30,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Suicide Squad"],
    "img": "img/Eagly.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Always on the Move",
      "Fly",
      "Required (Peacemaker John Cena)",
      "Teamwork (2) (Peacemaker John Cena)",
      "Animal",
      "Inspiring Presence (Peacemaker John Cena)",
      "Retractable Claws",
      "True Love (Peacemaker John Cena)"
    ],
    "weapons": []
  },
  {
    "name": "King Shark The Suicide Squad",
    "realname": "Nanaue",
    "base": "40mm",
    "rep": 70,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Suicide Squad", "Unknown"],
    "rivals": ["Bat Family", "GCPD"],
    "img": "img/KingSharkTheSuicideSquad.png",
    "stats": {
      "Attack": 5,
      "Defense": 3,
      "Strength": "3+",
      "Movement": 8,
      "Willpower": 7,
      "Endurance": 9
    },
    "traits": [
      "Amphibious",
      "Bloodthirsty (Mental Disorder)",
      "Cannibal",
      "Handi!",
      "Huge",
      "Blood Scent",
      "Brutal",
      "Fully Equipped",
      "Hardened",
      "Superior Sense of Smell"
    ],
    "weapons": [
      {
        "name": "Claws & Teeth",
        "damage": "🩸 ★",
        "rof": "-",
        "ammo": "-",
        "traits": "Devastating"
      }
    ]
  },
  {
    "name": "Poison Ivy",
    "realname": "Dr. Pamela Lillian Isley",
    "base": "40mm / 60mm",
    "rep": 60,
    "funding": 200,
    "rank": ["Free Agent"],
    "faction": ["Suicide Squad"],
    "img": "img/PoisonIvy.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 7,
      "Endurance": 6
    },
    "traits": [
      "Adaptable",
      "Insidious",
      "Poison Immunity",
      "Scientific",
      "Control Pheromones",
      "Nature's Arm",
      "Protect Me!"
    ],
    "weapons": [
      {
        "name": "Plants",
        "damage": "🩸 ★",
        "rof": "-",
        "ammo": "-",
        "traits": "Mechanical / Protective / Reach (2)"
      },
      {
        "name": "Spores",
        "damage": "🩸",
        "rof": 1,
        "ammo": 3,
        "traits": "Acid / Explosive / Mechanical / S. Range / Poison"
      }
    ]
  },
  {
    "name": "Killer Croc Arkham Asylum",
    "realname": "Waylon Jones",
    "base": "60mm",
    "rep": 110,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["Suicide Squad", "Unknown"],
    "rivals": ["Bat Family", "GCPD", "Bane"],
    "img": "img/KillerCrocArkhamAsylum.png",
    "stats": {
      "Attack": 5,
      "Defense": 3,
      "Strength": "3+",
      "Movement": 8,
      "Willpower": 7,
      "Endurance": 13
    },
    "traits": [
      "Amphibious",
      "Huge",
      "Regeneration",
      "Sewer's Retreat",
      "Sturdy",
      "Tough Skin",
      "Cannibal",
      "Lord of the Sewers",
      "Sewer's Assault",
      "Sewer's Nightmare",
      "Superior Sense of Smell"
    ],
    "weapons": [
      {
        "name": "Massive Claws",
        "damage": "🩸 ★",
        "rof": "-",
        "ammo": "-",
        "traits": "Crushing / Devastating / Reach (2) / Bleed (2)"
      }
    ]
  },
  {
    "name": "T.D.K. The Suicide Squad",
    "realname": "Cory Pitzner",
    "base": "30mm",
    "rep": 36,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Suicide Squad"],
    "img": "img/TDKTheSuicideSquad.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Criminal",
      "Distract",
      "Detachable Arms",
      "Light Armor"
    ],
    "weapons": [
      {
        "name": "Detachable Attack",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Reach (8) / Enervating (3)"
      }
    ]
  },
  {
    "name": "Deathstroke Vanguard Team",
    "realname": "Slade Wilson",
    "base": "30mm",
    "rep": 74,
    "funding": 300,
    "rank": ["Free Agent"],
    "faction": ["Suicide Squad", "Unknown"],
    "rivals": ["Bat Family", "GCPD"],
    "img": "img/DeathstrokeVanguardTeam.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "3+",
      "Movement": 12,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Assassin (2)",
      "Martial Artist",
      "Undercover",
      "Veteran",
      "Frightening Reputation",
      "Soul Armor",
      "Vanguard Team",
      "Weapon Master"
    ],
    "weapons": [
      {
        "name": "Automatic Gun",
        "damage": "🩸 ★",
        "rof": 3,
        "ammo": 2,
        "traits": "S. Range / Firearm / Light"
      },
      {
        "name": "Deathstroke's Swords",
        "damage": "🩸 🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp / Overwhelming / Boosted (1)"
      }
    ]
  },
  {
    "name": "The Riddler Modern Age",
    "realname": "Edward Nigma",
    "base": "30mm",
    "rep": 40,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Suicide Squad"],
    "img": "img/TheRiddlerModernAge.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Confusion",
      "Puzzle Master",
      "Exhaustive Planner",
      "Showmanship!"
    ],
    "weapons": [
      {
        "name": "Cane-Sword",
        "damage": "🩸 🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      }
    ]
  },
  {
    "name": "Ratcatcher 2 The Suicide Squad",
    "realname": "Cleo Cazo",
    "base": "40mm",
    "rep": 40,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Suicide Squad"],
    "img": "img/Ratcatcher2TheSuicideSquad.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 5
    },
    "traits": [
      "Charm",
      "Protector (Robert Dubois)",
      "Stealth",
      "Gas Mask",
      "Sewer Swarm (3)",
      "Tamer Device"
    ],
    "weapons": []
  },
  {
    "name": "Captain Boomerang Vanguard Team",
    "realname": "George \"Digger\" Harkness",
    "base": "30mm",
    "rep": 46,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["Suicide Squad"],
    "img": "img/CaptainBoomerangVanguardTeam.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Boomerang's Arsenal",
      "Master Marksman",
      "Thief",
      "Designated",
      "Ricochet"
    ],
    "weapons": [
      {
        "name": "Melee Boomerang",
        "damage": "🩸 ★",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      },
      {
        "name": "Throwing Boomerang",
        "damage": "🩸 ★",
        "rof": 1,
        "ammo": 4,
        "traits": "Accurate / Sharp / S. Range / Throwing"
      }
    ]
  },

  {
    "name": "Rick Flag Infiltration",
    "realname": "Rick Flag",
    "base": "30mm",
    "rep": 46,
    "funding": 350,
    "rank": ["Sidekick"],
    "faction": ["Suicide Squad"],
    "img": "img/RickFlagInfiltration.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Hardened",
      "One of the Boys",
      "Radio",
      "Veteran",
      "Lieutenant (Amanda Waller)",
      "Order",
      "Scout",
      "Volunteer"
    ],
    "weapons": [
      {
        "name": "Bat",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Heavy"
      },
      {
        "name": "Shotgun",
        "damage": "🩸🩸★",
        "rof": 1,
        "ammo": 3,
        "traits": "Firearm / M. Range / Assault"
      }
    ]
  },
  {
    "name": "The Riddler",
    "realname": "Edward Nigma",
    "base": "60mm",
    "rep": 60,
    "funding": 0,
    "rank": ["Sidekick", "Free Agent"],
    "faction": ["Suicide Squad"],
    "img": "img/TheRiddler.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 7,
      "Endurance": 5
    },
    "traits": [
      "AFK",
      "Intel Support (5)",
      "Puzzle Master",
      "Wizard of Quiz",
      "Hacking",
      "Mastermind",
      "Quiz Master"
    ],
    "weapons": [
      {
        "name": "Informatic Assault",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Steal / Limited Attack"
      }
    ]
  },
  {
    "name": "Vigilante",
    "realname": "Adrian Chase",
    "base": "40mm",
    "rep": 45,
    "funding": 300,
    "rank": ["Free Agent"],
    "faction": ["Suicide Squad"],
    "img": "img/Vigilante.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 7
    },
    "traits": [
      "Duo (Peacemaker)",
      "Psycho",
      "Vigilante's Work",
      "Weapon Master",
      "Grapple Gun",
      "Reinforced Gloves",
      "Volunteer"
    ],
    "weapons": [
      {
        "name": "Automatic Gun",
        "damage": "🩸 ★",
        "rof": 3,
        "ammo": 2,
        "traits": "S. Range / Firearm / Light"
      },
      {
        "name": "Nunchakus",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Defensive / Devastating / Reach (1)"
      }
    ]
  },
  {
    "name": "Captain Boomerang Suicide Squad",
    "realname": "George \"Digger\" Harkness",
    "base": "30mm",
    "rep": 40,
    "funding": 200,
    "rank": ["Free Agent"],
    "faction": ["Suicide Squad", "Unknown"],
    "rivals": ["Bat Family", "GCPD"],
    "img": "img/CaptainBoomerangSuicideSquad.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 6
    },
    "traits": [
      "Elusive",
      "Master Marksman",
      "Monitoring Device",
      "Ricochet",
      "Greed",
      "Melee Boomerang",
      "Primary Target"
    ],
    "weapons": [
      {
        "name": "Bladed Boomerang",
        "damage": "🩸★",
        "rof": 2,
        "ammo": 2,
        "traits": "Accurate / Sharp / S. Range / Throwing"
      },
      {
        "name": "Le Boomerang",
        "damage": "🩸🩸",
        "rof": 2,
        "ammo": 1,
        "traits": "Firearm / S. Range"
      }
    ]
  },
  {
    "name": "KGBeast",
    "realname": "Anatoliy Knyazev",
    "base": "40mm",
    "rep": 95,
    "funding": 500,
    "rank": ["Free Agent"],
    "faction": ["Suicide Squad", "Unknown"],
    "rivals": ["Bat Family", "GCPD"],
    "img": "img/KGBeast.png",
    "stats": {
      "Attack": 5,
      "Defense": 5,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 9
    },
    "traits": [
      "Assassin (2)",
      "Good Aim",
      "Master Fighter",
      "Retractable Claws",
      "Sturdy",
      "Veteran",
      "Configurable Weapon",
      "Martial Artist",
      "One-Armed",
      "Runaway",
      "Thief"
    ],
    "weapons": [
      {
        "name": "Machine Gun",
        "damage": "🩸 ★",
        "rof": 5,
        "ammo": 2,
        "traits": "Firearm / M. Range / Red Dot"
      },
      {
        "name": "Cybernetic Gun",
        "damage": "🩸 🩸",
        "rof": 2,
        "ammo": 2,
        "traits": "Beam / Devastating / M. Range"
      }
    ]
  },
  {
    "name": "Deadshot",
    "realname": "Floyd Lawton",
    "base": "40mm",
    "rep": 71,
    "funding": 600,
    "rank": ["Free Agent"],
    "faction": ["Suicide Squad", "Unknown"],
    "rivals": ["Bat Family", "GCPD"],
    "img": "img/Deadshot.png",
    "stats": {
      "Attack": 4,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 7
    },
    "traits": [
      "Dodge",
      "Night Vision",
      "Shooter",
      "Expert Marksman",
      "Rapid Fire"
    ],
    "weapons": [
      {
        "name": "Modified Assault Gun",
        "damage": "🩸🩸★",
        "rof": 3,
        "ammo": 2,
        "traits": "Firearm / M. Range"
      },
      {
        "name": "Handguns",
        "damage": "🩸★",
        "rof": 4,
        "ammo": 2,
        "traits": "Firearm / Light / S. Range"
      }
    ]
  },
  {
    "name": "Harley Quinn Bombshell",
    "realname": "Dr. Harleen Frances Quinzel",
    "base": "30mm",
    "rep": 65,
    "funding": 300,
    "rank": ["Sidekick"],
    "faction": ["Joker", "Suicide Squad"],
    "img": "img/HarleyQuinnBombshell.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Acrobat",
      "Combat Flip",
      "One of the Boys",
      "True Love (Joker)",
      "Charismatic",
      "Confusion",
      "The Voices (Mental Disorder)",
      "True Love (Joker)"
    ],
    "weapons": [
      {
        "name": "Good Night Bat",
        "damage": "★ ★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Heavy"
      },
      {
        "name": "Hate/Love Gun",
        "damage": "🩸 🩸",
        "rof": 2,
        "ammo": 2,
        "traits": "Bleed (2) / Firearm / Light / S. Range"
      }
    ]
  },
  {
    "name": "Deadshot Suicide Squad",
    "realname": "Floyd Lawton",
    "base": "30mm",
    "rep": 80,
    "funding": 400,
    "rank": ["Free Agent"],
    "faction": ["Suicide Squad", "Unknown"],
    "rivals": ["Bat Family", "GCPD"],
    "img": "img/DeadshotSuicideSquad.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Bullet Time",
      "Leadership",
      "Order",
      "Total Vision",
      "Honor Among Thieves",
      "Master Marksman",
      "Stay in Formation"
    ],
    "weapons": [
      {
        "name": "Custom MG",
        "damage": "🩸 🩸",
        "rof": 3,
        "ammo": 2,
        "traits": "Firearm / M. Range / Scope"
      },
      {
        "name": "Wrist Cannons",
        "damage": "🩸 🩸",
        "rof": 2,
        "ammo": 4,
        "traits": "S. Range / Firearm / Assault / Remote Controlled"
      }
    ]
  },
  {
    "name": "Deathstroke The Terminator",
    "realname": "Slade Wilson",
    "base": "40mm/60mm",
    "rep": 150,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["Suicide Squad", "Unknown"],
    "rivals": ["Bat Family", "GCPD"],
    "img": "img/DeathstrokeTheTerminator.png",
    "stats": {
      "Attack": 5,
      "Defense": 5,
      "Strength": "3+",
      "Movement": 11,
      "Willpower": 8,
      "Endurance": 9
    },
    "traits": [
      "Acrobat",
      "Assassin (3)",
      "Exploit the Weakness",
      "Martial Artist",
      "Scout",
      "Veteran",
      "Arsenal",
      "Contractor",
      "Kevlar Vest",
      "Reinforced Gloves",
      "Stealth",
      "Weapon Master"
    ],
    "weapons": []
  },
  {
    "name": "Amanda Waller Viola Davis",
    "realname": "Amanda Waller",
    "base": "40mm",
    "rep": 44,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Suicide Squad"],
    "img": "img/AmandaWallerViolaDavis.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 4
    },
    "traits": [
      "A.R.G.U.S. Commander",
      "Henchman Bomb",
      "Mastermind",
      "Pulling the Strings",
      "Volunteer",
      "Detonate",
      "Intel Support (4)",
      "Order",
      "Reckless Leader"
    ],
    "weapons": [
      {
        "name": "Informatic Assault",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Steal / Limited Attack"
      }
    ]
  },
  {
    "name": "Killer Croc",
    "realname": "Waylon Jones",
    "base": "60mm",
    "rep": 125,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["Suicide Squad", "Unknown"],
    "rivals": ["Bat Family", "GCPD", "Bane"],
    "img": "img/KillerCroc.png",
    "stats": {
      "Attack": 5,
      "Defense": 3,
      "Strength": "3+",
      "Movement": 8,
      "Willpower": 7,
      "Endurance": 13
    },
    "traits": [
      "Amphibious",
      "Claws",
      "Huge",
      "Power Strike",
      "Sturdy",
      "Tough Skin",
      "Cannibal",
      "Coward's Reward",
      "Lord of the Sewers",
      "Runaway",
      "Superior Sense of Smell"
    ],
    "weapons": []
  },
  {
    "name": "Harley Quinn The Suicide Squad",
    "realname": "Dr. Harleen Frances Quinzel",
    "base": "30mm",
    "rep": 81,
    "funding": 150,
    "rank": ["Free Agent"],
    "faction": ["Suicide Squad"],
    "img": "img/HarleyQuinnTheSuicideSquad.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "5+",
      "Movement": 12,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Acrobat",
      "Charismatic",
      "Goad",
      "Moment of Glory",
      "The Voices (Mental Disorder)",
      "Always on the Move",
      "Confusion",
      "Hidden",
      "Red Flags"
    ],
    "weapons": [
      {
        "name": "Javelin",
        "damage": "🩸 🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Reach (2)"
      },
      {
        "name": "Javelin Throw",
        "damage": "🩸 🩸",
        "rof": 1,
        "ammo": 1,
        "traits": "M. Range / One Use / Throwing"
      }
    ]
  },
  {
    "name": "Peacemaker John Cena",
    "realname": "Christopher Smith",
    "base": "40mm",
    "rep": 70,
    "funding": 350,
    "rank": ["Free Agent", "Sidekick"],
    "faction": ["Suicide Squad"],
    "img": "img/PeacemakerJohnCena.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "3+",
      "Movement": 8,
      "Willpower": 7,
      "Endurance": 8
    },
    "traits": [
      "Duo (Vigilante)",
      "Justice",
      "Rapid Fire",
      "Savage Fighter",
      "Survivor",
      "Good Aim",
      "Punishment",
      "Reinforced Gloves",
      "Sturdy",
      "True Love (Eagly)"
    ],
    "weapons": [
      {
        "name": "Peacemaker's Gun",
        "damage": "🩸 🩸",
        "rof": 2,
        "ammo": 3,
        "traits": "S. Range / Firearm / Devastating / High Caliber"
      }
    ]
  },
  {
    "name": "Bloodsport The Suicide Squad",
    "realname": "Robert DuBois",
    "base": "40mm",
    "rep": 78,
    "funding": 400,
    "rank": ["Free Agent"],
    "faction": ["Suicide Squad", "Unknown"],
    "rivals": ["Bat Family", "GCPD"],
    "img": "img/BloodsportTheSuicideSquad.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Kevlar Vest",
      "Outlaw Field Commander",
      "Ranged Master",
      "Living Arsenal",
      "Protector (Cleo Cazo)",
      "Sharpshooter"
    ],
    "weapons": [
      {
        "name": "Sword",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      },
      {
        "name": "Bloodsport's Guns",
        "damage": "🩸🩸",
        "rof": 3,
        "ammo": 4,
        "traits": "S. Range / Firearm / Light"
      }
    ]
  },


//--------------------------------------------------------------------------------------------------------------------
//Cults
//--------------------------------------------------------------------------------------------------------------------

  {
    "name": "Ratface",
    "realname": "Unknown",
    "base": "40mm",
    "rep": 35,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Cults"],
    "img": "img/Ratface.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Blackfire Cultist",
      "Don't Mind Me",
      "Lord of the Sewers",
      "Served Well",
      "Death Pack",
      "Fervent Follower",
      "Punishment",
      "Stealth"
    ],
    "weapons": [
      {
        "name": "Knife",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      }
    ]
  },
  {
    "name": "Kobra",
    "realname": "Jeffrey Franklin Burr",
    "base": "60mm",
    "rep": 110,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Cults"],
    "img": "img/Kobra.png",
    "stats": {
      "Attack": 5,
      "Defense": 5,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 9,
      "Endurance": 8
    },
    "traits": [
      "Deadliest Man on Earth",
      "Kobra Cultist",
      "Order",
      "Scheming (2)",
      "Kobra Armor",
      "Martial Artist",
      "Poisoned Signs",
      "Void Priest"
    ],
    "weapons": [
      {
        "name": "Hidden Sword",
        "damage": "🩸 🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      },
      {
        "name": "Kobra's Attack",
        "damage": "★ ★",
        "rof": "-",
        "ammo": "-",
        "traits": "Accurate"
      }
    ]
  },
  {
    "name": "Naga Hazard Trooper 2",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 35,
    "funding": 350,
    "rank": ["Henchman"],
    "faction": ["Cults"],
    "img": "img/NagaHazardTrooper2.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 6,
      "Willpower": 6,
      "Endurance": 7
    },
    "traits": [
      "Discharge",
      "Kobra Cultist",
      "Hazard Armor",
      "Raised in the Sewers"
    ],
    "weapons": [
      {
        "name": "Kobra Flamethrower",
        "damage": "🩸 ★",
        "rof": 1,
        "ammo": 2,
        "traits": "Caustic / Expansive / Mechanical / Fire"
      }
    ]
  },
  {
    "name": "The Nagas",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 34,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["Cults"],
    "img": "img/TheNagas.png",
    "stats": {
      "Attack": 4,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Hidden",
      "Radio",
      "Veteran",
      "Kobra Cultist",
      "Shady Dealings"
    ],
    "weapons": [
      {
        "name": "Automatic Gun",
        "damage": "🩸 ★",
        "rof": 3,
        "ammo": 2,
        "traits": "S. Range / Firearm / Light"
      },
      {
        "name": "Poisoned Knife",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp / Crt (Paralyze) / Poison"
      }
    ]
  },
  {
    "name": "Jake",
    "realname": "Jake Baker",
    "base": "40mm",
    "rep": 50,
    "funding": 0,
    "rank": ["Sidekick"],
    "faction": ["Cults"],
    "img": "img/Jake.png",
    "stats": {
      "Attack": 3,
      "Defense": 2,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 7
    },
    "traits": [
      "Blackfire Cultist",
      "Don't Mind Me",
      "Lieutenant (Deacon Blackfire)",
      "Served Well",
      "Undercity Knowledge",
      "Death Pack",
      "Fervent Follower",
      "Protect Me!",
      "Undercity Command"
    ],
    "weapons": [
      {
        "name": "SMG",
        "damage": "🩸 🩸",
        "rof": 4,
        "ammo": 2,
        "traits": "Firearm / S. Range"
      },
      {
        "name": "Drugs",
        "damage": "-",
        "rof": "-",
        "ammo": "-",
        "traits": "Steal / Enervating (3) / Hypnotize"
      }
    ]
  },
  {
    "name": "Underworlder 1",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 14,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Cults"],
    "img": "img/Underworlder1.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "6+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Blackfire Cultist",
      "Don't Mind Me",
      "Death Pack",
      "Go My Little Birds"
    ],
    "weapons": []
  },
  {
    "name": "Kobra Hybrid",
    "realname": "Unknown",
    "base": "40mm",
    "rep": 40,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Cults"],
    "img": "img/KobraHybrid.png",
    "stats": {
      "Attack": 4,
      "Defense": 3,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 8
    },
    "traits": [
      "Desensitized",
      "Large",
      "Super Jump",
      "Kobra Cultist",
      "Sturdy"
    ],
    "weapons": [
      {
        "name": "Hybrid Strike",
        "damage": "🩸 ★",
        "rof": "-",
        "ammo": "-",
        "traits": "Crt (Paralyzed) / Poison"
      }
    ]
  },
  {
    "name": "Deacon Blackfire",
    "realname": "Joseph Blackfire",
    "base": "40mm / 60mm",
    "rep": 100,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Cults"],
    "img": "img/DeaconBlackfire.png",
    "stats": {
      "Attack": 4,
      "Defense": 3,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 9,
      "Endurance": 8
    },
    "traits": [
      "Aggressive Preach",
      "Blackfire Totem",
      "Don't Mind Me",
      "Goad",
      "Martyrdom",
      "The Good Command",
      "Blackfire Cultist",
      "Death Pack",
      "Exalt",
      "Immortal",
      "Reinforced Gloves"
    ],
    "weapons": [
      {
        "name": "Combat Machete",
        "damage": "🩸 ★",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      },
      {
        "name": "Drugs",
        "damage": "-",
        "rof": "-",
        "ammo": "-",
        "traits": "Steal / Enervating (3) / Hypnotize"
      }
    ]
  },
  {
    "name": "Underworlder Vagon 1",
    "realname": "Unknown",
    "base": "42x75mm",
    "rep": 22,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Cults"],
    "img": "img/UnderworlderVagon1.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 6
    },
    "traits": [
      "Blackfire Cultist",
      "Death Pack",
      "Inertia",
      "Charge",
      "Don't Mind Me",
      "Junk Hoarder"
    ],
    "weapons": []
  },
  {
    "name": "Underworlder 2",
    "realname": "Unknown",
    "base": "40mm",
    "rep": 16,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Cults"],
    "img": "img/Underworlder2.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "6+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Blackfire Cultist",
      "Don't Mind Me",
      "Death Pack",
      "Meow"
    ],
    "weapons": []
  },
  {
    "name": "Cobra Swarm",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 0,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Cults"],
    "img": "img/CobraSwarm.png",
    "stats": {
      "Attack": 1,
      "Defense": 1,
      "Strength": "6+",
      "Movement": 8,
      "Willpower": 3,
      "Endurance": 1
    },
    "traits": [
      "Animal",
      "Poison Master",
      "Kobra Swarm",
      "Simple Mind"
    ],
    "weapons": [
      {
        "name": "Poisoned Fangs",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Caustic / Poison / Slow (1)"
      }
    ]
  },
  {
    "name": "Young Woman",
    "realname": "Sally",
    "base": "40mm",
    "rep": 45,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Cults"],
    "img": "img/YoungWoman.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "6+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 4
    },
    "traits": [
      "Blackfire Cultist",
      "Death Pack",
      "Protect Me!",
      "Terrible Revelation",
      "Charm",
      "Don't Mind Me",
      "Righteous Vengeance"
    ],
    "weapons": []
  },
  {
    "name": "Lancehead 1",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 12,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Cults"],
    "img": "img/Lancehead1.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 5
    },
    "traits": [
      "Kobra Armor",
      "Minion (3)",
      "Kobra Cultist"
    ],
    "weapons": [
      {
        "name": "Knife",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      }
    ]
  },
  {
    "name": "Lady Eve",
    "realname": "Eve",
    "base": "30mm",
    "rep": 60,
    "funding": 0,
    "rank": ["Sidekick"],
    "faction": ["Cults"],
    "img": "img/LadyEve.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 6
    },
    "traits": [
      "Fervent Follower",
      "Kobra Cultist",
      "Poison Catalyst",
      "Weapon Master",
      "Kobra Armor",
      "Leadership",
      "Void Priest"
    ],
    "weapons": [
      {
        "name": "Kobra Sword",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp / Enervating (1)"
      },
      {
        "name": "Kobra Gas",
        "damage": "-",
        "rof": 1,
        "ammo": 2,
        "traits": "Expansive / Gas / Slow (4)"
      }
    ]
  },
  {
    "name": "Underworlder 6",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 10,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Cults"],
    "img": "img/Underworlder6.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "6+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Blackfire Cultist",
      "Don't Mind Me",
      "Death Pack",
      "Horde"
    ],
    "weapons": [
      {
        "name": "Grab",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Enervating (1)"
      }
    ]
  },
  {
    "name": "Underworlder 4",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 10,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Cults"],
    "img": "img/Underworlder4.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "6+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Blackfire Cultist",
      "Don't Mind Me",
      "Death Pack",
      "Horde"
    ],
    "weapons": [
      {
        "name": "Broken Glass",
        "damage": "🩸 🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "One Use / Sharp"
      }
    ]
  },
  {
    "name": "Batman The Cult",
    "realname": "Bruce Wayne",
    "base": "40mm",
    "rep": 70,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["Cults"],
    "img": "img/BatmanTheCult.png",
    "stats": {
      "Attack": 4,
      "Defense": 5,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Bat Cape",
      "Controlled by Drugs",
      "Hidden",
      "Master of Stealth",
      "Sneak Attack",
      "Vigilante's Work",
      "Blackfire Cultist",
      "Detective",
      "I See the Light",
      "Reinforced Gloves",
      "Sturdy"
    ],
    "weapons": [
      {
        "name": "Batarangs",
        "damage": "★ ★",
        "rof": 2,
        "ammo": 2,
        "traits": "Light / S. Range / Throwing"
      }
    ]
  },
  {
    "name": "Kobra Bestowed",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 24,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Cults"],
    "img": "img/KobraBestowed.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 4
    },
    "traits": [
      "Kobra Cultist",
      "Poisoned Signs",
      "Void Priest",
      "Poison Catalyst",
      "Protect Me!"
    ],
    "weapons": [
      {
        "name": "Cobras",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Caustic / Poison"
      }
    ]
  },
  {
    "name": "Underworlder Vagon 2",
    "realname": "Unknown",
    "base": "42x75mm",
    "rep": 26,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Cults"],
    "img": "img/UnderworlderVagon2.png",
    "stats": {
      "Attack": 3,
      "Defense": 2,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 8
    },
    "traits": [
      "Blackfire Cultist",
      "Death Pack",
      "Inertia",
      "Charge",
      "Don't Mind Me",
      "Light Armor"
    ],
    "weapons": [
      {
        "name": "Slap and Slash",
        "damage": "🩸 ★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Sharp / Blunt (2) / Devastating"
      }
    ]
  },
  {
    "name": "Underworlder 5",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 11,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Cults"],
    "img": "img/Underworlder5.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "6+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Blackfire Cultist",
      "Don't Mind Me",
      "Death Pack",
      "Horde"
    ],
    "weapons": [
      {
        "name": "Tube",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Heavy"
      }
    ]
  },
  {
    "name": "Naga Hazard Trooper 1",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 38,
    "funding": 500,
    "rank": ["Henchman"],
    "faction": ["Cults"],
    "img": "img/NagaHazardTrooper1.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 6,
      "Willpower": 6,
      "Endurance": 7
    },
    "traits": [
      "Follow Me!",
      "Kobra Cultist",
      "Hazard Armor",
      "Raised in the Sewers"
    ],
    "weapons": [
      {
        "name": "Custom SMG",
        "damage": "🩸 🩸",
        "rof": 3,
        "ammo": 2,
        "traits": "Assault / Firearm / M. Range / Red Dot"
      },
      {
        "name": "Attached Grenade Launcher",
        "damage": "🩸 ★",
        "rof": 1,
        "ammo": 1,
        "traits": "Explosive / Firearm / Grenade / M. Range"
      }
    ]
  },
  {
    "name": "Lancehead Captain",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 30,
    "funding": 400,
    "rank": ["Henchman"],
    "faction": ["Cults"],
    "img": "img/LanceheadCaptain.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 5
    },
    "traits": [
      "Kobra Armor",
      "Take Cover!",
      "Kobra Cultist"
    ],
    "weapons": [
      {
        "name": "Custom SMG",
        "damage": "🩸 🩸",
        "rof": 3,
        "ammo": 2,
        "traits": "Assault / Firearm / M. Range"
      }
    ]
  },
  {
    "name": "Lancehead 2",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 18,
    "funding": 350,
    "rank": ["Henchman"],
    "faction": ["Cults"],
    "img": "img/Lancehead2.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 5
    },
    "traits": [
      "Kobra Armor",
      "Minion (3)",
      "Kobra Cultist"
    ],
    "weapons": [
      {
        "name": "Carbine",
        "damage": "🩸",
        "rof": 5,
        "ammo": 2,
        "traits": "Assault / Firearm / M. Range"
      }
    ]
  },
  {
    "name": "Lancehead Soldier",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 22,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Cults"],
    "img": "img/LanceheadSoldier.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Kobra Armor",
      "Minion (3)",
      "Kobra Cultist"
    ],
    "weapons": [
      {
        "name": "Sword",
        "damage": "🩸 🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      }
    ]
  },


//--------------------------------------------------------------------------------------------------------------------
//Batman Who Laughs
//--------------------------------------------------------------------------------------------------------------------

  {
    "name": "Damian Who Laughs",
    "realname": "Damian Wayne",
    "base": "30mm",
    "rep": 60,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Batman Who Laughs"],
    "rivals": ["GCPD", "Joker"],
    "img": "img/DamianWhoLaughs.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 13,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Acrobat",
      "Dark Influence",
      "Duelist",
      "Master of Stealth",
      "Sneak Attack",
      "Cannibal",
      "Death Pack",
      "Martial Artist",
      "Small",
      "Sneaking"
    ],
    "weapons": [
      {
        "name": "Infected Claws & Teeth",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Infected"
      }
    ]
  },
  {
    "name": "The Commissioner",
    "realname": "James Gordon",
    "base": "30mm",
    "rep": 60,
    "funding": 350,
    "rank": ["Sidekick"],
    "faction": ["Batman Who Laughs"],
    "rivals": ["GCPD", "Joker"],
    "img": "img/TheCommissioner.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 7,
      "Endurance": 6
    },
    "traits": [
      "Arrest",
      "Commissioner",
      "Detective",
      "Goad",
      "Insider Agent",
      "Bulletproof Vest",
      "Dark Influence",
      "Disposable Minions",
      "Gunman",
      "Veteran"
    ],
    "weapons": [
      {
        "name": "Automatic Gun",
        "damage": "🩸",
        "rof": 3,
        "ammo": 3,
        "traits": "S. Range / Firearm / Light"
      }
    ]
  },
  {
    "name": "The Merciless",
    "realname": "Bruce Wayne",
    "base": "30mm",
    "rep": 90,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Batman Who Laughs"],
    "img": "img/TheMerciless.png",
    "stats": {
      "Attack": 5,
      "Defense": 3,
      "Strength": "3+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 10
    },
    "traits": [
      "Like Flies to Me",
      "Mindless Monster",
      "Weapon Master",
      "Medium Armor",
      "Obstinate"
    ],
    "weapons": [
      {
        "name": "Merciless's Sword",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Anti-Tank / Sharp"
      }
    ]
  },
  {
    "name": "Infected Who Laughs",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 6,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Batman Who Laughs"],
    "img": "img/InfectedWhoLaughs.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "6+",
      "Movement": 8,
      "Willpower": 3,
      "Endurance": 3
    },
    "traits": [
      "Death Pack",
      "Freed",
      "Minion (6)",
      "Faint",
      "Mindless Monster",
      "Walking Suspects"
    ],
    "weapons": [
      {
        "name": "Infected Touch",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Infected"
      }
    ]
  },
  {
    "name": "The Grim Knight",
    "realname": "Bruce Wayne",
    "base": "40mm",
    "rep": 90,
    "funding": 500,
    "rank": ["Free Agent"],
    "faction": ["Batman Who Laughs"],
    "img": "img/TheGrimKnight.png",
    "stats": {
      "Attack": 5,
      "Defense": 4,
      "Strength": "3+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 8
    },
    "traits": [
      "Bat-Armor MK II",
      "Detective",
      "Living Arsenal",
      "Reinforced Gloves",
      "Vigilante's Work",
      "BATCLAW",
      "Instinctive Shooting",
      "Martial Artist",
      "Undercover"
    ],
    "weapons": [
      {
        "name": "Hunting Knife",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      },
      {
        "name": "Ranged Weapons",
        "damage": "🩸🩸",
        "rof": 3,
        "ammo": 4,
        "traits": "Firearm / S. Range"
      }
    ]
  },
  {
    "name": "The Batman Who Laughs",
    "realname": "Bruce Wayne",
    "base": "60mm",
    "rep": 125,
    "funding": 0,
    "rank": ["Leader", "Free Agent"],
    "faction": ["Batman Who Laughs"],
    "rivals": ["GCPD", "Joker"],
    "img": "img/TheBatmanWhoLaughs.png",
    "stats": {
      "Attack": 5,
      "Defense": 5,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 8,
      "Endurance": 9
    },
    "traits": [
      "Blood Scent",
      "Detective",
      "Martial Artist",
      "Psycho",
      "Sneaking",
      "Strategist",
      "Dark Influence",
      "Luck",
      "Protect Me!",
      "Reinforced Gloves",
      "Stealth",
      "Trickster"
    ],
    "weapons": [
      {
        "name": "Gun",
        "damage": "🩸★",
        "rof": 2,
        "ammo": 2,
        "traits": "Firearm / S. Range"
      },
      {
        "name": "Scythe",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Bleed (2) / Reach (1) / Sharp"
      }
    ]
  },
  {
    "name": "The Red Death",
    "realname": "Bruce Wayne",
    "base": "30mm",
    "rep": 90,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Batman Who Laughs"],
    "img": "img/TheRedDeath.png",
    "stats": {
      "Attack": 5,
      "Defense": 5,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Always on the Move",
      "Black Bats Trail",
      "Dodge",
      "Metabolize Wounds (2)",
      "Super Speed (3)",
      "Bipolar (Mental Disorder)",
      "Detective",
      "Fast (4)",
      "Speedster"
    ],
    "weapons": [
      {
        "name": "Speed Attack",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Overwhelming / Crushing / Fast Combo (1)"
      },
      {
        "name": "Black Bats",
        "damage": "",
        "rof": 1,
        "ammo": "-",
        "traits": "Enervating (2) / Speed Attack (1) / Explosive"
      }
    ]
  },
  {
    "name": "The Drowned",
    "realname": "Bryce Wayne",
    "base": "30mm",
    "rep": 90,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["Batman Who Laughs"],
    "img": "img/TheDrowned.png",
    "stats": {
      "Attack": 4,
      "Defense": 5,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Amphibious",
      "Obstinate",
      "Sewer’s Assault",
      "Weapon Master",
      "Dispersion",
      "Regeneration",
      "Tough Skin"
    ],
    "weapons": [
      {
        "name": "Trident",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Motion (3) / Reach (2)"
      },
      {
        "name": "Dark Water",
        "damage": "🩸★",
        "rof": 1,
        "ammo": 3,
        "traits": "Accurate / Cold / Explosive / Motion (2) / S. Range"
      }
    ]
  },
  {
    "name": "Robin Who Laughs",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 34,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Batman Who Laughs", "Unknown"],
    "rivals": ["GCPD", "Joker"],
    "img": "img/RobinWhoLaughs.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 12,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Cannibal",
      "He Freed Me",
      "Martial Artist",
      "Sneaking",
      "Death Pack",
      "Horde",
      "Small",
      "Stealth"
    ],
    "weapons": [
      {
        "name": "Infected Claws & Teeth",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Infected"
      }
    ]
  },

//--------------------------------------------------------------------------------------------------------------------
//Watchmen
//--------------------------------------------------------------------------------------------------------------------
  {
    "name": "Silk Spectre II",
    "realname": "Laurie Juspeczyk",
    "base": "30mm",
    "rep": 50,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Watchmen"],
    "img": "img/SilkSpectreII.png",
    "stats": {
      "Attack": 4,
      "Defense": 5,
      "Strength": "4+",
      "Movement": 11,
      "Willpower": 6,
      "Endurance": 5
    },
    "traits": [
      "Acrobat",
      "Combo (Unarmed)",
      "Martial Artist",
      "Close Combat Master",
      "Counter Attack",
      "Troublemaker"
    ],
    "weapons": []
  },
  {
    "name": "The Comedian",
    "realname": "Edward Blake",
    "base": "30mm",
    "rep": 75,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["Watchmen"],
    "img": "img/TheComedian.png",
    "stats": {
      "Attack": 4,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 7,
      "Endurance": 9
    },
    "traits": [
      "Detonate",
      "Hardened",
      "Rapid Fire",
      "Shooter",
      "Dirty Fighter",
      "Psycho",
      "Reinforced Gloves",
      "Veteran"
    ],
    "weapons": [
      {
        "name": "Cal.50 Gun",
        "damage": "🩸🩸",
        "rof": 2,
        "ammo": 2,
        "traits": "Firearm / S. Range"
      },
      {
        "name": "Machine Gun",
        "damage": "🩸🩸",
        "rof": 4,
        "ammo": 2,
        "traits": "Assault / Firearm / M. Range"
      }
    ]
  },
  {
    "name": "Nite Owl",
    "realname": "Daniel Dreiberg",
    "base": "30mm",
    "rep": 50,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Watchmen"],
    "img": "img/NiteOwl.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Archie",
      "Bat Cape",
      "Brutal",
      "Total Vision",
      "Arrest",
      "Bonebreaker",
      "Reinforced Gloves"
    ],
    "weapons": [
      {
        "name": "Shurikens",
        "damage": "★★",
        "rof": 2,
        "ammo": 2,
        "traits": "Light / S. Range / Throwing"
      }
    ]
  },
  {
    "name": "Rorschach",
    "realname": "Walter Joseph Kovacs",
    "base": "30mm",
    "rep": 75,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Watchmen"],
    "img": "img/Rorschach.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Bloodthirsty (Mental Disorder)",
      "Detective",
      "Hidden",
      "Brutal",
      "Devastating Blow"
    ],
    "weapons": [
      {
        "name": "Improvised Weapon",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Bleed (1) / Handy"
      }
    ]
  },
  {
    "name": "Bubastis",
    "realname": "Bubastis",
    "base": "40mm",
    "rep": 0,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Watchmen"],
    "img": "img/Bubastis.png",
    "stats": {
      "Attack": 4,
      "Defense": 3,
      "Strength": "3+",
      "Movement": 14,
      "Willpower": 5,
      "Endurance": 7
    },
    "traits": [
      "Animal",
      "Large",
      "Super Jump",
      "Claws",
      "Stealth",
      "True Love (Ozymandias)"
    ],
    "weapons": []
  },
  {
    "name": "Ozymandias",
    "realname": "Adrian Alexander Veidt",
    "base": "60mm",
    "rep": 100,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["Watchmen"],
    "img": "img/Ozymandias.png",
    "stats": {
      "Attack": 4,
      "Defense": 5,
      "Strength": "3+",
      "Movement": 13,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": [
      "Acrobat",
      "Martial Artist",
      "Reflexes",
      "Smartest Man Alive",
      "Grand Strategist",
      "Mastermind",
      "Reinforced Gloves"
    ],
    "weapons": []
  },


//--------------------------------------------------------------------------------------------------------------------
//Unknown
//--------------------------------------------------------------------------------------------------------------------

  {
    "name": "Psycho-Pirate",
    "realname": "Roger Hayden",
    "base": "40mm",
    "rep": 50,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family"],
    "img": "img/PsychoPirate.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 7,
      "Endurance": 6
    },
    "traits": [
      "Charm",
      "Emotion Control",
      "Plead"
    ],
    "weapons": []
  },
  {
    "name": "Ratcatcher",
    "realname": "Otis Flannegan",
    "base": "40mm",
    "rep": 50,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family"],
    "img": "img/Ratcatcher.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 5
    },
    "traits": [
      "Lord of the Sewers",
      "Poison Immunity",
      "Poison Master",
      "Rat Tamer",
      "Sewer Swarm (3)",
      "Sewer Worker",
      "Stealth"
    ],
    "weapons": [
      {
        "name": "Poisoned Baton",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Poison"
      }
    ]
  },
  {
    "name": "Solomon Grundy",
    "realname": "Cyrus Gold",
    "base": "60mm",
    "rep": 115,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family"],
    "img": "img/SolomonGrundy.png",
    "stats": {
      "Attack": 5,
      "Defense": 2,
      "Strength": "2+",
      "Movement": 6,
      "Willpower": 7,
      "Endurance": 14
    },
    "traits": [
      "Brutal",
      "Desensitized",
      "Huge",
      "Immortal",
      "Reinforced Gloves",
      "Stupid",
      "Supernatural",
      "Undead",
      "Unstoppable Monster"
    ],
    "weapons": [
      {
        "name": "Improvised Weapon",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Bleed (1) / Handy / Overwhelming"
      }
    ]
  },
  {
    "name": "Scarecrow",
    "realname": "Jonathan Crane",
    "base": "40mm",
    "rep": 73,
    "funding": 200,
    "rank": ["Free Agent"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family"],
    "img": "img/Scarecrow.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 8,
      "Willpower": 7,
      "Endurance": 6
    },
    "traits": [
      "Charm",
      "Inspire Fear",
      "Persuasive",
      "Psychologist",
      "Scientific",
      "The Fear Master",
      "Undercover"
    ],
    "weapons": [
      {
        "name": "Scythe",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Bleed (2) / Reach (1) / Sharp"
      },
      {
        "name": "Fear Spray",
        "damage": "🩸",
        "rof": 1,
        "ammo": 3,
        "traits": "Expansive / Gas / Mechanical / Terror"
      }
    ]
  },
  {
    "name": "Hush",
    "realname": "Thomas Elliot",
    "base": "40mm",
    "rep": 85,
    "funding": 350,
    "rank": ["Free Agent"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family"],
    "img": "img/Hush.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 8,
      "Endurance": 7
    },
    "traits": [
      "Exhaustive Planner",
      "Gunman",
      "Hidden Boss",
      "Martial Artist",
      "Master Marksman",
      "Mastermind",
      "Reinforced Gloves",
      "Scheming (2)"
    ],
    "weapons": [
      {
        "name": "Automatic Gun",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 3,
        "traits": "S. Range / Firearm / Light"
      },
      {
        "name": "Automatic Gun",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 3,
        "traits": "S. Range / Firearm / Light"
      }
    ]
  },
  {
    "name": "Clock King",
    "realname": "William Tockman",
    "base": "40mm",
    "rep": 50,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family"],
    "img": "img/ClockKing.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Confusion",
      "Mastermind",
      "Paranoid (Mental Disorder)",
      "Time Bomb",
      "Time Control",
      "Time Manipulation"
    ],
    "weapons": []
  },
  {
    "name": "Gentleman Ghost",
    "realname": "Jim Craddock",
    "base": "40mm",
    "rep": 70,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family"],
    "img": "img/GentlemanGhost.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 6
    },
    "traits": [
      "Chill Touch",
      "Concealment",
      "Elusive",
      "Ghost",
      "Ice Flash"
    ],
    "weapons": [
      {
        "name": "Phantasmal Cane",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Cold / Handy"
      },
      {
        "name": "Phantasmal Flintlock",
        "damage": "🩸🩸🩸★",
        "rof": 1,
        "ammo": 2,
        "traits": "Cold / Firearm / Reload / S. Range"
      }
    ]
  },
  {
    "name": "Mad Hatter",
    "realname": "Jervis Tetch",
    "base": "40mm",
    "rep": 70,
    "funding": 200,
    "rank": ["Free Agent"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family"],
    "img": "img/MadHatter.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 7,
      "Endurance": 6
    },
    "traits": [
      "Charm",
      "Dodge",
      "Handyman",
      "Mastermind",
      "Mind Control Device",
      "Small",
      "Weak"
    ],
    "weapons": [
      {
        "name": "Cal 0.60 Gun",
        "damage": "🩸🩸🩸",
        "rof": 1,
        "ammo": 2,
        "traits": "Firearm / S. Range / Push (3)"
      }
    ]
  },
  {
    "name": "Man-Bat",
    "realname": "Dr. Kirk Langstrom",
    "base": "60mm",
    "rep": 82,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family"],
    "img": "img/ManBat.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "Drag",
      "Echolocation",
      "Fly",
      "Hover",
      "Huge",
      "Sneak Attack",
      "Sneaking",
      "Stealth"
    ],
    "weapons": [
      {
        "name": "Man-Bat's Claws",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Motion (4) / Terror"
      },
      {
        "name": "Sonic Scream",
        "damage": "★",
        "rof": 1,
        "ammo": 4,
        "traits": "Expansive / Beam / Sonic"
      }
    ]
  },
  {
    "name": "Ten-Eyed Man",
    "realname": "Philip Reardon",
    "base": "40mm",
    "rep": 46,
    "funding": 300,
    "rank": ["Free Agent"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family"],
    "img": "img/TenEyedMan.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 7
    },
    "traits": [
      "Criminal",
      "Good Aim",
      "Rapid Fire",
      "Reinforced Gloves",
      "Super-Sight"
    ],
    "weapons": [
      {
        "name": "Automatic Gun",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 3,
        "traits": "S. Range / Firearm / Light"
      }
    ]
  },
  {
    "name": "Lobo Paramilitary",
    "realname": "Unknown",
    "base": "40mm",
    "rep": 140,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["Unknown"],
    "img": "img/LoboParamilitary.png",
    "stats": {
      "Attack": 5,
      "Defense": 4,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 8,
      "Endurance": 11
    },
    "traits": [
      "Bloody Christmas",
      "Bounty Hunter",
      "Brutal",
      "Close Combat Master",
      "Immortal",
      "One Shot Gun",
      "Power Strike",
      "Regeneration",
      "Reinforced Gloves",
      "Sturdy",
      "The Main Man"
    ],
    "weapons": [
      {
        "name": "Chained Hook",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Reach (3) / Sharp"
      },
      {
        "name": "Kukri",
        "damage": "🩸★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Sharp / Heavy"
      }
    ]
  },
  {
    "name": "Calculator Classic",
    "realname": "Noah Kuttler",
    "base": "40mm",
    "rep": 33,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family"],
    "img": "img/CalculatorClassic.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Computer Console",
      "Computer Intrusion",
      "Criminal",
      "Visor Projections"
    ],
    "weapons": [
      {
        "name": "Calculator's Visor",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Reach (2)"
      }
    ]
  },
  {
    "name": "Catman The Hunter",
    "realname": "Thomas Reese Blake",
    "base": "40mm",
    "rep": 115,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family", "Joker"],
    "img": "img/CatmanTheHunter.png",
    "stats": {
      "Attack": 5,
      "Defense": 5,
      "Strength": "3+",
      "Movement": 11,
      "Willpower": 8,
      "Endurance": 8
    },
    "traits": [
      "Acrobat",
      "Alpha",
      "Claws",
      "Close Combat Master",
      "Combat Flip",
      "Coward's Reward",
      "Goad",
      "Hunter",
      "Precise Blow",
      "Superior Sense of Smell",
      "Survivor",
      "Tracking"
    ],
    "weapons": [
      {
        "name": "Catarangs",
        "damage": "🩸★",
        "rof": 2,
        "ammo": 2,
        "traits": "M. Range / Sharp / Throwing"
      }
    ]
  },
  {
    "name": "Thug 1",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 19,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family"],
    "img": "img/Thug1.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Criminal"
    ],
    "weapons": [
      {
        "name": "Knife",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp"
      }
    ]
  },
  
  {
    "name": "Harley Quinn Bewitched",
    "realname": "Dr. Harleen Frances Quinzel",
    "base": "40mm",
    "rep": 77,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["Unknown"],
    "img": "img/HarleyQuinnBewitched.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "5+",
      "Movement": 13,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": [
      "A Bit of Magic",
      "Acrobat",
      "Charismatic",
      "Combat Flip",
      "Confusion",
      "Fast (2)",
      "True Love (Joker)"
    ],
    "weapons": [
      {
        "name": "Your Face Here",
        "damage": "★★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Heavy / Reach (1) / Push (3)"
      }
    ]
  },
  {
    "name": "Dr. Hugo Strange",
    "realname": "Hugo Strange",
    "base": "40mm",
    "rep": 85,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family"],
    "img": "img/DrHugoStrange.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 8,
      "Endurance": 7
    },
    "traits": [
      "Arkham Asylum Dr.",
      "Mastermind",
      "Mind Control",
      "Psychiatrist",
      "Psycho",
      "Psychologist",
      "Scientific",
      "Subliminal Suggestion"
    ],
    "weapons": [
      {
        "name": "Drugs",
        "damage": "-",
        "rof": "-",
        "ammo": "-",
        "traits": "Steal / Enervating (3) / Hypnotize"
      },
      {
        "name": "Facility Drugs",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Steal / Mechanical / Poison / Terror"
      }
    ]
  },
  {
    "name": "Thug 2",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 17,
    "funding": 250,
    "rank": ["Henchman"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family"],
    "img": "img/Thug2.png",
    "stats": {
      "Attack": 3,
      "Defense": 2,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Criminal"
    ],
    "weapons": [
      {
        "name": "Sawed Off Shotgun",
        "damage": "🩸★",
        "rof": 1,
        "ammo": 2,
        "traits": "Expansive / Firearm"
      }
    ]
  },
  {
    "name": "Scarecrow Arkham Asylum",
    "realname": "Jonathan Crane",
    "base": "30mm",
    "rep": 50,
    "funding": 200,
    "rank": ["Free Agent"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family"],
    "img": "img/ScarecrowArkhamAsylum.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Back to the Nightmare",
      "Fear of the Dark",
      "Gas Mask",
      "Inspire Fear",
      "Psychologist",
      "Shadowed Nightmare",
      "Stalker",
      "Undercover"
    ],
    "weapons": [
      {
        "name": "Drug Spray",
        "damage": "-",
        "rof": 1,
        "ammo": 2,
        "traits": "Expansive / Gas / Enervating (2) / Poison"
      },
      {
        "name": "Syringe Claw",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Poison / Terror"
      }
    ]
  },
  {
    "name": "Victor Zsasz",
    "realname": "Victor Zsasz",
    "base": "40mm",
    "rep": 75,
    "funding": 0,
    "rank": ["Free Agent"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family"],
    "img": "img/VictorZsasz.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 7
    },
    "traits": [
      "Combo (Machete)",
      "Death Marks",
      "Frightening Reputation",
      "Master of Stealth",
      "Psycho",
      "Shadowed Nightmare",
      "Sneak Attack",
      "The Murderer"
    ],
    "weapons": [
      {
        "name": "Machete",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Heavy / Sharp"
      }
    ]
  },
  {
    "name": "Catwoman Julie Newmar",
    "realname": "Selina Kyle",
    "base": "30mm",
    "rep": 44,
    "funding": 200,
    "rank": ["Free Agent"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family"],
    "img": "img/CatwomanJulieNewmar.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": "5+",
      "Movement": 12,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Business Agent",
      "Criminal",
      "Don't Mind Me",
      "Escape Artist",
      "Night Vision",
      "Thief"
    ],
    "weapons": [
      {
        "name": "Claws with Catapudenia",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp / Hypnotize"
      },
      {
        "name": "Sneeze Bombs",
        "damage": "-",
        "rof": 1,
        "ammo": 1,
        "traits": "M. Range / Scared / Slow (2)"
      }
    ]
  },
  {
    "name": "Mr. Camera",
    "realname": "Harry Simms",
    "base": "40mm",
    "rep": 33,
    "funding": 100,
    "rank": ["Henchman"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family"],
    "img": "img/MrCamera.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 5
    },
    "traits": [
      "Criminal",
      "Escape Artist",
      "Hypnotic Radio Waves",
      "Hypnotic",
      "Lantern",
      "Stalker"
    ],
    "weapons": [
      {
        "name": "Mr. Camera's Shoot",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Mechanical / Reach (4) / CRT (Blind) / Limited Attack"
      }
    ]
  },
  {
    "name": "Condiment King",
    "realname": "Mitchell Mayo",
    "base": "40mm",
    "rep": 35,
    "funding": 200,
    "rank": ["Henchman"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family"],
    "img": "img/CondimentKing.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 5,
      "Endurance": 5
    },
    "traits": [
      "Anaphylactic Shock",
      "Criminal",
      "Gunman",
      "Underestimated"
    ],
    "weapons": [
      {
        "name": "Ketchup Gun",
        "damage": "🩸",
        "rof": 2,
        "ammo": 2,
        "traits": "Assault / Beam / S. Range / Slow (4)"
      },
      {
        "name": "Mustard Gun",
        "damage": "🩸",
        "rof": 2,
        "ammo": 2,
        "traits": "Assault / Beam / S. Range / Poison"
      }
    ]
  },
  {
    "name": "Arkham Assistant 1",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 34,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family"],
    "img": "img/ArkhamAssistant1.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "6+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 4
    },
    "traits": [
      "Arkham Asylum Dr.",
      "Drop It!",
      "Protect Me!",
      "Psychiatrist",
      "Required (Dr. Hugo Strange or Scarecrow (The Worst Nightmare))",
      "Subliminal Suggestion"
    ],
    "weapons": [
      {
        "name": "Facility Drugs",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Steal / Mechanical / Poison / Terror"
      },
      {
        "name": "Electro-Shock",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Mechanical / Devastating / Sharp / Blunt (2)"
      }
    ]
  },
  {
    "name": "Thug 5",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 23,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family"],
    "img": "img/Thug5.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Criminal",
      "Gunman"
    ],
    "weapons": [
      {
        "name": "Automatic Gun",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 2,
        "traits": "S. Range / Firearm / Light"
      },
      {
        "name": "Automatic Gun",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 2,
        "traits": "S. Range / Firearm / Light"
      }
    ]
  },
  {
    "name": "Thug 3",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 20,
    "funding": 350,
    "rank": ["Henchman"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family"],
    "img": "img/Thug3.png",
    "stats": {
      "Attack": 3,
      "Defense": 2,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Criminal"
    ],
    "weapons": [
      {
        "name": "Chainsaw",
        "damage": "🩸🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Mechanical / Sharp"
      }
    ]
  },
  {
    "name": "Crazy Quilt",
    "realname": "Paul Dekker",
    "base": "40mm",
    "rep": 44,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family"],
    "img": "img/CrazyQuilt.png",
    "stats": {
      "Attack": 2,
      "Defense": 3,
      "Strength": "6+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Criminal",
      "Lantern",
      "Quilt's Helmet"
    ],
    "weapons": [
      {
        "name": "Blinding Blast",
        "damage": "-",
        "rof": 1,
        "ammo": 1,
        "traits": "Beam / Expansive / CRT (Blind) / Enervating (2)"
      },
      {
        "name": "Lethal Blast",
        "damage": "🩸🩸",
        "rof": 2,
        "ammo": 2,
        "traits": "S. Range / Beam / Assault"
      }
    ]
  },
  {
    "name": "Sewer Swarm",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 0,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Unknown"],
    "img": "img/SewerSwarm.png",
    "stats": {
      "Attack": 1,
      "Defense": 2,
      "Strength": "6+",
      "Movement": 8,
      "Willpower": 3,
      "Endurance": 2
    },
    "traits": [
      "Amphibious",
      "Mindless Monster",
      "Poison Immunity",
      "Stealth",
      "Street Guy",
      "Swarm"
    ],
    "weapons": [
      {
        "name": "Poisoned Touch",
        "damage": "-",
        "rof": "-",
        "ammo": "-",
        "traits": "Poison"
      }
    ]
  },
  {
    "name": "Arkham Assistant 2",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 34,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family"],
    "img": "img/ArkhamAssistant2.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "6+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 4
    },
    "traits": [
      "Arkham Asylum Dr.",
      "Crucial Information",
      "Protect Me!",
      "Psychiatrist",
      "Required (Dr. Hugo Strange or Scarecrow (The Worst Nightmare))",
      "Subliminal Suggestion"
    ],
    "weapons": [
      {
        "name": "Facility Drugs",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Steal / Mechanical / Poison / Terror"
      },
      {
        "name": "Clinical Hook",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Reach (3) / Handy / Pull (3) / Mechanical / Slow (6)"
      }
    ]
  },
  {
    "name": "Thug 6",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 20,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family"],
    "img": "img/Thug6.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 5,
      "Endurance": 4
    },
    "traits": [
      "Bodyguard",
      "Criminal"
    ],
    "weapons": [
      {
        "name": "Bat",
        "damage": "★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Heavy"
      }
    ]
  },
  {
    "name": "Thug 4",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 18,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family"],
    "img": "img/Thug4.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 8,
      "Willpower": 4,
      "Endurance": 4
    },
    "traits": [
      "Criminal"
    ],
    "weapons": [
      {
        "name": "Axe",
        "damage": "🩸🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Heavy"
      }
    ]
  },
  {
    "name": "Eraser",
    "realname": "Leonard Fiasco",
    "base": "40mm",
    "rep": 45,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family"],
    "img": "img/Eraser.png",
    "stats": {
      "Attack": 2,
      "Defense": 2,
      "Strength": "6+",
      "Movement": 8,
      "Willpower": 6,
      "Endurance": 6
    },
    "traits": [
      "Criminal",
      "Don't Mind Me",
      "Escape Artist",
      "Evidence Tampering",
      "Only 20% of Taxes!"
    ],
    "weapons": [
      {
        "name": "Eraser's Attack",
        "damage": "🩸",
        "rof": "-",
        "ammo": "-",
        "traits": "Sharp / Steal"
      }
    ]
  },
  {
    "name": "Kite-Man",
    "realname": "Charles Brown",
    "base": "40mm",
    "rep": 34,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family"],
    "img": "img/KiteMan.png",
    "stats": {
      "Attack": 3,
      "Defense": 3,
      "Strength": "5+",
      "Movement": 6,
      "Willpower": 6,
      "Endurance": 4
    },
    "traits": [
      "Charismatic",
      "Charm",
      "Criminal",
      "Kite",
      "Pickpocket",
      "True Love (Poison Ivy)"
    ],
    "weapons": []
  },
  {
    "name": "Signalman",
    "realname": "Phillip Cobb",
    "base": "40mm",
    "rep": 44,
    "funding": 100,
    "rank": ["Henchman"],
    "faction": ["Unknown"],
    "rivals": ["GCPD", "Bat Family"],
    "img": "img/Signalman.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "3+",
      "Movement": 10,
      "Willpower": 6,
      "Endurance": 7
    },
    "traits": [
      "Criminal",
      "Electromagnetic Control Device",
      "Fully Equipped",
      "Goad",
      "Reinforced Gloves"
    ],
    "weapons": [
      {
        "name": "Knockout-Gas",
        "damage": "★★",
        "rof": 1,
        "ammo": 1,
        "traits": "Expansive / Mechanical / Gas / Blunt (3)"
      },
      {
        "name": "Miniature Flares",
        "damage": "🩸",
        "rof": 3,
        "ammo": 1,
        "traits": "S. Range / Mechanical / Fire"
      }
    ]
  },
{
  "name": "Calendar Man",
  "realname": "Julian Gregory Day",
  "base": "40mm",
  "rep": 36,
  "funding": 0,
  "rank": ["Henchman"],
  "faction": ["Unknown"],
  "rivals": ["Bat Family", "GCPD"],
  "img": "img/CalendarMan.png",
  "stats": {
    "Attack": 3,
    "Defense": 3,
    "Strength": "5+",
    "Movement": 10,
    "Willpower": 6,
    "Endurance": 6
  },
  "traits": [
    "Distract",
    "Scheming (1)",
    "Strategist",
    "Runaway",
    "Seasonal Criminal",
    "Trickster"
  ],
  "weapons": [
    {
      "name": "Taser",
      "damage": "★★",
      "rof": "-",
      "ammo": "-",
      "traits": "Mechanical / Reach (3) / Crt (Stunned)"
    }
  ]
}
];

window.models = models;
