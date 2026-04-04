import { SkortexInferenceFactory } from "./llm-client";
import { SkortexMCPDriver } from "./mcp-driver";
import readline from "readline";
import path from "path";

/**
 * Skortex CLI v1.0 — Orquestrador Autônomo com Memória Nativa
 * 
 * @hat @architect — Design do Pre-Flight Engine e Autopilot Save
 * @hat @dev — Implementação do Agent Loop
 * 
 * Fluxo:
 * 1. Conecta ao MCP Server KAIROS (28 tools)
 * 2. PRE-FLIGHT: Lê STATUS.md + Hivemind decisions automaticamente
 * 3. REPL: Loop agentic (prompt → LLM → tools → response)
 * 4. AUTOPILOT SAVE: Ao sair, loga a sessão no Hivemind
 */

const SYSTEM_PROMPT = `Você é o Skortex Engine — um agente autônomo de código e infraestrutura.
Você opera no ecossistema KAIROS (AIOX Core v2.1, 21 squads, 204 tasks, 52+ RPs).
Seu host é o PC do operador Gabriel Ferreira (Experia Solutions).

REGRAS:
- Use as tools MCP disponíveis para TODA operação de arquivo, contexto e sistema.
- Siga o Engine Triage v4 internamente (classificar → executar → validar).
- Responda em português quando o operador falar em português.
- Seja conciso, pragmático, e focado em execução.

CONTEXTO PRE-FLIGHT (injetado automaticamente):
`;

async function preFlight(mcpDriver: SkortexMCPDriver): Promise<string> {
  console.log("📡 [Pre-Flight] Carregando contexto automaticamente...");
  let context = "";

  try {
    // Lê STATUS.md via MCP kairos_read_context
    const statusResult = await mcpDriver.callTool("kairos_read_context", { file: "status" });
    context += `\n--- STATUS.md ---\n${statusResult.substring(0, 2000)}\n`;
    console.log("  ✅ STATUS.md carregado");
  } catch (e) {
    console.log("  ⚠️ STATUS.md indisponível via MCP, continuando...");
  }

  try {
    // Lê as últimas 10 decisões do Hivemind
    const hivemindResult = await mcpDriver.callTool("hivemind_read_decisions", { limit: 10 });
    context += `\n--- Hivemind Decisions (últimas 10) ---\n${hivemindResult.substring(0, 2000)}\n`;
    console.log("  ✅ Hivemind decisions sincronizadas");
  } catch (e) {
    console.log("  ⚠️ Hivemind indisponível, continuando...");
  }

  return context;
}

async function autopilotSave(mcpDriver: SkortexMCPDriver, sessionSummary: string) {
  console.log("\n💾 [Autopilot Save] Persistindo sessão no Hivemind...");

  try {
    await mcpDriver.callTool("hivemind_log_decision", {
      agent: "skortex-cli",
      type: "event",
      summary: `Sessão Skortex CLI encerrada: ${sessionSummary.substring(0, 200)}`,
      context: "Auto-save via Autopilot Save protocol",
      affects: ["all-agents"],
    });
    console.log("  ✅ Sessão logada no Hivemind com sucesso");
  } catch (e) {
    console.log("  ⚠️ Falha ao logar no Hivemind (sessão não perdida — apenas não propagada)");
  }

  try {
    await mcpDriver.callTool("hivemind_update_state", {
      agent_id: "skortex-cli",
      status: "idle",
      focus: "Sessão encerrada",
    });
  } catch (e) {
    // Silencioso — não é crítico
  }
}

async function main() {
  console.log("╔══════════════════════════════════════════════════╗");
  console.log("║     🚀 SKORTEX ENGINE — CLI v1.0                ║");
  console.log("║     Local-First AI Agent · MCP Protocol          ║");
  console.log("╚══════════════════════════════════════════════════╝\n");

  // 1. Instancia o MCP Driver
  const mcpDriver = new SkortexMCPDriver();

  // 2. Conecta ao MCP Server KAIROS (28 tools)
  const serverPath = path.resolve(__dirname, '../../scripts/mcp-server.js');
  try {
    await mcpDriver.connectToStdioServer('node', [serverPath]);
  } catch (err) {
    console.error("❌ Falha ao subir MCP Driver. Verifique scripts/mcp-server.js");
    console.error(err);
    process.exit(1);
  }

  // 3. PRE-FLIGHT ENGINE — Auto-contexto ao iniciar
  const preFlightContext = await preFlight(mcpDriver);
  const fullSystemPrompt = SYSTEM_PROMPT + preFlightContext;

  // 4. Instancia o LLM com fallback chain
  const llm = new SkortexInferenceFactory(fullSystemPrompt);

  // 5. Registra ativação no Hivemind
  try {
    await mcpDriver.callTool("hivemind_update_state", {
      agent_id: "skortex-cli",
      status: "active",
      focus: "Sessão interativa via terminal",
    });
  } catch (e) {
    // Silencioso
  }

  // 6. REPL
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const question = (q: string): Promise<string> => new Promise((res) => rl.question(q, res));

  console.log(`\n✅ Skortex Engine pronto. Provider: ${llm.getActiveProvider()}`);
  console.log("   Ferramentas MCP pareadas. Digite seu comando ou 'exit'.\n");

  const sessionLog: string[] = [];

  while (true) {
    const input = await question("[Skortex] ❯ ");
    if (input.toLowerCase() === "exit") break;
    if (!input.trim()) continue;

    sessionLog.push(input);

    try {
      console.log(`\n⏳ Processando via ${llm.getActiveProvider()}...`);
      const tools = await mcpDriver.getOpenAITools();
      let response = await llm.sendPrompt(input, tools);

      // Agent Loop — Iteração de tool calls
      let iterations = 0;
      const MAX_ITERATIONS = 15;

      while (response.tool_calls && response.tool_calls.length > 0 && iterations < MAX_ITERATIONS) {
        iterations++;
        console.log(`  🛠️ Executando ${response.tool_calls.length} tool(s) [iteração ${iterations}]...`);

        for (const tc of response.tool_calls) {
          try {
            const args = JSON.parse(tc.function.arguments);
            const result = await mcpDriver.callTool(tc.function.name, args);
            llm.addToolResponse(tc.id, tc.function.name, result);
          } catch (toolErr: any) {
            llm.addToolResponse(tc.id, tc.function.name, `Erro: ${toolErr.message}`);
          }
        }

        response = await llm.sendPrompt();
      }

      if (iterations >= MAX_ITERATIONS) {
        console.log("  ⚠️ Limite de iterações atingido (15). Parando agent loop.");
      }

      if (response.content) {
        console.log(`\n🧠 ${response.content}\n`);
      }
    } catch (e: any) {
      console.error(`\n❌ Erro: ${e.message}\n`);
    }
  }

  // 7. AUTOPILOT SAVE — Persistir sessão
  const summary = sessionLog.length > 0
    ? `${sessionLog.length} comandos. Último: "${sessionLog[sessionLog.length - 1]}"`
    : "Sessão vazia";
  await autopilotSave(mcpDriver, summary);

  await mcpDriver.close();
  rl.close();
  console.log("\n👋 Skortex desativado. Sessão salva no Hivemind.\n");
}

main().catch(console.error);
