import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDojoData } from "../hooks/useDojoData";
import { storageService } from "../services/storage.service";
import { dojoService } from "../services/dojo.service";
import EvidenceModal from "../components/EvidenceModal";
import {
  ArrowUpRight,
  Lock,
  Loader2,
  Flame,
  Trophy,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

/* =========================================================
   Utilidades de animación (JS PURO)
   ========================================================= */
function animateNumber({ from = 0, to = 0, duration = 600, onUpdate }) {
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(from + (to - from) * progress);
    onUpdate(value);
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

/* =========================================================
   Skeleton Loader
   ========================================================= */
function Skeleton({ className }) {
  return (
    <div
      className={`bg-white/10 animate-pulse rounded-md ${className}`}
      aria-hidden
    />
  );
}

export default function DojoMain() {
  const { profile, challenges, todaysLogs, loading, completeChallenge } =
    useDojoData();

  const [evidenceModal, setEvidenceModal] = useState({
    isOpen: false,
    challengeId: null,
    challengeTitle: "",
    xpReward: 0,
  });

  /* =========================================================
     Mini stats
     ========================================================= */
  const streak = profile?.streak ?? 0;
  const xpTodayTarget = challenges?.reduce(
    (acc, c) => acc + (todaysLogs.includes(c.id) ? c.xp_reward : 0),
    0,
  );

  const [animatedXP, setAnimatedXP] = useState(0);
  const lastXPRef = useRef(0);

  useEffect(() => {
    animateNumber({
      from: lastXPRef.current,
      to: xpTodayTarget,
      duration: 700,
      onUpdate: setAnimatedXP,
    });
    lastXPRef.current = xpTodayTarget;
  }, [xpTodayTarget]);

  /* =========================================================
     Handlers
     ========================================================= */
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
    let evidenceUrl = null;

    // Solo subir si hay archivo
    if (file) {
      const evidence = await storageService.uploadEvidence(
        file,
        profile.id,
        evidenceModal.challengeId,
      );
      evidenceUrl = evidence.url;
    }

    await completeChallenge(
      evidenceModal.challengeId,
      evidenceModal.xpReward,
      evidenceUrl, // Puede ser null
    );
  };

  const handleExploration = async (reason, amount) => {
    // Evitar spam simple con localStorage diario
    const key = `explo_${reason}_${new Date().toDateString()}`;
    if (localStorage.getItem(key)) return;

    try {
      await dojoService.awardExplorationXp(profile.id, amount, reason);
      localStorage.setItem(key, "true");
      // Animación visual simple
      setAnimatedXP((prev) => prev + amount);
      alert(`¡Has descubierto un secreto! +${amount} XP`);
    } catch (error) {
      console.error(error);
    }
  };

  /* =========================================================
     Loading state
     ========================================================= */
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-amber-300 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dojo | Protocolo Diario</title>
        <meta
          name="description"
          content="Sistema diario de disciplina, progreso y constancia."
        />
      </Helmet>

      {/* ======================================================
         HERO / INTRO (MISMO LENGUAJE QUE DojoHero)
         ====================================================== */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent" />

        <div className="relative max-w-6xl mx-auto px-6 py-20 space-y-12">
          <h1 className="text-center text-amber-400 text-2xl font-bold tracking-[0.4em] italic">
            Protocolo Diario
          </h1>

          <p className="text-center text-gray-400 max-w-2xl mx-auto leading-relaxed">
            El Dojo no te promete motivación. Te entrega un sistema. Cada acción
            ejecutada deja rastro. Cada día suma.
          </p>

          {/* Mini Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div
              onClick={() => handleExploration("Ignición de Racha", 50)}
              className="bg-zinc-900/60 border border-white/5 rounded-2xl p-6 text-center cursor-pointer hover:border-amber-500/50 transition-colors"
            >
              <Flame className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Racha
              </p>
              <p className="text-2xl font-bold">{streak}</p>
            </div>

            <div
              onClick={() => handleExploration("Sobrecarga de Energía", 25)}
              className="bg-zinc-900/60 border border-white/5 rounded-2xl p-6 text-center cursor-pointer hover:border-amber-500/50 transition-colors"
            >
              <Zap className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <p className="text-xs uppercase tracking-widest text-gray-500">
                XP Hoy
              </p>
              <p className="text-2xl font-bold tabular-nums">{animatedXP}</p>
            </div>

            <div
              onClick={() => handleExploration("Ambición de Grandeza", 100)}
              className="bg-zinc-900/60 border border-white/5 rounded-2xl p-6 text-center cursor-pointer hover:border-amber-500/50 transition-colors"
            >
              <Trophy className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Nivel
              </p>
              <p className="text-2xl font-bold">{profile?.level ?? "—"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
         CONTENIDO EXISTENTE (RESPETADO)
         ====================================================== */}
      <section className="max-w-6xl mx-auto px-6 py-24 space-y-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Protocolo */}
          <div className="lg:col-span-2 bg-zinc-900/40 backdrop-blur-md p-12 border border-white/5 rounded-[3rem] space-y-12">
            <h3 className="text-3xl font-serif flex items-center gap-3">
              <CheckCircle2 className="w-7 h-7 text-amber-400" />
              Protocolo Diario
            </h3>

            <div className="space-y-10">
              {challenges.map((challenge) => {
                const isCompleted = todaysLogs.includes(challenge.id);

                return (
                  <div
                    key={challenge.id}
                    className="space-y-4 motion-safe:transition-opacity"
                  >
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-xs uppercase font-bold tracking-widest ${
                          isCompleted ? "text-amber-300" : "text-gray-400"
                        }`}
                      >
                        {challenge.title}
                      </span>

                      {!isCompleted && (
                        <button
                          onClick={() => handleOpenEvidenceModal(challenge)}
                          className="px-4 py-2 rounded-full text-[10px] uppercase font-bold border border-white/10 bg-white/5 hover:bg-amber-300 hover:text-black transition-all"
                        >
                          Check-in
                        </button>
                      )}
                    </div>

                    <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-700 ${
                          isCompleted
                            ? "bg-amber-300 w-full"
                            : "bg-white/10 w-0"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Área restringida */}
          <div className="bg-zinc-900/40 backdrop-blur-md p-12 border border-white/5 rounded-[3rem] flex flex-col items-center text-center">
            <Lock className="w-10 h-10 text-gray-600 mb-6" />
            <h4 className="text-sm uppercase tracking-widest font-bold">
              Área Restringida
            </h4>
            <p className="text-xs text-gray-500 mt-4">
              Se desbloquea al consolidar disciplina sostenida.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="w-full bg-amber-300 p-10 rounded-[3.5rem] flex justify-between items-center hover:bg-white transition-all">
          <h4 className="text-black font-serif text-3xl">Profundidad Total</h4>
          <div className="bg-black text-white w-20 h-20 rounded-full flex items-center justify-center">
            <ArrowUpRight className="w-8 h-8" />
          </div>
        </div>
      </section>

      <EvidenceModal
        isOpen={evidenceModal.isOpen}
        onClose={handleCloseEvidenceModal}
        onSubmit={handleSubmitEvidence}
        challengeTitle={evidenceModal.challengeTitle}
        requireEvidence={(profile?.level || 0) >= 25}
      />
    </>
  );
}
