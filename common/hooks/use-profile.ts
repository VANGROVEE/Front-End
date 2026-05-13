"use client";

import { useEffect, useState } from "react";
import { profileApi, UserProfile } from "@/lib/api/profil";
import { useAuthStore } from "@/common/icons/stores/use-auth-store";

export const useProfile = () => {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.token) return;
    setLoading(true);
    profileApi
      .get()
      .then(setProfile)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user?.token]);

  const handleUpdate = async (data: Partial<UserProfile>) => {
    setUpdating(true);
    try {
      const updated = await profileApi.update(data);
      setProfile(updated);
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setUpdating(false);
    }
  };

  return { profile, loading, updating, error, handleUpdate };
};
