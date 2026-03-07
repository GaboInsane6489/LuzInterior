import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { Sparkles, ArrowRight, ShieldCheck, Zap, Trophy } from "lucide-react";

export default function DojoHero() {
  const { user, login } = useAuth();

  return (
    <section className="relative w-full bg-black py-12 lg:py-20 overflow-hidden border-t-2 border-amber-500/30">
      {/* ATMÓSFERA: Brillo más intenso para definir profundidad */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-500/[0.07] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-24">
        {/* --- BLOQUE 1: EL NEXO (HERO) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-12 bg-amber-400"></div>
              <span className="text-xs font-black uppercase tracking-[0.4em] text-amber-400">
                Acceso Restringido
              </span>
            </div>

            <h2 className="text-7xl md:text-9xl font-serif text-white tracking-tighter leading-[0.85]">
              Tu Legado <br />
              <span className="italic font-light text-amber-400">
                Empieza Aquí
              </span>
            </h2>

            <p className="text-zinc-100 text-lg md:text-xl font-light leading-relaxed max-w-xl">
              No es una plataforma. Es una{" "}
              <span className="text-amber-400 font-bold italic underline underline-offset-4">
                arquitectura de transmutación
              </span>{" "}
              para quienes deciden dejar de ser espectadores.
            </p>

            <div className="flex flex-wrap gap-6 items-center pt-4">
              <button
                onClick={user ? null : login}
                className="group relative px-10 py-5 bg-amber-400 text-black text-xs font-black uppercase tracking-[0.2em] transition-all hover:bg-white hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(251,191,36,0.2)]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {user ? "Entrar al Santuario" : "Iniciar Transformación"}
                  <ArrowRight className="w-4 h-4 stroke-[3px] group-hover:translate-x-2 transition-transform" />
                </span>
              </button>

              <div className="flex -space-x-3 items-center">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-amber-500 bg-zinc-900 flex items-center justify-center text-xs text-white font-black shadow-lg"
                  >
                    {i === 3 ? "+99" : ""}
                  </div>
                ))}
                <span className="pl-6 text-[10px] uppercase tracking-[0.3em] text-zinc-300 font-black">
                  Guerreros en guardia
                </span>
              </div>
            </div>
          </div>

          {/* IMAGEN CON BORDE DEFINIDO */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-2 border-2 border-amber-400/50 -z-10 group-hover:inset-0 transition-all duration-500" />
            <div className="relative overflow-hidden rounded-sm border-2 border-zinc-700 aspect-[4/3] bg-zinc-900">
              <img
                src="/images/DarkSoulsII5.webp"
                alt="Status"
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
              />
              <div className="absolute bottom-6 right-6 bg-black border-2 border-amber-400 p-5 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                <p className="text-amber-400 text-xs font-black uppercase tracking-widest">
                  Disciplina A+
                </p>
                <div className="w-full h-[2px] bg-amber-400 my-2" />
                <p className="text-white text-sm italic font-bold">
                  "Mente en orden."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- BLOQUE 2: CARDS DE ALTO CONTRASTE --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card: El Dojo */}
          <div className="group relative bg-zinc-900 border-2 border-zinc-700 p-10 overflow-hidden hover:border-amber-400 transition-all shadow-2xl">
            <div className="relative z-10 space-y-6">
              <span className="text-xs text-amber-400 font-black uppercase tracking-[0.3em]">
                Entorno de Forja
              </span>
              <h3 className="text-4xl font-serif text-white italic">
                Disciplina real.
              </h3>
              <p className="text-base text-zinc-100 leading-relaxed font-medium">
                Acciones que suman experiencia real, no motivación pasajera.
              </p>
              <Link
                to="/dojo"
                className="inline-flex items-center gap-3 text-xs text-amber-400 hover:text-white transition-colors uppercase font-black tracking-widest border-b-2 border-amber-400 pb-1"
              >
                Explorar Senda <ArrowRight className="w-4 h-4 stroke-[3px]" />
              </Link>
            </div>
            <img
              src="/images/lone_samurai.webp"
              className="absolute top-0 right-0 w-1/2 h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity"
              alt="Dojo"
            />
          </div>

          {/* Card: Niveles */}
          <div className="group relative bg-zinc-900 border-2 border-zinc-700 p-10 overflow-hidden hover:border-amber-400 transition-all shadow-2xl">
            <div className="relative z-10 space-y-6">
              <span className="text-xs text-amber-400 font-black uppercase tracking-[0.3em]">
                Progreso Medible
              </span>
              <h3 className="text-4xl font-serif text-white italic">
                Sistema de Rangos.
              </h3>
              <p className="text-base text-zinc-100 leading-relaxed font-medium">
                Cada hábito completado desbloquea trofeos y estatus visible.
              </p>
              <Link
                to="/dojo/achievements"
                className="inline-flex items-center gap-3 text-xs text-amber-400 hover:text-white transition-colors uppercase font-black tracking-widest border-b-2 border-amber-400 pb-1"
              >
                Ver Logros <Trophy className="w-4 h-4 stroke-[2px]" />
              </Link>
            </div>
            <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:opacity-30 transition-all group-hover:-rotate-12">
              <Zap className="w-48 h-48 text-amber-400" />
            </div>
          </div>
        </div>

        {/* --- FOOTER: VALORES (Legibilidad Máxima) --- */}
        <div className="pt-12 border-t-2 border-zinc-800 grid grid-cols-2 lg:grid-cols-4 gap-8 pb-10">
          {[
            {
              icon: ShieldCheck,
              label: "Privacidad",
              desc: "Anonimato total.",
            },
            { icon: Sparkles, label: "Curaduría", desc: "Contenido de valor." },
            { icon: Zap, label: "Impacto", desc: "Resultados reales." },
            { icon: Trophy, label: "Honor", desc: "Círculo de valor." },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-center group">
              <div className="p-2 border-2 border-amber-500/30 group-hover:border-amber-400 transition-colors">
                <item.icon className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h5 className="text-white text-xs font-black uppercase tracking-widest">
                  {item.label}
                </h5>
                <p className="text-xs text-zinc-400 font-bold">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
