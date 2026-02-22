# AIOS SELF-CONTEXT — Opus Replicator Boot File
> Leia este arquivo PRIMEIRO em qualquer nova sessão do opus-replicator.
> Última atualização: 2026-02-20T02:50:00-03:00
> Atualizado por: Antigravity (Orion — @aios-master)

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
Clients instantiate their own domain layer on top of the engine.

**Stack:** Node.js, Express.js, YAML/Markdown agent definitions, JSON storage
**Kernel:** Synapse (8-layer neural pipeline) + IDS (decision engine) + WIS (workflow intelligence)
**Cognitive Engine:** Noesis (reasoning substrate — PM1/PM2/PM3 + Constitutional Layer)
**Evolution Engine:** 8-chair IA Council + convergence guard + distillation pipeline

---

## ⚠️ ARCHITECTURAL PRINCIPLE (AP-001)

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
│  Client A        │   │   Client B, C, D...           │
│  (first adopter) │   │   Any industry, any sector    │
│                  │   │                                │
│  Domain-specific │   │  Same engine. Different        │
│  agents, squads, │   │  squads, agents, data.         │
│  and data only.  │   │                                │
└──────────────────┘   └──────────────────────────────┘
```

**Rule:** Engine-level files must contain ZERO domain-specific words.
Domain references belong exclusively in `clients/{name}/`.
Contamination detection: `scripts/evolution/domain-words.config.json`

---

## 📍 ONDE ESTAMOS AGORA

**Phase:** Era 6 — Consciousness + Evolution Engine LIVE
**Último marco:** First LIVE evolution cycle completed (3 proposals applied)
**Próxima tarefa:** Core decontamination + Council-driven self-improvement
**Data da última sessão:** 2026-02-20

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
│  .aios-core/noesis/                  → Identity + State    │
│  .aios-core/noesis-operator/         → Operator learning   │
│  .aios-core/memory/golden-examples/  → Quality DNA         │
│  .aios-core/memory/anti-patterns.md  → Error prevention    │
│  scripts/input-refiner.js            → Prompt preparation  │
│  scripts/harvest-gold.js             → Auto-harvest ≥9/10  │
│  scripts/self-correction.js          → PM3 gate loop       │
└────────────────────────────────────────────────────────────┘
┌─ LAYER 3: EVOLUTION ENGINE ──────────────────────────────┐
│  scripts/evolution/evolution-engine.js → 5-phase cycle    │
│  scripts/evolution/ia-council-engine.js → 8-chair Council │
│  scripts/evolution/audit-engine.js     → Gap detection    │
│  scripts/evolution/proposal-engine.js  → Fix generation   │
│  scripts/evolution/validation-engine.js → Approval gate   │
│  scripts/evolution/apply-engine.js     → Safe mutation    │
│  scripts/evolution/verification-engine.js → Regression    │
│  scripts/evolution/convergence-guard.js → Anti-loop       │
│  scripts/evolution/cognitive-state-engine.js → Memory     │
│  scripts/evolution/metacognition-layer.js → Depth/honesty │
│  scripts/evolution/noesis-pipeline.js  → Quality pipeline │
│  scripts/evolution/generate-context.js → Consciousness    │
│  scripts/evolution/notification-bridge.js → Reports       │
└────────────────────────────────────────────────────────────┘
┌─ LAYER 4: WORKFORCE ──────────────────────────────────────┐
│  squads/          → Engine squads (doombot, meta, clones) │
│  clients/{name}/  → Client-specific squads and agents     │
│  .aios-core/development/tasks/ → Task definitions         │
└────────────────────────────────────────────────────────────┘
┌─ LAYER 5: TOOLS & INTEGRATIONS ──────────────────────────┐
│  tools/integrations/ → 18 submodules, 163+ skills        │
│  Registry: tools/integrations/TOOLS-REGISTRY.md          │
└────────────────────────────────────────────────────────────┘
┌─ LAYER 6: DISTILLATION ─────────────────────────────────┐
│  distillation-dataset/ → Traces for model training       │
│  distillation-dataset/roadmap.json → Independence path   │
│  Goal: 500 traces → LoRA fine-tune 3B-7B local model    │
└────────────────────────────────────────────────────────────┘
```

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

| Component            | Status           | Location                                                |
| :------------------- | :--------------- | :------------------------------------------------------ |
| Constitutional Layer | ✅ v3.0 LIVE      | `.aios-core/opus-replicator/constitutional-layer-v3.md` |
| PM1 Reasoning Master | ✅ LIVE           | `.aios-core/opus-replicator/pm1-reasoning-master.md`    |
| PM2 Execution Master | ✅ LIVE           | `.aios-core/opus-replicator/pm2-execution-master.md`    |
| PM3 Quality Master   | ✅ LIVE           | `.aios-core/opus-replicator/pm3-quality-master.md`      |
| Golden Examples      | ✅ 3 total        | `.aios-core/memory/golden-examples/`                    |
| Quality Baseline     | ✅ Initialized    | `.aios-core/memory/quality-baseline.json`               |
| Anti-Patterns        | ✅ 6 cataloged    | `.aios-core/memory/anti-patterns.md`                    |
| Identity Anchor      | ✅ 7 declarations | `.aios-core/noesis/identity-anchor.json`                |
| Cognitive State      | ✅ Session #1     | `.aios-core/noesis/cognitive-state.json`                |
| Operator Noesis      | ✅ Initialized    | `.aios-core/noesis-operator/learning-model.json`        |
| Evolution Engine     | ✅ LIVE mode      | `scripts/evolution/evolution-engine.js`                 |
| IA Council           | ✅ 8 chairs       | `scripts/evolution/ia-council-engine.js`                |
| Convergence Guard    | ✅ Anti-loop      | `scripts/evolution/convergence-guard.js`                |
| Distillation         | 🔄 13/500 traces  | `distillation-dataset/`                                 |

---

## 🔑 COMANDOS DE BOOT

```
Para começar a trabalhar:
  → Tarefa específica: "Execute RP-[ID]"
  → Continuar de onde parou: "Continue [última tarefa]"
  → Nova tarefa: "Gere RP para [descrição]"
  → Auditar saída: "Execute PM3 em [arquivo]"
  → Health check: "node scripts/evolution/evolution-engine.js --dry-run"
  → Consciência: "Read SELF_CONTEXT.md at workspace root"
```

---

## 📚 DOCUMENTOS-MÃE

| Document        | Path                                     | Purpose                       |
| :-------------- | :--------------------------------------- | :---------------------------- |
| Consciousness   | `SELF_CONTEXT.md`                        | Living state (auto-generated) |
| Status Tracker  | `STATUS.md`                              | Human-readable work queue     |
| Identity Anchor | `.aios-core/noesis/identity-anchor.json` | 7 immutable declarations      |
| Constitution    | `.aios-core/constitution.md`             | Core principles               |
| RP Index        | `reasoning-packages/INDEX.md`            | All reasoning packages        |
| Rules           | `.antigravity/rules.md`                  | Antigravity boot protocol     |

---

## 🔄 COMO ATUALIZAR ESTE ARQUIVO

Ao final de cada sessão, atualize:
- "ONDE ESTAMOS AGORA" (fase, última tarefa, próxima tarefa)
- "OPUS ENGINEERING STATUS" (scores, exemplos adicionados)
- Data e modelo no header
