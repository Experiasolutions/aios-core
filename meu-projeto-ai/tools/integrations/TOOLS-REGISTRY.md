# 🔧 AIOS Tools Registry — Phase 3 Arsenal

## Overview
Registry of integrated GitHub tools powering the AIOS ecosystem.
Total cloned repos: 5 (Wave 1) | Ready for Metamind orchestration.

---

## Wave 1 — Skills + Memory + Execution (INSTALLED)

### 1. anthropics/skills ⭐ 70K
- **Path:** `tools/integrations/anthropics-skills/`
- **Type:** Agent Skills Library (Official Anthropic)
- **Skills:** 16 categories, 332+ items
- **Key Modules:**
  - `skills/mcp-builder/` — MCP Server generation
  - `skills/pdf/` — PDF creation/manipulation
  - `skills/xlsx/` — Excel generation
  - `skills/pptx/` — PowerPoint generation
  - `skills/docx/` — Word document generation
  - `skills/canvas-design/` — Design creation (83 resources)
  - `skills/webapp-testing/` — Web app testing
  - `skills/skill-creator/` — Create new skills
  - `skills/frontend-design/` — Frontend design patterns
  - `skills/brand-guidelines/` — Brand management
  - `skills/internal-comms/` — Enterprise communications
  - `skills/theme-factory/` — Theme generation
  - `skills/web-artifacts-builder/` — Web artifact creation
  - `skills/slack-gif-creator/` — Creative media
  - `skills/algorithmic-art/` — Algorithmic art
  - `skills/doc-coauthoring/` — Document collaboration
- **Integration:** Each skill has SKILL.md. Can be loaded by mind clones on demand.
- **AIOS Clone Mapping:**
  - mcp-builder → clone-harrison-chase, clone-pedro-valerio
  - pdf/xlsx/pptx/docx → ALL clones (output generation)
  - webapp-testing → clone-silas-alberti, clone-anders-hejlsberg
  - frontend-design → clone-chris-lattner
  - brand-guidelines → clone-seth-godin
  - skill-creator → Metamind (self-improvement)

### 2. claude-mem ⭐ 28K
- **Path:** `tools/integrations/claude-mem/`
- **Type:** Persistent Memory System
- **Version:** 6.5.0
- **Key Modules:**
  - `plugin/` — Claude Code plugin (61 files)
  - `src/` — Core source (208 files)
  - `openclaw/` — OpenClaw integration (16 files)
  - `ragtime/` — RAG-based memory retrieval
  - `scripts/` — Utilities (43 scripts)
- **Features:**
  - SQLite + Chroma vector search
  - 5 lifecycle hooks (SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd)
  - Progressive Disclosure (3-layer: search → timeline → get_observations)
  - Web viewer UI at localhost:37777
  - ~10x token savings via filtered retrieval
- **Integration:** Memory layer for ALL 46 clones. Metamind's long-term memory.
- **Requirements:** Node.js 18+, Bun runtime

### 3. get-shit-done ⭐ 15K
- **Path:** `tools/integrations/get-shit-done/`
- **Type:** Meta-prompting + Context Engineering + Spec-Driven Dev
- **Key Modules:**
  - `get-shit-done/workflows/` — 32 workflow definitions
  - `get-shit-done/templates/` — 34 task/plan templates
  - `get-shit-done/references/` — 13 reference docs
  - `commands/` — 31 slash commands
  - `agents/` — 11 specialized agents
  - `hooks/` — Git lifecycle hooks
- **Core Commands:**
  - `/gsd:new-project` → Full initialization (questions → research → requirements → roadmap)
  - `/gsd:plan-phase` → Research + plan + verify
  - `/gsd:execute-phase` → Wave-parallel execution with fresh context per plan
  - `/gsd:verify-work` → User acceptance testing
  - `/gsd:quick` → Ad-hoc task execution
  - `/gsd:map-codebase` → Analyze existing codebase
- **Philosophy:** Context engineering solves context rot. XML prompt formatting. Multi-agent orchestration.
- **Integration:** Execution methodology for AIOS. Clones use GSD workflows.

### 4. openai/skills ⭐ 8.7K
- **Path:** `tools/integrations/openai-skills/`
- **Type:** Codex Skills Catalog (Official OpenAI)
- **Integration:** Cross-pollinate skill patterns with Anthropic skills.

### 5. Jeffallan/claude-skills ⭐ 2.9K
- **Path:** `tools/integrations/claude-skills/`
- **Type:** 66 Full-Stack Developer Skills
- **Key Skills (66 specializations):**
  - Languages: python-pro, javascript-pro, typescript-pro, golang-pro, rust-engineer, cpp-pro, csharp-developer, java-architect, kotlin-specialist, php-pro, swift-expert
  - Frameworks: react-expert, nextjs-developer, vue-expert, angular-architect, django-expert, fastapi-expert, laravel-specialist, nestjs-expert, rails-expert, spring-boot-engineer, flutter-expert, react-native-expert, dotnet-core-expert
  - Infrastructure: kubernetes-specialist, terraform-engineer, devops-engineer, sre-engineer, cloud-architect, database-optimizer, postgres-pro
  - Architecture: api-designer, architecture-designer, microservices-architect, graphql-architect, websocket-engineer
  - Quality: code-reviewer, code-documenter, test-master, debugging-wizard, chaos-engineer, secure-code-guardian, security-reviewer, playwright-expert
  - AI/ML: fine-tuning-expert, ml-pipeline, rag-architect, prompt-engineer
  - Special: salesforce-developer, shopify-expert, wordpress-pro, spark-engineer, embedded-systems, game-developer, fullstack-guardian
  - Tools: atlassian-mcp, mcp-developer, spec-miner, feature-forge, cli-developer
  - Meta: the-fool, legacy-modernizer, sql-pro, pandas-pro
- **Integration:** Skills become abilities for mind clones. Each clone gets mapped skills.
- **AIOS Clone Mapping:**
  - python-pro, typescript-pro → clone-anders-hejlsberg, clone-chris-lattner
  - kubernetes-specialist, cloud-architect → clone-linus-torvalds
  - rag-architect → clone-matei-zaharia
  - spark-engineer → clone-matei-zaharia
  - api-designer → clone-patrick-collison
  - security-reviewer → clone-eliezer-yudkowsky, clone-timnit-gebru
  - prompt-engineer → clone-andrew-ng
  - architecture-designer → clone-pedro-valerio

---

## Pending Waves

### Wave 2 — RAG + Coding + Finance
- [ ] VectifyAI/PageIndex (15K⭐)
- [ ] anomalyco/opencode (105K⭐)
- [ ] virattt/dexter (15K⭐)
- [ ] EveryInc/compound-engineering-plugin (9K⭐)

### Wave 3 — Platform + Security
- [ ] openclaw/openclaw (202K⭐)
- [ ] iOfficeAI/AionUi (16K⭐)
- [ ] KeygraphHQ/shannon (23K⭐)
- [ ] obra/superpowers (53K⭐)

### Wave 4 — Specialist
- [ ] pydantic/monty, tambo-ai/tambo, etc.
