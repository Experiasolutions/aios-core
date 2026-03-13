# 🏥 ExperIA Enterprise OS — Squad de Operação de Clínicas

Squad completo do AIOS para operação inteligente de clínicas. Transforma a visão da "Mente Mestre Experia" em agentes operacionais que orquestram vendas, atendimento, dados, segurança e automação.

## Objetivo

> **Agenda cheia + previsibilidade + redução de perda no WhatsApp + compliance LGPD**

## Agentes (Puppets)

| Agent | Persona | Slash Command | Escopo |
|-------|---------|---------------|--------|
| 🏥 `experia-master` | **Experia** | `/experia-master` | Orquestrador central |
| 📐 `experia-architect` | **Blueprint** | `/experia-architect` | Diagnóstico, jornada, planos |
| 💬 `experia-copy` | **Voz** | `/experia-copy` | Scripts WA, follow-ups, QA |
| 📊 `experia-data` | **Radar** | `/experia-data` | Métricas, dashboards, alertas |
| 🛡️ `experia-security` | **Sentinela** | `/experia-security` | LGPD Gate com veto |
| ⚙️ `experia-automations` | **Forge** | `/experia-automations` | Checklists, testes, rollback |
| 🔌 `experia-integrations` | **Nexus** | `/experia-integrations` | Eventos, dados, retries |
| ✅ `experia-validator` | **Vigil** | `/experia-validator` | Go/No-Go cross-puppet |

## Quick Start

```bash
# Ativar o Master e fazer onboarding de uma clínica
/experia-master
*onboard Clínica Nova

# Criar scripts de WhatsApp
/experia-copy
*script whatsapp odontologia

# Definir métricas
/experia-data
*metrics vendas
```

## Fluxo de Onboarding

1. **Master** recebe demanda → coleta brief
2. **Architect** diagnostica gargalos → desenha jornada
3. **Copy** cria scripts de atendimento → follow-ups
4. **Data** define métricas P0 → dashboards
5. **Integrations** desenha eventos → modelo de dados
6. **Automations** cria checklists → testes
7. **Security** avalia riscos → Gate LGPD
8. **Validator** relatório Go/No-Go → deploy

## Princípios

- 🎯 **Resultado > Tecnologia** — Clínica compra agenda cheia, não IA
- 🔒 **LGPD by default** — Minimização, mascaramento, veto real
- 📐 **MVP brutal** — 2 pilotos antes de virar sistema
- 🔄 **Versionamento** — Tudo é v1.x com changelog e rollback
- ⚡ **Automação confiável** — Idempotência, retries, modo manual
