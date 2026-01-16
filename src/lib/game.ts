import { Spell, CharacteristicFeedback, FeedbackType } from '@/types';
import { spells } from '@/data/spells';

const MAX_GUESSES = 6;

// Simple seeded random number generator
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Get date as number for seeding (YYYYMMDD format)
function getDateSeed(date: Date = new Date()): number {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return year * 10000 + month * 100 + day;
}

// Get the daily spell based on date
export function getDailySpell(date: Date = new Date()): Spell {
  const seed = getDateSeed(date);
  const index = Math.floor(seededRandom(seed) * spells.length);
  return spells[index];
}

// Get a random spell for practice mode
export function getRandomSpell(): Spell {
  const index = Math.floor(Math.random() * spells.length);
  return spells[index];
}

// Compare name
function compareName(guess: string, target: string): FeedbackType {
  return guess.toLowerCase() === target.toLowerCase() ? 'correct' : 'wrong';
}

// Compare level
function compareLevel(guess: number, target: number): FeedbackType {
  return guess === target ? 'correct' : 'wrong';
}

// Compare manacost (with higher/lower feedback)
function compareManacost(guess: number, target: number): FeedbackType {
  if (guess === target) return 'correct';
  return guess < target ? 'higher' : 'lower';
}

// Compare types (partial match for overlapping types)
function compareTypes(guessTypes: string[], targetTypes: string[]): FeedbackType {
  const guessSet = new Set(guessTypes.map(t => t.toLowerCase()));
  const targetSet = new Set(targetTypes.map(t => t.toLowerCase()));

  // Count matching types
  let matchCount = 0;
  guessSet.forEach(type => {
    if (targetSet.has(type)) matchCount++;
  });

  // Both match completely
  if (matchCount === targetSet.size && guessSet.size === targetSet.size) {
    return 'correct';
  }
  // At least one matches
  if (matchCount > 0) {
    return 'partial';
  }
  // None match
  return 'wrong';
}

// Compare element
function compareElement(guess: string, target: string): FeedbackType {
  return guess.toLowerCase() === target.toLowerCase() ? 'correct' : 'wrong';
}

// Main comparison function
export function compareSpells(guess: Spell, target: Spell): CharacteristicFeedback {
  return {
    name: compareName(guess.name, target.name),
    level: compareLevel(guess.level, target.level),
    manacost: compareManacost(guess.manacost, target.manacost),
    types: compareTypes(guess.types, target.types),
    element: compareElement(guess.element, target.element),
  };
}

// Check if the guess is correct (all characteristics match)
export function isCorrectGuess(feedback: CharacteristicFeedback): boolean {
  return feedback.name === 'correct';
}

// Check if game is over
export function isGameOver(guessCount: number, won: boolean): boolean {
  return won || guessCount >= MAX_GUESSES;
}

// Get today's date string for storage key
export function getTodayString(): string {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

// Generate shareable result string
export function generateShareResult(guesses: { feedback: CharacteristicFeedback }[], won: boolean): string {
  const date = getTodayString();
  const result = won ? `${guesses.length}/6` : 'X/6';

  const emojiGrid = guesses.map(guess => {
    const { feedback } = guess;
    const getEmoji = (type: FeedbackType): string => {
      switch (type) {
        case 'correct': return '\u2705'; // green checkmark
        case 'partial': return '\ud83d\udfe1'; // yellow circle
        case 'higher': return '\u2b06\ufe0f'; // up arrow
        case 'lower': return '\u2b07\ufe0f'; // down arrow
        case 'wrong': return '\u274c'; // red X
        default: return '\u2b1c'; // white square
      }
    };

    return [
      getEmoji(feedback.name),
      getEmoji(feedback.level),
      getEmoji(feedback.manacost),
      getEmoji(feedback.types),
      getEmoji(feedback.element),
    ].join('');
  }).join('\n');

  return `Heroes Wordle ${date} ${result}\n\n${emojiGrid}`;
}

export { MAX_GUESSES };
