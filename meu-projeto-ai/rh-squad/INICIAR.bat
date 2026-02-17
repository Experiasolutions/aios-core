@echo off
echo.
echo ===============================================
echo   AIOS Orion — Departamento de RH
echo   Instalador Automatico
echo ===============================================
echo.

REM Check Node.js
where node >nul 2>&1
if errorlevel 1 (
    echo [!] Node.js nao encontrado.
    echo     Baixe em: https://nodejs.org
    echo     Instale a versao LTS e rode este script novamente.
    pause
    exit /b 1
)

echo [OK] Node.js encontrado
for /f "tokens=*" %%i in ('node -v') do echo      Versao: %%i
echo.

REM Install dependencies
echo [1/3] Instalando dependencias...
call npm install --production >nul 2>&1
echo      Pronto!
echo.

REM Check .env
if not exist .env (
    echo [2/3] Criando arquivo de configuracao...
    copy .env.example .env >nul
    echo.
    echo ===============================================
    echo   ATENCAO: Configure o arquivo .env
    echo ===============================================
    echo.
    echo   Abra o arquivo ".env" nesta pasta e preencha:
    echo   1. CLICKUP_API_KEY = peca ao Gabriel
    echo   2. GROQ_API_KEY = peca ao Gabriel
    echo.
    echo   Depois rode: npm start
    echo.
    pause
    exit /b 0
) else (
    echo [2/3] Configuracao encontrada
)

echo.
echo [3/3] Iniciando o AIOS RH...
echo.
node rh-agent.js
pause
