# KAIROS — SELF CONTEXT (Consciência Viva)

> **Última atualização:** 2026-03-26T01:10:00-03:00
> **Atualizado por:** NOESIS (sessão fe078e98 — Flow Case Pipeline v2 + Rules v3.0)
> **Sessão:** fe078e98-0e64-40f2-824b-8e002e70eee7

---

## Identidade

- **Sistema:** KAIROS OS v3.1 (fork AIOX v5.0.0 by SynkraAI)
- **Operador:** Gabriel Ferreira — Arquiteto-Comunicador, Voice of the Dragonborn
- **Empresa:** Experia Solutions — Governança Digital Autônoma para comércio
- **Base:** `C:\Users\GABS\Documents\My KAIROS`
- **Core Engine:** AIOX v5.0.0 (fork SynkraAI/aiox-core)
- **GitHub Principal:** [aios-core](https://github.com/Experiasolutions/aios-core)
- **GitHub Clientes:** [experiaghostwarrior](https://github.com/Experiaghostwarrior) (bots Railway)

## Estado do Sistema

### AIOX Core — ✅ INSTALADO E INTACTO
- **Versão:** 2.1.0
- **12 agentes:** aiox-master, analyst, architect, data-engineer, dev, devops, pm, po, qa, sm, squad-creator, ux-design-expert
- **204 tasks**, 14 workflows, 5 checklists, 59 development scripts
- **Agent-First Protocol:** ✅ Internalizado em KAIROS.md + aiox-master.md

### MCP Server v3.0 — ✅ OPERACIONAL
- **23 tools** (10 AIOS + 13 KAIROS) — key: `aiox-kairos`
- **Self-test:** 19/19 passaram
- **Arquivo:** `scripts/mcp-server.js`
- **Antigravity config:** `~/.gemini/antigravity/mcp_config.json`
- **MCP servers Antigravity:** aiox-kairos, context7, sequential-thinking, github, huggingface, brave-search
- **Cobertura:** squads, agents (squad + framework), skills, events, RPs, docs, health, workflows, tasks, clients, context, synapse, engine

### GOD KAIROS — ✅ CONFIGURADO (NOVO 25/03)
- **Launcher:** `god-kairos/Launch-GodKairos.ps1` (6 agentes, 3 CLIs suportados)
- **API Pool:** `god-kairos/api-keys.yaml` — 5 Gemini + 2 Groq + Opus
- **Tools Map:** `god-kairos/agent-tools.yaml` — tools por agente + NEXUS definido
- **Token Routing:** Complexidade 1-2 → Groq | 3-4 → Gemini | 5 → Opus

### KAIROS ORCHESTRATOR / HYDRA — 4 HEADS (Cross-Sessão)
- **HEAD 1: N8N + POSTGRES** — Workflow automation, state mgmt (Deploy pendente VPS)
- **HEAD 2: OPENCLAW SERVER** — Personal AI com 15 Railway Skills (Deploy pendente)
- **HEAD 3: SKY PYTHON BACKEND** — 55+ tools, Squad runner (crewAI), Telegram bot (✅ Ativo no Railway)
- **HEAD 4: EVOLUTION API** — WhatsApp gateway (✅ Ativo, instância hortifruti-elaine: open)

### Composio — ✅ VALIDADO (25/03)
- **Backend:** v0.11.3 (kairos-orchestrator venv)
- **Core:** v0.7.21, Client: v1.28.0

### API Keys — ✅ Todas Configuradas
| API                        | Status                          |
| -------------------------- | ------------------------------- |
| GEMINI API KEYS (5 keys)   | ✅ Pool round-robin em api-keys.yaml |
| GROQ API KEYS (2 keys)     | ✅ Fallback em api-keys.yaml    |
| TELEGRAM_BOT_TOKEN (SKY)   | ✅ 8636246952                    |
| SUPABASE_URL + SERVICE_KEY | ✅                              |
| EVOLUTION_GLOBAL_APIKEY    | ✅ 34e7614b...                  |

### AIOS → AIOX Cleanup — ✅ COMPLETO (25/03)
- `.aios-core/` → `.aios-core-deprecated/` (conteúdo exclusivo migrado)
- MCP config key: `aios-kairos` → `aiox-kairos`
- Squads corrigidos: agents movidos para `agents/` subdir
- Zero referências residuais a `.aios-core`

### Red Hat AI Stack — ✅ 7 TRIALS ATIVADOS (25/03)
- OpenShift + Dev Spaces (30d), OpenShift AI (30d), Virtualization (60d)
- Red Hat AI Enterprise, AI Inference Server, RHEL, RHEL AI
- MCP servers Red Hat: OpenShift AI MCP, Lightspeed MCP, Ansible MCP

### Hardware Local
- CPU: Intel Celeron E3300 @ 2.50GHz (2 cores) | RAM: 6GB
- GPU: NVIDIA GeForce 7300 SE (256MB, 2006, SEM CUDA)
- **Cloud obrigatório** — HuggingFace ZeroGPU (H200 70GB) é prioridade #1

### SKYDRA/SKYROS Blueprint — ✅ CRIADO (25/03)
- HEAD 5: AI Inference Server (vLLM, modelos open-source)
- HEAD 6: OpenShift AI (MLOps + importar MCP AIOX no AI hub)
- HEAD 7: InstructLab (fine-tune PT-BR)
- Estratégia: cloud free-tier + Red Hat para persistência

## Clientes

| Cliente             | Status                           | Próximo                                         |
| ------------------- | -------------------------------- | ----------------------------------------------- |
| Experia (próprio)   | 🔴 Parado — precisa PRD do zero  | PRD + Design System + LP                        |
| Hortifruti (Elaine) | 🟡 Bot deployado, webhook OK     | Calibrar persona, apresentar para Elaine        |
| Porto Alemão        | 🟡 Instância close               | QR Code + reconexão (Rogério)                   |
| Master Pumps        | 🟡 Pipeline                      | Trojan Horse via RH                             |
| KAIROS Bot Template | 🟢 Template criado               | Replicar para ~10 comércios                     |

## Decisões Tomadas

| Data       | Decisão                                                           |
| ---------- | ----------------------------------------------------------------- |
| 2026-03-26 | SKYDRA/SKYROS blueprint: 3 novas heads (AI Inference, MLOps, InstructLab) |
| 2026-03-26 | Estratégia híbrida: HuggingFace ZeroGPU + Red Hat cloud           |
| 2026-03-26 | **RULE FIVE — Hybrid Flow Case Pipeline** injetada em rules.md v3.0 |
| 2026-03-26 | PM templates criados (pm1-reasoning, pm2-execution, pm3-evaluation) |
| 2026-03-26 | Boot script corrigido: .aios-core→.aiox-core + engine/noesis fallback |
| 2026-03-25 | AIOS → AIOX consolidation completa (zero contaminação)            |
| 2026-03-25 | 7 trials Red Hat ativados + 3 MCP servers oficiais mapeados       |
| 2026-03-25 | MCP Server v3.0 com 23 tools — cobertura total do ecossistema     |
| 2026-03-25 | Deep Scan: 3000+ arquivos mapeados, 204 tasks, 14 workflows      |
| 2026-03-25 | GOD KAIROS launcher configurado (6 agentes, 3 CLIs)               |
| 2026-03-24 | Agent-First Protocol internalizado                                |
| 2026-03-24 | Bot Hortifruti deployado no Railway                               |

## Problemas Abertos

1. **Identity Anchor:** boot agora resolve via `engine/noesis/` com fallback `.aiox-core/noesis/` ✅ CORRIGIDO
2. **Council Score:** 5.53/10 com 89 gaps (reduzido de 91 → PM templates criados)
3. **Jarvis:** DEGRADED — learning model não inicializado
4. **Porto Alemão desconectado:** Instância close, precisa novo QR scan
5. **85% scripts JS DORMANT** — nunca executados em produção
