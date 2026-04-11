import { kairosService } from "../services/kairos.service.js";

export const kairosTools = [
  {
    name: "kairos_health",
    description: "Full KAIROS system health check",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "kairos_read_context",
    description: "Lê SELF_CONTEXT.md e STATUS.md para continuidade da sessão",
    inputSchema: {
      type: "object",
      properties: { file: { type: "string", description: "self_context, status, or both" } },
    },
  },
  {
    name: "kairos_explore_arsenal",
    description: "Lista scripts do arsenal",
    inputSchema: {
      type: "object",
      properties: { category: { type: "string" } },
    },
  },
  {
    name: "kairos_read_script",
    description: "Lê código fonte de utilitários no arsenal",
    inputSchema: {
      type: "object",
      properties: { path: { type: "string" } },
      required: ["path"],
    },
  },
  {
    name: "skyros_isolation",
    description: "Ativa ou desativa Modo Deep Work",
    inputSchema: {
      type: "object",
      properties: { action: { type: "string" } },
    },
  },
  {
    name: "skyros_triage",
    description: "Executa a Triage Matinal",
    inputSchema: { type: "object", properties: {} },
  },
];

export const kairosHandlers: Record<string, Function> = {
  kairos_health: async () => await kairosService.health(),
  kairos_read_context: async (args: any) => await kairosService.readContext(args.file),
  kairos_explore_arsenal: async (args: any) => await kairosService.exploreArsenal(args.category),
  kairos_read_script: async (args: any) => await kairosService.readScript(args.path),
  skyros_isolation: async (args: any) => await kairosService.skyrosIsolation(args.action),
  skyros_triage: async () => await kairosService.skyrosTriage(),
};
