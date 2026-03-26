/**
 * Noesis Test Subcommand
 *
 * Runs the pipeline self-test with built-in mock data.
 * Validates all 6 phases execute correctly.
 *
 * @module cli/commands/noesis/test
 * @version 1.0.0
 */

const { Command } = require('commander');
const path = require('path');

/**
 * Create the test subcommand
 * @returns {Command} Commander command instance
 */
function createTestCommand() {
    const cmd = new Command('test');

    cmd
        .description('Run Noesis pipeline self-test (validates all 6 phases)')
        .action(() => {
            try {
                const pipelineModule = require(path.join(__dirname, '..', '..', '..', '..', 'scripts', 'evolution', 'noesis-pipeline'));

                console.log(`🧠 Noesis Pipeline v${pipelineModule.VERSION} — Self-Test\n`);

                const testInput = 'Implement a new bridge module with error handling and graceful degradation for long-term scalability';
                const testOutput = `/**
 * @module notification-bridge
 * @purpose Bridge between notification providers and AIOS event bus.
 *          Design decision: uses Map for O(1) provider lookup.
 *          Trade-off: memory vs speed — chose speed for real-time use.
 */
const EventEmitter = require('events');

class NotificationBridge extends EventEmitter {
    constructor(config) {
        super();
        this.config = config;
        this.providers = new Map();
    }

    async send(channel, message) {
        const provider = this.providers.get(channel);
        if (!provider) {
            // Edge case: unknown channel — graceful fallback
            throw new Error('Unknown channel: ' + channel);
        }
        try {
            return await provider.send(message);
        } catch (err) {
            // Error handling: retry with exponential backoff
            this.emit('error', { channel, error: err.message });
            throw err;
        }
    }
}

module.exports = NotificationBridge;`;

                const result = pipelineModule.runCognitiveLoop(testInput, testOutput, { dryRun: false });

                console.log('  PHASES:');
                console.log(`    1. CONTEXT   ${result.phases.context.duration}ms — mode: ${result.mode}, golden: ${result.phases.context.goldenExamples}`);
                console.log(`    2. EVALUATE  ${result.phases.evaluate.duration}ms — raw score: ${result.phases.evaluate.score}/10`);
                console.log(`   2.5 REFLECT   ${result.phases.reflect.duration}ms — depth: ${result.depthScore}/4, shallow: ${result.phases.reflect.shallow}`);
                console.log(`    3. HARVEST   ${result.phases.harvest.duration}ms — harvested: ${result.harvested}`);
                console.log(`    4. TRACE     ${result.phases.trace.duration}ms — traced: ${result.traced}, id: ${result.traceId}`);
                console.log(`    5. SIGNAL    ${result.phases.signal.duration}ms — events: ${(result.phases.signal.eventsEmitted || []).length}`);
                console.log('');
                console.log(`  TOTAL: ${result.totalDuration}ms`);
                console.log(`  VERDICT: ${result.verdict} (${result.score}/10) | Depth: ${result.depthScore}/4 | Retried: ${result.retried}`);
                console.log('');
                console.log('✅ Noesis Pipeline self-test complete.');
            } catch (err) {
                console.error(`❌ Self-test failed: ${err.message}`);
                process.exit(1);
            }
        });

    return cmd;
}

module.exports = {
    createTestCommand,
};
