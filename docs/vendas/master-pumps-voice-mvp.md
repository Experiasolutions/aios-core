# 🎙️ BLUEPRINT: MVP VOICE ASSISTANT (MASTER PUMPS)

## O Objetivo
Criar um **Assistente Pessoal Executivo** no Telegram para o cunhado do Gabriel (Master Pumps) que receba comandos de voz, entenda o contexto, execute ações simuladas e responda em áudio. Isso vai materializar o KAIROS na mão dele amanhã.

## A Solução Técnica (Local & Gratuita)

Como o Gabriel está com 3G restrito e sem VPS, a arquitetura deve rodar 100% no `localhost` do notebook dele e ser acessada via Telegram (que é leve e gerencia o áudio nativamente).

### Fluxo do Sistema
1. **Input:** Cunhado manda um áudio no Telegram ("Jarvis, resume os chamados de manutenção de hoje").
2. **STT (Speech-to-Text):** O bot baixa o arquivo `.ogg` do Telegram e manda para a API do **Groq Whisper** (rápida, gratuita, excelente em pt-BR).
3. **Brain (LLM):** O texto transcrito vai para o **Groq Llama 3** com um prompt de sistema injetado ("Você é o assistente executivo da Master Pumps...").
4. **Tool Calling (Mock):** O LLM identifica ferramentas (ex: `get_daily_report()`) e retorna dados simulados ("Hoje tivemos 3 chamados para a bomba X, 2 resolvidos").
5. **TTS (Text-to-Speech):** A resposta em texto volta para a bridge, que usa a biblioteca `edge-tts` (vozes realistas da Microsoft, 100% gratuitas via API não oficial) para gerar o áudio `.mp3`.
6. **Output:** O bot envia o áudio + o texto transcrito na conversa do Telegram.

---

## 🛠️ Stack & Módulos Necessários

1. **`node-telegram-bot-api`:** Para gerenciar mensagens de texto e voz.
2. **`axios` & `form-data`:** Para chamadas REST à API do Groq (Whisper para STT e Llama para chat).
3. **`edge-tts` (CLI ou Wrapper Node):** Gerador de voz ultra-realista. Voz sugerida: `pt-BR-AntonioNeural` (soberbo e profissional).
4. **`ffmpeg`:** Para converter o `.ogg` do Telegram para um formato que o Whisper aceite (geralmente `.mp3` ou `.wav`), caso necessário (a biblioteca do telegram costuma baixar em ogg).

---

## 📦 Passos de Implementação (Tempo estimado: 1 hora)

1. **Setup do Bot:**
   - Criar um novo bot no BotFather (`@MasterPumpsAssistantBot`).
   - Obter o Token.

2. **Módulo STT (Whisper via Groq):**
   - Função `transcribeAudio(filePath)` -> envia para `https://api.groq.com/openai/v1/audio/transcriptions`.

3. **Módulo TTS (Edge-TTS):**
   - Instalar `npm i edge-tts` ou usar linha de comando `npx edge-tts --voice pt-BR-AntonioNeural --text "Texto" --write-media out.mp3`.
   - Função `synthesizeSpeech(text)` -> retorna o path do MP3 gerado.

4. **Lógica Principal (O Cérebro):**
   - Ouvir evento `message` filtrando por áudio/voice.
   - Baixar o arquivo de voz (`bot.downloadFile`).
   - Passar no STT -> Logar a transcrição.
   - Passar no LLM -> Obter a resposta do assistente (usar dados hardcoded pertinentes a bombas industriais, manutenções, clientes).
   - Passar no TTS -> Gerar o áudio final.
   - Enviar no Telegram (`bot.sendAudio` ou `bot.sendVoice`).

---

## 🎭 Sugestão de Comandos (O que mostrar na Demo)

Crie **dados mockados** dentro do código para esses cenários:

- 🗣️ **Cunhado:** *"Jarvis, qual o status das manutenções preventivas do cliente X?"*
- 🤖 **Bot (Áudio):** *"Senhor, o cliente X tem 3 manutenções programadas para esta semana. A equipe do técnico João já está em deslocamento para a primeira. Mais alguma informação desejada?"*

- 🗣️ **Cunhado:** *"Jarvis, gera um relatório rápido das vendas da semana passada."*
- 🤖 **Bot (Áudio e Texto):** *"Claro.* [Envia texto formatado] *Como o senhor pode ver na mensagem acima, tivemos um aumento de 12% na venda de peças de reposição. Devo enviar o PDF para o seu e-mail?"*

---

## 💡 Por que isso vende?
Você não está vendendo uma "ferramenta de chat". Você está colocando um assistente operando por voz (como o Homem de Ferro) na mão do dono da empresa. Quando ele testar no próprio celular, vai ver o limite do que a Experia pode entregar. E todo o processamento acontece localmente no seu notebook.
