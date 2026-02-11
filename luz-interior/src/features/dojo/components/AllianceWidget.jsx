import React, { useState, useEffect } from "react";
import { Users, Zap, Shield } from "lucide-react";
import { dojoService } from "../services/dojo.service";
import { useDojoData } from "../hooks/useDojoData";

export default function AllianceWidget() {
  const { profile } = useDojoData();
  const [allies, setAllies] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAllies = React.useCallback(async () => {
    try {
      const friends = await dojoService.getFriends(profile.id);
      setAllies(friends || []);
    } catch (error) {
      console.error("Error loading allies:", error);
    } finally {
      setLoading(false);
    }
  }, [profile]);

  useEffect(() => {
    if (profile?.id) {
      loadAllies();
    }
  }, [profile, loadAllies]);

  const handleSendHonor = async (allyId) => {
    try {
      await dojoService.sendHonor(profile.id, allyId);
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
      <div className="h-56 w-full bg-transparent animate-pulse rounded-none border border-white/5" />
    );

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="h-[1px] w-8 bg-amber-500" />
        <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-amber-500">
          Vanguardia Aliada
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allies.length === 0 ? (
          <div className="col-span-full py-12 text-center border border-dashed border-white/10 bg-white/5">
            <Users className="w-8 h-8 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 font-serif italic text-lg">
              "Un guerrero solo es formidable. Una legión es invencible."
            </p>
            <p className="text-xs uppercase tracking-widest text-gray-600 mt-2">
              Forja alianzas en la comunidad
            </p>
          </div>
        ) : (
          allies.map((ally) => (
            <div
              key={ally.id}
              className="group relative bg-zinc-900 border border-white/5 hover:border-amber-500/30 transition-all duration-500 overflow-hidden"
            >
              {/* Cover Photo Area */}
              <div className="h-24 w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent z-10" />
                {ally.cover_photo_url ? (
                  <img
                    src={ally.cover_photo_url}
                    alt="Cover"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center opacity-30">
                    <Shield className="w-8 h-8 text-white/10" />
                  </div>
                )}
              </div>

              {/* Avatar & Info overlap */}
              <div className="relative px-6 pb-6 -mt-10 z-20 flex justify-between items-end">
                <div className="flex flex-col gap-3">
                  <div className="relative w-16 h-16">
                    <img
                      src={
                        sanitizeAvatar(
                          ally.custom_avatar_url || ally.avatar_url,
                        ) ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${ally.username}`
                      }
                      alt={ally.username}
                      className="w-full h-full object-cover rounded-none border border-white/10 bg-black"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-amber-500 text-black text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wider">
                      Lvl {ally.level}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-serif text-lg text-white leading-tight">
                      {ally.full_name}
                    </h4>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                      @{ally.username}
                    </p>
                  </div>
                </div>

                <div className="mb-1">
                  <button
                    onClick={() => handleSendHonor(ally.id)}
                    className="p-3 border border-white/10 text-gray-400 hover:text-amber-400 hover:border-amber-500 hover:bg-amber-500/10 transition-all group/btn"
                    title="Enviar Honor"
                  >
                    <Zap className="w-4 h-4 group-hover/btn:fill-current" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
