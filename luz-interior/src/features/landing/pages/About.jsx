import React from "react";
import { Helmet } from "react-helmet-async";
import { SEO_DATA } from "../../../config/constants";
import { Coffee, AlarmClock, ArrowUpRight, Swords } from "lucide-react";

const About = () => {
  return (
    <>
      <Helmet>
        <title>{SEO_DATA.about.title}</title>
        <meta name="description" content={SEO_DATA.about.description} />
        <meta name="keywords" content={SEO_DATA.about.keywords.join(", ")} />
        <meta name="author" content={SEO_DATA.about.author} />
        <meta name="url" content={SEO_DATA.about.url} />
        <meta name="image" content={SEO_DATA.about.image} />
      </Helmet>

      <section className="py-16 px-6 max-w-7xl mx-auto space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="w-full md:w-1/2">
            <img
              src="/images/wlop-girl-playing.webp"
              alt="About"
              className="w-full h-auto rounded-lg transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-5xl font-serif tracking-tight">
              Sobre Nosotros
            </h1>
            <div className="space-y-4 mt-4">
              <p className="text-lg text-white/80 leading-relaxed">
                Somos un grupo de personas que buscan mejorar cada día
              </p>
              <p className="text-lg text-gray-500 leading-relaxed">
                En este espacio compartimos reflexiones, aprendizajes y
                herramientas que nos ayudan a crecer como individuos y como
                comunidad.
              </p>
              <div className="flex items-center gap-2">
                <Coffee className="w-6 h-6 text-primary" />
                <p className="text-lg text-gray-500 leading-relaxed">
                  Cafecito para avanzar con ánimos en días lluviosos
                </p>
              </div>
              <div className="flex items-center gap-2">
                <AlarmClock className="w-6 h-6 text-primary" />
                <p className="text-lg text-gray-500 leading-relaxed">
                  Despertar temprano para aprovechar el día
                </p>
                <ArrowUpRight className="w-6 h-6 text-primary transition-transform duration-300 hover:rotate-45" />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Swords className="w-6 h-6 text-primary" />
                <p className="text-lg text-gray-500 leading-relaxed">
                  La auténtica ganancia es el proceso, no solo el resultado
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Swords className="w-6 h-6 text-primary" />
                <p className="text-lg text-gray-500 leading-relaxed">
                  La disciplina es el puente entre tus metas y tus logros
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Swords className="w-6 h-6 text-primary" />
                <p className="text-lg text-gray-500 leading-relaxed">
                  La constancia es la clave para alcanzar tus metas
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
