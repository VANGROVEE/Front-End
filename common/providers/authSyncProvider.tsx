"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/common/icons/stores/use-auth-store";

export const AuthSyncProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setAuth } = useAuthStore();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setAuth(session, true);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setAuth(session, true);
      } else {
      }
    });

    return () => subscription.unsubscribe();
  }, [setAuth, supabase.auth]);

  return <>{children}</>;
};
