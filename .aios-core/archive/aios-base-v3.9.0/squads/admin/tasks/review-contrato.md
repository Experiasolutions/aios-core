---
task: reviewContrato()
responsavel: "@admin-juridico"
responsavel_type: Agent
atomic_layer: Task
Checklist:
  - "[ ] Cláusulas essenciais presentes"
  - "[ ] Compliance LGPD"
  - "[ ] Valores e prazos corretos"
  - "[ ] Revisado por admin-head"
---

# Task: Revisar Contrato

## Tipos
- [ ] CLT | [ ] PJ | [ ] Fornecedor | [ ] Cliente | [ ] Parceria

## Processo
1. [ ] Receber minuta ou usar `contrato-trabalho-tmpl.md`
2. [ ] Verificar cláusulas essenciais (objeto, valor, prazo, rescisão)
3. [ ] Validar compliance LGPD (dados pessoais, consentimento)
4. [ ] Conferir valores e condições de pagamento
5. [ ] Aprovar com `@admin-head`
6. [ ] Enviar para assinatura

## Output
- Contrato revisado e aprovado
