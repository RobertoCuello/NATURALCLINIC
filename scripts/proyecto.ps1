param(
    [ValidateSet('ver', 'comprobar', 'instalar')]
    [string]$Accion = 'ver'
)
$ErrorActionPreference = 'Stop'
$taskRoot = Split-Path -Parent $PSScriptRoot
$taskRuntime = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies'
$taskNodeCommand = Get-Command node -ErrorAction SilentlyContinue
$taskNode = if ($taskNodeCommand) { $taskNodeCommand.Source } else { Join-Path $taskRuntime 'node\bin\node.exe' }
if (-not (Test-Path -LiteralPath $taskNode)) { throw 'No se encontró Node.js. Revisar el entorno antes de instalar herramientas.' }
$env:PATH = (Split-Path -Parent $taskNode) + ';' + $env:PATH
$taskPnpm = Join-Path $taskRuntime 'node\node_modules\pnpm\bin\pnpm.cjs'
$taskPnpmCommand = Get-Command pnpm -ErrorAction SilentlyContinue
function Invoke-ProjectPnpm {
    param([string[]]$TaskArgs)
    if (Test-Path -LiteralPath $taskPnpm) {
        & $taskNode $taskPnpm --dir (Join-Path $taskRoot 'sitio') @TaskArgs
    } elseif ($taskPnpmCommand) {
        & $taskPnpmCommand.Source --dir (Join-Path $taskRoot 'sitio') @TaskArgs
    } else { throw 'No se encontró pnpm. Revisar las rutas registradas en la wiki.' }
    if ($LASTEXITCODE -ne 0) { throw "El comando pnpm terminó con código $LASTEXITCODE." }
}
switch ($Accion) {
    'instalar' { Invoke-ProjectPnpm -TaskArgs @('install', '--frozen-lockfile', '--ignore-scripts') }
    'comprobar' {
        Invoke-ProjectPnpm -TaskArgs @('run', 'build')
        Invoke-ProjectPnpm -TaskArgs @('run', 'lint')
        Invoke-ProjectPnpm -TaskArgs @('peers', 'check')
    }
    'ver' {
        Write-Output 'Vista local: http://127.0.0.1:3000. Ctrl+C detiene el servidor.'
        Invoke-ProjectPnpm -TaskArgs @('run', 'dev')
    }
}
