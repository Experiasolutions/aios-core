---
task: Define Metrics*
responsavel: "@experia-data"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - modulo: vendas | operacao | satisfacao
  - ferramentas: CRM / Planilha / Dashboard existente
Saida: |
  - metricas_p0: KPIs vitais com thresholds
  - alertas: Regras de alerta (crítico/atenção/info)
  - dashboard: Especificação de painel
---

# *metrics — Definir Métricas e KPIs

## Métricas P0 (Vitais)

| Métrica | Threshold Crítico | Saudável |
|---------|-------------------|----------|
| Conversão de Leads | <40% | >55% |
| SLA Resposta | >15 min | <5 min |
| No-show | >20% | <12% |
| Ocupação Agenda | <60% | >80% |
| Taxa Resposta | <90% | >97% |

## Alertas

- **Crítico:** SLA >15min 3x seguidas, Conversão <40% 2 dias
- **Atenção:** Qualquer P0 entre warning e critical por 1 dia
- **Info:** Acima da meta por 3 dias (comemorar!)
