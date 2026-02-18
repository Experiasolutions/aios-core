---
task: runHealthCheck()
responsavel: "@experia-validator"
responsavel_type: Agent
atomic_layer: Task
trigger: bridge
Entrada:
  - campo: systems
    tipo: list
    obrigatorio: true
Saida:
  - campo: report
    tipo: object
    destino: UiPath via action.json
Checklist:
  - "[ ] Sistemas verificados"
  - "[ ] Status coletado"
  - "[ ] Relatório gerado"
---
# Task: Health Check Operacional (Bridge)

> **Trigger:** UiPath `health-check` → Bridge → esta task
> **Agent:** @experia-validator

## Verificações

| Sistema | Check | Critério OK |
|---------|-------|-------------|
| WhatsApp Web | Sessão ativa | Conectado, sem erros |
| CRM/Agenda | Acessível | Login válido, dados recentes |
| AIOS Bridge | Funcionando | action.json gerado < 5s |
| UiPath Robots | Rodando | Último run < 1h |
| Backup | Atualizado | Último backup < 24h |

## Classificação

| Status | Significado |
|--------|-------------|
| 🟢 HEALTHY | Tudo operacional |
| 🟡 DEGRADED | 1-2 checks falharam (não críticos) |
| 🔴 CRITICAL | Check crítico falhou |

## Output Format
```json
{
  "type": "check_status",
  "payload": {
    "overall": "HEALTHY",
    "checks": [
      {"system": "whatsapp", "status": "ok", "detail": "Conectado"},
      {"system": "crm", "status": "ok", "detail": "Acessível"}
    ],
    "alerts": []
  }
}
```
