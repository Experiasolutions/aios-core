# AIOS — Autonomous Intelligence Operating System

> **Motor universal** de orquestração de N agentes de IA em uma única força de trabalho operacional.
> Não é uma aplicação. É um sistema operacional. Não tem domínio. Tem clientes.

---

## ⚡ Boot Rápido (< 60 segundos)

| Objetivo | Leia |
|:---|:---|
| Entender o motor | Este arquivo → [AIOS_MASTER_HANDBOOK.md](AIOS_MASTER_HANDBOOK.md) |
| Entender a cognição | [OPUS_ENGINEERING_BIBLE.md](OPUS_ENGINEERING_BIBLE.md) (imutável) |
| Boot de sessão de agente | [SELF_CONTEXT.md](.aios-core/opus-replicator/SELF_CONTEXT.md) |
| Ver o roadmap | [ROADMAP.md](.aios-core/development/ROADMAP.md) |
| Trabalhar na Experia (cliente) | [clients/experia/README.md](clients/experia/README.md) |
| Ver Reasoning Packages | [reasoning-packages/INDEX.md](reasoning-packages/INDEX.md) |
| Arquitetura do sistema | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |

---

## 🧠 O QUE É O AIOS

O AIOS é um motor de inteligência que:
- **Orquestra** squads de agentes com domínios exclusivos
- **Raciocina** via Noesis (Opus 4.6 — PM1/PM2/PM3 + Constitutional Layer)
- **Aprende** via golden examples auto-colhidos (harvest-gold.js)
- **Executa** via Reasoning Packages (RPs) — planos estruturados de ação

**Stack:** Node.js, Express.js, YAML/Markdown agent definitions, JSON storage
**Kernel:** Synapse (8-layer neural pipeline) + IDS (decision engine) + WIS (workflow intelligence)
**Cognitive Engine:** Noesis (Constitutional Layer v3.0 + PM Masters)

---

## 🏗 ESTRUTURA DO PROJETO

```
/
├── README.md                    ← você está aqui
├── AIOS_MASTER_HANDBOOK.md      ← manual do sistema (humanos + agentes)
├── OPUS_ENGINEERING_BIBLE.md    ← motor cognitivo v1 (IMUTÁVEL)
├── OPUS_ENGINEERING_BIBLE_v2.md ← addendum v2 (ENGINE/CLIENT correction)
│
├── reasoning-packages/          ← Reasoning Packages (planos de ação)
│   ├── INDEX.md                 ← registro de todos os RPs
│   └── RP-*.md                  ← cada RP é um plano completo
│
├── clients/                     ← pacotes de clientes (ENGINE → CLIENT)
│   └── experia/                 ← WaaS para clínicas (primeiro cliente)
│       ├── README.md            ← o que é, como ativar
│       ├── ONBOARDING.md        ← como trabalhar neste client
│       └── squads/              ← squads específicos da Experia
│
├── squads/                      ← squads universais do motor
│   ├── mind-clones/             ← 67 clones experts (hivemind)
│   ├── doombot/                 ← revenue optimization
│   └── ...                      ← analytics, finance, marketing, etc.
│
├── scripts/                     ← scripts do motor universal
│   ├── kernel-bridge.js         ← ponte para o kernel (Synapse/IDS/WIS)
│   ├── event-bus.js             ← barramento de eventos
│   ├── input-refiner.js         ← refinador de input (v2.0)
│   ├── self-correction.js       ← PM3 quality gate (v1.0)
│   ├── harvest-gold.js          ← auto-colheita de golden examples (v2.0)
│   ├── tools-bridge.js          ← discovery de skills (163 skills)
│   └── skill-mapper.js          ← mapeamento clone → skill
│
├── .aios-core/                  ← kernel interno
│   ├── core/synapse/            ← pipeline neural de 8 camadas
│   ├── opus-replicator/         ← cognição (CL v3, PM Masters, SELF_CONTEXT)
│   ├── memory/                  ← golden examples, anti-patterns, baseline
│   └── development/             ← tasks, ROADMAP.md
│
├── tools/integrations/          ← arsenal de ferramentas (18 integrações)
├── docs/                        ← documentação ENGINE (universal)
└── data/                        ← runtime (memory.json, etc.)
```

---

## 🔀 ENGINE vs CLIENT PACKAGE

Esta é a distinção mais importante do sistema:

| | ENGINE (motor) | CLIENT PACKAGE |
|:---|:---|:---|
| **Localização** | Raiz, `scripts/`, `.aios-core/`, `squads/` | `clients/{nome}/` |
| **Domínio** | Nenhum | Específico (clínicas, jurídico, etc) |
| **Squads** | Universais (mind-clones, doombot, etc) | Específicos (experia, clinical) |
| **Responsável** | Contribuidores do motor | Operador do cliente |
| **Exemplo** | kernel-bridge.js | whatsapp-server.js (Experia) |

> ⚠️ **NUNCA** misture lógica de domínio (Experia, clínica, paciente) em arquivos ENGINE.

---

## 📦 COMO ADICIONAR UM NOVO CLIENT PACKAGE

```bash
mkdir -p clients/{nome-do-cliente}/squads clients/{nome-do-cliente}/docs
# 1. Crie clients/{nome}/README.md (descrição, stack, squads)
# 2. Crie clients/{nome}/ONBOARDING.md (setup, env vars, ativação)
# 3. Mova squads específicos para clients/{nome}/squads/
# 4. Crie RPs específicos em reasoning-packages/RP-{NOME}-*.md
```

---

## 🚀 STATUS ATUAL

| Fase | Status |
|:---|:---|
| Bootstrap (Noesis) | ✅ Completo (Etapas 0-10) |
| Estrutura ENGINE/CLIENT | ✅ Em execução |
| Phase 3: WhatsApp Experia | 📋 Próximo |
| Evolution Engine | 🔮 Futuro |

---

*AIOS Engine — Autonomous Intelligence Operating System*
*Motor universal. Qualquer domínio. Qualquer escala.*
