import { describe, expect, it } from "vitest";

import { validateRuntimeEnv } from "../../src/config/env";

describe("validateRuntimeEnv", () => {
  it("accepts valid local configuration", () => {
    const parsed = validateRuntimeEnv({
      APP_ENV: "dev",
      DATABASE_URL:
        "postgresql://groundbreak:change_me_local_only@localhost:5432/groundbreak_dev?schema=public",
    });

    expect(parsed.APP_ENV).toBe("dev");
    expect(parsed.DATABASE_URL).toContain("groundbreak_dev");
  });

  it("rejects missing APP_ENV", () => {
    expect(() =>
      validateRuntimeEnv({
        DATABASE_URL:
          "postgresql://groundbreak:change_me_local_only@localhost:5432/groundbreak_dev?schema=public",
      }),
    ).toThrow("APP_ENV");
  });

  it("rejects non-postgres DATABASE_URL", () => {
    expect(() =>
      validateRuntimeEnv({
        APP_ENV: "test",
        DATABASE_URL: "https://example.com/not-a-db",
      }),
    ).toThrow("DATABASE_URL");
  });
});
