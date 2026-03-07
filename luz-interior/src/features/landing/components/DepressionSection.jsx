import React from "react";
import { Skull, Scroll, Zap, ArrowUpRight } from "lucide-react";

const SOULS_IMAGE = "/images/DarkSoulsII4.webp";

export default function SoulsWisdomSection() {
  return (
    // Reducción de padding vertical de py-40 a py-12/16
    <section className="relative w-full bg-[#fdfdfd] text-black py-12 lg:py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* VISUAL: El Retrato del Latente - Reducción de escala */}
          <div className="relative group order-2 lg:order-1 max-w-sm mx-auto lg:max-w-none">
            <div className="absolute top-0 right-0 w-full h-full border-[1px] border-black/10 transform translate-x-3 translate-y-3 transition-transform duration-700 group-hover:translate-x-1 group-hover:translate-y-1"></div>

            <div className="relative w-full aspect-[4/5] overflow-hidden border-[1px] border-black shadow-xl">
              <img
                src={SOULS_IMAGE}
                alt="Paisaje de ceniza y luz"
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105 grayscale-[0.6] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
            </div>
          </div>

          {/* NARRATIVA: El Conocimiento Prohibido - Espaciado reducido */}
          <article className="order-1 lg:order-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-amber-700/60"></div>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-neutral-400">
                Memoria de Ceniza II
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[0.95] tracking-tighter">
              La muerte <br />
              <span className="italic font-light text-neutral-400">
                es solo una hoguera.
              </span>
            </h2>

            <p className="text-sm md:text-base leading-relaxed text-neutral-600 font-light max-w-md">
              En el nexo entre la{" "}
              <span className="text-black font-normal">
                Depresión y el Propósito
              </span>
              , caer es el rito de iniciación. No eres un "Hollow" (hueco); eres
              un latente recolectando su propia humanidad.
            </p>

            {/* Lista de Atributos - Más compacta */}
            <ul className="grid grid-cols-1 gap-4 pt-2">
              {[
                {
                  icon: Skull,
                  title: "Análisis del Hollow",
                  desc: "Mapea los patrones que drenan tu estamina mental.",
                },
                {
                  icon: Scroll,
                  title: "Leyes del Pacto",
                  desc: "Disciplina inquebrantable grabada en ceniza.",
                },
                {
                  icon: Zap,
                  title: "Refuerzo de Alma",
                  desc: "Transmuta el trauma en poder de ataque real.",
                },
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4 group cursor-default">
                  <div className="flex-shrink-0 w-10 h-10 border border-black/5 flex items-center justify-center group-hover:border-amber-600 transition-all duration-500">
                    <item.icon className="w-4 h-4 text-neutral-400 group-hover:text-amber-700 group-hover:rotate-12 transition-all" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-black">
                      {item.title}
                    </h4>
                    <p className="text-xs text-neutral-500 font-light leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <button className="group relative flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                <span className="relative z-10">Restaurar Humanidad</span>
                <div className="w-7 h-7 rounded-full border border-black/10 flex items-center justify-center group-hover:w-32 group-hover:bg-black group-hover:text-white transition-all duration-500 overflow-hidden">
                  <ArrowUpRight className="w-3 h-3 flex-shrink-0" />
                </div>
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
