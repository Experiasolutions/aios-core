---
task: rewriteCopy()
responsavel: "@doom-copywriter"
responsavel_type: Agent
atomic_layer: Task
elicit: true
Entrada:
  - campo: copy_original
    tipo: text
    origem: user / doom-offers
    obrigatorio: true
  - campo: objetivo
    tipo: text
    origem: user
    obrigatorio: true
Saida:
  - campo: copy_reescrito
    tipo: document
    destino: doom-tension (tension-copy)
  - campo: changelog
    tipo: document
    destino: doom-master (quality-gate)
Checklist:
  - "[ ] Copy original recebido e analisado"
  - "[ ] Style Bank consultado (melhores ângulos por ROI)"
  - "[ ] Arena de Headlines rodada (10 headlines + 3 ângulos)"
  - "[ ] Linter de Anúncios aplicado (score ≥8)"
  - "[ ] Copy reescrito com Creative Brain/FCS"
  - "[ ] C2PA manifest gerado"
  - "[ ] Changelog documentado"
---
# Task: Rewrite Copy

## Input
- [ ] Copy original para reescrita
- [ ] Objetivo do copy (venda, lead, awareness, etc.)

## Processo
1. [ ] **Analisar original:** Identificar fraquezas (clareza, emoção, CTA, prova)
2. [ ] **Style Bank:** Consultar ângulos e hooks que mais geram CAIXA por arquétipo
3. [ ] **Arena de Headlines:** Gerar 10 headlines + 3 ângulos de prova + 3 narrativas
4. [ ] **Reescrita brutal:** Aplicar Creative Brain/FCS — transformar em arma de conversão
5. [ ] **Linter de Anúncios:** Avaliar rubricas (clareza, promessa, prova, urgência, CTA, emoção)
6. [ ] **Score check:** Se score < 8 em qualquer rubrica → reescrever automaticamente
7. [ ] **C2PA manifest:** Gerar manifesto de proveniência
8. [ ] **Changelog:** Documentar todas as mudanças com justificativa

## Output
- Copy reescrito (arma de conversão)
- Changelog detalhado
- **Handoff → @doom-tension:** para `tension-copy`
