import { supabase } from "../../../config/supabase";

export const authService = {
  /**
   * Inicia el flujo de autenticación con Google.
   * Redirige al usuario al portal de Google.
   */
  loginWithGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // Asegura que el usuario regrese a la raíz de tu sitio tras el login
        redirectTo: window.location.origin,
      },
    });
    if (error) throw error; // Lanzamos el error para que la UI lo atrape
    return data;
  },
  /**
   * Cierra la sesión del usuario actual en Supabase.
   */
  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
  /**
   * Obtiene la información del usuario autenticado actualmente.
   */
  getCurrentUser: async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },
};
