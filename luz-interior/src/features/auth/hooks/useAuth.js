import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Hook personalizado para acceder al estado de autenticación global.
 * @returns {Object} { user, loading, login, logout }
 * @throws {Error} Si se usa fuera del AuthContextProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthContextProvider");
  }
  return context;
};
