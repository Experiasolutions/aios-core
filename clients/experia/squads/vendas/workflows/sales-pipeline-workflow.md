---
name: sales-pipeline-workflow
description: Workflow completo do pipeline de vendas (FigJam Sales Pipeline)
squad: vendas
version: 1.0.0
---

# Sales Pipeline Workflow

## Fluxo
```
MQL (do MKT) → SDR Score → QG1 → Discovery → QG2 → Proposal → Close → QG3 → ✅ HANDOFF CS
```

## Steps

### Step 1: Lead Scoring + Qualification
- **Agente:** `@vendas-sdr`
- **Input:** Lead vem do Marketing (MQL)
- **Output:** Lead Score (0-100) + Qualification BANT
- **Quality Gate 1:** Lead qualificado (score ≥60 + BANT)? → Sim: avança | Não: Descarta ou Nurture (volta MKT)

### Step 2: Discovery Call
- **Agente:** `@vendas-closer`
- **Input:** Lead qualificado
- **Output:** Necessidades mapeadas, fit confirmado
- **Quality Gate 2:** Lead confirmed qualified? → Sim: avança | Não: Volta pro SDR

### Step 3: Proposal + Negotiation + Close
- **Agente:** `@vendas-closer`
- **Input:** Discovery completa
- **Ações:** Gerar proposta → Negociar → Fechar
- **Quality Gate 3:** Deal fechado?
  - Sim: ✅ VENDA → Handoff para CS (`@cs-head`)
  - Não: `@vendas-head` registra motivos → Lead volta para Nurture (MKT)

## Cross-Squad Handoffs
- **MKT → Vendas:** Evento `lead_qualified`, input para `@vendas-sdr`
- **Vendas → CS:** Evento `deal_closed`, input para `@cs-head`
- **Vendas → MKT:** Lead não-qualificado retorna como nurture

## Regras
- Lead parado >48h = alerta para `@vendas-head`
- Todo lead descartado deve ter motivo registrado
- Forecast atualizado após cada QG
