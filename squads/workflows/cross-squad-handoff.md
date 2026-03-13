---
name: cross-squad-handoff
description: Workflow de handoffs entre squads do Olimpo
version: 1.0.0
---

# Cross-Squad Handoff Workflow

## 1. Marketing → Vendas (MQL Handoff)
```
@mkt-head executa *handoff {leads}
  → Evento: lead_qualified
  → @vendas-sdr recebe e executa score-lead
  → Se score <40: nurture_return → volta para @mkt-email
```

## 2. Vendas → CS (Deal Closed Handoff)
```
@vendas-closer executa close-deal
  → Evento: deal_closed
  → @cs-head recebe briefing
  → Executa onboard-client
```

## 3. CS → Vendas (Upsell Handoff)
```
@cs-upsell detecta oportunidade
  → Evento: upsell_opportunity
  → @vendas-closer ou @vendas-sdr recebe
  → Inicia discovery-call com contexto do cliente
```

## 4. CS → Produto (Feedback Handoff)
```
@cs-retencao consolida feedback
  → Evento: feedback_collected
  → Futuro: @produto-pm adiciona ao backlog
```

## 5. Qualquer → OPS (Process Request)
```
Qualquer head executa *process-request
  → Evento: process_request
  → @ops-head faz triage
  → Inicia build-process-workflow
```

## 6. Qualquer → OPS (Escalation)
```
Qualquer agente detecta problema não resolvível
  → Evento: escalation
  → @ops-head avalia severidade
  → Se P1: Orion é notificado
```

## Regras de Handoff
1. Todo handoff tem schema definido (ver olympus-governance.md)
2. O squad receptor confirma recebimento
3. SLA de handoff: <2h para P1, <24h para P2+
4. Handoff sem schema = inválido
