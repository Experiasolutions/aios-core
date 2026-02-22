---
task: specFeature()
responsavel: "@produto-pm"
responsavel_type: Agent
atomic_layer: Task
Entrada:
  - campo: backlog_item
    tipo: object
    origem: backlog
    obrigatorio: true
Saida:
  - campo: feature_spec
    tipo: document
    destino: arquivo
Checklist:
  - "[ ] User story definida"
  - "[ ] Acceptance criteria listados"
  - "[ ] Impacto de negócio documentado"
  - "[ ] Dependências mapeadas"
  - "[ ] QG1 submetido"
---

# Task: Spec de Feature

## Input
- [ ] Item de backlog aprovado pelo Head

## Processo
1. [ ] Criar spec usando `feature-spec-tmpl.md`
2. [ ] Definir user story: "Como [persona], quero [ação], para que [benefício]"
3. [ ] Listar acceptance criteria (mínimo 3)
4. [ ] Documentar impacto esperado
5. [ ] Mapear dependências técnicas e de design
6. [ ] Submeter ao Quality Gate 1

## Output
- Feature spec completa e aprovada
