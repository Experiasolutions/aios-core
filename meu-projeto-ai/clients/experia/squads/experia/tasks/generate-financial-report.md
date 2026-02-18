---
task: generateFinancialReport()
responsavel: "@experia-master"
responsavel_type: Agent
atomic_layer: Task
trigger: bridge
Entrada:
  - campo: period
    tipo: text
    obrigatorio: true
  - campo: data
    tipo: object
    obrigatorio: true
Saida:
  - campo: report
    tipo: object
    destino: UiPath via action.json
Checklist:
  - "[ ] Dados do período recebidos"
  - "[ ] Métricas calculadas"
  - "[ ] Relatório formatado"
---
# Task: Relatório Financeiro (Bridge)

> **Trigger:** UiPath `financial-report` → Bridge → esta task
> **Agent:** @experia-master (com frameworks Revenue Ops do Doombot)

## Métricas do Relatório

### KPIs Primários (ref: monetization-kpis.md)
- **Faturamento** do período
- **Ticket Médio** por procedimento
- **Taxa de Conversão** (leads → agendamentos → realizados)
- **CAC** (Custo de Aquisição por canal)
- **LTV estimado** por coorte

### Análise
- Top 3 procedimentos por receita
- Top 3 canais de aquisição
- Comparativo com período anterior (se disponível)
- Alertas: procedimentos com queda > 20%

## Output Format
```json
{
  "type": "generate_report",
  "payload": {
    "summary": "Resumo executivo em 3 frases",
    "metrics": { "faturamento": 0, "ticketMedio": 0, "conversao": 0 },
    "insights": ["insight 1", "insight 2"],
    "alerts": ["alerta se houver"]
  }
}
```
