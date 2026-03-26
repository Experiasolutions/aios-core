# GOD KAIROS — Multi-Terminal System

> **Hardware:** Celeron + 6GB RAM → CLI-first, minimal footprint
> **Estratégia:** Antigravity (Opus 4.6 heavy) + múltiplos terminais CLI (leves)

## Quick Start

```powershell
# Abrir todos os agentes (4 terminais)
.\god-kairos\Launch-GodKairos.ps1

# Modo leve (2 terminais: DEV + DEVOPS)
.\god-kairos\Launch-GodKairos.ps1 -LightMode

# Escolher agentes específicos
.\god-kairos\Launch-GodKairos.ps1 -Agents dev,architect

# Listar agentes disponíveis
.\god-kairos\Launch-GodKairos.ps1 -ListAgents
```

## Arquitetura

```
ANTIGRAVITY (esta janela)
  └── NOESIS (Opus 4.6) — Orquestrador mestre
       ├── Terminal CLI #1: @architect (Gemini/Claude)
       ├── Terminal CLI #2: @dev (Gemini/Claude)
       ├── Terminal CLI #3: @devops (Gemini/Claude)
       └── Terminal CLI #4: @analyst (Gemini/Claude)
```

## Model Routing

| Complexidade | Modelo | Interface | RAM ~est |
|---|---|---|---|
| Heavy | Opus 4.6 | Antigravity | ~500MB |
| Medium | Gemini 2.5 Pro | CLI | ~80MB |
| Light | Llama 3.1 8B | Groq API | ~50MB |

## Arquivos

- `config.yaml` — Configuração central (terminais, routing, bridges)
- `Launch-GodKairos.ps1` — Launcher multi-terminal
- `README.md` — Este arquivo
