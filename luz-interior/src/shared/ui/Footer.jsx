import React from "react";
import { Sparkles, Instagram, Linkedin, Github, Twitter } from "lucide-react";
import { SOCIAL_LINKS } from "../../config/constants";

const SocialItems = [
  {
    Icon: Instagram,
    href: SOCIAL_LINKS.Instagram,
  },
  {
    Icon: Linkedin,
    href: SOCIAL_LINKS.LinkedIn,
  },
  {
    Icon: Github,
    href: SOCIAL_LINKS.GitHub,
  },
  {
    Icon: Twitter,
    href: SOCIAL_LINKS.Twitter,
  },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-center md:text-left">
        {/* COLUMNA 1: Marca */}
        <div className="col-span-1 md:col-span-2 space-y-6 flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span className="text-xl font-bold tracking-widest uppercase">
              Luz Interior
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
            Una plataforma dedicada a la reconstrucción del ser a través de la
            disciplina, el autoconocimiento y la comunidad. Tu paz no es
            negociable.
          </p>

          {/* Redes Sociales */}
          <div className="flex gap-4 pt-2 justify-center md:justify-start">
            {SocialItems.map((item, i) => (
              <a
                key={i}
                target="_blank"
                rel="noopener noreferrer"
                href={item.href}
                className="w-10 h-10 border border-white/20 flex items-center justify-center rounded-full hover:bg-white hover:text-black hover:-translate-y-1 transition-all duration-300"
                aria-label="Social Link"
              >
                <item.Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* COLUMNA 2: Navegación */}
        <div className="space-y-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">
            Explorar
          </h4>
          <ul className="space-y-4 text-sm text-white">
            {[
              { label: "Manifiesto", href: "#" },
              { label: "Recursos Gratuitos", href: "#" },
              { label: "Historias Reales", href: "#" },
              { label: "Contacto", href: "/contact" },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="hover:text-amber-400 transition-colors inline-block hover:translate-x-1 duration-200"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMNA 3: Legal */}
        <div className="space-y-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">
            Legal
          </h4>
          <ul className="space-y-4 text-sm text-white">
            {["Privacidad", "Términos de Uso", "Cookies"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-amber-400 transition-colors inline-block hover:translate-x-1 duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-white/10 pt-8 text-center">
        <p className="text-gray-400 text-xs tracking-widest">
          © {new Date().getFullYear()} Luz Interior. Desarrollado por Gabriel
          González / Senior Full Stack Developer.
        </p>
      </div>
    </footer>
  );
}
