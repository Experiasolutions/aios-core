---
name: facility-management-workflow
description: Workflow de gestão de facilities (chamados + preventivas)
squad: facilities
version: 1.0.0
---

# Facility Management Workflow

## Fluxo A: Chamados (Reativo)
```
Chamado → Triage (P1/P2/P3) → Atribuição → Execução → Verificação → ✅ Fechado
```

## Fluxo B: Manutenção Preventiva (Proativo)
```
Agenda Mensal → Checklist → Execução → Verificação → ✅ Report
```

## Steps — Chamados

### Step 1: Triage
- **Agente:** `@facilities-head` (Bastion)
- **Input:** Chamado de qualquer squad
- **Output:** Classificação P1/P2/P3 + atribuição
- **SLA:** P1 <1h | P2 <4h | P3 <24h

### Step 2: Execução
- **Agentes:** conforme tipo:
  - Predial/equipamento → `@facilities-manutencao` (Wrench)
  - TI/rede/hardware → `@facilities-ti` (Circuit)
  - Material necessário → `@facilities-almoxarifado` (Stock)
  - Segurança → `@facilities-seguranca` (Sentinel)
- **Output:** Problema resolvido + documentação

### Step 3: Verificação
- **Agente:** `@facilities-head` (Bastion)
- **Input:** Resolução documentada
- **Output:** Chamado fechado e solicitante notificado

## Steps — Preventivas

### Step 1: Programação Mensal
- **Agente:** `@facilities-head` (Bastion)
- **Input:** Calendário de preventivas
- **Output:** Agenda do mês distribuída

### Step 2: Execução
- **Agente:** `@facilities-manutencao` (Wrench)
- **Checklist:** `manutencao-preventiva-checklist.md`
- **Output:** Itens inspecionados e corrigidos

### Step 3: Report
- **Agente:** `@facilities-head` (Bastion)
- **Output:** Relatório mensal de facilities

## Cross-Squad
- **Admin → Facilities:** `new_employee` → setup de estação de trabalho
- **Qualquer → Facilities:** `facility_request` → chamado
