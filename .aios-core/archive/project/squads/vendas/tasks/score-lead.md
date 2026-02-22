---
task: scoreLead()
responsavel: "@vendas-sdr"
responsavel_type: Agent
atomic_layer: Task
Entrada:
  - campo: lead_data
    tipo: object
    origem: CRM / MKT handoff
    obrigatorio: true
    validacao: "nome, empresa, cargo, canal"
Saida:
  - campo: lead_score
    tipo: number
    destino: CRM
  - campo: classificacao
    tipo: string
    destino: CRM
Checklist:
  - "[ ] Dados do lead completos"
  - "[ ] Scoring calculado (0-100)"
  - "[ ] Classificação aplicada (Qualificado/Nurture/Descarta)"
---
# Task: Score Lead
## Input
- [ ] Dados do lead (nome, empresa, cargo, canal)
## Output
- Lead Score (0-100)
## Critérios de Scoring
| Critério | Peso | Score |
|----------|------|-------|
| Fit com ICP (vertical, tamanho) | 30 | ___/30 |
| Engajamento (abriu email, clicou) | 20 | ___/20 |
| Budget declarado | 20 | ___/20 |
| Urgência (timeline) | 15 | ___/15 |
| Authority (decisor?) | 15 | ___/15 |
## Resultado
- Score ≥ 60: Qualificado → avança
- Score 40-59: Nurture → volta MKT
- Score < 40: Descarta
