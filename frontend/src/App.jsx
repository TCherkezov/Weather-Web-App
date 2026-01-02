import { useState, useEffect } from 'react'
import WeatherCard from './components/WeatherCard'
import SearchBar from './components/SearchBar'
import SearchHistory from './components/SearchHistory'
import { fetchWeather, fetchForecast } from './services/weatherApi'
import Forecast from './components/Forecast'


function App() {
  const [forecast, setForecast] = useState(null)
  const [history, setHistory] = useState([])
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [unit, setUnit] = useState('C')

  useEffect(() => {
    const saved = localStorage.getItem('weather-history')
    if (saved) {
      setHistory(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('weather-history', JSON.stringify(history))
  }, [history])


  const handleSearch = async (city) => {
    if (!city.trim()) {
      setError('Please enter a city name')
      return
    }

    setForecast(null)
    setLoading(true)
    setError(null)
    setWeather(null)

    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeather(city),
        fetchForecast(city),
      ])
      setWeather(weatherData)
      setForecast(forecastData)
      setHistory(prev => {
        const normalized = city.trim()
        const updated = [normalized, ...prev.filter(c => c !== normalized)]
        return updated.slice(0, 5)
      })
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            🌤️ Weather App
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Get real-time weather information for any city
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <SearchBar onSearch={handleSearch} loading={loading} />
            </div>

            {/* Unit Toggle */}
            <button
              type="button"
              onClick={() => setUnit(u => (u === 'C' ? 'F' : 'C'))}
              className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700
                 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
                 hover:shadow-md transition"
              disabled={loading}
              title="Toggle °C / °F"
            >
              °{unit}
            </button>
          </div>

          <SearchHistory items={history} onSelect={handleSearch} />
        </div>


        {/* Error Message */}
        {error && (
          <div className="mb-6 animate-fade-in">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
              <p className="text-red-800 dark:text-red-200 text-center">
                ❌ {error}
              </p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20 animate-pulse">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading weather data...</p>
            </div>
          </div>
        )}

        {/* Weather Card */}
        {weather && !loading && (
          <div className="animate-slide-up">
            <WeatherCard weather={weather} unit={unit} />
            {forecast && forecast.forecasts && forecast.forecasts.length > 0 && (
              <Forecast days={forecast.forecasts} unit={unit} />
            )}
          </div>
        )}

        {/* Initial State */}
        {!weather && !loading && !error && (
          <div className="text-center py-20 animate-fade-in">
            <div className="text-6xl mb-4">🌍</div>
            <p className="text-gray-600 dark:text-gray-400 text-xl">
              Enter a city name to get started
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

