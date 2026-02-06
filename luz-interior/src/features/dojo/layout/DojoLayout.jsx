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
        {/* Sidebar de Navegación Lateral (Desktop) */}
        <aside className="sticky top-20 h-[calc(100vh-5rem)] w-20 bg-zinc-950/40 backdrop-blur-md border-r border-white/5 flex flex-col items-center py-7 z-40 hidden md:flex shrink-0 overflow-hidden">
          {/* Logo container */}
          <div className="mb-8 shrink-0">
            <div className="w-12 h-12 bg-amber-300 text-black flex items-center justify-center rounded-2xl font-serif text-2xl font-bold shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105 transition-transform duration-300">
              L
            </div>
          </div>

          {/* Main Navigation - Scrollable area */}
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

          {/* Bottom Navigation - Grouped Settings */}
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

        {/* Bottom Navigation (Mobile) */}
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
          {/* 
            IMPLEMENTACIÓN DE VIDEO BG:
            Nota: fallen-knight.mp4 pesa 7MB.
          */}
          <VideoBackground
            src="/videos/fallen-knight.mp4"
            overlayOpacity={0.5}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12 lg:py-20 space-y-12 md:space-y-16 lg:space-y-24">
            {/* Header Compartido */}
            <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 lg:gap-10">
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.8)]"></span>
                  <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-gray-500 font-bold">
                    Protocolo Mente & Carácter
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif tracking-tighter leading-none">
                  Forja tu camino, <br />
                  <span className="italic text-amber-300/90 underline underline-offset-[8px] md:underline-offset-[12px] decoration-white/10">
                    {firstName}
                  </span>
                </h1>
              </div>

              <div className="flex flex-col gap-4 md:gap-6 w-full lg:w-auto">
                {/* Perfil Card */}
                <div className="flex items-center gap-4 md:gap-6 bg-zinc-900/40 p-4 md:p-5 pr-6 md:pr-8 border border-white/5 rounded-[1.5rem] md:rounded-[2rem] backdrop-blur-sm group hover:border-amber-300/20 transition-all">
                  <div className="relative">
                    <img
                      src={
                        profile?.custom_avatar_url ||
                        profile?.avatar_url ||
                        user?.user_metadata?.avatar_url
                      }
                      className="w-12 h-12 md:w-16 md:h-16 rounded-[1rem] md:rounded-[1.25rem] border border-white/10"
                      alt="Avatar"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-green-500 border-2 border-black rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-1">
                      Rango Actual
                    </p>
                    <p className="text-base md:text-lg font-serif text-white group-hover:text-amber-300 transition-colors">
                      {dojoService.getRankTitle(profile?.level || 1)}{" "}
                      <span className="text-amber-300/50 text-xs ml-2">
                        Nivel {profile?.level || 1}
                      </span>
                    </p>
                  </div>
                </div>

                {/* XP Progress Bar */}
                <div className="bg-zinc-900/40 p-4 md:p-5 border border-white/5 rounded-[1.5rem] md:rounded-[2rem] backdrop-blur-sm">
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
