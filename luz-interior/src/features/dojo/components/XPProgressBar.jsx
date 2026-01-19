import React from "react";
import PropTypes from "prop-types";

/**
 * Calcula el nivel basado en el XP total acumulado
 * Fórmula: Nivel = floor(XP / 1000) + 1
 * Nivel 1: 0-999 XP
 * Nivel 2: 1000-1999 XP
 * Nivel 3: 2000-2999 XP
 * Nivel 4: 3000-3999 XP, etc.
 */
const calculateLevel = (totalXP) => {
  return Math.floor(totalXP / 1000) + 1;
};

/**
 * Calcula el XP necesario para alcanzar un nivel específico
 */
const xpForLevel = (level) => (level - 1) * 1000;

/**
 * Componente de barra de progreso XP
 * Muestra el nivel actual, XP actual y progreso hacia el siguiente nivel
 */
export default function XPProgressBar({ profile, variant = "full" }) {
  if (!profile) return null;

  const totalXP = profile.xp || 0;
  const currentLevel = calculateLevel(totalXP);

  // XP necesario para el nivel actual y el siguiente
  const xpForCurrentLevel = xpForLevel(currentLevel);
  const xpForNextLevel = xpForLevel(currentLevel + 1);

  // XP dentro del nivel actual (0 a 1000)
  const xpInCurrentLevel = totalXP - xpForCurrentLevel;
  const xpNeededForNextLevel = xpForNextLevel - xpForCurrentLevel; // Siempre 1000
  const xpRemainingForNextLevel = xpForNextLevel - totalXP;

  const progressPercentage = Math.min(
    (xpInCurrentLevel / xpNeededForNextLevel) * 100,
    100,
  );

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-amber-300">
          Nv. {currentLevel}
        </span>
        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden min-w-[100px]">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <span className="text-xs text-gray-500">
          {Math.round(progressPercentage)}%
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-300/10 flex items-center justify-center border border-amber-300/20">
            <span className="text-lg font-bold text-amber-300">
              {currentLevel}
            </span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">
              Nivel Actual
            </p>
            <p className="text-sm text-white font-serif">
              {totalXP.toLocaleString()} XP
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">
            Siguiente Nivel
          </p>
          <p className="text-sm text-amber-300 font-serif">
            {xpForNextLevel.toLocaleString()} XP
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="h-3 bg-white/5 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 transition-all duration-700 ease-out shadow-[0_0_15px_rgba(245,158,11,0.6)]"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">
            {xpInCurrentLevel.toLocaleString()} /{" "}
            {xpNeededForNextLevel.toLocaleString()} XP
          </span>
          <span className="text-amber-300 font-bold">
            {xpRemainingForNextLevel.toLocaleString()} para subir
          </span>
        </div>
      </div>
    </div>
  );
}

XPProgressBar.propTypes = {
  profile: PropTypes.shape({
    level: PropTypes.number,
    xp: PropTypes.number,
  }),
  variant: PropTypes.oneOf(["full", "compact"]),
};
