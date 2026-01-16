import { useEffect, useState } from "react";
import { supabase } from "../../../config/supabase";
import { authService } from "../services/auth.service";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error al obtener el usuario", error);
      } finally {
        setLoading(false);
      }
    };
    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login: authService.loginWithGoogle,
        logout: authService.logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
