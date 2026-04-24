import { motion, AnimatePresence } from "motion/react";
import { Building2, Menu, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SignInButton, SignOutButton, UserButton, useUser } from "@clerk/clerk-react";
import logoImg from "../assets/logo.jpg";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "À propos", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== "/" ? "bg-white/95 backdrop-blur-sm py-4 shadow-sm border-b border-slate-200" : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-lg overflow-hidden border border-slate-100 shadow-sm">
              <img src={logoImg} alt="Cogese Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-2xl font-black italic tracking-tighter text-slate-900">
              COGESE <span className="text-primary-700">SARL</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.href}
                className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                  location.pathname === link.href ? "text-primary-700" : "text-slate-500 hover:text-primary-700"
                }`}
                style={{ fontSize: "11px" }}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="h-4 w-px bg-slate-200 mx-2" />
            
            {isSignedIn ? (
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Bonjour, {user.firstName || "Membre"}</span>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="bg-primary-700 text-white px-6 py-2.5 rounded text-xs font-bold uppercase tracking-widest hover:bg-primary-800 transition-all shadow-md active:scale-95 flex items-center gap-2">
                  <User size={14} />
                  Accès Client
                </button>
              </SignInButton>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
             {isSignedIn && <UserButton afterSignOutUrl="/" />}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-900 hover:text-primary-700 transition-colors"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-slate-50 shadow-2xl border-t border-slate-200 md:hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-primary-700 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              {!isSignedIn && (
                <SignInButton mode="modal">
                  <button className="bg-primary-700 text-white text-center py-4 rounded font-bold uppercase tracking-widest shadow-lg">
                    Accès Client
                  </button>
                </SignInButton>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
