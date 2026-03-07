import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDojoData } from "../hooks/useDojoData";
import { storageService } from "../services/storage.service";
import { dojoService } from "../services/dojo.service";
import EvidenceModal from "../components/EvidenceModal";
import ZenFocusCard from "../components/ZenFocusCard";
import AllianceWidget from "../components/AllianceWidget";
import {
  Lock,
  Loader2,
  Flame,
  Trophy,
  Zap,
  CheckCircle2,
  Shield,
  Activity,
  ChevronDown,
} from "lucide-react";

function animateNumber({ from = 0, to = 0, duration = 800, onUpdate }) {
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const value = Math.floor(from + (to - from) * easeOutQuart);
    onUpdate(value);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
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

  const streak = profile?.streak ?? 0;
  const totalXP = profile?.xp || 0;
  const [displayXP, setDisplayXP] = useState(0);
  const lastXPRef = useRef(0);

  useEffect(() => {
    animateNumber({
      from: lastXPRef.current,
      to: totalXP,
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
        <Loader2 className="w-10 h-10 text-amber-400 animate-spin" />
      </div>
    );
  }

  const currentLevel = Math.floor(displayXP / 1000) + 1;

  return (
    <>
      <Helmet>
        <title>Dojo | Protocolo Diario</title>
      </Helmet>

      <div className="min-h-screen text-white pt-24 pb-20 selection:bg-amber-500/40">
        <div className="max-w-5xl mx-auto px-6 space-y-16">
          {/* SECCIÓN 1: IDENTIDAD - COMPACTADA */}
          <header className="relative space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3 animate-fade-in">
                <div className="h-[2px] w-8 bg-amber-400"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-amber-400">
                  Estado del Guerrero
                </span>
              </div>
              <h1 className="text-7xl md:text-8xl font-serif text-white tracking-tighter leading-none">
                Dojo{" "}
                <span className="italic font-light text-amber-400/30">
                  Protocol
                </span>
              </h1>
            </div>

            {/* Stats - Sin fondo, bordes sutiles y colores vivos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px border border-white/10">
              {[
                {
                  label: "Racha",
                  val: streak,
                  sub: "Días activos",
                  icon: Flame,
                  color: "text-orange-500",
                },
                {
                  label: `Nivel ${currentLevel}`,
                  val: dojoService.getRankTitle?.(currentLevel) || "Guerrero",
                  sub: `${Math.floor((displayXP % 1000) / 10)}% sincronizado`,
                  icon: Trophy,
                  color: "text-cyan-400",
                },
                {
                  label: "XP Total",
                  val: displayXP.toLocaleString(),
                  sub: `Siguiente: ${Math.ceil((displayXP + 1) / 1000) * 1000}`,
                  icon: Zap,
                  color: "text-amber-400",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-6 group hover:bg-white/[0.03] transition-colors duration-500"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-400 font-bold">
                      {stat.label}
                    </p>
                    <stat.icon
                      className={`w-4 h-4 ${stat.color} opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all`}
                    />
                  </div>
                  <p className="text-3xl font-serif tracking-tight">
                    {stat.val}
                  </p>
                  <p className="text-[8px] uppercase tracking-widest text-zinc-500 font-medium">
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>
          </header>

          {/* SECCIÓN 2: ENFOQUE (ZEN) - COMPACTA */}
          <section className="relative py-4">
            <ZenFocusCard />
          </section>

          {/* SECCIÓN 3: PROTOCOLO - ALTURA REDUCIDA */}
          <section className="space-y-8">
            <div className="flex items-end justify-between border-b border-white/10 pb-4">
              <div className="space-y-1">
                <h2 className="text-3xl font-serif italic text-white">
                  Protocolo Diario
                </h2>
                <p className="text-zinc-400 text-xs font-medium tracking-wide">
                  Transmutaciones obligatorias del ciclo.
                </p>
              </div>
              <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-amber-400">
                <Activity className="w-3.5 h-3.5" />
                <span>Sistema Activo</span>
              </div>
            </div>

            <div className="divide-y divide-white/5">
              {challenges.map((challenge) => {
                const isCompleted = todaysLogs.includes(challenge.id);
                return (
                  <div
                    key={challenge.id}
                    className="group flex items-center justify-between py-6 transition-all hover:translate-x-1"
                  >
                    <div className="flex items-center gap-6">
                      <span className="text-[10px] font-bold text-amber-400/80 w-8">
                        +{challenge.xp_reward}
                      </span>
                      <h3
                        className={`text-lg md:text-xl font-medium tracking-tight ${isCompleted ? "text-zinc-600 line-through italic" : "text-zinc-100"}`}
                      >
                        {challenge.title}
                      </h3>
                    </div>
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-amber-500/60" />
                    ) : (
                      <button
                        onClick={() => handleOpenEvidenceModal(challenge)}
                        className="px-6 py-2 bg-white text-black text-[9px] font-black uppercase tracking-[0.2em] hover:bg-amber-400 transition-all"
                      >
                        Check-in
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* SECCIÓN 4: VANGUARDIA - COMPACTO */}
          <section className="pt-12 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-400">
                Vanguardia
              </span>
              <h2 className="text-4xl font-serif leading-none">
                Círculo de Honor
              </h2>
              <p className="text-zinc-400 text-xs leading-relaxed font-medium">
                Hombres forjando su destino en disciplina.
              </p>
            </div>
            <div className="lg:col-span-8 border border-white/5 p-1">
              <AllianceWidget />
            </div>
          </section>

          {/* FOOTER COMPACTO */}
          <footer className="pt-10 flex justify-center opacity-50">
            <div className="flex items-center gap-4 px-8 py-6 border border-dashed border-white/10">
              <Shield className="w-6 h-6 text-zinc-600" />
              <div className="text-left">
                <p className="text-[9px] text-zinc-400 uppercase tracking-[0.4em] font-black">
                  Operaciones de Combate
                </p>
                <p className="text-[7px] text-zinc-600 uppercase italic">
                  Próximo despliegue
                </p>
              </div>
            </div>
          </footer>
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
