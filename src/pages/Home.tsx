import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "../constants.js";

export const Home = () => {
  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-48 pb-24 lg:pt-64 lg:pb-36">
        {/* Background */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(29,78,216,0.12),transparent_55%),radial-gradient(ellipse_60%_50%_at_100%_50%,rgba(29,78,216,0.06),transparent_50%),radial-gradient(ellipse_50%_40%_at_0%_80%,rgba(148,163,184,0.15),transparent_45%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-white via-slate-50/90 to-slate-50"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-slate-200/80 to-transparent"
          aria-hidden
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 shadow-sm backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary-600 shadow-[0_0_10px_rgba(29,78,216,0.6)]" />
              Cogese SARL · Cameroun
            </motion.p>

            <h1 className="text-balance text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.12] sm:leading-[1.08] mb-8 max-w-5xl">
              <span className="text-slate-900">
                L&apos;Excellence
                <br className="sm:hidden" aria-hidden />
                <span className="hidden sm:inline">&nbsp;</span>
                Multiservices
              </span>
              <br className="sm:hidden" aria-hidden />
              <span className="hidden sm:inline">&nbsp;</span>
              <span className="bg-linear-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent">
                à Votre Portée.
              </span>
            </h1>
            <p className="text-balance text-lg sm:text-xl text-slate-600/95 mb-12 leading-relaxed max-w-2xl font-medium">
              De la beauté à l&apos;immigration vers le Canada, en passant par la logistique et l&apos;immobilier, Cogese SARL est votre partenaire de confiance au Cameroun.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center w-full sm:w-auto">
              <Link
                to="/services"
                className="group relative inline-flex w-full sm:w-auto min-h-13 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-primary-700 px-9 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-primary-700/25 transition-all hover:bg-primary-800 hover:shadow-xl hover:shadow-primary-700/30 active:scale-[0.98]"
              >
                <span className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative">Explorer les Services</span>
                <ArrowRight
                  className="relative h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={2.5}
                  aria-hidden
                />
              </Link>
              <Link
                to="/contact"
                className="inline-flex w-full sm:w-auto min-h-13 items-center justify-center rounded-2xl border border-slate-200/90 bg-white/80 px-9 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-slate-800 shadow-sm backdrop-blur-sm transition-all hover:border-primary-300 hover:bg-white hover:text-primary-800 hover:shadow-md active:scale-[0.98]"
              >
                Nous Contacter
              </Link>
            </div>
          </motion.div>
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
