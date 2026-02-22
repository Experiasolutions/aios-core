---
name: marketing-campaign-workflow
description: Workflow completo de campanha de marketing (FigJam Marketing Campaign)
squad: marketing
version: 1.0.0
---

# Marketing Campaign Workflow

## Fluxo
```
Research → QG1 → Briefing → QG2 → Criação → Setup → Launch → QG3 → Report → QG4
```

## Steps

### Step 1: Research
- **Agentes:** `@mkt-head` + `@mkt-content`
- **Input:** Objetivo de negócio
- **Ações:** Competitive Analysis → Trend Hunting → Shape File
- **Quality Gate 1:** Pesquisa suficiente? → Sim: avança | Não: pesquise mais

### Step 2: Briefing + Planejamento
- **Agente:** `@mkt-head`
- **Input:** Insights de mercado
- **Output:** Briefing com folga estratégica, budget, target
- **Quality Gate 2:** Briefing completo? → Sim: avança | Não: COPY ajusta

### Step 3: Criação + Setup
- **Agentes:** `@mkt-content` (conteúdo) + `@mkt-traffic` (campanha) + `@mkt-email` (fluxo)
- **Ações paralelas:**
  - Content: Criar peças e copies
  - Traffic: Configurar campanh, audience, pixels
  - Email: Segmentar lista, criar automação
- **Verificação:** Tracking link configurado?

### Step 4: Launch + Report
- **Agente:** `@mkt-social` (publicar) + `@mkt-traffic` (ativar ads)
- **Input:** Conteúdos aprovados
- **Output:** Campanha no ar + Relatório primário
- **Quality Gate 3:** ROI inicial positivo? → Sim: Escala | Não: Otimiza ou para

### Step 5: Handoff MQL → Vendas
- **Agente:** `@mkt-head`
- **Ação:** Enviar leads qualificados (MQL) para `@vendas-sdr`
- **Quality Gate 4:** MQLs válidos? → Sim: ✅ HANDOFF | Não: refinar critério

## Regras
- Sem research = sem campanha
- Todo tracking link deve ser validado antes do launch
- MQL = lead com score ≥ 60 no critério definido
