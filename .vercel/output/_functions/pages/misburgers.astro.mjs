import { c as createComponent, r as renderComponent, a as renderTemplate } from "../chunks/astro/server_CmvKXz8z.mjs";
import "kleur/colors";
import { renderers } from "../renderers.mjs";
const $$Misburgers = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MisBurgersPage", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/aless/Documents/MiChampion/mi-champion/src/pages-react/MisBurgersPage.tsx", "client:component-export": "default" })}`;
}, "C:/Users/aless/Documents/MiChampion/mi-champion/src/pages/misburgers.astro", void 0);
const $$file = "C:/Users/aless/Documents/MiChampion/mi-champion/src/pages/misburgers.astro";
const $$url = "/misburgers";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Misburgers,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
