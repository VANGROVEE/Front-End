"use client";

import { useAuthStore } from "@/common/stores/use-auth-store";
import { createBrowserClient } from "@supabase/ssr";
import type { Session } from "@supabase/supabase-js";
import { useEffect } from "react";

export function AuthListener() {
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const handleSessionUpdate = (supabaseSession: Session | null) => {
      if (!supabaseSession) {
        return;
      }

      const formattedPayload = {
        session: {
          access_token: supabaseSession.access_token,
          expires_at: supabaseSession.expires_at || 0,
        },
        user: supabaseSession.user as any,
      };

      setAuth(formattedPayload);
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSessionUpdate(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        handleSessionUpdate(session);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setAuth]);

  return null;
}
