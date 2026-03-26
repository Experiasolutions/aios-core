# KAIROS — STATUS (Fila de Trabalho)

> **Última atualização:** 2026-03-25T19:57:00-03:00

---

## 🔴 BLOQUEADO

- Porto Alemão: instância `close` — precisa novo QR scan do Rogério

---

## 🟡 EM PROGRESSO

### MCP Server v3.0 (Local JS) — ✅ OPERACIONAL
- [x] v1.0→v2.0→v3.0: 23 tools, 19/19 tests
- [x] Antigravity reiniciado e operacional

### MCP Servers Antigravity — ✅ CONFIGURADOS (6 servers)
- [x] aios-kairos (23 tools KAIROS)
- [x] context7 (docs live em prompts)
- [x] sequential-thinking (raciocínio step-by-step)
- [x] github (ops de repositório)
- [x] huggingface (modelos AI, datasets)
- [x] brave-search (web search real-time)
- [ ] GitHub token pendente no config (funciona sem token para repos publicos)
- [ ] Brave API key pendente (funcional sem API key via web fallback)

### CLIs — ✅ INSTALADOS
- [x] Railway CLI (`npm i -g @railway/cli`)
- [x] GitHub CLI (`gh` v2.67.0 via MSI)
- [x] Supabase CLI (`supabase` v2.78.1 via Scoop)

### Tokens Configurados (.env)
- [x] RAILWAY_TOKEN=6e288ae4-...
- [x] HF_TOKEN=hf_inriELdg...
- [x] GEMINI_API_KEY + 5 GOOGLE_API_KEYS
- [x] GROQ_API_KEY (2 keys)
- [x] COMPOSIO_API_KEY

### Agent-First Internalization — ✅ COMPLETO
- [x] Regra em `aiox-master.md` + `KAIROS.md`
- [x] Workflows `/KAIROS`, `/boot`, `/context` atualizados (MCP-FIRST, HAT-SWITCHING, HYDRA-AWARE, FULL-ECOSYSTEM)
- [x] boot.md FASE 5.5: Subsistemas sempre ativos
- [x] boot.md FASE 5.6: Ruflo ecosystem documentado

### Limpeza AIOS → AIOX — ✅ COMPLETO
- [x] `.aios-core/` → `.aios-core-deprecated/` (conteúdo exclusivo migrado)
- [x] Docs AIOS_* renomeados para AIOX_*
- [x] MCP config: `aios-kairos` → `aiox-kairos`
- [x] Squads c-level/sales/jarvis corrigidos (agents em `agents/` subdir)
- [x] Squad `_example` removido
- [x] Task `load-reasoning-package.md` criada no AIOX
- [x] Zero referências residuais a `.aios-core` no codebase

### 🔴 RED HAT AI STACK (Trials ATIVADOS ✅)

| Produto | Função | Status |
|---|---|---|
| OpenShift + Dev Spaces | Kubernetes + IDE cloud | ✅ Trial 30d |
| OpenShift AI | MLOps (treinar/servir modelos) | ✅ Trial 30d |
| OpenShift Virtualization | VMs RHEL persistentes | ✅ Trial 60d |
| Red Hat AI Enterprise | Bundle unificado + MCP nativo | ✅ Further setup |
| AI Inference Server | vLLM + Neural Magic | ✅ Further steps |
| RHEL | Enterprise Linux | ✅ Further steps |
| RHEL AI | Linux + InstructLab + vLLM | ✅ Further steps |

**MCP servers Red Hat:** OpenShift AI MCP, Lightspeed MCP, Ansible MCP (tech preview)

### 💻 HARDWARE LOCAL

| Spec | Valor |
|---|---|
| CPU | Intel Celeron E3300 @ 2.50GHz (2 cores) |
| RAM | 6 GB |
| GPU | NVIDIA GeForce 7300 SE (256MB, 2006, SEM CUDA) |
| Veredicto | **0% viável para AI local — cloud obrigatório** |

### ☁️ CLOUD GPU FREE-TIER (ranking para SKYDRA)

| Plataforma | GPU | VRAM | Limite | Prioridade |
|---|---|---|---|---|
| **HuggingFace ZeroGPU** | H200 | **70GB** | Quota diária | 🥇 1º |
| **Lightning AI** | A100/H100 | 40-80GB | 15 créditos/mês | 🥈 2º |
| **Kaggle** | T4/P100 | 16GB | 30h/semana | 🥉 3º |
| **Google Colab** | T4 | 16GB | ~6h sessão | 4º |
| **Red Hat OpenShift** | CPU only | N/A | 30-60d trial | Persistência |

**Estratégia:** HuggingFace ZeroGPU para inference + Red Hat para persistência/orquestração

---

## 🟠 PROJETO HYDRA — 4 HEADS (Cross-Sessão 72aba841)

### Arquitetura
| Head | Componente | Status |
|---|---|---|
| HEAD 1 | N8N + PostgreSQL | ⏳ Código pronto, deploy pendente |
| HEAD 2 | OpenClaw Server (15 Railway Skills) | ⏳ Código pronto, deploy pendente |
| HEAD 3 | SKY Python Backend (55+ tools, CrewAI, Composio) | ✅ Deploy Railway ativo |
| HEAD 4 | Evolution API (WhatsApp gateway) | 🟡 Parcial (hortifruti OK, porto-alemao close) |

### OpenClaw Railway Skills (15 Total)
- **Tier 1 Deployment (4):** deploy_service, update_config, restart, remove
- **Tier 2 Observability (5):** status, logs, metrics, http_metrics, diagnose
- **Tier 3 Storage (3):** volumes, buckets, variables
- **Tier 4 Orchestration (3):** search_env, deploy_template, ref_variable
- **Tier 5 Code (1):** create/update functions

### MCP Server Python/FastAPI (18 Tools) — `kairos-orchestrator/mcp_server/`
- **N8N (4):** create/list/execute/logs workflows
- **Database (3):** run_sql, backup, restore
- **Client Mgmt (4):** create/list/metrics/scale client environments
- **Infra (3):** status, metrics, restart_component
- **Integrations (2):** create_webhook, list_integrations

### HYDRA Checklist de Validação
**FASE 1: Railway Setup**
- [ ] RAILWAY_API_TOKEN gerado
- [ ] Railway Bridge deployed (port 3002)
- [ ] GraphQL queries testadas

**FASE 2: Experia VPS**
- [ ] Docker Compose stack running (MCP+PG+n8n+Evolution)
- [ ] PostgreSQL initialized (init_db.sql)
- [ ] N8N accessible (port 5678)
- [ ] MCP Server Python health check OK (port 3001)

**FASE 3: Railway Deployments (4 Heads)**
- [ ] HEAD 1: N8N + Postgres
- [ ] HEAD 2: OpenClaw Server
- [x] HEAD 3: SKY Python Backend
- [ ] HEAD 4: Evolution API (full)

**FASE 4: Integrations**
- [ ] OpenClaw Skills loaded (15)
- [ ] MCP Python Server connected
- [ ] N8N workflows executable
- [ ] Client environments creatable
- [ ] WhatsApp connected (Evolution)

**FASE 5: Validation**
- [ ] End-to-end test
- [ ] All 4 heads communicating
- [ ] Autonomous operations working

### Código Pronto (não deployado)
| Arquivo | Função |
|---|---|
| `kairos-orchestrator/mcp_server/mcp_server.py` | MCP Server FastAPI (18 tools) |
| `kairos-orchestrator/bridges/railway_bridge.py` | 15 Railway Skills (httpx) |
| `kairos-orchestrator/bridges/railway_gql.py` | GraphQL Client |
| `kairos-orchestrator/mcp_server/init_db.sql` | Schema 6 tabelas |
| `kairos-orchestrator/mcp_server/Dockerfile` | Container MCP |
| `kairos-orchestrator/mcp_server/docker-compose.yml` | Stack completa |

### Credenciais (status)
| Credencial | Status |
|---|---|
| RAILWAY_API_TOKEN | ❌ PENDENTE |
| MCP_API_KEY | ⏳ Definir |
| N8N_API_KEY | ❌ PENDENTE |
| COMPOSIO_API_KEY | ✅ ak_6pj-rP1ExkVjlQu91M3n |

---

## 🟡 SUBSISTEMAS DORMANT (Prioridade de Ativação)

> Da sessão 72aba841 — 85% dos scripts JS estão DORMANT

| # | Subsistema | Arquivo | Impacto |
|---|---|---|---|
| 1 | RAG Engine | `scripts/rag-engine.js` | 🔥🔥🔥 Auto-contexto |
| 2 | Scheduler | `scripts/scheduler.js` | 🔥🔥🔥 Automação 24/7 |
| 3 | IA Council Engine | `scripts/evolution/ia-council-engine.js` | 🔥🔥🔥 8 mentes auditando |
| 4 | Noesis Pipeline | `scripts/evolution/noesis-pipeline.js` | 🔥🔥🔥 Loop cognitivo |
| 5 | Dashboard JARVIS | `scripts/dashboard.js` | 🔥🔥 Visualização |

### Anomalias Conhecidas
- 85% dos scripts JS DORMANT — nunca executados em produção
- Duplicação conceitual: scripts/ JS vs kairos-orchestrator/ Python
- Engine/ night-reports stale (fev/2026)
- .aiox-core/workflow-intelligence/ nunca ativado
- tools/ ~21K arquivos, utilização efetiva < 5%

---

## ✅ CONCLUÍDO RECENTEMENTE

| Data | O que |
|---|---|
| 2026-03-26 | **Engine Triage v4 (10 fases)** injetado em rules.md v4.0 |
| 2026-03-26 | Bob Orchestrator absorvido (Surface Checker, Quality Gate, Session State) |
| 2026-03-26 | Agent Flows integrados (RULE SEVEN: 11 agent-flow docs) |
| 2026-03-26 | Asset Index completo (RULE EIGHT: 13 workflows + docs estratégicos) |
| 2026-03-26 | Mineração docs/: HYDRA-ROADMAP, MIND-CLONING-FRAMEWORK, CAPABILITIES_CATALOG |
| 2026-03-26 | PM templates criados (pm1-reasoning, pm2-execution, pm3-evaluation) |
| 2026-03-26 | Boot script corrigido (.aios-core→.aiox-core, engine/noesis fallback) |
| 2026-03-26 | SKYDRA/SKYROS blueprint: estratégia híbrida HuggingFace + Red Hat |
| 2026-03-25 | MCP Server v3.0: 23 tools, 19/19 tests |
| 2026-03-25 | Deep Scan: 3000+ arquivos mapeados |
| 2026-03-25 | GOD KAIROS launcher + API pool + tools map |
| 2026-03-25 | SELF_CONTEXT + STATUS atualizados com cross-sessão |
| 2026-03-24 | Bot Hortifruti testes primordiais OK |
| 2026-03-24 | Agent-First Protocol internalizado |
| 2026-03-15 | Grand Unification 3 fases completas |

---

## 📊 MÉTRICAS DO SISTEMA

| Métrica | Valor |
|---|---|
| MCP Tools (JS local) | **23** |
| MCP Tools (Python/HYDRA) | **18** (pendente deploy) |
| OpenClaw Skills | **15** (pendente deploy) |
| Tasks AIOX | 204 |
| Workflows AIOX | 14 |
| Agentes AIOX | 12 |
| Squads | 10 |
| RPs | 40+ |
| Tool Integrations | 23 |
| API Gemini Keys | 5 |
| API Groq Keys | 2 |
