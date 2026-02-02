import React from "react";
import { ArrowUpRight, BookOpen, Brain, Coffee } from "lucide-react";
import WellLivedLife from "../../../articles/well-lived-life.mdx";

export default function PersonalDevelopment() {
  return (
    <section className="pt-8 pb-6 px-6 lg:px-12 bg-gray-50 text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER DE SECCIÓN */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-black/10 pb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 block mb-2">
              Growth Lab
            </span>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight">
              Diseño de Vida
            </h2>
          </div>
          <p className="text-gray-600 max-w-md text-sm md:text-right leading-relaxed">
            Estrategias tácticas para optimizar tu rendimiento, intelecto y
            bienestar. Sin relleno. Solo ciencia y experiencia.
          </p>
        </div>

        {/* BENTO GRID (Layout Editorial) */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[300px]">
          {/* ARTÍCULO PRINCIPAL (Ocupa 2 columnas x 2 filas) */}
          <article className="md:col-span-2 md:row-span-2 group relative p-8 bg-white border border-gray-200 hover:border-black transition-all overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="w-6 h-6" />
            </div>

            <div className="space-y-4 relative z-10">
              <div className="w-10 h-10 bg-amber-100 flex items-center justify-center rounded-full mb-4">
                <Brain className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="text-3xl font-serif leading-tight group-hover:underline decoration-1 underline-offset-4">
                La Vida Bien Vivida: <br /> Manual de Operaciones
              </h3>

              {/* Aquí renderizamos el MDX con el efecto FADE OUT (Truco Senior) */}
              <div className="relative">
                <div className="prose prose-sm prose-neutral line-clamp-[12] text-gray-500">
                  <WellLivedLife />
                </div>
                {/* Gradiente blanco abajo para suavizar el corte */}
                <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-t from-white to-transparent"></div>
              </div>
            </div>

            <div className="pt-8">
              <span className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1">
                Leer Ensayo Completo
              </span>
            </div>
          </article>

          {/* TARJETA SECUNDARIA 1 (Vertical - Ahora con Imagen) */}
          <article className="md:col-span-1 md:row-span-2 relative p-8 flex flex-col justify-between group overflow-hidden bg-black">
            {/* Imagen de Fondo */}
            <div className="absolute inset-0">
              <img
                src="/images/astronaut-space-suit-snow.webp"
                alt="Luz al final del túnel"
                className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            </div>

            <div className="relative z-10">
              <BookOpen className="w-8 h-8 text-white/80 group-hover:text-white transition-colors" />
            </div>

            <div className="relative z-10 space-y-2">
              <span className="text-xs text-amber-300 uppercase tracking-widest">
                Lectura del Mes
              </span>
              <h4 className="text-xl font-medium text-white">
                The Well-Lived Life
              </h4>
              <p className="text-gray-300 text-sm mt-2">Cal Newport</p>
            </div>
          </article>

          {/* TARJETA PEQUEÑA 1 */}
          <article className="md:col-span-1 bg-amber-50 p-6 flex flex-col justify-center gap-4 hover:bg-amber-100 transition-colors cursor-pointer">
            <Coffee className="w-6 h-6 text-amber-800" />
            <h4 className="font-bold text-lg">Morning Protocol</h4>
            <p className="text-gray-600 text-sm mt-2">
              The morning is a threshold, a quiet architecture of beginnings. A
              ritual of breath, light, and deliberate gestures sets the tone for
              the day. Coffee brewed slowly, pages opened, words written without
              urgency — each act is resistance to haste.
            </p>
          </article>

          {/* TARJETA PEQUEÑA 2 */}
          <article className="md:col-span-1 bg-white border border-gray-200 p-6 flex items-center justify-center text-center hover:bg-amber-100 transition-all cursor-pointer">
            <div className="space-y-2">
              <h4 className="text-4xl font-serif">1%</h4>
              <h5 className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Daily Improvement
              </h5>
              <p className="text-gray-600 text-sm mt-2">
                Improvement in life quality and well-being.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
