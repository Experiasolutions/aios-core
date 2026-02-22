---
task: runQualityGate()
responsavel: "@doom-master"
responsavel_type: Agent
atomic_layer: Task
Entrada:
  - campo: entregavel
    tipo: document
    origem: any agent
    obrigatorio: true
  - campo: tipo
    tipo: text
    origem: auto-detect
    obrigatorio: true
Saida:
  - campo: score
    tipo: number
    destino: doom-master (decision)
  - campo: aprovado
    tipo: boolean
    destino: doom-master (decision)
  - campo: feedback
    tipo: document
    destino: origin agent (rewrite if needed)
Checklist:
  - "[ ] Entregável recebido com tipo identificado"
  - "[ ] Pipeline Planner→Solver→Crítico executado"
  - "[ ] 7 rubricas avaliadas (score 0-10 cada)"
  - "[ ] Score global calculado"
  - "[ ] Juiz de Caixa aplicado (P(aceite) × margem × payback)"
  - "[ ] Profit Firewall checado"
  - "[ ] Decisão: APROVADO (≥8) / REWRITE (<8)"
  - "[ ] Feedback detalhado para rewrite (se necessário)"
---
# Task: Run Quality Gate

## Input
- [ ] Entregável para avaliação (copy, oferta, storyadd, script, etc.)
- [ ] Tipo do entregável (auto-detectado)

## Processo — Cérebro de Cobrança
1. [ ] **Planner:** Analisar o entregável e definir expectativas
2. [ ] **Solver:** Avaliar execução contra expectativas
3. [ ] **Crítico:** Avaliar 7 rubricas com score 0-10:

### Rubricas
| # | Rubrica | Descrição | Min Score |
|---|---------|-----------|-----------|
| 1 | Clareza | Mensagem clara e sem ambiguidade | 8 |
| 2 | Promessa | Promessa específica e crível | 8 |
| 3 | Prova | Evidência que suporta a promessa | 8 |
| 4 | Preço | Preço justificado e ancorado | 8 |
| 5 | Prazo | Urgência real (não artificial) | 8 |
| 6 | CTA | Call-to-action claro e acionável | 8 |
| 7 | Objeções | Objeções antecipadas e tratadas | 8 |

4. [ ] **Juiz de Caixa:** Calcular `P(aceite) × margem × payback`
5. [ ] **Profit Firewall:** Verificar se margem esperada ≥ threshold
6. [ ] **Decisão:**
   - Score ≥ 8 em todas → **APROVADO** ✅
   - Score < 8 em qualquer → **REWRITE** 🔄 (feedback específico)
   - Margem < threshold → **BLOCK** 🚫 (Profit Firewall)

## Output
- Score por rubrica + score global
- Decisão (APROVADO / REWRITE / BLOCK)
- Feedback detalhado para rewrite
- **Se REWRITE:** → Handoff de volta para agent de origem com feedback
- **Se BLOCK:** → Handoff para @doom-master para decisão
