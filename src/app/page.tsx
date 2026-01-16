'use client';

import { useState, useEffect, useCallback } from 'react';
import { Spell, Guess, GameStats } from '@/types';
import {
  getDailySpell,
  getRandomSpell,
  compareSpells,
  isCorrectGuess,
  isGameOver,
  MAX_GUESSES,
} from '@/lib/game';
import {
  getStats,
  getDailyGuesses,
  saveDailyGuesses,
  isDailyCompleted,
  markDailyCompleted,
  updateStats,
} from '@/lib/storage';
import SpellInput from '@/components/SpellInput';
import GuessGrid from '@/components/GuessGrid';
import ResultModal from '@/components/ResultModal';

type GameMode = 'daily' | 'practice';

export default function Home() {
  const [mode, setMode] = useState<GameMode>('daily');
  const [targetSpell, setTargetSpell] = useState<Spell | null>(null);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState<GameStats>({
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: [0, 0, 0, 0, 0, 0],
  });
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  // Initialize game
  const initGame = useCallback((gameMode: GameMode) => {
    setMode(gameMode);
    setGameOver(false);
    setWon(false);
    setShowModal(false);

    if (gameMode === 'daily') {
      const spell = getDailySpell();
      setTargetSpell(spell);

      // Restore daily game state
      const savedGuesses = getDailyGuesses();
      setGuesses(savedGuesses);

      if (isDailyCompleted() && savedGuesses.length > 0) {
        const lastGuess = savedGuesses[savedGuesses.length - 1];
        const wasWon = isCorrectGuess(lastGuess.feedback);
        setGameOver(true);
        setWon(wasWon);
        setShowModal(true);
      }
    } else {
      setTargetSpell(getRandomSpell());
      setGuesses([]);
    }

    setStats(getStats());
  }, []);

  useEffect(() => {
    initGame('daily');
  }, [initGame]);

  const handleGuess = (spell: Spell) => {
    if (!targetSpell || gameOver) return;

    const feedback = compareSpells(spell, targetSpell);
    const newGuess: Guess = { spell, feedback };
    const newGuesses = [...guesses, newGuess];
    setGuesses(newGuesses);

    // Save daily guesses
    if (mode === 'daily') {
      saveDailyGuesses(newGuesses);
    }

    const isWin = isCorrectGuess(feedback);
    const isOver = isGameOver(newGuesses.length, isWin);

    if (isOver) {
      setGameOver(true);
      setWon(isWin);

      // Update stats only for new daily completions
      if (mode === 'daily' && !isDailyCompleted()) {
        markDailyCompleted();
        const newStats = updateStats(isWin, newGuesses.length);
        setStats(newStats);
      } else if (mode === 'practice') {
        const newStats = updateStats(isWin, newGuesses.length);
        setStats(newStats);
      }

      setTimeout(() => setShowModal(true), 500);
    }
  };

  const handlePlayAgain = () => {
    setShowModal(false);
    setTargetSpell(getRandomSpell());
    setGuesses([]);
    setGameOver(false);
    setWon(false);
  };

  const switchMode = (newMode: GameMode) => {
    if (newMode === mode) return;
    initGame(newMode);
  };

  const guessedSpellNames = guesses.map((g) => g.spell.name.toLowerCase());

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Heroes Wordle
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Guess the spell based on its characteristics
          </p>

          {/* Mode Toggle */}
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => switchMode('daily')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors
                         ${mode === 'daily'
                           ? 'bg-blue-600 text-white'
                           : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                         }`}
            >
              Daily
            </button>
            <button
              onClick={() => switchMode('practice')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors
                         ${mode === 'practice'
                           ? 'bg-blue-600 text-white'
                           : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                         }`}
            >
              Practice
            </button>
            <button
              onClick={() => setShowHowToPlay(true)}
              className="px-4 py-2 rounded-lg font-medium bg-gray-200 dark:bg-gray-700
                         text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600
                         transition-colors"
            >
              ?
            </button>
          </div>
        </header>

        {/* Game Area */}
        <div className="space-y-6">
          {/* Input */}
          <SpellInput
            onGuess={handleGuess}
            disabled={gameOver}
            guessedSpells={guessedSpellNames}
          />

          {/* Guess Grid */}
          <GuessGrid guesses={guesses} />
        </div>

        {/* Result Modal */}
        {targetSpell && (
          <ResultModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            won={won}
            targetSpell={targetSpell}
            guesses={guesses}
            stats={stats}
            mode={mode}
            onPlayAgain={mode === 'practice' ? handlePlayAgain : undefined}
          />
        )}

        {/* How to Play Modal */}
        {showHowToPlay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-md w-full p-6 relative">
              <button
                onClick={() => setShowHowToPlay(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
                           text-gray-500 hover:text-gray-700 dark:text-gray-400
                           dark:hover:text-gray-200 rounded-full hover:bg-gray-100
                           dark:hover:bg-gray-800 transition-colors text-xl"
              >
                &times;
              </button>

              <h2 className="text-2xl font-bold dark:text-white mb-4">How to Play</h2>

              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>Guess the spell in 6 tries!</p>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Feedback Colors:
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-green-500 rounded flex items-center justify-center text-white text-xs">{'\u2713'}</span>
                      <span>Correct match</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-yellow-500 rounded flex items-center justify-center text-white text-xs">~</span>
                      <span>Partial match (for types only)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center text-white text-xs">{'\u2191'}</span>
                      <span>Target is higher (for manacost)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center text-white text-xs">{'\u2193'}</span>
                      <span>Target is lower (for manacost)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-red-500 rounded flex items-center justify-center text-white text-xs">{'\u2717'}</span>
                      <span>Wrong</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Characteristics:
                  </h3>
                  <ul className="text-sm space-y-1">
                    <li><strong>Name:</strong> The spell name</li>
                    <li><strong>Level:</strong> Spell level (1-5)</li>
                    <li><strong>Mana:</strong> Mana cost</li>
                    <li><strong>Types:</strong> Up to 2 types (Direct, Area, Buff, etc.)</li>
                    <li><strong>Element:</strong> Fire, Water, Earth, Air, or All</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Game Modes:
                  </h3>
                  <ul className="text-sm space-y-1">
                    <li><strong>Daily:</strong> One spell per day, track your streak!</li>
                    <li><strong>Practice:</strong> Unlimited games with random spells</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
