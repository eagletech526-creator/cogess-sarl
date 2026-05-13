import { useEffect, useMemo, useState } from "react";
import { Building } from "lucide-react";
import { SERVICES } from "./constants.js";

export type EditableService = {
  id: string;
  title: string;
  desc: string;
  longDesc: string;
  features: string[];
  image: string;
  gallery: string[];
  visible: boolean;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  visible: boolean;
};

export type MediaItem = {
  id: string;
  title: string;
  section: string;
  image: string;
  visible: boolean;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
};

export type SiteContent = {
  hero: HeroContent;
  services: EditableService[];
  team: TeamMember[];
  media: MediaItem[];
  updatedAt: string;
};

export const CMS_STORAGE_KEY = "cogese_site_content_v1";

export const availableImages = [
  "/new/perruque.jpg",
  "/new/perruques2.jpg",
  "/new/tress1.jpg",
  "/new/tresse2.jpg",
  "/new/tresse3.jpg",
  "/new/tresse4.jpg",
  "/new/tresse5.jpg",
  "/new/ongles.jpg",
  "/new/ongles2.jpg",
  "/new/shipping.jpg",
  "/new/decharge.jpg",
  "/new/savon liquide.jpg",
  "/new/eau de javel.jpg",
  "/new/vinaigre.jpg",
  "/new/immeuble1.jpg",
  "/new/immeuble2.jpg",
  "/new/immeuble3.jpg",
  "/new/immeuble4.jpg",
  "/new/responasble logistiques.jpg",
  "/immigration.png",
  "/Directeur generale.jpg",
  "/directrice d'exploitation.jpg",
  "/chef de prod de vente.jpg",
  "/Administrateur reseau.jpg",
  "/responsable de beaute.jpg",
  "/analyste%20d'affaires%20TI.jpg",
];

export const defaultTeam: TeamMember[] = [
  { id: "william-noubissie", name: "William NOUBISSIE", role: "Directeur Général", image: "/Directeur generale.jpg", visible: true },
  { id: "nadine-lea-bouene", name: "Nadine Léa BOUENE", role: "Directrice d'Exploitation", image: "/directrice d'exploitation.jpg", visible: true },
  { id: "raphael-djomaleu", name: "Raphaël DJOMALEU", role: "Chef de Production & Vente", image: "/chef de prod de vente.jpg", visible: true },
  { id: "rene-youmbi", name: "Réné YOUMBI", role: "Administrateur Réseau", image: "/Administrateur reseau.jpg", visible: true },
  { id: "veronique-tcheumeni", name: "Véronique TCHEUMENI", role: "Responsable de Beauté", image: "/responsable de beaute.jpg", visible: true },
  { id: "nicolas-nkoa-rene", name: "Nicolas NKOA Rene", role: "Responsable Logistique", image: "/new/responasble logistiques.jpg", visible: true },
  { id: "junie-yimga", name: "Junie YIMGA", role: "Analyste d'affaires TI", image: "/analyste%20d'affaires%20TI.jpg", visible: true },
];

const defaultServices: EditableService[] = SERVICES.map((service) => ({
  id: service.id,
  title: service.title,
  desc: service.desc,
  longDesc: service.longDesc,
  features: service.features,
  image: service.image,
  gallery: "gallery" in service ? service.gallery : [],
  visible: true,
}));

const defaultMedia: MediaItem[] = [
  { id: "hero-beauty", title: "Beauté", section: "hero", image: "/new/perruque.jpg", visible: true },
  { id: "hero-logistics", title: "Transit", section: "hero", image: "/new/shipping.jpg", visible: true },
  { id: "hero-products", title: "Produits", section: "hero", image: "/new/savon liquide.jpg", visible: true },
  { id: "hero-real-estate", title: "Immobilier", section: "hero", image: "/new/immeuble3.jpg", visible: true },
];

export const defaultSiteContent: SiteContent = {
  hero: {
    eyebrow: "Cogese SARL · Cameroun",
    title: "L'Excellence Multiservices",
    highlight: "à Votre Portée.",
    description:
      "De la beauté à l'immigration vers le Canada, en passant par la logistique, les produits ménagers et l'immobilier, Cogese SARL est votre partenaire de confiance au Cameroun.",
  },
  services: defaultServices,
  team: defaultTeam,
  media: defaultMedia,
  updatedAt: new Date().toISOString(),
};

export function createId(label: string) {
  return label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 56) || `item-${Date.now()}`;
}

export function loadSiteContent(): SiteContent {
  if (typeof window === "undefined") return defaultSiteContent;

  try {
    const raw = window.localStorage.getItem(CMS_STORAGE_KEY);
    if (!raw) return defaultSiteContent;
    const parsed = JSON.parse(raw) as Partial<SiteContent>;

    return {
      hero: { ...defaultSiteContent.hero, ...parsed.hero },
      services: parsed.services?.length ? parsed.services : defaultSiteContent.services,
      team: parsed.team?.length ? parsed.team : defaultSiteContent.team,
      media: parsed.media?.length ? parsed.media : defaultSiteContent.media,
      updatedAt: parsed.updatedAt || defaultSiteContent.updatedAt,
    };
  } catch {
    return defaultSiteContent;
  }
}

export function saveSiteContent(content: SiteContent) {
  if (typeof window === "undefined") return;
  const next = { ...content, updatedAt: new Date().toISOString() };
  window.localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("cogese-content-updated"));
}

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(() => loadSiteContent());

  useEffect(() => {
    const sync = () => setContent(loadSiteContent());
    window.addEventListener("storage", sync);
    window.addEventListener("cogese-content-updated", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("cogese-content-updated", sync);
    };
  }, []);

  const services = useMemo(() => {
    return content.services
      .filter((service) => service.visible)
      .map((service) => ({
        ...service,
        icon: SERVICES.find((item) => item.id === service.id)?.icon || Building,
      }));
  }, [content.services]);

  const team = useMemo(() => content.team.filter((member) => member.visible), [content.team]);
  const media = useMemo(() => content.media.filter((item) => item.visible), [content.media]);

  return { content, services, team, media };
}
