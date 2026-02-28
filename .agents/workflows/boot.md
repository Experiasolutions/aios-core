---
description: Executa o boot completo do KAIROS Engine — ativa todos os subsistemas em 0.3s
---

# 🚀 KAIROS Engine Boot Sequence

// turbo-all

**Unified Boot — Ativa TODOS os subsistemas do KAIROS em sequência otimizada.**

## Modos disponíveis

### Full Boot (padrão)
Ativa todas as 6 fases: Identity → Consciousness → RAG → IA Council → Metacognition → Signal

// turbo
1. Execute o boot completo:
```bash
node scripts/kairos-boot.js
```

### Quick Boot (< 10s)
Ativa apenas o essencial: Identity + Consciousness + RAG

// turbo
1. Execute o quick boot:
```bash
node scripts/kairos-boot.js --quick
```

### Health Check Only
Verifica status sem ativar subsistemas

// turbo
1. Execute o health check:
```bash
node scripts/kairos-boot.js --status
```

## O que cada fase faz

| Fase | Nome            | Função                                          |
| :--- | :-------------- | :---------------------------------------------- |
| 0    | 🔒 Identity      | Verifica identity-anchor, rules, persona engine |
| 1    | 🧠 Consciousness | Regenera SELF_CONTEXT.md                        |
| 2    | 📚 Knowledge     | Valida/reconstrói RAG index (29K+ chunks)       |
| 3    | 🏛️ Intelligence  | Roda IA Council (8 cadeiras) — score + gaps     |
| 4    | 🪞 Reflexion     | Metacognição — tendências e anti-patterns       |
| 5    | 📡 Signal        | Sumário + boot log salvo                        |

## Quando usar

- **Início de cada sessão de trabalho** → `/boot` (full)
- **Sessões curtas / rápidas** → `node scripts/kairos-boot.js --quick`
- **Verificar saúde do sistema** → `node scripts/kairos-boot.js --status`
