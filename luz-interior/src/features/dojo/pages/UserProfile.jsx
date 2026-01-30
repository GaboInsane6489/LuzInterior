import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { useDojoData } from "../hooks/useDojoData";
import {
  Instagram,
  Twitter,
  Linkedin,
  Github,
  X,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Award,
} from "lucide-react";

export default function UserProfile() {
  const { user } = useAuth();
  const { username } = useParams();
  const { profile, loading } = useDojoData();

  if (loading) {
    return (
      <div className="animate-pulse text-amber-300 text-center">
        Cargando Templo...
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header del Perfil: Estilo Minimalista */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 pb-12 border-b border-white/5">
        <div className="relative group">
          <img
            src={profile?.custom_avatar_url || user?.user_metadata?.avatar_url}
            alt="Avatar"
            className="w-32 h-32 md:w-44 md:h-44 rounded-[2.5rem] border-2 border-amber-300/20 group-hover:border-amber-300 transition-all duration-500 object-cover shadow-2xl"
          />
          <div className="absolute -bottom-2 -right-2 bg-amber-300 text-black px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter">
            Nivel {profile?.level || 1}
          </div>
        </div>
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="space-y-1">
            <h2 className="text-4xl md:text-6xl font-serif">
              {profile?.full_name}
            </h2>
            <p className="text-sm text-amber-300/60 font-mono">
              @{username || profile?.username}
            </p>
          </div>
          <p className="text-gray-400 max-w-xl leading-relaxed italic">
            "{profile?.bio || "Este guerrero aún no ha escrito su leyenda."}"
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-xs text-gray-500 font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <MapPin className="w-3 h-3" /> Tierra de Ceniza
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-3 h-3" /> Unido en 2024
            </span>
          </div>
        </div>
      </div>

      {/* Grid de Contenido: Estilo Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Estadísticas Flash */}
        <div className="md:col-span-1 bg-zinc-900/40 backdrop-blur-md p-8 border border-white/5 rounded-[2.5rem] flex justify-around">
          <div className="text-center">
            <p className="text-2xl font-serif text-white">{profile?.xp || 0}</p>
            <p className="text-[8px] uppercase text-gray-500 tracking-widest">
              XP Total
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-serif text-white">
              {profile?.streak_current || 0}
            </p>
            <p className="text-[8px] uppercase text-gray-500 tracking-widest">
              Racha
            </p>
          </div>
        </div>

        {/* Medallas (Espacio reservado para tu siguiente tarea) */}
        <div className="md:col-span-2 bg-zinc-900/40 backdrop-blur-md p-8 border border-white/5 rounded-[2.5rem]">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-sm uppercase tracking-widest font-bold text-gray-500">
              Logros Destacados
            </h4>
            <Award className="w-5 h-5 text-amber-300" />
          </div>
          <div className="grid grid-cols-5 gap-4">
            {/* Placeholders hasta que subas tus PNGs optimizados */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="aspect-square bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center group/medal hover:bg-amber-300/10 transition-all cursor-help"
                title="Logro por Desbloquear"
              >
                <Award className="w-6 h-6 text-white/10 group-hover/medal:text-amber-300/40 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
