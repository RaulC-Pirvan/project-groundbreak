import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/unit/**/*.test.ts"],
    setupFiles: ["tests/setup/validate-env.ts"],
    coverage: {
      provider: "v8",
    },
    passWithNoTests: true,
  },
});
