/**
 * AIOS Revenue Test
 * 
 * Simulates a lead sending a message to the WhatsApp Server.
 * Usage: node scripts/test-webhook.js "Ola, quanto custa o implante?"
 */

const http = require('http');

const message = process.argv[2] || "Olá, gostaria de saber mais sobre o clareamento.";
const sender = "5511999998888";

const payload = {
    data: {
        key: { remoteJid: sender },
        pushName: "Cliente Teste",
        message: {
            conversation: message
        }
    }
};

const data = JSON.stringify(payload);

const options = {
    hostname: 'localhost',
    port: 3005,
    path: '/webhook/whatsapp',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

console.log(`📡 Sending test message: "${message}"`);

const req = http.request(options, (res) => {
    console.log(`✅ Server responded: ${res.statusCode}`);
    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (error) => {
    console.error('❌ Connection failed. Is the server running?');
    console.error('Run: npm run start:revenue');
});

req.write(data);
req.end();
