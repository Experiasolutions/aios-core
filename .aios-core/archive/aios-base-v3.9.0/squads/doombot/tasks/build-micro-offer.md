---
task: buildMicroOffer()
responsavel: "@doom-offers"
responsavel_type: Agent
atomic_layer: Task
elicit: true
Entrada:
  - campo: nicho
    tipo: text
    origem: user / diagnose-business
    obrigatorio: true
  - campo: dor_principal
    tipo: text
    origem: user / diagnose-business
    obrigatorio: true
  - campo: preco_referencia
    tipo: number
    origem: user
    obrigatorio: false
  - campo: publico_alvo
    tipo: text
    origem: user
    obrigatorio: true
Saida:
  - campo: oferta_estruturada
    tipo: document
    destino: doom-copywriter (rewrite-copy)
  - campo: variantes_arena
    tipo: document
    destino: doom-master (arena)
Checklist:
  - "[ ] Nicho validade e documentado"
  - "[ ] Dor principal quantificada (urgência + disposição a pagar)"
  - "[ ] 7 etapas NMI completas"
  - "[ ] Price Lab Express executado (se aplicável)"
  - "[ ] Micro-garantia condicional definida"
  - "[ ] Variantes para Arena geradas (mínimo 3)"
  - "[ ] SLA de entrega cumprido (draft ≤60s, final ≤10min)"
---
# Task: Build Micro-Offer (NMI 2.0)

## Input
- [ ] Nicho de mercado
- [ ] Dor principal do público
- [ ] Preço de referência (se disponível)
- [ ] Público-alvo

## Processo — 7 Etapas NMI
1. [ ] **Etapa 1 — Nicho:** Validar e documentar o micro-nicho
2. [ ] **Etapa 2 — Dor:** Quantificar a dor (urgência × disposição a pagar × tamanho do mercado)
3. [ ] **Etapa 3 — Gancho:** Criar gancho irresistível que conecta dor → solução
4. [ ] **Etapa 4 — Mecanismo:** Descrever o "como funciona" (mecanismo único de entrega)
5. [ ] **Etapa 5 — Prova:** Social proof + cases + resultados mensuráveis
6. [ ] **Etapa 6 — Oferta:** Compilar oferta (preço, bônus, garantia, prazo)
7. [ ] **Etapa 7 — CTA:** Call-to-action com deadline + custo da inação

## Complementos
8. [ ] **Price Lab Express:** Simulação A/B de preço (se dados disponíveis)
9. [ ] **Micro-Garantia:** Garantia condicional que reduz risco percebido
10. [ ] **Arena prep:** Gerar 3+ variantes para Arena de Ofertas
11. [ ] **Tesouraria:** Definir requisitos de garantia no caixa

## SLAs
- Draft: ≤ 60 segundos
- Final: ≤ 10 minutos
- Assets: ≤ 2 horas

## Output
- Oferta estruturada em 7 etapas
- Variantes para Arena de Ofertas
- **Handoff → @doom-copywriter:** para `rewrite-copy` do material
- **Handoff → @doom-master:** variantes para `arena`
