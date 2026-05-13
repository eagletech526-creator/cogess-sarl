import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useSiteContent } from "../cms.js";

export const Services = () => {
  const { services } = useSiteContent();

  return (
    <section className="py-24 pt-48 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center space-x-3 mb-6">
          <div className="h-px w-10 bg-primary-700"></div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-700">Expertise</h2>
        </div>
        <div className="mb-14 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <h3 className="max-w-2xl text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            Services Essentiels Adaptés à la <span className="text-primary-700">Croissance.</span>
          </h3>
          <p className="max-w-md text-sm leading-relaxed text-slate-500">
            Des prestations concrètes, portées par des équipes locales et des produits visibles: beauté, voyages, transport, fabrication et gestion immobilière.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Link to={`/services/${s.id}`} key={s.id}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:border-primary-700/50 hover:shadow-xl hover:shadow-slate-900/8"
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-grow flex-col p-7">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <s.icon className="w-6 h-6 text-primary-700 opacity-70 group-hover:opacity-100 transition-opacity" />
                    <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400">
                      0{i + 1}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-4 uppercase tracking-wider">{s.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed mb-8 flex-grow">{s.desc}</p>
                  <span className="text-[10px] uppercase font-extrabold tracking-widest text-primary-700 group-hover:translate-x-1 transition-transform inline-block">
                    Voir les Détails →
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
