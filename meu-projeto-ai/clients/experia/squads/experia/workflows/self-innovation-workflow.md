---
name: self-innovation-workflow
description: Ciclo de auto-evolução conectando Squad Core (AIOS) e Squad Experia
owner: aios-master
type: cyclical
---

# Workflow: Self-Innovation (Auto-Evolução)

## Objetivo
Usar os agentes originais do AIOS para evoluir continuamente o Squad Experia com base em dados reais de operação.

## Ciclo

```
  ┌──────────────────────────────────────────────────┐
  │                                                  │
  ▼                                                  │
OBSERVAR ──► PLANEJAR ──► ARQUITETAR ──► CONSTRUIR ──► OPERAR
(Analyst)    (PM)         (Architect)    (Dev+QA)     (Experia)
  │                                                  │
  └──────────────── FEEDBACK ◄───────────────────────┘
```

### Etapa 1: OBSERVAR (Squad Core — @analyst)
```
@analyst → Analisa logs de operação do Experia:
  - Quais scripts têm baixa conversão?
  - Quais horários têm mais no-shows?
  - Onde os Puppets estão escalando demais?
  - Quais objeções de clientes são novas?
  
  Entrega: Relatório de Insights
```

### Etapa 2: PLANEJAR (Squad Core — @pm)
```
@pm → Recebe insights do Analyst e cria stories:
  - "Como Puppet de Vendas, quero scripts otimizados para converter 70%+"
  - "Como Master, quero alerta automático quando SLA > 8min por 2h+"
  
  Entrega: Backlog de melhorias priorizado
```

### Etapa 3: ARQUITETAR (Squad Core — @architect)
```
@architect → Decide implementação técnica:
  - Novo Puppet necessário? → Criar agente
  - Task existente precisa de mudança? → Modificar task
  - Novo workflow? → Desenhar fluxo
  
  Entrega: Spec técnica
```

### Etapa 4: CONSTRUIR (Squad Core — @dev + @qa)
```
@dev → Implementa as mudanças:
  - Edita/cria agents, tasks, workflows, templates
  - Atualiza squad.yaml

@qa → Valida:
  - Squad schema válido?
  - Todos os componentes referenciados existem?
  - Conflitos com componentes existentes?
  
  Entrega: Componentes atualizados e validados
```

### Etapa 5: OPERAR (Squad Experia — @experia-master)
```
@experia-master → Integra mudanças na operação:
  - Atualiza Puppets com novos scripts
  - Ativa novos workflows
  - Comunica ao cliente (se aplicável)
  
  Entrega: Operação atualizada
```

### Etapa 6: FEEDBACK (Loop)
```
@experia-data → Coleta métricas pós-mudança
  - Comparar KPIs antes vs depois
  - Se melhorou → Documentar como padrão
  - Se piorou → Reverter e re-analisar
  
  → Volta para Etapa 1 (ciclo contínuo)
```

## Frequência
- **Sprint de Inovação:** A cada 2-4 semanas
- **Quick Fixes:** Imediatamente quando identificados

## Governança
- Orion (@aios-master) aprova qualquer mudança estrutural
- Master of Puppets (@experia-master) aprova mudanças operacionais
- Sentinel (@experia-security) tem VETO em qualquer mudança que afete LGPD
