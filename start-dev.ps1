$workspaceRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

Start-Process powershell -ArgumentList @(
  '-NoExit',
  '-Command',
  "Set-Location '$workspaceRoot\\server'; dotnet run"
)

Start-Process powershell -ArgumentList @(
  '-NoExit',
  '-Command',
  "Set-Location '$workspaceRoot\\client'; npm run dev"
)