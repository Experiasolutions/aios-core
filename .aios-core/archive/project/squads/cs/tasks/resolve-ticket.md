---
task: resolveTicket()
responsavel: "@cs-suporte"
responsavel_type: Agent
atomic_layer: Task
Entrada:
  - campo: ticket
    tipo: object
    origem: Cliente / Sistema
    obrigatorio: true
Saida:
  - campo: resolucao
    tipo: document
    destino: ticket_system
  - campo: tempo_resolucao
    tipo: number
    destino: métricas
Checklist:
  - "[ ] Triage: Severidade classificada (P1/P2/P3)"
  - "[ ] Problema documentado"
  - "[ ] Causa investigada"
  - "[ ] Solução aplicada"
  - "[ ] Resolução confirmada com cliente"
---
# Task: Resolve Ticket
## Input
- [ ] Ticket com descrição do problema
## Processo
1. [ ] Triage: Classificar severidade (P1/P2/P3)
2. [ ] Documentar problema
3. [ ] Investigar causa
4. [ ] Aplicar solução
5. [ ] Confirmar resolução com cliente
6. [ ] Se não resolvível: Escalonar para `@ops-head`
## Output
- Ticket resolvido e documentado
- Tempo de resolução registrado
