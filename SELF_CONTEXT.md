# KAIROS — SELF CONTEXT (Consciência Viva)

> **Última atualização:** 2026-03-14T11:45:00-03:00
> **Atualizado por:** God KairoX Consolidation
> **Sessão:** 72aba841-3bd2-4b3c-bb1f-39a69549fc9c

---

## Identidade

- **Sistema:** KAIROS OS v3.1 (God KairoX)
- **Operador:** Gabriel Ferreira — Arquiteto-Comunicador, Voice of the Dragonborn
- **Empresa:** Experia Solutions (IA para negócios locais)
- **Base:** `C:\Users\Gabriel\Documents\My KAIROS`
- **Core Engine:** AIOX v5.0.0 (fork SynkraAI/aiox-core)
- **GitHub:** [aios-core](https://github.com/Experiasolutions/aios-core) + [kairos-orchestrator](https://github.com/Experiasolutions/kairos-orchestrator)

## Estado do Sistema

### KAIROS SKY (Orquestrador Cloud) — ✅ OPERACIONAL
- **Deploy:** Railway 24/7 (Python 3.12)
- **Bot Telegram:** @sky_bot, NLP natural (sem /commands), 11 intents
- **OODA Loop:** Cognitive heartbeat a cada 60s com consciência de zonas OS
- **Scheduler:** Morning Brief (7am BRT), Night Reminder (22h BRT), task processor (30min)
- **Transcrição de Áudio:** Groq Whisper `whisper-large-v3-turbo`
- **Memory Bridge:** Telegram → Supabase knowledge_brain → Antigravity
- **OS Worker:** 7 blocos de tempo, proteção zona 🔵, detecção de violação
- **Persona:** JARVIS personalizado via Anamnese de Genialidade (35 perguntas, 18 padrões)
- **Codespace Worker:** Long-polling com claim atômico (`.devcontainer` configurado)

### Intents do Bot (NLP Zero-Latência)
`brief` `status` `quests` `bosses` `add_task` `process` `checkin` `leads` `bloco` `lembrar` `memoria` + conversa livre via LLM

### Supabase — ✅ Conectado
- **12 tabelas:** profile, quests_daily, bosses_finance, loot_shop, experia_agents, context_store, task_queue, api_keys, memory_log, leads, clients, knowledge_brain
- **Knowledge Brain:** Full-text search em português + Telegram memory bridge
- **Projeto:** apex-conductor (`ptpojwbdxgmvykwwzatl.supabase.co`)

### API Keys — ✅ Todas Configuradas
| API                        | Status                        |
| -------------------------- | ----------------------------- |
| GOOGLE_API_KEYS (4 Gemini) | ✅ Pool com rotação automática |
| GROQ_API_KEY               | ✅ Whisper + Llama fallback    |
| TELEGRAM_BOT_TOKEN         | ✅                             |
| SUPABASE_URL + SERVICE_KEY | ✅                             |

### Engine (migrado de .aios-core)
- `engine/opus-replicator/` — OPUS Replicant System v2, constitutional layer v3
- `engine/noesis/` — Observations, sessions, cognitive state
- `engine/memory/` — Quality baseline, golden examples, distillation dataset
- `engine/night-reports/` — Reports do Night Shift

### Clients
| Cliente             | Status                       | Próximo                     |
| ------------------- | ---------------------------- | --------------------------- |
| Hortifruti (Elaine) | MVP pronto, bot Safra        | Segunda-feira: Consumer MVP |
| Experia             | Landing page + design system | Dashboard web               |
| Master Pumps        | Pipeline Trojan Horse        | Token bot enviado           |

## Arquitetura

```
KAIROS OS v3.1 — God KairoX
├── kairos-orchestrator/     ← SKY Cloud (Python, Railway 24/7)
│   ├── tg_bot/              ← Bot Telegram NLP (11 intents)
│   ├── workers/             ← 8 workers (brief, night, task, os, codespace, etc)
│   ├── persona.py           ← JARVIS personalizado
│   ├── key_rotator.py       ← Pool multi-key com cooldown
│   └── supabase_client.py   ← 15 funções (profile, quests, bosses, memory, knowledge)
├── engine/                  ← Core Brain (opus, noesis, memory)
├── scripts/                 ← 76+ scripts (boot, council, night-shift, dashboard)
├── squads/                  ← 10 squads (experia, sales, c-level, jarvis, etc)
├── reasoning-packages/      ← 66+ RPs (strategic, core, tasks)
├── clients/                 ← 3 clients (hortifruti, experia, master-pumps)
├── data/                    ← Entity registry, AI Flow docs, megabrain
├── tools/                   ← 28+ repos (integrations, cookbooks)
├── docs/                    ← Bibles, manifestos, guias
├── .agent/workflows/        ← 14 workflows KAIROS
└── distillation-dataset/    ← 17 traces para fine-tuning LoRA
```

## Decisões Tomadas

| Data       | Decisão                                                       |
| ---------- | ------------------------------------------------------------- |
| 2026-03-10 | Criado KAIROS SKY + Supabase schema 12 tabelas                |
| 2026-03-11 | MVP Kit Hortifruti completo                                   |
| 2026-03-13 | Restauração 750+ arquivos, engine/ criado, IA Council ativado |
| 2026-03-13 | Deploy Railway ✅, bot Telegram NLP operacional                |
| 2026-03-13 | Persona JARVIS via Anamnese de Genialidade                    |
| 2026-03-13 | Transcrição de áudio Groq Whisper                             |
| 2026-03-13 | Devcontainer + Codespace Worker + OS Worker                   |
| 2026-03-14 | Fix timezone (4am→7am), fix transcrição duplicada             |
| 2026-03-14 | Memory Bridge: Telegram → Supabase → Antigravity              |
| 2026-03-14 | Auto-auditoria: ativo de R$200K+ com R$0 investido            |
| 2026-03-14 | God KairoX consolidation — higienização + estado atualizado   |
