# KAIROS Community Edition — Contributions to AIOS

> Open-source contributions from the KAIROS project back to the AIOS ecosystem.
> All contributions are MIT-compatible and contain no proprietary code.

---

## What's Included

### 1. Opus Replicant Engine — Think-With-Depth Protocol

A reasoning protocol that gives any LLM structured depth. Originally designed for Claude's OPUS model, adapted to work with Gemini, GPT, and any instruction-following LLM.

**Key files:**
- `opus-replicant/OPUS-REPLICANT-SYSTEM-v2.md` — Core specification
- `opus-replicant/GEM_MODE_ACTIVATION.md` — Gemini-specific activation
- `opus-replicant/PM1-PM2-PM3/` — Three reasoning modes (Analysis, Execution, Evaluation)
- `opus-replicant/constitutional-layer-v3.md` — Safety guardrails

**What it does:** Forces 3-layer thinking (Immediate → Structural → Strategic) on every output. No surface-level answers. Evidence-backed claims. Steel-man rejected alternatives.

---

### 2. RP-MCP Protocol — Intent + Execution Framework

A lightweight protocol for pairing Reasoning Packages (intent metadata) with MCP tool execution.

**Key file:** `PROTOCOL-RP-MCP-v1.0.md`

**What it does:** For complex tasks, creates a short "intent document" that defines success criteria, risks, and scope *before* any tool is invoked. The agent checks criteria after execution. Simple tasks skip this entirely.

**Format:**
```markdown
# RP: [task name]
## Intenção — what success looks like
## Critério de sucesso — verifiable checkboxes
## O que pode dar errado — risks + mitigations
## Ferramentas MCP envolvidas — which tools and why
## Fora do escopo — what this task does NOT do
```

---

### 3. Engine/Client Separation Pattern

An architectural pattern for multi-tenancy in AIOS: the engine (motor) stays domain-agnostic, client-specific code lives in isolated directories.

```
project-root/
├── squads/          ← engine agents (domain-agnostic)
├── clients/
│   └── experia/     ← client-specific code, configs, assets
│   └── [client-b]/  ← another client, fully isolated
├── scripts/         ← engine scripts
└── .aios-core/      ← engine configuration
```

**Principle:** "O AIOS é motor, não aplicação. Não tem domínio." The same engine serves any business vertical. Domain contamination is actively detected and removed by the Evolution Engine.

---

### 4. AIOS Father — Mentorship Protocol

A simplified mentorship framework for new AIOS operators. Teaches the progression from "person who uses AI" to "person who orchestrates AI systems."

**Key file:** `aios-father/AIOS-FATHER-SIMPLE.md`

---

## How to Use These Contributions

Each contribution is self-contained. Copy the relevant directory into your AIOS workspace:

```bash
# Opus Replicant
cp -r community-edition/opus-replicant/ .aios-core/opus-replicator/

# RP-MCP Protocol
cp community-edition/PROTOCOL-RP-MCP-v1.0.md reasoning-packages/

# Engine/Client Pattern
mkdir -p clients/[your-client]/
# Move domain-specific files there
```

---

## License

All Community Edition contributions are MIT-compatible and designed to work with AIOS v3.9+.

No proprietary KAIROS components (Noesis Engine, Evolution Engine, IA Council, Mind Clones) are included.

---

*Community Edition — KAIROS Project*
*Contributor: Gabriel | February 2026*
