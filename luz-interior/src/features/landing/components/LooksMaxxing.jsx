import React from "react";
import { ArrowUpRight, Sparkles, User, ExternalLink } from "lucide-react";

/**
 * LooksMaxxing - Optimización Estética y Presencia Proyectada
 * Un diseño de alto contraste con jerarquía tipográfica extrema y
 * adaptabilidad total para pantallas grandes.
 */
export default function LooksMaxxing() {
  return (
    <section className="relative w-full bg-white text-black py-32 lg:py-56 overflow-hidden">
      {/* Elemento Decorativo: Texto de Fondo Gigante (Marca de Agua Modernista) */}
      <div className="absolute top-20 -left-20 pointer-events-none select-none hidden 2xl:block">
        <span className="text-[20rem] font-serif font-black text-black/[0.02] leading-none uppercase tracking-tighter">
          Estética
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* COLUMNA 1: NARRATIVA Y CONCEPTO (IZQUIERDA) */}
          <div className="space-y-12 lg:sticky lg:top-32">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-[2px] w-12 bg-black"></div>
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-black">
                  Optimización Física
                </span>
              </div>
              <h2 className="text-6xl md:text-8xl font-serif leading-[0.9] tracking-tighter">
                Looks <br />
                <span className="italic font-light text-neutral-400">
                  Maxxing
                </span>
              </h2>
            </div>

            <div className="prose prose-lg prose-neutral font-light leading-relaxed text-neutral-800 space-y-8">
              <p className="text-xl md:text-2xl leading-relaxed">
                La belleza no es un lujo superficial; es la{" "}
                <span className="font-bold underline decoration-amber-500 decoration-4 underline-offset-8">
                  arquitectura de la autoridad
                </span>
                .
              </p>
              <p className="text-sm md:text-base text-neutral-500 uppercase tracking-widest font-medium">
                Optimización de imagen estratégica.
              </p>
              <p className="leading-loose">
                En un mundo que juzga en milisegundos, tu presencia física es tu
                primera línea de defensa y tu mejor carta de negociación. No se
                trata de vanidad, se trata de respeto propio y dominio del
                entorno.
              </p>
            </div>

            <div className="pt-8 flex flex-wrap gap-6">
              <div className="group cursor-pointer flex items-center gap-4 border-b border-black/10 pb-4 transition-all hover:border-black min-w-[200px]">
                <div className="p-3 bg-black text-white rounded-full transition-transform group-hover:rotate-12">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest">
                    Protocolo Facial
                  </p>
                  <p className="text-neutral-500 text-xs">Hueso & Piel</p>
                </div>
              </div>
              <div className="group cursor-pointer flex items-center gap-4 border-b border-black/10 pb-4 transition-all hover:border-black min-w-[200px]">
                <div className="p-3 bg-amber-400 text-black rounded-full transition-transform group-hover:rotate-12">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest">
                    Aura & Estilo
                  </p>
                  <p className="text-neutral-500 text-xs">
                    Presencia dominante
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA 2: VISUAL Y MULTIMEDIA (DERECHA) */}
          <div className="space-y-24 w-full overflow-hidden">
            {/* Imagen Principal con Efecto Editorial */}
            <div className="relative group overflow-hidden">
              <div className="absolute inset-0 border-[1px] border-black/10 z-20 pointer-events-none transition-all duration-700 group-hover:inset-4 group-hover:border-black/30"></div>
              <img
                src="/images/DesarrolloPersonal.webp"
                alt="Dominio de la Imagen"
                className="w-full h-auto object-cover transition-all duration-1000 scale-105 group-hover:scale-100"
              />
              <div className="absolute bottom-8 right-8 bg-black text-white p-6 shadow-2xl translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 max-w-xs">
                <p className="text-[8px] tracking-[0.4em] uppercase font-bold text-amber-400 mb-2">
                  Concepto Visual 01
                </p>
                <p className="text-lg font-serif italic">
                  "El orden interno se proyecta en lo externo."
                </p>
              </div>
            </div>

            {/* Sección de Video "The Vault" */}
            <div className="bg-black p-6 md:p-12 lg:p-16 space-y-12 shadow-[0_50px_100px_rgba(0,0,0,0.2)]">
              <div className="flex justify-between items-center border-b border-white/10 pb-8 gap-4">
                <div className="space-y-2">
                  <h3 className="text-white text-3xl font-serif">La Bóveda </h3>
                  <p className="text-neutral-500 text-xs uppercase tracking-[0.3em]">
                    Masterclass de Estrategia Estética
                  </p>
                </div>
                <ExternalLink className="w-6 h-6 text-amber-400 shrink-0 hidden sm:block" />
              </div>

              <div className="relative group aspect-video overflow-hidden">
                <div className="absolute inset-0 bg-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                <iframe
                  className="w-full h-full border-0 relative z-0"
                  src="https://www.youtube-nocookie.com/embed/0Ub3KgX9LUI"
                  title="LooksMaxxing - La Belleza como Estrategia"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <h4 className="text-amber-400 text-[10px] font-bold uppercase tracking-widest">
                    Fuentes de Autoridad
                  </h4>
                  <p className="text-neutral-400 text-sm leading-relaxed italic">
                    "Análisis de LIRYKAL para entender la ciencia detrás de la
                    atracción."
                  </p>
                </div>
                <div className="flex items-center lg:justify-end">
                  <button className="group flex items-center gap-4 text-white text-[10px] uppercase tracking-[0.4em] font-bold border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-all w-full sm:w-auto justify-center">
                    Explorar Guía
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
