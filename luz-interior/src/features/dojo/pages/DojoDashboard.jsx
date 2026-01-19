import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDojoData } from "../hooks/useDojoData";
import { storageService } from "../services/storage.service";
import EvidenceModal from "../components/EvidenceModal";
import { ArrowUpRight, Lock, Loader2 } from "lucide-react";

export default function DojoDashboard() {
  const { profile, challenges, todaysLogs, loading, completeChallenge } =
    useDojoData();
  const [evidenceModal, setEvidenceModal] = useState({
    isOpen: false,
    challengeId: null,
    challengeTitle: "",
    xpReward: 0,
  });

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-amber-300 animate-spin" />
      </div>
    );
  }

  const handleOpenEvidenceModal = (challenge) => {
    setEvidenceModal({
      isOpen: true,
      challengeId: challenge.id,
      challengeTitle: challenge.title,
      xpReward: challenge.xp_reward,
    });
  };

  const handleCloseEvidenceModal = () => {
    setEvidenceModal({
      isOpen: false,
      challengeId: null,
      challengeTitle: "",
      xpReward: 0,
    });
  };

  const handleSubmitEvidence = async (file) => {
    // Subir evidencia
    const evidence = await storageService.uploadEvidence(
      file,
      profile.id,
      evidenceModal.challengeId,
    );

    // Completar reto
    await completeChallenge(
      evidenceModal.challengeId,
      evidenceModal.xpReward,
      evidence.url,
    );
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | El Dojo</title>
      </Helmet>

      {/* Cards Principales: Bento Grid Senior */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tarjeta de Progreso (Grande) */}
        <div className="lg:col-span-2 relative group overflow-hidden bg-zinc-950 p-12 lg:p-16 border border-white/5 rounded-[3rem] transition-all duration-700 hover:shadow-[0_0_50px_rgba(255,255,255,0.02)]">
          <div className="absolute top-0 right-0 p-10">
            <ArrowUpRight className="w-8 h-8 text-white/10 group-hover:text-amber-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
          </div>

          <div className="relative z-10 space-y-12">
            <div className="space-y-2">
              <h3 className="text-3xl font-serif">Protocolo Diario</h3>
              <p className="text-gray-500 text-sm">
                Tus métricas de hoy procesadas en tiempo real.
              </p>
            </div>

            <div className="space-y-10">
              {challenges.map((challenge) => {
                const isCompleted = todaysLogs.includes(challenge.id);

                return (
                  <div key={challenge.id} className="space-y-4 group/item">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <span
                          className={`text-xs font-bold uppercase tracking-[0.2em] ${isCompleted ? "text-amber-300" : "text-gray-400"}`}
                        >
                          {challenge.title}
                        </span>
                        {isCompleted ? (
                          <p className="text-[10px] text-green-500 font-bold tracking-widest uppercase animate-pulse">
                            ✓ Completado hoy
                          </p>
                        ) : (
                          <p className="text-[10px] text-amber-300/60 font-medium tracking-widest uppercase">
                            Recompensa: +{challenge.xp_reward} XP
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-xl font-serif text-white/20">
                          {isCompleted ? "100%" : "0%"}
                        </span>
                        {!isCompleted && (
                          <button
                            onClick={() => handleOpenEvidenceModal(challenge)}
                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-amber-300 hover:text-black transition-all"
                          >
                            Check-in
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${isCompleted ? "bg-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.5)]" : "bg-white/10"} transition-all duration-[1.5s] ease-out`}
                        style={{ width: isCompleted ? "100%" : "0%" }}
                      ></div>
                    </div>
                  </div>
                );
              })}
              {challenges.length === 0 && (
                <p className="text-gray-500 italic text-sm">
                  No hay retos activos en este momento.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Tarjeta Bloqueada (Misterio/Seniority) */}
        <div className="bg-zinc-950 p-12 border border-white/5 rounded-[3rem] flex flex-col justify-between items-center text-center group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-300/0 to-amber-300-[0.02] opacity-0 group-hover:opacity-100 transition-opacity"></div>

          <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 group-hover:border-amber-300/30 transition-all duration-700 relative z-10">
            <Lock className="w-10 h-10 text-gray-700 group-hover:text-amber-300 group-hover:scale-110 transition-all" />
          </div>

          <div className="space-y-4 relative z-10">
            <h4 className="text-sm uppercase tracking-[0.5em] font-bold text-white/40 group-hover:text-white transition-colors">
              Área Restringida
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed font-light px-4">
              Llevas una racha de{" "}
              <span className="text-white font-bold">
                {profile?.streak_current || 0} días
              </span>
              . Desbloquea la{" "}
              <span className="text-amber-300 italic">Bóveda</span> llegando a
              los 7 días.
            </p>
          </div>

          <div className="pt-8 relative z-10">
            <div className="h-10 w-[1px] bg-gradient-to-b from-amber-300/50 to-transparent group-hover:h-16 transition-all duration-1000"></div>
          </div>
        </div>
      </div>

      {/* Banner de Acción Rápida (Floating Tool) */}
      <div className="w-full bg-amber-300 p-10 lg:p-14 rounded-[3.5rem] flex flex-col md:flex-row justify-between items-center group cursor-pointer hover:bg-white transition-all duration-700 hover:-translate-y-2 shadow-[0_20px_60px_rgba(245,158,11,0.1)]">
        <div className="space-y-2 text-center md:text-left mb-8 md:mb-0">
          <h4 className="text-black font-serif text-3xl lg:text-5xl leading-none">
            Profundidad Total
          </h4>
          <p className="text-black/50 text-[10px] uppercase tracking-[0.4em] font-bold">
            Lanzar sesión de enfoque profundo (Flow)
          </p>
        </div>
        <div className="bg-black text-white w-20 h-20 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-700 shadow-2xl">
          <ArrowUpRight className="w-8 h-8" />
        </div>
      </div>

      {/* Evidence Modal */}
      <EvidenceModal
        isOpen={evidenceModal.isOpen}
        onClose={handleCloseEvidenceModal}
        onSubmit={handleSubmitEvidence}
        challengeTitle={evidenceModal.challengeTitle}
      />
    </>
  );
}
