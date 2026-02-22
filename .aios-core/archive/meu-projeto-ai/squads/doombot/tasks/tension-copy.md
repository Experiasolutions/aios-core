---
task: tensionCopy()
responsavel: "@doom-tension"
responsavel_type: Agent
atomic_layer: Task
Entrada:
  - campo: copy_base
    tipo: document
    origem: rewrite-copy
    obrigatorio: true
Saida:
  - campo: copy_tensionado
    tipo: document
    destino: doom-master (quality-gate)
  - campo: gatilhos_aplicados
    tipo: list
    destino: doom-revenue (analyze-revenue)
Checklist:
  - "[ ] Copy base recebido e analisado"
  - "[ ] Gatilhos neurais selecionados (2-3 por contexto)"
  - "[ ] Prova Primeiro 2.0 aplicado"
  - "[ ] Gradiente de pressão calibrado"
  - "[ ] CTA ultimato com deadline + custo da inação"
  - "[ ] Compliance check (tensão dentro dos limites éticos)"
---
# Task: Tension Copy

## Input
- [ ] Copy base de `rewrite-copy`

## Processo
1. [ ] **Analisar nível de pressão atual:** warm/hot/urgent/now
2. [ ] **Selecionar gatilhos:** 2-3 gatilhos neurais por contexto (reciprocidade, escassez, etc.)
3. [ ] **Prova Primeiro 2.0:** Inserir evidência antes do pitch
4. [ ] **Aplicar gatilhos:** Integrar naturalmente no copy
5. [ ] **Gradiente de pressão:** Calibrar baseado em dor/urgência do lead + canal
6. [ ] **CTA ultimato:** Ação clara + deadline + custo da inação
7. [ ] **Compliance check:** Verificar que tensão é ética e legal

## Output
- Copy tensionado com gatilhos integrados
- Lista de gatilhos aplicados
- **Handoff → @doom-master:** para `quality-gate` final
