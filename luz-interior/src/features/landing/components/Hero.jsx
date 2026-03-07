import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden select-none">
      {/* 1. ATMÓSFERA */}
      <div className="absolute inset-0 z-0">
        <video
          src="/videos/Irithyll-Of-The-Boreal-Valley-Dark-Souls-3-Moewalls-Com.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
      </div>

      {/* 2. CAPA DE CONTENIDO - pb-32 para elevar el centro visual */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center pb-24 md:pb-32">
        {/* Badge superior - Mayor margen inferior para separar del título */}
        <div className="flex items-center gap-3 mb-8 animate-fade-in">
          <div className="h-[1px] w-8 bg-amber-400/40"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.7em] text-amber-400/90">
            Acceso al Nexo
          </span>
          <div className="h-[1px] w-8 bg-amber-400/40"></div>
        </div>

        {/* Título - Tracking más abierto para que no se sienta apretado */}
        <h1 className="text-5xl md:text-7xl lg:text-[88px] font-serif text-white tracking-tight leading-[0.9] text-center animate-fade-in-up">
          Desafía al <br />
          <span className="italic font-light text-amber-400 inline-block mt-2">
            Abismo Interior
          </span>
        </h1>

        {/* Subtítulo - Más margen superior (mt-10) y max-w para legibilidad */}
        <p className="mt-10 text-zinc-300 text-sm md:text-base font-medium max-w-lg text-center leading-relaxed animate-fade-in-up delay-[200ms] opacity-90">
          El camino no es una elección. Es una{" "}
          <span className="text-amber-400 italic font-semibold">
            arquitectura de transmutación
          </span>{" "}
          para quienes deciden dejar de ser espectadores.
        </p>

        {/* Botones - mt-12 para dar aire respecto al texto */}
        <div className="flex flex-col sm:flex-row items-center gap-5 mt-12 animate-fade-in-up delay-[400ms]">
          <Link
            to="/dojo"
            className="group px-10 py-4 bg-amber-400 text-black text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:bg-white shadow-[0_0_30px_rgba(251,191,36,0.2)] active:scale-95"
          >
            <span className="flex items-center gap-2">
              Encender Hoguera
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            to="/pact"
            className="px-10 py-4 border border-white/20 bg-white/5 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:bg-white hover:text-black active:scale-95"
          >
            Unirse al Pacto
          </Link>
        </div>
      </div>

      {/* 3. INDICADOR DE DESCENSO */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-50">
        <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-zinc-500">
          Descender
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-amber-400 to-transparent" />
      </div>
    </section>
  );
}
