---
task: processWhatsApp()
responsavel: "@experia-copy"
responsavel_type: Agent
atomic_layer: Task
trigger: bridge
Entrada:
  - campo: sender_name
    tipo: text
    obrigatorio: true
  - campo: message_text
    tipo: text
    obrigatorio: true
  - campo: chat_history
    tipo: list
    obrigatorio: false
Saida:
  - campo: action
    tipo: object
    destino: UiPath via action.json
Checklist:
  - "[ ] Mensagem recebida"
  - "[ ] Intenção classificada"
  - "[ ] Resposta gerada ou handoff"
---
# Task: Processar Mensagem WhatsApp (Bridge)

> **Trigger:** UiPath `whatsapp-autoreply` → Bridge → esta task
> **Agent:** @experia-copy

## Classificação de Intenção

| Intenção | Ação | Tipo |
|----------|------|------|
| Preço/Valor | Qualificar → perguntar contexto | `reply_message` |
| Agendamento | Oferecer horários disponíveis | `reply_message` |
| Cancelamento | Handoff para humano | `mark_as_unread` |
| Dúvida médica | Handoff para humano | `mark_as_unread` |
| Reclamação | Handoff para humano | `mark_as_unread` |
| Saudação | Responder com acolhimento + CTA | `reply_message` |
| Outros | Resposta genérica + oferta de ajuda | `reply_message` |

## Regras de Resposta (DoomMaster V5)
- Max 3 frases por resposta
- Tom: profissional + acolhedor
- NUNCA informar preço exato sem avaliação
- NUNCA dar conselho médico
- SEMPRE qualificar o lead antes de vender
- Se dor emocional detectada → handoff humano imediato

## Output Format
```json
{
  "type": "reply_message | mark_as_unread | schedule_appointment",
  "payload": { "text": "..." },
  "reasoning": "Classificação + justificativa"
}
```
