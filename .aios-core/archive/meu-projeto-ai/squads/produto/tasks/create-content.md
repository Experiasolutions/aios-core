---
task: createContent()
responsavel: "@produto-creator"
responsavel_type: Agent
atomic_layer: Task
Entrada:
  - campo: feature_spec
    tipo: document
    origem: produto-pm
    obrigatorio: true
Saida:
  - campo: materiais
    tipo: array
    destino: produto/assets
Checklist:
  - "[ ] Release notes criadas"
  - "[ ] Tutorial/guide criado"
  - "[ ] Material de lançamento pronto"
  - "[ ] QG2 submetido"
---

# Task: Criar Conteúdo de Produto

## Input
- [ ] Feature spec aprovada (QG1 passed)

## Processo
1. [ ] Criar release notes
2. [ ] Criar tutorial/guide de uso
3. [ ] Criar material de lançamento (landing copy, screenshots)
4. [ ] Revisar tom e guidelines com `@mkt-content`
5. [ ] Submeter ao Quality Gate 2

## Output
- Pacote de conteúdo completo para lançamento
