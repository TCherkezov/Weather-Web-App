import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/weather/${encodeURIComponent(city)}`)
    return response.data
  } catch (error) {
    if (error.response) {
      // Server responded with error
      if (error.response.status === 404) {
        throw new Error(`City "${city}" not found. Please check the spelling.`)
      }
      throw new Error(error.response.data.detail || 'Failed to fetch weather data')
    } else if (error.request) {
      // Request made but no response
      throw new Error('Unable to connect to the server. Please check your connection.')
    } else {
      // Something else happened
      throw new Error('An unexpected error occurred')
    }
  }
}

export const fetchForecast = async (city) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/forecast/${encodeURIComponent(city)}`
    )
    return response.data
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error(`City "${city}" not found. Please check the spelling.`)
      }
      throw new Error(error.response.data.detail || 'Failed to fetch forecast data')
    } else if (error.request) {
      throw new Error('Unable to connect to the server. Please check your connection.')
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}


