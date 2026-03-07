import React from "react";
import { ArrowUpRight, BookOpen, Brain, Coffee, Zap } from "lucide-react";
import WellLivedLife from "../../../articles/well-lived-life.mdx";

export default function PersonalDevelopment() {
  return (
    <section className="relative bg-white text-black py-10 lg:py-14 border-t border-black/5 overflow-hidden">
      {/* Marca de agua - Escala reducida */}
      <div className="absolute top-10 -right-16 pointer-events-none select-none hidden 2xl:block">
        <span className="text-[10rem] font-serif font-black text-black/[0.02] leading-none uppercase tracking-tighter">
          Growth
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-8">
        {/* HEADER COMPACTO */}
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-black/5 pb-6 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-amber-500" />
              <span className="text-[9px] uppercase tracking-[0.5em] font-black text-amber-600">
                Laboratorio de Almas
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
              Diseño de Vida{" "}
              <span className="italic text-neutral-400 font-light">
                Estratégico
              </span>
            </h2>
          </div>
          <p className="text-neutral-500 text-[11px] md:text-right leading-relaxed max-w-xs uppercase tracking-wider">
            Sistemas tácticos para optimizar el intelecto. Sin relleno.
          </p>
        </div>

        {/* BENTO GRID - Altura ajustada de 320px a 280px para evitar scroll */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[280px]">
          {/* ARTÍCULO PRINCIPAL: El Códice */}
          <article className="md:col-span-2 md:row-span-2 group relative p-8 bg-white border border-black/10 hover:border-amber-500/50 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl">
            <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-100 group-hover:text-amber-600 transition-all">
              <ArrowUpRight className="w-5 h-5" />
            </div>

            <div className="space-y-4 relative z-10">
              <div className="w-10 h-10 rounded-sm border border-black/5 flex items-center justify-center bg-neutral-50 group-hover:bg-amber-50 transition-colors">
                <Brain className="w-5 h-5 text-amber-600" />
              </div>

              <h3 className="text-2xl md:text-3xl font-serif leading-tight">
                La Vida Bien Vivida: <br />
                <span className="italic font-light text-neutral-400">
                  Manual del Latente
                </span>
              </h3>

              <div className="relative">
                <div className="prose prose-xs prose-neutral line-clamp-[8] text-neutral-600 text-xs">
                  <WellLivedLife />
                </div>
                <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent" />
              </div>
            </div>

            <button className="text-[9px] font-black uppercase tracking-[0.3em] inline-flex items-center gap-2 group-hover:text-amber-600 transition-colors">
              Descifrar Runas <div className="h-[1px] w-4 bg-current" />
            </button>
          </article>

          {/* LECTURA DESTACADA: El Tomo de Sabiduría */}
          <article className="md:col-span-1 md:row-span-2 relative p-6 flex flex-col justify-between group overflow-hidden bg-zinc-900 rounded-sm">
            <div className="absolute inset-0">
              <img
                src="/images/astronaut-space-suit-snow.webp"
                className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            </div>

            <div className="relative z-10 flex justify-between">
              <BookOpen className="w-6 h-6 text-amber-400/80" />
              <Zap className="w-4 h-4 text-white/20 animate-pulse" />
            </div>

            <div className="relative z-10 space-y-1">
              <span className="text-[8px] text-amber-400 uppercase tracking-widest font-black">
                Lectura de Ceniza
              </span>
              <h4 className="text-lg font-serif text-white leading-tight">
                The Well-Lived Life
              </h4>
              <p className="text-neutral-400 text-[10px] uppercase tracking-tighter">
                Cal Newport — Archivo #042
              </p>
            </div>
          </article>

          {/* TARJETA RITUAL: Protocolo de Hoguera */}
          <article className="md:col-span-1 bg-neutral-50 border border-neutral-100 p-6 flex flex-col justify-center gap-3 hover:bg-amber-50 hover:border-amber-200 transition-all duration-500 group">
            <Coffee className="w-5 h-5 text-amber-800/50 group-hover:text-amber-700 transition-colors" />
            <h4 className="font-serif text-lg italic">Morning Protocol</h4>
            <p className="text-neutral-500 text-[11px] leading-relaxed">
              La mañana es un umbral. Define la arquitectura del día antes de
              que el mundo drene tu humanidad.
            </p>
          </article>

          {/* TARJETA MÉTRICA: La Regla del 1% */}
          <article className="md:col-span-1 bg-white border border-black/5 p-6 flex items-center justify-center text-center hover:border-black transition-all group relative overflow-hidden">
            <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/[0.02] transition-colors" />
            <div className="space-y-1 relative z-10">
              <h4 className="text-4xl font-serif group-hover:scale-110 transition-transform text-amber-600/80">
                +1%
              </h4>
              <h5 className="text-[8px] font-black uppercase tracking-[0.2em] text-neutral-400">
                Progreso Compuesto
              </h5>
              <p className="text-[10px] text-neutral-500 italic">
                Transmuta tu vacío en poder.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
