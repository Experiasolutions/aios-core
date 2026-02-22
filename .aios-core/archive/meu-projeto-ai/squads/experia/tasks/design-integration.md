---
task: Design Integration
responsavel: "@experia-integrations"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - fontes: Canais de entrada (WA, IG, Site)
  - destinos: CRM, Planilha, Agenda
  - modulo: vendas | operacao | reativacao
Saida: |
  - schema: Modelo de dados mínimo
  - eventos: Taxonomia P0/P1
  - contratos: Payloads por evento
  - retry_policy: Retries e circuit breaker
  - blueprint: Diagrama fonte→destino
---

# *map — Design de Integração

## Modelo de Dados MVP

### Obrigatórios
- `lead_id`, `channel`, `created_at`, `updated_at`
- `contact_handle` (mascarado), `first_name`
- `intent`, `status`, `owner`

### Proibidos
- Dados de saúde, CPF, identificadores sensíveis

## Eventos P0

| Evento | Descrição |
|--------|-----------|
| `lead_created` | Novo contato |
| `first_response_sent` | Primeira resposta |
| `lead_qualified` | Intenção definida |
| `appointment_proposed` | Horários oferecidos |
| `appointment_booked` | Agendamento confirmado |
| `lead_lost` | Desistência |
| `followup_scheduled` | Follow-up programado |
| `followup_sent` | Follow-up enviado |

## Retry Policy

3 tentativas: 1min → 5min → 15min → Fila + Alerta
