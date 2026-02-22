---
task: securityAssessment()
responsavel: "@doom-security"
responsavel_type: Agent
atomic_layer: Task
Entrada:
  - campo: escopo
    tipo: text
    origem: doom-master / user
    obrigatorio: true
Saida:
  - campo: red_team_report
    tipo: document
    destino: doom-master (quality-gate)
  - campo: opa_gates
    tipo: document
    destino: doom-master (orchestrate)
Checklist:
  - "[ ] Escopo definido e aceito"
  - "[ ] Red Team Self-Play executado"
  - "[ ] OPA gates verificados"
  - "[ ] Privacy Budget checado"
  - "[ ] SBOM/SLSA verificados (se aplicável)"
  - "[ ] C2PA manifests auditados"
  - "[ ] Relatório com patches sugeridos"
---
# Task: Security Assessment

## Input
- [ ] Escopo da avaliação (campanha, oferta, sistema, deploy)

## Processo
1. [ ] **Definir escopo:** O que será avaliado (outputs, deploys, dados)
2. [ ] **Red Team Self-Play:** Executar ataque adversarial LLM vs LLM
3. [ ] **OPA Gates:** Verificar todas as policies (Rego) aplicáveis
4. [ ] **Privacy Budget:** Checar consumo de cota por operação/sessão
5. [ ] **SBOM/SLSA:** Verificar supply chain se componente de software
6. [ ] **C2PA Audit:** Verificar manifests de proveniência dos criativos
7. [ ] **Stealth-Compliance:** Validar que compliance é by-design, sem overhead
8. [ ] **Report:** Gerar relatório com vulnerabilidades + patches + prioridade

## Output
- Red Team report com vulnerabilidades
- OPA gates status
- Privacy Budget status
- **Handoff → @doom-master:** para decisão de go/no-go
