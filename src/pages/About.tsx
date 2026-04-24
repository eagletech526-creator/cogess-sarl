import { motion } from "motion/react";
import { CheckCircle2, ShieldCheck, Users2, Building2 } from "lucide-react";

export const About = () => {
  return (
    <div className="bg-white min-h-screen pt-40 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <div className="h-px w-10 bg-primary-700"></div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-700">Patrimoine & Excellence</h2>
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
              Notre Mission et <br/>
              <span className="text-primary-700">Valeurs Fondamentales.</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed lg:max-w-lg">
              Cogese SARL s'engage à fournir des conseils de haute intégrité. Nous valorisons la précision, l'innovation et le partenariat à long terme avec nos clients mondiaux. Notre mission est de transformer les défis complexes en opportunités évolutives grâce à une ingénierie experte et une prospective stratégique.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-8 rounded-lg border border-slate-100">
              <CheckCircle2 className="w-8 h-8 text-primary-700 mb-6" />
              <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-wider text-sm">Intégrité</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Notre fondation repose sur des pratiques éthiques et une communication transparente à chaque étape.</p>
            </div>
            <div className="bg-primary-700 p-8 rounded-lg text-white shadow-2xl">
              <ShieldCheck className="w-8 h-8 text-white/50 mb-6" />
              <h4 className="font-bold mb-3 uppercase tracking-wider text-sm">Qualité</h4>
              <p className="text-xs text-white/70 leading-relaxed">Nous maintenons les normes de précision les plus élevées dans tous les conseils de gestion et juridiques.</p>
            </div>
            <div className="bg-slate-900 p-8 rounded-lg text-white">
              <Users2 className="w-8 h-8 text-white/30 mb-6" />
              <h4 className="font-bold mb-3 uppercase tracking-wider text-sm">Proximity</h4>
              <p className="text-xs text-white/50 leading-relaxed">Nous restons proches de nos clients, en veillant à comprendre les nuances de leur industrie spécifique.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-lg border border-slate-100">
              <Building2 className="w-8 h-8 text-primary-700 mb-6" />
              <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-wider text-sm">Innovation</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Nous exploitons les derniers outils numériques pour automatiser et optimiser les processus d'affaires.</p>
            </div>
          </div>
        </div>
        
        <div className="aspect-[21/9] w-full bg-slate-100 rounded-3xl overflow-hidden shadow-2xl relative mb-32">
          <img 
            src="https://picsum.photos/seed/cogese-team/1920/820"
            alt="The Team"
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-primary-700/10 mix-blend-multiply" />
          <div className="absolute bottom-12 left-12">
            <p className="text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tighter">Établi en 2026</p>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-12 mb-20">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-700 mb-4">Notre Équipe</h2>
            <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-900">Ceux qui font la différence</h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-10">
            {[
              { name: "William Noubissie", role: "Directeur Général", image: "/Directeur generale.jpg" },
              { name: "Ngameni Léa", role: "Directrice d'Exploitation", image: "/directrice d'exploitation.jpg" },
              { name: "Raphaël Djomaleu", role: "Chef de Production & Vente", image: "/chef de prod de vente.jpg" },
              { name: "Réné Youmbi", role: "Administrateur Réseau", image: "/Administrateur reseau.jpg" },
              { name: "Véronique Tcheumeni", role: "Responsable de Beauté", image: "/responsable de beaute.jpg" }
            ].map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center group w-52"
              >
                <div className="w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-white shadow-xl bg-slate-100">
                  <img src={member.image} alt={member.name || member.role} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h4 className="font-bold text-slate-900 mb-1">{member.name || member.role}</h4>
                {member.name && <p className="text-sm text-primary-700 font-medium leading-snug">{member.role}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
