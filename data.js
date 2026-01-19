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
  }
  // Другие фракции могут иметь стандартные правила (пустой объект или null)
};

// Экспортируем для использования в script.js
window.factionCrewRules = factionCrewRules;

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
    { name: "Heliport", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: ["James Gordon"], targetModels: ["James Gordon"], effects: ["Enhances Air Support (details in desc)."] },
    { name: "Sergeant Training", fundingCost: 50, repCost: 0, maxPerCrew: 2, conditions: ["James Gordon"], effects: ["Model gains the Order rule."], isUnaffectedByBroken: true }
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
    { name: "Neurotoxic Drugs", fundingCost: 500, repCost: 0, maxPerCrew: 1, conditions: ["Iceberg Lounge"], effects: ["+2 Movement and Dodge trait."] },
    { name: "Silencer", fundingCost: 400, repCost: 0, maxPerCrew: 1, conditions: ["Iceberg Lounge"], effects: ["One ranged weapon gains Silencer trait."] },
    { name: "Weird Ammo", fundingCost: 300, repCost: 0, maxPerCrew: 1, conditions: ["Iceberg Lounge"], effects: ["Ranged attacks gain Enervating 2 or Anti-tank."] },
    { name: "Mutation Serum", fundingCost: 500, repCost: 0, maxPerCrew: 1, conditions: ["Iceberg Lounge"], effects: ["Model gains Tough Skin and Desensitized trait."] },
    { name: "Fear Gas Dispenser", fundingCost: 600, repCost: 0, maxPerCrew: 1, conditions: ["Iceberg Lounge"], effects: ["Model gains the Inspire Fear trait."] },
    { name: "Titan Dose", fundingCost: 300, repCost: 0, maxPerCrew: 1, conditions: ["Iceberg Lounge"], effects: ["Model gains one Titan Dose."] },
    { name: "Prototype Freeze Ray", fundingCost: 500, repCost: 0, maxPerCrew: 1, conditions: ["Iceberg Lounge"], effects: ["Model gains the Ice Flash trait."] }
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
    { name: "Venom Laboratory", fundingCost: 100, repCost: 5, maxPerCrew: 1, conditions: ["Bane"], targetModels: ["Leader", "Sidekick"], effects: ["All models can use >1 Titan Dose; Venom Dose cost $50; model removed from play."] },
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
    { name: "Contract", fundingCost: 0, repCost: 0, maxPerCrew: 1, conditions: ["Slade Wilson"], targetModels: ["Slade Wilson"], effects: ["Gains rank Leader or Sidekick."], isUnaffectedByBroken: true }
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
    { name: "It's a Dud", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: ["Quell"], effects: ["Remove 1 Riddle marker at activation start."] },
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
    { name: "Ivy's Snow Coat", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Poison Ivy (1997)"], targetModels: ["Poison Ivy"], effects: ["Model gains the Cold Acclimation trait."] }
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
    { name: "Grapple-gun", fundingCost: 300, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Grapple-gun rule."] },
    { name: "Camo Vest", fundingCost: 300, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Stealth rule."] },
    { name: "Adaptive Planning", fundingCost: 150, repCost: 2, maxPerCrew: 2, conditions: [], effects: ["Model gains the Adaptable trait."] },
    { name: "Titanic Mutation", fundingCost: 150, repCost: 0, maxPerCrew: 2, conditions: [], effects: ["Model gains one Titan Dose."] },
    { name: "Sense Mutation", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: [], effects: ["Model gains the Night Vision rule."] },
    { name: "Extra Spores", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: ["Only Plants"], effects: ["+1 to Ammunition for one weapon."] },
    { name: "Spikes Mutation", fundingCost: 200, repCost: 0, maxPerCrew: 2, conditions: ["Only Plants"], effects: ["Model gains the Claws rule."] },
    { name: "Luminescent Mutation", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: ["Only Plants"], effects: ["Model gains the Lantern rule."] },
    { name: "Large Roots", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Only Plants"], effects: ["Models within action radius suffer Impaired Movement."] },
    { name: "Smash 'n Grab", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Dr. Harleen Quinzel"], effects: ["Close Combat attacks gain the Steal trait."] },
    { name: "Corrosive Blood", fundingCost: 50, repCost: 0, maxPerCrew: 3, conditions: ["Dr. Pamela Lilian Isley"], effects: ["On casualty, contact models take 🩸 if fail Endurance."] },
    { name: "Mutation Serum", fundingCost: 200, repCost: 3, maxPerCrew: 1, conditions: ["Dr. Pamela Lilian Isley"], effects: ["Model gains Tough Skin and Desensitized traits."] },
    { name: "Modified Pheromones", fundingCost: 150, repCost: 5, maxPerCrew: 1, conditions: ["Dr. Pamela Lilian Isley"], targetModels: ["Leader", "Sidekick", "Free Agent"], effects: ["Control Pheromones targets 2 enemies."] },
    { name: "Ancient Plants", fundingCost: 200, repCost: 40, maxPerCrew: 1, conditions: ["Dr. Pamela Lilian Isley"], effects: ["Invulnerability (1), Tough Skin, +1 skills (except Endurance), +3 Endurance, 6\" action radius."], isUnaffectedByBroken: true },
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
    { name: "Apparition", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Nightmares cannot buy"], effects: ["Model gains the Apparition trait."] },
    { name: "Handcuffs", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: ["Nightmares cannot buy"], effects: ["Model gains the Arrest trait."] },
    { name: "Neurotoxic Drugs", fundingCost: 300, repCost: 0, maxPerCrew: 1, conditions: ["Nightmares cannot buy"], effects: ["+2 Movement and Dodge traits."] },
    { name: "Fear Advantage", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Only Arkham Asylum Dr"], effects: ["Protect Me! on Nightmare without Effort."] },
    { name: "Intensive Treatment", fundingCost: 100, repCost: 0, maxPerCrew: 1, conditions: ["Only Arkham Asylum Dr"], effects: ["Model gains the Intensive Treatment (1) trait."] },
    { name: "Disposable Nightmare", fundingCost: 150, repCost: 0, maxPerCrew: 2, conditions: ["Only Nightmares"], effects: ["On removal, Discard a card from deck."] },
    { name: "Terror Invigoration", fundingCost: 200, repCost: 0, maxPerCrew: 2, conditions: ["Only Nightmares"], effects: ["+X dice to Attack/Defense (X = Defense Pile cards)."] },
    { name: "Terror Pile", fundingCost: 300, repCost: 0, maxPerCrew: 1, conditions: ["Only Nightmares"], effects: ["Model gains the Fear Dampening trait."] },
    { name: "Terrible Visage", fundingCost: 200, repCost: 0, maxPerCrew: 2, conditions: ["Only Nightmares"], effects: ["Model gains the Terrible Visage trait."] },
    { name: "Intense Fear", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Scarecrow"], effects: ["Model gains the Intense Fear trait."] },
    { name: "Working in Advance", fundingCost: 200, repCost: 0, maxPerCrew: 1, conditions: ["Dr. Fritawa"], effects: ["Model gains the Working in Advance trait."] }
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
    { name: "Modified Pheromone", fundingCost: 100, repCost: 0, maxPerCrew: 2, conditions: ["Poison Ivy"], effects: ["Enhances Control Pheromones (details in desc)."] },
    { name: "Father Teamwork", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: ["Deathstroke (Vanguard Team)"], targetModels: ["Ravager (Vanguard Team)"], effects: ["Teamwork (1) (Ravager (Vanguard Team))."] },
    { name: "Daughter Teamwork", fundingCost: 150, repCost: 0, maxPerCrew: 1, conditions: ["Ravager (Vanguard Team)"], targetModels: ["Deathstroke (Vanguard Team)"], effects: ["Teamwork (1) (Deathstroke (Vanguard Team))."] }
   ]

};

const models = [
  {
    "name": "Batman Bushi",
    "realname": "Bruce Wayne / 40mm",
    "base": "40mm",
    "rep": 105,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["GCPD"],
    "img": "https://veland55.github.io/btb/img/BatmanBushi.png",
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
  {
    "name": "The Drifter Robert Pattinson",
    "realname": "Bruce Wayne / 40mm",
    "base": "40mm",
    "rep": 112,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["GCPD"],
    "img": "https://veland55.github.io/btb/img/TheDrifterRobertPattinson.png",
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
    "realname": "Bruce Wayne / 40mm",
    "base": "40mm",
    "rep": 121,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["GCPD"],
    "img": "https://veland55.github.io/btb/img/BatmanYearOne.png",
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
    "realname": "Bruce Wayne / 40mm",
    "base": "40mm",
    "rep": 112,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["GCPD"],
    "img": "https://veland55.github.io/btb/img/BatmanRobertPattinson.png",
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
    "realname": "Bruce Wayne / 42x75mm",
    "base": "42x75mm",
    "rep": 112,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["GCPD"],
    "img": "https://veland55.github.io/btb/img/BatmanOnBikeRobertPattinson.png",
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
    "realname": "Bruce Wayne / 40mm",
    "base": "40mm",
    "rep": 105,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["GCPD"],
    "img": "https://veland55.github.io/btb/img/Batman1997.png",
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
    "realname": "Bruce Wayne / 40mm",
    "base": "40mm",
    "rep": 125,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["GCPD"],
    "img": "https://veland55.github.io/btb/img/BatmanMichaelKeaton.png",
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
    "realname": "Bruce Wayne / 40mm",
    "base": "40mm",
    "rep": 150,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["GCPD"],
    "img": "https://veland55.github.io/btb/img/BatmanRedRain.png",
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
    "realname": "Bruce Wayne / 30mm",
    "base": "30mm",
    "rep": 75,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["GCPD"],
    "img": "https://veland55.github.io/btb/img/BatmanAdamWest.png",
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
    "realname": "Harvey Dent / 30mm",
    "base": "30mm",
    "rep": 50,
    "funding": 0,
    "rank": ["Sidekick"],
    "faction": ["GCPD"],
    "img": "https://veland55.github.io/btb/img/TheWhiteKnight.png",
    "stats": {
      "attack": 3,
      "defense": 3,
      "strength": "4+",
      "movement": 8,
      "willpower": 6,
      "endurance": 7
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
    "realname": "Aaron Cash / 30mm",
    "base": "30mm",
    "rep": 58,
    "funding": 150,
    "rank": ["Sidekick"],
    "faction": ["GCPD"],
    "img": "https://veland55.github.io/btb/img/AaronCash.png",
    "stats": {
      "attack": 4,
      "defense": 3,
      "strength": "4+",
      "movement": 8,
      "willpower": 6,
      "endurance": 6
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
    "realname": "Oliver Queen / 40mm",
    "base": "40mm",
    "rep": 95,
    "funding": 300,
    "rank": ["Sidekick"],
    "faction": ["GCPD"],
    "img": "https://veland55.github.io/btb/img/GreenArrowRebirth.png",
    "stats": {
      "attack": 4,
      "defense": 4,
      "strength": "4+",
      "movement": 13,
      "willpower": 7,
      "endurance": 8
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
    "realname": "Bruce Wayne / 40mm",
    "base": "40mm",
    "rep": 92,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["GCPD"],
    "img": "https://veland55.github.io/btb/img/BatmanGaslight.png",
    "stats": {
      "attack": 4,
      "defense": 4,
      "strength": "3+",
      "movement": 10,
      "willpower": 8,
      "endurance": 8
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
    "name": "Batman Dark Knight Rises",
    "realname": "Bruce Wayne / 30mm",
    "base": "30mm",
    "rep": 120,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["GCPD"],
    "img": "https://veland55.github.io/btb/img/BatmanDarkKnightRises.png",
    "stats": {
      "attack": 4,
      "defense": 5,
      "strength": "3+",
      "movement": 12,
      "willpower": 8,
      "endurance": 8
    },
    "traits": [
      "Arrest",
      "Bat Cape",
      "Bat-Armor MK II",
      "Batclaw/Grapple Gun",
      "Combo (Unarmed)",
      "Detective",
      "Master of Stealth",
      "Reinforced Gloves",
      "Sneak Attack"
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
    "name": "Commissioner Gordon",
    "realname": "James W. Gordon / 40mm / 60mm",
    "base": "40mm / 60mm",
    "rep": 70,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["GCPD"],
    "img": "https://veland55.github.io/btb/img/CommissionerGordon.png",
    "stats": {
      "attack": 3,
      "defense": 3,
      "strength": "5+",
      "movement": 8,
      "willpower": 6,
      "endurance": 6
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
    "realname": "Dick Grayson / 30mm",
    "base": "30mm",
    "rep": 38,
    "funding": 100,
    "rank": ["Sidekick"],
    "faction": ["GCPD"],
    "img": "https://veland55.github.io/btb/img/RobinBurtWard.png",
    "stats": {
      "attack": 3,
      "defense": 4,
      "strength": "5+",
      "movement": 10,
      "willpower": 5,
      "endurance": 4
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
    "name": "Catwoman Dark Knight Rises",
    "realname": "Selina Kyle / 30mm",
    "base": "30mm",
    "rep": 64,
    "funding": 300,
    "rank": ["Free Agent"],
    "faction": ["GCPD", "Unknown"],
    "rivals": ["Bat Family"],
    "img": "https://veland55.github.io/btb/img/CatwomanDarkKnightRises.png",
    "stats": {
      "attack": 4,
      "defense": 5,
      "strength": "5+",
      "movement": 13,
      "willpower": 6,
      "endurance": 6
    },
    "traits": [
      "Acrobat",
      "Climbing Claws",
      "Night Vision",
      "Pickpocket",
      "Required (Batman Dark Knight Rises)",
      "Sneak Attack",
      "Undercover"
    ],
    "weapons": [
      {
        "name": "Automatic Gun",
        "damage": "🩸★",
        "rof": 3,
        "ammo": 2,
        "traits": "Short Range / Firearm / Light"
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
    "name": "Batman Dark Knight Rises Batpod",
    "realname": "Bruce Wayne / 42x75mm",
    "base": "42x75mm",
    "rep": 120,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["GCPD"],
    "img": "https://veland55.github.io/btb/img/BatmanDarkKnightRisesBatpod.png",
    "stats": {
      "attack": 3,
      "defense": 5,
      "strength": "3+",
      "movement": 12,
      "willpower": 8,
      "endurance": 8
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
    "realname": "Mackenzie Bock / 30mm",
    "base": "30mm",
    "rep": 40,
    "funding": 200,
    "rank": ["Sidekick"],
    "faction": ["GCPD"],
    "img": "https://veland55.github.io/btb/img/ChiefMackenzie.png",
    "stats": {
      "attack": 3,
      "defense": 3,
      "strength": "5+",
      "movement": 8,
      "willpower": 6,
      "endurance": 6
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
    "realname": "Dick Grayson / 40mm",
    "base": "40mm",
    "rep": 45,
    "funding": 0,
    "rank": ["Sidekick"],
    "faction": ["GCPD"],
    "img": "https://veland55.github.io/btb/img/Robin1997.png",
    "stats": {
      "attack": 3,
      "defense": 4,
      "strength": "4+",
      "movement": 12,
      "willpower": 6,
      "endurance": 5
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
    "img": "https://veland55.github.io/btb/img/BatmanMultiverse.png",
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
    "img": "https://veland55.github.io/btb/img/BatmanViking.png",
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
    "img": "https://veland55.github.io/btb/img/BatmanFrankMillerOnPowerArmor.png",
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
    "img": "https://veland55.github.io/btb/img/BatmanTheAnimatedSeries.png",
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
    "img": "https://veland55.github.io/btb/img/Batman.png",
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
      "The World's Greatest Det..."
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
    "faction": ["Bat Family", "Free Agent"],
    "img": "https://veland55.github.io/btb/img/RobinTeenTitans.png",
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
    "img": "https://veland55.github.io/btb/img/BatmanTheGothamCityKnight.png",
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
    "img": "https://veland55.github.io/btb/img/BatmanDeathMetal.png",
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
    "img": "https://veland55.github.io/btb/img/BatmanFrankMillerOnHorse.png",
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
    "img": "https://veland55.github.io/btb/img/BatmanBeyond.png",
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
    "img": "https://veland55.github.io/btb/img/BatmanClassic.png",
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
    "img": "https://veland55.github.io/btb/img/GreenArrowDKR.png",
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
    "img": "https://veland55.github.io/btb/img/BatmanFrankMiller.png",
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
    "img": "https://veland55.github.io/btb/img/Batwoman.png",
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
    "img": "https://veland55.github.io/btb/img/Catwoman.png",
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
    "img": "https://veland55.github.io/btb/img/RedHoodRebirth.png",
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
    "img": "https://veland55.github.io/btb/img/RobinClassic.png",
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
    "name": "Robin",
    "realname": "Jason Todd",
    "base": "30mm",
    "rep": 40,
    "funding": 0,
    "rank": ["Sidekick"],
    "faction": ["Bat Family", "GCPD"],
    "img": "https://veland55.github.io/btb/img/RobinJasonTodd.png",
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
    "img": "https://veland55.github.io/btb/img/WonderGirl.png",
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
    "img": "https://veland55.github.io/btb/img/MrWayneBeyond.png",
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
    "img": "https://veland55.github.io/btb/img/Clayface.png",
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
    "name": "Robin",
    "realname": "Carrie Kelley",
    "base": "30mm",
    "rep": 54,
    "funding": 100,
    "rank": ["Sidekick"],
    "faction": ["Bat Family", "GCPD"],
    "img": "https://veland55.github.io/btb/img/RobinCarrieKelley.png",
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
    "img": "https://veland55.github.io/btb/img/RedHoodTheOutlaw.png",
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
    "img": "https://veland55.github.io/btb/img/StarfireTeenTitans.png",
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
    "img": "https://veland55.github.io/btb/img/NightwingRebirth.png",
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
    "img": "https://veland55.github.io/btb/img/GreenArrowAnimated.png",
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
    "img": "https://veland55.github.io/btb/img/SonOfBatman3.png",
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
    "img": "https://veland55.github.io/btb/img/Ace.png",
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
    "img": "https://veland55.github.io/btb/img/AlfredPennyworth.png",
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
    "img": "https://veland55.github.io/btb/img/HuntressClassic.png",
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
    "img": "https://veland55.github.io/btb/img/Raven.png",
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
    "img": "https://veland55.github.io/btb/img/SonOfBatman2.png",
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
    "img": "https://veland55.github.io/btb/img/Clownhunter.png",
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
    "img": "https://veland55.github.io/btb/img/RedRobin.png",
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
    "img": "https://veland55.github.io/btb/img/SonOfBatman1.png",
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
    "img": "https://veland55.github.io/btb/img/AzraelGodsPunishment.png",
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
    "name": "Robin Tim Drake",
    "realname": "Tim Drake",
    "base": "40mm",
    "rep": 50,
    "funding": 200,
    "rank": ["Free Agent"],
    "faction": ["Bat Family", "GCPD"],
    "img": "https://veland55.github.io/btb/img/RobinTimDrake.png",
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
    "img": "https://veland55.github.io/btb/img/LuciusFox.png",
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
    "img": "https://veland55.github.io/btb/img/CatwomanAnimated.png",
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
    "img": "https://veland55.github.io/btb/img/BatgirlAnimated.png",
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
    "img": "https://veland55.github.io/btb/img/HarleyQuinnAnimated.png",
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
    "img": "https://veland55.github.io/btb/img/RobinBeyond.png",
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
    "img": "https://veland55.github.io/btb/img/RavagerVanguardTeam.png",
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
    "img": "https://veland55.github.io/btb/img/BlackCanaryAnimated.png",
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
    "img": "https://veland55.github.io/btb/img/ReneeMontoya.png",
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
    "img": "https://veland55.github.io/btb/img/HomicideDetective.png",
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
    "img": "https://veland55.github.io/btb/img/GCPDMountedCop.png",
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
    "img": "https://veland55.github.io/btb/img/SWATQRT3.png",
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
    "img": "https://veland55.github.io/btb/img/OfficerMartinez.png",
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
    "img": "https://veland55.github.io/btb/img/SWATQRT2.png",
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
    "img": "https://veland55.github.io/btb/img/ReinforcementCop.png",
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
    "img": "https://veland55.github.io/btb/img/GCPDOfficer1.png",
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
    "img": "https://veland55.github.io/btb/img/GildaDent.png",
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
    "img": "https://veland55.github.io/btb/img/SWATQRT1.png",
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
    "img": "https://veland55.github.io/btb/img/GCPDOfficer2.png",
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
    "img": "https://veland55.github.io/btb/img/BeatCop.png",
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
    "img": "https://veland55.github.io/btb/img/SgtHarveyBullock.png",
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
    "img": "https://veland55.github.io/btb/img/GCPDDetective.png",
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
    "img": "https://veland55.github.io/btb/img/Sierra.png",
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
    "img": "https://veland55.github.io/btb/img/GCPDCop1.png",
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
    "img": "https://veland55.github.io/btb/img/LtGordonYearOne.png",
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
    "img": "https://veland55.github.io/btb/img/GCPDCop2.png",
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
    "img": "https://veland55.github.io/btb/img/LtGordonJeffreyWright.png",
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
    "img": "https://veland55.github.io/btb/img/Agent1.png",
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
    "img": "https://veland55.github.io/btb/img/OfficerMerkel.png",
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
    "img": "https://veland55.github.io/btb/img/Agent2.png",
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
    "img": "https://veland55.github.io/btb/img/Agent3.png",
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
    "img": "https://veland55.github.io/btb/img/DetectiveFlassYearOne.png",
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
    "img": "https://veland55.github.io/btb/img/Lerida.png",
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
    "img": "https://veland55.github.io/btb/img/Foxtrot.png",
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
    "img": "https://veland55.github.io/btb/img/AttorneyHarveyDent.png",
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
    "img": "https://veland55.github.io/btb/img/Bouncer1.png",
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
    "img": "https://veland55.github.io/btb/img/Bouncer2.png",
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
    "img": "https://veland55.github.io/btb/img/Bouncer3.png",
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
    "img": "https://veland55.github.io/btb/img/BlackMaskThug6.png",
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
    "img": "https://veland55.github.io/btb/img/TheTwin1.png",
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
    "img": "https://veland55.github.io/btb/img/TheTwin2.png",
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
    "img": "https://veland55.github.io/btb/img/KillerCrocThug.png",
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
    "img": "https://veland55.github.io/btb/img/DetectiveKenzie.png",
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
    "img": "https://veland55.github.io/btb/img/TheFixer.png",
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
    "img": "https://veland55.github.io/btb/img/BlackMaskThug7.png",
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
    "img": "https://veland55.github.io/btb/img/MafiaThug.png",
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
    "name": "Black Mask Thug 2",
    "realname": "Vassili Danilov",
    "base": "30mm",
    "rep": 21,
    "funding": 300,
    "rank": ["Henchman"],
    "faction": ["Organized Crime"],
    "img": "https://veland55.github.io/btb/img/BlackMaskThug2.png",
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
    "img": "https://veland55.github.io/btb/img/TheTailor.png",
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
    "img": "https://veland55.github.io/btb/img/BlackMaskThug1.png",
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
    "img": "https://veland55.github.io/btb/img/Malatesta.png",
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
    "img": "https://veland55.github.io/btb/img/TroySins.png",
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
    "img": "https://veland55.github.io/btb/img/BlackMaskThug5.png",
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
    "img": "https://veland55.github.io/btb/img/BlackMaskThug3.png",
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
    "img": "https://veland55.github.io/btb/img/TheBull.png",
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
    "img": "https://veland55.github.io/btb/img/Showtime.png",
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
    "img": "https://veland55.github.io/btb/img/Vipera.png",
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
    "img": "https://veland55.github.io/btb/img/BlackMask.png",
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
    "img": "https://veland55.github.io/btb/img/LexLuthor.png",
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
    "img": "https://veland55.github.io/btb/img/AlexandraKosov.png",
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
    "img": "https://veland55.github.io/btb/img/SalMaroni.png",
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
    "img": "https://veland55.github.io/btb/img/FatJohnny.png",
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
    "img": "https://veland55.github.io/btb/img/Battista.png",
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
    "img": "https://veland55.github.io/btb/img/TheRoman.png",
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
    "img": "https://veland55.github.io/btb/img/TheVentriloquist.png",
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
    "img": "https://veland55.github.io/btb/img/TheHolidayKiller.png",
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
    "img": "https://veland55.github.io/btb/img/CarmineFalconeTurturro.png",
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
    "img": "https://veland55.github.io/btb/img/Fright.png",
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
    "img": "https://veland55.github.io/btb/img/ThePenguinFarrell.png",
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
    "img": "https://veland55.github.io/btb/img/BeastBoyBeast.png",
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
    "img": "https://veland55.github.io/btb/img/BeastBoyBeast.png",
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
    "img": "https://veland55.github.io/btb/img/BeastBoyBeast.png",
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
    "img": "https://veland55.github.io/btb/img/BeastBoy_Human.png",
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
    "img": "https://veland55.github.io/btb/img/The_Chief.png",
    "stats": {
      "Attack": 3,
      "Defense": 4,
      "Strength": 4,
      "Movement": 6,
      "Willpower": 8,
      "Endurance": 6
    },
    "traits": [
      "Genius.",
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
    "img": "https://veland55.github.io/btb/img/ElastiGirl.png",
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
    "img": "https://veland55.github.io/btb/img/Crazy_Jane.png",
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
    "img": "https://veland55.github.io/btb/img/Negative_Man.png",
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
    "img": "https://veland55.github.io/btb/img/Robotman.png",
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
    "img": "https://veland55.github.io/btb/img/BaneUnleashed.png",
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
    "img": "https://veland55.github.io/btb/img/BatmanSword.png",
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
    "img": "https://veland55.github.io/btb/img/BaneTitan.png",
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
    "img": "https://veland55.github.io/btb/img/MedicOP.png",
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
    "img": "https://veland55.github.io/btb/img/BirdClassic.png",
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
    "img": "https://veland55.github.io/btb/img/Bird.png",
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
    "img": "https://veland55.github.io/btb/img/BaneRebirth.png",
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
    "img": "https://veland55.github.io/btb/img/Vengeance.png",
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
    "img": "https://veland55.github.io/btb/img/BaneTheBat.png",
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
    "img": "https://veland55.github.io/btb/img/DreadnoughtOP.png",
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
    "img": "https://veland55.github.io/btb/img/EliteOP.png",
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
    "img": "https://veland55.github.io/btb/img/BaneCommander.png",
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
    "img": "https://veland55.github.io/btb/img/LieutenantOP.png",
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
    "img": "https://veland55.github.io/btb/img/Cuchillo.png",
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
    "img": "https://veland55.github.io/btb/img/StealthOP.png",
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
    "img": "https://veland55.github.io/btb/img/InfiltrateOP.png",
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
    "img": "https://veland55.github.io/btb/img/Macgregor.png",
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
    "img": "https://veland55.github.io/btb/img/Clover.png",
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
    "img": "https://veland55.github.io/btb/img/SharpShooter.png",
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
    "img": "https://veland55.github.io/btb/img/Malicia.png",
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
    "img": "https://veland55.github.io/btb/img/TheBuilder.png",
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
    "img": "https://veland55.github.io/btb/img/Smash.png",
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
        "rof": 3,
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
    "img": "https://veland55.github.io/btb/img/TedHunter.png",
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
    "img": "https://veland55.github.io/btb/img/Schoolboy.png",
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
    "img": "https://veland55.github.io/btb/img/SupportOP.png",
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
    "img": "https://veland55.github.io/btb/img/RedBastard.png",
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
    "img": "https://veland55.github.io/btb/img/Grumpy.png",
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
    "img": "https://veland55.github.io/btb/img/Happy.png",
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
    "img": "https://veland55.github.io/btb/img/GaggyRebirth.png",
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
    "img": "https://veland55.github.io/btb/img/JokersBiker2.png",
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
    "img": "https://veland55.github.io/btb/img/JokersBusDriver.png",
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
    "img": "https://veland55.github.io/btb/img/JokersParaMilitary2.png",
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
    "img": "https://veland55.github.io/btb/img/JokersParaMilitary3.png",
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
    "img": "https://veland55.github.io/btb/img/JokersParaMilitary1.png",
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
    "img": "https://veland55.github.io/btb/img/Chuckcles.png",
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
    "img": "https://veland55.github.io/btb/img/BlunderbussClown.png",
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
    "img": "https://veland55.github.io/btb/img/JokersVictim1.png",
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
    "img": "https://veland55.github.io/btb/img/JokersVictim2.png",
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
    "img": "https://veland55.github.io/btb/img/StreetJester2.png",
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
    "img": "https://veland55.github.io/btb/img/StreetJester3.png",
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
    "img": "https://veland55.github.io/btb/img/AxeClown.png",
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
    "img": "https://veland55.github.io/btb/img/BarrelClown.png",
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
    "img": "https://veland55.github.io/btb/img/StreetJester4.png",
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
    "img": "https://veland55.github.io/btb/img/ChainsawClown.png",
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
    "img": "https://veland55.github.io/btb/img/StreetJester1.png",
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
    "img": "https://veland55.github.io/btb/img/Thorgon.png",
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
    "img": "https://veland55.github.io/btb/img/JokersVictim3.png",
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
    "img": "https://veland55.github.io/btb/img/Dynamite.png",
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
    "img": "https://veland55.github.io/btb/img/GasPuppet3.png",
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
    "img": "https://veland55.github.io/btb/img/GasPuppet1.png",
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
    "img": "https://veland55.github.io/btb/img/JokersBiker1.png",
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
    "img": "https://veland55.github.io/btb/img/Bouffon.png",
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
    "img": "https://veland55.github.io/btb/img/WhiteFace.png",
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
    "img": "https://veland55.github.io/btb/img/GasPuppet2.png",
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
    "img": "https://veland55.github.io/btb/img/Rastaclow.png",
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
    "img": "https://veland55.github.io/btb/img/BorgonTheCursed.png",
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
    "img": "https://veland55.github.io/btb/img/HoboClown.png",
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
    "img": "https://veland55.github.io/btb/img/AceOfSpades.png",
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
    "img": "https://veland55.github.io/btb/img/SlingyClown.png",
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
    "img": "https://veland55.github.io/btb/img/JokerArkhamAsylum.png",
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
    "img": "https://veland55.github.io/btb/img/JokerDarkKnightRises.png",
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
    "img": "https://veland55.github.io/btb/img/JokerRedHood.png",
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
    "img": "https://veland55.github.io/btb/img/JokerClassic.png",
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
    "img": "https://veland55.github.io/btb/img/JokerCesarRomero.png",
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
    "img": "https://veland55.github.io/btb/img/JokerTheCriminal.png",
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
    "img": "https://veland55.github.io/btb/img/JokerTheClown.png",
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
    "img": "https://veland55.github.io/btb/img/JokerTheComedian.png",
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
    "img": "https://veland55.github.io/btb/img/JokerTitan.png",
    "stats": {
      "Attack": 4,
      "Defense": 3,
      "Strength": "2+",
      "Movement": 10,
      "Willpower": 8,
      "Endurance": 10
    },
    "traits": ["Bloodlust", "Juggernaut", "Kaos Agent", "Like Flies To Me", "Luck", "Lunatic Laugh", "Mindless Monster", "Really Huget", "Sturdy", "Super Jump", "The One And Only Joker"],
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
    "img": "https://veland55.github.io/btb/img/JokerChristmas.png",
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
    "img": "https://veland55.github.io/btb/img/JokerHavingFun.png",
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
    "img": "https://veland55.github.io/btb/img/JokerExplosiveArrival.png",
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
    "img": "https://veland55.github.io/btb/img/JokerBatArmor.png",
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
    "img": "https://veland55.github.io/btb/img/Gaggy.png",
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
    "img": "https://veland55.github.io/btb/img/Archie.png",
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
    "img": "https://veland55.github.io/btb/img/HarleyQuinnBTG.png",
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
    "img": "https://veland55.github.io/btb/img/Punchline.png",
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
    "img": "https://veland55.github.io/btb/img/HarleyQuinnArkhamAsylum.png",
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
    "img": "https://veland55.github.io/btb/img/HarleyQuinnAndTheBoys.png",
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
    "img": "https://veland55.github.io/btb/img/TwoFaceDarkKnight.png",
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
    "img": "https://veland55.github.io/btb/img/RiddlerFrankGorshin.png",
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
    "img": "https://veland55.github.io/btb/img/PenguinBurgessMeredith.png",
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
    "img": "https://veland55.github.io/btb/img/MrFreeze1997.png",
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
    "img": "https://veland55.github.io/btb/img/FreezeThug1.png",
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
    "img": "https://veland55.github.io/btb/img/FreezeThug2.png",
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
    "img": "https://veland55.github.io/btb/img/FreezeEngineer.png",
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
    "img": "https://veland55.github.io/btb/img/FreezeThug5.png",
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
    "img": "https://veland55.github.io/btb/img/CombatPolarBear.png",
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
    "img": "https://veland55.github.io/btb/img/FreezeThug4.png",
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
    "img": "https://veland55.github.io/btb/img/FreezeThug3.png",
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
    "img": "https://veland55.github.io/btb/img/MrFreezeCryoArmor.png",
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
    "img": "https://veland55.github.io/btb/img/MrsFreeze.png",
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
    "img": "https://veland55.github.io/btb/img/RangedPolarBear.png",
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
	"img": "https://veland55.github.io/btb/img/KillerFrost_Rebirth.png",
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
    "img": "https://veland55.github.io/btb/img/Quiz5.png",
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
    "img": "https://veland55.github.io/btb/img/Quiz7.png",
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
    "img": "https://veland55.github.io/btb/img/Echo.png",
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
    "img": "https://veland55.github.io/btb/img/Quiz8.png",
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
    "name": "The Riddler",
    "realname": "Paul Dano Edward Nigma",
    "base": "40mm",
    "rep": 64,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["The Riddler"],
    "img": "https://veland55.github.io/btb/img/TheRiddlerPaulDano.png",
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
    "img": "https://veland55.github.io/btb/img/TheRiddler.png",
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
    "img": "https://veland55.github.io/btb/img/RiddlerFollower1.png",
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
    "img": "https://veland55.github.io/btb/img/Quiz4.png",
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
    "img": "https://veland55.github.io/btb/img/Query.png",
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
    "img": "https://veland55.github.io/btb/img/Quiz2.png",
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
    "img": "https://veland55.github.io/btb/img/TheRiddlerModernAge.png",
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
    "img": "https://veland55.github.io/btb/img/Quiz6.png",
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
    "img": "https://veland55.github.io/btb/img/RiddlerFollower2.png",
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
    "name": "Two-Face",
    "realname": "Tommy Lee Jones Harvey Dent",
    "base": "40mm",
    "rep": 80,
    "funding": 300,
    "rank": ["Free Agent"],
    "faction": ["The Riddler"],
    "img": "https://veland55.github.io/btb/img/TwoFaceTommyLeeJones.png",
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
    "img": "https://veland55.github.io/btb/img/Quiz3.png",
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
    "name": "The Riddler",
    "realname": "Jim Carrey Edward Nigma",
    "base": "40mm",
    "rep": 60,
    "funding": 0,
    "rank": ["Leader"],
    "faction": ["The Riddler"],
    "img": "https://veland55.github.io/btb/img/TheRiddlerJimCarrey.png",
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
    "img": "https://veland55.github.io/btb/img/Quelle.png",
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
    "img": "https://veland55.github.io/btb/img/Quiz1.png",
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
    "img": "https://veland55.github.io/btb/img/RiddlerFollower3.png",
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
    "img": "https://veland55.github.io/btb/img/CatwomanMichellePfeiffer.png",
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
      "Required (Batman Micha...)",
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
    "img": "https://veland55.github.io/btb/img/PenguinThug1.png",
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
    "img": "https://veland55.github.io/btb/img/ThePenguinDannyDeVito.png",
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
    "img": "https://veland55.github.io/btb/img/ThePenguinNew52.png",
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
    "img": "https://veland55.github.io/btb/img/Lark.png",
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
    "img": "https://veland55.github.io/btb/img/ThePenguinArkhamCity.png",
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
    "img": "https://veland55.github.io/btb/img/RocketLauncherPenguin.png",
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
    "img": "https://veland55.github.io/btb/img/StreetDemonzBiker1.png",
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
    "img": "https://veland55.github.io/btb/img/LooseLips.png",
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
    "img": "https://veland55.github.io/btb/img/EmperorPenguinUnchained.png",
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
    "img": "https://veland55.github.io/btb/img/PenguinEliteThug.png",
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
    "img": "https://veland55.github.io/btb/img/MinigunPenguin.png",
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
    "img": "https://veland55.github.io/btb/img/ExplosivePenguin.png",
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
    "img": "https://veland55.github.io/btb/img/PenguinLieutenant.png",
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
    "img": "https://veland55.github.io/btb/img/MrToxic.png",
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
    "img": "https://veland55.github.io/btb/img/PenguinThug2.png",
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
    "img": "https://veland55.github.io/btb/img/ThePenguinPenguinsDuck.png",
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
    "img": "https://veland55.github.io/btb/img/ThePenguinArkhamKnight.png",
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
    "img": "https://veland55.github.io/btb/img/StreetDemonz4.png",
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
    "img": "https://veland55.github.io/btb/img/MrCombustible.png",
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
    "img": "https://veland55.github.io/btb/img/Hypnotic.png",
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
    "img": "https://veland55.github.io/btb/img/StreetDemonz1.png",
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
    "img": "https://veland55.github.io/btb/img/StreetDemonzBiker2.png",
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
    "img": "https://veland55.github.io/btb/img/StreetDemonzBiker3.png",
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
    "img": "https://veland55.github.io/btb/img/StreetDemonz3.png",
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
    "img": "https://veland55.github.io/btb/img/StreetDemonz2.png",
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
    "img": "https://veland55.github.io/btb/img/ImperceptibleMan.png",
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
    "img": "https://veland55.github.io/btb/img/LeagueAcolyte1.png",
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
    "img": "https://veland55.github.io/btb/img/Mercenary1.png",
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
    "img": "https://veland55.github.io/btb/img/Mercenary2.png",
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
    "img": "https://veland55.github.io/btb/img/LeagueAcolyte2.png",
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
    "img": "https://veland55.github.io/btb/img/Ubu.png",
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
    "img": "https://veland55.github.io/btb/img/Hassassin4.png",
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
    "name": "Miranda Tate",
    "realname": "Talia al Ghul",
    "base": "30mm",
    "rep": 53,
    "funding": 0,
    "rank": ["Sidekick"],
    "faction": ["League of Shadows"],
    "img": "https://veland55.github.io/btb/img/MirandaTate.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "4+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 6
    },
    "traits": [
      "Charm",
      "Millionaire",
      "True Love (Bane)",
      "Disguised Sneak Attack",
      "Scheming (3)",
      "Undercover"
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
    "name": "Goliath",
    "realname": "Goliath",
    "base": "60mm",
    "rep": 60,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Bat Family", "GCPD", "League of Shadows"],
    "img": "https://veland55.github.io/btb/img/Goliath.png",
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
    "img": "https://veland55.github.io/btb/img/Hassassin1.png",
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
    "img": "https://veland55.github.io/btb/img/TaliaRebirth.png",
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
    "img": "https://veland55.github.io/btb/img/TheHeretic.png",
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
    "img": "https://veland55.github.io/btb/img/LeagueAcolyte3.png",
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
    "img": "https://veland55.github.io/btb/img/LeagueAcolyte4.png",
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
    "img": "https://veland55.github.io/btb/img/Hassassin3.png",
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
    "img": "https://veland55.github.io/btb/img/Cheshire.png",
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
    "img": "https://veland55.github.io/btb/img/Hassassin2.png",
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
    "img": "https://veland55.github.io/btb/img/BaneDKR.png",
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
    "img": "https://veland55.github.io/btb/img/RasAlGhul.png",
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
    "img": "https://veland55.github.io/btb/img/Barsad.png",
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
    "img": "https://veland55.github.io/btb/img/Gangster1.png",
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
    "img": "https://veland55.github.io/btb/img/Gangster3.png",
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
    "img": "https://veland55.github.io/btb/img/Sugar.png",
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
    "img": "https://veland55.github.io/btb/img/TwoFaceTommyLeeJones.png",
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
    "img": "https://veland55.github.io/btb/img/Gangster5.png",
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
    "img": "https://veland55.github.io/btb/img/TwoFace.png",
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
    "img": "https://veland55.github.io/btb/img/Spice.png",
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
    "img": "https://veland55.github.io/btb/img/TheHitman.png",
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
    "img": "https://veland55.github.io/btb/img/Gangster7.png",
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
    "img": "https://veland55.github.io/btb/img/Gangster6.png",
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
    "img": "https://veland55.github.io/btb/img/Gangster2.png",
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
    "img": "https://veland55.github.io/btb/img/Gangster4.png",
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
    "img": "https://veland55.github.io/btb/img/TwoFaceArkhamCity.png",
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
    "img": "https://veland55.github.io/btb/img/KillerCrocThug.png",
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
    "img": "https://veland55.github.io/btb/img/BigJohn.png",
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
  "img": "https://veland55.github.io/btb/img/PoisonIvy_1997.png",
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
  "img": "https://veland55.github.io/btb/img/HarleyQuinn_RollerDerby.png",
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
  "name": "Poison Ivy",
  "realname": "Dr. Pamela Lillian Isley",
  "base": "40mm / 60mm",
  "rep": 93,
  "funding": 0,
  "rank": ["Sidekick", "Leader"],
  "faction": ["Birds of Prey"],
  "img": "https://veland55.github.io/btb/img/PoisonIvy.png",
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
  "img": "https://veland55.github.io/btb/img/BlackCanary_Rebirth.png",
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
  "img": "https://veland55.github.io/btb/img/HarleyQuinn.png",
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
  "faction": ["GCPD", ["Suicide Squad"], "Birds of Prey"],
  "img": "https://veland55.github.io/btb/img/Katana_Rebirth.png",
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
  "img": "https://veland55.github.io/btb/img/BlackCanary.png",
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
  "rep": 88,
  "funding": 0,
  "rank": ["Sidekick"],
  "faction": ["League of Shadows", "Birds of Prey"],
  "img": "https://veland55.github.io/btb/img/LadyShiva.png",
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
  "img": "https://veland55.github.io/btb/img/Oracle.png",
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
  "img": "https://veland55.github.io/btb/img/FloronicMan.png",
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
  "faction": [["Suicide Squad"], "Birds of Prey"],
  "img": "https://veland55.github.io/btb/img/KillerFrost_Rebirth.png",
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
  "img": "https://veland55.github.io/btb/img/RabidPlant1.png",
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
  "img": "https://veland55.github.io/btb/img/RollerDerbyThug4.png",
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
  "name": "Roller Derby Thug 2",
  "realname": "Unknown",
  "base": "30mm",
  "rep": 26,
  "funding": 150,
  "rank": ["Henchman"],
  "faction": ["Birds of Prey"],
  "rivals": "GCPD",
  "img": "https://veland55.github.io/btb/img/RollerDerbyThug2.png",
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
  "img": "https://veland55.github.io/btb/img/RabidPlant2.png",
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
  "img": "https://veland55.github.io/btb/img/Huntress.png",
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
  "img": "https://veland55.github.io/btb/img/RollerDerbyThug3.png",
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
    "img": "https://veland55.github.io/btb/img/Hawk.png",
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
    "img": "https://veland55.github.io/btb/img/Dove.png",
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
    "img": "https://veland55.github.io/btb/img/BruceTheHyena.png",
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
    "img": "https://veland55.github.io/btb/img/MutatedPlant2.png",
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
    "img": "https://veland55.github.io/btb/img/CassandraCain.png",
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
    "img": "https://veland55.github.io/btb/img/BatgirlRebirth.png",
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
    "name": "Mutated Plant 1",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 17,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Birds of Prey"],
    "rivals": "",
    "img": "https://veland55.github.io/btb/img/MutatedPlant1.png",
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
    "img": "https://veland55.github.io/btb/img/FrankThePlant.png",
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
    "img": "https://veland55.github.io/btb/img/DetectiveMontoya.png",
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
    "img": "https://veland55.github.io/btb/img/BatgirlClassic.png",
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
    "img": "https://veland55.github.io/btb/img/Strix.png",
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
    "img": "https://veland55.github.io/btb/img/MutatedPlant3.png",
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
  "img": "https://veland55.github.io/btb/img/ScarecrowTheWorstNightmare.png",
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
  "img": "https://veland55.github.io/btb/img/DrFriitawa.png",
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
  "img": "https://veland55.github.io/btb/img/NightmareOfFear.png",
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
  "img": "https://veland55.github.io/btb/img/NightmareOfDemotivation.png",
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
  "img": "https://veland55.github.io/btb/img/NightmareOfAnger.png",
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
  "img": "https://veland55.github.io/btb/img/NightmareOfInsignificance.png",
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
  "img": "https://veland55.github.io/btb/img/FearbeastNightmare.png",
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
  "img": "https://veland55.github.io/btb/img/LittleNightmare.png",
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
    "img": "https://veland55.github.io/btb/img/TheCourt.png",
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
    "img": "https://veland55.github.io/btb/img/1890sTalon.png",
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
    "faction": [["Suicide Squad"], "Court of Owls"],
    "img": "https://veland55.github.io/btb/img/TheTalon.png",
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
    "img": "https://veland55.github.io/btb/img/GothamButcher.png",
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
    "img": "https://veland55.github.io/btb/img/LincolnMarch.png",
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
    "img": "https://veland55.github.io/btb/img/OMalleysGrandfather.png",
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
    "img": "https://veland55.github.io/btb/img/Talon.png",
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
    "img": "https://veland55.github.io/btb/img/OMalleysFather.png",
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
    "img": "https://veland55.github.io/btb/img/Dementor.png",
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
    "img": "https://veland55.github.io/btb/img/Raptor.png",
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
    "img": "https://veland55.github.io/btb/img/1880sTalon.png",
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
    "img": "https://veland55.github.io/btb/img/RobinDamian.png",
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
    "name": "O'Malley's Son",
    "realname": "Nathaniel O'Malley",
    "base": "30mm",
    "rep": 30,
    "funding": 0,
    "rank": ["Henchman"],
    "faction": ["Court of Owls"],
    "img": "https://veland55.github.io/btb/img/OMalleysSon.png",
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
    "img": "https://veland55.github.io/btb/img/EphraimNewhouse.png",
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
    "img": "https://veland55.github.io/btb/img/KingOfSpades.png",
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
    "img": "https://veland55.github.io/btb/img/10OfSpades.png",
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
    "rank": ["SFree Agent"],
    "faction": ["Royal Flush"],
    "img": "https://veland55.github.io/btb/img/JackOfSpades.png",
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
    "img": "https://veland55.github.io/btb/img/AceOfSpades.png",
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
    "img": "https://veland55.github.io/btb/img/QueenOfSpades.png",
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
    "img": "https://veland55.github.io/btb/img/5OfSpades.png",
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
    "img": "https://veland55.github.io/btb/img/SlipknotSuicideSquad.png",
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
    "img": "https://veland55.github.io/btb/img/PolkaDotManTheSuicideSquad.png",
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
    "img": "https://veland55.github.io/btb/img/WeaselTheSuicideSquad.png",
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
    "img": "https://veland55.github.io/btb/img/KillerMoth.png",
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
    "img": "https://veland55.github.io/btb/img/JohnEconomos.png",
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
    "img": "https://veland55.github.io/btb/img/EmiliaHarcourt.png",
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
    "img": "https://veland55.github.io/btb/img/KillerCrocSuicideSquad.png",
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
    "img": "https://veland55.github.io/btb/img/PolkaDotMan.png",
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
    "img": "https://veland55.github.io/btb/img/ThinkerTheSuicideSquad.png",
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
    "img": "https://veland55.github.io/btb/img/DiabloSuicideSquad.png",
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
    "img": "https://veland55.github.io/btb/img/KatanaSuicideSquad.png",
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
    "img": "https://veland55.github.io/btb/img/SebastianTheRatTheSuicideSquad.png",
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
    "img": "https://veland55.github.io/btb/img/Eagly.png",
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
    "img": "https://veland55.github.io/btb/img/KingSharkTheSuicideSquad.png",
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
    "img": "https://veland55.github.io/btb/img/PoisonIvy.png",
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
    "img": "https://veland55.github.io/btb/img/KillerCrocArkhamAsylum.png",
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
    "img": "https://veland55.github.io/btb/img/TDKTheSuicideSquad.png",
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
    "img": "https://veland55.github.io/btb/img/DeathstrokeVanguardTeam.png",
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
    "img": "https://veland55.github.io/btb/img/TheRiddlerModernAge.png",
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
    "img": "https://veland55.github.io/btb/img/Ratcatcher2TheSuicideSquad.png",
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
    "img": "https://veland55.github.io/btb/img/CaptainBoomerangVanguardTeam.png",
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
    "img": "https://veland55.github.io/btb/img/RickFlagInfiltration.png",
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
    "img": "https://veland55.github.io/btb/img/TheRiddler.png",
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
    "img": "https://veland55.github.io/btb/img/Vigilante.png",
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
    "img": "https://veland55.github.io/btb/img/CaptainBoomerangSuicideSquad.png",
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
    "img": "https://veland55.github.io/btb/img/KGBeast.png",
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
    "img": "https://veland55.github.io/btb/img/Deadshot.png",
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
    "img": "https://veland55.github.io/btb/img/HarleyQuinnBombshell.png",
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
    "img": "https://veland55.github.io/btb/img/DeadshotSuicideSquad.png",
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
    "img": "https://veland55.github.io/btb/img/DeathstrokeTheTerminator.png",
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
    "img": "https://veland55.github.io/btb/img/AmandaWallerViolaDavis.png",
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
    "img": "https://veland55.github.io/btb/img/KillerCroc.png",
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
    "img": "https://veland55.github.io/btb/img/HarleyQuinnTheSuicideSquad.png",
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
    "img": "https://veland55.github.io/btb/img/PeacemakerJohnCena.png",
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
    "img": "https://veland55.github.io/btb/img/BloodsportTheSuicideSquad.png",
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
    "img": "https://veland55.github.io/btb/img/Ratface.png",
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
    "img": "https://veland55.github.io/btb/img/Kobra.png",
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
    "img": "https://veland55.github.io/btb/img/NagaHazardTrooper2.png",
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
    "img": "https://veland55.github.io/btb/img/TheNagas.png",
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
    "img": "https://veland55.github.io/btb/img/Jake.png",
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
    "img": "https://veland55.github.io/btb/img/Underworlder1.png",
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
    "img": "https://veland55.github.io/btb/img/KobraHybrid.png",
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
    "img": "https://veland55.github.io/btb/img/DeaconBlackfire.png",
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
    "img": "https://veland55.github.io/btb/img/UnderworlderVagon1.png",
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
    "img": "https://veland55.github.io/btb/img/Underworlder2.png",
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
    "img": "https://veland55.github.io/btb/img/CobraSwarm.png",
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
    "img": "https://veland55.github.io/btb/img/YoungWoman.png",
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
    "img": "https://veland55.github.io/btb/img/Lancehead1.png",
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
    "img": "https://veland55.github.io/btb/img/LadyEve.png",
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
    "img": "https://veland55.github.io/btb/img/Underworlder6.png",
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
    "img": "https://veland55.github.io/btb/img/Underworlder4.png",
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
    "img": "https://veland55.github.io/btb/img/BatmanTheCult.png",
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
    "img": "https://veland55.github.io/btb/img/KobraBestowed.png",
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
    "img": "https://veland55.github.io/btb/img/UnderworlderVagon2.png",
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
    "img": "https://veland55.github.io/btb/img/Underworlder5.png",
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
    "img": "https://veland55.github.io/btb/img/NagaHazardTrooper1.png",
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
    "img": "https://veland55.github.io/btb/img/LanceheadCaptain.png",
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
    "img": "https://veland55.github.io/btb/img/Lancehead2.png",
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
    "img": "https://veland55.github.io/btb/img/LanceheadSoldier.png",
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
    "img": "https://veland55.github.io/btb/img/DamianWhoLaughs.png",
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
    "img": "https://veland55.github.io/btb/img/TheCommissioner.png",
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
    "img": "https://veland55.github.io/btb/img/TheMerciless.png",
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
    "img": "https://veland55.github.io/btb/img/InfectedWhoLaughs.png",
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
    "img": "https://veland55.github.io/btb/img/TheGrimKnight.png",
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
    "img": "https://veland55.github.io/btb/img/TheBatmanWhoLaughs.png",
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
    "img": "https://veland55.github.io/btb/img/TheRedDeath.png",
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
    "img": "https://veland55.github.io/btb/img/TheDrowned.png",
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
    "img": "https://veland55.github.io/btb/img/RobinWhoLaughs.png",
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
    "img": "https://veland55.github.io/btb/img/SilkSpectreII.png",
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
    "img": "https://veland55.github.io/btb/img/TheComedian.png",
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
    "img": "https://veland55.github.io/btb/img/NiteOwl.png",
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
    "img": "https://veland55.github.io/btb/img/Rorschach.png",
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
    "img": "https://veland55.github.io/btb/img/Bubastis.png",
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
    "img": "https://veland55.github.io/btb/img/Ozymandias.png",
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
  "name": "Calendar Man",
  "realname": "Julian Gregory Day",
  "base": "40mm",
  "rep": 36,
  "funding": 0,
  "rank": ["Henchman"],
  "faction": ["Unknown"],
  "rivals": ["Bat Family", "GCPD"],
  "img": "https://veland55.github.io/btb/img/CalendarMan.png",
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

const traitDescriptions = {
   //A
    "Absolute Power": "If this model is your crew's Boss, you can hire models with Rank Henchman with the Cop trait, regardless of their Affiliation. In addition, this model's Inspire radius is increased by 4''.",
    "Accelerated Venom": "When this model spends a Venom dose, instead of receiving the normal effects, it may instead choose one of the following effects: • When this model performs a Movement action, you may place any model it came in contact with at any point 2\" away. • ★ damage this model deals this activation is converted to 🩸 damage.",
    "Acceleration": "When this weapon is used against a target that is not within 8\", the target cannot use the Dodge trait and the first die that would cause it to lose the Strength die, that die becomes a normal Attack die. Any further dice losses occur as normal.",
    "Acrobat": "This model does not suffer Impaired Movement for Jumping, or for Stand Up actions. This model may use the Dodging rule. Dodging: A model that benefits from this rule may make an Effort to reduce the attack dice from a Ranged Attack that targets this model.",
    "Adaptable": "At the beginning of the Raise the Plan phase, the player controlling this model must choose between the Attack (+1), Defense (+1) or Movement (+2) basic skills. The model receives the bonus to the chosen skill until the end of the round.",
    "Addict": "This model suffers -1 to its Attacks and Defense skills unless it uses a Dose. As soon as the model uses a Dose, the penalties cease to apply until the end of the round.",
    "AFK": "If this model is removed as a Casualty by a Cranial Bomb Activated card, it cannot return to the game with the use of the Intel Support trait.",
    "Affinity (X)": "This model may be recruited by any crew that also includes the model named in parentheses, even if they would not ordinarily be permitted to join that crew. This model may treat its rank as Free Agent for the purposes of forming the crew (but cannot use the Free Agent rank during the game). Recruiting this model does not allow a further use of the trait (if, for example, another character has an Affinity to this model).",
    "Agent of Chaos": "When friendly models within 4\" of this model activate, they may take an Audacity marker from a friendly model that is yet to activate.",
    "Agent of Order": "While this model has a friendly Suspect within 4\" it counts as a Thwart for the Containing the Threat card, but cannot be selected to be removed by it.",
    "Aggressive Preach": "When this model places a Suspect, the opponent shows the first card from their Objective deck and discards it. If the type is *PROTECTION* or *CONTROL* a target within 8\" suffers the Hypnotize Status. If the type is *VIOLENCE* or *MENACE* a target within 8\" suffers the Enervating (3) Status.",
    "Aggressive Schizophrenia (Mental Disorder)": "If this model is in contact with another model (friend or foe) at the beginning of its activation, it gains an extra Attack action, which must immediately be performed against one model in contact. Once this attack is resolved, this model may continue its turn normally.",
    "Agile": "This model can't suffer Falling Damage. However, if the result of the Fall is to remove the model from the game, it is still made a Casualty.",
    "Air Combat": "If this model uses the Batclaw trait or Falls during its activation, then for the remainder of the activation it gains a +1 bonus to its attack and Strength rolls, and triggers CRTs on a natural roll of 4+ when performing Melee Attacks.",
    "Air Support 🦇": "Place the Explosive template anywhere on the board. During this round, the area under the template is under the effect of Lights.",
    "A Lot Colder": "This model gains the following bonuses based on the amount of Ice Age cards not in your Ice Age pile: 1- Can choose to ignore the penalty for move before attacking, but instead suffer a -1 penalty to its Ranged attack dice rolls. 2- +2 Attack. 3- +1 Defense. 4- +2 Strength dice rolls. (Bonuses stay in effect as the number increases and will be removed as the number decreases.) When a model with this trait is recruited in your crew, you cannot include the Searching for Nora card in your Objective deck.",
    "Alpha": "This model's Attack and Defense cannot be reduced by any means.",
    "Always Illuminated": "This model is considered Illuminated.",
    "Always on the Move": "This model can interrupt its Movement action to perform an Attack action, and then continue with its Movement action. The model must have enough actions available to use this trait.",
    "Amazon": "This model receives a +1 bonus to its Attack and Defense rolls. In addition, enemy models roll 1 less attack die when targeting this model.",
    "Amazon Lineage": "If this model is your crew's Boss, you can only recruit models with the Amazon trait.",
    "Amazon Princess": "This model automatically gains the Charge trait. However, targets of this model's Charge incur a -1 penalty to their Defense rolls. While this Upgrade Character card is used, she cannot use the Bracelet of Submission trait or the Lasso of Hestia weapon, and does not benefit from the effects of her Magic Shield.",
    "Amazon's Wig": "This model may make an Effort to activate this trait, which will remain active until the start of this model's next activation. Enemy models roll 2 fewer Attack dice when attacking this model, but this model suffers Slow 4.",
    "Amphibious": "This model does not suffer Impaired Movement when moving through Difficult water ground elements (i.e. rivers, swamps, canals, ponds, etc.). Players should agree on what counts as water feature before the game begins. In addition, this Model can enter a Sewer without performing a Manipulate action.",
    "Anaphylactic Shock": "When this model deals any damage to enemy models, the targets suffer the Enervating (X) Status, where X is the number of Objective cards played from the opponent's hand this round (up to 3).",
    "Anger Management (Mental Disorder)": "During this model activation, it must make an Attack Action unless it makes an Effort.",
    "Animal": "When this model moves, it can ignore obstacles up to 2\" high, but cannot Climb or Jump. If this model suffers the Fire Status (before resolving during the Recount phase (which cannot be re-rolled). If this Willpower roll is failed, the model cannot move in the following round. This model cannot purchase equipment.",
    "Anxiety (Mental Disorder)": "This model gains +2\" to its basic move distance, but must perform a Movement action during its activation if the model can do it.",
    "A.R.G.U.S. Commander": "When a friendly model gains a Task counter within 4\" of this model, another friendly model within Inspire range gains a Task counter.",
    "Archie": "A model with the Archie trait is not deployed as usual—instead, during a friendly model's activation, you may place this model in contact with a Suspect and then remove that Suspect. Suspects are considered an activable model and inside the gaming area until they are removed as a Casualty. A model with Archie may receive an Audacity marker even if it is not in play.",
    "Arkham Asylum Doctor": "All friendly models with a Mental Disorder trait within 4” of this model gain 1 extra Tactical Action.",
    "Arkham Asylum DR": "When this model places a Suspect, target a model within 8'' and LoS, make an Opposed Willpower roll against it. If successful, the target is considered to have a Mental Disorder until the end of the round.",
    "Arrogant": "When this model performs an Attack against a model with a lower Reputation cost than its own, it rolls one less attack die.",
    "Arsenal": "After deployment, this model may equip up to one Hands equipment card, and one Back equipment card. These cards cannot be equipped in any other way, and cannot be cancelled by an opponen.",
    "Arrest 🦇": "When in contact with a KO enemy model (not a Vehicle), this model may immediately remove the KO model from the game as a Casualty.",
    "Artist 🦇": "Name an Objective card, draw a card from your Objective deck. If the card named is the one drawn, then you can keep it, if not discard it.",
    "A Real Change": "Once per round, during this model's activation you may look at the opponent's Objective hand, then the opponent may target one of their models and perform an immediate Manipulate action with that model.",
    "As Blind as a Bat": "When this model Sets a Suspect and you have a ? facedown card in play from a previous activation, you may reveal it and activate its Trap effect using this model as the point of origin/triggering model. Then discard that card.",
    "Assassin (X)": "If this model removes an enemy model as a Casualty, you may draw X Objective card from your Objective deck.",
    "Assistance": "While a friendly Robin (Boy Wonder) is in play, this model gains +1 Willpower. If a friendly Robin (Boy Wonder) is removed as a Casualty, this model gains +1 Strength until the end of the game.",
    "Atomica": "When this model attacks an enemy model (not a Vehicle), the enemy model must pass a Willpower roll before any attack dice are rolled. If it fails, it suffers -1 Defense until the end of the round.",
    "Attack Bonus": "A model with one or more ★ gains 1 extra attack die in its next Melee Attack action for each ★ it possesses. A model cannot have more than 3 ★ at any one time.",
    "Attack Penalty": "A model with one or more ★ deducts 1 attack die in its next Melee Attack action for each ★ it possesses. A model cannot have more than 3 ★ at any one time.",
    "Attorney's Allegation 🦇": "One Use Only. All friendly models with Rank Henchman within 8'' gain 1 extra Action.",
    "Autorepair (X)": "At the beginning of the Recount phase, this model rolls 1D6. On a result of (X)+ remove a Damage marker (any type) from this model.",
    "Aversion (X)": "This model cannot be included in the same crew as the specified model.",
    "Aware Of What He Did": "Search your Objective deck and add to your hand an Objective card with Type: GUN. Shuffle your deck.",
    "A Bit of Magic": "This model may assign Magic Counters to itself when performing Actions. If there is a Magical Conflux remove all the Magic Counters from this model, and this model takes just 1 Damage.",
    "A Challenge for You": "Every time your crew places a Suspect, you must place a Numeric Counter on it. You decide the number on the counter, unless a card or ability specifies the number. These Numeric Counters cannot be reduced below 0.",
    "Apparition 🦇": "Place this model in contact with the target friendly model that has the Nightmare trait, and then remove the target as a Casualty.",

     //B
    "Back To The Nightmare": "Once per round, when an Objective card is removed from the Terror pile, after the current action is resolved, this model may be removed from the gaming area and use the Shadowed Nightmare trait to enter again later.",
    "Backpack": "This model can perform a Reveal Manipulate action once per activation without spending an Action.",
    "BALLISTIC BAT-ARMOR": "Enemy models do not roll a Strength die when attacking this model. In addition, ranged attacks targeting this model roll 1 fewer die.",
    "Bank Robber": "This model may Reveal Suspects within 3\" instead of in contact.",
    "Barrage 🦇": "During this round, you can target any model with a Ranged Attack ignoring LoS and Cover, but then suffers a -1 Attack die and -1 to hit for that roll.",
    "Bat-Armor MK I": "Enemy models don't roll a Strength die when attacking this model.",
    "Bat-Armor MK II": "This model ignores enemy Strength dice unless the roll is a natural 6. In addition, this model gains +1\" to its basic move distance.",
    "Bat-Armor MK III": "Enemy models don't roll a Strength die when attacking this model. In addition, if this model has moved this activation, it can make Melee Attacks against enemies up to 2\" away in line of sight (ignore all traits that improve the model's line of sight, such as Total Vision, for the purpose of these attacks).",
    "Bat Cape": "This model does not take Damage, nor can it be removed as a Casualty, as a result of Falling.",
    "Bat Credit Card": "This model's crew gains an additional $350 Funding.",
    "Bat Family": "Keyword",
    "Bat-Lenses": "When this model or a friendly model with Alias: Batman (Robert Pattinson) reveals an enemy Suspect, you may look at your opponent's Objective hand.",
    "Bat-Signal 🦇": "One use only. This model can use this trait to place a friendly model (not KO or Knocked Down) with Alias: Batman in contact with itself. Until the end of that round, this model is considered Illuminated.",
    "Batcave Support 🦇": "Target a friendly model within 8\" and LoS without the Cop trait. That model gains X+1 ★ or X+1 🩸, where X is the number of friendly Suspects within 4\" of this model.",
    "Batclaw 🦇": "Once per round, this model gains +6\" to its basic move distance, and can move in any direction (including vertically). When using this ability, the model can move over obstacles and Difficult Ground without penalty. However, the model cannot use this rule in two consecutive activations.\n*Some models list this trait as 'Grapple Gun', and others as 'Batclaw'. The rules are the same in both instances - the distinction is just for fun!",
    "Batclaw/Grapple Gun 🦇": "Once per round, this model gains +6\" to its basic move distance, and can move in any direction (including vertically). When using this ability, the model can move over obstacles and Difficult Ground without penalty. However, the model cannot use this rule in two consecutive activations. *Some models list this trait as ‘Grapple Gun’, and others as ‘Batclaw’. The rules are the same in both instances – the distinction is just for fun!",
    "Bazinga 🦇": "When an enemy model within 8\" of this model fails 2 or more dice to hit or to block or fails a test, that model suffers Enervating 2.",
    "Berserker Fury 🦇": "This model gains +1 bonus to its Attack dice rolls and counts as two models for scoring Objective cards.",
    "Big Bang Theory": "When this model would become KO or removed as a Casualty, remove all damage from this model. The opponent then places this model completely within 4\" of its current position during the next Raise the plan phase you may assign 1 less Audacity per model that was either KO or removed as a Casualty. This model is still considered to have suffered the KO effect or become a Casualty for the purpose of traits and completing Objective cards.",
    "Big Guy": "When this model suffers damage, reduce the damage suffered by 2 (to a minimum of 1).",
    "Bionic Eye": "This model ignores the Night rule, and may spend a Special Action while making a Ranged Attack to gain a +1 to Hit.",
    "Bipolar (Mental Disorder)": "At the beginning of this model's activation, roll a die or flip a coin. If the result is even/heads, this model may make 1 Effort this round without taking a ★ marker. If the result is odd/tails, this model suffers the Enervating (1) Status.",
    "Biting": "Enemies within 6\" that wish to perform an Action must first suffer the Enervating (1) Status. If they already have Enervating, they must instead increase their Enervating value by 1.",
    "Black Bats Trail": "At the end of this model's Move Action or the use of the Super Speed trait, this model may take a free Black Bats Attack action.",
    "Blackfire Cultist": "When this model is removed as a Casualty, add 1 Faith to your pool.",
    "Blackfire Totem": "At the start of the game, place the Blackfire Totem marker within 4\" of a Sewer marker. When you gain Faith points, you may place it on this marker instead of into your pool (up to 5 Faith points at the same time). When a model within 8\" and LoS to this marker is going to throw dice for a Melee Attack, Defense roll or Willpower roll, you may add X dice to that roll (where X is the number of Faith you remove from this marker). Decide it before rolling, but after the Efforts are made.",
    "Blood Scent": "When targeting a model with at least 1 🩸 marker with an Attack, this model gains +1 to its attack dice rolls, +1 to the Strength roll, and gains the Bleed 1 effect.",
    "Bloodlust": "When this model causes a KO or Casualty, you may place 2 on top of the Psychopaths Objective card instead of 1.",
    "Bloodthirsty (Mental Disorder)": "During the Raise the Plan phase, if this model has at least 1 Damage marker of any kind, it gains +1 ★.",
    "Bloody Christmas 🦇": "Before removing an enemy model as a Casualty by this model's actions, place a new friendly Suspect (if able) in contact with that model. That Suspect is also a Blood Present marker.",
    "Blow Up the Moon": "If a friendly Leonard model uses the New Laser trait within 8\" of this model, you may immediately move this model up to 6\" in any direction.",
    "Bluff 🦇": "Choose an enemy model within 6\" and line of sight. The target reduces its Attacks skill by 1 until the end of the round. If multiple models with this trait target the same model, the effect is not cumulative.",
    "Bodyguard": "If a friendly model with the Crown marker within 4\" of this model and LoS suffers any number of hits from an Attack (of any kind), this model may make an Effort to take the hits instead, and all the Status of that attack. Only one Effort ★ is required per enemy Attack.",
    "Bodyguard Mission": "This model Security Chief trait also affect friendly models with Rank: Leader and/or Sidekick.",
    "Bonebreaker 🦇": "Until the end of the round, this model's unarmed attacks gain Bleed: 2.",
    "BOOM!": "Each time this model receives any damage, roll a D6 – on the natural score of a 6, this model explodes! Alternatively, during its activation, you may choose to make this model explode. When the model explodes, center an Explosive template on it. Roll a Strength 3+ die against each model affected. On a success, the model suffers 🩸🩸★ Damage. After resolving the explosion, remove this model as a Casualty.",
    "Boosted (X)": "While making an attack with this weapon, roll X additional attack dice.",
    "Boosted Jump": "One use only. During this model activation, place this model within 8\" of its start position.",
    "Boomerang's Arsenal": "When this model uses the Throwing Boomerang weapon, before rolling the dice you may choose 1 to apply to this attack: - Explosive Boomerang: Attack gains Explosive and Firearm. - Weighted Boomerang: This model Sets as a free action a Suspect in contact with the target when the action is resolved. - Bouncing Boomerang: Move this model 4\" when the action is resolved.",
    "Born in the Darkness": "When this model is not within the area effect of a Light source, it gains a +1 bonus to its Defense rolls, and enemy models cannot benefit from the Sneak Attack trait when targeting this model.",
    "Boss's Orders 🦇": "All friendly models with Rank Henchman that attack an enemy model within 8\" of this model gain +1 to their attack dice rolls in close combat until the end of the round.",
    "Bot": "This model cannot recover from KO or recover Stun damage in the Recount phase. However, attacks with the Firearm, Mechanical and Beam rule deduct 1 attack die when rolling against this model. In addition, this model cannot use Doses of any kind,and is immune to the Enervating, Hypnotize, Poison, Scared and Terror effects.",
    "Bot Bomb 🦇": "Choose one of your models with the Bot trait to explode. Center the Explosion template over the bot. Roll a Strength 4+ die against each model affected. On a success, the model suffers 🩸🩸 Damage. Once the trait is resolved, remove the Bot as a Casualty.",
    "Bot Mechanic 🦇": "Target a model with the Bot trait within 4\" and Line of Sight. Remove up to 3 Damage markers from that model.",
    "BOT": "This model cannot recover from KO or recover Stun damage in the Recount phase. However, attacks with the Firearm, Mechanical and Beam rule deduct 1 attack die when rolling against this model. In addition, this model cannot use Doses of any kind, and is immune to the Enervating, Hypnotize, Poison, Scared and Terror Status.",
    "Bounty Hunter": "When this model reveal an enemy Suspect, it may perform a free Attack Action.",
    "Boy Wonder": "Enemy models cannot reroll attack dice against this model granted by the Handy rule.",
    "Bracelets of Submission": "The first time this model is selected as a target by an enemy ranged attack in each round, it reduces the attacker's RoF by -1.",
    "Brain Enhancers": "When this model reveals or place a Suspect, you may draw 1 Objective card.",
    "Brainwash": "When this model places a Suspect, target an enemy model within 4\" of that Suspect. Choose one of that model's traits. It can not benefit from that trait until the end of the round or while that Suspect is in play.",
    "Brawler": "For each Successful hit this model receives, place a Defense Marker on it.",
    "Breaking The Bat": "When Targeting the Enemy Boss this model Crts on a 3+. After resolving the attack action (but before removing the target) place the target Boss 4\", if the target ends in contact with a Suspect, remove the Suspect from play.",
    "Brutal": "This model scores Critical results on a natural roll of 5 or 6.",
    "Bullet Time 🦇": "One use only. After activating this trait, if this model performs a Ranged Attack, it gains an extra Ranged Attack action. The model cannot use the same ranged weapon more than once. This model doesn't lose attack dice this round for firing after moving.",
    "Bulletproof Vest": "Traits and attacks with the Firearm rule deduct 1 attack die when rolling against this model.",
    "Business Agent": "When this model is recruited, add $350 to the crew's available Funding.",
    "Bushido Bat-Armor": "Enemy models cannot roll Strength dice against this model. In addition, this model rolls 1 additional Attack/Defense die against a target Challenged by this model.",
    "Batman Lives": "This model may perform an extra Movement Action at the start of its activation if no enemy models have LoS to it. When in contact with a KO enemy model, this model may remove it as a Casualty by spending a Special Action. In addition, when this model is included in your crew, you can also include model with Name: William Cobb (ignoring its Affiliation), but if you do so you may not include any model with Rank Free Agent rank unless it also has Affiliation: Bane.",
    "Batman’s Tumbler": "This model can neither Jump nor Climb. When the Upgrade Card becomes disabled, you can immediately exchange this Upgrade Card with the Batman’s Batpod Upgrade card.",
    "Batman's Batpod": "When this model ends a Movement Action, you may place a new friendly model with Alias: Batman (Dark Knight Rises) in contact and remove this model from the game. Transfer all Damage, Statuses, Audacity, and any Objectives that had targeted this model to the new model. If there were any unspent actions remaining, continue this activation using the new model. No Objectives may be scored as a result of this trait. *This model counts as Alias: Batman (Dark Knight Rises) ♠ for the purpose of forming your Objective deck.",
    "Battle Meditation": "When this model places a Suspect, you may discard 1 Objective card from your hand.",
    "Block It Out": "A friendly model (Alias: Batman Beyond) while it is within 8\" of this model may take during its activation up to 1 Effort to perform a Free Manipulate action.",
  "Bio-Chemical Barrel 🦇": "Place an Explosive template completely within 8\". All models affected suffer Poison and should perform a poison endurance check immediately. (This trait can only be used once per round)",
  "Bat Beacon 🦇": "Target a Suspect within 6\". Place an Explosive Template centered over it and roll 2D6. All affected models with a Willpower value less than the result suffer Scared and Push (2) Statuses. If this model is affected, it may be placed anywhere within 4\" of its current position. This model ignores the Statuses caused by this trait. However, this model may not use this trait in two consecutive activations.",
  "Bio-Chemical Recharge": "Once per Round, during this model activation: Target a Poisoned Fish or Poison Barrel event marker within 4\", and place it in contact with an enemy model within 8\" and LoS. This model can use immediately the Bio-Chemical Barrel trait as a free action (you must affect that enemy model).",


  // C
  "Can You Solve This? (X)": "Once per round, this model may move up to 4\" a suspect marker within 4\" during its activation by rolling a +(X) result in a die roll.",
  "Canary Cry 🦇": "Place the Spray template in base contact with this model – all models affected receive one automatic hit and are moved 2\" directly away from this model and suffers the Sonic Status. Then, affected models must pass a Endurance roll or take 🩸 Damage and become Stunned.",
  "Cannibal": "When this model removes an enemy model (not a Vehicle) as a Casualty in Melee, remove up to 2 Damage markers from this model.",
  "Card Fly 🦇": "Once per round, this model may add +8\" to its basic move distance, and can move in any direction (including vertically). When using this ability, the model can move over obstacles and Difficult Ground without extra cost or penalty. Up to X friendly models within 8\" and LoS benefits from this trait use this round (X is equal to the number of cards discarded from your hand that shares the Suit of this model).",
  "Carry": "If this model passes within 2\" of one or more friendly models during a Movement Action, it may make an Effort and target one of those models and place it in base contact at the end of the move. The chosen model cannot have the Large or Huge traits. The target model suffers Impaired Movement during its next activation unless it is Damian Wayne. This model cannot use the Carry trait in two consecutive activations.",
  "Casting Fears": "Make an Attack with a friendly model with the Nightmare trait that is within 4\" and LoS. If the target wants to Effort against this Attack, it must first suffer the Terror Status.",
  "Catcher Gear": "Enemies attacking this model never benefit from the Heavy weapon special rule.",
  "Catwoman's Batpod": "When this model ends a Movement Action, you may place a new friendly model with Alias: Catwoman (Dark Knight Rises) in contact and remove this model from the game. Transfer all Damage, Statuses, Audacity, and any Objectives that had targeted this model to the new model. If there were any unspent actions remaining, continue this activation using the new model. No Objectives may be scored as a result of this trait. *This model counts as Alias: Catwoman (Dark Knight Rises) Free Agent for the purpose of forming your Objective deck.",
  "Catwoman's Target": "A model with Alias (Catwoman) gains 2 Free Effort while targeting this model with an Attack. While this model has a model with Alias (Catwoman) within 8\", it gains 1 Free Effort when Attacking and Defending against models other than that Catwoman model.",
  "Chain of Command": "When its crew's Boss becomes a Casualty, this model immediately becomes the new Boss, taking the Crown Marker. This model does not halve the range of the Inspire trait when taking over as Boss. If more than one model in the crew has this trait, or another trait with the same effect (such as Hidden Boss) the controlling player must choose between them.",
  "Changing the Tempo 🦇": "Choose one of the following: -This model's Inspire range is increased by 4\". -Friendly models within this model's Inspire range gain 1 free Effort. This effect lasts until this trait is used again.",
  "Charismatic": "A crew that includes this model can recruit 1 additional model with Rank Free Agent, ignoring the usual restrictions.",
  "Charismatic Rat": "All friendly models with Swarm within 8\" and LoS, gains 1 free Effort. In addition, during this model's activation, if you have less than 3 Sewer Swarms in play, you may make 1 Effort to place 1 Sewer Swarm model within 2\" of this model, then, the opponent gains 1 Pass marker.",
  "Charm": "Whenever this model becomes the target of a Melee Attack, the attacker must pass a Willpower roll or the attack automatically fails.",
  "Chaotic Friends": "Friendly models with the Gotham City Siren trait in this model's crew gain the Unpredictable rule until the end of the game.",
  "Cheat": "Once per round, when this model is targeted or targets an enemy model, you place 1 Objective card from your hand face down in front f you. You may change 1 card of your roll or a result of your opponent's roll for this card value. Then discard it.",
  "Chill Touch": "Unarmed Melee Attacks made by this model deal 🩸 and gain CRT: Cold.",
  "Chlorokinesis 🦇": "This model can be removed from one point inside of a Plant's action zone, and placed at another point in the same action zone.",
  "Cinnamon 🦇": "Choose a friendly Suspect within 4\". That Suspect becomes a Cinnamon marker (it is still a Suspect) until the end of the round. If an enemy model reveals or removes the Cinnamon marker, and there is at least 1 friendly model within 4\" of the marker, you may look at your opponent's hand and discard 1 of their cards.",
  "Claws": "This model's Unarmed attacks inflict Damage 🩸★.",
  "Clay Body": "This model may choose to convert 🩸 markers to ★ markers or vice versa from all the Ranged Attacks affecting it, unless the attack had the Cold and/or Freeze Statuses and/or Electric rule. In addition, this model starts the game with 3 Clay markers (they are also friendly Suspect markers), when you deploy this model, deploy them completely within 8\" of it. When this model places a Suspect marker, and there are less than 3 Clay markers in play, that marker is also a Clay marker. When this model is moved/placed, you can Move 4\" 1 Clay marker in play. If there are less than 3 Clay markers already in play, this model gains a free Manipulate action that can only be used to place a Suspect.",
  "Clay Slide 🦇": "Place an Event marker in contact with this model. Then place this model in contact with a target friendly Clay marker. Finally, place the targeted Clay marker in contact with the Event marker placed by this trait and remove the Event marker.",
  "Cleaning the Scene": "When a friendly model within 6\" removes an enemy model as a casualty it may immediately perform a Manipulate action or draw 1 Objective card.",
  "Climbing Claws": "This model never suffers Impaired Movement when Climbing. In addition, the model may end its movement at any point on a climbable surface, such as on the side of a wall. Make the model's end position clear to the opposing player if it is not possible to physically place the model there.",
  "Cloak of Bats": "Enemy models can only see this model if it is in contact with them. This ability works even when the model is within the area of effect of a Light. However, the model is still subject to other rules that aid detection, such as Total Vision or Night Vision, etc. This model can be affected by templates, but cannot be targeted directly. Also, when an enemy model enters contact with this model, or this model enters contact with an enemy model, that model must take a Willpower roll: if the roll is failed, the model suffers the Scared Status.",
  "Close Combat Master": "When fighting Unarmed, this model may reroll failed attack dice in Melee.",
  "Cold": "When this rule hits, the target model increases the Slow Status value by (2), unless it doesn't have it, then it suffers the Slow (2) Status.",
  "Cold Acclimation": "Keyword.",
  "Combat Flip 🦇": "This trait may be used when the model is in contact with an enemy or if a result of using it, this model ends in contact with an enemy model. Move this model 3\".",
  "Combo (X)": "For every two successful hits in its attack roll while using the specified (weapon) or (trait) (before the enemy rolls to defend), this model gains an additional hit.",
  "Commissioner": "Friendly models with the Arrest trait within 6\" of this model can use that trait as an extra action. In addition, friendly models within 8\" of this model with Rank Henchman and the Cop trait, are treated as though it were within range of it's Boss's Inspire trait.",
  "Competitive": "This model gains +1 to Attack, Defense and Willpower while there is at least one other friendly model in play with this trait.",
  "Computer Console": "This model cannot be attacked more than once by the same model.",
  "Computer Intrusion 🦇": "This model may choose up to 2 Suspect markers within 8\" and move them up to 2\".",
  "Configurable Weapon": "This model can only use one of its Weapons, choose it during your first Raise the Plan phase. This model can perform an effort and spend a Special Action during its activation to change the selected weapon to the other.",
  "Confusion 🦇": "Target an enemy model (not a Vehicle) within 8\" and line of sight. Perform an opposed Willpower roll against the target. If successful, reduce the target model's Attack and Defense skills by 1. Also, the target cannot perform Special Actions. Both effects last until the end of the round.",
  "Concealment 🦇": "Until the end of the round in which this ability is used, enemy models can only see this model if it is in contact with them. This ability works even when the model is within the area of effect of a Light. However, the model is still subject to other rules that aid detection, such as Total Vision or Superior Sense of Smell, etc. This model can be affected by templates, but cannot be targeted directly.",
  "Concealed": "To use this weapon, you first need to perform 2 Efforts.",
  "Conundrum Champion 🦇": "Target a model within 8\" and line of sight. Perform an opposed Willpower roll against the target. If successful the target suffers the Enervating (2) Status.",
  "Control Pheromones 🦇": "Choose an enemy model (not a Vehicle) within 5\" and line of sight. The target immediately suffers the Hypnotize Status.",
  "Control Through Fear 🦇": "Target an enemy model with the Scared effect that is within 8\" and LoS. That model suffers the Terror Status and you Move 4\" it.",
  "Controlled By Drugs": "This model can only be assigned an Audacity marker, make Efforts when performing an Attack action, and use traits requiring Effort, if there is another friendly model with the Fervent Follower trait or/and with the Rank: Leader within 4\". If a friendly model removes an enemy model as a Casualty within 4\", that model suffers ★★. Once per round, a friendly model with the Rank: Leader or Fervent Follower trait may spend a Special action to move this model 4\". This model may then immediately perform a Tactical action.",
  "Cool Under Fire": "A crew that includes this model gains +1 Resource Point each round. Also, when a friendly model with the Veteran trait (not Bane himself) activates within 8\", remove 1 Status from that model.",
  "Cooperation Fighting": "When targeting an enemy with a Melee Attack that is already in contact with another friendly model, this model inflicts 1 additional ★ for each hit that inflicts damage.",
  "Cooperative Fight Plan": "Models in a Teen Titans Team gain the Resilient trait while they are within 4\" of two or more friendly models.\n\nResilient: This model can reroll failed Endurance rolls.",
  "Coordination 🦇": "Target another friendly model within 8\" of this model that share a keyword with this model, then, immediately perform an action with that model.",
  "Cop": "Keyword.",
  "Corrupt": "If this model is included your crew, you can recruit up to 3 models with Rank Henchman with the Cop trait. Additional models in the crew with this trait have no further effect.",
  "Contractor": "This model may treat its rank as Leader, but if it does so its Affiliation changes to Bane. In addition, if this model is recruited as the Boss, all models in the crew with the Veteran trait also gain Assassin 1.",
  "Counter Attack": "When targeted by a Melee Attack, this model can make an Effort to activate this trait. For the remainder of the activation, when this model successfully defends against an enemy Melee Attack, this model gains one Counter Attack for every attack blocked. Once the enemy attack is resolved, assuming this model is not KO or a Casualty, each Counter Attack is converted into an automatic hit against the attacker, calculated as per this model's preferred Melee Weapon. These Counter Attacks are resolved immediately, out of sequence. After resolving the Counter Attacks, play resumes as normal.",
  "Countermeasures 🦇": "Spend 1 Resource point to Set 1 THWART! in contact with a friendly Suspect within 4\" and LoS to this model, or play a Resource at no cost this activation.",
  "Country Girl": "While this model is within 8\" of or inside its Deployment zone, it may perform the Manipulate action for free and its unarmed damage inflicts ★★.",
  "Court of Owls Crew": "This crew can only hire models with the Affiliation: Court of Owls.",
  "Coward's Reward": "If this model is not KO when an enemy model moves out of contact from this model, that enemy suffers 🩸.",
  "Criminal": "Keyword.",
  "Criminal Empire": "When both players end the placing of the Sewer markers, each player must place 1 Criminal Empire marker (use an Event marker) at least 8\" away of all Deployment Zones. Each time a friendly model makes a Manipulate action within 4\" of a Criminal Empire marker, you earn 1 Business Counter.",
  "Criminology": "All enemy models within 12\" of this model lose the benefit of the Runaway trait.",
  "Critical": "Critical Effect",
  "Critical Strike 🦇": "After activating this trait, any Melee Attacks performed by this model automatically treat the Strength die as scoring a natural 6. No die is rolled, but the success is counted.",
  "Crit. Freeze": "Critical Effect.",
  "CRT (X)": "Natural 6 on the Strength die = Critical Hit. Target is Knocked Down by default. Weapons may list a special CRT effect ( CRT (X) ). If present, player chooses one effect: the listed one or Knocked Down.",
  "Crucial Information 🦇": "This model may move a Suspect within 8\" and LoS 4\".",
  "Cruel 🦇": "Choose a KO enemy (not a Vehicle) in contact. That model is removed from play as a Casualty.",
  "Cryo-Armor (X)": "Enemy models roll X fewer attack dice when targeting this model. In addition, while this model is within 4\" of a Frozen Suspect, it gains X Free Effort when Defending. This model counts as having the Rank Vehicle for traits that removes Damage from it.",
  "Cryo-Charge 🦇": "The next Attack action performed this activation gains CRT: Freeze.",
  "Cryo-Grenade 🦇": "Place an Explosive template completely within 8\". All models affected without the Cold Acclimation trait suffer Cold rule and any Suspects affected become Frozen.",
  "Cryo-Reinforcement 🦇": "Target a friendly Frozen Suspect and another friendly model with the Cryo-Armor (1) trait within 4\". Remove that Suspect. Until this model is removed from play or uses this trait again, the target model's Cryo Armor (1) trait increases by 1 and its Ranged weapons with S. Range lose it.",
  "Cryo-Weapon": "When an attack or weapon that uses this rule score at least 1 Successful hit, choose another model and 1 Suspect within 2\" of the target. The chosen model suffers 1 hit from that weapon (doesn't trigger the Cryo-Weapon rule) and the Suspect becomes Frozen.",
  "Cybernetic": "This model gains +1 to its Defense rolls, and can reroll Recovery rolls.",
  "Cyclops": "This model's ranged attacks gain the Imprecise rule when the target is more than 8\" away.",
  "Cobras's Burst 🦇": "When you use this trait, if you have a copy of The Great Plan Objective card in your Scored Pile, you may use their Resource as if that card is in your hand, without discarding it.",
  "Counter Argument 🦇": "This trait's effect depends on which side of the Coin is in play:\n- Good Side: If this model performs an Attack action against a model with Audacity, this model gains an extra Manipulate action.\n- Scarred Side: If this model performs a Manipulate while within 4\" of an enemy model with Audacity, this model gains an extra Attack action.",
  "Coin Flip 🦇": "Search your Objective deck for a Coin card and immediately play it. Shuffle your Objective deck.",
  "Challenge 🦇": "Target an enemy model within 4\" and LoS, target and this model are Challenged and can perform free Efforts while attacking and defending each other. This model cannot use this trait if it is already Challenged with another model.",




  // D
    "Daddy's Girl": "If this model starts its activation within 6\" of the Boss, it gains +1 ★.",
    "Dark Influence 🦇": "A friendly model without Audacity perform a Move 4\" and then a Tactical Action immediately. When resolved continue with this model's activation. Or you may search into your deck a card that has the Freed resource.",
    "Dark Intimidation (Spell)": "Special Action. 1 Magic Counter. Enemy models within 8\" and LoS cannot make Efforts when Attacking friendly models.",
    "Dealer": "During the Recount phase, if the opponent scores an Objective, you may take an Objective from behind your Plot card, and score it immediately, ignoring the usual rules.",
    "Deadliest Man on Earth": "When this model targets an enemy with an Attack, it immediately suffers the Poison Status. If the Attack inflicts any Damage to the target, it immediately must take a Poison Status test.",
    "Death Marks": "When this model inflicts a Casualty, it gains +2 Attack Marker or +2 Defense Marker or +4 Movement Boost Marker.",
    "Death or Exile 🦇": "Target one KO model (not a Vehicle) within 8\" and line of sight. The target model is removed as a Casualty.",
    "Death Pack": "If the target of this model's Melee Attack is already in contact with one or more other friendly models with this trait, this model gains a +1 bonus to its attack dice rolls, and one extra attack die against that target.",
    "Defense Bonus": "A model with one or more Bonus Defense Marker gains 1 extra die to its next Defense roll for each Bonus Defense Marker it possesses. A model cannot have more than 3 Bonus Defense Marker at any one time.",
    "Defense Penalty": "A model with one or more Penalty Defense Marker deducts 1 die to its next Defense roll for each Penalty Defense Marker it possesses. A model cannot have more than 3 Penalty Defense Marker at any one time.",
    "Defensive Stance": "This model ignores the penalties for being Outnumbered in combat, and chooses the direction when it is Pushed.",
    "Delirium": "In the Recount phase, this model does not recover ★ Damage, and cannot take rolls to Recover from KO.",
    "Demon": "Enemy models roll 1 less attack die when targeting this model. In addition, this model never reduces its Effort Limit for accumulated Damage and ignores up to 1 Damage inflicted by the Magical Conflux.",
    "Demon Curse": "At the beginning of the Take the Lead phase, if there are no models in contact, roll 2D6 for this model and add the results together. For each friendly model removed as a Casualty in the game so far, add +2 to the result. On a result of 11+, place a friendly Etrigan model within 4\" of this model, then remove this model from play.",
    "Demoralize 🦇": "All enemy models with Rank Henchman within 6\" suffer the Enervating 1 Status.",
    "Demotivate 🦇": "Target a model within 8\" and line of sight. That model must pass a Willpower roll (2) or immediately suffer the Enervating (2) Status.",
    "Desensitized": "This model doesn’t suffer KO through accumulated ★. Instead, once it has accumulated ★ equal to its Willpower, any additional ★ Damage automatically becomes 🩸 Damage instead.",
    "Designated": "At the start of this model's activation, you may search into your objective deck a copy of the Target Acquired Objective card.",
    "Detachable Arms": "This model may place or reveal a Suspect marker within 8\" and LoS instead of in contact.",
    "Detective": "This model may place or reveal a Suspect marker within 3\" and LoS instead of in contact.",
    "Detective Best Friend": "While this model is within 8\" and LoS of a friendly model with the Detective trait, it can count as being in the position of that model when making a Manipulate Action.",
    "Detective Mode": "This model ignores the rules of a Smoke event marker.",
    "Detonate 🦇": "Target a Suspect marker within 8\". Center an Explosive template on that marker. Roll a Strength 3+ die against each model affected. On a success, the model suffers 🩸★. Remove the Suspect marker.",
    "Development": "When this model Sets a Suspect within 4\" of a friendly model with a not Active Lucius's Inventions Equipment you can make it the Active one (making inactive the previous one).",
    "Dimensional Portal 🦇": "Remove this model and place it up to 12\" away. At a cost of a Movement Action (If it has one left to spend), this model may choose one friendly model within 2\" before it is removed – the target model is also removed, and placed in contact with this model in its new position. After being placed, this model ends its activation. Any model that was placed with it counts as having moved during its activation, and its Basic Move Distance is 0 for the rest of the round. A model cannot use this trait in two consecutive activations.",
    "Direct Connection to the Speed Force": "This model may reroll the Paradox roll.",
    "Dirty Fighter": "This model can perform Ranged Attacks even if it is in contact with enemy models. If it uses a ranged weapon to target an enemy model in contact, it gains +1 to its attack dice rolls.",
    "Dirty Money": "If this model is the Boss, its crew has an extra $300 Funding.",
    "Disappearing": "Once per round, when this model becomes the target of an enemy attack, this model can move up to 4\" before the attack is performed. If this means the enemy could no longer target this model, it can choose a different target.",
    "Disarray 🦇": "Target an enemy model within 8\" and Line of Sight. If that model has an Audacity marker, you can move the marker to another enemy model within 8\" that has yet to activate, and does not already have an Audacity marker.",
    "Discourage 🦇": "Choose an enemy model (not a Vehicle) within 8\" and line of sight. Perform an opposed Willpower roll against the target. If successful, the target model suffers -2 to its Willpower value when performing a Willpower roll until the end of the round.",
    "Discharge": "After activating this ability, the next ranged attack this model performs this round inflicts 1 additional 🩸 damage per hit and costs 1 additional Ammo.",
    "Disguise 🦇": "Remove a friendly Suspect within 4\". Then move this model 4\". Treat this model as if it had not spent an Attack action for the purpose of any traits.",
    "Disguised Sneak Attack 🦇": "Target a model within 2\". Perform an opposed Willpower roll against the target. If successful, the target cannot take Defense rolls or make Efforts against this model's Attacks until the end of the round.",
    "Dispersion 🦇": "During this activation, when an attack places an Explosive template, place the narrow end of a Spray template in contact with the Explosive template. Both templates affect models as usual.",
    "Disposable Minions": "If this model is hit by an enemy attack (any type), it may make an Effort to nominate a friendly model with the He Freed Me trait within 4\" and LoS to receive the attack instead. Resolve any Damage and/or Statuses against the nominated model.",
    "Disposable Nightmare": "When this model is removed, Discard a card from your deck.",
    "Disruptor 🦇": "Target one enemy model within 8\" and line of sight. The target cannot use ranged weapons with the Firearm or Beam rule this round.",
    "Distort Magic": "Make an Effort to activate this trait. When the trait is activated, choose any point on the tabletop within 4\" of this model. Until the end of the round, this model can cast spells as though it was located at that point.",
    "Distract 🦇": "Target one enemy model within 4\" and line of sight. The target reduces its Defense skill by -1 until the end of the round. If multiple models with this trait target the same model, the effect is not cumulative.",
    "Disturb 🦇": "Target an enemy model within 8\" and line of sight that is yet to activate this round. Make an opposed Willpower roll against that model. If successful, you may look at the opponent’s Objective card hand, and Discard one of the cards.",
    "Divination": "This model can use Divination Spells. In addition, once per game the model can reroll one die – you don’t need to accept the second result, and instead may choose between both.",
    "Divine Magic": "This model can use Divine Magic Spells. In addition, once per game this model can spend 1 Magic Point (MP) during its activation to remove 1 Damage marker from its Character Card.",
    "Dodge": "This model can use the Dodging rule.\nDodging: A model that benefits from this rule may make an Effort to reduce the attack dice from a Ranged Attack that targets this model.",
    "Dodging": "A model that benefits from this rule may make an Effort to reduce the attack dice from a Ranged Attack that targets this model.",
    "Dollotrons": "When you recruit Professor Pyg, you must also recruit three Dollotron models, at no additional Reputation cost.",
    "Doses": "Several traits contain the keyword 'Dose'. This simply means that the model can use this trait once for each Dose it possesses. For example, if a model has 2 Venom Doses, it can use it twice during the game. Each time a model gains a Dose, it may use the ability one more time if the model is able to do so. A model may only use one Dose per round.",
    "Drag": "During this model's activation, if this model passes within 2\" of a friendly model or Suspect during a Movement Action, it may make an Effort to place it in base contact at the end of the move. Models with the Large or Huge traits may not be targeted. The target model suffers Impaired Movement during its next activation. This model may not use the Drag trait on the same model in consecutive turns.\nIn addition, if this model inflicts Damage with a Melee Attack on an enemy model, you may place at the end of this activation the target in contact with this model.",
    "Drop a Riddle 🦇": "If you have played during this round at least 2 Objective cards as Resources, place a Suspect or a Riddle marker within 4\" of this model.",
    "Drop It!": "Target an enemy model within 8\" and LoS and make an opposed Willpower roll against it. If successful, that model places a new friendly Suspect in contact ignoring the usual placement rules.",
    "Duelist": "While in contact with only one enemy model, this model may reroll failed attack dice rolls in Melee.",
    "Duke of Duality": "When this model scores an Objective card, flip a coin or roll a D6: if the result is 'heads' (or an even number) draw an additional card. If the result is 'tails' (or an odd number), Discard an Objective card at random before drawing a new card.",
    "Don't Mind Me": "This model receives the same free Efforts when defending as its Effort Limit until it makes an Attack action.",


  // E
    "ECM": "All Light sources within 6\" of this model are nullified (effectively illuminating an area of 0\".).",
    "Echolocation": "This model does not suffer the Blind Status and ignores the rules of a Smoke event marker. In addition, this model may see at any distance, limited only by Line of Sight and intervening scenery.",
    "Ectokinesis": "This model can use Ectokinesis Spells. In addition, once per game this model can spend 1 MP during its activation to reroll its Attack and Strength dice rolls against models with the Incorporeal trait.",
    "Eldritch": "This model can use Eldritch Spells. In addition, once per game during its activation, the model gains +1 to its Attacks value until the end of the round.",
    "Electromatic Control Device 🦇": "Place an Event marker within 4\". You can place within 4\" enemy models that are within 4\" of that marker when is placed. In addition, all enemy models that stays within 4\" of that marker during its activation, suffers Enervating 2. Remove the marker at the start of Recount phase.",
    "Electric Handshake 🦇": "Choose a model in contact. The target model must pass a Willpower roll or suffer the Stunned Status.",
    "Elite (X)": "Your crew can only include 1 Elite model of each (Type), unless you also include the Elite Boss: (Type).",
    "Elite Boss (X)": "If your crew includes a model with this trait, you may include any number of Elite models of the same (Type) as the Elite Boss (following the normal restrictions for forming a crew).",
    "Elusive": "When targeted by a Ranged Attack, this model may make an Effort to force the attacker to reroll one attack die.",
    "Embrace the Chaos": "After an attack in which this model scores any hits, you may take the top card card from your objective deck. Immediately use the resource on that card for free and then discard it.",
    "Emotion Control": "At the start of this model's activation, choose one of the following effects. Until this model's next activation, this rule affects all enemy models while they are within 8\" of this model.\n\n1. Love: Affected models deal 1 less total damage with attacks and traits (the model suffering the damage chooses the type).\n\n2. Fear: Affected models suffer -1 to their Attack and Defense dice rolls.\n\n3. Anger: Affected models suffer 1 additional damage with attacks and traits (the model inflicting the damage chooses the type).\n\n4. Sadness: Affected models suffer -1 to their Effort limit.",
    "EMP": "This model rerolls failed Strength die rolls against models with the Cybernetic, Bot or Robot traits, and against models with Rank Vehicle.",
    "Enemies of the Court": "Any friendly model, can spend a Special Action to, interrupt the activation to perform immediately a free Special Action with this model.",
    "Energy Absorption 🦇": "All the damage inflicted by this model melee attacks this round, inflicts 🩸 instead of ★. In addition, per each successful non-blocked hit, this model removes 1 damage.",
    "Energy Field": "Roll 1D6 for each hit this model suffers from a Ranged Attack. On a result of 5+, the hit is ignored.",
    "Engineer": "While attacking or defending against this model, enemy models with one or more pieces of Equipment suffer -1 to its Attack and Defense for the duration of the attack.",
    "Enhanced Batlings": "Once per round, After this model does damage with a Ranged Attack to a single target within 8\", you can place the target of the attack in contact with this model. If you placed a model in contact with this model as a result, immediately make a free special action to use the 360° Strike trait and then, immediately you can make a free Melee attack action.",
    "Enhanced Vision": "This model can see at any distance and ignores the Concealment trait. In addition, the model is immune to the Blind Status.",
    "Enough Evidence": "At the start of this model's activation, for each 2 friendly models that has at least 1 friendly Suspect within 4\" of it, you can draw 1 Objective card, then you can keep 1 of them and discard the others. In addition, if a Monitoring card is discarded in this way, you can move 4\" a Clue marker, if any Following the Clues is discarded you can place a *X* marker on top of a Monitoring Objective card in play.",
    "Escape Artist": "After resolving an enemy attack against this model, as long as it is not made KO or a Casualty, it may immediately move up to 4\".",
    "Evidence Tampering": "When this model Reveals an enemy Suspect marker, it may place a friendly Suspect marker in contact with it first. Then, remove the enemy Suspect marker as normal.",
    "Exalt 🦇": "Target up to 2 other friendly models with the Blackfire Cultist trait within this model's Inspire range. These models move 8\". You may then discard a Violence type card to immediately perform a Melee Attack with any of the target models.",
    "Exhaustive Planner": "One use only. When the opponent plays an Objective card as a Resource, this model can cancel that card's effect. The opponent must immediately Discard the card.",
    "Expendable": "When this model is removed from the game as a Casualty, you may draw an Objective card.",
    "Expendable Penguin X": "This model not count towards any Pass markers for any reason. It does not activate as normal and can not receive an Audacity marker. This model can only be hired in a crew if there are a model with the Penguin Caller and/or Hidden Penguins trait on it. When this model is removed as a Casualty, it can be placed in play again in a subsequent round with the Penguin Caller trait, removing all Damage and Statuses suffered previously.",
    "Experimental Ammo": "This model can't Manipulate Ammo Crates.",
    "Expert Marksman": "This model gains a +1 bonus to its attack dice rolls when performing Ranged Attacks. Note: This trait is also called Ranged Master on some character cards.",
    "Exploit the Weakness": "When a friendly model with the Assassin trait within 8\" of this model makes an attack, the target reduces its Effort limit by -1 for the duration of that action.",
    "Explosive Arrival": "This model is not deployed as normal at the start of the game. Instead, during a friendly activation in which you score an Objective card, you may place this model anywhere on the gaming area, then, place a Smoke event marker in contact with this model, all models within 4\" of this Smoke event marker suffers Poison. This model ignores this Smoke Event marker. Remove this marker at the end of the round. This model may receive an Audacity marker even if it is not in play.",
    "Explosive Gel": "Once per activation, this model may mark a Streetlamp, Sewer or Suspect marker in contact as being sprayed with Explosive Gel (use a spare token or dice to remind you). In any subsequent activation, this model may use a Manipulate action to destroy any number of marked items. Center an Explosive template on each chosen marker, and roll a Strength 3+ die against each affected model. Any model hit suffers ★★ Damage. Then, remove that marked items from the game.",
    "Explosive Personality": "While this model is in play, any friendly model can spend a Special Action during its activation to search into your Objective deck for a copy of the Bite The Dust or Let Them in on the Joke Objective card. In addition, scored Stage Play Objective cards provide 3 VP each (instead of 2) even if this model is not in play.",
    "Explosive Sense": "All friendly models whitin 6\" of this model, that are going to be affected by a Explosive template, impose a -1 to that roll, if any.",
    "Explosive Teeths 🦇": "Move an Explosive Teeth marker up to 4\". Then reduce its number counter by 1",
    "Exorcism": "This model can use Exorcism Spells. In addition, once per game during its activation but before casting any Spell, this model can spend 1 MP to add +1 to the result of all Magical tests until the end of the round.",
    "Exposure": "For each additional successful hit after the first, the target suffers 1 additional damage marker (any type).",
    "Extended Limbs 🦇": "This model can perform Melee Attacks against models up to 3\" away as if they were in contact.",
    "Extremely Mutated": "This model cannot buy more than one item of Equipment.",


  // F
    "Faint": "When this model becomes KO, it is also removed as a Casualty.",
    "Falconry 🦇": "Until the end of the round, this model can perform ranged attacks against enemy models within 16\", ignoring cover and LoS, as long as the target models are within 6\" of a friendly Suspect. If you remove that marker at the start of the Attack action, you may roll one additional Attack die.",
    "Fast (X)": "Once per round this model may move X\" when a model resolves an action.",
    "Fast Combo (X)": "For every two successful hits in its attack roll while using this weapon (before the enemy rolls to defend), this model gains an additional hit. This attack is a Speed Power and you need to draw X SpeedForce cards to use it.",
    "Fear Advantage": "This model may use the Protect Me! Trait on a friendly model with the Nightmare trait without needing to perform an Effort.",
    "Fear Dampening": "Models moving within this model's action radius suffer Impaired Movement.",
    "Fear Invigoration": "This model may throw X additional dice when taking Attack and Defense rolls (X is the number of cards in your Terror Pile).",
    "Fear Of The Dark": "When this model places a Suspect, target X enemy models within 8\" and LoS. Each model must suffer ★★ or suffers the Terror Status, at the choice of its owner. X is equal to the number of friendly Suspects within 4\".",
    "Feedback Protection": "This model doesn't receives Disruption tokens when a Suspect is removed by the Riddle marker rule.",
    "Feint": "Target a single enemy model in contact with this model and take a Willpower roll. If the roll is successful, the target can't make an Effort against this model's attacks this round.",
    "Feral 🦇": "Once this trait is activated, this model's Melee Attacks this round gain a +1 bonus to attack dice rolls, and inflicts the Slow (2) Status.",
    "Ferocious": "This model's Melee Attacks gain the Push (2) Status.",
    "Fervent Follower": "This model produces 1 additional Faith Point at the start of the Raise the Plan phase.",
    "Fight Me!": "If a friendly model within 4\" of this model and LoS suffers any number of hits from an Attack (of any kind), this model may make an Effort to take the hits instead, and all the Statuses of that attack. Only one Effort is required per enemy Attack.",
    "Find the Better Joker": "When a target enemy model would be removed as a Casualty within 8\" of this model, you may place a new friendly model with the Alias; Joker's Victim X that has been already removed as a Casualty, in contact with the target before removing it.",
    "Fire Catalyst": "Enemy models within 4\" suffer Damage inflicted by the Fire Status when the opponent Discards or Scores a Violence type card as if it had the Burn keyword.",
    "Fire Immunity": "This model cannot be affected by the Fire Status.",
    "First To Fall": "This model may be targeted by a Cranial Bomb Activated card even if it is not the active model.",
    "Flak Armor": "This model is immune to Damage caused by hits with the Explosive and/or Expansive rules.",
    "Flare": "One use only. Make the entire gaming area count as being under the effect of Light until the end of round.",
    "Flaming Kick 🦇": "Until the end of this round, if, at the beginning of the attacker's activation, the target was in a lower position than the attacker, his next melee attack gains Devastating, Push (4) and the target places a new friendly Suspect in contact ignoring the usual placement rules even if the target is KO'd due to the attack, but does not place any suspect if it is eliminated as a casualty.",
    "Fly 🦇": "Once per round, this model may add +8\" to its basic move distance, and can move in any direction (including vertically). When using this ability, the model can move over obstacles and Difficult Ground without extra cost or penalty.",
    "Flying High 🦇": "One use only. This model may add +20\" to its basic move distance, and can move in any direction (including vertically). When using this ability, the model can move over obstacles and Difficult Ground without extra cost or penalty.",
    "Football Gear": "Enemies attacking this model never benefit from the Sharp and Heavy weapon special rules.",
    "Follow Me! 🦇": "Choose a friendly model with Rank Henchman within 4\" of this model (but not the activated model itself). That model gains a +4 Movement Boost Marker.",
    "For My Lords!": "When a friendly model within 4\" that shares a Keyword with this model is the target of an Attack, this model may be the new target. Ignoring LoS and distance. During Ranged Attacks, only the modifiers that affected the original target are applied, except for the Protective trait of this model, which is applied.",
    "Force Bolts": "Cost: 3 Paradox: 6+\n\nTarget a Model within 8\" and LoS. The target recieves an auto hit with Str 4+ and damage 🩸★★. This hit cannot be dodged.",
    "Force Field 🦇": "Target friendly model in contact benefits from Cover until the end of the round, even if it is not behind Cover.",
    "For the Family": "If a friendly Carmine Falcone within 4\" and LoS of this model suffers any number of hits from an Attack (of any kind), this model may make an Effort to take the hits instead and all the Status of that attack. Only one Effort ★ is required per enemy Attack. This trait can't be used against attacks from a model with Name: Selina Kyle.",
    "Freed": "This model can only be recruited if the crew also includes The Batman Who Laughs model.",
    "Freeze Well 🦇": "Once per round, when a ranged attack of this model score at least 1 Successful hit, the target makes a Willpower roll. If unsuccessful, that model places a new friendly Suspect in contact ignoring the usual placement rules. That suspect is frozen.",
    "Frightening Reputation": "If this model is not KO, when targeting or targeted by a model with the Rank Henchman, this model gains +1 Attack and Defense.",
    "Froot Loops": "While this model is within 4\" of a friendly Raj model, when it performs Efforts it may ignore up to 1 ★ caused by the Efforts. If this model is not within 8\" of a friendly Raj model at the start of its activation, it suffers Enervating 1.",
    "Fully Equipped": "This model cannot purchase any Equipment.",
    "Funny Bomb 🦇": "Center the Explosive template over this model. This is resolved as an Explosive Ranged Attack, rolling a Strength 3+ die for each affected model – on a successful roll, the model receives 🩸★ Damage. Once this action is resolved, remove this model as a Casualty.",



  // G
    "Gambling Time": "As long as this model is not KO, it counts as a friendly Suspect for friendly Objective cards scoring requirements.",
    "Gang Lord": "When this model is your crew's Boss, friendly models with the Gangster trait may Reveal Suspects within 3\" instead of in contact.",
    "Gangsters": "For every 2 models with this trait in your crew at the start of the game, gain 1 Blood Money counter. During the activation of a friendly model with the Gangsters trait, you may spend 1 Blood Money counter to gain the following rules until the end of that activation:\n• The model may move and make a ranged attack losing only one die, but suffers -1 to hit.\n• The model's ranged weapons gain the Light rule.\n• When this model performs an Attack action, pick another friendly model with the Gangsters trait immediately, and place it up to 4\" from its original position.",
    "Gas Jumper": "This model can move in any direction (including vertically). The model can move over obstacles and Difficult Ground without penalty. All models within 4\" and Los of this model at the end of a Movement action suffer Poison and Enervating (1) Statuses, with the Gas rule.",
    "Gas Mask": "This model ignores Damage and Status caused by any Attack or trait with the Gas special rule.",
    "Genius.": "Once per round, this model can remove an Audacity marker from one friendly model, and give it to another friendly model that is yet to activate.",
    "Genius 🦇": "Target an enemy Boss within 8\". Make an Opposed Willpower roll against the Boss. If successful, you may look at your opponent's hand and take 1 Objective card by removing a number of friendly Suspects within 8\" of this model equal to the number of VP the card is worth. Until the end of the round you may play this card as a Resource with no cost. At the end of the round, or after this card is played, discard it to the bottom of the card's owner's Objective deck.",
    "Get ’Em 🦇": "One friendly model within 8\" and line of sight of this model gains +2 Attack Marker.",
    "Ghost": "This model has the Invulnerability 1 and Incorporeal traits. Its Incorporeal trait is always active, and never has to be activated by spending an Action.",
    "Goad 🦇": "Target one enemy model (not a Vehicle) within 8\" and line of sight, and take an opposed Willpower roll against it. If you succeed, you may move the enemy model up to 4\", following all of the usual Movement rules. During this movement, you cannot force the target to Fall.",
    "God's Banner 🦇": "Choose one of the following: • All models with the Saint Dumas Zealot keyword within 8\" remove 2 ★ Damage. • Discard X Objective cards (where X is equal to the number of models with the Saint Dumas Zealot trait within 8\"). This model may spend a Manipulate action to activate this Special.",
    "God's Work": "During the Raise the Plan phase, target an enemy model. Attacks this model performs against the targeted model gain +1 to the Attack dice roll. If this model removes a targeted model as a Casualty, it gains a free Manipulate action for the rest of the game. This model can only perform an Attack using a weapon that causes 🩸 against models that have been targeted by this trait.",
    "Go My Little Birds 🦇": "Remove a friendly Suspect within 4\". Place a friendly Suspect within 8\". A friendly model within 4\" of the Suspect moves 4\".",
    "Good Aim 🦇": "During this model's next Ranged attack this activation, before rolling, roll one of your attack dice, on a 2+ that die is a successful hit. If it fails, remove it from the attack.",
    "Gotham City Siren": "One use only. Target another friendly model with this trait within 4\" – the target gains +2 ★ or 🩸.",
    "Grand Strategist": "While this model is in play and not KO, you gain +2 Resource points.",
    "Grapple Gun": "Once per round, this model gains +6\" to its basic move distance, and can move in any direction (including vertically). When using this ability, the model can move over obstacles and Difficult Ground without penalty. However, the model cannot use this rule in two consecutive activations.\n*Some models list this trait as 'Grapple Gun', and others as 'Batclaw'. The rules are the same in both instances - the distinction is just for fun!",
    "Green Magic": "This model can use Green Spells. In addition, once per game this model can spend 1 MP to remove 2 Damage markers from its character card.",
    "Green Travel 🦇": "One use only. Remove this model and immediately place it up to 20\" away. A model may not perform a Movement Action in the same round that it uses Green Travel.",
    "Green Web 🦇": "Target friendly model with the Plant trait within 8\" of this model immediately performs an Attack action.",
    "Greed": "This model cannot contribute to or fulfill criteria for Objective cards that award VP for inflicting Damage, making models KO, or removing models as Casualties.",
    "Grin Twins": "This model gains +1 to Attack, Defense and Willpower while there is at least one other friendly model in play with this trait.",
    "Groundwork 🦇": "Reveal cards from the top of your Objective deck until you reveal a Control type card and add it to your hand. Discard any other cards revealed this way. If a friendly model with the Detective trait has Revealed a Suspect this round, instead of revealing, search your Objective deck for a Control type card and add it to your hand. Then shuffle your Objective deck.",
    "Growling Hound 🦇": "Target an enemy model within 8\" and LoS. That model must take a Willpower roll. If unsuccessful, it must immediately Move X\" directly away from this model (X is equal to the difference between the result and target's Willpower).",
    "Grudge Match 🦇": "When this model declares an Attack action you may choose that no efforts may be made.",
    "Gunman 🦇": "After activating this trait, the first time this model performs a Ranged Attack this activation, it gains an extra Ranged Attack action.",

  // H
    "Hacking 🦇": "This model may move up to 2 markers within 8\" up to 4\".",
    "Hail to the Queen!": "This model counts as having the Spades, Clubs, Diamonds, and Hearts keywords.",
    "Hallucination 🦇": "This model can use this trait to place a friendly model (not KO or Knocked Down) with Alias: Bat-Mite in contact with itself.",
    "Hand!!": "This model can only Sets and Reveals Suspects if it is within the Inspire range.",
    "Hands Off Mode": "Once per game, this model can activate Hands Off Mode during a Move action, roll a Str 2+ die against all models it moves through, in a success, the model suffers 🩸🩸.",
    "Handyman": "This model can make an extra Manipulate action during its activation. Also, this model can use a Manipulate action in contact with a model with Rank Vehicle to remove up to 2 Damage markers from it.",
    "Hard Guys": "If this model is your Boss, friendly models with Rank Henchman that attack with Brass Knuckles or Reinforced Gloves may re-roll failed Strength die rolls.",
    "Hardened": "Once per round, when this model suffers Damage, it can choose to change the Damage type of up to 1 Damage marker received.",
    "Harlequin": "Keyword.",
    "Harlequin Show 🦇": "Discard a card from your hand. Depending on the discarded card type, another friendly model within 8\" with the Harlequin trait gains: • Control: Give to it an audacity marker from a friendly model that is already activated (with the unactivated side). • Menace: Place it in contact with an enemy model within its Movement value. • Violence: Immediately make an Attack with it. • Protection: Remove 2 Damage.",
    "Harlequinade": "This model can only manipulate while she is within 8\" of a friendly Alias: Batman.",
    "Harley's Best Friends": "When starting this model's activation within 8\" of a friendly model activation with Name: Dr. Harleen Frances Quinzel, this model ignores the Stupid trait and may make an extra Tactical Action but cannot benefit from the Inspire rule.",
    "Hates (X)": "This model can never be Included in the specified (crew/s).",
    "Hates Humanity": "This model cannot be affected by friendly models' traits.",
    "Hazard Armor": "This model ignores the Poison, Toxic and Fire Statuses. In addition, enemies roll 1 less attack die when targeting this model.",
    "He Freed Me": "This model can only be recruited if the crew also includes The Batman Who Laughs model.",
    "He Was the Best of Us": "Enemy models within 6\" and LoS cannot make Reveal actions.",
    "Healing Radiance": "A friendly model within 4\" of the target of the attack, removes up to 1 Damage.",
    "Hear Me Roar 🦇": "Until the end of the round, this model can interrupt its Movement action to perform a Manipulate action to place a Suspect, and then continue with its Movement action. The model must have enough actions available to use this trait.",
    "Heavy Armor": "Enemy models roll 3 less attack dice when targeting this model.",
    "Heir to the Cowl": "When forming your crew, if there is no model with the Alias: Batman (any version) in the same crew, this model changes its rank to Leader.",
    "Henchman Bomb 🦇": "One use only. This model may choose one friendly model with Rank Henchman and center an Explosive template on it. This is resolved as an Explosive Ranged Attack, rolling a Strength 2+ die for each affected model, and inflicting Damage 🩸🩸🩸 on a successful roll. After resolving this attack, the chosen model is removed as a casualty.",
    "Herald of Spades": "This model may use the King of Spades trait as long it is within 8\" and LoS to the King of Spades model.",
    "Heroic 🦇": "Target any one friendly model on the board. That model can perform 1 extra Action this round.",
    "Hidden": "Before both groups of both crews are selected, left this model aside. When both groups are deployed, this model may be deployed anywhere on the gaming area. If both sides have Hidden models, start with the player with setup initiative. This model must be placed out of line of sight of all enemy models if possible, or at least 12'' away from enemy models that can see it. If this is not possible, this model must be deployed in the usual deployment zone.",
    "Hidden Boss": "When its crew's Boss becomes a Casualty, this model immediately becomes the new Boss, taking the Crown marker. Increase this model's Willpower by +1 for the rest of the game. In addition, this model does not halve the range of the Inspire trait when taking over as Boss. If more than one model in the crew has this trait, or another trait with the same effect (such as Chain of Command) the controlling player must choose between them.",
    "Hidden Penguins": "Before both groups of both crews are selected, left models with the Expendable X Penguin Trait aside. When both groups are deployed, these models may be deployed within 4\" from a Sewer marker. If the opponent have Hidden models, start with the player with setup initiative. These models must be placed out of LoS of all enemy models if possible, or at least 12\" away from enemy models that can see it. If this is not possible, these models must be deployed in the usual DZ.\nThis Model May spend an Action to immediately perform an action with a friendly Model with the Expendable Penguin X Trait. And once per round, this model can perform a free action with 1 friendly model with the Expendable X Penguin Trait (you cannot repeat the same action with the same Penguin during the same round).\nWhen this model places a Suspect, you may spend x Business counters to bring back a model previously removed as a Casualty with the Expendable Penguin X trait in contact with a Sewer marker.",
    "Hidden Plans": "Unless a friendly Boss is within 8\" of this model (or this model is the Boss), friendly models does not inflict additional damage for attacking K.O. models. If this model is the Boss, when you score an Objective card other than for making enemies models KO or Casualty, you gain 1 Resource point.",
    "Hidden Sniper 🦇": "Target an enemy model that this model can see, and that is also within 12\" of any board edge. The target receives a Ranged Attack, ignoring Cover. This attack has RoF 1, Damage 🩸🩸, and the Firearm rule.",
    "High Caliber": "This weapon's Strength die is the last that must be removed from the attack if the target is within effective range.",
    "Hitman 🦇": "During this model's activation, you may play the Objective: The Program, targeting an enemy model within 8\" as if it had Revealed a Suspect.",
    "Hockey Gear": "Enemies attacking this model never benefit from the Sharp weapon special rule.",
    "Hold 'Em Still": "When targeting an Outnumbered model, you gain +1 to hit and Bleed 2.",
    "Hold Breath": "When performing a Ranged Attack, this model may spend any Defense Marker it has to gain a +1 bonus to the attack dice rolls, and increase the natural score required for a Critical Hit on the Strength die by 1 for each marker spent (so, if the model spends 2 markers, it gains +2 to hit and scores a CRT on a 4+ instead of a 6). In addition, in any activation in which this model does not perform a Movement and Attack action, it may immediately gain up to 3 Defense Marker, but suffers the Enervating X effect (where X is equal to the number of markers it gains).",
    "Holiday": "When a model is removed as a Casualty within 8\", this model may immediately Place a friendly Suspect in contact with this model or with a friendly model with Alias: Attorney Harvey Dent.",
    "Homo Magi": "This model counts its Willpower value as 1 point higher when taking Magical tests.",
    "Honor": "Any enemy model may Challenge this model by spending a Special Action within 8\" of it. This model can Accept or Decline the Challenge.\nIf Accepted, this model and that model are Challenged. If Declined, this model suffers Enervating (3).",
    "Honor Among Thieves": "Once per game, during this models activation, you may return a Cranial Bomb Activated card from your hand to the Cranial bomb pile.",
    "Horde": "This model can be recruited up to four times in a crew, regardless of its Name.",
    "Hover": "At the start of this model's activation, you may place a Hover marker on the character card until the end of the round, to show that it is in Hover mode. While a model is in Hover mode, it can only be hit in Melee on a natural result of 6. A model with a Hover marker cannot benefit from the Cover rule and cannot perform the Manipulate action.",
    "Huge": "This model ignores up to 2 ★ Damage per enemy Attack.",
    "Hunter": "When this model is going to make an Attack action against a model that is already activated this round, it may perform a free Special Action before or after resolving the attack.",
    "Hypnotic Radio Waves 🦇": "Choose an enemy model with Rank Henchman (not with Rank Vehicle) within 5\" and line of sight. The target immediately suffers the Hypnotize Status.",


  // I
    "I Am Chaos 🦇": "Discard an Objective card at random. The opponent must show you their Objective card hand. For each enemy model within 8\" and LoS, choose one of those cards – the opponent must Discard it.",
    "I Believe in Harvey Dent": "If this model is the Boss, friendly models with Rank Henchman must roll a die or flip a coin at the start of their activation. If the result is even/heads, that model gains 1 free Effort until the end of the round. If the result is odd/tails, it suffers Enervating 1.",
    "I Bought This Place": "When a friendly model with Rank: Free Agent starts its activation, you may spend 1 Business Counter to allow that model to benefit from this model's Inspire trait as if it had Rank: Henchman.",
    "I Know What I'm Doing": "One use only. This model can ignore the result on the Paradox table. The Speed Power still fails.",
    "I Never Asked For This": "You cannot play Objective and Resource cards during a friendly models activation in any round that they score a natural double-1 for any roll. Ignore this rule if a friendly Robotman model is within 8\" of that model.",
    "I See The Light 🦇": "Search your Objective deck for an Objective card named I See. Reveal it and add it to your hand.",
    "I Will Break You": "When you recruit this model, choose one of the following options: • Bane gains +3 Extra Venom Doses and may apply them to a friendly model within 4\" during his activation. • Bane gains Exhaustive Planner and +1 Willpower. • Bane Gains Close Combat Master.",
    "I’m Batman": "Once per round, during this model's activation, you can discard an Objective card with type Menace or Violence and target a model within 8\" and LoS, the target suffers the Scared status.",
    "Ice Age": "Once per game chose one: Search in your objecive deck for a card with the name Searching for Nora and put it in your hand, or, Move all friendly models with the \"Cold Acclimation\" trait within 4\" of Mr Freeze or a frozen suspect 4\".",
    "Ice Flash 🦇": "Target a model within 10\" and LoS. That model must pass an Endurance roll, or suffers the Freeze Status. If it passes the Endurance roll, reduce its Defense skill by 1 and gain -2MOV until the end of the round.",
    "Ice Queen": "Friendly models with Affiliation: Mr. Freeze gain 1 free Effort while they are within 4\" of a Frozen Suspect and/or this model.\nIn addition, once per round as a free action, you may target a Suspect within 4\". That Suspect becomes a Frozen Suspect.",
    "Ice Template": "When an attack or weapon uses an Ice Template, place the explosive template completely within the Effective range and in line of sight, targeting at least 1 enemy model. Make a Strength roll (following the usual rules and applying the special rules of the weapon) against all models affected by the template.\n\nAffected models may suffer additional effects depending on the exact weapon used (for example, CRT: Freeze).\n\nIce templates do not pass through solid objects like walls – see the rulebook.\n\nThe Ice template is not removed at the end of the attack action, instead, at the end of the Recount phase, remove all Ice Templates.\n\nAny model moving through or into contact with the template suffers Impaired Movement and must make all its moves in a straight line (unless they ignore Impaired Movement (whatever they ignore)).\n\nModels with the Speedster trait that come into contact with the template lose 1 Speed Power counter from their personal reserve.",
    "Iceberg Lounge": "If this model is your Boss, allows the crew to purchase 1 additional equipment from the Iceberg Lounge list.",
    "If You're Good at Something": "The Explosive Teeth markers inflicts an additional ★ marker. In addition, when this model places a Suspect, you may place it within within 6\" instead of in contact.",
    "I'm Batman": "Once per round, during this model's activation, you can discard an Objective card with type Menace or Violence and target a model within 8\" and LoS, the target suffers the Scared status.",
    "I'm Vengeance": "Vengeance: When this model makes an Effort during an Attack action it adds an addition Attack die. Once you have scored 8 Objective cards this model loses Vengeance and gains Hope. Hope: All friendly Henchman that start their activation within 8\" of this model are treated as though it were within range of the Inspire trait.",
    "I'm a Symbol 🦇": "Target another friendly model without the Cop trait in Line of Sight. That model moves 4\" and may immediately place a Suspect.",
    "Immortal": "Removing this model as a Casualty cannot fulfill the requirements of an opponent’s Objective card.",
    "Impetuous": "If this model Attacks the model that was closest to it when it activated, it gains 2 additional attack dice, but suffers -1 to its Defense skill until the end of the round. If two or more enemy models are equally closest, attacking either of them will trigger this trait.",
    "In The End": "Once per model Activation, while this model is in the gaming area, you may spend (X) Business Counters to gain 1 of the following bonuses: • (1) Flip face up a face down Underworld King card immediately. • (2) At the start of a friendly model activation, move up to 4\" a friendly model with Rank ♘ within the Inspire range. • (X+2) Add X additional dice to a friendly model with Rank ♘ within Inspire range that is going to perform a Melee Attack roll or Defense roll, declare it before the Efforts are declared.",
    "Incorporeal 🦇": "This model is immune to ★ Damage until the end of the round. In addition, the model can move ‘through’ other models and scenery as though they weren’t there, but still cannot end its move overlapping another model or inside solid scenery.",
    "Incorruptible": "This model can only be included into a Crew with a Boss that have its same affiliation.",
    "Induction": "Once per round, when this model places a Suspect and/or when it affects an enemy model with the Inspire Fear trait you may place a Fear card into the Objective deck.",
    "Inertia": "Until the end of the round in which this model had performed a Movement action, it adds +2 to the Strength rolls and may reroll it.",
    "Infected": "If the target suffers Damage as result of an Attack made with this weapon, becomes Infected.",
    "Informer": "As long as this model is not KO, the crew gains one additional Pass on Activation (not cumulative).",
    "Inside Man": "During this model's activation you may play the Objective: Pinched Mobster as if this model had taken damage from an attack. Instead of placing the Event in contact with this model, place it in contact with an enemy model within 8\" and LoS.",
    "Insidious": "Enemy models within 4\" of this model receive +1 to their Willpower roll results (cumulative up to 3).",
    "Insider Agent": "Sleeper Agent's markers within 8\" of this model are moved towards the model of your choice.",
    "Inspiring Presence (X)": "When this model is within 8\" of a model with Alias: (X) is treated as though it were within range of it's Boss's Inspire trait.",
    "Instinctive Shooting 🦇": "This model immediately Move 4\" and then may perform an extra Ranged Attack action that ignores the modifier Move before Attacking.",
    "Intel Support (X)": "This model cannot be targeted/affected by an attack, and does not suffer Statuses or Damage and cannot perform Unarmed attacks. It is only considered in contact with other models during its activation. When this model performs a Move, it is instead a Place. This model cannot use the Sewers in any way. When an enemy model removes 1 of your Suspects, place 1 Disruption token on this model. When this model has X Disruption tokens remove the tokens and the model from the gaming area. In any subsequent Raise the Plan phase, you may reduce your Audacity markers by 1 during that round to return this model to play, placing it anywhere on the gaming area. This model is considered a Casualty/KO when it is removed from the game for the purpose of scoring a card.",
    "Intense Fear": "At the end of step 6 of Prepare the Game, you must add a card from your Fear pile to your Objective deck.",
    "Intensive Treatment": "When this model targets a friendly model with the Nightmare trait using the Subliminal Suggestion trait, the targeted model may Move 4\" before making the Attack.",
    "Interdimensional Virus": "At the start of this models activation roll a D6. On a 1-4 this model gains a free Ranged Attack action. If this action is not used suffer 🩸★.",
    "Interrogation": "After this model resolves a Melee Attack action, the target of that Attack action performs a Willpower roll. If it fails, the opponent must show you their Objective card hand. Choose one of those cards and the opponent must discard it. You can search into your Objective deck for a card that shares the Type of the card discarded by the opponent.",
    "Intimidation 🦇": "Target an enemy model (not a Vehicle) within 8\" and line of sight. The target must pass a Willpower roll or be unable to perform Melee Attacks this round.",
    "Intimidate 🦇": "Target an enemy model (not a Vehicle) within 8\" and line of sight. For the rest of the round, the target cannot perform Special Actions unless it Efforts 2 ★, and to Effort during a Willpower roll must take 2 ★ instead of 1.",
    "Investigator": "This model places an additional Counter when Revealing an enemy Suspect for the purpose of Objective cards.",
    "Invaluable": "When this model becomes a Casualty, the opponent gains 1 Resource point.",
    "Invulnerability (X)": "When this model takes damage from an attack or special rule, reduce the total number of Damage markers it receives by (X). In addition, this model is immune to CRT and ignores all Statuses except any it has “Weakness to”.",
    "I’ve Caught You": "This model places an additional Counter for the purpose of the Patrol Report Objective cards.",
    "Inspire": "All friendly models with Rank Henchman that start their activation within 8\" of this model gain 1 extra Manipulate action (not cumulative).",
    "Inspire Fear 🦇": "Target an enemy model (not a Vehicle) within 4\" and LoS. The target must take a Willpower roll. If this roll is failed, consult the following chart (the results are cumulative): Fail by 1-2: Target suffers the Scared Status. Fail by 3-5: Target suffers the Terror and Slow (4) Status. Fails by 6 or more: Target receives 🩸 damage equal to half its Endurance (rounding down).",
    "It’s Mine": "Enemy models cannot Reveal your Suspect markers while the marker is within 2” of this model.",


  //J
    "Jack of Spades": "When a friendly model with the Spades trait within 8\" and LoS to this model Sets a Suspect, you may Discard a card.",
    "Joker's Gas 🦇": "All other models within 4\" and LoS suffer Enervating (1) and the Poison Statuses, with the Gas rule.",
    "Joy for the Victory": "Friendly models within 8\" gains 1 Free Effort while performing Willpower rolls. In addition, inspired friendly models that score an Objective card during their activation may immediately remove 2 Damage.",
    "Judgment": "When this model makes an enemy model KO, flip a coin or roll a D6: if the result is ‘heads’ (or an even number) remove the enemy model as a Casualty.",
    "Juggernaut": "This model can make an Effort to activate this trait. During this round, when this model completes a Movement action you may inflict the Push (2) to all models in contact. In addition, this model gains +1 to its attack dice rolls against models contacted in this way this round.",
    "Jump Up": "Whenever this model would suffer the Knocked Down Status, it may first immediately make an Effort to remove that Status.",
    "Junk Hoarder 🦇": "Discard a card. Depending on the type of the card: • Control: Place a Suspect within 4\". • Menace: Move 4\" a friendly model within 4\". • Violence: A friendly model within 4\" gains +2 Attack Marker. • Protection : A friendly model within 4\" gains +2 Defense Marker.",
    "Justice": "When a friendly model is removed as a casualty, an enemy model suffers the Quarry (1) Status.",

  
  //K
    "Kaos Agent": "All friendly models with Rank Henchman gain the Trickster trait for the duration of the game. You do not have to place all of your Audacity Activation markers during the Raise the Plan phase (or any, if you wish). Instead, whenever a friendly model with the Trickster trait activates, you may give it one of your remaining Audacity Activation markers.",
    "Kapow!!! 🦇": "Until the end of its activation this model's Melee Attacks gain +1 to attack dice rolls and Blunt 3.",
    "Kevlar Vest": "Whenever this model takes Damage from an enemy attack or special rule, reduce the total number of Damage markers it receives by 1, to a minimum of 1. You may choose which marker is ignored.",
    "Kill Them! 🦇": "Target a friendly model with Rank Henchman within 4\" of this model (but not the activated model itself). Target model gains +2 Attack Marker.",
    "Kinetic Tornado": "Cost: 2 Paradox: 6+\n\nPlace a Spray template in contact with this model. All models affected by it suffer a Push (5) and an auto hit with a Str 4+ and damage ★★. This can be dodged as a ranged attack",
    "King of Spades 🦇": "Another friendly model with the Spades trait performs a Move 4\" and then a Tactical Action immediately. When resolved continue with this model's activation.",
    "Kite": "While performing a Move action, this model increases the maximum distance it can move by 4\" for each Suspect within 4\" (measured once at any point during the Move). In addition, this model can move in any direction (including vertically) over obstacles and Difficult Ground without extra cost or penalty.",
    "Kobra Armor": "Once per Action, this model may remove 1 Faith to ignore up to 2 Damage markers received by that Action.",
    "Kobra Cultist": "Each time this model successfully score any number of hits against an enemy model with an attack, add 1 Faith Point to your pool.",
    "Kobra Swarm": "This model cannot be recruited, is added automatically to the crew when you hire a model with the Void Priest trait. This model gains +1 Defense skill against Ranged Attacks.\nSwarms do not fulfill enemy Objective criteria for making models KO or removing them as Casualties. If this model is made KO, remove it as a Casualty.\nIf this model is in play when a friendly model Sets a Suspect, you may place this model in contact with it.",
    "Knowledge is Power": "During this model's activation, it gains a Free Special Action if you have looked at the opponent's deck or hand this Round.",
    "Kowabunga! 🦇": "Until the end of this round, This model does not take Damage, nor can it be removed as a Casualty, as a result of Falling. In addition, if this model ends a movement action in a lower position than it started, it can immediately move an extra 4\" and unarmed attacks gains Devastating until the end of the turn.",
    "Kryptonian (X)": "A model with this trait gains a number of rules determined by the trait’s level (X), see below.\n1: Fast, Invulnerability/1, Natural Immunities.\n2: Fast, Invulnerability/2, Natural Immunities, Super Jump.\n3: Fast, Fly, Invulnerability/3, Natural Immunities.\n4: Fast, Fly, Invulnerability/3, Natural Immunities, Tough Skin.\n5: Fast, Fly, Hover, Flying High, Invulnerability/4, Natural Immunities, Tough Skin.\n6: Fast, Fly, Hover, Flying High, Invulnerability/5, Natural Immunities, Tough Skin.\nIf the game is affected by the Day rules, the Invulnerability rule is improved by +1 and all the levels gain the Regeneration trait.",


  // L
    "Lantern": "A model with this trait can activate it at any time during its activation. The model counts as a Light source with a radius of 2\" until the end of the round.",
    "Large": "This model ignores up to 1 ★ Damage per attack suffered.",
    "Laser Sight": "Target one model in line of sight. The target counts as being under the effect of Lights until the end of the round, or until the target moves or changes its current position.",
    "Lasso of Persuasion 🦇": "One use only. Target an enemy model within 2\". That model suffers the Hypnotize Status.",
    "Law Interpretation": "At the start of the game, you can make an Interpretation deck with up to 3 Objective cards that you could have originally added to your deck. When this model places a Suspect, you can remove 1 card from your hand from the game, and then add 1 of the cards from the Interpretation deck to your hand.",
    "Lazarus Pit Owner": "Once per game, at any time you can search on your deck for a Reclaim the Lazarus Pit objective card and add it to your hand.",
    "Leading From Shadows": "If this model is the crew Boss, while this model is not on the gaming area (and not removed as a Casualty), its Inspire rule affects all the gaming area.",
    "Leading From The Shadows": "If this model is the crew Boss, while this model is not on the gaming area (and not removed as a Casualty), its Inspire rule affects all the gaming area.",
    "Leading the Way": "When a friendly Robotman or The Chief model is in play and not KO, you can discard X Objective cards from your Accomplished Objectives pile during that model's specific activations to buy Doom Patrol-specific Rules (where X is the Cost of the Rule), and apply it immediately. When using this rule, the cost of Resignation Rule is reduced by 1 point if used by The Chief, and the cost of Situation Controlled Rule is reduced by 1 point if used by Robotman. The same Rule cannot be played more than once per round. DOOM PATROL RULES: I Need Support: Value 2, Phase ? As soon as a friendly model completes its activation, you can move another friendly model up to 4\" towards that model. Resignation: Value 2, Phase ? Once per game, choose one model: that model ignores the I Never Asked for This rule this round. Situation Controlled: Value 2, Phase ? Once per game, choose one model: that model ignores the Losing the Control rule this round. Intensified Problems: Value 2, Phase A The Strange Things Happens rule is also triggered by a natural double 5 this round. When this Strategy is employed by the Leading the Way rule, its cost is increased by 1. Under Pressure: Value 3, Phase ? Target friendly model gains the Living Legend rule until the end of the round.",
    "Leadership": "Other friendly models within 8\" and LoS gains 1 Free Effort while Attacking and Defending.",
    "Legendary Solo": "Friendly models within this model's Inspire range gain 1 free Effort. Enemy models within this model's Inspire range must make an Effort or cannot benefit from the Inspire trait.",
    "Let’s Ride": "Once per round, choose another model within 6” and line of sight. If the target is a friendly model, it gains two Attack Markers or Defense Markers. If the target model is an enemy, it immediately suffers the Enervating 2 effect.",
    "Let's Cool It For Now": "Once per round, after this model places a suspect, target another model within 4'' of that suspestc, it gains +1 or -1 Defense Modifiers Markers",
    "Let's Ride": "Once per round, choose another model within 6\" and line of sight. If the target is a friendly model, it gains two ★ or 🩸. If the target model is an enemy, it immediately suffers the Enervating (2) Status.",
    "Lieutenant (X)": "If the crew contain a model with Alias (X), this model reduces its funding cost to 0 and all friendly models with Rank ♘ that start their activation within 8\" of this model are affected by the Inspire trait of the friendly model with Alias: (X).",
    "Life Growth 🦇": "Target a friendly Suspect within 8\" and LoS, and a friendly model with the Plant trait in play. Place that model in contact with the targeted Suspect and remove it.",
    "Light Armor": "Enemy models roll 1 less attack dice when targeting this model.",
    "Light Radiance": "When this model uses the Medic trait it affects all friendly models within 2\".",
    "Like Flies to Me": "When this model is the target of an Attack action, the attacker must treat this model's Defense value as equal to the attacker's Strength value.",
    "Limited Attack": "An attack with this weapon inflicts its damage only once, regardless of the number of successful hits and does not inflict Knocked Down when scoring a CRT",
    "Limited Equipment": "This model can only purchase up to 1 Equipment.",
    "Listen To The Coin": "At the start of the round, gain the following based on which Coin card is in play.\n-Twisted Coin: At the end of the Execute the Plan phase, target up to 2 Suspects and Move 4\" them.\n-Good Coin: Gain 1 Resource point this round.",
    "Living Arsenal": "Each time this model performs a Ranged Attack, choose one of the following special weapon rules to apply:\n• Medium Range (replace existing Range rule) and Scope.\n• Explosive (reduce RoF to 1) and Anti-Tank.\n• Assault and Red Dot.",
    "Living Legend": "This model can be activated twice each round. Each activation is independent of the other (and cannot be made consecutively unless there is no other choice). If the model has an Audacity marker, it is only used for one of its activations. In addition, once per round, when a trait specifies this model as a target, you may cancel the use of that trait. A crew that includes a Living Legend loses one Pass on Activation each round (if applicable).",
    "Long Guns": "If this model is the Boss, then at the start of the first Raise the Plan phase you may select up to three friendly models with Rank Henchman with ranged weapons with the Short Range and Firearm rules. Those weapons replace the Short Range rule with the Medium Range rule for the duration of the game.",
    "Lord of Business": "If this model is the Boss, its crew has an extra $500 in its Funding stash. In addition, when a friendly model plays the Valuable Commodities card, you may place an additional Loot marker in contact with another Suspect marker.",
    "Lord of the Sewers": "This model may deploy in contact with any Sewer marker. In addition, this model's crew generates 1 extra Sewer marker. Once per game, this model can continue (or start) its Movement action when using a Sewer.",
    "Losing Control": "If a friendly model named below scores a natural double-2 any time during the round, immediately apply the listed effects:\n• Beast Boy: Any Active upgrade card this model has becomes Disabled.\n• Crazy Jane: Immediately draw a new Personalities card. This card replaces the existing one.\n• Elasti-Girl: Lose the Stretching trait until her next activation.\n• Negative Man: Cannot use the Minor Explosions Weapon and the Radioactive Soul-Self trait for the remainder of the round (if it is active, its effect ends immediately).\n• Robotman: This model cannot take more actions this round unless it first spends an Action.",
    "Luck": "Once per round, this model may reroll any single die that it has rolled, for whatever reason.",
    "Lunatic Laugh": "Until the end of the round, enemy models within 8\" and LoS roll 1 fewer die when making a Defense roll.",
    "Lights Out 🦇": "Turn Off a Lamppost within 4\" or Turn On it (it is no longer considered Turn Off and Illuminates as usual).",


  // M
    "Made Man": "If this model inflicts a KO on an enemy model, it counts as having Revealed either a friendly or enemy Suspect with a Manipulate action during its activation.",
    "Magical Power (X)": "The X of this trait is equal to the number of Magic Counters this model may assign to itself in a round to Cast a Spell (a spell is marked with the Spell word). The Magic Counters assigned to each model, must be placed where you can remember that model has it. Each Spell will tell you which action its needed to be spended to Cast the Spell and the number of Magic Counters it assign to your character. If in a Round among all models with Magical Power (X) has assigned at least 6 Magical Counters there is a Magical Conflux. If there is a Magical Conflux each Magical Counter on a model inflict to it 1 Damage. All Magic Counters on a model are discarded at the end of the Recount phase.",
    "Magic Tattoos": "This model is immune to the Steal and Fire Statuses.",
    "Magic Tricks": "Once per round, when an enemy model places a Suspect within 8\" of this model, you may place a friendly Suspect in contact with that model following the usual rules.",
    "Make Them Perfect": "This model's Attack actions gain the Push (4) Status, but the direction of the Push must be directly towards a friendly Professor Pyg model if he is in play.",
    "Manipulative": "When this model is in your Crew, you may redeploy up to two friendly models after normal deployment but before the game starts. In addition, at the end of each Raise the Plan phase you may nominate one model to take a Willpower roll. If this roll fails, the target model must be the last model in its crew to be activated that round.",
    "Martial Artist": "This model ignores the penalty for being Outnumbered in combat.",
    "Martial Expert": "This model causes a Critical on a Strength die natural result of 4, 5, or 6, not just 6 (if the result is not enough to trigger also a hit, this trait only causes the Critical effect).",
    "Martyrdom": "Every time a friendly model is removed from the game, place a 🩸 marker where you can see it. When this model is going to be removed as a Casualty, you can look at the first X cards from your deck, score immediately 1 of them. Shuffle the deck. This model does not suffer ★ during the Recount phase for the Faith rule and the Faith counters are not removed, instead it suffers X 🩸 - the number of Faith counters already in play (X is equal to the double the Round number).",
    "Master Criminal": "All friendly models with Rank Henchman with the Criminal trait benefit from a +1 bonus to their attack dice rolls when making Attacks.",
    "Master Fighter": "This model gains a +1 bonus to its attack dice rolls when performing Unarmed Melee Attacks.",
    "Master Marksman": "This model can reroll failed attack dice rolls when performing Ranged Attacks.",
    "Master of Stealth": "When this model is under the effect of the Night rule, it can only be seen by enemies within 6\" instead of the usual range. It is still subject to rules that aid detection, such as Lights, Total Vision, etc. When this model benefits from the Sneak Attack trait, it gains +1 to its attack dice rolls.",
    "Master Torturer": "If this model is not suffering KO, enemy models within 6\" suffer -1 to its Willpower value when performing Willpower rolls. In addition, when a friendly model within 6\" would perform a Melee Attack action and removes an enemy model as a Casualty or inflicts KO as a result, you may choose not to remove the targeted model from play or inflict KO. The opponent immediately removes up to 3 damage markers. Then you may move 1 player marker 6\".",
    "Mastermind": "If this model is in play and not KO, its controlling player gains +1 to the Take the Lead roll.",
    "Mayor Cobblepot": "You start the game with 2 Business Counters.\nIf this model is hit by an enemy attack (any type), you may Spend 1 Business Counter to nominate a friendly model within 4\" and LoS (not a Vehicle) to take the attack instead. Resolve any Damage and/or Status against the nominated model.\nIn addition, scored Secret Equipment Bases Objective cards provide 3 VP each (instead of 2) even if this model is not in the Gaming Area.",
    "Mechanical Mount": "This model gains +4” to its basic move distance, but can neither Jump nor Climb.",
    "Medic 🦇": "This model may remove up to 2 damage markers from a friendly model in contact (not Vehicle) with at least 1 Damage marker of any kind. If this ability is used to recover a model that is yet to activate that round from KO, the opponent gains a Pass marker.",
    "Meditation (X)": "At the start of this model's activation it may make up to (X) Efforts. The model gains (X) Magic Points until the end of the round. These points can exceed the maximum that a model can generate and spend as detailed by the Magical Power trait.",
    "Medium Armor": "Enemy models roll 2 less attack dice when targeting this model.",
    "Meet Goliath!": "This model can only be recruited in a crew or Team containing a model with Name: Damian Wayne. However, this model can never be recruited to a OWLS crew. This model does not reduce its Effort Limit due to accumulated Damage and it may make 2 free Efforts when performing an Attack, and when Defending.",
    "Menace 🦇": "Enemy models must spend one additional Action (of its choice) to choose this model as the target of an Attack. This effect lasts until the end of the round.",
    "Mental Dominance 🦇": "Once per round, this model may target an enemy model within 4\" and line of sight. That model must take a Willpower roll. If it fails, you can perform one Action with that model, out of sequence, temporarily treating it as though it was one of your own models. You may not perform any action that could cause Damage to the target model (such as Falling, or deliberately positioning an Explosive template so it is affected, etc).",
    "Mentoring": "This model can only purchase one piece of Equipment. If its crew contains a Leader or Sidekick with Affiliation: Bat Family, this model gains the Boy Wonder and True Love: Bruce Wayne traits, and any model with Name: Bruce Wayne in the same crew gains True Love: Damian Wayne until the end of the game.",
    "Mercenary": "You can only recruit this model in a League of Assassins crew if a model with Name: Bane is also included in the crew.",
    "Metabolize Wounds (X)": "Draw X Speedforce cards to activate this trait. When activated, remove 3 Damage from this model.",
    "Meow": "When this model places a Suspect, it may also be a Cat marker (you may have up to 3 in play at once). When this model starts its activation, it may be placed in contact with a friendly Cat marker, before removing that marker. During this model's activation, you may remove a friendly Cat marker to reveal an enemy Suspect within 8\" of that marker.\n\nIf this model is removed as a Casualty or suffers KO during an enemy model's activation, you may place this model in contact with a friendly Cat marker, and ignore the Attack/Status. Then, remove that Cat marker.",
    "Military Teamwork": "A friendly model performing an Attack against an enemy in contact with this model gains +1 to its Attacks skill for the duration of the Attack.",
    "Military Tradition 🦇": "Other friendly models with the Veteran trait within 8\" can move up to 2\" immediately.",
    "Millennia-Old Roots": "The action area radius is increased to 6\".",
    "Millionaire": "This model's crew gains an additional $400 Funding.",
    "Mind Blast 🦇": "Target a model (not a Vehicle) within 8\" and line of sight. The target must pass a Willpower roll or receive 🩸🩸 damage.",
    "Mind Control 🦇": "Choose an enemy model (not a Vehicle) within 5\" and line of sight. The target immediately suffers the Hypnotize Status.",
    "Mind Control Device 🦇": "Choose a Suspect marker within 8\". Target a model within 4\" of that Suspect marker. That model immediately suffers the Hypnotize Status. Remove that marker.",
    "Mind Control Substance": "When this model is recruited to your crew, friendly models with the Rank Henchman cannot have their Willpower value reduced by any means, and during the Recovery phase they recovers automatically from KO.",
    "Mind Trick": "After a model within 8\" of this model reveals a Suspect, you may move one Suspect in play up to 4\".",
    "Mindless Monster": "At the start of this model's activation target the closest enemy model. If the first action this model performs is a Movement action and it ends in contact with that enemy model, perform a free Attack action against that model.",
    "Mine 🦇": "Once per turn when this model places a Suspect it may be designated a Mine marker (it is still a Suspect). When a model moves within 2\" of a Mine, immediately roll 1D6 and remove the Mine. On a result of 3+ that model suffers 🩸🩸.",
    "Minion (X)": "This model can be hired up to X times in a crew, regardless of its Name.",
    "Mixed Combat Style 🦇": "After this model performs an Attack action it can perform an extra Attack action (of a different type from the first) during the same activation.",
    "Mob 🦇": "Target a friendly model with the Mobster trait that is within the range of this model's Inspire trait. Immediately perform a Ranged Attack action or a 4\" Move followed by a Melee Attack action with that model.",
    "Mobster": "When attacking an Outnumbered model in close combat, this model rolls an additional attack die.",
    "Molecular Control (X)": "When this model performs a movement action, can draw up to X Speedforce cards to ignore terrain elements (Can pass through walls or buildings, but cannot end its movement inside one).",
    "Molecular Vibration": "Cost: 3 Paradox: 5+\n\nWhen successfully hitting an enemy model, that model must take an Endurance roll. If it fails it cannot move or be placed until the end of the round",
    "Molecules 🦇": "Target an enemy model within 4\". That model must take a Willpower roll. If it fails, it suffers the Hypnotize Status.",
    "Moment of Glory": "If this model doesn't have an Audacity marker, at the start of its activation may take an Effort to count as having it for that activation.",
    "Monitoring Device 🦇": "Until the end of the round, this model gains Total Vision and its ranged weapons gain Remote Controlled.",
    "Moral Compass": "This model cannot attack KO models.",
    "Mortal Kiss 🦇": "If this model successfully performs at least 3 hits against a model (not a Vehicle), remove the target model as Casualty.",
    "Motion (X)": "When using this weapon, if any hits are scored the wielder may immediately Move X''.",
    "Movement Boost Bonus": "A model with a +2 Movement Boost Marker adds a number of inches to its basic move distance for its next Movement action, equal to value on the bonus. These bonuses aren't cumulative, when a model receives a bonus with a higher value, it replaces the lower value bonus.",
    "Movement Boost Penalty": "A model with one -2 Movement Penalty Marker deducts a number of inches from its basic move distance for its next Movement action, equal to the value on the bonus, to a minimum of 0. These bonuses aren't cumulative, when a model receives a bonus with a higher value, it replaces the lower value bonus.",
    "Mud": "Enemy models in contact with this model that wish to move must spend a Special action as well as a Movement action. In addition, this model’s attacks gain the Slow 4 effect.",
    "Multi-Purpose Pills 🦇": "Place the Explosive template completely within 8\". Choose one: - Each model affected by it suffers 1 🩸. - Each marker affected by it is Moved 4\".",
    "Multifire 🦇": "When using a ranged weapon, this model gains +2 attack dice. The model cannot move in the same round that it uses this ability.",
    "Multitask": "This model chooses one of the following options before the game begins:\n• Explorer: Gain the Undercover trait and +2 basic move distance.\n• Hacker: Gain +1 Willpower. Also gains the Computer Intrusion trait.\n• Defender: Gain +2 Endurance. Also gains the Force Field trait.\n• Fighter: Gains +1 Attack, +1 Defense and the Claws trait.",
    "Multiverse Teleportation Device": "This model may not be deployed as normal at the start of the game. Instead, at the start of the Raise the Plan phase of the second round, place this model anywhere on the board (but not inside a building or similar enclosed space).",
    "My Idol!": "This model can only be recruited if a model with the Alias: Zur-En-Arrh Batman is part of the crew. In addition, while a friendly model with Alias: Zur-En-Arrh Batman is in play and not KO, this model gains +1 Willpower.",

  // N
    "Narcotic Dose (DOSE)": "A model may use a Narcotics Dose at any time during its activation. If it does so, the model gains the Desensitized trait until the end of the round.",
    "Natural Immunities": "This model cannot be affected by the Blind, Poison or Steal effects.",
    "Nature's Arm 🦇": "Until the end of the round, This model may place or reveal a Suspect marker within 4\" and LoS instead of in contact. An enemy model in contact with that suspect increases the Slow Status value by (2), unless it doesn't have it, then it suffers the Slow (2) Status.",
    "Necromancy": "This model can use Necromancy Spells. In addition, once per game during its activation this model can spend 2 MPs to inflict 🩸 Damage to another model in contact, and then remove 1 Damage marker from itself.",
    "Negative Speed Force": "While this model is in play, the Speed Force Pool maximum is reduced by 2.",
    "Never Do It For Free": "This model's crew gains an additional $400 Funding.",
    "New Laser 🦇": "Target a model within 8\". Roll a Strength 2+ die. If successful, the target suffers 🩸🩸 and the Scared Status.",
    "Night Vision": "This model ignores the Night rule.",
    "Nightmare": "At the start of a Nightmare's activation, you may place it in contact with a friendly Suspect. A Nightmare can only be Move or being Placed by this rule.\nThis model is always considered an active model and is inside the gaming area so, it may receive Audacity even if it is not in play.\n• If a Nightmare gets Knocked Out, immediately remove it as a Casualty.\n• When a Nightmare is removed as a Casualty, it can be returned to play again in a subsequent round, with its usual rules, removing all Damage and Statuses suffered previously by that Nightmare.\n• Nightmares have a 4\" action zone radius. Within that radius, Nightmares are able to attack in Melee (no contact is needed), and may perform the Manipulate action.\n• Nightmares cannot Place/Reveal Suspects more than once during its Activation.",
    "No Mercy!!!": "All friendly Henchmen add the Bleed 1 effect to their Attacks.",
    "No More Lies": "During the activation of a friendly model with the Riddler Followers keyword, you may remove a friendly Suspect within 4\" of that model. If you do, during this and the subsequent activation, the opponent cannot play Objectives as Resources.",
    "Non-Lethal Ammo": "When this model attacks non-Vehicle models with its ranged weapons, all 🩸 damage becomes ★ damage.",
    "Not Him": "When this model suffers Damage that causes it to suffer KO or be removed as a Casualty, you may place it in contact with a friendly model within 8\" that share a Keyword with this model. The friendly model suffers that damage instead.",


  // O
    "Objection!": "Once per round, you may cancel the use of an Objective card used as a Resource with a X value (equal to double its VP) if this model has the same number of Suspects within 8\", and then the opponent may pick and discard 1 Objective card from your hand.",
    "Objective Keyword - Burn X": "You can play this Resource by paying X Resource points to discard this card from your hand, placing it at the bottom of your Objective deck.",
    "Objective Keyword - Chaos": "When you score this Objective, both players discard an Objective card at random.",
    "Objective Keyword - Exception (In Play)": "This Resource is not played in the usual way. This Resource may only be used while this card is in play as an Objective and does not be discarded when used.",
    "Objective Keyword - Exception (Scored Pile)": "This Resource is not played in the usual way. The effect of this Resource applies while this card is scored.",
    "Objective Keyword - Exception (When Scoring)": "This Resource is not played in the usual way. The effect of this Resource is used when this card is scored.",
    "Objective Keyword - Gut Feeling": "When you score this Objective, you may draw 1 additional Objective Card, then you must discard one of them.",
    "Objective Keyword - Limited": "Only 1 card with this name can be in play at a time.",
    "Objective Keyword - Loot": "A model in contact during its activation can pick it up and carry it. If they are removed from the board (casualty, sewer, any other Place), or made KO, place the loot within 1\".",
    "Objective Keyword - Opening": "If this card is included in your Objective deck, you must put it aside before the game starts. At the end of step 4 of Prepare the Game, you must play this card as an Objective. If a card with this keyword is going to be discarded, remove it from the game instead.",
    "Objective Keyword - Plot": "When this card is removed from the Play Area, discard all cards under it. If there is at least 1 card under it, you may Discard this card at any time.",
    "Objective Keyword - Shadow's Plan": "The Level of Shadow's Plan is equal to the number of friendly Suspects in play: 0-2 Suspects: Level 1. 3-5 Suspects: Level 2. 6-8 Suspects: Level 3.",
    "Objective Keyword - Talon's Prey": "Target an enemy model within 4\" of a friendly Owl marker and a friendly Suspect. Mark that model as Prey. Traits and Objectives refering to Prey only refer to enemy models marked as Prey. If this resource is used more than once this round, it increases its cost to 1 this round. Only one model can be Prey. If you mark a model as Prey and there is already another marked model in play, the previous model is no longer considered Prey.",
    "Objective Keyword - Timer X": "Place a numeric counter with a value equal to X. Reduce the value of the counter by 1 at the end of each subsequent activation.",
    "Objective Keyword - Trap": "This Recourse cannot be played as usual. When this card is revealed by playing it as a ?, resolve the effect. A resource resolved in this game doesn't go to the Spend Resource pile, if it is Scored it goes to the scored cards, if not, it is discarded.",
    "Objective Keyword - Vandalized!": "When you score this Objective, Use a counter to mark a Scenery Element, Lamppost, or Sewer within 4\" as Vandalized!. That is now considered a Vandalized element.",
    "Objectives? Puzzles Everywhere!!": "A crew that includes this model does not accomplish Objective cards following the normal rules. Instead, when a model that shares an Affiliation with this model places a Suspect marker, you must roll 1D3. Place a Number Counter on top of that Suspect marker with an equal value as the roll. At the end of the round, you score Objective cards that show the same VP value as the Number Counters on top of the friendly Suspect markers. Each Number Counter only accomplish 1 Objective card and then, is removed.",
    "Observation": "While this model is not activated this round, it gains +1 to its Defense rolls, while making an attack against an activated model this round, it gains +1 to Hit and Strength dice rolls.",
    "Obsessive (Mental Disorder)": "If this model selects the same target for all of its Attacks in a single activation, it gains +1 to the Strength die roll.",
    "Obstinate": "This model has 1 free Effort when Attacking, Defending and when taking Willpower rolls even if it reaches its maximum effort limit.",
    "Occultism": "This model can use Occultism Spells. In addition, once per game during its activation, the model gains +1 to its Defense value until the end of the round.",
    "OCD (Mental Disorder)": "If this model selects the same target for all of its attacks in a single activation, it gains +1 to its attack dice rolls.",
    "Offensive Defense": "When this model blocks at least 1 hit from a melee attack, then after resolving the action the attacking model suffers ★★ damage and is Pushed 2” (in a direction of your choice).",
    "Once Per Game": "Many traits contain these sentences at the beginning of their description. This simply means that the model may use this trait only once per game, once per round...",
    "Once Per Round": "Many traits contain these sentences at the beginning of their description. This simply means that the model may use this trait only once per game, once per round...",
    "One of the Boys": "This model benefits from the Boss's Inspire rule exactly as if it held Rank Henchman.",
    "One Shot Gun 🦇": "One use only. Choose an enemy model within 8\" and line of sight. Roll a Strength 2+ die with Damage 🩸🩸, and Bleed 3. This ability is considered a Ranged Attack with the Anti-Tank rule, so all rules, traits (i.e. Line of Sight, Cover), and traits that affect Ranged Attacks.",
    "One Use Only": "Many traits contain these sentences at the beginning of their description. This simply means that the model may use this trait only once per game, once per round...",
    "One-Armed": "This model suffers a -1 penalty to its defense die rolls.",
    "Only 20% of Taxes! 🦇": "Target a model within 8\" and LoS. Make an opposed Willpower roll, if successful, choose 1 of the target's traits. Until this model makes this trait again, or is removed from the game, that model cannot benefit from that trait.",
    "Order 🦇": "Target another friendly model within line of sight. The chosen model can immediately place a Suspect marker.",
    "Order In The Court": "Friendly models affected by this model's Inspire rule gain the following based on which Coin card is in play.\n-Twisted Coin: Gain 1 free Effort when Attacking.\n-Good Coin: Gain 1 free Effort when Defending.",
    "Outlaw Field Commander 🦇": "Choose another friendly model within 4\" and line of sight. That model gains +2 ★ or 🩸.",

  // P
  "Painful Empathy": "Transfer Damage markers from another friendly model within 8\" and LoS to this model. If any Damage markers are moved in this way, this model gains +1 to its Attacks and Defense skills and +1 to its Strength rolls until the end of the round.",
  "Panda Costume": "This model must spend an Action (any type) to stand up. This model may do nothing else during that Action.",
  "Paramedic": "When this model places a Suspect, it can remove up to 2 Damage from a friendly model within 4\" (not Vehicle). If this ability is used to recover a model that is yet to activate that round from KO, the opponent gains a Pass marker.",
  "Paranoid (Mental Disorder)": "If this model has at least 1 Damage marker on its character card, then during the Raise the Plan phase it gains a 🩸.",
  "Parliament Of Flowers": "This model deploys as usual instead of using the Plants trait during Deploy Crews step. When a friendly model with the Plant trait within 8\" of this model performs a Manipulate action, it can suffer 2 🩸 to place a friendly Suspect. In addition, this model's Tendrils attack gains Reach +X and +X to Hit rolls (where X is equal to the number of another friendly models with the Plant trait within 8\" of this model).",
  "Perfect Creations": "If a friendly Professor Pyg is removed from the game as a Casualty, all friendly Dollotrons are removed as well. Dollotrons never count towards Objective requirements for being made KO or becoming a Casualty. If a friendly Professor Pyg within 4\" of this model and LoS is hit by an Attack (of any kind), this model can make an Effort to take the hit instead, and all the Statuses of that attack. Dollotrons can only be recruited in a crew that contains Professor Pyg.",
  "Performance": "If this model is in play and not KO, enemy models within 6” that wish to perform an Attack, or use 🦇 traits, must first take a Willpower roll. If they fail the test they suffer -1 to their attack dice rolls until the end of the round.",
  "Penguin Caller": "If you have less than 3 friendly Explosive Penguins in play you may place an Explosive Penguin within 2” of this model and in contact with a friendly Suspect marker. Then, remove that friendly Suspect marker. For each model with the Animal trait within 4” of this model, add +1” to the distance at which the Explosive Penguin may be placed. Finally, the opponent gains a Pass marker.",
  "Penguin Feeder 🦇": "Perform immediately a Movement Action with all the friendly models with the Expendable Penguin X trait.\nIn addition, when resolving the use of this trait, you may place a new friendly model with Alias: The Penguin (New 52) in contact and remove this model from the game.\nTransfer all Damage, Statuses, Audacity, and any Objectives that had targeted this model to the new model. If there were any unspent actions remaining, continue this activation using the new model. No Objectives may be scored as a result of this trait. *This model counts as Alias: The Penguin (New 52) Leader for the purpose of forming your Objective deck.",
  "Personalities": "At the end of each Take the Lead phase, shuffle all the Personalities cards and draw one at random. Apply the rules on that card to this model until the end of the round. This model cannot use its weapons unless it draws the Personalities card that allows it. In addition, if the opponent has 5 VP more than you, and/or this model has 3 or more Damage markers, you may draw 3 cards and choose one.",
  "Persuasive 🦇": "At the end of this model's activation, nominate any enemy model in line of sight that is yet to activate this round. That model can't use a Pass to ignore this rule. A model can't use this trait once per round.",
  "Pickpocket": "Once per Round, if this model is in contact with an enemy model suffering KO, you may look at your opponent's Objective card hand and Discard 1 card from it.",
  "Planning the Move": "All other friendly models with the Gotham City Siren rule in this model's crew gain the Primary Target trait until the end of the game.",
  "Plant": "Each Plant recruited to your crew grants you one friendly Suspect marker that may be placed anywhere on the board at the end of the Draw & Mulligan Objective Cards step of the pre-game sequence. Plants are not deployed as usual – instead, during a friendly model's activation, you may place one of your Plants in contact with a friendly Suspect and then remove that Suspect. Always are considered an activable model and inside the gaming area.\n• If a Plant gets Knocked Out, immediately remove it as a Casualty.\n• A plant may receive an Audacity marker even if it is not in play.\n• A Plant's basic move distance cannot be increased by any means.\n• Plants have a 4\" 'action zone' radius. Within that radius, Plants are able to attack in Melee (no line of sight or contact is needed), and may perform the Manipulate action.\n• Plants can only Manipulate to reveal Suspects.\n• Plants are immune to the Poison, Knocked Down, Hypnotize and Blind Statuses.\n• When a Plant is removed as a Casualty, it can be placed in play again in a subsequent round with its usual rules, removing all Damage and Statuses suffered previously.",
  "Play Nice!": "All friendly models with Rank Henchman in this model's crew gain the Bluff trait.",
  "Plead 🦇": "Choose one enemy model (not a Vehicle) within 4\" and line of sight. The target must pass a Willpower roll or be unable to attack this model this round.",
  "Pleasant Surprise 🦇": "Search into your Objective deck for a copy of Take Back What Is Ours or Informant card.",
  "Poison Catalyst 🦇": "A model within 4\" suffering the Poison Status must make a Poison test.",
  "Poison Immunity": "This model is immune to the Poison effect.",
  "Poison Master": "Enemy models within 8\" of this model add 1 additional die and add all the 3 results together while performing a roll to resist the Poison Status. If the enemy models within range Effort to add an additional die to the roll, then they must roll 4D6 and then choose 3 of them.",
  "Poisoned Fish 🦇": "Target a Poisoned Fish marker. Choose a direction and roll 2D6. Move that marker a number of inches equal to the result. Any model the marker comes in contact with that has an Endurance value less than the roll suffers the Poison Status.",
  "Poisoned Signs 🦇": "Remove the Poison Status from a model within 6\" and LoS. Look at the 3 first Objective cards from your deck, choose 1 and add it to your hand and discard the others. If you had removed at least Poison (3) or higher, return those cards to the top of the deck in any order instead of discarding them.",
  "Pollination": "When this model places a Suspect, it may be placed completely within a friendly plant action zone.",
  "Pollution Hate": "This model cannot enter Sewers.",
  "Pop Dart": "If this model does not play any Objective cards during its activation, at the end of its activation you may look at the top 2 cards of your Objective deck. Discard 1 card of your choice, and put the other card back on the top of your Objective deck.",
  "Possessed": "When this model is the Boss you can recruit up to three models with Rank Henchman with any Affiliation (as long as they don't have the Bot or Cybernetic traits). Their Affiliation is assumed to be the same as this model. However, models hired in this way lose-1 Willpower and gain the Self-Discipline trait if they do not have it already.",
  "Possession 🦇": "Target a model within 4” (not a Vehicle, or a model with the Bot trait). The target must take a Willpower roll with a -1 Willpower penalty. If it fails the roll, the target becomes Possessed! Remove this model (the ‘Possessor’ hereafter) from play – it cannot be activated while this trait is in effect, and it does not count for the purposes of Passes. However, the Possessed model is now controlled by you, rather than its own player. Treat it as a member of your crew (if the model has already activated this round, then you may award the model an Audacity marker in the following round). At the end of its next activation, the Possessed model must pass a Willpower roll (again with a -1 Willpower penalty) or continue being possessed. If the Possessed model passes the Willpower roll, the possession ends – see below. Alternatively, at the end of the Possessed model's activation, immediately before the Willpower roll is taken, the Possessor may choose to end the possession. \n• When the possession ends, return the Possessor to play by placing it within 4” of the Possessed model. The Possessor cannot be activated this round; the model that was Possessed returns immediately to the control of its owning player. \n• If the Possessed model becomes KO or Casualty while possessed, then the possession ends as described above. However, as soon as the Possessor is placed on the board, assign 🩸🩸 Damage to its character card.",
  "Power Armor": "Enemy models roll 1 less attack dice when targeting this model. In addition, you can make Efforts to ignore up to 2 Damage markers received per Effort.",
  "Power Armor MKII": "This model is Immune to CRT. In addition, you can make Efforts to ignore up to 2 Damage markers received per Effort.",
  "Power Dampening 🦇": "Until the end of the round, all models while within 4\" of this model cannot benefit from the Incorporeal and Invulnerability traits, cannot cast Spells and cannot benefit from Free Efforts.",
  "Power Supply": "This model starts the game with 3 Power counters. Once per model activation, this model can spend 1 Power counter as follows: \n• During its activation: This model gains a +4 Movement Boost Marker. \n • During its Attack: Each Hit scored needs two successful blocks to cancel it.\n • When receiving Damage: This model ignores up to 2 Damage markers suffered. \n In addition, this model can Manipulate a Streetlamp marker to gain 2 Power counters.",
  "Precise Aim 🦇": "If this model has not moved, when performing a Ranged Attack it gains +2 to its attack dice rolls. This model may not move after using Precise Aim.",
  "Premonition": "At the start of this model's activation, you may draw 1 card from your Objective deck. As result of this rule, you can discard any card from your hand, even a Cranial Bomb Activated card.\nIn addition, when this model is the target of an enemy melee Attack, this model can Effort after the opponent.",
  "Primary Target": "During this model's activation, you can treat 1 enemy Suspect as friendly.",
  "Princess of Tamaran": "While this model is the target of the Stubborn Resilience Objective card and has a friendly Suspect within 4\", increase the Invulnerability value of this model to (3).",
  "Protect Me!": "If this model is hit by an enemy attack (any type), you may make an Effort to nominate a friendly model within 4\" and LoS (not a Vehicle) to take the attack instead. Resolve any Damage and/or Status against the nominated model.",
  "Protect the Shadows": "When an enemy model performs a Reveal action on a friendly Suspect within 8\" and LoS, this model may make an Effort to cancel that action.",
  "Protected Lips": "This model is immune to Poison Status and Mortal Kiss trait.",
  "Protecting the Investment 🦇": "Place a Suspect within 3\" and LoS. Target an enemy model within 8\" and LoS to that Suspect, move 4\" the target.",
  "Protector (X)": "While the friendly model with that Name/Alias is within 4\" of this model, you can choose this model at the target of any attack originally targeting that model.",
  "Protein's Shaker (Dose)": "A model may use a Protein's Shaker when an action is declared. If it does so, for the rest of the round the model may make 1 free Effort when performing a Melee Attack or Defending.",
  "Provoke 🦇": "Target an enemy model within LoS and make an Opposed Willpower roll against it. If successful, that model can only target this model with it's Attack actions until this model is removed as a Casualty or this model uses this trait again.",
  "Psychiatrist 🦇": "Until the end of the round, while a friendly model with Rank Henchman with a Mental Disorder trait stays within 8\" and LoS of this model they gain +1 to their Attack and Defense skills (not cumulative).",
  "Psycho": "When this model takes a Willpower test, it applies a -2 modifier to the roll result.",
  "Psychoanalysis": "Target a model with a Mental Disorder trait, friendly or enemy, within 8” and LoS. The target ignores the effects of their Mental Disorder until the end of the round.",
  "Psychologist": "When a model within 4\" scores an Objective, that model suffers Enervating 1 or removes 1 ★ from its character card (your choice).",
  "Public Resources": "If this model is included in your crew, add $300 to the crew's available Funding. In addition, you may place one additional Streetlamp and Sewer marker before the game starts.",
  "Pull (X)": "The affected model is moved directly towards to the attacker X\".",
  "Pulling The Strings": "When this model places a Suspect, target another friendly model and move it 8\".",
  "Punishment": "Any target of this model's attacks cannot perform Efforts if they have the Quarry (X) Status.",
  "Push (X)": "The affected model is moved directly away from the attacker up to X\".",
  "Put More Effort": "This model places an additional Counter for the purpose of the Attempt Thwarted Objective cards.",
  "Puzzle Master": "When this model is going to place a Suspect by a Manipulate action, it can place 2 Suspect markers and can place them within 6\" instead of in contact.",
  "Pyromania (Mental Disorder)": "If this model can see any model that suffers the Fire Status, this model gains a Defense Marker.",

	
   //Q
	"Quiz Master": "After playing an Objective card during this model's activation, instead of drawing, you may search your Objective deck for any card, reveal it and place it in to your hand. Then shuffle your deck.",
	"Quilt's Helmet": "This model can see any model within 8\" of it, ignoring any other rule and scenery and ignores the Blind effect. In addition, this model may spend its Special Action to target an enemy model within 6\", that model suffers the Hypnotize Status. This model may only purchase up to 1 Equipment.",
  "Quarry (X)": "Status. When a friendly model attacks this model, it receives +1 to hit against it. Then reduce the X by 1.",
  "Queen of Spades 🦇": "Another friendly model with the Spades trait performs a Move 4\" and then a Manipulate Action immediately. When resolved continue with this model's activation.",


   //R
  "Radio": "This model is always treated as though it were within range of its Boss's Inspire trait.",
  "Radioactive Soul-Self 🦇": "When this trait is used, this model becomes immune to all Damage and Statuses, cannot be targeted by any model, cannot move, and cannot perform Manipulate actions. However, this model gains +1 Attacks skill, adds +2 to its attack dice rolls, and its Unarmed Melee Attacks produce ★★ Damage. This model can make Melee Attacks against models up to 8\" away as if it were in contact. These conditions last until the end of the model's next activation. This trait cannot be used in two consecutive rounds.",
  "Rain of Bullets 🦇": "This model next ranged attack this round reduce its Roof to 1 but gains Expansive and deals 1 additional 🩸 on a successful hit.",
  "Raised in the Sewers": "This model can deploy in contact with a Sewer marker instead of in its deployment zone.",
  "Raised With Venom": "This round, this model also gains 2 free Efforts while defending if it already has used a Venom Dose.",
  "Ranged Master": "This model gains a +1 bonus to its attack dice rolls when performing Ranged Attacks. Note: This trait is also called Expert Marksman on some character cards.",
  "Rapid Fire 🦇": "When making a Ranged Attack, this model gains +1 Attack die.",
  "Rapid Reload": "This model count as having Reloaded its weapons with Reload.",
  "Rat Tamer 🦇": "Sewer Swarm models within 8\" of this model gain 1 Attack Marker and a +2 Movement Boost Marker.",
  "Really Huge": "This model ignores up to 3 ★ Damage per enemy Attack.",
  "Really Tenacious": "Unless this model was removed as a Casualty by a Cranial Bomb Activated card or the Henchman Bomb trait, at the start of the Raise the Plan phase, you can place this model in contact with a friendly Suspect.",
  "Reanimated Owl": "This model removes 1 Damage marker (any type) during the first step of the Recount phase. Before removing this model as a Casualty, the opponent may choose to place a friendly or enemy Suspect in contact with it.",
  "Reckless Leader": "During this model's activation, you may add a Cranial Bomb Activated card to your hand to give 2 models without Audacity an Audacity marker. You must be able to add the card to your hand in order to activate this trait.",
  "Recoil (X)": "When using this weapon, after resolving the attack using the weapon, after resolving the attack, the wielder immediately Moves X\" directly away from the target or template position.",
  "Recover The Titan": "Once per round, when an enemy model places a Suspect, nominate it as a Titan Container marker until the end of the round. It is still a Suspect. Reveal 2 Objective cards from your hand and the opponent chooses one for you to play face down. During the Recount phase, if there are more friendly models than enemy models within 4 of the Titan Container, or the opponent had removed it, score that face down card. If not, discard it.",
  "Red Hood Armor": "Whenever this model takes Damage, reduce the total number of Damage markers it receives by 1. In addition, after a close combat attack is resolved against this model, you can take 1 Effort and the attacking model receives ★★.",
  "Reform": "When this model is going to be removed as a Casualty/becoming KO, you must place this model in contact with a friendly Clay marker in play (if any) and then remove 3 damage markers from this model and remove that Clay marker.",
  "Reflexes": "When performing a Ranged Attack against this model, successful hits must be rerolled.",
  "Regeneration": "During the Recount phase, if this model is not KO it can remove 1 additional Damage marker (any type).",
  "Regrets": "At the start of each of this model's activations, it must pass a Willpower roll or be unable to make any Attacks or use Flaming Wave during this round. For each friendly model that is KO or removed as a Casualty so far this game, this model gets -1 to the roll.",
  "Reinforced Gloves": "This model's Unarmed Melee Attacks inflict Damage ★★.",
  "Releasing the Dots 🦇": "Reveal an enemy Suspect within 8\" and LoS.",
  "Reload": "After performing a ranged attack with this weapon, it must Reload. you may not use the weapon untill it is Reloaded. In order to Reload you must spend a whole round not using this weapon.",
  "Release the Boys!": "If this model has placed a Suspect within 4\" and LoS of an enemy model this activation, you can place 2 new friendly models with Alias (Bud) and (Lou) within 4\" of this model, they can be activated this round as usual and the opponent gains 2 Pass on Activations. If you do so, place a new friendly model with Alias: Harley Quinn (BTG) in contact and remove this model from the game. Transfer all Damage, Statuses, Audacity, and any Objectives that had targeted this model to the new model. If there were any unspent actions remaining, continue this activation using the new model. No Objectives may be scored as a result of this trait.",
  "Repairman 🦇": "Remove 2 Damage marker from a target Vehicle in contact.",
  "Required (X)": "This model can only be included in a crew that already contains the model with alias (X).",
  "Resilient": "This model can reroll failed Endurance rolls.",
  "Resourceful Vigilante 🦇": "Draw 1 card from your Objective deck or search into it for a card whose Resource has the keyword When Scoring and Sets a Thwart! as effect.",
  "Retractable Claws": "This model's Unarmed Melee Attacks inflict 🩸★ Damage and have the Sharp weapon special rule.",
  "Reveal the Bat 🦇": "If this model has revealed an enemy Suspect this activation, place a new friendly model with Alias: Batman (Robert Pattinson) in contact and remove this model from the game. Transfer all Damage, Statuses, Audacity, and any Objectives that had targeted this model to the new model. If there were any unspent actions remaining, continue this activation using the new model. No Objectives may be scored as a result of this trait. *This model counts as Alias: Batman (Robert Pattinson) Leader for the purpose of forming your Objective deck.",
  "Revenge 🦇": "All friendly models with Rank Henchman that attack an enemy model within 8\" of this model gain one extra attack die this round.",
  "Reverberation": "This model may take an Effort during a Canary Cry trait, to inflict the Push (4) Status in any models affected by it.",
  "Ricochet 🦇": "After this model scores any successful hits with a Ranged Attack, select another enemy model within 2\" and line of sight. Perform an extra Ranged Attack (without ammo) against this second target spending the same weapon, ignoring line of sight, effective range and cover.",
  "Rich Family": "During this model's activation you may play 1 Resource without paying the cost.",
  "Riddler Bots": "When you hire a model with the trait 'Can you solve this?', this trait changes to Autorepair/X (X is the value of the 'Can you solve this?' trait) and Multitask.",
  "Riddler Followers": "Keyword.",
  "Riddles Addict": "Once per round, this model can Reveal enemy markers without spending an Action.",
  "Righteous Vengeance 🦇": "Place a friendly model with alias Underworlder X that was previously removed from the game as Casualty within 8\" of this model and within 4\" of a Sewer marker or the Totem marker without any damage on it. That model immediately performs a Melee attack, and may make 2 free Efforts (it may not make any other Efforts during that action). If an enemy is not removed as a Casualty nor becomes KO by the result of that attack, that model is removed as a Casualty again.",
  "Rock": "This model’s attacks gain the Overwhelming weapon special rule.",
  "Roots 🦇": "Target an enemy model within 8\" and line of sight. Perform an opposed Endurance roll against that model – if you succeed, the target suffers the Slow (4) Status.",
  "Runaway": "This model is immune to the Arrest trait.",
  

  // S
  "Sad Life": "Enemies within 6\" that wish to perform an Action must first make 1 Effort (if the target cannot make an Effort, it can ignore this rule).",
  "Safe Hands": "This model is immune to the Steal Status.",
  "Saint Dumas Zealot": "Keyword.",
  "Sapper": "Place a friendly Suspect in contact. That Suspect marker is treated as a small obstacle that provides Cover to a model that stay in contact with it.",
  "Savage Fighter": "This model gains +1 to its attack dice rolls and the Push (2) Status when performing a melee attack until the end of the round.",
  "Savage Throw 🦇": "Target a Marker within 2\". Place it in contact with an enemy model within 8\" and LoS. Roll a Strength die against it counting as a Ranged Attack. On a success, the target model suffers ★★.",
  "Scheming (X)": "During the Raise the Plan phase, if this model is in play and not KO, you can move up to (X) Suspect markers 4\", ignoring the minimum range between Suspect markers.",
  "Scientific": "This model may roll one additional die when performing a Willpower Skill roll and then remove 1 of the dice rolled. When this model performs a Special action during its activation, it may perform an additional different Special action as an extra action.",
  "Scout": "This model may move before the first Take the Lead phase of the game, following the rules for Movement Actions (this does not affect the model's normal activation).",
  "Sealed Cabin": "Only attacks listed on the Upgrade card can be made by this model, plus the Charge trait. In addition, this model (and any model transported in it) cannot perform Manipulate actions.",
  "Sealed Off": "When this model Sets a Suspect, you can Move another friendly Suspect 4\".",
  "Seasonal Criminal": "At the end of every round, check the total Victory Points scored by all players. For every full 12 VP scored, Calendar Man gains one of the following benefits, advancing one step on the list for each 12 VP scored.<br><br><img src=\"https://veland55.github.io/btb/img/Seasonal_Criminal.png\" style=\"width:100%;max-width:420px;border-radius:12px;margin:20px 0;display:block;\">Example: The players total 24 VPs, so Calendar Man gains +2 Attack skill (12 x 2 = 24). At the end of the next round, the players have scored another VPs between them. The total is now 37- the wheel advances 3 spaces (it started at 2, and now it cycles all the way around to 1). Calendar Man loses the +2 Attack bonus, and gains +4 Movement instead. \n \n•12-23: +4 Movement \n•24-35: +2 Attacks \n•36-47: +2 Defense \n•48-59: Handyman \n•60-71: +4 Movement \n•72-83: +2 Attack \n•84-95:+2 Defense",
  "Searcher": "While this model is in play and not KO, the opponent's Resource points are reduced by -1 (not cumulative).",
  "Security Chief": "If this model is within 4\" of your crew's Boss, enemy models suffer a -1 penalty to Attack rolls against that Boss.",
  "Self-Destruction 🦇": "Move the model 6\" and then Center the Explosive template over this model. This is resolved as an Explosive Ranged Attack, rolling a Strength 2+ die for each affected model on a successful roll, the model receives ★ Damage. Remove all suspects under the Explosive Template. Once this action is resolved, remove this model as a Casualty.",
  "Self-Discipline": "This character cannot be controlled by an opponent (for example, by means of an ability that inflicts the Hypnotize Status).",
  "Serum Injection (X) 🦇": "Once per game, this model gains X free efforts to Attack and Defense rolls and ignores any modifiers to the Effort limit until the end of the round.",
  "Served Well 🦇": "Remove target friendly model within 4\" as a Casualty.",
  "Sewer Swarm (X)": "After deployment, but before the game begins, place (X) Sewer Swarm models within 2\" of this model. If, during this model's activation, you have less than (X) Sewer Swarms in play, you may make (X) Efforts to place (X) Sewer Swarm models within 2\" of this model, then, the opponent gains (X) Pass markers (you may not have more than X Sewer Swarms in play as a result of this). While a Sewer Swarm is within 8\" of this model, it gains the Poison Master rule.\nIn addition, if this model is hit by an enemy attack (close combat or ranged), you may make an Effort to nominate a friendly Sewer Swarm model within 4\" and LoS to take the attack instead. Resolve any Damage and/or Statuses against the nominated model.",
  "Sewer Worker": "One use only. During this model's activation, you can place a Sewer marker anywhere on the gaming area at least 2\" from any other marker.",
  "Sewer's Assault": "When this model uses a Sewer marker, it may immediately perform a free Manipulate action to place or reveal a Suspect within 2\" and LoS, or perform a free Attack action. This model may not repeat the same Tactical Action per round.",
  "Sewer's Retreat": "Once per round, after resolving an enemy Attack action that targeted this model and it is not suffering KO or was removed as a Casualty, target a Sewer marker within 4\". You may place this model in contact with another Sewer marker.",
  "Sewers Nightmare 🦇": "If this model uses a Sewer marker this turn, its next attack this activation gains 2 free Effort and +1 bonus to its attack dice rolls.",
  "Shadowed Nightmare": "Instead of deploying this model normally you may keep it off the table. It may receive an Audacity marker even if it is not in play. When a Suspect is placed, then you may place this model within 8\" of that suspect and all models with Rank ♘ within 6\" suffer Enervating 1.",
  "Shadowed Perch": "Spend this model's Movement Action to place this model within 4\" of a friendly Owl marker. This model's basic move distance cannot be increased by any means.",
  "Shadows Agent": "If this model is the Boss, before the start of the game, choose another friendly model to be the Boss instead.",
  "Shadows Command 🦇": "Target another friendly model within 8\", place it in contact with a friendly Suspect. Then remove that Suspect. That model may immediately perform an Attack action. If this attack is a Melee attack, it may target an enemy up to 4\" away and in LoS.",
  "Shady Dealings 🦇": "Discard two objective cards from your hand.",
  "Shapeshifting 🦇": "Place in contact with this model another with Alias: Beast Boy - X (Teen Titans). Place all the Damage minus 1, Audacity and Statuses that model is already suffering to the new model. Then remove this model. If this model where the active model, then continue with the activation of the new model as if it was this model's activation, following all the usual rules (like the actions you has already spent). If this model is already activated and is not the active model, the new model counts as an activated model, but if it not activated yet, it can be activated.",
  "Shapeshifting Gorilla Progress": "This model cannot recruited in your crew, and can only be placed in game by a model with the Shapeshifting trait. When a model uses the Shapeshifting trait to place this model in play, this model Obstinate trait is with up to 3 Efforts instead of 1 this round.",
  "Shapeshifting Hawk Progress": "This model cannot recruited in your crew, and can only be placed in game by a model with the Shapeshifting trait. When a model uses the Shapeshifting trait to place this model in play, this model may use this round the Fly trait as a free action.",
  "Shapeshifting Human Progress": "This model allows you to keep aside all the models that have in its Alias: Beast Boy – (X) without recruiting they. When a model uses the Shapeshifting trait to place this model in play, during this round this model may use the Vigilante’s Work trait to place or reveal a Suspect marker within 3'' and LoS instead of in contact.",
  "Shapeshifting Human Progress": "This model allows you to keep aside all the models that have in its Alias: Beast Boy - (X) without recruiting they. When a model uses the Shapeshifting trait to place this model in play, during this round this model may use the Vigilante's Work trait to place or reveal a Suspect marker within 3\" and LoS instead of in contact.",
  "Shapeshifting Tiger Progress": "This model cannot recruited in your crew, and can only be placed in game by a model with the Shapeshifting trait. When a model uses the Shapeshifting trait to place this model in play, if this model inflicts Damage on an enemy model, you may place at the end of this activation the target in contact with this model.",
  "Sharpshooter": "Ranged Attacks made by this model ignore the Cover rule.",
  "Shield Breaker": "All attacks made with this weapon ignores the Protective, Defensive, Light Armor, Medium Armor and Heavy Armor traits.",
  "Shockwave 🦇": "Enemy models within 4\" of this model suffer the Slow (4) Status.",
  "Shooter": "When this model performs Ranged Attacks against targets within 8\", the target does not benefit from the Cover rule.",
  "Showmanship!": "During this model's activation you may play a Resource without paying its cost if this model has 2 enemy models within 4\".",
  "Showing the Ropes": "If this model is the target for the Objective: Recovering the Juice, target another friendly model within 6\" with rank Henchman to also count as the target model.",
  "Simple Mind": "This model cannot benefit from the Inspire rule.",
  "Slow (X)": "Status. A model suffering this effect reduces by its basic movement distance by (X) during its next Movement action.",
  "Slow Digestion": "After resolving a Devour attack that inflicts damage, remove the target from the gaming area. That model is 'Devoured'. A Devoured model may still be activated each round, but can only take an Endurance roll. If it is successful, place the Devoured model within 2” of this model and continue its activation. If the Endurance roll fails, the Devoured model suffers 🩸🩸 damage. This model can only remove one enemy from the game in this way at the same time. If this model becomes a Casualty, place any model it Devoured within 2” before removing this model. If a model is still Devoured when the game ends, it is considered a Casualty.",
  "Small": "This model gains +1 Defense against enemy Ranged Attacks.",
  "Small Caliber": "This weapon loses 2 dice instead of 1 if the target is not in effective range.",
  "Small Nightmare": "This model doesn't follows the Nightmare trait rules to come back to play while removed as a Casualty, instead they can be Set in play in contact with a friendly Suspect when a Fear card is returned to the Fear pile, they can only take an activation if they didn't take it before. In addition, this model gains +1 Defense against enemy Ranged Attacks.",
  "Smartest Man Alive 🦇": "Search into your Objective deck for 1 card, and add it to your hand.",
  "Smuggler": "When this model is recruited, its crew can buy Magazines and Radio equipment at half of the usual $ cost.",
  "Sneaking": "During the Recount phase, this model can move up to 4\", using the rules for Movement Actions.",
  "Snow Storm 🦇": "Center the Explosive template on this model. Roll a Strength 3+ die against all other models affected by the template with Damage ★★. Any Suspects affected become Frozen.",
  "Soul Armor 🦇": "Remove up to 2 Damage markers (any type) from this model.",
  "Soul Voices": "If this model has an Audacity marker, but has not yet activated this round, you may remove the marker to gain 2 free Efforts when defending. In addition, this model may spend an additional action when attacking to gain 2 free Efforts for that attack.",
  "Soul-Self (Spell)": "Movement Action. 1 Magic Counter. Target up to X friendly models or friendly Thwarts within 4\" of this model (X is equal to the additional Magic Counters spent to Cast this Spell). This model is placed within 8\" and all the targeted models/Thwarts are placed within 4\" of the final position of this model. This model ignores up to 2 Damage this round.",
  "Spades": "Keyword. If this model has a friendly Suspect within 4\" during an Attack roll, you may replace a drawn card with a card from your hand. That card gains +1 to the result.",
  "Special Bonuses": "Some of the traits and other special rules in this compendium grant one or more special Bonuses to a model. These represent various temporary bonuses. If a model receives more than one special bonuses of the same type, the effects are cumulative. Bonuses must be used and discarded the first time the model performs the action of the specified type.\n• Attack Bonus: A model with one or more Attack Bonus gains 1 extra attack die in its next Melee Attack action for each Attack Bonus it possesses. A model cannot have more than 3 Attack Bonus at any one time.\n• Attack Penalty: A model with one or more Attack Penalty deducts 1 attack die in its next Melee Attack action for each Attack Penalty it possesses. A model cannot have more than 3 Attack Penalty at any one time.\n• Defense Bonus: A model with one or more Defense Bonus️ gains 1 extra die to its next Defense roll for each Defense Bonus️ it possesses. A model cannot have more than 3 Defense Bonus at any one time.\n• Defense Penalty: A model with one or more Defense Penalty deducts 1 die to its next Defense roll for each Defense Penalty️ it possesses. A model cannot have more than 3 Defense Penalty️ at any one time.\n• +2 Movement Boost Bonus: A model with a +2 adds a number of inches to its basic move distance for its next Movement action, equal to value on the bonus. These bonuses aren't cumulative, when a model receives a bonus with a higher value, it replaces the lower value bonus.\n• -2 Movement Boost Penalty: A model with one -2 deducts a number of inches from its basic move distance for its next Movement action, equal to the value on the bonus, to a minimum of 0. These bonuses aren't cumulative, when a model receives a bonus with a higher value, it replaces the lower value bonus.\nNote that Attack, Defense, Movement Boost and Movement Penalty bonuses counter each other (so a model with a +6\" from boost bonus and -4\" from penalty bonus would gain a +2\" bonus to its next Movement action).\nThere are also markers known as Numeric Counters, that markers contain ever a number between the 1 and 6. It cannot be increased below 6, but can reach 0, when it happens, the Numeric Counter is removed.",
  "Special Modifiers": "It's important to differentiate between three types of modifiers:\n• + X Ex. Attack: Means that the model gains a + X to the character characteristic.\n• + X dice of Ex. Attack: Means that the model gains X extra dice when attacking (but the attribute is not modified).\n• + X to its Ex. Attack roll: Means that the model gains an X bonus to the results of its Attack dice (it doesn't modify its attribute or the number of dice that it rolls).",
  "Speed Attack (X)": "This attack is a Speed Power and you need to draw X SpeedForce cards to use it.",
  "Speed Force Absorption": "This model can steal 1 Speed Force marker from another model with the Speedster trait at the end of the Drain Speed Force subphase. This marker may cause the model to exceed the normal maximum reserve of Speed Force markers.",
  "Speed Force Master": "This model can spend up to 2 Speed Power counters during the round like Action Counters. This model can spend up to 2 Speed Power markers during its activation to gain up to 2 Attack Marker or Defense Marker.",
  "Speed Force Master (X)": "Once per roll, this model can draw up to X SpeedForce cards to add X Attack dice to a melee attack or X dice to its Defense rolls.",
  "Speedster": "If. you recruit a model with the Speedster trait, you must play also with the Speedforce Deck, shuffle it at the start of the game and keep it aside. A Speedster model may use Speed Powers, once each per round, that needs to draw Speedforce cards without seeing their content from the Speedforce Deck of its player and assign they to your Speedforce Discard pile face down.\nEach time your Speedforce Deck becomes empty, the opponent draw the first 2 cards of your Speedforce Discard pile, and choose 1 and apply its effects to your model with Speedster, keep it near him to remember that card is assigned to it. Then shuffle again all your other Speedforce cards together and form the Speedforce Deck again. If any SpeedForce card is yet to be drawn when that happens, when the Speedforce deck is formed again, continue drawing the remaining cards.\nYou can only recruit 1 model with the Speedster trait in your crew.",
  "Speedster (X)": "This model can use Speed Force Powers, and has a maximum reserve of X Speed Force markers. A Speedster model gains +2” to its basic move distance. The model does not treat Difficult Ground and Climbing as Impaired Movement, although other effects that modify the terrain (i.e. Ice) must be taken into account. Enemy models cannot defend against this model’s Melee Attacks unless the target has the Speedster trait too.",
  "Spray Can (X)": "A model Equipped with a Spray Can when it Sets a Suspect may expend 1 of its Spray Cans to Vandalize a Scenery element, Streetlampt or Sewer in contact with that Suspect.",
  "Stalker": "When activating a trait that targets an enemy model, this model may treat its position as that of a friendly Suspect within 8\".",
  "Stay in Formation": "One use only. During this model's activation, choose another friendly model within 8\". That model may immediately move up to 6\" directly towards this model.",
  "Stealth": "When this model is under the effect of the Night rule, it can only be seen by enemies within 8\" instead of the usual range. It is still subject to rules that aid detection, such as Lights, Total Vision, etc.",
  "Stealthy Cats 🦇": "Move each friendly Cat marker in play up to 4\". For each marker that ends this movement within 4\" of this model, this model may move up to 2\" for free.",
  "Steel Hands": "This model’s Unarmed Melee Attacks inflict ★★★ Damage with the Push (4) Status.",
  "Stop! 🦇": "Target an enemy model within 8\" and line of sight (not a Vehicle). Perform an opposed Willpower roll against that model. If successful, reduce the target model’s Defense skill by 1 (this trait is not cumulative if used multiple times on the same model). In addition, the target suffers the Slow (4) Status. Both effects last until the end of the round.",
  "Strange Things Happen": "At the end of any activation where a model scores a natural double 6, you may place a Strange Things Happen marker (is a Suspect marker also in every way) within 6\" of that model.\nOnce per round, each of your models may take a Willpower roll while in contact with one of these markers. Any model within 4\" of these markers with a Willpower value of 5 or less suffers the Scared Status. No more than 5 of these markers may be in play at the same time.",
  "Strategist": "While this model is in play and not KO, you gain +1 Resource point.",
  "Street Fighter": "When attacking or defending, this model can remove a friendly Suspect within 2\" to gain 2 free Efforts for that action.",
  "Street Guy": "When this model benefits from the Cover rule, it may force the attacker to reroll one successful hit.",
  "Stretching": "At the start of this model's activation, you may change any number of its 🩸 Damage to ★ Damage markers. In addition, once per round, during its activation, this model can choose to increase its size or decrease it. Until its next activation, if the model increases its size it gains +1 to its Strength rolls, and its Unarmed Melee Attacks inflict ★★ damage, but the model reduces its Defense by -1. If the model decreases its size, it gains +1 to Defense and gains the Dodging rule, but suffers a -1 penalty to its Strength rolls.",
  "Stupid": "This model cannot perform Manipulate Actions, under any circumstances.",
  "Sturdy": "This model does not reduce its Effort Limit due to accumulated Damage.",
  "Subliminal Suggestion 🦇": "A target friendly/enemy model with a Mental Disorder trait within 8\" and LoS is Moved 4\" (you cannot move it so that it Falls) or the targeted friendly model performs an Attack rolling 1 additional Attack die.",
  "Suggest": "If any Damage is dealt with this weapon, Set an enemy Suspect in contact with the target (if able).",
  "Suit of Sorrows": "When Attacking or Defending, this model gains 1 free Effort and reduces the total number of Damage markers it receives from attacks by 1.",
  "Super Jump 🦇": "Remove this model and immediately place it completely within 6\".",
  "Super Speed (X)": "When this model is going to perform a movement action, it can draw up to X SpeedForce cards to increase its movement by 4\" for each card drawn.",
  "Super-Sight": "This model ignores the Blind Status.\nIn addition, once per round, during one action, it can make up to 3 free Efforts.",
  "Superior Sense of Smell": "This model may see any model within 10\" and is immune to the Blind Status. When performing a Ranged Attack, you must be able to draw a straight and unobstructed line between this model and the target model.",
  "Supernatural": "All attacks made by this model ignores the Invulnerability, Light Armor, Medium Armor and Tough Skin traits.",
  "Support (X) 🦇": "Target a friendly model with Alias: X within 8\" and LoS. Immediately perform an action with that model.",
  "Surgical madness (Mental disorder)": "When this model uses the Medic trait, the target model removes 1 extra Damage marker (any type). In addition, roll 1D6. The target model gains the following trait until the end of its next activation: \n Result Trait \n 1 Weak \n 2 Stupid \n 3 Aggressive Schizophrenia \n 4 The Voices \n 5 OCD \n 6 Desensitized",
  "Survivor": "When this model is made a Casualty, do not remove it from play. Instead, roll a D6: on a result of 5+ the model removes 1 Injury marker 🩸 and remains in play. If the roll is failed, the model becomes a Casualty.",
  "Sustained Defense": "For every two successful defense rolls made by this model, cancel one extra enemy hit.",
  "Swarm": "This model cannot be recruited, but can only be brought into play by the Sewer Swarm X trait or another rule that specifically say it. This model gains +1 Defense skill vs enemy Ranged Attacks. This model cannot perform Manipulate Actions by any means. Swarms do not fulfill enemy Objective criteria for making models KO or removing them as Casualties. If this model is made KO, remove it as a Casualty. This model is ignored by the Suicide Squad Cranial Bomb rule and cannot be removed by the Cranial Bomb Activated card.",
  "Swift": "This model can make 1 Effort to improve its basic move distance by +2\" for the remainder of the round.",


  // T
  "Taunt 🦇": "Choose one enemy model (not a Vehicle) within 8\" and line of sight. Perform an opposed Willpower roll against that model. If it successful, then for the rest of the round increase the target's Attacks skill by +1, but reduce its Defense skill by -2.",
  "Tachyon Device": "In the Drain Speed Force sub-phase, if there aren't any Speed Force markers in the Speed Force pool, this model adds up to 2 Speed Force markers to its own reserve.",
  "Take Cover! 🦇": "Choose a friendly model with Rank Henchman within 4\" of this model (but not the activated model itself). That model gains 2 Defense Marker.",
  "Takedown": "When this model makes another model KO with an Attack, it may immediately make an Effort to make the target a Casualty.",
  "Tangible Fear": "Any time a model within 4\" of this model receives a hit, or fails a Willpower roll, you may discard 1 card from the top of the friendly objective deck (not cumulative).\nIn addition, while this model attacks, the target's Defense is reduced by 1 if its Willpower is less than 6.\nWhile this model is attacked, the Attack value of the attacking model is reduced by 1 if its Willpower is less than 6.\nIn addition, this model cannot remove damage caused by other model's effects unless specified.",
  "Team Arrow": "Keyword.",
  "Team Flash": "Keyword.",
  "Team Player": "When you play a Teamwork Action Objective card you can Move this model 4\".",
  "Teamwork (X)": "This model may roll (X) additional dice when performing Melee Attacks during its activation and when Defending while another model with the Teamwork trait is within 4\".",
  "Teamwork (X) (All)": "This model may roll (X) additional dice when performing Melee Attacks during its activation and when Defending while another model with the Teamwork trait is within 4\".",
  "Teamwork (X) (Model)": "This model may roll (X) additional dice when performing Melee Attacks during its activation and when Defending while the (named/keyword) model is within 4\".",
  "Technique 🦇": "Once this trait is activated, for the rest of the round when this model damages a non-vehicle enemy with a Melee Attack Action, the damaged model suffers the Paralyze Status too.",
  "Teen Titans": "Keyword",
  "Teen Titans Founder": "This model can be recruited in a Teen Titans Team, ignoring “The Sidekick” trait. When operating as part of a Teen Titans crew, this model gains +1 Willpower, +1 Strength and the Reinforced Gloves trait.",
  "Telekinesis": "At the start of each of this model’s activations, choose one of the following effects until the end of the round: \n• This model’s weapons can still be used at full RoF if it moves. \n• This model’s Unarmed Melee Attacks inflict ★★★ and its Strength roll always succeeds on a 3+, ignoring any other rule (but it cannot benefit from the Mixed Combat Style trait).",
  "Telekinesis": "At the start of each of this model's activations, choose one of the following effects until the end of the round:\n• This model's weapons can still be used at full RoF if it moves.\n• This model's Unarmed Melee Attacks inflict ★★★ and its Strength roll always succeeds on a 3+, ignoring any other rule (but it cannot benefit from the Mixed Combat Style trait).",
  "Templates": "Some weapons shoot clouds of gas, flames or other lethal substances rather than conventional ammunition. Others, such as grenades, rockets or Molotov cocktails explode upon impact. To represent the area of effect of these weapons, we use templates. There are two types of template – Explosive and Spray (you can download printable versions from the Knight Models website). If a weapon requires the use of a template, the exact type will be noted in its special rules or Rate of Fire. Special rules that allow a model to avoid ranged attacks (such as Dodge) may be used against templates as normal – a model doesn't have to be the target of an Attack to be affected by a template.\nThese weapons don't roll any attack dice. Instead, the RoF of these weapons indicate the number of times the template is placed when attacking with them. An exception to this rule are Melee Attacks that place a template – these follow the usual rules for Melee Attacks, but place a template for every hit.\nA model is affected by a template if its base and/or main physical block is even partially covered by the template. Only a Strength die is rolled against affected models, once for each model, following the usual rules for the Strength die during an attack.\nA model cannot be affected more than once by multiple templates placed by the same Attack action.\nAll hits caused by a template are resolved at the same time.\nNote: Depending on how your tabletop scenery is arranged, sometimes models on different levels of the board (on stairs, walkways, or rooftops, etc.) may be affected by a template on another level. Templates are considered to extend 2\" above and below the point of impact. Simply take a top-down view to see which models are affected, then measure vertically.\nEXPLOSIVE TEMPLATE\nWhen an attack or weapon uses an Explosive template, place the template completely within the Effective range and in line of sight, targeting at least 1 enemy model. Make a Strength roll (following the usual rules and applying the special rules of the weapon) against all models affected by the template.\nAffected models may suffer additional effects depending on the exact weapon used (for example, CRT: Freeze).\nExplosive templates do not pass through solid objects like walls – see the rulebook.\nGRENADES\nWeapons with the 'Grenade' type (i.e. Explosive Grenades) are used just like other ranged weapons for the purposes of line of sight. However, when a model throws a grenade, it may target any point on the table completely within Effective range and line of sight, not needing a target. Center the Explosion template on the target point, applying any effects to all models affected by the template.\nSPRAY TEMPLATE\nIf a weapon requires the use of a Spray template, the controlling player must place the narrow end of the template in contact with the base of the firing model, pointing the other end in any direction they wish.\nTo affect a model with this template, the attacker must be able to trace LoS to the affected model, although Cover is ignored.",
  "Tension": "This model gains +1 to its Attacks and Defense values while it has at least one 🩸 Damage marker on its Character Card.",
  "Terrible Visage": "When this model is placed by the Nightmare trait, you may Move the targeted Suspect instead of the opponent.",
  "Terror": "Status. When an enemy model suffers the Terror Status, you draw 1 Objective card from the top of your opponent’s Objective deck and place it facedown in your Terror pile. When an enemy model would make an Attack dice roll, Defense dice roll, or a Willpower roll during its activation, after the action is resolved, the opponent may reveal up to 3 cards from your Terror pile. Apply the Poison Status a number of times equal to the number of cards revealed. If the model already have or reaches Poison (4), it immediately takes a Poison test. After applying the Status, put the cards at the bottom of the original owner’s deck. If you cannot draw, the enemy model instead suffers ★★.",
  "The Big Bang Theory": "Each time you score an Objective card, after you draw a new card, draw 1 additional Objective card and place it face down without looking at it. Only 1 card can be in play in this manner at a time. You may play this card as a Resource following the usual rules without paying the cost. If the Resource cannot be played when you choose to play it, the effect is ignored.",
  "The Big Blue Boy Scout": "If an allied Bruce Wayne model receives any number of hits while within 4\" of this model, this model may make an Effort - if it does so, resolve the hits against this model instead.",
  "The Boss": "If this model is the crew's Boss, friendly models with Rank Henchman gain the Expendable trait.",
  "The Crew 🦇": "All friendly models with this model's Affiliation within 8\" and in LoS with this model gain +2 Movement Boost Marker.",
  "The Dark Knight Returns": "Keyword.",
  "The Devil You Know": "When this model casts a Spell, it may apply any Failure result to a friendly model instead of itself.",
  "The Dude": "Once per game, this model may ignore a rule targeting it.",
  "The Dynamic Duo": "This model can activate immediately after a friendly Robin (Boy Wonder) model within 8\", interrupting the usual sequence of play.",
  "The Emperor": "This model starts the game with 6 Business counters but can only gains Business counters when a friendly model suffers KO or removed as a Casualty.",
  "The False Boss": "While this model is not the Boss, other friendly models within 8\" that are not affected by the Inspire rule may use a Movement or Special action during their activation to perform an additional Manipulate action.",
  "The Fear Master": "This model has 1 free Effort while Attacking for each Objective card in the Terror pile. In addition, if this model is going to be targeted by an Attack, you may discard (not triggering any effect) 1 card from your Terror pile to nominate a friendly model within 4\" and LoS to be the new target of the Attack instead.",
  "The Good Command": "When you score an Objective card, an enemy model within 4\" of a Sewer marker suffers the Quarry (X) Status (where X is the VP of the scored card). If you inflict this effect against another model by the use of this trait, the previous model loses the Quarry (X) Status.",
  "The Holiday Killer": "When this model attacks a target with a Reputation cost higher than 50, it may reroll attack dice and Strength die rolls.",
  "The Hunter": "Once per round, when an enemy model ends a movement action, you can immediately move this model 4” (unless it is in contact with an enemy model).",
  "The Main Man": "One use only. When a model ends an Action, you can use this trait, then, until the end of the round, this model gains +1 to its Attack and Defense skills and 3 free Efforts while Attacking and Defending.",
  "The Murderer": "When this model removes an enemy model as a Casualty, it gains +1 Free Effort when performing an Attack action and +1 to its Basic Movement Distance (cumulative). Then target an enemy model within 4\" and LoS, that model suffers the Scared Status.",
  "The One And Only Joker": "At the start of this model's activation, if there are no enemy models within 4\", you may search your Objective deck for an Objective card named Let Them In On The Joke. Reveal it and add it to your hand. Shuffle your Objective deck.",
  "The Professional": "Each time this model removes an enemy Leader, Sidekick and/or Free Agent as a Casualty, gain 1 Resource point.",
  "The Quiver": "When this model starts its activation, choose one of the following effects. You may not choose the same option more than once. •1: Add to this round Ranged Attack Stunned. •2: Add to this round Ranged Attacks Knocked Down + Blunt 2. •3: Add to this round Ranged Attacks +2 RoF. •4: Until the end of the round, this model gains the Grapple Gun rule.",
  "The Sidekick": "This model can only be hired if Batman (Modern Age) is leading the crew. While a friendly model with Alias: Batman is in play, this model gains +1 to its Strength die rolls. If a friendly model with Alias: Batman is removed as a Casualty, this model suffers -1 Willpower for the rest of the game.",
  "The Song of the Sirens": "Friendly models can use their Bodyguard rule on any model in the crew with the Gotham City Siren trait until the end of the game.",
  "The Target of the Bat": "If a model with Name: Bruce Wayne KO's this model, the Bruce Wayne model's controlling player may search into its Objective deck for an Objective card and add it to their hand.",
  "The Time Has Come 🦇": "One use per game. During this activation, this model's Unarmed Melee Attacks inflict Damage ★★.",
  "The Tomorrow Knight": "At the start of this model's activation, you can search into your Objective deck for a copy of the None of You are Safe Objective card.",
  "The Untouchable": "If this model is your crew's Boss, friendly models with Rank Henchman using the Bodyguard trait to take a hit on its behalf do not need to make an Effort to do so. In addition, while this model is the Boss, all friendly models with Rank Henchman gain the For the Family trait for the duration of the game.",
  "The Voices (Mental Disorder)": "During this model's activation, you may discard a card from your hand, then search your deck for another card with the same Type. Then shuffle your Objective deck.",
  "The Wizard": "This model does not spend a Special Action when using the Good Aim special rule. In addition, once per game, at the start of the Raise the Plan phase, you may move this model up to 4\".",
  "The World's Greatest Detective": "At the end of the Raise the Plan phase, you may choose one enemy model on the board (not a Vehicle). LoS is not required. The target model must immediately perform a Willpower roll. If it fails, you may force the opponent to activate the target model first.",
  "This... Is.. Awesome-Sauce!": "Target a friendly model within 4\" and line of sight. The target model gains an Audacity marker, and adds +1 to its Strength die rolls until the end of the round.",
  "This Is My City 🦇": "Target an enemy model that that has LoS to a friendly Suspect within 8\" of it. That model suffers the Hypnotize Status. If that model is a Henchman without the Incorruptible trait, before the Willpower roll is made you may spend $100 Black Money to have it automatically fail.",
  "Thirty Days Has...": "Depending on the month the game starts Calendar Man gains the specific trait for that month: January-Demotivate, February-Confusion, March-Luck, April-Trickster, May-Disarray, June-Demoralize, July-Veteran, August-Intimidate, September-Cruel, October-Undead, November-Unpredictable, December-Survivor.",
  "Thief 🦇": "Once this trait is activated, for the rest of the round this model's Melee Attacks gain Steal.",
  "They're Cheap": "One use only. At the end of the Raise the Plan phase, you may activate this trait. For the remainder of the round, ranged attacks performed by friendly models spend no Ammo.",
  "Three Jokers": "When you recruit this model you must also recruit any other models that share this trait. Models with this trait treat their rank as Leader in game.\nIn addition, this model can take Audacity with the Trickster trait from a friendly model with this trait that is already activated this round, counting as taking Audacity from a non-activated model.",
  "Through the Stars": "When this model places a Suspect, you may move up to 4\" an enemy model directly to that marker.",
  "Throwing": "This ranged weapon don't lose dice for moving before attacking.",
  "Tireless": "This model can spend a Special Action (as well as Its Movement Action) to gain +2\" to its basic move distance.",
  "Titan Addict": "When this model uses a Titan Dose, ignore up to 2 Damage markers per source of damage until the end of the round. If this model receives 3 🩸 damage while using a Titan Dose, the benefits of the Titan Dose ceases to apply. In addition, this model may use more than one Titan Dose in the game.",
  "Titan Dose (X)": "A model may use a Titan Dose when an action is declared. If it does so, the model gains +1 to its Attack and Defense skills, +4 to its Movement Skill and +1 to its Strength dice rolls until the end of the round. The same model cannot use more than one Titan Dose in the game.",
  "Time Bomb 🦇": "Target a Suspect within 8\" and LoS. Place a numeric counter with a value of 3 on this model's character card. When a model performs a Manipulate action within 8\" of this model, reduce the value of the counter by -1. If the chosen Suspect is still in play when the counter reaches 0, place an Explosive template on top of it – all models affected suffer 1 🩸 and the Slow (4) Status.",
  "Time Control": "When this model places a Suspect, you may nominate 1 enemy model. If that model is not the next enemy model to be activated, and it places a Suspect during its activation, you may search your deck for one of your Objective cards and add it to your hand. Shuffle your deck.",
  "Time Manipulation": "When this model reveals an enemy Suspect, you may look at the top two cards of any player's Objective deck. Then, place one of those cards on top of the deck, and one on the bottom.",
  "Time Stretch": "One use only. This model may target a friendly model within 4\" and line of sight. The target Model gains the Living Legend trait until the end of the round.",
  "Timely Arrival": "This model is not deployed as normal at the start of the game. Instead, during a friendly activation in which you score an Objective card, you may place this model anywhere on the gaming area, no closer than 4\" to any enemy model. This model may receive an Audacity marker even if it is not in play.",
  "To Prove a Point": "Enemy models within 6\" and LoS suffer -2 to their Willpower value while making a Willpower roll. In addition, as an extra Action, this model can target an enemy model (not a Vehicle) within 8\"\nand\nline of sight. For the rest of the round, the target cannot perform Special Actions unless it Efforts 2 ★ and to Effort during a Willpower roll must take\n2★ instead of 1.",
  "To Prove a Point": "Enemy models within 6\" and LoS suffer -2 to their Willpower value while making a Willpower roll. In addition, as an extra Action, this model can target an enemy model (not a Vehicle) within 8\" and line of sight. For the rest of the round, the target cannot perform Special Actions unless it Efforts 2 ★ and to Effort during a Willpower roll must take 2 ★ instead of 1.",
  "Total Vision": "During its activation, this model may see at any distance, and its line of sight can cross any obstacle or scenery element. It may not, however, shoot through these elements, unless using a weapon with a special rule that permits it (such as Remote Control).",
  "Tough Guy": "This model counts as two models for scoring friendly Objective cards.",
  "Tough Skin": "Strength die rolls against this model suffer a -1 penalty and can be defended against in melee just like an attack dice.",
  "Toxic (X)": "With at least 1 Successful hit, the target receives a number of 🩸 Damage markers equal to (X).",
  "Toxicologist": "Before performing an Attack, this model can exchange the Poison Status with one of the following effects during that Attack:\n• Enervating (2) Status.\n• Scared Status.\nIn addition, models suffering Damage from the Poison Status within 8\" of this model suffer 1 additional 🩸.",
  "Tracking 🦇": "Once per round, this model can remove 1 enemy Suspect within 4\" to immediately move up to 4\".",
  "Tracking Device 🦇": "Until the end of the round, each time an enemy model ends a Movement Action within 8\", you may Move a friendly model within Inspire Range 4\" at the end of that activation.",
  "Traits": "Traits provide models with various special rules. These are an exception to the basic rules and always take precedence over them where there is a conflict. In order to benefit from a trait, the model must, of course, possess it (it will be listed on the model's Character Card). Additionally, some traits require you to spend a Special action to activate the ability – these will be denoted clearly by the appearance of the Bat-Symbol (🦇).\nWhen a model activates a trait, it only benefits from that trait's effect during its own activation, unless otherwise specified.\nFinally, if a trait affects friendly models within a certain range, the model using the trait is also included, unless otherwise specified.",
  "Traits as Keywords": "Some traits (such as Cop and Criminal) don't have any special rules at all – these are known as 'keywords'. Other rules and traits reference these keywords, but they don't do anything on their own.",
  "Transport X": "X friendly models (not a Vehicle) in contact with this model during its activation can perform a Manipulate action to be removed from the game – the friendly model is not a Casualty, but is now effectively transported inside this model as a ‘passenger’ – attach this model’s Upgrade card to the passenger. Any effects affecting a passenger trigger as normal at the end of the round. The passenger must be activated as normal during each round, but the range of its traits and attacks are measured from this model’s base (unless the Vehicle has the Sealed Cabin trait). The passenger cannot be affected by any attack. During any subsequent round, the passenger can disembark the Vehicle by performing a Manipulate action – place it in contact with this model, and disable the Upgrade card, then continue its activation as normal.",
  "Transport (X)": "(X) friendly models (not a Vehicle) in contact with this model during its activation can perform a Manipulate action to be removed from the game – the friendly model is not a Casualty, but is now effectively transported inside this model as a ‘passenger’ – attach this model's Upgrade card to the passenger. Any Statuses affecting a passenger trigger as normal at the end of the round. The passenger must be activated as normal during each round, but the range of its traits and attacks are measured from this model's base (unless the Vehicle has the Sealed Cabin trait). The passenger cannot be affected by any attack. During any subsequent round, the passenger can disembark the Vehicle by performing a Manipulate action – place it in contact with this model, and disable the Upgrade card, then continue its activation as normal.",
  "Trap Master": "Once per round, when an enemy model reveals a Suspect within 8\" and in LoS with this model, that enemy model suffers ★ 🩸 Damage and Enervating (1) and Slow (4) Status.",
  "Treacherous": "This model cannot be the Boss of your crew.",
  "Treasure Hunter": "When this model inflicts the Steal Status, the opponent must target 1 of their Suspects in play. That Suspect is also now a Treasure for you. This model can Reveal as a free action a Treasure and when doing it, you may search for any card on your Objective deck and add it to your hand.",
  "Trial": "As long as this model has a Suspect in contact, the opponent must play with the first card of their Objective deck face up, if this model gets the Suspect removed from contact, then discard the face up card.",
  "Trickster": "If this model does not have an Audacity marker when it is activated, it may take one from another friendly model that is yet to activate this round.",
  "Troublemaker 🦇": "Search your Objective deck and add to your hand an Objective card with Type: Violence. Shuffle your deck.",
  "True Fear": "When scoring any number of successful hits during an Attack, add 1 Fear card to your Objective deck.",
  "True Fear": "When scoring any number of successful hits during an Attack, add 1 Fear card to your Objective deck.",
  "True Love (X)": "If the model named as the True Love (in parentheses) is in the same crew, and is removed as a Casualty, this model gains +1 Willpower and +1 Attack until the end of the game.",
  "True Psychopath": "When an model within 8\" is removed as a Casualty, you may place 2 on top of the Psychopaths Objective card instead of 1.",
  "Truly Immortal": "This model cannot become KO or be removed as Casualty from the game by any means. Instead, remove one Damage marker, then the opponent relocates this model, placing it within 4\".",
  "Truth-Seeker": "When a model within 10\" of this model becomes KO or is removed as a Casualty, you may first place a friendly Suspect marker in contact with it (ignoring the normal minimum distance between Suspect markers). This model may remove 1 friendly Suspect marker within 4\" during its activation to perform an extra move of up to 4\". In addition, when a friendly model within 4\" of a friendly Suspect marker scores an Objective card, you may remove that marker to draw an additional Objective card.",
  "Tamer Device 🦇": "Target an enemy model within 8\", move all friendly Sewer Swarm models 6\" towards that model. Make an attack with 1 of those models against the target if able, with +1 Attack dice for each another Sewer Swarm in contact with the target.",		
	

   //U
	"Unstoppable 🦇": "Each successful hit scored by this model this round requires 2 successful defense rolls to block.",
  "Undead": "This model is immune to all Statuses and CRT, except Knock Down and Blind.",
  "Undercover": "This model may be deployed up to 8\" away from its deployment area.",
  "Unpredictable": "This model's Special Action is a 'wildcard', which may be spent as another type of Action if you wish (this means the model can perform the same Action twice in its activation if it has sufficient Actions to spend).",
  "Unstoppable": "Each successful hit scored by this model this round requires 2 successful defense rolls to block.",
  "Underworld King": "When this model is included into your crew, you may take up to any 4 Objective cards that doesn't have any affiliation or are related to a model. Ignoring the multiple copy rule. Play them face up near the playing area. You may spend Business counters equal to a card's Resource cost value to play it as a Resource without paying the Resource cost. Then flip that card face down. During the Recount phase you may spend 1 Business counter per card to flip it face up.",
  "Unstoppable Monster": "At the start of this model's activation, it must move 2\" in a straight line as an extra Action. Enemy models within 4\" of this model cannot perform the Manipulate Action.",
	"Unnatural Flight": "During the round in which this model return to the game zone, due to the Flying High Trait, its Basic Movement Distance (BMD) becomes 0, and cannot use the Fly Trait.",
	"Underestimated": "This model cannot be used by the opponent to score any card.",
	"Unmask the Truth": "When this model Reveals an enemy Suspect, enemy models with the Intel Support trait receive an additional Disruption token.",
  "Umbrella's Knout Gas 🦇": "Target an enemy within 4\" and LoS. That model must take an Endurance Roll. If not successful, it suffers the Enervating (3) Status.",
  "Undercity Command 🦇": "Target friendly model within 8\" of this model, and within 4\" of a Sewer marker, follow the rules of using that Sewer marker immediately, but it can be moved later in the round during its activation (ignoring the Sewer penalty).",
  "Undercity Knowledge": "Before both groups of both crews are selected, target up to 3 friendly models with Name: Unknown. When both groups are deployed (including any other rule like Hidden), the targeted models may be deployed within 4\" of a Sewer marker. If both sides have this rule, start with the player with setup initiative.",
  "Upgrades": "This model allows your crew to purchase the Equipment pieces marked as Lucius's Inventions. Only one of these equipment options are active during the game and only the active equipment option applies its effects to the equipped models. Mark the active equipment at the start of the first activation of the game. The Upgrades are: Improved Batclaw (only purchasable by models with the Batclaw/ Grapple Gun trait), Improved Batlings (only purchasable by models with a weapon with the Throwing trait), Improved Bat-Armor (only purchasable by models with the Bat-Armor MkII trait) and Improved Reinforced Gloves (only purchasable by models with the Reinforced Gloves trait).",


  //Y
  "You're Fun": "During the first Raise the Plan phase of the game, target an enemy model. When an Objective card is scored during the activation of the target, this model gains a Free Manipulate action until the end of the round.",


  // V
	"Vengeance": "At the start of the game, target an enemy model that cannot have the Rank: Henchman (unless no other option is available). Convert all the ★ damage this model inflicts to it to 🩸. In addition, scored Dirty Job Objective cards provide 2 VP each (instead of 1) even if this model is not in the Gaming Area.",
  "Venom Dose (X)": "A model may use a Venom Dose when an action is declared. If it does so, for the rest of the round the model gains +1 to its Strength die rolls and may make 2 free Efforts when performing a Melee Attack.",
  "Venom Enrage": "When this model uses the Venom Dose trait the first 2 Damage markers received by this model during each round are ignored.",
  "Veteran": "When one of your Objective cards requires the possession of a named trait to complete it, this model counts as having that trait (it can’t actually use the trait, but it is able to fulfill the Objectives). This trait is also considered a Keyword.",
  "Vanish 🦇": "Perform an extra Attack action with this model's EM Smoke Grenades (not affected by Rapid Fire), inflicting a single automatic hit. For the duration of this attack, the EM Smoke Grenades gain the Light special rule. If this model has not moved during its activation and is beneath the template when it makes this attack, this model may be placed anywhere within 4\" of its current position. This model cannot move (or use the Grapple Gun/Batclaw Trait) for the remainder of its activation. This model ignores the Damage and ignores the rules of the Smoke event marker caused by its own EM Smoke Grenades. This use of this trait requires a magazine as usual but does not count as the model's Attack Action.",
  "Vertigo Dose (X)": "A model may use a Vertigo Dose during its activation. If it does so, for the rest of the round the model gains +1 Willpower and can reroll failed Willpower rolls.",
  "Volunteer": "This model cannot be selected by a Cranial Bomb Activated card. When this model gains a Task token, instead may be placed on another friendly model within 8\" and LoS.",
  "Vulnerability to Fire": "When this model suffers Damage by the Fire Status, inflicts to it 1 🩸 Damage additionally.",
  "Vigilante Resources": "This model can assign Equipment cards during Phase A of the game instead of Crew configuration.",
  "Vocational": "This model may be included in a crew as if it had its Affiliation, as long as all members of the crew have the Cop trait.",
  "Void Priest": "When a friendly model within 4\" of this model makes an Attack, you can remove a friendly Suspect that is within 4\" of this model, then that attack inflicts the Poison Status.",
  "Vigilante's Work": "During its activation, this model may take up to 1 Effort to perform an extra Manipulate action.",
	"Vampire": "Enemy models roll 1 fewer attack die when targeting this model and when this model inflicts 🩸 with a Melee attack, remove 1 Damage marker. In addition, at the start of this model's activation, if is it not within the area effect of a Light source it may remove 1 Damage marker.",
  "Vampire Reign": "Enemy models within 8\" suffer -1 to it's attack and defense dice rolls and may not use the Dodging rule.",
  "Visor Projections": "At the start of this model's activation, choose one of the following to apply to this model's weapons. - Gains the Handy trait. - Gains the Reach (8) trait. - Change the damage type of the weapon to 🩸.",
	"Vanguard Team": "This model places an additional Counter for the purpose of the Extermination Mission Objective cards. When Misunderstood Orders Objective card targets this model, it may Move 4\".",   "Vendetta": "When this model damages an enemy with an action, it immediately Reveals an enemy Suspect within 8\" of the target.",

  // W
  "[TEAM] Inspire": "All other friendly models that start their activation within 8\" of this model gain 1 extra Manipulate action.",
	"360° Strike 🦇": "When this model performs a Melee Attack this round, it must be performed against all the models available to be a target (friendly and enemy). During this attack, no one model can make Efforts. Roll only once, and compare with all the targets results. Friendly models cannot make defense rolls against these attacks, but they cannot be the only models affected by it (there must be at least one enemy to target).",
  "Watchmen": "Can only be affiliated with other models with the special 'Watchmen' rank. A Watchmen crew does not require a model with Rank Leader. This model is not affected by the Run Away rule, and is considered a model with Rank Free Agent for awarding VPs.",
  "Weak": "This model's Effort Limit begins at 2 Instead of 3.",
  "Weakness to Cold": "If this model receives the Cold or Freeze Statuses, they also receive a 🩸 marker.",
  "Weapon Master": "This model gains a +1 bonus to attack dice rolls when performing Melee Attacks, as long as it is not Unarmed.",
  "Wizard of Quiz": "When this model places a Suspect within 8\" of an enemy model, if that enemy model can see this model and the Suspect, you may look at the top 2 cards in that model's controller's Objective deck. Discard one of the cards and place the other one on top of the deck.",
  "War Goes On": "During this model's activation, place a new friendly model with Alias: Batman (Frank Miller) in contact and remove this model from the game. Transfer all Damage, Statuses, Audacity, and any Objectives that had targeted this model to the new model. If there were any unspent actions remaining, continue this activation using the new model. No Objectives may be scored as a result of this trait. *This model counts as Alias: Batman (Frank Miller) Leader for the purpose of forming your Objective deck.",
  "Welcome to Hell": "If this crew contains only models with The Dark Knight Returns and Cop traits, all your models with The Dark Knight Returns keyword may take 🩸 instead of ★ when making an Effort.",
  "Wheelchair": "Friendly models in contact with this model can take a Manipulate Action to move it up to 3\" directly away. Then, the model that took the action is placed in contact with this model.",
	"Weird True Love": "At the end of any action that inflicts damage to a friendly Howard model within 8\" of this model, this model may move up to 4\" towards the friendly Howard model, then remove 1 damage from that model.",
	"War Scream 🦇": "All models within 8\" and LoS with less Willpower than this model suffers Scared.",
  "Widespread Corruption 🦇": "Target an enemy Suspect within 8\" and LoS. Place a friendly Suspect in contact and remove the enemy Suspect.",
	"Wah! Wah! Wah!": "All the models within 8\" and LoS to this model counts as having Audacity for the Stage Play Objective card.",
  "Walking Plant": "This model does not benefit from its Action Zone to perform Attack and Manipulate actions.\nIn addition, if this model starts its activation within 8\" from a friendly model with the Elite Boss (Plants) trait, it removes 1 Damage, if not, it suffers 1 🩸.",
  "Walking Suspects": "When this model performs the Manipulate action to Place or Reveal a Suspect, it is immediately removed as a Casualty.",
  "Working In Advance": "At the end of step 6 of Prepare the Game, you must inflict the Terror Status onto an enemy model.",


  //Y
  "You're Fun": "During the first Raise the Plan phase of the game, target an enemy model. When an Objective card is scored during the activation of the target, this model gains a Free Manipulate action until the end of the round.",


  //Z
  "Zoom, Zoom": "This model may spend its movement action to place a friendly Suspect anywhere in the gaming area more following the usual rules.",


   //WEAPON - EFFECTS
  "M. Range": "The effective range of this weapon is 16”.",
  "S. Range": "The effective range of this weapon is 8”.",
  "Accurate": "An attack made by this weapon gains +1 to its attack dice rolls.",
  "Acid": "Status. When this weapon damages a target, that model reduces its Attacks and Defense skills by -1 until the end of the round (this effect does not stack if the weapon or another weapon with the same rule damages the target several times). In addition, these weapons ignore the Light Armor trait.",
  "Aim": "A model that doesn't move in the same activation that it uses this weapon, gains a +1 to its attack dice rolls.",
  "Anti-Tank": "This weapon ignores the penalty of Light, Medium and Heavy Armor traits, and may re-roll failed Strength die rolls against models with those traits. Furthermore, Anti-Tank weapons ignore the Bulletproof Vest, Hardened and Kevlar Vest traits.",
  "Assault": "When using this weapon, this model can choose to ignore the penalty for move before attack, but instead suffer a -1 penalty to its Ranged attack dice rolls.",
  "Beam": "The Strength die when using this weapon always hits on 2+. Ignore the wielder’s Strength for the 2-. Ignore roll. In addition, ignore the target’s Cover. Beam weapons cannot receive an Ammo Magazine from an Ammo Crate.",
  "Bleed (X)": "Instead of inflicting normal Critical effect, the target suffers (X) 🩸 Damage upon a Critical Hit.",
  "Blind": "Status. A model suffering from Blind Status cannot trace Line of Sight, and cannot perform Ranged Attacks. All of the model’s attack, Strength and defense dice rolls will only succeed on a natural result of 6. In addition, the model suffers Impaired Movement. This effect lasts until the end of the round.",
  "Blunt (X)": "Instead of inflicting normal Critical effect, the target suffers (X) ★ Damage upon a Critical Hit.",
  "Casualty": "If this rule is triggered (as part of a Critical effect rule for example), then the target model is removed from play as though it had received its maximum allocation of 🩸 counters.",
  "Caustic": "Even when this weapon’s Strength die fails, the target takes 🩸 Damage.",
  "Charge 🦇": "This trait must be activated before the model moves during its activation. During a Movement action this activation, this model may only move in a straight line. Roll 1 Strength die for each model contacted during this move, inflicting Damage ★★. Any other damage the model could normally inflict is ignored.",
  "Cold": "When this rule hits, the target model increases the Slow Status value by (2), unless it doesn’t have it, then it suffers the Slow (2) Status.",
  "Cooled": "Place a Cooled marker on the character card of the affected model. A cooled model reduces its Defense skill by -1, and cannot make Efforts. Affected Speedsters cannot use Speed Force Powers. This effect lasts until the end of the round.",
  "Crushing": "Each successful hit scored with this weapon requires 2 successful defense rolls to block.",
  "Deadly Strike 🦇": "Once this trait is activated, this model gains CRT: Casualty on its Melee Attack Actions for the rest of the round.",
  "Defensive": "A model carrying this weapon can reroll failed Defense rolls. This is a passive ability, and may be used even if the model used a different weapon during its activation.",
  "Devastating": "Attacks with this weapon roll two Strength dice. You must apply both results.",
  "Devastating Blow 🦇": "Once this trait is activated, this model gains a +1 Strength die roll bonus and Bleed 1 on its Melee Attack Actions until the end of the round.",
  "Electric": "This weapon has CRT: Stunned, and can reroll failed Strength die rolls against targets with the Bot, Cybernetic or Robot traits.",
  "Electric Storm 🦇": "Center the Explosive template on this model. Roll a Strength 3+ die against all models affected by the template (except the attacking model itself) with Damage ★★.",
  "Enervating (X)": "Status. When the model affected is going to perform an action/using a trait/being targeted by an attack, before that, the opponent may choose to reduce the Effort Limit of the target by -(X) during that time frame. Then remove this Status.",
  "Expansive": "Instead of having a Rate of Fire, this weapon uses the Spray Template to determine how many models are hit (see Templates, below).",
  "Explosive": "Place the Explosion Template over the impact point (usually the target model).",
  "Fire": "Status. When a model is affected by the Fire Status, it gains the Fire Status. All friendly models affected by the Fire Status suffer 🩸 when you score an Objective card with the Burn keyword in its Resource or use the Burn keyword as a Resource. When another friendly model Sets a Suspect in contact with a model affected by the Fire Status, you may remove the Fire Status.",
  "Firearm": "The Strength die when using this weapon always hits on a result of 2+. Ignore the wielder’s Strength for the Damage roll.",
  "Flaming Wave 🦇": "Center the Explosive template on this model. Roll a Strength 3+ die against all models affected by the template (except the attacking model itself) with Damage 🩸 and the Fire Status.",
  "Freeze": "Status. Place a Freeze marker on the Character card of the affected model. The model reduces its Defense skill by -1, and cannot perform Actions. At the beginning of the model’s activation, it must pass an Endurance roll to remove the Freeze Status. Speedsters cannot use Speed Force Powers if they are affected by the Freeze Status.",
  "Gas": "This weapon ignores the penalty of Light, Medium and Heavy Armor traits.",
  "Grenade": "Weapons with the 'Grenade' type (i.e. Explosive Grenades) are used just like other ranged weapons for the purposes of line of sight. However, when a model throws a grenade, it may target any point on the table completely within Effective range and LoS, not needing a model as a target.",
  "Handy": "When using this weapon, the wielder may reroll failed attack dice rolls.",
  "Heavy": "When using this weapon, the attacker gains a +1 to its Strength die rolls.",
  "Hypnotize": "Status. Any non-vehicle model affected by Hypnotize must make a Willpower roll immediately. If it fails, it immediately performs up to 2 different actions under the control of the player who hypnotized it counting as one of that player’s crew in all respects. While performing these actions, you may perform up to 2 Free Efforts (you cannot make another Efforts) and you do not expend Ammunition. Counts as if you are performing an activation for traits and performing actions. Models that are Hypnotized cannot be moved so they would Fall or otherwise take Damage. Nb: If you move and shoot for example, you lose attack dice as usual, you cannot repeat actions, but you are affected by active traits (special actions) that remains active for the activation of the model (like Inspire, Sewer Worker...). That model (may be activated by its owner later, because is not an activation).",
  "Imprecise": "This weapon suffers a -1 penalty to attack dice rolls.",
  "Knocked Down": "Status. Place a Knocked Down marker on the Character Card of the affected model. A Knocked Down model cannot attack, or defend itself. It cannot make Efforts, and cannot use any trait that requires an Action or Effort to activate until it Stands Up. A Knocked Down model suffers -1 to its Defense value.",
  "Kryptonite": "If a weapon with this rule hits a model with the Kryptonian trait, the Kryptonian model loses the Invulnerability and Regeneration traits (if they possess them) until the end of the round.",
  "Lethal Blow 🦇": "Once this trait is activated, for the rest of the round when this model damages a non-vehicle enemy with a Melee Attack Action, the damaged model suffers the Stunned Status too.",
  "Light": "A model can fire this weapon even when it is in contact with an enemy model.",
  "Magic": "An attack made with this special weapon trait is considered a Cast a Spell action that uses the Attack action of the model and assigns the caster 1 Magical Counter.",
  "Mechanical": "The Strength die when using this weapon always hits on a result of 3+. Ignore the wielder’s Strength for the Damage roll.",
  "Medium Range": "The effective range of this weapon is 16\".",
  "One Use": "This weapon can only be used once per game.",
  "Overwhelming": "The target of an attack made by this weapon suffers -1 to its Defense rolls.",
  "Paralyze": "Status. A paralyzed model reduces its Defense skill by -2, and cannot perform Actions until the end of the round.",
  "Poison": "Status. If a non-vehicle model is affected by Poison, increase its Poison Status by 1. A model affected a subsequent time by the Poison Status increases its Poison value by 1 (up to a maximum of 4). During the Recount phase, the poisoned model must make an Endurance roll, with a -X penalty to its Endurance value for the roll (where X is the current Poison value). If the roll fails, the model suffers 1 🩸 Damage if its Poison value is 1-3, or 🩸 🩸 if it has a Poison value of 4.",
  "Poison (X)": "Status. If a non-vehicle model is affected by Poison, place a Poison marker on its character card. A model affected a subsequent time by the Poison effect increases its Poison value by 1 (up to a maximum of 4). During the Recount phase, the poisoned model must make an Endurance roll, with a -X penalty to its Endurance value for the roll (where X is the current Poison value). If the roll fails, the model suffers 1 🩸 Damage if its Poison value is 1-3, or 🩸🩸 if it has a Poison value of 4.",
  "Power Strike 🦇": "Once this trait is activated, for the rest of the round when this model damages a non-vehicle enemy with a Melee Attack Action, the damaged model suffers the Knocked Down Status too.",
  "Precise Blow 🦇": "Once this trait is activated, for the rest of the round this model gains a +1 bonus to its attack dice rolls, and may reroll the Strength die.",
  "Protective": "These weapons award a +1 to the wielder's defense dice rolls. Furthermore, the wielder benefits from the Cover rule at all times (cannot be evade by any rule unless it states clearly that it ignores the Protective trait). This is a passive ability, and may be used even if the model used a different weapon during its activation. If the model also benefits from the Cover rule by other means, then the bonus is doubled. Once per round a friendly model in contact can benefit from this rule too.",
  "Push": "The affected model is moved directly away from the attacker up to X”.",
  "Reach (X)": "These weapons do not require the wielder to be in contact with an enemy model in order to perform a Melee Attack against it. Instead, the wielder may strike a model up to X\" away and in LoS.",
  "Red Dot": "Weapons with this special rule can reroll up to 1 failed attack die roll when performing an Attack.",
  "Reload": "After performing a ranged attack with this weapon, it must Reload. you may not use the weapon until it is Reloaded. In order to Reload you must spend a whole round not using this weapon.",
  "Remote Controlled": "When using these weapons, the model needs to be able to see the target as usual but does not need to draw a straight uninterrupted line to it. Instead, measure range from the attacker’s base to the target, carefully measuring around obstacles. The weapon’s maximum range cannot be exceeded in order to reach the target. Targets of Remote Controlled weapons cannot benefit from Cover against these attacks.",
  "Scared": "Status. The affected non-vehicle model cannot use the Dodging rule, and suffers -1 to its attack and defense dice rolls. This Status lasts until the end of the round.",
  "Scope": "While performing a Ranged Attack with this weapon, the firer can see at any distance, limited only by LoS. Targets cannot benefit from Cover against attacks with this weapon.",
  "Sharp": "When using these weapons, the wielder may reroll failed Strength die rolls.",
  "Short Range": "The effective range of this weapon is 8\".",
  "Silencer": "The target of an attack made by this weapon cannot use the Dodging rule against it.",
  "Slow": "Status. A model suffering this effect reduces by its basic movement distance by X” during its next Movement action.",
  "Slow (X)": "Status. A model suffering this effect reduces by its basic movement distance by X” during its next Movement action.",
  "Smoke": "Place a Smoke event marker centered at the target point (or as close as possible). Models cannot draw LoS if it passes within 2\" of the Smoke marker. Models while within 2\" of a Smoke marker suffer the Blind Status. The Smoke marker is removed at the end of the Recovery phase. Weapons with the Smoke rule cannot be canceled.",
  "Sneak Attack": "If, at the beginning of the attacker's activation, the target could not see the attacker, the target model cannot make Efforts when defending against this model during that activation.",
  "Sonic": "Status. When a model is affected by the Sonic status, place a Sonic counter on it. When the affected model is going to take a Skill test, before rolling and after the target declares if it Effort, you can remove the Sonic counter to increase its results by 2.",
  "Steal": "If you successfully hit a model with a weapon with this rule, the opponent must show you their Objective card hand. Choose one of those cards – the opponent must Discard it.",
  "Stunned": "Status. A Stunned model can only perform Movement actions until the end of the round.",
  "Terror": "Status. When an enemy model suffers the Terror Status, you draw 1 Objective card from the top of your opponent's Objective deck and place it facedown in your Terror pile. When an enemy model would make an Attack dice roll, Defense dice roll, or a Willpower roll during its activation, after the action is resolved, the opponent may reveal up to 3 cards from your Terror pile. Apply the Poison Status a number of times equal to the number of cards revealed. If the model already have or reaches Poison (4), it immediately takes a Poison test. After applying the Status, put the cards at the bottom of the original owner's deck. If you can not draw, the enemy model instead suffers ★★.",
  "Terror (X)": "Status. When an enemy model suffers the Terror Status, you draw 1 Objective card from the top of your opponent's Objective deck and place it facedown in your Terror pile. When an enemy model would make an Attack dice roll, Defense dice roll, or a Willpower roll during its activation, after the action is resolved, the opponent may reveal up to 3 cards from your Terror pile. Apply the Poison Status a number of times equal to the number of cards revealed. If the model already have or reaches Poison (4), it immediately takes a Poison test. After applying the Status, put the cards at the bottom of the original owner's deck. If you can not draw, the enemy model instead suffers ★★.",
  "Toxic": "With at least 1 Successful hit, the target receives a number of 🩸 Damage markers equal to (X).",
  "Toxic (X)": "With at least 1 Successful hit, the target receives a number of 🩸 Damage markers equal to (X).",

  //EQUIPMENT LIST
  "EQUIPMENT LIST - GCPD": "0-2 Magazine ($200): +1 to Ammunition for one weapon.\n0-2 Flashlight ($50): Model gains the Lantern rule.\n0-2 Handcuffs ($100): Model gains the Arrest rule.\n0-2 Whistle ($150): Model gains the Halt/Stop rule.\n0-1 Street Patrol ($50): Model gains the Street Guy rule.\n0-1 Intensive training ($100): Model gains the Teamwork (1) (All) rule.\n0-2 Radio ($200): This model is always treated as though it were within range of it's Boss's Inspire trait.\n0-1 Antidote ($50): Model is immune to the Poison Status.\n0-1 Grapple-gun ($200): Model gains the Batclaw/Grapple-gun rule.\n0-1 Helmet ($100): Model gains the Hardened rule.\n0-1 Patrol Training ($150): Model gains the Undercover rule.\n0-1 Gas Mask ($100): Model gains the Gas Mask rule.\n0-2 Riot Gear ($150): The models gains the Football Gear rule.\n0-1 Medic ($150): Model gains the Medic rule.\n0-2 SWAT Special Training ($100): If the model has Elite (SWAT) trait you can choose one of these options:\n\n- Model gains the Tracking rule.\n- Model gains the Precise Aim rule.\n\nThe following options may be taken only when a model with Name: Bruce Wayne is in the crew:\n0-1 Upgraded Batsuit ($200) (Can only be purchased by Bruce Wayne): Model gains +1 to Endurance.\n0-1 Kevlar Cowl ($200) (Can only be purchased by Bruce Wayne): Model gains Immunity to CRT.\n0-1 EMP ($100): Model Gains the EMP rule.\n0-1 Martial Arts Training ($100+2 Rep Points) (Can only be purchased by Sidekick or Free Agent): Model gains the Martial Artist rule.\n0-1 Mentor ($100+3 Rep Points) (Can only be purchased by Sidekick or Free Agent): Model gains the Hidden Boss rule.\n0-1 Hidden Magazine ($300) (Can only be purchased by Leader or Sidekick): +1 to Ammunition for one weapon.\n0-1 Morality ($50) (Can only be purchased by Batman): Model gains Moral Compass and Demotivate rules.\n\nThe following options may be taken only when a model with Name: Dick Grayson is in the crew:\n0-1 Circus Training ($200+5 Rep Points): Model gains the Acrobat rule.\n0-1 Runner ($100): Model gains the Tireless rule.\n\nThe following option may be taken only when a model with Name: Oliver Queen is in the crew:\n0-1 Command Center Support ($250): Model gains the Scheming (2) rule.\n0-1 Tactical Gloves ($50) Only can be taken by Oliver Queen, gains Reinforced Gloves rule.\n\nThe following option may be taken only when a model with Name: Roy Harper is in the crew:\n0-1 Hi-Tech Ammo ($150+2 Rep Points): One of the model's ranged weapons gains Bleed (2).\n\nThe following option may be taken only when a model with Name: Kathy Kane is in the crew:\n0-1 Officer training ($100+2 Rep Points): Model gains the Follow Me! rule.\n\nThe following option may be taken only when a model with Name: Tim Drake is in the crew:\n0-1 Inspiring Presence ($250) (Can only be taken by Tim Drake): Model gains Leadership rule.\n\nThe following option may be taken only when a model with Name: Barbara Gordon is in the crew:\n0-1 Watch Tower ($200) (Can only be taken by Batgirl): Model gains Exhaustive Planner rule.\n\nThe following option may be taken only when a character with Alias: Red Hood (Arkham Knight) is in the crew:\n0-1 Deadly Weapons ($150+2 Rep points) (Can only be taken by Red Hood Arkham Knight): Weapons gain the Silencer rule.\n\nThe following option may be taken only when a model with Name: James Gordon is in the crew:\n0-1 Heliport ($150) (Can only be taken by James Gordon): When you use the Air Support rule, target an enemy model affected by the template, the target receives a Ranged attack with ROF 1, the Firearm weapon special rule and damage 🩸🩸 which ignores the Cover Rule.*\n0-2 Sergeant Training ($50): Model gains the Order rule.*\n\nThe following option may be taken only when a model with Name: Selina Kyle is in the crew:\n0-1 Feline Stalk ($200): Model gains Tracking rule.*\n\nEquipment marked * cannot be affected by the Broken Equipment rule.",
  "EQUIPMENT LIST - Joker": "0-2 Magazine ($200): +1 to Ammunition for one weapon.\n0-2 Grapple-gun ($300): Model gains the Batclaw/Grapple-gun rule.\n0-2 Clown Paint ($150): Model gains the Distract rule.\n0-2 Flare ($300): Model gains the Flare rule.\n0-2 Neurotoxic Drugs ($250): Model gains +2 Movement and Dodge trait.\n0-1 Improvised Armor ($150): Model gains the Hockey Gear rule.\n0-1 Gas Mask ($100): Model gains the Gas Mask rule.\n0-1 Antidote ($100): Model is immune to the Poison Status.\n0-1 Poison Training ($200): Model gains the Poison Master trait.\n0-1 Mental Torture ($150): Model gains the Aggressive Schizophrenia trait.\n0-1 Joker's Gas ($100): Model gains the Joker's Gas trait.\n\nThe following option may be taken only when a model with Alias: Joker is in the crew:\n0-2 Nerve Gas ($150): Model gains the Sturdy rule.\n\nThe following options may be taken only when a model with Name: Harleen Quinzel is in the crew:\n0-1 Sexy Costume ($300+5 Rep Points): Model gains the Disarray rule.\n0-1 Pole Dancer ($150): Model gains Escape Artist rule.\n\nThe following option may be taken only when a model with Alias: Gaggy is in the crew:\n0-1 Enhanced Gas ($200)(Can only be Purchased by Leader or Sidekick): When an enemy model within 8\" of this model suffers the Nerve effect, it is increased by +1.\n\nThe following option may be taken only when a model with Name: Duela Dent is in the crew:\n0-1 Rusty Tools ($200+2 Rep Points): Model gains the Cruel rule.\n\nThe following option may be taken only when a model with Name: Mr. Hammer is in the crew:\n0-1 Brutal Training ($150): Model gains the Savage Fighter rule\n\nEquipment marked * cannot be affected by the Broken Equipment rule.",
  "EQUIPMENT LIST - Penguin": "0-2 Magazine ($200): +1 to Ammunition for one weapon.\n0-2 Grapple-gun ($200): Model gains the Batclaw/Grapple-gun rule.\n0-2 Laser Sight ($150): Model gains the Laser Sight rule.\n0-2 Camo Vest ($150): Model gains the Stealth rule.\n0-1 C4 ($100): Model gains the Explosive Gel trait.\n0-2 Radio ($200): This model is always treated as though it were within range of it's Boss's Inspire trait.\n0-1 Backpack ($100): Model gains the Backpack rule.\n0-3 Biker Jacket ($100): Model gains the Hockey Gear trait.\n0-1 Helmet ($150): Model gains the Hardened trait.\n0-1 Raised on the Streets ($150): Model gains the Plead trait.\n\nThe following option may be taken only when a model with Name: Oswald C. Cobblepot is in the crew:\n0-1 Ostentatious Clothes ($200): Model gains the Goad rule.\n\nThe following option may be taken only when a model with Alias: Emperor Penguin is in the crew:\n0-2 Trained Mobsters ($250+2 Reputation Points): Model gains +2 Endurance.\n\nIceberg Lounge Equipment Options, can only be selected 1 of they:\n0-1 Neurotoxic Drugs ($500): Model gains +2 Movement and Dodge trait.\n0-1 Silencer ($400): One of the model's ranged weapons gains the Silencer trait.\n0-1 Weird Ammo ($300): Model's Ranged attacks gain either the Enervating 2 or Anti-tank trait.\n0-1 Mutation Serum ($500): Model gains the Tough Skin and Desensitized trait.\n0-1 Fear Gas Dispenser ($600): Model gains the Inspire Fear trait.\n0-1 Titan Dose ($300): Model gains one Titan Dose.\n0-1 Prototype Freeze Ray ($500): Model gains the Ice Flash trait.",
  "EQUIPMENT LIST - Bane": "0-2 Magazine ($200): +1 to Ammunition for one weapon.\n0-2 Grapple-gun ($300): Model gains the Batclaw/Grapple-gun rule.\n0-2 Titan Dose ($100): Model gains one Titan Dose.\n0-1 Night Vision Goggles ($200): Model gains the Night Vision rule.\n0-3 Venom Dose ($100): Model gains one Venom Dose.\n0-1 Backpack ($100): Model gains the Backpack rule.\n0-1 Antidote ($50): Model is immune to Poison Status.\n0-2 Neurotoxic Drugs ($250): Model gains +2 Movement and Dodge trait.\n0-2 Camo Vest ($200): Model gains the Stealth rule.\n0-3 Gas Mask ($150): Model gains the Gas Mask rule.\n0-1 War Hardened ($200): Model gains the Cruel trait.\n\nThe following options may be taken only when a model with Name: Bane is in the crew:\n0-1 Handcuffs ($100): Model gains the Arrest rule.\n0-1 Venom Laboratory ($100+5 Rep Points) (Can only be purchased by Leader or Sidekick): All models in your crew can use more than 1 Titan Dose per game. This model is removed from play even if on the board. Also, the cost of Venom Doses in the equipment list is reduced to $50.\n0-2 Venom Applicator ($0+2 Rep Points): This model can use Titan (and Venom Doses) on a friendly model in contact.\n\nThe following options may be taken only when a model with Name: Bird is in the crew:\n0-2 Military Progress ($150): Model gains Veteran rule.\n\nThe following options may be taken only when a model with Name: Thomas Wayne is in the crew:\n0-1 Dual Handguns ($300+7 Rep Points)* (Can only be purchased by Thomas Wayne): Model gains the Rapid Fire trait and the following weapon: Dual Handguns: 🩸★ ROF:4 AMMO:3 S. Range / Firearm / Light / Assault.\n0-1 Surgeon Training ($200): Model gains the Medic trait.\n\nThe following option may be taken only when a model with Alias: Scarecrow (Arkham Knight) is in the crew:\n0-1 Fear Gas Dispenser ($150): Model gains the Inspire Fear rule.\n0-1 Secret Laboratory ($100+2 Rep Points)* (Can only be purchased by Scarecrow): At the start of the game you can choose up to 2 henchmen in your crew. These models let you use Scarecrow Inspire Fear from those models' position as if Scarecrow would be placed over there. The Willpower roll caused by any Inspire Fear suffers a +1 Penalty to the roll.\n\nThe following option may be taken only when a character with Name: Jason Todd is in the crew:\n0-2 Radio ($150): This model is always treated as though it were within range of the Inspire rule.\n0-1 Hidden Magazines ($200) (Only can be taken by Jason Todd): +1 Magazines to one weapon.\n0-1 Cybernetic Arms ($50) (Can only be purchased by Jason Todd): Gains Reinforced Gloves rule.\n0-1 Arkham Knight Secret Armour ($100): One ranged weapon of this model gains the Acid rule.\n0-1 Hook Pistol ($400) (Can only be purchased by Jason Todd, and one is the Boss): Gains the Grapple Gun and the following ranged weapon: Electric Hook: ★ ROF:1 Ammo:2 S.Range / Mechanical / Electric / Devastating.\n\nThe following option may be taken only when a model with Name: Slade Wilson is in the crew:\n0-1 Martial Training ($150): Model gains the Martial Artist and Master Fighter rules.\n0-1 Contract ($0*) (Can only be purchased by Slade Wilson): Gains rank Leader or Sidekick.\n\nEquipment marked * cannot be affected by the Broken Equipment rule.",
  "EQUIPMENT LIST - Court of Owls": "The following options may be taken only for Henchman and Free Agents models:\n0-2 Magazine ($100): +1 to Ammunition for one weapon.\n0-2 Climbing Claws ($100): Model gains the Climbing Claws rule.\n0-1 Antidote ($100): Model is immune to the Poison effect.\n0-2 Camo Vest ($100): Model gains the Stealth rule.\n0-1 C4 ($300): Model gains the Explosive Gel rule.\n0-1 Gas Mask ($150): Model gains the Gas Mask rule.\n0-1 Grapple-gun ($400): Model gains the Grapple-gun rule.\n0-1 Ancient Weapon ($200): Model's Close Combat weapon attacks gain Bleed(1).\n0-3 Genetic Alteration ($100): Model gains +2 Movement.\n0-2 Hunter Training ($150): Model gains the Sneaking rule.\n0-2 Ancient Training ($150): Model gains Master Fighter rule.\n0-1 Circus Grooming ($100): Model gains Combat Flip rule.\n\nThe following option may be taken only when a model with Alias: The Court is in the crew:\n0-1 Lords of Gotham ($200) (Can only be purchased by The Court): This model's crew generates 1 extra Sewer marker.\n\nThe following option may be taken only when a model with Name: Lincoln March is in the crew:\n0-1 Talon Serum Infusion ($200) (Can only be purchased by Lincoln March): Once per game, at the start of the Raise the Plan phase, choose up to three friendly models with the Reanimated Owl trait. Those models gain 1 additional Strength die to their attacks until the end of the round, but then at the Recovering phase (when resolving effects) suffer 1 🩸.",
  "EQUIPMENT LIST - The Riddler": "0-2 Magazine ($200): +1 to Ammunition for one weapon.\n0-2 Grapple-gun ($300): Model gains the Grapple-gun rule.\n0-1 Mirror Games ($100): Model gains the Magic Tricks trait.\n0-2 Enigma Data-Pack ($100): Model gains the Bluff traits.\n0-1 Broken Equipment Pack ($250): Before Phase A of the pre-game sequence choose one item of equipment purchased by the opposing player before the game begins. That item may not be used during the game.\n0-1 Gas Mask ($200): Model gains the Gas Mask rule.\n0-2 Another One! ($150): Model gains the Drop a Riddle trait.\n0-1 Level Up ($150) (Can only be purchased by the Riddler): At the start of your first 2 Raise the Plan phase, you may place up to 2 friendly Suspect markers at least 4\" away from your Deployment zone.\n\nThe following option may be taken only by models with Alias: Quell:\n0-1 It's a Dud ($100): At the start of this model's activation you may remove 1 Riddle marker from the Gaming Area.\n\nThe following option may be taken only by models with Alias: Echo:\n0-1 Inspiration ($100): When this model plays an Objective card, it may immediately search into your Objective deck 1 card to add it to its controller's hand (instead of replenishing that played card).\n\nThe following option may be taken only by models with Alias: Query:\n0-1 Weird Ammo ($100): This model choose one: Enervating (2) or Anti-Tank. Its ranged weapons gain that rule.\n\nThe following option may be taken only by models with the Bot trait:\n0-1 Battle Bot ($250+3 Rep Points): Model gains the Claws rule.\n0-1 Shock Droid ($50): Model gains the CRT: Stunned rule.\n0-1 Improved Chassis MK ($50): The model gains Tireless rule.\n\nThe following option may be taken only when a model with Alias: The Riddler (Arkham Knight) or The Riddler's Mech (Arkham Knight) is in the crew:\n0-1 Improved Armor ($250+2 Rep Points)* (Can only be purchased by the Riddler): Bots in your Crew gain Light Armor Trait.\n0-1 Enhanced Servo-engines ($150)* (Can only be taken by Riddler's Mech): Riddler's Mech gains +1 to Movement and Combo: Mechanic Claw.*\n\nEquipment marked * cannot be affected by the Broken Equipment rule.",
  "EQUIPMENT LIST - Mr. Freeze": "0-2 Magazine ($200): +1 to Ammunition for one weapon.\n0-1 Grapple-gun ($150): Model gains the Grapple-gun rule.\n0-2 Cryo-Grenade ($100): Model gains the Cryo-Grenade rule.\n0-1 Med-pack ($200): Once per game remove 2 Damage markers from a model in contact with this model.\n0-1 Scope ($300): One of the model's ranged weapons gains the Scope rule.\n0-1 Gas Mask ($150): Model gains the Gas Mask rule.\n0-1 Cool Generator ($300): Model gains the Stop! rule.\n\nThe following option may be taken only when a model with Name: Victor Fries is in the crew:\n0-1 Freeze Generator ($150): Model gains Shockwave rule.\n0-2 Engineer Training ($150): Model gains the Handyman rule.\n\nThe following option may be taken only when a model with Alias: Killer Frost is in the crew:\n0-1 Queen's Chosen ($200): Model gains the Bodyguard rule.\n\nThe following option may be taken only when a model with Alias: Poison Ivy (1997) is in the crew:\n0-1 Ivy's Snow Coat ($200) (Can only be purchased by Poison Ivy): Model gains the Cold Acclimation trait.\n\nEquipment marked * cannot be affected by the Broken Equipment rule.",
  "EQUIPMENT LIST - League of Shadows": "0-2 Magazine ($200): +1 to Ammunition for one weapon.\n0-1 Loyalty Tattoo ($200): Model gains the Bodyguard rule.\n0-2 Climbing Claws ($100): Model gains the Climbing Claws rule.\n0-1 Trained in the Shadows ($200): Model gains the Hidden rule.\n0-1 Gas Mask ($100): Model gains the Gas Mask rule.\n0-1 Grapple-gun ($400): Model gains the Grapple-gun rule.\n0-2 Combat Bracers ($150): The model's close combat weapons and unarmed attacks gain the Defensive weapon special rule.\n0-1 Venom Dose ($100): Model gains one Venom Dose.\n0-1 Precise Orders ($150): Model gains Chain of Command.\n0-1 Pure Lazarus ($300) (Can only be purchased by Leader or Sidekick): Model gains the Regeneration trait.\n\nThe following option may be taken only when a model with Name: Ra's al Ghul is in the crew:\n0-2 Ancient Weapon ($150): Model's close combat weapon attacks gain Bleed(1).\n\nThe following option may be taken only when a model with Name: Talia al Ghul is in the crew:\n0-2 Shadow Training ($150): Model gains the Undercover trait.\n\nThe following option may be taken only when a model with Alias: Lady Shiva is in the crew:\n0-1 Unarmed Combat Training ($150): Model gains the Close Combat Master trait.\n\nThe following option may be taken only when a model with Alias: Cheshire is in the crew:\n0-1 Poison Training ($50): Model gains the Poison Master trait.\n\nThe following option may be taken only when a model with Alias: Bane is in the crew:\n0-2 Military Progress ($150): Model gains the Veteran trait.\n\nThe following option may be taken only when a character with Name: Nyssa al Ghul is in the crew:\n0-1 Bow Training ($100): Model gains the Shooter rule.",
  "EQUIPMENT LIST - Birds of Prey": "0-2 Spray Can ($150): Model gains 1 Spray Can.\n0-1 Grapple-gun (2) ($300): Model gains the Grapple-gun rule.\n0-1 Camo Vest (2) ($300): Model gains the Stealth rule.\n0-2 Adaptive Planning (2) ($150+2 Rep Points): Model gains the Adaptable trait.\n0-2 Titanic Mutation (2) ($150): Model gains one Titan Dose.\n0-1 Sense Mutation (1) ($100): Model gains the Night Vision rule.\n0-1 Extra Spores (1) ($100): +1 to Ammunition for one weapon.\n0-2 Spikes Mutation (1) ($200): Model gains the Claws rule.\n0-1 Luminescent Mutation (1) ($100): Model gains the Lantern rule.\n0-1 Large Roots (1) ($200): Models moving within this model's action radius suffer Impaired Movement.\n\nThe following option may be taken only when a model with Name: Dr. Harleen Quinzel is in the crew:\n0-1 Smash 'n Grab ($200): Model's Close Combat attacks gain the Steal trait.\n\nThe following option may be taken only when a model with Name: Dr. Pamela Lilian Isley is in the crew:\n0-3 Corrosive Blood ($50): When this model becomes Casualty, all models in contact must pass an Endurance roll or receive 🩸.\n0-1 Mutation Serum (2) ($200+3 Rep Points): Model gains the Tough Skin and Desensitized traits.\n0-1 Modified Pheromones (2) ($150+5 Rep Points) (Can only be purchased by Leader, Sidekicks or Free Agents): When using the Control Pheromones trait, all models in the crew can target up to 2 enemy models instead of 1. Resolve the effect one at a time.\n0-1 Ancient Plants (1,3) ($200+40 Rep Points): Model gains the Invulnerability (1) and Tough Skin traits, +1 to all Basic Skills except Endurance, +3 to Endurance, and the action area radius is increased to 6\".\n\nThe following option may be taken only when a model with Name: Barbara Gordon is in the crew:\n0-1 Watch Tower ($200) (Can only be taken by Barbara Gordon): Model gains Exhaustive Planner rule.\n0-1 Radio ($200): This model is always treated as though it were within range of it's Boss's Inspire trait.\n\nThe following option may be taken only when a model with Name: Dinah Lance is in the crew:\n0-1 Pitch Perfect Vocals ($200) (Can only be taken by Dinah Lance): Model gains the Mixed Combat Style trait.\n\nThe following option may be taken only when a model with Name: Alec Holland is in the crew:\n0-1 Passage ($200): Model gains the Undercover rule.\n\n(1) Only Plants can purchase this equipment.\n(2) Plants cannot purchase this equipment.\n(3) This Equipment cannot be affected by the Broken Equipment rule.",
  "EQUIPMENT LIST - Organized Crime": "0-3 Magazine ($150): +1 to Ammunition for one weapon.\n0-1 Bribe ($100): Model gains the Informer trait.\n0-1 Kevlar Vest ($200): Model gains the Kevlar Vest trait.\n0-1 Grapple-gun ($250): Model gains the Grapple-gun trait.\n0-1 C4 ($250): Model gains the Explosive Gel trait.\n0-1 Gas Mask ($150): Model gains the Gas Mask trait.\n0-1 Silencer ($200): One of the model's ranged weapons gains the Silencer trait.\n0-2 Brass Knuckles ($100): Model gains the Reinforced Gloves trait.\n0-1 The Cleaner ($100): When this model reveals an enemy Suspect, you may immediately draw 1 card from your Objective deck.\n0-2 Backpack ($100): Model gains the Backpack trait.\n0-2 Family ($150): Model gains the Mobster trait.\n0-1 Rusty Tools ($200): Model gains the Cruel trait.\n0-1 Planted Evidence ($200) (Can only be purchased by models with the Cop trait): Model gains the Evidence Tampering trait.\n0-1 Abuse the Badge ($150) (Can only be purchased by models with the Cop trait): Model gains the Interrogation trait.\n\nThe following option may be taken only when a model with Name: Roman Sionis is in the crew:\n0-1 Psychotic ($150) (Can only be purchased by Black Mask): Gain Protect Me! rule.\n\nThe following option may be taken only when a model with Name: Carmine Falcone is in the crew:\n0-1 Mob Payroll ($200) (Can only be purchased by Carmine Falcone): Model gains the Corrupt trait.\n\nThe following option may be taken only when a model with Name: Salvatore Maroni is in the crew:\n0-1 Long Guns ($0): If Sal Maroni is the Boss, select up to three friendly Henchmen with ranged weapons with the Short Range and Firearm rules. Those weapons replace the Short Range rule with the Medium Range rule. These models must be selected before Pre-Game Phase C.\n\nThe following option may be taken only when a model with Name: Arnold Wesker is in the crew:\n0-2 Mafia ($100): Model gains the Criminal trait.\n\nThe following options may be taken only when a model with Name: Jervis Tetch is in the crew:\n0-1 Broken Equipment ($250): Before Phase A of the pre-game sequence choose one item of equipment purchased by the opposing player before the game begins. That item may not be used during the game.\n0-2 Weird Device ($200): Model gains the Goad trait.\n0-1 Trained Mind ($100): Model gains Desensitized rule.\n0-1 Rhyme with Me ($200): Model gains Disarray rule.\n0-3 Masks of Wonderland ($200): When choosing this equipment, choose only one of the following masks:\n0-1 Queen of Hearts mask: Model gains Assassin (1) and Order rules.\n0-1 White Rabbit mask: Model gains Fast and Tireless rules.\n0-1 Cheshire Cat mask: Model gains Stealth and Climbing Claws rules.\n\nThe following option may be taken only when a model with Name: Alexander Joseph Luthor is in the crew:\n0-1 Advanced Weaponry ($200): One of this model's ranged weapons gains the Accurate trait.",
  "EQUIPMENT LIST - Scarecrow": "0-2 Magazine ($200): Model gains +1 Ammunition for one weapon.\n0-1 Apparition (2) ($200): Model gains the Apparition trait.\n0-1 Handcuffs (2) ($150): Model gains the Arrest trait.\n0-1 Neurotoxic Drugs (2) ($300): Model gains +2 Movement and Dodge traits.\n0-1 Fear Advantage (3) ($200): A friendly model may use the Protect Me! Trait on a friendly model with the Nightmare trait without the need of performing an Effort.\n0-1 Intensive Treatment (3) ($100): Model gains the Intensive Treatment (1) trait.\n0-2 Disposable Nightmare (1) ($150): Model gains the Disposable Nightmare trait. Disposable Nightmare: When this model is removed, Discard a card from your deck.\n0-2 Terror Invigoration (1) ($200): Model gains the Terror Invigoration trait. Terror Invigoration: This model may throw X additional dice (X is the number of cards in Defense Pile) when taking Attack and Defense rolls.\n0-1 Terror Pile (1) ($300): Model gains the Fear Dampening trait.\n0-2 Terrible Visage (1) ($200): Model gains the Terrible Visage trait.\n\nThe following option may be taken only when a model with Alias: Scarecrow is in the crew:\n0-1 Intense Fear ($200): Model gains the Intense Fear trait.\n\nThe following option may be taken only when a model with Alias: Dr. Fritawa is in the crew:\n0-1 Working in Advance ($200): Model gains the Working in Advance trait.\n\n(1) Only Nightmares can purchase this equipment.\n(2) Nightmares cannot purchase this equipment.\n(3) Only Arkham Asylum Dr can purchase this equipment.\n(4) This Equipment cannot be affected by the Broken Equipment rule.",
  "EQUIPMENT LIST - Royal Flush": "0-2 Magazine ($200): Model gains +1 Ammunition for one weapon.\n0-1 Halt! ($150): Model gains the Stop! trait.\n0-2 Comrades ($150): Model gains the Teamwork (1) (Spades, Clubs, Diamonds, Hearts) trait.\n0-1 Royal Communication Device ($200): Model gains the Radio trait.\n0-1 Grapple Gun ($250): Model gains the Grapple Gun trait.\n0-1 Royal Medic ($200): Model gains the Medic trait.\n0-1 Familiar with the Subject ($200): When this model places a Suspect within 4\" of an enemy model, you can search for a card that haves the same Suit as this model Keyword.\n0-2 Levy's Work ($150)(Can only be Purchased by models with the For My Lords! trait): This model can activate a 2nd time each round, at the end of that 2nd activation, this model suffers 🩸🩸 (you can force this model to be removed as casualty by the use of this trait).\n0-1 The Good King ($400)(Can only be Purchased by Leader): Model gains the Leadership trait.\n0-1 King's Call ($300)(Can only be Purchased by Leader): During this model activation you can spend 1 Action to place within 4\" a previously removed as Casualty model with the trait For My Lords! If you do, the opponent immediately gains a Pass marker.\n0-1 Last Service ($300)(Can only be Purchased by Sidekick): When a friendly model is removed as a Casualty within 8\" and LoS to this model, you can search into your Objective deck 1 card and add it to your hand.\n\nThe following option may be taken only when a model with Alias: Punchline is in the crew:\n\n0-2 Punchline's Toys ($100): Model gains the Poison Device trait.\n0-1 Poison Training ($250) (Can only be purchased by Punchline): Model gains the Poison Master trait.",
  "EQUIPMENT LIST - Suicide Squad": "0-2 Airborne Deployment ($300): Select a model in your Suicide Squad crew before the game starts. This model is not deployed at the beginning of the game, but is instead held in reserve. At the beginning of the second round or any subsequent round before determining who takes the lead, deploy the model in contact with any board edge, as long as the position. The model may act normally in the round it arrives.\n0-1 Aerial Locator System ($200): Once per game at the start of the round, before determining who takes the lead, you can target one model currently in play. For the remainder of the round the target is illuminated, as if affected by a Lantern. Note that unlike the Lantern or Lamppost rules, only the target model is illuminated, not other models within 4\". NB. The rules governing line of sight apply as normal.\n0-1 Magazine ($300): +1 to Ammunition for one weapon.\n0-2 Back on Track ($150): If this model has a Task counter on it, this model can be targeted by a Cranial Bomb Activate card, then return it to the Cranial Bomb without removing this model. If you do so, remove the Task counter from this model.\n0-2 Right Motivation ($200): While this model does not have a Task counter, it gains a free Manipulate action.\n\nThe following option may be taken only when a model with Alias: Poison Ivy is in the crew:\n0-2 Modified Pheromone ($100) (Can only be purchased by models): When this model uses the Control Pheromones trait, the target adds 1 additional die and adds all the 3 results together while taking that Hypnotize Willpower roll. If taking target Efforts to add an additional die to the Willpower roll, then they must roll 4D6 and then choose 3 of them.\n\nThe following option may be taken only when a model with Alias: Deathstroke (Vanguard Team) is in the crew:\n0-1 Father Teamwork ($150) (Can only be purchased by a model with Alias: Ravager (Vanguard Team)): Model gains the Teamwork (1) (Ravager (Vanguard Team)) trait.\n\nThe following option may be taken only when a model with Alias: Ravager (Vanguard Team) is in the crew:\n0-1 Daughter Teamwork ($150) (Can only be purchased by a model with Alias: Deathstroke (Vanguard Team)): Model gains the Teamwork (1) (Deathstroke (Vanguard Team)) trait."
};


// ==================================================================
// WEAPON SPECIAL RULES (тоже из Compendium)
// ==================================================================

const weaponDescriptions = {
  "Batarang": "Ranged weapon. Ammo 3. Damage 1.",
  "Batarang (Ranged, Ammo 3)": "Ranged weapon. Ammo 3. Damage 1.",
  "Shock Gloves": "Close combat. Crit (Stunned).",
  "Combat Knife": "Close combat. Sharp.",
  "Military Pistol": "Ranged weapon. Range 12”. Damage 1.",
  "Grapnel Gun": "Movement tool. Straight line up to 12”.",
  "Smoke Grenade": "Creates a 3” smoke cloud that blocks LoS."
};

// ==================================================================
// ОБЪЕДИНЁННАЯ БАЗА ДЛЯ getDesc()
// ==================================================================

const descriptions = {
  ...traitDescriptions,
  ...weaponDescriptions
};

// Делаем всю базу доступной глобально для COMPENDIUM
window.compendium = { ...traitDescriptions};

// Универсальная функция для получения описания (трейт или оружие)
function getDesc(key) {
  return descriptions[key] || "Описание появится позже…";
}

function getFactions(model) {
  return Array.isArray(model.faction) ? model.faction : (typeof model.faction === 'string' ? model.faction.replace(/ *& */gi,',').replace(/ *\/ */g,',').split(',').map(s=>s.trim()) : []);
}

function getRanks(model) {
  return Array.isArray(model.rank) ? model.rank : (typeof model.rank === 'string' ? [model.rank] : []);
}