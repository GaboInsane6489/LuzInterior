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

/* =========================================================
   Utilidades de animación (JS PURO) - Optimizadas
   ========================================================= */
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
        <div className="relative flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
          <span className="text-[10px] uppercase tracking-[0.5em] text-amber-500/50">
            Sincronizando...
          </span>
        </div>
      </div>
    );
  }

  // Lógica de cálculo de nivel para uso dinámico
  const currentLevel = Math.floor(displayXP / 1000) + 1;

  return (
    <>
      <Helmet>
        <title>Dojo | Protocolo Diario</title>
      </Helmet>

      <div className="min-h-screen text-white pt-32 pb-40 selection:bg-amber-500/30">
        <div className="max-w-5xl mx-auto px-6 space-y-32">
          {/* SECCIÓN 1: IDENTIDAD Y ESTADO */}
          <header className="relative space-y-16">
            <div className="space-y-6">
              <div className="flex items-center gap-4 animate-fade-in">
                <div className="h-[1px] w-12 bg-amber-400"></div>
                <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-amber-300">
                  Estado del Guerrero
                </span>
              </div>
              <h1 className="text-8xl md:text-[10rem] font-serif text-white tracking-tighter leading-none">
                Dojo
                <span className="italic font-light text-amber-200/20">
                  Protocol
                </span>
              </h1>
            </div>

            {/* Stats en fila solemne */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
              {[
                {
                  label: "Racha",
                  val: streak,
                  sub: "Días activos",
                  icon: Flame,
                  color: "text-amber-500",
                },
                {
                  label: `Nivel ${currentLevel}`,
                  val: dojoService.getRankTitle
                    ? dojoService.getRankTitle(currentLevel)
                    : "Guerrero",
                  sub: `${Math.floor((displayXP % 1000) / 10)}% sincronizado`,
                  icon: Trophy,
                  color: "text-cyan-500",
                },
                {
                  label: "XP Total",
                  val: displayXP.toLocaleString(),
                  sub: `Meta: ${Math.ceil((displayXP + 1) / 1000) * 1000}`,
                  icon: Zap,
                  color: "text-purple-500",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-black/20 p-10 group hover:bg-white/[0.02] transition-colors duration-700"
                >
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">
                      {stat.label}
                    </p>
                    <stat.icon
                      className={`w-5 h-5 ${stat.color} opacity-20 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110`}
                    />
                  </div>
                  <p className="text-4xl font-serif tracking-tight mb-2 truncate">
                    {stat.val}
                  </p>
                  <p className="text-[8px] uppercase tracking-widest text-zinc-600 group-hover:text-zinc-400 transition-colors">
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>
          </header>

          {/* SECCIÓN 2: ENFOQUE (ZEN) */}
          <section className="relative">
            <div className="absolute -left-12 top-0 h-full w-[1px] bg-gradient-to-b from-amber-500/50 via-transparent to-transparent hidden md:block"></div>
            <ZenFocusCard />
          </section>

          {/* SECCIÓN 3: PROTOCOLO (LISTA VERTICAL) */}
          <section className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <h2 className="text-4xl font-serif italic">Protocolo Diario</h2>
                <p className="text-gray-500 text-sm font-light max-w-md tracking-wide">
                  La maestría no es un acto, es un hábito. Completa las
                  transmutaciones obligatorias del ciclo actual.
                </p>
              </div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-amber-500 font-bold">
                <Activity className="w-4 h-4" />
                <span>Sistema Activo</span>
              </div>
            </div>

            <div className="border-t border-white/10">
              {challenges.map((challenge) => {
                const isCompleted = todaysLogs.includes(challenge.id);
                return (
                  <div
                    key={challenge.id}
                    className="group relative flex items-center justify-between py-10 border-b border-white/5 transition-all duration-700 hover:px-4"
                  >
                    <div className="relative z-10 flex items-center gap-8">
                      <span className="text-[10px] font-serif text-gray-600 group-hover:text-amber-500 transition-colors w-10">
                        +{challenge.xp_reward}
                      </span>
                      <h3
                        className={`text-xl md:text-2xl font-light tracking-tight transition-all duration-500 ${
                          isCompleted
                            ? "text-gray-600 line-through italic"
                            : "text-gray-200 group-hover:text-white"
                        }`}
                      >
                        {challenge.title}
                      </h3>
                    </div>

                    <div className="relative z-10">
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-amber-500/40" />
                      ) : (
                        <button
                          onClick={() => handleOpenEvidenceModal(challenge)}
                          className="px-8 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-amber-400 transition-all duration-500 shadow-xl"
                        >
                          Check-in
                        </button>
                      )}
                    </div>
                    {/* Background hover slide */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-1000 ease-out" />
                  </div>
                );
              })}
            </div>

            <div className="py-12 flex justify-center">
              <div className="flex flex-col items-center gap-4 opacity-40 group cursor-help transition-opacity hover:opacity-100">
                <Lock className="w-5 h-5 transition-transform group-hover:rotate-12" />
                <span className="text-[9px] uppercase tracking-[0.5em] text-zinc-500">
                  Protocolos de Élite Bloqueados
                </span>
              </div>
            </div>
          </section>

          {/* SECCIÓN 4: VANGUARDIA (ALIANZAS) - PRESENTACIÓN DESTACADA */}
          <section className="relative pt-20 border-t border-white/5">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-8 py-2">
              <ChevronDown className="w-4 h-4 text-amber-500 animate-bounce" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-4 space-y-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-400">
                  Vanguardia
                </span>
                <h2 className="text-5xl font-serif leading-[0.9]">
                  El Círculo de Honor
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed font-light">
                  No caminas solo. Estos son los hombres que han decidido forjar
                  su propio destino en el fuego de la disciplina.
                </p>
                <div className="pt-4">
                  <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent" />
                </div>
              </div>

              <div className="lg:col-span-8 relative">
                <div className="absolute -inset-4 border border-amber-500/5 -z-10 translate-x-4 translate-y-4"></div>
                <div className="relative bg-zinc-950/10 border border-white/5 p-2 transition-all hover:border-white/10">
                  <AllianceWidget />
                </div>
              </div>
            </div>
          </section>

          {/* MÓDULO FUTURO */}
          <footer className="pt-20 flex justify-center">
            <div className="group flex items-center gap-6 px-12 py-10 border border-dashed border-white/5 grayscale hover:grayscale-0 transition-all duration-1000">
              <Shield className="w-8 h-8 text-zinc-700 group-hover:text-amber-500/40" />
              <div className="text-left">
                <p className="text-[10px] text-zinc-600 uppercase tracking-[0.4em] font-bold group-hover:text-zinc-400 transition-colors">
                  Operaciones de Combate
                </p>
                <p className="text-[8px] text-zinc-800 uppercase italic">
                  Despliegue inminente
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
