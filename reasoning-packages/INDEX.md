# Reasoning Packages — Índice

> Registro de todos os Reasoning Packages do AIOS.
> Cada RP é um plano de ação completo com contexto, decisões, steps e quality gate.

---

## Registro

| ID | Data | Mode | Status | Descrição | Arquivo |
|:---|:---|:---|:---|:---|:---|
| RP-20260218-BOOTSTRAP | 2026-02-18 | PM2 | ✅ Concluído | Bootstrap do Noesis Engine (Etapas 0-10) | [RP-20260218-BOOTSTRAP.md](RP-20260218-BOOTSTRAP.md) |
| RP-20260218-STRUCTURE | 2026-02-18 | PM2 | 🔄 Executando | Reorganização estrutural ENGINE/CLIENT | [RP-20260218-STRUCTURE.md](RP-20260218-STRUCTURE.md) |
| RP-20260218-LOCAL-BRIDGE | 2026-02-18 | PM2 | 📋 Pendente | Bridge local para desenvolvimento | [RP-20260218-LOCAL-BRIDGE.md](RP-20260218-LOCAL-BRIDGE.md) |
| RP-EXPERIA-PHASE3 | 2026-02-18 | PM2 | ✅ Concluído | WhatsApp Revenue Bridge (Experia client) | [RP-EXPERIA-PHASE3.md](RP-EXPERIA-PHASE3.md) |

---

## Como criar um novo RP

1. Use o formato da [OPUS_ENGINEERING_BIBLE.md](../OPUS_ENGINEERING_BIBLE.md) (seção 4)
2. Nomeie: `RP-{DATA}-{DESCRIÇÃO}.md` (ex: `RP-20260220-EVOLUTION-ENGINE.md`)
3. Salve em `reasoning-packages/`
4. Atualize esta tabela com o novo RP
5. Execute via `@aios-master *task` ou diretamente a um agente

## Convenções

- **ID único** por RP (nunca reutilize)
- **Status:** ✅ Concluído | 🔄 Executando | 📋 Pendente | ❌ Cancelado
- **Mode:** PM1 (análise) | PM2 (execução) | PM3 (auditoria)
- RPs do motor ficam aqui; RPs de clientes também, mas com prefixo do cliente (ex: `RP-EXPERIA-*`)
