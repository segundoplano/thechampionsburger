import { c as createComponent, b as createAstro, r as renderComponent, a as renderTemplate } from "../../chunks/astro/server_CmvKXz8z.mjs";
import "kleur/colors";
import { renderers } from "../../renderers.mjs";
const $$Astro = createAstro();
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "BurgerDetailPage", null, { "burgerId": id, "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/aless/Documents/MiChampion/mi-champion/src/pages-react/BurgerDetailPage.tsx", "client:component-export": "default" })}`;
}, "C:/Users/aless/Documents/MiChampion/mi-champion/src/pages/burgers/[id].astro", void 0);
const $$file = "C:/Users/aless/Documents/MiChampion/mi-champion/src/pages/burgers/[id].astro";
const $$url = "/burgers/[id]";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
