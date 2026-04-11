import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: z.string().optional(),
  API_BASE_URL: z.string().url().optional(),
  API_KEY: z.string().min(1, "API_KEY é obrigatória").optional(),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
});

// Falha imediatamente se variáveis obrigatórias estiverem ausentes
export const env = envSchema.parse(process.env);
