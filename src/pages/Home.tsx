import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Clock, MapPin, PhoneCall, ShieldCheck } from "lucide-react";
import { useSiteContent } from "../cms.js";

export const Home = () => {
  const { content, services, media } = useSiteContent();
  const heroBackground = media.find((item) => item.id === "hero-real-estate")?.image || "/welcome image.jpg";
  const phoneNumber = "691293948";
  const whatsappNumber = "671987009";
  const countryCode = "237";

  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="relative min-h-[760px] overflow-hidden bg-slate-950 pt-44 pb-20 lg:pt-56 lg:pb-28">
        <img
          src={heroBackground}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-slate-950/68" aria-hidden />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/45 via-slate-950/18 to-slate-950/82" aria-hidden />

        <div className="relative z-10 mx-auto flex min-h-[520px] max-w-7xl items-center justify-center px-6 text-center lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-5xl"
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 shadow-sm backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]" />
              {content.hero.eyebrow}
            </motion.p>

            <h1 className="mx-auto mb-8 max-w-5xl text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl leading-[1.12] sm:leading-[1.08]">
              <span>{content.hero.title}</span>
              <br />
              <span className="text-white/90">
                {content.hero.highlight}
              </span>
            </h1>
            <p className="mx-auto mb-10 max-w-3xl text-balance text-lg font-medium leading-relaxed text-white/80 sm:text-xl">
              {content.hero.description}
            </p>
            <div className="flex w-full flex-col items-stretch justify-center gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-5">
              <Link
                to="/services"
                className="group relative inline-flex min-h-13 w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-white px-9 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-slate-950 shadow-xl shadow-slate-950/20 transition-all hover:bg-slate-100 active:scale-[0.98] sm:w-auto"
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
                className="inline-flex min-h-13 w-full items-center justify-center rounded-lg border border-white/30 bg-white/10 px-9 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-sm backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/20 active:scale-[0.98] sm:w-auto"
              >
                Nous Contacter
              </Link>
            </div>
            <div className="mt-14 grid gap-3 border-t border-white/15 pt-8 text-white/80 sm:grid-cols-3">
              {["Beauté & esthétique", "Logistique & transport", "Immobilier & services"].map((item) => (
                <div key={item} className="rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold backdrop-blur-sm">
                  {item}
                </div>
              ))}
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

      {/* Why Choose Us */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-14 grid gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-end">
            <div>
              <div className="mb-6 flex items-center space-x-3">
                <div className="h-px w-10 bg-primary-700" />
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-700">Pourquoi Cogese</h2>
              </div>
              <h3 className="text-3xl font-extrabold leading-tight text-slate-900 lg:text-5xl">
                Un partenaire local, structuré pour gérer plusieurs besoins à la fois.
              </h3>
            </div>
            <p className="max-w-2xl text-base font-medium leading-relaxed text-slate-600">
              Nous combinons proximité, suivi rigoureux et équipes spécialisées afin d'accompagner chaque client avec des solutions simples, lisibles et adaptées au terrain.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Suivi fiable",
                desc: "Un accompagnement clair depuis la première prise de contact jusqu'à l'exécution.",
                icon: CheckCircle2,
              },
              {
                title: "Services intégrés",
                desc: "Beauté, logistique, immobilier, produits et accompagnement voyage dans une seule structure.",
                icon: ShieldCheck,
              },
              {
                title: "Présence locale",
                desc: "Des points d'ancrage à Loum et Douala pour rester proche des clients.",
                icon: MapPin,
              },
              {
                title: "Réactivité",
                desc: "Une équipe organisée pour répondre rapidement aux demandes importantes.",
                icon: Clock,
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                  <item.icon size={22} />
                </div>
                <h4 className="text-base font-extrabold uppercase tracking-wide text-slate-900">{item.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-14 max-w-3xl">
            <div className="mb-6 flex items-center space-x-3">
              <div className="h-px w-10 bg-primary-700" />
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-700">Notre Méthode</h2>
            </div>
            <h3 className="text-3xl font-extrabold leading-tight text-slate-900 lg:text-5xl">
              Un parcours simple pour transformer votre demande en action.
            </h3>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                step: "01",
                title: "Écoute du besoin",
                desc: "Vous nous présentez votre projet, votre contrainte ou le service recherché.",
              },
              {
                step: "02",
                title: "Orientation claire",
                desc: "Nous identifions la meilleure solution, les délais, les pièces utiles et les prochaines étapes.",
              },
              {
                step: "03",
                title: "Exécution suivie",
                desc: "Notre équipe assure le suivi et vous garde informé jusqu'à la finalisation.",
              },
            ].map((item) => (
              <div key={item.step} className="rounded-xl border border-slate-200 bg-slate-50 p-8">
                <span className="text-sm font-black uppercase tracking-[0.3em] text-primary-700">{item.step}</span>
                <h4 className="mt-8 text-xl font-extrabold text-slate-900">{item.title}</h4>
                <p className="mt-4 text-sm leading-relaxed text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.55fr] lg:items-center">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-white/50">Prêt à avancer ?</p>
              <h3 className="max-w-3xl text-3xl font-extrabold leading-tight lg:text-5xl">
                Parlons de votre besoin et trouvons la solution Cogese adaptée.
              </h3>
              <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-white/65">
                Que votre demande concerne un service beauté, une livraison, un dossier voyage, un produit ménager ou la gestion d'un bien, notre équipe peut vous orienter.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/8 p-6 backdrop-blur-sm">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-white text-slate-950">
                <PhoneCall size={22} />
              </div>
              <p className="text-sm font-bold text-white/60">Contact direct</p>
              <p className="mt-2 text-2xl font-extrabold">
                <a
                  href={`tel:+${countryCode}${phoneNumber}`}
                  className="transition hover:text-white/80"
                >
                  {phoneNumber}
                </a>
              </p>
              <p className="mt-1 text-sm font-semibold text-white/60">
                WhatsApp :{" "}
                <a
                  href={`https://wa.me/${countryCode}${whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-white"
                >
                  {whatsappNumber}
                </a>
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-xs font-extrabold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-slate-100"
              >
                Envoyer une demande
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
