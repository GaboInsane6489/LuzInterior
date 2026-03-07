import React from "react";
import { ArrowUpRight, Sparkles, User, ExternalLink } from "lucide-react";

export default function LooksMaxxing() {
  return (
    // Reducción de padding vertical drástica de py-48 a py-12
    <section className="relative w-full bg-white text-black py-12 lg:py-16 overflow-hidden border-t border-black/5">
      {/* MARCA DE AGUA - Reducida para no distraer */}
      <div className="absolute top-10 -left-24 pointer-events-none select-none hidden 2xl:block">
        <span className="text-[12rem] font-serif font-black text-black/[0.02] leading-none uppercase tracking-tighter">
          Dojo Souls
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* NARRATIVA - Espaciado compactado */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-10 bg-amber-500" />
                <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-amber-600">
                  La Senda del Caballero
                </span>
              </div>

              <h2 className="text-5xl md:text-6xl font-serif tracking-tighter leading-[0.9]">
                Los enemigos <br />
                <span className="italic font-light text-neutral-400">
                  son el espejo.
                </span>
              </h2>
            </div>

            <div className="space-y-6 max-w-xl">
              <p className="text-lg md:text-xl font-light leading-snug">
                En el caos de Drangleic, la estética no es vanidad, es{" "}
                <span className="font-medium italic border-b-2 border-amber-500/30">
                  armadura emocional.
                </span>
              </p>

              <p className="text-sm text-neutral-600 leading-relaxed">
                Estudiamos los movimientos de maestros como{" "}
                <span className="text-black font-bold">MkIceAndFire</span>. No
                solo es gameplay; es el estudio de la paciencia, el timing y la
                resiliencia ante el fracaso constante.
              </p>

              <div className="flex items-center gap-4">
                <h3 className="text-xl font-serif border-l-4 border-amber-500 pl-4">
                  Cátedra de Supervivencia
                </h3>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.youtube.com/@MKIceAndFire"
                  className="hover:text-amber-500 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* PROTOCOLOS - Grid más apretado */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="group flex items-center gap-4 border border-black/5 p-4 hover:border-amber-500/40 transition-all">
                <div className="p-2 bg-black text-white rounded-sm">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest">
                    El Despertar
                  </p>
                  <p className="text-neutral-500 text-[10px]">
                    Fortaleza en la locura.
                  </p>
                </div>
              </div>

              <div className="group flex items-center gap-4 border border-black/5 p-4 hover:border-amber-500/40 transition-all">
                <div className="p-2 bg-amber-500 text-black rounded-sm">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest">
                    La Victoria
                  </p>
                  <p className="text-neutral-500 text-[10px]">
                    Morir es aprender.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* VISUAL - Eliminado el space-y-28 excesivo */}
          <div className="space-y-8">
            {/* IMAGEN EDITORIAL - Escala reducida */}
            <div className="relative group max-w-md ml-auto">
              <div className="absolute -inset-3 border border-black/10 -z-10 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />
              <div className="relative overflow-hidden">
                <img
                  src="/images/DarkSoulsII2.webp"
                  alt="Dominio"
                  className="w-full h-auto grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000"
                />
              </div>
            </div>

            {/* LA BÓVEDA - Reducción de padding interno */}
            <div className="bg-black p-6 md:p-8 space-y-6 shadow-2xl">
              <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-white text-2xl font-serif">La Bóveda</h3>
                  <p className="text-amber-500/70 text-[8px] uppercase tracking-[0.4em] mt-1">
                    Archivos del Latente
                  </p>
                </div>
                <button className="text-[9px] text-white/50 uppercase tracking-widest hover:text-amber-400 transition-colors">
                  Ver Guía
                </button>
              </div>

              <div className="relative aspect-video overflow-hidden rounded-sm ring-1 ring-white/10">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/jsYsBADkqUY"
                  title="Tutorial"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
