---
task: discoveryCall()
responsavel: "@vendas-closer"
responsavel_type: Agent
atomic_layer: Task
Entrada:
  - campo: lead_qualificado
    tipo: object
    origem: qualify-lead (BANT 3+/4)
    obrigatorio: true
Saida:
  - campo: necessidades
    tipo: array
    destino: CRM
  - campo: objecoes
    tipo: array
    destino: CRM
  - campo: next_step
    tipo: string
    destino: CRM
Checklist:
  - "[ ] Rapport + contexto (2min)"
  - "[ ] Diagnóstico (5min)"
  - "[ ] Solução apresentada (5min)"
  - "[ ] Objeções tratadas (3min)"
  - "[ ] Próximos passos definidos (2min)"
---
# Task: Discovery Call
## Input
- [ ] Lead qualificado (BANT 3+/4)
## Roteiro
1. [ ] Introdução (2min): Rapport + contexto
2. [ ] Diagnóstico (5min): Entender dor e situação atual
3. [ ] Solução (5min): Apresentar proposta de valor
4. [ ] Objeções (3min): Tratar dúvidas
5. [ ] Próximos passos (2min): Agendar follow-up ou fechar
## Output
- Necessidades mapeadas
- Objeções registradas
- Next step definido
