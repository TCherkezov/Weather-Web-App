# Quick Start Guide

## Step 1: Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

Or if using `py` on Windows:
```bash
cd backend
py -m pip install -r requirements.txt
```

## Step 2: Set Up Environment Variables

Create a `.env` file in the `backend` directory:
```
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

Get your free API key from: https://openweathermap.org/api

## Step 3: Start Backend Server

```bash
cd backend
uvicorn main:app --reload --port 8000
```

Or with `python -m`:
```bash
cd backend
python -m uvicorn main:app --reload --port 8000
```

The API will run at: http://localhost:8000
API docs at: http://localhost:8000/docs

## Step 4: Install Frontend Dependencies

Open a new terminal:
```bash
cd frontend
npm install
```

## Step 5: Start Frontend Server

```bash
cd frontend
npm run dev
```

The app will open at: http://localhost:5173

## That's it! 🎉

Open http://localhost:5173 in your browser and start searching for weather!

