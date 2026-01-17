import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { Shield, Target, Zap, ChevronRight } from "lucide-react";
export default function DojoHero() {
  const { user, login } = useAuth();
  return (
    <section className="relative py-32 bg-black overflow-hidden border-t border-white/5">
      {/* Elementos Decorativos de Fondo */}
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-amber-300/20 to-transparent"></div>
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-amber-300/10 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-amber-300/5 border border-amber-300/10 text-amber-300">
              <Shield className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                Acceso de Élite
              </span>
            </div>
            <h2 className="text-6xl md:text-7xl font-serif text-white leading-[0.9] tracking-tighter">
              El Dojo <br />
              <span className="text-amber-300 italic">Privado</span>
            </h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed max-w-md">
              Un santuario digital donde la disciplina se encuentra con la
              tecnología. Rastrea tu progreso, forja nuevos hábitos y accede a
              recursos exclusivos.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              {user ? (
                <Link
                  to="/dojo"
                  className="group flex items-center gap-4 bg-white text-black px-10 py-5 text-xs font-bold uppercase tracking-widest hover:bg-amber-300 transition-all duration-500"
                >
                  Entrar al Santuario
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </Link>
              ) : (
                <button
                  onClick={login}
                  className="group flex items-center gap-4 bg-amber-300 text-black px-10 py-5 text-xs font-bold uppercase tracking-widest hover:bg-white transition-all duration-500 shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                >
                  Iniciar Protocolo
                  <Zap className="w-4 h-4 group-hover:scale-125 transition-transform" />
                </button>
              )}
            </div>
          </div>
          {/* Grid de Características con Hover Senior */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Target, label: "Propósito", desc: "Metas claras" },
              { icon: Zap, label: "Fuerza", desc: "Hábitos diarios" },
            ].map((item, i) => (
              <div
                key={i}
                className="aspect-square bg-zinc-950 border border-white/5 p-8 flex flex-col justify-between hover:border-amber-300/40 transition-all duration-700 group cursor-default"
              >
                <item.icon className="w-8 h-8 text-gray-600 group-hover:text-amber-300 transition-colors" />
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-1">
                    {item.label}
                  </h4>
                  <p className="text-gray-500 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
