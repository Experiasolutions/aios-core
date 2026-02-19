---
name: sprint-14d-setup
description: Setup completo do Sprint 14D — Turno de Receita
owner: experia-master
participants:
  - experia-copy (scripts de WhatsApp)
  - experia-integrations (setup técnico)
  - experia-data (métricas)
  - experia-security (validação LGPD)
  - experia-validator (Go/No-Go)
elicit: true
---

# Sprint 14D Setup — Turno de Receita

## Objetivo
Instalar o Turno de Receita completo no WhatsApp da clínica em 14 dias.

## Pré-Requisitos
- [ ] Clinic Brief preenchido (`clinic-brief-tmpl.md`)
- [ ] Acesso ao WhatsApp Business da clínica
- [ ] Lista de procedimentos e preços
- [ ] Horários de funcionamento
- [ ] Contato do decisor

## Fase 1: Configuração (Dias 1-2)
- [ ] Clonar templates de resposta (`wa-script-tmpl.md`)
- [ ] Personalizar regras de handoff (quando escalar para humano)
- [ ] Configurar perguntas de qualificação
- [ ] Definir SLA: 5 min (horário) / recebimento (fora do horário)
- [ ] @experia-security: Validar LGPD do fluxo
- [ ] @experia-integrations: Conectar WhatsApp + Agenda

## Fase 2: Operação (Dias 3-7)
- [ ] Ativar resposta automática no horário comercial
- [ ] Monitorar SLA diariamente
- [ ] @experia-copy: Ajustar scripts com base nos primeiros dados
- [ ] @experia-data: Configurar dashboard de métricas

## Fase 3: Consolidação (Dias 8-14)
- [ ] Ativar rotina de confirmação D-1 e H-3
- [ ] Ativar recuperação de no-show
- [ ] @experia-data: Gerar primeiro relatório semanal
- [ ] @experia-validator: Go/No-Go para operação mensal

## Entrega Final
- Relatório semanal com 4 KPIs
- Dashboard operacional configurado
- Fluxo de handoff documentado
- Aprovação LGPD do Sentinel

## KPIs de Sucesso
| Métrica | Meta |
|---------|------|
| SLA 1ª resposta | ≤ 5 min |
| Conversão → agendamento | ≥ 60% |
| Show rate | ≥ 85% |
| No-shows recuperados | ≥ 2/semana |
