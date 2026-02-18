---
name: expansion-workflow
description: Workflow de expansão modular pós Turno de Receita
owner: experia-master
type: conditional
---

# Workflow: Expansão Modular

## Pré-Condição
Turno de Receita estável por ≥ 7 dias (validado por @experia-data).

## Fluxo

### Etapa 1: Verificação de Estabilidade
```
@experia-data → Puxa relatório dos últimos 7 dias
  ├─ SLA consistente?     → ✅/❌
  ├─ Conversão ativa?     → ✅/❌
  ├─ Confirmação rodando? → ✅/❌
  └─ Relatório entregue?  → ✅/❌
  
  Se todos ✅ → Avança
  Se algum ❌ → BLOQUEIA expansão (foco em estabilizar)
```

### Etapa 2: Diagnóstico de Gargalo
```
@experia-architect → Analisa operação e identifica gargalo
  └─ Executa: tasks/diagnose-bottleneck.md
  
  Resultado: 1 módulo recomendado (A, B, C ou D)
```

### Etapa 3: Proposta
```
@experia-master → Gera proposta com frase de transição padrão
  └─ Usa: templates/expansion-proposal-tmpl.md
  └─ Apresenta ao cliente
```

### Etapa 4: Execução (se aprovado)
```
Módulo A (Demanda):
  └─ @experia-marketing → tasks/instagram-kit.md + campanha reativação

Módulo B (Operação):
  └─ @experia-automations → tasks/office-kit.md (versão expandida)

Módulo C (Financeiro):
  └─ @experia-automations → Régua de cobrança + @experia-copy → Mensagens

Módulo D (Gestão):
  └─ @experia-data → Painel KPI + alertas + revisão quinzenal
```

### Etapa 5: Validação
```
@experia-validator → Go/No-Go do módulo expandido
@experia-master → Propor operação mensal do novo módulo
```
