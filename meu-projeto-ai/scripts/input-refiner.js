/**
 * AIOS Input Refiner (The "Quality Filter")
 * 
 * Objective: Translate raw user intent into Opus-Level Prompts using PM1/PM2/PM3 frameworks.
 * Usage: node scripts/input-refiner.js "analyze this file"
 */

const fs = require('fs');
const path = require('path');

// ── Definitions ──────────────────────────────────────────────

const PROMPT_MODES = {
    REASONING: {
        id: 'PM1',
        trigger: ['analyze', 'think', 'plan', 'strategy', 'why', 'how', 'audit'],
        template: `
# MISSION: DEEP REASONING (PM1 PROTOCOL)
You are the Chief Strategy Officer.
1. DECOMPOSE: Break the user request into atomic first principles.
2. ANALYZE: Look for contradictions, missing context, and hidden risks.
3. SYNTHESIZE: Provide a comprehensive strategic assessment.
4. OUTPUT: Markdown report with "Executive Summary", "Deep Dive", and "Action Plan".
`
    },
    EXECUTION: {
        id: 'PM2',
        trigger: ['write', 'code', 'create', 'generate', 'build', 'implement', 'fix'],
        template: `
# MISSION: FLAWLESS EXECUTION (PM2 PROTOCOL)
You are the Senior Principal Engineer.
1. SPECIFY: Define the file structure, dependencies, and types first.
2. IMPLEMENT: Write production-grade code (no placeholders).
3. VERIFY: Ensure syntax correctness and logical flow.
4. OUTPUT: Complete file content ready for 'write_to_file'.
`
    },
    EVALUATION: {
        id: 'PM3',
        trigger: ['review', 'test', 'check', 'critique', 'score', 'grade'],
        template: `
# MISSION: RUTHLESS CRITIQUE (PM3 PROTOCOL)
You are the Lead Auditor.
1. CRITERIA: Establish "Golden Standards" for this artifact.
2. AUDIT: Compare the input against the standards line-by-line.
3. SCORE: Assign a 0-100 score with strict penalties for hallucinations.
4. OUTPUT: "Pass/Fail" verdict with specific remediation steps.
`
    }
};

// ── Logic ────────────────────────────────────────────────────

function detectMode(input) {
    const lower = input.toLowerCase();

    // Check triggers
    for (const mode of Object.values(PROMPT_MODES)) {
        if (mode.trigger.some(t => lower.includes(t))) {
            return mode;
        }
    }

    // Default to Reasoning if complex, or Execution if specific
    if (lower.includes('.js') || lower.includes('.md') || lower.includes('file')) {
        return PROMPT_MODES.EXECUTION;
    }

    return PROMPT_MODES.REASONING; // Default safety
}

function refineInput(rawInput) {
    const mode = detectMode(rawInput);

    return {
        original: rawInput,
        mode: mode.id,
        refined_prompt: `
${mode.template.trim()}

---
USER REQUEST:
"${rawInput}"
---
Use your specific protocol to satisfy this request with maximum fidelity.
`
    };
}

// ── CLI Adapter ──────────────────────────────────────────────

if (require.main === module) {
    const input = process.argv[2];
    if (!input) {
        console.log("Usage: node scripts/input-refiner.js <input_string>");
        process.exit(1);
    }

    const result = refineInput(input);

    console.log(JSON.stringify(result, null, 2));

    // Optional: Save to a "staging" file for the Kernel to pick up
    const stagePath = path.join(__dirname, '..', '.aios-core', 'data', 'staged_prompt.json');
    fs.writeFileSync(stagePath, JSON.stringify(result, null, 2));
}

module.exports = { refineInput };
