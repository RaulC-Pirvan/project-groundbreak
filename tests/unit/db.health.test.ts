import { describe, expect, it } from "vitest";

import { checkDbHealth, getDbHealthHttpStatus } from "../../src/lib/db/health";

describe("checkDbHealth", () => {
  it("returns ok when probe succeeds", async () => {
    const result = await checkDbHealth({
      timeoutMs: 100,
      probe: async () => {
        return;
      },
    });

    expect(result.status).toBe("ok");
    expect(result.service).toBe("database");
    expect(result.message).toBe("Database connectivity probe succeeded.");
    expect(typeof result.timestamp).toBe("string");
  });

  it("returns degraded on probe failure without leaking error details", async () => {
    const result = await checkDbHealth({
      timeoutMs: 100,
      probe: async () => {
        throw new Error("password=super-secret");
      },
    });

    expect(result.status).toBe("degraded");
    expect(result.message).toBe("Database connectivity probe failed.");
    expect(result.message).not.toContain("super-secret");
  });

  it("returns degraded on timeout", async () => {
    const result = await checkDbHealth({
      timeoutMs: 10,
      probe: async () => new Promise(() => {}),
    });

    expect(result.status).toBe("degraded");
    expect(result.message).toBe("Database connectivity probe timed out.");
  });
});

describe("getDbHealthHttpStatus", () => {
  it("maps ok to 200", () => {
    expect(getDbHealthHttpStatus("ok")).toBe(200);
  });

  it("maps degraded to 503", () => {
    expect(getDbHealthHttpStatus("degraded")).toBe(503);
  });
});
