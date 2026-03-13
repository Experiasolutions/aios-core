---
name: quality-gate-70
description: Checklist padrão de Quality Gate (Score >70% para aprovação)
squad: ops
reusable: true
---

# Quality Gate — Score Mínimo 70%

## Critérios de Avaliação

| # | Critério | Peso | ✅/❌ |
|---|----------|------|-------|
| 1 | Requisitos atendidos conforme briefing | 30% | [ ] |
| 2 | Output no formato esperado (doc/fluxo/automação) | 20% | [ ] |
| 3 | Sem erros críticos ou inconsistências | 25% | [ ] |
| 4 | Documentação atualizada e clara | 15% | [ ] |
| 5 | Handoff claro para próxima etapa | 10% | [ ] |

## Cálculo
```
Score = Σ(critério_aprovado × peso)
Aprovado = Score ≥ 70%
```

## Resultado
- [ ] **APROVADO** (Score ≥ 70%) → Avança para próxima etapa
- [ ] **REPROVADO** (Score < 70%) → Retorna com feedback:
  - Critérios reprovados: ___
  - Ações corretivas: ___
  - Prazo: ___

## Regras
- Quem executa o QG: `@ops-qa` (Gatekeeper)
- Sem evidência = critério reprovado automaticamente
- Score é registrado para histórico
