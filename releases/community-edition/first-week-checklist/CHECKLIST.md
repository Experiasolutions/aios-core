# 📋 First Week Checklist — Do Zero ao Operacional em 7 Dias

> Todo dia uma ação concreta. No final da semana, você tem um sistema AIOS funcionando.

---

## Dia 1 — Conhecer a Casa

- [ ] Instalar o AIOS (seguir documentação oficial)
- [ ] Rodar qualquer script existente para confirmar que o Node.js funciona (ex: `node -e "console.log('AIOS OK')"`)  
  > **Dica Windows:** Se `grep` não funcionar, use `findstr /S /I` como alternativa
- [ ] Ler a seção "Nível 1" do AIOS Father

**Tempo estimado:** 1-2 horas
**Meta do dia:** Entender onde cada coisa fica

---

## Dia 2 — Criar Seu Primeiro Agente

- [ ] Criar `.antigravity/agents/meu-assistente.md` (copiar template do AIOS Father)
- [ ] Ativar o agente e testar 3 conversas
- [ ] Ajustar `core_principles` até ele responder como você quer
- [ ] Entender: agente = definição de persona + regras + comandos

**Tempo estimado:** 1 hora
**Meta do dia:** Ter 1 agente funcional que soa como VOCÊ quer

---

## Dia 3 — Montar Seu Primeiro Squad

- [ ] Criar pasta `squads/meu-squad/agents/`
- [ ] Criar 2 agentes complementares (ex: writer + reviewer, ou pesquisador + sintetizador)
- [ ] Testar o fluxo: agente 1 produz → agente 2 revisa/complementa
- [ ] Ler a seção "Nível 2" do AIOS Father

**Tempo estimado:** 1-2 horas
**Meta do dia:** 2 agentes que trabalham em sequência

---

## Dia 4 — Separar Engine de Client

- [ ] Criar `clients/meu-negocio/` com subpastas (agents, templates, data)
- [ ] Mover qualquer arquivo de domínio de `squads/` para `clients/`
- [ ] Rodar busca de contaminação: `grep -r "nome-do-negocio" squads/` (Linux/Mac) ou `findstr /S /I "nome-do-negocio" squads\*` (Windows)
- [ ] Resultado esperado: zero matches

**Tempo estimado:** 30 minutos
**Meta do dia:** Separação limpa entre motor e aplicação

---

## Dia 5 — Conectar um Canal

- [ ] Escolher: Telegram Bot (mais fácil) ou WhatsApp
- [ ] Para Telegram: criar bot via @BotFather, adicionar token ao `.env`
- [ ] Testar: enviar mensagem → bot responde
- [ ] Configurar pelo menos 2 comandos úteis (ex: /status, /tarefas)

**Tempo estimado:** 1-2 horas
**Meta do dia:** Acessar seu sistema pelo celular

---

## Dia 6 — Automatizar Algo

- [ ] Escolher 1 tarefa que faz toda semana (relatório, planejamento, revisão)
- [ ] Criar script que roda essa tarefa usando seus agentes
- [ ] Agendar com `node-schedule` ou cron
- [ ] Testar: tarefa roda e resultado chega no Telegram

**Tempo estimado:** 2 horas
**Meta do dia:** Pelo menos 1 coisa rodando sem você acionar

---

## Dia 7 — Revisar e Decidir

- [ ] Listar o que funcionou e o que não funcionou
- [ ] Decidir: quero continuar evoluindo? quero atender clientes com isso?
- [ ] Se sim: ler os Níveis 4-5 do AIOS Father
- [ ] Se sim para clientes: ler o guide de Engine/Client Separation

**Tempo estimado:** 1 hora
**Meta do dia:** Clareza sobre o próximo mês

---

## Ao Final da Semana Você Terá:

| Item                                     | Status |
| :--------------------------------------- | :----: |
| AIOS instalado e funcionando             |   ✅    |
| 1 agente personalizado                   |   ✅    |
| 1 squad com 2+ agentes                   |   ✅    |
| Separação engine/client                  |   ✅    |
| Canal de comunicação (Telegram/WhatsApp) |   ✅    |
| 1 automação rodando sozinha              |   ✅    |
| Decisão sobre próximos passos            |   ✅    |

**Tempo total investido:** ~8-10 horas na semana

---

*First Week Checklist — KAIROS Community Edition*
*Baseado na experiência real de operação — Gabriel Lima, Fev 2026*
