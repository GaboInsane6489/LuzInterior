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

  /**
   * Limpia y mejora la calidad de la URL del avatar de Google
   */
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
        <Loader2 className="w-12 h-12 text-amber-300 animate-spin" />
      </div>
    );
  }

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingAvatar(true);

      // 1️⃣ Subida inmediata (como ya haces)
      const url = await storageService.uploadAvatar(file, user.id);

      // 2️⃣ Llamada a Edge Function (NUEVO)
      const {
        data: { session },
      } = await supabase.auth.getSession();

      await fetch("/functions/v1/process-avatar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      });

      // 3️⃣ Guardas la URL (la misma, pero ahora optimizada)
      await saveField("custom_avatar_url", url);

      await refreshData();
    } catch (err) {
      alert(err.message);
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
      await saveField("cover_photo_url", url);
      await refreshData();
    } catch (err) {
      alert(err.message);
    } finally {
      setUploadingCover(false);
    }
  };

  /**
   * Utilidad para extraer el nombre de usuario de una URL de red social
   */
  const formatSocialLink = (url, platform) => {
    if (!url) return "No especificado";
    try {
      const cleanUrl = url.replace(/\/$/, ""); // Quitar slash final
      const parts = cleanUrl.split("/");
      const username = parts[parts.length - 1];

      // Si la URL es muy corta o no tiene slash, devolvemos el valor original
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

  /**
   * Obtiene la URL base de cada plataforma para hacer el enlace clickeable
   */
  const getPlatformUrl = (url, platform) => {
    if (!url) return "#";
    // Si ya es una URL completa, la devolvemos
    if (url.startsWith("http")) return url;
    // Si es solo el nombre de usuario, construimos la URL
    const cleanUser = url.replace("@", "");
    const bases = {
      instagram: `https://instagram.com/${cleanUser}`,
      twitter: `https://twitter.com/${cleanUser}`,
      linkedin: `https://linkedin.com/in/${cleanUser}`,
      github: `https://github.com/${cleanUser}`,
    };
    return bases[platform] || "#";
  };

  const renderEditableField = (
    field,
    label,
    value,
    type = "text",
    maxLength,
    platform = null, // Para lógica especial de redes sociales
  ) => {
    const isEditing = editingField === field;

    return (
      <div className="space-y-2 flex-1">
        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block">
          {label}
        </label>
        {isEditing ? (
          <div className="space-y-2">
            {type === "textarea" ? (
              <textarea
                value={editedProfile[field] || ""}
                onChange={(e) => updateField(field, e.target.value)}
                maxLength={maxLength}
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-300 focus:outline-none resize-none"
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
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-300 focus:outline-none"
              />
            )}
            {maxLength && (
              <p className="text-xs text-gray-500 text-right">
                {(editedProfile[field] || "").length} / {maxLength}
              </p>
            )}
            <div className="flex gap-2">
              <button
                onClick={() =>
                  saveField(field, editedProfile[field], refreshData)
                }
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-amber-300 text-black rounded-lg hover:bg-amber-400 transition-all disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                Guardar
              </button>
              <button
                onClick={() => cancelEdit(field)}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
              >
                <X className="w-4 h-4" />
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between group">
            {platform && value ? (
              <a
                href={getPlatformUrl(value, platform)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-amber-300 transition-colors flex items-center gap-1"
              >
                {formatSocialLink(value, platform)}
                <ArrowUpRight className="w-3 h-3 opacity-30 group-hover:opacity-100 transition-opacity" />
              </a>
            ) : (
              <p className="text-white">{value || "No especificado"}</p>
            )}
            <button
              onClick={() => startEdit(field)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/5 rounded-lg"
            >
              <Edit2 className="w-4 h-4 text-amber-300" />
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
        <meta
          name="description"
          content="Personaliza tu perfil, redes sociales y preferencias de cuenta."
        />
      </Helmet>

      <section className="space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-6">
          <div className="space-y-2">
            <h3 className="text-3xl font-serif">Configuración</h3>
            <p className="text-gray-500 text-sm">
              Gestiona tu perfil y preferencias.
            </p>
          </div>
        </div>

        {/* Mensajes de feedback */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-green-400 text-sm">
            {success}
          </div>
        )}

        {/* Progreso XP */}
        <div className="bg-zinc-900/40 backdrop-blur-md p-8 border border-white/5 rounded-[2.5rem]">
          <XPProgressBar profile={profile} variant="full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Imágenes de Perfil */}
          <div className="bg-zinc-900/40 backdrop-blur-md p-8 border border-white/5 rounded-[2.5rem] space-y-6">
            <div className="flex items-center gap-4 border-b border-white/5 pb-6">
              <div className="w-12 h-12 bg-amber-300/10 rounded-2xl flex items-center justify-center">
                <Upload className="w-6 h-6 text-amber-300" />
              </div>
              <h4 className="text-xl font-serif">Imágenes de Perfil</h4>
            </div>

            {/* Avatar */}
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block">
                Avatar
              </label>
              <div className="flex items-center gap-4 flex-wrap">
                <img
                  src={sanitizeAvatarUrl(
                    profile?.custom_avatar_url ||
                      profile?.avatar_url ||
                      user?.user_metadata?.avatar_url,
                  )}
                  className="w-20 h-20 rounded-2xl border border-white/10 object-cover"
                  alt="Avatar"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col gap-2">
                  {profile?.level >= 2 ? (
                    <label className="cursor-pointer px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all flex items-center gap-2 w-fit">
                      {uploadingAvatar ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                      Cambiar Avatar
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleAvatarUpload}
                        className="hidden"
                        disabled={uploadingAvatar}
                      />
                    </label>
                  ) : (
                    <div
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg opacity-50 cursor-not-allowed w-fit"
                      title="Necesitas Nivel 2 para subir imagen"
                    >
                      <Lock className="w-4 h-4 text-amber-500" />
                      <span className="text-xs text-gray-400">
                        Desbloquea en Nivel 2
                      </span>
                    </div>
                  )}

                  {profile?.custom_avatar_url && (
                    <button
                      onClick={() =>
                        saveField("custom_avatar_url", null, refreshData)
                      }
                      disabled={saving}
                      className="text-[10px] uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors bg-red-400/5 px-4 py-1.5 rounded-lg border border-red-400/10 hover:bg-red-400/10 flex items-center gap-2"
                    >
                      <X className="w-3 h-3" />
                      Restablecer foto de Google
                    </button>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500">
                {profile?.level >= 25
                  ? "JPG, PNG o WEBP. Máximo 5MB."
                  : "Sube de nivel para personalizar tu avatar."}
              </p>
            </div>

            {/* Cover Photo */}
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block">
                Foto de Portada
              </label>
              {profile?.cover_photo_url && (
                <img
                  src={profile.cover_photo_url}
                  className="w-full h-32 object-cover rounded-xl border border-white/10"
                  alt="Cover"
                />
              )}

              {profile?.level >= 3 ? (
                <label className="cursor-pointer px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all flex items-center gap-2 w-fit">
                  {uploadingCover ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  {profile?.cover_photo_url
                    ? "Cambiar Portada"
                    : "Subir Portada"}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleCoverUpload}
                    className="hidden"
                    disabled={uploadingCover}
                  />
                </label>
              ) : (
                <div
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg opacity-50 cursor-not-allowed w-fit"
                  title="Necesitas Nivel 3 para subir portada"
                >
                  <Lock className="w-4 h-4 text-amber-500" />
                  <span className="text-xs text-gray-400">
                    Desbloquea en Nivel 3
                  </span>
                </div>
              )}

              <p className="text-xs text-gray-500">
                {profile?.level >= 25
                  ? "JPG, PNG o WEBP. Máximo 10MB. Ratio 16:9 recomendado."
                  : "Sube de nivel para personalizar tu portada."}
              </p>
            </div>
          </div>

          {/* Información Personal */}
          <div className="bg-zinc-900/40 backdrop-blur-md p-8 border border-white/5 rounded-[2.5rem] space-y-6">
            <div className="flex items-center gap-4 border-b border-white/5 pb-6">
              <div className="w-12 h-12 bg-amber-300/10 rounded-2xl flex items-center justify-center">
                <User className="w-6 h-6 text-amber-300" />
              </div>
              <h4 className="text-xl font-serif">Información Personal</h4>
            </div>

            {renderEditableField(
              "full_name",
              "Nombre Completo",
              profile?.full_name,
              "text",
              null,
              null,
              refreshData,
            )}
            {renderEditableField(
              "username",
              "Nombre de Usuario",
              profile?.username,
              "text",
              null,
              null,
              refreshData,
            )}
            {renderEditableField(
              "age",
              "Edad",
              profile?.age,
              "number",
              null,
              null,
              refreshData,
            )}
            {renderEditableField(
              "bio",
              "Biografía",
              profile?.bio,
              "textarea",
              500,
              null,
              refreshData,
            )}
          </div>

          {/* Redes Sociales */}
          <div className="bg-zinc-900/40 backdrop-blur-md p-8 border border-white/5 rounded-[2.5rem] space-y-6">
            <div className="flex items-center gap-4 border-b border-white/5 pb-6">
              <div className="w-12 h-12 bg-amber-300/10 rounded-2xl flex items-center justify-center">
                <Instagram className="w-6 h-6 text-amber-300" />
              </div>
              <h4 className="text-xl font-serif">Redes Sociales</h4>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-pink-500" />
                {renderEditableField(
                  "social_instagram",
                  "Instagram",
                  profile?.social_instagram,
                  "url",
                  null,
                  "instagram",
                )}
              </div>
              <div className="flex items-center gap-3">
                <Twitter className="w-5 h-5 text-blue-400" />
                {renderEditableField(
                  "social_twitter",
                  "Twitter",
                  profile?.social_twitter,
                  "url",
                  null,
                  "twitter",
                )}
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="w-5 h-5 text-blue-600" />
                {renderEditableField(
                  "social_linkedin",
                  "LinkedIn",
                  profile?.social_linkedin,
                  "url",
                  null,
                  "linkedin",
                )}
              </div>
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5 text-gray-400" />
                {renderEditableField(
                  "social_github",
                  "GitHub",
                  profile?.social_github,
                  "url",
                  null,
                  "github",
                )}
              </div>
            </div>
          </div>

          {/* Información de Cuenta */}
          <div className="bg-zinc-900/40 backdrop-blur-md p-8 border border-white/5 rounded-[2.5rem] space-y-6">
            <div className="flex items-center gap-4 border-b border-white/5 pb-6">
              <div className="w-12 h-12 bg-amber-300/10 rounded-2xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-amber-300" />
              </div>
              <h4 className="text-xl font-serif">Seguridad</h4>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">
                  Correo Electrónico
                </label>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <p className="text-white">{user?.email}</p>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">
                  Proveedor de Autenticación
                </label>
                <p className="text-white capitalize">
                  {user?.app_metadata?.provider || "Google"}
                </p>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-2">
                  Cuenta Creada
                </label>
                <p className="text-white">
                  {new Date(user?.created_at).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
