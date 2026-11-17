// Builds the workshop guide: node guide/build.mjs  ->  guide/workshop-guide.html (one self-contained file)
// Code snippets are read from the git branches, so the guide always matches the real code.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pages, nav, branchOrder } from "./content.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8" });
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ---------- tiny syntax highlighter (build time) ----------
const KW = "import|export|from|const|let|var|function|return|if|else|async|await|type|interface|new|default|try|catch|finally|throw|for|of|in|as|null|undefined|true|false|void|typeof|extends|class";
const SQL = "SELECT|INSERT|INTO|VALUES|FROM|WHERE|ORDER|BY|RETURNING|DELETE|CREATE|TABLE|IF|NOT|EXISTS|PRIMARY|KEY|DEFAULT|CHECK|DROP|AS|NULL|TRUE|FALSE|COUNT";
function highlight(code, lang) {
  const kw = lang === "sql" ? SQL : KW;
  const comment = lang === "bash" || lang === "yaml" || lang === "env" ? "#.*" : "\\/\\/.*|\\/\\*[\\s\\S]*?\\*\\/|\\{\\/\\*[\\s\\S]*?\\*\\/\\}";
  const re = new RegExp(`(${comment})|("(?:\\\\.|[^"\\\\\\n])*"|'(?:\\\\.|[^'\\\\\\n])*'|\`(?:\\\\.|[^\`\\\\])*\`)|\\b(${kw})\\b|\\b(\\d+(?:\\.\\d+)?)\\b`, lang === "sql" ? "gi" : "g");
  let last = 0, html = "", m;
  while ((m = re.exec(code))) {
    html += esc(code.slice(last, m.index));
    const [tok, c, s, k, n] = m;
    const cls = c ? "c" : s ? "s" : k ? "k" : "n";
    html += `<span class="t-${cls}">${esc(tok)}</span>`;
    last = m.index + tok.length;
  }
  return html + esc(code.slice(last));
}

const extLang = (f) => (/\.(tsx?|mjs|js)$/.test(f) ? "ts" : f.endsWith(".css") ? "css" : f.endsWith(".json") ? "json" : f.endsWith(".yaml") ? "yaml" : f.endsWith(".sql") ? "sql" : "text");

// ---------- block renderers ----------
let uid = 0;
function codeBox({ label, code, lang, mode, note }) {
  const id = `c${++uid}`;
  const badge = mode === "type" ? '<span class="badge type">type along</span>' : mode === "paste" ? '<span class="badge paste">copy and paste</span>' : "";
  return `<figure class="code ${mode ?? ""}">
  <figcaption><span class="file">${esc(label)}</span>${badge}<button class="copy" data-target="${id}" type="button">Copy</button></figcaption>
  ${note ? `<p class="code-note">${note}</p>` : ""}
  <pre><code id="${id}" class="lang-${lang}">${highlight(code, lang)}</code></pre>
</figure>`;
}

function fileBlock(b) {
  let code = git("show", `${b.branch}:${b.file}`).replace(/\n$/, "");
  if (b.from) {
    const lines = code.split("\n");
    const start = lines.findIndex((l) => l.includes(b.from));
    if (start < 0) throw new Error(`marker not found: ${b.from} in ${b.file}`);
    let end = b.to ? lines.findIndex((l, i) => i >= start && l.includes(b.to)) : lines.length - 1;
    if (end < 0) throw new Error(`end marker not found: ${b.to} in ${b.file}`);
    code = lines.slice(start, end + 1).join("\n");
  }
  return codeBox({ label: b.label ?? b.file, code, lang: b.lang ?? extLang(b.file), mode: b.mode, note: b.note });
}

function render(b) {
  const cls = b.presenter ? ' class="presenter"' : "";
  switch (b.t) {
    case "h": return `<h3${b.presenter ? ' class="presenter"' : ""}>${b.text}</h3>`;
    case "p": return `<p${cls}>${b.html}</p>`;
    case "ul": return `<ul${cls}>${b.items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
    case "ol": return `<ol${cls}>${b.items.map((i) => `<li>${i}</li>`).join("")}</ol>`;
    case "cmd": return codeBox({ label: b.label ?? "Terminal", code: b.code, lang: "bash", mode: b.mode, note: b.note });
    case "code": return codeBox({ label: b.label, code: b.code, lang: b.lang ?? "ts", mode: b.mode, note: b.note });
    case "file": return fileBlock(b);
    case "callout": return `<aside class="callout ${b.kind}${b.presenter ? " presenter" : ""}"><strong>${b.title ?? ""}</strong>${b.html}</aside>`;
    case "say": return `<aside class="say presenter"><strong>Say</strong>${b.html}</aside>`;
    case "table":
      return `<div class="table-wrap${b.presenter ? " presenter" : ""}"><table><thead><tr>${b.head.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
    case "changed": {
      const prev = branchOrder[branchOrder.indexOf(b.branch) - 1];
      const lines = git("diff", "--name-status", prev, b.branch).trim().split("\n").filter(Boolean);
      const items = lines.map((l) => { const [s, f] = l.split("\t"); return `<li><span class="st st-${s}">${s === "A" ? "new" : s === "M" ? "edited" : "removed"}</span> <code>${esc(f)}</code></li>`; });
      return `<details class="changed"><summary>Files that change in this step (${items.length})</summary><ul>${items.join("")}</ul></details>`;
    }
    default: throw new Error(`unknown block ${b.t}`);
  }
}

// ---------- single-file document ----------
function section(page) {
  const body = page.blocks.map((b) => (b.t === "section" ? `<h2 id="${page.slug}-${b.id}">${b.title}</h2>` : render(b))).join("\n");
  const meta = page.meta ? `<div class="meta">${page.meta.map((m) => `<span><b>${m[0]}</b> ${m[1]}</span>`).join("")}</div>` : "";
  return `<section class="page${page.presenter ? " presenter" : ""}" id="${page.slug}">
    ${page.kicker ? `<div class="kicker">${page.kicker}</div>` : ""}
    <h1>${page.title}</h1>
    ${page.lead ? `<p class="lead">${page.lead}</p>` : ""}
    ${meta}
    ${body}
  </section>`;
}

const navHtml = nav.map((g) => `<div class="group${g.presenter ? " presenter" : ""}"><h4>${g.title}</h4>${g.items.map((p) => `<a href="#${p.slug}">${p.nav ?? p.title}</a>`).join("")}</div>`).join("");
const css = readFileSync(join(here, "assets/style.css"), "utf8");
const js = readFileSync(join(here, "assets/app.js"), "utf8");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Mini Shop Workshop Guide</title>
<style>${css}</style>
</head>
<body>
<header class="top">
  <button id="menu" type="button" aria-label="Menu">☰</button>
  <a class="brand" href="#overview"><span class="mark">M</span> Mini Shop Workshop</a>
  <label class="toggle"><input id="presenter" type="checkbox"> Presenter notes</label>
</header>
<div class="layout">
  <nav id="nav">${navHtml}</nav>
  <main>
${pages.map(section).join("\n")}
  </main>
</div>
<script>${js}</script>
</body>
</html>`;

writeFileSync(join(here, "workshop-guide.html"), html);
console.log(`Built guide/workshop-guide.html (${pages.length} sections, ${(html.length / 1024).toFixed(0)} KB)`);
