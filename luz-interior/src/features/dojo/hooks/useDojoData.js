import { useState, useEffect } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { dojoService } from "../services/dojo.service";

export const useDojoData = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const [profileData, challengesData] = await Promise.all([
            dojoService.getProfile(user.id),
            dojoService.getChallenges(),
          ]);
          setProfile(profileData);
          setChallenges(challengesData);
        } catch (error) {
          console.error("Error cargando datos del Dojo:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [user]);
  return { profile, challenges, loading };
};
