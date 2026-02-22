# Squad Administração

> RH, Financeiro, Jurídico e Cultura Organizacional.

## Visão Geral

Squad responsável por todos os processos administrativos da empresa: gestão de pessoas, folha de pagamento, compliance jurídico, finanças e cultura organizacional. Suporta todos os outros squads.

## Agentes

| Agente | Persona | Papel |
|--------|---------|-------|
| Regent | `admin-head` | AI Head — coordena admin, prioriza demandas |
| People | `admin-rh` | RH — recrutamento, treinamento, avaliação |
| Payroll | `admin-dp` | DP — folha, benefícios, ponto |
| Vault | `admin-financeiro` | Financeiro — contas, fluxo de caixa, orçamento |
| Codex | `admin-juridico` | Jurídico — contratos, compliance, LGPD |
| Hearth | `admin-cultura` | Cultura — clima, rituais, engajamento |

## Workflow Principal
```
Demanda Admin → Triage → Execução → QG → ✅ Entrega
```

## Cross-Squad
- **Qualquer Squad → Admin:** `admin_request` → triage
- **Admin → OPS:** `process_request` → criar novo processo
