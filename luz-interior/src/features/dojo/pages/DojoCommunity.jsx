import React, { useState, useEffect } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useDojoData } from "../hooks/useDojoData";
import { dojoService } from "../services/dojo.service";
import {
  Search,
  UserPlus,
  Users,
  Check,
  X,
  Shield,
  ShieldPlus,
} from "lucide-react";
import {
  FaDiscord,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";

export default function DojoCommunity() {
  const { user } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const { profile } = useDojoData();

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [communityUsers, setCommunityUsers] = useState([]);
  const [loadingSocial, setLoadingSocial] = useState(true);

  const sanitizeAvatarUrl = (url) => {
    if (!url) return url;
    if (url.includes("googleusercontent.com"))
      return url.replace(/=s\d+(-c)?/, "=s400-c");
    return url;
  };

  const loadSocialData = React.useCallback(async () => {
    try {
      setLoadingSocial(true);
      const [myFriends, myRequests, spotlightUsers] = await Promise.all([
        dojoService.getFriends(user.id),
        dojoService.getIncomingFriendRequests(user.id),
        dojoService.getCommunityUsers(user.id),
      ]);
      setFriends(myFriends || []);
      setRequests(myRequests || []);
      setCommunityUsers(spotlightUsers || []);
    } catch (error) {
      console.error("Error cargando social:", error);
    } finally {
      setLoadingSocial(false);
    }
  }, [user]);

  useEffect(() => {
    if (user?.id) loadSocialData();
  }, [user, loadSocialData]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    try {
      const results = await dojoService.searchUsers(query, user.id);
      setSearchResults(results);
    } catch (error) {
      console.error("Error buscando:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const sendRequest = async (targetUserId) => {
    try {
      await dojoService.sendFriendRequest(user.id, targetUserId);
      alert("¡Señal de invocación enviada con honor!");
    } catch (error) {
      alert(error.message);
    }
  };

  const acceptRequest = async (requestId) => {
    try {
      await dojoService.acceptFriendRequest(requestId);
      loadSocialData();
    } catch (error) {
      console.error(error);
    }
  };

  const rejectRequest = async (requestId) => {
    if (!window.confirm("¿Seguro que deseas declinar esta alianza?")) return;
    try {
      await dojoService.rejectFriendRequest(requestId);
      loadSocialData();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-w-0 space-y-6 animate-in fade-in duration-500 pb-4">
      {/* Header Section - Compacto */}
      <div className="min-w-0 space-y-1">
        <div className="flex items-center justify-between border-b border-amber-600/50 pb-1">
          <h1 className="text-3xl md:text-5xl font-serif font-black text-white tracking-tight italic">
            Santuario Social
          </h1>
          {loadingSocial && (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-400"></div>
          )}
        </div>
        <p className="text-amber-200/60 text-xs md:text-sm italic">
          Encuentra latentes de la misma fe. Forja pactos inquebrantables en la
          niebla.
        </p>

        {/* Video Hero Section - Altura reducida */}
        <div className="relative w-full h-[350px] mt-4 rounded-xl overflow-hidden border-2 border-amber-600 shadow-[0_0_25px_rgba(217,119,6,0.2)] group">
          <video
            src="/videos/Knight-Templar-Sunset-Field-Moewalls-Com.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

          <div className="absolute bottom-0 left-0 p-5 w-full bg-black/40 backdrop-blur-sm border-t border-amber-600/30">
            <h2 className="text-2xl md:text-3xl font-serif text-amber-400 font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
              Temporada de Caza: Cenizas del Dojo
            </h2>
            <div className="flex flex-col gap-0.5 mt-1 mb-3">
              <div className="flex items-center gap-2">
                <ShieldPlus className="w-4 h-4 text-amber-500" />
                <p className="text-gray-100 text-xs md:text-sm font-medium drop-shadow-md">
                  Nuevos desafíos cooperativos ante la Gran Bestia.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <ShieldPlus className="w-4 h-4 text-amber-500" />
                <p className="text-gray-100 text-xs md:text-sm font-medium drop-shadow-md">
                  Mejoras en el desarrollo de la Orden.
                </p>
              </div>
            </div>
            <button className="px-6 py-2 bg-amber-600 text-black font-black uppercase tracking-tighter rounded-sm hover:bg-amber-400 transition-all border border-amber-300 shadow-xl text-xs md:text-sm active:scale-95">
              Unirse a la Invocación
            </button>
          </div>
        </div>

        {/* User Carousel Section - Padding reducido */}
        <div className="min-w-0 space-y-2 pt-4">
          <h3 className="text-lg font-serif text-amber-400 flex items-center gap-2 font-bold uppercase tracking-widest">
            <Shield className="w-5 h-5 text-amber-500 fill-amber-500/20" />
            Vanguardia de la Llama
          </h3>

          <div className="w-full overflow-hidden">
            <div className="overflow-x-auto overflow-y-hidden scrollbar-hide overscroll-x-contain">
              <div className="flex gap-3 pb-3">
                {communityUsers.map((warrior) => (
                  <div
                    key={warrior.id}
                    className="flex-none w-56 md:w-64 group relative overflow-hidden rounded-lg border-2 border-zinc-800 bg-black transition-all duration-300 hover:border-amber-500 hover:shadow-[0_0_15px_rgba(217,119,6,0.4)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                    <div className="h-64 w-full overflow-hidden">
                      <img
                        src={sanitizeAvatarUrl(
                          warrior.custom_avatar_url || warrior.avatar_url,
                        )}
                        alt={warrior.username}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-3 z-20">
                      <div className="mb-1 inline-flex items-center gap-1 rounded bg-amber-600 px-1.5 py-0.5 text-[10px] font-black uppercase text-black">
                        Lvl {warrior.level}
                      </div>
                      <div className="space-y-0">
                        <h4 className="font-serif text-lg font-bold uppercase text-white leading-tight group-hover:text-amber-400 transition-colors truncate">
                          {warrior.full_name}
                        </h4>
                        <p className="font-mono text-[10px] text-amber-200/50 uppercase tracking-tighter">
                          @{warrior.username}
                        </p>
                      </div>
                      <a
                        href={`/dojo/profile/${warrior.username}`}
                        className="mt-2 block w-full py-1.5 border border-amber-600/50 bg-zinc-900/80 text-center text-[10px] font-black uppercase tracking-widest text-amber-500 hover:bg-amber-600 hover:text-black transition-all"
                      >
                        Inspeccionar Alma
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Social Grid - Gaps reducidos */}
      <div className="min-w-0 grid lg:grid-cols-3 gap-4">
        {/* Search Column */}
        <div className="min-w-0 lg:col-span-2 space-y-4">
          <div className="bg-zinc-900/60 border-2 border-zinc-800 rounded-xl p-4 backdrop-blur-md">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600 w-4 h-4" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rastrear guerrero por nombre..."
                className="w-full bg-black/60 border border-amber-900/50 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </form>

            <div className="mt-4 space-y-2">
              {isSearching && (
                <p className="text-amber-500 text-xs animate-pulse italic">
                  Invocando resultados...
                </p>
              )}
              {searchResults.map((resultUser) => (
                <div
                  key={resultUser.id}
                  className="flex items-center justify-between bg-black/40 p-2 rounded-lg border border-amber-900/30 gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <img
                      src={sanitizeAvatarUrl(
                        resultUser.custom_avatar_url ||
                          resultUser.avatar_url ||
                          `https://api.dicebear.com/7.x/avataaars/svg?seed=${resultUser.username}`,
                      )}
                      alt=""
                      className="w-8 h-8 rounded border border-amber-600"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm text-white truncate leading-none">
                        {resultUser.full_name}
                      </p>
                      <p className="text-[10px] text-amber-500/70 truncate uppercase font-mono">
                        @{resultUser.username} • Lvl {resultUser.level}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => sendRequest(resultUser.id)}
                    className="p-2 bg-amber-600 text-black rounded hover:bg-white transition-all shadow-lg shadow-amber-900/20"
                  >
                    <UserPlus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Friends & Requests Column */}
        <div className="min-w-0 space-y-4">
          {requests.length > 0 && (
            <div className="bg-amber-950/20 border-2 border-amber-600/50 rounded-xl p-3 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
              <h3 className="text-amber-500 text-xs font-black mb-2 flex items-center gap-2 uppercase tracking-tighter">
                <Shield className="w-3 h-3" /> Peticiones de Unión
              </h3>
              <div className="space-y-2">
                {requests.map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center justify-between gap-2 bg-black/40 p-1.5 rounded border border-amber-900/20"
                  >
                    <span className="font-bold text-[11px] text-white truncate flex-1">
                      @{req.sender.username}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => acceptRequest(req.id)}
                        className="text-emerald-500 hover:text-white transition-colors"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => rejectRequest(req.id)}
                        className="text-rose-500 hover:text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-zinc-900/60 border-2 border-zinc-800 rounded-xl p-4">
            <h3 className="text-white text-xs font-black mb-3 flex items-center gap-2 uppercase tracking-tighter border-b border-zinc-800 pb-1">
              <Users className="w-3 h-3 text-amber-600" /> Pactos de Sangre (
              {friends.length})
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-hide">
              {friends.length === 0 ? (
                <p className="text-zinc-600 text-[10px] italic font-serif">
                  Aún no has forjado alianzas...
                </p>
              ) : (
                friends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center gap-2 group cursor-default"
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${friend.role === "admin" ? "bg-rose-600 shadow-[0_0_5px_rgba(225,29,72,0.8)]" : "bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]"}`}
                    ></div>
                    <p className="text-zinc-300 text-[11px] truncate font-bold group-hover:text-amber-400 transition-colors">
                      {friend.full_name}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Manifiesto Section - Altura y padding reducidos */}
      <div className="bg-black/80 border-2 border-amber-600 rounded-2xl p-5 relative overflow-hidden group shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.1),transparent)]"></div>
        <div className="grid lg:grid-cols-2 gap-6 items-center relative z-10">
          <div className="space-y-3">
            <h3 className="text-2xl font-serif text-white flex items-center gap-2">
              <Shield className="w-6 h-6 text-amber-500 fill-amber-500/10" />
              <span className="bg-gradient-to-r from-amber-400 to-amber-100 bg-clip-text text-transparent font-black italic">
                El Código de Ceniza
              </span>
            </h3>
            <div className="space-y-2 text-zinc-300 text-xs md:text-sm leading-snug">
              <p className="italic border-l-2 border-amber-700 pl-3">
                Santuario de crecimiento. Aquí, los latentes comparten
                sabiduría, no ponzoña.
              </p>
              <ul className="grid grid-cols-1 gap-1">
                <li className="flex items-center gap-2 text-amber-100/70">
                  <Check className="w-3 h-3 text-emerald-500" /> Lealtad entre
                  hermanos de armas.
                </li>
                <li className="flex items-center gap-2 text-amber-100/70">
                  <Check className="w-3 h-3 text-emerald-500" /> Respeto
                  absoluto al camino ajeno.
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-amber-900/30 flex items-center gap-4">
              <div className="flex gap-3">
                {[FaDiscord, FaInstagram, FaLinkedin, FaGithub, FaTwitter].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="p-2 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 hover:text-amber-500 hover:border-amber-500 transition-all shadow-lg"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>
          <div className="relative h-44 rounded-lg overflow-hidden border border-amber-600/50">
            <img
              src="/images/Redencion.webp"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4">
              <blockquote className="text-amber-200 text-xs italic font-serif leading-tight">
                "La verdadera fuerza no reside en vencer a otros, sino en
                conquistarse a uno mismo."
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
