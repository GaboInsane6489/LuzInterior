import React, { useState, useEffect } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { dojoService } from "../services/dojo.service";
import { ACHIEVEMENTS_CONFIG } from "../data/achievements.config";
import {
  Bell,
  Check,
  Trash2,
  Shield,
  UserPlus,
  Award,
  Zap,
  Trophy,
} from "lucide-react";

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotifications = React.useCallback(async () => {
    try {
      setLoading(true);
      const data = await dojoService.getNotifications(user.id);
      setNotifications(data || []);
    } catch (error) {
      console.error("Error cargando notificaciones:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user?.id) {
      loadNotifications();
    }
  }, [user, loadNotifications]);

  const markAsRead = async (id) => {
    try {
      await dojoService.markNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
      );
    } catch (error) {
      console.error("Error marcando como leída:", error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await dojoService.deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Error eliminando notificación:", error);
    }
  };

  /* Helper para obtener imagen o icono */
  const getNotificationMedia = (notif) => {
    // 1. LOGROS: Buscar imagen por ID
    if (notif.type === "achievement" && notif.related_id) {
      const achievement = ACHIEVEMENTS_CONFIG.find(
        (a) => a.id === notif.related_id,
      );
      if (achievement) {
        return (
          <div className="w-12 h-12 rounded-lg overflow-hidden border border-amber-500/30">
            <img
              src={`/achievements/${achievement.img}`}
              alt={achievement.title}
              className="w-full h-full object-cover"
            />
          </div>
        );
      }
    }

    // 2. XP GAIN: Icono de Rayo
    if (notif.title.includes("Experiencia") || notif.title.includes("XP")) {
      return (
        <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-purple-500/30 flex items-center justify-center">
          <Zap className="w-6 h-6 text-purple-500" />
        </div>
      );
    }

    // 3. LEVEL UP: Icono de Trofeo
    if (notif.type === "level_up") {
      return (
        <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-cyan-500/30 flex items-center justify-center">
          <Trophy className="w-6 h-6 text-cyan-500" />
        </div>
      );
    }

    // 4. Default Icons
    const getIcon = (type) => {
      switch (type) {
        case "friend_request":
          return <UserPlus className="w-6 h-6 text-amber-500" />;
        case "challenge":
          return <Shield className="w-6 h-6 text-amber-500" />;
        default:
          return <Bell className="w-6 h-6 text-gray-400" />;
      }
    };

    return (
      <div className="w-12 h-12 rounded-lg bg-zinc-900/50 border border-white/5 flex items-center justify-center">
        {getIcon(notif.type)}
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl md:text-6xl font-serif">Notificaciones</h1>
          <p className="text-gray-400 mt-2">
            Mensajes del sistema y tu círculo social.
          </p>
        </div>
        {loading && (
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-300"></div>
        )}
      </div>

      <div className="grid gap-4">
        {notifications.length === 0 && !loading ? (
          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-12 text-center space-y-4">
            <Bell className="w-12 h-12 text-gray-700 mx-auto" />
            <p className="text-gray-500">No tienes notificaciones por ahora.</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                notif.read
                  ? "bg-zinc-900/20 border-white/5 text-gray-500"
                  : "bg-zinc-900/60 border-amber-500/20 text-white shadow-[0_0_15px_rgba(245,158,11,0.05)]"
              }`}
            >
              {/* MEDIA SECTION */}
              <div className="flex-shrink-0">{getNotificationMedia(notif)}</div>

              <div className="flex-1 space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3
                    className={`font-bold truncate ${notif.read ? "text-gray-400" : "text-amber-100"}`}
                  >
                    {notif.title}
                  </h3>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
                  )}
                </div>
                <p className="text-sm leading-relaxed">{notif.message}</p>
                <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">
                  {new Date(notif.created_at).toLocaleDateString()} •{" "}
                  {new Date(notif.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div className="flex gap-2">
                {!notif.read && (
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors text-amber-500"
                    title="Marcar como leída"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notif.id)}
                  className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-gray-600 hover:text-red-400"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
