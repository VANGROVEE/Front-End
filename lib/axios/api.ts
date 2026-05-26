import { useAuthStore } from "@/common/icons/stores/use-auth-store";
import { extractErrorMessage } from "@/common/utils/error";
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
    const friendlyMessage = extractErrorMessage(error);
    return Promise.reject(new Error(friendlyMessage));
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || "";

    if (status === 401) {
      useAuthStore.getState().logout();

      Cookies.remove("token");

      if (typeof window !== "undefined") {
        if (message.includes("perangkat lain")) {
          window.location.href = "/auth?reason=multi_device";
        } else {
          window.location.href = "/auth?reason=session_expired";
        }
      }
    }

    const friendlyMessage = extractErrorMessage(error);
    return Promise.reject(new Error(friendlyMessage));
  },
);
