import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function LooksMaxxing() {
  return (
    <section className="pt-8 pb-24 px-6 lg:px-12 bg-white text-black">
      <h2 className="text-5xl font-serif tracking-tight text-right mb-6">
        Looks Maxxing
      </h2>
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <p className="text-gray-600 max-w-md text-sm md:text-right leading-relaxed prose prose-sm">
          LooksMaxxing refers to the deliberate process of optimizing one’s
          physical appearance through structured habits, grooming, and lifestyle
          choices. It is not merely vanity but a strategic investment in
          confidence, social capital, and personal branding. At its core, it
          emphasizes discipline: consistent skincare routines, balanced
          nutrition, and regular exercise that enhance both health and
          aesthetics. Equally important is posture, body language, and the
          subtle art of presentation, which often outweigh raw genetics in
          shaping perception. Modern interpretations also include dental care,
          hair management, and fashion literacy, each serving as a layer in the
          architecture of self‑image.
        </p>
        <img
          src="/images/DesarrolloPersonal.webp"
          alt="Hombre de traje de negocios"
          className="w-full md:w-1/2 transform hover:scale-105 transition-transform duration-500 shadow-xl rounded-sm"
        />
      </div>
      <div className="flex justify-end mt-6 items-center gap-2 hover:translate-x-2 transition-transform duration-300 cursor-pointer group">
        <span className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 group-hover:border-amber-500 transition-colors">
          LooksMaxxing
        </span>
        <ArrowUpRight className="w-6 h-6 text-black group-hover:text-amber-600 transition-all duration-300 group-hover:rotate-45" />
      </div>
      <div className="flex justify-end mt-6 items-center gap-2">
        <p className="prose prose-sm prose-neutral line-clamp-[12]">
          La belleza es una moneda de cambio en el mercado social. No es un
          lujo, sino una herramienta estratégica que abre puertas y define
          percepciones. En un mundo donde las primeras impresiones se forman en
          milisegundos, la apariencia física actúa como un filtro de acceso. La
          disciplina para optimizarla demuestra autocontrol, un rasgo
          universalmente valorado en cualquier cultura. El cuidado personal no
          es vanidad; es la arquitectura de la confianza, la primera línea de
          defensa contra la invisibilidad social. Invertir en la propia imagen
          es invertir en credibilidad, porque transmite orden, coherencia y
          respeto hacia uno mismo. La estética, cuando se sostiene en hábitos
          consistentes, se convierte en un lenguaje silencioso que comunica
          seguridad. No se trata de perfección, sino de intención: mostrar que
          cada detalle responde a una elección consciente. Así, la belleza deja
          de ser superficial y se transforma en estrategia, un recurso que
          amplifica oportunidades. Quien cuida su presencia construye un puente
          hacia la atención de los demás, evitando quedar relegado al anonimato.
          La apariencia, entonces, es un espejo de disciplina y un recordatorio
          de que la confianza empieza en lo visible. En última instancia, la
          belleza es un acto de responsabilidad: la manera más inmediata de
          narrar quiénes somos.
        </p>
      </div>
      <div className="w-full max-w-7xl mx-auto rounded-xl overflow-hidden shadow-2xl mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 text-white bg-black pt-12 pb-12">
        <iframe
          className="w-full aspect-video hover:transition-transform hover:scale-[0.98] transition-transform duration-500 pl-0 md:pl-6"
          src="https://www.youtube-nocookie.com/embed/0Ub3KgX9LUI"
          title="LooksMaxxing - La Belleza como Estrategia"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-presentation"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="flex flex-col gap-6">
          <h4 className="text-2xl font-serif tracking-tight mb-6 text-center">
            La Belleza Como Estrategia
          </h4>
          <div className="flex flex-col gap-6">
            <p className="text-white max-w-md text-sm md:text-right leading-relaxed prose prose-sm">
              El LooksMaxxing es una tendencia que se ha vuelto muy popular en
              los últimos años. Se trata de una serie de prácticas que buscan
              mejorar la apariencia física de una persona. Se puede encontrar en
              internet mucha información sobre el tema, pero es importante tener
              en cuenta que no todo lo que se dice es cierto. Por eso es
              importante investigar y informarse bien antes de empezar a
              practicar LooksMaxxing.
            </p>
            <p className="text-white max-w-md text-sm md:text-right leading-relaxed prose prose-sm">
              Puedes encontrar buenos videos sobre el tema en Youtube. Te
              recomiendo el canal de "LIRYKAL" con contenido de calidad y bien
              fundamentado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
