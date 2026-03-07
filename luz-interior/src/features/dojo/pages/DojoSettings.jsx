import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../auth/hooks/useAuth";
import { useDojoData } from "../hooks/useDojoData";
import { useProfileEditor } from "../hooks/useProfileEditor";
import { storageService } from "../services/storage.service";
import XPProgressBar from "../components/XPProgressBar";
import { supabase } from "../../../config/supabase";
import {
  User,
  Mail,
  Shield,
  Loader2,
  Edit2,
  Check,
  X,
  Upload,
  Instagram,
  Twitter,
  Linkedin,
  Github,
  ArrowUpRight,
  Lock,
  Youtube,
  Facebook,
  Twitch,
  MessageCircle,
  Gamepad2,
  Settings,
  Share2,
} from "lucide-react";

export default function DojoSettings() {
  const { user } = useAuth();
  const { profile, loading: dataLoading, refreshData } = useDojoData();
  const {
    profile: editedProfile,
    editingField,
    loading: saving,
    error,
    success,
    updateField,
    saveField,
    cancelEdit,
    startEdit,
  } = useProfileEditor(profile);

  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [optimisticProfile, setOptimisticProfile] = useState({});
  // Estado para las pestañas y reducir scroll
  const [activeTab, setActiveTab] = useState("profile");

  const sanitizeAvatarUrl = (url) => {
    if (!url) return url;
    if (url.includes("googleusercontent.com")) {
      return url.replace(/=s\d+(-c)?/, "=s400-c");
    }
    return url;
  };

  if (dataLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-amber-400 animate-spin" />
      </div>
    );
  }

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingAvatar(true);
      const url = await storageService.uploadAvatar(file, user.id);
      setOptimisticProfile((prev) => ({ ...prev, custom_avatar_url: url }));
      await saveField("custom_avatar_url", url);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      fetch("/functions/v1/process-avatar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ userId: user.id }),
      }).catch(console.error);
      await refreshData();
    } catch (err) {
      alert(err.message);
      setOptimisticProfile((prev) => ({ ...prev, custom_avatar_url: null }));
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingCover(true);
      const url = await storageService.uploadCoverPhoto(file, user.id);
      setOptimisticProfile((prev) => ({ ...prev, cover_photo_url: url }));
      await saveField("cover_photo_url", url);
      await refreshData();
    } catch (err) {
      alert(err.message);
      setOptimisticProfile((prev) => ({ ...prev, cover_photo_url: null }));
    } finally {
      setUploadingCover(false);
    }
  };

  const formatSocialLink = (url, platform) => {
    if (!url) return "No especificado";
    try {
      const cleanUrl = url.replace(/\/$/, "");
      const parts = cleanUrl.split("/");
      const username = parts[parts.length - 1];
      if (parts.length < 2) return url;
      return platform === "linkedin"
        ? `/in/${username}`
        : platform === "github"
          ? `github.com/${username}`
          : `@${username}`;
    } catch {
      return url;
    }
  };

  const getPlatformUrl = (url, platform) => {
    if (!url) return "#";
    if (url.startsWith("http")) return url;
    const cleanUser = url.replace("@", "");
    const bases = {
      instagram: `https://instagram.com/${cleanUser}`,
      twitter: `https://twitter.com/${cleanUser}`,
      linkedin: `https://linkedin.com/in/${cleanUser}`,
      github: `https://github.com/${cleanUser}`,
      youtube: `https://youtube.com/@${cleanUser}`,
      facebook: `https://facebook.com/${cleanUser}`,
      twitch: `https://twitch.tv/${cleanUser}`,
      kick: `https://kick.com/${cleanUser}`,
      whatsapp: `https://wa.me/${cleanUser}`,
      tiktok: `https://tiktok.com/${cleanUser}`,
    };
    return bases[platform] || "#";
  };

  const renderEditableField = (
    field,
    label,
    value,
    type = "text",
    maxLength,
    platform = null,
  ) => {
    const isEditing = editingField === field;
    return (
      <div className="space-y-2 flex-1">
        <label className="text-[10px] uppercase tracking-[0.2em] text-amber-500/80 font-bold block">
          {label}
        </label>
        {isEditing ? (
          <div className="space-y-2">
            {type === "textarea" ? (
              <textarea
                value={editedProfile[field] || ""}
                onChange={(e) => updateField(field, e.target.value)}
                maxLength={maxLength}
                rows={3}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400 focus:outline-none resize-none transition-all"
              />
            ) : (
              <input
                type={type}
                value={editedProfile[field] || ""}
                onChange={(e) => updateField(field, e.target.value)}
                maxLength={maxLength}
                placeholder={
                  platform ? `https://${platform}.com/tu-usuario` : ""
                }
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400 focus:outline-none transition-all"
              />
            )}
            <div className="flex gap-2">
              <button
                onClick={() =>
                  saveField(field, editedProfile[field], refreshData)
                }
                disabled={saving}
                className="flex items-center gap-2 px-3 py-1.5 bg-amber-400 text-black font-bold rounded-lg hover:bg-amber-300 transition-all text-sm"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}{" "}
                Guardar
              </button>
              <button
                onClick={() => cancelEdit(field)}
                disabled={saving}
                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all text-sm text-gray-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between group min-h-[40px] border-b border-white/5 pb-1">
            {platform && value ? (
              <a
                href={getPlatformUrl(value, platform)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-amber-400 transition-colors flex items-center gap-1 font-medium"
              >
                {formatSocialLink(value, platform)}
                <ArrowUpRight className="w-3 h-3 opacity-30 group-hover:opacity-100 transition-opacity" />
              </a>
            ) : (
              <p className="text-gray-200">
                {value || (
                  <span className="text-gray-600 italic text-sm">
                    No especificado
                  </span>
                )}
              </p>
            )}
            <button
              onClick={() => startEdit(field)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-amber-400/10 rounded-lg"
            >
              <Edit2 className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Configuración | El Dojo</title>
      </Helmet>

      <section className="max-w-5xl mx-auto space-y-8">
        {/* Header Compacto */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h3 className="text-4xl font-serif text-white mb-2">
              Configuración
            </h3>
            <p className="text-gray-400 text-sm">
              Personaliza tu identidad dentro del Dojo.
            </p>
          </div>

          {/* Tabs Selector */}
          <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "profile" ? "bg-amber-400 text-black shadow-lg shadow-amber-400/20" : "text-gray-400 hover:text-white"}`}
            >
              <User className="w-4 h-4" /> Perfil
            </button>
            <button
              onClick={() => setActiveTab("social")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "social" ? "bg-amber-400 text-black shadow-lg shadow-amber-400/20" : "text-gray-400 hover:text-white"}`}
            >
              <Share2 className="w-4 h-4" /> Redes
            </button>
            <button
              onClick={() => setActiveTab("account")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "account" ? "bg-amber-400 text-black shadow-lg shadow-amber-400/20" : "text-gray-400 hover:text-white"}`}
            >
              <Settings className="w-4 h-4" /> Cuenta
            </button>
          </div>
        </div>

        {/* Notificaciones de Estado */}
        {(error || success) && (
          <div
            className={`p-4 rounded-xl border animate-in fade-in slide-in-from-top-2 ${error ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-green-500/10 border-green-500/20 text-green-400"}`}
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              {error ? (
                <X className="w-4 h-4" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              {error || success}
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* TAB: PERFIL */}
          {activeTab === "profile" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
              {/* Columna Izquierda: Imágenes */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-zinc-900/60 backdrop-blur-xl p-6 border border-white/10 rounded-[2rem] shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-amber-400/10 rounded-lg">
                      <Upload className="w-5 h-5 text-amber-400" />
                    </div>
                    <h4 className="text-lg font-serif">Identidad Visual</h4>
                  </div>

                  <div className="space-y-8">
                    {/* Avatar Control */}
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="relative group">
                        <img
                          src={sanitizeAvatarUrl(
                            optimisticProfile.custom_avatar_url ||
                              profile?.custom_avatar_url ||
                              profile?.avatar_url ||
                              user?.user_metadata?.avatar_url,
                          )}
                          className="w-32 h-32 rounded-3xl border-2 border-amber-400/30 object-cover shadow-2xl group-hover:border-amber-400 transition-all"
                          alt="Avatar"
                        />
                        {uploadingAvatar && (
                          <div className="absolute inset-0 bg-black/60 rounded-3xl flex items-center justify-center">
                            <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        {profile?.level >= 2 ? (
                          <label className="cursor-pointer px-4 py-2 bg-amber-400 text-black font-bold rounded-xl hover:bg-amber-300 transition-all flex items-center justify-center gap-2 text-sm">
                            <Upload className="w-4 h-4" /> Cambiar Avatar
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleAvatarUpload}
                              className="hidden"
                              disabled={uploadingAvatar}
                            />
                          </label>
                        ) : (
                          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl opacity-50 flex items-center justify-center gap-2 text-xs text-gray-400">
                            <Lock className="w-3 h-3" /> Desbloquea en Nivel 2
                          </div>
                        )}
                        {profile?.custom_avatar_url && (
                          <button
                            onClick={() =>
                              saveField("custom_avatar_url", null, refreshData)
                            }
                            className="text-[10px] uppercase font-bold text-red-400 hover:text-red-300 transition-colors"
                          >
                            Restablecer foto original
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="h-px bg-white/5 w-full" />

                    {/* Cover Control */}
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                        Foto de Portada
                      </label>
                      {optimisticProfile.cover_photo_url ||
                      profile?.cover_photo_url ? (
                        <div className="relative group rounded-xl overflow-hidden h-24 border border-white/10">
                          <img
                            src={
                              optimisticProfile.cover_photo_url ||
                              profile.cover_photo_url
                            }
                            className="w-full h-full object-cover"
                            alt="Cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <label className="cursor-pointer p-2 bg-amber-400 text-black rounded-full">
                              <Upload className="w-4 h-4" />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleCoverUpload}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                      ) : (
                        <label
                          className={`w-full h-24 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-amber-400/40 hover:bg-amber-400/5 transition-all cursor-pointer ${profile?.level < 3 && "opacity-50 cursor-not-allowed"}`}
                        >
                          <Upload className="w-5 h-5 text-gray-500" />
                          <span className="text-xs text-gray-500 font-medium">
                            Subir portada (Nivel 3)
                          </span>
                          {profile?.level >= 3 && (
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleCoverUpload}
                              className="hidden"
                            />
                          )}
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                {/* Progress Mini-card */}
                <div className="bg-zinc-900/60 backdrop-blur-xl p-6 border border-white/10 rounded-[2rem]">
                  <XPProgressBar profile={profile} variant="full" />
                </div>
              </div>

              {/* Columna Derecha: Datos */}
              <div className="lg:col-span-7 bg-zinc-900/60 backdrop-blur-xl p-8 border border-white/10 rounded-[2rem] space-y-8">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <div className="p-2 bg-amber-400/10 rounded-lg">
                    <User className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="text-xl font-serif">Información Personal</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {renderEditableField(
                    "full_name",
                    "Nombre Completo",
                    profile?.full_name,
                  )}
                  {renderEditableField(
                    "username",
                    "Nombre de Usuario",
                    profile?.username,
                  )}
                  <div className="md:col-span-2">
                    {renderEditableField("age", "Edad", profile?.age, "number")}
                  </div>
                  <div className="md:col-span-2">
                    {renderEditableField(
                      "bio",
                      "Biografía",
                      profile?.bio,
                      "textarea",
                      500,
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: REDES SOCIALES */}
          {activeTab === "social" && (
            <div className="bg-zinc-900/60 backdrop-blur-xl p-8 border border-white/10 rounded-[2rem] animate-in fade-in duration-300">
              <div className="flex items-center gap-3 border-b border-white/5 pb-6 mb-8">
                <div className="p-2 bg-amber-400/10 rounded-lg">
                  <Share2 className="w-5 h-5 text-amber-400" />
                </div>
                <h4 className="text-xl font-serif">Presencia Digital</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                <div className="flex items-center gap-4">
                  {renderEditableField(
                    "social_instagram",
                    "Instagram",
                    profile?.social_instagram,
                    "url",
                    null,
                    "instagram",
                  )}
                </div>
                <div className="flex items-center gap-4">
                  {renderEditableField(
                    "social_twitter",
                    "Twitter / X",
                    profile?.social_twitter,
                    "url",
                    null,
                    "twitter",
                  )}
                </div>
                <div className="flex items-center gap-4">
                  {renderEditableField(
                    "social_linkedin",
                    "LinkedIn",
                    profile?.social_linkedin,
                    "url",
                    null,
                    "linkedin",
                  )}
                </div>
                <div className="flex items-center gap-4">
                  {renderEditableField(
                    "social_github",
                    "GitHub",
                    profile?.social_github,
                    "url",
                    null,
                    "github",
                  )}
                </div>
                <div className="flex items-center gap-4">
                  {renderEditableField(
                    "social_youtube",
                    "YouTube",
                    profile?.social_youtube,
                    "url",
                    null,
                    "youtube",
                  )}
                </div>
                <div className="flex items-center gap-4">
                  {renderEditableField(
                    "social_twitch",
                    "Twitch",
                    profile?.social_twitch,
                    "url",
                    null,
                    "twitch",
                  )}
                </div>
                <div className="flex items-center gap-4">
                  {renderEditableField(
                    "social_facebook",
                    "Facebook",
                    profile?.social_facebook,
                    "url",
                    null,
                    "facebook",
                  )}
                </div>
                <div className="flex items-center gap-4">
                  {renderEditableField(
                    "social_kick",
                    "Kick",
                    profile?.social_kick,
                    "url",
                    null,
                    "kick",
                  )}
                </div>
                <div className="flex items-center gap-4">
                  {renderEditableField(
                    "social_whatsapp",
                    "WhatsApp (Nº)",
                    profile?.social_whatsapp,
                    "tel",
                    null,
                    "whatsapp",
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: CUENTA */}
          {activeTab === "account" && (
            <div className="bg-zinc-900/60 backdrop-blur-xl p-8 border border-white/10 rounded-[2rem] animate-in fade-in duration-300">
              <div className="flex items-center gap-3 border-b border-white/5 pb-6 mb-8">
                <div className="p-2 bg-amber-400/10 rounded-lg">
                  <Shield className="w-5 h-5 text-amber-400" />
                </div>
                <h4 className="text-xl font-serif">Seguridad y Cuenta</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-amber-500 font-bold flex items-center gap-2">
                    <Mail className="w-3 h-3" /> Email
                  </label>
                  <p className="text-white font-medium">{user?.email}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-amber-500 font-bold flex items-center gap-2">
                    <Shield className="w-3 h-3" /> Proveedor
                  </label>
                  <p className="text-white capitalize font-medium">
                    {user?.app_metadata?.provider || "Google"}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-amber-500 font-bold flex items-center gap-2">
                    <Check className="w-3 h-3" /> Miembro desde
                  </label>
                  <p className="text-white font-medium">
                    {new Date(user?.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
