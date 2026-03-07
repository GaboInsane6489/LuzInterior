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
      style={{ transitionDelay: `${index * 30}ms` }}
      className={`relative p-3 border-2 transition-all duration-500 transform backdrop-blur-md ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${
        isUnlocked
          ? "bg-zinc-900/80 border-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.2)] hover:border-amber-400 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(217,119,6,0.3)]"
          : "bg-black/60 border-zinc-800 grayscale opacity-60"
      }`}
    >
      {/* Brillo de Alma (Hover) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/0 via-transparent to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Imagen Compacta */}
      <div className="relative aspect-square mb-3 overflow-hidden bg-black border border-amber-900/30">
        <img
          src={`/achievements/${achievement.img}`}
          alt={achievement.title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isUnlocked
              ? "opacity-100 group-hover:scale-110"
              : "opacity-10 scale-75"
          }`}
        />
        {!isUnlocked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Lock className="w-6 h-6 text-amber-900/50" />
          </div>
        )}
      </div>

      {/* Info Compacta */}
      <div className="space-y-1 relative z-10">
        <div className="flex justify-between items-start gap-2">
          <h3
            className={`font-serif text-sm font-bold leading-tight uppercase tracking-tight ${
              isUnlocked
                ? "text-amber-100 group-hover:text-amber-400"
                : "text-zinc-600"
            }`}
          >
            {achievement.title}
          </h3>
          {isUnlocked && (
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full shadow-[0_0_10px_#f59e0b] mt-1 shrink-0" />
          )}
        </div>
        <p
          className={`text-[9px] font-medium leading-tight line-clamp-2 ${
            isUnlocked ? "text-zinc-400" : "text-zinc-700"
          }`}
        >
          {achievement.description}
        </p>
      </div>

      {/* Footer Técnico Souls */}
      <div className="mt-3 pt-2 border-t border-amber-900/30 flex justify-between items-center">
        <span className="text-[8px] font-mono text-amber-700 font-bold uppercase tracking-tighter">
          ID::{achievement.id.split("-")[0]}
        </span>
        {isUnlocked && (
          <span className="text-[7px] text-amber-500 font-black uppercase tracking-widest bg-amber-500/10 px-1 rounded border border-amber-500/20">
            Conseguido
          </span>
        )}
      </div>
    </div>
  );
};

export default function DojoAchievements() {
  const { profile, loading } = useDojoData();

  if (loading)
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-[2px] bg-amber-600 animate-pulse shadow-[0_0_15px_#d97706]" />
          <span className="text-[10px] uppercase tracking-[0.6em] text-amber-500 font-black">
            Invocando Archivos...
          </span>
        </div>
      </div>
    );

  const TIERS = {
    creation: {
      title: "Cenizas Primordiales",
      icon: Shield,
      color: "text-zinc-500",
      border: "border-zinc-800",
    },
    bronze: {
      title: "Hierro Oxidado",
      icon: Shield,
      color: "text-orange-700",
      border: "border-orange-900/50",
    },
    silver: {
      title: "Nobleza de Plata",
      icon: Shield,
      color: "text-zinc-300",
      border: "border-zinc-500/50",
    },
    gold: {
      title: "Gracia Áurea",
      icon: Star,
      color: "text-amber-400",
      border: "border-amber-500/50",
    },
    diamond: {
      title: "Brillo del Nexo",
      icon: Trophy,
      color: "text-cyan-400",
      border: "border-cyan-600/50",
    },
    cuspide: {
      title: "Señor de la Llama",
      icon: Award,
      color: "text-red-600",
      border: "border-red-600/50",
    },
  };

  const grouped = ACHIEVEMENTS_CONFIG.reduce((acc, ach) => {
    if (!acc[ach.tier]) acc[ach.tier] = [];
    acc[ach.tier].push(ach);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto space-y-12 py-10 px-6 min-h-screen text-zinc-100">
      <header className="space-y-2 text-center border-b border-amber-900/50 pb-6">
        <div className="flex justify-center items-center gap-3">
          <div className="h-[1px] w-12 bg-amber-700" />
          <span className="text-[10px] font-black uppercase tracking-[1em] text-amber-600">
            Bóveda de Reliquias
          </span>
          <div className="h-[1px] w-12 bg-amber-700" />
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-black text-white italic drop-shadow-2xl">
          Sala de <span className="text-amber-500 not-italic">Trofeos</span>
        </h1>
      </header>

      <div className="space-y-16">
        {Object.entries(TIERS).map(([key, info]) => {
          const list = grouped[key] || [];
          if (list.length === 0) return null;
          const Icon = info.icon;

          return (
            <section key={key} className="space-y-6">
              <div className="flex items-center gap-4 group/tier">
                <div
                  className={`p-2 border-2 ${info.border} bg-black transition-all group-hover/tier:shadow-[0_0_15px_rgba(217,119,6,0.1)]`}
                >
                  <Icon className={`w-6 h-6 ${info.color} fill-current`} />
                </div>
                <div className="flex-1">
                  <h2
                    className={`text-2xl font-serif font-black uppercase tracking-tight italic ${info.color}`}
                  >
                    {info.title}
                  </h2>
                  <div
                    className={`h-[2px] w-full bg-gradient-to-r from-amber-900/50 to-transparent mt-1`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
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
