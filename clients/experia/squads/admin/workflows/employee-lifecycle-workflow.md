---
name: employee-lifecycle-workflow
description: Workflow do ciclo de vida do colaborador
squad: admin
version: 1.0.0
---

# Employee Lifecycle Workflow

## Fluxo
```
Vaga → Recrutamento → Contrato → QG1 → Onboarding → QG2 → Ativo → Avaliação → PDI → ...→ Offboarding → QG3
```

## Steps

### Step 1: Recrutamento
- **Agente:** `@admin-rh` (People)
- **Input:** Requisição de vaga (de qualquer Head)
- **Output:** Candidato aprovado
- **Ações:** Divulgar → Triagem → Entrevistas → Decisão

### Step 2: Contratação
- **Agentes:** `@admin-juridico` (Codex) + `@admin-dp` (Payroll)
- **Input:** Candidato aprovado
- **Output:** Contrato assinado + documentação completa
- **Quality Gate 1:** Contrato e docs OK?
  - Sim: avança
  - Não: Pendência documental

### Step 3: Onboarding
- **Agentes:** `@admin-rh` (People) + `@admin-cultura` (Hearth)
- **Input:** Colaborador contratado
- **Checklist:** `onboarding-rh-checklist.md`
- **Output:** Colaborador integrado e produtivo
- **Quality Gate 2:** Onboarding completo em <7 dias?
  - Sim: avança para Ativo
  - Não: Estender onboarding

### Step 4: Ciclo Ativo (contínuo)
- **Agentes:** Todos do squad
- **Ações paralelas:**
  - `@admin-rh`: Avaliações trimestrais + PDI
  - `@admin-dp`: Folha mensal + benefícios
  - `@admin-financeiro`: Orçamento e projeções
  - `@admin-cultura`: Clima + rituais
  - `@admin-juridico`: Compliance contínua

### Step 5: Offboarding (quando aplicável)
- **Agentes:** `@admin-rh` + `@admin-dp` + `@admin-juridico`
- **Checklist:** `offboarding-rh-checklist.md`
- **Quality Gate 3:** Offboarding legal completo?
  - Sim: ✅ Encerrado
  - Não: Pendências documentais

## Cross-Squad
- **Qualquer Head → Admin:** Requisição de vaga
- **Admin → OPS:** Novo colaborador precisa de acessos
