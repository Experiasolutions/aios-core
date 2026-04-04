#!/usr/bin/env node

/**
 * Skortex CLI v1.0 — Entrypoint
 * 
 * Executa via ts-node para desenvolvimento.
 * Em produção, usar `npm run build` + `node dist/index.js`.
 */

try {
  require('ts-node').register({
    compilerOptions: {
      module: 'commonjs',
      esModuleInterop: true,
    }
  });
  require('../src/index.ts');
} catch (e) {
  // Fallback: tenta versão compilada
  try {
    require('../dist/index.js');
  } catch (e2) {
    console.error('❌ Skortex CLI: Instale ts-node (npm i -D ts-node) ou compile (npm run build)');
    process.exit(1);
  }
}
