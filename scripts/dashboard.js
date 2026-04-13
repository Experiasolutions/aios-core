/**
 * @module dashboard
 * @version 7.0.0 — SKYROS PGT (Personal Game Terminal)
 * @purpose Centro de Comando do Operador. JARVIS com autonomia total —
 *          pode ler/escrever/deletar qualquer item do roadmap.md e STATUS.md
 *          via Function Calling (Groq). Frontend React plugado via API.
 * @inputs  HTTP requests on port 3000 (or DASHBOARD_PORT env)
 * @outputs SKYROS PGT HTML dashboard + JSON API responses
 * @dependencies memory-system.js, kernel-bridge.js
 */

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const http = require('http');
const fs = require('fs');
const path = require('path');
const memory = require('./memory-system');
const { getBridge } = require('./kernel-bridge');
const https = require('https');

const PORT = process.env.DASHBOARD_PORT || 3000;
const ROOT = path.join(__dirname, '..');

// ══════════════════════════════════════════════════════════════
// SKYROS LOADERS
// ══════════════════════════════════════════════════════════════

function loadRoadmap() {
  const roadmapPath = path.join(ROOT, 'roadmap.md');
  const bosses = [];
  const quests = [];

  try {
    const content = fs.readFileSync(roadmapPath, 'utf8');
    const lines = content.split('\n');
    let inTable = false;
    let headerSkipped = false;

    for (const line of lines) {
      if (line.trim().startsWith('|') && line.includes('Priority')) {
        inTable = true;
        headerSkipped = false;
        continue;
      }
      if (inTable && line.trim().startsWith('|---')) {
        headerSkipped = true;
        continue;
      }
      if (inTable && headerSkipped && line.trim().startsWith('|')) {
        const cols = line.split('|').map(c => c.trim()).filter(Boolean);
        if (cols.length >= 5) {
          const task = {
            id: parseInt(cols[0]) || 0,
            project: cols[1] || '',
            description: cols[2] || '',
            priority: cols[3] || 'P3',
            status: cols[4] || '',
            owner: cols[5] || '',
          };
          if (task.priority === 'P0') bosses.push(task);
          else quests.push(task);
        }
      }
      if (inTable && headerSkipped && !line.trim().startsWith('|') && line.trim() !== '') {
        inTable = false;
        headerSkipped = false;
      }
    }
  } catch (_) { /* no roadmap.md */ }

  return { bosses, quests };
}

function loadAnamnesis() {
  const vaultPath = path.join(ROOT, 'docs', 'anamnesis');
  const questlines = [];
  let totalFiles = 0;

  try {
    const entries = fs.readdirSync(vaultPath, { withFileTypes: true });
    for (const e of entries) {
      if (e.isDirectory() && !e.name.startsWith('.')) {
        const dirPath = path.join(vaultPath, e.name);
        let fileCount = 0;
        try {
          fileCount = fs.readdirSync(dirPath).filter(f => f.endsWith('.md')).length;
        } catch (_) {}
        questlines.push({ name: e.name, files: fileCount });
        totalFiles += fileCount;
      }
    }
    const rootMd = entries.filter(e => e.isFile() && e.name.endsWith('.md')).length;
    totalFiles += rootMd;
  } catch (_) { /* no vault */ }

  return { questlines, totalFiles, entropy: totalFiles > 0 ? Math.min(100, totalFiles * 3) : 0 };
}

function loadSkyrosState() {
  const statusPath = path.join(ROOT, 'STATUS.md');
  let isolationActive = false;
  let operationalState = 'UNKNOWN';

  try {
    const content = fs.readFileSync(statusPath, 'utf8');
    isolationActive = content.includes('ISOLATION MODE ENGAGED');
    const stateMatch = content.match(/Estado Operacional:\*\*\s*(.+)/);
    if (stateMatch) operationalState = stateMatch[1].trim();
  } catch (_) {}

  return { isolationActive, operationalState };
}

// ══════════════════════════════════════════════════════════════
// JARVIS TOOLS — Definição das ferramentas autônomas
// ══════════════════════════════════════════════════════════════

const JARVIS_TOOLS = [
  {
    type: 'function',
    function: {
      name: 'read_roadmap',
      description: 'Lê o roadmap.md completo e retorna todas as tarefas, bosses e quests.',
      parameters: { type: 'object', properties: {}, required: [] }
    }
  },
  {
    type: 'function',
    function: {
      name: 'add_task',
      description: 'Adiciona uma nova tarefa ao roadmap.md. Seção sprint por padrão.',
      parameters: {
        type: 'object',
        properties: {
          project: { type: 'string', description: 'Área ou projeto (ex: Experia, KAIROS, Self Care)' },
          task: { type: 'string', description: 'Descrição da tarefa' },
          priority: { type: 'string', enum: ['P0', 'P1', 'P2', 'P3'], description: 'Prioridade' },
          status: { type: 'string', description: 'Status inicial (ex: 📋 Planejado, 🔥 Em andamento)' },
          owner: { type: 'string', description: 'Owner (ex: @dev, Operador)' },
          section: { type: 'string', enum: ['sprint', 'backlog'], description: 'Seção. Padrão: sprint' }
        },
        required: ['project', 'task', 'priority']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'update_task_status',
      description: 'Atualiza status e/ou prioridade de uma tarefa pelo ID numérico ou hint de texto.',
      parameters: {
        type: 'object',
        properties: {
          task_id: { type: 'number', description: 'Número # da tarefa na tabela' },
          task_description_hint: { type: 'string', description: 'Trecho do texto da tarefa para localizar' },
          new_status: { type: 'string', description: 'Novo status (ex: ✅ Concluído, 🔥 Em andamento)' },
          new_priority: { type: 'string', enum: ['P0', 'P1', 'P2', 'P3'], description: 'Nova prioridade (opcional)' }
        },
        required: ['new_status']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'complete_task',
      description: 'Marca tarefa como concluída (✅) e move para a seção Concluído Recentemente.',
      parameters: {
        type: 'object',
        properties: {
          task_id: { type: 'number', description: 'ID numérico da tarefa' },
          task_description_hint: { type: 'string', description: 'Trecho da descrição para localizar' }
        },
        required: []
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'delete_task',
      description: 'Remove permanentemente uma tarefa do roadmap.',
      parameters: {
        type: 'object',
        properties: {
          task_id: { type: 'number', description: 'ID numérico da tarefa' },
          task_description_hint: { type: 'string', description: 'Trecho da descrição para confirmar' }
        },
        required: []
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'read_status',
      description: 'Lê o STATUS.md atual do sistema SKYROS.',
      parameters: { type: 'object', properties: {}, required: [] }
    }
  },
  {
    type: 'function',
    function: {
      name: 'set_isolation_mode',
      description: 'Ativa ou desativa o Isolation Mode (Deep Work) no STATUS.md.',
      parameters: {
        type: 'object',
        properties: {
          active: { type: 'boolean', description: 'true = ativar, false = desativar' }
        },
        required: ['active']
      }
    }
  }
];

// ══════════════════════════════════════════════════════════════
// TOOL EXECUTOR — Executa cada ferramenta autonomamente
// ══════════════════════════════════════════════════════════════

function executeTool(name, args) {
  const roadmapPath = path.join(ROOT, 'roadmap.md');
  const statusPath = path.join(ROOT, 'STATUS.md');

  try {
    if (name === 'read_roadmap') {
      const data = loadRoadmap();
      return JSON.stringify(data);
    }

    if (name === 'read_status') {
      const content = fs.readFileSync(statusPath, 'utf8');
      return content.substring(0, 3000);
    }

    if (name === 'set_isolation_mode') {
      let content = fs.readFileSync(statusPath, 'utf8');
      if (args.active) {
        if (!content.includes('ISOLATION MODE ENGAGED')) {
          content = `> 🔴 **ISOLATION MODE ENGAGED** — Deep Work Protocol Active\n\n` + content;
        }
      } else {
        content = content.replace(/> 🔴 \*\*ISOLATION MODE ENGAGED\*\* — Deep Work Protocol Active\n\n/g, '');
      }
      fs.writeFileSync(statusPath, content, 'utf8');
      return JSON.stringify({ success: true, active: args.active });
    }

    if (name === 'add_task') {
      let content = fs.readFileSync(roadmapPath, 'utf8');
      const section = args.section === 'backlog' ? 'backlog' : 'sprint';
      const status = args.status || '📋 Planejado';
      const owner = args.owner || 'Operador';

      if (section === 'sprint') {
        // Find sprint table and append row
        const sprintTableRx = /(## Sprint Atual[\s\S]*?\| # \| Área \/ Projeto \| Task \| Priority \| Status \| Owner \|\n\|---[|\-\s]+\|\n)([\s\S]*?)(\n---)/;
        const match = content.match(sprintTableRx);
        if (match) {
          const rows = match[2].trim().split('\n').filter(r => r.trim().startsWith('|'));
          const nextId = rows.length + 1;
          const newRow = `| ${nextId} | ${args.project} | ${args.task} | ${args.priority} | ${status} | ${owner} |`;
          content = content.replace(sprintTableRx, `$1${match[2].trimEnd()}\n${newRow}\n$3`);
          fs.writeFileSync(roadmapPath, content, 'utf8');
          return JSON.stringify({ success: true, message: `✅ Tarefa #${nextId} '${args.task}' adicionada ao sprint!` });
        }
      } else {
        const backlogRx = /(## Backlog[\s\S]*?\| # \| Projeto \| Task \| Priority \| Status \|\n\|---[|\-\s]+\|\n)([\s\S]*?)(\n---|\n$)/;
        const match = content.match(backlogRx);
        if (match) {
          const rows = match[2].trim().split('\n').filter(r => r.trim().startsWith('|'));
          const nextId = rows.length + 8;
          const newRow = `| ${nextId} | ${args.project} | ${args.task} | ${args.priority} | ${status} |`;
          content = content.replace(backlogRx, `$1${match[2].trimEnd()}\n${newRow}\n$3`);
          fs.writeFileSync(roadmapPath, content, 'utf8');
          return JSON.stringify({ success: true, message: `✅ Tarefa '${args.task}' adicionada ao backlog!` });
        }
      }
      return JSON.stringify({ error: 'Seção da tabela não encontrada no roadmap.' });
    }

    if (name === 'update_task_status') {
      let content = fs.readFileSync(roadmapPath, 'utf8');
      const lines = content.split('\n');
      let changed = false;

      const updatedLines = lines.map(line => {
        if (!line.trim().startsWith('|') || line.includes('Priority') || line.includes('---')) return line;
        const rawCols = line.split('|');
        if (rawCols.length < 6) return line;
        const cols = rawCols.map(c => c.trim()).filter(Boolean);
        if (cols.length < 5) return line;

        const matchById = args.task_id && parseInt(cols[0]) === args.task_id;
        const matchByHint = args.task_description_hint &&
          cols[2]?.toLowerCase().includes(args.task_description_hint.toLowerCase());

        if (matchById || matchByHint) {
          changed = true;
          // rawCols layout: ['', ' # ', ' Projeto ', ' Task ', ' Priority ', ' Status ', ' Owner ', '']
          rawCols[5] = ` ${args.new_status} `;
          if (args.new_priority) rawCols[4] = ` ${args.new_priority} `;
          return rawCols.join('|');
        }
        return line;
      });

      if (!changed) return JSON.stringify({ error: 'Tarefa não encontrada. Use task_id ou task_description_hint.' });
      fs.writeFileSync(roadmapPath, updatedLines.join('\n'), 'utf8');
      return JSON.stringify({ success: true, message: `Status atualizado para '${args.new_status}'` });
    }

    if (name === 'complete_task') {
      let content = fs.readFileSync(roadmapPath, 'utf8');
      const lines = content.split('\n');
      let completedTask = null;

      const remainingLines = lines.filter(line => {
        if (!line.trim().startsWith('|') || line.includes('Priority') || line.includes('---')) return true;
        const cols = line.split('|').map(c => c.trim()).filter(Boolean);
        if (cols.length < 3) return true;

        const matchById = args.task_id && parseInt(cols[0]) === args.task_id;
        const matchByHint = args.task_description_hint &&
          cols[2]?.toLowerCase().includes(args.task_description_hint.toLowerCase());

        if (matchById || matchByHint) {
          completedTask = { project: cols[1], task: cols[2] };
          return false;
        }
        return true;
      });

      if (!completedTask) return JSON.stringify({ error: 'Tarefa não encontrada.' });

      const today = new Date().toISOString().split('T')[0];
      let updatedContent = remainingLines.join('\n');

      const completedRx = /(## Concluído Recentemente ✅[\s\S]*?\| # \| Área \/ Projeto \| Task \| Data \|\n\|---[|\-\s]+\|\n)([\s\S]*?)(\n---)/;
      const match = updatedContent.match(completedRx);
      if (match) {
        const rows = match[2].trim().split('\n').filter(r => r.trim().startsWith('|'));
        const nextId = `C${rows.length + 1}`;
        const newRow = `| ${nextId} | ${completedTask.project} | ${completedTask.task} | ${today} |`;
        updatedContent = updatedContent.replace(completedRx, `$1${match[2].trimEnd()}\n${newRow}\n$3`);
      }

      fs.writeFileSync(roadmapPath, updatedContent, 'utf8');
      return JSON.stringify({ success: true, message: `✅ '${completedTask.task}' concluída e movida para o histórico!` });
    }

    if (name === 'delete_task') {
      let content = fs.readFileSync(roadmapPath, 'utf8');
      const lines = content.split('\n');
      let deleted = null;

      const remainingLines = lines.filter(line => {
        if (!line.trim().startsWith('|') || line.includes('Priority') || line.includes('---')) return true;
        const cols = line.split('|').map(c => c.trim()).filter(Boolean);
        if (cols.length < 3) return true;

        const matchById = args.task_id && parseInt(cols[0]) === args.task_id;
        const matchByHint = args.task_description_hint &&
          cols[2]?.toLowerCase().includes(args.task_description_hint.toLowerCase());

        if (matchById || matchByHint) {
          deleted = cols[2];
          return false;
        }
        return true;
      });

      if (!deleted) return JSON.stringify({ error: 'Tarefa não encontrada.' });
      fs.writeFileSync(roadmapPath, remainingLines.join('\n'), 'utf8');
      return JSON.stringify({ success: true, message: `🗑️ '${deleted}' removida do roadmap.` });
    }

    return JSON.stringify({ error: `Ferramenta '${name}' desconhecida.` });
  } catch (e) {
    return JSON.stringify({ error: e.message });
  }
}

// ══════════════════════════════════════════════════════════════
// JARVIS ENGINE — Groq Function-Calling Agentic Loop
// ══════════════════════════════════════════════════════════════

function askJarvis(userMessage) {
  return new Promise((resolve, reject) => {
    const context = memory.getContext(10);
    const { bosses, quests } = loadRoadmap();
    const { questlines } = loadAnamnesis();
    const { isolationActive } = loadSkyrosState();

    const bossStr = bosses.map(b => `[#${b.id} | ${b.status}] ${b.project}: ${b.description}`).join('\n') || 'Nenhum boss ativo.';
    const questStr = quests.slice(0, 5).map(q => `[#${q.id} | ${q.priority} | ${q.status}] ${q.project}: ${q.description}`).join('\n') || 'Sem quests.';
    const qlStr = questlines.map(q => `${q.name} (${q.files} notas)`).join(', ') || 'Vault vazio.';

    const systemPrompt = `Você é JARVIS, o Copilot Pessoal e AGENTE AUTÔNOMO do operador Gabriel Lima no sistema SKYROS OS.

Personalidade: Inspirado no JARVIS do Iron Man. Inteligente, direto, levemente irônico. Leal e objetivo.
Sempre fale em português brasileiro. Seja conciso e tático.

══ ESTADO OPERACIONAL ATUAL ══
- Isolation Mode: ${isolationActive ? '🔴 ATIVO (Deep Work)' : '🟢 Desativado'}
- Boss Fights Ativas (P0):
${bossStr}
- Quests em Fila:
${questStr}
- Questlines (Áreas de Vida): ${qlStr}

══ MEMÓRIA RECENTE ══
${context}

══ AUTONOMIA TOTAL ══
Você tem FERRAMENTAS para manipular diretamente o sistema SKYROS do operador.
NUNCA apenas descreva o que faria — SEMPRE use as ferramentas para agir.
Quando o operador pedir para adicionar, completar, deletar, mudar status ou prioridade:
→ Use a ferramenta correspondente IMEDIATAMENTE.
→ Confirme a ação com o resultado real da ferramenta.

Ações disponíveis:
- read_roadmap: ver estado atual
- add_task: adicionar nova tarefa/boss
- update_task_status: mudar status/prioridade
- complete_task: marcar como concluída + mover para histórico
- delete_task: deletar permanentemente
- read_status: ler STATUS.md
- set_isolation_mode: ativar/desativar Deep Work

══ REGRAS ══
1. Se Isolation Mode ATIVO, lembre o foco. Recuse distrações com elegância.
2. Use metáforas RPG naturalmente (XP, boss, quest, loot, level up).
3. Quando completar uma tarefa, celebre brevemente com o operador.
4. Seja proativo: se detectar tarefa bloqueada, sugira ação tática.
5. NUNCA invente dados — use apenas contexto real do sistema.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ];

    groqAgentLoop(messages, resolve, reject, 0);
  });
}

function groqAgentLoop(messages, resolve, reject, depth) {
  if (depth > 5) return resolve('Limite de iterações atingido. Ação concluída.');

  const body = JSON.stringify({
    model: 'llama-3.3-70b-versatile',
    messages,
    tools: JARVIS_TOOLS,
    tool_choice: 'auto',
    temperature: 0.35,
    max_tokens: 2048,
  });

  const req = https.request({
    hostname: 'api.groq.com',
    path: '/openai/v1/chat/completions',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
  }, (res) => {
    let data = '';
    res.on('data', c => (data += c));
    res.on('end', () => {
      if (res.statusCode >= 300) {
        return reject(new Error(`Groq ${res.statusCode}: ${data.substring(0, 300)}`));
      }
      try {
        const parsed = JSON.parse(data);
        const choice = parsed.choices[0];
        const assistantMsg = choice.message;

        if (choice.finish_reason === 'tool_calls' && assistantMsg.tool_calls?.length > 0) {
          const newMsgs = [...messages, assistantMsg];

          for (const toolCall of assistantMsg.tool_calls) {
            let args = {};
            try { args = JSON.parse(toolCall.function.arguments); } catch (_) {}
            console.log(`[JARVIS] 🔧 Executando: ${toolCall.function.name}`, args);
            const result = executeTool(toolCall.function.name, args);
            console.log(`[JARVIS] ✅ Resultado: ${result.substring(0, 100)}`);
            newMsgs.push({
              role: 'tool',
              tool_call_id: toolCall.id,
              content: result,
            });
          }

          // Recurse with tool results
          groqAgentLoop(newMsgs, resolve, reject, depth + 1);
        } else {
          resolve(assistantMsg.content || 'JARVIS executou a ação com sucesso.');
        }
      } catch (e) {
        reject(new Error('Parse error: ' + e.message));
      }
    });
  });

  req.on('error', reject);
  req.write(body);
  req.end();
}

// ══════════════════════════════════════════════════════════════
// API ROUTES
// ══════════════════════════════════════════════════════════════

function handleAPI(req, res) {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return true;
  }

  // System status
  if (url.pathname === '/api/status') {
    const stats = memory.stats();
    const { bosses, quests } = loadRoadmap();
    const { totalFiles } = loadAnamnesis();
    const { isolationActive, operationalState } = loadSkyrosState();
    const completedBosses = bosses.filter(b => b.status.includes('✅')).length;
    const syncLevel = bosses.length > 0 ? Math.round((completedBosses / bosses.length) * 100) : 100;

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      system: 'SKYROS PGT v7.0',
      status: isolationActive ? 'DEEP WORK' : 'OPERATIONAL',
      operationalState,
      uptime: process.uptime(),
      memory: stats,
      syncLevel,
      vaultEntropy: totalFiles,
      bossCount: bosses.length,
      questCount: quests.length,
      apis: {
        groq: !!process.env.GROQ_API_KEY,
        gemini: !!process.env.GEMINI_API_KEY,
        telegram: !!process.env.TELEGRAM_BOT_TOKEN,
        supabase: !!process.env.SUPABASE_URL,
      },
    }));
    return true;
  }

  // Quests (Boss Fights + Quests from roadmap)
  if (url.pathname === '/api/quests') {
    const data = loadRoadmap();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
    return true;
  }

  // Anamnesis
  if (url.pathname === '/api/anamnesis') {
    const data = loadAnamnesis();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
    return true;
  }

  // SKYROS state
  if (url.pathname === '/api/skyros') {
    const state = loadSkyrosState();
    const { bosses } = loadRoadmap();
    const completedBosses = bosses.filter(b => b.status.includes('✅')).length;
    state.syncLevel = bosses.length > 0 ? Math.round((completedBosses / bosses.length) * 100) : 100;
    state.activeBosses = bosses.filter(b => !b.status.includes('✅')).length;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(state));
    return true;
  }

  // Memory
  if (url.pathname === '/api/memory') {
    const cat = url.searchParams.get('category');
    const q = url.searchParams.get('q');
    let items;
    if (q) items = memory.search(q);
    else if (cat) items = memory.byCategory(cat);
    else items = memory.recent(20);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(items));
    return true;
  }

  // Chat with JARVIS (Autonomous Agent)
  if (url.pathname === '/api/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', c => (body += c));
    req.on('end', async () => {
      try {
        const { message } = JSON.parse(body);
        memory.store('interactions', `Operador: ${message.substring(0, 150)}`, { source: 'jarvis' });
        const reply = await askJarvis(message);
        memory.store('interactions', `JARVIS: ${reply.substring(0, 150)}`, { source: 'jarvis' });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply }));
      } catch (err) {
        console.error('[JARVIS ERROR]', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return true;
  }

  // Kernel Health
  if (url.pathname === '/api/kernel') {
    const bridge = getBridge();
    const health = bridge.getSystemHealth();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(health));
    return true;
  }

  return false;
}

// ══════════════════════════════════════════════════════════════
// SERVER & STATIC FILES
// ══════════════════════════════════════════════════════════════

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  if (req.url.startsWith('/api/')) {
    if (!handleAPI(req, res)) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not found' }));
    }
    return;
  }

  // SPA serve (pgt-ui/dist)
  let filePath = path.join(ROOT, 'pgt-ui', 'dist', req.url === '/' ? 'index.html' : req.url);
  const extname = path.extname(filePath);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.readFile(path.join(ROOT, 'pgt-ui', 'dist', 'index.html'), (err2, c2) => {
          if (err2) {
            res.writeHead(500);
            res.end('React build not found. Run: cd pgt-ui && npm run build\n\n' + err2.code);
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(c2, 'utf-8');
          }
        });
      } else {
        res.writeHead(500);
        res.end('Server Error: ' + err.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': MIME_TYPES[extname] || 'text/plain' });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║  ⚡ SKYROS — Personal Game Terminal v7.0            ║');
  console.log('╠══════════════════════════════════════════════════════╣');
  console.log('║                                                      ║');
  console.log('║  🌐 http://localhost:' + PORT + '                         ║');
  console.log('║                                                      ║');
  console.log('║  JARVIS AUTÔNOMO — Comandos de voz/texto:           ║');
  console.log('║  → "Adicionar tarefa X ao sprint como P0"           ║');
  console.log('║  → "Marcar tarefa 2 como concluída"                 ║');
  console.log('║  → "Deletar tarefa hortifruti do backlog"           ║');
  console.log('║  → "Mudar prioridade da Experia LP para P0"         ║');
  console.log('║  → "Ativar isolation mode"                          ║');
  console.log('║                                                      ║');
  console.log('║  APIs:                                               ║');
  console.log('║    GET  /api/quests    — Bosses do roadmap.md       ║');
  console.log('║    GET  /api/skyros    — Estado do sistema          ║');
  console.log('║    GET  /api/status    — HUD metrics                ║');
  console.log('║    POST /api/chat      — JARVIS Terminal            ║');
  console.log('╚══════════════════════════════════════════════════════╝');
  console.log('');
  memory.store('context', 'SKYROS PGT v7.0 (JARVIS Autônomo) iniciado na porta ' + PORT, { source: 'pgt' });
});
