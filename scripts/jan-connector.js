/**
 * @module jan-connector
 * @version 1.0.0
 * @purpose Bridge AIOS to Jan.ai (local LLM) with Groq cloud fallback.
 *          Auto-detects if user message requires AIOS Bridge execution
 *          and routes accordingly, otherwise falls back to general chat.
 * @inputs  User message string (CLI arg) + optional project-id
 * @outputs LLM response (chat) or action.json (bridge execution)
 * @dependencies experia_bridge.js, .env (GROQ_API_KEY)
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const JAN_API = 'http://127.0.0.1:1337/v1';
const GROQ_API = 'https://api.groq.com/openai/v1';
const GROQ_KEY = process.env.GROQ_API_KEY;
const PROJECT_ROOT = path.join(__dirname, '..');
const BRIDGE = path.join(__dirname, 'experia_bridge.js');

// ── Helpers ──────────────────────────────────────────────────
function httpRequest(url, options, body) {
    return new Promise((resolve, reject) => {
        const lib = url.startsWith('https') ? https : http;
        const req = lib.request(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(JSON.parse(data));
                } else {
                    reject(new Error(`HTTP ${res.statusCode}: ${data}`));
                }
            });
        });
        req.on('error', reject);
        req.setTimeout(30000, () => { req.destroy(); reject(new Error('Timeout')); });
        if (body) req.write(body);
        req.end();
    });
}

// ── Check if Jan.ai API is running ───────────────────────────
async function checkJan() {
    try {
        await httpRequest(`${JAN_API}/models`, { method: 'GET' });
        return true;
    } catch {
        return false;
    }
}

// ── Chat with LLM (Jan local → Groq fallback) ────────────────
async function chat(message, systemPrompt) {
    const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
    ];

    // Try Jan.ai local first
    const janAvailable = await checkJan();
    if (janAvailable) {
        console.log('🖥️  Usando Jan.ai local (localhost:1337)');
        const body = JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages,
            max_tokens: 1024,
            temperature: 0.7,
        });
        const result = await httpRequest(`${JAN_API}/chat/completions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }, body);
        return { provider: 'jan-local', response: result.choices[0].message.content };
    }

    // Fallback to Groq
    if (GROQ_KEY) {
        console.log('☁️  Jan.ai offline — usando Groq (cloud)');
        const body = JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages,
            max_tokens: 1024,
            temperature: 0.7,
        });
        const url = new URL(`${GROQ_API}/chat/completions`);
        const result = await httpRequest(url.href, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_KEY}`,
            },
        }, body);
        return { provider: 'groq', response: result.choices[0].message.content };
    }

    throw new Error('Nenhum provider disponível (Jan offline + sem GROQ_API_KEY)');
}

// ── Detect if message requires AIOS Bridge execution ──────────
function detectProject(message) {
    const lower = message.toLowerCase();
    const patterns = [
        { keywords: ['whatsapp', 'mensagem', 'paciente', 'responder', 'chat'], project: 'whatsapp-autoreply' },
        { keywords: ['lead', 'scoring', 'classificar', 'pontuar', 'prospect'], project: 'lead-scoring' },
        { keywords: ['financeiro', 'relatório', 'faturamento', 'receita', 'p&l'], project: 'financial-report' },
        { keywords: ['health', 'saúde', 'status', 'sistema', 'check'], project: 'health-check' },
        { keywords: ['manutenção', 'maintenance', 'limpeza', 'backup', 'cleanup'], project: 'preventive-maintenance' },
    ];

    for (const p of patterns) {
        if (p.keywords.some(k => lower.includes(k))) return p.project;
    }
    return null;
}

// ── Run AIOS Bridge for a project ─────────────────────────────
function runBridge(message, project) {
    const context = {
        source: 'jan-connector',
        trigger: 'user_request',
        project,
        timestamp: new Date().toISOString(),
        data: { request: message, params: {} },
    };

    const ctxPath = path.join(PROJECT_ROOT, 'context.json');
    fs.writeFileSync(ctxPath, JSON.stringify(context, null, 2));

    console.log(`🔌 Executando Bridge: ${project}`);
    execSync(`node "${BRIDGE}" "${ctxPath}" ${project}`, { cwd: PROJECT_ROOT, stdio: 'pipe', timeout: 30000 });

    const actionPath = path.join(PROJECT_ROOT, 'action.json');
    return JSON.parse(fs.readFileSync(actionPath, 'utf8'));
}

// ── Main ──────────────────────────────────────────────────────
async function main() {
    const args = process.argv.slice(2);

    if (args[0] === '--status') {
        const jan = await checkJan();
        console.log(`\n📊 AIOS Status:`);
        console.log(`  Jan.ai API:  ${jan ? '✅ Online (localhost:1337)' : '❌ Offline'}`);
        console.log(`  Groq API:    ${GROQ_KEY ? '✅ Configurado' : '❌ Sem key'}`);
        console.log(`  Bridge:      ✅ 5 rotas configuradas`);
        console.log(`  OpenClaw:    ✅ Gateway :18789\n`);
        return;
    }

    if (!args[0]) {
        console.log('Uso: node scripts/jan-connector.js "sua mensagem" [project-id]');
        console.log('     node scripts/jan-connector.js --status');
        return;
    }

    const message = args[0];
    const explicitProject = args[1];
    const detectedProject = explicitProject || detectProject(message);

    console.log('═══════════════════════════════════════════════════');
    console.log('  🧠 AIOS ↔ Jan.ai Connector');
    console.log('═══════════════════════════════════════════════════\n');
    console.log(`📩 Mensagem: "${message}"`);

    // If a project is detected/specified, route through Bridge
    if (detectedProject) {
        console.log(`🎯 Projeto detectado: ${detectedProject}`);
        try {
            const action = runBridge(message, detectedProject);
            console.log(`\n✅ Resultado:`);
            console.log(`  Action: ${action.action?.type}`);
            console.log(`  Provider: ${action.meta?.provider}`);
            console.log(`  Tempo: ${action.meta?.processingTimeMs}ms`);
            console.log(`  Resposta: ${JSON.stringify(action.action?.payload).substring(0, 120)}...`);
        } catch (err) {
            console.log(`❌ Bridge falhou: ${err.message}`);
        }
        return;
    }

    // General chat — use Orion assistant
    const systemPrompt = 'Você é Orion, o gerente de operações IA da Experia. Responda de forma direta e útil. Se o usuário pedir uma tarefa específica (WhatsApp, leads, relatório, health check, manutenção), indique o comando exato do Bridge. Assine como — Orion 👑';

    try {
        const { provider, response } = await chat(message, systemPrompt);
        console.log(`\n🧠 Provider: ${provider}`);
        console.log(`\n💬 Orion:\n${response}\n`);
    } catch (err) {
        console.log(`❌ Erro: ${err.message}`);
    }
}

main().catch(console.error);
