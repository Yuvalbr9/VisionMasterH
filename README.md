# VisionMasterH

VisionMasterH is split into two top-level applications:

- `client`: React + TypeScript + Vite frontend
- `server`: ASP.NET Core Web API backend (HTTP only)

## Run both applications

### Option 1: PowerShell helper (recommended)

From the repository root:

```powershell
./start-dev.ps1
```

This script opens one PowerShell window for the API (using the `VisionMasterHController` launch profile, HTTP only) and one for the Vite client. It is the fastest way to start both apps for development.

### Option 2: Start each app manually

Client:

```powershell
Set-Location ./client
npm install
npm run dev
```

Server:

```powershell
Set-Location ./server
dotnet run
```

## Default local URLs

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5099` (HTTP only)
- OpenAPI document: `http://localhost:5099/openapi/v1.json`

## API endpoints

- `GET /api/v1/environment`
- `GET /api/v1/targets`
- `GET /api/v1/ownship`