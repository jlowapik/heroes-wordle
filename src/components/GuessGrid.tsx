'use client';

import { Guess } from '@/types';
import GuessRow from './GuessRow';
import { MAX_GUESSES } from '@/lib/game';

interface GuessGridProps {
  guesses: Guess[];
}

export default function GuessGrid({ guesses }: GuessGridProps) {
  const remainingSlots = MAX_GUESSES - guesses.length;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header row with labels */}
      <div className="grid grid-cols-5 gap-1 md:gap-2 mb-3 text-center">
        {['Name', 'Level', 'Mana', 'Types', 'Element'].map((label) => (
          <div
            key={label}
            className="p-2 text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-400
                       bg-gray-100 dark:bg-gray-800 rounded-lg"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Guesses */}
      {guesses.map((guess, index) => (
        <GuessRow key={index} guess={guess} />
      ))}

      {/* Empty slots */}
      {remainingSlots > 0 &&
        Array.from({ length: remainingSlots }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="grid grid-cols-5 gap-1 md:gap-2 mb-2"
          >
            {Array.from({ length: 5 }).map((_, cellIndex) => (
              <div
                key={cellIndex}
                className="p-2 md:p-3 rounded-lg bg-gray-100 dark:bg-gray-800
                           border-2 border-dashed border-gray-300 dark:border-gray-600
                           min-h-[50px] md:min-h-[60px]"
              />
            ))}
          </div>
        ))}

      {/* Guess counter */}
      <div className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
        {guesses.length} / {MAX_GUESSES} guesses used
      </div>
    </div>
  );
}
