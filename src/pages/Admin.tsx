import React, { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  BarChart3,
  BriefcaseBusiness,
  Check,
  Download,
  Eye,
  Image,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Plus,
  RefreshCcw,
  Save,
  Settings,
  Trash2,
  Upload,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  availableImages,
  createId,
  defaultSiteContent,
  EditableService,
  loadSiteContent,
  MediaItem,
  saveSiteContent,
  SiteContent,
  TeamMember,
} from "../cms.js";

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

type AdminData = { messages: Message[]; users: User[] };
type Tab = "overview" | "messages" | "services" | "team" | "media" | "settings";

const tabs: Array<{ id: Tab; label: string; icon: React.ElementType }> = [
  { id: "overview", label: "Vue d'ensemble", icon: LayoutDashboard },
  { id: "messages", label: "Demandes", icon: MessageSquare },
  { id: "services", label: "Services", icon: BriefcaseBusiness },
  { id: "team", label: "Équipe", icon: Users },
  { id: "media", label: "Images", icon: Image },
  { id: "settings", label: "Site", icon: Settings },
];

const emptyService: EditableService = {
  id: "",
  title: "",
  desc: "",
  longDesc: "",
  features: ["Nouvelle caractéristique"],
  image: "/new/perruque.jpg",
  gallery: [],
  visible: true,
};

const emptyMember: TeamMember = {
  id: "",
  name: "",
  role: "",
  image: "/Directeur generale.jpg",
  visible: true,
};

function formatDate(value?: string) {
  if (!value) return "Aucune donnée";
  return new Date(value).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

function messagesByDay(messages: Message[]) {
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const key = date.toISOString().slice(0, 10);
    return { key, label: date.toLocaleDateString("fr-FR", { weekday: "short" }), count: 0 };
  });

  messages.forEach((message) => {
    const key = new Date(message.createdAt).toISOString().slice(0, 10);
    const day = days.find((item) => item.key === key);
    if (day) day.count += 1;
  });

  return days;
}

function Field({
  label,
  value,
  onChange,
  multiline = false,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400">{label}</span>
      {multiline ? (
        <textarea
          rows={4}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-primary-700 focus:bg-white"
        />
      ) : (
        <input
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-primary-700 focus:bg-white"
        />
      )}
    </label>
  );
}

function ImagePicker({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="space-y-3">
      <Field label="Image URL ou chemin public" value={value} onChange={onChange} placeholder="/new/image.jpg" />
      <div className="grid grid-cols-4 gap-2">
        {availableImages.slice(0, 20).map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => onChange(image)}
            className={`aspect-square overflow-hidden rounded-lg border bg-slate-100 ${
              value === image ? "border-primary-700 ring-2 ring-primary-700/20" : "border-slate-200"
            }`}
            title={image}
          >
            <img src={image} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

export const Admin = () => {
  const [data, setData] = useState<AdminData | null>(null);
  const [content, setContent] = useState<SiteContent>(() => loadSiteContent());
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") === "true") setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/admin/data");
        if (!response.ok) throw new Error("Failed to fetch admin data");
        setData(await response.json());
      } catch (err) {
        setError("Impossible de charger les données du tableau de bord.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  const analytics = useMemo(() => {
    const messages = data?.messages || [];
    const users = data?.users || [];
    const sevenDays = messagesByDay(messages);
    const maxDay = Math.max(...sevenDays.map((day) => day.count), 1);
    const visibleServices = content.services.filter((service) => service.visible).length;
    const visibleMembers = content.team.filter((member) => member.visible).length;

    return {
      messages,
      users,
      sevenDays,
      maxDay,
      visibleServices,
      visibleMembers,
      latestMessage: messages[0]?.createdAt,
    };
  }, [content.services, content.team, data]);

  const persist = (next: SiteContent) => {
    setContent(next);
    saveSiteContent(next);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (password === "dev-cogese") {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce message ?")) return;
    try {
      const response = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete message");
      setData((prev) => (prev ? { ...prev, messages: prev.messages.filter((message) => message.id !== id) } : null));
    } catch (err) {
      alert("Erreur lors de la suppression du message.");
      console.error(err);
    }
  };

  const updateService = (id: string, patch: Partial<EditableService>) => {
    persist({ ...content, services: content.services.map((service) => (service.id === id ? { ...service, ...patch } : service)) });
  };

  const addService = () => {
    const id = createId(`service-${Date.now()}`);
    persist({
      ...content,
      services: [{ ...emptyService, id, title: "Nouveau service", desc: "Description courte du service." }, ...content.services],
    });
    setActiveTab("services");
  };

  const updateMember = (id: string, patch: Partial<TeamMember>) => {
    persist({ ...content, team: content.team.map((member) => (member.id === id ? { ...member, ...patch } : member)) });
  };

  const addMember = () => {
    const id = createId(`membre-${Date.now()}`);
    persist({ ...content, team: [{ ...emptyMember, id, name: "Nouveau membre", role: "Fonction" }, ...content.team] });
    setActiveTab("team");
  };

  const updateMedia = (id: string, patch: Partial<MediaItem>) => {
    persist({ ...content, media: content.media.map((item) => (item.id === id ? { ...item, ...patch } : item)) });
  };

  const addMedia = () => {
    const id = createId(`image-${Date.now()}`);
    persist({
      ...content,
      media: [{ id, title: "Nouvelle image", section: "gallery", image: "/new/perruque.jpg", visible: true }, ...content.media],
    });
    setActiveTab("media");
  };

  const exportContent = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "cogese-site-content.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const importContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        persist(JSON.parse(String(reader.result)) as SiteContent);
      } catch {
        alert("Le fichier importé n'est pas valide.");
      }
    };
    reader.readAsText(file);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 font-sans">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-10 rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md text-center">
          <div className="w-16 h-16 bg-primary-700 text-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
            <Link to="/" className="text-3xl font-black italic">C</Link>
          </div>
          <h2 className="text-2xl font-black italic text-slate-900 mb-2 uppercase tracking-tight">Accès Sécurisé</h2>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Cogese SARL Administration</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Mot de passe confidentiel"
              className={`w-full p-5 bg-slate-50 border ${loginError ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-primary-700"} rounded-xl outline-none transition-all text-center font-bold tracking-widest`}
              autoFocus
            />
            {loginError && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">Accès refusé. Code incorrect.</p>}
            <button type="submit" className="w-full py-5 bg-primary-700 text-white text-xs font-black rounded-xl uppercase tracking-[0.3em] hover:bg-primary-800 transition-all shadow-xl active:scale-95">
              Déverrouiller
            </button>
            <Link to="/" className="inline-block text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-primary-700 transition-colors">
              ← Retour au site public
            </Link>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-200 bg-slate-950 text-white lg:block">
        <div className="p-6">
          <p className="text-2xl font-black italic tracking-tight">COGESE</p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">Control Center</p>
        </div>
        <nav className="space-y-1 px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-bold transition ${
                activeTab === tab.id ? "bg-white text-slate-950" : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex flex-col gap-4 px-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Tableau de bord</h1>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Dernière personnalisation: {formatDate(content.updatedAt)}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-slate-600 hover:text-primary-700">
                <Eye size={15} /> Voir le site
              </Link>
              <button onClick={exportContent} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-slate-600 hover:text-primary-700">
                <Download size={15} /> Exporter
              </button>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-slate-600 hover:text-primary-700">
                <Upload size={15} /> Importer
                <input type="file" accept="application/json" onChange={importContent} className="hidden" />
              </label>
              <button onClick={() => persist(defaultSiteContent)} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-slate-600 hover:text-red-600">
                <RefreshCcw size={15} /> Réinitialiser
              </button>
              <span className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-extrabold uppercase tracking-widest ${saved ? "bg-emerald-600 text-white" : "bg-slate-900 text-white"}`}>
                {saved ? <Check size={15} /> : <Save size={15} />} {saved ? "Sauvegardé" : "Auto-save"}
              </span>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto px-5 pb-4 lg:hidden">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`shrink-0 rounded-lg px-4 py-2 text-xs font-extrabold uppercase tracking-widest ${activeTab === tab.id ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-500"}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        <div className="px-5 py-8 lg:px-8">
          {error && <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">{error}</div>}
          {loading && <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-500">Chargement des données réelles...</div>}

          {activeTab === "overview" && (
            <div className="space-y-8">
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {[
                  { label: "Messages reçus", value: analytics.messages.length, icon: MessageSquare, tone: "text-primary-700 bg-primary-50" },
                  { label: "Utilisateurs", value: analytics.users.length, icon: Users, tone: "text-emerald-700 bg-emerald-50" },
                  { label: "Services visibles", value: analytics.visibleServices, icon: BriefcaseBusiness, tone: "text-amber-700 bg-amber-50" },
                  { label: "Membres visibles", value: analytics.visibleMembers, icon: Mail, tone: "text-rose-700 bg-rose-50" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400">{stat.label}</p>
                        <p className="mt-2 text-3xl font-extrabold text-slate-900">{stat.value}</p>
                      </div>
                      <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.tone}`}>
                        <stat.icon size={22} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-extrabold text-slate-900">Demandes sur 7 jours</h2>
                      <p className="text-xs font-semibold text-slate-400">Graphique basé sur les messages réels du formulaire.</p>
                    </div>
                    <BarChart3 className="text-primary-700" />
                  </div>
                  <div className="flex h-64 items-end gap-3">
                    {analytics.sevenDays.map((day) => (
                      <div key={day.key} className="flex flex-1 flex-col items-center gap-3">
                        <div className="flex h-52 w-full items-end rounded-lg bg-slate-50 p-2">
                          <div className="w-full rounded-md bg-primary-700 transition-all" style={{ height: `${Math.max((day.count / analytics.maxDay) * 100, day.count ? 12 : 2)}%` }} />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-extrabold text-slate-900">{day.count}</p>
                          <p className="text-[10px] font-bold uppercase text-slate-400">{day.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-extrabold text-slate-900">Santé du site</h2>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                      <span className="text-sm font-bold text-slate-600">Dernière demande</span>
                      <span className="text-sm font-extrabold text-slate-900">{formatDate(analytics.latestMessage)}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                      <span className="text-sm font-bold text-slate-600">Images configurées</span>
                      <span className="text-sm font-extrabold text-slate-900">{content.media.length}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                      <span className="text-sm font-bold text-slate-600">Services masqués</span>
                      <span className="text-sm font-extrabold text-slate-900">{content.services.filter((item) => !item.visible).length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "messages" && (
            <div className="space-y-5">
              {analytics.messages.map((message) => (
                <div key={message.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-extrabold text-slate-900">{message.subject}</h3>
                      <p className="mt-1 text-xs font-bold text-slate-400">{message.name} · {message.email} · {formatDate(message.createdAt)}</p>
                    </div>
                    <button onClick={() => handleDeleteMessage(message.id)} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-extrabold uppercase tracking-widest text-slate-400 hover:border-red-200 hover:text-red-600">
                      <Trash2 size={14} /> Supprimer
                    </button>
                  </div>
                  <p className="mt-5 rounded-lg bg-slate-50 p-4 text-sm font-medium leading-relaxed text-slate-600">{message.message}</p>
                </div>
              ))}
              {!analytics.messages.length && <div className="rounded-xl border border-slate-200 bg-white p-10 text-center font-bold text-slate-500">Aucune demande reçue.</div>}
            </div>
          )}

          {activeTab === "services" && (
            <div className="space-y-5">
              <button onClick={addService} className="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-5 py-3 text-xs font-extrabold uppercase tracking-widest text-white shadow-lg shadow-primary-700/20">
                <Plus size={16} /> Ajouter un service
              </button>
              {content.services.map((service) => (
                <div key={service.id} className="grid gap-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm xl:grid-cols-[220px_1fr]">
                  <ImagePicker value={service.image} onChange={(image) => updateService(service.id, { image })} />
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Nom du service" value={service.title} onChange={(title) => updateService(service.id, { title })} />
                    <Field label="Identifiant URL" value={service.id} onChange={(id) => updateService(service.id, { id: createId(id) })} />
                    <Field label="Description courte" value={service.desc} onChange={(desc) => updateService(service.id, { desc })} multiline />
                    <Field label="Description détaillée" value={service.longDesc} onChange={(longDesc) => updateService(service.id, { longDesc })} multiline />
                    <Field label="Caractéristiques (une par ligne)" value={service.features.join("\n")} onChange={(value) => updateService(service.id, { features: value.split("\n").filter(Boolean) })} multiline />
                    <Field label="Galerie (une image par ligne)" value={service.gallery.join("\n")} onChange={(value) => updateService(service.id, { gallery: value.split("\n").filter(Boolean) })} multiline />
                    <div className="flex flex-wrap items-center gap-3 md:col-span-2">
                      <button onClick={() => updateService(service.id, { visible: !service.visible })} className={`rounded-lg px-4 py-2 text-xs font-extrabold uppercase tracking-widest ${service.visible ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                        {service.visible ? "Visible" : "Masqué"}
                      </button>
                      <button onClick={() => persist({ ...content, services: content.services.filter((item) => item.id !== service.id) })} className="rounded-lg px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-red-600 hover:bg-red-50">
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "team" && (
            <div className="space-y-5">
              <button onClick={addMember} className="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-5 py-3 text-xs font-extrabold uppercase tracking-widest text-white shadow-lg shadow-primary-700/20">
                <Plus size={16} /> Ajouter un membre
              </button>
              <div className="grid gap-5 xl:grid-cols-2">
                {content.team.map((member) => (
                  <div key={member.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="grid gap-5 sm:grid-cols-[120px_1fr]">
                      <img src={member.image} alt="" className="h-28 w-28 rounded-xl object-cover" />
                      <div className="space-y-4">
                        <Field label="Nom" value={member.name} onChange={(name) => updateMember(member.id, { name })} />
                        <Field label="Fonction" value={member.role} onChange={(role) => updateMember(member.id, { role })} />
                        <ImagePicker value={member.image} onChange={(image) => updateMember(member.id, { image })} />
                        <div className="flex gap-3">
                          <button onClick={() => updateMember(member.id, { visible: !member.visible })} className={`rounded-lg px-4 py-2 text-xs font-extrabold uppercase tracking-widest ${member.visible ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                            {member.visible ? "Visible" : "Masqué"}
                          </button>
                          <button onClick={() => persist({ ...content, team: content.team.filter((item) => item.id !== member.id) })} className="rounded-lg px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-red-600 hover:bg-red-50">
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "media" && (
            <div className="space-y-5">
              <button onClick={addMedia} className="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-5 py-3 text-xs font-extrabold uppercase tracking-widest text-white shadow-lg shadow-primary-700/20">
                <Plus size={16} /> Ajouter une image
              </button>
              <div className="grid gap-5 xl:grid-cols-2">
                {content.media.map((item) => (
                  <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="grid gap-5 sm:grid-cols-[180px_1fr]">
                      <img src={item.image} alt="" className="aspect-[4/3] w-full rounded-xl object-cover" />
                      <div className="space-y-4">
                        <Field label="Titre" value={item.title} onChange={(title) => updateMedia(item.id, { title })} />
                        <Field label="Section" value={item.section} onChange={(section) => updateMedia(item.id, { section })} />
                        <ImagePicker value={item.image} onChange={(image) => updateMedia(item.id, { image })} />
                        <div className="flex gap-3">
                          <button onClick={() => updateMedia(item.id, { visible: !item.visible })} className={`rounded-lg px-4 py-2 text-xs font-extrabold uppercase tracking-widest ${item.visible ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                            {item.visible ? "Visible" : "Masqué"}
                          </button>
                          <button onClick={() => persist({ ...content, media: content.media.filter((mediaItem) => mediaItem.id !== item.id) })} className="rounded-lg px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-red-600 hover:bg-red-50">
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="max-w-4xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-extrabold text-slate-900">Texte principal du site</h2>
              <p className="mt-1 text-sm font-semibold text-slate-400">Ces champs contrôlent la première section de la page d'accueil.</p>
              <div className="mt-6 grid gap-5">
                <Field label="Badge" value={content.hero.eyebrow} onChange={(eyebrow) => persist({ ...content, hero: { ...content.hero, eyebrow } })} />
                <Field label="Titre" value={content.hero.title} onChange={(title) => persist({ ...content, hero: { ...content.hero, title } })} />
                <Field label="Texte en bleu" value={content.hero.highlight} onChange={(highlight) => persist({ ...content, hero: { ...content.hero, highlight } })} />
                <Field label="Description" value={content.hero.description} onChange={(description) => persist({ ...content, hero: { ...content.hero, description } })} multiline />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
