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

  const loadSocialData = React.useCallback(async () => {
    try {
      setLoadingSocial(true);
      const [myFriends, myRequests, spotlightUsers] = await Promise.all([
        dojoService.getFriends(user.id),
        dojoService.getIncomingFriendRequests(user.id),
        dojoService.getCommunityUsers(),
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
    if (user?.id) {
      loadSocialData();
    }
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
      alert("¡Solicitud enviada con honor!");
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

  return (
    <div className="min-w-0 space-y-12 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="min-w-0 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl md:text-6xl font-serif">Comunidad</h1>
          {loadingSocial && (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-300"></div>
          )}
        </div>
        <p className="text-gray-400 max-w-2xl">
          Encuentra guerreros de ideas afines. Forja alianzas indestructibles.
        </p>

        {/* Video Hero Section */}
        <div className="relative w-full h-[600px] rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl group">
          <video
            src="/videos/Knight-Templar-Sunset-Field-Moewalls-Com.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/20"></div>

          <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-2 drop-shadow-lg">
              Temporada de Caza
            </h2>
            <p className="text-gray-200 max-w-xl text-base md:text-lg mb-4 md:mb-6 drop-shadow-md">
              La bestia interior nunca duerme. Domínala junto a tus hermanos de
              armas. Nuevos retos cooperativos disponibles.
            </p>
            <div className="flex items-center gap-2 justify-start">
              <ShieldPlus className="w-6 h-6 text-amber-500" />
              <p className="text-gray-200 max-w-xl text-base md:text-lg drop-shadow-md">
                Mejoras en el desarrollo de la comunidad.
              </p>
            </div>
            <div className="flex items-center gap-2 justify-start">
              <ShieldPlus className="w-6 h-6 text-amber-500" />
              <p className="text-gray-200 max-w-xl text-base md:text-lg drop-shadow-md">
                Nuevos desafíos cooperativos disponibles.
              </p>
            </div>
            <div className="flex items-center gap-2 justify-start">
              <ShieldPlus className="w-6 h-6 text-amber-500" />
              <p className="text-gray-200 max-w-xl text-base md:text-lg drop-shadow-md">
                Implementación de nuevas funcionalidades.
              </p>
            </div>
            <button className="px-6 md:px-8 py-2 md:py-3 mt-4 hover:cursor-pointer bg-amber-500 text-black font-bold uppercase tracking-widest rounded-full hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20 text-sm md:text-base">
              Unirse a la Cacería
            </button>
          </div>
        </div>

        {/* User Carousel Section */}
        <div className="min-w-0 space-y-4 pt-8">
          <h3 className="text-2xl font-serif text-amber-100 flex items-center gap-2">
            <Shield className="w-6 h-6 text-amber-500" />
            Vanguardia del Dojo
          </h3>

          {/* Carousel Container with Proper Overflow Control */}
          <div className="w-full overflow-hidden">
            <div
              className="overflow-x-auto overflow-y-hidden scrollbar-hide overscroll-x-contain"
              style={{ width: "100%", contain: "layout" }}
            >
              <div className="flex gap-4 px-4 sm:px-6 md:px-8 pb-4">
                {communityUsers.map((warrior) => (
                  <div
                    key={warrior.id}
                    className="flex-none w-64 bg-zinc-900/60 border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-3 hover:border-amber-500/50 transition-colors"
                  >
                    <div className="relative">
                      <img
                        src={warrior.custom_avatar_url}
                        alt={warrior.username}
                        className="w-20 h-20 rounded-full border-2 border-amber-500/20 object-cover"
                      />
                      <div className="absolute bottom-0 right-0 bg-zinc-800 text-xs px-2 py-0.5 rounded-full border border-zinc-600">
                        Lvl {warrior.level}
                      </div>
                    </div>
                    <div className="text-center w-full">
                      <h4 className="font-bold text-white truncate">
                        {warrior.full_name}
                      </h4>
                      <p className="text-xs text-gray-400">
                        @{warrior.username}
                      </p>
                    </div>
                    <a
                      href={`/dojo/profile/${warrior.username}`}
                      className="w-full py-2 mt-2 text-center text-xs font-bold uppercase tracking-wider text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors"
                    >
                      Ver Perfil
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Social Grid */}
      <div className="min-w-0 grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Search Column */}
        <div className="min-w-0 lg:col-span-2 space-y-8">
          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por nombre o usuario..."
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-amber-300/50 transition-colors"
              />
            </form>

            <div className="mt-6 space-y-4">
              {isSearching && (
                <p className="text-gray-500 animate-pulse">
                  Buscando guerreros...
                </p>
              )}

              {searchResults.map((resultUser) => (
                <div
                  key={resultUser.id}
                  className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5 gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <img
                      src={
                        resultUser.custom_avatar_url ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${resultUser.username}`
                      }
                      alt={resultUser.username}
                      className="w-10 h-10 rounded-lg bg-black flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-white truncate">
                        {resultUser.full_name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        @{resultUser.username} • Lvl {resultUser.level}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => sendRequest(resultUser.id)}
                    className="flex-shrink-0 p-2 bg-amber-300 text-black rounded-lg hover:bg-amber-400 transition-colors"
                    title="Enviar Solicitud"
                  >
                    <UserPlus className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Friends & Requests Column */}
        <div className="min-w-0 space-y-6">
          {/* Friend Requests */}
          {requests.length > 0 && (
            <div className="bg-amber-900/10 border border-amber-500/20 rounded-2xl p-6">
              <h3 className="text-amber-500 font-bold mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4" /> Solicitudes
              </h3>
              <div className="space-y-3">
                {requests.map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center justify-between gap-2"
                  >
                    <span className="font-bold text-sm truncate flex-1">
                      {req.sender.username}
                    </span>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => acceptRequest(req.id)}
                        className="text-green-400 hover:text-green-300"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Friends List */}
          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" /> Aliados (
              {friends.length})
            </h3>
            <div className="space-y-4">
              {friends.length === 0 ? (
                <p className="text-gray-600 text-sm">
                  Tu círculo está vacío aún.
                </p>
              ) : (
                friends.map((friend) => (
                  <div key={friend.id} className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        friend.role === "admin" ? "bg-red-500" : "bg-green-500"
                      }`}
                    ></div>
                    <p className="text-gray-300 text-sm truncate">
                      {friend.full_name}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
