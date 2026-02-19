---
task: launchWarRoom()
responsavel: "@doom-mentor"
responsavel_type: Agent
atomic_layer: Task
elicit: true
Entrada:
  - campo: contatos_segmentados
    tipo: list
    origem: user / CRM
    obrigatorio: true
  - campo: dor_urgencia
    tipo: text
    origem: doom-strategist / user
    obrigatorio: true
Saida:
  - campo: micro_ofertas
    tipo: document
    destino: doom-copywriter (rewrite-copy)
  - campo: metricas_pulse
    tipo: document
    destino: doom-revenue (analyze-revenue)
Checklist:
  - "[ ] Contatos segmentados por dor + urgência"
  - "[ ] 3 variações de copy geradas"
  - "[ ] 3 ganchos + 3 CTAs preparados"
  - "[ ] Janelas de Cash Pulse definidas"
  - "[ ] Vida útil de 24h configurada"
  - "[ ] TTF$ (Tempo até 1ª Cobrança) sendo rastreado"
  - "[ ] Botão DOUG ativado (se necessário + compliance OK)"
---
# Task: Launch War Room

## Input
- [ ] Lista de contatos segmentados por dor + urgência
- [ ] Dor/urgência principal do grupo

## Processo
1. [ ] **Segmentação:** Agrupar contatos por dor + urgência + canal preferido
2. [ ] **Copy prep:** Gerar 3 variações de copy com 3 ganchos + 3 CTAs
3. [ ] **Frase-martelo:** Criar frase-martelo que ancora a oferta na dor
4. [ ] **Cash Pulses:** Definir janelas de disparo otimizadas (hora/dia)
5. [ ] **Vida útil 24h:** Configurar kill automático após 24h
6. [ ] **Botão DOUG:** Avaliar se ativar preset de guerra (compliance check)
7. [ ] **Métricas:** Iniciar tracking de TTF$ e Taxa de Aceite por grupo-piloto
8. [ ] **Monitorar:** Acompanhar resultados e ajustar em tempo real

## Output
- Micro-ofertas disparadas por War Room
- Métricas de Cash Pulse
- **Handoff → @doom-revenue:** para análise de impacto
