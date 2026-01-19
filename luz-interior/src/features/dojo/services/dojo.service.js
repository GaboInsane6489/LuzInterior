import { supabase } from "../../../config/supabase";
export const dojoService = {
  async getProfile(userId, fullName, email) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle(); // maybeSingle no arroja error si no hay resultados, solo regresa null

    if (error) throw error;

    // Si no existe el perfil (autocuración), lo creamos
    if (!data) {
      const username = email
        ? email.split("@")[0] + "_" + Math.floor(Math.random() * 1000)
        : `user_${userId.slice(0, 5)}`;
      const { data: newProfile, error: createError } = await supabase
        .from("profiles")
        .insert([
          {
            id: userId,
            full_name: fullName,
            username: username,
            level: 1,
            xp: 0,
          },
        ])
        .select()
        .single();

      if (createError) throw createError;
      return newProfile;
    }

    return data;
  },
  /**
   * Obtiene los retos activos disponibles en el sistema
   */
  async getChallenges() {
    const { data, error } = await supabase
      .from("challenges")
      .select("*")
      .eq("is_active", true);

    if (error) throw error;
    return data;
  },
  /**
   * Registra el progreso diario de un reto y actualiza el perfil del usuario (XP y Racha)
   */
  async logDailyProgress(userId, challengeId, xpReward) {
    // 1. Insertar el log de progreso diario
    const { error: logError } = await supabase
      .from("challenge_logs")
      .insert([{ user_id: userId, challenge_id: challengeId }]);

    // Si el error es por duplicado (ya se registró hoy), lo manejamos
    if (logError && logError.code === "23505") {
      throw new Error("Ya has registrado este reto hoy.");
    }
    if (logError) throw logError;

    // 2. Obtener datos actuales para calcular el nuevo XP y Racha
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("xp, streak_current, streak_best")
      .eq("id", userId)
      .single();

    if (profileError) throw profileError;

    const newXp = (profile.xp || 0) + xpReward;
    const newStreak = (profile.streak_current || 0) + 1;
    const newBestStreak = Math.max(newStreak, profile.streak_best || 0);

    // 3. Actualizar el perfil
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        xp: newXp,
        streak_current: newStreak,
        streak_best: newBestStreak,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (updateError) throw updateError;

    return { newXp, newStreak };
  },

  /**
   * Obtiene todos los logros disponibles en el catálogo
   */
  async getAllAchievements() {
    const { data, error } = await supabase
      .from("achievements")
      .select("*")
      .order("xp_reward", { ascending: true });

    if (error) throw error;
    return data;
  },

  /**
   * Obtiene los logros que el usuario ya ha desbloqueado
   */
  async getUserAchievements(userId) {
    const { data, error } = await supabase
      .from("user_achievements")
      .select(
        `
        achievement_id,
        earned_at,
        achievements (*)
      `,
      )
      .eq("user_id", userId);

    if (error) throw error;
    return data;
  },
};
