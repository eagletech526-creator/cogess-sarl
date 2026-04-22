import { BarChart3, ShieldCheck, ChevronRight, Building2, Users2, CheckCircle2 } from "lucide-react";

export const SERVICES = [
  {
    id: "operational-audit",
    title: "Audit Opérationnel",
    desc: "Analyse approfondie de l'efficacité et optimisation des processus pour les entreprises en croissance.",
    icon: BarChart3,
    longDesc: "Notre service d'Audit Opérationnel offre une revue complète des flux de travail, des ressources humaines et de l'allocation des ressources de votre entreprise. Nous identifions les goulots d'étranglement et mettons en œuvre des méthodologies Lean pour rationaliser vos chaînes de production et de prestation de services.",
    features: [
      "Cartographie et analyse des processus",
      "Optimisation de l'utilisation des ressources",
      "Stratégies de réduction des gaspillages",
      "Développement de mesures de performance"
    ]
  },
  {
    id: "legal-tax",
    title: "Conseil Juridique & Fiscal",
    desc: "Planification fiscale stratégique et cadres de conformité réglementaire.",
    icon: ShieldCheck,
    longDesc: "Naviguer dans le paysage complexe du droit des sociétés et de la fiscalité nécessite une expertise anticiper. Cogess SARL assure la planification stratégique de la TVA, de l'impôt sur les sociétés et de la conformité au commerce international, garantissant que votre entreprise est toujours protégée.",
    features: [
      "Planification de l'efficacité fiscale",
      "Évaluation des risques de conformité",
      "Reporting réglementaire",
      "Conseils en gouvernance d'entreprise"
    ]
  },
  {
    id: "project-management",
    title: "Gestion de Projet",
    desc: "Coordination agile pour les projets d'ingénierie et de management complexes.",
    icon: ChevronRight,
    longDesc: "Nous proposons des services de gestion de projet de bout en bout pour les transformations techniques et d'entreprise à grande échelle. En utilisant les cadres PMBOK et Agile, nous garantissons que vos projets sont livrés à temps, dans le respect du budget et selon les normes de qualité les plus élevées.",
    features: [
      "Coordination Agile et Waterfall",
      "Suivi du budget et du calendrier",
      "Planification de l'atténuation des risques",
      "Communication avec les parties prenantes"
    ]
  },
  {
    id: "it-infrastructure",
    title: "Infrastructure IT",
    desc: "Cadres technologiques évolutifs adaptés aux besoins des entreprises modernes.",
    icon: Building2,
    longDesc: "Notre équipe de conseil en informatique conçoit et met en œuvre des piles technologiques robustes qui évoluent avec votre entreprise. De la mise en œuvre d'ERP/CRM à la migration vers le cloud (AWS/Azure), nous fournissons l'épine dorsale numérique de vos opérations.",
    features: [
      "Mise en œuvre ERP / CRM",
      "Architecture cloud & hébergement",
      "Protocoles de sécurité des données",
      "Intégration de systèmes"
    ]
  },
  {
    id: "hr-consulting",
    title: "Conseil en RH",
    desc: "Recrutement spécialisé et systèmes de gestion des talents.",
    icon: Users2,
    longDesc: "Le capital humain est votre atout le plus précieux. Nous vous aidons à attirer, former et fidéliser les meilleurs talents grâce à des processus de recrutement spécialisés, à l'automatisation de la paie et à la gestion des déclarations sociales.",
    features: [
      "Chasse de têtes & recrutement",
      "Systèmes de paie automatisés",
      "Support aux déclarations sociales",
      "Programmes de développement des talents"
    ]
  },
  {
    id: "corporate-strategy",
    title: "Stratégie d'Entreprise",
    desc: "Développement d'une vision à long terme et positionnement sur le marché.",
    icon: CheckCircle2,
    longDesc: "Bâtissez une entreprise prête pour l'avenir grâce à nos services de conseil stratégique. Nous menons des études de marché approfondies, des analyses concurrentielles et des modélisations financières pour vous aider à définir vos objectifs à long terme et à garder une longueur d'avance.",
    features: [
      "Analyse d'expansion du marché",
      "Analyse du paysage concurrentiel",
      "Modélisation de la vision financière",
      "Stratégie de croissance durable"
    ]
  }
];
