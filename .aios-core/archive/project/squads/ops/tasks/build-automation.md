---
task: buildAutomation()
responsavel: "@ops-automation"
responsavel_type: Agent
atomic_layer: Task
Entrada:
  - campo: task_definitions
    tipo: document
    origem: ops-architect (QG2 passed)
    obrigatorio: true
Saida:
  - campo: automacoes
    tipo: array
    destino: sistema
Checklist:
  - "[ ] Trigger configurado"
  - "[ ] Automações mapeadas"
  - "[ ] Testes executados"
  - "[ ] Documentação criada"
  - "[ ] QG3 submetido"
---

# Task: Build Automation

## Input
- [ ] Task Definitions do Architect (QG2 passed)

## Output
- Automações configuradas e testadas com:
  - Trigger + Condição + Ação
  - Log de qualidade
  - Documentação com exemplos

## Processo
1. [ ] Configurar trigger com etapas
2. [ ] Mapear cada automação individual
3. [ ] Definir condições e filtros
4. [ ] Testar automações antes de produção
5. [ ] Documentar cada automação com exemplos
6. [ ] Submeter ao Quality Gate 3
