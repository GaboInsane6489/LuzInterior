import { Link } from "react-router-dom";
import { Sparkles, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Optimización de rendimiento: Event Listener pasivo para el scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Clases dinámicas para efecto "Glassmorphism" al hacer scroll
  const navClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
    scrolled
      ? "bg-black/80 backdrop-blur-md py-4 shadow-lg border-b border-white/10"
      : "bg-transparent py-6"
  }`;

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center text-white">
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 group relative z-50"
          onClick={() => setIsOpen(false)}
        >
          <Sparkles className="w-5 h-5 text-amber-300 transition-transform duration-700 group-hover:rotate-180" />
          <span className="text-xl font-bold tracking-widest uppercase">
            Luz Interior
          </span>
        </Link>

        {/* MENÚ DESKTOP */}
        <div className="hidden md:flex gap-10 items-center">
          {["Inicio", "Filosofía", "Recursos"].map((item) => (
            <Link
              key={item}
              to="/"
              className="text-sm font-medium tracking-widest hover:text-amber-300 transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-300 transition-all duration-300 ease-out group-hover:w-full"></span>
            </Link>
          ))}

          <Link
            to="/contact"
            className="border border-white/30 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:scale-105 transition-all duration-300"
          >
            Contacto
          </Link>
        </div>

        {/* BOTÓN MENÚ MÓVIL */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white relative z-50 focus:outline-none"
          aria-label="Abrir menú"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>

        {/* OVERLAY MÓVIL (ANIMACIÓN DE CORTINA) */}
        <div
          className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 ease-in-out md:hidden ${
            isOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-full"
          }`}
        >
          {["Inicio", "Filosofía", "Recursos"].map((item, index) => (
            <Link
              key={item}
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-3xl font-light text-white tracking-widest hover:text-amber-300 transition-colors"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {item}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="mt-4 px-8 py-3 bg-white text-black font-bold uppercase tracking-widest rounded-full"
          >
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
