---
task: Validate Release
responsavel: "@experia-validator"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - versao: Versão sendo validada (v1.x)
  - puppets: Quais Puppets geraram outputs
Saida: |
  - relatorio: Go/No-Go com ✅/❌ por item
  - warnings: Itens de atenção
  - decisao: GO / NO-GO
  - proximos_passos: Ações pós-validação
---

# *go-nogo — Validação de Release

## Checklist Tier 1 (Obrigatório)

- [ ] Todos eventos usados por Copy existem no Integrador
- [ ] Scripts testados com 6 test cases do QA
- [ ] Métricas do Data batem com fontes (diff <2%)
- [ ] Zero duplicidade (dedupe_key funciona)
- [ ] Modo manual documentado e testado

## Checklist Tier 2 (Recomendado)

- [ ] Changelog de cada Puppet atualizado
- [ ] Versionamento sincronizado
- [ ] Rollback plan documentado
- [ ] Alertas críticos configurados

## Template de Relatório

```
STATUS GERAL: 🟢 GO / 🔴 NO-GO
✅/❌ Contratos de dados
✅/❌ Taxonomia unificada
✅/❌ Versionamento
✅/❌ Testes E2E
✅/❌ Métricas consistentes
✅/❌ Dedupe funcionando
✅/❌ Modo manual
DECISÃO FINAL: GO/NO-GO
```
