import { Spell } from '@/types';

// Sample spells - replace with actual spell data
export const spells: Spell[] = [
  // Fire Spells
  // Damage Spells (All / Neutral)
{ name: "Magic Arrow", level: 1, manacost: 4, types: ["Damage", "Direct"], element: "All" },

// Air Spells
{ name: "Lightning Bolt", level: 2, manacost: 8, types: ["Damage", "Direct"], element: "Air" },
{ name: "Destroy Undead", level: 3, manacost: 12, types: ["Damage", "Indirect", "Area"], element: "Air" },
{ name: "Chain Lightning", level: 4, manacost: 20, types: ["Damage", "Direct", "Area"], element: "Air" },
{ name: "Titan's Lightning Bolt", level: 5, manacost: 0, types: ["Damage", "Direct"], element: "Air" },

{ name: "Haste", level: 1, manacost: 5, types: ["Buff", "Indirect"], element: "Air" },
{ name: "Disrupting Ray", level: 2, manacost: 8, types: ["Debuff", "Direct"], element: "Air" },
{ name: "Fortune", level: 2, manacost: 5, types: ["Buff", "Indirect"], element: "Air" },
{ name: "Precision", level: 2, manacost: 6, types: ["Buff", "Indirect"], element: "Air" },
{ name: "Protection from Air", level: 2, manacost: 5, types: ["Buff", "Indirect"], element: "Air" },
{ name: "Air Shield", level: 3, manacost: 9, types: ["Buff", "Indirect"], element: "Air" },
{ name: "Hypnotize", level: 3, manacost: 15, types: ["Debuff", "Direct"], element: "Air" },
{ name: "Counterstrike", level: 4, manacost: 20, types: ["Buff", "Indirect"], element: "Air" },
{ name: "Magic Mirror", level: 5, manacost: 20, types: ["Buff", "Direct"], element: "Air" },
{ name: "Summon Air Elemental", level: 5, manacost: 20, types: ["Utility", "Indirect"], element: "Air" },

{ name: "Visions", level: 2, manacost: 2, types: ["Buff", "Direct"], element: "Air" },
{ name: "View Air", level: 1, manacost: 1, types: ["Utility", "Indirect"], element: "Air" },
{ name: "Disguise", level: 2, manacost: 2, types: ["Buff", "Indirect"], element: "Air" },
{ name: "Dimension Door", level: 5, manacost: 20, types: ["Utility", "Direct"], element: "Air" },
{ name: "Fly", level: 5, manacost: 15, types: ["Buff", "Indirect"], element: "Air" },

// Earth Spells
{ name: "Death Ripple", level: 2, manacost: 8, types: ["Damage", "Indirect", "Area"], element: "Earth" },
{ name: "Meteor Shower", level: 4, manacost: 12, types: ["Damage", "Direct", "Area"], element: "Earth" },
{ name: "Implosion", level: 5, manacost: 25, types: ["Damage", "Direct"], element: "Earth" },

{ name: "Shield", level: 1, manacost: 4, types: ["Buff", "Indirect"], element: "Earth" },
{ name: "Slow", level: 1, manacost: 5, types: ["Debuff", "Indirect"], element: "Earth" },
{ name: "Stone Skin", level: 1, manacost: 4, types: ["Buff", "Indirect"], element: "Earth" },
{ name: "Quicksand", level: 2, manacost: 6, types: ["Utility", "Indirect", "Area"], element: "Earth" },
{ name: "Animate Dead", level: 3, manacost: 12, types: ["Utility", "Direct"], element: "Earth" },
{ name: "Anti-Magic", level: 3, manacost: 12, types: ["Buff", "Direct"], element: "Earth" },
{ name: "Earthquake", level: 3, manacost: 17, types: ["Utility", "Indirect"], element: "Earth" },
{ name: "Force Field", level: 3, manacost: 9, types: ["Utility", "Direct", "Area"], element: "Earth" },
{ name: "Protection from Earth", level: 3, manacost: 9, types: ["Buff", "Indirect"], element: "Earth" },
{ name: "Resurrection", level: 4, manacost: 16, types: ["Utility", "Direct"], element: "Earth" },
{ name: "Sorrow", level: 4, manacost: 12, types: ["Debuff", "Indirect"], element: "Earth" },
{ name: "Summon Earth Elemental", level: 5, manacost: 20, types: ["Utility", "Indirect"], element: "Earth" },

{ name: "View Earth", level: 1, manacost: 1, types: ["Utility", "Indirect"], element: "Earth" },
{ name: "Town Portal", level: 4, manacost: 12, types: ["Utility", "Direct"], element: "Earth" },

// Fire Spells
{ name: "Fire Wall", level: 2, manacost: 6, types: ["Damage", "Direct", "Area"], element: "Fire" },
{ name: "Fireball", level: 3, manacost: 12, types: ["Damage", "Direct", "Area"], element: "Fire" },
{ name: "Inferno", level: 4, manacost: 12, types: ["Damage", "Direct", "Area"], element: "Fire" },
{ name: "Land Mine", level: 3, manacost: 15, types: ["Damage", "Indirect", "Area"], element: "Fire" },
{ name: "Armageddon", level: 4, manacost: 20, types: ["Damage", "Indirect", "Area"], element: "Fire" },

{ name: "Bloodlust", level: 1, manacost: 4, types: ["Buff", "Indirect"], element: "Fire" },
{ name: "Curse", level: 1, manacost: 5, types: ["Debuff", "Indirect"], element: "Fire" },
{ name: "Protection from Fire", level: 2, manacost: 4, types: ["Buff", "Indirect"], element: "Fire" },
{ name: "Blind", level: 2, manacost: 8, types: ["Debuff", "Direct"], element: "Fire" },
{ name: "Misfortune", level: 3, manacost: 9, types: ["Debuff", "Indirect"], element: "Fire" },
{ name: "Berserk", level: 4, manacost: 16, types: ["Debuff", "Direct", "Area"], element: "Fire" },
{ name: "Fire Shield", level: 4, manacost: 12, types: ["Buff", "Direct"], element: "Fire" },
{ name: "Frenzy", level: 4, manacost: 12, types: ["Buff", "Direct"], element: "Fire" },
{ name: "Slayer", level: 4, manacost: 12, types: ["Buff", "Direct"], element: "Fire" },
{ name: "Sacrifice", level: 5, manacost: 20, types: ["Utility", "Direct"], element: "Fire" },
{ name: "Summon Fire Elemental", level: 5, manacost: 20, types: ["Utility", "Indirect"], element: "Fire" },

// Water Spells
{ name: "Ice Bolt", level: 2, manacost: 6, types: ["Damage", "Direct"], element: "Water" },
{ name: "Frost Ring", level: 3, manacost: 9, types: ["Damage", "Direct", "Area"], element: "Water" },

{ name: "Bless", level: 1, manacost: 4, types: ["Buff", "Indirect"], element: "Water" },
{ name: "Cure", level: 1, manacost: 5, types: ["Utility", "Indirect", "Area"], element: "Water" },
{ name: "Dispel", level: 1, manacost: 4, types: ["Utility", "Indirect", "Area"], element: "Water" },
{ name: "Protection from Water", level: 1, manacost: 4, types: ["Buff", "Indirect"], element: "Water" },
{ name: "Remove Obstacle", level: 2, manacost: 5, types: ["Utility", "Direct"], element: "Water" },
{ name: "Weakness", level: 2, manacost: 6, types: ["Debuff", "Indirect"], element: "Water" },
{ name: "Forgetfulness", level: 3, manacost: 9, types: ["Debuff", "Indirect"], element: "Water" },
{ name: "Mirth", level: 3, manacost: 9, types: ["Buff", "Indirect"], element: "Water" },
{ name: "Teleport", level: 3, manacost: 3, types: ["Utility", "Direct"], element: "Water" },
{ name: "Clone", level: 4, manacost: 20, types: ["Utility", "Direct"], element: "Water" },
{ name: "Prayer", level: 4, manacost: 12, types: ["Buff", "Indirect"], element: "Water" },
{ name: "Summon Water Elemental", level: 5, manacost: 20, types: ["Utility", "Indirect"], element: "Water" },

{ name: "Summon Boat", level: 1, manacost: 7, types: ["Utility", "Indirect"], element: "Water" },
{ name: "Scuttle Boat", level: 2, manacost: 6, types: ["Utility", "Direct"], element: "Water" },
{ name: "Water Walk", level: 4, manacost: 8, types: ["Buff", "Indirect"], element: "Water" },

  ]
 

export function getSpellByName(name: string): Spell | undefined {
  return spells.find(spell => spell.name.toLowerCase() === name.toLowerCase());
}

export function searchSpells(query: string): Spell[] {
  const lowerQuery = query.toLowerCase();
  return spells.filter(spell =>
    spell.name.toLowerCase().includes(lowerQuery)
  );
}
