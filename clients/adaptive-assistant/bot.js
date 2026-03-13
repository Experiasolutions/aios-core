require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const FormData = require('form-data');
const express = require('express');
const { getSystemPrompt } = require('./data');

// ── Config ──────────────────────────────────────────────────
const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!TELEGRAM_TOKEN || !GROQ_API_KEY) {
    console.error('❌ Defina TELEGRAM_BOT_TOKEN e GROQ_API_KEY no .env');
    process.exit(1);
}

// ── Express Server para o Render ───────────────────────────
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('🤖 KAIROS Personal (V3 Adaptive) está Online e operando!');
});

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.listen(PORT, () => {
    console.log(`🌐 Servidor Web escutando na porta ${PORT}`);
});

// ── Telegram Bot ───────────────────────────────────────────
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });
const TEMP_DIR = path.join(__dirname, 'temp');
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR);

// ── Memória Conversacional (Persistente em Disco) ──────────
const MEMORY_FILE = path.join(__dirname, 'memory.json');
let chatHistory = {};

function loadMemory() {
    if (fs.existsSync(MEMORY_FILE)) {
        try {
            chatHistory = JSON.parse(fs.readFileSync(MEMORY_FILE, 'utf8'));
            const totalChats = Object.keys(chatHistory).length;
            console.log(`📂 Memória carregada: ${totalChats} conversa(s) ativa(s)`);
        } catch (e) {
            console.error('Erro ao ler memória:', e);
            chatHistory = {};
        }
    }
}

function saveMemory() {
    try {
        fs.writeFileSync(MEMORY_FILE, JSON.stringify(chatHistory, null, 2));
    } catch (e) {
        console.error('Erro ao salvar memória:', e.message);
    }
}

function addMessageToHistory(chatId, role, content) {
    if (!chatHistory[chatId]) {
        chatHistory[chatId] = [];
    }
    chatHistory[chatId].push({ role, content });

    // Manter as últimas 40 interações para economizar contexto no Groq
    if (chatHistory[chatId].length > 40) {
        chatHistory[chatId] = chatHistory[chatId].slice(-40);
    }
    saveMemory();
}

function clearMemory(chatId) {
    chatHistory[chatId] = [];
    saveMemory();
}

loadMemory();

// ── Funções de Base (V3) ───────────────────────────────────
async function safeSend(chatId, text, extra = {}) {
    try {
        await bot.sendMessage(chatId, text, { parse_mode: 'Markdown', ...extra });
    } catch {
        try {
            await bot.sendMessage(chatId, text, extra);
        } catch (err2) {
            console.error('safeSend fatal:', err2.message);
        }
    }
}

// ── STT: Groq Whisper ──────────────────────────────────────
async function transcribeAudio(filePath) {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));
    form.append('model', 'whisper-large-v3');
    form.append('language', 'pt');
    form.append('response_format', 'text');

    const response = await axios.post(
        'https://api.groq.com/openai/v1/audio/transcriptions',
        form,
        {
            headers: {
                Authorization: `Bearer ${GROQ_API_KEY}`,
                ...form.getHeaders(),
            },
            maxContentLength: Infinity,
        }
    );
    return response.data.trim();
}

// ── LLM: Groq Chat ─────────────────────────────────────────
async function askKairosPersonal(chatId, userMessage) {
    const messages = [
        { role: 'system', content: getSystemPrompt() }
    ];

    // Inject persistent memory (context window)
    if (chatHistory[chatId] && chatHistory[chatId].length > 0) {
        messages.push(...chatHistory[chatId]);
    }

    messages.push({ role: 'user', content: userMessage });

    try {
        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: 'llama-3.3-70b-versatile',
                messages: messages,
                temperature: 0.7,
                max_tokens: 1024
            },
            {
                headers: {
                    Authorization: `Bearer ${GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const answer = response.data.choices[0].message.content;
        addMessageToHistory(chatId, 'user', userMessage);
        addMessageToHistory(chatId, 'assistant', answer);
        return answer;
    } catch (error) {
        console.error('Erro Groq LLM:', error.response ? error.response.data : error.message);
        return 'Tive um problema de conexão com o cérebro 🧠 Pode repetir, por favor?';
    }
}

// ── TTS: Edge-TTS via CLI ──────────────────────────────────
async function synthesizeSpeech(text, outputPath) {
    return new Promise((resolve, reject) => {
        const safeText = text
            .replace(/"/g, '\\"')
            .replace(/\n/g, ' ')
            .replace(/[`$]/g, '');

        const voice = 'pt-BR-FranciscaNeural';
        const cmd = `npx -y edge-tts --voice "${voice}" --text "${safeText}" --write-media "${outputPath}"`;

        exec(cmd, { timeout: 30000 }, (error) => {
            if (error) {
                console.error('TTS Error:', error.message);
                reject(error);
            } else {
                resolve(outputPath);
            }
        });
    });
}

// ── Download & transcribe voice helper ─────────────────────
async function getVoiceText(msg) {
    const fileId = msg.voice.file_id;
    const file = await bot.getFile(fileId);
    const fileUrl = `https://api.telegram.org/file/bot${TELEGRAM_TOKEN}/${file.file_path}`;
    const oggPath = path.join(TEMP_DIR, `voice_${Date.now()}.ogg`);

    const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
    fs.writeFileSync(oggPath, response.data);

    const transcript = await transcribeAudio(oggPath);
    try { fs.unlinkSync(oggPath); } catch (e) { }
    return transcript;
}

// ── Handler: /start ─────────────────────────────────────────
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    await safeSend(chatId,
        `👋 *Olá! Eu sou o KAIROS Personal.*\n\n` +
        `Sou uma Inteligência Artificial criada especialmente pra ser seu braço direito no dia a dia.\n\n` +
        `Algumas coisas que posso fazer por você:\n\n` +
        `📊 *Excel e Planilhas*\n` +
        `• Criar fórmulas (PROCV, SE, CONT.SE...)\n` +
        `• Explicar erros e formatos de dados\n` +
        `• Dicas de produtividade no Excel\n\n` +
        `📝 *Apoio Profissional*\n` +
        `• Redigir e-mails e mensagens\n` +
        `• Organizar listas de tarefas\n` +
        `• Resolver dúvidas sobre processos\n\n` +
        `🧠 *Aprendizado e Desenvolvimento*\n` +
        `• Explicar conceitos e siglas\n` +
        `• Treinar inglês com você\n` +
        `• Dicas de produtividade\n\n` +
        `🎧 *Voz*\n` +
        `• Me envie áudios e eu respondo por áudio\n` +
        `• Transcrevo tudo automaticamente\n\n` +
        `───────────────────────\n` +
        `💡 _Dica: Me diga como quer que eu atue e eu me adapto! Ex: "Seja minha coach de produtividade"._\n\n` +
        `🔄 /resetar — Apagar memória e recomeçar\n` +
        `❓ /ajuda — Ver todas as minhas capacidades`
    );
});

// ── Handler: /resetar ───────────────────────────────────────
bot.onText(/\/resetar/, async (msg) => {
    const chatId = msg.chat.id;
    clearMemory(chatId);
    await safeSend(chatId,
        `🧹 *Memória apagada com sucesso!*\n\n` +
        `Voltei a ser uma tela em branco. Qual será meu novo papel?`
    );
});

// ── Handler: /ajuda ─────────────────────────────────────────
bot.onText(/\/ajuda/, async (msg) => {
    const chatId = msg.chat.id;
    await safeSend(chatId,
        `❓ *Como usar o KAIROS Personal*\n\n` +
        `*Texto:* Mande qualquer mensagem e eu respondo.\n` +
        `*Áudio:* Mande um áudio e eu transcrevo + respondo (por texto e áudio).\n` +
        `*Documentos:* Mande fotos ou arquivos que eu descrevo o que vejo.\n\n` +
        `*Comandos:*\n` +
        `• /start — Tela de boas-vindas\n` +
        `• /resetar — Limpar memória e recomeçar\n` +
        `• /ajuda — Esta mensagem\n\n` +
        `*Dica:* Você pode me dar um papel fixo dizendo:\n` +
        `_"A partir de agora quero que você seja minha assistente de X"_\n\n` +
        `Eu vou lembrar disso pra sempre (até você usar /resetar).`
    );
});

// ── Handler: Voice Messages ─────────────────────────────────
bot.on('voice', async (msg) => {
    const chatId = msg.chat.id;

    try {
        await bot.sendMessage(chatId, '🎙️ _Processando seu áudio..._', { parse_mode: 'Markdown' });

        const transcript = await getVoiceText(msg);
        console.log(`📝 [${chatId}] Transcrição: "${transcript}"`);

        await bot.sendMessage(chatId, `📝 *Transcrição:* _"${transcript}"_`, { parse_mode: 'Markdown' });

        // Process with LLM
        console.log('🧠 Processando com KAIROS Personal...');
        const answer = await askKairosPersonal(chatId, transcript);
        console.log(`   → ${answer.substring(0, 100)}...`);

        await safeSend(chatId, answer);

        // Voice response
        const mp3Path = path.join(TEMP_DIR, `response_${Date.now()}.mp3`);
        try {
            await synthesizeSpeech(answer, mp3Path);
            await bot.sendVoice(chatId, mp3Path);
            fs.unlinkSync(mp3Path);
        } catch (ttsErr) {
            console.log('TTS falhou, enviando só texto:', ttsErr.message);
        }

    } catch (error) {
        console.error('Erro processando áudio:', error.message);
        await safeSend(chatId, '⚠️ Houve um problema ao processar seu áudio. Tente novamente.');
    }
});

// ── Handler: Text Messages ──────────────────────────────────
bot.on('message', async (msg) => {
    if (msg.voice || msg.audio || !msg.text || msg.text.startsWith('/')) return;

    const chatId = msg.chat.id;
    const text = msg.text;

    try {
        await bot.sendChatAction(chatId, 'typing');
        const answer = await askKairosPersonal(chatId, text);
        await safeSend(chatId, answer);

        // Audio response for text messages too (mirroring Master Pumps V3)
        const mp3Path = path.join(TEMP_DIR, `response_${Date.now()}.mp3`);
        try {
            await synthesizeSpeech(answer, mp3Path);
            await bot.sendVoice(chatId, mp3Path);
            fs.unlinkSync(mp3Path);
        } catch (ttsErr) {
            console.log('TTS falhou para texto:', ttsErr.message);
        }
    } catch (error) {
        console.error('Erro:', error.message);
        await safeSend(chatId, '⚠️ Houve um problema. Tente novamente.');
    }
});

// ── Handler: Documents (photos, files) ──────────────────────
bot.on('document', async (msg) => {
    const chatId = msg.chat.id;
    const fileName = msg.document.file_name || 'documento';
    await safeSend(chatId,
        `📎 Recebi o arquivo *${fileName}*! ` +
        `Me diga o que é e o que quer que eu faça com ele. ` +
        `Ex: _"Esse é um relatório de vendas, me resume os principais pontos."_`
    );
});

// ── Handler: Photos ─────────────────────────────────────────
bot.on('photo', async (msg) => {
    const chatId = msg.chat.id;
    await safeSend(chatId,
        `📸 Recebi sua imagem! Me diz o que ela é (print de planilha, tela de erro, etc.) ` +
        `e o que quer que eu faça. Posso te ajudar a interpretar!`
    );
});

// ── Error handling ──────────────────────────────────────────
bot.on('polling_error', (error) => {
    if (error.code === 'ETELEGRAM' && error.message.includes('409 Conflict')) {
        console.warn('⚠️  [Aviso] Conflito 409 detectado (possiveis multiplas instancias rodando). Ignorando para permitir transição no Render...');
    } else {
        console.error('Polling error:', error.message);
    }
});

console.log('🎙️ KAIROS Personal — Assistente Adaptável (Blank Canvas V3)');
console.log('   Modo: Totalmente adaptável via conversa');
console.log('   Memória: Persistente em disco (memory.json)');
console.log('   Aguardando comandos...\n');
