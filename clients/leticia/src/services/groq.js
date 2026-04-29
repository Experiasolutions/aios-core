/**
 * Serviço Groq — LLM para atendimento WhatsApp da Letícia.
 * Usa memória por número de telefone.
 */
const Groq = require('groq-sdk');
const { loadEnv } = require('../config/env');
const { generateAttendantPrompt } = require('../prompts/attendant');
const memory = require('../utils/memory');

const config = loadEnv();
const groq = new Groq({ apiKey: config.groqApiKey });
const attendantPrompt = generateAttendantPrompt();

/**
 * Processa mensagem de texto de um cliente WhatsApp.
 * @param {string} userMessage - Texto recebido
 * @param {string} userId - JID do cliente (identificador único por número)
 * @returns {Promise<string>} Resposta gerada pelo LLM
 */
async function handleIncomingMessage(userMessage, userId) {
    memory.getOrCreate(userId, attendantPrompt);
    memory.addMessage(userId, 'user', userMessage);

    try {
        const completion = await groq.chat.completions.create({
            messages: memory.getMessages(userId),
            model: config.llm.model,
            temperature: config.llm.attendant.temperature,
            max_tokens: config.llm.attendant.maxTokens,
        });

        const response = completion.choices[0].message.content;
        memory.addMessage(userId, 'assistant', response);
        return response;
    } catch (error) {
        console.error('[Groq Leticia] Erro:', error.message || error);
        return 'Oi! Tive um probleminha aqui, pode repetir sua mensagem? 😊';
    }
}

module.exports = { handleIncomingMessage };
