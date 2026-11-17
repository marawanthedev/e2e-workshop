import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import net from "node:net";

const results = [];
const ok = (name, detail = "") => results.push({ mark: "✔", name, detail });
const bad = (name, detail) => results.push({ mark: "✘", name, detail, failed: true });
const later = (name, detail) => results.push({ mark: "–", name, detail });

const [major, minor] = process.versions.node.split(".").map(Number);
major > 20 || (major === 20 && minor >= 19)
  ? ok("Node.js", `v${process.versions.node}`)
  : bad("Node.js", `v${process.versions.node} found, need 20.19 or newer (install Node 22 LTS)`);

try {
  ok("Git", execSync("git --version", { encoding: "utf8" }).trim());
} catch {
  bad("Git", "not installed");
}

existsSync("node_modules/.bin/vite") ? ok("Packages installed") : bad("Packages installed", "run npm install in the project root");

const env = {};
if (existsSync("server/.env")) {
  for (const line of readFileSync("server/.env", "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2];
  }
}
if (!existsSync("server/.env")) later("server/.env", "not created yet, we do this in step 2");
else if (!env.DATABASE_URL) later("DATABASE_URL", "empty for now, we add the Neon connection string in step 3");
else {
  try {
    const { default: pg } = await import("pg");
    const pool = new pg.Pool({ connectionString: env.DATABASE_URL, connectionTimeoutMillis: 8000 });
    await pool.query("SELECT 1");
    await pool.end();
    ok("Database", "connected to Neon");
  } catch (err) {
    bad("Database", err.message);
  }
}

const portFree = (port) =>
  new Promise((resolve) => {
    const s = net.createServer().once("error", () => resolve(false)).once("listening", () => s.close(() => resolve(true)));
    s.listen(port);
  });
for (const [port, label] of [[3001, "API"], [5173, "client"]]) {
  (await portFree(port)) ? ok(`Port ${port} free`, label) : bad(`Port ${port} free`, `something is already using it (${label})`);
}

for (const r of results) console.log(`${r.mark} ${r.name}${r.detail ? `  ${r.detail}` : ""}`);
const failed = results.filter((r) => r.failed).length;
console.log(failed ? `\n${failed} check(s) failed.` : "\nAll good, you are ready for the workshop.");
process.exit(failed ? 1 : 0);
