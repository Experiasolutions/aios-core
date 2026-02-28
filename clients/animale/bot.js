require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const schedule = require('node-schedule');
const { dadosHoje } = require('./data');
const https = require('https');

// ==========================================
// CONFIGURAÇÃO
// ==========================================
const token = process.env.TELEGRAM_BOT_TOKEN;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!token) {
    console.error("❌ ERRO: Adicione o TELEGRAM_BOT_TOKEN no arquivo .env");
    process.exit(1);
}

// Polling true inicia a escuta ativamente
const bot = new TelegramBot(token, { polling: true });
console.log("🤖 KAIROS-Animale Bot iniciado. Aguardando comandos ou mensagens...");

// Variável para armazenar o chat ID do dono para o relatório matinal
let adminChatId = process.env.ADMIN_CHAT_ID || null;

// ==========================================
// FUNÇÕES DE FORMATAÇÃO DE DADOS
// ==========================================
function gerarRelatorioDiario() {
    let relatorio = `🐾 *BOM DIA, HOVET ANIMALE!*\n\n`;
    relatorio += `📊 *RESUMO DE ONTEM (${dadosHoje.data}):*\n`;
    relatorio += `• ${dadosHoje.faturamento.atendimentos} atendimentos realizados\n`;
    relatorio += `• ${dadosHoje.faturamento.cirurgias}\n`;
    relatorio += `• ${dadosHoje.faturamento.total} em faturamento\n`;
    relatorio += `• ${dadosHoje.internacoes.length} internações ativas\n\n`;

    relatorio += `📅 *AGENDA DE HOJE:*\n`;
    dadosHoje.agenda.forEach(a => {
        relatorio += `• ${a.hora} — ${a.paciente} — ${a.motivo}\n`;
    });
    relatorio += `\n⚠️ *ALERTAS:*\n`;
    dadosHoje.alertas.forEach(alerta => {
        relatorio += `• ${alerta}\n`;
    });
    relatorio += `\n💊 *INTERNAÇÕES ATIVAS:*\n`;
    dadosHoje.internacoes.forEach(int => {
        relatorio += `• ${int.paciente} — ${int.motivo} — Dia ${int.dia}\n`;
    });

    relatorio += `\n📱 *Comandos*: /agenda, /leads, /internacoes, /faturamento, /alertas`;
    return relatorio;
}

// ==========================================
// COMANDOS RÁPIDOS (SLASH COMMANDS)
// ==========================================
bot.onText(/\/start/, (msg) => {
    adminChatId = msg.chat.id;
    bot.sendMessage(adminChatId, "👋 Olá! Sou o sistema Experia da Hovet Animale.\n\nFui ativado com sucesso. Você receberá o relatório todos os dias às 7h.\n\nUse os comandos (ex: /agenda) ou pergunte naturalmente (ex: 'Como está o Tigrinho?').");
});

bot.onText(/\/agenda/, (msg) => {
    let resp = `📅 *AGENDA DE HOJE:*\n`;
    dadosHoje.agenda.forEach(a => resp += `• ${a.hora} — ${a.paciente} — ${a.motivo}\n`);
    bot.sendMessage(msg.chat.id, resp, { parse_mode: "Markdown" });
});

bot.onText(/\/internacoes/, (msg) => {
    let resp = `💊 *INTERNAÇÕES ATIVAS:*\n`;
    dadosHoje.internacoes.forEach(int => {
        resp += `• *${int.paciente}* (${int.motivo}) - Dia ${int.dia}\nStatus: ${int.status}\n\n`;
    });
    bot.sendMessage(msg.chat.id, resp, { parse_mode: "Markdown" });
});

bot.onText(/\/alertas/, (msg) => {
    let resp = `⚠️ *ALERTAS DO SISTEMA:*\n`;
    dadosHoje.alertas.forEach(a => resp += `${a}\n`);
    bot.sendMessage(msg.chat.id, resp, { parse_mode: "Markdown" });
});

bot.onText(/\/leads/, (msg) => {
    let resp = `👥 *POTENCIAIS CLIENTES (Follow-up pendente):*\n`;
    dadosHoje.leads.forEach(l => resp += `• ${l}\n`);
    bot.sendMessage(msg.chat.id, resp, { parse_mode: "Markdown" });
});

bot.onText(/\/faturamento/, (msg) => {
    let resp = `📈 *FATURAMENTO RECENTE:*\nTotal: *${dadosHoje.faturamento.total}*\nAtendimentos: ${dadosHoje.faturamento.atendimentos}\nCirurgias: ${dadosHoje.faturamento.cirurgias}`;
    bot.sendMessage(msg.chat.id, resp, { parse_mode: "Markdown" });
});

// Comandos de teste manual do relatório
bot.onText(/\/relatorio/, (msg) => {
    bot.sendMessage(msg.chat.id, gerarRelatorioDiario(), { parse_mode: "Markdown" });
});

// ==========================================
// RESPOSTA INTELIGENTE (GROQ - LINGUAGEM NATURAL)
// ==========================================

async function getGroqResponse(userMessage) {
    if (!GROQ_API_KEY) return null;

    // Injetando os dados do backend fictício no contexto do LLM
    const systemPrompt = `Você é o Experia, o assistente IA da clínica veterinária Hovet Animale.
Responda de forma extremamente curta, prestativa e profissional.
Você tem acesso aos dados reais (fictícios) do sistema hoje:
- Agenda: ${JSON.stringify(dadosHoje.agenda)}
- Internações: ${JSON.stringify(dadosHoje.internacoes)}
- Alertas: ${JSON.stringify(dadosHoje.alertas)}
O usuário (dono da clínica ou gestor) vai te perguntar coisas no Telegram de forma rápida.
Exemplo: "Como está o tigrinho?" Você deve responder com os dados dele de forma rápida.`;

    return new Promise((resolve) => {
        const data = JSON.stringify({
            model: "llama3-70b-8192",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userMessage }
            ],
            temperature: 0.3,
            max_tokens: 300
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
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(body);
                    resolve(parsed.choices[0].message.content);
                } catch { resolve(null); }
            });
        });
        req.on('error', () => resolve(null));
        req.write(data);
        req.end();
    });
}

// Intercepta qualquer mensagem livre (que não comece com /)
bot.on('message', async (msg) => {
    const text = msg.text;
    if (!text || text.startsWith('/')) return; // ignora comandos

    if (text.toLowerCase().includes('tigrinho')) {
        // Fallback garantido caso a API falhe (o mais importante para a demo)
        const tigre = dadosHoje.internacoes.find(i => i.paciente === 'Tigrinho');
        if (tigre && (!GROQ_API_KEY || Math.random() < 0.2)) {
            return bot.sendMessage(msg.chat.id, `🐱 *${tigre.paciente}* — ${tigre.motivo}\nStatus: ${tigre.status}`, { parse_mode: "Markdown" });
        }
    }

    // Se tiver chave do Groq e não for fallback
    if (GROQ_API_KEY) {
        bot.sendChatAction(msg.chat.id, 'typing');
        const iaResponse = await getGroqResponse(text);
        if (iaResponse) {
            return bot.sendMessage(msg.chat.id, iaResponse, { parse_mode: "Markdown" });
        }
    }

    // Fallback genérico final
    bot.sendMessage(msg.chat.id, "Comando não reconhecido. Use /agenda, /internacoes ou pergunte com clareza.");
});

// ==========================================
// SCHEDULER (Relatório Automático às 7h)
// ==========================================
// Rule: '0 7 * * *' = Todo dia às 7h00.
// Para a demo, sugerimos usar /relatorio, mas o job está ativo.
const job = schedule.scheduleJob('0 7 * * *', function () {
    if (adminChatId) {
        bot.sendMessage(adminChatId, gerarRelatorioDiario(), { parse_mode: "Markdown" });
        console.log("Relatório matinal enviado!");
    } else {
        console.log("Hora do relatório, mas adminChatId não está definido. O usuário precisa mandar /start primeiro.");
    }
});
