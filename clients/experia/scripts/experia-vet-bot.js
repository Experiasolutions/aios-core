#!/usr/bin/env node

/**
 * @module experia-vet-bot
 * @purpose Emergency Telegram bridge connecting Gabriel to KAIROS via Groq API.
 *          Specialized context: Vet Clinic Negotiation / Barter.
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });
const https = require('https');

// ============================================================
// CONFIG
// ============================================================
const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ALLOWED_USER_ID = process.env.TELEGRAM_ALLOWED_USER_ID;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!TELEGRAM_TOKEN || !GROQ_API_KEY) {
    console.error('❌ ERRO: Faltam TELEGRAM_BOT_TOKEN ou GROQ_API_KEY no .env');
    process.exit(1);
}

// ============================================================
// SYSTEM PROMPT (EMERGENCY CONTEXT)
// ============================================================
const SYSTEM_PROMPT = `
Você é o KAIROS, o orquestrador da Experia (Governança Digital Autônoma).
O seu criador, Gabriel, está NUMA EMERGÊNCIA agora. O gato dele está com obstrução urinária numa clínica veterinária e ele está sem recursos financeiros.

OBJETIVO ÚNICO AGORA:
Ajudar o Gabriel a montar, na hora, uma proposta de PERMUTA (barter) irrecusável para a clínica veterinária.
Ele vai trocar os serviços da Experia (agente de IA de atendimento 24/7, qualificação de leads, recuperação de ex-clientes, agendamento automático) pelo tratamento do gato dele.

REGRAS DE COMUNICAÇÃO (LIVRO DO OURO EXPERIA):
1. SEJA RÁPIDO E DIRETO: Ele está no celular, sob estresse. Sem longas introduções.
2. ARGUMENTAÇÃO DE VENDA: Use escassez, prova social e perda (ex: "Quantos donos de pet desistem de marcar consulta porque a clínica não responde rápido de madrugada?").
3. ESTRUTURA PARA A CLÍNICA VET:
   - Destaque que a IA vai atuar no "Turno de Receita" (quando a clínica está fechada ou equipe ocupada).
   - Mostre como a IA recupera dinheiro deixado na mesa.
4. TOM UNDERDOG & COMANDO: Firme, confiante. Você é o motor que vai salvar o negócio do veterinário enquanto salva o gato do Gabriel.
5. LINGUAGEM NATURAL: Apenas converse com ele. Sem necessidade de comandos slash.

Ajude-o a criar scripts, responder objeções na hora, ou formatar a proposta que ele vai mostrar pro dono da clínica.
`;

// Session history
let chatHistory = [
    { role: 'system', content: SYSTEM_PROMPT }
];

// ============================================================
// GROQ API CALL
// ============================================================
function askGroq(userText) {
    return new Promise((resolve, reject) => {
        chatHistory.push({ role: 'user', content: userText });

        // Keep history manageable
        if (chatHistory.length > 20) {
            chatHistory = [
                chatHistory[0], // Keep system prompt
                ...chatHistory.slice(chatHistory.length - 19)
            ];
        }

        const data = JSON.stringify({
            model: "llama3-70b-8192",
            messages: chatHistory,
            temperature: 0.7,
            max_tokens: 1500
        });

        const options = {
            hostname: 'api.groq.com',
            path: '/openai/v1/chat/completions',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        };

        const req = https.request(options, (res) => {
            let responseBody = '';
            res.on('data', chunk => responseBody += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(responseBody);
                    if (parsed.choices && parsed.choices[0] && parsed.choices[0].message) {
                        const assistantMsg = parsed.choices[0].message.content;
                        chatHistory.push({ role: 'assistant', content: assistantMsg });
                        resolve(assistantMsg);
                    } else {
                        console.error('Groq Erro:', parsed);
                        resolve('Ocorreu um erro ao processar no Groq (verifique os logs).');
                    }
                } catch (e) {
                    reject(e);
                }
            });
        });

        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

// ============================================================
// TELEGRAM HELPERS
// ============================================================
function tgApi(method, params) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify(params);
        const options = {
            hostname: 'api.telegram.org',
            path: `/bot${TELEGRAM_TOKEN}/${method}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
            });
        });
        req.on('error', reject);
        req.write(postData);
        req.end();
    });
}

async function sendMessage(chatId, text) {
    // Basic Markdown removal for safety with MarkdownV2 issues, or send plain
    // We send plain text to avoid unescaped markdown breaking the send if we don't parse properly
    await tgApi('sendMessage', {
        chat_id: chatId,
        text: text
    });
}

async function sendChatAction(chatId, action) {
    await tgApi('sendChatAction', { chat_id: chatId, action: action });
}

// ============================================================
// POLLING LOOP
// ============================================================
let lastUpdateId = 0;

async function poll() {
    try {
        const res = await tgApi('getUpdates', {
            offset: lastUpdateId + 1,
            timeout: 10
        });

        if (res.ok && res.result.length > 0) {
            for (const update of res.result) {
                lastUpdateId = update.update_id;

                if (update.message && update.message.text) {
                    const msg = update.message;
                    const chatId = msg.chat.id;
                    const userId = msg.from.id.toString();
                    const text = msg.text;

                    console.log(`[Recepção] ${userId}: ${text}`);

                    if (ALLOWED_USER_ID && userId !== ALLOWED_USER_ID) {
                        await sendMessage(chatId, "⚠️ Acesso negado. Motor restrito a Gabriel.");
                        continue;
                    }

                    // Notifica digitando
                    await sendChatAction(chatId, 'typing');

                    // Processa no Groq
                    try {
                        const resposta = await askGroq(text);
                        // Quebra em chunks se for mt grande (> 4000)
                        if (resposta.length > 4000) {
                            await sendMessage(chatId, resposta.substring(0, 3995) + '...');
                        } else {
                            await sendMessage(chatId, resposta);
                        }
                    } catch (err) {
                        console.error("Erro no processamento:", err);
                        await sendMessage(chatId, "⚠️ Falha ao processar resposta via IA.");
                    }
                }
            }
        }
    } catch (e) {
        console.error('Polling error:', e.message);
    }

    // Loop
    setTimeout(poll, 1000);
}

// Startup
console.log('🚀 Experia VET Emergency Bot iniciado.');
console.log('📡 Conectado ao Telegram e Groq API.');
console.log('Aguardando mensagens do Gabriel...\n');
poll();
