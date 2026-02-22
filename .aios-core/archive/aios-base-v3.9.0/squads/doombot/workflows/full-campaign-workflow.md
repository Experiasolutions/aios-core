---
workflow: fullCampaignPipeline
version: 1.0.0
responsavel: "@doom-master"
description: >
  Pipeline completo de campanha: do diagnóstico estratégico ao lançamento.
  Orquestra todos os agentes do DooMMasteRBot V5 em sequência otimizada.
---
# Workflow: Full Campaign Pipeline

## Visão Geral
Pipeline end-to-end para criar e lançar uma campanha completa de monetização.

```
diagnose → plan → offer → copy → tension → QG → launch → measure → LTV
```

## Steps

### Step 1: Diagnose Business
- **Agent:** @doom-strategist
- **Task:** `diagnose-business.md`
- **Input:** contexto do negócio, segmento, dores
- **Output:** diagnóstico, mapa de calor, KPI gaps
- **Gate:** Diagnóstico aprovado pelo DoomMaster

### Step 2: Create Action Plan
- **Agent:** @doom-mentor
- **Task:** `create-action-plan.md`
- **Input:** diagnóstico (Step 1)
- **Output:** Mission Brief + Runbook
- **Gate:** SLOs definidos e aceitos

### Step 3: Build Micro-Offer
- **Agent:** @doom-offers
- **Task:** `build-micro-offer.md`
- **Input:** mapa de calor (Step 1) + plan (Step 2)
- **Output:** oferta NMI 2.0 em 7 etapas + variantes Arena
- **Gate:** Price Lab Express validado

### Step 4: Rewrite Copy
- **Agent:** @doom-copywriter
- **Task:** `rewrite-copy.md`
- **Input:** oferta (Step 3)
- **Output:** copy brutal + changelog
- **Gate:** Linter score ≥ 8

### Step 5: Tension Copy
- **Agent:** @doom-tension
- **Task:** `tension-copy.md`
- **Input:** copy reescrito (Step 4)
- **Output:** copy tensionado + gatilhos
- **Gate:** Compliance check OK

### Step 6: Quality Gate
- **Agent:** @doom-master
- **Task:** `run-quality-gate.md`
- **Input:** copy tensionado (Step 5) + oferta (Step 3)
- **Output:** score por rubrica + decisão
- **Gate:** Score ≥ 8 em todas as rubricas + Juiz de Caixa OK
- **Loop:** Se REWRITE → volta para Step 4 ou 5 com feedback

### Step 7: Security Assessment
- **Agent:** @doom-security
- **Task:** `security-assessment.md`
- **Input:** campanha completa (Steps 3-5)
- **Output:** Red Team report + OPA gates + Privacy Budget
- **Gate:** Zero vulnerabilities críticas

### Step 8: Launch War Room
- **Agent:** @doom-mentor
- **Task:** `launch-war-room.md`
- **Input:** campanha aprovada + contatos segmentados
- **Output:** micro-ofertas disparadas + Cash Pulses
- **Gate:** TTF$ sendo rastreado

### Step 9: Analyze Revenue
- **Agent:** @doom-revenue
- **Task:** `analyze-revenue.md`
- **Input:** dados D+1 do War Room
- **Output:** Auto-P&L + Replay Lab + Causal ROI+
- **Gate:** Margem ≥ threshold (Profit Firewall)

### Step 10: Post-Deal LTV Lift
- **Agent:** @doom-mentor
- **Task:** `post-deal-ltv.md`
- **Input:** deals fechados
- **Output:** case + upsell + indicação
- **Gate:** Coorte tracking ativado
