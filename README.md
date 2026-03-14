# 🐉 KAIROS — God KairoX

> **AI Operating System for Solo Entrepreneurs**
> Created by Gabriel Ferreira (Experia Solutions)

---

## What is KAIROS?

KAIROS is a **personalized AI operating system** that combines:
- 🤖 **24/7 Cloud Agent** (KAIROS SKY) — always-on assistant via Telegram
- 🎮 **RPG Gamification** — quests, XP, bosses (debts), streaks, Pareto zones
- 🧠 **Knowledge Brain** — persistent memory across platforms
- 🗡️ **Autonomous Workers** — task processing, morning briefs, night check-ins
- 📊 **Multi-client Management** — AI-powered consulting for local businesses

## Architecture

```
┌─────────────────────────────────────────┐
│            KAIROS SKY (Cloud)           │
│         Railway 24/7 · Python           │
│                                         │
│  ┌─────────┐ ┌──────────┐ ┌──────────┐ │
│  │ Telegram │ │  OODA    │ │ Workers  │ │
│  │ Bot NLP  │ │  Loop    │ │ 8 active │ │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ │
│       └─────────┬──┴────────────┘       │
│                 │                        │
│       ┌─────────┴─────────┐             │
│       │    Supabase DB    │             │
│       │   12 tables +     │             │
│       │  Knowledge Brain  │             │
│       └───────────────────┘             │
└─────────────────────────────────────────┘
           │              │
    ┌──────┴──────┐ ┌─────┴──────┐
    │  KAIROS OS  │ │  Clients   │
    │   (Local)   │ │            │
    │             │ │ Hortifruti │
    │ 76 scripts  │ │ Experia    │
    │ 66 RPs      │ │ Master P.  │
    │ 10 squads   │ │            │
    │ 55 engine   │ │            │
    └─────────────┘ └────────────┘
```

## Key Features

| Feature               | Status | Tech                         |
| --------------------- | ------ | ---------------------------- |
| Natural Language Bot  | ✅      | Telegram + Intent Classifier |
| Voice Transcription   | ✅      | Groq Whisper                 |
| Morning Brief         | ✅      | APScheduler + Gemini         |
| Night Check-in        | ✅      | RPG Score + Pareto           |
| Time Block Protection | ✅      | OS Worker (Genius Zone 🔵)    |
| Memory Bridge         | ✅      | Telegram → Supabase → IDE    |
| Multi-API Rotation    | ✅      | 4 Gemini + Groq fallback     |
| Autonomous Workers    | ✅      | Codespace + Long-polling     |
| System Auditor        | ✅      | Health Score per subsystem   |

## Stats

```
Files:         1,200+
Lines of Code: 80,000+
Hours Invested: ~1,250h
Infra Cost:    R$0 (all free tiers)
Replication:   R$180-280K (senior dev estimate)
```

## Stack

- **Cloud:** Railway (Python 3.12) + Supabase (PostgreSQL)
- **AI:** Gemini 2.0 Flash / 2.5 Pro + Groq Whisper + Llama fallback
- **Bot:** python-telegram-bot (NLP, no /commands)
- **Framework:** AIOX v5.0.0 (forked from SynkraAI/aiox-core)
- **Workers:** APScheduler + OODA cognitive loop

## Directory Structure

```
My KAIROS/
├── kairos-orchestrator/     # Cloud agent (Railway 24/7)
├── engine/                  # Core brain (Noesis, OPUS, Memory)
├── scripts/                 # 76+ automation scripts
├── squads/                  # 10 AI agent squads
├── reasoning-packages/      # 66+ strategic documents
├── clients/                 # Client implementations
├── data/                    # Registry, AI Flow, Megabrain
├── tools/                   # 28+ integrations & cookbooks
├── docs/                    # Bibles, manifestos, guides
└── distillation-dataset/    # 17 LoRA fine-tuning traces
```

## License

MIT — Built with 🗡️ by the Dragonborn
