---
task: onboardColaborador()
responsavel: "@admin-rh"
responsavel_type: Agent
atomic_layer: Task
Entrada:
  - campo: colaborador
    tipo: object
    origem: Recrutamento aprovado
    obrigatorio: true
Saida:
  - campo: status
    tipo: string
    destino: console
Checklist:
  - "[ ] Contrato assinado"
  - "[ ] Documentação completa"
  - "[ ] Acessos criados"
  - "[ ] Onboarding cultural concluído"
  - "[ ] Buddy definido"
---

# Task: Onboarding de Colaborador

## Input
- [ ] Dados do novo colaborador
- [ ] Contrato assinado (de admin-juridico)

## Processo
1. [ ] Coletar documentação pessoal
2. [ ] Criar acessos (email, ferramentas, sistemas)
3. [ ] Definir buddy/mentor
4. [ ] Agendar onboarding cultural com `@admin-cultura`
5. [ ] Apresentar ao time
6. [ ] Entregar kit de boas-vindas
7. [ ] First check-in (D+3)
8. [ ] QG2: Onboarding completo?

## Output
- Colaborador integrado e com first value entregue
