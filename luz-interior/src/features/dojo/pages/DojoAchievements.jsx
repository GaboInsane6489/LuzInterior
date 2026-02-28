import React from "react";
import { useDojoData } from "../hooks/useDojoData";
import { ACHIEVEMENTS_CONFIG } from "../data/achievements.config";
import { Award, Lock, Shield, Star, Trophy } from "lucide-react";
import { useIntersection } from "../hooks/useIntersection";

const AchievementCard = ({ achievement, isUnlocked, index }) => {
  const [ref, isVisible] = useIntersection({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 50}ms` }}
      className={`relative p-5 border group transition-all duration-700 transform backdrop-blur-md ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${
        isUnlocked
          ? "bg-white/[0.03] border-white/10 hover:border-amber-500/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          : "bg-black/40 border-white/5 grayscale"
      }`}
    >
      {/* Overlay de Brillo al Hover (Efecto Cristal) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/0 via-amber-500/0 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Visual Inmediato con Zoom al Hover */}
      <div className="relative aspect-square mb-6 overflow-hidden bg-white/5 border border-white/5">
        <img
          src={`/achievements/${achievement.img}`}
          alt={achievement.title}
          className={`w-full h-full object-cover transition-all duration-1000 ease-out ${
            isUnlocked
              ? "opacity-100 group-hover:scale-110 group-hover:rotate-1"
              : "opacity-5 scale-90"
          }`}
        />

        {!isUnlocked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Lock className="w-5 h-5 text-white/10 group-hover:text-white/30 transition-colors" />
          </div>
        )}

        {/* Scanline animado */}
        {isUnlocked && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="w-full h-full bg-gradient-to-b from-transparent via-amber-500/10 to-transparent -translate-y-full animate-[scan_4s_linear_infinite] group-hover:via-amber-500/25" />
          </div>
        )}
      </div>

      {/* Información */}
      <div className="space-y-3 relative z-10">
        <div className="flex justify-between items-start">
          <h3
            className={`font-serif text-lg leading-tight transition-colors duration-500 ${
              isUnlocked
                ? "text-white group-hover:text-amber-400"
                : "text-white/20"
            }`}
          >
            {achievement.title}
          </h3>
          {isUnlocked && (
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full shadow-[0_0_8px_#f59e0b] group-hover:animate-ping" />
          )}
        </div>

        <p
          className={`text-[10px] uppercase tracking-wider leading-relaxed transition-colors duration-500 ${
            isUnlocked
              ? "text-zinc-400 group-hover:text-zinc-200"
              : "text-white/10"
          }`}
        >
          {achievement.description}
        </p>
      </div>

      {/* Technical Footer */}
      <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center overflow-hidden">
        <div className="flex flex-col">
          <span className="text-[7px] font-mono text-white/30 group-hover:text-amber-500/70 transition-colors">
            ID_{achievement.id.split("-")[0]}
          </span>
          <span className="text-[6px] font-bold text-white/20 uppercase tracking-tighter h-0 group-hover:h-3 transition-all duration-300">
            Sector_01_Auth
          </span>
        </div>

        {isUnlocked && (
          <div className="flex flex-col items-end">
            <span className="text-[8px] text-amber-500 font-bold tracking-tighter uppercase opacity-40 group-hover:opacity-100 transition-opacity">
              Verified_Asset
            </span>
          </div>
        )}
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-amber-500/0 group-hover:border-amber-500/40 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-amber-500/0 group-hover:border-amber-500/40 transition-all duration-500" />
    </div>
  );
};

export default function DojoAchievements() {
  const { profile, loading } = useDojoData();

  if (loading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-[1px] bg-amber-500 animate-[width_2s_ease-in-out_infinite]" />
          <div className="text-[10px] uppercase tracking-[0.5em] text-amber-500 animate-pulse font-bold">
            Sincronizando Bóveda...
          </div>
        </div>
      </div>
    );

  const TIERS = {
    creation: { title: "El Origen", icon: Shield, color: "text-zinc-400" },
    bronze: { title: "Rango Bronce", icon: Shield, color: "text-amber-700" },
    silver: { title: "Rango Plata", icon: Shield, color: "text-zinc-300" },
    gold: { title: "Rango Oro", icon: Star, color: "text-amber-400" },
    diamond: { title: "Rango Diamante", icon: Trophy, color: "text-cyan-400" },
    cuspide: { title: "La Cúspide", icon: Award, color: "text-red-500" },
  };

  const grouped = ACHIEVEMENTS_CONFIG.reduce((acc, ach) => {
    if (!acc[ach.tier]) acc[ach.tier] = [];
    acc[ach.tier].push(ach);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto space-y-32 py-20 px-6 min-h-screen text-zinc-100 relative z-10">
      <header className="space-y-6 text-center">
        <div className="flex justify-center items-center gap-4 opacity-50">
          <div className="h-[1px] w-8 bg-amber-500" />
          <span className="text-[9px] font-bold uppercase tracking-[0.8em] text-amber-500">
            Dojo_Archives
          </span>
          <div className="h-[1px] w-8 bg-amber-500" />
        </div>
        <h1 className="text-6xl md:text-8xl font-serif text-white tracking-tighter">
          Sala de{" "}
          <span className="italic opacity-20 hover:opacity-40 transition-opacity duration-700">
            Trofeos
          </span>
        </h1>
      </header>

      <div className="space-y-40">
        {Object.entries(TIERS).map(([key, info]) => {
          const list = grouped[key] || [];
          if (list.length === 0) return null;
          const Icon = info.icon;

          return (
            <section key={key} className="space-y-12">
              <div className="flex items-center gap-8 group/tier">
                <div className="p-3 border border-white/10 backdrop-blur-md bg-white/5 transition-colors duration-500 group-hover/tier:border-amber-500/20">
                  <Icon className={`w-8 h-8 ${info.color}`} />
                </div>
                <div className="flex-1">
                  <h2
                    className={`text-4xl font-serif tracking-tight ${info.color}`}
                  >
                    {info.title}
                  </h2>
                  <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent mt-2" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {list.map((ach, idx) => (
                  <AchievementCard
                    key={ach.id}
                    achievement={ach}
                    index={idx}
                    isUnlocked={ach.condition({
                      level: profile?.level || 1,
                      streak: profile?.streak_best || 0,
                      xp: profile?.xp || 0,
                    })}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
