import { NextResponse } from "next/server";

import { checkDbHealth, getDbHealthHttpStatus } from "@/lib/db/health";

export const runtime = "nodejs";

const DB_HEALTH_TIMEOUT_MS = 2000;

export async function GET() {
  const payload = await checkDbHealth({
    timeoutMs: DB_HEALTH_TIMEOUT_MS,
  });

  return NextResponse.json(payload, {
    status: getDbHealthHttpStatus(payload.status),
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
