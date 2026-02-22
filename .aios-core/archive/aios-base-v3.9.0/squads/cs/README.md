# Squad Customer Success

> Retenção, LTV e experiência pós-venda.

## Visão Geral

Squad responsável pela jornada pós-venda do cliente: onboarding, suporte, health check, engajamento proativo, detecção de upsell e prevenção de churn. Garante retenção e maximiza LTV.

## Agentes

| Agente | Persona | Papel |
|--------|---------|-------|
| Aegis | `cs-head` | AI Head — jornada, NPS, coordenação |
| Shield | `cs-suporte` | Suporte — tickets, escalação |
| Anchor | `cs-retencao` | Retenção — tendências, feedback |
| Vitals | `cs-health` | Health — score de saúde do cliente |
| Spark | `cs-engagement` | Engagement — contatos proativos |
| Growth | `cs-upsell` | Upsell — oportunidades de expansão |
| Guardian | `cs-churn` | Churn — retenção de clientes em risco |

## Workflow Principal
```
Onboarding → Health Check → Engage → Upsell/Churn Prevention → Feedback Loop
```

## Cross-Squad
- **Vendas → CS:** `deal_closed` → onboard-client
- **CS → Produto:** `feedback_collected` → backlog item
- **CS → Vendas:** `upsell_opportunity` → negociar expansão
