---
task: launchProduct()
responsavel: "@produto-head"
responsavel_type: Agent
atomic_layer: Task
Entrada:
  - campo: produto
    tipo: object
    origem: QA aprovado
    obrigatorio: true
Saida:
  - campo: launch_status
    tipo: string
    destino: console
Checklist:
  - "[ ] Launch readiness checklist aprovada"
  - "[ ] Marketing notificado"
  - "[ ] Vendas notificado"
  - "[ ] Release notes publicadas"
  - "[ ] Feedback loop ativado"
---

# Task: Launch Product

## Input
- [ ] Produto aprovado no QA (QG3 passed)
- [ ] Checklist `launch-readiness.md` preenchida

## Processo
1. [ ] Validar checklist de launch readiness
2. [ ] Notificar `@mkt-head` → evento `product_launched`
3. [ ] Notificar `@vendas-head` → evento `product_ready`
4. [ ] Publicar release notes
5. [ ] Ativar monitoramento de feedback
6. [ ] Programar review pós-lançamento (D+7)

## Output
- Produto lançado
- Squads notificados
- Feedback loop ativo
