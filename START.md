# How to Run the Weather Website

## Quick Start (2 Terminals Required)

### Terminal 1: Backend Server

**Option A: Using venv directly (Recommended - avoids activation issues):**

1. Navigate to backend directory:
   ```powershell
   cd "H:\python\Weather app\backend"
   ```

2. Start the FastAPI server directly:
   ```powershell
   .\venv\Scripts\python.exe -m uvicorn main:app --reload --port 8000
   ```

**Option B: Activate venv first:**

1. Navigate to backend directory:
   ```powershell
   cd "H:\python\Weather app\backend"
   ```

2. Fix execution policy (if needed) and activate:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process -Force
   .\venv\Scripts\Activate.ps1
   ```

3. Start the FastAPI server:
   ```powershell
   uvicorn main:app --reload --port 8000
   ```

   ✅ Backend will run at: **http://localhost:8000**
   📚 API docs at: **http://localhost:8000/docs**

### Terminal 2: Frontend Server

1. Navigate to frontend directory:
   ```powershell
   cd "H:\python\Weather app\frontend"
   ```

2. Fix execution policy (if you get script errors):
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process -Force
   ```

3. Install dependencies (first time only):
   ```powershell
   npm install
   ```

4. Start the React development server:
   ```powershell
   npm run dev
   ```

**Note:** If you get execution policy errors, run step 2 first, then continue with steps 3-4.

   ✅ Frontend will run at: **http://localhost:5173**

## Open in Browser

Open **http://localhost:5173** in your web browser to see the weather app!

## Important Notes

- Keep both terminals running while using the app
- Make sure your `.env` file in `backend/` contains your API key:
  ```
  OPENWEATHER_API_KEY=your_api_key_here
  ```
- The backend must be running before the frontend can fetch weather data

## Troubleshooting PowerShell Execution Policy

If you encounter "running scripts is disabled" errors, run this command in your terminal:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process -Force
```

This sets the policy for the current PowerShell session only (safe and temporary).

