import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { useDojoData } from "../hooks/useDojoData";
import { dojoService } from "../services/dojo.service"; // Importar servicio
import XPProgressBar from "../components/XPProgressBar";
import VideoBackground from "../components/VideoBackground";
import {
  LayoutDashboard,
  Award,
  Book,
  Settings,
  CircleUser,
  Users,
  Bell,
} from "lucide-react";

export default function DojoLayout() {
  const { user } = useAuth();
  const { profile } = useDojoData();
  const firstName = user?.user_metadata?.full_name?.split(" ")[0];

  const sanitizeAvatarUrl = (url) => {
    if (!url) return url;
    if (url.includes("googleusercontent.com")) {
      return url.replace(/=s\d+(-c)?/, "=s400-c");
    }
    return url;
  };

  const mainNavItems = [
    { to: "/dojo/profile", icon: CircleUser, label: "Perfil" },
    { to: "/dojo/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/dojo/achievements", icon: Award, label: "Logros" },
    { to: "/dojo/community", icon: Users, label: "Comunidad" },
    { to: "/dojo/notifications", icon: Bell, label: "Notificaciones" },
    { to: "/dojo/library", icon: Book, label: "Biblioteca" },
  ];

  const bottomNavItems = [
    { to: "/dojo/settings", icon: Settings, label: "Ajustes" },
  ];

  const allNavItems = [...mainNavItems, ...bottomNavItems];

  return (
    <div className="min-h-screen text-white selection:bg-amber-300 selection:text-black">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar de Navegación Lateral (Desktop) - SIN TOCAR */}
        <aside className="sticky top-20 h-[calc(100vh-5rem)] w-20 bg-zinc-950/40 backdrop-blur-md border-r border-white/5 flex flex-col items-center py-7 z-40 hidden md:flex shrink-0 overflow-hidden">
          <div className="mb-8 shrink-0">
            <div className="w-12 h-12 bg-amber-300 text-black flex items-center justify-center rounded-2xl font-serif text-2xl font-bold shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105 transition-transform duration-300">
              L
            </div>
          </div>

          <nav className="flex-1 w-full flex flex-col items-center gap-6 py-4 overflow-y-auto no-scrollbar scroll-smooth">
            {mainNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `w-6 h-6 cursor-pointer transition-all hover:scale-110 flex items-center justify-center ${
                    isActive
                      ? "text-amber-300"
                      : "text-gray-600 hover:text-amber-300"
                  }`
                }
                title={item.label}
              >
                <item.icon className="w-6 h-6" />
              </NavLink>
            ))}
          </nav>

          <nav className="mt-auto pt-6 border-t border-white/5 w-full flex flex-col items-center gap-6 shrink-0">
            {bottomNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `w-6 h-6 cursor-pointer transition-all hover:scale-110 flex items-center justify-center ${
                    isActive
                      ? "text-amber-300"
                      : "text-gray-600 hover:text-amber-300"
                  }`
                }
                title={item.label}
              >
                <item.icon className="w-6 h-6" />
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Bottom Navigation (Mobile) - SIN TOCAR */}
        <nav className="fixed bottom-0 left-0 right-0 bg-zinc-950/60 backdrop-blur-lg border-t border-white/5 z-50 md:hidden">
          <div className="flex justify-around items-center py-3 px-2">
            {allNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                    isActive
                      ? "text-amber-300 bg-amber-300/10"
                      : "text-gray-600"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[9px] font-bold uppercase tracking-wider">
                  {item.label}
                </span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Contenido Principal */}
        <main className="flex-1 relative pb-20 md:pb-0 overflow-x-hidden">
          <VideoBackground
            src="/videos/fallen-knight.mp4"
            overlayOpacity={0.5}
          />

          {/* AJUSTE QUIRÚRGICO: Reducción de paddings verticales y space-y del contenedor */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-6 lg:py-10 space-y-6 md:space-y-8 lg:space-y-12">
            {/* Header Compartido - Ajustado para reducir altura */}
            <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-10">
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.8)]"></span>
                  <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">
                    Protocolo Mente & Carácter
                  </span>
                </div>
                {/* Reducción de escala de fuente para ganar espacio vertical */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif tracking-tighter leading-none">
                  Forja tu camino, <br className="hidden sm:block" />
                  <span className="italic text-amber-300/90 underline underline-offset-[4px] decoration-white/10">
                    {firstName}
                  </span>
                </h1>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
                {/* Perfil Card - Versión más compacta */}
                <div className="flex items-center gap-3 md:gap-4 bg-zinc-900/40 p-3 md:p-4 pr-6 border border-white/5 rounded-2xl backdrop-blur-sm group hover:border-amber-300/20 transition-all">
                  <div className="relative">
                    <img
                      src={sanitizeAvatarUrl(
                        profile?.custom_avatar_url ||
                          profile?.avatar_url ||
                          user?.user_metadata?.avatar_url,
                      )}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-white/10 object-cover"
                      alt="Avatar"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-0.5">
                      Rango Actual
                    </p>
                    <p className="text-sm md:text-base font-serif text-white group-hover:text-amber-300 transition-colors">
                      {dojoService.getRankTitle(profile?.level || 1)}{" "}
                      <span className="text-amber-300/50 text-[10px] ml-1">
                        NVL {profile?.level || 1}
                      </span>
                    </p>
                  </div>
                </div>

                {/* XP Progress Bar - Padding reducido */}
                <div className="bg-zinc-900/40 p-3 md:p-4 border border-white/5 rounded-2xl backdrop-blur-sm">
                  <XPProgressBar profile={profile} variant="compact" />
                </div>
              </div>
            </header>

            {/* Outlet para las páginas hijas */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
