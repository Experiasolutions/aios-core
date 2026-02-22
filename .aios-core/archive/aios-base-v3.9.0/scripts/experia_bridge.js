/**
 * AIOS Bridge v1.0 — Conecta AIOS (Cérebro) ao UiPath (Braços)
 * 
 * Uso:
 *   node experia_bridge.js <context.json> [project-id]
 *   node experia_bridge.js ./context.json whatsapp-autoreply
 *   node experia_bridge.js ./context.json  (auto-detect project)
 * 
 * Fluxo:
 *   1. UiPath gera context.json → chama este script
 *   2. Bridge detecta project → carrega agent/task AIOS
 *   3. Envia para LLM (Gemini free → Groq → DeepSeek → OpenAI → fallback)
 *   4. Gera action.json → UiPath executa a ação
 * 
 * AIOS v5.0 Fusion — DoomMaster Security Gates integrados
 */

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const fs = require('fs');
const path = require('path');

// ── Config ────────────────────────────────────────────────────
const CONFIG = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'bridge-config.json'), 'utf8')
);

const PROJECT_ROOT = path.join(__dirname, '..');
const LOGS_DIR = path.join(PROJECT_ROOT, CONFIG.security.logDirectory || 'logs');

// ── Logger ────────────────────────────────────────────────────
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function log(level, message, data = {}) {
  ensureDir(LOGS_DIR);
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...data
  };
  const line = JSON.stringify(entry) + '\n';
  fs.appendFileSync(path.join(LOGS_DIR, 'bridge.log'), line);
  
  const icon = { INFO: '📋', WARN: '⚠️', ERROR: '❌', SUCCESS: '✅' }[level] || '📋';
  console.log(`${icon} [${level}] ${message}`);
}

// ── Security Gates (DoomMaster V5) ───────────────────────────
function securityCheck(context) {
  const text = JSON.stringify(context).toLowerCase();
  const blocked = CONFIG.security.blockedPatterns || [];
  
  for (const pattern of blocked) {
    if (text.includes(pattern.toLowerCase())) {
      log('WARN', `🛡️ Security gate: blocked pattern "${pattern}" detected`);
      return { safe: false, reason: `Conteúdo bloqueado: padrão sensível detectado` };
    }
  }
  
  return { safe: true };
}

function validateAction(action, route) {
  const allowed = route.allowedActions || [];
  if (allowed.length > 0 && !allowed.includes(action.type)) {
    log('WARN', `🛡️ Action "${action.type}" not in allowedActions for this route`);
    return false;
  }
  return true;
}

// ── Agent Loader ─────────────────────────────────────────────
function loadAgentPrompt(route) {
  const parts = [];
  
  // Load agent persona
  const agentPath = path.join(
    PROJECT_ROOT, 'squads', route.squad, 'agents', `${route.agent}.md`
  );
  if (fs.existsSync(agentPath)) {
    const agentContent = fs.readFileSync(agentPath, 'utf8');
    // Extract only the persona/role sections to keep prompt small
    const personaMatch = agentContent.match(/persona[\s\S]*?(?=\ncommands:|---|\n#)/i);
    if (personaMatch) parts.push(personaMatch[0].trim());
  }
  
  // Load task instructions
  const taskPath = path.join(
    PROJECT_ROOT, 'squads', route.squad, 'tasks', route.task
  );
  if (fs.existsSync(taskPath)) {
    parts.push(fs.readFileSync(taskPath, 'utf8'));
  }
  
  return parts.join('\n\n---\n\n');
}

// ── LLM Adapter (Multi-Provider) ─────────────────────────────
async function callLLM(systemPrompt, userMessage) {
  // Try providers in priority order
  for (const providerName of CONFIG.providerPriority) {
    const provider = CONFIG.providers[providerName];
    if (!provider) continue;
    
    const apiKey = process.env[provider.envKey];
    if (!apiKey) continue;
    
    log('INFO', `🧠 Tentando provider: ${providerName}`);
    
    try {
      if (providerName === 'gemini') {
        return await callGemini(apiKey, provider, systemPrompt, userMessage);
      } else {
        return await callOpenAICompatible(apiKey, provider, systemPrompt, userMessage);
      }
    } catch (err) {
      log('WARN', `Provider ${providerName} falhou: ${err.message}`);
      continue;
    }
  }
  
  // No provider worked
  return null;
}

async function callGemini(apiKey, provider, systemPrompt, userMessage) {
  const url = `${provider.baseUrl}/models/${provider.model}:generateContent?key=${apiKey}`;
  
  const body = {
    system_instruction: { parts: [{ text: systemPrompt }] },
    contents: [{ parts: [{ text: userMessage }] }],
    generationConfig: {
      maxOutputTokens: provider.maxTokens,
      temperature: 0.7,
      responseMimeType: "application/json"
    }
  };
  
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini ${res.status}: ${errText.substring(0, 200)}`);
  }
  
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Gemini: resposta vazia');
  
  log('SUCCESS', `Gemini respondeu (${text.length} chars)`);
  return text;
}

async function callOpenAICompatible(apiKey, provider, systemPrompt, userMessage) {
  const url = `${provider.baseUrl}/chat/completions`;
  
  const body = {
    model: provider.model,
    max_tokens: provider.maxTokens,
    temperature: 0.7,
    response_format: { type: "json_object" },
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ]
  };
  
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  });
  
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`${provider.model} ${res.status}: ${errText.substring(0, 200)}`);
  }
  
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error(`${provider.model}: resposta vazia`);
  
  log('SUCCESS', `${provider.model} respondeu (${text.length} chars)`);
  return text;
}

// ── Fallback (Keyword Matching) ──────────────────────────────
function fallbackResponse(context, route) {
  log('WARN', '🔄 Usando fallback (keyword-matching) — nenhuma LLM disponível');
  
  if (route.agent === 'experia-copy' && context.data?.message_text) {
    const msg = context.data.message_text.toLowerCase();
    
    if (msg.includes('preço') || msg.includes('valor') || msg.includes('custa') || msg.includes('quanto')) {
      return {
        type: 'reply_message',
        payload: {
          text: `Olá ${context.data.sender_name || ''}! Para informar o valor exato, precisamos entender o seu caso. Você já realizou esse procedimento antes?`
        }
      };
    }
    if (msg.includes('agenda') || msg.includes('horário') || msg.includes('marcar')) {
      return {
        type: 'reply_message',
        payload: {
          text: 'Temos horários disponíveis esta semana! Você prefere manhã ou tarde?'
        }
      };
    }
    if (msg.includes('cancelar') || msg.includes('desmarcar')) {
      return {
        type: 'mark_as_unread',
        payload: { tag: 'human_handoff', reason: 'Solicitação de cancelamento — requer humano' }
      };
    }
  }
  
  return {
    type: 'reply_message',
    payload: { text: CONFIG.fallback.defaultResponse }
  };
}

// ── Dispatcher ───────────────────────────────────────────────
function detectProject(context) {
  // 1. Explicit project in context
  if (context.project) return context.project;
  
  // 2. Auto-detect from source
  const source = (context.source || '').toLowerCase();
  if (source.includes('whatsapp')) return 'whatsapp-autoreply';
  if (source.includes('crm') || source.includes('lead')) return 'lead-scoring';
  if (source.includes('financ')) return 'financial-report';
  if (source.includes('health') || source.includes('saude')) return 'health-check';
  if (source.includes('maint') || source.includes('manut')) return 'preventive-maintenance';
  
  // 3. Fallback to whatsapp (most common)
  return 'whatsapp-autoreply';
}

// ── System Prompt Builder ────────────────────────────────────
function buildSystemPrompt(route, context) {
  const agentPrompt = loadAgentPrompt(route);
  
  return `# AIOS Bridge — Instrução de Sistema

Você é o agente **${route.agent}** do AIOS v5.0, operando via bridge automático.

## Seu papel
${route.description}

## Contexto do agente
${agentPrompt || 'Agente padrão — responda de forma profissional e empática.'}

## Regras DoomMaster V5
- SEMPRE responda em português brasileiro
- NUNCA invente informações médicas ou financeiras
- Se a pergunta for complexa ou envolver dor emocional, use action type "mark_as_unread" para handoff humano
- Mantenha respostas curtas (max 3 frases)
- Use tom profissional mas acolhedor

## Formato de resposta OBRIGATÓRIO (JSON)
Responda APENAS com JSON neste formato, sem markdown ou texto extra:
{
  "type": "<TIPO_AÇÃO>",
  "payload": {
    "text": "<TEXTO_RESPOSTA>"
  },
  "reasoning": "<BREVE_JUSTIFICATIVA>"
}

## Tipos de ação permitidos
${(route.allowedActions || []).map(a => `- "${a}"`).join('\n')}

## Se for "mark_as_unread" (handoff humano)
{
  "type": "mark_as_unread",
  "payload": {
    "tag": "human_handoff",
    "reason": "<MOTIVO>"
  },
  "reasoning": "<JUSTIFICATIVA>"
}`;
}

// ── Main ─────────────────────────────────────────────────────
(async () => {
  const startTime = Date.now();
  
  try {
    // 1. Parse args
    const contextPath = process.argv[2];
    const projectOverride = process.argv[3];
    
    if (!contextPath) {
      console.log('🔌 AIOS Bridge v1.0');
      console.log('Uso: node experia_bridge.js <context.json> [project-id]');
      console.log('');
      console.log('Projects disponíveis:');
      Object.entries(CONFIG.routes).forEach(([id, r]) => {
        console.log(`  - ${id} → @${r.agent} (${r.description})`);
      });
      process.exit(0);
    }
    
    // 2. Load context
    const absContextPath = path.resolve(contextPath);
    if (!fs.existsSync(absContextPath)) {
      throw new Error(`Arquivo não encontrado: ${absContextPath}`);
    }
    const context = JSON.parse(fs.readFileSync(absContextPath, 'utf8'));
    log('INFO', `📥 Contexto carregado de: ${contextPath}`, { source: context.source });
    
    // 3. Security check
    const security = securityCheck(context);
    if (!security.safe) {
      const errorResult = {
        status: 'blocked',
        reason: security.reason,
        timestamp: new Date().toISOString()
      };
      fs.writeFileSync(path.join(PROJECT_ROOT, 'action.json'), JSON.stringify(errorResult, null, 2));
      log('ERROR', `Bloqueado pelo security gate: ${security.reason}`);
      process.exit(1);
    }
    
    // 4. Route to agent
    const projectId = projectOverride || detectProject(context);
    const route = CONFIG.routes[projectId];
    if (!route) {
      throw new Error(`Projeto desconhecido: ${projectId}. Use: ${Object.keys(CONFIG.routes).join(', ')}`);
    }
    log('INFO', `🎯 Roteando para: @${route.agent} via ${route.task}`, { project: projectId });
    
    // 5. Build prompt & call LLM
    const systemPrompt = buildSystemPrompt(route, context);
    const userMessage = JSON.stringify(context.data || context, null, 2);
    
    let action;
    const llmResponse = await callLLM(systemPrompt, userMessage);
    
    if (llmResponse) {
      try {
        // Parse LLM JSON response
        const parsed = JSON.parse(llmResponse);
        action = { type: parsed.type, payload: parsed.payload };
        
        // Validate action is allowed
        if (!validateAction(action, route)) {
          log('WARN', `Ação "${action.type}" não permitida, usando fallback`);
          action = fallbackResponse(context, route);
        }
      } catch (e) {
        log('WARN', `LLM retornou JSON inválido, tentando extrair: ${e.message}`);
        // Try to extract JSON from markdown-wrapped response
        const jsonMatch = llmResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          action = { type: parsed.type, payload: parsed.payload };
        } else {
          action = fallbackResponse(context, route);
        }
      }
    } else {
      action = fallbackResponse(context, route);
    }
    
    // 6. Build result
    const result = {
      status: 'success',
      agent: route.agent,
      project: projectId,
      confidence: llmResponse ? 0.85 : 0.40,
      action,
      meta: {
        provider: llmResponse ? 'llm' : 'fallback',
        processingTimeMs: Date.now() - startTime,
        timestamp: new Date().toISOString(),
        aiosVersion: '5.0.0'
      }
    };
    
    // 7. Write action.json
    const actionPath = path.join(PROJECT_ROOT, 'action.json');
    fs.writeFileSync(actionPath, JSON.stringify(result, null, 2));
    log('SUCCESS', `📤 action.json salvo (${Date.now() - startTime}ms)`, {
      project: projectId,
      actionType: action.type,
      provider: result.meta.provider
    });
    
  } catch (error) {
    log('ERROR', error.message);
    const errorResult = {
      status: 'error',
      error: error.message,
      timestamp: new Date().toISOString()
    };
    fs.writeFileSync(
      path.join(PROJECT_ROOT, 'action.json'),
      JSON.stringify(errorResult, null, 2)
    );
    process.exit(1);
  }
})();
