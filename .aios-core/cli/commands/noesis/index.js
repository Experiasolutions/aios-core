/**
 * Noesis Command Module
 *
 * Entry point for all Noesis cognitive engine CLI commands.
 * Includes status, history, run, and test subcommands.
 *
 * @module cli/commands/noesis
 * @version 1.0.0
 * @purpose CLI interface for the Noesis cognitive pipeline (v2.2+)
 */

const { Command } = require('commander');
const { createStatusCommand } = require('./status');
const { createHistoryCommand } = require('./history');
const { createRunCommand } = require('./run');
const { createTestCommand } = require('./test');

/**
 * Create the noesis command with all subcommands
 * @returns {Command} Commander command instance
 */
function createNoesisCommand() {
    const noesis = new Command('noesis');

    noesis
        .description('Noesis Cognitive Engine — quality enforcement, distillation & self-improvement')
        .addHelpText('after', `
Commands:
  status            Show Noesis dashboard (baseline, traces, golden examples)
  history           Show recent cycle history (last 10 cycles)
  run               Run cognitive loop on input/output pair
  test              Run pipeline self-test

Pipeline Phases:
  1. CONTEXT    Load reasoning context, golden examples, anti-patterns
  2. EVALUATE   Score output with PM3 quality gate (7 dimensions)
  2.5 REFLECT   Depth enforcement N0→N3 (Sutskever rule)
  3. HARVEST    Auto-harvest excellent outputs as golden examples
  4. TRACE      Capture distillation trace (JSONL) for fine-tuning
  5. SIGNAL     Emit events, update baseline, check stagnation

Examples:
  $ aios noesis status
  $ aios noesis history
  $ aios noesis test
  $ aios noesis run --input "Create a bridge module" --output scripts/event-bus.js
  $ aios noesis run --input "..." --output "..." --dry-run
`);

    noesis.addCommand(createStatusCommand());
    noesis.addCommand(createHistoryCommand());
    noesis.addCommand(createRunCommand());
    noesis.addCommand(createTestCommand());

    return noesis;
}

module.exports = {
    createNoesisCommand,
};
