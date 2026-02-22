# 🔌 Guia: Configuração do UiPath para chamar o AIOS Bridge

> **Versão:** 1.0 | **Data:** 2026-02-14
> **Requisitos:** UiPath Studio (Community/Pro), Node.js 18+, AIOS Bridge instalado

---

## 📁 Caminhos Importantes

```
Pasta do AIOS:     C:\Users\Gabriel\Downloads\aios-core-main\aios-core\meu-projeto-ai
Bridge script:     C:\Users\Gabriel\Downloads\aios-core-main\aios-core\meu-projeto-ai\scripts\experia_bridge.js
PowerShell wrapper: C:\Users\Gabriel\Downloads\aios-core-main\aios-core\meu-projeto-ai\scripts\run-bridge.ps1
Context (input):   Temporário — onde o UiPath salvar o context.json
Action (output):   C:\Users\Gabriel\Downloads\aios-core-main\aios-core\meu-projeto-ai\action.json
```

---

## 🤖 Prompt para UiPath Autopilot / Copilot

Cole este prompt no Autopilot do UiPath Studio para criar o workflow `whatsapp-autoreply`:

```
Crie um workflow chamado "AIOS WhatsApp AutoReply" que faz o seguinte:

1. MONITORAMENTO:
   - Abra o Google Chrome no site "web.whatsapp.com"
   - Use "Monitor Events" ou "Element Exists" para detectar quando uma nova mensagem não lida aparece (ícone de badge verde no chat)
   - Quando detectar mensagem não lida, clique no chat para abrir

2. EXTRAÇÃO:
   - Use "Get Text" para extrair o nome do remetente (elemento do topo do chat aberto)
   - Use "Get Text" para extrair a última mensagem recebida (último balão de mensagem do lado esquerdo)
   - Opcionalmente, extraia as últimas 3 mensagens do histórico

3. CRIAR context.json:
   - Monte um objeto JSON com esta estrutura:
     {
       "source": "whatsapp_web",
       "trigger": "new_message",
       "project": "whatsapp-autoreply",
       "timestamp": "<timestamp atual>",
       "data": {
         "sender_name": "<nome extraído>",
         "sender_phone": "",
         "message_text": "<mensagem extraída>",
         "chat_history": []
       }
     }
   - Salve esse JSON no arquivo: C:\Users\Gabriel\Downloads\aios-core-main\aios-core\meu-projeto-ai\context.json

4. CHAMAR O AIOS:
   - Use "Invoke Power Shell" com o script:
     Caminho: C:\Users\Gabriel\Downloads\aios-core-main\aios-core\meu-projeto-ai\scripts\run-bridge.ps1
     Argumentos: -Context "C:\Users\Gabriel\Downloads\aios-core-main\aios-core\meu-projeto-ai\context.json" -Project "whatsapp-autoreply"
   - OU use "Start Process":
     FileName: "node"
     Arguments: "C:\Users\Gabriel\Downloads\aios-core-main\aios-core\meu-projeto-ai\scripts\experia_bridge.js C:\Users\Gabriel\Downloads\aios-core-main\aios-core\meu-projeto-ai\context.json whatsapp-autoreply"
     WorkingDirectory: "C:\Users\Gabriel\Downloads\aios-core-main\aios-core\meu-projeto-ai"
   - Aguarde o processo finalizar (máximo 15 segundos)

5. LER A RESPOSTA:
   - Leia o arquivo: C:\Users\Gabriel\Downloads\aios-core-main\aios-core\meu-projeto-ai\action.json
   - Parse o JSON e extraia o campo "action.type" e "action.payload.text"

6. EXECUTAR A AÇÃO:
   - Se action.type = "reply_message":
     a. Clique no campo de texto do WhatsApp Web (caixa de digitação na parte inferior)
     b. Use "Type Into" para digitar o texto de action.payload.text
     c. Pressione Enter para enviar
   - Se action.type = "mark_as_unread":
     a. NÃO responda (handoff humano)
     b. Opcionalmente, marque a conversa como não lida
   - Se action.type = "schedule_appointment":
     a. NÃO responda automaticamente
     b. Crie uma notificação/log para o humano agendar

7. LOOP:
   - Volte ao passo 1 e continue monitorando
   - Adicione um delay de 5 segundos entre cada verificação para não sobrecarregar

CONFIGURAÇÕES:
- O workflow deve rodar em foreground (precisa do browser visível)
- Use Chrome como browser padrão
- Adicione tratamento de erro: se qualquer passo falhar, logue o erro e volte ao monitoramento
- Timeout de 15 segundos para a chamada ao AIOS
```

---

## 🛠️ Configuração Manual (Se o Autopilot não gerar tudo)

### Passo 1: Criar o Workflow no UiPath Studio

1. Abra UiPath Studio
2. Crie novo projeto: `AIOS-WhatsApp-AutoReply`
3. No Main.xaml, monte este fluxo:

```
[Start] → [Open Browser: web.whatsapp.com]
  ↓
[Loop Infinito] ←──────────────────────────┐
  ↓                                         │
[Element Exists: badge mensagem não lida]   │
  ↓ (sim)                    (não) ─→ [Delay 5s] ─┘
[Click: chat com badge]
  ↓
[Get Text: nome do remetente]
  ↓
[Get Text: última mensagem]
  ↓
[Write Text File: context.json]
  ↓
[Start Process: node experia_bridge.js context.json]
  ↓
[Read Text File: action.json]
  ↓
[Deserialize JSON: action]
  ↓
[If: action.type = "reply_message"]
  ↓ (sim)
[Type Into: campo de texto WhatsApp]
  ↓
[Send Hotkey: Enter]
  ↓
[Voltar ao Loop] ──────────────────────────┘
```

### Passo 2: Configurar o Start Process

| Campo | Valor |
|-------|-------|
| FileName | `node` |
| Arguments | `C:\Users\Gabriel\Downloads\aios-core-main\aios-core\meu-projeto-ai\scripts\experia_bridge.js C:\Users\Gabriel\Downloads\aios-core-main\aios-core\meu-projeto-ai\context.json whatsapp-autoreply` |
| WorkingDirectory | `C:\Users\Gabriel\Downloads\aios-core-main\aios-core\meu-projeto-ai` |

### Passo 3: Seletores importantes do WhatsApp Web

| Elemento | Seletor sugerido (ajustar com UI Explorer) |
|----------|------------------------------------------|
| Badge não lida | `<span class='x1rg5ohu' />` (badge verde) |
| Nome do remetente | `<span dir='auto' class='_ao3e' />` no header do chat |
| Última mensagem | `<span class='selectable-text' />` no último `.message-in` |
| Campo de digitação | `<div contenteditable='true' data-tab='10' />` |

> ⚠️ Os seletores do WhatsApp Web mudam com frequência. Use o **UiPath UI Explorer** para capturar os seletores atualizados.

---

## 📱 Qual WhatsApp usar?

| WhatsApp | Número | Recomendação |
|----------|--------|-------------|
| **Experia** | 11976162450 | ✅ Use para produção (atendimento real) |
| **Pessoal** | 11976239791 | 🧪 Use para testes (mande mensagens de teste para o Experia) |

**Setup ideal para teste:**
1. Abra o WhatsApp Web no Chrome com o número da **Experia** (11976162450)
2. Do seu celular pessoal (11976239791), mande: "Quanto custa o botox?"
3. O UiPath detecta → chama o bridge → AIOS (Groq) pensa → UiPath responde

---

## 🧪 Testando SEM UiPath (via terminal)

Para verificar que tudo funciona antes de configurar o UiPath:

```powershell
cd C:\Users\Gabriel\Downloads\aios-core-main\aios-core\meu-projeto-ai
node scripts/experia_bridge.js test/context-whatsapp.json whatsapp-autoreply
type action.json
```
