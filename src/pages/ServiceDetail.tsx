import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { SERVICES } from "../constants.js";

export const ServiceDetail = () => {
  const { id } = useParams();
  const service = SERVICES.find(s => s.id === id);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <section className="py-24 pt-48 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <Link to="/services" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-primary-700 transition-colors mb-12">
          <ArrowLeft size={14} />
          Retour aux Services
        </Link>
        
        <div className="flex items-center space-x-3 mb-6">
          <div className="h-px w-10 bg-primary-700"></div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-700">Spécifications du Service</h2>
        </div>
        
        <div className="flex items-center gap-6 mb-10">
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
            <service.icon className="w-10 h-10 text-primary-700" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            {service.title}
          </h1>
        </div>

        <div className="aspect-video w-full bg-slate-100 rounded-xl overflow-hidden mb-12 border border-slate-200 shadow-sm">
          <img 
            src={(service as any).image}
            alt={service.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="prose prose-slate max-w-none">
          <p className="text-lg lg:text-xl text-slate-600 leading-relaxed mb-10">
            {service.longDesc}
          </p>
          
          <h4 className="text-xl font-extrabold text-slate-900 mb-6 uppercase tracking-widest">Caractéristiques Clés</h4>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {service.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3 p-6 bg-slate-50 border border-slate-100 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-primary-700 shrink-0 mt-0.5" />
                <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">{feature}</span>
              </div>
            ))}
          </div>

          <div className="p-10 bg-primary-700 rounded-xl text-white">
            <h4 className="text-2xl font-extrabold mb-4">Demander ce service</h4>
            <p className="text-white/70 mb-8 max-w-lg">
              Chaque entreprise a des besoins uniques. Contactez nos experts en {service.title} dès aujourd'hui pour discuter de vos besoins opérationnels spécifiques.
            </p>
            <Link 
              to="/contact" 
              className="inline-block px-10 py-4 bg-white text-primary-700 rounded font-bold uppercase tracking-widest hover:bg-slate-50 transition-all shadow-xl"
            >
              Commencer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
