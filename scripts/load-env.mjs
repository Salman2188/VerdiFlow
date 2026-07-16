import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

export function loadEnvFile(path) {
  if (!existsSync(path)) return {};
  return Object.fromEntries(
    readFileSync(path, "utf8")
      .split("\n")
      .filter((line) => line && !line.startsWith("#"))
      .map((line) => {
        const idx = line.indexOf("=");
        return [line.slice(0, idx).trim(), line.slice(idx + 1).trim().replace(/^"|"$/g, "")];
      })
      .filter(([key]) => key),
  );
}

export function loadProjectEnv() {
  const root = process.cwd();
  const env = {
    ...loadEnvFile(resolve(root, ".env.local")),
    ...loadEnvFile(resolve(root, ".env")),
    ...process.env,
  };

  for (const [key, value] of Object.entries(env)) {
    if (value && !process.env[key]) {
      process.env[key] = value;
    }
  }

  return env;
}
