---
name: module-expansion
description: Expansão modular pós-Turno de Receita
owner: experia-master
participants:
  - experia-architect (diagnóstico de gargalo)
  - experia-data (métricas de estabilidade)
  - experia-validator (Go/No-Go para expansão)
elicit: true
---

# Expansão Modular — Pós-Receita

## Pré-Requisito Obrigatório
Turno de Receita estável por 7 dias consecutivos:
- [ ] SLA de resposta consistente
- [ ] Conversas gerando tentativa de agendamento
- [ ] Rotina de confirmação/remarcação rodando
- [ ] Relatório semanal sendo entregue

## Identificação do Módulo (Por Sinais)

| Sinal do Cliente | Módulo | Ação |
|-------------------|--------|------|
| "Preciso de mais demanda / IG morto" | A) Demanda Leve | Sprint 7D |
| "Equipe bagunçada / depende de 1 pessoa" | B) Operação Interna | Sprint 10D |
| "Não recebo / inadimplência" | C) Financeiro | Sprint 7D |
| "Quero acompanhar como gestor" | D) Gestão | Sprint 7D |

**Regra:** Escolher UM módulo por vez. Nunca dois.

## Processo
1. [ ] @experia-data: Confirmar estabilidade do Turno de Receita
2. [ ] @experia-architect: Diagnosticar gargalo principal
3. [ ] Usar frase padrão de transição (ver KB seção 3)
4. [ ] Gerar proposta usando `expansion-proposal-tmpl.md`
5. [ ] @experia-validator: Go/No-Go da expansão
6. [ ] Se aprovado: iniciar Sprint de Expansão

## Pitch de Transição
"Agora que a Receita tá sob controle, o próximo gargalo é **[X]**.
Instalo em 10 dias como Sprint de Expansão.
Depois, se quiser manter, vira operação mensal.
A clínica não cresce com 'mais gente'. Cresce com processo."
