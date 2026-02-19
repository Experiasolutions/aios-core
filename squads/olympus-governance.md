# 🏛️ Olympus — Governance Layer

## Hierarquia

```yaml
olympus:
  sovereign: Orion (aios-master)
  description: |
    Orion supervisiona todos os squads. Pode intervir em qualquer squad,
    resolver conflitos entre squads e definir prioridades globais.

  squads:
    ops:
      head: Athena (ops-head)
      role: Arquiteta — define processos para todos os squads
      authority: Pode bloquear entregas via Quality Gate
      agents: [Cartographer, Blueprint, Forge, Gatekeeper]

    marketing:
      head: Pulse (mkt-head)
      role: Geração de demanda — alimenta Vendas com MQLs
      agents: [Ignite, Drip, Scribe, Prism]

    vendas:
      head: Titan (vendas-head)
      role: Pipeline e receita — converte MQLs em clientes
      agents: [Hunter, Apex]

    cs:
      head: Aegis (cs-head)
      role: Retenção e LTV — cuida da base pós-venda
      agents: [Shield, Anchor, Vitals, Spark, Growth, Guardian]

    produto:
      head: Nova (produto-head)
      role: Roadmap e inovação — cria e lança produtos
      agents: [Compass, Canvas]

    admin:
      head: Regent (admin-head)
      role: RH, Financeiro, Jurídico e Cultura
      agents: [People, Payroll, Vault, Codex, Hearth]

    facilities:
      head: Bastion (facilities-head)
      role: Infraestrutura física e manutenção
      agents: [Wrench, Circuit, Stock, Sentinel]

    experia:
      head: Master of Puppets
      role: Operação de clínicas — vertical especializada
      agents: [Architect, Copy, Data, Security, Automations, Integrations, Validator, Pulse]

  cross_squad_rules:
    - "OPS define processos, outros executam"
    - "Quality Gate >70% é inegociável"
    - "Todo handoff tem evento + schema"
    - "Conflitos escalam para Orion"
    - "Task-First: tarefas antes de agentes"
```

## Cross-Squad Handoff Events

| Evento | De | Para | Schema |
|--------|-----|------|--------|
| `lead_qualified` | Marketing → | Vendas | `{lead, score, source}` |
| `deal_closed` | Vendas → | CS | `{client, plan, closer, contract}` |
| `feedback_collected` | CS → | Produto | `{client, feedback, category}` |
| `product_launched` | Produto → | Marketing | `{product, features, target}` |
| `upsell_opportunity` | CS → | Vendas | `{client, opportunity, value}` |
| `process_request` | Qualquer → | OPS | `{requester, process, priority}` |
| `admin_request` | Qualquer → | Admin | `{requester, type, details}` |
| `escalation` | Qualquer → | OPS Head | `{source, issue, severity}` |
| `nurture_return` | Vendas → | Marketing | `{lead, reason, notes}` |

## Decision Tree (Roteamento)

```
Nova demanda chega →
  ├── Requer conexão externa? → OPS (Automation)
  ├── É um processo? → OPS (Mapper)
  ├── É campanha/conteúdo? → Marketing
  ├── É lead/venda? → Vendas
  ├── É cliente existente? → CS
  ├── É produto/feature? → Produto
  ├── É RH/financeiro/legal? → Admin
  └── Não se encaixa? → Orion decide
```
