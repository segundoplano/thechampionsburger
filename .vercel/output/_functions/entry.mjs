import { renderers } from "./renderers.mjs";
import { c as createExports } from "./chunks/entrypoint_DO90QzOB.mjs";
import { manifest } from "./manifest_BoareUX-.mjs";
const serverIslandMap = /* @__PURE__ */ new Map();
;
const _page0 = () => import("./pages/_image.astro.mjs");
const _page1 = () => import("./pages/burger.astro.mjs");
const _page2 = () => import("./pages/burgers/_id_.astro.mjs");
const _page3 = () => import("./pages/misburgers.astro.mjs");
const _page4 = () => import("./pages/index.astro.mjs");
const pageMap = /* @__PURE__ */ new Map([
  ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
  ["src/pages/burger.astro", _page1],
  ["src/pages/burgers/[id].astro", _page2],
  ["src/pages/misburgers.astro", _page3],
  ["src/pages/index.astro", _page4]
]);
const _manifest = Object.assign(manifest, {
  pageMap,
  serverIslandMap,
  renderers,
  actions: () => import("./_noop-actions.mjs"),
  middleware: () => import("./_noop-middleware.mjs")
});
const _args = {
  "middlewareSecret": "b2a46a83-f518-494d-98dc-c0792524ed83",
  "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
export {
  __astrojsSsrVirtualEntry as default,
  pageMap
};
