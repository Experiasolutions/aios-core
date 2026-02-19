/**
 * @module response-builder
 * @version 1.0.0
 * @purpose Generate WhatsApp-formatted responses based on classified intent.
 *          Uses template system with variable interpolation.
 * @inputs  { intent, entities, session, clinicConfig }
 * @outputs { text: string, buttons?: object[], quickReplies?: string[] }
 * @emits   response:generated
 * @dependencies session-store.js (for context), clinic config
 */

const fs = require('fs');
const path = require('path');

// Default Config if none provided
const DEFAULT_CONFIG = {
    clinicName: "Clínica Experia",
    specialties: ["Clínica Geral", "Cardiologia", "Dermatologia", "Odontologia"],
    contactPhone: "0800-123-4567"
};

// Response Templates
const TEMPLATES = {
    GREETING: [
        "Olá, {name}! 👋 Sou a assistente virtual da *{clinicName}*.\nComo posso te ajudar hoje?\n\n📅 *Agendar consulta*\n❓ *Tirar dúvidas*\n💰 *Valores e convênios*",
        "Oi, {name}! Bem-vindo à *{clinicName}*. 🏥\nEstou aqui para agilizar seu atendimento. O que você precisa?"
    ],
    SCHEDULING: [
        "Ótimo! Vou te ajudar a agendar. 📅\nQual especialidade você precisa?\n\n{specialtiesList}",
        "Para agendar, preciso saber a especialidade. Temos:\n{specialtiesList}\nQual prefere?"
    ],
    CANCELLATION: [
        "Entendi, {name}. Vou verificar sua consulta.\nPode me informar a *data da consulta* que deseja cancelar?",
        "Poxa, que pena. 😕\nPara cancelar, me diga a data ou o nome do médico, por favor."
    ],
    MEDICAL_QUESTION: [
        "Entendo sua preocupação. 🏥\nPara questões médicas, recomendo agendar uma consulta com um especialista.\n\nQuer que eu verifique horários disponíveis?\n\n⚠️ *Em caso de emergência, dirija-se ao pronto-socorro imediatamente.*"
    ],
    COMPLAINT: [
        "Lamento pelo ocorrido, {name}. 😔\nSua satisfação é muito importante para nós. Vou registrar sua reclamação e nossa equipe de atendimento vai entrar em contato em até 24h.\n\nPode me contar mais detalhes do que aconteceu?"
    ],
    PRICE_INQUIRY: [
        "Nossos valores variam por procedimento.\n\nAceitamos:\n✅ Convênios (Unimed, Bradesco, SulAmérica)\n✅ Particular (Dinheiro, PIX, Cartão)\n\nQuer agendar uma avaliação para um orçamento preciso?"
    ],
    OTHER: [
        "Hmm, não tenho certeza se entendi. 🤔\n\nPosso te ajudar com:\n📅 *Agendamento*\n❓ *Informações*\n💰 *Valores*\n\nOu prefere falar com um atendente humano?",
        "Desculpe, ainda estou aprendendo. 😅\nVocê quer *agendar*, *cancelar* ou *falar sobre valores*?"
    ]
};

class ResponseBuilder {
    constructor() {
        this.config = this.loadConfig();
    }

    loadConfig() {
        // Try to load from squads/experia/config/clinic.json
        const configPath = path.join(__dirname, '..', 'clients', 'experia', 'config', 'clinic.json');
        if (fs.existsSync(configPath)) {
            try {
                return { ...DEFAULT_CONFIG, ...JSON.parse(fs.readFileSync(configPath, 'utf8')) };
            } catch (e) {
                console.error("Error loading clinic config, using default:", e);
            }
        }
        return DEFAULT_CONFIG;
    }

    /**
     * Build a response object based on intent
     * @param {string} intent 
     * @param {object} entities 
     * @param {object} session 
     * @returns {object} { text }
     */
    build(intent, entities = {}, session = {}) {
        const templateList = TEMPLATES[intent] || TEMPLATES['OTHER'];

        // Pick random template for variety
        let template = templateList[Math.floor(Math.random() * templateList.length)];

        // Interpolate variables
        const name = session.metadata?.pushName || session.metadata?.name || "Visitante";
        const specialtiesList = this.config.specialties.map(s => `• ${s}`).join('\n');

        let text = template
            .replace(/{name}/g, name)
            .replace(/{clinicName}/g, this.config.clinicName)
            .replace(/{contactPhone}/g, this.config.contactPhone)
            .replace(/{specialtiesList}/g, specialtiesList);

        // Context-aware adjustments
        if (intent === 'PRICE_INQUIRY' && entities.hasInsurance) {
            text += "\n\n(Vi que você perguntou sobre convênio. Sim, aceitamos!)";
        }

        if (entities.date) {
            text += `\n\n(Entendido: ${entities.date})`;
        }

        return { text };
    }
}

// Singleton
const responseBuilder = new ResponseBuilder();

// CLI Test
if (require.main === module) {
    const args = process.argv.slice(2); // intent, name
    const intent = args[0] || 'GREETING';
    const name = args[1] || 'Gabriel';

    console.log(`Building response for Intent: ${intent}, User: ${name}`);
    const res = responseBuilder.build(intent, {}, { metadata: { pushName: name } });
    console.log('\n--- RESPONSE ---');
    console.log(res.text);
    console.log('----------------');
}

module.exports = responseBuilder;
