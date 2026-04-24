import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Mail, Users, MessageSquare, Clock, ArrowLeft, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  createdAt: string;
}

export const Admin = () => {
  const [data, setData] = useState<{ messages: Message[]; users: User[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    const authStatus = sessionStorage.getItem("admin_auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/admin/data");
        if (!response.ok) throw new Error("Failed to fetch admin data");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError("Error loading dashboard data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "dev-cogese") {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce message ?")) return;

    try {
      const response = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete message");
      
      setData(prev => prev ? {
        ...prev,
        messages: prev.messages.filter(m => m.id !== id)
      } : null);
    } catch (err) {
      alert("Erreur lors de la suppression du message.");
      console.error(err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md text-center"
        >
          <div className="w-16 h-16 bg-primary-700 text-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
             <Link to="/" className="text-3xl font-black italic">C</Link>
          </div>
          <h2 className="text-2xl font-black italic text-slate-900 mb-2 uppercase tracking-tight">Accès Sécurisé</h2>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Cogese SARL Administration</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe confidentiel"
                className={`w-full p-5 bg-slate-50 border ${loginError ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-primary-700'} rounded-xl outline-none transition-all text-center font-bold tracking-widest`}
                autoFocus
              />
              {loginError && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-3 animate-pulse">Accès Refusé. Code incorrect.</p>}
            </div>
            <button 
              type="submit"
              className="w-full py-5 bg-primary-700 text-white text-xs font-black rounded-xl uppercase tracking-[0.3em] hover:bg-primary-800 transition-all shadow-xl active:scale-95"
            >
              Déverrouiller
            </button>
            <Link to="/" className="inline-block text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-primary-700 mt-4 transition-colors">
              ← Retour au site public
            </Link>
          </form>
        </motion.div>
      </div>
    );
  }

  if (loading && isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-primary-700/20 border-t-primary-700 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error && isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">{error}</h2>
        <Link to="/" className="text-primary-700 font-bold flex items-center gap-2">
          <ArrowLeft size={16} /> Retour à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Cogese SARL Management</p>
          </div>
          <Link to="/" className="text-sm font-bold text-slate-600 hover:text-primary-700 flex items-center gap-2 transition-colors">
            <ArrowLeft size={16} /> Voir le Site
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-50 text-primary-700 rounded-lg flex items-center justify-center">
                <MessageSquare size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Messages</p>
                <p className="text-2xl font-extrabold text-slate-900">{data?.messages.length || 0}</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-lg flex items-center justify-center">
                <Users size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Utilisateurs</p>
                <p className="text-2xl font-extrabold text-slate-900">{data?.users.length || 0}</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm md:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-lg flex items-center justify-center">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dernière Activité</p>
                <p className="text-sm font-bold text-slate-900">
                  {data?.messages[0] ? new Date(data.messages[0].createdAt).toLocaleDateString() : "Aucune"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Messages List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-extrabold text-slate-900 uppercase tracking-widest">Dernières Demandes</h2>
              <span className="text-[10px] font-bold text-primary-700 bg-primary-50 px-2 py-1 rounded">Mise à jour en direct</span>
            </div>
            
            {data?.messages.length === 0 ? (
              <div className="bg-white p-10 rounded-xl border border-slate-200 text-center">
                <p className="text-slate-500 font-medium">Aucun message reçu pour le moment.</p>
              </div>
            ) : (
              data?.messages.map((msg, index) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-extrabold text-slate-800 tracking-tight">{msg.subject}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] font-bold text-slate-400 px-2 py-0.5 bg-slate-100 rounded tracking-wider">{msg.name}</span>
                        <span className="text-[11px] font-bold text-primary-600 underline cursor-pointer">{msg.email}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => handleDelete(msg.id)}
                        className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 italic text-sm text-slate-600 leading-relaxed">
                    "{msg.message}"
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Users Sidebar */}
          <div className="space-y-6">
            <h2 className="text-lg font-extrabold text-slate-900 uppercase tracking-widest">Base Utilisateurs</h2>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-100">
                {data?.users.map((u) => (
                  <div key={u.id} className="p-4 flex items-center gap-3 hover:bg-slate-50 transition-colors">
                    {u.imageUrl ? (
                      <img src={u.imageUrl} alt="" className="w-10 h-10 rounded-full border border-slate-200" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-xs font-bold">
                        {u.firstName?.[0] || u.email[0]}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-extrabold text-slate-800 truncate">
                        {u.firstName} {u.lastName}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{u.email}</p>
                    </div>
                  </div>
                ))}
                {data?.users.length === 0 && (
                  <div className="p-10 text-center text-slate-500 text-sm font-medium">
                    Aucun utilisateur enregistré.
                  </div>
                )}
              </div>
              <div className="bg-slate-50 p-4 border-t border-slate-100">
                <button className="w-full py-2 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:border-primary-700 hover:text-primary-700 transition-all">
                  Exporter Tout (CSV)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
