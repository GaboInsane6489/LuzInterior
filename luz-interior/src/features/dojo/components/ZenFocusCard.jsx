import React, { useState, useEffect } from "react";
import { Wind, Trophy } from "lucide-react";
import { dojoService } from "../services/dojo.service";
import { useDojoData } from "../hooks/useDojoData";

export default function ZenFocusCard() {
  const { profile } = useDojoData();
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsActive(false);
            setCompleted(true);

            dojoService
              .awardExplorationXp(profile?.id, 50, "Enfoque Zen (1 min)")
              .catch((error) => console.error("Error awarding Zen XP:", error));

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, profile?.id]);

  const startSession = () => {
    if (completed) return;
    setIsActive(true);
  };

  return (
    <div className="group relative bg-black border border-white/5 p-10 transition-all duration-700 hover:border-amber-500/20 overflow-hidden">
      {/* CAPA ATMOSFÉRICA: Marco decorativo sutil */}
      <div className="absolute -inset-2 border border-amber-500/5 -z-10 translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-1000 ease-out"></div>

      {/* ICONO DE ESTADO */}
      <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-all duration-700">
        <Wind
          className={`w-6 h-6 ${isActive ? "text-amber-400 animate-spin-slow" : "text-amber-500"}`}
        />
      </div>

      <div className="relative z-10 space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-amber-500/50"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500/60">
              Entrenamiento Mental
            </span>
          </div>
          <h3 className="text-4xl font-serif text-white tracking-tight">
            Enfoque <span className="italic font-light text-white/60">Zen</span>
          </h3>
        </div>

        <div className="min-h-[80px] flex items-center">
          {isActive ? (
            <div className="space-y-4 w-full">
              <div className="text-7xl font-serif text-amber-400 tabular-nums tracking-tighter animate-pulse">
                00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </div>
              <div className="h-[1px] w-full bg-white/5 relative">
                <div
                  className="absolute inset-y-0 left-0 bg-amber-500 transition-all duration-1000 ease-linear"
                  style={{ width: `${(timeLeft / 60) * 100}%` }}
                ></div>
              </div>
            </div>
          ) : completed ? (
            <div className="flex items-center gap-6 animate-in fade-in slide-in-from-left duration-1000">
              <div className="p-4 bg-amber-500/10 border border-amber-500/20">
                <Trophy className="w-8 h-8 text-amber-400" />
              </div>
              <div>
                <p className="text-xl font-serif text-white italic">
                  Presencia Alcanzada
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500 font-bold">
                  +50 XP Transmutados
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm font-light italic">
              "La mente divaga. Tráela de vuelta. Sesenta segundos de silencio
              absoluto para reclamar el control de tu atención."
            </p>
          )}
        </div>

        {!isActive && !completed && (
          <button
            onClick={startSession}
            className="group/btn relative inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white transition-all overflow-hidden"
          >
            <span className="relative z-10 border-b border-amber-500/30 pb-1 group-hover/btn:border-amber-400 transition-colors">
              Iniciar Protocolo &rarr;
            </span>
          </button>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
    </div>
  );
}
