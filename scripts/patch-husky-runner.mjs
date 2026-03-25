import fs from "node:fs";
import path from "node:path";

const runnerPath = path.resolve(process.cwd(), ".husky", "_", "h");
const huskyInternalDir = path.resolve(process.cwd(), ".husky", "_");

if (!fs.existsSync(runnerPath)) {
  process.exit(0);
}

const original = fs.readFileSync(runnerPath, "utf8");

const pattern = /sh -e "\$s" "\$@"\r?\nc=\$\?/;
if (!pattern.test(original)) {
  process.exit(0);
}

const patched = original.replace(
  pattern,
  ["(", "  set -e", '  . "$s" "$@"', ")", "c=$?"].join("\n"),
);

fs.writeFileSync(runnerPath, patched, "utf8");

// Patch generated hook shebangs for Windows compatibility.
// `#!/usr/bin/env sh` may resolve to WSL app aliases on some systems.
if (fs.existsSync(huskyInternalDir)) {
  for (const entry of fs.readdirSync(huskyInternalDir)) {
    const filePath = path.join(huskyInternalDir, entry);
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) {
      continue;
    }

    const content = fs.readFileSync(filePath, "utf8");
    if (content.startsWith("#!/usr/bin/env sh")) {
      const updated = content.replace("#!/usr/bin/env sh", "#!/bin/sh");
      fs.writeFileSync(filePath, updated, "utf8");
    }
  }
}
