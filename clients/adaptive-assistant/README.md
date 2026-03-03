# KAIROS Personal — Assistente Adaptável (Blank Canvas)

Este é um assistente de Inteligência Artificial sem persona fixa (Blank Canvas), criado na Arquitetura V3 do ecossistema KAIROS.

## Como funciona?
O KAIROS Personal possui um sistema de **Memória Persistente**. 
Ele inicia como uma folha em branco. Para moldá-lo, o usuário apenas envia uma mensagem de voz ou texto dizendo:
> *"A partir de agora, quero que você aja como minha assistente financeira pessoal."*

O bot salvará essa instrução e adaptará toda sua base de conhecimento (Groq Llama-3 70B) para atuar de acordo com as necessidades do novo papel, para sempre.
Para mudar de papel, basta mandar o comando `/resetar`.

## Como fazer Deploy (Render.com)

1. Crie um **Web Service** na Render.
2. Conecte este repositório (`adaptive-assistant`).
3. Configure os passos:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Na aba **Environment Variables**, adicione:
   - `TELEGRAM_BOT_TOKEN`: O token que você pegar no BotFather (ex: @KairosSisterBot)
   - `GROQ_API_KEY`: A chave da API Groq

O servidor Express injetado garantirá que a Render não suspenda o bot (ping pong server) e ele operará 24/7.
