---
task: processFolha()
responsavel: "@admin-dp"
responsavel_type: Agent
atomic_layer: Task
Checklist:
  - "[ ] Ponto conferido"
  - "[ ] Horas extras validadas"
  - "[ ] Descontos aplicados"
  - "[ ] Folha calculada"
  - "[ ] Aprovada pelo Head"
---

# Task: Processar Folha de Pagamento

## Processo
1. [ ] Fechar ponto do mês
2. [ ] Conferir horas extras e adicional noturno
3. [ ] Aplicar descontos (VT, VR, faltas)
4. [ ] Calcular encargos (FGTS, INSS, IRRF)
5. [ ] Gerar folha
6. [ ] Aprovar com `@admin-head`
7. [ ] Enviar para pagamento

## Output
- Folha processada e pagamento agendado
