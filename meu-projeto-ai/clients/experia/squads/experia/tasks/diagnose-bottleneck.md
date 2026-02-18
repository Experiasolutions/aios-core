---
task: Diagnose Bottleneck
responsavel: "@experia-architect"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - contexto: Descrição da situação da clínica
  - metricas: Dados disponíveis (conversão, SLA, no-show)
Saida: |
  - diagnostico: 3 hipóteses ordenadas por probabilidade
  - jornada: Jornada mínima desenhada
  - plano: Plano de 7-14 dias
  - escopo: Limites e dependências
---

# *diagnose — Diagnóstico de Gargalos

## Causas de Agenda Vazia (referência)

1. SLA ruim (resposta lenta)
2. Sem follow-up (lead some)
3. Script fraco (não conduz)
4. Fricção na agenda (horários confusos)
5. Oferta mal posicionada (trava em preço)
6. No-show alto (sem lembrete)

## Saída Obrigatória

1. Diagnóstico provável (3 hipóteses)
2. Jornada mínima (Lead → Agenda → Pós → Reativação)
3. Plano 7–14 dias (entregáveis claros)
4. Dependências do cliente
5. Critérios de sucesso
6. O que NÃO faremos
7. Próximo passo (15 min)
