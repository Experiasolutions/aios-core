---
name: Review Loop Operacional
steps:
  - id: collect_metrics
    step: Coletar métricas da semana
    task: define-metrics.md
    agent: experia-data
    args: { mode: report }

  - id: qa_conversas
    step: QA de conversas aleatórias
    task: create-wa-scripts.md
    agent: experia-copy
    args: { mode: qa }

  - id: validate_consistency
    step: Validar consistência cross-puppet
    task: validate-release.md
    agent: experia-validator

  - id: master_review
    step: Revisão final e ajuste de plano
    agent: experia-master
    args: { mode: review }
    depends_on: [collect_metrics, qa_conversas, validate_consistency]
---

# Workflow: Review Loop Operacional

Executado semanalmente para garantir qualidade e ajuste contínuo.

1. **Data** gera relatório de performance.
2. **Copy** faz QA de conversas reais.
3. **Validator** checa integridade do sistema.
4. **Master** revisa tudo e ajusta o plano da próxima semana.
