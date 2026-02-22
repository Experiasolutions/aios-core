/**
 * AIOS Enterprise Knowledge Loader
 * 
 * Carrega a arquitetura Experia + organogramas Master Pumps na memória do JARVIS.
 * Cria um knowledge base unificado para consultas rápidas de todos os squads.
 * 
 * Uso: node scripts/enterprise-loader.js
 */

const memory = require('./memory-system');
const fs = require('fs');
const path = require('path');

// ── Experia Agent Taxonomy (from EXPERIA-ENTERPRISE-ARCHITECTURE.md) ──
const EXPERIA_AGENTS = {
  jarvis: {
    level: 0, role: 'Supreme Orchestrator',
    manages: ['PATIENT-OPS-HEAD', 'MARKETING-HEAD', 'FINANCE-HEAD', 'CLINICAL-HEAD', 'ANALYTICS-HEAD'],
  },
  departments: {
    'patient-ops': {
      head: 'PATIENT-OPS-HEAD', agents: 18,
      teams: ['intake', 'scheduling', 'onsite', 'retention', 'support'],
      keyMetrics: { nps: '>9', noShowRate: '<15%', timeToFirstAppt: '<48h' },
    },
    'marketing': {
      head: 'MARKETING-HEAD', agents: 12,
      teams: ['content', 'distribution', 'acquisition'],
      keyMetrics: { cpa: '<R$150', conversionRate: '>30%', roi: '>300%' },
    },
    'finance': {
      head: 'FINANCE-HEAD', agents: 8,
      teams: ['billing', 'reconciliation', 'reporting'],
      keyMetrics: { dso: '<30d', collectionRate: '>95%', latePayment: '<10%' },
    },
    'clinical': {
      head: 'CLINICAL-HEAD', agents: 10,
      teams: ['clinical_support', 'logistics'],
      keyMetrics: { docCompletion: '100%', compliance: '100%', stockout: '<2%' },
    },
    'analytics': {
      head: 'ANALYTICS-HEAD', agents: 9,
      teams: ['data', 'intelligence', 'prediction'],
      keyMetrics: { dashboardUptime: '99.9%', anomalyAccuracy: '>90%', predictionAccuracy: '>85%' },
    },
  },
  totalAgents: 58,
};

// ── Master Pumps Org Chart (from organogramas-completos.md) ──
const MASTER_PUMPS = {
  company: 'Master Pumps',
  totalPositions: 120,
  approvedBy: ['Felipe Mitsui', 'Wellington J. Ferreira', 'Beaten Mezzaroba'],
  divisions: {
    administracao: {
      positions: 25,
      hierarchy: ['Diretor Presidente', 'Diretor Administrativo', 'Supervisor(a) Administrativo'],
      areas: {
        comercioExterior: ['Analista de Comércio Exterior', 'Auxiliar de Comércio Exterior'],
        ti: ['Analista de Infra. De T.I Jr'],
        financeiro: ['Analista Financeiro Sênior', 'Assistente Financeiro Pleno', 'Auxiliar Admin. Pleno'],
        compras: ['Compradora', 'Aux. De Compras'],
        faturamento: ['Líder de Faturamento', 'Assistente de Faturamento', 'Auxiliar de Faturamento Jr'],
        rh: ['Supervisor(a) de RH', 'Coord. De RH', 'Analista de RH', 'Assist. de RH', 'Aux. de RH', 'Aprendiz'],
        segTrabalho: ['Coord. De Seg. Trabalho', 'Tec. De Seg. Do Trabalho'],
        facilities: ['Líder de Limpeza', 'Auxiliar de Limpeza Predial', 'Auxiliar de Limpeza', 'Faxineira'],
      },
    },
    logistica: {
      positions: 35,
      hierarchy: ['Diretor Presidente', 'Diretor Administrativo', 'Gerente Operacional', 'Supervisor Operacional'],
      areas: {
        matriz: ['Líder de Logística', 'Líder de Estoque', 'Coord. de Logística (Matriz)'],
        filial: ['Líder de Estoque', 'Líder de Expedição', 'Coord. de Logística (Filial)'],
      },
    },
    operacional: {
      positions: 60,
      hierarchy: ['Diretor Presidente', 'Diretor Administrativo', 'Gerente Operacional', 'Supervisor Operacional'],
      areas: {
        producao: ['Coord. de Produção', 'Líder de Corte e Montagem', 'Líder de Sopro', 'Líder de ICP'],
        manutencao: ['Coord. de Manutenção', 'Líder de Manut. Geral', 'Líder de Deseniv. de Produto'],
        qualidade: ['Coord. de Controle de Qualidade', 'Téc. de Deseniv. de Qualidade', 'Líder de Qualidade'],
      },
    },
  },
  levels: ['Diretoria', 'Gerência', 'Supervisão', 'Coordenação', 'Liderança', 'Analistas/Assistentes', 'Operadores/Auxiliares', 'Aprendizes'],
};

// ── AIOS ↔ Enterprise Mapping ──
const AIOS_ENTERPRISE_MAP = {
  description: 'Maps AIOS ClickUp squads to Experia departments and Master Pumps divisions',
  mappings: [
    { aiosSquad: 'CRM & Vendas',      experiaDept: 'patient-ops',  masterPumps: 'administracao.comercioExterior', agents: 18 },
    { aiosSquad: 'Marketing',          experiaDept: 'marketing',    masterPumps: null, agents: 12 },
    { aiosSquad: 'Operações (OPS)',     experiaDept: 'clinical',     masterPumps: 'operacional', agents: 10 },
    { aiosSquad: 'Customer Success',    experiaDept: 'patient-ops',  masterPumps: null, agents: 18 },
    { aiosSquad: 'Administração',       experiaDept: 'finance',      masterPumps: 'administracao', agents: 8 },
    { aiosSquad: 'Facilities',          experiaDept: null,           masterPumps: 'administracao.facilities', agents: 0 },
    { aiosSquad: 'Produto',             experiaDept: 'analytics',    masterPumps: 'operacional.producao', agents: 9 },
  ],
};

// ── Business Model ──
const BUSINESS_MODEL = {
  plans: {
    essential: { price: 2997, agents: 15 },
    growth: { price: 5997, agents: 35 },
    enterprise: { price: 9997, agents: 58 },
  },
  projections: {
    year1: { clients: 50, arr: 3600000, ebitda: -800000 },
    year2: { clients: 180, arr: 12900000, ebitda: 3200000 },
    year3: { clients: 420, arr: 30200000, ebitda: 12100000 },
  },
  unitEconomics: {
    cac: 3500, ltv: 86000, ltvCacRatio: 24.6, grossMargin: 0.87,
  },
};

// ── Load into Memory ──
function load() {
  console.log('');
  console.log('═══════════════════════════════════════════════════');
  console.log('  🏢 Enterprise Knowledge Loader');
  console.log('═══════════════════════════════════════════════════');
  console.log('');

  // Store enterprise context
  memory.store('knowledge', 
    `Experia tem ${EXPERIA_AGENTS.totalAgents} agentes IA em 5 departamentos: Patient Ops (18), Marketing (12), Finance (8), Clinical (10), Analytics (9). JARVIS orquestra tudo.`,
    { source: 'EXPERIA-ENTERPRISE-ARCHITECTURE.md', agents: EXPERIA_AGENTS }
  );
  console.log('  ✅ Experia Agent Taxonomy carregada');

  memory.store('knowledge',
    `Master Pumps: ~120 colaboradores em 3 divisões — Administração (25), Logística (35), Operacional (60). 8 níveis hierárquicos. Aprovado por Felipe Mitsui, Wellington, Beaten.`,
    { source: 'organogramas-completos.md', org: MASTER_PUMPS }
  );
  console.log('  ✅ Master Pumps Org Chart carregada');

  memory.store('knowledge',
    `Mapeamento AIOS ↔ Experia: CRM=Patient Ops (18 agents), Marketing (12), OPS=Clinical (10), CS=Patient Ops, Admin=Finance (8), Produto=Analytics (9)`,
    { source: 'enterprise-mapping', map: AIOS_ENTERPRISE_MAP }
  );
  console.log('  ✅ Mapeamento AIOS ↔ Enterprise carregado');

  memory.store('knowledge',
    `Modelo de negócio Experia: Essential R$2.997 (15 agents), Growth R$5.997 (35 agents), Enterprise R$9.997 (58 agents). LTV:CAC 24.6:1, Gross Margin 87%. Year 3: R$30.2M ARR, 420 clientes.`,
    { source: 'business-model', model: BUSINESS_MODEL }
  );
  console.log('  ✅ Business Model carregado');

  memory.store('knowledge',
    `Master Pumps RH tem: Supervisor(a) de RH, Coord. de RH, Coord. Seg. Trabalho, Analista de RH, Tec. Seg. Trabalho, Assist. de RH, Aux. de RH, Aprendiz. Total ~8 posições RH.`,
    { source: 'organogramas-completos.md', area: 'rh' }
  );
  console.log('  ✅ Master Pumps RH detalhado carregado');

  const s = memory.stats();
  console.log('');
  console.log(`  📊 Total: ${s.total} memórias | Knowledge: ${s.categories.knowledge || 0}`);
  console.log('');
}

// Export for other modules
module.exports = { EXPERIA_AGENTS, MASTER_PUMPS, AIOS_ENTERPRISE_MAP, BUSINESS_MODEL };

if (require.main === module) {
  load();
}
