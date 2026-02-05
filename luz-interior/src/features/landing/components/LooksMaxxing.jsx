import React from "react";
import { ArrowUpRight, Sparkles, User, ExternalLink } from "lucide-react";

/**
 * LooksMaxxing — Optimización Estética
 * Adaptado al lenguaje Dojo:
 * jerarquía editorial, ritual visual y micro‑interacciones
 * manteniendo fondo blanco como excepción consciente.
 */
export default function LooksMaxxing() {
  return (
    <section className="relative w-full bg-white text-black py-28 lg:py-48 overflow-hidden border-t border-black/5">
      {/* MARCA DE AGUA EDITORIAL */}
      <div className="absolute top-10 -left-24 pointer-events-none select-none hidden 2xl:block">
        <span className="text-[20rem] font-serif font-black text-black/[0.03] leading-none uppercase tracking-tighter">
          Estética
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-start">
          {/* NARRATIVA */}
          <div className="space-y-14 lg:sticky lg:top-32">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-amber-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-amber-600">
                  Sistema Estético
                </span>
              </div>

              <h2 className="text-6xl md:text-8xl font-serif tracking-tighter leading-[0.9]">
                Looks
                <br />
                <span className="italic font-light text-neutral-400">
                  Maxxing
                </span>
              </h2>
            </div>

            <div className="space-y-10 max-w-xl">
              <p className="text-xl md:text-2xl font-light leading-relaxed">
                La belleza no es vanidad.
                <br />
                Es una{" "}
                <span className="font-medium italic underline decoration-amber-500 decoration-4 underline-offset-8">
                  infraestructura de respeto
                </span>
                .
              </p>

              <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 font-bold">
                Presencia. Dominio. Coherencia visual.
              </p>

              <p className="text-neutral-700 leading-loose">
                Cada rasgo comunica jerarquía. Cada decisión estética proyecta
                orden interno. LooksMaxxing no busca aprobación: construye una
                presencia que no puede ser ignorada.
              </p>
            </div>

            {/* PROTOCOLOS */}
            <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="group flex items-center gap-5 border border-black/5 px-6 py-5 hover:border-black transition-all cursor-default">
                <div className="p-3 bg-black text-white rounded-full transition-transform group-hover:rotate-12">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest">
                    Protocolo Facial
                  </p>
                  <p className="text-neutral-500 text-xs">
                    Estructura ósea & piel
                  </p>
                </div>
              </div>

              <div className="group flex items-center gap-5 border border-black/5 px-6 py-5 hover:border-black transition-all cursor-default">
                <div className="p-3 bg-amber-400 text-black rounded-full transition-transform group-hover:rotate-12">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest">
                    Aura & Estilo
                  </p>
                  <p className="text-neutral-500 text-xs">
                    Presencia proyectada
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* VISUAL */}
          <div className="space-y-28">
            {/* IMAGEN EDITORIAL */}
            <div className="relative group">
              <div className="absolute -inset-6 border border-black/10 -z-10 translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-1000" />

              <div className="relative overflow-hidden">
                <img
                  src="/images/DesarrolloPersonal.webp"
                  alt="Dominio de la Imagen"
                  className="w-full h-auto transition-transform duration-[2000ms] group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-10">
                  <p className="text-amber-400 text-[10px] uppercase tracking-widest font-bold mb-3">
                    Estado Visual
                  </p>
                  <p className="text-white font-serif italic text-lg">
                    “El orden interno siempre se revela.”
                  </p>
                </div>
              </div>
            </div>

            {/* LA BÓVEDA */}
            <div className="bg-black px-8 py-14 md:px-14 space-y-12 shadow-[0_60px_120px_rgba(0,0,0,0.25)]">
              <div className="flex justify-between items-center border-b border-white/10 pb-8">
                <div>
                  <h3 className="text-white text-3xl font-serif">La Bóveda</h3>
                  <p className="text-neutral-500 text-[10px] uppercase tracking-[0.4em] mt-2">
                    Conocimiento reservado
                  </p>
                </div>
                <ExternalLink className="w-6 h-6 text-amber-400 hidden sm:block" />
              </div>

              <div className="relative aspect-video overflow-hidden group">
                <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
                <iframe
                  className="w-full h-full rounded-sm"
                  src="https://www.youtube-nocookie.com/embed/0Ub3KgX9LUI"
                  title="LooksMaxxing — Estética Estratégica"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="flex justify-end">
                <button className="group flex items-center gap-4 text-white text-[10px] uppercase tracking-[0.4em] font-bold border border-white/20 px-10 py-4 hover:bg-white hover:text-black transition-all">
                  Explorar Guía
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
