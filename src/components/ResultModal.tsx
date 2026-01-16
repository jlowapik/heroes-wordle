'use client';

import { useState } from 'react';
import { Spell, Guess, GameStats } from '@/types';
import { generateShareResult } from '@/lib/game';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  won: boolean;
  targetSpell: Spell;
  guesses: Guess[];
  stats: GameStats;
  mode: 'daily' | 'practice';
  onPlayAgain?: () => void;
}

export default function ResultModal({
  isOpen,
  onClose,
  won,
  targetSpell,
  guesses,
  stats,
  mode,
  onPlayAgain,
}: ResultModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleShare = async () => {
    const shareText = generateShareResult(guesses, won);

    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const winPercentage = stats.gamesPlayed > 0
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-md w-full
                   max-h-[90vh] overflow-y-auto animate-scale-in"
      >
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">{won ? '\ud83c\udf89' : '\ud83d\ude22'}</div>
            <h2 className="text-2xl font-bold dark:text-white">
              {won ? 'Congratulations!' : 'Game Over'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {won
                ? `You guessed it in ${guesses.length} ${guesses.length === 1 ? 'try' : 'tries'}!`
                : 'Better luck next time!'}
            </p>
          </div>

          {/* Target Spell Reveal */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 mb-6">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              The spell was:
            </div>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {targetSpell.name}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 grid grid-cols-2 gap-2">
              <div>Level: {targetSpell.level}</div>
              <div>Mana: {targetSpell.manacost}</div>
              <div>Types: {targetSpell.types.join(', ')}</div>
              <div>Element: {targetSpell.element}</div>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold dark:text-white mb-3 text-center">
              Statistics
            </h3>
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                <div className="text-2xl font-bold dark:text-white">{stats.gamesPlayed}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Played</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                <div className="text-2xl font-bold dark:text-white">{winPercentage}%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Win %</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                <div className="text-2xl font-bold dark:text-white">{stats.currentStreak}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Streak</div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                <div className="text-2xl font-bold dark:text-white">{stats.maxStreak}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Max</div>
              </div>
            </div>
          </div>

          {/* Guess Distribution */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold dark:text-white mb-2">
              Guess Distribution
            </h3>
            {stats.guessDistribution.map((count, index) => {
              const maxCount = Math.max(...stats.guessDistribution, 1);
              const width = (count / maxCount) * 100;

              return (
                <div key={index} className="flex items-center gap-2 mb-1">
                  <div className="w-4 text-sm font-medium dark:text-white">
                    {index + 1}
                  </div>
                  <div
                    className="bg-blue-500 h-5 rounded flex items-center justify-end px-2
                               text-xs text-white font-medium transition-all duration-500"
                    style={{ width: `${Math.max(width, 8)}%` }}
                  >
                    {count}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleShare}
              className="flex-1 py-3 px-4 bg-green-600 hover:bg-green-700
                         text-white font-semibold rounded-lg transition-colors"
            >
              {copied ? 'Copied!' : 'Share Results'}
            </button>
            {mode === 'practice' && onPlayAgain && (
              <button
                onClick={onPlayAgain}
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700
                           text-white font-semibold rounded-lg transition-colors"
              >
                Play Again
              </button>
            )}
          </div>

          {mode === 'daily' && (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              Come back tomorrow for a new spell!
            </p>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
                       text-gray-500 hover:text-gray-700 dark:text-gray-400
                       dark:hover:text-gray-200 rounded-full hover:bg-gray-100
                       dark:hover:bg-gray-800 transition-colors"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}
