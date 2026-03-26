/**
 * Noesis Status Subcommand
 *
 * Displays the Noesis cognitive engine dashboard: quality baseline,
 * distillation progress, golden examples, and anti-pattern catalog.
 *
 * @module cli/commands/noesis/status
 * @version 1.0.0
 */

const { Command } = require('commander');
const path = require('path');

/**
 * Create the status subcommand
 * @returns {Command} Commander command instance
 */
function createStatusCommand() {
    const cmd = new Command('status');

    cmd
        .description('Show Noesis dashboard (baseline, traces, golden examples, health)')
        .action(() => {
            try {
                const statusModule = require(path.join(__dirname, '..', '..', '..', '..', 'scripts', 'evolution', 'noesis-status'));
                statusModule.showStatus();
            } catch (err) {
                console.error(`❌ Failed to load Noesis status module: ${err.message}`);
                process.exit(1);
            }
        });

    return cmd;
}

module.exports = {
    createStatusCommand,
};
