import React from "react";
import { Helmet } from "react-helmet-async";
import { SEO_DATA } from "../../../config/constants";
import { Coffee, AlarmClock, ArrowUpRight, Swords } from "lucide-react";

const VALUES = [
  "La auténtica ganancia es el proceso, no solo el resultado",
  "La disciplina es el puente entre tus metas y tus logros",
  "La constancia es la clave para alcanzar tus metas",
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>{SEO_DATA.about.title}</title>
        <meta name="description" content={SEO_DATA.about.description} />
        <meta name="keywords" content={SEO_DATA.about.keywords.join(", ")} />
        <meta name="author" content={SEO_DATA.about.author} />
        <link rel="canonical" href={SEO_DATA.about.url} />
        <meta property="og:image" content={SEO_DATA.about.image} />
      </Helmet>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-32">
        {/* ─────────────────────────────
            SECTION · QUIÉNES SOMOS
        ───────────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <figure className="overflow-hidden rounded-xl">
            <img
              src="/images/wlop-girl-playing.webp"
              alt="Persona reflexionando sobre crecimiento personal"
              className="w-full h-full transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
            <h3 className="text-2xl font-semibold mb-2 pt-6">
              Luz Interior es...
            </h3>
            <p className="text-lg text-white/80 leading-relaxed">
              Un espacio para compartir aprendizajes, sistemas y reflexiones que
              impulsan el crecimiento individual y colectivo. Permitiendo
              enseñar tus avances con los demás guerreros que luchan y mejoran
              cada día a través de la disciplina y la constancia.
            </p>
          </figure>

          <article className="space-y-6">
            <header>
              <h1 className="text-5xl font-serif tracking-tight">
                Sobre Nosotros
              </h1>
            </header>

            <p className="text-lg text-white/80 leading-relaxed">
              Somos personas comprometidas con mejorar cada día, incluso cuando
              el camino se vuelve oscuro.
            </p>

            <p className="text-lg text-gray-400 leading-relaxed">
              Este espacio existe para compartir aprendizajes, sistemas y
              reflexiones que impulsan el crecimiento individual y colectivo.
            </p>

            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3">
                <Coffee className="w-5 h-5 text-primary" />
                <span className="text-gray-400">
                  Un cafecito para avanzar incluso en días lluviosos
                </span>
              </li>

              <li className="flex items-center gap-3">
                <AlarmClock className="w-5 h-5 text-primary" />
                <span className="text-gray-400">
                  Despertar temprano para ganar claridad y enfoque
                </span>
                <ArrowUpRight className="w-4 h-4 text-primary transition-transform duration-300 hover:rotate-45" />
              </li>
            </ul>

            <ul className="space-y-3 pt-6">
              {VALUES.map((value) => (
                <li key={value} className="flex items-start gap-3">
                  <Swords className="w-5 h-5 text-primary mt-1" />
                  <span className="text-gray-400 leading-relaxed">{value}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        {/* ─────────────────────────────
    SECTION · EL ABISMO ATRÁS
───────────────────────────── */}
        <section
          className="relative min-h-[85vh] md:min-h-[95vh] rounded-2xl overflow-hidden"
          aria-labelledby="abismo-title"
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{
              backgroundImage: "url('/images/castle-burning-sky-sunset.webp')",
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Content */}
          <article className="relative z-10 max-w-2xl px-6 mx-auto pt-32 md:pt-44 space-y-8 text-center">
            <header className="space-y-4">
              <h2
                id="abismo-title"
                className="text-3xl md:text-4xl font-serif tracking-tight text-white"
              >
                El abismo atrás
              </h2>

              <span className="block w-12 h-px mx-auto bg-white/40" />
            </header>

            <p className="text-base md:text-lg text-white/80 leading-relaxed">
              Aquí no se venden promesas rápidas. Se construyen capacidades
              reales para sostenerte cuando el ruido desaparece.
            </p>

            <p className="text-sm md:text-base text-white/60 leading-relaxed">
              No se trata de sobrevivir al caos, sino de aprender a caminar con
              firmeza después de haberlo atravesado.
            </p>

            {/* Valores condensados */}
            <div className="pt-10 grid grid-cols-3 gap-6 mb-12 text-xs md:text-sm tracking-widest uppercase text-white/70">
              <div className="space-y-2">
                <p>Explora</p>
                <p>Aprende</p>
                <p>Discierne</p>
              </div>
              <div className="space-y-2">
                <p>Lucha</p>
                <p>Falla</p>
                <p>Persiste</p>
              </div>
              <div className="space-y-2">
                <p>Vive</p>
                <p>Siente</p>
                <p>Construye</p>
              </div>
            </div>
          </article>
        </section>
      </main>
    </>
  );
};

export default About;
