/**
 * harvest-gold.js — The Karpathy/Sutskever Loop
 *
 * PURPOSE:
 *  - Triggered when User Satisfaction = 10/10
 *  - Extracts the last interaction
 *  - Compresses it into the <trace> schema
 *  - Saves it to golden-examples/auto-harvested/
 *
 * USAGE:
 *  node harvest-gold.js --input <session-log> --id <session-id>
 */

const fs = require('fs');
const path = require('path');

// Mock function for "Compression" (In prod, this calls a cheap LLM)
function compressThought(prompt, output) {
    return `
<trace>
Problem: ${prompt.substring(0, 50)}...
Insight: [Auto-Generated Insight Placeholder]
Reasoning: [Auto-Compressed Reasoning Placeholder]
Solution: ${output.substring(0, 100)}...
</trace>
    `.trim();
}

function harvest(sessionId, logContent) {
    const harvestDir = './.aios-core/memory/golden-examples/auto-harvested';

    if (!fs.existsSync(harvestDir)) {
        fs.mkdirSync(harvestDir, { recursive: true });
    }

    // In a real scenario, we parse the last turn from the log
    const prompt = "User Prompt Placeholder";
    const output = "AI Output Placeholder";

    const compressed = compressThought(prompt, output);
    const filename = `${harvestDir}/harvest-${sessionId}-${Date.now()}.md`;

    fs.writeFileSync(filename, compressed);
    console.log(`[GOLD HARVESTED] Saved to ${filename}`);
    console.log(`[METRICS] +1 Golden Example added to the Data Engine.`);
}

// Main execution
const sessionId = process.argv[3] || 'session-001';
harvest(sessionId, '');
