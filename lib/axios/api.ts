import { useAuthStore } from "@/common/stores/use-auth-store";
import axios from "axios";
import { createClient } from "../supabase/client";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const supabase = createClient();
      const { data, error: refreshError } =
        await supabase.auth.refreshSession();

      if (!refreshError && data.session) {
        const formattedPayload = {
          session: {
            access_token: data.session.access_token,
            expires_at: data.session.expires_at || 0,
          },
          user: data.session.user as any,
        };

        useAuthStore.getState().setAuth(formattedPayload);

        originalRequest.headers.Authorization = `Bearer ${data.session.access_token}`;
        return api(originalRequest);
      }

      useAuthStore.getState().logout();
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login?reason=session_expired";
      }
    }
    return Promise.reject(error);
  },
);
