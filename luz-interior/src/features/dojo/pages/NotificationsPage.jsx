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

  /* Helper para obtener imagen o icono - Ahora con bordes sólidos */
  const getNotificationMedia = (notif) => {
    if (notif.type === "achievement" && notif.related_id) {
      const achievement = ACHIEVEMENTS_CONFIG.find(
        (a) => a.id === notif.related_id,
      );
      if (achievement) {
        return (
          <div className="w-12 h-12 overflow-hidden border-2 border-amber-400 bg-black">
            <img
              src={`/achievements/${achievement.img}`}
              alt={achievement.title}
              className="w-full h-full object-cover"
            />
          </div>
        );
      }
    }

    if (notif.title.includes("Experiencia") || notif.title.includes("XP")) {
      return (
        <div className="w-12 h-12 bg-zinc-900 border-2 border-purple-500 flex items-center justify-center">
          <Zap className="w-6 h-6 text-purple-400" />
        </div>
      );
    }

    if (notif.type === "level_up") {
      return (
        <div className="w-12 h-12 bg-zinc-900 border-2 border-cyan-400 flex items-center justify-center">
          <Trophy className="w-6 h-6 text-cyan-400" />
        </div>
      );
    }

    const getIcon = (type) => {
      switch (type) {
        case "friend_request":
          return <UserPlus className="w-6 h-6 text-amber-400" />;
        case "challenge":
          return <Shield className="w-6 h-6 text-amber-400" />;
        default:
          return <Bell className="w-6 h-6 text-zinc-300" />;
      }
    };

    return (
      <div className="w-12 h-12 bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center">
        {getIcon(notif.type)}
      </div>
    );
  };

  return (
    // Sin backgrounds, espaciado general reducido de space-y-8 a space-y-6
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* HEADER COMPACTO */}
      <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-white">
            Notificaciones
          </h1>
          <p className="text-zinc-300 text-sm font-medium mt-1">
            Mensajes del sistema y tu círculo social.
          </p>
        </div>
        {loading && (
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-400"></div>
        )}
      </div>

      {/* LISTA DE NOTIFICACIONES */}
      <div className="flex flex-col gap-3">
        {notifications.length === 0 && !loading ? (
          // Empty State más pequeño y definido
          <div className="border-2 border-dashed border-zinc-800 p-8 text-center space-y-3">
            <Bell className="w-10 h-10 text-zinc-600 mx-auto" />
            <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">
              Sin notificaciones
            </p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`flex items-start gap-4 p-4 transition-all duration-300 ${
                notif.read
                  ? "bg-transparent border border-zinc-800 opacity-80"
                  : "bg-zinc-900 border-l-4 border-amber-400 border-y border-r border-zinc-800"
              }`}
            >
              <div className="flex-shrink-0">{getNotificationMedia(notif)}</div>

              <div className="flex-1 space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3
                    className={`text-base truncate ${
                      notif.read
                        ? "font-bold text-zinc-400"
                        : "font-black text-white"
                    }`}
                  >
                    {notif.title}
                  </h3>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />
                  )}
                </div>
                <p
                  className={`text-sm leading-snug ${
                    notif.read ? "text-zinc-500" : "text-zinc-200"
                  }`}
                >
                  {notif.message}
                </p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold pt-1">
                  {new Date(notif.created_at).toLocaleDateString()} •{" "}
                  {new Date(notif.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {/* Botones de Acción - Mejor contraste al pasar el mouse */}
              <div className="flex flex-col sm:flex-row gap-2">
                {!notif.read && (
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="p-2 bg-zinc-800 text-amber-400 hover:bg-amber-400 hover:text-black transition-colors"
                    title="Marcar como leída"
                  >
                    <Check className="w-4 h-4 stroke-[3px]" />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notif.id)}
                  className="p-2 text-zinc-500 hover:bg-red-500 hover:text-white transition-colors"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4 stroke-[2px]" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
