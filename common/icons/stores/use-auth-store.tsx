import { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "FARMER";
  token: string;
}

export interface AuthState {
  user: AuthUser | null;
  expiresAt: number | null;

  setAuth: (session: Session | null, rememberMe?: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      expiresAt: null,

      setAuth: (session, remember = false) => {
        if (!session) {
          set({ user: null, expiresAt: null });
          return;
        }

        const { user, access_token } = session;

        const userData: AuthUser = {
          id: user.id,
          email: user.email || "",
          name: user.user_metadata?.full_name || "User",

          role: user.user_metadata?.role || "FARMER",
          token: access_token,
        };

        const duration = remember
          ? 30 * 24 * 60 * 60 * 1000
          : 24 * 60 * 60 * 1000;

        const expiry = Date.now() + duration;

        set({ user: userData, expiresAt: expiry });
      },

      logout: () => {
        set({ user: null, expiresAt: null });
      },
    }),
    {
      name: "vanggrove-admin-auth-storage",
      storage: createJSONStorage(() => localStorage),

      onRehydrateStorage: () => (state) => {
        if (state?.expiresAt && Date.now() > state.expiresAt) {
          state.logout();
        }
      },
    },
  ),
);
