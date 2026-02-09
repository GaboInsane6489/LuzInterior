import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  ScrollText,
  ShieldCheck,
  GitCommit,
  ArrowRight,
} from "lucide-react";

/**
 * CODEX
 * Registro oficial del sistema.
 * Cambios, decisiones y evolución documentada del sistema.
 */
export default function CodexPage() {
  return (
    <section className="relative w-full bg-black py-20 overflow-hidden border-t border-white/5">
      {/* ATMÓSFERA */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 space-y-24">
        {/* HERO */}
        <header className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-amber-400" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-amber-300 font-bold">
              Documento Vivo
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-serif tracking-tighter leading-[0.9]">
            Codex
            <br />
            <span className="italic font-light text-amber-200/40">
              del Dojo
            </span>
          </h1>

          <p className="max-w-2xl text-gray-400 text-lg leading-relaxed">
            El Codex registra cada cambio relevante del sistema.
            <br />
            Nada aquí es improvisado. Todo queda documentado.
          </p>
        </header>

        {/* PRINCIPIOS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              icon: ShieldCheck,
              title: "Transparencia",
              desc: "Cada decisión técnica y filosófica queda registrada.",
            },
            {
              icon: GitCommit,
              title: "Evolución",
              desc: "El sistema cambia solo cuando mejora al practicante.",
            },
            {
              icon: BookOpen,
              title: "Continuidad",
              desc: "Nada se pierde. Todo se acumula como experiencia.",
            },
          ].map((item, i) => (
            <div key={i} className="space-y-4">
              <item.icon className="w-6 h-6 text-amber-400" />
              <h3 className="text-white uppercase tracking-widest text-xs font-bold">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </section>

        {/* REGISTROS */}
        <section className="space-y-12">
          <div className="flex items-center gap-4">
            <ScrollText className="w-6 h-6 text-amber-400" />
            <h2 className="text-3xl md:text-4xl font-serif">
              Actualizaciones del Sistema
            </h2>
          </div>

          <div className="space-y-10">
            {[
              {
                version: "v1.4.0",
                date: "2026 · Enero",
                changes: [
                  "Introducción del sistema de niveles",
                  "Optimización del rendimiento general",
                  "Nuevo diseño editorial del Dojo",
                ],
              },
              {
                version: "v1.3.2",
                date: "2025 · Diciembre",
                changes: [
                  "Refactor del sistema de hábitos",
                  "Correcciones de estabilidad",
                ],
              },
            ].map((log, i) => (
              <div key={i} className="border-l border-white/10 pl-8 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
                    {log.version}
                  </span>
                  <span className="text-gray-500 text-xs">{log.date}</span>
                </div>

                <ul className="space-y-2 text-gray-400 text-sm">
                  {log.changes.map((c, idx) => (
                    <li key={idx}>— {c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <footer className="pt-12 border-t border-white/5">
          <Link
            to="/dojo"
            className="inline-flex items-center gap-4 text-amber-400 uppercase tracking-widest text-xs font-bold hover:text-amber-300 transition-colors"
          >
            Volver al Dojo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </footer>
      </div>
    </section>
  );
}
