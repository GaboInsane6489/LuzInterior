import React from "react";
import { Mail, MessageSquare, ShieldCheck, ArrowRight } from "lucide-react";

/**
 * ContactPage — Umbral de Contacto
 * Replica el lenguaje visual del Dojo:
 * editorial, oscuro, tipografía expresiva y foco en ritual.
 */
export default function ContactPage() {
  return (
    <section className="relative w-full bg-gradient-to-b from-amber-500/30 to-black py-20 lg:py-32 overflow-hidden border-t border-white/5">
      {/* ATMÓSFERA */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-6 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-amber-400" />
                <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-amber-300">
                  Canal Seguro
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl font-serif text-white tracking-tighter leading-[0.9]">
                Contacto
                <br />
                <span className="italic font-light text-amber-200/40 relative">
                  Directo
                  <span className="absolute -bottom-3 left-0 w-full h-[1px] bg-gradient-to-r from-amber-300/50 to-transparent" />
                </span>
              </h1>
            </div>

            <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-xl">
              Este no es un formulario genérico. Es un
              <span className="text-white font-medium italic">
                {" "}
                canal de comunicación consciente
              </span>
              .
              <br />
              Cada mensaje se lee. Cada palabra importa.
            </p>

            {/* VALORES */}
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="space-y-3">
                <ShieldCheck className="w-6 h-6 text-amber-400" />
                <p className="text-white text-xs uppercase tracking-widest font-bold">
                  Privacidad
                </p>
                <p className="text-gray-500 text-xs">
                  Sin tracking invasivo. Sin ruido.
                </p>
              </div>
              <div className="space-y-3">
                <Mail className="w-6 h-6 text-amber-400" />
                <p className="text-white text-xs uppercase tracking-widest font-bold">
                  Respuesta real
                </p>
                <p className="text-gray-500 text-xs">
                  No bots. No automatismos vacíos.
                </p>
              </div>
            </div>
          </div>

          {/* FORMULARIO */}
          <div className="lg:col-span-6 relative">
            {/* Marco flotante */}
            <div className="absolute -inset-6 border border-amber-300/10 -z-10 translate-x-4 translate-y-4" />

            <form className="relative bg-zinc-900/60 backdrop-blur rounded-sm border border-white/10 p-10 space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                  Nombre
                </label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                  Mensaje
                </label>
                <textarea
                  rows={5}
                  placeholder="Escribe con intención"
                  className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="group inline-flex items-center gap-4 bg-amber-400 text-black px-10 py-5 text-xs font-bold uppercase tracking-[0.3em] hover:bg-white transition-all duration-700 shadow-[0_0_40px_rgba(245,158,11,0.15)]"
              >
                Enviar mensaje
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-24 pt-6 border-t border-white/5 text-center">
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
            El silencio también comunica. Escribe solo si es necesario.
          </p>
        </div>
      </div>
    </section>
  );
}
