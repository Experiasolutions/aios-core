---
task: analyzeRevenue()
responsavel: "@doom-revenue"
responsavel_type: Agent
atomic_layer: Task
Entrada:
  - campo: periodo
    tipo: text
    origem: user
    obrigatorio: true
  - campo: dados_campanha
    tipo: document
    origem: doom-master / CRM
    obrigatorio: false
Saida:
  - campo: auto_pl
    tipo: document
    destino: doom-master (profit-check)
  - campo: replay_d1
    tipo: document
    destino: doom-mentor (action-plan)
  - campo: causal_roi
    tipo: document
    destino: doom-strategist (diagnose)
Checklist:
  - "[ ] Período definido e dados coletados"
  - "[ ] Auto-P&L por operação calculado"
  - "[ ] CCR++ executado (modelo causal + holdouts)"
  - "[ ] Causal ROI+ calculado (uplift, não last-click)"
  - "[ ] Replay Lab D+1 gerado"
  - "[ ] Unit Economics atualizados (CAC/LTV/Payback/Margem)"
  - "[ ] RICE 2.0 check (ética e vieses)"
---
# Task: Analyze Revenue

## Input
- [ ] Período de análise
- [ ] Dados de campanha/operação (se disponíveis)

## Processo
1. [ ] **Auto-P&L:** Calcular P&L por operação (campanha, oferta, canal, segmento)
2. [ ] **CCR++:** Executar modelo causal — uplift por coorte com holdouts geo/tempo
3. [ ] **Causal ROI+:** Calcular atribuição por uplift (não last-click)
4. [ ] **RevenueKG:** Atualizar grafo de experiência e EPM Scores
5. [ ] **Unit Economics:** Atualizar CAC/LTV/Payback/Margem/Churn por segmento
6. [ ] **Replay Lab D+1:** Gerar cenários para D+1 — onde alocar orçamento amanhã
7. [ ] **RICE 2.0:** Verificar vieses, discriminação e problemas éticos
8. [ ] **Alertas:** Flag se margem < threshold para Profit Firewall

## Output
- Auto-P&L atualizado por operação
- Replay Lab D+1 com plano de alocação
- Causal ROI+ com atribuição
- **Handoff → @doom-master:** para `profit-check`
