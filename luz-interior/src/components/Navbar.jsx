import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-light bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600"
        >
          Luz Interior
        </Link>
        {/* MENÚ */}
        <div className="flex gap-6">
          <Link
            to="/"
            className="text-gray-200 hover:text-white transition-colors font-light"
          >
            Inicio
          </Link>
          <Link
            to="/about"
            className="text-gray-200 hover:text-white transition-colors font-light"
          >
            Nosotros
          </Link>
          <Link
            to="/contact"
            className="text-gray-200 hover:text-white transition-colors font-light"
          >
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
