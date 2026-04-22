import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-slate-50 pt-20 pb-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em]">
              © {new Date().getFullYear()} Cogess SARL. Tous droits réservés. <br/>
              <span className="text-primary-700/50">Licence de Services Professionnels #902-11C.</span>
            </p>
          </div>
          <div className="flex space-x-8 text-[10px] uppercase font-bold text-slate-400 tracking-widest">
            <Link to="/legal" className="hover:text-primary-700 cursor-pointer transition-colors">Mentions Légales</Link>
            <Link to="/privacy" className="hover:text-primary-700 cursor-pointer transition-colors">Politique de Confidentialité</Link>
            <span className="text-primary-700">HQ: Luxembourg-Ville</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
