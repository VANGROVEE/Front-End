import axios from "axios";
import { useAuthStore } from "@/common/icons/stores/use-auth-store";
import { extractErrorMessage } from "@/common/middleware/error-handler";

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
