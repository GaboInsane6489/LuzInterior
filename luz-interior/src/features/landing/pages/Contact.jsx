import React from "react";
import { Mail, ShieldCheck, Send, Compass } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="relative w-full bg-black py-16 lg:py-24 overflow-hidden border-t-2 border-amber-500/20">
      {/* ATMÓSFERA CON MÁS VIBRACIÓN */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* COLUMNA IZQUIERDA: NARRATIVA CON ALTO CONTRASTE */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-[2px] w-12 bg-amber-400" />
                <span className="text-xs font-black uppercase tracking-[0.4em] text-amber-400">
                  Canal de Intención
                </span>
              </div>

              <h1 className="text-7xl md:text-8xl font-serif text-white tracking-tighter leading-[0.85]">
                Contacto <br />
                <span className="italic font-light text-amber-400">
                  Directo
                </span>
              </h1>

              <p className="text-zinc-100 text-xl font-light leading-relaxed max-w-md">
                No procesamos tickets. Leemos{" "}
                <span className="text-amber-400 font-bold italic">
                  visiones
                </span>
                . Cada palabra importa en este espacio.
              </p>
            </div>

            {/* VALORES CON COLORES INTENSOS */}
            <div className="space-y-8 pt-4">
              <div className="flex gap-6 items-start group">
                <div className="p-3 border-2 border-amber-500/50 bg-zinc-900 group-hover:border-amber-400 transition-colors">
                  <ShieldCheck className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-black uppercase tracking-widest mb-1">
                    Privacidad Total
                  </h4>
                  <p className="text-zinc-300 text-sm">
                    Tu mensaje es sagrado. Sin rastreadores.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="p-3 border-2 border-amber-500/50 bg-zinc-900 group-hover:border-amber-400 transition-colors">
                  <Compass className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-black uppercase tracking-widest mb-1">
                    Humano a Humano
                  </h4>
                  <p className="text-zinc-300 text-sm">
                    Sin automatizaciones. Respuestas reales.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: FORMULARIO DEFINIDO */}
          <div className="lg:col-span-7 relative">
            <form className="relative bg-zinc-900 border-2 border-zinc-700 p-8 md:p-12 space-y-8 shadow-[0_0_50px_rgba(0,0,0,1)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs con bordes más gruesos y texto claro */}
                <div className="space-y-3 group">
                  <label className="text-xs uppercase tracking-widest text-amber-400 font-black">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="w-full bg-black border-2 border-zinc-700 p-3 text-base text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                    placeholder="Tu Identidad"
                  />
                </div>
                <div className="space-y-3 group">
                  <label className="text-xs uppercase tracking-widest text-amber-400 font-black">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-black border-2 border-zinc-700 p-3 text-base text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                    placeholder="nexo@digital.com"
                  />
                </div>
              </div>

              <div className="space-y-3 group">
                <label className="text-xs uppercase tracking-widest text-amber-400 font-black">
                  Tu Mensaje
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-black border-2 border-zinc-700 p-4 text-base text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all resize-none"
                  placeholder="¿Qué buscas en el Dojo?"
                />
              </div>

              <button
                type="submit"
                className="group w-full md:w-auto flex items-center justify-center gap-6 bg-amber-400 text-black px-12 py-5 text-xs font-black uppercase tracking-[0.4em] hover:bg-white hover:scale-[1.05] active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(251,191,36,0.3)]"
              >
                Transmitir Intención
                <Send className="w-4 h-4 stroke-[3px]" />
              </button>
            </form>
          </div>
        </div>

        {/* FOOTER DE PÁGINA: TEXTO MÁS CLARO */}
        <div className="mt-24 pt-8 border-t-2 border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-300 font-bold">
            El silencio también es comunicación.
          </p>
          <div className="flex gap-8">
            <a
              href="mailto:info@dojo.com"
              className="text-amber-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              <span className="text-xs font-black uppercase">Escríbenos</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
