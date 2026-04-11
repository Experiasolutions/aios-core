import fs from "node:fs/promises";
import path from "node:path";
import { logger } from "../utils/logger.js";
import { NotFoundError } from "../utils/errors.js";

const KAIROS_ROOT = path.resolve(process.cwd(), "..");

export class AioxService {
  async listSquads() {
    const squadsDir = path.join(KAIROS_ROOT, "squads");
    logger.debug(`Lendo squads de ${squadsDir}`);
    try {
      const files = await fs.readdir(squadsDir);
      return files.filter((f) => f.endsWith(".md")).map((f) => f.replace(".md", ""));
    } catch (e) {
      logger.warn("Pasta squads não encontrada", { error: e });
      return [];
    }
  }

  async listAgents(squad: string) {
    const agentsDir = path.join(KAIROS_ROOT, ".agents");
    try {
      const files = await fs.readdir(agentsDir);
      return files.filter((f) => f.endsWith(".md")).map((f) => f.replace(".md", ""));
    } catch (e) {
      try {
        const fallBackDir = path.join(KAIROS_ROOT, ".agent");
        const fallbackFiles = await fs.readdir(fallBackDir);
        return fallbackFiles.filter((f) => f.endsWith(".md")).map((f) => f.replace(".md", ""));
      } catch (ex) {
        return [];
      }
    }
  }

  async getAgent(squad: string, agentId: string) {
    const defaultPath = path.join(KAIROS_ROOT, ".agents", `${agentId}.md`);
    const fallbackPath = path.join(KAIROS_ROOT, ".agent", `${agentId}.md`);
    
    try {
      return await fs.readFile(defaultPath, "utf-8");
    } catch {
      try {
        return await fs.readFile(fallbackPath, "utf-8");
      } catch {
        throw new NotFoundError("Agente", agentId);
      }
    }
  }

  async listSkills() {
    const skillsDir = path.join(KAIROS_ROOT, "tools", "integrations");
    try {
      const entries = await fs.readdir(skillsDir, { withFileTypes: true });
      return entries.filter(e => e.isDirectory()).map(e => e.name);
    } catch {
      return [];
    }
  }

  async readSkill(skillId: string) {
    const skillPath = path.join(KAIROS_ROOT, "tools", "integrations", skillId, "SKILL.md");
    try {
      return await fs.readFile(skillPath, "utf-8");
    } catch {
      throw new NotFoundError("Skill", skillId);
    }
  }
}

export const aioxService = new AioxService();
