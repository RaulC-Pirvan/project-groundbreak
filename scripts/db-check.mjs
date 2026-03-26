import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import pg from "pg";
import { z } from "zod";

const envSchema = z.object({
  APP_ENV: z.enum(["dev", "test", "prod"], {
    error: "APP_ENV must be one of: dev, test, prod.",
  }),
  DATABASE_URL: z
    .string({
      error: "DATABASE_URL is required.",
    })
    .url("DATABASE_URL must be a valid URL.")
    .refine(
      (value) => value.startsWith("postgresql://") || value.startsWith("postgres://"),
      "DATABASE_URL must start with postgresql:// or postgres://.",
    ),
});

function printActionableFailure(error) {
  const code =
    typeof error === "object" && error !== null && "code" in error ? String(error.code) : undefined;
  const message = error instanceof Error ? error.message : String(error);

  console.error("[db:check] Failed to connect to database.");
  if (code) {
    console.error(`[db:check] Prisma error code: ${code}`);
  }
  console.error(`[db:check] Details: ${message}`);

  if (
    code === "P1001" ||
    /can't reach database server|econnrefused|connection refused/i.test(message)
  ) {
    console.error(
      "[db:check] Possible cause: PostgreSQL container is not running or port mapping is blocked.",
    );
    console.error("[db:check] Try:");
    console.error("  1) docker compose up -d postgres");
    console.error("  2) docker compose ps");
    console.error("  3) docker compose logs -f postgres");
    console.error("  4) Ensure no local process is already using port 5432");
    return;
  }

  if (code === "P1000" || /authentication failed|password authentication failed/i.test(message)) {
    console.error("[db:check] Possible cause: Invalid database username/password in DATABASE_URL.");
    console.error("[db:check] Try:");
    console.error("  1) Verify DATABASE_URL in .env");
    console.error("  2) Verify POSTGRES_USER/POSTGRES_PASSWORD in docker-compose context");
    console.error("  3) Restart postgres after updating credentials");
    return;
  }

  if (code === "P1003" || /database .* does not exist/i.test(message)) {
    console.error("[db:check] Possible cause: Target database does not exist yet.");
    console.error("[db:check] Try:");
    console.error("  1) Ensure docker postgres service is up");
    console.error("  2) Run: npm run db:migrate -- --name init_verify");
    return;
  }

  console.error("[db:check] Next step: inspect DATABASE_URL and postgres container logs.");
}

async function main() {
  const parsed = envSchema.safeParse({
    APP_ENV: process.env.APP_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
  });

  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    console.error("[db:check] Invalid environment configuration.");
    console.error(details);
    console.error("[db:check] Use .env.example as baseline and retry.");
    process.exit(1);
  }

  const pool = new pg.Pool({
    connectionString: parsed.data.DATABASE_URL,
  });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });
  const startedAt = Date.now();

  try {
    await prisma.$queryRaw`SELECT 1`;
    const elapsedMs = Date.now() - startedAt;
    console.log(`[db:check] Success. PostgreSQL reachable via Prisma in ${elapsedMs}ms.`);
  } catch (error) {
    printActionableFailure(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
