import React, { useState, useRef } from 'react';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
  suggestions: string[];
  isLoading: boolean;
  isDarkMode: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, suggestions, isLoading, isDarkMode }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search for a country..."
          className={`w-full px-6 py-4 text-lg rounded-full border ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
              : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
          } focus:outline-none focus:border-blue-500 pr-12 shadow-sm transition-colors duration-200`}
        />
        <button
          type="submit"
          className={`absolute right-4 top-1/2 -translate-y-1/2 ${
            isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-400 hover:text-blue-500'
          } transition-colors`}
        >
          <Search size={24} />
        </button>
      </form>

      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute top-full left-0 right-0 mt-2 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-lg shadow-lg border ${
              isDarkMode ? 'border-gray-700' : 'border-gray-100'
            } max-h-60 overflow-y-auto z-50`}
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  setQuery(suggestion);
                  onSearch(suggestion);
                }}
                className={`w-full text-left px-4 py-2 ${
                  isDarkMode
                    ? 'text-gray-200 hover:bg-gray-700'
                    : 'text-gray-900 hover:bg-gray-50'
                } transition-colors`}
              >
                {suggestion}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading && (
        <div className="absolute right-16 top-1/2 -translate-y-1/2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className={`w-5 h-5 border-2 ${
              isDarkMode ? 'border-blue-400' : 'border-blue-500'
            } border-t-transparent rounded-full`}
          />
        </div>
      )}
    </div>
  );
};