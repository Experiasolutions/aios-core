/**
 * @module whatsapp-server
 * @version 2.0.0
 * @purpose Complete WhatsApp Revenue Bridge — receives, classifies,
 *          responds, and tracks conversations end-to-end.
 * @inputs  Webhook POST /webhook/whatsapp (Evolution API format)
 * @outputs Auto-reply via Evolution API, session state update
 * @emits   whatsapp:message:received, whatsapp:reply:sent
 * @dependencies session-store, intent-classifier, response-builder,
 *               event-bus, kernel-bridge
 */

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const axios = require('axios'); // Requires axios for API calls

// Core Modules (Phase 3)
const sessionStore = require('./session-store');
const intentClassifier = require('./intent-classifier');
const responseBuilder = require('./response-builder');
const { bus: eventBus } = require('./event-bus');

// Configuration
const PORT = process.env.WHATSAPP_PORT || 3005;
const API_URL = process.env.EVOLUTION_API_URL;
const API_KEY = process.env.EVOLUTION_API_KEY;
const INSTANCE = process.env.EVOLUTION_INSTANCE;

const app = express();
app.use(bodyParser.json());

// Helper: Send Message via Evolution API
async function sendWhatsAppMessage(phone, text) {
    if (!API_URL || !API_KEY || !INSTANCE) {
        console.warn(`[WhatsApp] Cannot send reply. Missing ENV config. Text: "${text}"`);
        return false;
    }

    try {
        const url = `${API_URL}/message/sendText/${INSTANCE}`;
        const body = {
            number: phone,
            textMessage: { text: text },
            options: { delay: 1200, presence: 'composing', linkPreview: false }
        };

        const response = await axios.post(url, body, {
            headers: { 'apikey': API_KEY }
        });

        eventBus.emit('whatsapp:reply:sent', { phone, text, status: 'success' });
        return true;
    } catch (error) {
        console.error(`[WhatsApp] Error sending message to ${phone}:`, error.message);
        eventBus.emit('whatsapp:reply:failed', { phone, error: error.message });
        return false;
    }
}

// Health Check
app.get('/health', (req, res) => {
    res.json({
        status: 'UP',
        version: '2.0.0',
        timestamp: new Date().toISOString(),
        config: {
            apiUrl: !!API_URL,
            apiKey: !!API_KEY,
            instance: !!INSTANCE
        }
    });
});

// Webhook Endpoint
app.post('/webhook/whatsapp', async (req, res) => {
    // 1. Acknowledge immediately (Evolution API expects 200 OK)
    res.status(200).send('OK');

    try {
        const body = req.body;

        // Extract basic info (Evolution API format)
        // Note: Structure varies slightly by version, handling common path
        const data = body.data || body;
        const message = data.message || data.nMessage;

        // Skip status updates or messages sent by me
        if (!message || data.key?.fromMe) return;

        const remoteJid = data.key.remoteJid; // e.g. 5511999999999@s.whatsapp.net
        const phone = remoteJid.split('@')[0];
        const pushName = data.pushName;

        // Extract text content (text, conversation, extendedTextMessage)
        const text = message.conversation || message.extendedTextMessage?.text || message.text;

        if (!text) {
            console.log(`[WhatsApp] Skipping non-text message from ${phone}`);
            return; // TODO: Handle media (EC-01)
        }

        console.log(`[WhatsApp] 📩 Message from ${pushName} (${phone}): "${text}"`);
        eventBus.emit('whatsapp:message:received', { phone, text, pushName });

        // --- 4-Layer Pipeline ---

        // 2. Session Store
        const session = sessionStore.createOrUpdate(phone, text, null, { pushName });

        // 3. Intent Classifier
        const classification = intentClassifier.classify(text, session);
        console.log(`[WhatsApp] 🧠 Intent: ${classification.intent} (${classification.confidence})`);

        // Update session with identified intent
        sessionStore.createOrUpdate(phone, null, classification);

        // 4. Response Builder
        const response = responseBuilder.build(classification.intent, classification.entities, session);
        console.log(`[WhatsApp] 🤖 Reply: "${response.text.substring(0, 50)}..."`);

        // 5. Send Reply
        await sendWhatsAppMessage(phone, response.text);

    } catch (error) {
        console.error('[WhatsApp] Processing error:', error);
    }
});

// Start Server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 WhatsApp Revenue Bridge v2 running on port ${PORT}`);
        console.log(`📡 Webhook URL: http://localhost:${PORT}/webhook/whatsapp`);
    });
}

module.exports = app;
