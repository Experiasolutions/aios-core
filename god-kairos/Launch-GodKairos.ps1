<#
  GOD KAIROS - Multi-Terminal Launcher
  Abre multiplos terminais PowerShell com personas de agentes AIOX
  Otimizado para Celeron + 6GB RAM (CLI-first, minimal footprint)
#>

param(
    [string[]]$Agents = @(),
    [switch]$ListAgents,
    [switch]$LightMode
)

$WorkspacePath = "C:\Users\GABS\Documents\My KAIROS"
$ConfigPath = Join-Path $WorkspacePath "god-kairos\config.yaml"

$AllAgents = @{
    "architect" = @{
        Title = "ARCHITECT - Projetista"
        Color = "Cyan"
        Prompt = "Voce e o @architect do KAIROS. Seu workspace: $WorkspacePath. Leia .aiox-core/development/agents/architect.md para sua persona."
    }
    "dev" = @{
        Title = "DEV - Implementador"
        Color = "Green"
        Prompt = "Voce e o @dev do KAIROS. Seu workspace: $WorkspacePath. Leia .aiox-core/development/agents/dev.md para sua persona."
    }
    "devops" = @{
        Title = "DEVOPS - Infra e Deploy"
        Color = "Red"
        Prompt = "Voce e o @devops do KAIROS. Seu workspace: $WorkspacePath. Leia .aiox-core/development/agents/devops.md para sua persona."
    }
    "analyst" = @{
        Title = "ANALYST - Pesquisador"
        Color = "Magenta"
        Prompt = "Voce e o @analyst do KAIROS. Seu workspace: $WorkspacePath. Leia .aiox-core/development/agents/analyst.md para sua persona."
    }
    "qa" = @{
        Title = "QA - Qualidade"
        Color = "Yellow"
        Prompt = "Voce e o @qa do KAIROS. Seu workspace: $WorkspacePath. Leia .aiox-core/development/agents/qa.md para sua persona."
    }
    "pm" = @{
        Title = "PM - Gerente de Projeto"
        Color = "White"
        Prompt = "Voce e o @pm do KAIROS. Seu workspace: $WorkspacePath. Leia .aiox-core/development/agents/pm.md para sua persona."
    }
}

if ($ListAgents) {
    Write-Host "`n  GOD KAIROS - Agentes Disponiveis`n" -ForegroundColor Yellow
    foreach ($key in $AllAgents.Keys | Sort-Object) {
        $agent = $AllAgents[$key]
        Write-Host "  $key" -ForegroundColor $agent.Color -NoNewline
        Write-Host " - $($agent.Title)" -ForegroundColor Gray
    }
    Write-Host "`nUSO: .\Launch-GodKairos.ps1 -Agents dev,architect`n" -ForegroundColor Cyan
    return
}

if ($LightMode) {
    $SelectedAgents = @("dev", "devops")
    Write-Host "LIGHT MODE: abrindo apenas DEV + DEVOPS" -ForegroundColor Yellow
} elseif ($Agents.Count -gt 0) {
    $SelectedAgents = $Agents
} else {
    $SelectedAgents = @("architect", "dev", "devops", "analyst")
}

Write-Host "`n=======================================" -ForegroundColor Yellow
Write-Host "  GOD KAIROS - Multi-Terminal Launcher" -ForegroundColor Yellow
Write-Host "=======================================`n" -ForegroundColor Yellow

$GeminiCLI = Get-Command "gemini" -ErrorAction SilentlyContinue
$ClaudeCLI = Get-Command "claude" -ErrorAction SilentlyContinue
$CodexCLI  = Get-Command "codex" -ErrorAction SilentlyContinue

$AvailableCLI = "none"
if ($GeminiCLI) { $AvailableCLI = "gemini" }
elseif ($ClaudeCLI) { $AvailableCLI = "claude" }
elseif ($CodexCLI) { $AvailableCLI = "codex" }

Write-Host "CLI detectado: $AvailableCLI`n" -ForegroundColor Green

foreach ($agentId in $SelectedAgents) {
    if (-not $AllAgents.ContainsKey($agentId)) {
        Write-Host "Agente $agentId nao encontrado." -ForegroundColor Red
        continue
    }

    $agent = $AllAgents[$agentId]
    $windowTitle = "KAIROS [$agentId] $($agent.Title)"

    Write-Host "Abrindo terminal: $agentId ($($agent.Title))..." -ForegroundColor $agent.Color

    $initScript = "`$Host.UI.RawUI.WindowTitle = '$windowTitle'; Write-Host ''; Write-Host '=== GOD KAIROS ===' -ForegroundColor Yellow; Write-Host 'Agente: $($agent.Title)' -ForegroundColor $($agent.Color); Set-Location '$WorkspacePath';"

    if ($AvailableCLI -eq "gemini") {
        $initScript += " gemini --workspace '$WorkspacePath';"
    } elseif ($AvailableCLI -eq "claude") {
        $initScript += " claude --cwd '$WorkspacePath';"
    } elseif ($AvailableCLI -eq "codex") {
        $initScript += " codex --cwd '$WorkspacePath';"
    }

    Start-Process powershell -ArgumentList "-NoExit", "-Command", $initScript
    Start-Sleep -Milliseconds 1500
}

Write-Host "`nTodos os terminais abertos!`n" -ForegroundColor Green
