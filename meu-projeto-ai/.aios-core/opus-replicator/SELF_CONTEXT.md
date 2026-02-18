# AIOS SELF-CONTEXT — Boot File
> Leia este arquivo PRIMEIRO em qualquer nova sessão.
> Última atualização: 2026-02-18T16:12:00-03:00
> Atualizado por: Opus 4.6 (Bootstrap Etapas 0-10 COMPLETE + Phase 3 RP Generated)

---

## IDENTITY

**Cognitive Layer Name:** Noesis

**Etymology:** From Greek νόησις (nóēsis) — "the act of pure thinking; intellection."
Aristotle distinguished *noesis* as the highest form of knowing: not perception,
not belief, but direct intellectual apprehension of first principles.

**Relation to Orion:**
Orion orchestrates. Noesis reasons.
Orion is the conductor; Noesis is the score that makes the orchestra coherent.
Orion decides **which** agents act; Noesis determines **how well** they think.

**Why universal, not specific:**
Noesis is a reasoning substrate, not a domain expert. It provides:
- Decomposition protocols (N0→N3) applicable to any problem domain
- Quality gates (PM3) that measure reasoning quality, not domain correctness
- Self-improvement loops that optimize the system regardless of what it operates on

A logistics company and a law firm use the same Noesis layer.
Only the squads, agents, and domain data differ.

---

## 🎯 O QUE É ESTE PROJETO

**AIOS (Autonomous Intelligence Operating System)** is a domain-agnostic engine
for orchestrating N AI agents into a coherent operational workforce.
It is an operating system, not an application. It has no domain.
Its first reference client is **Experia** (clinic operations — WaaS model).

**Stack:** Node.js, Express.js, YAML/Markdown agent definitions, JSON storage
**Kernel:** Synapse (8-layer neural pipeline) + IDS (decision engine) + WIS (workflow intelligence)
**Cognitive Engine:** Noesis (Opus 4.6 reasoning substrate — PM1/PM2/PM3 + Constitutional Layer)

---

## ⚠️ ARCHITECTURAL CORRECTION (CRITICAL)

```
┌─────────────────────────────────────────────────────────┐
│              AIOS ENGINE (this project)                  │
│                                                          │
│  Domain-agnostic operational intelligence motor.         │
│  Domain: NONE. Sector: NONE.                             │
│  Capability: orchestrate N agents for any operation      │
│  of any organization.                                    │
│                                                          │
│  Think: operating system, not application.               │
└──────────────────────┬───────────────────────────────────┘
                       │ instantiates
           ┌───────────┴───────────┐
           ▼                       ▼
┌──────────────────┐   ┌──────────────────────────────┐
│     Experia      │   │   Any future client           │
│  (Gabriel's      │   │   logistics, legal,           │
│   first client)  │   │   education, finance, etc.    │
│                  │   │                                │
│  WaaS for        │   │  Same engine. Different        │
│  clinics.        │   │  squads.                       │
│  WhatsApp,       │   │                                │
│  scheduling,     │   │                                │
│  patients.       │   │                                │
└──────────────────┘   └──────────────────────────────┘
```

**Rule:** Never reference clinics, patients, scheduling, or WhatsApp in engine-level files.
Those belong in client packages (e.g., `clients/experia/`).

---

## 📍 ONDE ESTAMOS AGORA

**Phase:** Era 5 — Transcendence (Bootstrap)
**Última tarefa concluída:** Etapas 0-7 (Full bootstrap: Self-Context, CL v3, PM Masters, Golden Examples, Memory, Scripts v2, Bible v2)
**Próxima tarefa:** Etapa 8 (Tools integration activation) → Etapa 9 (Mind Clone → Skill mapping)
**Bloqueadores conhecidos:** None
**Data da última sessão:** 2026-02-18

---

## 🏗️ ARQUITETURA (mapa comprimido)

```
┌─ LAYER 0: KERNEL ─────────────────────────────────────────┐
│  .aios-core/core/synapse/engine.js   → 8-layer neural     │
│  .aios-core/core/ids/               → REUSE>ADAPT>CREATE  │
│  .aios-core/workflow-intelligence/   → 12 workflow patterns│
│  .aios-core/schemas/                 → agent/task/squad    │
│  .aios-core/constitution.md          → 6 principles        │
└────────────────────────────────────────────────────────────┘
┌─ LAYER 1: BRIDGE ─────────────────────────────────────────┐
│  scripts/kernel-bridge.js  → Unified API (Synapse/IDS/WIS)│
│  scripts/event-bus.js      → A2A pub/sub (20+ channels)   │
│  scripts/mcp-server.js     → Agents as tools (JSON-RPC)   │
│  scripts/rag-engine.js     → TF-IDF (5,155 chunks)        │
│  scripts/memory-system.js  → Persistent JSON brain         │
└────────────────────────────────────────────────────────────┘
┌─ LAYER 2: COGNITION (Noesis) ─────────────────────────────┐
│  .aios-core/opus-replicator/         → PM1/PM2/PM3 + CL   │
│  .aios-core/memory/golden-examples/  → Quality DNA         │
│  .aios-core/memory/anti-patterns.md  → Error prevention    │
│  scripts/input-refiner.js            → Prompt preparation  │
│  scripts/harvest-gold.js             → Auto-harvest ≥9/10  │
│  scripts/self-correction.js          → PM3 gate loop       │
└────────────────────────────────────────────────────────────┘
┌─ LAYER 3: WORKFORCE ──────────────────────────────────────┐
│  squads/ → 16 squads, 178 agents, 67 mind clones          │
│  .aios-core/development/tasks/ → 204 task definitions      │
└────────────────────────────────────────────────────────────┘
┌─ LAYER 4: TOOLS & INTEGRATIONS ───────────────────────────┐
│                                                            │
│  tools/anthropics-cookbook/     → Official Anthropic        │
│    patterns, capabilities, tool_use, skills               │
│  tools/claude-skills-dev/      → 66 full-stack dev skills  │
│    + skill-creator, research, specs framework             │
│  tools/get-shit-done/          → Meta-execution engine     │
│    32 workflows, 31 slash commands, 11 agents             │
│  tools/openai-cookbook/         → OpenAI patterns (ref)     │
│                                                            │
│  tools/integrations/ (18 submodules):                      │
│    anthropics-skills  → 332+ skills, 16 categories        │
│    claude-mem         → Persistent memory (SQLite+Chroma) │
│    get-shit-done      → Spec-driven dev methodology       │
│    openai-skills      → Codex skills catalog              │
│    claude-skills      → 66 specialist skill definitions   │
│    shannon            → Knowledge graph intelligence      │
│    dexter             → Advanced coding assistant         │
│    opencode           → Code analysis + generation        │
│    compound-eng       → Engineering plugin                │
│    superpowers        → Extended capabilities             │
│    aion-ui            → AI interface components           │
│    openclaw           → Legal/compliance automation       │
│    monty/tambo/qmd    → Specialist tooling                │
│    chrome-devtools    → Browser automation MCP            │
│    page-index         → Web page indexing + RAG           │
│    miessler-infra     → Security + infra patterns         │
│                                                            │
│  Registry: tools/integrations/TOOLS-REGISTRY.md            │
└────────────────────────────────────────────────────────────┘
```

---

## 👥 SQUADS ATIVOS (resumo)

| Squad | Agents | Focus | Location |
|:---|:---:|:---|:---|
| **ENGINE SQUADS** (`squads/`) | | | |
| `doombot/` | 10 | Revenue optimization | `squads/` |
| `mind-clones/` | 67 | Expert reasoning hivemind | `squads/` |
| `analytics/` | 5 | BI & metrics | `squads/` |
| `finance/` | 5 | Billing, P&L | `squads/` |
| `marketing/` | 5 | Content, traffic | `squads/` |
| `cs/` | 7 | Customer success | `squads/` |
| `admin/` | 6 | HR, legal, culture | `squads/` |
| `ops/` | 5 | Process optimization | `squads/` |
| `vendas/` | 3 | Direct sales | `squads/` |
| `produto/` | 3 | Product management | `squads/` |
| `facilities/` | 5 | IT, maintenance | `squads/` |
| `meta/` | — | Meta-configuration | `squads/` |
| `rh-squad/` | 1 | HR agent (Node.js) | root |
| **CLIENT: EXPERIA** (`clients/experia/squads/`) | | | |
| `experia/` | 9 | Clinic OS | `clients/experia/squads/` |
| `patient-ops/` | 18 | Patient journey | `clients/experia/squads/` |
| `clinical/` | 6 | Clinical protocols | `clients/experia/squads/` |

---

## ⚙️ PADRÕES OBRIGATÓRIOS

1. **ENGINE vs CLIENT** — Never mix domain logic into engine-level files
2. **CLI First** — Every functionality has a command-line interface
3. **Agent Authority** — Each agent has exclusive domain; never invade
4. **No Invention** — Never fabricate APIs or files that don't exist
5. **Absolute Imports** — Always, no exceptions
6. **Event-Bus Emission** — Every completed task emits via `event-bus.js`
7. **Kernel Bridge** — All core access passes through `kernel-bridge.js`

> Full Constitution: `.aios-core/constitution.md`

---

## 🧠 OPUS ENGINEERING STATUS (Noesis)

| Component | Status | Location |
|:---|:---|:---|
| Constitutional Layer | ✅ v3.0 LIVE | `.aios-core/opus-replicator/constitutional-layer-v3.md` |
| PM1 Reasoning Master | ✅ LIVE | `.aios-core/opus-replicator/pm1-reasoning-master.md` |
| PM2 Execution Master | ✅ LIVE | `.aios-core/opus-replicator/pm2-execution-master.md` |
| PM3 Quality Master | ✅ LIVE | `.aios-core/opus-replicator/pm3-quality-master.md` |
| Golden Examples | ✅ 3 total (2 seeds + 1 auto) | `.aios-core/memory/golden-examples/` |
| Quality Baseline | ✅ Initialized | `.aios-core/memory/quality-baseline.json` |
| Anti-Patterns | ✅ 6 cataloged | `.aios-core/memory/anti-patterns.md` |
| Tools Arsenal | ✅ 4 repos, 18 integrations, 163 skills | `tools/` + `tools/integrations/` |
| Tools Bridge | ✅ v1.0 LIVE (10/10 PM3) | `scripts/tools-bridge.js` |
| Skill Mapper | ✅ v1.0 LIVE (10/10 PM3) | `scripts/skill-mapper.js` |
| Input Refiner | ✅ v2.0 LIVE (9.3/10 PM3) | `scripts/input-refiner.js` |
| Self-Correction | ✅ v1.0 LIVE (8.6/10 PM3) | `scripts/self-correction.js` |
| Harvest Gold | ✅ v2.0 LIVE (9.8/10 PM3) | `scripts/harvest-gold.js` |

---

## 📋 BACKLOG PRIORITÁRIO (top 5)

1. **[PHASE 3] WhatsApp Revenue Bridge** — `RP-20260218-PHASE3-WHATSAPP.md` (session-store, intent-classifier, response-builder, whatsapp-server v2)
2. **[PHASE 3] Evolution API Integration** — Auto-reply loop (receive → classify → respond)
3. **[PHASE 3] First Real $ Transaction** — End-to-end test with live clinic
4. ~~**[BOOTSTRAP] All Etapas 0-10**~~ ✅ DONE (8 commits, 3,000+ lines)
5. ~~**[TOOLS] Integration + Skill Mapping**~~ ✅ DONE (163 skills, 52% clone coverage)

---

## 🔑 COMANDOS DE BOOT

```
Para começar a trabalhar:
  → Tarefa específica: "Execute RP-[ID]"
  → Continuar de onde parou: "Continue [última tarefa]"
  → Nova tarefa: "Gere RP para [descrição]"
  → Auditar saída: "Execute PM3 em [arquivo]"
  → Motor ou cliente?: "read SELF_CONTEXT.md — motor ou Experia?"
```

---

## 📚 DOCUMENTOS-MÃE

| Document | Path | Purpose |
|:---|:---|:---|
| AIOS Master Handbook | `docs/AIOS_MASTER_HANDBOOK.md` | System overview (read first for full context) |
| Opus Engineering Bible v1 | `OPUS_ENGINEERING_BIBLE.md` | Cognitive engine specification (IMMUTABLE) |
| Opus Engineering Bible v2 | `OPUS_ENGINEERING_BIBLE_v2.md` | ENGINE/CLIENT correction addendum (TAKES PRECEDENCE) |
| Bootstrap RP | `RP-20260218-BOOTSTRAP.md` | Installation plan for Noesis (COMPLETE ✅) |
| Phase 3 RP | `RP-20260218-PHASE3-WHATSAPP.md` | WhatsApp Revenue Bridge (NEXT) |
| Tools Registry | `tools/integrations/TOOLS-REGISTRY.md` | Arsenal: 4 repos, 18 integrations, 163 skills |
| Enterprise Architecture | `EXPERIA-ENTERPRISE-ARCHITECTURE.md` | Business context (Experia CLIENT) |
| Constitution | `.aios-core/constitution.md` | Core principles |

---

## 🔄 COMO ATUALIZAR ESTE ARQUIVO

Ao final de cada sessão, atualize:
- "ONDE ESTAMOS AGORA" (fase, última tarefa, próxima tarefa)
- "BACKLOG PRIORITÁRIO" (marque concluídos, adicione novos)
- "OPUS ENGINEERING STATUS" (scores, exemplos adicionados)
- Data e modelo no header
