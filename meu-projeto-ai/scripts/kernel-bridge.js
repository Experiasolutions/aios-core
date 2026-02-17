#!/usr/bin/env node

// AIOS Kernel Bridge — Thin wrapper connecting .aios-core modules to scripts layer
// Provides unified API for Synapse, IDS, and WIS kernel modules.

const path = require('path');
const fs = require('fs');

const AIOS_ROOT = path.join(__dirname, '..');
const CORE_PATH = path.join(AIOS_ROOT, '.aios-core', 'core');
const SYNAPSE_PATH = path.join(AIOS_ROOT, '.synapse');
const DATA_PATH = path.join(AIOS_ROOT, '.aios-core', 'data');

// ── Graceful Module Loader ───────────────────────────────────

function safeRequire(modulePath, label) {
    try {
        return require(modulePath);
    } catch (err) {
        const isModuleNotFound = err.code === 'MODULE_NOT_FOUND';
        if (!isModuleNotFound) {
            console.warn(`[kernel-bridge] Error loading ${label}: ${err.message}`);
        }
        return null;
    }
}

// ── Synapse Bridge ───────────────────────────────────────────

function createSynapseBridge() {
    const synapseModule = safeRequire(
        path.join(CORE_PATH, 'synapse', 'engine'),
        'SynapseEngine',
    );

    if (!synapseModule) {
        return {
            available: false,
            process: async () => ({ xml: '', metrics: { error: 'Synapse not loaded' } }),
            getMetrics: () => ({ error: 'Synapse not loaded' }),
            getLayerCount: () => 0,
        };
    }

    const { SynapseEngine } = synapseModule;
    let engine = null;

    function getEngine() {
        if (!engine) {
            engine = new SynapseEngine(SYNAPSE_PATH, { devmode: false });
        }
        return engine;
    }

    return {
        available: true,

        async process(prompt, session) {
            const eng = getEngine();
            const safeSession = session || { prompt_count: 0 };
            return eng.process(prompt || '', safeSession);
        },

        getMetrics() {
            const metricsFile = path.join(SYNAPSE_PATH, 'metrics', 'hook-metrics.json');
            if (!fs.existsSync(metricsFile)) {
                return { status: 'no-metrics-yet', file: metricsFile };
            }
            try {
                return JSON.parse(fs.readFileSync(metricsFile, 'utf8'));
            } catch {
                return { status: 'parse-error' };
            }
        },

        getLayerCount() {
            return getEngine().layers.length;
        },
    };
}

// ── IDS Bridge ───────────────────────────────────────────────

function createIDSBridge() {
    const idsModule = safeRequire(
        path.join(CORE_PATH, 'ids', 'incremental-decision-engine'),
        'IncrementalDecisionEngine',
    );
    const loaderModule = safeRequire(
        path.join(CORE_PATH, 'ids', 'registry-loader'),
        'RegistryLoader',
    );

    if (!idsModule || !loaderModule) {
        return {
            available: false,
            analyze: () => ({ error: 'IDS not loaded' }),
            getEntityCount: () => 0,
            getRegistryStatus: () => ({ error: 'IDS not loaded' }),
        };
    }

    const { IncrementalDecisionEngine } = idsModule;
    const { RegistryLoader } = loaderModule;
    let loader = null;
    let engine = null;

    function getLoader() {
        if (!loader) {
            loader = new RegistryLoader();
            loader.load();
        }
        return loader;
    }

    function getEngine() {
        if (!engine) {
            engine = new IncrementalDecisionEngine(getLoader());
        }
        return engine;
    }

    return {
        available: true,

        analyze(intent, context) {
            return getEngine().analyze(intent, context || {});
        },

        getEntityCount() {
            return getLoader().getEntityCount();
        },

        getRegistryStatus() {
            const ld = getLoader();
            return {
                entities: ld.getEntityCount(),
                categories: ld.getCategories(),
                metadata: ld.getMetadata(),
            };
        },
    };
}

// ── WIS Bridge ───────────────────────────────────────────────

function createWISBridge() {
    const wisModule = safeRequire(
        path.join(AIOS_ROOT, '.aios-core', 'workflow-intelligence'),
        'WorkflowIntelligence',
    );

    if (!wisModule) {
        return {
            available: false,
            getSuggestions: () => [],
            getStats: () => ({ error: 'WIS not loaded' }),
            getWorkflowNames: () => [],
            matchWorkflow: () => null,
        };
    }

    return {
        available: true,

        getSuggestions(context) {
            return wisModule.getSuggestions(context || {});
        },

        getStats() {
            return wisModule.getStats();
        },

        getWorkflowNames() {
            return wisModule.getWorkflowNames();
        },

        matchWorkflow(commands) {
            return wisModule.matchWorkflow(commands || []);
        },

        hasLearning() {
            return wisModule.learning !== null && wisModule.learning !== undefined;
        },
    };
}

// ── Unified Bridge ───────────────────────────────────────────

function createKernelBridge() {
    const synapse = createSynapseBridge();
    const ids = createIDSBridge();
    const wis = createWISBridge();

    return {
        synapse,
        ids,
        wis,

        getSystemHealth() {
            return {
                timestamp: new Date().toISOString(),
                modules: {
                    synapse: {
                        available: synapse.available,
                        layers: synapse.available ? synapse.getLayerCount() : 0,
                        metrics: synapse.available ? synapse.getMetrics() : null,
                    },
                    ids: {
                        available: ids.available,
                        entities: ids.available ? ids.getEntityCount() : 0,
                        registry: ids.available ? ids.getRegistryStatus() : null,
                    },
                    wis: {
                        available: wis.available,
                        workflows: wis.available ? wis.getWorkflowNames() : [],
                        stats: wis.available ? wis.getStats() : null,
                        hasLearning: wis.available ? wis.hasLearning() : false,
                    },
                },
                overall: synapse.available && ids.available && wis.available
                    ? 'ACTIVE'
                    : (synapse.available || ids.available || wis.available ? 'PARTIAL' : 'FAILED'),
            };
        },
    };
}

// ── Singleton ────────────────────────────────────────────────

let _bridge = null;

function getBridge() {
    if (!_bridge) {
        _bridge = createKernelBridge();
    }
    return _bridge;
}

module.exports = { createKernelBridge, getBridge };
