/**
 * Noesis History Subcommand
 *
 * Displays the last 10 Noesis cognitive cycles with score, depth,
 * verdict, mode, and timing information.
 *
 * @module cli/commands/noesis/history
 * @version 1.0.0
 */

const { Command } = require('commander');
const path = require('path');

/**
 * Create the history subcommand
 * @returns {Command} Commander command instance
 */
function createHistoryCommand() {
    const cmd = new Command('history');

    cmd
        .description('Show recent cycle history (last 10 Noesis cycles)')
        .action(() => {
            try {
                const statusModule = require(path.join(__dirname, '..', '..', '..', '..', 'scripts', 'evolution', 'noesis-status'));
                statusModule.showHistory();
            } catch (err) {
                console.error(`❌ Failed to load Noesis status module: ${err.message}`);
                process.exit(1);
            }
        });

    return cmd;
}

module.exports = {
    createHistoryCommand,
};
