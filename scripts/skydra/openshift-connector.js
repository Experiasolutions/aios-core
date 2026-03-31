/**
 * SKYDRA: OPENSHIFT AI CONNECTOR
 * Objetivo: Polipreencher as chamadas do AIOX e Agentes N8N para consumirem Llama-3 (ou similares)
 * gratuitamente no hub da Red Hat OpenShift, aliviando tokens pagos (Opus/Gemini) em automações.
 */

const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

class OpenShiftInferenceManager {
    constructor() {
        // As chaves criadas pelo Operador
        this.baseRoute = process.env.OPENSHIFT_SERVER_URL || 'https://api.rm2.thpm.p1.openshiftapps.com:6443';
        this.token = process.env.OPENSHIFT_API_TOKEN;
        
        // Exemplo: No Red Hat OpenShift AI (Model Serving), as rotas vLLM/TGI geralmente seguem essa padronização:
        this.inferenceEndpoint = process.env.OPENSHIFT_INFERENCE_ROUTE || `${this.baseRoute}/v1/chat/completions`; 

        if (!this.token) {
            console.warn("[SKYDRA-ALERT] OPENSHIFT_API_TOKEN não encontrado no .env.");
        }
    }

    /**
     * Compatível com V1/Chat Completions (Padrão OpenAI). 
     * Orquestradores como Cursor, Cline ou o N8N podem usar esse Manager para inferência free.
     */
    async executePrompt(systemPrompt, userPrompt, modelName = 'llama-3-8b-instruct') {
        try {
            console.log(`[SKYDRA-OPENSHIFT] Disparando contexto para a nuvem da Red Hat (${modelName})...`);

            const payload = {
                model: modelName,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                max_tokens: 2048,
                temperature: 0.4
            };

            const response = await axios.post(this.inferenceEndpoint, payload, {
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                }
            });

            return {
                status: "success",
                content: response.data.choices[0].message.content,
                usage: response.data.usage // Tokens que não serão cobrados em dólar
            };

        } catch (error) {
            console.error("[SKYDRA-ERRO] Falha no Cluster Red Hat: ", error.response?.data || error.message);
            return {
                status: "failed",
                content: null
            };
        }
    }
}

module.exports = OpenShiftInferenceManager;

// Teste Isolado se rodado via linha de comando
if (require.main === module) {
    const rh = new OpenShiftInferenceManager();
    rh.executePrompt("Você é um arquiteto corporativo.", "Defina Microserviços Red Hat em 1 frase.")
      .then(res => console.log(res));
}
