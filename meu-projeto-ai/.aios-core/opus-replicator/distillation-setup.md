# Cognitive Distillation Setup Guide

> **Status:** Infrastructure Ready. Waiting for Opus 4.6 Activation.
> **Objective:** Fill the `golden-examples/` directories with high-fidelity reasoning traces.

---

## 🏗️ INFRASTRUCTURE MAP

1.  **Golden Data Store:** `.aios-core/memory/golden-examples/`
    - `/reasoning`: For complex analysis & strategy (PM#1)
    - `/execution`: For code, content, & specs (PM#2)
    - `/evaluation`: For self-correction & grading (PM#3)

2.  **Injection Slot:**
    - Prompt Masters have been updated with `{{GOLDEN_EXAMPLES}}` placeholders.
    - This allows the system to inject relevant Opus 4.6 traces into Gemini's context.

---

## 🚀 ACTIVATION PROTOCOL (When Opus 4.6 is Online)

### Step 1: Generate the "Seed Set" (5 Examples)

Use Opus 4.6 to solve these 5 diverse tasks. Save the FULL output (reasoning + result) to the corresponding folder.

**Task 1: Deep Architecture (Reasoning)**
> "Analyze the AIOS file system structure and propose a 3-phase refactoring plan for maximum modularity, citing Torvalds' principles."
> *Save to:* `golden-examples/reasoning/001-architecture-refactor.md`

**Task 2: Viral Copywriting (Execution)**
> "Write a landing page hero section for 'ExperiaAI' using Hormozi's Grand Slam Offer framework. Explain your creative choices."
> *Save to:* `golden-examples/execution/001-viral-copy.md`

**Task 3: Production Code (Execution)**
> "Write a TypeScript 'CircuitBreaker' class with exponential backoff. Explain the error handling logic."
> *Save to:* `golden-examples/execution/002-circuit-breaker.md`

**Task 4: Strategic Evaluation (Evaluation)**
> "Critique this drafted email [insert bad email] against Cialdini's principles. Grade it 1-10."
> *Save to:* `golden-examples/evaluation/001-email-critique.md`

**Task 5: Self-Improvement (Reasoning)**
> "Analyze the last 3 session snapshots. Identify the top pattern of failure and propose a Constitution amendment to fix it."
> *Save to:* `golden-examples/reasoning/002-meta-analysis.md`

### Step 2: Verify Injection

1.  Open `pm1-reasoning.md`.
2.  Manually paste the content of `golden-examples/reasoning/001-architecture-refactor.md` into the `{{GOLDEN_EXAMPLES}}` slot.
3.  Run a new task with Gemini.
4.  **Success Condition:** Gemini adopts Opus's formatting, depth, and tone *automatically*.

---

## 🔄 MAINTENANCE

- **Weekly:** Add 1 new Golden Example from a successful session.
- **Monthly:** Prune examples that are no longer relevant (e.g., old architecture).
