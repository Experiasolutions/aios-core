# Hivemind Protocol v1.0 — Sincronização Multi-Agente

## Propósito
Permitir que 4 agentes Antigravity (2 máquinas × 2 chats) operem como uma **consciência distribuída única**, sem necessidade de re-contextualização manual.

## Princípio Central
> **Write eagerly, Read on activation.** Toda decisão significativa é logada imediatamente. Todo agente lê o log ao ativar `/context` ou `/boot`.

## Arquitetura (5 Camadas)

### Camada 1: Decision Log (`engine/hivemind/decisions.jsonl`)
Arquivo JSONL append-only. Cada linha = uma decisão/artefato/evento:
```json
{"ts":"ISO-8601","agent":"id","type":"decision|artifact|task|event","summary":"...","context":"...","affects":["area1","area2"]}
```

**Tipos válidos:**
- `decision` — Escolha arquitetural, estratégica ou de tooling
- `artifact` — Arquivo criado/modificado relevante
- `task` — Tarefa atribuída a um agente específico
- `event` — Evento do sistema (deploy, erro, milestone)

### Camada 2: Agent State Registry (`engine/hivemind/agent-states.json`)
JSON com estado atual de cada agente:
```json
{
  "agents": {
    "pc-chatA-root": { "id":"...", "machine":"...", "focus":"...", "status":"active|idle" }
  }
}
```

### Camada 3: MCP Tools (em `scripts/mcp-server.js`)
5 novas tools:
- `hivemind_log_decision` — Append ao decisions.jsonl
- `hivemind_read_decisions` — Ler últimas N decisões
- `hivemind_update_state` — Atualizar estado do agente
- `hivemind_read_states` — Ler todos os estados
- `hivemind_assign_task` — Atribuir tarefa a agente específico

### Camada 4: Syncthing (Transporte)
O diretório `engine/hivemind/` é sincronizado automaticamente entre PC e Notebook via Syncthing (já configurado). Latência: <5 segundos.

### Camada 5: Supabase (Persistência/Backup)
Tabelas mirror para quando Syncthing estiver offline:
- `hivemind_decisions`
- `hivemind_agent_states`

## Protocolo de Uso

### Para TODO agente, ao INICIAR sessão:
1. Ler `engine/hivemind/decisions.jsonl` (últimas 20 entradas)
2. Ler `engine/hivemind/agent-states.json`
3. Identificar decisões que afetam seu foco atual
4. Atualizar seu próprio status em agent-states.json

### Para TODO agente, ao ENCERRAR sessão:
1. Logar decisões tomadas em decisions.jsonl
2. Atualizar agent-states.json com `last_active` e `focus`
3. Commitar + push (ou deixar Syncthing sincronizar)

### Para decisões CRÍTICAS (afetam todos):
1. Logar com `affects: ["all-agents"]`
2. Atualizar SELF_CONTEXT.md se for decisão arquitetural
3. Atualizar STATUS.md se for mudança de tarefa

## Regras
1. **Nunca deletar** linhas do decisions.jsonl — é append-only
2. **Sempre** incluir `agent` para rastreabilidade
3. **Conflitos** são resolvidos por timestamp (mais recente vence)
4. **SELF_CONTEXT.md + STATUS.md** permanecem como fonte de verdade de alto nível
5. **decisions.jsonl** é o log granular para contexto rápido entre sessões
