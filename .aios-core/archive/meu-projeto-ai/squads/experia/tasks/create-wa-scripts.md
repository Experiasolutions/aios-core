---
task: Create WhatsApp Scripts
responsavel: "@experia-copy"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - canal: WhatsApp / Instagram / Telefone
  - segmento: Tipo da clínica
  - servicos: Serviços oferecidos
Saida: |
  - scripts: Abertura → Qualificação → Horários → Confirmação
  - followup: Sequência 24/48/72
  - objecoes: Respostas para preço, indecisão, sumiço
  - faq: FAQs curtas para recepção
---

# *script — Criar Scripts de Atendimento

## Estrutura do Script

1. **Abertura** — Saudação + pergunta de intenção
2. **Qualificação** — Identificar serviço + preferência de horário
3. **Oferta de horários** — 2 opções (pergunta fechada)
4. **Confirmação** — Data + hora + endereço
5. **Follow-up** — 24h / 48h / 72h
6. **Escalonamento** — Quando parar e chamar humano

## Regras

- Mensagens curtas (1-3 linhas)
- Próximo passo sempre claro
- Sem prometer resultado clínico
- Sem urgência médica (escala humano)
- Anti-spam (respeitar opt-out)
