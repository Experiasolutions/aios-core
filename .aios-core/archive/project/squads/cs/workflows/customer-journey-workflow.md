---
name: customer-journey-workflow
description: Workflow da jornada do cliente (FigJam Customer Journey)
squad: cs
version: 1.0.0
---

# Customer Journey Workflow

## Fluxo
```
Deal Fechado (Vendas) → Onboarding → QG1 → Health Check → Engagement → QG2 → Upsell/Churn
```

## Steps

### Step 1: Onboarding
- **Agente:** `@cs-head` (coordena) + `@cs-engagement` (executa)
- **Input:** Cliente fechado (handoff de Vendas)
- **Ações:** Kick → Setup → First value delivery
- **Quality Gate 1:** Activation successful? (first value em <7 dias)
  - Sim: avança
  - Não: Refazer onboarding com ajustes

### Step 2: Health Monitoring
- **Agente:** `@cs-health` (monitora) + `@cs-retencao` (analisa)
- **Input:** Cliente ativo
- **Ações:** Health score semanal + Trend analysis
- **Contínuo:** Roda durante toda a vida do cliente

### Step 3: Engagement
- **Agente:** `@cs-engagement`
- **Input:** Clientes com queda de engajamento
- **Ações:** Contatos proativos, materials relevantes
- **Quality Gate 2:** Cliente engajado?
  - Sim: Verificar oportunidade de upsell
  - Não: Acionar churn prevention

### Step 4A: Upsell (paralelo)
- **Agente:** `@cs-upsell`
- **Trigger:** Cliente saudável + sinais de crescimento
- **Ação:** Identificar oportunidade → Handoff para `@vendas-closer`

### Step 4B: Churn Prevention (paralelo)
- **Agente:** `@cs-churn`
- **Trigger:** Health score baixo ou inatividade
- **Ação:** Plano de salvação → Oferta de retenção

### Suporte (paralelo a tudo)
- **Agente:** `@cs-suporte`
- **Trigger:** Ticket aberto a qualquer momento
- **Flow:** Triage → Resolve → Report
- **Se não resolvido:** Escalona para `@ops-head`

## Cross-Squad Handoffs
- **Vendas → CS:** `deal_closed` → onboard
- **CS → Vendas:** `upsell_opportunity` → closer
- **CS → Produto:** `feedback_collected` → product backlog
- **CS → OPS:** `escalation` → process improvement
