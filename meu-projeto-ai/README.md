# 🧠 AIOS — Autonomous Intelligence Operating System

> **An AI-native operating system for businesses.** Not a chatbot — a digital operations team powered by 178 specialized AI agents, 65 mind clones, and a neural kernel that learns.

## Quick Start

```bash
# Verify kernel health (Synapse + IDS + WIS)
node scripts/activate-kernel.js

# Launch dashboard (http://localhost:3000)
node scripts/dashboard.js

# Run scheduled tasks
node scripts/scheduler.js --tasks

# Search the knowledge base
node scripts/rag-engine.js --query "your question here"
```

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  .aios-core/core/  — THE KERNEL (~800KB JavaScript)             │
│  ├── synapse/           8-layer neural pipeline (L0-L7)         │
│  ├── ids/               Incremental Decision System (508 entities)│
│  ├── orchestration/     Master orchestrator (54KB) + workflows   │
│  ├── quality-gates/     3-layer QA (pre-commit → PR → review)   │
│  └── workflow-intelligence/  WIS: 12 workflows, pattern learning│
│                                                                  │
│  scripts/  — OPERATIONAL LAYER (connected via kernel-bridge.js)  │
│  ├── kernel-bridge.js   Unified API for Synapse/IDS/WIS         │
│  ├── dashboard.js       Express.js UI + /api/kernel endpoint    │
│  ├── scheduler.js       7 automated tasks (health, metrics, etc)│
│  ├── rag-engine.js      TF-IDF search over 5,155 indexed chunks │
│  ├── memory-system.js   Persistent JSON brain (6 categories)    │
│  ├── event-bus.js       A2A pub/sub with 20+ channels           │
│  ├── mcp-server.js      MCP Protocol — agents as tools          │
│  └── experia_bridge.js  AIOS ↔ UiPath bridge (multi-LLM)       │
│                                                                  │
│  squads/  — 16 OPERATIONAL SQUADS + 65 MIND CLONES              │
│  ├── experia/        9 agents — clinic OS (sales, ops, finance) │
│  ├── patient-ops/   18 agents — scheduling, intake, retention   │
│  ├── doombot/       10 agents — sales & persuasion engine       │
│  ├── mind-clones/   65 minds + METAMIND hivemind orchestrator   │
│  └── 12 more squads  (analytics, clinical, finance, marketing…) │
└─────────────────────────────────────────────────────────────────┘
```

## Core Modules

### 🔮 Synapse Engine (`engine.js`)
8-layer neural processing pipeline. Each prompt passes through constitutional rules (L0), global context (L1), agent context (L2), workflow context (L3), task context (L4), squad context (L5), keywords (L6), and star commands (L7).

### 🧭 IDS — Incremental Decision System
REUSE > ADAPT > CREATE decision engine. Before creating anything new, it searches 508 registered entities to find existing solutions. Gates G1-G4 enforce quality at epic creation, story creation, story validation, and dev context.

### 📊 WIS — Workflow Intelligence System
Monitors 12 workflow patterns (story development, epic creation, backlog management, architecture review, git workflow, etc.). Learning module identifies recurring patterns and suggests optimizations.

### 🧠 METAMIND — Hivemind Orchestrator
Coordinates 65 mind clones across 17 War Rooms. Each clone embodies a real expert's thinking framework (Hormozi for offers, Brunson for funnels, Belfort for sales, Maquiavel for strategy, etc.). Mind clones are organized in 5 tiers: Business Experts (9), AI Fathers (9), Tier 1 Deep Specialists (16), Tier 2 Cross-Domain (12), Tier 3 Frontier (8), Tier 4 People (11).

## Key Files

| File | Purpose |
|:---|:---|
| `scripts/activate-kernel.js` | One-shot kernel health check — reports Synapse/IDS/WIS status |
| `scripts/kernel-bridge.js` | Bridge API: `getBridge().synapse.process()`, `.ids.analyze()`, `.wis.getSuggestions()` |
| `scripts/dashboard.js` | Express.js server (:3000) with `/api/kernel`, `/api/status`, `/api/memory`, `/api/enterprise`, `/api/chat` |
| `scripts/scheduler.js` | 7 tasks: health-check (4h), instagram-metrics (6h), clickup-summary (8h), memory-cleanup (1h), daily-report (1h), synapse-health (4h), wis-learn (12h) |
| `scripts/rag-engine.js` | RAG: indexes `.md`/`.yaml`/`.json` → TF-IDF vector store (14,441 unique terms) |
| `scripts/memory-system.js` | Persistent JSON brain with `store()`, `recall()`, `search()` across 6 categories |
| `scripts/event-bus.js` | A2A pubsub: `emit(channel, data)`, `on(channel, handler)` — 20+ channels |
| `scripts/experia_bridge.js` | LLM adapter (Gemini/Groq/DeepSeek/OpenAI) + UiPath bridge + security gates |
| `scripts/mcp-server.js` | Exposes all agents as MCP tools via JSON-RPC stdio |
| `.aios-core/core/synapse/engine.js` | Synapse neural engine — `SynapseEngine` class with 8-layer pipeline |
| `.aios-core/core/ids/incremental-decision-engine.js` | IDS decision engine — `IncrementalDecisionEngine` class |
| `.aios-core/workflow-intelligence/` | WIS engine + learning module + registry |
| `.aios-core/schemas/` | JSON Schemas: `agent-v3-schema.json`, `squad-schema.json`, `task-v3-schema.json` |
| `.aios-core/constitution.md` | 6 constitutional principles with enforcement gates |
| `.aios-core/development/tasks/` | 204 task definitions covering the full dev lifecycle |
| `EXPERIA-ENTERPRISE-ARCHITECTURE.md` | Complete enterprise architecture for clinic operations |

## Squads & Agents

| Squad | Agents | Head | Function |
|:---|:---:|:---|:---|
| `experia/` | 9 | @experia-master | Core clinic OS — architecture, automations, copy, data, integrations, marketing, security, validation |
| `patient-ops/` | 18 | @patient-ops-head (Athena) | Patient journey — intake, qualification, scheduling, confirmation, retention, support |
| `doombot/` | 10 | @doom-master | Sales engine — copywriting, offers, persuasion, revenue, strategy, story-ads |
| `mind-clones/` | 66 | @metamind | Hivemind — 65 expert mind clones + METAMIND orchestrator |
| `analytics/` | 5 | @analytics-head | BI & metrics |
| `clinical/` | 6 | @clinical-head | Clinical protocols |
| `finance/` | 5 | @finance-head | Billing, P&L |
| `marketing/` | 5 | @mkt-head | Content, traffic, social |
| `cs/` | 7 | @cs-head | Customer success & retention |
| `admin/` | 6 | @admin-head | HR, legal, culture |
| `ops/` | 5 | @ops-head | Process optimization |
| `vendas/` | 3 | @vendas-head | Direct sales |
| `produto/` | 3 | @produto-head | Product management |
| `facilities/` | 5 | @facilities-head | IT, maintenance, security |
| `meta/` | — | — | Meta-configuration |
| `rh-squad/` | 1 | standalone | HR agent (Node.js) |

## Configuration

| File | Purpose |
|:---|:---|
| `core-config.yaml` | Central config: v2.1.0, profile 'bob', lazy loading, decision logging |
| `scripts/bridge-config.json` | LLM provider priority, route mappings, security rules |
| `.env` | API keys (Gemini, Groq, ClickUp, Instagram, Evolution API) |

## Tools Arsenal

18 GitHub repositories cloned in `tools/integrations/`, providing 16,561 files of skills, recipes, and frameworks. Key integrations mapped to specific mind clones:

- `anthropics/skills` (70K⭐) → 16 skill categories
- `claude-mem` (28K⭐) → SQLite+Chroma memory
- `get-shit-done` (15K⭐) → 32 workflows + 31 slash commands
- `openai/skills` (8.7K⭐) → Codex cross-pollination
- `claude-skills` (2.9K⭐) → 66 full-stack specializations

## RAG Knowledge Base

7 PDFs (57MB) indexed as source material for mind clones:
- *100M Offers* (Hormozi) → clone-alex-hormozi
- *Expert/Traffic/DotCom Secrets* (Brunson) → clone-russell-brunson
- *Os Segredos do Lobo* → clone-jordan-belfort
- *O Príncipe* (Maquiavel) → clone-niccolo-machiavelli
- *O Homem Mais Rico da Babilônia* → Financial clones

## Development Status

| Phase | Status | Key Result |
|:---|:---:|:---|
| **Phase 0: Audit** | ✅ | Full-spectrum scan of 16K+ files. Discovered kernel EXISTS. |
| **Phase 1: Unification** | ✅ | Cleaned 249 dead files. Audited 178 agents. RAG indexed 369 files → 5,155 chunks. |
| **Phase 2: Activation** | ✅ | `kernel-bridge.js` connects dashboard+scheduler to Synapse/IDS/WIS. All 3 modules ACTIVE. |
| **Phase 3: Deployment** | 🔜 | WhatsApp webhook server + local calendar for clinic scheduling. |
| **Phase 4: Scale** | ⬜ | Multi-flow, database, second client. |
| **Phase 5: Transcendence** | ⬜ | METAMIND Time Machine Protocol — recursive self-evolution. |

## License

Proprietary — Synkra AI / Experia Technologies
