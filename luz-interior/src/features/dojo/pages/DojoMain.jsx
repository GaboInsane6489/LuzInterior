import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDojoData } from "../hooks/useDojoData";
import { storageService } from "../services/storage.service";
import { dojoService } from "../services/dojo.service";
import EvidenceModal from "../components/EvidenceModal";
import ZenFocusCard from "../components/ZenFocusCard";
import AllianceWidget from "../components/AllianceWidget";
import {
  ArrowUpRight,
  Lock,
  Loader2,
  Flame,
  Trophy,
  Zap,
  CheckCircle2,
  Shield,
  Activity,
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
   Dojo Main - Editorial Redesign
   ========================================================= */
export default function DojoMain() {
  const { profile, challenges, todaysLogs, loading, completeChallenge } =
    useDojoData();

  const [evidenceModal, setEvidenceModal] = useState({
    isOpen: false,
    challengeId: null,
    challengeTitle: "",
    xpReward: 0,
  });

  const streak = profile?.streak ?? 0;
  // FIX: Use Total XP from profile, not just today's challenge sum
  const totalXP = profile?.xp || 0;

  const [displayXP, setDisplayXP] = useState(0);
  const lastXPRef = useRef(0);

  useEffect(() => {
    animateNumber({
      from: lastXPRef.current,
      to: totalXP,
      duration: 1000, // S légèrement plus lent para dar impacto
      onUpdate: setDisplayXP,
    });
    lastXPRef.current = totalXP;
  }, [totalXP]);

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
      evidenceUrl,
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dojo | Protocolo Diario</title>
      </Helmet>

      <div className="min-h-screen text-white pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-24">
          {/* HEADER EDITORIAL */}
          <header className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-amber-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-amber-600">
                Cuartel General
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif tracking-tighter leading-[0.9]">
              Dojo
              <br />
              <span className="italic font-light text-neutral-500">
                Protocol
              </span>
            </h1>
          </header>

          {/* STATS HERO ROW */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* STREAK CARD */}
            <div className="bg-transparent border border-white/5 p-8 flex flex-col justify-between group hover:border-amber-500/30 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                <Flame className="w-8 h-8 text-amber-500" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500 font-bold mb-2">
                  Racha Actual
                </p>
                <p className="text-6xl font-serif text-white tracking-tight">
                  {streak}
                </p>
              </div>
              <div className="h-1 w-full bg-white/5 mt-4 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-full animate-pulse" />
              </div>
            </div>

            {/* LEVEL CARD */}
            <div className="bg-transparent border border-white/5 p-8 flex flex-col justify-between group hover:border-cyan-500/30 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                <Trophy className="w-8 h-8 text-cyan-500" />
              </div>
              <div>
                {/* Calculate level dynamically from XP to match DojoLayout logic */}
                <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-500 font-bold mb-2">
                  Nivel {Math.floor(displayXP / 1000) + 1}
                </p>
                <p className="text-xl font-serif text-white leading-tight">
                  {dojoService.getRankTitle
                    ? dojoService.getRankTitle(Math.floor(displayXP / 1000) + 1)
                    : "Guerrero"}
                </p>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-[9px] uppercase tracking-widest text-gray-500 mb-1">
                  <span>Progreso</span>
                  <span>{Math.floor((displayXP % 1000) / 10)}%</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-500 transition-all duration-1000"
                    style={{ width: `${(displayXP % 1000) / 10}%` }}
                  />
                </div>
              </div>
            </div>

            {/* XP CARD */}
            <div className="bg-transparent border border-white/5 p-8 flex flex-col justify-between group hover:border-purple-500/30 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                <Zap className="w-8 h-8 text-purple-500" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-purple-500 font-bold mb-2">
                  XP Total
                </p>
                <p className="text-5xl font-serif text-white tracking-tight tabular-nums">
                  {displayXP.toLocaleString()}
                </p>
              </div>
              <p className="text-[10px] text-gray-500 mt-4 uppercase tracking-wider">
                Siguiente Nivel: {Math.ceil((displayXP + 1) / 1000) * 1000} XP
              </p>
            </div>
          </div>

          {/* BENTO GRID LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT COLUMN: ZEN & UTILS (4 cols) */}
            <div className="lg:col-span-12 xl:col-span-4 space-y-8">
              <ZenFocusCard />

              {/* Future widget placeholder */}
              <div className="bg-zinc-900/40 border border-dashed border-white/5 p-8 rounded-lg flex items-center justify-center text-center">
                <div>
                  <Shield className="w-6 h-6 text-gray-700 mx-auto mb-2" />
                  <p className="text-[10px] text-gray-600 uppercase tracking-widest">
                    Módulo de Batalla <br /> (Próximamente)
                  </p>
                </div>
              </div>
            </div>

            {/* MIDDLE COLUMN: PROTOCOL (5 cols) */}
            <div className="lg:col-span-12 xl:col-span-5 space-y-8">
              <div className="bg-zinc-900 border border-white/5 p-8 lg:p-10 transition-colors hover:border-white/10">
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-2xl font-serif">Protocolo Diario</h2>
                  <Activity className="w-5 h-5 text-gray-600" />
                </div>

                <div className="space-y-4">
                  {challenges.map((challenge) => {
                    const isCompleted = todaysLogs.includes(challenge.id);
                    return (
                      <div
                        key={challenge.id}
                        className="group/item relative py-4 border-b border-white/5"
                      >
                        <div className="flex justify-between items-center z-10 relative">
                          <span
                            className={`text-xs font-bold uppercase tracking-widest transition-colors duration-500 ${isCompleted ? "text-amber-500 line-through decoration-amber-500/50" : "text-gray-300 group-hover/item:text-white"}`}
                          >
                            {challenge.title}
                          </span>

                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-amber-500" />
                          ) : (
                            <button
                              onClick={() => handleOpenEvidenceModal(challenge)}
                              className="text-[10px] font-bold text-gray-500 hover:text-white border border-transparent hover:border-white/20 px-3 py-1 rounded-full transition-all"
                            >
                              CHECK-IN
                            </button>
                          )}
                        </div>
                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 bg-white/[0.02] scale-y-0 group-hover/item:scale-y-100 transition-transform origin-bottom duration-300" />
                      </div>
                    );
                  })}
                </div>

                <div className="mt-12 p-6 border border-dashed border-white/10 bg-black/20 text-center">
                  <Lock className="w-4 h-4 text-gray-600 mx-auto mb-2" />
                  <p className="text-[10px] uppercase tracking-widest text-gray-600">
                    Protocolos avanzados bloqueados
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: ALLIANCES (4 cols) */}
            <div className="lg:col-span-12 xl:col-span-3 space-y-8">
              <div className="border border-white/5 p-8 bg-transparent">
                <AllianceWidget />
              </div>
            </div>
          </div>
        </div>
      </div>

      <EvidenceModal
        isOpen={evidenceModal.isOpen}
        onClose={handleCloseEvidenceModal}
        onSubmit={handleSubmitEvidence}
        challengeTitle={evidenceModal.challengeTitle}
        requireEvidence={(profile?.level || 0) < 25}
        currentLevel={profile?.level || 0}
      />
    </>
  );
}
