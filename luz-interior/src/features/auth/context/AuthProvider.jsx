import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "../../../config/supabase";
import { authService } from "../services/auth.service";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const isInitialMount = useRef(true);

  /**
   * Limpia y mejora la calidad de la URL del avatar de Google
   */
  const sanitizeAvatarUrl = (url) => {
    if (!url) return url;
    // Si es de Google, forzamos alta resolución (cambiando =s96-c por =s400-c)
    if (url.includes("googleusercontent.com")) {
      return url.replace(/=s\d+(-c)?/, "=s400-c");
    }
    return url;
  };

  const fetchProfileDirectly = useCallback(async (u) => {
    if (!u) {
      setProfile(null);
      return;
    }

    try {
      // Intentamos obtener el perfil directamente desde aquí para evitar dependencias circulares
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", u.id)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        // Autocuración: Si no existe el perfil, lo creamos
        const email = u.email;
        const fullName = u.user_metadata?.full_name;
        const avatarUrl = sanitizeAvatarUrl(u.user_metadata?.avatar_url);

        const username = email
          ? email.split("@")[0] + "_" + Math.floor(Math.random() * 1000)
          : `user_${u.id.slice(0, 5)}`;

        const { data: newProfile, error: createError } = await supabase
          .from("profiles")
          .insert([
            {
              id: u.id,
              full_name: fullName,
              username: username,
              avatar_url: avatarUrl,
              level: 1,
              xp: 0,
            },
          ])
          .select()
          .single();

        if (createError) throw createError;
        setProfile(newProfile);
        return;
      }

      // Sincronización de metadatos (Avatar y Nombre)
      const fullName = u.user_metadata?.full_name;
      const avatarUrl = sanitizeAvatarUrl(u.user_metadata?.avatar_url);
      const updates = {};

      if (fullName && fullName !== data.full_name) updates.full_name = fullName;
      if (avatarUrl && avatarUrl !== data.avatar_url)
        updates.avatar_url = avatarUrl;

      if (Object.keys(updates).length > 0) {
        const { data: updatedProfile } = await supabase
          .from("profiles")
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq("id", u.id)
          .select()
          .single();
        if (updatedProfile) setProfile(updatedProfile);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error("Error al sincronizar perfil:", error);
    }
  }, []);

  useEffect(() => {
    // 1. Verificar sesión actual al montar
    const initAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        if (currentUser) {
          await fetchProfileDirectly(currentUser);
        }
      } catch (err) {
        console.error("Error inicializando auth:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isInitialMount.current) {
      initAuth();
      isInitialMount.current = false;
    }

    // 2. Escuchar cambios de estado
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const newUser = session?.user || null;
      setUser(newUser);

      // Lanzamos la sincronización de perfil sin bloquear el hilo principal del evento
      if (newUser) {
        fetchProfileDirectly(newUser);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [fetchProfileDirectly]);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        login: authService.loginWithGoogle,
        logout: authService.logout,
        refreshProfile: () => fetchProfileDirectly(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
