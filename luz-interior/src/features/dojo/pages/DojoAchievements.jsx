import React from "react";
import { useDojoData } from "../hooks/useDojoData";
import { ACHIEVEMENTS_CONFIG } from "../data/achievements.config";
import { Award, Lock, Shield, Star, Trophy } from "lucide-react";

export default function DojoAchievements() {
  const { profile, loading } = useDojoData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-amber-300 font-serif text-xl">
          Cargando Sala de Trofeos...
        </div>
      </div>
    );
  }

  // Agrupar logros por Tier para una visualización organizada
  const tiers = {
    creation: { title: "El Inicio", icon: Shield, color: "text-gray-400" },
    bronze: { title: "Rango Bronce", icon: Shield, color: "text-amber-700" },
    silver: { title: "Rango Plata", icon: Shield, color: "text-gray-300" },
    gold: { title: "Rango Oro", icon: Star, color: "text-amber-400" },
    diamond: {
      title: "Rango Diamante",
      icon: Trophy,
      color: "text-cyan-400",
    },
    cuspide: {
      title: "La Cúspide",
      icon: Award,
      color: "text-red-400",
    },
  };

  const groupedAchievements = ACHIEVEMENTS_CONFIG.reduce((acc, ach) => {
    if (!acc[ach.tier]) acc[ach.tier] = [];
    acc[ach.tier].push(ach);
    return acc;
  }, {});

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-serif">Sala de Logros</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Cada medalla es un testimonio de tu disciplina. Revisa tu progreso y
          conquista cada desafío para alcanzar la iluminación.
        </p>
      </div>

      <div className="space-y-16">
        {Object.entries(tiers).map(([tierKey, tierInfo]) => {
          const achievements = groupedAchievements[tierKey] || [];
          if (achievements.length === 0) return null;

          return (
            <div key={tierKey} className="space-y-6">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <tierInfo.icon className={`w-8 h-8 ${tierInfo.color}`} />
                <h2 className={`text-2xl font-serif ${tierInfo.color}`}>
                  {tierInfo.title}
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {achievements.map((achievement) => {
                  const isUnlocked = achievement.condition({
                    level: profile?.level || 1,
                    streak: profile?.streak_best || 0,
                    xp: profile?.xp || 0,
                  });

                  return (
                    <div
                      key={achievement.id}
                      className={`relative group bg-zinc-900/40 border ${
                        isUnlocked
                          ? "border-amber-300/20 hover:border-amber-300/50"
                          : "border-white/5 opacity-50 grayscale"
                      } rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-900/10`}
                    >
                      <div className="aspect-square relative mb-4 rounded-xl overflow-hidden bg-black/20">
                        <img
                          src={`/achievements/${achievement.img}`}
                          alt={achievement.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {!isUnlocked && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <Lock className="w-8 h-8 text-white/30" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-2 text-center">
                        <h3
                          className={`font-serif text-sm md:text-base ${
                            isUnlocked ? "text-white" : "text-gray-500"
                          }`}
                        >
                          {achievement.title}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {achievement.description}
                        </p>
                      </div>

                      {/* Tooltip-like Info */}
                      {isUnlocked && (
                        <div className="absolute top-2 right-2">
                          <div className="w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-pulse"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
