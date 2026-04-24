import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar.tsx";
import { Footer } from "./components/Footer.tsx";
import { UserSync } from "./components/UserSync.tsx";
import { Home } from "./pages/Home.tsx";
import { About } from "./pages/About.tsx";
import { Services } from "./pages/Services.tsx";
import { ServiceDetail } from "./pages/ServiceDetail.tsx";
import { Contact } from "./pages/Contact.tsx";
import { Admin } from "./pages/Admin.tsx";
import { ScrollToTop } from "./components/ScrollToTop.tsx";

export default function App() {
  return (
    <div className="relative font-sans scroll-smooth min-h-screen flex flex-col">
      <UserSync />
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/legal" element={
            <div className="pt-40 px-12 pb-20 max-w-4xl mx-auto space-y-12">
              <h1 className="text-4xl font-black italic uppercase tracking-widest text-slate-900">Mentions Légales</h1>
              <section className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-primary-700 mb-2">Identification de l'Éditeur</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Cogese SARL est une société à responsabilité limitée de droit camerounais, dont le siège social est situé à Loum (100m du carrefour Ngodji) et disposant d'une agence à Douala (Ndokpassi). 
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-primary-700 mb-2">Activités Réglementées</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Cogese SARL exerce des activités multiservices incluant la beauté et l'esthétique, le conseil en immigration (Entrée Express Canada), le transport import-export, et la formation certifiante. Toutes nos activités sont menées en conformité avec les réglementations locales et internationales applicables.
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-primary-700 mb-2">Hébergement</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Ce site est hébergé sur des infrastructures cloud sécurisées garantissant une disponibilité maximale et la protection des données transmises par nos utilisateurs.
                  </p>
                </div>
              </section>
            </div>
          } />
          <Route path="/privacy" element={
            <div className="pt-40 px-12 pb-20 max-w-4xl mx-auto space-y-12">
              <h1 className="text-4xl font-black italic uppercase tracking-widest text-slate-900">Politique de Confidentialité</h1>
              <section className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-primary-700 mb-2">Collecte de Données</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Nous collectons uniquement les données nécessaires à la fourniture de nos services (nom, email, détails de projet d'immigration) via nos formulaires de contact. Vos informations ne sont jamais vendues à des tiers.
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-primary-700 mb-2">Utilisation des Informations</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Les données collectées sont utilisées exclusivement pour répondre à vos demandes, traiter vos dossiers d'immigration vers le Canada en collaboration avec nos consultants partenaires, et vous informer sur nos offres de formation et produits ménagers.
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-primary-700 mb-2">Sécurité</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre tout accès non autorisé, altération ou divulgation.
                  </p>
                </div>
              </section>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
