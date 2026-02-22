// AIOS Bridge — Test Runner
// Testa todos os 5 projetos UiPath em sequência
// Uso: node test/run-all-tests.js

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BRIDGE = path.join(ROOT, 'scripts', 'experia_bridge.js');
const ACTION = path.join(ROOT, 'action.json');

const tests = [
  { name: 'WhatsApp AutoReply',       context: 'test/context-whatsapp.json',          project: 'whatsapp-autoreply' },
  { name: 'Lead Scoring',             context: 'test/context-lead-scoring.json',      project: 'lead-scoring' },
  { name: 'Financial Report',         context: 'test/context-financial-report.json',  project: 'financial-report' },
  { name: 'Health Check',             context: 'test/context-health-check.json',      project: 'health-check' },
  { name: 'Preventive Maintenance',   context: 'test/context-maintenance.json',       project: 'preventive-maintenance' },
];

console.log('═══════════════════════════════════════════════════');
console.log('  🧪 AIOS Bridge — Test Suite Completa');
console.log('═══════════════════════════════════════════════════\n');

let passed = 0;
let failed = 0;
const results = [];

for (const test of tests) {
  const ctxPath = path.join(ROOT, test.context);
  console.log(`\n▶ Testando: ${test.name} (${test.project})`);
  console.log('─'.repeat(50));

  try {
    const start = Date.now();
    execSync(`node "${BRIDGE}" "${ctxPath}" ${test.project}`, {
      cwd: ROOT,
      stdio: 'pipe',
      timeout: 30000,
    });
    const elapsed = Date.now() - start;

    // Ler action.json
    const action = JSON.parse(fs.readFileSync(ACTION, 'utf8'));

    const result = {
      test: test.name,
      project: test.project,
      status: action.status,
      actionType: action.action?.type || 'N/A',
      provider: action.meta?.provider || 'N/A',
      confidence: action.confidence || 0,
      timeMs: elapsed,
      response: action.action?.payload?.text?.substring(0, 80) || JSON.stringify(action.action?.payload || {}).substring(0, 80),
    };
    results.push(result);

    if (action.status === 'success') {
      console.log(`  ✅ Status: ${action.status}`);
      console.log(`  🎯 Action: ${result.actionType}`);
      console.log(`  🧠 Provider: ${result.provider} (confidence: ${result.confidence})`);
      console.log(`  ⏱  Tempo: ${elapsed}ms`);
      console.log(`  💬 Resposta: ${result.response}...`);
      passed++;
    } else {
      console.log(`  ❌ Status: ${action.status} — ${action.error || action.reason}`);
      failed++;
    }
  } catch (err) {
    console.log(`  ❌ ERRO: ${err.message.split('\n')[0]}`);
    results.push({ test: test.name, project: test.project, status: 'error', error: err.message.split('\n')[0] });
    failed++;
  }
}

// Resumo
console.log('\n═══════════════════════════════════════════════════');
console.log(`  📊 RESULTADO: ${passed}/${tests.length} passed, ${failed} failed`);
console.log('═══════════════════════════════════════════════════\n');

// Salvar relatório
const report = {
  timestamp: new Date().toISOString(),
  aiosVersion: '5.0.0',
  totalTests: tests.length,
  passed,
  failed,
  results,
};
fs.writeFileSync(path.join(ROOT, 'test', 'test-results.json'), JSON.stringify(report, null, 2));
console.log('📄 Relatório salvo em: test/test-results.json\n');
