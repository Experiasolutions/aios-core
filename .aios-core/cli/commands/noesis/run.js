/**
 * Noesis Run Subcommand
 *
 * Runs the Noesis cognitive loop on an input/output pair.
 * Output can be provided inline or as a file path.
 *
 * @module cli/commands/noesis/run
 * @version 1.0.0
 */

const { Command } = require('commander');
const path = require('path');
const fs = require('fs');

/**
 * Create the run subcommand
 * @returns {Command} Commander command instance
 */
function createRunCommand() {
    const cmd = new Command('run');

    cmd
        .description('Run cognitive loop on input/output pair')
        .requiredOption('--input <text>', 'The original input/request (task description)')
        .requiredOption('--output <text|path>', 'The generated output to evaluate (inline text or file path)')
        .option('--dry-run', 'Skip harvest and signal phases', false)
        .option('--mode <mode>', 'Force PM mode (PM1/PM2/PM3)', '')
        .addHelpText('after', `
Examples:
  $ aios noesis run --input "Create a bridge module" --output "const x = 1;"
  $ aios noesis run --input "Implement event bus" --output scripts/event-bus.js
  $ aios noesis run --input "Test" --output scripts/event-bus.js --dry-run
`)
        .action((options) => {
            try {
                const pipelineModule = require(path.join(__dirname, '..', '..', '..', '..', 'scripts', 'evolution', 'noesis-pipeline'));

                // Resolve output: file path or inline text
                let outputContent = options.output;
                const resolvedPath = path.resolve(options.output);
                if (fs.existsSync(resolvedPath)) {
                    outputContent = fs.readFileSync(resolvedPath, 'utf-8');
                    console.log(`📄 Reading output from file: ${path.basename(resolvedPath)} (${outputContent.length} chars)\n`);
                }

                const runOptions = {
                    dryRun: options.dryRun,
                    taskDescription: options.input,
                };
                if (options.mode) runOptions.mode = options.mode;

                const result = pipelineModule.runCognitiveLoop(options.input, outputContent, runOptions);

                // Display results
                console.log(`🧠 Noesis Pipeline v${pipelineModule.VERSION} — Cycle Complete\n`);
                console.log(`  Score:     ${result.score}/10`);
                console.log(`  Depth:     ${result.depthScore}/4`);
                console.log(`  Verdict:   ${result.verdict}`);
                console.log(`  Mode:      ${result.mode}`);
                console.log(`  Harvested: ${result.harvested}`);
                console.log(`  Traced:    ${result.traced}${result.traceId ? ` (${result.traceId})` : ''}`);
                console.log(`  Retried:   ${result.retried}`);
                console.log(`  Duration:  ${result.totalDuration}ms`);

                if (result.verdict === 'FAIL') {
                    process.exit(2);
                }
            } catch (err) {
                console.error(`❌ Failed to run Noesis pipeline: ${err.message}`);
                process.exit(1);
            }
        });

    return cmd;
}

module.exports = {
    createRunCommand,
};
