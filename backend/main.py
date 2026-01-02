from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import requests
from dotenv import load_dotenv
from typing import Optional
from pathlib import Path
from datetime import datetime
from collections import defaultdict
from typing import List

# Load environment variables
ENV_PATH = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=ENV_PATH, override=True)
API_KEY = os.getenv("OPENWEATHER_API_KEY")

app = FastAPI(title="Weather API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DailyForecast(BaseModel):
    date: str
    min_temp: float
    max_temp: float
    description: str
    icon: Optional[str] = None

class ForecastResponse(BaseModel):
    city: str
    country: str
    forecasts: List[DailyForecast]

class WeatherResponse(BaseModel):
    city: str
    country: str
    temperature: float
    description: str
    feels_like: float
    humidity: int
    wind_speed: float
    pressure: int
    icon: Optional[str] = None


@app.get("/")
def read_root():
    return {"message": "Weather API is running"}


@app.get("/api/weather/{city}", response_model=WeatherResponse)
async def get_weather(city: str):
    """
    Get weather information for a city
    """
    if not API_KEY:
        raise HTTPException(status_code=500, detail="API key not configured")
    
    url = 'https://api.openweathermap.org/data/2.5/weather'
    params = {
        'appid': API_KEY,
        'q': city,
        'units': 'metric'
    }
    
    try:
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        return WeatherResponse(
            city=data['name'],
            country=data['sys']['country'],
            temperature=round(data['main']['temp'], 1),
            description=data['weather'][0]['description'],
            feels_like=round(data['main']['feels_like'], 1),
            humidity=data['main']['humidity'],
            wind_speed=round(data['wind']['speed'], 1),
            pressure=data['main']['pressure'],
            icon=data['weather'][0]['icon']
        )
        
    except requests.exceptions.HTTPError as err:
        if err.response is not None and err.response.status_code == 404:
            raise HTTPException(status_code=404, detail=f"City '{city}' not found")
        raise HTTPException(status_code=500, detail=f"API Error: {str(err)}")
    except requests.exceptions.RequestException as err:
        raise HTTPException(status_code=503, detail="Weather service unavailable")
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(err)}")

@app.get("/api/forecast/{city}", response_model=ForecastResponse)
async def get_forecast(city: str):
    if not os.getenv("OPENWEATHER_API_KEY"):
        raise HTTPException(status_code=500, detail="API key not configured")

    url = "https://api.openweathermap.org/data/2.5/forecast"
    params = {
        "appid": os.getenv("OPENWEATHER_API_KEY"),
        "q": city,
        "units": "metric",
    }

    try:
        r = requests.get(url, params=params, timeout=10)
        r.raise_for_status()
        data = r.json()

        # Group 3-hour entries by date
        grouped = defaultdict(list)
        for item in data["list"]:
            dt = datetime.fromtimestamp(item["dt"])
            day = dt.strftime("%Y-%m-%d")
            grouped[day].append(item)

        days_out = []
        for day, items in sorted(grouped.items())[:5]:
            temps = [x["main"]["temp"] for x in items]
            min_t = round(min(temps), 1)
            max_t = round(max(temps), 1)

            # pick a "representative" entry around midday if possible
            chosen = items[len(items) // 2]
            desc = chosen["weather"][0]["description"]
            icon = chosen["weather"][0].get("icon")

            days_out.append(DailyForecast(
                date=day,
                min_temp=min_t,
                max_temp=max_t,
                description=desc,
                icon=icon
            ))

        return ForecastResponse(
            city=data["city"]["name"],
            country=data["city"]["country"],
            forecasts=days_out
        )

    except requests.exceptions.HTTPError as err:
        if err.response is not None and err.response.status_code == 404:
            raise HTTPException(status_code=404, detail=f"City '{city}' not found")
        raise HTTPException(status_code=502, detail=f"Upstream API error: {str(err)}")
    except requests.exceptions.RequestException:
        raise HTTPException(status_code=503, detail="Weather service unavailable")



@app.get("/health")
def health_check():
    api_key = os.getenv("OPENWEATHER_API_KEY")
    return {
        "status": "healthy",
        "api_key_configured": bool(api_key),
        "env_path": str(ENV_PATH),
        "env_exists": ENV_PATH.exists(),
        "cwd": os.getcwd(),
    }


