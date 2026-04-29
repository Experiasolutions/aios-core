/**
 * Bot WhatsApp — Letícia Estética
 * KAIROS AI OPS · Evolution API + Groq · Deploy: Railway
 *
 * Fluxos:
 * - Atendimento: captação de novos clientes via webhook Evolution API
 * - Sócio Digital: Gabriel recebe reports no Telegram
 * - Cron 08h: Morning Brief para Gabriel
 */
require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const { loadEnv } = require('./config/env');
const business = require('./config/business.json');
const { handleIncomingMessage } = require('./services/groq');
const { sendMessage } = require('./services/evolution');

const config = loadEnv();
const app = express();
app.use(express.json());

// ── Telegram (Sócio Digital) ──────────────────────────────────────────────────
let telegramBot = null;
try {
    telegramBot = require('./services/telegram');
} catch (e) {
    console.warn('⚠️ Telegram desativado:', e.message);
}

// ── Health Check ──────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        bot: `${business.name} Bot`,
        instance: config.instanceName,
        uptime: Math.floor(process.uptime()),
        telegram: !!telegramBot,
        timestamp: new Date().toISOString(),
    });
});

// ── Webhook Evolution API (WhatsApp) ─────────────────────────────────────────
app.post('/webhook', async (req, res) => {
    try {
        const body = req.body;

        // Segurança opcional via secret header
        if (config.webhookSecret) {
            const incoming = req.headers['x-webhook-secret'] || req.query.secret;
            if (incoming !== config.webhookSecret) {
                return res.status(401).json({ error: 'Não autorizado' });
            }
        }

        // Processar apenas mensagens recebidas (não as enviadas pelo bot)
        if (body.event !== 'messages.upsert') {
            return res.status(200).send('OK');
        }

        const messageData = body.data?.message;
        const key = body.data?.key;

        // Ignorar mensagens enviadas pelo próprio bot
        if (key?.fromMe) {
            return res.status(200).send('OK');
        }

        // Extrair texto
        let userText = '';
        if (messageData?.conversation) {
            userText = messageData.conversation;
        } else if (messageData?.extendedTextMessage?.text) {
            userText = messageData.extendedTextMessage.text;
        } else if (messageData?.audioMessage) {
            userText = '[Áudio recebido — em breve com transcrição automática]';
        } else if (messageData?.imageMessage?.caption) {
            userText = messageData.imageMessage.caption || '[Imagem recebida]';
        }

        if (!userText) {
            return res.status(200).send('OK');
        }

        const remoteJid = key?.remoteJid;
        console.log(`[WA IN] ${remoteJid}: "${userText}"`);

        const botResponse = await handleIncomingMessage(userText, remoteJid);
        await sendMessage(remoteJid, botResponse);

        res.status(200).send('OK');
    } catch (error) {
        console.error('[Webhook] Erro:', error.message || error);
        res.status(500).send('Erro Interno');
    }
});

// ── Cron: Morning Brief (08h) ─────────────────────────────────────────────────
cron.schedule('0 8 * * *', () => {
    const ownerId = config.telegramOwnerId;
    if (ownerId && telegramBot) {
        const msg =
            `☀️ *Bom dia, Gabriel!*\n\n` +
            `📊 *Morning Brief — ${business.name}*\n\n` +
            `O bot está rodando normalmente.\n` +
            `Hora de verificar os atendimentos de ontem e follow-ups pendentes!\n\n` +
            `💡 _Dica: Pergunte quem não respondeu nos últimos 2 dias para eu sugerir uma mensagem de reativação._`;

        telegramBot.sendMessage(ownerId, msg, { parse_mode: 'Markdown' }).catch(err => {
            console.error('[CRON] Falha Morning Brief Telegram:', err.message);
        });
    }
}, { timezone: 'America/Sao_Paulo' });

// ── Cron: Lembrete Pós-Atendimento (simulado — base para expansão) ────────────
cron.schedule('0 10 * * *', () => {
    // TODO: integrar com Supabase para buscar atendimentos de D-1 e disparar follow-up
    console.log('[CRON] Verificação de follow-ups pós-atendimento...');
}, { timezone: 'America/Sao_Paulo' });

// ── Start Server ─────────────────────────────────────────────────────────────
app.listen(config.port, () => {
    console.log(`\n🌟 ======================================`);
    console.log(`   ${business.name} Bot`);
    console.log(`   Instância: ${config.instanceName}`);
    console.log(`   Porta: ${config.port}`);
    console.log(`   Telegram: ${telegramBot ? '✅ ativo' : '❌ desativado'}`);
    console.log(`   Health: GET /health`);
    console.log(`   Webhook: POST /webhook`);
    console.log(`=======================================\n`);
});
