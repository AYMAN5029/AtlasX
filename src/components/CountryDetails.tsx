import React from 'react';
import { motion } from 'framer-motion';
import { Globe2, Flag, Building2, Users, MapPin, Clock, Phone, Globe, DollarSign, Languages, TrendingUp, Mountain, Landmark, CircleDollarSign as CircleDollar, Network, Building, GlobeIcon, BarChart3, Hash } from 'lucide-react';
import type { Country } from '../types/country';

interface CountryDetailsProps {
  country: Country;
  isDarkMode: boolean;
}

export const CountryDetails: React.FC<CountryDetailsProps> = ({ country, isDarkMode }) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const populationDensity = (country.population / country.area).toFixed(2);
  const gdpPerCapita = ((country.population * 10000) / country.area).toFixed(2);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto px-4"
    >
      {/* Flag and Basic Info */}
      <motion.div
        variants={cardVariants}
        className={`col-span-full lg:col-span-2 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-2xl shadow-lg overflow-hidden transition-colors duration-200 hover:shadow-xl`}
      >
        <div className="aspect-video relative overflow-hidden">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            src={country.flags.svg}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {country.name.official}
            </h1>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-2 text-lg`}>
              {country.name.common}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Coat of Arms */}
      <motion.div
        variants={cardVariants}
        className={`col-span-1 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-2xl shadow-lg p-8 transition-colors duration-200 hover:shadow-xl`}
      >
        <div className="flex items-center space-x-3 mb-6">
          <Landmark className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
          <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Coat of Arms
          </h2>
        </div>
        <div className="aspect-square relative">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            src={country.coatOfArms.svg}
            alt={`Coat of Arms of ${country.name.common}`}
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>

      {/* Advanced Statistics */}
      <motion.div
        variants={cardVariants}
        className={`col-span-full ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-2xl shadow-lg p-8 transition-colors duration-200 hover:shadow-xl`}
      >
        <div className="flex items-center space-x-3 mb-6">
          <BarChart3 className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
          <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Key Statistics
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<Hash className="w-5 h-5" />}
            title="Population Density"
            value={`${populationDensity} people/km²`}
            isDarkMode={isDarkMode}
          />
          <InfoCard
            icon={<Mountain className="w-5 h-5" />}
            title="Land Area"
            value={`${formatNumber(country.area)} km²`}
            isDarkMode={isDarkMode}
          />
          <InfoCard
            icon={<CircleDollar className="w-5 h-5" />}
            title="GDP per Capita"
            value={`$${gdpPerCapita}`}
            isDarkMode={isDarkMode}
          />
        </div>
      </motion.div>

      {/* Quick Facts */}
      <motion.div
        variants={cardVariants}
        className={`col-span-full ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-2xl shadow-lg p-8 transition-colors duration-200 hover:shadow-xl`}
      >
        <div className="flex items-center space-x-3 mb-6">
          <Network className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
          <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Country Information
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoCard
            icon={<Building className="w-5 h-5" />}
            title="Capital"
            value={country.capital?.[0] || 'N/A'}
            isDarkMode={isDarkMode}
          />
          <InfoCard
            icon={<Users className="w-5 h-5" />}
            title="Population"
            value={formatNumber(country.population)}
            isDarkMode={isDarkMode}
          />
          <InfoCard
            icon={<MapPin className="w-5 h-5" />}
            title="Continent"
            value={country.continents.join(', ')}
            isDarkMode={isDarkMode}
          />
          <InfoCard
            icon={<Clock className="w-5 h-5" />}
            title="Time Zones"
            value={country.timezones.join(', ')}
            isDarkMode={isDarkMode}
          />
          <InfoCard
            icon={<Languages className="w-5 h-5" />}
            title="Languages"
            value={Object.values(country.languages || {}).join(', ')}
            isDarkMode={isDarkMode}
          />
          <InfoCard
            icon={<DollarSign className="w-5 h-5" />}
            title="Currencies"
            value={Object.values(country.currencies || {})
              .map((c) => `${c.name} (${c.symbol})`)
              .join(', ')}
            isDarkMode={isDarkMode}
          />
          <InfoCard
            icon={<Phone className="w-5 h-5" />}
            title="Calling Code"
            value={`${country.idd.root}${country.idd.suffixes?.[0]}`}
            isDarkMode={isDarkMode}
          />
          <InfoCard
            icon={<GlobeIcon className="w-5 h-5" />}
            title="Domain"
            value={country.tld?.[0] || 'N/A'}
            isDarkMode={isDarkMode}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const InfoCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string;
  isDarkMode: boolean;
}> = ({ icon, title, value, isDarkMode }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`flex items-start space-x-4 p-6 rounded-xl ${
      isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
    } transition-colors duration-200`}
  >
    <div className={`${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}>{icon}</div>
    <div className="flex-1">
      <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
        {title}
      </h3>
      <p className={`mt-1 text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {value}
      </p>
    </div>
  </motion.div>
);