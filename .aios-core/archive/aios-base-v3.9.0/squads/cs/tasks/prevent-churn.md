---
task: preventChurn()
responsavel: "@cs-churn"
responsavel_type: Agent
atomic_layer: Task
Entrada:
  - campo: clientes_risco
    tipo: array
    origem: health-check (score <40)
    obrigatorio: true
Saida:
  - campo: resultado_retencao
    tipo: string
    destino: CRM
  - campo: motivo_churn
    tipo: string
    destino: Produto (feedback)
Checklist:
  - "[ ] Causa raiz investigada"
  - "[ ] Plano de salvação criado"
  - "[ ] Cliente contatado"
  - "[ ] Condições de retenção oferecidas"
  - "[ ] Acompanhamento 7 dias"
  - "[ ] Resultado registrado"
---
# Task: Prevent Churn
## Triggers
- [ ] Health score <40
- [ ] Inatividade >14 dias
- [ ] Solicitação de cancelamento
## Processo
1. [ ] Investigar causa raiz
2. [ ] Criar plano de salvação personalizado
3. [ ] Contatar cliente (call ou WhatsApp)
4. [ ] Oferecer condições de retenção (se aprovado por cs-head)
5. [ ] Acompanhar por 7 dias
6. [ ] Registrar resultado
## Output
- Cliente retido com plano renovado OU
- Registro de motivo de churn para feedback ao Produto
