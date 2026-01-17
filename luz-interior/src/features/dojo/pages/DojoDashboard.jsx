import React from "react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../auth/hooks/useAuth";
import {
  LayoutDashboard,
  Award,
  Book,
  Settings,
  ArrowUpRight,
  Lock,
} from "lucide-react";

export default function DojoDashboard() {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(" ")[0];
  return (
    <div className="min-h-screen bg-black text-white selection:bg-amber-300 selection:text-black">
      <Helmet>
        <title>Dashboard | El Dojo</title>
      </Helmet>

      {/* Sidebar de Navegación Lateral (Estilo Moderno) */}
      <aside className="fixed left-0 top-0 h-full w-20 bg-zinc-950 border-r border-white/5 flex flex-col items-center py-10 gap-10 z-40">
        <div className="w-10 h-10 bg-amber-300 text-black flex items-center justify-center rounded-xl font-serif text-xl font-bold">
          L
        </div>
        <nav className="flex flex-col gap-8 text-gray-500">
          <LayoutDashboard className="w-5 h-5 cursor-pointer hover:text-amber-300 transition-colors" />
          <Award className="w-5 h-5 cursor-pointer hover:text-amber-300 transition-colors" />
          <Book className="w-5 h-5 cursor-pointer hover:text-amber-300 transition-colors" />
          <Settings className="w-5 h-5 cursor-pointer hover:text-amber-300 transition-colors" />
        </nav>
      </aside>
      <main className="pl-20">
        <div className="max-w-7xl mx-auto px-8 py-16 lg:px-16 space-y-16">
          {/* Header con Personalidad */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500">
                  Mente & Carácter
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-serif">
                Forja tu camino, <br />
                <span className="italic text-amber-300/90">{firstName}</span>
              </h1>
            </div>

            <div className="flex items-center gap-6 bg-zinc-900/50 p-4 border border-white/5 rounded-2xl">
              <img
                src={user?.user_metadata?.avatar_url}
                className="w-12 h-12 rounded-xl"
              />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500">
                  Rango Actual
                </p>
                <p className="text-sm font-bold text-amber-300">
                  Neófito Nivel 1
                </p>
              </div>
            </div>
          </header>
          {/* Cards Principales: Bento Grid Senior */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tarjeta de Progreso (Grande) */}
            <div className="lg:col-span-2 relative group overflow-hidden bg-gradient-to-br from-zinc-900 to-black p-12 border border-white/5 rounded-[2.5rem]">
              <div className="absolute top-0 right-0 p-8">
                <ArrowUpRight className="w-6 h-6 text-amber-300/30 group-hover:text-amber-300 transition-all" />
              </div>

              <div className="relative z-10 space-y-8">
                <h3 className="text-2xl font-serif">Protocolo Diario</h3>
                <div className="space-y-4">
                  {[
                    { t: "Meditación Matutina", p: 100 },
                    { t: "Cero Redes Sociales", p: 60 },
                    { t: "Entrenamiento de Fuerza", p: 0 },
                  ].map((task, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                        <span
                          className={
                            task.p === 100 ? "text-amber-300" : "text-gray-500"
                          }
                        >
                          {task.t}
                        </span>
                        <span className="text-gray-600">{task.p}%</span>
                      </div>
                      <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-300 transition-all duration-1000"
                          style={{ width: `${task.p}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Tarjeta Bloqueada (Misterio/Seniority) */}
            <div className="bg-zinc-950 p-12 border border-white/5 rounded-[2.5rem] flex flex-col justify-between items-center text-center group">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:border-amber-300/50 transition-all duration-700">
                <Lock className="w-8 h-8 text-gray-700 group-hover:text-amber-300 group-hover:animate-bounce" />
              </div>
              <div className="space-y-2">
                <h4 className="text-sm uppercase tracking-[0.3em] font-bold">
                  Módulo Oculto
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed italic">
                  Desbloquea completando tu primera racha de 7 días.
                </p>
              </div>
            </div>
          </div>
          {/* Banner de Acción Rápida */}
          <div className="w-full bg-amber-300 p-8 rounded-[2.5rem] flex justify-between items-center group cursor-pointer hover:bg-white transition-colors duration-500">
            <h4 className="text-black font-serif text-2xl lg:text-3xl">
              Lanzar sesión de enfoque profundo
            </h4>
            <div className="bg-black text-white p-4 rounded-full group-hover:rotate-45 transition-transform duration-500">
              <ArrowUpRight />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
