import { c as createComponent, r as renderComponent, a as renderTemplate } from "../chunks/astro/server_CmvKXz8z.mjs";
import "kleur/colors";
import { renderers } from "../renderers.mjs";
const $$Burger = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BurgerListPage", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/aless/Documents/MiChampion/mi-champion/src/pages-react/BurgerListPage.tsx", "client:component-export": "default" })}`;
}, "C:/Users/aless/Documents/MiChampion/mi-champion/src/pages/burger.astro", void 0);
const $$file = "C:/Users/aless/Documents/MiChampion/mi-champion/src/pages/burger.astro";
const $$url = "/burger";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Burger,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
