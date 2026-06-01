import { useAuthStore } from "@/common/stores/use-auth-store";
import axios from "axios";
import { createClient } from "../supabase/client";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
});

// Interceptor Request: Selalu ambil token terbaru dari store
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor Response: Menangani Token Expired (401)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 1. ABAIKAN jika rute adalah login/auth agar tidak terjadi loop redirect
    // Tambahkan rute register/google jika perlu
    const authRoutes = ["/auth/login", "/auth/register", "/auth/google"];
    if (authRoutes.some((route) => originalRequest.url?.includes(route))) {
      return Promise.reject(error);
    }

    // 2. TANGANI 401 (Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const supabase = createClient();
        const { data, error: refreshError } =
          await supabase.auth.refreshSession();

        // Jika Refresh Berhasil
        if (!refreshError && data.session) {
          const formattedPayload = {
            session: {
              access_token: data.session.access_token,
              expires_at: data.session.expires_at || 0,
            },
            user: data.session.user as any,
          };

          // Update Zustand & Cookie (setAuth biasanya menghapus cookie lama & pasang yang baru)
          useAuthStore.getState().setAuth(formattedPayload);

          // Ulangi request asli dengan token baru
          originalRequest.headers.Authorization = `Bearer ${data.session.access_token}`;
          return api(originalRequest);
        }
      } catch (err) {
        console.error("Token refresh failed:", err);
      }

      /**
       * 3. JIKA SEMUA GAGAL (Refresh Error atau Token tidak bisa diperbarui)
       * Di sinilah kita HARUS menghapus semua sisa sesi agar tidak terjadi bug
       * di mana user terlihat login padahal token sudah mati.
       */
      useAuthStore.getState().logout(); // Ini akan menghapus token di store & be_token di cookie

      if (typeof window !== "undefined") {
        // Gunakan replace agar user tidak bisa klik 'back' ke halaman terproteksi
        window.location.replace("/auth/login?reason=session_expired");
      }
    }

    return Promise.reject(error);
  },
);
