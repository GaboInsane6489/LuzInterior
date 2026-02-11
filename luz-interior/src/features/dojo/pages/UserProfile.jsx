import React from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { useDojoData } from "../hooks/useDojoData";
import { ACHIEVEMENTS_CONFIG } from "../data/achievements.config";
import { dojoService } from "../services/dojo.service";
import { MapPin, Calendar, Award, Lock } from "lucide-react";

export default function UserProfile() {
  const sanitizeAvatarUrl = (url) => {
    if (!url) return url;
    if (url.includes("googleusercontent.com")) {
      return url.replace(/=s\d+(-c)?/, "=s400-c");
    }
    return url;
  };
  const { user } = useAuth();
  const { username } = useParams();
  const { profile: myProfile, loading: myLoading } = useDojoData();
  const [displayProfile, setDisplayProfile] = React.useState(null);
  const [loadingProfile, setLoadingProfile] = React.useState(true);
  const [friendshipStatus, setFriendshipStatus] = React.useState(null);

  React.useEffect(() => {
    const fetchProfile = async () => {
      setLoadingProfile(true);
      try {
        if (username && username !== myProfile?.username) {
          // Ver perfil público
          const data = await dojoService.getProfileByUsername(username);
          setDisplayProfile(data);

          // Verificar amistad
          if (user) {
            const status = await dojoService.getFriendshipStatus(
              user.id,
              data.id,
            );
            setFriendshipStatus(status);
          }
        } else {
          // Ver mi propio perfil
          setDisplayProfile(myProfile);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoadingProfile(false);
      }
    };

    if (!myLoading) {
      fetchProfile();
    }
  }, [username, myProfile, myLoading, user]);

  const handleConnect = async () => {
    if (!displayProfile || !user) return;
    try {
      await dojoService.sendFriendRequest(user.id, displayProfile.id);
      setFriendshipStatus("pending_sent");
      alert("Solicitud enviada");
    } catch (error) {
      alert(error.message);
    }
  };

  if (loadingProfile || myLoading) {
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
            src={sanitizeAvatarUrl(
              displayProfile?.custom_avatar_url ||
                displayProfile?.avatar_url ||
                user?.user_metadata?.avatar_url,
            )}
            alt="Avatar"
            className="w-32 h-32 md:w-44 md:h-44 rounded-[2.5rem] border-2 border-amber-300/20 group-hover:border-amber-300 transition-all duration-500 object-cover shadow-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-2 -right-2 bg-amber-300 text-black px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter">
            Nivel {displayProfile?.level || 1}
          </div>
        </div>
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="space-y-1">
            <h2 className="text-4xl md:text-6xl font-serif">
              {displayProfile?.full_name}
            </h2>
            <p className="text-sm text-amber-300/60 font-mono">
              @{displayProfile?.username}
            </p>
          </div>
          <p className="text-gray-400 max-w-xl leading-relaxed italic">
            "
            {displayProfile?.bio ||
              "Este guerrero aún no ha escrito su leyenda."}
            "
          </p>

          {/* Botón de Conectar (Solo si no es mi perfil) */}
          {username && username !== myProfile?.username && (
            <div className="mt-4">
              {friendshipStatus === null && (
                <button
                  onClick={handleConnect}
                  className="px-6 py-2 bg-amber-500 text-black font-bold rounded-full hover:bg-amber-400 transition-colors"
                >
                  Conectar
                </button>
              )}
              {friendshipStatus === "pending_sent" && (
                <span className="px-4 py-2 bg-zinc-800 text-amber-300 rounded-full border border-amber-500/30">
                  Solicitud Pendiente
                </span>
              )}
              {friendshipStatus === "accepted" && (
                <span className="px-4 py-2 bg-green-900/30 text-green-400 rounded-full border border-green-500/30">
                  Aliado
                </span>
              )}
            </div>
          )}
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
            <p className="text-2xl font-serif text-white">
              {displayProfile?.xp || 0}
            </p>
            <p className="text-[8px] uppercase text-gray-500 tracking-widest">
              XP Total
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-serif text-white">
              {displayProfile?.streak_current || 0}
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
          <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
            {ACHIEVEMENTS_CONFIG.slice(0, 10).map((achievement) => {
              const isUnlocked = achievement.condition({
                level: displayProfile?.level || 1,
                streak: displayProfile?.streak_best || 0,
                xp: displayProfile?.xp || 0,
              });

              return (
                <div
                  key={achievement.id}
                  className={`aspect-square bg-white/5 rounded-2xl border ${isUnlocked ? "border-amber-300/30 bg-amber-300/5 cursor-pointer" : "border-white/5 grayscale opacity-40 cursor-not-allowed"} flex items-center justify-center group/medal relative overflow-hidden transition-all duration-500`}
                  title={`${achievement.title}: ${achievement.description}`}
                >
                  <img
                    src={`/achievements/${achievement.img}`}
                    alt={achievement.title}
                    className={`w-full h-full object-cover transition-transform duration-500 ${isUnlocked ? "group-hover/medal:scale-110" : "scale-90"}`}
                  />

                  {/* Lock Overlay if locked */}
                  {!isUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <Lock className="w-5 h-5 text-white/30" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
