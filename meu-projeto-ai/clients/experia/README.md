# Experia — Client Package

> **WaaS (Workforce-as-a-Service)** para clínicas e consultórios médicos.
> Primeiro client package do motor AIOS. Projeto de Gabriel.

---

## O QUE É

A Experia é uma plataforma de operação inteligente para clínicas que usa
o motor AIOS como substrato. Ela automatiza:
- Atendimento ao paciente via WhatsApp (chatbot + auto-agendamento)
- Gestão operacional (finanças, RH, marketing, compliance)
- Geração de receita via leads e retenção

**Modelo:** WaaS — a clínica contrata a Experia como sua "equipe invisível"
que opera 24/7 via agentes de IA especializados.

---

## STACK ESPECÍFICO

| Componente | Tecnologia |
|:---|:---|
| Canal principal | WhatsApp (Evolution API) |
| Gateway | Evolution API / Z-API |
| Agendamento | Calendar API (futuro) |
| Pagamentos | Gateway a definir |
| CRM | JSON Storage → futuro CRM |

---

## SQUADS ATIVOS

| Squad | Agents | Foco |
|:---|:---:|:---|
| `squads/experia/` | 9 | Clinic OS core |
| `squads/patient-ops/` | 18 | Jornada do paciente |
| `squads/clinical/` | 6 | Protocolos clínicos |

Todos em `clients/experia/squads/`.

---

## COMO ATIVAR

1. Certifique-se de que o motor AIOS está bootstrapped ([SELF_CONTEXT.md](../../.aios-core/opus-replicator/SELF_CONTEXT.md))
2. Configure as variáveis de ambiente no `.env` (ver [ONBOARDING.md](ONBOARDING.md))
3. Ative os squads Experia: `node scripts/whatsapp-server.js`
4. Consulte os RPs Experia: [RP-EXPERIA-PHASE3.md](../../reasoning-packages/RP-EXPERIA-PHASE3.md)

---

## ARQUIVOS CHAVE

| Arquivo | Propósito |
|:---|:---|
| [EXPERIA-ENTERPRISE-ARCHITECTURE.md](EXPERIA-ENTERPRISE-ARCHITECTURE.md) | Arquitetura empresarial completa |
| [ONBOARDING.md](ONBOARDING.md) | Setup e variáveis de ambiente |
| `squads/experia/squad.yaml` | Manifest do squad principal |
| `docs/` | Docs específicos (strategy, integrations, blueprints) |

---

## PRÓXIMAS FASES

1. **Phase 3: WhatsApp Revenue Bridge** — session-store, intent-classifier, response-builder, auto-reply
2. **Phase 4: Calendar + Payments** — agendamento real + cobrança
3. **Phase 5: Multi-clinic** — suporte a múltiplas clínicas simultâneas
