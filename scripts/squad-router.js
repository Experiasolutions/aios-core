/**
 * @module squad-router
 * @version 1.0.0
 * @purpose Route any message to the correct squad using a Decision Tree.
 *          Merges bridge routes (functional) with FigJam routes (planned)
 *          into a single multi-squad router.
 * @inputs  User message string (CLI arg)
 * @outputs Routing decision { route, squad, source, functional } + action.json
 * @dependencies bridge-config.json, figjam-squads.json, experia_bridge.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const FIGJAM = JSON.parse(fs.readFileSync(path.join(__dirname, 'figjam-squads.json'), 'utf8'));
const BRIDGE_CONFIG = JSON.parse(fs.readFileSync(path.join(__dirname, 'bridge-config.json'), 'utf8'));

// ── Load client bridge patterns from clients/*/config/ ────────
function loadClientBridgePatterns() {
    const clientsDir = path.join(ROOT, 'clients');
    if (!fs.existsSync(clientsDir)) return [];
    const patterns = [];
    for (const client of fs.readdirSync(clientsDir)) {
        const configPath = path.join(clientsDir, client, 'config', 'bridge-routes.json');
        if (fs.existsSync(configPath)) {
            try {
                const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
                if (Array.isArray(config.bridgeRoutes)) patterns.push(...config.bridgeRoutes);
            } catch (e) { /* skip malformed config */ }
        }
    }
    return patterns;
}

// ── Merge bridge routes + figjam routes ──────────────────────
function getAllRoutes() {
    const routes = {};

    // Bridge routes (already functional)
    for (const [id, route] of Object.entries(BRIDGE_CONFIG.routes)) {
        routes[id] = { ...route, source: 'bridge', functional: true };
    }

    // FigJam routes (new departments)
    for (const [squadId, squad] of Object.entries(FIGJAM.squads)) {
        for (const [routeId, route] of Object.entries(squad.routes)) {
            routes[routeId] = {
                ...route,
                squad: squadId,
                aiHead: squad.aiHead,
                agents: squad.agents,
                source: 'figjam',
                functional: false, // Precisam de task files
            };
        }
    }

    return routes;
}

// ── Decision Tree Router ─────────────────────────────────────
function routeMessage(message) {
    const lower = message.toLowerCase();

    // 1. Check client bridge routes (loaded from clients/*/config/)
    const bridgePatterns = loadClientBridgePatterns();


    for (const p of bridgePatterns) {
        if (p.keywords.some(k => lower.includes(k))) {
            return { route: p.route, squad: p.squad, source: 'bridge', functional: true };
        }
    }

    // 2. Check FigJam decision tree
    for (const rule of FIGJAM.decisionTree.rules) {
        if (rule.keywords.some(k => lower.includes(k))) {
            const routeId = rule.route;
            for (const [squadId, squad] of Object.entries(FIGJAM.squads)) {
                if (squad.routes[routeId]) {
                    return { route: routeId, squad: squadId, source: 'figjam', functional: false, aiHead: squad.aiHead };
                }
            }
        }
    }

    return null;
}

// ── Execute route ────────────────────────────────────────────
function executeRoute(message, routeInfo) {
    if (routeInfo.source === 'bridge' && routeInfo.functional) {
        // Use existing bridge
        const context = {
            source: 'squad-router',
            trigger: 'user_request',
            project: routeInfo.route,
            timestamp: new Date().toISOString(),
            data: { request: message, params: {} },
        };

        const ctxPath = path.join(ROOT, 'context.json');
        fs.writeFileSync(ctxPath, JSON.stringify(context, null, 2));

        const bridge = path.join(__dirname, 'experia_bridge.js');
        execSync(`node "${bridge}" "${ctxPath}" ${routeInfo.route}`, { cwd: ROOT, stdio: 'pipe', timeout: 30000 });

        return JSON.parse(fs.readFileSync(path.join(ROOT, 'action.json'), 'utf8'));
    }

    // FigJam routes — not yet functional, return plan
    return {
        status: 'planned',
        route: routeInfo.route,
        squad: routeInfo.squad,
        aiHead: routeInfo.aiHead,
        message: `Rota "${routeInfo.route}" (Squad: ${routeInfo.squad}) ainda precisa de task file. Use o bridge para criar.`,
        nextStep: `Criar: squads/${routeInfo.squad}/tasks/${routeInfo.route}.md`,
    };
}

// ── Main ──────────────────────────────────────────────────────
function main() {
    const args = process.argv.slice(2);

    if (args[0] === '--squads') {
        console.log('\n🏢 AIOS Squads — FigJam Blueprint\n');
        console.log('┌──────────────────┬──────────────────────┬────────────────────────────────────────┬──────────┐');
        console.log('│ Squad            │ AI Head              │ Agentes                                │ Status   │');
        console.log('├──────────────────┼──────────────────────┼────────────────────────────────────────┼──────────┤');

        // Bridge squad (Experia)
        console.log('│ Experia          │ @experia-master      │ 10 agentes (copy, data, auto...)       │ ✅ ATIVO │');
        console.log('│ Doombot          │ @doom-master         │ 10 agentes (sentinel, revenue...)      │ ✅ ATIVO │');

        for (const [id, squad] of Object.entries(FIGJAM.squads)) {
            const name = squad.name.padEnd(16);
            const head = squad.aiHead.padEnd(20);
            const agents = squad.agents.slice(0, 3).join(', ').padEnd(38);
            console.log(`│ ${name} │ ${head} │ ${agents} │ 📋 PLAN  │`);
        }
        console.log('└──────────────────┴──────────────────────┴────────────────────────────────────────┴──────────┘');
        console.log(`\n  Total: 9 squads, 47+ agentes, 11 rotas (5 ativas + 6 planejadas)\n`);
        return;
    }

    if (args[0] === '--test') {
        console.log('\n🧪 Testando Decision Tree Router\n');
        const tests = [
            'Quanto custa o botox?',
            'Classifique esse lead do Instagram',
            'Gere o relatório financeiro',
            'Crie uma campanha de marketing para Instagram',
            'Preciso fechar a venda com o cliente',
            'Verifique a satisfação do cliente',
            'Processe a folha de pagamento',
            'Audite os acessos do sistema',
            'Mapeie o processo de atendimento',
            'Lance o novo serviço de limpeza de pele',
        ];
        for (const t of tests) {
            const r = routeMessage(t);
            const icon = r ? (r.functional ? '✅' : '📋') : '❓';
            const route = r ? `${r.route} (${r.squad})` : 'sem rota';
            console.log(`  ${icon} "${t}" → ${route}`);
        }
        console.log('');
        return;
    }

    if (!args[0]) {
        console.log('Uso: node scripts/squad-router.js "sua mensagem"');
        console.log('     node scripts/squad-router.js --squads');
        console.log('     node scripts/squad-router.js --test');
        return;
    }

    const message = args[0];
    console.log('═══════════════════════════════════════════════════');
    console.log('  🏢 AIOS Multi-Squad Router');
    console.log('═══════════════════════════════════════════════════\n');
    console.log(`📩 "${message}"\n`);

    const routeInfo = routeMessage(message);

    if (!routeInfo) {
        console.log('❓ Nenhum squad identificado. Encaminhando para chat geral (Orion).\n');
        return;
    }

    console.log(`🎯 Squad: ${routeInfo.squad.toUpperCase()}`);
    console.log(`📍 Rota: ${routeInfo.route}`);
    console.log(`⚡ Status: ${routeInfo.functional ? 'ATIVO (executando...)' : 'PLANEJADO (será ativado em breve)'}\n`);

    const start = Date.now();
    const result = executeRoute(message, routeInfo);
    const elapsed = Date.now() - start;

    if (result.status === 'success') {
        console.log(`✅ Resultado (${elapsed}ms):`);
        console.log(`  Action: ${result.action?.type}`);
        console.log(`  Resposta: ${JSON.stringify(result.action?.payload).substring(0, 100)}...\n`);
    } else if (result.status === 'planned') {
        console.log(`📋 Rota planejada:`);
        console.log(`  AI Head: ${result.aiHead}`);
        console.log(`  Próximo passo: ${result.nextStep}\n`);
    }
}

main();
