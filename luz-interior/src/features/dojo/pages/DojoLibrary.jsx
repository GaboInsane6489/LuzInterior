import React from "react";
import { Helmet } from "react-helmet-async";
import { Book, Lock } from "lucide-react";

export default function DojoLibrary() {
  return (
    <>
      <Helmet>
        <title>Biblioteca | El Dojo</title>
      </Helmet>

      <section className="space-y-10">
        <div className="flex items-center justify-between border-b border-white/5 pb-6">
          <div className="space-y-2">
            <h3 className="text-3xl font-serif">Biblioteca de Conocimiento</h3>
            <p className="text-gray-500 text-sm">
              Recursos para tu transformación.
            </p>
          </div>
        </div>

        {/* Placeholder para contenido futuro */}
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center space-y-8">
          <div className="w-32 h-32 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10">
            <Book className="w-16 h-16 text-gray-700" />
          </div>

          <div className="space-y-4 max-w-md">
            <h4 className="text-2xl font-serif text-white/80">Próximamente</h4>
            <p className="text-gray-500 leading-relaxed">
              Esta sección contendrá artículos, guías, videos y recursos
              educativos para potenciar tu desarrollo personal.
            </p>
          </div>

          <div className="flex items-center gap-2 text-amber-300/60 text-xs uppercase tracking-widest">
            <Lock className="w-4 h-4" />
            <span>En construcción</span>
          </div>
        </div>
      </section>
    </>
  );
}
