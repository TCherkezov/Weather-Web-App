import { useState } from 'react'

function SearchBar({ onSearch, loading }) {
  const [city, setCity] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(city)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-3">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="flex-1 px-6 py-4 text-lg rounded-xl border-2 border-gray-200 dark:border-gray-700 
                     bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition-all duration-200 shadow-lg hover:shadow-xl
                     placeholder-gray-400 dark:placeholder-gray-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 
                     text-white font-semibold rounded-xl
                     hover:from-blue-700 hover:to-purple-700
                     active:scale-95 transition-all duration-200
                     shadow-lg hover:shadow-xl
                     disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Searching...</span>
            </>
          ) : (
            <>
              <span>🔍</span>
              <span>Search</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}

export default SearchBar

