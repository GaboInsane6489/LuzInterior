import React from "react";
import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

/**
 * GlobalErrorBoundary - Senior Error Handling
 *
 * Por qué esto es necesario?
 * 1. Resiliencia: Evita "pantallazos blancos" de la muerte.
 * 2. UX: Da una salida clara al usuario cuando algo falla (ej. red, error de lógica).
 * 3. Debugging: Captura el error para que sepamos qué pasó.
 */
export default function GlobalErrorBoundary() {
  const error = useRouteError();
  console.error("ErrorBoundary caught:", error);

  let title = "Algo salió mal en el Dojo";
  let message =
    "Hubo un error inesperado. Nuestros maestros están trabajando en ello.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "404 - Camino No Encontrado";
      message = "Has intentado acceder a un área del Dojo que aún no existe.";
    } else if (error.status === 401) {
      title = "401 - Acceso Denegado";
      message = "No tienes permiso para entrar aquí. Identifícate primero.";
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white font-serif">
      <div className="max-w-md w-full bg-zinc-900/40 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] text-center space-y-8 shadow-[0_0_100px_rgba(255,0,0,0.05)]">
        <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto border border-red-500/20">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl tracking-tighter">{title}</h1>
          <p className="text-gray-500 text-sm leading-relaxed">{message}</p>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-xs uppercase tracking-widest hover:bg-amber-300 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Reintentar
          </button>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            <Home className="w-4 h-4" />
            Volver al Inicio
          </Link>
        </div>

        {import.meta.env.DEV && (
          <div className="mt-8 p-4 bg-red-500/5 rounded-xl border border-red-500/10 text-left">
            <p className="text-[10px] text-red-400 font-mono break-all">
              {error?.message || JSON.stringify(error)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
