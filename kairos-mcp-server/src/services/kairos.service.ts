import fs from "node:fs/promises";
import path from "node:path";
import { logger } from "../utils/logger.js";
import { NotFoundError } from "../utils/errors.js";

const KAIROS_ROOT = path.resolve(process.cwd(), "..");

export class KairosService {
  async health() {
    return {
      status: "online",
      version: "3.1 KAIROX Engine",
      timestamp: new Date().toISOString(),
    };
  }

  async readContext(file: string = "both") {
    const result: Record<string, string> = {};
    if (file === "self_context" || file === "both") {
      try {
        result.self_context = await fs.readFile(path.join(KAIROS_ROOT, "SELF_CONTEXT.md"), "utf-8");
      } catch (e) {
        logger.warn("SELF_CONTEXT.md não encontrado");
      }
    }
    if (file === "status" || file === "both") {
      try {
        result.status = await fs.readFile(path.join(KAIROS_ROOT, "STATUS.md"), "utf-8");
      } catch (e) {
        logger.warn("STATUS.md não encontrado");
      }
    }
    return result;
  }

  async exploreArsenal(category: string = "all") {
    const targetDir = category === "all" ? path.join(KAIROS_ROOT, "scripts") : path.join(KAIROS_ROOT, "scripts", category);
    try {
      const files = await fs.readdir(targetDir);
      return files;
    } catch {
      return [];
    }
  }

  async readScript(scriptPath: string) {
    try {
      return await fs.readFile(path.join(KAIROS_ROOT, scriptPath), "utf-8");
    } catch {
      throw new NotFoundError("Script", scriptPath);
    }
  }

  async skyrosIsolation(action: string = "engage") {
    logger.info(`SKYROS Isolation mode: ${action}`);
    return { status: "success", mode: action };
  }

  async skyrosTriage() {
    logger.info("SKYROS Morning Triage executed");
    return { status: "success", action: "triage" };
  }
}

export const kairosService = new KairosService();
