export const S = (id, title) => ({ t: "section", id, title });
export const P = (html, presenter) => ({ t: "p", html, presenter });
export const UL = (items, presenter) => ({ t: "ul", items, presenter });
export const OL = (items, presenter) => ({ t: "ol", items, presenter });
export const H = (text, presenter) => ({ t: "h", text, presenter });
export const CMD = (code, extra = {}) => ({ t: "cmd", code, ...extra });
export const CODE = (label, code, extra = {}) => ({ t: "code", label, code, ...extra });
export const FILE = (branch, file, extra = {}) => ({ t: "file", branch, file, ...extra });
export const SAY = (html) => ({ t: "say", html });
export const CHECK = (html) => ({ t: "callout", kind: "checkpoint", title: "Checkpoint", html });
export const TIP = (title, html, presenter) => ({ t: "callout", kind: "tip", title, html, presenter });
export const WARN = (title, html, presenter) => ({ t: "callout", kind: "warn", title, html, presenter });
export const TABLE = (head, rows, presenter) => ({ t: "table", head, rows, presenter });
export const CHANGED = (branch) => ({ t: "changed", branch });
export const catchup = (branch) => [
  S("catchup", "Fell behind? Catch up"),
  P("Jump to the finished state of this step. This discards your local changes in the working folder."),
  CMD(`git checkout -f ${branch}`),
  P("Want to keep your own work first? Run <code>git stash -u</code> before the checkout."),
];
