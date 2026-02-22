# Squad OPS

> Processos, automação e Quality Gates.

## Visão Geral

Squad central de operações responsável por mapear processos, projetar arquiteturas operacionais, construir automações e garantir qualidade via Quality Gates (>70%). Atua como a espinha dorsal que suporta todos os outros squads.

## Agentes

| Agente | Persona | Papel |
|--------|---------|-------|
| Athena | `ops-head` | AI Head — coordena demandas, prioriza, distribui |
| Cartographer | `ops-mapper` | Process Mapper — mapeia processos em fluxogramas |
| Blueprint | `ops-architect` | Architect — define estruturas e pipelines |
| Forge | `ops-automation` | Automation — configura triggers e automações |
| Gatekeeper | `ops-qa` | QA — valida Quality Gates (>70%) |

## Workflow Principal
```
Demanda → Mapper → Architect → Automation → QA (QG >70%) → ✅ Deploy
```

## Cross-Squad
- **Qualquer Squad → OPS:** `process_request` → mapear processo
- **OPS → Qualquer:** QA via `ops-qa` (Quality Gate compartilhado)
