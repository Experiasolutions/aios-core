---
task: createStoryadd()
responsavel: "@doom-storyads"
responsavel_type: Agent
atomic_layer: Task
elicit: true
Entrada:
  - campo: produto
    tipo: text
    origem: user
    obrigatorio: true
  - campo: publico_alvo
    tipo: text
    origem: user
    obrigatorio: true
  - campo: gancho
    tipo: text
    origem: user / doom-copywriter
    obrigatorio: false
Saida:
  - campo: storyadd_completo
    tipo: document
    destino: doom-master (quality-gate)
  - campo: c2pa_manifest
    tipo: document
    destino: doom-security (opa-check)
Checklist:
  - "[ ] Produto e público-alvo definidos"
  - "[ ] 3 narrativas pessoais geradas (vulnerabilidade, transformação, autoridade)"
  - "[ ] Creative Genome aplicado (mutações de hook/ângulo)"
  - "[ ] StoryAd estruturado (Gancho → Conflito → Virada → CTA)"
  - "[ ] VEO-ready format preparado (se vídeo)"
  - "[ ] C2PA manifest gerado"
---
# Task: Create StoryAd

## Input
- [ ] Produto/serviço a promover
- [ ] Público-alvo
- [ ] Gancho inicial (opcional — pode ser gerado)

## Processo
1. [ ] **Coleta de verdade:** Extrair história real do produto/fundador/cliente
2. [ ] **3 Narrativas:** Gerar vulnerabilidade, transformação e autoridade
3. [ ] **Selecionar melhor narrativa:** Baseado no público e canal
4. [ ] **Estruturar StoryAd:** Gancho → Conflito → Virada → CTA
5. [ ] **Creative Genome:** Aplicar mutações de headline/hook/ângulo
6. [ ] **VEO-ready:** Se vídeo, preparar formato otimizado
7. [ ] **C2PA manifest:** Gerar manifesto de proveniência e autoria

## Output
- StoryAd autêntico completo
- C2PA manifest
- **Handoff → @doom-master:** para `quality-gate`
