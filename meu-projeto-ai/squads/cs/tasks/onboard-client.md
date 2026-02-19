---
task: onboardClient()
responsavel: "@cs-head"
responsavel_type: Agent
atomic_layer: Task
Entrada:
  - campo: briefing_cliente
    tipo: document
    origem: vendas-closer (deal_closed)
    obrigatorio: true
  - campo: contrato
    tipo: document
    origem: vendas-closer
    obrigatorio: true
Saida:
  - campo: cliente_ativo
    tipo: object
    destino: CRM
  - campo: health_score_inicial
    tipo: number
    destino: CRM
Checklist:
  - "[ ] Onboarding brief preparado"
  - "[ ] Kick-off agendado e executado"
  - "[ ] Setup técnico completo"
  - "[ ] First value entregue (<7 dias)"
  - "[ ] QG1: Activation successful?"
---
# Task: Onboard Client
## Input
- [ ] Briefing do cliente (de vendas-closer)
- [ ] Contrato assinado
## Processo
1. [ ] Preparar usando `onboarding-brief-tmpl.md`
2. [ ] Agendar kick-off call
3. [ ] Executar kick-off
4. [ ] Setup técnico (acessos, integrações)
5. [ ] Entregar first value em <7 dias
6. [ ] QG1: Activation successful?
## Output
- Cliente ativo com first value entregue
- Health score inicial registrado
