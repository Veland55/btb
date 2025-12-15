const models = [
    {
  "name": "Batwoman",   //Имя 
  "realname": "Kate Kane",   //Настоящее имя
  "base": "40mm",   //Размер базы
  "rep": 111,   //Стоимость в репутации
  "funding": 0,   //Стоимость в деньгах
  "rank": "Leader",   //Роли в банде
  "faction": "Bat Family",  //Фракция
  "img": "https://veland55.github.io/btb/img/Batwoman.png",  // Картинка модели
  "stats": {   //Статы
    "Attack": 4, 
    "Defense": 4, 
    "Strength": "4+", 
    "Movement": 10, 
    "Willpower": 8, 
    "Endurance": 7 
  },
  "traits": ["Air Combat", "Arrest", "Bat Cape", "Bat Family", "Bat-Armor Mk I", "Batclaw/Grapple Gun", "Criminology", "Interrogation", "Military Teamwork", "Night Vision", "Searcher", "Stealth"],  //Трейты модели
  "weapons": [ 
    {
      "name": "BATARANG",
      "damage": "★★",  // Два stun (★=stun, 🩸=blood)
      "rof": 2,        // Rate of Fire (кубы атаки)
      "ammo": 2,       // Патроны
      "traits": "M. Range / Remote Controlled / Throwing"  // Трейты оружия
    },
    {
      "name": "SHOCK GLOVES",
      "damage": "★★",
      "rof": "-",      // Нет RoF для melee
      "ammo": "-",     // Нет ammo
      "traits": "CRT (Stunned)"
    }
  ]
},

{
  "name": "Batman (Multiverse)",
  "rep": 150,
  "funding": 0,
  "rank": "Leader",
  "faction": "Bat Family",
  "img": "https://veland55.github.io/btb/img/Batman_Multiverse.png",
  "stats": { 
    "Attack": 5, 
    "Defense": 5, 
    "Strength": "3+", 
    "Movement": 10, 
    "Willpower": 8, 
    "Endurance": 8 
  },
  "traits": ["Bat Cape", "Bat-Armor Mk I", "Close Combat Master", "Martial Artist", "Sneak Attack", "Bat Family", "Batclaw", "Detective", "Reinforced Gloves"],
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

//DOOM PATROL
{
    "name": "Beast Boy - Human (Teen Titans)",
    "rep": 50,
    "funding": 0,
    "rank": "Sidekick",
    "faction": "Bat Family",
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
    "rank": "Leader",
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
    "rank": "Sidekick",
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
    "rank": "Sidekick",
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
    "rank": "Sidekick",
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
      "Minor Explosion (Beam / Explosive / S. Range)"
    ]
  },
  {
    "name": "Robotman",
    "rep": 85,
    "funding": 0,
    "rank": "Sidekick",
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
    "weapons": [
      "Unarmed"
    ]
  },


//---------------------------------------------------------------------------------------------------------// 
//Joker
//---------------------------------------------------------------------------------------------------------// 

  {
    "name": "Joker (Arkham Asylum)",
    "realname": "Unknown",
    "base": "30mm",
    "rep": 105,
    "funding": 0,
    "rank": ["Leader"],
    "faction": "Joker",
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
    "faction": "Joker",
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
    "faction": "Joker",
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
    "faction": "Joker",
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
    "faction": "Joker",
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
    "faction": "Joker",
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
    "faction": "Joker",
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
    "faction": "Joker",
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
    "faction": "Joker",
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
    "faction": "Joker",
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
    "faction": "Joker",
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
    "faction": "Joker",
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
    "faction": "Joker",
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
    "faction": "Joker",
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
    "name": "Harley Quinn (Bombshell)",
    "realname": "Dr. Harleen Frances Quinzel",
    "base": "30mm",
    "rep": 65,
    "funding": 300,
    "rank": ["Sidekick"],
    "faction": "Joker",
    "img": "https://veland55.github.io/btb/img/HarleyQuinnBombshell.png",
    "stats": {
      "Attack": 4,
      "Defense": 4,
      "Strength": "5+",
      "Movement": 10,
      "Willpower": 7,
      "Endurance": 7
    },
    "traits": ["Acrobat", "Charismatic", "Combat Flip", "Confusion", "One Of The Boys", "The Voices (Mental Disorder)", "True Love (Joker)"],
    "weapons": [
      {
        "name": "Hate/Love Gun",
        "damage": "🩸🩸",
        "rof": "2",
        "ammo": "2",
        "traits": "Bleed (2) / Firearm / Light / S. Range"
      },
      {
        "name": "Good Night Bat",
        "damage": "★★",
        "rof": "-",
        "ammo": "-",
        "traits": "Handy / Heavy"
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
    "faction": "Joker",
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
    "faction": "Joker",
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
    "faction": "Joker",
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
    "faction": "Joker",
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
    "faction": "Joker",
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
    "faction": "Joker",
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
    "faction": "Joker",
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
    "faction": "Joker",
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
    "faction": "Mr. Freeze",
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
    "faction": "Mr. Freeze",
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
    "faction": "Mr. Freeze",
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
    "faction": "Mr. Freeze",
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
    "faction": "Mr. Freeze",
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
    "faction": "Mr. Freeze",
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
    "faction": "Mr. Freeze",
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
    "faction": "Mr. Freeze",
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
    "faction": "Mr. Freeze",
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
    "faction": "Mr. Freeze",
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
    "faction": "Mr. Freeze",
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
    "faction": "Mr. Freeze",
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
    "faction": "The Riddler",
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
    "faction": "The Riddler",
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
    "faction": "The Riddler",
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
    "faction": "The Riddler",
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
    "faction": "The Riddler",
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
    "faction": "The Riddler",
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
    "faction": "The Riddler",
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
    "faction": "The Riddler",
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
    "faction": "The Riddler",
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
    "faction": "The Riddler",
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
    "faction": "The Riddler",
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
    "faction": "The Riddler",
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
    "faction": "The Riddler",
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
    "faction": "The Riddler",
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
    "faction": "The Riddler",
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
    "faction": "The Riddler",
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
    "faction": "The Riddler",
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
    "faction": "The Riddler",
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
    "faction": "The Riddler",
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
    "img": "",
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
    "faction": "Penguin",
    "img": "",
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
    "faction": "Penguin",
    "img": "",
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
    "faction": "Penguin",
    "img": "",
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
    "faction": "Penguin",
    "img": "",
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
    "faction": "Penguin",
    "img": "",
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
    "faction": "Penguin",
    "img": "",
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
    "faction": "Penguin",
    "img": "",
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
    "faction": "Penguin",
    "img": "",
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
    "faction": "Penguin",
    "img": "",
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
    "faction": "Penguin",
    "img": "",
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
    "rank": [],
    "faction": "Penguin",
    "img": "",
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
    "faction": "Penguin",
    "img": "",
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
    "faction": "Penguin",
    "img": "",
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
    "faction": "Penguin",
    "img": "",
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
    "faction": "Penguin",
    "img": "",
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
    "faction": "Penguin",
    "img": "",
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
    "faction": "Penguin",
    "img": "",
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
    "faction": "Penguin",
    "img": "",
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
    "faction": "Penguin",
    "img": "",
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
    "faction": "Penguin",
    "img": "",
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
    "faction": "Penguin",
    "img": "",
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
    "faction": "Penguin",
    "img": "",
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
    "faction": "Penguin",
    "img": "",
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
    "faction": "Penguin",
    "img": "",
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
    "faction": "Penguin",
    "img": "",
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
    "faction": "Penguin",
    "img": "",
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
//Birds of Prey
//---------------------------------------------------------------------------------------------------------// 

{
  "name": "Poison Ivy 1997",
  "realname": "Dr. Pamela Lillian Isley",
  "base": "40mm",
  "rep": 66,
  "funding": 0,
  "rank": "Leader",
  "faction": "Birds of Prey",
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
  "faction": "Birds of Prey",
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
  "faction": "Birds of Prey",
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
  "rank": "Free Agent",
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
  "rank": "Free Agent",
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
  "rank": "Free Agent",
  "faction": ["GCPD", "Suicide Squad", "Birds of Prey"],
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
  "rank": "Sidekick",
  "faction": "Birds of Prey",
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
  "rank": "Sidekick",
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
  "rank": "Sidekick",
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
  "rank": "Henchman",
  "faction": ["Suicide Squad", "Birds of Prey"],
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
  "rank": "Henchman",
  "faction": "Birds of Prey",
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
  "rank": "Henchman",
  "faction": "Birds of Prey",
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
  "rank": "Henchman",
  "faction": "Birds of Prey",
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
  "rank": "Henchman",
  "faction": "Birds of Prey",
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
  "rank": "Henchman",
  "faction": "Birds of Prey",
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
  "rank": "Henchman",
  "faction": "Birds of Prey",
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
    "rank": "Henchman",
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
    "rank": "Henchman",
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
    "rank": "Henchman",
    "faction": "Birds of Prey",
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
    "rank": "Henchman",
    "faction": "Birds of Prey",
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
    "rank": "Henchman",
    "faction": "Birds of Prey",
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
    "rank": "Henchman",
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
    "rank": "Henchman",
    "faction": "Birds of Prey",
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
    "rank": "Henchman",
    "faction": "Birds of Prey",
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
    "rank": "Henchman",
    "faction": "Birds of Prey",
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
    "rank": "Free Agent",
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
    "rank": "Henchman",
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
    "rank": "Henchman",
    "faction": "Birds of Prey",
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
  "rank": "Leader",
  "faction": "Scarecrow",
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
  "rank": "Sidekick",
  "faction": "Scarecrow",
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
  "rank": "Henchman",
  "faction": "Scarecrow",
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
  "rank": "Henchman",
  "faction": "Scarecrow",
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
  "rank": "Henchman",
  "faction": "Scarecrow",
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
  "rank": "Henchman",
  "faction": "Scarecrow",
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
  "rank": "Henchman",
  "faction": "Scarecrow",
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
  "rank": "Henchman",
  "faction": "Scarecrow",
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
//CULTS
//--------------------------------------------------------------------------------------------------------------------



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
  "faction": "Unknown",
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
  "Aversion (X)": "This model cannot be included in the same crew as the specified model.",
	"A Challenge for you": "Every time your crew places a Suspect, you must place a Numeric Counter on it. You decide the number on the counter, unless a card or ability specifies the number. These Numeric Counters cannot be reduced below 0.",
	"Adaptable": "At the beginning of the Raise the Plan phase, the player controlling this model must choose between the Attack (+1), Defense (+1) or Movement (+2) basic skills. The model receives the bonus to the chosen skill until the end of the round.",
	"Affinity (Model)": "This model may be recruited by any crew that also includes the model named in parentheses, even if they would not ordinarily be permitted to join that crew. This model may treat its rank as Free Agent for the purposes of forming the crew (but cannot use the Free Agent rank during the game). Recruiting this model does not allow a further use of the trait (if, for example, another character has an Affinity to this model).",
	"Agent of Chaos": "When friendly models within 4” of this model activate, they may take an Audacity marker from a friendly model that is yet to activate.",
	"Agent of Order": "Friendly models within 4” cannot lose Actions because of an opponent’s rules.",
	"Light Radiance": "When this model uses the Medic trait it affects all friendly models within 2”.",
	"Aggressive Schizophrenia (Mental Disorder)": "If this model is in contact with another model (friend or foe) at the beginning of its activation, it gains an extra Attack action, which must immediately be performed against one model in contact. Once this attack is resolved, this model may continue its turn normally.",
	"Air Combat": "If this model uses the Batclaw trait or Falls during its activation, then for the remainder of the activation it gains a +1 bonus to its attack and Strength rolls, and triggers CRTs on a natural roll of 4+ when performing Melee Attacks.",
	"Alpha": "This model’s Attacks and Defense skills cannot be reduced below 4 by any means.",
	"Always on the Move": "This model can interrupt its Movement action to perform an Attack action, and then continue with its Movement action. The model must have enough actions available to use this trait.",
	"Anxiety (Mental Disorder)": "This model gains +2” to its basic move distance, but must perform a Movement action during its activation if the model can do it.",
	"Arkham Asylum Doctor": "All friendly models with a Mental Disorder trait within 4” of this model gain 1 extra Tactical Action.",
	"Arsenal": "After deployment, this model may equip up to one Hands equipment card, and one Back equipment card. These cards cannot be equipped in any other way, and cannot be cancelled by an opponen.",
	"Attorney’s Allegation": "One Use Only. All friendly Henchman within 8” gain 1 extra Action.",
	"A Real Change": "Once per round, during this model's activation you may look at the opponent's Objective hand, then the opponent may target one of their models and preform an immediate Manipulate action with that model.",
  "As Blind as a Bat": "When this model Sets a Suspect and you have a ? facedown card in play from a previous activation, you may reveal it and activate its Trap effect using this model as the point of origin/triggering model. Then discard that card.",
  "Aware Of What He Did": "Search your Objective deck and add to your hand an Objective card with Type: GUN. Shuffle your deck.",
  "Addict": "This model suffers -1 to its Attacks and Defense skills unless it uses a Dose. As soon as the model uses a Dose, the penalties cease to apply until the end of the round.",
  "Air Support": "Place the Explosive template anywhere on the board. During this round, the area under the template is under the effect of Lights.",
  "Amazon Lineage": "If this model is your crew's Boss, you can only recruit models with the Amazon trait.",
  "A Challenge for You": "Every time your crew places a Suspect, you must place a Numeric Counter on it. You decide the number on the counter, unless a card or ability specifies the number. These Numeric Counters cannot be reduced below 0.",
  "Amazon": "This model receives a +1 bonus to its Attack and Defense rolls. In addition, enemy models roll 1 less attack die when targeting this model.",
  "Absolute Power": "If this model is your crew's Boss, you can hire models with Rank Henchman with the Cop trait, regardless of their Affiliation. In addition, this model's Inspire radius is increased by 4''.",
  "Agile": "This model can't suffer Falling Damage. However, if the result of the Fall is to remove the model from the game, it is still made a Casualty.",
  "Acrobat": "This model does not suffer Impaired Movement for Jumping, or for Stand Up actions. This model may use the Dodging rule. Dodging: A model that benefits from this rule may make an Effort to reduce the attack dice from a Ranged Attack that targets this model.",
  "Terrible Revelation": "Enemy models within 8'' of this model add 1 additional die and add all the 3 results together while taking a Willpower roll produced by a model with Affiliation: ◇. If the enemy models within range Effort to add an additional die to the Willpower roll, then they must roll 4D6 and then choose 3 of them.",
  "Amazon Princess": "This model automatically gains the Charge trait. However, targets of this model's Charge incur a -1 penalty to their Defense rolls. While this Upgrade Character card is used, she cannot use the Bracelet of Submission trait or the Lasso of Hestia weapon, and does not benefit from the effects of her Magic Shield.",
  "Aggressive Schizophrenia": "If this model is in contact with another model (friend or foe) at the beginning of its activation, it gains an extra Attack action, which must immediately be performed against one model in contact. Once this attack is resolved, this model may continue its turn normally.",
  "Affinity (X)": "This model may be recruited by any crew that also includes the recruited model named in parentheses, even if they would not ordinarily be permitted to join that crew. This model may treat its Rank ◇ during the crew (but cannot use the Rank ◇ for the purpose of recruiting this trait (if, for example, another character has an Affinity to this model)).",
  "Atomica": "When this model attacks an enemy model (not a Vehicle), the enemy model must pass a Willpower roll before any attack dice are rolled. If it fails, it suffers -1 Defense until the end of the round.",
  "Arkham Asylum DR": "When this model places a Suspect, target a model within 8'' and LoS, make an Opposed Willpower roll against it. If successful, the target is considered to have a Mental Disorder until the end of the round.",
  "Assassin (X)": "If this model removes an enemy model as a Casualty, you may draw X Objective card from your Objective deck.",
  "Archie": "A model with the Archie trait is not deployed as usual—instead, during a friendly model's activation, you may place this model in contact with a Suspect and then remove that Suspect. Suspects are considered an activable model and inside the gaming area until they are removed as a Casualty. A model with Archie may receive an Audacity marker even if it is not in play.",
  "Anger Management (Mental Disorder)": "During this model activation, it must make an Attack Action unless it makes an Effort.",
  "Autorepair (X)": "At the beginning of the Recount phase, this model rolls 1D6. On a result of (X)+ remove a Damage marker (any type) from this model.",
  "Arrogant": "When this model performs an Attack against a model with a lower Reputation cost than its own, it rolls one less attack die.",
  "Attorney's Allegation": "One Use Only. All friendly models with Rank Henchman within 8'' gain 1 extra Action.",
  "Assistance": "While a friendly Robin (Boy Wonder) is in play, this model gains +1 Willpower. If a friendly Robin (Boy Wonder) is removed as a Casualty, this model gains +1 Strength until the end of the game.",
  "Animal": "When this model moves, it can ignore obstacles up to 2'' high, but cannot Climb or Jump. If this model suffers the Fire Status (before resolving during the Recount phase (which cannot be re-rolled). If this Willpower roll is failed, the model cannot move in the following round. This model cannot purchase equipment.",
  "Amphibious": "This model does not suffer Impaired Movement when moving through Difficult water ground elements (i.e. rivers, swamps, canals, ponds, etc.). Players should agree on what counts as water feature before the game begins. In addition, this Model can enter a Sewer without performing a Manipulate action.",
  "Arrest": "When in contact with a KO enemy model (not a Vehicle), this model may immediately remove the KO model from the game as a Casualty.",
  "Aversion (X)": "This model cannot be included in the same crew as the specified model.",


     //B
	"Bat Family": "Keyword",
  "Batclaw": "Once per round, this model gains +6\" to its basic move distance, and can move in any direction (including vertically). When using this ability, the model can move over obstacles and Difficult Ground without penalty. However, the model cannot use this rule in two consecutive activations.\n*Some models list this trait as 'Grapple Gun', and others as 'Batclaw'. The rules are the same in both instances - the distinction is just for fun!",
	"Batman Lives": "This model may perform an extra Movement action at the start of its activation if no enemy models have LoS to it. When in contact with a KO enemy model that does not have Affiliation: BATMAN, this model may remove it as a Casualty by spending a Special Action. In addition, when this model is included in your crew, you can also include a model with Name: William Cobb (ignoring its Affiliation), but if you do so you may not include any model with the Free Agent rank unless it also has Affiliation: BANE.",
	"Batman’s Tumbler": "This model can neither Jump nor Climb. When the Upgrade Card becomes disabled, you can immediately exchange this Upgrade Card with the Batman’s Batpod Upgrade card.",
	"Bat-Signal": "One use only. This model can use this trait to place a friendly model (not KO or Knocked Down) with Alias: Batman in contact with itself. Until the end of that round, this model is considered Illuminated.",
	"Biting": "Enemies within 6” that wish to perform an Action must first suffer the Enervating 1 effect. If they already have Enervating, they must instead increase their Enervating value by 1.", 
	"Blood Scent": "When targeting a model with at least 1 🩸 marker with an Attack, this model gains +1 to its attack dice rolls, +1 to the Strength roll, and gains the Bleed 1 effect.",
	"Bloodlust": "When this model causes a KO or Casualty, you may place 2 on top of the Psychopaths Objective card instead of 1.",
  "Boosted Jump": "One use only. During this model activation, place this model within 8” of its start position.",
	"Boom!": "Each time this model receives any damage, roll a D6 – on the natural score of a 6, this model explodes! Alternatively, during its activation, you may choose to make this model explode. When the model explodes, center an Explosive template on it. Roll a Strength 3+ die against each model affected. On a success, the model suffers 🩸🩸★ Damage. After resolving the explosion, remove this model as a Casualty.",
	"Born in the Darkness": "When this model is not within the area effect of a Light source, it gains a +1 bonus to its Defense rolls, and enemy models cannot benefit from the Sneak Attack trait when targeting this model.",
	"Bot": "This model cannot recover from KO or recover Stun damage in the Recount phase. However, attacks with the Firearm, Mechanical and Beam rule deduct 1 attack die when rolling against this model. In addition, this model cannot use Doses of any kind,and is immune to the Enervating, Hypnotize, Poison, Scared and Terror effects.",
	"Bracelets of submission": "The first time this model is selected as a target by an enemy ranged attack in each round, it reduces the attacker’s RoF by -1.",
	"Boosted (X)": "While making an attack with this weapon, roll X additional attack dice.",
  "Brawler": "For each Succesfull hit this model receives, place a Defense Marker on it.",
  "Barrage": "During this round, you can target any model with Ranged Attack ignoring LoS and Cover, but then suffers a -1 Attack die and -1 to hit for that roll.",
  "Bank Robber": "This model may Reveal Suspects within 3\" instead of in contact.",
  "Bloody Christmas": "Before removing an enemy model as a Casualty by this model's actions, place a new friendly Suspect (if able) in contact with that model. That Suspect is also a Blood Present marker.",
  "Backpack": "This model can perform a Reveal Manipulate action once per activation without spending an Action.",
  "Bat-Armor MK I": "Enemy models don't roll a Strength die when attacking this model.",
  "Bat-Armor MK II": "This model ignores enemy Strength dice unless the roll is a natural 6. In addition, this model gains +1\" to its basic move distance.",
  "Bodyguard": "If a friendly model with the ◇ marker within 4\" of this model and LoS suffers any number of hits from an Attack (of any kind), this model may make an Effort to take the hits instead, and all the Status of that attack. Only one Effort ★ is required per enemy Attack.",
  "Bat Cape": "This model does not take Damage, nor can it be removed as a Casualty, as a result of Falling.",
  "Bluff": "Choose an enemy model within 6\" and line of sight. The target reduces its Attacks skill by 1 until the end of the round. If multiple models with this trait target the same model, the effect is not cumulative.",
  "Bipolar (Mental Disorder)": "At the beginning of this model's activation, roll a die or flip a coin. If the result is even/heads, this model may make 1 Effort this round without taking a ★ marker. If the result is odd/tails, this model suffers the Enervating (1) Status.",
  "Bonebreaker": "Until the end of the round, this model's unarmed attacks gain Bleed: 2.",
  "Bat-Armor MK III": "Enemy models don't roll a Strength die when attacking this model. In addition, if this model has moved this activation, it can make Melee Attacks against enemies up to 2\" away in line of sight (ignore all traits that improve the model's line of sight, such as Total Vision, for the purpose of these attacks).",
  "Bloodthirsty (Mental Disorder)": "During the Raise the Plan phase, if this model has at least 1 Damage marker of any kind, it gains +1 ★.",
  "Batclaw/Grapple Gun": "Once per round, this model gains +6\" to its basic move distance, and can move in any direction (including vertically). When using this ability, the model can move over obstacles and Difficult Ground without penalty. However, the model cannot use this rule in two consecutive activations. *Some models list this trait as ‘Grapple Gun’, and others as ‘Batclaw’. The rules are the same in both instances – the distinction is just for fun!",
  "BOT": "This model cannot recover from KO or recover Stun damage in the Recount phase. However, attacks with the Firearm, Mechanical and Beam rule deduct 1 attack die when rolling against this model. In addition, this model cannot use Doses of any kind, and is immune to the Enervating, Hypnotize, Poison, Scared and Terror Status.",
  "Brutal": "This model scores Critical results on a natural roll of 5 or 6.",
  "Boss's Orders": "All friendly models with Rank ◇ that attack an enemy model within 8\" of this model gain +1 to their attack dice rolls in close combat until the end of the round.",
  "Bot Bomb": "Choose one of your models with the Bot trait to explode. Center the Explosion template over the bot. Roll a Strength 4+ die against each model affected. On a success, the model suffers 🩸🩸 Damage. Once the trait is resolved, remove the Bot as a Casualty.",
  "Bulletproof Vest": "Traits and attacks with the Firearm rule deduct 1 attack die when rolling against this model.",
  "Bracelets of Submission": "The first time this model is selected as a target by an enemy ranged attack in each round, it reduces the attacker's RoF by -1.",
  "Business Agent": "When this model is recruited, add $350 to the crew's available Funding.",
  "Boy Wonder": "Enemy models cannot reroll attack dice against this model granted by the Handy rule.",
  "Bot Mechanic": "Target a model with the Bot trait within 4\" and Line of Sight. Remove up to 3 Damage markers from that model.",
  "Bullet Time": "One use only. After activating this trait, if this model performs a Ranged Attack, it gains an extra Ranged Attack action. The model cannot use the same ranged weapon more than once. This model doesn't lose attack dice this round for firing after moving.",



  // C
  "Carry": "If this model passes within 2” of one or more friendly models during a Movement Action, it may make an Effort and target one of those models and place it in base contact at the end of the move. The chosen model cannot have the Large or Huge traits. The target model suffers Impaired Movement during its next activation unless it is Damian Wayne. This model cannot use the Carry trait in two consecutive activations.",
	"Charge": "This trait must be activated before the model moves during its activation. During a Movement action this activation, this model may only move in a straight line. Roll 1 Strength die for each model contacted during this move, inflicting Damage ★★. Any other damage the model could normally inflict is ignored.",
	"Clay Body": "This model automatically gains the Charge trait. In addition, this model is immune to the Steal effect and gains -1 to its Endurance rolls. All ranged attacks against this model convert Injury markers 🩸 to Stun markers ★, unless the attack had the Cold or Freeze effects. Conversely, when this model is targeted with an attack with the Electric special rule or Discharge effect, all Stun markers ★ are converted to Injury markers 🩸. In addition, at the start of each of this model’s activations, it may exchange its attached Upgrade card for a different one.",
	"Cloak of Bats": "Enemy models can only see this model if it is in contact with them. This ability works even when the model is within the area of effect of a Light. However, the model is still subject to other rules that aid detection, such as Total Vision or Night Vision, etc. This model can be affected by templates, but cannot be targeted directly. Also, when an enemy model enters contact with this model, or this model enters contact with an enemy model, that model must take a Willpower roll: if the roll is failed, the model suffers the Scared effect.",
	"Contractor": "This model may treat its rank as Leader, but if it does so its Affiliation changes to BANE. In addition, if this model is recruited as the Boss, all models in the crew with the Veteran trait also gain Assassin 2.",
	"Cool Under Fire": "A crew that includes this model gains +1 Resource Point each round. Also, when a friendly model with the Veteran trait (not Bane himself) activates within 8”, remove one Effect from that model.",
	"Competitive": "This model gains +1 to Attack, Defense and Willpower while there is at least one other friendly model in play with this trait.",
	"Computer Intrusion": "This model may choose up to 2 Suspect markers within 8” and move them up to 2”.",
	"Countermeasures": "This model gains one of the following bonuses at the start of each activation, until its next activation: gain the Stealth trait; gain the Night Vision trait; or ignore the Anti-tank rule.",
	"Cooperative Fighting": "When targeting an enemy with a Melee Attack that is already in contact with another friendly model, this model inflicts 1 additional  for each hit that inflicts damage.",
	"Coward’s Reward": "If this model it not KO when an enemy model moves out of contact from this model, that enemy suffers 🩸.",
	"Combo (X)": "For every two successful hits in its attack roll while using the specified (weapon) or (trait) (before the enemy rolls to defend), this model gains an additional hit.",
  "Control Through Fear": "Target an enemy model with the Scared effect that is within 8'' and LoS. That model suffers the Terror Status and you Move 4'' it.",
  "Casting Fears": "Make an Attack with a friendly model with the Nightmare trait that is within 4'' and LoS. If the target wants to Effort against this Attack, it must first suffer the Terror Status.",
  "CRT (X)": "Natural 6 on the Strength die = Critical Hit. Target is Knocked Down by default. Weapons may list a special CRT effect ( CRT (X) ). If present, player chooses one effect: the listed one or Knocked Down.",
  "Cryo-Weapon": "When an attack or weapon that uses this rule score at least 1 Successful hit, choose another model and 1 Suspect within 2\" of the target. The chosen model suffers 1 hit from that weapon (doesn't trigger the Cryo-Weapon rule) and the Suspect becomes Frozen.",
  "Crit. Freeze": "Critical Effect.",
  "Cold": "When this rule hits, the target model increases the Slow Status value by (2), unless it doesn't have it, then it suffers the Slow (2) Status.",
  "Cold Acclimation": "Keyword.",
  "Cryo-Armor (X)": "Enemy models roll X fewer attack dice when targeting this model. In addition, while this model is within 4\" of a Frozen Suspect, it gains X Free Effort when Defending. This model counts as having the Rank Vehicle for traits that removes Damage from it.",
  "Cryo-Grenade": "Place an Explosive template completely within 8\". All models affected without the Cold Acclimation trait suffer Cold rule and any Suspects affected become Frozen.",
  "Cryo-Charge": "The next Attack action performed this activation gains CRT: Freeze.",
  "Cryo-Reinforcement": "Target a friendly Frozen Suspect and another friendly model with the Cryo-Armor (1) trait within 4\". Remove that Suspect. Until this model is removed from play or uses this trait again, the target model's Cryo Armor (1) trait increases by 1 and its Ranged weapons with S. Range lose it.",
  "Coordination": "Target another friendly model within 8\" of this model that share a keyword with this model, then, immediately perform an action with that model.",
  "Conundrum Champion": "Target a model within 8\" and line of sight. Perform an opposed Willpower roll against the target. If successful the target suffers the Enervating (2) Status.",
  "Catwoman's Target": "A model with Alias (Catwoman) gains 2 Free Effort while targeting this model with an Attack. While this model has a model with Alias (Catwoman) within 8\", it gains 1 Free Effort when Attacking and Defending against models other than that Catwoman model.",
  "Canary Cry": "Place the Spray template in base contact with this model – all models affected receive one automatic hit and are moved 2\" directly away from this model and suffers the Sonic Status. Then, affected models must pass a Endurance roll or take 🩸 Damage and become Stunned.",
  "Cannibal": "When this model removes an enemy model (not a Vehicle) as a Casualty in Melee, remove up to 2 Damage markers from this model.",
  "Can You Solve This? (X)": "Once per round, this model may move up to 4\" a suspect marker within 4\" during its activation by rolling a +(X) result in a die roll.",
  "Catcher Gear": "Enemies attacking this model never benefit from the Heavy weapon special rule.",
  "Chain of Command": "When its crew's Boss becomes a Casualty, this model immediately becomes the new Boss, taking the Crown Marker. This model does not halve the range of the Inspire trait when taking over as Boss. If more than one model in the crew has this trait, or another trait with the same effect (such as Hidden Boss) the controlling player must choose between them.",
  "Charismatic": "A crew that includes this model can recruit 1 additional model with Rank Free Agent, ignoring the usual restrictions.",
  "Charm": "Whenever this model becomes the target of a Melee Attack, the attacker must pass a Willpower roll or the attack automatically fails.",
  "Chaotic Friends": "Friendly models with the Gotham City Siren trait in this model's crew gain the Unpredictable rule until the end of the game.",
  "Chill Touch": "Unarmed Melee Attacks made by this model deal 🩸 and gain CRT: Cold.",
  "Chlorokinesis": "This model can be removed from one point inside of a Plant's action zone, and placed at another point in the same action zone.",
  "Claws": "This model's Unarmed attacks inflict Damage 🩸★.",
  "Climbing Claws": "This model never suffers Impaired Movement when Climbing. In addition, the model may end its movement at any point on a climbable surface, such as on the side of a wall. Make the model's end position clear to the opposing player if it is not possible to physically place the model there.",
  "Close Combat Master": "When fighting Unarmed, this model may reroll failed attack dice in Melee.",
  "Combat Flip": "This trait may be used when the model is in contact with an enemy or if a result of using it, this model ends in contact with an enemy model. Move this model 3\".",
  "Control Pheromones": "Choose an enemy model (not a Vehicle) within 5\" and line of sight. The target immediately suffers the Hypnotize Status.",
  "Cop": "Keyword.",
  "Coward's Reward": "If this model is not KO when an enemy model moves out of contact from this model, that enemy suffers 🩸.",
  "Confusion": "Target an enemy model (not a Vehicle) within 8\" and line of sight. Perform an opposed Willpower roll against the target. If successful, reduce the target model's Attack and Defense skills by 1. Also, the target cannot perform Special Actions. Both effects last until the end of the round.",
  "Combo (X)": "For every two successful hits in its attack roll while using the specified (weapon) or (trait) (before the enemy rolls to defend), this model gains an additional hit.",
  "Counter Attack": "When targeted by a Melee Attack, this model can make an Effort to activate this trait. For the remainder of the activation, when this model successfully defends against an enemy Melee Attack, this model gains one Counter Attack for every attack blocked. Once the enemy attack is resolved, assuming this model is not KO or a Casualty, each Counter Attack is converted into an automatic hit against the attacker, calculated as per this model's preferred Melee Weapon. These Counter Attacks are resolved immediately, out of sequence. After resolving the Counter Attacks, play resumes as normal.",
  "Concealment": "Until the end of the round in which this ability is used, enemy models can only see this model if it is in contact with them. This ability works even when the model is within the area of effect of a Light. However, the model is still subject to other rules that aid detection, such as Total Vision or Superior Sense of Smell, etc. This model can be affected by templates, but cannot be targeted directly.",
  "Criminology": "All enemy models within 12\" of this model lose the benefit of the Runaway trait.",
  "Corrupt": "If this model is included your crew, you can recruit up to 3 models with Rank Henchman with the Cop trait. Additional models in the crew with this trait have no further effect.",
  "Court of Owls Crew": "This crew can only hire models with the Affiliation: The Court of Owls.",
  "Criminal": "Keyword.",
  "Commissioner": "Friendly models with the Arrest trait within 6\" of this model can use that trait as an extra action. In addition, friendly models within 8\" of this model with Rank Henchman and the Cop trait, are treated as though it were within range of it's Boss's Inspire trait.",
  "Cruel": "Choose a KO enemy (not a Vehicle) in contact. That model is removed from play as a Casualty.",
  "Cybernetic": "This model gains +1 to its Defense rolls, and can reroll Recovery rolls.",
  "Cyclops": "This model's ranged attacks gain the Imprecise rule when the target is more than 8\" away.",
  "Critical Strike": "After activating this trait, any Melee Attacks performed by this model automatically treat the Strength die as scoring a natural 6. No die is rolled, but the success is counted.",


  // D
	"Deadliest Man on Earth": "The target of this model’s attacks cannot be changed (for example, by use of the Bodyguard trait).",
	"Deadly Strike": "Once this trait is activated, this model gains CRT: Casualty on its Melee Attack Actions for the rest of the round.",
	"Dealer": "During the Recount phase, if the opponent scores an Objective, you may take an Objective from behind your Plot card, and score it immediately, ignoring the usual rules.",
	"Death Marks": "When this model inflicts a Casualty, it gains +2 Attack Marker or +2 Defense Marker or 4+ Movement Boost Marker.",
	"Defensive Stance": "This model ignores the penalties for being Outnumbered in combat, and chooses the direction when it is Pushed.",
	"Demon": "Enemy models roll 1 less attack die when targeting this model. In addition, this model never reduces its Effort Limit for accumulated Damage.",
	"Demon Curse": "At the beginning of the Take the Lead phase, if there are no models in contact, roll 2D6 for this model and add the results together. For each friendly model removed as a Casualty in the game so far, add +2 to the result. On a result of 11+, place a friendly Etrigan model within 4” of this model, then remove this model from play.",
	"Desensitized": "This model doesn’t suffer KO through accumulated ★. Instead, once it has accumulated ★ equal to its Willpower, any additional ★ Damage automatically becomes 🩸 Damage instead.",
	"Detective": "This model may place or reveal a Suspect marker within 3” and LoS instead of in contact.",
	"Detonate": "Target a Suspect marker within 8”. Center an Explosive template on that marker. Roll a Strength 3+ die against each model affected. On a success, the model suffers 🩸★. Remove the Suspect marker.",
	"Devastating Blow": "Once this trait is activated, this model gains a +1 Strength die roll bonus and Bleed 1 on its Melee Attack Actions until the end of the round.",
	"Dimensional Portal": "Remove this model and place it up to 12” away. At a cost of a Movement Action (If it has one left to spend), this model may choose one friendly model within 2” before it is removed – the target model is also removed, and placed in contact with this model in its new position. After being placed, this model ends its activation. Any model that was placed with it counts as having moved during its activation, and its Basic Move Distance is 0 for the rest of the round. A model cannot use this trait in two consecutive activations.",
	"Demon Curse": "At the beginning of the Take the Lead phase, if there are no models in contact, roll 2D6 for this model and add the results together. For each friendly model removed as a Casualty in the game so far, add +2 to the result. On a result of 11+, place a friendly Etrigan model within 4” of this model, then remove this model from play.",
	"Detective": "This model may place or reveal a Suspect marker within 3” and LoS instead of in contact.",
	"Detonate": "Target a Suspect marker within 8”. Center an Explosive template on that marker. Roll a Strength 3+ die against each model affected. On a success, the model suffers 🩸★. Remove the Suspect marker.",
	"Devastating Blow": "Once this trait is activated, this model gains a +1 Strength die roll bonus and Bleed 1 on its Melee Attack Actions until the end of the round.",
	"Dimensional Portal": "Remove this model and place it up to 12” away. At a cost of a Movement Action (If it has one left to spend), this model may choose one friendly model within 2” before it is removed – the target model is also removed, and placed in contact with this model in its new position. After being placed, this model ends its activation. Any model that was placed with it counts as having moved during its activation, and its Basic Move Distance is 0 for the rest of the round. A model cannot use this trait in two consecutive activations.",
	"Disappearing": "Once per round, when this model becomes the target of an enemy attack, this model can move up to 4” before the attack is performed. If this means the enemy could no longer target this model, it can choose a different target.",
	"Discharge": "After activating this ability, the next ranged attack this model performs this round inflicts 1 additional 🩸 damage per hit and costs 1 additional Ammo.",
	"Disguised Sneak Attack": "Target a model within 2”. Perform an opposed Willpower roll against the target. If successful, the target cannot take Defense rolls or make Efforts against this model’s Attacks until the end of the round.",
	"Distort Magic": "Make an Effort to active this trait. When the trait is activated, choose any point on the tabletop within 4” of this model. Until the end of the round, this model can cast spells as though it was located at that point.",
	"Divination": "This model can use Divination Spells. In addition, once per game the model can reroll one die – you don’t need to accept the second result, and instead may choose between both.",
	"Divine Magic": "This model can use Divine Magic Spells. In addition, once per game this model can spend 1 Magic Point (MP) during its activation to remove 1 Damage marker from its Character Card.",
	"Drag": "During this model's activation, if this model passes within 2\" of a friendly model or Suspect during a Movement Action, it may make an Effort to place it in base contact at the end of the move. Models with the Large or Huge traits may not be targeted. The target model suffers Impaired Movement during its next activation. This model may not use the Drag trait on the same model in consecutive turns.\nIn addition, if this model inflicts Damage with a Melee Attack on an enemy model, you may place at the end of this activation the target in contact with this model.",
  "Drop a Riddle": "If you have played during this round at least 2 Objective cards as Resources, place a Suspect or a Riddle marker within 4” of this model.",
	"Duelist": "While in contact with only one enemy model, this model may reroll failed attack dice rolls in Melee.",
	"Duke of Duality": "When this model scores an Objective card, flip a coin or roll a D6: if the result is 'heads' (or an even number) draw an additional card. If the result is 'tails' (or an odd number), Discard an Objective card at random before drawing a new card.",
  "Daddy's Girl": "If this model starts its activation within 6\" of the Boss, it gains +1 ★.",
  "Death or Exile": "Target one KO model (not a Vehicle) within 8\" and line of sight. The target model is removed as a Casualty.",
  "Death Pack": "If the target of this model's Melee Attack is already in contact with one or more other friendly models with this trait, this model gains a +1 bonus to its attack dice rolls, and one extra attack die against that target.",
  "Delirium": "In the Recount phase, this model does not recover ★ Damage, and cannot take rolls to Recover from KO.",
  "Demoralize": "All enemy models with Rank Henchman within 6\" suffer the Enervating 1 Status.",
  "Demotivate": "Target a model within 8\" and line of sight. That model must pass a Willpower roll (2) or immediately suffer the Enervating (2) Status.",
  "Desensitized": "This model can never suffer Knocked Out, once this model has ★ equal to its Willpower, any subsequent ★ that targets it changes all ★ to 🩸.",
  "Detective": "This model may place or reveal a Suspect marker within 3\" and LoS instead of in contact.",
  "Detective Mode": "This model ignores the rules of a Smoke event marker.",
  "Direct Connection to the Speed Force": "This model may reroll the Paradox roll.",
  "Dirty Fighter": "This model can perform Ranged Attacks even if it is in contact with enemy models. If it uses a ranged weapon to target an enemy model in contact, it gains +1 to its attack dice rolls.",
  "Dirty Money": "If this model is the Boss, its crew has an extra $300 Funding.",
  "Disarray": "Target an enemy model within 8\" and Line of Sight. If that model has an Audacity marker, you can move the marker to another enemy model within 8\" that has yet to activate, and does not already have an Audacity marker.",
  "Discourage": "Choose an enemy model (not a Vehicle) within 8\" and line of sight. Perform an opposed Willpower roll against the target. If successful, the target model suffers -2 to its Willpower value when performing a Willpower roll until the end of the round.",
  "Disruptor": "Target one enemy model within 8\" and line of sight. The target cannot use ranged weapons with the Firearm or Beam rule this round.",
  "Disturb": "Target an enemy model within 8\" and line of sight that is yet to activate this round. Make an opposed Willpower roll against that model. If successful, you may look at the opponent’s Objective card hand, and Discard one of the cards.",
  "Distract": "Target one enemy model within 4\" and line of sight. The target reduces its Defense skill by -1 until the end of the round. If multiple models with this trait target the same model, the effect is not cumulative.",
  "Dodge": "This model can use the Dodging rule.\nDodging: A model that benefits from this rule may make an Effort to reduce the attack dice from a Ranged Attack that targets this model.",
  "Dollotrons": "When you recruit Professor Pyg, you must also recruit three Dollotron models, at no additional Reputation cost.",
  


  // E
 	"Echolocation": "This model does not suffer the Blind effect and can see through Smoke. In addition, this model may see at any distance, limited only by line of sight and intervening scenery.",
	"ECM": "All Light sources within 6” of this model are nullified (effectively illuminating an area of 0”).",
	"Ectokinesis": "This model can use Ectokinesis Spells. In addition, once per game this model can spend 1 MP during its activation to reroll its Attack and Strength dice rolls against models with the Incorporeal trait.",
	"Electric Handshake": "Choose a model in contact. The target model must pass a Willpower roll or suffer the Stunned effect.",
	"Electric Storm": "Center the Explosive template on this model. Roll a Strength 3+ die against all models affected by the template (except the attacking model itself) with Damage ★★.",
	"Eldritch": "This model can use Eldritch Spells. In addition, once per game during its activation, the model gains +1 to its Attacks value until the end of the round.",
	"Elite": "Your crew can only include 1 Elite model of each type, unless you also include the Elite Boss: Type.",
	"Elite Boss": "If your crew includes a model with this trait, you may include any number of Elite models of the same type as the Elite Boss (following the normal restrictions for forming a crew).",
	"Elusive": "When targeted by a Ranged Attack, this model may make an Effort to force the attacker to reroll one attack die.",
	"EMP": "This model rerolls failed Strength die rolls against models with the Cybernetic, Bot or Robot traits, and against models with the Vehicle rank.",
	"Enemies of the Court": "While this model is in play, if any of your models removes an enemy as a Casualty, you may pick one Objective card from the Spent Resources pile and add it to your hand.",
	"Energy Field": "Roll 1D6 for each hit this model suffers from a Ranged Attack. On a result of 5+, the hit is ignored.",
	"Enhanced Vision": "This model can see at any distance and ignores the Concealment trait. In addition, the model is immune to the Blind effect.",
	"Escape Artist": "After resolving an enemy attack against this model, as long as it is not made KO or a Casualty, it may immediately move up to 4”.",
	"Evidence Tampering": "When this model Reveals an enemy Suspect marker, it may place a friendly Suspect marker in contact with it first. Then, remove the enemy Suspect marker as normal.",
	"Exhaustive Planner": "One use only. When the opponent plays an Objective card as a Resource, this model can cancel that card’s effect. The opponent must immediately Discard the card.",
	"Exorcism": "This model can use Exorcism Spells. In addition, once per game during its activation but before casting any Spell, this model can spend 1 MP to add +1 to the result of all Magical tests until the end of the round.",
	"Expendable": "When this model is removed from the game as a Casualty, you may draw an Objective card.",
	"Experimental Ammo": "This model can’t Manipulate Ammo Crates.",
	"Expert Marksman": "This model gains a +1 bonus to its attack dice rolls when performing Ranged Attacks. Note: This trait is also called Ranged Master on some character cards.",
	"Exploit the Weakness": "When a friendly model with the Assassin trait within 8” of this model makes an attack, the target reduces its Effort limit by -1 for the duration of that action.",
	"Explosive Gel": "Once per activation, this model may mark a Streetlamp, Sewer or Suspect marker in contact as being sprayed with Explosive Gel (use a spare token or dice to remind you). In any subsequent activation, this model may use a Manipulate action to destroy any number of marked items. Center an Explosive template on each chosen marker, and roll a Strength 3+ die against each affected model. Any model hit suffers ★★ Damage. Then, remove that marked items from the game",
	"Extended Limbs": "This model can perform Melee Attacks against models up to 3” away as if they were in contact.",
	"Extremely Mutated": "This model cannot buy more than one item of Equipment.",
  "Exposure": "For each additional successful hit after the first, the target suffers 1 additional damage marker (any type).",
  "Engineer": "While attacking or defending against this model, enemy models with one or more pieces of Equipment suffer -1 to its Attack and Defense for the duration of the attack.",
  "Explosive Teeth": "Move an Explosive Teeth marker up to 4\". Then reduce its number counter by 1",
  "Explosive Arrival": "This model is not deployed as normal at the start of the game. Instead, during a friendly activation in which you score an Objective card, you may place this model anywhere on the gaming area, then, place a Smoke event marker in contact with this model, all models within 4\" of this Smoke event marker suffers Poison.\nThis model ignores this Smoke Event marker. Remove this marker at the end of the round. This model may receive an Audacity marker even if it is not in play.",
  "Explosive Personality": "While this model is in play, any friendly model can spend a Special Action during its activation to search into your Objective deck for a copy of the Bite The Dust or Let Them in on the Joke Objective card.\nIn addition, scored Stage Play Objective cards provide 3 VP each (instead of 2) even if this model is not in play.",




  // F
	"Fast": "This model gains +2” to its basic move distance.",
	"Feint": "Target a single enemy model in contact with this model and take a Willpower roll. If the roll is successful, the target can’t make an Effort against this model’s attacks this round.",
	"Feral (SPECIAL)": "Once this trait is activated, this model’s Melee Attacks this round gain a +1 bonus to attack dice rolls, and gain the Pinned Down effect.",
	"Ferocious": "This model’s Melee Attacks gain the Push effect.",
	"Fire Immunity": "This model cannot be affected by the Fire effect.",
	"Flak Armor": "This model is immune to Damage caused by hits with the Explosive and/or Expansive rules.",
	"Flaming Wave": "Center the Explosive template on this model. Roll a Strength 3+ die against all models affected by the template (except the attacking model itself) with Damage 🩸 and the Fire effect. After the use of this trait is resolved, this model receives ★ Damage.",
	"Flare": "One use only. Make the entire gaming area count as being under the effect of Light until the end of round.",
	"Fly": "Once per round, this model may add +8” to its basic move distance, and can move in any direction (including vertically). When using this ability, the model can move over obstacles and Difficult Ground without extra cost or penalty.",
	"Flying High": "One use only. This model may add +20” to its basic move distance, and can move in any direction (including vertically). When using this ability, the model can move over obstacles and Difficult Ground without extra cost or penalty.",
	"Follow Me!": "Choose a friendly Henchman within 4” of this model (but not the activated model itself). That model gains a +4” Movement Boost Marker.",
	"Football Gear": "Enemies attacking this model never benefit from the Sharp and Heavy weapon special rules.",
	"For the Family": "If a friendly Carmine Falcone within 4” and LoS of this model suffers any number of hits from an Attack (of any kind), this model may make an Effort to take the hits instead and all the effects of that attack. Only one Effort  is required per enemy Attack. This trait can’t be used against attacks from a model with Name: Selina Kyle. ",
	"Force Field": "Target friendly model in contact benefits from Cover until the end of the round, even if it is not behind Cover. Fully Equipped: This model can purchase any equipment listed for Jason Todd even if it comes from a different crew’s equipment list.",
	"Funny Bomb": "Center the Explosive template over this model. This is resolved as an Explosive Ranged Attack, rolling a Strength 3+ die for each affected model – on a successful roll, the model receives 🩸★ Damage. Once this action is resolved, remove this model as a Casualty.",
  "Freeze Well": "Once per round, when a ranged attack of this model score at least 1 Successful hit, the target makes a Willpower roll. If unsuccessful, that model places a new friendly Suspect in contact ignoring the usual placement rules. That suspect is frozen.",
  "Fight Me!": "If a friendly model within 4\" of this model and LoS suffers any number of hits from an Attack (of any kind), this model may make an Effort to take the hits instead, and all the Statuses of that attack. Only one Effort is required per enemy Attack.",
  "Feedback Protection": "This model doesn't receives Disruption tokens when a Suspect is removed by the Riddle marker rule.",
  "Find the Better Joker": "When a target enemy model would be removed as a Casualty within 8\" of this model, you may place a new friendly model with the Alias; Joker's Victim X that has been already removed as a Casualty, in contact with the target before removing it.",


  // G
  "Gas Jumper": "This model can move in any direction (including vertically). The model can move over obstacles and Difficult Ground without penalty. All models within 4\" and Los of this model at the end of a Movement action suffer Poison and Enervating (1) Statuses, with the Gas rule.",
	"Gas Mask": "This model ignores Damage and effects caused by any Attack or trait with the Gas special rule.",
	"Genius": "Once per round, this model can remove an Audacity marker from one friendly model, and give it to another friendly model that is yet to activate.",
	"Get ’Em": "One friendly model within 8” and line of sight of this model gains +2 Attack Marker.",
	"Ghost": "This model has the Invulnerability 1 and Incorporeal traits. Its Incorporeal trait is always active, and never has to be activated by spending an Action.",
	"Goad": "Target one enemy model (not a Vehicle) within 8” and line of sight, and take an opposed Willpower roll against it. If you succeed, you may move the enemy model up to 4”, following all of the usual Movement rules. During this movement, you cannot force the target to Fall.",
	"Good Aim": "This model can move and fire (or fire and move) when using a weapon with the Aim weapon special rule. In addition, the model gains +1 to its attack dice rolls with Ranged Attacks until the end of the round.",
	"Gotham City Siren": "One use only. Target another friendly model with this trait within 4” – the target gains +2 Attack Marker or Defense Marker.",
	"Grand Strategist": "While this model is in play and not KO, you gain +2 Resource points.",
	"Grapple Gun": "Once per round, this model gains +6\" to its basic move distance, and can move in any direction (including vertically). When using this ability, the model can move over obstacles and Difficult Ground without penalty. However, the model cannot use this rule in two consecutive activations.\n*Some models list this trait as 'Grapple Gun', and others as 'Batclaw'. The rules are the same in both instances - the distinction is just for fun!",
	"Greed": "This model cannot contribute to or fulfil criteria for Objective cards that award VP for inflicting Damage, making models KO, or removing models as Casualties.",
	"Green Magic": "This model can use Green Spells. In addition, once per game this model can spend 1 MP to remove 2 Damage markers from its character card.",
	"Green Travel": "One use only. Remove this model and immediately place it up to 20” away. A model may not perform a Movement Action in the same round that it uses Green Travel.",
	"Green Web": "Target friendly model with the Plant trait within 8” of this model immediately performs an Attack action.",
	"Grin Twins": "This model gains +1 to Attack, Defense and Willpower while there is at least one other friendly model in play with this trait.",
	"Gunman": "After activating this trait, if this model performs a Ranged Attack, it gains an extra Ranged Attack action.",
  "Good Aim": "During this model's next Ranged attack this activation, before rolling, roll one of your attack dice, on a 2+ that die is a successful hit. If it fails, remove it from the attack.",

  // H
	"Hacking": "This model may move up to 2 markers within 8” up to 4”.",
	"Hallucination": "This model can use this trait to place a friendly model (not KO or Knocked Down) with Alias: Bat-Mite in contact with itself.",
	"Handyman": "This model can make an extra Manipulate action during its activation. Also, this model can use a Manipulate action in contact with a model with the Vehicle rank to remove up to 2 Damage markers from it.",
	"Hard Guys": "If this model is your Boss, friendly Henchmen that attack with Brass Knuckles or Reinforced Gloves may re-roll failed Strength die rolls.",
	"Hardened": "Once per round, when this model suffers Damage, it can choose to change the Damage type of up to 1 Damage marker received.",
	"Hates: Crew/s": "This model can never be Included in the specified crew/s.",
	"Hates Humanity": "This model cannot be affected by friendly models’ traits.",
	"Hazard Armor": "This model ignores the Poison, Toxic and Fire effects. In addition, enemies roll 1 less attack die when targeting this model.",
	"Heavy Armor": "Enemy models roll 3 less attack dice when targeting this model.",
	"Heir to the Cowl": "When forming your crew, if there is no model with the Alias: Batman (any version) in the same crew, this model changes its rank to Leader.",
	"Henchman Bomb": "One use only. This model may choose one friendly Henchman model and center an Explosive template on it. This is resolved as an Explosive Ranged Attack, rolling a Strength 2+ die for each affected model, and inflicting Damage 🩸🩸🩸 on a successful roll. After resolving this attack, the chosen Henchman is removed as a casualty.",
	"Heroic": "Target any one friendly model on the board. That model can perform 1 extra Action this round.",
	"Hidden": "After both groups of both crews are deployed, this model may be deployed anywhere on the gaming area. If both sides have Hidden models, start with the player with setup initiative. This model must be placed out of line of sight of all enemy models if possible, or at least 12” away from enemy models that can see it. If this is not possible, this model must be deployed in the usual deployment zone.",
	"Hidden Boss": "When its crew’s Boss becomes a Casualty, this model immediately becomes the new Boss, taking the Crown Markers. Increase this model’s Willpower by +1 for the rest of the game. In addition, this model does not halve the range of the Inspire trait when taking over as Boss. If more than one model in the crew has this trait, or another trait with the same effect (such as Chain of Command) the controlling player must choose between them.",
	"Hidden Plans": "Unless a friendly Boss is within 8” of this model (or this model is the Boss), friendly models does not inflict additional damage for attacking K.O. models. If this model is the Boss, when you score an Objective card other than for making enemies models KO or Casualty, you gain 1 Resource point.",
	"Hidden Sniper": "Select a target that this model can see, and that is also within 12” of any board edge. The target receives a Ranged Attack, ignoring Cover. This attack has RoF 1, Damage 🩸🩸, and the Firearm rule.",
	"Hockey Gear": "Enemies attacking this model never benefit from the Sharp weapon special rule.",
	"Hold Breath": "When performing a Ranged Attack, this model may spend any Defense Marker it has to gain a +1 bonus to the attack dice rolls, and increase the natural score required for a Critical Hit on the Strength die by 1 for each marker spent (so, if the model spends 2 markers, it gains +2 to hit and scores a CRT on a 4+ instead of a 6). In addition, in any activation in which this model does not perform a Movement and Attack action, it may immediately gain up to 3 Defense Marker, but suffers the Enervating X effect (where X is equal to the number of markers it gains).",
	"Homo Magi": "This model counts its Willpower value as 1 point higher when taking Magical tests.",
	"Hover": "At the start of this model’s activation, you may place a Hover marker on the character card until the end of the round, to show that it is in Hover mode. While a model is in Hover mode, it can only be hit in Melee on a natural result of 6. A model with a Hover marker cannot benefit from the Cover rule and cannot perform the Manipulate action.",
	"Huge": "This model ignores up to 2 ★ Damage per enemy Attack.",
  "Healing Radiance": "A friendly model within 4'' of the target of the attack, removes up to 1 Damage.",
  "Harlequin": "Keyword",
  "Horde": "This model can be recruited up to four times in a crew, regardless of its Name.",
  "High Caliber": "This weapon's Strength die is the last that must be removed from the attack if the target is within effective range.",


  // I
	"I Believe in Harvey Dent": "If this model is the Boss, friendly Henchmen must roll a die or flip a coin at the start of their activation. If the result is even/heads, that model gains 1 free Effort until the end of the round. If the result is odd/tails, it suffers Enervating 1.",
	"I Know What I’m Doing": "One use only. This model can ignore the result on the Paradox table. The Speed Power still fails.",
	"I’m Batman": "After all other models have deployed, this model deploys anywhere on the gaming area. When it deploys, all models within 2” must pass an Endurance roll or become Knocked Down. In addition, once per game, this model may reroll a Strength die.",
	"Iceberg Lounge": "If this model is your Boss, one of your Henchmen may purchase a single Equipment option at double Funding cost from another crew list when configuring the crew. This does not include Equipment that requires the inclusion of a specific model to purchase.",
	"Ice Flash": "Select a target model within 10” and line of sight. The target must pass an Endurance roll, or become subject to the Cooled effect. If the target passes the Endurance roll, it still suffers -1 to its Defense skill until the end of the round, and the Slow 2 effect.",
	"Immortal": "Removing this model as a Casualty cannot fulfil the requirements of an opponent’s Objective card.",
	"Impetuous": "If this model Attacks the model that was closest to it when it activated, it gains 2 additional attack dice, but suffers -1 to its Defense skill until the end of the round. If two or more enemy models are equally closest, attacking either of them will trigger this trait.",
	"Incorporeal": "This model is immune to ★ Damage until the end of the round. In addition, the model can move 'through' other models and scenery as though they weren’t there, but still cannot end its move overlapping another model or inside solid scenery.",
	"Informer": "As long as this model is not KO, the crew gains one additional Pass on Activation.",
	"Inspire": "All friendly Henchmen that start their activation within 8” of this model gain 1 extra Manipulate action.",
	"Inspire Fear": "Target an enemy model (not a Vehicle) within 4” and line of sight. The target must take a Willpower roll. If this roll is failed, consult the following chart: \n Fails by 1-2: Target suffers the Scared effect. \n Fails by 3-5: Target suffers the Scared, Terror 1 and Slow 2 effects. \n Fails by 6 or more: Target is removed as a casualty.",
	"Instinctive Shooting": "In the round in which this trait is activated, this model’s ranged weapons don’t lose dice for moving before attacking.",
	"Intel Support (X)": "This model cannot be targeted/affected by an attack, and does not suffer Statuses or Damage and cannot perform Unarmed attacks. It is only considered in contact with other models during its activation. When this model performs a Move, it is instead a Place. This model cannot use the Sewers in any way. When an enemy model removes 1 of your Suspects, place 1 Disruption token on this model. When this model has X Disruption tokens remove the tokens and the model from the gaming area. In any subsequent Raise the Plan phase, you may reduce your Audacity markers by 1 during that round to return this model to play, placing it anywhere on the gaming area. This model is considered a Casualty/KO when it is removed from the game for the purpose of scoring a card.",
	"Interrogation": "When this model scores at least 2 hits with a Melee Attack, this model or another friendly model in play, may immediately make an extra move of 4” or place a Suspect marker.",
	"Intimidate": "Target an enemy model (not a Vehicle) within 8\" and line of sight. For the rest of the round, the target cannot perform Special Actions unless it Efforts 2★, and to Effort during a Willpower roll must take 2★ instead of 1.",
	"Intimidation": "Target an enemy model (not a Vehicle) within 8” and line of sight. The target must pass a Willpower roll or be unable to perform Melee Attacks this round.",
	"Invaluable": "When this model becomes a Casualty, the opponent gains 1 Resource point.",
	"Invulnerability (X)": "This model is immune to the CRT: Casualty effect. In addition, the first 'X' Damage markers received by this model during each round are ignored.",
	"It’s Mine": "Enemy models cannot Reveal your Suspect markers while the marker is within 2” of this model.",
	"I Will Break You": "When you recruit this model, choose one of the following options: \n • Bane gains +3 Extra Venom Doses and may apply them to a friendly model within 4'' during his activation. \n • Bane gains Exhaustive Planner and +1 Willpower. \n • Bane Gains Close Combat Master.",
  "Induction": "Once per round, when this model places a Suspect and/or when it affects an enemy model with the Inspire Fear trait you may place a Fear card into the Objective deck.",
  "Insidious": "Enemy models within 4'' of this model receive +1 to their Willpower roll results (cumulative up to 3)",
  "Ice Flash": "Target a model within 10\" and LoS. That model must pass an Endurance roll, or suffers the Freeze Status. If it passes the Endurance roll, reduce its Defense skill by 1 and gain -2MOV until the end of the round.",
  "Ice Age": "Once per game chose one: Search in your objecive deck for a card with the name Searching for Nora and put it in your hand, or, Move all friendly models with the \"Cold Acclimation\" trait within 4\" of Mr Freeze or a frozen suspect 4\".",
  "Ice Queen": "Friendly models with affiliation gain 1 free Effort while they are within 4\" of a Frozen Suspect and/or this model.\nIn addition, once per round as a free action, you may target a Suspect within 4\". That Suspect becomes a Frozen Suspect.",
  "If You're Good at Something": "The Explosive Teeth markers inflicts an additional ★ marker. In addition, when this model places a Suspect, you may place it within within 6\" instead of in contact.",
  "I Am Chaos": "Discard an Objective card at random. The opponent must show you their Objective card hand. For each enemy model within 8\" and LoS, choose one of those cards - the opponent must Discard it",



  //J
	"Joker’s Gas": "All other models within 4” and LoS suffer Enervating 1 and the Poison effect, with the Gas rule.",
	"Joy for the Victory": "Friendly models within 8” gain +1 to their Willpower value while performing Willpower rolls. In addition, friendly models within 8” that score an Objective card during their activation may immediately move up to 2''.",
	"Judgment": "When this model makes an enemy model KO, flip a coin or roll a D6: if the result is 'heads' (or an even number) remove the enemy model as a Casualty.",
	"Juggernaut": "When this model completes a Movement action you may Push all models in contact 2'' (no hits are required). In addition, this model gains +1 to its attack dice rolls against models contacted in this way this round.",
	"Jump Up": "Whenever this model would suffer the Knocked Down effect, it may first immediately make an Effort to remove the effect.",

  //K
	"Kaos Agent": "All friendly models with Rank Henchman gain the Trickster trait for the duration of the game. You do not have to place all of your Audacity Activation markers during the Raise the Plan phase (or any, if you wish). Instead, whenever a friendly model with the Trickster trait activates, you may give it one of your remaining Audacity Activation markers.",
  "KaPow!!!": "Until the end of its activation this model’s Melee Attacks gain +1 to attack dice rolls and Blunt 3.",
	"Kevlar Vest": "Whenever this model takes Damage from an enemy attack or special rule, reduce the total number of Damage markers it receives by 1, to a minimum of 1. You may choose which marker is ignored.",
	"Kill them!": "Target a friendly Henchmen within 4” of this model (but not the activated model itself). Target model gains +2 Attack Marker.",
	"Kite": "While performing a Move action, this model increases the maximum distance it can move by 2'' for each Suspect within 4'' (measured once at any point during the Move). In addition, this model can move in any direction (including vertically) over obstacles and Difficult Ground without extra cost or penalty.",
	"Kobra Armor": "Once per round, this model may make 1 Effort to gain 1 Defense Marker.",
	"Kryptonian X": "A model with this trait gains a number of rules determined by the trait’s level (X), see below. \n 1: Fast, Invulnerability/1, Natural Immunities. \n 2: Fast, Invulnerability/2, Natural Immunities, Super Jump. \n 3: Fast, Fly, Invulnerability/3, Natural Immunities. \n 4: Fast, Fly, Invulnerability/3, Natural Immunities, Tough Skin. \n 5: Fast, Fly, Hover, Flying High, Invulnerability/4, Natural Immunities, Tough Skin. \n 6: Fast, Fly, Hover, Flying High, Invulnerability/5, Natural Immunities, Tough Skin. \n If the game is affected by the Day rules, the Invulnerability rule is improved by +1 and all the levels gain the Regeneration trait.",
	"Kryptonite": "While a model with this trait is within 4'' of a model with the Kryptonian trait, the Kryptonian model loses the Invulnerability and Regeneration traits (if they possess them).",
  "Knowledge is Power": "During this model's activation, it gains a Free Special Action if you have looked at the opponent's deck or hand this Round.",
  "Kill Them!": "Target a friendly model with Rank Henchman within 4\" of this model (but not the activated model itself). Target model gains +2 Attack Marker.",


  // L
  "Lantern": "A model with this trait can activate it at any time during its activation. The model counts as a Light source with a radius of 2” until the end of the round.",
	"Large": "This model ignores up to 1 ★ Damage per attack suffered.",
	"Laser Sight": "Target one model in line of sight. The target counts as being under the effect of Lights until the end of the round, or until the target moves or changes its current position.",
	"Lasso of Persuasion": "One use only. Target an enemy model within 2”. That model suffers the Hypnotize effect.",
	"Leadership": "All friendly models within 8” of this model may reroll Willpower rolls.",
	"Lethal Blow": "Once this trait is activated, for the rest of the round when this model damages a non-vehicle enemy with a Melee Attack Action, the damaged model suffers the Stunned effect too.",
	"Let’s Ride": "Once per round, choose another model within 6” and line of sight. If the target is a friendly model, it gains two Attack Markers or Defense Markers. If the target model is an enemy, it immediately suffers the Enervating 2 effect.",
	"Light Armor": "Enemy models roll 1 less attack dice when targeting this model.",
	"Living Legend": "This model can be activated twice each round. Each activation is independent of the other (and cannot be made consecutively unless there is no other choice). If the model has an Audacity marker, it is only used for one of its activations. In addition, once per round, when a trait specifies this model as a target, you may cancel the use of that trait. A crew that includes a Living Legend loses one Pass on Activation each round (if applicable).",
	"Long Guns": "If this model is the Boss, then at the start of the first Raise the Plan phase you may select up to three friendly Henchmen with ranged weapons with the Short Range and Firearm rules. Those weapons replace the Short Range rule with the Medium Range rule for the duration of the game.",
	"Lord of Business": "If this model is the Boss, its crew has an extra $500 in its Funding stash. In addition, when a friendly model plays the Valuable Commodities card, you may place an additional Loot marker in contact with another Suspect marker.",
	"Lord of the Sewers": "This model may deploy in contact with any Sewer marker. In addition, this model’s crew generates 1 extra Sewer marker. Once per game, this model can exit from a sewer and continue moving.",
	"Luck": "Once per round, this model may reroll any single die that it has rolled, for whatever reason.",
	"Lunatic Laugh": "All other models (not Vehicles) within 4” of this model lose 1 Defense die during their next roll.",
  "Limited Attack": "An attack with this weapon inflicts its damage only once, regardless of the number of successful hits and does not inflict Knocked Down when scoring a CRT",
  "Limited Equipment": "This model can only purchase up to 1 Equipment.",
  "Let's Cool It For Now": "Once per round, after this model places a suspect, target another model within 4'' of that suspestc, it gains +1 or -1 Defense Modifiers Markers",
  "Lieutenant (X)": "If the crew contain a model with Alias (X), this model reduces its funding cost to 0 and all friendly models with Rank that start their activation within 8'' of this model are affected by the Inspire trait of the friendly model with Alias: (X).",
  "Like Flies to Me": "When this model is the target of an Attack action, the attacker must treat this model's Defense value as equal to the attacker's Strength value.",
  "Lunatic Laugh": "Until the end of the round, enemy models within 8\" and LoS roll 1 fewer die when making a Defense roll.",
  "Leading From Shadows": "If this model is the crew Boss, while this model is not on the gaming area (and not removed as a Casualty), its Inspire rule affects all the gaming area.",



  // M
	"Magical Power (X)": "All models with this trait can use Elemental Spells. The value 'X' is the number of Magic Points (MP) the model can spend during a round. Each spell costs a number of MPs to cast. At the Beginning of the Raise the Plan phase, the model gains a number of MPs equal to X. At the end Recovery phase, all unspent MPs are lost.",
	"Magic Tattoos": "This model is immune to the Steal and Fire effects.",
	"Make them Perfect": "This model’s Attack actions gain the Push effect, but the direction of the Push must be directly towards a friendly Professor Pyg model if he is in play.",
	"Manipulative": "When this model is in your Crew, you may redeploy up to two friendly models after normal deployment but before the game starts. In addition, at the end of each Raise the Plan phase you may nominate one model to take a Willpower roll. If this roll fails, the target model must be the last model in its crew to be activated that round.",
	"Martial Artist": "This model ignores the penalty for being Outnumbered in combat.",
	"Martial Expert": "This model causes a Critical on a Strength die natural result of 4, 5, or 6, not just 6.",
	"Master Criminal": "All friendly Henchmen with the Criminal trait benefit from a +1 bonus to their attack dice rolls when making Attacks.",
	"Master Fighter": "This model gains a +1 bonus to its attack dice rolls when performing Unarmed Melee Attacks.",
	"Master Marksman": "This model can reroll failed attack dice rolls when performing Ranged Attacks.",
	"Master of Stealth": "When this model is under the effect of the Night rule, it can only be seen by enemies within 6” instead of the usual range. It is still subject to rules that aid detection, such as Lights, Total Vision, etc. When this model benefits from the Sneak Attack trait, it gains +1 to its attack dice rolls.",
	"Mastermind": "If this model is in play and not KO, its controlling player gains +1 to the Take the Lead roll.",
	"Mechanical Mount": "This model gains +4” to its basic move distance, but can neither Jump nor Climb.",
	"Medic": "This model may remove up to 2 damage markers from a friendly model in contact (not Vehicle) with at least 1 Damage marker of any kind. If this ability is used to recover a model that is yet to activate that round from KO, the opponent gains a Pass marker.",
	"Meditation X": "At the start of this model’s activation it may make up to X Efforts. The model gains X Magic Points until the end of the round. These points can exceed the maximum that a model can generate and spend as detailed by the Magical Power trait.",
	"Medium Armor": "Enemy models roll 2 less attack dice when targeting this model.",
	"Meet Goliath!": "This model can only be recruited in a crew or Team containing a model with Name: Damian Wayne. However, this model can never be recruited to a OWLS crew. This model does not reduce its Effort Limit due to accumulated Damage and it may make 2 free Efforts when performing an Attack, and when Defending.",
	"Menace": "Enemy models must spend one additional Action (of its choice) to choose this model as the target of an Attack. This effect lasts until the end of the round.",
	"Mental Dominance": "Once per round, this model may target an enemy model within 4” and line of sight. That model must take a Willpower roll. If it fails, you can perform one Action with that model, out of sequence, temporarily treating it as though it was one of your own models. You may not perform any action that could cause Damage to the target model (such as Falling, or deliberately positioning an Explosive template so it is affected, etc).",
	"Mentoring": "This model can only purchase one piece of Equipment. If its crew or Team list contains a Leader or Sidekick with Affiliation: Brave and the Bold, all 🩸 Damage inflicted by this model is automatically converted to ★ Damage. In addition, this model gains the Boy Wonder and True Love: Bruce Wayne traits, and any model with Name: Bruce Wayne in the same crew or Team gains True Love: Damian Wayne until the end of the game.",
	"Mercenary": "You can only recruit this model in a League of Assassins crew if a model with Name: Bane is also included in the crew.",
	"Military Teamwork": "A friendly model performing an Attack against an enemy in contact with this model gains +1 to its Attacks skill for the duration of the Attack.",
	"Military Tradition": "Other friendly models with the Veteran trait within 8” can move up to 2” immediately.",
	"Millionaire": "This model’s crew gains an additional $400 Funding.",
	"Mind Blast": "Target a model (not a Vehicle) within 8” and line of sight. The target must pass a Willpower roll or receive 🩸🩸 damage.",
	"Mind Control Device": "Choose a Suspect marker within 8”. Target a model within 4” of that Suspect marker. That model immediately suffers the Hypnotize effect. Remove that marker.",
	"Mind Control Substance": "When this model is recruited to your crew, friendly models with the Henchman rank cannot have their Willpower value reduced by any means, and during the Recovery phase they recovers automatically from KO.",
	"Mind Trick": "After a model within 8” of this model reveals a Suspect, you may move one Suspect in play up to 4”.",
	"Mine": "Convert a Suspect marker in contact with this model into a Mine marker (is still a Suspect marker). When a model moves within 2” of the Mine marker, immediately roll a Strength 2+ die against it. If the roll is successful, the model suffers 🩸🩸 Damage, and the marker is removed from play. If the roll fails, remove the Mine Marker.",
	"Minion (X)": "This model can be hired up to X times in a crew, regardless of its Name.",
	"Mixed Combat Style": "After this model performs an Attack action it can perform an extra Attack action (of a different type from the first) during the same activation.",
	"Mob": "A crew that includes this model may have up to +2 additional Suspect markers in play at any one time.",
	"Mobster": "When attacking an Outnumbered model in close combat, this model rolls an additional attack die.",
	"Monitoring Device": "Until the end of the round, this model gains Total Vision and its ranged weapons gain Remote Controlled.",
	"Moral Compass": "This model cannot attack KO models.",
	"Mortal Kiss": "If this model successfully performs at least 3 hits against a model (not a Vehicle), remove the target model as Casualty.",
	"Mud": "Enemy models in contact with this model that wish to move must spend a Special action as well as a Movement action. In addition, this model’s attacks gain the Slow 4 effect.",
	"Multifire": "When using a ranged weapon, this model gains +2 attack dice. The model cannot move in the same round that it uses this ability.",
	"Multitask": "This model chooses one of the following options before the game begins: \n • Explorer: Gain the Undercover trait and +2 basic move distance. \n • Hacker: Gain +1 Willpower. Also gains the Computer Intrusion trait. \n • Defender: Gain +2 Endurance. Also gains the Force Field trait. \n • Fighter: Gains +1 Attack, +1 Defense and the Claws trait.",
	"Multiverse Teleportation Device": "This model may not be deployed as normal at the start of the game. Instead, at the start of the Raise the Plan phase of the second round, place this model anywhere on the board (but not inside a building or similar enclosed space).",
	"My Idol!": "This model can only be recruited if a model with the Alias: Zur-En-Arrh Batman is part of the crew. In addition, while a friendly model with Alias: Zur-En-Arrh Batman is in play and not KO, this model gains +1 Willpower.",
  "Motion (X)": "When using this weapon, if any hits are scored the wielder may immediately Move X''.",
  "Mindless Monster": "At the start of this model's activation target the closest enemy model. If the first action this model performs is a Movement action and it ends in contact with that enemy model, perform a free Attack action against that model.",

  // N
	"Narcotic Dose (DOSE)": "A model may use a Narcotics Dose at any time during its activation. If it does so, the model gains the Desensitized trait until the end of the round.",
	"Natural Immunities": "This model cannot be affected by the Blind, Poison or Steal effects.",
	"Necromancy": "This model can use Necromancy Spells. In addition, once per game during its activation this model can spend 2 MPs to inflict 🩸 Damage to another model in contact, and then remove 1 Damage marker from itself.",
	"Negative Speed Force": "While this model is in play, the Speed Force Pool maximum is reduced by 2.",
	"Night Vision": "This model ignores the Night rule.",
	"No Mercy!!!": "All friendly Henchmen add the Bleed 1 effect to their Attacks.",
	"Non-Lethal Ammo": "When this model attacks non-Vehicle models with its ranged weapons, all 🩸 damage becomes ★ damage.",
  "Nature's Arm": "Until the end of the round, This model may place or reveal a Suspect marker within 4'' and LoS instead of in contact. An enemy model in contact with that suspect increases the Slow Status value by (2), unless it doesn't have it, then it suffers the Slow (2) Status.",
  "Nightmare": "At the start of a Nightmare's activation, you may place it in contact with a friendly Suspect. A Nightmare can only be Move or being Placed by this rule. \n This model is always considered an active model and is inside the gaming area so, it may receive Audacity even if it is not in play. \n• If a Nightmare gets Knocked Out, immediately remove it as a Casualty. \n• When a Nightmare is removed as a Casualty, it can be returned to play again in a subsequent round, with its usual rules, removing all Damage and Statuses suffered previously by that Nightmare. \n• Nightmares have a 4'' 'action zone' radius. Within that radius, Nightmares are able to attack in Melee (no contact is needed), and may perform the Manipulate action. \n• Nightmares cannot Place/Reveal Suspects more than once during its Activation.",
  "No More Lies": "During the activation of a friendly model with the Riddler Followers keyword, you may remove a friendly Suspect within 4\" of that model. If you do, during this and the subsequent activation, the opponent cannot play Objectives as Resources.",
  "Not Him": "When this model suffers Damage that causes it to suffer KO or be removed as a Casualty, you may place it in contact with a friendly model within 8\" that share a Keyword with this model. The friendly model suffers that damage instead.",
  "Never Do It For Free": "This model's crew gains an additional $400 Funding.",


  // O
	"Objectives? Puzzles everywhere!!!": "A crew that includes this model does not accomplish Objective cards following the normal rules. Instead, when a model that share an Affiliation with this model place a Suspect marker, you must roll 1D3. Place a Number Counter on top of that Suspect marker with an equal value as the roll. At the end of the round, you score Objective cards that shown the same VP value as the Number Counters on top of the friendly Suspect markers. Each Number Counter only accomplish 1 Objective card and then, is removed.",
	"Obsessive (Mental Disorder)": "If this model selects the same target for all of its Attacks in a single activation, it gains +1 to the Strength die roll.",
	"Obstinate": "This model have 1 free Effort when Attacking, Defending and when taking Willpower rolls even if it reaches its maximum effort limit.",
	"OCD (Mental Disorder)": "If this model selects the same target for all of its attacks in a single activation, it gains +1 to its attack dice rolls.",
	"Occultism": "This model can use Occultism Spells. In addition, once per game during its activation, the model gains +1 to its Defense value until the end of the round.",
	"Offensive Defense": "When this model blocks at least 1 hit from a melee attack, then after resolving the action the attacking model suffers ★★ damage and is Pushed 2” (in a direction of your choice).",
	"One-Armed": "This model suffers a -1 penalty to its defense die rolls.",
	"One of the Boys": "This model benefits from the Boss’s Inspire rule exactly as if it held the Henchman rank.",
	"One Shot Gun": "One use only. Choose an enemy model within 8” and line of sight. Roll a Strength 2+ die with Damage 🩸🩸🩸, and Bleed 3. This ability is considered a Ranged Attack with the Anti-Tank rule, so all rules, traits and abilities that relate to it are in effect (i.e. Line of Sight, Cover, and traits that affect Ranged Attacks).",
	"Order": "Target another friendly model within line of sight. The chosen model can immediately place a Suspect marker.",
	"Outlaw Field Commander": "Choose another friendly model within 4” and line of sight. That model gains +2 + or .",

  // P
	"Painful Empathy": "Transfer up to 2 Damage markers from another friendly model in line of sight (not a Vehicle) to this model. If any Damage markers are moved in this way, this model gains +1 to its Attacks and Defense skills until the end of the round.",
	"Panda Costume": "This model must spend an Action (any type) to stand up. This model may do nothing else during that Action.",
	"Paranoid (Mental Disorder)": "If this model has at least 1 Damage marker on its character card, then during the Raise the Plan phase it gains a Defense Marker.",
	"Penguin Caller": "If you have less than 3 friendly Explosive Penguins in play you may place an Explosive Penguin within 2” of this model and in contact with a friendly Suspect marker. Then, remove that friendly Suspect marker. For each model with the Animal trait within 4” of this model, add +1” to the distance at which the Explosive Penguin may be placed. Finally, the opponent gains a Pass marker.",
	"Penguin Feeder": "Once per activation, this model can restore Ammo Magazines used earlier in the game to friendly models with the Animal trait within 4”. Remove 1 friendly Suspect marker within 4” of this model for each magazine restored. In addition, Explosive Penguin models within 4” inflict 1 additional 🩸 when using the Self-Destruct trait. This model’s Inspire trait range is improved by +2”. However, it cannot benefit from the Protective or Small special rules until this Upgrade is disabled.",
	"Perfect Creations": "If a friendly Professor Pyg is removed from the game as a Casualty, all friendly Dollotrons are removed as well. Dollotrons never count towards Objective requirements for being made KO or becoming a Casualty. If a friendly Professor Pyg within 4” of this model and LoS is hit by an Attack (of any kind), this model can make an Effort to take the hit instead, and all the effects of that attack. Dollotrons can only be recruited in a crew that contains Professor Pyg.",
	"Performance": "If this model is in play and not KO, enemy models within 6” that wish to perform an Attack, or use 🦇 traits, must first take a Willpower roll. If they fail the test they suffer -1 to their attack dice rolls until the end of the round.",
	"Personalities": "At the end of each Take the Lead phase, shuffle all the Personalities cards and draw one at random. Apply the rules on that card to this model until the end of the round. This model cannot use its weapons unless it draws the Personalities card that allows it. In addition, if the opponent has 5 VP more than you, and/or this model has 3 or more Damage markers, you may draw 3 cards and choose one.",
	"Persuasive": "At the end of this model’s activation, nominate any enemy model in line of sight that is yet to activate this round. That model must be the next to activate. The opponent can’t use a Pass to ignore this rule. A model can use this trait once per round.",
	"Pickpocket": "Once per Round, if this model is in contact with an enemy model suffering KO, you may look at your opponent's Objective card hand and Discard 1 card from it.",
	"Planning the Move": "All other friendly models with the Gotham City Siren rule in this model’s crew gain the Primary Target trait until the end of the game.",
	"Plant": "Each Plant recruited to your crew grants you one friendly Suspect marker that may be placed anywhere on the board at the end of the Choose Plot Cards step of the pre-game sequence. Plants are not deployed as usual – instead, during a friendly model’s activation, you may place one of your Plants in contact with a friendly Suspect and then remove that Suspect. Always are considered an activable model and inside the gaming area. \n • If a Plant gets Knocked Out, immediately remove it as a Casualty. \n • A plant may receive an Audacity marker even if it is not in play. \n • A Plant’s basic move distance cannot be increased by any means. \n • Plants have a 4” ‘action zone’ radius. Within that radius, Plants are able to attack in Melee (no line of sight or contact is needed), and may perform the Manipulate action. \n • Plants can only Manipulate to reveal Suspects. \n • Plants are immune to the Poison, Knocked Down, Hypnotize and Blind effects. \n • When a Plant is removed as a Casualty, it can be placed in play again in a subsequent round with its usual rules, removing all damage and effects suffered previously.",
	"Play Nice!": "All friendly Henchmen in this model’s crew gain the Bluff trait.",
	"Plead": "Choose one enemy model (not a Vehicle) within 4” and line of sight. The target must pass a Willpower roll or be unable to attack this model this round.",
	"Poison Immunity": "This model is immune to the Poison effect.",
	"Poison Master": "Models that perform a roll to resist the Poison effect within 8” of this model may roll 1 less dice (at your choice).",
	"Pollination": "When this model places a Suspect, it may be placed completely within a friendly plant action zone.",
	"Pollution Hate": "This model cannot enter Sewers.",
	"Possessed": "When this model is the Boss you can recruit up to three Henchman with any Affiliation (as long as they don’t have the Bot or Cybernetic traits). Their Affiliation is assumed to be the same as this model. However, Henchmen hired in this way lose -1 Willpower and gain the Self-Discipline trait if they do not have it already.",
	"Possession": "Target a model within 4” (not a Vehicle, or a model with the Bot trait). The target must take a Willpower roll with a -1 Willpower penalty. If it fails the roll, the target becomes Possessed! Remove this model (the ‘Possessor’ hereafter) from play – it cannot be activated while this trait is in effect, and it does not count for the purposes of Passes. However, the Possessed model is now controlled by you, rather than its own player. Treat it as a member of your crew (if the model has already activated this round, then you may award the model an Audacity marker in the following round). At the end of its next activation, the Possessed model must pass a Willpower roll (again with a -1 Willpower penalty) or continue being possessed. If the Possessed model passes the Willpower roll, the possession ends – see below. Alternatively, at the end of the Possessed model’s activation, immediately before the Willpower roll is taken, the Possessor may choose to end the possession. \n• When the possession ends, return the Possessor to play by placing it within 4” of the Possessed model. The Possessor cannot be activated this round; the model that was Possessed returns immediately to the control of its owning player. \n• If the Possessed model becomes KO or Casualty while possessed, then the possession ends as described above. However, as soon as the Possessor is placed on the board, assign 🩸🩸 Damage to its character card.",
	"Power Armor": "Enemy models roll 1 less attack dice when targeting this model. In addition, you can make Efforts to ignore up to 2 Damage markers received per Effort.",
	"Power Armor MkII": "This model is Immune to CRT. In addition, you can make Efforts to ignore up to 2 Damage markers received per Effort.",
	"Power Dampening": "All models within 4” of this model lose the Incorporeal and Invulnerability traits and cannot cast Spells this round.",
	"Power Strike": "Once this trait is activated, for the rest of the round when this model damages a non-vehicle enemy with a Melee Attack Action, the damaged model suffers the Knocked Down effect too.",
	"Power Supply": "This model starts the game with 3 Power counters. Once per model activation, this model can spend 1 Power counter as follows: \n• During its activation: This model gains a 4+ Movement Boost Marker. \n • During its Attack: Each Hit scored needs two successful blocks to cancel it.\n • When receiving Damage: This model ignores up to 2 Damage markers suffered. \n In addition, this model can Manipulate a Streetlamp marker to gain 2 Power counters.",
	"Precise Aim": "If this model has not moved, when performing a Ranged Attack it gains +2 to its attack dice rolls. This model may not move after using Precise Aim.",
	"Precise Blow": "Once this trait is activated, for the rest of the round this model gains a +1 bonus to its attack dice rolls, and may reroll the Strength die.",
	"Primary Target": "This model can treat enemy Suspect markers as friendly.",
	"Protect Me!": "If this model is hit by an enemy attack (any type), you may make an Effort to nominate a friendly model within 4” and LoS (not a Vehicle) to take the attack instead. Resolve any Damage and/or effects against the nominated model.",
	"Psychiatrist": "All friendly Henchmen models with a Mental Disorder trait within 8” and line of sight of this model gain +1 to their Attack and Defense skills. These bonuses last until the end of the next Raise the Plan phase.",
	"Psycho": "When this model takes a Willpower test, if applies a -2 modifier to the roll result.",
	"Psychologist": "When a model within 4” scores an Objective, that model suffers Enervating 1 or removes 1 ★ from its character card (your choice).",
	"Psychoanalysis": "Target a model with a Mental Disorder trait, friendly or enemy, within 8” and LoS. The target ignores the effects of their Mental Disorder until the end of the round.",
	"Public Resources": "If this model is included in your crew, add $300 to the crew’s available Funding. In addition, you may place one additional Streetlamp and Sewer marker before the game starts.",
  "Puzzle Master": "When this model is going to place a Suspect by a Manipulate action, it can place 2 Suspect markers and can place them within 6\" instead of in contact.",
	"Pyromania (Mental Disorder)": "If, at the beginning of its activation, this model can see any model with a Fire marker, this model gains a Defense Marker.",
  "Pull (X)": "The affected model is moved directly towards to the attacker X''.",
  "Poison Catalyst": "A model within 4'' suffering the Poison Status must make a Poison test.",
  "Poisoned Fish": "Target a Poisoned Fish marker. Choose a direction and roll 2D6. Move that marker a number of inches equal to the result. Any model the marker comes in contact with that has an Endurance value less than the roll suffers the Poison Status.",
  "Pulling The Strings": "When this model places a Suspect, target another friendly model and move it 8\".",



   //Q
	"Quiz Master": "After playing an Objective card during this model's activation, instead of drawing, you may search your Objective deck for any card, reveal it and place it in to your hand. Then shuffle your deck.",



   //R
	"Radio": "This model is always treated as though it were within range of the Inspire rule.",
	"Radioactive Soul-Self": "When this trait is used, this model becomes immune to all Damage and effects, cannot be targeted by any model, cannot move, and cannot perform Manipulate actions. However, this model gains +1 Attacks skill, adds +2 to its attack dice rolls, and its Unarmed Melee Attacks produce ★★ Damage. This model can make Melee Attacks against models up to 8” away as if it were in contact. These conditions last until the end of the model’s next activation. This trait cannot be used in two consecutive rounds.",
	"Raised in the Sewers": "This model can deploy in contact with a Sewer marker instead of in its deployment zone.",
	"Ranged Master": "See Expert Marksman.(Expert Marksman - This model gains a +1 bonus to its attack dice rolls when performing Ranged Attacks. Note: This trait is also called Ranged Master on some character cards.)",
	"Rapid Fire": "When making a Ranged Attack, this model gains +1 Attack die.",
	"Rat Tamer": "Sewer Swarm models within 8” of this model gain a Attack Marker and a 2+ Movement Boost Marker.",
	"Really Huge": "This model ignores up to 2 ★ Damage per enemy Attack.",
	"Reanimated Owl": "This model can re-roll failed rolls to recover from KO. When this model becomes a Casualty, the opponent gains 1 Resource point.",
	"Reflexes": "When performing a Ranged Attack against this model, successful hits must be rerolled.",
	"Regeneration": "During the Recount phase, if this model is not KO it can remove 1 additional Damage marker (any type).",
	"Regrets": "At the start of each of this model’s activations, it must pass a Willpower roll or be unable to make any Attacks or use Flaming Wave during this round. For each friendly model that is KO or removed as a Casualty so far this game, this model gets -1 to the roll.",
	"Reinforced Gloves": "This model’s Unarmed Melee Attacks inflict Damage ★★.",
	"Repairman": "Remove 2 Damage marker from a target Vehicle in contact.",
	"Resilient": "This model can reroll failed Endurance rolls.",
	"Retractable Claws": "This model’s Unarmed Melee Attacks inflict Damage 🩸★ and have the Sharp weapon special rule.",
	"Revenge": "All friendly Henchmen that attack an enemy model within 8” of this model gain one extra attack die this round.",
	"Ricochet": "After this model scores any successful hits with a Ranged Attack, select another enemy model within 2” and line of sight of the target. Perform an extra Ranged Attack (without spending Ammo) against this second target with the same weapon, ignoring line of sight, effective range and cover.",
	"Riddler Bots": "When you hire a model with the trait 'Can you solve this?/X', this trait changes to Autorepair/X (X is the value of the ‘Can you solve this?’ trait) and Multitask.",
	"Riddles Addict": "Once per round, this model can Reveal enemy markers without spending an Action.",
	"Rock": "This model’s attacks gain the Overwhelming weapon special rule.",
	"Roots": "Target an enemy model within 8” and line of sight. Perform an opposed Endurance roll against that model – if you succeed, the target suffers the Pinned Down effect until the end of the round.",
	"Runaway": "This model is immune to the Arrest trait.",
  "Riddler Followers": "Keyword.",
  "Required (X)": "This model can only be included in a crew that already contains the model with alias (X).",
  "Reload": "After performing a ranged attack with this weapon, it must Reload. you may not use the weapon untill it is Reloaded. In order to Reload you must spend a whole round not using this weapon.",



  // S
	"Sad Life": "Enemies within 6” that wish to perform an Action must first make 1 Effort (if the target cannot make an Effort, it can ignore this rule).",
	"Safe Hands": "This model is immune to the Steal effect.",
	"Sapper": "Place a friendly Suspect in contact. That Suspect marker is treated as a small obstacle that provides Cover to a model that stay in contact with it.",
	"Savage Fighter": "This model gains +1 to its attack dice rolls and the Push effect when performing a melee attack until the end of the round.",
	"Scheming (X)": "During the Raise the Plan phase, if this model is in play and not KO, you can move up to X Suspect markers 4”, ignoring the minimum range between Suspect markers.",
	"Scientific": "This model may roll one additional die when performing a Willpower Skill roll and then then remove 1 of the dice rolled. When this model performs a Special action during its activation, it may perform an additional different Special action as an extra action.",
	"Scout": "This model may move before the first Take the Lead phase of the game, following the rules for Movement Actions (this does not affect the model’s normal activation).",
	"Sealed Cabin": "Only attacks listed on the Upgrade card can be made by this model, plus the Charge trait. In addition, this model (and any model transported in it) cannot perform Manipulate actions.",
	"Searcher": "While this model is in play and not KO, the opponent’s Resource points are reduced by -1.",
	"Security Chief": "If this model is within 4” of your crew’s Boss, enemy models suffer a -1 penalty to Attack rolls against that Boss.",
	"Self-Destruction": "Center the Explosive template over this model. This is resolved as an Explosive Ranged Attack, rolling a Strength 2+ die for each affected model – on a successful roll, the model receives 🩸★ Damage. Once this action is resolved, remove this model as a Casualty.",
	"Self-discipline": "This character cannot be controlled by an opponent (for example, by means of an ability that inflicts the Hypnotize effect).",
	"Sewer Swarm X": "After deployment, but before the game begins, place X Sewer Swarm models within 2” of this model. If, during this model's activation, you have less than X Sewer Swarms in play, you may make X Efforts to place X Sewer Swarm models within 2” of this model, then, the opponent gains X Pass markers. While a Sewer Swarm is within 8” of this model, it gains the Poison Master rule. In addition, if this model is hit by an enemy attack (close combat or ranged), you may make an Effort to nominate a friendly Sewer Swarm model within 4” and LoS to take the attack instead. Resolve any Damage and/or effects against the nominated model.",
	"Sewer Worker": "One use only. During this model’s activation, you can place a Sewer marker anywhere on the gaming area at least 2” from any other marker.",
	"Shapeshifting": "At the start of the Raise the Plan phase, if this model is not KO then it may exchange an Upgrade card with the name '(Animal) Form'. Place the new model in contact, then remove the original model.",
  "Shapeshifting Human Progress": "This model allows you to keep aside all the models that have in its Alias: Beast Boy – (X) without recruiting they. When a model uses the Shapeshifting trait to place this model in play, during this round this model may use the Vigilante’s Work trait to place or reveal a Suspect marker within 3'' and LoS instead of in contact.",
  "Sharpshooter": "Ranged Attacks made by this model ignore the Cover rule.",
	"Shockwave": "Enemy models within 4” of this model suffer the Slow 2 effect.",
	"Shooter": "When this model performs Ranged Attacks against targets within 8”, the target does not benefit from the Cover rule.",
	"Simple Mind": "This model cannot benefit from the Inspire rule.",
	"Slow Digestion": "After resolving a Devour attack that inflicts damage, remove the target from the gaming area. That model is 'Devoured'. A Devoured model may still be activated each round, but can only take an Endurance roll. If it is successful, place the Devoured model within 2” of this model and continue its activation. If the Endurance roll fails, the Devoured model suffers 🩸🩸 damage. This model can only remove one enemy from the game in this way at the same time. If this model becomes a Casualty, place any model it Devoured within 2” before removing this model. If a model is still Devoured when the game ends, it is considered a Casualty.",
	"Small": "This model gains +1 Defense against enemy Ranged Attacks.",
	"Smuggler": "When this model is recruited, its crew can buy Magazines and Radio equipment at half of the usual $ cost.",
	"Sneak Attack": "If, at the beginning of the attacker’s activation, the target could not see the attacker, the target model cannot make Efforts when defending against this model during that activation.",
	"Sneaking": "During the Recount phase, this model can move up to 2”, using the rules for Movement Actions.",
	"Soul Armor": "Remove up to 2 Damage markers (any type) from this model.",
	"Soul Voices": "If this model has an Audacity marker, but has not yet activated this round, you may remove the marker to gain two free Efforts when defending. In addition, this model may spend an additional action when attacking to gain two free Efforts.",
	"Speedster X": "This model can use Speed Force Powers, and has a maximum reserve of X Speed Force markers. A Speedster model gains +2” to its basic move distance. The model does not treat Difficult Ground and Climbing as Impaired Movement, although other effects that modify the terrain (i.e. Ice) must be taken into account. Enemy models cannot defend against this model’s Melee Attacks unless the target has the Speedster trait too.",
	"Speed Force Absorption": "This model can steal 1 Speed Force marker from another model with the Speedster trait at the end of the Drain Speed Force sub-phase. This marker may cause the model to exceed the normal maximum reserve of Speed Force markers.",
	"Speed Force Master": "This model can spend up to 2 Speed Power markers during its activation to gain up to 2 Attack Marker or Defense Marker.",
	"Stay in Formation": "One use only. During this model’s activation, choose another friendly model within 8”. That model may immediately move up to 6” directly towards this model.",
	"Stealth": "When this model is under the effect of the Night rule, it can only be seen by enemies within 8” instead of the usual range. It is still subject to rules that aid detection, such as Lights, Total Vision, etc.",
	"Steel Hands": "This model’s Unarmed Melee Attacks ★★★ inflict Damage with the Push effect.",
	"Stop!": "Target an enemy model within 8” and line of sight (not a Vehicle). Perform an opposed Willpower roll against that model. If successful, reduce the target model’s Defense skill by 1 (this trait is not cumulative if used multiple times on the same model). In addition, the target suffers the Slow 4 effect. Both effects last until the end of the round.",
	"Strategist": "While this model is in play and not KO, you gain +1 Resource point.",
	"Street Fighter": "When attacking or defending, this model can remove a friendly Suspect within 2” to gain 2 free Efforts.",
	"Street Guy": "When this model benefits from the Cover rule, it may force the attacker to reroll one successful hit.",
	"Stretching": "At the start of this model’s activation, you may change any number of its 🩸 Damage to ★ Damage markers. In addition, once per round, during its activation, this model can choose to increase its size or decrease it. Until its next activation, if the model increases its size it gains +1 to its Strength rolls, and its Unarmed Melee Attacks inflict ★★ damage, but the model reduces its Defense by -1. If the model decreases its size, it gains +1 to Defense and gains the Dodging rule, but suffers a -1 penalty to its Strength rolls.",
	"Stupid": "This model cannot perform Manipulate Actions, under any circumstances.",
	"Sturdy": "This model does not reduce its Effort Limit due to accumulated Damage.",
	"Subliminal Suggestion": "Choose a single model (friendly or enemy) with a Mental Disorder trait within 8” and line of sight. You may move the target model up to 4” (but cannot move it so that it Falls).",
	"Superior Sense of Smell": "This model doesn’t need an uninterrupted line of sight to see its target. Instead, anything within 10” can be seen by this model. In addition, this model is immune to the Blind effect.",
	"Super Jump": "Remove this model and immediately place it completely within 6”.",
	"Supernatural": "All attacks made by this model have the Magic rule.(Magic - If a weapon with this rule hits a model with the Invulnerability, Incorporeal and/or Tough Skin traits, that model loses those traits (if they possess them) until the end of the round)",
	"Surgical madness (Mental disorder)": "When this model uses the Medic trait, the target model removes 1 extra Damage marker (any type). In addition, roll 1D6. The target model gains the following trait until the end of its next activation: \n Result Trait \n 1 Weak \n 2 Stupid \n 3 Aggressive Schizophrenia \n 4 The Voices \n 5 OCD \n 6 Desensitized",
	"Survivor": "When this model is made a Casualty, do not remove it from play. Instead, roll a D6: on a result of 5+ the model removes 1 Injury marker 🩸 and remains in play. If the roll is failed, the model becomes a Casualty.",
	"Sustained Defense": "For every two successful defense rolls made by this model, cancel one extra enemy hit.",
	"Swarm": "This model cannot be recruited, but can only be brought into play by the Sewer Swarm X trait. This model gains +1 Defense skill vs enemy Ranged Attacks. This model cannot perform Manipulate Actions by any means. Swarms do not fulfill enemy Objective criteria for making models KO or removing them as Casualties. If this model is made KO, remove it as a Casualty.",
	"Swift": "This model can make 1 Effort to improve its basic move distance by +2” for the remainder of the round.",
  "Shady Dealings": "Discard two objective cards from your hand.",
  "Small Nightmare": "This model doesn't follows the Nightmare trait rules to come back to play while removed as a Casualty, instead they can be Set in play in contact with a friendly Suspect when a Fear card is returned to the Fear pile, they can only take an activation if they didn't take it before. In addition, this model gains +1 Defense against enemy Ranged Attacks.",
  "Seasonal Criminal": "At the end of every round, check the total Victory Points scored by all players. For every full 12 VP scored, Calendar Man gains one of the following benefits, advancing one step on the list for each 12 VP scored.<br><br><img src=\"https://veland55.github.io/btb/img/Seasonal_Criminal.png\" style=\"width:100%;max-width:420px;border-radius:12px;margin:20px 0;display:block;\">Example: The players total 24 VPs, so Calendar Man gains +2 Attack skill (12 x 2 = 24). At the end of the next round, the players have scored another VPs between them. The total is now 37- the wheel advances 3 spaces (it started at 2, and now it cycles all the way around to 1). Calendar Man loses the +2 Attack bonus, and gains +4 Movement instead. \n \n•12-23: +4 Movement \n•24-35: +2 Attacks \n•36-47: +2 Defense \n•48-59: Handyman \n•60-71: +4 Movement \n•72-83: +2 Attack \n•84-95:+2 Defense",
  "Snow Storm": "Center the Explosive template on this model. Roll a Strength 3+ die against all other models affected by the template with Damage. Any Suspects affected become Frozen.",
  "Stalker": "When activating a trait that targets an enemy model, this model may treat its position as that of a friendly Suspect within 8\".",
  "Showmanship!": "During this model's activation you may play a Resource without paying its cost if this model has 2 enemy models within 4\".",
  "Support (X)": "Target a friendly model with Alias: X within 8\" and LoS. Immediately perform an action with that model.",



  // T
	"Tachyon Device": "In the Drain Speed Force sub-phase, if there aren’t any Speed Force markers in the Speed Force pool, this model adds up to 2 Speed Force markers to its own reserve.",
	"Take Cover!": "Choose a friendly Henchmen within 4” of this model (but not the activated model itself). That model gains 2 Defense Marker.",
	"Takedown": "When this model makes another model KO with an Attack, it may immediately make an Effort to make the target a Casualty.",
	"Taunt": "Choose one enemy model (not a Vehicle) within 8” and line of sight. Perform an opposed Willpower roll against that model. If it successful, then for the rest of the round increase the target’s Attacks skill by +1, but reduce its Defense skill by -2.",
	"Teamwork X (All)": "This model may roll (X) additional dice when performing Melee Attacks during its activation and when Defending while the (named/keyword) model is within 4\".",
  "Teamwork X (Model)": "This model may roll (X) additional dice when performing Melee Attacks during its activation and when Defending while the (named/keyword) model is within 4\".",
	"Technique": "Once this trait is activated, for the rest of the round when this model damages a non-vehicle enemy with a Melee Attack Action, the damaged model suffers the Paralyze effect too.",
	"Teen Titans": "Keyword",
  "Teen Titans Founder": "This model can be recruited in a Teen Titans Team, ignoring ‘The Sidekick’ trait. When operating as part of a Teen Titans crew, this model gains +1 Willpower, +1 Strength and the Reinforced Gloves trait.",
	"Telekinesis": "At the start of each of this model’s activations, choose one of the following effects until the end of the round: \n• This model’s weapons can still be used at full RoF if it moves. \n• This model’s Unarmed Melee Attacks inflict ★★★ and its Strength roll always succeeds on a 3+, ignoring any other rule (but it cannot benefit from the Mixed Combat Style trait).",
	"Tension": "This model gains +1 to its Attacks and Defense values while it has at least one 🩸 Damage marker on its Character Card.",
	"The Boss": "If this model is the crew’s Boss, friendly Henchmen gain the Expendable trait.(Expendable - When this model is removed from the game as a Casualty, you may draw an Objective card.)",
  "The Crew": "All friendly models with this model's Affiliation within 8\" and in LoS with this model gain Marker.",
  "The Dark Knight Returns": "Keyword.",
	"The Devil You Know": "When this model casts a Spell, it may apply any Failure result to a friendly model instead of itself.",
	"The Dynamic Duo": "This model can activate immediately after a friendly Robin (Boy Wonder) model within 8”, interrupting the usual sequence of play.",
	"The Fear Master": "When this model uses the Inspire Fear trait, it can choose to have it affect all non-vehicle models within 4” and line of sight (friendly and enemy). When using this ability, Inspire Fear also inflicts the Terror 2 effect, Slow 4 instead of 2, and gains the Gas weapon special rule.",
	"The Holiday Killer": "When this model attacks a target with a Reputation cost higher than 50, it may reroll attack dice and Strength die rolls.",
	"The Hunter": "Once per round, when an enemy model ends a movement action, you can immediately move this model 4” (unless it is in contact with an enemy model).",
	"The Murderer": "This model can only score Objective cards during its activation for inflicting Damage, making enemy models KO, or removing them as a Casualty.",
	"The Professional": "Each time this model removes an enemy Leader, Sidekick and/or Free Agent as a Casualty, gain 1 Resource point.",
	"The Sidekick": "This model can only be hired if Batman (Modern Age) is leading the crew. While a friendly model with Alias: Batman is in play, this model gains +1 to its Strength die rolls. If a friendly model with Alias: Batman is removed as a Casualty, this model suffers -1 Willpower for the rest of the game.",
	"The Song of the Sirens": "Friendly models can use their Bodyguard rule on any model in the crew with the Gotham City Siren trait until the end of the game.",
	"The Target of the Bat": "If a model with Name: Bruce Wayne KO’s this model, the Bruce Wayne model’s controlling player may pick an Objective card from its Spent Resource pile and add it to their hand.",
	"The Time has Come": "One use per game. During this activation, this model’s Unarmed Melee Attacks inflict Damage ★★.",
	"The Untouchable": "If this model is your crew’s Boss, friendly Henchmen using the Bodyguard trait to take a hit on its behalf do not need to make an Effort to do so. In addition, while this model is the Boss, all friendly Henchmen gain the For the Family trait for the duration of the game.",
	"The Voices (Mental Disorder)": "This model’s Tactical Action is a ‘wildcard’, which may be spent as another type of Action if you wish (this means the model can perform the same Action twice in its activation if it has sufficient \n Actions to spend).",
	"The Wizard": "This model does not spend a Special Action when using the Good Aim special rule. In addition, once per game, at the start of the Raise the Plan phase, you may move this model up to 4”.",
	"The World’s Greatest Detective": "At the end of the Raise the Plan phase, you may choose one enemy model on the board (not a Vehicle). LoS is not required. The target model must immediately perform a Willpower roll. If it fails, you may force the opponent to activate the target model first.",
	"They’re Cheap": "One use only. At the end of the Raise the Plan phase, you may activate this trait. For the remainder of the round, ranged attacks performed by friendly models spend no Ammo.",
	"Thirty days has…": "Depending on the month the game starts Calendar Man gains the specific trait for that month: January-Demotivate, February-Confusion, March-Luck, April-Trickster, May-Disarray, June-Demoralize, July-Veteran, August-Intimidate, September-Cruel, October-Undead, November-Unpredictable, December-Survivor.",
	"Thief": "Once this trait is activated, for the rest of the round this model’s Melee Attacks gain Steal.",
	"This... is... Awesome-Sauce!": "Target a friendly model within 4” and line of sight. The target model gains an Audacity marker, and adds +1 to its Strength die rolls until the end of the round.",
	"Timely arrival": "This model is not deployed as normal at the start of the game. Instead, at the start of the Raise the Plan phase of the second round, you may place this model anywhere on the gaming area, no closer than 4” to any enemy model.",
	"Time Bomb": "Target a Suspect within 8” and LoS. Place a numeric counter with a value of 3 on this model’s character card. When a model performs a Manipulate action within 8” of this model, reduce the value of the counter by -1. If the chosen Suspect is still in play when the counter reaches 0, place an Explosive template on top of it – all models affected suffer 1  and the Slow 4 effect.",
	"Time Control": "When this model places a Suspect, you may nominate 1 enemy model. If that model is not the next enemy model to be activated, and it places a Suspect during its activation, you may search your deck for one of your Objective cards and add it to your hand. Shuffle your deck.",
	"Time Manipulation": "When this model reveals an enemy Suspect, you may look at the top two cards of any player’s Objective deck. Then, place one of those cards on top of the deck, and one on the bottom.",
	"Time Stretch": "One use only. This model may target a friendly model within 4” and line of sight. The target Model gains the Living Legend trait until the end of the round.",
	"Tireless": "This model can spend a Special Action (as well as Its Movement Action) to gain +2” to its basic move distance.",
	"Titan Dose (DOSE)": "A model may use a Titan Dose during its activation. If it does so, the model gains +1 to all of its basic skills until the end of the round. The same model cannot use more than one Titan Dose in the game.",
	"To Prove a Point": "Enemy models within 6\" and LoS suffer -2 to their Willpower value while making a Willpower roll. In addition, as an extra Action, this model can target an enemy model (not a Vehicle) within 8\"\nand\nline of sight. For the rest of the round, the target cannot perform Special Actions unless it Efforts 2 ★ and to Effort during a Willpower roll must take\n2★ instead of 1.",
	"Total Vision": "During its activation, this model may see at any distance, and its line of sight can cross any obstacle or scenery element. It may not, however, shoot through these elements, unless using a weapon with a special rule that permits it (such as Remote Control).",
	"Tough Skin": "Strength die rolls against this model suffer a -1 penalty and can be defended against just like an attack dice.",
	"Toxicologist": "Before performing an Attack, this model can exchange the Poison effect with one of the following effects during that Attack: \n• Enervating 2. \n• Scared. \n In addition, models suffering damage from the Poison effect within 8” of this model suffer 1 additional 🩸.",
	"Tracking": "At the start of the Recount phase, this model can move up to 1D6''.",
	"Transport X": "X friendly models (not a Vehicle) in contact with this model during its activation can perform a Manipulate action to be removed from the game – the friendly model is not a Casualty, but is now effectively transported inside this model as a ‘passenger’ – attach this model’s Upgrade card to the passenger. Any effects affecting a passenger trigger as normal at the end of the round. The passenger must be activated as normal during each round, but the range of its traits and attacks are measured from this model’s base (unless the Vehicle has the Sealed Cabin trait). The passenger cannot be affected by any attack. During any subsequent round, the passenger can disembark the Vehicle by performing a Manipulate action – place it in contact with this model, and disable the Upgrade card, then continue its activation as normal.",
	"Treacherous": "This model cannot be the Boss of your crew.",
	"Trickster": "If this model does not have an Audacity marker when it is activated, it may take one from another friendly model that is yet to activate this round.",
	"True Love": "If the model named as the True Love (in parentheses) is in the same crew, and is removed as a Casualty, this model gains +1 Willpower and +1 Attack until the end of the game.",
	"Truly Immortal": "This model cannot become KO or be removed as Casualty from the game by any means. Instead, remove one Damage marker, then the opponent relocates this model, placing it within 4''.",
	"Truth-Seeker": "When a model within 10” of this model becomes KO or is removed as a Casualty, you may first place a friendly Suspect marker in contact with it (ignoring the normal minimum distance between Suspect markers). This model may remove 1 friendly Suspect marker within 4” during its activation to perform an extra move of up to 4”. In addition, when a friendly model within 4” of a friendly Suspect marker scores an Objective card, you may remove that marker to draw an additional Objective card. ",
  "True Fear": "When scoring any number of successful hits during an Attack, add 1 Fear card to your Objective deck.",
  "Tangible Fear": "Any time a model within 4'' of this model receives a hit, or fails a Willpower roll, you may discard 1 card from the top of the friendly objective deck (not cumulative). \n In addition, while this model attacks, the target's Defense is reduced by 1 if its Willpower is less than 6. \n While this model is attacked, the Attack value of the attacking model is reduced by 1 if its Willpower is less than 6.\n In addition, this model cannot remove damage caused by other model's effects unless specified.",
  "Tough Guy": "This model counts as two models for scoring friendly Objective cards.",
  "Team Arrow": "Keyword.",
  "Team Flash": "Keyword.",
  "True Psychopath": "When an model within 8\" is removed as a Casualty, you may place 2 on top of the Psychopaths Objective card instead of 1.",
  "Truly Immortal": "This model cannot become KO or be removed as Casualty from the game by any means. Instead, remove one Damage marker, then the opponent relocates this model, placing it within 4\".",
  "Three Jokers": "When you recruit this model you must also recruit any other models that share this trait. Models with this trait treat their rank as Leader in game.\nIn addition, this model can take Audacity with the Trickster trait from a friendly model with this trait that is already activated this round, counting as taking Audacity from a non-activated model.",
  "The One and Only Joker": "At the start of this model's activation, if there are no enemy models within 4\" you may search your Objective deck for an Objective card named Let Them In On The Joke. Reveal it and add it to your hand. Shuffle your Objective deck.",




   //U
	"Undead": "This model is immune to all effects and CRT, except Knock Down and Smoke.",
	"Undercover": "This model may be deployed up to 8” away from its deployment area.",
	"Underworld King": "When a friendly model within 8” scores an Objective card during its activation, you may place a +1 Number counter near your Objective deck (starting with 1, and adding a value of 1 each time). Each time your opponent scores an Objective card during an enemy model’s activation, reduce the value of the Number counter by -1. At the end of the game, the current value of the Number counter is the amount of extra VP that you score. Unnatural Flight: During the round in which this model return to the game zone, due to the Flying High Trait, its BMD becomes 0, and cannot use the Fly Trait.",
	"Unstoppable": "Each successful hit scored by this model this round requires 2 successful defense rolls to block.",
	"Unstoppable Monster": "At the start of this model’s activation, it must move 2” in a straight line as an extra Action. Enemy models within 4” of this model cannot perform the Manipulate Action.",
	"Unpredictable": "This model’s Special Action is a ‘wildcard’, which may be spent as another type of Action if you wish (this means the model can perform the same Action twice in its activation if it has sufficient Actions to spend).",
  "Unmask the Truth": "When this model Reveals an enemy Suspect, enemy models with the Intel Support trait receive an additional Disruption token.",

  //Y
  "You're Fun": "During the first Raise the Plan phase of the game, target an enemy model. When an Objective card is scored during the activation of the target, this model gains a Free Manipulate action until the end of the round.",


  // V
	"Vanish": "Perform an extra Attack action with this model’s EM Smoke Grenades (not affected by Rapid Fire), inflicting a single automatic hit. For the duration of this attack, the EM Smoke Grenades gain the Light special rule. If this model has not moved during its activation and is beneath the template when it makes this attack, this model may be placed anywhere within 4” of its current position. This model cannot move (or use the Grapple Gun/Batclaw Trait) for the remainder of its activation. This model ignores the effects and Damage caused by its own EM Smoke Grenades (like the Smoke effect). This use of this trait requires a magazine as usual but does not count as the model’s Attack Action.",
	"Venom Dose (DOSE)": "A model may use a Venom Dose during its activation. If it does so, for the rest of the round the model gains +1 to its Strength die rolls and may make 2 free Efforts when performing a Melee Attack.",
	"Venom Enrage": "When this model uses the Venom Dose trait it gains Invulnerability (2) for that round.",
	"Vertigo Dose (DOSE)": "A model may use a Vertigo Dose during its activation. If it does so, for the rest of the round the model gains +1 Willpower and can reroll failed Willpower rolls.",
	"Veteran": "When one of your Objective cards requires the possession of a named trait to complete it, this model counts as having that trait (it can’t actually use the trait, but it is able to fulfill the Objectives).",
	"Vocational": "This model may be included in a crew as if it had the affiliation, as long as all members of the crew have the Cop trait.",
	"Void Priest": "One use only. This model may spend 2 Faith Points. Enemy models within 2” suffer the Slow 2 effect.",
	"Volunteer": "This model cannot be removed from play due to the Suicide Mission rule. The Boss of a Suicide Squad Team automatically gains this trait.",
	"Vulnerability to Fire": "When this model suffers Damage by the Fire Status, inflicts to it 1 🩸 Damage additionally.",
  "Vengeance": "At the start of the game, target an enemy model that cannot have the Rank: Henchman (unless no other option is available). Convert all the ★ damage this model inflicts to it to 🩸. In addition, scored Dirty Job Objective cards provide 2 VP each (instead of 1) even if this model is not in the Gaming Area.",

  // W
	"War Goes On": "If you purchase this upgrade, then before deployment you may equip it, or another upgrade available to this model, for free. Discard the unused Upgrade.",
	"Weak": "This model’s Effort Limit begins at 2 Instead of 3.",
	"Weakness to Cold": "If this model receives the Cooled or Freeze effect, they also receive a 🩸 marker.",
	"Weapon Master": "This model gains a +1 bonus to attack dice rolls when performing Melee Attacks, as long as it is not Unarmed.",
	"Welcome to Hell": "If this crew contains only models with The Dark Knight Returns and Cop traits, all your models with The Dark Knight Returns keyword may take 🩸 instead of ★ when making an Effort.",
	"Wheelchair": "Friendly models in contact with this model can take a Manipulate Action to move it up to 3” directly away. Then, the model that took the action is placed in contact with this model.",
	"Wizard of Quiz": "When this model places a Suspect within 8” of an enemy model, if that enemy model can see this model and the Suspect, you may look at the top 2 cards in that model’s controller’s Objective deck. Discard one of the cards and place the other one on top of the deck.",
	"360° Strike": "When this model performs a Melee Attack this round, it must be performed against all the models available to be a target (friendly and enemy). During this attack, no one model can make Efforts. Roll only once, and compare with all the targets results. Friendly models cannot make defense rolls against these attacks, but they cannot be the only models affected by it (there must be at least one enemy to target).",

   //WEAPON
  "Accurate": "An attack made by this weapon gains +1 to its attack dice rolls.",
	"Acid": "When this weapon damages a target, that model reduces its Attacks and Defense skills by -1 until the end of the round (this effect does not stack if the weapon or another weapon with the same rule damages the target several times). In addition, these weapons ignore the Light Armor trait.",
	"Aim": "A model cannot move in the same activation that it uses this weapon.",
	"Anti-Tank": "This weapon ignores the penalty of Light, Medium and Heavy Armor traits, and may re-roll failed Strength die rolls against models with those traits. Furthermore, Anti-Tank weapons ignore the Bulletproof Vest, Hardened and Kevlar Vest traits.",
	"Assault": "When using this weapon, this model can choose to ignore the penalty for move before attacking, but instead suffer a -1 penalty to its Ranged attack dice rolls.",
	"Beam": "The Strength die when using this weapon always hits on a result of 2+. Ignore the wielder’s Strength for the Damage roll. In addition, ignore the target’s Cover. Beam weapons cannot receive an Ammo Magazine from an Ammo Crate.",
	"Bleed (X)": "Instead of inflicting normal Critical effect, the target suffers X 🩸 Damage upon a Critical Hit.",
	"Blunt (X)": "Instead of inflicting normal Critical effect, the target suffers X ★ Damage upon a Critical Hit.",
	"Cold": "When this weapon hits, the target model suffers the Slow 2 effect.",
	"Caustic": "Even when this weapon’s Strength die fails, the target takes 🩸 Damage.",
	"Crushing": "Each successful hit scored with this weapon requires 2 successful defense rolls to block.",
	"Defensive": "A model carrying this weapon can reroll failed Defense rolls. This is a passive ability, and may be used even if the model used a different weapon during its activation.",
	"Devastating": "Attacks with this weapon roll two Strength dice. You must apply both results.",
	"Electric": "This weapon has CRT: Stunned, and can reroll failed Strength die rolls against targets with the Bot, Cybernetic or Robot traits.",
	"Expansive": "Instead of having a Rate of Fire, this weapon uses the Spray Template to determine how many models are hit (see Templates, below).",
	"Explosive": "Place the Explosion Template over the impact point (usually the target model). See Templates, below.",
	"Firearm": "The Strength die when using this weapon always hits on a result of 2+. Ignore the wielder’s Strength for the Damage roll.",
	"Gas": "This weapon ignores the penalty of Light, Medium and Heavy Armor traits.",
	"Grenade": "These weapons use their own special rules. See Grenades, later.",
	"Handy": "When using this weapon, the wielder may reroll failed attack dice rolls.",
	"Heavy": "When using this weapon, the attacker gains a +1 to its Strength die rolls.",
	"Imprecise": "This weapon suffers a -1 penalty to attack dice rolls.",
	"Kryptonite": "If a weapon with this rule hits a model with the Kryptonian trait, the Kryptonian model loses the Invulnerability and Regeneration traits (if they possess them) until the end of the round.",
	"Light": "A model can fire this weapon even when it is in contact with an enemy model.",
	"Magic": "If a weapon with this rule hits a model with the Invulnerability, Incorporeal and/or Tough Skin traits, that model loses those traits (if they possess them) until the end of the round.",
	"Mechanical": "The Strength die when using this weapon always hits on a result of 3+. Ignore the wielder’s Strength for the Damage roll.",
	"Medium Range": "The effective range of this weapon is 16”.",
  "M. Range": "The effective range of this weapon is 16”.",
	"One Use": "This weapon can only be used once per game.",
	"Overwhelming": "The target of an attack made by this weapon suffers -1 to its Defense rolls.",
	"Protective": "These weapons award a +1 to the wielder’s defense dice rolls. Furthermore, the wielder benefits from the Cover rule at all times. This is a passive ability, and may be used even if the model used a different weapon during its activation. If the model also benefits from the Cover rule by other means, then the bonus is doubled. Once per round a friendly model in contact can benefit from this rule too.",
	"Reach": "These weapons do not require the wielder to be in contact with an enemy model in order to perform a Melee Attack against it. Instead, the wielder may strike a model up to 1” away and in LoS.",
	"Red Dot": "Weapons with this special rule can reroll up to 1 failed attack die roll when performing a Ranged Attack.",
	"Reload": "Weapons with this special rule cannot be used in two consecutive rounds. In order to reload the weapon, the wielder must spend at least one round in which it does not declare any Ranged Attacks with this weapon. If the model has more than one weapon that requires reloading, it may only reload one per round spent reloading – declare which weapon is being reloaded during the activation. These weapons cannot be reloaded while a model is KO.",
	"Remote Controlled": "When using these weapons, the model needs to be able to see the target as usual, but does not need to draw a straight uninterrupted line to it. Instead, measure range from the attacker’s base to the target, carefully measuring around obstacles. The weapon’s maximum range cannot be exceeded in order to reach the target. Targets of Remote Controlled weapons cannot benefit from Cover against these attacks.",
	"Scope": "While performing a Ranged Attack with this weapon, the firer can see at any distance, limited only by LoS. Targets cannot benefit from Cover against attacks with this weapon.",
	"Sharp": "When using these weapons, the wielder may reroll failed Strength die rolls.",
	"Short Range": "The effective range of this weapon is 8”.",
  "S. Range": "The effective range of this weapon is 8”.",
	"Silencer": "The target of an attack made by this weapon cannot use the Dodging rule against it.",
	"Sonic": "When this weapon hits, the target model suffers -1 to its Special skill until the end of the round.",
	"Throwing": "This ranged weapon don’t lose dice for moving before attacking.",

   //EFFECTS
	"Blind (X)": "Status. A model suffering from Blind cannot trace Line of Sight, and cannot perform Ranged Attacks. All of the model’s attack, Strength and defense dice rolls will only succeed on a natural result of 6. In addition, the model cannot use its Movement value to increase its basic move distance. This effect lasts until the end of the round.",
	"Blind": "Status. A model suffering from Blind cannot trace Line of Sight, and cannot perform Ranged Attacks. All of the model’s attack, Strength and defense dice rolls will only succeed on a natural result of 6. In addition, the model cannot use its Movement value to increase its basic move distance. This effect lasts until the end of the round.",
	"Casualty": "If this effect is triggered (as part of a Critical effect for example), then the target model is removed from play as though it had received its maximum allocation of 🩸 counters.",
	"Cooled": "Place a Cooled marker on the character card of the affected model. A cooled model reduces its Defense skill by -1, and cannot make Efforts. Affected Speedsters cannot use Speed Force Powers. This effect lasts until the end of the round.",
	"Enervating (X)": "Status. When the model affected is going to perform an action/using a trait/being targeted by an attack, before that, the opponent may choose to reduce the Effort Limit of the target by -(X) during that time frame. Then remove this Status.",
	"Enervating": "Status. When the model affected is going to perform an action/using a trait/being targeted by an attack, before that, the opponent may choose to reduce the Effort Limit of the target by -(X) during that time frame. Then remove this Status.",
	"Fire": "Status. When a model is affected by the Fire Status, it gains the Fire Status. All friendly models affected by the Fire Status suffer when you score an Objective card with the Burn keyword in its Resource or use the Burn keyword as a Resource. When another friendly model Sets a Suspect in contact with a model affected by the Fire Status, you may remove the Fire Status.",
	"Freeze": "Status. Place a Freeze marker on the character card of the affected model. The model reduces its Defense skill by -1, and cannot perform Actions. At the beginning of the model's activation, it must pass an Endurance roll to remove the Freeze Status. Speedsters cannot use Speed Force Powers If they are affected by the Freeze Status.",
	"Hypnotize": "Status. Any non-vehicle model affected by Hypnotize must make a Willpower roll immediately. If it fails, it immediately performs up to 2 different actions under the control of the player who hypnotized it counting as one of that player's crew in all respects. While performing these actions, you may perform up to 2 Free Efforts (you cannot make another Efforts) and you do not expend Ammunition.\nCounts as if you are performing an activation for traits and performing actions. Models that are Hypnotized cannot be moved so they would Fall or otherwise take Damage.\nNb: If you move and shoot per example, you lose attack dice as usual, you cannot repeat actions, but you are affected by active traits (special actions) that remains active for the activation of the model (like Inspire, Sewer Worker...). That model may be activated by its owner later, because is not an activation.",
	"Knocked Down": "Status. Place a Knocked Down marker on the Character Card of the affected model. A Knocked Down model cannot attack, or defend itself. It cannot make Efforts, and cannot use any trait that requires an Action or Effort to activate until it Stands Up. A Knocked Down model suffers -1 to its Defense value.",
	"Paralyze": "Status. A paralyzed model reduces its Defense skill by -2, and cannot perform Actions until the end of the round.",
	"Push": "The affected model is moved directly away from the attacker up to X”.",
	"Poison (X)": "Status. If a non-vehicle model is affected by Poison, place a Poison marker on its character card. A model affected a subsequent time by the Poison effect increases its Poison value by 1 (up to a maximum of 4). During the Recount phase, the poisoned model must make an Endurance roll, with a -X penalty to its Endurance value for the roll (where X is the current Poison value). If the roll fails, the model suffers 1 🩸 Damage if its Poison value is 1-3, or 🩸🩸 if it has a Poison value of 4.",
  "Poison": "Status. If a non-vehicle model is affected by Poison, place a Poison marker on its character card. A model affected a subsequent time by the Poison effect increases its Poison value by 1 (up to a maximum of 4). During the Recount phase, the poisoned model must make an Endurance roll, with a -X penalty to its Endurance value for the roll (where X is the current Poison value). If the roll fails, the model suffers 1 🩸 Damage if its Poison value is 1-3, or 🩸🩸 if it has a Poison value of 4.",
  "Scared": "Status. The affected non-vehicle model cannot use the Dodging rule, and suffers -1 to its attack and defense dice rolls. This Status lasts until the end of the round.",
	"Slow (X)": "Status. A model suffering this effect reduces by its basic movement distance by X” during its next Movement action.",
	"Slow": "Status. A model suffering this effect reduces by its basic movement distance by X” during its next Movement action.",
  "Smoke": "Place a Smoke event marker centered at the target point (or as close as possible). Models cannot draw LoS if it pass within 2'' of the Smoke marker. Models while within 2'' of a Smoke marker, suffer the Blind Status. The Smoke marker is removed at the end of the Recovery phase. Weapons with the Smoke rule cannot be canceled.",
  "Steal": "If you successfully hit a model with a weapon with this rule, the opponent must show you their Objective card hand. Choose one of those cards - the opponent must Discard it.",
	"Stunned": "Status. A Stunned model can only perform Movement actions until the end of the round.",
	"Terror (X)": "Status. When an enemy model suffers the Terror Status, you draw 1 Objective card from the top of your opponent's Objective deck and place it facedown in your Terror pile. When an enemy model would make an Attack dice roll, Defense dice roll, or a Willpower roll during its activation, after the action is resolved, the opponent may reveal up to 3 cards from your Terror pile. Apply the Poison Status a number of times equal to the number of cards revealed. If the model already have or reaches Poison (4), it immediately takes a Poison test. After applying the Status, put the cards at the bottom of the original owner's deck. If you can not draw, the enemy model instead suffers ★★.",
	"Terror": "Status. When an enemy model suffers the Terror Status, you draw 1 Objective card from the top of your opponent's Objective deck and place it facedown in your Terror pile. When an enemy model would make an Attack dice roll, Defense dice roll, or a Willpower roll during its activation, after the action is resolved, the opponent may reveal up to 3 cards from your Terror pile. Apply the Poison Status a number of times equal to the number of cards revealed. If the model already have or reaches Poison (4), it immediately takes a Poison test. After applying the Status, put the cards at the bottom of the original owner's deck. If you can not draw, the enemy model instead suffers ★★.",
	"Toxic (X)": "With at least 1 Successful hit, the target receives a number of 🩸 Damage markers equal to (X).",
  "Toxic": "With at least 1 Successful hit, the target receives a number of 🩸 Damage markers equal to (X)."
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