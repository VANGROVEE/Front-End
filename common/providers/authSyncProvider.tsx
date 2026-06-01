"use client";

import { useAuthStore } from "@/common/stores/use-auth-store";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";

// providers/AuthSyncProvider.tsx

export const AuthSyncProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { refreshMe } = useAuthStore();
  const supabase = createClient();

  useEffect(() => {
    // 1. Jalankan sinkronisasi saat pertama kali aplikasi dimuat (Hydration)
    const initSession = async () => {
      await refreshMe();
    };

    initSession();

    // 2. Listener Supabase tetap perlu untuk menangani event SIGNED_OUT
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        // Alih-alih setAuth manual, panggil refreshMe agar data yang dipakai adalah data PRISMA
        await refreshMe();
      }

      if (event === "SIGNED_OUT") {
        useAuthStore.getState().logout();
      }
    });

    return () => subscription.unsubscribe();
  }, [refreshMe, supabase]);

  return <>{children}</>;
};
