---
task: qualifyLead()
responsavel: "@vendas-sdr"
responsavel_type: Agent
atomic_layer: Task
Entrada:
  - campo: lead_scored
    tipo: object
    origem: score-lead (score >= 60)
    obrigatorio: true
Saida:
  - campo: bant_result
    tipo: object
    destino: CRM
  - campo: classificacao
    tipo: string
    destino: CRM
Checklist:
  - "[ ] Budget verificado"
  - "[ ] Authority confirmada"
  - "[ ] Need validada"
  - "[ ] Timeline definida"
  - "[ ] Resultado BANT registrado"
---
# Task: Qualify Lead (BANT)
## Input
- [ ] Lead com score ≥ 60
## Critérios BANT
- [ ] **B**udget: Tem orçamento? R$ ___
- [ ] **A**uthority: É o decisor? ___
- [ ] **N**eed: Tem necessidade real? ___
- [ ] **T**imeline: Prazo para decisão? ___
## Resultado
- 4/4 BANT: Hot lead → Closer
- 3/4 BANT: Warm lead → Closer (prioridade baixa)
- ≤2/4 BANT: Nurture → MKT
