# Squad Vendas

> Pipeline, qualificação e fechamento.

## Visão Geral

Squad responsável por converter MQLs em receita. Opera o pipeline completo de vendas: scoring, qualificação BANT, discovery call, negociação e fechamento. Faz handoff para CS após deal closed.

## Agentes

| Agente | Persona | Papel |
|--------|---------|-------|
| Titan | `vendas-head` | AI Head — pipeline, metas, bloqueios |
| Hunter | `vendas-sdr` | SDR — lead scoring, qualificação, first contact |
| Apex | `vendas-closer` | Closer — discovery, objeções, fechamento |

## Workflow Principal
```
MQL → Score → Qualify (BANT) → Discovery Call → Proposal → Close → CS Handoff
```

## Cross-Squad
- **Marketing → Vendas:** `lead_qualified` (MQL) → score-lead
- **Vendas → CS:** `deal_closed` → onboard-client
- **CS → Vendas:** `upsell_opportunity` → negociar expansão
