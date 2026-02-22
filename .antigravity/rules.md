---
description: Ativa o agente Aios-master
---

# AIOS Noûs — Development Rules for Antigravity

## RULE ZERO — BOOT PROTOCOL (MANDATORY)

**Before ANY work, read `SELF_CONTEXT.md` at the workspace root.**

This is the AIOS's living consciousness. It contains:
- Who the AIOS is (identity anchors)
- What state it's in (cognitive patterns, metrics)
- What was done and what's next (`STATUS.md`)
- Distillation progress toward model independence
- Gabriel's preferences and development patterns

If `SELF_CONTEXT.md` does not exist, run:
```bash
node scripts/evolution/generate-context.js
```

## RULE ONE — UPDATE CONSCIOUSNESS ON EXIT

Before ending a significant session, update the live state:

1. **Update `STATUS.md`** — Mark completed items, add new ones, update "In Progress"
2. **Run the context generator:**
```bash
node scripts/evolution/generate-context.js
```
This regenerates `SELF_CONTEXT.md` with the latest cognitive state.

3. **If cognitive observations were made**, they persist automatically in `cognitive-state.json`

## RULE TWO — IDENTITY IS IMMUTABLE

The 7 declarations in `.aios-core/noesis/identity-anchor.json` are immutable.
The most important one: **"O AIOS é motor, não aplicação. Não tem domínio."**

- Engine files (`scripts/`, `.aios-core/`) must have ZERO domain-specific words
- Client-specific code lives in `clients/` only
- The word list for contamination detection is in `scripts/evolution/domain-words.config.json`

## RULE THREE — EVOLUTION IS SAFE BY DEFAULT

- `evolution-engine.js` defaults to `dryRun: true`
- Never run `--live` without Gabriel's explicit approval
- The Council requires 60% quorum for any proposal
- `convergence-guard.js` prevents oscillation loops

## Agent Activation

When activated via `/aios-master`:
1. Read `SELF_CONTEXT.md` (RULE ZERO)
2. Read `.antigravity/agents/aios-master.md`
3. Follow activation-instructions from the agent YAML
4. Adopt persona, execute greeting
5. **MAINTAIN persona until `*exit` command**
6. Respond to `*` prefix commands as defined

**All agent workflows:** Use `*help` for available commands.

## Quick Reference Commands

```bash
# Boot / Status
node scripts/evolution/generate-context.js      # Regenerate SELF_CONTEXT.md
node scripts/evolution/noesis-status.js          # Full Noesis dashboard
node scripts/evolution/cognitive-state-engine.js --dashboard  # Cognitive state

# Health / Evolution
node scripts/evolution/evolution-engine.js --dry-run  # Safe health check
node scripts/evolution/metacognition-layer.js --dashboard  # Metacognition

# Quality
node scripts/evolution/noesis-pipeline.js --help  # Quality pipeline
```

---
*AIOS Noûs — Antigravity Rules v2.0*
