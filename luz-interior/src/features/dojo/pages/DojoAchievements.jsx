import React from "react";
import { Helmet } from "react-helmet-async";
import { useDojoData } from "../hooks/useDojoData";
import { Award, Loader2 } from "lucide-react";

export default function DojoAchievements() {
  const { achievements, userAchievements, loading } = useDojoData();

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-amber-300 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Logros | El Dojo</title>
      </Helmet>

      {/* Galería de Logros (Achievements) */}
      <section className="space-y-10">
        <div className="flex items-center justify-between border-b border-white/5 pb-6">
          <div className="space-y-2">
            <h3 className="text-3xl font-serif">Tus Medallas</h3>
            <p className="text-gray-500 text-sm">
              Logros forjados en la disciplina.
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-amber-300 font-bold">
              Total Desbloqueados
            </p>
            <p className="text-2xl font-serif">
              {userAchievements.length} / {achievements.length}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {achievements.map((achievement) => {
            const isUnlocked = userAchievements.some(
              (ua) => ua.achievement_id === achievement.id,
            );

            return (
              <div
                key={achievement.id}
                className={`group relative p-8 rounded-[2.5rem] border transition-all duration-500 flex flex-col items-center text-center gap-4 ${
                  isUnlocked
                    ? "bg-zinc-900/50 border-amber-300/20 hover:border-amber-300/40 shadow-[0_10px_30px_rgba(245,158,11,0.05)]"
                    : "bg-black border-white/5 opacity-40 grayscale"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-700 ${
                    isUnlocked
                      ? "bg-amber-300 text-black rotate-3 group-hover:rotate-12"
                      : "bg-white/5 text-gray-600"
                  }`}
                >
                  <Award className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest leading-tight">
                    {achievement.title}
                  </p>
                  {isUnlocked && (
                    <p className="text-[8px] text-amber-300/80 uppercase tracking-tighter font-medium">
                      +{achievement.xp_reward} XP Reclamados
                    </p>
                  )}
                </div>

                {/* Tooltip simple en hover */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {achievement.description}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
