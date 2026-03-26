import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const tempDir = path.resolve(process.cwd(), ".tmp", "pw-temp");
fs.mkdirSync(tempDir, { recursive: true });

const env = {
  ...process.env,
  TMPDIR: tempDir,
  TMP: tempDir,
  TEMP: tempDir,
};

const cliPath = path.resolve(process.cwd(), "node_modules", "@playwright", "test", "cli.js");

const args = [cliPath, "test", ...process.argv.slice(2)];
const child = spawn(process.execPath, args, { stdio: "inherit", env });

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
