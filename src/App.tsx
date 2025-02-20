import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Globe, Moon, Sun } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { CountryDetails } from './components/CountryDetails';
import type { Country } from './types/country';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { data: country, isLoading } = useQuery(
    ['country', searchQuery],
    async () => {
      if (!searchQuery) return null;
      const response = await axios.get(`https://restcountries.com/v3.1/name/${searchQuery}`);
      return response.data[0] as Country;
    },
    {
      enabled: !!searchQuery,
      retry: false,
    }
  );

  const handleSearch = async (query: string) => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${query}`);
      const countries = response.data;
      const names = countries.map((c: Country) => c.name.common);
      setSuggestions(names);
    } catch (error) {
      setSuggestions([]);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Globe className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Atlas<span className="text-blue-500">X</span>
              </h1>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full ${
                isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'
              } hover:opacity-80 transition-all duration-200`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <SearchBar
          onSearch={setSearchQuery}
          suggestions={suggestions}
          isLoading={isLoading}
          isDarkMode={isDarkMode}
        />

        {!searchQuery && !country && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Globe className={`w-16 h-16 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'} mx-auto mb-4`} />
            <h2 className={`text-xl font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Explore the world, one country at a time
            </h2>
            <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Search for any country to discover its details
            </p>
          </motion.div>
        )}

        {country && <CountryDetails country={country} isDarkMode={isDarkMode} />}
      </main>
    </div>
  );
}

export default App;