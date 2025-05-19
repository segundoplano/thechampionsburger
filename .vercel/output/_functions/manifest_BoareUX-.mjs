import "kleur/colors";
import { d as decodeKey } from "./chunks/astro/server_CmvKXz8z.mjs";
import "clsx";
import "cookie";
import { N as NOOP_MIDDLEWARE_FN } from "./chunks/astro-designed-error-pages_K9EJcM8x.mjs";
import "es-module-lexer";
function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}
function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}
function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}
const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/aless/Documents/MiChampion/mi-champion/","cacheDir":"file:///C:/Users/aless/Documents/MiChampion/mi-champion/node_modules/.astro/","outDir":"file:///C:/Users/aless/Documents/MiChampion/mi-champion/dist/","srcDir":"file:///C:/Users/aless/Documents/MiChampion/mi-champion/src/","publicDir":"file:///C:/Users/aless/Documents/MiChampion/mi-champion/public/","buildClientDir":"file:///C:/Users/aless/Documents/MiChampion/mi-champion/dist/client/","buildServerDir":"file:///C:/Users/aless/Documents/MiChampion/mi-champion/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DCk627nQ.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DCk627nQ.js"}],"styles":[{"type":"external","src":"/_astro/supabaseClient.OFYvUABn.css"}],"routeData":{"route":"/burger","isIndex":false,"type":"page","pattern":"^\\/burger\\/?$","segments":[[{"content":"burger","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/burger.astro","pathname":"/burger","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DCk627nQ.js"}],"styles":[{"type":"external","src":"/_astro/supabaseClient.OFYvUABn.css"}],"routeData":{"route":"/burgers/[id]","isIndex":false,"type":"page","pattern":"^\\/burgers\\/([^/]+?)\\/?$","segments":[[{"content":"burgers","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/burgers/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DCk627nQ.js"}],"styles":[{"type":"external","src":"/_astro/supabaseClient.OFYvUABn.css"}],"routeData":{"route":"/misburgers","isIndex":false,"type":"page","pattern":"^\\/misburgers\\/?$","segments":[[{"content":"misburgers","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/misburgers.astro","pathname":"/misburgers","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DCk627nQ.js"}],"styles":[{"type":"external","src":"/_astro/supabaseClient.OFYvUABn.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/burger@_@astro":"pages/burger.astro.mjs","\u0000@astro-page:src/pages/burgers/[id]@_@astro":"pages/burgers/_id_.astro.mjs","\u0000@astro-page:src/pages/misburgers@_@astro":"pages/misburgers.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","C:/Users/aless/Documents/MiChampion/mi-champion/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CrsOFnsC.mjs","\u0000@astrojs-manifest":"manifest_BoareUX-.mjs","astro:scripts/before-hydration.js":"_astro/astro_scripts/before-hydration.js.pnZRkkrs.js","C:/Users/aless/Documents/MiChampion/mi-champion/src/pages-react/MisBurgersPage.tsx":"_astro/MisBurgersPage.DuQEQkta.js","C:/Users/aless/Documents/MiChampion/mi-champion/src/pages-react/HomePage.tsx":"_astro/HomePage.DjK9TuYn.js","C:/Users/aless/Documents/MiChampion/mi-champion/src/pages-react/BurgerDetailPage.tsx":"_astro/BurgerDetailPage.DOjR7C_w.js","C:/Users/aless/Documents/MiChampion/mi-champion/src/pages-react/BurgerListPage.tsx":"_astro/BurgerListPage.BYgbwzcm.js","@astrojs/react/client.js":"_astro/client.CEasEcuk.js","astro:scripts/page.js":"_astro/page.DCk627nQ.js","\u0000astro:transitions/client":"_astro/client.Djg46rLP.js"},"inlinedScripts":[],"assets":["/favicon.svg","/_astro/browser.BkaKviuj.js","/_astro/BurgerDetailPage.DOjR7C_w.js","/_astro/BurgerListPage.BYgbwzcm.js","/_astro/chunk-XL46KY3Q.yPoBHZKd.js","/_astro/client.CEasEcuk.js","/_astro/client.Djg46rLP.js","/_astro/HomePage.DjK9TuYn.js","/_astro/index.BIyP36Tk.js","/_astro/index.D0mNDFPE.js","/_astro/MisBurgersPage.DuQEQkta.js","/_astro/page.DCk627nQ.js","/_astro/preload-helper.BlTxHScW.js","/_astro/StarRating.DUbRVut4.js","/_astro/supabaseClient.JcG5vpDm.js","/_astro/supabaseClient.OFYvUABn.css","/galeria/banner.jpg","/galeria/comida1.jpg","/galeria/comida10.jpg","/galeria/comida2.jpg","/galeria/comida3.jpg","/galeria/comida4.jpg","/galeria/comida5.jpg","/galeria/comida6.jpg","/galeria/comida7.jpg","/galeria/comida8.jpg","/galeria/comida9.jpg","/galeria/gente1.jpg","/galeria/lugar1.jpg","/galeria/lugar10.jpg","/galeria/lugar11.jpg","/galeria/lugar12.jpg","/galeria/lugar13.jpg","/galeria/lugar14.jpg","/galeria/lugar15.jpg","/galeria/lugar16.jpg","/galeria/lugar2.jpg","/galeria/lugar3.jpg","/galeria/lugar4.jpg","/galeria/lugar5.jpg","/galeria/lugar6.jpg","/galeria/lugar7.jpg","/galeria/lugar8.jpg","/galeria/lugar9.jpg","/galeria/puesto1.jpg","/galeria/puesto2.jpg","/galeria/puesto3.jpg","/galeria/puesto4.jpg","/galeria/puesto5.jpg","/galeria/puesto6.jpg","/galeria/puesto7.jpg","/galeria/puesto8.jpg","/galeria/puesto9.jpg","/_astro/astro_scripts/before-hydration.js.pnZRkkrs.js","/_astro/page.DCk627nQ.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"6FNWEnKC6LqmJKoucsdsQnN59WnON4kJHicBs21u2S0="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;
export {
  manifest
};
