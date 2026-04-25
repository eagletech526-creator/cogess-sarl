import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SERVICES } from "../constants.js";
import { SITE, getPageSeo } from "../site.js";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

const JSON_LD_ID = "cogese-jsonld-organization";

export function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.lang = "fr";

    const origin = SITE.origin || window.location.origin;
    const path = pathname || "/";
    let { title: titlePart, description } = getPageSeo(path);
    let ogImagePath: string = SITE.defaultOgImagePath;
    if (path.startsWith("/services/") && path !== "/services") {
      const id = path.replace(/^\/services\//, "").split("/")[0];
      const svc = SERVICES.find((s) => s.id === id);
      if (svc) {
        titlePart = svc.title;
        description = `${svc.desc} — ${SITE.name}, Cameroun.`;
        if (svc.image) ogImagePath = svc.image;
      }
    }
    const fullTitle = titlePart === "Accueil" ? SITE.name : `${titlePart} | ${SITE.name}`;
    const canonical = `${origin}${path === "/" ? "" : path}`;
    const ogImage = `${origin}${ogImagePath}`;
    const siteLogo = `${origin}${SITE.defaultOgImagePath}`;

    document.title = fullTitle;
    upsertMeta("name", "description", description);
    upsertLink("canonical", canonical);

    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", SITE.name);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", ogImage);
    upsertMeta("property", "og:locale", "fr_CM");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", ogImage);

    const orgJson = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE.name,
      url: origin || canonical,
      logo: siteLogo,
      identifier: [
        { "@type": "PropertyValue", name: "RCCM", value: SITE.rccm },
        { "@type": "PropertyValue", name: "NIU", value: SITE.niu },
      ],
      taxID: SITE.niu,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Loum",
        addressRegion: "Littoral",
        addressCountry: "CM",
      },
    };

    let script = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = JSON_LD_ID;
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(orgJson);
  }, [pathname]);

  return null;
}
