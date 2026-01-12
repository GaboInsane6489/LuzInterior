import React from "react";
import { Helmet } from "react-helmet-async";
import disciplineClimb from "../assets/discipline_climb.png";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <Helmet>
        <title>Inicio | Luz Interior </title>
        <meta
          name="description"
          content="Descubre el camino hacia tu mejor versión. Disciplina, mentalidad y propósito."
        />
      </Helmet>

      {/* Main Container - Full Screen */}
      <main className="relative w-full h-screen overflow-hidden">
        {/* 1. LAYER: Background Image */}
        <div className="absolute inset-0">
          <img
            src={disciplineClimb}
            alt="Persona escalando una montaña al amanecer representando disciplina"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          {/* Overlay: Sombra negra para que el texto se lea siempre */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* 2. LAYER: Content (Z-Index higher) */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-lg">
            Bienvenido a <span className="text-amber-400">Luz Interior</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed drop-shadow-md">
            Aquí no es la típica charla para "quererte a ti mismo". Aquí
            aprenderás el verdadero camino a mejorar cada aspecto de tu vida:
            <strong className="text-white font-medium ml-1">
              hábitos, disciplina y mentoría.
            </strong>
          </p>

          <div className="pt-4">
            <Link
              to="/contact"
              className="px-8 py-3 bg-white text-slate-900 font-semibold rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Comenzar Ahora
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Landing;
