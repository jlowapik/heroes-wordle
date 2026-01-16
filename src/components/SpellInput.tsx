'use client';

import { useState, useRef, useEffect } from 'react';
import { Spell } from '@/types';
import { searchSpells, getSpellByName } from '@/data/spells';

interface SpellInputProps {
  onGuess: (spell: Spell) => void;
  disabled: boolean;
  guessedSpells: string[];
}

export default function SpellInput({ onGuess, disabled, guessedSpells }: SpellInputProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Spell[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length >= 1) {
      const results = searchSpells(query).filter(
        spell => !guessedSpells.includes(spell.name.toLowerCase())
      );
      setSuggestions(results.slice(0, 8));
      setShowSuggestions(results.length > 0);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, guessedSpells]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (spellName?: string) => {
    const nameToSearch = spellName || query;
    const spell = getSpellByName(nameToSearch);

    if (spell && !guessedSpells.includes(spell.name.toLowerCase())) {
      onGuess(spell);
      setQuery('');
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSubmit(suggestions[selectedIndex].name);
      } else if (suggestions.length === 1) {
        handleSubmit(suggestions[0].name);
      } else {
        handleSubmit();
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (spell: Spell) => {
    handleSubmit(spell.name);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 1 && setSuggestions.length > 0 && setShowSuggestions(true)}
          placeholder="Enter spell name..."
          disabled={disabled}
          className="flex-1 px-4 py-3 text-lg border-2 border-gray-300 rounded-lg
                     focus:border-blue-500 focus:outline-none
                     disabled:bg-gray-100 disabled:cursor-not-allowed
                     dark:bg-gray-800 dark:border-gray-600 dark:text-white
                     dark:focus:border-blue-400 dark:disabled:bg-gray-700"
        />
        <button
          onClick={() => handleSubmit()}
          disabled={disabled || !query}
          className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg
                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                     disabled:bg-gray-400 disabled:cursor-not-allowed
                     transition-colors duration-200"
        >
          Guess
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300
                     dark:border-gray-600 rounded-lg shadow-lg max-h-64 overflow-y-auto"
        >
          {suggestions.map((spell, index) => (
            <div
              key={spell.name}
              onClick={() => handleSuggestionClick(spell)}
              className={`px-4 py-2 cursor-pointer transition-colors
                         ${index === selectedIndex
                           ? 'bg-blue-100 dark:bg-blue-900'
                           : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                         }
                         ${index === 0 ? 'rounded-t-lg' : ''}
                         ${index === suggestions.length - 1 ? 'rounded-b-lg' : ''}`}
            >
              <div className="font-medium dark:text-white">{spell.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Level {spell.level} | {spell.element} | {spell.types.join(', ')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
