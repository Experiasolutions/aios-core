---
task: diagnoseBusiness()
responsavel: "@doom-strategist"
responsavel_type: Agent
atomic_layer: Task
elicit: true
Entrada:
  - campo: negocio_desc
    tipo: text
    origem: user
    obrigatorio: true
  - campo: segmento
    tipo: text
    origem: user
    obrigatorio: true
  - campo: receita_atual
    tipo: number
    origem: user
    obrigatorio: false
  - campo: dores
    tipo: text
    origem: user
    obrigatorio: false
Saida:
  - campo: diagnostico
    tipo: document
    destino: doom-mentor (create-action-plan)
  - campo: mapa_calor
    tipo: document
    destino: doom-offers (build-micro-offer)
  - campo: kpi_gaps
    tipo: document
    destino: doom-revenue (analyze-revenue)
Checklist:
  - "[ ] Contexto coletado (negócio, segmento, receita, dores)"
  - "[ ] Entidades mapeadas (personas, dores, canais, concorrentes)"
  - "[ ] Mapa de Calor de Valor plotado (persona × dor × urgência × facilidade)"
  - "[ ] 3 nós quentes identificados (menor ponte até caixa)"
  - "[ ] Recomendações acionáveis geradas com timebox 7 dias"
  - "[ ] KPIs e SLOs definidos para tracking"
  - "[ ] North-Star definida por operação"
---
# Task: Diagnose Business

## Input
- [ ] Descrição do negócio e contexto completo
- [ ] Segmento de atuação
- [ ] Receita atual (se disponível)
- [ ] Dores principais identificadas pelo cliente

## Processo
1. [ ] **Coleta de contexto:** Elicitar informações completas (negócio, segmento, receita, dores, canais, equipe)
2. [ ] **Mapeamento de entidades:** Listar personas, dores por persona, canais ativos, concorrentes
3. [ ] **Mapa de Calor de Valor:** Plotar grafo `persona-dor × urgência × disposição_a_pagar × facilidade_de_entrega`
4. [ ] **Identificar nós quentes:** Selecionar top 3 nós com menor ponte até caixa em 7 dias
5. [ ] **NMI Assessment:** Avaliar nicho + ativo principal + canal atual → score de viabilidade
6. [ ] **CCR++ rápido:** Se dados históricos disponíveis, rodar modelo causal de receita
7. [ ] **KPI Audit:** Comparar métricas atuais vs KPIs canônicos (T1C, Aceite, Margem)
8. [ ] **Gerar recomendações:** Ações acionáveis com timebox, dono e KPI alvo
9. [ ] **Definir North-Star:** Métrica única que governa sucesso da operação

## Output
- Diagnóstico estratégico completo
- Mapa de Calor de Valor com nós quentes
- Gap analysis de KPIs
- Recomendações acionáveis em 7 dias
- **Handoff → @doom-mentor:** para `create-action-plan` com diagnóstico
- **Handoff → @doom-offers:** para `build-micro-offer` com mapa de calor
