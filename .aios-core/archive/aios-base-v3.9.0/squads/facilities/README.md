# Squad Facilities

> Infraestrutura física, manutenção e TI.

## Visão Geral

Squad responsável por toda a infraestrutura física: manutenção predial, almoxarifado, TI (hardware e rede), portaria e segurança patrimonial. Garante que o ambiente físico suporte as operações de todos os squads.

## Agentes

| Agente | Persona | Papel |
|--------|---------|-------|
| Bastion | `facilities-head` | AI Head — coordena infra física |
| Wrench | `facilities-manutencao` | Manutenção predial e equipamentos |
| Circuit | `facilities-ti` | TI — hardware, rede, infraestrutura digital |
| Stock | `facilities-almoxarifado` | Almoxarifado — inventário e suprimentos |
| Sentinel | `facilities-seguranca` | Segurança patrimonial e monitoramento |

## Workflow Principal
```
Chamado → Triage → Execução → Verificação → ✅ Fechado
```

## Cross-Squad
- **Admin → Facilities:** Setup de estação para novo colaborador
- **Qualquer → Facilities:** Chamado de manutenção ou TI
