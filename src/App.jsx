import React, { useState, useEffect } from 'react';
import { Search, Cloud, Droplets, Wind, RefreshCw, Moon, Sun, History } from 'lucide-react';
import WeatherCard from './components/WeatherCard';
import SearchHistory from './components/SearchHistory';
import { fetchWeatherData } from './api';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setIsDark(true);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  const handleSearch = async (searchCity) => {
    if (!searchCity.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherData(searchCity);
      setWeather(data);
      
      // Update search history
      setSearchHistory(prev => {
        const newHistory = [searchCity, ...prev.filter(c => c !== searchCity)].slice(0, 5);
        return newHistory;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(city);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Cloud className="h-8 w-8" />
            Weather Dashboard
          </h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isDark ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name..."
                className={`w-full p-4 pr-12 rounded-lg border ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button
              type="submit"
              className="px-6 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              disabled={loading}
            >
              {loading ? <RefreshCw className="animate-spin" /> : 'Search'}
            </button>
          </div>
        </form>

        {error && (
          <div className="p-4 mb-8 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-[2fr,1fr] gap-8">
          {weather && <WeatherCard weather={weather} isDark={isDark} />}
          <SearchHistory
            history={searchHistory}
            onSelect={handleSearch}
            isDark={isDark}
          />
        </div>
      </div>
    </div>
  );
}

export default App;