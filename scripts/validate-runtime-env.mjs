const allowedAppEnv = new Set(["dev", "test", "prod"]);

const appEnv = process.env.APP_ENV;
const databaseUrl = process.env.DATABASE_URL;
const errors = [];

if (!allowedAppEnv.has(appEnv ?? "")) {
  errors.push("APP_ENV: APP_ENV must be one of: dev, test, prod.");
}

if (!databaseUrl) {
  errors.push("DATABASE_URL: DATABASE_URL is required.");
} else {
  try {
    const parsed = new URL(databaseUrl);

    if (parsed.protocol !== "postgresql:" && parsed.protocol !== "postgres:") {
      errors.push("DATABASE_URL: DATABASE_URL must start with postgresql:// or postgres://.");
    }
  } catch {
    errors.push("DATABASE_URL: DATABASE_URL must be a valid URL.");
  }
}

if (errors.length > 0) {
  console.error("Invalid runtime environment configuration.");
  for (const error of errors) {
    console.error(error);
  }
  console.error("Update your .env using .env.example as a baseline.");
  process.exit(1);
}
