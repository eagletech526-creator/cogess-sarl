import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { useUser } from "@clerk/clerk-react";

export const Contact = () => {
  const { isSignedIn, user } = useUser();
  const [formData, setFormData] = useState({ 
    name: user?.fullName || "", 
    email: user?.primaryEmailAddress?.emailAddress || "", 
    subject: "",
    message: "" 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userId: user?.id || null
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setIsSubmitted(true);
      setFormData({ 
        name: user?.fullName || "", 
        email: user?.primaryEmailAddress?.emailAddress || "", 
        subject: "",
        message: "" 
      });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setError("An error occurred while sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 pt-40 bg-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="flex items-center space-x-3 mb-10">
              <div className="h-px w-10 bg-primary-700"></div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-700">Demande</h2>
            </div>
            <h3 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
              Optimisons Vos <span className="text-primary-700">Opérations.</span>
            </h3>
            <p className="text-lg text-slate-500 mb-12 leading-relaxed">
              Remplissez notre formulaire de demande formelle. Notre équipe répond généralement sous 24 heures ouvrables avec une évaluation préliminaire.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Adresse du Siège</p>
                <p className="text-sm text-slate-700">Pôle Technologique de Luxembourg</p>
                <p className="text-xs text-slate-500 font-medium italic">Disponible pour audit en personne.</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Contact Direct</p>
                <p className="text-sm text-slate-700">contact@cogess.com</p>
                <p className="text-xs text-slate-500 font-medium italic">Canal sécurisé et crypté.</p>
              </div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-10 rounded-xl border border-slate-200 shadow-2xl"
          >
            <h3 className="text-xl font-extrabold text-slate-900 mb-8 uppercase tracking-widest">Demande d'Entreprise</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-[0.2em]">Nom Complet</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                  placeholder="Jean Dupont" 
                  className="w-full text-sm p-4 bg-slate-50 border border-slate-200 rounded outline-none focus:border-primary-700 focus:bg-white transition-all font-bold" 
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-[0.2em]">E-mail d'Entreprise</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required 
                  placeholder="jean@entreprise.com" 
                  className="w-full text-sm p-4 bg-slate-50 border border-slate-200 rounded outline-none focus:border-primary-700 focus:bg-white transition-all font-bold" 
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-[0.2em]">Objet de la Demande</label>
                <input 
                  type="text" 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required 
                  placeholder="Demande d'Audit Opérationnel" 
                  className="w-full text-sm p-4 bg-slate-50 border border-slate-200 rounded outline-none focus:border-primary-700 focus:bg-white transition-all font-bold" 
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-[0.2em]">Détails de la Demande</label>
                <textarea 
                  rows={4} 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required 
                  placeholder="Décrivez brièvement votre défi commercial..." 
                  className="w-full text-sm p-4 bg-slate-50 border border-slate-200 rounded outline-none focus:border-primary-700 focus:bg-white transition-all resize-none font-bold"
                ></textarea>
              </div>
              
              {error && <p className="text-red-500 text-xs font-bold uppercase tracking-widest">{error}</p>}
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-5 bg-primary-700 text-white text-xs font-extrabold rounded uppercase tracking-widest hover:bg-primary-800 transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : isSubmitted ? "DEMANDE COMMUNIQUÉE" : "ENVOYER LA DEMANDE"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
