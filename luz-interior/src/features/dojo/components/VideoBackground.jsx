import React from "react";
import PropTypes from "prop-types";

/**
 * VideoBackground Component (Tech Lead Level)
 *
 * Por qué este enfoque?
 * 1. Abstracción: No ensucia el Layout principal.
 * 2. Performance: Usa atributos nativos para carga eficiente.
 * 3. UX: El overlay asegura que el contenido sea legible.
 */
export default function VideoBackground({ src, poster, overlayOpacity = 0.5 }) {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden bg-black">
      {/* 
        Overlay de Contraste: 
        Asegura que el texto blanco siempre sea legible sin importar los colores del video.
      */}
      <div
        className="absolute inset-0 z-10"
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
      />

      {/* 
        Video Tag Optimizado:
        - autoPlay: Para que inicie solo.
        - muted: Requerido por navegadores para permitir autoPlay.
        - loop: Reproducción infinita.
        - playsInline: Evita que iOS lo abra en pantalla completa.
        - preload="auto": Intenta descargar los metadatos de inmediato.
      */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        className="absolute w-full h-full object-cover select-none pointer-events-none"
      >
        <source
          src={src}
          type={src.endsWith(".webm") ? "video/webm" : "video/mp4"}
        />
        {/* Fallback para navegadores antiguos */}
        Tu navegador no soporta videos.
      </video>
    </div>
  );
}

VideoBackground.propTypes = {
  src: PropTypes.string.isRequired,
  poster: PropTypes.string, // Imagen que se ve mientras carga el video
  overlayOpacity: PropTypes.number,
};
