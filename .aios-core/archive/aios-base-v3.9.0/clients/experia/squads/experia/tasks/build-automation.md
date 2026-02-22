---
task: Build Automation
responsavel: "@experia-automations"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - fluxo: Fluxo a automatizar
  - ferramentas: Make.com / n8n / Zapier / custom
Saida: |
  - checklist: Implementação P0/P1
  - testes: Suite de test cases
  - rollback: Plano de rollback
  - monitoramento: Alertas e métricas
  - runbook: Modo manual
---

# *build — Construir Automação

## Camadas do Fluxo

1. Ingestão → recebe evento
2. Validação → checa contrato
3. Idempotência → dedupe_key
4. Enriquecimento → busca status
5. Decisão → regra de negócio
6. Ação → envia/atualiza
7. Registro → log + status
8. Monitoramento → alertas

## Test Cases P0

- Lead novo → cria + responde + registra SLA
- Lead responde → qualifica + propõe horários
- Lead some 24h → follow-up 1x
- Duplicidade → apenas 1 registro
- Falha destino → retry 3x + fila + alerta
- Conteúdo sensível → bloqueia + escala
