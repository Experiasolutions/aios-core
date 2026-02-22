---
name: build-process-workflow
description: Workflow completo de construção de processos (FigJam Build Process)
squad: ops
version: 1.0.0
---

# Build Process Workflow

## Fluxo
```
Mapper → QG1 → Architect → QG2 → Automation → QG3 → QA → QG4 → ✅ ENTREGA
```

## Steps

### Step 1: Discovery + Mapeamento
- **Agente:** `@ops-mapper`
- **Input:** Pedido de mapeamento (de qualquer squad)
- **Output:** Fluxograma do processo (Mermaid)
- **Quality Gate 1:** Score >70%? → Sim: avança | Não: volta Discovery

### Step 2: Design Architecture
- **Agente:** `@ops-architect`
- **Input:** Fluxograma aprovado
- **Output:** Estrutura de entidades, campos, tags, status
- **Quality Gate 2:** Score >70%? → Sim: avança | Não: volta Architecture

### Step 3: Automação
- **Agente:** `@ops-automation`
- **Input:** Task Definitions do Architect
- **Output:** Automações configuradas e testadas
- **Quality Gate 3:** Score >70%? → Sim: avança | Não: volta Task Definitions

### Step 4: Validação Final
- **Agente:** `@ops-qa`
- **Input:** Automações + Documentação
- **Output:** Aprovação ou rejeição
- **Quality Gate 4 (FINAL):** Score >70%? → Sim: ✅ ENTREGA | Não: volta ponto falho

## Regras
- Cada Quality Gate usa `quality-gate-70.md`
- Score <70% = retorna à etapa anterior com feedback
- Cada etapa documenta seu output antes de pedir validação
