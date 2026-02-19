# Experia — Onboarding

> Como configurar e trabalhar no client package da Experia.

---

## Pré-requisitos

1. Motor AIOS bootstrapped (confirme lendo [SELF_CONTEXT.md](../../.aios-core/opus-replicator/SELF_CONTEXT.md))
2. Node.js 18+ instalado
3. `npm install` executado na raiz do projeto
4. Evolution API configurada (ou mock para desenvolvimento)

---

## Variáveis de Ambiente

Adicione ao `.env` na raiz do projeto:

```bash
# === EXPERIA CLIENT PACKAGE ===

# Evolution API (WhatsApp gateway)
EVOLUTION_API_URL=https://api.evolution.ai
EVOLUTION_API_KEY=your-api-key-here
EVOLUTION_INSTANCE=your-instance-name

# WhatsApp Server
WHATSAPP_PORT=3005

# Session Store
SESSION_TTL=86400000   # 24h em ms

# Números de teste (separados por vírgula)
TEST_PHONES=5511999887766,5511888776655
```

---

## Como ativar os squads da Experia

Os squads estão em `clients/experia/squads/`:

```bash
# Ver squads disponíveis
ls clients/experia/squads/

# Squads:
#   experia/      → Clinic OS core (9 agents)
#   patient-ops/  → Jornada do paciente (18 agents)
#   clinical/     → Protocolos clínicos (6 agents)
```

Para ativar um agente Experia:
```bash
# Via workflow no Antigravity
@experia-master  # Ativa o master da Experia

# Via RP
# Leia: reasoning-packages/RP-EXPERIA-PHASE3.md
```

---

## RPs específicos da Experia

| RP | Descrição |
|:---|:---|
| [RP-EXPERIA-PHASE3.md](../../reasoning-packages/RP-EXPERIA-PHASE3.md) | WhatsApp Revenue Bridge |

---

## Documentação Experia

Todos os docs específicos em `clients/experia/docs/`:
- `experia-aios-integration.md` — integração com o motor
- `experia-battle-plan.md` — plano de go-to-market
- `experia-waas-strategy.md` — estratégia WaaS
- `experia-cheatsheet.md` — referência rápida
- `experia_agi_roadmap.md` — roadmap AGI
- `uipath-setup-guide.md` — integração UiPath
- E outros docs históricos
