---
task: discoveryOportunidade()
responsavel: "@produto-pm"
responsavel_type: Agent
atomic_layer: Task
elicit: true
Entrada:
  - campo: fonte
    tipo: string
    origem: User Input
    obrigatorio: true
    validacao: "cs-feedback | mercado | time | competidor"
  - campo: contexto
    tipo: string
    origem: User Input
    obrigatorio: true
Saida:
  - campo: hipotese
    tipo: object
    destino: backlog
  - campo: ice_score
    tipo: number
    destino: backlog
Checklist:
  - "[ ] Fonte identificada"
  - "[ ] Contexto documentado"
  - "[ ] Hipótese formulada"
  - "[ ] ICE score calculado"
  - "[ ] Adicionada ao backlog"
---

# Task: Discovery de Oportunidade

## Input
- [ ] Fonte da oportunidade (CS feedback, mercado, time, competidor)
- [ ] Contexto detalhado

## Processo
1. [ ] Registrar fonte e contexto
2. [ ] Pesquisar validação (dados, mercado, concorrência)
3. [ ] Formular hipótese: "Se [ação], então [resultado], medido por [métrica]"
4. [ ] Calcular ICE score:
   - **I**mpact (1-10): ___
   - **C**onfidence (1-10): ___
   - **E**ase (1-10): ___
   - **Score:** I × C × E = ___
5. [ ] Adicionar ao backlog priorizado
6. [ ] Se ICE ≥ 500: Flag como high-priority

## Output
- Hipótese documentada com ICE score
- Item adicionado ao backlog
