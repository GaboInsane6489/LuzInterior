import React from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { useDojoData } from "../hooks/useDojoData";
import { ACHIEVEMENTS_CONFIG } from "../data/achievements.config";
import { dojoService } from "../services/dojo.service";
import { useIntersection } from "../hooks/useIntersection";
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
  Linkedin,
  Youtube,
  Twitch,
  Sword,
  Skull,
} from "lucide-react";

// --- Sub-componente para animar el Log de Actividad ---
const ActivityLogItem = ({ log, index }) => {
  const [ref, isVisible] = useIntersection({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 50}ms` }}
      className={`group flex items-center gap-4 p-3 bg-zinc-900 border-l-2 border-y border-r border-zinc-800 border-l-zinc-700 hover:border-l-amber-500 hover:bg-zinc-800/80 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
      }`}
    >
      <div className="w-8 h-8 flex-shrink-0 bg-black border border-zinc-700 flex items-center justify-center group-hover:border-amber-500 transition-colors">
        <Sword className="w-4 h-4 text-zinc-500 group-hover:text-amber-500" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-zinc-200 truncate group-hover:text-white transition-colors">
          {log.challenges?.title || "Gesta completada"}
        </h4>
        <p className="text-[10px] tracking-widest uppercase text-zinc-500">
          {new Date(log.logged_at).toLocaleDateString(undefined, {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
      <div className="text-right flex-shrink-0">
        <span className="text-amber-500 font-bold text-sm tracking-tighter">
          +{log.xp_earned} Ecos
        </span>
      </div>
    </div>
  );
};

// --- Sub-componente para animar la Vitrina de Trofeos ---
const ShowcaseTrophy = ({ achievement, index }) => {
  const [ref, isVisible] = useIntersection({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 50}ms` }}
      className={`aspect-square relative group cursor-help border-2 border-zinc-800 bg-black transition-all duration-500 hover:border-amber-500 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      <img
        src={`/achievements/${achievement.img}`}
        alt={achievement.title}
        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
      />
      {/* Tooltip de Alto Contraste */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black text-[10px] font-bold tracking-widest uppercase text-amber-500 whitespace-nowrap border border-amber-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
        {achievement.title}
      </div>
    </div>
  );
};

export default function UserProfile() {
  const { user } = useAuth();
  const { username } = useParams();
  const { profile: myProfile, loading: myLoading } = useDojoData();

  const [displayProfile, setDisplayProfile] = React.useState(null);
  const [loadingProfile, setLoadingProfile] = React.useState(true);
  const [friendshipStatus, setFriendshipStatus] = React.useState(null);
  const [recentActivity, setRecentActivity] = React.useState([]);

  const sanitizeUrl = (url) => {
    if (!url) return null;
    if (url.includes("googleusercontent.com")) {
      return url.replace(/=s\d+(-c)?/, "=s800-c");
    }
    return url;
  };

  React.useEffect(() => {
    const fetchProfileData = async () => {
      setLoadingProfile(true);
      try {
        let profileData = null;

        if (username && username !== myProfile?.username) {
          profileData = await dojoService.getProfileByUsername(username);
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

    if (!myLoading) fetchProfileData();
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
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-xs uppercase tracking-[0.5em] text-amber-500 animate-pulse font-bold">
          Invocando espectro...
        </div>
      </div>
    );
  }

  if (!displayProfile) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
        <Skull className="w-12 h-12 text-zinc-700" />
        <h2 className="text-2xl text-zinc-500 font-serif tracking-widest">
          Alma perdida en la niebla
        </h2>
        <Link
          to="/dojo"
          className="mt-4 px-6 py-2 bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors"
        >
          Retornar a la Hoguera
        </Link>
      </div>
    );
  }

  const isOwnProfile = user?.id === displayProfile.id;

  return (
    // Reducido el pb-20 a pb-10, ajustado el espaciado general
    <div className="pb-10 animate-in fade-in duration-700 relative z-10">
      {/* --- HERO SECTION (Más compacto) --- */}
      <div className="relative mb-16 md:mb-20">
        {/* Cover Photo - Altura reducida */}
        <div className="h-32 md:h-56 w-full overflow-hidden relative border-b-2 border-zinc-800 bg-black">
          {displayProfile.cover_photo_url && (
            <img
              src={displayProfile.cover_photo_url}
              alt="Cover"
              className="w-full h-full object-cover opacity-80 hover:grayscale-0 transition-all duration-1000"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </div>

        {/* Avatar & Info Container - Posicionamiento más ajustado */}
        <div className="absolute -bottom-12 md:-bottom-16 left-0 w-full px-4 md:px-8 flex flex-col md:flex-row items-end gap-4 md:gap-6 max-w-7xl mx-auto right-0">
          {/* Avatar Solid Container */}
          <div className="relative group flex-shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 border-4 border-[#0a0a0a] bg-zinc-900 overflow-hidden relative z-10">
              <img
                src={sanitizeUrl(
                  displayProfile.custom_avatar_url || displayProfile.avatar_url,
                )}
                alt={displayProfile.username}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
              />
            </div>
            {/* Level Badge en estilo sello oscuro */}
            <div className="absolute -bottom-3 -right-3 bg-zinc-900 text-amber-500 font-black px-3 py-1 border-2 border-amber-500/50 z-20 text-xs tracking-widest">
              LVL {displayProfile.level || 1}
            </div>
          </div>

          {/* Name & Actions */}
          <div className="flex-1 pb-2 flex flex-col md:flex-row items-center md:items-end justify-between gap-4 w-full">
            <div className="text-center md:text-left space-y-1">
              <h1 className="text-3xl md:text-4xl font-serif text-zinc-100 font-bold tracking-tight">
                {displayProfile.full_name || displayProfile.username}
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs">
                <span className="text-zinc-400 font-mono">
                  @{displayProfile.username}
                </span>
                {displayProfile.role === "admin" && (
                  <span className="px-2 py-0.5 bg-red-950 text-red-500 border border-red-900 font-bold tracking-widest uppercase">
                    Señor de la Ceniza
                  </span>
                )}
                {friendshipStatus === "accepted" && (
                  <span className="px-2 py-0.5 bg-zinc-900 text-amber-500 border border-amber-900/50 font-bold tracking-widest uppercase flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Juramento Activo
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons Solid */}
            <div className="flex-shrink-0">
              {isOwnProfile ? (
                <Link
                  to="/dojo/settings"
                  className="px-6 py-2 bg-zinc-900 border border-zinc-700 hover:border-zinc-400 text-zinc-300 hover:text-white font-bold transition-colors text-sm flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" /> Forjar Destino
                </Link>
              ) : (
                <>
                  {friendshipStatus === null && (
                    <button
                      onClick={handleConnect}
                      className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-black font-black transition-colors text-sm uppercase tracking-wider"
                    >
                      Invocar Espectro
                    </button>
                  )}
                  {friendshipStatus === "pending_sent" && (
                    <button
                      disabled
                      className="px-6 py-2 bg-zinc-900 text-zinc-500 border border-zinc-800 font-bold cursor-not-allowed text-sm uppercase"
                    >
                      Señal de invocación dejada
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
        {/* --- LEFT COLUMN: Stats & Bio --- */}
        <div className="lg:col-span-4 space-y-6">
          {/* Bio Solid Card */}
          <div className="bg-zinc-900/80 border border-zinc-800 p-6 space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2 border-b border-zinc-800 pb-2">
              <User className="w-4 h-4 text-zinc-600" /> Ecos del Pasado
            </h3>
            <p className="text-zinc-300 leading-relaxed text-sm italic">
              {displayProfile.bio ||
                "Un ser marcado por la maldición, errante en la niebla sin dejar rastros en la ceniza."}
            </p>

            {/* Social Links Compactos */}
            <div className="flex flex-wrap gap-2 pt-4">
              {[
                {
                  condition: displayProfile.social_instagram,
                  icon: Instagram,
                  hover: "hover:text-pink-500 hover:border-pink-500",
                },
                {
                  condition: displayProfile.social_twitter,
                  icon: Twitter,
                  hover: "hover:text-blue-400 hover:border-blue-400",
                },
                {
                  condition: displayProfile.social_github,
                  icon: Github,
                  hover: "hover:text-white hover:border-white",
                },
                {
                  condition: displayProfile.social_linkedin,
                  icon: Linkedin,
                  hover: "hover:text-blue-500 hover:border-blue-500",
                },
                {
                  condition: displayProfile.social_youtube,
                  icon: Youtube,
                  hover: "hover:text-red-500 hover:border-red-500",
                },
                {
                  condition: displayProfile.social_twitch,
                  icon: Twitch,
                  hover: "hover:text-purple-500 hover:border-purple-500",
                },
              ].map(
                (social, idx) =>
                  social.condition && (
                    <a
                      key={idx}
                      href={social.condition}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 bg-black border border-zinc-800 text-zinc-500 transition-colors ${social.hover}`}
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ),
              )}
            </div>
          </div>

          {/* Stats Grid - Ahora en 3 columnas para reducir scroll vertical */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-zinc-900 border border-zinc-800 p-4 text-center">
              <Flame className="w-5 h-5 text-orange-500 mx-auto mb-2 opacity-80" />
              <div className="text-xl font-serif text-white mb-1">
                {displayProfile.streak_current || 0}
              </div>
              <div className="text-[9px] uppercase tracking-widest text-zinc-500 leading-tight">
                Ascuas Vivas
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-4 text-center">
              <Zap className="w-5 h-5 text-amber-600 mx-auto mb-2 opacity-80" />
              <div className="text-xl font-serif text-white mb-1">
                {displayProfile.xp || 0}
              </div>
              <div className="text-[9px] uppercase tracking-widest text-zinc-500 leading-tight">
                Ecos Totales
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-4 text-center">
              <Trophy className="w-5 h-5 text-zinc-400 mx-auto mb-2 opacity-80" />
              <div
                className="text-xl font-serif text-white mb-1 truncate px-1"
                title={dojoService.getRankTitle(displayProfile.level)}
              >
                {dojoService.getRankTitle(displayProfile.level)}
              </div>
              <div className="text-[9px] uppercase tracking-widest text-zinc-500 leading-tight">
                Pacto
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Content --- */}
        <div className="lg:col-span-8 space-y-10">
          {/* Recent Activity Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif text-zinc-300 flex items-center gap-3 border-b border-zinc-800 pb-2">
              <Activity className="w-5 h-5 text-amber-600" />
              Crónicas de Batalla
            </h3>

            <div className="grid gap-2">
              {recentActivity.length > 0 ? (
                recentActivity.slice(0, 5).map(
                  (
                    log,
                    index, // Limitar a 5 para evitar scroll infinito
                  ) => <ActivityLogItem key={log.id} log={log} index={index} />,
                )
              ) : (
                <div className="p-8 text-center border border-dashed border-zinc-800 text-zinc-600 text-sm">
                  Las cenizas de este ser aún no cuentan ninguna historia.
                </div>
              )}
              {recentActivity.length > 5 && (
                <div className="text-center pt-2">
                  <span className="text-xs text-zinc-500 uppercase tracking-widest hover:text-amber-500 cursor-pointer transition-colors">
                    Leer tomos antiguos...
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Achievements Showcase Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif text-zinc-300 flex items-center gap-3 border-b border-zinc-800 pb-2">
              <Award className="w-5 h-5 text-amber-600" />
              Grandes Runas Reclamadas
            </h3>

            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {ACHIEVEMENTS_CONFIG.map((achievement, index) => {
                const isUnlocked = achievement.condition({
                  level: displayProfile.level || 1,
                  streak: displayProfile.streak_best || 0,
                  xp: displayProfile.xp || 0,
                });

                if (!isUnlocked) return null;

                return (
                  <ShowcaseTrophy
                    key={achievement.id}
                    achievement={achievement}
                    index={index}
                  />
                );
              })}

              {ACHIEVEMENTS_CONFIG.every(
                (a) =>
                  !a.condition({
                    level: displayProfile.level || 1,
                    streak: displayProfile.streak_best || 0,
                    xp: displayProfile.xp || 0,
                  }),
              ) && (
                <p className="col-span-full p-8 text-center text-zinc-600 text-sm border border-dashed border-zinc-800">
                  Un alma vacía. Aún no ha reclamado grandes runas.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
