---
workflow: copyReviewLoop
version: 1.0.0
responsavel: "@doom-master"
description: >
  Loop de revisão de copy: rewrite → tension → quality gate.
  Repete até score ≥ 8 em todas as rubricas do Crítico.
---
# Workflow: Copy Review Loop

## Visão Geral
Loop iterativo que garante que todo copy atinja SLO de qualidade antes de publicação.

```
rewrite → tension → QG → [se <8] → rewrite (com feedback)
                       → [se ≥8] → APROVADO ✅
```

## Steps

### Step 1: Rewrite Copy
- **Agent:** @doom-copywriter
- **Task:** `rewrite-copy.md`
- **Input:** copy original ou copy com feedback de loop anterior
- **Output:** copy reescrito + changelog

### Step 2: Tension Copy
- **Agent:** @doom-tension
- **Task:** `tension-copy.md`
- **Input:** copy reescrito (Step 1)
- **Output:** copy tensionado + gatilhos aplicados

### Step 3: Quality Gate
- **Agent:** @doom-master
- **Task:** `run-quality-gate.md`
- **Input:** copy tensionado (Step 2)
- **Output:** score por rubrica + decisão

### Decision Gate
- **Score ≥ 8 em todas as rubricas:** → **APROVADO ✅** → Fim do workflow
- **Score < 8 em qualquer rubrica:** → **REWRITE 🔄** → Volta para Step 1 com:
  - Feedback específico do Crítico
  - Rubricas que falharam
  - Sugestões de melhoria
- **Max loops:** 3 (se after 3 loops ainda < 8 → escalate para humano)

## SLOs
- Time per loop: ≤ 15 minutos
- Max loops: 3
- Final score: ≥ 8.0 em cada rubrica
