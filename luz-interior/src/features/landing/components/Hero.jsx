import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Flame } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full h-[100vh] flex items-center justify-center bg-black overflow-hidden select-none">
      {/* 1. BACKGROUND LAYER - Sin filtros extra, solo tu video y el gradiente de lectura */}
      <div className="absolute inset-0 z-0 opacity-70">
        <video
          src="/videos/Dark-Queen-Knight-Moewalls-Com.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover animate-slow-zoom"
        />
        {/* Gradiente sutil para no "ensuciar" el video pero proteger la legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/40" />
      </div>

      {/* 2. CONTENT LAYER - Max-width ajustado para impacto visual */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
        {/* Badge: Forja tu destino con micro-resplandor */}
        <div className="inline-flex items-center gap-2 px-5 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mx-auto animate-fade-in-down mb-8 group hover:bg-white/10 transition-colors duration-500">
          <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-300">
            Forja tu destino
          </span>
        </div>

        {/* Título Principal: Re-escalado para encuadre cinematográfico */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-tighter leading-[0.9] drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] animate-fade-in-up">
          Desafía al <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-500 to-amber-700 italic opacity-90">
            Abismo Interior
          </span>
        </h1>

        {/* Subtítulo: Más aire y mejor contraste */}
        <p className="mt-8 text-base md:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-[200ms] tracking-wide">
          En un mundo de sombras, el mayor jefe eres tú mismo. <br />
          <span className="text-white/80 font-medium uppercase tracking-[0.2em] text-[10px] md:text-xs mt-3 block">
            Recupera tu Humanidad y Gracia Perdida
          </span>
        </p>

        {/* Botones: Acción principal con efecto de expansión */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-12 animate-fade-in-up delay-[400ms]">
          <Link
            to="/dojo"
            className="group relative inline-flex items-center gap-4 px-10 py-4 bg-amber-600 hover:bg-amber-500 text-black font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
          >
            <span>Encender Hoguera</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>

          <Link
            to="/pact"
            className="group px-10 py-4 border border-white/20 bg-white/5 backdrop-blur-md text-white/70 font-bold text-[10px] uppercase tracking-[0.3em] transition-all duration-500 hover:bg-white hover:text-black hover:border-white"
          >
            Unirse al Pacto
          </Link>
        </div>
      </div>

      {/* Scroll Indicator: Minimalista y sutil */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30 hover:opacity-100 transition-opacity duration-700">
        <span className="text-[7px] uppercase tracking-[0.5em] text-white">
          Descender
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white via-white/50 to-transparent animate-pulse" />
      </div>

      {/* Textura sutil para que el video no se vea "plano" */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
    </section>
  );
}
