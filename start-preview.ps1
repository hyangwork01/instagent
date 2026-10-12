$ErrorActionPreference = 'Stop'
$siteRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
try {
    $response = Invoke-WebRequest -Uri 'http://127.0.0.1:4174/instagent/' -TimeoutSec 2
    if ($response.Content -match 'ScholarlyArticle' -and $response.Content -match 'InstAgent') {
        Write-Host 'InstAgent website: http://127.0.0.1:4174/instagent/'
        exit 0
    }
} catch {}
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
if ($nodeCommand) { $nodePath = $nodeCommand.Source } else {
    $nodePath = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
}
if (-not (Test-Path -LiteralPath $nodePath)) { throw 'Node.js is required to preview this site.' }
if (-not (Test-Path -LiteralPath (Join-Path $siteRoot 'dist\index.html'))) { throw 'Run npm ci and npm run build first.' }
$serverPath = Join-Path $siteRoot 'tools\serve.mjs'
Start-Process -FilePath $nodePath -ArgumentList ('"' + $serverPath + '"') -WorkingDirectory $siteRoot -WindowStyle Hidden -RedirectStandardOutput (Join-Path $siteRoot 'preview.log') -RedirectStandardError (Join-Path $siteRoot 'preview-error.log')
Write-Host 'InstAgent website: http://127.0.0.1:4174/instagent/'
