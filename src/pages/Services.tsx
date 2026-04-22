import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { SERVICES } from "../constants.ts";

export const Services = () => {
  return (
    <section className="py-24 pt-40 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center space-x-3 mb-6">
          <div className="h-px w-10 bg-primary-700"></div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-700">Expertise</h2>
        </div>
        <h3 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-16 leading-tight max-w-2xl">
          Services Essentiels Adaptés à la <span className="text-primary-700">Croissance.</span>
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <Link to={`/services/${s.id}`} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-8 bg-white border border-slate-200 rounded shadow-sm hover:border-primary-700 transition-all group h-full flex flex-col"
              >
                <s.icon className="w-6 h-6 text-primary-700 mb-6 opacity-40 group-hover:opacity-100 transition-opacity" />
                <h4 className="text-base font-bold text-slate-900 mb-4 uppercase tracking-wider">{s.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed mb-8 flex-grow">{s.desc}</p>
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-primary-700 group-hover:translate-x-1 transition-transform inline-block">
                  Voir les Détails →
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
