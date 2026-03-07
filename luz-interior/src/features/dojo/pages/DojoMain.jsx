import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDojoData } from "../hooks/useDojoData";
import { storageService } from "../services/storage.service";
import { dojoService } from "../services/dojo.service";
import EvidenceModal from "../components/EvidenceModal";
import AllianceWidget from "../components/AllianceWidget";
import {
  Loader2,
  Flame,
  Trophy,
  Zap,
  Shield,
  ScrollText,
  Sword,
  CheckCircle2,
  Eye,
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
  const [displayXP, setDisplayXP] = useState(0);
  const lastXPRef = useRef(0);
  const streak = profile?.streak ?? 0;
  const totalXP = profile?.xp || 0;

  useEffect(() => {
    animateNumber({
      from: lastXPRef.current,
      to: totalXP,
      onUpdate: setDisplayXP,
    });
    lastXPRef.current = totalXP;
  }, [totalXP]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-10 h-10 text-amber-400 animate-spin" />
      </div>
    );

  const currentLevel = Math.floor(displayXP / 1000) + 1;

  return (
    <>
      <Helmet>
        <title>Dojo | La Senda del Señor del Círculo</title>
      </Helmet>

      {/* Eliminado el fondo negro sólido para respetar el video del layout */}
      <div className="text-white selection:bg-amber-500/40 font-sans pb-20">
        {/* HERO: EL DESPERTAR (Video Snow Castle) */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mb-10">
          <video
            src="/videos/Snow-Castle-Dark-Souls-3-Moewalls-Com.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
          <div className="relative z-10 text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Flame className="w-3 h-3 text-amber-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-amber-500">
                Gracia Perdida Reencontrada
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif tracking-tighter leading-none text-white drop-shadow-2xl">
              Círculo{" "}
              <span className="italic font-light text-amber-400/50">
                Primordial
              </span>
            </h1>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 space-y-20">
          {/* STATS BAR */}
          <header className="grid grid-cols-1 md:grid-cols-3 gap-px border border-white/10 bg-white/5 backdrop-blur-md">
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
                className="p-6 bg-black/40 group hover:bg-white/[0.03] transition-all"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-[8px] uppercase tracking-[0.3em] text-zinc-500 font-bold">
                    {stat.label}
                  </p>
                  <stat.icon
                    className={`w-4 h-4 ${stat.color} transition-transform group-hover:scale-125`}
                  />
                </div>
                <p className="text-3xl font-serif text-zinc-100">{stat.val}</p>
                <p className="text-[7px] uppercase tracking-widest text-zinc-600 mt-1">
                  {stat.sub}
                </p>
              </div>
            ))}
          </header>

          {/* GALERÍA DE LOS REINOS (Majula) */}
          <section className="grid grid-cols-12 gap-4 h-[400px]">
            <div className="col-span-8 overflow-hidden relative group border border-white/10">
              <img
                src="/images/DarkSoulsII6.webp"
                alt="Majula"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 max-w-sm">
                <p className="text-[10px] uppercase tracking-[0.4em] text-amber-400 font-bold mb-2">
                  Tierras Intermedias
                </p>
                <p className="text-xs text-zinc-300 italic">
                  "Incluso en la oscuridad, la voluntad brilla como una hoguera
                  solitaria."
                </p>
              </div>
            </div>
            <div className="col-span-4 flex flex-col gap-4">
              <div className="h-1/2 overflow-hidden border border-white/10">
                <img
                  src="/images/DarkSoulsII10.webp"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-1/2 overflow-hidden border border-white/10">
                <img
                  src="/images/DarkSoulsII11.webp"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* SECCIÓN INTERMEDIA: LA GUARDIANA (Video completo) */}
          <section className="relative h-[450px] border border-white/10 overflow-hidden group">
            <video
              src="/videos/Fire-Keeper-Dark-Souls-3-Moewalls-Com.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-90 transition-transform duration-[3s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-10">
              <h2 className="text-4xl font-serif italic text-amber-400/90 mb-4 drop-shadow-lg">
                El Juramento del Silencio
              </h2>
              <p className="max-w-xl text-zinc-100 font-medium leading-relaxed drop-shadow-md">
                "No buscamos la perfección, buscamos la transmutación. Convertir
                el cansancio en disciplina y la duda en una hoja afilada."
              </p>
            </div>
          </section>

          {/* SENDA DEL DEBER (Challenges) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2 text-amber-500">
                <Sword className="w-4 h-4" />
                <h2 className="text-2xl font-serif italic">Senda del Deber</h2>
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Consuma las tareas diarias para evitar que tu llama se extinga.
                Cada acción es un paso hacia el Trono.
              </p>
            </div>
            <div className="lg:col-span-8 space-y-2">
              {challenges.map((challenge) => {
                const isCompleted = todaysLogs.includes(challenge.id);
                return (
                  <div
                    key={challenge.id}
                    className={`flex items-center justify-between p-5 border transition-all ${isCompleted ? "bg-black/20 border-white/5 opacity-50" : "bg-white/[0.03] border-white/10 hover:border-amber-500/30"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${isCompleted ? "bg-zinc-700" : "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"}`}
                      />
                      <div>
                        <h3
                          className={`text-sm font-bold uppercase tracking-wide ${isCompleted ? "text-zinc-600 line-through" : "text-zinc-100"}`}
                        >
                          {challenge.title}
                        </h3>
                        <span className="text-[9px] text-zinc-500 font-black">
                          RECOMPENSA: {challenge.xp_reward} RUNAS
                        </span>
                      </div>
                    </div>
                    {!isCompleted && (
                      <button
                        onClick={() =>
                          setEvidenceModal({
                            isOpen: true,
                            challengeId: challenge.id,
                            challengeTitle: challenge.title,
                            xpReward: challenge.xp_reward,
                          })
                        }
                        className="px-4 py-2 bg-amber-500 text-black text-[9px] font-black uppercase tracking-widest hover:bg-white transition-all"
                      >
                        Consumar
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* SECCIÓN FINAL: LA REINA (Video completo aclarado) */}
          <section className="relative h-[450px] border border-white/10 overflow-hidden group">
            <video
              src="/videos/Dark-Queen-Knight-Moewalls-Com.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
            <div className="absolute bottom-10 left-10 max-w-2xl space-y-4">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300">
                  Vigilancia Eterna
                </span>
              </div>
              <h2 className="text-5xl font-serif text-white leading-none">
                La Mirada de la <br />
                <span className="italic text-amber-400/70">Soberana Caída</span>
              </h2>
              <p className="text-zinc-100 text-sm leading-relaxed max-w-lg drop-shadow-md">
                "En este dojo, no hay jueces externos. Solo la mirada fría de tu
                propia consciencia. Si mientes en tu progreso, el peso de tu
                corona te aplastará."
              </p>
            </div>
          </section>

          {/* PACTO DE SANGRE */}
          <section className="pt-8 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center gap-2">
                <ScrollText className="w-4 h-4 text-zinc-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
                  Tablilla de Honor
                </span>
              </div>
              <h2 className="text-3xl font-serif italic">Pacto de Sangre</h2>
              <p className="text-zinc-500 text-[11px] leading-relaxed font-medium">
                Observa a tus hermanos de armas. En este mundo desolado, la
                única certeza es la fuerza del pacto que nos une.
              </p>
            </div>
            <div className="lg:col-span-8 bg-black/40 backdrop-blur-sm border border-white/5 p-1 shadow-inner">
              <AllianceWidget />
            </div>
          </section>

          {/* FOOTER */}
          <footer className="flex flex-col items-center gap-4 py-10 opacity-60">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
            <div className="flex items-center gap-4 px-6 py-4 border border-white/5 bg-black/20">
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
        onClose={() => setEvidenceModal({ ...evidenceModal, isOpen: false })}
        onSubmit={async (file) => {
          let url = file
            ? (
                await storageService.uploadEvidence(
                  file,
                  profile.id,
                  evidenceModal.challengeId,
                )
              ).url
            : null;
          await completeChallenge(
            evidenceModal.challengeId,
            evidenceModal.xpReward,
            url,
          );
        }}
        challengeTitle={evidenceModal.challengeTitle}
        requireEvidence={(profile?.level || 0) < 25}
        currentLevel={profile?.level || 0}
      />
    </>
  );
}
