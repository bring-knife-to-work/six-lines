"use strict";
function resolveStatic(p) {
  if (!p || typeof p !== "string")
    return "";
  const s = p.trim();
  if (s.startsWith("@static/")) {
    return "/" + s.replace(/^@static\//, "static/");
  }
  if (s.startsWith("/static/"))
    return s;
  if (s.startsWith("static/"))
    return "/" + s;
  return s;
}
exports.resolveStatic = resolveStatic;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/static-path.js.map
