# Local Bridge Setup
## Addendum ao ANTIGRAVITY-CODESPACES-MASTER-GUIDE.md

> Permite que o Antigravity no Codespaces execute comandos
> no terminal da sua máquina local.

## Como funciona

Fluxo completo:

  CODESPACES (cloud)
  Antigravity -> execute_local("ls") -> codespaces-tunnel.js -> WebSocket (wss://ngrok...)
                                                                    |
                                                                    v
  MÁQUINA LOCAL
  ngrok -> ws://localhost:8765 -> local-bridge.js -> Terminal -> Output -> WebSocket Response

## Setup inicial (uma vez, ~5 minutos)

### Passo 1 — Gerar token de autenticação
Execute NO CODESPACES:
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
Copie o token gerado. Guarde bem — você vai usar nos dois lados.

### Passo 2 — Criar .env.bridge
NO CODESPACES:
  cp .env.bridge.example .env.bridge
Edite e cole o token em BRIDGE_TOKEN.
Deixe BRIDGE_WS_URL em branco por enquanto.

NA MÁQUINA LOCAL:
  cp .env.bridge.example .env.bridge
Edite e cole o MESMO token em BRIDGE_TOKEN.

### Passo 3 — Instalar ngrok (máquina local, se não tiver)
  npm install -g ngrok
  # ou: https://ngrok.com/download

## Uso diário (~30 segundos para ativar)

NA MÁQUINA LOCAL (1 comando):
  bash scripts/start-local-bridge.sh

O script:
  1. Inicia o local-bridge.js
  2. Inicia o ngrok automaticamente
  3. Exibe a URL: wss://xxxx.ngrok-free.app

NO CODESPACES:
Abra .env.bridge e atualize BRIDGE_WS_URL com a URL do ngrok.

PRONTO. Teste no Codespaces:
  node scripts/codespaces-tunnel.js "whoami"
  node scripts/codespaces-tunnel.js "node --version"

## Troubleshooting

❌ "BRIDGE_WS_URL não configurado"
   → Atualize .env.bridge com a URL atual do ngrok

❌ "Local Bridge não respondeu em 8s"
   → Execute bash scripts/start-local-bridge.sh na máquina local

❌ "Token inválido"
   → BRIDGE_TOKEN deve ser idêntico em ambos os lados

❌ "URL do ngrok mudou"
   → Ngrok free tier gera URL nova a cada restart
   → Atualize BRIDGE_WS_URL no .env.bridge do Codespaces
