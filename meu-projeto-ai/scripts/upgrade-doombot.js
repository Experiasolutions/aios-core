// Upgrade Doombot squad — inject Finch sections (hierarchy, kpi_thresholds, skill_chains, dna_sources)
const fs = require('fs');
const path = require('path');

const base = path.join('squads', 'doombot', 'agents');

const agents = [
    {
        file: 'doom-master.md',
        marker: 'persona_profile:',
        inject: `hierarchy:
  reports_to: "@aios-master (Orion)"
  manages:
    - "@doom-strategist (ARIA) — Diagnóstico Estratégico"
    - "@doom-mentor (DOUG) — Mentoria & War Room"
    - "@doom-persuader (RAYA) — Persuasão & OPD++"
    - "@doom-copywriter (UGLY COPY) — Copywriting Brutal"
    - "@doom-storyads (D'Marco) — StoryAds & Creative Genome"
    - "@doom-offers (Doug Offer) — Ofertas & Arena"
    - "@doom-tension (Doug.T) — Tensão & Gatilhos"
    - "@doom-revenue (Revenue Intel) — CCR++ & Auto-P&L"
    - "@doom-security (Defesa Antifrágil) — Red Team & OPA"
  collaborates_with:
    - "@vendas-head (Titan) — Pipeline de receita"
    - "@mkt-traffic (Ignite) — Tráfego pago"

kpi_thresholds:
  - metric: "T1C (Tempo até 1ª Cobrança)"
    kill: "> 30 dias"
    warning: "14-30 dias"
    scale: "< 7 dias"
  - metric: "Taxa de Aceite da 1ª Proposta"
    kill: "< 20%"
    warning: "20%-40%"
    scale: "> 50%"
  - metric: "Margem por Operação"
    kill: "< 30%"
    warning: "30%-50%"
    scale: "> 60%"
  - metric: "Quality Gate Score"
    kill: "< 7/10"
    warning: "7-8/10"
    scale: "> 9/10"
  - metric: "Profit Firewall Triggers"
    kill: "> 5/semana"
    warning: "2-5/semana"
    scale: "0"

skill_chains:
  revenue_mission:
    trigger: "Nova missão de receita"
    workflow:
      - "@doom-strategist *diagnose → mapa de calor"
      - "@doom-offers *build-offer → NMI 2.0"
      - "@doom-copywriter *headlines → Arena"
      - "@doom-tension *tension → gatilhos"
      - "@doom-persuader *persuasion-script → OPD++"
      - "@doom-security *opa-check → compliance"
      - "@doom-master *quality-gate → score ≥8"
      - "@doom-revenue *analyze → tracking"
  daily_replay:
    trigger: "Diário (manhã)"
    workflow:
      - "@doom-revenue *replay → cenário D+1"
      - "@doom-master *profit-check → margem ok?"
      - "@doom-copywriter *ad-eval → kill/scale"
      - "@doom-offers *arena → tournament"

dna_sources:
  - expert: "Thiago Finch (DooMMasteRBot V5)"
    frameworks: ["Revenue OS", "Cérebro de Cobrança", "Juiz de Caixa", "Profit Firewall"]
    weight: "35%"
  - expert: "Alex Hormozi ($100M Offers)"
    frameworks: ["Value Equation", "Grand Slam Offers", "Lead Magnets"]
    weight: "25%"
  - expert: "Russell Brunson"
    frameworks: ["Value Ladder", "Hook-Story-Offer", "Funnels"]
    weight: "15%"
  - expert: "Daniel Kahneman"
    frameworks: ["Prospect Theory", "Loss Aversion", "System 1/2"]
    weight: "15%"
  - expert: "Nassim Taleb"
    frameworks: ["Antifragile", "Skin in the Game", "Barbell Strategy"]
    weight: "10%"

`
    },
    {
        file: 'doom-strategist.md',
        marker: 'persona_profile:',
        inject: `hierarchy:
  reports_to: "@doom-master (DoomMaster)"
  collaborates_with:
    - "@doom-revenue (Revenue Intel) — dados para diagnóstico"
    - "@doom-offers (Doug Offer) — viabilidade de ofertas"

kpi_thresholds:
  - metric: "Diagnósticos com ROI confirmado"
    kill: "< 30%"
    warning: "30%-50%"
    scale: "> 65%"
  - metric: "Time to Actionable Insight"
    kill: "> 48h"
    warning: "24-48h"
    scale: "< 12h"

dna_sources:
  - expert: "Michael Porter"
    frameworks: ["5 Forces", "Value Chain", "Competitive Strategy"]
    weight: "30%"
  - expert: "Clayton Christensen"
    frameworks: ["Jobs to Be Done", "Disruptive Innovation"]
    weight: "30%"
  - expert: "Hamilton Helmer (7 Powers)"
    frameworks: ["Network Economies", "Counter-Positioning", "Switching Costs"]
    weight: "20%"
  - expert: "Thiago Finch"
    frameworks: ["Mapa de Calor de Valor", "CCR++", "NMI Assessment"]
    weight: "20%"

`
    },
    {
        file: 'doom-mentor.md',
        marker: 'persona_profile:',
        inject: `hierarchy:
  reports_to: "@doom-master (DoomMaster)"
  collaborates_with:
    - "@doom-persuader (RAYA) — scripts de guerra"
    - "@doom-tension (Doug.T) — pressão calibrada"
    - "@vendas-closer (Apex) — fechamento"

kpi_thresholds:
  - metric: "Action Plans Executed"
    kill: "< 50%"
    warning: "50%-75%"
    scale: "> 90%"
  - metric: "War Room Conversion"
    kill: "< 10%"
    warning: "10%-25%"
    scale: "> 35%"
  - metric: "LTV Lift (%)"
    kill: "< 5%"
    warning: "5%-15%"
    scale: "> 25%"

dna_sources:
  - expert: "Jocko Willink (Extreme Ownership)"
    frameworks: ["Decentralized Command", "Prioritize & Execute"]
    weight: "35%"
  - expert: "David Goggins"
    frameworks: ["40% Rule", "Accountability Mirror"]
    weight: "25%"
  - expert: "Andy Grove (High Output Mgmt)"
    frameworks: ["OKRs", "1:1s", "Task-Relevant Maturity"]
    weight: "20%"
  - expert: "Thiago Finch"
    frameworks: ["Cockpit de Caixa", "War Room WhatsApp", "Cash Pulses"]
    weight: "20%"

`
    },
    {
        file: 'doom-persuader.md',
        marker: 'persona_profile:',
        inject: `hierarchy:
  reports_to: "@doom-master (DoomMaster)"
  collaborates_with:
    - "@doom-copywriter (UGLY COPY) — copy persuasivo"
    - "@doom-tension (Doug.T) — gatilhos neurais"
    - "@vendas-closer (Apex) — negociação"

kpi_thresholds:
  - metric: "Objection Resolution Rate"
    kill: "< 40%"
    warning: "40%-60%"
    scale: "> 75%"
  - metric: "OPD++ Conversion Lift"
    kill: "< 5%"
    warning: "5%-15%"
    scale: "> 20%"
  - metric: "Call Killer Assist Rate"
    kill: "< 30%"
    warning: "30%-50%"
    scale: "> 65%"

dna_sources:
  - expert: "Robert Cialdini"
    frameworks: ["6 Principles of Influence", "Pre-Suasion"]
    weight: "30%"
  - expert: "Chris Voss (Never Split)"
    frameworks: ["Tactical Empathy", "Mirroring", "Calibrated Questions"]
    weight: "30%"
  - expert: "Oren Klaff (Pitch Anything)"
    frameworks: ["Framing", "Status Alignment", "Crocodile Brain"]
    weight: "20%"
  - expert: "Thiago Finch"
    frameworks: ["OPD++", "Persona Mirror", "Call Killer 2.0"]
    weight: "20%"

`
    },
    {
        file: 'doom-copywriter.md',
        marker: 'persona_profile:',
        inject: `hierarchy:
  reports_to: "@doom-master (DoomMaster)"
  collaborates_with:
    - "@doom-storyads (D'Marco) — narrativas"
    - "@doom-tension (Doug.T) — tensão em copy"
    - "@mkt-content (Scribe) — estratégia de conteúdo"

kpi_thresholds:
  - metric: "CTR dos Criativos"
    kill: "< 1%"
    warning: "1%-2.5%"
    scale: "> 4%"
  - metric: "Copy Arena Win Rate"
    kill: "< 30%"
    warning: "30%-50%"
    scale: "> 65%"
  - metric: "Linter Score"
    kill: "< 7/10"
    warning: "7-8/10"
    scale: "> 9/10"

dna_sources:
  - expert: "Gary Halbert"
    frameworks: ["A-Pile Letters", "Emotional Direct Response"]
    weight: "30%"
  - expert: "David Ogilvy"
    frameworks: ["Headline Formula", "Research-Driven Copy"]
    weight: "25%"
  - expert: "Eugene Schwartz (Breakthrough Advertising)"
    frameworks: ["Awareness Levels", "Mass Desire"]
    weight: "25%"
  - expert: "Thiago Finch"
    frameworks: ["Creative Brain/FCS", "Arena Headlines", "Ad-Evals 360"]
    weight: "20%"

`
    },
    {
        file: 'doom-storyads.md',
        marker: 'persona_profile:',
        inject: `hierarchy:
  reports_to: "@doom-master (DoomMaster)"
  collaborates_with:
    - "@doom-copywriter (UGLY COPY) — headlines e hooks"
    - "@doom-tension (Doug.T) — tensão narrativa"
    - "@mkt-social (Prism) — distribuição"

kpi_thresholds:
  - metric: "StoryAd Conversion Rate"
    kill: "< 1.5%"
    warning: "1.5%-3%"
    scale: "> 5%"
  - metric: "Watch-Through Rate (video)"
    kill: "< 25%"
    warning: "25%-50%"
    scale: "> 65%"
  - metric: "Creative Genome Survival"
    kill: "< 20% survive 24h"
    warning: "20%-40%"
    scale: "> 50%"

dna_sources:
  - expert: "Robert McKee (Story)"
    frameworks: ["Story Structure", "Controlling Idea", "Gap Theory"]
    weight: "30%"
  - expert: "Donald Miller (StoryBrand)"
    frameworks: ["SB7 Framework", "Hero's Journey Marketing"]
    weight: "25%"
  - expert: "Pixar Storytelling"
    frameworks: ["22 Rules", "Once Upon a Time", "Emotional Arc"]
    weight: "25%"
  - expert: "Thiago Finch"
    frameworks: ["Creative Genome", "C2PA Manifest", "VEO-ready"]
    weight: "20%"

`
    },
    {
        file: 'doom-offers.md',
        marker: 'persona_profile:',
        inject: `hierarchy:
  reports_to: "@doom-master (DoomMaster)"
  collaborates_with:
    - "@doom-strategist (ARIA) — viabilidade de nicho"
    - "@doom-revenue (Revenue Intel) — pricing data"
    - "@vendas-closer (Apex) — feedback de campo"

kpi_thresholds:
  - metric: "Offer Acceptance Rate"
    kill: "< 15%"
    warning: "15%-30%"
    scale: "> 40%"
  - metric: "NMI Draft Time"
    kill: "> 5 min"
    warning: "1-5 min"
    scale: "< 60s"
  - metric: "Arena Win Streak"
    kill: "0 wins em 5 rounds"
    warning: "1-2 wins"
    scale: "> 3 wins consecutivos"

dna_sources:
  - expert: "Alex Hormozi ($100M Offers)"
    frameworks: ["Grand Slam Offer", "Value Equation", "Guarantee Stack"]
    weight: "40%"
  - expert: "Russell Brunson"
    frameworks: ["Value Ladder", "Stack Slides", "Irresistible Offer"]
    weight: "25%"
  - expert: "Daniel Kahneman"
    frameworks: ["Prospect Theory", "Anchoring", "Loss Aversion"]
    weight: "15%"
  - expert: "Thiago Finch"
    frameworks: ["NMI 2.0", "Arena de Ofertas", "Tesouraria de Garantia"]
    weight: "20%"

`
    },
    {
        file: 'doom-tension.md',
        marker: 'persona_profile:',
        inject: `hierarchy:
  reports_to: "@doom-master (DoomMaster)"
  collaborates_with:
    - "@doom-copywriter (UGLY COPY) — tensão em copy"
    - "@doom-persuader (RAYA) — gatilhos em persuasão"
    - "@doom-storyads (D'Marco) — tensão narrativa"

kpi_thresholds:
  - metric: "Tension Lift (conversion delta)"
    kill: "< 5%"
    warning: "5%-15%"
    scale: "> 25%"
  - metric: "Compliance Pass Rate"
    kill: "< 90%"
    warning: "90%-98%"
    scale: "100%"

dna_sources:
  - expert: "Robert Cialdini"
    frameworks: ["Scarcity", "Social Proof", "Reciprocity"]
    weight: "35%"
  - expert: "Daniel Kahneman"
    frameworks: ["Loss Aversion", "Framing Effects", "Prospect Theory"]
    weight: "30%"
  - expert: "Thiago Finch"
    frameworks: ["Prova Primeiro 2.0", "Gradiente de Pressão", "CTA Ultimato"]
    weight: "20%"
  - expert: "Dan Ariely (Predictably Irrational)"
    frameworks: ["Decoy Effect", "Free Premium", "Relativity"]
    weight: "15%"

`
    },
    {
        file: 'doom-revenue.md',
        marker: 'persona_profile:',
        inject: `hierarchy:
  reports_to: "@doom-master (DoomMaster)"
  collaborates_with:
    - "@doom-strategist (ARIA) — diagnóstico + dados"
    - "@admin-financeiro (Vault) — P&L real"
    - "@experia-data (Radar) — padrões de métricas"

kpi_thresholds:
  - metric: "Report Accuracy"
    kill: "< 90%"
    warning: "90%-97%"
    scale: "> 99%"
  - metric: "Replay Lab ROI"
    kill: "< 1x"
    warning: "1-3x"
    scale: "> 5x"
  - metric: "Unit Economics Freshness"
    kill: "> 24h"
    warning: "4-24h"
    scale: "< 1h (near real-time)"

dna_sources:
  - expert: "Andrew Chen (Growth)"
    frameworks: ["Acquisition Loops", "Network Effects", "Engagement"]
    weight: "25%"
  - expert: "Unit Economics"
    frameworks: ["CAC/LTV", "Payback Period", "Cohort Analysis"]
    weight: "25%"
  - expert: "Judea Pearl (Causality)"
    frameworks: ["Causal Inference", "DAGs", "Counterfactuals"]
    weight: "25%"
  - expert: "Thiago Finch"
    frameworks: ["CCR++", "Auto-P&L", "Replay Lab", "RevenueKG"]
    weight: "25%"

`
    },
    {
        file: 'doom-security.md',
        marker: 'persona_profile:',
        inject: `hierarchy:
  reports_to: "@doom-master (DoomMaster)"
  veto_power: true
  collaborates_with:
    - "@experia-security (Sentinela) — padrões LGPD"
    - "@admin-juridico (Lex) — compliance legal"
    - "TODOS os agentes Doom — gate obrigatório"

kpi_thresholds:
  - metric: "Red Team Issues Found/Fixed"
    kill: "< 50% fixed"
    warning: "50%-80% fixed"
    scale: "> 95% fixed"
  - metric: "OPA Gate Pass Rate"
    kill: "< 85%"
    warning: "85%-95%"
    scale: "> 98%"
  - metric: "Privacy Budget Utilization"
    kill: "> 90% consumed"
    warning: "70%-90%"
    scale: "< 50%"

dna_sources:
  - expert: "Bruce Schneier (Security)"
    frameworks: ["Threat Modeling", "Security Mindset"]
    weight: "30%"
  - expert: "NIST Cybersecurity"
    frameworks: ["NIST Framework", "Zero Trust Architecture"]
    weight: "25%"
  - expert: "Nassim Taleb (Antifragile)"
    frameworks: ["Via Negativa", "Barbell Strategy", "Skin in the Game"]
    weight: "25%"
  - expert: "Thiago Finch"
    frameworks: ["Red Team Self-Play", "OPA Gates", "Privacy Budget", "C2PA"]
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
        console.log('  WARN: marker not found in ' + filePath);
        continue;
    }

    content = content.slice(0, idx) + agent.inject + content.slice(idx);
    fs.writeFileSync(filePath, content);
    count++;
    console.log('  OK: ' + filePath);
}

console.log('\nDoombot squad upgraded: ' + count + '/10 agents');
console.log('\n=== ALL SQUADS COMPLETE ===');
console.log('Vendas: 3  | Marketing: 5  | CS: 7');
console.log('OPS: 5     | Admin: 6      | Produto: 3');
console.log('Facilities: 5 | Experia: 9 | Doombot: 10');
console.log('TOTAL: 53 agents at Finch-quality');
