export interface Spell {
  name: string;
  level: number;
  manacost: number;
  types: string[];    // 1-2 types, e.g., ["Direct", "Area"] or ["Direct"]
  element: string;    // e.g., "Fire", "Water", "Earth", "Air"
}

export type FeedbackType = 'correct' | 'wrong' | 'higher' | 'lower' | 'partial';

export interface CharacteristicFeedback {
  name: FeedbackType;
  level: FeedbackType;
  manacost: FeedbackType;
  types: FeedbackType;
  element: FeedbackType;
}

export interface Guess {
  spell: Spell;
  feedback: CharacteristicFeedback;
}

export interface GameState {
  targetSpell: Spell | null;
  guesses: Guess[];
  gameOver: boolean;
  won: boolean;
  mode: 'daily' | 'practice';
}

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: number[]; // [1-guess wins, 2-guess wins, ..., 6-guess wins]
}
