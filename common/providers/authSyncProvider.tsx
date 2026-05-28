"use client";

import { useAuthStore } from "@/common/stores/use-auth-store";
import { createClient } from "@/lib/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { useEffect } from "react";

export const AuthSyncProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setAuth } = useAuthStore();
  const supabase = createClient();

  useEffect(() => {
    const handleSession = (supabaseSession: Session | null) => {
      if (!supabaseSession) return;

      const formattedPayload = {
        session: {
          access_token: supabaseSession.access_token,
          expires_at: supabaseSession.expires_at || 0,
        },
        user: supabaseSession.user as any,
      };

      setAuth(formattedPayload);
    };

    const initSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        handleSession(session);
      }
    };

    initSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        handleSession(session);
      }
     
    });

    return () => subscription.unsubscribe();
  }, [setAuth, supabase]);

  return <>{children}</>;
};
