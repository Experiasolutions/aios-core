---
task: runMaintenance()
responsavel: "@experia-automations"
responsavel_type: Agent
atomic_layer: Task
trigger: bridge
Entrada:
  - campo: scope
    tipo: text
    obrigatorio: true
Saida:
  - campo: report
    tipo: object
    destino: UiPath via action.json
Checklist:
  - "[ ] Escopo definido"
  - "[ ] Tarefas de manutenção executadas"
  - "[ ] Relatório gerado"
---
# Task: Manutenção Preventiva (Bridge)

> **Trigger:** UiPath `preventive-maintenance` → Bridge → esta task
> **Agent:** @experia-automations

## Tarefas de Manutenção

| Tarefa | Frequência | Prioridade |
|--------|-----------|------------|
| Limpar logs antigos (> 30 dias) | Semanal | Normal |
| Verificar espaço em disco | Diário | Alta |
| Backup de configurações AIOS | Semanal | Alta |
| Verificar atualizações de dependências | Mensal | Normal |
| Rotacionar API keys (se configurado) | Mensal | Alta |
| Limpar cache de sessões expiradas | Diário | Normal |

## Ações Automáticas vs Manuais

| Ação | Automática? | Requer confirmação? |
|------|------------|-------------------|
| Limpar logs | ✅ Sim | Não |
| Backup | ✅ Sim | Não |
| Limpar cache | ✅ Sim | Não |
| Atualizar deps | ❌ Não | Sim → `send_alert` |
| Rotacionar keys | ❌ Não | Sim → `send_alert` |

## Output Format
```json
{
  "type": "generate_report",
  "payload": {
    "tasks_completed": ["logs_cleaned", "backup_done"],
    "tasks_pending": ["deps_update"],
    "disk_space_free_gb": 45.2,
    "next_maintenance": "2026-02-21T08:00:00Z"
  }
}
```
