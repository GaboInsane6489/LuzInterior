import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

/**
 * Envoltorio para rutas que requieren autenticación.
 * Muestra un estado de carga mientras se verifica la sesión.
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-amber-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
