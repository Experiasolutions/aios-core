/**
 * @module intent-classifier
 * @version 1.0.0
 * @purpose Classify incoming WhatsApp messages into 7 intents with
 *          confidence scoring. Rule-based MVP (regex + keyword matching).
 * @inputs  { text: string, session?: SessionObject }
 * @outputs { intent: string, confidence: number, entities: object }
 * @emits   intent:classified
 * @dependencies None (pure function, zero deps)
 */

// 7 Intents Definitions
const INTENTS = {
    GREETING: {
        patterns: [
            /\b(oi|ola|olá|bom dia|boa tarde|boa noite|e ai|e aí|hey)\b/i,
            /^oi$/i,
            /^ola$/i
        ],
        baseScore: 0.8
    },
    SCHEDULING: {
        patterns: [
            /\b(agendar|marcar|agenda|horario|horário|disponivel|disponível|vaga|consulta)\b/i,
            /\b(quero marcar|gostaria de agendar|tem horario)\b/i
        ],
        baseScore: 0.9
    },
    CANCELLATION: {
        patterns: [
            /\b(cancelar|desmarcar|não vou|nao vou|não posso|nao posso|remarcar)\b/i,
            /\b(cancelamento|desistencia|desistência)\b/i
        ],
        baseScore: 0.95 // Specific keywords usually mean this intent strongly
    },
    MEDICAL_QUESTION: {
        patterns: [
            /\b(dor|sintoma|remedio|remédio|tratamento|tomar|procedimento|cirurgia|exame)\b/i,
            /\b(estou com|sinto|minha cabeça|meu dente)\b/i
        ],
        baseScore: 0.7
    },
    COMPLAINT: {
        patterns: [
            /\b(reclam|insatisf|demor|pessimo|péssimo|ruim|bosta|merda|falta de respeito|absurdo)\b/i,
            /\b(nunca mais|atendimento horrivel|atendimento horrível)\b/i
        ],
        baseScore: 0.85
    },
    PRICE_INQUIRY: {
        patterns: [
            /\b(quanto custa|valor|preço|preco|tabela|pagamento|cartao|cartão|dinheiro|pix)\b/i,
            /\b(convenio|convênio|unimed|bradisco|sulamerica|plano)\b/i
        ],
        baseScore: 0.9
    },
    OTHER: {
        patterns: [], // Fallback
        baseScore: 0.0
    }
};

class IntentClassifier {
    /**
     * Classify a message text into an intent
     * @param {string} text 
     * @param {object} [session] - Optional session context for boosting
     * @returns {object} { intent, confidence, entities, alternatives }
     */
    classify(text, session = null) {
        if (!text || typeof text !== 'string') {
            return { intent: 'OTHER', confidence: 0.0, entities: {} };
        }

        const normalizedText = text.toLowerCase().trim();
        const scores = [];

        // 1. Calculate scores for each intent
        for (const [intentName, config] of Object.entries(INTENTS)) {
            if (intentName === 'OTHER') continue;

            let score = 0;
            let matchCount = 0;

            for (const pattern of config.patterns) {
                if (pattern.test(normalizedText)) {
                    score = Math.max(score, config.baseScore);
                    matchCount++;
                }
            }

            // Keyword density boost (small)
            if (matchCount > 1) {
                score += (matchCount - 1) * 0.05;
            }

            // Session Context Boost
            // If previous intent was SCHEDULING, boost SCHEDULING likelyhood
            if (session && session.intents && session.intents.length > 0) {
                const lastIntent = session.intents[session.intents.length - 1];
                if (lastIntent.intent === intentName) {
                    score += 0.15; // Continuity boost
                }
            }

            // Cap at 1.0
            score = Math.min(score, 1.0);

            if (score > 0) {
                scores.push({ intent: intentName, confidence: score });
            }
        }

        // 2. Sort by confidence
        scores.sort((a, b) => b.confidence - a.confidence);

        // 3. Select winner or fallback
        const winner = scores.length > 0 ? scores[0] : { intent: 'OTHER', confidence: 0.0 };

        // Threshold check (must be > 0.3 to be considered valid)
        // Except typical greetings which can be short
        if (winner.intent !== 'GREETING' && winner.confidence < 0.3) {
            return {
                intent: 'OTHER',
                confidence: winner.confidence,
                entities: {},
                alternatives: scores.slice(0, 3)
            };
        }

        // 4. Identity Entities (Mock/Simple MVP extraction)
        const entities = this.extractEntities(normalizedText, winner.intent);

        return {
            intent: winner.intent,
            confidence: Number(winner.confidence.toFixed(2)),
            entities: entities,
            alternatives: scores.slice(1, 3) // Return runner-ups
        };
    }

    /**
     * Simple entity extraction based on Intent
     * @param {string} text 
     * @param {string} intent 
     */
    extractEntities(text, intent) {
        const entities = {};

        if (intent === 'SCHEDULING' || intent === 'CANCELLATION') {
            // Very naive date/time extraction for MVP
            const dateMatch = text.match(/\b(\d{1,2}\/\d{1,2}|\d{1,2} de [a-z]+|hoje|amanha|amanhã)\b/i);
            if (dateMatch) entities.date = dateMatch[0];

            const timeMatch = text.match(/\b(\d{1,2}:\d{2}|\d{1,2}h|\d{1,2} horas)\b/i);
            if (timeMatch) entities.time = timeMatch[0];
        }

        if (intent === 'PRICE_INQUIRY') {
            if (text.match(/\b(convenio|convênio|unimed|amil|bradesco)\b/i)) {
                entities.hasInsurance = true;
            } else {
                entities.hasInsurance = false;
            }
        }

        return entities;
    }
}

// Singleton
const classifier = new IntentClassifier();

// CLI Testing Support
if (require.main === module) {
    const text = process.argv[2];
    if (text) {
        console.log(`Classifying: "${text}"`);
        const result = classifier.classify(text);
        console.log(JSON.stringify(result, null, 2));
    } else {
        console.log('Usage: node scripts/intent-classifier.js "text to classify"');
        // Run self-test
        console.log('\n--- Running Self-Test ---');
        const examples = [
            "Oi, tudo bem?",
            "Quero marcar uma consulta para amanhã",
            "Quanto custa o clareamento?",
            "Preciso cancelar meu horário",
            "Estou com muita dor de dente",
            "Atendimento péssimo, demorou muito",
            "Batata frita com queijo" // Should happen OTHER
        ];

        examples.forEach(ex => {
            console.log(`\nInput: "${ex}"`);
            console.log(JSON.stringify(classifier.classify(ex), null, 0));
        });
    }
}

module.exports = classifier;
