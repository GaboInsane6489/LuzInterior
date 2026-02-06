import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDojoData } from "../hooks/useDojoData";
import { storageService } from "../services/storage.service";
import EvidenceModal from "../components/EvidenceModal";
import { ArrowUpRight, Lock, Loader2 } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function DojoMain() {
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
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | El Dojo</title>
        <meta name="description" content="Gestiona tus retos diarios." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Mi Luz Interior - Dojo",
          })}
        </script>
      </Helmet>

      <div className="">
        <div className="">
          <h2 className="text-center text-amber-400 text-2xl font-bold">
            El Dojo es un espacio donde puedes medir tu evolución personal y
            profesional.
          </h2>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 relative group bg-zinc-900/40 backdrop-blur-md p-12 lg:p-16 border border-white/5 rounded-[3rem]">
            <div className="relative z-10 space-y-12">
              <h3 className="text-3xl font-serif">Protocolo Diario</h3>
              <div className="space-y-10">
                {challenges.map((challenge) => {
                  const isCompleted = todaysLogs.includes(challenge.id);
                  return (
                    <div key={challenge.id} className="space-y-4">
                      <div className="flex justify-between items-end">
                        <div className="space-y-1">
                          <span
                            className={`text-xs font-bold uppercase ${isCompleted ? "text-amber-300" : "text-gray-400"}`}
                          >
                            {challenge.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-6">
                          {!isCompleted && (
                            <button
                              onClick={() => handleOpenEvidenceModal(challenge)}
                              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase font-bold hover:bg-amber-300 hover:text-black transition-all"
                            >
                              Check-in
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${isCompleted ? "bg-amber-300" : "bg-white/10"}`}
                          style={{ width: isCompleted ? "100%" : "0%" }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/40 backdrop-blur-md p-12 border border-white/5 rounded-[3rem] flex flex-col items-center text-center">
            <Lock className="w-10 h-10 text-gray-700 mb-6" />
            <h4 className="text-sm uppercase tracking-widest font-bold">
              Área Restringida
            </h4>
            <p className="text-xs text-gray-500 mt-4">
              Desbloquea llegando a los 7 días.
            </p>
          </div>
        </div>

        <div className="w-full bg-amber-300 p-10 rounded-[3.5rem] flex justify-between items-center group cursor-pointer hover:bg-white transition-all">
          <h4 className="text-black font-serif text-3xl">Profundidad Total</h4>
          <div className="bg-black text-white w-20 h-20 rounded-full flex items-center justify-center">
            <ArrowUpRight className="w-8 h-8" />
          </div>
        </div>
      </motion.div>

      <EvidenceModal
        isOpen={evidenceModal.isOpen}
        onClose={handleCloseEvidenceModal}
        onSubmit={handleSubmitEvidence}
        challengeTitle={evidenceModal.challengeTitle}
      />
    </>
  );
}
