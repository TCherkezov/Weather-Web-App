import { useState } from 'react'

function SearchHistory({ items, onSelect }) {
    if (items.length === 0) return null
  
    return (
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {items.map(city => (
          <button
            key={city}
            onClick={() => onSelect(city)}
            className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 
                       hover:bg-gray-300 dark:hover:bg-gray-600
                       transition text-sm"
          >
            {city}
          </button>
        ))}
      </div>
    )
  }
  
  export default SearchHistory
  