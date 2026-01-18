import { supabase } from "../../../config/supabase";
export const dojoService = {
  /**
   * Obtiene el perfil extendido del usuario (XP, Nivel, Racha)
   */
  async getProfile(userId) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;
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
   * Registra el progreso diario de un reto
   */
  async logDailyProgress(userId, challengeId) {
    const { data, error } = await supabase
      .from("challenge_logs")
      .insert([{ user_id: userId, challenge_id: challengeId }]);

    if (error) throw error;
    return data;
  },
};
