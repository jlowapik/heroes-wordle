import { Spell } from '@/types';

// Sample spells - replace with actual spell data
export const spells: Spell[] = [
  // Fire Spells
  { name: "Magic Arrow", level: 1, manacost: 5, types: ["Direct"], element: "Fire"},
  { name: "Fireball", level: 3, manacost: 15, types: ["Direct", "Area"], element: "Fire"},
  { name: "Armageddon", level: 5, manacost: 30, types: ["Area"], element: "Fire"},

  // Water Spells
  { name: "Cure", level: 1, manacost: 6, types: ["Buff"], element: "Water"},
  { name: "Bless", level: 1, manacost: 5, types: ["Buff"], element: "Water"},
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
