import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";

/**
 * DojoHero - El Umbral a la Maestría Personal
 * Un diseño editorial de alto impacto que utiliza capas, tipografía expresiva
 * y micro-animaciones para elevar la percepción de marca.
 */
export default function DojoHero() {
  const { user, login } = useAuth();

  return (
    <section className="relative w-full bg-black py-32 lg:py-56 overflow-hidden border-t border-white/5">
      {/* CAPA 1: ELEMENTOS DE FONDO (ATMÓSFERA) */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* CAPA 2: NARRATIVA (COLUMNA IZQUIERDA) */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4 animate-fade-in">
                <div className="h-[1px] w-12 bg-amber-400"></div>
                <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-amber-300">
                  Acceso Restringido
                </span>
              </div>

              <h2 className="text-7xl md:text-9xl font-serif text-white tracking-tighter leading-[0.85]">
                Tu Legado <br />
                <span className="italic font-light text-amber-200/40 relative">
                  Empieza Aquí
                  <span className="absolute -bottom-4 left-0 w-full h-[1px] bg-gradient-to-r from-amber-300/50 to-transparent"></span>
                </span>
              </h2>
            </div>

            <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-xl">
              El Dojo no es una plataforma de aprendizaje. Es una{" "}
              <span className="text-white font-medium italic">
                arquitectura de transmutación
              </span>{" "}
              para hombres que han decidido dejar de ser espectadores de su
              propia ruina.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center pt-4">
              {user ? (
                <Link
                  to="/dojo"
                  className="group relative px-12 py-6 bg-white text-black text-xs font-bold uppercase tracking-[0.3em] overflow-hidden transition-all duration-700 hover:bg-amber-300"
                >
                  <span className="relative z-10">Entrar al Santuario</span>
                  <div className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 opacity-5"></div>
                </Link>
              ) : (
                <button
                  onClick={login}
                  className="group flex items-center gap-6 bg-amber-400 text-black px-12 py-6 text-xs font-bold uppercase tracking-[0.3em] hover:bg-white transition-all duration-700 shadow-[0_0_40px_rgba(245,158,11,0.15)]"
                >
                  Iniciar Transformación
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-3 transition-transform" />
                </button>
              )}

              <div className="flex -space-x-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-black bg-zinc-900 flex items-center justify-center text-[10px] text-gray-500 font-bold"
                  >
                    {i === 3 ? "+99" : ""}
                  </div>
                ))}
                <span className="pl-8 text-[10px] uppercase tracking-widest text-gray-500 font-bold self-center">
                  Hombres en guardia
                </span>
              </div>
            </div>
          </div>

          {/* CAPA 3: VISUAL (COLUMNA DERECHA) */}
          <div className="lg:col-span-5 relative">
            <div className="relative group cursor-crosshair">
              {/* Marco Flotante (The "Senior" Detail) */}
              <div className="absolute -inset-6 border border-amber-300/10 -z-10 translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-1000 ease-out"></div>

              <div className="relative overflow-hidden rounded-sm border border-white/5">
                <img
                  src="/images/LooksMaxxing.webp"
                  alt="Estética de alto rendimiento"
                  className="w-full h-auto transition-all duration-[2000ms] group-hover:scale-110"
                />

                {/* Overlay de Datos dinámicos al hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-10 space-y-6">
                  <div className="space-y-2">
                    <p className="text-amber-300 text-[10px] uppercase tracking-widest font-bold">
                      Estado del Sistema
                    </p>
                    <p className="text-white text-sm font-serif italic">
                      "La forma física es el reflejo de una mente ordenada."
                    </p>
                  </div>
                  <div className="h-[1px] w-full bg-white"></div>
                  <div className="flex gap-8">
                    <div className="text-center">
                      <p className="text-white text-lg font-bold">21</p>
                      <p className="text-white text-[8px] uppercase tracking-tighter">
                        Días de Racha
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-white text-lg font-bold">A+</p>
                      <p className="text-white text-[8px] uppercase tracking-tighter">
                        Disciplina
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tag Flotante */}
              <div className="absolute -bottom-8 -right-8 bg-zinc-900 border border-white/10 p-6 shadow-2xl animate-bounce-slow">
                <Zap className="w-6 h-6 text-amber-400 mb-2" />
                <p className="text-[10px] text-white font-bold uppercase tracking-widest">
                  Poder Real
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER DE SECCIÓN: VALORES */}
        <div className="mt-32 pt-16 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
          {[
            {
              icon: ShieldCheck,
              label: "Privacidad",
              desc: "Anonimato total por defecto.",
            },
            {
              icon: Sparkles,
              label: "Curaduría",
              desc: "Sin contenido de relleno.",
            },
            {
              icon: Zap,
              label: "Impacto",
              desc: "Resultados en el mundo real.",
            },
            {
              icon: ArrowRight,
              label: "Comunidad",
              desc: "Círculo de hombres de valor.",
            },
          ].map((item, i) => (
            <div key={i} className="group cursor-default">
              <item.icon className="w-5 h-5 text-gray-600 mb-4 group-hover:text-amber-300 transition-colors" />
              <h5 className="text-white text-[10px] uppercase tracking-widest font-bold mb-1">
                {item.label}
              </h5>
              <p className="text-gray-500 text-[10px] font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
