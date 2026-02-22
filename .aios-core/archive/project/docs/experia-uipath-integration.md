# 🦾 Plano de Ação: UiPath como Braço Executivo da Experia

**Contexto:** O AIOS é o Cérebro. UiPath são os Músculos.
**Objetivo:** Permitir que agentes do squad Experia executem ações reais no PC da clínica (WhatsApp, Agenda, CRM) usando o UiPath.

---

## 🏗️ Arquitetura da Solução

```mermaid
flowchart TD
    A[WhatsApp Clínica] -->|Mensagem| B(UiPath Monitor)
    B -->|Texto/Print| C{AIOS Brain}
    C -->|Raciocínio| D[Agente Responsável]
    
    subgraph Experia Squad
        D -->|Decisão| E[@experia-copy]
        D -->|Ação| F[@experia-automations]
    end
    
    F -->|Comando JSON| G[UiPath Robot]
    G -->|Digitar/Clicar| H[WhatsApp/Sistema]
```

---

## 🛠️ Passo a Passo de Integração

### Fase 1: O "Ouvido" (Monitoramento)
1. **Robô Sentinela (UiPath):**
   - Cria um processo em *Background*.
   - Monitora janelas específicas (ex: WhatsApp Web, Sistema Médico).
   - Gatilho: "Ao receber nova mensagem" ou "A cada 5 min".

2. **Extração de Contexto:**
   - UiPath usa OCR ou Get Text para ler a tela.
   - Salva o contexto em um arquivo `context.json` na pasta do AIOS.

### Fase 2: O "Cérebro" (Decisão)
1. **Conector (Bridge):**
   - UiPath chama o AIOS via linha de comando (CLI) ou API local.
   - Comando: `aios run task @experia-copy --context context.json`

2. **Processamento:**
   - O agente Experia lê o JSON.
   - Gera a resposta ou a ação necessária.
   - Salva a saída em `action.json`.

### Fase 3: O "Braço" (Execução)
1. **Robô Executor (UiPath):**
   - Lê o arquivo `action.json`.
   - Se `action: "reply"`, digita no WhatsApp e envia.
   - Se `action: "schedule"`, abre a agenda e clica no horário.

---

## 📋 Lista de Tarefas para `@experia-integrations`

1. [ ] **Mapear Seletores:** Identificar os campos de input do WhatsApp Web e do sistema da clínica (usando UiPath Explorer).
2. [ ] **Criar Argumentos de Entrada/Saída:** Definir o padrão JSON para troca de dados entre UiPath e AIOS.
3. [ ] **Script de Ponte:** Criar um script `.bat` ou `.ps1` que o UiPath possa chamar para invocar o AIOS.

## 🚀 Como começar HOJE (MVP)

**Sprint 14D (Turno de Receita) com UiPath:**
1. Mantenha o **WhatsApp Web** aberto.
2. Crie um Robô UiPath que:
   - Lê a última mensagem não lida.
   - Manda para o AIOS (via prompt simples).
   - Pega a resposta do AIOS.
   - Cola no campo de mensagem e envia.

*Isso transforma seu PC em um funcionário digital autônomo.*
