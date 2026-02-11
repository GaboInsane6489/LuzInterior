import React, { useState, useEffect } from "react";
import { Wind, Trophy } from "lucide-react";
import { dojoService } from "../services/dojo.service";
import { useDojoData } from "../hooks/useDojoData";

export default function ZenFocusCard() {
  const { profile } = useDojoData();
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60 segundos
  const [completed, setCompleted] = useState(false);

  const handleComplete = async () => {
    setCompleted(true);
    try {
      await dojoService.awardExplorationXp(
        profile.id,
        50,
        "Enfoque Zen (1 min)",
      );
    } catch (error) {
      console.error("Error awarding Zen XP:", error);
    }
  };

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      // Completado - Usar timeout para salir del ciclo de render actual
      const timer = setTimeout(() => {
        setIsActive(false);
        handleComplete();
      }, 0);
      return () => clearTimeout(timer);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, timeLeft]);

  const startSession = () => {
    if (completed) return;
    setIsActive(true);
  };

  return (
    <div className="group relative bg-zinc-900 border border-white/5 p-8 transition-all duration-500 hover:border-cyan-500/30">
      <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
        <Wind className="w-5 h-5 text-cyan-500" />
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-serif text-white">Enfoque Zen</h3>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
            Entrenamiento Mental
          </p>
        </div>

        <div className="py-4">
          {isActive ? (
            <div className="text-5xl font-serif text-cyan-400 tabular-nums animate-pulse">
              00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
            </div>
          ) : completed ? (
            <div className="flex items-center gap-3 animate-in fade-in zoom-in">
              <Trophy className="w-6 h-6 text-amber-400" />
              <div>
                <p className="text-white font-serif text-lg">
                  Sesión Completada
                </p>
                <p className="text-xs text-cyan-400">+50 XP Ganados</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              La mente divaga. Tráela de vuelta. 60 segundos de silencio
              absoluto.
            </p>
          )}
        </div>

        {!isActive && !completed && (
          <button
            onClick={startSession}
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-500 border-b border-cyan-500/30 pb-1 hover:text-white hover:border-white transition-all"
          >
            Iniciar Protocolo &rarr;
          </button>
        )}
      </div>
    </div>
  );
}
