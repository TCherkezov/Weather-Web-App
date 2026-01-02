function WeatherCard({ weather, unit }) {
  const getWeatherIcon = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`
  }

  const getGradientClass = (temp) => {
    if (temp >= 30) return 'from-orange-500 to-red-500'
    if (temp >= 20) return 'from-yellow-400 to-orange-500'
    if (temp >= 10) return 'from-blue-400 to-cyan-500'
    return 'from-blue-500 to-indigo-600'
  }

  const toF = (c) => (c * 9) / 5 + 32
  const round1 = (n) => Math.round(n * 10) / 10

  const tempValue = unit === 'F' ? toF(weather.temperature) : weather.temperature
  const feelsValue = unit === 'F' ? toF(weather.feels_like) : weather.feels_like

  const tempDisplay = round1(tempValue)
  const feelsDisplay = round1(feelsValue)

  // Keep gradient thresholds in °C
  const gradientTempForScale = unit === 'F' ? (tempValue - 32) * 5 / 9 : tempValue

  const detailCards = [
    { label: 'Feels Like', value: `${feelsDisplay}°${unit}`, icon: '🌡️' },
    { label: 'Humidity', value: `${weather.humidity}%`, icon: '💧' },
    { label: 'Wind Speed', value: `${weather.wind_speed} m/s`, icon: '💨' },
    { label: 'Pressure', value: `${weather.pressure} hPa`, icon: '📊' },
  ]

  return (
    <div className="glass dark:glass-dark rounded-3xl p-8 shadow-2xl">
      {/* Main Weather Info */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
            {weather.city}, {weather.country}
          </h2>
        </div>

        <div className={`inline-block p-6 rounded-2xl bg-gradient-to-br ${getGradientClass(gradientTempForScale)} mb-4`}>
          <div className="flex items-center justify-center gap-4">
            {weather.icon && (
              <img
                src={getWeatherIcon(weather.icon)}
                alt={weather.description}
                className="w-24 h-24"
              />
            )}
            <div>
              <div className="text-7xl font-bold text-white">
                {tempDisplay}°{unit}
              </div>
            </div>
          </div>
        </div>

        <p className="text-2xl text-gray-600 dark:text-gray-300 capitalize">
          {weather.description}
        </p>
      </div>

      {/* Detail Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {detailCards.map((detail, index) => (
          <div
            key={index}
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
                       rounded-xl p-6 text-center
                       border border-gray-200/50 dark:border-gray-700/50
                       hover:scale-105 transition-transform duration-200
                       shadow-lg hover:shadow-xl"
          >
            <div className="text-4xl mb-2">{detail.icon}</div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
              {detail.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {detail.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeatherCard
