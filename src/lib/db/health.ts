import { prisma } from "./client";

export type DbHealthStatus = "ok" | "degraded";

export type DbHealthPayload = {
  service: "database";
  status: DbHealthStatus;
  timestamp: string;
  message: string;
  latencyMs: number;
  timeoutMs: number;
};

type DbHealthOptions = {
  timeoutMs?: number;
  probe?: () => Promise<unknown>;
};

const DEFAULT_TIMEOUT_MS = 2000;

class DbHealthTimeoutError extends Error {
  constructor(timeoutMs: number) {
    super(`Database probe timed out after ${timeoutMs}ms.`);
    this.name = "DbHealthTimeoutError";
  }
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new DbHealthTimeoutError(timeoutMs)), timeoutMs);

    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
}

async function prismaConnectivityProbe(): Promise<void> {
  await prisma.$queryRaw`SELECT 1`;
}

export function getDbHealthHttpStatus(status: DbHealthStatus): 200 | 503 {
  return status === "ok" ? 200 : 503;
}

export async function checkDbHealth(options: DbHealthOptions = {}): Promise<DbHealthPayload> {
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const probe = options.probe ?? prismaConnectivityProbe;
  const startedAt = Date.now();

  try {
    await withTimeout(probe(), timeoutMs);
    return {
      service: "database",
      status: "ok",
      timestamp: new Date().toISOString(),
      message: "Database connectivity probe succeeded.",
      latencyMs: Date.now() - startedAt,
      timeoutMs,
    };
  } catch (error) {
    const isTimeout = error instanceof DbHealthTimeoutError;
    return {
      service: "database",
      status: "degraded",
      timestamp: new Date().toISOString(),
      message: isTimeout
        ? "Database connectivity probe timed out."
        : "Database connectivity probe failed.",
      latencyMs: Date.now() - startedAt,
      timeoutMs,
    };
  }
}
