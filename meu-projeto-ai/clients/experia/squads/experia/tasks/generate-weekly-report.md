---
name: generate-weekly-report
description: Gerar relatório semanal com os 4 KPIs obrigatórios
owner: experia-data
participants:
  - experia-master (destinatário)
elicit: false
---

# Relatório Semanal — 4 KPIs

## Objetivo
Compilar métricas da semana e entregar relatório padronizado ao Master e ao cliente.

## Dados Obrigatórios
1. **SLA de 1ª Resposta** — Tempo médio em minutos
2. **Taxa de Conversão** — % de conversas → tentativa de agendamento
3. **Show Rate / No-Show Rate** — % de comparecimento
4. **Agendamentos Recuperados** — Nº de no-shows reconvertidos

## Processo
- [ ] Coletar dados do período (seg-dom)
- [ ] Calcular médias e tendências (vs semana anterior)
- [ ] Identificar top 3 melhorias e top 3 problemas
- [ ] Gerar relatório usando `metrics-report-tmpl.md`
- [ ] Enviar ao @experia-master para revisão
- [ ] Master encaminha ao cliente (WhatsApp ou e-mail)

## Formato de Entrega
```
📊 RELATÓRIO SEMANAL — [Nome da Clínica]
Período: [Data Início] a [Data Fim]

1. ⏱️ SLA Resposta: X min (meta: ≤5min) [✅/⚠️]
2. 📈 Conversão: X% (meta: ≥60%) [✅/⚠️]
3. 📅 Show Rate: X% (meta: ≥85%) [✅/⚠️]
4. 🔄 Recuperados: X agendamentos [+R$ X]

💡 Destaque: [principal conquista da semana]
⚠️ Atenção: [principal ponto de melhoria]
```

## Frequência
- Toda segunda-feira até 10:00
- Dados coletados de segunda a domingo anterior
