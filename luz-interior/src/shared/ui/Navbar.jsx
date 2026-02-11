import { Link } from "react-router-dom";
import { Sparkles, Menu, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import { NAV_LINKS } from "../../config/constants";
import { useAuth } from "../../features/auth/hooks/useAuth";

const Navbar = () => {
  const { user, profile, loading, login, logout } = useAuth();

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

  /**
   * Limpia y mejora la calidad de la URL del avatar de Google
   */
  const sanitizeAvatarUrl = (url) => {
    if (!url) return url;
    if (url.includes("googleusercontent.com")) {
      return url.replace(/=s\d+(-c)?/, "=s400-c");
    }
    return url;
  };

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
          <img
            src="/images/LogoDragonTrofeo.ico"
            alt="Logo Dragon"
            className="w-10 h-10 rounded-full border-2 border-amber-300 group-hover:scale-110 transition-transform duration-300"
          />
          <span className="text-xl font-bold tracking-widest uppercase">
            Luz Interior
          </span>
        </Link>

        {/* MENÚ DESKTOP */}
        <div className="hidden md:flex gap-10 items-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm font-medium tracking-widest hover:text-amber-300 transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-300 transition-all duration-300 ease-out group-hover:w-full"></span>
            </Link>
          ))}

          <Link
            to="/CodexPage"
            className="border border-white/30 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:scale-105 transition-all duration-300"
          >
            Codex
          </Link>

          <Link
            to="/contact"
            className="bg-amber-300 text-black px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-all duration-300"
          >
            Contacto
          </Link>
        </div>

        {/* 3. Lógica de Auth en Desktop */}
        {loading ? (
          <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse">
            <span className="animate-pulse">Cargando...</span>
          </div>
        ) : user ? (
          <div className="flex items-center gap-6">
            <Link
              to="/dojo"
              className="flex items-center gap-3 group hover:opacity-80 transition-all"
            >
              <img
                src={sanitizeAvatarUrl(
                  profile?.custom_avatar_url ||
                    profile?.avatar_url ||
                    user?.user_metadata?.avatar_url,
                )}
                alt={profile?.full_name || user?.user_metadata?.full_name}
                className="w-10 h-10 rounded-full border-2 border-amber-300 group-hover:scale-110 transition-transform"
                referrerPolicy="no-referrer"
              />
              <span className="hidden lg:block text-xs font-bold uppercase tracking-widest">
                Mi Dojo
              </span>
            </Link>
            <button
              onClick={logout}
              className="text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors"
            >
              Salir
            </button>
          </div>
        ) : (
          <button
            onClick={login}
            className="flex items-center gap-2 border border-amber-300/50 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-amber-300 hover:text-black transition-all duration-300"
          >
            <User className="w-4 h-4" />
            Login
          </button>
        )}

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
          {NAV_LINKS.map((link, index) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className="text-3xl font-light text-white tracking-widest hover:text-amber-300 transition-colors"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/CodexPage"
            onClick={() => setIsOpen(false)}
            className="mt-4 px-8 py-3 border border-white/30 text-white font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all"
          >
            Codex
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="px-8 py-3 bg-amber-300 text-black font-bold uppercase tracking-widest rounded-full hover:bg-white transition-all"
          >
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
