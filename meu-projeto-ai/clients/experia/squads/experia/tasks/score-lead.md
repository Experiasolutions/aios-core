---
task: scoreLead()
responsavel: "@experia-master"
responsavel_type: Agent
atomic_layer: Task
trigger: bridge
Entrada:
  - campo: lead_data
    tipo: object
    obrigatorio: true
Saida:
  - campo: score
    tipo: object
    destino: UiPath via action.json
Checklist:
  - "[ ] Dados do lead recebidos"
  - "[ ] Score calculado"
  - "[ ] Prioridade atribuída"
---
# Task: Lead Scoring (Bridge)

> **Trigger:** UiPath `lead-scoring` → Bridge → esta task
> **Agent:** @experia-master (com referência ao NMI do Doombot)

## Critérios de Scoring

| Critério | Peso | Pontos |
|----------|------|--------|
| Tem procedimento específico | 30% | 0-10 |
| Já fez procedimento antes | 20% | 0-10 |
| Respondeu em < 1h | 15% | 0-10 |
| Perguntou preço (intenção de compra) | 20% | 0-10 |
| Histórico de conversas (engajamento) | 15% | 0-10 |

## Classificação

| Score | Prioridade | Ação |
|-------|-----------|------|
| 8-10 | 🔴 HOT | Contato imediato, oferecer agenda |
| 5-7 | 🟡 WARM | Nurture com conteúdo + follow-up 24h |
| 0-4 | 🟢 COLD | Adicionar a lista de broadcast |

## Output Format
```json
{
  "type": "score_lead",
  "payload": {
    "score": 8.5,
    "priority": "HOT",
    "recommended_action": "Contato imediato",
    "tags": ["botox", "primeira-vez", "preço-sensível"]
  }
}
```
