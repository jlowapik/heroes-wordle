import { GameStats, Guess } from '@/types';
import { getTodayString } from './game';

const STATS_KEY = 'heroes-wordle-stats';
const DAILY_GUESSES_KEY = 'heroes-wordle-daily';
const LAST_PLAYED_KEY = 'heroes-wordle-last-played';

// Default stats
const defaultStats: GameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: [0, 0, 0, 0, 0, 0],
};

// Check if we're in a browser environment
function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

// Get game stats from localStorage
export function getStats(): GameStats {
  if (!isBrowser()) return defaultStats;

  try {
    const stored = localStorage.getItem(STATS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to parse stats:', e);
  }
  return defaultStats;
}

// Save game stats to localStorage
export function saveStats(stats: GameStats): void {
  if (!isBrowser()) return;

  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save stats:', e);
  }
}

// Update stats after a game
export function updateStats(won: boolean, guessCount: number): GameStats {
  const stats = getStats();
  const today = getTodayString();
  const lastPlayed = getLastPlayedDate();

  stats.gamesPlayed++;

  if (won) {
    stats.gamesWon++;
    stats.guessDistribution[guessCount - 1]++;

    // Check if continuing streak (played yesterday)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

    if (lastPlayed === yesterdayString || lastPlayed === today) {
      stats.currentStreak++;
    } else {
      stats.currentStreak = 1;
    }

    stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
  } else {
    stats.currentStreak = 0;
  }

  saveStats(stats);
  setLastPlayedDate(today);

  return stats;
}

// Get daily guesses from localStorage
export function getDailyGuesses(): Guess[] {
  if (!isBrowser()) return [];

  try {
    const today = getTodayString();
    const stored = localStorage.getItem(`${DAILY_GUESSES_KEY}-${today}`);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to parse daily guesses:', e);
  }
  return [];
}

// Save daily guesses to localStorage
export function saveDailyGuesses(guesses: Guess[]): void {
  if (!isBrowser()) return;

  try {
    const today = getTodayString();
    localStorage.setItem(`${DAILY_GUESSES_KEY}-${today}`, JSON.stringify(guesses));
  } catch (e) {
    console.error('Failed to save daily guesses:', e);
  }
}

// Check if daily game is already completed
export function isDailyCompleted(): boolean {
  if (!isBrowser()) return false;

  try {
    const today = getTodayString();
    const stored = localStorage.getItem(`${DAILY_GUESSES_KEY}-${today}-completed`);
    return stored === 'true';
  } catch (e) {
    return false;
  }
}

// Mark daily game as completed
export function markDailyCompleted(): void {
  if (!isBrowser()) return;

  try {
    const today = getTodayString();
    localStorage.setItem(`${DAILY_GUESSES_KEY}-${today}-completed`, 'true');
  } catch (e) {
    console.error('Failed to mark daily as completed:', e);
  }
}

// Get last played date
export function getLastPlayedDate(): string | null {
  if (!isBrowser()) return null;

  try {
    return localStorage.getItem(LAST_PLAYED_KEY);
  } catch (e) {
    return null;
  }
}

// Set last played date
export function setLastPlayedDate(date: string): void {
  if (!isBrowser()) return;

  try {
    localStorage.setItem(LAST_PLAYED_KEY, date);
  } catch (e) {
    console.error('Failed to set last played date:', e);
  }
}

// Clear all game data (for testing)
export function clearAllData(): void {
  if (!isBrowser()) return;

  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('heroes-wordle')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
  } catch (e) {
    console.error('Failed to clear data:', e);
  }
}
