import React from "react";
import { Skull, Scroll, Zap, ArrowUpRight } from "lucide-react";

const SOULS_IMAGE = "/images/aestheticPaisaje.webp";

export default function SoulsWisdomSection() {
  return (
    <section className="relative w-full bg-[#fdfdfd] text-black py-24 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* VISUAL: El Retrato del Latente */}
          <div className="relative group order-2 lg:order-1">
            {/* El marco desplazado da una sensación de inestabilidad controlada */}
            <div className="absolute top-0 right-0 w-full h-full border-[1px] border-black/10 transform translate-x-6 translate-y-6 transition-transform duration-700 group-hover:translate-x-3 group-hover:translate-y-3"></div>

            <div className="relative w-full aspect-[3/4] overflow-hidden border-[1px] border-black shadow-2xl">
              <img
                src={SOULS_IMAGE}
                alt="Paisaje de ceniza y luz"
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"
              />
              {/* Overlay sutil de grano para textura de papel antiguo */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
            </div>
          </div>

          {/* NARRATIVA: El Conocimiento Prohibido */}
          <article className="order-1 lg:order-2 space-y-12">
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-amber-600"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400">
                Fragmento de Memoria II
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-serif leading-[1] tracking-tighter">
              La muerte <br />
              <span className="italic font-light text-neutral-500">
                es solo un checkpoint.
              </span>
            </h2>

            <p className="text-base md:text-xl leading-relaxed text-neutral-700 font-light max-w-lg">
              En las Tierras Entre la Depresión y el Propósito, caer no es
              fracasar. Validamos tu fatiga como el desgaste natural de un
              guerrero que ha luchado contra jefes invisibles. Aquí,
              transmutamos tu
              <span className="font-medium text-black italic"> "Vacío" </span>
              en poder acumulado.
            </p>

            <ul className="grid grid-cols-1 gap-8 pt-4">
              {[
                {
                  icon: Skull,
                  title: "Análisis del Hollow",
                  desc: "Identifica los patrones que drenan tu humanidad.",
                },
                {
                  icon: Scroll,
                  title: "Leyes del Pacto",
                  desc: "Contratos de disciplina grabados en piedra.",
                },
                {
                  icon: Zap,
                  title: "Resonancia de Alma",
                  desc: "Entrenamiento mental de alta intensidad.",
                },
              ].map((item, idx) => (
                <li key={idx} className="flex gap-6 group cursor-default">
                  <div className="flex-shrink-0 w-12 h-12 border border-black/5 flex items-center justify-center group-hover:border-amber-500 transition-all duration-500">
                    <item.icon className="w-5 h-5 text-neutral-400 group-hover:text-amber-600 group-hover:rotate-12 transition-all" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-black">
                      {item.title}
                    </h4>
                    <p className="text-sm text-neutral-500 font-light">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="pt-10">
              <button className="group relative flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] transition-all">
                <span className="relative z-10">Leer las Runas</span>
                <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:w-full group-hover:bg-black group-hover:text-white transition-all duration-500">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
