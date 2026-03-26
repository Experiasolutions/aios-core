# AIOX Knowledge Base — KAIROS Engine Map

> Auto-generated: 2026-03-19 · Source: `@purpose` annotations + directory scan

---

## 🔥 Evolution Engine (`scripts/evolution/`)

The self-improving core. Runs a 5-phase autonomous cycle:

| Phase | Engine | Purpose |
|:---:|---|---|
| 1 | `audit-engine.js` | System Examination — scans project files, builds state snapshot, runs Council |
| 2 | `proposal-engine.js` | Solution Generation — produces fixes per Council domain (8 generators) |
| 3 | `validation-engine.js` | Council Voting & Convergence — validates proposals via council vote |
| 4 | `apply-engine.js` | Autonomous Application — applies changes with dual backup + rollback |
| 5 | `verification-engine.js` | Post-Application Verification — syntax check, baseline hash, integrity |

**Orchestrator:** `evolution-engine.js` — ties all 5 phases together in a single cycle.

### Safety Layer
| Module | Purpose |
|---|---|
| `circuit-breaker.config.js` | Immutable safety config — risk classification, forbidden paths, SHA hashes |
| `convergence-guard.js` | Anti-loop protection — detects oscillation (A→B→A) and enforces cooldowns |

---

## 🏛️ IA Council (`ia-council-engine.js`)

8-member evaluation council + Metamind synthesizer:

| Chair | Member | Lens |
|:---:|---|---|
| 1 | **Karpathy** | Code quality, JSDoc, error handling, event-bus integration |
| 2 | **Sutskever** | Cognitive architecture, constitutional layer, PM templates |
| 3 | **Ng** | Workflow efficiency, duplicate logic, unused scripts, monoliths |
| 4 | **Hinton** | Knowledge distillation, doc-to-code ratio, SELF_CONTEXT freshness |
| 5 | **Hassabis** | Learning loops, quality baseline trend, memory system, RPs |
| 6 | **Pedro** | Vision alignment, AP-001 domain contamination, structure integrity |
| 7 | **Alan** | Product-market fit, README quality, client packages, integrations |
| 8 | **Distillation** | LoRA trace structuring, dataset curation, independence roadmap |
| Σ | **Metamind** | Synthesizes all evaluations, deduplicates gaps, produces verdict |

---

## 🧠 Noesis Pipeline (`noesis-pipeline.js`)

6-phase cognitive loop for output quality:

| Phase | Function |
|---|---|
| 1 | Load context (golden examples, anti-patterns, PM masters) |
| 2 | Evaluate output quality (7 dimensions) |
| 3 | Analyze reasoning depth (N0→N3 layers) |
| 4 | Harvest golden examples (score ≥ threshold) |
| 5 | Save distillation traces (input → reasoning → output → PM3 score) |
| 6 | Update quality baseline |

**Dashboard:** `noesis-status.js` — CLI dashboard showing baseline, trends, stagnation alerts.

---

## 🪞 Cognitive State Engine (`cognitive-state-engine.js`)

Foundation of persistent identity across sessions:

| Function | Purpose |
|---|---|
| `bootSession()` | Load + merge persisted state for new session |
| `observe()` | Record cognitive behavior observation |
| `compress()` | Consolidate raw observations into patterns |
| `driftCheck()` | Verify coherence with identity anchor |
| `snapshot()` | Generate compressed text of cognitive state |

**State File:** `engine/noesis/cognitive-state.json`
**Identity Anchor:** `engine/noesis/identity-anchor.json`

---

## 🪞 Metacognition Layer (`metacognition-layer.js`)

Self-assessment engine that detects tendencies (strengths/weaknesses) by analyzing session history and behavioral patterns.

---

## 👁️ Operator Noesis (`scripts/operator-noesis/`)

Learns the human operator's patterns to predict needs:

| Module | Purpose |
|---|---|
| `operator-noesis-engine.js` | Main orchestrator — status, sessions, predictions |
| `operator-noesis-gate.js` | Gate that decides when to inject predictions |
| `inference-validator.js` | Validates prediction accuracy |
| `learning-model-evaluator.js` | Evaluates learning model performance |
| `model-updater.js` | Updates the learning model with new data |

**Data:** `engine/noesis-operator/learning-model.json`

---

## 👁️ Jarvis Layer (`scripts/jarvis-core.js` + `profile-enricher.js`)

Operator behavioral profiling:

| Module | Purpose |
|---|---|
| `jarvis-core.js` | Collects from boot logs, git, cognitive state, file patterns |
| `profile-enricher.js` | Enriches operator profile (work hours, focus, decisions) |
| `data-ingestion/jarvis-pipeline.js` | 3-Layer Cognitive Ingestion Pipeline |

---

## 🌙 Night Shift (`night-shift-automator.js` + `night-shift-scheduler.js`)

Autonomous overnight operations:

| Module | Purpose |
|---|---|
| `night-shift-scheduler.js` | Schedules automated overnight operations |
| `night-shift-automator.js` | Executes: sanitization, docs organizer, RAG re-index |

---

## 🧬 OPUS Replicator (`engine/opus-replicator/`)

Reasoning template system for output quality:

| Template | Purpose |
|---|---|
| `pm1-reasoning-master.md` | Phase 1: Deep reasoning template |
| `pm2-execution-master.md` | Phase 2: Execution template |
| `pm3-quality-master.md` | Phase 3: Quality evaluation template |
| `constitutional-layer-v3.md` | 5 Core Rules + 5 Protocol Extensions |
| `calibration-profiles.json` | Calibrated output profiles |

---

## 🔌 Bridge & Infrastructure

| Script | Purpose |
|---|---|
| `aios-kairos-bridge.js` | Bridge AIOX↔KAIROS — synapse injection, agent registry sync |
| `kernel-bridge.js` | Kernel module bridge |
| `local-bridge.js` | Local WebSocket bridge for cloud↔IDE |
| `bridge-auth.js` | Token generation/validation |
| `codespaces-tunnel.js` | WebSocket client via ngrok |
| `mcp-server.js` | MCP protocol server |
| `event-bus.js` | Cross-squad A2A pub/sub communication |
| `squad-router.js` | Routes requests to appropriate squads |
| `scheduler.js` | Central task scheduler |

---

## 📚 Knowledge & Memory

| Script | Purpose |
|---|---|
| `rag-engine.js` | Semantic search — indexes 795+ files into 26K+ chunks |
| `memory-system.js` | Persistent memory across sessions |
| `harvest-gold.js` | Golden example harvester |
| `distill-trace.js` | LoRA fine-tuning trace capture |
| `generate-context.js` | Regenerates SELF_CONTEXT.md |
| `clone-generator.js` | Generates "Owner Clone" system prompts |

---

## 🔧 Utility & Validation

| Script | Purpose |
|---|---|
| `activate-kernel.js` | One-shot kernel verification (Synapse, IDS, WIS) |
| `activate-registry.js` | Populates IDS Entity Registry from squad .md files |
| `validate-aiox-core-deps.js` | Validates AIOX core dependencies |
| `validate-manifest.js` | Validates manifest integrity |
| `validate-package-completeness.js` | Checks package completeness |
| `semantic-lint.js` | Semantic linting of documentation |
| `code-intel-health-check.js` | Health check for code intelligence subsystem |
| `input-refiner.js` | Refines user inputs for better agent processing |
| `skill-mapper.js` | Maps skills to entities |

---

## 📊 Client & Business Scripts

| Script | Purpose |
|---|---|
| `clickup-client.js` | ClickUp API CRUD |
| `clickup-workspace-builder.js` | Provisions ClickUp workspaces |
| `email-client.js` | Gmail SMTP via nodemailer |
| `gsheets-client.js` | Google Sheets client |
| `instagram-client.js` | Instagram API client |
| `experia-content.js` | Experia content generation |
| `experia-sdr.js` | Experia SDR automation |
| `dashboard.js` | JARVIS Command Center web UI |

---

> **Total:** 76 scripts · 18 evolution modules · 5 operator-noesis modules · 19 OPUS docs
> **Engine Directories:** `engine/memory`, `engine/night-reports`, `engine/noesis`, `engine/noesis-operator`, `engine/opus-replicator`
