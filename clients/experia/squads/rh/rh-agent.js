/**
 * AIOS RH Agent — Departamento de RH Autônomo
 * 
 * Interface de chat simples para supervisor de RH.
 * Conecta ao ClickUp para gerenciar tarefas de RH automaticamente.
 * Usa Groq (Llama 3.3 70B) para inteligência.
 * 
 * Como usar: node rh-agent.js
 */

require('dotenv').config();
const https = require('https');
const readline = require('readline');

const CLICKUP_KEY = process.env.CLICKUP_API_KEY;
const GROQ_KEY = process.env.GROQ_API_KEY;
const SPACE_ID = process.env.CLICKUP_RH_SPACE_ID || '901313277502';

// ── ClickUp API ──────────────────────────────────────────────
function clickup(method, path, body) {
    return new Promise((resolve, reject) => {
        const url = new URL(`https://api.clickup.com/api/v2${path}`);
        const options = {
            hostname: url.hostname, path: url.pathname + url.search, method,
            headers: { 'Authorization': CLICKUP_KEY, 'Content-Type': 'application/json' },
        };
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => res.statusCode < 300 ? resolve(JSON.parse(data)) : reject(new Error(`ClickUp ${res.statusCode}`)));
        });
        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

// ── Groq LLM ─────────────────────────────────────────────────
function askAI(systemPrompt, userMessage) {
    return new Promise((resolve, reject) => {
        const body = JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userMessage },
            ],
            temperature: 0.3,
            max_tokens: 1024,
        });
        const options = {
            hostname: 'api.groq.com', path: '/openai/v1/chat/completions', method: 'POST',
            headers: { 'Authorization': `Bearer ${GROQ_KEY}`, 'Content-Type': 'application/json' },
        };
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                if (res.statusCode < 300) {
                    const r = JSON.parse(data);
                    resolve(r.choices[0].message.content);
                } else reject(new Error(`Groq ${res.statusCode}: ${data.substring(0, 200)}`));
            });
        });
        req.on('error', reject);
        req.write(body);
        req.end();
    });
}

// ── RH Lists (IDs do ClickUp) ────────────────────────────────
const RH_LISTS = {
    funcionarios: { id: '901325492687', name: 'RH - Funcionários' },
    recrutamento: { id: '901325492689', name: 'RH - Recrutamento' },
};

const SYSTEM_PROMPT = `Você é o Orion RH, assistente de IA para gestão de Recursos Humanos.
Você ajuda supervisores de RH a:
- Criar vagas de emprego e gerenciar recrutamento
- Acompanhar funcionários (férias, afastamentos, desligamentos)
- Calcular métricas de RH (turnover, absenteísmo)
- Gerar relatórios e comunicados
- Responder dúvidas sobre legislação trabalhista brasileira (CLT)

Regras:
- Responda SEMPRE em português brasileiro
- Seja direto e prático
- Quando o usuário pedir para criar algo, responda com a ação que será executada
- Para análises, peça dados se necessário
- Ao fim de cada resposta, sugira próximos passos

Contexto: Empresa Master Pumps (grande porte, faturamento alto, muitos funcionários).`;

// ── CLI Interface ────────────────────────────────────────────
async function listTasks(listId) {
    const data = await clickup('GET', `/list/${listId}/task?archived=false&page=0`);
    return data.tasks.map(t => `[${t.status?.status}] ${t.name} (ID: ${t.id})`).join('\n');
}

async function createTask(listId, name, description) {
    return await clickup('POST', `/list/${listId}/task`, {
        name, description: description || `Criado pelo AIOS RH em ${new Date().toISOString()}`,
    });
}

async function processCommand(input) {
    const lower = input.toLowerCase().trim();

    // Direct commands
    if (lower === 'listar funcionarios' || lower === 'funcionarios') {
        const tasks = await listTasks(RH_LISTS.funcionarios.id);
        return `\n📋 Funcionários:\n${tasks || '(nenhum cadastrado)'}\n`;
    }
    if (lower === 'listar vagas' || lower === 'vagas') {
        const tasks = await listTasks(RH_LISTS.recrutamento.id);
        return `\n📋 Vagas em Aberto:\n${tasks || '(nenhuma vaga)'}\n`;
    }
    if (lower.startsWith('criar vaga ')) {
        const vagaName = input.substring(11).trim();
        const task = await createTask(RH_LISTS.recrutamento.id, vagaName);
        return `\n✅ Vaga criada: "${vagaName}"\n   ID: ${task.id}\n   URL: ${task.url}\n`;
    }
    if (lower.startsWith('admitir ')) {
        const nome = input.substring(8).trim();
        const task = await createTask(RH_LISTS.funcionarios.id, nome);
        return `\n✅ Funcionário registrado: "${nome}"\n   ID: ${task.id}\n   URL: ${task.url}\n`;
    }
    if (lower === 'ajuda' || lower === 'help') {
        return `
📋 Comandos Rápidos:
  funcionarios           Lista todos os funcionários 
  vagas                  Lista vagas em aberto
  criar vaga [nome]      Cria nova vaga de emprego
  admitir [nome]         Registra novo funcionário
  
💬 Ou simplesmente escreva sua pergunta/pedido em linguagem natural!
   Exemplo: "Como calcular turnover?" ou "Preciso de um modelo de advertência"
`;
    }

    // AI-powered response for everything else
    const context = `Funcionários no sistema: ${(await listTasks(RH_LISTS.funcionarios.id)) || 'nenhum'}
Vagas abertas: ${(await listTasks(RH_LISTS.recrutamento.id)) || 'nenhuma'}`;

    const response = await askAI(
        SYSTEM_PROMPT + `\n\nContexto atual do ClickUp:\n${context}`,
        input
    );
    return `\n${response}\n`;
}

// ── Main ─────────────────────────────────────────────────────
async function main() {
    if (!CLICKUP_KEY || !GROQ_KEY) {
        console.log('');
        console.log('═══════════════════════════════════════════════════');
        console.log('  ❌ Configuração necessária');
        console.log('═══════════════════════════════════════════════════');
        console.log('');
        console.log('  Copie o arquivo .env.example para .env e preencha:');
        console.log('  1. CLICKUP_API_KEY (peça ao Gabriel)');
        console.log('  2. GROQ_API_KEY (peça ao Gabriel)');
        console.log('');
        process.exit(1);
    }

    console.log('');
    console.log('═══════════════════════════════════════════════════');
    console.log('  👑 AIOS Orion — Departamento de RH');
    console.log('  Assistente Inteligente para Recursos Humanos');
    console.log('═══════════════════════════════════════════════════');
    console.log('');
    console.log('  Digite "ajuda" para ver os comandos');
    console.log('  Digite "sair" para encerrar');
    console.log('');

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    const ask = () => {
        rl.question('👑 Orion RH > ', async (input) => {
            if (!input.trim()) { ask(); return; }
            if (input.toLowerCase() === 'sair' || input.toLowerCase() === 'exit') {
                console.log('\n  — Orion RH, encerrando. Até mais! 🎯\n');
                rl.close();
                return;
            }
            try {
                const response = await processCommand(input);
                console.log(response);
            } catch (err) {
                console.log(`\n  ❌ Erro: ${err.message}\n`);
            }
            ask();
        });
    };
    ask();
}

main();
