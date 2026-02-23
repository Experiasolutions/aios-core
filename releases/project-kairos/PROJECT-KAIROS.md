# Project KAIROS — Technical One-Pager

**For:** Pedro Valério & Alan Nicolas (AIOS Core Creators)
**From:** Gabriel — KAIROS Operator
**Date:** February 23, 2026
**Tone:** Peer-to-peer. No pitch, no selling. Just what was built.

---

## The Problem KAIROS Solves in AIOS

AIOS v3.9 is a brilliant orchestration framework: it defines agents, squads, workflows, and configurations. But the orchestrator itself has no mind. It dispatches tasks but doesn't learn, doesn't remember across sessions, doesn't improve its own quality, and doesn't reason about *why* it's doing what it's doing.

KAIROS gives the AIOS a cognitive layer — an engine that thinks, not just one that routes.

---

## What Was Built in 10 Days

| Component                         | What It Does                                                                                   | Lines of Code |
| :-------------------------------- | :--------------------------------------------------------------------------------------------- | :-----------: |
| **Noesis Engine** (5 layers)      | Identity persistence, cognitive state, self-improvement, quality gating, distillation pipeline |  ~295 KB JS   |
| **Evolution Engine** (17 scripts) | Autonomous gap detection → proposal generation → council voting → auto-apply → verification    |  17 scripts   |
| **IA Council** (8 chairs)         | Multi-perspective deliberation with weighted voting, quorum detection, convergence guards      |     42 KB     |
| **Opus Replicant** in Gemini      | OPUS 4.6 thinking depth running natively in Gemini 3.1 Pro — not just Claude                   |    19 docs    |
| **Engine/Client Separation**      | Multi-tenancy pattern: `squads/` (engine) vs `clients/experia/` (domain) — motor ≠ application | Architecture  |
| **MCP Server** (10 tools)         | External access to agents, squads, skills (398+ discovered)                                    |   1 script    |
| **Distillation Pipeline**         | Captures reasoning traces for eventual LoRA fine-tune of a 3B-7B local model                   | 21/500 traces |

### What makes this different from a plugin or extension:

This isn't a feature added to AIOS. It's a **cognitive architecture** layered on top. The system produces the improvements that improve how it produces improvements. The Evolution Engine finds its own gaps, the Council votes on fixes, the Apply Engine patches the codebase, and the Verification Engine confirms nothing broke — all without human intervention.

---

## The Architecture Graph

```
                    ┌──────────────────────────────────┐
                    │         KAIROS KERNEL             │
                    │    (Noesis Engine + OPUS 4.6)     │
                    └──────────┬───────────────────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
    ┌─────────▼──────┐  ┌─────▼──────┐  ┌──────▼────────┐
    │ Evolution       │  │ Cognitive   │  │ IA Council    │
    │ Engine (17)     │  │ State       │  │ (8 chairs)    │
    │ Gap→Propose→    │  │ Engine      │  │ Weighted vote │
    │ Apply→Verify    │  │ Boot→Drift  │  │ Quorum detect │
    └─────────┬──────┘  └─────┬──────┘  └──────┬────────┘
              │                │                │
              └────────────────┼────────────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
    ┌─────────▼──────┐  ┌─────▼──────┐  ┌──────▼────────┐
    │ MCP Server      │  │ Kernel      │  │ Tools Bridge  │
    │ (10 tools)      │  │ Bridge      │  │ (398+ skills) │
    │ External access │  │ Synapse/IDS │  │ Search/Read   │
    └─────────┬──────┘  └─────┬──────┘  └──────┬────────┘
              │                │                │
              └────────────────┼────────────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         │                     │                     │
    ┌────▼─────┐         ┌─────▼─────┐         ┌────▼─────┐
    │ Squads   │         │ Clients   │         │ Tools    │
    │ 109 agts │         │ Experia   │         │ 10 deep  │
    │ 67 clones│         │ 250 files │         │ integrs  │
    └──────────┘         └───────────┘         └──────────┘
```

---

## Questions That Open the Conversation

### For Pedro:

> "AIOS is Task-First Architecture — and it's excellent at that. But what happens when the orchestrator needs to remember *why* it made a decision three sessions ago? How do you think about the distinction between task routing and cognitive persistence in the orchestrator itself?"

The Cognitive State Engine is my answer to this. It boots with identity, observes patterns during execution, compresses observations into strengths/blindspots, tracks drift from the identity anchor, and snapshots state across sessions. But I'd love to know how you think about this problem.

### For Alan:

> "How do you distinguish between a system that *knows* and a system that *thinks*? Can you describe an observable behavior that separates one from the other?"

The IA Council is my experiment with this. 8 chairs with distinct perspectives vote on proposals. Karpathy checks code quality. Sutskever checks cognitive architecture. Hassabis checks learning loops. Pedro checks AIOS alignment. Alan checks product applicability. They disagree. The disagreement *is* the thinking — not the consensus, but the tension that produces it.

---

## What KAIROS Contributes Back to AIOS (Community Edition)

| Contribution             | What It Is                                 | License Impact                      |
| :----------------------- | :----------------------------------------- | :---------------------------------- |
| Opus Replicant Engine    | Think-with-depth protocol for any LLM      | Documentation only — MIT compatible |
| RP-MCP Protocol          | Intent metadata + tool execution framework | New concept — no code dependencies  |
| Engine/Client Separation | Multi-tenancy architecture pattern         | Structural pattern — MIT compatible |
| AIOS Father              | Mentorship protocol for new AIOS operators | Documentation only                  |

What stays proprietary in KAIROS: Noesis Engine, Evolution Engine (17 scripts), IA Council, Mind Clones, Operator Noesis.

---

## What This Is Not

- Not a pitch for investment or partnership
- Not a request for repository access
- Not competitive — KAIROS needs AIOS to exist
- Not a fork — it's a layer that sits on top and gives back to the foundation

---

*"O AIOS é motor, não aplicação. Não tem domínio."*
*— Immutable Declaration #1*

*KAIROS is what happens when the motor starts thinking about where it's going.*
