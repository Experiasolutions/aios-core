/**
 * AIOS WhatsApp Server (The Revenue Bridge)
 * 
 * Objective: Connect the AIOS Brain to the real world (Clients/Leads).
 * Stack: Express.js + Evolution API (or similar webhook provider)
 * 
 * Usage:
 *   node scripts/whatsapp-server.js
 */

const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3005;

// Middleware
app.use(bodyParser.json());

// ── Configuration ─────────────────────────────────────────────

const BRIDGE_SCRIPT = path.join(__dirname, 'experia_bridge.js');
const CONTEXT_DIR = path.join(__dirname, '..', '.aios-core', 'data', 'contexts');

// Ensure context dir exists
if (!fs.existsSync(CONTEXT_DIR)) {
    fs.mkdirSync(CONTEXT_DIR, { recursive: true });
}

// ── Routes ────────────────────────────────────────────────────

app.get('/', (req, res) => {
    res.json({ status: 'online', system: 'AIOS WhatsApp Bridge', agent: 'Orion' });
});

/**
 * Webhook Receptor (Evolution API Standard)
 */
app.post('/webhook/whatsapp', async (req, res) => {
    try {
        const data = req.body;

        // 1. Filter for messages (ignore status updates)
        if (!data.data || !data.data.message) {
            return res.status(200).send('OK (Ignored)');
        }

        const message = data.data.message;
        const sender = data.data.key.remoteJid;
        const text = message.conversation || message.extendedTextMessage?.text;

        if (!text) return res.status(200).send('OK (No Text)');

        console.log(`📩 Received from ${sender}: ${text.substring(0, 50)}...`);

        // 2. Create Context File
        const contextId = `ctx_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
        const contextFile = path.join(CONTEXT_DIR, `${contextId}.json`);

        const contextData = {
            source: 'whatsapp',
            project: 'whatsapp-autoreply', // Default to autoreply squad
            data: {
                sender_id: sender,
                sender_name: data.data.pushName || 'Lead',
                message_text: text,
                timestamp: new Date().toISOString()
            }
        };

        fs.writeFileSync(contextFile, JSON.stringify(contextData, null, 2));

        // 3. Trigger The Brain (Experia Bridge)
        // We spawn a child process so we don't block the web server
        console.log(`🧠 Triggering Cortex for ${contextId}...`);

        const bridge = spawn('node', [BRIDGE_SCRIPT, contextFile], {
            cwd: path.join(__dirname, '..'),
            stdio: 'inherit' // Pipe output to console
        });

        bridge.on('close', (code) => {
            console.log(`✅ Cortex finished with code ${code}`);
            // In a real production setup, we would read action.json and send the reply back via API
            // For now, we assume the bridge/human monitors the logs or action.json
        });

        res.status(200).json({ status: 'processing', context_id: contextId });

    } catch (error) {
        console.error('❌ Error processing webhook:', error);
        res.status(500).send('Internal Server Error');
    }
});

// ── Start ─────────────────────────────────────────────────────

app.listen(PORT, () => {
    console.log(`
🚀 AIOS REVENUE BRIDGE ONLINE
-----------------------------
listening on: http://localhost:${PORT}
endpoint:     POST /webhook/whatsapp
target:       .aios-core/data/contexts/
bridge:       scripts/experia_bridge.js

Ready to make money. Waiting for leads...
  `);
});
