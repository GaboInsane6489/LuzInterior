import { supabase } from "../../../config/supabase";
import { ACHIEVEMENTS_CONFIG } from "../data/achievements.config";

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
   * Obtiene un perfil público por nombre de usuario
   */
  async getProfileByUsername(username) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .ilike("username", username)
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
   * Calcula el Título de Rango basado en el nivel actual
   * Cada 5 niveles el título evoluciona.
   */
  getRankTitle(level) {
    if (level < 5) return "Neófito";
    if (level < 10) return "Iniciado";
    if (level < 15) return "Aprendiz";
    if (level < 20) return "Caminante";
    if (level < 25) return "Guerrero";
    if (level < 30) return "Veterano";
    if (level < 35) return "Maestro";
    if (level < 40) return "Gran Maestro";
    if (level < 50) return "Iluminado";
    return "Leyenda"; // 50+
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
      .select("xp, streak_current, streak_best, level")
      .eq("id", userId)
      .single();

    if (profileError) throw profileError;

    const newXp = (profile.xp || 0) + xpReward;
    const newStreak = (profile.streak_current || 0) + 1;
    const newBestStreak = Math.max(newStreak, profile.streak_best || 0);

    // Cálculo básico de nivel (ej. cada 1000 XP subes de nivel, unificado con Frontend)
    const newLevel = Math.floor(newXp / 1000) + 1;

    // 3. Actualizar el perfil
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        xp: newXp,
        streak_current: newStreak,
        streak_best: newBestStreak,
        level: newLevel,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (updateError) throw updateError;

    // 4. Verificar Logros Automáticamente
    await this.checkAndAwardAchievements(userId, {
      xp: newXp,
      streak: newStreak,
      level: newLevel,
    });

    return { newXp, newStreak, newLevel };
  },

  /**
   * Verifica condiciones y otorga logros si corresponde
   * Utiliza la configuración centralizada
   */
  async checkAndAwardAchievements(userId, stats) {
    for (const ach of ACHIEVEMENTS_CONFIG) {
      if (ach.condition(stats)) {
        // Placeholder para lógica futura de DB
      }
    }
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

  // --- MÓDULO SOCIAL Y AMIGOS ---
  /**
   * Busca usuarios por nombre de usuario o nombre completo
   * Excluye al usuario actual
   */
  async searchUsers(query, currentUserId) {
    if (!query || query.length < 3) return [];

    const { data, error } = await supabase
      .from("profiles")
      .select("id, username, full_name, level, custom_avatar_url, role")
      .neq("id", currentUserId) // No buscarse a uno mismo
      .or(`username.ilike.%${query}%,full_name.ilike.%${query}%`)
      .limit(10)
      .order("level", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Obtiene usuarios destacados para la comunidad (Carrusel)
   */
  async getCommunityUsers() {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        "id, username, full_name, level, custom_avatar_url, role, xp, streak_current",
      )
      .order("level", { ascending: false })
      .limit(20);

    if (error) throw error;
    return data || [];
  },

  /**
   * Envía una solicitud de amistad
   */

  async sendFriendRequest(fromUserId, toUserId) {
    // Verificar si ya existe una relación (cualquier estado)
    const { data: existing } = await supabase
      .from("friendships")
      .select("*")
      .or(
        `and(user_id_1.eq.${fromUserId},user_id_2.eq.${toUserId}),and(user_id_1.eq.${toUserId},user_id_2.eq.${fromUserId})`,
      )
      .maybeSingle(); // Usar maybeSingle es más seguro

    if (existing) {
      if (existing.status === "pending")
        throw new Error("Ya hay una solicitud pendiente.");
      if (existing.status === "accepted") throw new Error("Ya son amigos.");
      if (existing.status === "blocked")
        throw new Error("No puedes enviar solicitud a este usuario.");
    }

    // Insertar nueva solicitud (user_id_1 siempre es el que envía)
    const { error } = await supabase
      .from("friendships")
      .insert([
        { user_id_1: fromUserId, user_id_2: toUserId, status: "pending" },
      ]);
    if (error) throw error;
    return true;
  },
  /**
   * Acepta una solicitud de amistad pendiente
   */
  async acceptFriendRequest(requestId) {
    const { error } = await supabase
      .from("friendships")
      .update({ status: "accepted", updated_at: new Date().toISOString() })
      .eq("id", requestId);
    if (error) throw error;
    return true;
  },
  /**
   * Obtiene las solicitudes de amistad pendientes (Recibidas)
   */
  async getIncomingFriendRequests(userId) {
    const { data, error } = await supabase
      .from("friendships")
      .select(
        `
        id,
        created_at,
        sender:profiles!friendships_user_id_1_fkey (id, username, full_name, custom_avatar_url, level)
      `,
      )
      .eq("user_id_2", userId) // Yo soy el receptor (2)
      .eq("status", "pending");
    if (error) throw error;
    return data;
  },
  /**
   * Obtiene la lista de amigos confirmados
   * Esta consulta es un poco más compleja porque puedo ser user_1 o user_2
   */
  async getFriends(userId) {
    const { data, error } = await supabase
      .from("friendships")
      .select(
        `
        id,
        user_1:profiles!friendships_user_id_1_fkey (id, username, full_name, custom_avatar_url, level, role),
        user_2:profiles!friendships_user_id_2_fkey (id, username, full_name, custom_avatar_url, level, role)
      `,
      )
      .or(`user_id_1.eq.${userId},user_id_2.eq.${userId}`)
      .eq("status", "accepted");
    if (error) throw error;
    // Procesar para devolver una lista limpia de "el otro usuario"
    return data.map((relation) => {
      return relation.user_1.id === userId ? relation.user_2 : relation.user_1;
    });
  },
  /**
   * Verifica el estado de amistad con otro usuario específico
   * Retorna: null (sin relación), 'pending_sent', 'pending_received', 'accepted'
   */
  async getFriendshipStatus(myUserId, otherUserId) {
    const { data } = await supabase
      .from("friendships")
      .select("*")
      .or(
        `and(user_id_1.eq.${myUserId},user_id_2.eq.${otherUserId}),and(user_id_1.eq.${otherUserId},user_id_2.eq.${myUserId})`,
      )
      .maybeSingle();
    if (!data) return null;
    if (data.status === "accepted") return "accepted";
    if (data.status === "pending") {
      return data.user_id_1 === myUserId ? "pending_sent" : "pending_received";
    }
    return data.status; // blocked, etc.
  },
};
