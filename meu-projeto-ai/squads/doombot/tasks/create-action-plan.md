---
task: createActionPlan()
responsavel: "@doom-mentor"
responsavel_type: Agent
atomic_layer: Task
elicit: true
Entrada:
  - campo: diagnostico
    tipo: document
    origem: diagnose-business
    obrigatorio: true
Saida:
  - campo: mission_brief
    tipo: document
    destino: squad (all agents)
  - campo: runbook
    tipo: document
    destino: doom-master (orchestrate)
Checklist:
  - "[ ] Diagnóstico recebido e validado"
  - "[ ] Mission Brief de 1 tela gerado"
  - "[ ] Deadlines definidos com donos"
  - "[ ] SLOs definidos (T1C, Aceite, Margem)"
  - "[ ] Riscos mapeados (máx. 6)"
  - "[ ] Runbook automático gerado"
  - "[ ] Próximos passos 15min definidos"
---
# Task: Create Action Plan

## Input
- [ ] Diagnóstico completo de `diagnose-business`

## Processo
1. [ ] **Validar diagnóstico:** Confirmar nós quentes e prioridades
2. [ ] **Mission Brief:** Gerar brief de 1 tela — Meta, SLOs, Riscos, Fontes, Orçamento
3. [ ] **Plano de ação:** Definir ações com deadline, dono e KPI alvo
4. [ ] **SLOs:** T1C (Tempo até 1ª Cobrança), Taxa Aceite, Margem mínima
5. [ ] **Runbook automático:** Converter plano em steps executáveis
6. [ ] **Riscos:** Mapear até 6 riscos com mitigações
7. [ ] **Próximos passos:** O que fazer nos próximos 15 minutos

## Output
- Mission Brief completo (1 tela)
- Plano de ação com deadlines e donos
- Runbook executável
- **Handoff → @doom-master:** para orchestrate com runbook
