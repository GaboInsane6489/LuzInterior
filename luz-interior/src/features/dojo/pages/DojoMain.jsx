import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDojoData } from "../hooks/useDojoData";
import { storageService } from "../services/storage.service";
import { dojoService } from "../services/dojo.service";
import EvidenceModal from "../components/EvidenceModal";
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
  ScrollText,
  Sword,
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
        <title>Dojo | La Senda del Señor del Círculo</title>
      </Helmet>

      <div className="min-h-screen text-white pt-6 pb-20 selection:bg-amber-500/40">
        <div className="max-w-5xl mx-auto px-6 space-y-10">
          {/* HEADER & STATS: LA HOGUERA DEL DESTINO */}
          <header className="space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3 animate-fade-in">
                <Flame className="w-3 h-3 text-amber-500 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-[0.5em] text-amber-500/80">
                  Gracia Perdida Reencontrada
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tighter leading-none">
                Círculo{" "}
                <span className="italic font-light text-amber-400/40 text-4xl md:text-6xl">
                  Primordial
                </span>
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px border border-white/10 bg-white/5">
              {[
                {
                  label: "Llama Interior",
                  val: `${streak} Días`,
                  sub: "Racha de Ascuas",
                  icon: Flame,
                  color: "text-orange-500",
                },
                {
                  label: `Rango: ${dojoService.getRankTitle?.(currentLevel) || "Sinluz"}`,
                  val: `LVL ${currentLevel}`,
                  sub: "Poder acumulado",
                  icon: Trophy,
                  color: "text-amber-400",
                },
                {
                  label: "Runas Obtenidas",
                  val: displayXP.toLocaleString(),
                  sub: "Total de Experiencia",
                  icon: Zap,
                  color: "text-cyan-400",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-5 bg-black/40 backdrop-blur-md group hover:bg-zinc-900/50 transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-[8px] uppercase tracking-[0.3em] text-zinc-500 font-bold">
                      {stat.label}
                    </p>
                    <stat.icon
                      className={`w-3.5 h-3.5 ${stat.color} group-hover:scale-110 transition-transform`}
                    />
                  </div>
                  <p className="text-2xl font-serif tracking-tight text-zinc-100">
                    {stat.val}
                  </p>
                  <p className="text-[7px] uppercase tracking-widest text-zinc-600 font-bold">
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>
          </header>

          {/* GALERÍA DE LOS REINOS: COLOR ORIGINAL DESDE EL INICIO */}
          <section className="grid grid-cols-12 gap-3 h-[350px] md:h-[450px]">
            <div className="col-span-8 overflow-hidden relative group border border-white/10 shadow-2xl">
              <img
                src="/images/DarkSoulsII6.webp"
                alt="Majula"
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 max-w-sm">
                <p className="text-[10px] uppercase tracking-[0.4em] text-amber-400 font-bold mb-2">
                  Tierras Intermedias
                </p>
                <p className="text-xs text-zinc-300 leading-relaxed font-medium italic">
                  "Incluso en la oscuridad más profunda, la voluntad del
                  guerrero brilla como una hoguera solitaria en la inmensidad de
                  Majula."
                </p>
              </div>
            </div>
            <div className="col-span-4 flex flex-col gap-3">
              <div className="h-1/2 overflow-hidden border border-white/10 group relative">
                <img
                  src="/images/DarkSoulsII10.webp"
                  alt="Fortaleza"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="h-1/2 overflow-hidden border border-white/10 group relative">
                <img
                  src="/images/DarkSoulsII11.webp"
                  alt="Caballero"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
            </div>
          </section>

          {/* PROTOCOLO DIARIO: LAS LEYES DE LA REGRESIÓN */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2 text-amber-500">
                <Sword className="w-4 h-4" />
                <h2 className="text-2xl font-serif italic">Senda del Deber</h2>
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed font-medium">
                No hay victoria sin sacrificio. Completa las transmutaciones
                diarias para evitar que tu llama se extinga. Cada acción es un
                paso más hacia el Trono del Círculo.
              </p>
              <div className="p-4 bg-zinc-900/50 border-l-2 border-amber-500/50">
                <p className="text-[10px] text-zinc-500 italic">
                  "Aquel que no tiene el valor de enfrentar su propia sombra,
                  nunca podrá reclamar la corona."
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 gap-2">
                {challenges.map((challenge) => {
                  const isCompleted = todaysLogs.includes(challenge.id);
                  return (
                    <div
                      key={challenge.id}
                      className={`group flex items-center justify-between p-4 rounded-sm border transition-all ${isCompleted ? "bg-zinc-950/50 border-white/5" : "bg-white/[0.02] border-white/10 hover:border-amber-500/30"}`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${isCompleted ? "bg-zinc-700" : "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"}`}
                        />
                        <div>
                          <h3
                            className={`text-sm font-bold tracking-wide uppercase ${isCompleted ? "text-zinc-600 line-through" : "text-zinc-200"}`}
                          >
                            {challenge.title}
                          </h3>
                          <span className="text-[9px] text-zinc-500 font-black">
                            RECOMPENSA: {challenge.xp_reward} RUNAS
                          </span>
                        </div>
                      </div>
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-amber-600/40" />
                      ) : (
                        <button
                          onClick={() => handleOpenEvidenceModal(challenge)}
                          className="px-4 py-2 bg-amber-500 text-black text-[9px] font-black uppercase tracking-tighter hover:bg-white transition-all transform group-hover:translate-x-1"
                        >
                          Consumar
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* VANGUARDIA Y ALIANZAS */}
          <section className="pt-8 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center gap-2">
                <ScrollText className="w-4 h-4 text-zinc-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
                  Tablilla de Honor
                </span>
              </div>
              <h2 className="text-3xl font-serif">Pacto de Sangre</h2>
              <p className="text-zinc-500 text-[11px] leading-relaxed font-medium">
                Observa a tus hermanos de armas. En este mundo desolado, la
                única certeza es la fuerza del pacto que nos une. No caminas
                solo por el Valle de Niebla.
              </p>
            </div>
            <div className="lg:col-span-8 border border-white/5 p-1 bg-black/40 backdrop-blur-sm shadow-inner">
              <AllianceWidget />
            </div>
          </section>

          {/* FOOTER CINEMATOGRÁFICO */}
          <footer className="pt-6 flex flex-col items-center gap-4 opacity-40">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
            <div className="flex items-center gap-4 px-6 py-4 border border-white/5 bg-zinc-950/50">
              <Shield className="w-5 h-5 text-amber-600" />
              <div className="text-left">
                <p className="text-[8px] text-zinc-400 uppercase tracking-[0.4em] font-black">
                  Restaurando Orden Dorado
                </p>
                <p className="text-[7px] text-zinc-600 uppercase italic">
                  Tu voluntad es la ley de este reino
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
