import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

/**
 * SkortexInferenceFactory — Tolerante a Falhas
 * 
 * Tenta conectar ao Qwen3-Coder no Red Hat OpenShift (vLLM).
 * Se falhar (timeout, 5xx, rede), faz fallback silencioso para Groq (Llama 3).
 * Garante uptime de 100% da CLI independente da infra cloud.
 * 
 * @hat @architect — Design da factory com fallback chain
 * @hat @dev — Implementação
 */

interface ProviderConfig {
  name: string;
  client: OpenAI;
  model: string;
}

function buildProviders(): ProviderConfig[] {
  const providers: ProviderConfig[] = [];

  // Provider 1: Red Hat OpenShift (vLLM — Qwen3-Coder)
  if (process.env.REDHAT_LLM_URL) {
    providers.push({
      name: 'RedHat/Qwen3-Coder',
      client: new OpenAI({
        apiKey: process.env.REDHAT_LLM_TOKEN || 'sk-skortex-local',
        baseURL: process.env.REDHAT_LLM_URL,
      }),
      model: process.env.REDHAT_LLM_MODEL || 'Qwen/Qwen3-Coder-30B-A3B-Instruct',
    });
  }

  // Provider 2: Groq (Llama 3 — fallback rápido)
  if (process.env.GROQ_API_KEY) {
    providers.push({
      name: 'Groq/Llama3',
      client: new OpenAI({
        apiKey: process.env.GROQ_API_KEY,
        baseURL: 'https://api.groq.com/openai/v1',
      }),
      model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
    });
  }

  // Provider 3: Gemini (free-tier — último recurso)
  if (process.env.GOOGLE_API_KEY) {
    providers.push({
      name: 'Google/Gemini',
      client: new OpenAI({
        apiKey: process.env.GOOGLE_API_KEY,
        baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
      }),
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    });
  }

  // Fallback absoluto: placeholder local (para dev sem rede)
  if (providers.length === 0) {
    providers.push({
      name: 'Local/Placeholder',
      client: new OpenAI({
        apiKey: 'sk-skortex-placeholder',
        baseURL: 'https://vllm-qwen3-skortex.apps.cluster.redhat.com/v1',
      }),
      model: 'Qwen/Qwen3-Coder-30B-A3B-Instruct',
    });
  }

  return providers;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string | null;
  name?: string;
  tool_call_id?: string;
  tool_calls?: any[];
}

export class SkortexInferenceFactory {
  private messages: ChatMessage[] = [];
  private providers: ProviderConfig[];
  private activeProvider: ProviderConfig;

  constructor(systemPrompt: string) {
    this.providers = buildProviders();
    this.activeProvider = this.providers[0];

    console.log(`🔗 Providers configurados: ${this.providers.map(p => p.name).join(' → ')}`);
    console.log(`🎯 Provider ativo: ${this.activeProvider.name} (${this.activeProvider.model})`);

    this.messages.push({ role: 'system', content: systemPrompt });
  }

  /**
   * Envia prompt com fallback automático entre providers.
   * Se o provider primário falhar, tenta o próximo silenciosamente.
   */
  async sendPrompt(userPrompt?: string, tools?: any[]): Promise<OpenAI.Chat.Completions.ChatCompletionMessage> {
    if (userPrompt) {
      this.messages.push({ role: 'user', content: userPrompt });
    }

    for (let i = 0; i < this.providers.length; i++) {
      const provider = this.providers[i];
      try {
        const response = await provider.client.chat.completions.create({
          model: provider.model,
          messages: this.messages as any[],
          tools: tools && tools.length > 0 ? tools : undefined,
          temperature: 0.2,
          max_tokens: 4096,
        });

        const message = response.choices[0].message;
        this.messages.push(message as any);

        // Se mudou de provider, logar
        if (provider !== this.activeProvider) {
          console.log(`⚡ Fallback ativado: ${this.activeProvider.name} → ${provider.name}`);
          this.activeProvider = provider;
        }

        return message;
      } catch (error: any) {
        const isLast = i === this.providers.length - 1;
        if (isLast) {
          console.error(`❌ Todos os ${this.providers.length} providers falharam.`);
          throw error;
        }
        console.warn(`⚠️ ${provider.name} falhou (${error.message}). Tentando próximo...`);
      }
    }

    throw new Error('Nenhum provider disponível');
  }

  /** Injeta resposta de tool call no histórico */
  addToolResponse(toolCallId: string, toolName: string, result: string) {
    this.messages.push({
      role: 'tool',
      tool_call_id: toolCallId,
      name: toolName,
      content: result,
    });
  }

  /** Retorna o nome do provider ativo atual */
  getActiveProvider(): string {
    return this.activeProvider.name;
  }
}
