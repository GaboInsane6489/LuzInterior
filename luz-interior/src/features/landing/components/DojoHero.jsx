import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  ExternalLink,
} from "lucide-react";

/**
 * DojoHero - El Umbral a la Maestría Personal
 * Un diseño editorial de alto impacto que utiliza capas, tipografía expresiva
 * y micro-animaciones para elevar la percepción de marca.
 */
export default function DojoHero() {
  const { user, login } = useAuth();

  return (
    <section className="relative w-full bg-black py-16 lg:py-24 overflow-hidden border-t border-white/5">
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
        <div className="mt-24 pt-4 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
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
              <item.icon className="w-7 h-7 text-white mb-4 group-hover:text-amber-400 transition-colors duration-300" />
              <h5 className="text-white text-[10px] uppercase tracking-widest font-bold mb-1">
                {item.label}
              </h5>
              <p className="text-gray-500 text-[10px] font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* PRESENTACIÓN DEL DOJO */}
        <section className="relative py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Imagen */}
            <div className="relative group">
              <img
                src="/images/lone_samurai.webp"
                alt="El Dojo"
                className="w-full h-[420px] object-cover rounded-2xl border border-white/10 shadow-2xl transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Texto */}
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-bold">
                El Dojo
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight">
                Un sistema para forjar
                <br />
                <span className="italic text-amber-300">
                  disciplina, carácter y progreso real
                </span>
              </h2>

              <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl">
                El Dojo no es motivación pasajera. Es un entorno estructurado
                donde cada acción cuenta, cada hábito suma experiencia y cada
                día te acerca a una versión más fuerte de ti mismo.
              </p>

              <Link
                to="/dojo"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-amber-500 text-black font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors transition-transform hover:scale-[1.02]"
              >
                Entrar al Dojo
              </Link>
            </div>
          </div>

          {/* SISTEMA DE NIVELES */}
          <section className="relative py-16 md:py-20 bg-zinc-900/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Texto */}
              <div className="space-y-6">
                <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-bold">
                  Progreso Medible
                </span>

                <h2 className="text-3xl md:text-4xl font-serif">
                  Sistema de niveles
                  <br />
                  <span className="italic text-amber-300">y trofeos</span>
                </h2>

                <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl">
                  Cada hábito completado, cada reto superado y cada objetivo
                  cumplido te otorgan experiencia real.
                  <br />
                  <br />
                  Subes de nivel, desbloqueas rangos y construyes un historial
                  visible de disciplina y constancia.
                </p>

                <Link
                  to="/dojo/achievements"
                  className="inline-flex items-center gap-3 text-amber-400 font-bold uppercase tracking-wider hover:text-amber-300 transition-colors"
                >
                  Explorar niveles y logros
                  <ExternalLink className="w-5 h-5" />
                </Link>
              </div>

              {/* Video */}
              <div className="relative group">
                <video
                  src="/videos/Chinese-Traditional-House-Lanterns-Moewalls-Com.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-[380px] object-cover rounded-2xl border border-white/10 shadow-2xl transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>
          </section>
        </section>
      </div>
    </section>
  );
}
