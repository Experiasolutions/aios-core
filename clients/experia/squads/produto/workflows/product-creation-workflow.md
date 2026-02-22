---
name: product-creation-workflow
description: Workflow completo de criação de produto (FigJam Product Creation)
squad: produto
version: 1.0.0
---

# Product Creation Workflow

## Fluxo
```
Oportunidade → Discovery → Spec → QG1 → Criação → QG2 → QA → QG3 → Launch → Feedback Loop
```

## Steps

### Step 1: Discovery
- **Agente:** `@produto-pm` (Compass)
- **Input:** Oportunidade identificada OU feedback do CS
- **Output:** Hipótese validada + backlog item priorizado
- **Ação:** Pesquisa, brainstorm, ICE scoring

### Step 2: Especificação
- **Agente:** `@produto-pm` (Compass)
- **Input:** Item de backlog aprovado
- **Output:** Feature spec completa (usando `feature-spec-tmpl.md`)
- **Quality Gate 1:** Spec aprovada pelo Head?
  - Sim: avança para Criação
  - Não: Refinar spec

### Step 3: Criação
- **Agente:** `@produto-creator` (Canvas)
- **Input:** Feature spec aprovada
- **Output:** Conteúdo de produto criado (landing, tutorial, release notes)
- **Quality Gate 2:** Conteúdo completo e revisado?
  - Sim: avança para QA
  - Não: Continua criando

### Step 4: QA Produto
- **Agente:** `@ops-qa` (Gatekeeper) — do Squad OPS
- **Input:** Produto + material pronto
- **Output:** Validação final
- **Quality Gate 3:** Aprovado (score >70%)?
  - Sim: avança para Launch
  - Não: Volta para Creator

### Step 5: Launch
- **Agente:** `@produto-head` (Nova) — coordena
- **Input:** Produto aprovado no QA
- **Checklist:** `launch-readiness.md`
- **Ações:**
  - Notifica `@mkt-head` → criar campanha de lançamento
  - Notifica `@vendas-head` → atualizar material de vendas
  - Publica release notes

### Step 6: Feedback Loop (contínuo)
- **Agente:** `@cs-retencao` (Anchor)
- **Input:** Feedback dos clientes pós-lançamento
- **Output:** Insights priorizados → volta ao backlog do Produto

## Cross-Squad Handoffs
- **CS → Produto:** `feedback_collected` → backlog item
- **Produto → Marketing:** `product_launched` → campaign brief
- **Produto → Vendas:** `product_ready` → material atualizado
- **OPS → Produto:** QA via `ops-qa` (Quality Gate 3)
