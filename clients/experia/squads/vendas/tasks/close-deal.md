---
task: closeDeal()
responsavel: "@vendas-closer"
responsavel_type: Agent
atomic_layer: Task
Entrada:
  - campo: discovery
    tipo: document
    origem: discovery-call (fit confirmado)
    obrigatorio: true
Saida:
  - campo: contrato
    tipo: document
    destino: CRM
  - campo: handoff_cs
    tipo: event
    destino: cs-head (deal_closed)
Checklist:
  - "[ ] Proposta gerada e enviada"
  - "[ ] Objeções tratadas"
  - "[ ] Aceite recebido"
  - "[ ] CRM atualizado"
  - "[ ] Handoff CS executado"
---
# Task: Close Deal
## Input
- [ ] Discovery completa com fit confirmado
## Processo
1. [ ] Gerar proposta usando `proposal-tmpl.md`
2. [ ] Enviar proposta
3. [ ] Tratar objeções finais
4. [ ] Negociar termos (se necessário)
5. [ ] Receber aceite
6. [ ] Registrar no CRM
7. [ ] **Handoff → CS:** Enviar para `@cs-head` com briefing do cliente
## Output
- Contrato assinado
- Dados registrados no CRM
- Handoff para CS executado
