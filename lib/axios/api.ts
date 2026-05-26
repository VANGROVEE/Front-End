import { useAuthStore } from "@/common/icons/stores/use-auth-store";
import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().user?.token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || "";

      if (status === 401) {
        useAuthStore.getState().logout();
        Cookies.remove("token");

        if (typeof window !== "undefined") {
          const reason = message.includes("perangkat lain")
            ? "multi_device"
            : "session_expired";

          if (!window.location.pathname.startsWith("/auth")) {
            window.location.href = `/auth?reason=${reason}`;
          }
        }
      }
    }

    return Promise.reject(error);
  },
);
