import { z } from "zod";

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1),
  DATABASE_POOL_MAX: z.coerce.number().int().min(1).max(10).default(4),
  APP_URL: z.url().default("http://localhost:3000"),
  JWT_SECRET: z.string().min(24),
  NEXT_PUBLIC_SUPABASE_URL: z.string().optional().default(""),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().optional().default(""),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional().default(""),
  UPLOAD_MAX_MB: z.coerce.number().int().positive().default(10),
});

let cachedEnv: z.infer<typeof serverEnvSchema> | null = null;

export function getServerEnv() {
  if (cachedEnv) {
    return cachedEnv;
  }

  cachedEnv = serverEnvSchema.parse({
    DATABASE_URL: process.env["DATABASE_URL"],
    DATABASE_POOL_MAX: process.env["DATABASE_POOL_MAX"] ?? "4",
    APP_URL: process.env["APP_URL"],
    JWT_SECRET: process.env["JWT_SECRET"],
    NEXT_PUBLIC_SUPABASE_URL: process.env["NEXT_PUBLIC_SUPABASE_URL"],
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env["NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"],
    SUPABASE_SERVICE_ROLE_KEY: process.env["SUPABASE_SERVICE_ROLE_KEY"],
    UPLOAD_MAX_MB: process.env["UPLOAD_MAX_MB"] ?? "10",
  });

  return cachedEnv;
}

export function getBaseUrl() {
  const envUrl = getServerEnv().APP_URL.replace(/\/$/, "");

  if (process.env["VERCEL_URL"] && (!envUrl || envUrl === "http://localhost:3000")) {
    return `https://${process.env["VERCEL_URL"]}`;
  }

  return envUrl;
}

export function hasSupabaseConfig() {
  const env = getServerEnv();
  return Boolean(env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
}

export function hasSupabaseAdminConfig() {
  const env = getServerEnv();
  return hasSupabaseConfig() && Boolean(env.SUPABASE_SERVICE_ROLE_KEY);
}
