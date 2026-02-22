---
task: designArchitecture()
responsavel: "@ops-architect"
responsavel_type: Agent
atomic_layer: Task
Entrada:
  - campo: fluxograma_aprovado
    tipo: document
    origem: ops-mapper (QG1 passed)
    obrigatorio: true
Saida:
  - campo: documento_arquitetura
    tipo: document
    destino: arquivo
Checklist:
  - "[ ] Fluxograma analisado"
  - "[ ] Entidades definidas"
  - "[ ] Pipeline de status criado"
  - "[ ] QG2 submetido"
---

# Task: Design Architecture

## Input
- [ ] Fluxograma aprovado (QG1 passed)

## Output
- Documento de arquitetura com:
  - Entidades e seus campos
  - Tags e etiquetas
  - Pipeline de status
  - Regras de transição

## Processo
1. [ ] Analisar fluxograma validado
2. [ ] Definir entidades principais
3. [ ] Mapear campos personalizados por entidade
4. [ ] Criar pipeline de status (estados e transições)
5. [ ] Submeter ao Quality Gate 2
