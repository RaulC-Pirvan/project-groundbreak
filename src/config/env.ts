import { z } from "zod";

const appEnvSchema = z.enum(["dev", "test", "prod"], {
  error: "APP_ENV must be one of: dev, test, prod.",
});

const databaseUrlSchema = z
  .string({
    error: "DATABASE_URL is required.",
  })
  .url("DATABASE_URL must be a valid URL.")
  .refine(
    (value) => value.startsWith("postgresql://") || value.startsWith("postgres://"),
    "DATABASE_URL must start with postgresql:// or postgres://.",
  );

const runtimeEnvSchema = z.object({
  APP_ENV: appEnvSchema,
  DATABASE_URL: databaseUrlSchema,
});

export type RuntimeEnv = z.infer<typeof runtimeEnvSchema>;

export function validateRuntimeEnv(
  input: Record<string, string | undefined> = process.env,
): RuntimeEnv {
  const parsed = runtimeEnvSchema.safeParse({
    APP_ENV: input.APP_ENV,
    DATABASE_URL: input.DATABASE_URL,
  });

  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => {
        const key = issue.path.join(".") || "env";
        return `${key}: ${issue.message}`;
      })
      .join("\n");

    throw new Error(
      `Invalid runtime environment configuration.\n${details}\nUpdate your .env using .env.example as a baseline.`,
    );
  }

  return parsed.data;
}
