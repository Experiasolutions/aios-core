---
task: collectFeedback()
responsavel: "@produto-pm"
responsavel_type: Agent
atomic_layer: Task
Entrada:
  - campo: feedback_source
    tipo: string
    origem: cs-retencao
    obrigatorio: true
Saida:
  - campo: backlog_items
    tipo: array
    destino: backlog
Checklist:
  - "[ ] Feedback recebido e categorizado"
  - "[ ] Itens priorizados no backlog"
  - "[ ] Respondido ao CS"
---

# Task: Coletar e Processar Feedback

## Input
- [ ] Feedback consolidado do CS (`feedback_collected` event)

## Processo
1. [ ] Receber feedback do `@cs-retencao`
2. [ ] Categorizar: Bug | Feature Request | UX Issue | Elogio
3. [ ] Priorizar por volume e impacto
4. [ ] Adicionar itens ao backlog
5. [ ] Confirmar recebimento ao CS

## Output
- Itens de backlog criados com origem rastreada
