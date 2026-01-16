'use client';

import { Guess, FeedbackType } from '@/types';

interface GuessRowProps {
  guess: Guess;
}

function getFeedbackStyle(feedback: FeedbackType): string {
  switch (feedback) {
    case 'correct':
      return 'bg-green-500 text-white';
    case 'partial':
      return 'bg-yellow-500 text-white';
    case 'higher':
    case 'lower':
      return 'bg-orange-500 text-white';
    case 'wrong':
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-200 dark:bg-gray-700';
  }
}

function getFeedbackIcon(feedback: FeedbackType): string {
  switch (feedback) {
    case 'correct':
      return '\u2713'; // checkmark
    case 'partial':
      return '~';
    case 'higher':
      return '\u2191'; // up arrow
    case 'lower':
      return '\u2193'; // down arrow
    case 'wrong':
      return '\u2717'; // X
    default:
      return '';
  }
}

export default function GuessRow({ guess }: GuessRowProps) {
  const { spell, feedback } = guess;

  const cells = [
    { label: 'Name', value: spell.name, feedback: feedback.name },
    { label: 'Level', value: spell.level.toString(), feedback: feedback.level },
    {
      label: 'Mana',
      value: spell.manacost.toString(),
      feedback: feedback.manacost,
      showIcon: feedback.manacost === 'higher' || feedback.manacost === 'lower',
    },
    { label: 'Types', value: spell.types.join(', '), feedback: feedback.types },
    { label: 'Element', value: spell.element, feedback: feedback.element },
  ];

  return (
    <div className="grid grid-cols-5 gap-1 md:gap-2 mb-2 animate-fade-in">
      {cells.map((cell, index) => (
        <div
          key={index}
          className={`relative p-2 md:p-3 rounded-lg text-center transition-all duration-300
                      ${getFeedbackStyle(cell.feedback)}
                      transform hover:scale-105`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="text-xs opacity-70 mb-1 hidden md:block">{cell.label}</div>
          <div className="text-xs md:text-sm font-semibold truncate">{cell.value}</div>
          {cell.showIcon && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-white dark:bg-gray-900
                            rounded-full flex items-center justify-center text-xs font-bold
                            text-orange-500 shadow-md">
              {getFeedbackIcon(cell.feedback)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
