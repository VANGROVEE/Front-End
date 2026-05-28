import Cookies from "js-cookie";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface BackendAuthPayload {
  session: {
    access_token: string;
    expires_at: number;
  };
  user: {
    id: string;
    email: string;
    role: string;
    user_metadata: {
      full_name: string;
    };
  };
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  expiresAt: number | null;
  setAuth: (payload: BackendAuthPayload | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      expiresAt: null,

      setAuth: (payload) => {
        if (!payload) {
          set({ user: null, token: null, expiresAt: null });
          Cookies.remove("be_token");
          return;
        }

        const { session, user } = payload;

        const userData: AuthUser = {
          id: user.id,
          email: user.email || "",
          name: user.user_metadata?.full_name || "User",
          role: user.role || "FARMER",
        };

        const expiryInMs = session.expires_at
          ? session.expires_at * 1000
          : Date.now() + 3600000;

        Cookies.set("be_token", session.access_token, {
          expires: 1,
          secure: process.env.NODE_ENV === "production",
        });

        set({
          user: userData,
          token: session.access_token,
          expiresAt: expiryInMs,
        });
      },

      logout: () => {
        set({ user: null, token: null, expiresAt: null });
        Cookies.remove("be_token");
      },
    }),
    {
      name: "vanggrove-auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
