---
task: abrirChamado()
responsavel: "@facilities-head"
responsavel_type: Agent
atomic_layer: Task
Checklist:
  - "[ ] Classificado P1/P2/P3"
  - "[ ] Atribuído ao agente correto"
  - "[ ] SLA definido"
  - "[ ] Solicitante notificado"
---
# Task: Abrir Chamado
## Input
- [ ] Descrição do problema
- [ ] Localização
- [ ] Squad solicitante
## Processo
1. [ ] Classificar severidade: P1 (crítico) | P2 (alto) | P3 (normal)
2. [ ] Atribuir ao agente: Wrench (predial) | Circuit (TI) | Sentinel (segurança)
3. [ ] Verificar material necessário com Stock
4. [ ] Definir SLA: P1 <1h | P2 <4h | P3 <24h
5. [ ] Notificar solicitante com prazo
6. [ ] Executar e documentar
7. [ ] Fechar chamado com evidência
