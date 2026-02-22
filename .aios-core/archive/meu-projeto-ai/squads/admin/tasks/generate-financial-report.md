---
task: generateFinancialReport()
responsavel: "@admin-financeiro"
responsavel_type: Agent
atomic_layer: Task
Checklist:
  - "[ ] Dados consolidados"
  - "[ ] DRE gerada"
  - "[ ] Projeção atualizada"
  - "[ ] Report aprovado"
---

# Task: Gerar Report Financeiro

## Processo
1. [ ] Consolidar fluxo de caixa do período
2. [ ] Gerar DRE usando `report-financeiro-tmpl.md`
3. [ ] Calcular indicadores (margem, ROI, burn rate)
4. [ ] Comparar real vs orçado por squad
5. [ ] Atualizar projeções 3/6/12 meses
6. [ ] Aprovar com `@admin-head`
7. [ ] Compartilhar com Orion

## Output
- Report financeiro completo e validado
