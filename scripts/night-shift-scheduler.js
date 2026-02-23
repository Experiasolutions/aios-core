/**
 * KAIROS Night Shift Scheduler
 * 
 * Runs automated tasks overnight in SERIAL sequence
 * to respect 8GB RAM constraint. Each task completes
 * before the next begins.
 * 
 * Usage: node scripts/night-shift-scheduler.js
 * Daemon: pm2 start scripts/night-shift-scheduler.js --name "kairos-night-shift"
 * 
 * Tasks:
 *   00:00 — Evolution Engine cycle
 *   04:00 — Cognitive State compression
 *   06:00 — Morning Brief → Telegram
 */

require('dotenv').config();
const schedule = require('node-schedule');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const https = require('https');

const ROOT = path.resolve(__dirname, '..');
const REPORT_DIR = path.join(ROOT, '.aios-core', 'night-reports');
const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_ALLOWED_USER_ID;

// Ensure report directory exists
if (!fs.existsSync(REPORT_DIR)) fs.mkdirSync(REPORT_DIR, { recursive: true });

// ─── Helpers ───

function timestamp() {
    return new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
}

function runAsync(cmd, label, timeoutMs = 300000) {
    return new Promise((resolve) => {
        console.log(`[NIGHT] ${new Date().toISOString()} — Iniciando: ${label}`);
        const child = exec(cmd, { cwd: ROOT, timeout: timeoutMs, maxBuffer: 5 * 1024 * 1024 }, (err, stdout, stderr) => {
            if (err) {
                console.error(`[NIGHT] ❌ Erro em ${label}:`, err.message);
                resolve({ success: false, label, error: err.message, output: stderr || '' });
            } else {
                console.log(`[NIGHT] ✅ ${label} concluído`);
                resolve({ success: true, label, output: stdout.trim() });
            }
        });
    });
}

function sendTelegram(text) {
    if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
        console.log('[NIGHT] ⚠️ Telegram not configured — skipping notification');
        return Promise.resolve();
    }

    return new Promise((resolve) => {
        const postData = JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: text.substring(0, 4000),
            parse_mode: 'Markdown',
        });

        const req = https.request({
            hostname: 'api.telegram.org',
            path: `/bot${TELEGRAM_TOKEN}/sendMessage`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(postData) },
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve());
        });

        req.on('error', (e) => {
            console.error('[NIGHT] Telegram send error:', e.message);
            resolve();
        });

        req.write(postData);
        req.end();
    });
}

// ─── Night Tasks (SERIAL execution) ───

const nightTasks = [
    {
        label: 'Evolution Cycle',
        cmd: 'node scripts/evolution/evolution-engine.js --dry-run',
        timeout: 60000,
    },
    {
        label: 'Cognitive State Compression',
        cmd: 'node scripts/evolution/cognitive-state-engine.js --dashboard',
        timeout: 30000,
    },
];

async function runNightShift() {
    console.log(`\n${'═'.repeat(60)}`);
    console.log(`[NIGHT] 🌙 Night Shift iniciando — ${new Date().toISOString()}`);
    console.log(`${'═'.repeat(60)}\n`);

    const results = [];
    const startTime = Date.now();

    // Run tasks SERIALLY (one at a time — protects 8GB RAM)
    for (const task of nightTasks) {
        const result = await runAsync(task.cmd, task.label, task.timeout);
        results.push(result);
        // Brief pause between tasks
        await new Promise(r => setTimeout(r, 2000));
    }

    // Process urgent queue
    const urgentFiles = [];
    try {
        const files = fs.readdirSync(REPORT_DIR).filter(f => f.startsWith('urgente-'));
        urgentFiles.push(...files);
    } catch { }

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    const succeeded = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    // Save night report
    const reportFile = path.join(REPORT_DIR, `${timestamp()}-night-report.md`);
    const report = [
        `# 🌙 Night Shift Report — ${new Date().toLocaleDateString('pt-BR')}`,
        '',
        `**Duração:** ${duration}s`,
        `**Tarefas:** ${succeeded} ✅ / ${failed} ❌`,
        `**Urgentes na fila:** ${urgentFiles.length}`,
        '',
        '## Resultados',
        '',
        ...results.map(r => `### ${r.success ? '✅' : '❌'} ${r.label}\n${r.success ? r.output.substring(0, 500) : `Erro: ${r.error}`}\n`),
        '',
        urgentFiles.length > 0 ? `## Tarefas Urgentes\n${urgentFiles.map(f => `- ${f}`).join('\n')}` : '',
    ].join('\n');

    fs.writeFileSync(reportFile, report);
    console.log(`[NIGHT] 📁 Report salvo: ${reportFile}`);

    return { results, duration, succeeded, failed, urgentFiles, reportFile };
}

// ─── Morning Brief ───

async function sendMorningBrief() {
    console.log('[NIGHT] ☀️ Gerando Morning Brief...');

    // Find most recent night report
    const reports = fs.readdirSync(REPORT_DIR)
        .filter(f => f.endsWith('-night-report.md'))
        .sort()
        .reverse();

    let briefText = `☀️ *Bom dia, Gabriel!*\n\n*KAIROS Morning Brief — ${new Date().toLocaleDateString('pt-BR')}*\n\n`;

    if (reports.length > 0) {
        const lastReport = fs.readFileSync(path.join(REPORT_DIR, reports[0]), 'utf8');
        const lines = lastReport.split('\n').filter(l => l.startsWith('### ') || l.startsWith('**'));
        briefText += lines.slice(0, 10).join('\n') + '\n\n';
    } else {
        briefText += '_(Nenhum relatório noturno encontrado)_\n\n';
    }

    // Check urgent tasks
    const urgentFiles = fs.readdirSync(REPORT_DIR).filter(f => f.startsWith('urgente-'));
    if (urgentFiles.length > 0) {
        briefText += `\n🚨 *${urgentFiles.length} tarefa(s) urgente(s) pendente(s)*\n`;
    }

    briefText += `\n📊 Use \`/status\` para health check completo.`;

    await sendTelegram(briefText);
    console.log('[NIGHT] ☀️ Morning Brief enviado via Telegram');
}

// ─── Schedule ───

// Midnight — Night Shift
schedule.scheduleJob('0 0 * * *', async () => {
    await runNightShift();
});

// 6:00 AM — Morning Brief
schedule.scheduleJob('0 6 * * *', async () => {
    await sendMorningBrief();
});

// ─── Startup ───

console.log('[KAIROS NIGHT SHIFT] 🌙 Scheduler ativo');
console.log(`  📁 Reports: ${REPORT_DIR}`);
console.log(`  📱 Telegram: ${TELEGRAM_TOKEN ? '✅ configurado' : '⚠️ não configurado'}`);
console.log('  ⏰ Horários:');
console.log('     00:00 — Evolution Cycle + Cognitive Compression');
console.log('     06:00 — Morning Brief → Telegram');
console.log('');
console.log('[KAIROS NIGHT SHIFT] Aguardando janelas de execução...');
console.log('  💡 Tip: para testar agora, use: node -e "require(\'./scripts/night-shift-scheduler.js\')"');
