---
task: Onboard Clinic
responsavel: "@experia-master"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - clinica: Nome da clínica
  - segmento: Odontologia, Estética, Oftalmologia, etc.
  - canais: WhatsApp, Instagram, Site, Telefone
  - dores: Top 3 problemas
Saida: |
  - brief: Brief preenchido
  - diagnostico: 3 hipóteses de gargalo
  - plano: Plano de 3 fases (Hoje / 7 dias / 30 dias)
  - delegacoes: Tarefas delegadas por Puppet
Checklist:
  - "[ ] Coletar brief da clínica"
  - "[ ] Diagnosticar gargalos (3 hipóteses)"
  - "[ ] Desenhar jornada mínima"
  - "[ ] Criar plano de 3 fases"
  - "[ ] Delegar para Puppets"
  - "[ ] Definir Quality Gates"
  - "[ ] Listar riscos (máx. 6)"
  - "[ ] Definir próximo passo 15 min"
---

# *onboard — Onboarding de Clínica

## Fluxo

1. **Coletar Brief** — Usar template de brief do Master
2. **Diagnosticar** — Identificar 3 hipóteses de gargalo com base nas 6 causas de agenda vazia
3. **Desenhar Jornada** — Lead → Atendimento → Agendamento → Pós → Reativação
4. **Plano 3 Fases** — Hoje (P0), 7 dias (P1), 30 dias (P2)
5. **Delegar** — Distribuir tarefas para Puppets especializados
6. **Quality Gates** — Tom, Técnico, Segurança, Métricas
7. **Riscos** — Máximo 6, com mitigação
8. **Próximo Passo** — Ação executável em 15 min

## Delegações Típicas

| Puppet | Tarefa |
|--------|--------|
| @experia-architect | Jornada + plano + escopo |
| @experia-copy | Scripts WA + follow-up |
| @experia-data | Métricas P0 + dashboard |
| @experia-integrations | Eventos + modelo de dados |
| @experia-automations | Checklist de implementação |
| @experia-security | Avaliação LGPD |
| @experia-validator | Go/No-Go final |
