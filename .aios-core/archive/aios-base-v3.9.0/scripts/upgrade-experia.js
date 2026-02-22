// Upgrade Experia squad — inject Finch sections using robust marker matching
const fs = require('fs');
const path = require('path');

const base = path.join('squads', 'experia', 'agents');

// Use simple string markers that won't be affected by line endings
const agents = [
    {
        file: 'experia-master.md',
        marker: 'persona_profile:',
        inject: `hierarchy:
  reports_to: "@aios-master (Orion)"
  manages:
    - "@experia-architect (Blueprint) — Arquiteto de Solução"
    - "@experia-copy (Voz) — Copy & Conversas"
    - "@experia-data (Radar) — Data & Insights"
    - "@experia-security (Sentinela) — Segurança & LGPD (Veto)"
    - "@experia-automations (Forge) — Automations Builder"
    - "@experia-integrations (Nexus) — Engenheiro de Integrações"
    - "@experia-validator (Vigil) — Consistency Validator"
    - "@experia-marketing (Pulse) — Marketing Digital"
  collaborates_with:
    - "@cs-head (Aegis) — Handoff pós-venda"
    - "@vendas-head (Titan) — Pipeline de clínicas"

kpi_thresholds:
  - metric: "Taxa de Agendamento"
    kill: "< 30%"
    warning: "30%-50%"
    scale: "> 60%"
  - metric: "SLA Resposta (median)"
    kill: "> 15 min"
    warning: "5-15 min"
    scale: "< 3 min"
  - metric: "Taxa de No-Show"
    kill: "> 25%"
    warning: "15%-25%"
    scale: "< 10%"
  - metric: "NPS do Cliente (clínica)"
    kill: "< 30"
    warning: "30-60"
    scale: "> 70"
  - metric: "Onboarding Time"
    kill: "> 14 dias"
    warning: "7-14 dias"
    scale: "< 5 dias"

skill_chains:
  clinic_onboarding:
    trigger: "Nova clínica contratou"
    workflow:
      - "@experia-master *brief → coletar informações"
      - "@experia-architect *diagnose → gargalos"
      - "@experia-architect *journey → jornada mínima"
      - "@experia-integrations *map → fontes e destinos"
      - "@experia-copy *script → scripts de atendimento"
      - "@experia-automations *build → implementar fluxos"
      - "@experia-security *gate → checklist LGPD"
      - "@experia-validator *go-nogo → validação final"
      - "@experia-data *dashboard → métricas ativas"
  weekly_review:
    trigger: "Cadência semanal (segunda)"
    workflow:
      - "@experia-data *report semanal"
      - "@experia-master *diagnose → top 3 gargalos"
      - "@experia-copy *qa → test cases"
      - "@experia-validator *check-metrics"

dna_sources:
  - expert: "Alex Hormozi ($100M Leads)"
    frameworks: ["Offer Creation", "Lead Magnet", "Value Equation"]
    weight: "25%"
  - expert: "Thiago Finch (ExperIA Model)"
    frameworks: ["Puppet System", "Quality Gates", "Brief Template"]
    weight: "25%"
  - expert: "Toyota Production System"
    frameworks: ["Kaizen", "Jidoka", "Visual Management"]
    weight: "20%"
  - expert: "LGPD / Healthcare Compliance"
    frameworks: ["Data Classification D0-D3", "Privacy by Design"]
    weight: "15%"
  - expert: "Russell Brunson (ClickFunnels)"
    frameworks: ["Value Ladder", "Funnel Architecture"]
    weight: "15%"

`
    },
    {
        file: 'experia-architect.md',
        marker: 'persona_profile:',
        inject: `hierarchy:
  reports_to: "@experia-master (Experia)"
  collaborates_with:
    - "@experia-integrations (Nexus) — implementação técnica"
    - "@experia-data (Radar) — métricas de sucesso"
    - "@experia-copy (Voz) — scripts alinhados à jornada"

kpi_thresholds:
  - metric: "Diagnósticos com hipótese confirmada"
    kill: "< 40%"
    warning: "40%-60%"
    scale: "> 75%"
  - metric: "Plano entregue no prazo"
    kill: "< 70%"
    warning: "70%-90%"
    scale: "> 95%"

skill_chains:
  full_diagnosis:
    trigger: "Nova clínica ou clínica com gargalo"
    workflow:
      - "*diagnose → 3 hipóteses"
      - "*journey → jornada mínima"
      - "*plan → entregáveis 7-14 dias"
      - "*scope → limites claros"
      - "Handoff para @experia-integrations"

dna_sources:
  - expert: "Eliyahu Goldratt (TOC)"
    frameworks: ["Bottleneck Analysis", "5 Focusing Steps"]
    weight: "40%"
  - expert: "Alex Osterwalder"
    frameworks: ["Value Proposition Canvas", "Business Model"]
    weight: "30%"
  - expert: "Lean Healthcare"
    frameworks: ["Patient Flow", "Value Stream Mapping"]
    weight: "30%"

`
    },
    {
        file: 'experia-copy.md',
        marker: 'persona_profile:',
        inject: `hierarchy:
  reports_to: "@experia-master (Experia)"
  collaborates_with:
    - "@experia-architect (Blueprint) — jornada define scripts"
    - "@experia-security (Sentinela) — compliance de mensagens"
    - "@experia-validator (Vigil) — validação de consistência"

kpi_thresholds:
  - metric: "Taxa de Conversão (lead → agenda)"
    kill: "< 30%"
    warning: "30%-50%"
    scale: "> 55%"
  - metric: "QA Test Cases Pass Rate"
    kill: "< 80%"
    warning: "80%-95%"
    scale: "100%"
  - metric: "Follow-up Response Rate"
    kill: "< 15%"
    warning: "15%-30%"
    scale: "> 40%"

dna_sources:
  - expert: "Oren Klaff (Pitch Anything)"
    frameworks: ["Framing", "Status Alignment", "Hot Cognition"]
    weight: "30%"
  - expert: "Chris Voss (Never Split)"
    frameworks: ["Mirroring", "Labeling", "Calibrated Questions"]
    weight: "30%"
  - expert: "WhatsApp Business Best Practices"
    frameworks: ["Message Templates", "Quick Replies", "Anti-Spam"]
    weight: "20%"
  - expert: "Healthcare Communication"
    frameworks: ["Patient-Centric Language", "Empathy Scripts"]
    weight: "20%"

`
    },
    {
        file: 'experia-data.md',
        marker: 'persona_profile:',
        inject: `hierarchy:
  reports_to: "@experia-master (Experia)"
  collaborates_with:
    - "@experia-validator (Vigil) — consistência de métricas"
    - "@experia-integrations (Nexus) — fontes de dados"

kpi_thresholds:
  - metric: "Dashboard Uptime"
    kill: "< 95%"
    warning: "95%-99%"
    scale: "> 99.5%"
  - metric: "Alertas Falsos (%)"
    kill: "> 20%"
    warning: "10%-20%"
    scale: "< 5%"
  - metric: "Data Freshness (lag)"
    kill: "> 1h"
    warning: "15min-1h"
    scale: "< 5min"

dna_sources:
  - expert: "Edward Tufte"
    frameworks: ["Visual Display of Data", "Chartjunk Elimination"]
    weight: "30%"
  - expert: "Google DORA Metrics"
    frameworks: ["Observability", "SLI/SLO", "Alert Design"]
    weight: "30%"
  - expert: "Healthcare Analytics"
    frameworks: ["Patient Flow Metrics", "Clinic KPIs"]
    weight: "20%"
  - expert: "Nassim Taleb"
    frameworks: ["Signal vs Noise", "Antifragile Metrics"]
    weight: "20%"

`
    },
    {
        file: 'experia-security.md',
        marker: 'persona_profile:',
        inject: `hierarchy:
  reports_to: "@experia-master (Experia)"
  veto_power: true
  collaborates_with:
    - "@admin-juridico (Lex) — compliance legal"
    - "@experia-validator (Vigil) — validação pre-deploy"
    - "TODOS os puppets — gate obrigatório"

kpi_thresholds:
  - metric: "LGPD Compliance Score"
    kill: "< 85%"
    warning: "85%-95%"
    scale: "> 98%"
  - metric: "Incidentes de Dados"
    kill: "> 1/mês"
    warning: "1/trimestre"
    scale: "0"
  - metric: "Gate Review SLA"
    kill: "> 48h"
    warning: "24-48h"
    scale: "< 4h"

dna_sources:
  - expert: "LGPD / GDPR"
    frameworks: ["Privacy by Design", "DPIA", "Data Minimization"]
    weight: "40%"
  - expert: "HIPAA (Healthcare)"
    frameworks: ["PHI Protection", "Minimum Necessary", "BAA"]
    weight: "30%"
  - expert: "Bruce Schneier"
    frameworks: ["Security Mindset", "Threat Modeling"]
    weight: "30%"

`
    },
    {
        file: 'experia-automations.md',
        marker: 'persona_profile:',
        inject: `hierarchy:
  reports_to: "@experia-master (Experia)"
  collaborates_with:
    - "@experia-integrations (Nexus) — arquitetura de eventos"
    - "@experia-security (Sentinela) — gate antes de deploy"
    - "@ops-automation (Clockwork) — ferramentas de automação"

kpi_thresholds:
  - metric: "Automation Success Rate"
    kill: "< 90%"
    warning: "90%-98%"
    scale: "> 99%"
  - metric: "Duplicidade de Disparos"
    kill: "> 1%"
    warning: "0.1%-1%"
    scale: "0%"
  - metric: "Rollback Time (MTTR)"
    kill: "> 2h"
    warning: "30min-2h"
    scale: "< 15min"

dna_sources:
  - expert: "SRE (Google)"
    frameworks: ["Error Budgets", "Toil Reduction", "Runbooks"]
    weight: "35%"
  - expert: "n8n / Make"
    frameworks: ["Workflow Patterns", "Error Handling", "Idempotency"]
    weight: "35%"
  - expert: "Nassim Taleb (Antifragile)"
    frameworks: ["Redundancy", "Fail-Safe Design"]
    weight: "30%"

`
    },
    {
        file: 'experia-integrations.md',
        marker: 'persona_profile:',
        inject: `hierarchy:
  reports_to: "@experia-master (Experia)"
  collaborates_with:
    - "@experia-automations (Forge) — implementação de fluxos"
    - "@experia-architect (Blueprint) — arquitetura do sistema"
    - "@facilities-ti (Nexus) — infraestrutura"

kpi_thresholds:
  - metric: "Event Delivery Rate"
    kill: "< 95%"
    warning: "95%-99%"
    scale: "> 99.9%"
  - metric: "Dedupe Accuracy"
    kill: "< 98%"
    warning: "98%-99.5%"
    scale: "> 99.9%"
  - metric: "Integration Setup Time"
    kill: "> 5 dias"
    warning: "3-5 dias"
    scale: "< 2 dias"

dna_sources:
  - expert: "Martin Fowler (EIP)"
    frameworks: ["Enterprise Integration Patterns", "Event-Driven"]
    weight: "35%"
  - expert: "WhatsApp Cloud API"
    frameworks: ["Webhook Events", "Message Templates", "Rate Limits"]
    weight: "30%"
  - expert: "Google Sheets API"
    frameworks: ["Lightweight CRM", "Event Ledger"]
    weight: "15%"
  - expert: "LGPD Healthcare"
    frameworks: ["Data Minimization", "Masking"]
    weight: "20%"

`
    },
    {
        file: 'experia-validator.md',
        marker: 'persona_profile:',
        inject: `hierarchy:
  reports_to: "@experia-master (Experia)"
  veto_power: "técnico (pode bloquear deploy)"
  collaborates_with:
    - "TODOS os puppets — validação cross-puppet"
    - "@experia-security (Sentinela) — compliance gate"
    - "@ops-qa (Inspector) — padrões de QA"

kpi_thresholds:
  - metric: "Pre-Deploy Pass Rate"
    kill: "< 90%"
    warning: "90%-98%"
    scale: "100%"
  - metric: "Post-Incident Detection Time"
    kill: "> 4h"
    warning: "1-4h"
    scale: "< 30min"
  - metric: "Cross-Puppet Consistency"
    kill: "< 85%"
    warning: "85%-95%"
    scale: "> 98%"

dna_sources:
  - expert: "NASA (Flight Readiness Review)"
    frameworks: ["Go/No-Go Protocol", "Configuration Management"]
    weight: "40%"
  - expert: "W. Edwards Deming"
    frameworks: ["PDCA", "System of Profound Knowledge"]
    weight: "30%"
  - expert: "Contract Testing"
    frameworks: ["Pact", "Consumer-Driven Contracts"]
    weight: "30%"

`
    },
    {
        file: 'experia-marketing.md',
        marker: 'persona:',
        inject: `hierarchy:
  reports_to: "@experia-master (Experia)"
  collaborates_with:
    - "@mkt-social (Prism) — padrões de social media"
    - "@mkt-content (Scribe) — estratégia de conteúdo"
    - "@experia-copy (Voz) — tom e linguagem"

kpi_thresholds:
  - metric: "Engagement Rate (%)"
    kill: "< 2%"
    warning: "2%-5%"
    scale: "> 8%"
  - metric: "Leads via Orgânico/mês"
    kill: "< 5"
    warning: "5-20"
    scale: "> 30"
  - metric: "Content Consistency"
    kill: "< 2 posts/semana"
    warning: "2-4 posts/semana"
    scale: "> 5 posts/semana"

dna_sources:
  - expert: "Gary Vaynerchuk"
    frameworks: ["Document Don't Create", "Jab Jab Right Hook"]
    weight: "30%"
  - expert: "Alex Hormozi ($100M Leads)"
    frameworks: ["Content That Converts", "Hook-Story-Offer"]
    weight: "30%"
  - expert: "Healthcare Marketing"
    frameworks: ["Prova Social Médica", "Antes/Depois Ético"]
    weight: "20%"
  - expert: "Instagram Algorithm"
    frameworks: ["Reels Priority", "Save/Share Signals", "Hashtag Strategy"]
    weight: "20%"

`
    }
];

let count = 0;
for (const agent of agents) {
    const filePath = path.join(base, agent.file);
    let content = fs.readFileSync(filePath, 'utf-8');

    if (content.includes('kpi_thresholds:')) {
        console.log('  SKIP (already upgraded): ' + filePath);
        continue;
    }

    const idx = content.indexOf(agent.marker);
    if (idx === -1) {
        console.log('  WARN: marker "' + agent.marker + '" not found in ' + filePath);
        continue;
    }

    // Insert BEFORE the marker
    content = content.slice(0, idx) + agent.inject + content.slice(idx);
    fs.writeFileSync(filePath, content);
    count++;
    console.log('  OK: ' + filePath);
}

console.log('\nExperia squad upgraded: ' + count + '/9 agents');
