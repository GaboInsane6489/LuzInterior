import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full h-[100vh] min-h-[600px] flex items-center justify-center bg-black overflow-hidden select-none">
      {/* 1. ATMÓSFERA DEL DOJO - Contraste optimizado */}
      <div className="absolute inset-0 z-0">
        <video
          src="/videos/Dark-Queen-Knight-Moewalls-Com.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-70 animate-slow-zoom"
        />
        {/* Overlay más oscuro para que el texto blanco resalte al 100% */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/80" />
      </div>

      {/* 2. CONTENT LAYER - Compacto con colores intensos */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center space-y-4">
        {/* Badge - Ámbar Eléctrico */}
        <div className="flex items-center justify-center gap-3 animate-fade-in mb-2">
          <div className="h-[2px] w-8 bg-amber-400"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-400">
            Acceso al Nexo
          </span>
          <div className="h-[2px] w-8 bg-amber-400"></div>
        </div>

        {/* Título - Blanco Puro y Ámbar Sólido */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white tracking-tighter leading-[0.9] animate-fade-in-up">
          Desafía al <br />
          <span className="italic font-light text-amber-400 relative inline-block">
            Abismo Interior
            {/* Línea más gruesa para visibilidad */}
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-amber-400"></span>
          </span>
        </h1>

        {/* Subtítulo - Zinc-100 para máximo contraste sobre el video */}
        <p className="text-zinc-100 text-base md:text-lg font-medium leading-snug max-w-xl mx-auto animate-fade-in-up delay-[200ms] drop-shadow-md">
          El camino no es una elección. Es una{" "}
          <span className="text-amber-400 font-bold italic">
            arquitectura de transmutación
          </span>{" "}
          para quienes deciden dejar de ser espectadores.
        </p>

        {/* Botones - Colores sólidos, sin opacidad baja */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-up delay-[400ms]">
          <Link
            to="/dojo"
            className="group relative px-8 py-4 bg-amber-400 text-black text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:bg-white w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Encender Hoguera
              <ArrowRight className="w-4 h-4 stroke-[3px] group-hover:translate-x-2 transition-transform" />
            </span>
          </Link>

          <Link
            to="/pact"
            className="group relative px-8 py-4 border-2 border-white bg-black/60 text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white hover:text-black w-full sm:w-auto"
          >
            Unirse al Pacto
          </Link>
        </div>
      </div>

      {/* Scroll Indicator - Ámbar intenso */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-all duration-700">
        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white">
          Descender
        </span>
        <div className="w-[2px] h-8 bg-amber-400 shadow-[0_0_10px_#fbbf24]" />
      </div>

      {/* Textura final */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
    </section>
  );
}
