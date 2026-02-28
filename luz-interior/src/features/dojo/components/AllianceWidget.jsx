import React, { useState, useEffect } from "react";
import { Users, Zap, Shield } from "lucide-react";
import { dojoService } from "../services/dojo.service";
import { useDojoData } from "../hooks/useDojoData";

export default function AllianceWidget() {
  const { profile } = useDojoData();
  const [allies, setAllies] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAllies = React.useCallback(async () => {
    if (!profile?.id) return;
    try {
      const friends = await dojoService.getFriends(profile.id);
      setAllies(friends || []);
    } catch (error) {
      console.error("Error loading allies:", error);
    } finally {
      setLoading(false);
    }
  }, [profile?.id]);

  useEffect(() => {
    loadAllies();
  }, [loadAllies]);

  const handleSendHonor = async (allyId) => {
    try {
      await dojoService.sendHonor(profile.id, allyId);
      // Podrías cambiar este alert por un toast minimalista luego
      alert("Honor enviado. La lealtad se recompensa.");
    } catch (error) {
      alert(error.message);
    }
  };

  const sanitizeAvatar = (url) => {
    if (!url) return null;
    if (url.includes("googleusercontent.com")) {
      return url.replace("=s96-c", "=s400-c");
    }
    return url;
  };

  if (loading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-48 w-full bg-white/[0.02] animate-pulse border border-white/5"
          />
        ))}
      </div>
    );

  return (
    <div className="space-y-12 py-6">
      {/* CABECERA DE SECCIÓN */}
      <div className="flex items-center gap-6">
        <div className="h-[1px] w-12 bg-amber-500/50" />
        <div className="space-y-1">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-amber-500">
            Vanguardia Aliada
          </h3>
          <p className="text-[9px] text-gray-500 uppercase tracking-widest">
            Legión Activa
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {allies.length === 0 ? (
          <div className="col-span-full py-20 text-center border border-white/5 bg-black relative group">
            <div className="absolute inset-0 bg-amber-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
            <Users className="w-10 h-10 text-gray-700 mx-auto mb-6" />
            <p className="text-white/60 font-serif italic text-xl max-w-md mx-auto">
              "Un guerrero solo es formidable. Una legión es invencible."
            </p>
            <div className="mt-6 inline-block h-[1px] w-20 bg-amber-500/20" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-600 mt-4 font-bold">
              Busca aliados en el santuario
            </p>
          </div>
        ) : (
          allies.map((ally) => (
            <div
              key={ally.id}
              className="group relative bg-black border border-white/5 transition-all duration-700 hover:border-amber-500/30"
            >
              {/* Marco de diseño 'Senior' */}
              <div className="absolute -inset-3 border border-amber-500/5 -z-10 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-1000 ease-out"></div>

              {/* Cover Photo Area con Overlay de Interacción */}
              <div className="h-28 w-full relative overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                {ally.cover_photo_url ? (
                  <img
                    src={ally.cover_photo_url}
                    alt="Cover"
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-[2000ms]"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-950 flex items-center justify-center">
                    <Shield className="w-12 h-12 text-white/5" />
                  </div>
                )}
              </div>

              {/* Avatar & Info overlap */}
              <div className="relative px-8 pb-8 -mt-12 z-20 flex justify-between items-end">
                <div className="flex flex-col gap-4">
                  <div className="relative w-24 h-24 group/avatar">
                    {/* El avatar es un bloque sólido, sin redondeo para máxima seriedad */}
                    <div className="absolute inset-0 border border-amber-500/40 translate-x-1 translate-y-1 -z-10 group-hover/avatar:translate-x-0 group-hover/avatar:translate-y-0 transition-transform"></div>
                    <img
                      src={
                        sanitizeAvatar(
                          ally.custom_avatar_url || ally.avatar_url,
                        ) ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${ally.username}`
                      }
                      alt={ally.username}
                      className="w-full h-full object-cover border border-white/10 bg-black grayscale group-hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-amber-500 text-black text-[10px] font-black px-2 py-0.5 tracking-tighter">
                      LVL {ally.level}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-serif text-2xl text-white tracking-tight">
                      {ally.full_name}
                    </h4>
                    <p className="text-[10px] text-amber-500/50 uppercase tracking-[0.3em] font-bold">
                      @{ally.username}
                    </p>
                  </div>
                </div>

                <div className="mb-2">
                  <button
                    onClick={() => handleSendHonor(ally.id)}
                    className="group/btn relative p-4 border border-white/5 text-gray-500 hover:text-amber-400 transition-all duration-500 overflow-hidden"
                    title="Enviar Honor"
                  >
                    <div className="absolute inset-0 bg-amber-500/5 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                    <Zap className="relative z-10 w-5 h-5 group-hover/btn:fill-current" />
                  </button>
                </div>
              </div>

              {/* Data Overlay Sutil al Hover */}
              <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="h-1 w-8 bg-amber-500" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
