# AIOS PROJECT CONTEXT — For LLM Onboarding

> Paste this entire file into any LLM conversation to give it full context about this project.
> Last updated: 17/Feb/2026 | Owner: Gabriel (Experia Technologies)

---

## WHAT IS THIS

AIOS (Autonomous Intelligence Operating System) is an AI-native operating system for clinic businesses. It's NOT a chatbot — it's a full digital workforce of 178 specialized AI agents organized in 16 squads, orchestrated by a neural kernel (Synapse/IDS/WIS), with 65 "mind clones" of real experts (Hormozi, Belfort, Maquiavel, etc.).

**Business goal:** Automate clinic operations — WhatsApp scheduling, patient intake, billing, follow-ups — so a clinic owner can onboard and have an AI team running within 14 days.

**Tech stack:** Node.js, JavaScript, YAML/Markdown agent definitions, Express.js dashboard, JSON-file storage. No database yet (Supabase planned for Phase 4).

---

## ARCHITECTURE (3 Layers)

```
LAYER 1: .aios-core/core/ — THE KERNEL (~800KB JS)
├── synapse/        8-layer neural pipeline (constitution → global → agent → workflow → task → squad → keywords → star-commands)
├── ids/            Incremental Decision System — REUSE>ADAPT>CREATE engine, 508 registered entities, circuit breaker, verification gates
├── orchestration/  Master orchestrator (54KB), workflow executor, session state, agent invoker, context manager
├── quality-gates/  Pre-commit → PR automation → Human review (3-layer pipeline)
└── workflow-intelligence/  WIS engine: monitors 12 workflows, learns patterns

LAYER 2: scripts/ — OPERATIONAL TOOLS (connected to kernel via kernel-bridge.js)
├── kernel-bridge.js     Unified API wrapping Synapse/IDS/WIS with graceful fallbacks
├── activate-kernel.js   One-shot health verifier (returns: Synapse 8 layers, IDS 508 entities, WIS 12 workflows)
├── dashboard.js         Express.js :3000 — endpoints: /api/kernel, /api/synapse, /api/wis, /api/status, /api/memory, /api/chat
├── scheduler.js         7 cron tasks: health-check(4h), instagram(6h), clickup(8h), cleanup(1h), report(1h), synapse-health(4h), wis-learn(12h)
├── rag-engine.js        TF-IDF vector store — 369 files indexed → 5,155 chunks, 14,441 terms
├── memory-system.js     Persistent JSON brain — store/recall/search across 6 categories
├── event-bus.js         A2A pub/sub — emit(channel,data), on(channel,handler) — 20+ channels
├── mcp-server.js        MCP Protocol server — all agents exposed as tools via JSON-RPC stdio
├── experia_bridge.js    Multi-LLM adapter (Gemini/Groq/DeepSeek/OpenAI) + UiPath bridge + security
├── bridge-config.json   Route mappings (whatsapp-autoreply → experia-copy agent), LLM priority, security rules
├── enterprise-loader.js Loads business model + Experia architecture into memory
└── squad-router.js      Intent → squad routing with decision tree

LAYER 3: squads/ — 16 SQUADS, 178 AGENTS
├── experia/       9 agents — architect, automations, copy, data, integrations, marketing, master, security, validator
├── patient-ops/  18 agents — intake, qualifier, scheduler, confirmer, reminder, retention, support, NPSer, etc.
├── doombot/      10 agents — master, copywriter, offers, persuader, revenue, security, storyads, strategist, tension, mentor
├── mind-clones/  66 agents — 65 expert minds + METAMIND hivemind orchestrator (17 War Rooms)
├── analytics/     5 agents — BI, metrics, dashboards
├── clinical/      6 agents — protocols, triage, compliance
├── finance/       5 agents — billing, P&L, collections
├── cs/            7 agents — churn, engagement, health, retention, support, upsell
├── marketing/     5 agents — content, email, social, traffic
├── admin/         6 agents — HR, legal, culture, finance, DP
├── ops/           5 agents — architect, automation, mapper, QA
├── vendas/        3 agents — SDR, closer, head
├── produto/       3 agents — creator, PM, head
├── facilities/    5 agents — IT, maintenance, security, almoxarifado
├── meta/          — meta-configuration squad
└── rh-squad/      1 standalone HR agent (Node.js)
```

---

## KEY CONFIGURATION

**bridge-config.json routes:**
- `whatsapp-autoreply` → agent: experia-copy, task: process-whatsapp.md, actions: reply_message, mark_as_unread, schedule_appointment
- `uipath-dispatch` → agent: experia-automations, task: dispatch-rpa.md
- `instagram-dm` → agent: experia-marketing, task: process-instagram.md

**LLM providers (priority order):** Gemini → Groq → DeepSeek → OpenAI → Jan.ai (local)

**Constitution v1.0 (6 principles):**
1. CLI First (NON-NEGOTIABLE)
2. Agent Authority — exclusive ownership per agent
3. Story-Driven Development — BLOCK without valid story
4. No Invention — BLOCK if spec invents
5. Quality First — BLOCK if lint/test/build fails
6. Absolute Imports

---

## DEVELOPMENT TASKS (204 total in .aios-core/development/tasks/)

Categories: IDS(3), QA Pipeline(20+), Dev Workflow(10+), Spec Writing(5), Database Ops(18), Squad Creator(11), PO/PM(9), Architecture(8), Security(3), DevOps(5), UX(3), Orchestration(5), Self-Improvement(3), Brownfield(4), MCP(4), Misc(100+)

---

## SCHEMAS (.aios-core/schemas/)

- `agent-v3-schema.json` (12KB) — agent definition schema
- `squad-schema.json` (5KB) — squad manifest schema
- `task-v3-schema.json` (11KB) — task definition schema
- `validate-v3-schema.js` (12KB) — automated validator
- **Audit result:** 12 core agents = V3 ✅, 166 squad agents = V2 legacy

---

## MIND CLONES (65 + METAMIND)

**Tier 0 — Business Experts (9):** Alex Hormozi, Russell Brunson, Jordan Belfort, Seth Godin, Gary Vaynerchuk, Naval Ravikant, Tim Ferriss, Ray Dalio, Simon Sinek
**Tier 1 — AI Fathers (9):** Andrew Ng, Yann LeCun, Geoffrey Hinton, Demis Hassabis, Sam Altman, Dario Amodei, Yohei Nakajima, Andrej Karpathy, Ilya Sutskever
**Tier 2 — Deep Specialists (16):** Anders Hejlsberg, Chris Lattner, Linus Torvalds, Pedro Valério, Matei Zaharia, Harrison Chase, etc.
**Tier 3 — Cross-Domain (12):** Nassim Taleb, Eliezer Yudkowsky, Stephen Wolfram, Nick Bostrom, etc.
**Tier 4 — Frontier + People (19):** Rick Rubin, Viktor Frankl, Reed Hastings, Patrick Collison, etc.

**RAG source material (7 PDFs, 57MB):** 100M Offers, Expert Secrets, Traffic Secrets, DotCom Secrets, Os Segredos do Lobo, O Príncipe, O Homem Mais Rico da Babilônia

---

## CURRENT STATUS

| Phase | Status | What Was Done |
|:---|:---:|:---|
| **0: Audit** | ✅ | Scanned 16K+ files. Discovered kernel EXISTS in .aios-core/core/. Previous audits were wrong. |
| **1: Unification** | ✅ | Deleted 249 dead files. Audited 178 agents (12 V3, 166 V2). RAG indexed 369 files → 5,155 chunks. Added Time Machine Protocol to METAMIND. |
| **2: Activation** | ✅ | Created kernel-bridge.js connecting dashboard+scheduler to Synapse/IDS/WIS. All 3 modules verified ACTIVE. Dashboard has live Kernel Status card. |
| **3: Deployment** | 🔜 | PLAN READY: WhatsApp webhook server (port 3001) + local JSON calendar + LLM intent classification. Needs Evolution API credentials. |
| **4: Scale** | ⬜ | Multi-flow expansion, Supabase DB, second client. |
| **5: Transcendence** | ⬜ | METAMIND Time Machine Protocol — recursive self-evolution, self-healing registry, Constitutional AI for high-risk clones. |

---

## TOOLS ARSENAL (18 GitHub repos, 16K files)

Cloned in `tools/integrations/`. Wave 1 (integrated): anthropics/skills, claude-mem, get-shit-done, openai/skills, claude-skills. Waves 2-4 (cloned, not integrated): openclaw, opencode, shannon, tambo, aion-ui, +8 more.

**Skill→Clone mappings:** mcp-builder→Harrison Chase, webapp-testing→Silas Alberti, frontend-design→Chris Lattner, security-reviewer→Eliezer Yudkowsky, rag-architect→Matei Zaharia, prompt-engineer→Andrew Ng, architecture-designer→Pedro Valério

---

## HOW TO RUN

```bash
node scripts/activate-kernel.js    # Verify Synapse/IDS/WIS health
node scripts/dashboard.js          # Launch dashboard at :3000
node scripts/scheduler.js --tasks  # List scheduled tasks
node scripts/rag-engine.js --query "question"  # Search knowledge base
```

---

## WHAT I NEED HELP WITH (Current Priority)

Phase 3: Building a WhatsApp webhook server that:
1. Receives messages from Evolution API
2. Classifies intent using existing process-whatsapp.md rules (7 intents: greeting, scheduling, cancellation, medical question, complaint, price inquiry, other)
3. Manages appointments via local JSON calendar (Mon-Fri 08-18h, Sat 08-12h, 30min slots)
4. Sends replies back via Evolution API
5. Logs activity to kernel for dashboard monitoring

Files involved: scripts/whatsapp-server.js (NEW), scripts/calendar-store.js (NEW), scripts/bridge-config.json (MODIFY), .env (ADD Evolution API vars)
