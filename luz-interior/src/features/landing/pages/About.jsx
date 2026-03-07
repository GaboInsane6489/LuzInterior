import React from "react";
import { Helmet } from "react-helmet-async";
import { SEO_DATA } from "../../../config/constants";
import {
  Coffee,
  AlarmClock,
  ArrowUpRight,
  Swords,
  Shield,
  Flame,
} from "lucide-react";

const VALUES = [
  "La auténtica ganancia es el proceso, no el resultado.",
  "La disciplina es el puente entre tus metas y tus logros.",
  "La constancia es la única moneda de cambio real.",
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>{SEO_DATA.about.title}</title>
        <meta name="description" content={SEO_DATA.about.description} />
        <meta name="keywords" content={SEO_DATA.about.keywords.join(", ")} />
      </Helmet>

      <main className="bg-black text-white selection:bg-amber-500/30">
        {/* ──────────────────────────────────────────────────────────
            SECTION 1: LA GÉNESIS (QUIÉNES SOMOS)
        ────────────────────────────────────────────────────────── */}
        <section className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* COLUMNA IZQUIERDA: IMAGEN EDITORIAL */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-4 border border-white/5 -z-10 group-hover:scale-105 transition-transform duration-700" />
              <div className="relative overflow-hidden rounded-sm ring-1 ring-white/10">
                <img
                  src="/images/wlop-girl-playing.webp"
                  alt="Reflexión"
                  className="w-full h-[500px] object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-400 mb-2">
                    Manifiesto
                  </p>
                  <h3 className="text-2xl font-serif italic text-white/90 leading-tight">
                    "Luz Interior es el nexo donde la disciplina transmuta el
                    caos en orden."
                  </h3>
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA: TEXTO NARRATIVO */}
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-[1px] w-8 bg-amber-500" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.6em] text-amber-500/80">
                    Nuestra Senda
                  </span>
                </div>
                <h1 className="text-6xl md:text-8xl font-serif tracking-tighter leading-none">
                  Sobre <br />{" "}
                  <span className="italic text-zinc-500 font-light">
                    Nosotros
                  </span>
                </h1>
              </div>

              <div className="space-y-6 max-w-xl">
                <p className="text-xl text-zinc-400 font-light leading-relaxed">
                  No somos una academia. Somos una{" "}
                  <span className="text-white font-medium italic">
                    hermandad silenciosa
                  </span>{" "}
                  comprometida con la forja del carácter.
                </p>
                <p className="text-sm text-zinc-500 leading-relaxed border-l border-white/10 pl-6">
                  Este espacio fue diseñado para compartir sistemas tácticos que
                  impulsan el crecimiento. Aquí, cada avance se comparte con
                  otros guerreros que entienden que el camino es infinito.
                </p>
              </div>

              {/* LISTA DE PROTOCOLOS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                <div className="group space-y-3">
                  <div className="flex items-center gap-3">
                    <Coffee className="w-4 h-4 text-amber-500" />
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-white">
                      El Umbral Diarios
                    </h4>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-snug group-hover:text-zinc-300 transition-colors">
                    Aprovechar la quietud del alba para ganar claridad antes de
                    que el mundo despierte.
                  </p>
                </div>

                <div className="group space-y-3">
                  <div className="flex items-center gap-3">
                    <AlarmClock className="w-4 h-4 text-amber-500" />
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-white">
                      Vigilia Estratégica
                    </h4>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-snug group-hover:text-zinc-300 transition-colors">
                    Despertar con propósito. La disciplina no es un castigo, es
                    la llave de tu libertad.
                  </p>
                </div>
              </div>

              {/* VALORES CORE */}
              <ul className="space-y-3 pt-8 border-t border-white/5">
                {VALUES.map((value, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-4 group cursor-default"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500/40 group-hover:bg-amber-500 transition-colors" />
                    <span className="text-xs text-zinc-400 group-hover:text-white transition-colors tracking-wide">
                      {value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────
            SECTION 2: EL ABISMO (WALLPAPER CONCEPT)
        ────────────────────────────────────────────────────────── */}
        <section className="px-6 pb-20">
          <article className="relative min-h-[70vh] rounded-sm overflow-hidden group">
            {/* Background con parallax sutil */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[3000ms] ease-out group-hover:scale-110"
              style={{
                backgroundImage:
                  "url('/images/castle-burning-sky-sunset.webp')",
              }}
            />
            <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-[2px] group-hover:backdrop-blur-none transition-all duration-1000" />

            {/* Decoración de esquinas */}
            <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-white/20" />
            <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-white/20" />

            {/* Contenido Central */}
            <div className="relative z-10 max-w-3xl mx-auto px-6 h-full flex flex-col justify-center items-center text-center space-y-8 py-24">
              <div className="space-y-4">
                <Shield className="w-8 h-8 text-amber-500 mx-auto mb-4 animate-pulse" />
                <h2 className="text-4xl md:text-6xl font-serif italic text-white tracking-tighter">
                  El abismo atrás
                </h2>
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
              </div>

              <div className="space-y-6">
                <p className="text-lg md:text-xl text-zinc-300 font-light max-w-xl mx-auto leading-relaxed">
                  Aquí no vendemos promesas. Construimos{" "}
                  <span className="text-white italic underline underline-offset-8 decoration-amber-500/50">
                    capacidades reales
                  </span>{" "}
                  para sostenerte cuando el ruido del mundo desaparece.
                </p>
                <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 font-bold">
                  No sobrevivimos al caos. Caminamos a través de él.
                </p>
              </div>

              {/* Grid de Atributos */}
              <div className="pt-12 grid grid-cols-3 gap-8 md:gap-16">
                {[
                  {
                    title: "Mente",
                    items: ["Explora", "Aprende", "Discierne"],
                  },
                  { title: "Espíritu", items: ["Lucha", "Falla", "Persiste"] },
                  { title: "Legado", items: ["Vive", "Siente", "Construye"] },
                ].map((col, idx) => (
                  <div key={idx} className="space-y-3">
                    <h5 className="text-[9px] font-black text-amber-500 uppercase tracking-widest mb-4">
                      {col.title}
                    </h5>
                    {col.items.map((item) => (
                      <p
                        key={item}
                        className="text-[10px] text-zinc-400 uppercase tracking-tighter hover:text-white transition-colors cursor-default"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                ))}
              </div>

              <button className="mt-12 group flex items-center gap-4 px-8 py-4 border border-white/10 hover:border-amber-500 transition-all">
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Unirse al Círculo
                </span>
                <Flame className="w-3 h-3 text-amber-500 group-hover:animate-bounce" />
              </button>
            </div>
          </article>
        </section>
      </main>
    </>
  );
};

export default About;
