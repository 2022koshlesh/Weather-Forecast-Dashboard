import React from 'react';
import { History, Search } from 'lucide-react';

function SearchHistory({ history, onSelect, isDark }) {
  if (history.length === 0) return null;

  return (
    <div className={`p-6 rounded-xl ${
      isDark ? 'bg-gray-800' : 'bg-white'
    } shadow-lg`}>
      <div className="flex items-center gap-2 mb-4">
        <History className="text-blue-500" />
        <h3 className="text-xl font-semibold">Recent Searches</h3>
      </div>
      <div className="space-y-2">
        {history.map((city, index) => (
          <button
            key={`${city}-${index}`}
            onClick={() => onSelect(city)}
            className={`w-full p-3 rounded-lg flex items-center gap-2 transition-colors ${
              isDark
                ? 'hover:bg-gray-700 text-gray-300'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <Search className="w-4 h-4" />
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchHistory;