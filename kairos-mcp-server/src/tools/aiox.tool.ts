import { aioxService } from "../services/aiox.service.js";

export const aioxTools = [
  {
    name: "aios_list_squads",
    description: "Lista todos os squads disponíveis",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "aios_list_agents",
    description: "Lista todos os agentes (opcionalmente por squad)",
    inputSchema: {
      type: "object",
      properties: { squad: { type: "string" } },
      required: ["squad"],
    },
  },
  {
    name: "aios_get_agent",
    description: "Lê todo o conteúdo de um agente específico",
    inputSchema: {
      type: "object",
      properties: { squad: { type: "string" }, agent: { type: "string" } },
      required: ["squad", "agent"],
    },
  },
  {
    name: "aios_list_skills",
    description: "Lista as integrações (skills) disponíveis em tools/integrations",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "aios_read_skill",
    description: "Lê a documentação SKILL.md de uma skill específica",
    inputSchema: {
      type: "object",
      properties: { skill_id: { type: "string" } },
      required: ["skill_id"],
    },
  },
];

export const aioxHandlers: Record<string, Function> = {
  aios_list_squads: async () => await aioxService.listSquads(),
  aios_list_agents: async (args: any) => await aioxService.listAgents(args.squad),
  aios_get_agent: async (args: any) => await aioxService.getAgent(args.squad, args.agent),
  aios_list_skills: async () => await aioxService.listSkills(),
  aios_read_skill: async (args: any) => await aioxService.readSkill(args.skill_id),
};
