import { hivemindService } from "../services/hivemind.service.js";

export const hivemindTools = [
  {
    name: "hivemind_read_decisions",
    description: "Lê as últimas decisões da memória compartilhada",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number" },
        filter_agent: { type: "string" },
        filter_type: { type: "string" }
      }
    }
  },
  {
    name: "hivemind_log_decision",
    description: "Registra uma decisão, artefato ou evento no log da Hivemind",
    inputSchema: {
      type: "object",
      properties: {
        agent: { type: "string" },
        type: { type: "string" },
        summary: { type: "string" },
        context: { type: "string" },
        affects: { type: "array", items: { type: "string" } }
      },
      required: ["agent", "type", "summary"]
    }
  },
  {
    name: "hivemind_assign_task",
    description: "Designa uma tarefa a um agente",
    inputSchema: {
      type: "object",
      properties: {
        from_agent: { type: "string" },
        to_agent: { type: "string" },
        task: { type: "string" },
        priority: { type: "string" }
      },
      required: ["from_agent", "to_agent", "task"]
    }
  },
  {
    name: "hivemind_read_states",
    description: "Lê o estado atual de todos os agentes",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "hivemind_update_state",
    description: "Atualiza o estado atual de um agente",
    inputSchema: {
      type: "object",
      properties: {
        agent_id: { type: "string" },
        status: { type: "string" },
        focus: { type: "string" },
        chat_id: { type: "string" },
        machine: { type: "string" }
      },
      required: ["agent_id", "status", "focus"]
    }
  }
];

export const hivemindHandlers: Record<string, Function> = {
  hivemind_read_decisions: async (args: any) => await hivemindService.readDecisions(args.limit, args.filter_agent, args.filter_type),
  hivemind_log_decision: async (args: any) => await hivemindService.logDecision(args.agent, args.type, args.summary, args.context, args.affects),
  hivemind_assign_task: async (args: any) => await hivemindService.assignTask(args.from_agent, args.to_agent, args.task, args.priority),
  hivemind_read_states: async () => await hivemindService.readStates(),
  hivemind_update_state: async (args: any) => await hivemindService.updateState(args.agent_id, args.status, args.focus, args.chat_id, args.machine)
};
