---
task: runQualityGate()
responsavel: "@ops-qa"
responsavel_type: Agent
atomic_layer: Task
Entrada:
  - campo: entrega
    tipo: document
    origem: Qualquer agente
    obrigatorio: true
  - campo: checklist
    tipo: string
    origem: quality-gate-70.md
    obrigatorio: true
Saida:
  - campo: score
    tipo: number
    destino: relatório
  - campo: resultado
    tipo: string
    destino: console
Checklist:
  - "[ ] Entrega recebida"
  - "[ ] Checklist aplicada"
  - "[ ] Score calculado"
  - "[ ] Resultado comunicado"
---

# Task: Run Quality Gate

## Input
- [ ] Entrega a ser validada
- [ ] Checklist aplicável (`quality-gate-70.md`)

## Output
- Score calculado
- Resultado: APROVADO ou REPROVADO
- Feedback com ações corretivas (se reprovado)

## Processo
1. [ ] Receber entrega + documentação
2. [ ] Aplicar checklist `quality-gate-70.md`
3. [ ] Pontuar cada critério (peso × aprovação)
4. [ ] Calcular score final
5. [ ] Se ≥70%: Aprovar e avançar
6. [ ] Se <70%: Rejeitar com feedback detalhado
