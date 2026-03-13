---
task: postDealLtv()
responsavel: "@doom-mentor"
responsavel_type: Agent
atomic_layer: Task
Entrada:
  - campo: deal
    tipo: document
    origem: doom-master / CRM
    obrigatorio: true
Saida:
  - campo: case_relampago
    tipo: document
    destino: doom-storyads (create-storyadd)
  - campo: upsell_agendado
    tipo: event
    destino: doom-offers (build-micro-offer)
  - campo: indicacao_bounty
    tipo: document
    destino: doom-mentor (war-room)
Checklist:
  - "[ ] Deal confirmado e dados do cliente carregados"
  - "[ ] Vitória em 5 min executada"
  - "[ ] Case Relâmpago criado"
  - "[ ] Upgrade/Upsell marcado"
  - "[ ] Indicação com bounty solicitada"
  - "[ ] Rastreio de coorte ativado"
---
# Task: Post-Deal LTV Lift

## Input
- [ ] Deal fechado com dados do cliente

## Processo — Pós-Aceite LTV Lift
1. [ ] **Vitória em 5 min:** Entrega rápida que valida imediatamente a decisão do cliente
2. [ ] **Case Relâmpago:** Criar mini case de sucesso com resultados iniciais
3. [ ] **Upgrade Marcado:** Identificar e agendar upsell/cross-sell em 7-14 dias
4. [ ] **Indicação com Bounty:** Pedido de indicação com recompensa por coorte e rastreio
5. [ ] **Rastreio por Coorte:** Ativar tracking de LTV, upsell rate e referral rate

## Output
- Case relâmpago para uso em StoryAds
- Upsell/cross-sell agendado
- Pedido de indicação com bounty
- **Handoff → @doom-storyads:** case para `create-storyadd`
- **Handoff → @doom-offers:** upsell para `build-micro-offer`
