import React from "react";
import { Loader2 } from "lucide-react";

/**
 * DojoLoader - Premium Fallback Component
 *
 * Por qué esto es "Senior"?
 * 1. Mantiene la estética: Usa el mismo desenfoque y colores que la app.
 * 2. UX: Reduce el "layout shift" al ocupar el espacio necesario.
 * 3. Branding: Refuerza la identidad visual (ámbar + negro) incluso cargando.
 */
export default function DojoLoader() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center space-y-6 animate-pulse">
      {/* Logo Placeholder */}
      <div className="w-16 h-16 bg-amber-300/10 rounded-2xl border border-amber-300/20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-300 animate-spin" />
      </div>

      {/* Skeleton Text */}
      <div className="space-y-3 flex flex-col items-center">
        <div className="h-4 w-48 bg-white/5 rounded-full"></div>
        <div className="h-3 w-32 bg-white/5 rounded-full"></div>
      </div>

      {/* Skeleton Grid (Simulando Bento) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-12 px-4">
        <div className="h-48 col-span-2 bg-white/5 rounded-[2.5rem] border border-white/5"></div>
        <div className="h-48 bg-white/5 rounded-[2.5rem] border border-white/5"></div>
      </div>
    </div>
  );
}
