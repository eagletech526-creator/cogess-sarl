/** Identifiants légaux et métadonnées du site (SEO, en-tête, schema.org). */
export const SITE = {
  name: "Cogese SARL",
  /** URL canonique du site — définir VITE_SITE_URL en production (ex. https://www.cogese.cm) */
  get origin(): string {
    if (typeof window !== "undefined") return window.location.origin;
    return (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") ?? "";
  },
  defaultDescription:
    "Cogese SARL — société multiservices au Cameroun : beauté, immigration Canada, logistique, formation et conseil. Loum et Douala.",
  locale: "fr_CM",
  rccm: "CM-DLA-02-2026-B13-00110",
  niu: "M022618376333T",
  defaultOgImagePath: "/favicon.jpg",
} as const;

export type PageSeo = { title: string; description: string };

/** Titres et descriptions par chemin (SPA). */
export const PAGE_SEO: Record<string, PageSeo> = {
  "/": {
    title: "Accueil",
    description:
      "L'excellence multiservices à votre portée : beauté, immigration, logistique et plus. Cogese SARL, partenaire de confiance au Cameroun.",
  },
  "/about": {
    title: "À propos",
    description:
      "Mission, valeurs et équipe Cogese SARL. Conseil, intégrité et proximité avec nos clients au Cameroun et à l'international.",
  },
  "/services": {
    title: "Services",
    description:
      "Découvrez les services Cogese SARL : beauté, immigration Canada, transport, formation et solutions sur mesure.",
  },
  "/contact": {
    title: "Contact",
    description:
      "Contactez Cogese SARL à Loum ou Douala pour vos projets beauté, immigration, logistique ou formation.",
  },
  "/admin": {
    title: "Espace administration",
    description: "Accès réservé — Cogese SARL.",
  },
  "/legal": {
    title: "Mentions légales",
    description: "Mentions légales et identification de Cogese SARL (RCCM, NIU).",
  },
  "/privacy": {
    title: "Politique de confidentialité",
    description: "Politique de confidentialité et traitement des données personnelles — Cogese SARL.",
  },
};

export function getPageSeo(pathname: string): PageSeo {
  if (PAGE_SEO[pathname]) return PAGE_SEO[pathname];
  if (pathname.startsWith("/services/")) {
    return {
      title: "Service",
      description: "Détail d'un service proposé par Cogese SARL au Cameroun.",
    };
  }
  return PAGE_SEO["/"];
}
