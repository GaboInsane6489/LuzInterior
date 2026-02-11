import React from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { useDojoData } from "../hooks/useDojoData";
import { ACHIEVEMENTS_CONFIG } from "../data/achievements.config";
import { dojoService } from "../services/dojo.service";
import {
  MapPin,
  Calendar,
  Award,
  Lock,
  Settings,
  User,
  Flame,
  Zap,
  Trophy,
  Activity,
  Check,
  Instagram,
  Twitter,
  Github,
  Shield,
} from "lucide-react";

export default function UserProfile() {
  const { user } = useAuth();
  const { username } = useParams();
  const { profile: myProfile, loading: myLoading } = useDojoData();

  const [displayProfile, setDisplayProfile] = React.useState(null);
  const [loadingProfile, setLoadingProfile] = React.useState(true);
  const [friendshipStatus, setFriendshipStatus] = React.useState(null);
  const [recentActivity, setRecentActivity] = React.useState([]);

  // Helper para URLs (Avatar y Cover)
  const sanitizeUrl = (url) => {
    if (!url) return null;
    if (url.includes("googleusercontent.com")) {
      return url.replace(/=s\d+(-c)?/, "=s800-c"); // Mayor calidad
    }
    return url;
  };

  React.useEffect(() => {
    const fetchProfileData = async () => {
      setLoadingProfile(true);
      try {
        let profileData = null;

        // 1. Determinar qué perfil mostrar
        if (username && username !== myProfile?.username) {
          profileData = await dojoService.getProfileByUsername(username);

          // Verificar amistad si estoy logueado y viendo a otro
          if (user && profileData) {
            const status = await dojoService.getFriendshipStatus(
              user.id,
              profileData.id,
            );
            setFriendshipStatus(status);
          }
        } else {
          profileData = myProfile;
        }

        setDisplayProfile(profileData);

        // 2. Cargar Actividad Reciente
        if (profileData) {
          const activity = await dojoService.getUserRecentActivity(
            profileData.id,
          );
          setRecentActivity(activity || []);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoadingProfile(false);
      }
    };

    if (!myLoading) {
      fetchProfileData();
    }
  }, [username, myProfile, myLoading, user]);

  const handleConnect = async () => {
    if (!displayProfile || !user) return;
    try {
      await dojoService.sendFriendRequest(user.id, displayProfile.id);
      setFriendshipStatus("pending_sent");
    } catch (error) {
      alert(error.message);
    }
  };

  if (loadingProfile || myLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-amber-300 font-serif text-xl">
          Conectando con el Dojo...
        </div>
      </div>
    );
  }

  if (!displayProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h2 className="text-2xl text-red-400 font-serif">
          Guerrero no encontrado
        </h2>
        <Link to="/dojo" className="text-amber-300 hover:underline">
          Volver al Dojo
        </Link>
      </div>
    );
  }

  const isOwnProfile = user?.id === displayProfile.id;

  return (
    <div className="min-h-screen pb-20 animate-in fade-in duration-700">
      {/* --- HERO SECTION (Cover + Avatar) --- */}
      <div className="relative mb-24 md:mb-32">
        {/* Cover Photo */}
        <div className="h-48 md:h-80 w-full bg-zinc-900 overflow-hidden relative border-b border-white/5">
          {displayProfile.cover_photo_url ? (
            <img
              src={displayProfile.cover_photo_url}
              alt="Cover"
              className="w-full h-full object-cover opacity-80"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-zinc-800 to-black/50 pattern-grid-lg opacity-20" />
          )}
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        {/* Avatar & Info Container */}
        <div className="absolute -bottom-20 left-0 w-full px-6 flex flex-col md:flex-row items-end md:items-end gap-6 max-w-7xl mx-auto right-0">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2rem] border-4 border-black bg-zinc-900 overflow-hidden shadow-2xl relative z-10">
              <img
                src={sanitizeUrl(
                  displayProfile.custom_avatar_url || displayProfile.avatar_url,
                )}
                alt={displayProfile.username}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Level Badge */}
            <div className="absolute -bottom-3 -right-3 bg-amber-500 text-black font-bold px-3 py-1 rounded-full border-4 border-black z-20 shadow-lg">
              Lvl {displayProfile.level || 1}
            </div>
          </div>

          {/* Name & Actions */}
          <div className="flex-1 pb-2 space-y-2 md:space-y-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-serif text-white drop-shadow-lg">
              {displayProfile.full_name || displayProfile.username}
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-6 text-sm">
              <span className="text-amber-300 font-mono">
                @{displayProfile.username}
              </span>
              {displayProfile.role === "admin" && (
                <span className="px-2 py-0.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded text-[10px] uppercase font-bold tracking-wider">
                  Sensei
                </span>
              )}
              {friendshipStatus === "accepted" && (
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Aliado
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pb-4 flex gap-3">
            {isOwnProfile ? (
              <Link
                to="/dojo/settings"
                className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-bold transition-all flex items-center gap-2 backdrop-blur-md"
              >
                <Settings className="w-4 h-4" />
                Editar Perfil
              </Link>
            ) : (
              <>
                {friendshipStatus === null && (
                  <button
                    onClick={handleConnect}
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                  >
                    Conectar
                  </button>
                )}
                {friendshipStatus === "pending_sent" && (
                  <button
                    disabled
                    className="px-6 py-2.5 bg-zinc-800 text-gray-400 border border-white/10 rounded-xl font-bold cursor-not-allowed"
                  >
                    Enviada
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
        {/* --- LEFT COLUMN: Stats & Bio (4 cols) --- */}
        <div className="lg:col-span-4 space-y-8">
          {/* Bio Card */}
          <div className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 space-y-4 backdrop-blur-sm">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
              <User className="w-4 h-4" /> Sobre Mí
            </h3>
            <p className="text-gray-300 leading-relaxed italic">
              "
              {displayProfile.bio ||
                "Un guerrero silencioso que deja que sus acciones hablen."}
              "
            </p>

            {/* Social Links */}
            <div className="flex gap-3 pt-4 border-t border-white/5">
              {displayProfile.social_instagram && (
                <a
                  href={displayProfile.social_instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 rounded-lg hover:bg-pink-500/20 hover:text-pink-400 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {displayProfile.social_twitter && (
                <a
                  href={displayProfile.social_twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 rounded-lg hover:bg-blue-400/20 hover:text-blue-400 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {displayProfile.social_github && (
                <a
                  href={displayProfile.social_github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 rounded-lg hover:bg-white/20 hover:text-white transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-4 text-center">
              <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-serif font-bold text-white">
                {displayProfile.streak_current || 0}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-gray-500">
                Racha Actual
              </div>
            </div>
            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-4 text-center">
              <Zap className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-serif font-bold text-white">
                {displayProfile.xp || 0}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-gray-500">
                XP Total
              </div>
            </div>
            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-4 text-center col-span-2">
              <Trophy className="w-6 h-6 text-amber-500 mx-auto mb-2" />
              <div className="text-xl font-serif font-bold text-white">
                {dojoService.getRankTitle(displayProfile.level)}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-gray-500">
                Rango Actual
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Content (8 cols) --- */}
        <div className="lg:col-span-8 space-y-12">
          {/* Recent Activity */}
          <div className="space-y-6">
            <h3 className="text-xl font-serif flex items-center gap-3">
              <Activity className="w-5 h-5 text-amber-500" />
              Actividad Reciente
            </h3>

            <div className="space-y-3">
              {recentActivity.length > 0 ? (
                recentActivity.map((log) => (
                  <div
                    key={log.id}
                    className="group flex items-center gap-4 p-4 bg-zinc-900/30 border border-white/5 rounded-2xl hover:border-amber-500/20 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 group-hover:scale-110 transition-transform">
                      <Check className="w-5 h-5 text-amber-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white group-hover:text-amber-200 transition-colors">
                        {log.challenges?.title || "Reto completado"}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {new Date(log.logged_at).toLocaleDateString(undefined, {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-amber-400 font-bold">
                        +{log.xp_earned} XP
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center border-2 border-dashed border-white/5 rounded-2xl text-gray-500 italic">
                  No hay actividad reciente registrada.
                </div>
              )}
            </div>
          </div>

          {/* Achievements Showcase */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-serif flex items-center gap-3">
                <Award className="w-5 h-5 text-amber-500" />
                Sala de Trofeos
              </h3>
              {/* Link to full achievements if needed, logic handled in visual mapping */}
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
              {ACHIEVEMENTS_CONFIG.map((achievement) => {
                const isUnlocked = achievement.condition({
                  level: displayProfile.level || 1,
                  streak: displayProfile.streak_best || 0,
                  xp: displayProfile.xp || 0,
                });

                if (!isUnlocked) return null; // Only show unlocked in profile for cleaner look? Or show all transparent?
                // Let's show only unlocked to make it a "Showcase"

                return (
                  <div
                    key={achievement.id}
                    className="aspect-square relative group cursor-help"
                  >
                    <img
                      src={`/achievements/${achievement.img}`}
                      alt={achievement.title}
                      className="w-full h-full object-cover drop-shadow-md hover:scale-110 transition-transform duration-300"
                    />
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-black text-xs whitespace-nowrap rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                      {achievement.title}
                    </div>
                  </div>
                );
              })}
              {/* Placeholder text if empty */}
              {ACHIEVEMENTS_CONFIG.every(
                (a) =>
                  !a.condition({
                    level: displayProfile.level || 1,
                    streak: displayProfile.streak_best || 0,
                    xp: displayProfile.xp || 0,
                  }),
              ) && (
                <p className="col-span-full text-gray-500 italic">
                  Aún no se han forjado trofeos.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
