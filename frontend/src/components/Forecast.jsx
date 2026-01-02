function Forecast({ days, unit }) {
    const toF = (c) => (c * 9) / 5 + 32
    const round1 = (n) => Math.round(n * 10) / 10
  
    const fmtDay = (dateStr) => {
      const d = new Date(dateStr + "T00:00:00")
      return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })
    }
  
    const iconUrl = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`
  
    return (
      <div className="mt-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
          5-Day Forecast
        </h3>
  
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {days.map((d) => {
            const min = unit === "F" ? toF(d.min_temp) : d.min_temp
            const max = unit === "F" ? toF(d.max_temp) : d.max_temp
  
            return (
              <div
                key={d.date}
                className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
                           rounded-xl p-4 text-center
                           border border-gray-200/50 dark:border-gray-700/50
                           shadow-lg"
              >
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {fmtDay(d.date)}
                </div>
  
                {d.icon && (
                  <img className="w-14 h-14 mx-auto" src={iconUrl(d.icon)} alt={d.description} />
                )}
  
                <div className="font-bold text-gray-800 dark:text-white">
                  {round1(max)}°{unit} / {round1(min)}°{unit}
                </div>
  
                <div className="text-xs text-gray-600 dark:text-gray-400 capitalize mt-1">
                  {d.description}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  
  export default Forecast
  