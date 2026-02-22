---
task: generateReport()
responsavel: "@mkt-head"
responsavel_type: Agent
atomic_layer: Task
Entrada:
  - campo: periodo
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: campanhas_ativas
    tipo: array
    origem: sistema
    obrigatorio: true
Saida:
  - campo: relatorio
    tipo: document
    destino: arquivo
Checklist:
  - "[ ] Dados coletados de todas as plataformas"
  - "[ ] KPIs consolidados (CPL, CPA, ROAS, MQLs)"
  - "[ ] Comparação com metas"
  - "[ ] Top/bottom performers identificados"
  - "[ ] Recomendações de ajuste"
---

# Task: Gerar Relatório MKT

## Input
- [ ] Período de análise
- [ ] Campanhas ativas

## Output
- Relatório com métricas consolidadas

## KPIs Obrigatórios
1. CPL (Custo por Lead)
2. CPA (Custo por Aquisição)
3. ROAS (Return on Ad Spend)
4. MQLs gerados
5. Taxa de conversão por canal

## Processo
1. [ ] Coletar dados de todas as plataformas
2. [ ] Consolidar KPIs
3. [ ] Comparar com metas
4. [ ] Identificar top/bottom performers
5. [ ] Recomendar ajustes
