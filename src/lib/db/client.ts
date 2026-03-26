import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

type GlobalPrismaState = {
  __groundbreakPrisma?: PrismaClient;
  __groundbreakPool?: Pool;
};

const globalState = globalThis as typeof globalThis & GlobalPrismaState;

function getDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return databaseUrl;
}

function getPool(): Pool {
  if (!globalState.__groundbreakPool) {
    globalState.__groundbreakPool = new Pool({
      connectionString: getDatabaseUrl(),
    });
  }

  return globalState.__groundbreakPool;
}

function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    adapter: new PrismaPg(getPool()),
  });
}

export const prisma = globalState.__groundbreakPrisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalState.__groundbreakPrisma = prisma;
}
