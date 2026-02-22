---
task: mapProcess()
responsavel: "@ops-mapper"
responsavel_type: Agent
atomic_layer: Task
Entrada:
  - campo: processo_nome
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: squad_solicitante
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: descricao_fluxo
    tipo: string
    origem: User Input
    obrigatorio: true
Saida:
  - campo: fluxograma
    tipo: document
    destino: arquivo
  - campo: gargalos
    tipo: array
    destino: relatório
Checklist:
  - "[ ] Briefing recebido"
  - "[ ] Stakeholders entrevistados"
  - "[ ] Fluxograma v1 desenhado"
  - "[ ] Gargalos identificados"
  - "[ ] QG1 submetido"
---

# Task: Mapear Processo

## Input
- [ ] Nome do processo
- [ ] Squad solicitante
- [ ] Descrição do fluxo atual (texto ou voz)

## Output
- Fluxograma Mermaid com:
  - Entradas e saídas de cada etapa
  - Responsáveis por etapa
  - Pontos de decisão (Quality Gates)
  - Gargalos identificados

## Processo
1. [ ] Receber briefing do solicitante
2. [ ] Entrevistar stakeholders (se necessário)
3. [ ] Desenhar fluxograma v1
4. [ ] Identificar gargalos e sugerir melhorias
5. [ ] Submeter ao Quality Gate 1
