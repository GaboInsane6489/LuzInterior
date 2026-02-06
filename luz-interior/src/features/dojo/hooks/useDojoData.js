import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { dojoService } from "../services/dojo.service";
import { supabase } from "../../../config/supabase";

export const useDojoData = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  const [todaysLogs, setTodaysLogs] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [userAchievements, setUserAchievements] = useState([]);

  const fetchData = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const today = new Date().toISOString().split("T")[0];

      const [challengesData, logsData, allAchievements, unlockedAchievements] =
        await Promise.all([
          dojoService.getChallenges(),
          supabase
            .from("challenge_logs")
            .select("challenge_id")
            .eq("user_id", user.id)
            .eq("logged_at", today),
          dojoService.getAllAchievements(),
          dojoService.getUserAchievements(user.id),
        ]);

      setChallenges(challengesData);
      setTodaysLogs(logsData.data?.map((l) => l.challenge_id) || []);
      setAchievements(allAchievements);
      setUserAchievements(unlockedAchievements);
    } catch (error) {
      console.error("Error cargando datos del Dojo:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const completeChallenge = async (challengeId, xpReward) => {
    try {
      await dojoService.logDailyProgress(user.id, challengeId, xpReward);
      // Sincronizar perfil global y datos locales
      await Promise.all([refreshProfile(), fetchData()]);
      return { success: true };
    } catch (error) {
      console.error("Error completando reto:", error);
      return { success: false, error: error.message };
    }
  };

  return {
    profile,
    challenges,
    todaysLogs,
    achievements,
    userAchievements,
    loading,
    completeChallenge,
    refreshData: fetchData,
  };
};
