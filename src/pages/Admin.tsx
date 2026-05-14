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
  contentCategories,
  createId,
  defaultSiteContent,
  EditableService,
  loadSiteContent,
  MediaItem,
  saveSiteContent,
  serviceCategories,
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
type Toast = { id: number; type: "success" | "error"; message: string };

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
  category: "beauty",
  title: "",
  desc: "",
  longDesc: "",
  features: ["Nouvelle caractéristique"],
  image: "/new/perruque.jpg",
  gallery: [],
  visible: true,
};

const emptyMedia: MediaItem = {
  id: "",
  title: "",
  category: "beauty",
  section: "gallery",
  image: "/new/perruque.jpg",
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
  description,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
  description?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="block text-sm font-semibold text-slate-800">{label}</span>
      {multiline ? (
        <textarea
          rows={4}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className="w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary-700 focus:ring-4 focus:ring-primary-700/10"
        />
      ) : (
        <input
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary-700 focus:ring-4 focus:ring-primary-700/10"
        />
      )}
      {description && <span className="block text-xs leading-relaxed text-slate-500">{description}</span>}
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
  description,
}: {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
  description?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="block text-sm font-semibold text-slate-800">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-primary-700 focus:ring-4 focus:ring-primary-700/10"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {description && <span className="block text-xs leading-relaxed text-slate-500">{description}</span>}
    </label>
  );
}

function ImagePicker({ value, onChange, label = "Image" }: { value: string; onChange: (value: string) => void; label?: string }) {
  const selectFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-slate-800">{label}</label>
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
        <img src={value} alt="" className="aspect-[4/3] w-full object-cover" />
      </div>
      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm font-semibold text-slate-700 hover:border-primary-400 hover:bg-primary-50 hover:text-primary-700">
        <Upload size={15} />
        Choisir un fichier
        <input type="file" accept="image/*" onChange={(event) => selectFile(event.target.files?.[0])} className="hidden" />
      </label>
      <p className="text-xs leading-relaxed text-slate-500">Sélectionnez une image depuis l'ordinateur. L'aperçu à droite se mettra à jour automatiquement.</p>
    </div>
  );
}

function FeatureEditor({ value, onChange }: { value: string[]; onChange: (value: string[]) => void }) {
  const items = value.length ? value : [""];

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-semibold text-slate-800">Caractéristiques / features</label>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">Ajoutez une caractéristique par ligne. Utilisez le bouton + pour créer une nouvelle ligne.</p>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              value={item}
              placeholder={`Caractéristique ${index + 1}`}
              onChange={(event) => {
                const next = [...items];
                next[index] = event.target.value;
                onChange(next);
              }}
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary-700 focus:ring-4 focus:ring-primary-700/10"
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
              className="rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              Retirer
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        <Plus size={15} />
        Ajouter une caractéristique
      </button>
    </div>
  );
}

function GalleryPicker({ value, onChange }: { value: string[]; onChange: (value: string[]) => void }) {
  const selectFiles = (files?: FileList | null) => {
    if (!files?.length) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => onChange([...value, String(reader.result)]);
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-semibold text-slate-800">Autres images / galerie</label>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">Ajoutez plusieurs images pour la galerie du produit ou du service.</p>
      </div>
      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm font-semibold text-slate-700 hover:border-primary-400 hover:bg-primary-50 hover:text-primary-700">
        <Upload size={15} />
        Ajouter des images de galerie
        <input type="file" accept="image/*" multiple onChange={(event) => selectFiles(event.target.files)} className="hidden" />
      </label>
      {value.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {value.map((image, index) => (
            <div key={`${image}-${index}`} className="group relative overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
              <img src={image} alt="" className="aspect-square w-full object-cover" />
              <button
                type="button"
                onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))}
                className="absolute right-2 top-2 rounded-md bg-white/95 px-2 py-1 text-xs font-semibold text-red-600 opacity-0 shadow-sm transition group-hover:opacity-100"
              >
                Retirer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function categoryLabel(value: string) {
  return contentCategories.find((category) => category.value === value)?.label || value;
}

function FormShell({
  title,
  description,
  form,
  preview,
}: {
  title: string;
  description: string;
  form: React.ReactNode;
  preview: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-500">{description}</p>
      </div>
      <div className="grid gap-8 p-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">{form}</div>
        <div className="xl:sticky xl:top-28 xl:self-start">{preview}</div>
      </div>
    </div>
  );
}

function PreviewPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Preview</span>
      </div>
      {children}
    </div>
  );
}

function ServicePreview({ service }: { service: EditableService }) {
  return (
    <PreviewPanel title="Aperçu du service">
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <img src={service.image} alt="" className="aspect-[16/10] w-full object-cover" />
        <div className="p-5">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-700">{categoryLabel(service.category)}</p>
          <h3 className="text-lg font-extrabold text-slate-950">{service.title || "Nom du service"}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">{service.longDesc || "La longue description apparaîtra ici."}</p>
          <div className="mt-4 space-y-2">
            {service.features.slice(0, 3).map((feature, index) => (
              <p key={`${feature}-${index}`} className="rounded-md bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">{feature}</p>
            ))}
          </div>
        </div>
      </div>
    </PreviewPanel>
  );
}

function MemberPreview({ member }: { member: TeamMember }) {
  return (
    <PreviewPanel title="Aperçu du membre">
      <div className="rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm">
        <img src={member.image} alt="" className="mx-auto h-36 w-36 rounded-full border-4 border-white object-cover object-top shadow-lg" />
        <h3 className="mt-5 font-extrabold text-slate-950">{member.name || "Nom du membre"}</h3>
        <p className="mt-1 text-sm font-semibold text-primary-700">{member.role || "Fonction"}</p>
      </div>
    </PreviewPanel>
  );
}

function MediaPreview({ item }: { item: MediaItem }) {
  return (
    <PreviewPanel title="Aperçu de l'image">
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <img src={item.image} alt="" className="aspect-[4/3] w-full object-cover" />
        <div className="p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-700">{categoryLabel(item.category)}</p>
          <h3 className="mt-2 font-extrabold text-slate-950">{item.title || "Titre de l'image"}</h3>
          <p className="mt-1 text-sm text-slate-500">Section: {item.section}</p>
        </div>
      </div>
    </PreviewPanel>
  );
}

function ConfirmDialog({
  title,
  description,
  onCancel,
  onConfirm,
}: {
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-2xl">
        <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">{description}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Annuler
          </button>
          <button onClick={onConfirm} className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700">
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

function ToastStack({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="fixed bottom-5 right-5 z-[60] flex w-[min(380px,calc(100vw-2.5rem))] flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-xl border p-4 text-sm font-semibold shadow-2xl backdrop-blur ${
            toast.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          <div className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                toast.type === "success" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
              }`}
            >
              {toast.type === "success" ? <Check size={13} /> : "!"}
            </span>
            <p className="leading-relaxed">{toast.message}</p>
          </div>
        </div>
      ))}
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
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [editingMediaId, setEditingMediaId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<null | { type: "service" | "member" | "media"; id: string; label: string }>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [serviceDraft, setServiceDraft] = useState<EditableService>({
    ...emptyService,
    title: "Nom du produit ou service",
    desc: "Résumé court du produit ou service.",
    longDesc: "Présentez ici les détails, bénéfices et conditions du produit ou service.",
  });
  const [memberDraft, setMemberDraft] = useState<TeamMember>({
    ...emptyMember,
    name: "Nom du membre",
    role: "Fonction",
  });
  const [mediaDraft, setMediaDraft] = useState<MediaItem>({
    ...emptyMedia,
    title: "Nouvelle image",
  });

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

  const showToast = (type: Toast["type"], message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }].slice(-3));
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3600);
  };

  const persist = (next: SiteContent, successMessage?: string) => {
    try {
      setContent(next);
      saveSiteContent(next);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 1600);
      if (successMessage) showToast("success", successMessage);
      return true;
    } catch (err) {
      console.error(err);
      showToast("error", "L'action a échoué. Vérifiez l'image ou réessayez.");
      return false;
    }
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (password === "dev-cogese") {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      setLoginError(false);
      showToast("success", "Connexion administrateur réussie.");
    } else {
      setLoginError(true);
      showToast("error", "Mot de passe incorrect.");
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce message ?")) return;
    try {
      const response = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete message");
      setData((prev) => (prev ? { ...prev, messages: prev.messages.filter((message) => message.id !== id) } : null));
      showToast("success", "Message supprimé avec succès.");
    } catch (err) {
      showToast("error", "Erreur lors de la suppression du message.");
      console.error(err);
    }
  };

  const updateService = (id: string, patch: Partial<EditableService>) => {
    persist({ ...content, services: content.services.map((service) => (service.id === id ? { ...service, ...patch } : service)) }, "Service mis à jour.");
  };

  const addService = () => {
    const id = editingServiceId || createId(serviceDraft.title || `service-${Date.now()}`);
    const summary = serviceDraft.desc.trim() || serviceDraft.longDesc.trim().slice(0, 155) || "Description du produit ou service.";
    const nextService = { ...serviceDraft, id, desc: summary, gallery: serviceDraft.gallery.filter(Boolean), visible: true };
    const exists = content.services.some((service) => service.id === editingServiceId);
    const savedService = persist({
      ...content,
      services: exists
        ? content.services.map((service) => (service.id === editingServiceId ? nextService : service))
        : [nextService, ...content.services],
    }, exists ? "Service modifié avec succès." : "Service publié avec succès.");
    if (!savedService) return;
    setServiceDraft({
      ...emptyService,
      title: "Nom du produit ou service",
      desc: "Résumé court du produit ou service.",
      longDesc: "Présentez ici les détails, bénéfices et conditions du produit ou service.",
    });
    setEditingServiceId(null);
    setActiveTab("services");
  };

  const editService = (service: EditableService) => {
    setServiceDraft({ ...service });
    setEditingServiceId(service.id);
    showToast("success", "Service chargé dans le formulaire.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateMember = (id: string, patch: Partial<TeamMember>) => {
    persist({ ...content, team: content.team.map((member) => (member.id === id ? { ...member, ...patch } : member)) }, "Membre mis à jour.");
  };

  const addMember = () => {
    const id = editingMemberId || createId(memberDraft.name || `membre-${Date.now()}`);
    const nextMember = { ...memberDraft, id, visible: true };
    const exists = content.team.some((member) => member.id === editingMemberId);
    const savedMember = persist({
      ...content,
      team: exists ? content.team.map((member) => (member.id === editingMemberId ? nextMember : member)) : [nextMember, ...content.team],
    }, exists ? "Membre modifié avec succès." : "Membre publié avec succès.");
    if (!savedMember) return;
    setMemberDraft({ ...emptyMember, name: "Nom du membre", role: "Fonction" });
    setEditingMemberId(null);
    setActiveTab("team");
  };

  const editMember = (member: TeamMember) => {
    setMemberDraft({ ...member });
    setEditingMemberId(member.id);
    showToast("success", "Membre chargé dans le formulaire.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateMedia = (id: string, patch: Partial<MediaItem>) => {
    persist({ ...content, media: content.media.map((item) => (item.id === id ? { ...item, ...patch } : item)) }, "Image mise à jour.");
  };

  const addMedia = () => {
    const id = editingMediaId || createId(mediaDraft.title || `image-${Date.now()}`);
    const nextMedia = { ...mediaDraft, id, visible: true };
    const exists = content.media.some((item) => item.id === editingMediaId);
    const savedMedia = persist({
      ...content,
      media: exists ? content.media.map((item) => (item.id === editingMediaId ? nextMedia : item)) : [nextMedia, ...content.media],
    }, exists ? "Image modifiée avec succès." : "Image ajoutée avec succès.");
    if (!savedMedia) return;
    setMediaDraft({ ...emptyMedia, title: "Nouvelle image" });
    setEditingMediaId(null);
    setActiveTab("media");
  };

  const editMedia = (item: MediaItem) => {
    setMediaDraft({ ...item });
    setEditingMediaId(item.id);
    showToast("success", "Image chargée dans le formulaire.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEditing = () => {
    setEditingServiceId(null);
    setEditingMemberId(null);
    setEditingMediaId(null);
    setServiceDraft({ ...emptyService, title: "Nom du produit ou service", desc: "Résumé court du produit ou service.", longDesc: "Présentez ici les détails, bénéfices et conditions du produit ou service." });
    setMemberDraft({ ...emptyMember, name: "Nom du membre", role: "Fonction" });
    setMediaDraft({ ...emptyMedia, title: "Nouvelle image" });
    showToast("success", "Modification annulée.");
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === "service") {
      persist({ ...content, services: content.services.filter((item) => item.id !== deleteTarget.id) }, "Service supprimé avec succès.");
      if (editingServiceId === deleteTarget.id) cancelEditing();
    }
    if (deleteTarget.type === "member") {
      persist({ ...content, team: content.team.filter((item) => item.id !== deleteTarget.id) }, "Membre supprimé avec succès.");
      if (editingMemberId === deleteTarget.id) cancelEditing();
    }
    if (deleteTarget.type === "media") {
      persist({ ...content, media: content.media.filter((item) => item.id !== deleteTarget.id) }, "Image supprimée avec succès.");
      if (editingMediaId === deleteTarget.id) cancelEditing();
    }
    setDeleteTarget(null);
  };

  const exportContent = () => {
    try {
      const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "cogese-site-content.json";
      link.click();
      URL.revokeObjectURL(url);
      showToast("success", "Contenu exporté avec succès.");
    } catch (err) {
      console.error(err);
      showToast("error", "L'export du contenu a échoué.");
    }
  };

  const importContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        persist(JSON.parse(String(reader.result)) as SiteContent, "Contenu importé avec succès.");
      } catch {
        showToast("error", "Le fichier importé n'est pas valide.");
      }
    };
    reader.onerror = () => showToast("error", "Impossible de lire le fichier importé.");
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
              <button onClick={() => persist(defaultSiteContent, "Contenu réinitialisé avec succès.")} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-slate-600 hover:text-red-600">
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
              <FormShell
                title={editingServiceId ? "Modifier le produit / service" : "Ajouter un produit / service"}
                description="Renseignez le nom, la description, la longue description, les caractéristiques, l'image principale et la galerie."
                form={
                  <>
                    <div className="grid gap-4 md:grid-cols-2">
                      <SelectField label="Catégorie" value={serviceDraft.category} options={serviceCategories} onChange={(category) => setServiceDraft((prev) => ({ ...prev, category }))} description="Choisit où le service sera classé." />
                      <Field label="Titre / nom" value={serviceDraft.title} onChange={(title) => setServiceDraft((prev) => ({ ...prev, title }))} placeholder="Ex: Savon liquide tout usage" />
                    </div>
                    <Field label="Description courte" value={serviceDraft.desc} onChange={(desc) => setServiceDraft((prev) => ({ ...prev, desc }))} multiline description="Résumé affiché sur les cartes de service." />
                    <Field label="Longue description" value={serviceDraft.longDesc} onChange={(longDesc) => setServiceDraft((prev) => ({ ...prev, longDesc }))} multiline description="Texte complet affiché sur la page détail." />
                    <FeatureEditor value={serviceDraft.features} onChange={(features) => setServiceDraft((prev) => ({ ...prev, features }))} />
                    <ImagePicker label="Image principale" value={serviceDraft.image} onChange={(image) => setServiceDraft((prev) => ({ ...prev, image }))} />
                    <GalleryPicker value={serviceDraft.gallery} onChange={(gallery) => setServiceDraft((prev) => ({ ...prev, gallery }))} />
                    <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                      {editingServiceId && (
                        <button onClick={cancelEditing} className="rounded-md border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                          Annuler
                        </button>
                      )}
                      <button onClick={addService} className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">
                        <Plus size={16} /> {editingServiceId ? "Enregistrer les modifications" : "Publier ce service"}
                      </button>
                    </div>
                  </>
                }
                preview={<ServicePreview service={serviceDraft} />}
              />

              <h3 className="pt-4 text-sm font-extrabold uppercase tracking-[0.18em] text-slate-500">Services existants</h3>
              <div className="grid gap-4 xl:grid-cols-2">
                {content.services.map((service) => (
                  <div key={service.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
                      <img src={service.image} alt="" className="aspect-[4/3] w-full rounded-lg object-cover" />
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-700">{categoryLabel(service.category || "general")}</p>
                        <h4 className="mt-1 truncate font-extrabold text-slate-950">{service.title}</h4>
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">{service.longDesc}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <button onClick={() => editService(service)} className="rounded-md border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                            Modifier
                          </button>
                          <button onClick={() => updateService(service.id, { visible: !service.visible })} className={`rounded-md px-3 py-2 text-xs font-semibold ${service.visible ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                            {service.visible ? "Visible" : "Masqué"}
                          </button>
                          <button onClick={() => setDeleteTarget({ type: "service", id: service.id, label: service.title })} className="rounded-md px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50">
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

          {activeTab === "team" && (
            <div className="space-y-5">
              <FormShell
                title={editingMemberId ? "Modifier le membre" : "Ajouter un membre"}
                description="Un seul formulaire pour créer ou modifier un membre. Le rendu à droite reprend le style de la section équipe."
                form={
                  <>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Nom complet" value={memberDraft.name} onChange={(name) => setMemberDraft((prev) => ({ ...prev, name }))} placeholder="Ex: Nicolas NKOA Rene" />
                      <Field label="Fonction" value={memberDraft.role} onChange={(role) => setMemberDraft((prev) => ({ ...prev, role }))} placeholder="Ex: Responsable Logistique" />
                    </div>
                    <ImagePicker value={memberDraft.image} onChange={(image) => setMemberDraft((prev) => ({ ...prev, image }))} />
                    <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                      {editingMemberId && (
                        <button onClick={cancelEditing} className="rounded-md border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                          Annuler
                        </button>
                      )}
                      <button onClick={addMember} className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">
                        <Plus size={16} /> {editingMemberId ? "Enregistrer les modifications" : "Publier ce membre"}
                      </button>
                    </div>
                  </>
                }
                preview={<MemberPreview member={memberDraft} />}
              />

              <h3 className="pt-4 text-sm font-extrabold uppercase tracking-[0.18em] text-slate-500">Membres existants</h3>
              <div className="grid gap-5 xl:grid-cols-2">
                {content.team.map((member) => (
                  <div key={member.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                      <img src={member.image} alt="" className="h-20 w-20 rounded-full object-cover object-top" />
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate font-extrabold text-slate-950">{member.name}</h4>
                        <p className="text-sm font-semibold text-primary-700">{member.role}</p>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <button onClick={() => editMember(member)} className="rounded-md border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                        Modifier
                      </button>
                      <button onClick={() => updateMember(member.id, { visible: !member.visible })} className={`rounded-md px-3 py-2 text-xs font-semibold ${member.visible ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                        {member.visible ? "Visible" : "Masqué"}
                      </button>
                      <button onClick={() => setDeleteTarget({ type: "member", id: member.id, label: member.name })} className="rounded-md px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50">
                        Supprimer
                      </button>
                      </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "media" && (
            <div className="space-y-5">
              <FormShell
                title={editingMediaId ? "Modifier l'image" : "Ajouter une image de section"}
                description="Un seul formulaire pour ajouter ou modifier une image. Cliquez sur Modifier dans la liste pour charger une image ici."
                form={
                  <>
                    <Field label="Titre de l'image" value={mediaDraft.title} onChange={(title) => setMediaDraft((prev) => ({ ...prev, title }))} placeholder="Ex: Livraison logistique" />
                    <div className="grid gap-4 md:grid-cols-2">
                      <SelectField label="Catégorie" value={mediaDraft.category} options={contentCategories} onChange={(category) => setMediaDraft((prev) => ({ ...prev, category }))} />
                      <SelectField
                        label="Emplacement"
                        value={mediaDraft.section}
                        options={[
                          { value: "hero", label: "Hero / Accueil" },
                          { value: "gallery", label: "Galerie de service" },
                          { value: "about", label: "À propos" },
                          { value: "team", label: "Équipe" },
                        ]}
                        onChange={(section) => setMediaDraft((prev) => ({ ...prev, section }))}
                      />
                    </div>
                    <ImagePicker value={mediaDraft.image} onChange={(image) => setMediaDraft((prev) => ({ ...prev, image }))} />
                    <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                      {editingMediaId && (
                        <button onClick={cancelEditing} className="rounded-md border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                          Annuler
                        </button>
                      )}
                      <button onClick={addMedia} className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">
                        <Plus size={16} /> {editingMediaId ? "Enregistrer les modifications" : "Ajouter l'image"}
                      </button>
                    </div>
                  </>
                }
                preview={<MediaPreview item={mediaDraft} />}
              />

              <h3 className="pt-4 text-sm font-extrabold uppercase tracking-[0.18em] text-slate-500">Images existantes</h3>
              <div className="grid gap-5 xl:grid-cols-2">
                {content.media.map((item) => (
                  <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="grid gap-5 sm:grid-cols-[180px_1fr]">
                      <img src={item.image} alt="" className="aspect-[4/3] w-full rounded-xl object-cover" />
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-700">{categoryLabel(item.category || "general")}</p>
                        <h4 className="mt-1 truncate font-extrabold text-slate-950">{item.title}</h4>
                        <p className="mt-1 text-sm text-slate-500">Section: {item.section}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <button onClick={() => editMedia(item)} className="rounded-md border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                            Modifier
                          </button>
                          <button onClick={() => updateMedia(item.id, { visible: !item.visible })} className={`rounded-md px-3 py-2 text-xs font-semibold ${item.visible ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                            {item.visible ? "Visible" : "Masqué"}
                          </button>
                          <button onClick={() => setDeleteTarget({ type: "media", id: item.id, label: item.title })} className="rounded-md px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50">
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
      {deleteTarget && (
        <ConfirmDialog
          title={`Supprimer "${deleteTarget.label}" ?`}
          description="Cette action retirera définitivement cet élément du contenu personnalisé. Vous pouvez annuler si vous n'êtes pas sûr."
          onCancel={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
        />
      )}
      <ToastStack toasts={toasts} />
    </div>
  );
};
