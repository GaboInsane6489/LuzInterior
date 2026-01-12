const Footer = () => {
  return (
    <footer className="bg-black/80 backdrop-blur-md border-t border-white text-gray-400 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="mb-4 font-light">
          © {new Date().getFullYear()} Luz Interior. Todos los derechos
          reservados.
        </p>
        <div className="flex justify-center gap-4 text-sm font-light">
          <a href="#" className="hover:text-blue-400 transition-colors">
            Términos
          </a>
          <a href="#" className="hover:text-blue-400 transition-colors">
            Privacidad
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
