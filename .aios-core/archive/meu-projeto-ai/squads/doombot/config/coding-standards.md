---
naming_convention:
  agents:kebab-case
  tasks:kebab-case
  workflows:kebab-case
  checklists:kebab-case
  templates:kebab-case

file_structure:
  agents: "agents/*.md"
  tasks: "tasks/*.md"
  workflows: "workflows/*.md"
  checklists: "checklists/*.md"
  templates: "templates/*.md"

task_format:
  version: "v1"
  required_fields:
    - task
    - responsavel
    - responsavel_type
    - atomic_layer
    - Entrada
    - Saida
    - Checklist

quality_gates:
  min_score: 80
  required_reviews: 1
  blocking_issues: 0

documentation:
  readme: true
  comments: "mandatory for complex logic"
---
