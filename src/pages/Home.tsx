import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { SERVICES } from "../constants.ts";
import heroImg from "../assets/hero.png";

export const Home = () => {
  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8 max-w-3xl">
                L'Excellence Multiservices <br/>
                <span className="text-primary-700">à Votre Portée.</span>
              </h1>
              <p className="text-lg lg:text-xl text-slate-600 mb-12 leading-relaxed max-w-xl">
                De la beauté à l'immigration vers le Canada, en passant par la logistique et l'immobilier, Cogess SARL est votre partenaire de confiance au Cameroun.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link 
                  to="/services" 
                  className="px-10 py-4 bg-primary-700 text-white rounded font-bold uppercase tracking-widest shadow-xl hover:bg-primary-800 transition-all flex items-center justify-center"
                >
                  Explorer les Services
                </Link>
                <Link 
                  to="/about" 
                  className="px-10 py-4 bg-white text-slate-900 border border-slate-200 rounded font-bold uppercase tracking-widest hover:border-primary-700 transition-all flex items-center justify-center"
                >
                  Notre Mission
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex-1 w-full lg:w-auto"
            >
              <div className="p-4 bg-white border-4 border-white shadow-2xl rounded-sm">
                <img 
                  src={heroImg}
                  alt="Cogess SARL Multiservices"
                  className="w-full h-auto rounded-sm object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Services Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center space-x-3 mb-12">
            <div className="h-px w-10 bg-primary-700"></div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-700">Ce Que Nous Faisons</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.slice(0, 3).map((s, i) => (
              <Link to={`/services/${s.id}`} key={i}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-8 bg-slate-50 border border-slate-200 rounded hover:border-primary-700 transition-all group"
                >
                  <s.icon className="w-6 h-6 text-primary-700 mb-6 opacity-40 group-hover:opacity-100 transition-opacity" />
                  <h4 className="text-base font-bold text-slate-900 mb-4 uppercase tracking-wider">{s.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{s.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/services" className="text-xs font-bold uppercase tracking-[0.3em] text-primary-700 hover:text-primary-800 transition-colors">
              Voir Tous les Services →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
