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
} from "lucide-react";

// --- Sub-componente para animar el Log de Actividad ---
const ActivityLogItem = ({ log, index }) => {
  const [ref, isVisible] = useIntersection({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`group flex items-center gap-4 p-4 bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-2xl hover:bg-white/[0.05] hover:border-amber-500/30 hover:-translate-y-1 transition-all duration-500 shadow-lg ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
      }`}
    >
      <div className="w-10 h-10 rounded-full bg-amber-500/5 flex items-center justify-center border border-amber-500/20 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]">
        <Check className="w-5 h-5 text-amber-500" />
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-white/90 group-hover:text-amber-400 transition-colors duration-300">
          {log.challenges?.title || "Reto completado"}
        </h4>
        <p className="text-[10px] tracking-wider uppercase text-white/30 group-hover:text-white/50 transition-colors">
          {new Date(log.logged_at).toLocaleDateString(undefined, {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </p>
      </div>
      <div className="text-right">
        <span className="text-amber-500 font-bold tracking-tighter opacity-80 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] transition-all">
          +{log.xp_earned} XP
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
      className={`aspect-square relative group cursor-help rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-700 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
      }`}
    >
      <img
        src={`/achievements/${achievement.img}`}
        alt={achievement.title}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-2 transition-all duration-700 ease-out"
      />
      {/* Glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Tooltip Mejorado */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-zinc-950/90 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase text-white whitespace-nowrap rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 pointer-events-none z-50 shadow-2xl">
        {achievement.title}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-950/90" />
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
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-[10px] uppercase tracking-[0.8em] text-white/30 animate-pulse font-bold">
          Sincronizando Perfil...
        </div>
      </div>
    );
  }

  if (!displayProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-6 relative z-10">
        <h2 className="text-3xl text-red-500/80 font-serif tracking-widest">
          Guerrero no encontrado
        </h2>
        <Link
          to="/dojo"
          className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all backdrop-blur-md"
        >
          Volver al Dojo
        </Link>
      </div>
    );
  }

  const isOwnProfile = user?.id === displayProfile.id;

  return (
    <div className="min-h-screen pb-20 animate-in fade-in duration-1000 relative z-10">
      {/* --- HERO SECTION --- */}
      <div className="relative mb-24 md:mb-32">
        {/* Cover Photo */}
        <div className="h-48 md:h-96 w-full overflow-hidden relative border-b border-white/10">
          {displayProfile.cover_photo_url ? (
            <img
              src={displayProfile.cover_photo_url}
              alt="Cover"
              className="w-full h-full object-cover opacity-50 mix-blend-luminosity"
            />
          ) : (
            <div className="w-full h-full bg-white/[0.02] backdrop-blur-3xl opacity-20" />
          )}
          {/* Overlay Gradient suave para fundir con el layout */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        {/* Avatar & Info Container */}
        <div className="absolute -bottom-20 left-0 w-full px-6 flex flex-col md:flex-row items-end gap-8 max-w-7xl mx-auto right-0">
          {/* Avatar Glass Container */}
          <div className="relative group">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2rem] border border-white/20 bg-black/40 backdrop-blur-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.8)] relative z-10 transition-transform duration-700 group-hover:-translate-y-2">
              <img
                src={sanitizeUrl(
                  displayProfile.custom_avatar_url || displayProfile.avatar_url,
                )}
                alt={displayProfile.username}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
            </div>
            {/* Level Badge con glow */}
            <div className="absolute -bottom-4 -right-4 bg-amber-500 text-black font-black px-4 py-1.5 rounded-full border border-amber-300 z-20 shadow-[0_0_20px_rgba(245,158,11,0.4)] group-hover:scale-110 transition-transform duration-500 text-sm">
              Lvl {displayProfile.level || 1}
            </div>
          </div>

          {/* Name & Actions */}
          <div className="flex-1 pb-4 space-y-2 md:space-y-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-serif text-white drop-shadow-2xl tracking-tight">
              {displayProfile.full_name || displayProfile.username}
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4 text-sm">
              <span className="text-amber-500/80 font-mono tracking-wider bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
                @{displayProfile.username}
              </span>
              {displayProfile.role === "admin" && (
                <span className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-[10px] uppercase font-bold tracking-widest backdrop-blur-sm">
                  Sensei
                </span>
              )}
              {friendshipStatus === "accepted" && (
                <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg text-[10px] uppercase font-bold tracking-widest flex items-center gap-2 backdrop-blur-sm">
                  <Shield className="w-3 h-3" /> Aliado
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons Glassmorphism */}
          <div className="pb-4 flex gap-3">
            {isOwnProfile ? (
              <Link
                to="/dojo/settings"
                className="px-6 py-3 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/30 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 backdrop-blur-md shadow-lg text-white/80 hover:text-white"
              >
                <Settings className="w-4 h-4" />
                Editar Perfil
              </Link>
            ) : (
              <>
                {friendshipStatus === null && (
                  <button
                    onClick={handleConnect}
                    className="px-8 py-3 bg-amber-500/90 hover:bg-amber-400 text-black rounded-xl font-black transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:-translate-y-1 backdrop-blur-md"
                  >
                    Conectar
                  </button>
                )}
                {friendshipStatus === "pending_sent" && (
                  <button
                    disabled
                    className="px-8 py-3 bg-white/[0.02] text-white/30 border border-white/5 rounded-xl font-bold cursor-not-allowed backdrop-blur-sm"
                  >
                    Solicitud Enviada
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 pt-8">
        {/* --- LEFT COLUMN: Stats & Bio --- */}
        <div className="lg:col-span-4 space-y-6">
          {/* Bio Glass Card */}
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 space-y-6 backdrop-blur-md hover:border-white/20 transition-colors duration-500 shadow-xl">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 flex items-center gap-3">
              <User className="w-4 h-4 text-amber-500/70" /> Archivo Personal
            </h3>
            <p className="text-white/70 leading-relaxed font-light text-sm italic relative">
              <span className="text-4xl absolute -top-4 -left-4 text-white/5 font-serif">
                "
              </span>
              {displayProfile.bio ||
                "Un guerrero silencioso que deja que sus acciones hablen."}
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3 pt-6 border-t border-white/10">
              {[
                {
                  condition: displayProfile.social_instagram,
                  icon: Instagram,
                  color:
                    "hover:text-pink-400 hover:border-pink-500/30 hover:bg-pink-500/10",
                },
                {
                  condition: displayProfile.social_twitter,
                  icon: Twitter,
                  color:
                    "hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/10",
                },
                {
                  condition: displayProfile.social_github,
                  icon: Github,
                  color:
                    "hover:text-white hover:border-white/30 hover:bg-white/10",
                },
                {
                  condition: displayProfile.social_linkedin,
                  icon: Linkedin,
                  color:
                    "hover:text-blue-500 hover:border-blue-500/30 hover:bg-blue-500/10",
                },
                {
                  condition: displayProfile.social_youtube,
                  icon: Youtube,
                  color:
                    "hover:text-red-500 hover:border-red-500/30 hover:bg-red-500/10",
                },
                {
                  condition: displayProfile.social_twitch,
                  icon: Twitch,
                  color:
                    "hover:text-purple-400 hover:border-purple-500/30 hover:bg-purple-500/10",
                },
              ].map(
                (social, idx) =>
                  social.condition && (
                    <a
                      key={idx}
                      href={social.condition}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2.5 bg-white/[0.03] border border-white/5 rounded-xl text-white/40 transition-all duration-300 ${social.color}`}
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ),
              )}
            </div>
          </div>

          {/* Stats Glass Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 text-center backdrop-blur-md hover:bg-white/[0.04] hover:-translate-y-1 transition-all duration-500 group">
              <Flame className="w-6 h-6 text-orange-500 mx-auto mb-3 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
              <div className="text-3xl font-serif text-white tracking-tight mb-1">
                {displayProfile.streak_current || 0}
              </div>
              <div className="text-[9px] uppercase tracking-widest text-white/30">
                Racha Actual
              </div>
            </div>
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 text-center backdrop-blur-md hover:bg-white/[0.04] hover:-translate-y-1 transition-all duration-500 group">
              <Zap className="w-6 h-6 text-purple-500 mx-auto mb-3 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
              <div className="text-3xl font-serif text-white tracking-tight mb-1">
                {displayProfile.xp || 0}
              </div>
              <div className="text-[9px] uppercase tracking-widest text-white/30">
                XP Total
              </div>
            </div>
            <div className="bg-gradient-to-br from-white/[0.02] to-amber-500/[0.02] border border-white/10 hover:border-amber-500/30 rounded-2xl p-6 text-center col-span-2 backdrop-blur-md transition-colors duration-500 group">
              <Trophy className="w-8 h-8 text-amber-500 mx-auto mb-3 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all group-hover:drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
              <div className="text-2xl font-serif text-white tracking-tight mb-1">
                {dojoService.getRankTitle(displayProfile.level)}
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-amber-500/50">
                Rango Actual
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Content --- */}
        <div className="lg:col-span-8 space-y-16">
          {/* Recent Activity Section */}
          <div className="space-y-8">
            <h3 className="text-2xl font-serif flex items-center gap-4 text-white/90">
              <Activity className="w-6 h-6 text-amber-500 opacity-80" />
              Registro de Actividad
              <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4" />
            </h3>

            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((log, index) => (
                  <ActivityLogItem key={log.id} log={log} index={index} />
                ))
              ) : (
                <div className="p-12 text-center border border-white/5 bg-white/[0.01] backdrop-blur-sm rounded-3xl text-white/30 text-sm font-light">
                  Los registros de este guerrero aún están en silencio.
                </div>
              )}
            </div>
          </div>

          {/* Achievements Showcase Section */}
          <div className="space-y-8">
            <h3 className="text-2xl font-serif flex items-center gap-4 text-white/90">
              <Award className="w-6 h-6 text-amber-500 opacity-80" />
              Sala de Trofeos
              <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4" />
            </h3>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
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
                <p className="col-span-full p-8 text-center text-white/30 text-sm font-light border border-white/5 bg-white/[0.01] backdrop-blur-sm rounded-3xl">
                  Aún forjando su leyenda. Ningún trofeo descubierto.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
