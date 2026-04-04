import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

export class SkortexMCPDriver {
  private client: Client;
  private transport?: StdioClientTransport;

  constructor(clientName: string = "skortex-client") {
    // Inicializa o MCP SDK oficial
    this.client = new Client(
      {
        name: clientName,
        version: "1.0.0",
      },
      {
        capabilities: {
          prompts: {},
          resources: {},
          tools: {},
        },
      }
    );
  }

  /**
   * Conecta a um servidor MCP local usando stdio (linhas de comando padrão)
   */
  async connectToStdioServer(command: string, args: string[]) {
    console.log(`🔌 Conectando ao MCP Server: ${command} ${args.join(' ')}`);
    this.transport = new StdioClientTransport({
      command,
      args,
    });

    await this.client.connect(this.transport);
    console.log(`✅ Conectado ao servidor MCP com sucesso.`);
  }

  /**
   * Mapeia as ferramentas do servidor MCP para o formato JSON Schema da OpenAI
   * para serem entregues ao LLM na Red Hat.
   */
  async getOpenAITools(): Promise<any[]> {
    const response = await this.client.listTools();
    
    // Converte de MCP Tool Schema para OpenAI Tool Schema
    return response.tools.map((tool: any) => ({
      type: 'function',
      function: {
        name: tool.name,
        description: tool.description,
        parameters: tool.inputSchema, // O inputSchema do MCP é JSON Schema Draft 7, compatível com OAI
      }
    }));
  }

  /**
   * Executa uma ferramenta específica delegando ao servidor MCP local
   */
  async callTool(name: string, args: any): Promise<string> {
    console.log(`🛠️ Executando tool localmente: ${name}`, args);
    try {
      const response = await this.client.callTool({
        name,
        arguments: args,
      });

      // O servidor retorna um array de content [{type: 'text', text: '...'}]
      const content = response.content as any[];
      const textContent = content
        .filter((c: any) => c.type === 'text')
        .map((c: any) => c.text)
        .join('\n');
      
      return textContent;
    } catch (e: any) {
      console.error(`❌ Erro executando tool ${name}:`, e.message);
      return `Erro executando ${name}: ${e.message}`;
    }
  }

  async close() {
    if (this.transport) {
      await this.transport.close();
    }
  }
}
