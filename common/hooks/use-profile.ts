"use client";

import { useEffect, useState } from "react";
import { profileApi, UserProfile } from "@/lib/api/profil";
import { useAuthStore } from "@/common/icons/stores/use-auth-store";
import { createClient } from "@/lib/supabase/client";

// Cache key per user ID
const getCacheKey = (userId: string) => `vangrove-profile-${userId}`;

const saveToCache = (userId: string, data: UserProfile) => {
  localStorage.setItem(getCacheKey(userId), JSON.stringify(data));
};

const loadFromCache = (userId: string): UserProfile | null => {
  try {
    const cached = localStorage.getItem(getCacheKey(userId));
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
};

export const useProfile = () => {
  const { user, setAuth } = useAuthStore();
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load cache saat user berubah
  useEffect(() => {
    if (user?.id) {
      const cached = loadFromCache(user.id);
      if (cached) setProfileState(cached);
    } else {
      setProfileState(null);
    }
  }, [user?.id]);

  const setProfile = (data: UserProfile | null) => {
    setProfileState(data);
    if (data && user?.id) saveToCache(user.id, data);
  };

  useEffect(() => {
    if (!user?.id) return;

    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const supabase = createClient();
        const { data: sessionData } = await supabase.auth.refreshSession();

        if (!sessionData.session) return;

        setAuth(sessionData.session, true);

        const data = await profileApi.get();

        if (isMounted) {
          const cached = loadFromCache(user.id);
          const merged: UserProfile = {
            name: data.name || cached?.name || "",
            nickname: data.nickname || cached?.nickname || "",
            email: data.email || cached?.email || "",
            role: data.role || cached?.role || "FARMER",
            avatar_url: data.avatar_url || cached?.avatar_url || "",
            phone_number: data.phone_number || cached?.phone_number || "",
            address_home: data.address_home || cached?.address_home || "",
            bio: data.bio || cached?.bio || "",
            fcm_token: data.fcm_token || cached?.fcm_token || "",
          };
          setProfile(merged);
        }
      } catch (err) {
        console.log("FETCH ERROR:", err);
        if (isMounted) {
          const cached = loadFromCache(user.id);
          if (cached) setProfileState(cached);
          setError(err instanceof Error ? err.message : "Terjadi kesalahan");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [user?.id, setAuth]);

  const handleUpdate = async (data: Partial<UserProfile>) => {
    setUpdating(true);

    try {
      await profileApi.update(data);

      const updatedProfile: UserProfile = {
        ...(profile ?? ({} as UserProfile)),
        ...data,
      };

      setProfile(updatedProfile);

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      return false;
    } finally {
      setUpdating(false);
    }
  };

  return { profile, loading, updating, error, handleUpdate };
};
