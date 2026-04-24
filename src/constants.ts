import { 
  Sparkles, 
  PlaneTakeoff, 
  Truck, 
  GraduationCap, 
  Building 
} from "lucide-react";

export const SERVICES = [
  {
    id: "beauty-aesthetics",
    title: "Beauté & Esthétique",
    desc: "Services complets de soins de beauté, coiffure et produits cosmétiques premium.",
    icon: Sparkles,
    longDesc: "Cogese SARL vous offre une expérience de beauté inégalée. Notre salon propose des soins esthétiques, manucure, pédicure, onglerie et maquillage professionnel. Nous vendons également des mèches, perruques, parfums, chaussures et produits cosmétiques de haute qualité pour sublimer votre quotidien.",
    features: [
      "Soins esthétiques & Maquillage",
      "Manucure, Pédicure & Onglerie",
      "Salon de coiffure femmes & enfants",
      "Vente de mèches, perruques & cosmétiques"
    ],
    image: "/perruques.jpg"
  },
  {
    id: "immigration-canada",
    title: "IMMIGRATION & VOYAGE AU CANADA",
    desc: "Accompagnement expert pour vos projets d'immigration et voyages vers le Canada.",
    icon: PlaneTakeoff,
    longDesc: "Réalisez votre rêve canadien avec notre assistance spécialisée. En étroite collaboration avec des avocats et consultants basés au Canada, nous facilitons l'obtention de permis de travail, d'études et de séjour. Nous vous guidons à travers les Entrées Express pour obtenir votre résidence permanente, le regroupement familial et les demandes d'asile.",
    features: [
      "Procédures d'Entrée Express",
      "Permis de travail, études & séjour",
      "Résidence permanente & Regroupement familial",
      "Enrôlement passeport et réservation de billet d'avion & hôtel"
    ],
    image: "/immigration.png"
  },
  {
    id: "logistics-transport",
    title: "Logistique & Transport",
    desc: "Solutions de transit et transport international entre le Cameroun et le Canada.",
    icon: Truck,
    longDesc: "Simplifiez vos échanges commerciaux avec nos services de transport import-export. Nous assurons un transit fluide entre le Cameroun et le Canada, ainsi qu'une liaison logistique efficace entre Loum et Douala pour toutes vos marchandises.",
    features: [
      "Transit International Cameroun-Canada",
      "Transport Import-Export",
      "Liaison logistique Loum-Douala",
      "Gestion sécurisée du fret"
    ],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&h=675&auto=format&fit=crop"
  },
  {
    id: "domestic-training",
    title: "Produits Ménagers & Formations",
    desc: "Vente de produits d'entretien et formations certifiantes en fabrication chimique.",
    icon: GraduationCap,
    longDesc: "Nous produisons et vendons des produits ménagers accessibles : savon liquide tout usage, idéal pour la vaisselle, le linge, les mains et le nettoyage général des meubles et espaces grâce à sa formule tout en un qui agit également comme détergent et désinfectant, eau de javel, vinaigre d'alcool et détergents. Cogese SARL offre aussi des formations pratiques en cosmétique et savonnerie avec remise d'attestation à la fin.",
    features: [
      "Vente de savon, javel & vinaigre",
      "Livraison de tout produit pour 5000 XAF",
      "Formations certifiantes en cosmétique",
      "Ateliers de fabrication de produits ménagers"
    ],
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&h=675&auto=format&fit=crop"
  },
  {
    id: "real-estate-lottery",
    title: "Immobilier & Services",
    desc: "Gestion immobilière sécurisée et services de maintenance pour vos propriétés.",
    icon: Building,
    longDesc: "Confiez-nous la gestion de votre patrimoine immobilier. Avec le soutien de nos avocats, nous garantissons aux bailleurs le paiement de leurs loyers à temps. Nous assurons également la maintenance, la restauration des immeubles et proposons des services de loterie.",
    features: [
      "Gestion immobilière assistée par avocats",
      "Maintenance & Restauration d'immeubles",
      "Garantie de revenus locatifs",
      "Services de loterie & Conciergerie"
    ],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&h=675&auto=format&fit=crop"
  }
];

