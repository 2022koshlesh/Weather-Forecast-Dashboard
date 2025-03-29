import React from 'react';
import { Droplets, Wind } from 'lucide-react';

function WeatherCard({ weather, isDark }) {
  return (
    <div className={`p-6 rounded-xl ${
      isDark ? 'bg-gray-800' : 'bg-white'
    } shadow-lg`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">{weather.name}</h2>
          <p className="text-gray-500 dark:text-gray-400">{weather.weather[0].description}</p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          className="w-20 h-20"
        />
      </div>

      <div className="text-5xl font-bold mb-6">
        {Math.round(weather.main.temp)}°C
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={`p-4 rounded-lg ${
          isDark ? 'bg-gray-700' : 'bg-gray-50'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="text-blue-500" />
            <span className="text-gray-500 dark:text-gray-400">Humidity</span>
          </div>
          <div className="text-xl font-semibold">{weather.main.humidity}%</div>
        </div>

        <div className={`p-4 rounded-lg ${
          isDark ? 'bg-gray-700' : 'bg-gray-50'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <Wind className="text-blue-500" />
            <span className="text-gray-500 dark:text-gray-400">Wind Speed</span>
          </div>
          <div className="text-xl font-semibold">{Math.round(weather.wind.speed)} km/h</div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;