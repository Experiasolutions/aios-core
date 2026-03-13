---
task: researchMarket()
responsavel: "@mkt-content"
responsavel_type: Agent
atomic_layer: Task
Entrada:
  - campo: objetivo_campanha
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: segmento_alvo
    tipo: string
    origem: User Input
    obrigatorio: true
Saida:
  - campo: competitive_analysis
    tipo: document
    destino: arquivo
  - campo: insights
    tipo: array
    destino: shape_file
Checklist:
  - "[ ] Análise competitiva (3-5 concorrentes)"
  - "[ ] Tendências identificadas"
  - "[ ] Dores do ICP mapeadas"
  - "[ ] Shape file compilado"
  - "[ ] QG1: Pesquisa suficiente?"
---

# Task: Pesquisa de Mercado

## Input
- [ ] Objetivo da campanha
- [ ] Vertical/segmento alvo

## Output
- Competitive analysis
- Trend hunting report
- Shape file com insights

## Processo
1. [ ] Análise competitiva (3-5 concorrentes)
2. [ ] Identificar tendências do segmento
3. [ ] Mapear dores do ICP
4. [ ] Compilar insights em shape file
5. [ ] Quality Gate 1: Pesquisa suficiente?
