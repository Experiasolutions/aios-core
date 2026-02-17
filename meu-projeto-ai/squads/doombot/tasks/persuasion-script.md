---
task: persuasionScript()
responsavel: "@doom-persuader"
responsavel_type: Agent
atomic_layer: Task
elicit: true
Entrada:
  - campo: oferta
    tipo: document
    origem: doom-offers / user
    obrigatorio: true
  - campo: publico_alvo
    tipo: text
    origem: user
    obrigatorio: true
  - campo: canal
    tipo: text
    origem: user
    obrigatorio: true
Saida:
  - campo: script_persuasao
    tipo: document
    destino: doom-master (quality-gate)
  - campo: mapa_objecoes
    tipo: document
    destino: doom-mentor (war-room)
Checklist:
  - "[ ] Oferta, público e canal definidos"
  - "[ ] OPD++ ativado — estado de persona selecionado"
  - "[ ] Objection Oracle mapeado (objeção → contra-prova → mini-garantia)"
  - "[ ] Script de persuasão completo com flow adaptativo"
  - "[ ] Call Killer prep (se canal = voz)"
  - "[ ] Compliance check"
---
# Task: Persuasion Script

## Input
- [ ] Oferta a ser vendida
- [ ] Público-alvo
- [ ] Canal (WhatsApp, telefone, email, presencial)

## Processo
1. [ ] **OPD++ Activation:** Detectar perfil do lead e ativar estado ideal (agressivo/clínico/executivo/professoral)
2. [ ] **Objection Oracle:** Mapear top 5 objeções → contra-prova → mini-garantia → micro-degrau
3. [ ] **Script principal:** Construir flow de persuasão com gates de decisão
4. [ ] **Fricção adaptativa:** Ajustar nível de pressão por faixa de dor
5. [ ] **Call Killer prep:** Se canal = voz, preparar copiloto com CTAs em <300ms
6. [ ] **Compliance:** Verificar que persuasão é ética (nunca manipulação)

## Output
- Script de persuasão completo
- Mapa de objeções com contra-provas
- **Handoff → @doom-master:** para `quality-gate`
