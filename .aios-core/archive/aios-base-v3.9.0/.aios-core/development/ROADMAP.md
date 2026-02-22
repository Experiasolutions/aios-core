# AIOS — Roadmap

> Estado vivo do projeto. Atualizado a cada sessão.
> Última atualização: 2026-02-18

---

## ✅ Concluído

### Bootstrap (Noesis Engine) — Etapas 0-10
- Constitutional Layer v3.0
- PM1/PM2/PM3 Masters
- Golden Examples (2 seeds + 1 auto-harvested)
- Quality Baseline + Anti-Patterns (6 catalogados)
- input-refiner.js v2.0 (9.3/10)
- self-correction.js v1.0 (8.6/10)
- harvest-gold.js v2.0 (9.8/10)
- tools-bridge.js v1.0 (10/10)
- kernel-bridge.js v1.1 (9.9/10)
- skill-mapper.js v1.0 (10/10)
- OPUS_ENGINEERING_BIBLE_v2.md (ENGINE/CLIENT correction)
- RP-20260218-PHASE3-WHATSAPP generated (deleted — regenerate when needed)

### Estrutura ENGINE/CLIENT
- Diretórios `reasoning-packages/`, `clients/experia/` criados
- RPs movidos para reasoning-packages/
- Squads Experia (experia/, patient-ops/, clinical/) movidos para clients/experia/squads/
- Docs Experia movidos para clients/experia/docs/
- README.md, INDEX.md, ARCHITECTURE.md, ROADMAP.md criados

---

## 🔄 Em Progresso

### RP-20260218-STRUCTURE (reorganização)
- ☑️ Varredura e mapeamento
- ☑️ Pastas criadas
- ☑️ Arquivos movidos
- ☑️ Documentação criada
- 🔄 Validação e links

---

## 📋 Próximo (Phase 3 — Experia)

### WhatsApp Revenue Bridge
- `scripts/session-store.js` — estado de conversa, TTL 24h
- `scripts/intent-classifier.js` — 7 intents com confidence
- `scripts/response-builder.js` — template engine WhatsApp
- `scripts/whatsapp-server.js` v2 — pipeline completo
- Integração com Evolution API
- Primeiro teste com lead real

---

## 🔮 Futuro (Engine)

### Evolution Engine (auto-evolução)
- Ciclo evolutivo: auditoria → proposta → validação → apply → verify
- Baseline congelado + convergence guard + circuit breaker
- Hivemind como auditores/inventores/juízes
- Dry-run mode obrigatório antes de autonomia

### Novos Client Packages
- Template genérico para onboarding de novo cliente
- Documentação de como criar um client package do zero
- Separação total de dados entre clientes

### Upstream Sync (Synkrai)
- Pesquisar updates upstream
- Contribuir Opus Engine de volta
- Manter fork sincronizado
