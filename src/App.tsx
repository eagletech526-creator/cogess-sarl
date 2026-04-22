import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { UserSync } from "./components/UserSync";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { ServiceDetail } from "./pages/ServiceDetail";
import { Contact } from "./pages/Contact";
import { Admin } from "./pages/Admin";
import { ScrollToTop } from "./components/ScrollToTop";

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
          <Route path="/legal" element={<div className="pt-40 px-12 pb-20 max-w-4xl mx-auto"><h1 className="text-4xl font-extrabold mb-8 italic uppercase tracking-widest">Mentions Légales</h1><p className="text-slate-500">Cogess SARL est une société à responsabilité limitée enregistrée au Luxembourg. Licence #902-11C.</p></div>} />
          <Route path="/privacy" element={<div className="pt-40 px-12 pb-20 max-w-4xl mx-auto"><h1 className="text-4xl font-extrabold mb-8 italic uppercase tracking-widest">Politique de Confidentialité</h1><p className="text-slate-500">Nous prenons la sécurité de vos données au sérieux. Aucune donnée n'est partagée avec des tiers sans consentement analytique.</p></div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
