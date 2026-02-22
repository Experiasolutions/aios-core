---
name: sprint-14d-workflow
description: Orquestração completa dos 14 dias do Sprint — Turno de Receita
owner: experia-master
type: sequential
---

# Workflow: Sprint 14D — Turno de Receita

## Visão Geral
Orquestra todos os Puppets durante os 14 dias do Sprint, da preparação ao Go/No-Go final.

## Fluxo

### Dia 0: Kickoff
```
@experia-master → Recebe brief do cliente
  └─ Executa: tasks/onboard-clinic.md
  └─ Distribui para Puppets:
      ├─ @experia-copy       → tasks/create-wa-scripts.md
      ├─ @experia-integrations → tasks/design-integration.md
      └─ @experia-security    → tasks/security-assessment.md
```

### Dias 1-2: Configuração
```
@experia-copy → Entrega scripts de WhatsApp personalizados
@experia-integrations → Conecta WhatsApp Business + Agenda
@experia-security → Valida fluxo LGPD (VETO se reprovar)
@experia-data → Configura dashboard + métricas iniciais
  └─ Executa: tasks/define-metrics.md
```

### Dias 3-7: Operação Inicial
```
@experia-automations → Ativa fluxos automáticos
  └─ Executa: tasks/build-automation.md
@experia-data → Monitora SLA diariamente
@experia-copy → Ajusta scripts com base nos dados
@experia-master → Reunião de checkpoint com cliente (dia 5)
```

### Dias 8-14: Consolidação
```
@experia-automations → Ativa confirmação D-1/H-3 + recuperação no-show
@experia-data → Gera primeiro relatório semanal
  └─ Executa: tasks/generate-weekly-report.md
@experia-validator → Executa validação de consistência
  └─ Executa: tasks/validate-release.md
@experia-master → Apresenta resultado ao cliente + propõe mensal
```

### Dia 14: Go/No-Go
```
@experia-validator → Emite relatório Go/No-Go
  ├─ GO    → Cliente assina operação mensal (R$ 3.900/mês)
  └─ NO-GO → @experia-master ativa +7 dias (garantia)
```

## Checklist de Saída
- [ ] SLA ≤ 5 min operando consistentemente
- [ ] Rotina de confirmação ativa
- [ ] Relatório semanal entregue
- [ ] Aprovação LGPD do Sentinel
- [ ] Cliente satisfeito (NPS ≥ 8)
