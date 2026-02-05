import React from "react";
import { ArrowUpRight, BookOpen, Brain, Coffee } from "lucide-react";
import WellLivedLife from "../../../articles/well-lived-life.mdx";

/**
 * PersonalDevelopment — Growth Lab
 * Adaptado al lenguaje Dojo:
 * editorial, jerarquía ritual y bento premium
 * manteniendo fondo blanco como espacio de claridad.
 */
export default function PersonalDevelopment() {
  return (
    <section className="relative bg-white text-black py-20 lg:py-28 border-t border-black/5">
      {/* Marca de agua sutil */}
      <div className="absolute top-16 -right-24 pointer-events-none select-none hidden 2xl:block">
        <span className="text-[16rem] font-serif font-black text-black/[0.03] leading-none uppercase tracking-tighter">
          Growth
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 space-y-12">
        {/* HEADER */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end border-b border-black/10 pb-10">
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-amber-500" />
              <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-amber-600">
                Growth Lab
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight">
              Diseño de Vida
            </h2>
          </div>
          <p className="md:col-span-5 text-neutral-600 text-sm md:text-right leading-relaxed max-w-md ml-auto">
            Estrategias tácticas para optimizar rendimiento, intelecto y
            bienestar. Sin relleno. Solo sistemas que funcionan.
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[320px]">
          {/* ARTÍCULO PRINCIPAL */}
          <article className="md:col-span-2 md:row-span-2 group relative p-10 bg-white border border-black/10 hover:border-black transition-all flex flex-col justify-between overflow-hidden">
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="w-6 h-6" />
            </div>

            <div className="space-y-6 relative z-10">
              <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center">
                <Brain className="w-6 h-6 text-amber-600" />
              </div>

              <h3 className="text-3xl md:text-4xl font-serif leading-tight">
                La Vida Bien Vivida
                <br />
                <span className="italic font-light text-neutral-500">
                  Manual de Operaciones
                </span>
              </h3>

              <div className="relative">
                <div className="prose prose-sm prose-neutral line-clamp-[12] text-neutral-600">
                  <WellLivedLife />
                </div>
                <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent" />
              </div>
            </div>

            <div className="pt-8">
              <span className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1">
                Leer Ensayo Completo
              </span>
            </div>
          </article>

          {/* LECTURA DESTACADA */}
          <article className="md:col-span-1 md:row-span-2 relative p-8 flex flex-col justify-between group overflow-hidden bg-black">
            <div className="absolute inset-0">
              <img
                src="/images/astronaut-space-suit-snow.webp"
                alt="Lectura destacada"
                className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            </div>

            <div className="relative z-10">
              <BookOpen className="w-8 h-8 text-white/80 group-hover:text-white transition-colors" />
            </div>

            <div className="relative z-10 space-y-2">
              <span className="text-[10px] text-amber-300 uppercase tracking-widest font-bold">
                Lectura del Mes
              </span>
              <h4 className="text-xl font-serif text-white">
                The Well-Lived Life
              </h4>
              <p className="text-neutral-300 text-sm">Cal Newport</p>
            </div>
          </article>

          {/* TARJETA RITUAL */}
          <article className="md:col-span-1 bg-amber-50 border border-amber-200 p-8 flex flex-col justify-center gap-4 hover:bg-amber-100 transition-colors">
            <Coffee className="w-6 h-6 text-amber-800" />
            <h4 className="font-serif text-xl">Morning Protocol</h4>
            <p className="text-neutral-700 text-sm leading-relaxed">
              La mañana es un umbral. Rituales simples —luz, silencio y acción
              deliberada— definen la arquitectura del día.
            </p>
          </article>

          {/* TARJETA MÉTRICA */}
          <article className="md:col-span-1 bg-white border border-black/10 p-8 flex items-center justify-center text-center hover:border-black transition-all">
            <div className="space-y-3">
              <h4 className="text-5xl font-serif">1%</h4>
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                Daily Improvement
              </h5>
              <p className="text-neutral-600 text-sm">
                Progreso compuesto aplicado a la vida real.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
