import React from "react";
import { Leaf, Mic, Users, ArrowUpRight } from "lucide-react";

// Imagen remota de alta calidad (Unsplash)
const REMOTE_IMAGE = "/images/aestheticPaisaje.webp";

export default function DepressionSection() {
  return (
    <section className="relative w-full bg-white text-black py-24 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* VISUAL: Minimalismo Geométrico */}
          <div className="relative group order-2 lg:order-1">
            <div className="absolute top-0 right-0 w-full h-full border-[1.5px] border-black transform translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
            <div className="relative w-full aspect-[3/4] overflow-hidden border-[1.5px] border-black">
              <img
                src={REMOTE_IMAGE}
                alt="Retrato minimalista simbolizando introspección"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
          </div>
          {/* NARRATIVA: Tipografía Editorial */}
          <article className="order-1 lg:order-2 space-y-10">
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-8 bg-black"></div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                Capítulo Deconstrucción
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif leading-[1.1] tracking-tight">
              La oscuridad <br />
              <span className="italic font-light text-neutral-600">
                no es tu destino.
              </span>
            </h2>
            <p className="text-base md:text-lg leading-loose text-neutral-700 font-light max-w-lg">
              Validamos tu dolor no como una enfermedad, sino como una señal de
              tu cuerpo pidiendo cambio. En nuestro ecosistema, convertimos esa
              señal en el combustible para tu renacimiento.
            </p>
            <ul className="space-y-6 pt-2">
              {[
                { icon: Mic, text: "Sesiones de Escucha Activa" },
                { icon: Leaf, text: "Mindfulness Neurocientífico" },
                { icon: Users, text: "Círculos de Apoyo Anónimo" },
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 group">
                  <div className="p-2 border border-black/10 rounded-full group-hover:border-black transition-colors">
                    <item.icon className="w-4 h-4 text-neutral-600 group-hover:text-black" />
                  </div>
                  <span className="text-sm font-medium uppercase tracking-wide text-neutral-600 group-hover:text-black transition-colors">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
            <div className="pt-8">
              <button className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:gap-5 transition-all group">
                Explorar Método
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
