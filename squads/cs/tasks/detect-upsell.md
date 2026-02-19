---
task: detectUpsell()
responsavel: "@cs-upsell"
responsavel_type: Agent
atomic_layer: Task
Entrada:
  - campo: clientes_saudaveis
    tipo: array
    origem: health-check (score >80)
    obrigatorio: true
Saida:
  - campo: oportunidades
    tipo: array
    destino: CRM
  - campo: handoff_vendas
    tipo: event
    destino: vendas-closer (upsell_opportunity)
Checklist:
  - "[ ] Base escaneada para sinais"
  - "[ ] Oportunidade qualificada"
  - "[ ] Briefing preparado"
  - "[ ] Handoff para Vendas executado"
---
# Task: Detect Upsell
## Sinais de Oportunidade
- [ ] Cliente com health score >80 por >30 dias
- [ ] Uso próximo ao limite do plano atual
- [ ] Solicitou feature de plano superior
- [ ] Crescimento de equipe/volume
## Processo
1. [ ] Escanear base para sinais
2. [ ] Qualificar oportunidade
3. [ ] Preparar briefing com contexto do cliente
4. [ ] Handoff para `@vendas-closer` ou `@vendas-sdr`
