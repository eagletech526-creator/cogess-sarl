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
    image: "/new/perruque.jpg",
    gallery: [
      "/new/tress1.jpg",
      "/new/tresse2.jpg",
      "/new/tresse3.jpg",
      "/new/tresse4.jpg",
      "/new/tresse5.jpg",
      "/new/ongles.jpg",
      "/new/ongles2.jpg",
      "/new/perruques2.jpg"
    ]
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
    image: "/new/shipping.jpg",
    gallery: [
      "/new/decharge.jpg"
    ]
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
    image: "/new/savon liquide.jpg",
    gallery: [
      "/new/eau de javel.jpg",
      "/new/vinaigre.jpg"
    ]
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
    image: "/new/immeuble1.jpg",
    gallery: [
      "/new/immeuble2.jpg",
      "/new/immeuble3.jpg",
      "/new/immeuble4.jpg"
    ]
  }
];
