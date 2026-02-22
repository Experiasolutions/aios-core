---
task: createCampaign()
responsavel: "@mkt-traffic"
responsavel_type: Agent
atomic_layer: Task
Entrada:
  - campo: briefing
    tipo: document
    origem: mkt-head (QG2 passed)
    obrigatorio: true
  - campo: criativos
    tipo: array
    origem: mkt-content
    obrigatorio: true
Saida:
  - campo: campanha
    tipo: object
    destino: plataforma_ads
Checklist:
  - "[ ] Estrutura de campanha criada"
  - "[ ] Pixels e tracking ativos"
  - "[ ] Público-alvo configurado"
  - "[ ] Budget e bidding definidos"
  - "[ ] Tracking links validados"
  - "[ ] Campanha lançada"
---

# Task: Criar Campanha

## Input
- [ ] Briefing aprovado (QG2 passed)
- [ ] Criativos prontos (de mkt-content)

## Output
- Campanha configurada na plataforma
- Pixels e tracking ativos
- Budget definido e bidding configurado

## Processo
1. [ ] Criar estrutura de campanha (ad sets, ads)
2. [ ] Configurar pixels e eventos de conversão
3. [ ] Definir público-alvo e lookalikes
4. [ ] Configurar budget e bidding strategy
5. [ ] Validar tracking links
6. [ ] Launch campanha
