# MVP Hovet Animale - Experia Telegram Bot

Este é um MVP funcional para apresentar a solução de Governança Digital (relatórios matinais e consultas via Telegram) como proposta de permuta.

## Como rodar em 1 comando (Windows)

1. `npm install`
2. Adicione seu TOKEN do Telegram no arquivo `.env` (peça ao @BotFather). Opcional: Adicione o `GROQ_API_KEY` para respostas inteligentes.
3. `npm start`

## O que mostrar na Demo

1. Inicie o bot e mande **`/start`** no Telegram.
2. Mande **`/relatorio`** para simular o recebimento automático das 7h da manhã.
3. Mande **`/agenda`** ou **`/internacoes`** para ver o sistema respondendo na hora.
4. Mande uma mensagem normal como **`Como está o Tigrinho?`** para ver a IA atuando com dados do paciente.
