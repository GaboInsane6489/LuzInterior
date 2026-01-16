import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center bg-black">
      {/* 1. BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        {/* Parallax effect sutil: scale-110 */}
        <img
          src="/images/Winter.webp"
          alt="Paisaje de montaña evocando superación"
          className="w-full h-full object-cover opacity-60 animate-slow-zoom"
        />
        {/* Overlay Gradiente: Crucial para leer texto blanco sobre imagen */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/50"></div>
      </div>

      {/* 2. CONTENT LAYER */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center space-y-8">
        {/* Badge Animado */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mx-auto animate-fade-in-down">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-200">
            Mentalidad & Disciplina
          </span>
        </div>

        {/* Título Principal */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-tight drop-shadow-2xl animate-fade-in-up">
          Encuentra tu <br />
          {/* Gradiente Textual */}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600">
            Luz Interior
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="text-lg md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-[200ms]">
          Deja de buscar motivación barata. Construye un ecosistema de
          <strong className="text-white font-medium ml-2">
            hábitos inquebrantables, propósito y serenidad real.
          </strong>
        </p>

        {/* Botón Call to Action */}
        <div className="pt-8 animate-fade-in-up delay-[400ms]">
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-3 px-10 py-4 border border-white/30 bg-white/5 backdrop-blur-sm text-white font-bold text-xs uppercase tracking-[0.2em] overflow-hidden transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:scale-105"
          >
            <span className="relative z-10">Comenzar el Viaje</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Scroll Indicator (Opcional) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent"></div>
      </div>
    </section>
  );
}
