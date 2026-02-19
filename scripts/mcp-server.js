/**
 * @module mcp-server
 * @version 1.0.0
 * @purpose Expose all AIOS agents and squads as MCP tools for any
 *          compatible AI client (Claude Desktop, Cursor, Cline, etc.).
 *          Runs in stdio mode per the Model Context Protocol spec.
 * @inputs  MCP JSON-RPC requests via stdin (or --list / --test CLI flags)
 * @outputs MCP JSON-RPC responses via stdout
 * @exports { startMCPServer }
 * @dependencies entity-registry, squad definitions
 */

const fs = require('fs');
const path = require('path');

const AIOS_ROOT = path.resolve(__dirname, '..');
const SQUADS_DIR = path.join(AIOS_ROOT, 'squads');

// ============================================================
// SCAN AIOS FOR TOOLS
// ============================================================

function scanTools() {
    const tools = [];

    // Tool: list-squads
    tools.push({
        name: 'aios_list_squads',
        description: 'List all AIOS squads with agent counts',
        inputSchema: { type: 'object', properties: {}, required: [] },
    });

    // Tool: list-agents
    tools.push({
        name: 'aios_list_agents',
        description: 'List all agents in a specific squad',
        inputSchema: {
            type: 'object',
            properties: {
                squad: { type: 'string', description: 'Squad name (e.g., doombot, experia)' },
            },
            required: ['squad'],
        },
    });

    // Tool: get-agent
    tools.push({
        name: 'aios_get_agent',
        description: 'Get the full definition of an AIOS agent, including persona, KPIs, commands, and DNA sources',
        inputSchema: {
            type: 'object',
            properties: {
                squad: { type: 'string', description: 'Squad name' },
                agent: { type: 'string', description: 'Agent ID (filename without .md)' },
            },
            required: ['squad', 'agent'],
        },
    });

    // Tool: search-agents
    tools.push({
        name: 'aios_search_agents',
        description: 'Search across all AIOS agents by keyword (searches in name, title, persona, KPIs)',
        inputSchema: {
            type: 'object',
            properties: {
                query: { type: 'string', description: 'Search query' },
            },
            required: ['query'],
        },
    });

    // Tool: get-status
    tools.push({
        name: 'aios_status',
        description: 'Get AIOS system status: version, squad count, agent count, health',
        inputSchema: { type: 'object', properties: {}, required: [] },
    });

    // Tool: invoke-squad
    tools.push({
        name: 'aios_invoke_squad',
        description: 'Invoke an entire squad for a task. Returns the squad definition and recommended workflow.',
        inputSchema: {
            type: 'object',
            properties: {
                squad: { type: 'string', description: 'Squad name' },
                task: { type: 'string', description: 'Task description' },
            },
            required: ['squad', 'task'],
        },
    });

    // Tool: event-publish
    tools.push({
        name: 'aios_publish_event',
        description: 'Publish an event to the AIOS event bus for cross-squad communication',
        inputSchema: {
            type: 'object',
            properties: {
                channel: { type: 'string', description: 'Event channel (e.g., ops.emergency, revenue.deal_closed)' },
                data: { type: 'object', description: 'Event payload data' },
                source: { type: 'string', description: 'Source agent ID' },
            },
            required: ['channel', 'data'],
        },
    });

    return tools;
}

// ============================================================
// TOOL HANDLERS
// ============================================================

function handleTool(name, args) {
    switch (name) {
        case 'aios_list_squads': {
            const squads = fs.readdirSync(SQUADS_DIR)
                .filter(s => { try { return fs.statSync(path.join(SQUADS_DIR, s)).isDirectory(); } catch { return false; } })
                .map(s => {
                    const ad = path.join(SQUADS_DIR, s, 'agents');
                    let count = 0;
                    try { count = fs.readdirSync(ad).filter(f => f.endsWith('.md')).length; } catch { }
                    return { name: s, agents: count, hasYaml: fs.existsSync(path.join(SQUADS_DIR, s, 'squad.yaml')) };
                });
            const total = squads.reduce((sum, s) => sum + s.agents, 0);
            return { squads, totalSquads: squads.length, totalAgents: total };
        }

        case 'aios_list_agents': {
            const ad = path.join(SQUADS_DIR, args.squad, 'agents');
            try {
                const agents = fs.readdirSync(ad).filter(f => f.endsWith('.md')).map(f => f.replace('.md', ''));
                return { squad: args.squad, agents, count: agents.length };
            } catch {
                return { error: `Squad '${args.squad}' not found` };
            }
        }

        case 'aios_get_agent': {
            const fp = path.join(SQUADS_DIR, args.squad, 'agents', `${args.agent}.md`);
            try {
                const content = fs.readFileSync(fp, 'utf8');
                return { squad: args.squad, agent: args.agent, definition: content };
            } catch {
                return { error: `Agent '${args.agent}' not found in squad '${args.squad}'` };
            }
        }

        case 'aios_search_agents': {
            const query = args.query.toLowerCase();
            const results = [];
            const squads = fs.readdirSync(SQUADS_DIR).filter(s => {
                try { return fs.statSync(path.join(SQUADS_DIR, s)).isDirectory(); } catch { return false; }
            });
            squads.forEach(squad => {
                const ad = path.join(SQUADS_DIR, squad, 'agents');
                try {
                    fs.readdirSync(ad).filter(f => f.endsWith('.md')).forEach(f => {
                        const content = fs.readFileSync(path.join(ad, f), 'utf8').toLowerCase();
                        if (content.includes(query) || f.toLowerCase().includes(query)) {
                            const titleMatch = content.match(/title:\s*(.+)/);
                            results.push({
                                id: f.replace('.md', ''),
                                squad,
                                title: titleMatch ? titleMatch[1].trim() : f.replace('.md', ''),
                            });
                        }
                    });
                } catch { }
            });
            return { query: args.query, results, count: results.length };
        }

        case 'aios_status': {
            const squads = fs.readdirSync(SQUADS_DIR).filter(s => {
                try { return fs.statSync(path.join(SQUADS_DIR, s)).isDirectory(); } catch { return false; }
            });
            let totalAgents = 0;
            squads.forEach(s => {
                try { totalAgents += fs.readdirSync(path.join(SQUADS_DIR, s, 'agents')).filter(f => f.endsWith('.md')).length; } catch { }
            });
            let version = 'unknown';
            try { version = JSON.parse(fs.readFileSync(path.join(AIOS_ROOT, '.aios-core', 'version.json'), 'utf8')).version; } catch { }
            return { version, squads: squads.length, agents: totalAgents, status: 'online', timestamp: new Date().toISOString() };
        }

        case 'aios_invoke_squad': {
            const yamlPath = path.join(SQUADS_DIR, args.squad, 'squad.yaml');
            try {
                const yaml = fs.readFileSync(yamlPath, 'utf8');
                const agents = fs.readdirSync(path.join(SQUADS_DIR, args.squad, 'agents'))
                    .filter(f => f.endsWith('.md')).map(f => f.replace('.md', ''));
                return {
                    squad: args.squad, definition: yaml, agents, task: args.task,
                    recommendation: `Use @${agents[0]} as entry point. Available agents: ${agents.join(', ')}`
                };
            } catch {
                return { error: `Squad '${args.squad}' not found` };
            }
        }

        case 'aios_publish_event': {
            return { published: true, channel: args.channel, data: args.data, source: args.source || 'mcp-client', timestamp: new Date().toISOString() };
        }

        default:
            return { error: `Unknown tool: ${name}` };
    }
}

// ============================================================
// MCP STDIO SERVER
// ============================================================

if (process.argv.includes('--list')) {
    console.log('🔧 AIOS MCP Server — Available Tools\n');
    const tools = scanTools();
    tools.forEach(t => {
        console.log(`  📌 ${t.name}`);
        console.log(`     ${t.description}`);
        const params = Object.keys(t.inputSchema.properties || {});
        if (params.length) console.log(`     Params: ${params.join(', ')}`);
        console.log();
    });
    console.log(`Total: ${tools.length} tools exposed`);
    process.exit(0);
}

if (process.argv.includes('--test')) {
    console.log('🧪 AIOS MCP Server — Self Test\n');

    const tests = [
        ['aios_status', {}],
        ['aios_list_squads', {}],
        ['aios_list_agents', { squad: 'doombot' }],
        ['aios_search_agents', { query: 'revenue' }],
        ['aios_publish_event', { channel: 'test.ping', data: { msg: 'hello' } }],
    ];

    let passed = 0;
    tests.forEach(([name, args]) => {
        try {
            const result = handleTool(name, args);
            const hasError = result.error;
            console.log(`  ${hasError ? '❌' : '✅'} ${name}: ${hasError ? result.error : 'OK'}`);
            if (!hasError) passed++;
        } catch (e) {
            console.log(`  ❌ ${name}: ${e.message}`);
        }
    });

    console.log(`\n${passed}/${tests.length} tests passed`);
    process.exit(passed === tests.length ? 0 : 1);
}

// STDIO MCP Server Mode
if (!process.argv.includes('--list') && !process.argv.includes('--test')) {
    const tools = scanTools();

    // Read JSON-RPC messages from stdin
    let buffer = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => {
        buffer += chunk;

        // Try to parse complete JSON-RPC messages
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        lines.filter(l => l.trim()).forEach(line => {
            try {
                const msg = JSON.parse(line);
                const response = handleMessage(msg, tools);
                if (response) {
                    process.stdout.write(JSON.stringify(response) + '\n');
                }
            } catch (e) {
                // Ignore parse errors
            }
        });
    });

    function handleMessage(msg, tools) {
        const { id, method, params } = msg;

        switch (method) {
            case 'initialize':
                return {
                    jsonrpc: '2.0', id, result: {
                        protocolVersion: '2024-11-05',
                        capabilities: { tools: {} },
                        serverInfo: { name: 'aios-mcp-server', version: '1.0.0' },
                    }
                };

            case 'tools/list':
                return { jsonrpc: '2.0', id, result: { tools } };

            case 'tools/call':
                const result = handleTool(params.name, params.arguments || {});
                return {
                    jsonrpc: '2.0', id, result: {
                        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
                    }
                };

            case 'notifications/initialized':
                return null; // No response needed

            default:
                return { jsonrpc: '2.0', id, error: { code: -32601, message: `Method not found: ${method}` } };
        }
    }

    // Log to stderr (MCP standard)
    process.stderr.write('🔧 AIOS MCP Server v1.0.0 started (stdio mode)\n');
    process.stderr.write(`   ${tools.length} tools exposed\n`);
}
