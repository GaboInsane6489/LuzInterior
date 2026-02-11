import { supabase } from "../../../config/supabase";
import { ACHIEVEMENTS_CONFIG } from "../data/achievements.config";

export const dojoService = {
  async getProfile(userId, fullName, email, avatarUrl) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

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
            avatar_url: avatarUrl,
            level: 1,
            xp: 0,
          },
        ])
        .select()
        .single();

      if (createError) throw createError;
      return newProfile;
    }

    // Sincronización básica: si el nombre o el avatar cambiaron en Google, actualizar profiles
    // Solo actualizamos si los valores de Google son válidos y distintos a los actuales
    const updates = {};
    if (fullName && fullName !== data.full_name) updates.full_name = fullName;
    if (avatarUrl && avatarUrl !== data.avatar_url)
      updates.avatar_url = avatarUrl;

    if (Object.keys(updates).length > 0) {
      const { data: updatedProfile } = await supabase
        .from("profiles")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", userId)
        .select()
        .single();
      if (updatedProfile) return updatedProfile;
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
   * Obtiene usuarios destacados para el carrusel de la comunidad.
   * Excluye al usuario actual si se proporciona su ID.
   */
  getCommunityUsers: async (currentUserId = null) => {
    let query = supabase.from("profiles").select("*").limit(10);

    if (currentUserId) {
      query = query.neq("id", currentUserId);
    }

    const { data, error } = await query;
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
   * Obtiene la actividad reciente del usuario (últimos 5 retos completados)
   */
  async getUserRecentActivity(userId) {
    const { data, error } = await supabase
      .from("challenge_logs")
      .select(
        `
        id,
        logged_at,
        xp_earned,
        challenges ( title, category )
      `,
      )
      .eq("user_id", userId)
      .order("logged_at", { ascending: false })
      .limit(5);

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

    // 2. Calcular Racha basada en logs
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split("T")[0];

    // Verificar si ya hubo actividad HOY (excluyendo el insert actual si fuera posible, pero mejor contamos total)
    const { count: logsToday } = await supabase
      .from("challenge_logs")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", today); // Logs de hoy

    // Verificar si hubo actividad AYER
    // Nota: Podríamos optimizar esto guardando last_activity_at en profile,
    // pero consultar logs es más "source-of-truth".
    // Para simplificar query, buscamos logs creados entre ayer y hoy.
    const { count: logsYesterday } = await supabase
      .from("challenge_logs")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", yesterday)
      .lt("created_at", today);

    // 3. Obtener perfil actual
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("xp, streak_current, streak_best, level")
      .eq("id", userId)
      .single();

    if (profileError) throw profileError;

    let newStreak = profile.streak_current || 0;

    // Lógica de Racha
    if (logsToday > 1) {
      // Ya había actividad hoy, no aumentamos racha (ya se contó con el primer log)
      // newStreak se mantiene igual
    } else {
      // Es la primera actividad de hoy
      if (logsYesterday > 0) {
        // Hubo actividad ayer -> Racha continúa
        newStreak += 1;
      } else {
        // No hubo actividad ayer -> Racha se reinicia (o empieza)
        newStreak = 1;
      }
    }

    const newXp = (profile.xp || 0) + xpReward;
    const newBestStreak = Math.max(newStreak, profile.streak_best || 0);

    // Cálculo básico de nivel (ej. cada 1000 XP subes de nivel, unificado con Frontend)
    const newLevel = Math.floor(newXp / 1000) + 1;

    // 4. Actualizar el perfil
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

    // 5. Notificar si hubo subida de nivel
    if (newLevel > (profile.level || 1)) {
      await this.createNotification(
        userId,
        "level_up",
        "¡Has subido de nivel!",
        `¡Felicidades! Ahora eres Nivel ${newLevel}: ${this.getRankTitle(newLevel)}.`,
      );
    }

    return { newXp, newStreak, newLevel };
  },

  /**
   * Verifica condiciones y otorga logros si corresponde
   * Utiliza la configuración centralizada
   */
  async checkAndAwardAchievements(userId, stats) {
    try {
      // 1. Obtener todos los logros del catálogo
      const { data: allAchievements } = await supabase
        .from("achievements")
        .select("*");
      if (!allAchievements) return;

      // 2. Obtener logros ya obtenidos por el usuario
      const { data: unlocked } = await supabase
        .from("user_achievements")
        .select("achievement_id")
        .eq("user_id", userId);

      const unlockedIds = new Set(unlocked?.map((a) => a.achievement_id) || []);

      for (const achConfig of ACHIEVEMENTS_CONFIG) {
        if (achConfig.condition(stats)) {
          // Buscar el logro correspondiente en la DB por icon_slug
          const dbAch = allAchievements.find(
            (a) => a.icon_slug === achConfig.id,
          );

          if (dbAch && !unlockedIds.has(dbAch.id)) {
            // 3. Insertar en DB
            const { error: insertError } = await supabase
              .from("user_achievements")
              .insert([{ user_id: userId, achievement_id: dbAch.id }]);

            if (!insertError) {
              // 4. Notificar
              await this.createNotification(
                userId,
                "achievement",
                "¡Nuevo Logro Desbloqueado!",
                `Has forjado un nuevo trofeo: ${dbAch.title}.`,
                dbAch.id,
              );
            }
          }
        }
      }
    } catch (err) {
      console.error("Error verificando logros:", err);
    }
  },

  /**
   * Otorga XP por exploración o acciones especiales (Easter Eggs)
   * Verifica localmente o en DB si ya se otorgó hoy para evitar spam
   */
  async awardExplorationXp(userId, amount, reason) {
    // 1. Obtener perfil
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("xp, level")
      .eq("id", userId)
      .single();

    if (error) throw error;

    const newXp = (profile.xp || 0) + amount;
    const newLevel = Math.floor(newXp / 1000) + 1;

    // 2. Actualizar XP
    await supabase
      .from("profiles")
      .update({
        xp: newXp,
        level: newLevel,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    // 3. Notificar
    await this.createNotification(
      userId,
      "achievement", // Usamos icono de logro
      "¡Experiencia Oculta!",
      `Has ganado +${amount} XP: ${reason}`,
    );

    // 4. Verificar Logros (XP, Nivel)
    // Pasamos streak del perfil actual ya que este método no afecta racha directamente
    await this.checkAndAwardAchievements(userId, {
      xp: newXp,
      streak: profile.streak_current || 0,
      level: newLevel,
    });

    // 4. Notificar si hubo subida de nivel
    if (newLevel > (profile.level || 1)) {
      await this.createNotification(
        userId,
        "level_up",
        "¡Has subido de nivel!",
        `¡Felicidades! Ahora eres Nivel ${newLevel}: ${this.getRankTitle(newLevel)}.`,
      );
    }

    return newXp;
  },

  /**
   * Envía Honor a un aliado (XP para ambos)
   */
  async sendHonor(senderId, receiverId) {
    // 1. Verificar límite diario
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const { data: existing } = await supabase
      .from("notifications")
      .select("*")
      .eq("type", "honor_received")
      .eq("related_id", senderId) // El related_id será quien envió
      .eq("user_id", receiverId) // El user_id es quien recibió
      .gte("created_at", today); // Desde hoy

    if (existing && existing.length > 0) {
      throw new Error("Ya has enviado honor a este aliado hoy.");
    }

    // 2. Dar XP a ambos
    const xpAmount = 20;
    await this.awardExplorationXp(senderId, xpAmount, "Honor Enviado");
    await this.awardExplorationXp(receiverId, xpAmount, "Honor Recibido");

    // 3. Notificar al receptor
    const { data: sender } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", senderId)
      .single();

    await this.createNotification(
      receiverId,
      "honor_received",
      "¡Honor Recibido!",
      `${sender?.username || "Un aliado"} te ha enviado fuerza.`,
      senderId,
    );

    return true;
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

    // Obtener nombre del remitente para la notificación
    const { data: sender } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", fromUserId)
      .single();

    // Crear notificación para el receptor
    await this.createNotification(
      toUserId,
      "friend_request",
      "Nueva solicitud de amistad",
      `${sender?.username || "Un guerrero"} quiere unirse a tu dojo.`,
      fromUserId,
    );

    return true;
  },
  /**
   * Rechaza una solicitud de amistad (Elimina la relación y notifica)
   * @param {string} requestId
   */
  async rejectFriendRequest(requestId) {
    // 1. Obtener datos antes de borrar para notificar
    const { data: request } = await supabase
      .from("friendships")
      .select("user_id_1, user_id_2")
      .eq("id", requestId)
      .single();

    if (!request) throw new Error("Solicitud no encontrada");

    // 2. Eliminar la solicitud
    const { error } = await supabase
      .from("friendships")
      .delete()
      .eq("id", requestId);

    if (error) throw error;

    // 3. Notificar al remitente (user_id_1) que fue rechazado
    // Nota: user_id_2 es quien rechaza
    const { data: rejector } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", request.user_id_2)
      .single();

    await this.createNotification(
      request.user_id_1,
      "friend_request_rejected",
      "Solicitud declinada",
      `${rejector?.username || "Un guerrero"} ha declinado tu solicitud de amistad.`,
      request.user_id_2,
    );

    return true;
  },

  /**
   * Acepta una solicitud de amistad pendiente
   */
  async acceptFriendRequest(requestId) {
    // Obtener datos de la solicitud para saber a quién notificar
    const { data: request } = await supabase
      .from("friendships")
      .select("user_id_1, user_id_2")
      .eq("id", requestId)
      .single();

    const { error } = await supabase
      .from("friendships")
      .update({ status: "accepted", updated_at: new Date().toISOString() })
      .eq("id", requestId);
    if (error) throw error;

    if (request) {
      // Obtener nombre del que acepta
      const { data: acceptor } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", request.user_id_2)
        .single();

      // Notificar al que envió la solicitud original (user_id_1)
      await this.createNotification(
        request.user_id_1,
        "friend_request",
        "¡Solicitud aceptada!",
        `${acceptor?.username || "Un guerrero"} ha aceptado tu alianza.`,
        request.user_id_2,
      );
    }

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
        user_1:profiles!friendships_user_id_1_fkey (id, username, full_name, custom_avatar_url, avatar_url, cover_photo_url, level, role),
        user_2:profiles!friendships_user_id_2_fkey (id, username, full_name, custom_avatar_url, avatar_url, cover_photo_url, level, role)
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

  // --- MÓDULO DE NOTIFICACIONES ---
  /**
   * Obtiene las notificaciones del usuario
   */
  async getNotifications(userId) {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Marca una notificación como leída
   */
  async markNotificationAsRead(id) {
    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", id);
    if (error) throw error;
    return true;
  },

  /**
   * Elimina una notificación
   */
  async deleteNotification(id) {
    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return true;
  },

  /**
   * Crea una notificación para un usuario
   */
  async createNotification(userId, type, title, message, relatedId = null) {
    const { error } = await supabase.from("notifications").insert([
      {
        user_id: userId,
        type,
        title,
        message,
        related_id: relatedId,
      },
    ]);
    if (error) throw error;
    return true;
  },
};
