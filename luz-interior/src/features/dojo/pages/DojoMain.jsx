import React, { useState, useMemo, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useDojoData } from "../hooks/useDojoData";
import { storageService } from "../services/storage.service";
import EvidenceModal from "../components/EvidenceModal";
import { ArrowUpRight, Lock, Loader2, Flame, Zap } from "lucide-react";
import { Link } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

/* ───────────────────────── Skeletons ───────────────────────── */

function Skeleton({ className }) {
  return <div className={`animate-pulse bg-white/5 rounded-xl ${className}`} />;
}

/* ───────────────────────── Main ───────────────────────── */

export default function DojoMain() {
  const { profile, challenges, todaysLogs, loading, completeChallenge } =
    useDojoData();

  const [evidenceModal, setEvidenceModal] = useState({
    isOpen: false,
    challengeId: null,
    challengeTitle: "",
    xpReward: 0,
  });

  const [xpGain, setXpGain] = useState(null);

  /* ───────────────────────── Derived data (memoized) ───────────────────────── */

  const completedToday = useMemo(() => todaysLogs.length, [todaysLogs]);

  const xpToday = useMemo(
    () =>
      challenges
        .filter((c) => todaysLogs.includes(c.id))
        .reduce((acc, c) => acc + c.xp_reward, 0),
    [challenges, todaysLogs],
  );

  /* ───────────────────────── Handlers ───────────────────────── */

  const openEvidenceModal = useCallback((challenge) => {
    setEvidenceModal({
      isOpen: true,
      challengeId: challenge.id,
      challengeTitle: challenge.title,
      xpReward: challenge.xp_reward,
    });
  }, []);

  const closeEvidenceModal = useCallback(() => {
    setEvidenceModal({
      isOpen: false,
      challengeId: null,
      challengeTitle: "",
      xpReward: 0,
    });
  }, []);

  const handleSubmitEvidence = useCallback(
    async (file) => {
      const evidence = await storageService.uploadEvidence(
        file,
        profile.id,
        evidenceModal.challengeId,
      );

      await completeChallenge(
        evidenceModal.challengeId,
        evidenceModal.xpReward,
        evidence.url,
      );

      setXpGain(evidenceModal.xpReward);
      setTimeout(() => setXpGain(null), 1600);
    },
    [profile, evidenceModal, completeChallenge],
  );

  /* ───────────────────────── Loading State ───────────────────────── */

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-6 space-y-12">
        <Skeleton className="h-10 w-2/3 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
        <Skeleton className="h-96" />
      </section>
    );
  }

  /* ───────────────────────── Render ───────────────────────── */

  return (
    <>
      <Helmet>
        <title>Dashboard | El Dojo</title>
        <meta
          name="description"
          content="Gestiona tus retos diarios y mide tu progreso."
        />
      </Helmet>

      {/* ───────────── Mini Stats ───────────── */}
      <section className="max-w-6xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard
            icon={<Flame />}
            label="Streak"
            value={`${profile?.streak ?? 0} días`}
          />
          <StatCard icon={<Zap />} label="XP Hoy" value={`+${xpToday}`} />
          <StatCard
            icon={<CheckIcon />}
            label="Retos"
            value={`${completedToday}/${challenges.length}`}
          />
        </div>
      </section>

      {/* ───────────── Protocolo Diario ───────────── */}
      <section className="max-w-6xl mx-auto px-6 mt-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-zinc-900/40 backdrop-blur-md p-12 border border-white/5 rounded-[3rem]"
        >
          <h3 className="text-3xl font-serif mb-12">Protocolo Diario</h3>

          <div className="space-y-10">
            {challenges.map((challenge) => {
              const isCompleted = todaysLogs.includes(challenge.id);

              return (
                <motion.div
                  key={challenge.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-end">
                    <span
                      className={`text-xs font-bold uppercase ${
                        isCompleted ? "text-amber-300" : "text-gray-400"
                      }`}
                    >
                      {challenge.title}
                    </span>

                    {!isCompleted && (
                      <button
                        onClick={() => openEvidenceModal(challenge)}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase font-bold hover:bg-amber-300 hover:text-black transition"
                      >
                        Check-in
                      </button>
                    )}
                  </div>

                  <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: isCompleted ? "100%" : "0%" }}
                      transition={{ duration: 0.6 }}
                      className={`h-full ${
                        isCompleted ? "bg-amber-300" : "bg-white/10"
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ───────────── Área Restringida ───────────── */}
      <section className="max-w-6xl mx-auto px-6 mt-12">
        <div className="bg-zinc-900/40 backdrop-blur-md p-12 border border-white/5 rounded-[3rem] text-center">
          <Lock className="w-10 h-10 text-gray-700 mx-auto mb-6" />
          <h4 className="text-sm uppercase tracking-widest font-bold">
            Área Restringida
          </h4>
          <p className="text-xs text-gray-500 mt-4">
            Desbloquea llegando a los 7 días.
          </p>
        </div>
      </section>

      {/* ───────────── CTA ───────────── */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="max-w-6xl mx-auto px-6 mt-24"
      >
        <div className="bg-amber-300 p-10 rounded-[3.5rem] flex justify-between items-center cursor-pointer hover:bg-white transition">
          <h4 className="text-black font-serif text-3xl">Profundidad Total</h4>
          <div className="bg-black text-white w-20 h-20 rounded-full flex items-center justify-center">
            <ArrowUpRight className="w-8 h-8" />
          </div>
        </div>
      </motion.div>

      {/* ───────────── XP Gain Animation ───────────── */}
      <AnimatePresence>
        {xpGain && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: -20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed bottom-12 right-12 bg-amber-300 text-black px-6 py-4 rounded-full font-bold shadow-xl"
          >
            +{xpGain} XP ⚡
          </motion.div>
        )}
      </AnimatePresence>

      <EvidenceModal
        isOpen={evidenceModal.isOpen}
        onClose={closeEvidenceModal}
        onSubmit={handleSubmitEvidence}
        challengeTitle={evidenceModal.challengeTitle}
      />
    </>
  );
}

/* ───────────────────────── Components ───────────────────────── */

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex items-center gap-4">
      <div className="text-amber-300">{icon}</div>
      <div>
        <p className="text-xs uppercase text-gray-400">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function CheckIcon() {
  return <span className="text-amber-300">✓</span>;
}
