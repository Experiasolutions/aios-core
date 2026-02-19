---
name: Fluxo de Onboarding de Clínica
steps:
  - id: brief
    step: Coletar informações iniciais
    task: onboard-clinic.md
    agent: experia-master
    args: { elicitar: true }

  - id: diagnostico
    step: Diagnosticar gargalos
    task: diagnose-bottleneck.md
    agent: experia-architect
    depends_on: [brief]

  - id: plano
    step: Criar plano operacional
    task: onboard-clinic.md
    agent: experia-master
    args: { mode: plan }
    depends_on: [diagnostico]

  - id: setup_security
    step: Avaliação de Segurança Inicial
    task: security-assessment.md
    agent: experia-security
    depends_on: [plano]

  - id: delegate
    step: Delegar tarefas iniciais
    description: O Master delega para Copy, Data e Integrations conforme o plano
    agent: experia-master
    depends_on: [setup_security]
---

# Workflow: Onboarding de Clínica

Este workflow orquestra a entrada de uma nova clínica no Experia OS.

1. **Master** coleta o brief.
2. **Architect** faz o diagnóstico.
3. **Master** consolida o plano.
4. **Security** valida o setup inicial.
5. **Master** delega a execução.
