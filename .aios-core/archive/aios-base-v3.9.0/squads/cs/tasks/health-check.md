---
task: healthCheck()
responsavel: "@cs-health"
responsavel_type: Agent
atomic_layer: Task
Entrada:
  - campo: base_clientes
    tipo: array
    origem: CRM
    obrigatorio: true
Saida:
  - campo: health_scores
    tipo: array
    destino: CRM
  - campo: relatorio_semanal
    tipo: document
    destino: cs-head
Checklist:
  - "[ ] Métricas de uso coletadas"
  - "[ ] Health score calculado (0-100)"
  - "[ ] Classificação aplicada (🟢/🟡/🔴)"
  - "[ ] Alertas enviados (churn/upsell)"
  - "[ ] Relatório semanal gerado"
---
# Task: Health Check
## Processo
1. [ ] Coletar métricas de uso de todos os clientes
2. [ ] Calcular health score (0-100) por cliente
3. [ ] Classificar: 🟢 Saudável (>70) | 🟡 Atenção (40-70) | 🔴 Risco (<40)
4. [ ] Alertar `@cs-churn` para clientes 🔴
5. [ ] Alertar `@cs-upsell` para clientes 🟢 com sinais de crescimento
6. [ ] Gerar relatório semanal para `@cs-head`
