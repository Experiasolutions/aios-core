---
workflow: warRoomPipeline
version: 1.0.0
responsavel: "@doom-mentor"
description: >
  Pipeline War Room WhatsApp: segmentar → micro-ofertas → Cash Pulses → medir.
  Ciclo de 24h com kill automático.
---
# Workflow: War Room Pipeline

## Visão Geral
Pipeline de disparo de micro-ofertas via War Room, com ciclo de 24h.

```
segment → create micro-offers → cash pulses → measure → [iterate or kill]
```

## Steps

### Step 1: Segment Contacts
- **Agent:** @doom-strategist
- **Task:** (inline) Segmentar contatos por dor + urgência
- **Input:** lista de contatos + dados de CRM
- **Output:** grupos segmentados por dor × urgência

### Step 2: Create Micro-Offers
- **Agent:** @doom-offers + @doom-copywriter
- **Tasks:** `build-micro-offer.md` + `rewrite-copy.md`
- **Input:** segmentos (Step 1)
- **Output:** 3 variações de copy × 3 ganchos × 3 CTAs

### Step 3: Tension & QG
- **Agent:** @doom-tension + @doom-master
- **Tasks:** `tension-copy.md` + `run-quality-gate.md`
- **Input:** micro-ofertas (Step 2)
- **Output:** ofertas aprovadas (score ≥ 8)

### Step 4: Launch Cash Pulses
- **Agent:** @doom-mentor
- **Task:** `launch-war-room.md`
- **Input:** ofertas aprovadas (Step 3) + janelas otimizadas
- **Output:** disparos em janelas de Cash Pulse

### Step 5: Measure & Iterate
- **Agent:** @doom-revenue
- **Task:** `analyze-revenue.md`
- **Input:** dados 24h de Cash Pulses
- **Output:** TTF$, Taxa de Aceite, ROI por grupo

### Decision Gate (24h)
- TTF$ dentro do SLO → **ESCALAR** (aumentar volume)
- TTF$ fora do SLO, Aceite < target → **ITERAR** (volta Step 2 com dados)
- Margem < threshold → **KILL** (encerrar campanha)
