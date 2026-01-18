import React from "react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../auth/hooks/useAuth";
import { useDojoData } from "../hooks/useDojoData";
import {
  LayoutDashboard,
  Award,
  Book,
  Settings,
  ArrowUpRight,
  Lock,
  Loader2,
} from "lucide-react";

export default function DojoDashboard() {
  const { user } = useAuth();
  const { profile, challenges, loading } = useDojoData();
  const firstName = user?.user_metadata?.full_name?.split(" ")[0];

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-amber-300 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-amber-300 selection:text-black">
      <Helmet>
        <title>Panel de Control | El Dojo</title>
      </Helmet>

      <div className="flex">
        {/* Sidebar de Navegación Lateral (Estilo Moderno) */}
        <aside className="sticky top-20 h-[calc(100vh-5rem)] w-20 bg-zinc-950 border-r border-white/5 flex flex-col items-center py-10 gap-10 z-40 hidden md:flex shrink-0">
          <div className="w-12 h-12 bg-amber-300 text-black flex items-center justify-center rounded-2xl font-serif text-2xl font-bold shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            L
          </div>
          <nav className="flex flex-col gap-10 text-gray-600 mt-10">
            <LayoutDashboard className="w-6 h-6 cursor-pointer hover:text-amber-300 transition-all hover:scale-110" />
            <Award className="w-6 h-6 cursor-pointer hover:text-amber-300 transition-all hover:scale-110" />
            <Book className="w-6 h-6 cursor-pointer hover:text-amber-300 transition-all hover:scale-110" />
            <Settings className="w-6 h-6 cursor-pointer hover:text-amber-300 transition-all hover:scale-110" />
          </nav>
        </aside>

        <main className="flex-1 bg-[url('/images/lionelMessiInspiracion.webp')] bg-cover bg-center bg-no-repeat">
          <div className="max-w-7xl mx-auto px-8 py-20 lg:px-20 space-y-24">
            {/* Header con Personalidad */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.8)]"></span>
                  <span className="text-[10px] uppercase tracking-[0.5em] text-gray-500 font-bold">
                    Protocolo Mente & Carácter
                  </span>
                </div>
                <h1 className="text-6xl md:text-8xl font-serif tracking-tighter leading-none">
                  Forja tu camino, <br />
                  <span className="italic text-amber-300/90 underline underline-offset-[12px] decoration-white/10">
                    {firstName}
                  </span>
                </h1>
              </div>

              <div className="flex items-center gap-6 bg-zinc-900/40 p-5 pr-8 border border-white/5 rounded-[2rem] backdrop-blur-sm group hover:border-amber-300/20 transition-all">
                <div className="relative">
                  <img
                    src={user?.user_metadata?.avatar_url}
                    className="w-16 h-16 rounded-[1.25rem] border border-white/10"
                    alt="Avatar"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full"></div>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-1">
                    Rango Actual
                  </p>
                  <p className="text-lg font-serif text-white group-hover:text-amber-300 transition-colors">
                    Neófito{" "}
                    <span className="text-amber-300/50 text-xs ml-2">
                      Nivel 1
                    </span>
                  </p>
                </div>
              </div>
            </header>

            {/* Cards Principales: Bento Grid Senior */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Tarjeta de Progreso (Grande) */}
              <div className="lg:col-span-2 relative group overflow-hidden bg-zinc-950 p-12 lg:p-16 border border-white/5 rounded-[3rem] transition-all duration-700 hover:shadow-[0_0_50px_rgba(255,255,255,0.02)]">
                <div className="absolute top-0 right-0 p-10">
                  <ArrowUpRight className="w-8 h-8 text-white/10 group-hover:text-amber-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
                </div>

                <div className="relative z-10 space-y-12">
                  <div className="space-y-2">
                    <h3 className="text-3xl font-serif">Protocolo Diario</h3>
                    <p className="text-gray-500 text-sm">
                      Tus métricas de hoy procesadas en tiempo real.
                    </p>
                  </div>

                  <div className="space-y-10">
                    {challenges.map((challenge) => (
                      <div key={challenge.id} className="space-y-4">
                        <div className="flex justify-between items-end">
                          <div className="space-y-1">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                              {challenge.title}
                            </span>
                            <p className="text-[10px] text-amber-300/60 font-medium tracking-widest uppercase">
                              Recompensa: +{challenge.xp_reward} XP
                            </p>
                          </div>
                          <span className="text-xl font-serif text-white/20">
                            0%
                          </span>
                        </div>
                        <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-white/10 transition-all duration-[1.5s] ease-out shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                            style={{ width: `0%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                    {challenges.length === 0 && (
                      <p className="text-gray-500 italic text-sm">
                        No hay retos activos en este momento.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Tarjeta Bloqueada (Misterio/Seniority) */}
              <div className="bg-zinc-950 p-12 border border-white/5 rounded-[3rem] flex flex-col justify-between items-center text-center group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-300/0 to-amber-300-[0.02] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 group-hover:border-amber-300/30 transition-all duration-700 relative z-10">
                  <Lock className="w-10 h-10 text-gray-700 group-hover:text-amber-300 group-hover:scale-110 transition-all" />
                </div>

                <div className="space-y-4 relative z-10">
                  <h4 className="text-sm uppercase tracking-[0.5em] font-bold text-white/40 group-hover:text-white transition-colors">
                    Área Restringida
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-light px-4">
                    Llevas una racha de{" "}
                    <span className="text-white font-bold">
                      {profile?.streak_current || 0} días
                    </span>
                    . Desbloquea la{" "}
                    <span className="text-amber-300 italic">Bóveda</span>{" "}
                    llegando a los 7 días.
                  </p>
                </div>

                <div className="pt-8 relative z-10">
                  <div className="h-10 w-[1px] bg-gradient-to-b from-amber-300/50 to-transparent group-hover:h-16 transition-all duration-1000"></div>
                </div>
              </div>
            </div>

            {/* Banner de Acción Rápida (Floating Tool) */}
            <div className="w-full bg-amber-300 p-10 lg:p-14 rounded-[3.5rem] flex flex-col md:flex-row justify-between items-center group cursor-pointer hover:bg-white transition-all duration-700 hover:-translate-y-2 shadow-[0_20px_60px_rgba(245,158,11,0.1)]">
              <div className="space-y-2 text-center md:text-left mb-8 md:mb-0">
                <h4 className="text-black font-serif text-3xl lg:text-5xl leading-none">
                  Profundidad Total
                </h4>
                <p className="text-black/50 text-[10px] uppercase tracking-[0.4em] font-bold">
                  Lanzar sesión de enfoque profundo (Flow)
                </p>
              </div>
              <div className="bg-black text-white w-20 h-20 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-700 shadow-2xl">
                <ArrowUpRight className="w-8 h-8" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
