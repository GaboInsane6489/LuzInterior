import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Flame } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full h-[100vh] flex items-center justify-center bg-black overflow-hidden select-none">
      {/* 1. ATMÓSFERA DEL DOJO (Capas de fondo) */}
      <div className="absolute inset-0 z-0">
        <video
          src="/videos/Dark-Queen-Knight-Moewalls-Com.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60 animate-slow-zoom"
        />
        {/* Gradientes direccionales del Dojo */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>

      {/* 2. CONTENT LAYER */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center space-y-8">
        {/* Badge Estilo Dojo */}
        <div className="flex items-center justify-center gap-4 animate-fade-in mb-4">
          <div className="h-[1px] w-12 bg-amber-400"></div>
          <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-amber-300">
            Acceso al Nexo
          </span>
          <div className="h-[1px] w-12 bg-amber-400"></div>
        </div>

        {/* Título con línea de resplandor (Dojo Style) */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white tracking-tighter leading-[0.85] animate-fade-in-up">
          Desafía al <br />
          <span className="italic font-light text-amber-200/40 relative inline-block">
            Abismo Interior
            <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-300/50 to-transparent"></span>
          </span>
        </h1>

        {/* Subtítulo Narrativo */}
        <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto animate-fade-in-up delay-[200ms]">
          El camino no es una simple elección. Es una{" "}
          <span className="text-white font-medium italic">
            arquitectura de transmutación
          </span>{" "}
          para quienes han decidido dejar de ser espectadores de su propia
          ruina.
        </p>

        {/* Botones con Animaciones de Hover del Dojo */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 animate-fade-in-up delay-[400ms]">
          {/* Botón Principal: Expansión origin-left */}
          <Link
            to="/dojo"
            className="group relative px-12 py-6 bg-amber-400 text-black text-[11px] font-black uppercase tracking-[0.3em] overflow-hidden transition-all duration-700 shadow-[0_0_40px_rgba(245,158,11,0.15)] hover:bg-white"
          >
            <span className="relative z-10 flex items-center gap-3">
              Encender Hoguera
              <ArrowRight className="w-4 h-4 group-hover:translate-x-3 transition-transform duration-500" />
            </span>
            <div className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 opacity-5"></div>
          </Link>

          {/* Botón Secundario: Estilo Santuario */}
          <Link
            to="/pact"
            className="group relative px-12 py-6 border border-white/10 bg-white/5 backdrop-blur-md text-white/70 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 hover:text-white hover:border-white/30"
          >
            Unirse al Pacto
            <div className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-white/40 group-hover:w-full group-hover:left-0 transition-all duration-700" />
          </Link>
        </div>
      </div>

      {/* Scroll Indicator con gradiente Dojo */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30 hover:opacity-100 transition-all duration-700 group">
        <span className="text-[8px] uppercase tracking-[0.6em] text-white vertical-text">
          Descender
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-amber-400 via-white/20 to-transparent group-hover:h-20 transition-all duration-700" />
      </div>

      {/* Textura final de grano */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
    </section>
  );
}
