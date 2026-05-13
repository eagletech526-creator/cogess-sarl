import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSiteContent } from "../cms.js";

export const Home = () => {
  const { content, services, media } = useSiteContent();
  const heroImages = [
    media.find((item) => item.id === "hero-beauty")?.image || "/new/perruque.jpg",
    media.find((item) => item.id === "hero-logistics")?.image || "/new/shipping.jpg",
    media.find((item) => item.id === "hero-products")?.image || "/new/savon liquide.jpg",
    media.find((item) => item.id === "hero-real-estate")?.image || "/new/immeuble3.jpg",
  ];

  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-44 pb-14 lg:pt-56 lg:pb-16">
        {/* Background */}
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(248,250,252,0.84)_46%,rgba(219,234,254,0.62))]"
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
            className="relative z-20 max-w-4xl"
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 shadow-sm backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary-600 shadow-[0_0_10px_rgba(29,78,216,0.6)]" />
              {content.hero.eyebrow}
            </motion.p>

            <h1 className="text-balance text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.12] sm:leading-[1.08] mb-8">
              <span className="text-slate-900">{content.hero.title}</span>
              <br />
              <span className="bg-linear-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent">
                {content.hero.highlight}
              </span>
            </h1>
            <p className="text-balance text-lg sm:text-xl text-slate-600/95 mb-10 leading-relaxed max-w-2xl font-medium">
              {content.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-stretch sm:items-center w-full sm:w-auto">
              <Link
                to="/services"
                className="group relative inline-flex w-full sm:w-auto min-h-13 items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary-700 px-9 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-primary-700/25 transition-all hover:bg-primary-800 hover:shadow-xl hover:shadow-primary-700/30 active:scale-[0.98]"
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
                className="inline-flex w-full sm:w-auto min-h-13 items-center justify-center rounded-lg border border-slate-200/90 bg-white/80 px-9 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-slate-800 shadow-sm backdrop-blur-sm transition-all hover:border-primary-300 hover:bg-white hover:text-primary-800 hover:shadow-md active:scale-[0.98]"
              >
                Nous Contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-50 pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 mx-auto w-full max-w-2xl xl:max-w-none"
            >
              <div
                className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-linear-to-br from-primary-700/12 via-white/40 to-slate-900/10 blur-2xl"
                aria-hidden
              />
              <div className="relative grid aspect-[4/5] grid-cols-12 grid-rows-12 gap-3 sm:aspect-[16/11] sm:gap-4 xl:aspect-[5/4]">
                <Link
                  to="/services/beauty-aesthetics"
                  className="group relative col-span-12 row-span-6 overflow-hidden rounded-2xl border border-white/80 bg-slate-200 shadow-2xl shadow-slate-900/15 sm:col-span-7 sm:row-span-8"
                >
                  <img
                    src={heroImages[0]}
                    alt="Perruques et coiffure Cogese SARL"
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/82 via-slate-950/18 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/65">
                      Beauté
                    </p>
                    <h3 className="mt-1 text-xl font-extrabold leading-tight text-white">
                      Salon, mèches et perruques premium
                    </h3>
                  </div>
                </Link>

                <Link
                  to="/services/logistics-transport"
                  className="group relative col-span-7 row-span-3 overflow-hidden rounded-2xl border border-white/80 bg-slate-200 shadow-xl shadow-slate-900/10 sm:col-span-5 sm:row-span-4"
                >
                  <img
                    src={heroImages[1]}
                    alt="Transport et logistique Cogese SARL"
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/78 via-slate-950/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/70">
                      Transit
                    </p>
                    <h3 className="mt-1 text-sm font-extrabold leading-tight text-white sm:text-base">
                      Cameroun · Canada
                    </h3>
                  </div>
                </Link>

                <Link
                  to="/services/domestic-training"
                  className="group relative col-span-5 row-span-6 overflow-hidden rounded-2xl border border-white/80 bg-slate-200 shadow-xl shadow-slate-900/10 sm:col-span-5 sm:row-span-5"
                >
                  <img
                    src={heroImages[2]}
                    alt="Savon liquide Cogese SARL"
                    className="h-full w-full object-cover object-[50%_42%] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/70">
                      Produits
                    </p>
                    <h3 className="mt-1 text-sm font-extrabold leading-tight text-white sm:text-base">
                      Savon, javel et formations
                    </h3>
                  </div>
                </Link>

                <Link
                  to="/services/real-estate-lottery"
                  className="group relative col-span-7 row-span-3 overflow-hidden rounded-2xl border border-white/80 bg-slate-200 shadow-xl shadow-slate-900/10 sm:col-span-7 sm:row-span-4"
                >
                  <img
                    src={heroImages[3]}
                    alt="Immobilier et gestion Cogese SARL"
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-slate-950/76 via-slate-950/22 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/70">
                      Immobilier
                    </p>
                    <h3 className="mt-1 text-sm font-extrabold leading-tight text-white sm:text-base">
                      Gestion et maintenance
                    </h3>
                  </div>
                </Link>

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
            {services.slice(0, 3).map((s, i) => (
              <Link to={`/services/${s.id}`} key={s.id}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm transition-all group hover:border-primary-700/50 hover:shadow-xl hover:shadow-slate-900/8"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-slate-200">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-7">
                    <s.icon className="w-6 h-6 text-primary-700 mb-5 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <h4 className="text-base font-bold text-slate-900 mb-4 uppercase tracking-wider">{s.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{s.desc}</p>
                  </div>
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
