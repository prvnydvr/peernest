import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { getServerEnv } from "@/lib/env";

declare global {
  var __peernest_prisma__: PrismaClient | undefined;
}

function createPrismaClient() {
  const env = getServerEnv();

  return new PrismaClient({
    adapter: new PrismaPg({ connectionString: env.DATABASE_URL, max: env.DATABASE_POOL_MAX }),
  });
}

export const db = globalThis.__peernest_prisma__ ?? createPrismaClient();

if (process.env["NODE_ENV"] !== "production") {
  globalThis.__peernest_prisma__ = db;
}
