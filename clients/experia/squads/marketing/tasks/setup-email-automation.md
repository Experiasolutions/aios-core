---
task: setupEmailAutomation()
responsavel: "@mkt-email"
responsavel_type: Agent
atomic_layer: Task
Entrada:
  - campo: segmentacao
    tipo: object
    origem: mkt-head
    obrigatorio: true
  - campo: copy_emails
    tipo: array
    origem: mkt-content
    obrigatorio: true
Saida:
  - campo: fluxo_automacao
    tipo: object
    destino: plataforma_email
Checklist:
  - "[ ] Lista limpa (bounces removidos)"
  - "[ ] Segmentação aplicada"
  - "[ ] Lead scoring configurado"
  - "[ ] Fluxo de nurturing criado"
  - "[ ] Automação testada e ativada"
---

# Task: Setup Email Automation

## Input
- [ ] Segmentação definida
- [ ] Copy de emails (de mkt-content)

## Output
- Fluxo de automação ativo
- Lista segmentada e limpa
- Lead scoring configurado

## Processo
1. [ ] Limpar lista (remover bounces, inválidos)
2. [ ] Segmentar por comportamento
3. [ ] Configurar lead scoring
4. [ ] Criar fluxo de nurturing
5. [ ] Testar automação
6. [ ] Ativar
