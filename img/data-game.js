// ==================================================================
// BMG — КАРТЫ УСЛОВИЙ ИГРЫ (раздел ИГРА)
// ==================================================================

const GAME_EVENTS = [
  {
    name: "Labyrinthine Sewer",
    text: "Models that use a Sewer suffer the Enervating (1) Status.",
    flavor: "The water runs to any one of the outflows. We'll never find him."
  },
  {
    name: "Heavy Rain",
    text: "At the start of each Round, the player with Initiative must roll a D6. On a result of 4+, all Ranged Attacks (for all models) roll 1 less die until the end of the Round.",
    flavor: "After the rain comes death."
  },
  {
    name: "Gotham in Flames",
    text: "At the start of the first Execute the Plan phase, place an Event marker on the center point of the gaming area. At the start of each subsequent Execute the Plan phase, the player without Initiative chooses a direction and moves the marker 2D6\" in that direction. Any model that ends its activation within 4\" of the marker suffers the Fire (1) Status. In addition, all models within 4\" of the marker are Illuminated.",
    flavor: "Tonight this stinking city will be purified by flames."
  },
  {
    name: "In the Spotlight",
    text: "At the end of each Raise the Plan phase, beginning with the player with Initiative, each player chooses a different Streetlamp marker. Choose a direction, then move the chosen marker 1D6\" in that direction.",
    flavor: "Don't be shy! There's room up here on stage for two!"
  },
  {
    name: "Exposed",
    text: "At the start of each Raise the Plan phase each player chooses an enemy model, that model cannot be the first model its owner activates this round.",
    flavor: "You just ran out of time."
  },
  {
    name: "Delayed",
    text: "Before deployment each player must choose one of their models. That model is not deployed as normal, instead at the start of the Raise the Plan phase of round 2, you may place the chosen model anywhere in your DZ.",
    flavor: "A weary body can be dealt with, but a weary spirit... that's something else."
  },
  {
    name: "Data Extraction",
    text: "At the end of the first Raise the Plan phase, the player without Initiative places an Event marker at least 8\" away from their DZ. At the end of the Recount phase, if a player has any models in contact with this marker, they may search their Objective deck for a card.\nIf only 1 player uses this rule, the other player chooses a direction and moves the Event marker 1D6\" in that direction.",
    flavor: "We need that data!"
  },
  {
    name: "Full Moon",
    text: "At the start of each Round, the player with Initiative must roll a D6. On a result of 4+, Firing Blind only reduces RoF by 1.",
    flavor: "Don't you feel a little tired?"
  },
  {
    name: "Exhausted",
    text: "The first Strength die rolled for each player in each Round becomes an Attack die instead.",
    flavor: "I don't feel so good."
  },
  {
    name: "The Rat",
    text: "At the end of the first Raise the Plan phase, each player must choose one of their Henchmen. That Henchman is the Rat. At the end of each Rat's activation, if able, the active Rat must Set a friendly Suspect, as a Free Action, in contact.",
    flavor: "Tell me everything!"
  },
  {
    name: "Low Fog",
    text: "At the start of each Round, the player with Initiative must roll a D6. On a result of 4+, Night rule is 8\" instead of 12\" until the end of the Round.",
    flavor: "I can see it."
  },
  {
    name: "Heatwave",
    text: "All models that make 3 Efforts in one instance must take an additional {STUN_ICON}.",
    flavor: "2 hot 4 U."
  },
  {
    name: "Power Outage",
    text: "At the end of each Raise the Plan phase, beginning with the player with Initiative, each player chooses a different Streetlamp marker. That Streetlamp doesn't provide Light this round.",
    flavor: "Full of darkness."
  },
  {
    name: "Earthquake",
    text: "At the end of each Raise the Plan phase, the player without the Initiative places an Explosive template (not in contact with any model) anywhere in the Gaming Area. Any model that moves over the template this round suffers Impaired Movement.",
    flavor: "A small obstacle in the way."
  },
  {
    name: "Suspect Escapes",
    text: "At the end of Recount, beginning with the player with Initiative, each player may move an enemy Suspect 4\".",
    flavor: "Just move it."
  },
  {
    name: "Old Sewage System",
    text: "Models without the Amphibious trait immediately end their activation after using a Sewer.",
    flavor: "They came from beneath the sewers."
  }
];

const GAME_ENCOUNTERS = [
  {
    name: "Showdown",
    text: "The first group to be deployed must only contain {RANK_LEADER_ICON}, {RANK_SIDEKICK_ICON} or {RANK_FREEAGENT_ICON}.",
    flavor: "This is the only way it could end.",
    dz: "DZ: 8\" strips along two opposite table edges."
  },
  {
    name: "Chance Encounter",
    text: "The first group must be deployed into the A zone, and the second group must be deployed into the B zone (special Traits that modify Deployment still apply).",
    flavor: "There could be no compromises.",
    dz: "DZ: two 4\" bands at each edge — zone A is the outer 4\", zone B is the inner 4\"."
  },
  {
    name: "Vanguard",
    text: "Deploy one friendly model up to 4\" outside the DZ.",
    flavor: "Just 'cause you can't see him doesn't mean he can't see you!",
    dz: "DZ: 12\" corner zones in opposite corners."
  },
  {
    name: "Secure the Area",
    text: "Choose one friendly {RANK_HENCHMAN_ICON}. That model is not deployed normally. Instead, before rolling for Initiative in any Round, you may place the model in contact with a friendly Suspect.",
    flavor: "They won't see me coming.",
    dz: "DZ: 8\" corner zones in opposite corners."
  },
  {
    name: "Plunder",
    text: "Before deploying models, but after choosing DZ(s), each player must Set 2 Suspect markers at least 8\" away from their DZ(s), and at least 8\" away from each other.",
    flavor: "Everybody wants something...",
    dz: "DZ: zone A — 6\" zones in the top corners, zone B — 12\" zones at the bottom edge."
  },
  {
    name: "Duel",
    text: "Set an Event marker on the map as shown. Only the {RANK_LEADER_ICON} can be deployed within 4\" of that marker. When the Deployment is finished, remove this Event marker.",
    flavor: "The town isn't big enough for two homicidal maniacs.",
    dz: "DZ: 12\" corner zones in opposite corners, an Event marker at the inner edge of each zone."
  },
  {
    name: "Stand-Off",
    text: "During the first Round, the Damage inflicted is ignored by the models (but is yet inflicted for the Objective cards requirements).",
    flavor: "One false move, and it's game over.",
    dz: "DZ: two adjacent vertical 8\" bands (A and B) across the middle of the table."
  },
  {
    name: "Taking Sides",
    text: "Place the 10\" and the 8\" measure sticks as shown in the map. For the rest of the game, those measure sticks are an impassable element. No model may Move, Place, draw LoS, or affect another model through it.",
    flavor: "This is different. They crossed the line.",
    dz: "DZ: zone A — 4\" band, zone B — beyond the measure sticks placed 18\" from the edge."
  },
  {
    name: "Ambush",
    text: "Players do not divide their crew into groups and deploy all of their models at once.",
    flavor: "It is time to trigger the trap.",
    dz: "DZ: zone A — central 10\" column, zone B — 6\" bands along the side edges (13\" from A)."
  },
  {
    name: "Hidden Evidences",
    text: "When all the players deployed all the models, starting with the player with the Initiative, each player must Set 2 friendly Suspects within 8\" of an enemy model. That Suspects are also Hidden Evidences. When a model reveals a Hidden Evidences it can discard 1 Objective card from its hand.",
    flavor: "We must unmask the truth at any cost.",
    dz: "DZ: 8\" strip on one edge, 10\" strip on the opposite edge."
  },
  {
    name: "King of the Hill",
    text: "Set an Event marker in the centre of the gaming area. The model(s) within 4\" of this marker cannot benefit from the Cover or Night rule. At the end of the Recount phase the player with the model closest to the marker may remove 2 Damage or a Status from it.",
    flavor: "Only the strongest survives.",
    dz: "DZ: 10\" strips along two opposite table edges."
  },
  {
    name: "News Flies",
    text: "After models are deployed, beginning with the player with Initiative, each player Sets a Suspect within 8\" of the center of the Gaming Area.",
    flavor: "There is nothing that can be hidden forever...",
    dz: "DZ: zone A — 6\" band in the top-left, zone B — 24\" band at the bottom-right."
  },
  {
    name: "Crossfire",
    text: "Each player must deploy at least 1 model in each of their DZ(s).",
    flavor: "Trapped in the middle of a gunfight.",
    dz: "DZ: two zones per player in opposite corners (6\" and 10\")."
  },
  {
    name: "Fight for Territory",
    text: "After models are deployed, beginning with the player with Initiative, each player may Move a friendly model 4\".",
    flavor: "The fight of our lifes.",
    dz: "DZ: zone A — two 8\" corner zones at the top, zone B — 16\"×10\" zone at the bottom (8\" from the edge)."
  },
  {
    name: "Divide and Conquer",
    text: "If your Crew has a {RANK_LEADER_ICON} and a {RANK_SIDEKICK_ICON}, they must be deployed in separate DZ.",
    flavor: "Cut their forces in half.",
    dz: "DZ: zone A — 12\" and 8\" zones at the top, zone B — 12\" and 8\" zones at the bottom."
  },
  {
    name: "Fountains",
    text: "{RANK_LEADER_ICON} and {RANK_FREEAGENT_ICON} must deploy within 4\" from the edge of the Gaming Area (still within the DZ).",
    flavor: "Find the perfect position.",
    dz: "DZ: zone A — 16\"×12\" at the top, zone B — 16\"×12\" at the bottom."
  }
];

window.GAME_EVENTS = GAME_EVENTS;
window.GAME_ENCOUNTERS = GAME_ENCOUNTERS;
